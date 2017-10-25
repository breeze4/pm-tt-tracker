import React from 'react';

import { Link } from 'react-router-dom';

import MoveDetail from '../moves/MoveDetail';
import StatsList from '../stats/StatsList';
import TypeLabel from '../TypeLabel';

import './pokedex.css';
import config from '../../Config.js';
const { refData } = config;
const TYPES_DATA = refData.types;

const PokedexDetail = (props) => {
  const { number, name, imgSrc, type, baseStats, defaultMoves,
    moveRefData, addedToParty, onAddToTrainer } = props;

  const addToTrainerButton = addedToParty ?
    (<button className="btn disabled">Added</button>) :
    (<button className="btn" onClick={(event) => onAddToTrainer(number)}>
      Add To My Party</button>);

  const movesList = (
    <ul className="">
      {defaultMoves.map((key) => {
        const move = moveRefData[key];
        return (
          <MoveDetail key={key} {...move} />
        );
      })}
    </ul>
  );
  return (
    <div className="pokemon-detail">
      <div className="nav">
        <span className="nav-item h6">
          <Link to={'/pokedex'}>
            {`< Pokedex`}
          </Link>
        </span>
        <span className="nav-item btn-group">
          {addToTrainerButton}
        </span>
      </div>
      <div className="panel">
        <div className="panel-header">
          <span className="h4">{name}</span>
        </div>
        <div className="panel-body columns">
          <div className="column col-6">
            <img src={imgSrc} alt={name} />
            <div className="columns">
              <span className="h4 column col-6">{`#${number}`}</span>
              <TypeLabel classes={['column', 'col-6']} type={type} />
            </div>
          </div>
          <StatsList classes={['column', 'col-6']} stats={baseStats} />
        </div>

        <div className="panel-header">
          <span className="h6">
            {`Moves`}
          </span>
        </div>
        <div className="panel-body">
          {movesList}
        </div>
      </div>
    </div>
  );
}

export default PokedexDetail;