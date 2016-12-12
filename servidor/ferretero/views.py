import json
import datetime
from django.db import connection
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponse

def get_productos(request):
	if request.method == 'GET':
		r = request.GET.get
		proveedor = (r('proveedor'))
		try:
			cursor = connection.cursor()
			respuesta = []
			for c in cursor.execute("select U.nom_unidad,CP.id_catalog_produc from catalogo_producto CP, distribucion DS,unidad U where DS.id_catalog_produc=CP.id_catalog_produc and CP.num_unidad=U.num_unidad and DS.cedula="+proveedor):
				context = {}
				context['nombre'] = c[0]
				context['idcatalogo'] = c[1]
				respuesta.append(context)
		except:
			return HttpResponseBadRequest('Bad request')
		return JsonResponse(respuesta, safe=False) 
	else:
		return HttpResponseBadRequest('No get method')

def get_proveedor(request):
	if request.method == 'GET':
		r = request.GET.get
		proveedor = (r('proveedor'))
		try:
			cursor = connection.cursor()
			respuesta = []
			for c in cursor.execute("select p.nompersona,tc.des_tipo_cont, cp.descontactopersona,p.cedula from tipo_persona tp, tipo_cliente tc, persona P, contactoPersona cp,tipo_contacto tc where tp.tipo_perso_id = tc.tipo_perso_id and tc.cedula = p.cedula and cp.cedula = p.cedula and tc.tipo_cont_id=cp.tipo_cont_id and lower(tp.tipo_perso_id) like ('prv') and p.cedula ="+proveedor+" order by tc.des_tipo_cont"):
				context = {}
				context['nombre'] = c[0]
				context['tipo'] = c[1]
				context['valor'] = c[2]
				context['cedula'] = c[3]
				respuesta.append(context)
		except:
			return HttpResponseBadRequest('Bad request')
		return JsonResponse(respuesta, safe=False) 
	else:
		return HttpResponseBadRequest('No get method')

def proveedor(request):
	if request.method == 'GET':
		r = request.GET.get
		proveedor = int(r('proveedor'))
		contrasena_emp = int(r('contrasena_emp'))
		if id_emp == 3456767 and contrasena_emp == 123456789:
			try:
				cursor = connection.cursor()
				listcontext = []
				for c in cursor.execute("select emp.id_emp, emp.nombre_emp, emp.nombre_emp, emp.apellido_emp,emp.telefono_emp, emp.correo_emp, cont.des_cont from empleado emp,contrato cont where emp.id_emp=3456767 and emp.contrasena_emp=123456789 and cont.id_emp=emp.id_emp and cont.des_cont='Administrador'"):
					context = {}
					context['id_emp'] = c[0]
					context['nombre_emp'] = c[1]
					context['nombre_emp'] = c[2]
					context['apellido_emp'] = c[3]
					context['telefono_emp'] = c[4]
					context['correo_emp'] = c[5]
					context['des_cont'] = c[6]
					listcontext.append(context)
			except:
				return HttpResponseBadRequest('Bad Request')
			return JsonResponse(listcontext, safe=False)
		else:
			return HttpResponse('usuario o clave incorrecta')
	else:
		return HttpResponseBadRequest('NOT GET METHOD')

def post_transaccion(request):
	if request.method == 'POST':
		data = request.body
		transaccion = json.loads(data)
		empleado = transaccion["empleado"]
		proveedor = transaccion["proveedor"]
		cursor = connection.cursor()
		cursor.execute("INSERT INTO TRANSACCION (ID_EMPLEADO, DES_TIPO_TRANSACCION, CEDULA, FECHA_TRANSACCION, HORA_TRANSACCION, DESCUENTO, TOTAL_TRANSACCION) VALUES ("+empleado+", 'OrdenCompra', "+proveedor+", sysdate, sysdate, '0', '0')")
		return HttpResponse('successful')
	else:
		return HttpResponseBadRequest('mal')

def get_ultimatransaccion(request):
	if request.method == 'GET':
		try:
			cursor = connection.cursor()
			respuesta = []
			for c in cursor.execute("select MAX(T.num_transaccion) from transaccion T"):
				context = {}
				context['numero'] = c[0] 
				respuesta.append(context)
		except:
			return HttpResponseBadRequest('Bad request')
		return JsonResponse(context, safe=False) 
	else:
		return HttpResponseBadRequest('No get method')

