import fs, { Dirent } from 'node:fs';
import path from 'node:path';
import { FileSystem, isFile } from '../utils/filesystem.js';
import { ModContentDirType } from '../utils/mod-content-dirs.js';
import { EntityName, Filepath } from '../utils/types.js';
import { EntityRegistry } from './entity.registry.js';
import { RefRegistry } from './ref.registry.js';

// theoretically we could pull out EntityScanner from this, and RefScanner working on entityScanner.entities. To do so however, we would need to keep track even of all entities - even those with duplicate name - which we currently ignore because it requires a more complex Map key.

/**
 * Traverses the given src dir and sub dirs for json files,
 * then scans those files gathering entities,
 * and finally gathers references within those entities.
 *
 * Important: If there are duplicate entity names, only the first entity is being respected in the entityRegistry.
 */
export class RefScanner {
  readonly duplicateEntities: Map<EntityName, Set<Filepath>> = new Map();

  #errors: { type: 'PARSE_OR_PROCESS_JSON_FAILED'; filepath: Filepath }[] = [];

  constructor(
    private readonly srcDir: string,
    private readonly fs: FileSystem,
    readonly entityRegistry: EntityRegistry,
    readonly refRegistry: RefRegistry
  ) {}

  get errors() {
    return this.#errors;
  }

  scanDirectoryStructure() {
    return this.scanForRefs();
  }

  private async scanForRefs() {
    const dir = await fs.promises.opendir(this.srcDir);
    await this.traverseDir(dir, async (dirent, direntpath) => {
      if (isFile(dirent, '.json')) {
        // HACK: this is pretty unclean
        const dirType = direntpath.split(path.sep).at(-2) as ModContentDirType;
        await this.scanFileForRefs(direntpath, dirType);
      }
    });
  }

  private async traverseDir(
    dir: fs.Dir,
    callbackFn: (dirent: Dirent, direntpath: string) => Promise<void>
  ) {
    for await (const dirent of dir) {
      if (!dirent.isDirectory()) continue;
      const subdir = await fs.promises.opendir(
        path.join(dirent.parentPath, dirent.name)
      );
      for await (const subdirent of subdir) {
        await callbackFn(
          subdirent,
          path.join(this.srcDir, dirent.name, subdirent.name)
        );
      }
    }
  }

  /** Assumption: Every root-level key in the file is the name of an entity. */
  private async scanFileForRefs(filepath: string, dirType: ModContentDirType) {
    try {
      const json = await this.fs.readJsonFile(filepath);

      const entities = Object.entries(json)
        .filter(([key, _]) => key !== '$schema')
        .map(([key, entity]) => ({
          name: key,
          // TODO #12 this is insecure. We should validate that entity is an json
          entity: entity as Record<string, unknown>,
        }));
      entities.forEach(({ name, entity }) => {
        if (this.entityRegistry.has(name)) {
          const filepaths = this.duplicateEntities.get(name) ?? new Set();
          filepaths.add(filepath);
          const entity = this.entityRegistry.get(name);
          if (!entity) throw Error('make ts happy');
          filepaths.add(entity.filepath);
          this.duplicateEntities.set(name, filepaths);
          return;
        }
        this.entityRegistry.set(name, {
          filepath,
          entity,
          name,
          dirType,
        });
      });
      this.refRegistry.setFromEntities(filepath, entities);
    } catch (error) {
      this.#errors.push({ type: 'PARSE_OR_PROCESS_JSON_FAILED', filepath });
    }
  }
}
