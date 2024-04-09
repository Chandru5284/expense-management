from django.contrib import admin

# import models
from .models import Profile

# profile
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("id", 'auth_user', 'is_email_verified')
    search_fields = ("id", 'auth_user', 'is_email_verified')
    readonly_fields = ("id", )

# register profile models
admin.site.register(Profile, ProfileAdmin)

