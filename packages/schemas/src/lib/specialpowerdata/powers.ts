import { DoubleDigit } from '../ts-utils.js';

type WithSummonAlly = {
  /** ["friendly_skelebro,3d2"] */
  [key in `summonally_${DoubleDigit}`]?: string;
};

export type DmSummonPower = {
  /** The type of class. Constant. */
  class: 'dmSpecialPower';
  /** @examples ["Pete's Lucky Bell"] */
  powername: string;
  /** @default "No one will ever be able to read this." */
  menudescription: string;
} & WithSummonAlly;

export type DmSpecialPower = {
  /** The type of class. Constant. */
  class: 'dmSpecialPower';
  /** Display name */
  powername: string;
  /** @default "No one will ever be able to read this." */
  menudescription: string;
  /** @asType integer */
  nummeleeattacks: number;
  /** @examples [-0.9] */
  damagemod: number;
  /**
   * @asType integer
   * @examples [1] */
  selectRange: number;
  /**
   * @asType integer
   * @examples [10] */
  bullrush: number;
  /** @examples ["axe_flurry_emitter"] */
  hitTargetEmitter: string;
  /**
   * Reference to a function inside a file in code/.
   * For example, setting "script" to "modmans_mods.somanybites" means your script lives in code/modmans_mods.cs and within the class ScriptFunctions you have a method named `somanybites`
   * @examples ["modmans_mods.somanybites"] */
  script: string;
};

export type DmPlayerSpecialPower = {
  /** The type of class. Constant. */
  class: 'dmSpecialPower';
  /** Display name */
  powername: string;
  /** Description displayed in the menus. */
  menudescription: string;
  /** Reference to an entitydef name in spritedata/. */
  icon: string;
  /** @asType integer */
  selectRange?: number;
  dash?: string;
  movespeed_self?: number;
  rotateduringtravel?: number;
  requiresarmor?: string;
  selfstatuseffect?: string;
  rayblockedbyobstacles?: boolean;
  raylength?: number;
  raybounces?: number;
  targettile_01?: number;
  targettile_02?: number;
  ai_escapepower?: boolean;
  stamcost?: number;
};

type WithPowerSwap = {
  [key in `swap_${DoubleDigit}`]?: string;
};

/* TODO @playdungeonmans: This is a best guess. Need to clarify */
/**
 * Defines which Dungeonmans-native powers should be replaced by modded powers.
 * For example, to replace the native power `sp_quick_dash` by `sp_modmans_quick_dash`,
 * you set `"swap_01": "sp_modmans_quick_dash"`.
 */
export type DmPowerSwap = {
  /** The type of class. Constant. */
  class: 'dmModPowerSwapList';
} & WithPowerSwap;

/** Dictionary from entityDef name to DmSpecialPower, DmSummonPower, DmPowerSwap, or DmPlayerSpecialPower. */
export type DmSpecialPowers = {
  [entityDefName: string]:
    | DmSpecialPower
    | DmSummonPower
    | DmPlayerSpecialPower
    | DmPowerSwap;
};
