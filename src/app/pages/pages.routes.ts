import { RouterModule, Routes } from '@angular/router';
// import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// import { LoginGuardGuard, AdminGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';

import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';

// Mi arreglo de Page Routes simplemente son todas las rutas que yo quiero cargar mediante el lazy load, que yo quiero cargar despues de que el usuario se autentique
const pagesRoutes: Routes = [
    // El token VerificaTokenGuard lo mejor seria poner en todos los componentes, en este caso solo lo pongo en el dashboard
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [VerificaTokenGuard],
        data: { titulo: 'Dashboard'}
    },
    { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'} },
    { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas'} },
    { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'} },
    { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del tema'} },
    { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario'} },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador'} },
    // Mantenimientos
    {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: 'Mantenimiento de usuarios'}
    },
    { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales'} },
    { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de médicos'} },
    { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar médico'} },
    // La ruta cuando no existe ninguna ruta
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

// const pagesRoutes: Routes = [
//     {
//         path: '',
//         component: PagesComponent,
//         // Cada una de las rutas ya esta pasando por el LoginGuards
//         canActivate: [ LoginGuardGuard ],
//         // Defino hijos,Defino un arreglo secundario, con el router o roulet secundario
//         // Todas las rutas tienen una propiedad llamada data, es opcional, esta data puede ser cualquier cosa, puede ser un string, un booleano,cualquier cosa, es un objeto, pero para pasar data les recomendaria siempre que la graben dentro de un objeto(de llaves cuadradas) px asi usteden pueden definir mas observaciones
//         children: [
//             // Generales
//             { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'} },
//             { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'} },
//             { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas'} },
//             { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
//             { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'} },
//             { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del tema'} },
//             { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario'} },
//             { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador'} },
//             // Mantenimientos
//             {
//                 path: 'usuarios',
//                 component: UsuariosComponent,
//                 canActivate: [ AdminGuard ],
//                 data: { titulo: 'Mantenimiento de usuarios'}
//             },
//             { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales'} },
//             { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de médicos'} },
//             { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar médico'} },
//             // La ruta cuando no existe ninguna ruta
//             { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
//         ]
//     },
// ];

// tslint:disable-next-line: max-line-length
// El forRoot se usa cuando es la ruta principal, pero como estan son rutas que son rutas que estan dentro de otras rutas o mejor dicho router outlets dentro de otro router outlets por eso se usa el forChild
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
