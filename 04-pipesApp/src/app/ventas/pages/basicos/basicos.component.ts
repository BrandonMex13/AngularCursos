import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit {

    nombreLower : string = "brandon";
    nombreUpper : string = "BRANDON";
    nombreCompleto : string = "BRanDon MoNtoya";

    fecha : Date = new Date(); // el dia de hoy

    constructor() { }

    ngOnInit(): void {
    }

}
