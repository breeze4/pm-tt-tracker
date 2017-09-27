import cloneDeep from 'lodash/cloneDeep';
import uuidv4 from 'uuid/v4';

const createPokemonFromDex = (number, pokedexEntry) => {
  const { name, image, type, baseStats, defaultMoves } = pokedexEntry;
  const createdPokemon = {
    id: uuidv4(),
    number, name, image, type,
    customName: 'default name',
    stats: { ...baseStats, maxHp: baseStats.hp },
    moves: cloneDeep(defaultMoves)
  };
  return createdPokemon;
}

export default createPokemonFromDex;