export class SecondaryChannelProfileProviderBase {
    constructor() {
        this._pendingGetSubscriptionIdResolvers = [];
    }
    async setProfile(profile) {
        if (!profile.subscriptionId) {
            return;
        }
        const subscriptionId = profile.subscriptionId;
        this._pendingGetSubscriptionIdResolvers.map(resolve => {
            resolve(subscriptionId);
        });
        this._pendingGetSubscriptionIdResolvers = [];
    }
    /*
     * Awaitable until we can guarantee a subscriptionId is available
     */
    async getSubscriptionId() {
        // 1. If we already have a stored subscriptionId return it now.
        const profile = await this.getProfile();
        if (profile.subscriptionId) {
            return profile.subscriptionId;
        }
        // 2. If we don't, create a Promise and store it's resolve so we can fire it later.
        return new Promise((resolve) => {
            this._pendingGetSubscriptionIdResolvers.push(resolve);
        });
    }
}
//# sourceMappingURL=SecondaryChannelProfileProviderBase.js.map