/* eslint-disable no-param-reassign */

const dialogTypes = ['OpenDialog', 'SaveDialog', 'MessageBox', 'ErrorBox'];

class DialogUtil {
  constructor() {
    this.reset();
  }

  mockDialog(dialogType, arg1, arg2, arg3) {
    let cb;
    const args = [arg1, arg2];
    if (typeof arg2 === 'function') {
      cb = arg2;
    } else if (typeof arg3 === 'function') {
      cb = arg3;
      args.push(arg3);
    }
    this.calls[dialogType].push({
      args,
    });
    if (this.index[dialogType] < this.returns[dialogType].length) {
      if (cb) cb(this.returns[dialogType][this.index[dialogType]]);
      this.index[dialogType]++;
      return undefined;
    }
    throw new Error(`No set return value for show${dialogType} call`);
  }

  patch(electron) {
    dialogTypes.forEach((dialogType) => {
      const dialogObject = (electron.dialog || electron.remote.dialog);
      dialogObject[`show${dialogType}`] = this.mockDialog.bind(this, dialogType);
    });
  }

  utils() {
    const ret = {};
    dialogTypes.forEach((dialogType) => {
      ret[`next${dialogType}Call`] = (retValue) => this.returns[dialogType].push(retValue);
      ret[`get${dialogType}Call`] = (index) => this.calls[dialogType][index];
      ret[`get${dialogType}Calls`] = () => this.calls[dialogType];
    });
    delete ret.nextErrorBoxCall;
    return ret;
  }

  reset() {
    this.returns = {};
    this.calls = {};
    this.index = {};
    dialogTypes.forEach((dialogType) => {
      this.returns[dialogType] = [];
      this.calls[dialogType] = [];
      this.index[dialogType] = 0;
    });
  }
}

export default new DialogUtil();
