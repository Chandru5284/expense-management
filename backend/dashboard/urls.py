from django.urls import path

# import views
from . import views

urlpatterns = [    
    path('<slug:member_slug>/', views.DashboardTransactionView.as_view(), name='transaction'),  # [GET] transaction list
    path('<slug:member_slug>/chart/', views.DashboardChartView.as_view(), name='transaction'),  # [GET] transaction list
    path('<slug:member_slug>/download-excel/', views.DownloadExcelView.as_view(), name='transaction'),  # [GET] transaction list
]