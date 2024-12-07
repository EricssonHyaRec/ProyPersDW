from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager
# Create your models here.
from django.conf import settings

class Persona(models.Model):
    nombre = models.CharField(max_length=50)
    edad = models.IntegerField()
    especialidad = models.CharField(max_length=50, default='General')  # Nuevo atributo agregado

    def __str__(self):
        return f"{self.nombre}({self.edad})"

class Cita(models.Model):
    fecha = models.DateField()  
    asunto = models.CharField(max_length=80)  
    medico = models.ForeignKey(Persona, on_delete=models.CASCADE)
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Relación con el usuario

    def __str__(self):
        return f"{self.asunto} - {self.fecha}"

class UsuarioManager(BaseUserManager):
    def create_user(self,username,email,password=None,**extra_fields):
        #Creamos un usario en base a nombre de usuario, contraseña y correo
        if not email:
            raise ValueError('Correo es obligatorio')
        email = self.normalize_email(email)
        user = self.model(username=username,email=email,**extra_fields)
        user.set_password(password) #encriptar password 
        user.save(using=self._db)
        return user
    
    def create_superuser(self,username,email,password=None,**extra_fields):
        #Creamos un superusario en base a nombre de usuario, contraseña y correo
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('El campo staff debe ser True')
        
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('El campo superusuario debe ser True')
        
        return self.create_user(username,email,password,**extra_fields)
    
class Usuario(AbstractUser):
    objects = UsuarioManager()

    def __str__(self):
        return self.username
# Create your models here.
