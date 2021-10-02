const valFormatter = (val) => {
  if (Array.isArray(val)) {
    return '[complex value]';
  } if (val === true) {
    return 'true';
  } if (val === false) {
    return 'false';
  } if (val === null) {
    return 'null';
  } if (val === undefined) {
    return 'undefined';
  }
  return `'${val}'`;
};

const parseItem = ([key, val, status, val2], formatter, path) => {
  let result = '';
  const divider = path === '' ? '' : '.';
  switch (status) {
    case ('added'):
      result = `Property '${path}${divider}${key}' was added with value: ${valFormatter(val)}`;
      break;
    case ('deleted'):
      result = `Property '${path}${divider}${key}' was removed`;
      break;
    case ('changed'):
      result = `Property '${path}${divider}${key}' was updated. From ${valFormatter(val)} to ${valFormatter(val2)}`;
      break;
    default:
      result = `${formatter(val, (path + divider + key))}`;
  }
  return result;
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
