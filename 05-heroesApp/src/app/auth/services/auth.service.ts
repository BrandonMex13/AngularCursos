import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../interface/auth.interface';
import { map, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private baseURl : string = environment.baseUrl;
    private _auth : Auth | undefined;

    get auth(){
        return {...this._auth};
    }

    constructor(
        private http : HttpClient
    ) { }

    login(){
        return this.http.get<Auth>(`${this.baseURl}/usuarios/1`).pipe( 
            tap( 
                resp => { 
                    this._auth = resp; 
                    localStorage.setItem("token", resp.id);
                }) 
            );
    }

    logout(){
        this._auth = undefined;
    }

    verificaAutenticacion() : Observable<boolean>{
        
        if(!localStorage.getItem("token")){
            return of(false);
        }

        return this.http.get<Auth>(`${this.baseURl}/usuarios/1`).pipe( 
                map( auth =>{
                    this._auth = auth;
                    return true;
                })
            );
    }


}
