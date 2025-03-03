#!/usr/bin/env node

import { Command } from '@commander-js/extra-typings';
import packagejson from '../package.json' assert { type: 'json' };
import { createBuildCommand } from './build/build.command.js';
import { createInitCommand } from './init/init.command.js';
import { createSchemasCommand } from './schemas/schemas.command.js';
import { createValidateRefCommand } from './validate-refs/validate-refs.command.js';

const program = new Command();

program
  .name('@dungeonmans-mod-tools/cli')
  .description('CLI to help you develop mod content for Dungeonmans.')
  .version(packagejson.version);
program
  .addCommand(createInitCommand())
  .addCommand(createBuildCommand())
  .addCommand(createSchemasCommand())
  // .addCommand(createExtractCommand())
  .addCommand(createValidateRefCommand());

program.parse();
