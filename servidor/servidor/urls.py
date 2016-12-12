from django.conf import settings
from django.conf.urls import include, url
from ferretero import views

urlpatterns = [
    url(r'^get_proveedor', views.get_proveedor, name='datos_proveedor'),
    url(r'^get_productos', views.get_productos, name='datos_productos'),
    url(r'^post_transaccion', views.post_transaccion, name='post_transaccion'),
    url(r'^get_ultimatransaccion', views.get_ultimatransaccion, name='get_ultimatransaccion'),
    url(r'^post_item', views.post_item, name='post_item'),
    url(r'^get_detalle', views.get_detalle, name='get_detalle'),
    url(r'^eliminar_producto', views.eliminar_producto, name='eliminar_producto'),
    url(r'^post_factura', views.post_factura, name='post_factura'),
    url(r'^post_item_factura', views.post_item_factura, name='post_item_factura'),
    url(r'^post_inventario', views.post_inventario, name='post_inventario'),
    url(r'^login', views.login, name='login')
]
