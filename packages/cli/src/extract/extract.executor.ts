import fs from 'node:fs';
import path from 'node:path';
import { FileSystem } from '../utils/filesystem.js';
import { Logger } from '../utils/logger.js';

type Options = {
  verbose?: boolean;
};

export class ExtractValuesFromEntityDefinitionsFileExecutor {
  private fs: FileSystem;

  constructor(
    private readonly directory: string,
    private readonly propertyKey: string,
    options: Options = {}
  ) {
    this.fs = new FileSystem({
      verbose: options.verbose,
    });
  }

  async run() {
    if (!this.fs.exists(this.directory)) {
      this.logErrorDirectoryNotFound();
      return;
    }

    const values = new Set<string>();

    const dir = await fs.promises.opendir(this.directory);
    for await (const dirent of dir) {
      if (dirent.isFile()) {
        const filepath = path.join(this.directory, dirent.name);
        const file = await this.fs.readFile(filepath);
        const lines = file.split('\n');
        for (const line of lines) {
          if (line.trim().startsWith(this.propertyKey)) {
            const [_key, ...rest] = line.trim().split(/(\s+)/); // splitting on any whitespace character bc often its tab separated, but sometimes it's space separated
            const value = rest.join(' ').trim();
            values.add(value);
          }
        }
      }
    }

    const result = [...values].toSorted().join('\n');
    Logger.log(result);
  }

  private logErrorDirectoryNotFound() {
    Logger.error(
      `ERROR: Directory ${this.directory} not found. Did you provide the correct path?`
    );
  }
}
