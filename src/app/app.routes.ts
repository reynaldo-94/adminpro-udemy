import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';

// Defino una constante
const appRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        // Defino hijos,Defino un arreglo secundario, con el ruter o ulet secundario
        children: [
            { path: 'dashboard', component: DashboardComponent},
            { path: 'progress', component: ProgressComponent},
            { path: 'graficas1', component: Graficas1Component},
            // La ruta cuando no existe ninguna ruta
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    // Cualquier otra ruta que no este definida
    { path: '**', component: NopagefoundComponent}

];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, {useHash: true});
