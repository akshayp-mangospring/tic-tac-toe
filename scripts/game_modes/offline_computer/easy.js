import {
  getDomElemFromStr,
  getIndexOfAll,
  getRandomNumberInRange,
  reloadWindow,
  reloadWindowOnTimeout,
} from '../../utils/dom';
import { setupGameState, strikeWonCells, checkPlayerWon } from '../../utils/game';
import { gameTiedHeader, oPlayer, xPlayer } from '../../constants';

const offlineComputerEasy = () => {
  const gameState = setupGameState();
  const gameBoard = document.getElementById('game-board');
  const winImage = document.getElementById('success-pop');
  const humanPlayer = xPlayer;
  const aiPlayer = oPlayer;

  const placeMarkerInGame = (elem, marker, struct) => {
    elem.appendChild(getDomElemFromStr(struct));

    // Update the marker in Game state
    gameState.setCell(
      Array.prototype.indexOf.call(elem.parentNode.children, elem),
      marker,
    );
    elem.classList.add('filled-in');
  };

  const hasGameTied = () => {
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

  const hasPlayerWon = (player) => {
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

  winImage.addEventListener('click', () => {
    reloadWindow();
  });

  gameBoard.addEventListener('click', (e) => {
    const elem = e.target;
    const { marker: humanMarker, struct: humanStruct } = humanPlayer;
    const { marker: aiMarker, struct: aiStruct } = aiPlayer;

    // Don't perform action for already filled up cell or don't perform any action outside a cell
    if (
      elem.classList.contains('filled-in')
      || !elem.classList.contains('cell')
    ) {
      return;
    }

    // Fill in the marker on for human DOM
    placeMarkerInGame(elem, humanMarker, humanStruct);

    if (hasPlayerWon(humanPlayer)) return;

    if (hasGameTied()) return;

    // Calculate the available positions on board to be filled up
    const unfilledCells = getIndexOfAll(gameState.getCells(), null);
    const cellToMarkIndex = unfilledCells[getRandomNumberInRange(0, unfilledCells.length - 1)];

    // Place marker in game based on auto generated
    placeMarkerInGame(elem.parentNode.children[cellToMarkIndex], aiMarker, aiStruct);

    if (hasPlayerWon(aiPlayer));
  });
};

export default offlineComputerEasy;
