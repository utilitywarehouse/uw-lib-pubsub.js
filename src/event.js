const uuidV4 = require('uuid/v4');

class Event {
  constructor(type, correlationId, version) {
    this.id = uuidV4();
    this.version = version || 1;
    this.correlationId = correlationId;
    this.type = type;
  }
}

module.exports = Event;
