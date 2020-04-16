import { NgModule } from '@angular/core';

// Modulos
import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// ng2-charts
import { ChartsModule } from 'ng2-charts';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';

// Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

// Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
@NgModule({
    // tslint:disable-next-line: max-line-length
    /* Cuando trabajamos con modulos puede ser que estas paginas solo nos sirvan para trabajar dentro de estas mismas paginas, pero en nuestro caso esta paginas tambien tiene que ser usadas por otros componentes que se encuentran fuera de este modulo por lo cual vamos a exportarlas */
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        ModalUploadComponent
    ],
    // Ponemos todos los componentes o servicios que nosotros ocupamos que sean accesados desde fuera de este modulo
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
       CommonModule,
       SharedModule,
       PAGES_ROUTES,
       FormsModule,
       ChartsModule,
       PipesModule
    ]
})

export class PagesModule { }
