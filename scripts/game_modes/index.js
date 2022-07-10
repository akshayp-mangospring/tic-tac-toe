import { gameLevels, gameModes } from '../constants';
import onlinePlayerGame from './online_player';
import offlineComputerEasy from './offline_computer/easy';
import offlineComputerHard from './offline_computer/hard';
import offlinePlayersGame from './offline_players';

const { ONLINE_PLAYER, OFFLINE_COMPUTER, OFFLINE_PLAYERS } = gameModes;
const { EASY, HARD } = gameLevels;

const initGame = ({ mode = OFFLINE_PLAYERS, level = EASY }) => {
  switch (mode) {
    case ONLINE_PLAYER:
      onlinePlayerGame();
      break;
    case OFFLINE_COMPUTER:
      if (level === EASY) {
        offlineComputerEasy();
      } else if (level === HARD) {
        offlineComputerHard();
      }
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
