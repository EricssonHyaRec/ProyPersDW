from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from . import models,serializers
from rest_framework.permissions import BasePermission, IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny

from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
# Create your views here.

class PersonaViewset(viewsets.ModelViewSet): #define los verbos http para cada modelo
    queryset = models.Persona.objects.all()
    serializer_class = serializers.PersonaSerializer

class UsuarioViewset(viewsets.ModelViewSet):
    queryset = models.Usuario.objects.all()
    serializer_class = serializers.UsuarioSerializer

class CustomAuthToken(ObtainAuthToken): #clase que define la autenticacion por token
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request':request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username
        })

@method_decorator(csrf_exempt, name='dispatch')
class RegistroUsuarioView(APIView):
    permission_classes = [AllowAny]  # Permite el acceso sin autenticación

    def post(self, request):
        serializer = serializers.RegistroUsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'mensaje': 'Usuario registrado con éxito'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class CitaViewSet(viewsets.ModelViewSet):
    queryset = models.Cita.objects.all()
    serializer_class = serializers.CitaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return models.Cita.objects.all()  # Superusuario puede ver todas las citas
        return models.Cita.objects.filter(usuario=user)  # Filtrar citas solo del usuario autenticado

    def perform_create(self, serializer):
        # Asignar el usuario autenticado al crear una cita
        serializer.save(usuario=self.request.user)
    
Usuario = get_user_model()

class SuperUserUserListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.is_superuser:
            usuarios = Usuario.objects.values('id', 'username', 'email', 'date_joined')
            return Response({'usuarios': list(usuarios)}, status=200)
        return Response({'usuarios': []}, status=200)
    
class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'username': user.username,
            'is_superuser': user.is_superuser,
            'email': user.email,
        })      

      

      

#para que yo despues de que le pase el usuario que he creado, obtener el token 