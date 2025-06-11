import { parseEntityDefs } from '@dungeonmans-mod-tools/entitydef-compiler';
import { FileSystem } from '../utils/filesystem.js';
import { Logger } from '../utils/logger.js';
type Options = {
  verbose?: boolean;
};

export class ParseExecutor {
  private fs: FileSystem;

  constructor(
    private readonly srcFilepath: string,
    private readonly outFilepath: string,
    options: Options = {}
  ) {
    this.fs = new FileSystem({
      verbose: options.verbose,
    });
  }

  async run() {
    if (!this.fs.exists(this.srcFilepath)) {
      this.logErrorFileNotFound();
      return;
    }
    const file = await this.fs.readFile(this.srcFilepath);

    const entityLocs = parseEntityDefs(file, this.srcFilepath);
    const entities = new Map(
      entityLocs.values().map((loc) => [loc.name, loc.entity])
    );

    this.fs.writeFile(
      this.outFilepath,
      JSON.stringify(Object.fromEntries(entities), null, 2)
    );
    Logger.log(
      `Written ${entities.size} parsed entities to ${this.outFilepath}.`
    );
  }

  private logErrorFileNotFound() {
    Logger.error(
      `ERROR: File ${this.srcFilepath} not found. Did you provide the correct path?`
    );
  }
}
