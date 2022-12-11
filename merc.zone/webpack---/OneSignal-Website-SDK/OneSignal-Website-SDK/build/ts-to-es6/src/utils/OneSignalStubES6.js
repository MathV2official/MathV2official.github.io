// NOTE: This is used with the OneSignalSDK.js shim
// Careful if adding imports, ES5 targets can't clean up functions never called.
import {
    OneSignalStub
} from "./OneSignalStub";
export class OneSignalStubES6 extends OneSignalStub {
    constructor(preExistingArray) {
        super(Object.getOwnPropertyNames(OneSignalStubES6.prototype));
        // This array will contain calls made on windows.OneSignal (w/ push or direct method calls)
        //   AFTER OneSignalSDK.js was loaded, BUT before OneSignalPageSDKES6.js was loaded.
        this.directFunctionCallsArray = new Array();
        this.preExistingArray = preExistingArray;
    }
    // @Override
    isPushNotificationsSupported() {
        return true;
    }
    // @Override
    // Save function name and params to be called later when the full SDK loads
    stubFunction(thisObj, functionName, args) {
        thisObj.directFunctionCallsArray.push({
            functionName,
            args,
            delayedPromise: undefined
        });
    }
    // @Override
    // Save function name, params, and a delayed Promise to be called later when the full SDK loads
    stubPromiseFunction(thisObj, functionName, args) {
        let delayedPromise = undefined;
        const promise = new Promise((resolve, reject) => {
            delayedPromise = {
                resolve,
                reject
            };
        });
        thisObj.directFunctionCallsArray.push({
            functionName,
            delayedPromise,
            args
        });
        return promise;
    }
}
//# sourceMappingURL=OneSignalStubES6.js.map