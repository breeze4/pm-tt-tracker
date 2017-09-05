import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';

// import './Home.css';
import PokemonList from './PokemonList.js';

import config from '../../Config.js';
const { playerData: { pokemon } } = config;

class PokemonContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false 
      // add pokemon data to state and fetch from an API service
    }
  }
  render() {
    const pokemonListComponent = pokemon && pokemon.list ? (
      <PokemonList
        list={pokemon.list}
        editMode={this.state.editMode}
        onSwitchMode={this.onSwitchMode.bind(this)}
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
    // TODO:
    //  
  }
}

export default PokemonContainer;
