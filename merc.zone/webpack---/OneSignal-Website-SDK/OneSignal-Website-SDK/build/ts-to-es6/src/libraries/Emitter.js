/**
 * Source: https://github.com/pazguille/emitter-es6
 */
/**
 * Creates a new instance of Emitter.
 * @class
 * @returns {Object} emitter - An instance of Emitter.
 * @example
 * var emitter = new Emitter();
 */
export default class Emitter {
    constructor() {
        this._events = {};
    }
    /**
     * Adds a listener to the collection for a specified event.
     */
    on(event, listener) {
        this._events[event] = this._events[event] || [];
        this._events[event].push(listener);
        return this;
    }
    /**
     * Adds a one time listener to the collection for a specified event. It will
     * execute only once.
     */
    once(event, listener) {
        const that = this;

        function fn() {
            that.off(event, fn);
            listener.apply(this, arguments);
        }
        fn.listener = listener;
        this.on(event, fn);
        return this;
    }
    /**
     * Removes a listener from the collection for a specified event.
     */
    off(event, listener) {
        const listeners = this._events[event];
        if (listeners !== undefined) {
            for (let j = 0; j < listeners.length; j += 1) {
                if (listeners[j] === listener || listeners[j].listener === listener) {
                    listeners.splice(j, 1);
                    break;
                }
            }
            if (listeners.length === 0)
                this.removeAllListeners(event);
        }
        return this;
    }
    /**
     * Removes all listeners from the collection for a specified event.
     */
    removeAllListeners(event) {
        try {
            if (event)
                delete this._events[event];
            else
                this._events = {};
        } catch (e) {}
        return this;
    }
    /**
     * Returns all listeners from the collection for a specified event.
     * @public
     * @function
     * @name Emitter#listeners
     * @param {String} event - Event name.
     * @returns {Array}
     * @example
     * me.listeners('ready');
     */
    listeners(event) {
        try {
            return this._events[event];
        } catch (e) {
            return undefined;
        }
    }
    /**
     * Returns number of listeners from the collection for a specified event.
     * @public
     * @function
     * @name Emitter#numberOfListeners
     * @param {String} event - Event name.
     * @returns {number}
     * @example
     * me.numberOfListeners('ready');
     */
    numberOfListeners(event) {
        const listeners = this.listeners(event);
        if (listeners)
            return listeners.length;
        return 0;
    }
    /**
     * Execute each item in the listener collection in order with the specified data.
     * @param event - String of the event name
     * @param args - Variable number of args to pass to the functions subscribe to the event
     */
    async emit(...args) {
        const event = args.shift();
        let listeners = this._events[event];
        if (listeners !== undefined) {
            listeners = listeners.slice(0);
            const len = listeners.length;
            for (let i = 0; i < len; i += 1)
                await listeners[i].apply(this, args);
        }
        return this;
    }
}
//# sourceMappingURL=Emitter.js.map