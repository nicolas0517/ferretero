import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EmpleadosComponent } from './componentes/empleados/empleados.component';
import { routes } from './app.routes';

import { EmpleadosService } from './componentes/empleados/empleados.service';

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
        EmpleadosComponent
    ],
    providers: [
        EmpleadosService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
