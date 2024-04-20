from django.db import models
from django.contrib.auth.models import User

from django.utils.translation import gettext as _
from django.template.defaultfilters import slugify

def unique_slugify(instance, slug):
    model = instance.__class__
    unique_slug = slug
    record_count = 0
    while model.objects.filter(slug=unique_slug).exists():
        unique_slug = slug + "-1"
        while model.objects.filter(slug=unique_slug).exists():
            record_count = record_count + 1
            unique_slug = slug + "-" + str(record_count)
    return unique_slug

# profile image upload directory path
def get_profile_image_upload_path(instance, filename):
    return 'images/profile/{0}/{1}'.format(instance.auth_user, filename)

class Profile(models.Model):
    slug = models.SlugField(max_length=100, null=False, blank=False, editable=False, allow_unicode=True)
    profile_image = models.ImageField(null=True, blank=True, upload_to=get_profile_image_upload_path)
    email_verification_otp = models.CharField(max_length=6,blank=True, null=True)
    email_verification_otp_expired_at = models.DateTimeField(blank=True, null=True)
    email_verification_code = models.CharField(max_length=100, blank=True, null=True)
    is_email_verified = models.BooleanField(default=False)
    auth_user = models.OneToOneField(User, on_delete=models.CASCADE, null=False, blank=False, default=None, related_name='user_profile', unique=True)
    
    class Meta:
        db_table = 'profile'
        ordering = ['id', ]
        verbose_name_plural = "profiles"
        
    def __str__(self):
        return self.auth_user.username

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slugify(self, slugify(self.auth_user.username))
        self.clean()
        super().save(*args, **kwargs)


