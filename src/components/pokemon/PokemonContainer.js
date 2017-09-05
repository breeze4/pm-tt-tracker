import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';

// import './Home.css';
import PokemonList from './PokemonList.js';

import api from '../../api/api.js';

// import config from '../../Config.js';
// const { playerData: { pokemon } } = config;

class PokemonContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      pokemon: api.getPokemon()
    }
  }
  render() {
    const { pokemon } = this.state;
    const pokemonListComponent = pokemon && pokemon.list ? (
      <PokemonList
        list={pokemon.list}
        editMode={this.state.editMode}
        onSwitchMode={this.onSwitchMode.bind(this)}
        onSelectPokemon={this.onSelectPokemon.bind(this)}
      />
    ) : null;

    return (
      <div className="PokemonContainer">
        {pokemonListComponent}
      </div>
    );
  }

  onSwitchMode(event) {
    this.setState({ editMode: !this.state.editMode });
  }

  onSelectPokemon(event, id) {
    const updatedPokemon = api.togglePokemonInParty(id);
    this.setState({ pokemon: updatedPokemon });
  }
}

export default PokemonContainer;
