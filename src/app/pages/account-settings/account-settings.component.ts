import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  constructor( public _ajustes: SettingsService ) { }

  ngOnInit(): void {
    // Cuando la pagina sea carga se va a ejecutar esta funcion
    this.colocarCheck();
  }

  cambiarColor( tema: string, link: any ) {
    // Estoy pasando el link por referencia a esta funcion
    this.aplicarCheck( link );

    this._ajustes.aplicarTema( tema );
  }

  aplicarCheck( link: any ) {
    // Uso JavaScripts
    // Agrupo todos los selectores
    let selectores: any = document.getElementsByClassName('selector');

    for ( let ref of selectores) {
      // Voy a remover cualquier clase que diga working
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocarCheck() {
    // Con esto obtengo todos mis arreglos que tiene l clase selector
    let selectores: any = document.getElementsByClassName('selector');

    let tema = this._ajustes.ajustes.tema;
    for ( let ref of selectores) {
    // Pregunto sobre la referencia
      if ( ref.getAttribute('data-theme') === tema ) {
        ref.classList.add('working');
        break; // Si hace uno, ya lo demas seria por la pura, asi pongo break
      }

    }
  }

}
