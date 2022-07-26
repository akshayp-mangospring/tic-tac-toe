// Below constants to be moved into a shared code folder to be shared in Front End and Back End
const oPlayer = Object.freeze({
  marker: 'o',
  struct: '<div class="marker o-marker"></div>',
  name: 'Pink',
});

const xPlayer = Object.freeze({
  marker: 'x',
  struct: '<div class="marker x-marker"></div>',
  name: 'Blue',
});

module.exports = {
  oPlayer,
  xPlayer,
};
