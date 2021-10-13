import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
	  `
	  li{
		  cursor: pointer;
	  }
	  `
  ]
})
export class PorPaisComponent {

  termino : string = "";
  hayError : boolean = false;
  paises : Country[] = [];
  paisesSugeridos: Country[] = [];

  mostrarSugerencias: boolean = false;

  constructor(private PaisService: PaisService) { }

	buscar( termino: string){
		this.mostrarSugerencias = false;
		this.hayError = false;
		this.termino = termino;

		this.PaisService.buscarPais(this.termino)
		.subscribe((paises) => { 
			console.log(paises);
			this.paises = paises;
		}, 
		(err) => {
			this.hayError = true;
			console.log('Error'); 
			console.info(err);
			this.paises = [];
		});
	// console.log(this.termino);
	}

	sugerencias( termino: string){
		this.hayError = false;
		// TODO : crear sugerencias

		this.termino = termino;
		this.mostrarSugerencias = true;

		this.PaisService.buscarPais( termino )
		.subscribe(paises => {
			this.paisesSugeridos = paises.splice(0,5);
		},
		(error) => {
			this.paisesSugeridos = [];
		});
	}

	buscarSugerido( termino: string){
		this.buscar( termino );
	}

}
