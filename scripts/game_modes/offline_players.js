import {
  getDomElemFromStr,
  reloadWindow,
  reloadWindowOnTimeout,
} from '../utils/dom';
import { initGame, strikeWonCells, hasPlayerWon } from '../utils/game';
import { xPlayer, oPlayer } from '../constants';

const offlinePlayersGame = () => {
  const gameState = initGame();
  const gameBoard = document.getElementById('game-board');
  const winImage = document.getElementById('success-pop');
  let currentPlayer = xPlayer;

  winImage.addEventListener('click', () => {
    reloadWindow();
  });

  gameBoard.addEventListener('click', (e) => {
    const elem = e.target;
    const { name, marker, struct } = currentPlayer;

    // Don't perform action for already filled up cell or don't perform any action outside a cell
    if (
      elem.classList.contains('filled-in')
      || !elem.classList.contains('cell')
    ) {
      return;
    }

    // Fill in the marker on DOM
    elem.appendChild(getDomElemFromStr(struct));

    // Update the marker in Game state
    gameState.setCell(
      Array.prototype.indexOf.call(elem.parentNode.children, elem),
      marker,
    );
    elem.classList.add('filled-in');

    const { hasWon, winCombo } = hasPlayerWon(gameState.getCells(), currentPlayer);

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
      reloadWindowOnTimeout(2000);
    }
  });
};

export default offlinePlayersGame;
