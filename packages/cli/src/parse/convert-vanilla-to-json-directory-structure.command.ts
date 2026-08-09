import { Command } from '@commander-js/extra-typings';
import { ConvertVanillaToJsonDirectoryStructureExecutor } from './convert-vanilla-to-json-directory-structure.executor.js';

export const convertVanillaToJsonDirectoryStructureCommand = () => {
  return new Command()
    .command('convert-vanilla-to-json-directory-structure')
    .description(
      'Converts a native Dungoenmans directory structure with txt file entity defs into JSON files.'
    )
    .argument('<srcDir>', 'Path to the Dungeonmans Content directory.')
    .argument(
      '<outDirPath>',
      'Path to directory the converted results are put into.'
    )
    .option('--verbose', 'Print additional info.')
    .option(
      '--dry-run',
      'Simulate the execution of the command without actually changing anything.'
    )
    .action(async (srcDir, outDirPath, options) => {
      const executor = new ConvertVanillaToJsonDirectoryStructureExecutor(
        srcDir,
        outDirPath,
        options
      );
      await executor.run();
    });
};
