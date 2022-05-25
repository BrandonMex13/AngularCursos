import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

    // url : string = "../../../../assets/heroes/dc-arrow.jpg";
    urlImagen : string = "../../../../assets/heroes/";

    transform(heroe : Heroe): string {

        if( heroe.alt_img){
            return heroe.alt_img;
        }
        else{
            return this.urlImagen + heroe.id + ".jpg";
        }

        return "../../../../assets/no-image.png";
    }

}
