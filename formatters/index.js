import stylish from './stylish.js';
import plain from './plain.js';

export default (diff, style) => {
  switch (style) {
    case 'plain':
      return plain(diff);
    case 'stylish':
    default:
      return stylish(diff);
  }
};
