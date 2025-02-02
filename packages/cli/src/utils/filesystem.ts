import fs from 'node:fs';
import fsp from 'node:fs/promises';
import { Logger } from './logger.js';

type Options = {
  dryRun?: boolean;
  verbose?: boolean;
};

export class FileSystem {
  constructor(private readonly options: Options) {}

  get dryRun() {
    return this.options.dryRun;
  }
  get verbose() {
    return this.options.verbose;
  }

  async writeFile(destPath: string, entityDef: string) {
    if (this.verbose) Logger.log('WRITE FILE:', destPath);
    if (!this.dryRun) await fsp.writeFile(destPath, entityDef);
  }

  async makeDir(dir: string) {
    if (this.verbose) Logger.log('CREATE DIR (recursive):', dir);
    if (!this.dryRun) await fsp.mkdir(dir, { recursive: true });
  }

  async copyFile(srcPath: string, destPath: string) {
    if (this.verbose) Logger.log('WRITE FILE:', destPath);
    if (!this.dryRun) await fsp.copyFile(srcPath, destPath);
  }

  async readFile(filepath: string) {
    if (this.verbose) Logger.log('READ FILE:', filepath);
    return fsp.readFile(filepath, 'utf-8');
  }

  exists = fs.existsSync;
}
