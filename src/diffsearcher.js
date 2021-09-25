import * as fs from 'fs';
import path from 'path';
import parsers from './parsers.js';

export default (file1, file2) => {
  const file1Path = path.resolve(file1);
  const file2Path = path.resolve(file2);
  const file1Extension = file1Path.split('.').slice(-1)[0];
  const file2Extension = file2Path.split('.').slice(-1)[0];
  const file1Content = fs.readFileSync(file1Path, 'utf8');
  const file2Content = fs.readFileSync(file2Path, 'utf8');
  const file1Object = parsers(file1Content, file1Extension);
  const file2Object = parsers(file2Content, file2Extension);
  const commonKeys = [...Object.keys(file1Object), ...Object.keys(file2Object)]
    .filter((item, index, arr) => arr.indexOf(item) === index)
    .sort();
  const diff = commonKeys.map((item) => {
    const result = [];
    if (!Object.prototype.hasOwnProperty.call(file1Object, item)) {
      result.push(`+ ${item}: ${file2Object[item]}`);
    } else if (!Object.prototype.hasOwnProperty.call(file2Object, item)) {
      result.push(`- ${item}: ${file1Object[item]}`);
    } else if (file1Object[item] === file2Object[item]) {
      result.push(`  ${item}: ${file1Object[item]}`);
    } else {
      result.push(`- ${item}: ${file1Object[item]}`);
      result.push(`+ ${item}: ${file2Object[item]}`);
    }
    return result;
  });
  return `{\r\n\t${diff.flat().join('\r\n\t')}\r\n}`;
};
