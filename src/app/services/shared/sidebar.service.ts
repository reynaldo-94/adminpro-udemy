import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [];
  // Es un arreglo de objetos, cada objeto va a tener un titulo
  // menu: any = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       // url: A que pagina va a redireccionar
  //       { titulo: 'Dashboard', url: '/dashboard' },
  //       { titulo: 'Progressbar', url: '/progress' },
  //       { titulo: 'Gráficas', url: '/graficas1' },
  //       { titulo: 'Promesas', url: '/promesas' },
  //       { titulo: 'RxJs', url: '/rxjs' }
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: '/usuarios' },
  //       { titulo: 'Hospitales', url: '/hospitales' },
  //       { titulo: 'Médicos', url: '/medicos' },
  //     ]
  //   }
  // ];

  constructor(
    public _usuarioService: UsuarioService
  ) { }

   cargarMenu() {
    this.menu = this._usuarioService.menu;
   }
}
