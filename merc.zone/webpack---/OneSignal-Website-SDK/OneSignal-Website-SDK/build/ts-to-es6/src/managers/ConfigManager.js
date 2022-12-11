import OneSignalApi from '../OneSignalApi';
import {
    ConfigHelper
} from "../helpers/ConfigHelper";
/**
 * Handles downloading settings from OneSignal and performing any other initialization-related tasks.
 */
export default class ConfigManager {
    /**
     * Downloads configuration from the OneSignal dashboard, merges it with user-supplied configuration from JavaScript
     * code, and returns Web SDK-specific configuration.
     */
    async getAppConfig(userConfig) {
        return await ConfigHelper.getAppConfig(userConfig, OneSignalApi.downloadServerAppConfig);
    }
    /**
     * Merges configuration downloaded from the OneSignal dashboard with user-provided JavaScript configuration to produce
     * a final web SDK-specific configuration.
     */
    getMergedConfig(userConfig, serverConfig) {
        return ConfigHelper.getMergedConfig(userConfig, serverConfig);
    }
}
//# sourceMappingURL=ConfigManager.js.map