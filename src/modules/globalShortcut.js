/* eslint-disable no-param-reassign */

class GlobalShortcutUtil {
  constructor() {
    this.reset();
  }

  patch(electron) {
    electron.globalShortcut.register = (accelerator, callback) => {
      if (this.hooks[accelerator]) {
        return false;
      }
      this.hooks[accelerator] = callback;
      return true;
    };
    electron.globalShortcut.isRegistered = (accelerator) => !!this.hooks[accelerator];
    electron.globalShortcut.unregister = (accelerator) => delete this.hooks[accelerator];
    electron.globalShortcut.unregisterAll = () => this.reset();
  }

  utils() {
    return {
      simulate: (accelerator) => {
        if (this.hooks[accelerator]) {
          this.hooks[accelerator]();
        }
      },
      registeredAccelerators: () => Object.keys(this.hooks),
    };
  }

  reset() {
    this.hooks = {};
  }
}

export default new GlobalShortcutUtil();
