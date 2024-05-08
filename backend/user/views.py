from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from django.utils import timezone

# import models
from django.contrib.auth.models import User
from .models import Profile

# import serializer
from .serializers import UserProfileSerializer, UserSerializer, UpdateUserProfileSerializer


# View profile
class ViewMyProfileView(APIView):
    user_serializer_class = UserSerializer
    user_profile_serializer_class = UserProfileSerializer
    def get(self, request):
        try:
            # user
            logged_in_user = User.objects.get(id=request.user.id)
            user = self.user_serializer_class(logged_in_user)
            # user profile
            logged_in_user_profile = Profile.objects.get(auth_user_id=request.user.id)
            profile = self.user_profile_serializer_class(logged_in_user_profile)

            # pack data into single dict
            auth_user_data = user.data
            user_profile_data = profile.data
            user_profile_data.update(auth_user_data)

            output = {
                'user_profile': user_profile_data,
            }
            return Response(output, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message': 'User record not found'}, status=status.HTTP_404_NOT_FOUND)
        except Profile.DoesNotExist:
            return Response({'message': 'User profile record not found'}, status=status.HTTP_404_NOT_FOUND)
        

# Update profile
class UpdateProfileView(APIView):
    serializer_class = UpdateUserProfileSerializer
    def put(self, request):
        try:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            profile = serializer.updateProfile(request)
            return Response({'message': 'User profile updated'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message': 'User record not found'}, status=status.HTTP_404_NOT_FOUND)
        except Profile.DoesNotExist:
            return Response({'message': 'User profile record not found'}, status=status.HTTP_404_NOT_FOUND)
        

# View profile
class DeactivateProfileView(APIView):
    user_profile_serializer_class = UserProfileSerializer
    def get(self, request):
        try:
            logged_in_user_profile = Profile.objects.get(auth_user_id=request.user.id)
            profile_serializer = self.user_profile_serializer_class(logged_in_user_profile, data=request.data)
            profile_serializer.is_valid(raise_exception=True)
            profile_serializer.save(deactivated_at=datetime.now())
            return Response(profile_serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message': 'User record not found'}, status=status.HTTP_404_NOT_FOUND)
        except Profile.DoesNotExist:
            return Response({'message': 'User profile record not found'}, status=status.HTTP_404_NOT_FOUND)
        
# deactivation account
class DeactivateAccountView(APIView):
    def get(self, request):
        profile = Profile.objects.get(auth_user=request.user)
        current_datetime = timezone.now()
        profile.deleted_at = current_datetime
        profile.save()
        return Response({"message": "Account deactivated successfully"}, status=status.HTTP_200_OK)
    
class CancelDeactivateAccountView(APIView):
    def get(self, request):
        profile = Profile.objects.get(auth_user=request.user)
        profile.deleted_at = None
        profile.save()
        return Response({"message": "Account deactivation canceled"}, status=status.HTTP_200_OK)
