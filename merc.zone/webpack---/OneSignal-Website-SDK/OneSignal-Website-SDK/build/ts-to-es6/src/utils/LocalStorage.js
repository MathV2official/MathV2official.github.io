import {
    NotificationPermission
} from '../models/NotificationPermission';
import PermissionManager from '../managers/PermissionManager';
const IS_OPTED_OUT = "isOptedOut";
const IS_PUSH_NOTIFICATIONS_ENABLED = "isPushNotificationsEnabled";
const PAGE_VIEWS = "os_pageViews";
export default class LocalStorage {
    static getIsOptedOut() {
        return localStorage.getItem(IS_OPTED_OUT) === "true";
    }
    static getIsPushNotificationsEnabled() {
        return localStorage.getItem(IS_PUSH_NOTIFICATIONS_ENABLED) === "true";
    }
    static setIsOptedOut(value) {
        localStorage.setItem(IS_OPTED_OUT, value.toString());
    }
    static setIsPushNotificationsEnabled(value) {
        localStorage.setItem(IS_PUSH_NOTIFICATIONS_ENABLED, value.toString());
    }
    static setStoredPermission(value) {
        localStorage.setItem(PermissionManager.STORED_PERMISSION_KEY, value);
    }
    static getStoredPermission() {
        var permission = localStorage.getItem(PermissionManager.STORED_PERMISSION_KEY) || "default";
        switch (permission) {
            case "granted":
                return NotificationPermission.Granted;
            case "denied":
                return NotificationPermission.Denied;
            default:
                return NotificationPermission.Default;
        }
    }
    static setLocalPageViewCount(count) {
        localStorage.setItem(PAGE_VIEWS, count.toString());
    }
    static getLocalPageViewCount() {
        return Number(localStorage.getItem(PAGE_VIEWS));
    }
}
//# sourceMappingURL=LocalStorage.js.map