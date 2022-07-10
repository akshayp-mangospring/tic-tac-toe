export const oPlayer = Object.freeze({
  marker: 'o',
  struct: '<div class="marker o-marker"></div>',
  name: 'Pink',
});

export const xPlayer = Object.freeze({
  marker: 'x',
  struct: '<div class="marker x-marker"></div>',
  name: 'Blue',
});

export const gameModes = Object.freeze({
  ONLINE_PLAYER: 'online_player',
  OFFLINE_COMPUTER: 'offline_computer',
  OFFLINE_PLAYERS: 'offline_players',
});

export const gameLevels = Object.freeze({
  EASY: 'easy',
  HARD: 'hard',
});

const gameTiedText = 'It\'s a tie! Play again!!';

export const gameTiedHeader = `<h1 class="game-status-text">${gameTiedText}</h1>`;
