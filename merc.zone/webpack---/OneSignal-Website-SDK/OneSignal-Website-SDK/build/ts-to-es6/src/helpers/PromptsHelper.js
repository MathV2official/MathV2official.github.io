import {
    DelayedPromptType,
} from '../../src/models/Prompts';
export default class PromptsHelper {
    static isCategorySlidedownConfigured(prompts) {
        if (!prompts)
            return false;
        const options = PromptsHelper.getFirstSlidedownPromptOptionsWithType(prompts, DelayedPromptType.Category);
        if (!!options) {
            return (!!options.categories && options.categories.length > 0);
        }
        return false;
    }
    /**
     * Is Category Slidedown Configured (version 1 config schema)
     * @param  {SlidedownOptionsVersion1} options
     * @returns boolean
     */
    static isCategorySlidedownConfiguredVersion1(options) {
        var _a, _b;
        return (((_b = (_a = options === null || options === void 0 ? void 0 : options.categories) === null || _a === void 0 ? void 0 : _a.tags) === null || _b === void 0 ? void 0 : _b.length) || 0) > 0;
    }
    static getFirstSlidedownPromptOptionsWithType(prompts, type) {
        return prompts ? prompts.filter(options => options.type === type)[0] : undefined;
    }
    static isSlidedownAutoPromptConfigured(prompts) {
        if (!prompts) {
            return false;
        }
        for (let i = 0; i < prompts.length; i++) {
            if (prompts[i].autoPrompt)
                return true;
        }
        return false;
    }
    static isSlidedownPushDependent(slidedownType) {
        return slidedownType === DelayedPromptType.Push || slidedownType === DelayedPromptType.Category;
    }
}
//# sourceMappingURL=PromptsHelper.js.map