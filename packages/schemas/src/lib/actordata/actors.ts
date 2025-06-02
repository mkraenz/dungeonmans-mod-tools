import { DoubleDigit } from '../ts-utils.js';

/**
 * The base damage an attack does. A string triple of format "damage_type,dice_roll,???".
 * - List of damage types: melee, ranged, fire, ice, dark, starlight, poison, bleed.
 *   It might be that you can also combine multiple types using an & character, for example "melee&dark&poison,1d6+35,0" but I am not sure whether that works and what exactly it does.
 * - dice_roll can be either a number or the TTRPG dice notation. Additionally, you can make damage depend on the hero's level by using the `[herolevel]` string, for example "fire&melee,[herolevel]d6+12,0.0" or "ice,[herolevel]+12+1d6,0.0".
 * - ??? I think this is always 0 for damage dealt. This third number only becomes relevant for `damagetaken01` properties where it seems to represent how much more damage is being taken by this type of attack, effectively meaning elemental weaknesses.
 * @examples ["melee,1,0", "fire,2d8+30,0", "poison,1,0", "fire&melee,[herolevel]d6+12,0.0", "ice,[herolevel]+12+1d6,0.0", "fire&ice&bleed,2d4+18,0"]
 */
export type Damage = string;
/**
 * Weaknesses or resistances against specific damage types of format "damageType,0,weakness".
 * Example: "starlight,0,1.0".
 * If the 3rd number is negative the actor has resistance against the damage type. If the number is positive, it means it has a weakness.
 *
 * The format is very similar to `Damage`, so please check the docs on `meleedamage_01` for more info.
 * */
export type WeaknessOrResistance = string;
/** Reference to an entity of class "dmSpecialPower" in specialpowerdata/. */
export type PowerRef = DmPower | (string & {});

