# Changelog

## Unreleased [Oct 7, 2023]

- GitHub Workflow Updates
    - Website is only re-published when the version number changes in CHANGELOG
    - The special string `%VERSION%` found in any of the compiled files is replaced by the version number
- Add changes to CHANGELOG
- Add [contributing guidelines](./CONTRIBUTING.md)
- Add [code of conduct](./CODE_OF_CONDUCT.md)
- Add rectangle class that can check for intersections
- Tile & Tileset:
    - Improve tileset error checking for drawing tiles out-of-bounds
    - Offset now belongs to tiles, not sprites
- Define map tilesets outside of constructor

## 0.0.8 [Oct 5, 2023]

- Tileset: Add support to flip tiles in X or Y
- Game window is now focused on startup
- Player now snaps to tiles when walking

## 0.0.7 [Oct 2, 2023]

- CSS: Remove outline for focused elements
- Engine: Accept `Drawable` array in order of priority
- Player has short delay to start walking after turning

## 0.0.6 [Oct 1, 2023]

- Mangle properties on production builds
    - Use Terser's [reserved keywords](https://github.com/terser/terser/blob/master/tools/domprops.js)
- Stricter checking for animation types
- Player can only walk in 1 direction (no diagonals)
- Add callback function for complete animation

## 0.0.5 [Sep 30, 2023]

- Create first iteration of player class
- Update access to sprite functions

## 0.0.4 [Sep 25, 2023]

- Add [developer documentation](https://pipmon.com/devs/)
- Updates in game engine, tileset, sprites

## 0.0.3 [Sep 24, 2023]

- Add support for sprites, animations, and tilesets

## 0.0.2 [Sep 23, 2023]

- Write game engine, basic library logic classes
    - Color
    - Math
    - Size
    - Vec (2D vector)
- Add `<meta>` tags in index page
- Github actions: Upload artifact v1 -> v2

## 0.0.1 [Jul 12, 2023]

- Set up GitHub Pages
- Initialize Node JS project
- Install `typescript` and `esbuild`

## 0.0.0 [Jul 8, 2023]

- Add index page
- Add changelog