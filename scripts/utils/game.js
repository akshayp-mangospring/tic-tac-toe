import { getDomElemFromStr, reloadWindowOnTimeout } from './dom';
import { gameTiedHeader } from '../constants';

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

const getStrikeClass = (diff) => {
  switch (diff) {
    case 1:
      return 'won-horizontal';
    case 2:
      return 'won-clock-diagonal';
    case 3:
      return 'won-vertical';
    case 4:
      return 'won-anticlock-diagonal';
    default:
      return '';
  }
};

export const checkPlayerWon = (gameCells, { marker }) => {
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

export const strikeWonCells = (winCombo) => {
  const boardCells = document.getElementsByClassName('cell');
  const diff = winCombo[1] - winCombo[0];
  const strikeClass = getStrikeClass(diff);

  winCombo.forEach((i) => {
    boardCells[i].classList.add(strikeClass);
  });
};

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
    shouldComputeWinner: () => cellsFilledCount >= (rowSize * 2 - 1),
    isBoardFilled: () => cellsFilledCount === boardSize,
  });
};

export const hasGameTied = (gameState, winImage) => {
  if (gameState.isBoardFilled()) {
    // Declare Tie
    winImage.classList.add('game-tied');
    winImage.appendChild(
      getDomElemFromStr(gameTiedHeader),
    );
    reloadWindowOnTimeout(2000);
    return true;
  }
  return false;
};

export const hasPlayerWon = (gameState, winImage, player) => {
  // Should compute a game winner based on the amount of filled up cells on the board
  if (gameState.shouldComputeWinner()) {
    const { name } = player;
    const { hasWon, winCombo } = checkPlayerWon(gameState.getCells(), player);

    if (hasWon) {
      // Declare Winner
      strikeWonCells(winCombo);

      winImage.style.display = 'flex';
      winImage.appendChild(
        getDomElemFromStr(
          `<h1 class="game-status-text">${name} has Won the Game!</h1>`,
        ),
      );
      reloadWindowOnTimeout(5000);
      return true;
    }
  }
  return false;
};

export const placeMarkerInGame = (elem, gameState, marker, struct) => {
  // Update the marker in Game state
  gameState.setCell(
    Array.prototype.indexOf.call(elem.parentNode.children, elem),
    marker,
  );

  elem.appendChild(getDomElemFromStr(struct));
  elem.classList.add('filled-in');
};
