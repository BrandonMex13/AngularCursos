import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

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
        private routerBack : Router,
        private snackBar : MatSnackBar,
        private dialog : MatDialog
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
            this.heroeService.actualizarHeroe( this.heroe ).subscribe( resp => {
                this.mostrarSnackBar("Registro Actualizado");
            });
        }
        else{
            // Guardar
            this.heroeService.agregarHeroe( this.heroe )
            .subscribe( heroe => {
                this.routerBack.navigate(['/heroes/editar', heroe.id]);
                this.mostrarSnackBar("Registro Guardado");
            });
        }
    }

    borrarHeroe(){

        const dialog = this.dialog.open(ConfirmarComponent, {
            width: '250px',
            data: this.heroe
        });

        dialog.afterClosed().subscribe( (result) => {
            if(result){
                this.heroeService.borrarHeroe( this.heroe.id! ).subscribe( resp => {
                    this.routerBack.navigate(['/heroes']);
                });
            }
        });
    }

    mostrarSnackBar( mensaje : string) : void{
        this.snackBar.open( mensaje, "OK!", {
            duration: 2500
        });
    }

}
