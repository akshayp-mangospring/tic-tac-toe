import { gameLevels, gameModes } from '@scripts/constants';
import onlinePlayerGame from './online_player';
import offlineComputerEasy from './offline_computer/easy';
import offlineComputerHard from './offline_computer/hard';
import offlinePlayersGame from './offline_players';

const { ONLINE_PLAYER, OFFLINE_COMPUTER, OFFLINE_PLAYERS } = gameModes;
const { EASY } = gameLevels;

const initGame = ({ mode = OFFLINE_PLAYERS, level = EASY }) => ({
  [ONLINE_PLAYER]: onlinePlayerGame,
  [OFFLINE_PLAYERS]: offlinePlayersGame,
  [OFFLINE_COMPUTER]: level === EASY ? offlineComputerEasy : offlineComputerHard,
}[mode]());

export default initGame;
