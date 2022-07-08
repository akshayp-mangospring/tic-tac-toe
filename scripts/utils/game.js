const getWinCombos = () =>
  Object.freeze([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]);

export const hasPlayerWon = (gameCells, { marker }) => {
  const winCombos = getWinCombos();

  for (let i = 0; i < winCombos.length; i += 1) {
    const winCombo = winCombos[i];
    let matchCount = 0;

    for (let j = 0; j < winCombo.length; j += 1) {
      const elem = winCombo[j];
      if (gameCells[elem] !== marker) break;
      matchCount += 1;
    }

    if (matchCount === 3) return true;
  }
  return false;
};

export const initGame = () => {
  const gs = Array(9).fill(null);

  return Object.freeze({
    getCells: () => gs,
    setCell: (i, v) => {
      gs[i] = v;
    },
  });
};
