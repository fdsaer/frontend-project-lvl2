import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const formatter = (formatName, data) => {
  switch (formatName) {
    case ('plain'):
      return plain(data);
    case ('json'):
      return json(data);
    default:
      return stylish(data, '    ', 0);
  }
};

export default formatter;
