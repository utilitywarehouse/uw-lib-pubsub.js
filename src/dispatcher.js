class EventDispatcher {
  constructor() {
    this.listeners = [];
  }

  addCustomListener(listener) {
    this.listeners.push(listener);
  }

  dispatch(event) {
    return Promise.all(this.getListeners().map(listener => listener.call(null, event)));
  }

  getListeners() {
    return this.listeners;
  }
}

module.exports = EventDispatcher;
