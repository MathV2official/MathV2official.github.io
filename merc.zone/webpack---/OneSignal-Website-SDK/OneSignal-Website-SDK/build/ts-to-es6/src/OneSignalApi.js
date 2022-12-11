import JSONP from 'jsonp';
import SdkEnvironment from "./managers/SdkEnvironment";
import {
    WindowEnvironmentKind
} from './models/WindowEnvironmentKind';
import OneSignalApiSW from "./OneSignalApiSW";
import OneSignalApiShared from "./OneSignalApiShared";
export default class OneSignalApi {
    static getPlayer(appId, playerId) {
        return OneSignalApiShared.getPlayer(appId, playerId);
    }
    static updatePlayer(appId, playerId, options) {
        return OneSignalApiShared.updatePlayer(appId, playerId, options);
    }
    static sendNotification(appId, playerIds, titles, contents, url, icon, data, buttons) {
        return OneSignalApiShared.sendNotification(appId, playerIds, titles, contents, url, icon, data, buttons);
    }
    static jsonpLib(url, fn) {
        JSONP(url, null, fn);
    }
    static async downloadServerAppConfig(appId) {
        if (SdkEnvironment.getWindowEnv() !== WindowEnvironmentKind.ServiceWorker) {
            return await new Promise((resolve, reject) => {
                // Due to CloudFlare's algorithms, the .js extension is required for proper caching. Don't remove it!
                OneSignalApi.jsonpLib(`${SdkEnvironment.getOneSignalApiUrl().toString()}/sync/${appId}/web`, (err, data) => {
                    if (err)
                        reject(err);
                    else {
                        if (data.success)
                            resolve(data);
                        else // For JSONP, we return a 200 even for errors, there's a success: false param
                            reject(data);
                    }
                });
            });
        } else {
            return await OneSignalApiSW.downloadServerAppConfig(appId);
        }
    }
    static async createUser(deviceRecord) {
        return await OneSignalApiShared.createUser(deviceRecord);
    }
    static async logoutEmail(appConfig, emailProfile, deviceId) {
        return await OneSignalApiShared.logoutEmail(appConfig, emailProfile, deviceId);
    }
    static async updateUserSession(userId, deviceRecord) {
        return await OneSignalApiShared.updateUserSession(userId, deviceRecord);
    }
}
//# sourceMappingURL=OneSignalApi.js.map