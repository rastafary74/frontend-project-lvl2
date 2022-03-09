const getValue = (value) => {
  if (Array.isArray(value) === true) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const getPlain = (array, acc = []) => {
  if (Array.isArray(array) === false) {
    return array;
  }
  const iter = (arr, accIter) => {
    const [state, key, oldVal, newVal] = arr;
    const path = accIter.concat(key);
    const pathStr = path.join('.');
    const printOldVal = getValue(oldVal);
    const printNewVal = getValue(newVal);
    if (state === 'complex') {
      return getPlain(oldVal, path);
    }
    if (state === 'added') {
      return [`Property '${pathStr}' was added with value: ${printOldVal}`];
    }
    if (state === 'removed') {
      return [`Property '${pathStr}' was removed`];
    }
    if (state === 'updated') {
      return [`Property '${pathStr}' was updated. From ${printOldVal} to ${printNewVal}`];
    }
    return [];
  };
  return array.map((arr) => iter(arr, acc))
    .filter((item) => item.length !== 0)
    .join('\n');
};

export default getPlain;
