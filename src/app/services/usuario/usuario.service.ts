import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
// RXJS
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import swal from 'sweetalert';
import { Router } from '@angular/router';
// Lo pongo asi, porque si pongo el service.index tneog un error ciclico, nose porque
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // Cuando voy a necesitar saber si esta autentificado el ususario voy a verificar si existe el token. al igual voy a poder verificar si existe el usuario
  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService : SubirArchivoService
  ) {
    this.cargarStorage();
  }

  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    // Llamamos
    return this.http.get( url )
                  .pipe(
                    map( (resp: any) => {
                      // Cambio el token por el token nuevo
                      this.token = resp.token;
                      // Grabo en el local storage el nuevo token
                      localStorage.setItem('token', this.token);
                      console.log('Token renovado');
                      return true;
                    }),
                    catchError(err => {
                      this.router.navigate(['/login']);
                      // En caso no pueda renovar el token, me da un error
                      swal( 'No se pudo renovar token', 'No fue posible renovar token', 'error');
                      return Observable.throw( err );
                    })
                  );
  }
  // Lo unico que quiero hacer aca es que si existe el token esta logeado y si no existe no esta logeado, esto podra ser una vaildacion senciclla de este lado del front end pero recerden que todos nuestro servicions en el backend estan protegidos, asi que aunque la persona conociera alguna maner de evadir esto siempre va a chocar con las validciones que tenemos en el backend
  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    // localStorage.clear(); // Me borra todos los localstorage en este caso referente al localhost
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  loginGoogle( token: string ) {
    let url = URL_SERVICIOS + '/login/google';
    // Lo pongo entre llaves para que no sea un script plano, gracias a ecmascript6 no es necesario poner token:token
    return this.http.post( url, { token } )
              .pipe(
                map( (resp: any) => {
                  this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu);
                  console.log(resp);
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
    /*return this.http.post( url, usuario )
                .pipe(
                  map( (resp: any) => {
                    this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu);
                    return true;
                  }),
                  catch(error => {

                    console.error('HTTP Error', error.status);
                    // swal( 'Error en el login', err.error.mensaje, 'error');
                    // return throwError(err.message);

                  })
                );*/
    return this.http.post(url, usuario).pipe(

      map((resp: any) => {

        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);

        return true;

      }),

      catchError(err => {

        console.log(err.status);

        return throwError(err.message);

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
            }),
            // Si trabajamos mucho con errores, es recomendable crear un servicio que se encarge de manejar los errores.
            catchError(err => {

              console.log(err.status);
              swal( err.error.mensaje, err.error.errors.message, 'error');
              return throwError(err);

            })
          );
  }

  // Tambien podriamos trabajar con el usuario que tenemos en el objecto pero lo voy a recibir como parametro porque lo puedo actualizr de otros lugares
  actualizarUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put( url, usuario )
            .pipe(
              map( (resp: any) => {
                // Me actualiza en el storage solo si el usuario que actualizo soy yo mismo
                if ( usuario._id === this.usuario._id ) {
                  let usuarioDB: Usuario = resp.usuario;
                  this.guardarStorage( usuarioDB._id, this.token, usuarioDB, this.menu );
                }
                swal('Usuario actualizado', usuario.nombre, 'success');
                return true;
              })
            );
  }

  cambiarImagen( archivo: File, id: string ) {
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id)
        .then( (resp: any) => {
          console.log(resp);
          this.usuario.img = resp.usuario.img;
          swal('Imagen Actualizada', this.usuario.nombre, 'success');
          this.guardarStorage( id, this.token, this.usuario, this.menu );
        })
        .catch( resp => {
          console.log(resp);
        });
  }

  cargarUsuarios( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get( url );
  }

  buscarUsuarios( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    // Si quiero retornar algunos valor, en este caso solo usuarios, ponga una pipe map
    return this.http.get( url )
            .pipe(
              map( (resp: any) => resp.usuarios)
            );
  }

  borrarUsuario( id: string ) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url )
              .pipe(
                map( resp => {
                  swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
                  return true;
                })
              );
  }
}
