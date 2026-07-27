import { Command } from '@commander-js/extra-typings';
import { ParseAllExecutor } from './parse-all.executor.js';

export const createParseAllCommand = () => {
  return new Command()
    .command('parse-entity-defs-all')
    .description(
      'Parse ALL entity defs in the given Dungeonmans install directory into JSON and write result to file.'
    )
    .argument('<srcDir>', 'Path to the Dungeonmans Content directory.')
    .argument(
      '<outFilepath>',
      'Filepath to the ouput JSON, including filename and extension.'
    )
    .option('--verbose', 'Print additional info.')
    .action(async (srcDir, outFilepath, options) => {
      const executor = new ParseAllExecutor(srcDir, outFilepath, options);
      await executor.run();
    });
};
