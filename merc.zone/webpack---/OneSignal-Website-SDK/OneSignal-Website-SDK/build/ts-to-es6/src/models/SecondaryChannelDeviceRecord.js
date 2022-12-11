import NotImplementedError from '../errors/NotImplementedError';
import {
    DeviceRecord
} from './DeviceRecord';
/**
 * Describes a secondary channel device record, such as an email.
 */
export class SecondaryChannelDeviceRecord extends DeviceRecord {
    /**
     * @param identifier Omitting this parameter does not void the record's identifier.
     */
    constructor(deliveryPlatform, identifier, identifierAuthHash, pushDeviceRecordId) {
        super();
        this.deliveryPlatform = deliveryPlatform;
        this.identifier = identifier;
        this.identifierAuthHash = identifierAuthHash;
        this.pushDeviceRecordId = pushDeviceRecordId;
    }
    serialize() {
        const serializedBundle = super.serialize();
        if (this.identifier) {
            serializedBundle.identifier = this.identifier;
        }
        if (this.identifierAuthHash) {
            serializedBundle.identifier_auth_hash = this.identifierAuthHash;
        }
        if (this.pushDeviceRecordId) {
            serializedBundle.device_player_id = this.pushDeviceRecordId;
        }
        return serializedBundle;
    }
    deserialize(_) {
        throw new NotImplementedError();
    }
}
//# sourceMappingURL=SecondaryChannelDeviceRecord.js.map