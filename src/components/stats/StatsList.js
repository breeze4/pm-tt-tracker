import React from 'react';

import { DISPLAY_STATS } from '../pokemon/PokemonEdit';

import config from '../../Config.js';
const { refData } = config;
const STATS_DATA = refData.stats;

const StatsList = ({ classes, stats }) => {
  const statsList = (
    Object.keys(stats)
      .filter((key) => DISPLAY_STATS[key])
      .map((key) => {
        const stat = stats[key];
        return (<li key={key} className="columns text-small text-right">
          <span className="column col-9">
            {`${STATS_DATA[key].name}:`}</span>
          <span className="column col-3">
            {stat}</span>
        </li>);
      })
  );
  return (<ul className={classes.join(' ')}>
    {statsList}
  </ul>)
}

export default StatsList;