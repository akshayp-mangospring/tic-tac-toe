import { reloadWindow } from '../utils';
import {
  getChildIndexInParent,
  isCellOccupied,
  placeMarkerOnDom,
} from '../utils/dom';
import { declareTie, declareWinner } from '../utils/game';

const onlinePlayerGame = () => {
  const gameBoard = document.getElementById('game-board');
  const winImage = document.getElementById('success-pop');

  winImage.addEventListener('click', () => {
    reloadWindow();
  });

  gameBoard.addEventListener('click', ({ target }) => {
    if (isCellOccupied(target)) return;

    window.socket.emit('place_marker', { position: getChildIndexInParent(target) });
  });

  window.socket.on('marker_placed', ({ currentPlayer, position }) => {
    const elem = document.getElementById('game-board').children[position];

    placeMarkerOnDom(elem, currentPlayer);
  });

  window.socket.on('game_won', (winCombo, player) => {
    declareWinner(winCombo, player);
  });

  window.socket.on('game_tied', () => {
    declareTie();
  });
};

export default onlinePlayerGame;
