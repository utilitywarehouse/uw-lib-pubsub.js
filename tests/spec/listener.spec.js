const { QueueRelay, Logger } = require('../../src/listener');

describe('Listener', () => {
  describe('QueueRelay', () => {
    test('queue.producer() is called with the correct event type', () => {
      const mockQueue = { producer: jest.fn(() => ({ send: f => f })) };
      const relay = QueueRelay(mockQueue);
      const event = { type: 'my-special-type' };
      relay(event);
      expect(mockQueue.producer).toBeCalledWith('my-special-type');
    });

    test('producer.send() is called with the correct message', () => {
      const mockSend = jest.fn();
      const relay = QueueRelay({ producer: () => ({ send: mockSend }) });
      const event = { type: 'my-special-type', id: 123 };
      relay(event);
      expect(mockSend).toBeCalledWith(JSON.stringify(event));
    });
  });

  describe('Logger', () => {
    test('logger.info() is called with appropriate log message', () => {
      const mockLogger = { info: jest.fn() };
      const logger = Logger(mockLogger);
      const event = { a: 'b', id: 123, correlationId: 'bob', type: 'type', version: 1, partnerId: '456' };
      logger(event);
      expect(mockLogger.info).toBeCalledWith(
        'event-dispatched',
        { id: 123, correlationId: 'bob', type: 'type', version: 1, partnerId: '456' }
      );
    });
  });
});
