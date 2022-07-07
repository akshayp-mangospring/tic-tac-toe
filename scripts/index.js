import singlePlayerGame from './single_player';
import twoPlayerGame from './two_player';

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.search === '?two_player=true') {
    twoPlayerGame();
  } else {
    singlePlayerGame();
  }
});
