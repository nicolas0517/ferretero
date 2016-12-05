import json
import datetime
from django.db import connection
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponse

def datos_nuevos(request):
	if request.method == 'GET':
		try:
			cursor = connection.cursor()
			listcontext = []
			for c in cursor.execute("(select first_name, last_name from s_emp)"):
				context = {}
				context['first_name'] = c[0]
				context['last_name'] = c[1]
				listcontext.append(context)
		except:
			return HttpResponseBadRequest('Bad request')
		return JsonResponse(listcontext, safe=False)
	else:
		return HttpResponseBadRequest('NOT GET METHOD')

def regiones(request):
    if request.method == 'GET':
        try:
            cursor = connection.cursor()
            listcontext = []
            for c in cursor.execute("(select name from s_region)"):
                context = {}
                context['name'] = c[0]
                listcontext.append(context)
        except:
            return HttpResponseBadRequest('Bad Request')
        return JsonResponse(listcontext, safe=False)
    else:
        return HttpResponseBadRequest('NOT GET METHOD')

def departamentos(request):
	if request.method == 'GET':
		try:
			cursor = connection.cursor()
			respuesta = []
			for elemento in cursor.execute("(select name,id from s_dept)"):
				contexto = {}
				contexto['name'] = elemento[0]
				contexto['id'] = elemento[1]
				respuesta.append(contexto)
		except:
			return HttpResponseBadRequest('Bad Request')
		return JsonResponse(respuesta, safe=False)
	else:
		return HttpResponseBadRequest('Not get method')

def agregar(request):
	if request.method == 'POST':
		data = request.body
		print data
		empleado = json.loads(data)
		print empleado
		cursor = connection.cursor()
		cursor.execute("insert into s_emp(id,last_name) values (:id,:apellido)",empleado)
		return HttpResponse("Successfull")
	else:
		return HttpResponseBadRequest('mal')
