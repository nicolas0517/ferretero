import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrdenDeCompraService {

    private apiURL = 'http://localhost:8000/departamentos/';
    private postURL = 'http://localhost:8000/agregar/';

    constructor(private http: Http) { }

    getEmpleados(): Promise<any[]> {
        return this.http.get(this.apiURL)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    postEmpleados(empleado: Object): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.postURL,empleado,options)
             .toPromise()
             .then(res => console.log(res))
             .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}