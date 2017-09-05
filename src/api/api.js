import PLAYER_DATA from '../SAMPLE_PLAYER_DATA.json';

const sortPokemon = (a, b) => {
  if (parseInt(a.number, 10) > parseInt(b.number, 10)) {
    return 1;
  } else if (parseInt(a.number, 10) === parseInt(b.number, 10)) {
    return 0;
  } else {
    return -1;
  }
};

const api = () => {
  const _data = PLAYER_DATA;
  return {
    getPokemon: () => {
      return _data.pokemon;
    },
    togglePokemonInParty: (id) => {
      const { pokemon } = _data;

      const pmList = pokemon.list || [];
      for (let i = 0; i < pmList.length; i++) {
        const pm = pmList[i];
        if (pm.id === id) {
          pmList[i].party = !pmList[i].party;
        }
      }
      const sortedList = pmList.sort(sortPokemon);
      const updatedPokemon = { ...pokemon, list: sortedList };
      _data.pokemon = updatedPokemon;
      return _data.pokemon;
    }
  }
};

export default api();