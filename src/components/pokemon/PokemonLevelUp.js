import React from 'react';

import MoveDetail from '../moves/MoveDetail';

import config from '../../Config.js';
const { refData } = config;
const POKEMON_REF_DATA = refData.pokemon;

const PokemonLevelUp = ({ id, name, number, level, newLevel, type, newType,
  stats, moves, moveRefData, maxedMoves, overwriteTarget,
  onCancelLevel, onLevelUp, onClearOverwriteMove, onSelectOverwriteMove }) => {

  const newLevelFeature = POKEMON_REF_DATA[number].levels.find(l => l.level === level + 1);
  const evolving = newLevelFeature.feature === 'EVOLUTION';
  let newName = null;
  if (evolving) {
    newName = POKEMON_REF_DATA[newLevelFeature.evolvedNumber].name;
  }

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
      <div className="pm-moves-list-item new-move">
        <MoveDetail {...moveRefData[newLevel.move]} />
      </div>
      <span>Current Moves:</span>
      <div className="pm-detail-moves-list">
        <ul className="pm-moves-list">
          {moves.map((key) => {
            const move = moveRefData[key];
            return (<div key={key} className="pm-moves-list-item">
              <MoveDetail {...move} />
              {overwriteTarget === key ?
                (<button className="pm-move-overwrite-button"
                  onClick={() => onClearOverwriteMove(key)}>Keep</button>) :
                (<button className="pm-move-overwrite-button"
                  onClick={() => onSelectOverwriteMove(key)}>Overwrite</button>
                )}
            </div>);
          })}
        </ul>
      </div>
    </div>
  ) : null;

  let feature = newLevel.feature;
  let levelUpButton = null;
  if (feature === 'MOVE') {
    const disabled = maxedMoves && !overwriteTarget;
    levelUpButton = disabled ?
      (<button className="disabled">
        Select Overwritten Move</button>) :
      (<button onClick={() =>
        onLevelUp(id, feature, { move: newLevel.move, overwriteTarget })}>
        Add New Move</button>);
  } else if (feature === 'STATS') {
    levelUpButton = (<button onClick={() =>
      onLevelUp(id, feature, { stat1: 'attack', stat2: 'defense' })}>
      Add Stats</button>);
  } else if (feature === 'EVOLUTION') {
    levelUpButton = (<button onClick={() =>
      onLevelUp(id, feature, { evolvedNumber: newLevel.evolvedNumber })}>
      Evolve</button>);
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