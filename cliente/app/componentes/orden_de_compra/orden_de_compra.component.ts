import { Component, OnInit } from '@angular/core';

import { OrdenDeCompraService } from './orden_de_compra.service';

@Component({
    moduleId: module.id,
    selector: 'orden-de-compra',
    templateUrl: 'orden_de_compra.component.html'
})
export class OrdenDeCompraComponent implements OnInit {

    fecha = new Date();
    proveedor = [];
    mensaje: string;
    productos = []
    numero_transaccion = {};
    items = []

    transaccion = {
        empleado: "2",
        proveedor: null,
        fecha: this.fecha.getDate() + "/" + (this.fecha.getMonth() +1) + "/" + this.fecha.getFullYear(),
    }

    contador_item = 1;

    item = {
        item: this.contador_item,
        numtransaccion: null,
        idcatalogo: null,
        precio: null,
        cantidad: null
    }

    constructor(private ordenDeCompraService: OrdenDeCompraService) { }

    ngOnInit() { 
        this.getUltimaTransaccion();
    }

    getUltimaTransaccion(){
        this.ordenDeCompraService
            .getUltimaTransaccion()
            .then(data => {
                this.numero_transaccion = data.numero;
                this.numero_transaccion++;
                this.item.numtransaccion = String(this.numero_transaccion);
                console.log(this.numero_transaccion);
            })
    }

    getProveedor(cedula:string) {
        this.ordenDeCompraService
            .getProveedor(cedula)
            .then(data => {
                this.proveedor = data;
                console.log(this.proveedor);
                if (this.proveedor.length > 0){
                    this.getProductos(cedula);
                } else {
                    this.mensaje = "No se encontraron resultados"
                }
            })
            .catch(error => console.log(error));
    }

    getProductos(cedula:string) {
        this.ordenDeCompraService
            .getProductos(cedula)
            .then(data => {
                this.productos = data;
                console.log(this.productos);
            })
            .catch(error => console.log(error));
    }

    agregarProducto() {
        this.items.push(this.item);
        this.contador_item++;
        this.item = {
            item: this.contador_item,
            numtransaccion: this.item.numtransaccion,
            idcatalogo: "",
            precio: null,
            cantidad: null
        }
    }

    enviarOrden() {
        this.transaccion.proveedor = this.proveedor[0].cedula;
        console.log(this.transaccion);
        this.ordenDeCompraService
            .postTransaccion(this.transaccion)
            .then(() => {
                this.enviarItem()
            })
    }

    enviarItem() {
        console.log(this.items);
        let i;
        for (i = 0;i < this.items.length;i++){
            this.ordenDeCompraService
                .postItem(this.items[i])
        }
        this.reiniciarInterfaz(); 
    }

    reiniciarInterfaz() {
        this.getUltimaTransaccion();
        this.proveedor = [];
        this.productos = []
        this.items = [];
        this.contador_item = 1;
    }

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.transaccion); }
    get diagnostic2() { return JSON.stringify(this.item); }
}