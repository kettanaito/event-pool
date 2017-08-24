import EventsPool from '../src/index';
import {CustomEvent} from './test_helper';
import {expect} from 'chai';

function createElement (elementName) {
  return document.body.appendChild(document.createElement(elementName));
}

/**
 * Module
 */
describe('Module', () => {
  it('Can be imported', () => {
    return expect(EventsPool).to.not.be.undefined;
  })
});

/**
 * Basics
 */
describe('Basics', () => {
  it('Dispatch events from document by default', (done) => {
    EventsPool({
      events: 'documentEvent',
      callback() {
        return done();
      }
    });

    document.dispatchEvent(new CustomEvent('documentEvent'));
  });

  it('Dispatch events from custom eventTarget', (done) => {
    const eventTarget = createElement('eventtarget');

    EventsPool({
      events: 'click',
      eventTarget,
      callback() {
        return done();
      }
    });

    eventTarget.click();
  });

  /**
   * Single event
   */
  describe('Single event', () => {
    it('Catch event correctly', (done) => {
      EventsPool({
        events: 'customEvent',
        callback() {
          return done();
        }
      });
  
      const customEvent = new CustomEvent('customEvent');
      document.dispatchEvent(customEvent);
    });
  
    it('Receive data successfully', (done) => {
      EventsPool({
        events: 'onApplePick',
        callback(events, data) {
          expect(events).to.not.be.undefined;
          expect(data).to.not.be.undefined;
          expect(data[0].apples).to.equal(4);

          return done();
        }
      });
  
      const customEvent = new CustomEvent('onApplePick', {
        detail: { apples: 4 }
      });
      document.dispatchEvent(customEvent);
    });
  });

  /**
   * Multiple events
   */
  describe('Multiple events', () => {
    it('Catch events correctly', (done) => {
      EventsPool({
        events: 'multipleEvent_1',
        callback(events, data) {
          expect(events.length).to.equal(2);
          expect(data.length).to.equal(0);

          return done();
        }
      });
  
      const eventEntity = new CustomEvent('multipleEvent_1');
  
      document.dispatchEvent(eventEntity);
      document.dispatchEvent(eventEntity);
    });

    it('Aggregate data successfully', (done) => {
      EventsPool({
        events: 'multipleEvent_2',
        callback(events, data) {
          const sum = data.reduce((number, entry) => number += entry.number, 0);
  
          expect(events.length).to.equal(2);
          expect(sum).to.equal(10);

          return done();
        }
      });
  
      document.dispatchEvent(new CustomEvent('multipleEvent_2', {
        detail: { number: 2 }
      }));
      document.dispatchEvent(new CustomEvent('multipleEvent_2', {
        detail: { number: 8 }
      }));
    });
  });

});

/**
 * Advanced
 */
describe('Advanced', () => {

  describe('Aggregation mode', () => {
    it('Enable only when explicitly requested', function (done) {
      EventsPool({
        events: 'aggregateEvent_2',
        timeout: 300,
        callback(events) {
          expect(events.length).to.equal(2);
          return done();
        }
      });

      const customEvent = new CustomEvent('aggregateEvent_2');
      const dispatchEvent = () => document.dispatchEvent(customEvent);
      dispatchEvent();

      setTimeout(() => dispatchEvent(), 200);
      setTimeout(() => dispatchEvent(), 400);
    });

    it('Calculate aggregation timeout correctly', (done) => {
      EventsPool({
        events: 'aggregateEvent',
        aggregate: true,
        timeout: 300,
        callback(events) {
          expect(events.length).to.equal(3);
          return done();
        }
      });
  
      const aggregateEvent = new CustomEvent('aggregateEvent');
      const dispatchEvent = (callback) => {
        document.dispatchEvent(aggregateEvent);
        if (callback) callback();
      };
  
      /* Dispatch delayed events */
      dispatchEvent(() => setTimeout(() => {
        dispatchEvent(() => setTimeout(() => {
          dispatchEvent();
        }, 200));
      }, 100));
    });

  });

});
