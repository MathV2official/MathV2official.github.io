! function(t) {
    var e = {};

    function i(n) {
        if (e[n]) return e[n].exports;
        var r = e[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(r.exports, r, r.exports, i), r.l = !0, r.exports
    }
    i.m = t, i.c = e, i.d = function(t, e, n) {
        i.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: n
        })
    }, i.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, i.t = function(t, e) {
        if (1 & e && (t = i(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (i.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var r in t) i.d(n, r, function(e) {
                return t[e]
            }.bind(null, r));
        return n
    }, i.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return i.d(e, "a", e), e
    }, i.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, i.p = "", i(i.s = 74)
}([function(t, e, i) {
    var n = i(26)("wks"),
        r = i(27),
        o = i(1).Symbol,
        a = "function" == typeof o;
    (t.exports = function(t) {
        return n[t] || (n[t] = a && o[t] || (a ? o : r)("Symbol." + t))
    }).store = n
}, function(t, e) {
    var i = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = i)
}, function(t, e) {
    var i = t.exports = {
        version: "2.4.0"
    };
    "number" == typeof __e && (__e = i)
}, function(t, e, i) {
    var n = i(9),
        r = i(22);
    t.exports = i(5) ? function(t, e, i) {
        return n.f(t, e, r(1, i))
    } : function(t, e, i) {
        return t[e] = i, t
    }
}, function(t, e, i) {
    var n = i(10);
    t.exports = function(t) {
        if (!n(t)) throw TypeError(t + " is not an object!");
        return t
    }
}, function(t, e, i) {
    t.exports = !i(15)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(t, e) {
    t.exports = {}
}, function(t, e, i) {
    "use strict";
    e.a = function() {
        return window.location.href
    }
}, function(t, e, i) {
    var n = i(14);
    t.exports = function(t, e, i) {
        if (n(t), void 0 === e) return t;
        switch (i) {
            case 1:
                return function(i) {
                    return t.call(e, i)
                };
            case 2:
                return function(i, n) {
                    return t.call(e, i, n)
                };
            case 3:
                return function(i, n, r) {
                    return t.call(e, i, n, r)
                }
        }
        return function() {
            return t.apply(e, arguments)
        }
    }
}, function(t, e, i) {
    var n = i(4),
        r = i(38),
        o = i(39),
        a = Object.defineProperty;
    e.f = i(5) ? Object.defineProperty : function(t, e, i) {
        if (n(t), e = o(e, !0), n(i), r) try {
            return a(t, e, i)
        } catch (t) {}
        if ("get" in i || "set" in i) throw TypeError("Accessors not supported!");
        return "value" in i && (t[e] = i.value), t
    }
}, function(t, e) {
    t.exports = function(t) {
        return "object" == typeof t ? null !== t : "function" == typeof t
    }
}, function(t, e) {
    var i = {}.hasOwnProperty;
    t.exports = function(t, e) {
        return i.call(t, e)
    }
}, function(t, e) {
    var i = {}.toString;
    t.exports = function(t) {
        return i.call(t).slice(8, -1)
    }
}, function(t, e, i) {
    var n = i(1),
        r = i(2),
        o = i(8),
        a = i(3),
        s = function(t, e, i) {
            var A, d, c, u = t & s.F,
                p = t & s.G,
                l = t & s.S,
                h = t & s.P,
                f = t & s.B,
                m = t & s.W,
                g = p ? r : r[e] || (r[e] = {}),
                v = g.prototype,
                y = p ? n : l ? n[e] : (n[e] || {}).prototype;
            for (A in p && (i = e), i)(d = !u && y && void 0 !== y[A]) && A in g || (c = d ? y[A] : i[A], g[A] = p && "function" != typeof y[A] ? i[A] : f && d ? o(c, n) : m && y[A] == c ? function(t) {
                var e = function(e, i, n) {
                    if (this instanceof t) {
                        switch (arguments.length) {
                            case 0:
                                return new t;
                            case 1:
                                return new t(e);
                            case 2:
                                return new t(e, i)
                        }
                        return new t(e, i, n)
                    }
                    return t.apply(this, arguments)
                };
                return e.prototype = t.prototype, e
            }(c) : h && "function" == typeof c ? o(Function.call, c) : c, h && ((g.virtual || (g.virtual = {}))[A] = c, t & s.R && v && !v[A] && a(v, A, c)))
        };
    s.F = 1, s.G = 2, s.S = 4, s.P = 8, s.B = 16, s.W = 32, s.U = 64, s.R = 128, t.exports = s
}, function(t, e) {
    t.exports = function(t) {
        if ("function" != typeof t) throw TypeError(t + " is not a function!");
        return t
    }
}, function(t, e) {
    t.exports = function(t) {
        try {
            return !!t()
        } catch (t) {
            return !0
        }
    }
}, function(t, e, i) {
    var n = i(10),
        r = i(1).document,
        o = n(r) && n(r.createElement);
    t.exports = function(t) {
        return o ? r.createElement(t) : {}
    }
}, function(t, e, i) {
    var n = i(24),
        r = i(18);
    t.exports = function(t) {
        return n(r(t))
    }
}, function(t, e) {
    t.exports = function(t) {
        if (void 0 == t) throw TypeError("Can't call method on  " + t);
        return t
    }
}, function(t, e) {
    var i = Math.ceil,
        n = Math.floor;
    t.exports = function(t) {
        return isNaN(t = +t) ? 0 : (t > 0 ? n : i)(t)
    }
}, function(t, e, i) {
    var n = i(26)("keys"),
        r = i(27);
    t.exports = function(t) {
        return n[t] || (n[t] = r(t))
    }
}, function(t, e, i) {
    var n = i(9).f,
        r = i(11),
        o = i(0)("toStringTag");
    t.exports = function(t, e, i) {
        t && !r(t = i ? t : t.prototype, o) && n(t, o, {
            configurable: !0,
            value: e
        })
    }
}, function(t, e) {
    t.exports = function(t, e) {
        return {
            enumerable: !(1 & t),
            configurable: !(2 & t),
            writable: !(4 & t),
            value: e
        }
    }
}, function(t, e, i) {
    var n = i(41),
        r = i(28);
    t.exports = Object.keys || function(t) {
        return n(t, r)
    }
}, function(t, e, i) {
    var n = i(12);
    t.exports = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
        return "String" == n(t) ? t.split("") : Object(t)
    }
}, function(t, e, i) {
    var n = i(19),
        r = Math.min;
    t.exports = function(t) {
        return t > 0 ? r(n(t), 9007199254740991) : 0
    }
}, function(t, e, i) {
    var n = i(1),
        r = n["__core-js_shared__"] || (n["__core-js_shared__"] = {});
    t.exports = function(t) {
        return r[t] || (r[t] = {})
    }
}, function(t, e) {
    var i = 0,
        n = Math.random();
    t.exports = function(t) {
        return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++i + n).toString(36))
    }
}, function(t, e) {
    t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}, function(t, e, i) {
    var n = i(18);
    t.exports = function(t) {
        return Object(n(t))
    }
}, function(t, e, i) {
    "use strict";
    var n = i(31),
        r = i(13),
        o = i(49),
        a = i(3),
        s = i(11),
        A = i(6),
        d = i(50),
        c = i(21),
        u = i(53),
        p = i(0)("iterator"),
        l = !([].keys && "next" in [].keys()),
        h = function() {
            return this
        };
    t.exports = function(t, e, i, f, m, g, v) {
        d(i, e, f);
        var y, b, k, E = function(t) {
                if (!l && t in S) return S[t];
                switch (t) {
                    case "keys":
                    case "values":
                        return function() {
                            return new i(this, t)
                        }
                }
                return function() {
                    return new i(this, t)
                }
            },
            w = e + " Iterator",
            T = "values" == m,
            C = !1,
            S = t.prototype,
            I = S[p] || S["@@iterator"] || m && S[m],
            P = I || E(m),
            B = m ? T ? E("entries") : P : void 0,
            R = "Array" == e && S.entries || I;
        if (R && (k = u(R.call(new t))) !== Object.prototype && (c(k, w, !0), n || s(k, p) || a(k, p, h)), T && I && "values" !== I.name && (C = !0, P = function() {
                return I.call(this)
            }), n && !v || !l && !C && S[p] || a(S, p, P), A[e] = P, A[w] = h, m)
            if (y = {
                    values: T ? P : E("values"),
                    keys: g ? P : E("keys"),
                    entries: B
                }, v)
                for (b in y) b in S || o(S, b, y[b]);
            else r(r.P + r.F * (l || C), e, y);
        return y
    }
}, function(t, e) {
    t.exports = !0
}, function(t, e, i) {
    t.exports = i(1).document && document.documentElement
}, function(t, e, i) {
    var n = i(12),
        r = i(0)("toStringTag"),
        o = "Arguments" == n(function() {
            return arguments
        }());
    t.exports = function(t) {
        var e, i, a;
        return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof(i = function(t, e) {
            try {
                return t[e]
            } catch (t) {}
        }(e = Object(t), r)) ? i : o ? n(e) : "Object" == (a = n(e)) && "function" == typeof e.callee ? "Arguments" : a
    }
}, function(t, e, i) {
    var n, r, o, a = i(8),
        s = i(65),
        A = i(32),
        d = i(16),
        c = i(1),
        u = c.process,
        p = c.setImmediate,
        l = c.clearImmediate,
        h = c.MessageChannel,
        f = 0,
        m = {},
        g = function() {
            var t = +this;
            if (m.hasOwnProperty(t)) {
                var e = m[t];
                delete m[t], e()
            }
        },
        v = function(t) {
            g.call(t.data)
        };
    p && l || (p = function(t) {
        for (var e = [], i = 1; arguments.length > i;) e.push(arguments[i++]);
        return m[++f] = function() {
            s("function" == typeof t ? t : Function(t), e)
        }, n(f), f
    }, l = function(t) {
        delete m[t]
    }, "process" == i(12)(u) ? n = function(t) {
        u.nextTick(a(g, t, 1))
    } : h ? (o = (r = new h).port2, r.port1.onmessage = v, n = a(o.postMessage, o, 1)) : c.addEventListener && "function" == typeof postMessage && !c.importScripts ? (n = function(t) {
        c.postMessage(t + "", "*")
    }, c.addEventListener("message", v, !1)) : n = "onreadystatechange" in d("script") ? function(t) {
        A.appendChild(d("script")).onreadystatechange = function() {
            A.removeChild(this), g.call(t)
        }
    } : function(t) {
        setTimeout(a(g, t, 1), 0)
    }), t.exports = {
        set: p,
        clear: l
    }
}, function(t, e, i) {
    i(37), t.exports = i(2).Object.assign
}, function(t, e, i) {
    i(46), i(47), i(54), i(58), t.exports = i(2).Promise
}, function(t, e, i) {
    var n = i(13);
    n(n.S + n.F, "Object", {
        assign: i(40)
    })
}, function(t, e, i) {
    t.exports = !i(5) && !i(15)(function() {
        return 7 != Object.defineProperty(i(16)("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(t, e, i) {
    var n = i(10);
    t.exports = function(t, e) {
        if (!n(t)) return t;
        var i, r;
        if (e && "function" == typeof(i = t.toString) && !n(r = i.call(t))) return r;
        if ("function" == typeof(i = t.valueOf) && !n(r = i.call(t))) return r;
        if (!e && "function" == typeof(i = t.toString) && !n(r = i.call(t))) return r;
        throw TypeError("Can't convert object to primitive value")
    }
}, function(t, e, i) {
    "use strict";
    var n = i(23),
        r = i(44),
        o = i(45),
        a = i(29),
        s = i(24),
        A = Object.assign;
    t.exports = !A || i(15)(function() {
        var t = {},
            e = {},
            i = Symbol(),
            n = "abcdefghijklmnopqrst";
        return t[i] = 7, n.split("").forEach(function(t) {
            e[t] = t
        }), 7 != A({}, t)[i] || Object.keys(A({}, e)).join("") != n
    }) ? function(t, e) {
        for (var i = a(t), A = arguments.length, d = 1, c = r.f, u = o.f; A > d;)
            for (var p, l = s(arguments[d++]), h = c ? n(l).concat(c(l)) : n(l), f = h.length, m = 0; f > m;) u.call(l, p = h[m++]) && (i[p] = l[p]);
        return i
    } : A
}, function(t, e, i) {
    var n = i(11),
        r = i(17),
        o = i(42)(!1),
        a = i(20)("IE_PROTO");
    t.exports = function(t, e) {
        var i, s = r(t),
            A = 0,
            d = [];
        for (i in s) i != a && n(s, i) && d.push(i);
        for (; e.length > A;) n(s, i = e[A++]) && (~o(d, i) || d.push(i));
        return d
    }
}, function(t, e, i) {
    var n = i(17),
        r = i(25),
        o = i(43);
    t.exports = function(t) {
        return function(e, i, a) {
            var s, A = n(e),
                d = r(A.length),
                c = o(a, d);
            if (t && i != i) {
                for (; d > c;)
                    if ((s = A[c++]) != s) return !0
            } else
                for (; d > c; c++)
                    if ((t || c in A) && A[c] === i) return t || c || 0;
            return !t && -1
        }
    }
}, function(t, e, i) {
    var n = i(19),
        r = Math.max,
        o = Math.min;
    t.exports = function(t, e) {
        return (t = n(t)) < 0 ? r(t + e, 0) : o(t, e)
    }
}, function(t, e) {
    e.f = Object.getOwnPropertySymbols
}, function(t, e) {
    e.f = {}.propertyIsEnumerable
}, function(t, e) {}, function(t, e, i) {
    "use strict";
    var n = i(48)(!0);
    i(30)(String, "String", function(t) {
        this._t = String(t), this._i = 0
    }, function() {
        var t, e = this._t,
            i = this._i;
        return i >= e.length ? {
            value: void 0,
            done: !0
        } : (t = n(e, i), this._i += t.length, {
            value: t,
            done: !1
        })
    })
}, function(t, e, i) {
    var n = i(19),
        r = i(18);
    t.exports = function(t) {
        return function(e, i) {
            var o, a, s = String(r(e)),
                A = n(i),
                d = s.length;
            return A < 0 || A >= d ? t ? "" : void 0 : (o = s.charCodeAt(A)) < 55296 || o > 56319 || A + 1 === d || (a = s.charCodeAt(A + 1)) < 56320 || a > 57343 ? t ? s.charAt(A) : o : t ? s.slice(A, A + 2) : a - 56320 + (o - 55296 << 10) + 65536
        }
    }
}, function(t, e, i) {
    t.exports = i(3)
}, function(t, e, i) {
    "use strict";
    var n = i(51),
        r = i(22),
        o = i(21),
        a = {};
    i(3)(a, i(0)("iterator"), function() {
        return this
    }), t.exports = function(t, e, i) {
        t.prototype = n(a, {
            next: r(1, i)
        }), o(t, e + " Iterator")
    }
}, function(t, e, i) {
    var n = i(4),
        r = i(52),
        o = i(28),
        a = i(20)("IE_PROTO"),
        s = function() {},
        A = function() {
            var t, e = i(16)("iframe"),
                n = o.length;
            for (e.style.display = "none", i(32).appendChild(e), e.src = "javascript:", (t = e.contentWindow.document).open(), t.write("<script>document.F=Object<\/script>"), t.close(), A = t.F; n--;) delete A.prototype[o[n]];
            return A()
        };
    t.exports = Object.create || function(t, e) {
        var i;
        return null !== t ? (s.prototype = n(t), i = new s, s.prototype = null, i[a] = t) : i = A(), void 0 === e ? i : r(i, e)
    }
}, function(t, e, i) {
    var n = i(9),
        r = i(4),
        o = i(23);
    t.exports = i(5) ? Object.defineProperties : function(t, e) {
        r(t);
        for (var i, a = o(e), s = a.length, A = 0; s > A;) n.f(t, i = a[A++], e[i]);
        return t
    }
}, function(t, e, i) {
    var n = i(11),
        r = i(29),
        o = i(20)("IE_PROTO"),
        a = Object.prototype;
    t.exports = Object.getPrototypeOf || function(t) {
        return t = r(t), n(t, o) ? t[o] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? a : null
    }
}, function(t, e, i) {
    i(55);
    for (var n = i(1), r = i(3), o = i(6), a = i(0)("toStringTag"), s = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], A = 0; A < 5; A++) {
        var d = s[A],
            c = n[d],
            u = c && c.prototype;
        u && !u[a] && r(u, a, d), o[d] = o.Array
    }
}, function(t, e, i) {
    "use strict";
    var n = i(56),
        r = i(57),
        o = i(6),
        a = i(17);
    t.exports = i(30)(Array, "Array", function(t, e) {
        this._t = a(t), this._i = 0, this._k = e
    }, function() {
        var t = this._t,
            e = this._k,
            i = this._i++;
        return !t || i >= t.length ? (this._t = void 0, r(1)) : r(0, "keys" == e ? i : "values" == e ? t[i] : [i, t[i]])
    }, "values"), o.Arguments = o.Array, n("keys"), n("values"), n("entries")
}, function(t, e) {
    t.exports = function() {}
}, function(t, e) {
    t.exports = function(t, e) {
        return {
            value: e,
            done: !!t
        }
    }
}, function(t, e, i) {
    "use strict";
    var n, r, o, a = i(31),
        s = i(1),
        A = i(8),
        d = i(33),
        c = i(13),
        u = i(10),
        p = i(14),
        l = i(59),
        h = i(60),
        f = i(64),
        m = i(34).set,
        g = i(66)(),
        v = s.TypeError,
        y = s.process,
        b = s.Promise,
        k = "process" == d(y = s.process),
        E = function() {},
        w = !! function() {
            try {
                var t = b.resolve(1),
                    e = (t.constructor = {})[i(0)("species")] = function(t) {
                        t(E, E)
                    };
                return (k || "function" == typeof PromiseRejectionEvent) && t.then(E) instanceof e
            } catch (t) {}
        }(),
        T = function(t, e) {
            return t === e || t === b && e === o
        },
        C = function(t) {
            var e;
            return !(!u(t) || "function" != typeof(e = t.then)) && e
        },
        S = function(t) {
            return T(b, t) ? new I(t) : new r(t)
        },
        I = r = function(t) {
            var e, i;
            this.promise = new t(function(t, n) {
                if (void 0 !== e || void 0 !== i) throw v("Bad Promise constructor");
                e = t, i = n
            }), this.resolve = p(e), this.reject = p(i)
        },
        P = function(t) {
            try {
                t()
            } catch (t) {
                return {
                    error: t
                }
            }
        },
        B = function(t, e) {
            if (!t._n) {
                t._n = !0;
                var i = t._c;
                g(function() {
                    for (var n = t._v, r = 1 == t._s, o = 0, a = function(e) {
                            var i, o, a = r ? e.ok : e.fail,
                                s = e.resolve,
                                A = e.reject,
                                d = e.domain;
                            try {
                                a ? (r || (2 == t._h && L(t), t._h = 1), !0 === a ? i = n : (d && d.enter(), i = a(n), d && d.exit()), i === e.promise ? A(v("Promise-chain cycle")) : (o = C(i)) ? o.call(i, s, A) : s(i)) : A(n)
                            } catch (t) {
                                A(t)
                            }
                        }; i.length > o;) a(i[o++]);
                    t._c = [], t._n = !1, e && !t._h && R(t)
                })
            }
        },
        R = function(t) {
            m.call(s, function() {
                var e, i, n, r = t._v;
                if (D(t) && (e = P(function() {
                        k ? y.emit("unhandledRejection", r, t) : (i = s.onunhandledrejection) ? i({
                            promise: t,
                            reason: r
                        }) : (n = s.console) && n.error && n.error("Unhandled promise rejection", r)
                    }), t._h = k || D(t) ? 2 : 1), t._a = void 0, e) throw e.error
            })
        },
        D = function(t) {
            if (1 == t._h) return !1;
            for (var e, i = t._a || t._c, n = 0; i.length > n;)
                if ((e = i[n++]).fail || !D(e.promise)) return !1;
            return !0
        },
        L = function(t) {
            m.call(s, function() {
                var e;
                k ? y.emit("rejectionHandled", t) : (e = s.onrejectionhandled) && e({
                    promise: t,
                    reason: t._v
                })
            })
        },
        x = function(t) {
            var e = this;
            e._d || (e._d = !0, (e = e._w || e)._v = t, e._s = 2, e._a || (e._a = e._c.slice()), B(e, !0))
        },
        _ = function(t) {
            var e, i = this;
            if (!i._d) {
                i._d = !0, i = i._w || i;
                try {
                    if (i === t) throw v("Promise can't be resolved itself");
                    (e = C(t)) ? g(function() {
                        var n = {
                            _w: i,
                            _d: !1
                        };
                        try {
                            e.call(t, A(_, n, 1), A(x, n, 1))
                        } catch (t) {
                            x.call(n, t)
                        }
                    }): (i._v = t, i._s = 1, B(i, !1))
                } catch (t) {
                    x.call({
                        _w: i,
                        _d: !1
                    }, t)
                }
            }
        };
    w || (b = function(t) {
        l(this, b, "Promise", "_h"), p(t), n.call(this);
        try {
            t(A(_, this, 1), A(x, this, 1))
        } catch (t) {
            x.call(this, t)
        }
    }, (n = function(t) {
        this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1
    }).prototype = i(67)(b.prototype, {
        then: function(t, e) {
            var i = S(f(this, b));
            return i.ok = "function" != typeof t || t, i.fail = "function" == typeof e && e, i.domain = k ? y.domain : void 0, this._c.push(i), this._a && this._a.push(i), this._s && B(this, !1), i.promise
        },
        catch: function(t) {
            return this.then(void 0, t)
        }
    }), I = function() {
        var t = new n;
        this.promise = t, this.resolve = A(_, t, 1), this.reject = A(x, t, 1)
    }), c(c.G + c.W + c.F * !w, {
        Promise: b
    }), i(21)(b, "Promise"), i(68)("Promise"), o = i(2).Promise, c(c.S + c.F * !w, "Promise", {
        reject: function(t) {
            var e = S(this);
            return (0, e.reject)(t), e.promise
        }
    }), c(c.S + c.F * (a || !w), "Promise", {
        resolve: function(t) {
            if (t instanceof b && T(t.constructor, this)) return t;
            var e = S(this);
            return (0, e.resolve)(t), e.promise
        }
    }), c(c.S + c.F * !(w && i(69)(function(t) {
        b.all(t).catch(E)
    })), "Promise", {
        all: function(t) {
            var e = this,
                i = S(e),
                n = i.resolve,
                r = i.reject,
                o = P(function() {
                    var i = [],
                        o = 0,
                        a = 1;
                    h(t, !1, function(t) {
                        var s = o++,
                            A = !1;
                        i.push(void 0), a++, e.resolve(t).then(function(t) {
                            A || (A = !0, i[s] = t, --a || n(i))
                        }, r)
                    }), --a || n(i)
                });
            return o && r(o.error), i.promise
        },
        race: function(t) {
            var e = this,
                i = S(e),
                n = i.reject,
                r = P(function() {
                    h(t, !1, function(t) {
                        e.resolve(t).then(i.resolve, n)
                    })
                });
            return r && n(r.error), i.promise
        }
    })
}, function(t, e) {
    t.exports = function(t, e, i, n) {
        if (!(t instanceof e) || void 0 !== n && n in t) throw TypeError(i + ": incorrect invocation!");
        return t
    }
}, function(t, e, i) {
    var n = i(8),
        r = i(61),
        o = i(62),
        a = i(4),
        s = i(25),
        A = i(63),
        d = {},
        c = {};
    (e = t.exports = function(t, e, i, u, p) {
        var l, h, f, m, g = p ? function() {
                return t
            } : A(t),
            v = n(i, u, e ? 2 : 1),
            y = 0;
        if ("function" != typeof g) throw TypeError(t + " is not iterable!");
        if (o(g)) {
            for (l = s(t.length); l > y; y++)
                if ((m = e ? v(a(h = t[y])[0], h[1]) : v(t[y])) === d || m === c) return m
        } else
            for (f = g.call(t); !(h = f.next()).done;)
                if ((m = r(f, v, h.value, e)) === d || m === c) return m
    }).BREAK = d, e.RETURN = c
}, function(t, e, i) {
    var n = i(4);
    t.exports = function(t, e, i, r) {
        try {
            return r ? e(n(i)[0], i[1]) : e(i)
        } catch (e) {
            var o = t.return;
            throw void 0 !== o && n(o.call(t)), e
        }
    }
}, function(t, e, i) {
    var n = i(6),
        r = i(0)("iterator"),
        o = Array.prototype;
    t.exports = function(t) {
        return void 0 !== t && (n.Array === t || o[r] === t)
    }
}, function(t, e, i) {
    var n = i(33),
        r = i(0)("iterator"),
        o = i(6);
    t.exports = i(2).getIteratorMethod = function(t) {
        if (void 0 != t) return t[r] || t["@@iterator"] || o[n(t)]
    }
}, function(t, e, i) {
    var n = i(4),
        r = i(14),
        o = i(0)("species");
    t.exports = function(t, e) {
        var i, a = n(t).constructor;
        return void 0 === a || void 0 == (i = n(a)[o]) ? e : r(i)
    }
}, function(t, e) {
    t.exports = function(t, e, i) {
        var n = void 0 === i;
        switch (e.length) {
            case 0:
                return n ? t() : t.call(i);
            case 1:
                return n ? t(e[0]) : t.call(i, e[0]);
            case 2:
                return n ? t(e[0], e[1]) : t.call(i, e[0], e[1]);
            case 3:
                return n ? t(e[0], e[1], e[2]) : t.call(i, e[0], e[1], e[2]);
            case 4:
                return n ? t(e[0], e[1], e[2], e[3]) : t.call(i, e[0], e[1], e[2], e[3])
        }
        return t.apply(i, e)
    }
}, function(t, e, i) {
    var n = i(1),
        r = i(34).set,
        o = n.MutationObserver || n.WebKitMutationObserver,
        a = n.process,
        s = n.Promise,
        A = "process" == i(12)(a);
    t.exports = function() {
        var t, e, i, d = function() {
            var n, r;
            for (A && (n = a.domain) && n.exit(); t;) {
                r = t.fn, t = t.next;
                try {
                    r()
                } catch (n) {
                    throw t ? i() : e = void 0, n
                }
            }
            e = void 0, n && n.enter()
        };
        if (A) i = function() {
            a.nextTick(d)
        };
        else if (o) {
            var c = !0,
                u = document.createTextNode("");
            new o(d).observe(u, {
                characterData: !0
            }), i = function() {
                u.data = c = !c
            }
        } else if (s && s.resolve) {
            var p = s.resolve();
            i = function() {
                p.then(d)
            }
        } else i = function() {
            r.call(n, d)
        };
        return function(n) {
            var r = {
                fn: n,
                next: void 0
            };
            e && (e.next = r), t || (t = r, i()), e = r
        }
    }
}, function(t, e, i) {
    var n = i(3);
    t.exports = function(t, e, i) {
        for (var r in e) i && t[r] ? t[r] = e[r] : n(t, r, e[r]);
        return t
    }
}, function(t, e, i) {
    "use strict";
    var n = i(1),
        r = i(2),
        o = i(9),
        a = i(5),
        s = i(0)("species");
    t.exports = function(t) {
        var e = "function" == typeof r[t] ? r[t] : n[t];
        a && e && !e[s] && o.f(e, s, {
            configurable: !0,
            get: function() {
                return this
            }
        })
    }
}, function(t, e, i) {
    var n = i(0)("iterator"),
        r = !1;
    try {
        var o = [7][n]();
        o.return = function() {
            r = !0
        }, Array.from(o, function() {
            throw 2
        })
    } catch (t) {}
    t.exports = function(t, e) {
        if (!e && !r) return !1;
        var i = !1;
        try {
            var o = [7],
                a = o[n]();
            a.next = function() {
                return {
                    done: i = !0
                }
            }, o[n] = function() {
                return a
            }, t(o)
        } catch (t) {}
        return i
    }
}, function(t, e) {
    ! function(t) {
        "use strict";
        if (!t.fetch) {
            var e = {
                searchParams: "URLSearchParams" in t,
                iterable: "Symbol" in t && "iterator" in Symbol,
                blob: "FileReader" in t && "Blob" in t && function() {
                    try {
                        return new Blob, !0
                    } catch (t) {
                        return !1
                    }
                }(),
                formData: "FormData" in t,
                arrayBuffer: "ArrayBuffer" in t
            };
            if (e.arrayBuffer) var i = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
                n = function(t) {
                    return t && DataView.prototype.isPrototypeOf(t)
                },
                r = ArrayBuffer.isView || function(t) {
                    return t && i.indexOf(Object.prototype.toString.call(t)) > -1
                };
            c.prototype.append = function(t, e) {
                t = s(t), e = A(e);
                var i = this.map[t];
                this.map[t] = i ? i + "," + e : e
            }, c.prototype.delete = function(t) {
                delete this.map[s(t)]
            }, c.prototype.get = function(t) {
                return t = s(t), this.has(t) ? this.map[t] : null
            }, c.prototype.has = function(t) {
                return this.map.hasOwnProperty(s(t))
            }, c.prototype.set = function(t, e) {
                this.map[s(t)] = A(e)
            }, c.prototype.forEach = function(t, e) {
                for (var i in this.map) this.map.hasOwnProperty(i) && t.call(e, this.map[i], i, this)
            }, c.prototype.keys = function() {
                var t = [];
                return this.forEach(function(e, i) {
                    t.push(i)
                }), d(t)
            }, c.prototype.values = function() {
                var t = [];
                return this.forEach(function(e) {
                    t.push(e)
                }), d(t)
            }, c.prototype.entries = function() {
                var t = [];
                return this.forEach(function(e, i) {
                    t.push([i, e])
                }), d(t)
            }, e.iterable && (c.prototype[Symbol.iterator] = c.prototype.entries);
            var o = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
            m.prototype.clone = function() {
                return new m(this, {
                    body: this._bodyInit
                })
            }, f.call(m.prototype), f.call(v.prototype), v.prototype.clone = function() {
                return new v(this._bodyInit, {
                    status: this.status,
                    statusText: this.statusText,
                    headers: new c(this.headers),
                    url: this.url
                })
            }, v.error = function() {
                var t = new v(null, {
                    status: 0,
                    statusText: ""
                });
                return t.type = "error", t
            };
            var a = [301, 302, 303, 307, 308];
            v.redirect = function(t, e) {
                if (-1 === a.indexOf(e)) throw new RangeError("Invalid status code");
                return new v(null, {
                    status: e,
                    headers: {
                        location: t
                    }
                })
            }, t.Headers = c, t.Request = m, t.Response = v, t.fetch = function(t, i) {
                return new Promise(function(n, r) {
                    var o = new m(t, i),
                        a = new XMLHttpRequest;
                    a.onload = function() {
                        var t, e, i = {
                            status: a.status,
                            statusText: a.statusText,
                            headers: (t = a.getAllResponseHeaders() || "", e = new c, t.split(/\r?\n/).forEach(function(t) {
                                var i = t.split(":"),
                                    n = i.shift().trim();
                                if (n) {
                                    var r = i.join(":").trim();
                                    e.append(n, r)
                                }
                            }), e)
                        };
                        i.url = "responseURL" in a ? a.responseURL : i.headers.get("X-Request-URL");
                        var r = "response" in a ? a.response : a.responseText;
                        n(new v(r, i))
                    }, a.onerror = function() {
                        r(new TypeError("Network request failed"))
                    }, a.ontimeout = function() {
                        r(new TypeError("Network request failed"))
                    }, a.open(o.method, o.url, !0), "include" === o.credentials && (a.withCredentials = !0), "responseType" in a && e.blob && (a.responseType = "blob"), o.headers.forEach(function(t, e) {
                        a.setRequestHeader(e, t)
                    }), a.send(void 0 === o._bodyInit ? null : o._bodyInit)
                })
            }, t.fetch.polyfill = !0
        }

        function s(t) {
            if ("string" != typeof t && (t = String(t)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");
            return t.toLowerCase()
        }

        function A(t) {
            return "string" != typeof t && (t = String(t)), t
        }

        function d(t) {
            var i = {
                next: function() {
                    var e = t.shift();
                    return {
                        done: void 0 === e,
                        value: e
                    }
                }
            };
            return e.iterable && (i[Symbol.iterator] = function() {
                return i
            }), i
        }

        function c(t) {
            this.map = {}, t instanceof c ? t.forEach(function(t, e) {
                this.append(e, t)
            }, this) : Array.isArray(t) ? t.forEach(function(t) {
                this.append(t[0], t[1])
            }, this) : t && Object.getOwnPropertyNames(t).forEach(function(e) {
                this.append(e, t[e])
            }, this)
        }

        function u(t) {
            if (t.bodyUsed) return Promise.reject(new TypeError("Already read"));
            t.bodyUsed = !0
        }

        function p(t) {
            return new Promise(function(e, i) {
                t.onload = function() {
                    e(t.result)
                }, t.onerror = function() {
                    i(t.error)
                }
            })
        }

        function l(t) {
            var e = new FileReader,
                i = p(e);
            return e.readAsArrayBuffer(t), i
        }

        function h(t) {
            if (t.slice) return t.slice(0);
            var e = new Uint8Array(t.byteLength);
            return e.set(new Uint8Array(t)), e.buffer
        }

        function f() {
            return this.bodyUsed = !1, this._initBody = function(t) {
                if (this._bodyInit = t, t)
                    if ("string" == typeof t) this._bodyText = t;
                    else if (e.blob && Blob.prototype.isPrototypeOf(t)) this._bodyBlob = t;
                else if (e.formData && FormData.prototype.isPrototypeOf(t)) this._bodyFormData = t;
                else if (e.searchParams && URLSearchParams.prototype.isPrototypeOf(t)) this._bodyText = t.toString();
                else if (e.arrayBuffer && e.blob && n(t)) this._bodyArrayBuffer = h(t.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer]);
                else {
                    if (!e.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(t) && !r(t)) throw new Error("unsupported BodyInit type");
                    this._bodyArrayBuffer = h(t)
                } else this._bodyText = "";
                this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : e.searchParams && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
            }, e.blob && (this.blob = function() {
                var t = u(this);
                if (t) return t;
                if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                return Promise.resolve(new Blob([this._bodyText]))
            }, this.arrayBuffer = function() {
                return this._bodyArrayBuffer ? u(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(l)
            }), this.text = function() {
                var t, e, i, n = u(this);
                if (n) return n;
                if (this._bodyBlob) return t = this._bodyBlob, e = new FileReader, i = p(e), e.readAsText(t), i;
                if (this._bodyArrayBuffer) return Promise.resolve(function(t) {
                    for (var e = new Uint8Array(t), i = new Array(e.length), n = 0; n < e.length; n++) i[n] = String.fromCharCode(e[n]);
                    return i.join("")
                }(this._bodyArrayBuffer));
                if (this._bodyFormData) throw new Error("could not read FormData body as text");
                return Promise.resolve(this._bodyText)
            }, e.formData && (this.formData = function() {
                return this.text().then(g)
            }), this.json = function() {
                return this.text().then(JSON.parse)
            }, this
        }

        function m(t, e) {
            var i, n, r = (e = e || {}).body;
            if (t instanceof m) {
                if (t.bodyUsed) throw new TypeError("Already read");
                this.url = t.url, this.credentials = t.credentials, e.headers || (this.headers = new c(t.headers)), this.method = t.method, this.mode = t.mode, r || null == t._bodyInit || (r = t._bodyInit, t.bodyUsed = !0)
            } else this.url = String(t);
            if (this.credentials = e.credentials || this.credentials || "omit", !e.headers && this.headers || (this.headers = new c(e.headers)), this.method = (i = e.method || this.method || "GET", n = i.toUpperCase(), o.indexOf(n) > -1 ? n : i), this.mode = e.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && r) throw new TypeError("Body not allowed for GET or HEAD requests");
            this._initBody(r)
        }

        function g(t) {
            var e = new FormData;
            return t.trim().split("&").forEach(function(t) {
                if (t) {
                    var i = t.split("="),
                        n = i.shift().replace(/\+/g, " "),
                        r = i.join("=").replace(/\+/g, " ");
                    e.append(decodeURIComponent(n), decodeURIComponent(r))
                }
            }), e
        }

        function v(t, e) {
            e || (e = {}), this.type = "default", this.status = "status" in e ? e.status : 200, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in e ? e.statusText : "OK", this.headers = new c(e.headers), this.url = e.url || "", this._initBody(t)
        }
    }("undefined" != typeof self ? self : this)
}, function(t, e) { /*!@source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
    "document" in window.self && ("classList" in document.createElement("_") && (!document.createElementNS || "classList" in document.createElementNS("http://www.w3.org/2000/svg", "g")) || function(t) {
        "use strict";
        if ("Element" in t) {
            var e = t.Element.prototype,
                i = Object,
                n = String.prototype.trim || function() {
                    return this.replace(/^\s+|\s+$/g, "")
                },
                r = Array.prototype.indexOf || function(t) {
                    for (var e = 0, i = this.length; e < i; e++)
                        if (e in this && this[e] === t) return e;
                    return -1
                },
                o = function(t, e) {
                    this.name = t, this.code = DOMException[t], this.message = e
                },
                a = function(t, e) {
                    if ("" === e) throw new o("SYNTAX_ERR", "An invalid or illegal string was specified");
                    if (/\s/.test(e)) throw new o("INVALID_CHARACTER_ERR", "String contains an invalid character");
                    return r.call(t, e)
                },
                s = function(t) {
                    for (var e = n.call(t.getAttribute("class") || ""), i = e ? e.split(/\s+/) : [], r = 0, o = i.length; r < o; r++) this.push(i[r]);
                    this._updateClassName = function() {
                        t.setAttribute("class", this.toString())
                    }
                },
                A = s.prototype = [],
                d = function() {
                    return new s(this)
                };
            if (o.prototype = Error.prototype, A.item = function(t) {
                    return this[t] || null
                }, A.contains = function(t) {
                    return -1 !== a(this, t += "")
                }, A.add = function() {
                    var t, e = arguments,
                        i = 0,
                        n = e.length,
                        r = !1;
                    do {
                        t = e[i] + "", -1 === a(this, t) && (this.push(t), r = !0)
                    } while (++i < n);
                    r && this._updateClassName()
                }, A.remove = function() {
                    var t, e, i = arguments,
                        n = 0,
                        r = i.length,
                        o = !1;
                    do {
                        for (t = i[n] + "", e = a(this, t); - 1 !== e;) this.splice(e, 1), o = !0, e = a(this, t)
                    } while (++n < r);
                    o && this._updateClassName()
                }, A.toggle = function(t, e) {
                    t += "";
                    var i = this.contains(t),
                        n = i ? !0 !== e && "remove" : !1 !== e && "add";
                    return n && this[n](t), !0 === e || !1 === e ? e : !i
                }, A.toString = function() {
                    return this.join(" ")
                }, i.defineProperty) {
                var c = {
                    get: d,
                    enumerable: !0,
                    configurable: !0
                };
                try {
                    i.defineProperty(e, "classList", c)
                } catch (t) {
                    void 0 !== t.number && -2146823252 !== t.number || (c.enumerable = !1, i.defineProperty(e, "classList", c))
                }
            } else i.prototype.__defineGetter__ && e.__defineGetter__("classList", d)
        }
    }(window.self), function() {
        "use strict";
        var t = document.createElement("_");
        if (t.classList.add("c1", "c2"), !t.classList.contains("c2")) {
            var e = function(t) {
                var e = DOMTokenList.prototype[t];
                DOMTokenList.prototype[t] = function(t) {
                    var i, n = arguments.length;
                    for (i = 0; i < n; i++) t = arguments[i], e.call(this, t)
                }
            };
            e("add"), e("remove")
        }
        if (t.classList.toggle("c3", !1), t.classList.contains("c3")) {
            var i = DOMTokenList.prototype.toggle;
            DOMTokenList.prototype.toggle = function(t, e) {
                return 1 in arguments && !this.contains(t) == !e ? e : i.call(this, t)
            }
        }
        t = null
    }())
}, , , function(t, e, i) {
    "use strict";
    i.r(e);
    var n = i(35),
        r = i.n(n),
        o = i(36),
        a = i.n(o);
    i(70), i(71);
    void 0 === Object.assign && (Object.assign = r.a), "undefined" == typeof Promise && (window.Promise = a.a);
    var s = {
            ready: "pokiAppReady",
            uninitialized: "pokiAppUninitialized",
            adblocked: "pokiAppAdblocked",
            ads: {
                completed: "pokiAdsCompleted",
                error: "pokiAdsError",
                adblocked: "pokiAdsAdBlocked",
                impression: "pokiAdsImpression",
                durationChange: "pokiAdsDurationChange",
                limit: "pokiAdsLimit",
                ready: "pokiAdsReady",
                requested: "pokiAdsRequested",
                skipped: "pokiAdsSkipped",
                started: "pokiAdsStarted",
                stopped: "pokiAdsStopped",
                update: "pokiAdsUpdate",
                paused: "pokiAdsPaused",
                resumed: "pokiAdsResumed",
                rewarded: "pokiAdsRewarded",
                busy: "pokiAdsBusy",
                position: {
                    preroll: "PP",
                    midroll: "PM",
                    rewarded: "PR"
                },
                video: {
                    clicked: "pokiVideoAdsClicked",
                    firstQuartile: "pokiVideoAdsFirstQuartile",
                    midPoint: "pokiVideoAdsMidPoint",
                    thirdQuartile: "pokiVideoAdsThirdQuartile",
                    userClose: "pokiVideoAdsUserClose",
                    error: "pokiVideoAdsError"
                },
                timings: {
                    timePerTry: "pokiAdsTimePerTry",
                    timeBetweenAds: "pokiAdsTimeBetweenAds",
                    startAdsAfter: "pokiAdsStartAdsAfter"
                },
                type: {
                    video: "pokiAdsTypeVideo",
                    display: "pokiAdsTypeDisplay"
                },
                raw: "rawIMAEvent",
                rawError: "rawIMAErrorEvent"
            },
            info: {
                messages: {
                    timeLimit: "The ad-request was not processed, because of a time constraint",
                    prerollLimit: "The ad-request was cancelled, because we're not allowed to show a preroll"
                }
            },
            message: {
                event: "pokiMessageEvent",
                gameState: "pokiMessageGameState",
                sdkDetails: "pokiMessageSdkDetails",
                toggleProgrammaticAds: "pokiMessageToggleProgrammaticAds"
            },
            tracking: {
                custom: "pokiTrackingCustom",
                setPlayerAge: "pokiTrackingSetPlayerAge",
                togglePlayerAdvertisingConsent: "pokiTrackingTogglePlayerAdvertisingConsent",
                screen: {
                    gameplayStart: "pokiTrackingScreenGameplayStart",
                    gameplayStop: "pokiTrackingScreenGameplayStop",
                    gameLoadingStarted: "pokiTrackingScreenGameLoadingStarted",
                    gameLoadingProgress: "pokiTrackingScreenGameLoadingProgress",
                    gameLoadingFinished: "pokiTrackingScreenGameLoadingFinished",
                    commercialBreak: "pokiTrackingScreenCommercialBreak",
                    rewardedBreak: "pokiTrackingScreenRewardedBreak",
                    happyTime: "pokiTrackingScreenHappyTime",
                    firstRound: "pokiTrackingScreenFirstRound",
                    roundStart: "pokiTrackingScreenRoundStart",
                    roundEnd: "pokiTrackingScreenRoundEnd"
                },
                sdk: {
                    status: {
                        initialized: "pokiTrackingSdkStatusInitialized",
                        failed: "pokiTrackingSdkStatusFailed"
                    }
                },
                ads: {
                    status: {
                        busy: "pokiTrackingAdsStatusBusy",
                        completed: "pokiTrackingAdsStatusCompleted",
                        error: "pokiTrackingAdsStatusError",
                        impression: "pokiTrackingAdsStatusImpression",
                        limit: "pokiTrackingAdsStatusLimit",
                        ready: "pokiTrackingAdsStatusReady",
                        requested: "pokiTrackingAdsStatusRequested",
                        skipped: "pokiTrackingAdsStatusSkipped",
                        started: "pokiTrackingAdsStatusStarted"
                    },
                    type: {
                        video: "pokiTrackingAdsTypeVideo",
                        display: "pokiTrackingAdsTypeDisplay"
                    }
                }
            }
        },
        A = function() {
            function t() {}
            return t.clearEventListeners = function() {
                this.listeners = {}
            }, t.removeEventListener = function(t, e) {
                if (Object.prototype.hasOwnProperty.call(this.listeners, t)) {
                    var i = this.listeners[t].indexOf(e); - 1 !== i && this.listeners[t].splice(i, 1)
                }
            }, t.addEventListener = function(t, e, i) {
                var n = this;
                if (void 0 === i && (i = !1), i = !!i, Object.prototype.hasOwnProperty.call(this.listeners, t) || (this.listeners[t] = []), i) {
                    var r = function(i) {
                        n.removeEventListener.bind(n)(t, r), e(i)
                    };
                    this.listeners[t].push(r)
                } else this.listeners[t].push(e)
            }, t.dispatchEvent = function(t, e) {
                void 0 === e && (e = {}), this.debug && console.info(t, e);
                for (var i = Object.keys(this.listeners), n = 0; n < i.length; n++) {
                    var r = i[n];
                    if (t === r)
                        for (var o = this.listeners[r], a = 0; a < o.length; a++) o[a](e)
                }
            }, t.setDebug = function(t) {
                this.debug = t
            }, t.listeners = {}, t.debug = !1, t
        }(),
        d = function(t, e) {
            var i = !1;
            return Object.keys(e).forEach(function(n) {
                e[n] === t && (i = !0)
            }), i
        },
        c = function() {
            function t() {}
            return t.sendMessage = function(t, e) {
                void 0 === e && (e = {});
                var i = window.parent;
                if (!d(t, s.message)) {
                    var n = Object.keys(s.message).map(function(t) {
                        return "poki.message." + t
                    });
                    throw new TypeError("Argument 'type' must be one of " + n.join(", "))
                }
                i.postMessage({
                    type: t,
                    content: e
                }, "*")
            }, t
        }(),
        u = function(t) {
            var e = new Array;
            return Object.keys(t).forEach(function(i) {
                "object" == typeof t[i] ? e = e.concat(u(t[i])) : e.push(t[i])
            }), e
        },
        p = u(s.tracking),
        l = function() {
            function t() {}
            return t.setDebug = function(t) {
                this.debug = t
            }, t.track = function(t, e) {
                if (void 0 === e && (e = {}), -1 === p.indexOf(t)) throw new TypeError("Invalid 'event', must be one of " + p.join(", "));
                if ("object" != typeof e) throw new TypeError("Invalid data, must be an object");
                this.debug && (Object.keys(e).length ? console.info("%cPOKI_TRACKER: %cTracked event '" + t + "' with data:", "font-weight: bold", "", e) : console.info("%cPOKI_TRACKER: %cTracked event '" + t + "'", "font-weight: bold", "")), c.sendMessage(s.message.event, {
                    event: t,
                    data: e
                })
            }, t.setupDefaultEvents = function() {
                var e, i = ((e = {})[s.ready] = s.tracking.sdk.status.initialized, e[s.adblocked] = s.tracking.sdk.status.failed, e[s.ads.busy] = s.tracking.ads.status.busy, e[s.ads.completed] = s.tracking.ads.status.completed, e[s.ads.error] = s.tracking.ads.status.error, e[s.ads.impression] = s.tracking.ads.status.impression, e[s.ads.limit] = s.tracking.ads.status.limit, e[s.ads.ready] = s.tracking.ads.status.ready, e[s.ads.requested] = s.tracking.ads.status.requested, e[s.ads.skipped] = s.tracking.ads.status.skipped, e[s.ads.started] = s.tracking.ads.status.started, e[s.ads.type.video] = s.tracking.ads.type.video, e[s.ads.type.display] = s.tracking.ads.type.display, e[s.tracking.screen.gameplayStart] = s.tracking.screen.gameplayStart, e[s.tracking.screen.gameplayStop] = s.tracking.screen.gameplayStop, e[s.tracking.screen.loadingProgress] = s.tracking.screen.loadingProgress, e[s.tracking.screen.commercialBreak] = s.tracking.screen.commercialBreak, e[s.tracking.screen.rewardedBreak] = s.tracking.screen.rewardedBreak, e[s.tracking.screen.happyTime] = s.tracking.screen.happyTime, e);
                Object.keys(i).forEach(function(e) {
                    A.addEventListener(e, function(n) {
                        t.track(i[e], n)
                    })
                })
            }, t.debug = !1, t
        }(),
        h = {
            hash: "G1L1",
            adTagUrl: "//pubads.g.doubleclick.net/gampad/ads?sz=320x240|320x300|400x300|640x360|640x480&iu=/1053551/Pub-Poki-Generic&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url={url}&description_url={descriptionUrl}&correlator={timestamp}",
            adTiming: {
                preroll: !0,
                timeBetweenAds: 12e4,
                timePerTry: 7e3,
                startAdsAfter: 0
            },
            waterfallRetries: 3,
            country: "NL"
        },
        f = function(t) {
            return t instanceof Array ? t : [t]
        },
        m = function() {
            function t(t) {
                void 0 === t && (t = {}), this.setTimings(t), this.timingIdx = {
                    timePerTry: 0
                }, this.timers = {
                    timePerTry: void 0,
                    timeBetweenAds: void 0,
                    startAdsAfter: void 0
                }, A.addEventListener(s.ads.completed, this.startTimeBetweenAdsTimer.bind(this)), A.addEventListener(s.ads.stopped, this.startTimeBetweenAdsTimer.bind(this))
            }
            return t.prototype.setTimings = function(t) {
                var e = h.adTiming,
                    i = t.preroll,
                    n = void 0 === i ? e.preroll : i,
                    r = t.timePerTry,
                    o = void 0 === r ? e.timePerTry : r,
                    a = t.timeBetweenAds,
                    s = void 0 === a ? e.timeBetweenAds : a,
                    A = t.startAdsAfter,
                    d = void 0 === A ? e.startAdsAfter : A;
                this.timings = {
                    preroll: !1 !== n,
                    timePerTry: f(o),
                    timeBetweenAds: s,
                    startAdsAfter: d
                }
            }, t.prototype.startTimeBetweenAdsTimer = function() {
                this.startTimer("timeBetweenAds")
            }, t.prototype.startStartAdsAfterTimer = function() {
                this.startTimer("startAdsAfter")
            }, t.prototype.requestPossible = function() {
                return !this.timers.timeBetweenAds && !this.timers.startAdsAfter
            }, t.prototype.startWaterfallTimer = function(t) {
                this.startTimer("timePerTry", t)
            }, t.prototype.stopWaterfallTimer = function() {
                this.stopTimer("timePerTry")
            }, t.prototype.nextWaterfallTimer = function() {
                this.nextTiming("timePerTry")
            }, t.prototype.resetWaterfallTimerIdx = function() {
                this.resetTimingIdx("timePerTry")
            }, t.prototype.stopTimer = function(t) {
                this.timers[t] && (clearTimeout(this.timers[t]), this.timers[t] = void 0)
            }, t.prototype.startTimer = function(t, e) {
                var i = this;
                void 0 === e && (e = function() {}), this.getTiming(t) <= 0 ? e() : (this.timers[t] && clearTimeout(this.timers[t]), this.timers[t] = setTimeout(function() {
                    i.stopTimer(t), e()
                }, this.getTiming(t)))
            }, t.prototype.getTiming = function(t) {
                var e = this.timings[t];
                return e instanceof Array ? e[this.timingIdx[t]] : e
            }, t.prototype.nextTiming = function(t) {
                if (void 0 === this.timingIdx[t]) throw new Error("AdTimings Error: " + t + " does not have multiple timers");
                this.timingIdx[t] = (this.timingIdx[t] + 1) % this.timings[t].length
            }, t.prototype.resetTimingIdx = function(t) {
                if (void 0 === this.timingIdx[t]) throw new Error("AdTimings Error: " + t + " does not have multiple timers");
                this.timingIdx[t] = 0
            }, t.prototype.prerollPossible = function() {
                return this.timings.preroll
            }, t
        }(),
        g = {
            pushEvent: function() {},
            setDebug: function() {}
        },
        v = g,
        y = function() {
            function t(t) {
                void 0 === t && (t = {}), this.adDuration = 15e3, this.adRunning = !1, this.timePassedInPause = 0, this.timeUpdateInterval = 1e3, t.timeUpdateInterval && (this.timeUpdateInterval = t.timeUpdateInterval), this.setupEventHandlers()
            }
            return t.prototype.setupEventHandlers = function() {
                A.addEventListener(s.ads.started, this.handleAdStarted.bind(this)), A.addEventListener(s.ads.durationChange, this.handleAdDurationChange.bind(this)), A.addEventListener(s.ads.error, this.handleAdError.bind(this)), A.addEventListener(s.ads.paused, this.handleAdPaused.bind(this)), A.addEventListener(s.ads.resumed, this.handleAdResumed.bind(this)), A.addEventListener(s.ads.completed, this.handleAdCompleted.bind(this)), A.addEventListener(s.ads.stopped, this.handleAdStopped.bind(this))
            }, t.prototype.handleAdStarted = function(t) {
                this.adRunning = !0, this.timeAdStart = new Date, this.adDuration = t.remainingTime, this.startAdTimeRemainingInterval()
            }, t.prototype.handleAdDurationChange = function(t) {
                this.adDuration = t.duration
            }, t.prototype.handleAdPaused = function() {
                clearInterval(this.adTimeRemainingInterval), this.timePaused = new Date
            }, t.prototype.handleAdError = function() {
                this.adRunning = !1
            }, t.prototype.handleAdResumed = function() {
                this.timePassedInPause += (new Date).valueOf() - this.timePaused.valueOf(), this.startAdTimeRemainingInterval()
            }, t.prototype.handleAdCompleted = function() {
                this.adRunning = !1, clearInterval(this.adTimeRemainingInterval)
            }, t.prototype.handleAdStopped = function() {
                this.adRunning = !1, clearInterval(this.adTimeRemainingInterval)
            }, t.prototype.startAdTimeRemainingInterval = function() {
                this.adTimeRemainingInterval = setInterval(this.timeRemainingCountDown.bind(this), this.timeUpdateInterval)
            }, t.prototype.timeRemainingCountDown = function() {
                var t = this.getRemainingAdTime();
                A.dispatchEvent(s.ads.update, {
                    duration: this.adDuration,
                    remaining: Math.max(0, t),
                    percentageCompleted: Math.min(100, 100 - t / this.adDuration * 100)
                }), t <= 0 && clearInterval(this.adTimeRemainingInterval)
            }, t.prototype.getRemainingAdTime = function() {
                var t = (new Date).valueOf() - this.timeAdStart.valueOf() - this.timePassedInPause;
                return this.adDuration - t
            }, t.prototype.isAdRunning = function() {
                return this.adRunning
            }, t
        }(),
        b = i(7),
        k = function() {
            function t(t, e) {
                void 0 === e && (e = {}), this.retries = 0, this.running = !1, this.application = t, this.totalRetries = e.totalRetries || h.waterfallRetries || 1, this.timing = e.timing || new m(h.adTiming), this.adTagUrls = e.adTagUrl ? f(e.adTagUrl) : [h.adTagUrl], A.addEventListener(s.ads.video.error, this.moveThroughWaterfall.bind(this)), A.addEventListener(s.ads.ready, this.timing.stopWaterfallTimer.bind(this.timing)), A.addEventListener(s.ads.started, this.stopWaterfall.bind(this))
            }
            return t.prototype.moveThroughWaterfall = function() {
                if (!1 !== this.running) {
                    if (this.timing.stopWaterfallTimer(), this.retries < this.totalRetries) return this.timing.nextWaterfallTimer(), void this.requestAd();
                    this.running = !1, this.timing.resetWaterfallTimerIdx(), A.dispatchEvent(s.ads.error, {
                        message: "No ads"
                    })
                }
            }, t.prototype.cutOffWaterfall = function() {
                this.application.stopPlayback(), this.moveThroughWaterfall()
            }, t.prototype.start = function(t, e) {
                void 0 === t && (t = {}), this.running = !0, this.retries = 0, this.criteria = t, this.timing.resetWaterfallTimerIdx(), this.overrideAdTagUrl = e, this.requestAd()
            }, t.prototype.requestAd = function() {
                this.timing.startWaterfallTimer(this.cutOffWaterfall.bind(this)), this.retries++, H.isPokiPlatform || (this.criteria.waterfall = this.retries);
                var t, e, i = (this.retries - 1) % this.adTagUrls.length,
                    n = function(t) {
                        var e = Object(b.a)().split("?"),
                            i = encodeURIComponent(e[0]);
                        return t = (t = t.split("{descriptionUrl}").join(i)).split("{timestamp}").join((new Date).getTime().toString())
                    }(this.overrideAdTagUrl || this.adTagUrls[i]) + (t = this.criteria, e = "", Object.keys(t).forEach(function(i) {
                        if (Object.prototype.hasOwnProperty.call(t, i)) {
                            var n = t[i];
                            Array.isArray(n) && (n = n.join()), e += i + "=" + n + "&"
                        }
                    }), "&cust_params=" + (e = encodeURIComponent(e)) + "&");
                H.childDirected && (n += "&tfcd=1"), H.videoPrebid ? window.prebid.requestAd(this.application, n, this.criteria) : this.application.requestAd(n)
            }, t.prototype.isRunning = function() {
                return this.running
            }, t.prototype.stopWaterfall = function() {
                this.running = !1, this.timing.stopWaterfallTimer(), this.timing.resetWaterfallTimerIdx()
            }, t
        }(),
        E = Object.assign || function(t) {
            for (var e, i = 1, n = arguments.length; i < n; i++)
                for (var r in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t
        },
        w = {
            allowSmallerSizes: !0,
            frameworks: [1, 2],
            h: 480,
            maxduration: 60,
            mimes: ["video/mp4", "video/webm", "video/ogg", "video/x-ms-wmv"],
            startdelay: 0,
            w: 640,
            video: {
                playback_method: ["auto_play_sound_on", "auto_play_sound_off", "auto_play_sound_unknown"]
            }
        },
        T = {
            code: "video",
            mediaTypes: {
                video: {
                    context: "instream",
                    playerSize: [640, 480],
                    mimes: w.mimes,
                    protocols: [2, 5],
                    maxduration: 60,
                    skip: 1,
                    api: [2]
                }
            },
            bids: [{
                bidder: "appnexus",
                params: E({
                    placementId: 13184250
                }, w, {
                    video: E({}, w.video, {
                        skippable: !0
                    })
                })
            }, {
                bidder: "appnexus",
                params: E({
                    placementId: 13184309
                }, w, {
                    video: E({}, w.video, {
                        skippable: !0,
                        maxduration: 15
                    })
                })
            }, {
                bidder: "conversant",
                params: {
                    site_id: "117477",
                    secure: 1,
                    position: 1,
                    mimes: w.mimes,
                    maxduration: 30,
                    api: [2],
                    protocols: [2, 5]
                }
            }, {
                bidder: "districtm",
                params: E({
                    placementId: 13192067
                }, w, {
                    video: E({}, w.video, {
                        skippable: !0
                    })
                })
            }, {
                bidder: "districtm",
                params: E({
                    placementId: 13192068
                }, w, {
                    video: E({}, w.video, {
                        skippable: !0
                    })
                })
            }, {
                bidder: "openx",
                params: {
                    unit: "540105196",
                    delDomain: "poki-d.openx.net",
                    openrtb: {
                        imp: [{
                            video: {
                                mimes: [w.mimes.join(",")],
                                protocols: [2, 5],
                                maxduration: 60,
                                skip: 1,
                                w: 640,
                                h: 480
                            }
                        }]
                    }
                }
            }]
        },
        C = {
            EUR: {
                EUR: 1,
                GBP: .858595,
                USD: 1.13151
            },
            GBP: {
                EUR: 1.164693481792929,
                GBP: 1,
                USD: 1.3178623215835172
            },
            USD: {
                EUR: .8837747788353616,
                GBP: .7588046062341472,
                USD: 1
            }
        },
        S = {
            debug: !1,
            enableSendAllBids: !0,
            usePrebidCache: !0,
            bidderTimeout: 1e3,
            priceGranularity: "dense",
            currency: {
                adServerCurrency: "EUR",
                rates: C,
                defaultRates: C,
                bidderCurrencyDefault: {
                    openx: "EUR"
                }
            },
            cache: {
                url: "https://pvc.poki.io/cache"
            },
            userSync: {
                iframeEnabled: !0
            }
        },
        I = "pokiSdkContainer",
        P = "pokiSdkVisible",
        B = "pokiSdkHidden",
        R = "pokiSdkOverlay",
        D = "pokiSdkPauseButton",
        L = "\n." + I + " {\n\toverflow: hidden;\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\twidth: 100%;\n\theight: 100%;\n\tz-index: 1000;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n." + I + ".pokiSdkFixed {\n\tposition: fixed;\n}\n\n." + I + "." + P + " {\n\tvisibility: visible;\n}\n\n." + I + "." + B + " {\n\tvisibility: hidden;\n\tpointer-events: none;\n}\n\n." + R + " {\n\toverflow: hidden;\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbackground: rgba(0, 0, 0, 0.3);\n\tz-index: 0;\n\topacity: 0;\n\ttransition: opacity 0.5s;\n}\n\n." + I + "." + P + " ." + R + " {\n\topacity: 1;\n}\n\n.pokiSdkInsideContainer {\n\tbackground: black;\n\tposition: relative;\n\tz-index: 1;\n\twidth: 100%;\n\theight: 100%;\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n.pokiSdkVideoContainer {\n\twidth: 100%;\n\tflex-grow: 1;\n}\n\n.pokiSdkPauseContainer {\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\tz-index: 2;\n\tbackground-color: rgba(0, 0, 0, .5);\n\twidth: 100%;\n\theight: 100%;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n.pokiSdkPauseContainer." + P + " {\n\tvisibility: visible;\n}\n\n.pokiSdkPauseContainer." + B + " {\n\tvisibility: hidden;\n\tpointer-events: none;\n}\n\n." + D + " {\n\theight: 20%;\n\twidth: 25%;\n\tbackground-color: #282a2e;\n\tborder-radius: 15px;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\tcursor: pointer;\n}\n\n." + D + ":hover {\n\tbackground-color: #439ed5\n}\n\n." + D + ':after {\n\tcontent: "";\n\tborder: solid transparent;\n\tborder-width: 18px;\n\tborder-right-width: 0;\n\tborder-left-width: 36px;\n\tborder-left-color: rgba(255, 255, 255, 1);\n}\n\n.pokiSdkProgressContainer {\n\tbackground: #002B50;\n\twidth: 100%;\n\theight: 5px;\n}\n\n.pokiSdkProgressBar {\n\tposition:relative;\n\tbottom:0px;\n\tbackground: #009CFF;\n\theight: 100%;\n\twidth: 0%;\n\n}\n',
        x = function() {
            function t(t) {
                if (this.hideElement = function(t) {
                        t.classList.add(B), t.classList.remove(P)
                    }, this.showElement = function(t) {
                        t.classList.add(P), t.classList.remove(B)
                    }, this.wrapper = t.wrapper, t.remainingAdTimeCallback && this.setupProgressBar(t.remainingAdTimeCallback), this.wrapper instanceof HTMLElement || (console.error("POKI-SDK: wrapper is not a HTMLElement, falling back to document.body"), this.wrapper = document.body), this.createElements(), this.attachEventListeners(), "undefined" != typeof window && document) {
                    var e = document.createElement("style");
                    e.innerHTML = L, document.head.appendChild(e)
                }
            }
            return t.prototype.setApplication = function(t) {
                this.pauseContainer.addEventListener("click", t.resume.bind(t))
            }, t.prototype.hide = function() {
                window.clearInterval(this.progressInterval), this.hideElement(this.containerDiv), this.hideElement(this.pauseContainer)
            }, t.prototype.show = function() {
                this.showElement(this.containerDiv)
            }, t.prototype.getVideoBounds = function() {
                return this.videoContainer.getBoundingClientRect()
            }, t.prototype.getVideoContainer = function() {
                return this.videoContainer
            }, t.prototype.createElements = function() {
                if (this.containerDiv = document.createElement("div"), this.insideContainer = document.createElement("div"), this.overlayDiv = document.createElement("div"), this.pauseButton = document.createElement("div"), this.pauseContainer = document.createElement("div"), this.progressBar = document.createElement("div"), this.progressContainer = document.createElement("div"), this.videoContainer = document.createElement("div"), this.containerDiv.className = I, this.insideContainer.className = "pokiSdkInsideContainer", this.overlayDiv.className = R, this.pauseButton.className = D, this.pauseContainer.className = "pokiSdkPauseContainer", this.progressBar.className = "pokiSdkProgressBar", this.progressContainer.className = "pokiSdkProgressContainer", this.videoContainer.className = "pokiSdkVideoContainer", this.hide(), this.wrapper.appendChild(this.containerDiv), this.containerDiv.appendChild(this.overlayDiv), this.pauseContainer.appendChild(this.pauseButton), this.insideContainer.appendChild(this.pauseContainer), this.insideContainer.appendChild(this.videoContainer), this.containerDiv.appendChild(this.insideContainer), this.progressContainer.appendChild(this.progressBar), this.insideContainer.appendChild(this.progressContainer), this.wrapper === document.body) this.containerDiv.classList.add("pokiSdkFixed");
                else {
                    var t = window.getComputedStyle(this.wrapper).position;
                    t && -1 !== ["absolute", "fixed", "relative"].indexOf(t) || (this.wrapper.style.position = "relative")
                }
            }, t.prototype.attachEventListeners = function() {
                var t = this;
                A.addEventListener(s.ads.paused, function() {
                    t.showElement(t.pauseContainer)
                }), A.addEventListener(s.ads.resumed, function() {
                    t.hideElement(t.pauseContainer)
                })
            }, t.prototype.setupProgressBar = function(t) {
                var e = this;
                A.addEventListener(s.ads.started, function(i) {
                    e.adDuration = i.remainingTime, e.progressInterval = window.setInterval(function() {
                        var i = t(),
                            n = (e.adDuration - i) / e.adDuration * 100;
                        n < 100 ? e.progressBar.style.width = n + "%" : window.clearInterval(e.progressInterval)
                    }, 10)
                }), A.addEventListener(s.ads.durationChange, function(t) {
                    e.adDuration = t.duration
                })
            }, t
        }(),
        _ = function(t) {
            return new Promise(function(e, i) {
                var n = document.createElement("script");
                n.type = "text/javascript", n.async = !0, n.src = t;
                var r = function() {
                    n.readyState && "loaded" !== n.readyState && "complete" !== n.readyState || (e(), n.onload = null, n.onreadystatechange = null)
                };
                n.onload = r, n.onreadystatechange = r, n.onerror = i, document.head.appendChild(n)
            })
        },
        O = function(t) {
            t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var e = new RegExp("[\\?&]" + t + "=([^&#]*)").exec(window.location.search);
            return null === e ? "" : decodeURIComponent(e[1].replace(/\+/g, " "))
        },
        M = function() {
            var t, e = (t = {
                host: window.location.host || window.location.hostname,
                href: window.location.href,
                pathname: window.location.pathname,
                referrer: document.referrer,
                "ref-id": O("ref")
            }, Object.keys(t).map(function(e) {
                return encodeURIComponent(e) + "=" + encodeURIComponent(t[e])
            }).join("&"));
            return fetch("", {
                method: "POST",
                body: e,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
            }).then(function(t) {
                if (t.status >= 200 && t.status < 400) return t.json();
                throw new Error("Bad Request")
            }).catch(function() {})
        },
        j = function(t, e, i, n) {
            return new(i || (i = Promise))(function(r, o) {
                function a(t) {
                    try {
                        A(n.next(t))
                    } catch (t) {
                        o(t)
                    }
                }

                function s(t) {
                    try {
                        A(n.throw(t))
                    } catch (t) {
                        o(t)
                    }
                }

                function A(t) {
                    t.done ? r(t.value) : new i(function(e) {
                        e(t.value)
                    }).then(a, s)
                }
                A((n = n.apply(t, e || [])).next())
            })
        },
        Q = function(t, e) {
            var i, n, r, o, a = {
                label: 0,
                sent: function() {
                    if (1 & r[0]) throw r[1];
                    return r[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }), o;

            function s(o) {
                return function(s) {
                    return function(o) {
                        if (i) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (i = 1, n && (r = n[2 & o[0] ? "return" : o[0] ? "throw" : "next"]) && !(r = r.call(n, o[1])).done) return r;
                            switch (n = 0, r && (o = [0, r.value]), o[0]) {
                                case 0:
                                case 1:
                                    r = o;
                                    break;
                                case 4:
                                    return a.label++, {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++, n = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(r = (r = a.trys).length > 0 && r[r.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < r[1]) {
                                        a.label = r[1], r = o;
                                        break
                                    }
                                    if (r && a.label < r[2]) {
                                        a.label = r[2], a.ops.push(o);
                                        break
                                    }
                                    r[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            o = e.call(t, a)
                        } catch (t) {
                            o = [6, t], n = 0
                        } finally {
                            i = r = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, s])
                }
            }
        },
        U = function() {
            function t(t, e) {
                var i = this;
                this.contentCompleteCalled = !1, this.bannerTimeout = null, this.currentRunningAdTag = "unknown", this.allowedToPlayAd = !0, this.currentRequestIsMuted = !1, this.canWeAutoPlayWithSound = function() {
                    return j(i, void 0, void 0, function() {
                        return Q(this, function(t) {
                            switch (t.label) {
                                case 0:
                                    if (!this.blankVideo) return [2, !1];
                                    t.label = 1;
                                case 1:
                                    return t.trys.push([1, 3, , 4]), [4, this.blankVideo.play()];
                                case 2:
                                    return t.sent(), [2, !0];
                                case 3:
                                    return t.sent(), [2, !1];
                                case 4:
                                    return [2]
                            }
                        })
                    })
                }, this.application = t, this.videoPlayer = e, google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.INSECURE), this.adsManager = null, this.initAdDisplayContainer(), this.initAdsLoader(), this.initBlankVideo()
            }
            return t.prototype.initAdDisplayContainer = function() {
                this.adDisplayContainer || (this.adDisplayContainer = new google.ima.AdDisplayContainer(this.videoPlayer.adContainer))
            }, t.prototype.initAdsLoader = function() {
                this.adsLoader || (this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer), this.adsLoader.getSettings().setPlayerType("h5_vsi"), this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.onAdsManagerLoaded, !1, this), this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError, !1, this))
            }, t.prototype.initialUserAction = function() {
                this.initAdDisplayContainer(), this.adDisplayContainer.initialize()
            }, t.prototype.requestAds = function(t) {
                return j(this, void 0, void 0, function() {
                    var e;
                    return Q(this, function(i) {
                        switch (i.label) {
                            case 0:
                                return (e = new google.ima.AdsRequest).adTagUrl = t, e.linearAdSlotWidth = this.videoPlayer.width, e.linearAdSlotHeight = this.videoPlayer.height, this.allowedToPlayAd = !0, this.currentRunningAdTag = t, [4, this.canWeAutoPlayWithSound()];
                            case 1:
                                return i.sent() ? (e.setAdWillPlayMuted(!1), this.currentRequestIsMuted = !1) : (e.setAdWillPlayMuted(!0), this.currentRequestIsMuted = !0), this.adsLoader.requestAds(e), this.application.onRequestedAd(), [2]
                        }
                    })
                })
            }, t.prototype.pause = function() {
                this.adsManager && this.adsManager.pause()
            }, t.prototype.resume = function() {
                this.adsManager && this.adsManager.resume()
            }, t.prototype.resize = function(t, e, i) {
                void 0 === i && (i = google.ima.ViewMode.NORMAL), this.adsManager && this.adsManager.resize(this.videoPlayer.width, this.videoPlayer.height, i)
            }, t.prototype.contentEnded = function() {
                this.adsLoader && (this.contentCompleteCalled = !0, this.adsLoader.contentComplete())
            }, t.prototype.onAdsManagerLoaded = function(t) {
                var e = new google.ima.AdsRenderingSettings;
                this.adsManager = t.getAdsManager(this.videoPlayer, e), this.currentRequestIsMuted && this.adsManager.setVolume(0), this.allowedToPlayAd ? (this.attachAdEvents(), this.application.onAdManagerLoaded()) : (this.tearDownAdManager(), this.application.onAdStoppedDuringRequest())
            }, t.prototype.startPlayback = function() {
                this.adsManager.init(this.videoPlayer.width, this.videoPlayer.height, google.ima.ViewMode.NORMAL), this.adsManager.start()
            }, t.prototype.stopPlayback = function() {
                this.allowedToPlayAd = !1, this.application.onAdClosed({
                    type: s.ads.stopped
                }), this.tearDownAdManager(), this.adsLoader && (this.adsLoader.contentComplete(), this.adsLoader.destroy(), this.adsLoader = null, this.initAdsLoader())
            }, t.prototype.tearDownAdManager = function() {
                this.adsManager && (this.adsManager.stop(), this.adsManager.destroy(), this.adsManager = null), null !== this.bannerTimeout && (clearTimeout(this.bannerTimeout), this.bannerTimeout = null)
            }, t.prototype.attachAdEvents = function() {
                var t = this,
                    e = google.ima.AdEvent.Type;
                this.adsManager.addEventListener(e.CONTENT_PAUSE_REQUESTED, this.onContentPauseRequested, !1, this), this.adsManager.addEventListener(e.CONTENT_RESUME_REQUESTED, this.onContentResumeRequested, !1, this), this.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError, !1, this), [e.AD_BREAK_READY, e.AD_METADATA, e.ALL_ADS_COMPLETED, e.CLICK, e.COMPLETE, e.DURATION_CHANGE, e.EXPANDED_CHANGED, e.FIRST_QUARTILE, e.IMPRESSION, e.LOADED, e.LOG, e.MIDPOINT, e.PAUSED, e.RESUMED, e.SKIPPABLE_STATE_CHANGED, e.SKIPPED, e.STARTED, e.THIRD_QUARTILE, e.USER_CLOSE, e.VOLUME_CHANGED, e.VOLUME_MUTED, e.VIEWABLE_IMPRESSION].forEach(function(e) {
                    t.adsManager.addEventListener(e, t.onAdEvent, !1, t)
                })
            }, t.prototype.onContentPauseRequested = function() {
                this.application.pauseForAd()
            }, t.prototype.onContentResumeRequested = function() {
                this.contentCompleteCalled || this.application.resumeAfterAd()
            }, t.prototype.onAdEvent = function(t) {
                var e = this;
                this.application.onRawAdEvent(t, this.currentRunningAdTag);
                var i = t.getAd();
                switch (t.type) {
                    case google.ima.AdEvent.Type.CLICK:
                        this.adsManager.pause(), this.application.onAdClicked();
                        break;
                    case google.ima.AdEvent.Type.LOADED:
                        this.resize(this.videoPlayer.width, this.videoPlayer.height), this.application.onAdEvent(t);
                        break;
                    case google.ima.AdEvent.Type.STARTED:
                        t.remainingTime = this.adsManager.getRemainingTime(), t.remainingTime <= 0 && (t.remainingTime = 15), i.isLinear() || (this.bannerTimeout = window.setTimeout(function() {
                            e.application.onAdClosed(t)
                        }, 1e3 * t.remainingTime)), this.application.onAdStarted(t, {
                            adTag: this.currentRunningAdTag,
                            adId: i.getAdId(),
                            creativeAdId: i.getCreativeAdId(),
                            creativeId: i.getCreativeId()
                        });
                        break;
                    case google.ima.AdEvent.Type.DURATION_CHANGE:
                        t.duration = i.getDuration(), this.application.onAdDurationChange(t);
                        break;
                    case google.ima.AdEvent.Type.COMPLETE:
                        this.application.onAdComplete(), this.closeAd(t);
                        break;
                    case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                    case google.ima.AdEvent.Type.USER_CLOSE:
                        this.closeAd(t);
                        break;
                    default:
                        this.application.onAdEvent(t)
                }
            }, t.prototype.closeAd = function(t) {
                null !== this.bannerTimeout && (clearTimeout(this.bannerTimeout), this.bannerTimeout = null), this.application.onAdClosed(t)
            }, t.prototype.onAdError = function(t) {
                this.application.onRawAdErrorEvent(t, this.currentRunningAdTag), this.application.resumeAfterAd(), void 0 !== this.adsManager && null != this.adsManager && this.adsManager.destroy(), this.application.onAdError(t)
            }, t.prototype.initBlankVideo = function() {
                this.blankVideo = document.createElement("video");
                var t = document.createElement("source");
                t.src = "data:video/mp4;base64, AAAAHGZ0eXBNNFYgAAACAGlzb21pc28yYXZjMQAAAAhmcmVlAAAGF21kYXTeBAAAbGliZmFhYyAxLjI4AABCAJMgBDIARwAAArEGBf//rdxF6b3m2Ui3lizYINkj7u94MjY0IC0gY29yZSAxNDIgcjIgOTU2YzhkOCAtIEguMjY0L01QRUctNCBBVkMgY29kZWMgLSBDb3B5bGVmdCAyMDAzLTIwMTQgLSBodHRwOi8vd3d3LnZpZGVvbGFuLm9yZy94MjY0Lmh0bWwgLSBvcHRpb25zOiBjYWJhYz0wIHJlZj0zIGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDE6MHgxMTEgbWU9aGV4IHN1Ym1lPTcgcHN5PTEgcHN5X3JkPTEuMDA6MC4wMCBtaXhlZF9yZWY9MSBtZV9yYW5nZT0xNiBjaHJvbWFfbWU9MSB0cmVsbGlzPTEgOHg4ZGN0PTAgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0xIGNocm9tYV9xcF9vZmZzZXQ9LTIgdGhyZWFkcz02IGxvb2thaGVhZF90aHJlYWRzPTEgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MCB3ZWlnaHRwPTAga2V5aW50PTI1MCBrZXlpbnRfbWluPTI1IHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCB2YnZfbWF4cmF0ZT03NjggdmJ2X2J1ZnNpemU9MzAwMCBjcmZfbWF4PTAuMCBuYWxfaHJkPW5vbmUgZmlsbGVyPTAgaXBfcmF0aW89MS40MCBhcT0xOjEuMDAAgAAAAFZliIQL8mKAAKvMnJycnJycnJycnXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXiEASZACGQAjgCEASZACGQAjgAAAAAdBmjgX4GSAIQBJkAIZACOAAAAAB0GaVAX4GSAhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZpgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGagC/AySEASZACGQAjgAAAAAZBmqAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZrAL8DJIQBJkAIZACOAAAAABkGa4C/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmwAvwMkhAEmQAhkAI4AAAAAGQZsgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGbQC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBm2AvwMkhAEmQAhkAI4AAAAAGQZuAL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGboC/AySEASZACGQAjgAAAAAZBm8AvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZvgL8DJIQBJkAIZACOAAAAABkGaAC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmiAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZpAL8DJIQBJkAIZACOAAAAABkGaYC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmoAvwMkhAEmQAhkAI4AAAAAGQZqgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGawC/AySEASZACGQAjgAAAAAZBmuAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZsAL8DJIQBJkAIZACOAAAAABkGbIC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBm0AvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZtgL8DJIQBJkAIZACOAAAAABkGbgCvAySEASZACGQAjgCEASZACGQAjgAAAAAZBm6AnwMkhAEmQAhkAI4AhAEmQAhkAI4AhAEmQAhkAI4AhAEmQAhkAI4AAAAhubW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAABDcAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAzB0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAA+kAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAALAAAACQAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAPpAAAAAAABAAAAAAKobWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAB1MAAAdU5VxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAACU21pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAhNzdGJsAAAAr3N0c2QAAAAAAAAAAQAAAJ9hdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAALAAkABIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAALWF2Y0MBQsAN/+EAFWdCwA3ZAsTsBEAAAPpAADqYA8UKkgEABWjLg8sgAAAAHHV1aWRraEDyXyRPxbo5pRvPAyPzAAAAAAAAABhzdHRzAAAAAAAAAAEAAAAeAAAD6QAAABRzdHNzAAAAAAAAAAEAAAABAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAAIxzdHN6AAAAAAAAAAAAAAAeAAADDwAAAAsAAAALAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAAiHN0Y28AAAAAAAAAHgAAAEYAAANnAAADewAAA5gAAAO0AAADxwAAA+MAAAP2AAAEEgAABCUAAARBAAAEXQAABHAAAASMAAAEnwAABLsAAATOAAAE6gAABQYAAAUZAAAFNQAABUgAAAVkAAAFdwAABZMAAAWmAAAFwgAABd4AAAXxAAAGDQAABGh0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAACAAAAAAAABDcAAAAAAAAAAAAAAAEBAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAQkAAADcAABAAAAAAPgbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAC7gAAAykBVxAAAAAAALWhkbHIAAAAAAAAAAHNvdW4AAAAAAAAAAAAAAABTb3VuZEhhbmRsZXIAAAADi21pbmYAAAAQc21oZAAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAADT3N0YmwAAABnc3RzZAAAAAAAAAABAAAAV21wNGEAAAAAAAAAAQAAAAAAAAAAAAIAEAAAAAC7gAAAAAAAM2VzZHMAAAAAA4CAgCIAAgAEgICAFEAVBbjYAAu4AAAADcoFgICAAhGQBoCAgAECAAAAIHN0dHMAAAAAAAAAAgAAADIAAAQAAAAAAQAAAkAAAAFUc3RzYwAAAAAAAAAbAAAAAQAAAAEAAAABAAAAAgAAAAIAAAABAAAAAwAAAAEAAAABAAAABAAAAAIAAAABAAAABgAAAAEAAAABAAAABwAAAAIAAAABAAAACAAAAAEAAAABAAAACQAAAAIAAAABAAAACgAAAAEAAAABAAAACwAAAAIAAAABAAAADQAAAAEAAAABAAAADgAAAAIAAAABAAAADwAAAAEAAAABAAAAEAAAAAIAAAABAAAAEQAAAAEAAAABAAAAEgAAAAIAAAABAAAAFAAAAAEAAAABAAAAFQAAAAIAAAABAAAAFgAAAAEAAAABAAAAFwAAAAIAAAABAAAAGAAAAAEAAAABAAAAGQAAAAIAAAABAAAAGgAAAAEAAAABAAAAGwAAAAIAAAABAAAAHQAAAAEAAAABAAAAHgAAAAIAAAABAAAAHwAAAAQAAAABAAAA4HN0c3oAAAAAAAAAAAAAADMAAAAaAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAACMc3RjbwAAAAAAAAAfAAAALAAAA1UAAANyAAADhgAAA6IAAAO+AAAD0QAAA+0AAAQAAAAEHAAABC8AAARLAAAEZwAABHoAAASWAAAEqQAABMUAAATYAAAE9AAABRAAAAUjAAAFPwAABVIAAAVuAAAFgQAABZ0AAAWwAAAFzAAABegAAAX7AAAGFwAAAGJ1ZHRhAAAAWm1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAALWlsc3QAAAAlqXRvbwAAAB1kYXRhAAAAAQAAAABMYXZmNTUuMzMuMTAw", this.blankVideo.appendChild(t)
            }, t.prototype.muteAd = function() {
                void 0 !== this.adsManager && null != this.adsManager && this.adsManager.setVolume(0)
            }, t
        }(),
        X = function() {
            function t(t) {
                this.adContainer = t, this.currentTime = 0
            }
            return t.prototype.resize = function(t, e) {
                this.width = t, this.height = e
            }, t
        }(),
        G = Object.assign || function(t) {
            for (var e, i = 1, n = arguments.length; i < n; i++)
                for (var r in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t
        },
        N = function() {
            function t(t, e) {
                this.adErrorRequestPhase = !0, this.fireCloseOnce = !0, this.onAdManagerLoaded = function() {
                    A.dispatchEvent(s.ads.ready)
                }, this.onAdDurationChange = function(t) {
                    var e = 1e3 * t.duration;
                    A.dispatchEvent(s.ads.durationChange, {
                        duration: e
                    })
                }, this.onAdClicked = function() {
                    A.dispatchEvent(s.ads.video.clicked)
                }, this.onAdComplete = function() {
                    A.dispatchEvent(s.ads.rewarded)
                }, this.onRawAdEvent = function(t, e) {
                    A.dispatchEvent(s.ads.raw, {
                        event: t,
                        adTagUrl: e
                    })
                }, this.onRawAdErrorEvent = function(t, e) {
                    A.dispatchEvent(s.ads.rawError, {
                        event: t,
                        adTagUrl: e
                    })
                }, this.dataTracker = e, this.initVars(), this.videoPlayer = new X(t), this.ads = new U(this, this.videoPlayer)
            }
            return t.prototype.initVars = function() {
                this.playing = !1, this.adsActive = !1, this.adsDone = !1
            }, t.prototype.resumeAfterAd = function() {
                this.initVars()
            }, t.prototype.pauseForAd = function() {
                this.adsActive = !0, this.playing = !0
            }, t.prototype.requestAd = function(t) {
                if (this.fireCloseOnce = !0, A.dispatchEvent(s.ads.requested, {
                        adTagUrl: t
                    }), !this.adsDone) return this.ads.initialUserAction(), this.ads.requestAds(t), void(this.adsDone = !0);
                this.adsActive && (this.playing ? this.ads.pause() : this.ads.resume()), this.playing = !this.playing
            }, t.prototype.resize = function(t, e) {
                this.videoPlayer.resize(t, e), this.ads.resize(t, e)
            }, t.prototype.pause = function() {
                this.ads.pause(), A.dispatchEvent(s.ads.paused)
            }, t.prototype.muteAd = function() {
                this.ads.muteAd()
            }, t.prototype.resume = function() {
                this.ads.resume(), A.dispatchEvent(s.ads.resumed)
            }, t.prototype.startPlayback = function() {
                this.ads.startPlayback()
            }, t.prototype.stopPlayback = function() {
                this.ads.stopPlayback()
            }, t.prototype.onRequestedAd = function() {
                this.adErrorRequestPhase = !0, this.dataTracker.pushEvent("Ad Request", "")
            }, t.prototype.onAdStarted = function(t, e) {
                this.adErrorRequestPhase = !1, this.dataTracker.pushEvent("Ad Started", "");
                var i = 1e3 * (t.remainingTime || 0);
                A.dispatchEvent(s.ads.started, G({}, e, {
                    remainingTime: i
                }))
            }, t.prototype.onAdClosed = function(t) {
                this.ads.contentEnded(), t.type === s.ads.stopped ? A.dispatchEvent(s.ads.stopped) : this.fireCloseOnce && (A.dispatchEvent(s.ads.completed), this.fireCloseOnce = !1), this.initVars()
            }, t.prototype.onAdError = function(t) {
                this.ads.contentEnded();
                var e = t.getError && t.getError().toString() || "Unknown";
                A.dispatchEvent(s.ads.video.error, {
                    message: e
                }), this.adErrorRequestPhase ? this.dataTracker.pushEvent("Ad Request Error", e) : this.dataTracker.pushEvent("Ad Impression Error", e), this.initVars()
            }, t.prototype.onAdStoppedDuringRequest = function() {
                this.ads.contentEnded(), this.initVars()
            }, t.prototype.onAdEvent = function(t) {
                var e = t.getAd && t.getAd();
                switch (t.type) {
                    case google.ima.AdEvent.Type.FIRST_QUARTILE:
                        A.dispatchEvent(s.ads.video.firstQuartile, {});
                        break;
                    case google.ima.AdEvent.Type.MIDPOINT:
                        A.dispatchEvent(s.ads.video.midPoint, {});
                        break;
                    case google.ima.AdEvent.Type.PAUSED:
                        A.dispatchEvent(s.ads.paused, {});
                        break;
                    case google.ima.AdEvent.Type.THIRD_QUARTILE:
                        A.dispatchEvent(s.ads.video.thirdQuartile, {});
                        break;
                    case google.ima.AdEvent.Type.SKIPPED:
                        A.dispatchEvent(s.ads.skipped, {});
                        break;
                    case google.ima.AdEvent.Type.IMPRESSION:
                        A.dispatchEvent(s.ads.impression, {}), e && (e.isLinear() ? (A.dispatchEvent(s.ads.type.video), this.dataTracker.pushEvent("Video Impression", "")) : (A.dispatchEvent(s.ads.type.display), this.dataTracker.pushEvent("Display Impression", "")));
                        break;
                    case google.ima.AdEvent.Type.LOADED:
                        this.dataTracker.pushEvent("IMA Loaded", "")
                }
            }, t
        }(),
        Z = Object.assign || function(t) {
            for (var e, i = 1, n = arguments.length; i < n; i++)
                for (var r in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t
        },
        H = function() {
            function t() {
                this.criteria = {}, this.debug = !1, this.programmaticAdsEnabled = !0, this.adReady = !1
            }
            return t.prototype.setDebug = function(t) {
                this.debug = t
            }, t.prototype.enableSettings = function(t) {
                this.criteria = Z({}, t.customCriteria, {
                    pdata: t.hash
                }), this.adTimings = new m(t.adTiming), this.gameId = Number(t.gameId), this.distributorId = Number(t.distributorId), this.country = t.country
            }, t.prototype.setupDefaultEvents = function() {
                var t = this;
                [s.ads.completed, s.ads.error, s.ads.limit, s.ads.stopped].forEach(function(e) {
                    A.addEventListener(e, function() {
                        t.playerSkin && t.playerSkin.hide(), t.adReady = !1
                    })
                }), A.addEventListener(s.ads.ready, function() {
                    t.adReady = !0
                })
            }, t.prototype.init = function(e) {
                var i = this;
                void 0 === e && (e = {});
                var n = e.debug,
                    r = void 0 !== n && n,
                    o = e.wrapper,
                    a = void 0 === o ? document.body : o,
                    d = e.customCriteria,
                    c = void 0 === d ? {} : d,
                    u = e.adTagUrl,
                    p = e.adTiming,
                    l = void 0 === p ? {} : p,
                    f = e.timeUpdateInterval,
                    m = e.waterfallRetries,
                    b = e.prebid;
                t.prebid = !!b, t.videoPrebid = t.prebid && (!b || !b.disableVideoPrebid), b && function(t) {
                    window.pbjs = window.pbjs || {}, window.pbjs.que = window.pbjs.que || [];
                    var e = document.createElement("script");
                    e.src = "//game-cdn.poki.com/scripts/v2.12.1/prebid.js", e.async = !0, document.head.appendChild(e), window.pbjs.que.push(function() {
                        window.pbjs.addAdUnits(t.adUnits || T), window.pbjs.setConfig(E({}, S, t.config))
                    })
                }(b), this.debug = !!r;
                var w = Z({}, h);
                u ? (t.isPokiPlatform = !0, w = Z({}, w, {
                    adTagUrl: u,
                    customCriteria: c,
                    adTiming: l
                })) : t.isPokiPlatform = !1, this.videoTimer = new y({
                    timeUpdateInterval: f
                }), this.setupDefaultEvents();
                var C = M;
                (t.isPokiPlatform || this.debug) && (C = function() {
                    return Promise.resolve(w)
                });
                var I = g;
                return void 0 !== window.dataLayer && (I = v, A.addEventListener(s.ads.error, function(t) {
                    I.pushEvent("Poki Error", t.message)
                })), I.setDebug(this.debug), Promise.all([C(), _("")]).catch(function() {
                    A.dispatchEvent(s.adblocked)
                }).then(function(t) {
                    if (void 0 !== t) {
                        var e = t[0],
                            n = Z({}, h, e);
                        i.enableSettings(n), i.adTimings.startStartAdsAfterTimer(), i.playerSkin = new x({
                            wrapper: a,
                            remainingAdTimeCallback: i.videoTimer.getRemainingAdTime.bind(i.videoTimer)
                        }), i.application = new N(i.playerSkin.getVideoContainer(), I), i.playerSkin.setApplication(i.application), i.waterfall = new k(i.application, {
                            timing: i.adTimings,
                            totalRetries: m,
                            adTagUrl: n.adTagUrl
                        }), A.dispatchEvent(s.ready)
                    }
                })
            }, t.prototype.requestAd = function(e) {
                void 0 === e && (e = {});
                var i = e.position,
                    n = void 0 === i ? null : i,
                    r = e.customCriteria,
                    o = void 0 === r ? {} : r;
                if (null === n || !d(n, s.ads.position)) return console.error("POKI-SDK: Invalid position");
                if (this.videoTimer.isAdRunning() || this.waterfall.isRunning()) return A.dispatchEvent(s.ads.busy);
                if (this.adReady) return A.dispatchEvent(s.ads.ready);
                if (n === s.ads.position.preroll && !this.adTimings.prerollPossible()) return A.dispatchEvent(s.ads.limit, {
                    reason: s.info.messages.prerollLimit
                });
                if (n !== s.ads.position.rewarded && !this.adTimings.requestPossible()) return A.dispatchEvent(s.ads.limit, {
                    reason: s.info.messages.timeLimit,
                    data: {
                        position: n
                    }
                });
                var a = Z({}, this.criteria, {
                    position: n
                });
                if (this.debug && (n === s.ads.position.rewarded ? a.debug = "ad-sdk-test-rewarded" : a.debug = "ad-sdk-test-video"), (t.isPokiPlatform || n === s.ads.position.rewarded) && (a = Z({}, a, o)), this.distributorId && 2 === Number(this.distributorId)) {
                    var c = encodeURIComponent(O("tag") || ""),
                        u = encodeURIComponent(O("site_id") || ""),
                        p = encodeURIComponent(O("categories") || "");
                    a.tag = c, a.tag_site = c + "|" + u, a.site_id = u, a.categories = p
                }
                if (this.programmaticAdsEnabled || (a.disable_programmatic = 1), this.gameId && this.distributorId && 228 === Number(this.gameId) && (2 === Number(this.distributorId) || 1 === Number(this.distributorId))) {
                    var l = null,
                        h = "//pubads.g.doubleclick.net/gampad/ads?sz=320x240|320x300|400x300|640x360|640x480&iu={adUnit}&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url={url}&description_url={descriptionUrl}&correlator={timestamp}";
                    return l = n === s.ads.position.rewarded ? h.replace("{adUnit}", "/21682198607/poki-platform-ingame-video/Crossy-Road-Rewarded") : h.replace("{adUnit}", "/21682198607/poki-platform-ingame-video/Crossy-Road-Midroll"), void this.waterfall.start(a, l)
                }
                this.waterfall.start(a)
            }, t.prototype.toggleProgrammaticAds = function(t) {
                this.programmaticAdsEnabled = t
            }, t.prototype.getProgrammaticAdsEnabled = function() {
                return this.programmaticAdsEnabled
            }, t.prototype.getCountry = function() {
                return this.country
            }, t.prototype.resize = function() {
                var t = this.playerSkin.getVideoBounds();
                this.application.resize(t.width, t.height)
            }, t.prototype.startAd = function() {
                this.adReady ? (this.resize(), this.playerSkin.show(), this.application.startPlayback()) : A.dispatchEvent(s.ads.error, {
                    message: "No ads ready to start"
                })
            }, t.prototype.stopAd = function() {
                this.waterfall.stopWaterfall(), this.application.stopPlayback(), this.playerSkin.hide()
            }, t.prototype.muteAd = function() {
                this.application.muteAd()
            }, t.prototype.pause = function() {
                this.application.pause()
            }, t.prototype.resume = function() {
                this.application.resume()
            }, t.childDirected = !1, t.isPokiPlatform = !1, t.prebidEnabled = !1, t.prebid = !1, t.videoPrebid = !1, t
        }(),
        F = !0,
        W = {};
    var V = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "GB", "IS", "LI", "NO"],
        z = ["US"],
        J = ["ZZ"];

    function q(t) {
        return J.includes(t)
    }
    var Y = function() {
            function t() {
                this.autoStartOnReady = !1, this.handlers = {}, this.isInitialized = !1, this.sdkBooted = !1, this.sdkImaError = !1, this.debugIsOverwritten = !1, this.setPlayerAge = function(t) {
                    t && function(t, e) {
                        if (F) try {
                            localStorage.setItem(t, e)
                        } catch (i) {
                            F = !1, W[t] = e
                        } else W[t] = e
                    }("playerAge", t)
                }, this.sdkNotBootedButCalled = function() {
                    A.dispatchEvent(s.uninitialized, {}), console.error("The Poki SDK has not yet been initialized")
                }, this.app = new H
            }
            return t.prototype.init = function(t) {
                void 0 === t && (t = {});
                var e = this.checkForInitializeError();
                if (e) return console.error("Poki SDK Error: " + e);
                var i = t.adTagUrl,
                    n = t.adTiming,
                    r = void 0 === n ? {} : n,
                    o = t.customCriteria,
                    a = void 0 === o ? {} : o,
                    s = t.debug,
                    A = void 0 !== s && s,
                    d = t.onReady,
                    c = void 0 === d ? null : d,
                    u = t.onAdblocked,
                    p = void 0 === u ? null : u,
                    h = t.timeUpdateInterval,
                    f = t.waterfallRetries,
                    m = t.prebid,
                    g = t.wrapper,
                    v = void 0 === g ? document.body : g;
                c && this.registerHandler("onReady", c), p && this.registerHandler("onAdblocked", p), this.setupDefaultEvents(), this.app.init({
                    adTagUrl: i,
                    adTiming: r,
                    customCriteria: a,
                    timeUpdateInterval: h,
                    waterfallRetries: f,
                    wrapper: v,
                    prebid: m
                }), window.addEventListener("resize", this.resize.bind(this), !1), l.setupDefaultEvents();
                var y = O("pokiDebug");
                y ? (this.setDebug("true" === y), this.debugIsOverwritten = !0) : this.setDebug(A)
            }, t.prototype.requestAd = function(t) {
                void 0 === t && (t = {});
                var e = t.autoStart,
                    i = void 0 === e || e,
                    n = t.onStart,
                    r = void 0 === n ? null : n,
                    o = t.onFinish,
                    a = void 0 === o ? null : o,
                    d = t.position,
                    c = t.customCriteria,
                    u = void 0 === c ? {} : c;
                return this.sdkBooted ? this.sdkImaError ? (A.dispatchEvent(s.ads.error, {
                    message: "Adblocker has been detected"
                }), void("function" == typeof a && a(s.ads.error))) : (this.autoStartOnReady = !1 !== i, a && this.registerHandler("onFinish", a), r && this.registerHandler("onStart", r), void this.app.requestAd({
                    position: d,
                    customCriteria: u
                })) : (A.dispatchEvent(s.ads.error, {
                    message: "Requesting ad on unbooted SDK"
                }), void this.sdkNotBootedButCalled())
            }, t.prototype.togglePlayerAdvertisingConsent = function(t) {
                if (t) {
                    var e, i = parseInt(function(t) {
                            if (!F) return W[t];
                            try {
                                return localStorage.getItem(t)
                            } catch (e) {
                                return W[t]
                            }
                        }("playerAge"), 10) || 0,
                        n = this.app.getCountry(),
                        r = (e = n, V.includes(e)),
                        o = function(t) {
                            return z.includes(t)
                        }(n),
                        a = q(n);
                    (r || o || q) && (r && i <= 12 || o && i <= 16 || a && i <= 16) ? this.disableProgrammatic(): this.enableProgrammatic()
                } else this.disableProgrammatic()
            }, t.prototype.disableProgrammatic = function() {
                H.childDirected = !0, this.app.toggleProgrammaticAds(!1)
            }, t.prototype.enableProgrammatic = function() {
                H.childDirected = !1, this.app.toggleProgrammaticAds(!0)
            }, t.prototype.getProgrammaticAdsEnabled = function() {
                return this.app.getProgrammaticAdsEnabled()
            }, t.prototype.setDebug = function(t) {
                this.debugIsOverwritten || (l.setDebug(t), A.setDebug(t), this.app.setDebug(t))
            }, t.prototype.resize = function() {
                if (!this.sdkBooted) return this.sdkNotBootedButCalled();
                this.sdkImaError || this.app.resize()
            }, t.prototype.startAd = function() {
                if (!this.sdkBooted) return this.sdkNotBootedButCalled();
                this.sdkImaError || this.app.startAd()
            }, t.prototype.stopAd = function() {
                if (!this.sdkBooted) return this.sdkNotBootedButCalled();
                this.sdkImaError || this.app.stopAd()
            }, t.prototype.muteAd = function() {
                if (!this.sdkBooted) return this.sdkNotBootedButCalled();
                this.sdkImaError || this.app.muteAd()
            }, t.prototype.pause = function() {
                if (!this.sdkBooted) return this.sdkNotBootedButCalled();
                this.sdkImaError || this.app.pause()
            }, t.prototype.resume = function() {
                if (!this.sdkBooted) return this.sdkNotBootedButCalled();
                this.sdkImaError || this.app.resume()
            }, t.prototype.checkForInitializeError = function() {
                if (this.isInitialized) return "Poki SDK has already been initialized";
                this.isInitialized = !0;
                var t, e, i, n = (e = navigator.userAgent, i = e.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [], /trident/i.test(i[1]) ? {
                    name: "IE",
                    version: (t = /\brv[ :]+(\d+)/g.exec(e) || [])[1] || ""
                } : "Chrome" === i[1] && null != (t = e.match(/\bOPR\/(\d+)/)) ? {
                    name: "Opera",
                    version: t[1]
                } : (i = i[2] ? [i[1], i[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (t = e.match(/version\/(\d+)/i)) && i.splice(1, 1, t[1]), {
                    name: i[0],
                    version: i[1]
                }));
                return "MSIE" === n.name && "8" === n.version && "IE8 is not supported"
            }, t.prototype.registerHandler = function(t, e) {
                this.handlers[t] = e
            }, t.prototype.callHandler = function(t) {
                for (var e = [], i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
                "function" == typeof this.handlers[t] && this.handlers[t](e)
            }, t.prototype.setupDefaultEvents = function() {
                var t = this;
                A.addEventListener(s.ready, function() {
                    t.sdkBooted = !0, t.callHandler("onReady")
                }), A.addEventListener(s.adblocked, function() {
                    t.sdkBooted = !0, t.sdkImaError = !0, t.callHandler("onAdblocked")
                }), A.addEventListener(s.ads.limit, function() {
                    t.callHandler("onFinish", s.ads.limit)
                }), A.addEventListener(s.ads.ready, function() {
                    t.autoStartOnReady && (t.app.adReady = !0, t.startAd())
                }), A.addEventListener(s.ads.started, function() {
                    t.callHandler("onStart", s.ads.limit)
                }), A.addEventListener(s.ads.error, function() {
                    t.callHandler("onFinish", s.ads.error)
                }), A.addEventListener(s.ads.completed, function() {
                    t.callHandler("onFinish", s.ads.completed)
                })
            }, t.prototype.getDistributorId = function() {
                return this.app.distributorId ? Number(this.app.distributorId) : void 0
            }, t.prototype.getAdReady = function() {
                return !!this.app.adReady
            }, t
        }(),
        K = Object.assign || function(t) {
            for (var e, i = 1, n = arguments.length; i < n; i++)
                for (var r in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t
        },
        $ = function() {
            function t() {
                var t = this;
                this.gameStarted = !1, this.init = function() {
                    return new Promise(function(e, i) {
                        t.SDK = new Y, t.SDK.init({
                            onReady: e,
                            onAdblocked: i
                        }), c.sendMessage(s.message.sdkDetails, {
                            version: "2.12.1"
                        })
                    })
                }, this.initWithVideoHB = function() {
                    return new Promise(function(e, i) {
                        t.SDK = new Y, t.SDK.init({
                            prebid: {
                                disableVideoPrebid: !1
                            },
                            onReady: e,
                            onAdblocked: i
                        }), c.sendMessage(s.message.sdkDetails, {
                            version: "2.12.1"
                        })
                    })
                }, this.gameLoadingStart = function() {
                    l.track(s.tracking.screen.gameLoadingStarted)
                }, this.gameLoadingFinished = function() {
                    l.track(s.tracking.screen.gameLoadingFinished)
                }, this.gameLoadingProgress = function(t) {
                    var e = {};
                    void 0 !== t.percentageDone && (e.percentageDone = Number(t.percentageDone)), void 0 !== t.kbLoaded && (e.kbLoaded = Number(t.kbLoaded)), void 0 !== t.kbTotal && (e.kbTotal = Number(t.kbTotal)), void 0 !== t.fileNameLoaded && (e.fileNameLoaded = String(t.fileNameLoaded)), void 0 !== t.filesLoaded && (e.filesLoaded = Number(t.filesLoaded)), void 0 !== t.filesTotal && (e.filesTotal = Number(t.filesTotal)), l.track(s.tracking.screen.gameLoadingProgress, e)
                }, this.gameplayStart = function() {
                    t.gameStarted || (t.gameStarted = !0, l.track(s.tracking.screen.firstRound)), l.track(s.tracking.screen.gameplayStart)
                }, this.gameplayStop = function() {
                    l.track(s.tracking.screen.gameplayStop)
                }, this.roundStart = function(t) {
                    void 0 === t && (t = ""), t = String(t), l.track(s.tracking.screen.roundStart, {
                        identifier: t
                    })
                }, this.roundEnd = function(t) {
                    void 0 === t && (t = ""), t = String(t), l.track(s.tracking.screen.roundEnd, {
                        identifier: t
                    })
                }, this.customEvent = function(e, i, n) {
                    if (void 0 === n && (n = {}), !e || !i) return t.error("customEvent", "customEvent needs at least a noun and a verb");
                    e = String(e), i = String(i), n = K({}, n), l.track(s.tracking.custom, {
                        eventNoun: e,
                        eventVerb: i,
                        eventData: n
                    })
                }, this.commercialBreak = function() {
                    return new Promise(function(e) {
                        l.track(s.tracking.screen.commercialBreak);
                        var i = function() {
                            A.removeEventListener(s.ads.completed, i), A.removeEventListener(s.ads.limit, i), A.removeEventListener(s.ads.error, i), A.removeEventListener(s.ads.busy, i), e()
                        };
                        A.addEventListener(s.ads.completed, i), A.addEventListener(s.ads.limit, i), A.addEventListener(s.ads.error, i), A.addEventListener(s.ads.busy, i);
                        var n = t.gameStarted ? s.ads.position.midroll : s.ads.position.preroll;
                        t.SDK.requestAd({
                            position: n
                        })
                    })
                }, this.rewardedBreak = function() {
                    return new Promise(function(e) {
                        l.track(s.tracking.screen.rewardedBreak);
                        var i = function(t) {
                                A.removeEventListener(s.ads.completed, n), A.removeEventListener(s.ads.limit, n), A.removeEventListener(s.ads.error, n), A.removeEventListener(s.ads.busy, n), A.removeEventListener(s.ads.rewarded, r), e(t)
                            },
                            n = function() {
                                return i(!1)
                            },
                            r = function() {
                                return i(!0)
                            };
                        A.addEventListener(s.ads.completed, n), A.addEventListener(s.ads.limit, n), A.addEventListener(s.ads.error, n), A.addEventListener(s.ads.busy, n), A.addEventListener(s.ads.rewarded, r), t.SDK.requestAd({
                            position: s.ads.position.rewarded
                        })
                    })
                }, this.happyTime = function(e) {
                    void 0 === e && (e = 1), ((e = Number(e)) < 0 || e > 1) && (e = Math.max(0, Math.min(1, e)), t.warning("happyTime", "Intensity should be a value between 0 and 1, adjusted to " + e)), l.track(s.tracking.screen.happyTime, {
                        intensity: e
                    })
                }, this.muteAd = function() {
                    t.SDK.muteAd()
                }, this.setPlayerAge = function(e) {
                    l.track(s.tracking.setPlayerAge, {
                        age: e
                    }), e && t.SDK.setPlayerAge(e)
                }, this.togglePlayerAdvertisingConsent = function(e) {
                    l.track(s.tracking.togglePlayerAdvertisingConsent, {
                        didConsent: e
                    }), t.SDK.togglePlayerAdvertisingConsent(e), c.sendMessage(s.message.toggleProgrammaticAds, {
                        enabled: t.SDK.getProgrammaticAdsEnabled()
                    })
                }, this.warning = function(t, e) {
                    console.warn("PokiSDK." + t + ": " + e)
                }, this.error = function(t, e) {
                    console.error("PokiSDK." + t + ": " + e)
                }
            }
            return t.prototype.setDebug = function(t) {
                void 0 === t && (t = !0), this.SDK.setDebug(t)
            }, t.prototype.disableProgrammatic = function() {
                this.SDK.disableProgrammatic()
            }, t
        }();
    window.PokiSDK = new $, window.deprecated_poki = s, window.deprecated_POKI_DISPATCHER = A, window.deprecated_POKI_TRACKER = l
}]);