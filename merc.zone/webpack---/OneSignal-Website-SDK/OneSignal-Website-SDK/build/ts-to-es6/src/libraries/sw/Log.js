export default class Log {
    static debug(...args) {
        if (!!self.shouldLog) {
            console.debug(...args);
        }
    }
    static trace(...args) {
        if (!!self.shouldLog) {
            console.trace(...args);
        }
    }
    static info(...args) {
        if (!!self.shouldLog) {
            console.info(...args);
        }
    }
    static warn(...args) {
        if (!!self.shouldLog) {
            console.warn(...args);
        }
    }
    static error(...args) {
        if (!!self.shouldLog) {
            console.error(...args);
        }
    }
}
//# sourceMappingURL=Log.js.map