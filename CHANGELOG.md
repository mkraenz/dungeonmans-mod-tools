## 0.7.0 (2025-06-11)

### 🚀 Features

- **cli:** new command to parse entitydef txt files to JSON ([5df7244](https://github.com/mkraenz/dungeonmans-mod-tools/commit/5df7244))
- **entitydef-compiler:** Lexer and Transform to JS entities works including handling of comments ([54a9e04](https://github.com/mkraenz/dungeonmans-mod-tools/commit/54a9e04))
- **entitydef-compiler:** expose Lexer and EntityTransformer ([f194886](https://github.com/mkraenz/dungeonmans-mod-tools/commit/f194886))

### ❤️ Thank You

- Mirco Kraenz @mkraenz

## 0.6.1 (2025-06-08)

### 🩹 Fixes

- **cli:** experimental explorer supports texture atlas ([030dbc6](https://github.com/mkraenz/dungeonmans-mod-tools/commit/030dbc6))

### ❤️ Thank You

- Mirco Kraenz @mkraenz

## 0.6.0 (2025-06-08)

### 🚀 Features

- **cli:** experimental commands: extract, explorer ([4f8739d](https://github.com/mkraenz/dungeonmans-mod-tools/commit/4f8739d))

### 🩹 Fixes

- **cli:** markdown lint generated readme ([9ea6442](https://github.com/mkraenz/dungeonmans-mod-tools/commit/9ea6442))
- **js-to-entitydef:** only allow plain objects as entities ([3b88a1b](https://github.com/mkraenz/dungeonmans-mod-tools/commit/3b88a1b))
- **schemas:** itemrank should be an int ([1e73eaa](https://github.com/mkraenz/dungeonmans-mod-tools/commit/1e73eaa))
- **schemas:** specialpowers class autocompletion ([52d2f0c](https://github.com/mkraenz/dungeonmans-mod-tools/commit/52d2f0c))

### ❤️ Thank You

- Mirco Kraenz @mkraenz

## 0.5.0 (2025-06-03)

### 🚀 Features

- **cli:** minor init readme updates ([0a2d127](https://github.com/mkraenz/dungeonmans-mod-tools/commit/0a2d127))
- **schemas:** refine plots ([affbeb5](https://github.com/mkraenz/dungeonmans-mod-tools/commit/affbeb5))
- **schemas:** docs for birdtexture ([738f983](https://github.com/mkraenz/dungeonmans-mod-tools/commit/738f983))

### ❤️ Thank You

- Mirco Kraenz @mkraenz

## 0.4.1 (2025-06-02)

### 🩹 Fixes

- **cli:** link intro video in generated readme ([4fb705d](https://github.com/mkraenz/dungeonmans-mod-tools/commit/4fb705d))

### ❤️ Thank You

- Mirco Kraenz @mkraenz

## 0.4.0 (2025-06-02)

### 🚀 Features

- **cli:** init cmd: readme includes academy student handbook ([a741015](https://github.com/mkraenz/dungeonmans-mod-tools/commit/a741015))
- **js-to-entitydef:** commented root-level or 2nd-level keys wont be compiled into the entitydef ([f5ded70](https://github.com/mkraenz/dungeonmans-mod-tools/commit/f5ded70))
- **schemas:** more monster props and autocompletion ([291ac90](https://github.com/mkraenz/dungeonmans-mod-tools/commit/291ac90))
- **schemas:** actors updated with more autocompletion, props, and docs ([364b988](https://github.com/mkraenz/dungeonmans-mod-tools/commit/364b988))

### ❤️ Thank You

- Mirco Kraenz @mkraenz

## 0.3.0 (2025-02-09)

### 🚀 Features

- **cli:** init creates gitignore including dist/ by default ([9e05d9b](https://github.com/mkraenz/dungeonmans-mod-tools/commit/9e05d9b))
- **cli:** generated readme links to best practices for using dmans mod tools ([45b385e](https://github.com/mkraenz/dungeonmans-mod-tools/commit/45b385e))
- **cli:** build commands strips all @ref(..) markers in prop keys and values #12 ([#12](https://github.com/mkraenz/dungeonmans-mod-tools/issues/12))
- **cli:** validate-refs commands strips all @ref(..) markers in prop keys and values #12 ([#12](https://github.com/mkraenz/dungeonmans-mod-tools/issues/12))
- **cli:** document validate-refs command in readme generated on init ([2529c3d](https://github.com/mkraenz/dungeonmans-mod-tools/commit/2529c3d))

### ❤️ Thank You

- Mirco Kraenz @mkraenz

## 0.2.3 (2025-02-08)

### 🩹 Fixes

- **cli:** exit with error code 1 if build or verify-refs finds errors - but not on warnings ([ba40ec4](https://github.com/mkraenz/dungeonmans-mod-tools/commit/ba40ec4))
- **js-to-entitydef:** strip ref prefix from keys ([4b174a0](https://github.com/mkraenz/dungeonmans-mod-tools/commit/4b174a0))

### ❤️ Thank You

- Mirco Kraenz @mkraenz

## 0.2.2 (2025-02-08)

### 🩹 Fixes

- **cli:** build command with marked-refs strips @ref_ in plotdata/ and overworldgeneration/ ([daf1bcf](https://github.com/mkraenz/dungeonmans-mod-tools/commit/daf1bcf))
- **cli:** verify-refs command works for  plotdata/ and overworldgeneration/ ([224ee16](https://github.com/mkraenz/dungeonmans-mod-tools/commit/224ee16))
- **cli:** build+verify-refs both take into account references in property keys of primitive values ([a25cc42](https://github.com/mkraenz/dungeonmans-mod-tools/commit/a25cc42))
- **schema:** academydata missing root-level dictionary ([cdd328d](https://github.com/mkraenz/dungeonmans-mod-tools/commit/cdd328d))
- **schemas:** DmDialogData.soundToPlay is optional ([d2cc8f8](https://github.com/mkraenz/dungeonmans-mod-tools/commit/d2cc8f8))
- **schemas:** improve docs on encounter tables ([d84b853](https://github.com/mkraenz/dungeonmans-mod-tools/commit/d84b853))
- **schemas:** improve docs of monsters and NPCs ([1edd017](https://github.com/mkraenz/dungeonmans-mod-tools/commit/1edd017))
- **schemas:** improve hover-over docs, limit meleedamage_XY to meleedamage_01 to _20 for less verbose (thus more usable) intellisense, same for all other doubledigit instances ([0cb8d6b](https://github.com/mkraenz/dungeonmans-mod-tools/commit/0cb8d6b))

### ❤️ Thank You

- Mirco Kraenz @mkraenz

## 0.2.1 (2025-02-06)

### 🩹 Fixes

- **cli:** reported version ([a27d918](https://github.com/mkraenz/dungeonmans-mod-tools/commit/a27d918))

### ❤️ Thank You

- Mirco Kraenz @mkraenz

## 0.2.0 (2025-02-06)

### 🚀 Features

- **cli:** validate-refs command + build can strip ref prefix + configurability ([c607faa](https://github.com/mkraenz/dungeonmans-mod-tools/commit/c607faa))
- **schemas:** game systems, several items ([05ac19e](https://github.com/mkraenz/dungeonmans-mod-tools/commit/05ac19e))
- **schemas:** cli links to gamesystems schema ([7416ce9](https://github.com/mkraenz/dungeonmans-mod-tools/commit/7416ce9))

### 🩹 Fixes

- **cli:** usage examples + npm page use old package name... also alias for validate-refs: verify-refs ([f2c24c6](https://github.com/mkraenz/dungeonmans-mod-tools/commit/f2c24c6))

### ❤️ Thank You

- Mirco Kraenz @mkraenz

## 0.1.0 (2025-02-02)

### 🚀 Features

- **schemas:** json schemas for npcs, status effects, academy, birdtextures, set bonuses ([9ae052b](https://github.com/mkraenz/dungeonmans-mod-tools/commit/9ae052b))

### ❤️ Thank You

- Mirco Kraenz @mkraenz

## 0.0.4 (2025-02-02)

This was a version bump only, there were no code changes.

## 0.0.3 (2025-02-02)

### 🚀 Features

- **cli:** schemas command ([6c762e1](https://github.com/mkraenz/dungeonmans-mod-tools/commit/6c762e1))
- **cli:** include json schemas on init command ([d630c2e](https://github.com/mkraenz/dungeonmans-mod-tools/commit/d630c2e))

### 🩹 Fixes

- **cli:** generated readme references new cli command ([934633a](https://github.com/mkraenz/dungeonmans-mod-tools/commit/934633a))
- **cli:** typo in generated readme ([e653f35](https://github.com/mkraenz/dungeonmans-mod-tools/commit/e653f35))
- **js-to-entitydef:** ignore $schema prop on compilation ([d2dee61](https://github.com/mkraenz/dungeonmans-mod-tools/commit/d2dee61))
- **schemas:** sprite schemas all-in-one + typos ([582ef18](https://github.com/mkraenz/dungeonmans-mod-tools/commit/582ef18))

### ❤️ Thank You

- Mirco Kraenz @mkraenz

## 0.0.2 (2025-02-02)

This was a version bump only, there were no code changes.

## 0.0.2-0 (2025-02-02)

This was a version bump only, there were no code changes.

## 0.0.1 (2025-02-02)

This was a version bump only, there were no code changes.