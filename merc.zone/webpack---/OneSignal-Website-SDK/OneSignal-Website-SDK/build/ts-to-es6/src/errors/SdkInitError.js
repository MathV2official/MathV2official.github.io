import OneSignalError from "./OneSignalError";
export var SdkInitErrorKind;
(function(SdkInitErrorKind) {
    SdkInitErrorKind[SdkInitErrorKind["InvalidAppId"] = 0] = "InvalidAppId";
    SdkInitErrorKind[SdkInitErrorKind["AppNotConfiguredForWebPush"] = 1] = "AppNotConfiguredForWebPush";
    SdkInitErrorKind[SdkInitErrorKind["MissingSubdomain"] = 2] = "MissingSubdomain";
    SdkInitErrorKind[SdkInitErrorKind["WrongSiteUrl"] = 3] = "WrongSiteUrl";
    SdkInitErrorKind[SdkInitErrorKind["MultipleInitialization"] = 4] = "MultipleInitialization";
    SdkInitErrorKind[SdkInitErrorKind["MissingSafariWebId"] = 5] = "MissingSafariWebId";
    SdkInitErrorKind[SdkInitErrorKind["Unknown"] = 6] = "Unknown";
})(SdkInitErrorKind || (SdkInitErrorKind = {}));
export class SdkInitError extends OneSignalError {
    constructor(reason, extra) {
        let errorMessage;
        switch (reason) {
            case SdkInitErrorKind.InvalidAppId:
                errorMessage = 'OneSignal: This app ID does not match any existing app. Double check your app ID.';
                break;
            case SdkInitErrorKind.AppNotConfiguredForWebPush:
                errorMessage = `OneSignal: This app ID does not have any web platforms enabled. Double check your app` +
                    ` ID, or see step 1 on our setup guide (https://tinyurl.com/2x5jzk83).`;
                break;
            case SdkInitErrorKind.MissingSubdomain:
                errorMessage = `Non-HTTPS pages require the subdomainName parameter within the label set within the OneSignal Web configuration (https://tinyurl.com/ry39x7mk).`;
                break;
            case SdkInitErrorKind.WrongSiteUrl:
                if (extra && extra.siteUrl) {
                    errorMessage = `OneSignal: This web push config can only be used on ${new URL(extra.siteUrl).origin}.` +
                        ` Your current origin is ${location.origin}.`;
                } else {
                    errorMessage = 'OneSignal: This web push config can not be used on the current site.';
                }
                break;
            case SdkInitErrorKind.MultipleInitialization:
                errorMessage = `OneSignal: The OneSignal web SDK can only be initialized once. Extra initializations ` +
                    `are ignored. Please remove calls initializing the SDK more than once.`;
                break;
            case SdkInitErrorKind.MissingSafariWebId:
                errorMessage = `OneSignal: Safari browser support on Mac OS X requires the Safari web platform` +
                    ` to be enabled. Please see the Safari Support steps in our web setup guide.`;
                break;
            case SdkInitErrorKind.Unknown:
                errorMessage = 'OneSignal: An unknown initialization error occurred.';
                break;
        }
        super(errorMessage);
        this.reason = SdkInitErrorKind[reason];
        /**
         * Important! Required to make sure the correct error type is detected during instanceof checks.
         * Same applies to all derived classes.
         * https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md
         * #extending-built-ins-like-error-array-and-map-may-no-longer-work
         */
        Object.setPrototypeOf(this, SdkInitError.prototype);
    }
}
//# sourceMappingURL=SdkInitError.js.map