import React from 'react';

import MoveDetail from '../moves/MoveDetail';

import config from '../../Config.js';
const { refData } = config;
const STATS_DATA = refData.stats;

export const DISPLAY_STATS = {
  "HP": true,
  "LVL": true,
  "ATK": true,
  "DEF": true,
  "SPC_ATK": true,
  "SPC_DEF": true,
  "SPD": true,
  "CAP_DC": false
}

export const LEVEL_UP_STATS = {
  "HP": true,
  "LVL": false,
  "ATK": true,
  "DEF": true,
  "SPC_ATK": true,
  "SPC_DEF": true,
  "SPD": true,
  "CAP_DC": false
}

const PokemonEdit = ({ id, imgSrc, name, type, number, customName, stats, moves,
   onSaveEdit, onCancelEdit, onCustomNameInputChange, onStatInputChange }) => {

  const saveEditButton = (<button className="btn btn-primary" onClick={() => onSaveEdit({ id })}>Save</button>);
  const cancelModeButton = (<button className="btn" onClick={onCancelEdit}>Cancel</button>);

  const statsList = (
    Object.keys(stats).filter((key) => LEVEL_UP_STATS[key]).map((key) => {
      const stat = stats[key];
      return (
        <li key={key} className="form-group columns">
          <div className="column col-6">
            <span className="form-label">{`${STATS_DATA[key].name}:`}</span>
          </div>
          <div className="column col-6">
            <input className="form-input"
              onChange={(e) => onStatInputChange(key, e.target.value || 0)} value={stat} />
          </div>
        </li>
      );
    })
  );

  return (
    <div className="pokemon-edit">
      <div className="nav">
        <span className="nav-item">
          {cancelModeButton}
        </span>
        <span className="nav-item">
          {saveEditButton}
        </span>
      </div>

      <div className="panel">
        <div className="panel-header">
          <span className="h4">Edit</span>
        </div>
        <div className="panel-body form-horizontal">
          <div className="form-group columns">
            <div className="column col-6">
              <span className="form-label">Name:</span>
            </div>
            <div className="column col-6">
              <input className="form-input"
                onChange={(e) => onCustomNameInputChange(e.target.value || '')}
                value={customName} />
            </div>
          </div>
          <ul className="">
            {statsList}
          </ul>
        </div>
        <div className="panel-header">
          <span className="h4">{`Moves`}</span>
        </div>
        <div className="panel-boddy">
          <ul className="">
            {moves.map((key) => {
              return (
                <MoveDetail key={key} move={key} stats={stats} />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PokemonEdit;