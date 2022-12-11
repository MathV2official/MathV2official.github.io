import Environment from "../Environment";
export class BrowserUtils {
    static decodeHtmlEntities(text) {
        if (Environment.isBrowser()) {
            if (!BrowserUtils.decodeTextArea) {
                BrowserUtils.decodeTextArea = document.createElement("textarea");
            }
        }
        if (BrowserUtils.decodeTextArea) {
            BrowserUtils.decodeTextArea.innerHTML = text;
            return BrowserUtils.decodeTextArea.value;
        } else {
            // Not running in a browser environment, text cannot be decoded
            return text;
        }
    }
}
BrowserUtils.decodeTextArea = null;
export default BrowserUtils;
//# sourceMappingURL=BrowserUtils.js.map