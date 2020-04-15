import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // Cuando voy a necesitar saber si esta autentificado el ususario voy a verificar si existe el token. al igual voy a poder verificar si existe el usuario
  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
  }
  // Lo unico que quiero hacer aca es que si existe el token esta logeado y si no existe no esta logeado, esto podra ser una vaildacion senciclla de este lado del front end pero recerden que todos nuestro servicions en el backend estan protegidos, asi que aunque la persona conociera alguna maner de evadir esto siempre va a chocar con las validciones que tenemos en el backend
  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';

    // localStorage.clear(); // Me borra todos los localstorage en este caso referente al localhost
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle( token: string ) {
    let url = URL_SERVICIOS + '/login/google';
    // Lo pongo entre llaves para que no sea un script plano, gracias a ecmascript6 no es necesario poner token:token
    return this.http.post( url, { token } )
              .pipe(
                map( (resp: any) => {
                  this.guardarStorage( resp.id, resp.token, resp.usuario);
                  return true;
                })
              );
  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      // Si no existe igual lo va a intentar a hacer y no regresa ningun error
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    // Mando los datos del usuario que llegan de la vista
    return this.http.post( url, usuario )
                .pipe(
                  map( (resp: any) => {
                    this.guardarStorage( resp.id, resp.token, resp.usuario);
                    return true;

                  })
                );
  }

  // Recibe un usuario de tipo Usuario del modelo, tambien necesito realizar peticiones Http por eso lo importo en el servicio, tambien lo tengo que importar en el service.modules
  crearUsuario( usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario';

    // Llamamosa la peticion
    // Es muuy probable que necesite suscribirme para ser notificado cuando este se grabe o se ejecuta correctamente o ocurra un error, eso lo hago en el register.component.ts
    // Voy a regresar un observador al cual nos podemos subscribir
    // El operador map me va a permitir poder tomar la respuesta y transformarla, se import del rxjs/add/operator/map
    return this.http.post( url, usuario )
          .pipe(
            map( (resp: any) => {
              swal('Usuario creado', usuario.email, 'success');
              return resp.usuario;
            })
          );
  }
}
