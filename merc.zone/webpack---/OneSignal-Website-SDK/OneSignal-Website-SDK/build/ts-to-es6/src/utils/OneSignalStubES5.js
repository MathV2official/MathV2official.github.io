// NOTE: This is used with the OneSignalSDK.js shim
// Careful if adding imports, ES5 targets can't clean up functions never called.
import {
    OneSignalStub
} from "./OneSignalStub";
import {
    ProcessOneSignalPushCalls
} from "./ProcessOneSignalPushCalls";
import Log from "../libraries/Log";
export class OneSignalStubES5 extends OneSignalStub {
    constructor(stubOneSignal) {
        super(Object.getOwnPropertyNames(OneSignalStubES5.prototype));
        window.OneSignal = this;
        this.playPushes(stubOneSignal);
    }
    // @Override
    isPushNotificationsSupported() {
        return false;
    }
    // @Override
    isPushNotificationsEnabled() {
        return OneSignalStubES5.newPromiseIfDefined((resolve) => {
            resolve(false);
        });
    }
    // Implementation here so the passed in function is run and does not get dropped.
    // @Override
    push(item) {
        ProcessOneSignalPushCalls.processItem(this, item);
    }
    // By default do nothing unless the function is listed above.
    // @Override
    stubFunction(_thisObj, _functionName, _args) {}
    // Never resolve promises as no logic will be run from this ES5 stub for them.
    // @Override
    stubPromiseFunction(_thisObj, _functionName, _args) {
        return OneSignalStubES5.newPromiseIfDefined((_resolve, _reject) => {});
    }
    // Safely does NOT create a Promise if running on old ES5 browsers and it wasn't polyfilled.
    static newPromiseIfDefined(executor) {
        if (typeof(Promise) === "undefined")
            return undefined;
        else
            return new Promise(executor);
    }
    playPushes(toProcessArray) {
        if (!toProcessArray)
            return;
        for (const item of toProcessArray) {
            try {
                this.push(item);
            } catch (e) {
                Log.error(e);
            }
        }
    }
}
//# sourceMappingURL=OneSignalStubES5.js.map