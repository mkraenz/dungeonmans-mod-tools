# Dungeonmans Mod Tools CLI

CLI to help you develop Mod Content for Dungeonmans.

![CLI basic usage demo](https://raw.githubusercontent.com/mkraenz/dungeonmans-mod-tools/refs/heads/main/docs/external/dungeonmans-modding-tools-cli-demo.gif)

## Why should I use this?

If you want to create a mod for Dungeonmans, we recommend you use our [nifty CLI tool](https://www.npmjs.com/package/@dungeonmans-mod-tools/cli) to create a new mod project. Assuming your text editor/IDE supports it, you will get

- Autocompletion
- Type Hinting
- Hover-over documentation

for your mod files. Your text editor needs to be able to provide these features from JSON Schemas. If you don't know how to set this up for your text editor, VS Code does a great job at this out-of-the-box. We set things up for VS Code automatically so you can immediately start building your awesome mod.

### Background

Dungeonmans defines most content in a custom **plain text format** called **EntityDefs**. While you can certainly write monsters, items etc by hand, you don't get any quality of life features. Using the CLI tool, you can write your content in JSON files and then build them into EntityDefs. This way you can use your text editor's features to help you write your mod.

## Prerequisites

You may need Node v24+.

Works on Ubuntu and Windows (at least with Git Bash).

## Get Started

```sh
# Initialize a new mod project.
npx @dungeonmans-mod-tools/cli init <directory> <modName>
# Build your mod.
npx @dungeonmans-mod-tools/cli build <srcDir> <outDir>

# Help including examples for each command.
npx @dungeonmans-mod-tools/cli help
npx @dungeonmans-mod-tools/cli init --help
npx @dungeonmans-mod-tools/cli build --help

# More
npx @dungeonmans-mod-tools/cli version
npx @dungeonmans-mod-tools/cli schemas --editor custom
```

Tested on Ubuntu 22.04, Windows 10.

## Init command

`npx @dungeonmans-mod-tools/cli build --help`

```log
Usage: @dungeonmans-mod-tools/cli init [options] <directory> <modName>

Initialize a new mod project.

Arguments:
  directory   Directory to create and initialize your mod in
  modName     Name of your mod

Options:
  --dry-run   Simulate the execution of the command without actually changing anything.
  --verbose   Print additional info.
  -h, --help  display help for command

    Example A:                @dungeonmans-mod-tools/cli init myawesomemod supermod
    Example B:                @dungeonmans-mod-tools/cli init somepath/somedir/myawesomemod supermod
    Example C:                @dungeonmans-mod-tools/cli init somepath/somedir/myawesomemod 'Best Mod Eva'
    Example D (dry-run):      @dungeonmans-mod-tools/cli init myawesomemod supermod --dry-run
```

## Build command

`npx @dungeonmans-mod-tools/cli build --help`

```log
Usage: @dungeonmans-mod-tools/cli build [options] <srcDir> <outDir>

Build your mod into entitydefs for copy-and-paste into the Dungeonmans mod directory.

Arguments:
  srcDir      Source directory containing your mod, that is, the directory your modinfo.txt lives.
  outDir      Ouput directory. This is the directory you copy-paste into c:\users\[you]\appdata\roaming\Dungeonmans\modcontent\mods\ directory to play your mod in Dungeonmans.
      If outDir directory does not exist, creates it and its parents as necessary.

Options:
  --dry-run   Simulate the execution of the command without actually changing anything.
  --verbose   Print additional info.
  -h, --help  display help for command

Example A:                @dungeonmans-mod-tools/cli build ./src ./dist/mymodname
Example B:                @dungeonmans-mod-tools/cli build path/to/src path/to/dist/mymodname
Example C (dry-run):      @dungeonmans-mod-tools/cli build ./src ./dist/mymodname --dry-run
```

## Validate Refs command

`npx @dungeonmans-mod-tools/cli validate-refs --help`

```log
Usage: @dungeonmans-mod-tools/cli validate-refs|verify-refs [options] <srcDir>

Checks for existence of references, i.e. any string or substring marked with `@ref(..)`. References can appear in both string values as well as property keys.

Arguments:
  srcDir      Source directory containing your mod, that is, the directory your modinfo.txt lives.

Options:
  --verbose   Print additional info.
  --debug     Print addditional debug info. Implies --verbose.
  -h, --help  display help for command

Note: Only looks for references as of the 2nd level of objects. In other words, references in root-level property keys are ignored. The first level is assumed to be the entity name.

Example A:                @dungeonmans-mod-tools/cli validate-refs path/to/src
Example B (verbose):      @dungeonmans-mod-tools/cli validate-refs path/to/src --verbose
Example C (debug):        @dungeonmans-mod-tools/cli validate-refs path/to/src --debug
```

## For Tool Developers

This readme is published on npm. As such, all details about development of the CLI and related mod tools have been moved to [README.development.md](./README.development.md).

## References

- [GitHub](https://github.com/mkraenz/dungeonmans-mod-tools)
- [NPM](https://www.npmjs.com/package/@dungeonmans-mod-tools/cli)
