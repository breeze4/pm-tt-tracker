import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';

// import './Home.css';

import config from '../../Config.js';
const { playerData: { pokemon } } = config;

class PokemonContainer extends Component {
  render() {
    const pokemonListComponent = pokemon && pokemon.list ?
      pokemon.list.map((pm) => {
        const { key } = pm;
        return (
          <li key={}></li>
        );
      }) : null;

    return (
      <div className="PokemonContainer">
        {pokemonListComponent}
        <ul className="PokemonContainer-list">
        </ul>
      </div>
    );
  }
}

export default PokemonContainer;
