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
  getDiffTwoObj,
} from '../../src/gendiff.js';

import {
  parseJson,
} from '../../src/parsers.js';

import json from '../../formatters/json.js';

const simplePatternString = '[["complex","common",'
  + '[["added","follow",false],'
  + '["unchanged","setting1","Value 1"],'
  + '["removed","setting2",200],'
  + '["updated","setting3",true,null],'
  + '["added","setting4","blah blah"],'
  + '["added","setting5",[["key5","value5"]]],'
  + '["complex","setting6",[["complex","doge",'
  + '[["updated","wow","","so much"]]],'
  + '["unchanged","key","value"],'
  + '["added","ops","vops"]]]]],'
  + '["complex","group1",'
  + '[["updated","baz","bas","bars"],'
  + '["unchanged","foo","bar"],'
  + '["updated","nest",[["key","value"]],"str"]]],'
  + '["removed","group2",[["abc",12345],["deep",[["id",45]]]]],'
  + '["added","group3",[["deep",[["id",[["number",45]]]]],["fee",100500]]]]';

const getPathToFile = (filePath) => {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = dirname(fileName);
  return join(dirName, '..', '__fixtures__', filePath);
};

const fixturesFile1Json = getPathToFile('file1.json');
const fixturesFile2Json = getPathToFile('file2.json');
const fileContent1Json = parseJson(fixturesFile1Json);
const fileContent2Json = parseJson(fixturesFile2Json);
const diffToObj = getDiffTwoObj(fileContent1Json, fileContent2Json);

test('json', () => {
  const styledDiff = json(diffToObj);
  expect(styledDiff).toEqual(simplePatternString);
});
