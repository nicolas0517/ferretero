import { Route } from '@angular/router';

import { EmpleadosComponent } from './componentes/empleados/empleados.component';
import { LandingComponent } from './componentes/landing/landing.component';
import { LoginComponent } from './componentes/login/login.component';
import { OrdenDeCompraComponent } from './componentes/orden_de_compra/orden_de_compra.component';
import { FacturaCompraComponent } from './componentes/factura_compra/factura_compra.component';

export const routes: Route[] = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full'},
    { path: 'inicio', component: LandingComponent },
    { path: 'empleados', component: EmpleadosComponent },
    { path: 'login', component: LoginComponent },
    { path: 'orden-de-compra', component: OrdenDeCompraComponent },
    { path: 'factura-compra', component: FacturaCompraComponent }

];