type WithMeleeDamage = {
  [key in `meleedamage_${DoubleDigit}`]?: Damage;
};
export type WithWeaknessesOrResistance = {
  [key in `damagetaken_${DoubleDigit}`]?: WeaknessOrResistance;
};
type WithRangedDamage = {
  [key in `rangedDamage_${DoubleDigit}`]?: Damage;
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
  | (string & {})
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

export type RangedAttackSprite =
  | (string & {})
  | 'ra_feather'
  | 'ra_light_spear'
  | 'ra_sprite_arrow'
  | 'ra_sprite_beesus_stinger'
  | 'ra_sprite_bluebolt'
  | 'ra_sprite_bomb'
  | 'ra_sprite_bottle'
  | 'ra_sprite_boulder'
  | 'ra_sprite_firebolt'
  | 'ra_sprite_ninja_star'
  | 'ra_sprite_small_rock'
  | 'ra_sprite_spear'
  | 'ra_sprite_stinger';
export type RangedSfx =
  | 'earth_impact_02'
  | 'magic_starlight_impact'
  | 'monster_grunt'
  | 'ranged_attack_ninja_star'
  | 'weapon_projectile_generic';

export type Allegiance =
  | 'allegiance_dmans_decoy'
  | 'allegiance_dmans_pet'
  | 'allegiance_dungeon_shopkeeper'
  | 'allegiance_dungeonmans'
  | 'allegiance_obstacle';
export type AiMove =
  | 'friendly_melee_castle_targeting'
  | 'golden_piggy_movement'
  | 'multishot_clone_behavior'
  | 'priest_pig_movement'
  | 'psychic_clone_behavior'
  | 'retired_dmans_movement';

export type DmPower =
  | 'sp_heal_nearest_wounded_30'
  | 'sp_minor_heal'
  | 'sp_big_filth_heal'
  | 'sp_crimson_spit'
  | 'sp_enemy_shellbreaker_shot'
  | 'sp_orc_heal'
  | 'sp_rhombus_of_rime_enemy_rank_2'
  | 'sp_temple_boss_behavior'
  | 'sp_axe_rush'
  | 'sp_castle_wall_arrow'
  | 'sp_dashing_charge_enemy_01'
  | 'sp_dread_foomsplosion'
  | 'sp_final_foom_battle_logic'
  | 'sp_jaw_storm'
  | 'sp_shark_rush'
  | 'sp_shield_rush'
  | 'sp_triger_fury'
  | 'sp_ai_priest_pig'
  | 'sp_axe_carve'
  | 'sp_bandit_ice_dagger_rank_2'
  | 'sp_beastmaster_ai'
  | 'sp_beckon_foe'
  | 'sp_beesus_spawn_decoymans'
  | 'sp_blink_or_shield_01'
  | 'sp_bolt_of_bandit_foom'
  | 'sp_bolt_of_bandit_foom_02'
  | 'sp_bull_rush'
  | 'sp_chemistress_ai'
  | 'sp_danger_shuffle'
  | 'sp_double_slash'
  | 'sp_enemy_bleedy_arrow_01'
  | 'sp_enemy_haste_buff'
  | 'sp_enemy_heat_ray_1'
  | 'sp_fire_best_element_ray'
  | 'sp_frozen_armor'
  | 'sp_frozen_armor_hateglacier'
  | 'sp_gravesender_scargiver_ai'
  | 'sp_headless_headsmans_ai'
  | 'sp_high_guard'
  | 'sp_icy_graveshard'
  | 'sp_icy_graveshard_rank_2'
  | 'sp_icy_graveshard_rank_3'
  | 'sp_lava_lance'
  | 'sp_mining_cave_in'
  | 'sp_mummy_stink'
  | 'sp_orb_of_crushination_ai'
  | 'sp_peach_reach'
  | 'sp_plant_fire_bomb'
  | 'sp_plant_fire_bomb_demolitionist'
  | 'sp_plant_sorceror_meteors'
  | 'sp_poison_stab_minor'
  | 'sp_pounce_and_bite'
  | 'sp_press_the_attack'
  | 'sp_punk_rock_song'
  | 'sp_ranger_power_focus'
  | 'sp_sad_amos_ai'
  | 'sp_starlight_beam'
  | 'sp_storm_driver_enemy'
  | 'sp_stunning_smash'
  | 'sp_summon_hellhoof'
  | 'sp_swamp_boss_jump_update'
  | 'sp_swamp_poison_spit'
  | 'sp_ai_light_shield_1'
  | 'sp_banner_loyalty_in_steel'
  | 'sp_bee_magistrate_shield_allies'
  | 'sp_bee_purple_kidnap'
  | 'sp_bee_teetotaler_ai'
  | 'sp_bee_valkyrie_rescue'
  | 'sp_beeholder_ray_fire'
  | 'sp_blood_rager_area_attack'
  | 'sp_bogart_deadpulse'
  | 'sp_carpenter_bee_build'
  | 'sp_dread_purple_artillery'
  | 'sp_dread_purple_charge'
  | 'sp_dread_spear_toss'
  | 'sp_enemy_quick_stabs_02'
  | 'sp_pinning_dagger_toss_02'
  | 'sp_psychomanser_psychic_clone_attack_power'
  | 'sp_shield_allies_and_heal'
  | 'sp_tears_of_tortured_stars'
  | 'sp_toxic_trampler_area_attack'
  | 'sp_uplifted_pouncebiter_ai'
  | 'sp_warlord_commander_conjure_bird_seed'
  | 'sp_warlord_conqueror_recovery'
  | 'sp_warlord_harrier_knockback_arrow'
  | 'sp_warlord_lightspear'
  | 'sp_warlord_sorceror_contingency'
  | 'sp_enemy_invisibility'
  | 'sp_orc_venomizer'
  | 'sp_bolt_of_purple_doom'
  | 'sp_projectile_shield'
  | 'sp_summon_satellite'
  | 'sp_resists_down_50'
  | 'sp_final_foom_fire_bolt'
  | 'sp_ice_prison'
  | 'sp_purple_prison'
  | 'sp_ragdoll_toss'
  | 'sp_triger_roar'
  | 'sp_wreck_armor'
  | 'sp_bolt_of_pumpkin_foom'
  | 'sp_build_wall_behind_player'
  | 'sp_call_beeteor'
  | 'sp_enemy_bleedy_arrow_02'
  | 'sp_enemy_coldnado'
  | 'sp_enemy_decoymans'
  | 'sp_enemy_powerdrive_01'
  | 'sp_enemy_quick_stabs_03'
  | 'sp_foomsplosion'
  | 'sp_gigaslam'
  | 'sp_mazzik_fire_and_ice'
  | 'sp_rhombus_of_rime_enemy_rank_1'
  | 'sp_shield_allies'
  | 'sp_summon_compycloud'
  | 'sp_throw_or_retrieve_axe'
  | 'sp_tides_of_battle'
  | 'sp_whirlwind'
  | 'sp_bolt_of_purple_doom_triple'
  | 'sp_dread_foom_shields_up'
  | 'sp_gravity_crush_50'
  | 'sp_ai_press_the_attack'
  | 'sp_bolt_of_foom_monster'
  | 'sp_enemy_swap_buffs'
  | 'sp_foomwarped_area_fire'
  | 'sp_mazzik_alternating_elements_spray'
  | 'sp_mazzik_protect_the_boss'
  | 'sp_ninja_star_barrage'
  | 'sp_rhombus_of_rime_enemy_dynamic'
  | 'sp_summon_purpleated_bird'
  | 'sp_ai_bird_stick_and_move'
  | 'sp_banish_bird'
  | 'sp_bull_rush_knockback'
  | 'sp_elemental_flurry_01'
  | 'sp_foomwarped_area_ice'
  | 'sp_mazzik_frost_bolt'
  | 'sp_mazzik_fire_bolt'
  | 'sp_bandit_necromanser_gas'
  | 'sp_beeholder_ray_ice'
  | 'sp_conjure_ice_block_enemy'
  | 'sp_rocket_jump_to_safety'
  | 'sp_star_spray'
  | 'sp_warlord_harrier_stick_n_move'
  | 'sp_enemy_blink_if_hurt'
  | 'sp_enemy_shardstorm'
  | 'sp_enemy_starlight_ray'
  | 'sp_horseless_headsmans_ai'
  | 'sp_warlord_herald_shockwave'
  | 'sp_banner_war_unending'
  | 'sp_conjure_enemy_bloodrager'
  | 'sp_hawkeye_grip_enemy'
  | 'sp_plant_meteor_elemental'
  | 'sp_warlord_conqueror_100_blows'
  | 'sp_spawn_cryopulse';

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
  /** Either an integer or a dice roll like "5d6+40" */
  health: Integer | string;
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
  level: Integer;
  /** The minimum level to which this actor can scale. Some rare monsters actually do not have this property set. */
  scale_min?: Integer;
  /** The maximum level to which this actor can scale. Some rare monsters actually do not have this property set. */
  scale_max?: Integer;
  /** Relative value of how health scales with the level. Examples are 0.1 or -0.2. */
  scale_adjusthealth?: number;
  /** Relative value of how damage scales with the level. Examples are 0.1 or -0.2. */
  scale_adjustdamage?: number;
  nametable: NameTable;

  /** Female or male */
  gender?: 'male' | 'female';

  /** Whether the actor has ranged attacks. If true, set the several properties starting with ranged* and tooclosedistance. */
  hasRanged?: boolean;
  /** Probably the projectile sprite.  */
  rangedAttackSprite?: RangedAttackSprite;
  rangedAttackRange?: Integer;
  /**
   * Integer or Dice roll string
   */
  rangedattackrecharge?: Integer | string;
  tooclosedistance?: Integer;
  /** Which sound to play on a ranged attack.
   * even with hasRanged=true this is optional. */
  ranged_sfx?: RangedSfx;

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

  /** Reference to an entitydef inside gamesystemdata/ of class "dmPerk" */
  addperk_01?: string;

  tag1?: string;
  tag2?: string;
  tag3?: string;
  tag4?: string;
  allegiance?: Allegiance;
  ai_move?: AiMove;
  ragevalue?: Integer;
  die_sfx?: (string & {}) | 'break_wall' | 'death_purple_beast';
  baseapgain?: Integer;
  fleevalue?: Integer;
  onlymove?: string;
  nodrop?: boolean;
  threat?: Integer;
  /** Example: "ultimate_jibbasnap_table,100" */
  treasuretable?: string;
  /** dice roll, e.g. "2d3+3" */
  treasurerolls?: string;
  /** Is `damage` actually used? Maybe for when a monster only does damage via skills but no melee and no ranged? */
  // damage?: Damage

  // scriptvar1?:  meteorflavor,fire
  // scriptvar2?:  meteorcount,1
  // scriptvar3?:	monster_bolt_of_foom,fire
  // spawnwithitem_01        "taco_suprema,1"
  // spawnwithitem_02        "weapon_1h_sword_curved_buzzing_bearblade,1"
  // spawnwithitem_03        "halloween_mask_sky_bear,1"
} & WithMeleeDamage &
  WithRangedDamage &
  WithPower &
  WithChampionPower &
  WithWeaknessesOrResistance;

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
