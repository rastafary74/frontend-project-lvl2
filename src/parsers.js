import {
  normalize,
  resolve,
} from 'path';

import {
  readFileSync,
} from 'fs';

import yaml from 'js-yaml';

export const getFileContent = (path) => {
  const normalizePath = normalize(path);
  const filePath = normalizePath.startsWith('/') ? normalizePath : resolve(normalizePath);
  try {
    return readFileSync(filePath);
  } catch (err) {
    throw new Error('File not found');
  }
};

export const parseJson = (filePath) => {
  const fileContent = getFileContent(filePath);
  return JSON.parse(fileContent);
};

export const parseYaml = (filePath) => {
  const fileContent = getFileContent(filePath);
  return yaml.load(fileContent);
};
