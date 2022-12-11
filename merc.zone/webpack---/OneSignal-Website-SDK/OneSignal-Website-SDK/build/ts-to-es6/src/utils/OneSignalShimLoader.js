import {
    isPushNotificationsSupported
} from "../context/browser/utils/BrowserSupportsPush";
import {
    OneSignalStubES6
} from "./OneSignalStubES6";
import {
    OneSignalStubES5
} from "./OneSignalStubES5";
// NOTE: Careful if adding imports, ES5 targets can't clean up functions never called.
// See sdk.ts for what entry points this handles
export class OneSignalShimLoader {
    // NOTE: scripts added won't start executing until
    static addScriptToPage(url) {
        const scriptElement = document.createElement('script');
        scriptElement.src = url;
        scriptElement.async = true;
        document.head.appendChild(scriptElement);
    }
    // Same logic from SdkEnvironment
    static getPathAndPrefix() {
        const buildOrigin = (typeof __BUILD_ORIGIN__ !== "undefined") ? __BUILD_ORIGIN__ || "localhost" : "localhost";
        const productionOrigin = "https://cdn.onesignal.com/sdks/";
        if (typeof __BUILD_TYPE__ === "undefined") {
            return productionOrigin;
        }
        const isHttps = (typeof __IS_HTTPS__ !== "undefined") ? __IS_HTTPS__ : true;
        const protocol = isHttps ? "https" : "http";
        const port = isHttps ? 4001 : 4000;
        switch (__BUILD_TYPE__) {
            case "development":
                return __NO_DEV_PORT__ ? `${protocol}://${buildOrigin}/sdks/Dev-` : `${protocol}://${buildOrigin}:${port}/sdks/Dev-`;
            case "staging":
                return `https://${buildOrigin}/sdks/Staging-`;
            default:
                return productionOrigin;
        }
    }
    static isServiceWorkerRuntime() {
        return (typeof window === "undefined");
    }
    static addOneSignalPageES6SDKStub() {
        const predefinedOneSignal = window.OneSignal;
        const oneSignalIsArray = Array.isArray(predefinedOneSignal);
        // Do NOT replace window.OneSignal if it's something else other than an Array.
        if (!!predefinedOneSignal && !oneSignalIsArray) {
            console.error(`window.OneSignal already defined as '${typeof OneSignal}'!
         Please make sure to define as 'window.OneSignal = window.OneSignal || [];'`, OneSignal);
            return;
        }
        // Stub out all OneSignal functions with an implementation that save all params.
        // OneSignalPageSDKES6.js will load soon and the function calls will be replayed from pageSdkInit.ts
        // This is done regardless if document.currentScript.async is true as window.OneSignal needs to be available
        //   for those who use script.onload = function() { } to add OneSignalSDK.js
        window.OneSignal = new OneSignalStubES6(predefinedOneSignal);
    }
    // Stub out all functions with default values.
    // OneSignalStubES5 class is bundled into the production OneSignalSDK.js so other .js files are loaded.
    static addOneSignalPageES5SDKStub() {
        console.log("OneSignal: Using fallback ES5 Stub for backwards compatibility.");
        const predefinedOneSignal = window.OneSignal;
        window.OneSignal = new OneSignalStubES5(predefinedOneSignal);
    }
    static start() {
        // Check if someone setup OneSignal before we instructed them to use "OneSignalSDKWorker.js"
        //    instead of "OneSignal.js" for importScripts();
        if (OneSignalShimLoader.isServiceWorkerRuntime()) {
            self.importScripts(`${OneSignalShimLoader.getPathAndPrefix()}OneSignalSDKWorker.js?v=${OneSignalShimLoader.VERSION}`);
        } else if (isPushNotificationsSupported()) {
            OneSignalShimLoader.addScriptToPage(`${OneSignalShimLoader.getPathAndPrefix()}OneSignalPageSDKES6.js?v=${OneSignalShimLoader.VERSION}`);
            OneSignalShimLoader.addOneSignalPageES6SDKStub();
        } else {
            OneSignalShimLoader.addOneSignalPageES5SDKStub();
        }
    }
}
OneSignalShimLoader.VERSION = (typeof __VERSION__) === "undefined" ? 1 : Number(__VERSION__);
//# sourceMappingURL=OneSignalShimLoader.js.map