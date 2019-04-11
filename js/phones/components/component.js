export default class Component {
    constructor({ element }) {
        this._callbackMap = {};
        this._element = element;
    }

    on(eventName, selector, callback) {
        this._element.addEventListener(eventName, (event) => {
          const deligatedTarget = event.target.closest(selector);
          if (!deligatedTarget) {
            return;
          }
          callback(event);
  
        })
      }

    emit(eventName, data) {
        const callback = this._callbackMap[eventName];
      if(!callback) {
        return;
      }
      this._callbackMap[eventName].forEach(callback => {
          callback(data)
      });
    }
  
    subscribe(eventName, callback) {
        if(!this._callbackMap[eventName]) {
            this._callbackMap[eventName] = [];
        }
        
      this._callbackMap[eventName].push(callback);
  
    }

    unsubscribe(eventName, callbackToRemove) {
        const callback = this._callbackMap[eventName];
        if(callback) {
            this._callbackMap[eventName] = callback
            .filter( cb =>   cb !== callbackToRemove
            )
        }
    }

    hide() {
        this._element.hidden = true;
    }
      
    show() {
        this._element.hidden = false;
    }

}