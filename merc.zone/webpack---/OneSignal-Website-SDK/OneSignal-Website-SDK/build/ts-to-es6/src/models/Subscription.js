export class Subscription {
    serialize() {
        return {
            deviceId: this.deviceId,
            subscriptionToken: this.subscriptionToken,
            optedOut: this.optedOut,
            createdAt: this.createdAt,
            expirationTime: this.expirationTime,
        };
    }
    static deserialize(bundle) {
        const subscription = new Subscription();
        subscription.deviceId = bundle.deviceId;
        subscription.subscriptionToken = bundle.subscriptionToken;
        subscription.optedOut = bundle.optedOut;
        subscription.createdAt = bundle.createdAt;
        subscription.expirationTime = bundle.expirationTime;
        return subscription;
    }
}
//# sourceMappingURL=Subscription.js.map