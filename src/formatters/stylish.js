const makeIndent = (depth = 0, marker = '') => {
  const markerSymbol = 2;
  const spaceCount = 4;
  const replacer = ' ';
  const depthIndent = depth * spaceCount;
  const indentSize = marker === '' ? depthIndent : depthIndent - markerSymbol;
  return replacer.repeat(indentSize).concat(marker);
};

const printValue = (value, depth = 0, localDepth = 0) => {
  if (Array.isArray(value) === false) {
    return String(value);
  }
  const replacerStringSimple = makeIndent(depth);
  const replacerStringComplex = makeIndent(localDepth);
  const [key, oldValue] = value;
  if (Array.isArray(key) === false) {
    return `${replacerStringSimple}${key}: ${printValue(oldValue, depth)}`;
  }
  const valueStr = value.flatMap((item) => printValue(item, depth + 1, localDepth + 1)).join('\n');
  return `{\n${replacerStringComplex}${valueStr}\n${replacerStringSimple}}`;
};

const getString = (state, key, oldValue, depth, newValue = null) => {
  const strokeNewValue = `${key}: ${printValue(newValue, depth)}`;
  const strokeOldValue = `${key}: ${printValue(oldValue, depth)}`;
  switch (state) {
    case 'added':
      return `${makeIndent(depth, '+ ')}${strokeOldValue}`;
    case 'removed':
      return `${makeIndent(depth, '- ')}${strokeOldValue}`;
    case 'unchanged':
      return `${makeIndent(depth, '  ')}${strokeOldValue}`;
    case 'updated':
      return `${makeIndent(depth, '- ')}${strokeOldValue}\n`
           + `${makeIndent(depth, '+ ')}${strokeNewValue}`;
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
    if (state !== 'complex') {
      return `${getString(state, key, oldValue, depth, newValue)}`;
    }
    const valueStr = oldValue.map((item) => iter(item, depth + 1)).join('\n');
    return `${startString}${getString(state, key, valueStr, depth)}${bracketIndent}}`;
  };
  const result = array.map((item) => iter(item, 1)).join('\n');
  return `{\n${result}\n}`;
};

export default stylish;
