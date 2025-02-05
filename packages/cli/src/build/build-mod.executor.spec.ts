import * as fsp from 'node:fs/promises';
import path from 'path';
import { FileSystem } from '../utils/filesystem.js';
import { ModBuilder } from './build-mod.executor.js';

let fs: FileSystem;

const srcDir = path.join(__dirname, 'test', 'input', 'src');
const outDir = path.join(__dirname, 'test', 'out');

beforeEach(async () => {
  fs = new FileSystem({});
  if (fs.exists(outDir)) await fsp.rm(outDir, { recursive: true });
});

describe('JSON to entity defs', () => {
  it('turns json into multiple entity defs in a single file', async () => {
    const outfile = 'monsters-many.txt';
    const emittedFilePath = path.join(outDir, 'actordata', outfile);
    const builder = new ModBuilder(srcDir, outDir);

    await builder.run();

    const contents = await fs.readFile(emittedFilePath);
    expect(contents).toEqual(`entityDef "tstt_actor_evil"
{
    attack_sfx ""
    level 1
    class "dmMonster"
    sprite "tstt_sprite_evil"
}

entityDef "tstt_actor_another"
{
    class "dmMonster"
    meleedamage_01 "somemeleedamage"
}
`);
  });

  it('emits the output with ref prefix stripped', async () => {
    const outfile = 'monsters-with-ref.txt';
    const outDir = path.join(__dirname, 'test', 'out');
    const emittedFilePath = path.join(outDir, 'actordata', outfile);
    const builder = new ModBuilder(srcDir, outDir, { refPrefix: '@ref_' });

    await builder.run();

    const contents = await fs.readFile(emittedFilePath);
    expect(contents).toEqual(`entityDef "tstt_actor_evil_ref"
{
    sprite "tstt_sprite_evil"
}
`);
  });
});

describe('C# csharp', () => {
  it('copies .cs files ', async () => {
    const outfile = 'myscript.cs';
    const outDir = path.join(__dirname, 'test', 'out');
    const emittedFilePath = path.join(outDir, 'code', outfile);
    const srcfile = path.join(srcDir, 'code', outfile);
    const builder = new ModBuilder(srcDir, outDir);

    await builder.run();

    const outfileContents = await fs.readFile(emittedFilePath);
    const srcfileContents = await fs.readFile(srcfile);
    expect(outfileContents).toEqual(srcfileContents);
  });
});

describe('Plain text', () => {
  it('copies .txt files in src dir', async () => {
    const outfile = 'modinfo.txt';
    const outDir = path.join(__dirname, 'test', 'out');
    const emittedFilePath = path.join(outDir, outfile);
    const srcfile = path.join(srcDir, outfile);
    const builder = new ModBuilder(srcDir, outDir);

    await builder.run();

    const outfileContents = await fs.readFile(emittedFilePath);
    const srcfileContents = await fs.readFile(srcfile);
    expect(outfileContents).toEqual(srcfileContents);
  });

  it('copies .txt files in sub dirs of src dir', async () => {
    const outfile = 'plaintext-monsters.txt';
    const outDir = path.join(__dirname, 'test', 'out');
    const emittedFilePath = path.join(outDir, 'actordata', outfile);
    const srcfile = path.join(srcDir, 'actordata', outfile);
    const builder = new ModBuilder(srcDir, outDir);

    await builder.run();

    const outfileContents = await fs.readFile(emittedFilePath);
    const srcfileContents = await fs.readFile(srcfile);
    expect(outfileContents).toEqual(srcfileContents);
  });
});
