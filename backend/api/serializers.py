from rest_framework import serializers
from . import models

#el serializador Realiza la conversion de lo que hay en base de dato y lo convierte en json para pasarlo al cliente 
class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Persona
        fields = '__all__'

class CitaSerializer(serializers.ModelSerializer):
    nombremedico =serializers.ReadOnlyField(source='medico.nombre')
    class Meta:
        model = models.Cita
        fields = '__all__'
        read_only_fields = ['usuario']  # Evitar que el usuario sea modificado directamente

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Usuario
        fields = '__all__'

    def create(self, validated_data):
        user = models.Usuario(
            email = validated_data['email'],
            username = validated_data['username'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class RegistroUsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = models.Usuario
        fields = ('id', 'username', 'email', 'password')

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = models.Usuario.objects.create_user(**validated_data)
        user.set_password(password)  # Encriptar contraseña
        user.save()
        return user