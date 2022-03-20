import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import stylish from '../../../src/formatters/stylish.js';
import { getFileContent } from '../../../src/index.js';
import parse from '../../../src/parsers/parsers.js';
import getDiffTwoObj from '../../../src/buildDiff.js';

const getPathToFile = (filePath) => {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = dirname(fileName);
  return join(dirName, '../../', '__fixtures__', filePath);
};

const fixturesFile1Json = getPathToFile('file1.json');
const fixturesFile2Json = getPathToFile('file2.json');
const resulStylish = getPathToFile('result_stylish.txt');
const resulStylishData = getFileContent(resulStylish);
const file1Content = getFileContent(fixturesFile1Json);
const file2Content = getFileContent(fixturesFile2Json);
const file1Data = parse('json', file1Content);
const file2Data = parse('json', file2Content);
const diffTwoObj = getDiffTwoObj(file1Data, file2Data);

test('stylish', () => {
  expect(stylish(diffTwoObj)).toEqual(resulStylishData);
});
