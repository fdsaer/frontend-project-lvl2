import * as fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parsers from './parsers.js';
import formatter from './formatters/index.js';

const itemIsObject = (item) => (
  typeof (item) === 'object' && !Array.isArray(item) && item !== null
);

const getItemDifference = (item, obj1, obj2, diffSearcher) => {
  const obj1Property = Object.prototype.hasOwnProperty.call(obj1, item) ? obj1[item] : '';
  const obj2Property = Object.prototype.hasOwnProperty.call(obj2, item) ? obj2[item] : '';
  if (itemIsObject(obj1Property) && itemIsObject(obj2Property)) {
    return [item, diffSearcher(obj1Property, obj2Property), 'equal'];
  } if (itemIsObject(obj1Property) && Object.prototype.hasOwnProperty.call(obj2, item)) {
    return [item, diffSearcher(obj1Property, obj1Property), 'changed', obj2[item]];
  } if (itemIsObject(obj1Property)) {
    return [item, diffSearcher(obj1Property, obj1Property), 'deleted'];
  } if (itemIsObject(obj2Property) && Object.prototype.hasOwnProperty.call(obj1, item)) {
    return [item, obj1[item], 'changed', diffSearcher(obj2Property, obj2Property)];
  } if (itemIsObject(obj2Property)) {
    return [item, diffSearcher(obj2Property, obj2Property), 'added'];
  } if (!Object.prototype.hasOwnProperty.call(obj1, item)) {
    return [item, obj2[item], 'added'];
  } if (!Object.prototype.hasOwnProperty.call(obj2, item)) {
    return [item, obj1[item], 'deleted'];
  } if (obj1[item] === obj2[item]) {
    return [item, obj1[item], 'equal'];
  }
  return ([item, obj1[item], 'changed', obj2[item]]);
};

const getObjDifference = (obj1, obj2) => {
  const commonKeys = [...Object.keys(obj1), ...Object.keys(obj2)]
    .filter((item, index, arr) => arr.indexOf(item) === index);
  const diff = _.sortBy(commonKeys)
    .map((item) => getItemDifference(item, obj1, obj2, getObjDifference));
  return diff;
};

const diffSearcher = (file1, file2, formatName = 'stylish') => {
  const file1Path = path.resolve(file1);
  const file2Path = path.resolve(file2);
  const file1Extension = file1Path.split('.').slice(-1)[0];
  const file2Extension = file2Path.split('.').slice(-1)[0];
  const file1Content = fs.readFileSync(file1Path, 'utf8');
  const file2Content = fs.readFileSync(file2Path, 'utf8');
  const file1Object = parsers(file1Content, file1Extension);
  const file2Object = parsers(file2Content, file2Extension);
  const diff = getObjDifference(file1Object, file2Object);
  return formatter(formatName, diff);
};

export default diffSearcher;
