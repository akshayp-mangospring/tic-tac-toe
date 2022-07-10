import { oPlayer, xPlayer } from '../../constants';
import { getIndexOfAll, reloadWindow } from '../../utils';
import { isCellOccupied, paintTieOnDom, placeMarkerOnDom } from '../../utils/dom';
import { checkAndDeclareWinner, setupGameState, updateMarkerinGame } from '../../utils/game';

const offlineComputerHard = () => {
  const gameState = setupGameState();
  const gameBoard = document.getElementById('game-board');
  const winImage = document.getElementById('success-pop');
  const humanPlayer = xPlayer;
  const aiPlayer = oPlayer;

  const calcMinimaxBestSpot = (unfilledCells) => {
    console.log(unfilledCells);
    for (let i = 0; i < unfilledCells.length; i += 1) {
      const el = unfilledCells[i];
      console.log(el);
    }

    return unfilledCells[0];
  };

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
    const cellToMarkIndex = unfilledCells[calcMinimaxBestSpot()];

    // Place marker in game based on random vacant position availability
    updateMarkerinGame(gameState, elem, aiMarker);
    placeMarkerOnDom(elem.parentNode.children[cellToMarkIndex], aiPlayer);

    if (checkAndDeclareWinner(gameState, aiPlayer));
  });
};

export default offlineComputerHard;
