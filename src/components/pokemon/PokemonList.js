import React from 'react';
import { Link } from 'react-router-dom';

import PokemonListItem from './PokemonListItem';

const PokemonList = ({ editMode, list, onSwitchMode, onSelectPokemon }) => {
  const toggleModeButton = editMode
    ? (<button className="btn" onClick={onSwitchMode}>Save</button>)
    : (<button className="btn" onClick={onSwitchMode}>Edit</button>);

  const pokemonPartyList = list ? (
    <div className="pokemon-list pokemon-party">
      <div className="list-header">
        <span className="h6">Party:</span>
        {toggleModeButton}
      </div>
      <ul>
        {list.filter(pm => pm.party).map((pm) => {
          const { id } = pm;
          return (
            <PokemonListItem key={id}
              onSelectPokemon={editMode ? onSelectPokemon : () => { }}
              {...pm} />
          );
        })}
      </ul>
    </div>
  ) : null;
  const pokemonStorageList = list ? (
    <div className="pokemon-list pokemon-storage">
      <div className="list-header">
        <span className="h6">Storage:</span>
      </div>
      <ul>
        {list.filter(pm => !pm.party).map((pm) => {
          const { id } = pm;
          return (
            <PokemonListItem key={id}
              onSelectPokemon={editMode ? onSelectPokemon : () => { }}
              {...pm} />
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