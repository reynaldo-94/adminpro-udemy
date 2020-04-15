// El objetivo de este modulo es que aqui tengamos centrlizado todos los servicios para poder proveerlos en un unico archivo, es decir no tener como 50 servicio o todos loservicios que yo pueda usar en el app.module.ts, la idea del modulo es esa misma compactarlos o tenerlo todos ahi para proveerlos de una unica manera.
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardGuard
 } from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard
  ]
})
export class ServiceModule { }
