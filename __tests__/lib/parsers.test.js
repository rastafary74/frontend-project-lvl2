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
} from '../../lib/parsers.js';

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
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const contentFile2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

test('genDiff JSON', () => {
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
