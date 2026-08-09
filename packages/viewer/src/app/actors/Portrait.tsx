import { FC, useState } from 'react';
import styles from './portrait.module.css';
import { DmMonster, DmMonsterSprite } from '@dungeonmans-mod-tools/schemas';
import { useAppStore } from '../useAppStore.hook';

type TextureRegistry = Record<string, { name: string; dataUrl: string }>;

type PortraitProps = {
  actor: DmMonster;
  sprite: DmMonsterSprite;
  actorId: string;
  spriteId: string;
  textures: TextureRegistry;
};

const Portrait: FC<PortraitProps> = ({ actor, sprite, textures }) => {
  const store = useAppStore();
  const dataUrl = textures[sprite.texturename]?.dataUrl;
  const handleClick = () => {
    store.setSelected({ actor, sprite });
    store.toggleSidebar();
  };
  const selected = store.selected?.actor === actor;
  return (
    <article
      className={styles.card}
      onClick={handleClick}
      data-selected={selected}
    >
      <p>{actor.name}</p>
      {/* <p>{sprite.texturename}</p> */}
      <div
        className={styles.actorPortrait}
        style={{
          backgroundImage: `url('${dataUrl}')`,
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

export default Portrait;
