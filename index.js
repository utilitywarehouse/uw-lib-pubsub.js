const EventDispatcher = require('./src/dispatcher');
const QueueRelay = require('./src/listener').QueueRelay;
const Logger = require('./src/listener').Logger;
const Queue = require('./src/queue');
const Kafka = require('no-kafka');

class Dispatcher extends EventDispatcher {

  constructor(brokers, logger) {
    super();
    this.brokers = brokers;
    this.logger = logger;
  }

  init() {
    const producer = new Kafka.Producer({ connectionString: this.brokers });
    return producer.init().then(() => {
      const queue = new Queue(producer);
      this.addListeners(QueueRelay(queue), Logger(this.logger));
    });
  }

  addListeners(relay, logger) {
    this.addCustomListener(relay);
    this.addCustomListener(logger);
  }
}

module.exports = {
  Dispatcher,
  Event: require('./src/event')
};
