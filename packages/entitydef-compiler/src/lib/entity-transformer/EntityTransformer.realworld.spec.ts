import { Lexer } from '../lexer/Lexer.js';
import { JsonTransformer } from './EntityTransformer.js';

it('works for a sprite entityDef', () => {
  // from https://dungeonmans.fandom.com/wiki/Mods:_Adding_Monsters
  const source = `entitydef "modmans_mod_mold_sprite"
{
  texturename monster_sprites
  xloc 0
  yloc 0
  width 80
  height 128
}`;
  const lexer = new Lexer(source);
  lexer.tokenize();
  const transform = new JsonTransformer(lexer.tokens, 'somefilepath');

  transform.transform();

  expect(transform.toArray()).toEqual([
    {
      filepath: 'somefilepath',
      entity: {
        xloc: 0,
        yloc: 0,
        texturename: 'monster_sprites',
        width: 80,
        height: 128,
      },
      name: 'modmans_mod_mold_sprite',
    },
  ]);
});

it('works for a monster entityDef', () => {
  // from https://dungeonmans.fandom.com/wiki/Mods:_Adding_Monsters
  const source = `entityDef "modmans_mod_mold"
{
    class            dmMonster
    bBlockTileEntry    true
    sprite            modmans_mod_mold_sprite
    name            "Mod Mold"
    health            24

    level            2
    
    scale_min        1
    scale_max        3

    scale_adjusthealth    -0.1
    scale_adjustdamage    -0.1
    
    meleedamage_01        melee,1,0
    meleedamage_02        poison,1,0

    nametable        critter_name_chart
    hasRanged        false

    knowledge        lesser_beasts

    base_defeatarmor    2

    basicattackparticle    particle_attack_weapon_pierce
    attack_sfx            monster_attack_claw

    power_01            sp_so_many_bites

    steakdata            "100,0,1,sp_so_many_bites"

    banter            creature
}`;
  const lexer = new Lexer(source);
  lexer.tokenize();
  const transform = new JsonTransformer(lexer.tokens, 'somefilepath');

  transform.transform();

  expect(transform.toArray()).toEqual([
    {
      filepath: 'somefilepath',
      entity: {
        class: 'dmMonster',
        bBlockTileEntry: true,
        sprite: 'modmans_mod_mold_sprite',
        name: 'Mod Mold',
        health: 24,
        level: 2,
        scale_min: 1,
        scale_max: 3,
        scale_adjusthealth: -0.1,
        scale_adjustdamage: -0.1,
        meleedamage_01: 'melee,1,0',
        meleedamage_02: 'poison,1,0',
        nametable: 'critter_name_chart',
        hasRanged: false,
        knowledge: 'lesser_beasts',
        base_defeatarmor: 2,
        basicattackparticle: 'particle_attack_weapon_pierce',
        attack_sfx: 'monster_attack_claw',
        power_01: 'sp_so_many_bites',
        steakdata: '100,0,1,sp_so_many_bites',
        banter: 'creature',
      },
      name: 'modmans_mod_mold',
    },
  ]);
});

it('works for monster tables', () => {
  const source = `entityDef "modmans_warrens_encounters"
{
    addtotable_01	encounter_list_scrobold_01
    addtotable_02	encounter_list_scrobold_02
    addtotable_03	encounter_list_scrobold_03

    "one_modmold"		10
    "some_modmolds"		10
}`;
  const lexer = new Lexer(source);
  lexer.tokenize();
  const transform = new JsonTransformer(lexer.tokens, 'somefilepath');

  transform.transform();

  expect(transform.toArray()).toEqual([
    {
      filepath: 'somefilepath',
      entity: {
        addtotable_01: 'encounter_list_scrobold_01',
        addtotable_02: 'encounter_list_scrobold_02',
        addtotable_03: 'encounter_list_scrobold_03',
        one_modmold: 10,
        some_modmolds: 10,
      },
      name: 'modmans_warrens_encounters',
    },
  ]);
});

it('works for tables using results from other tables', () => {
  const source = `entityDef "bandit_name_chart"
{
   table_1 humanoid_bandit_firstname
   table_2 humanoid_bandit_nickname
   table_3 humanoid_bandit_lastname
   table_4 backer_enemy_human

   "[t1] ''[t2]'' [t3]"   10
   "[t2] [t1]"             5
   "[t2] [t3]"             5
   "[t4]"             2
 
 }`;
  const lexer = new Lexer(source);
  lexer.tokenize();
  const transform = new JsonTransformer(lexer.tokens, 'somefilepath');

  transform.transform();

  expect(transform.toArray()).toEqual([
    {
      filepath: 'somefilepath',
      entity: {
        table_1: 'humanoid_bandit_firstname',
        table_2: 'humanoid_bandit_nickname',
        table_3: 'humanoid_bandit_lastname',
        table_4: 'backer_enemy_human',
        "[t1] ''[t2]'' [t3]": 10,
        '[t2] [t1]': 5,
        '[t2] [t3]': 5,
        '[t4]': 2,
      },
      name: 'bandit_name_chart',
    },
  ]);
});

