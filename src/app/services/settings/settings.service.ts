import { Injectable, Inject } from '@angular/core';

import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  // Las propiedades por defecto que yo voy a tener
  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  // Hacer una referencia a todo el DOM como tal
  // Es un tipo de injeccion, igual como las injecciones de servicio, solo que como esta forma
  // Con el objeto _document ya tengo acceso a todo el DOM
  // tslint:disable-next-line: variable-name
  constructor( @Inject(DOCUMENT) private _document ) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    // Va a grabar estos ajustes en el localStorage, el localStorage solo graba datos en formato string o string
    // console.log('Guardado en el local Storage');
    // JSON.stringfy : Toma un objeto y lo convierte en un string
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes ) );
  }

  cargarAjustes() {

    if ( localStorage.getItem('ajustes') ) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      // console.log('Cargando del LocalStorage');
      this.aplicarTema( this.ajustes.tema );
    } else {
      // console.log('Usando valores por defecto');
      this.aplicarTema( this.ajustes.tema );
    }

  }

  aplicarTema( tema: string ) {
    // tslint:disable-next-line: prefer-const
    let url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url );

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();
  }

}



// Me va a ayudar a mi a poder restringirme la forma de trabajar los ajustes
interface Ajustes {
  // Esto me ayuda a restringirme a mi mismo que tipo de informacion van a permitirse en los ajustes
  temaUrl: string;
  tema: string;
}

