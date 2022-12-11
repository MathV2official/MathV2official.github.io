export var NotificationPermission;
(function(NotificationPermission) {
    /**
     * The user has not granted notification permissions and may have just dismissed the notification permission prompt.
     */
    NotificationPermission["Default"] = "default";
    /**
     * The user has granted notification permissions.
     */
    NotificationPermission["Granted"] = "granted";
    /**
     * The user has blocked notifications.
     */
    NotificationPermission["Denied"] = "denied";
})(NotificationPermission || (NotificationPermission = {}));
//# sourceMappingURL=NotificationPermission.js.map