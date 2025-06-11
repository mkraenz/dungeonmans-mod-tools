import { Command } from '@commander-js/extra-typings';
import { ParseExecutor } from './parse.executor.js';

export const createParseCommand = () => {
  return new Command()
    .command('parse-entity-defs')
    .description(
      'Parse entity defs like those built into Dungeonmans into JSON and write result to file.'
    )
    .argument('<srcFilepath>', 'Filepath to the entity definitions file.')
    .argument(
      '<outFilepath>',
      'Filepath to the ouput JSON, including filename and extension.'
    )
    .option('--verbose', 'Print additional info.')
    .action(async (srcFilepath, outFilepath, options) => {
      const executor = new ParseExecutor(srcFilepath, outFilepath, options);
      await executor.run();
    });
};
