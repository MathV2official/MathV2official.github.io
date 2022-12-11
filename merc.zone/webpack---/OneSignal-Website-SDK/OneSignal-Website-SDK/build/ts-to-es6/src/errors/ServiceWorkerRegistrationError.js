import OneSignalError from './OneSignalError';
export class ServiceWorkerRegistrationError extends OneSignalError {
    constructor(status, statusText) {
        super(`Registration of a Service Worker failed.`);
        this.status = status;
        this.statusText = statusText;
        /**
         * Important! Required to make sure the correct error type is detected during instanceof checks.
         * Same applies to all derived classes.
         * https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
         */
        Object.setPrototypeOf(this, ServiceWorkerRegistrationError.prototype);
    }
}
export default ServiceWorkerRegistrationError;
//# sourceMappingURL=ServiceWorkerRegistrationError.js.map