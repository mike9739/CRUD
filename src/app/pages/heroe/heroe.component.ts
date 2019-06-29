import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesServiceService } from 'src/app/services/heroes-service.service';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel

  constructor(private _heroeService : HeroesServiceService,private _route:ActivatedRoute) { }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id')
    if(id !== 'nuevo'){
      this._heroeService.getHeroeById(id).
      subscribe((res:HeroeModel)=>{
      this.heroe = res;
      this.heroe.id = id
      })
    }
  }

  saveForm(form:NgForm){
    if(form.invalid){
      console.log('Formulario no valido')
      return
    }
    Swal.fire({
      title:'Espere',
      text:'Guardando',
      type:'info',
      allowOutsideClick:false
    })
    Swal.showLoading()
    let peticion : Observable<any>;
    if (this.heroe.id) {
      peticion = this._heroeService.actualizarHeroe(this.heroe)
    } else {
     peticion = this._heroeService.crearHeroe(this.heroe)
    }

    peticion.subscribe(res =>{
      Swal.fire({
        title:this.heroe.nombre,
        text:'se actualizo correctamente',
        type:'success'
      })
    })
    
  }

}
