import React from 'react';

import { LEVEL_UP_STATS } from '../pokemon/PokemonEdit';
import StatLine from './StatLine';

import config from '../../Config.js';
const { refData } = config;
const STATS_DATA = refData.stats;

const StatsIncrease = ({ classes, originalStats, stats, statPoints,
  statIncreaseKeys, onChangeStat }) => {
  const statLines = (
    Object.keys(stats)
      .filter((key) => LEVEL_UP_STATS[key])
      .map((key) => {
        const stat = stats[key];
        const baseStatValue = originalStats[key];
        const statAlreadyIncreased = statIncreaseKeys.includes(key);
        return (
          <StatLine
            key={key}
            classes={['columns']}
            statKey={key}
            statValue={stat}
            baseStatValue={baseStatValue}
            statPoints={statPoints}
            statAlreadyIncreased={statAlreadyIncreased}
            onChangeStat={onChangeStat}
          />);
      })
  );
  return (
    <div className={classes.join(' ')}>
      <ul>
        {statLines}
      </ul>
    </div>)
}

export default StatsIncrease;