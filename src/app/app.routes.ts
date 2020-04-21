import { RouterModule, Routes } from '@angular/router';

// Componentes
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
// import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';

// Defino una constante
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    // Necesito especificar que la pagina del pages routes ahora se va a cargar por aqui
    {
        path: '',
        component: PagesComponent,
        // canActivate: [ LoginGuardGuard ] , // La validacion del token
        // Yo quiero que todo lo que esta aqui dentro se carge de forma dinamica para eso uso loadChildren
        // Este string es un string que se divide en 2 partes, uno es el path al modulo que yo quiero cargar de forma dinamica, en este caso seria el pages.module px este archivo tiene las declaraciones de todos los componentes, otros servicios, otras cosas que se van a cargar despues, la 2da parte de ese string que les digo( va despues del #) tiene que ser el nombre del modulo
        loadChildren: './pages/pages.module#PagesModule'
    },
    // Cualquier otra ruta que no este definida
    { path: '**', component: NopagefoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, {useHash: true});
