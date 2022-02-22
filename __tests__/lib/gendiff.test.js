import {
  test,
  expect,
} from '@jest/globals';
import {
  join,
  dirname,
} from 'path';
import { fileURLToPath } from 'url';

import {
  getNormalizeDiff,
  getFileContent,
  getJsonDiff,
  genDiff,
} from '../../lib/gendiff.js';

const simplePatternString = '{\n'
  + '  - follow: false\n'
  + '    host: hexlet.io\n'
  + '  - proxy: 123.234.53.22\n'
  + '  - timeout: 50\n'
  + '  + timeout: 20\n'
  + '  + verbose: true\n'
  + '}';
const simplePatternArray = [
  '- follow: false',
  '  host: hexlet.io',
  '- proxy: 123.234.53.22',
  '- timeout: 50',
  '+ timeout: 20',
  '+ verbose: true',
];
const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const fixturesFile1 = join(dirName, '..', '__fixtures__', 'file1.json');
const fixturesFile2 = join(dirName, '..', '__fixtures__', 'file2.json');

test('genDiff', () => {
  expect(genDiff(fixturesFile1, fixturesFile2)).toEqual(simplePatternString);
});

test('getJsonDiff', () => {
  const fileContent1 = getFileContent(fixturesFile1);
  const fileContent2 = getFileContent(fixturesFile2);
  expect(getJsonDiff(fileContent1, fileContent2)).toEqual(simplePatternArray);
  expect(getJsonDiff('', '')).toEqual([]);
});

test('getNormalizeDiff', () => {
  const fileContent1 = getFileContent(fixturesFile1);
  const fileContent2 = getFileContent(fixturesFile2);
  const jsonDiff = getJsonDiff(fileContent1, fileContent2);
  expect(getNormalizeDiff(jsonDiff)).toEqual(simplePatternString);
  expect(getNormalizeDiff([])).toEqual(`{\n  ${[].join('\n  ')}\n}`);
});
