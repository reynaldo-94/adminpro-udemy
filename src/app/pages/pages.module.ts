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
// import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

// Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
// import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
@NgModule({
    // tslint:disable-next-line: max-line-length
    /* Cuando trabajamos con modulos puede ser que estas paginas solo nos sirvan para trabajar dentro de estas mismas paginas, pero en nuestro caso esta paginas tambien tiene que ser usadas por otros componentes que se encuentran fuera de este modulo por lo cual vamos a exportarlas */
    declarations: [
        // Este pagescomponent lo voy a necesitar en el root de mi aplicacion,porque lo tengo el app.routes, junto al login, al register, lo voy a poner en el app.module
        // PagesComponent,
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
        // Esto nunca debio haber estado aca px es un componente que va a hacer usado por el page componente directamente, osa va a ser usado de forma ocmo el header, el sidebar; lo importamos dentro del shared
        // ModalUploadComponent,
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent,
        BusquedaComponent
    ],
    // Ponemos todos los componentes o servicios que nosotros ocupamos que sean accesados desde fuera de este modulo
    exports: [
        // PagesComponent,
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
