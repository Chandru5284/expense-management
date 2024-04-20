from rest_framework import serializers

# import models
from .models import Member, Category, Transaction

# import serializers
from user.serializers import UserSerializer

# Member
class MemberSerializer(serializers.ModelSerializer):
    auth_user = UserSerializer(read_only=True)
    name = serializers.CharField(required=True, min_length=3, max_length=250)
    description = serializers.CharField(required=True, min_length=3, max_length=500)
    class Meta:
        model = Member
        fields = ["slug", "auth_user", "name", "description", "created_at", "is_active", "is_deleted"]
              
# Category
class CategorySerializer(serializers.ModelSerializer):
    member = MemberSerializer(read_only=True)
    title = serializers.CharField(required=True, min_length=3, max_length=250)
    type = serializers.CharField(required=True, min_length=3, max_length=500)
    class Meta:
        model = Category
        fields = ["slug", "member", "title", "description", "type", "icon", "created_at", "is_active", "is_deleted"]


# Transaction
class TransactionSerializer(serializers.ModelSerializer):
    member = MemberSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    title = serializers.CharField(required=True, min_length=3, max_length=250)
    description = serializers.CharField(required=True, min_length=3, max_length=500)
    amount = serializers.DecimalField(max_digits=8, decimal_places=2, required=True)
    date = serializers.DateField(required=True)
    class Meta:
        model = Transaction
        fields = ["slug" ,"member" ,"category" ,"transaction_type" ,"title" ,"description" ,"amount" ,"date" ,"is_active" ,"is_deleted" ,"created_at" ,"updated_at" ,"deleted_at" ,]

