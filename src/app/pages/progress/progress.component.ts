import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progreso1: number = 20;
  progreso2: number = 30;

  constructor() { }

  ngOnInit(): void {
  }

  /* actualizar( event: number ) {
    console.log('Eveto: ', event);
    this.progreso1 = event;
  } */

}
