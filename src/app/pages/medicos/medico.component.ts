import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.models';
import { HospitalService, MedicoService } from '../../services/service.index';
import { Medico } from 'src/app/models/medico.model';
// Con el activatedroute recojo los parametros que me llegan por la url
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '');
  hospital: Hospital = new Hospital('');
  constructor(
    // Una buena manera es poner guin abajo a mis servicios propios
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    // Recojo los parametros que estan en el URL
    activatedRoute.params.subscribe( params => {
      let id = params['id'];
      if ( id !== 'nuevo' ) {
        this.cargarMedico( id );
      }

    });
   }

  ngOnInit(): void {
    this._hospitalService.cargarHospitales()
          .subscribe( hospitales => this.hospitales = hospitales );
    // Esto es la manera correcta de hacerlo
    this._modalUploadService.notificacion
        // Aqui no da ningun errror porque estamos diciendo que esto(resp) es de tipo any
        .subscribe( resp => {
          this.medico.img = resp.medico.img;
        });
  }

  cargarMedico( id: string ) {
    this._medicoService.cargarMedico( id )
          .subscribe( medico => {
            this.medico = medico;
            this.medico.hospital = medico.hospital._id;
            this.cambioHospital( this.medico.hospital );
          });
  }

  guardarMedico( f: NgForm ) {

    if ( f.invalid) {
      return;
    }

    this._medicoService.guardarMedico( this.medico )
        .subscribe( medico => {
          this.medico._id = medico._id;
          this.router.navigate(['/medico', medico._id]);
        });
  }

  cambioHospital( id: string ) {
    console.log( id );
    this._hospitalService.obtenerHospital( id )
          .subscribe( hospital => this.hospital = hospital );
  }

  cambiarFoto() {
    // Con esto se muestra el modal, pero para poder recibir la informacion del modal yo necesito suscribirme a la notificacion del modal
    this._modalUploadService.mostrarModal( 'medicos', this.medico._id );
  }

}
