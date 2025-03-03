import { DoubleDigit } from '../ts-utils.js';

/**
 * The base damage an attack does. A string triple of format "damage_type,dice_roll,???".
 * - List of damage types: melee, ranged, fire, ice, dark, starlight, poison, bleed.
 *   It might be that you can also combine multiple types using an & character, for example "melee&dark&poison,1d6+35,0" but I am not sure whether that works and what exactly it does.
 * - dice_roll can be either a number or the TTRPG dice notation.
 * - ??? I think this is always 0 for damage dealt. This third number only becomes relevant for `damagetaken01` properties where it seems to represent how much more damage is being taken by this type of attack, effectively meaning elemental weaknesses.
 * @examples ["melee,1,0", "fire,2d8+30,0", "poison,1,0"]
 */
export type Damage = string;
/** Reference to an entity of class "dmSpecialPower" in specialpowerdata/. */
export type PowerRef = string;

type WithMeleeDamage = {
  [key in `meleedamage_${DoubleDigit}`]?: Damage;
};
type WithRangedDamage = {
  [key in `rangeDamage_${DoubleDigit}`]?: Damage;
};
type WithPower = {
  [key in `power_${DoubleDigit}`]?: PowerRef;
};
type WithChampionPower = {
  [key in `championpower_${DoubleDigit}`]?: PowerRef;
};

export type AttackParticle =
  | (string & {})
  | 'particle_attack_weapon_bite'
  | 'particle_attack_weapon_claw'
  | 'particle_attack_weapon_pierce'
  | 'particle_attack_weapon_polearm'
  | 'particle_attack_weapon_punch_green'
  | 'particle_attack_weapon_punch'
  | 'particle_attack_weapon_slash'
  | 'particle_attack_weapon_slime'
  | 'particle_blunt_impact_noshake'
  | 'particle_blunt_impact'
  | 'particle_fire_quick_burn'
  | 'particle_poison_splat';

export type AttackSfx =
  | (string & {})
  | 'earth_impact'
  | 'glass_shatter'
  | 'magic_fire_impact'
  | 'magic_ice_impact'
  | 'magic_impact_fire'
  | 'magic_poison_impact'
  | 'magic_purple_charge'
  | 'monster_attack_bite'
  | 'monster_attack_claw'
  | 'monster_attack_fire_axe'
  | 'monster_attack_slime'
  | 'punch'
  | 'purple_slash'
  | 'weapon_1h_axe_hit'
  | 'weapon_1h_blunt_hit'
  | 'weapon_1h_sword_hit'
  | 'weapon_projectile_generic'
  | 'weapon_wizard_staff_hit';

export type Banter =
  | (string & {})
  | 'bandit'
  | 'bee'
  | 'creature'
  | 'finalboss'
  | 'lizard'
  | 'orc'
  | 'punk'
  | 'purple'
  | 'scrobold'
  | 'slime'
  | 'subboss'
  | 'traplord'
  | 'undead'
  | 'warlord_commander'
  | 'warlord';

export type NameTable =
  | 'bandit_name_chart'
  | 'bee_name_chart'
  | 'critter_name_chart'
  | 'lizard_name_chart'
  | 'orc_name_chart'
  | 'punk_name_chart'
  | 'purple_name_chart'
  | 'rare_mostly_name_chart'
  | 'scrobold_name_chart'
  | 'sorceror_supreme_name_chart'
  | 'undead_name_chart'
  | 'warlord_commander_name_chart'
  | 'warlord_conqueror_name_chart'
  | 'warlord_harrier_name_chart'
  | 'warlord_herald_name_chart'
  | 'warlord_sorceror_name_chart';

export type DmMonsterKnowledge =
  | 'bandits'
  | 'bees'
  | 'brigands'
  | 'cultists'
  | 'greater_beasts'
  | 'lesser_beasts'
  | 'lizardmens'
  | 'orcs'
  | 'punks'
  | 'purpleonians'
  | 'scorpocompys'
  | 'scrobolds'
  | 'slimes'
  | 'snakes'
  | 'undeads'
  | 'warlords';

