import { Command } from '@commander-js/extra-typings';
import { createExtractCommand } from '../extract/extract.command.js';
import { createParseCommand } from '../parse/parse.command.js';
import { createExplorerCommand } from './explorer.command.js';

export const createExperimentalParentCommand = () => {
  return new Command()
    .command('experimental')
    .description(
      'Experimental features: Expect things to not work when you use this. May change or be removed without warning. Use "cli experimental help" for more information.'
    )
    .addCommand(createExplorerCommand())
    .addCommand(createExtractCommand())
    .addCommand(createParseCommand());
};
