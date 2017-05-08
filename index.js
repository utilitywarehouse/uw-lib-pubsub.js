const EventDispatcher = require('./src/dispatcher');
const QueueRelay = require('./src/listener').QueueRelay;
const Logger = require('./src/listener').Logger;
const Queue = require('./src/queue');

class Dispatcher extends EventDispatcher {

  constructor(kafka, logger) {
    super();
    this.addListeners(QueueRelay(new Queue(kafka)), Logger(logger));
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
