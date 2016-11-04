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
