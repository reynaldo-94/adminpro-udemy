import { NgModule } from '@angular/core';

// Modulos
import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// ng2-charts
import { ChartsModule } from 'ng2-charts';

// Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

// Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';

@NgModule({
    // tslint:disable-next-line: max-line-length
    /* Cuando trabajamos con modulos puede ser que estas paginas solo nos sirvan para trabajar dentro de estas mismas paginas, pero en nuestro caso esta paginas tambien tiene que ser usadas por otros componentes que se encuentran fuera de este modulo por lo cual vamos a exportarlas */
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent
    ],
    // Ponemos todos los componentes o servicios que nosotros ocupamos que sean accesados desde fuera de este modulo
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
       SharedModule,
       PAGES_ROUTES,
       FormsModule,
       ChartsModule
    ]
})

export class PagesModule { }
