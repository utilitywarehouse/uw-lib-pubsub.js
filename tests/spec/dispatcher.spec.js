const EventDispatcher = require('../../src/dispatcher');

describe('EventDispatcher', () => {
  const eventName = 'event-name';
  let eventDispatcher;

  beforeEach(() => {
    eventDispatcher = new EventDispatcher();
  });

  it('can have listener added', () => {
    eventDispatcher.addCustomListener(eventName, () => {});
    eventDispatcher.getListeners(eventName).length.should.equal(1);
  });

  describe('.dispatch', () => {
    it('resolve if all promises returned by the listeners are resolved', () => {
      let called = false;

      const listener = () => {
        return new Promise(resolve => {
          called = true;
          resolve();
        });
      };

      eventDispatcher.addCustomListener(eventName, listener);

      return eventDispatcher.dispatch(eventName, {})
        .then(() => {
          called.should.equal(true);
        })
    });

    it('rejects if any promise return by a listener rejects', () => {
      const listener = () => Promise.reject();
      eventDispatcher.addCustomListener(eventName, listener);

      return eventDispatcher.dispatch(eventName, {}).should.be.rejected;
    });
  });
});
