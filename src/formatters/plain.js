const getValue = (value) => {
  if (Array.isArray(value) === true) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const getString = (state, property, oldVal, newVal) => {
  switch (state) {
    case 'added':
      return [`Property '${property}' was added with value: ${oldVal}`];
    case 'removed':
      return [`Property '${property}' was removed`];
    case 'updated':
      return [`Property '${property}' was updated. From ${oldVal} to ${newVal}`];
    default:
      return [];
  }
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
    return getString(state, pathStr, printOldVal, printNewVal);
  };
  return array.map((arr) => iter(arr, acc))
    .filter((item) => item.length !== 0)
    .join('\n');
};

export default getPlain;
