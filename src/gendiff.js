import {
  extname,
} from 'path';

import {
  parseYaml,
  parseJson,
} from './parsers.js';

import getStylish from '../formatters/index.js';

const getDataForFormatter = (object) => {
  if (object !== Object(object)) {
    return object;
  }
  const valueKeys = Object.keys(object);
  const stringMap = (key) => {
    if (object[key] === Object(object[key])) {
      return [key, getDataForFormatter(object[key])];
    }
    return [key, object[key]];
  };
  return valueKeys.map(stringMap);
};

const getSummaryKeys = (obj1, obj2) => {
  const keysData = Object.keys(obj1).concat(Object.keys(obj2));
  const sortedArray = (element, index, array) => array.indexOf(element) === index;
  return keysData.filter(sortedArray).sort();
};

export const getDiffTwoObj = (dataOne, dataTwo) => {
  const uniqKeysJsonData = getSummaryKeys(dataOne, dataTwo);
  const calculateDiff = (acc, key) => {
    const dataOneKey = getDataForFormatter(dataOne[key]);
    const dataTwoKey = getDataForFormatter(dataTwo[key]);
    if (dataOne[key] === Object(dataOne[key]) && dataTwo[key] === Object(dataTwo[key])) {
      acc.push(['complex', key, getDiffTwoObj(dataOne[key], dataTwo[key])]);
      return acc;
    }
    if (Object.hasOwn(dataOne, key) && !Object.hasOwn(dataTwo, key)) {
      acc.push(['removed', key, dataOneKey]);
      return acc;
    }
    if (!Object.hasOwn(dataOne, key) && Object.hasOwn(dataTwo, key)) {
      acc.push(['added', key, dataTwoKey]);
      return acc;
    }
    if (dataOne[key] !== dataTwo[key]) {
      acc.push(['updated', key, dataOneKey, dataTwoKey]);
      return acc;
    }
    acc.push(['unchanged', key, dataOneKey]);
    return acc;
  };
  return uniqKeysJsonData.reduce(calculateDiff, []);
};

export const getDataFromFormat = (filePath, format) => {
  switch (format) {
    case '.json':
      return parseJson(filePath);
    case '.yml':
    case '.yaml':
      return parseYaml(filePath);
    default:
      throw new Error('Format don\'t support');
  }
};

export const genDiff = (filePath1, filePath2, style) => {
  const extFile1 = extname(filePath1).toLowerCase();
  const extFile2 = extname(filePath2).toLowerCase();
  const data1 = getDataFromFormat(filePath1, extFile1);
  const data2 = getDataFromFormat(filePath2, extFile2);
  const diffTwoObj = getDiffTwoObj(data1, data2);
  return getStylish(diffTwoObj, style);
};
