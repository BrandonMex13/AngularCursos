import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor( private http: HttpClient){}

  private apikey:string = "4GaSGpJqVAE4tm3vca2Nv2sXhaVBNnxX";

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
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=4GaSGpJqVAE4tm3vca2Nv2sXhaVBNnxX&q=${ query }&limit=10`)
    .subscribe((resp) =>{
      console.log(resp.data);
      this.resultador = resp.data;
    });

  }
}
