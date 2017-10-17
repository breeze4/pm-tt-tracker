import React from 'react';

import './pokedex.css';

import computeRating from '../../api/computeRating';

import config from '../../Config.js';
const { refData } = config;
const TYPES_DATA = refData.types;

const pathToThumbnails = require.context('../../../images/thumbnails', true);

const PokedexItem = ({ id, name, image, number, type, baseStats }) => {
  const { hp } = baseStats;
  const rating = computeRating(baseStats);
  const imgSrc = pathToThumbnails(`./${image}`, true);

  const typeLabels = type.map((t) => {
    const typeData = TYPES_DATA[t];
    return (
      <span key={t} className="type-label label"
        style={{ backgroundColor: typeData.color }}>
        {typeData.name}
      </span>
    );
  });
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
          <span className="d-block">{typeLabels}</span>
        </div>
      </div>
    </div>);
}

export default PokedexItem;