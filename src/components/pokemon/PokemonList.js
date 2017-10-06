import React from 'react';
import { Link } from 'react-router-dom';

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
          const { id } = pm;
          return (
            <li key={id} className="card-container">
              <Link to={`/pokemon/${id}`}>
                <PokemonListItem
                  onSelectPokemon={editMode ? onSelectPokemon : () => { }}
                  {...pm} />
              </Link>
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
          const { id } = pm;
          return (
            <li key={id} className="card-container">
              <Link to={`/pokemon/${id}`}>
                <PokemonListItem
                  onSelectPokemon={editMode ? onSelectPokemon : () => { }}
                  {...pm} />
              </Link>
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