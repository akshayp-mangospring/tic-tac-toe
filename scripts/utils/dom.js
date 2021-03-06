import { getDomElemFromStr, reloadWindowOnTimeout } from './index';
import { gameTiedHeader } from '../constants';

// Private functions
const getSiblings = (el) => el.parentNode.children;
const cellFilledIn = (el) => el.classList.contains('filled-in');
const elemIsCell = (el) => el.classList.contains('cell');

const getStrikeClass = (diff) => {
  switch (diff) {
    case 1:
      return 'won-horizontal';
    case 2:
      return 'won-clock-diagonal';
    case 3:
      return 'won-vertical';
    case 4:
      return 'won-anticlock-diagonal';
    default:
      return '';
  }
};

const strikeWonCells = (winCombo) => {
  const boardCells = document.getElementsByClassName('cell');
  const diff = winCombo[1] - winCombo[0];
  const strikeClass = getStrikeClass(diff);

  winCombo.forEach((i) => {
    boardCells[i].classList.add(strikeClass);
  });
};

// Public exports
export const isCellOccupied = (el) => cellFilledIn(el) || !elemIsCell(el);

export const paintTieOnDom = () => {
  const winImage = document.getElementById('success-pop');

  // Declare Tie
  winImage.classList.add('game-tied');
  winImage.appendChild(getDomElemFromStr(gameTiedHeader));
  reloadWindowOnTimeout(2000);
};

export const placeMarkerOnDom = (elem, { struct }) => {
  elem.appendChild(getDomElemFromStr(struct));
  elem.classList.add('filled-in');
};

export const paintWinnerOnDom = (winCombo, { name }) => {
  const winImage = document.getElementById('success-pop');

  // Declare Winner
  strikeWonCells(winCombo);

  winImage.style.display = 'flex';
  winImage.appendChild(
    getDomElemFromStr(
      `<h1 class="game-status-text">${name} has Won the Game!</h1>`,
    ),
  );
  reloadWindowOnTimeout(5000);
};

export const getChildIndexInParent = (el) => Array.prototype.indexOf.call(getSiblings(el), el);
