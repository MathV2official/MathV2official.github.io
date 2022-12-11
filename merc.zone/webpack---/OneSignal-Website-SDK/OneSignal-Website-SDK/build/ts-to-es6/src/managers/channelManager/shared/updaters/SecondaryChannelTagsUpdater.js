import OneSignalApi from "../../../../OneSignalApi";
import Database from "../../../../services/Database";
export class SecondaryChannelTagsUpdater {
    constructor(profileProvider) {
        this.profileProvider = profileProvider;
    }
    async sendTags(tags) {
        // We wait until we have a subscriptionId. We do this instead of an early return
        //   so we do not lose this value and the update can then be made as soon as possible.
        // Note: This promise may never resolve if the channel identifier is never set.
        //   - Example if OneSignal.setEmail(""..."") is never called
        const subscriptionId = await this.profileProvider.getSubscriptionId();
        const {
            appId
        } = await Database.getAppConfig();
        const identifierAuthHash = (await this.profileProvider.getProfile()).identifierAuthHash;
        const payload = {
            tags: tags,
            identifier_auth_hash: identifierAuthHash
        };
        await OneSignalApi.updatePlayer(appId, subscriptionId, payload);
    }
}
//# sourceMappingURL=SecondaryChannelTagsUpdater.js.map