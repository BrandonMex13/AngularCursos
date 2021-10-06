import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

	constructor( private http: HttpClient){

		this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
		this.resultador = JSON.parse( localStorage.getItem('resultado')! ) || [];
		// if(localStorage.getItem('historial')){
		//   this._historial = JSON.parse( localStorage.getItem('historial')! );
		// }
	}

	private apikey:string = "4GaSGpJqVAE4tm3vca2Nv2sXhaVBNnxX";
	private servicioURL:string = "https://api.giphy.com/v1/gifs";

	private _historial: string[] = [];

	public resultador: Gif[] = [];

	get historial(){
		return [...this._historial];
	}

	buscarGifs( query: string){

		query = query.trim().toLowerCase();

		if(!this._historial.includes(query)){
			this._historial.unshift(query);
			this._historial = this._historial.splice(0,10);

			localStorage.setItem('historial', JSON.stringify(this._historial));
		}

		const params = new HttpParams()
			.set('api_key', this.apikey)
			.set('limit', '10')
			.set('q', query);

		// console.log(params);

		this.http.get<SearchGifsResponse>(`${ this.servicioURL }/search`, { params: params })
		.subscribe((resp) =>{
			// console.log(resp.data);
			this.resultador = resp.data;

			localStorage.setItem('resultado', JSON.stringify(this.resultador));
		});

	}
}
