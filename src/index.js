import Module from 'module';

const originalRequire = Module.prototype.require;

let initialized = false;

if (!process.versions.electron) {
  throw new Error('electron-test-utils can only be run from inside Electron');
}
const electron = require('electron');

const modules = ['dialog'];
const resetFns = [];

export const utils = {};

export const initialize = () => {
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

export const reset = () => resetFns.forEach((fn) => fn());
