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
  genDiff,
  getDiffTwoObj,
  stylish,
  getDataFromFormat,
} from '../../src/gendiff.js';

import {
  parseJson,
  parseYaml,
} from '../../src/parsers.js';

const simplePatternString = '{\n'
  + '    common: {\n'
  + '      + follow: false\n'
  + '        setting1: Value 1\n'
  + '      - setting2: 200\n'
  + '      - setting3: true\n'
  + '      + setting3: null\n'
  + '      + setting4: blah blah\n'
  + '      + setting5: {\n'
  + '            key5: value5\n'
  + '        }\n'
  + '        setting6: {\n'
  + '            doge: {\n'
  + '              - wow: \n'
  + '              + wow: so much\n'
  + '            }\n'
  + '            key: value\n'
  + '          + ops: vops\n'
  + '        }\n'
  + '    }\n'
  + '    group1: {\n'
  + '      - baz: bas\n'
  + '      + baz: bars\n'
  + '        foo: bar\n'
  + '      - nest: {\n'
  + '            key: value\n'
  + '        }\n'
  + '      + nest: str\n'
  + '    }\n'
  + '  - group2: {\n'
  + '        abc: 12345\n'
  + '        deep: {\n'
  + '            id: 45\n'
  + '        }\n'
  + '    }\n'
  + '  + group3: {\n'
  + '        deep: {\n'
  + '            id: {\n'
  + '                number: 45\n'
  + '            }\n'
  + '        }\n'
  + '        fee: 100500\n'
  + '    }\n'
  + '}';
const simplePatternArray = [
  ['  common', [
    ['+ follow', 'false'],
    ['  setting1', 'Value 1'],
    ['- setting2', '200'],
    ['- setting3', 'true'],
    ['+ setting3', 'null'],
    ['+ setting4', 'blah blah'],
    ['+ setting5', [
      ['  key5', 'value5']]],
    ['  setting6', [
      ['  doge', [
        ['- wow', ''],
        ['+ wow', 'so much']]],
      ['  key', 'value'],
      ['+ ops', 'vops']]]]],
  ['  group1', [
    ['- baz', 'bas'],
    ['+ baz', 'bars'],
    ['  foo', 'bar'],
    ['- nest',
      [
        ['  key', 'value']]],
    ['+ nest', 'str']]],
  ['- group2', [
    ['  abc', 12345],
    ['  deep', [
      ['  id', 45]]]]],
  ['+ group3', [
    ['  deep', [
      ['  id', [
        ['  number', 45]]]]],
    ['  fee', 100500]]]];

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
  expect(genDiff(fixturesFile1Json, fixturesFile2Json)).toEqual(simplePatternArray);
});

test('genDiff YAML', () => {
  expect(genDiff(fixturesFile1Yaml, fixturesFile2Yaml)).toEqual(simplePatternArray);
});

test('getDiffTwoObj JSON', () => {
  const fileContent1Json = parseJson(fixturesFile1Json);
  const fileContent2Json = parseJson(fixturesFile2Json);
  expect(getDiffTwoObj(fileContent1Json, fileContent2Json)).toEqual(simplePatternArray);
  expect(getDiffTwoObj('', '')).toEqual([]);
});

test('getDiffTwoObj YAML', () => {
  const fileContent1Yaml = parseYaml(fixturesFile1Yaml);
  const fileContent2Yaml = parseYaml(fixturesFile2Yaml);
  expect(getDiffTwoObj(fileContent1Yaml, fileContent2Yaml)).toEqual(simplePatternArray);
  expect(getDiffTwoObj('', '')).toEqual([]);
});

test('stylish', () => {
  const styledDiff = stylish(genDiff(fixturesFile1Json, fixturesFile2Json));
  expect(styledDiff).toEqual(simplePatternString);
});

test('getDataFromFormat', () => {
  expect(getDataFromFormat(fixturesFile1Json, '.json')).toEqual(parseJson(fixturesFile1Json));
  expect(() => {
    getDataFromFormat(fixturesFile1Json, '.joke');
  }).toThrow();
});
