import { ModContentDirType } from '../utils/mod-content-dirs.js';
import { EntityName, Filepath } from '../utils/types.js';

export type EntityLocation = {
  filepath: Filepath;
  dirType: ModContentDirType;
  entity: Record<string, unknown>;
  name: EntityName;
};

export class EntityRegistry {
  private registry: Map<EntityName, EntityLocation> = new Map();

  has(name: string) {
    return this.registry.has(name);
  }

  set(name: string, loc: EntityLocation) {
    this.registry.set(name, loc);
  }

  get(name: string) {
    return this.registry.get(name);
  }

  toString() {
    return JSON.stringify([...this.registry]);
  }

  /**
   * @param predicate a one-level deep object to filter by,
   * for example setting predicate to `{class: "dmMonster"}` will return
   * the EntityLocation of all entities that have `class === "dmMonster"`.
   * Any non-matching entity including those with `class === undefined` will
   * be excluded from the result.
   */
  queryOnEntity(
    predicate: Record<string, boolean | string | number | null | undefined>
  ): Map<EntityName, EntityLocation> {
    const entityLocs = this.registry.entries().filter(([_, loc]) => {
      return Object.entries(predicate).every(
        ([key, value]) =>
          (loc.entity as Record<PropertyKey, unknown>)?.[key] === value
      );
    });
    return new Map(entityLocs);
  }

  queryOnLoc(
    predicate: Partial<EntityLocation>
  ): Map<EntityName, EntityLocation> {
    const entityLocs = this.registry.entries().filter(([_, loc]) => {
      return Object.entries(predicate).every(
        ([key, value]) => loc[key as keyof EntityLocation] === value
      );
    });
    return new Map(entityLocs);
  }
}
