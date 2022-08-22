import { oPlayer, xPlayer } from '@scripts/constants';
import {
  getIndexOfAll,
  getRandomNumberInRange,
  reloadWindow,
} from '@scripts/utils';
import {
  getChildIndexInParent,
  isCellOccupied,
  placeMarkerOnDom,
} from '@scripts/utils/dom';
import { checkAndDeclareTie, checkAndDeclareWinner, setupGameState } from '@scripts/utils/game';

const offlineComputerEasy = () => {
  const gameState = setupGameState();
  const gameBoard = document.getElementById('game-board');
  const winImage = document.getElementById('success-pop');
  const humanPlayer = xPlayer;
  const aiPlayer = oPlayer;

  winImage.addEventListener('click', () => {
    reloadWindow();
  });

  gameBoard.addEventListener('click', ({ target }) => {
    const { marker: humanMarker } = humanPlayer;
    const { marker: aiMarker } = aiPlayer;

    // Don't perform action for already filled up cell or don't perform any action outside a cell
    if (isCellOccupied(target)) return;

    // Fill in the marker for human on DOM
    gameState.setCell(getChildIndexInParent(target), humanMarker);
    placeMarkerOnDom(target, humanPlayer);

    if (checkAndDeclareWinner(gameState, humanPlayer)) return;

    if (checkAndDeclareTie(gameState)) return;

    // Calculate the available positions on board to be filled up
    const unfilledCells = getIndexOfAll(gameState.cells, null);
    const randomEmptyCell = getRandomNumberInRange(0, unfilledCells.length - 1);
    const cellToMarkIndex = unfilledCells[randomEmptyCell];

    // Place marker in game based on random vacant position availability
    gameState.setCell(cellToMarkIndex, aiMarker);
    placeMarkerOnDom(target.parentNode.children[cellToMarkIndex], aiPlayer);

    checkAndDeclareWinner(gameState, aiPlayer);
  });
};

export default offlineComputerEasy;
