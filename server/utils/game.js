const getWinCombos = () => Object.freeze([
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]);

const checkPlayerWon = (gameCells, { marker }) => {
  const winCombos = getWinCombos();
  let playerWonStatus = {
    hasWon: false,
    winCombo: null,
  };

  for (let i = 0; i < winCombos.length; i += 1) {
    const winCombo = winCombos[i];

    if (winCombo.every((el) => gameCells[el] === marker)) {
      playerWonStatus = {
        hasWon: true,
        winCombo,
      };
      break;
    }
  }

  return playerWonStatus;
};

const setupGameState = (rowSize = 3) => {
  const boardSize = rowSize ** 2;
  const gs = Array(boardSize).fill(null);
  const minCellsToFill = rowSize * 2 - 1;
  let cellsFilledCount = 0;

  return Object.freeze({
    cells: gs,
    setCell: (i, v) => {
      gs[i] = v;
      cellsFilledCount += 1;
    },
    canComputeWinner: () => cellsFilledCount >= minCellsToFill,
    isBoardFilled: () => cellsFilledCount === boardSize,
  });
};

module.exports = {
  checkPlayerWon,
  getWinCombos,
  setupGameState,
};
