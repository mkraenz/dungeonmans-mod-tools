import { Integer } from '../ts-utils.js';

type DmSpriteBase = {
  /** filename *without* the .png file ending inside textures/. Example: You have a file textures/orc.png, then set "texturename": "orc" */
  texturename: string;
  /**
   * The x value of the top-left of this sprite in the texture. x=0,y=0 is the top-left corner of the texture.
   */
  xloc: Integer;
  /**
   * The y value of the top-left of this sprite in the texture. x=0,y=0 is the top-left corner of the texture.
   */
  yloc: Integer;
};

export type DmItemSprite = DmSpriteBase;
/** A map from entityDefName to the values inside that entitydef. The name will appear in `entityDef "<NAME_HERE>". The value is used to generate the body of the entityDef. */
export type DmItemSprites = {
  [entityDefName: string]: DmItemSprite;
};

export type DmMonsterSprite = DmSpriteBase & {
  /**
   * The width of your sprite within the texture.
   * Only needed for monsters, npcs, and other actors. Not needed for Item sprites.
   * @default 80
   */
  width: Integer;
  /**
   * The height of your sprite within the texture.
   * Only needed for monsters, npcs, and other actors. Not needed for Item sprites.
   * @default 128
   */
  height: Integer;
};

/** A map from entityDefName to the values inside that entitydef. The name will appear in `entityDef "<NAME_HERE>". The value is used to generate the body of the entityDef. */
export type DmMonsterSprites = {
  [entityDefName: string]: DmMonsterSprite;
};

/** Dictionary from entityDef name to DmMonsterSprite or DmItemSprite. */
export type DmSprites = {
  [entityDefName: string]: DmMonsterSprite | DmItemSprite;
};
