import {
  EntityLocation,
  parseEntityDefs,
} from '@dungeonmans-mod-tools/entitydef-compiler';
import { join } from 'path';
import { FileSystem } from '../utils/filesystem.js';
import { Logger } from '../utils/logger.js';

type Options = {
  verbose?: boolean;
};

type EntityLoc = EntityLocation;

export class ParseAllExecutor {
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

    const allFilesAndDirsRecursive = await this.fs.lsDirRecursive(
      this.srcFilepath,
      // TODO how to handle .json files?
      (x) => x.name.endsWith('.txt')
    );
    const files = allFilesAndDirsRecursive.filter((x) => x.isFile());

    const entitiesPromise = await Promise.all(
      files.map(async (file) =>
        this.processFile(join(file.parentPath, file.name))
      )
    );
    const allEntities = entitiesPromise.reduce<EntityLoc[]>(
      (acc, next) => [...acc, ...next.toArray()],
      []
    );
    const entities = new Map<string, EntityLoc['entity']>(
      allEntities.map((loc) => [loc.name, loc])
    );

    this.fs.writeFile(
      this.outFilepath,
      JSON.stringify(Object.fromEntries(entities), null, 2)
    );
    Logger.log(
      `Written ${entities.size} parsed entities to ${this.outFilepath}.`
    );
  }

  private async processFile(filepath: string) {
    const file = await this.fs.readFile(filepath);
    const entityLocs = parseEntityDefs(file, filepath);
    return entityLocs.values();
  }

  private logErrorFileNotFound() {
    Logger.error(
      `ERROR: File ${this.srcFilepath} not found. Did you provide the correct path?`
    );
  }
}
