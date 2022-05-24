import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title = 'pipesApp';

    nombre : string = "Brandon";

    constructor(
        private primengConfig : PrimeNGConfig
    ) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
    }

    mostrarNombre(){
        console.log(this.nombre);
    }
}
