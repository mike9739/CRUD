import { Component, OnInit } from '@angular/core';
import { HeroesServiceService } from 'src/app/services/heroes-service.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes:HeroeModel[]=[];
  loading = false


  constructor(private _heroeService: HeroesServiceService) { }

  ngOnInit() {
    this.loading=true;
    this._heroeService.getHeroes().subscribe( res=>{
      this.heroes = res
      this.loading = false
    } )
  }
  deleteHero(heroe:HeroeModel,i:number){
    Swal.fire({
      title:'Esta a punto de eliminar el registro de la base de datos',
      text:`¿Está seguro de querer eliminar a ${heroe.nombre}?`,
      showConfirmButton:true,
      showCancelButton:true
    }).then(res=>{
      if (res.value) {
        this.heroes.splice(i)
        this._heroeService.deleteHeroById(heroe.id).subscribe();
      }
    })



  }

}
