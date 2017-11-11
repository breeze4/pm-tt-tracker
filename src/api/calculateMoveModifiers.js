import calculateModifier from './calculateModifier.js';

import config from '../Config.js';
const { refData } = config;
const MOVES_REF_DATA = refData.moves;

const calculateMoveModifiers = (move, stats) => {
  // total bonus = hit bonus of the pokemon + accuracy bonus of the move
  // determine which stat effects the move
  const { accuracyBonus, category } = MOVES_REF_DATA[move];
  let statKey;
  switch (category) {
    case 'Special':
      statKey = 'SPC_ATK';
      break;
    case 'Physical':
    default:
      statKey = 'ATK';
      break;
  }
  const statScore = stats[statKey];
  const totalBonus = calculateModifier(statScore) + accuracyBonus;
  return totalBonus;
}

export default calculateMoveModifiers;