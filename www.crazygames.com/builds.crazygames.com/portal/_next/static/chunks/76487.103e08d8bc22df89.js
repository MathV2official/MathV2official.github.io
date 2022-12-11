"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [76487], {
        76487: function(e, t, r) {
            r.r(t);
            var o = r(59499),
                n = r(67294),
                i = r(30120),
                s = r(87835),
                a = r(98676),
                l = r(13839),
                c = r(7611),
                p = r(49501),
                h = r(69496),
                d = r.n(h),
                u = r(72238),
                f = r(20287),
                g = r(11163),
                b = r.n(g),
                m = r(83747),
                w = r(49597),
                O = r(85893);

            function y(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(e);
                    t && (o = o.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, o)
                }
                return r
            }

            function j(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? y(Object(r), !0).forEach((function(t) {
                        (0, o.Z)(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : y(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }
            const P = n.forwardRef(((e, t) => (0, O.jsx)(w.HT, j(j({}, e), {}, {
                ref: t
            }))));
            class v extends n.Component {
                constructor(e) {
                    super(e), (0, o.Z)(this, "searchPromise", void 0), (0, o.Z)(this, "search", d()(this.searchUnbounced, 500, {
                        leading: !0
                    })), (0, o.Z)(this, "handleWindowScroll", (() => {
                        this.state.open && this.setClosed()
                    })), (0, o.Z)(this, "onInputChange", ((e, t) => {
                        "click" !== e.type && this.setState({
                            input: t
                        }, (() => this.search(t))), this.setState({
                            open: t.length >= 2
                        })
                    })), (0, o.Z)(this, "filterOptions", (e => e)), (0, o.Z)(this, "getOptionLabel", (e => e.value)), (0, o.Z)(this, "onChange", ((e, t, r) => {
                        const {
                            routeHelper: o
                        } = this.props;
                        if ("createOption" === r) {
                            const e = o.searchPageLink(this.state.input),
                                {
                                    href: t,
                                    as: r
                                } = e,
                                n = o.toRelativeLink(t),
                                i = o.toRelativeLink(r);
                            b().push(n, i)
                        }
                        if ("selectOption" === r) {
                            this.setState({
                                input: "",
                                open: !1,
                                results: []
                            });
                            const {
                                sameProtocol: e,
                                linkData: r
                            } = t, {
                                href: n,
                                as: i
                            } = r;
                            if (e) {
                                const e = o.toRelativeLink(n),
                                    t = o.toRelativeLink(i);
                                b().push(e, t).then((() => {
                                    window.scrollTo(0, 0), window.setTimeout((() => {
                                        window.scrollTo(0, 0)
                                    }), 500)
                                }))
                            } else window.location.href = i
                        }
                    })), (0, o.Z)(this, "renderOption", ((e, t) => {
                        const {
                            label: r,
                            thumbnail: o,
                            value: n
                        } = t;
                        return (0, O.jsx)("li", j(j({}, e), {}, {
                            children: (0, O.jsxs)("div", {
                                style: {
                                    display: "flex",
                                    flexWrap: "nowrap",
                                    alignItems: "center",
                                    color: m.D.white[100]
                                },
                                children: [(0, O.jsx)(i.Z, {
                                    sx: {
                                        display: "flex",
                                        height: {
                                            xs: 40,
                                            lg: "none"
                                        },
                                        "& img": {
                                            width: 49,
                                            height: 40,
                                            objectFit: "cover"
                                        }
                                    },
                                    children: o && (0, O.jsx)("img", {
                                        src: (0, l.ZP)(o, {
                                            h: 30
                                        }),
                                        alt: n
                                    })
                                }), (0, O.jsx)(a.Uh, {
                                    children: r
                                })]
                            })
                        }))
                    })), (0, o.Z)(this, "searchFinished", ((e, t) => {
                        this.state.input === e && this.setState({
                            loading: !1,
                            results: t
                        })
                    })), (0, o.Z)(this, "setClosed", (() => {
                        this.setState({
                            open: !1,
                            input: "",
                            results: []
                        })
                    })), this.state = {
                        input: "",
                        loading: !1,
                        open: !1,
                        results: []
                    }, this.searchPromise = null
                }
                componentDidMount() {
                    window.addEventListener("scroll", this.handleWindowScroll, {
                        passive: !0
                    })
                }
                componentWillUnmount() {
                    window.removeEventListener("scroll", this.handleWindowScroll), this.searchPromise && this.searchPromise.cancel()
                }
                render() {
                    const {
                        id: e,
                        i18n: t
                    } = this.props, {
                        open: r,
                        loading: o,
                        results: n,
                        input: i
                    } = this.state, s = t._({
                        id: "common.header.search.placeholder"
                    }), l = t._({
                        id: "common.header.search.noResults"
                    }), c = `${t._({id:"common.header.search.loading"})}...`;
                    return (0, O.jsx)(a.Mx, {
                        freeSolo: !0,
                        forcePopupIcon: !0,
                        id: e,
                        open: r,
                        onClose: this.setClosed,
                        openOnFocus: !1,
                        options: n,
                        loading: o,
                        loadingText: c,
                        onInputChange: this.onInputChange,
                        filterOptions: this.filterOptions,
                        clearIcon: null,
                        disablePortal: !0,
                        popupIcon: (0, O.jsx)(u.Z, {
                            searchString: i
                        }),
                        noOptionsText: l,
                        inputValue: i,
                        renderInput: e => (0, O.jsx)(P, j(j({}, e.InputProps), {}, {
                            placeholder: s,
                            value: e.inputProps.value,
                            slotProps: {
                                input: e.inputProps
                            }
                        })),
                        renderOption: this.renderOption,
                        getOptionLabel: this.getOptionLabel,
                        onChange: this.onChange,
                        value: null
                    })
                }
                async searchUnbounced(e) {
                    if (this.setState({
                            loading: !0
                        }), e.length < 2) this.searchFinished(e, []);
                    else try {
                        const t = this.getGameService().search(e, this.getLimit());
                        this.searchPromise = t;
                        const {
                            result: r
                        } = await t.promise, {
                            routeHelper: o
                        } = this.props, n = "https:" === window.location.protocol, i = o.isOnLocalhost(), s = n || i, a = r.map((e => "game" === e.recordType ? this.gameToSearchRow(e, n, i) : this.tagToSearchRow(e, n, i))), l = o.searchPageLink(e), c = {
                            label: (0, O.jsx)(p.cC, {
                                id: "common.header.search.searchAll"
                            }),
                            value: e,
                            thumbnail: null,
                            linkData: l,
                            sameProtocol: s
                        }, h = [...a, c];
                        this.searchFinished(e, h)
                    } catch (t) {
                        if (!(t instanceof c.Z)) throw t;
                        return
                    }
                }
                getGameService() {
                    return this.props.services.gameService
                }
                getLimit() {
                    return 10
                }
                gameToSearchRow(e, t, r) {
                    const {
                        routeHelper: o
                    } = this.props, n = e.https === t || r, i = o.gamePageLink(e.slug, {
                        https: e.https
                    });
                    return {
                        label: (0, O.jsx)(a.Uh, {
                            children: e.name
                        }),
                        value: e.slug,
                        thumbnail: e.cover,
                        linkData: i,
                        sameProtocol: n
                    }
                }
                tagToSearchRow(e, t, r) {
                    const {
                        routeHelper: o
                    } = this.props, n = t || r, i = o.tagOrCategoryPageDirectLink(e.slug, e.isCategory);
                    return {
                        label: (0, O.jsxs)(O.Fragment, {
                            children: [(0, O.jsx)(a.Uh, {
                                style: {
                                    display: "inline"
                                },
                                children: e.title
                            }), " ", (0, O.jsxs)("div", {
                                style: {
                                    display: "inline",
                                    fontWeight: 400
                                },
                                children: ["(", e.totalGames, ")"]
                            })]
                        }),
                        value: e.slug,
                        thumbnail: e.thumbnail,
                        linkData: i,
                        sameProtocol: n
                    }
                }
            }
            t.default = (0, f.Z)((0, s.Z)((0, p.GV)()(v)))
        },
        72238: function(e, t, r) {
            var o = r(59499),
                n = r(67294),
                i = r(41664),
                s = r.n(i),
                a = r(98676),
                l = r(48266),
                c = r(87844),
                p = r(49501),
                h = r(85893);

            function d(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(e);
                    t && (o = o.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, o)
                }
                return r
            }

            function u(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? d(Object(r), !0).forEach((function(t) {
                        (0, o.Z)(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : d(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }
            t.Z = e => {
                let {
                    disableLink: t,
                    searchString: r
                } = e;
                const {
                    routeHelper: o
                } = n.useContext(l.Z), i = o.searchPageLink(r), {
                    i18n: d
                } = (0, p.mV)(), f = () => (0, h.jsx)(a.hp, {
                    onMouseDown: e => {
                        e.stopPropagation(), e.preventDefault()
                    },
                    children: (0, h.jsx)(c.Z, {
                        size: "small"
                    })
                });
                return t ? (0, h.jsx)(f, {}) : (0, h.jsx)(s(), u(u({
                    prefetch: !1
                }, i), {}, {
                    passHref: !0,
                    children: (0, h.jsx)("a", {
                        "aria-label": d._({
                            id: "common.header.search.placeholder"
                        }),
                        children: (0, h.jsx)(f, {})
                    })
                }))
            }
        },
        98676: function(e, t, r) {
            r.d(t, {
                Mx: function() {
                    return c
                },
                Uh: function() {
                    return h
                },
                hp: function() {
                    return p
                }
            });
            var o = r(81719),
                n = r(3103),
                i = r(97346),
                s = r(23618),
                a = r(83747),
                l = r(93545);
            const c = (0, o.ZP)(n.Z, {
                    shouldForwardProp: e => "open" !== e
                })((e => {
                    let {
                        theme: t,
                        open: r
                    } = e;
                    const {
                        palette: o,
                        spacing: n,
                        breakpoints: c
                    } = t, p = "460px", h = c.up("sm"), d = c.only("md"), u = c.down("xl"), f = c.up("lg");
                    return {
                        [`&.${i.Z.root}`]: {
                            borderRadius: 30,
                            fill: a.D.white[50],
                            height: 40,
                            position: "relative",
                            paddingTop: 7,
                            [c.down(610)]: {
                                display: "none"
                            },
                            [h]: {
                                fontSize: l.CH.bodySmall,
                                outline: 0,
                                paddingTop: n()
                            },
                            [d]: {
                                width: p
                            },
                            [u]: {
                                fontSize: l.CH.body,
                                width: p
                            },
                            [f]: {
                                width: p,
                                fontSize: l.CH.body
                            },
                            [c.down("h2")]: {
                                fontSize: l.CH.bodySmall
                            },
                            [c.up("sm")]: {
                                marginRight: `calc(${n()} + 2px) !important`
                            },
                            [c.down(869)]: {
                                width: 200
                            },
                            "&:hover": {
                                cursor: "pointer"
                            },
                            backgroundColor: a.D.black[40],
                            borderColor: r ? o.secondary.main : "transparent",
                            borderStyle: "solid",
                            borderWidth: 1,
                            [`& .${s.Z.root} .${s.Z.input}`]: {
                                paddingTop: 0,
                                [c.down("h2")]: {
                                    paddingTop: 0
                                },
                                paddingLeft: n(.5)
                            }
                        },
                        [`& .${i.Z.popupIndicator}`]: {
                            padding: 0,
                            margin: "3px 8px"
                        },
                        [`& .${i.Z.popupIndicatorOpen}`]: {
                            transform: "none"
                        },
                        [`& .${i.Z.input}`]: {
                            borderWidth: 0,
                            boxShadow: "0px 0px",
                            fontFamily: l.gV,
                            fontWeight: 700,
                            marginBottom: 17,
                            fontSize: l.CH.button,
                            "&::placeholder": {
                                color: a.D.white[50],
                                opacity: 1,
                                fontFamily: l.gV
                            }
                        },
                        [`& .${i.Z.noOptions}`]: {
                            [c.down("h2")]: {
                                fontSize: l.CH.bodySmall
                            }
                        },
                        [`& .${i.Z.endAdornment}`]: {
                            top: -1
                        },
                        [`& .${i.Z.option}`]: {
                            paddingLeft: n(1.5),
                            '&[data-focus="true"]': {
                                backgroundColor: o.primary.main
                            }
                        },
                        [`& .${i.Z.loading}`]: {
                            fontFamily: l.gV,
                            fontSize: l.CH.body
                        }
                    }
                })),
                p = (0, o.ZP)("div")((() => ({
                    color: a.D.white[50],
                    height: 36,
                    width: 36,
                    padding: 6,
                    paddingTop: 7,
                    marginTop: -2,
                    "& svg": {
                        height: 20,
                        width: 20
                    }
                }))),
                h = (0, o.ZP)("div")((e => {
                    let {
                        theme: t
                    } = e;
                    return (e => ({
                        paddingLeft: e.spacing(.5),
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        fontWeight: 700,
                        fontFamily: l.gV,
                        fontSize: l.CH.body,
                        color: "white",
                        [e.breakpoints.down("h2")]: {
                            fontSize: l.CH.bodySmall
                        }
                    }))(t)
                }))
        },
        20287: function(e, t, r) {
            var o = r(59499),
                n = r(67294),
                i = r(34386),
                s = r(85893);

            function a(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(e);
                    t && (o = o.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, o)
                }
                return r
            }
            t.Z = function(e) {
                return t => {
                    const {
                        services: r
                    } = n.useContext(i.Z);
                    return (0, s.jsx)(e, function(e) {
                        for (var t = 1; t < arguments.length; t++) {
                            var r = null != arguments[t] ? arguments[t] : {};
                            t % 2 ? a(Object(r), !0).forEach((function(t) {
                                (0, o.Z)(e, t, r[t])
                            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : a(Object(r)).forEach((function(t) {
                                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                            }))
                        }
                        return e
                    }({
                        services: r
                    }, t))
                }
            }
        },
        49597: function(e, t, r) {
            r.d(t, {
                HT: function() {
                    return m
                },
                ar: function() {
                    return g
                },
                tH: function() {
                    return f
                },
                x9: function() {
                    return b
                }
            });
            var o = r(59499),
                n = r(18866),
                i = r(75656),
                s = r(65113),
                a = r(81719),
                l = r(83747),
                c = r(93545);

            function p(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(e);
                    t && (o = o.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, o)
                }
                return r
            }

            function h(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? p(Object(r), !0).forEach((function(t) {
                        (0, o.Z)(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : p(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }
            const d = e => ({
                    backgroundColor: e ? l.D.black[50] : l.D.black[60],
                    color: l.D.white[100],
                    "&:hover": {
                        backgroundColor: l.D.black[50]
                    }
                }),
                u = e => ({
                    backgroundColor: e ? l.D.white[90] : l.D.white[80],
                    color: l.D.white[30],
                    "&:hover": {
                        backgroundColor: l.D.white[90]
                    }
                }),
                f = (0, a.ZP)(n.Z, {
                    shouldForwardProp: e => "focused" !== e && "mode" !== e && "hasLabel" !== e
                })((e => {
                    let {
                        focused: t,
                        mode: r,
                        hasLabel: o
                    } = e;
                    return {
                        [`& .${i.Z.input}`]: h(h({
                            borderRadius: 8,
                            outline: 0,
                            padding: o ? "25px 12px 8px" : "16.5px 14px",
                            width: "100%",
                            fontSize: 16,
                            fontWeight: 700,
                            minHeight: 50,
                            border: `2px solid ${t?l.D.brand[100]:"transparent"}`
                        }, "dark" === r && d(t)), "light" === r && u(t)),
                        "&:before": {
                            display: "none"
                        },
                        "&:after": {
                            display: "none"
                        }
                    }
                })),
                g = (0, a.ZP)("label", {
                    shouldForwardProp: e => "focused" !== e
                })((e => {
                    let {
                        focused: t
                    } = e;
                    return {
                        transformOrigin: "left top",
                        overflow: "hidden",
                        fontSize: 16,
                        fontWeight: 700,
                        textOverflow: "ellipsis",
                        pointerEvents: "none",
                        color: l.D.white[30],
                        transition: "color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        transform: t ? "translate(12px, 7px) scale(0.75)" : "translate(12px, 16px) scale(1)"
                    }
                })),
                b = (0, a.ZP)(s.Z)({
                    width: "100%",
                    [`&.${i.Z.error}`]: {
                        [`& .${i.Z.input}`]: {
                            border: `2px solid ${l.D.alert[100]}`
                        },
                        "& label": {
                            color: l.D.alert[100]
                        }
                    },
                    "& textarea": {
                        fontFamily: c.gV
                    }
                }),
                m = (0, a.ZP)(n.Z)((e => {
                    let {
                        theme: {
                            spacing: t
                        }
                    } = e;
                    return {
                        [`& .${i.Z.input}`]: {
                            width: "100% !important",
                            background: "transparent",
                            marginLeft: t(1.5),
                            outline: 0,
                            color: l.D.white[100]
                        }
                    }
                }))
        }
    }
]);