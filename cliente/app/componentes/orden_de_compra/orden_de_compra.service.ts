import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrdenDeCompraService {

    private obtener_proveedorURL = 'http://localhost:8000/get_proveedor/?proveedor=';
    private obtener_productosURL = 'http://localhost:8000/get_productos/?proveedor=';
    private post_transaccionURL = 'http://localhost:8000/post_transaccion/';
    private get_ultimatransaccionURL = 'http://localhost:8000/get_ultimatransaccion/';
    private post_itemURL = 'http://localhost:8000/post_item/';

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

    getProductos(cedula:string){
        console.log(this.obtener_productosURL+cedula);
        return this.http.get(this.obtener_productosURL+cedula)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    postTransaccion(transaccion: Object): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.post_transaccionURL,transaccion,options)
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

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}