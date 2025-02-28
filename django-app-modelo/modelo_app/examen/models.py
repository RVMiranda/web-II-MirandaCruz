from django.db import models

class Localidad(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=False)
    estatus = models.BooleanField(null=False, blank=False)

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    precio = models.FloatField()
    localidad = models.ForeignKey(Localidad, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.nombre


class Evento(models.Model):
    nombre = models.CharField(max_length=300)
    descripcion = models.CharField(max_length=300, null=True, blank=True)
    fecha_inicio = models.DateTimeField()
    fecha_fin = models.DateTimeField()
    localidad = models.ForeignKey(Localidad, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre


class TipoBoleto(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre


class Boleto(models.Model):
    precio = models.FloatField()
    tipo_boleto = models.ForeignKey(TipoBoleto, on_delete=models.CASCADE, null=True, blank=True)
    evento = models.ForeignKey(Evento, on_delete=models.CASCADE, null=True, blank=True)
    fecha = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Boleto {self.id} - {self.evento.nombre if self.evento else 'Sin evento'}"


class Noticia(models.Model):
    titulo = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=300)

    def __str__(self):
        return self.titulo
