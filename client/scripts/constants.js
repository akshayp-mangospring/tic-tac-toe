export const serverUrl = 'http://localhost:4000';

// This constant to be removed
// Should be imported from shared directory
export const oPlayer = Object.freeze({
  marker: 'o',
  struct: '<div class="marker o-marker"></div>',
  name: 'Pink',
});

// This constant to be removed
// Should be imported from shared directory
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

export const connectionStatus = Object.freeze({
  ONLINE: 'online',
  OFFLINE: 'offline',
});

export const socketMessages = {
  GAME_TIED: 'game_tied',
  GAME_WON: 'game_won',
  MARKER_PLACED: 'marker_placed',
  PLACE_MARKER: 'place_marker',
};

const gameTiedText = "It's a tie! Play again!!";

export const gameTiedHeader = `<h1 class="game-status-text">${gameTiedText}</h1>`;