it('works for banter with code-driven substitution', () => {
  const source = `entityDef "decoy_not_fooled_banter_common"
{
    "^5[s1]^7 chuckles: ^3Fool me once...!^7"									1
}`;
  const lexer = new Lexer(source);
  lexer.tokenize();
  const transform = new JsonTransformer(lexer.tokens, 'somefilepath');

  transform.transform();

  expect(transform.toArray()).toEqual([
    {
      filepath: 'somefilepath',
      entity: {
        '^5[s1]^7 chuckles: ^3Fool me once...!^7': 1,
      },
      name: 'decoy_not_fooled_banter_common',
    },
  ]);
});

it('works for a whole file', () => {
  // This is a real-world example from Dungeonmans, taken from <dmans steam install dir>/Dungeonmans/Content/ActorData/generic_monsters_11.txt
  const source = `entityDef "elemental_hydra"
{
    class			dmMonster
    bBlockTileEntry	true
    sprite			elemental_hydra_sprite
    name			"Elemental Hydra"
    health			3d20+80
    cointype		copper_coins_small
    // throw in some comment
    level			11
    
    hitBonus		90
    meleedamage		random,3d12+30,0
    armor			6
    parry			0
    block			0
    dodge			80

    basicattackparticle	particle_attack_weapon_bite
    attack_sfx			monster_attack_bite

    banter				creature
    nametable			critter_name_chart
    knowledge			greater_beasts

    hasRanged		false
}	

// throw in some other comment


entityDef "explosive_pouncebiter"
{
    class			dmMonster
    level			11
    bBlockTileEntry	true
    sprite			explosive_pouncebiter_sprite
    name			"Ruby Hooded Flamepouncer"
    health			60
    cointype		copper_coins_small
    
    hitBonus		90
    meleedamage		melee,2d4+34,0
    meleedamage02	fire,16,0

    armor			0
    parry			0
    block			0
    dodge			90

    basicattackparticle	particle_attack_weapon_bite
    attack_sfx			monster_attack_bite

    banter				creature
    nametable			critter_name_chart
    knowledge			greater_beasts

    power_1		sp_pounce_and_bite

    championpower_1	sp_stalked_by_beasts
}


entityDef "brigand_cryoduchess"
{
    class			dmMonster
    bBlockTileEntry	true
    sprite			brigand_cryoduchess_sprite
    name			"Brigand Cryoduchess"
    health			180
    cointype		copper_coins_small
    
    level			11

    scale_min			10
    scale_max			11

    scale_adjusthealth -0.3
    
    hitBonus		100
    meleedamage		ice,2d4+16,0
    armor			0
    parry			0
    block			0
    dodge			95
    
    hasRanged		false

    gender				female
    banter				bandit
    nametable			bandit_name_chart
    
    knowledge			brigands


    power_1			sp_bandit_ice_dagger_rank_2
    power_3			sp_frozen_armor_hateglacier
    power_4			sp_enemy_coldnado
    power_2			sp_rhombus_of_rime_enemy_rank_2

    championpower_01	sp_spawn_cryopulse
}


entityDef "purpleonian_centaur"
{
    class			dmMonster
    
    bBlockTileEntry	true
    sprite			purpleonian_centaur_sprite
    name			"Ascended Cavalier"
    health			700
    cointype		copper_coins_small

    hitBonus		60
    meleedamage01	melee,2d6+30,0
    meleedamage02	fire,2d6+30,0

    damagetaken01	dark,0,-1.0
    damagetaken02	starlight,0,0.2
    damagetaken03	ice,0,-0.2
    damagetaken04	fire,0,-0.2
    damagetaken05	poison,0,-0.5

    armor			2
    parry			10
    block			30
    dodge			70
    
    scale_min		11
    scale_max		15

    scale_adjusthealth	1.0
    scale_adjustdamage	0.2
    
    tag1 purpleonian
    
    basicattackparticle	particle_attack_weapon_pierce
    attack_sfx			weapon_1h_axe_hit
    nametable	purple_name_chart
    banter		purple
    knowledge	purpleonians


    power_01			sp_dread_purple_charge
    power_02			sp_high_guard

    championpower_01	sp_dread_spear_toss
}
`;

  const lexer = new Lexer(source);
  lexer.tokenize();
  const transform = new JsonTransformer(lexer.tokens, 'somefilepath');

  transform.transform();

  expect(transform.toArray()).toEqual([
    {
      filepath: 'somefilepath',
      entity: {
        class: 'dmMonster',
        bBlockTileEntry: true,
        sprite: 'elemental_hydra_sprite',
        name: 'Elemental Hydra',
        health: '3d20+80',
        cointype: 'copper_coins_small',
        level: 11,
        hitBonus: 90,
        meleedamage: 'random,3d12+30,0',
        armor: 6,
        parry: 0,
        block: 0,
        dodge: 80,
        basicattackparticle: 'particle_attack_weapon_bite',
        attack_sfx: 'monster_attack_bite',
        banter: 'creature',
        nametable: 'critter_name_chart',
        knowledge: 'greater_beasts',
        hasRanged: false,
      },
      name: 'elemental_hydra',
    },
    {
      filepath: 'somefilepath',
      name: 'explosive_pouncebiter',
      entity: {
        class: 'dmMonster',
        level: 11,
        bBlockTileEntry: true,
        sprite: 'explosive_pouncebiter_sprite',
        name: 'Ruby Hooded Flamepouncer',
        health: 60,
        cointype: 'copper_coins_small',
        hitBonus: 90,
        meleedamage: 'melee,2d4+34,0',
        meleedamage02: 'fire,16,0',
        armor: 0,
        parry: 0,
        block: 0,
        dodge: 90,
        basicattackparticle: 'particle_attack_weapon_bite',
        attack_sfx: 'monster_attack_bite',
        banter: 'creature',
        nametable: 'critter_name_chart',
        knowledge: 'greater_beasts',
        power_1: 'sp_pounce_and_bite',
        championpower_1: 'sp_stalked_by_beasts',
      },
    },
    {
      filepath: 'somefilepath',
      name: 'brigand_cryoduchess',
      entity: {
        class: 'dmMonster',
        bBlockTileEntry: true,
        banter: 'bandit',
        nametable: 'bandit_name_chart',
        knowledge: 'brigands',
        power_1: 'sp_bandit_ice_dagger_rank_2',
        power_2: 'sp_rhombus_of_rime_enemy_rank_2',
        power_3: 'sp_frozen_armor_hateglacier',
        power_4: 'sp_enemy_coldnado',
        championpower_01: 'sp_spawn_cryopulse',
        gender: 'female',
        sprite: 'brigand_cryoduchess_sprite',
        name: 'Brigand Cryoduchess',
        health: 180,
        cointype: 'copper_coins_small',
        level: 11,
        scale_min: 10,
        scale_max: 11,
        scale_adjusthealth: -0.3,
        hitBonus: 100,
        meleedamage: 'ice,2d4+16,0',
        armor: 0,
        parry: 0,
        block: 0,
        dodge: 95,
        hasRanged: false,
      },
    },
    {
      filepath: 'somefilepath',
      name: 'purpleonian_centaur',
      entity: {
        class: 'dmMonster',
        bBlockTileEntry: true,
        sprite: 'purpleonian_centaur_sprite',
        name: 'Ascended Cavalier',
        health: 700,
        cointype: 'copper_coins_small',
        hitBonus: 60,
        meleedamage01: 'melee,2d6+30,0',
        meleedamage02: 'fire,2d6+30,0',
        damagetaken01: 'dark,0,-1.0',
        damagetaken02: 'starlight,0,0.2',
        damagetaken03: 'ice,0,-0.2',
        damagetaken04: 'fire,0,-0.2',
        damagetaken05: 'poison,0,-0.5',
        armor: 2,
        parry: 10,
        block: 30,
        dodge: 70,
        scale_min: 11,
        scale_max: 15,
        scale_adjusthealth: 1.0,
        scale_adjustdamage: 0.2,
        tag1: 'purpleonian',
        basicattackparticle: 'particle_attack_weapon_pierce',
        attack_sfx: 'weapon_1h_axe_hit',
        nametable: 'purple_name_chart',
        banter: 'purple',
        knowledge: 'purpleonians',
        power_01: 'sp_dread_purple_charge',
        power_02: 'sp_high_guard',
        championpower_01: 'sp_dread_spear_toss',
      },
    },
  ]);
});
