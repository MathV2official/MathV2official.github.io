export var SessionStatus;
(function(SessionStatus) {
    SessionStatus["Active"] = "active";
    SessionStatus["Inactive"] = "inactive";
    SessionStatus["Expired"] = "expired";
})(SessionStatus || (SessionStatus = {}));
export var SessionOrigin;
(function(SessionOrigin) {
    SessionOrigin[SessionOrigin["PlayerCreate"] = 1] = "PlayerCreate";
    SessionOrigin[SessionOrigin["PlayerOnSession"] = 2] = "PlayerOnSession";
    SessionOrigin[SessionOrigin["VisibilityVisible"] = 3] = "VisibilityVisible";
    SessionOrigin[SessionOrigin["VisibilityHidden"] = 4] = "VisibilityHidden";
    SessionOrigin[SessionOrigin["BeforeUnload"] = 5] = "BeforeUnload";
    SessionOrigin[SessionOrigin["PageRefresh"] = 6] = "PageRefresh";
    SessionOrigin[SessionOrigin["Focus"] = 7] = "Focus";
    SessionOrigin[SessionOrigin["Blur"] = 8] = "Blur";
})(SessionOrigin || (SessionOrigin = {}));
export const ONESIGNAL_SESSION_KEY = "oneSignalSession";
export function initializeNewSession(options) {
    const currentTimestamp = new Date().getTime();
    const sessionKey = options && options.sessionKey || ONESIGNAL_SESSION_KEY;
    const notificationId = (options && options.notificationId) || null;
    return {
        sessionKey,
        appId: options.appId,
        deviceId: options.deviceId,
        deviceType: options.deviceType,
        startTimestamp: currentTimestamp,
        accumulatedDuration: 0,
        notificationId,
        status: SessionStatus.Active,
        lastDeactivatedTimestamp: null,
        lastActivatedTimestamp: currentTimestamp,
    };
}
//# sourceMappingURL=Session.js.map