/* eslint-disable no-unused-expressions */

import chai from 'chai';
import sinon from 'sinon';

import { initialize, reset, utils } from '../';

chai.should();

describe('powerMonitor module', () => {
  let electron;

  before(() => {
    initialize();
  });

  beforeEach(() => {
    electron = require('electron'); // eslint-disable-line
    if (!electron.powerMonitor) electron.powerMonitor = electron.remote.powerMonitor;
  });

  afterEach(() => {
    reset();
  });

  it('should preserve electron.powerMonitor', () => {
    electron.powerMonitor.should.be.ok;
    electron.powerMonitor.on.should.be.ok;
  });

  const testEvent = (eventName, methodName) => {
    it(`should simulate the ${eventName} event`, (done) => {
      const spy = sinon.spy();
      electron.powerMonitor.on(eventName, spy);
      spy.callCount.should.be.equal(0);
      utils.powerMonitor[`simulate${methodName}`]();
      // In renderer this is async over remote IPC
      setTimeout(() => {
        spy.callCount.should.be.equal(1);
        done();
      }, 20);
    });
  };

  testEvent('suspend', 'Suspend');
  testEvent('resume', 'Resume');
  testEvent('on-ac', 'OnAC');
  testEvent('on-battery', 'OnBattery');
});
