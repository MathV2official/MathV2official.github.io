"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
            [40440], {
                68577: function(e, t, n) {
                        n.d(t, {
                            M: function() {
                                return Te
                            },
                            N: function() {
                                return Re
                            },
                            Q: function() {
                                return be
                            },
                            _: function() {
                                return Fe
                            },
                            a1: function() {
                                return ze
                            },
                            a4: function() {
                                return He
                            },
                            a5: function() {
                                return We
                            },
                            a6: function() {
                                return qe
                            },
                            ag: function() {
                                return Ke
                            },
                            ah: function() {
                                return $e
                            },
                            al: function() {
                                return et
                            },
                            c: function() {
                                return xt
                            },
                            n: function() {
                                return In
                            },
                            q: function() {
                                return tt
                            },
                            v: function() {
                                return nt
                            },
                            y: function() {
                                return rt
                            }
                        });
                        var r = n(74444),
                            i = n(25816),
                            s = n(35914),
                            o = n(53333),
                            a = n(8463);

                        function c() {
                            return {
                                "dependent-sdk-initialized-before-auth": "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."
                            }
                        }
                        const u = c,
                            l = new r.LL("auth", "Firebase", {
                                "dependent-sdk-initialized-before-auth": "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."
                            }),
                            d = new o.Yd("@firebase/auth");

                        function h(e, ...t) {
                            d.logLevel <= o.in.ERROR && d.error(`Auth (${i.Jn}): ${e}`, ...t)
                        }

                        function p(e, ...t) {
                            throw g(e, ...t)
                        }

                        function f(e, ...t) {
                            return g(e, ...t)
                        }

                        function m(e, t, n) {
                            const i = Object.assign(Object.assign({}, u()), {
                                [t]: n
                            });
                            return new r.LL("auth", "Firebase", i).create(t, {
                                appName: e.name
                            })
                        }

                        function v(e, t, n) {
                            if (!(t instanceof n)) throw n.name !== t.constructor.name && p(e, "argument-error"), m(e, "argument-error", `Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)
                        }

                        function g(e, ...t) {
                            if ("string" !== typeof e) {
                                const n = t[0],
                                    r = [...t.slice(1)];
                                return r[0] && (r[0].appName = e.name), e._errorFactory.create(n, ...r)
                            }
                            return l.create(e, ...t)
                        }

                        function _(e, t, ...n) {
                            if (!e) throw g(t, ...n)
                        }

                        function I(e) {
                            const t = "INTERNAL ASSERTION FAILED: " + e;
                            throw h(t), new Error(t)
                        }

                        function y(e, t) {
                            e || I(t)
                        }
                        const w = new Map;

                        function T(e) {
                            y(e instanceof Function, "Expected a class definition");
                            let t = w.get(e);
                            return t ? (y(t instanceof e, "Instance stored in cache mismatched with class"), t) : (t = new e, w.set(e, t), t)
                        }

                        function k() {
                            var e;
                            return "undefined" !== typeof self && (null === (e = self.location) || void 0 === e ? void 0 : e.href) || ""
                        }

                        function E() {
                            return "http:" === R() || "https:" === R()
                        }

                        function R() {
                            var e;
                            return "undefined" !== typeof self && (null === (e = self.location) || void 0 === e ? void 0 : e.protocol) || null
                        }
                        class b {
                            constructor(e, t) {
                                this.shortDelay = e, this.longDelay = t, y(t > e, "Short delay should be less than long delay!"), this.isMobile = (0, r.uI)() || (0, r.b$)()
                            }
                            get() {
                                return "undefined" !== typeof navigator && navigator && "onLine" in navigator && "boolean" === typeof navigator.onLine && (E() || (0, r.ru)() || "connection" in navigator) && !navigator.onLine ? Math.min(5e3, this.shortDelay) : this.isMobile ? this.longDelay : this.shortDelay
                            }
                        }

                        function S(e, t) {
                            y(e.emulator, "Emulator should always be set here");
                            const {
                                url: n
                            } = e.emulator;
                            return t ? `${n}${t.startsWith("/")?t.slice(1):t}` : n
                        }
                        class N {
                            static initialize(e, t, n) {
                                this.fetchImpl = e, t && (this.headersImpl = t), n && (this.responseImpl = n)
                            }
                            static fetch() {
                                return this.fetchImpl ? this.fetchImpl : "undefined" !== typeof self && "fetch" in self ? self.fetch : void I("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")
                            }
                            static headers() {
                                return this.headersImpl ? this.headersImpl : "undefined" !== typeof self && "Headers" in self ? self.Headers : void I("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")
                            }
                            static response() {
                                return this.responseImpl ? this.responseImpl : "undefined" !== typeof self && "Response" in self ? self.Response : void I("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")
                            }
                        }
                        const O = {
                                CREDENTIAL_MISMATCH: "custom-token-mismatch",
                                MISSING_CUSTOM_TOKEN: "internal-error",
                                INVALID_IDENTIFIER: "invalid-email",
                                MISSING_CONTINUE_URI: "internal-error",
                                INVALID_PASSWORD: "wrong-password",
                                MISSING_PASSWORD: "internal-error",
                                EMAIL_EXISTS: "email-already-in-use",
                                PASSWORD_LOGIN_DISABLED: "operation-not-allowed",
                                INVALID_IDP_RESPONSE: "invalid-credential",
                                INVALID_PENDING_TOKEN: "invalid-credential",
                                FEDERATED_USER_ID_ALREADY_LINKED: "credential-already-in-use",
                                MISSING_REQ_TYPE: "internal-error",
                                EMAIL_NOT_FOUND: "user-not-found",
                                RESET_PASSWORD_EXCEED_LIMIT: "too-many-requests",
                                EXPIRED_OOB_CODE: "expired-action-code",
                                INVALID_OOB_CODE: "invalid-action-code",
                                MISSING_OOB_CODE: "internal-error",
                                CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "requires-recent-login",
                                INVALID_ID_TOKEN: "invalid-user-token",
                                TOKEN_EXPIRED: "user-token-expired",
                                USER_NOT_FOUND: "user-token-expired",
                                TOO_MANY_ATTEMPTS_TRY_LATER: "too-many-requests",
                                INVALID_CODE: "invalid-verification-code",
                                INVALID_SESSION_INFO: "invalid-verification-id",
                                INVALID_TEMPORARY_PROOF: "invalid-credential",
                                MISSING_SESSION_INFO: "missing-verification-id",
                                SESSION_EXPIRED: "code-expired",
                                MISSING_ANDROID_PACKAGE_NAME: "missing-android-pkg-name",
                                UNAUTHORIZED_DOMAIN: "unauthorized-continue-uri",
                                INVALID_OAUTH_CLIENT_ID: "invalid-oauth-client-id",
                                ADMIN_ONLY_OPERATION: "admin-restricted-operation",
                                INVALID_MFA_PENDING_CREDENTIAL: "invalid-multi-factor-session",
                                MFA_ENROLLMENT_NOT_FOUND: "multi-factor-info-not-found",
                                MISSING_MFA_ENROLLMENT_ID: "missing-multi-factor-info",
                                MISSING_MFA_PENDING_CREDENTIAL: "missing-multi-factor-session",
                                SECOND_FACTOR_EXISTS: "second-factor-already-in-use",
                                SECOND_FACTOR_LIMIT_EXCEEDED: "maximum-second-factor-count-exceeded",
                                BLOCKING_FUNCTION_ERROR_RESPONSE: "internal-error"
                            },
                            P = new b(3e4, 6e4);

                        function A(e, t) {
                            return e.tenantId && !t.tenantId ? Object.assign(Object.assign({}, t), {
                                tenantId: e.tenantId
                            }) : t
                        }
                        async function C(e, t, n, i, s = {}) {
                            return L(e, s, (async () => {
                                let s = {},
                                    o = {};
                                i && ("GET" === t ? o = i : s = {
                                    body: JSON.stringify(i)
                                });
                                const a = (0, r.xO)(Object.assign({
                                        key: e.config.apiKey
                                    }, o)).slice(1),
                                    c = await e._getAdditionalHeaders();
                                return c["Content-Type"] = "application/json", e.languageCode && (c["X-Firebase-Locale"] = e.languageCode), N.fetch()(D(e, e.config.apiHost, n, a), Object.assign({
                                    method: t,
                                    headers: c,
                                    referrerPolicy: "no-referrer"
                                }, s))
                            }))
                        }
                        async function L(e, t, n) {
                            e._canInitEmulator = !1;
                            const i = Object.assign(Object.assign({}, O), t);
                            try {
                                const t = new U(e),
                                    r = await Promise.race([n(), t.promise]);
                                t.clearNetworkTimeout();
                                const s = await r.json();
                                if ("needConfirmation" in s) throw x(e, "account-exists-with-different-credential", s);
                                if (r.ok && !("errorMessage" in s)) return s; {
                                    const t = r.ok ? s.errorMessage : s.error.message,
                                        [n, o] = t.split(" : ");
                                    if ("FEDERATED_USER_ID_ALREADY_LINKED" === n) throw x(e, "credential-already-in-use", s);
                                    if ("EMAIL_EXISTS" === n) throw x(e, "email-already-in-use", s);
                                    if ("USER_DISABLED" === n) throw x(e, "user-disabled", s);
                                    const a = i[n] || n.toLowerCase().replace(/[_\s]+/g, "-");
                                    if (o) throw m(e, a, o);
                                    p(e, a)
                                }
                            } catch (s) {
                                if (s instanceof r.ZR) throw s;
                                p(e, "network-request-failed")
                            }
                        }
                        async function M(e, t, n, r, i = {}) {
                            const s = await C(e, t, n, r, i);
                            return "mfaPendingCredential" in s && p(e, "multi-factor-auth-required", {
                                _serverResponse: s
                            }), s
                        }

                        function D(e, t, n, r) {
                            const i = `${t}${n}?${r}`;
                            return e.config.emulator ? S(e.config, i) : `${e.config.apiScheme}://${i}`
                        }
                        class U {
                            constructor(e) {
                                this.auth = e, this.timer = null, this.promise = new Promise(((e, t) => {
                                    this.timer = setTimeout((() => t(f(this.auth, "network-request-failed"))), P.get())
                                }))
                            }
                            clearNetworkTimeout() {
                                clearTimeout(this.timer)
                            }
                        }

                        function x(e, t, n) {
                            const r = {
                                appName: e.name
                            };
                            n.email && (r.email = n.email), n.phoneNumber && (r.phoneNumber = n.phoneNumber);
                            const i = f(e, t, r);
                            return i.customData._tokenResponse = n, i
                        }

                        function F(e) {
                            if (e) try {
                                const t = new Date(Number(e));
                                if (!isNaN(t.getTime())) return t.toUTCString()
                            } catch (t) {}
                        }

                        function V(e) {
                            return 1e3 * Number(e)
                        }

                        function j(e) {
                            var t;
                            const [n, i, s] = e.split(".");
                            if (void 0 === n || void 0 === i || void 0 === s) return h("JWT malformed, contained fewer than 3 sections"), null;
                            try {
                                const e = (0, r.tV)(i);
                                return e ? JSON.parse(e) : (h("Failed to decode base64 JWT payload"), null)
                            } catch (o) {
                                return h("Caught error parsing JWT payload as JSON", null === (t = o) || void 0 === t ? void 0 : t.toString()), null
                            }
                        }
                        async function z(e, t, n = !1) {
                            if (n) return t;
                            try {
                                return await t
                            } catch (i) {
                                throw i instanceof r.ZR && function({
                                    code: e
                                }) {
                                    return "auth/user-disabled" === e || "auth/user-token-expired" === e
                                }(i) && e.auth.currentUser === e && await e.auth.signOut(), i
                            }
                        }
                        class H {
                            constructor(e) {
                                this.user = e, this.isRunning = !1, this.timerId = null, this.errorBackoff = 3e4
                            }
                            _start() {
                                this.isRunning || (this.isRunning = !0, this.schedule())
                            }
                            _stop() {
                                this.isRunning && (this.isRunning = !1, null !== this.timerId && clearTimeout(this.timerId))
                            }
                            getInterval(e) {
                                var t;
                                if (e) {
                                    const e = this.errorBackoff;
                                    return this.errorBackoff = Math.min(2 * this.errorBackoff, 96e4), e
                                } {
                                    this.errorBackoff = 3e4;
                                    const e = (null !== (t = this.user.stsTokenManager.expirationTime) && void 0 !== t ? t : 0) - Date.now() - 3e5;
                                    return Math.max(0, e)
                                }
                            }
                            schedule(e = !1) {
                                if (!this.isRunning) return;
                                const t = this.getInterval(e);
                                this.timerId = setTimeout((async () => {
                                    await this.iteration()
                                }), t)
                            }
                            async iteration() {
                                var e;
                                try {
                                    await this.user.getIdToken(!0)
                                } catch (t) {
                                    return void("auth/network-request-failed" === (null === (e = t) || void 0 === e ? void 0 : e.code) && this.schedule(!0))
                                }
                                this.schedule()
                            }
                        }
                        class W {
                            constructor(e, t) {
                                this.createdAt = e, this.lastLoginAt = t, this._initializeTime()
                            }
                            _initializeTime() {
                                this.lastSignInTime = F(this.lastLoginAt), this.creationTime = F(this.createdAt)
                            }
                            _copy(e) {
                                this.createdAt = e.createdAt, this.lastLoginAt = e.lastLoginAt, this._initializeTime()
                            }
                            toJSON() {
                                return {
                                    createdAt: this.createdAt,
                                    lastLoginAt: this.lastLoginAt
                                }
                            }
                        }
                        async function q(e) {
                            var t;
                            const n = e.auth,
                                r = await e.getIdToken(),
                                i = await z(e, async function(e, t) {
                                    return C(e, "POST", "/v1/accounts:lookup", t)
                                }(n, {
                                    idToken: r
                                }));
                            _(null === i || void 0 === i ? void 0 : i.users.length, n, "internal-error");
                            const o = i.users[0];
                            e._notifyReloadListener(o);
                            const a = (null === (t = o.providerUserInfo) || void 0 === t ? void 0 : t.length) ? o.providerUserInfo.map((e => {
                                var {
                                    providerId: t
                                } = e, n = (0, s._T)(e, ["providerId"]);
                                return {
                                    providerId: t,
                                    uid: n.rawId || "",
                                    displayName: n.displayName || null,
                                    email: n.email || null,
                                    phoneNumber: n.phoneNumber || null,
                                    photoURL: n.photoUrl || null
                                }
                            })) : [];
                            const c = (u = e.providerData, l = a, [...u.filter((e => !l.some((t => t.providerId === e.providerId)))), ...l]);
                            var u, l;
                            const d = e.isAnonymous,
                                h = !(e.email && o.passwordHash) && !(null === c || void 0 === c ? void 0 : c.length),
                                p = !!d && h,
                                f = {
                                    uid: o.localId,
                                    displayName: o.displayName || null,
                                    photoURL: o.photoUrl || null,
                                    email: o.email || null,
                                    emailVerified: o.emailVerified || !1,
                                    phoneNumber: o.phoneNumber || null,
                                    tenantId: o.tenantId || null,
                                    providerData: c,
                                    metadata: new W(o.createdAt, o.lastLoginAt),
                                    isAnonymous: p
                                };
                            Object.assign(e, f)
                        }
                        class K {
                            constructor() {
                                this.refreshToken = null, this.accessToken = null, this.expirationTime = null
                            }
                            get isExpired() {
                                return !this.expirationTime || Date.now() > this.expirationTime - 3e4
                            }
                            updateFromServerResponse(e) {
                                _(e.idToken, "internal-error"), _("undefined" !== typeof e.idToken, "internal-error"), _("undefined" !== typeof e.refreshToken, "internal-error");
                                const t = "expiresIn" in e && "undefined" !== typeof e.expiresIn ? Number(e.expiresIn) : function(e) {
                                    const t = j(e);
                                    return _(t, "internal-error"), _("undefined" !== typeof t.exp, "internal-error"), _("undefined" !== typeof t.iat, "internal-error"), Number(t.exp) - Number(t.iat)
                                }(e.idToken);
                                this.updateTokensAndExpiration(e.idToken, e.refreshToken, t)
                            }
                            async getToken(e, t = !1) {
                                return _(!this.accessToken || this.refreshToken, e, "user-token-expired"), t || !this.accessToken || this.isExpired ? this.refreshToken ? (await this.refresh(e, this.refreshToken), this.accessToken) : null : this.accessToken
                            }
                            clearRefreshToken() {
                                this.refreshToken = null
                            }
                            async refresh(e, t) {
                                const {
                                    accessToken: n,
                                    refreshToken: i,
                                    expiresIn: s
                                } = await async function(e, t) {
                                    const n = await L(e, {}, (async () => {
                                        const n = (0, r.xO)({
                                                grant_type: "refresh_token",
                                                refresh_token: t
                                            }).slice(1),
                                            {
                                                tokenApiHost: i,
                                                apiKey: s
                                            } = e.config,
                                            o = D(e, i, "/v1/token", `key=${s}`),
                                            a = await e._getAdditionalHeaders();
                                        return a["Content-Type"] = "application/x-www-form-urlencoded", N.fetch()(o, {
                                            method: "POST",
                                            headers: a,
                                            body: n
                                        })
                                    }));
                                    return {
                                        accessToken: n.access_token,
                                        expiresIn: n.expires_in,
                                        refreshToken: n.refresh_token
                                    }
                                }(e, t);
                                this.updateTokensAndExpiration(n, i, Number(s))
                            }
                            updateTokensAndExpiration(e, t, n) {
                                this.refreshToken = t || null, this.accessToken = e || null, this.expirationTime = Date.now() + 1e3 * n
                            }
                            static fromJSON(e, t) {
                                const {
                                    refreshToken: n,
                                    accessToken: r,
                                    expirationTime: i
                                } = t, s = new K;
                                return n && (_("string" === typeof n, "internal-error", {
                                    appName: e
                                }), s.refreshToken = n), r && (_("string" === typeof r, "internal-error", {
                                    appName: e
                                }), s.accessToken = r), i && (_("number" === typeof i, "internal-error", {
                                    appName: e
                                }), s.expirationTime = i), s
                            }
                            toJSON() {
                                return {
                                    refreshToken: this.refreshToken,
                                    accessToken: this.accessToken,
                                    expirationTime: this.expirationTime
                                }
                            }
                            _assign(e) {
                                this.accessToken = e.accessToken, this.refreshToken = e.refreshToken, this.expirationTime = e.expirationTime
                            }
                            _clone() {
                                return Object.assign(new K, this.toJSON())
                            }
                            _performRefresh() {
                                return I("not implemented")
                            }
                        }

                        function $(e, t) {
                            _("string" === typeof e || "undefined" === typeof e, "internal-error", {
                                appName: t
                            })
                        }
                        class G {
                            constructor(e) {
                                var {
                                    uid: t,
                                    auth: n,
                                    stsTokenManager: r
                                } = e, i = (0, s._T)(e, ["uid", "auth", "stsTokenManager"]);
                                this.providerId = "firebase", this.proactiveRefresh = new H(this), this.reloadUserInfo = null, this.reloadListener = null, this.uid = t, this.auth = n, this.stsTokenManager = r, this.accessToken = r.accessToken, this.displayName = i.displayName || null, this.email = i.email || null, this.emailVerified = i.emailVerified || !1, this.phoneNumber = i.phoneNumber || null, this.photoURL = i.photoURL || null, this.isAnonymous = i.isAnonymous || !1, this.tenantId = i.tenantId || null, this.providerData = i.providerData ? [...i.providerData] : [], this.metadata = new W(i.createdAt || void 0, i.lastLoginAt || void 0)
                            }
                            async getIdToken(e) {
                                const t = await z(this, this.stsTokenManager.getToken(this.auth, e));
                                return _(t, this.auth, "internal-error"), this.accessToken !== t && (this.accessToken = t, await this.auth._persistUserIfCurrent(this), this.auth._notifyListenersIfCurrent(this)), t
                            }
                            getIdTokenResult(e) {
                                return async function(e, t = !1) {
                                    const n = (0, r.m9)(e),
                                        i = await n.getIdToken(t),
                                        s = j(i);
                                    _(s && s.exp && s.auth_time && s.iat, n.auth, "internal-error");
                                    const o = "object" === typeof s.firebase ? s.firebase : void 0,
                                        a = null === o || void 0 === o ? void 0 : o.sign_in_provider;
                                    return {
                                        claims: s,
                                        token: i,
                                        authTime: F(V(s.auth_time)),
                                        issuedAtTime: F(V(s.iat)),
                                        expirationTime: F(V(s.exp)),
                                        signInProvider: a || null,
                                        signInSecondFactor: (null === o || void 0 === o ? void 0 : o.sign_in_second_factor) || null
                                    }
                                }(this, e)
                            }
                            reload() {
                                return async function(e) {
                                    const t = (0, r.m9)(e);
                                    await q(t), await t.auth._persistUserIfCurrent(t), t.auth._notifyListenersIfCurrent(t)
                                }(this)
                            }
                            _assign(e) {
                                this !== e && (_(this.uid === e.uid, this.auth, "internal-error"), this.displayName = e.displayName, this.photoURL = e.photoURL, this.email = e.email, this.emailVerified = e.emailVerified, this.phoneNumber = e.phoneNumber, this.isAnonymous = e.isAnonymous, this.tenantId = e.tenantId, this.providerData = e.providerData.map((e => Object.assign({}, e))), this.metadata._copy(e.metadata), this.stsTokenManager._assign(e.stsTokenManager))
                            }
                            _clone(e) {
                                return new G(Object.assign(Object.assign({}, this), {
                                    auth: e,
                                    stsTokenManager: this.stsTokenManager._clone()
                                }))
                            }
                            _onReload(e) {
                                _(!this.reloadListener, this.auth, "internal-error"), this.reloadListener = e, this.reloadUserInfo && (this._notifyReloadListener(this.reloadUserInfo), this.reloadUserInfo = null)
                            }
                            _notifyReloadListener(e) {
                                this.reloadListener ? this.reloadListener(e) : this.reloadUserInfo = e
                            }
                            _startProactiveRefresh() {
                                this.proactiveRefresh._start()
                            }
                            _stopProactiveRefresh() {
                                this.proactiveRefresh._stop()
                            }
                            async _updateTokensIfNecessary(e, t = !1) {
                                let n = !1;
                                e.idToken && e.idToken !== this.stsTokenManager.accessToken && (this.stsTokenManager.updateFromServerResponse(e), n = !0), t && await q(this), await this.auth._persistUserIfCurrent(this), n && this.auth._notifyListenersIfCurrent(this)
                            }
                            async delete() {
                                const e = await this.getIdToken();
                                return await z(this, async function(e, t) {
                                    return C(e, "POST", "/v1/accounts:delete", t)
                                }(this.auth, {
                                    idToken: e
                                })), this.stsTokenManager.clearRefreshToken(), this.auth.signOut()
                            }
                            toJSON() {
                                return Object.assign(Object.assign({
                                    uid: this.uid,
                                    email: this.email || void 0,
                                    emailVerified: this.emailVerified,
                                    displayName: this.displayName || void 0,
                                    isAnonymous: this.isAnonymous,
                                    photoURL: this.photoURL || void 0,
                                    phoneNumber: this.phoneNumber || void 0,
                                    tenantId: this.tenantId || void 0,
                                    providerData: this.providerData.map((e => Object.assign({}, e))),
                                    stsTokenManager: this.stsTokenManager.toJSON(),
                                    _redirectEventId: this._redirectEventId
                                }, this.metadata.toJSON()), {
                                    apiKey: this.auth.config.apiKey,
                                    appName: this.auth.name
                                })
                            }
                            get refreshToken() {
                                return this.stsTokenManager.refreshToken || ""
                            }
                            static _fromJSON(e, t) {
                                var n, r, i, s, o, a, c, u;
                                const l = null !== (n = t.displayName) && void 0 !== n ? n : void 0,
                                    d = null !== (r = t.email) && void 0 !== r ? r : void 0,
                                    h = null !== (i = t.phoneNumber) && void 0 !== i ? i : void 0,
                                    p = null !== (s = t.photoURL) && void 0 !== s ? s : void 0,
                                    f = null !== (o = t.tenantId) && void 0 !== o ? o : void 0,
                                    m = null !== (a = t._redirectEventId) && void 0 !== a ? a : void 0,
                                    v = null !== (c = t.createdAt) && void 0 !== c ? c : void 0,
                                    g = null !== (u = t.lastLoginAt) && void 0 !== u ? u : void 0,
                                    {
                                        uid: I,
                                        emailVerified: y,
                                        isAnonymous: w,
                                        providerData: T,
                                        stsTokenManager: k
                                    } = t;
                                _(I && k, e, "internal-error");
                                const E = K.fromJSON(this.name, k);
                                _("string" === typeof I, e, "internal-error"), $(l, e.name), $(d, e.name), _("boolean" === typeof y, e, "internal-error"), _("boolean" === typeof w, e, "internal-error"), $(h, e.name), $(p, e.name), $(f, e.name), $(m, e.name), $(v, e.name), $(g, e.name);
                                const R = new G({
                                    uid: I,
                                    auth: e,
                                    email: d,
                                    emailVerified: y,
                                    displayName: l,
                                    isAnonymous: w,
                                    photoURL: p,
                                    phoneNumber: h,
                                    tenantId: f,
                                    stsTokenManager: E,
                                    createdAt: v,
                                    lastLoginAt: g
                                });
                                return T && Array.isArray(T) && (R.providerData = T.map((e => Object.assign({}, e)))), m && (R._redirectEventId = m), R
                            }
                            static async _fromIdTokenResponse(e, t, n = !1) {
                                const r = new K;
                                r.updateFromServerResponse(t);
                                const i = new G({
                                    uid: t.localId,
                                    auth: e,
                                    stsTokenManager: r,
                                    isAnonymous: n
                                });
                                return await q(i), i
                            }
                        }
                        class J {
                            constructor() {
                                this.type = "NONE", this.storage = {}
                            }
                            async _isAvailable() {
                                return !0
                            }
                            async _set(e, t) {
                                this.storage[e] = t
                            }
                            async _get(e) {
                                const t = this.storage[e];
                                return void 0 === t ? null : t
                            }
                            async _remove(e) {
                                delete this.storage[e]
                            }
                            _addListener(e, t) {}
                            _removeListener(e, t) {}
                        }
                        J.type = "NONE";
                        const B = J;

                        function X(e, t, n) {
                            return `firebase:${e}:${t}:${n}`
                        }
                        class Y {
                            constructor(e, t, n) {
                                this.persistence = e, this.auth = t, this.userKey = n;
                                const {
                                    config: r,
                                    name: i
                                } = this.auth;
                                this.fullUserKey = X(this.userKey, r.apiKey, i), this.fullPersistenceKey = X("persistence", r.apiKey, i), this.boundEventHandler = t._onStorageEvent.bind(t), this.persistence._addListener(this.fullUserKey, this.boundEventHandler)
                            }
                            setCurrentUser(e) {
                                return this.persistence._set(this.fullUserKey, e.toJSON())
                            }
                            async getCurrentUser() {
                                const e = await this.persistence._get(this.fullUserKey);
                                return e ? G._fromJSON(this.auth, e) : null
                            }
                            removeCurrentUser() {
                                return this.persistence._remove(this.fullUserKey)
                            }
                            savePersistenceForRedirect() {
                                return this.persistence._set(this.fullPersistenceKey, this.persistence.type)
                            }
                            async setPersistence(e) {
                                if (this.persistence === e) return;
                                const t = await this.getCurrentUser();
                                return await this.removeCurrentUser(), this.persistence = e, t ? this.setCurrentUser(t) : void 0
                            }
                            delete() {
                                this.persistence._removeListener(this.fullUserKey, this.boundEventHandler)
                            }
                            static async create(e, t, n = "authUser") {
                                if (!t.length) return new Y(T(B), e, n);
                                const r = (await Promise.all(t.map((async e => {
                                    if (await e._isAvailable()) return e
                                })))).filter((e => e));
                                let i = r[0] || T(B);
                                const s = X(n, e.config.apiKey, e.name);
                                let o = null;
                                for (const u of t) try {
                                    const t = await u._get(s);
                                    if (t) {
                                        const n = G._fromJSON(e, t);
                                        u !== i && (o = n), i = u;
                                        break
                                    }
                                } catch (c) {}
                                const a = r.filter((e => e._shouldAllowMigration));
                                return i._shouldAllowMigration && a.length ? (i = a[0], o && await i._set(s, o.toJSON()), await Promise.all(t.map((async e => {
                                    if (e !== i) try {
                                        await e._remove(s)
                                    } catch (c) {}
                                }))), new Y(i, e, n)) : new Y(i, e, n)
                            }
                        }

                        function Q(e) {
                            const t = e.toLowerCase();
                            if (t.includes("opera/") || t.includes("opr/") || t.includes("opios/")) return "Opera";
                            if (ne(t)) return "IEMobile";
                            if (t.includes("msie") || t.includes("trident/")) return "IE";
                            if (t.includes("edge/")) return "Edge";
                            if (Z(t)) return "Firefox";
                            if (t.includes("silk/")) return "Silk";
                            if (ie(t)) return "Blackberry";
                            if (se(t)) return "Webos";
                            if (ee(t)) return "Safari";
                            if ((t.includes("chrome/") || te(t)) && !t.includes("edge/")) return "Chrome";
                            if (re(t)) return "Android"; {
                                const t = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,
                                    n = e.match(t);
                                if (2 === (null === n || void 0 === n ? void 0 : n.length)) return n[1]
                            }
                            return "Other"
                        }

                        function Z(e = (0, r.z$)()) {
                            return /firefox\//i.test(e)
                        }

                        function ee(e = (0, r.z$)()) {
                            const t = e.toLowerCase();
                            return t.includes("safari/") && !t.includes("chrome/") && !t.includes("crios/") && !t.includes("android")
                        }

                        function te(e = (0, r.z$)()) {
                            return /crios\//i.test(e)
                        }

                        function ne(e = (0, r.z$)()) {
                            return /iemobile/i.test(e)
                        }

                        function re(e = (0, r.z$)()) {
                            return /android/i.test(e)
                        }

                        function ie(e = (0, r.z$)()) {
                            return /blackberry/i.test(e)
                        }

                        function se(e = (0, r.z$)()) {
                            return /webos/i.test(e)
                        }

                        function oe(e = (0, r.z$)()) {
                            return /iphone|ipad|ipod/i.test(e) || /macintosh/i.test(e) && /mobile/i.test(e)
                        }

                        function ae(e = (0, r.z$)()) {
                            return oe(e) || re(e) || se(e) || ie(e) || /windows phone/i.test(e) || ne(e)
                        }

                        function ce(e, t = []) {
                            let n;
                            switch (e) {
                                case "Browser":
                                    n = Q((0, r.z$)());
                                    break;
                                case "Worker":
                                    n = `${Q((0,r.z$)())}-${e}`;
                                    break;
                                default:
                                    n = e
                            }
                            const s = t.length ? t.join(",") : "FirebaseCore-web";
                            return `${n}/JsCore/${i.Jn}/${s}`
                        }
                        class ue {
                            constructor(e) {
                                this.auth = e, this.queue = []
                            }
                            pushCallback(e, t) {
                                const n = t => new Promise(((n, r) => {
                                    try {
                                        n(e(t))
                                    } catch (i) {
                                        r(i)
                                    }
                                }));
                                n.onAbort = t, this.queue.push(n);
                                const r = this.queue.length - 1;
                                return () => {
                                    this.queue[r] = () => Promise.resolve()
                                }
                            }
                            async runMiddleware(e) {
                                var t;
                                if (this.auth.currentUser === e) return;
                                const n = [];
                                try {
                                    for (const t of this.queue) await t(e), t.onAbort && n.push(t.onAbort)
                                } catch (r) {
                                    n.reverse();
                                    for (const e of n) try {
                                        e()
                                    } catch (i) {}
                                    throw this.auth._errorFactory.create("login-blocked", {
                                        originalMessage: null === (t = r) || void 0 === t ? void 0 : t.message
                                    })
                                }
                            }
                        }
                        class le {
                            constructor(e, t, n) {
                                this.app = e, this.heartbeatServiceProvider = t, this.config = n, this.currentUser = null, this.emulatorConfig = null, this.operations = Promise.resolve(), this.authStateSubscription = new he(this), this.idTokenSubscription = new he(this), this.beforeStateQueue = new ue(this), this.redirectUser = null, this.isProactiveRefreshEnabled = !1, this._canInitEmulator = !0, this._isInitialized = !1, this._deleted = !1, this._initializationPromise = null, this._popupRedirectResolver = null, this._errorFactory = l, this.lastNotifiedUid = void 0, this.languageCode = null, this.tenantId = null, this.settings = {
                                    appVerificationDisabledForTesting: !1
                                }, this.frameworks = [], this.name = e.name, this.clientVersion = n.sdkClientVersion
                            }
                            _initializeWithPersistence(e, t) {
                                return t && (this._popupRedirectResolver = T(t)), this._initializationPromise = this.queue((async () => {
                                    var n, r;
                                    if (!this._deleted && (this.persistenceManager = await Y.create(this, e), !this._deleted)) {
                                        if (null === (n = this._popupRedirectResolver) || void 0 === n ? void 0 : n._shouldInitProactively) try {
                                            await this._popupRedirectResolver._initialize(this)
                                        } catch (i) {}
                                        await this.initializeCurrentUser(t), this.lastNotifiedUid = (null === (r = this.currentUser) || void 0 === r ? void 0 : r.uid) || null, this._deleted || (this._isInitialized = !0)
                                    }
                                })), this._initializationPromise
                            }
                            async _onStorageEvent() {
                                if (this._deleted) return;
                                const e = await this.assertedPersistence.getCurrentUser();
                                return this.currentUser || e ? this.currentUser && e && this.currentUser.uid === e.uid ? (this._currentUser._assign(e), void(await this.currentUser.getIdToken())) : void(await this._updateCurrentUser(e, !0)) : void 0
                            }
                            async initializeCurrentUser(e) {
                                var t;
                                const n = await this.assertedPersistence.getCurrentUser();
                                let r = n,
                                    i = !1;
                                if (e && this.config.authDomain) {
                                    await this.getOrInitRedirectPersistenceManager();
                                    const n = null === (t = this.redirectUser) || void 0 === t ? void 0 : t._redirectEventId,
                                        s = null === r || void 0 === r ? void 0 : r._redirectEventId,
                                        o = await this.tryRedirectSignIn(e);
                                    n && n !== s || !(null === o || void 0 === o ? void 0 : o.user) || (r = o.user, i = !0)
                                }
                                if (!r) return this.directlySetCurrentUser(null);
                                if (!r._redirectEventId) {
                                    if (i) try {
                                        await this.beforeStateQueue.runMiddleware(r)
                                    } catch (s) {
                                        r = n, this._popupRedirectResolver._overrideRedirectResult(this, (() => Promise.reject(s)))
                                    }
                                    return r ? this.reloadAndSetCurrentUserOrClear(r) : this.directlySetCurrentUser(null)
                                }
                                return _(this._popupRedirectResolver, this, "argument-error"), await this.getOrInitRedirectPersistenceManager(), this.redirectUser && this.redirectUser._redirectEventId === r._redirectEventId ? this.directlySetCurrentUser(r) : this.reloadAndSetCurrentUserOrClear(r)
                            }
                            async tryRedirectSignIn(e) {
                                let t = null;
                                try {
                                    t = await this._popupRedirectResolver._completeRedirectFn(this, e, !0)
                                } catch (n) {
                                    await this._setRedirectUser(null)
                                }
                                return t
                            }
                            async reloadAndSetCurrentUserOrClear(e) {
                                var t;
                                try {
                                    await q(e)
                                } catch (n) {
                                    if ("auth/network-request-failed" !== (null === (t = n) || void 0 === t ? void 0 : t.code)) return this.directlySetCurrentUser(null)
                                }
                                return this.directlySetCurrentUser(e)
                            }
                            useDeviceLanguage() {
                                this.languageCode = function() {
                                    if ("undefined" === typeof navigator) return null;
                                    const e = navigator;
                                    return e.languages && e.languages[0] || e.language || null
                                }()
                            }
                            async _delete() {
                                this._deleted = !0
                            }
                            async updateCurrentUser(e) {
                                const t = e ? (0, r.m9)(e) : null;
                                return t && _(t.auth.config.apiKey === this.config.apiKey, this, "invalid-user-token"), this._updateCurrentUser(t && t._clone(this))
                            }
                            async _updateCurrentUser(e, t = !1) {
                                if (!this._deleted) return e && _(this.tenantId === e.tenantId, this, "tenant-id-mismatch"), t || await this.beforeStateQueue.runMiddleware(e), this.queue((async () => {
                                    await this.directlySetCurrentUser(e), this.notifyAuthListeners()
                                }))
                            }
                            async signOut() {
                                return await this.beforeStateQueue.runMiddleware(null), (this.redirectPersistenceManager || this._popupRedirectResolver) && await this._setRedirectUser(null), this._updateCurrentUser(null, !0)
                            }
                            setPersistence(e) {
                                return this.queue((async () => {
                                    await this.assertedPersistence.setPersistence(T(e))
                                }))
                            }
                            _getPersistence() {
                                return this.assertedPersistence.persistence.type
                            }
                            _updateErrorMap(e) {
                                this._errorFactory = new r.LL("auth", "Firebase", e())
                            }
                            onAuthStateChanged(e, t, n) {
                                return this.registerStateListener(this.authStateSubscription, e, t, n)
                            }
                            beforeAuthStateChanged(e, t) {
                                return this.beforeStateQueue.pushCallback(e, t)
                            }
                            onIdTokenChanged(e, t, n) {
                                return this.registerStateListener(this.idTokenSubscription, e, t, n)
                            }
                            toJSON() {
                                var e;
                                return {
                                    apiKey: this.config.apiKey,
                                    authDomain: this.config.authDomain,
                                    appName: this.name,
                                    currentUser: null === (e = this._currentUser) || void 0 === e ? void 0 : e.toJSON()
                                }
                            }
                            async _setRedirectUser(e, t) {
                                const n = await this.getOrInitRedirectPersistenceManager(t);
                                return null === e ? n.removeCurrentUser() : n.setCurrentUser(e)
                            }
                            async getOrInitRedirectPersistenceManager(e) {
                                if (!this.redirectPersistenceManager) {
                                    const t = e && T(e) || this._popupRedirectResolver;
                                    _(t, this, "argument-error"), this.redirectPersistenceManager = await Y.create(this, [T(t._redirectPersistence)], "redirectUser"), this.redirectUser = await this.redirectPersistenceManager.getCurrentUser()
                                }
                                return this.redirectPersistenceManager
                            }
                            async _redirectUserForId(e) {
                                var t, n;
                                return this._isInitialized && await this.queue((async () => {})), (null === (t = this._currentUser) || void 0 === t ? void 0 : t._redirectEventId) === e ? this._currentUser : (null === (n = this.redirectUser) || void 0 === n ? void 0 : n._redirectEventId) === e ? this.redirectUser : null
                            }
                            async _persistUserIfCurrent(e) {
                                if (e === this.currentUser) return this.queue((async () => this.directlySetCurrentUser(e)))
                            }
                            _notifyListenersIfCurrent(e) {
                                e === this.currentUser && this.notifyAuthListeners()
                            }
                            _key() {
                                return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`
                            }
                            _startProactiveRefresh() {
                                this.isProactiveRefreshEnabled = !0, this.currentUser && this._currentUser._startProactiveRefresh()
                            }
                            _stopProactiveRefresh() {
                                this.isProactiveRefreshEnabled = !1, this.currentUser && this._currentUser._stopProactiveRefresh()
                            }
                            get _currentUser() {
                                return this.currentUser
                            }
                            notifyAuthListeners() {
                                var e, t;
                                if (!this._isInitialized) return;
                                this.idTokenSubscription.next(this.currentUser);
                                const n = null !== (t = null === (e = this.currentUser) || void 0 === e ? void 0 : e.uid) && void 0 !== t ? t : null;
                                this.lastNotifiedUid !== n && (this.lastNotifiedUid = n, this.authStateSubscription.next(this.currentUser))
                            }
                            registerStateListener(e, t, n, r) {
                                if (this._deleted) return () => {};
                                const i = "function" === typeof t ? t : t.next.bind(t),
                                    s = this._isInitialized ? Promise.resolve() : this._initializationPromise;
                                return _(s, this, "internal-error"), s.then((() => i(this.currentUser))), "function" === typeof t ? e.addObserver(t, n, r) : e.addObserver(t)
                            }
                            async directlySetCurrentUser(e) {
                                this.currentUser && this.currentUser !== e && (this._currentUser._stopProactiveRefresh(), e && this.isProactiveRefreshEnabled && e._startProactiveRefresh()), this.currentUser = e, e ? await this.assertedPersistence.setCurrentUser(e) : await this.assertedPersistence.removeCurrentUser()
                            }
                            queue(e) {
                                return this.operations = this.operations.then(e, e), this.operations
                            }
                            get assertedPersistence() {
                                return _(this.persistenceManager, this, "internal-error"), this.persistenceManager
                            }
                            _logFramework(e) {
                                e && !this.frameworks.includes(e) && (this.frameworks.push(e), this.frameworks.sort(), this.clientVersion = ce(this.config.clientPlatform, this._getFrameworks()))
                            }
                            _getFrameworks() {
                                return this.frameworks
                            }
                            async _getAdditionalHeaders() {
                                var e;
                                const t = {
                                    "X-Client-Version": this.clientVersion
                                };
                                this.app.options.appId && (t["X-Firebase-gmpid"] = this.app.options.appId);
                                const n = await (null === (e = this.heartbeatServiceProvider.getImmediate({
                                    optional: !0
                                })) || void 0 === e ? void 0 : e.getHeartbeatsHeader());
                                return n && (t["X-Firebase-Client"] = n), t
                            }
                        }

                        function de(e) {
                            return (0, r.m9)(e)
                        }
                        class he {
                            constructor(e) {
                                this.auth = e, this.observer = null, this.addObserver = (0, r.ne)((e => this.observer = e))
                            }
                            get next() {
                                return _(this.observer, this.auth, "internal-error"), this.observer.next.bind(this.observer)
                            }
                        }
                        class pe {
                            constructor(e, t) {
                                this.providerId = e, this.signInMethod = t
                            }
                            toJSON() {
                                return I("not implemented")
                            }
                            _getIdTokenResponse(e) {
                                return I("not implemented")
                            }
                            _linkToIdToken(e, t) {
                                return I("not implemented")
                            }
                            _getReauthenticationResolver(e) {
                                return I("not implemented")
                            }
                        }
                        async function fe(e, t) {
                            return C(e, "POST", "/v1/accounts:resetPassword", A(e, t))
                        }
                        async function me(e, t) {
                            return C(e, "POST", "/v1/accounts:update", t)
                        }
                        class ve extends pe {
                            constructor(e, t, n, r = null) {
                                super("password", n), this._email = e, this._password = t, this._tenantId = r
                            }
                            static _fromEmailAndPassword(e, t) {
                                return new ve(e, t, "password")
                            }
                            static _fromEmailAndCode(e, t, n = null) {
                                return new ve(e, t, "emailLink", n)
                            }
                            toJSON() {
                                return {
                                    email: this._email,
                                    password: this._password,
                                    signInMethod: this.signInMethod,
                                    tenantId: this._tenantId
                                }
                            }
                            static fromJSON(e) {
                                const t = "string" === typeof e ? JSON.parse(e) : e;
                                if ((null === t || void 0 === t ? void 0 : t.email) && (null === t || void 0 === t ? void 0 : t.password)) {
                                    if ("password" === t.signInMethod) return this._fromEmailAndPassword(t.email, t.password);
                                    if ("emailLink" === t.signInMethod) return this._fromEmailAndCode(t.email, t.password, t.tenantId)
                                }
                                return null
                            }
                            async _getIdTokenResponse(e) {
                                switch (this.signInMethod) {
                                    case "password":
                                        return async function(e, t) {
                                            return M(e, "POST", "/v1/accounts:signInWithPassword", A(e, t))
                                        }(e, {
                                            returnSecureToken: !0,
                                            email: this._email,
                                            password: this._password
                                        });
                                    case "emailLink":
                                        return async function(e, t) {
                                            return M(e, "POST", "/v1/accounts:signInWithEmailLink", A(e, t))
                                        }(e, {
                                            email: this._email,
                                            oobCode: this._password
                                        });
                                    default:
                                        p(e, "internal-error")
                                }
                            }
                            async _linkToIdToken(e, t) {
                                switch (this.signInMethod) {
                                    case "password":
                                        return me(e, {
                                            idToken: t,
                                            returnSecureToken: !0,
                                            email: this._email,
                                            password: this._password
                                        });
                                    case "emailLink":
                                        return async function(e, t) {
                                            return M(e, "POST", "/v1/accounts:signInWithEmailLink", A(e, t))
                                        }(e, {
                                            idToken: t,
                                            email: this._email,
                                            oobCode: this._password
                                        });
                                    default:
                                        p(e, "internal-error")
                                }
                            }
                            _getReauthenticationResolver(e) {
                                return this._getIdTokenResponse(e)
                            }
                        }
                        async function ge(e, t) {
                            return M(e, "POST", "/v1/accounts:signInWithIdp", A(e, t))
                        }
                        class _e extends pe {
                            constructor() {
                                super(...arguments), this.pendingToken = null
                            }
                            static _fromParams(e) {
                                const t = new _e(e.providerId, e.signInMethod);
                                return e.idToken || e.accessToken ? (e.idToken && (t.idToken = e.idToken), e.accessToken && (t.accessToken = e.accessToken), e.nonce && !e.pendingToken && (t.nonce = e.nonce), e.pendingToken && (t.pendingToken = e.pendingToken)) : e.oauthToken && e.oauthTokenSecret ? (t.accessToken = e.oauthToken, t.secret = e.oauthTokenSecret) : p("argument-error"), t
                            }
                            toJSON() {
                                return {
                                    idToken: this.idToken,
                                    accessToken: this.accessToken,
                                    secret: this.secret,
                                    nonce: this.nonce,
                                    pendingToken: this.pendingToken,
                                    providerId: this.providerId,
                                    signInMethod: this.signInMethod
                                }
                            }
                            static fromJSON(e) {
                                const t = "string" === typeof e ? JSON.parse(e) : e,
                                    {
                                        providerId: n,
                                        signInMethod: r
                                    } = t,
                                    i = (0, s._T)(t, ["providerId", "signInMethod"]);
                                if (!n || !r) return null;
                                const o = new _e(n, r);
                                return o.idToken = i.idToken || void 0, o.accessToken = i.accessToken || void 0, o.secret = i.secret, o.nonce = i.nonce, o.pendingToken = i.pendingToken || null, o
                            }
                            _getIdTokenResponse(e) {
                                return ge(e, this.buildRequest())
                            }
                            _linkToIdToken(e, t) {
                                const n = this.buildRequest();
                                return n.idToken = t, ge(e, n)
                            }
                            _getReauthenticationResolver(e) {
                                const t = this.buildRequest();
                                return t.autoCreate = !1, ge(e, t)
                            }
                            buildRequest() {
                                const e = {
                                    requestUri: "http://localhost",
                                    returnSecureToken: !0
                                };
                                if (this.pendingToken) e.pendingToken = this.pendingToken;
                                else {
                                    const t = {};
                                    this.idToken && (t.id_token = this.idToken), this.accessToken && (t.access_token = this.accessToken), this.secret && (t.oauth_token_secret = this.secret), t.providerId = this.providerId, this.nonce && !this.pendingToken && (t.nonce = this.nonce), e.postBody = (0, r.xO)(t)
                                }
                                return e
                            }
                        }
                        const Ie = {
                            USER_NOT_FOUND: "user-not-found"
                        };
                        class ye extends pe {
                            constructor(e) {
                                super("phone", "phone"), this.params = e
                            }
                            static _fromVerification(e, t) {
                                return new ye({
                                    verificationId: e,
                                    verificationCode: t
                                })
                            }
                            static _fromTokenResponse(e, t) {
                                return new ye({
                                    phoneNumber: e,
                                    temporaryProof: t
                                })
                            }
                            _getIdTokenResponse(e) {
                                return async function(e, t) {
                                    return M(e, "POST", "/v1/accounts:signInWithPhoneNumber", A(e, t))
                                }(e, this._makeVerificationRequest())
                            }
                            _linkToIdToken(e, t) {
                                return async function(e, t) {
                                    const n = await M(e, "POST", "/v1/accounts:signInWithPhoneNumber", A(e, t));
                                    if (n.temporaryProof) throw x(e, "account-exists-with-different-credential", n);
                                    return n
                                }(e, Object.assign({
                                    idToken: t
                                }, this._makeVerificationRequest()))
                            }
                            _getReauthenticationResolver(e) {
                                return async function(e, t) {
                                    return M(e, "POST", "/v1/accounts:signInWithPhoneNumber", A(e, Object.assign(Object.assign({}, t), {
                                        operation: "REAUTH"
                                    })), Ie)
                                }(e, this._makeVerificationRequest())
                            }
                            _makeVerificationRequest() {
                                const {
                                    temporaryProof: e,
                                    phoneNumber: t,
                                    verificationId: n,
                                    verificationCode: r
                                } = this.params;
                                return e && t ? {
                                    temporaryProof: e,
                                    phoneNumber: t
                                } : {
                                    sessionInfo: n,
                                    code: r
                                }
                            }
                            toJSON() {
                                const e = {
                                    providerId: this.providerId
                                };
                                return this.params.phoneNumber && (e.phoneNumber = this.params.phoneNumber), this.params.temporaryProof && (e.temporaryProof = this.params.temporaryProof), this.params.verificationCode && (e.verificationCode = this.params.verificationCode), this.params.verificationId && (e.verificationId = this.params.verificationId), e
                            }
                            static fromJSON(e) {
                                "string" === typeof e && (e = JSON.parse(e));
                                const {
                                    verificationId: t,
                                    verificationCode: n,
                                    phoneNumber: r,
                                    temporaryProof: i
                                } = e;
                                return n || t || r || i ? new ye({
                                    verificationId: t,
                                    verificationCode: n,
                                    phoneNumber: r,
                                    temporaryProof: i
                                }) : null
                            }
                        }
                        class we {
                            constructor(e) {
                                var t, n, i, s, o, a;
                                const c = (0, r.zd)((0, r.pd)(e)),
                                    u = null !== (t = c.apiKey) && void 0 !== t ? t : null,
                                    l = null !== (n = c.oobCode) && void 0 !== n ? n : null,
                                    d = function(e) {
                                        switch (e) {
                                            case "recoverEmail":
                                                return "RECOVER_EMAIL";
                                            case "resetPassword":
                                                return "PASSWORD_RESET";
                                            case "signIn":
                                                return "EMAIL_SIGNIN";
                                            case "verifyEmail":
                                                return "VERIFY_EMAIL";
                                            case "verifyAndChangeEmail":
                                                return "VERIFY_AND_CHANGE_EMAIL";
                                            case "revertSecondFactorAddition":
                                                return "REVERT_SECOND_FACTOR_ADDITION";
                                            default:
                                                return null
                                        }
                                    }(null !== (i = c.mode) && void 0 !== i ? i : null);
                                _(u && l && d, "argument-error"), this.apiKey = u, this.operation = d, this.code = l, this.continueUrl = null !== (s = c.continueUrl) && void 0 !== s ? s : null, this.languageCode = null !== (o = c.languageCode) && void 0 !== o ? o : null, this.tenantId = null !== (a = c.tenantId) && void 0 !== a ? a : null
                            }
                            static parseLink(e) {
                                const t = function(e) {
                                    const t = (0, r.zd)((0, r.pd)(e)).link,
                                        n = t ? (0, r.zd)((0, r.pd)(t)).deep_link_id : null,
                                        i = (0, r.zd)((0, r.pd)(e)).deep_link_id;
                                    return (i ? (0, r.zd)((0, r.pd)(i)).link : null) || i || n || t || e
                                }(e);
                                try {
                                    return new we(t)
                                } catch (n) {
                                    return null
                                }
                            }
                        }
                        class Te {
                            constructor() {
                                this.providerId = Te.PROVIDER_ID
                            }
                            static credential(e, t) {
                                return ve._fromEmailAndPassword(e, t)
                            }
                            static credentialWithLink(e, t) {
                                const n = we.parseLink(t);
                                return _(n, "argument-error"), ve._fromEmailAndCode(e, n.code, n.tenantId)
                            }
                        }
                        Te.PROVIDER_ID = "password", Te.EMAIL_PASSWORD_SIGN_IN_METHOD = "password", Te.EMAIL_LINK_SIGN_IN_METHOD = "emailLink";
                        class ke {
                            constructor(e) {
                                this.providerId = e, this.defaultLanguageCode = null, this.customParameters = {}
                            }
                            setDefaultLanguage(e) {
                                this.defaultLanguageCode = e
                            }
                            setCustomParameters(e) {
                                return this.customParameters = e, this
                            }
                            getCustomParameters() {
                                return this.customParameters
                            }
                        }
                        class Ee extends ke {
                            constructor() {
                                super(...arguments), this.scopes = []
                            }
                            addScope(e) {
                                return this.scopes.includes(e) || this.scopes.push(e), this
                            }
                            getScopes() {
                                return [...this.scopes]
                            }
                        }
                        class Re extends Ee {
                            constructor() {
                                super("facebook.com")
                            }
                            static credential(e) {
                                return _e._fromParams({
                                    providerId: Re.PROVIDER_ID,
                                    signInMethod: Re.FACEBOOK_SIGN_IN_METHOD,
                                    accessToken: e
                                })
                            }
                            static credentialFromResult(e) {
                                return Re.credentialFromTaggedObject(e)
                            }
                            static credentialFromError(e) {
                                return Re.credentialFromTaggedObject(e.customData || {})
                            }
                            static credentialFromTaggedObject({
                                _tokenResponse: e
                            }) {
                                if (!e || !("oauthAccessToken" in e)) return null;
                                if (!e.oauthAccessToken) return null;
                                try {
                                    return Re.credential(e.oauthAccessToken)
                                } catch (t) {
                                    return null
                                }
                            }
                        }
                        Re.FACEBOOK_SIGN_IN_METHOD = "facebook.com", Re.PROVIDER_ID = "facebook.com";
                        class be extends Ee {
                            constructor() {
                                super("google.com"), this.addScope("profile")
                            }
                            static credential(e, t) {
                                return _e._fromParams({
                                    providerId: be.PROVIDER_ID,
                                    signInMethod: be.GOOGLE_SIGN_IN_METHOD,
                                    idToken: e,
                                    accessToken: t
                                })
                            }
                            static credentialFromResult(e) {
                                return be.credentialFromTaggedObject(e)
                            }
                            static credentialFromError(e) {
                                return be.credentialFromTaggedObject(e.customData || {})
                            }
                            static credentialFromTaggedObject({
                                _tokenResponse: e
                            }) {
                                if (!e) return null;
                                const {
                                    oauthIdToken: t,
                                    oauthAccessToken: n
                                } = e;
                                if (!t && !n) return null;
                                try {
                                    return be.credential(t, n)
                                } catch (r) {
                                    return null
                                }
                            }
                        }
                        be.GOOGLE_SIGN_IN_METHOD = "google.com", be.PROVIDER_ID = "google.com";
                        class Se extends Ee {
                            constructor() {
                                super("github.com")
                            }
                            static credential(e) {
                                return _e._fromParams({
                                    providerId: Se.PROVIDER_ID,
                                    signInMethod: Se.GITHUB_SIGN_IN_METHOD,
                                    accessToken: e
                                })
                            }
                            static credentialFromResult(e) {
                                return Se.credentialFromTaggedObject(e)
                            }
                            static credentialFromError(e) {
                                return Se.credentialFromTaggedObject(e.customData || {})
                            }
                            static credentialFromTaggedObject({
                                _tokenResponse: e
                            }) {
                                if (!e || !("oauthAccessToken" in e)) return null;
                                if (!e.oauthAccessToken) return null;
                                try {
                                    return Se.credential(e.oauthAccessToken)
                                } catch (t) {
                                    return null
                                }
                            }
                        }
                        Se.GITHUB_SIGN_IN_METHOD = "github.com", Se.PROVIDER_ID = "github.com";
                        class Ne extends Ee {
                            constructor() {
                                super("twitter.com")
                            }
                            static credential(e, t) {
                                return _e._fromParams({
                                    providerId: Ne.PROVIDER_ID,
                                    signInMethod: Ne.TWITTER_SIGN_IN_METHOD,
                                    oauthToken: e,
                                    oauthTokenSecret: t
                                })
                            }
                            static credentialFromResult(e) {
                                return Ne.credentialFromTaggedObject(e)
                            }
                            static credentialFromError(e) {
                                return Ne.credentialFromTaggedObject(e.customData || {})
                            }
                            static credentialFromTaggedObject({
                                _tokenResponse: e
                            }) {
                                if (!e) return null;
                                const {
                                    oauthAccessToken: t,
                                    oauthTokenSecret: n
                                } = e;
                                if (!t || !n) return null;
                                try {
                                    return Ne.credential(t, n)
                                } catch (r) {
                                    return null
                                }
                            }
                        }
                        async function Oe(e, t) {
                            return M(e, "POST", "/v1/accounts:signUp", A(e, t))
                        }
                        Ne.TWITTER_SIGN_IN_METHOD = "twitter.com", Ne.PROVIDER_ID = "twitter.com";
                        class Pe {
                            constructor(e) {
                                this.user = e.user, this.providerId = e.providerId, this._tokenResponse = e._tokenResponse, this.operationType = e.operationType
                            }
                            static async _fromIdTokenResponse(e, t, n, r = !1) {
                                const i = await G._fromIdTokenResponse(e, n, r),
                                    s = Ae(n);
                                return new Pe({
                                    user: i,
                                    providerId: s,
                                    _tokenResponse: n,
                                    operationType: t
                                })
                            }
                            static async _forOperation(e, t, n) {
                                await e._updateTokensIfNecessary(n, !0);
                                const r = Ae(n);
                                return new Pe({
                                    user: e,
                                    providerId: r,
                                    _tokenResponse: n,
                                    operationType: t
                                })
                            }
                        }

                        function Ae(e) {
                            return e.providerId ? e.providerId : "phoneNumber" in e ? "phone" : null
                        }
                        class Ce extends r.ZR {
                            constructor(e, t, n, r) {
                                var i;
                                super(t.code, t.message), this.operationType = n, this.user = r, Object.setPrototypeOf(this, Ce.prototype), this.customData = {
                                    appName: e.name,
                                    tenantId: null !== (i = e.tenantId) && void 0 !== i ? i : void 0,
                                    _serverResponse: t.customData._serverResponse,
                                    operationType: n
                                }
                            }
                            static _fromErrorAndOperation(e, t, n, r) {
                                return new Ce(e, t, n, r)
                            }
                        }

                        function Le(e, t, n, r) {
                            return ("reauthenticate" === t ? n._getReauthenticationResolver(e) : n._getIdTokenResponse(e)).catch((n => {
                                if ("auth/multi-factor-auth-required" === n.code) throw Ce._fromErrorAndOperation(e, n, t, r);
                                throw n
                            }))
                        }
                        async function Me(e, t, n = !1) {
                            const r = await z(e, t._linkToIdToken(e.auth, await e.getIdToken()), n);
                            return Pe._forOperation(e, "link", r)
                        }
                        async function De(e, t, n = !1) {
                            var r;
                            const {
                                auth: i
                            } = e, s = "reauthenticate";
                            try {
                                const r = await z(e, Le(i, s, t, e), n);
                                _(r.idToken, i, "internal-error");
                                const o = j(r.idToken);
                                _(o, i, "internal-error");
                                const {
                                    sub: a
                                } = o;
                                return _(e.uid === a, i, "user-mismatch"), Pe._forOperation(e, s, r)
                            } catch (o) {
                                throw "auth/user-not-found" === (null === (r = o) || void 0 === r ? void 0 : r.code) && p(i, "user-mismatch"), o
                            }
                        }
                        async function Ue(e, t, n = !1) {
                            const r = "signIn",
                                i = await Le(e, r, t),
                                s = await Pe._fromIdTokenResponse(e, r, i);
                            return n || await e._updateCurrentUser(s.user), s
                        }
                        async function xe(e, t) {
                            return Ue(de(e), t)
                        }
                        async function Fe(e, t) {
                            return De((0, r.m9)(e), t)
                        }
                        class Ve {
                            constructor(e, t) {
                                this.factorId = e, this.uid = t.mfaEnrollmentId, this.enrollmentTime = new Date(t.enrolledAt).toUTCString(), this.displayName = t.displayName
                            }
                            static _fromServerResponse(e, t) {
                                return "phoneInfo" in t ? je._fromServerResponse(e, t) : p(e, "internal-error")
                            }
                        }
                        class je extends Ve {
                            constructor(e) {
                                super("phone", e), this.phoneNumber = e.phoneInfo
                            }
                            static _fromServerResponse(e, t) {
                                return new je(t)
                            }
                        }
                        async function ze(e, t, n) {
                            await fe((0, r.m9)(e), {
                                oobCode: t,
                                newPassword: n
                            })
                        }
                        async function He(e, t) {
                            const {
                                data: n
                            } = await async function(e, t) {
                                const n = (0, r.m9)(e),
                                    i = await fe(n, {
                                        oobCode: t
                                    }),
                                    s = i.requestType;
                                switch (_(s, n, "internal-error"), s) {
                                    case "EMAIL_SIGNIN":
                                        break;
                                    case "VERIFY_AND_CHANGE_EMAIL":
                                        _(i.newEmail, n, "internal-error");
                                        break;
                                    case "REVERT_SECOND_FACTOR_ADDITION":
                                        _(i.mfaInfo, n, "internal-error");
                                    default:
                                        _(i.email, n, "internal-error")
                                }
                                let o = null;
                                return i.mfaInfo && (o = Ve._fromServerResponse(de(n), i.mfaInfo)), {
                                    data: {
                                        email: ("VERIFY_AND_CHANGE_EMAIL" === i.requestType ? i.newEmail : i.email) || null,
                                        previousEmail: ("VERIFY_AND_CHANGE_EMAIL" === i.requestType ? i.email : i.newEmail) || null,
                                        multiFactorInfo: o
                                    },
                                    operation: s
                                }
                            }((0, r.m9)(e), t);
                            return n.email
                        }
                        async function We(e, t, n) {
                            const r = de(e),
                                i = await Oe(r, {
                                    returnSecureToken: !0,
                                    email: t,
                                    password: n
                                }),
                                s = await Pe._fromIdTokenResponse(r, "signIn", i);
                            return await r._updateCurrentUser(s.user), s
                        }

                        function qe(e, t, n) {
                            return xe((0, r.m9)(e), Te.credential(t, n))
                        }

                        function Ke(e, t) {
                            return Ge((0, r.m9)(e), t, null)
                        }

                        function $e(e, t) {
                            return Ge((0, r.m9)(e), null, t)
                        }
                        async function Ge(e, t, n) {
                            const {
                                auth: r
                            } = e, i = {
                                idToken: await e.getIdToken(),
                                returnSecureToken: !0
                            };
                            t && (i.email = t), n && (i.password = n);
                            const s = await z(e, me(r, i));
                            await e._updateTokensIfNecessary(s, !0)
                        }
                        class Je {
                            constructor(e, t, n = {}) {
                                this.isNewUser = e, this.providerId = t, this.profile = n
                            }
                        }
                        class Be extends Je {
                            constructor(e, t, n, r) {
                                super(e, t, n), this.username = r
                            }
                        }
                        class Xe extends Je {
                            constructor(e, t) {
                                super(e, "facebook.com", t)
                            }
                        }
                        class Ye extends Be {
                            constructor(e, t) {
                                super(e, "github.com", t, "string" === typeof(null === t || void 0 === t ? void 0 : t.login) ? null === t || void 0 === t ? void 0 : t.login : null)
                            }
                        }
                        class Qe extends Je {
                            constructor(e, t) {
                                super(e, "google.com", t)
                            }
                        }
                        class Ze extends Be {
                            constructor(e, t, n) {
                                super(e, "twitter.com", t, n)
                            }
                        }

                        function et(e) {
                            const {
                                user: t,
                                _tokenResponse: n
                            } = e;
                            return t.isAnonymous && !n ? {
                                providerId: null,
                                isNewUser: !1,
                                profile: null
                            } : function(e) {
                                var t, n;
                                if (!e) return null;
                                const {
                                    providerId: r
                                } = e, i = e.rawUserInfo ? JSON.parse(e.rawUserInfo) : {}, s = e.isNewUser || "identitytoolkit#SignupNewUserResponse" === e.kind;
                                if (!r && (null === e || void 0 === e ? void 0 : e.idToken)) {
                                    const r = null === (n = null === (t = j(e.idToken)) || void 0 === t ? void 0 : t.firebase) || void 0 === n ? void 0 : n.sign_in_provider;
                                    if (r) return new Je(s, "anonymous" !== r && "custom" !== r ? r : null)
                                }
                                if (!r) return null;
                                switch (r) {
                                    case "facebook.com":
                                        return new Xe(s, i);
                                    case "github.com":
                                        return new Ye(s, i);
                                    case "google.com":
                                        return new Qe(s, i);
                                    case "twitter.com":
                                        return new Ze(s, i, e.screenName || null);
                                    case "custom":
                                    case "anonymous":
                                        return new Je(s, null);
                                    default:
                                        return new Je(s, r, i)
                                }
                            }(n)
                        }

                        function tt(e, t, n, i) {
                            return (0, r.m9)(e).onIdTokenChanged(t, n, i)
                        }

                        function nt(e, t, n, i) {
                            return (0, r.m9)(e).onAuthStateChanged(t, n, i)
                        }

                        function rt(e) {
                            return (0, r.m9)(e).signOut()
                        }
                        new WeakMap;
                        const it = "__sak";
                        class st {
                            constructor(e, t) {
                                this.storageRetriever = e, this.type = t
                            }
                            _isAvailable() {
                                try {
                                    return this.storage ? (this.storage.setItem(it, "1"), this.storage.removeItem(it), Promise.resolve(!0)) : Promise.resolve(!1)
                                } catch (e) {
                                    return Promise.resolve(!1)
                                }
                            }
                            _set(e, t) {
                                return this.storage.setItem(e, JSON.stringify(t)), Promise.resolve()
                            }
                            _get(e) {
                                const t = this.storage.getItem(e);
                                return Promise.resolve(t ? JSON.parse(t) : null)
                            }
                            _remove(e) {
                                return this.storage.removeItem(e), Promise.resolve()
                            }
                            get storage() {
                                return this.storageRetriever()
                            }
                        }
                        class ot extends st {
                            constructor() {
                                super((() => window.localStorage), "LOCAL"), this.boundEventHandler = (e, t) => this.onStorageEvent(e, t), this.listeners = {}, this.localCache = {}, this.pollTimer = null, this.safariLocalStorageNotSynced = function() {
                                    const e = (0, r.z$)();
                                    return ee(e) || oe(e)
                                }() && function() {
                                    try {
                                        return !(!window || window === window.top)
                                    } catch (e) {
                                        return !1
                                    }
                                }(), this.fallbackToPolling = ae(), this._shouldAllowMigration = !0
                            }
                            forAllChangedKeys(e) {
                                for (const t of Object.keys(this.listeners)) {
                                    const n = this.storage.getItem(t),
                                        r = this.localCache[t];
                                    n !== r && e(t, r, n)
                                }
                            }
                            onStorageEvent(e, t = !1) {
                                if (!e.key) return void this.forAllChangedKeys(((e, t, n) => {
                                    this.notifyListeners(e, n)
                                }));
                                const n = e.key;
                                if (t ? this.detachListener() : this.stopPolling(), this.safariLocalStorageNotSynced) {
                                    const r = this.storage.getItem(n);
                                    if (e.newValue !== r) null !== e.newValue ? this.storage.setItem(n, e.newValue) : this.storage.removeItem(n);
                                    else if (this.localCache[n] === e.newValue && !t) return
                                }
                                const i = () => {
                                        const e = this.storage.getItem(n);
                                        (t || this.localCache[n] !== e) && this.notifyListeners(n, e)
                                    },
                                    s = this.storage.getItem(n);
                                (0, r.w1)() && 10 === document.documentMode && s !== e.newValue && e.newValue !== e.oldValue ? setTimeout(i, 10) : i()
                            }
                            notifyListeners(e, t) {
                                this.localCache[e] = t;
                                const n = this.listeners[e];
                                if (n)
                                    for (const r of Array.from(n)) r(t ? JSON.parse(t) : t)
                            }
                            startPolling() {
                                this.stopPolling(), this.pollTimer = setInterval((() => {
                                    this.forAllChangedKeys(((e, t, n) => {
                                        this.onStorageEvent(new StorageEvent("storage", {
                                            key: e,
                                            oldValue: t,
                                            newValue: n
                                        }), !0)
                                    }))
                                }), 1e3)
                            }
                            stopPolling() {
                                this.pollTimer && (clearInterval(this.pollTimer), this.pollTimer = null)
                            }
                            attachListener() {
                                window.addEventListener("storage", this.boundEventHandler)
                            }
                            detachListener() {
                                window.removeEventListener("storage", this.boundEventHandler)
                            }
                            _addListener(e, t) {
                                0 === Object.keys(this.listeners).length && (this.fallbackToPolling ? this.startPolling() : this.attachListener()), this.listeners[e] || (this.listeners[e] = new Set, this.localCache[e] = this.storage.getItem(e)), this.listeners[e].add(t)
                            }
                            _removeListener(e, t) {
                                this.listeners[e] && (this.listeners[e].delete(t), 0 === this.listeners[e].size && delete this.listeners[e]), 0 === Object.keys(this.listeners).length && (this.detachListener(), this.stopPolling())
                            }
                            async _set(e, t) {
                                await super._set(e, t), this.localCache[e] = JSON.stringify(t)
                            }
                            async _get(e) {
                                const t = await super._get(e);
                                return this.localCache[e] = JSON.stringify(t), t
                            }
                            async _remove(e) {
                                await super._remove(e), delete this.localCache[e]
                            }
                        }
                        ot.type = "LOCAL";
                        const at = ot;
                        class ct extends st {
                            constructor() {
                                super((() => window.sessionStorage), "SESSION")
                            }
                            _addListener(e, t) {}
                            _removeListener(e, t) {}
                        }
                        ct.type = "SESSION";
                        const ut = ct;
                        class lt {
                            constructor(e) {
                                this.eventTarget = e, this.handlersMap = {}, this.boundEventHandler = this.handleEvent.bind(this)
                            }
                            static _getInstance(e) {
                                const t = this.receivers.find((t => t.isListeningto(e)));
                                if (t) return t;
                                const n = new lt(e);
                                return this.receivers.push(n), n
                            }
                            isListeningto(e) {
                                return this.eventTarget === e
                            }
                            async handleEvent(e) {
                                const t = e,
                                    {
                                        eventId: n,
                                        eventType: r,
                                        data: i
                                    } = t.data,
                                    s = this.handlersMap[r];
                                if (!(null === s || void 0 === s ? void 0 : s.size)) return;
                                t.ports[0].postMessage({
                                    status: "ack",
                                    eventId: n,
                                    eventType: r
                                });
                                const o = Array.from(s).map((async e => e(t.origin, i))),
                                    a = await
                                function(e) {
                                    return Promise.all(e.map((async e => {
                                        try {
                                            return {
                                                fulfilled: !0,
                                                value: await e
                                            }
                                        } catch (t) {
                                            return {
                                                fulfilled: !1,
                                                reason: t
                                            }
                                        }
                                    })))
                                }(o);
                                t.ports[0].postMessage({
                                    status: "done",
                                    eventId: n,
                                    eventType: r,
                                    response: a
                                })
                            }
                            _subscribe(e, t) {
                                0 === Object.keys(this.handlersMap).length && this.eventTarget.addEventListener("message", this.boundEventHandler), this.handlersMap[e] || (this.handlersMap[e] = new Set), this.handlersMap[e].add(t)
                            }
                            _unsubscribe(e, t) {
                                this.handlersMap[e] && t && this.handlersMap[e].delete(t), t && 0 !== this.handlersMap[e].size || delete this.handlersMap[e], 0 === Object.keys(this.handlersMap).length && this.eventTarget.removeEventListener("message", this.boundEventHandler)
                            }
                        }

                        function dt(e = "", t = 10) {
                            let n = "";
                            for (let r = 0; r < t; r++) n += Math.floor(10 * Math.random());
                            return e + n
                        }
                        lt.receivers = [];
                        class ht {
                            constructor(e) {
                                this.target = e, this.handlers = new Set
                            }
                            removeMessageHandler(e) {
                                e.messageChannel && (e.messageChannel.port1.removeEventListener("message", e.onMessage), e.messageChannel.port1.close()), this.handlers.delete(e)
                            }
                            async _send(e, t, n = 50) {
                                const r = "undefined" !== typeof MessageChannel ? new MessageChannel : null;
                                if (!r) throw new Error("connection_unavailable");
                                let i, s;
                                return new Promise(((o, a) => {
                                    const c = dt("", 20);
                                    r.port1.start();
                                    const u = setTimeout((() => {
                                        a(new Error("unsupported_event"))
                                    }), n);
                                    s = {
                                        messageChannel: r,
                                        onMessage(e) {
                                            const t = e;
                                            if (t.data.eventId === c) switch (t.data.status) {
                                                case "ack":
                                                    clearTimeout(u), i = setTimeout((() => {
                                                        a(new Error("timeout"))
                                                    }), 3e3);
                                                    break;
                                                case "done":
                                                    clearTimeout(i), o(t.data.response);
                                                    break;
                                                default:
                                                    clearTimeout(u), clearTimeout(i), a(new Error("invalid_response"))
                                            }
                                        }
                                    }, this.handlers.add(s), r.port1.addEventListener("message", s.onMessage), this.target.postMessage({
                                        eventType: e,
                                        eventId: c,
                                        data: t
                                    }, [r.port2])
                                })).finally((() => {
                                    s && this.removeMessageHandler(s)
                                }))
                            }
                        }

                        function pt() {
                            return window
                        }

                        function ft() {
                            return "undefined" !== typeof pt().WorkerGlobalScope && "function" === typeof pt().importScripts
                        }
                        const mt = "firebaseLocalStorageDb",
                            vt = "firebaseLocalStorage",
                            gt = "fbase_key";
                        class _t {
                            constructor(e) {
                                this.request = e
                            }
                            toPromise() {
                                return new Promise(((e, t) => {
                                    this.request.addEventListener("success", (() => {
                                        e(this.request.result)
                                    })), this.request.addEventListener("error", (() => {
                                        t(this.request.error)
                                    }))
                                }))
                            }
                        }

                        function It(e, t) {
                            return e.transaction([vt], t ? "readwrite" : "readonly").objectStore(vt)
                        }

                        function yt() {
                            const e = indexedDB.open(mt, 1);
                            return new Promise(((t, n) => {
                                e.addEventListener("error", (() => {
                                    n(e.error)
                                })), e.addEventListener("upgradeneeded", (() => {
                                    const t = e.result;
                                    try {
                                        t.createObjectStore(vt, {
                                            keyPath: gt
                                        })
                                    } catch (r) {
                                        n(r)
                                    }
                                })), e.addEventListener("success", (async () => {
                                    const n = e.result;
                                    n.objectStoreNames.contains(vt) ? t(n) : (n.close(), await
                                        function() {
                                            const e = indexedDB.deleteDatabase(mt);
                                            return new _t(e).toPromise()
                                        }(), t(await yt()))
                                }))
                            }))
                        }
                        async function wt(e, t, n) {
                            const r = It(e, !0).put({
                                [gt]: t,
                                value: n
                            });
                            return new _t(r).toPromise()
                        }

                        function Tt(e, t) {
                            const n = It(e, !0).delete(t);
                            return new _t(n).toPromise()
                        }
                        class kt {
                            constructor() {
                                this.type = "LOCAL", this._shouldAllowMigration = !0, this.listeners = {}, this.localCache = {}, this.pollTimer = null, this.pendingWrites = 0, this.receiver = null, this.sender = null, this.serviceWorkerReceiverAvailable = !1, this.activeServiceWorker = null, this._workerInitializationPromise = this.initializeServiceWorkerMessaging().then((() => {}), (() => {}))
                            }
                            async _openDb() {
                                return this.db || (this.db = await yt()), this.db
                            }
                            async _withRetries(e) {
                                let t = 0;
                                for (;;) try {
                                    const t = await this._openDb();
                                    return await e(t)
                                } catch (n) {
                                    if (t++ > 3) throw n;
                                    this.db && (this.db.close(), this.db = void 0)
                                }
                            }
                            async initializeServiceWorkerMessaging() {
                                return ft() ? this.initializeReceiver() : this.initializeSender()
                            }
                            async initializeReceiver() {
                                this.receiver = lt._getInstance(ft() ? self : null), this.receiver._subscribe("keyChanged", (async (e, t) => ({
                                    keyProcessed: (await this._poll()).includes(t.key)
                                }))), this.receiver._subscribe("ping", (async (e, t) => ["keyChanged"]))
                            }
                            async initializeSender() {
                                var e, t;
                                if (this.activeServiceWorker = await async function() {
                                        if (!(null === navigator || void 0 === navigator ? void 0 : navigator.serviceWorker)) return null;
                                        try {
                                            return (await navigator.serviceWorker.ready).active
                                        } catch (e) {
                                            return null
                                        }
                                    }(), !this.activeServiceWorker) return;
                                this.sender = new ht(this.activeServiceWorker);
                                const n = await this.sender._send("ping", {}, 800);
                                n && (null === (e = n[0]) || void 0 === e ? void 0 : e.fulfilled) && (null === (t = n[0]) || void 0 === t ? void 0 : t.value.includes("keyChanged")) && (this.serviceWorkerReceiverAvailable = !0)
                            }
                            async notifyServiceWorker(e) {
                                if (this.sender && this.activeServiceWorker && function() {
                                        var e;
                                        return (null === (e = null === navigator || void 0 === navigator ? void 0 : navigator.serviceWorker) || void 0 === e ? void 0 : e.controller) || null
                                    }() === this.activeServiceWorker) try {
                                    await this.sender._send("keyChanged", {
                                        key: e
                                    }, this.serviceWorkerReceiverAvailable ? 800 : 50)
                                } catch (t) {}
                            }
                            async _isAvailable() {
                                try {
                                    if (!indexedDB) return !1;
                                    const e = await yt();
                                    return await wt(e, it, "1"), await Tt(e, it), !0
                                } catch (e) {}
                                return !1
                            }
                            async _withPendingWrite(e) {
                                this.pendingWrites++;
                                try {
                                    await e()
                                } finally {
                                    this.pendingWrites--
                                }
                            }
                            async _set(e, t) {
                                return this._withPendingWrite((async () => (await this._withRetries((n => wt(n, e, t))), this.localCache[e] = t, this.notifyServiceWorker(e))))
                            }
                            async _get(e) {
                                const t = await this._withRetries((t => async function(e, t) {
                                    const n = It(e, !1).get(t),
                                        r = await new _t(n).toPromise();
                                    return void 0 === r ? null : r.value
                                }(t, e)));
                                return this.localCache[e] = t, t
                            }
                            async _remove(e) {
                                return this._withPendingWrite((async () => (await this._withRetries((t => Tt(t, e))), delete this.localCache[e], this.notifyServiceWorker(e))))
                            }
                            async _poll() {
                                const e = await this._withRetries((e => {
                                    const t = It(e, !1).getAll();
                                    return new _t(t).toPromise()
                                }));
                                if (!e) return [];
                                if (0 !== this.pendingWrites) return [];
                                const t = [],
                                    n = new Set;
                                for (const {
                                        fbase_key: r,
                                        value: i
                                    } of e) n.add(r), JSON.stringify(this.localCache[r]) !== JSON.stringify(i) && (this.notifyListeners(r, i), t.push(r));
                                for (const r of Object.keys(this.localCache)) this.localCache[r] && !n.has(r) && (this.notifyListeners(r, null), t.push(r));
                                return t
                            }
                            notifyListeners(e, t) {
                                this.localCache[e] = t;
                                const n = this.listeners[e];
                                if (n)
                                    for (const r of Array.from(n)) r(t)
                            }
                            startPolling() {
                                this.stopPolling(), this.pollTimer = setInterval((async () => this._poll()), 800)
                            }
                            stopPolling() {
                                this.pollTimer && (clearInterval(this.pollTimer), this.pollTimer = null)
                            }
                            _addListener(e, t) {
                                0 === Object.keys(this.listeners).length && this.startPolling(), this.listeners[e] || (this.listeners[e] = new Set, this._get(e)), this.listeners[e].add(t)
                            }
                            _removeListener(e, t) {
                                this.listeners[e] && (this.listeners[e].delete(t), 0 === this.listeners[e].size && delete this.listeners[e]), 0 === Object.keys(this.listeners).length && this.stopPolling()
                            }
                        }
                        kt.type = "LOCAL";
                        const Et = kt;

                        function Rt(e) {
                            return new Promise(((t, n) => {
                                const r = document.createElement("script");
                                r.setAttribute("src", e), r.onload = t, r.onerror = e => {
                                        const t = f("internal-error");
                                        t.customData = e, n(t)
                                    }, r.type = "text/javascript", r.charset = "UTF-8",
                                    function() {
                                        var e, t;
                                        return null !== (t = null === (e = document.getElementsByTagName("head")) || void 0 === e ? void 0 : e[0]) && void 0 !== t ? t : document
                                    }().appendChild(r)
                            }))
                        }

                        function bt(e) {
                            return `__${e}${Math.floor(1e6*Math.random())}`
                        }
                        bt("rcb"), new b(3e4, 6e4);
                        const St = "recaptcha";
                        async function Nt(e, t, n) {
                            var r;
                            const i = await n.verify();
                            try {
                                let s;
                                if (_("string" === typeof i, e, "argument-error"), _(n.type === St, e, "argument-error"), s = "string" === typeof t ? {
                                        phoneNumber: t
                                    } : t, "session" in s) {
                                    const t = s.session;
                                    if ("phoneNumber" in s) {
                                        _("enroll" === t.type, e, "internal-error");
                                        const n = await
                                        function(e, t) {
                                            return C(e, "POST", "/v2/accounts/mfaEnrollment:start", A(e, t))
                                        }(e, {
                                            idToken: t.credential,
                                            phoneEnrollmentInfo: {
                                                phoneNumber: s.phoneNumber,
                                                recaptchaToken: i
                                            }
                                        });
                                        return n.phoneSessionInfo.sessionInfo
                                    } {
                                        _("signin" === t.type, e, "internal-error");
                                        const n = (null === (r = s.multiFactorHint) || void 0 === r ? void 0 : r.uid) || s.multiFactorUid;
                                        _(n, e, "missing-multi-factor-info");
                                        const o = await
                                        function(e, t) {
                                            return C(e, "POST", "/v2/accounts/mfaSignIn:start", A(e, t))
                                        }(e, {
                                            mfaPendingCredential: t.credential,
                                            mfaEnrollmentId: n,
                                            phoneSignInInfo: {
                                                recaptchaToken: i
                                            }
                                        });
                                        return o.phoneResponseInfo.sessionInfo
                                    }
                                } {
                                    const {
                                        sessionInfo: t
                                    } = await async function(e, t) {
                                        return C(e, "POST", "/v1/accounts:sendVerificationCode", A(e, t))
                                    }(e, {
                                        phoneNumber: s.phoneNumber,
                                        recaptchaToken: i
                                    });
                                    return t
                                }
                            } finally {
                                n._reset()
                            }
                        }
                        class Ot {
                            constructor(e) {
                                this.providerId = Ot.PROVIDER_ID, this.auth = de(e)
                            }
                            verifyPhoneNumber(e, t) {
                                return Nt(this.auth, e, (0, r.m9)(t))
                            }
                            static credential(e, t) {
                                return ye._fromVerification(e, t)
                            }
                            static credentialFromResult(e) {
                                const t = e;
                                return Ot.credentialFromTaggedObject(t)
                            }
                            static credentialFromError(e) {
                                return Ot.credentialFromTaggedObject(e.customData || {})
                            }
                            static credentialFromTaggedObject({
                                _tokenResponse: e
                            }) {
                                if (!e) return null;
                                const {
                                    phoneNumber: t,
                                    temporaryProof: n
                                } = e;
                                return t && n ? ye._fromTokenResponse(t, n) : null
                            }
                        }

                        function Pt(e, t) {
                            return t ? T(t) : (_(e._popupRedirectResolver, e, "argument-error"), e._popupRedirectResolver)
                        }
                        Ot.PROVIDER_ID = "phone", Ot.PHONE_SIGN_IN_METHOD = "phone";
                        class At extends pe {
                            constructor(e) {
                                super("custom", "custom"), this.params = e
                            }
                            _getIdTokenResponse(e) {
                                return ge(e, this._buildIdpRequest())
                            }
                            _linkToIdToken(e, t) {
                                return ge(e, this._buildIdpRequest(t))
                            }
                            _getReauthenticationResolver(e) {
                                return ge(e, this._buildIdpRequest())
                            }
                            _buildIdpRequest(e) {
                                const t = {
                                    requestUri: this.params.requestUri,
                                    sessionId: this.params.sessionId,
                                    postBody: this.params.postBody,
                                    tenantId: this.params.tenantId,
                                    pendingToken: this.params.pendingToken,
                                    returnSecureToken: !0,
                                    returnIdpCredential: !0
                                };
                                return e && (t.idToken = e), t
                            }
                        }

                        function Ct(e) {
                            return Ue(e.auth, new At(e), e.bypassAuthState)
                        }

                        function Lt(e) {
                            const {
                                auth: t,
                                user: n
                            } = e;
                            return _(n, t, "internal-error"), De(n, new At(e), e.bypassAuthState)
                        }
                        async function Mt(e) {
                            const {
                                auth: t,
                                user: n
                            } = e;
                            return _(n, t, "internal-error"), Me(n, new At(e), e.bypassAuthState)
                        }
                        class Dt {
                            constructor(e, t, n, r, i = !1) {
                                this.auth = e, this.resolver = n, this.user = r, this.bypassAuthState = i, this.pendingPromise = null, this.eventManager = null, this.filter = Array.isArray(t) ? t : [t]
                            }
                            execute() {
                                return new Promise((async (e, t) => {
                                    this.pendingPromise = {
                                        resolve: e,
                                        reject: t
                                    };
                                    try {
                                        this.eventManager = await this.resolver._initialize(this.auth), await this.onExecution(), this.eventManager.registerConsumer(this)
                                    } catch (n) {
                                        this.reject(n)
                                    }
                                }))
                            }
                            async onAuthEvent(e) {
                                const {
                                    urlResponse: t,
                                    sessionId: n,
                                    postBody: r,
                                    tenantId: i,
                                    error: s,
                                    type: o
                                } = e;
                                if (s) return void this.reject(s);
                                const a = {
                                    auth: this.auth,
                                    requestUri: t,
                                    sessionId: n,
                                    tenantId: i || void 0,
                                    postBody: r || void 0,
                                    user: this.user,
                                    bypassAuthState: this.bypassAuthState
                                };
                                try {
                                    this.resolve(await this.getIdpTask(o)(a))
                                } catch (c) {
                                    this.reject(c)
                                }
                            }
                            onError(e) {
                                this.reject(e)
                            }
                            getIdpTask(e) {
                                switch (e) {
                                    case "signInViaPopup":
                                    case "signInViaRedirect":
                                        return Ct;
                                    case "linkViaPopup":
                                    case "linkViaRedirect":
                                        return Mt;
                                    case "reauthViaPopup":
                                    case "reauthViaRedirect":
                                        return Lt;
                                    default:
                                        p(this.auth, "internal-error")
                                }
                            }
                            resolve(e) {
                                y(this.pendingPromise, "Pending promise was never set"), this.pendingPromise.resolve(e), this.unregisterAndCleanUp()
                            }
                            reject(e) {
                                y(this.pendingPromise, "Pending promise was never set"), this.pendingPromise.reject(e), this.unregisterAndCleanUp()
                            }
                            unregisterAndCleanUp() {
                                this.eventManager && this.eventManager.unregisterConsumer(this), this.pendingPromise = null, this.cleanUp()
                            }
                        }
                        const Ut = new b(2e3, 1e4);
                        async function xt(e, t, n) {
                            const r = de(e);
                            v(e, t, ke);
                            const i = Pt(r, n);
                            return new Ft(r, "signInViaPopup", t, i).executeNotNull()
                        }
                        class Ft extends Dt {
                            constructor(e, t, n, r, i) {
                                super(e, t, r, i), this.provider = n, this.authWindow = null, this.pollId = null, Ft.currentPopupAction && Ft.currentPopupAction.cancel(), Ft.currentPopupAction = this
                            }
                            async executeNotNull() {
                                const e = await this.execute();
                                return _(e, this.auth, "internal-error"), e
                            }
                            async onExecution() {
                                y(1 === this.filter.length, "Popup operations only handle one event");
                                const e = dt();
                                this.authWindow = await this.resolver._openPopup(this.auth, this.provider, this.filter[0], e), this.authWindow.associatedEvent = e, this.resolver._originValidation(this.auth).catch((e => {
                                    this.reject(e)
                                })), this.resolver._isIframeWebStorageSupported(this.auth, (e => {
                                    e || this.reject(f(this.auth, "web-storage-unsupported"))
                                })), this.pollUserCancellation()
                            }
                            get eventId() {
                                var e;
                                return (null === (e = this.authWindow) || void 0 === e ? void 0 : e.associatedEvent) || null
                            }
                            cancel() {
                                this.reject(f(this.auth, "cancelled-popup-request"))
                            }
                            cleanUp() {
                                this.authWindow && this.authWindow.close(), this.pollId && window.clearTimeout(this.pollId), this.authWindow = null, this.pollId = null, Ft.currentPopupAction = null
                            }
                            pollUserCancellation() {
                                const e = () => {
                                    var t, n;
                                    (null === (n = null === (t = this.authWindow) || void 0 === t ? void 0 : t.window) || void 0 === n ? void 0 : n.closed) ? this.pollId = window.setTimeout((() => {
                                        this.pollId = null, this.reject(f(this.auth, "popup-closed-by-user"))
                                    }), 2e3): this.pollId = window.setTimeout(e, Ut.get())
                                };
                                e()
                            }
                        }
                        Ft.currentPopupAction = null;
                        const Vt = new Map;
                        class jt extends Dt {
                            constructor(e, t, n = !1) {
                                super(e, ["signInViaRedirect", "linkViaRedirect", "reauthViaRedirect", "unknown"], t, void 0, n), this.eventId = null
                            }
                            async execute() {
                                let e = Vt.get(this.auth._key());
                                if (!e) {
                                    try {
                                        const t = await async function(e, t) {
                                            const n = Wt(t),
                                                r = Ht(e);
                                            if (!(await r._isAvailable())) return !1;
                                            const i = "true" === await r._get(n);
                                            return await r._remove(n), i
                                        }(this.resolver, this.auth) ? await super.execute() : null;
                                        e = () => Promise.resolve(t)
                                    } catch (t) {
                                        e = () => Promise.reject(t)
                                    }
                                    Vt.set(this.auth._key(), e)
                                }
                                return this.bypassAuthState || Vt.set(this.auth._key(), (() => Promise.resolve(null))), e()
                            }
                            async onAuthEvent(e) {
                                if ("signInViaRedirect" === e.type) return super.onAuthEvent(e);
                                if ("unknown" !== e.type) {
                                    if (e.eventId) {
                                        const t = await this.auth._redirectUserForId(e.eventId);
                                        if (t) return this.user = t, super.onAuthEvent(e);
                                        this.resolve(null)
                                    }
                                } else this.resolve(null)
                            }
                            async onExecution() {}
                            cleanUp() {}
                        }

                        function zt(e, t) {
                            Vt.set(e._key(), t)
                        }

                        function Ht(e) {
                            return T(e._redirectPersistence)
                        }

                        function Wt(e) {
                            return X("pendingRedirect", e.config.apiKey, e.name)
                        }
                        async function qt(e, t, n = !1) {
                            const r = de(e),
                                i = Pt(r, t),
                                s = new jt(r, i, n),
                                o = await s.execute();
                            return o && !n && (delete o.user._redirectEventId, await r._persistUserIfCurrent(o.user), await r._setRedirectUser(null, t)), o
                        }
                        class Kt {
                            constructor(e) {
                                this.auth = e, this.cachedEventUids = new Set, this.consumers = new Set, this.queuedRedirectEvent = null, this.hasHandledPotentialRedirect = !1, this.lastProcessedEventTime = Date.now()
                            }
                            registerConsumer(e) {
                                this.consumers.add(e), this.queuedRedirectEvent && this.isEventForConsumer(this.queuedRedirectEvent, e) && (this.sendToConsumer(this.queuedRedirectEvent, e), this.saveEventToCache(this.queuedRedirectEvent), this.queuedRedirectEvent = null)
                            }
                            unregisterConsumer(e) {
                                this.consumers.delete(e)
                            }
                            onEvent(e) {
                                if (this.hasEventBeenHandled(e)) return !1;
                                let t = !1;
                                return this.consumers.forEach((n => {
                                    this.isEventForConsumer(e, n) && (t = !0, this.sendToConsumer(e, n), this.saveEventToCache(e))
                                })), this.hasHandledPotentialRedirect || ! function(e) {
                                    switch (e.type) {
                                        case "signInViaRedirect":
                                        case "linkViaRedirect":
                                        case "reauthViaRedirect":
                                            return !0;
                                        case "unknown":
                                            return Gt(e);
                                        default:
                                            return !1
                                    }
                                }(e) || (this.hasHandledPotentialRedirect = !0, t || (this.queuedRedirectEvent = e, t = !0)), t
                            }
                            sendToConsumer(e, t) {
                                var n;
                                if (e.error && !Gt(e)) {
                                    const r = (null === (n = e.error.code) || void 0 === n ? void 0 : n.split("auth/")[1]) || "internal-error";
                                    t.onError(f(this.auth, r))
                                } else t.onAuthEvent(e)
                            }
                            isEventForConsumer(e, t) {
                                const n = null === t.eventId || !!e.eventId && e.eventId === t.eventId;
                                return t.filter.includes(e.type) && n
                            }
                            hasEventBeenHandled(e) {
                                return Date.now() - this.lastProcessedEventTime >= 6e5 && this.cachedEventUids.clear(), this.cachedEventUids.has($t(e))
                            }
                            saveEventToCache(e) {
                                this.cachedEventUids.add($t(e)), this.lastProcessedEventTime = Date.now()
                            }
                        }

                        function $t(e) {
                            return [e.type, e.eventId, e.sessionId, e.tenantId].filter((e => e)).join("-")
                        }

                        function Gt({
                            type: e,
                            error: t
                        }) {
                            return "unknown" === e && "auth/no-auth-event" === (null === t || void 0 === t ? void 0 : t.code)
                        }
                        const Jt = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
                            Bt = /^https?/;
                        async function Xt(e) {
                            if (e.config.emulator) return;
                            const {
                                authorizedDomains: t
                            } = await async function(e, t = {}) {
                                return C(e, "GET", "/v1/projects", t)
                            }(e);
                            for (const r of t) try {
                                if (Yt(r)) return
                            } catch (n) {}
                            p(e, "unauthorized-domain")
                        }

                        function Yt(e) {
                            const t = k(),
                                {
                                    protocol: n,
                                    hostname: r
                                } = new URL(t);
                            if (e.startsWith("chrome-extension://")) {
                                const i = new URL(e);
                                return "" === i.hostname && "" === r ? "chrome-extension:" === n && e.replace("chrome-extension://", "") === t.replace("chrome-extension://", "") : "chrome-extension:" === n && i.hostname === r
                            }
                            if (!Bt.test(n)) return !1;
                            if (Jt.test(e)) return r === e;
                            const i = e.replace(/\./g, "\\.");
                            return new RegExp("^(.+\\." + i + "|" + i + ")$", "i").test(r)
                        }
                        const Qt = new b(3e4, 6e4);

                        function Zt() {
                            const e = pt().___jsl;
                            if (null === e || void 0 === e ? void 0 : e.H)
                                for (const t of Object.keys(e.H))
                                    if (e.H[t].r = e.H[t].r || [], e.H[t].L = e.H[t].L || [], e.H[t].r = [...e.H[t].L], e.CP)
                                        for (let n = 0; n < e.CP.length; n++) e.CP[n] = null
                        }
                        let en = null;

                        function tn(e) {
                            return en = en || function(e) {
                                return new Promise(((t, n) => {
                                    var r, i, s;

                                    function o() {
                                        Zt(), gapi.load("gapi.iframes", {
                                            callback: () => {
                                                t(gapi.iframes.getContext())
                                            },
                                            ontimeout: () => {
                                                Zt(), n(f(e, "network-request-failed"))
                                            },
                                            timeout: Qt.get()
                                        })
                                    }
                                    if (null === (i = null === (r = pt().gapi) || void 0 === r ? void 0 : r.iframes) || void 0 === i ? void 0 : i.Iframe) t(gapi.iframes.getContext());
                                    else {
                                        if (!(null === (s = pt().gapi) || void 0 === s ? void 0 : s.load)) {
                                            const t = bt("iframefcb");
                                            return pt()[t] = () => {
                                                gapi.load ? o() : n(f(e, "network-request-failed"))
                                            }, Rt(`https://apis.google.com/js/api.js?onload=${t}`).catch((e => n(e)))
                                        }
                                        o()
                                    }
                                })).catch((e => {
                                    throw en = null, e
                                }))
                            }(e), en
                        }
                        const nn = new b(5e3, 15e3),
                            rn = {
                                style: {
                                    position: "absolute",
                                    top: "-100px",
                                    width: "1px",
                                    height: "1px"
                                },
                                "aria-hidden": "true",
                                tabindex: "-1"
                            },
                            sn = new Map([
                                ["identitytoolkit.googleapis.com", "p"],
                                ["staging-identitytoolkit.sandbox.googleapis.com", "s"],
                                ["test-identitytoolkit.sandbox.googleapis.com", "t"]
                            ]);

                        function on(e) {
                            const t = e.config;
                            _(t.authDomain, e, "auth-domain-config-required");
                            const n = t.emulator ? S(t, "emulator/auth/iframe") : `https://${e.config.authDomain}/__/auth/iframe`,
                                s = {
                                    apiKey: t.apiKey,
                                    appName: e.name,
                                    v: i.Jn
                                },
                                o = sn.get(e.config.apiHost);
                            o && (s.eid = o);
                            const a = e._getFrameworks();
                            return a.length && (s.fw = a.join(",")), `${n}?${(0,r.xO)(s).slice(1)}`
                        }
                        const an = {
                            location: "yes",
                            resizable: "yes",
                            statusbar: "yes",
                            toolbar: "no"
                        };
                        class cn {
                            constructor(e) {
                                this.window = e, this.associatedEvent = null
                            }
                            close() {
                                if (this.window) try {
                                    this.window.close()
                                } catch (e) {}
                            }
                        }

                        function un(e, t, n, i = 500, s = 600) {
                            const o = Math.max((window.screen.availHeight - s) / 2, 0).toString(),
                                a = Math.max((window.screen.availWidth - i) / 2, 0).toString();
                            let c = "";
                            const u = Object.assign(Object.assign({}, an), {
                                    width: i.toString(),
                                    height: s.toString(),
                                    top: o,
                                    left: a
                                }),
                                l = (0, r.z$)().toLowerCase();
                            n && (c = te(l) ? "_blank" : n), Z(l) && (t = t || "http://localhost", u.scrollbars = "yes");
                            const d = Object.entries(u).reduce(((e, [t, n]) => `${e}${t}=${n},`), "");
                            if (function(e = (0, r.z$)()) {
                                    var t;
                                    return oe(e) && !!(null === (t = window.navigator) || void 0 === t ? void 0 : t.standalone)
                                }(l) && "_self" !== c) return function(e, t) {
                                const n = document.createElement("a");
                                n.href = e, n.target = t;
                                const r = document.createEvent("MouseEvent");
                                r.initMouseEvent("click", !0, !0, window, 1, 0, 0, 0, 0, !1, !1, !1, !1, 1, null), n.dispatchEvent(r)
                            }(t || "", c), new cn(null);
                            const h = window.open(t || "", c, d);
                            _(h, e, "popup-blocked");
                            try {
                                h.focus()
                            } catch (p) {}
                            return new cn(h)
                        }
                        const ln = "__/auth/handler",
                            dn = "emulator/auth/handler";

                        function hn(e, t, n, s, o, a) {
                            _(e.config.authDomain, e, "auth-domain-config-required"), _(e.config.apiKey, e, "invalid-api-key");
                            const c = {
                                apiKey: e.config.apiKey,
                                appName: e.name,
                                authType: n,
                                redirectUrl: s,
                                v: i.Jn,
                                eventId: o
                            };
                            if (t instanceof ke) {
                                t.setDefaultLanguage(e.languageCode), c.providerId = t.providerId || "", (0, r.xb)(t.getCustomParameters()) || (c.customParameters = JSON.stringify(t.getCustomParameters()));
                                for (const [e, t] of Object.entries(a || {})) c[e] = t
                            }
                            if (t instanceof Ee) {
                                const e = t.getScopes().filter((e => "" !== e));
                                e.length > 0 && (c.scopes = e.join(","))
                            }
                            e.tenantId && (c.tid = e.tenantId);
                            const u = c;
                            for (const r of Object.keys(u)) void 0 === u[r] && delete u[r];
                            return `${function({config:e}){if(!e.emulator)return`
                            https: //${e.authDomain}/${ln}`;return S(e,dn)}(e)}?${(0,r.xO)(u).slice(1)}`}const pn="webStorageSupport";const fn=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ut,this._completeRedirectFn=qt,this._overrideRedirectResult=zt}async _openPopup(e,t,n,r){var i;y(null===(i=this.eventManagers[e._key()])||void 0===i?void 0:i.manager,"_initialize() not called before _openPopup()");return un(e,hn(e,t,n,k(),r),dt())}async _openRedirect(e,t,n,r){var i;return await this._originValidation(e),i=hn(e,t,n,k(),r),pt().location.href=i,new Promise((()=>{}))}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(y(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch((()=>{delete this.eventManagers[t]})),n}async initAndGetManager(e){const t=await async function(e){const t=await tn(e),n=pt().gapi;return _(n,e,"internal-error"),t.open({where:document.body,url:on(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:rn,dontclear:!0},(t=>new Promise((async(n,r)=>{await t.restyle({setHideOnLeave:!1});const i=f(e,"network-request-failed"),s=pt().setTimeout((()=>{r(i)}),nn.get());function o(){pt().clearTimeout(s),n(t)}t.ping(o).then(o,(()=>{r(i)}))}))))}(e),n=new Kt(e);return t.register("authEvent",(t=>{_(null===t||void 0===t?void 0:t.authEvent,e,"invalid-auth-event");return{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(pn,{type:pn},(n=>{var r;const i=null===(r=null===n||void 0===n?void 0:n[0])||void 0===r?void 0:r.webStorageSupport;void 0!==i&&t(!!i),p(e,"internal-error")}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Xt(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return ae()||ee()||oe()}};var mn,vn="@firebase/auth",gn="0.20.5";class _n{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),(null===(e=this.auth.currentUser)||void 0===e?void 0:e.uid)||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(e)}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged((t=>{var n;e((null===(n=t)||void 0===n?void 0:n.stsTokenManager.accessToken)||null)}));this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){_(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}function In(e=(0,i.Mq)()){const t=(0,i.qX)(e,"auth");return t.isInitialized()?t.getImmediate():function(e,t){const n=(0,i.qX)(e,"auth");if(n.isInitialized()){const e=n.getImmediate(),i=n.getOptions();if((0,r.vZ)(i,null!==t&&void 0!==t?t:{}))return e;p(e,"already-initialized")}return n.initialize({options:t})}(e,{popupRedirectResolver:fn,persistence:[Et,at,ut]})}mn="Browser",(0,i.Xd)(new a.wA("auth",((e,{options:t})=>{const n=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),{apiKey:i,authDomain:s}=n.options;return((e,n)=>{_(i&&!i.includes(":"),"invalid-api-key",{appName:e.name}),_(!(null===s||void 0===s?void 0:s.includes(":")),"argument-error",{appName:e.name});const r={apiKey:i,authDomain:s,clientPlatform:mn,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ce(mn)},o=new le(e,n,r);return function(e,t){const n=(null===t||void 0===t?void 0:t.persistence)||[],r=(Array.isArray(n)?n:[n]).map(T);(null===t||void 0===t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,null===t||void 0===t?void 0:t.popupRedirectResolver)}(o,t),o})(n,r)}),"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback(((e,t,n)=>{e.getProvider("auth-internal").initialize()}))),(0,i.Xd)(new a.wA("auth-internal",(e=>(e=>new _n(e))(de(e.getProvider("auth").getImmediate()))),"PRIVATE").setInstantiationMode("EXPLICIT")),(0,i.KN)(vn,gn,function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}(mn)),(0,i.KN)(vn,gn,"esm2017")}}]);