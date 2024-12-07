from rest_framework import routers
from . import views
from django.urls import path,include # definir patrones url
from .views import RegistroUsuarioView
from .views import SuperUserUserListView
from .views import UserInfoView

router = routers.DefaultRouter() # automanticamente se genere las urls que tenga 

router.register('personas',views.PersonaViewset)
router.register('usuarios',views.UsuarioViewset)
router.register('citas', views.CitaViewSet)

urlpatterns = [
    path('',include(router.urls)),
    path('login/', views.CustomAuthToken.as_view(),name='login'),
    path('registro/', RegistroUsuarioView.as_view(), name='registro_usuario'),
    path('superuser/users/', SuperUserUserListView.as_view(), name='superuser-user-list'),
    path('auth/userinfo/', UserInfoView.as_view(), name='user-info'),

]
#para decirle al django a traves de que urls van a acceder a las vistas que tengo definido en el view.py