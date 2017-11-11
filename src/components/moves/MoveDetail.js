import React from 'react';

import TypeLabel from '../TypeLabel.js';

import calculateMoveModifiers from '../../api/calculateMoveModifiers.js';
import config from '../../Config.js';
const { refData } = config;
const MOVE_REF_DATA = refData.moves;

const DamageDetail = ({ damageDice, hitBonus, damageBonus }) => {
  return (<span className="column col-12">
    {`To Hit: +${hitBonus}, Damage: ${damageDice} +${damageBonus}`}
  </span>);
}

const MoveDetail = (props) => {
  const { move, stats } = props;
  const moveData = MOVE_REF_DATA[move];
  const { effect, name, type, category } = moveData;
  const { damageDice, accuracyBonus } = moveData;
  const { classes, children } = props;

  let moveDescription;
  if (damageDice) {
    // hit bonus = accuracy of move + attack bonus from pokemon
    const { hitBonus, damageBonus } = calculateMoveModifiers(move, stats);
    moveDescription = DamageDetail({ damageDice, hitBonus, damageBonus });
  }

  const moveClasses = ['card'].concat(classes);
  return (
    <li className={moveClasses.join(' ')}>
      <div className="card-header">
        <div>
          <span className="h6">{name}</span>
        </div>
        <div>
          <span>{category}</span>
          <TypeLabel type={[type]} />
        </div>
      </div>
      <div className="card-body">
        <div className="columns text-small">
          <span className="column col-12">{effect}</span>
          {moveDescription}
        </div>
      </div>
      <div className="card-body">
        {children}
      </div>
    </li>
  );
};

export default MoveDetail;