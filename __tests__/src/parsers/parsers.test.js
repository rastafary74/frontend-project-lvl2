import { test, expect } from '@jest/globals';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import parse from '../../../src/parsers/parsers.js';
import { getFileContent } from '../../../src/index.js';

const getPathToFile = (filePath) => {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = dirname(fileName);
  return join(dirName, '../../', '__fixtures__', filePath);
};

const fixturesFile1Json = getPathToFile('file1.json');
const fixturesFile2Json = getPathToFile('file2.json');
const fixturesFile1Yaml = getPathToFile('file1.yml');
const fixturesFile2Yaml = getPathToFile('file2.yml');

const contentFile1 = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};

const contentFile2 = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: null,
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
      doge: {
        wow: 'so much',
      },
    },
  },
  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },
  group3: {
    deep: {
      id: {
        number: 45,
      },
    },
    fee: 100500,
  },
};

test('genDiff JSON or YAML', () => {
  expect(parse('json', getFileContent(fixturesFile1Json))).toEqual(contentFile1);
  expect(parse('json', getFileContent(fixturesFile2Json))).toEqual(contentFile2);
  expect(parse('yml', getFileContent(fixturesFile1Yaml))).toEqual(contentFile1);
  expect(parse('yaml', getFileContent(fixturesFile2Yaml))).toEqual(contentFile2);
});

test('throws error', () => {
  expect(() => {
    parse('fake', '');
  }).toThrow();
});
