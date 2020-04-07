// El objetivo de este modulo es que aqui tengamos centrlizado todos los servicios para poder proveerlos en un unico archivo, es decir no tener como 50 servicio o todos loservicios que yo pueda usar en el app.module.ts, la idea del modulo es esa misma compactarlos o tenerlo todos ahi para proveerlos de una unica manera.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 
  SettingsService,
  SidebarService,
  SharedService
 } from './service.index'

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService
  ]
})
export class ServiceModule { }
