import React, { Component } from 'react';

import PokedexDetail from './PokedexDetail';

import './pokedex.css';

import api from '../../api/api.js';
import config from '../../Config.js';
const { refData } = config;
const MOVES_REF_DATA = refData.moves;

const pathToImages = require.context('../../../images/pokemon');

class PokedexDetailContainer extends Component {
  constructor(props) {
    super(props);

    const { match: { params: { number } } } = props;

    this.state = {
      number: number,
      pokemon: refData.pokemon[number],
      moves: refData.moves
    }
  }

  render() {
    const { number, pokemon } = this.state;
    const { image } = pokemon;
    const imgSrc = pathToImages(`./${image}`, true);
    return (
      <div className="Pokedex">
        <PokedexDetail {...pokemon}
          number={number}
          moveRefData={MOVES_REF_DATA}
          imgSrc={imgSrc}
        />
      </div>
    );
  }

  onAddToTrainer(number) {
    api.addPokemonToTrainer(number)
  }
}

export default PokedexDetailContainer;
