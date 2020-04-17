import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit {
  // Le decimos a typescript que esto es un arreglo de usuarios
  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;
  constructor(
    // Injectemos el servicio usuarios
    public _usuarioService: UsuarioService,
    // Injectamos el servicio que me permite controlar el modal
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    // Recargo la pagina actual, con los datos actualizados
    this._modalUploadService.notificacion
        .subscribe( resp => this.cargarUsuarios() );
  }

  mostrarModal( id: string ) {
    this._modalUploadService.mostrarModal( 'usuarios', id );
  }

  cargarUsuarios() {
    // Cuando empieza a cargar
    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde )
              .subscribe( (resp: any) => {
                // console.log( resp );
                this.totalRegistros = resp.total;
                this.usuarios = resp.usuarios;
                this.cargando = false; // Cuando termina de cargar
              });
  }

  cambiarDesde( valor: number ){
    let desde = this.desde + valor;
    console.log( desde );

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuarios( termino )
          .subscribe ( (usuarios: Usuario[]) => {
            this.usuarios = usuarios;
            this.cargando = false;
          });
  }

  borrarUsuario( usuario: Usuario ) {
    if ( usuario._id === this._usuarioService.usuario._id ) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: 'Estás seguro?',
      text: 'Está a punto de borrar  a ' + usuario.nombre,
      icon: 'warning',
      buttons: [true, true],
      dangerMode: true,
    })
    .then( borrar => {

    if (borrar) {
      this._usuarioService.borrarUsuario( usuario._id )
            .subscribe( borrado => {
              console.log( borrado );
              this.cargarUsuarios();
            });
    }

    });
  }

  guardarUsuario( usuario: Usuario ) {
    this._usuarioService.actualizarUsuario( usuario )
          .subscribe();
  }
}
