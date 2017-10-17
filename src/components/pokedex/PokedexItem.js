import React from 'react';

import './pokedex.css';

import computeRating from '../../api/computeRating';

const pathToThumbnails = require.context('../../../images/thumbnails', true);

const PokedexItem = ({ id, name, image, number, baseStats }) => {
  const { hp } = baseStats;
  const rating = computeRating(baseStats);
  const imgSrc = pathToThumbnails(`./${image}`, true);
  return (
    <div className="card">
      <div className="card-body columns">
        <div className="column col-4">
          <div className="card-image thumbnail">
            <img src={imgSrc} alt="" />
          </div>
        </div>
        <div className="column col-5">
          <span className="h5 d-block">{name}</span>
          <span className="h6 d-block">{`Rating: ${rating}`}</span>
        </div>
        <div className="column col-3">
          <span className="h5 d-block">{`#${number}`}</span>
          <span className="h6 d-block">{`HP: ${hp}`}</span>
        </div>
      </div>
    </div>);
}

export default PokedexItem;