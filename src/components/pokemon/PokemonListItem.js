import React from 'react';

import './pokemon.css';

import config from '../../Config.js';
const { refData: { pokemon } } = config;

const pathToThumbnails = require.context('../../../images/thumbnails', true);

const PokemonListItem = ({ id, number, customName, stats, onSelectPokemon }) => {
  const { hp, maxHp, level } = stats;
  const { name, image, type } = pokemon[number];
  const imgSrc = pathToThumbnails(`./${image}`, true);
  return (
    <div className="pokemon-list-item-container"
        onClick={(e) => onSelectPokemon(e, id)}>
      <div className="pokemon-list-item-thumbnail">
        <img src={imgSrc} alt="" />
      </div>
      <div className="pokemon-list-item-description">
        <div className="pokemon-list-item-name">
          <span>{customName}</span>
          <span>{`${name} #${number}`}</span>
        </div>
        <div className="pokemon-list-item-stats">
          <span>{`Level ${level}`}</span>
          <span>{`HP ${hp}/${maxHp}`}</span>
        </div>
      </div>
    </div>
  )
}

export default PokemonListItem;