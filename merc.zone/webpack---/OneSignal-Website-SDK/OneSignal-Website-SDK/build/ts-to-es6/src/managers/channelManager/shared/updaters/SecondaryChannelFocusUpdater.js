import OneSignalApiBase from "../../../../OneSignalApiBase";
import Database from "../../../../services/Database";
export class SecondaryChannelFocusUpdater {
    constructor(profileProvider) {
        this.profileProvider = profileProvider;
    }
    async sendOnFocus(sessionDuration) {
        const profile = await this.profileProvider.getProfile();
        // If we haven't created a secondary device record yet then there isn't an on focus event to track.
        if (!profile.subscriptionId) {
            return;
        }
        const appConfig = await Database.getAppConfig();
        // NOTE: Omitting outcome attribution from the payload, only applies to push records.
        const payload = {
            app_id: appConfig.appId,
            type: 1,
            state: "ping",
            active_time: sessionDuration,
            device_type: this.profileProvider.deviceType,
        };
        await OneSignalApiBase.post(`players/${profile.subscriptionId}/on_focus`, payload);
    }
}
//# sourceMappingURL=SecondaryChannelFocusUpdater.js.map