import React from 'react';
import { Link } from 'react-router-dom';

import TypeLabel from '../TypeLabel';

import config from '../../Config.js';
const { refData: { pokemon } } = config;

const pathToThumbnails = require.context('../../../images/thumbnails', true);

const PokemonListItem = ({ id, number, customName, stats,
  onSelectPokemon, children }) => {
  const { HP, LVL } = stats;
  const { name, image, type } = pokemon[number];
  const imgSrc = pathToThumbnails(`./${image}`, true);
  return (
    <li className="tile">
      <Link className="tile-content" to={`/pokemon/${id}`}>
        <div className="card"
          onClick={(e) => onSelectPokemon(e, id)}>
          <div className="card-body columns">
            <div className="column col-4">
              <div className="card-image thumbnail">
                <img src={imgSrc} alt="" />
              </div>
            </div>
            <div className="column col-5">
              <span className="h5 d-block">{customName}</span>
              <span className="h6 d-block">{`Level ${LVL}`}</span>
            </div>
            <div className="column col-3">
              <span className="h6 d-block">{`${HP} HP`}</span>
              <span className="h6 d-block"><TypeLabel type={type} /></span>
            </div>
          </div>
          <div className="card-body">
            {children}
          </div>
        </div>
      </Link>
    </li>
  )
}

export default PokemonListItem;