import {
    InvalidArgumentError,
    InvalidArgumentReason
} from "../../errors/InvalidArgumentError";
import Log from "../../libraries/Log";
export class AuthHashOptionsValidatorHelper {
    // Ensure that if the provided options object exists and has any keys that exist in the provided
    //   array that they are a length of VALID_AUTH_HASH_LENGTH. null and undefined do not throw.
    static throwIfInvalidAuthHashOptions(options, keys) {
        if (!options) {
            return undefined;
        }
        const validKeys = keys.filter(key => options.hasOwnProperty(key));
        if (validKeys.length > 1) {
            Log.error("More than one key provided, please only provide one!", validKeys);
            throw new InvalidArgumentError('options', InvalidArgumentReason.Malformed);
        }
        // Grab first key as we throw above if we have more than one.
        const keyName = validKeys[0];
        const hashToCheck = options[keyName];
        // null / undefined is ok.
        if (!hashToCheck) {
            return undefined;
        }
        AuthHashOptionsValidatorHelper.throwIfInvalidAuthHash(hashToCheck, `options.${keyName}`);
        return hashToCheck;
    }
    // Throw if provide value if not exactly VALID_AUTH_HASH_LENGTH in length, if it isn't falsy.
    static throwIfInvalidAuthHash(value, fieldName) {
        if (!value) {
            return;
        }
        if (value.length !== AuthHashOptionsValidatorHelper.VALID_AUTH_HASH_LENGTH) {
            throw new InvalidArgumentError(fieldName, InvalidArgumentReason.Malformed);
        }
    }
}
AuthHashOptionsValidatorHelper.VALID_AUTH_HASH_LENGTH = 64;
//# sourceMappingURL=AuthHashOptionsValidatorHelper.js.map