# Global Shortcut Module

## Fetching the module

```js
import { utils } from 'electron-test-utils';
const { powerMonitor } = utils;
```

## Usage

### Simulation

#### `powerMonitor.simulateSuspend()`

This method will simulate the computer going into suspension mode.

#### `powerMonitor.simulateResume()`

This method will simulate the computer leaving suspension mode.  I.e. Resuming

#### `powerMonitor.simulateOnAC()`

This method will simulate the computer switching to an AC power supply.

#### `powerMonitor.simulateOnBattery()`

This method will simulate the computer switching to an internal battery power
supply.
