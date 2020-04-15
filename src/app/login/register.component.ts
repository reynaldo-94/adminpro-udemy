import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
// Este path pudiera ser que cambie, por eso lo importo en el service index, donde esta todos los srvicios que yo tengo
// import { UsuarioService } from '../services/usuario/usuario.service';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.models';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  constructor(
    public _usuarioService: UsuarioService,
    // Para navegar necesito importar el router
    public _router: Router
  ) { }

  sonIguales( campo1: string, campo2: string ) {
    return ( group: FormGroup) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      // Sin son iguales retorna un null, osea la regla de validacion pasa, pero si no son iguales retorna un true, asi que no pasa
      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        sonIguales: true
      };

    };
  }

  ngOnInit(): void {
    init_plugins();

    this.forma = new FormGroup({
      // FormControl(El valor que el campo tiene por defecto, las validaciones de ese campo)
      nombre: new FormControl( null, Validators.required),
      correo: new FormControl( null, [Validators.required, Validators.email]),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      condiciones: new FormControl( false ) // POdemos crear personalidas a un campo ytmb un validacion general a todo el formulario
    }, { validators: this.sonIguales( 'password', 'password2' ) } );

    this.forma.setValue({
      nombre: 'Reynaldo',
      correo: 'rey@test1.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  registrarUsuario() {
    // Otra forma this.forma.invalid
    if ( !this.forma.valid ) {
      return;
    }
    if ( !this.forma.value.condiciones ) {
      console.log('Debe de aceptar las condiciones');
      swal('Importante', 'Debe de aceptr las condiciones', 'warning');
      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    // Llamamos al servicio
    // Eso no se va a disparar a menos de que yo me suscriba
    this._usuarioService.crearUsuario( usuario )
            /*.subscribe( resp => {
              console.log( resp );
              this._router.navigate(['/login']);
            });*/
            // Forma mas rapida
            .subscribe( resp => this._router.navigate(['/login']) );

  }

}
