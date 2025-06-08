import { Command } from '@commander-js/extra-typings';
import { ExplorerExecutor } from './explorer.executor.js';

export const createExplorerCommand = () => {
  return new Command()
    .command('explorer')
    .alias('explore')
    .description(
      'Puts explorer.html file in the current directory prerendering your monsters.'
    )
    .argument(
      '<srcDir>',
      'Source directory containing your mod, that is, the directory your modinfo.txt lives.'
    )
    .option('--verbose', 'Print additional info.')
    .option('--debug', 'Print addditional debug info. Implies --verbose.')
    .action(async (srcDir, options) => {
      const validator = new ExplorerExecutor(srcDir, options);
      await validator.run();
    });
};
