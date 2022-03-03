import {
  extname,
} from 'path';
import {
  parseYaml,
  parseJson,
} from './parsers.js';

export const stylish = (array, replacer = ' ', spacesCount = 4) => {
  const iter = (node, depth) => {
    const [key, value] = node;
    const countSpaces = 2;
    const indentSize = depth * spacesCount;
    const startString = replacer.repeat(indentSize - countSpaces);
    const bracketIndent = replacer.repeat(indentSize);
    if (Array.isArray(value) === false) {
      return `${startString}${key}: ${value}`;
    }
    const valueStr = value.map((item) => iter(item, depth + 1)).join('\n');
    return `${startString}${key}: {\n${valueStr}\n${bracketIndent}}`;
  };
  const result = array.flatMap((item) => iter(item, 1)).join('\n');
  return `{\n${result}\n}`;
};

const getDataForFormatter = (object) => {
  if (object !== Object(object)) {
    return String(object);
  }
  const valueKeys = Object.keys(object);
  const stringMap = (key) => {
    if (object[key] === Object(object[key])) {
      return [`  ${key}`, getDataForFormatter(object[key])];
    }
    return [`  ${key}`, object[key]];
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
      acc.push([`  ${key}`, getDiffTwoObj(dataOne[key], dataTwo[key])]);
      return acc;
    }
    if (Object.hasOwn(dataOne, key) && !Object.hasOwn(dataTwo, key)) {
      acc.push([`- ${key}`, dataOneKey]);
      return acc;
    }
    if (!Object.hasOwn(dataOne, key) && Object.hasOwn(dataTwo, key)) {
      acc.push([`+ ${key}`, dataTwoKey]);
      return acc;
    }
    if (dataOne[key] !== dataTwo[key]) {
      acc.push([`- ${key}`, dataOneKey]);
      acc.push([`+ ${key}`, dataTwoKey]);
      return acc;
    }
    acc.push([`  ${key}`, dataOneKey]);
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

export const genDiff = (filePath1, filePath2) => {
  const extFile1 = extname(filePath1).toLowerCase();
  const extFile2 = extname(filePath2).toLowerCase();
  const data1 = getDataFromFormat(filePath1, extFile1);
  const data2 = getDataFromFormat(filePath2, extFile2);
  return getDiffTwoObj(data1, data2);
};
