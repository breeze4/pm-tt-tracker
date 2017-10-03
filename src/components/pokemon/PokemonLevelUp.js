import React from 'react';
import { Link } from 'react-router-dom';

import MoveDetail from '../moves/MoveDetail';

import './pokemon.css';

const PokemonLevelUp = ({ id, name, newName, level, newLevel, type, newType,
  stats, moves, moveRefData, onCancelLevel, onLevelUp }) => {

  // header
  const cancelButton = (<button onClick={onCancelLevel}>Cancel</button>);

  // level up details: stats or move
  const statsBeforeList = (
    Object.keys(stats).map((key) => {
      const stat = stats[key];
      return (<div key={key} className="pm-detail-stat">
        {`${key}: ${stat}`}
      </div>);
    }));
  const statsAfterList = (
    Object.keys(stats).map((key) => {
      const stat = stats[key];
      return (<div key={key} className="pm-detail-stat">
        {`${key}: ${stat}`}
      </div>);
    }));

  const movesList = newLevel && newLevel.move ? (
    <div className="pm-detail-moves">
      <span>New Move:</span>
      <div className="pm-moves-list-item">
        <MoveDetail {...moveRefData[newLevel.move]} />
      </div>
      <span>Current Moves:</span>
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
    </div>
  ) : null;

  let feature = newLevel.feature;
  let levelUpButton = null;
  if (feature === 'MOVE') {
    levelUpButton = (<button onClick={() =>
      onLevelUp(id, feature, { move: newLevel.move })}>
      Level Up</button>);
  } else if (feature === 'STATS') {
    levelUpButton = (<button onClick={() =>
      onLevelUp(id, feature, { stat1: 'attack', stat2: 'defense' })}>
      Level Up</button>);
  }

  return (
    <div className="pm-detail-level-up">
      <div className="pm-detail-header">
        <span>
          {cancelButton}
        </span>
        <span>
          {levelUpButton}
        </span>
      </div>
      <div className="pm-detail-summary">
        <div>
          <span>{name}</span>
          <span>{level}</span>
        </div>
        <span>=></span>
        <div>
          <span>{newName}</span>
          <span>{level + 1}</span>
        </div>
      </div>
      <div className="pm-detail-description">
        <div className="pm-detail-left">
          <div className="pm-detail-stats">
            {statsBeforeList}
          </div>
        </div>
        <div className="pm-detail-center">
          <span style={{ height: '50%' }}>+2</span>
          <span style={{ height: '50%' }}>=></span>
        </div>
        <div className="pm-detail-right">
          <div className="pm-detail-stats">
            {statsAfterList}
          </div>
        </div>
      </div>
      {movesList}
    </div>
  );
}

export default PokemonLevelUp;