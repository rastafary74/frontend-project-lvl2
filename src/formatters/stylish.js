const printValue = (value, replacer, spacesCount) => {
  if (Array.isArray(value) === false) {
    return String(value);
  }
  const iter = (node, depth) => {
    if (Array.isArray(node) === false) {
      return String(node);
    }
    const indentSize = depth * spacesCount;
    const countSymbol = 2;
    const startStringSimple = replacer.repeat(indentSize + countSymbol);
    const startStringComplex = replacer.repeat(indentSize + countSymbol);
    const bracketIndent = replacer.repeat(indentSize + spacesCount);
    const [key, oldValue] = node;
    if (Array.isArray(oldValue) === false) {
      return `${startStringSimple}  ${key}: ${oldValue}`;
    }
    const valueStr = oldValue.map((item) => iter(item, depth + 1)).join('\n');
    return `${startStringComplex}  ${key}: {\n${valueStr}\n${bracketIndent}}`;
  };
  const result = value.map((val) => iter(val, 1)).join('\n');
  const bracketIndentResult = replacer.repeat(spacesCount);
  return `{\n${result}\n${bracketIndentResult}}`;
};

const getString = (state, key, oldValue, startString, newValue = null) => {
  const strokeNewValue = `${key}: ${oldValue}`;
  const strokeOldValue = `${key}: ${newValue}`;
  switch (state) {
    case 'added':
      return `${startString}+ ${strokeNewValue}`;
    case 'removed':
      return `${startString}- ${strokeNewValue}`;
    case 'unchanged':
      return `${startString}  ${strokeNewValue}`;
    case 'updated':
      return `${startString}- ${strokeNewValue}\n`
           + `${startString}+ ${strokeOldValue}`;
    default:
      return `  ${key}: {\n${oldValue}\n`;
  }
};

const stylish = (array, replacer = ' ', spacesCount = 4) => {
  if (Array.isArray(array) === false) {
    return String(array);
  }
  const iter = (node, depth) => {
    const indentSize = depth * spacesCount;
    const countSymbol = 2;
    const startString = replacer.repeat(indentSize - countSymbol);
    const bracketIndent = replacer.repeat(indentSize);
    const [state, key, oldValue, newValue] = node;
    const oldValueStr = printValue(oldValue, replacer, indentSize);
    const newValueStr = printValue(newValue, replacer, indentSize);
    if (state !== 'complex') {
      return `${getString(state, key, oldValueStr, startString, newValueStr)}`;
    }
    const valueStr = oldValue.map((item) => iter(item, depth + 1)).join('\n');
    return `${startString}${getString(state, key, valueStr)}${bracketIndent}}`;
  };
  const result = array.map((item) => iter(item, 1)).join('\n');
  return `{\n${result}\n}`;
};

export default stylish;
