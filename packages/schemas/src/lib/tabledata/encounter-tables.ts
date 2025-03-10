import { DoubleDigit } from '../ts-utils.js';

type TableCommandKeys =
  | `addtotable_${DoubleDigit}`
  | `replacetable_${DoubleDigit}`;

// This might actually be using a bug(?) in ts-json-schema-generator to our benefit. Without the union of TableCommandKeys again it generates exactly the type we want. However, typescript thinks that every value must be a value. That's because the key type of string in Record<string, ..> effectively eats all the TableCommandKeys. Or is this even a TS bug? Well at least it works.

/**
 * A DmEncounterTable consist of two parts:
 *
 * - a) one or more instructions defining which vanilla Dungeonmans table to add to or replace.
 * - b) additional dictionary-style key-value pairs with the key being a Reference to an entity in encounterdata/,
 *      and the value a number of lottery tickets to put into the vanilla Dungeonmans table to draw from.
 */
export type DmEncounterTable = {
  // TODO replace value type by an export type XYZ
  [Key in TableCommandKeys]?: (string & {}) | GenericEncounter;
} & (
  | Record<string, number>
  | {
      [Key in TableCommandKeys]?: (string & {}) | GenericEncounter;
    }
);

/** entitydefs from Dungeonmans/Content/Tables/Dungeon Encounter Tables/generic_encounters.txt */
type GenericEncounter =
  | 'undead_boss'
  | 'purple_unique_bosses'
  | 'generic_dungeon_master_table'
  | 'purple_dungeon_master_table'
  | 'sanctum_purple_dungeon_master_table'
  | 'generic_encounter_01'
  | 'generic_encounter_02'
  | 'generic_encounter_03'
  | 'generic_encounter_04'
  | 'generic_encounter_05'
  | 'generic_encounter_06'
  | 'generic_encounter_07'
  | 'generic_encounter_08'
  | 'generic_encounter_09'
  | 'generic_encounter_10'
  | 'generic_encounter_11'
  | 'generic_encounter_12'
  | 'generic_encounter_13'
  | 'generic_encounter_15'
  | 'generic_encounter_purple'
  | 'difficult_encounter_purple'
  | 'final_foom_trash'
  | 'debugmix_dungeon_master_table'
  | 'table_lizardmens_reinforcements'
  | 'generic_humanoid_boss'
  | 'test_table'
  | 'humanoid_bosses_03'
  | 'humanoid_bosses_05'
  | 'humanoid_bosses_07'
  | 'humanoid_bosses_09'
  | 'humanoid_bosses_11'
  | 'humanoid_bosses_13'
  | 'mountain_fortress_skybridge_melee'
  | 'mountain_fortress_skybridge_ranged';

const _test: DmEncounterTable = {
  addtotable_01: 'mountain_fortress_skybridge_ranged',
  dajksdlj: 123,
  replacetable_01: 'final_foom_trash',
};

/**
 * Dictionary from entityDef name to DmEncounterTable.
 *
 * Docs at https://dungeonmans.fandom.com/wiki/Mods:_Adding_Monsters
 */
export type DmEncounterTables = {
  [entityDefName: string]: DmEncounterTable;
};
