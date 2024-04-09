from django.urls import path

# import views
from . import views

urlpatterns = [
    path('member/', views.MemberView.as_view(), name='member'),    # [GET] member list
    path('member/create/', views.MemberView.as_view(), name='create-member-record'),    # [POST] create member record
    path('member/<slug:slug>/update/', views.MemberView.as_view(), name='update-member-record'),    # [PUT] update member record
    path('member/<slug:slug>/delete/', views.MemberView.as_view(), name='delete-member-record'),    # [DELETE] delete member record
    path('member/<slug:slug>/show/', views.MemberRecordView.as_view(), name='show-memberRecord-record'),    # [GET] show member record
    
    path('category/<slug:member_slug>/', views.CategoryView.as_view(), name='category'),    # [GET] category list
    path('category/create/<slug:member_slug>/', views.CategoryView.as_view(), name='create-category-record'),    # [POST] create category record
    path('category/<slug:slug>/update/', views.CategoryView.as_view(), name='update-category-record'),    # [PUT] update category record
    path('category/<slug:slug>/delete/', views.CategoryView.as_view(), name='delete-category-record'),    # [DELETE] delete category record
    path('category/<slug:slug>/show/', views.CategoryRecordView.as_view(), name='show-categoryRecord-record'),    # [GET] show category record
    
    path('<slug:member_slug>/', views.TransactionView.as_view(), name='transaction'),    # [GET] transaction list
    path('create/<slug:member_slug>/', views.TransactionView.as_view(), name='create-transaction-record'),    # [POST] create transaction record
    path('<slug:slug>/update/', views.TransactionView.as_view(), name='update-transaction-record'),    # [PUT] update transaction record
    path('<slug:slug>/delete/', views.TransactionView.as_view(), name='delete-transaction-record'),    # [DELETE] delete transaction record
    path('<slug:slug>/show/', views.TransactionRecordView.as_view(), name='show-transactionRecord-record'),    # [GET] show transaction record
]