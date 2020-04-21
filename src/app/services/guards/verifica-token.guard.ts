import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }
  // Estas son las 2 posibilidades que tiene este guard que va a regresar, va a regresar un booleano y una promesa
  canActivate(): Promise<boolean> | boolean {
    console.log('Token guard');
    let token = this._usuarioService.token;
    // LO que me interesa del token es la fecha de expiracion, como puedo recuperar la infomracion que esta en el token, los token del jwt son internmente un string codificado en base 64, si yo quiero recuperar la informacion que eta en ese token, tengo que hacer lo siguiente
    // atob: Esta funcion decodifica una cadena de datos que ha sido codificado utilizando codificacion base 64
    let payload = JSON.parse( atob( token.split('.')[1]) );
    // Lo que nos interesa es la fecha de expiracion(esta en segundos) y con esa yase cunado va a expirar
    let expirado = this.expirado( payload.exp );

    if ( expirado ) {
      // Si el token ha expirado me saca , me retorna un false
      this.router.navigate(['/login']);
      return false;
    }

    // Si no ha expirado el token yo tengo que hacer otra pequeña funcion
    // Si el token ya esta proximo a expirar,
    console.log( payload );
    return this.verificaRenueva( payload.exp );
  }

  // Funcion que va a verificar si hay que renovar el token
  verificaRenueva( fechaExp: number ) : Promise<boolean> {
    // Regresa una promesa
    return new Promise( (resolve, reject) => {
      // LO multiplo por mil, px esa fecha esta en segudo y lo necesito en milisegundos
      let tokenExp = new Date( fechaExp * 1000 );
      let ahora = new Date(); // Usamos la fecha del navegador web o del sistema
      // Quiero preguntar si el token faltan 4 horas para que expire
      // Por el momento siempreva a expirar el token, porque el token vence en 4 horas( eso yo lo cree en otro lado)
      ahora.setTime( ahora.getTime() + ( 4 * 60 * 60 * 1000 ) ); // Fecha + 4 horas
      // console.log( tokenExp );
      // console.log( ahora );
      if ( tokenExp.getTime() > ahora.getTime() ) {
        // Quiere decir que todavia no esta proximo a expirar, todavia faltan mas de 4 horas para que expire, por consevuencia no quiero renovar el tken
        resolve( true );
      } else {
        // Aca el token esta proximo a vencer y tengo que renovarlo
        this._usuarioService.renuevaToken()
              .subscribe( () => {
                // Con este token ya esta actualizado
                resolve(true);
              }, () => {
                this.router.navigate(['/login']);
                reject(false);
              });
      }

      resolve( true );
    });
  }

  expirado( fechaExp: number ) {
    // Creamos una instancia del momento actual de la hora del sistema
    // gettime esta en milisegundo por eso lo diido entre mil, para que el token y la fecha sean compatibles
    let ahora = new Date().getTime() / 1000;

    if( fechaExp < ahora ) {
      // El token ya expiro
      return true;
    } else {
      // El token no expiro
      return false;
    }
  }
}
