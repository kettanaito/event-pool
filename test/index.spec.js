import 'jsdom-global/register';
import { expect } from 'chai';
import EventsPool from '../src';

function createElement(elementName) {
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
          expect(data[0]).to.have.property('apples', 4);

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
        events: 'multipleEvent',
        callback(events, data) {
          expect(events).to.have.property('length', 2);
          expect(data).to.have.property('length', 0);

          return done();
        }
      });

      const eventEntity = new CustomEvent('multipleEvent');

      document.dispatchEvent(eventEntity);
      document.dispatchEvent(eventEntity);
    });

    it('Aggregate data successfully', (done) => {
      EventsPool({
        events: 'multipleEvent2',
        callback(events, data) {
          const sum = data.reduce((number, entry) => number += entry.number, 0);

          expect(events).to.have.property('length', 2);
          expect(sum).to.equal(10);

          return done();
        }
      });

      document.dispatchEvent(new CustomEvent('multipleEvent2', {
        detail: { number: 2 }
      }));
      document.dispatchEvent(new CustomEvent('multipleEvent2', {
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
    it('Aggregate only when explicitly enabled', function (done) {
      let hasCaught = false;
      const eventTarget = createElement('eventtarget');

      EventsPool({
        events: 'aggregateEvent',
        eventTarget,
        timeout: 100,
        callback(events) {
          if (!hasCaught) {
            hasCaught = true;

            expect(events).to.have.property('length', 2);
            return done();
          }
        }
      });

      const customEvent = new CustomEvent('aggregateEvent');
      const dispatchEvent = () => eventTarget.dispatchEvent(customEvent);

      /* Dispatch the first event */
      dispatchEvent();

      /* Dispatch the second even within the {timeout} period */
      setTimeout(() => dispatchEvent(), 50);

      /**
       * Dispatch the third even after the {timeout} period.
       * Since aggregation mode is disabled by default, this event
       * should not be caught.
       */
      setTimeout(() => dispatchEvent(), 110);
    });

    it('Calculate aggregation timeout correctly', (done) => {
      EventsPool({
        events: 'aggregateEvent2',
        aggregate: true,
        timeout: 300,
        callback(events) {
          expect(events).to.have.property('length', 3);
          return done();
        }
      });

      const aggregateEvent = new CustomEvent('aggregateEvent2');
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
