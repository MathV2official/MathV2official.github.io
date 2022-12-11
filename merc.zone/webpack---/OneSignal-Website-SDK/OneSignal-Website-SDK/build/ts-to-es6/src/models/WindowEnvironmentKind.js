export var WindowEnvironmentKind;
(function(WindowEnvironmentKind) {
    /**
     * A service worker environment.
     */
    WindowEnvironmentKind["ServiceWorker"] = "ServiceWorker";
    /**
     * The top-level frame to the "main" client's site.
     */
    WindowEnvironmentKind["Host"] = "Host";
    /**
     * Our subscription popup for alt-origin sites.
     */
    WindowEnvironmentKind["OneSignalSubscriptionPopup"] = "Popup";
    /**
     * Our subscription modal for HTTPS sites, which loads in an iFrame.
     */
    WindowEnvironmentKind["OneSignalSubscriptionModal"] = "Modal";
    /**
     * Our subscription helper iFrame.
     */
    WindowEnvironmentKind["OneSignalProxyFrame"] = "ProxyFrame";
    /**
     * A custom iFrame on the site.
     */
    WindowEnvironmentKind["CustomIframe"] = "CustomFrame";
    /**
     * An unknown window context type not matching any of the above.
     */
    WindowEnvironmentKind["Unknown"] = "Unknown";
})(WindowEnvironmentKind || (WindowEnvironmentKind = {}));
//# sourceMappingURL=WindowEnvironmentKind.js.map