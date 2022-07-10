import { oPlayer, xPlayer } from '../constants';
import { reloadWindow } from '../utils';
import {
  getChildIndexInParent, isCellOccupied, paintTieOnDom, placeMarkerOnDom,
} from '../utils/dom';
import { checkAndDeclareWinner, setupGameState } from '../utils/game';

const offlinePlayersGame = () => {
  const gameState = setupGameState();
  const gameBoard = document.getElementById('game-board');
  const winImage = document.getElementById('success-pop');
  let currentPlayer = xPlayer;

  winImage.addEventListener('click', () => {
    reloadWindow();
  });

  gameBoard.addEventListener('click', (e) => {
    const elem = e.target;
    const { marker } = currentPlayer;

    // Don't perform action for already filled up cell or don't perform any action outside a cell
    if (isCellOccupied(elem)) return;

    // Fill in the marker on DOM
    gameState.setCell(getChildIndexInParent(elem), marker);
    placeMarkerOnDom(elem, currentPlayer);

    if (checkAndDeclareWinner(gameState, currentPlayer)) return;

    // Switch Turn
    currentPlayer = currentPlayer === xPlayer ? oPlayer : xPlayer;

    // Declare Tie
    if (gameState.isBoardFilled()) {
      paintTieOnDom();
    }
  });
};

export default offlinePlayersGame;
