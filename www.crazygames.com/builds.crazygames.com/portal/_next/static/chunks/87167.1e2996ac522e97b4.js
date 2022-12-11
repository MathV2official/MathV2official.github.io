"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [87167], {
        56759: function(e, t, o) {
            const n = o(67294).createContext({
                alternatives: []
            });
            t.Z = n
        },
        26448: function(e, t, o) {
            o.d(t, {
                C: function() {
                    return f
                },
                L4: function() {
                    return g
                },
                PR: function() {
                    return h
                },
                dK: function() {
                    return m
                }
            });
            var n = o(59499),
                r = o(49349),
                l = o(80085),
                i = o(95032),
                s = o(62545),
                c = o(13264),
                a = o(83747),
                u = o(93545);

            function d(e, t) {
                var o = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), o.push.apply(o, n)
                }
                return o
            }

            function p(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var o = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? d(Object(o), !0).forEach((function(t) {
                        (0, n.Z)(e, t, o[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : d(Object(o)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(o, t))
                    }))
                }
                return e
            }
            const b = e => {
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
                        border: `2px solid ${a.D.black[60]}`
                    }
                },
                h = (0, c.Z)("button")((e => {
                    let {
                        theme: t
                    } = e;
                    return p(p({}, b(t)), (e => ({
                        background: "transparent",
                        color: a.D.white[100],
                        "&:hover": {
                            color: a.D.white[30],
                            cursor: "pointer",
                            borderColor: a.D.black[10]
                        },
                        "& svg": p(p({}, b(e)["& svg"]), {}, {
                            color: a.D.white[30]
                        }),
                        [`&.${r.Z.expanded}`]: {
                            "& .IconExpandSelect": {
                                display: "none"
                            },
                            "& .IconCollapseSelect": {
                                display: "block"
                            },
                            color: a.D.white[100],
                            borderColor: a.D.brand[100],
                            background: a.D.black[50]
                        }
                    }))(t))
                })),
                g = (0, c.Z)("button")((e => {
                    let {
                        theme: t
                    } = e;
                    return p(p({}, b(t)), {
                        background: a.D.black[60],
                        color: a.D.white[30],
                        "&:hover": {
                            background: a.D.black[50],
                            border: `2px solid ${a.D.black[50]}`,
                            cursor: "pointer"
                        }
                    })
                })),
                f = (0, c.Z)("ul")((e => {
                    let {
                        theme: {
                            spacing: t
                        }
                    } = e;
                    return p(p({
                        fontFamily: "Nunito",
                        fontSize: 16,
                        fontWeight: 700,
                        borderRadius: 8,
                        overflow: "auto",
                        minWidth: 190,
                        background: a.D.black[50],
                        padding: t(1, 0),
                        paddingBottom: 0
                    }, (0, u.no)(4)), {}, {
                        maxHeight: "min(60vh, 400px)",
                        "& li": {
                            padding: t(0, 2),
                            display: "block",
                            height: 40,
                            lineHeight: "40px",
                            "&:hover": {
                                cursor: "pointer",
                                background: a.D.black[40]
                            },
                            [`&.${l.Z.disabled}`]: {
                                color: a.D.white[10],
                                "&:hover": {
                                    cursor: "normal",
                                    background: a.D.black[50]
                                }
                            },
                            [`&.${i.Z.disabled}`]: {
                                color: a.D.white[10],
                                "&:hover": {
                                    cursor: "normal",
                                    background: a.D.black[50]
                                }
                            }
                        }
                    })
                })),
                m = (0, c.Z)(s.Z)((() => ({
                    zIndex: 1500
                })))
        },
        6101: function(e, t, o) {
            var n = o(59499),
                r = o(67294),
                l = o(27444),
                i = o(85893);

            function s(e, t) {
                var o = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), o.push.apply(o, n)
                }
                return o
            }

            function c(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var o = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? s(Object(o), !0).forEach((function(t) {
                        (0, n.Z)(e, t, o[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : s(Object(o)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(o, t))
                    }))
                }
                return e
            }
            const a = r.memo((e => (0, i.jsx)(l.Z, c(c({}, e), {}, {
                viewBox: "0 0 24 24",
                children: (0, i.jsx)("path", {
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    d: "M21.6699 7.25758C22.08 7.62758 22.1124 8.25991 21.7424 8.66994L14.2424 16.9814C13.0169 18.3395 10.9831 18.3395 9.75757 16.9814L2.25757 8.66994C1.88757 8.25991 1.92002 7.62758 2.33005 7.25758C2.74008 6.88759 3.37241 6.92004 3.74241 7.33006L11.2424 15.6415C11.6737 16.1195 12.3263 16.1195 12.7576 15.6415L20.2576 7.33006C20.6276 6.92004 21.2599 6.88759 21.6699 7.25758Z"
                })
            }))));
            t.Z = a
        },
        58346: function(e, t, o) {
            var n = o(59499),
                r = o(67294),
                l = o(27444),
                i = o(85893);

            function s(e, t) {
                var o = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), o.push.apply(o, n)
                }
                return o
            }

            function c(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var o = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? s(Object(o), !0).forEach((function(t) {
                        (0, n.Z)(e, t, o[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : s(Object(o)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(o, t))
                    }))
                }
                return e
            }
            const a = r.memo((e => (0, i.jsx)(l.Z, c(c({}, e), {}, {
                viewBox: "0 0 24 24",
                children: (0, i.jsx)("path", {
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    d: "M2.33007 16.7424C1.92005 16.3724 1.88759 15.7401 2.25759 15.3301L9.75759 7.0186C10.9831 5.66046 13.0169 5.66047 14.2424 7.01861L21.7424 15.3301C22.1124 15.7401 22.08 16.3724 21.6699 16.7424C21.2599 17.1124 20.6276 17.08 20.2576 16.6699L12.7576 8.35848C12.3263 7.88051 11.6737 7.88051 11.2424 8.35848L3.74243 16.6699C3.37243 17.08 2.7401 17.1124 2.33007 16.7424Z"
                })
            }))));
            t.Z = a
        },
        87167: function(e, t, o) {
            o.r(t), o.d(t, {
                default: function() {
                    return L
                }
            });
            var n = o(67294),
                r = o(49501),
                l = o(56759),
                i = o(63530),
                s = o(4235),
                c = o(88131),
                a = o(87462),
                u = o(63366);
            const d = n.createContext(null);
            d.displayName = "MenuUnstyledContext";
            var p = d,
                b = o(34867);

            function h(e) {
                return (0, b.Z)("MuiMenu", e)
            }(0, o(1588).Z)("MuiMenu", ["root", "listbox", "expanded"]);
            var g = o(30067),
                f = o(84217),
                m = o(81931),
                y = o(27198);

            function O(e, t) {
                if (t.type === f.M.blur || t.type === f.M.optionHover || t.type === f.M.setValue) return e;
                const o = (0, m.Z)(e, t);
                return t.type !== f.M.setHighlight && null === o.highlightedValue && t.props.options.length > 0 ? (0, a.Z)({}, o, {
                    highlightedValue: t.props.options[0]
                }) : o
            }
            var v = o(94780),
                x = o(62545),
                j = o(24349),
                P = o(85893);
            const Z = ["actions", "anchorEl", "children", "component", "keepMounted", "listboxId", "onClose", "open", "slotProps", "slots"];
            var k = n.forwardRef((function(e, t) {
                    var o, r;
                    const {
                        actions: l,
                        anchorEl: i,
                        children: s,
                        component: c,
                        keepMounted: d = !1,
                        listboxId: b,
                        onClose: f,
                        open: m = !1,
                        slotProps: k = {},
                        slots: w = {}
                    } = e, I = (0, u.Z)(e, Z), {
                        registerItem: C,
                        unregisterItem: D,
                        getListboxProps: S,
                        getItemProps: E,
                        getItemState: R,
                        highlightFirstItem: M,
                        highlightLastItem: L
                    } = function(e = {}) {
                        const {
                            listboxRef: t,
                            open: o = !1,
                            onClose: r,
                            listboxId: l
                        } = e, [i, s] = n.useState({}), c = n.useRef(null), u = (0, g.Z)(c, t), d = n.useCallback(((e, t) => {
                            s((o => {
                                const n = (0, a.Z)({}, o);
                                return n[e] = t, n
                            }))
                        }), []), p = n.useCallback((e => {
                            s((t => {
                                const o = (0, a.Z)({}, t);
                                return delete o[e], o
                            }))
                        }), []), {
                            getOptionState: b,
                            getOptionProps: h,
                            getRootProps: f,
                            highlightedOption: m,
                            setHighlightedValue: v
                        } = (0, y.Z)({
                            options: Object.keys(i),
                            optionStringifier: e => {
                                var t;
                                return i[e].label || (null == (t = i[e].ref.current) ? void 0 : t.innerText)
                            },
                            isOptionDisabled: e => {
                                var t;
                                return (null == i || null == (t = i[e]) ? void 0 : t.disabled) || !1
                            },
                            listboxRef: u,
                            focusManagement: "DOM",
                            id: l,
                            stateReducer: O,
                            disabledItemsFocusable: !0
                        }), x = n.useCallback((() => {
                            Object.keys(i).length > 0 && v(i[Object.keys(i)[0]].id)
                        }), [i, v]), j = n.useCallback((() => {
                            Object.keys(i).length > 0 && v(i[Object.keys(i)[Object.keys(i).length - 1]].id)
                        }), [i, v]);
                        n.useEffect((() => {
                            o || x()
                        }), [o, x]);
                        const P = e => t => {
                                var n;
                                null == (n = e.onKeyDown) || n.call(e, t), t.defaultPrevented || "Escape" === t.key && o && (null == r || r())
                            },
                            Z = e => t => {
                                var o, n;
                                null == (o = e.onBlur) || o.call(e, t), null != (n = c.current) && n.contains(t.relatedTarget) || null == r || r()
                            };
                        return n.useEffect((() => {
                            var e, t, o;
                            null != (e = c.current) && e.contains(document.activeElement) && null !== m && (null == i || null == (t = i[m]) || null == (o = t.ref.current) || o.focus())
                        }), [m, i]), n.useDebugValue({
                            menuItems: i,
                            highlightedOption: m
                        }), {
                            registerItem: d,
                            unregisterItem: p,
                            menuItems: i,
                            getListboxProps: (e = {}) => {
                                const t = f((0, a.Z)({}, e, {
                                    onBlur: Z(e),
                                    onKeyDown: P(e)
                                }));
                                return (0, a.Z)({}, e, t, {
                                    role: "menu"
                                })
                            },
                            getItemState: e => {
                                const {
                                    disabled: t,
                                    highlighted: o
                                } = b(e);
                                return {
                                    disabled: t,
                                    highlighted: o
                                }
                            },
                            getItemProps: h,
                            highlightedOption: m,
                            highlightFirstItem: x,
                            highlightLastItem: j
                        }
                    }({
                        open: m,
                        onClose: f,
                        listboxId: b
                    });
                    n.useImperativeHandle(l, (() => ({
                        highlightFirstItem: M,
                        highlightLastItem: L
                    })), [M, L]);
                    const V = (0, a.Z)({}, e, {
                            open: m
                        }),
                        F = function(e) {
                            const {
                                open: t
                            } = e, o = {
                                root: ["root", t && "expanded"],
                                listbox: ["listbox", t && "expanded"]
                            };
                            return (0, v.Z)(o, h, {})
                        }(V),
                        N = null != (o = null != c ? c : w.root) ? o : x.Z,
                        _ = (0, j.Z)({
                            elementType: N,
                            externalForwardedProps: I,
                            externalSlotProps: k.root,
                            additionalProps: {
                                anchorEl: i,
                                open: m,
                                keepMounted: d,
                                role: void 0,
                                ref: t
                            },
                            className: F.root,
                            ownerState: V
                        }),
                        T = null != (r = w.listbox) ? r : "ul",
                        B = (0, j.Z)({
                            elementType: T,
                            getSlotProps: S,
                            externalSlotProps: k.listbox,
                            ownerState: V,
                            className: F.listbox
                        }),
                        H = n.useMemo((() => ({
                            registerItem: C,
                            unregisterItem: D,
                            getItemState: R,
                            getItemProps: E,
                            open: m
                        })), [E, R, m, C, D]);
                    return (0, P.jsx)(N, (0, a.Z)({}, _, {
                        children: (0, P.jsx)(T, (0, a.Z)({}, B, {
                            children: (0, P.jsx)(p.Provider, {
                                value: H,
                                children: s
                            })
                        }))
                    }))
                })),
                w = o(95032),
                I = o(57579),
                C = o(95286);
            const D = ["children", "disabled", "component", "label", "slotProps", "slots"];
            var S = n.forwardRef((function(e, t) {
                    var o;
                    const {
                        children: r,
                        disabled: l = !1,
                        component: i,
                        label: s,
                        slotProps: c = {},
                        slots: d = {}
                    } = e, b = (0, u.Z)(e, D), {
                        getRootProps: h,
                        disabled: f,
                        focusVisible: m
                    } = function(e) {
                        var t;
                        const {
                            disabled: o = !1,
                            ref: r,
                            label: l
                        } = e, i = (0, I.Z)(), s = n.useContext(p), c = n.useRef(null), u = (0, g.Z)(c, r);
                        if (null === s) throw new Error("MenuItemUnstyled must be used within a MenuUnstyled");
                        const {
                            registerItem: d,
                            unregisterItem: b,
                            open: h
                        } = s;
                        n.useEffect((() => {
                            if (void 0 !== i) return d(i, {
                                disabled: o,
                                id: i,
                                ref: c,
                                label: l
                            }), () => b(i)
                        }), [i, d, b, o, r, l]);
                        const {
                            getRootProps: f,
                            focusVisible: m
                        } = (0, C.Z)({
                            disabled: o,
                            focusableWhenDisabled: !0,
                            ref: u
                        }), [y, O] = n.useState(!1), v = n.useCallback((() => {
                            y && null != c.current && (c.current.focus(), O(!1))
                        }), [y]);
                        n.useEffect((() => {
                            v()
                        })), n.useDebugValue({
                            id: i,
                            disabled: o,
                            label: l
                        });
                        const x = s.getItemState(null != i ? i : ""),
                            {
                                highlighted: j
                            } = null != x ? x : {
                                highlighted: !1
                            };
                        return n.useEffect((() => {
                            O(j && h)
                        }), [j, h]), void 0 === i ? {
                            getRootProps: e => (0, a.Z)({}, e, f(e), {
                                role: "menuitem"
                            }),
                            disabled: !1,
                            focusVisible: m
                        } : {
                            getRootProps: e => {
                                const t = s.getItemProps(i, e);
                                return (0, a.Z)({}, e, f(e), {
                                    tabIndex: t.tabIndex,
                                    id: t.id,
                                    role: "menuitem"
                                })
                            },
                            disabled: null != (t = null == x ? void 0 : x.disabled) && t,
                            focusVisible: m
                        }
                    }({
                        disabled: l,
                        ref: t,
                        label: s
                    }), y = (0, a.Z)({}, e, {
                        disabled: f,
                        focusVisible: m
                    }), O = function(e) {
                        const {
                            disabled: t,
                            focusVisible: o
                        } = e, n = {
                            root: ["root", t && "disabled", o && "focusVisible"]
                        };
                        return (0, v.Z)(n, w.i, {})
                    }(y), x = null != (o = null != i ? i : d.root) ? o : "li", Z = (0, j.Z)({
                        elementType: x,
                        getSlotProps: h,
                        externalSlotProps: c.root,
                        externalForwardedProps: b,
                        className: O.root,
                        ownerState: y
                    });
                    return (0, P.jsx)(x, (0, a.Z)({}, Z, {
                        children: r
                    }))
                })),
                E = o(26448),
                R = o(58346),
                M = o(6101);
            var L = () => {
                const {
                    locale: e
                } = n.useContext(s.Z), {
                    alternatives: t
                } = n.useContext(l.Z), [o, a] = n.useState(null), u = n.useRef(null), d = Boolean(o), {
                    i18n: p
                } = (0, r.mV)(), b = (0, c.M7)(e), h = function(e, t) {
                    return i.Z.Instance.data.domains.slice().sort(((o, n) => {
                        if (o.host === e) return -1;
                        if (n.host === e) return 1;
                        const r = t._({
                                id: o.trl
                            }),
                            l = t._({
                                id: n.trl
                            });
                        return r.localeCompare(l)
                    }))
                }(b.host, p), g = b.locale, f = h.find((e => e.locale === g)), m = f ? p._({
                    id: f.trl
                }) : g;
                return (0, P.jsxs)("div", {
                    children: [(0, P.jsxs)(E.PR, {
                        onClick: e => {
                            a(d ? null : e.currentTarget)
                        },
                        children: [m, d ? (0, P.jsx)(R.Z, {}) : (0, P.jsx)(M.Z, {})]
                    }), (0, P.jsx)(k, {
                        actions: u,
                        open: d,
                        onClose: () => a(null),
                        anchorEl: o,
                        slots: {
                            root: E.dK,
                            listbox: E.C
                        },
                        keepMounted: !0,
                        className: "locale-selector",
                        children: h.map((e => {
                            const o = h.find((t => t.locale === e.locale)),
                                n = o ? function(e, t) {
                                    const o = t.find((t => t.host === e.host));
                                    return o ? o.href : `https://${e.host}`
                                }(o, t) : void 0,
                                r = g === e.locale,
                                l = p._({
                                    id: e.trl
                                });
                            return (0, P.jsx)(S, {
                                value: e.locale,
                                disabled: r,
                                children: r ? l : (0, P.jsx)("a", {
                                    href: n,
                                    style: {
                                        display: "flex",
                                        color: "inherit",
                                        cursor: "inherit"
                                    },
                                    children: l
                                })
                            }, e.host ? ? e.locale)
                        }))
                    })]
                })
            }
        }
    }
]);