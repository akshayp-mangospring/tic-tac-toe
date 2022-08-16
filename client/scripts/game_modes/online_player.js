import { socketMessages } from '../constants';
import { reloadWindow } from '../utils';
import {
  getChildIndexInParent,
  isCellOccupied,
  paintTieOnDom,
  paintWinnerOnDom,
  placeMarkerOnDom,
} from '../utils/dom';
import socket from '../utils/socket';

const {
  GAME_TIED,
  GAME_WON,
  MARKER_PLACED,
  PLACE_MARKER
} = socketMessages;

const onlinePlayerGame = () => {
  const gameBoard = document.getElementById('game-board');
  const winImage = document.getElementById('success-pop');

  winImage.addEventListener('click', () => {
    reloadWindow();
  });

  gameBoard.addEventListener('click', ({ target }) => {
    if (isCellOccupied(target)) return;

    socket.emit(PLACE_MARKER, { position: getChildIndexInParent(target) });
  });

  socket.on(MARKER_PLACED, ({ currentPlayer, position }) => {
    const elem = document.getElementById('game-board').children[position];

    placeMarkerOnDom(elem, currentPlayer);
  });

  socket.on(GAME_WON, ({ winCombo, player }) => {
    paintWinnerOnDom(winCombo, player);
  });

  socket.on(GAME_TIED, () => {
    paintTieOnDom();
  });
};

export default onlinePlayerGame;
