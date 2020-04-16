import { NgModule } from '@angular/core';
// Lo quito esto, porque el commonModule se encargar de la parte de los ngIf,NgFor, etc y eso no se usa en los pipes
// import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';

@NgModule({
  imports: [ ],
  declarations: [
    ImagenPipe
  ],
  // Aca le decimos que pipes se van a usar fuera de este modulo
  exports: [
    ImagenPipe
  ]
})
export class PipesModule { }
