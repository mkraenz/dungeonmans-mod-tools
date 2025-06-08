import { RefTransformer } from '@dungeonmans-mod-tools/js-to-entitydef';
import { cloneDeep } from 'lodash-es';
import { FileSystem } from '../utils/filesystem.js';
import { Logger } from '../utils/logger.js';
import { EntityRegistry } from '../validate-refs/entity.registry.js';
import { RefRegistry } from '../validate-refs/ref.registry.js';
import { RefScanner } from '../validate-refs/ref.scanner.js';
import { EntityExplorerHtmlRenderer } from './explorer.html.renderer.js';

type Options = {
  verbose?: boolean;
};

// TODO WIP
export class ExplorerExecutor {
  private readonly fs: FileSystem;

  constructor(
    private readonly srcDir: string,
    private readonly options: Options
  ) {
    this.fs = new FileSystem({ verbose: this.options.verbose });
  }

  async run() {
    Logger.log(
      '🔨 Creating explorer.html. EXPERIMENTAL. EXPECT THIS COMMAND TO NOT WORK...'
    );

    const refs = new RefScanner(
      this.srcDir,
      this.fs,
      new EntityRegistry(),
      new RefRegistry()
    );
    await refs.scanDirectoryStructure();

    // ###################    Idea: Entity Explorer ########################

    // Get an initial entity E from the registry.
    // For each `@ref()` in the entity, get the referenced entity, example E.sprite, and sprite S
    // Set E.sprite = S
    //     Then repeat for S

    // Problems:

    // - Cyclic dependencies? Probably not an issue. I can't imagine DMans supports that.
    const monsters = refs.entityRegistry.filter({ class: 'dmMonster' });

    const explorerView = monsters
      .entries()
      .map(([key, originalMonsterLoc]) => {
        const monsterLoc = cloneDeep(originalMonsterLoc);
        Object.entries(monsterLoc.entity as Record<string, any>).forEach(
          ([key, value]) => {
            if (
              typeof value === 'string' &&
              new RefTransformer(value).containedRefs.length > 0
            ) {
              const containedRefs = new RefTransformer(value).containedRefs;
              (monsterLoc.entity as Record<string, any>)[key] =
                containedRefs.map((r) => refs.entityRegistry.get(r));
            }
          }
        );
        return monsterLoc;
      })
      .toArray();
    const fs = new FileSystem({ verbose: this.options.verbose });
    const html = new EntityExplorerHtmlRenderer(
      this.srcDir,
      explorerView
    ).toHtml();
    await fs.writeFile('explorer.html', html);

    Logger.success('Written ./explorer.html');
  }
}
