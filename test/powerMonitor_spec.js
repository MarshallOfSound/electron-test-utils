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
  });

  afterEach(() => {
    reset();
  });

  it('should preserve electron.powerMonitor', () => {
    electron.powerMonitor.should.be.ok;
    electron.powerMonitor.on.should.be.ok;
  });

  const testEvent = (eventName, methodName) => {
    it(`should simulate the ${eventName} event`, () => {
      const spy = sinon.spy();
      electron.powerMonitor.on(eventName, spy);
      spy.callCount.should.be.equal(0);
      utils.powerMonitor[`simulate${methodName}`]();
      spy.callCount.should.be.equal(1);
    });
  };

  testEvent('suspend', 'Suspend');
  testEvent('resume', 'Resume');
  testEvent('on-ac', 'OnAC');
  testEvent('on-battery', 'OnBattery');
});
