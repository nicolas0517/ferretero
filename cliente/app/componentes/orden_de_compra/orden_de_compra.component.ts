import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'orden-de-compra',
    templateUrl: 'orden_de_compra.component.html'
})
export class OrdenDeCompraComponent implements OnInit {

    fecha = new Date();
    fecha_actual = "";
    proveedores = [
        {
            cedula: "1010215124",
            nombre: "nicolas bernal",
            direccion: "calle 6",
            telefono: "3911977"
        },{
            cedula: "1010215124",
            nombre: "nicolas bernal",
            direccion: "calle 6",
            telefono: "3911977"
        },{
            cedula: "1010215124",
            nombre: "nicolas bernal",
            direccion: "calle 6",
            telefono: "3911977"
        } 
    ]

    productos = [
        {
            cedula: "1010215124",
            nombre: "nicolas bernal",
            direccion: "calle 6",
            telefono: "3911977"
        },{
            cedula: "1010215124",
            nombre: "nicolas bernal",
            direccion: "calle 6",
            telefono: "3911977"
        },{
            cedula: "1010215124",
            nombre: "nicolas bernal",
            direccion: "calle 6",
            telefono: "3911977"
        } 
    ]

    orden_de_compra = {
        numero: 0,
        fecha: this.fecha.getDate() + "/" + (this.fecha.getMonth() +1) + "/" + this.fecha.getFullYear(),
        empleado: "nicolas",
        proveedor: "",
        items: []
    }

    contador_item = 1;

    item = {
        item: this.contador_item,
        producto: "",
        precio: null,
        cantidad: null
    }

    constructor() { }

    ngOnInit() { 
        
    }

    agregarProducto() {
        this.orden_de_compra.items.push(this.item);
        this.contador_item++;
        this.item = {
            item: this.contador_item,
            producto: "",
            precio: null,
            cantidad: null
        }
    }

    onSubmit() {
        console.log(this.orden_de_compra);
    }

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.orden_de_compra); }
    get diagnostic2() { return JSON.stringify(this.item); }
}