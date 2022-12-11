// NOTE: This is used with the OneSignalSDK.js shim
// Careful if adding imports, ES5 targets can't clean up functions never called.
export class OneSignalStub {
    constructor(omitStubsFor) {
        this.VERSION = (typeof __VERSION__) === "undefined" ? 1 : Number(__VERSION__);
        this.log = {
            setLevel: (level) => {
                this.currentLogLevel = level;
            }
        };
        this.setupStubFunctions(OneSignalStub.FUNCTION_LIST_TO_STUB, this.stubFunction, omitStubsFor);
        this.setupStubFunctions(OneSignalStub.FUNCTION_LIST_WITH_PROMISE_TO_STUB, this.stubPromiseFunction, omitStubsFor);
    }
    setupStubFunctions(stubList, stubFunction, omitStubsFor) {
        for (const functionName of stubList) {
            if (omitStubsFor.indexOf(functionName) > -1)
                continue;
            const functionNameWithStub = (...args) => {
                return stubFunction(this, functionName, args);
            };
            Object.defineProperty(this, functionName, {
                value: functionNameWithStub
            });
        }
    }
}
OneSignalStub.FUNCTION_LIST_TO_STUB = [
    "on",
    "off",
    "once",
    "push"
];
OneSignalStub.FUNCTION_LIST_WITH_PROMISE_TO_STUB = [
    "init",
    "_initHttp",
    "isPushNotificationsEnabled",
    "showHttpPrompt",
    "registerForPushNotifications",
    "setDefaultNotificationUrl",
    "setDefaultTitle",
    "syncHashedEmail",
    "getTags",
    "sendTag",
    "sendTags",
    "deleteTag",
    "deleteTags",
    "addListenerForNotificationOpened",
    "getIdsAvailable",
    "setSubscription",
    "showHttpPermissionRequest",
    "showNativePrompt",
    "showSlidedownPrompt",
    "showCategorySlidedown",
    "showSmsSlidedown",
    "showEmailSlidedown",
    "showSmsAndEmailSlidedown",
    "getNotificationPermission",
    "getUserId",
    "getRegistrationId",
    "getSubscription",
    "sendSelfNotification",
    "setEmail",
    "setSMSNumber",
    "logoutEmail",
    "logoutSMS",
    "setExternalUserId",
    "removeExternalUserId",
    "getExternalUserId",
    "provideUserConsent",
    "isOptedOut",
    "getEmailId",
    "getSMSId",
    "sendOutcome"
];
//# sourceMappingURL=OneSignalStub.js.map