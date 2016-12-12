import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

    credenciales = {
        usuario: "",
        password: ""
    }
    submitted = false;

    constructor() { }

    ngOnInit() { }

    onSubmit() {
        this.submitted = true;
        console.log(this.credenciales);
    }

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.credenciales); }
}