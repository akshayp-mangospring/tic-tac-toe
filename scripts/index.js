import { getDomElemFromStr } from './utils/dom';
import { getWinCombos } from './utils/game';

const hasPlayerWon = (gameCells, player) => {
  const { marker } = player;
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

document.addEventListener('DOMContentLoaded', () => {
  // Freezing objects doesn't let anyone add or alter properties of an object
  // after initiation thus adding security that our script might not be altered on the Front.
  const gameState = (() => {
    const gs = Array(9).fill(null);
    return Object.freeze({
      getCells: () => gs,
      setCell: (i, v) => {
        gs[i] = v;
      },
    });
  })();
  const oPlayer = Object.freeze({
    marker: 'o',
    struct: '<div class="marker o-marker"></div>',
    name: 'Pink',
  });
  const xPlayer = Object.freeze({
    marker: 'x',
    struct: '<div class="marker x-marker"></div>',
    name: 'Blue',
  });

  const gameBoard = document.getElementById('game-board');
  const winImage = document.getElementById('success-pop');
  let currentPlayer = xPlayer;

  winImage.addEventListener('click', () => {
    window.location.reload();
  });

  gameBoard.addEventListener('click', (e) => {
    const elem = e.target;
    const { name, marker, struct } = currentPlayer;

    // Don't perform action for already filled up cell or don't perform any action outside a cell
    if (
      elem.classList.contains('filled-in')
      || !elem.classList.contains('cell')
    ) return;

    // Fill in the marker on DOM
    elem.appendChild(getDomElemFromStr(struct));

    // Update the marker in Game state
    gameState.setCell(
      Array.prototype.indexOf.call(elem.parentNode.children, elem),
      marker,
    );
    elem.classList.add('filled-in');

    if (hasPlayerWon(gameState.getCells(), currentPlayer)) {
      // Declare Winner
      winImage.style.display = 'flex';
      winImage.appendChild(
        getDomElemFromStr(
          `<h1 class="game-status-text">${name} has Won the Game!</h1>`,
        ),
      );
      setTimeout(() => {
        window.location.reload();
      }, 5000);

      // This return prevent execution of further code to increase performance.
      return;
    }
    // Switch Turn
    if (currentPlayer === xPlayer) {
      currentPlayer = oPlayer;
    } else {
      currentPlayer = xPlayer;
    }

    if (gameState.getCells().every((el) => el !== null)) {
      // Declare Tie
      winImage.classList.add('game-tied');
      winImage.appendChild(
        getDomElemFromStr(
          '<h1 class="game-status-text">It\'s a tie! Play again!!</h1>',
        ),
      );
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  });
});