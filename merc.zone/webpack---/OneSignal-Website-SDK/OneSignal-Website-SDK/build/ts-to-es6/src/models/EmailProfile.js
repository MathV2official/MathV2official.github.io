export class EmailProfile {
    constructor(emailId, emailAddress, identifierAuthHash) {
        this.subscriptionId = emailId;
        this.identifier = emailAddress;
        this.identifierAuthHash = identifierAuthHash;
    }
    serialize() {
        return {
            identifierAuthHash: this.identifierAuthHash,
            emailAddress: this.identifier,
            emailId: this.subscriptionId,
        };
    }
    static deserialize(bundle) {
        return new EmailProfile(bundle.emailId, bundle.emailAddress, bundle.identifierAuthHash);
    }
}
//# sourceMappingURL=EmailProfile.js.map