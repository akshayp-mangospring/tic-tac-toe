import { oPlayer, xPlayer } from '../constants';
import { reloadWindow } from '../utils';
import { isCellOccupied } from '../utils/dom';
import {
  hasGameTied, hasPlayerWon, placeMarkerInGame, setupGameState,
} from '../utils/game';

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
    const { marker, struct } = currentPlayer;

    // Don't perform action for already filled up cell or don't perform any action outside a cell
    if (isCellOccupied(elem)) return;

    // Fill in the marker on DOM
    placeMarkerInGame(elem, gameState, marker, struct);

    if (hasPlayerWon(gameState, winImage, currentPlayer)) return;

    // Switch Turn
    currentPlayer = currentPlayer === xPlayer ? oPlayer : xPlayer;

    hasGameTied(gameState, winImage);
  });
};

export default offlinePlayersGame;
