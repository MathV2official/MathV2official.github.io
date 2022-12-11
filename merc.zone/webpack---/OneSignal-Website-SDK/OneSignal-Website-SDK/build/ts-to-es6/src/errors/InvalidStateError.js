import OneSignalError from "./OneSignalError";
import {
    PermissionPromptType
} from "../models/PermissionPromptType";
export var InvalidStateReason;
(function(InvalidStateReason) {
    InvalidStateReason[InvalidStateReason["MissingAppId"] = 0] = "MissingAppId";
    InvalidStateReason[InvalidStateReason["RedundantPermissionMessage"] = 1] = "RedundantPermissionMessage";
    InvalidStateReason[InvalidStateReason["PushPermissionAlreadyGranted"] = 2] = "PushPermissionAlreadyGranted";
    InvalidStateReason[InvalidStateReason["UnsupportedEnvironment"] = 3] = "UnsupportedEnvironment";
    InvalidStateReason[InvalidStateReason["MissingDomElement"] = 4] = "MissingDomElement";
    InvalidStateReason[InvalidStateReason["ServiceWorkerNotActivated"] = 5] = "ServiceWorkerNotActivated";
    InvalidStateReason[InvalidStateReason["NoProxyFrame"] = 6] = "NoProxyFrame";
})(InvalidStateReason || (InvalidStateReason = {}));
export class InvalidStateError extends OneSignalError {
    constructor(reason, extra) {
        let errorMessage;
        switch (reason) {
            case InvalidStateReason.MissingAppId:
                errorMessage = `Missing required app ID.`;
                break;
            case InvalidStateReason.RedundantPermissionMessage:
                let extraInfo = '';
                if (extra && extra.permissionPromptType)
                    extraInfo = `(${PermissionPromptType[extra.permissionPromptType]})`;
                errorMessage = `Another permission message ${extraInfo} is being displayed.`;
                break;
            case InvalidStateReason.PushPermissionAlreadyGranted:
                errorMessage = `Push permission has already been granted.`;
                break;
            case InvalidStateReason.UnsupportedEnvironment:
                errorMessage = `The current environment does not support this operation.`;
                break;
            case InvalidStateReason.ServiceWorkerNotActivated:
                errorMessage = `The service worker must be activated first.`;
                break;
            case InvalidStateReason.NoProxyFrame:
                errorMessage = `No proxy frame.`;
                break;
        }
        super(errorMessage);
        this.description = InvalidStateReason[reason];
        this.reason = reason;
        /**
         * Important! Required to make sure the correct error type is detected during instanceof checks.
         * Same applies to all derived classes.
         * https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md
         * #extending-built-ins-like-error-array-and-map-may-no-longer-work
         */
        Object.setPrototypeOf(this, InvalidStateError.prototype);
    }
}
//# sourceMappingURL=InvalidStateError.js.map