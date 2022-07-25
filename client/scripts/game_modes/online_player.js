import { oPlayer, xPlayer } from '../constants';
import { reloadWindow } from '../utils';
import {
  getChildIndexInParent,
  isCellOccupied,
  placeMarkerOnDom,
} from '../utils/dom';
import { checkAndDeclareTie, checkAndDeclareWinner, setupGameState } from '../utils/game';

const onlinePlayerGame = () => {
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

    const position = getChildIndexInParent(elem);

    // Fill in the marker on DOM
    gameState.setCell(position, marker);
    placeMarkerOnDom(elem, currentPlayer);

    window.socket.emit('place_marker', { position });

    if (checkAndDeclareWinner(gameState, currentPlayer)) return;

    // Switch Turn
    currentPlayer = currentPlayer === xPlayer ? oPlayer : xPlayer;

    checkAndDeclareTie(gameState);
  });

  window.socket.on('marker_placed', ({ position, success }) => {
    if (success === 200) {
      console.log(position);
    }
  });
};

export default onlinePlayerGame;
