import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-table-pokemon',
  templateUrl: './table-pokemon.component.html',
  styleUrls: ['./table-pokemon.component.css']
})
export class TablePokemonComponent implements OnInit {

  pokemonList: any[] = [];
  filteredPokemonList: any[] = [];
  searchTerm: any = "";
  searchByNumber: any = ""
  searchByType: any = ""
  searchType: string = '';

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemonList()
  }

  onSearchTypeChange(event: any) {
    this.searchType = event.target.value;
  }

  getPokemonList() {
    this.pokemonService.getAllPokemon().subscribe(
      (data: any) => {
        data.results.forEach((pokemon: any) => {
          this.pokemonService.getPokemonDetails(pokemon.url).subscribe(
            (data: any) => {
              pokemon.number = data.id;
              pokemon.image = data.sprites.front_default;
              pokemon.type = data.types[0].type.name;
              this.pokemonList.push(pokemon);
              this.filteredPokemonList = [...this.pokemonList]
            },
            (error) => {
              console.error('Error pokemon details', error);
            }
          );
        });
      },
      (error) => {
        console.error('Error pokemonList', error);
      }
    );
  }


  searchPokemon() {
    const searchTermLowerCase = this.searchTerm.toLowerCase();
    const searchByTypeLowerCase = this.searchByType.toLowerCase()

    if (this.searchType === "number") {
      if (this.searchByNumber === null) {
        this.filteredPokemonList = [...this.pokemonList];
      } else {
        this.filteredPokemonList = this.pokemonList.filter((pokemon) =>
          pokemon.number === parseInt(this.searchByNumber)
        );
      }
    } else if (this.searchType === "name") {
      this.filteredPokemonList = this.pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTermLowerCase)
      );
    } else if (this.searchType === "type") {
      this.filteredPokemonList = this.pokemonList.filter((pokemon) =>
        pokemon.type.toLowerCase().includes(searchByTypeLowerCase)
      );
    }

    console.log(this.filteredPokemonList)
    console.log("search number =", this.searchByNumber)
    console.log("search term =", this.searchTerm)
    console.log("search type =", this.searchByType)
  }
}
