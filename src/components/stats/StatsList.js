import React from 'react';

import { DISPLAY_STATS } from '../pokemon/PokemonEdit';
import calculateModifier from '../../api/calculateModifier';

import config from '../../Config.js';
const { refData } = config;
const STATS_DATA = refData.stats;

export const StatValue = (stat, key) => {
  if (!stat) return null;
  if (key === 'LVL' || key === 'HP') {
    return stat;
  }

  let modifier = calculateModifier(stat);
  let modifierSign;
  if (modifier >= 0) {
    modifierSign = '+';
  } else { // negative modifier
    modifierSign = '-';
    modifier *= -1;
  }
  return `${stat} (${modifierSign}${modifier})`;
}

const StatsList = ({ classes, stats }) => {
  const statsList = (
    Object.keys(stats)
      .filter((key) => DISPLAY_STATS[key])
      .map((key) => {
        const stat = stats[key];
        console.log(key);
        return (<li key={key} className="columns text-small text-right">
          <span className="column col-8">
            {`${STATS_DATA[key].name}:`}</span>
          <span className="column col-4">
            {StatValue(stat, key)}</span>
        </li>);
      })
  );
  return (<ul className={classes.join(' ')}>
    {statsList}
  </ul>)
}

export default StatsList;