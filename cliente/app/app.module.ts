import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LandingComponent } from './componentes/landing/landing.component';
import { LoginComponent } from './componentes/login/login.component';
import { OrdenDeCompraComponent } from './componentes/orden_de_compra/orden_de_compra.component';
import { FacturaCompraComponent } from './componentes/factura_compra/factura_compra.component';
import { routes } from './app.routes';

import { LoginService } from './componentes/login/login.service';
import { OrdenDeCompraService } from './componentes/orden_de_compra/orden_de_compra.service';
import { FacturaCompraService } from './componentes/factura_compra/factura_compra.service';

@NgModule({
    imports: [ 
        BrowserModule,
        HttpModule,
        JsonpModule,
        RouterModule.forRoot(routes),
        FormsModule
    ],
    exports: [],
    declarations: [ 
        AppComponent,
        LandingComponent,
        LoginComponent,
        OrdenDeCompraComponent,
        FacturaCompraComponent
    ],
    providers: [
        LoginService,
        OrdenDeCompraService,
        FacturaCompraService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
