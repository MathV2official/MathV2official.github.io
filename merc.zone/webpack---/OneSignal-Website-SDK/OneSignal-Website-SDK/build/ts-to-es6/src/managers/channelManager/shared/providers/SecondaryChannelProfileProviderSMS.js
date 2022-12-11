import {
    DeliveryPlatformKind
} from "../../../../models/DeliveryPlatformKind";
import {
    SMSProfile
} from "../../../../models/SMSProfile";
import Database from "../../../../services/Database";
import {
    SecondaryChannelProfileProviderBase
} from "./SecondaryChannelProfileProviderBase";
export class SecondaryChannelProfileProviderSMS extends SecondaryChannelProfileProviderBase {
    constructor() {
        super(...arguments);
        this.deviceType = DeliveryPlatformKind.SMS;
    }
    newProfile(subscriptionId, identifier, identifierAuthHash) {
        return new SMSProfile(subscriptionId, identifier, identifierAuthHash);
    }
    async getProfile() {
        return await Database.getSMSProfile();
    }
    async setProfile(profile) {
        await Database.setSMSProfile(profile);
        await super.setProfile(profile);
    }
}
//# sourceMappingURL=SecondaryChannelProfileProviderSMS.js.map