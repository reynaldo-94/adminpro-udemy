import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario/usuario.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  // Esto yo necesito cargarla cunado se detecta un cambio en el input file
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    // Como estoy en el constructio es opcional usar el this, peor yo lo voy a dejar puesto
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  guardar( usuario: Usuario ) {
    console.log(usuario);
    this.usuario.nombre = usuario.nombre;
    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }

    // Llamo a la funcion de mi servicio
    // Para ejecutaarla necesito suscribirme
    this._usuarioService.actualizarUsuario( this.usuario )
              .subscribe();
  }

  seleccionImagen( archivo: File ) {
    // Sino recibimos ningun archivo que no haga nada
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Solo imagenes', 'El archivo sleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;

    // Esto ej javascript nativo
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );
    // Esto me muestra la imagen en base64
    // console.log( reader.result );
    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );
  }

}
