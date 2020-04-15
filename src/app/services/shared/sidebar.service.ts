import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  // Es un arreglo de objetos, cada objeto va a tener un titulo
  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        // url: A que pagina va a redireccionar
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'Progressbar', url: '/progress' },
        { titulo: 'Gráficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'RxJs', url: '/rxjs' }
      ]
    }
  ];

  constructor() { }
}
