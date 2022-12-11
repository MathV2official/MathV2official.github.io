export class SecondaryChannelSynchronizer {
    constructor() {
        this._channels = [];
    }
    registerChannel(channel) {
        this._channels.push(channel);
    }
    // Common things all Secondary channels will handle
    async onSession() {
        await Promise.all(this._channels.map(channel => channel.onSession()));
    }
    async onFocus(sessionDuration) {
        await Promise.all(this._channels.map(channel => channel.onFocus(sessionDuration)));
    }
    async setTags(tags) {
        await Promise.all(this._channels.map(channel => channel.setTags(tags)));
    }
    async setExternalUserId(id, authHash) {
        await Promise.all(this._channels.map(channel => channel.setExternalUserId(id, authHash)));
    }
}
//# sourceMappingURL=SecondaryChannelSynchronizer.js.map