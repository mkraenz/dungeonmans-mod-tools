import { FC, useState } from 'react';
import styles from './actors.module.css';
import {
  DmActors,
  DmMonster,
  DmMonsterSprite,
  DmSprites,
} from '@dungeonmans-mod-tools/schemas';
import { attempt, isError } from 'lodash-es';

const DMANS_TEXTURE_DIR = 'textures';

type Props = {};
type PortraitProps = {
  actor: DmMonster;
  sprite: DmMonsterSprite;
  actorId: string;
  spriteId: string;
  textures: TextureRegistry;
};

const dereference = (raw: string) => {
  // TODO not perfect but good enough for now.
  return raw.replace('@ref(', '').replace(')', '');
};
const Portrait: FC<PortraitProps> = ({ actor, sprite, textures }) => {
  const dataUrl = textures[sprite.texturename]?.dataUrl;
  return (
    <article>
      <p>{actor.name}</p>
      <p>{sprite.texturename}</p>
      <div
        className={styles.actorPortrait}
        style={{
          backgroundImage: `url('${dataUrl}')`,
          backgroundSize: 'cover',
          // background position is negative because it basically just moves the top-left corner. The overlap with the container div is then what is visible.
          // TODO verify whether y needs to be negative or not.
          backgroundPosition: `${-sprite.xloc}px ${-sprite.yloc}px`,
          width: `${sprite.width}px`,
          height: `${sprite.height}px`,
        }}
      />
    </article>
  );
};

type DmEntityDef = Record<string, string | number | boolean>;
type DmEntityDefs = { [id: string]: DmEntityDef };
type TextureRegistry = Record<string, { name: string; dataUrl: string }>;

const toDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

const Actors: FC<Props> = () => {
  const [data, setData] = useState<{
    actors: [string, DmMonster][];
    textures: TextureRegistry;
    sprites: DmSprites;
  }>({
    actors: [],
    textures: {},
    sprites: {},
  });
  const handleClick = async () => {
    if (
      !('showDirectoryPicker' in window) ||
      typeof window.showDirectoryPicker !== 'function'
    ) {
      return alert(
        'Your browser does not support the File System Access API. Please use a compatible browser like Chrome, Chromium, or Edge.'
      );
    }
    type DirName = string;
    type File = {
      name: string;
      contents: DmEntityDefs;
    };
    const textureRegistry: TextureRegistry = {};
    const files: Record<DirName, File[]> = {};
    const dirHandle = await window.showDirectoryPicker();
    for await (const entry of dirHandle.values()) {
      const dirName = entry.name.toLowerCase();
      console.log(entry.kind, dirName);
      if (entry.kind === 'directory') {
        for await (const subDirEntry of entry.values()) {
          console.log('Sub-entry:', subDirEntry.kind, subDirEntry.name);
          if (subDirEntry.kind === 'file') {
            const file = await subDirEntry.getFile();
            const isTextFile = file.type === 'text/plain';
            const isJsonFile = file.type === 'application/json';
            const isPngFile = file.type === 'image/png';
            console.log(file.type);
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
                console.log('File contents:', contents);
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

    const spriteRegistry = (files['spritedata'] ?? []).reduce<DmSprites>(
      (acc, file) => {
        return {
          ...acc,
          ...(file.contents as any),
        };
      },
      {}
    );

    setData({
      actors: monsterRegistry,
      textures: textureRegistry,
      sprites: spriteRegistry,
    });
  };
  return (
    <div className={styles.encounter}>
      <h1>Actors</h1>
      <button onClick={handleClick}>Open folder</button>
      <div className={styles.actorList}>
        {data.actors.map(([actorId, actor]) => {
          if (!actor.sprite) {
            return (
              <p key={actorId}>
                No sprite for actor id="{actorId}" name="{actor.name}"
              </p>
            );
          }
          const spriteId = dereference(actor.sprite);
          const sprite = data.sprites[spriteId] as DmMonsterSprite;
          return (
            <Portrait
              actor={actor}
              sprite={sprite}
              spriteId={spriteId}
              actorId={actorId}
              key={actorId}
              textures={data.textures}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Actors;
