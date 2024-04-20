from django.urls import path

# import views
from . import views

urlpatterns = [
    path('signup/', views.SignupView.as_view(), name='signup'), # POST
    path('login/', views.LoginView.as_view(), name='login'), # POST
    path('change-password/', views.ChangePasswordView.as_view(), name='change-password'), # PUT
    path('forgot-password/', views.ForgotPasswordView.as_view(), name='forgot-password'), # POST
    path('reset-password/', views.ResetPasswordView.as_view(), name='reset-password'), # POST
]