import { paintWinnerOnDom } from './dom';

// Private functions
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

// Public exports
export const setupGameState = () => {
  const rowSize = 3;
  const boardSize = rowSize ** 2;
  const gs = Array(boardSize).fill(null);
  let cellsFilledCount = 0;

  return Object.freeze({
    getCells: () => gs,
    setCell: (i, v) => {
      gs[i] = v;
      cellsFilledCount += 1;
    },
    shouldComputeWinner: () => cellsFilledCount >= rowSize * 2 - 1,
    isBoardFilled: () => cellsFilledCount === boardSize,
  });
};

export const checkAndDeclareWinner = (gameState, player) => {
  // Should compute a game winner based on the amount of filled up cells on the board
  if (gameState.shouldComputeWinner()) {
    const { hasWon, winCombo } = checkPlayerWon(gameState.getCells(), player);

    if (hasWon) {
      paintWinnerOnDom(winCombo, player);
      return true;
    }
  }
  return false;
};
