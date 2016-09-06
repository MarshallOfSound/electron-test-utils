# Electron Test Utils

[![Build Status](https://travis-ci.org/MarshallOfSound/electron-test-utils.svg?branch=master)](https://travis-ci.org/MarshallOfSound/electron-test-utils)
[![npm version](https://badge.fury.io/js/electron-test-utils.svg)](https://www.npmjs.com/package/electron-test-utils)
[![npm](https://img.shields.io/npm/dt/electron-test-utils.svg?maxAge=2592000)](https://www.npmjs.com/package/electron-test-utils)
[![license](https://img.shields.io/github/license/MarshallOfSound/electron-test-utils.svg?maxAge=2592000)](https://github.com/MarshallOfSound/electron-test-utils/blob/master/LICENSE)
![status](https://img.shields.io/badge/Status-%20Ready%20for%20Awesome-red.svg)


## What is it?

Electron test utils is a small utility to help test Electron apps that depend
on currently untestable native desktop interactions.  For instance the "dialog"
module currently makes your code untestable if you use it.

## How do I use it?

```bash
npm i --save-dev electron-test-utils
```

It's really easy to use and integrates nicely into most test suites.

Your tests need access to the Electron API's, the easiest way to
achieve this is to use [`electron-mocha`](https://github.com/jprichardson/electron-mocha)

```js
import { initialize, reset, utils } from 'electron-test-utils';

describe('my wonderful test suite', () => {
  before(() => {
    initialize();
  });

  it('should open a file after prompting the user', () => {
    utils.dialog.nextOpenDialogCall(['path/to/file']);
    // If this function requires openDialog it will be given ['path/to/file']
    const file = myOpenFileFn();
    file.should.be.equal('file_content');
  });

  afterEach(() => {
    reset();
  });
});
```

Note the two magic functions we call:

* `initialize()` hooks into Electron to make
our API's work.  
* `reset()` resets all return values and call values so
that you get a clean slate during each test.  

## So what can it do?

Currently we only support the following API's.  Check out our module docs below.

* [`dialog`](docs/dialog.md)
* [`globalShortcut`](docs/globalShortcut.md)
* [`powerMonitor`](docs/powerMonitor.md)
