import { oPlayer, xPlayer } from '../../constants';
import { getIndexOfAll, getRandomNumberInRange, reloadWindow } from '../../utils';
import { isCellOccupied, paintTieOnDom, placeMarkerOnDom } from '../../utils/dom';
import { checkAndDeclareWinner, setupGameState, updateMarkerinGame } from '../../utils/game';

const offlineComputerEasy = () => {
  const gameState = setupGameState();
  const gameBoard = document.getElementById('game-board');
  const winImage = document.getElementById('success-pop');
  const humanPlayer = xPlayer;
  const aiPlayer = oPlayer;

  winImage.addEventListener('click', () => {
    reloadWindow();
  });

  gameBoard.addEventListener('click', (e) => {
    const elem = e.target;
    const { marker: humanMarker } = humanPlayer;
    const { marker: aiMarker } = aiPlayer;

    // Don't perform action for already filled up cell or don't perform any action outside a cell
    if (isCellOccupied(elem)) return;

    // Fill in the marker on for human DOM
    updateMarkerinGame(gameState, elem, humanMarker);
    placeMarkerOnDom(elem, humanPlayer);

    if (checkAndDeclareWinner(gameState, humanPlayer)) return;

    // Declare Tie
    if (gameState.isBoardFilled()) {
      paintTieOnDom();
      return;
    }

    // Calculate the available positions on board to be filled up
    const unfilledCells = getIndexOfAll(gameState.getCells(), null);
    const cellToMarkIndex = unfilledCells[getRandomNumberInRange(0, unfilledCells.length - 1)];

    // Place marker in game based on random vacant position availability
    updateMarkerinGame(gameState, elem, aiMarker);
    placeMarkerOnDom(elem.parentNode.children[cellToMarkIndex], aiPlayer);

    if (checkAndDeclareWinner(gameState, aiPlayer));
  });
};

export default offlineComputerEasy;
