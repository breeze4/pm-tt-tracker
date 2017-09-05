import React from 'react';

import './pokemon.css';

import PokemonListItem from './PokemonListItem';

const PokemonList = ({ editMode, list, onSwitchMode, onSelectPokemon }) => {
  const toggleModeButton = editMode
    ? (<button onClick={onSwitchMode}>Save</button>)
    : (<button onClick={onSwitchMode}>Edit</button>);

  const pokemonPartyList = list ? (
    <div className="pokemon-list pokemon-party">
      <div className="list-header">
        <label>Party:</label>
        {toggleModeButton}
      </div>
      <ul>
        {list.filter(pm => pm.party).map((pm) => {
          const { number } = pm;
          return (
            <li key={number} className="pokemon-list-item">
              <PokemonListItem
                onSelectPokemon={editMode ? onSelectPokemon : () => { }}
                {...pm} />
            </li>
          );
        })}
      </ul>
    </div>
  ) : null;
  const pokemonStorageList = list ? (
    <div className="pokemon-list pokemon-storage">
      <div className="list-header">
        <label>Storage:</label>
      </div>
      <ul>
        {list.filter(pm => !pm.party).map((pm) => {
          const { number } = pm;
          return (
            <li key={number} className="pokemon-list-item">
              <PokemonListItem
                onSelectPokemon={editMode ? onSelectPokemon : () => { }}
                {...pm} />
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