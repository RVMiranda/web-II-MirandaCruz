from django.shortcuts import render
from django.http import HttpResponse


def indexOrders(request):
    return HttpResponse("Hello, world. You're at the Orders index.")
# Create your views here.
