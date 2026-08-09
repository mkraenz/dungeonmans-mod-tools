import { FC } from 'react';
import styles from './actors.module.css';
import { DmMonsterSprite } from '@dungeonmans-mod-tools/schemas';
import Portrait from './Portrait';
import { useActors } from './useActors.hook';
import Spinner from '../../components/Spinner';

const dereference = (raw: string) => {
  // TODO not perfect but good enough for now.
  return raw.replace('@ref(', '').replace(')', '');
};

const PleaseStandBy = () => {
  return (
    <div>
      <Spinner enabled />
      <p>Loading data. This may take a few seconds.</p>
    </div>
  );
};

const Actors: FC = () => {
  const { data, loadFromDirectory, loading } = useActors();
  return (
    <div className={styles.encounter}>
      <h1>Actors</h1>
      <button onClick={loadFromDirectory} disabled={loading}>
        Open folder
      </button>
      {loading && <PleaseStandBy />}

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
