import React from 'react';

import './pokemon.css';

const PokemonDetail = ({ imgSrc, name, type , number, customName, stats, moves }) => {
  const { hp, maxHp, level } = stats;
  return (
    <div className="pm-detail">
      <div className="pm-detail-header">
        {`< My Pokemon`}
      </div>
      <div className="pm-detail-description">

        <div className="pm-detail-left">
          <img src={imgSrc} alt={name} />
          <div className="pm-detail-name">
            {`${name} #${number}`}
          </div>
        </div>

        <div className="pm-detail-right">
          <div className="pm-detail-custom-name">
            {customName}
          </div>
          <div className="pm-detail-stats">
            {Object.keys(stats).map((key) => {
              const stat = stats[key];
              return `${key}: ${stat}`;
            })}
          </div>
        </div>
      </div>
      <div className="pm-detail-moves">
        <div className="pm-detail-header">
          {`Moves`}
        </div>
        <div className="pm-detail-moves-list">
          {moves}
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail;