from django.shortcuts import render, get_object_or_404
from .models import Localidad, Producto, Evento, TipoBoleto, Boleto, Noticia
from django.http import JsonResponse
from django.utils.timezone import now, make_aware
import traceback
from datetime import datetime, timedelta
import json
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
    boletos = Boleto.objects.select_related('tipo_boleto', 'evento').all()
    return render(request, 'examen/boletos.html', {'boletos': boletos})

def eventosView(request):
    eventos = Evento.objects.select_related('localidad').all()
    return render(request, 'examen/eventos.html', {'eventos': eventos})

def agregarEventoView(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            nombre = data.get('nombre')
            descripcion = data.get('descripcion')
            fecha_inicio = data.get('fecha_inicio')
            fecha_fin = data.get('fecha_fin')
            localidad_id = data.get('localidad_id')

            print("🔹 JSON recibido en Django:", data)

            if not nombre or not fecha_inicio or not fecha_fin or not localidad_id:
                return JsonResponse({'error': 'Todos los campos son requeridos'}, status=400)

            fecha_inicio = make_aware(datetime.strptime(fecha_inicio, "%Y-%m-%dT%H:%M"))
            fecha_fin = make_aware(datetime.strptime(fecha_fin, "%Y-%m-%dT%H:%M"))

            if fecha_inicio >= fecha_fin:
                return JsonResponse({'error': 'La fecha de inicio debe ser anterior a la fecha de fin'}, status=400)
            
            if fecha_inicio <= now():
                return JsonResponse({'error': 'La fecha de inicio debe ser posterior a la fecha actual'}, status=400)

            localidad = get_object_or_404(Localidad, id=int(localidad_id))
            #eventoLocalidad = Evento.objects.filter(localidad = localidad, fecha_fin__gte = fecha_inicio, fecha_inicio__lte = fecha_fin).exists()
            eventoLocalidad = Evento.objects.filter(localidad = localidad, fecha_fin__gte = fecha_inicio)
            if eventoLocalidad.exists():
                return JsonResponse({'error': 'Ya existe un evento en la misma localidad en ese horario'}, status=400)
            Evento.objects.create(
                nombre=nombre,
                descripcion=descripcion,
                fecha_inicio=fecha_inicio,
                fecha_fin=fecha_fin,
                localidad=localidad
            )
            return JsonResponse({'mensaje': 'Evento creado correctamente'})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Error al procesar JSON recibido."}, status=400)
        except Exception as e:
            print("🚨 ERROR EN DJANGO 🚨")
            traceback.print_exc()  # 🔴 Muestra el error exacto en consola
            return JsonResponse({'error': str(e)}, status=500)

    ultimosEventos = Evento.objects.order_by('-id')[:5]
    localidades = Localidad.objects.all()
    return render(request, 'examen/agregarEvento.html', {'ultimosEventos': ultimosEventos, 'localidades': localidades})

def obtenerEvento(request):
    eventos = Evento.objects.order_by('-id')[:5]  # 🔹 Obtener los últimos 5 eventos
    eventos_json = [
        {
            "id": evento.id,
            "nombre": evento.nombre,
            "fecha_inicio": evento.fecha_inicio.strftime("%Y-%m-%d %H:%M"),
            "fecha_fin": evento.fecha_fin.strftime("%Y-%m-%d %H:%M"),
            "localidad": evento.localidad.nombre
        }
        for evento in eventos
    ]
    return JsonResponse(eventos_json, safe=False)