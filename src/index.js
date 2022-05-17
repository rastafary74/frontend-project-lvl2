import { extname, resolve } from 'path';
import { readFileSync } from 'fs';
import parse from './parsers/parsers.js';
import getFormatted from './formatters/index.js';
import getDiff from './buildDiff.js';

export const getFullPath = (filePath) => resolve(process.cwd(), filePath);

export const getExtFileFromPath = (filePath) => extname(filePath).toLowerCase().substring(1);

export const getFileContent = (fullPath) => readFileSync(fullPath, 'utf8');

export const genDiff = (filePath1, filePath2, style = 'stylish') => {
  const fullFile1Path = getFullPath(filePath1);
  const fullFile2Path = getFullPath(filePath2);
  const file1Ext = getExtFileFromPath(filePath1);
  const file2Ext = getExtFileFromPath(filePath2);
  const file1Content = getFileContent(fullFile1Path);
  const file2Content = getFileContent(fullFile2Path);
  const file1Data = parse(file1Ext, file1Content);
  const file2Data = parse(file2Ext, file2Content);
  const diffTwoObj = getDiff(file1Data, file2Data);
  return getFormatted(style, diffTwoObj);
};
