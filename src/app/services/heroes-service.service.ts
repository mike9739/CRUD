import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class HeroesServiceService {
  //url de la base de datos
  private url = 'https://crud-38132.firebaseio.com';
  constructor(private _httpService: HttpClient) { }
  //funcion para crear heroe , recibe un objeto del tipo heroe 
  crearHeroe(heroe:HeroeModel){
      return this._httpService.post(`${this.url}/Heroes.json`,heroe)
      .pipe(
        //evita que se repitan heroes
        map((res:any)=>{
          heroe.id = res.name;
          return heroe;
        })
      );
  }
  actualizarHeroe(heroe:HeroeModel){
    const heroetemp = {
      ...heroe
    }
    delete heroetemp.id;
    return this._httpService.put(`${this.url}/Heroes/${heroe.id}.json`,heroetemp);
  }
}
