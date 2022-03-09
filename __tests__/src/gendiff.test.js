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
  getDiffTwoObj,
  getDataFromFormat,
} from '../../src/gendiff.js';

import {
  parseJson,
  parseYaml,
} from '../../src/parsers.js';

const simplePatternArray = [
  ['complex', 'common', [
    ['added', 'follow', false],
    ['unchanged', 'setting1', 'Value 1'],
    ['removed', 'setting2', 200],
    ['updated', 'setting3', true, null],
    ['added', 'setting4', 'blah blah'],
    ['added', 'setting5', [
      ['key5', 'value5'],
    ],
    ],
    ['complex', 'setting6', [
      ['complex', 'doge', [
        ['updated', 'wow', '', 'so much'],
      ],
      ],
      ['unchanged', 'key', 'value'],
      ['added', 'ops', 'vops'],
    ],
    ],
  ],
  ],
  ['complex', 'group1', [
    ['updated', 'baz', 'bas', 'bars'],
    ['unchanged', 'foo', 'bar'],
    ['updated', 'nest', [['key', 'value']], 'str'],
  ],
  ],
  ['removed', 'group2', [
    ['abc', 12345],
    ['deep', [
      ['id', 45],
    ],
    ],
  ],
  ],
  ['added', 'group3', [
    ['deep', [
      ['id', [
        ['number', 45],
      ],
      ],
    ],
    ],
    ['fee', 100500],
  ],
  ],
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

test('getDataFromFormat', () => {
  expect(getDataFromFormat(fixturesFile1Json, '.json')).toEqual(parseJson(fixturesFile1Json));
  expect(() => {
    getDataFromFormat(fixturesFile1Json, '.joke');
  }).toThrow();
});