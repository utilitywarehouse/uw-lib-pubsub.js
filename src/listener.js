module.exports = {
  QueueRelay: queue => event => {
    const message = JSON.stringify(event);
    const producer = queue.producer(event.type);

    return producer.send(message);
  },
  Logger: logger => event => {
    const { id, correlationId, type, version, partnerId } = event;
    logger.info('event-dispatched', { id, correlationId, type, version, partnerId });
  }
};
