import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.models';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.models';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  // Definimos 3 arreglos
  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(
    // Recibir parametros por la url
    public ActivatedRoute: ActivatedRoute,

    public http: HttpClient
  ) {
    ActivatedRoute.params
        .subscribe( params => {
          // Recibo el parametro termino
          let termino = params['termino'];
          console.log(termino);
          this.buscar( termino );
        });
   }

  ngOnInit(): void {
  }

  buscar( termino: string ) {
    console.log('hola');
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get( url )
        .subscribe( (resp: any) => {
          console.log( resp );
          this.hospitales = resp.hospitales;
          this.medicos = resp.medicos;
          this.usuarios = resp.usuarios;
        });
  }

}
