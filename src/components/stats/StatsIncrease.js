import React from 'react';

import { LEVEL_UP_STATS } from '../pokemon/PokemonEdit';
import StatLine from './StatLine';

import config from '../../Config.js';
const { refData } = config;
const STATS_DATA = refData.stats;
const HP_INCREASE_REF_DATA = refData.hpIncreases;

const StatsIncrease = ({ classes, originalStats, stats, statPoints, hpIncreaseKey,
  statIncreaseKeys, onChangeStat }) => {
  const statLines = (
    Object.keys(stats)
      .filter((key) => LEVEL_UP_STATS[key])
      .filter((key) => key != 'HP')
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
            showModifier={true}
          />);
      })
  );
  const hpKey = 'HP';
  const hpIncrease = HP_INCREASE_REF_DATA[hpIncreaseKey];
  const healthLine = (
    <StatLine
      key={hpKey}
      classes={['columns']}
      fixed={true}
      statKey={hpKey}
      statValue={originalStats[hpKey] + hpIncrease}
      baseStatValue={originalStats[hpKey]}
      showModifier={false}
    />
  );
  return (
    <div className={classes.join(' ')}>
      <ul>
        {healthLine}
        {statLines}
      </ul>
    </div>)
}

export default StatsIncrease;