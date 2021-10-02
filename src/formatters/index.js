import plain from './plain.js';
import stylish from './stylish.js';

const formatter = (formatName, data) => {
  switch (formatName) {
    case ('plain'):
      return plain(data);
    default:
      return stylish(data, '    ', 0);
  }
};

export default formatter;
