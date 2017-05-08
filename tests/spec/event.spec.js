const Event = require('../../src/event');

describe('Event', () => {
  test('a new uid is generated', () => {
    const event = new Event();
    expect(event.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  test('a default version of 1 is used', () => {
    const event = new Event('type', 123);
    expect(event.version).toEqual(1);
  });

  test('all properties are set correctly', () => {
    const event = new Event('type', 123, 2);
    expect(event.type).toEqual('type');
    expect(event.correlationId).toEqual(123);
    expect(event.version).toEqual(2);
  });
});
