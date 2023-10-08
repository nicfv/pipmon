# Contributing Guidelines

Thank you for visiting `nicfv/pipmon`, the official Pipmon repository! Participation by contributing is allowed, and highly encouraged. This document outlines how to make contributions of all kinds to Pipmon.

Please always honor the [code of conduct](./CODE_OF_CONDUCT.md) to keep our community a safe place for all.

## Ways to Contribute

Raise an [issue](https://github.com/nicfv/pipmon/issues) or open a [pull request](https://github.com/nicfv/pipmon/pulls).

More information will be provided along with the development of Pipmon.

## Language

Please keep all contributions in **English**, and all code contributions in **Typescript**, or any of the other languages used in this repository.

## Logging Changes

When making a change to the code base, please log all changes in [CHANGELOG.md](./CHANGELOG.md) using markdown syntax. The latest changes are always added to the top, under the file heading. The latest version notes should include the [version number](#version-numbers) and the date formatted exactly `MMM DD, YYYY` wrapped in square brackets. Single-digit days do not have a leading zero. You may copy this template to get started.

```md
## 0.0.0 [Jan 1, 2000]

- Please add changes here.
```

Or for unreleased changes, copy this template.

```md
## Unreleased

- Please add changes here.
```

## Version Numbers

Version numbers are allowed to be the string `Unreleased`, or in the format `MAJOR.MINOR.PATCH` following the regular expression `[0-9]+\.[0-9]+\.[0-9]+`. Only one digit grouping is ever increased in any one version, and can only be increased by 1. See below for some notes on what each digit group means and how to assign a version.

> Still unsure? Assign [unreleased](#unreleased-changes) and your changes will be released in the following version update.

### Major Changes

- Major functional changes to the code base
- Typically breaks or removes some previous features entirely
- When the major version increases, minor and patch versions reset to 0 (e.g. `0.9.15` to `1.0.0`)

### Minor Changes

- Minor, but significant functional changes to the code base
- Minor revisions are used any time a minor feature is broken or removed
- When the minor version increases, the patch version resets to 0 (e.g. `1.12.5` to `1.13.0`)

### Patchwork

- Very minor changes that have little effect on the overall output
- Can be bug fixes, typo fixes, injections of small logic

### Unreleased Changes

- Many times, changes do not need to be rolled out right away, or cannot be deployed without additional work involved
- Any unreleased change will persist and be rolled out with the next version, regardless whether it is a major, minor, or patch revision