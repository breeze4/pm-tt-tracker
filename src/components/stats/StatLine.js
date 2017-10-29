import React from 'react';

import { DISPLAY_STATS } from '../pokemon/PokemonEdit';

import config from '../../Config.js';
const { refData } = config;
const STATS_DATA = refData.stats;

const StatLine = ({ classes, statAlreadyIncreased,
  statKey, statValue, baseStatValue, statPoints,
  onChangeStat }) => {

  const onDecreaseStatButton = statAlreadyIncreased ? (
    <button className="btn btn-sm" onClick={() => onChangeStat(statKey, -1)}>-1</button>
  ) : null;
  const onAddStatButton = statPoints > 0 ? (
    <button className="btn btn-sm" onClick={() => onChangeStat(statKey, +1)}>+1</button>
  ) : null;

  return (<li className={['stat-line columns text-small'].concat(classes).join(' ')}>
    <span className="column col-2">
      {`${STATS_DATA[statKey].name}:`}
    </span>
    <span className="column col-1">
      {baseStatValue}
    </span>
    <span className="column col-3 btn-group">
      {onDecreaseStatButton}
      {onAddStatButton}
    </span>
    <span className="column col-2">
      {`${STATS_DATA[statKey].name}:`}
    </span>
    <span className="column col-1">
      {statValue}
    </span>
  </li>)
}

export default StatLine;