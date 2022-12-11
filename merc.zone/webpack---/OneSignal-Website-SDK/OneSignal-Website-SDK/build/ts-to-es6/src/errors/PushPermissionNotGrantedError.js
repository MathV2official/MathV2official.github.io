import OneSignalError from "./OneSignalError";
export var PushPermissionNotGrantedErrorReason;
(function(PushPermissionNotGrantedErrorReason) {
    PushPermissionNotGrantedErrorReason[PushPermissionNotGrantedErrorReason["Blocked"] = 0] = "Blocked";
    PushPermissionNotGrantedErrorReason[PushPermissionNotGrantedErrorReason["Dismissed"] = 1] = "Dismissed";
    PushPermissionNotGrantedErrorReason[PushPermissionNotGrantedErrorReason["Default"] = 2] = "Default";
})(PushPermissionNotGrantedErrorReason || (PushPermissionNotGrantedErrorReason = {}));
export default class PushPermissionNotGrantedError extends OneSignalError {
    constructor(reason) {
        let errorMessage;
        switch (reason) {
            case PushPermissionNotGrantedErrorReason.Dismissed:
                errorMessage = 'The user dismissed the permission prompt.';
                break;
            case PushPermissionNotGrantedErrorReason.Blocked:
                errorMessage = 'Notification permissions are blocked.';
                break;
            case PushPermissionNotGrantedErrorReason.Default:
                errorMessage = 'Notification permissions have not been granted yet.';
                break;
        }
        super(errorMessage);
        this.reason = reason;
        /**
         * Important! Required to make sure the correct error type is detected during instanceof checks.
         * Same applies to all derived classes.
         * https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md
         * #extending-built-ins-like-error-array-and-map-may-no-longer-work
         */
        Object.setPrototypeOf(this, PushPermissionNotGrantedError.prototype);
    }
}
//# sourceMappingURL=PushPermissionNotGrantedError.js.map