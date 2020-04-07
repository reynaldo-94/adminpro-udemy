import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        // Defino hijos,Defino un arreglo secundario, con el router o roulet secundario
        children: [
            { path: 'dashboard', component: DashboardComponent},
            { path: 'progress', component: ProgressComponent},
            { path: 'graficas1', component: Graficas1Component},
            { path: 'account-settings', component: AccountSettingsComponent},
            // La ruta cuando no existe ninguna ruta
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    },
];

// tslint:disable-next-line: max-line-length
// El forRoot se usa cuando es la ruta principal, pero como estan son rutas que son rutas que estan dentro de otras rutas o mejor dicho router oulets dentro de otro router outlets por eso se usa el forChild
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
