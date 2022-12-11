import bowser from "bowser";
import {
    Browser
} from '../models/Browser';
import {
    OneSignalUtils
} from '../../../utils/OneSignalUtils';
import {
    isMacOSSafariInIframe
} from '../utils/BrowserSupportsPush';
import Utils from '../../shared/utils/Utils';
/**
 * EnvironmentInfoHelper is used to save page ("browser") context environment information to
 * the OneSignal object upon initialization
 */
export class EnvironmentInfoHelper {
    static getEnvironmentInfo() {
        return {
            browserType: this.getBrowser(),
            browserVersion: this.getBrowserVersion(),
            isHttps: this.isHttps(),
            isUsingSubscriptionWorkaround: this.isUsingSubscriptionWorkaround(),
            isBrowserAndSupportsServiceWorkers: this.supportsServiceWorkers(),
            requiresUserInteraction: this.requiresUserInteraction(),
            osVersion: this.getOsVersion(),
            canTalkToServiceWorker: this.canTalkToServiceWorker()
        };
    }
    static getBrowser() {
        if (bowser.chrome) {
            return Browser.Chrome;
        }
        if (bowser.msedge) {
            return Browser.Edge;
        }
        if (bowser.opera) {
            return Browser.Opera;
        }
        if (bowser.firefox) {
            return Browser.Firefox;
        }
        // use existing safari detection to be consistent
        if (this.isMacOSSafari()) {
            return Browser.Safari;
        }
        return Browser.Other;
    }
    // NOTE: Returns false in a ServiceWorker context
    static isMacOSSafari() {
        if (typeof window.safari !== "undefined") {
            return true;
        }
        return isMacOSSafariInIframe();
    }
    static getBrowserVersion() {
        return Utils.parseVersionString(bowser.version);
    }
    static isHttps() {
        return window ? (window.location && window.location.protocol === 'https:') : false;
    }
    static isUsingSubscriptionWorkaround() {
        return OneSignalUtils.isUsingSubscriptionWorkaround();
    }
    static supportsServiceWorkers() {
        return (window.navigator && 'serviceWorker' in window.navigator);
    }
    static requiresUserInteraction() {
        // Firefox 72+ requires user-interaction
        if (this.getBrowser() === "firefox" && this.getBrowserVersion() >= 72) {
            return true;
        }
        // Safari 12.1+ requires user-interaction
        if (this.getBrowser() === "safari" && this.getBrowserVersion() >= 12.1) {
            return true;
        }
        return false;
    }
    static getOsVersion() {
        return bowser.osversion;
    }
    static canTalkToServiceWorker() {
        return !!window.isSecureContext;
    }
}
//# sourceMappingURL=EnvironmentInfoHelper.js.map