/* eslint-disable no-unused-expressions */

import chai, { expect } from 'chai';
import sinon from 'sinon';

import { initialize, reset, utils } from '../';

chai.should();

describe('dialog module', () => {
  let electron;

  before(() => {
    initialize();
  });

  beforeEach(() => {
    electron = require('electron'); // eslint-disable-line
    if (!electron.dialog) electron.dialog = electron.remote.dialog; // Map for renderer process
  });

  afterEach(() => {
    reset();
  });

  it('should preserve electron.dialog', () => {
    electron.dialog.should.be.ok;
    electron.dialog.showOpenDialog.should.be.ok;
  });

  it('should throw an error if there is no mocked result to return', () => {
    expect(() => electron.dialog.showOpenDialog({}, () => {})).to.throw(Error);
  });

  it('should mock the openDialog callback', (done) => {
    const fileArr = ['path/to/file'];
    utils.dialog.nextOpenDialogCall(fileArr);

    expect(electron.dialog.showOpenDialog({}, (passedFiles) => {
      passedFiles.should.be.deep.equal(fileArr);
      done();
    })).to.equal(undefined);
  });

  it('should mock the openDialog callback if BrowserWindow is set', (done) => {
    const fileArr = ['path/to/file'];
    utils.dialog.nextOpenDialogCall(fileArr);

    electron.dialog.showOpenDialog({}, {}, (passedFiles) => {
      passedFiles.should.be.deep.equal(fileArr);
      done();
    });
  });

  it('should mock sequential openDialog callbacks', (done) => {
    const fileArr = ['path/to/file'];
    const fileArr2 = ['path/to/a/different/file'];
    utils.dialog.nextOpenDialogCall(fileArr);
    utils.dialog.nextOpenDialogCall(fileArr2);
    let called = 0;

    electron.dialog.showOpenDialog({}, (passedFiles) => {
      passedFiles.should.be.deep.equal(fileArr);
      called.should.equal(0);
      called = 1;
    });

    electron.dialog.showOpenDialog({}, (passedFiles) => {
      passedFiles.should.be.deep.equal(fileArr2);
      called.should.equal(1);
      done();
    });
  });

  it('should get a openDialog call by index', () => {
    const fileArr = ['path/to/file'];
    const options = { foo: 'bar' };
    utils.dialog.nextOpenDialogCall(fileArr);

    electron.dialog.showOpenDialog(options, () => {});

    const openDialogCall = utils.dialog.getOpenDialogCall(0);
    openDialogCall.should.have.property('args');
    openDialogCall.args.length.should.be.equal(2);
    openDialogCall.args[0].should.be.deep.equal(options);
  });

  it('should return the path for the syncronous API', () => {
    const fileArr = ['path/to/file'];
    const options = { foo: 'bar' };
    utils.dialog.nextOpenDialogCall(fileArr);

    electron.dialog.showOpenDialog(options).should.be.deep.equal(fileArr);

    const openDialogCall = utils.dialog.getOpenDialogCall(0);
    openDialogCall.should.have.property('args');
    openDialogCall.args.length.should.be.equal(1);
    openDialogCall.args[0].should.be.deep.equal(options);
  });
});
