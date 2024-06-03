import datetime
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
import jwt
import hashlib
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags


# import models
from user.models import Profile
from django.contrib.auth.models import User
from expense.models import Member

# import serializers
from .serializers import (
    SignupSerializer,
    LoginSerializer,
    ChangePasswordSerializer,
    ValidateEmailSerializer,
    ResetPasswordSerializer
)
from user.serializers import UserProfileSerializer
from expense.serializers import MemberSerializer


# 1. Signup
class SignupView(APIView):
    permission_classes = (AllowAny, )
    signup_serializer_class = SignupSerializer
    profile_serializer_class = UserProfileSerializer
    def post(self, request, format=None):
        signup_serializer = self.signup_serializer_class(data=request.data)
        signup_serializer.is_valid(raise_exception=True)
        user = signup_serializer.save()

        profile = Profile.objects.get(auth_user=user)
        user_profile = self.profile_serializer_class(profile)
        token = RefreshToken.for_user(user)
        
        jwt_access_token_lifetime =  settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'] # .SIMPLE_JWT.ACCESS_TOKEN_LIFETIME
        jwt_refresh_token_lifetime =  settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'] # .SIMPLE_JWT.ACCESS_TOKEN_LIFETIME
        output = {
            "message": "User registration completed successfully.",
            "refresh_token": str(token),
            "access_token": str(token.access_token),
            "access_token_life_time_in_seconds" : jwt_access_token_lifetime.total_seconds(),
            "refresh_token_life_time_in_seconds" : jwt_refresh_token_lifetime.total_seconds(),
        }        
        user_profile_data = user_profile.data
        auth_user_data = user_profile_data.pop('auth_user')
        user_profile_data.update(auth_user_data)
        output.update({ 'user_profile' : user_profile_data })

        email_verification_token = RefreshToken.for_user(user)
        profile.email_verification_code = hashlib.sha256(str(email_verification_token).encode()).hexdigest()
        profile.save()

        data = { 
            'email' : user.email,
            # 'otp' : profile.email_verification_otp
            'email_verification_token' : str(email_verification_token)
        }
        # if (settings.SEND_MAIL_ENABLED).lower() == 'true':
        # send_registration_email.delay(user.email, data)
        # Utils.send_signup_acknowledgement_mail(user.email, data)
        return Response(output, status=status.HTTP_201_CREATED)
    
# Login
class LoginView(APIView):
    permission_classes = (AllowAny, )
    login_serializer_class = LoginSerializer
    user_profile_serializer_class = UserProfileSerializer
    user_member_serializer_class = MemberSerializer
    def post(self, request, format=None):
        serializer = self.login_serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.login()
        member = Member.objects.filter(auth_user=user.id)

        try:
            profile = Profile.objects.get(auth_user_id=user.id)
        except Profile.DoesNotExist:
            return Response({"message": "User Profile does not exist."}, status=status.HTTP_400_BAD_REQUEST)

        # if not profile.is_email_verified:
        #     return Response({"message": "Please verify your email."}, status=status.HTTP_400_BAD_REQUEST)

        user_profile = self.user_profile_serializer_class(profile)
        user_member = self.user_member_serializer_class(member, many=True)
        
        token = RefreshToken.for_user(user)
        
        jwt_access_token_lifetime =  settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'] # .SIMPLE_JWT.ACCESS_TOKEN_LIFETIME
        jwt_refresh_token_lifetime =  settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'] # .SIMPLE_JWT.ACCESS_TOKEN_LIFETIME
        data = {
          "refresh_token": str(token),
          "access_token": str(token.access_token),
          "access_token_life_time_in_seconds" : jwt_access_token_lifetime.total_seconds(),
          "refresh_token_life_time_in_seconds" : jwt_refresh_token_lifetime.total_seconds(),
          "require_member_info" : True if(member.count() <= 0) else False,
        }
        user_profile_data = user_profile.data
        auth_user_data = user_profile_data.pop('auth_user')
        user_profile_data.update(auth_user_data)
        data.update({ 'user_profile' : user_profile_data })
        
        # append organization info in output
        user_member_data = user_member.data
        data.update({ 'members' : user_member_data })

        return Response(data, status=status.HTTP_200_OK)
    
    
class ChangePasswordView(APIView):
    serializer_class = ChangePasswordSerializer
    def put(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        if request.data.get('new_password') != request.data.get('confirm_password'):
            return Response({"confirm_password": ["Incorrect password."]}, status=status.HTTP_400_BAD_REQUEST)        

        if not user.check_password(request.data.get('old_password')):
            return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)        
        
        user.set_password(request.data.get('new_password'))
        user.save()            
        # user = serializer.save()
        return Response({"message": "Password updated successfully."}, status=status.HTTP_200_OK)
    
# Forgot Password
class ForgotPasswordView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = ValidateEmailSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
            token = RefreshToken.for_user(user)
            # data = { 'token' : str(RefreshToken.for_user(user)) }
            profile = Profile.objects.get(auth_user=user)
            # profile.email_verification_code = hashlib.sha256(str(token.access_token).encode()).hexdigest()
            profile.email_verification_code = str(token.access_token)
            profile.save()
            data = { 
                'token' : profile.email_verification_code
            }
            
            subject = "TEST"
            message = "your otp is 5559"
            
            email_verification_link = settings.FRONTEND_URL+'/auth/reset-password/?token='+str(data['token'])
            
            html_message = render_to_string("email.html", {"email_verification_link": email_verification_link})
            plain_message = strip_tags(html_message)
            
            
            message = EmailMultiAlternatives(
                subject = subject,
                body = plain_message,
                from_email = None,
                to = [user.email]
            )
            
            message.attach_alternative(html_message, "text/html")
            message.send()
            
            # send_mail(subject, message, settings.EMAIL_HOST_USER, [user.email], fail_silently=True)
            
            
            # Utils.send_reset_password_mail(request, user.email, data)
            # Utils.send_signup_acknowledgement_mail(user.email, data)

            # Utils.send_forgot_password_email(user.email, data)
            return Response({"message": "Reset password email send successfully.", "token": data}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"message": "User does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        
# Reset Password
class ResetPasswordView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = ResetPasswordSerializer
    def post(self, request):
        try:

            reset_password_serializer = self.serializer_class(data=request.data)
            reset_password_serializer.is_valid(raise_exception=True)

            if request.data.get('password') != request.data.get('confirm_password'):
                return Response({"confirm_password": ["Incorrect password."]}, status=status.HTTP_400_BAD_REQUEST)        
            
            # added algorithms number to debug
            profile = Profile.objects.get(email_verification_code=request.data.get('token'))           
            
            if request.data.get('token') == profile.email_verification_code:
                payload = jwt.decode(request.data.get('token'), settings.SECRET_KEY, algorithms=['HS256'])
                user = User.objects.get(id=payload['user_id'])            
                user.set_password(request.data.get('password'))
                user.save() 
            
            else: return Response({"message": ["Token is expired or invalid token"]}, status=status.HTTP_400_BAD_REQUEST)   
            
            return Response({"message": "Password updated successfully."}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"message": "User does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        except Profile.DoesNotExist:
            return Response({"message": "Token is expired or invalid"}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.ExpiredSignatureError as e:
            return Response({"message": "Activation token expired."}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as e:
            return Response({"message": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)