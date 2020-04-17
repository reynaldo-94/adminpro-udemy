import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  // Tenemos que hacer el proceso de carga de la imagen, eso ya lo tenemos echo en el servicio de subir archivo
  constructor(
    public _subirArchiService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) {

    console.log('Modal listo');
  }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
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

  subirImagen() {
    console.log('click');
    this._subirArchiService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id )
        .then( resp => {
          console.log( resp );
          // Si se sube la imagen tengo que emitir que ya se subio la imagen, como hago para emitir a todo el mundo que esta escuchado o esta pendiente que ya se subio la imagen, hacemos el llamado del objeto del sevicio
          this._modalUploadService.notificacion.emit( resp );
          // Una vez emitamos el modal se oculta
          this.cerrarModal();
        })
        .catch( err => {
          console.log( 'Error en la carga...' );
        });
  }

}
