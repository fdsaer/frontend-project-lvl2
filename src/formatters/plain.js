const valFormatter = (val) => {
  let result = `'${val}'`;
  if (Array.isArray(val)) {
    result = '[complex value]';
  } if (val === true) {
    result = 'true';
  } if (val === false) {
    result = 'false';
  } if (val === null) {
    result = 'null';
  } if (val === undefined) {
    result = 'undefined';
  }
  return result;
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