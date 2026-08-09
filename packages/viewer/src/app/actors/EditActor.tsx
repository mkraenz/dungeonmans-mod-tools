import { DmMonster, DmMonsterSprite } from '@dungeonmans-mod-tools/schemas';
import { FC } from 'react';

type Props = { actor: DmMonster; sprite: DmMonsterSprite };

const EditActor: FC<Props> = ({ actor, sprite }) => {
  return (
    <div>
      <h2>{actor.name}</h2>
      <h3>Monster data</h3>
      <pre>{JSON.stringify(actor, null, 2)}</pre>
      <h3>Sprite data</h3>
      <pre>{JSON.stringify(sprite, null, 2)}</pre>
    </div>
  );
};

export default EditActor;
