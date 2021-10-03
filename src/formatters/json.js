const makeDiffObj = (data) => {
  const diffObj = data.reduce((acc, [key, val, status, val2]) => {
    const newAcc = {...acc};
    if (Array.isArray(val)) {
      newAcc[key] = makeDiffObj(val);
    } else {
      newAcc[key] = val;
    }
    return newAcc;
  }, {})
  return diffObj;
};

const json = (data) => {
  return JSON.stringify(makeDiffObj(data), null, ' ');
};

export default json;
