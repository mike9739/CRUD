import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class HeroesServiceService {
  private url = 'https://crud-38132.firebaseio.com';
  constructor(private _httpService: HttpClient) { }
  crearHeroe(heroe:HeroeModel){
      return this._httpService.post(`${this.url}/Heroes.json`,heroe)
      .pipe(
        map((res:any)=>{
          heroe.id = res.name;
          return heroe;
        })
      );
  }
}
