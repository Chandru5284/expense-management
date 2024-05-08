from django.urls import path

# import views
from . import views

urlpatterns = [
    path('my-profile', views.ViewMyProfileView().as_view(), name='view-my-profile'), # [GET] view profile
    path('my-profile/update', views.UpdateProfileView().as_view(), name='update-my-profile'), # [PUT] update profile
    path('my-profile/deactivate-account', views.DeactivateProfileView().as_view(), name='deactivate-my-profile'), # [GET] update profile

    # deactivate account & cancel deactivation
    path('deactivate/', views.DeactivateAccountView.as_view(), name='deactivate-account'), # GET
    path('deactivate/cancel', views.CancelDeactivateAccountView.as_view(), name='cancel-deactivate-account'), # GET    

]
