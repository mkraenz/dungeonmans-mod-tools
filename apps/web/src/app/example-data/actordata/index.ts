import goblins from './goblin-monsters.json' with {type: "json"};
import monsters from './monsters.json' with {type: "json"};
import {DmMonster} from '@dungeonmans-mod-tools/schemas'

const allActors = {...goblins, ...monsters} as Record<string, DmMonster>;

export {goblins, monsters, allActors};
