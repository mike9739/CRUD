import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesServiceService } from 'src/app/services/heroes-service.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel

  constructor(private _heroeService : HeroesServiceService) { }

  ngOnInit() {
  }

  saveForm(form:NgForm){
    if(form.invalid){
      console.log('Formulario no valido')
      return
    }

    this._heroeService.crearHeroe(this.heroe).subscribe(
      res=>{
        console.log('Heroe insertado correctamente')
      }
    )
  }

}
