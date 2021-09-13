import * as fs from 'fs';
import path from 'path';

export default (file1, file2) => {
  const file1Path = path.resolve(file1);
  const file2Path = path.resolve(file2);
  const file1Object = JSON.parse(fs.readFileSync(file1Path, 'utf8'));
  const file2Object = JSON.parse(fs.readFileSync(file2Path, 'utf8'));
  const commonKeys = [...Object.keys(file1Object), ...Object.keys(file2Object)]
    .filter((item, index, arr) => arr.indexOf(item) === index)
    .sort();
  const diff = commonKeys.map((item) => {
    const result = [];
    if (Object.prototype.hasOwnProperty.call(file1Object, item)
      && Object.prototype.hasOwnProperty.call(file2Object, item)
      && file1Object[item] === file2Object[item]) {
      result.push(`  ${item}: ${file1Object[item]}`);
    } else if (Object.prototype.hasOwnProperty.call(file1Object, item)
      && Object.prototype.hasOwnProperty.call(file2Object, item)
      && file1Object[item] !== file2Object[item]) {
      result.push(`- ${item}: ${file1Object[item]}`);
      result.push(`+ ${item}: ${file2Object[item]}`);
    } else if (Object.prototype.hasOwnProperty.call(file1Object, item)) {
      result.push(`- ${item}: ${file1Object[item]}`);
    } else if (Object.prototype.hasOwnProperty.call(file2Object, item)) {
      result.push(`+ ${item}: ${file2Object[item]}`);
    }
    return result;
  });
  console.log(`{\r\n\t${diff.flat().join('\r\n\t')}\r\n}`);
};
