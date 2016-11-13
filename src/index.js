import Module from 'module';

const originalRequire = Module.prototype.require;

let initialized = false;

if (!process.versions.electron) {
  throw new Error('electron-test-utils can only be run from inside Electron');
}
const electron = require('electron');

if (process.type === 'browser') {
  const modules = ['dialog', 'globalShortcut', 'powerMonitor'];
  const resetFns = [];

  const utils = {};

  const initialize = () => {
    if (!initialized) {
      Module.prototype.require = function fancyRequireElectronHack(moduleName, ...args) {
        if (moduleName === 'electron') {
          return electron;
        }
        return originalRequire.call(this, moduleName, ...args);
      };
      initialized = true;

      modules.forEach((moduleName) => {
        const module = require(`./modules/${moduleName}`).default; // eslint-disable-line
        module.patch(electron);
        utils[moduleName] = module.utils();
        resetFns.push(module.reset.bind(module));
      });
    }
  };

  const reset = () => resetFns.forEach((fn) => fn());

  module.exports = { utils, initialize, reset };
  global.__electron_test_utils__ = module.exports; // eslint-disable-line
} else {
  module.exports = electron.remote.getGlobal('__electron_test_utils__');
}
