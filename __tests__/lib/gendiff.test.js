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
  genDiff,
  getDiffObj,
} from '../../lib/gendiff.js';

import {
  parseJson,
  parseYaml,
} from '../../lib/parsers.js';

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
const getPathToFile = (filePath) => {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = dirname(fileName);
  return join(dirName, '..', '__fixtures__', filePath);
};

const fixturesFile1Json = getPathToFile('file1.json');
const fixturesFile2Json = getPathToFile('file2.json');
const fixturesFile1Yaml = getPathToFile('file1.yml');
const fixturesFile2Yaml = getPathToFile('file2.yml');

test('genDiff JSON', () => {
  expect(genDiff(fixturesFile1Json, fixturesFile2Json)).toEqual(simplePatternString);
});

test('genDiff YAML', () => {
  expect(genDiff(fixturesFile1Yaml, fixturesFile2Yaml)).toEqual(simplePatternString);
});

test('getDiffObj JSON', () => {
  const fileContent1Json = parseJson(fixturesFile1Json);
  const fileContent2Json = parseJson(fixturesFile2Json);
  expect(getDiffObj(fileContent1Json, fileContent2Json)).toEqual(simplePatternArray);
  expect(getDiffObj('', '')).toEqual([]);
});

test('getDiffObj YAML', () => {
  const fileContent1Yaml = parseYaml(fixturesFile1Yaml);
  const fileContent2Yaml = parseYaml(fixturesFile2Yaml);
  expect(getDiffObj(fileContent1Yaml, fileContent2Yaml)).toEqual(simplePatternArray);
  expect(getDiffObj('', '')).toEqual([]);
});

test('getNormalizeDiff', () => {
  const fileContent1Json = parseJson(fixturesFile1Json);
  const fileContent2Json = parseJson(fixturesFile2Json);
  const jsonDiff = getDiffObj(fileContent1Json, fileContent2Json);
  expect(getNormalizeDiff(jsonDiff)).toEqual(simplePatternString);
  expect(getNormalizeDiff([])).toEqual(`{\n  ${[].join('\n  ')}\n}`);
});
