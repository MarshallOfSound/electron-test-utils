/* eslint-disable no-param-reassign */

class GlobalShortcutUtil {
  constructor() {
    this.reset();
  }

  patch(electron) {
    const globalShortcutObject = (electron.globalShortcut || electron.remote.globalShortcut);
    globalShortcutObject.register = (accelerator, callback) => {
      if (this.hooks[accelerator]) {
        return false;
      }
      this.hooks[accelerator] = callback;
      return true;
    };
    globalShortcutObject.isRegistered = (accelerator) => !!this.hooks[accelerator];
    globalShortcutObject.unregister = (accelerator) => delete this.hooks[accelerator];
    globalShortcutObject.unregisterAll = () => this.reset();
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
