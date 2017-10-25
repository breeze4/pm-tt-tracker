import React from 'react';

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
      <span className="column col-12">{`To Hit: +${hitBonus}, Damage: ${damageDice}`}</span>
    );
  }

  return (
    <li className="card">
      <div className="card-header">
        <span className="h6">{name}</span>
        {typeLabel}
      </div>
      <div className="card-body">
        <div className="columns text-small">
          <span className="column col-12">{effect}</span>
          {moveDescription}
        </div>
      </div>
    </li>
  );
};

export default MoveDetail;