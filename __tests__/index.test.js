import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import diffSearcher from '../src/diffsearcher.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('diffSearcher', () => {
  const actual = diffSearcher(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expected = '{'
    + '\r\n\t- follow: false'
    + '\r\n\t  host: hexlet.io'
    + '\r\n\t- proxy: 123.234.53.22'
    + '\r\n\t- timeout: 50'
    + '\r\n\t+ timeout: 20'
    + '\r\n\t+ verbose: true'
    + '\r\n}';
  expect(actual).toBe(expected);
});
