import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';

// import './Home.css';
import PokemonDetail from './PokemonDetail.js';
import PokemonEdit from './PokemonEdit.js';

import api from '../../api/api.js';

// import config from '../../Config.js';
// const { playerData: { pokemon } } = config;

import config from '../../Config.js';
const { refData } = config;
const POKEMON_REF_DATA = refData.pokemon;
const MOVES_REF_DATA = refData.moves;

const pathToImages = require.context('../../../images/pokemon');

class PokemonDetailContainer extends Component {
  constructor(props) {
    super(props);

    const { match: { params: { id } } } = props;

    this.state = {
      id: id,
      pokemon: api.getPokemon(id),
      editMode: false
    }

    this.onSwitchMode = this.onSwitchMode.bind(this);
  }
  render() {
    const { editMode, pokemon } = this.state;
    const { number } = pokemon;

    const { name, image, type } = POKEMON_REF_DATA[number];
    const imgSrc = pathToImages(`./${image}`, true);

    const pokemonDetailComponent = pokemon ?
      editMode ? (
        <PokemonEdit
          {...pokemon}
          editMode={editMode}
          name={name}
          imgSrc={imgSrc}
          type={type}
          moveRefData={MOVES_REF_DATA}
          onSwitchMode={this.onSwitchMode.bind(this)}
        />
      ) : (
          <PokemonDetail
            {...pokemon}
            name={name}
            imgSrc={imgSrc}
            type={type}
            moveRefData={MOVES_REF_DATA}
            onSwitchMode={this.onSwitchMode.bind(this)}
          />
        ) : null;

    return (
      <div className="PokemonDetail">
        {pokemonDetailComponent}
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

export default PokemonDetailContainer;
