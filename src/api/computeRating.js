// stats:
// 1-star	6
// 2-star	8
// 3-star	10
// 4-star	12
// 5-star	14

const computeRating = (stats) => {
  const { HP, ATK, DEF, SPC_ATK, SPC_DEF, SPD } = stats;
  const average = (
    ATK + DEF + SPC_ATK + SPC_DEF + SPD) / 6
    + HP / 30;
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