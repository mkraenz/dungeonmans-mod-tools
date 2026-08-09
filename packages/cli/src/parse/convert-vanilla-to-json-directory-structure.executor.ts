import { parseEntityDefs } from '@dungeonmans-mod-tools/entitydef-compiler';
import { join } from 'path';
import { FileSystem } from '../utils/filesystem.js';
import { Logger } from '../utils/logger.js';
import { groupBy, isNull } from 'lodash-es';

type Options = {
  dryRun?: boolean;
  verbose?: boolean;
};

export class ConvertVanillaToJsonDirectoryStructureExecutor {
  private fs: FileSystem;

  constructor(
    private readonly srcFilepath: string,
    private readonly outDirPath: string,
    private options: Options = {}
  ) {
    this.fs = new FileSystem({
      dryRun: options.dryRun,
      verbose: options.verbose || options.dryRun,
    });
  }

  private get dryRun() {
    return !!this.options.dryRun;
  }

  async run() {
    if (!this.fs.exists(this.srcFilepath)) {
      this.logErrorFileNotFound();
      return;
    }

    const allFilesAndDirsRecursive = await this.fs.lsDirRecursive(
      this.srcFilepath,
      // TODO how to handle .json files?
      // debugging hint: change .txt to scrobold.txt to only process actordata/scrobold.txt
      (x) => x.name.endsWith('.txt')
    );
    const files = allFilesAndDirsRecursive.filter((x) => x.isFile());

    const entitiesByFile = await Promise.all(
      files.map(async (file) => {
        const dataDirName = this.fs.basename(file.parentPath);
        const outDir = join(this.outDirPath, dataDirName);
        const outFilepath = join(outDir, file.name.replace('.txt', '.json'));
        return {
          srcDir: file.parentPath,
          outDir: outDir,
          srcFilename: file.name,
          outFilepath,
          entities: await this.processFile(join(file.parentPath, file.name)),
        };
      })
    );
    const entityFilesByOutdir = groupBy(entitiesByFile, (x) => x.outDir);
    await this.fs.makeDir(this.outDirPath);
    await this.fs.makeDirMany(Object.keys(entityFilesByOutdir));
    let filesWritten = 0;

    await Object.values(entityFilesByOutdir)
      .flatMap((entityFile) => entityFile)
      .forEach((entityFile) => {
        const entityDef = entityFile.entities.reduce(
          (acc, next) => ({ ...acc, [next.name]: next.entity }),
          {}
        );
        this.fs.writeFile(
          entityFile.outFilepath,
          JSON.stringify(entityDef, null, 2)
        );
        filesWritten++;
      });

    const outTextureDir = join(this.outDirPath, 'textures');
    this.fs.makeDir(outTextureDir);

    const xnbFilesInTexturesDir = await this.fs.lsDirRecursive(
      this.srcFilepath,
      (x) =>
        x.parentPath.toLocaleLowerCase().endsWith('textures') &&
        x.name.endsWith('.xnb')
    );
    const xnbFiles = xnbFilesInTexturesDir.filter((x) => x.isFile());
    await Promise.all(
      xnbFiles.map((f) =>
        this.fs.copyFile(
          join(f.parentPath, f.name),
          join(outTextureDir, f.name)
        )
      )
    );

    Logger.log(
      `Written ${filesWritten} files to ${this.outDirPath} and sub-directories.`
    );
    if (this.dryRun) Logger.warnDryRun();
  }

  private async processFile(filepath: string) {
    const file = await this.fs.readFile(filepath);
    const entityLocs = parseEntityDefs(file, filepath);
    const x = entityLocs.values().toArray();
    return x;
  }

  private logErrorFileNotFound() {
    Logger.error(
      `ERROR: File ${this.srcFilepath} not found. Did you provide the correct path?`
    );
  }
}
