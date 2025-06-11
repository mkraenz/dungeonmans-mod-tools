import { Command } from '@commander-js/extra-typings';
import { ExtractValuesFromEntityDefinitionsFileExecutor } from './extract.executor.js';

export const createExtractCommand = () => {
  return new Command()
    .command('extract')
    .description(
      'Used to extract data from the original game files for schema generation. Uses a naive heuristic for extraction.'
    )
    .addHelpText(
      'after',
      `
    Extract the values of the given property key from the files in the given directory (only shallow/no subdirectories!) and prints them to the console. Uses a naive algorithm to extract the values that simply checks whether the first word in a line is the property key (after trimming whitespace).

    Example A:                @dungeonmans-mod-tools/cli extract USER/steam/steamapps/common/Dungeonmans/Content/ActorData/generic_monsters_01.txt basicattackparticle
    `
    )
    .argument(
      '<directory>',
      'Directory containing the entity definition files to scan (subdirectories are not scanned).'
    )
    .argument('<propertyKey>', 'Which property key to extract')
    .option('--verbose', 'Print additional info.')
    .action(async (directory, propertyKey, options) => {
      const executor = new ExtractValuesFromEntityDefinitionsFileExecutor(
        directory,
        propertyKey,
        options
      );
      await executor.run();
    });
};
