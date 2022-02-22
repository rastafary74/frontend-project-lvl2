import {
  normalize,
  resolve,
  extname,
} from 'path';
import { readFileSync } from 'fs';

export const getNormalizeDiff = (array) => `{\n  ${array.join('\n  ')}\n}`;

export const getFileContent = (path) => {
  let filePath = normalize(path);
  let data;
  if (filePath.startsWith('/') === false) {
    filePath = resolve(filePath);
  }
  try {
    data = readFileSync(filePath);
  } catch (err) {
    throw new SyntaxError(`${filePath} don't find`);
  }
  return data;
};

export const getJsonDiff = (dataOne, dataTwo) => {
  if (dataOne === '' || dataTwo === '') {
    return [];
  }
  const jsonDataOne = JSON.parse(dataOne);
  const jsonDataTwo = JSON.parse(dataTwo);
  const keysJsonData = Object.keys(jsonDataOne).concat(Object.keys(jsonDataTwo));
  const sortedArray = (element, index, array) => array.indexOf(element) === index;
  const uniqKeysJsonData = keysJsonData.filter(sortedArray);
  const calculateDiff = (acc, key) => {
    if (Object.hasOwn(jsonDataOne, key) && !Object.hasOwn(jsonDataTwo, key)) {
      acc.push(`- ${key}: ${jsonDataOne[key]}`);
      return acc;
    }
    if (!Object.hasOwn(jsonDataOne, key) && Object.hasOwn(jsonDataTwo, key)) {
      acc.push(`+ ${key}: ${jsonDataTwo[key]}`);
      return acc;
    }
    if (jsonDataOne[key] !== jsonDataTwo[key]) {
      acc.push(`- ${key}: ${jsonDataOne[key]}`);
      acc.push(`+ ${key}: ${jsonDataTwo[key]}`);
      return acc;
    }
    if (jsonDataOne[key] === jsonDataTwo[key]) {
      acc.push(`  ${key}: ${jsonDataOne[key]}`);
      return acc;
    }
    return acc;
  };
  return uniqKeysJsonData.sort().reduce(calculateDiff, []);
};

export const genDiff = (filePath1, filePath2) => {
  const data1 = getFileContent(filePath1);
  const data2 = getFileContent(filePath2);
  const extFile1 = extname(filePath1);
  const extFile2 = extname(filePath2);
  let result;
  if (extFile1.toLowerCase() === '.json' && extFile2.toLowerCase() === '.json') {
    result = getJsonDiff(data1, data2);
  }
  if (result.length === 0) {
    throw new SyntaxError('Diff don\'t find');
  }
  return getNormalizeDiff(result);
};
