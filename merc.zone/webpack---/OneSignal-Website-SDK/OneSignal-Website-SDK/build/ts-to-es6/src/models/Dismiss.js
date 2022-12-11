export var DismissPrompt;
(function(DismissPrompt) {
    DismissPrompt["Push"] = "push";
    DismissPrompt["NonPush"] = "nonPush";
})(DismissPrompt || (DismissPrompt = {}));
export var DismissCountKey;
(function(DismissCountKey) {
    DismissCountKey["PromptDismissCount"] = "promptDismissCount";
    DismissCountKey["NonPushPromptsDismissCount"] = "nonPushPromptsDismissCount"; // applies to all new slidedown types (e.g: smsAndEmail)
})(DismissCountKey || (DismissCountKey = {}));
export var DismissTimeKey;
(function(DismissTimeKey) {
    // legacy. applies to 'push' and 'category' slidedown types + native prompt
    DismissTimeKey["OneSignalNotificationPrompt"] = "onesignal-notification-prompt";
    // applies to all new slidedown types (e.g: smsAndEmail)
    DismissTimeKey["OneSignalNonPushPrompt"] = "onesignal-non-push-prompt";
})(DismissTimeKey || (DismissTimeKey = {}));
//# sourceMappingURL=Dismiss.js.map