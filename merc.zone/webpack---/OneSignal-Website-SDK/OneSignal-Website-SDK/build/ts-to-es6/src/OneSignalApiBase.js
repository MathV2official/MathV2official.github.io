import Environment from './Environment';
import SdkEnvironment from './managers/SdkEnvironment';
import {
    Utils
} from "./context/shared/utils/Utils";
import {
    OneSignalApiError,
    OneSignalApiErrorKind
} from './errors/OneSignalApiError';
import Log from "./libraries/Log";
export class OneSignalApiBase {
    static get(action, data, headers) {
        return OneSignalApiBase.call('GET', action, data, headers);
    }
    static post(action, data, headers) {
        return OneSignalApiBase.call('POST', action, data, headers);
    }
    static put(action, data, headers) {
        return OneSignalApiBase.call('PUT', action, data, headers);
    }
    static delete(action, data, headers) {
        return OneSignalApiBase.call('DELETE', action, data, headers);
    }
    static call(method, action, data, headers) {
        if (method === "GET") {
            if (action.indexOf("players") > -1 && action.indexOf("app_id=") === -1) {
                console.error("Calls to player api are not permitted without app_id");
                return Promise.reject(new OneSignalApiError(OneSignalApiErrorKind.MissingAppId));
            }
        } else {
            if (action.indexOf("players") > -1 && (!data || !data["app_id"])) {
                console.error("Calls to player api are not permitted without app_id");
                return Promise.reject(new OneSignalApiError(OneSignalApiErrorKind.MissingAppId));
            }
        }
        const callHeaders = new Headers();
        callHeaders.append("Origin", SdkEnvironment.getOrigin());
        callHeaders.append('SDK-Version', `onesignal/web/${Environment.version()}`);
        callHeaders.append('Content-Type', 'application/json;charset=UTF-8');
        if (headers) {
            for (const key of Object.keys(headers)) {
                callHeaders.append(key, headers[key]);
            }
        }
        const contents = {
            method: method || 'NO_METHOD_SPECIFIED',
            headers: callHeaders,
            cache: 'no-cache'
        };
        if (data)
            contents.body = JSON.stringify(data);
        let status;
        return fetch(SdkEnvironment.getOneSignalApiUrl(undefined, action).toString() + '/' + action, contents)
            .then(response => {
                status = response.status;
                return response.json();
            })
            .then(json => {
                if (status >= 200 && status < 300)
                    return json;
                else {
                    const error = OneSignalApiBase.identifyError(json);
                    if (error === 'no-user-id-error') {
                        // TODO: This returns undefined
                    } else {
                        return Promise.reject(json);
                    }
                }
            })
            .catch(err => {
                Log.warn(`Could not complete request to /${action}`, err);
                return Promise.reject(err);
            });
    }
    static identifyError(error) {
        if (!error || !error.errors) {
            return 'no-error';
        }
        const errors = error.errors;
        if (Utils.contains(errors, 'No user with this id found') ||
            Utils.contains(errors, 'Could not find app_id for given player id.')) {
            return 'no-user-id-error';
        }
        return 'unknown-error';
    }
}
export default OneSignalApiBase;
//# sourceMappingURL=OneSignalApiBase.js.map