from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q

# import models
from .models import Member, Category, Transaction
from django.contrib.auth.models import User

# import serializers
from .serializers import MemberSerializer, CategorySerializer, TransactionSerializer

# Member
class MemberView(APIView):
    serializer_class = MemberSerializer
    def get(self, request):
        query_params = {
            "name": request.GET.get('search_term', '')
        }
        user = User.objects.get(id=request.user.id)
        paginator = paginator = PageNumberPagination()
        queryset = Member.objects.filter(Q(auth_user=user), Q(name__icontains=query_params["name"]))
        context = paginator.paginate_queryset(queryset, request)
        serializer = self.serializer_class(context, many = True)
        return Response(paginator.get_paginated_response(serializer.data).data, status=status.HTTP_200_OK)
    def post(self, request):
        try:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = User.objects.get(id=request.user.id)
            serializer.save(auth_user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except User.DoesNotExist:
            return Response({ "message" :  "user record not exist"}, status=status.HTTP_404_NOT_FOUND)
        
    def put(self, request, slug):
        try:
            queryset = Member.objects.get(slug=slug)
            serializer = self.serializer_class(queryset, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Member.DoesNotExist:
            return Response({ "message" :  "Member record not exist"}, status=status.HTTP_404_NOT_FOUND)
    def delete(self, request, slug):
        try:
            queryset = Member.objects.get(slug=slug)
            queryset.delete() # queryset.soft_delete()
            return Response({ "message" :  "Member record deleted"}, status=status.HTTP_204_NO_CONTENT)
        except Member.DoesNotExist:
            return Response({ "message" :  "Member record not exist"}, status=status.HTTP_404_NOT_FOUND)


class MemberRecordView(APIView):
    serializer_Class = MemberSerializer
    def get(self, request, slug):
        try:
            # queryset = Member.objects.get(slug=slug)
            queryset = Member.objects.get(slug=slug, is_deleted=False)
            serializer = self.serializer_Class(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Member.DoesNotExist:
            return Response({ "message" :  "Member record not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        

# Category
class CategoryView(APIView):
    serializer_class = CategorySerializer
    def get(self, request, member_slug):
        try:
            query_params = {
                "title": request.GET.get('search_term', ''),
                "type": request.GET.get('type', '')
            }
            member = Member.objects.get(slug=member_slug)
            paginator = paginator = PageNumberPagination()
            queryset = Category.objects.filter(Q(member=member), Q(title__icontains=query_params["title"]), Q(type__icontains=query_params["type"]))
            context = paginator.paginate_queryset(queryset, request)
            serializer = self.serializer_class(context, many = True)
            return Response(paginator.get_paginated_response(serializer.data).data, status=status.HTTP_200_OK)
        except Member.DoesNotExist:
            return Response({ "message" :  "Member record not exist"}, status=status.HTTP_404_NOT_FOUND)
    def post(self, request, member_slug):
        try:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            member = Member.objects.get(slug=member_slug)
            serializer.save(member=member)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Member.DoesNotExist:
            return Response({ "message" :  "Member record not exist"}, status=status.HTTP_404_NOT_FOUND)
    def put(self, request, slug):
        try:
            queryset = Category.objects.get(slug=slug)
            serializer = self.serializer_class(queryset, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Category.DoesNotExist:
            return Response({ "message" :  "Category record not exist"}, status=status.HTTP_404_NOT_FOUND)
    def delete(self, request, slug):
        try:
            queryset = Category.objects.get(slug=slug)
            queryset.delete() # queryset.soft_delete()
            return Response({ "message" :  "Category record deleted"}, status=status.HTTP_204_NO_CONTENT)
        except Category.DoesNotExist:
            return Response({ "message" :  "Category record not exist"}, status=status.HTTP_404_NOT_FOUND)


class CategoryRecordView(APIView):
    serializer_Class = CategorySerializer
    def get(self, request, slug):
        try:
            # queryset = Category.objects.get(slug=slug)
            queryset = Category.objects.get(slug=slug, is_deleted=False)
            serializer = self.serializer_Class(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Category.DoesNotExist:
            return Response({ "message" :  "Category record not exist"}, status=status.HTTP_404_NOT_FOUND)
        

# Transaction
class TransactionView(APIView):
    serializer_class = TransactionSerializer
    def get(self, request, member_slug):
        try:
            query_params = {
                "title": request.GET.get('search_term', ''),
                "transaction_type": request.GET.get('transaction_type', '')
            }
            member = Member.objects.get(slug=member_slug)
            paginator = paginator = PageNumberPagination()
            queryset = Transaction.objects.filter(Q(member=member), Q(title__icontains=query_params["title"]), Q(transaction_type__icontains=query_params["transaction_type"])).order_by('-created_at')
            context = paginator.paginate_queryset(queryset, request)
            serializer = self.serializer_class(context, many = True)
            return Response(paginator.get_paginated_response(serializer.data).data, status=status.HTTP_200_OK)
        except Member.DoesNotExist:
            return Response({ "message" :  "Member record not exist"}, status=status.HTTP_404_NOT_FOUND)
    def post(self, request, member_slug):
        try:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            member = Member.objects.get(slug=member_slug)
            category = Category.objects.get(slug=request.data.get('category'))
            serializer.save(member=member, category=category)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Member.DoesNotExist:
            return Response({ "message" :  "Member record not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Category.DoesNotExist:
            return Response({ "message" :  "Category record not exist"}, status=status.HTTP_404_NOT_FOUND)
    def put(self, request, slug):
        try:
            queryset = Transaction.objects.get(slug=slug)
            serializer = self.serializer_class(queryset, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Transaction.DoesNotExist:
            return Response({ "message" :  "Transaction record not exist"}, status=status.HTTP_404_NOT_FOUND)
    def delete(self, request, slug):
        try:
            queryset = Transaction.objects.get(slug=slug)
            queryset.delete() # queryset.soft_delete()
            return Response({ "message" :  "Transaction record deleted"}, status=status.HTTP_204_NO_CONTENT)
        except Transaction.DoesNotExist:
            return Response({ "message" :  "Transaction record not exist"}, status=status.HTTP_404_NOT_FOUND)


class TransactionRecordView(APIView):
    serializer_Class = TransactionSerializer
    def get(self, request, slug):
        try:
            # queryset = Transaction.objects.get(slug=slug)
            queryset = Transaction.objects.get(slug=slug, is_deleted=False)
            serializer = self.serializer_Class(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Transaction.DoesNotExist:
            return Response({ "message" :  "Transaction record not exist"}, status=status.HTTP_404_NOT_FOUND)
        