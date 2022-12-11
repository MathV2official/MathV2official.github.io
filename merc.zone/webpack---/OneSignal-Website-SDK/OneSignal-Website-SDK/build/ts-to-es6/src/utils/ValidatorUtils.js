export class ValidatorUtils {
    static isValidUrl(url, options) {
        if (options && options.allowNull && url === null)
            return true;
        else if (options && options.allowEmpty && (url === null || url === undefined))
            return true;
        else {
            try {
                const parsedUrl = new URL(url);
                if (options && options.requireHttps) {
                    return parsedUrl.protocol === 'https:';
                } else
                    return true;
            } catch (e) {
                return false;
            }
        }
    }
    static isValidBoolean(bool, options) {
        if (options && options.allowNull && bool === null)
            return true;
        else
            return bool === true || bool === false;
    }
    static isValidArray(array, options) {
        if (options && options.allowNull && array === null)
            return true;
        else if (options && options.allowEmpty && (array === null || array === undefined))
            return true;
        else
            return array instanceof Array;
    }
}
//# sourceMappingURL=ValidatorUtils.js.map