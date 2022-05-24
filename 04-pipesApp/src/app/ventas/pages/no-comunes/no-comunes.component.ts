import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-comunes',
  templateUrl: './no-comunes.component.html',
  styleUrls: ['./no-comunes.component.css']
})
export class NoComunesComponent implements OnInit {

    // i18nSelect
    nombre : string = "Brandon";
    genero : string = "masculino";
    invitacionMapa = {
        'masculino' : 'invitrarlo',
        'femenino' : 'invitarla'
    }

    // i18nPlural
    clientes : string[] = [
        "Maria",
        "Pedro",
        "Juan",
        "Brandon",
        "Alexis"
    ];

    clientesMapa = {
        '=0' : 'no tenemos ningun cliente esperando.',
        '=1' : 'tenemos un cliente esperando.',
        '=2' : 'tenemos dos cliente esperando.',
        '=3' : 'tenemos tres cliente esperando.',
        'other' : 'tenemos # clientes esperando'
    }

    // KeyValue Pipe
    persona = {
        nombre : "Brandon",
        edad: 22,
        direccion: "Culiacan, Sinaloa"
    }

    constructor() { }

    ngOnInit(): void {
    }

    cambiarCliente(){

        if( this.genero == "femenino"){
            this.nombre = "Brandon";
            this.genero = "masculino";
        }
        else{
            this.nombre = "Maria";
            this.genero = "femenino";
        }

    }

    borrarCliente(){
        this.clientes.pop();
    }

}
