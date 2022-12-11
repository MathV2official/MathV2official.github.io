"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [77782], {
        62545: function(e, t, n) {
            n.d(t, {
                Z: function() {
                    return Te
                }
            });
            var r = n(87462),
                o = n(63366),
                i = n(67294),
                a = n(30067),
                s = n(16600),
                f = n(57094);

            function c(e) {
                if (null == e) return window;
                if ("[object Window]" !== e.toString()) {
                    var t = e.ownerDocument;
                    return t && t.defaultView || window
                }
                return e
            }

            function p(e) {
                return e instanceof c(e).Element || e instanceof Element
            }

            function u(e) {
                return e instanceof c(e).HTMLElement || e instanceof HTMLElement
            }

            function l(e) {
                return "undefined" !== typeof ShadowRoot && (e instanceof c(e).ShadowRoot || e instanceof ShadowRoot)
            }
            var d = Math.max,
                m = Math.min,
                h = Math.round;

            function v() {
                var e = navigator.userAgentData;
                return null != e && e.brands ? e.brands.map((function(e) {
                    return e.brand + "/" + e.version
                })).join(" ") : navigator.userAgent
            }

            function y() {
                return !/^((?!chrome|android).)*safari/i.test(v())
            }

            function g(e, t, n) {
                void 0 === t && (t = !1), void 0 === n && (n = !1);
                var r = e.getBoundingClientRect(),
                    o = 1,
                    i = 1;
                t && u(e) && (o = e.offsetWidth > 0 && h(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && h(r.height) / e.offsetHeight || 1);
                var a = (p(e) ? c(e) : window).visualViewport,
                    s = !y() && n,
                    f = (r.left + (s && a ? a.offsetLeft : 0)) / o,
                    l = (r.top + (s && a ? a.offsetTop : 0)) / i,
                    d = r.width / o,
                    m = r.height / i;
                return {
                    width: d,
                    height: m,
                    top: l,
                    right: f + d,
                    bottom: l + m,
                    left: f,
                    x: f,
                    y: l
                }
            }

            function b(e) {
                var t = c(e);
                return {
                    scrollLeft: t.pageXOffset,
                    scrollTop: t.pageYOffset
                }
            }

            function w(e) {
                return e ? (e.nodeName || "").toLowerCase() : null
            }

            function x(e) {
                return ((p(e) ? e.ownerDocument : e.document) || window.document).documentElement
            }

            function O(e) {
                return g(x(e)).left + b(e).scrollLeft
            }

            function E(e) {
                return c(e).getComputedStyle(e)
            }

            function j(e) {
                var t = E(e),
                    n = t.overflow,
                    r = t.overflowX,
                    o = t.overflowY;
                return /auto|scroll|overlay|hidden/.test(n + o + r)
            }

            function P(e, t, n) {
                void 0 === n && (n = !1);
                var r = u(t),
                    o = u(t) && function(e) {
                        var t = e.getBoundingClientRect(),
                            n = h(t.width) / e.offsetWidth || 1,
                            r = h(t.height) / e.offsetHeight || 1;
                        return 1 !== n || 1 !== r
                    }(t),
                    i = x(t),
                    a = g(e, o, n),
                    s = {
                        scrollLeft: 0,
                        scrollTop: 0
                    },
                    f = {
                        x: 0,
                        y: 0
                    };
                return (r || !r && !n) && (("body" !== w(t) || j(i)) && (s = function(e) {
                    return e !== c(e) && u(e) ? {
                        scrollLeft: (t = e).scrollLeft,
                        scrollTop: t.scrollTop
                    } : b(e);
                    var t
                }(t)), u(t) ? ((f = g(t, !0)).x += t.clientLeft, f.y += t.clientTop) : i && (f.x = O(i))), {
                    x: a.left + s.scrollLeft - f.x,
                    y: a.top + s.scrollTop - f.y,
                    width: a.width,
                    height: a.height
                }
            }

            function D(e) {
                var t = g(e),
                    n = e.offsetWidth,
                    r = e.offsetHeight;
                return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
                    x: e.offsetLeft,
                    y: e.offsetTop,
                    width: n,
                    height: r
                }
            }

            function k(e) {
                return "html" === w(e) ? e : e.assignedSlot || e.parentNode || (l(e) ? e.host : null) || x(e)
            }

            function A(e) {
                return ["html", "body", "#document"].indexOf(w(e)) >= 0 ? e.ownerDocument.body : u(e) && j(e) ? e : A(k(e))
            }

            function R(e, t) {
                var n;
                void 0 === t && (t = []);
                var r = A(e),
                    o = r === (null == (n = e.ownerDocument) ? void 0 : n.body),
                    i = c(r),
                    a = o ? [i].concat(i.visualViewport || [], j(r) ? r : []) : r,
                    s = t.concat(a);
                return o ? s : s.concat(R(k(a)))
            }

            function M(e) {
                return ["table", "td", "th"].indexOf(w(e)) >= 0
            }

            function L(e) {
                return u(e) && "fixed" !== E(e).position ? e.offsetParent : null
            }

            function W(e) {
                for (var t = c(e), n = L(e); n && M(n) && "static" === E(n).position;) n = L(n);
                return n && ("html" === w(n) || "body" === w(n) && "static" === E(n).position) ? t : n || function(e) {
                    var t = /firefox/i.test(v());
                    if (/Trident/i.test(v()) && u(e) && "fixed" === E(e).position) return null;
                    var n = k(e);
                    for (l(n) && (n = n.host); u(n) && ["html", "body"].indexOf(w(n)) < 0;) {
                        var r = E(n);
                        if ("none" !== r.transform || "none" !== r.perspective || "paint" === r.contain || -1 !== ["transform", "perspective"].indexOf(r.willChange) || t && "filter" === r.willChange || t && r.filter && "none" !== r.filter) return n;
                        n = n.parentNode
                    }
                    return null
                }(e) || t
            }
            var T = "top",
                B = "bottom",
                S = "right",
                Z = "left",
                H = "auto",
                C = [T, B, S, Z],
                V = "start",
                q = "end",
                N = "viewport",
                U = "popper",
                I = C.reduce((function(e, t) {
                    return e.concat([t + "-" + V, t + "-" + q])
                }), []),
                _ = [].concat(C, [H]).reduce((function(e, t) {
                    return e.concat([t, t + "-" + V, t + "-" + q])
                }), []),
                F = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];

            function z(e) {
                var t = new Map,
                    n = new Set,
                    r = [];

                function o(e) {
                    n.add(e.name), [].concat(e.requires || [], e.requiresIfExists || []).forEach((function(e) {
                        if (!n.has(e)) {
                            var r = t.get(e);
                            r && o(r)
                        }
                    })), r.push(e)
                }
                return e.forEach((function(e) {
                    t.set(e.name, e)
                })), e.forEach((function(e) {
                    n.has(e.name) || o(e)
                })), r
            }

            function X(e) {
                var t;
                return function() {
                    return t || (t = new Promise((function(n) {
                        Promise.resolve().then((function() {
                            t = void 0, n(e())
                        }))
                    }))), t
                }
            }
            var Y = {
                placement: "bottom",
                modifiers: [],
                strategy: "absolute"
            };

            function $() {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                return !t.some((function(e) {
                    return !(e && "function" === typeof e.getBoundingClientRect)
                }))
            }

            function G(e) {
                void 0 === e && (e = {});
                var t = e,
                    n = t.defaultModifiers,
                    r = void 0 === n ? [] : n,
                    o = t.defaultOptions,
                    i = void 0 === o ? Y : o;
                return function(e, t, n) {
                    void 0 === n && (n = i);
                    var o = {
                            placement: "bottom",
                            orderedModifiers: [],
                            options: Object.assign({}, Y, i),
                            modifiersData: {},
                            elements: {
                                reference: e,
                                popper: t
                            },
                            attributes: {},
                            styles: {}
                        },
                        a = [],
                        s = !1,
                        f = {
                            state: o,
                            setOptions: function(n) {
                                var s = "function" === typeof n ? n(o.options) : n;
                                c(), o.options = Object.assign({}, i, o.options, s), o.scrollParents = {
                                    reference: p(e) ? R(e) : e.contextElement ? R(e.contextElement) : [],
                                    popper: R(t)
                                };
                                var u = function(e) {
                                    var t = z(e);
                                    return F.reduce((function(e, n) {
                                        return e.concat(t.filter((function(e) {
                                            return e.phase === n
                                        })))
                                    }), [])
                                }(function(e) {
                                    var t = e.reduce((function(e, t) {
                                        var n = e[t.name];
                                        return e[t.name] = n ? Object.assign({}, n, t, {
                                            options: Object.assign({}, n.options, t.options),
                                            data: Object.assign({}, n.data, t.data)
                                        }) : t, e
                                    }), {});
                                    return Object.keys(t).map((function(e) {
                                        return t[e]
                                    }))
                                }([].concat(r, o.options.modifiers)));
                                return o.orderedModifiers = u.filter((function(e) {
                                    return e.enabled
                                })), o.orderedModifiers.forEach((function(e) {
                                    var t = e.name,
                                        n = e.options,
                                        r = void 0 === n ? {} : n,
                                        i = e.effect;
                                    if ("function" === typeof i) {
                                        var s = i({
                                                state: o,
                                                name: t,
                                                instance: f,
                                                options: r
                                            }),
                                            c = function() {};
                                        a.push(s || c)
                                    }
                                })), f.update()
                            },
                            forceUpdate: function() {
                                if (!s) {
                                    var e = o.elements,
                                        t = e.reference,
                                        n = e.popper;
                                    if ($(t, n)) {
                                        o.rects = {
                                            reference: P(t, W(n), "fixed" === o.options.strategy),
                                            popper: D(n)
                                        }, o.reset = !1, o.placement = o.options.placement, o.orderedModifiers.forEach((function(e) {
                                            return o.modifiersData[e.name] = Object.assign({}, e.data)
                                        }));
                                        for (var r = 0; r < o.orderedModifiers.length; r++)
                                            if (!0 !== o.reset) {
                                                var i = o.orderedModifiers[r],
                                                    a = i.fn,
                                                    c = i.options,
                                                    p = void 0 === c ? {} : c,
                                                    u = i.name;
                                                "function" === typeof a && (o = a({
                                                    state: o,
                                                    options: p,
                                                    name: u,
                                                    instance: f
                                                }) || o)
                                            } else o.reset = !1, r = -1
                                    }
                                }
                            },
                            update: X((function() {
                                return new Promise((function(e) {
                                    f.forceUpdate(), e(o)
                                }))
                            })),
                            destroy: function() {
                                c(), s = !0
                            }
                        };
                    if (!$(e, t)) return f;

                    function c() {
                        a.forEach((function(e) {
                            return e()
                        })), a = []
                    }
                    return f.setOptions(n).then((function(e) {
                        !s && n.onFirstUpdate && n.onFirstUpdate(e)
                    })), f
                }
            }
            var J = {
                passive: !0
            };

            function K(e) {
                return e.split("-")[0]
            }

            function Q(e) {
                return e.split("-")[1]
            }

            function ee(e) {
                return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y"
            }

            function te(e) {
                var t, n = e.reference,
                    r = e.element,
                    o = e.placement,
                    i = o ? K(o) : null,
                    a = o ? Q(o) : null,
                    s = n.x + n.width / 2 - r.width / 2,
                    f = n.y + n.height / 2 - r.height / 2;
                switch (i) {
                    case T:
                        t = {
                            x: s,
                            y: n.y - r.height
                        };
                        break;
                    case B:
                        t = {
                            x: s,
                            y: n.y + n.height
                        };
                        break;
                    case S:
                        t = {
                            x: n.x + n.width,
                            y: f
                        };
                        break;
                    case Z:
                        t = {
                            x: n.x - r.width,
                            y: f
                        };
                        break;
                    default:
                        t = {
                            x: n.x,
                            y: n.y
                        }
                }
                var c = i ? ee(i) : null;
                if (null != c) {
                    var p = "y" === c ? "height" : "width";
                    switch (a) {
                        case V:
                            t[c] = t[c] - (n[p] / 2 - r[p] / 2);
                            break;
                        case q:
                            t[c] = t[c] + (n[p] / 2 - r[p] / 2)
                    }
                }
                return t
            }
            var ne = {
                top: "auto",
                right: "auto",
                bottom: "auto",
                left: "auto"
            };

            function re(e) {
                var t, n = e.popper,
                    r = e.popperRect,
                    o = e.placement,
                    i = e.variation,
                    a = e.offsets,
                    s = e.position,
                    f = e.gpuAcceleration,
                    p = e.adaptive,
                    u = e.roundOffsets,
                    l = e.isFixed,
                    d = a.x,
                    m = void 0 === d ? 0 : d,
                    v = a.y,
                    y = void 0 === v ? 0 : v,
                    g = "function" === typeof u ? u({
                        x: m,
                        y: y
                    }) : {
                        x: m,
                        y: y
                    };
                m = g.x, y = g.y;
                var b = a.hasOwnProperty("x"),
                    w = a.hasOwnProperty("y"),
                    O = Z,
                    j = T,
                    P = window;
                if (p) {
                    var D = W(n),
                        k = "clientHeight",
                        A = "clientWidth";
                    if (D === c(n) && "static" !== E(D = x(n)).position && "absolute" === s && (k = "scrollHeight", A = "scrollWidth"), o === T || (o === Z || o === S) && i === q) j = B, y -= (l && D === P && P.visualViewport ? P.visualViewport.height : D[k]) - r.height, y *= f ? 1 : -1;
                    if (o === Z || (o === T || o === B) && i === q) O = S, m -= (l && D === P && P.visualViewport ? P.visualViewport.width : D[A]) - r.width, m *= f ? 1 : -1
                }
                var R, M = Object.assign({
                        position: s
                    }, p && ne),
                    L = !0 === u ? function(e) {
                        var t = e.x,
                            n = e.y,
                            r = window.devicePixelRatio || 1;
                        return {
                            x: h(t * r) / r || 0,
                            y: h(n * r) / r || 0
                        }
                    }({
                        x: m,
                        y: y
                    }) : {
                        x: m,
                        y: y
                    };
                return m = L.x, y = L.y, f ? Object.assign({}, M, ((R = {})[j] = w ? "0" : "", R[O] = b ? "0" : "", R.transform = (P.devicePixelRatio || 1) <= 1 ? "translate(" + m + "px, " + y + "px)" : "translate3d(" + m + "px, " + y + "px, 0)", R)) : Object.assign({}, M, ((t = {})[j] = w ? y + "px" : "", t[O] = b ? m + "px" : "", t.transform = "", t))
            }
            var oe = {
                    name: "offset",
                    enabled: !0,
                    phase: "main",
                    requires: ["popperOffsets"],
                    fn: function(e) {
                        var t = e.state,
                            n = e.options,
                            r = e.name,
                            o = n.offset,
                            i = void 0 === o ? [0, 0] : o,
                            a = _.reduce((function(e, n) {
                                return e[n] = function(e, t, n) {
                                    var r = K(e),
                                        o = [Z, T].indexOf(r) >= 0 ? -1 : 1,
                                        i = "function" === typeof n ? n(Object.assign({}, t, {
                                            placement: e
                                        })) : n,
                                        a = i[0],
                                        s = i[1];
                                    return a = a || 0, s = (s || 0) * o, [Z, S].indexOf(r) >= 0 ? {
                                        x: s,
                                        y: a
                                    } : {
                                        x: a,
                                        y: s
                                    }
                                }(n, t.rects, i), e
                            }), {}),
                            s = a[t.placement],
                            f = s.x,
                            c = s.y;
                        null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += f, t.modifiersData.popperOffsets.y += c), t.modifiersData[r] = a
                    }
                },
                ie = {
                    left: "right",
                    right: "left",
                    bottom: "top",
                    top: "bottom"
                };

            function ae(e) {
                return e.replace(/left|right|bottom|top/g, (function(e) {
                    return ie[e]
                }))
            }
            var se = {
                start: "end",
                end: "start"
            };

            function fe(e) {
                return e.replace(/start|end/g, (function(e) {
                    return se[e]
                }))
            }

            function ce(e, t) {
                var n = t.getRootNode && t.getRootNode();
                if (e.contains(t)) return !0;
                if (n && l(n)) {
                    var r = t;
                    do {
                        if (r && e.isSameNode(r)) return !0;
                        r = r.parentNode || r.host
                    } while (r)
                }
                return !1
            }

            function pe(e) {
                return Object.assign({}, e, {
                    left: e.x,
                    top: e.y,
                    right: e.x + e.width,
                    bottom: e.y + e.height
                })
            }

            function ue(e, t, n) {
                return t === N ? pe(function(e, t) {
                    var n = c(e),
                        r = x(e),
                        o = n.visualViewport,
                        i = r.clientWidth,
                        a = r.clientHeight,
                        s = 0,
                        f = 0;
                    if (o) {
                        i = o.width, a = o.height;
                        var p = y();
                        (p || !p && "fixed" === t) && (s = o.offsetLeft, f = o.offsetTop)
                    }
                    return {
                        width: i,
                        height: a,
                        x: s + O(e),
                        y: f
                    }
                }(e, n)) : p(t) ? function(e, t) {
                    var n = g(e, !1, "fixed" === t);
                    return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n
                }(t, n) : pe(function(e) {
                    var t, n = x(e),
                        r = b(e),
                        o = null == (t = e.ownerDocument) ? void 0 : t.body,
                        i = d(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0),
                        a = d(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0),
                        s = -r.scrollLeft + O(e),
                        f = -r.scrollTop;
                    return "rtl" === E(o || n).direction && (s += d(n.clientWidth, o ? o.clientWidth : 0) - i), {
                        width: i,
                        height: a,
                        x: s,
                        y: f
                    }
                }(x(e)))
            }

            function le(e, t, n, r) {
                var o = "clippingParents" === t ? function(e) {
                        var t = R(k(e)),
                            n = ["absolute", "fixed"].indexOf(E(e).position) >= 0 && u(e) ? W(e) : e;
                        return p(n) ? t.filter((function(e) {
                            return p(e) && ce(e, n) && "body" !== w(e)
                        })) : []
                    }(e) : [].concat(t),
                    i = [].concat(o, [n]),
                    a = i[0],
                    s = i.reduce((function(t, n) {
                        var o = ue(e, n, r);
                        return t.top = d(o.top, t.top), t.right = m(o.right, t.right), t.bottom = m(o.bottom, t.bottom), t.left = d(o.left, t.left), t
                    }), ue(e, a, r));
                return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s
            }

            function de(e) {
                return Object.assign({}, {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }, e)
            }

            function me(e, t) {
                return t.reduce((function(t, n) {
                    return t[n] = e, t
                }), {})
            }

            function he(e, t) {
                void 0 === t && (t = {});
                var n = t,
                    r = n.placement,
                    o = void 0 === r ? e.placement : r,
                    i = n.strategy,
                    a = void 0 === i ? e.strategy : i,
                    s = n.boundary,
                    f = void 0 === s ? "clippingParents" : s,
                    c = n.rootBoundary,
                    u = void 0 === c ? N : c,
                    l = n.elementContext,
                    d = void 0 === l ? U : l,
                    m = n.altBoundary,
                    h = void 0 !== m && m,
                    v = n.padding,
                    y = void 0 === v ? 0 : v,
                    b = de("number" !== typeof y ? y : me(y, C)),
                    w = d === U ? "reference" : U,
                    O = e.rects.popper,
                    E = e.elements[h ? w : d],
                    j = le(p(E) ? E : E.contextElement || x(e.elements.popper), f, u, a),
                    P = g(e.elements.reference),
                    D = te({
                        reference: P,
                        element: O,
                        strategy: "absolute",
                        placement: o
                    }),
                    k = pe(Object.assign({}, O, D)),
                    A = d === U ? k : P,
                    R = {
                        top: j.top - A.top + b.top,
                        bottom: A.bottom - j.bottom + b.bottom,
                        left: j.left - A.left + b.left,
                        right: A.right - j.right + b.right
                    },
                    M = e.modifiersData.offset;
                if (d === U && M) {
                    var L = M[o];
                    Object.keys(R).forEach((function(e) {
                        var t = [S, B].indexOf(e) >= 0 ? 1 : -1,
                            n = [T, B].indexOf(e) >= 0 ? "y" : "x";
                        R[e] += L[n] * t
                    }))
                }
                return R
            }

            function ve(e, t, n) {
                return d(e, m(t, n))
            }
            var ye = {
                name: "preventOverflow",
                enabled: !0,
                phase: "main",
                fn: function(e) {
                    var t = e.state,
                        n = e.options,
                        r = e.name,
                        o = n.mainAxis,
                        i = void 0 === o || o,
                        a = n.altAxis,
                        s = void 0 !== a && a,
                        f = n.boundary,
                        c = n.rootBoundary,
                        p = n.altBoundary,
                        u = n.padding,
                        l = n.tether,
                        h = void 0 === l || l,
                        v = n.tetherOffset,
                        y = void 0 === v ? 0 : v,
                        g = he(t, {
                            boundary: f,
                            rootBoundary: c,
                            padding: u,
                            altBoundary: p
                        }),
                        b = K(t.placement),
                        w = Q(t.placement),
                        x = !w,
                        O = ee(b),
                        E = "x" === O ? "y" : "x",
                        j = t.modifiersData.popperOffsets,
                        P = t.rects.reference,
                        k = t.rects.popper,
                        A = "function" === typeof y ? y(Object.assign({}, t.rects, {
                            placement: t.placement
                        })) : y,
                        R = "number" === typeof A ? {
                            mainAxis: A,
                            altAxis: A
                        } : Object.assign({
                            mainAxis: 0,
                            altAxis: 0
                        }, A),
                        M = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
                        L = {
                            x: 0,
                            y: 0
                        };
                    if (j) {
                        if (i) {
                            var H, C = "y" === O ? T : Z,
                                q = "y" === O ? B : S,
                                N = "y" === O ? "height" : "width",
                                U = j[O],
                                I = U + g[C],
                                _ = U - g[q],
                                F = h ? -k[N] / 2 : 0,
                                z = w === V ? P[N] : k[N],
                                X = w === V ? -k[N] : -P[N],
                                Y = t.elements.arrow,
                                $ = h && Y ? D(Y) : {
                                    width: 0,
                                    height: 0
                                },
                                G = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : {
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0
                                },
                                J = G[C],
                                te = G[q],
                                ne = ve(0, P[N], $[N]),
                                re = x ? P[N] / 2 - F - ne - J - R.mainAxis : z - ne - J - R.mainAxis,
                                oe = x ? -P[N] / 2 + F + ne + te + R.mainAxis : X + ne + te + R.mainAxis,
                                ie = t.elements.arrow && W(t.elements.arrow),
                                ae = ie ? "y" === O ? ie.clientTop || 0 : ie.clientLeft || 0 : 0,
                                se = null != (H = null == M ? void 0 : M[O]) ? H : 0,
                                fe = U + oe - se,
                                ce = ve(h ? m(I, U + re - se - ae) : I, U, h ? d(_, fe) : _);
                            j[O] = ce, L[O] = ce - U
                        }
                        if (s) {
                            var pe, ue = "x" === O ? T : Z,
                                le = "x" === O ? B : S,
                                de = j[E],
                                me = "y" === E ? "height" : "width",
                                ye = de + g[ue],
                                ge = de - g[le],
                                be = -1 !== [T, Z].indexOf(b),
                                we = null != (pe = null == M ? void 0 : M[E]) ? pe : 0,
                                xe = be ? ye : de - P[me] - k[me] - we + R.altAxis,
                                Oe = be ? de + P[me] + k[me] - we - R.altAxis : ge,
                                Ee = h && be ? function(e, t, n) {
                                    var r = ve(e, t, n);
                                    return r > n ? n : r
                                }(xe, de, Oe) : ve(h ? xe : ye, de, h ? Oe : ge);
                            j[E] = Ee, L[E] = Ee - de
                        }
                        t.modifiersData[r] = L
                    }
                },
                requiresIfExists: ["offset"]
            };
            var ge = {
                name: "arrow",
                enabled: !0,
                phase: "main",
                fn: function(e) {
                    var t, n = e.state,
                        r = e.name,
                        o = e.options,
                        i = n.elements.arrow,
                        a = n.modifiersData.popperOffsets,
                        s = K(n.placement),
                        f = ee(s),
                        c = [Z, S].indexOf(s) >= 0 ? "height" : "width";
                    if (i && a) {
                        var p = function(e, t) {
                                return de("number" !== typeof(e = "function" === typeof e ? e(Object.assign({}, t.rects, {
                                    placement: t.placement
                                })) : e) ? e : me(e, C))
                            }(o.padding, n),
                            u = D(i),
                            l = "y" === f ? T : Z,
                            d = "y" === f ? B : S,
                            m = n.rects.reference[c] + n.rects.reference[f] - a[f] - n.rects.popper[c],
                            h = a[f] - n.rects.reference[f],
                            v = W(i),
                            y = v ? "y" === f ? v.clientHeight || 0 : v.clientWidth || 0 : 0,
                            g = m / 2 - h / 2,
                            b = p[l],
                            w = y - u[c] - p[d],
                            x = y / 2 - u[c] / 2 + g,
                            O = ve(b, x, w),
                            E = f;
                        n.modifiersData[r] = ((t = {})[E] = O, t.centerOffset = O - x, t)
                    }
                },
                effect: function(e) {
                    var t = e.state,
                        n = e.options.element,
                        r = void 0 === n ? "[data-popper-arrow]" : n;
                    null != r && ("string" !== typeof r || (r = t.elements.popper.querySelector(r))) && ce(t.elements.popper, r) && (t.elements.arrow = r)
                },
                requires: ["popperOffsets"],
                requiresIfExists: ["preventOverflow"]
            };

            function be(e, t, n) {
                return void 0 === n && (n = {
                    x: 0,
                    y: 0
                }), {
                    top: e.top - t.height - n.y,
                    right: e.right - t.width + n.x,
                    bottom: e.bottom - t.height + n.y,
                    left: e.left - t.width - n.x
                }
            }

            function we(e) {
                return [T, S, B, Z].some((function(t) {
                    return e[t] >= 0
                }))
            }
            var xe = G({
                    defaultModifiers: [{
                        name: "eventListeners",
                        enabled: !0,
                        phase: "write",
                        fn: function() {},
                        effect: function(e) {
                            var t = e.state,
                                n = e.instance,
                                r = e.options,
                                o = r.scroll,
                                i = void 0 === o || o,
                                a = r.resize,
                                s = void 0 === a || a,
                                f = c(t.elements.popper),
                                p = [].concat(t.scrollParents.reference, t.scrollParents.popper);
                            return i && p.forEach((function(e) {
                                    e.addEventListener("scroll", n.update, J)
                                })), s && f.addEventListener("resize", n.update, J),
                                function() {
                                    i && p.forEach((function(e) {
                                        e.removeEventListener("scroll", n.update, J)
                                    })), s && f.removeEventListener("resize", n.update, J)
                                }
                        },
                        data: {}
                    }, {
                        name: "popperOffsets",
                        enabled: !0,
                        phase: "read",
                        fn: function(e) {
                            var t = e.state,
                                n = e.name;
                            t.modifiersData[n] = te({
                                reference: t.rects.reference,
                                element: t.rects.popper,
                                strategy: "absolute",
                                placement: t.placement
                            })
                        },
                        data: {}
                    }, {
                        name: "computeStyles",
                        enabled: !0,
                        phase: "beforeWrite",
                        fn: function(e) {
                            var t = e.state,
                                n = e.options,
                                r = n.gpuAcceleration,
                                o = void 0 === r || r,
                                i = n.adaptive,
                                a = void 0 === i || i,
                                s = n.roundOffsets,
                                f = void 0 === s || s,
                                c = {
                                    placement: K(t.placement),
                                    variation: Q(t.placement),
                                    popper: t.elements.popper,
                                    popperRect: t.rects.popper,
                                    gpuAcceleration: o,
                                    isFixed: "fixed" === t.options.strategy
                                };
                            null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, re(Object.assign({}, c, {
                                offsets: t.modifiersData.popperOffsets,
                                position: t.options.strategy,
                                adaptive: a,
                                roundOffsets: f
                            })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, re(Object.assign({}, c, {
                                offsets: t.modifiersData.arrow,
                                position: "absolute",
                                adaptive: !1,
                                roundOffsets: f
                            })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
                                "data-popper-placement": t.placement
                            })
                        },
                        data: {}
                    }, {
                        name: "applyStyles",
                        enabled: !0,
                        phase: "write",
                        fn: function(e) {
                            var t = e.state;
                            Object.keys(t.elements).forEach((function(e) {
                                var n = t.styles[e] || {},
                                    r = t.attributes[e] || {},
                                    o = t.elements[e];
                                u(o) && w(o) && (Object.assign(o.style, n), Object.keys(r).forEach((function(e) {
                                    var t = r[e];
                                    !1 === t ? o.removeAttribute(e) : o.setAttribute(e, !0 === t ? "" : t)
                                })))
                            }))
                        },
                        effect: function(e) {
                            var t = e.state,
                                n = {
                                    popper: {
                                        position: t.options.strategy,
                                        left: "0",
                                        top: "0",
                                        margin: "0"
                                    },
                                    arrow: {
                                        position: "absolute"
                                    },
                                    reference: {}
                                };
                            return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
                                function() {
                                    Object.keys(t.elements).forEach((function(e) {
                                        var r = t.elements[e],
                                            o = t.attributes[e] || {},
                                            i = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce((function(e, t) {
                                                return e[t] = "", e
                                            }), {});
                                        u(r) && w(r) && (Object.assign(r.style, i), Object.keys(o).forEach((function(e) {
                                            r.removeAttribute(e)
                                        })))
                                    }))
                                }
                        },
                        requires: ["computeStyles"]
                    }, oe, {
                        name: "flip",
                        enabled: !0,
                        phase: "main",
                        fn: function(e) {
                            var t = e.state,
                                n = e.options,
                                r = e.name;
                            if (!t.modifiersData[r]._skip) {
                                for (var o = n.mainAxis, i = void 0 === o || o, a = n.altAxis, s = void 0 === a || a, f = n.fallbackPlacements, c = n.padding, p = n.boundary, u = n.rootBoundary, l = n.altBoundary, d = n.flipVariations, m = void 0 === d || d, h = n.allowedAutoPlacements, v = t.options.placement, y = K(v), g = f || (y === v || !m ? [ae(v)] : function(e) {
                                        if (K(e) === H) return [];
                                        var t = ae(e);
                                        return [fe(e), t, fe(t)]
                                    }(v)), b = [v].concat(g).reduce((function(e, n) {
                                        return e.concat(K(n) === H ? function(e, t) {
                                            void 0 === t && (t = {});
                                            var n = t,
                                                r = n.placement,
                                                o = n.boundary,
                                                i = n.rootBoundary,
                                                a = n.padding,
                                                s = n.flipVariations,
                                                f = n.allowedAutoPlacements,
                                                c = void 0 === f ? _ : f,
                                                p = Q(r),
                                                u = p ? s ? I : I.filter((function(e) {
                                                    return Q(e) === p
                                                })) : C,
                                                l = u.filter((function(e) {
                                                    return c.indexOf(e) >= 0
                                                }));
                                            0 === l.length && (l = u);
                                            var d = l.reduce((function(t, n) {
                                                return t[n] = he(e, {
                                                    placement: n,
                                                    boundary: o,
                                                    rootBoundary: i,
                                                    padding: a
                                                })[K(n)], t
                                            }), {});
                                            return Object.keys(d).sort((function(e, t) {
                                                return d[e] - d[t]
                                            }))
                                        }(t, {
                                            placement: n,
                                            boundary: p,
                                            rootBoundary: u,
                                            padding: c,
                                            flipVariations: m,
                                            allowedAutoPlacements: h
                                        }) : n)
                                    }), []), w = t.rects.reference, x = t.rects.popper, O = new Map, E = !0, j = b[0], P = 0; P < b.length; P++) {
                                    var D = b[P],
                                        k = K(D),
                                        A = Q(D) === V,
                                        R = [T, B].indexOf(k) >= 0,
                                        M = R ? "width" : "height",
                                        L = he(t, {
                                            placement: D,
                                            boundary: p,
                                            rootBoundary: u,
                                            altBoundary: l,
                                            padding: c
                                        }),
                                        W = R ? A ? S : Z : A ? B : T;
                                    w[M] > x[M] && (W = ae(W));
                                    var q = ae(W),
                                        N = [];
                                    if (i && N.push(L[k] <= 0), s && N.push(L[W] <= 0, L[q] <= 0), N.every((function(e) {
                                            return e
                                        }))) {
                                        j = D, E = !1;
                                        break
                                    }
                                    O.set(D, N)
                                }
                                if (E)
                                    for (var U = function(e) {
                                            var t = b.find((function(t) {
                                                var n = O.get(t);
                                                if (n) return n.slice(0, e).every((function(e) {
                                                    return e
                                                }))
                                            }));
                                            if (t) return j = t, "break"
                                        }, F = m ? 3 : 1; F > 0; F--) {
                                        if ("break" === U(F)) break
                                    }
                                t.placement !== j && (t.modifiersData[r]._skip = !0, t.placement = j, t.reset = !0)
                            }
                        },
                        requiresIfExists: ["offset"],
                        data: {
                            _skip: !1
                        }
                    }, ye, ge, {
                        name: "hide",
                        enabled: !0,
                        phase: "main",
                        requiresIfExists: ["preventOverflow"],
                        fn: function(e) {
                            var t = e.state,
                                n = e.name,
                                r = t.rects.reference,
                                o = t.rects.popper,
                                i = t.modifiersData.preventOverflow,
                                a = he(t, {
                                    elementContext: "reference"
                                }),
                                s = he(t, {
                                    altBoundary: !0
                                }),
                                f = be(a, r),
                                c = be(s, o, i),
                                p = we(f),
                                u = we(c);
                            t.modifiersData[n] = {
                                referenceClippingOffsets: f,
                                popperEscapeOffsets: c,
                                isReferenceHidden: p,
                                hasPopperEscaped: u
                            }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
                                "data-popper-reference-hidden": p,
                                "data-popper-escaped": u
                            })
                        }
                    }]
                }),
                Oe = n(94780),
                Ee = n(78385),
                je = n(34867);

            function Pe(e) {
                return (0, je.Z)("MuiPopperUnstyled", e)
            }(0, n(1588).Z)("MuiPopperUnstyled", ["root"]);
            var De = n(24349),
                ke = n(85893);
            const Ae = ["anchorEl", "children", "component", "direction", "disablePortal", "modifiers", "open", "ownerState", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps"],
                Re = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition"];

            function Me(e) {
                return "function" === typeof e ? e() : e
            }
            const Le = {},
                We = i.forwardRef((function(e, t) {
                    var n;
                    const {
                        anchorEl: f,
                        children: c,
                        component: p,
                        direction: u,
                        disablePortal: l,
                        modifiers: d,
                        open: m,
                        ownerState: h,
                        placement: v,
                        popperOptions: y,
                        popperRef: g,
                        slotProps: b = {},
                        slots: w = {},
                        TransitionProps: x
                    } = e, O = (0, o.Z)(e, Ae), E = i.useRef(null), j = (0, a.Z)(E, t), P = i.useRef(null), D = (0, a.Z)(P, g), k = i.useRef(D);
                    (0, s.Z)((() => {
                        k.current = D
                    }), [D]), i.useImperativeHandle(g, (() => P.current), []);
                    const A = function(e, t) {
                            if ("ltr" === t) return e;
                            switch (e) {
                                case "bottom-end":
                                    return "bottom-start";
                                case "bottom-start":
                                    return "bottom-end";
                                case "top-end":
                                    return "top-start";
                                case "top-start":
                                    return "top-end";
                                default:
                                    return e
                            }
                        }(v, u),
                        [R, M] = i.useState(A);
                    i.useEffect((() => {
                        P.current && P.current.forceUpdate()
                    })), (0, s.Z)((() => {
                        if (!f || !m) return;
                        Me(f);
                        let e = [{
                            name: "preventOverflow",
                            options: {
                                altBoundary: l
                            }
                        }, {
                            name: "flip",
                            options: {
                                altBoundary: l
                            }
                        }, {
                            name: "onUpdate",
                            enabled: !0,
                            phase: "afterWrite",
                            fn: ({
                                state: e
                            }) => {
                                M(e.placement)
                            }
                        }];
                        null != d && (e = e.concat(d)), y && null != y.modifiers && (e = e.concat(y.modifiers));
                        const t = xe(Me(f), E.current, (0, r.Z)({
                            placement: A
                        }, y, {
                            modifiers: e
                        }));
                        return k.current(t), () => {
                            t.destroy(), k.current(null)
                        }
                    }), [f, l, d, m, y, A]);
                    const L = {
                        placement: R
                    };
                    null !== x && (L.TransitionProps = x);
                    const W = (0, Oe.Z)({
                            root: ["root"]
                        }, Pe, {}),
                        T = null != (n = null != p ? p : w.root) ? n : "div",
                        B = (0, De.Z)({
                            elementType: T,
                            externalSlotProps: b.root,
                            externalForwardedProps: O,
                            additionalProps: {
                                role: "tooltip",
                                ref: j
                            },
                            ownerState: (0, r.Z)({}, e, h),
                            className: W.root
                        });
                    return (0, ke.jsx)(T, (0, r.Z)({}, B, {
                        children: "function" === typeof c ? c(L) : c
                    }))
                }));
            var Te = i.forwardRef((function(e, t) {
                const {
                    anchorEl: n,
                    children: a,
                    container: s,
                    direction: c = "ltr",
                    disablePortal: p = !1,
                    keepMounted: u = !1,
                    modifiers: l,
                    open: d,
                    placement: m = "bottom",
                    popperOptions: h = Le,
                    popperRef: v,
                    style: y,
                    transition: g = !1
                } = e, b = (0, o.Z)(e, Re), [w, x] = i.useState(!0);
                if (!u && !d && (!g || w)) return null;
                const O = s || (n ? (0, f.Z)(Me(n)).body : void 0);
                return (0, ke.jsx)(Ee.Z, {
                    disablePortal: p,
                    container: O,
                    children: (0, ke.jsx)(We, (0, r.Z)({
                        anchorEl: n,
                        direction: c,
                        disablePortal: p,
                        modifiers: l,
                        ref: t,
                        open: g ? !w : d,
                        placement: m,
                        popperOptions: h,
                        popperRef: v
                    }, b, {
                        style: (0, r.Z)({
                            position: "fixed",
                            top: 0,
                            left: 0,
                            display: d || !u || g && !w ? null : "none"
                        }, y),
                        TransitionProps: g ? { in: d,
                            onEnter: () => {
                                x(!1)
                            },
                            onExited: () => {
                                x(!0)
                            }
                        } : null,
                        children: a
                    }))
                })
            }))
        },
        57579: function(e, t, n) {
            var r;
            n.d(t, {
                Z: function() {
                    return s
                }
            });
            var o = n(67294);
            let i = 0;
            const a = (r || (r = n.t(o, 2))).useId;

            function s(e) {
                if (void 0 !== a) {
                    const t = a();
                    return null != e ? e : t
                }
                return function(e) {
                    const [t, n] = o.useState(e), r = e || t;
                    return o.useEffect((() => {
                        null == t && (i += 1, n(`mui-${i}`))
                    }), [t]), r
                }(e)
            }
        }
    }
]);