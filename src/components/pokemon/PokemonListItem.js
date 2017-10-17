import React from 'react';

import config from '../../Config.js';
const { refData: { pokemon } } = config;

const pathToThumbnails = require.context('../../../images/thumbnails', true);

const PokemonListItem = ({ id, number, customName, stats, onSelectPokemon }) => {
  const { hp, maxHp, level } = stats;
  const { name, image } = pokemon[number];
  const imgSrc = pathToThumbnails(`./${image}`, true);
  return (
    <div className="card"
      onClick={(e) => onSelectPokemon(e, id)}>
      <div className="card-body columns">
        <div className="column col-4">
          <div className="card-image thumbnail">
            <img src={imgSrc} alt="" />
          </div></div>
        <div className="column col-5">
          <span className="h5 d-block">{customName}</span>
          <span className="h6 d-block">{`(Lvl ${level})`}</span>
        </div>
        <div className="column col-3">
          <span className="h5 d-block">{`${hp}/${maxHp}`}</span>
          <span className="h6 d-block">{`HP`}</span>
        </div>
      </div>
    </div>
  )
}

export default PokemonListItem;