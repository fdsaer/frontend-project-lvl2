const makeOffset = (filler, number) => (
  new Array(number).fill(filler).join('')
);

const makeString = ([key, val, status, val2], replacer, offset) => {
  const joinReplacer = `\n${makeOffset(replacer, offset + 1)}`;
  const addedReplacer = `${joinReplacer.slice(0, -2)}+ `;
  const deletedReplacer = `${joinReplacer.slice(0, -2)}- `;
  let resultString = '';
  switch (status) {
    case ('added'): {
      resultString = `${addedReplacer}${key.toString()}: ${stylish(val, replacer, offset + 1)}`;
      break;
    }
    case ('deleted'): {
      resultString = `${deletedReplacer}${key.toString()}: ${stylish(val, replacer, offset + 1)}`;
      break;
    }
    case ('changed'): {
      resultString = `${deletedReplacer}${key.toString()}: ${stylish(val, replacer, offset + 1)}`
        + `${addedReplacer}${key.toString()}: ${stylish(val2, replacer, offset + 1)}`;
      break;
    }
    case ('equal'): {
      resultString = `${joinReplacer}${key.toString()}: ${stylish(val, replacer, offset + 1)}`;
      break;
    }
    default: {
      resultString = `${joinReplacer}${key.toString()}: ${stylish(val, replacer, offset + 1)}`;
    }
  }
  return resultString;
}

const stylish = (data, replacer, offset) => {
  if (!Array.isArray(data)) {
    return data === null ? 'null' : data.toString();
  }
  const arr = data.map((item) => makeString(item, replacer, offset));
  return `{${arr.join('')}\n${makeOffset(replacer, offset)}}`;
};

export default stylish;
