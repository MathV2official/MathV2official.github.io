import {
    DelayedPromptType
} from "../../src/models/Prompts";
import PromptsHelper from "./PromptsHelper";
export class ConverterHelper {
    /**
     * Standardizes config to version 2 of the config schema
     * @param  {AppUserConfig} userConfig
     */
    static upgradeConfigToVersionTwo(userConfig) {
        var _a, _b, _c;
        if (ConverterHelper.isPromptOptionsVersion0(userConfig.promptOptions)) {
            userConfig.promptOptions = ConverterHelper.convertConfigToVersionOne(userConfig.promptOptions);
        }
        if (ConverterHelper.isSlidedownConfigVersion1((_a = userConfig.promptOptions) === null || _a === void 0 ? void 0 : _a.slidedown)) {
            if ((_b = userConfig.promptOptions) === null || _b === void 0 ? void 0 : _b.slidedown) {
                userConfig.promptOptions.slidedown =
                    ConverterHelper.convertConfigToVersionTwo((_c = userConfig.promptOptions) === null || _c === void 0 ? void 0 : _c.slidedown);
            }
        }
    }
    /**
     * convertConfigToVersionOne - converts v0 schema to v1 schema format
     *
     * v0 schema example
     * ---
     *  promptOptions: {
     *      acceptButtonText: '',
     *      cancelButtonText: '',
     *      actionMessage   : '',
     *      slidedown: {...}
     *  }
     *
     * v1 schema example
     * ---
     * "promptOptions": {
     *    "slidedown": {
     *      "enabled": true,
     *      "autoPrompt": true,
     *      "acceptButtonText": "",
     *      "cancelButtonText": "",
     *      "actionMessage": "",
     *      "...",
     *    }
     * }
     * @param  {any} promptOptions
     * @returns AppUserConfigPromptOptions
     */
    static convertConfigToVersionOne(promptOptions) {
        if (!promptOptions.slidedown) {
            promptOptions.slidedown = {};
        }
        const {
            acceptButtonText,
            cancelButtonText,
            actionMessage
        } = promptOptions.slidedown;
        // we may have supported both of these keys in the past (with and without "Text" postfix)
        // so we're leaving here and checking in case it is being used this way
        const higherLevelAcceptButtonText = promptOptions.acceptButtonText || promptOptions.acceptButton;
        const higherLevelCancelButtonText = promptOptions.cancelButtonText || promptOptions.cancelButton;
        /**
         * we should give preference to the lower level ("slidedown" level) text settings in the case that
         * text settings are configured at the higher level as well as the lower level
         *
         * Example:
         * "promptOptions": {
         *      "acceptButtonText": "",
         *      "cancelButtonText": "",
         *      "slidedown": {
         *          "acceptButtonText": "", <--
         *          "cancelButtonText": ""  <--
         *      }
         * }
         */
        promptOptions.slidedown.acceptButtonText = acceptButtonText || higherLevelAcceptButtonText;
        promptOptions.slidedown.cancelButtonText = cancelButtonText || higherLevelCancelButtonText;
        promptOptions.slidedown.actionMessage = actionMessage || promptOptions.actionMessage;
        return promptOptions;
    }
    static convertConfigToVersionTwo(slidedownConfig) {
        var _a, _b, _c, _d;
        // determine if the slidedown is category type or regular push
        const promptType = PromptsHelper.isCategorySlidedownConfiguredVersion1(slidedownConfig) ?
            DelayedPromptType.Category : DelayedPromptType.Push;
        let positiveUpdateButton, negativeUpdateButton;
        if (promptType === DelayedPromptType.Category) {
            positiveUpdateButton = (_a = slidedownConfig.categories) === null || _a === void 0 ? void 0 : _a.positiveUpdateButton;
            negativeUpdateButton = (_b = slidedownConfig.categories) === null || _b === void 0 ? void 0 : _b.negativeUpdateButton;
        }
        const existingPromptsConfig = slidedownConfig.prompts || [];
        return {
            prompts: [
                ...existingPromptsConfig,
                {
                    type: promptType,
                    autoPrompt: slidedownConfig.autoPrompt,
                    text: {
                        actionMessage: slidedownConfig.actionMessage,
                        acceptButton: slidedownConfig.acceptButton || slidedownConfig.acceptButtonText,
                        cancelButton: slidedownConfig.cancelButton || slidedownConfig.cancelButtonText,
                        // categories-specific...
                        positiveUpdateButton,
                        negativeUpdateButton,
                        updateMessage: (_c = slidedownConfig === null || slidedownConfig === void 0 ? void 0 : slidedownConfig.categories) === null || _c === void 0 ? void 0 : _c.updateMessage
                    },
                    delay: {
                        pageViews: slidedownConfig.pageViews,
                        timeDelay: slidedownConfig.timeDelay
                    },
                    categories: (_d = slidedownConfig === null || slidedownConfig === void 0 ? void 0 : slidedownConfig.categories) === null || _d === void 0 ? void 0 : _d.tags
                }
            ]
        };
    }
    /**
     * For use with Custom Code & Wordpress Implementations
     * The OneSignal Wordpress Plugin still uses these legacy keys to set the slidedown text
     * @param  {any} slidedownConfig
     * @returns boolean
     */
    static isPromptOptionsVersion0(slidedownConfig) {
        if (!!slidedownConfig) {
            const version0Keys = [
                'acceptButtonText',
                'cancelButtonText',
                'actionMessage'
            ];
            for (let i = 0; i < version0Keys.length; i++) {
                if (slidedownConfig.hasOwnProperty(version0Keys[i]))
                    return true;
            }
        }
        return false;
    }
    /**
     * For use with Custom Code Implementations
     * Checks whether `slidedownConfig` implements `SlidedownOptionsVersion1` interface
     * ------------------------------
     * v1 schema:
     * ----------
     * "slidedown": {
     *    "enabled": true,
     *    "autoPrompt": true,
     *    "...",
     *    "categories": {...}
     * }
     *
     * v2 schema:
     * ----------
     * "slidedown": {
     *    "prompts": [{...}, {...}, {...}]
     * }
     *
     * Since config can also be set via custom-code and we have no strict checks,
     * this function helps to check whether the config implements any v1 style config options
     * by looking for any of the v1 payload first-level keys. See `SlidedownOptionsVersion1`
     * for the full list of keys.
     * @param slidedownConfig
     */
    static isSlidedownConfigVersion1(slidedownConfig) {
        if (!!slidedownConfig) {
            const version1Keys = [
                'enabled',
                'autoPrompt',
                'pageViews',
                'timeDelay',
                'acceptButton',
                'acceptButtonText',
                'cancelButton',
                'cancelButtonText',
                'actionMessage',
                'customizeTextEnabled',
                'categories'
            ];
            for (let i = 0; i < version1Keys.length; i++) {
                if (slidedownConfig.hasOwnProperty(version1Keys[i]))
                    return true;
            }
        }
        return false;
    }
}
//# sourceMappingURL=ConverterHelper.js.map