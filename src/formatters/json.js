const valFormatter = (val) => {
  if (typeof (val) === 'boolean'
    || typeof (val) === 'number'
    || typeof (val) === 'undefined') {
    return val;
  } if (val === null) {
    return 'null';
  }
  return `'${val}'`;
};

const makeValStr = (status, val, val2) => {
  switch (status) {
    case ('added'):
      return `Property was added with value: ${valFormatter(val)}`;
    case ('deleted'):
      return 'Property was removed';
    case ('changed'):
      return `Property was updated. From ${valFormatter(val)} to ${valFormatter(val2)}`;
    default:
      return `Property value '${val}' was not updated`;
  }
};

const reducer = (acc, [key, val, status, val2], formatter) => {
  if (Array.isArray(val)) {
    return { ...acc, [key]: formatter(val) };
  }
  const propVal = makeValStr(status, val, val2);
  return { ...acc, [key]: propVal };
};

const makeDiffObj = (data) => (
  data.reduce((acc, item) => (
    reducer(acc, item, makeDiffObj)
  ), {})
);

const json = (data) => (
  JSON.stringify(makeDiffObj(data), null, ' ')
);

export default json;
