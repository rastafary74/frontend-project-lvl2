#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '@hexlet/code';

const program = new Command();
program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filepath1>', 'path to file 1')
  .argument('<filepath2>', 'path to file 2')
  .option('-s, --style <type>', 'output format', 'stylish')
  .usage('[options] <filepath1> <filepath2>')
  .action((filepath1, filepath2, option) => {
    console.log(genDiff(filepath1, filepath2, option.style));
  });

program
  .option('-f, --format <type>', 'output format');

program.parse();
