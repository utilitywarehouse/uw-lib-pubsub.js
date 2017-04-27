# UW Pub Sub

Usage:

`yarn add git+ssh://git@github.com/utilitywarehouse/uw-lib-pubsub.js`

wiring.yml:

```
event.dispatcher:
    class: 'uw-pub-sub.js::Dispatcher'
    with:
      - '@kafka.brokers'
      - '@logger'
    tags:
      system.start: { method: init }
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

