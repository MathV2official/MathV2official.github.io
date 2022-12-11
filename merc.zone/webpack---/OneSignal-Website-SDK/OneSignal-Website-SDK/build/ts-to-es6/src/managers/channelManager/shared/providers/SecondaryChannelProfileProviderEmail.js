import {
    DeliveryPlatformKind
} from "../../../../models/DeliveryPlatformKind";
import {
    EmailProfile
} from "../../../../models/EmailProfile";
import Database from "../../../../services/Database";
import {
    SecondaryChannelProfileProviderBase
} from "./SecondaryChannelProfileProviderBase";
export class SecondaryChannelProfileProviderEmail extends SecondaryChannelProfileProviderBase {
    constructor() {
        super(...arguments);
        this.deviceType = DeliveryPlatformKind.Email;
    }
    newProfile(subscriptionId, identifier, identifierAuthHash) {
        return new EmailProfile(subscriptionId, identifier, identifierAuthHash);
    }
    async getProfile() {
        return await Database.getEmailProfile();
    }
    async setProfile(profile) {
        await Database.setEmailProfile(profile);
        await super.setProfile(profile);
    }
}
//# sourceMappingURL=SecondaryChannelProfileProviderEmail.js.map