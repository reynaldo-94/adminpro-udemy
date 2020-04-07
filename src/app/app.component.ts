import { Component } from '@angular/core';
import { SettingsService } from './services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Aca es lo carga al principio en el app.component
  // Inyecto lel servicio de ajustes, cuando es inyectado utomaticamente me dispare la funcion de cargar ajustes
  constructor( public _ajustes: SettingsService) {

  }

}
