import path from 'node:path';
import { SchemaGenerator } from 'src/schemas/schemas.executor.js';
import { FileSystem } from '../utils/filesystem.js';
import { Logger } from '../utils/logger.js';
import { modContentDirs } from '../utils/mod-content-dirs.js';
import {
  gitignoreTemplate,
  modinfoTemplate,
  readmeTemplate,
} from './templates/index.js';

const readmeFilename = 'README.md';
const modinfoFilename = 'modinfo.txt';
const gitignoreFilename = '.gitignore';

type Options = {
  dryRun?: boolean;
  verbose?: boolean;
};

type Paths = {
  modRootDir: string;
  srcDir: string;
  modinfoFilepath: string;
  readmeFilepath: string;
};

export class ModProjectInitializer {
  private options: Options;
  private fs: FileSystem;

  constructor(
    private readonly modRootDir: string,
    private readonly modName: string,
    options: Options = {}
  ) {
    this.options = options;
    this.fs = new FileSystem({
      dryRun: options.dryRun,
      verbose: options.verbose || options.dryRun,
    });
  }

  async run() {
    Logger.log('🔨 Initializing your Dungeonmans mod project...');

    const srcDir = path.join(this.modRootDir, 'src');
    const modinfoFilepath = path.join(srcDir, modinfoFilename);
    const readmeFilepath = path.join(this.modRootDir, readmeFilename);
    const gitignoreFilepath = path.join(this.modRootDir, gitignoreFilename);

    if (this.fs.exists(this.modRootDir)) {
      this.logErrorNonEmptyRootDir(this.modRootDir);
      return;
    }

    await this.fs.makeDir(srcDir);

    const mkdirPromises = modContentDirs.map((dir) =>
      this.fs.makeDir(path.join(srcDir, dir))
    );
    await Promise.all(mkdirPromises);
    await this.fs.writeFile(modinfoFilepath, modinfoTemplate(this.modName));
    await this.fs.writeFile(readmeFilepath, readmeTemplate(this.modName));
    await this.fs.writeFile(gitignoreFilepath, gitignoreTemplate());

    await new SchemaGenerator({
      ...this.options,
      editor: 'vscode',
      modDir: this.modRootDir,
    }).run();

    logNextSteps({
      modRootDir: this.modRootDir,
      srcDir,
      modinfoFilepath,
      readmeFilepath,
    });
    if (this.options.dryRun) Logger.warnDryRun();
  }

  private logErrorNonEmptyRootDir(dir: string) {
    Logger.error(
      `ERROR: Directory ${dir} already exists. Aborting. Please provide a non-existent directory name to initialize your mod.`
    );
  }
}

const logNextSteps = ({
  modRootDir,
  readmeFilepath,
  modinfoFilepath,
}: Paths) => {
  Logger.success(`✨ Your brand new mod directory has been created. Happy modding. ✨ 
🔗 ./${modRootDir} 

👣 Next steps:
  - 📚 Learn more about your mod project -> 🔗 ./${readmeFilepath}
  - 🔧 Name and describe your mod -> 🔗 ./${modinfoFilepath}
  - 🔨 Create entity defs as JSON or txt in the sub-directories
  - 📦 Build & package your mod for usage in Dungeonmans
  - 🎮 Play you mod
`);
};
