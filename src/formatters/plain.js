const valFormatter = (val) => {
  if (Array.isArray(val)) {
    return '[complex value]';
  } if (typeof (val) === 'boolean' || typeof (val) === 'number') {
    return val;
  } if (val === null) {
    return 'null';
  } if (val === undefined) {
    return 'undefined';
  }
  return `'${val}'`;
};

const parseItem = ([key, val, status, val2], formatter, path) => {
  const divider = path === '' ? '' : '.';
  switch (status) {
    case ('added'):
      return `Property '${path}${divider}${key}' was added with value: ${valFormatter(val)}`;
    case ('deleted'):
      return `Property '${path}${divider}${key}' was removed`;
    case ('changed'):
      return `Property '${path}${divider}${key}' was updated. From ${valFormatter(val)} to ${valFormatter(val2)}`;
    default:
      return `${formatter(val, (path + divider + key))}`;
  }
};

const plain = (data, path = '') => {
  if (Array.isArray(data)) {
    const arr = data
      .map((item) => parseItem(item, plain, path))
      .filter((item) => item !== '');
    return `${arr.join('\n')}`;
  }
  return '';
};

export default plain;
