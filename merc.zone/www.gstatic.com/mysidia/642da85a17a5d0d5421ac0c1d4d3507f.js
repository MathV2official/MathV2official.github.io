(function() {
    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    var r;

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
    var ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = c.value;
        return a
    };

    function ca(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math) return c
        }
        throw Error("Cannot find global object");
    }
    var t = ca(this);

    function u(a, b) {
        if (b) a: {
            var c = t;a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
                var e = a[d];
                if (!(e in c)) break a;
                c = c[e]
            }
            a = a[a.length - 1];d = c[a];b = b(d);b != d && null != b && ba(c, a, {
                configurable: !0,
                writable: !0,
                value: b
            })
        }
    }
    u("Symbol", function(a) {
        function b(f) {
            if (this instanceof b) throw new TypeError("Symbol is not a constructor");
            return new c(d + (f || "") + "_" + e++, f)
        }

        function c(f, g) {
            this.h = f;
            ba(this, "description", {
                configurable: !0,
                writable: !0,
                value: g
            })
        }
        if (a) return a;
        c.prototype.toString = function() {
            return this.h
        };
        var d = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_",
            e = 0;
        return b
    });
    u("Symbol.iterator", function(a) {
        if (a) return a;
        a = Symbol("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = t[b[c]];
            "function" === typeof d && "function" != typeof d.prototype[a] && ba(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return da(aa(this))
                }
            })
        }
        return a
    });

    function da(a) {
        a = {
            next: a
        };
        a[Symbol.iterator] = function() {
            return this
        };
        return a
    }

    function w(a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        return b ? b.call(a) : {
            next: aa(a)
        }
    }

    function x(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }
    var ea = "function" == typeof Object.create ? Object.create : function(a) {
            function b() {}
            b.prototype = a;
            return new b
        },
        ha;
    if ("function" == typeof Object.setPrototypeOf) ha = Object.setPrototypeOf;
    else {
        var ia;
        a: {
            var ka = {
                    a: !0
                },
                la = {};
            try {
                la.__proto__ = ka;
                ia = la.a;
                break a
            } catch (a) {}
            ia = !1
        }
        ha = ia ? function(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
            return a
        } : null
    }
    var ma = ha;

    function y(a, b) {
        a.prototype = ea(b.prototype);
        a.prototype.constructor = a;
        if (ma) ma(a, b);
        else
            for (var c in b)
                if ("prototype" != c)
                    if (Object.defineProperties) {
                        var d = Object.getOwnPropertyDescriptor(b, c);
                        d && Object.defineProperty(a, c, d)
                    } else a[c] = b[c];
        a.ka = b.prototype
    }

    function na() {
        this.l = !1;
        this.i = null;
        this.o = void 0;
        this.h = 1;
        this.B = 0;
        this.j = null
    }

    function oa(a) {
        if (a.l) throw new TypeError("Generator is already running");
        a.l = !0
    }
    na.prototype.s = function(a) {
        this.o = a
    };

    function pa(a, b) {
        a.j = {
            ga: b,
            ha: !0
        };
        a.h = a.B
    }
    na.prototype.return = function(a) {
        this.j = {
            return: a
        };
        this.h = this.B
    };

    function qa(a) {
        this.h = new na;
        this.i = a
    }

    function ra(a, b) {
        oa(a.h);
        var c = a.h.i;
        if (c) return sa(a, "return" in c ? c["return"] : function(d) {
            return {
                value: d,
                done: !0
            }
        }, b, a.h.return);
        a.h.return(b);
        return ta(a)
    }

    function sa(a, b, c, d) {
        try {
            var e = b.call(a.h.i, c);
            if (!(e instanceof Object)) throw new TypeError("Iterator result " + e + " is not an object");
            if (!e.done) return a.h.l = !1, e;
            var f = e.value
        } catch (g) {
            return a.h.i = null, pa(a.h, g), ta(a)
        }
        a.h.i = null;
        d.call(a.h, f);
        return ta(a)
    }

    function ta(a) {
        for (; a.h.h;) try {
            var b = a.i(a.h);
            if (b) return a.h.l = !1, {
                value: b.value,
                done: !1
            }
        } catch (c) {
            a.h.o = void 0, pa(a.h, c)
        }
        a.h.l = !1;
        if (a.h.j) {
            b = a.h.j;
            a.h.j = null;
            if (b.ha) throw b.ga;
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

    function ua(a) {
        this.next = function(b) {
            oa(a.h);
            a.h.i ? b = sa(a, a.h.i.next, b, a.h.s) : (a.h.s(b), b = ta(a));
            return b
        };
        this.throw = function(b) {
            oa(a.h);
            a.h.i ? b = sa(a, a.h.i["throw"], b, a.h.s) : (pa(a.h, b), b = ta(a));
            return b
        };
        this.return = function(b) {
            return ra(a, b)
        };
        this[Symbol.iterator] = function() {
            return this
        }
    }

    function va(a) {
        function b(d) {
            return a.next(d)
        }

        function c(d) {
            return a.throw(d)
        }
        new Promise(function(d, e) {
            function f(g) {
                g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e)
            }
            f(a.next())
        })
    }

    function wa() {
        for (var a = Number(this), b = [], c = a; c < arguments.length; c++) b[c - a] = arguments[c];
        return b
    }
    u("Promise", function(a) {
        function b(g) {
            this.i = 0;
            this.j = void 0;
            this.h = [];
            this.B = !1;
            var h = this.l();
            try {
                g(h.resolve, h.reject)
            } catch (k) {
                h.reject(k)
            }
        }

        function c() {
            this.h = null
        }

        function d(g) {
            return g instanceof b ? g : new b(function(h) {
                h(g)
            })
        }
        if (a) return a;
        c.prototype.i = function(g) {
            if (null == this.h) {
                this.h = [];
                var h = this;
                this.j(function() {
                    h.o()
                })
            }
            this.h.push(g)
        };
        var e = t.setTimeout;
        c.prototype.j = function(g) {
            e(g, 0)
        };
        c.prototype.o = function() {
            for (; this.h && this.h.length;) {
                var g = this.h;
                this.h = [];
                for (var h = 0; h < g.length; ++h) {
                    var k =
                        g[h];
                    g[h] = null;
                    try {
                        k()
                    } catch (l) {
                        this.l(l)
                    }
                }
            }
            this.h = null
        };
        c.prototype.l = function(g) {
            this.j(function() {
                throw g;
            })
        };
        b.prototype.l = function() {
            function g(l) {
                return function(m) {
                    k || (k = !0, l.call(h, m))
                }
            }
            var h = this,
                k = !1;
            return {
                resolve: g(this.J),
                reject: g(this.o)
            }
        };
        b.prototype.J = function(g) {
            if (g === this) this.o(new TypeError("A Promise cannot resolve to itself"));
            else if (g instanceof b) this.M(g);
            else {
                a: switch (typeof g) {
                    case "object":
                        var h = null != g;
                        break a;
                    case "function":
                        h = !0;
                        break a;
                    default:
                        h = !1
                }
                h ? this.I(g) : this.s(g)
            }
        };
        b.prototype.I = function(g) {
            var h = void 0;
            try {
                h = g.then
            } catch (k) {
                this.o(k);
                return
            }
            "function" == typeof h ? this.N(h, g) : this.s(g)
        };
        b.prototype.o = function(g) {
            this.F(2, g)
        };
        b.prototype.s = function(g) {
            this.F(1, g)
        };
        b.prototype.F = function(g, h) {
            if (0 != this.i) throw Error("Cannot settle(" + g + ", " + h + "): Promise already settled in state" + this.i);
            this.i = g;
            this.j = h;
            2 === this.i && this.L();
            this.G()
        };
        b.prototype.L = function() {
            var g = this;
            e(function() {
                if (g.H()) {
                    var h = t.console;
                    "undefined" !== typeof h && h.error(g.j)
                }
            }, 1)
        };
        b.prototype.H =
            function() {
                if (this.B) return !1;
                var g = t.CustomEvent,
                    h = t.Event,
                    k = t.dispatchEvent;
                if ("undefined" === typeof k) return !0;
                "function" === typeof g ? g = new g("unhandledrejection", {
                    cancelable: !0
                }) : "function" === typeof h ? g = new h("unhandledrejection", {
                    cancelable: !0
                }) : (g = t.document.createEvent("CustomEvent"), g.initCustomEvent("unhandledrejection", !1, !0, g));
                g.promise = this;
                g.reason = this.j;
                return k(g)
            };
        b.prototype.G = function() {
            if (null != this.h) {
                for (var g = 0; g < this.h.length; ++g) f.i(this.h[g]);
                this.h = null
            }
        };
        var f = new c;
        b.prototype.M =
            function(g) {
                var h = this.l();
                g.O(h.resolve, h.reject)
            };
        b.prototype.N = function(g, h) {
            var k = this.l();
            try {
                g.call(h, k.resolve, k.reject)
            } catch (l) {
                k.reject(l)
            }
        };
        b.prototype.then = function(g, h) {
            function k(p, q) {
                return "function" == typeof p ? function(v) {
                    try {
                        l(p(v))
                    } catch (V) {
                        m(V)
                    }
                } : q
            }
            var l, m, n = new b(function(p, q) {
                l = p;
                m = q
            });
            this.O(k(g, l), k(h, m));
            return n
        };
        b.prototype.catch = function(g) {
            return this.then(void 0, g)
        };
        b.prototype.O = function(g, h) {
            function k() {
                switch (l.i) {
                    case 1:
                        g(l.j);
                        break;
                    case 2:
                        h(l.j);
                        break;
                    default:
                        throw Error("Unexpected state: " +
                            l.i);
                }
            }
            var l = this;
            null == this.h ? f.i(k) : this.h.push(k);
            this.B = !0
        };
        b.resolve = d;
        b.reject = function(g) {
            return new b(function(h, k) {
                k(g)
            })
        };
        b.race = function(g) {
            return new b(function(h, k) {
                for (var l = w(g), m = l.next(); !m.done; m = l.next()) d(m.value).O(h, k)
            })
        };
        b.all = function(g) {
            var h = w(g),
                k = h.next();
            return k.done ? d([]) : new b(function(l, m) {
                function n(v) {
                    return function(V) {
                        p[v] = V;
                        q--;
                        0 == q && l(p)
                    }
                }
                var p = [],
                    q = 0;
                do p.push(void 0), q++, d(k.value).O(n(p.length - 1), m), k = h.next(); while (!k.done)
            })
        };
        return b
    });
    u("WeakMap", function(a) {
        function b(k) {
            this.h = (h += Math.random() + 1).toString();
            if (k) {
                k = w(k);
                for (var l; !(l = k.next()).done;) l = l.value, this.set(l[0], l[1])
            }
        }

        function c() {}

        function d(k) {
            var l = typeof k;
            return "object" === l && null !== k || "function" === l
        }

        function e(k) {
            if (!x(k, g)) {
                var l = new c;
                ba(k, g, {
                    value: l
                })
            }
        }

        function f(k) {
            var l = Object[k];
            l && (Object[k] = function(m) {
                if (m instanceof c) return m;
                Object.isExtensible(m) && e(m);
                return l(m)
            })
        }
        if (function() {
                if (!a || !Object.seal) return !1;
                try {
                    var k = Object.seal({}),
                        l = Object.seal({}),
                        m = new a([
                            [k, 2],
                            [l, 3]
                        ]);
                    if (2 != m.get(k) || 3 != m.get(l)) return !1;
                    m.delete(k);
                    m.set(l, 4);
                    return !m.has(k) && 4 == m.get(l)
                } catch (n) {
                    return !1
                }
            }()) return a;
        var g = "$jscomp_hidden_" + Math.random();
        f("freeze");
        f("preventExtensions");
        f("seal");
        var h = 0;
        b.prototype.set = function(k, l) {
            if (!d(k)) throw Error("Invalid WeakMap key");
            e(k);
            if (!x(k, g)) throw Error("WeakMap key fail: " + k);
            k[g][this.h] = l;
            return this
        };
        b.prototype.get = function(k) {
            return d(k) && x(k, g) ? k[g][this.h] : void 0
        };
        b.prototype.has = function(k) {
            return d(k) && x(k,
                g) && x(k[g], this.h)
        };
        b.prototype.delete = function(k) {
            return d(k) && x(k, g) && x(k[g], this.h) ? delete k[g][this.h] : !1
        };
        return b
    });
    u("Map", function(a) {
        function b() {
            var h = {};
            return h.C = h.next = h.head = h
        }

        function c(h, k) {
            var l = h.h;
            return da(function() {
                if (l) {
                    for (; l.head != h.h;) l = l.C;
                    for (; l.next != l.head;) return l = l.next, {
                        done: !1,
                        value: k(l)
                    };
                    l = null
                }
                return {
                    done: !0,
                    value: void 0
                }
            })
        }

        function d(h, k) {
            var l = k && typeof k;
            "object" == l || "function" == l ? f.has(k) ? l = f.get(k) : (l = "" + ++g, f.set(k, l)) : l = "p_" + k;
            var m = h.i[l];
            if (m && x(h.i, l))
                for (h = 0; h < m.length; h++) {
                    var n = m[h];
                    if (k !== k && n.key !== n.key || k === n.key) return {
                        id: l,
                        list: m,
                        index: h,
                        u: n
                    }
                }
            return {
                id: l,
                list: m,
                index: -1,
                u: void 0
            }
        }

        function e(h) {
            this.i = {};
            this.h = b();
            this.size = 0;
            if (h) {
                h = w(h);
                for (var k; !(k = h.next()).done;) k = k.value, this.set(k[0], k[1])
            }
        }
        if (function() {
                if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
                try {
                    var h = Object.seal({
                            x: 4
                        }),
                        k = new a(w([
                            [h, "s"]
                        ]));
                    if ("s" != k.get(h) || 1 != k.size || k.get({
                            x: 4
                        }) || k.set({
                            x: 4
                        }, "t") != k || 2 != k.size) return !1;
                    var l = k.entries(),
                        m = l.next();
                    if (m.done || m.value[0] != h || "s" != m.value[1]) return !1;
                    m = l.next();
                    return m.done || 4 != m.value[0].x ||
                        "t" != m.value[1] || !l.next().done ? !1 : !0
                } catch (n) {
                    return !1
                }
            }()) return a;
        var f = new WeakMap;
        e.prototype.set = function(h, k) {
            h = 0 === h ? 0 : h;
            var l = d(this, h);
            l.list || (l.list = this.i[l.id] = []);
            l.u ? l.u.value = k : (l.u = {
                next: this.h,
                C: this.h.C,
                head: this.h,
                key: h,
                value: k
            }, l.list.push(l.u), this.h.C.next = l.u, this.h.C = l.u, this.size++);
            return this
        };
        e.prototype.delete = function(h) {
            h = d(this, h);
            return h.u && h.list ? (h.list.splice(h.index, 1), h.list.length || delete this.i[h.id], h.u.C.next = h.u.next, h.u.next.C = h.u.C, h.u.head = null, this.size--, !0) : !1
        };
        e.prototype.clear = function() {
            this.i = {};
            this.h = this.h.C = b();
            this.size = 0
        };
        e.prototype.has = function(h) {
            return !!d(this, h).u
        };
        e.prototype.get = function(h) {
            return (h = d(this, h).u) && h.value
        };
        e.prototype.entries = function() {
            return c(this, function(h) {
                return [h.key, h.value]
            })
        };
        e.prototype.keys = function() {
            return c(this, function(h) {
                return h.key
            })
        };
        e.prototype.values = function() {
            return c(this, function(h) {
                return h.value
            })
        };
        e.prototype.forEach = function(h, k) {
            for (var l = this.entries(), m; !(m = l.next()).done;) m = m.value,
                h.call(k, m[1], m[0], this)
        };
        e.prototype[Symbol.iterator] = e.prototype.entries;
        var g = 0;
        return e
    });

    function xa(a, b, c) {
        if (null == a) throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
        if (b instanceof RegExp) throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
        return a + ""
    }

    function ya(a, b) {
        a instanceof String && (a += "");
        var c = 0,
            d = !1,
            e = {
                next: function() {
                    if (!d && c < a.length) {
                        var f = c++;
                        return {
                            value: b(f, a[f]),
                            done: !1
                        }
                    }
                    d = !0;
                    return {
                        done: !0,
                        value: void 0
                    }
                }
            };
        e[Symbol.iterator] = function() {
            return e
        };
        return e
    }
    u("Array.prototype.entries", function(a) {
        return a ? a : function() {
            return ya(this, function(b, c) {
                return [b, c]
            })
        }
    });
    u("Array.prototype.keys", function(a) {
        return a ? a : function() {
            return ya(this, function(b) {
                return b
            })
        }
    });
    u("Object.is", function(a) {
        return a ? a : function(b, c) {
            return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c
        }
    });
    u("Array.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            var d = this;
            d instanceof String && (d = String(d));
            var e = d.length;
            c = c || 0;
            for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
                var f = d[c];
                if (f === b || Object.is(f, b)) return !0
            }
            return !1
        }
    });
    u("String.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            return -1 !== xa(this, b, "includes").indexOf(b, c || 0)
        }
    });
    u("Number.isNaN", function(a) {
        return a ? a : function(b) {
            return "number" === typeof b && isNaN(b)
        }
    });
    u("Array.from", function(a) {
        return a ? a : function(b, c, d) {
            c = null != c ? c : function(h) {
                return h
            };
            var e = [],
                f = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
            if ("function" == typeof f) {
                b = f.call(b);
                for (var g = 0; !(f = b.next()).done;) e.push(c.call(d, f.value, g++))
            } else
                for (f = b.length, g = 0; g < f; g++) e.push(c.call(d, b[g], g));
            return e
        }
    });
    u("Object.entries", function(a) {
        return a ? a : function(b) {
            var c = [],
                d;
            for (d in b) x(b, d) && c.push([d, b[d]]);
            return c
        }
    });
    u("String.prototype.startsWith", function(a) {
        return a ? a : function(b, c) {
            var d = xa(this, b, "startsWith"),
                e = d.length,
                f = b.length;
            c = Math.max(0, Math.min(c | 0, d.length));
            for (var g = 0; g < f && c < e;)
                if (d[c++] != b[g++]) return !1;
            return g >= f
        }
    });
    var z = this || self;

    function za(a) {
        var b = a.url;
        a = a.Y;
        this.l = b;
        this.s = a;
        a = /[?&]dsh=1(&|$)/.test(b);
        this.i = !a && /[?&]ae=1(&|$)/.test(b);
        this.o = !a && /[?&]ae=2(&|$)/.test(b);
        if ((this.h = /[?&]adurl=([^&]*)/.exec(b)) && this.h[1]) {
            try {
                var c = decodeURIComponent(this.h[1])
            } catch (d) {
                c = null
            }
            this.j = c
        }
    }

    function Aa(a) {
        var b = "&act=1&ri=1";
        a.i && a.s && (b += Ba(a));
        return Ca(a, b)
    }

    function Da(a, b) {
        return a.i && a.j || a.o ? 1 == b ? a.i ? a.j : Ca(a, "&dct=1") : 2 == b ? Ca(a, "&ri=2") : Ca(a, "&ri=16") : a.l
    }

    function Ca(a, b) {
        return a.h ? a.l.slice(0, a.h.index) + b + a.l.slice(a.h.index) : a.l + b
    }

    function Ba(a) {
        a = a.s;
        var b = encodeURIComponent,
            c = "";
        a.platform && (c += "&uap=" + b(a.platform));
        a.platformVersion && (c += "&uapv=" + b(a.platformVersion));
        a.uaFullVersion && (c += "&uafv=" + b(a.uaFullVersion));
        a.architecture && (c += "&uaa=" + b(a.architecture));
        a.model && (c += "&uam=" + b(a.model));
        a.bitness && (c += "&uab=" + b(a.bitness));
        a.fullVersionList && (c += "&uafvl=" + b(a.fullVersionList.map(function(d) {
            return b(d.brand) + ";" + b(d.version)
        }).join("|")));
        "undefined" !== typeof a.wow64 && (c += "&uaw=" + Number(a.wow64));
        return c
    };

    function A(a) {
        var b;
        a: {
            if (b = z.navigator)
                if (b = b.userAgent) break a;b = ""
        }
        return -1 != b.indexOf(a)
    };

    function B(a, b) {
        this.h = b === Ea ? a : ""
    }
    B.prototype.toString = function() {
        return this.h.toString()
    };
    B.prototype.i = !0;
    var Fa = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
        Ea = {},
        Ga = new B("about:invalid#zClosurez", Ea);
    var Ha = Array.prototype.indexOf ? function(a, b) {
            return Array.prototype.indexOf.call(a, b, void 0)
        } : function(a, b) {
            if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
            for (var c = 0; c < a.length; c++)
                if (c in a && a[c] === b) return c;
            return -1
        },
        Ia = Array.prototype.forEach ? function(a, b) {
            Array.prototype.forEach.call(a, b, void 0)
        } : function(a, b) {
            for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++) e in d && b.call(void 0, d[e], e, a)
        },
        Ja = Array.prototype.map ? function(a, b) {
            return Array.prototype.map.call(a,
                b, void 0)
        } : function(a, b) {
            for (var c = a.length, d = Array(c), e = "string" === typeof a ? a.split("") : a, f = 0; f < c; f++) f in e && (d[f] = b.call(void 0, e[f], f, a));
            return d
        };

    function Ka(a, b) {
        a: {
            for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
                if (e in d && b.call(void 0, d[e], e, a)) {
                    b = e;
                    break a
                }
            b = -1
        }
        return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b]
    };

    function La(a) {
        var b = !1,
            c;
        return function() {
            b || (c = a(), b = !0);
            return c
        }
    };

    function Ma(a, b) {
        b instanceof B || b instanceof B || (b = "object" == typeof b && b.i ? b.h.toString() : String(b), Fa.test(b) || (b = "about:invalid#zClosurez"), b = new B(b, Ea));
        a.href = b instanceof B && b.constructor === B ? b.h : "type_error:SafeUrl"
    };
    /*

     SPDX-License-Identifier: Apache-2.0
    */
    function Na(a) {
        this.ia = a
    }

    function C(a) {
        return new Na(function(b) {
            return b.substr(0, a.length + 1).toLowerCase() === a + ":"
        })
    }
    var Oa = new Na(function(a) {
            return /^[^:]*([/?#]|$)/.test(a)
        }),
        Pa = C("http"),
        Qa = C("https"),
        Ra = C("ftp"),
        Sa = C("mailto"),
        Ta = C("intent"),
        Ua = C("market"),
        Va = C("itms"),
        Wa = C("itms-appss"),
        Xa = [C("data"), Pa, Qa, Sa, Ra, Oa];

    function Ya() {
        return A("iPhone") && !A("iPod") && !A("iPad")
    };

    function Za(a) {
        Za[" "](a);
        return a
    }
    Za[" "] = function() {};
    var $a = Ya(),
        ab = A("iPad");
    var bb = Ya() || A("iPod"),
        cb = A("iPad");
    var db = {},
        eb = null;

    function fb(a, b) {
        void 0 === b && (b = 0);
        if (!eb) {
            eb = {};
            for (var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), d = ["+/=", "+/", "-_=", "-_.", "-_"], e = 0; 5 > e; e++) {
                var f = c.concat(d[e].split(""));
                db[e] = f;
                for (var g = 0; g < f.length; g++) {
                    var h = f[g];
                    void 0 === eb[h] && (eb[h] = g)
                }
            }
        }
        b = db[b];
        c = Array(Math.floor(a.length / 3));
        d = b[64] || "";
        for (e = f = 0; f < a.length - 2; f += 3) {
            var k = a[f],
                l = a[f + 1];
            h = a[f + 2];
            g = b[k >> 2];
            k = b[(k & 3) << 4 | l >> 4];
            l = b[(l & 15) << 2 | h >> 6];
            h = b[h & 63];
            c[e++] = g + k + l + h
        }
        g = 0;
        h = d;
        switch (a.length - f) {
            case 2:
                g =
                    a[f + 1], h = b[(g & 15) << 2] || d;
            case 1:
                a = a[f], c[e] = b[a >> 2] + b[(a & 3) << 4 | g >> 4] + h + d
        }
        return c.join("")
    };
    var gb = "undefined" !== typeof Uint8Array,
        ib = {};
    var jb;

    function kb(a) {
        if (ib !== ib) throw Error("illegal external caller");
        this.Z = a;
        if (null != a && 0 === a.length) throw Error("ByteString should be constructed with non-empty values");
    };
    var D = "function" === typeof Symbol && "symbol" === typeof Symbol() ? Symbol() : void 0;

    function E(a, b) {
        if (D) return a[D] |= b;
        if (void 0 !== a.A) return a.A |= b;
        Object.defineProperties(a, {
            A: {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !1
            }
        });
        return b
    }

    function lb(a, b) {
        D ? a[D] && (a[D] &= ~b) : void 0 !== a.A && (a.A &= ~b)
    }

    function F(a) {
        var b;
        D ? b = a[D] : b = a.A;
        return null == b ? 0 : b
    }

    function G(a, b) {
        D ? a[D] = b : void 0 !== a.A ? a.A = b : Object.defineProperties(a, {
            A: {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !1
            }
        })
    }

    function nb(a) {
        E(a, 1);
        return a
    }

    function H(a) {
        return !!(F(a) & 2)
    }

    function I(a) {
        E(a, 2);
        return a
    }

    function J(a) {
        E(a, 16);
        return a
    }

    function ob(a, b) {
        G(b, (a | 0) & -51)
    }

    function pb(a, b) {
        G(b, (a | 18) & -41)
    };
    var qb = {};

    function rb(a) {
        return null !== a && "object" === typeof a && !Array.isArray(a) && a.constructor === Object
    }
    var sb, tb, ub = [];
    G(ub, 23);
    tb = Object.freeze(ub);

    function vb(a) {
        if (H(a.m)) throw Error("Cannot mutate an immutable Message");
    }

    function wb(a) {
        this.i = 0;
        this.h = a
    }
    wb.prototype.next = function() {
        return this.i < this.h.length ? {
            done: !1,
            value: this.h[this.i++]
        } : {
            done: !0,
            value: void 0
        }
    };
    wb.prototype[Symbol.iterator] = function() {
        return this
    };

    function xb(a) {
        var b = a.length;
        (b = b ? a[b - 1] : void 0) && rb(b) ? b.g = 1 : (b = {}, a.push((b.g = 1, b)))
    };

    function yb(a, b, c) {
        var d = !1;
        if (null != a && "object" === typeof a && !(d = Array.isArray(a)) && a.R === qb) return a;
        if (d) return new b(a);
        if (c) return new b
    };

    function K(a, b, c, d) {
        d = void 0 === d ? zb : d;
        c = F(a);
        c |= 32;
        G(a, c);
        this.i = c;
        this.j = (this.l = b) ? Ab : Bb;
        this.s = d;
        this.h = b = new Map;
        for (d = 0; d < a.length; d++) c = a[d], b.set(c[0], c[1]);
        this.size = b.size
    }

    function Cb(a, b) {
        return new K(b, a.l, a.j, a.s)
    }

    function Db(a, b) {
        b = void 0 === b ? Eb : b;
        for (var c = Hb(a), d = 0; d < c.length; d++) {
            var e = c[d],
                f = a.h.get(c[d]);
            c[d] = [b(e), b(f)]
        }
        return c
    }

    function Ib(a, b) {
        b = void 0 === b ? Eb : b;
        var c = [];
        a = a.h.entries();
        for (var d; !(d = a.next()).done;) d = d.value, d[0] = b(d[0]), d[1] = b(d[1]), c.push(d);
        return c
    }
    r = K.prototype;
    r.entries = function() {
        for (var a = Hb(this), b = 0; b < a.length; b++) {
            var c = a[b];
            a[b] = [c, this.get(c)]
        }
        return new wb(a)
    };
    r.keys = function() {
        var a = Hb(this);
        return new wb(a)
    };
    r.values = function() {
        for (var a = Hb(this), b = 0; b < a.length; b++) a[b] = this.get(a[b]);
        return new wb(a)
    };
    r.forEach = function(a, b) {
        for (var c = Hb(this), d = 0; d < c.length; d++) {
            var e = c[d];
            a.call(b, this.get(e), e, this)
        }
    };
    r.set = function(a, b) {
        if (this.i & 2) throw Error("Cannot mutate an immutable Map");
        var c = this.h;
        if (null == b) return c.delete(a), this;
        c.set(a, this.j(b, this.l, !1, this.o));
        this.size = c.size;
        return this
    };
    r.get = function(a) {
        var b = this.h;
        if (b.has(a)) {
            var c = b.get(a),
                d = this.i,
                e = this.l;
            e && Array.isArray(c) && d & 16 && J(c);
            d = this.j(c, e, !!(d & 2), this.o);
            d !== c && b.set(a, d);
            return d
        }
    };
    r.has = function(a) {
        return this.h.has(a)
    };

    function Hb(a) {
        return Array.from(a.h.keys()).sort(Jb)
    }
    K.prototype[Symbol.iterator] = function() {
        return this.entries()
    };

    function Jb(a, b) {
        a = "" + a;
        b = "" + b;
        return a > b ? 1 : a < b ? -1 : 0
    }

    function Ab(a, b, c, d) {
        a = yb(a, b, !0);
        c ? I(a.m) : d && (a = Kb(a));
        return a
    }

    function Bb(a) {
        return a
    }

    function zb(a) {
        return a
    }

    function Eb(a) {
        return a
    };
    var Lb;

    function Mb(a) {
        switch (typeof a) {
            case "number":
                return isFinite(a) ? a : String(a);
            case "object":
                if (a)
                    if (Array.isArray(a)) {
                        if (0 !== (F(a) & 128)) return a = Array.prototype.slice.call(a), xb(a), a
                    } else {
                        if (gb && null != a && a instanceof Uint8Array) return fb(a);
                        if (a instanceof kb) {
                            var b = a.Z;
                            return null == b ? "" : "string" === typeof b ? b : a.Z = fb(b)
                        }
                        if (a instanceof K) return Db(a)
                    }
        }
        return a
    };

    function Nb(a, b, c, d) {
        if (null != a) {
            if (Array.isArray(a)) a = Ob(a, b, c, void 0 !== d);
            else if (rb(a)) {
                var e = {},
                    f;
                for (f in a) e[f] = Nb(a[f], b, c, d);
                a = e
            } else a = b(a, d);
            return a
        }
    }

    function Ob(a, b, c, d) {
        var e = F(a);
        d = d ? !!(e & 16) : void 0;
        a = Array.prototype.slice.call(a);
        for (var f = 0; f < a.length; f++) a[f] = Nb(a[f], b, c, d);
        c(e, a);
        return a
    }

    function Pb(a) {
        return Nb(a, Qb, Rb)
    }

    function Qb(a) {
        return a.R === qb ? a.toJSON() : a instanceof K ? Db(a, Pb) : Mb(a)
    }

    function Sb(a) {
        return Nb(a, Tb, Rb)
    }

    function Tb(a) {
        if (!a) return a;
        if ("object" === typeof a) {
            if (gb && null != a && a instanceof Uint8Array) return new Uint8Array(a);
            if (a instanceof K) return a.size ? Cb(a, J(Ib(a, Sb))) : [];
            if (a.R === qb) return Ub(a)
        }
        return a
    }

    function Rb(a, b) {
        a & 128 && xb(b)
    };

    function Vb(a) {
        return a.h || (a.h = a.m[a.i + a.D] = {})
    }

    function L(a, b, c) {
        return -1 === b ? null : b >= a.i ? a.h ? a.h[b] : void 0 : c && a.h && (c = a.h[b], null != c) ? c : a.m[b + a.D]
    }

    function M(a, b, c, d) {
        vb(a);
        return N(a, b, c, d)
    }

    function N(a, b, c, d) {
        a.j && (a.j = void 0);
        if (b >= a.i || d) return Vb(a)[b] = c, a;
        a.m[b + a.D] = c;
        (c = a.h) && b in c && delete c[b];
        return a
    }

    function Wb(a, b, c) {
        return void 0 !== Xb(a, b, c, !1)
    }

    function Yb(a, b, c, d, e) {
        var f = L(a, b, d);
        Array.isArray(f) || (f = tb);
        var g = F(f);
        g & 1 || nb(f);
        if (e) g & 2 || I(f), c & 1 || Object.freeze(f);
        else {
            e = !(c & 2);
            var h = g & 2;
            c & 1 || !h ? e && g & 16 && !h && lb(f, 16) : (f = nb(Array.prototype.slice.call(f)), N(a, b, f, d))
        }
        return f
    }

    function Zb(a, b) {
        var c = H(a.m),
            d = Yb(a, b, 1, !1, c),
            e = F(d);
        if (!(e & 4)) {
            Object.isFrozen(d) && (d = nb(d.slice()), N(a, b, d, !1));
            for (var f = 0, g = 0; f < d.length; f++) {
                var h = d[f];
                null != h && (d[g++] = h)
            }
            g < f && (d.length = g);
            E(d, 5);
            c && (I(d), Object.freeze(d))
        }!c && (e & 2 || Object.isFrozen(d)) && (d = Array.prototype.slice.call(d), E(d, 5), c = d, null == c ? c = tb : (e = F(c), 1 !== (e & 1) && (Object.isFrozen(c) && (c = Array.prototype.slice.call(c)), G(c, e | 1))), M(a, b, c, !1));
        return d
    }

    function $b(a, b, c) {
        a = L(a, b);
        return null == a ? c : a
    }
    var ac;

    function bc(a, b, c) {
        var d = H(a.m);
        b: {
            var e = L(a, b),
                f = !1;
            if (null == e) {
                if (d) {
                    a = ac || (ac = new K(I([])));
                    break b
                }
                e = []
            } else if (e.constructor === K) {
                if (0 == (e.i & 2) || d) {
                    a = e;
                    break b
                }
                e = Ib(e)
            } else Array.isArray(e) ? f = H(e) : e = [];
            if (d) {
                if (!e.length) {
                    a = ac || (ac = new K(I([])));
                    break b
                }
                f || (f = !0, I(e))
            } else if (f) {
                f = !1;
                e = Array.prototype.slice.call(e);
                for (var g = 0; g < e.length; g++) {
                    var h = e[g] = Array.prototype.slice.call(e[g]);
                    Array.isArray(h[1]) && (h[1] = I(h[1]))
                }
            }
            f || (F(e) & 32 ? lb(e, 16) : F(a.m) & 16 && J(e));f = new K(e, c);N(a, b, f, !1);a = f
        }
        null ==
            a ? c = a : (!d && c && (a.o = !0), c = a);
        return c
    }

    function Xb(a, b, c, d) {
        var e = L(a, c, d);
        b = yb(e, b);
        b !== e && null != b && (N(a, c, b, d), E(b.m, F(a.m) & 18));
        return b
    }

    function O(a, b, c) {
        var d = void 0 === d ? !1 : d;
        b = Xb(a, b, c, d);
        if (null == b) return b;
        if (!H(a.m)) {
            var e = Kb(b);
            e !== b && (b = e, N(a, c, b, d))
        }
        return b
    }

    function cc(a, b, c, d) {
        var e = H(a.m);
        a.v || (a.v = {});
        var f = a.v[c];
        var g = Yb(a, c, 3, d, e);
        if (f) e || (Object.isFrozen(f) ? e || (f = Array.prototype.slice.call(f), a.v[c] = f) : e && Object.freeze(f));
        else {
            f = [];
            var h = !!(F(a.m) & 16),
                k = H(g);
            !e && k && (g = nb(Array.prototype.slice.call(g)), N(a, c, g, d));
            for (var l = k, m = 0; m < g.length; m++) {
                var n = g[m];
                var p = b;
                var q = h,
                    v = !1;
                v = void 0 === v ? !1 : v;
                q = void 0 === q ? !1 : q;
                p = Array.isArray(n) ? new p(q ? J(n) : n) : v ? new p : void 0;
                void 0 !== p && (l = l || H(n), f.push(p), k && I(p.m))
            }
            a.v[c] = f;
            Object.isFrozen(g) || (b = F(g) | 33,
                G(g, l ? b & -9 : b | 8));
            (e || e && k) && I(f);
            (e || e) && Object.freeze(f)
        }
        a = Yb(a, c, 3, d, e);
        if (!(e || F(a) & 8)) {
            for (e = 0; e < f.length; e++) c = f[e], d = Kb(c), c !== d && (f[e] = d, a[e] = f[e].m);
            E(a, 8)
        }
        return f
    }

    function dc(a, b, c, d) {
        vb(a);
        if (null != c) {
            var e = nb([]);
            for (var f = !1, g = 0; g < c.length; g++) e[g] = c[g].m, f = f || H(e[g]);
            a.v || (a.v = {});
            a.v[b] = c;
            c = e;
            f ? lb(c, 8) : E(c, 8)
        } else a.v && (a.v[b] = void 0), e = tb;
        return N(a, b, e, d)
    }

    function ec(a, b) {
        return null == a ? b : a
    }

    function P(a, b) {
        return ec(L(a, b), "")
    }

    function Q(a, b) {
        a = L(a, b);
        return ec(null == a ? a : !!a, !1)
    };

    function fc(a) {
        var b = F(a);
        if (b & 2) return a;
        a = Ja(a, gc);
        pb(b, a);
        Object.freeze(a);
        return a
    }

    function hc(a, b, c) {
        c = void 0 === c ? pb : c;
        if (null != a) {
            if (gb && a instanceof Uint8Array) return a.length ? new kb(new Uint8Array(a)) : jb || (jb = new kb(null));
            if (Array.isArray(a)) {
                var d = F(a);
                if (d & 2) return a;
                if (b && !(d & 32) && (d & 16 || 0 === d)) return G(a, d | 2), a;
                a = Ob(a, hc, c, !0);
                b = F(a);
                b & 4 && b & 2 && Object.freeze(a);
                return a
            }
            return a.R === qb ? gc(a) : a instanceof K ? Cb(a, I(Ib(a, hc))) : a
        }
    }

    function gc(a) {
        if (H(a.m)) return a;
        a = ic(a, !0);
        I(a.m);
        return a
    }

    function ic(a, b) {
        var c = a.m,
            d = J([]),
            e = a.constructor.h;
        e && d.push(e);
        0 !== (F(c) & 128) && xb(d);
        b = b || H(a.m) ? pb : ob;
        e = a.constructor;
        Lb = d;
        d = new e(d);
        Lb = void 0;
        a.K && (d.K = a.K.slice());
        e = !!(F(c) & 16);
        for (var f = 0; f < c.length; f++) {
            var g = c[f];
            if (f === c.length - 1 && rb(g))
                for (var h in g) {
                    var k = +h;
                    if (Number.isNaN(k)) Vb(d)[k] = g[k];
                    else {
                        var l = g[h],
                            m = a.v && a.v[k];
                        m ? dc(d, k, fc(m), !0) : M(d, k, hc(l, e, b), !0)
                    }
                } else k = f - a.D, (l = a.v && a.v[k]) ? dc(d, k, fc(l), !1) : M(d, k, hc(g, e, b), !1)
        }
        return d
    };

    function R(a, b, c) {
        null == a && (a = Lb);
        Lb = void 0;
        var d = this.constructor.i || 0,
            e = 0 < d,
            f = this.constructor.h,
            g = !1;
        if (null == a) {
            a = f ? [f] : [];
            var h = !0;
            G(a, 48)
        } else {
            if (!Array.isArray(a)) throw Error();
            if (f && f !== a[0]) throw Error();
            var k = E(a, 0),
                l = k;
            if (h = 0 !== (16 & l))(g = 0 !== (32 & l)) || (l |= 32);
            if (e)
                if (128 & l) d = 0;
                else {
                    if (0 < a.length) {
                        var m = a[a.length - 1];
                        if (rb(m) && "g" in m) {
                            d = 0;
                            l |= 128;
                            delete m.g;
                            var n = !0,
                                p;
                            for (p in m) {
                                n = !1;
                                break
                            }
                            n && a.pop()
                        }
                    }
                }
            else if (128 & l) throw Error();
            k !== l && G(a, l)
        }
        this.D = (f ? 0 : -1) - d;
        this.v = void 0;
        this.m = a;
        a: {
            f =
            this.m.length;d = f - 1;
            if (f && (f = this.m[d], rb(f))) {
                this.h = f;
                this.i = d - this.D;
                break a
            }
            void 0 !== b && -1 < b ? (this.i = Math.max(b, d + 1 - this.D), this.h = void 0) : this.i = Number.MAX_VALUE
        }
        if (!e && this.h && "g" in this.h) throw Error('Unexpected "g" flag in sparse object of message that is not a group type.');
        if (c) {
            b = h && !g && !0;
            e = this.i;
            var q;
            for (h = 0; h < c.length; h++) g = c[h], g < e ? (g += this.D, (d = a[g]) ? jc(d, b) : a[g] = tb) : (q || (q = Vb(this)), (d = q[g]) ? jc(d, b) : q[g] = tb)
        }
    }
    R.prototype.toJSON = function() {
        var a = this.m;
        return sb ? a : Ob(a, Qb, Rb)
    };

    function kc(a) {
        sb = !0;
        try {
            return JSON.stringify(a.toJSON(), lc)
        } finally {
            sb = !1
        }
    }

    function Ub(a) {
        var b = Ob(a.m, Tb, ob);
        J(b);
        Lb = b;
        b = new a.constructor(b);
        Lb = void 0;
        mc(b, a);
        return b
    }

    function Kb(a) {
        if (H(a.m)) {
            var b = ic(a, !1);
            b.j = a;
            a = b
        }
        return a
    }

    function jc(a, b) {
        if (Array.isArray(a)) {
            var c = F(a),
                d = 1;
            !b || c & 2 || (d |= 16);
            (c & d) !== d && G(a, c | d)
        }
    }
    R.prototype.R = qb;
    R.prototype.toString = function() {
        return this.m.toString()
    };

    function lc(a, b) {
        return Mb(b)
    }

    function mc(a, b) {
        b.K && (a.K = b.K.slice());
        var c = b.v;
        if (c) {
            var d = b.h,
                e;
            for (e in c)
                if (b = c[e]) {
                    var f = !(!d || !d[e]),
                        g = +e;
                    if (Array.isArray(b)) {
                        if (b.length)
                            for (f = cc(a, b[0].constructor, g, f), g = 0; g < Math.min(f.length, b.length); g++) mc(f[g], b[g])
                    } else throw a = typeof b, Error("unexpected object: type: " + ("object" != a ? a : b ? Array.isArray(b) ? "array" : a : "null") + ": " + b);
                }
        }
    };

    function nc(a) {
        R.call(this, a)
    }
    y(nc, R);

    function oc(a) {
        R.call(this, a)
    }
    y(oc, R);

    function pc(a) {
        R.call(this, a)
    }
    y(pc, R);

    function qc(a) {
        R.call(this, a, -1, rc)
    }
    y(qc, R);

    function sc(a) {
        R.call(this, a)
    }
    y(sc, R);
    sc.prototype.P = function() {
        return P(this, 3)
    };
    sc.prototype.X = function(a) {
        M(this, 5, a)
    };

    function S(a) {
        R.call(this, a)
    }
    y(S, R);
    S.prototype.P = function() {
        return P(this, 1)
    };
    S.prototype.X = function(a) {
        M(this, 2, a)
    };

    function tc(a) {
        R.call(this, a)
    }
    y(tc, R);
    var rc = [6, 7];

    function uc(a) {
        R.call(this, a, -1, vc)
    }
    y(uc, R);
    var vc = [17];

    function wc(a) {
        R.call(this, a)
    }
    y(wc, R);

    function xc(a) {
        R.call(this, a)
    }
    y(xc, R);
    var yc = {
            capture: !0
        },
        zc = {
            passive: !0
        },
        Ac = La(function() {
            var a = !1;
            try {
                var b = Object.defineProperty({}, "passive", {
                    get: function() {
                        a = !0
                    }
                });
                z.addEventListener("test", null, b)
            } catch (c) {}
            return a
        });

    function Bc(a) {
        return a ? a.passive && Ac() ? a : a.capture || !1 : !1
    }

    function T(a, b, c, d) {
        a.addEventListener && a.addEventListener(b, c, Bc(d))
    };

    function Cc() {
        return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ Date.now()).toString(36)
    };
    var Dc = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");

    function Ec(a) {
        var b = a.indexOf("#");
        0 > b && (b = a.length);
        var c = a.indexOf("?");
        if (0 > c || c > b) {
            c = b;
            var d = ""
        } else d = a.substring(c + 1, b);
        return [a.slice(0, c), d, a.slice(b)]
    }

    function Fc(a, b) {
        return b ? a ? a + "&" + b : b : a
    }

    function Gc(a, b) {
        if (!b) return a;
        a = Ec(a);
        a[1] = Fc(a[1], b);
        return a[0] + (a[1] ? "?" + a[1] : "") + a[2]
    }

    function Hc(a, b, c) {
        if (Array.isArray(b))
            for (var d = 0; d < b.length; d++) Hc(a, String(b[d]), c);
        else null != b && c.push(a + ("" === b ? "" : "=" + encodeURIComponent(String(b))))
    }

    function Ic(a) {
        var b = [],
            c;
        for (c in a) Hc(c, a[c], b);
        return b.join("&")
    }

    function Jc() {
        var a = Cc();
        a = null != a ? "=" + encodeURIComponent(String(a)) : "";
        return Gc("https://pagead2.googlesyndication.com/pagead/gen_204", "zx" + a)
    }
    var Kc = /#|$/;

    function Lc(a, b) {
        var c = a.search(Kc);
        a: {
            var d = 0;
            for (var e = b.length; 0 <= (d = a.indexOf(b, d)) && d < c;) {
                var f = a.charCodeAt(d - 1);
                if (38 == f || 63 == f)
                    if (f = a.charCodeAt(d + e), !f || 61 == f || 38 == f || 35 == f) break a;
                d += e + 1
            }
            d = -1
        }
        if (0 > d) return null;
        e = a.indexOf("&", d);
        if (0 > e || e > c) e = c;
        d += b.length + 1;
        return decodeURIComponent(a.slice(d, -1 !== e ? e : 0).replace(/\+/g, " "))
    }

    function Mc(a, b) {
        a = Ec(a);
        var c = a[1],
            d = [];
        c && c.split("&").forEach(function(e) {
            var f = e.indexOf("=");
            b.hasOwnProperty(0 <= f ? e.slice(0, f) : e) || d.push(e)
        });
        a[1] = Fc(d.join("&"), Ic(b));
        return a[0] + (a[1] ? "?" + a[1] : "") + a[2]
    };

    function Nc(a, b) {
        if (a)
            for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b(a[c], c, a)
    }

    function Oc(a) {
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    }
    var Pc = [];

    function Qc() {
        var a = Pc;
        Pc = [];
        a = w(a);
        for (var b = a.next(); !b.done; b = a.next()) {
            b = b.value;
            try {
                b()
            } catch (c) {}
        }
    }

    function Rc(a) {
        Pc.push(a);
        1 == Pc.length && (window.Promise ? Promise.resolve().then(Qc) : window.setImmediate ? setImmediate(Qc) : setTimeout(Qc, 0))
    }

    function Sc(a) {
        var b = W;
        "complete" === b.readyState || "interactive" === b.readyState ? Rc(a) : b.addEventListener("DOMContentLoaded", a)
    }

    function Tc(a) {
        var b = window;
        "complete" === b.document.readyState ? Rc(a) : b.addEventListener("load", a)
    }

    function Uc(a) {
        a = void 0 === a ? document : a;
        return a.createElement("img")
    };

    function Zc(a, b, c, d) {
        $c(a, b, void 0 === c ? null : c, void 0 === d ? !1 : d)
    }

    function $c(a, b, c, d) {
        a.google_image_requests || (a.google_image_requests = []);
        var e = Uc(a.document);
        if (c || d) {
            var f = function(g) {
                c && c(g);
                if (d) {
                    g = a.google_image_requests;
                    var h = Ha(g, e);
                    0 <= h && Array.prototype.splice.call(g, h, 1)
                }
                e.removeEventListener && e.removeEventListener("load", f, Bc());
                e.removeEventListener && e.removeEventListener("error", f, Bc())
            };
            T(e, "load", f);
            T(e, "error", f)
        }
        e.src = b;
        a.google_image_requests.push(e)
    }

    function ad(a, b) {
        var c = void 0 === c ? !1 : c;
        var d;
        if (d = a.navigator) d = a.navigator.userAgent, d = /Chrome/.test(d) && !/Edge/.test(d) ? !0 : !1;
        d && a.navigator.sendBeacon ? a.navigator.sendBeacon(b) : Zc(a, b, void 0, c)
    };
    var bd = 0;

    function cd(a) {
        return (a = dd(a)) && a.getAttribute("data-jc-version") || "unknown"
    }

    function dd(a) {
        var b = document.currentScript;
        return (b = void 0 === b ? null : b) && b.getAttribute("data-jc") === String(a) ? b : document.querySelector('[data-jc="' + a + '"]')
    }

    function ed(a) {
        var b = void 0 === b ? .01 : b;
        if (!(Math.random() > b)) {
            var c = dd(a);
            a = "https://" + (c && "true" === c.getAttribute("data-jc-rcd") ? "pagead2.googlesyndication-cn.com" : "pagead2.googlesyndication.com") + "/pagead/gen_204?id=jca&jc=" + a + "&version=" + cd(a) + "&sample=" + b;
            ad(window, a)
        }
    };
    var W = document,
        Y = window;
    var fd = [Pa, Qa, Sa, Ra, Oa, Ua, Va, Ta, Wa];

    function gd(a, b) {
        if (a instanceof B) return a;
        var c = fd;
        c = void 0 === c ? Xa : c;
        a: {
            c = void 0 === c ? Xa : c;
            for (var d = 0; d < c.length; ++d) {
                var e = c[d];
                if (e instanceof Na && e.ia(a)) {
                    c = new B(a, Ea);
                    break a
                }
            }
            c = void 0
        }
        c = c || Ga;
        c === Ga && b(a);
        return c
    }

    function hd(a) {
        var b = (id() ? "http:" : "https:") + "//pagead2.googlesyndication.com/pagead/gen_204";
        return function(c) {
            c = Ic({
                id: "unsafeurl",
                ctx: a,
                url: c
            });
            c = Gc(b, c);
            navigator.sendBeacon && navigator.sendBeacon(c, "")
        }
    };

    function id() {
        var a = void 0 === a ? Y : a;
        return "http:" === a.location.protocol
    }

    function jd(a) {
        var b = W;
        try {
            return b.querySelectorAll("*[" + a + "]")
        } catch (c) {
            return []
        }
    };

    function kd(a, b) {
        var c = void 0 === c ? {} : c;
        this.error = a;
        this.context = b.context;
        this.msg = b.message || "";
        this.id = b.id || "jserror";
        this.meta = c
    };
    var ld = RegExp("^https?://(\\w|-)+\\.cdn\\.ampproject\\.(net|org)(\\?|/|$)");

    function md(a, b) {
        this.h = a;
        this.i = b
    }

    function nd(a, b) {
        this.url = a;
        this.W = !!b;
        this.depth = null
    };

    function od() {
        this.j = "&";
        this.i = {};
        this.l = 0;
        this.h = []
    }

    function pd(a, b) {
        var c = {};
        c[a] = b;
        return [c]
    }

    function qd(a, b, c, d, e) {
        var f = [];
        Nc(a, function(g, h) {
            (g = rd(g, b, c, d, e)) && f.push(h + "=" + g)
        });
        return f.join(b)
    }

    function rd(a, b, c, d, e) {
        if (null == a) return "";
        b = b || "&";
        c = c || ",$";
        "string" == typeof c && (c = c.split(""));
        if (a instanceof Array) {
            if (d = d || 0, d < c.length) {
                for (var f = [], g = 0; g < a.length; g++) f.push(rd(a[g], b, c, d + 1, e));
                return f.join(c[d])
            }
        } else if ("object" == typeof a) return e = e || 0, 2 > e ? encodeURIComponent(qd(a, b, c, d, e + 1)) : "...";
        return encodeURIComponent(String(a))
    }

    function sd(a, b) {
        var c = "https://pagead2.googlesyndication.com" + b,
            d = td(a) - b.length;
        if (0 > d) return "";
        a.h.sort(function(m, n) {
            return m - n
        });
        b = null;
        for (var e = "", f = 0; f < a.h.length; f++)
            for (var g = a.h[f], h = a.i[g], k = 0; k < h.length; k++) {
                if (!d) {
                    b = null == b ? g : b;
                    break
                }
                var l = qd(h[k], a.j, ",$");
                if (l) {
                    l = e + l;
                    if (d >= l.length) {
                        d -= l.length;
                        c += l;
                        e = a.j;
                        break
                    }
                    b = null == b ? g : b
                }
            }
        a = "";
        null != b && (a = e + "trn=" + b);
        return c + a
    }

    function td(a) {
        var b = 1,
            c;
        for (c in a.i) b = c.length > b ? c.length : b;
        return 3997 - b - a.j.length - 1
    };

    function ud() {
        this.h = Math.random()
    }

    function vd() {
        var a = wd,
            b = window.google_srt;
        0 <= b && 1 >= b && (a.h = b)
    }

    function xd(a, b, c, d, e) {
        if (((void 0 === d ? 0 : d) ? a.h : Math.random()) < (e || .01)) try {
            if (c instanceof od) var f = c;
            else f = new od, Nc(c, function(h, k) {
                var l = f,
                    m = l.l++;
                h = pd(k, h);
                l.h.push(m);
                l.i[m] = h
            });
            var g = sd(f, "/pagead/gen_204?id=" + b + "&");
            g && Zc(z, g)
        } catch (h) {}
    };
    var yd = null;

    function zd() {
        var a = void 0 === a ? z : a;
        return (a = a.performance) && a.now && a.timing ? Math.floor(a.now() + a.timing.navigationStart) : Date.now()
    }

    function Ad() {
        var a = void 0 === a ? z : a;
        return (a = a.performance) && a.now ? a.now() : null
    };

    function Bd(a, b) {
        var c = Ad() || zd();
        this.label = a;
        this.type = b;
        this.value = c;
        this.duration = 0;
        this.uniqueId = Math.random();
        this.taskId = this.slotId = void 0
    };
    var Z = z.performance,
        Cd = !!(Z && Z.mark && Z.measure && Z.clearMarks),
        Dd = La(function() {
            var a;
            if (a = Cd) {
                var b;
                if (null === yd) {
                    yd = "";
                    try {
                        a = "";
                        try {
                            a = z.top.location.hash
                        } catch (c) {
                            a = z.location.hash
                        }
                        a && (yd = (b = a.match(/\bdeid=([\d,]+)/)) ? b[1] : "")
                    } catch (c) {}
                }
                b = yd;
                a = !!b.indexOf && 0 <= b.indexOf("1337")
            }
            return a
        });

    function Ed() {
        var a = window;
        this.i = [];
        this.j = a || z;
        var b = null;
        a && (a.google_js_reporting_queue = a.google_js_reporting_queue || [], this.i = a.google_js_reporting_queue, b = a.google_measure_js_timing);
        this.h = Dd() || (null != b ? b : 1 > Math.random())
    }

    function Fd(a) {
        a && Z && Dd() && (Z.clearMarks("goog_" + a.label + "_" + a.uniqueId + "_start"), Z.clearMarks("goog_" + a.label + "_" + a.uniqueId + "_end"))
    }
    Ed.prototype.start = function(a, b) {
        if (!this.h) return null;
        a = new Bd(a, b);
        b = "goog_" + a.label + "_" + a.uniqueId + "_start";
        Z && Dd() && Z.mark(b);
        return a
    };
    Ed.prototype.end = function(a) {
        if (this.h && "number" === typeof a.value) {
            a.duration = (Ad() || zd()) - a.value;
            var b = "goog_" + a.label + "_" + a.uniqueId + "_end";
            Z && Dd() && Z.mark(b);
            !this.h || 2048 < this.i.length || this.i.push(a)
        }
    };

    function Gd() {
        var a = Hd;
        this.j = wd;
        this.i = null;
        this.s = this.o;
        this.h = void 0 === a ? null : a;
        this.l = !1
    }
    Gd.prototype.pinger = function() {
        return this.j
    };

    function Id(a, b) {
        var c = Jd;
        try {
            if (c.h && c.h.h) {
                var d = c.h.start(a.toString(), 3);
                var e = b();
                c.h.end(d)
            } else e = b()
        } catch (h) {
            b = !0;
            try {
                Fd(d), b = c.s(a, new kd(h, {
                    message: Kd(h)
                }), void 0, void 0)
            } catch (k) {
                c.o(217, k)
            }
            if (b) {
                var f, g;
                null == (f = window.console) || null == (g = f.error) || g.call(f, h)
            } else throw h;
        }
        return e
    }

    function Ld(a, b) {
        return function() {
            var c = wa.apply(0, arguments);
            return Id(a, function() {
                return b.apply(void 0, c)
            })
        }
    }
    Gd.prototype.o = function(a, b, c, d, e) {
        e = e || "jserror";
        try {
            var f = new od;
            f.h.push(1);
            f.i[1] = pd("context", a);
            b.error && b.meta && b.id || (b = new kd(b, {
                message: Kd(b)
            }));
            if (b.msg) {
                var g = b.msg.substring(0, 512);
                f.h.push(2);
                f.i[2] = pd("msg", g)
            }
            var h = b.meta || {};
            if (this.i) try {
                this.i(h)
            } catch (fa) {}
            if (d) try {
                d(h)
            } catch (fa) {}
            b = [h];
            f.h.push(3);
            f.i[3] = b;
            d = z;
            b = [];
            g = null;
            do {
                var k = d;
                try {
                    var l;
                    if (l = !!k && null != k.location.href) b: {
                        try {
                            Za(k.foo);
                            l = !0;
                            break b
                        } catch (fa) {}
                        l = !1
                    }
                    var m = l
                } catch (fa) {
                    m = !1
                }
                if (m) {
                    var n = k.location.href;
                    g = k.document &&
                        k.document.referrer || null
                } else n = g, g = null;
                b.push(new nd(n || ""));
                try {
                    d = k.parent
                } catch (fa) {
                    d = null
                }
            } while (d && k != d);
            n = 0;
            for (var p = b.length - 1; n <= p; ++n) b[n].depth = p - n;
            k = z;
            if (k.location && k.location.ancestorOrigins && k.location.ancestorOrigins.length == b.length - 1)
                for (p = 1; p < b.length; ++p) {
                    var q = b[p];
                    q.url || (q.url = k.location.ancestorOrigins[p - 1] || "", q.W = !0)
                }
            var v = new nd(z.location.href, !1);
            k = null;
            var V = b.length - 1;
            for (q = V; 0 <= q; --q) {
                var U = b[q];
                !k && ld.test(U.url) && (k = U);
                if (U.url && !U.W) {
                    v = U;
                    break
                }
            }
            U = null;
            var je = b.length &&
                b[V].url;
            0 != v.depth && je && (U = b[V]);
            var X = new md(v, U);
            if (X.i) {
                var ke = X.i.url || "";
                f.h.push(4);
                f.i[4] = pd("top", ke)
            }
            var Fb = {
                url: X.h.url || ""
            };
            if (X.h.url) {
                var Gb = X.h.url.match(Dc),
                    Vc = Gb[1],
                    Wc = Gb[3],
                    Xc = Gb[4];
                v = "";
                Vc && (v += Vc + ":");
                Wc && (v += "//", v += Wc, Xc && (v += ":" + Xc));
                var Yc = v
            } else Yc = "";
            Fb = [Fb, {
                url: Yc
            }];
            f.h.push(5);
            f.i[5] = Fb;
            xd(this.j, e, f, this.l, c)
        } catch (fa) {
            try {
                xd(this.j, e, {
                    context: "ecmserr",
                    rctx: a,
                    msg: Kd(fa),
                    url: X && X.h.url
                }, this.l, c)
            } catch (Ke) {}
        }
        return !0
    };

    function Kd(a) {
        var b = a.toString();
        a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name);
        a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message);
        if (a.stack) {
            a = a.stack;
            var c = b;
            try {
                -1 == a.indexOf(c) && (a = c + "\n" + a);
                for (var d; a != d;) d = a, a = a.replace(RegExp("((https?:/..*/)[^/:]*:\\d+(?:.|\n)*)\\2"), "$1");
                b = a.replace(RegExp("\n *", "g"), "\n")
            } catch (e) {
                b = c
            }
        }
        return b
    };

    function Md() {};
    var wd, Jd, Hd = new Ed;

    function Nd() {
        if (!window.google_measure_js_timing) {
            var a = Hd;
            a.h = !1;
            a.i != a.j.google_js_reporting_queue && (Dd() && Ia(a.i, Fd), a.i.length = 0)
        }
    }(function(a) {
        wd = null != a ? a : new ud;
        "number" !== typeof window.google_srt && (window.google_srt = Math.random());
        vd();
        Jd = new Gd;
        Jd.i = function(b) {
            var c = bd;
            0 !== c && (b.jc = String(c), b.shv = cd(c))
        };
        Jd.l = !0;
        "complete" == window.document.readyState ? Nd() : Hd.h && T(window, "load", function() {
            Nd()
        })
    })();

    function Od(a, b) {
        return Ld(a, b)
    }

    function Pd(a) {
        var b = "V";
        Md.V && Md.hasOwnProperty(b) || (b = new Md, Md.V = b);
        b = [];
        !a.eid && b.length && (a.eid = b.toString());
        xd(wd, "gdn-asoch", a, !0)
    };

    function Qd() {
        var a = void 0 === a ? z : a;
        return a.oneAfmaInstance
    };

    function Rd(a, b) {
        b = P(a, 2) || b;
        if (!b) return "";
        if (Q(a, 13)) return b;
        var c = /[?&]adurl=([^&]+)/.exec(b);
        if (!c) return b;
        var d = [b.slice(0, c.index + 1)];
        bc(a, 4).forEach(function(e, f) {
            d.push(encodeURIComponent(f) + "=" + encodeURIComponent(e) + "&")
        });
        d.push(b.slice(c.index + 1));
        return d.join("")
    }

    function Sd(a, b) {
        b = void 0 === b ? [] : b;
        b = 0 < b.length ? b : jd("data-asoch-targets");
        a = bc(a, 1, qc);
        for (var c = [], d = 0; d < b.length; ++d) {
            for (var e = b[d].getAttribute("data-asoch-targets"), f = e.split(","), g = !0, h = w(f), k = h.next(); !k.done; k = h.next())
                if (!a.has(k.value)) {
                    g = !1;
                    break
                }
            if (g) {
                g = a.get(f[0]);
                for (e = 1; e < f.length; ++e) {
                    h = a.get(f[e]);
                    g = Ub(g).toJSON();
                    h = h.toJSON();
                    k = Math.max(g.length, h.length);
                    for (var l = 0; l < k; ++l) null == g[l] && (g[l] = h[l]);
                    g = new qc(g)
                }
                f = bc(g, 4);
                null != L(g, 5, !1) && f.set("nb", $b(g, 5, 0).toString());
                c.push({
                    element: b[d],
                    data: g
                })
            } else Pd({
                type: 1,
                data: e
            })
        }
        return c
    }

    function Td(a, b, c, d) {
        c = Rd(b, c);
        if (0 !== c.length) {
            var e = Lc(c, "ase");
            if ("1" === e || "2" === e) {
                if (609 === d) var f = 4;
                else {
                    var g;
                    f = (null == (g = W.featurePolicy) ? 0 : g.allowedFeatures().includes("attribution-reporting")) ? 6 : 5
                }
                "1" === e ? (g = Ud(c, "asr", "1"), a.setAttribute("attributionsrc", g), c = Ud(c, "nis", f.toString())) : "2" === e && (Vd(c) ? (f = Ud(Aa(new za({
                    url: c
                })), "nis", f.toString()), a.setAttribute("attributionsrc", f)) : (a.setAttribute("attributionsrc", ""), c = Ud(c, "nis", f.toString())))
            }
            Ma(a, gd(c, hd(d)));
            a.target || (a.target = null !=
                L(b, 11) ? P(b, 11) : "_top")
        }
    }

    function Wd(a) {
        var b = void 0 === b ? "" : b;
        a = w(a);
        for (var c = a.next(); !c.done; c = a.next()) {
            var d = c.value;
            c = d.data;
            var e = 0 === b.length ? !1 : d.element.matches(b);
            "A" != d.element.tagName || Q(c, 1) || e || (d = d.element, Td(d, c, d.href, 609))
        }
    }

    function Vd(a) {
        return !/[?&]dsh=1(&|$)/.test(a) && /[?&]ae=1(&|$)/.test(a)
    }

    function Xd(a) {
        var b = Qd();
        if (b) {
            a = w(a);
            for (var c = a.next(); !c.done; c = a.next())
                if ((c = c.value.data) && Wb(c, tc, 8)) {
                    var d = P(O(c, tc, 8), 4);
                    if (d) {
                        b.fetchAppStoreOverlay(d, void 0, P(O(c, tc, 8), 6));
                        break
                    }
                }
        }
    }

    function Yd(a, b) {
        function c(h, k) {
            if (k) {
                h = w(e);
                for (var l = h.next(); !l.done; l = h.next()) l = l.value, k[l.P()] && l.X(!0)
            }
        }
        b = void 0 === b ? 500 : b;
        var d = [],
            e = [];
        a = w(a);
        for (var f = a.next(); !f.done; f = a.next())(f = f.value.data) && Wb(f, S, 12) && (e.push(O(f, S, 12)), d.push(O(f, S, 12).P()));
        a = Qd();
        d = w(d);
        for (f = d.next(); !f.done; f = d.next()) {
            f = f.value;
            var g = void 0;
            null == (g = a) || g.canOpenAndroidApp(f, c, function() {}, b)
        }
    }

    function Zd(a, b, c, d, e) {
        function f(l) {
            return ad(Y, l)
        }

        function g(l) {
            return d.openStoreOverlay(l, void 0, P(h, 6))
        }
        if (!b || !Wb(b, tc, 8)) return !1;
        var h = O(b, tc, 8),
            k = P(h, 2);
        bc(b, 10).forEach(function(l, m) {
            var n = k;
            m = encodeURIComponent(m);
            var p = encodeURIComponent(l);
            l = new RegExp("[?&]" + m + "=([^&]+)");
            var q = l.exec(n);
            console.log(q);
            m = m + "=" + p;
            k = q ? n.replace(l, q[0].charAt(0) + m) : n.replace("?", "?" + m + "&")
        });
        $d(b) && Q(b, 15) && !/[?&]label=/.test(c) && (c = Ud(c, "label", "deep_link_fallback"));
        return d.redirectForStoreU2({
            clickUrl: c,
            trackingUrl: P(h, 3),
            finalUrl: k,
            pingFunc: e ? f : d.click,
            openFunc: (null == a ? 0 : Q(a, 1)) ? g : d.openIntentOrNativeApp
        })
    }

    function ae(a, b) {
        b = void 0 === b ? null : b;
        if (null !== b) {
            var c = new za({
                url: a
            });
            if (c.i && c.j || c.o) return b(Aa(c)), Da(c, 1)
        } else return b = new za({
            url: a,
            Y: {}.Y
        }), b.i && b.j || b.o ? navigator.sendBeacon ? navigator.sendBeacon(Aa(b), "") ? Da(b, 1) : Da(b, 2) : Da(b, 0) : a;
        return a
    }

    function be(a, b, c) {
        b = void 0 === b ? !0 : b;
        var d = !1;
        (void 0 === c ? 0 : c) && Y.navigator && Y.navigator.sendBeacon && (d = Y.navigator.sendBeacon(a));
        d || (b && Y.fetch ? Y.fetch(a, {
            method: "GET",
            keepalive: !0,
            mode: "no-cors"
        }).then(function(e) {
            e.ok || Zc(Y, a)
        }) : Zc(Y, a))
    }

    function Ud(a, b, c) {
        b = encodeURIComponent(String(b));
        c = encodeURIComponent(String(c));
        return a.replace("?", "?" + b + "=" + c + "&")
    }

    function $d(a) {
        a = w(cc(a, sc, 7));
        for (var b = a.next(); !b.done; b = a.next())
            if (b = b.value, 3 === $b(b, 1, 0) && P(b, 2)) return !0;
        return !1
    };

    function ce(a, b) {
        return a && (a = a.match(b + "=([^&]+)")) && 2 == a.length ? a[1] : ""
    };

    function de(a) {
        R.call(this, a, -1, ee)
    }
    y(de, R);

    function fe(a, b) {
        return M(a, 2, b)
    }

    function ge(a, b) {
        return M(a, 3, b)
    }

    function he(a, b) {
        return M(a, 4, b)
    }

    function ie(a, b) {
        return M(a, 5, b)
    }

    function le(a, b) {
        return M(a, 9, b)
    }

    function me(a, b) {
        return dc(a, 10, b)
    }

    function ne(a, b) {
        return M(a, 11, b)
    }

    function oe(a, b) {
        return M(a, 1, b)
    }

    function pe(a, b) {
        return M(a, 7, b)
    }

    function qe(a) {
        R.call(this, a)
    }
    y(qe, R);
    var ee = [10, 6];
    var re = "platform platformVersion architecture model uaFullVersion bitness fullVersionList wow64".split(" ");

    function se(a) {
        var b;
        return null != (b = a.google_tag_data) ? b : a.google_tag_data = {}
    }

    function te(a) {
        var b, c;
        return "function" === typeof(null == (b = a.navigator) ? void 0 : null == (c = b.userAgentData) ? void 0 : c.getHighEntropyValues)
    }

    function ue() {
        var a = window;
        if (!te(a)) return null;
        var b = se(a);
        if (b.uach_promise) return b.uach_promise;
        a = a.navigator.userAgentData.getHighEntropyValues(re).then(function(c) {
            null != b.uach || (b.uach = c);
            return c
        });
        return b.uach_promise = a
    }

    function ve(a) {
        var b;
        return ne(me(ie(fe(oe(he(pe(le(ge(new de, a.architecture || ""), a.bitness || ""), a.mobile || !1), a.model || ""), a.platform || ""), a.platformVersion || ""), a.uaFullVersion || ""), (null == (b = a.fullVersionList) ? void 0 : b.map(function(c) {
            var d = new qe;
            d = M(d, 1, c.brand);
            return M(d, 2, c.version)
        })) || []), a.wow64 || !1)
    }

    function we() {
        var a, b;
        return null != (b = null == (a = ue()) ? void 0 : a.then(function(c) {
            return ve(c)
        })) ? b : null
    };

    function xe(a) {
        var b = this;
        this.s = bb || $a || cb || ab;
        var c = jd("data-asoch-meta");
        if (1 !== c.length) Pd({
            type: 2,
            data: c.length
        });
        else {
            this.N = 70;
            this.i = new uc(JSON.parse(c[0].getAttribute("data-asoch-meta")) || []);
            this.L = a["extra-meta"] ? new uc(JSON.parse(a["extra-meta"])) : null;
            this.M = "true" === a["is-fsn"];
            this.B = a["ios-store-overlay-config"] ? new wc(JSON.parse(a["ios-store-overlay-config"])) : null;
            this.da = "true" === a["use-cct-over-browser"];
            this.ba = "true" === a["send-ac-click-ping-by-js"];
            this.U = "true" === a["correct-redirect-url-for-och-15-click"];
            this.ca = "true" === a["send-click-ping-by-js-in-och"];
            this.aa = "true" === a["enable-paw"];
            this.ea = "true" === a["async-using-fetch"];
            this.j = this.l = "";
            this.H = this.G = -1;
            this.F = "";
            c = we();
            null != c && c.then(function(e) {
                e = kc(e);
                for (var f = [], g = 0, h = 0; h < e.length; h++) {
                    var k = e.charCodeAt(h);
                    255 < k && (f[g++] = k & 255, k >>= 8);
                    f[g++] = k
                }
                e = fb(f, 3);
                b.F = e
            });
            this.h = Sd(this.i);
            this.fa = Number(a["deeplink-and-android-app-validation-timeout"]) || 500;
            this.S = -Infinity;
            this.o = P(this.i, 5) || "";
            this.T = Q(this.i, 11);
            this.L && (this.T = Q(this.L, 11));
            this.J = this.I = null;
            Q(this.i, 3) || (Wd(this.h), M(this.i, 3, !0));
            ye(this.h);
            a = Qd();
            !this.s && a && Yd(this.h, this.fa);
            var d;
            if (a && (null == (d = this.B) ? 0 : Q(d, 2))) switch (d = function() {
                var e = ec(L(b.B, 4), 0);
                0 < e ? z.setTimeout(function() {
                    Xd(b.h)
                }, e) : Xd(b.h)
            }, $b(this.B, 3, 0)) {
                case 1:
                    a.runOnOnShowEvent(d);
                    break;
                case 2:
                    Tc(d);
                    break;
                default:
                    Xd(this.h)
            }
            T(W, "click", Od(557, function(e) {
                a: if (!e.defaultPrevented || b.I === e) {
                    for (var f, g, h = e.target;
                        (!f || !g) && h;) {
                        g || "A" != h.tagName || (g = h);
                        var k = h.hasAttribute("data-asoch-targets"),
                            l =
                            h.hasAttribute("data-asoch-fixed-value");
                        if (!f)
                            if (l) f = new qc(JSON.parse(h.getAttribute("data-asoch-fixed-value")) || []);
                            else if ("A" == h.tagName || k)
                            if (k = k && "true" === h.getAttribute("data-asoch-is-dynamic") ? Sd(b.i, [h]) : b.h, k = ze(k, h)) f = k.data;
                        h = h.parentElement
                    }
                    if (h = f && !Q(f, 1)) {
                        if (e.defaultPrevented) {
                            var m = g;
                            h = f;
                            if (b.I === e && b.J) {
                                f = new oc(b.J);
                                g = P(h, 9);
                                k = "";
                                switch ($b(f, 4, 1)) {
                                    case 2:
                                        if (ec(L(f, 2), 0)) k = "blocked_fast_click";
                                        else if (P(f, 1) || P(f, 7)) k = "blocked_border_click";
                                        break;
                                    case 3:
                                        var n = void 0 === n ? W : n;
                                        n = n.getElementById ?
                                            n.getElementById("common_15click_anchor") : null;
                                        "function" === typeof window.copfcChm && n && (h = Ub(h), M(h, 5, 12), bc(h, 4).set("nb", (12).toString()), (k = ze(b.h, n)) ? k.data = h : b.h.push({
                                            element: n,
                                            data: h
                                        }), !b.U && m && (Ae(b, e, m, h), M(h, 2, m.href)), window.copfcChm(e, Rd(h, n.href), null, Wb(f, pc, 10) ? kc(O(f, pc, 10)) : null), b.U && Ae(b, e, n, h));
                                        k = "onepointfiveclick_first_click"
                                }
                                g && k && be(g + "&label=" + k, !1);
                                ed(b.N)
                            }
                            break a
                        }
                        n = w(Zb(f, 6));
                        for (k = n.next(); !k.done; k = n.next()) be(k.value)
                    }
                    if (g && h) {
                        n = g;
                        f = h ? f : null;
                        (g = ze(b.h, n)) ? g = g.data: (g =
                            new qc, M(g, 2, n.href), M(g, 11, n.target || "_top"), b.h.push({
                                element: n,
                                data: g
                            }));
                        Td(n, f || g, P(g, 2), 557);
                        Ae(b, e, n, f);
                        g = w(Zb(b.i, 17));
                        for (k = g.next(); !k.done; k = g.next()) {
                            h = void 0;
                            l = k.value;
                            var p = W.body;
                            h = void 0 === h ? {} : h;
                            "function" === typeof window.CustomEvent ? k = new CustomEvent(l, h) : (k = document.createEvent("CustomEvent"), k.initCustomEvent(l, !!h.bubbles, !!h.cancelable, h.detail));
                            p.dispatchEvent(k)
                        }
                        if (null == f ? 0 : null != L(f, 19)) {
                            k = new nc;
                            M(k, 1, $b(f, 5, 0));
                            g = ce(n.href, "nx");
                            "" != g && M(k, 2, +g);
                            g = ce(n.href, "ny");
                            "" != g &&
                                M(k, 3, +g);
                            g = ce(n.href, "bg");
                            "" != g && M(k, 4, g);
                            g = P(f, 19);
                            h = null != L(f, 20, !1) ? ec(L(f, 20), 0) : null;
                            k = kc(k);
                            l = b.F;
                            p = z;
                            p = void 0 === p ? window : p;
                            var q = new xc;
                            M(q, 1, g);
                            null !== h && M(q, 2, h);
                            null !== l && M(q, 3, l);
                            M(q, 4, k);
                            null == p || null == (m = p.fence) || m.reportEvent({
                                eventType: "click",
                                eventData: JSON.stringify(q),
                                destination: ["buyer"]
                            })
                        }
                        Q(b.i, 16) || b.M ? Be(b, e, n, f) : (m = "", (g = Qd()) && (m = g.appendClickSignals(n.href)), Ce(b, e, n, f, m))
                    }
                }
            }), yc);
            !a && Q(this.i, 21) && (T(Y, "pagehide", Od(1037, function() {
                if (b.l && b.j && (b.j += "+pagehide", b.H =
                        Date.now(), -1 !== b.G)) {
                    var e = {
                        id: "visibilityBeforePagehide",
                        payload: b.j,
                        delay: b.H - b.G,
                        isios: b.s,
                        clickstring: b.l
                    };
                    be(Mc(Jc(), e), !1, !0)
                }
            })), T(W, "visibilitychange", Od(1067, function() {
                if ("visible" === W.visibilityState) b.j = "", b.l = "", b.G = -1, b.H = -1;
                else if ("hidden" === W.visibilityState && b.j && b.l) {
                    b.G = Date.now();
                    var e = {
                        id: "visibilityhidden",
                        payload: b.j,
                        isios: b.s,
                        clickstring: b.l
                    };
                    be(Mc(Jc(), e), !1, !0)
                }
            })));
            this.o && "function" === typeof window.ss && T(W.body, "mouseover", Od(626, function() {
                window.ss(b.o, 0)
            }), zc);
            "function" ===
            typeof window.ivti && window.ivti(window);
            d = window;
            d.googqscp && "function" === typeof d.googqscp.registerCallback && d.googqscp.registerCallback(function(e, f) {
                b.I = e;
                b.J = f
            })
        }
    }

    function Be(a, b, c, d) {
        var e, f, g;
        va(new ua(new qa(function(h) {
            switch (h.h) {
                case 1:
                    e = "";
                    f = Qd();
                    if (!f) {
                        h.h = 2;
                        break
                    }
                    b.preventDefault();
                    var k = f.appendClickSignalsAsync(c.href);
                    h.h = 3;
                    return {
                        value: k
                    };
                case 3:
                    e = h.o || "";
                    if (!a.M) {
                        h.h = 2;
                        break
                    }
                    k = f.getNativeClickMeta();
                    h.h = 5;
                    return {
                        value: k
                    };
                case 5:
                    if (g = h.o) {
                        if (g.customClickGestureEligible) return h.return();
                        e = Ud(e, "nas", g.encodedNas)
                    }
                case 2:
                    Ce(a, b, c, d, e), h.h = 0
            }
        })))
    }

    function Ce(a, b, c, d, e) {
        var f = Q(a.i, 2),
            g = f && 300 < Date.now() - a.S,
            h = Qd();
        h ? (Oc(b), function() {
            var k = h.logScionEventAndAddParam(e);
            if (!a.s && d && Wb(d, S, 12)) {
                var l = O(d, S, 12).P();
                if (0 < cc(d, sc, 7).length)
                    for (var m = w(cc(d, sc, 7)), n = m.next(); !n.done; n = m.next());
                Q(O(d, S, 12), 2) ? (h.click(k), h.openAndroidApp(l), l = !0) : l = !1
            } else l = !1;
            if (!l && !Zd(a.B, d, k, h, a.ba)) {
                l = a.da;
                m = a.s;
                n = a.ca;
                var p = Q(d, 15),
                    q = Vd(k);
                !f || !g || p && q || (k = (void 0 === n ? 0 : n) ? ae(k) : ae(k, h.click));
                k && k.startsWith("intent:") ? h.openIntentOrNativeApp(k) : l ? m ? h.openBrowser(k) :
                    h.openChromeCustomTab(k) : h.openSystemBrowser(k, {
                        useFirstPackage: !0,
                        useRunningProcess: !0
                    })
            }
        }()) : (Q(a.i, 21) && c.href && "_blank" !== c.target && (a.l = Lc(c.href, "ai") || "") && (a.j = "clicked"), b = window, a.aa && b.pawsig && "function" === typeof b.pawsig.clk ? b.pawsig.clk(c) : g && (b = "2" === Lc(c.href, "ase") && Vd(c.href) ? ae(c.href, function() {}) : a.ea ? ae(c.href, function(k) {
            Y.fetch(k, {
                method: "GET",
                keepalive: !0,
                mode: "no-cors"
            })
        }) : ae(c.href), b !== c.href && Ma(c, gd(b, hd(599)))));
        g && (a.S = Date.now());
        ed(a.N)
    }

    function Ae(a, b, c, d) {
        if (!Q(d, 13)) {
            var e = c.href;
            var f = /[?&]adurl=([^&]+)/.exec(e);
            e = f ? [e.slice(0, f.index), e.slice(f.index)] : [e, ""];
            for (Ma(c, gd(e[0], hd(557))); !c.id;)
                if (f = "asoch-id-" + Cc(), !W.getElementById(f)) {
                    c.id = f;
                    break
                }
            f = c.id;
            "function" === typeof window.xy && window.xy(b, c, W.body);
            "function" === typeof window.mb && window.mb(c);
            "function" === typeof window.bgz && window.bgz(f);
            "function" === typeof window.ja && window.ja(f, d ? $b(d, 5, 0) : 0);
            "function" === typeof window.vti && window.vti(f);
            a.o && "function" === typeof window.ss &&
                (a.T ? window.ss(f, 1, a.o) : window.ss(a.o, 1));
            0 < e.length && (a = 0 < a.F.length && (null == d || null == L(d, 19)) ? c.href + "&uach=" + encodeURIComponent(a.F) + e[1] : c.href + e[1], Ma(c, gd(a, hd(557))))
        }
    }

    function De(a) {
        Sc(Od(556, function() {
            new xe(a || {})
        }))
    }

    function ze(a, b) {
        return Ka(a, function(c) {
            return c.element === b
        })
    }

    function ye(a) {
        a = w(a);
        for (var b = a.next(); !b.done; b = a.next()) {
            var c = b.value;
            "A" == c.element.tagName && (b = c.element, c = c.data, null == L(c, 2) && M(c, 2, b.href))
        }
    };
    var Ee = Od(555, function(a) {
        return De(a)
    });
    bd = 70;
    var Fe = dd(70);
    if (null == Fe) throw Error("JSC not found 70");
    for (var Ge = {}, He = Fe.attributes, Ie = He.length - 1; 0 <= Ie; Ie--) {
        var Je = He[Ie].name;
        0 === Je.indexOf("data-jcp-") && (Ge[Je.substring(9)] = He[Ie].value)
    }
    Ee(Ge);
}).call(this);