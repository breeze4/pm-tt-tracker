import React from 'react';

import '../pokemon/pokemon.css';

import config from '../../Config.js';
const { refData } = config;
const TYPES_DATA = refData.types;

const MoveDetail = (props) => {
  const { effect, name, type } = props;
  const { damageDice, hitBonus } = props;

  const typeData = TYPES_DATA[type];
  const typeLabel = (
    <span className="type-label" style={{ backgroundColor: typeData.color }}>
      {typeData.name}
    </span>
  );

  let moveDescription;
  if (damageDice) {
    moveDescription = (
      <span>{`To Hit: +${hitBonus}, Damage: ${damageDice}`}</span>
    );
  }

  return (
    <div className="move-detail">
      <div className="move-detail-name">
        <span><strong>{name}</strong></span>
        {typeLabel}
      </div>
      <div className="move-detail-effect">
        <span>{effect}</span>
      </div>
      {moveDescription}
    </div>
  );
};

export default MoveDetail;