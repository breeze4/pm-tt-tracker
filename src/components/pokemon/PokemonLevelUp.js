import React from 'react';

import MoveDetail from '../moves/MoveDetail';
import StatsIncrease from '../stats/StatsIncrease';

import config from '../../Config.js';
const { refData } = config;
const POKEMON_REF_DATA = refData.pokemon;

const PokemonLevelUp = ({ id, name, number, LVL, newLevel, type, newType,
  stats, originalStats, statIncreaseKeys, statPoints, moves, moveRefData, maxedMoves, overwriteTarget,
  onCancelLevel, onLevelUp, onClearOverwriteMove, onSelectOverwriteMove, onChangeStat }) => {

  const newLevelFeature = POKEMON_REF_DATA[number].levels.find(l => l.LVL === LVL + 1);
  const evolving = newLevelFeature.feature === 'EVOLUTION';
  let newName = null;
  if (evolving) {
    newName = POKEMON_REF_DATA[newLevelFeature.evolvedNumber].name;
  }

  // header
  const cancelButton = (<button className="btn" onClick={onCancelLevel}>Cancel</button>);

  let showMoveButton = newLevel && newLevel.move && maxedMoves;
  const moveDetailClasses = showMoveButton ? [] : [];
  const moveButtonClasses = showMoveButton ? [] : [];

  const getMoveButton = (key) => {
    if (overwriteTarget === key) {
      return (<button className="btn btn-primary"
        onClick={() => onClearOverwriteMove(key)}>Keep</button>);
    } else {
      return (<button className="btn"
        onClick={() => onSelectOverwriteMove(key)}>Overwrite</button>);
    }
  }

  const movesList = newLevel && newLevel.move ? (
    <div className="panel-body">
      <span>New Move:</span>
      <div className="pm-moves-list-item new-move">
        <MoveDetail {...moveRefData[newLevel.move]} />
      </div>
      <span>Current Moves:</span>
      <div className="pm-detail-moves-list">
        <ul className="pm-moves-list">
          {moves.map((key) => {
            const move = moveRefData[key];
            return (
              <MoveDetail key={key} classes={moveDetailClasses} {...move}>
                {showMoveButton ? (
                  <span className="float-right">
                    {getMoveButton(key)}
                  </span>
                ) : null}
              </MoveDetail>
            );
          })}
        </ul>
      </div>
    </div>
  ) : null;

  let feature = newLevel.feature;
  let levelUpButton = null;
  let statsBlock = null;
  let buttonText = 'Can\'t use';
  if (feature === 'MOVE') {
    const disabled = (maxedMoves && !overwriteTarget);

    if (disabled) {
      buttonText = 'Select Overwritten Move';
    } else {
      buttonText = 'Add New Move';
    }

    levelUpButton = disabled ?
      (<button className="btn disabled">
        {buttonText}</button>) :
      (<button className="btn btn-primary" onClick={() =>
        onLevelUp(id, feature, { move: newLevel.move, overwriteTarget })}>
        {buttonText}</button>);
  } else if (feature === 'STATS') {
    statsBlock = (
      <StatsIncrease
        classes={['panel-body']}
        stats={stats}
        statPoints={statPoints}
        originalStats={originalStats}
        statIncreaseKeys={statIncreaseKeys}
        hpIncreaseKey={POKEMON_REF_DATA[number].hpIncrease}
        onChangeStat={onChangeStat}
      />);
    const btnClasses = ['btn'];
    buttonText = 'Add Stats';
    if (statPoints == 0) {
      btnClasses.push('btn-primary');
      levelUpButton = (<button className={btnClasses.join(' ')} onClick={() =>
        onLevelUp(id, feature, { statIncreaseKeys })}>
        {buttonText}</button>);
    } else {
      btnClasses.push('disabled');
      levelUpButton = (<button className={btnClasses.join(' ')}>
        {buttonText}</button>);
    }
  } else if (feature === 'EVOLUTION') {
    levelUpButton = (<button className="btn" onClick={() =>
      onLevelUp(id, feature, { evolvedNumber: newLevel.evolvedNumber })}>
      Evolve</button>);
  }

  return (
    <div className="">
      <div className="nav">
        <span className="nav-item">
          {cancelButton}
        </span>
        <span className="nav-item">
          {levelUpButton}
        </span>
      </div>
      <div className="panel">
        <div className="panel-header">
          <span className="h4">Level Up</span>
        </div>
        <div className="panel-body columns text-center">
          <div className="column col-4">
            <div className="columns">
              <span className="column col-12">{name}</span>
              <span className="column col-12">{LVL}</span>
            </div>
          </div>
          <div className="column col-4">
            <div className="columns">
              <span className="column col-12">=></span>
              <span className="column col-12">{statPoints} points</span>
            </div>
          </div>
          <div className="column col-4">
            <div className="columns">
              <span className="column col-12">{newName || name}</span>
              <span className="column col-12">{LVL + 1}</span>
            </div>
          </div>
        </div>
        {statsBlock}
        {movesList}
      </div>
    </div>
  );
}

export default PokemonLevelUp;