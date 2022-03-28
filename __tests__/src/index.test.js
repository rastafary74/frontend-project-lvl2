import { test, expect } from '@jest/globals';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getFileContent, genDiff } from '../../src/index.js';

const getPathToFile = (filePath) => {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = dirname(fileName);
  return join(dirName, '..', '__fixtures__', filePath);
};

const resultStylish = getPathToFile('result_stylish.txt');
const resultPlain = getPathToFile('result_plain.txt');
const resultJson = getPathToFile('result_json.txt');
const resultStylishData = getFileContent(resultStylish);
const resultPlainData = getFileContent(resultPlain);
const resultJsonData = getFileContent(resultJson);
const extForTest = ['yml', 'json'];

test.each(extForTest)('.add(%s)', (ext) => {
  const fixturesFile1 = getPathToFile(`file1.${ext}`);
  const fixturesFile2 = getPathToFile(`file2.${ext}`);
  expect(genDiff(fixturesFile1, fixturesFile2, 'stylish')).toEqual(resultStylishData);
  expect(genDiff(fixturesFile1, fixturesFile2, 'plain')).toEqual(resultPlainData);
  expect(genDiff(fixturesFile1, fixturesFile2, 'json')).toEqual(resultJsonData);
  expect(genDiff(fixturesFile1, fixturesFile2)).toEqual(resultStylishData);
});
