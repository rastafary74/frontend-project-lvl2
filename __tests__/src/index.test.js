import { test, expect } from '@jest/globals';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getExtFileFromPath, getFileContent, genDiff } from '../../src/index.js';

const getPathToFile = (filePath) => {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = dirname(fileName);
  return join(dirName, '..', '__fixtures__', filePath);
};

const fixturesFile1Json = getPathToFile('file1.json');
const fixturesFile2Json = getPathToFile('file2.json');
const fixturesFile1Yaml = getPathToFile('file1.yml');
const fixturesFile2Yaml = getPathToFile('file2.yml');
const resultStylish = getPathToFile('result_stylish.txt');
const resultPlain = getPathToFile('result_plain.txt');
const resultStylishData = getFileContent(resultStylish);
const resultPlainhData = getFileContent(resultPlain);

test('getExtFileFromPath', () => {
  expect(getExtFileFromPath('/test/test.json')).toEqual('json');
  expect(getExtFileFromPath('/test/test.yaml')).toEqual('yaml');
  expect(getExtFileFromPath('/test/test.yml')).toEqual('yml');
});

test('getFileContent', () => {
  expect(() => getFileContent('test.json')).toThrow();
});

test('genDiff JSON', () => {
  expect(genDiff(fixturesFile1Json, fixturesFile2Json, 'stylish')).toEqual(resultStylishData);
  expect(genDiff(fixturesFile1Json, fixturesFile2Json, 'plain')).toEqual(resultPlainhData);
});

test('genDiff YAML', () => {
  expect(genDiff(fixturesFile1Yaml, fixturesFile2Yaml, 'stylish')).toEqual(resultStylishData);
  expect(genDiff(fixturesFile1Yaml, fixturesFile2Yaml, 'plain')).toEqual(resultPlainhData);
});
