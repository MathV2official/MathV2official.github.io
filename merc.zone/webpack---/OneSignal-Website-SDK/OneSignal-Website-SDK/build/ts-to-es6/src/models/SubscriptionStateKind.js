export var SubscriptionStateKind;
(function(SubscriptionStateKind) {
    SubscriptionStateKind[SubscriptionStateKind["Default"] = 0] = "Default";
    SubscriptionStateKind[SubscriptionStateKind["Subscribed"] = 1] = "Subscribed";
    SubscriptionStateKind[SubscriptionStateKind["MutedByApi"] = -2] = "MutedByApi";
    SubscriptionStateKind[SubscriptionStateKind["NotSubscribed"] = -10] = "NotSubscribed";
    SubscriptionStateKind[SubscriptionStateKind["TemporaryWebRecord"] = -20] = "TemporaryWebRecord";
    SubscriptionStateKind[SubscriptionStateKind["PermissionRevoked"] = -21] = "PermissionRevoked";
    SubscriptionStateKind[SubscriptionStateKind["PushSubscriptionRevoked"] = -22] = "PushSubscriptionRevoked";
    SubscriptionStateKind[SubscriptionStateKind["ServiceWorkerStatus403"] = -23] = "ServiceWorkerStatus403";
    SubscriptionStateKind[SubscriptionStateKind["ServiceWorkerStatus404"] = -24] = "ServiceWorkerStatus404";
})(SubscriptionStateKind || (SubscriptionStateKind = {}));
//# sourceMappingURL=SubscriptionStateKind.js.map