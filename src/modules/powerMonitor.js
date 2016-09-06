/* eslint-disable no-param-reassign */

class PowerMonitorUtil {
  constructor() {
    this.reset();
  }

  patch(electron) {
    this.emitter = electron.powerMonitor || electron.remote.powerMonitor;
  }

  utils() {
    return {
      simulateSuspend: () => this.emitter.emit('suspend'),
      simulateResume: () => this.emitter.emit('resume'),
      simulateOnAC: () => this.emitter.emit('on-ac'),
      simulateOnBattery: () => this.emitter.emit('on-battery'),
    };
  }

  reset() {
    if (this.emitter) this.emitter.removeAllListeners();
  }
}

export default new PowerMonitorUtil();
