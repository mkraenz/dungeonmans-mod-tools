import { FC } from 'react';
import styles from './actors.module.css';
import monsterSpriteData from '../example-data/spritedata/monsters';
import { allActors } from '../example-data/actordata';
import { DmMonster, DmMonsterSprite } from '@dungeonmans-mod-tools/schemas';

type Props = {};
type PortraitProps = {
  actor: DmMonster;
  sprite: DmMonsterSprite;
  actorId: string;
  spriteId: string;
};

const dereference = (raw: string) => {
  // TODO not perfect but good enough for now.
  return raw.replace('@ref(', '').replace(')', '');
};
const Portrait: FC<PortraitProps> = ({ actor, sprite }) => {
  const path = `/textures/${sprite.texturename}.png`;
  return (
    <>
      <p>{actor.name}</p>
      <div
        className={styles.actorPortrait}
        style={{
          backgroundImage: `url('${path}')`,
          backgroundSize: 'cover',
          // background position is negative because it basically just moves the top-left corner. The overlap with the container div is then what is visible.
          // TODO verify whether y needs to be negative or not.
          backgroundPosition: `${-sprite.xloc}px ${-sprite.yloc}px`,
          width: `${sprite.width}px`,
          height: `${sprite.height}px`,
        }}
      />
    </>
  );
};

const Actors: FC<Props> = (props) => {
  const actors = Object.entries(allActors);
  return (
    <div className={styles.encounter}>
      <h1>Actors</h1>
      <div className={styles.actorList}>
        {actors.map(([actorId, actor]) => {
          if (!actor.sprite) {
            return (
              <p key={actorId}>
                No sprite for actor id="{actorId}" name="{actor.name}"
              </p>
            );
          }
          const spriteId = dereference(actor.sprite);
          const sprite =
            monsterSpriteData[spriteId as keyof typeof monsterSpriteData];
          return (
            <Portrait
              actor={actor}
              sprite={sprite}
              spriteId={spriteId}
              actorId={actorId}
              key={actorId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Actors;
