import Log from "../libraries/Log";
import OneSignalUtils from "../utils/OneSignalUtils";
import MainHelper from '../helpers/MainHelper';
import Slidedown from '../slidedown/Slidedown';
import {
    DelayedPromptType
} from '../models/Prompts';
import {
    DismissHelper
} from '../helpers/DismissHelper';
import InitHelper from '../helpers/InitHelper';
import {
    CONFIG_DEFAULTS_SLIDEDOWN_OPTIONS,
    SERVER_CONFIG_DEFAULTS_PROMPT_DELAYS
} from '../config/index';
import {
    EnvironmentInfoHelper
} from '../context/browser/helpers/EnvironmentInfoHelper';
import {
    awaitableTimeout
} from '../utils/AwaitableTimeout';
import PromptsHelper from '../helpers/PromptsHelper';
import bowser from "bowser";
import {
    DismissPrompt
} from "../models/Dismiss";
import OneSignalEvent from "../Event";
export class PromptsManager {
    constructor(context) {
        this.isNativePromptShowing = false;
        this.context = context;
        this.eventHooksInstalled = false;
    }
    shouldForceSlidedownOverNative() {
        const {
            environmentInfo
        } = OneSignal;
        const {
            browserType,
            browserVersion,
            requiresUserInteraction
        } = environmentInfo;
        return ((browserType === "chrome" && Number(browserVersion) >= 63 && (bowser.tablet || bowser.mobile)) ||
            requiresUserInteraction);
    }
    async spawnAutoPrompts() {
        var _a, _b;
        // user config prompt options
        const userPromptOptions = OneSignal.config.userConfig.promptOptions;
        /*
         * Chrome 63 on Android permission prompts are permanent without a dismiss option. To avoid
         * permanent blocks, we want to replace sites automatically showing the native browser request
         * with a slide prompt first.
         * Same for Safari 12.1+ & Firefox 72+. It requires user interaction to request notification permissions.
         * It simply wouldn't work to try to show native prompt from script.
         */
        const forceSlidedownOverNative = this.shouldForceSlidedownOverNative();
        // show native prompt
        const nativePromptOptions = this.getDelayedPromptOptions(userPromptOptions, DelayedPromptType.Native);
        const isPageViewConditionMetForNative = this.isPageViewConditionMet(nativePromptOptions);
        const conditionMetWithNativeOptions = nativePromptOptions.enabled && isPageViewConditionMetForNative;
        const forceSlidedownWithNativeOptions = forceSlidedownOverNative && conditionMetWithNativeOptions;
        if (conditionMetWithNativeOptions && !forceSlidedownWithNativeOptions) {
            this.internalShowDelayedPrompt(DelayedPromptType.Native, nativePromptOptions.timeDelay || 0);
            return;
        }
        // if slidedown not configured, condition met with native options, & should force slidedown over native:
        const isPushSlidedownConfigured = !!PromptsHelper.getFirstSlidedownPromptOptionsWithType((_a = userPromptOptions.slidedown) === null || _a === void 0 ? void 0 : _a.prompts, DelayedPromptType.Push);
        if (forceSlidedownWithNativeOptions && !isPushSlidedownConfigured) {
            this.internalShowDelayedPrompt(DelayedPromptType.Push, nativePromptOptions.timeDelay || 0);
        }
        // spawn slidedown prompts
        const prompts = (_b = userPromptOptions.slidedown) === null || _b === void 0 ? void 0 : _b.prompts;
        if (!!prompts && (prompts === null || prompts === void 0 ? void 0 : prompts.length) > 0) {
            for (let i = 0; i < prompts.length; i++) {
                const promptOptions = prompts[i];
                const slidedownPromptOptions = this.getDelayedPromptOptions(userPromptOptions, promptOptions.type);
                const isPageViewConditionMetForSlidedown = this.isPageViewConditionMet(slidedownPromptOptions);
                const conditionMetWithSlidedownOptions = slidedownPromptOptions.enabled && isPageViewConditionMetForSlidedown;
                const options = {
                    slidedownPromptOptions: promptOptions,
                };
                if (conditionMetWithSlidedownOptions) {
                    this.internalShowDelayedPrompt(promptOptions.type, slidedownPromptOptions.timeDelay || 0, options);
                }
            }
        }
    }
    async internalShowDelayedPrompt(type, timeDelaySeconds, options) {
        OneSignalUtils.logMethodCall("internalShowDelayedPrompt");
        if (typeof timeDelaySeconds !== "number") {
            Log.error("internalShowDelayedPrompt: timeDelay not a number");
            return;
        }
        const {
            requiresUserInteraction
        } = EnvironmentInfoHelper.getEnvironmentInfo();
        if (requiresUserInteraction && type === DelayedPromptType.Native) {
            type = DelayedPromptType.Push; // Push Slidedown for cases where user interaction is needed
        }
        if (timeDelaySeconds > 0) {
            await awaitableTimeout(timeDelaySeconds * 1000);
        }
        switch (type) {
            case DelayedPromptType.Native:
                await this.internalShowNativePrompt();
                break;
            case DelayedPromptType.Push:
                await this.internalShowSlidedownPrompt(options);
                break;
            case DelayedPromptType.Category:
                await this.internalShowCategorySlidedown(options);
                break;
            case DelayedPromptType.Sms:
                await this.internalShowSmsSlidedown(options);
                break;
            case DelayedPromptType.Email:
                await this.internalShowEmailSlidedown(options);
                break;
            case DelayedPromptType.SmsAndEmail:
                await this.internalShowSmsAndEmailSlidedown(options);
                break;
            default:
                Log.error("Invalid Delayed Prompt type");
        }
    }
    async internalShowNativePrompt() {
        OneSignalUtils.logMethodCall("internalShowNativePrompt");
        if (this.isNativePromptShowing) {
            Log.debug("Already showing autoprompt. Abort showing a native prompt.");
            return;
        }
        this.isNativePromptShowing = true;
        MainHelper.markHttpSlidedownShown();
        await InitHelper.registerForPushNotifications();
        this.isNativePromptShowing = false;
        DismissHelper.markPromptDismissedWithType(DismissPrompt.Push);
    }
    async internalShowSlidedownPrompt(options = {
        force: false
    }) {
        OneSignalUtils.logMethodCall("internalShowSlidedownPrompt");
        if (!options.slidedownPromptOptions) {
            options.slidedownPromptOptions = CONFIG_DEFAULTS_SLIDEDOWN_OPTIONS;
        }
        MainHelper.markHttpSlidedownShown();
        const sdkStylesLoadResult = await this.context.dynamicResourceLoader.loadSdkStylesheet();
        if (sdkStylesLoadResult !== 0 /* Loaded */ ) {
            Log.debug('Not showing slidedown permission message because styles failed to load.');
            return;
        }
        if (!this.eventHooksInstalled) {
            this.installEventHooksForSlidedown();
        }
        await this.context.slidedownManager.createSlidedown(options);
    }
    async internalShowCategorySlidedown(options) {
        OneSignalUtils.logMethodCall("internalShowCategorySlidedown");
        await this.internalShowParticularSlidedown(DelayedPromptType.Category, options);
    }
    async internalShowSmsSlidedown(options) {
        OneSignalUtils.logMethodCall("internalShowSmsSlidedown");
        await this.internalShowParticularSlidedown(DelayedPromptType.Sms, options);
    }
    async internalShowEmailSlidedown(options) {
        OneSignalUtils.logMethodCall("internalShowEmailSlidedown");
        await this.internalShowParticularSlidedown(DelayedPromptType.Email, options);
    }
    async internalShowSmsAndEmailSlidedown(options) {
        OneSignalUtils.logMethodCall("internalShowSmsAndEmailSlidedown");
        await this.internalShowParticularSlidedown(DelayedPromptType.SmsAndEmail, options);
    }
    /**
     * Generalized shower function to show particular slidedown types
     * @param  {DelayedPromptType} typeToPullFromConfig - slidedown type to look for in config if not passed via `options`
     * @param  {AutoPromptOptions} options - passed in via another internal function or top level OneSignal slidedown func
     *
     * If present, `options.slidedownPromptOptions` overrides `typeToPullFromConfig`
     */
    async internalShowParticularSlidedown(typeToPullFromConfig, options) {
        var _a, _b;
        const prompts = (_b = (_a = this.context.appConfig.userConfig.promptOptions) === null || _a === void 0 ? void 0 : _a.slidedown) === null || _b === void 0 ? void 0 : _b.prompts;
        const slidedownPromptOptions = (options === null || options === void 0 ? void 0 : options.slidedownPromptOptions) ||
            PromptsHelper.getFirstSlidedownPromptOptionsWithType(prompts, typeToPullFromConfig);
        if (!slidedownPromptOptions) {
            if (typeToPullFromConfig !== DelayedPromptType.Push) {
                Log.error(`OneSignal: slidedown of type '${typeToPullFromConfig}' couldn't be shown. Check your configuration` +
                    ` on the OneSignal dashboard or your custom code initialization.`);
                return;
            } else {
                Log.warn(`The OneSignal 'push' slidedown will be shown with default text settings.` +
                    ` To customize, see the OneSignal documentation.`);
            }
        }
        await this.internalShowSlidedownPrompt(Object.assign(Object.assign({}, options), {
            slidedownPromptOptions
        }));
    }
    installEventHooksForSlidedown() {
        this.eventHooksInstalled = true;
        OneSignal.emitter.on(Slidedown.EVENTS.SHOWN, () => {
            this.context.slidedownManager.setIsSlidedownShowing(true);
        });
        OneSignal.emitter.on(Slidedown.EVENTS.CLOSED, () => {
            this.context.slidedownManager.setIsSlidedownShowing(false);
            this.context.slidedownManager.showQueued();
        });
        OneSignal.emitter.on(Slidedown.EVENTS.ALLOW_CLICK, async () => {
            await this.context.slidedownManager.handleAllowClick();
            OneSignalEvent.trigger(OneSignal.EVENTS.TEST_FINISHED_ALLOW_CLICK_HANDLING);
        });
        OneSignal.emitter.on(Slidedown.EVENTS.CANCEL_CLICK, () => {
            const {
                type
            } = OneSignal.slidedown.options;
            switch (type) {
                case DelayedPromptType.Push:
                case DelayedPromptType.Category:
                    Log.debug("Setting flag to not show the slidedown to the user again.");
                    DismissHelper.markPromptDismissedWithType(DismissPrompt.Push);
                    break;
                default:
                    Log.debug("Setting flag to not show the slidedown to the user again.");
                    DismissHelper.markPromptDismissedWithType(DismissPrompt.NonPush);
                    break;
            }
        });
    }
    isPageViewConditionMet(options) {
        if (!options || typeof options.pageViews === "undefined") {
            return false;
        }
        if (!options.autoPrompt || !options.enabled) {
            return false;
        }
        const localPageViews = this.context.pageViewManager.getLocalPageViewCount();
        return localPageViews >= options.pageViews;
    }
    getDelayedPromptOptions(promptOptions, type) {
        var _a, _b, _c, _d;
        const defaultOptions = {
            enabled: false,
            autoPrompt: false,
            timeDelay: SERVER_CONFIG_DEFAULTS_PROMPT_DELAYS.timeDelay,
            pageViews: SERVER_CONFIG_DEFAULTS_PROMPT_DELAYS.pageViews
        };
        if (!promptOptions || !promptOptions.native || !promptOptions.slidedown) {
            // default
            return defaultOptions;
        }
        switch (type) {
            case DelayedPromptType.Native:
                const nativePromptOptions = promptOptions.native;
                return {
                    enabled: nativePromptOptions === null || nativePromptOptions === void 0 ? void 0 : nativePromptOptions.enabled,
                    autoPrompt: nativePromptOptions === null || nativePromptOptions === void 0 ? void 0 : nativePromptOptions.autoPrompt,
                    timeDelay: nativePromptOptions === null || nativePromptOptions === void 0 ? void 0 : nativePromptOptions.timeDelay,
                    pageViews: nativePromptOptions === null || nativePromptOptions === void 0 ? void 0 : nativePromptOptions.pageViews
                };
            case DelayedPromptType.Push:
            case DelayedPromptType.Category:
            case DelayedPromptType.Email:
            case DelayedPromptType.Sms:
            case DelayedPromptType.SmsAndEmail:
                const {
                    userConfig
                } = this.context.appConfig;
                const options = PromptsHelper
                    .getFirstSlidedownPromptOptionsWithType(((_b = (_a = userConfig.promptOptions) === null || _a === void 0 ? void 0 : _a.slidedown) === null || _b === void 0 ? void 0 : _b.prompts) || [], type);
                return {
                    enabled: !!options,
                    autoPrompt: !!(options === null || options === void 0 ? void 0 : options.autoPrompt),
                    timeDelay: (_c = options === null || options === void 0 ? void 0 : options.delay) === null || _c === void 0 ? void 0 : _c.timeDelay,
                    pageViews: (_d = options === null || options === void 0 ? void 0 : options.delay) === null || _d === void 0 ? void 0 : _d.pageViews
                };
            default:
                return defaultOptions;
        }
    }
}
//# sourceMappingURL=PromptsManager.js.map