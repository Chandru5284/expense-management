from django.contrib import admin

# import models
from .models import Member, Category, Transaction

# Member
class MemberAdmin(admin.ModelAdmin):
    list_display = ("slug", "auth_user", "name", "created_at", "is_active")
    search_fields = ("slug", "auth_user", "name", "created_at", "is_active")
    readonly_fields = ('id', 'slug')

# Category
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("slug", "member", "title", "type", "description", "icon", "created_at", "is_active")
    search_fields = ("slug", "member", "title", "type", "description", "icon", "created_at", "is_active")
    readonly_fields = ('id', 'slug')
    
# Transaction
class TransactionAdmin(admin.ModelAdmin):
    list_display = ("slug" ,"member" ,"category" ,"transaction_type" ,"title" ,"description" ,"amount" ,"date" ,"is_active" ,"is_deleted" ,"created_at" ,"updated_at" ,"deleted_at" ,)
    search_fields = ("slug" ,"member" ,"category" ,"transaction_type" ,"title" ,"description" ,"amount" ,"date" ,"is_active" ,"is_deleted" ,"created_at" ,"updated_at" ,"deleted_at" ,)
    readonly_fields = ('id', 'slug')

# register Member models
admin.site.register(Member, MemberAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Transaction, TransactionAdmin)



