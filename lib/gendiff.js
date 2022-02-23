import {
  extname,
} from 'path';
import {
  parseYaml,
  parseJson,
} from './parsers.js';

export const getNormalizeDiff = (array) => `{\n  ${array.join('\n  ')}\n}`;

export const getDiffObj = (dataOne, dataTwo) => {
  if (dataOne === '' || dataTwo === '') return [];
  const keysData = Object.keys(dataOne).concat(Object.keys(dataTwo));
  const sortedArray = (element, index, array) => array.indexOf(element) === index;
  const uniqKeysJsonData = keysData.filter(sortedArray);
  const calculateDiff = (acc, key) => {
    if (Object.hasOwn(dataOne, key) && !Object.hasOwn(dataTwo, key)) {
      acc.push(`- ${key}: ${dataOne[key]}`);
      return acc;
    }
    if (!Object.hasOwn(dataOne, key) && Object.hasOwn(dataTwo, key)) {
      acc.push(`+ ${key}: ${dataTwo[key]}`);
      return acc;
    }
    if (dataOne[key] !== dataTwo[key]) {
      acc.push(`- ${key}: ${dataOne[key]}`);
      acc.push(`+ ${key}: ${dataTwo[key]}`);
      return acc;
    }
    acc.push(`  ${key}: ${dataOne[key]}`);
    return acc;
  };
  return uniqKeysJsonData.sort().reduce(calculateDiff, []);
};

export const genDiff = (filePath1, filePath2) => {
  const extFile1 = extname(filePath1).toLowerCase();
  const extFile2 = extname(filePath2).toLowerCase();
  let result;
  if (extFile1 === '.json' && extFile2 === '.json') {
    const dataJson1 = parseJson(filePath1);
    const dataJson2 = parseJson(filePath2);
    result = getDiffObj(dataJson1, dataJson2);
  }
  const yamlAcceptExt = ['.yml', '.yaml'];
  if (yamlAcceptExt.includes(extFile1) && yamlAcceptExt.includes(extFile2)) {
    const dataYaml1 = parseYaml(filePath1);
    const dataYaml2 = parseYaml(filePath2);
    result = getDiffObj(dataYaml1, dataYaml2);
  }
  if (result.length === 0) {
    throw new SyntaxError('Diff don\'t find');
  }
  return getNormalizeDiff(result);
};
