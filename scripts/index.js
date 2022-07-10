import initGame from './game_modes';
import { gameModes } from './constants';

document.addEventListener('DOMContentLoaded', () => {
  const { ONLINE_PLAYER, OFFLINE_COMPUTER, OFFLINE_PLAYERS } = gameModes;
  switch (window.location.search) {
    // Ideally this should be the default mode based on availability of the internet
    // We need not provide query params.
    // This needs to be fixed. Case needs to be ```case '':```
    case `${ONLINE_PLAYER}=true`:
      initGame(ONLINE_PLAYER);
      break;

    // Offline Modes:
    // Ask the user which mode he wishes to play in
    // Default should be v/s Computer
    case `${OFFLINE_COMPUTER}=true`:
      initGame(OFFLINE_COMPUTER);
      break;
    case `${OFFLINE_PLAYERS}=true`:
      initGame(OFFLINE_PLAYERS);
      break;

    // Can be used for development mode
    default:
      initGame(OFFLINE_PLAYERS);
      break;
  }
});
