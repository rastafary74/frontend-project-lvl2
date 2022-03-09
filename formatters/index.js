import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (diff, style) => {
  switch (style) {
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    case 'stylish':
    default:
      return stylish(diff);
  }
};
