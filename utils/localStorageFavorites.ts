


export const toggleFavorites = (id: number) => {


  let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

  if (favorites.includes(id)) {
    favorites = favorites.filter((pokeId) => pokeId != id)

  }else {
    favorites.push(id);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
}



export const pokemonInStorage = (id: number): boolean => {

  if (typeof window === 'undefined') return false; 

  let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

  return favorites.includes(id)
}


export const favoritePokemons = () => {

  return JSON.parse(localStorage.getItem('favorites') || '[]')
}