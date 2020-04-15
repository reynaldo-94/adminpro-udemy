import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  // Este elemento recibe como parametro una referecia de un elemento html, y esa referencia lo creo, en este caso le pongo #txtProgress, de lado de Typescript le pongo de nombre tambien txtProgress(puede ser otro nombre)
  // Con esto ya tengo una referencia sin importar en que componente estoy
  @ViewChild('txtProgress') txtProgress: ElementRef;

  // Puedo definir un valor por defecto, ya sea aca, o en el constructor o en ngOnInit
  // Con el input puedo recibir datos de afuera
  // @Input('nombre') : Puedo cambiar el nombre de la variable, osea desde afuera se va a llamar nombre, pero adentro se va a llamar leyenda
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  // EventEmitter<Definicion del tipo de datos que este evento emite>
  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter(); // Sintaxis para poder emitir un numero como un evento

  constructor() {
    // console.log('Leyenda', this.leyenda);
    // console.log('Progreso', this.progreso);
  }

  ngOnInit(): void {
    // console.log('Leyenda', this.leyenda);
    // console.log('Progreso', this.progreso);
  }

  onChanges( newValue: number) {

    // Esto me llama a todos los elementos HTML con el nombre progreso, en este caso llamo al 1ero
    // let elemHTML: any = document.getElementsByName('progreso')[0];
    // console.log(this.txtProgress)

    console.log('rey', newValue);

    if ( newValue >= 100 ) {
      this.progreso = 100;
    } else if ( newValue <= 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    // elemHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit( this.progreso );

  }

  cambiarValor(valor) {
    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }
    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }

    this.progreso = this.progreso + valor;

    // Emit para emitir el evento.
    // emit(voy a emitir el this.numero, es decir voy a emitir el valor numerico que tenga progreso en este mismo momento, cuando lo cambiamos)
    this.cambioValor.emit( this.progreso );

    this.txtProgress.nativeElement.focus();

  }

}
