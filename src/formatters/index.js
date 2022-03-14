import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const styles = {
  plain,
  json,
  stylish,
};

export default (style, data) => {
  console.log(style);
  if (!(style in styles)) {
    throw new Error('Style don\'t support');
  }
  return styles[style](data);
};
