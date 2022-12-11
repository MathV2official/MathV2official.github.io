import OneSignalError from "./OneSignalError";
export var OneSignalApiErrorKind;
(function(OneSignalApiErrorKind) {
    OneSignalApiErrorKind[OneSignalApiErrorKind["MissingAppId"] = 0] = "MissingAppId";
})(OneSignalApiErrorKind || (OneSignalApiErrorKind = {}));
export class OneSignalApiError extends OneSignalError {
    constructor(reason) {
        let errorMessage;
        switch (reason) {
            case OneSignalApiErrorKind.MissingAppId:
                errorMessage = 'The API call is missing an app ID.';
                break;
        }
        super(errorMessage);
        /**
         * Important! Required to make sure the correct error type is detected during instanceof checks.
         * Same applies to all derived classes.
         * https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md
         * #extending-built-ins-like-error-array-and-map-may-no-longer-work
         */
        Object.setPrototypeOf(this, OneSignalApiError.prototype);
    }
}
//# sourceMappingURL=OneSignalApiError.js.map