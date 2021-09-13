#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import diffsearcher from './src/diffsearcher.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action(diffsearcher);

program.parse();

if (!program.args.length) program.help();
