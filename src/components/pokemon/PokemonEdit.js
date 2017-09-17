import React from 'react';
import { Link } from 'react-router-dom';

import MoveDetail from '../moves/MoveDetail';

import './pokemon.css';

const PokemonEdit = ({ id, imgSrc, name, type, number, customName, stats, moves,
  moveRefData, onSaveEdit, onCancelEdit, onStatInputChange }) => {
  const { hp, maxHp, level } = stats;

  const saveEditButton = (<button onClick={() => onSaveEdit({ id })}>Save</button>);
  const cancelModeButton = (<button onClick={onCancelEdit}>Cancel</button>);

  const headerComponent = (
    <div className="pm-detail-header">
      {cancelModeButton}
      {saveEditButton}
    </div>
  );

  const statsList = (
    Object.keys(stats).map((key) => {
      const stat = stats[key];
      return (
        <div key={key} className="pm-detail-stat">
          <span>{`${key}:`}</span>
          <input className="pm-detail-stat-edit"
            onChange={(e) => onStatInputChange(key, e.target.value || 0)} value={stat} />
        </div>
      );
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
    <div className="pm-detail-edit">
      {headerComponent}
      <div className="pm-detail-description">

        <div className="pm-detail-stats">
          {statsList}
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

export default PokemonEdit;