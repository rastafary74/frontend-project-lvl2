import _ from 'lodash';

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
  const filteredArray = keysData.filter(sortedArray);
  return _.sortBy(filteredArray);
};

const getDiff = (dataOne, dataTwo) => {
  const uniqKeysJsonData = getSummaryKeys(dataOne, dataTwo);
  const calculateDiff = (acc, key) => {
    const dataOneKey = getDataForFormatter(dataOne[key]);
    const dataTwoKey = getDataForFormatter(dataTwo[key]);
    if (dataOne[key] === Object(dataOne[key]) && dataTwo[key] === Object(dataTwo[key])) {
      return acc.concat([['complex', key, getDiff(dataOne[key], dataTwo[key])]]);
    }
    if (key in dataOne && !(key in dataTwo)) {
      return acc.concat([['removed', key, dataOneKey]]);
    }
    if (!(key in dataOne) && key in dataTwo) {
      return acc.concat([['added', key, dataTwoKey]]);
    }
    if (dataOne[key] !== dataTwo[key]) {
      return acc.concat([['updated', key, dataOneKey, dataTwoKey]]);
    }
    return acc.concat([['unchanged', key, dataOneKey]]);
  };
  return uniqKeysJsonData.reduce(calculateDiff, []);
};

export default getDiff;
