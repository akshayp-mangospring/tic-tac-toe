import { oPlayer, xPlayer } from '@scripts/constants';
import { reloadWindow } from '@scripts/utils';
import {
  getChildIndexInParent,
  isCellOccupied,
  placeMarkerOnDom,
} from '@scripts/utils/dom';
import { checkAndDeclareTie, checkAndDeclareWinner, setupGameState } from '@scripts/utils/game';

const offlinePlayersGame = () => {
  const gameState = setupGameState();
  const gameBoard = document.getElementById('game-board');
  const winImage = document.getElementById('success-pop');
  let currentPlayer = xPlayer;

  winImage.addEventListener('click', () => {
    reloadWindow();
  });

  gameBoard.addEventListener('click', ({ target }) => {
    const { marker } = currentPlayer;

    // Don't perform action for already filled up cell or don't perform any action outside a cell
    if (isCellOccupied(target)) return;

    const position = getChildIndexInParent(target);

    // Fill in the marker on DOM
    gameState.setCell(position, marker);
    placeMarkerOnDom(target, currentPlayer);

    if (checkAndDeclareWinner(gameState, currentPlayer)) return;

    // Switch Turn
    currentPlayer = currentPlayer === xPlayer ? oPlayer : xPlayer;

    checkAndDeclareTie(gameState);
  });
};

export default offlinePlayersGame;
