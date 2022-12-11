import {
    InvalidArgumentError,
    InvalidArgumentReason
} from '../errors/InvalidArgumentError';
/**
 * Represents a normalized path.
 *
 * Paths spaces are trimmed.
 * Paths without file names will never contain trailing slashes, except for empty paths.
 */
export default class Path {
    constructor(path) {
        if (!path)
            throw new InvalidArgumentError('path', InvalidArgumentReason.Empty);
        this.path = path.trim();
    }
    getQueryString() {
        // If there are no ? characters, return null
        // If there are multiple ?, return the substring starting after the first ? all the way to the end
        const indexOfDelimiter = this.path.indexOf('?');
        if (indexOfDelimiter === -1) {
            return null;
        }
        if (this.path.length > indexOfDelimiter) {
            // Return the substring *after the first ? to the end
            return this.path.substring(indexOfDelimiter + 1);
        } else {
            // The last character is ?
            return null;
        }
    }
    getWithoutQueryString() {
        return this.path.split(Path.QUERY_STRING)[0];
    }
    getFileName() {
        var _a;
        return (_a = this.getWithoutQueryString().split('\\').pop()) === null || _a === void 0 ? void 0 : _a.split('/').pop();
    }
    getFileNameWithQuery() {
        var _a;
        return (_a = this.path.split('\\').pop()) === null || _a === void 0 ? void 0 : _a.split('/').pop();
    }
    getFullPath() {
        return this.path;
    }
    getPathWithoutFileName() {
        const newPath = this.getWithoutQueryString();
        const fileNameIndex = newPath.lastIndexOf(this.getFileName());
        let pathWithoutFileName = newPath.substring(0, fileNameIndex);
        pathWithoutFileName = pathWithoutFileName.replace(/[\\\/]$/, '');
        return pathWithoutFileName;
    }
}
Path.QUERY_STRING = '?';
//# sourceMappingURL=Path.js.map