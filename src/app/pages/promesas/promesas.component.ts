import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then(
      mensaje => console.log('temrino', mensaje)
    )
    .catch( error => console.log('Error en la promesa', error));


  }

  ngOnInit(): void {
  }

  contarTres(): Promise<boolean> {

    // Resolve : cuando todo sale bien, reject : Cuando ocurre un error
    return new Promise( (resolve, reject) => {

      let contador = 0;

      // tslint:disable-next-line: prefer-const
      let intervalo = setInterval( () => {

        contador += 1;
        console.log(contador);

        if ( contador === 3 ) {
          // resolve();
          resolve(true);
          // reject('simplemente un error');
          clearInterval(intervalo);
        }

      }, 1000 ); // Quese dispare cada segundo

    });

  }

}
