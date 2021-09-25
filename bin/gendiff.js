#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import diffSearcher from '../src/diffsearcher.js';

const program = new Command();
const printer = (file1, file2) => {
  console.log(diffSearcher(file1, file2));
};

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action(printer);

program.parse();

if (!program.args.length) program.help();
