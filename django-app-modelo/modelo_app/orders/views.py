from django.shortcuts import render
from django.http import HttpResponse
from .models import Question


def indexOrders(request):
    questions = Question.objects.all()

    data = {
        "Titulo": "index de Ordenes",
        "Total_Ordenes": 100,
        "Total_Payments": 200,
        "Orders":[
            {
                "id":1, "total":100
            },
            {
                "id":2, "total":200
            },
            {
                "id":3, "total":300
            },
            {
                "id":4, "total":400
            }
        ],
        "questions": questions
    }
    return render(request, "orders/index.html", data)

# Create your views here.
