export const getDomElemFromStr = (str) => {
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(str, 'text/html');

  return doc.body.firstElementChild;
};

export const reloadWindow = () => window.location.reload();

export const reloadWindowOnTimeout = (t) => {
  setTimeout(() => {
    reloadWindow();
  }, t);
};

export const getIndexOfAll = (arr, val) => {
  const indexes = [];

  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === val) {
      indexes.push(i);
    }
  }

  return indexes;
};

export const getRandomNumberInRange = (min, max) => (
  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1))
    + Math.ceil(min)
);
