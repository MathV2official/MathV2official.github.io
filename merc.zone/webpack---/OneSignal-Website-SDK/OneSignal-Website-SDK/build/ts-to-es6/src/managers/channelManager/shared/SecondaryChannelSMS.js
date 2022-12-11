import {
    NotSubscribedError,
    NotSubscribedReason
} from "../../../errors/NotSubscribedError";
import Log from "../../../libraries/Log";
import Database from "../../../services/Database";
import {
    SMSProfile
} from "../../../models/SMSProfile";
import Event from "../../../Event";
export class SecondaryChannelSMS {
    constructor(secondaryChannelIdentifierUpdater, secondaryChannelExternalUserIdUpdater, secondaryChannelTagsUpdater, secondaryChannelSessionUpdater, secondaryChannelFocusUpdater) {
        this.secondaryChannelIdentifierUpdater = secondaryChannelIdentifierUpdater;
        this.secondaryChannelExternalUserIdUpdater = secondaryChannelExternalUserIdUpdater;
        this.secondaryChannelTagsUpdater = secondaryChannelTagsUpdater;
        this.secondaryChannelSessionUpdater = secondaryChannelSessionUpdater;
        this.secondaryChannelFocusUpdater = secondaryChannelFocusUpdater;
    }
    async logout() {
        // 1. Check if we have an registered sms to logout to begin with.
        const smsProfile = await Database.getSMSProfile();
        if (!smsProfile.subscriptionId) {
            Log.warn(new NotSubscribedError(NotSubscribedReason.NoSMSSet));
            return false;
        }
        // 2. If above is successful clear the SMS profile.
        await Database.setSMSProfile(new SMSProfile());
        return true;
    }
    async setIdentifier(identifier, authHash) {
        const profile = await this.secondaryChannelIdentifierUpdater.setIdentifier(identifier, authHash);
        await Event.trigger(OneSignal.EVENTS.SMS_SUBSCRIPTION_CHANGED, {
            sms: profile.identifier
        });
        return profile.subscriptionId;
    }
    async onSession() {
        await this.secondaryChannelSessionUpdater.sendOnSession();
    }
    async onFocus(sessionDuration) {
        await this.secondaryChannelFocusUpdater.sendOnFocus(sessionDuration);
    }
    async setTags(tags) {
        await this.secondaryChannelTagsUpdater.sendTags(tags);
    }
    async setExternalUserId(id, authHash) {
        await this.secondaryChannelExternalUserIdUpdater.setExternalUserId(id, authHash);
    }
}
//# sourceMappingURL=SecondaryChannelSMS.js.map