import {
  extname,
  normalize,
  resolve,
} from 'path';

import {
  readFileSync,
} from 'fs';

import parse from './parsers/parsers.js';
import setStyle from './formatters/index.js';
import getDiffTwoObj from './buildDiff.js';

export const getFullPath = (filePath) => {
  const normalizePath = normalize(filePath);
  return normalizePath.startsWith('/') ? normalizePath : resolve(normalizePath);
};

export const getExtFileFromPath = (filePath) => extname(filePath).toLowerCase().substring(1);

export const getFileContent = (fullPath) => {
  try {
    return readFileSync(fullPath, 'utf8');
  } catch (err) {
    throw new Error('File not found');
  }
};

export const genDiff = (filePath1, filePath2, style) => {
  const fullFile1Path = getFullPath(filePath1);
  const fullFile2Path = getFullPath(filePath2);
  const file1Ext = getExtFileFromPath(filePath1);
  const file2Ext = getExtFileFromPath(filePath2);
  const file1Content = getFileContent(fullFile1Path);
  const file2Content = getFileContent(fullFile2Path);
  const file1Data = parse(file1Ext, file1Content);
  const file2Data = parse(file2Ext, file2Content);
  const diffTwoObj = getDiffTwoObj(file1Data, file2Data);
  return setStyle(style, diffTwoObj);
};
