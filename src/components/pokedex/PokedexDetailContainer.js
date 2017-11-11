import React, { Component } from 'react';

import PokedexDetail from './PokedexDetail';

import './pokedex.css';

import api from '../../api/api.js';
import config from '../../Config.js';
const { refData } = config;

const pathToImages = require.context('../../../images/pokemon');

class PokedexDetailContainer extends Component {
  constructor(props) {
    super(props);

    const { match: { params: { number } } } = props;

    this.state = {
      number: number,
      pokemon: refData.pokemon[number],
      moves: refData.moves,
      addedToParty: false
    }
  }

  render() {
    const { number, pokemon, addedToParty } = this.state;
    const { image } = pokemon;
    const imgSrc = pathToImages(`./${image}`, true);
    return (
      <div className="Pokedex">
        <PokedexDetail {...pokemon}
          number={number}
          imgSrc={imgSrc}
          addedToParty={addedToParty}
          onAddToTrainer={this.onAddToTrainer.bind(this)}
        />
      </div>
    );
  }

  onAddToTrainer(number) {
    api.addPokemonToTrainer(number);
    this.setState({ addedToParty: true });
  }
}

export default PokedexDetailContainer;
