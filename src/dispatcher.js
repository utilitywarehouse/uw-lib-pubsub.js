class EventDispatcher {
  constructor() {
    this.listeners = new Map();
  }

  addCustomListener(eventName, listener) {
    const listeners = this.getListeners(eventName);
    listeners.push(listener);
    this.listeners.set(eventName, listeners);
  }

  dispatch(eventName, event) {
    const listeners = this.getListeners(eventName);

    return Promise.all(
      listeners.map(listener => listener.call(null, event))
    );
  }

  getListeners(eventName) {
    return this.listeners.get(eventName) || [];
  }
}

module.exports = EventDispatcher;
