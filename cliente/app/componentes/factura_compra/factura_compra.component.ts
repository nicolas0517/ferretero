import { Component, OnInit } from '@angular/core';

import { FacturaCompraService } from './factura_compra.service';

@Component({
    moduleId: module.id,
    selector: 'factura-compra',
    templateUrl: 'factura_compra.component.html'
})
export class FacturaCompraComponent implements OnInit {

    numero_transaccion = {};
    fecha = new Date();
    factura = {
        empleado: "2",
        fecha: this.fecha.getDate() + "/" + (this.fecha.getMonth() +1) + "/" + this.fecha.getFullYear()
    }
    proveedor = [];
    mensaje: string;
    detalles = [];
    mensaje2: string;

    item = {
        precio: [],
        doc_proveedor: null,
        total_factura: null
    }

    get diagnostic() { return JSON.stringify(this.item); }
    get diagnostic2() { return JSON.stringify(this.detalles); }

    constructor(private facturaCompraService: FacturaCompraService) { }

    ngOnInit() { 
        this.getUltimaTransaccion();
    }

    getUltimaTransaccion(){
        this.facturaCompraService
            .getUltimaTransaccion()
            .then(data => {
                this.numero_transaccion = data.numero;
                this.numero_transaccion++;
                //this.item.numtransaccion = String(this.numero_transaccion);
                console.log(this.numero_transaccion);
            })
    }

    getProveedor(cedula:string) {
        this.facturaCompraService
            .getProveedor(cedula)
            .then(data => {
                this.proveedor = data;
                console.log(this.proveedor);
                if (this.proveedor.length > 0){
                    
                } else {
                    this.mensaje = "No se encontraron resultados"
                }
            })
            .catch(error => console.log(error));
    }

    getDetalle(numero_orden:string) {
        this.facturaCompraService
            .getDetalle(numero_orden)
            .then(data => {
                this.detalles = data;
                console.log(this.detalles);
                if (this.detalles.length > 0){
                    this.getProveedor(this.detalles[0].cedula);
                } else {
                    this.mensaje2 = "No se encontraron resultados"
                    this.proveedor = [];
                }
            })
            .catch(error => console.log(error));
    }

    eliminarProducto(iddetalle:string,idtransaccion:string) {
        this.facturaCompraService
            .eliminarProducto(iddetalle,idtransaccion)
            .then(() => {
                alert("EL PRODUCTO FUE ELIMINADO DE LA FACTURA");
            })
    }

    totalizar(numero_orden:string) {
        let total:number = 0;
        for (let i = 0;i < this.detalles.length; i++){
            total += this.detalles[i].cantidad * this.item.precio[i]; 
        }
        this.item.total_factura = total;
        let datos_factura = {
            empleado: this.factura.empleado,
            orden: numero_orden,
            cedula: this.proveedor[0].cedula,
            total: String(this.item.total_factura),
            docprov: String(this.item.doc_proveedor)
        }
        this.facturaCompraService
            .postFactura(datos_factura)
            .then(() => {
                console.log("succesful");
                this.enviarItem()
            })
    }

    enviarItem() {
        let items = [];
        for (let i = 0; i < this.detalles.length; i++){
            let item = {
                numtransaccion: String(this.numero_transaccion),
                idcatalogo: String(this.detalles[i].idcatalogo),
                cantidad: String(this.detalles[i].cantidad),
                precio: String(this.item.precio[i])
            }
            items.push(item);
        }
        for (let i = 0;i < items.length;i++){
            this.facturaCompraService
                .postItem(items[i])
        }
        //this.reiniciarInterfaz(); 
    }

    postInventario() {
        let items = [];
        for (let i = 0; i < this.detalles.length; i++){
            let a = i+1;
            let item = {
                numtransaccion: String(this.numero_transaccion),
                iddetalletrans: String(this.numero_transaccion+""+a),
                cantidad: String(this.detalles[i].cantidad),
                precio: String(this.item.precio[i])
            }
            items.push(item);
        }
        for (let i = 0;i < items.length;i++){
            this.facturaCompraService
                .postInventario(items[i])
        }
    }

    nuevaFactura(){
        this.getUltimaTransaccion();
        this.proveedor=[];
        this.item.doc_proveedor = null;
        this.detalles = [];
        this.item.total_factura = null;
    }

}