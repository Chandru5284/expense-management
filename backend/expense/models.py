from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

from django.utils.translation import gettext as _
from django.template.defaultfilters import slugify

# unique slugify generator
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
def get_receipt_image_upload_path(instance, filename):
    return 'images/receipt/{0}/{1}'.format(instance.auth_user, filename)

class Member(models.Model):
    slug = models.SlugField(max_length=250, null=True, editable=False)
    auth_user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, default=None, related_name='user_member')
    name = models.CharField(max_length=250, null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'member'
        ordering = ['name', ]
        verbose_name_plural = "members"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slugify(self, slugify(self.name))
        self.clean()
        super().save(*args, **kwargs)

     # Here's where to take a look
    def soft_delete(self):
        self.is_deleted = True
        self.is_active = False
        self.deleted_at = timezone.now()
        self.save()
        
        
class Category(models.Model):
    slug = models.SlugField(max_length=250, null=True, editable=False)
    member = models.ForeignKey(Member, on_delete=models.CASCADE, null=False, blank=False, default=None, related_name='member_category')
    title = models.CharField(max_length=250, null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    icon = models.CharField(max_length=250, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'category'
        ordering = ['title', ]
        verbose_name_plural = "category"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slugify(self, slugify(self.title))
        self.clean()
        super().save(*args, **kwargs)

     # Here's where to take a look
    def soft_delete(self):
        self.is_deleted = True
        self.is_active = False
        self.deleted_at = timezone.now()
        self.save()
        
class Transaction(models.Model):
    
    class TransactionType(models.TextChoices):
        INCOME = 'INCOME', _('INCOME')
        EXPENSE = 'EXPENSE', _('EXPENSE')
    
    slug = models.SlugField(max_length=250, null=True, editable=False)
    member = models.ForeignKey(Member, on_delete=models.CASCADE, null=False, blank=False, default=None, related_name='member_transaction')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=False, blank=False, default=None, related_name='category_transaction')
    transaction_type = models.CharField(max_length=10, choices=TransactionType.choices, default=None)
    title = models.CharField(max_length=250, null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, default=0.00)
    date = models.DateField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'transaction'
        ordering = ['title', ]
        verbose_name_plural = "transaction"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slugify(self, slugify(self.title))
        self.clean()
        super().save(*args, **kwargs)

     # Here's where to take a look
    def soft_delete(self):
        self.is_deleted = True
        self.is_active = False
        self.deleted_at = timezone.now()
        self.save()
        
        
        