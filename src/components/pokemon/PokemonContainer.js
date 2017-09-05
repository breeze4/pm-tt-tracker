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
      editMode: false, 
      pokemon: pokemon
    }
  }
  render() {
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
    console.log(id);
    const { pokemon } = this.state;

    const pmList = pokemon.list || [];
    for (let i = 0; i < pmList.length; i++) {
      const pm = pmList[i];
      if (pm.id === id) {
        pmList[i].party = !pmList[i].party;
      }
    }
    const updatedPokemon = { ...pokemon, list: pmList };
    this.setState({ pokemon: updatedPokemon });
  }
}

export default PokemonContainer;
