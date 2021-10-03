import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import * as fs from 'fs';
import diffSearcher from '../src/diffsearcher.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const diffStylishResult = (
  fs.readFileSync(getFixturePath('stylish_result.txt'), 'utf8')
);

const diffPlainResult = (
  fs.readFileSync(getFixturePath('plain_result.txt'), 'utf8')
);

const diffJsonResult = (
  fs.readFileSync(getFixturePath('json_result.txt'), 'utf8')
);

test('json stylish difference', () => {
  const actual = diffSearcher(getFixturePath('file1.2.json'), getFixturePath('file2.2.json'));
  expect(actual).toBe(diffStylishResult);
});

test('yaml stylish difference', () => {
  const actual = diffSearcher(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'));
  expect(actual).toBe(diffStylishResult);
});

test('json plain difference', () => {
  const actual = diffSearcher(getFixturePath('file1.2.json'), getFixturePath('file2.2.json'), 'plain');
  expect(actual).toBe(diffPlainResult);
});

test('json json difference', () => {
  const actual = diffSearcher(getFixturePath('file1.2.json'), getFixturePath('file2.2.json'), 'json');
  expect(actual).toBe(diffJsonResult);
});
