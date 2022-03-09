import {
  test,
  expect,
} from '@jest/globals';

import {
  fileURLToPath,
} from 'url';

import {
  dirname,
  join,
} from 'path';

import {
  genDiff,
} from '../../src/gendiff.js';

import plain from '../../formatters/plain.js';

const plainStyle = 'Property \'common.follow\' was added with value: false\n'
  + 'Property \'common.setting2\' was removed\n'
  + 'Property \'common.setting3\' was updated. From true to null\n'
  + 'Property \'common.setting4\' was added with value: \'blah blah\'\n'
  + 'Property \'common.setting5\' was added with value: [complex value]\n'
  + 'Property \'common.setting6.doge.wow\' was updated. From \'\' to \'so much\'\n'
  + 'Property \'common.setting6.ops\' was added with value: \'vops\'\n'
  + 'Property \'group1.baz\' was updated. From \'bas\' to \'bars\'\n'
  + 'Property \'group1.nest\' was updated. From [complex value] to \'str\'\n'
  + 'Property \'group2\' was removed\n'
  + 'Property \'group3\' was added with value: [complex value]';

const getPathToFile = (filePath) => {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = dirname(fileName);
  return join(dirName, '..', '__fixtures__', filePath);
};

const fixturesFile1Json = getPathToFile('file1.json');
const fixturesFile2Json = getPathToFile('file2.json');
const styledDiff = plain(genDiff(fixturesFile1Json, fixturesFile2Json, 'plain'));

test('plain', () => {
  expect(styledDiff).toEqual(plainStyle);
});
