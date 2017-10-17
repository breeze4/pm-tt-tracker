// stats:
// 1-star	6
// 2-star	8
// 3-star	10
// 4-star	12
// 5-star	14

const computeRating = (stats) => {
  const { hp, attack, defense, specialAttack, specialDefense, speed } = stats;
  const average = (
    attack + defense + specialAttack + specialDefense + speed) / 6
    + hp / 30;
  if (average < 8) {
    return 1;
  } else if (average < 10) {
    return 2;
  } else if (average < 12) {
    return 3;
  } else if (average < 14) {
    return 4;
  } else if (average >= 14) {
    return 5;
  }
}

export default computeRating;