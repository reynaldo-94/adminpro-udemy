import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  // Esto es JavaScript puro, lamentablemente angular no tiene todavia na instruccion que tome una iamgen o un archivo en general y lo suba como el http.post
  // EL file es un tipo de TypeScript
  subirArchivo( archivo: File, tipo: string, id: string ) {
    return new Promise( (resolve, reject) => {
      // formData que es lo que yo voy a mandar a la peticion por ajax
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      // Condifuro el formData
      // Ese nombre imagen es del backend, tiene que ser igual
      formData.append( 'imagen', archivo, archivo.name);
      xhr.onreadystatechange = function() {
        // Aqui recibo la informacion cada vez que el estado cambie
        // SOlo me interese cuando termine el proceso, osea el 4
        if ( xhr.readyState === 4 ) {
          // 200 = exitoso
          if ( xhr.status === 200 ) {
            // Como notifico a las otras pantalla qu eesto ya termino, lo voy a hacer con una promesa
            console.log( 'Imagen subida' );
            resolve( JSON.parse( xhr.response ) ); // Si se sube la imagen mando la funcion resolve
          } else {
            console.log('Fallo la subida');
            reject( xhr.response );
          }
        }
      };
      // A donde es el url a donde voy a mandar la peticion
      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
      xhr.open('PUT', url, true);
      xhr.send( formData );
    });
  }
}
