import store from 'store';
import cloneDeep from 'lodash/cloneDeep';

import createPokemonFromDex from './createPokemonFromDex';

import PLAYER_DATA from '../SAMPLE_PLAYER_DATA.json';
import config from '../Config.js';
const { refData } = config;
const POKEMON_REF_DATA = refData.pokemon;
const HP_INCREASE_REF_DATA = refData.hpIncreases;

const DATA = 'data';

export const MAX_LEVEL = 20;
export const MAX_MOVES = 4;

const sortPokemon = (a, b) => {
  if (parseInt(a.number, 10) > parseInt(b.number, 10)) {
    return 1;
  } else if (parseInt(a.number, 10) === parseInt(b.number, 10)) {
    return 0;
  } else {
    return -1;
  }
};

export const evolvePokemon = (pokemon, statChange, evolvedNumber) => {
  const evolvedForm = refData.pokemon[evolvedNumber];
  // set the number, name (if the default), image, type
  const { name, image, type } = evolvedForm;
  if (pokemon.name === pokemon.customName) {
    pokemon.name = name;
    pokemon.customName = name;
  }
  pokemon.image = image;
  pokemon.type = type;
  pokemon.number = evolvedNumber;
  // add to stats
  Object.keys(statChange).forEach((changedStat) => {
    const changeAmount = statChange[changedStat];
    pokemon.stats[changedStat] += changeAmount;
  });
};

// returns true if move was added, false if the pokemon is full on moves
// 3rd optional parameter is default null and the move will be added to the end
// if provided, that move will be overwritten with the new move
export const addMoveToPokemon = (pokemon, move, overwriteTarget) => {
  if (!pokemon || !pokemon.moves || (pokemon.moves.length >= MAX_MOVES && !overwriteTarget)) {
    return false;
  }
  if (pokemon.moves.length < MAX_MOVES) {
    pokemon.moves.push(move);
    return true;
  }
  if (overwriteTarget) {
    const target = pokemon.moves.indexOf(overwriteTarget);
    if (target < 0) {
      console.log('not a move this pokemon knows');
      return false;
    }
    pokemon.moves[target] = move;
    return true;
  }
};

export const raiseStatsOnPokemon = (pokemon, stat1, stat2) => {
  const { number } = pokemon;
  const hpIncreaseKey = POKEMON_REF_DATA[number].hpIncrease;
  const hpIncrease = HP_INCREASE_REF_DATA[hpIncreaseKey];
  pokemon.stats['HP'] += hpIncrease;
  if (stat1 && !stat2) {
    pokemon.stats[stat1] += 2;
  } else if (stat2 && !stat1) {
    pokemon.stats[stat2] += 2;
  } else if (stat1 && stat2) {
    pokemon.stats[stat1] += 1;
    pokemon.stats[stat2] += 1;
  }
}

const api = (playerData) => {
  if (!store.get(DATA)) {
    store.set(DATA, playerData);
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
      store.set(DATA, _data);
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
    },
    levelUpPokemon: (id, feature, payload) => {
      const _data = store.get(DATA);
      const { pokemon: { list } } = _data;
      const index = list.findIndex(p => p.id === id);
      if (index < 0) {
        console.log('pokemon doesn\'t exist');
        return null;
      }
      const leveledPm = list[index];
      const { number, stats: { LVL } } = leveledPm;
      if (LVL + 1 > MAX_LEVEL) {
        console.log('already max level');
        return leveledPm;
      }
      // validate this is a correct feature
      if (!feature || !payload) {
        console.log('invalid level up');
        return leveledPm;
      }
      const refDataFeature = refData.pokemon[number]
        .levels
        .find(l => l.LVL === LVL + 1);
      if (refDataFeature.feature !== feature) {
        console.log('does not match ref data');
        return leveledPm;
      }

      if (feature === 'MOVE') {
        const { move, overwriteTarget } = payload;
        const successfullyAddedMove = addMoveToPokemon(leveledPm, move, overwriteTarget);
        if (!successfullyAddedMove) {
          console.log('couldn\'t add move to pokemon');
          return leveledPm;
        }
      } else if (feature === 'STATS') {
        const { statIncreaseKeys } = payload;
        if (statIncreaseKeys.length != 2) {
          console.log('need to have 2 keys in stat increase array', statIncreaseKeys);
          return leveledPm;
        }
        raiseStatsOnPokemon(leveledPm, statIncreaseKeys[0], statIncreaseKeys[1]);
      } else if (feature === 'EVOLUTION') {
        const { evolvedNumber } = payload;
        const { statChange } = refDataFeature;
        evolvePokemon(leveledPm, statChange, evolvedNumber);
      }
      leveledPm.stats.LVL += 1;
      list[index] = leveledPm;
      store.set(DATA, _data);
      return leveledPm;
    },
    deletePokemon(id) {
      const _data = store.get(DATA);
      const { pokemon } = _data;

      const updatedList = pokemon.list.reduce((result, pm) => {
        if (pm.id !== id) {
          result.push(pm);
        }
        return result;
      }, []);
      const updatedPokemonList = { ...pokemon, list: updatedList };
      _data.pokemon = updatedPokemonList;
      store.set(DATA, _data);
    }
  }
};

export default api(PLAYER_DATA);