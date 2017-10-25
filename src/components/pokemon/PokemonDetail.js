import React from 'react';
import { Link } from 'react-router-dom';

import { MAX_LEVEL } from '../../api/api';
import MoveDetail from '../moves/MoveDetail';
import StatsList from '../stats/StatsList';
import TypeLabel from '../TypeLabel';
import { DISPLAY_STATS } from './PokemonEdit';

import config from '../../Config.js';
const { refData } = config;

const PokemonDetail = ({ id, imgSrc, name, type, number, customName, stats,
  moves, moveRefData, confirmDelete, onDelete, onConfirmDelete, onEnterEditMode, onEnterLevelMode }) => {
  const { LVL } = stats;

  const editModeButton = (<button className="btn" onClick={onEnterEditMode}>Edit</button>);
  const levelUpButton = LVL < MAX_LEVEL ?
    (<button className="btn" onClick={onEnterLevelMode}>Level Up</button>) : null;
  const deleteButton = (<button className="btn" onClick={() => onDelete(id)}>Delete Pokemon</button>);
  const confirmDeleteButton = (<button className="btn" onClick={() => onConfirmDelete(id)}>Confirm Delete?</button>);

  const statsList = (
    Object.keys(stats)
      .filter((key) => DISPLAY_STATS[key])
      .map((key) => {
        const stat = stats[key];
        return (<div key={key} className="columns">
          <span className="column col-9">
            {`${key}:`}</span>
          <span className="column col-3">
            {stat}</span>
        </div>);
      })
  );

  const movesList = (
    <ul className="panel-body">
      {moves.map((key) => {
        const move = moveRefData[key];
        return (
          <MoveDetail key={key} {...move} />
        );
      })}
    </ul>
  );
  return (
    <div>
      <div className="nav">
        <span className="nav-item h6">
          <Link to={'/pokemon'}>
            {`< My Pokemon`}
          </Link>
        </span>
        <span className="nav-item btn-group">
          {levelUpButton}
          {editModeButton}
        </span>
      </div>
      <div className="panel">
        <div className="panel-header">
          <span className="h4">{customName}</span>
        </div>
        <div className="panel-body columns">
          <div className="column col-6">
            <img src={imgSrc} alt={name} />
            <div className="columns">
              <div className="column col-7">
                <div className="columns">
                  <span className="h6 col-12 text-center">{name}</span>
                  <span className="h6 col-12 text-center">{`#${number}`}</span>
                </div>
              </div>
              <TypeLabel classes={['column', 'col-5']} type={type} />
            </div>
          </div>
          <StatsList classes={['column', 'col-6']} stats={stats} />
        </div>
        <div className="panel-header">
          <span className="h6">{`Moves`}</span>
        </div>
        {movesList}
        <div className="panel-footer">
          {confirmDelete ? (confirmDeleteButton) : (deleteButton)}
        </div>
      </div >
    </div>
  )
}

export default PokemonDetail;