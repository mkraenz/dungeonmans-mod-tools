import { FileSystem } from '../utils/filesystem.js';
import { Logger } from '../utils/logger.js';
import { EntityRegistry } from './entity.registry.js';
import { RefRegistry } from './ref.registry.js';
import { RefScanner } from './ref.scanner.js';
import { RefValidator } from './ref.validator.js';
import { IRefReporter } from './types.js';

type Options = {
  verbose?: boolean;
};

/**
 * Command line script that receives a directory for scanning and an output directory
 * Scans the given directory including subdirectories for files.
 * From all JSON files, it scans for property keys or string values that contain `@ref(..)` (potentially multiple in the same string).
 * All references are put into a collection for later analysis.
 */
export class ReferencesValidator {
  constructor(
    private readonly srcDir: string,
    private readonly reporter: IRefReporter,
    private readonly options: Options
  ) {}

  async run() {
    Logger.log('🔨 Validating refs...');

    const refs = new RefScanner(
      this.srcDir,
      new FileSystem({ verbose: this.options.verbose }),
      new EntityRegistry(),
      new RefRegistry()
    );
    await refs.scanDirectoryStructure();

    const [foundRefs, missingRefs] = new RefValidator(
      refs.entityRegistry,
      refs.refRegistry
    ).refs;

    this.reporter.report({
      foundRefs,
      missingRefs,
      duplicateEntities: refs.duplicateEntities,
      errors: refs.errors,
    });
  }
}
