import Log from "../libraries/Log";
import {
    CUSTOM_LINK_CSS_CLASSES,
    CUSTOM_LINK_CSS_SELECTORS
} from "../slidedown/constants";
import {
    addCssClass
} from "../utils";
import LocalStorage from "../utils/LocalStorage";
export class CustomLinkManager {
    constructor(config) {
        this.config = config;
    }
    async initialize() {
        var _a, _b;
        if (!((_a = this.config) === null || _a === void 0 ? void 0 : _a.enabled)) {
            return;
        }
        if (!(await this.loadSdkStyles())) {
            return;
        }
        Log.info("OneSignal: initializing customlink");
        if (!((_b = this.config) === null || _b === void 0 ? void 0 : _b.unsubscribeEnabled) && CustomLinkManager.isPushEnabled()) {
            this.hideCustomLinkContainers();
            return;
        }
        // traditional for-loop required here to avoid layout shift
        for (let i = 0; i < this.customlinkContainerElements.length; i++) {
            await this.injectMarkup(this.customlinkContainerElements[i]);
        }
    }
    async injectMarkup(element) {
        // clear contents
        element.innerHTML = '';
        await this.mountExplanationNode(element);
        await this.mountSubscriptionNode(element);
    }
    async mountExplanationNode(element) {
        var _a;
        if (!((_a = this.config) === null || _a === void 0 ? void 0 : _a.text)) {
            Log.error("CustomLink: required property 'text' is missing in the config");
            return;
        }
        if (this.config.text.explanation) {
            const explanation = document.createElement("p");
            explanation.textContent = this.config.text.explanation;
            addCssClass(explanation, CUSTOM_LINK_CSS_CLASSES.resetClass);
            addCssClass(explanation, CUSTOM_LINK_CSS_CLASSES.explanationClass);
            if (this.config.size) {
                addCssClass(explanation, this.config.size);
            }
            if (CustomLinkManager.isPushEnabled()) {
                addCssClass(explanation, CUSTOM_LINK_CSS_CLASSES.state.subscribed);
            } else {
                addCssClass(explanation, CUSTOM_LINK_CSS_CLASSES.state.unsubscribed);
            }
            element.appendChild(explanation);
        }
    }
    async mountSubscriptionNode(element) {
        var _a;
        if (!((_a = this.config) === null || _a === void 0 ? void 0 : _a.text)) {
            Log.error("CustomLink: required property 'text' is missing in the config");
            return;
        }
        if (this.config.text.subscribe) {
            const subscribeButton = document.createElement("button");
            addCssClass(subscribeButton, CUSTOM_LINK_CSS_CLASSES.resetClass);
            addCssClass(subscribeButton, CUSTOM_LINK_CSS_CLASSES.subscribeClass);
            if (this.config.size) {
                addCssClass(subscribeButton, this.config.size);
            }
            if (this.config.style) {
                addCssClass(subscribeButton, this.config.style);
            }
            if (CustomLinkManager.isPushEnabled()) {
                addCssClass(subscribeButton, CUSTOM_LINK_CSS_CLASSES.state.subscribed);
            } else {
                addCssClass(subscribeButton, CUSTOM_LINK_CSS_CLASSES.state.unsubscribed);
            }
            this.setCustomColors(subscribeButton);
            await this.setTextFromPushStatus(subscribeButton);
            subscribeButton.addEventListener("click", async () => {
                Log.info("CustomLink: subscribe clicked");
                await this.handleClick(subscribeButton);
            });
            element.appendChild(subscribeButton);
        }
    }
    async loadSdkStyles() {
        const sdkStylesLoadResult = await OneSignal.context.dynamicResourceLoader.loadSdkStylesheet();
        if (sdkStylesLoadResult !== 0 /* Loaded */ ) {
            Log.debug('Not initializing custom link button because styles failed to load.');
            return false;
        }
        return true;
    }
    hideElement(element) {
        addCssClass(element, CUSTOM_LINK_CSS_CLASSES.hide);
    }
    /**
     * Used for hiding elements if "Allow unsubscribe" is on
     * @returns void
     */
    hideCustomLinkContainers() {
        this.customlinkContainerElements.forEach(element => {
            this.hideElement(element);
        });
    }
    async handleClick(element) {
        var _a, _b;
        if (CustomLinkManager.isPushEnabled()) {
            await OneSignal.setSubscription(false);
            await this.setTextFromPushStatus(element);
        } else {
            if (!CustomLinkManager.isOptedOut()) {
                const autoAccept = !OneSignal.environmentInfo.requiresUserInteraction;
                const options = {
                    autoAccept
                };
                await OneSignal.registerForPushNotifications(options);
                // once subscribed, prevent unsubscribe by hiding customlinks
                if (!((_a = this.config) === null || _a === void 0 ? void 0 : _a.unsubscribeEnabled) && CustomLinkManager.isPushEnabled()) {
                    this.hideCustomLinkContainers();
                }
                return;
            }
            await OneSignal.setSubscription(true);
            // once subscribed, prevent unsubscribe by hiding customlinks
            if (!((_b = this.config) === null || _b === void 0 ? void 0 : _b.unsubscribeEnabled) && CustomLinkManager.isPushEnabled()) {
                this.hideCustomLinkContainers();
            }
        }
    }
    async setTextFromPushStatus(element) {
        var _a, _b, _c, _d;
        if ((_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.subscribe) {
            if (!CustomLinkManager.isPushEnabled()) {
                element.textContent = this.config.text.subscribe;
            }
        }
        if ((_d = (_c = this.config) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.unsubscribe) {
            if (CustomLinkManager.isPushEnabled()) {
                element.textContent = this.config.text.unsubscribe;
            }
        }
    }
    setCustomColors(element) {
        var _a, _b, _c, _d, _e, _f, _g;
        if (!((_a = this.config) === null || _a === void 0 ? void 0 : _a.color) || !this.config.color.text) {
            return;
        }
        if (((_b = this.config) === null || _b === void 0 ? void 0 : _b.style) === "button" && ((_c = this.config) === null || _c === void 0 ? void 0 : _c.color.button)) {
            element.style.backgroundColor = (_d = this.config) === null || _d === void 0 ? void 0 : _d.color.button;
            element.style.color = (_e = this.config) === null || _e === void 0 ? void 0 : _e.color.text;
        } else if (((_f = this.config) === null || _f === void 0 ? void 0 : _f.style) === "link") {
            element.style.color = (_g = this.config) === null || _g === void 0 ? void 0 : _g.color.text;
        }
    }
    get customlinkContainerElements() {
        const containers = document.querySelectorAll(CUSTOM_LINK_CSS_SELECTORS.containerSelector);
        return Array.prototype.slice.call(containers);
    }
    static isPushEnabled() {
        return LocalStorage.getIsPushNotificationsEnabled();
    }
    static isOptedOut() {
        return LocalStorage.getIsOptedOut();
    }
}
//# sourceMappingURL=CustomLinkManager.js.map