import bowser from 'bowser';
import NotImplementedError from '../errors/NotImplementedError';
import {
    SubscriptionStateKind
} from './SubscriptionStateKind';
import {
    DeviceRecord
} from './DeviceRecord';
/**
 * Describes a push notification device record.
 */
export class PushDeviceRecord extends DeviceRecord {
    /**
     * @param subscription Omitting this parameter does not void the record's identifier.
     */
    constructor(subscription) {
        super();
        this.subscription = subscription;
    }
    serialize() {
        const serializedBundle = super.serialize();
        if (this.subscription) {
            serializedBundle.identifier = bowser.safari ?
                this.subscription.safariDeviceToken :
                this.subscription.w3cEndpoint ? this.subscription.w3cEndpoint.toString() : null;
            serializedBundle.web_auth = this.subscription.w3cAuth;
            serializedBundle.web_p256 = this.subscription.w3cP256dh;
        }
        return serializedBundle;
    }
    static createFromPushSubscription(appId, rawPushSubscription, subscriptionState) {
        const pushRegistration = new PushDeviceRecord(rawPushSubscription);
        pushRegistration.appId = appId;
        pushRegistration.subscriptionState = rawPushSubscription ?
            SubscriptionStateKind.Subscribed :
            SubscriptionStateKind.NotSubscribed;
        if (subscriptionState) {
            pushRegistration.subscriptionState = subscriptionState;
        }
        return pushRegistration;
    }
    deserialize(_) {
        throw new NotImplementedError();
    }
}
//# sourceMappingURL=PushDeviceRecord.js.map