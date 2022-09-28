# Changelog
## _unreleased_
**Additions**
- add edit button to set / remove kara

**Changes**
- `world.clearAll()` removes kara too

## 0.0.3
_28 September 2022_

**Breaking**
- `world`: combine `getSizeX()` and `getSizeY()` into `getSize()` which returns an object like`{x, y}`

**Changes**
- Position code editor on the right screen half

**Fixes**
- Prevent placing trees and mushrooms on kara

**Engineering**
- more refactoring
- eslint: error on empty functions

## 0.0.2
_24 September 2022_

**Changes**
- Prevent access to internal properties of `world` and `kara` from user code

**Fixes**
- Fix access to `world` object from code

**Engineering**
- Migrate source code to TypeScript
- Lot's of refactoring
- Check code formatting using eslint
- Create CI and CD pipelines
- Push minified JavaScript to gh-pages

## 0.0.1
_17 September 2022_

- Alpha Release
