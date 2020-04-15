import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.models';

declare function init_plugins();
// gapi: Es una libreria que ya lo importe en mi proyeto, se encuentra en el archivo index.html
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    init_plugins();
    this.googleInit();
    // Si no tiene ningun valor pongo comillas vacias
    this.email = localStorage.getItem('email') || '';

    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    // Carga lo que es el auth2, el 2do parametro es un callback
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '421729668311-ut9cl1tl1qe926avi340gag1nl7q95oj.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // La infomracion que neceisto de la cuenta de google, en este caso el profile y el email
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );
    });
  }

  // El attchSignIn va a recibir el elemento html
  attachSignin( element ) {
    // googleUser: Es lo que yo voy a recibir de la funcion
    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      // let profile = googleUser.getBasicProfile(); // Con esto obtengo los datos basicos de la cuenta de google
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle( token )
            .subscribe( () =>  this.router.navigate(['/dashboard']) );
            // .subscribe( () =>  window.location.href = '#/dashboard' );
    });
  }

  ingresar( forma: NgForm ) {

    if ( forma.invalid ) {
      return;
    }

    // En el value yo tengo el email y los dato sque yo necesito para llamar la funcion
    let usuario = new Usuario( null, forma.value.email, forma.value.password );
    // Para que esto se dispare necesito al subscribe
    this._usuarioService.login( usuario, forma.value.recuerdame )
                .subscribe( correcto => this.router.navigate(['/dashboard']) );

    // console.log( forma.valid );
    // console.log( forma.value );
    // this.router.navigate([ '/dashboard' ]);

  }

}
