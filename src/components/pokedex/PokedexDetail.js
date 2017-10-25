import React from 'react';

import { Link } from 'react-router-dom';

import MoveDetail from '../moves/MoveDetail';
import TypeLabel from '../TypeLabel';

import './pokedex.css';
import config from '../../Config.js';
const { refData } = config;
const TYPES_DATA = refData.types;

const PokedexDetail = (props) => {
  const { number, name, imgSrc, type, baseStats, defaultMoves,
    moveRefData, addedToParty, onAddToTrainer } = props;

  const addToTrainerButton = addedToParty ?
    (<button className="disabled">Added</button>) :
    (<button onClick={(event) => onAddToTrainer(number)}>Add To My Party</button>);

  const statsList = (
    Object.keys(baseStats).map((key) => {
      const stat = baseStats[key];
      return (<div key={key} className="pd-detail-stat">
        {`${key}: ${stat}`}
      </div>);
    })
  );

  const movesList = (
    <div className="pm-detail-moves-list">
      <ul className="pm-moves-list">
        {defaultMoves.map((key) => {
          const move = moveRefData[key];
          return (
            <MoveDetail key={key} {...move} />
          );
        })}
      </ul>
    </div>
  );
  return (
    <div className="pd-detail">
      <div className="pd-detail-header">
        <Link to={'/pokedex'}>
          {`< Pokedex`}
        </Link>
        {addToTrainerButton}
      </div>

      <div className="pd-detail-description">

        <div className="pd-detail-left">
          <img src={imgSrc} alt={name} />
          <div className="pd-detail-name">
            {`${name} #${number}`}
            <TypeLabel type={type} />
          </div>
        </div>

        <div className="pd-detail-right">
          <div className="pd-detail-stats">
            {statsList}
          </div>
        </div>
      </div>
      <div className="pd-detail-moves">
        <div className="pd-detail-header">
          {`Moves`}
        </div>
        <div className="pd-detail-moves-list">
          {movesList}
        </div>
      </div>
    </div>
  );
}

export default PokedexDetail;