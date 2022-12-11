(function() {
    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    'use strict';

    function aa(a) {
        var b = 0;
        return function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        }
    }
    var l = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = c.value;
        return a
    };

    function ba(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math) return c
        }
        throw Error("Cannot find global object");
    }
    var n = ba(this),
        p = "function" === typeof Symbol && "symbol" === typeof Symbol("x"),
        r = {},
        u = {};

    function w(a, b) {
        var c = u[b];
        if (null == c) return a[b];
        c = a[c];
        return void 0 !== c ? c : a[b]
    }

    function x(a, b, c) {
        if (b) a: {
            var d = a.split(".");a = 1 === d.length;
            var g = d[0],
                h;!a && g in r ? h = r : h = n;
            for (g = 0; g < d.length - 1; g++) {
                var e = d[g];
                if (!(e in h)) break a;
                h = h[e]
            }
            d = d[d.length - 1];c = p && "es6" === c ? h[d] : null;b = b(c);null != b && (a ? l(r, d, {
                configurable: !0,
                writable: !0,
                value: b
            }) : b !== c && (void 0 === u[d] && (a = 1E9 * Math.random() >>> 0, u[d] = p ? n.Symbol(d) : "$jscp$" + a + "$" + d), l(h, u[d], {
                configurable: !0,
                writable: !0,
                value: b
            })))
        }
    }
    x("Symbol", function(a) {
        function b(h) {
            if (this instanceof b) throw new TypeError("Symbol is not a constructor");
            return new c(d + (h || "") + "_" + g++, h)
        }

        function c(h, e) {
            this.g = h;
            l(this, "description", {
                configurable: !0,
                writable: !0,
                value: e
            })
        }
        if (a) return a;
        c.prototype.toString = function() {
            return this.g
        };
        var d = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_",
            g = 0;
        return b
    }, "es6");
    x("Symbol.iterator", function(a) {
        if (a) return a;
        a = (0, r.Symbol)("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = n[b[c]];
            "function" === typeof d && "function" != typeof d.prototype[a] && l(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return ca(aa(this))
                }
            })
        }
        return a
    }, "es6");

    function ca(a) {
        a = {
            next: a
        };
        a[w(r.Symbol, "iterator")] = function() {
            return this
        };
        return a
    }

    function da(a) {
        var b = "undefined" != typeof r.Symbol && w(r.Symbol, "iterator") && a[w(r.Symbol, "iterator")];
        return b ? b.call(a) : {
            next: aa(a)
        }
    }
    var ea = "function" == typeof Object.create ? Object.create : function(a) {
            function b() {}
            b.prototype = a;
            return new b
        },
        y;
    if (p && "function" == typeof Object.setPrototypeOf) y = Object.setPrototypeOf;
    else {
        var z;
        a: {
            var fa = {
                    a: !0
                },
                ha = {};
            try {
                ha.__proto__ = fa;
                z = ha.a;
                break a
            } catch (a) {}
            z = !1
        }
        y = z ? function(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
            return a
        } : null
    }
    var ia = y;

    function A(a, b) {
        a.prototype = ea(b.prototype);
        a.prototype.constructor = a;
        if (ia) ia(a, b);
        else
            for (var c in b)
                if ("prototype" != c)
                    if (Object.defineProperties) {
                        var d = Object.getOwnPropertyDescriptor(b, c);
                        d && Object.defineProperty(a, c, d)
                    } else a[c] = b[c];
        a.U = b.prototype
    }

    function B() {
        this.l = !1;
        this.h = null;
        this.i = void 0;
        this.g = 1;
        this.A = this.s = 0;
        this.j = null
    }

    function C(a) {
        if (a.l) throw new TypeError("Generator is already running");
        a.l = !0
    }
    B.prototype.o = function(a) {
        this.i = a
    };

    function D(a, b) {
        a.j = {
            O: b,
            P: !0
        };
        a.g = a.s || a.A
    }
    B.prototype.return = function(a) {
        this.j = {
            return: a
        };
        this.g = this.A
    };

    function E(a, b, c) {
        a.g = c;
        return {
            value: b
        }
    }

    function ja(a) {
        this.g = new B;
        this.h = a
    }

    function ka(a, b) {
        C(a.g);
        var c = a.g.h;
        if (c) return F(a, "return" in c ? c["return"] : function(d) {
            return {
                value: d,
                done: !0
            }
        }, b, a.g.return);
        a.g.return(b);
        return G(a)
    }

    function F(a, b, c, d) {
        try {
            var g = b.call(a.g.h, c);
            if (!(g instanceof Object)) throw new TypeError("Iterator result " + g + " is not an object");
            if (!g.done) return a.g.l = !1, g;
            var h = g.value
        } catch (e) {
            return a.g.h = null, D(a.g, e), G(a)
        }
        a.g.h = null;
        d.call(a.g, h);
        return G(a)
    }

    function G(a) {
        for (; a.g.g;) try {
            var b = a.h(a.g);
            if (b) return a.g.l = !1, {
                value: b.value,
                done: !1
            }
        } catch (c) {
            a.g.i = void 0, D(a.g, c)
        }
        a.g.l = !1;
        if (a.g.j) {
            b = a.g.j;
            a.g.j = null;
            if (b.P) throw b.O;
            return {
                value: b.return,
                done: !0
            }
        }
        return {
            value: void 0,
            done: !0
        }
    }

    function la(a) {
        this.next = function(b) {
            C(a.g);
            a.g.h ? b = F(a, a.g.h.next, b, a.g.o) : (a.g.o(b), b = G(a));
            return b
        };
        this.throw = function(b) {
            C(a.g);
            a.g.h ? b = F(a, a.g.h["throw"], b, a.g.o) : (D(a.g, b), b = G(a));
            return b
        };
        this.return = function(b) {
            return ka(a, b)
        };
        this[w(r.Symbol, "iterator")] = function() {
            return this
        }
    }

    function ma(a) {
        function b(d) {
            return a.next(d)
        }

        function c(d) {
            return a.throw(d)
        }
        return new r.Promise(function(d, g) {
            function h(e) {
                e.done ? d(e.value) : r.Promise.resolve(e.value).then(b, c).then(h, g)
            }
            h(a.next())
        })
    }

    function H(a) {
        return ma(new la(new ja(a)))
    }
    x("Promise", function(a) {
        function b(e) {
            this.h = 0;
            this.i = void 0;
            this.g = [];
            this.s = !1;
            var f = this.j();
            try {
                e(f.resolve, f.reject)
            } catch (k) {
                f.reject(k)
            }
        }

        function c() {
            this.g = null
        }

        function d(e) {
            return e instanceof b ? e : new b(function(f) {
                f(e)
            })
        }
        if (a) return a;
        c.prototype.h = function(e) {
            if (null == this.g) {
                this.g = [];
                var f = this;
                this.i(function() {
                    f.l()
                })
            }
            this.g.push(e)
        };
        var g = n.setTimeout;
        c.prototype.i = function(e) {
            g(e, 0)
        };
        c.prototype.l = function() {
            for (; this.g && this.g.length;) {
                var e = this.g;
                this.g = [];
                for (var f = 0; f < e.length; ++f) {
                    var k =
                        e[f];
                    e[f] = null;
                    try {
                        k()
                    } catch (m) {
                        this.j(m)
                    }
                }
            }
            this.g = null
        };
        c.prototype.j = function(e) {
            this.i(function() {
                throw e;
            })
        };
        b.prototype.j = function() {
            function e(m) {
                return function(q) {
                    k || (k = !0, m.call(f, q))
                }
            }
            var f = this,
                k = !1;
            return {
                resolve: e(this.K),
                reject: e(this.l)
            }
        };
        b.prototype.K = function(e) {
            if (e === this) this.l(new TypeError("A Promise cannot resolve to itself"));
            else if (e instanceof b) this.M(e);
            else {
                a: switch (typeof e) {
                    case "object":
                        var f = null != e;
                        break a;
                    case "function":
                        f = !0;
                        break a;
                    default:
                        f = !1
                }
                f ? this.J(e) : this.o(e)
            }
        };
        b.prototype.J = function(e) {
            var f = void 0;
            try {
                f = e.then
            } catch (k) {
                this.l(k);
                return
            }
            "function" == typeof f ? this.N(f, e) : this.o(e)
        };
        b.prototype.l = function(e) {
            this.A(2, e)
        };
        b.prototype.o = function(e) {
            this.A(1, e)
        };
        b.prototype.A = function(e, f) {
            if (0 != this.h) throw Error("Cannot settle(" + e + ", " + f + "): Promise already settled in state" + this.h);
            this.h = e;
            this.i = f;
            2 === this.h && this.L();
            this.R()
        };
        b.prototype.L = function() {
            var e = this;
            g(function() {
                if (e.S()) {
                    var f = n.console;
                    "undefined" !== typeof f && f.error(e.i)
                }
            }, 1)
        };
        b.prototype.S =
            function() {
                if (this.s) return !1;
                var e = n.CustomEvent,
                    f = n.Event,
                    k = n.dispatchEvent;
                if ("undefined" === typeof k) return !0;
                "function" === typeof e ? e = new e("unhandledrejection", {
                    cancelable: !0
                }) : "function" === typeof f ? e = new f("unhandledrejection", {
                    cancelable: !0
                }) : (e = n.document.createEvent("CustomEvent"), e.initCustomEvent("unhandledrejection", !1, !0, e));
                e.promise = this;
                e.reason = this.i;
                return k(e)
            };
        b.prototype.R = function() {
            if (null != this.g) {
                for (var e = 0; e < this.g.length; ++e) h.h(this.g[e]);
                this.g = null
            }
        };
        var h = new c;
        b.prototype.M =
            function(e) {
                var f = this.j();
                e.B(f.resolve, f.reject)
            };
        b.prototype.N = function(e, f) {
            var k = this.j();
            try {
                e.call(f, k.resolve, k.reject)
            } catch (m) {
                k.reject(m)
            }
        };
        b.prototype.then = function(e, f) {
            function k(t, v) {
                return "function" == typeof t ? function(P) {
                    try {
                        m(t(P))
                    } catch (Q) {
                        q(Q)
                    }
                } : v
            }
            var m, q, R = new b(function(t, v) {
                m = t;
                q = v
            });
            this.B(k(e, m), k(f, q));
            return R
        };
        b.prototype.catch = function(e) {
            return this.then(void 0, e)
        };
        b.prototype.B = function(e, f) {
            function k() {
                switch (m.h) {
                    case 1:
                        e(m.i);
                        break;
                    case 2:
                        f(m.i);
                        break;
                    default:
                        throw Error("Unexpected state: " +
                            m.h);
                }
            }
            var m = this;
            null == this.g ? h.h(k) : this.g.push(k);
            this.s = !0
        };
        b.resolve = d;
        b.reject = function(e) {
            return new b(function(f, k) {
                k(e)
            })
        };
        b.race = function(e) {
            return new b(function(f, k) {
                for (var m = da(e), q = m.next(); !q.done; q = m.next()) d(q.value).B(f, k)
            })
        };
        b.all = function(e) {
            var f = da(e),
                k = f.next();
            return k.done ? d([]) : new b(function(m, q) {
                function R(P) {
                    return function(Q) {
                        t[P] = Q;
                        v--;
                        0 == v && m(t)
                    }
                }
                var t = [],
                    v = 0;
                do t.push(void 0), v++, d(k.value).B(R(t.length - 1), q), k = f.next(); while (!k.done)
            })
        };
        return b
    }, "es6");
    x("Array.from", function(a) {
        return a ? a : function(b, c, d) {
            c = null != c ? c : function(f) {
                return f
            };
            var g = [],
                h = "undefined" != typeof r.Symbol && w(r.Symbol, "iterator") && b[w(r.Symbol, "iterator")];
            if ("function" == typeof h) {
                b = h.call(b);
                for (var e = 0; !(h = b.next()).done;) g.push(c.call(d, h.value, e++))
            } else
                for (h = b.length, e = 0; e < h; e++) g.push(c.call(d, b[e], e));
            return g
        }
    }, "es6");
    x("Promise.allSettled", function(a) {
        function b(d) {
            return {
                status: "fulfilled",
                value: d
            }
        }

        function c(d) {
            return {
                status: "rejected",
                reason: d
            }
        }
        return a ? a : function(d) {
            var g = this;
            d = w(Array, "from").call(Array, d, function(h) {
                return g.resolve(h).then(b, c)
            });
            return g.all(d)
        }
    }, "es_2020");
    var I = this || self;

    function J(a) {
        return a
    };

    function K(a, b) {
        this.h = a === L && b || "";
        this.g = na
    }

    function M(a) {
        return a instanceof K && a.constructor === K && a.g === na ? a.h : "type_error:Const"
    }
    var na = {},
        L = {};
    var N;

    function O(a, b) {
        this.g = b === oa ? a : ""
    }
    O.prototype.toString = function() {
        return this.g + ""
    };

    function pa(a) {
        return a instanceof O && a.constructor === O ? a.g : "type_error:TrustedResourceUrl"
    }

    function qa(a, b) {
        var c = M(a);
        if (!ra.test(c)) throw Error("Invalid TrustedResourceUrl format: " + c);
        a = c.replace(sa, function(d, g) {
            if (!Object.prototype.hasOwnProperty.call(b, g)) throw Error('Found marker, "' + g + '", in format string, "' + c + '", but no valid label mapping found in args: ' + JSON.stringify(b));
            d = b[g];
            return d instanceof K ? M(d) : encodeURIComponent(String(d))
        });
        return S(a)
    }
    var sa = /%{(\w+)}/g,
        ra = RegExp("^((https:)?//[0-9a-z.:[\\]-]+/|/[^/\\\\]|[^:/\\\\%]+/|[^:/\\\\%]*[?#]|about:blank#)", "i"),
        oa = {};

    function S(a) {
        if (void 0 === N) {
            var b = null;
            var c = I.trustedTypes;
            if (c && c.createPolicy) {
                try {
                    b = c.createPolicy("goog#html", {
                        createHTML: J,
                        createScript: J,
                        createScriptURL: J
                    })
                } catch (d) {
                    I.console && I.console.error(d.message)
                }
                N = b
            } else N = b
        }
        a = (b = N) ? b.createScriptURL(a) : a;
        return new O(a, oa)
    };
    /*

     SPDX-License-Identifier: Apache-2.0
    */
    function ta(a) {
        var b, c = (a.ownerDocument && a.ownerDocument.defaultView || window).document,
            d = null === (b = c.querySelector) || void 0 === b ? void 0 : b.call(c, "script[nonce]");
        (b = d ? d.nonce || d.getAttribute("nonce") || "" : "") && a.setAttribute("nonce", b)
    };

    function T(a, b, c) {
        a.addEventListener && a.addEventListener(b, c, !1)
    };

    function ua(a, b) {
        var c = !1;
        c = void 0 === c ? !1 : c;
        return new r.Promise(function(d, g) {
            function h() {
                var f;
                e.onload = null;
                e.onerror = null;
                null === (f = e.parentElement) || void 0 === f ? void 0 : f.removeChild(e)
            }
            var e = b.document.createElement("script");
            e.onload = function() {
                h();
                d()
            };
            e.onerror = function() {
                h();
                g(7)
            };
            e.type = "text/javascript";
            e.src = pa(a);
            ta(e);
            c && "complete" !== b.document.readyState ? T(b, "load", function() {
                b.document.body.appendChild(e)
            }) : b.document.body.appendChild(e)
        })
    }

    function va(a, b) {
        var c = window;
        return new r.Promise(function(d) {
            void 0 === b && (b = c.document.createElement("iframe"));
            b.addEventListener("load", function() {
                d(b)
            });
            b.src = pa(a).toString();
            b.width = "0";
            b.height = "0";
            b.style.display = "none";
            c.document.body.appendChild(b)
        })
    };

    function wa(a) {
        return new r.Promise(function(b) {
            setTimeout(function() {
                return void b(void 0)
            }, a)
        })
    }

    function xa(a) {
        a = void 0 === a ? document : a;
        return a.createElement("img")
    };

    function U(a, b, c) {
        var d = window;
        d = void 0 === d ? window : d;
        this.I = b;
        this.h = d;
        this.m = void 0 === c ? 0 : c;
        this.i = qa(new K(L, "https://pagead2.googlesyndication.com/bg/%{basename}.js"), {
            basename: encodeURIComponent(a)
        })
    }

    function ya(a) {
        return H(function(b) {
            switch (b.g) {
                case 1:
                    return E(b, za(a), 2);
                case 2:
                    return E(b, Aa(a), 3);
                case 3:
                    if (!(0 < a.m)) {
                        b.g = 4;
                        break
                    }
                    return E(b, wa(a.m), 4);
                case 4:
                    return b.return(Ba(a))
            }
        })
    }

    function za(a) {
        var b;
        return H(function(c) {
            b = document.createElement("iframe");
            b.style.display = "none";
            document.body.appendChild(b);
            if (!b.contentWindow) throw 3;
            a.h = b.contentWindow;
            return c.return(ua(a.i, a.h))
        })
    }

    function Aa(a) {
        return new r.Promise(function(b, c) {
            a.h.botguard && a.h.botguard.bg ? a.g = new a.h.botguard.bg(a.I, b) : c(5)
        })
    }
    U.prototype.snapshotSync = function() {
        var a = void 0;
        if (this.g && this.g.invoke && (this.g.invoke(function(b) {
                a = b
            }, !1), a)) return a;
        throw 6;
    };

    function Ba(a) {
        return new r.Promise(function(b, c) {
            a.g && a.g.invoke ? a.g.invoke(function(d) {
                b(d)
            }, !0) : c(6)
        })
    };

    function Ca(a) {
        switch (a) {
            case "pt":
            case "cr":
                return a;
            default:
                return ""
        }
    }

    function Da(a) {
        switch (a) {
            case "env":
            case "int":
                return a;
            default:
                return "env"
        }
    }

    function Ea() {
        var a = window.GoogleGcLKhOms;
        if (a && 0 < a.length && (a = a.shift())) return void 0 === a._rc_ ? {
            context: Ca(a._ctx_),
            v: a._bgv_,
            u: a._bgp_,
            F: a._li_,
            D: a._jk_,
            G: Da(a._st_),
            m: a._dl_,
            C: a._g2_
        } : {
            context: Ca(a._ctx_),
            v: a._bgv_,
            u: a._bgp_,
            F: a._li_,
            D: a._jk_,
            G: Da(a._st_),
            H: a._rc_,
            m: a._dl_,
            C: a._g2_
        }
    }

    function Fa() {
        var a = window;
        if (a.GoogleDX5YKUSk) return a.GoogleDX5YKUSk[0];
        var b = new r.Promise(function(c) {
            a.GoogleDX5YKUSk = [b, c]
        });
        return b
    }

    function Ga() {
        return void 0 === window.GoogleGcLKhOms ? 13 : 1
    };

    function V(a) {
        this.g = a
    }

    function Ha(a) {
        this.g = a;
        var b = this;
        this.h = !1;
        var c = new MessageChannel;
        this.port = c.port1;
        this.i = new r.Promise(function(d) {
            b.port.onmessage = function() {
                d()
            };
            b.g.postMessage("GoogleBasRYoCJlVEB", "https://tpc.googlesyndication.com", [c.port2])
        })
    }
    A(Ha, V);

    function Ia(a, b) {
        return H(function(c) {
            return 1 == c.g ? E(c, a.i, 2) : c.return(new r.Promise(function(d, g) {
                var h = new MessageChannel;
                h.port1.onmessage = function(e) {
                    h.port1.close();
                    Array.isArray(e.data) ? d(e.data) : g(9)
                };
                a.port.postMessage(b, [h.port2])
            }))
        })
    }

    function Ja(a, b) {
        var c;
        return H(function(d) {
            if (1 == d.g) return d.s = 2, E(d, Ia(a, [1, b.T, b.I, b.m]), 4);
            if (2 != d.g) return c = d.i, d.return({
                response: c[0],
                error: c[1]
            });
            d.s = 0;
            d.j = null;
            return d.return({
                error: 9
            })
        })
    }

    function Ka() {
        V.apply(this, arguments);
        this.h = !0
    }
    A(Ka, V);

    function La(a, b) {
        Ma(a, void 0 === b ? null : b)
    }

    function Ma(a, b) {
        var c = window;
        c.google_image_requests || (c.google_image_requests = []);
        var d = xa(c.document);
        if (b) {
            var g = function(h) {
                b && b(h);
                d.removeEventListener && d.removeEventListener("load", g, !1);
                d.removeEventListener && d.removeEventListener("error", g, !1)
            };
            T(d, "load", g);
            T(d, "error", g)
        }
        d.src = a;
        c.google_image_requests.push(d)
    };

    function Na() {
        this.url = "https://pagead2.googlesyndication.com/pagead/gen_204?id=sodar2&v=225"
    }

    function W(a, b, c) {
        a.url += "&" + b + "=" + encodeURIComponent(c.toString())
    }

    function X(a, b, c) {
        var d = new Na,
            g = void 0 === b || "0" !== b.C;
        !1 !== c && g || (d.url = "https://pagead2.googlesyndication.com/pagead/sodar?id=sodar2&v=225");
        W(d, "t", a);
        b && (W(d, "li", b.F), W(d, "cr" === b.context ? "bgai" : "jk", b.D));
        return d
    }

    function Y(a) {
        return new r.Promise(function(b) {
            La(a, function() {
                b()
            })
        })
    }

    function Oa(a, b) {
        b = X(1, b);
        W(b, "e", a);
        return Y(b.url)
    };

    function Pa() {
        var a = this;
        this.promise = new r.Promise(function(b, c) {
            a.resolve = b;
            a.reject = c
        })
    };

    function Z(a) {
        this.g = a;
        this.m = 0;
        this.m = Number(this.g.m) || 0
    }

    function Qa(a) {
        return H(function(b) {
            if (1 == b.g) {
                if (Ra(a)) throw 7;
                a.h = new U(a.g.v, a.g.u, a.m);
                return E(b, za(a.h), 2)
            }
            return E(b, Aa(a.h), 0)
        })
    }
    Z.prototype.snapshotSync = function() {
        if (this.h) return this.h.snapshotSync()
    };

    function Sa(a) {
        var b;
        return H(function(c) {
            if (1 == c.g) {
                b = a;
                if (Ra(a)) var d = Ta(a);
                else a.h = new U(a.g.v, a.g.u, a.m), d = ya(a.h);
                return E(c, d, 2)
            }
            b.l = c.i;
            if (a.l) {
                d = a.g;
                var g = a.l,
                    h = X(2, d, void 0 !== g);
                void 0 !== g && W(h, "bg", g);
                d = 2E3 < h.url.length ? Oa(4, d) : Y(h.url);
                c = E(c, d, 0)
            } else c.g = 0, c = void 0;
            return c
        })
    }

    function Ua(a, b) {
        function c(h) {
            h && null !== h.data && "https://www.google.com" === h.origin && null != h.source && h.source === b.contentWindow && (a.i = "id=sodar2&v=225", a.g && (a.i += "&li=" + encodeURIComponent(a.g.F.toString()), a.i += "&" + ("cr" === a.g.context ? "bgai" : "jk") + "=" + encodeURIComponent(a.g.D.toString()), h.source.postMessage(JSON.stringify({
                id: "sodar",
                params: a.i
            }), "https://www.google.com"), d.removeEventListener("message", c, !1)), g.resolve())
        }
        var d = window,
            g = new Pa;
        d.addEventListener("message", c, !1);
        return g.promise
    }

    function Va(a) {
        var b, c, d, g, h;
        return H(function(e) {
            if (1 == e.g) {
                if ("y" !== a.g.H) return e.return();
                b = S(M(new K(L, "https://www.google.com/recaptcha/api2/aframe")));
                c = window.document.createElement("iframe");
                d = va(b, c);
                g = Ua(a, c);
                return E(e, r.Promise.all([d, g]), 2)
            }
            h = e.i;
            if (null === h[0].contentWindow) throw 15;
            e.g = 0
        })
    }

    function Wa(a) {
        return H(function(b) {
            return E(b, w(r.Promise, "allSettled").call(r.Promise, [Sa(a), Va(a)]), 0)
        })
    }

    function Ra(a) {
        return "tpc.googlesyndication.com" === window.location.host || "int" === a.g.G ? !1 : !0
    }

    function Ta(a) {
        var b, c, d;
        return H(function(g) {
            if (1 == g.g) return b = S(M(new K(L, "https://tpc.googlesyndication.com/sodar/sodar2/225/runner.html"))), E(g, va(b), 2);
            if (4 != g.g) {
                c = g.i;
                if (!c.contentWindow) throw 3;
                var h = c.contentWindow;
                h = window.hasOwnProperty("MessageChannel") ? new Ha(h) : new Ka(h);
                a.j = h;
                if (a.j.h) {
                    h = a.j.g;
                    var e = h.postMessage;
                    var f = a.g;
                    f = JSON.stringify([f.context, f.v, f.u, f.F, f.D, f.G, void 0 === f.H ? "n" : f.H, void 0 === f.m ? "0" : f.m, void 0 === f.C ? "1" : f.C]);
                    e.call(h, f, "https://tpc.googlesyndication.com");
                    return g.return(void 0)
                }
                return E(g, Ja(a.j, {
                    T: a.g.v,
                    I: a.g.u,
                    m: a.m
                }), 4)
            }
            d = g.i;
            c.parentNode && c.parentNode.removeChild(c);
            if (d.error) throw d.error;
            return g.return(d.response)
        })
    };

    function Xa() {
        Z.apply(this, arguments)
    }
    A(Xa, Z);
    Xa.prototype.o = function() {
        var a = this,
            b;
        return H(function(c) {
            if (1 == c.g) {
                if ("env" === a.g.G) return E(c, Wa(a), 0);
                b = window;
                return b.GoogleA13IjpGc ? c.return() : E(c, Qa(a), 4)
            }
            b.GoogleA13IjpGc = a;
            c.g = 0
        })
    };

    function Ya() {
        Z.apply(this, arguments)
    }
    A(Ya, Z);
    Ya.prototype.o = function() {
        var a = this;
        return H(function(b) {
            return E(b, Wa(a), 0)
        })
    };

    function Za(a, b) {
        if ("number" === typeof a) b = Oa(a, b);
        else {
            var c = X(3, b);
            W(c, "c", "init");
            var d = a.toString();
            a.name && -1 == d.indexOf(a.name) && (d += ": " + a.name);
            a.message && -1 == d.indexOf(a.message) && (d += ": " + a.message);
            if (a.stack) {
                a = a.stack;
                try {
                    -1 == a.indexOf(d) && (a = d + "\n" + a);
                    for (var g; a != g;) g = a, a = a.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/, "$1");
                    d = a.replace(/\n */g, "\n")
                } catch (h) {}
            }
            W(c, "ex", d);
            b = 2E3 < c.url.length ? Oa(11, b) : Y(c.url)
        }
        return b
    }

    function $a(a) {
        switch (a.context) {
            case "pt":
                a = new Ya(a);
                break;
            case "cr":
                a = new Xa(a);
                break;
            default:
                throw 2;
        }
        if (!window.postMessage && Ra(a)) throw 8;
        return a.o()
    };
    (function() {
        var a = Ea();
        try {
            return a ? $a(a) : r.Promise.race([Fa(), new r.Promise(function(b, c) {
                setTimeout(function() {
                    c(Ga())
                }, 5E3)
            })]).then(function() {
                a = Ea();
                if (!a) throw Ga();
                return $a(a)
            }, function(b) {
                return Za(b, a)
            })
        } catch (b) {
            return Za(b, a)
        }
    })();
}).call(this);