(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [74009], {
        8925: function(e, t, r) {
            "use strict";
            r.d(t, {
                Z: function() {
                    return n
                }
            });
            var s = r(67294);

            function n({
                controlled: e,
                default: t,
                name: r,
                state: n = "value"
            }) {
                const {
                    current: i
                } = s.useRef(void 0 !== e), [o, a] = s.useState(t);
                return [i ? e : o, s.useCallback((e => {
                    i || a(e)
                }), [])]
            }
        },
        86845: function(e, t, r) {
            "use strict";
            r.d(t, {
                Z: function() {
                    return h
                }
            });
            var s = r(67294),
                n = r(98171),
                i = r(81719),
                o = r(93545);
            const a = (0, i.ZP)("div")((e => {
                    let {
                        theme: {
                            palette: t,
                            breakpoints: r
                        }
                    } = e;
                    return {
                        "& > div": {
                            display: "inline-block",
                            "& > a, & > div": {
                                display: "inline-block"
                            },
                            "& > a": {
                                textDecoration: "none",
                                textTransform: "uppercase",
                                fontSize: o.CH.bodyXSmall,
                                fontWeight: "normal",
                                color: t.primary.contrastText,
                                [r.down("sm")]: {
                                    minHeight: 48,
                                    minWidth: 48
                                },
                                "&:hover": {
                                    cursor: "pointer",
                                    color: t.secondary.main
                                }
                            }
                        }
                    }
                })),
                l = (0, i.ZP)("div")((e => {
                    let {
                        theme: {
                            spacing: t
                        }
                    } = e;
                    return {
                        margin: t(0, 1),
                        fontSize: o.CH.bodyXSmall
                    }
                }));
            var c = r(85893);
            class d extends s.Component {
                render() {
                    const {
                        hierarchy: e,
                        currentTagName: t,
                        forceAddCurrentTag: r
                    } = this.props;
                    return (0, c.jsx)(a, {
                        children: (0, c.jsxs)(c.Fragment, {
                            children: [this.renderTagHierarchyBreadcrumbs(e), !e || r ? t : null]
                        })
                    })
                }
                renderTagHierarchyBreadcrumbs(e) {
                    const {
                        forceAddCurrentTag: t,
                        currentTagName: r
                    } = this.props;
                    return e ? e.map(((s, n) => {
                        const i = n === e.length - 1;
                        return i && t ? (0, c.jsx)("div", {
                            children: r
                        }, n) : this.renderTagHierarchyLink(s, n, i)
                    })) : null
                }
                renderBreadcrumbSeparator() {
                    return (0, c.jsx)(l, {
                        children: "\xbb"
                    })
                }
                renderTagHierarchyLink(e, t, r) {
                    return (0, c.jsxs)("div", {
                        children: [(0, c.jsx)(n.Z, {
                            slug: e.slug,
                            isCategory: e.isCategory,
                            children: (0, c.jsx)("a", {
                                children: e.name
                            })
                        }), !r && this.renderBreadcrumbSeparator()]
                    }, t)
                }
            }
            var h = d
        },
        83895: function(e, t, r) {
            "use strict";
            var s = r(4730),
                n = r(59499),
                i = r(53504),
                o = r(67294),
                a = r(6101),
                l = r(58346),
                c = r(26448),
                d = r(85893);
            const h = ["variant", "height", "label", "width"];

            function u(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(e);
                    t && (s = s.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, s)
                }
                return r
            }

            function p(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? u(Object(r), !0).forEach((function(t) {
                        (0, n.Z)(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : u(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }
            const g = o.forwardRef(((e, t) => (0, d.jsxs)(c.PR, p(p({
                    type: "button"
                }, e), {}, {
                    ref: t,
                    children: [e.children, (0, d.jsx)(a.Z, {
                        className: "IconExpandSelect"
                    }), (0, d.jsx)(l.Z, {
                        className: "IconCollapseSelect"
                    })]
                })))),
                m = o.forwardRef(((e, t) => (0, d.jsxs)(c.L4, p(p({
                    type: "button"
                }, e), {}, {
                    ref: t,
                    children: [e.children, (0, d.jsx)(a.Z, {
                        className: "IconExpandSelect"
                    }), (0, d.jsx)(l.Z, {
                        className: "IconCollapseSelect"
                    })]
                })))),
                b = o.forwardRef((function(e, t) {
                    return (0, d.jsx)(c.dK, p(p({}, e), {}, {
                        ref: t,
                        disablePortal: !1
                    }))
                }));
            t.ZP = e => {
                const {
                    variant: t,
                    height: r,
                    label: n,
                    width: o
                } = e, a = (0, s.Z)(e, h), l = p({
                    root: "outlined" === t ? g : m,
                    listbox: c.C,
                    popper: b
                }, a.slots);
                return (0, d.jsx)(i.Z, p(p({}, e), {}, {
                    renderValue: e => null === e ? n : e.label,
                    slots: l,
                    style: {
                        height: r,
                        width: o
                    },
                    children: e.children
                }))
            }
        },
        26448: function(e, t, r) {
            "use strict";
            r.d(t, {
                C: function() {
                    return b
                },
                L4: function() {
                    return m
                },
                PR: function() {
                    return g
                },
                dK: function() {
                    return x
                }
            });
            var s = r(59499),
                n = r(49349),
                i = r(80085),
                o = r(95032),
                a = r(62545),
                l = r(13264),
                c = r(83747),
                d = r(93545);

            function h(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(e);
                    t && (s = s.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, s)
                }
                return r
            }

            function u(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? h(Object(r), !0).forEach((function(t) {
                        (0, s.Z)(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : h(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }
            const p = e => {
                    let {
                        spacing: t
                    } = e;
                    return {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontFamily: "Nunito",
                        fontWeight: 700,
                        fontSize: 16,
                        padding: t(),
                        paddingLeft: t(2),
                        boxSizing: "border-box",
                        borderRadius: 8,
                        height: 40,
                        "& .IconExpandSelect": {
                            display: "block"
                        },
                        "& .IconCollapseSelect": {
                            display: "none"
                        },
                        minWidth: 190,
                        transitionProperty: "all",
                        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                        transitionDuration: "200ms",
                        "& svg": {
                            height: 18,
                            width: 18,
                            marginRight: t(.5),
                            marginLeft: t()
                        },
                        border: `2px solid ${c.D.black[60]}`
                    }
                },
                g = (0, l.Z)("button")((e => {
                    let {
                        theme: t
                    } = e;
                    return u(u({}, p(t)), (e => ({
                        background: "transparent",
                        color: c.D.white[100],
                        "&:hover": {
                            color: c.D.white[30],
                            cursor: "pointer",
                            borderColor: c.D.black[10]
                        },
                        "& svg": u(u({}, p(e)["& svg"]), {}, {
                            color: c.D.white[30]
                        }),
                        [`&.${n.Z.expanded}`]: {
                            "& .IconExpandSelect": {
                                display: "none"
                            },
                            "& .IconCollapseSelect": {
                                display: "block"
                            },
                            color: c.D.white[100],
                            borderColor: c.D.brand[100],
                            background: c.D.black[50]
                        }
                    }))(t))
                })),
                m = (0, l.Z)("button")((e => {
                    let {
                        theme: t
                    } = e;
                    return u(u({}, p(t)), {
                        background: c.D.black[60],
                        color: c.D.white[30],
                        "&:hover": {
                            background: c.D.black[50],
                            border: `2px solid ${c.D.black[50]}`,
                            cursor: "pointer"
                        }
                    })
                })),
                b = (0, l.Z)("ul")((e => {
                    let {
                        theme: {
                            spacing: t
                        }
                    } = e;
                    return u(u({
                        fontFamily: "Nunito",
                        fontSize: 16,
                        fontWeight: 700,
                        borderRadius: 8,
                        overflow: "auto",
                        minWidth: 190,
                        background: c.D.black[50],
                        padding: t(1, 0),
                        paddingBottom: 0
                    }, (0, d.no)(4)), {}, {
                        maxHeight: "min(60vh, 400px)",
                        "& li": {
                            padding: t(0, 2),
                            display: "block",
                            height: 40,
                            lineHeight: "40px",
                            "&:hover": {
                                cursor: "pointer",
                                background: c.D.black[40]
                            },
                            [`&.${i.Z.disabled}`]: {
                                color: c.D.white[10],
                                "&:hover": {
                                    cursor: "normal",
                                    background: c.D.black[50]
                                }
                            },
                            [`&.${o.Z.disabled}`]: {
                                color: c.D.white[10],
                                "&:hover": {
                                    cursor: "normal",
                                    background: c.D.black[50]
                                }
                            }
                        }
                    })
                })),
                x = (0, l.Z)(a.Z)((() => ({
                    zIndex: 1500
                })))
        },
        74071: function(e, t, r) {
            "use strict";
            var s = r(67294),
                n = r(91655),
                i = r(52261),
                o = r(62097),
                a = r(85893);
            t.Z = () => {
                const e = s.useContext(i.ZP).isDesktop,
                    {
                        dimensions: t,
                        spacing: r
                    } = (0, o.Z)(),
                    l = e ? t.tag.thumbWidth : t.tag.thumbWidthMobile;
                return (0, a.jsx)(n.Z, {
                    sx: {
                        m: .5,
                        borderRadius: r()
                    },
                    variant: "rectangular",
                    width: l,
                    height: t.tag.height
                })
            }
        },
        24869: function(e, t, r) {
            "use strict";
            var s = r(62097),
                n = (r(67294), r(13839)),
                i = r(98171),
                o = r(37267),
                a = r(85893);
            t.Z = e => {
                let {
                    tag: t,
                    isMobile: r
                } = e;
                const {
                    name: l,
                    slug: c,
                    thumbnail: d,
                    isCategory: h
                } = t, {
                    dimensions: u
                } = (0, s.Z)(), p = u.tag.imgWidth, g = (0, n.ZP)(d, {
                    w: p
                });
                return (0, a.jsx)(i.Z, {
                    slug: c,
                    isCategory: h,
                    children: (0, a.jsx)("a", {
                        children: (0, a.jsxs)(o.xP, {
                            isMobile: r,
                            children: [(0, a.jsx)("div", {
                                style: {
                                    height: "100%"
                                },
                                children: (0, a.jsx)("img", {
                                    src: g,
                                    alt: l,
                                    loading: "lazy",
                                    width: p,
                                    fetchpriority: "low"
                                })
                            }), (0, a.jsx)(o.KG, {
                                isMobile: r,
                                className: "labelContainer",
                                children: (0, a.jsx)("p", {
                                    children: l
                                })
                            })]
                        })
                    })
                })
            }
        },
        37267: function(e, t, r) {
            "use strict";
            r.d(t, {
                KG: function() {
                    return h
                },
                x5: function() {
                    return c
                },
                xP: function() {
                    return d
                }
            });
            var s = r(59499),
                n = r(81719),
                i = r(41796),
                o = r(93545);

            function a(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(e);
                    t && (s = s.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, s)
                }
                return r
            }

            function l(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? a(Object(r), !0).forEach((function(t) {
                        (0, s.Z)(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : a(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }
            const c = (0, n.ZP)("div", {
                    shouldForwardProp: e => "allowOverflow" !== e
                })((e => {
                    let {
                        theme: {
                            spacing: t
                        },
                        allowOverflow: r
                    } = e;
                    return l({
                        marginTop: t(2),
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        "& a": {
                            textDecoration: "none"
                        },
                        overflow: "hidden"
                    }, r && {
                        overflow: "initial"
                    })
                })),
                d = (0, n.ZP)("div", {
                    shouldForwardProp: e => "isMobile" !== e
                })((e => {
                    let {
                        theme: {
                            spacing: t,
                            palette: r,
                            dimensions: s
                        },
                        isMobile: n
                    } = e;
                    return l({
                        borderRadius: 6,
                        position: "relative",
                        width: s.tag.thumbWidth,
                        margin: t(.5),
                        height: s.tag.height,
                        backgroundColor: r.secondary.main,
                        color: r.secondary.contrastText,
                        transition: "background-color 0.2s ease-in",
                        display: "flex",
                        flexDirection: "row",
                        fontWeight: 700,
                        "&:hover": {
                            backgroundColor: (0, i._j)(r.secondary.dark, .5),
                            "& img": {
                                opacity: .9
                            }
                        },
                        "& img": {
                            height: s.tag.height,
                            width: s.tag.imgWidth,
                            objectFit: "cover",
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5
                        }
                    }, n && {
                        width: s.tag.thumbWidthMobile,
                        "& $labelContainer": {
                            width: s.tag.thumbWidthMobile - s.tag.imgWidth
                        }
                    })
                })),
                h = (0, n.ZP)("div", {
                    shouldForwardProp: e => "isMobile" !== e
                })((e => {
                    let {
                        theme: {
                            spacing: t,
                            dimensions: r
                        },
                        isMobile: s
                    } = e;
                    return {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: (s ? r.tag.thumbWidthMobile : r.tag.thumbWidth) - r.tag.imgWidth,
                        textAlign: "center",
                        padding: t(.5),
                        "& p": {
                            fontSize: o.CH.bodySmall,
                            whiteSpace: "normal",
                            width: "100%",
                            textAlign: "center",
                            marginBlockStart: 0,
                            marginBlockEnd: 0,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            lineHeight: 1.5
                        }
                    }
                }))
        },
        98171: function(e, t, r) {
            "use strict";
            var s = r(59499),
                n = r(67294),
                i = r(41664),
                o = r.n(i),
                a = r(48266),
                l = r(85893);

            function c(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(e);
                    t && (s = s.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, s)
                }
                return r
            }

            function d(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? c(Object(r), !0).forEach((function(t) {
                        (0, s.Z)(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : c(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }
            t.Z = e => {
                let {
                    slug: t,
                    isCategory: r,
                    children: s
                } = e;
                const {
                    routeHelper: i
                } = n.useContext(a.Z), c = i.tagOrCategoryPageDirectLink(t, !!r);
                return (0, l.jsx)(o(), d(d({}, c), {}, {
                    children: s
                }))
            }
        },
        87011: function(e, t, r) {
            "use strict";
            var s = r(59499),
                n = r(67294),
                i = r(97542),
                o = r(85893);

            function a(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(e);
                    t && (s = s.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, s)
                }
                return r
            }
            t.Z = function(e) {
                return t => {
                    const r = n.useContext(i.Z);
                    return (0, o.jsx)(e, function(e) {
                        for (var t = 1; t < arguments.length; t++) {
                            var r = null != arguments[t] ? arguments[t] : {};
                            t % 2 ? a(Object(r), !0).forEach((function(t) {
                                (0, s.Z)(e, t, r[t])
                            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : a(Object(r)).forEach((function(t) {
                                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                            }))
                        }
                        return e
                    }({
                        device: r
                    }, t))
                }
            }
        },
        90682: function(e, t, r) {
            "use strict";
            r.r(t), r.d(t, {
                default: function() {
                    return Me
                }
            });
            var s = r(67294),
                n = r(55424),
                i = r(26086),
                o = r(28710),
                a = r(59499),
                l = r(14412),
                c = r(49501),
                d = r(34172),
                h = r(87835),
                u = r(86845),
                p = r(49423),
                g = r(75672),
                m = r(47989),
                b = r(85893);
            var x = e => {
                    let {
                        tag: t
                    } = e;
                    const {
                        jsonLd: r,
                        jsonLdGames: s
                    } = t;
                    return (0, b.jsxs)(b.Fragment, {
                        children: [(0, b.jsx)("div", {
                            dangerouslySetInnerHTML: {
                                __html: r
                            }
                        }), (0, b.jsx)("div", {
                            dangerouslySetInnerHTML: {
                                __html: s
                            }
                        })]
                    })
                },
                f = r(81719),
                j = r(93545),
                y = r(83747);

            function v(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(e);
                    t && (s = s.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, s)
                }
                return r
            }

            function w(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? v(Object(r), !0).forEach((function(t) {
                        (0, a.Z)(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : v(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }
            const Z = (0, f.ZP)("div")((e => {
                    let {
                        theme: {
                            palette: t
                        }
                    } = e;
                    return {
                        textTransform: "uppercase",
                        display: "flex",
                        fontSize: j.CH.bodySmall,
                        fontWeight: 700,
                        opacity: .5,
                        "& a": {
                            color: t.secondary.contrastText,
                            textDecoration: "none",
                            "&:hover": {
                                cursor: "pointer",
                                color: t.secondary.main
                            }
                        }
                    }
                })),
                O = (0, f.ZP)("div", {
                    shouldForwardProp: e => "expanded" !== e && "needsShowMoreInSubtitle" !== e
                })((e => {
                    let {
                        theme: t,
                        expanded: r,
                        needsShowMoreInSubtitle: s
                    } = e;
                    return w(w({
                        margin: t.spacing(1, 0),
                        color: y.D.white[50],
                        "& a": (0, j.GC)()
                    }, j.Hq), {}, {
                        display: "-webkit-box",
                        WebkitLineClamp: r ? "unset" : 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        transition: "all 0.3s ease-out",
                        width: s && !r ? "calc(100% - 100px)" : void 0
                    })
                })),
                k = (0, f.ZP)("div", {
                    shouldForwardProp: e => "expanded" !== e
                })((e => {
                    let {
                        theme: {
                            spacing: t,
                            breakpoints: r
                        },
                        expanded: s
                    } = e;
                    return {
                        color: y.D.brand[70],
                        marginTop: s ? void 0 : t(),
                        paddingLeft: s ? void 0 : t(.5),
                        "&:hover": {
                            cursor: "pointer",
                            color: y.D.brand[80]
                        },
                        [r.down("md")]: {
                            marginBottom: s ? t(2) : void 0
                        }
                    }
                })),
                P = (0, f.ZP)("div")((() => w({}, j.Hq))),
                S = (0, f.ZP)("div", {
                    shouldForwardProp: e => "isDesktop" !== e
                })((e => {
                    let {
                        theme: {
                            spacing: t
                        },
                        isDesktop: r
                    } = e;
                    return {
                        paddingLeft: r ? t(1) : void 0
                    }
                }));
            var D = r(48266);

            function C(e, t) {
                return {
                    "@type": "Question",
                    name: e,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: t
                    }
                }
            }

            function T(e, t) {
                return `<ol>${e.map((e=>`<li><a href="${t.gamePageLink(e.slug,{https:e.https}).as}">${e.name}</a></li>`)).join("")}</ol>`
            }
            var R = e => {
                    let {
                        tag: t,
                        mobileGames: r,
                        topGames: n,
                        linkBoostedGames: i
                    } = e;
                    const {
                        i18n: o
                    } = (0, c.mV)(), {
                        routeHelper: a
                    } = s.useContext(D.Z), l = function(e, t, r, s, n, i) {
                        const o = i._({
                                id: "tag.faq.popular"
                            }, {
                                title: e.title
                            }),
                            a = i._({
                                id: "tag.faq.mobile"
                            }, {
                                title: e.title
                            }),
                            l = i._({
                                id: "tag.faq.whatAre"
                            }, {
                                title: e.title
                            }),
                            c = i._({
                                id: "tag.faq.whatAreSomeUnderrated"
                            }, {
                                title: e.title
                            }),
                            d = T(t, n),
                            h = T(r, n),
                            u = s.length > 0 ? T(s, n) : null,
                            p = e.intro,
                            g = C(o, d),
                            m = C(a, h),
                            b = p ? C(l, p) : null,
                            x = u ? C(c, u) : null,
                            f = [g, m];
                        return x && f.push(x), b && f.push(b), {
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            mainEntity: f
                        }
                    }(t, n, r, i, a, o), d = JSON.stringify(l);
                    return (0, b.jsx)("script", {
                        type: "application/ld+json",
                        dangerouslySetInnerHTML: {
                            __html: d
                        }
                    })
                },
                G = r(12550);
            var M = e => {
                    let {
                        tag: t,
                        topGames: r,
                        mobileGames: s,
                        linkBoostedGames: n
                    } = e;
                    const i = e => (0, b.jsx)("ol", {
                        children: e.map((e => (0, b.jsx)("li", {
                            children: (0, b.jsx)(G.Z, {
                                slug: e.slug,
                                https: e.https,
                                children: (0, b.jsx)("a", {
                                    children: e.name
                                })
                            })
                        }, e.slug)))
                    });
                    return (0, b.jsxs)(b.Fragment, {
                        children: [(0, b.jsx)("h2", {
                            children: (0, b.jsx)(c.cC, {
                                id: "tag.faq.faq"
                            })
                        }), (0, b.jsx)("h3", {
                            children: (0, b.jsx)(c.cC, {
                                id: "tag.faq.popular",
                                values: {
                                    title: t.title
                                }
                            })
                        }), i(r), (0, b.jsx)("h3", {
                            children: (0, b.jsx)(c.cC, {
                                id: "tag.faq.mobile",
                                values: {
                                    title: t.title
                                }
                            })
                        }), i(s), n.length > 0 && (0, b.jsxs)(b.Fragment, {
                            children: [(0, b.jsx)("h3", {
                                children: (0, b.jsx)(c.cC, {
                                    id: "tag.faq.whatAreSomeUnderrated",
                                    values: {
                                        title: t.title
                                    }
                                })
                            }), i(n)]
                        }), t.intro && (0, b.jsxs)(b.Fragment, {
                            children: [(0, b.jsx)("h3", {
                                children: (0, b.jsx)(c.cC, {
                                    id: "tag.faq.whatAre",
                                    values: {
                                        title: t.title
                                    }
                                })
                            }), (0, b.jsx)("div", {
                                dangerouslySetInnerHTML: {
                                    __html: t.intro
                                }
                            })]
                        })]
                    })
                },
                F = r(98171),
                E = r(43120),
                L = r(24869),
                z = r(98142),
                q = r(74071),
                W = r(20287),
                _ = r(17519),
                I = r(40181),
                B = r(72461);
            class H extends s.PureComponent {
                constructor(e) {
                    super(e), (0, a.Z)(this, "handleMouseEnter", (() => {
                        const {
                            pageSize: e
                        } = this.props, {
                            data: t
                        } = this.state;
                        t.length >= 2 * e || this.fetchMoreData()
                    })), (0, a.Z)(this, "fetchMoreData", (async () => {
                        const {
                            data: e
                        } = this.state, {
                            pageSize: t
                        } = this.props, r = e.length < d.$q, s = e.length / t;
                        if (r) {
                            const e = await this.fetchMoreDataFromApi(s + 1);
                            e && this.setState((t => ({
                                data: t.data.concat(e)
                            })))
                        }
                    })), (0, a.Z)(this, "fetchMoreDataFromApi", (async e => {
                        const {
                            pageSize: t
                        } = this.props, {
                            services: r
                        } = this.props;
                        return (await r.tagService.tagsForHomePage(e, t)).tags.items
                    })), this.state = {
                        data: e.tags,
                        hasFetchedSecondPage: !1
                    }
                }
                render() {
                    const {
                        tags: e,
                        shouldFetchData: t,
                        theme: {
                            dimensions: r
                        }
                    } = this.props;
                    if (e.length < 1) return null;
                    const s = r.tag.thumbWidth + 8,
                        {
                            deviceType: n
                        } = this.props;
                    return (0, b.jsx)(_.Z, {
                        onMouseEnter: t ? this.handleMouseEnter : void 0,
                        elementWidth: s,
                        requestDataThreshold: n.isMobile ? 2 : 4,
                        requestData: t ? this.fetchMoreData : void 0,
                        children: this.getSliderContent()
                    })
                }
                getSliderContent() {
                    const {
                        fillUpWithSkeletons: e,
                        pageSize: t
                    } = this.props, {
                        data: r
                    } = this.state, s = [], n = e ? 2 * t : 0, i = Math.max(n, r.length);
                    for (let o = 0; o < i; o += 2) {
                        const e = r[o],
                            t = r[o + 1];
                        void 0 !== e ? s.push(this.renderSlide(e, t)) : s.push(this.renderSkeleton(o))
                    }
                    return s
                }
                renderSlide(e, t) {
                    const {
                        fillUpWithSkeletons: r,
                        deviceType: s
                    } = this.props;
                    return (0, b.jsx)(z.kx, {
                        isDesktop: s.isDesktop,
                        children: (0, b.jsxs)(z.SJ, {
                            children: [(0, b.jsx)(L.Z, {
                                tag: e,
                                isMobile: !s.isDesktop
                            }), t ? (0, b.jsx)(L.Z, {
                                tag: t,
                                isMobile: !s.isDesktop
                            }) : r && (0, b.jsx)(q.Z, {})]
                        })
                    }, e.slug)
                }
                renderSkeleton(e) {
                    const {
                        deviceType: t
                    } = this.props;
                    return (0, b.jsx)(z.kx, {
                        isDesktop: t.isDesktop,
                        children: (0, b.jsxs)(z.SJ, {
                            children: [(0, b.jsx)(q.Z, {}), (0, b.jsx)(q.Z, {})]
                        })
                    }, e)
                }
            }
            var N = (0, B.Z)((0, W.Z)((0, I.Z)(H))),
                A = r(70754);
            const $ = (0, f.ZP)("div")((e => {
                let {
                    theme: {
                        spacing: t
                    }
                } = e;
                return {
                    justifyContent: "center",
                    display: "flex",
                    margin: t(2, 0),
                    width: "100%"
                }
            }));
            class U extends s.Component {
                constructor(e) {
                    super(e), (0, a.Z)(this, "rootRef", void 0), (0, a.Z)(this, "observer", void 0), (0, a.Z)(this, "callback", (e => {
                        let [t] = e;
                        const {
                            callbackWhenInView: r
                        } = this.props;
                        t.isIntersecting && (this.rootRef.current && this.observer && this.observer.unobserve(this.rootRef.current), this.setState({
                            showChildren: !0
                        }), r && r())
                    })), this.state = {
                        showChildren: !1
                    }, this.rootRef = s.createRef()
                }
                componentDidMount() {
                    this.observer = new window.IntersectionObserver(this.callback, {
                        root: null,
                        threshold: .1,
                        rootMargin: "200px 0px"
                    }), this.rootRef.current && this.observer.observe(this.rootRef.current)
                }
                componentWillUnmount() {
                    this.rootRef.current && this.observer && (this.observer.unobserve(this.rootRef.current), this.observer = null)
                }
                render() {
                    return this.state.showChildren ? this.props.children : this.renderPlaceholder()
                }
                renderPlaceholder() {
                    const {
                        renderPlaceholder: e
                    } = this.props;
                    return (0, b.jsx)($, {
                        ref: this.rootRef,
                        children: e ? e() : (0, b.jsx)(A.Z, {
                            size: 50
                        })
                    })
                }
            }
            var V = U,
                K = r(50645),
                J = r(4235),
                X = r(62097),
                Q = r(1733),
                Y = r(34386),
                ee = r(73927);
            var te = e => {
                    let {
                        games: t,
                        requestData: r
                    } = e;
                    const {
                        crazyAnalyticsService: n
                    } = s.useContext(Y.Z).services, i = 2 * Math.floor(t.length / 2), {
                        dimensions: o
                    } = (0, X.Z)(), a = o.gameThumb.width + 8, l = [];
                    for (let s = 0; s < i; s += 2) l.push((0, b.jsxs)(z.Sd, {
                        children: [t[s] && (0, b.jsx)(Q.Z, {
                            game: t[s],
                            onClickAction: () => {
                                n.gameClickedFromList(t)
                            },
                            isResponsive: !0,
                            imgResponsiveSizes: ee.D1
                        }), t[s + 1] && (0, b.jsx)(Q.Z, {
                            game: t[s + 1],
                            onClickAction: () => {
                                n.gameClickedFromList(t)
                            },
                            isResponsive: !0,
                            imgResponsiveSizes: ee.D1
                        })]
                    }, t[s].slug));
                    return (0, b.jsx)(z.R_, {
                        children: (0, b.jsx)(_.Z, {
                            elementWidth: a,
                            requestData: r,
                            requestDataThreshold: 2,
                            children: l
                        })
                    })
                },
                re = r(40480),
                se = r(77223),
                ne = r(52261),
                ie = r(77792);
            var oe = e => {
                    let {
                        games: t,
                        tag: r,
                        isMobile: n
                    } = e;
                    const [i, o] = s.useState([]), {
                        locale: a
                    } = s.useContext(J.Z), l = s.useContext(Y.Z).services, c = s.useContext(ne.ZP), d = async () => {
                        const e = {
                                page: Math.ceil((t.length + i.length) / 16) + 1,
                                size: 16
                            },
                            s = (0, re.Ld)(a),
                            n = (0, ie.yz)(c),
                            d = await l.gameService.topTagGames(r.slug[s], r.isCategory, n, e);
                        o(i.concat(d.games.data.items))
                    }, h = t.concat(i);
                    return n ? (0, b.jsx)(te, {
                        games: h,
                        requestData: d
                    }) : (0, b.jsx)(se.Z, {
                        games: h,
                        requestData: d
                    })
                },
                ae = r(53818),
                le = r(83417),
                ce = r(45670),
                de = r(87011),
                he = r(5152);
            const ue = r.n(he)()((() => r.e(40058).then(r.bind(r, 40058))), {
                    loadableGenerated: {
                        webpack: () => [40058]
                    }
                }),
                pe = s.memo((e => {
                    let {
                        games: t,
                        pageSize: r,
                        maxNoItems: n,
                        slidesToLoadEagerly: i,
                        tag: o,
                        slug: a
                    } = e;
                    const {
                        i18n: l
                    } = (0, c.mV)(), {
                        routeHelper: d
                    } = s.useContext(D.Z), h = l._({
                        id: "common.games.all"
                    }, {
                        title: o.title
                    }), u = d.tagOrCategoryPageDirectLink(o.slug, o.isCategory);
                    return (0, b.jsxs)(z.m$, {
                        sx: {
                            mt: 1
                        },
                        children: [(0, b.jsx)(le.Z, {
                            categorySet: {
                                slug: a,
                                tag: o
                            }
                        }), (0, b.jsx)(ue, {
                            allGamesLabel: h,
                            allGamesLinkData: u,
                            games: t,
                            slidesToLoadEagerly: i,
                            maxNoItems: n,
                            pageSize: r
                        })]
                    })
                }));
            var ge = pe,
                me = r(69925);
            var be = e => {
                    let {
                        size: t
                    } = e;
                    const {
                        dimensions: r,
                        spacing: s
                    } = (0, X.Z)();
                    return (0, b.jsx)("div", {
                        children: (0, b.jsx)("div", {
                            style: {
                                display: "flex",
                                justifyContent: "flex-start",
                                flexWrap: "wrap",
                                height: `calc(2 * (${r.tag.height}px + ${s(1)}))`,
                                overflow: "hidden"
                            },
                            children: (0, me.Z)(t).map((e => (0, b.jsx)(q.Z, {}, e)))
                        })
                    })
                },
                xe = r(98801),
                fe = r(11163),
                je = r.n(fe),
                ye = r(43144),
                ve = r(83895);
            var we = e => {
                    let {
                        urlGenerator: t
                    } = e;
                    const r = t(1, ye.BE),
                        n = t(1, ye.sc),
                        i = t(1, ye.Fi),
                        {
                            routeHelper: o
                        } = s.useContext(D.Z),
                        a = o && o.isMostPlayedSorting(),
                        l = o && o.isNewGamesSorting(),
                        d = () => a ? ye.BE : l ? ye.Fi : ye.sc;
                    return (0, b.jsxs)(ve.ZP, {
                        value: d(),
                        onChange: (e, t) => {
                            t === ye.sc && je().push(n.href, n.as), t === ye.Fi && je().push(i.href, i.as), t === ye.BE && je().push(r.href, r.as)
                        },
                        style: {
                            minWidth: 190
                        },
                        variant: "outlined",
                        children: [(0, b.jsx)(xe.Z, {
                            value: ye.sc,
                            disabled: d() === ye.sc,
                            children: (0, b.jsx)(c.cC, {
                                id: "common.links.top"
                            })
                        }), (0, b.jsx)(xe.Z, {
                            value: ye.Fi,
                            disabled: d() === ye.Fi,
                            children: (0, b.jsx)(c.cC, {
                                id: "common.links.new"
                            })
                        }), (0, b.jsx)(xe.Z, {
                            value: ye.BE,
                            disabled: d() === ye.BE,
                            children: (0, b.jsx)(c.cC, {
                                id: "common.links.mostPlayed"
                            })
                        })]
                    })
                },
                Ze = r(30120);
            class Oe extends s.Component {
                constructor(e) {
                    super(e), (0, a.Z)(this, "handleResize", (() => {
                        this.setState({
                            subtitleExpanded: !1
                        }, (() => {
                            const e = document.getElementById("subtitleContainer");
                            this.setState({
                                needsShowMoreInSubtitle: !!e && (null === e || void 0 === e ? void 0 : e.scrollHeight) > (null === e || void 0 === e ? void 0 : e.clientHeight)
                            })
                        }))
                    })), (0, a.Z)(this, "urlGenerator", ((e, t) => {
                        const {
                            tag: r,
                            routeHelper: s
                        } = this.props;
                        return s.tagOrCategoryPageLink(r.slug, r.isCategory, e, t)
                    })), this.state = {
                        needsShowMoreInSubtitle: !1,
                        subtitleExpanded: !1
                    }
                }
                componentDidMount() {
                    window.addEventListener("resize", this.handleResize), this.handleResize()
                }
                componentWillUnmount() {
                    window.removeEventListener("resize", this.handleResize)
                }
                componentDidUpdate(e) {
                    const {
                        tag: t
                    } = e, {
                        tag: r
                    } = this.props;
                    r.slug !== t.slug && this.handleResize()
                }
                render() {
                    const {
                        metaText: e,
                        tag: t,
                        deviceType: r
                    } = this.props, s = this.shouldDisplaySubTagRows(), n = this.isFirstPage();
                    return (0, b.jsxs)(S, {
                        isDesktop: r.isDesktop,
                        children: [(0, b.jsx)(x, {
                            tag: t
                        }), this.renderPageTitle(), n && (0, b.jsxs)(b.Fragment, {
                            children: [s && (0, b.jsxs)(g.Z, {
                                children: [this.renderDesktopRecommended(), this.renderSubRowTags(), this.renderPopularTagsCarousel()]
                            }), s && (0, b.jsxs)(m.Z, {
                                children: [this.renderMobileRecommended(), this.renderSubRowTags(), this.renderPopularTagsCarousel()]
                            })]
                        }), (0, b.jsx)("div", {
                            style: {
                                display: "flex"
                            },
                            children: this.renderGameGridContainer()
                        }), n && !s && this.renderPopularTagsCarousel(), n && this.shouldDisplayFooterTabs() && (0, b.jsx)(E.Z, {
                            maxHeightContent: 200,
                            label: (0, b.jsx)(u.Z, {
                                currentTagName: t.title,
                                hierarchy: t.hierarchy
                            }),
                            children: (0, b.jsxs)(b.Fragment, {
                                children: [this.renderFooterDescription(), this.renderFaq(), e]
                            })
                        })]
                    })
                }
                shouldRenderRowEagerly(e) {
                    return 3 >= e
                }
                shouldDisplayFooterTabs() {
                    const {
                        metaText: e,
                        tag: t
                    } = this.props;
                    return e || t.description || t.showFaq || t.shortDescription
                }
                shouldDisplaySubTagRows() {
                    const {
                        subRowTags: e,
                        sorting: t
                    } = this.props;
                    return ("default" === t || void 0 === t) && e && e.length > 1
                }
                renderSubRowTags() {
                    const {
                        subRowTags: e,
                        device: t
                    } = this.props;
                    return e ? e.map(((e, r) => {
                        const s = (0, ce.Z)(e.games, t),
                            n = this.shouldRenderRowEagerly(r + 1) ? 6 : 0,
                            {
                                tag: i,
                                slug: o
                            } = e;
                        return (0, b.jsx)(ge, {
                            games: s,
                            pageSize: s.length,
                            maxNoItems: s.length,
                            slidesToLoadEagerly: n,
                            tag: i,
                            slug: o
                        }, i.slug)
                    })) : null
                }
                renderPageTitle() {
                    const {
                        tag: e,
                        theme: {
                            spacing: t
                        }
                    } = this.props, {
                        subtitleExpanded: r,
                        needsShowMoreInSubtitle: s
                    } = this.state;
                    return (0, b.jsxs)("div", {
                        style: {
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "space-between",
                            paddingRight: t(4),
                            flexDirection: "column",
                            flexFlow: "row wrap",
                            paddingBottom: t()
                        },
                        children: [(0, b.jsxs)(Ze.Z, {
                            sx: {
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                px: 2,
                                pt: {
                                    xs: 2,
                                    h2: 4
                                },
                                maxWidth: {
                                    md: "calc(100% - 190px)"
                                }
                            },
                            children: [(0, b.jsx)(Z, {
                                children: this.renderBreadcrumbs()
                            }), (0, b.jsx)("h1", {
                                children: e.title
                            }), e.shortDescription && (0, b.jsxs)("div", {
                                style: {
                                    display: "flex",
                                    flexWrap: "wrap"
                                },
                                children: [(0, b.jsx)(O, {
                                    id: "subtitleContainer",
                                    dangerouslySetInnerHTML: {
                                        __html: e.shortDescription
                                    },
                                    expanded: r,
                                    needsShowMoreInSubtitle: s
                                }), s && !r && (0, b.jsx)(k, {
                                    expanded: !1,
                                    onClick: () => this.setState({
                                        subtitleExpanded: !0
                                    }),
                                    children: (0, b.jsx)(c.cC, {
                                        id: "common.showMore"
                                    })
                                }), s && r && (0, b.jsx)(k, {
                                    expanded: !0,
                                    onClick: () => this.setState({
                                        subtitleExpanded: !1
                                    }),
                                    children: (0, b.jsx)(c.cC, {
                                        id: "common.showLess"
                                    })
                                })]
                            })]
                        }), (0, b.jsx)(Ze.Z, {
                            sx: {
                                pl: {
                                    xs: 2,
                                    md: 0
                                },
                                mb: 1
                            },
                            children: (0, b.jsx)(we, {
                                urlGenerator: this.urlGenerator
                            })
                        })]
                    })
                }
                renderDesktopRecommended() {
                    const {
                        topGames: e,
                        games: t,
                        tag: r,
                        sorting: s,
                        device: n
                    } = this.props, i = (0, ce.Z)(t, n);
                    let o;
                    return o = "default" === s || void 0 === s ? i.items.slice(0, 30) : e && (0, ce.Z)(e, n) || i.items.slice(0, 30), (0, b.jsx)(oe, {
                        games: o,
                        tag: r,
                        isMobile: !1
                    })
                }
                renderMobileRecommended() {
                    const {
                        topGames: e,
                        games: t,
                        tag: r,
                        sorting: s,
                        device: n
                    } = this.props, i = (0, ce.Z)(t, n);
                    let o;
                    return o = "default" === s || void 0 === s ? i.items.slice(0, 30) : e && (0, ce.Z)(e, n) || i.items.slice(0, 30), (0, b.jsx)(oe, {
                        games: o,
                        tag: r,
                        isMobile: !0
                    })
                }
                renderBreadcrumbs() {
                    const {
                        tag: e,
                        theme: {
                            spacing: t
                        }
                    } = this.props, {
                        hierarchy: r
                    } = e;
                    return r.map(((e, n) => (0, b.jsxs)(s.Fragment, {
                        children: [n !== r.length - 1 && (0, b.jsx)("div", {
                            children: (0, b.jsx)(F.Z, {
                                slug: e.slug,
                                isCategory: e.isCategory,
                                children: (0, b.jsx)("a", {
                                    children: e.name
                                })
                            })
                        }, n), n < r.length - 2 && (0, b.jsx)("div", {
                            style: {
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingRight: t(.5),
                                paddingLeft: t(.5)
                            },
                            children: "\xbb"
                        })]
                    }, n)))
                }
                renderFaq() {
                    const {
                        tag: e,
                        device: t
                    } = this.props;
                    if (!e.showFaq) return null;
                    const {
                        topGames: r,
                        topMobileGames: s
                    } = this.props, n = r && (0, ce.Z)(r, t);
                    if (!n || !s) return null;
                    const i = s.slice(0, 5),
                        o = n.slice(0, 10),
                        a = this.props.linkBoostedGames || [];
                    return (0, b.jsxs)(b.Fragment, {
                        children: [(0, b.jsx)(R, {
                            tag: e,
                            mobileGames: i,
                            topGames: o,
                            linkBoostedGames: a
                        }), (0, b.jsx)(M, {
                            tag: e,
                            mobileGames: i,
                            topGames: o,
                            linkBoostedGames: a
                        }), (0, b.jsx)(l.Z, {
                            sx: {
                                my: 1,
                                mx: 0
                            }
                        })]
                    })
                }
                isFirstPage() {
                    return 1 === this.props.page
                }
                renderFooterDescription() {
                    const {
                        tag: e
                    } = this.props, {
                        description: t,
                        showFaq: r,
                        intro: s,
                        title: n
                    } = e;
                    return t ? (0, b.jsxs)(b.Fragment, {
                        children: [(0, b.jsx)(P, {
                            dangerouslySetInnerHTML: {
                                __html: t
                            }
                        }), !r && s && (0, b.jsxs)(b.Fragment, {
                            children: [(0, b.jsx)("h3", {
                                children: (0, b.jsx)(c.cC, {
                                    id: "tag.faq.whatAre",
                                    values: {
                                        title: n
                                    }
                                })
                            }), (0, b.jsx)(P, {
                                dangerouslySetInnerHTML: {
                                    __html: s
                                }
                            })]
                        }), (0, b.jsx)(l.Z, {
                            sx: {
                                my: 1,
                                mx: 0
                            }
                        })]
                    }) : null
                }
                renderPopularTagsCarousel() {
                    const {
                        tag: e,
                        theme: {
                            spacing: t
                        }
                    } = this.props, {
                        relatedTags: r
                    } = e;
                    return !r || r.length < 6 ? null : (0, b.jsxs)(z.Zb, {
                        children: [(0, b.jsx)(le.Z, {
                            label: (0, b.jsx)(c.cC, {
                                id: "carousels.popularTags"
                            })
                        }), (0, b.jsx)(V, {
                            renderPlaceholder: () => (0, b.jsx)("div", {
                                style: {
                                    paddingLeft: t(2),
                                    paddingRight: t(2)
                                },
                                children: (0, b.jsx)(be, {
                                    size: d.rF
                                })
                            }),
                            children: (0, b.jsx)(N, {
                                tags: r,
                                pageSize: d.rF
                            }, e.slug.en_US)
                        })]
                    })
                }
                renderGameGridContainer() {
                    var e;
                    const {
                        games: t,
                        device: r,
                        theme: {
                            spacing: s
                        }
                    } = this.props, n = (0, ce.Z)(t, r).items.concat((null === (e = t.desktop) || void 0 === e ? void 0 : e.items) || []);
                    return (0, b.jsxs)("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%"
                        },
                        children: [(0, b.jsxs)("div", {
                            style: {
                                width: "100%",
                                padding: s(2)
                            },
                            children: [(0, b.jsx)(g.Z, {
                                children: (0, b.jsx)(K.Z, {
                                    games: t.data.items,
                                    justifyContent: "center",
                                    slidesToLoadEagerly: d.$V,
                                    customStyles: {
                                        width: "100%"
                                    },
                                    isResponsive: !0,
                                    imgResponsiveSizes: ee.L,
                                    isResponsiveGrid: !0,
                                    sx: ee.Dx
                                })
                            }), (0, b.jsx)(m.Z, {
                                children: (0, b.jsx)(K.Z, {
                                    games: n,
                                    justifyContent: "center",
                                    slidesToLoadEagerly: d.nY,
                                    isResponsive: !0,
                                    imgResponsiveSizes: ee.L,
                                    isResponsiveGrid: !0,
                                    sx: ee.Dx
                                })
                            })]
                        }), this.renderPagination()]
                    })
                }
                renderPagination() {
                    const {
                        games: e,
                        device: t
                    } = this.props, r = (0, ce.Z)(e, t);
                    return (0, b.jsx)(p.Z, {
                        games: r,
                        urlGenerator: this.urlGenerator,
                        pageLimit: ae.nS
                    })
                }
            }
            var ke = (0, h.Z)((0, B.Z)((0, I.Z)((0, de.Z)(Oe)))),
                Pe = r(74167),
                Se = r(6778),
                De = r(67959),
                Ce = r(34779),
                Te = r(10041),
                Re = r(94704);
            class Ge extends s.Component {
                static async getInitialProps(e) {
                    var t;
                    const {
                        pageService: r
                    } = (0, Se.b)(e), {
                        deviceType: s
                    } = (0, ie.mO)(e), n = s.isMobile, i = (0, ie.yz)(s), o = e.query && e.query[ye.kK] || "tag", a = e.query && e.query[ye.pu], l = e.query && e.query[ye.Y7] || "default", c = Number(e.query && e.query[ye.Fh] || 1), d = n ? ae.Zj : ae.U, h = {
                        page: c,
                        size: Number(e.query && e.query[ye.AB] || d)
                    }, u = s.isTablet ? ae.JV : ae.mZ, p = s.isDesktop ? ae.wl : u, g = ae.QF, m = ae.N9, b = n ? ae.mk : ae.$i, x = await r.tagPage(o, a, h, p, u, m, g, i, b, l), {
                        tag: f,
                        games: j,
                        topGames: y,
                        topMobileGames: v,
                        newGames: w,
                        subRowTags: Z,
                        linkBoostedGames: O
                    } = x;
                    if (0 === j.data.items.length && 0 === ((null === (t = j.desktop) || void 0 === t ? void 0 : t.items.length) || 0)) throw new De.Z(404, "No games found");
                    return {
                        games: j,
                        subRowTags: Z,
                        tag: f,
                        topGames: y,
                        topMobileGames: v,
                        newGames: w,
                        sorting: l,
                        page: c,
                        linkBoostedGames: O
                    }
                }
                render() {
                    const {
                        i18n: e,
                        games: t,
                        tag: r,
                        subRowTags: s,
                        topGames: a,
                        topMobileGames: l,
                        newGames: c,
                        routeHelper: d,
                        page: h,
                        sorting: u,
                        linkBoostedGames: p
                    } = this.props, g = {
                        total: t.data.total,
                        game1: (t.data.items[0] || {
                            name: ""
                        }).name,
                        game2: (t.data.items[1] || {
                            name: ""
                        }).name,
                        game3: (t.data.items[2] || {
                            name: ""
                        }).name,
                        newestGame: (c[0] || {
                            name: ""
                        }).name,
                        start: (t.data.pagination.page - 1) * t.data.pagination.size + 1,
                        end: Math.min(t.data.pagination.page * t.data.pagination.size, t.data.total),
                        title: r.title.toLowerCase()
                    }, m = r.metaDescription ? r.metaDescription : e._({
                        id: "tag.head.metaDescription"
                    }, g), x = r.metaTitle ? r.metaTitle : e._({
                        id: "tag.head.title"
                    }, {
                        title: r.title,
                        pageNumber: h
                    }), f = d.tageOrCategoryPageAlternativeLinks(r.slug, r.isCategory, h), j = d.tagOrCategoryPageCanonical(r.slug, r.isCategory, h), y = this.facebookOGCover();
                    return (0, b.jsxs)(b.Fragment, {
                        children: [(0, b.jsx)(o.Z, {
                            canonical: j,
                            title: x,
                            metaDescription: m,
                            alternatives: f
                        }), y && (0, b.jsx)(Ce.Z, {
                            canonical: j,
                            title: x,
                            description: m,
                            imageUrl: y
                        }), (0, b.jsx)(n.Z, {
                            alternatives: f,
                            children: (0, b.jsx)(i.Z, {
                                children: (0, b.jsx)(ke, {
                                    games: t,
                                    subRowTags: s,
                                    tag: r,
                                    topGames: a,
                                    topMobileGames: l,
                                    page: h,
                                    metaText: m,
                                    sorting: u,
                                    linkBoostedGames: p
                                })
                            })
                        })]
                    })
                }
                facebookOGCover() {
                    const {
                        games: e
                    } = this.props;
                    return 0 === e.data.items.length ? e.desktop && 0 !== e.desktop.items.length ? e.desktop.items[0].cover : null : e.data.items[0].cover
                }
            }
            var Me = (0, Te.Z)((0, Pe.Z)("tag", "carousels")((0, Re.Z)(Ge)))
        },
        17679: function(e, t, r) {
            (window.__NEXT_P = window.__NEXT_P || []).push(["/tag", function() {
                return r(90682)
            }])
        }
    },
    function(e) {
        e.O(0, [58254, 77782, 10984, 70690, 37164, 69157, 47638, 25151, 57625, 49774, 92888, 40179], (function() {
            return t = 17679, e(e.s = t);
            var t
        }));
        var t = e.O();
        _N_E = t
    }
]);