import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  // tipo: sies un hospital, o un medico o un usuario
  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    // Verifico si en la imagen viene un https, si viene asi quiere decir que es una imagen de google
    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    // Si no es un https pueden ser 3 tipos de imagenes, usuario o medico o hospital
    switch ( tipo ) {
      case 'usuario':
        url += '/usuarios/' + img;
      break;
      case 'medico':
        url += '/medicos/' + img;
      break;
      case 'hospital':
        url += '/hospitales/' + img;
      break;
      default:
        console.log('Tipo de imagen no existe, usuario, medicos, hospitales');
        url += '/usuarios/xxx';
    }

    return url;
  }

}
