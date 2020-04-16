import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// Poder recibir desde cualquier pagina el tipo de archivo que quiero subir, osea si es un medico, usuario, si es un hospital, y tambien voy a aocupar el id del tipo que quiero subir, por ej. del usuario,emdico, hospital, otra cocosa que quiero controloar mediante el servicio es si esta oculto o esta habilitado el modal.
export class ModalUploadService {
  public tipo: string;
  public id: string;

  public oculto: string = 'oculto';

  // Otra coas muy importante es poder emitir algo que los otros componentes donde usen este servicio del modal se puedan suscribir para estar escuchando cuuando se sube la imagen, esta es la parte crucial para poder notificar del modal a las otras pantallas que ya se subio la imagen
  // El any va a ser el objeto respuesta del servicio de carga de imagenes
  public notificacion = new EventEmitter<any>();
  constructor() {
    console.log('Modal upload listo')
  }

  ocultarModal() {
    this.oculto = 'oculto';
    // Limpio los datos
    this.tipo = null;
    this.id = null;
  }

  mostrarModal( tipo: string, id: string ) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }
}
