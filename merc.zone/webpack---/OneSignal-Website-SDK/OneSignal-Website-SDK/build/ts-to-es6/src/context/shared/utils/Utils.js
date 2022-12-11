import TimeoutError from '../../../errors/TimeoutError';
import {
    OneSignalApiErrorKind,
    OneSignalApiError
} from "../../../errors/OneSignalApiError";
export class Utils {
    /**
     * Returns true if match is in string; otherwise, returns false.
     */
    static contains(indexOfAble, match) {
        if (!indexOfAble)
            return false;
        return indexOfAble.indexOf(match) !== -1;
    }
    static getConsoleStyle(style) {
        if (style == 'code') {
            return `padding: 0 1px 1px 5px;border: 1px solid #ddd;border-radius: 3px;font-family: Monaco,"DejaVu Sans Mono","Courier New",monospace;color: #444;`;
        } else if (style == 'bold') {
            return `font-weight: 600;color: rgb(51, 51, 51);`;
        } else if (style == 'alert') {
            return `font-weight: 600;color: red;`;
        } else if (style == 'event') {
            return `color: green;`;
        } else if (style == 'postmessage') {
            return `color: orange;`;
        } else if (style == 'serviceworkermessage') {
            return `color: purple;`;
        } else {
            return '';
        }
    }
    /**
     * Returns the current object without keys that have undefined values.
     * Regardless of whether the return result is used, the passed-in object is destructively modified.
     * Only affects keys that the object directly contains (i.e. not those inherited via the object's prototype).
     * @param object
     */
    static trimUndefined(object) {
        for (const property in object) {
            if (object.hasOwnProperty(property)) {
                if (object[property] === undefined) {
                    delete object[property];
                }
            }
        }
        return object;
    }
    /**
     * Capitalizes the first letter of the string.
     * @returns {string} The string with the first letter capitalized.
     */
    static capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
    static isNullOrUndefined(value) {
        return typeof value === 'undefined' || value === null;
    }
    static valueOrDefault(value, defaultValue) {
        if (typeof value === "undefined" || value === null) {
            return defaultValue;
        }
        return value;
    }
    /**
     * JSON.stringify() but converts functions to "[Function]" so they aren't lost.
     * Helps when logging method calls.
     */
    static stringify(obj) {
        return JSON.stringify(obj, (_, value) => {
            if (typeof value === 'function') {
                return "[Function]";
            } else {
                return value;
            }
        }, 4);
    }
    /**
     * Used for generating query params
     *  e.g: -> hash = { appId } // with appId = '1234'
     *       -> returns "appId=1234"
     * @param  {any} hash
     * @returns string
     */
    static encodeHashAsUriComponent(hash) {
        let uriComponent = '';
        const keys = Object.keys(hash);
        for (const key of keys) {
            const value = hash[key];
            uriComponent += `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
        return uriComponent;
    }
    static timeoutPromise(promise, milliseconds) {
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new TimeoutError());
            }, milliseconds);
        });
        return Promise.race([promise, timeoutPromise]);
    }
    static getValueOrDefault(value, defaultValue) {
        if (value !== undefined && value !== null) {
            return value;
        }
        return defaultValue;
    }
    /**
     * This is similar to ECMAScript2107 String.prototype.padStart.
     * Switch to this after updating TypeScript and can confirm it gets transpiled down to ES6
     * @param str - String to pad left
     * @param targetLength - Length to make the string
     * @param padString - String value of length one to pad with.
     * @returns {string} - Resulting string padded
     */
    static padStart(str, targetLength, padString) {
        let result = str;
        while (result.length < targetLength) {
            result = padString + result;
        }
        return result;
    }
    /**
     * Returns trimmed version number
     * e.g: "10.01.30" becomes "10.01"
     * @param version - version number we want to check
     */
    static parseVersionString(version) {
        const osVersionParts = version.toString().split(".");
        const majorVersion = Utils.padStart(osVersionParts[0], 2, "0");
        let minorVersion;
        if (osVersionParts[1]) {
            minorVersion = Utils.padStart(osVersionParts[1], 2, "0");
        } else {
            minorVersion = "00";
        }
        return Number(`${majorVersion}.${minorVersion}`);
    }
    /**
     * Gives back the last x number of parts providing a string with a delimiter.
     * Example: lastParts("api.staging.onesignal.com", ".", 3) will return "staging.onesignal.com"
     */
    static lastParts(subject, delimiter, maxParts) {
        const parts = subject.split(delimiter);
        const skipParts = Math.max(parts.length - maxParts, 0);
        return parts.slice(skipParts).join(delimiter);
    }
    static enforceAppId(appId) {
        if (!appId) {
            throw new Error("App id cannot be empty");
        }
    }
    static enforcePlayerId(playerId) {
        if (!playerId) {
            throw new Error("Player id cannot be empty");
        }
    }
    static async enforceAppIdAndPlayerId(appId, playerId, funcToExecute) {
        Utils.enforceAppId(appId);
        Utils.enforcePlayerId(playerId);
        try {
            return await funcToExecute();
        } catch (e) {
            if (e && Array.isArray(e.errors) && e.errors.length > 0 &&
                Utils.contains(e.errors[0], "app_id not found")) {
                throw new OneSignalApiError(OneSignalApiErrorKind.MissingAppId);
            } else
                throw e;
        }
    }
    static sortArrayOfObjects(arrayToSort, predicateForProperty, descending = false, doItInPlace = true) {
        const internalArrayToSort = doItInPlace ? arrayToSort : arrayToSort.slice();
        internalArrayToSort.sort((a, b) => {
            const propertyA = predicateForProperty(a);
            const propertyB = predicateForProperty(b);
            if (propertyA > propertyB) {
                return !!descending ? -1 : 1;
            }
            if (propertyA < propertyB) {
                return !!descending ? 1 : -1;
            }
            return 0;
        });
        return internalArrayToSort;
    }
}
export default Utils;
//# sourceMappingURL=Utils.js.map