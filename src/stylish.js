const makeRepeater = (filler, number) => (
  new Array(number).fill(filler).join('')
);

const stylish = (data, replacer, iter) => {
  if (!Array.isArray(data)) {
    return data === null ? 'null' : data.toString();
  }
  const arr = data.map(([key, val, status, val2]) => {
    const joinReplacer = `\n${makeRepeater(replacer, iter + 1)}`;
    const addedReplacer = `${joinReplacer.slice(0, -2)}+ `;
    const deletedReplacer = `${joinReplacer.slice(0, -2)}- `;
    switch (status) {
      case ('added'): {
        return `${addedReplacer}${key.toString()}: ${stylish(val, replacer, iter + 1)}`;
      }
      case ('deleted'): {
        return `${deletedReplacer}${key.toString()}: ${stylish(val, replacer, iter + 1)}`;
      }
      case ('changed'): {
        return `${deletedReplacer}${key.toString()}: ${stylish(val, replacer, iter + 1)}`
          + `${addedReplacer}${key.toString()}: ${stylish(val2, replacer, iter + 1)}`;
      }
      case ('equal'): {
        return `${joinReplacer}${key.toString()}: ${stylish(val, replacer, iter + 1)}`;
      }
      default: {
        return `${joinReplacer}${key.toString()}: ${stylish(val, replacer, iter + 1)}`;
      }
    }
  });
  return `{${arr.join('')}\n${makeRepeater(replacer, iter)}}`;
};

export default stylish;
