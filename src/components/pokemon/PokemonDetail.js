import React from 'react';

const pathToImages = require.context('../images/pokemon');

const Pokemon = ({ number, customName, stats, moves }) => {
  return (
    <div className="Pokemon">
      <div className="Pokemon-name">
        {customName}
      </div>
      <div className="Pokemon-stats">
        {Object.keys(stats).map((key) => {
          const stat = stats[key];
          return `${key}: ${stat}`;
        })}
      </div>
      <div className="Pokemon-moves">
        {moves}
      </div>
    </div>
  )
}

export default Pokemon;