import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from './empleados.service';

@Component({
    moduleId: module.id,
    selector: 'empleados',
    templateUrl: 'empleados.component.html'
})
export class EmpleadosComponent implements OnInit {
    empleados: any[];
    error: any;

    constructor(private empleadosService: EmpleadosService) { }

    getEmpleados() {
        this.empleadosService
            .getEmpleados()
            .then(data => {
            this.empleados = data;
            console.log(this.empleados);
            })
            .catch(error => this.error = error);
    }

    ngOnInit() {
        this.getEmpleados();

    }
}