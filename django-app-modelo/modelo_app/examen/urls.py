from django.urls import path
from . import views

urlpatterns = [
    path('', views.examenIndex, name='examenIndex'),
    path('boletos/', views.boletosView, name='Boletos'),
    path('eventos/', views.eventosView, name='Eventos'),
    path('eventos/agregar_evento/', views.agregarEventoView, name='AgregarEvento'),
    path('eventos/obtener_eventos/', views.obtenerEvento, name='ObtenerEvento'),  
    path('eventos/eliminar_evento/<int:evento_id>/', views.eliminarEvento, name='EliminarEvento'),
]