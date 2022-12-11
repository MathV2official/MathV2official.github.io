export class SMSProfile {
    constructor(smsId, smsNumber, identifierAuthHash) {
        this.subscriptionId = smsId;
        this.identifier = smsNumber;
        this.identifierAuthHash = identifierAuthHash;
    }
    serialize() {
        return {
            identifierAuthHash: this.identifierAuthHash,
            smsNumber: this.identifier,
            smsId: this.subscriptionId,
        };
    }
    static deserialize(bundle) {
        return new SMSProfile(bundle.smsId, bundle.smsNumber, bundle.identifierAuthHash);
    }
}
//# sourceMappingURL=SMSProfile.js.map