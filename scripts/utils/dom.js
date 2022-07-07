export const getDomElemFromStr = (str) => {
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(str, 'text/html');

  return doc.body.firstElementChild;
};

export default getDomElemFromStr;
