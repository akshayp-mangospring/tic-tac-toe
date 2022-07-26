import { reloadWindow } from '../utils';
import {
  getChildIndexInParent,
  isCellOccupied,
  placeMarkerOnDom,
} from '../utils/dom';
import { checkAndDeclareTie, checkAndDeclareWinner, setupGameState } from '../utils/game';

const onlinePlayerGame = () => {
  const gameBoard = document.getElementById('game-board');
  const winImage = document.getElementById('success-pop');

  winImage.addEventListener('click', () => {
    reloadWindow();
  });

  gameBoard.addEventListener('click', (e) => {
    const elem = e.target;

    // Don't perform action for already filled up cell or don't perform any action outside a cell
    if (isCellOccupied(elem)) return;

    const position = getChildIndexInParent(elem);

    window.socket.emit('place_marker', { position });
  });

  window.socket.on('marker_placed', ({ currentPlayer, gameState, position }) => {
    const elem = document.getElementById('game-board').children[position];

    // Fill in the marker on DOM
    placeMarkerOnDom(elem, currentPlayer);

    if (checkAndDeclareWinner(gameState, currentPlayer)) return;

    checkAndDeclareTie(gameState);
  });
};

export default onlinePlayerGame;
