import { reloadWindow } from '../utils';
import {
  getChildIndexInParent,
  isCellOccupied,
  placeMarkerOnDom,
  paintTieOnDom,
  paintWinnerOnDom,
} from '../utils/dom';
import socket from '../utils/socket';

const onlinePlayerGame = () => {
  const gameBoard = document.getElementById('game-board');
  const winImage = document.getElementById('success-pop');

  winImage.addEventListener('click', () => {
    reloadWindow();
  });

  gameBoard.addEventListener('click', ({ target }) => {
    if (isCellOccupied(target)) return;

    socket.emit('place_marker', { position: getChildIndexInParent(target) });
  });

  socket.on('marker_placed', ({ currentPlayer, position }) => {
    const elem = document.getElementById('game-board').children[position];

    placeMarkerOnDom(elem, currentPlayer);
  });

  socket.on('game_won', ({ winCombo, player }) => {
    paintWinnerOnDom(winCombo, player);
  });

  socket.on('game_tied', () => {
    paintTieOnDom();
  });
};

export default onlinePlayerGame;
