import { gameLevels } from '@scripts/constants';
import offlineComputerEasy from './easy';
import offlineComputerHard from './hard';

const { HARD } = gameLevels;

const offlineComputerGame = (level) => {
  if (level === HARD) {
    offlineComputerHard();
    return;
  }

  offlineComputerEasy();
};

export default offlineComputerGame;
