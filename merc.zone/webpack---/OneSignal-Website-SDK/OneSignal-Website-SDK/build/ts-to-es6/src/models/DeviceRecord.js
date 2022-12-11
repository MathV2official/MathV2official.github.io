import bowser from 'bowser';
import Environment from '../Environment';
import NotImplementedError from '../errors/NotImplementedError';
import {
    DeliveryPlatformKind
} from './DeliveryPlatformKind';
import {
    OneSignalUtils
} from "../utils/OneSignalUtils";
/**
 * Describes the fields of a OneSignal "player" device record.
 *
 * This is used when creating or modifying push and email records.
 */
export class DeviceRecord {
    constructor() {
        // TODO: Possible implementation for appId initialization
        // this.appId = OneSignal.context.appConfig.appId;
        this.language = Environment.getLanguage();
        this.timezone = new Date().getTimezoneOffset() * -60;
        this.timezoneId = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const browserVersion = parseInt(String(bowser.version), 10);
        this.browserVersion = isNaN(browserVersion) ? -1 : browserVersion;
        this.deviceModel = navigator.platform;
        this.sdkVersion = Environment.version().toString();
        this.deliveryPlatform = this.getDeliveryPlatform();
        // Unimplemented properties are appId, subscriptionState, and subscription
    }
    isSafari() {
        return bowser.safari && window.safari !== undefined && window.safari.pushNotification !== undefined;
    }
    getDeliveryPlatform() {
        // For testing purposes, allows changing the browser user agent
        const browser = OneSignalUtils.redetectBrowserUserAgent();
        if (this.isSafari()) {
            return DeliveryPlatformKind.Safari;
        } else if (browser.firefox) {
            return DeliveryPlatformKind.Firefox;
        } else if (browser.msedge) {
            return DeliveryPlatformKind.Edge;
        } else {
            return DeliveryPlatformKind.ChromeLike;
        }
    }
    serialize() {
        const serializedBundle = {
            device_type: this.deliveryPlatform,
            language: this.language,
            timezone: this.timezone,
            timezone_id: this.timezoneId,
            device_os: this.browserVersion,
            device_model: this.deviceModel,
            sdk: this.sdkVersion,
            notification_types: this.subscriptionState,
        };
        if (this.appId) {
            serializedBundle.app_id = this.appId;
        }
        if (this.externalUserId) {
            serializedBundle.external_user_id = this.externalUserId;
        }
        if (this.externalUserIdAuthHash) {
            serializedBundle.external_user_id_auth_hash = this.externalUserIdAuthHash;
        }
        return serializedBundle;
    }
    deserialize(_) {
        throw new NotImplementedError();
    }
}
//# sourceMappingURL=DeviceRecord.js.map