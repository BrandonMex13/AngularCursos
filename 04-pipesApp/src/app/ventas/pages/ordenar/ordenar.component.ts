import { Component, OnInit } from '@angular/core';
import { Color, Heroe } from '../../interfaces/ventas.interface';

@Component({
  selector: 'app-ordenar',
  templateUrl: './ordenar.component.html',
  styleUrls: ['./ordenar.component.css']
})
export class OrdenarComponent implements OnInit {

    enMayusculas : boolean = true;

    heroes : Heroe[] = [
        {
            nombre: "Superman",
            vuela: true,
            color: Color.azul,
        },
        {
            nombre: "Batman",
            vuela: false,
            color: Color.negro,
        },
        {
            nombre: "Robin",
            vuela: false,
            color: Color.verde,
        },
        {
            nombre: "Daredevil",
            vuela: false,
            color: Color.rojo,
        },
        {
            nombre: "Linterna Verde",
            vuela: true,
            color: Color.verde,
        },
    ];

    ordernarPor : string = '';

    constructor() { }

    ngOnInit(): void {
    }

    cambiarOrden( valor : string){
        this.ordernarPor = valor;
    }

    

}
