import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';

// import './Home.css';
import PokemonList from './PokemonList.js';

import config from '../../Config.js';
const { playerData: { pokemon } } = config;

class PokemonContainer extends Component {
  render() {
    const pokemonListComponent = pokemon && pokemon.list ? (
      <PokemonList list={pokemon.list} />
    ) : null;

    return (
      <div className="PokemonContainer">
        {pokemonListComponent}
      </div>
    );
  }
}

export default PokemonContainer;
