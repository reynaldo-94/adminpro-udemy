import { Component } from '@angular/core';
import { SettingsService } from './services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Aca es lo que carga al principio en el app.component
  // Inyecto el servicio de ajustes, cuando es inyectado automaticamente me dispara la funcion de cargar ajustes
  constructor( public _ajustes: SettingsService) {

  }

}
