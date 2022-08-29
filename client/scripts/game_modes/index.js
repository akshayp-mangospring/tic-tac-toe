import { gameLevels, gameModes } from '@scripts/constants';
import onlinePlayerGame from './online_player';
import offlineComputerEasy from './offline_computer/easy';
import offlineComputerHard from './offline_computer/hard';
import offlinePlayersGame from './offline_players';

const { ONLINE_PLAYER, OFFLINE_COMPUTER, OFFLINE_PLAYERS } = gameModes;
const { EASY, HARD } = gameLevels;

const initGame = (config = {
  mode: OFFLINE_PLAYERS, level: EASY
}) => {
  const { mode, level } = config;

  switch (mode) {
    case ONLINE_PLAYER:
      onlinePlayerGame();
      break;
    case OFFLINE_COMPUTER:
      level === HARD ? offlineComputerHard() : offlineComputerEasy();
      break;
    case OFFLINE_PLAYERS:
      offlinePlayersGame();
      break;
    default:
      console.info('NEED A VALID MODE TO PLAY.');
      break;
  }
};

export default initGame;
