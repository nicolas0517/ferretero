from django.conf import settings
from django.conf.urls import include, url
from ferretero import views

urlpatterns = [
    url(r'^datos', views.datos_nuevos, name='datos_nuevos'),
    url(r'^regiones', views.regiones, name='regiones')
]
