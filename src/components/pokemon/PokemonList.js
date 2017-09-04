import React from 'react';

import './pokemon.css';

import PokemonListItem from './PokemonListItem';

const PokemonList = ({ list }) => {
  const pokemonPartyList = list ? (
    <div className="pokemon-list pokemon-party">
      <label>Party:</label>
      <ul>
        {list.filter(pm => pm.party).map((pm) => {
          const { number } = pm;
          return (
            <li key={number} className="pokemon-list-item">
              <PokemonListItem {...pm} />
            </li>
          );
        })}
      </ul>
    </div>
  ) : null;
  const pokemonStorageList = list ? (
    <div className="pokemon-list pokemon-storage">
      <label>Storage:</label>
      <ul>
        {list.filter(pm => !pm.party).map((pm) => {
          const { number } = pm;
          return (
            <li key={number} className="pokemon-list-item">
              <PokemonListItem {...pm} />
            </li>
          );
        })}
      </ul>
    </div>
  ) : null;

  return (
    <div className="Pokemon">
      {pokemonPartyList}
      {pokemonStorageList}
    </div>
  )
}

export default PokemonList;