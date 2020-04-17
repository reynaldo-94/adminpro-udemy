import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.models';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
// import swal from 'sweetalert';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];

  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {
    this.cargarHospitales();
    // Recargo la pagina actual, con los datos actualizados
    // En el momento que yo sea notificado o el susbscribe emite algo
    // Al cargar todos los hospitales no es muy optimo, lo mejor seria actualizar solo el hospital modificado
    this._modalUploadService.notificacion
        .subscribe( () => this.cargarHospitales() );
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales()
        // .subscribe( (resp: any) => {
          .subscribe( hospitales => {
          this.hospitales = hospitales;
          this.cargando = false;
        });
  }

  buscarHospital( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this._hospitalService.buscarHospitales( termino )
          .subscribe( (hospitales: Hospital[] ) => {
            this.hospitales = hospitales;
            this.cargando = false;
          });
  }

  actualizarImagen( hospital: Hospital ) {
    this._modalUploadService.mostrarModal( 'hospitales', hospital._id );
  }

  guardarHospital( hospital: Hospital ) {
    this._hospitalService.actualizarHospital( hospital )
            .subscribe();
  }

  borrarHospital( hospital: Hospital ) {

    swal({
      title: 'Estás seguro?',
      text: 'Está a punto de borrar  a ' + hospital.nombre,
      icon: 'warning',
      buttons: [true, true],
      dangerMode: true,
    })
    .then( borrar => {

    if (borrar) {
      this._hospitalService.borrarHospital( hospital._id )
            .subscribe( () => this.cargarHospitales() );
    }

    });
  }

  crearHospital() {
    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: [true, true],
      dangerMode: true
    }).then( (valor: string ) => {
      if ( !valor || valor.length === 0 ) {
        return;
      }
      this._hospitalService.crearHospital( valor )
            .subscribe( () => this.cargarHospitales() );
    });
  }

}
