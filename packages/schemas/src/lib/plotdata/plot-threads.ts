import { DmMonsterKnowledge } from '../actordata/actors.js';

/**
 * Dictionary from entitydef name to DmPlotThread, DmPlotScript, or DmDialogData.
 * Docs at https://dungeonmans.fandom.com/wiki/Plot_Threads
 */
export type DmPlot = {
  [key: string]: DmPlotThread | DmPlotScript | DmDialogData;
};

/** A dmPlotThread base object that maintains all the world changes that your plot entails. */
export type DmPlotThread = {
  /** The type of class. Constant. */
  classType: 'dmPlotThread';
  plotStateLookup: DmPlotStateLookup;
  dialogHooks: DialogHooks;
  dropItemHooks: DmDropItemHooks;
};

/**
 * The collection of states that the plot thread can be in.
 * Dictionary from states to numbers. The numbers do not really matter but
 * it should be unique within the plotStateLookup.
 * Every plot thread should start with `"unstarted"`.
 */
export type DmPlotStateLookup = {
  /** Every plot thread starts in the `"unstarted"` state. */
  unstarted: 0;
} & Record<string, number>;

/**
 * A DialogHook allows the game to hook special dialogs into NPCs when
 * the plot thread is in a given state.
 */
export type DialogHooks = DmDialogHook[];

/**
 * A DialogHook allows the game to hook special dialogs into NPCs when
 * the plot thread is in a given state.
 */
export type DmDialogHook = {
  /** The Archetype name of the NPC to be affected. */
  targetArc: string;
  /**
   * The state that the plot thread must be in to trigger this dialog.
   * Must match a key in a `dmPlotThread`'s `"plotStateLookup"`, for example `"unstarted"`.
   */
  stateEquals: string;
  /** Array of things you can offer the player to choose from. */
  dialogOptions: DmDialogResponse[];
};

/** @asType integer */
type Integer = number;

/** A dmPlotScript is a collection of information that can cause the world to change when run. */
export type DmPlotScript = {
  /** The type of class. Constant. */
  classType: 'dmPlotScript';
  /**
   * Sets the plot state to this value. This is how you can progress a plot.
   * Must match a key in a `dmPlotThread`'s `"plotStateLookup"`, for example `"unstarted"`.
   */
  setThisState: string;
  /**
   * Which dialog to trigger.
   * Reference to a root-level key in a json in `plotdata/` with `"classType": "dmDialogData"`.
   */
  dialogArchetype: string;
  /**
   * Remove items from the player inventory.
   * Dictionary from entityDef name in `itemdata/` to how many should be removed.
   */
  removeItems?: Record<string, Integer>;
  /**
   * Items to be tossed on the ground.
   * Dictionary from entityDef name in `itemdata/` to how many.
   */
  tossItems?: Record<string, Integer>;
  /**
   * Give these items directly to the player inventory.
   * Dictionary from entityDef name in `itemdata/` to how many.
   */
  giveItems?: Record<string, Integer>;
};

/** dmDialogData lets you define dialogs that pop up in game allowing the player to make a choice. */
export type DmDialogData = {
  /** The type of class. Constant. */
  classType: 'dmDialogData';
  /**
   * Title displayed at the top of the dialog popup.
   * If not set, the game uses the NPC name.
   */
  title?: string;
  /** What is being said by the NPC. */
  message: string;
  /** Reference to a sound baked into the XACT files for the game. */
  soundToPlay?: string;
  /** What sprite to use in the dialog window. Reference to an entityDef name in `spritedata/`. */
  instigatorSprite: string;
  /** Response options for the player to choose from. */
  responses: DmDialogResponse[];
};

/**
 * A dialog choice for the player. Either responseScript or responseDialog must be set.
 */
export type DmDialogResponse =
  | {
      /** What is being said by the player character. */
      message: string;
      /** Either `"none"` if there is no further dialog, or a reference to a root-level key in a json in `plotdata/` with `"classType": "dmPlotScript"`. */
      responseScript: (string & {}) | 'none';
    }
  | {
      /** What is being said by the player character. */
      message: string;
      /**
       * You can use `responseDialog` to chain together dialog boxes.
       * Reference to a root-level key in a json in `plotdata/` with `"classType": "dmDialogData"`.
       */
      responseDialog: string;
    };

/**
 * dmDropItemHook allow to define that specific items drop
 * when the plot thread is in a given state.
 */
export type DmDropItemHooks = DmDropItemHook[];

/**
 * dmDropItemHook allow to define that specific items drop
 * when the plot thread is in a given state.
 */
export type DmDropItemHook = {
  /**
   * In which plot state has this item a chance to drop?
   * Must match a key in a `dmPlotThread`'s `"plotStateLookup"`, for example `"unstarted"`.
   */
  stateEquals: string;
  /** What item will be dropped? Reference to an entitydef name in `itemdata/`. */
  dropArchetype: string;
  /** What is the probability that a monster in the `targetMonsterKnowledge` or `targetMonsterArchetypes` array will drop the item?
   * @maximum 1.0
   * @minimum 0.0
   */
  dropChance: number;
} & (
  | {
      /** What kind of monsters drop the item? */
      targetMonsterKnowledge: DmMonsterKnowledge[];
    }
  | {
      /** What specific monsters drop the item? Array of references to entitydefs of class `dmMonster` in `actors/`. */
      targetMonsterArchetypes: string[];
    }
);
