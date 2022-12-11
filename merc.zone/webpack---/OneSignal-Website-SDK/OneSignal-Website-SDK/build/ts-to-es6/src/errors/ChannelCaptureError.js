import OneSignalError from "./OneSignalError";
export var InvalidChannelInputField;
(function(InvalidChannelInputField) {
    InvalidChannelInputField[InvalidChannelInputField["InvalidSms"] = 0] = "InvalidSms";
    InvalidChannelInputField[InvalidChannelInputField["InvalidEmail"] = 1] = "InvalidEmail";
    InvalidChannelInputField[InvalidChannelInputField["InvalidEmailAndSms"] = 2] = "InvalidEmailAndSms";
})(InvalidChannelInputField || (InvalidChannelInputField = {}));
export class ChannelCaptureError extends OneSignalError {
    constructor(reason) {
        let errorMessage;
        switch (reason) {
            case InvalidChannelInputField.InvalidEmail:
                errorMessage = `Invalid email`;
                break;
            case InvalidChannelInputField.InvalidSms:
                errorMessage = `Invalid sms`;
                break;
            case InvalidChannelInputField.InvalidEmailAndSms:
                errorMessage = `Invalid email & sms`;
                break;
            default:
                break;
        }
        super(errorMessage);
        this.description = InvalidChannelInputField[reason];
        this.reason = reason;
        /**
         * Important! Required to make sure the correct error type is detected during instanceof checks.
         * Same applies to all derived classes.
         * https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md
         * #extending-built-ins-like-error-array-and-map-may-no-longer-work
         */
        Object.setPrototypeOf(this, ChannelCaptureError.prototype);
    }
}
//# sourceMappingURL=ChannelCaptureError.js.map