import { Route } from '@angular/router';

import { EmpleadosComponent } from './componentes/empleados/empleados.component';
import { LandingComponent } from './componentes/landing/landing.component';
import { LoginComponent } from './componentes/login/login.component';

export const routes: Route[] = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full'},
    { path: 'inicio', component: LandingComponent },
    { path: 'empleados', component: EmpleadosComponent },
    { path: 'login', component: LoginComponent }

];