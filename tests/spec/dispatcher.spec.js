const EventDispatcher = require('../../src/dispatcher');

describe('EventDispatcher', () => {
  let eventDispatcher;

  beforeEach(() => {
    eventDispatcher = new EventDispatcher();
  });

  test('can have listener added', () => {
    eventDispatcher.addCustomListener(() => {});
    expect(eventDispatcher.getListeners().length).toEqual(1);
  });

  describe('.dispatch', () => {
    test('resolves if all promises returned by the listeners are resolved', () => {
      let called = false;

      const listener = () => {
        return new Promise(resolve => {
          called = true;
          resolve();
        });
      };

      eventDispatcher.addCustomListener(listener);

      return eventDispatcher.dispatch({}).then(() => expect(called).toBe(true));
    });

    test('rejects if any promises return by a listener rejects', () => {
      const error = new Error();
      expect.assertions(1);
      const listener = () => Promise.reject(error);
      eventDispatcher.addCustomListener(listener);
      return eventDispatcher.dispatch({}).catch(e => expect(e).toEqual(error));
    });
  });
});
