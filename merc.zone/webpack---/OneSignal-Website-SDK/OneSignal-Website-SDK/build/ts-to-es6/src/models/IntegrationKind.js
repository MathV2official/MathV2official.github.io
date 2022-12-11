export var IntegrationKind;
(function(IntegrationKind) {
    /**
     * An secure HTTPS site using its own origin for subscribing.
     */
    IntegrationKind["Secure"] = "Secure";
    /**
     * A secure HTTPS site using a proxy subscription origin (e.g. subdomain.os.tc or
     * subdomain.onesignal.com).
     */
    IntegrationKind["SecureProxy"] = "Secure Proxy";
    /**
     * An insecure HTTP site using a proxy subscription origin (e.g. subdomain.os.tc or
     * subdomain.onesignal.com).
     */
    IntegrationKind["InsecureProxy"] = "Insecure Proxy";
})(IntegrationKind || (IntegrationKind = {}));
//# sourceMappingURL=IntegrationKind.js.map