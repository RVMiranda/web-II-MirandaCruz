from django.urls import path
from . import views

urlpatterns = [
    path('', views.examenIndex, name='examenIndex'),
    path('boletos/', views.boletosView, name='Boletos'),
    path('eventos/', views.eventosView, name='Eventos'),
    
]