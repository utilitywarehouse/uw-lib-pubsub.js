const WriteError = require('@utilitywarehouse/uw-lib-error.js')('WriteError', 503);

class Queue {
  constructor(kafka) {
    this.kafka = kafka;
  }

  producer(topic) {
    return {
      send: payload => {
        const message = { value: payload };

        return this.kafka.send({ topic, message })
          .then(results => {
            if (!Array.isArray(results) || results.length !== 1) {
              throw new WriteError('Unexpected results');
            }

            if ('error' in results[0] && results[0].error !== null) {
              throw new WriteError(results[0].error.message);
            }
          });
      }
    }
  }
}

module.exports = Queue;
