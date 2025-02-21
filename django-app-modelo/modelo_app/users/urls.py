from django.urls import path
from . import views

urlpatterns = [
    path("home", views.indexUsers, name="indexUsers"),
    path("create", views.createUserView, name="createUserView"),
    path("createUser", views.createUser, name="createUser"),
    path("detail/<int:id>", views.userDetail, name="userDetail"),
    path("user-list", views.userList, name="userList"),
]