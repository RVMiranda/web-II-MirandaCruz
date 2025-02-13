from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    age = models.IntegerField()
    rfc = models.CharField(max_length=20, unique=True)
    photo = models.URLField(max_length=300)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class User_Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    street = models.CharField(max_length=200)
    zip_code = models.CharField(max_length=10)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.city}, {self.country}"