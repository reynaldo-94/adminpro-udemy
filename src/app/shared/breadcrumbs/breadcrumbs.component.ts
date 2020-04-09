// Recuerden que el breadcrumb se carga siempre porque todas mis paginas pasan por ahi
import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {
    this.getDataRote()
    .subscribe( data => {
      console.log(data);
      this.titulo = data.titulo;
      // Me actualiza la etiqueta <title> del html
      this.title.setTitle(this.titulo);
      // MetaDefinition : Esto me va a ayudar a que cuando este escribiendo las cosas siempre me aprezca informacion correcta, osea para que no cometa errores de escritura
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      };
      // Me actualiza el meta tag
      this.meta.updateTag( metaTag );
    });
  }

  ngOnInit(): void {
  }

  getDataRote() {
    // El router tiene algo llamado events, este es un observable que puede regresar varias cosas
    return this.router.events.pipe(
      // Aqui dentro defino todos mis operadores para extraer la informacion que me interesa
      // Si esto es una instancia de ActivationEnd, me va a dejar pasar
      filter( evento => evento instanceof ActivationEnd ),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
      map( (evento: ActivationEnd) => evento.snapshot.data ) // Con esto obtengo lo que paso por el archivo pages.router
    );
  }

}
