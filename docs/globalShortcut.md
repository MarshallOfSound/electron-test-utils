# Global Shortcut Module

## Fetching the module

```js
import { utils } from 'electron-test-utils';
const { globalShortcut } = utils;
```

## Usage

### Simulation

#### `globalShortcut.simulate(accelerator)`

* `accelerator` Accelerator - An Electron [`Accelerator`](http://electron.atom.io/docs/api/accelerator)

This method will immediately simulate the given accelerator, firing all callbacks
or doing nothing if no callbacks have been assigned

### Registration

#### `globalShortcut.registeredAccelerators()`

Returns an array of all currently registered accelerators
