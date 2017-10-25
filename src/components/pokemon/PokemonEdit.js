import React from 'react';

import MoveDetail from '../moves/MoveDetail';

export const DISPLAY_STATS = {
  "hp": true,
  "level": true,
  "attack": true,
  "defense": true,
  "specialAttack": true,
  "specialDefense": true,
  "speed": true,
  "captureDifficulty": false
}

const PokemonEdit = ({ id, imgSrc, name, type, number, customName, stats, moves,
  moveRefData, onSaveEdit, onCancelEdit, onCustomNameInputChange, onStatInputChange }) => {

  const saveEditButton = (<button onClick={() => onSaveEdit({ id })}>Save</button>);
  const cancelModeButton = (<button onClick={onCancelEdit}>Cancel</button>);

  const headerComponent = (
    <div className="pm-detail-header">
      <span>
        {cancelModeButton}
      </span>
      <span>
        {saveEditButton}
      </span>
    </div>
  );

  const customNameEdit = (
    <div className="pm-detail-stat">
      <span>Name:</span>
      <input className="pm-detail-stat-edit"
        onChange={(e) => onCustomNameInputChange(e.target.value || '')} value={customName} />
    </div>
  );

  const statsList = (
    Object.keys(stats).filter((key) => DISPLAY_STATS[key]).map((key) => {
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
          return (
            <MoveDetail key={key} {...move} />
          );
        })}
      </ul>
    </div>
  );
  return (
    <div className="pm-detail-edit">
      {headerComponent}
      <div className="pm-detail-description">
        <div className="pm-detail-stats">
          {customNameEdit}
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