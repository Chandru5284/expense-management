from django.contrib import auth
from django.db.models import Q
from django.core.exceptions import ValidationError
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from datetime import datetime, timedelta
import random
import uuid

# import models
from django.contrib.auth.models import User
from user.models import Profile

# signup serializer
class SignupSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True, min_length=3, max_length=80, validators=[UniqueValidator(queryset=User.objects.all())])
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(required=True, min_length=8)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

    def clean(self):
        errors={}
        self.raise_validation_error(errors)

    # raise validation error
    def raise_validation_error(self, errors = {}):
        error_filter = {k: v for k, v in errors.items() if v is not None }
        errors.clear()
        errors.update(error_filter)
        if errors:
            raise ValidationError(errors, code='invalid')

    def create(self, validated_data):
        self.clean()
        auth_user = User.objects.create_user(**validated_data)
        email_verification_otp = random.randint(1000,9999)
        email_verification_otp_expired_at = datetime.now() + timedelta(minutes=60)
        user_profile_data = { 
            'is_email_verified': False,
            'email_verification_otp': email_verification_otp,
            'email_verification_otp_expired_at': email_verification_otp_expired_at,
        }
        user_profile = Profile.objects.create(auth_user = auth_user, **user_profile_data)
        return auth_user

# login
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(min_length=3, max_length=250, write_only=True, required=True)
    password = serializers.CharField(min_length=6, max_length=64, write_only=True, required=True)

    def login(self, **kwargs):
        username = self.validated_data['username']
        password = self.validated_data['password']

        user = User.objects.filter(Q(username=username) | Q(email=username)).first()
        if not user:
            raise serializers.ValidationError({"message": ["No active account found with the given credentials."]})

        user = auth.authenticate(username=user.username, password=password)
        if not user:
            raise serializers.ValidationError({"message": ["No active account found with the given credentials."]})
        
        return user

# change password
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(min_length=8, max_length=128, write_only=True, required=True)
    new_password = serializers.CharField(min_length=8, max_length=128, write_only=True, required=True)
    confirm_password = serializers.CharField(min_length=8, max_length=128, write_only=True, required=True)

# validate email serializer
class ValidateEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, max_length=250, write_only=True)
    def clean(self):
        errors={}
        self.raise_validation_error(errors)

    def create(self, validated_data):
        self.clean()
        
        auth_user = User.objects.create_user(**validated_data)
        
        email_verification_otp = random.randint(1000,9999)
        email_verification_otp_expired_at = datetime.now() + timedelta(minutes=60)
        user_profile_data = { 
            'is_email_verified': False,
            'email_verification_otp': email_verification_otp,
            'email_verification_otp_expired_at': email_verification_otp_expired_at,
        }
        user_profile = Profile.objects.create(auth_user = auth_user, **user_profile_data)
        return auth_user

# reset password
class ResetPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=8, max_length=64, write_only=True, required=True)
    confirm_password = serializers.CharField(min_length=8, max_length=64, write_only=True, required=True)
    token = serializers.CharField(min_length=160, max_length=250, write_only=True, required=True)


# # verify email serializer
# class VerifyEmailSerializer(serializers.Serializer):
#     email = serializers.EmailField(required=True, max_length=250, write_only=True)
#     verification_code = serializers.CharField(required=True, max_length=250, write_only=True)
