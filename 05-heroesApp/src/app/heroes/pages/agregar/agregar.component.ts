import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

    heroe : Heroe = {
        superhero        : '',
        publisher        : Publisher.DCComics,
        alter_ego        : '',
        first_appearance : '',
        characters       : '',
        alt_img          : '',
    }

    publishers = [
        {
            id:'DC Comics',
            desc:'DC - Comics'
        },
        {
            id: 'Marvel Comics',
            desc:'Marvel - Comics'
        }
    ];

    constructor(
        private heroeService : HeroesService,
        private router : ActivatedRoute,
        private routerBack : Router
    ) { }

    ngOnInit(): void {

        if( !this.routerBack.url.includes("editar")){
            return;
        }

        this.router.params
        .pipe(
            switchMap( ({id}) => this.heroeService.getHeroePorId(id) )
        )
        .subscribe( heroe => this.heroe = heroe );
    }

    guardar(){
        if(this.heroe.superhero.trim().length === 0){
            return
        }

        if( this.heroe.id ){
            // Acttualizar
            this.heroeService.actualizarHeroe( this.heroe ).subscribe( resp => console.log('resp :>> ', resp) );
        }
        else{
            // Guardar
            this.heroeService.agregarHeroe( this.heroe )
            .subscribe( heroe => {
                this.routerBack.navigate(['/heroes/editar', heroe.id]);
            });
        }
    }

    borrarHeroe(){
        this.heroeService.borrarHeroe( this.heroe.id! ).subscribe( resp => {
            this.routerBack.navigate(['/heroes']);
        });
    }

}
