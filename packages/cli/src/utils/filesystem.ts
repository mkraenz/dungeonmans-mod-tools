import fs, { Dirent } from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
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

  async writeFile(destPath: string, body: string) {
    if (this.verbose) Logger.log('WRITE FILE:', destPath);
    if (!this.dryRun) await fsp.writeFile(destPath, body);
  }

  async appendToFile(destPath: string, body: string) {
    if (this.verbose) Logger.log('APPEND FILE:', destPath);
    if (!this.dryRun) await fsp.appendFile(destPath, body);
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

  async readJsonFile(filepath: string) {
    if (this.verbose) Logger.log('READ FILE:', filepath);
    const contents = await fsp.readFile(filepath, 'utf-8');
    return JSON.parse(contents);
  }

  async lsDirRecursive(
    dirPath: string,
    predicate: (dirent: Dirent) => boolean = () => true,
    maxDepth = 10
  ) {
    if (maxDepth <= 0) {
      Logger.warn(
        `Max depth of 10 reached while listing directory: ${dirPath}`
      );
      return [];
    }
    if (this.verbose) Logger.log('LIST DIR RECURSIVE:', dirPath);
    const dir = await fsp.opendir(dirPath);
    const files: Dirent[] = [];
    for await (const dirent of dir) {
      if (dirent.isDirectory()) {
        const entries = await this.lsDirRecursive(
          path.join(dirPath, dirent.name),
          predicate,
          maxDepth - 1
        );
        files.push(...entries);
      } else {
        if (predicate(dirent)) files.push(dirent);
      }
    }
    return files;
  }

  exists = fs.existsSync;
}

export const isFile = (dirent: fs.Dirent, extname: string) =>
  dirent.isFile() && path.extname(dirent.name) === extname;
