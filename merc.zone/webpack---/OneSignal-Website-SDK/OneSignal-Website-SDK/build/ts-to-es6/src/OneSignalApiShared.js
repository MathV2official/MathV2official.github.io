import {
    OneSignalApiErrorKind,
    OneSignalApiError
} from './errors/OneSignalApiError';
import OneSignalApiBase from "./OneSignalApiBase";
import Utils from "./context/shared/utils/Utils";
import Log from "./libraries/Log";
export default class OneSignalApiShared {
    static getPlayer(appId, playerId) {
        Utils.enforceAppId(appId);
        Utils.enforcePlayerId(playerId);
        return OneSignalApiBase.get(`players/${playerId}?app_id=${appId}`);
    }
    static updatePlayer(appId, playerId, options) {
        Utils.enforceAppId(appId);
        Utils.enforcePlayerId(playerId);
        return OneSignalApiBase.put(`players/${playerId}`, Object.assign({
            app_id: appId
        }, options));
    }
    static sendNotification(appId, playerIds, titles, contents, url, icon, data, buttons) {
        var params = {
            app_id: appId,
            contents: contents,
            include_player_ids: playerIds,
            isAnyWeb: true,
            data: data,
            web_buttons: buttons
        };
        if (titles) {
            params.headings = titles;
        }
        if (url) {
            params.url = url;
        }
        if (icon) {
            params.chrome_web_icon = icon;
            params.firefox_icon = icon;
        }
        Utils.trimUndefined(params);
        return OneSignalApiBase.post('notifications', params);
    }
    static async createUser(deviceRecord) {
        const serializedDeviceRecord = deviceRecord.serialize();
        Utils.enforceAppId(serializedDeviceRecord.app_id);
        const response = await OneSignalApiBase.post(`players`, serializedDeviceRecord);
        if (response && response.success)
            return response.id;
        return null;
    }
    static async logoutEmail(appConfig, emailProfile, deviceId) {
        Utils.enforceAppId(appConfig.appId);
        Utils.enforcePlayerId(deviceId);
        const response = await OneSignalApiBase.post(`players/${deviceId}/email_logout`, {
            app_id: appConfig.appId,
            parent_player_id: emailProfile.subscriptionId,
            identifier_auth_hash: emailProfile.identifierAuthHash ? emailProfile.identifierAuthHash : undefined
        });
        if (response && response.success) {
            return true;
        } else {
            return false;
        }
    }
    static async updateUserSession(userId, deviceRecord) {
        try {
            const serializedDeviceRecord = deviceRecord.serialize();
            Utils.enforceAppId(serializedDeviceRecord.app_id);
            Utils.enforcePlayerId(userId);
            const response = await OneSignalApiBase.post(`players/${userId}/on_session`, serializedDeviceRecord);
            if (response.id) {
                // A new user ID can be returned
                return response.id;
            } else {
                return userId;
            }
        } catch (e) {
            if (e && Array.isArray(e.errors) && e.errors.length > 0 &&
                Utils.contains(e.errors[0], 'app_id not found')) {
                throw new OneSignalApiError(OneSignalApiErrorKind.MissingAppId);
            } else
                throw e;
        }
    }
    static async sendOutcome(data) {
        Log.info("Outcome payload:", data);
        try {
            await OneSignalApiBase.post("outcomes/measure", data);
        } catch (e) {
            Log.error("sendOutcome", e);
        }
    }
}
//# sourceMappingURL=OneSignalApiShared.js.map