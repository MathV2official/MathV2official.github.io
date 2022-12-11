import {
    OneSignalApiBase
} from "./OneSignalApiBase";
import {
    SubscriptionStateKind
} from "./models/SubscriptionStateKind";
import Log from "./libraries/Log";
import {
    Utils
} from "./context/shared/utils/Utils";
import {
    OutcomeAttributionType
} from "./models/Outcomes";
export class OneSignalApiSW {
    static async downloadServerAppConfig(appId) {
        Utils.enforceAppId(appId);
        return await new Promise((resolve, _reject) => {
            resolve(OneSignalApiBase.get(`sync/${appId}/web`, null));
        });
    }
    /**
     * Given a GCM or Firefox subscription endpoint or Safari device token, returns the user ID from OneSignal's server.
     * Used if the user clears his or her IndexedDB database and we need the user ID again.
     */
    static getUserIdFromSubscriptionIdentifier(appId, deviceType, identifier) {
        // Calling POST /players with an existing identifier returns us that player ID
        Utils.enforceAppId(appId);
        return OneSignalApiBase.post("players", {
            app_id: appId,
            device_type: deviceType,
            identifier: identifier,
            notification_types: SubscriptionStateKind.TemporaryWebRecord,
        }).then((response) => {
            if (response && response.id) {
                return response.id;
            } else {
                return null;
            }
        }).catch(e => {
            Log.debug("Error getting user ID from subscription identifier:", e);
            return null;
        });
    }
    static async updatePlayer(appId, playerId, options) {
        const funcToExecute = async () => {
            await OneSignalApiBase.put(`players/${playerId}`, Object.assign({
                app_id: appId
            }, options));
        };
        return await Utils.enforceAppIdAndPlayerId(appId, playerId, funcToExecute);
    }
    static async updateUserSession(userId, serializedDeviceRecord) {
        const funcToExecute = async () => {
            const response = await OneSignalApiBase.post(`players/${userId}/on_session`, serializedDeviceRecord);
            if (response.id) {
                // A new user ID can be returned
                return response.id;
            } else {
                return userId;
            }
        };
        return await Utils.enforceAppIdAndPlayerId(serializedDeviceRecord.app_id, userId, funcToExecute);
    }
    static async sendSessionDuration(appId, deviceId, sessionDuration, deviceType, attribution) {
        const funcToExecute = async () => {
            const payload = {
                app_id: appId,
                type: 1,
                state: "ping",
                active_time: sessionDuration,
                device_type: deviceType,
            };
            switch (attribution.type) {
                case OutcomeAttributionType.Direct:
                    payload.direct = true;
                    payload.notification_ids = attribution.notificationIds;
                    break;
                case OutcomeAttributionType.Indirect:
                    payload.direct = false;
                    payload.notification_ids = attribution.notificationIds;
                    break;
                default:
                    break;
            }
            await OneSignalApiBase.post(`players/${deviceId}/on_focus`, payload);
        };
        Utils.enforceAppIdAndPlayerId(appId, deviceId, funcToExecute);
    }
}
export default OneSignalApiSW;
//# sourceMappingURL=OneSignalApiSW.js.map