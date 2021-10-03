const makeDiffObj = (data) => {
  const diffObj = data.reduce((acc, [key, val]) => {
    if (Array.isArray(val)) {
      return { ...acc, [key]: makeDiffObj(val) };
    }
    return { ...acc, [key]: val };
  }, {});
  return diffObj;
};

const json = (data) => (
  JSON.stringify(makeDiffObj(data), null, ' ')
);

export default json;
