import { Route } from '@angular/router';

import { EmpleadosComponent } from './componentes/empleados/empleados.component';

export const routes: Route[] = [
    { path: '', redirectTo: '/empleados', pathMatch: 'full'},
    { path: 'empleados', component: EmpleadosComponent }
];