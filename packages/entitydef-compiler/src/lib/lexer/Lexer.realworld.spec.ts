import { Lexer } from './Lexer.js';

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

  expect(lexer.tokens.map((t) => t.prettyPrint(source))).toEqual([
    'ENTITY_DEF entitydef 1:1 - 1:10',
    'STRING "modmans_mod_mold_sprite" 1:11 - 1:36',
    'EOL  2:0 - 2:1',
    'LEFT_BRACE { 2:1 - 2:2',
    'EOL  3:0 - 3:1',
    'IDENTIFIER texturename 3:3 - 3:14',
    'IDENTIFIER monster_sprites 3:15 - 3:30',
    'EOL  4:0 - 4:1',
    'IDENTIFIER xloc 4:3 - 4:7',
    'NUMBER 0 4:8 - 4:9',
    'EOL  5:0 - 5:1',
    'IDENTIFIER yloc 5:3 - 5:7',
    'NUMBER 0 5:8 - 5:9',
    'EOL  6:0 - 6:1',
    'IDENTIFIER width 6:3 - 6:8',
    'NUMBER 80 6:9 - 6:11',
    'EOL  7:0 - 7:1',
    'IDENTIFIER height 7:3 - 7:9',
    'NUMBER 128 7:10 - 7:13',
    'EOL  8:0 - 8:1',
    'RIGHT_BRACE } 8:1 - 8:2',
    'EOF  8:2 - 8:2',
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

  expect(lexer.tokens.map((t) => t.prettyPrint(source))).toEqual([
    'ENTITY_DEF entityDef 1:1 - 1:10',
    'STRING "modmans_mod_mold" 1:11 - 1:29',
    'EOL  2:0 - 2:1',
    'LEFT_BRACE { 2:1 - 2:2',
    'EOL  3:0 - 3:1',
    'IDENTIFIER class 3:5 - 3:10',
    'IDENTIFIER dmMonster 3:22 - 3:31',
    'EOL  4:0 - 4:1',
    'IDENTIFIER bBlockTileEntry 4:5 - 4:20',
    'TRUE true 4:24 - 4:28',
    'EOL  5:0 - 5:1',
    'IDENTIFIER sprite 5:5 - 5:11',
    'IDENTIFIER modmans_mod_mold_sprite 5:23 - 5:46',
    'EOL  6:0 - 6:1',
    'IDENTIFIER name 6:5 - 6:9',
    'STRING "Mod Mold" 6:21 - 6:31',
    'EOL  7:0 - 7:1',
    'IDENTIFIER health 7:5 - 7:11',
    'NUMBER 24 7:23 - 7:25',
    'EOL  8:0 - 8:1',
    'EOL  9:0 - 9:1',
    'IDENTIFIER level 9:5 - 9:10',
    'NUMBER 2 9:22 - 9:23',
    'EOL  10:0 - 10:1',
    'EOL  11:0 - 11:1',
    'IDENTIFIER scale_min 11:5 - 11:14',
    'NUMBER 1 11:22 - 11:23',
    'EOL  12:0 - 12:1',
    'IDENTIFIER scale_max 12:5 - 12:14',
    'NUMBER 3 12:22 - 12:23',
    'EOL  13:0 - 13:1',
    'EOL  14:0 - 14:1',
    'IDENTIFIER scale_adjusthealth 14:5 - 14:23',
    'NUMBER -0.1 14:27 - 14:31',
    'EOL  15:0 - 15:1',
    'IDENTIFIER scale_adjustdamage 15:5 - 15:23',
    'NUMBER -0.1 15:27 - 15:31',
    'EOL  16:0 - 16:1',
    'EOL  17:0 - 17:1',
    'IDENTIFIER meleedamage_01 17:5 - 17:19',
    'IDENTIFIER melee,1,0 17:27 - 17:36',
    'EOL  18:0 - 18:1',
    'IDENTIFIER meleedamage_02 18:5 - 18:19',
    'IDENTIFIER poison,1,0 18:27 - 18:37',
    'EOL  19:0 - 19:1',
    'EOL  20:0 - 20:1',
    'IDENTIFIER nametable 20:5 - 20:14',
    'IDENTIFIER critter_name_chart 20:22 - 20:40',
    'EOL  21:0 - 21:1',
    'IDENTIFIER hasRanged 21:5 - 21:14',
    'FALSE false 21:22 - 21:27',
    'EOL  22:0 - 22:1',
    'EOL  23:0 - 23:1',
    'IDENTIFIER knowledge 23:5 - 23:14',
    'IDENTIFIER lesser_beasts 23:22 - 23:35',
    'EOL  24:0 - 24:1',
    'EOL  25:0 - 25:1',
    'IDENTIFIER base_defeatarmor 25:5 - 25:21',
    'NUMBER 2 25:25 - 25:26',
    'EOL  26:0 - 26:1',
    'EOL  27:0 - 27:1',
    'IDENTIFIER basicattackparticle 27:5 - 27:24',
    'IDENTIFIER particle_attack_weapon_pierce 27:28 - 27:57',
    'EOL  28:0 - 28:1',
    'IDENTIFIER attack_sfx 28:5 - 28:15',
    'IDENTIFIER monster_attack_claw 28:27 - 28:46',
    'EOL  29:0 - 29:1',
    'EOL  30:0 - 30:1',
    'IDENTIFIER power_01 30:5 - 30:13',
    'IDENTIFIER sp_so_many_bites 30:25 - 30:41',
    'EOL  31:0 - 31:1',
    'EOL  32:0 - 32:1',
    'IDENTIFIER steakdata 32:5 - 32:14',
    'STRING "100,0,1,sp_so_many_bites" 32:26 - 32:52',
    'EOL  33:0 - 33:1',
    'EOL  34:0 - 34:1',
    'IDENTIFIER banter 34:5 - 34:11',
    'IDENTIFIER creature 34:23 - 34:31',
    'EOL  35:0 - 35:1',
    'RIGHT_BRACE } 35:1 - 35:2',
    'EOF  35:2 - 35:2',
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

  expect(lexer.tokens.map((t) => t.prettyPrint(source))).toEqual([
    'ENTITY_DEF entityDef 1:1 - 1:10',
    'STRING "modmans_warrens_encounters" 1:11 - 1:39',
    'EOL  2:0 - 2:1',
    'LEFT_BRACE { 2:1 - 2:2',
    'EOL  3:0 - 3:1',
    'IDENTIFIER addtotable_01 3:2 - 3:15',
    'IDENTIFIER encounter_list_scrobold_01 3:16 - 3:42',
    'EOL  4:0 - 4:1',
    'IDENTIFIER addtotable_02 4:2 - 4:15',
    'IDENTIFIER encounter_list_scrobold_02 4:16 - 4:42',
    'EOL  5:0 - 5:1',
    'IDENTIFIER addtotable_03 5:2 - 5:15',
    'IDENTIFIER encounter_list_scrobold_03 5:16 - 5:42',
    'EOL  6:0 - 6:1',
    'EOL  7:0 - 7:1',
    'STRING "one_modmold" 7:2 - 7:15',
    'NUMBER 10 7:17 - 7:19',
    'EOL  8:0 - 8:1',
    'STRING "some_modmolds" 8:2 - 8:17',
    'NUMBER 10 8:19 - 8:21',
    'EOL  9:0 - 9:1',
    'RIGHT_BRACE } 9:1 - 9:2',
    'EOF  9:2 - 9:2',
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
 
 }`; // the "[t1] ''[t2]'' [t3]" looks troublesome but seems to be fine

  const lexer = new Lexer(source);

  lexer.tokenize();

  expect(lexer.tokens.map((t) => t.prettyPrint(source))).toEqual([
    'ENTITY_DEF entityDef 1:1 - 1:10',
    'STRING "bandit_name_chart" 1:11 - 1:30',
    'EOL  2:0 - 2:1',
    'LEFT_BRACE { 2:1 - 2:2',
    'EOL  3:0 - 3:1',
    'IDENTIFIER table_1 3:4 - 3:11',
    'IDENTIFIER humanoid_bandit_firstname 3:12 - 3:37',
    'EOL  4:0 - 4:1',
    'IDENTIFIER table_2 4:4 - 4:11',
    'IDENTIFIER humanoid_bandit_nickname 4:12 - 4:36',
    'EOL  5:0 - 5:1',
    'IDENTIFIER table_3 5:4 - 5:11',
    'IDENTIFIER humanoid_bandit_lastname 5:12 - 5:36',
    'EOL  6:0 - 6:1',
    'IDENTIFIER table_4 6:4 - 6:11',
    'IDENTIFIER backer_enemy_human 6:12 - 6:30',
    'EOL  7:0 - 7:1',
    'EOL  8:0 - 8:1',
    `STRING "[t1] ''[t2]'' [t3]" 8:4 - 8:24`,
    'NUMBER 10 8:27 - 8:29',
    'EOL  9:0 - 9:1',
    'STRING "[t2] [t1]" 9:4 - 9:15',
    'NUMBER 5 9:28 - 9:29',
    'EOL  10:0 - 10:1',
    'STRING "[t2] [t3]" 10:4 - 10:15',
    'NUMBER 5 10:28 - 10:29',
    'EOL  11:0 - 11:1',
    'STRING "[t4]" 11:4 - 11:10',
    'NUMBER 2 11:23 - 11:24',
    'EOL  12:0 - 12:1',
    'EOL  13:0 - 13:1',
    'RIGHT_BRACE } 13:2 - 13:3',
    'EOF  13:3 - 13:3',
  ]);
});

it('works for banter with code-driven substitution', () => {
  const source = `entityDef "decoy_not_fooled_banter_common"
{
	"^5[s1]^7 chuckles: ^3Fool me once...!^7"									1
}`;
  const lexer = new Lexer(source);

  lexer.tokenize();

  expect(lexer.tokens.map((t) => t.prettyPrint(source))).toEqual([
    'ENTITY_DEF entityDef 1:1 - 1:10',
    'STRING "decoy_not_fooled_banter_common" 1:11 - 1:43',
    'EOL  2:0 - 2:1',
    'LEFT_BRACE { 2:1 - 2:2',
    'EOL  3:0 - 3:1',
    'STRING "^5[s1]^7 chuckles: ^3Fool me once...!^7" 3:2 - 3:43',
    'NUMBER 1 3:52 - 3:53',
    'EOL  4:0 - 4:1',
    'RIGHT_BRACE } 4:1 - 4:2',
    'EOF  4:2 - 4:2',
  ]);
});
