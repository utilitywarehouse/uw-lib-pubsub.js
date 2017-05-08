const Queue = require('../../src/queue');

describe('Queue', () => {
  test('producer() returns an object with a send function', () => {
    const queue = new Queue();
    const result = queue.producer('topic');
    expect(typeof result.send).toEqual('function');
  });
  
  test('send() calls kafka.send() with the expected object', () => {
    const mockKafka = { send: jest.fn(() => Promise.resolve([ { result: 1 } ])) };
    const producer = (new Queue(mockKafka)).producer('topic');
    const event = JSON.stringify({ id: 1, partnerId: 2 });
    producer.send(event);
    expect(mockKafka.send).toBeCalledWith({ topic: 'topic', message: { value: event } });
  });
  
  test('send() throws an error when kafka resolves a non array', () => {
    const mockKafka = { send: jest.fn(() => Promise.resolve('error')) };
    const producer = (new Queue(mockKafka)).producer('topic');
    expect.assertions(1);
    return producer.send('message').catch(e => expect(e.message).toEqual('Unexpected results'));
  });

  test('send() throws an error when kafka resolves an array with > 1 elements', () => {
    const mockKafka = { send: jest.fn(() => Promise.resolve([])) };
    const producer = (new Queue(mockKafka)).producer('topic');
    expect.assertions(1);
    return producer.send('message').catch(e => expect(e.message).toEqual('Unexpected results'));
  });
  
  test('send() throws an error when kafka resolves an error', () => {
    const mockKafka = { send: jest.fn(() => Promise.resolve([ { error: { message: 'this is an error' } } ])) };
    const producer = (new Queue(mockKafka)).producer('topic');
    expect.assertions(1);
    return producer.send('message').catch(e => expect(e.message).toEqual('this is an error'));
  });

  test('send() throws when kafka rejects', () => {
    const error = new Error('error');
    const mockKafka = { send: jest.fn(() => Promise.reject(error)) };
    const producer = (new Queue(mockKafka)).producer('topic');
    expect.assertions(1);
    return producer.send('message').catch(e => expect(e).toBe(error));
  });
});
