import { gameModes } from '../constants';
import onlinePlayerGame from './online_player';
import offlineComputerGame from './offline_computer';
import offlinePlayersGame from './offline_players';

const { ONLINE_PLAYER, OFFLINE_COMPUTER, OFFLINE_PLAYERS } = gameModes;

const initGame = (mode = OFFLINE_PLAYERS) => {
  switch (mode) {
    case ONLINE_PLAYER:
      onlinePlayerGame();
      break;
    case OFFLINE_COMPUTER:
      offlineComputerGame();
      break;
    case OFFLINE_PLAYERS:
      offlinePlayersGame();
      break;
    default:
      console.info('NEED A MODE TO PLAY.');
      break;
  }
};

export default initGame;
