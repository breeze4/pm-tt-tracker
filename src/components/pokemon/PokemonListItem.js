import React from 'react';

import { Card, CardSection } from '../Card.js';

import config from '../../Config.js';
const { refData: { pokemon } } = config;

const pathToThumbnails = require.context('../../../images/thumbnails', true);

const PokemonListItem = ({ id, number, customName, stats, onSelectPokemon }) => {
  const { hp, maxHp, level } = stats;
  const { name, image } = pokemon[number];
  const imgSrc = pathToThumbnails(`./${image}`, true);
  return (
    <Card
      onClick={(e) => onSelectPokemon(e, id)}>
      <div className="thumbnail">
        <img src={imgSrc} alt="" />
      </div>
      <CardSection>
        <div className="card-text">
          <span>{customName}</span>
          <span>{`${name} #${number}`}</span>
        </div>
        <div className="card-text">
          <span>{`Level ${level}`}</span>
          <span>{`HP ${hp}/${maxHp}`}</span>
        </div>
      </CardSection>
    </Card>
  )
}

export default PokemonListItem;