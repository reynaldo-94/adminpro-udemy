import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router'; Esto no me sirve
// import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
// Algo internesan es que no puede usar el service.index porque me da un error ciclico bien raro
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {}
  canActivate(){
    // Esto no me sirve
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if ( this._usuarioService.estaLogueado() ) {
      // console.log( 'PASO EL GUARD');
      return true;
    } else {
      console.log( 'BLOQUEADO POR EL GUARD');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
