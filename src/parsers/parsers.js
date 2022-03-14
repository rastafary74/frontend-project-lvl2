import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

export default (format, data) => {
  if (!(format in parsers)) {
    throw new Error('Format don\'t support');
  }
  return parsers[format](data);
};
