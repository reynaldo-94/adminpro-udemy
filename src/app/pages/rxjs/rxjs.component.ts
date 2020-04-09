import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Observable } from 'rxjs'; // Aca me cargo todos los procesos del rxjs, es un poco mas pesado
import { Observable } from 'rxjs/internal/Observable'; // Esto es mas ligero porque solo me carga el obsevable
import { retry, map, filter } from 'rxjs/operators';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    // EL subscribe tiene 3 callbacks, el 1ero es cuando yo recibo infomracion, es cunado se llama a un next, el 2do es un error, y el 3ero no recibe ningun parametro, es cuando termina
    // Todos los observables apartir de la version 6 tienen un pipe
    this.subscription = this.regresaObservable().pipe(
      // retry(numero de intentos que yo quiero hacer, si pones 2 va a intertar 3, ya que la 1era es la ejecucion normal, osea a la 2da recien empieza el 1er intento)
      // retry(2)
    )
    .subscribe(
      numero => console.log('Subs', numero),
      error => console.log('Error en el obs', error),
      () => console.log('El observador termino!')
    );

  }

  ngOnInit(): void {
  }

  // Esta funcion se va a disparar cada vez que yo vaya a dejar la pagina
  ngOnDestroy() {
    console.log('La pagina se va a cerrar');
    // Borro esa suscripcion, que continene la ejecucion de la pipe
    this.subscription.unsubscribe();
  }

  // Especifico que tipo de dato va a regresar el observable
  regresaObservable(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador++;

        // Nos imaginamos que este setInterval es una llamada a una API o a n servicio que nosotros no hicimos y no tenemos el control de el, nosostros simplemente consumimos el resultado de ese serivcio, pero resulta que al dia de mañana la gente que creo este sevicio, dice, nosotros no podemos regresa el ontador directamente, tenemos que retornar un objeto y hacen esto
        const salida = {
          valor: contador
        }

        // Los observables trabajan con un strng de datos, con una linea de datos, este observable va a estar notificando mediante este next cada vez que esto llegue.
        // El next notiifica que llego el contador
        // observer.next( contador );
        observer.next( salida );

        // Lo comento por mientras para que la respuesta sea infinita, y asi al pasar de una pagina a otra, se siga ejecutando esta funcion
        // if ( contador === 3 ) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }

        // if ( contador === 2 ) {
        //   // clearInterval( intervalo );
        //   observer.error('Auxilio');
        // }

      }, 1000 );

    }).pipe(
      // El operador map recibe una informacio que me permite transformar la data
      // LO interesante del operador map es que transforma completamente la finracion y regresa a lo que ustedes necesiten
      // map( resp => resp.valor + 1 ),
      map( resp => resp.valor ),
      // Implemento el operador filter, este recibe como argumento una funcion, esta funcion afuerza tiene que regresar un true o un false
      filter( ( valor, index ) => {
        //console.log('Filter', valor, index);
        if ( (valor % 2) === 1 ) {
          // Impar
          return true;
        } else {
          // Par
          return false;
        }
      })
    );

  }

}