/** @asType integer */
type Integer = number;

/** Docs at https://dungeonmans.fandom.com/wiki/Mods:_Adding_Monsters */
export type DmMonster = {
  /** The type of class. Constant. */
  class: 'dmMonster';
  /** Whether it is blocked to swap places with the target by bumping into the target. Typically true, i.e. monsters block your path and vice-versa. */
  bBlockTileEntry: true;
  /** reference to an entitydef inside spritedata/ */
  sprite: string;
  /** Display name */
  name: string;
  /** @asType integer */
  health: number;
  /** Reference to an entitydefs of class dmCoins inside ActorData/coins.txt */
  cointype:
    | (string & {})
    | 'copper_coins_small'
    | 'copper_coins_medium'
    | 'copper_coins_large'
    | 'copper_coins_huge'
    | 'silver_coins_small'
    | 'silver_coins_medium'
    | 'silver_coins_large'
    | 'silver_coins_huge'
    | 'gold_coins_small'
    | 'gold_coins_medium'
    | 'gold_coins_large'
    | 'gold_coins_huge';
  /** @asType integer */
  level: number;
  /** @asType integer */
  scale_min: number;
  /** @asType integer */
  scale_max: number;
  scale_adjusthealth: number;
  scale_adjustdamage: number;
  nametable: NameTable;

  /** Whether the actor has ranged attacks. If true, set the several properties starting with ranged* and tooclosedistance. */
  hasRanged?: boolean;
  /** TODO: This probably is the projectile sprite.  */
  rangedAttackSprite?: string;
  rangedAttackRange?: Integer;
  /**
   * Integer or Dice roll string
   */
  rangedattackrecharge?: Integer | string;
  tooclosedistance?: Integer;

  armor?: Integer;
  parry?: Integer;
  block?: Integer;
  dodge?: Integer;
  base_defeatarmor?: Integer;
  base_defeatblock?: Integer;
  base_defeatparry?: Integer;
  hitBonus?: Integer;

  /**
   * The "knowledge category" this monster falls under.
   * Influences item drops, bonus damage, and maybe more.
   */
  knowledge: DmMonsterKnowledge;
  /** What particle effect draws in the world when this guy attacks? */
  basicattackparticle: AttackParticle;
  /** What sound plays when this monster attacks? */
  attack_sfx: AttackSfx;
  /**
   * Monsters drop steaks of themselves sometimes, and those steaks can be used to feed your birds
   * so they learn powers. Comma-separated string of four values "drop_chance,tough_or_swift,melee_or_ranged,power":
   * - Odds of dropping a steak on death, 1 to 100 integer value.
   * - Tough or Swift? -1 for tough, 0 for neither, 1 for Swift.
   * - Melee or Ranged? -1 for melee, 0 for neither, 1 for Ranged.
   * - Powers that can be learned by your bird for eating this steak. Reference to an entity in specialpowerdata/.
   */
  steakdata?: string;
  banter: Banter;
} & WithMeleeDamage &
  WithRangedDamage &
  WithPower &
  WithChampionPower;

/**
 * Dictionary from entitydef name to DmMonster.
 * Docs at https://dungeonmans.fandom.com/wiki/Mods:_Adding_Monsters
 */
export type DmMonsters = {
  [entityDefName: string]: DmMonster;
};

/** Your friendly neighborhood NPC. */
export type DmTownsmans = {
  class: 'dmTownsmans';
  bBlockTileEntry: true;
  /** Reference to an entitydef inside spritedata/ */
  sprite: string;
  /** Display name */
  name: string;
  /**
   * @asType integer
   * @default 9999
   */
  health: number;
  /** @default false */
  bBlockSameArchetype: boolean;
  /** Reference to a dialog of classType `dmDialogData` in plotdata/ */
  dialog_onBumped: string;
};

/**
 * Dictionary from entitydef name to DmMonster or DmTownsmans.
 * Docs at for monsters as https://dungeonmans.fandom.com/wiki/Mods:_Adding_Monsters
 */
export type DmActors = {
  [entityDefName: string]: DmMonster | DmTownsmans;
};
