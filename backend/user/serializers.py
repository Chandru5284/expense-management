from rest_framework import serializers

# import models
from django.contrib.auth.models import User
from .models import Profile

# user 
class UserSerializer(serializers.ModelSerializer):
	
	class Meta:
		many = True
		model = User
		fields =  ['first_name', 'last_name', 'username', 'email','is_active','date_joined','last_login']


# user profile
class UserProfileSerializer(serializers.ModelSerializer):
    auth_user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ['auth_user', 'is_email_verified']

# Update user profile serializer
class UpdateUserProfileSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, min_length=3, max_length=80)
    # email = serializers.CharField(required=True, min_length=3, max_length=80)

    def updateProfile(self, request, **kwargs):
        # update user info
        user = User.objects.get(id=request.user.id)
        user.username = self.validated_data['username']
        # user.email = self.validated_data['email']
        user.save()
        return user