import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EmpleadosComponent } from './componentes/empleados/empleados.component';
import { LandingComponent } from './componentes/landing/landing.component';
import { LoginComponent } from './componentes/login/login.component';
import { routes } from './app.routes';

import { EmpleadosService } from './componentes/empleados/empleados.service';
import { LoginService } from './componentes/login/login.service';

@NgModule({
    imports: [ 
        BrowserModule,
        HttpModule,
        JsonpModule,
        RouterModule.forRoot(routes)
    ],
    exports: [],
    declarations: [ 
        AppComponent,
        EmpleadosComponent,
        LandingComponent,
        LoginComponent
    ],
    providers: [
        EmpleadosService,
        LoginService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
