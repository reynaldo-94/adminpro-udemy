import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  // Importo el sidebar service para poder usar su propiedad(menu)
  // tslint:disable-next-line: variable-name
  constructor(
    public _sidebar: SidebarService,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit(): void {
  }

}
