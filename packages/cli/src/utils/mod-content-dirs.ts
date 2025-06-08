export const modContentDirs = [
  'academydata',
  'actordata',
  'birdtexturedata',
  'code',
  'dungeondata',
  'encounterdata',
  'gamesystemdata',
  'itemdata',
  'overworldgenerationdata',
  'plotdata',
  'setbonusdata',
  'specialpowerdata',
  'spritedata',
  'statuseffectdata',
  'tabledata',
  'textures',
] as const;
export type ModContentDirType = (typeof modContentDirs)[number];
