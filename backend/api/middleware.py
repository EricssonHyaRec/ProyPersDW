# api/middleware.py
from django.http import JsonResponse
from django.conf import settings

class ApiKeyMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Excluir ciertas rutas de la validación de API Key
        excluded_paths = ['/api/login/', '/api/registro/']
        
        if request.path_info in excluded_paths:  # Verifica directamente el path
            return self.get_response(request)

        # Validar API Key en los demás casos
        api_key = request.headers.get('X-API-KEY') 

        if api_key and api_key == settings.API_KEY:
            return self.get_response(request)
        
        return JsonResponse({"error": "API Key invalida"}, status=403)
