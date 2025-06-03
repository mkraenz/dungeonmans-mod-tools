export type DmBirdTexture = {
  /** The type of class. Constant. */
  class: 'dmBirdTexture';
  /** Display name */
  name: string;
  /** filename *without* the .png file ending inside textures/. Example: You have a file textures/bird.png, then set "texturename": "bird" */
  basetexture: string;
  /** filename *without* the .png file ending inside textures/. Example: You have a file textures/bird_mask.png, then set "texturename": "bird_mask" */
  masktexture: string;
};

/**
 * Dictionary from entitydef name to DmBirdTexture.
 */
export type DmBirdTextures = {
  [entityDefName: string]: DmBirdTexture;
};
