import {
  normalize,
  resolve,
} from 'path';

import {
  readFileSync,
} from 'fs';

import yaml from 'js-yaml';

export const getFileContent = (path) => {
  let filePath = normalize(path);
  let data;
  if (filePath.startsWith('/') === false) {
    filePath = resolve(filePath);
  }
  try {
    data = readFileSync(filePath);
  } catch (err) {
    throw new Error('File not found');
  }
  return data;
};

export const parseJson = (filePath) => {
  const fileContent = getFileContent(filePath);
  return JSON.parse(fileContent);
};

export const parseYaml = (filePath) => {
  const fileContent = getFileContent(filePath);
  return yaml.load(fileContent);
};
