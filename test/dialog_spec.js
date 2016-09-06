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

  it('should mock the openDialog callback', () => {
    const fileArr = ['path/to/file'];
    utils.dialog.nextOpenDialogCall(fileArr);

    const spy = sinon.spy();
    electron.dialog.showOpenDialog({}, spy);
    spy.callCount.should.be.equal(1);
    spy.lastCall.args[0].should.be.deep.equal(fileArr);
  });

  it('should mock the openDialog callback if BrowserWindow is set', () => {
    const fileArr = ['path/to/file'];
    utils.dialog.nextOpenDialogCall(fileArr);

    const spy = sinon.spy();
    electron.dialog.showOpenDialog({}, {}, spy);
    spy.callCount.should.be.equal(1);
    spy.lastCall.args[0].should.be.deep.equal(fileArr);
  });

  it('should mock sequential openDialog callbacks', () => {
    const fileArr = ['path/to/file'];
    const fileArr2 = ['path/to/a/different/file'];
    utils.dialog.nextOpenDialogCall(fileArr);
    utils.dialog.nextOpenDialogCall(fileArr2);

    let spy = sinon.spy();
    electron.dialog.showOpenDialog({}, spy);
    spy.callCount.should.be.equal(1);
    spy.lastCall.args[0].should.be.deep.equal(fileArr);

    spy = sinon.spy();
    electron.dialog.showOpenDialog({}, spy);
    spy.callCount.should.be.equal(1);
    spy.lastCall.args[0].should.be.deep.equal(fileArr2);
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
});
