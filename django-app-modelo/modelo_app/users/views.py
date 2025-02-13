from django.shortcuts import render
from django.http import HttpResponse
from .models import User
# Create your views here.

def indexUsers(request):
    usuarios = User.objects.all()
    data = {
        "Titulo": "index de usuarios desde views",
        "Usuarios": usuarios
    }
    return render(request, "users/index.html", data)
