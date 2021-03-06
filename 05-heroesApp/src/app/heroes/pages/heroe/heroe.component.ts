import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

    heroe !: Heroe;

    constructor(
        private router : ActivatedRoute,
        private heroeService : HeroesService,
        private routerBack : Router
    ) { }

    ngOnInit(): void {
        this.router.params
        .pipe(
            switchMap( ({id}) => this.heroeService.getHeroePorId(id) )
        )
        .subscribe( heroe => this.heroe = heroe);
    }

    regresar(){
        this.routerBack.navigate(['/heroes/listado'])
    }
}
