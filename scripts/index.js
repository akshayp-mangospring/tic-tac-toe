import initGame from './game_modes';
import { connectionStatus, gameLevels, gameModes } from './constants';

document.addEventListener('DOMContentLoaded', () => {
  const { ONLINE_PLAYER, OFFLINE_COMPUTER, OFFLINE_PLAYERS } = gameModes;
  const { EASY, HARD } = gameLevels;

  switch (window.location.search) {
    // Ideally this should be the default mode based on availability of the internet
    // We need not provide query params.
    // This needs to be fixed. Case needs to be ```case '':```
    case `${ONLINE_PLAYER}=true`:
      initGame({
        mode: ONLINE_PLAYER,
      });
      break;

    // Offline Modes:
    // Ask the user which mode he wishes to play in
    // Default should be v/s Computer
    case `${OFFLINE_COMPUTER}=true`:
      initGame({
        mode: OFFLINE_COMPUTER,
        level: EASY,
      });
      break;
    case `${OFFLINE_COMPUTER}=true&level=${HARD}`:
      initGame({
        mode: OFFLINE_COMPUTER,
        level: HARD,
      });
      break;
    case `${OFFLINE_PLAYERS}=true`:
      initGame({
        mode: OFFLINE_PLAYERS,
      });
      break;

    // Can be used for development mode
    default:
      initGame({
        mode: OFFLINE_COMPUTER,
        level: EASY,
      });
      break;
  }
});

const { ONLINE, OFFLINE } = connectionStatus;

function showConnectionStatus({ type }, txt) {
  const statusToast = document.getElementById('internet-connection-status');
  const showClass = 'show';

  statusToast.querySelector('.toast-body').innerText = txt;
  statusToast.classList.add(showClass);

  if (type === ONLINE) {
    setTimeout(() => {
      statusToast.classList.remove(showClass);
    }, 2000);
  }
}

window.addEventListener(OFFLINE, (e) => {
  showConnectionStatus(e, 'Lost connection', OFFLINE);
});

window.addEventListener(ONLINE, (e) => {
  showConnectionStatus(e, 'Back online');
});
