export default class Component {
    constructor({
        element
    }) {
        this._callbackMap = {};
        this._element = element;

    }

    on(eventName, selector, callback) {
        this._element.addEventListener(eventName, (event) => {
            const delegatedTarget = event.target.closest(selector);
            if (!delegatedTarget) {
                return;
            }
            callback(event);
        });
    }

    emit(eventName, data) {
        const callbacks = this._callbackMap[eventName];
        if (!callbacks) {
            return;
        }
        callbacks.forEach((callback) => {
            callback(data);
        })
    }

    subscribe(eventName, callback) {
        if (!this._callbackMap[eventName]) {
            this._callbackMap[eventName] = [];
        }
        this._callbackMap[eventName].push(callback);
    }

    unsubscribe(eventName, callbackToRemove) {
        const callbacks = this._callbackMap[eventName];
        if (callbacks) {
            this._callbackMap[eventName] = callbacks
                .filter((cb) => cb !== callbackToRemove)
        }
    }

    hide() {
        this._element.hidden = true;
    }

    show() {
        this._element.hidden = false;
    }
}

// this.on('click', '[data-element="add-to-cart"]', (event) => {
//     const phoneEl = event.target.closest('[data-element="phone-element"]');
//     const phoneId = phoneEl.dataset.phoneId;
//     console.log(phoneId);
//     this.emit('add-to-cart', phoneId);
// })

// const phoneId = null;

//         this.on('click', '[data-element="add-to-cart"]', (event) => {
//             if (event.target.closest('[data-element="phone-element"]')) {
//                 const phoneEl = event.target.closest('[data-element="phone-element"]');
//                 phoneId = phoneEl.dataset.phoneId;
//             } else

//                 phoneId = phoneEl._phoneDetails.name;
//             console.log(phoneId);
//             this.emit('add-to-cart', phoneId);
//         })