import React from 'react';

import MoveDetail from '../moves/MoveDetail';

import './pokemon.css';

const PokemonDetail = ({ imgSrc, name, type, number, customName, stats, moves, moveRefData }) => {
  const { hp, maxHp, level } = stats;

  const statsList = (
    Object.keys(stats).map((key) => {
      const stat = stats[key];
      return (<div key={key} className="pm-detail-stat">
        {`${key}: ${stat}`}
      </div>);
    })
  );

  const movesList = (
    <div className="pm-detail-moves-list">
      <ul className="pm-moves-list">
        {moves.map((key) => {
          const move = moveRefData[key];
          return (<li key={key} className="pm-moves-list-item">
            <MoveDetail {...move} />
          </li>);
        })}
      </ul>
    </div>
  );
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
            <h4>{customName}</h4>
          </div>
          <div className="pm-detail-stats">
            {statsList}
          </div>
        </div>
      </div>
      <div className="pm-detail-moves">
        <div className="pm-detail-header">
          {`Moves`}
        </div>
        <div className="pm-detail-moves-list">
          {movesList}
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail;