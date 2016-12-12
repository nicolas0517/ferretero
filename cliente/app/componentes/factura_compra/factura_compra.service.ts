import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class FacturaCompraService {

    private obtener_proveedorURL = 'http://localhost:8000/get_proveedor/?proveedor=';
    private get_detalleURL = 'http://localhost:8000/get_detalle/?detalle=';
    private obtener_productosURL = 'http://localhost:8000/get_productos/?proveedor=';
    private get_ultimatransaccionURL = 'http://localhost:8000/get_ultimatransaccion/';
    private eliminar_productoURL = 'http://localhost:8000/eliminar_producto/';
    private post_facturaURL = 'http://localhost:8000/post_factura/';
    private post_itemURL = 'http://localhost:8000/post_item_factura/';
    private post_inventarioURL = 'http://localhost:8000/post_inventario/';

    constructor(private http: Http) { }

    getUltimaTransaccion(){
        return this.http.get(this.get_ultimatransaccionURL)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getProveedor(cedula:string){
        console.log(this.obtener_proveedorURL+cedula);
        return this.http.get(this.obtener_proveedorURL+cedula)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getDetalle(numero_orden:string){
        console.log(this.get_detalleURL+numero_orden);
        return this.http.get(this.get_detalleURL+numero_orden)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    eliminarProducto(iddetalle:string,idtransaccion:string) {
        let body = {
            iddetalle: iddetalle,
            idtransaccion: idtransaccion
        }
        return this.http.delete(this.eliminar_productoURL,body)
            .toPromise()
            .then(response => console.log(response))
            .catch(this.handleError);
    }

    getProductos(cedula:string){
        console.log(this.obtener_productosURL+cedula);
        return this.http.get(this.obtener_productosURL+cedula)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    postFactura(datos: Object): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.post_facturaURL,datos,options)
             .toPromise()
             .then(res => console.log(res))
             .catch(this.handleError);
    }

    postItem(item: Object): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.post_itemURL,item,options)
             .toPromise()
             .then(res => console.log(res))
             .catch(this.handleError);
    }

    postInventario(item: Object): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.post_inventarioURL,item,options)
             .toPromise()
             .then(res => console.log(res))
             .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}