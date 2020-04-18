import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    // Uso el usuario service porque aqui tengo el usuario y puedo verificar el rol
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }
  canActivate() {
    // La ventaja de esto esque en esto momoento ya tengo la informacion del usuario sin ningun proceso asincrono
    if ( this._usuarioService.usuario.role === 'ADMIN_ROLE' ) {
      return true;
    } else {
      console.log( 'Bloqueado por el ADMIN GUARD');
      this._usuarioService.logout();
      return false;
    }
    return true;
  }

}
