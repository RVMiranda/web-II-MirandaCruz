from django.shortcuts import render
from .models import Localidad, Producto, Evento, TipoBoleto, Boleto, Noticia
# Create your views here.

def homeIndex(request):
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
