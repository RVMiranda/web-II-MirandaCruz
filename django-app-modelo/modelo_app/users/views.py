from django.shortcuts import render
from django.http import HttpResponse
from .models import User, User_Address
from django.shortcuts import get_object_or_404
import json
from django.http import JsonResponse
# Create your views here.

def indexUsers(request):
    usuarios = User.objects.all()
    data = {
        "Titulo": "index de usuarios desde views",
        "Usuarios": usuarios
    }
    return render(request, "users/index.html", data)

def createUserView(request):
    return render(request, "users/create.html")

def createUser(request):
    data = {}
    try:
        if request.method == "POST":
            name = request.POST.get("name")
            email = request.POST.get("email")
            age = request.POST.get("age")
            rfc = request.POST.get("rfc")
            photo = request.POST.get("photo")

            user = User(name=name, email=email, age=age, rfc=rfc, photo=photo)
            user.save()

            #data[user] = user
            data["user"] = {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "age": user.age,
                "rfc": user.rfc,
                "photo": user.photo if user.photo else None
            }

            data["message"] = "Usuario creado correctamente"
            data["status"] = "success"
            #data["statuss"] = "success"
    except Exception as e:
            data = {
                "message": str(e),
                "status": "error"
            }
    
    return render(request, "users/create.html", data)

def userDetail(request, id):
    user = get_object_or_404(User, id=id)
    addresses = User_Address.objects.filter(user=user)
    data = {
        "user": user,
        "addresses": addresses
    }
    return render(request, "users/detail.html", data)

def userList(request):
    users = User.objects.all()
    data = {
        "users": users
    }
    return render(request, "users/userList.html", data)

def createUserByFetch(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    return JsonResponse({
        "message": "Usuario creado correctamente",
        "status": "success",
        "user": body
    })

def updateUser(request, id):
    user = get_object_or_404(User, id=id)
    addresses = User_Address.objects.filter(user=user)
    data = {
        "user": user,
        "addresses": addresses
    }
    try:
        
        if request.method == "POST":
            name = request.POST.get("name")
            email = request.POST.get("email")
            age = request.POST.get("age") 
            rfc = request.POST.get("rfc")
            photo = request.POST.get("photo")
            user.name = name
            user.email = email
            user.age = age
            user.rfc = rfc
            user.photo = photo
            user.save()

            data["user"] = {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "age": user.age,
                "rfc": user.rfc,
                "photo": user.photo if user.photo else None
            }
            data["message"] = "Usuario actualizado correctamente"
            data["status"] = "success"
        else:
            data["user"] = {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "age": user.age,
                "rfc": user.rfc,
                "photo": user.photo if user.photo else None
            }
            data["message"] = "Usuario obtenido correctamente"
            data["status"] = "success"
    except Exception as e:
        data = {
            "message": str(e),
            "status": "error"
        }
    
    return render(request, "users/update.html", data)