import { jsToManyEntityDefs } from './js-to-many-entitydefs.js';

const example = {
  $schema: 'someschema.json',
  tstt_sprite_axe_ze_stronkest: {
    texturename: 'tstt_tex_weapons',
    xloc: 192,
    yloc: 0,
  },
  tstt_sprite_pruuf_of_stronkestnis: {
    texturename: 'tstt_tex_weapons',
    xloc: 0,
    yloc: 64,
  },
  tstt_sprite_wolf_head: {
    '// TODO': 'placeholder image',
    texturename: 'tstt_tex_weapons',
    xloc: 64,
    yloc: 0,
  },
  tstt_sprite_troll_head: {
    '// TODO': 'placeholder image',
    texturename: 'tstt_tex_weapons',
    xloc: 128,
    yloc: 0,
  },
};

it('', () => {
  // @ts-expect-error -- $schema is making this invalid but its being handled. Adjusting the type in the production code is not worth it.
  const x = jsToManyEntityDefs(example);

  expect(x).toEqual(`entityDef "tstt_sprite_axe_ze_stronkest"
{
    texturename "tstt_tex_weapons"
    xloc 192
    yloc 0
}

entityDef "tstt_sprite_pruuf_of_stronkestnis"
{
    texturename "tstt_tex_weapons"
    xloc 0
    yloc 64
}

entityDef "tstt_sprite_wolf_head"
{
    texturename "tstt_tex_weapons"
    xloc 64
    yloc 0
}

entityDef "tstt_sprite_troll_head"
{
    texturename "tstt_tex_weapons"
    xloc 128
    yloc 0
}
`);
});
