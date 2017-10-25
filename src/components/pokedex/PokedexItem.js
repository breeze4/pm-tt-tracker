import React from 'react';
import { Link } from 'react-router-dom';

import './pokedex.css';

import TypeLabel from '../TypeLabel';
import computeRating from '../../api/computeRating';

const pathToThumbnails = require.context('../../../images/thumbnails', true);

const PokedexItem = ({ id, name, image, number, type, baseStats }) => {
  const { hp } = baseStats;
  const rating = computeRating(baseStats);
  const imgSrc = pathToThumbnails(`./${image}`, true);

  return (
    <li className="tile">
      <Link className="tile-content" to={`/pokedex/${number}`}>
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
              <span className="d-block"><TypeLabel type={type}/></span>
            </div>
          </div>
        </div>
      </Link>
    </li>);
}

export default PokedexItem;