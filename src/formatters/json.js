const makeDiffObj = (data) => {
  const diffObj = data.reduce((acc, [key, val]) => {
    const newAcc = { ...acc };
    if (Array.isArray(val)) {
      newAcc[key] = makeDiffObj(val);
    } else {
      newAcc[key] = val;
    }
    return newAcc;
  }, {});
  return diffObj;
};

const json = (data) => (
  JSON.stringify(makeDiffObj(data), null, ' ')
);

export default json;
