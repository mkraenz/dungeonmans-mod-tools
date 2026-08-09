import { FC } from 'react';
import styles from './portrait.module.css';
import { DmMonster, DmMonsterSprite } from '@dungeonmans-mod-tools/schemas';

type TextureRegistry = Record<string, { name: string; dataUrl: string }>;

type PortraitProps = {
  actor: DmMonster;
  sprite: DmMonsterSprite;
  actorId: string;
  spriteId: string;
  textures: TextureRegistry;
};

const Portrait: FC<PortraitProps> = ({ actor, sprite, textures }) => {
  const dataUrl = textures[sprite.texturename]?.dataUrl;
  return (
    <article className={styles.card}>
      <p>{actor.name}</p>
      <p>{sprite.texturename}</p>
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
