const makeOffset = (filler, number) => (
  new Array(number).fill(filler).join('')
);

const stringMaker = (formatter, replacer, offset, key) => (val, postReplacer) => (
  `${postReplacer}${key.toString()}: ${formatter(val, replacer, offset)}`
);

const parseItem = ([key, val, status, val2], formatter, replacer, offset) => {
  const joinReplacer = `\n${makeOffset(replacer, offset + 1)}`;
  const addedReplacer = `${joinReplacer.slice(0, -2)}+ `;
  const deletedReplacer = `${joinReplacer.slice(0, -2)}- `;
  const makeString = stringMaker(formatter, replacer, offset + 1, key);
  switch (status) {
    case ('added'):
      return makeString(val, addedReplacer);
    case ('deleted'):
      return makeString(val, deletedReplacer);
    case ('changed'):
      return makeString(val, deletedReplacer) + makeString(val2, addedReplacer);
    default:
      return makeString(val, joinReplacer);
  }
};

const stylish = (data, replacer, offset) => {
  if (!Array.isArray(data)) {
    return data === null ? 'null' : data.toString();
  }
  const arr = data.map((item) => parseItem(item, stylish, replacer, offset));
  return `{${arr.join('')}\n${makeOffset(replacer, offset)}}`;
};

export default stylish;
