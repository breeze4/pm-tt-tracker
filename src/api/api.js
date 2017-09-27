import store from 'store';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';

import createPokemonFromDex from './createPokemonFromDex';

import PLAYER_DATA from '../SAMPLE_PLAYER_DATA.json';
import config from '../Config.js';
const { refData } = config;

const DATA = 'data';

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
  if (!store.get(DATA)) {
    const _store = store.set(DATA, PLAYER_DATA);
  }
  return {
    getPokemon: (id) => {
      const _data = store.get(DATA);
      if (id) {
        const pm = _data.pokemon.list.find((pm) => pm.id === id);
        return cloneDeep(pm);
      }
      return _data.pokemon;
    },
    togglePokemonInParty: (id) => {
      const _data = store.get(DATA);
      const { pokemon } = _data;

      const pmList = pokemon.list || [];
      const updatedList = pmList.map((pm) => {
        if (pm.id === id) {
          pm.party = !pm.party;
        }
        return pm;
      }).sort(sortPokemon);
      const updatedPokemon = { ...pokemon, list: updatedList };
      _data.pokemon = updatedPokemon;
      return _data.pokemon;
    },
    updatePokemon: (id, updatedPokemon) => {
      const _data = store.get(DATA);
      const { pokemon } = _data;

      const pmList = pokemon.list || [];
      const updatedList = pmList.map((pm) => {
        if (pm.id === id) {
          return updatedPokemon;
        }
        return pm;
      });
      const updatedPokemonList = { ...pokemon, list: updatedList };
      _data.pokemon = updatedPokemonList;
      store.set(DATA, _data);
    },
    addPokemonToTrainer: (number) => {
      const _data = store.get(DATA);
      const { pokemon } = _data;
      const pokedexEntry = refData.pokemon[number];

      const pmList = pokemon.list ? cloneDeep(pokemon.list) : [];
      pmList.push(createPokemonFromDex(number, pokedexEntry));
      const updatedPokemon = { ...pokemon, list: pmList };
      _data.pokemon = updatedPokemon;
      store.set(DATA, _data);
    }
  }
};

export default api();