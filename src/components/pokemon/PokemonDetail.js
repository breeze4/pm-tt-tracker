import React from 'react';

import './pokemon.css';

import config from '../../Config.js';
const { refData: { pokemon } } = config;

const pathToImages = require.context('../../../images/pokemon');

const PokemonDetail = ({ number, customName, stats, moves }) => {
  const { hp, maxHp, level } = stats;
  const { name, image, type } = pokemon[number];
  const imgSrc = pathToImages(`./${image}`, true);
  return (
    <div className="Pokemon">
      <div className="Pokemon-name">
        {customName}
      </div>
      <div className="pokemon-list-item-thumbnail">
        <img src={imgSrc} alt="" />
      </div>
      <div className="Pokemon-stats">
        {Object.keys(stats).map((key) => {
          const stat = stats[key];
          return `${key}: ${stat}`;
        })}
      </div>
      <div className="Pokemon-moves">
        {moves}
      </div>
    </div>
  )
}

export default PokemonDetail;