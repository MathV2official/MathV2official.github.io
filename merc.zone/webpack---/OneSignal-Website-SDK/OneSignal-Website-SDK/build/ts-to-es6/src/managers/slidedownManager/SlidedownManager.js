import TaggingContainer from "../../slidedown/TaggingContainer";
import TagUtils from "../../utils/TagUtils";
import {
    DelayedPromptType
} from "../../models/Prompts";
import Slidedown, {
    manageNotifyButtonStateWhileSlidedownShows
} from "../../slidedown/Slidedown";
import Log from "../../libraries/Log";
import {
    CONFIG_DEFAULTS_SLIDEDOWN_OPTIONS
} from "../../config";
import {
    NotSubscribedError,
    NotSubscribedReason
} from "../../errors/NotSubscribedError";
import PermissionMessageDismissedError from "../../errors/PermissionMessageDismissedError";
import PushPermissionNotGrantedError, {
    PushPermissionNotGrantedErrorReason
} from "../../errors/PushPermissionNotGrantedError";
import {
    NotificationPermission
} from "../../models/NotificationPermission";
import {
    OneSignalUtils
} from "../../utils/OneSignalUtils";
import ChannelCaptureContainer from "../../slidedown/ChannelCaptureContainer";
import {
    ChannelCaptureError,
    InvalidChannelInputField
} from "../../errors/ChannelCaptureError";
import InitHelper from "../../helpers/InitHelper";
import LocalStorage from "../../utils/LocalStorage";
import {
    DismissHelper
} from "../../helpers/DismissHelper";
import PromptsHelper from "../../helpers/PromptsHelper";
import ConfirmationToast from "../../slidedown/ConfirmationToast";
import {
    awaitableTimeout
} from "../../utils/AwaitableTimeout";
import {
    DismissPrompt
} from "../../models/Dismiss";
import Database from "../../services/Database";
import AlreadySubscribedError from "../../errors/AlreadySubscribedError";
import ExistingChannelError from "../../errors/ExistingChannelError";
export class SlidedownManager {
    constructor(context, secondaryChannelManager) {
        this.secondaryChannelManager = secondaryChannelManager;
        this.context = context;
        this.slidedownQueue = [];
        this.isSlidedownShowing = false;
    }
    /* P R I V A T E */
    async checkIfSlidedownShouldBeShown(options) {
        var _a;
        const permissionDenied = await OneSignal.privateGetNotificationPermission() === NotificationPermission.Denied;
        const isSubscribed = await OneSignal.privateIsPushNotificationsEnabled();
        const notOptedOut = await OneSignal.privateGetSubscription();
        let wasDismissed;
        const slidedownType = (_a = options.slidedownPromptOptions) === null || _a === void 0 ? void 0 : _a.type;
        let isSlidedownPushDependent = false;
        if (!!slidedownType) {
            isSlidedownPushDependent = PromptsHelper.isSlidedownPushDependent(slidedownType);
        }
        // applies to both push and category slidedown types
        if (isSlidedownPushDependent) {
            if (isSubscribed) {
                // applies to category slidedown type only
                if (options.isInUpdateMode) {
                    return true;
                }
                Log.info(new AlreadySubscribedError());
                return false;
            }
            wasDismissed = DismissHelper.wasPromptOfTypeDismissed(DismissPrompt.Push);
            if (!notOptedOut) {
                throw new NotSubscribedError(NotSubscribedReason.OptedOut);
            }
            if (permissionDenied) {
                Log.info(new PushPermissionNotGrantedError(PushPermissionNotGrantedErrorReason.Blocked));
                return false;
            }
        } else {
            if (!options.force) {
                const smsSubscribed = !!(await Database.getSMSProfile()).subscriptionId;
                const emailSubscribed = !!(await Database.getEmailProfile()).subscriptionId;
                const bothSubscribed = smsSubscribed && emailSubscribed;
                if (smsSubscribed && (slidedownType === DelayedPromptType.Sms)) {
                    Log.info(new ExistingChannelError(DelayedPromptType.Sms));
                    return false;
                }
                if (emailSubscribed && (slidedownType === DelayedPromptType.Email)) {
                    Log.info(new ExistingChannelError(DelayedPromptType.Email));
                    return false;
                }
                if (bothSubscribed && (slidedownType === DelayedPromptType.SmsAndEmail)) {
                    Log.info(new ExistingChannelError(DelayedPromptType.SmsAndEmail));
                    return false;
                }
            }
            wasDismissed = DismissHelper.wasPromptOfTypeDismissed(DismissPrompt.NonPush);
        }
        if (wasDismissed && !options.force && !options.isInUpdateMode) {
            Log.info(new PermissionMessageDismissedError(slidedownType));
            return false;
        }
        return true;
    }
    registerForPush() {
        const autoAccept = !OneSignal.environmentInfo.requiresUserInteraction;
        const options = {
            autoAccept,
            slidedown: true
        };
        InitHelper.registerForPushNotifications(options);
    }
    async handleAllowForCategoryType() {
        const tags = TaggingContainer.getValuesFromTaggingContainer();
        this.context.tagManager.storeTagValuesToUpdate(tags);
        const isPushEnabled = LocalStorage.getIsPushNotificationsEnabled();
        if (isPushEnabled) {
            // already subscribed, send tags immediately
            OneSignal.slidedown.setSaveState();
            await this.context.tagManager.sendTags(true);
        } else {
            this.registerForPush();
            // tags are sent on the subscription change event handler
        }
    }
    async handleAllowForEmailType() {
        const emailInputFieldIsValid = OneSignal.slidedown.channelCaptureContainer.emailInputFieldIsValid;
        const isEmailEmpty = OneSignal.slidedown.channelCaptureContainer.isEmailInputFieldEmpty();
        if (!emailInputFieldIsValid || isEmailEmpty) {
            throw new ChannelCaptureError(InvalidChannelInputField.InvalidEmail);
        }
        const email = OneSignal.slidedown.channelCaptureContainer.getValueFromEmailInput();
        this.updateEmail(email);
    }
    async handleAllowForSmsType() {
        const smsInputFieldIsValid = OneSignal.slidedown.channelCaptureContainer.smsInputFieldIsValid;
        const isSmsEmpty = OneSignal.slidedown.channelCaptureContainer.isSmsInputFieldEmpty();
        if (!smsInputFieldIsValid || isSmsEmpty) {
            throw new ChannelCaptureError(InvalidChannelInputField.InvalidSms);
        }
        const sms = OneSignal.slidedown.channelCaptureContainer.getValueFromSmsInput();
        this.updateSMS(sms);
    }
    async handleAllowForSmsAndEmailType() {
        const smsInputFieldIsValid = OneSignal.slidedown.channelCaptureContainer.smsInputFieldIsValid;
        const emailInputFieldIsValid = OneSignal.slidedown.channelCaptureContainer.emailInputFieldIsValid;
        /**
         * empty input fields are considered valid since in the case of two input field types present,
         * we can accept one of the two being left as an empty string.
         *
         * thus, we need separate checks for the emptiness properties
         */
        const isEmailEmpty = OneSignal.slidedown.channelCaptureContainer.isEmailInputFieldEmpty();
        const isSmsEmpty = OneSignal.slidedown.channelCaptureContainer.isSmsInputFieldEmpty();
        const bothFieldsEmpty = isEmailEmpty && isSmsEmpty;
        const bothFieldsInvalid = !smsInputFieldIsValid && !emailInputFieldIsValid;
        if (bothFieldsInvalid || bothFieldsEmpty) {
            throw new ChannelCaptureError(InvalidChannelInputField.InvalidEmailAndSms);
        }
        const email = OneSignal.slidedown.channelCaptureContainer.getValueFromEmailInput();
        const sms = OneSignal.slidedown.channelCaptureContainer.getValueFromSmsInput();
        /**
         * empty is ok (we can accept only one of two input fields), but invalid is not
         * at least one field is valid and non-empty
         */
        if (emailInputFieldIsValid) {
            if (!isEmailEmpty) {
                this.updateEmail(email);
            }
        } else {
            throw new ChannelCaptureError(InvalidChannelInputField.InvalidEmail);
        }
        if (smsInputFieldIsValid) {
            if (!isSmsEmpty) {
                this.updateSMS(sms);
            }
        } else {
            throw new ChannelCaptureError(InvalidChannelInputField.InvalidSms);
        }
    }
    updateEmail(email) {
        this.secondaryChannelManager.email.setIdentifier(email);
    }
    updateSMS(sms) {
        this.secondaryChannelManager.sms.setIdentifier(sms);
    }
    async showConfirmationToast() {
        const {
            confirmMessage
        } = OneSignal.slidedown.options.text;
        await awaitableTimeout(1000);
        const confirmationToast = new ConfirmationToast(confirmMessage);
        await confirmationToast.show();
        await awaitableTimeout(5000);
        confirmationToast.close();
        ConfirmationToast.triggerSlidedownEvent(ConfirmationToast.EVENTS.CLOSED);
    }
    async mountAuxiliaryContainers(options) {
        var _a;
        switch ((_a = options.slidedownPromptOptions) === null || _a === void 0 ? void 0 : _a.type) {
            case DelayedPromptType.Category:
                this.mountTaggingContainer(options);
                break;
            case DelayedPromptType.Email:
            case DelayedPromptType.Sms:
            case DelayedPromptType.SmsAndEmail:
                await this.mountChannelCaptureContainer(options);
                break;
            default:
                break;
        }
    }
    async mountTaggingContainer(options) {
        var _a;
        OneSignalUtils.logMethodCall("mountTaggingContainer");
        try {
            // show slidedown with tagging container
            let tagsForComponent = {};
            const taggingContainer = new TaggingContainer();
            const categories = (_a = options.slidedownPromptOptions) === null || _a === void 0 ? void 0 : _a.categories;
            if (!categories) {
                throw new Error("Categories not defined");
            }
            if (options.isInUpdateMode) {
                taggingContainer.load();
                // updating. pull remote tags.
                const existingTags = await OneSignal.getTags();
                this.context.tagManager.storeRemotePlayerTags(existingTags);
                tagsForComponent = TagUtils.convertTagsApiToBooleans(existingTags);
            } else {
                // first subscription
                TagUtils.markAllTagsAsSpecified(categories, true);
            }
            taggingContainer.mount(categories, tagsForComponent);
        } catch (e) {
            Log.error("OneSignal: Attempted to create tagging container with error", e);
        }
    }
    async mountChannelCaptureContainer(options) {
        OneSignalUtils.logMethodCall("mountChannelCaptureContainer");
        try {
            if (!!options.slidedownPromptOptions) {
                const channelCaptureContainer = new ChannelCaptureContainer(options.slidedownPromptOptions);
                channelCaptureContainer.mount();
                OneSignal.slidedown.channelCaptureContainer = channelCaptureContainer;
            }
        } catch (e) {
            Log.error("OneSignal: Attempted to create channel capture container with error", e);
        }
    }
    /* P U B L I C */
    async handleAllowClick() {
        const {
            slidedown
        } = OneSignal;
        const slidedownType = slidedown.options.type;
        if (slidedown.isShowingFailureState) {
            slidedown.removeFailureState();
        }
        try {
            switch (slidedownType) {
                case DelayedPromptType.Push:
                    this.registerForPush();
                    break;
                case DelayedPromptType.Category:
                    await this.handleAllowForCategoryType();
                    break;
                case DelayedPromptType.Email:
                    await this.handleAllowForEmailType();
                    break;
                case DelayedPromptType.Sms:
                    await this.handleAllowForSmsType();
                    break;
                case DelayedPromptType.SmsAndEmail:
                    await this.handleAllowForSmsAndEmailType();
                    break;
                default:
                    break;
            }
        } catch (e) {
            Log.warn("OneSignal Slidedown failed to update:", e);
            // Display update error
            slidedown.removeSaveState();
            slidedown.setFailureState();
            if (e.reason !== undefined) {
                slidedown.setFailureStateForInvalidChannelInput(e.reason);
            }
            return;
        }
        if (slidedown) {
            slidedown.close();
            if (!PromptsHelper.isSlidedownPushDependent(slidedownType)) {
                await this.showConfirmationToast();
            }
            // timeout to allow slidedown close animation to finish in case another slidedown is queued
            await awaitableTimeout(1000);
            Slidedown.triggerSlidedownEvent(Slidedown.EVENTS.CLOSED);
        }
        switch (slidedownType) {
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
    }
    setIsSlidedownShowing(isShowing) {
        this.isSlidedownShowing = isShowing;
    }
    async showQueued() {
        if (this.slidedownQueue.length > 0) {
            const options = this.dequeue();
            if (!!options) {
                await this.createSlidedown(options);
            }
        }
    }
    enqueue(options) {
        this.slidedownQueue.push(options);
        Slidedown.triggerSlidedownEvent(Slidedown.EVENTS.QUEUED);
    }
    dequeue() {
        return this.slidedownQueue.shift();
    }
    async createSlidedown(options) {
        OneSignalUtils.logMethodCall("createSlidedown");
        try {
            const showPrompt = await this.checkIfSlidedownShouldBeShown(options);
            if (!showPrompt) {
                return;
            }
        } catch (e) {
            Log.warn("checkIfSlidedownShouldBeShown returned an error", e);
            return;
        }
        manageNotifyButtonStateWhileSlidedownShows();
        if (this.isSlidedownShowing) {
            // already showing, enqueue
            this.enqueue(options);
            return;
        }
        try {
            this.setIsSlidedownShowing(true);
            const slidedownPromptOptions = options.slidedownPromptOptions || CONFIG_DEFAULTS_SLIDEDOWN_OPTIONS;
            OneSignal.slidedown = new Slidedown(slidedownPromptOptions);
            await OneSignal.slidedown.create(options.isInUpdateMode);
            await this.mountAuxiliaryContainers(options);
            Log.debug('Showing OneSignal Slidedown');
            Slidedown.triggerSlidedownEvent(Slidedown.EVENTS.SHOWN);
        } catch (e) {
            Log.error("There was an error showing the OneSignal Slidedown:", e);
            this.setIsSlidedownShowing(false);
            OneSignal.slidedown.close();
        }
    }
}
//# sourceMappingURL=SlidedownManager.js.map