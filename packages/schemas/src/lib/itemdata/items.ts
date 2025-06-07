import { Integer } from '../ts-utils.js';

export type DmItemNonAcademyTurnIn = {
  /** The type of class. Constant. */
  class: 'dmNonAcademyTurnIn';
  /** Diplay name */
  name: string;
  /**
   * Reference to an entity in spritedata/.
   */
  sprite: string;
  /** Short description. */
  description: string;
  /** Flavor text */
  flavorText: string;
  identified: boolean;
  value: Integer;
  stackable: boolean;
  /**
   * A tuple of strings separated by a comma.
   * The 1st string is a reference to a key in plotdata/ of classType `dmPlotThread`.
   * The 2nd string is a key in the dmPlotThread's `plotStateLookup`.
   * The state of the plot thread will be set to this value after collecting the item.
   * @examples ["modplot,found_mod_plot_item"]
   */
  plotthread_advance: string;
};

export type DmItemConsumable = {
  /** The type of class. Constant. */
  class: 'dmConsumable';
  /** @examples ["Pete's Lucky Bell"] */
  name: string;
  /**
   * Reference to a spritedata/ entitydef
   * @examples ["modplot_item_pete_reward_sprite"]
   */
  sprite: string;
  /** @examples ["Ring this lucky bell to summon some shambling undead help in time of need."] */
  description: string;
  /** @examples ["How does summoning work? We don't know."] */
  flavorText: string;
  identified: boolean;
  uses: Integer;
  /** @examples ["Summoning Bell"] */
  itemtype: string;
  value: Integer;
  itemrank: Integer;
  /** Reference to a specialpowerdata/ entitydef
   * @examples ["sp_modplot_pete_lucky_bell"] */
  power_1: string;
};

export type DmArmormentBase = {
  /** Display name */
  name: string;
  /** Reference to an entitydef in spritedata/ */
  sprite: string;
  tier: Integer;
  /** Identifier of the item set this item is part of, if any. Use together entities in in setbonusdata/. */
  itemset?: string;
  /** @examples ["1h", "2h", "heavyarmor", "helm", "glove"] */
  info1: string;
  /** Text displayed on the item details. */
  flavorText: string;
  /**
   * Is this a unique item?
   * @default false
   */
  uniqueitem?: boolean;
  /** Has the item been identified? */
  identified: boolean;
  /** Market value of the item */
  value: number;
};

export type DmWeaponBase = {
  /** Display name */
  unidName: string;
  /** How much damage does the weapon do? Either a dice roll like '4d7' or an integer string like '0' */
  damage: string;
  /**
   * Reference to a particle effect entity name
   * @examples ["particle_attack_weapon_slash", "wizard_staff_blast_quick"]
   */
  attackparticle: string;
  /** @examples: ["axe"] */
  info2: string;
  /**
   * @default 1
   * Attack range in number of tiles, diagonals count as 1.
   */
  range?: Integer;
} & DmArmormentBase;

export type DmWeapon = {
  /** The type of class. Constant. */
  class: 'dmWeapon';
  /** One-handed or two-handed weapon */
  hands: 1 | 2;
} & DmWeaponBase;

type DmEnchantments = {
  /** Reference to an entity of class 'dmMagicModifier' in gamesystemdata/. */
  magicmodifier_01?: string;
  /** Reference to an entity of class 'dmMagicModifier' in gamesystemdata/. */
  magicmodifier_02?: string;
  /** Reference to an entity of class 'dmMagicModifier' in gamesystemdata/. */
  magicmodifier_03?: string;
  /** Reference to an entity of class 'dmMagicModifier' in gamesystemdata/. */
  magicmodifier_04?: string;
  /** Reference to an entity of class 'dmMagicModifier' in gamesystemdata/. */
  magicmodifier_05?: string;
  /** Reference to an entity of class 'dmMagicModifier' in gamesystemdata/. */
  magicmodifier_06?: string;
  /** Reference to an entity of class 'dmMagicModifier' in gamesystemdata/. */
  magicmodifier_07?: string;
  /** Reference to an entity of class 'dmMagicModifier' in gamesystemdata/. */
  magicmodifier_08?: string;
  /** Reference to an entity of class 'dmMagicModifier' in gamesystemdata/. */
  magicmodifier_09?: string;
};

export type DmWizardStaff = {
  /** The type of class. Constant. */
  class: 'dmWizardStaff';
  spellpower: Integer;
} & DmWeaponBase &
  DmEnchantments;

export type DmGear = {} & DmArmormentBase;

export type DmArmor = {
  /** The type of class. Constant. */
  class: 'dmArmor';
  armorvalue: Integer;
  dodgevalue: Integer;
} & DmEnchantments &
  DmGear;

export type DmHelm = {
  /** The type of class. Constant. */
  class: 'dmHelm';
  healthbonus?: number;
} & DmEnchantments &
  DmGear;

export type DmGlove = {
  /** The type of class. Constant. */
  class: 'dmGlove';
  defeatarmor: Integer;
} & DmEnchantments &
  DmGear;

/**
 * Dictionary from entityDef name to DmItemConsumable, DmItemNonAcademyTurnIn, DmWeapon, DmWizardStaff, DmArmor, DmHelm.
 *
 * TODO there can be much more item types here.
 * I also think that the effects of the gear can be mixed and matched. But we have to start somewhere.
 */
export type DmItems = {
  [entityDefName: string]:
    | DmItemConsumable
    | DmItemNonAcademyTurnIn
    | DmWeapon
    | DmWizardStaff
    | DmArmor
    | DmHelm
    | DmGlove;
};
