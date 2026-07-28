import * as fsp from 'node:fs/promises';
import path from 'path';
import { FileSystem } from '../utils/filesystem.js';
import { ModBuilder } from './build-mod.executor.js';

let fs: FileSystem;

const dirName = __dirname;
const srcDir = path.join(dirName, 'test', 'input', 'src');
const tmpSrcDir = path.join(dirName, 'test', 'input-tmp', 'src');
const outDir = path.join(dirName, 'test', 'out');

beforeEach(async () => {
  fs = new FileSystem({});
  if (fs.exists(outDir)) await fsp.rm(outDir, { recursive: true });
  if (fs.exists(tmpSrcDir)) await fsp.rm(tmpSrcDir, { recursive: true });

  // avoid spamming the console
  jest.spyOn(console, 'log').mockImplementation();
  jest.spyOn(console, 'warn').mockImplementation();
  jest.spyOn(console, 'error').mockImplementation();
});

afterAll(async () => {
  if (fs.exists(tmpSrcDir)) await fsp.rm(tmpSrcDir, { recursive: true });
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

  it('emits the output with refs stripped', async () => {
    const outfile = 'monsters-with-ref.txt';
    const outDir = path.join(dirName, 'test', 'out');
    const emittedFilePath = path.join(outDir, 'actordata', outfile);
    const builder = new ModBuilder(srcDir, outDir);

    await builder.run();

    const contents = await fs.readFile(emittedFilePath);
    expect(contents).toEqual(`entityDef "tstt_actor_evil_ref"
{
    sprite "tstt_sprite_evil"
}
`);
  });

  it('emits the output with refs stripped from keys', async () => {
    const outfile = 'monsters-with-ref-in-key.txt';
    const outDir = path.join(dirName, 'test', 'out');
    const emittedFilePath = path.join(outDir, 'actordata', outfile);
    const builder = new ModBuilder(srcDir, outDir);

    await builder.run();

    const contents = await fs.readFile(emittedFilePath);
    expect(contents).toEqual(`entityDef "tstt_actor_mon_key_ref"
{
    tstt_something 123
}
`);
  });

  it('emits the output with refs stripped from both keys and values', async () => {
    const outfile = 'monsters-with-ref-in-key-and-val.txt';
    const outDir = path.join(dirName, 'test', 'out');
    const emittedFilePath = path.join(outDir, 'actordata', outfile);
    const builder = new ModBuilder(srcDir, outDir);

    await builder.run();

    const contents = await fs.readFile(emittedFilePath);
    expect(contents).toEqual(`entityDef "tstt_actor_mon_key_val_ref"
{
    tstt_some_key "tstt_1,0,tstt_2,100,1"
}
`);
  });
});

describe('C# csharp', () => {
  it('copies .cs files ', async () => {
    const outfile = 'myscript.cs';
    const outDir = path.join(dirName, 'test', 'out');
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
    const outDir = path.join(dirName, 'test', 'out');
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
    const outDir = path.join(dirName, 'test', 'out');
    const emittedFilePath = path.join(outDir, 'actordata', outfile);
    const srcfile = path.join(srcDir, 'actordata', outfile);
    const builder = new ModBuilder(srcDir, outDir);

    await builder.run();

    const outfileContents = await fs.readFile(emittedFilePath);
    const srcfileContents = await fs.readFile(srcfile);
    expect(outfileContents).toEqual(srcfileContents);
  });
});

describe('error case', () => {
  it('exists with error code 1 if some error is found', async () => {
    const outfile = 'broken.json';
    const srcfile = path.join(tmpSrcDir, 'actordata', outfile);
    await fs.makeDir(path.join(tmpSrcDir, 'actordata'));
    await fs.writeFile(srcfile, '{}notAValidJson');
    const mockExit = jest.spyOn(process, 'exit').mockImplementation();
    const builder = new ModBuilder(tmpSrcDir, outDir);

    await builder.run();

    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
