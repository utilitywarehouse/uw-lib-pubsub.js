# UW Pub Sub

Node Version:

`>= v7.9.0`

Usage:

`yarn add git+ssh://git@github.com/utilitywarehouse/uw-lib-pubsub.js no-kafka`

Testing:

`npm test`

wiring.yml:

```
kafka.producer:
    class: 'no-kafka::Producer'
    with:
      -
        connectionString: '127.0.0.1:9092,192.168.2.2:9092'
    tags:
      system.start: { method: init }

event.dispatcher:
    class: 'uw-pub-sub.js::Dispatcher'
    with:
      - '@kafka.producer'
      - '@logger'
```

MySpecialEvent.js

```
const Event = require('uw-lib-pubsub.js').Event;

class MySpecialEvent {
   constructor(partnerId, ...) {
      super('my-special-event-type', correlationId, version);
      this.partnerId = partnerId;
      ...
   }
}

```
