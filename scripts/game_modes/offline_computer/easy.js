import { oPlayer, xPlayer } from '../../constants';
import { getIndexOfAll, getRandomNumberInRange, reloadWindow } from '../../utils';
import {
  hasGameTied, hasPlayerWon, placeMarkerInGame, setupGameState,
} from '../../utils/game';
import { isCellOccupied } from '../../utils/dom';

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
    const { marker: humanMarker, struct: humanStruct } = humanPlayer;
    const { marker: aiMarker, struct: aiStruct } = aiPlayer;

    // Don't perform action for already filled up cell or don't perform any action outside a cell
    if (isCellOccupied(elem)) return;

    // Fill in the marker on for human DOM
    placeMarkerInGame(elem, gameState, humanMarker, humanStruct);

    if (hasPlayerWon(gameState, winImage, humanPlayer)) return;

    if (hasGameTied(gameState, winImage)) return;

    // Calculate the available positions on board to be filled up
    const unfilledCells = getIndexOfAll(gameState.getCells(), null);
    const cellToMarkIndex = unfilledCells[getRandomNumberInRange(0, unfilledCells.length - 1)];

    // Place marker in game based on auto generated
    placeMarkerInGame(elem.parentNode.children[cellToMarkIndex], gameState, aiMarker, aiStruct);

    if (hasPlayerWon(gameState, winImage, aiPlayer));
  });
};

export default offlineComputerEasy;
