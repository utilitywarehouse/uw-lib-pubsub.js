const EventDispatcher = require('./src/dispatcher');
const QueueRelay = require('./src/listener').QueueRelay;
const Logger = require('./src/listener').Logger;
const Queue = require('./src/queue');
const Kafka = require('no-kafka');

class Dispatcher extends EventDispatcher {

  constructor(brokers, logger, events) {
    super();
    this.brokers = brokers;
    this.logger = logger;
    this.events = events || [];
  }

  init() {
    const producer = new Kafka.Producer({ connectionString: this.brokers });
    return producer.init().then(() => {
      const queue = new Queue(producer);
      this.relay = QueueRelay(queue);
      this.logger = Logger(this.logger);
      this.events.forEach(e => this.addListener(e));
    });
  }

  addListener(eventName) {
    this.addCustomListener(eventName, this.relay);
    this.addCustomListener(eventName, this.logger);
  }
}

module.exports = {
  Dispatcher,
  Event: require('./src/event')
};
