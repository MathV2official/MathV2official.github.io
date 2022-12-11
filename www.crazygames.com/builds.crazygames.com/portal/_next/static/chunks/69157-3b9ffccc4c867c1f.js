"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [69157], {
        55424: function(e, t, r) {
            var n = r(67294),
                s = r(56759),
                o = r(85893);
            class i extends n.Component {
                render() {
                    const {
                        alternatives: e,
                        children: t
                    } = this.props;
                    return (0, o.jsx)(s.Z.Provider, {
                        value: {
                            alternatives: e
                        },
                        children: t
                    })
                }
            }
            t.Z = i
        },
        56759: function(e, t, r) {
            const n = r(67294).createContext({
                alternatives: []
            });
            t.Z = n
        },
        28710: function(e, t, r) {
            var n = r(9008),
                s = r.n(n),
                o = (r(67294), r(63530)),
                i = r(13839),
                a = r(40480),
                c = r(85893);
            t.Z = e => {
                let {
                    title: t,
                    metaDescription: r,
                    canonical: n,
                    alternatives: l = [],
                    touchIcon: h,
                    children: p
                } = e;
                const d = h || "favicons/manifest-icon-2.png",
                    u = l.find((e => {
                        let {
                            locale: t
                        } = e;
                        return t === a.ZW
                    })),
                    j = (e, t, r) => (0, i.ZP)(e, {
                        w: t,
                        h: r,
                        fit: "crop",
                        crop: "entropy"
                    }),
                    f = "development" === o.Z.Instance.environment;
                return (0, c.jsxs)(s(), {
                    children: [(0, c.jsx)("title", {
                        children: `${f?"\ud83e\udd99 - ":""}${t}`
                    }), (0, c.jsx)("meta", {
                        httpEquiv: "Accept-CH",
                        content: "DPR"
                    }), (0, c.jsx)("meta", {
                        name: "description",
                        content: r
                    }), n && (0, c.jsx)("link", {
                        rel: "canonical",
                        href: n
                    }), l.map((e => {
                        let {
                            href: t,
                            locale: r
                        } = e;
                        const n = (0, a.xi)(r);
                        return (0, c.jsx)("link", {
                            rel: "alternate",
                            hrefLang: n,
                            href: t
                        }, n)
                    })), u && (0, c.jsx)("link", {
                        rel: "alternate",
                        href: u.href,
                        hrefLang: "x-default"
                    }), (0, c.jsx)("meta", {
                        name: "theme-color",
                        content: "#ffffff"
                    }), (0, c.jsx)("meta", {
                        name: "HandheldFriendly",
                        content: "true"
                    }), (0, c.jsx)("meta", {
                        name: "mobile-web-app-capable",
                        content: "yes"
                    }), (0, c.jsx)("meta", {
                        name: "apple-mobile-web-app-capable",
                        content: "yes"
                    }), (0, c.jsx)("meta", {
                        name: "apple-mobile-web-app-status-bar-style",
                        content: "default"
                    }), (0, c.jsx)("link", {
                        rel: "apple-touch-icon",
                        href: j(d, 120, 120)
                    }), (0, c.jsx)("link", {
                        rel: "apple-touch-icon",
                        sizes: "152x152",
                        href: j(d, 152, 152)
                    }), (0, c.jsx)("link", {
                        rel: "apple-touch-icon",
                        sizes: "167x167",
                        href: j(d, 167, 167)
                    }), (0, c.jsx)("link", {
                        rel: "apple-touch-icon",
                        sizes: "180x180",
                        href: j(d, 180, 180)
                    }), (0, c.jsx)("link", {
                        rel: "mask-icon",
                        href: (0, i.ZP)("favicons/safari-pinned-tab.svg"),
                        color: "#6842ff"
                    }), (0, c.jsx)("link", {
                        rel: "icon",
                        type: "image/png",
                        href: j("favicons/favicon-2-32x32.png", 32, 32),
                        sizes: "32x32"
                    }), (0, c.jsx)("link", {
                        rel: "icon",
                        type: "image/png",
                        href: j("favicons/favicon-2-16x16.png", 16, 16),
                        sizes: "16x16"
                    }), (0, c.jsx)("link", {
                        rel: "shortcut icon",
                        sizes: "196x196",
                        href: j("favicons/ms-icon-2-310x310.png", 228, 228)
                    }), (0, c.jsx)("meta", {
                        name: "msapplication-TileColor",
                        content: "#603cba"
                    }), (0, c.jsx)("meta", {
                        name: "msapplication-TileImage",
                        content: j(d, 144, 144)
                    }), p]
                })
            }
        },
        94704: function(e, t, r) {
            r.d(t, {
                Z: function() {
                    return H
                }
            });
            var n = r(59499),
                s = r(67294),
                o = r(67959),
                i = r(49501),
                a = r(41664),
                c = r.n(a),
                l = r(81719),
                h = r(93545);

            function p(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function d(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? p(Object(r), !0).forEach((function(t) {
                        (0, n.Z)(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : p(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }
            const u = (0, l.ZP)("div")((e => {
                    let {
                        theme: {
                            dimensions: t
                        }
                    } = e;
                    return {
                        height: `calc(100vh - ${t.header.height+t.footer.height}px)`,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }
                })),
                j = (0, l.ZP)("h1")((e => {
                    let {
                        theme: {
                            breakpoints: t
                        }
                    } = e;
                    return {
                        transform: "rotate(-3deg)",
                        fontSize: "6rem",
                        [t.down("h2")]: {
                            fontSize: "6rem"
                        }
                    }
                })),
                f = (0, l.ZP)("div")((e => {
                    let {
                        theme: t
                    } = e;
                    return {
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        "& a": d(d({}, (0, h.GC)()), {}, {
                            fontWeight: 400
                        }),
                        "& img": {
                            marginBottom: t.spacing(3)
                        }
                    }
                }));
            var x = r(87835),
                m = r(85893);

            function g(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function b(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? g(Object(r), !0).forEach((function(t) {
                        (0, n.Z)(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : g(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }
            var y = (0, x.Z)((e => {
                    let {
                        routeHelper: t
                    } = e;
                    const r = t.newPageLink(),
                        n = t.searchPageLink(),
                        s = t.contactPageLink();
                    return (0, m.jsxs)("h3", {
                        children: [(0, m.jsx)(c(), b(b({}, r), {}, {
                            passHref: !0,
                            children: (0, m.jsx)("a", {
                                children: (0, m.jsx)(i.cC, {
                                    id: "common.links.new"
                                })
                            })
                        })), (0, m.jsx)("span", {
                            children: " | "
                        }), (0, m.jsx)(c(), b(b({}, n), {}, {
                            passHref: !0,
                            children: (0, m.jsx)("a", {
                                children: (0, m.jsx)(i.cC, {
                                    id: "error.links.search"
                                })
                            })
                        })), (0, m.jsx)("span", {
                            children: " | "
                        }), (0, m.jsx)(c(), b(b({}, s), {}, {
                            passHref: !0,
                            children: (0, m.jsx)("a", {
                                children: (0, m.jsx)(i.cC, {
                                    id: "error.links.contact"
                                })
                            })
                        }))]
                    })
                })),
                O = r(13839);
            var v = () => (0, m.jsx)("img", {
                    src: (0, O.ZP)("crazygames/error.svg"),
                    style: {
                        width: "400px",
                        height: "auto"
                    },
                    alt: "Error"
                }),
                P = r(48266);

            function C(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function w(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? C(Object(r), !0).forEach((function(t) {
                        (0, n.Z)(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : C(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }
            var k = () => {
                const {
                    routeHelper: e
                } = s.useContext(P.Z), t = e.homePageLink();
                return (0, m.jsxs)(u, {
                    children: [(0, m.jsxs)(f, {
                        children: [(0, m.jsx)(j, {
                            children: (0, m.jsx)(i.cC, {
                                id: "error.404.title"
                            })
                        }), (0, m.jsx)("h2", {
                            children: (0, m.jsx)(i.cC, {
                                id: "error.404.problem"
                            })
                        }), (0, m.jsx)(v, {}), (0, m.jsxs)("h3", {
                            children: [(0, m.jsx)(i.cC, {
                                id: "error.404.mainSolution"
                            }), (0, m.jsx)(c(), w(w({}, t), {}, {
                                passHref: !0,
                                children: (0, m.jsx)("a", {
                                    children: (0, m.jsx)(i.cC, {
                                        id: "error.404.homeLinkText"
                                    })
                                })
                            }))]
                        }), (0, m.jsx)("h3", {
                            children: (0, m.jsx)(i.cC, {
                                id: "error.404.alternativeSolution"
                            })
                        })]
                    }), (0, m.jsx)(f, {
                        sx: {
                            mt: 5
                        },
                        children: (0, m.jsx)(y, {})
                    })]
                })
            };
            var E = () => (0, m.jsxs)(u, {
                    children: [(0, m.jsxs)(f, {
                        children: [(0, m.jsx)(j, {
                            children: (0, m.jsx)(i.cC, {
                                id: "error.500.title"
                            })
                        }), (0, m.jsx)("h5", {
                            children: (0, m.jsx)(i.cC, {
                                id: "error.500.problem"
                            })
                        }), (0, m.jsx)(v, {}), (0, m.jsxs)("h6", {
                            children: [(0, m.jsx)(i.cC, {
                                id: "error.500.mainSolution"
                            }), (0, m.jsx)(c(), {
                                href: "/games",
                                as: "/",
                                passHref: !0,
                                children: (0, m.jsx)("a", {
                                    children: (0, m.jsx)(i.cC, {
                                        id: "error.500.homeLinkText"
                                    })
                                })
                            })]
                        }), (0, m.jsx)("h6", {
                            children: (0, m.jsx)(i.cC, {
                                id: "error.500.alternativeSolution"
                            })
                        })]
                    }), (0, m.jsx)(f, {
                        sx: {
                            mt: 5
                        },
                        children: (0, m.jsx)(y, {})
                    })]
                }),
                S = r(26086),
                Z = r(63530),
                D = r(40183);
            var I = new class {
                    constructor() {
                        (0, n.Z)(this, "initialized", !1), (0, n.Z)(this, "loadPromise", null), (0, n.Z)(this, "loaded", !1)
                    }
                    async init() {
                        if (this.initialized) return;
                        this.initialized = !0, await this.loadSentry(), this.loaded = !0;
                        const e = {
                            dsn: Z.Z.Instance.data.sentry.client.dsn,
                            attachStacktrace: !0,
                            release: Z.Z.Instance.version,
                            allowUrls: [/_next/],
                            autoSessionTracking: !1,
                            ignoreErrors: [/NotAllowedError/],
                            beforeSend: (e, t) => {
                                const r = t && t.originalException;
                                return "string" === typeof r ? e : r && r.message && r.message.match(/Can't execute code from a freed script/) ? null : e
                            }
                        };
                        this.getSentry().init(e)
                    }
                    getSentry() {
                        const {
                            Sentry: e
                        } = window;
                        return e
                    }
                    captureError(e, t) {
                        if (!this.loaded) return;
                        const r = this.getSentry();
                        r.withScope((n => {
                            if (e && e.message && n.setFingerprint([e.message]), t) {
                                const {
                                    req: e,
                                    res: r,
                                    query: s,
                                    pathname: o,
                                    errorInfo: i
                                } = t;
                                r && r.statusCode && n.setExtra("statusCode", r.statusCode), n.setTag("query", s), n.setTag("pathname", o), i && Object.keys(i).forEach((e => {
                                    n.setTag(e, i[e])
                                }))
                            }
                            r.captureException(e)
                        }))
                    }
                    loadSentry() {
                        return this.loadPromise || (this.loadPromise = (0, D.Z)("https://browser.sentry-cdn.com/7.13.0/bundle.min.js", !0)), this.loadPromise
                    }
                },
                L = r(11163),
                z = r(54024);

            function T(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }
            var H = function(e) {
                class t extends s.Component {
                    static async getInitialProps(t) {
                        try {
                            const r = e.getInitialProps ? await e.getInitialProps(t) : {};
                            return r.statusCode && t.res && (t.res.statusCode = r.statusCode), r
                        } catch (r) {
                            let e = 500;
                            return console.error(r.message), r instanceof o.Z && (e = r.statusCode), t.res && (t.res.statusCode = e), I.captureError(r, t), {
                                statusCode: e
                            }
                        }
                    }
                    static getDerivedStateFromError(e) {
                        return {
                            hasError: !0
                        }
                    }
                    constructor(e) {
                        super(e), (0, n.Z)(this, "shouldLoadSentry", void 0);
                        const {
                            statusCode: t
                        } = e, r = t && t >= 400;
                        this.shouldLoadSentry = Math.random() < Z.Z.Instance.data.sentry.client.sampleRate, this.state = {
                            hasError: !!r
                        }
                    }
                    componentDidMount() {
                        this.shouldLoadSentry && I.init(), this.props.statusCode && z.TS.trackGAEvent({
                            eventCategory: "error-page",
                            eventAction: "error-page",
                            eventLabel: `${this.props.statusCode}`,
                            nonInteraction: !0
                        })
                    }
                    componentDidUpdate() {
                        const {
                            hasError: e
                        } = this.state;
                        this.props.statusCode ? this.props.statusCode < 400 ? e && this.setState({
                            hasError: !1
                        }) : e || (z.TS.trackGAEvent({
                            eventCategory: "error-page",
                            eventAction: "error-page",
                            eventLabel: `${this.props.statusCode}`,
                            nonInteraction: !0
                        }), this.setState({
                            hasError: !0
                        })) : e && this.setState({
                            hasError: !1
                        })
                    }
                    componentDidCatch(e, t) {
                        I.captureError(e, {
                            errorInfo: t
                        })
                    }
                    render() {
                        const {
                            statusCode: t,
                            router: r
                        } = this.props;
                        return this.hasError() ? r ? t >= 400 && t < 500 ? this.render404() : this.render500() : this.renderCouldNotRenderErrorPage() : (0, m.jsx)(e, function(e) {
                            for (var t = 1; t < arguments.length; t++) {
                                var r = null != arguments[t] ? arguments[t] : {};
                                t % 2 ? T(Object(r), !0).forEach((function(t) {
                                    (0, n.Z)(e, t, r[t])
                                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : T(Object(r)).forEach((function(t) {
                                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                                }))
                            }
                            return e
                        }({}, this.props))
                    }
                    render404() {
                        return (0, m.jsx)(S.Z, {
                            children: (0, m.jsx)(k, {})
                        })
                    }
                    render500() {
                        return (0, m.jsx)(S.Z, {
                            children: (0, m.jsx)(E, {})
                        })
                    }
                    renderCouldNotRenderErrorPage() {
                        return (0, m.jsx)(s.Fragment, {
                            children: (0, m.jsx)("article", {
                                children: (0, m.jsx)("main", {
                                    children: "An error has occured"
                                })
                            })
                        })
                    }
                    hasError() {
                        const {
                            hasError: e
                        } = this.state;
                        return e
                    }
                }
                return (0, L.withRouter)(t)
            }
        }
    }
]);