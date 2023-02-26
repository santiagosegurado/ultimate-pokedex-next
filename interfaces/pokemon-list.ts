// Pokemons List
export interface PokemonList {
  count: number;
  next?: string;
  previous?: string;
  results: SmallPokemons[];
}

export interface SmallPokemons {
  name: string;
  url: string;
  id: number;
  img: string;
  types: Types[];
}


export interface Types {
  slot: number;
  type: TypeImg;
}

interface TypeImg{
  name: string;
  url:string;
}