def post_item(request):
	if request.method == 'POST':
		data = request.body
		item = json.loads(data)
		print item
		numtransaccion = item["numtransaccion"]
		idcatalogo = item["idcatalogo"]
		cantidad = item["cantidad"]
		cursor = connection.cursor()
		cursor.execute("INSERT INTO DETALLE_TRANSACCION (NUM_TRANSACCION, ID_CATALOG_PRODUC, DES_DETALLE_TRANS, CANTIDAD) VALUES ("+numtransaccion+", "+idcatalogo+", 'OrdenCompra', "+cantidad+")")
		return HttpResponse('successful')
	else:
		return HttpResponseBadRequest('mal')

def post_item_factura(request):
	if request.method == 'POST':
		data = request.body
		item = json.loads(data)
		print item
		numtransaccion = item["numtransaccion"]
		idcatalogo = item["idcatalogo"]
		cantidad = item["cantidad"]
		precio = item["precio"]
		cursor = connection.cursor()
		cursor.execute("INSERT INTO DETALLE_TRANSACCION (NUM_TRANSACCION, ID_CATALOG_PRODUC, DES_DETALLE_TRANS, CANTIDAD, PRECIO_PARCIAL) VALUES ("+numtransaccion+", "+idcatalogo+", 'FacturaCompra', "+cantidad+", "+precio+")")
		return HttpResponse('successful')
	else:
		return HttpResponseBadRequest('mal')

def get_detalle(request):
	if request.method == 'GET':
		r = request.GET.get
		detalle = (r('detalle'))
		try:
			cursor = connection.cursor()
			respuesta = []
			for c in cursor.execute("SELECT DT.ID_DETALLE_TRANS, DT.ID_CATALOG_PRODUC,U.nom_unidad,T.cedula, DT.cantidad FROM TRANSACCION T,DETALLE_TRANSACCION DT, UNIDAD U WHERE T.NUM_TRANSACCION = DT.NUM_TRANSACCION and DT.ID_CATALOG_PRODUC = U.NUM_UNIDAD and LOWER(DT.NUM_TRANSACCION) LIKE '"+detalle+"'"):
				context = {}
				context['iddetalletransaccion'] = c[0]
				context['idcatalogo'] = c[1]
				context['nombre'] = c[2]
				context['cedula'] = c[3]
				context['cantidad'] = c[4]
				respuesta.append(context)
		except:
			return HttpResponseBadRequest('Bad request')
		return JsonResponse(respuesta, safe=False) 
	else:
		return HttpResponseBadRequest('No get method')

def eliminar_producto(request):
		data = request.body
		producto = json.loads(data)
		print producto
		iddetalle = producto["iddtalle"]
		idtransaccion = producto["idtransaccion"]
		cursor = connection.cursor()
		cursor.execute("delete from detalle_transaccion where id_detalle_trans like '"+iddetalle+"' and num_transaccion like '"+idtransaccion+"'")
		return HttpResponse('successful')

def post_factura(request):
	if request.method == 'POST':
		data = request.body
		factura = json.loads(data)
		empleado = factura["empleado"]
		orden = factura["orden"]
		cedula = factura["cedula"]
		total = factura["total"]
		docprov = factura["docprov"]
		cursor = connection.cursor()
		cursor.execute("INSERT INTO TRANSACCION (ID_EMPLEADO, DES_TIPO_TRANSACCION,TRA_NUM_TRANSACCION , CEDULA, FECHA_TRANSACCION, HORA_TRANSACCION, DESCUENTO, TOTAL_TRANSACCION, NUM_DOCU_PROV) VALUES ("+empleado+", 'FacturaCompra', "+orden+","+cedula+", sysdate, sysdate, '0', "+total+","+docprov+")")
		return HttpResponse('successful')
	else:
		return HttpResponseBadRequest('mal')

def post_inventario(request):
	if request.method == 'POST':
		data = request.body
		inventario = json.loads(data)
		numtransaccion = inventario["numtransaccion"]
		iddetalletrans = inventario["iddetalletrans"]
		cantidad = inventario["cantidad"] 
		precio = inventario["precio"]
		cursor = connection.cursor()
		cursor.execute("INSERT INTO INVENTARIO (NUM_TRANSACCION, ID_DETALLE_TRANS, ID_TIPOMOVIM, CANTIDAD_ITEMS, VALORUNIDAD, FECHAINVENTARIO, HORAINVENTARIO, SALDO) VALUES ('2', '1', '1', '3', '5500', TO_DATE(sysdate, 'YYYY-MM-DD HH24:MI:SS'), TO_DATE(sysdate, 'YYYY-MM-DD HH24:MI:SS'), '3')")
		return HttpResponse('successful')
	else:
		return HttpResponseBadRequest('mal')