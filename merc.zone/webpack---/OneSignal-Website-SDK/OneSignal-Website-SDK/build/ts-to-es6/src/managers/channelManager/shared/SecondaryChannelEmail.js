import {
    NotSubscribedError,
    NotSubscribedReason
} from "../../../errors/NotSubscribedError";
import Log from "../../../libraries/Log";
import {
    EmailProfile
} from "../../../models/EmailProfile";
import OneSignalApi from "../../../OneSignalApi";
import Database from "../../../services/Database";
import Event from "../../../Event";
export class SecondaryChannelEmail {
    constructor(secondaryChannelIdentifierUpdater, secondaryChannelExternalUserIdUpdater, secondaryChannelTagsUpdater, secondaryChannelSessionUpdater, secondaryChannelFocusUpdater) {
        this.secondaryChannelIdentifierUpdater = secondaryChannelIdentifierUpdater;
        this.secondaryChannelExternalUserIdUpdater = secondaryChannelExternalUserIdUpdater;
        this.secondaryChannelTagsUpdater = secondaryChannelTagsUpdater;
        this.secondaryChannelSessionUpdater = secondaryChannelSessionUpdater;
        this.secondaryChannelFocusUpdater = secondaryChannelFocusUpdater;
    }
    async logout() {
        // 1. Check if we have an registered email to logout to begin with.
        const emailProfile = await Database.getEmailProfile();
        if (!emailProfile.subscriptionId) {
            Log.warn(new NotSubscribedError(NotSubscribedReason.NoEmailSet));
            return false;
        }
        // 2. Logout only applies if we a de-linking email from a push record.
        const {
            deviceId
        } = await Database.getSubscription();
        if (!deviceId) {
            Log.warn(new NotSubscribedError(NotSubscribedReason.NoDeviceId));
            return false;
        }
        // 3. Make logout email REST API call
        const appConfig = await Database.getAppConfig();
        if (!await OneSignalApi.logoutEmail(appConfig, emailProfile, deviceId)) {
            Log.warn("Failed to logout email.");
            return false;
        }
        // 4. If above is successful clear the email profile.
        await Database.setEmailProfile(new EmailProfile());
        return true;
    }
    async setIdentifier(identifier, authHash) {
        const {
            profileProvider
        } = this.secondaryChannelIdentifierUpdater;
        const emailProfileBefore = await profileProvider.getProfile();
        const profile = await this.secondaryChannelIdentifierUpdater.setIdentifier(identifier, authHash);
        const newEmailSubscriptionId = profile.subscriptionId;
        if (newEmailSubscriptionId) {
            const emailProfileAfter = profileProvider.newProfile(newEmailSubscriptionId, identifier);
            await this.updatePushPlayersRelationToEmailPlayer(emailProfileBefore, emailProfileAfter);
        }
        await Event.trigger(OneSignal.EVENTS.EMAIL_SUBSCRIPTION_CHANGED, {
            email: profile.identifier
        });
        return newEmailSubscriptionId;
    }
    async updatePushPlayersRelationToEmailPlayer(existingEmailProfile, newEmailProfile) {
        const {
            deviceId
        } = await Database.getSubscription();
        // If we are subscribed to web push
        const isExistingPushRecordSaved = deviceId;
        // And if we previously saved an email ID and it's different from the new returned ID
        const isExistingEmailSaved = !!existingEmailProfile.subscriptionId;
        const emailPreviouslySavedAndDifferent = !isExistingEmailSaved ||
            existingEmailProfile.subscriptionId !== newEmailProfile.subscriptionId;
        // Or if we previously saved an email and the email changed
        const emailPreviouslySavedAndChanged = !existingEmailProfile.identifier ||
            newEmailProfile.identifier !== existingEmailProfile.identifier;
        if (!!deviceId && isExistingPushRecordSaved && (emailPreviouslySavedAndDifferent || emailPreviouslySavedAndChanged)) {
            const authHash = await OneSignal.database.getExternalUserIdAuthHash();
            const appConfig = await Database.getAppConfig();
            // Then update the push device record with a reference to the new email ID and email address
            await OneSignalApi.updatePlayer(appConfig.appId, deviceId, {
                parent_player_id: newEmailProfile.subscriptionId,
                email: newEmailProfile.identifier,
                external_user_id_auth_hash: authHash
            });
        }
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
//# sourceMappingURL=SecondaryChannelEmail.js.map