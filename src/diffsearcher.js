import * as fs from 'fs';
import path from 'path';
import parsers from './parsers.js';
import stylish from './stylish.js';

const itemIsObject = (item) => (
  typeof (item) === 'object' && !Array.isArray(item) && item !== null
);

const getItemDifference = (item, obj1, obj2, diffSearcher) => {
  let result = [];
  const obj1Property = Object.prototype.hasOwnProperty.call(obj1, item) ? obj1[item] : '';
  const obj2Property = Object.prototype.hasOwnProperty.call(obj2, item) ? obj2[item] : '';
  if (itemIsObject(obj1Property) && itemIsObject(obj2Property)) {
    result = [item, diffSearcher(obj1Property, obj2Property), 'equal'];
  } else if (itemIsObject(obj1Property) && Object.prototype.hasOwnProperty.call(obj2, item)) {
    result = [item, diffSearcher(obj1Property, obj1Property), 'changed', obj2[item]];
  } else if (itemIsObject(obj1Property)) {
    result = [item, diffSearcher(obj1Property, obj1Property), 'deleted'];
  } else if (itemIsObject(obj2Property) && Object.prototype.hasOwnProperty.call(obj1, item)) {
    result = [item, obj1[item], 'changed', diffSearcher(obj2Property, obj2Property)];
  } else if (itemIsObject(obj2Property)) {
    result = [item, diffSearcher(obj2Property, obj2Property), 'added'];
  } else if (!Object.prototype.hasOwnProperty.call(obj1, item)) {
    result = [item, obj2[item], 'added'];
  } else if (!Object.prototype.hasOwnProperty.call(obj2, item)) {
    result = [item, obj1[item], 'deleted'];
  } else if (obj1[item] === obj2[item]) {
    result = [item, obj1[item], 'equal'];
  } else {
    result = ([item, obj1[item], 'changed', obj2[item]]);
  }
  return result;
};

const getObjDifference = (obj1, obj2) => {
  const commonKeys = [...Object.keys(obj1), ...Object.keys(obj2)]
    .filter((item, index, arr) => arr.indexOf(item) === index)
    .sort();
  const diff = commonKeys.map((item) => getItemDifference(item, obj1, obj2, getObjDifference));
  return diff;
};

const diffSearcher = (file1, file2, formatter = stylish) => {
  const file1Path = path.resolve(file1);
  const file2Path = path.resolve(file2);
  const file1Extension = file1Path.split('.').slice(-1)[0];
  const file2Extension = file2Path.split('.').slice(-1)[0];
  const file1Content = fs.readFileSync(file1Path, 'utf8');
  const file2Content = fs.readFileSync(file2Path, 'utf8');
  const file1Object = parsers(file1Content, file1Extension);
  const file2Object = parsers(file2Content, file2Extension);
  const diff = getObjDifference(file1Object, file2Object);
  return formatter(diff, '    ', 0);
};

export default diffSearcher;
