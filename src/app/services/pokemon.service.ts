import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url: string = "https://pokeapi.co/api/v2/pokemon/"

  constructor(private http: HttpClient) { }
  
  getAllPokemon(): Observable<any> {
    return this.http.get(`${this.url}`);
  }

  getPokemonDetails(url: string): Observable<any> {
    return this.http.get(url);
  }
}
