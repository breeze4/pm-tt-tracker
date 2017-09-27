import React from 'react';

import './pokedex.css';

import config from '../../Config.js';
const { refData: { pokemon } } = config;

const pathToThumbnails = require.context('../../../images/thumbnails', true);

const PokedexItem = ({ id, number, stats, onSelectPokemon }) => {
  // onClick={(e) => onSelectPokemon(e, id)
  // const { hp, maxHp, level } = stats;
  // const { name, image, type } = pokemon[number];
  // const imgSrc = pathToThumbnails(`./${image}`, true);
  return (<div className="pokedex-list-item-container">
    {number}
  </div >);
}

export default PokedexItem;