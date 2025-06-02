# Dungeonmans Mod Tools

Package-based Nx monorepo for Dungeonmans Mod Tools.

Disclaimer: This is a fan-project and not affiliated with the original owner, copyright holders, nor license holders of Dungeonmans. If any of the content in this repo is not in agreement with any licenses etc, please contact me.

- [Dungeonmans on Steam](https://store.steampowered.com/app/288120/Dungeonmans/)
- [Modding Dungeonmans docs](https://dungeonmans.fandom.com/wiki/Mod_Packages)
- [Example mod repo by the Dungeonmans Creator](https://github.com/jim-adventureprogames/dmans-tutorial-mod/tree/main)

## FAQ: Do I need this repo to build a Mod for Dungeonmans?

> tl;dr: No, instead use the [CLI](https://www.npmjs.com/package/@dungeonmans-mod-tools/cli) to create a new mod project.

No you do not need this repo! This repo is for developers who build tools to help themselves and others create mods for Dungeonmans.

If you want to create a mod for Dungeonmans, we recommend you use our [nifty CLI tool](https://www.npmjs.com/package/@dungeonmans-mod-tools/cli) to create a new mod project. Assuming your text editor/IDE supports it, you will get

- Autocompletion
- Type checking
- and Hover-over documentation

for your mod files. Your text editor needs to be able to provide these features from JSON Schemas. If you don't know how to set this up for your text editor, VS Code does a great job at this out-of-the-box.

### Background

Dungeonmans defines most content in a custom plain text format called EntityDefs. While you can certainly write monsters, items etc by hand, you don't get any quality of life features. Using the CLI tool, you can write your content in JSON files and then build them into EntityDefs. This way you can use your text editor's features to help you write your mod.

## Getting Started

### Prerequisites

- Node JS (see [package.json](./package.json) `engines` field for version)

### Installation

```sh
npm install
# get an overview
npx nx graph
```

## Terms

- vanilla Dungeonmans = anything that's built right into the original game without any mods, e.g. the Academy Headmaster, or everybody's favorite: Trigers
- _entity def_, _entity definition_, _entity_ = text-based file format to define monsters/items/sprites/dungeons etc. inside of Dungeonmans
  - entities consist of a name (its identifier) and and a body of key-value pairs (often referred to as _properties_)
  - exception: [Plot Threads](https://dungeonmans.fandom.com/wiki/Plot_Threads) use JSON instead of entity def text fle
  - one `.txt` file can contain multiple entity defs
- _Reference_, _Ref_ = Some entities have properties where the value must be the name of another entity. We call this a reference.
  - Example: A monster entity requires a sprite entity to render it. A monster entity therefore looks like this (omitting many other properties) `entityDef "mymonster" { sprite "somesprite" }`. Here, `somesprite` must match a sprite entity. If there is no sprite entity named `somesprite` then the texture of the monster will be broken and a placeholder will be displayed instead.
  - Our CLI can help you quickly validate that all references in your mod match an existing entity from your mod. At this point, we are not yet able to check your references to vanilla Dungeonmans entities. But it's a potential feature.

## Current Status

### Content Creation

- 🟢 [CLI](https://www.npmjs.com/package/@dungeonmans-mod-tools/cli)
  - 🟢 init mod project
  - 🟢 build mod project
  - 🟢 validate references
- 🟢 [JSON schemas](packages/schemas/gen/actors.schema.json) and surrounding files for selected entity defs and plot theads as JSON
  - Provides autocompletion and validation when creating or editing JSONs that are going to be converted into entity def txt files
  - Check [vscode workspace settings'](.vscode/settings.json) `json.schemas` property on how to set up your editor to automatically make.
- 🔴 JSON to entity def text file
  - Turns your JSONs into

### Low-level

- 🟡 [EntityDef Lexer](libs/entity-def-compiler/src/lib/lexer/Lexer.realworld.spec.ts)
  - Turns Entity Def txt files into tokens for further analysis, etc.
  - Usable: 🟡
    - Several results from real world entityDef examples are shown in the [spec files](libs/entity-def-compiler/src/lib/lexer/Lexer.realworld.spec.ts). Before I can put a 🟢 on this though, I would need to battle test it by using other tools built on top of this, clarify some remaining questions regarding the syntax of entityDefs, and package it into a lib for anyone else to use.
  - TODO
    - tokenize `WhitespaceTrivia` (to create Concrete Syntax Tree)
    - allow comments `// ignore all this` (again, tokenize `CommentTrivia`)
- 🔴 [EntityDef Parser](libs/entity-def-compiler/src/lib/ast-parser/Parser.ts)
  - Leverages tokens created by Lexer to create a Syntax Tree
  - TODO
    - research good libs for AST node creation that also supports operations on those nodes
    - implementation (see unfinished/skipped test cases in spec file)

## Development

### Commands

```sh
# project overview
npx nx graph

npx nx run-many --targets typecheck build
# list all projects
npx nx show projects
# List all available targets of the project. Note the singular 'project'. If you use the Nx VsCode Plugin, you can also click 'Open Project Details to Side' button at the top right of the editor window when you open the project's package.json or project.json.
npx nx show project <project-name>

# Release and publish packages. More info in the Release section below.
# bump version with conventional commits
nx release --skip-publish
# build to have the latest artifacts, including bumped version in cli when invoked with --version flag
nx run-many -t build
# publish to npm / verdaccio
nx release publish
```

#### Tips

Recommended aliases for running commands to be set up in your shell (e.g. `.bashrc` or `.zshrc`):

```sh
alias nx='npx nx'
```

### Managing external libraries (dependencies, node_modules)

Unfortunately I haven't quite figured things out. The best I could get is to manually add a library to the project's `package.json` and at the same time to the workspace's `package.json`. These should be kept identical version for all occurrences of the library - in all projects.

The reason for the duplication is that I don't quite understand when which current working directory is set, which resulted in sometimes the workspace `node_modules/` being used, and sometimes the project's `node_modules/` being used. This gets especially confusing because some nx generators but the `dist` directory in the workspace root. Duplication avoids this problem - without solving it...

> For `devDependencies` this _may_ not be not necessary. It often suffices to install it in the workspace `npm i -D <lib>`.

So whenever adding a library as a `dependencies` to the project:

1. Check whether the lib is already in the project. A quick global search solves this easily.
2. If the lib does not exist, then

   ```sh
   npm install <lib> -w packages/<project> # install in project
   npm install <lib> # install in root
   ```

3. If the lib does exist, then copy the respective line from the existing project's `package.json` to your new project and run `npm install` in the workspace.

### Managing dependencies in this project

A package may depend on another package. If the dependency is buildable, it may be necessary to add it to the `dependencies`

## Releasing

### Procedure

Start by running verdaccio (local package registry) via

```sh
nx run @dungeonmans-mod-tools/source:local-registry
```

You can open [http://localhost:4873/](http://localhost:4873/) to see the packages in the registry.

Next, run following:

```sh
nx release --skip-publish
nx run-many -t build
nx release publish

# grab version
CLI_VERSION="v$(cat packages/cli/package.json | jq -r .version)"
# push tag
git push origin tag $CLI_VERSION
# create github release
gh release create $CLI_VERSION --notes 'See [CHANGELOG.md](https://github.com/mkraenz/dungeonmans-mod-tools/blob/main/CHANGELOG.md)'
```

Note

> For the very first release, I had to add `--first-release` flag.
> Further, before running the command I had to manually create a git tag: `git tag v0.0.1`.

Nx will automatically

- bump the version in the package.json and in all referencing packages
- update the changelog
- commit the changes
- create a git tag

Nx will then ask you to confirm publishing. If you choose yes, it publishes the package to locally running verdaccio server.

### Resources

- [nx feature summary: manage releases](https://nx.dev/features/manage-releases)
- [detailed nx docs on release](https://nx.dev/recipes/nx-release/get-started-with-nx-release)

## BOILERPLATE README BELOW

## Finish your CI setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/jYK02QPsLe)

## Generate a library

```sh
npx nx g @nx/js:lib packages/pkg1 --publishable --importPath=@my-org/pkg1
```

## Run tasks

To build the library use:

```sh
npx nx build pkg1
```

To run any task with Nx use:

```sh
npx nx <target> <project-name>
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Versioning and releasing

To version and release the library use

```sh
npx nx release
```

Pass `--dry-run` to see what would happen without actually releasing the library.

[Learn more about Nx release &raquo;](hhttps://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Keep TypeScript project references up to date

Nx automatically updates TypeScript [project references](https://www.typescriptlang.org/docs/handbook/project-references.html) in `tsconfig.json` files to ensure they remain accurate based on your project dependencies (`import` or `require` statements). This sync is automatically done when running tasks such as `build` or `typecheck`, which require updated references to function correctly.

To manually trigger the process to sync the project graph dependencies information to the TypeScript project references, run the following command:

```sh
npx nx sync
```

You can enforce that the TypeScript project references are always in the correct state when running in CI by adding a step to your CI job configuration that runs the following command:

```sh
npx nx sync:check
```

[Learn more about nx sync](https://nx.dev/reference/nx-commands#sync)

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/js?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
