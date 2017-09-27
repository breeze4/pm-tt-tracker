import React from 'react';

import { Card, CardSection } from '../Card.js';

import './pokedex.css';

import computeRating from '../../api/computeRating';

import config from '../../Config.js';
const { refData: { pokemon } } = config;

const pathToThumbnails = require.context('../../../images/thumbnails', true);

const PokedexItem = ({ id, name, image, number, baseStats }) => {
  const { hp } = baseStats;
  const rating = computeRating(baseStats);
  const imgSrc = pathToThumbnails(`./${image}`, true);
  return (
    <Card>
      <div className="thumbnail">
        <img src={imgSrc} alt="" />
      </div>
      <CardSection>
        <div className="card-text">
          <span>{name}</span>
          <span>{`#${number}`}</span>
        </div>
        <div className="card-text">
          <span>{`Rating: ${rating}`}</span>
          <span>{`Base HP: ${hp}`}</span>
        </div>
      </CardSection>
    </Card>);
}

const styles = {
  container: {

  },
  thumbnail: {

  },
  description: {

  },

}

export default PokedexItem;