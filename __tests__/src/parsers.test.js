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
  parseJson,
  parseYaml,
  getFileContent,
} from '../../src/parsers.js';

const getPathToFile = (filePath) => {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = dirname(fileName);
  return join(dirName, '..', '__fixtures__', filePath);
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
  expect(parseJson(fixturesFile1Json)).toEqual(contentFile1);
  expect(parseJson(fixturesFile2Json)).toEqual(contentFile2);
  expect(parseYaml(fixturesFile1Yaml)).toEqual(contentFile1);
  expect(parseYaml(fixturesFile2Yaml)).toEqual(contentFile2);
});

test('throws error', () => {
  const fixturesFakeFile = getPathToFile('fake.yml');
  expect(() => {
    getFileContent(fixturesFakeFile);
  }).toThrow();
});
