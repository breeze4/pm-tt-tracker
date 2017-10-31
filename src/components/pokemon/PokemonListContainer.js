import React, { Component } from 'react';

// import './Home.css';
import PokemonList from './PokemonList.js';

import api from '../../api/api.js';

class PokemonListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      pokemon: api.getPokemon()
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);

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
      <div className="pokemon-list-container">
        {pokemonListComponent}
      </div>
    );
  }

  onSwitchMode(event) {
    this.setState({ editMode: !this.state.editMode });
  }

  onSelectPokemon(event, id) {
    event.preventDefault();
    const updatedPokemon = api.togglePokemonInParty(id);
    this.setState({ pokemon: updatedPokemon });
  }
}

export default PokemonListContainer;
