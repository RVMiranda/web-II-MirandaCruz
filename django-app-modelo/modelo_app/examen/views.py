from django.shortcuts import render
from .models import Localidad, Producto, Evento, TipoBoleto, Boleto, Noticia
# Create your views here.
def homeIndex(request):
    return render(request, 'home/index.html')

def examenIndex(request):
    eventos = Evento.objects.all()
    noticias = Noticia.objects.all()
    
    boletos = Boleto.objects.all()
    productos = Producto.objects.all()
    localidades = Localidad.objects.all()
    tipos_boleto = TipoBoleto.objects.all()

    data = {
        'eventos': eventos,
        'noticias': noticias,
        'boletos': boletos,
        'productos': productos,
        'localidades': localidades,
        'tipos_boleto': tipos_boleto,
    }

    return render(request, 'examen/index.html', data)


def boletosView(request):
    boletos = Boleto.objects.select_related('tipo_boleto', 'evento').all()  # Optimiza consultas
    return render(request, 'examen/boletos.html', {'boletos': boletos})

def eventosView(request):
    eventos = Evento.objects.select_related('localidad').all()  # Optimiza consultas
    return render(request, 'examen/eventos.html', {'eventos': eventos})