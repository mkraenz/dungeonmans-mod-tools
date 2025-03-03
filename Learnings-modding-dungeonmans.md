# Learnings modding Dungeonmans

- Namespace your mod
  - use a prefix for every single entity, e.g. if you mod is named Crushing More Bestest use the prefix `cmb_` for every entity.
- Unique entity names
  - This avoids hard-to-fix bugs with your mod. Tipp: You can prefix or suffix each entity by folder, for example, entities in `spritedata/` could always start with `sprite_`.
- Ingame Console
  - [Docs](https://dungeonmans.fandom.com/wiki/Mod_Packages) on how to enable the ingame console in Dungeonmans
  - Spawn monsters using `spawn <monstername>`
    - if you namespaced your mod, you can use `spawn <prefix>` and it will list all your monsters!
    - In general, typing `spawn <first few letters>` gives you a list of suggested monsters that contain those letters.
    - Spawn your mod monsters with the console open. The console may print some error message to help you debug.
- Add the `class` or `classtype` property first
  - good IDE support for JSONs requires the IDE to have at least some info of what you are trying to achieve.
  - Similar to a programming language where you declare `int myvariabl` and the IDE starts giving you better hints on how to integers, it works for the JSON files in your mod, too.
  - So start with adding `class` (or `classtype` for some types of entities) to help your IDE help you.
- Tools aren't perfect
  - The tools we provide are far from perfect. The JSON schemas in particular are approximations of the real thing and some options or combinition of options may be supported by Dungeonmans that are not listed in the JSON schemas. Don't be afraid if the JSON schemas give you an error/warning. If you are sure that something works, it probably does. If you find such a case, please help us make the Dungeonmans Dev Tools better by reporting on [GitHub](https://github.com/mkraenz/dungeonmans-mod-tools/issues). Other people can benifit from your findings.

## Cheatsheet

### Add monster

- image in `texturedata/`
- sprite in `spritedata/`
- monster in `actordata/`
- encounter in `encounterdata/`
- table in `tabledata/`

### Npc

- image in `texturedata/`
- sprite in `spritedata/`
- dialog in `plotdata/` - `classType: dmDialogData`
- extraactor in `academydata/`
- npc in `actordata/` - `class: dmTownsmans`

## Ingame Console Commands

```log
spawn [monster archetype] [x] [y]
spawnmonster [monster archetype] [champ|boss|king|echo]
```
