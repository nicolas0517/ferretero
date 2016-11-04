import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

    titulo: string = "El ferretero";

    constructor() { }

    ngOnInit() { }
}