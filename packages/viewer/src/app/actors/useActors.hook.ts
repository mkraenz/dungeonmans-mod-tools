import { useState } from 'react';
import { DmActors, DmMonster, DmSprites } from '@dungeonmans-mod-tools/schemas';
import { attempt, isError } from 'lodash-es';

type DmEntityDef = Record<string, string | number | boolean>;
type DmEntityDefs = { [id: string]: DmEntityDef };
type TextureRegistry = Record<string, { name: string; dataUrl: string }>;

const DMANS_TEXTURE_DIR = 'textures';

type EntityDefData = {
  actors: [string, DmMonster][];
  textures: TextureRegistry;
  sprites: DmSprites;
};
type DirName = string;
type LoadedFile = {
  name: string;
  contents: DmEntityDefs;
};

export const useActors = () => {
  const [data, setData] = useState<EntityDefData>({
    actors: [],
    textures: {},
    sprites: {},
  });
  const [loading, setLoading] = useState(false);
  const toDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const loadFromDirectory = async () => {
    if (
      !('showDirectoryPicker' in window) ||
      typeof window.showDirectoryPicker !== 'function'
    ) {
      return alert(
        'Your browser does not support the File System Access API. Please use a compatible browser like Chrome, Chromium, or Edge.'
      );
    }
    const textureRegistry: TextureRegistry = {};
    const files: Record<DirName, LoadedFile[]> = {};
    const dirHandle = await window.showDirectoryPicker();
    setLoading(true);
    for await (const entry of dirHandle.values()) {
      const dirName = entry.name.toLowerCase();
      // console.log(entry.kind, dirName);
      if (entry.kind === 'directory') {
        for await (const subDirEntry of entry.values()) {
          console.log('Sub-entry:', subDirEntry.kind, subDirEntry.name);
          if (subDirEntry.kind === 'file') {
            const file = await subDirEntry.getFile();
            // console.log(file.type);
            switch (file.type) {
              case 'application/json': {
                const contents = await file.text();
                const parsed = attempt<DmEntityDefs>(JSON.parse, contents);
                if (isError(parsed)) {
                  console.error(
                    `Error parsing JSON from file "${subDirEntry.name}":`,
                    parsed
                  );
                  continue;
                }
                files[dirName] ??= [];
                files[dirName].push({
                  name: subDirEntry.name,
                  contents: parsed,
                });
                break;
              }
              case 'text/plain': {
                break;
              }
              case 'image/png': {
                // not great in terms of memory but i don't know how to grab the absolute URL on the file system...
                if (dirName !== DMANS_TEXTURE_DIR) {
                  console.log(
                    'Textures outside the textures/ directory will be ignored by Dungeonmans.'
                  );
                }
                const name = (subDirEntry.name as string).replace('.png', '');
                textureRegistry[name] = {
                  dataUrl: await toDataUrl(file),
                  name,
                };
                break;
              }
            }
          }
        }
      }
    }
    const actorRegistry = (files['actordata'] ?? []).flatMap((file) =>
      Object.entries(file.contents)
    ) as [string, DmActors[string]][];
    const monsterRegistry = actorRegistry.filter(
      ([_, actor]) => actor.class === 'dmMonster'
    ) as [string, DmMonster][];

    const spriteRegistry = (files['spritedata'] ?? []).reduce((acc, file) => {
      return {
        ...acc,
        ...(file.contents as DmSprites),
      };
    }, {} as DmSprites);

    setData({
      actors: monsterRegistry,
      textures: textureRegistry,
      sprites: spriteRegistry,
    });
    setLoading(false);
  };

  return {
    data,
    loadFromDirectory,
    loading,
  };
};
