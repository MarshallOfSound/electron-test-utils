/* eslint-disable no-unused-expressions */

import chai from 'chai';
import sinon from 'sinon';

import { initialize, reset, utils } from '../';

chai.should();

describe('globalShortcut module', () => {
  let electron;

  before(() => {
    initialize();
  });

  beforeEach(() => {
    electron = require('electron'); // eslint-disable-line
    if (!electron.globalShortcut) electron.globalShortcut = electron.remote.globalShortcut;
  });

  afterEach(() => {
    reset();
  });

  it('should preserve electron.globalShortcut', () => {
    electron.globalShortcut.should.be.ok;
    electron.globalShortcut.register.should.be.ok;
  });

  it('should operate identically to the globalShortcut API', () => {
    electron.globalShortcut.register('Ctrl+A', () => {}).should.be.ok;
    electron.globalShortcut.register('Ctrl+A', () => {}).should.not.be.ok;
    electron.globalShortcut.isRegistered('Ctrl+A').should.be.ok;
    electron.globalShortcut.isRegistered('Ctrl+B').should.not.be.ok;
    electron.globalShortcut.unregister('Ctrl+A');
    electron.globalShortcut.isRegistered('Ctrl+A').should.not.be.ok;
  });

  it('should correctly simulate set accelerators', () => {
    const spy = sinon.spy();
    electron.globalShortcut.register('Ctrl+A', spy);
    utils.globalShortcut.simulate('Ctrl+A');
    spy.callCount.should.be.equal(1);
  });

  it('should not simulate on not-set accelerators', () => {
    const spy = sinon.spy();
    electron.globalShortcut.register('Ctrl+A', spy);
    utils.globalShortcut.simulate('Ctrl+B');
    spy.callCount.should.be.equal(0);
  });

  it('should correctly return accelerators that have been set', () => {
    electron.globalShortcut.register('Ctrl+A', () => {});
    utils.globalShortcut.registeredAccelerators().should.contain('Ctrl+A');
  });

  it('should not return accelerators that have been unset', () => {
    electron.globalShortcut.register('Ctrl+A', () => {});
    electron.globalShortcut.register('Ctrl+B', () => {});
    utils.globalShortcut.registeredAccelerators().should.contain('Ctrl+A');
    utils.globalShortcut.registeredAccelerators().should.contain('Ctrl+B');
    electron.globalShortcut.unregister('Ctrl+B');
    utils.globalShortcut.registeredAccelerators().should.not.contain('Ctrl+B');
  });
});
