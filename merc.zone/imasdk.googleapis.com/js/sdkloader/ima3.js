// Copyright 2011 Google Inc. All Rights Reserved.
(function() {
    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    var l, aa = function(a) {
            var b = 0;
            return function() {
                return b < a.length ? {
                    done: !1,
                    value: a[b++]
                } : {
                    done: !0
                }
            }
        },
        ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
            if (a == Array.prototype || a == Object.prototype) return a;
            a[b] = c.value;
            return a
        },
        ca = function(a) {
            a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
            for (var b = 0; b < a.length; ++b) {
                var c = a[b];
                if (c && c.Math == Math) return c
            }
            throw Error("Cannot find global object");
        },
        ea = ca(this),
        p = function(a, b) {
            if (b) a: {
                var c = ea;a = a.split(".");
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
        };
    p("Symbol", function(a) {
        if (a) return a;
        var b = function(f, g) {
            this.j = f;
            ba(this, "description", {
                configurable: !0,
                writable: !0,
                value: g
            })
        };
        b.prototype.toString = function() {
            return this.j
        };
        var c = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_",
            d = 0,
            e = function(f) {
                if (this instanceof e) throw new TypeError("Symbol is not a constructor");
                return new b(c + (f || "") + "_" + d++, f)
            };
        return e
    });
    p("Symbol.iterator", function(a) {
        if (a) return a;
        a = Symbol("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = ea[b[c]];
            "function" === typeof d && "function" != typeof d.prototype[a] && ba(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return fa(aa(this))
                }
            })
        }
        return a
    });
    var fa = function(a) {
            a = {
                next: a
            };
            a[Symbol.iterator] = function() {
                return this
            };
            return a
        },
        q = function(a) {
            return a.raw = a
        },
        r = function(a) {
            var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
            return b ? b.call(a) : {
                next: aa(a)
            }
        },
        ha = function(a) {
            if (!(a instanceof Array)) {
                a = r(a);
                for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
                a = c
            }
            return a
        },
        ia = function(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b)
        },
        ka = "function" == typeof Object.assign ? Object.assign : function(a, b) {
            for (var c = 1; c < arguments.length; c++) {
                var d =
                    arguments[c];
                if (d)
                    for (var e in d) ia(d, e) && (a[e] = d[e])
            }
            return a
        };
    p("Object.assign", function(a) {
        return a || ka
    });
    var la = "function" == typeof Object.create ? Object.create : function(a) {
            var b = function() {};
            b.prototype = a;
            return new b
        },
        ma = function() {
            function a() {
                function c() {}
                new c;
                Reflect.construct(c, [], function() {});
                return new c instanceof c
            }
            if ("undefined" != typeof Reflect && Reflect.construct) {
                if (a()) return Reflect.construct;
                var b = Reflect.construct;
                return function(c, d, e) {
                    c = b(c, d);
                    e && Reflect.setPrototypeOf(c, e.prototype);
                    return c
                }
            }
            return function(c, d, e) {
                void 0 === e && (e = c);
                e = la(e.prototype || Object.prototype);
                return Function.prototype.apply.call(c,
                    e, d) || e
            }
        }(),
        na;
    if ("function" == typeof Object.setPrototypeOf) na = Object.setPrototypeOf;
    else {
        var oa;
        a: {
            var pa = {
                    a: !0
                },
                qa = {};
            try {
                qa.__proto__ = pa;
                oa = qa.a;
                break a
            } catch (a) {}
            oa = !1
        }
        na = oa ? function(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
            return a
        } : null
    }
    var ra = na,
        t = function(a, b) {
            a.prototype = la(b.prototype);
            a.prototype.constructor = a;
            if (ra) ra(a, b);
            else
                for (var c in b)
                    if ("prototype" != c)
                        if (Object.defineProperties) {
                            var d = Object.getOwnPropertyDescriptor(b, c);
                            d && Object.defineProperty(a, c, d)
                        } else a[c] = b[c];
            a.Aa = b.prototype
        },
        ta = function() {
            this.C = !1;
            this.o = null;
            this.A = void 0;
            this.j = 1;
            this.J = this.l = 0;
            this.B = null
        },
        ua = function(a) {
            if (a.C) throw new TypeError("Generator is already running");
            a.C = !0
        };
    ta.prototype.D = function(a) {
        this.A = a
    };
    var va = function(a, b) {
        a.B = {
            Id: b,
            kf: !0
        };
        a.j = a.l || a.J
    };
    ta.prototype.return = function(a) {
        this.B = {
            return: a
        };
        this.j = this.J
    };
    var wa = function(a, b, c) {
            a.j = c;
            return {
                value: b
            }
        },
        ya = function(a) {
            a.l = 0;
            var b = a.B.Id;
            a.B = null;
            return b
        },
        za = function(a) {
            this.j = new ta;
            this.l = a
        },
        Ca = function(a, b) {
            ua(a.j);
            var c = a.j.o;
            if (c) return Aa(a, "return" in c ? c["return"] : function(d) {
                return {
                    value: d,
                    done: !0
                }
            }, b, a.j.return);
            a.j.return(b);
            return Ba(a)
        },
        Aa = function(a, b, c, d) {
            try {
                var e = b.call(a.j.o, c);
                if (!(e instanceof Object)) throw new TypeError("Iterator result " + e + " is not an object");
                if (!e.done) return a.j.C = !1, e;
                var f = e.value
            } catch (g) {
                return a.j.o = null,
                    va(a.j, g), Ba(a)
            }
            a.j.o = null;
            d.call(a.j, f);
            return Ba(a)
        },
        Ba = function(a) {
            for (; a.j.j;) try {
                var b = a.l(a.j);
                if (b) return a.j.C = !1, {
                    value: b.value,
                    done: !1
                }
            } catch (c) {
                a.j.A = void 0, va(a.j, c)
            }
            a.j.C = !1;
            if (a.j.B) {
                b = a.j.B;
                a.j.B = null;
                if (b.kf) throw b.Id;
                return {
                    value: b.return,
                    done: !0
                }
            }
            return {
                value: void 0,
                done: !0
            }
        },
        Da = function(a) {
            this.next = function(b) {
                ua(a.j);
                a.j.o ? b = Aa(a, a.j.o.next, b, a.j.D) : (a.j.D(b), b = Ba(a));
                return b
            };
            this.throw = function(b) {
                ua(a.j);
                a.j.o ? b = Aa(a, a.j.o["throw"], b, a.j.D) : (va(a.j, b), b = Ba(a));
                return b
            };
            this.return = function(b) {
                return Ca(a, b)
            };
            this[Symbol.iterator] = function() {
                return this
            }
        },
        Ea = function(a) {
            function b(d) {
                return a.next(d)
            }

            function c(d) {
                return a.throw(d)
            }
            return new Promise(function(d, e) {
                function f(g) {
                    g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e)
                }
                f(a.next())
            })
        },
        Fa = function(a) {
            return Ea(new Da(new za(a)))
        },
        Ga = function() {
            for (var a = Number(this), b = [], c = a; c < arguments.length; c++) b[c - a] = arguments[c];
            return b
        };
    p("Reflect", function(a) {
        return a ? a : {}
    });
    p("Reflect.construct", function() {
        return ma
    });
    p("Reflect.setPrototypeOf", function(a) {
        return a ? a : ra ? function(b, c) {
            try {
                return ra(b, c), !0
            } catch (d) {
                return !1
            }
        } : null
    });
    p("Promise", function(a) {
        function b() {
            this.j = null
        }

        function c(g) {
            return g instanceof e ? g : new e(function(h) {
                h(g)
            })
        }
        if (a) return a;
        b.prototype.l = function(g) {
            if (null == this.j) {
                this.j = [];
                var h = this;
                this.o(function() {
                    h.A()
                })
            }
            this.j.push(g)
        };
        var d = ea.setTimeout;
        b.prototype.o = function(g) {
            d(g, 0)
        };
        b.prototype.A = function() {
            for (; this.j && this.j.length;) {
                var g = this.j;
                this.j = [];
                for (var h = 0; h < g.length; ++h) {
                    var k = g[h];
                    g[h] = null;
                    try {
                        k()
                    } catch (n) {
                        this.B(n)
                    }
                }
            }
            this.j = null
        };
        b.prototype.B = function(g) {
            this.o(function() {
                throw g;
            })
        };
        var e = function(g) {
            this.j = 0;
            this.o = void 0;
            this.l = [];
            this.D = !1;
            var h = this.B();
            try {
                g(h.resolve, h.reject)
            } catch (k) {
                h.reject(k)
            }
        };
        e.prototype.B = function() {
            function g(n) {
                return function(m) {
                    k || (k = !0, n.call(h, m))
                }
            }
            var h = this,
                k = !1;
            return {
                resolve: g(this.I),
                reject: g(this.A)
            }
        };
        e.prototype.I = function(g) {
            if (g === this) this.A(new TypeError("A Promise cannot resolve to itself"));
            else if (g instanceof e) this.L(g);
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
                h ?
                this.G(g) : this.C(g)
            }
        };
        e.prototype.G = function(g) {
            var h = void 0;
            try {
                h = g.then
            } catch (k) {
                this.A(k);
                return
            }
            "function" == typeof h ? this.N(h, g) : this.C(g)
        };
        e.prototype.A = function(g) {
            this.J(2, g)
        };
        e.prototype.C = function(g) {
            this.J(1, g)
        };
        e.prototype.J = function(g, h) {
            if (0 != this.j) throw Error("Cannot settle(" + g + ", " + h + "): Promise already settled in state" + this.j);
            this.j = g;
            this.o = h;
            2 === this.j && this.K();
            this.M()
        };
        e.prototype.K = function() {
            var g = this;
            d(function() {
                    if (g.F()) {
                        var h = ea.console;
                        "undefined" !== typeof h && h.error(g.o)
                    }
                },
                1)
        };
        e.prototype.F = function() {
            if (this.D) return !1;
            var g = ea.CustomEvent,
                h = ea.Event,
                k = ea.dispatchEvent;
            if ("undefined" === typeof k) return !0;
            "function" === typeof g ? g = new g("unhandledrejection", {
                cancelable: !0
            }) : "function" === typeof h ? g = new h("unhandledrejection", {
                cancelable: !0
            }) : (g = ea.document.createEvent("CustomEvent"), g.initCustomEvent("unhandledrejection", !1, !0, g));
            g.promise = this;
            g.reason = this.o;
            return k(g)
        };
        e.prototype.M = function() {
            if (null != this.l) {
                for (var g = 0; g < this.l.length; ++g) f.l(this.l[g]);
                this.l =
                    null
            }
        };
        var f = new b;
        e.prototype.L = function(g) {
            var h = this.B();
            g.Vb(h.resolve, h.reject)
        };
        e.prototype.N = function(g, h) {
            var k = this.B();
            try {
                g.call(h, k.resolve, k.reject)
            } catch (n) {
                k.reject(n)
            }
        };
        e.prototype.then = function(g, h) {
            function k(u, y) {
                return "function" == typeof u ? function(A) {
                    try {
                        n(u(A))
                    } catch (N) {
                        m(N)
                    }
                } : y
            }
            var n, m, x = new e(function(u, y) {
                n = u;
                m = y
            });
            this.Vb(k(g, n), k(h, m));
            return x
        };
        e.prototype.catch = function(g) {
            return this.then(void 0, g)
        };
        e.prototype.Vb = function(g, h) {
            function k() {
                switch (n.j) {
                    case 1:
                        g(n.o);
                        break;
                    case 2:
                        h(n.o);
                        break;
                    default:
                        throw Error("Unexpected state: " + n.j);
                }
            }
            var n = this;
            null == this.l ? f.l(k) : this.l.push(k);
            this.D = !0
        };
        e.resolve = c;
        e.reject = function(g) {
            return new e(function(h, k) {
                k(g)
            })
        };
        e.race = function(g) {
            return new e(function(h, k) {
                for (var n = r(g), m = n.next(); !m.done; m = n.next()) c(m.value).Vb(h, k)
            })
        };
        e.all = function(g) {
            var h = r(g),
                k = h.next();
            return k.done ? c([]) : new e(function(n, m) {
                function x(A) {
                    return function(N) {
                        u[A] = N;
                        y--;
                        0 == y && n(u)
                    }
                }
                var u = [],
                    y = 0;
                do u.push(void 0), y++, c(k.value).Vb(x(u.length -
                    1), m), k = h.next(); while (!k.done)
            })
        };
        return e
    });
    p("Array.prototype.find", function(a) {
        return a ? a : function(b, c) {
            a: {
                var d = this;d instanceof String && (d = String(d));
                for (var e = d.length, f = 0; f < e; f++) {
                    var g = d[f];
                    if (b.call(c, g, f, d)) {
                        b = g;
                        break a
                    }
                }
                b = void 0
            }
            return b
        }
    });
    p("WeakMap", function(a) {
        function b() {}

        function c(k) {
            var n = typeof k;
            return "object" === n && null !== k || "function" === n
        }

        function d(k) {
            if (!ia(k, f)) {
                var n = new b;
                ba(k, f, {
                    value: n
                })
            }
        }

        function e(k) {
            var n = Object[k];
            n && (Object[k] = function(m) {
                if (m instanceof b) return m;
                Object.isExtensible(m) && d(m);
                return n(m)
            })
        }
        if (function() {
                if (!a || !Object.seal) return !1;
                try {
                    var k = Object.seal({}),
                        n = Object.seal({}),
                        m = new a([
                            [k, 2],
                            [n, 3]
                        ]);
                    if (2 != m.get(k) || 3 != m.get(n)) return !1;
                    m.delete(k);
                    m.set(n, 4);
                    return !m.has(k) && 4 == m.get(n)
                } catch (x) {
                    return !1
                }
            }()) return a;
        var f = "$jscomp_hidden_" + Math.random();
        e("freeze");
        e("preventExtensions");
        e("seal");
        var g = 0,
            h = function(k) {
                this.j = (g += Math.random() + 1).toString();
                if (k) {
                    k = r(k);
                    for (var n; !(n = k.next()).done;) n = n.value, this.set(n[0], n[1])
                }
            };
        h.prototype.set = function(k, n) {
            if (!c(k)) throw Error("Invalid WeakMap key");
            d(k);
            if (!ia(k, f)) throw Error("WeakMap key fail: " + k);
            k[f][this.j] = n;
            return this
        };
        h.prototype.get = function(k) {
            return c(k) && ia(k, f) ? k[f][this.j] : void 0
        };
        h.prototype.has = function(k) {
            return c(k) && ia(k, f) && ia(k[f],
                this.j)
        };
        h.prototype.delete = function(k) {
            return c(k) && ia(k, f) && ia(k[f], this.j) ? delete k[f][this.j] : !1
        };
        return h
    });
    p("Map", function(a) {
        if (function() {
                if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
                try {
                    var h = Object.seal({
                            x: 4
                        }),
                        k = new a(r([
                            [h, "s"]
                        ]));
                    if ("s" != k.get(h) || 1 != k.size || k.get({
                            x: 4
                        }) || k.set({
                            x: 4
                        }, "t") != k || 2 != k.size) return !1;
                    var n = k.entries(),
                        m = n.next();
                    if (m.done || m.value[0] != h || "s" != m.value[1]) return !1;
                    m = n.next();
                    return m.done || 4 != m.value[0].x || "t" != m.value[1] || !n.next().done ? !1 : !0
                } catch (x) {
                    return !1
                }
            }()) return a;
        var b = new WeakMap,
            c = function(h) {
                this.l = {};
                this.j = f();
                this.size = 0;
                if (h) {
                    h = r(h);
                    for (var k; !(k = h.next()).done;) k = k.value, this.set(k[0], k[1])
                }
            };
        c.prototype.set = function(h, k) {
            h = 0 === h ? 0 : h;
            var n = d(this, h);
            n.list || (n.list = this.l[n.id] = []);
            n.entry ? n.entry.value = k : (n.entry = {
                next: this.j,
                Qa: this.j.Qa,
                head: this.j,
                key: h,
                value: k
            }, n.list.push(n.entry), this.j.Qa.next = n.entry, this.j.Qa = n.entry, this.size++);
            return this
        };
        c.prototype.delete = function(h) {
            h = d(this, h);
            return h.entry && h.list ? (h.list.splice(h.index, 1), h.list.length || delete this.l[h.id], h.entry.Qa.next = h.entry.next,
                h.entry.next.Qa = h.entry.Qa, h.entry.head = null, this.size--, !0) : !1
        };
        c.prototype.clear = function() {
            this.l = {};
            this.j = this.j.Qa = f();
            this.size = 0
        };
        c.prototype.has = function(h) {
            return !!d(this, h).entry
        };
        c.prototype.get = function(h) {
            return (h = d(this, h).entry) && h.value
        };
        c.prototype.entries = function() {
            return e(this, function(h) {
                return [h.key, h.value]
            })
        };
        c.prototype.keys = function() {
            return e(this, function(h) {
                return h.key
            })
        };
        c.prototype.values = function() {
            return e(this, function(h) {
                return h.value
            })
        };
        c.prototype.forEach =
            function(h, k) {
                for (var n = this.entries(), m; !(m = n.next()).done;) m = m.value, h.call(k, m[1], m[0], this)
            };
        c.prototype[Symbol.iterator] = c.prototype.entries;
        var d = function(h, k) {
                var n = k && typeof k;
                "object" == n || "function" == n ? b.has(k) ? n = b.get(k) : (n = "" + ++g, b.set(k, n)) : n = "p_" + k;
                var m = h.l[n];
                if (m && ia(h.l, n))
                    for (h = 0; h < m.length; h++) {
                        var x = m[h];
                        if (k !== k && x.key !== x.key || k === x.key) return {
                            id: n,
                            list: m,
                            index: h,
                            entry: x
                        }
                    }
                return {
                    id: n,
                    list: m,
                    index: -1,
                    entry: void 0
                }
            },
            e = function(h, k) {
                var n = h.j;
                return fa(function() {
                    if (n) {
                        for (; n.head !=
                            h.j;) n = n.Qa;
                        for (; n.next != n.head;) return n = n.next, {
                            done: !1,
                            value: k(n)
                        };
                        n = null
                    }
                    return {
                        done: !0,
                        value: void 0
                    }
                })
            },
            f = function() {
                var h = {};
                return h.Qa = h.next = h.head = h
            },
            g = 0;
        return c
    });
    p("Math.trunc", function(a) {
        return a ? a : function(b) {
            b = Number(b);
            if (isNaN(b) || Infinity === b || -Infinity === b || 0 === b) return b;
            var c = Math.floor(Math.abs(b));
            return 0 > b ? -c : c
        }
    });
    p("Number.isNaN", function(a) {
        return a ? a : function(b) {
            return "number" === typeof b && isNaN(b)
        }
    });
    var Ha = function(a, b) {
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
    };
    p("Array.from", function(a) {
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
    p("Array.prototype.keys", function(a) {
        return a ? a : function() {
            return Ha(this, function(b) {
                return b
            })
        }
    });
    p("Array.prototype.values", function(a) {
        return a ? a : function() {
            return Ha(this, function(b, c) {
                return c
            })
        }
    });
    p("Array.prototype.fill", function(a) {
        return a ? a : function(b, c, d) {
            var e = this.length || 0;
            0 > c && (c = Math.max(0, e + c));
            if (null == d || d > e) d = e;
            d = Number(d);
            0 > d && (d = Math.max(0, e + d));
            for (c = Number(c || 0); c < d; c++) this[c] = b;
            return this
        }
    });
    var Ia = function(a) {
        return a ? a : Array.prototype.fill
    };
    p("Int8Array.prototype.fill", Ia);
    p("Uint8Array.prototype.fill", Ia);
    p("Uint8ClampedArray.prototype.fill", Ia);
    p("Int16Array.prototype.fill", Ia);
    p("Uint16Array.prototype.fill", Ia);
    p("Int32Array.prototype.fill", Ia);
    p("Uint32Array.prototype.fill", Ia);
    p("Float32Array.prototype.fill", Ia);
    p("Float64Array.prototype.fill", Ia);
    p("Object.setPrototypeOf", function(a) {
        return a || ra
    });
    p("Set", function(a) {
        if (function() {
                if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
                try {
                    var c = Object.seal({
                            x: 4
                        }),
                        d = new a(r([c]));
                    if (!d.has(c) || 1 != d.size || d.add(c) != d || 1 != d.size || d.add({
                            x: 4
                        }) != d || 2 != d.size) return !1;
                    var e = d.entries(),
                        f = e.next();
                    if (f.done || f.value[0] != c || f.value[1] != c) return !1;
                    f = e.next();
                    return f.done || f.value[0] == c || 4 != f.value[0].x || f.value[1] != f.value[0] ? !1 : e.next().done
                } catch (g) {
                    return !1
                }
            }()) return a;
        var b = function(c) {
            this.j = new Map;
            if (c) {
                c =
                    r(c);
                for (var d; !(d = c.next()).done;) this.add(d.value)
            }
            this.size = this.j.size
        };
        b.prototype.add = function(c) {
            c = 0 === c ? 0 : c;
            this.j.set(c, c);
            this.size = this.j.size;
            return this
        };
        b.prototype.delete = function(c) {
            c = this.j.delete(c);
            this.size = this.j.size;
            return c
        };
        b.prototype.clear = function() {
            this.j.clear();
            this.size = 0
        };
        b.prototype.has = function(c) {
            return this.j.has(c)
        };
        b.prototype.entries = function() {
            return this.j.entries()
        };
        b.prototype.values = function() {
            return this.j.values()
        };
        b.prototype.keys = b.prototype.values;
        b.prototype[Symbol.iterator] = b.prototype.values;
        b.prototype.forEach = function(c, d) {
            var e = this;
            this.j.forEach(function(f) {
                return c.call(d, f, f, e)
            })
        };
        return b
    });
    var Ja = function(a, b, c) {
        if (null == a) throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
        if (b instanceof RegExp) throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
        return a + ""
    };
    p("String.prototype.startsWith", function(a) {
        return a ? a : function(b, c) {
            var d = Ja(this, b, "startsWith");
            b += "";
            var e = d.length,
                f = b.length;
            c = Math.max(0, Math.min(c | 0, d.length));
            for (var g = 0; g < f && c < e;)
                if (d[c++] != b[g++]) return !1;
            return g >= f
        }
    });
    p("String.prototype.repeat", function(a) {
        return a ? a : function(b) {
            var c = Ja(this, null, "repeat");
            if (0 > b || 1342177279 < b) throw new RangeError("Invalid count value");
            b |= 0;
            for (var d = ""; b;)
                if (b & 1 && (d += c), b >>>= 1) c += c;
            return d
        }
    });
    p("Object.is", function(a) {
        return a ? a : function(b, c) {
            return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c
        }
    });
    p("Array.prototype.includes", function(a) {
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
    p("String.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            return -1 !== Ja(this, b, "includes").indexOf(b, c || 0)
        }
    });
    p("String.prototype.padStart", function(a) {
        return a ? a : function(b, c) {
            var d = Ja(this, null, "padStart");
            b -= d.length;
            c = void 0 !== c ? String(c) : " ";
            return (0 < b && c ? c.repeat(Math.ceil(b / c.length)).substring(0, b) : "") + d
        }
    });
    p("Math.imul", function(a) {
        return a ? a : function(b, c) {
            b = Number(b);
            c = Number(c);
            var d = b & 65535,
                e = c & 65535;
            return d * e + ((b >>> 16 & 65535) * e + d * (c >>> 16 & 65535) << 16 >>> 0) | 0
        }
    });
    p("Array.prototype.flatMap", function(a) {
        return a ? a : function(b, c) {
            for (var d = [], e = 0; e < this.length; e++) {
                var f = b.call(c, this[e], e, this);
                Array.isArray(f) ? d.push.apply(d, f) : d.push(f)
            }
            return d
        }
    });
    var Ka = Ka || {},
        v = this || self,
        w = function(a, b, c) {
            a = a.split(".");
            c = c || v;
            a[0] in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
            for (var d; a.length && (d = a.shift());) a.length || void 0 === b ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b
        },
        La = function(a, b) {
            a = a.split(".");
            b = b || v;
            for (var c = 0; c < a.length; c++)
                if (b = b[a[c]], null == b) return null;
            return b
        },
        Ma = function(a) {
            var b = typeof a;
            b = "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null";
            return "array" == b || "object" == b && "number" == typeof a.length
        },
        Na =
        function(a) {
            var b = typeof a;
            return "object" == b && null != a || "function" == b
        },
        Qa = function(a) {
            return Object.prototype.hasOwnProperty.call(a, Oa) && a[Oa] || (a[Oa] = ++Pa)
        },
        Ra = function(a) {
            null !== a && "removeAttribute" in a && a.removeAttribute(Oa);
            try {
                delete a[Oa]
            } catch (b) {}
        },
        Oa = "closure_uid_" + (1E9 * Math.random() >>> 0),
        Pa = 0,
        Sa = function(a, b, c) {
            return a.call.apply(a.bind, arguments)
        },
        Ta = function(a, b, c) {
            if (!a) throw Error();
            if (2 < arguments.length) {
                var d = Array.prototype.slice.call(arguments, 2);
                return function() {
                    var e = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(e, d);
                    return a.apply(b, e)
                }
            }
            return function() {
                return a.apply(b, arguments)
            }
        },
        Ua = function(a, b, c) {
            Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? Ua = Sa : Ua = Ta;
            return Ua.apply(null, arguments)
        },
        Va = function(a, b) {
            var c = Array.prototype.slice.call(arguments, 1);
            return function() {
                var d = c.slice();
                d.push.apply(d, arguments);
                return a.apply(this, d)
            }
        },
        Wa = function() {
            return Date.now()
        },
        Xa = function(a, b) {
            function c() {}
            c.prototype = b.prototype;
            a.Aa = b.prototype;
            a.prototype = new c;
            a.prototype.constructor = a;
            a.Mh = function(d, e, f) {
                for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
                return b.prototype[e].apply(d, g)
            }
        },
        Ya = function(a) {
            return a
        };

    function Za(a, b) {
        if (Error.captureStackTrace) Error.captureStackTrace(this, Za);
        else {
            var c = Error().stack;
            c && (this.stack = c)
        }
        a && (this.message = String(a));
        void 0 !== b && (this.cause = b)
    }
    Xa(Za, Error);
    Za.prototype.name = "CustomError";
    var $a;
    var ab, bb = "undefined" !== typeof TextEncoder;

    function db(a) {
        v.setTimeout(function() {
            throw a;
        }, 0)
    };
    var eb = function(a, b) {
            var c = a.length - b.length;
            return 0 <= c && a.indexOf(b, c) == c
        },
        fb = function(a) {
            return /^[\s\xa0]*$/.test(a)
        },
        gb = String.prototype.trim ? function(a) {
            return a.trim()
        } : function(a) {
            return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
        },
        ib = /&/g,
        jb = /</g,
        kb = />/g,
        lb = /"/g,
        nb = /'/g,
        ob = /\x00/g,
        pb = /[\x00&<>"']/,
        qb = function(a, b) {
            return -1 != a.indexOf(b)
        },
        rb = function(a, b) {
            return qb(a.toLowerCase(), b.toLowerCase())
        },
        tb = function(a, b) {
            var c = 0;
            a = gb(String(a)).split(".");
            b = gb(String(b)).split(".");
            for (var d = Math.max(a.length,
                    b.length), e = 0; 0 == c && e < d; e++) {
                var f = a[e] || "",
                    g = b[e] || "";
                do {
                    f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                    g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
                    if (0 == f[0].length && 0 == g[0].length) break;
                    c = sb(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == g[1].length ? 0 : parseInt(g[1], 10)) || sb(0 == f[2].length, 0 == g[2].length) || sb(f[2], g[2]);
                    f = f[3];
                    g = g[3]
                } while (0 == c)
            }
            return c
        },
        sb = function(a, b) {
            return a < b ? -1 : a > b ? 1 : 0
        };

    function ub() {
        var a = v.navigator;
        return a && (a = a.userAgent) ? a : ""
    }

    function z(a) {
        return qb(ub(), a)
    };

    function vb() {
        return z("Trident") || z("MSIE")
    }

    function wb() {
        return z("Firefox") || z("FxiOS")
    }

    function xb() {
        return z("Safari") && !(yb() || z("Coast") || z("Opera") || z("Edge") || z("Edg/") || z("OPR") || wb() || z("Silk") || z("Android"))
    }

    function yb() {
        return (z("Chrome") || z("CriOS")) && !z("Edge") || z("Silk")
    };

    function zb() {
        return z("iPhone") && !z("iPod") && !z("iPad")
    };
    var Ab = function(a, b) {
            if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
            for (var c = 0; c < a.length; c++)
                if (c in a && a[c] === b) return c;
            return -1
        },
        Bb = function(a, b) {
            for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++) e in d && b.call(void 0, d[e], e, a)
        };

    function Cb(a, b) {
        for (var c = "string" === typeof a ? a.split("") : a, d = a.length - 1; 0 <= d; --d) d in c && b.call(void 0, c[d], d, a)
    }
    var Db = function(a, b) {
            for (var c = a.length, d = [], e = 0, f = "string" === typeof a ? a.split("") : a, g = 0; g < c; g++)
                if (g in f) {
                    var h = f[g];
                    b.call(void 0, h, g, a) && (d[e++] = h)
                }
            return d
        },
        Eb = function(a, b) {
            for (var c = a.length, d = Array(c), e = "string" === typeof a ? a.split("") : a, f = 0; f < c; f++) f in e && (d[f] = b.call(void 0, e[f], f, a));
            return d
        },
        Fb = function(a, b, c) {
            var d = c;
            Bb(a, function(e, f) {
                d = b.call(void 0, d, e, f, a)
            });
            return d
        },
        Gb = function(a, b) {
            for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
                if (e in d && b.call(void 0, d[e],
                        e, a)) return !0;
            return !1
        };

    function Hb(a, b) {
        b = Ib(a, b);
        return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b]
    }

    function Ib(a, b) {
        for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
            if (e in d && b.call(void 0, d[e], e, a)) return e;
        return -1
    }

    function Jb(a, b) {
        for (var c = "string" === typeof a ? a.split("") : a, d = a.length - 1; 0 <= d; d--)
            if (d in c && b.call(void 0, c[d], d, a)) return d;
        return -1
    }

    function Kb(a, b) {
        return 0 <= Ab(a, b)
    }

    function Lb(a, b) {
        b = Ab(a, b);
        var c;
        (c = 0 <= b) && Mb(a, b);
        return c
    }

    function Mb(a, b) {
        return 1 == Array.prototype.splice.call(a, b, 1).length
    }

    function Nb(a, b) {
        var c = 0;
        Cb(a, function(d, e) {
            b.call(void 0, d, e, a) && Mb(a, e) && c++
        })
    }

    function Ob(a) {
        return Array.prototype.concat.apply([], arguments)
    }

    function Pb(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
            return c
        }
        return []
    }

    function Qb(a) {
        for (var b = 0, c = 0, d = {}; c < a.length;) {
            var e = a[c++],
                f = Na(e) ? "o" + Qa(e) : (typeof e).charAt(0) + e;
            Object.prototype.hasOwnProperty.call(d, f) || (d[f] = !0, a[b++] = e)
        }
        a.length = b
    }

    function Rb(a, b) {
        a.sort(b || Sb)
    }

    function Sb(a, b) {
        return a > b ? 1 : a < b ? -1 : 0
    }

    function Tb(a) {
        for (var b = [], c = 0; c < a; c++) b[c] = "";
        return b
    };
    var Ub = function(a) {
        Ub[" "](a);
        return a
    };
    Ub[" "] = function() {};
    var Vb = function(a, b) {
            try {
                return Ub(a[b]), !0
            } catch (c) {}
            return !1
        },
        Xb = function(a) {
            var b = Wb;
            return Object.prototype.hasOwnProperty.call(b, 8) ? b[8] : b[8] = a(8)
        };
    var Yb = z("Opera"),
        Zb = vb(),
        $b = z("Edge"),
        ac = z("Gecko") && !(rb(ub(), "WebKit") && !z("Edge")) && !(z("Trident") || z("MSIE")) && !z("Edge"),
        bc = rb(ub(), "WebKit") && !z("Edge"),
        cc = z("Macintosh"),
        dc = z("Android"),
        ec = zb(),
        fc = z("iPad"),
        hc = z("iPod"),
        ic = zb() || z("iPad") || z("iPod"),
        jc = function() {
            var a = v.document;
            return a ? a.documentMode : void 0
        },
        kc;
    a: {
        var lc = "",
            mc = function() {
                var a = ub();
                if (ac) return /rv:([^\);]+)(\)|;)/.exec(a);
                if ($b) return /Edge\/([\d\.]+)/.exec(a);
                if (Zb) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
                if (bc) return /WebKit\/(\S+)/.exec(a);
                if (Yb) return /(?:Version)[ \/]?(\S+)/.exec(a)
            }();mc && (lc = mc ? mc[1] : "");
        if (Zb) {
            var nc = jc();
            if (null != nc && nc > parseFloat(lc)) {
                kc = String(nc);
                break a
            }
        }
        kc = lc
    }
    var oc = kc,
        Wb = {},
        pc = function() {
            return Xb(function() {
                return 0 <= tb(oc, 8)
            })
        },
        qc;
    if (v.document && Zb) {
        var rc = jc();
        qc = rc ? rc : parseInt(oc, 10) || void 0
    } else qc = void 0;
    var sc = qc;
    var tc = wb(),
        uc = z("Android") && !(yb() || wb() || z("Opera") || z("Silk")),
        vc = yb();
    xb();
    var wc = {},
        xc = null,
        zc = function(a, b) {
            void 0 === b && (b = 0);
            yc();
            b = wc[b];
            for (var c = Array(Math.floor(a.length / 3)), d = b[64] || "", e = 0, f = 0; e < a.length - 2; e += 3) {
                var g = a[e],
                    h = a[e + 1],
                    k = a[e + 2],
                    n = b[g >> 2];
                g = b[(g & 3) << 4 | h >> 4];
                h = b[(h & 15) << 2 | k >> 6];
                k = b[k & 63];
                c[f++] = "" + n + g + h + k
            }
            n = 0;
            k = d;
            switch (a.length - e) {
                case 2:
                    n = a[e + 1], k = b[(n & 15) << 2] || d;
                case 1:
                    a = a[e], c[f] = "" + b[a >> 2] + b[(a & 3) << 4 | n >> 4] + k + d
            }
            return c.join("")
        },
        Bc = function(a) {
            var b = [];
            Ac(a, function(c) {
                b.push(c)
            });
            return b
        },
        Cc = function(a) {
            var b = a.length,
                c = 3 * b / 4;
            c % 3 ? c = Math.floor(c) :
                qb("=.", a[b - 1]) && (c = qb("=.", a[b - 2]) ? c - 2 : c - 1);
            var d = new Uint8Array(c),
                e = 0;
            Ac(a, function(f) {
                d[e++] = f
            });
            return e !== c ? d.subarray(0, e) : d
        },
        Ac = function(a, b) {
            function c(k) {
                for (; d < a.length;) {
                    var n = a.charAt(d++),
                        m = xc[n];
                    if (null != m) return m;
                    if (!fb(n)) throw Error("Unknown base64 encoding at char: " + n);
                }
                return k
            }
            yc();
            for (var d = 0;;) {
                var e = c(-1),
                    f = c(0),
                    g = c(64),
                    h = c(64);
                if (64 === h && -1 === e) break;
                b(e << 2 | f >> 4);
                64 != g && (b(f << 4 & 240 | g >> 2), 64 != h && b(g << 6 & 192 | h))
            }
        },
        yc = function() {
            if (!xc) {
                xc = {};
                for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),
                        b = ["+/=", "+/", "-_=", "-_.", "-_"], c = 0; 5 > c; c++) {
                    var d = a.concat(b[c].split(""));
                    wc[c] = d;
                    for (var e = 0; e < d.length; e++) {
                        var f = d[e];
                        void 0 === xc[f] && (xc[f] = e)
                    }
                }
            }
        };
    var Dc = "undefined" !== typeof Uint8Array,
        Ec, Fc = {};
    var Gc;

    function Hc() {
        if (Fc !== Fc) throw Error("illegal external caller");
    }
    var Ic = function(a) {
        Hc();
        this.V = a;
        if (null != a && 0 === a.length) throw Error("ByteString should be constructed with non-empty values");
    };
    Ic.prototype.isEmpty = function() {
        return null == this.V
    };
    Ic.prototype.sizeBytes = function() {
        var a = Jc(this);
        return a ? a.length : 0
    };
    var Jc = function(a) {
        Hc();
        var b = a.V;
        b = null == b || Dc && null != b && b instanceof Uint8Array ? b : "string" === typeof b ? Cc(b) : null;
        return null == b ? b : a.V = b
    };
    var Kc = "function" === typeof Symbol && "symbol" === typeof Symbol() ? Symbol() : void 0;

    function Lc(a, b) {
        if (Kc) return a[Kc] |= b;
        if (void 0 !== a.Ga) return a.Ga |= b;
        Object.defineProperties(a, {
            Ga: {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !1
            }
        });
        return b
    }

    function Mc(a, b) {
        Kc ? a[Kc] && (a[Kc] &= ~b) : void 0 !== a.Ga && (a.Ga &= ~b)
    }

    function Nc(a) {
        var b;
        Kc ? b = a[Kc] : b = a.Ga;
        return null == b ? 0 : b
    }

    function Oc(a, b) {
        Kc ? a[Kc] = b : void 0 !== a.Ga ? a.Ga = b : Object.defineProperties(a, {
            Ga: {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !1
            }
        })
    }

    function Pc(a) {
        Lc(a, 1);
        return a
    }

    function Qc(a) {
        return !!(Nc(a) & 2)
    }

    function Rc(a) {
        Lc(a, 16);
        return a
    }

    function Sc(a, b) {
        Oc(b, (a | 0) & -51)
    }

    function Tc(a, b) {
        Oc(b, (a | 18) & -41)
    };
    var Uc = {};

    function Vc(a) {
        return null !== a && "object" === typeof a && !Array.isArray(a) && a.constructor === Object
    }
    var Wc, Xc, Yc = [];
    Oc(Yc, 23);
    Xc = Object.freeze(Yc);
    var Zc = function(a) {
        if (Qc(a.da)) throw Error("Cannot mutate an immutable Message");
    };

    function $c(a) {
        var b = a.length;
        (b = b ? a[b - 1] : void 0) && Vc(b) ? b.g = 1 : (b = {}, a.push((b.g = 1, b)))
    };
    var ad;

    function bd(a, b) {
        ad = b;
        a = new a(b);
        ad = void 0;
        return a
    };

    function cd(a, b, c) {
        var d = !1;
        if (null != a && "object" === typeof a && !(d = Array.isArray(a)) && a.Uc === Uc) return a;
        if (d) return new b(a);
        if (c) return new b
    };

    function dd(a) {
        switch (typeof a) {
            case "number":
                return isFinite(a) ? a : String(a);
            case "object":
                if (a)
                    if (Array.isArray(a)) {
                        if (0 !== (Nc(a) & 128)) return a = Array.prototype.slice.call(a), $c(a), a
                    } else {
                        if (Dc && null != a && a instanceof Uint8Array) return zc(a);
                        if (a instanceof Ic) {
                            var b = a.V;
                            return null == b ? "" : "string" === typeof b ? b : a.V = zc(b)
                        }
                    }
        }
        return a
    };

    function ed(a, b, c, d) {
        if (null != a) {
            if (Array.isArray(a)) a = fd(a, b, c, void 0 !== d);
            else if (Vc(a)) {
                var e = {},
                    f;
                for (f in a) e[f] = ed(a[f], b, c, d);
                a = e
            } else a = b(a, d);
            return a
        }
    }

    function fd(a, b, c, d) {
        var e = Nc(a);
        d = d ? !!(e & 16) : void 0;
        a = Array.prototype.slice.call(a);
        for (var f = 0; f < a.length; f++) a[f] = ed(a[f], b, c, d);
        c(e, a);
        return a
    }

    function gd(a) {
        return a.Uc === Uc ? a.toJSON() : dd(a)
    }

    function hd(a, b) {
        a & 128 && $c(b)
    };
    var id = function(a) {
            var b = a.j + a.ab;
            return a.wa || (a.wa = a.da[b] = {})
        },
        B = function(a, b, c) {
            return -1 === b ? null : b >= a.j ? a.wa ? a.wa[b] : void 0 : c && a.wa && (c = a.wa[b], null != c) ? c : a.da[b + a.ab]
        },
        C = function(a, b, c, d) {
            Zc(a);
            return jd(a, b, c, d)
        };

    function jd(a, b, c, d) {
        a.l && (a.l = void 0);
        if (b >= a.j || d) return id(a)[b] = c, a;
        a.da[b + a.ab] = c;
        (c = a.wa) && b in c && delete c[b];
        return a
    }

    function kd(a, b, c, d, e) {
        var f = B(a, b, d);
        Array.isArray(f) || (f = Xc);
        var g = Nc(f);
        g & 1 || Pc(f);
        if (e) g & 2 || Lc(f, 2), c & 1 || Object.freeze(f);
        else {
            e = !(c & 2);
            var h = g & 2;
            c & 1 || !h ? e && g & 16 && !h && Mc(f, 16) : (f = Pc(Array.prototype.slice.call(f)), jd(a, b, f, d))
        }
        return f
    }
    var ld = function(a, b) {
            return kd(a, b, 0, !1, Qc(a.da))
        },
        md = function(a, b) {
            a = B(a, b);
            return null == a ? a : +a
        },
        nd = function(a, b) {
            a = B(a, b);
            return null == a ? a : !!a
        },
        od = function(a, b) {
            a = B(a, b);
            return null == a ? 0 : a
        },
        pd = function(a, b, c, d) {
            if (null == c) c = Xc;
            else {
                var e = Nc(c);
                1 !== (e & 1) && (Object.isFrozen(c) && (c = Array.prototype.slice.call(c)), Oc(c, e | 1))
            }
            return C(a, b, c, d)
        };

    function qd(a, b, c, d) {
        Zc(a);
        c !== d ? jd(a, b, c) : jd(a, b, void 0, !1);
        return a
    }
    var rd = function(a, b) {
            for (var c = 0, d = 0; d < b.length; d++) {
                var e = b[d];
                null != B(a, e) && (0 !== c && jd(a, c, void 0, !1), c = e)
            }
            return c
        },
        td = function(a, b, c) {
            var d = void 0 === d ? !1 : d;
            var e = B(a, c, d);
            b = cd(e, b);
            b !== e && null != b && (jd(a, c, b, d), Lc(b.da, Nc(a.da) & 18));
            e = b;
            if (null == e) return e;
            Qc(a.da) || (b = sd(e), b !== e && (e = b, jd(a, c, e, d)));
            return e
        };

    function ud(a, b, c, d, e) {
        a.ta || (a.ta = {});
        var f = a.ta[c],
            g = kd(a, c, 3, void 0, e);
        if (f) e || (Object.isFrozen(f) ? d || (f = Array.prototype.slice.call(f), a.ta[c] = f) : d && Object.freeze(f));
        else {
            f = [];
            var h = !!(Nc(a.da) & 16),
                k = Qc(g);
            !e && k && (g = Pc(Array.prototype.slice.call(g)), jd(a, c, g));
            for (var n = k, m = 0; m < g.length; m++) {
                var x = g[m];
                var u = b;
                var y = h,
                    A = !1;
                A = void 0 === A ? !1 : A;
                y = void 0 === y ? !1 : y;
                u = Array.isArray(x) ? new u(y ? Rc(x) : x) : A ? new u : void 0;
                void 0 !== u && (n = n || Qc(x), f.push(u), k && Lc(u.da, 2))
            }
            a.ta[c] = f;
            a = g;
            Object.isFrozen(a) || (b =
                Nc(a) | 33, Oc(a, n ? b & -9 : b | 8));
            (e || d && k) && Lc(f, 2);
            (e || d) && Object.freeze(f)
        }
        return f
    }
    var vd = function(a, b, c) {
            var d = Qc(a.da);
            b = ud(a, b, c, d, d);
            a = kd(a, c, 3, void 0, d);
            if (!(d || Nc(a) & 8)) {
                for (d = 0; d < b.length; d++) {
                    c = b[d];
                    var e = sd(c);
                    c !== e && (b[d] = e, a[d] = b[d].da)
                }
                Lc(a, 8)
            }
            return b
        },
        wd = function(a, b, c) {
            Zc(a);
            null == c && (c = void 0);
            return jd(a, b, c)
        },
        xd = function(a, b, c, d) {
            Zc(a);
            if (null != c) {
                var e = Pc([]);
                for (var f = !1, g = 0; g < c.length; g++) e[g] = c[g].da, f = f || Qc(e[g]);
                a.ta || (a.ta = {});
                a.ta[b] = c;
                c = e;
                f ? Mc(c, 8) : Lc(c, 8)
            } else a.ta && (a.ta[b] = void 0), e = Xc;
            return jd(a, b, e, d)
        },
        zd = function(a, b, c, d) {
            Zc(a);
            var e = ud(a, c, b, !1, !1);
            c = null != d ? d : new c;
            a = kd(a, b, 2, void 0, !1);
            e.push(c);
            a.push(c.da);
            Qc(c.da) && Mc(a, 8);
            return c
        };

    function Ad(a, b) {
        return null == a ? b : a
    }
    var Bd = function(a, b) {
            return Ad(B(a, b), "")
        },
        Cd = function(a, b, c) {
            c = rd(a, c) === b;
            return od(a, c ? b : -1)
        };

    function Dd(a) {
        var b = Nc(a);
        if (b & 2) return a;
        a = Eb(a, Ed);
        Tc(b, a);
        Object.freeze(a);
        return a
    }

    function Fd(a, b, c) {
        c = void 0 === c ? Tc : c;
        if (null != a) {
            if (Dc && a instanceof Uint8Array) return a.length ? new Ic(new Uint8Array(a)) : Gc || (Gc = new Ic(null));
            if (Array.isArray(a)) {
                var d = Nc(a);
                if (d & 2) return a;
                if (b && !(d & 32) && (d & 16 || 0 === d)) return Oc(a, d | 2), a;
                a = fd(a, Fd, c, !0);
                b = Nc(a);
                b & 4 && b & 2 && Object.freeze(a);
                return a
            }
            return a.Uc === Uc ? Ed(a) : a
        }
    }

    function Ed(a) {
        if (Qc(a.da)) return a;
        a = Gd(a, !0);
        Lc(a.da, 2);
        return a
    }

    function Gd(a, b) {
        var c = a.da,
            d = Rc([]),
            e = a.constructor.messageId;
        e && d.push(e);
        a.wa && (d.length = c.length, d.fill(void 0, d.length, c.length), d[d.length - 1] = {});
        0 !== (Nc(c) & 128) && $c(d);
        b = b || Qc(a.da) ? Tc : Sc;
        d = bd(a.constructor, d);
        a.Oc && (d.Oc = a.Oc.slice());
        e = !!(Nc(c) & 16);
        for (var f = 0; f < c.length; f++) {
            var g = c[f];
            if (f === c.length - 1 && Vc(g))
                for (var h in g) {
                    var k = +h;
                    if (Number.isNaN(k)) id(d)[k] = g[k];
                    else {
                        var n = g[h],
                            m = a.ta && a.ta[k];
                        m ? xd(d, k, Dd(m), !0) : C(d, k, Fd(n, e, b), !0)
                    }
                } else k = f - a.ab, (n = a.ta && a.ta[k]) ? xd(d, k, Dd(n), !1) :
                    C(d, k, Fd(g, e, b), !1)
        }
        return d
    };
    var D = function(a, b, c) {
        null == a && (a = ad);
        ad = void 0;
        var d = this.constructor.j || 0,
            e = 0 < d,
            f = this.constructor.messageId,
            g = !1;
        if (null == a) {
            a = f ? [f] : [];
            var h = !0;
            Oc(a, 48)
        } else {
            if (!Array.isArray(a)) throw Error();
            if (f && f !== a[0]) throw Error();
            var k = Lc(a, 0),
                n = k;
            if (h = 0 !== (16 & n))(g = 0 !== (32 & n)) || (n |= 32);
            if (e)
                if (128 & n) d = 0;
                else {
                    if (0 < a.length) {
                        var m = a[a.length - 1];
                        if (Vc(m) && "g" in m) {
                            d = 0;
                            n |= 128;
                            delete m.g;
                            var x = !0,
                                u;
                            for (u in m) {
                                x = !1;
                                break
                            }
                            x && a.pop()
                        }
                    }
                }
            else if (128 & n) throw Error();
            k !== n && Oc(a, n)
        }
        this.ab = (f ? 0 : -1) - d;
        this.ta = void 0;
        this.da = a;
        a: {
            f = this.da.length;d = f - 1;
            if (f && (f = this.da[d], Vc(f))) {
                this.wa = f;
                this.j = d - this.ab;
                break a
            }
            void 0 !== b && -1 < b ? (this.j = Math.max(b, d + 1 - this.ab), this.wa = void 0) : this.j = Number.MAX_VALUE
        }
        if (!e && this.wa && "g" in this.wa) throw Error('Unexpected "g" flag in sparse object of message that is not a group type.');
        if (c) {
            b = h && !g && !0;
            e = this.j;
            var y;
            for (h = 0; h < c.length; h++) g = c[h], g < e ? (g += this.ab, (d = a[g]) ? Hd(d, b) : a[g] = Xc) : (y || (y = id(this)), (d = y[g]) ? Hd(d, b) : y[g] = Xc)
        }
    };
    D.prototype.toJSON = function() {
        var a = this.da;
        return Wc ? a : fd(a, gd, hd)
    };
    var Jd = function(a) {
            Wc = !0;
            try {
                return JSON.stringify(a.toJSON(), Id)
            } finally {
                Wc = !1
            }
        },
        Kd = function(a, b) {
            if (null == b || "" == b) return new a;
            b = JSON.parse(b);
            if (!Array.isArray(b)) throw Error(void 0);
            return bd(a, Rc(b))
        };
    D.prototype.isMutable = function() {
        return !Qc(this.da)
    };
    var sd = function(a) {
        if (Qc(a.da)) {
            var b = Gd(a, !1);
            b.l = a;
            a = b
        }
        return a
    };

    function Hd(a, b) {
        if (Array.isArray(a)) {
            var c = Nc(a),
                d = 1;
            !b || c & 2 || (d |= 16);
            (c & d) !== d && Oc(a, c | d)
        }
    }
    D.prototype.Uc = Uc;
    D.prototype.toString = function() {
        return this.da.toString()
    };

    function Id(a, b) {
        return dd(b)
    };
    var Ld = 0,
        Md = 0;

    function Nd(a) {
        var b = 0 > a;
        a = Math.abs(a);
        var c = a >>> 0;
        a = Math.floor((a - c) / 4294967296);
        b && (c = r(Od(c, a)), b = c.next().value, a = c.next().value, c = b);
        Ld = c >>> 0;
        Md = a >>> 0
    }
    var Pd = "function" === typeof BigInt;

    function Qd(a) {
        if (16 > a.length) Nd(Number(a));
        else if (Pd) a = BigInt(a), Ld = Number(a & BigInt(4294967295)) >>> 0, Md = Number(a >> BigInt(32) & BigInt(4294967295));
        else {
            var b = +("-" === a[0]);
            Md = Ld = 0;
            for (var c = a.length, d = 0 + b, e = (c - b) % 6 + b; e <= c; d = e, e += 6) d = Number(a.slice(d, e)), Md *= 1E6, Ld = 1E6 * Ld + d, 4294967296 <= Ld && (Md += Ld / 4294967296 | 0, Ld %= 4294967296);
            b && (b = r(Od(Ld, Md)), a = b.next().value, b = b.next().value, Ld = a, Md = b)
        }
    }

    function Od(a, b) {
        b = ~b;
        a ? a = ~a + 1 : b += 1;
        return [a, b]
    };
    var Rd = function(a, b) {
            this.l = a >>> 0;
            this.j = b >>> 0
        },
        Td = function(a) {
            if (!a) return Sd || (Sd = new Rd(0, 0));
            if (!/^\d+$/.test(a)) return null;
            Qd(a);
            return new Rd(Ld, Md)
        },
        Sd, Ud = function(a, b) {
            this.l = a >>> 0;
            this.j = b >>> 0
        },
        Wd = function(a) {
            if (!a) return Vd || (Vd = new Ud(0, 0));
            if (!/^-?\d+$/.test(a)) return null;
            Qd(a);
            return new Ud(Ld, Md)
        },
        Vd;
    var Xd = function() {
        this.j = []
    };
    Xd.prototype.length = function() {
        return this.j.length
    };
    Xd.prototype.end = function() {
        var a = this.j;
        this.j = [];
        return a
    };
    var Yd = function(a, b, c) {
            for (; 0 < c || 127 < b;) a.j.push(b & 127 | 128), b = (b >>> 7 | c << 25) >>> 0, c >>>= 7;
            a.j.push(b)
        },
        Zd = function(a, b) {
            for (; 127 < b;) a.j.push(b & 127 | 128), b >>>= 7;
            a.j.push(b)
        },
        $d = function(a, b) {
            if (0 <= b) Zd(a, b);
            else {
                for (var c = 0; 9 > c; c++) a.j.push(b & 127 | 128), b >>= 7;
                a.j.push(1)
            }
        },
        ae = function(a, b) {
            a.j.push(b >>> 0 & 255);
            a.j.push(b >>> 8 & 255);
            a.j.push(b >>> 16 & 255);
            a.j.push(b >>> 24 & 255)
        };
    var be = function() {
            this.o = [];
            this.l = 0;
            this.j = new Xd
        },
        ce = function(a, b) {
            0 !== b.length && (a.o.push(b), a.l += b.length)
        },
        ee = function(a, b) {
            de(a, b, 2);
            b = a.j.end();
            ce(a, b);
            b.push(a.l);
            return b
        },
        fe = function(a, b) {
            var c = b.pop();
            for (c = a.l + a.j.length() - c; 127 < c;) b.push(c & 127 | 128), c >>>= 7, a.l++;
            b.push(c);
            a.l++
        },
        ge = function(a, b) {
            if (b = b.Oc) {
                ce(a, a.j.end());
                for (var c = 0; c < b.length; c++) ce(a, Jc(b[c]) || Ec || (Ec = new Uint8Array(0)))
            }
        },
        de = function(a, b, c) {
            Zd(a.j, 8 * b + c)
        };

    function he(a, b, c) {
        if (c) {
            var d = {},
                e;
            for (e in c) {
                var f = c[e],
                    g = f.Sf;
                g || (d.Ab = f.Ph || f.Rh.yc, f.Le ? (d.Bc = ie(f.Le), g = function(h) {
                    return function(k, n, m) {
                        return h.Ab(k, n, m, h.Bc)
                    }
                }(d)) : f.nf ? (d.Ac = je(f.Re.Gd, f.nf), g = function(h) {
                    return function(k, n, m) {
                        return h.Ab(k, n, m, h.Ac)
                    }
                }(d)) : g = d.Ab, f.Sf = g);
                g(b, a, f.Re);
                d = {
                    Ab: d.Ab,
                    Bc: d.Bc,
                    Ac: d.Ac
                }
            }
        }
        ge(b, a)
    }

    function ke(a, b) {
        var c = a[b];
        "function" == typeof c && 0 === c.length && (c = c(), a[b] = c);
        return Array.isArray(c) && (le in c || me in c || 0 < c.length && "function" == typeof c[0]) ? c : void 0
    }
    var ne = Symbol();

    function ie(a) {
        var b = a[ne];
        if (!b) {
            var c = oe(a);
            b = function(d, e) {
                return pe(d, e, c)
            };
            a[ne] = b
        }
        return b
    }

    function je(a, b) {
        var c = a[ne];
        c || (c = function(d, e) {
            return he(d, e, b)
        }, a[ne] = c);
        return c
    }
    var me = Symbol();

    function qe(a, b) {
        a.push(b)
    }

    function re(a, b, c) {
        a.push(b, c.yc)
    }

    function se(a, b, c, d) {
        var e = ie(d),
            f = oe(d).Gd,
            g = c.yc;
        a.push(b, function(h, k, n) {
            return g(h, k, n, f, e)
        })
    }

    function te(a, b, c, d, e, f) {
        var g = je(d, f),
            h = c.yc;
        a.push(b, function(k, n, m) {
            return h(k, n, m, d, g)
        })
    }

    function oe(a) {
        var b = a[me];
        if (b) return b;
        b = a[me] = [];
        var c = qe,
            d = re,
            e = se,
            f = te;
        b.Gd = a[0];
        var g = 1;
        if (a.length > g && "number" !== typeof a[g]) {
            var h = a[g++];
            c(b, h)
        }
        for (; g < a.length;) {
            c = a[g++];
            for (var k = g + 1; k < a.length && "number" !== typeof a[k];) k++;
            h = a[g++];
            k -= g;
            switch (k) {
                case 0:
                    d(b, c, h);
                    break;
                case 1:
                    (k = ke(a, g)) ? (g++, e(b, c, h, k)) : d(b, c, h, a[g++]);
                    break;
                case 2:
                    k = b;
                    var n = g++;
                    n = ke(a, n);
                    e(k, c, h, n, a[g++]);
                    break;
                case 3:
                    f(b, c, h, a[g++], a[g++], a[g++]);
                    break;
                case 4:
                    f(b, c, h, a[g++], a[g++], a[g++], a[g++]);
                    break;
                default:
                    throw Error("unexpected number of binary field arguments: " +
                        k);
            }
        }
        le in a && me in a && (a.length = 0);
        return b
    }
    var le = Symbol();

    function pe(a, b, c) {
        for (var d = c.length, e = 1 == d % 2, f = e ? 1 : 0; f < d; f += 2)(0, c[f + 1])(b, a, c[f]);
        he(a, b, e ? c[0] : void 0)
    }
    var ue = function(a, b) {
        var c = new be;
        pe(a, c, oe(b));
        ce(c, c.j.end());
        a = new Uint8Array(c.l);
        b = c.o;
        for (var d = b.length, e = 0, f = 0; f < d; f++) {
            var g = b[f];
            a.set(g, e);
            e += g.length
        }
        c.o = [a];
        return a
    };

    function ve(a, b) {
        return {
            Qh: a,
            yc: b
        }
    }

    function we(a, b, c) {
        b = B(b, c);
        null != b && ("string" === typeof b && Wd(b), null != b && (de(a, c, 0), "number" === typeof b ? (a = a.j, Nd(b), Yd(a, Ld, Md)) : (c = Wd(b), Yd(a.j, c.l, c.j))))
    }

    function xe(a, b, c) {
        b = B(b, c);
        null != b && null != b && (de(a, c, 0), $d(a.j, b))
    }
    var ye = ve(function(a, b, c) {
            if (1 !== a.j()) return !1;
            a = a.C();
            qd(b, c, a, 0);
            return !0
        }, function(a, b, c) {
            b = md(b, c);
            if (null != b) {
                de(a, c, 1);
                a = a.j;
                var d = +b;
                if (0 === d) Md = 0 < 1 / d ? 0 : 2147483648, Ld = 0;
                else if (isNaN(d)) Md = 2147483647, Ld = 4294967295;
                else if (d = (c = 0 > d ? -2147483648 : 0) ? -d : d, 1.7976931348623157E308 < d) Md = (c | 2146435072) >>> 0, Ld = 0;
                else if (2.2250738585072014E-308 > d) b = d / Math.pow(2, -1074), Md = (c | b / 4294967296) >>> 0, Ld = b >>> 0;
                else {
                    var e = d;
                    b = 0;
                    if (2 <= e)
                        for (; 2 <= e && 1023 > b;) b++, e /= 2;
                    else
                        for (; 1 > e && -1022 < b;) e *= 2, b--;
                    d *= Math.pow(2, -b);
                    Md = (c | b + 1023 << 20 | 1048576 * d & 1048575) >>> 0;
                    Ld = 4503599627370496 * d >>> 0
                }
                ae(a, Ld);
                ae(a, Md)
            }
        }),
        ze = ve(function(a, b, c) {
            if (5 !== a.j()) return !1;
            C(b, c, a.J());
            return !0
        }, function(a, b, c) {
            b = md(b, c);
            if (null != b) {
                de(a, c, 5);
                a = a.j;
                var d = +b;
                0 === d ? 0 < 1 / d ? Ld = Md = 0 : (Md = 0, Ld = 2147483648) : isNaN(d) ? (Md = 0, Ld = 2147483647) : (d = (c = 0 > d ? -2147483648 : 0) ? -d : d, 3.4028234663852886E38 < d ? (Md = 0, Ld = (c | 2139095040) >>> 0) : 1.1754943508222875E-38 > d ? (d = Math.round(d / Math.pow(2, -149)), Md = 0, Ld = (c | d) >>> 0) : (b = Math.floor(Math.log(d) / Math.LN2), d *= Math.pow(2, -b),
                    d = Math.round(8388608 * d), 16777216 <= d && ++b, Md = 0, Ld = (c | b + 127 << 23 | d & 8388607) >>> 0));
                ae(a, Ld)
            }
        }),
        Ae = ve(function(a, b, c) {
            if (0 !== a.j()) return !1;
            C(b, c, a.o());
            return !0
        }, we),
        Be = ve(function(a, b, c) {
            if (0 !== a.j()) return !1;
            a = a.o();
            qd(b, c, a, 0);
            return !0
        }, we),
        Ce = ve(function(a, b, c) {
            if (0 !== a.j()) return !1;
            C(b, c, a.M());
            return !0
        }, function(a, b, c) {
            b = B(b, c);
            null != b && ("string" === typeof b && Td(b), null != b && (de(a, c, 0), "number" === typeof b ? (a = a.j, Nd(b), Yd(a, Ld, Md)) : (c = Td(b), Yd(a.j, c.l, c.j))))
        }),
        De = ve(function(a, b, c) {
            if (0 !== a.j()) return !1;
            C(b, c, a.l());
            return !0
        }, xe),
        Ee = ve(function(a, b, c) {
            if (0 !== a.j()) return !1;
            a = a.l();
            qd(b, c, a, 0);
            return !0
        }, xe),
        Fe = ve(function(a, b, c) {
            if (0 !== a.j()) return !1;
            C(b, c, a.A());
            return !0
        }, function(a, b, c) {
            b = nd(b, c);
            null != b && (de(a, c, 0), a.j.j.push(b ? 1 : 0))
        }),
        Ge = ve(function(a, b, c) {
            if (2 !== a.j()) return !1;
            C(b, c, a.F());
            return !0
        }, function(a, b, c) {
            b = B(b, c);
            if (null != b) {
                var d = !1;
                d = void 0 === d ? !1 : d;
                if (bb) {
                    if (d && /(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])/.test(b)) throw Error("Found an unpaired surrogate");
                    b = (ab || (ab = new TextEncoder)).encode(b)
                } else {
                    for (var e = 0, f = new Uint8Array(3 * b.length), g = 0; g < b.length; g++) {
                        var h = b.charCodeAt(g);
                        if (128 > h) f[e++] = h;
                        else {
                            if (2048 > h) f[e++] = h >> 6 | 192;
                            else {
                                if (55296 <= h && 57343 >= h) {
                                    if (56319 >= h && g < b.length) {
                                        var k = b.charCodeAt(++g);
                                        if (56320 <= k && 57343 >= k) {
                                            h = 1024 * (h - 55296) + k - 56320 + 65536;
                                            f[e++] = h >> 18 | 240;
                                            f[e++] = h >> 12 & 63 | 128;
                                            f[e++] = h >> 6 & 63 | 128;
                                            f[e++] = h & 63 | 128;
                                            continue
                                        } else g--
                                    }
                                    if (d) throw Error("Found an unpaired surrogate");
                                    h = 65533
                                }
                                f[e++] = h >> 12 | 224;
                                f[e++] = h >> 6 & 63 | 128
                            }
                            f[e++] = h & 63 |
                                128
                        }
                    }
                    b = e === f.length ? f : f.subarray(0, e)
                }
                de(a, c, 2);
                Zd(a.j, b.length);
                ce(a, a.j.end());
                ce(a, b)
            }
        }),
        He = ve(function(a, b, c, d, e) {
            if (2 !== a.j()) return !1;
            var f = a.B;
            Zc(b);
            var g = B(b, c);
            d = sd(cd(g, d, !0));
            g !== d && jd(b, c, d);
            f.call(a, d, e);
            return !0
        }, function(a, b, c, d, e) {
            b = td(b, d, c);
            null != b && (c = ee(a, c), e(b, a), fe(a, c))
        }),
        Ie = ve(function(a, b, c, d, e) {
            if (2 !== a.j()) return !1;
            a.B(zd(b, c, d), e);
            return !0
        }, function(a, b, c, d, e) {
            b = vd(b, d, c);
            if (null != b)
                for (d = 0; d < b.length; d++) {
                    var f = ee(a, c);
                    e(b[d], a);
                    fe(a, f)
                }
        }),
        Je = ve(function(a, b, c) {
            if (0 !==
                a.j()) return !1;
            C(b, c, a.D());
            return !0
        }, function(a, b, c) {
            b = B(b, c);
            null != b && (b = parseInt(b, 10), de(a, c, 0), $d(a.j, b))
        });
    var Me = function(a, b) {
        this.j = a === Ke && b || "";
        this.l = Le
    };
    Me.prototype.Xa = !0;
    Me.prototype.Ka = function() {
        return this.j
    };
    var Ne = function(a) {
            return a instanceof Me && a.constructor === Me && a.l === Le ? a.j : "type_error:Const"
        },
        Le = {},
        Ke = {};
    var Oe = function() {},
        Pe = function(a) {
            var b = !1,
                c;
            return function() {
                b || (c = a(), b = !0);
                return c
            }
        },
        Qe = function(a) {
            var b = a;
            return function() {
                if (b) {
                    var c = b;
                    b = null;
                    c()
                }
            }
        },
        Re = function(a) {
            var b = 0,
                c = !1,
                d = [],
                e = function() {
                    b = 0;
                    c && (c = !1, f())
                },
                f = function() {
                    b = v.setTimeout(e, 1E3);
                    var g = d;
                    d = [];
                    a.apply(void 0, g)
                };
            return function(g) {
                d = arguments;
                b ? c = !0 : f()
            }
        };
    var Se = Pe(function() {
        var a = !1;
        try {
            var b = Object.defineProperty({}, "passive", {
                get: function() {
                    a = !0
                }
            });
            v.addEventListener("test", null, b)
        } catch (c) {}
        return a
    });

    function Te(a) {
        return a ? a.passive && Se() ? a : a.capture || !1 : !1
    }
    var Ue = function(a, b, c, d) {
            return a.addEventListener ? (a.addEventListener(b, c, Te(d)), !0) : !1
        },
        Ve = function(a, b, c) {
            a.removeEventListener && a.removeEventListener(b, c, Te())
        };

    function We(a) {
        a && "function" == typeof a.W && a.W()
    };
    var E = function() {
        this.M = this.M;
        this.J = this.J
    };
    E.prototype.M = !1;
    E.prototype.xa = function() {
        return this.M
    };
    E.prototype.W = function() {
        this.M || (this.M = !0, this.O())
    };
    var Ye = function(a, b) {
            Xe(a, Va(We, b))
        },
        Xe = function(a, b) {
            a.M ? b() : (a.J || (a.J = []), a.J.push(b))
        };
    E.prototype.O = function() {
        if (this.J)
            for (; this.J.length;) this.J.shift()()
    };
    var Ze = function() {
        var a;
        this.j = a = void 0 === a ? {} : a
    };
    Ze.prototype.reset = function() {
        this.j = {}
    };
    var $e = Zb || bc;

    function af(a, b, c) {
        for (var d in a) b.call(c, a[d], d, a)
    }

    function bf(a, b) {
        var c = {},
            d;
        for (d in a) b.call(void 0, a[d], d, a) && (c[d] = a[d]);
        return c
    }

    function cf(a) {
        var b = df,
            c;
        for (c in b)
            if (a.call(void 0, b[c], c, b)) return !0;
        return !1
    }

    function ff(a) {
        var b = gf,
            c;
        for (c in b)
            if (!a.call(void 0, b[c], c, b)) return !1;
        return !0
    }

    function hf(a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = a[d];
        return b
    }

    function jf(a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = d;
        return b
    }

    function kf(a, b) {
        var c = Ma(b),
            d = c ? b : arguments;
        for (c = c ? 0 : 1; c < d.length; c++) {
            if (null == a) return;
            a = a[d[c]]
        }
        return a
    }

    function lf(a, b) {
        return null !== a && b in a
    }

    function mf(a, b) {
        for (var c in a)
            if (a[c] == b) return !0;
        return !1
    }

    function nf(a) {
        var b = of ,
            c;
        for (c in b)
            if (a.call(void 0, b[c], c, b)) return c
    }

    function pf(a) {
        for (var b in a) return !1;
        return !0
    }

    function qf(a) {
        for (var b in a) delete a[b]
    }

    function rf(a, b, c) {
        return null !== a && b in a ? a[b] : c
    }
    var sf = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

    function tf(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) a[c] = d[c];
            for (var f = 0; f < sf.length; f++) c = sf[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    };
    var uf, vf = function() {
        if (void 0 === uf) {
            var a = null,
                b = v.trustedTypes;
            if (b && b.createPolicy) {
                try {
                    a = b.createPolicy("goog#html", {
                        createHTML: Ya,
                        createScript: Ya,
                        createScriptURL: Ya
                    })
                } catch (c) {
                    v.console && v.console.error(c.message)
                }
                uf = a
            } else uf = a
        }
        return uf
    };
    var xf = function(a, b) {
        this.j = b === wf ? a : ""
    };
    xf.prototype.toString = function() {
        return this.j + ""
    };
    xf.prototype.Xa = !0;
    xf.prototype.Ka = function() {
        return this.j.toString()
    };
    var yf = function(a) {
            return a instanceof xf && a.constructor === xf ? a.j : "type_error:TrustedResourceUrl"
        },
        wf = {},
        zf = function(a) {
            var b = vf();
            a = b ? b.createScriptURL(a) : a;
            return new xf(a, wf)
        };
    var Bf = function(a, b) {
        this.j = b === Af ? a : ""
    };
    Bf.prototype.toString = function() {
        return this.j.toString()
    };
    Bf.prototype.Xa = !0;
    Bf.prototype.Ka = function() {
        return this.j.toString()
    };
    var Cf = function(a) {
            return a instanceof Bf && a.constructor === Bf ? a.j : "type_error:SafeUrl"
        },
        Df = /^data:(.*);base64,[a-z0-9+\/]+=*$/i,
        Ef = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
        Af = {},
        Ff = function(a) {
            return new Bf(a, Af)
        },
        Gf = Ff("about:invalid#zClosurez");
    var Hf = {},
        If = function(a, b) {
            this.j = b === Hf ? a : "";
            this.Xa = !0
        };
    If.prototype.Ka = function() {
        return this.j
    };
    If.prototype.toString = function() {
        return this.j.toString()
    };
    var Jf = new If("", Hf);
    var Kf = {},
        Lf = function(a, b) {
            this.j = b === Kf ? a : "";
            this.Xa = !0
        };
    Lf.prototype.Ka = function() {
        return this.j.toString()
    };
    Lf.prototype.toString = function() {
        return this.j.toString()
    };
    var Mf = function(a) {
            return a instanceof Lf && a.constructor === Lf ? a.j : "type_error:SafeHtml"
        },
        Nf = function(a) {
            var b = vf();
            a = b ? b.createHTML(a) : a;
            return new Lf(a, Kf)
        };
    var Of = /^[\w+/_-]+[=]{0,2}$/,
        Pf = function(a, b) {
            b = (b || v).document;
            return b.querySelector ? (a = b.querySelector(a)) && (a = a.nonce || a.getAttribute("nonce")) && Of.test(a) ? a : "" : ""
        };
    var Qf = function(a, b) {
        this.x = void 0 !== a ? a : 0;
        this.y = void 0 !== b ? b : 0
    };
    Qf.prototype.ceil = function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    };
    Qf.prototype.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    Qf.prototype.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    Qf.prototype.scale = function(a, b) {
        this.x *= a;
        this.y *= "number" === typeof b ? b : a;
        return this
    };
    var F = function(a, b) {
        this.width = a;
        this.height = b
    };
    l = F.prototype;
    l.aspectRatio = function() {
        return this.width / this.height
    };
    l.isEmpty = function() {
        return !(this.width * this.height)
    };
    l.ceil = function() {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    l.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    l.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    l.scale = function(a, b) {
        this.width *= a;
        this.height *= "number" === typeof b ? b : a;
        return this
    };
    var Rf = function(a) {
            return decodeURIComponent(a.replace(/\+/g, " "))
        },
        Sf = function(a, b) {
            a.length > b && (a = a.substring(0, b - 3) + "...");
            return a
        },
        Tf = String.prototype.repeat ? function(a, b) {
            return a.repeat(b)
        } : function(a, b) {
            return Array(b + 1).join(a)
        },
        Uf = function(a) {
            return null == a ? "" : String(a)
        },
        Vf = 2147483648 * Math.random() | 0,
        Wf = function(a) {
            return String(a).replace(/\-([a-z])/g, function(b, c) {
                return c.toUpperCase()
            })
        },
        Xf = function() {
            return "googleAvInapp".replace(/([A-Z])/g, "-$1").toLowerCase()
        },
        Yf = function(a) {
            return a.replace(RegExp("(^|[\\s]+)([a-z])",
                "g"), function(b, c, d) {
                return c + d.toUpperCase()
            })
        },
        Zf = function(a) {
            isFinite(a) && (a = String(a));
            return "string" === typeof a ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN
        };
    var bg = function(a) {
            return a ? new $f(ag(a)) : $a || ($a = new $f)
        },
        cg = function(a) {
            var b = document;
            return "string" === typeof a ? b.getElementById(a) : a
        },
        eg = function(a, b) {
            af(b, function(c, d) {
                c && "object" == typeof c && c.Xa && (c = c.Ka());
                "style" == d ? a.style.cssText = c : "class" == d ? a.className = c : "for" == d ? a.htmlFor = c : dg.hasOwnProperty(d) ? a.setAttribute(dg[d], c) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, c) : a[d] = c
            })
        },
        dg = {
            cellpadding: "cellPadding",
            cellspacing: "cellSpacing",
            colspan: "colSpan",
            frameborder: "frameBorder",
            height: "height",
            maxlength: "maxLength",
            nonce: "nonce",
            role: "role",
            rowspan: "rowSpan",
            type: "type",
            usemap: "useMap",
            valign: "vAlign",
            width: "width"
        },
        gg = function(a) {
            a = a.document;
            a = fg(a) ? a.documentElement : a.body;
            return new F(a.clientWidth, a.clientHeight)
        },
        hg = function(a) {
            var b = a.scrollingElement ? a.scrollingElement : !bc && fg(a) ? a.documentElement : a.body || a.documentElement;
            a = a.parentWindow || a.defaultView;
            return Zb && a.pageYOffset != b.scrollTop ? new Qf(b.scrollLeft, b.scrollTop) : new Qf(a.pageXOffset || b.scrollLeft, a.pageYOffset ||
                b.scrollTop)
        },
        G = function(a) {
            return a ? a.parentWindow || a.defaultView : window
        },
        kg = function(a, b, c) {
            var d = arguments,
                e = document,
                f = d[1],
                g = ig(e, String(d[0]));
            f && ("string" === typeof f ? g.className = f : Array.isArray(f) ? g.className = f.join(" ") : eg(g, f));
            2 < d.length && jg(e, g, d, 2);
            return g
        },
        jg = function(a, b, c, d) {
            function e(h) {
                h && b.appendChild("string" === typeof h ? a.createTextNode(h) : h)
            }
            for (; d < c.length; d++) {
                var f = c[d];
                if (!Ma(f) || Na(f) && 0 < f.nodeType) e(f);
                else {
                    a: {
                        if (f && "number" == typeof f.length) {
                            if (Na(f)) {
                                var g = "function" ==
                                    typeof f.item || "string" == typeof f.item;
                                break a
                            }
                            if ("function" === typeof f) {
                                g = "function" == typeof f.item;
                                break a
                            }
                        }
                        g = !1
                    }
                    Bb(g ? Pb(f) : f, e)
                }
            }
        },
        ig = function(a, b) {
            b = String(b);
            "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
            return a.createElement(b)
        },
        fg = function(a) {
            return "CSS1Compat" == a.compatMode
        },
        lg = function(a) {
            a && a.parentNode && a.parentNode.removeChild(a)
        },
        mg = function(a) {
            var b;
            if ($e && (b = a.parentElement)) return b;
            b = a.parentNode;
            return Na(b) && 1 == b.nodeType ? b : null
        },
        ng = function(a, b) {
            if (!a || !b) return !1;
            if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
            if ("undefined" != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);
            for (; b && a != b;) b = b.parentNode;
            return b == a
        },
        ag = function(a) {
            return 9 == a.nodeType ? a : a.ownerDocument || a.document
        },
        og = function(a) {
            try {
                return a.contentWindow || (a.contentDocument ? G(a.contentDocument) : null)
            } catch (b) {}
            return null
        },
        pg = function(a, b) {
            a && (a = a.parentNode);
            for (var c = 0; a;) {
                if (b(a)) return a;
                a = a.parentNode;
                c++
            }
            return null
        },
        $f = function(a) {
            this.j = a ||
                v.document || document
        };
    $f.prototype.getElementsByTagName = function(a, b) {
        return (b || this.j).getElementsByTagName(String(a))
    };
    $f.prototype.appendChild = function(a, b) {
        a.appendChild(b)
    };
    $f.prototype.append = function(a, b) {
        jg(ag(a), a, arguments, 1)
    };
    $f.prototype.canHaveChildren = function(a) {
        if (1 != a.nodeType) return !1;
        switch (a.tagName) {
            case "APPLET":
            case "AREA":
            case "BASE":
            case "BR":
            case "COL":
            case "COMMAND":
            case "EMBED":
            case "FRAME":
            case "HR":
            case "IMG":
            case "INPUT":
            case "IFRAME":
            case "ISINDEX":
            case "KEYGEN":
            case "LINK":
            case "NOFRAMES":
            case "NOSCRIPT":
            case "META":
            case "OBJECT":
            case "PARAM":
            case "SCRIPT":
            case "SOURCE":
            case "STYLE":
            case "TRACK":
            case "WBR":
                return !1
        }
        return !0
    };
    var rg = function() {
            return !qg() && (z("iPod") || z("iPhone") || z("Android") || z("IEMobile"))
        },
        qg = function() {
            return z("iPad") || z("Android") && !z("Mobile") || z("Silk")
        };
    var sg = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$"),
        tg = function(a) {
            var b = a.match(sg);
            a = b[1];
            var c = b[3];
            b = b[4];
            var d = "";
            a && (d += a + ":");
            c && (d = d + "//" + c, b && (d += ":" + b));
            return d
        },
        ug = function(a, b) {
            if (a) {
                a = a.split("&");
                for (var c = 0; c < a.length; c++) {
                    var d = a[c].indexOf("="),
                        e = null;
                    if (0 <= d) {
                        var f = a[c].substring(0, d);
                        e = a[c].substring(d + 1)
                    } else f = a[c];
                    b(f, e ? Rf(e) : "")
                }
            }
        },
        vg = /#|$/,
        wg = function(a, b) {
            var c = a.search(vg);
            a: {
                var d =
                    0;
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
            return Rf(a.slice(d, -1 !== e ? e : 0))
        };
    var xg = function(a) {
        var b = [],
            c = [],
            d = {},
            e = function(f, g) {
                var h = g + "  ";
                try {
                    if (void 0 === f) b.push("undefined");
                    else if (null === f) b.push("NULL");
                    else if ("string" === typeof f) b.push('"' + f.replace(/\n/g, "\n" + g) + '"');
                    else if ("function" === typeof f) b.push(String(f).replace(/\n/g, "\n" + g));
                    else if (Na(f)) {
                        f[Oa] || c.push(f);
                        var k = Qa(f);
                        if (d[k]) b.push("*** reference loop detected (id=" + k + ") ***");
                        else {
                            d[k] = !0;
                            b.push("{");
                            for (var n in f) "function" !== typeof f[n] && (b.push("\n"), b.push(h), b.push(n + " = "), e(f[n], h));
                            b.push("\n" +
                                g + "}");
                            delete d[k]
                        }
                    } else b.push(f)
                } catch (m) {
                    b.push("*** " + m + " ***")
                }
            };
        e(a, "");
        for (a = 0; a < c.length; a++) Ra(c[a]);
        return b.join("")
    };
    /*

     SPDX-License-Identifier: Apache-2.0
    */
    var yg;
    try {
        new URL("s://g"), yg = !0
    } catch (a) {
        yg = !1
    }
    var zg = yg;
    var Ag = {};

    function Bg(a, b) {
        if (void 0 !== a.tagName) {
            if ("script" === a.tagName.toLowerCase()) throw Error("Use setTextContent with a SafeScript.");
            if ("style" === a.tagName.toLowerCase()) throw Error("Use setTextContent with a SafeStyleSheet.");
        }
        a.innerHTML = Mf(b)
    };

    function Cg(a) {
        var b, c, d = null == (c = (b = (a.ownerDocument && a.ownerDocument.defaultView || window).document).querySelector) ? void 0 : c.call(b, "script[nonce]");
        (b = d ? d.nonce || d.getAttribute("nonce") || "" : "") && a.setAttribute("nonce", b)
    };

    function Dg(a, b) {
        a.write(Mf(b))
    };
    var Eg = function(a) {
        this.isValid = a
    };

    function Fg(a) {
        return new Eg(function(b) {
            return b.substr(0, a.length + 1).toLowerCase() === a + ":"
        })
    }
    var Gg = [Fg("data"), Fg("http"), Fg("https"), Fg("mailto"), Fg("ftp"), new Eg(function(a) {
        return /^[^:]*([/?#]|$)/.test(a)
    })];
    var Hg = function(a) {
            try {
                return !!a && null != a.location.href && Vb(a, "foo")
            } catch (b) {
                return !1
            }
        },
        Jg = function(a) {
            var b = void 0 === b ? !1 : b;
            var c = void 0 === c ? v : c;
            for (var d = 0; c && 40 > d++ && (!b && !Hg(c) || !a(c));) c = Ig(c)
        },
        Kg = function() {
            var a = window;
            Jg(function(b) {
                a = b;
                return !1
            });
            return a
        },
        Ig = function(a) {
            try {
                var b = a.parent;
                if (b && b != a) return b
            } catch (c) {}
            return null
        },
        Lg = function(a, b) {
            if (a)
                for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b(a[c], c, a)
        };

    function Mg(a) {
        var b, c;
        return null != (c = null == (b = /https?:\/\/[^\/]+/.exec(a)) ? void 0 : b[0]) ? c : ""
    }
    var Ng = function() {
            var a = v;
            try {
                for (var b = null; b != a; b = a, a = a.parent) switch (a.location.protocol) {
                    case "https:":
                        return !0;
                    case "file:":
                        return !0;
                    case "http:":
                        return !1
                }
            } catch (c) {}
            return !0
        },
        Og = function(a, b) {
            try {
                return !(!a.frames || !a.frames[b])
            } catch (c) {
                return !1
            }
        },
        Pg = function(a, b) {
            for (var c = 0; 50 > c; ++c) {
                if (Og(a, b)) return a;
                if (!(a = Ig(a))) break
            }
            return null
        };

    function Qg(a, b) {
        if (a.length && b.head) {
            a = r(a);
            for (var c = a.next(); !c.done; c = a.next())
                if ((c = c.value) && b.head) {
                    var d = Rg("META");
                    b.head.appendChild(d);
                    d.httpEquiv = "origin-trial";
                    d.content = c
                }
        }
    }
    var Sg = function() {
            var a = window;
            if ("number" !== typeof a.goog_pvsid) try {
                Object.defineProperty(a, "goog_pvsid", {
                    value: Math.floor(Math.random() * Math.pow(2, 52)),
                    configurable: !1
                })
            } catch (b) {}
            return Number(a.goog_pvsid) || -1
        },
        Rg = function(a, b) {
            b = void 0 === b ? document : b;
            return b.createElement(String(a).toLowerCase())
        },
        Tg = function(a) {
            for (var b = a; a && a != a.parent;) a = a.parent, Hg(a) && (b = a);
            return b
        };
    var H = function(a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    H.prototype.getWidth = function() {
        return this.right - this.left
    };
    H.prototype.getHeight = function() {
        return this.bottom - this.top
    };
    var Ug = function(a) {
        return new H(a.top, a.right, a.bottom, a.left)
    };
    H.prototype.expand = function(a, b, c, d) {
        Na(a) ? (this.top -= a.top, this.right += a.right, this.bottom += a.bottom, this.left -= a.left) : (this.top -= a, this.right += Number(b), this.bottom += Number(c), this.left -= Number(d));
        return this
    };
    H.prototype.ceil = function() {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this
    };
    H.prototype.floor = function() {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    };
    H.prototype.round = function() {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    };
    var Vg = function(a, b, c) {
        b instanceof Qf ? (a.left += b.x, a.right += b.x, a.top += b.y, a.bottom += b.y) : (a.left += b, a.right += b, "number" === typeof c && (a.top += c, a.bottom += c));
        return a
    };
    H.prototype.scale = function(a, b) {
        b = "number" === typeof b ? b : a;
        this.left *= a;
        this.right *= a;
        this.top *= b;
        this.bottom *= b;
        return this
    };
    var Wg = function(a, b, c, d) {
            this.left = a;
            this.top = b;
            this.width = c;
            this.height = d
        },
        Xg = function(a) {
            return new H(a.top, a.left + a.width, a.top + a.height, a.left)
        };
    l = Wg.prototype;
    l.distance = function(a) {
        var b = a.x < this.left ? this.left - a.x : Math.max(a.x - (this.left + this.width), 0);
        a = a.y < this.top ? this.top - a.y : Math.max(a.y - (this.top + this.height), 0);
        return Math.sqrt(b * b + a * a)
    };
    l.ceil = function() {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    l.floor = function() {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    l.round = function() {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    l.scale = function(a, b) {
        b = "number" === typeof b ? b : a;
        this.left *= a;
        this.width *= a;
        this.top *= b;
        this.height *= b;
        return this
    };

    function Yg(a) {
        a = void 0 === a ? v : a;
        var b = a.context || a.AMP_CONTEXT_DATA;
        if (!b) try {
            b = a.parent.context || a.parent.AMP_CONTEXT_DATA
        } catch (e) {}
        var c, d;
        return (null == (c = b) ? 0 : c.pageViewId) && (null == (d = b) ? 0 : d.canonicalUrl) ? b : null
    };
    var Zg = function() {
            this.S = {}
        },
        $g = function() {
            var a = Yg(window);
            if (a) {
                if (a) {
                    var b = a.pageViewId;
                    a = a.clientId;
                    "string" === typeof a && (b += a.replace(/\D/g, "").substr(0, 6))
                } else b = null;
                return +b
            }
            b = Tg(window);
            (a = b.google_global_correlator) || (b.google_global_correlator = a = 1 + Math.floor(Math.random() * Math.pow(2, 43)));
            return a
        },
        bh = function(a, b) {
            var c = ah[7] || "google_ps_7";
            a = a.S;
            var d = a[c];
            return void 0 === d ? (a[c] = b(), a[c]) : d
        },
        ch = function(a) {
            var b = $g();
            return bh(a, function() {
                return b
            })
        },
        eh = function() {
            if (dh) var a = dh;
            else {
                a =
                    ((a = void 0 === a ? Yg() : a) ? Hg(a.master) ? a.master : null : null) || window;
                var b = a.google_persistent_state_async;
                a = null != b && "object" == typeof b && null != b.S && "object" == typeof b.S ? dh = b : a.google_persistent_state_async = dh = new Zg
            }
            return ch(a)
        },
        dh = null,
        fh = {},
        ah = (fh[8] = "google_prev_ad_formats_by_region", fh[9] = "google_prev_ad_slotnames_by_region", fh);
    var hh = function(a, b, c, d) {
        gh(a, b, void 0 === c ? null : c, void 0 === d ? !1 : d)
    };

    function gh(a, b, c, d) {
        a.google_image_requests || (a.google_image_requests = []);
        var e = Rg("IMG", a.document);
        if (c || d) {
            var f = function(g) {
                c && c(g);
                d && Lb(a.google_image_requests, e);
                Ve(e, "load", f);
                Ve(e, "error", f)
            };
            Ue(e, "load", f);
            Ue(e, "error", f)
        }
        e.src = b;
        a.google_image_requests.push(e)
    }
    var jh = function(a, b) {
            var c = void 0 === c ? !1 : c;
            var d = "https://pagead2.googlesyndication.com/pagead/gen_204?id=" + b;
            Lg(a, function(e, f) {
                e && (d += "&" + f + "=" + encodeURIComponent(e))
            });
            ih(d, c)
        },
        ih = function(a, b) {
            var c = window;
            b = void 0 === b ? !1 : b;
            c.fetch ? c.fetch(a, {
                keepalive: !0,
                credentials: "include",
                redirect: "follow",
                method: "get",
                mode: "no-cors"
            }) : hh(c, a, void 0, b)
        };
    var kh = function(a, b, c) {
            c = void 0 === c ? {} : c;
            this.error = a;
            this.context = b.context;
            this.msg = b.message || "";
            this.id = b.id || "jserror";
            this.meta = c
        },
        lh = function(a) {
            return !!(a.error && a.meta && a.id)
        };
    var mh = function(a, b, c, d) {
        this.j = a;
        this.o = b;
        this.l = c;
        this.B = d
    };
    var nh = new mh(new Set("ARTICLE SECTION NAV ASIDE H1 H2 H3 H4 H5 H6 HEADER FOOTER ADDRESS P HR PRE BLOCKQUOTE OL UL LH LI DL DT DD FIGURE FIGCAPTION MAIN DIV EM STRONG SMALL S CITE Q DFN ABBR RUBY RB RT RTC RP DATA TIME CODE VAR SAMP KBD SUB SUP I B U MARK BDI BDO SPAN BR WBR INS DEL PICTURE PARAM TRACK MAP TABLE CAPTION COLGROUP COL TBODY THEAD TFOOT TR TD TH SELECT DATALIST OPTGROUP OPTION OUTPUT PROGRESS METER FIELDSET LEGEND DETAILS SUMMARY MENU DIALOG SLOT CANVAS FONT CENTER".split(" ")), new Map([
            ["A",
                new Map([
                    ["href", {
                        policyAction: 2
                    }]
                ])
            ],
            ["AREA", new Map([
                ["href", {
                    policyAction: 2
                }]
            ])],
            ["LINK", new Map([
                ["href", {
                    policyAction: 2,
                    conditions: new Map([
                        ["rel", new Set("alternate author bookmark canonical cite help icon license next prefetch dns-prefetch prerender preconnect preload prev search subresource".split(" "))]
                    ])
                }]
            ])],
            ["SOURCE", new Map([
                ["src", {
                    policyAction: 2
                }]
            ])],
            ["IMG", new Map([
                ["src", {
                    policyAction: 2
                }]
            ])],
            ["VIDEO", new Map([
                ["src", {
                    policyAction: 2
                }]
            ])],
            ["AUDIO", new Map([
                ["src", {
                    policyAction: 2
                }]
            ])]
        ]),
        new Set("title aria-atomic aria-autocomplete aria-busy aria-checked aria-current aria-disabled aria-dropeffect aria-expanded aria-haspopup aria-hidden aria-invalid aria-label aria-level aria-live aria-multiline aria-multiselectable aria-orientation aria-posinset aria-pressed aria-readonly aria-relevant aria-required aria-selected aria-setsize aria-sort aria-valuemax aria-valuemin aria-valuenow aria-valuetext alt align autocapitalize autocomplete autocorrect autofocus autoplay bgcolor border cellpadding cellspacing checked color cols colspan controls datetime disabled download draggable enctype face formenctype frameborder height hreflang hidden ismap label lang loop max maxlength media minlength min multiple muted nonce open placeholder preload rel required reversed role rows rowspan selected shape size sizes slot span spellcheck start step summary translate type valign value width wrap itemscope itemtype itemid itemprop itemref".split(" ")),
        new Map([
            ["dir", {
                policyAction: 3,
                conditions: new Map([
                    ["dir", new Set(["auto", "ltr", "rtl"])]
                ])
            }],
            ["async", {
                policyAction: 3,
                conditions: new Map([
                    ["async", new Set(["async"])]
                ])
            }],
            ["cite", {
                policyAction: 2
            }],
            ["loading", {
                policyAction: 3,
                conditions: new Map([
                    ["loading", new Set(["eager", "lazy"])]
                ])
            }],
            ["poster", {
                policyAction: 2
            }],
            ["target", {
                policyAction: 3,
                conditions: new Map([
                    ["target", new Set(["_self", "_blank"])]
                ])
            }]
        ]));
    var oh = function() {
        this.changes = [];
        if (Ag !== Ag) throw Error("Bad secret");
    };
    new oh;
    var ph = function() {
        this.l = !1;
        this.j = nh
    };
    ph.prototype.build = function() {
        if (this.l) throw Error("this sanitizer has already called build");
        this.l = !0;
        return new oh
    };

    function I(a) {
        var b = Ga.apply(1, arguments);
        if (0 === b.length) return zf(a[0]);
        for (var c = [a[0]], d = 0; d < b.length; d++) c.push(encodeURIComponent(b[d])), c.push(a[d + 1]);
        return zf(c.join(""))
    }

    function qh(a, b) {
        var c = yf(a).toString();
        if (/#/.test(c)) throw Error("");
        var d = /\?/.test(c) ? "&" : "?";
        b.forEach(function(e, f) {
            e = e instanceof Array ? e : [e];
            for (var g = 0; g < e.length; g++) {
                var h = e[g];
                null !== h && void 0 !== h && (c += d + encodeURIComponent(f) + "=" + encodeURIComponent(String(h)), d = "&")
            }
        });
        return zf(c)
    };
    var rh = q(["https://pagead2.googlesyndication.com/pagead/js/err_rep.js"]),
        sh = function() {
            var a = void 0 === a ? "jserror" : a;
            var b = void 0 === b ? .01 : b;
            var c = void 0 === c ? I(rh) : c;
            this.l = a;
            this.o = !1;
            this.j = null;
            this.B = !1;
            this.D = Math.random();
            this.A = b;
            this.C = this.Oa;
            this.J = c
        };
    l = sh.prototype;
    l.gd = function(a) {
        this.l = a
    };
    l.vc = function(a) {
        this.j = a
    };
    l.hd = function(a) {
        this.o = a
    };
    l.jd = function(a) {
        this.B = a
    };
    l.Oa = function(a, b, c, d, e) {
        c = void 0 === c ? this.A : c;
        e = void 0 === e ? this.l : e;
        if ((this.B ? this.D : Math.random()) > c) return this.o;
        lh(b) || (b = new kh(b, {
            context: a,
            id: e
        }));
        if (d || this.j) b.meta = {}, this.j && this.j(b.meta), d && d(b.meta);
        v.google_js_errors = v.google_js_errors || [];
        v.google_js_errors.push(b);
        v.error_rep_loaded || (b = v.document, a = Rg("SCRIPT", b), a.src = yf(this.J), Cg(a), (b = b.getElementsByTagName("script")[0]) && b.parentNode && b.parentNode.insertBefore(a, b), v.error_rep_loaded = !0);
        return this.o
    };
    l.jb = function(a, b, c) {
        try {
            return b()
        } catch (d) {
            if (!this.C(a, d, this.A, c, this.l)) throw d;
        }
    };
    l.cd = function(a, b, c, d) {
        var e = this;
        return function() {
            var f = Ga.apply(0, arguments);
            return e.jb(a, function() {
                return b.apply(c, f)
            }, d)
        }
    };
    var th = function(a) {
            return a.prerendering ? 3 : {
                visible: 1,
                hidden: 2,
                prerender: 3,
                preview: 4,
                unloaded: 5
            }[a.visibilityState || a.webkitVisibilityState || a.mozVisibilityState || ""] || 0
        },
        uh = function(a) {
            var b;
            a.visibilityState ? b = "visibilitychange" : a.mozVisibilityState ? b = "mozvisibilitychange" : a.webkitVisibilityState && (b = "webkitvisibilitychange");
            return b
        };
    var vh = null;

    function wh() {
        var a = void 0 === a ? v : a;
        return (a = a.performance) && a.now && a.timing ? Math.floor(a.now() + a.timing.navigationStart) : Wa()
    }

    function xh() {
        var a = void 0 === a ? v : a;
        return (a = a.performance) && a.now ? a.now() : null
    }

    function yh(a, b) {
        b = void 0 === b ? v : b;
        var c, d;
        return (null == (c = b.performance) ? void 0 : null == (d = c.timing) ? void 0 : d[a]) || 0
    }

    function zh() {
        var a = void 0 === a ? v : a;
        var b = Math.min(yh("domLoading", a) || Infinity, yh("domInteractive", a) || Infinity);
        return Infinity === b ? Math.max(yh("responseEnd", a), yh("navigationStart", a)) : b
    };
    var Ah = function(a, b, c, d) {
        this.label = a;
        this.type = b;
        this.value = c;
        this.duration = void 0 === d ? 0 : d;
        this.uniqueId = Math.random();
        this.taskId = this.slotId = void 0
    };
    var Bh = v.performance,
        Ch = !!(Bh && Bh.mark && Bh.measure && Bh.clearMarks),
        Dh = Pe(function() {
            var a;
            if (a = Ch) {
                var b;
                if (null === vh) {
                    vh = "";
                    try {
                        a = "";
                        try {
                            a = v.top.location.hash
                        } catch (c) {
                            a = v.location.hash
                        }
                        a && (vh = (b = a.match(/\bdeid=([\d,]+)/)) ? b[1] : "")
                    } catch (c) {}
                }
                b = vh;
                a = !!b.indexOf && 0 <= b.indexOf("1337")
            }
            return a
        }),
        Eh = function(a, b) {
            this.events = [];
            this.j = b || v;
            var c = null;
            b && (b.google_js_reporting_queue = b.google_js_reporting_queue || [], this.events = b.google_js_reporting_queue, c = b.google_measure_js_timing);
            this.o = Dh() || (null !=
                c ? c : Math.random() < a)
        };
    Eh.prototype.D = function() {
        this.o = !1;
        this.events != this.j.google_js_reporting_queue && (Dh() && Bb(this.events, Fh), this.events.length = 0)
    };
    Eh.prototype.J = function(a) {
        !this.o || 2048 < this.events.length || this.events.push(a)
    };
    var Fh = function(a) {
        a && Bh && Dh() && (Bh.clearMarks("goog_" + a.label + "_" + a.uniqueId + "_start"), Bh.clearMarks("goog_" + a.label + "_" + a.uniqueId + "_end"))
    };
    Eh.prototype.start = function(a, b) {
        if (!this.o) return null;
        a = new Ah(a, b, xh() || wh());
        b = "goog_" + a.label + "_" + a.uniqueId + "_start";
        Bh && Dh() && Bh.mark(b);
        return a
    };
    Eh.prototype.end = function(a) {
        if (this.o && "number" === typeof a.value) {
            a.duration = (xh() || wh()) - a.value;
            var b = "goog_" + a.label + "_" + a.uniqueId + "_end";
            Bh && Dh() && Bh.mark(b);
            this.J(a)
        }
    };
    var Gh = function(a) {
        a = a._google_rum_ns_ = a._google_rum_ns_ || {};
        return a.pq = a.pq || []
    };
    var Hh = function(a, b, c) {
            Lg(b, function(d, e) {
                var f = c && c[e];
                !d && 0 !== d || f || (a += "&" + encodeURIComponent(e) + "=" + encodeURIComponent(String(d)), c && (c[e] = !0))
            });
            return a
        },
        Oh = function(a, b, c, d, e, f, g, h) {
            f = void 0 === f ? Infinity : f;
            g = void 0 === g ? !1 : g;
            Eh.call(this, a, h);
            var k = this;
            this.M = 0;
            this.L = f;
            this.Z = b;
            this.K = c;
            this.Y = d;
            this.ca = e;
            a = this.j.navigator;
            this.X = !("csi.gstatic.com" !== this.K || !a || !a.sendBeacon);
            this.A = {};
            this.I = {};
            this.j.performance && this.j.performance.now || Ih(this, "dat", 1);
            a && a.deviceMemory && Ih(this, "dmc",
                a.deviceMemory);
            this.j === this.j.top && Ih(this, "top", 1);
            this.U = !g;
            this.N = function() {
                k.j.setTimeout(function() {
                    return Jh(k)
                }, 1100)
            };
            this.ba = [];
            this.P = function() {
                Ih(k, "uet", 2);
                for (var m = r(k.ba), x = m.next(); !x.done; x = m.next()) {
                    x = x.value;
                    try {
                        x()
                    } catch (y) {}
                }
                m = k.j;
                var u = void 0 === u ? {} : u;
                "function" === typeof window.CustomEvent ? x = new CustomEvent("rum_blp", u) : (x = document.createEvent("CustomEvent"), x.initCustomEvent("rum_blp", !!u.bubbles, !!u.cancelable, u.detail));
                m.dispatchEvent(x);
                Jh(k);
                null != k.A.uet && (k.B -= 3 +
                    k.A.uet.length + 2, delete k.A.uet)
            };
            this.qa = Re(function() {
                Jh(k)
            });
            this.ra = function() {
                var m = k.j.document;
                (null != m.hidden ? m.hidden : null != m.mozHidden ? m.mozHidden : null != m.webkitHidden && m.webkitHidden) && k.qa()
            };
            this.F = this.j.setTimeout(function() {
                return Jh(k)
            }, 5E3);
            this.C = {};
            this.B = b.length + c.length + d.length + e.length + 3;
            this.l = 0;
            Bb(this.events, function(m) {
                return Kh(k, m)
            });
            this.G = [];
            b = Gh(this.j);
            var n = function(m) {
                var x = m[0];
                m = m[1];
                var u = x.length + m.length + 2;
                8E3 < k.B + k.l + u && Jh(k);
                k.G.push([x, m]);
                k.l += u;
                Lh(k);
                return 0
            };
            Bb(b, function(m) {
                return n(m)
            });
            b.length = 0;
            b.push = n;
            Mh(this);
            Nh(this)
        };
    t(Oh, Eh);
    var Nh = function(a) {
            "complete" === a.j.document.readyState ? a.j.setTimeout(function() {
                return Jh(a)
            }, 0) : Ue(a.j, "load", a.N);
            var b = uh(a.j.document);
            "undefined" !== typeof b && Ue(a.j, b, a.ra);
            Ue(a.j, "pagehide", a.P)
        },
        Ih = function(a, b, c) {
            c = String(c);
            a.B = null != a.A[b] ? a.B + (c.length - a.A[b].length) : a.B + (b.length + c.length + 2);
            a.A[b] = c
        },
        Rh = function(a, b, c, d, e) {
            e = void 0 === e ? "" : e;
            var f = Ph(a, b, c, d, e);
            8E3 < a.B + a.l + f && (Jh(a), f = b.length + c.length + 2);
            Qh(a, b, c, d, e);
            a.l += f;
            Lh(a)
        },
        Ph = function(a, b, c, d, e) {
            return null == a.C[b] ? b.length +
                c.length + 2 : d ? c.length + (void 0 === e ? "" : e).length : c.length - a.C[b].length
        },
        Qh = function(a, b, c, d, e) {
            a.C[b] = d && null != a.C[b] ? a.C[b] + ("" + (void 0 === e ? "" : e) + c) : c
        },
        Lh = function(a) {
            6E3 <= a.B + a.l && Jh(a)
        },
        Jh = function(a) {
            if (a.o && a.U) {
                try {
                    if (a.l) {
                        var b = a.C;
                        a.M++;
                        var c = Sh(a, b);
                        b = !1;
                        try {
                            b = !!(a.X && a.j.navigator && a.j.navigator.sendBeacon(c, null))
                        } catch (d) {
                            a.X = !1
                        }
                        b || hh(a.j, c);
                        Mh(a);
                        a.M === a.L && a.D()
                    }
                } catch (d) {
                    (new sh).Oa(358, d)
                }
                a.C = {};
                a.l = 0;
                a.events.length = 0;
                a.j.clearTimeout(a.F);
                a.F = 0
            }
        },
        Sh = function(a, b) {
            var c = a.Z + "//" + a.K +
                a.Y + a.ca,
                d = {};
            c = Hh(c, a.A, d);
            c = Hh(c, b, d);
            b = a.j;
            b.google_timing_params && (c = Hh(c, b.google_timing_params, d), b.google_timing_params = void 0);
            Bb(a.G, function(e) {
                var f = r(e);
                e = f.next().value;
                f = f.next().value;
                var g = {};
                c = Hh(c, (g[e] = f, g))
            });
            a.G.length = 0;
            return c
        },
        Mh = function(a) {
            Ih(a, "puid", (a.M + 1).toString(36) + "~" + Wa().toString(36))
        },
        Kh = function(a, b) {
            var c = "met." + b.type,
                d = "number" === typeof b.value ? Math.round(b.value).toString(36) : b.value,
                e = Math.round(b.duration);
            b = "" + b.label + (null != b.slotId ? "_" + b.slotId : "") +
                ("." + d) + (0 < e ? "_" + e.toString(36) : "") + (null != b.taskId ? "__" + Math.round(b.taskId).toString(36) : "");
            Rh(a, c, b, !0, "~")
        };
    Oh.prototype.J = function(a) {
        this.o && this.M < this.L && (Eh.prototype.J.call(this, a), Kh(this, a))
    };
    Oh.prototype.D = function() {
        Eh.prototype.D.call(this);
        this.j.clearTimeout(this.F);
        this.l = this.F = 0;
        this.C = {};
        qf(this.I);
        qf(this.A);
        Ve(this.j, "load", this.N);
        Ve(this.j, "pagehide", this.P)
    };
    var J = function(a) {
        var b = "gb";
        if (a.gb && a.hasOwnProperty(b)) return a.gb;
        b = new a;
        return a.gb = b
    };
    var K = function() {
        this.j = new Oh(1, "https:", "csi.gstatic.com", "/csi?v=2&s=", "ima", void 0, !0);
        var a = eh();
        null != a && Ih(this.j, "c", a);
        a = parseInt(this.j.A.c, 10) / 2;
        null != a && Ih(this.j, "slotId", a)
    };
    K.prototype.isLoggingEnabled = function() {
        return this.j.o
    };
    var L = function(a, b, c) {
            if (null != c) {
                a = a.j;
                var d = b + "=" + c;
                a.I[d] || (Rh(a, b, c, !1), 1E3 > d.length && (a.I[d] = !0))
            }
        },
        Th = function(a, b) {
            for (var c in b) b[c] = "object" === typeof b[c] ? encodeURIComponent(JSON.stringify(b[c])) : encodeURIComponent(String(b[c]));
            a = a.j;
            c = !1;
            var d = 0,
                e;
            for (e in b) null != a.C[e] && (c = !0), d += Ph(a, e, b[e], !1);
            (8E3 < a.B + a.l + d || c) && Jh(a);
            for (var f in b) Qh(a, f, b[f], !1);
            a.l += d;
            Lh(a)
        },
        Uh = function(a) {
            var b = K.j().j,
                c = wh() - 0;
            b.o && b.J(new Ah(a, 4, c, 0))
        };
    K.j = function() {
        return J(K)
    };
    var Vh = function(a) {
            return /^\s*$/.test(a) ? !1 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))
        },
        Wh = function(a) {
            try {
                return v.JSON.parse(a)
            } catch (b) {}
            a = String(a);
            if (Vh(a)) try {
                return eval("(" + a + ")")
            } catch (b) {}
            throw Error("Invalid JSON string: " + a);
        },
        Xh = function(a) {
            this.j = a
        },
        Zh = function(a, b) {
            var c = [];
            Yh(a, b, c);
            return c.join("")
        },
        Yh = function(a, b, c) {
            if (null == b) c.push("null");
            else {
                if ("object" == typeof b) {
                    if (Array.isArray(b)) {
                        var d = b;
                        b = d.length;
                        c.push("[");
                        for (var e = "", f = 0; f < b; f++) c.push(e), e = d[f], Yh(a, a.j ? a.j.call(d, String(f), e) : e, c), e = ",";
                        c.push("]");
                        return
                    }
                    if (b instanceof String || b instanceof Number || b instanceof Boolean) b = b.valueOf();
                    else {
                        c.push("{");
                        f = "";
                        for (d in b) Object.prototype.hasOwnProperty.call(b, d) && (e = b[d], "function" != typeof e && (c.push(f), $h(d, c), c.push(":"), Yh(a, a.j ? a.j.call(b, d,
                            e) : e, c), f = ","));
                        c.push("}");
                        return
                    }
                }
                switch (typeof b) {
                    case "string":
                        $h(b, c);
                        break;
                    case "number":
                        c.push(isFinite(b) && !isNaN(b) ? String(b) : "null");
                        break;
                    case "boolean":
                        c.push(String(b));
                        break;
                    case "function":
                        c.push("null");
                        break;
                    default:
                        throw Error("Unknown type: " + typeof b);
                }
            }
        },
        ai = {
            '"': '\\"',
            "\\": "\\\\",
            "/": "\\/",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            "\v": "\\u000b"
        },
        bi = /\uffff/.test("\uffff") ? /[\\"\x00-\x1f\x7f-\uffff]/g : /[\\"\x00-\x1f\x7f-\xff]/g,
        $h = function(a, b) {
            b.push('"', a.replace(bi,
                function(c) {
                    var d = ai[c];
                    d || (d = "\\u" + (c.charCodeAt(0) | 65536).toString(16).slice(1), ai[c] = d);
                    return d
                }), '"')
        };
    var ci = function() {
            this.o = null;
            this.j = "missing-id";
            this.l = !1
        },
        di = function(a) {
            var b = null;
            try {
                b = document.getElementsByClassName("lima-exp-data")
            } catch (c) {
                return a.onError("missing-element", a.j), null
            }
            if (1 < b.length) return a.onError("multiple-elements", a.j), null;
            b = b[0];
            return b ? b.innerHTML : (a.onError("missing-element", a.j), null)
        },
        fi = function() {
            var a = ei,
                b = di(a);
            if (null !== b)
                if (Vh(b)) {
                    var c = JSON.parse(b);
                    b = c.experimentIds;
                    var d = c.binaryIdentifier;
                    c = c.adEventId;
                    var e = "string" === typeof d;
                    if ("string" == typeof c) {
                        var f =
                            K.j();
                        null != c && Ih(f.j, "qqid", c)
                    }
                    e && (a.j = d);
                    if ("string" !== typeof b) a.onError("missing-flags", a.j);
                    else {
                        if (!e) a.onError("missing-binary-id", a.j);
                        a.o = b
                    }
                } else a.onError("invalid-json", a.j)
        };
    ci.prototype.reset = function() {
        this.o = null;
        this.j = "missing-id"
    };
    var hi = function(a, b, c, d, e) {
        this.id = a;
        this.H = b;
        this.B = c;
        this.j = !1;
        this.o = d;
        this.l = e;
        this.B && gi(this)
    };
    hi.prototype.isSelected = function() {
        return this.j || this.B
    };
    var gi = function(a) {
            if (a.o && a.l) {
                var b = a.o;
                b && Object.assign(a.l.j, b)
            }
        },
        ii = function() {
            this.j = []
        },
        ji = function() {
            this.j = new Map;
            this.l = !1;
            this.A = new ii;
            this.C = new hi(0, 0, !1);
            this.o = [this.A];
            this.B = new Ze
        },
        M = function(a) {
            var b = ki;
            if (b.l || b.j.has(a.id) || null == a.H && null == a.control || 0 == a.condition) return b.C;
            var c = b.A;
            if (null != a.control)
                for (var d = r(b.o), e = d.next(); !e.done; e = d.next()) {
                    if (e = e.value, e.j.includes(a.control)) {
                        c = e;
                        break
                    }
                } else null != a.layer && (c = a.layer);
            d = 0;
            null != a.control ? d = a.control.H : null != a.H &&
                (d = a.H);
            a = new hi(a.id, d, !!a.Oh, a.flags, b.B);
            c.j.push(a);
            b.o.includes(c) || b.o.push(c);
            b.j.set(a.id, a);
            return a
        },
        li = function() {
            var a = ki;
            return [].concat(ha(a.j.keys())).filter(function(b) {
                return this.j.get(b).isSelected()
            }, a)
        },
        mi = function(a) {
            var b = ki;
            b.l || (a.j(b.o, b.j), b.l = !0)
        };
    ji.prototype.reset = function() {
        for (var a = r(this.j), b = a.next(); !b.done; b = a.next()) b = r(b.value), b.next(), b.next().value.j = !1;
        this.l = !1;
        this.B.reset()
    };
    var ki = new ji,
        oi = function() {
            return ni.j.filter(function(a) {
                return a.isSelected()
            }).map(function(a) {
                return a.id
            })
        };
    var pi = function() {};
    pi.prototype.j = function(a) {
        a = r(a);
        for (var b = a.next(); !b.done; b = a.next()) {
            var c = 0,
                d = Math.floor(1E3 * Math.random());
            b = r(b.value.j);
            for (var e = b.next(); !e.done; e = b.next())
                if (e = e.value, c += e.H, d < c) {
                    e.j = !0;
                    gi(e);
                    break
                }
        }
    };
    var ri = function(a) {
        D.call(this, a, -1, qi)
    };
    t(ri, D);
    var qi = [2, 8],
        si = [3, 4, 5];
    var ui = function(a) {
        D.call(this, a, -1, ti)
    };
    t(ui, D);
    var ti = [4];
    var wi = function(a) {
        D.call(this, a, -1, vi)
    };
    t(wi, D);
    var vi = [5],
        xi = [1, 2, 3, 6, 7];
    var zi = function(a) {
        D.call(this, a, -1, yi)
    };
    t(zi, D);
    zi.prototype.getId = function() {
        return Ad(B(this, 1), 0)
    };
    var yi = [2];
    var Bi = function(a) {
        D.call(this, a, -1, Ai)
    };
    t(Bi, D);
    var Ai = [2];
    var Di = function(a) {
        D.call(this, a, -1, Ci)
    };
    t(Di, D);
    var Fi = function(a) {
        D.call(this, a, -1, Ei)
    };
    t(Fi, D);
    var Ci = [1, 4, 2, 3],
        Ei = [2];
    var Gi = function(a, b) {
            switch (b) {
                case 1:
                    return Cd(a, 1, xi);
                case 2:
                    return Cd(a, 2, xi);
                case 3:
                    return Cd(a, 3, xi);
                case 6:
                    return Cd(a, 6, xi);
                default:
                    return null
            }
        },
        Hi = function(a, b) {
            if (!a) return null;
            switch (b) {
                case 1:
                    return Ad(nd(a, 1), !1);
                case 7:
                    return Bd(a, 3);
                case 2:
                    return Ad(md(a, 2), 0);
                case 3:
                    return Bd(a, 3);
                case 6:
                    b = Qc(a.da);
                    var c = kd(a, 4, 1, !1, b),
                        d = Nc(c);
                    if (!(d & 4)) {
                        Object.isFrozen(c) && (c = Pc(c.slice()), jd(a, 4, c, !1));
                        for (var e = 0, f = 0; e < c.length; e++) {
                            var g = c[e];
                            null != g && (c[f++] = g)
                        }
                        f < e && (c.length = f);
                        Lc(c, 5);
                        b && (Lc(c,
                            2), Object.freeze(c))
                    }!b && (d & 2 || Object.isFrozen(c)) && (c = Array.prototype.slice.call(c), Lc(c, 5), pd(a, 4, c, !1));
                    return c;
                default:
                    return null
            }
        };
    var Ii = {},
        Ji = (Ii[47] = tc, Ii);

    function Ki() {
        var a = Li,
            b = vd(new Di(Mi), Fi, 2);
        1 == b.length && 16 == od(b[0], 1) && vd(b[0], Bi, 2).forEach(function(c) {
            var d = Ad(B(c, 1), 0),
                e = td(c, ri, 3),
                f = a[od(c, 4)];
            vd(c, zi, 2).forEach(function(g) {
                var h = d || Ad(B(g, 4), 0),
                    k = g.getId(),
                    n = e || td(g, ri, 3);
                n = n ? Cd(n, 3, si) : null;
                n = Ji[n];
                g = Ni(vd(g, wi, 2));
                M({
                    id: k,
                    H: h,
                    layer: f,
                    condition: n,
                    flags: g
                })
            })
        })
    }

    function Ni(a) {
        if (a.length) {
            var b = {};
            a.forEach(function(c) {
                var d = rd(c, xi),
                    e = td(c, ui, 4);
                e && (c = Gi(c, d), d = Hi(e, d), b[c] = d)
            });
            return b
        }
    };
    var Oi = function(a) {
        this.ids = a
    };
    Oi.prototype.j = function(a, b) {
        a = r(this.ids);
        for (var c = a.next(); !c.done; c = a.next())
            if (c = b.get(c.value)) c.j = !0, gi(c)
    };
    var Pi = function(a, b) {
        this.ids = a;
        this.l = b
    };
    t(Pi, Oi);
    Pi.prototype.j = function(a, b) {
        Oi.prototype.j.call(this, a, b);
        var c = [];
        a = [];
        for (var d = r(this.ids), e = d.next(); !e.done; e = d.next()) e = e.value, b.get(e) ? c.push(e) : a.push(e);
        b = c.map(String).join(",") || "0";
        a = a.map(String).join(",") || "0";
        L(K.j(), "sei", b);
        L(K.j(), "nsei", a);
        L(K.j(), "bi", this.l)
    };
    var Qi = function() {
        ci.apply(this, arguments)
    };
    t(Qi, ci);
    Qi.prototype.onError = function(a, b) {
        var c = K.j();
        L(c, "eee", a);
        L(c, "bi", b)
    };
    Qi.j = function() {
        return J(Qi)
    };

    function Ri() {
        return Si.split(",").map(function(a) {
            return parseInt(a, 10)
        }).filter(function(a) {
            return !isNaN(a)
        })
    };
    var ni = new ii,
        Ti = new ii,
        Ui = new ii,
        Vi = new ii,
        Wi = new ii,
        Xi = new ii,
        Yi = new ii,
        Zi = new ii,
        $i = new ii,
        aj = new ii,
        bj = new ii;
    M({
        id: 318475490,
        H: 0
    });
    M({
        id: 324123032,
        H: 0
    });
    M({
        id: 418572103,
        H: 0
    });
    M({
        id: 420706097,
        H: 10
    });
    M({
        id: 420706098,
        H: 10
    });
    M({
        id: 21062100,
        H: 0
    });
    M({
        id: 420706105,
        H: 0
    });
    M({
        id: 420706106,
        H: 0
    });
    M({
        id: 21064018,
        H: 0
    });
    M({
        id: 21064020,
        H: 0
    });
    M({
        id: 21064022,
        H: 0
    });
    M({
        id: 21064024,
        H: 0
    });
    M({
        id: 21064075,
        H: 0
    });
    M({
        id: 21064201,
        H: 0
    });
    M({
        id: 420706142,
        H: 0
    });
    M({
        id: 21064347,
        H: 0
    });
    M({
        id: 44745813,
        H: 0
    });
    M({
        id: 44746068,
        H: 0
    });
    M({
        id: 21064565,
        H: 0
    });
    M({
        id: 21064567,
        H: 0
    });
    M({
        id: 418572006,
        H: 10
    });
    M({
        id: 44768716,
        H: 10,
        layer: Zi
    });
    var cj = M({
            id: 44768717,
            H: 10,
            layer: Zi
        }),
        dj = M({
            id: 44744588,
            H: 10
        }),
        ej = M({
            id: 44747319,
            H: 10
        });
    M({
        id: 44740339,
        H: 10
    });
    var fj = M({
        id: 44740340,
        H: 10
    });
    M({
        id: 44749839,
        H: 0
    });
    var gj = M({
        id: 44749840,
        H: 0
    });
    M({
        id: 44749841,
        H: 0
    });
    var hj = M({
        id: 44749842,
        H: 0
    });
    M({
        id: 44749843,
        H: 1
    });
    var ij = M({
        id: 44749844,
        H: 1
    });
    M({
        id: 44749845,
        H: 1
    });
    var jj = M({
        id: 44749846,
        H: 1
    });
    M({
        id: 44714743,
        H: 0
    });
    M({
        id: 44719216,
        H: 0
    });
    M({
        id: 44730895,
        H: 10
    });
    M({
        id: 44730896,
        H: 10
    });
    M({
        id: 44736292,
        H: 10
    });
    M({
        id: 44736293,
        H: 10
    });
    M({
        id: 31061774,
        H: 10
    });
    var kj = M({
        id: 31061775,
        H: 10
    });
    M({
        id: 44715336,
        H: 10
    });
    M({
        id: 44729309,
        H: 10
    });
    M({
        id: 75259410,
        H: 0
    });
    M({
        id: 75259412,
        H: 0
    });
    M({
        id: 75259413,
        H: 0
    });
    M({
        id: 44773378,
        H: 10,
        layer: Ui
    });
    var lj = M({
        id: 44773379,
        H: 10,
        layer: Ui
    });
    M({
        id: 44724516,
        H: 0
    });
    M({
        id: 44726389,
        H: 10
    });
    M({
        id: 44752711,
        H: 50
    });
    M({
        id: 44752052,
        H: 50
    });
    M({
        id: 44752657,
        H: 50
    });
    M({
        id: 44777647,
        layer: Vi,
        H: 100
    });
    M({
        id: 44777648,
        layer: Vi,
        H: 100
    });
    M({
        id: 44777649,
        layer: Vi,
        H: 100
    });
    M({
        id: 44727953,
        H: 0
    });
    M({
        id: 44729911,
        H: 0
    });
    M({
        id: 44730425,
        H: 0
    });
    M({
        id: 44730426,
        H: 0
    });
    M({
        id: 44733246,
        H: 10
    });
    M({
        id: 44750823,
        H: 100,
        layer: Xi
    });
    M({
        id: 44750824,
        H: 100,
        layer: Xi
    });
    M({
        id: 44750822,
        H: 100,
        layer: Xi
    });
    M({
        id: 44737473,
        H: 10,
        layer: Ti
    });
    M({
        id: 44771449,
        H: 10,
        layer: Ti
    });
    M({
        id: 44771450,
        H: 10,
        layer: Ti
    });
    M({
        id: 44751889,
        H: 10
    });
    M({
        id: 44751890,
        H: 10
    });
    M({
        id: 44738437,
        H: 0,
        layer: Yi
    });
    var mj = M({
        id: 44738438,
        H: 0,
        layer: Yi
    });
    M({
        id: 44752995,
        H: 10
    });
    M({
        id: 44752996,
        H: 10
    });
    var nj = M({
        id: 44748969,
        H: 1E3,
        layer: aj
    });
    M({
        id: 44762627,
        H: 0
    });
    M({
        id: 44762628,
        H: 0
    });
    M({
        id: 44752538,
        H: 0
    });
    M({
        id: 44754608,
        H: 10
    });
    M({
        id: 44754609,
        H: 10
    });
    M({
        id: 44770822,
        H: 10
    });
    M({
        id: 44770823,
        H: 10
    });
    M({
        id: 44770824,
        H: 10
    });
    M({
        id: 44770825,
        H: 10
    });
    M({
        id: 75259414,
        H: 0
    });
    M({
        id: 44731964,
        H: 50,
        layer: ni
    });
    M({
        id: 44731965,
        H: 50,
        layer: ni
    });
    M({
        id: 44765701,
        H: 1E3,
        layer: $i
    });
    M({
        id: 44767584,
        H: 0
    });
    var oj, pj = (null == (oj = window.document.featurePolicy) ? 0 : oj.allowedFeatures().includes("attribution-reporting")) ? 300 : 0;
    M({
        id: 44776494,
        H: pj,
        layer: bj
    });
    M({
        id: 44776495,
        H: pj,
        layer: bj
    });
    var qj, rj = (null == (qj = window.document.featurePolicy) || qj.allowedFeatures().includes("attribution-reporting"), 0);
    M({
        id: 44769484,
        H: rj,
        layer: bj
    });
    M({
        id: 44769485,
        H: rj,
        layer: bj
    });
    M({
        id: 44776384,
        H: 0
    });
    M({
        id: 44773331,
        H: 10
    });
    M({
        id: 44773332,
        H: 10
    });
    M({
        id: 44775192,
        H: 10
    });
    M({
        id: 44775193,
        H: 10
    });
    M({
        id: 44778953,
        H: 0
    });
    var sj = {},
        Li = (sj[32] = ni, sj[35] = Wi, sj);
    Li = void 0 === Li ? {} : Li;
    if (!/^\{+IMA_EXPERIMENT_STATE_JSPB\}+$/.test("{{IMA_EXPERIMENT_STATE_JSPB}}")) try {
        var Mi = JSON.parse("{{IMA_EXPERIMENT_STATE_JSPB}}");
        Mi instanceof Array && Ki()
    } catch (a) {
        L(K.j(), "espe", a.message)
    }
    if ("undefined" === typeof window.v8_flag_map) {
        var ei = Qi.j();
        ei.l || (fi(), ei.l = !0);
        var Si = ei.o,
            tj;
        ei.l || (fi(), ei.l = !0);
        tj = ei.j;
        if (null != Si) {
            var uj = new Pi(Ri(), tj);
            mi(uj)
        }
    };
    ki.reset();
    mi(new pi);
    v.console && "function" === typeof v.console.log && Ua(v.console.log, v.console);
    var vj = function(a) {
        for (var b = [], c = a = G(a.ownerDocument); c != a.top; c = c.parent)
            if (c.frameElement) b.push(c.frameElement);
            else break;
        return b
    };
    var wj = function(a, b) {
        this.type = a;
        this.currentTarget = this.target = b;
        this.defaultPrevented = this.l = !1
    };
    wj.prototype.stopPropagation = function() {
        this.l = !0
    };
    wj.prototype.preventDefault = function() {
        this.defaultPrevented = !0
    };
    var xj = function() {
        if (!v.addEventListener || !Object.defineProperty) return !1;
        var a = !1,
            b = Object.defineProperty({}, "passive", {
                get: function() {
                    a = !0
                }
            });
        try {
            v.addEventListener("test", function() {}, b), v.removeEventListener("test", function() {}, b)
        } catch (c) {}
        return a
    }();
    var yj = function(a, b) {
        wj.call(this, a ? a.type : "");
        this.relatedTarget = this.currentTarget = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.key = "";
        this.keyCode = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.state = null;
        this.pointerId = 0;
        this.pointerType = "";
        this.j = null;
        a && this.init(a, b)
    };
    Xa(yj, wj);
    var zj = {
        2: "touch",
        3: "pen",
        4: "mouse"
    };
    yj.prototype.init = function(a, b) {
        var c = this.type = a.type,
            d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
        this.target = a.target || a.srcElement;
        this.currentTarget = b;
        (b = a.relatedTarget) ? ac && (Vb(b, "nodeName") || (b = null)): "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
        this.relatedTarget = b;
        d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.clientX = void 0 !== a.clientX ?
            a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
        this.button = a.button;
        this.keyCode = a.keyCode || 0;
        this.key = a.key || "";
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.pointerId = a.pointerId || 0;
        this.pointerType = "string" === typeof a.pointerType ? a.pointerType : zj[a.pointerType] || "";
        this.state = a.state;
        this.j = a;
        a.defaultPrevented && yj.Aa.preventDefault.call(this)
    };
    yj.prototype.stopPropagation = function() {
        yj.Aa.stopPropagation.call(this);
        this.j.stopPropagation ? this.j.stopPropagation() : this.j.cancelBubble = !0
    };
    yj.prototype.preventDefault = function() {
        yj.Aa.preventDefault.call(this);
        var a = this.j;
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    };
    var Aj = "closure_listenable_" + (1E6 * Math.random() | 0),
        Bj = function(a) {
            return !(!a || !a[Aj])
        };
    var Cj = 0;
    var Dj = function(a, b, c, d, e) {
            this.listener = a;
            this.proxy = null;
            this.src = b;
            this.type = c;
            this.capture = !!d;
            this.dc = e;
            this.key = ++Cj;
            this.Ob = this.Ub = !1
        },
        Ej = function(a) {
            a.Ob = !0;
            a.listener = null;
            a.proxy = null;
            a.src = null;
            a.dc = null
        };
    var Fj = function(a) {
        this.src = a;
        this.listeners = {};
        this.j = 0
    };
    Fj.prototype.add = function(a, b, c, d, e) {
        var f = a.toString();
        a = this.listeners[f];
        a || (a = this.listeners[f] = [], this.j++);
        var g = Gj(a, b, d, e); - 1 < g ? (b = a[g], c || (b.Ub = !1)) : (b = new Dj(b, this.src, f, !!d, e), b.Ub = c, a.push(b));
        return b
    };
    Fj.prototype.remove = function(a, b, c, d) {
        a = a.toString();
        if (!(a in this.listeners)) return !1;
        var e = this.listeners[a];
        b = Gj(e, b, c, d);
        return -1 < b ? (Ej(e[b]), Mb(e, b), 0 == e.length && (delete this.listeners[a], this.j--), !0) : !1
    };
    var Hj = function(a, b) {
        var c = b.type;
        c in a.listeners && Lb(a.listeners[c], b) && (Ej(b), 0 == a.listeners[c].length && (delete a.listeners[c], a.j--))
    };
    Fj.prototype.Ib = function(a, b, c, d) {
        a = this.listeners[a.toString()];
        var e = -1;
        a && (e = Gj(a, b, c, d));
        return -1 < e ? a[e] : null
    };
    var Gj = function(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.Ob && f.listener == b && f.capture == !!c && f.dc == d) return e
        }
        return -1
    };
    var Ij = "closure_lm_" + (1E6 * Math.random() | 0),
        Jj = {},
        Kj = 0,
        Mj = function(a, b, c, d, e) {
            if (d && d.once) return Lj(a, b, c, d, e);
            if (Array.isArray(b)) {
                for (var f = 0; f < b.length; f++) Mj(a, b[f], c, d, e);
                return null
            }
            c = Nj(c);
            return Bj(a) ? a.R(b, c, Na(d) ? !!d.capture : !!d, e) : Oj(a, b, c, !1, d, e)
        },
        Oj = function(a, b, c, d, e, f) {
            if (!b) throw Error("Invalid event type");
            var g = Na(e) ? !!e.capture : !!e,
                h = Pj(a);
            h || (a[Ij] = h = new Fj(a));
            c = h.add(b, c, d, g, f);
            if (c.proxy) return c;
            d = Qj();
            c.proxy = d;
            d.src = a;
            d.listener = c;
            if (a.addEventListener) xj || (e = g), void 0 ===
                e && (e = !1), a.addEventListener(b.toString(), d, e);
            else if (a.attachEvent) a.attachEvent(Rj(b.toString()), d);
            else if (a.addListener && a.removeListener) a.addListener(d);
            else throw Error("addEventListener and attachEvent are unavailable.");
            Kj++;
            return c
        },
        Qj = function() {
            var a = Sj,
                b = function(c) {
                    return a.call(b.src, b.listener, c)
                };
            return b
        },
        Lj = function(a, b, c, d, e) {
            if (Array.isArray(b)) {
                for (var f = 0; f < b.length; f++) Lj(a, b[f], c, d, e);
                return null
            }
            c = Nj(c);
            return Bj(a) ? a.Mb(b, c, Na(d) ? !!d.capture : !!d, e) : Oj(a, b, c, !0, d, e)
        },
        Tj =
        function(a, b, c, d, e) {
            if (Array.isArray(b))
                for (var f = 0; f < b.length; f++) Tj(a, b[f], c, d, e);
            else d = Na(d) ? !!d.capture : !!d, c = Nj(c), Bj(a) ? a.kb(b, c, d, e) : a && (a = Pj(a)) && (b = a.Ib(b, c, d, e)) && Uj(b)
        },
        Uj = function(a) {
            if ("number" !== typeof a && a && !a.Ob) {
                var b = a.src;
                if (Bj(b)) Hj(b.B, a);
                else {
                    var c = a.type,
                        d = a.proxy;
                    b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(Rj(c), d) : b.addListener && b.removeListener && b.removeListener(d);
                    Kj--;
                    (c = Pj(b)) ? (Hj(c, a), 0 == c.j && (c.src = null, b[Ij] = null)) : Ej(a)
                }
            }
        },
        Rj = function(a) {
            return a in Jj ? Jj[a] : Jj[a] = "on" + a
        },
        Sj = function(a, b) {
            if (a.Ob) a = !0;
            else {
                b = new yj(b, this);
                var c = a.listener,
                    d = a.dc || a.src;
                a.Ub && Uj(a);
                a = c.call(d, b)
            }
            return a
        },
        Pj = function(a) {
            a = a[Ij];
            return a instanceof Fj ? a : null
        },
        Vj = "__closure_events_fn_" + (1E9 * Math.random() >>> 0),
        Nj = function(a) {
            if ("function" === typeof a) return a;
            a[Vj] || (a[Vj] = function(b) {
                return a.handleEvent(b)
            });
            return a[Vj]
        };
    var O = function() {
        E.call(this);
        this.B = new Fj(this);
        this.Yb = this;
        this.qa = null
    };
    Xa(O, E);
    O.prototype[Aj] = !0;
    l = O.prototype;
    l.addEventListener = function(a, b, c, d) {
        Mj(this, a, b, c, d)
    };
    l.removeEventListener = function(a, b, c, d) {
        Tj(this, a, b, c, d)
    };
    l.dispatchEvent = function(a) {
        var b, c = this.qa;
        if (c)
            for (b = []; c; c = c.qa) b.push(c);
        c = this.Yb;
        var d = a.type || a;
        if ("string" === typeof a) a = new wj(a, c);
        else if (a instanceof wj) a.target = a.target || c;
        else {
            var e = a;
            a = new wj(d, c);
            tf(a, e)
        }
        e = !0;
        if (b)
            for (var f = b.length - 1; !a.l && 0 <= f; f--) {
                var g = a.currentTarget = b[f];
                e = Wj(g, d, !0, a) && e
            }
        a.l || (g = a.currentTarget = c, e = Wj(g, d, !0, a) && e, a.l || (e = Wj(g, d, !1, a) && e));
        if (b)
            for (f = 0; !a.l && f < b.length; f++) g = a.currentTarget = b[f], e = Wj(g, d, !1, a) && e;
        return e
    };
    l.O = function() {
        O.Aa.O.call(this);
        if (this.B) {
            var a = this.B,
                b = 0,
                c;
            for (c in a.listeners) {
                for (var d = a.listeners[c], e = 0; e < d.length; e++) ++b, Ej(d[e]);
                delete a.listeners[c];
                a.j--
            }
        }
        this.qa = null
    };
    l.R = function(a, b, c, d) {
        return this.B.add(String(a), b, !1, c, d)
    };
    l.Mb = function(a, b, c, d) {
        return this.B.add(String(a), b, !0, c, d)
    };
    l.kb = function(a, b, c, d) {
        this.B.remove(String(a), b, c, d)
    };
    var Wj = function(a, b, c, d) {
        b = a.B.listeners[String(b)];
        if (!b) return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var g = b[f];
            if (g && !g.Ob && g.capture == c) {
                var h = g.listener,
                    k = g.dc || g.src;
                g.Ub && Hj(a.B, g);
                e = !1 !== h.call(k, d) && e
            }
        }
        return e && !d.defaultPrevented
    };
    O.prototype.Ib = function(a, b, c, d) {
        return this.B.Ib(String(a), b, c, d)
    };
    var Xj = function(a, b) {
        this.o = a;
        this.B = b;
        this.l = 0;
        this.j = null
    };
    Xj.prototype.get = function() {
        if (0 < this.l) {
            this.l--;
            var a = this.j;
            this.j = a.next;
            a.next = null
        } else a = this.o();
        return a
    };
    var Yj = function(a, b) {
        a.B(b);
        100 > a.l && (a.l++, b.next = a.j, a.j = b)
    };
    var Zj, ak = function() {
        var a = v.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !z("Presto") && (a = function() {
            var e = ig(document, "IFRAME");
            e.style.display = "none";
            document.documentElement.appendChild(e);
            var f = e.contentWindow;
            e = f.document;
            e.open();
            e.close();
            var g = "callImmediate" + Math.random(),
                h = "file:" == f.location.protocol ? "*" : f.location.protocol + "//" + f.location.host;
            e = Ua(function(k) {
                    if (("*" == h || k.origin == h) && k.data == g) this.port1.onmessage()
                },
                this);
            f.addEventListener("message", e, !1);
            this.port1 = {};
            this.port2 = {
                postMessage: function() {
                    f.postMessage(g, h)
                }
            }
        });
        if ("undefined" !== typeof a && !vb()) {
            var b = new a,
                c = {},
                d = c;
            b.port1.onmessage = function() {
                if (void 0 !== c.next) {
                    c = c.next;
                    var e = c.Ed;
                    c.Ed = null;
                    e()
                }
            };
            return function(e) {
                d.next = {
                    Ed: e
                };
                d = d.next;
                b.port2.postMessage(0)
            }
        }
        return function(e) {
            v.setTimeout(e, 0)
        }
    };
    var bk = function() {
        this.l = this.j = null
    };
    bk.prototype.add = function(a, b) {
        var c = ck.get();
        c.set(a, b);
        this.l ? this.l.next = c : this.j = c;
        this.l = c
    };
    bk.prototype.remove = function() {
        var a = null;
        this.j && (a = this.j, this.j = this.j.next, this.j || (this.l = null), a.next = null);
        return a
    };
    var ck = new Xj(function() {
            return new dk
        }, function(a) {
            return a.reset()
        }),
        dk = function() {
            this.next = this.scope = this.j = null
        };
    dk.prototype.set = function(a, b) {
        this.j = a;
        this.scope = b;
        this.next = null
    };
    dk.prototype.reset = function() {
        this.next = this.scope = this.j = null
    };
    var ek, fk = !1,
        gk = new bk,
        ik = function(a, b) {
            ek || hk();
            fk || (ek(), fk = !0);
            gk.add(a, b)
        },
        hk = function() {
            if (v.Promise && v.Promise.resolve) {
                var a = v.Promise.resolve(void 0);
                ek = function() {
                    a.then(jk)
                }
            } else ek = function() {
                var b = jk;
                "function" !== typeof v.setImmediate || v.Window && v.Window.prototype && !z("Edge") && v.Window.prototype.setImmediate == v.setImmediate ? (Zj || (Zj = ak()), Zj(b)) : v.setImmediate(b)
            }
        },
        jk = function() {
            for (var a; a = gk.remove();) {
                try {
                    a.j.call(a.scope)
                } catch (b) {
                    db(b)
                }
                Yj(ck, a)
            }
            fk = !1
        };
    var kk = function(a) {
        if (!a) return !1;
        try {
            return !!a.$goog_Thenable
        } catch (b) {
            return !1
        }
    };
    var mk = function(a) {
            this.j = 0;
            this.D = void 0;
            this.B = this.l = this.o = null;
            this.A = this.C = !1;
            if (a != Oe) try {
                var b = this;
                a.call(void 0, function(c) {
                    lk(b, 2, c)
                }, function(c) {
                    lk(b, 3, c)
                })
            } catch (c) {
                lk(this, 3, c)
            }
        },
        nk = function() {
            this.next = this.context = this.onRejected = this.l = this.j = null;
            this.o = !1
        };
    nk.prototype.reset = function() {
        this.context = this.onRejected = this.l = this.j = null;
        this.o = !1
    };
    var ok = new Xj(function() {
            return new nk
        }, function(a) {
            a.reset()
        }),
        pk = function(a, b, c) {
            var d = ok.get();
            d.l = a;
            d.onRejected = b;
            d.context = c;
            return d
        };
    mk.prototype.then = function(a, b, c) {
        return qk(this, "function" === typeof a ? a : null, "function" === typeof b ? b : null, c)
    };
    mk.prototype.$goog_Thenable = !0;
    mk.prototype.J = function(a, b) {
        return qk(this, null, a, b)
    };
    mk.prototype.catch = mk.prototype.J;
    mk.prototype.cancel = function(a) {
        if (0 == this.j) {
            var b = new rk(a);
            ik(function() {
                sk(this, b)
            }, this)
        }
    };
    var sk = function(a, b) {
            if (0 == a.j)
                if (a.o) {
                    var c = a.o;
                    if (c.l) {
                        for (var d = 0, e = null, f = null, g = c.l; g && (g.o || (d++, g.j == a && (e = g), !(e && 1 < d))); g = g.next) e || (f = g);
                        e && (0 == c.j && 1 == d ? sk(c, b) : (f ? (d = f, d.next == c.B && (c.B = d), d.next = d.next.next) : tk(c), uk(c, e, 3, b)))
                    }
                    a.o = null
                } else lk(a, 3, b)
        },
        wk = function(a, b) {
            a.l || 2 != a.j && 3 != a.j || vk(a);
            a.B ? a.B.next = b : a.l = b;
            a.B = b
        },
        qk = function(a, b, c, d) {
            var e = pk(null, null, null);
            e.j = new mk(function(f, g) {
                e.l = b ? function(h) {
                    try {
                        var k = b.call(d, h);
                        f(k)
                    } catch (n) {
                        g(n)
                    }
                } : f;
                e.onRejected = c ? function(h) {
                    try {
                        var k =
                            c.call(d, h);
                        void 0 === k && h instanceof rk ? g(h) : f(k)
                    } catch (n) {
                        g(n)
                    }
                } : g
            });
            e.j.o = a;
            wk(a, e);
            return e.j
        };
    mk.prototype.F = function(a) {
        this.j = 0;
        lk(this, 2, a)
    };
    mk.prototype.G = function(a) {
        this.j = 0;
        lk(this, 3, a)
    };
    var lk = function(a, b, c) {
            if (0 == a.j) {
                a === c && (b = 3, c = new TypeError("Promise cannot resolve to itself"));
                a.j = 1;
                a: {
                    var d = c,
                        e = a.F,
                        f = a.G;
                    if (d instanceof mk) {
                        wk(d, pk(e || Oe, f || null, a));
                        var g = !0
                    } else if (kk(d)) d.then(e, f, a),
                    g = !0;
                    else {
                        if (Na(d)) try {
                            var h = d.then;
                            if ("function" === typeof h) {
                                xk(d, h, e, f, a);
                                g = !0;
                                break a
                            }
                        } catch (k) {
                            f.call(a, k);
                            g = !0;
                            break a
                        }
                        g = !1
                    }
                }
                g || (a.D = c, a.j = b, a.o = null, vk(a), 3 != b || c instanceof rk || yk(a, c))
            }
        },
        xk = function(a, b, c, d, e) {
            var f = !1,
                g = function(k) {
                    f || (f = !0, c.call(e, k))
                },
                h = function(k) {
                    f || (f = !0, d.call(e,
                        k))
                };
            try {
                b.call(a, g, h)
            } catch (k) {
                h(k)
            }
        },
        vk = function(a) {
            a.C || (a.C = !0, ik(a.M, a))
        },
        tk = function(a) {
            var b = null;
            a.l && (b = a.l, a.l = b.next, b.next = null);
            a.l || (a.B = null);
            return b
        };
    mk.prototype.M = function() {
        for (var a; a = tk(this);) uk(this, a, this.j, this.D);
        this.C = !1
    };
    var uk = function(a, b, c, d) {
            if (3 == c && b.onRejected && !b.o)
                for (; a && a.A; a = a.o) a.A = !1;
            if (b.j) b.j.o = null, zk(b, c, d);
            else try {
                b.o ? b.l.call(b.context) : zk(b, c, d)
            } catch (e) {
                Ak.call(null, e)
            }
            Yj(ok, b)
        },
        zk = function(a, b, c) {
            2 == b ? a.l.call(a.context, c) : a.onRejected && a.onRejected.call(a.context, c)
        },
        yk = function(a, b) {
            a.A = !0;
            ik(function() {
                a.A && Ak.call(null, b)
            })
        },
        Ak = db,
        rk = function(a) {
            Za.call(this, a)
        };
    Xa(rk, Za);
    rk.prototype.name = "cancel";
    var Bk = function(a, b) {
        O.call(this);
        this.l = a || 1;
        this.j = b || v;
        this.o = Ua(this.Jf, this);
        this.A = Wa()
    };
    Xa(Bk, O);
    l = Bk.prototype;
    l.enabled = !1;
    l.Ia = null;
    l.Jf = function() {
        if (this.enabled) {
            var a = Wa() - this.A;
            0 < a && a < .8 * this.l ? this.Ia = this.j.setTimeout(this.o, this.l - a) : (this.Ia && (this.j.clearTimeout(this.Ia), this.Ia = null), this.dispatchEvent("tick"), this.enabled && (this.stop(), this.start()))
        }
    };
    l.start = function() {
        this.enabled = !0;
        this.Ia || (this.Ia = this.j.setTimeout(this.o, this.l), this.A = Wa())
    };
    l.stop = function() {
        this.enabled = !1;
        this.Ia && (this.j.clearTimeout(this.Ia), this.Ia = null)
    };
    l.O = function() {
        Bk.Aa.O.call(this);
        this.stop();
        delete this.j
    };
    var Ck = function(a, b, c) {
            if ("function" === typeof a) c && (a = Ua(a, c));
            else if (a && "function" == typeof a.handleEvent) a = Ua(a.handleEvent, a);
            else throw Error("Invalid listener argument");
            return 2147483647 < Number(b) ? -1 : v.setTimeout(a, b || 0)
        },
        Dk = function() {
            var a = null;
            return (new mk(function(b, c) {
                a = Ck(function() {
                    b("timed out")
                }, 200); - 1 == a && c(Error("Failed to schedule timer."))
            })).J(function(b) {
                v.clearTimeout(a);
                throw b;
            })
        };
    var Ek = function() {
        return Math.round(Date.now() / 1E3)
    };
    var Fk = function() {
        this.j = {};
        return this
    };
    Fk.prototype.remove = function(a) {
        var b = this.j;
        a in b && delete b[a]
    };
    Fk.prototype.set = function(a, b) {
        this.j[a] = b
    };
    var Gk = function(a, b) {
        a.j.eb = rf(a.j, "eb", 0) | b
    };
    Fk.prototype.get = function(a) {
        return rf(this.j, a, null)
    };
    var Hk = null,
        Ik = function() {
            this.j = {};
            this.l = 0
        },
        Jk = function() {
            Hk || (Hk = new Ik);
            return Hk
        },
        Kk = function(a, b) {
            a.j[b.getName()] = b
        },
        Lk = function(a, b) {
            this.o = a;
            this.l = !0;
            this.V = b
        };
    Lk.prototype.getName = function() {
        return this.o
    };
    Lk.prototype.j = function() {
        return String(this.V)
    };
    var Mk = function(a, b) {
        Lk.call(this, String(a), b);
        this.B = a;
        this.V = !!b
    };
    t(Mk, Lk);
    Mk.prototype.j = function() {
        return this.V ? "1" : "0"
    };
    var Nk = function(a, b) {
        Lk.call(this, a, b)
    };
    t(Nk, Lk);
    Nk.prototype.j = function() {
        return this.V ? Math.round(this.V.top) + "." + Math.round(this.V.left) + "." + (Math.round(this.V.top) + Math.round(this.V.height)) + "." + (Math.round(this.V.left) + Math.round(this.V.width)) : ""
    };
    var Ok = function(a) {
        if (a.match(/^-?[0-9]+\.-?[0-9]+\.-?[0-9]+\.-?[0-9]+$/)) {
            a = a.split(".");
            var b = Number(a[0]),
                c = Number(a[1]);
            return new Nk("", new Wg(c, b, Number(a[3]) - c, Number(a[2]) - b))
        }
        return new Nk("", new Wg(0, 0, 0, 0))
    };
    var Qk = function(a, b) {
            if ("string" === typeof b)(b = Pk(a, b)) && (a.style[b] = void 0);
            else
                for (var c in b) {
                    var d = a,
                        e = b[c],
                        f = Pk(d, c);
                    f && (d.style[f] = e)
                }
        },
        Rk = {},
        Pk = function(a, b) {
            var c = Rk[b];
            if (!c) {
                var d = Wf(b);
                c = d;
                void 0 === a.style[d] && (d = (bc ? "Webkit" : ac ? "Moz" : Zb ? "ms" : null) + Yf(d), void 0 !== a.style[d] && (c = d));
                Rk[b] = c
            }
            return c
        },
        Sk = function(a, b) {
            var c = a.style[Wf(b)];
            return "undefined" !== typeof c ? c : a.style[Pk(a, b)] || ""
        },
        Tk = function(a, b) {
            var c = ag(a);
            return c.defaultView && c.defaultView.getComputedStyle && (a = c.defaultView.getComputedStyle(a,
                null)) ? a[b] || a.getPropertyValue(b) || "" : ""
        },
        Uk = function(a) {
            try {
                return a.getBoundingClientRect()
            } catch (b) {
                return {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                }
            }
        },
        Vk = function(a) {
            var b = ag(a),
                c = new Qf(0, 0);
            var d = b ? ag(b) : document;
            d = !Zb || 9 <= Number(sc) || fg(bg(d).j) ? d.documentElement : d.body;
            if (a == d) return c;
            a = Uk(a);
            b = hg(bg(b).j);
            c.x = a.left + b.x;
            c.y = a.top + b.y;
            return c
        },
        Wk = function(a, b) {
            var c = new Qf(0, 0),
                d = G(ag(a));
            if (!Vb(d, "parent")) return c;
            do {
                if (d == b) var e = Vk(a);
                else e = Uk(a), e = new Qf(e.left, e.top);
                c.x += e.x;
                c.y += e.y
            } while (d &&
                d != b && d != d.parent && (a = d.frameElement) && (d = d.parent));
            return c
        },
        Xk = function() {
            var a = "100%";
            "number" == typeof a && (a = Math.round(a) + "px");
            return a
        },
        Zk = function(a) {
            var b = Yk;
            if ("none" != (Tk(a, "display") || (a.currentStyle ? a.currentStyle.display : null) || a.style && a.style.display)) return b(a);
            var c = a.style,
                d = c.display,
                e = c.visibility,
                f = c.position;
            c.visibility = "hidden";
            c.position = "absolute";
            c.display = "inline";
            a = b(a);
            c.display = d;
            c.position = f;
            c.visibility = e;
            return a
        },
        Yk = function(a) {
            var b = a.offsetWidth,
                c = a.offsetHeight,
                d = bc && !b && !c;
            return (void 0 === b || d) && a.getBoundingClientRect ? (a = Uk(a), new F(a.right - a.left, a.bottom - a.top)) : new F(b, c)
        },
        cl = function(a) {
            var b = ag(a),
                c = Zb && a.currentStyle;
            if (c && fg(bg(b).j) && "auto" != c.width && "auto" != c.height && !c.boxSizing) return b = $k(a, c.width, "width", "pixelWidth"), a = $k(a, c.height, "height", "pixelHeight"), new F(b, a);
            c = new F(a.offsetWidth, a.offsetHeight);
            if (Zb) {
                b = al(a, "paddingLeft");
                var d = al(a, "paddingRight"),
                    e = al(a, "paddingTop"),
                    f = al(a, "paddingBottom");
                b = new H(e, d, f, b)
            } else b = Tk(a, "paddingLeft"),
                d = Tk(a, "paddingRight"), e = Tk(a, "paddingTop"), f = Tk(a, "paddingBottom"), b = new H(parseFloat(e), parseFloat(d), parseFloat(f), parseFloat(b));
            !Zb || 9 <= Number(sc) ? (d = Tk(a, "borderLeftWidth"), e = Tk(a, "borderRightWidth"), f = Tk(a, "borderTopWidth"), a = Tk(a, "borderBottomWidth"), a = new H(parseFloat(f), parseFloat(e), parseFloat(a), parseFloat(d))) : (d = bl(a, "borderLeft"), e = bl(a, "borderRight"), f = bl(a, "borderTop"), a = bl(a, "borderBottom"), a = new H(f, e, a, d));
            return new F(c.width - a.left - b.left - b.right - a.right, c.height - a.top - b.top -
                b.bottom - a.bottom)
        },
        $k = function(a, b, c, d) {
            if (/^\d+px?$/.test(b)) return parseInt(b, 10);
            var e = a.style[c],
                f = a.runtimeStyle[c];
            a.runtimeStyle[c] = a.currentStyle[c];
            a.style[c] = b;
            b = a.style[d];
            a.style[c] = e;
            a.runtimeStyle[c] = f;
            return +b
        },
        al = function(a, b) {
            return (b = a.currentStyle ? a.currentStyle[b] : null) ? $k(a, b, "left", "pixelLeft") : 0
        },
        dl = {
            thin: 2,
            medium: 4,
            thick: 6
        },
        bl = function(a, b) {
            if ("none" == (a.currentStyle ? a.currentStyle[b + "Style"] : null)) return 0;
            b = a.currentStyle ? a.currentStyle[b + "Width"] : null;
            return b in dl ? dl[b] :
                $k(a, b, "left", "pixelLeft")
        };
    var el = function(a) {
            var b = new Wg(-Number.MAX_VALUE / 2, -Number.MAX_VALUE / 2, Number.MAX_VALUE, Number.MAX_VALUE),
                c = new Wg(0, 0, 0, 0);
            if (!a || 0 == a.length) return c;
            for (var d = 0; d < a.length; d++) {
                a: {
                    var e = b;
                    var f = a[d],
                        g = Math.max(e.left, f.left),
                        h = Math.min(e.left + e.width, f.left + f.width);
                    if (g <= h) {
                        var k = Math.max(e.top, f.top);
                        f = Math.min(e.top + e.height, f.top + f.height);
                        if (k <= f) {
                            e.left = g;
                            e.top = k;
                            e.width = h - g;
                            e.height = f - k;
                            e = !0;
                            break a
                        }
                    }
                    e = !1
                }
                if (!e) return c
            }
            return b
        },
        fl = function(a, b) {
            var c = a.getBoundingClientRect();
            a = Wk(a,
                b);
            return new Wg(Math.round(a.x), Math.round(a.y), Math.round(c.right - c.left), Math.round(c.bottom - c.top))
        },
        gl = function(a, b, c) {
            if (b && c) {
                a: {
                    var d = Math.max(b.left, c.left);
                    var e = Math.min(b.left + b.width, c.left + c.width);
                    if (d <= e) {
                        var f = Math.max(b.top, c.top),
                            g = Math.min(b.top + b.height, c.top + c.height);
                        if (f <= g) {
                            d = new Wg(d, f, e - d, g - f);
                            break a
                        }
                    }
                    d = null
                }
                e = d ? d.height * d.width : 0;f = d ? b.height * b.width : 0;d = d && f ? Math.round(e / f * 100) : 0;Kk(a, new Lk("vp", d));d && 0 < d ? (e = Xg(b), f = Xg(c), e = e.top >= f.top && e.top < f.bottom) : e = !1;Kk(a, new Mk(512,
                    e));d && 0 < d ? (e = Xg(b), f = Xg(c), e = e.bottom <= f.bottom && e.bottom > f.top) : e = !1;Kk(a, new Mk(1024, e));d && 0 < d ? (e = Xg(b), f = Xg(c), e = e.left >= f.left && e.left < f.right) : e = !1;Kk(a, new Mk(2048, e));d && 0 < d ? (b = Xg(b), c = Xg(c), c = b.right <= c.right && b.right > c.left) : c = !1;Kk(a, new Mk(4096, c))
            }
        };
    var hl = function(a, b) {
        var c = 0;
        kf(G(), "ima", "video", "client", "tagged") && (c = 1);
        var d = null;
        a && (d = a());
        if (d) {
            a = Jk();
            a.j = {};
            var e = new Mk(32, !0);
            e.l = !1;
            Kk(a, e);
            e = G().document;
            e = e.visibilityState || e.webkitVisibilityState || e.mozVisibilityState || e.msVisibilityState || "";
            Kk(a, new Mk(64, "hidden" != e.toLowerCase().substring(e.length - 6) ? !0 : !1));
            try {
                var f = G().top;
                try {
                    var g = !!f.location.href || "" === f.location.href
                } catch (m) {
                    g = !1
                }
                if (g) {
                    var h = vj(d);
                    var k = h && 0 != h.length ? "1" : "0"
                } else k = "2"
            } catch (m) {
                k = "2"
            }
            Kk(a, new Mk(256,
                "2" == k));
            Kk(a, new Mk(128, "1" == k));
            h = g = G().top;
            "2" == k && (h = G());
            f = fl(d, h);
            Kk(a, new Nk("er", f));
            try {
                var n = h.document && !h.document.body ? null : gg(h || window)
            } catch (m) {
                n = null
            }
            n ? (h = hg(bg(h.document).j), Kk(a, new Mk(16384, !!h)), n = h ? new Wg(h.x, h.y, n.width, n.height) : null) : n = null;
            Kk(a, new Nk("vi", n));
            if (n && "1" == k) {
                k = vj(d);
                d = [];
                for (h = 0; h < k.length; h++)(e = fl(k[h], g)) && d.push(e);
                d.push(n);
                n = el(d)
            }
            gl(a, f, n);
            a.l && Kk(a, new Lk("ts", Ek() - a.l));
            a.l = Ek()
        } else a = Jk(), a.j = {}, a.l = Ek(), Kk(a, new Mk(32, !1));
        this.o = a;
        this.j = new Fk;
        this.j.set("ve", 4);
        c && Gk(this.j, 1);
        kf(G(), "ima", "video", "client", "crossdomainTag") && Gk(this.j, 4);
        kf(G(), "ima", "video", "client", "sdkTag") && Gk(this.j, 8);
        kf(G(), "ima", "video", "client", "jsTag") && Gk(this.j, 2);
        b && rf(b, "fullscreen", !1) && Gk(this.j, 16);
        this.l = b = null;
        if (c && (c = kf(G(), "ima", "video", "client"), c.getEData)) {
            this.l = c.getEData();
            if (c = kf(G(), "ima", "video", "client", "getLastSnapshotFromTop"))
                if (a = c()) this.l.extendWithDataFromTopIframe(a.tagstamp, a.playstamp, a.lactstamp), c = this.o, b = a.er, a = a.vi, b && a &&
                    (b = Ok(b).V, a = Ok(a).V, k = null, rf(c.j, "er", null) && (k = rf(c.j, "er", null).V, k.top += b.top, k.left += b.left, Kk(c, new Nk("er", k))), rf(c.j, "vi", null) && (n = rf(c.j, "vi", null).V, n.top += b.top, n.left += b.left, d = [], d.push(n), d.push(b), d.push(a), b = el(d), gl(c, k, b), Kk(c, new Nk("vi", a))));
            a: {
                if (this.l) {
                    if (this.l.getTagLoadTimestamp) {
                        b = this.l.getTagLoadTimestamp();
                        break a
                    }
                    if (this.l.getTimeSinceTagLoadSeconds) {
                        b = this.l.getTimeSinceTagLoadSeconds();
                        break a
                    }
                }
                b = null
            }
        }
        c = this.j;
        a = window.performance && window.performance.timing &&
            window.performance.timing.domLoading && 0 < window.performance.timing.domLoading ? Math.round(window.performance.timing.domLoading / 1E3) : null;
        c.set.call(c, "td", Ek() - (null != a ? a : null != b ? b : Ek()))
    };
    var il = new Bk(200),
        jl = function(a, b) {
            try {
                var c = new hl(a, b);
                a = [];
                var d = Number(c.j.get("eb"));
                c.j.remove("eb");
                var e, f = c.j;
                b = [];
                for (var g in f.j) b.push(g + f.j[g]);
                (e = b.join("_")) && a.push(e);
                if (c.l) {
                    var h = c.l.serialize();
                    h && a.push(h)
                }
                var k, n = c.o;
                e = d;
                f = [];
                e || (e = 0);
                for (var m in n.j) {
                    var x = n.j[m];
                    if (x instanceof Mk) x.V && (e |= x.B);
                    else {
                        var u = n.j[m],
                            y = u.l ? u.j() : "";
                        y && f.push(m + y)
                    }
                }
                f.push("eb" + String(e));
                (k = f.join("_")) && a.push(k);
                c.j.set("eb", d);
                return a.join("_")
            } catch (A) {
                return "tle;" + Sf(A.name, 12) + ";" + Sf(A.message,
                    40)
            }
        },
        kl = function(a, b) {
            Mj(il, "tick", function() {
                var c = jl(b);
                a(c)
            });
            il.start();
            il.dispatchEvent("tick")
        };
    var ll = function(a) {
        D.call(this, a)
    };
    t(ll, D);
    var nl = function(a) {
        D.call(this, a, -1, ml)
    };
    t(nl, D);
    var ml = [2];
    var pl = function(a) {
        D.call(this, a, -1, ol)
    };
    t(pl, D);
    var ql = function(a) {
        D.call(this, a)
    };
    t(ql, D);
    ql.prototype.getError = function() {
        return td(this, rl, 7)
    };
    var sl = function(a) {
        D.call(this, a)
    };
    t(sl, D);
    var rl = function(a) {
        D.call(this, a)
    };
    t(rl, D);
    var tl = function(a) {
        D.call(this, a)
    };
    t(tl, D);
    var ul = function(a) {
        var b = new tl;
        return C(b, 1, a)
    };
    tl.prototype.getError = function() {
        return td(this, vl, 10)
    };
    var wl = function(a, b) {
            return wd(a, 10, b)
        },
        vl = function(a) {
            D.call(this, a)
        };
    t(vl, D);
    var xl = function(a, b) {
            return C(a, 1, b)
        },
        ol = [1, 2],
        yl = [sl, 1, Ce, 2, Ce, 3, Ce],
        zl = [pl, 1, Ie, [ql, 5, Ge, 4, Ge, 2, He, yl, 3, He, yl, 6, Fe, 7, He, [rl, 4, Je, 5, Ge], 8, Ae], 2, Ie, [tl, 1, Ge, 2, Ge, 3, Ae, 7, Ae, 8, ze, 4, De, 5, De, 6, De, 9, Fe, 11, Fe, 10, He, [vl, 1, Je]]];
    var Al = function(a) {
        D.call(this, a)
    };
    t(Al, D);
    Al.prototype.setValue = function(a) {
        return C(this, 1, a)
    };
    Al.prototype.getVersion = function() {
        return B(this, 5)
    };
    var Bl;
    Bl = ["av.default", "js", "unreleased"].slice(-1)[0];
    var Cl = new function(a, b) {
        this.key = a;
        this.defaultValue = void 0 === b ? !1 : b;
        this.valueType = "boolean"
    }("45378663");
    var Dl = document,
        P = window;
    var El = function(a) {
        var b = {};
        Bb(a, function(c) {
            var d = c.event,
                e = b[d];
            b.hasOwnProperty(d) ? null !== e && (c.j(e) || (b[d] = null)) : b[d] = c
        });
        Nb(a, function(c) {
            return null === b[c.event]
        })
    };
    var Fl = {
            NONE: 0,
            jg: 1
        },
        Gl = {
            hg: 0,
            mh: 1,
            lh: 2,
            nh: 3
        },
        Hl = {
            be: "a",
            ig: "d",
            He: "v"
        };
    var Il = function() {
        this.aa = 0;
        this.j = !1;
        this.l = -1;
        this.ib = !1;
        this.pa = 0
    };
    Il.prototype.isVisible = function() {
        return this.ib ? .3 <= this.aa : .5 <= this.aa
    };
    var Jl = {
            gg: 0,
            mg: 1
        },
        Kl = {
            668123728: 0,
            668123729: 1
        },
        Ll = {
            44731964: 0,
            44731965: 1
        },
        Ml = {
            NONE: 0,
            Og: 1,
            rg: 2
        },
        Nl = {
            480596784: 0,
            480596785: 1,
            21063355: 2
        };
    var Ol = function() {
            this.V = null;
            this.l = !1;
            this.j = null
        },
        Pl = function(a) {
            a.l = !0;
            return a
        },
        Ql = function(a, b) {
            a.j && Bb(b, function(c) {
                c = a.j[c];
                void 0 !== c && a.setValue(c)
            })
        },
        Rl = function(a) {
            Ol.call(this);
            this.o = a
        };
    t(Rl, Ol);
    Rl.prototype.setValue = function(a) {
        if (null !== this.V || !mf(this.o, a)) return !1;
        this.V = a;
        return !0
    };
    var Sl = function() {
        Ol.call(this)
    };
    t(Sl, Ol);
    Sl.prototype.setValue = function(a) {
        if (null !== this.V || "number" !== typeof a) return !1;
        this.V = a;
        return !0
    };
    var Tl = function() {
        Ol.call(this)
    };
    t(Tl, Ol);
    Tl.prototype.setValue = function(a) {
        if (null !== this.V || "string" !== typeof a) return !1;
        this.V = a;
        return !0
    };
    var Ul = function() {
        this.j = {};
        this.l = !0;
        this.o = {}
    };
    Ul.prototype.enable = function() {
        this.l = !0
    };
    Ul.prototype.isEnabled = function() {
        return this.l
    };
    Ul.prototype.reset = function() {
        this.j = {};
        this.l = !0;
        this.o = {}
    };
    var Vl = function(a, b, c) {
            a.j[b] || (a.j[b] = new Rl(c));
            return a.j[b]
        },
        Wl = function(a) {
            a.j.queryid || (a.j.queryid = new Tl)
        },
        Xl = function(a, b, c) {
            (a = a.j[b]) && a.setValue(c)
        },
        Yl = function(a, b) {
            if (lf(a.o, b)) return a.o[b];
            if (a = a.j[b]) return a.V
        },
        Zl = function(a) {
            var b = {},
                c = bf(a.j, function(d) {
                    return d.l
                });
            af(c, function(d, e) {
                d = void 0 !== a.o[e] ? String(a.o[e]) : d.l && null !== d.V ? String(d.V) : "";
                0 < d.length && (b[e] = d)
            }, a);
            return b
        },
        $l = function(a) {
            a = Zl(a);
            var b = [];
            af(a, function(c, d) {
                d in Object.prototype || "undefined" != typeof c &&
                    b.push([d, ":", c].join(""))
            });
            return b
        },
        am = function() {
            var a = Q().featureSet,
                b = oi();
            a.l && Bb(hf(a.j), function(c) {
                return Ql(c, b)
            })
        };
    var bm = function(a) {
        Vl(a, "od", Fl);
        Pl(Vl(a, "opac", Jl));
        Pl(Vl(a, "sbeos", Jl));
        Pl(Vl(a, "prf", Jl));
        Pl(Vl(a, "mwt", Jl));
        Vl(a, "iogeo", Jl)
    };
    var cm = !Zb && !xb();
    var dm = function() {
        this.j = this.Ya = null
    };
    var em = function() {};
    em.prototype.j = function() {
        return 0
    };
    em.prototype.o = function() {
        return 0
    };
    em.prototype.B = function() {
        return 0
    };
    em.prototype.l = function() {
        return 0
    };
    var gm = function() {
        if (!fm()) throw Error();
    };
    t(gm, em);
    var fm = function() {
        return !(!P || !P.performance)
    };
    gm.prototype.j = function() {
        return fm() && P.performance.now ? P.performance.now() : em.prototype.j.call(this)
    };
    gm.prototype.o = function() {
        return fm() && P.performance.memory ? P.performance.memory.totalJSHeapSize || 0 : em.prototype.o.call(this)
    };
    gm.prototype.B = function() {
        return fm() && P.performance.memory ? P.performance.memory.usedJSHeapSize || 0 : em.prototype.B.call(this)
    };
    gm.prototype.l = function() {
        return fm() && P.performance.memory ? P.performance.memory.jsHeapSizeLimit || 0 : em.prototype.l.call(this)
    };
    var hm = function() {};
    hm.prototype.isVisible = function() {
        return 1 === th(Dl)
    };
    var im = RegExp("^https?://(\\w|-)+\\.cdn\\.ampproject\\.(net|org)(\\?|/|$)"),
        mm = function(a) {
            a = a || jm();
            for (var b = new km(v.location.href, !1), c = null, d = a.length - 1, e = d; 0 <= e; --e) {
                var f = a[e];
                !c && im.test(f.url) && (c = f);
                if (f.url && !f.Pc) {
                    b = f;
                    break
                }
            }
            e = null;
            f = a.length && a[d].url;
            0 != b.depth && f && (e = a[d]);
            return new lm(b, e, c)
        },
        jm = function() {
            var a = v,
                b = [],
                c = null;
            do {
                var d = a;
                if (Hg(d)) {
                    var e = d.location.href;
                    c = d.document && d.document.referrer || null
                } else e = c, c = null;
                b.push(new km(e || ""));
                try {
                    a = d.parent
                } catch (f) {
                    a = null
                }
            } while (a &&
                d != a);
            d = 0;
            for (a = b.length - 1; d <= a; ++d) b[d].depth = a - d;
            d = v;
            if (d.location && d.location.ancestorOrigins && d.location.ancestorOrigins.length == b.length - 1)
                for (a = 1; a < b.length; ++a) e = b[a], e.url || (e.url = d.location.ancestorOrigins[a - 1] || "", e.Pc = !0);
            return b
        },
        lm = function(a, b, c) {
            this.j = a;
            this.l = b;
            this.o = c
        },
        km = function(a, b) {
            this.url = a;
            this.Pc = !!b;
            this.depth = null
        };
    var nm = function() {
            this.o = "&";
            this.l = {};
            this.B = 0;
            this.j = []
        },
        om = function(a, b) {
            var c = {};
            c[a] = b;
            return [c]
        },
        qm = function(a, b, c, d, e) {
            var f = [];
            Lg(a, function(g, h) {
                (g = pm(g, b, c, d, e)) && f.push(h + "=" + g)
            });
            return f.join(b)
        },
        pm = function(a, b, c, d, e) {
            if (null == a) return "";
            b = b || "&";
            c = c || ",$";
            "string" == typeof c && (c = c.split(""));
            if (a instanceof Array) {
                if (d = d || 0, d < c.length) {
                    for (var f = [], g = 0; g < a.length; g++) f.push(pm(a[g], b, c, d + 1, e));
                    return f.join(c[d])
                }
            } else if ("object" == typeof a) return e = e || 0, 2 > e ? encodeURIComponent(qm(a,
                b, c, d, e + 1)) : "...";
            return encodeURIComponent(String(a))
        },
        rm = function(a, b, c) {
            a.j.push(b);
            a.l[b] = c
        },
        sm = function(a, b, c, d) {
            a.j.push(b);
            a.l[b] = om(c, d)
        },
        um = function(a, b, c) {
            b = b + "//pagead2.googlesyndication.com" + c;
            var d = tm(a) - c.length;
            if (0 > d) return "";
            a.j.sort(function(m, x) {
                return m - x
            });
            c = null;
            for (var e = "", f = 0; f < a.j.length; f++)
                for (var g = a.j[f], h = a.l[g], k = 0; k < h.length; k++) {
                    if (!d) {
                        c = null == c ? g : c;
                        break
                    }
                    var n = qm(h[k], a.o, ",$");
                    if (n) {
                        n = e + n;
                        if (d >= n.length) {
                            d -= n.length;
                            b += n;
                            e = a.o;
                            break
                        }
                        c = null == c ? g : c
                    }
                }
            a = "";
            null != c &&
                (a = e + "trn=" + c);
            return b + a
        },
        tm = function(a) {
            var b = 1,
                c;
            for (c in a.l) b = c.length > b ? c.length : b;
            return 3997 - b - a.o.length - 1
        };
    var vm = function(a, b) {
            this.j = a;
            this.depth = b
        },
        xm = function() {
            var a = jm(),
                b = Math.max(a.length - 1, 0),
                c = mm(a);
            a = c.j;
            var d = c.l,
                e = c.o,
                f = [];
            c = function(h, k) {
                return null == h ? k : h
            };
            e && f.push(new vm([e.url, e.Pc ? 2 : 0], c(e.depth, 1)));
            d && d != e && f.push(new vm([d.url, 2], 0));
            a.url && a != e && f.push(new vm([a.url, 0], c(a.depth, b)));
            var g = Eb(f, function(h, k) {
                return f.slice(0, f.length - k)
            });
            !a.url || (e || d) && a != e || (d = Mg(a.url)) && g.push([new vm([d, 1], c(a.depth, b))]);
            g.push([]);
            return Eb(g, function(h) {
                return wm(b, h)
            })
        };

    function wm(a, b) {
        var c = Fb(b, function(e, f) {
                return Math.max(e, f.depth)
            }, -1),
            d = Tb(c + 2);
        d[0] = a;
        Bb(b, function(e) {
            return d[e.depth + 1] = e.j
        });
        return d
    }

    function ym() {
        var a = void 0 === a ? xm() : a;
        return a.map(function(b) {
            return pm(b)
        })
    };
    var zm = function() {
            this.l = new hm;
            this.j = fm() ? new gm : new em
        },
        Bm = function() {
            Am();
            var a = P.document;
            return !!(a && a.body && a.body.getBoundingClientRect && "function" === typeof P.setInterval && "function" === typeof P.clearInterval && "function" === typeof P.setTimeout && "function" === typeof P.clearTimeout)
        };
    zm.prototype.setTimeout = function(a, b) {
        return P.setTimeout(a, b)
    };
    zm.prototype.clearTimeout = function(a) {
        P.clearTimeout(a)
    };
    var Cm = function() {
        Am();
        return ym()
    };
    var Dm = function() {},
        Am = function() {
            var a = J(Dm);
            if (!a.j) {
                if (!P) throw Error("Context has not been set and window is undefined.");
                a.j = J(zm)
            }
            return a.j
        };
    var Em = function(a) {
        D.call(this, a)
    };
    t(Em, D);
    var Fm = [Em, 1, ye, 2, Be, 3, Be, 4, Be, 5, Ee];
    var Gm = function(a) {
            this.o = a;
            this.j = -1;
            this.l = this.B = 0
        },
        Hm = function(a, b) {
            return function() {
                var c = Ga.apply(0, arguments);
                if (-1 < a.j) return b.apply(null, ha(c));
                try {
                    return a.j = a.o.j.j(), b.apply(null, ha(c))
                } finally {
                    a.B += a.o.j.j() - a.j, a.j = -1, a.l += 1
                }
            }
        };
    var Im = function(a, b) {
        this.l = a;
        this.o = b;
        this.j = new Gm(a)
    };
    var Jm = function() {
            this.j = {}
        },
        Km = function() {
            var a = Q().flags.j[Cl.key];
            if ("proto" === Cl.valueType) {
                try {
                    var b = JSON.parse(a);
                    if (Array.isArray(b)) return b
                } catch (c) {}
                return Cl.defaultValue
            }
            return typeof a === typeof Cl.defaultValue ? a : Cl.defaultValue
        };
    var Lm = {
        hh: 1,
        Ih: 2,
        Wg: 3
    };
    var Mm = function() {
        this.o = void 0;
        this.l = this.C = 0;
        this.A = -1;
        this.featureSet = new Ul;
        Pl(Vl(this.featureSet, "mv", Ml)).j = void 0 === Nl ? null : Nl;
        Vl(this.featureSet, "omid", Jl);
        Pl(Vl(this.featureSet, "epoh", Jl));
        Pl(Vl(this.featureSet, "epph", Jl));
        Pl(Vl(this.featureSet, "umt", Jl)).j = void 0 === Kl ? null : Kl;
        Pl(Vl(this.featureSet, "phel", Jl));
        Pl(Vl(this.featureSet, "phell", Jl));
        Pl(Vl(this.featureSet, "oseid", Lm));
        var a = this.featureSet;
        a.j.sloi || (a.j.sloi = new Sl);
        Pl(a.j.sloi);
        Vl(this.featureSet, "mm", Hl);
        Pl(Vl(this.featureSet,
            "ovms", Gl));
        Pl(Vl(this.featureSet, "xdi", Jl));
        Pl(Vl(this.featureSet, "amp", Jl));
        Pl(Vl(this.featureSet, "prf", Jl));
        Pl(Vl(this.featureSet, "gtx", Jl));
        Pl(Vl(this.featureSet, "mvp_lv", Jl));
        Pl(Vl(this.featureSet, "ssmol", Jl)).j = void 0 === Ll ? null : Ll;
        Pl(Vl(this.featureSet, "fmd", Jl));
        this.j = new Im(Am(), this.featureSet);
        this.B = !1;
        this.flags = new Jm
    };
    Mm.prototype.bd = function(a) {
        if ("string" === typeof a && 0 != a.length) {
            var b = this.featureSet;
            if (b.l) {
                a = a.split("&");
                for (var c = a.length - 1; 0 <= c; c--) {
                    var d = a[c].split("="),
                        e = decodeURIComponent(d[0]);
                    1 < d.length ? (d = decodeURIComponent(d[1]), d = /^[0-9]+$/g.exec(d) ? parseInt(d, 10) : d) : d = 1;
                    (e = b.j[e]) && e.setValue(d)
                }
            }
        }
    };
    var Q = function() {
        return J(Mm)
    };
    var Nm = function(a, b, c, d, e) {
        if ((d ? a.o : Math.random()) < (e || a.j)) try {
            if (c instanceof nm) var f = c;
            else f = new nm, Lg(c, function(h, k) {
                var n = f,
                    m = n.B++;
                rm(n, m, om(k, h))
            });
            var g = um(f, a.l, "/pagead/gen_204?id=" + b + "&");
            g && (Am(), hh(P, g))
        } catch (h) {}
    };
    var Qm = function() {
        var a = Om;
        this.C = Pm;
        this.A = "jserror";
        this.o = !0;
        this.l = null;
        this.D = this.Oa;
        this.j = void 0 === a ? null : a;
        this.B = !1
    };
    l = Qm.prototype;
    l.vc = function(a) {
        this.l = a
    };
    l.gd = function(a) {
        this.A = a
    };
    l.hd = function(a) {
        this.o = a
    };
    l.jd = function(a) {
        this.B = a
    };
    l.jb = function(a, b, c) {
        var d = this;
        return Hm(Q().j.j, function() {
            try {
                if (d.j && d.j.o) {
                    var e = d.j.start(a.toString(), 3);
                    var f = b();
                    d.j.end(e)
                } else f = b()
            } catch (h) {
                var g = d.o;
                try {
                    Fh(e), g = d.D(a, new Rm(Sm(h)), void 0, c)
                } catch (k) {
                    d.Oa(217, k)
                }
                if (!g) throw h;
            }
            return f
        })()
    };
    l.cd = function(a, b, c, d) {
        var e = this;
        return Hm(Q().j.j, function() {
            var f = Ga.apply(0, arguments);
            return e.jb(a, function() {
                return b.apply(c, f)
            }, d)
        })
    };
    l.Oa = function(a, b, c, d, e) {
        e = e || this.A;
        try {
            var f = new nm;
            sm(f, 1, "context", a);
            lh(b) || (b = new Rm(Sm(b)));
            b.msg && sm(f, 2, "msg", b.msg.substring(0, 512));
            var g = b.meta || {};
            if (this.l) try {
                this.l(g)
            } catch (k) {}
            if (d) try {
                d(g)
            } catch (k) {}
            rm(f, 3, [g]);
            var h = mm();
            h.l && sm(f, 4, "top", h.l.url || "");
            rm(f, 5, [{
                url: h.j.url || ""
            }, {
                url: h.j.url ? tg(h.j.url) : ""
            }]);
            Nm(this.C, e, f, this.B, c)
        } catch (k) {
            try {
                Nm(this.C, e, {
                    context: "ecmserr",
                    rctx: a,
                    msg: Sm(k),
                    url: h && h.j.url
                }, this.B, c)
            } catch (n) {}
        }
        return this.o
    };
    var Sm = function(a) {
            var b = a.toString();
            a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name);
            a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message);
            if (a.stack) {
                a = a.stack;
                var c = b;
                try {
                    -1 == a.indexOf(c) && (a = c + "\n" + a);
                    for (var d; a != d;) d = a, a = a.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/, "$1");
                    b = a.replace(/\n */g, "\n")
                } catch (e) {
                    b = c
                }
            }
            return b
        },
        Rm = function(a) {
            kh.call(this, Error(a), {
                message: a
            })
        };
    t(Rm, kh);
    var Pm, Tm, Om = new Eh(1, window),
        Um = function() {
            P && "undefined" != typeof P.google_measure_js_timing && (P.google_measure_js_timing || Om.D())
        };
    Pm = new function() {
        var a = "https:";
        P && P.location && "http:" === P.location.protocol && (a = "http:");
        this.l = a;
        this.j = .01;
        this.o = Math.random()
    };
    Tm = new Qm;
    P && P.document && ("complete" == P.document.readyState ? Um() : Om.o && Ue(P, "load", function() {
        Um()
    }));
    var Vm = function(a) {
            Tm.vc(function(b) {
                Bb(a, function(c) {
                    c(b)
                })
            })
        },
        Wm = function(a, b) {
            return Tm.jb(a, b)
        },
        Xm = function(a, b, c, d) {
            return Tm.cd(a, b, c, d)
        },
        Ym = function(a, b, c, d) {
            Tm.Oa(a, b, c, d)
        };
    var Zm = Date.now(),
        $m = -1,
        an = -1,
        bn, cn = -1,
        dn = !1,
        en = function() {
            return Date.now() - Zm
        },
        fn = function() {
            var a = Q().o,
                b = 0 <= an ? en() - an : -1,
                c = dn ? en() - $m : -1,
                d = 0 <= cn ? en() - cn : -1;
            if (947190542 == a) return 100;
            if (79463069 == a) return 200;
            a = [2E3, 4E3];
            var e = [250, 500, 1E3];
            Ym(637, Error(), .001);
            var f = b; - 1 != c && c < b && (f = c);
            for (b = 0; b < a.length; ++b)
                if (f < a[b]) {
                    var g = e[b];
                    break
                }
            void 0 === g && (g = e[a.length]);
            return -1 != d && 1500 < d && 4E3 > d ? 500 : g
        };
    var gn = function(a, b, c) {
        var d = new H(0, 0, 0, 0);
        this.time = a;
        this.volume = null;
        this.o = b;
        this.j = d;
        this.l = c
    };
    var hn = function(a, b, c, d, e, f, g) {
        this.o = a;
        this.l = b;
        this.A = c;
        this.j = d;
        this.B = e;
        this.D = f;
        this.C = g
    };
    hn.prototype.getTimestamp = function() {
        return this.D
    };
    var jn = {
            currentTime: 1,
            duration: 2,
            isVpaid: 4,
            volume: 8,
            isYouTube: 16,
            isPlaying: 32
        },
        of = {
            xd: "start",
            FIRST_QUARTILE: "firstquartile",
            MIDPOINT: "midpoint",
            THIRD_QUARTILE: "thirdquartile",
            COMPLETE: "complete",
            me: "error",
            se: "metric",
            wd: "pause",
            Ce: "resume",
            SKIPPED: "skip",
            VIEWABLE_IMPRESSION: "viewable_impression",
            te: "mute",
            Ge: "unmute",
            FULLSCREEN: "fullscreen",
            ne: "exitfullscreen",
            ge: "bufferstart",
            fe: "bufferfinish",
            pd: "fully_viewable_audible_half_duration_impression",
            ud: "measurable_impression",
            ae: "abandon",
            od: "engagedview",
            IMPRESSION: "impression",
            ie: "creativeview",
            LOADED: "loaded",
            jh: "progress",
            ag: "close",
            bg: "collapse",
            ue: "overlay_resize",
            we: "overlay_unmeasurable_impression",
            xe: "overlay_unviewable_impression",
            ze: "overlay_viewable_immediate_impression",
            ye: "overlay_viewable_end_of_session_impression",
            je: "custom_metric_viewable",
            ah: "verification_debug",
            ce: "audio_audible",
            ee: "audio_measurable",
            de: "audio_impression"
        },
        kn = "start firstquartile midpoint thirdquartile resume loaded".split(" "),
        ln = ["start", "firstquartile", "midpoint",
            "thirdquartile"
        ],
        mn = ["abandon"],
        nn = {
            Ch: -1,
            xd: 0,
            FIRST_QUARTILE: 1,
            MIDPOINT: 2,
            THIRD_QUARTILE: 3,
            COMPLETE: 4,
            se: 5,
            wd: 6,
            Ce: 7,
            SKIPPED: 8,
            VIEWABLE_IMPRESSION: 9,
            te: 10,
            Ge: 11,
            FULLSCREEN: 12,
            ne: 13,
            pd: 14,
            ud: 15,
            ae: 16,
            od: 17,
            IMPRESSION: 18,
            ie: 19,
            LOADED: 20,
            je: 21,
            ge: 22,
            fe: 23,
            de: 27,
            ee: 28,
            ce: 29
        };
    var gf = {
            Tf: "addEventListener",
            sg: "getMaxSize",
            tg: "getScreenSize",
            ug: "getState",
            vg: "getVersion",
            kh: "removeEventListener",
            Pg: "isViewable"
        },
        on = function(a) {
            var b = a !== a.top,
                c = a.top === Tg(a),
                d = -1,
                e = 0;
            if (b && c && a.top.mraid) {
                d = 3;
                var f = a.top.mraid
            } else d = (f = a.mraid) ? b ? c ? 2 : 1 : 0 : -1;
            f && (f.IS_GMA_SDK || (e = 2), ff(function(g) {
                return "function" === typeof f[g]
            }) || (e = 1));
            return {
                ya: f,
                compatibility: e,
                Gf: d
            }
        };
    var pn = function() {
        var a = window.document;
        return a && "function" === typeof a.elementFromPoint
    };

    function qn(a, b, c) {
        try {
            a && (b = b.top);
            var d = b;
            a && null !== d && d != d.top && (d = d.top);
            try {
                var e = (void 0 === c ? 0 : c) ? (new F(d.innerWidth, d.innerHeight)).round() : gg(d || window).round()
            } catch (m) {
                e = new F(-12245933, -12245933)
            }
            a = e;
            var f = a.height,
                g = a.width;
            if (-12245933 === g) return new H(g, g, g, g);
            var h = hg(bg(b.document).j),
                k = h.x,
                n = h.y;
            return new H(n, k + g, n + f, k)
        } catch (m) {
            return new H(-12245933, -12245933, -12245933, -12245933)
        }
    };
    var rn = function(a, b) {
        b = Math.pow(10, b);
        return Math.floor(a * b) / b
    };

    function sn(a, b, c, d) {
        if (!a) return {
            value: d,
            done: !1
        };
        d = b(d, a);
        var e = c(d, a);
        return !e && Vb(a, "parentElement") ? sn(mg(a), b, c, d) : {
            done: e,
            value: d
        }
    }
    var tn = function(a, b, c, d) {
        if (!a) return d;
        d = sn(a, b, c, d);
        if (!d.done) try {
            var e = ag(a),
                f = e && G(e);
            return tn(f && f.frameElement, b, c, d.value)
        } catch (g) {}
        return d.value
    };

    function un(a) {
        var b = !Zb || pc();
        return tn(a, function(c, d) {
            c = Vb(d, "style") && d.style && Sk(d, "visibility");
            return {
                hidden: "hidden" === c,
                visible: b && "visible" === c
            }
        }, function(c) {
            return c.hidden || c.visible
        }, {
            hidden: !1,
            visible: !1
        }).hidden
    }
    var vn = function(a) {
            return tn(a, function(b, c) {
                return !(!Vb(c, "style") || !c.style || "none" !== Sk(c, "display"))
            }, function(b) {
                return b
            }, !1) ? !0 : un(a)
        },
        wn = function(a) {
            return new H(a.top, a.right, a.bottom, a.left)
        },
        xn = function(a) {
            var b = a.top || 0,
                c = a.left || 0;
            return new H(b, c + (a.width || 0), b + (a.height || 0), c)
        },
        yn = function(a) {
            return null != a && 0 <= a && 1 >= a
        };

    function zn() {
        var a = ub();
        return a ? Gb("Android TV;AppleTV;Apple TV;GoogleTV;HbbTV;NetCast.TV;Opera TV;POV_TV;SMART-TV;SmartTV;TV Store;AmazonWebAppPlatform;MiBOX".split(";"), function(b) {
            return rb(a, b)
        }) || rb(a, "OMI/") && !rb(a, "XiaoMi/") ? !0 : rb(a, "Presto") && rb(a, "Linux") && !rb(a, "X11") && !rb(a, "Android") && !rb(a, "Mobi") : !1
    }

    function An() {
        var a = ub();
        return rb(a, "AppleTV") || rb(a, "Apple TV") || rb(a, "CFNetwork") || rb(a, "tvOS")
    }

    function Bn() {
        var a;
        (a = rb(ub(), "CrKey") || rb(ub(), "PlayStation") || rb(ub(), "Roku") || zn() || rb(ub(), "Xbox") || An()) || (a = ub(), a = rb(a, "sdk_google_atv_x86") || rb(a, "Android TV"));
        return a
    };
    var Cn = function() {
            this.o = !Hg(P.top);
            this.isMobileDevice = qg() || rg();
            var a = jm();
            a = 0 < a.length && null != a[a.length - 1] && null != a[a.length - 1].url ? ((a = a[a.length - 1].url.match(sg)[3] || null) ? decodeURI(a) : a) || "" : "";
            this.domain = a;
            this.j = new H(0, 0, 0, 0);
            this.A = new F(0, 0);
            this.B = new F(0, 0);
            this.D = new H(0, 0, 0, 0);
            this.C = 0;
            this.J = !1;
            this.l = !(!P || !on(P).ya);
            this.update(P)
        },
        Dn = function(a, b) {
            b && b.screen && (a.A = new F(b.screen.width, b.screen.height))
        },
        En = function(a, b) {
            var c = a.j ? new F(a.j.getWidth(), a.j.getHeight()) : new F(0,
                0);
            b = void 0 === b ? P : b;
            null !== b && b != b.top && (b = b.top);
            var d = 0,
                e = 0;
            try {
                var f = b.document,
                    g = f.body,
                    h = f.documentElement;
                if ("CSS1Compat" == f.compatMode && h.scrollHeight) d = h.scrollHeight != c.height ? h.scrollHeight : h.offsetHeight, e = h.scrollWidth != c.width ? h.scrollWidth : h.offsetWidth;
                else {
                    var k = h.scrollHeight,
                        n = h.scrollWidth,
                        m = h.offsetHeight,
                        x = h.offsetWidth;
                    h.clientHeight != m && (k = g.scrollHeight, n = g.scrollWidth, m = g.offsetHeight, x = g.offsetWidth);
                    k > c.height ? k > m ? (d = k, e = n) : (d = m, e = x) : k < m ? (d = k, e = n) : (d = m, e = x)
                }
                var u = new F(e,
                    d)
            } catch (y) {
                u = new F(-12245933, -12245933)
            }
            a.B = u
        };
    Cn.prototype.update = function(a) {
        a && a.document && (this.D = qn(!1, a, this.isMobileDevice), this.j = qn(!0, a, this.isMobileDevice), En(this, a), Dn(this, a))
    };
    var Gn = function() {
            var a = Fn();
            if (0 < a.C || a.J) return !0;
            a = Am().l.isVisible();
            var b = 0 === th(Dl);
            return a || b
        },
        Fn = function() {
            return J(Cn)
        };
    var Hn = function(a) {
        this.o = a;
        this.l = 0;
        this.j = null
    };
    Hn.prototype.cancel = function() {
        Am().clearTimeout(this.j);
        this.j = null
    };
    Hn.prototype.schedule = function() {
        var a = this,
            b = Am(),
            c = Q().j.j;
        this.j = b.setTimeout(Hm(c, Xm(143, function() {
            a.l++;
            a.o.sample()
        })), fn())
    };
    var In = function(a, b, c) {
        this.o = a;
        this.qa = void 0 === c ? "na" : c;
        this.A = [];
        this.isInitialized = !1;
        this.B = new gn(-1, !0, this);
        this.j = this;
        this.M = b;
        this.I = this.F = !1;
        this.X = "uk";
        this.N = !1;
        this.D = !0
    };
    In.prototype.G = function() {
        return !1
    };
    In.prototype.initialize = function() {
        return this.isInitialized = !0
    };
    In.prototype.sb = function() {
        return this.j.X
    };
    In.prototype.Jb = function() {
        return this.j.I
    };
    var Kn = function(a, b, c) {
        if (!a.I || (void 0 === c ? 0 : c)) a.I = !0, a.X = b, a.M = 0, a.j != a || Jn(a)
    };
    In.prototype.getName = function() {
        return this.j.qa
    };
    In.prototype.Va = function() {
        return this.j.Y()
    };
    In.prototype.Y = function() {
        return {}
    };
    In.prototype.La = function() {
        return this.j.M
    };
    var Ln = function(a, b) {
        Kb(a.A, b) || (a.A.push(b), b.ub(a.j), b.Wa(a.B), b.Ha() && (a.F = !0))
    };
    In.prototype.P = function() {
        var a = Fn();
        a.j = qn(!0, this.o, a.isMobileDevice)
    };
    In.prototype.U = function() {
        Dn(Fn(), this.o)
    };
    In.prototype.Z = function() {
        return this.B.j
    };
    var Mn = function(a) {
        a = a.j;
        a.U();
        a.P();
        var b = Fn();
        b.D = qn(!1, a.o, b.isMobileDevice);
        En(Fn(), a.o);
        a.B.j = a.Z()
    };
    In.prototype.sample = function() {};
    In.prototype.isActive = function() {
        return this.j.D
    };
    var Nn = function(a) {
            a.F = a.A.length ? Gb(a.A, function(b) {
                return b.Ha()
            }) : !1
        },
        On = function(a) {
            var b = Pb(a.A);
            Bb(b, function(c) {
                c.Wa(a.B)
            })
        },
        Jn = function(a) {
            var b = Pb(a.A);
            Bb(b, function(c) {
                c.ub(a.j)
            });
            a.j != a || On(a)
        };
    l = In.prototype;
    l.ub = function(a) {
        var b = this.j;
        this.j = a.La() >= this.M ? a : this;
        b !== this.j ? (this.D = this.j.D, Jn(this)) : this.D !== this.j.D && (this.D = this.j.D, Jn(this))
    };
    l.Wa = function(a) {
        if (a.l === this.j) {
            var b = this.B,
                c = this.F;
            if (c = a && (void 0 === c || !c || b.volume == a.volume) && b.o == a.o) b = b.j, c = a.j, c = b == c ? !0 : b && c ? b.top == c.top && b.right == c.right && b.bottom == c.bottom && b.left == c.left : !1;
            this.B = a;
            !c && On(this)
        }
    };
    l.Ha = function() {
        return this.F
    };
    l.W = function() {
        this.N = !0
    };
    l.xa = function() {
        return this.N
    };
    var Pn = function(a, b, c, d) {
        this.element = a;
        this.j = new H(0, 0, 0, 0);
        this.B = new H(0, 0, 0, 0);
        this.l = b;
        this.featureSet = c;
        this.G = d;
        this.F = !1;
        this.timestamp = -1;
        this.D = new hn(b.B, this.j, new H(0, 0, 0, 0), 0, 0, en(), 0)
    };
    l = Pn.prototype;
    l.Cc = function() {
        return !0
    };
    l.Qb = function() {};
    l.W = function() {
        if (!this.xa()) {
            var a = this.l;
            Lb(a.A, this);
            a.F && this.Ha() && Nn(a);
            this.Qb();
            this.F = !0
        }
    };
    l.xa = function() {
        return this.F
    };
    l.Va = function() {
        return this.l.Va()
    };
    l.La = function() {
        return this.l.La()
    };
    l.sb = function() {
        return this.l.sb()
    };
    l.Jb = function() {
        return this.l.Jb()
    };
    l.ub = function() {};
    l.Wa = function() {
        this.Ua()
    };
    l.Ha = function() {
        return this.G
    };
    var Qn = function(a) {
        this.A = !1;
        this.j = a;
        this.B = function() {}
    };
    l = Qn.prototype;
    l.La = function() {
        return this.j.La()
    };
    l.sb = function() {
        return this.j.sb()
    };
    l.Jb = function() {
        return this.j.Jb()
    };
    l.create = function(a, b, c) {
        var d = null;
        this.j && (d = this.Rb(a, b, c), Ln(this.j, d));
        return d
    };
    l.qd = function() {
        return this.Db()
    };
    l.Db = function() {
        return !1
    };
    l.init = function(a) {
        return this.j.initialize() ? (Ln(this.j, this), this.B = a, !0) : !1
    };
    l.ub = function(a) {
        0 == a.La() && this.B(a.sb(), this)
    };
    l.Wa = function() {};
    l.Ha = function() {
        return !1
    };
    l.W = function() {
        this.A = !0
    };
    l.xa = function() {
        return this.A
    };
    l.Va = function() {
        return {}
    };
    var Rn = function(a, b, c) {
            this.l = void 0 === c ? 0 : c;
            this.j = a;
            this.V = null == b ? "" : b
        },
        Sn = function(a) {
            switch (Math.trunc(a.l)) {
                case -16:
                    return -16;
                case -8:
                    return -8;
                case 0:
                    return 0;
                case 8:
                    return 8;
                case 16:
                    return 16;
                default:
                    return 16
            }
        },
        Tn = function(a, b) {
            return a.l < b.l ? !0 : a.l > b.l ? !1 : a.j < b.j ? !0 : a.j > b.j ? !1 : typeof a.V < typeof b.V ? !0 : typeof a.V > typeof b.V ? !1 : a.V < b.V
        };
    var Un = function() {
        this.o = 0;
        this.j = [];
        this.l = !1
    };
    Un.prototype.add = function(a, b, c) {
        ++this.o;
        a = new Rn(a, b, c);
        this.j.push(new Rn(a.j, a.V, a.l + this.o / 4096));
        this.l = !0;
        return this
    };
    var Vn = function(a, b) {
            Bb(b.j, function(c) {
                a.add(c.j, c.V, Sn(c))
            })
        },
        Wn = function(a, b) {
            var c = void 0 === c ? 0 : c;
            var d = void 0 === d ? !0 : d;
            Lg(b, function(e, f) {
                d && void 0 === e || a.add(f, e, c)
            });
            return a
        },
        Yn = function(a) {
            var b = Xn;
            a.l && (Rb(a.j, function(c, d) {
                return Tn(d, c) ? 1 : Tn(c, d) ? -1 : 0
            }), a.l = !1);
            return Fb(a.j, function(c, d) {
                d = b(d);
                return "" + c + ("" != c && "" != d ? "&" : "") + d
            }, "")
        };
    var Xn = function(a) {
        var b = a.j;
        a = a.V;
        return "" === a ? b : "boolean" === typeof a ? a ? b : "" : Array.isArray(a) ? 0 === a.length ? b : b + "=" + a.join() : b + "=" + (Kb(["mtos", "tos", "p"], b) ? a : encodeURIComponent(a))
    };
    var Zn = function(a) {
        var b = void 0 === b ? !0 : b;
        this.j = new Un;
        void 0 !== a && Vn(this.j, a);
        b && this.j.add("v", Bl, -16)
    };
    Zn.prototype.toString = function() {
        var a = "//pagead2.googlesyndication.com//pagead/gen_204",
            b = Yn(this.j);
        0 < b.length && (a += "?" + b);
        return a
    };
    var $n = function(a) {
            var b = [],
                c = [];
            af(a, function(d, e) {
                if (!(e in Object.prototype) && "undefined" != typeof d) switch (Array.isArray(d) && (d = d.join(",")), d = [e, "=", d].join(""), e) {
                    case "adk":
                    case "r":
                    case "tt":
                    case "error":
                    case "mtos":
                    case "tos":
                    case "p":
                    case "bs":
                        b.unshift(d);
                        break;
                    case "req":
                    case "url":
                    case "referrer":
                    case "iframe_loc":
                        c.push(d);
                        break;
                    default:
                        b.push(d)
                }
            });
            return b.concat(c)
        },
        ao = function() {
            if (Bl && "unreleased" !== Bl) return Bl
        },
        bo = function(a) {
            var b = void 0 === b ? 4E3 : b;
            a = a.toString();
            if (!/&v=[^&]+/.test(a)) {
                var c =
                    ao();
                a = c ? a + "&v=" + encodeURIComponent(c) : a
            }
            b = a = a.substring(0, b);
            Am();
            hh(P, b)
        };
    var co = function() {
        this.j = 0
    };
    var eo = function(a, b, c) {
        Bb(a.o, function(d) {
            var e = a.j;
            if (!d.j && (d.o(b, c), d.B())) {
                d.j = !0;
                var f = d.l(),
                    g = new Un;
                g.add("id", "av-js");
                g.add("type", "verif");
                g.add("vtype", d.A);
                d = J(co);
                g.add("i", d.j++);
                g.add("adk", e);
                Wn(g, f);
                e = new Zn(g);
                bo(e)
            }
        })
    };
    var fo = function() {
        this.l = this.o = this.B = this.j = 0
    };
    fo.prototype.update = function(a, b, c) {
        a && (this.j += b, this.l += b, this.B += b, this.o = Math.max(this.o, this.B));
        if (void 0 === c ? !a : c) this.B = 0
    };
    var go = [1, .75, .5, .3, 0],
        ho = function(a) {
            this.l = a = void 0 === a ? go : a;
            this.j = Eb(this.l, function() {
                return new fo
            })
        },
        jo = function(a, b) {
            return io(a, function(c) {
                return c.j
            }, void 0 === b ? !0 : b)
        },
        lo = function(a, b) {
            return ko(a, b, function(c) {
                return c.j
            })
        },
        mo = function(a, b) {
            return io(a, function(c) {
                return c.o
            }, void 0 === b ? !0 : b)
        },
        no = function(a, b) {
            return ko(a, b, function(c) {
                return c.o
            })
        },
        oo = function(a, b) {
            return ko(a, b, function(c) {
                return c.l
            })
        },
        po = function(a) {
            Bb(a.j, function(b) {
                b.l = 0
            })
        };
    ho.prototype.update = function(a, b, c, d, e, f) {
        f = void 0 === f ? !0 : f;
        b = e ? Math.min(a, b) : b;
        for (e = 0; e < this.l.length; e++) {
            var g = this.l[e],
                h = 0 < b && b >= g;
            g = !(0 < a && a >= g) || c;
            this.j[e].update(f && h, d, !f || g)
        }
    };
    var io = function(a, b, c) {
            a = Eb(a.j, function(d) {
                return b(d)
            });
            return c ? a : qo(a)
        },
        ko = function(a, b, c) {
            var d = Jb(a.l, function(e) {
                return b <= e
            });
            return -1 == d ? 0 : c(a.j[d])
        },
        qo = function(a) {
            return Eb(a, function(b, c, d) {
                return 0 < c ? d[c] - d[c - 1] : d[c]
            })
        };
    var ro = function() {
            this.l = new ho;
            this.U = new fo;
            this.G = this.D = -1;
            this.Z = 1E3;
            this.ba = new ho([1, .9, .8, .7, .6, .5, .4, .3, .2, .1, 0]);
            this.L = this.I = -1
        },
        so = function(a, b) {
            return mo(a.l, void 0 === b ? !0 : b)
        };
    ro.prototype.update = function(a, b, c, d) {
        this.D = -1 != this.D ? Math.min(this.D, b.aa) : b.aa;
        this.G = Math.max(this.G, b.aa);
        this.I = -1 != this.I ? Math.min(this.I, b.pa) : b.pa;
        this.L = Math.max(this.L, b.pa);
        this.ba.update(b.pa, c.pa, b.j, a, d);
        this.l.update(b.aa, c.aa, b.j, a, d);
        c = d || c.ib != b.ib ? c.isVisible() && b.isVisible() : c.isVisible();
        b = !b.isVisible() || b.j;
        this.U.update(c, a, b)
    };
    ro.prototype.Na = function() {
        return this.U.o >= this.Z
    };
    if (Dl && Dl.URL) {
        var to = Dl.URL,
            uo;
        if (uo = !!to) {
            var vo;
            a: {
                if (to) {
                    var wo = RegExp(".*[&#?]google_debug(=[^&]*)?(&.*)?$");
                    try {
                        var xo = wo.exec(decodeURIComponent(to));
                        if (xo) {
                            vo = xo[1] && 1 < xo[1].length ? xo[1].substring(1) : "true";
                            break a
                        }
                    } catch (a) {}
                }
                vo = ""
            }
            uo = 0 < vo.length
        }
        Tm.hd(!uo)
    }
    var yo = function(a, b, c, d) {
        var e = void 0 === e ? !1 : e;
        c = Xm(d, c);
        Ue(a, b, c, {
            capture: e
        })
    };
    var zo = new H(0, 0, 0, 0);

    function Ao(a, b) {
        b = Bo(b);
        return 0 === b ? 0 : Bo(a) / b
    }

    function Bo(a) {
        return Math.max(a.bottom - a.top, 0) * Math.max(a.right - a.left, 0)
    }

    function Co(a, b) {
        if (!a || !b) return !1;
        for (var c = 0; null !== a && 100 > c++;) {
            if (a === b) return !0;
            try {
                if (a = mg(a) || a) {
                    var d = ag(a),
                        e = d && G(d),
                        f = e && e.frameElement;
                    f && (a = f)
                }
            } catch (g) {
                break
            }
        }
        return !1
    }

    function Do(a, b, c) {
        if (!a || !b) return !1;
        b = Vg(Ug(a), -b.left, -b.top);
        a = (b.left + b.right) / 2;
        b = (b.top + b.bottom) / 2;
        Hg(window.top) && window.top && window.top.document && (window = window.top);
        if (!pn()) return !1;
        a = window.document.elementFromPoint(a, b);
        if (!a) return !1;
        b = (b = (b = ag(c)) && b.defaultView && b.defaultView.frameElement) && Co(b, a);
        var d = a === c;
        a = !d && a && pg(a, function(e) {
            return e === c
        });
        return !(b || d || a)
    }

    function Eo(a, b, c, d) {
        return Fn().o ? !1 : 0 >= a.getWidth() || 0 >= a.getHeight() ? !0 : c && d ? Wm(208, function() {
            return Do(a, b, c)
        }) : !1
    };
    var Fo = new H(0, 0, 0, 0),
        Ho = function(a, b, c) {
            E.call(this);
            this.position = Ug(Fo);
            this.kc = this.cc();
            this.Rc = -2;
            this.Kf = Date.now();
            this.Xd = -1;
            this.lastUpdateTime = b;
            this.ec = null;
            this.Hb = !1;
            this.tc = null;
            this.opacity = -1;
            this.requestSource = c;
            this.Lf = !1;
            this.Tc = function() {};
            this.Yd = function() {};
            this.sa = new dm;
            this.sa.Ya = a;
            this.sa.j = a;
            this.Ma = !1;
            this.bb = {
                Wc: null,
                Vc: null
            };
            this.Vd = !0;
            this.Pb = null;
            this.vb = this.lf = !1;
            Q().C++;
            this.na = this.Lc();
            this.Wd = -1;
            this.fa = null;
            this.hasCompleted = this.jf = !1;
            this.featureSet = new Ul;
            bm(this.featureSet);
            Go(this);
            1 == this.requestSource ? Xl(this.featureSet, "od", 1) : Xl(this.featureSet, "od", 0)
        };
    t(Ho, E);
    Ho.prototype.O = function() {
        this.sa.j && (this.bb.Wc && (Ve(this.sa.j, "mouseover", this.bb.Wc), this.bb.Wc = null), this.bb.Vc && (Ve(this.sa.j, "mouseout", this.bb.Vc), this.bb.Vc = null));
        this.Pb && this.Pb.W();
        this.fa && this.fa.W();
        delete this.kc;
        delete this.Tc;
        delete this.Yd;
        delete this.sa.Ya;
        delete this.sa.j;
        delete this.bb;
        delete this.Pb;
        delete this.fa;
        delete this.featureSet;
        E.prototype.O.call(this)
    };
    Ho.prototype.fb = function() {
        return this.fa ? this.fa.j : this.position
    };
    Ho.prototype.bd = function(a) {
        Q().bd(a)
    };
    var Go = function(a) {
        a = a.sa.Ya;
        var b;
        if (b = a && a.getAttribute) b = /-[a-z]/.test("googleAvInapp") ? !1 : cm && a.dataset ? "googleAvInapp" in a.dataset : a.hasAttribute ? a.hasAttribute("data-" + Xf()) : !!a.getAttribute("data-" + Xf());
        b && (Fn().l = !0)
    };
    Ho.prototype.Ha = function() {
        return !1
    };
    Ho.prototype.cc = function() {
        return new ro
    };
    Ho.prototype.ma = function() {
        return this.kc
    };
    var Io = function(a, b) {
            b != a.vb && (a.vb = b, a = Fn(), b ? a.C++ : 0 < a.C && a.C--)
        },
        Jo = function(a, b) {
            if (a.fa) {
                if (b.getName() === a.fa.getName()) return;
                a.fa.W();
                a.fa = null
            }
            b = b.create(a.sa.j, a.featureSet, a.Ha());
            if (b = null != b && b.Cc() ? b : null) a.fa = b
        },
        Ko = function(a, b, c) {
            if (!a.ec || -1 == a.lastUpdateTime || -1 === b.getTimestamp() || -1 === a.ec.getTimestamp()) return 0;
            a = b.getTimestamp() - a.ec.getTimestamp();
            return a > c ? 0 : a
        };
    Ho.prototype.Ld = function(a) {
        return Ko(this, a, 1E4)
    };
    var Lo = function(a, b, c) {
            if (a.fa) {
                a.fa.Ua();
                var d = a.fa.D,
                    e = d.o,
                    f = e.j;
                if (null != d.A) {
                    var g = d.l;
                    a.tc = new Qf(g.left - f.left, g.top - f.top)
                }
                f = a.wc() ? Math.max(d.j, d.B) : d.j;
                g = {};
                null !== e.volume && (g.volume = e.volume);
                e = a.Ld(d);
                a.ec = d;
                a.ld(f, b, c, !1, g, e, d.C)
            }
        },
        Mo = function(a) {
            if (a.Hb && a.Pb) {
                var b = 1 == Yl(a.featureSet, "od"),
                    c = Fn().j,
                    d = a.Pb,
                    e = a.fa ? a.fa.getName() : "ns",
                    f = new F(c.getWidth(), c.getHeight());
                c = a.wc();
                a = {
                    If: e,
                    tc: a.tc,
                    Rf: f,
                    wc: c,
                    aa: a.na.aa,
                    Nf: b
                };
                if (b = d.l) {
                    b.Ua();
                    e = b.D;
                    f = e.o.j;
                    var g = null,
                        h = null;
                    null != e.A && f && (g =
                        e.l, g = new Qf(g.left - f.left, g.top - f.top), h = new F(f.right - f.left, f.bottom - f.top));
                    e = c ? Math.max(e.j, e.B) : e.j;
                    c = {
                        If: b.getName(),
                        tc: g,
                        Rf: h,
                        wc: c,
                        Nf: !1,
                        aa: e
                    }
                } else c = null;
                c && eo(d, a, c)
            }
        };
    l = Ho.prototype;
    l.ld = function(a, b, c, d, e, f, g) {
        this.Ma || (this.Hb && (a = this.Ec(a, c, e, g), d = d && this.na.aa >= (this.ib() ? .3 : .5), this.md(f, a, d), this.lastUpdateTime = b, 0 < a.aa && -1 === this.Wd && (this.Wd = b), -1 == this.Xd && this.Na() && (this.Xd = b), -2 == this.Rc && (this.Rc = Bo(this.fb()) ? a.aa : -1), this.na = a), this.Tc(this))
    };
    l.md = function(a, b, c) {
        this.ma().update(a, b, this.na, c)
    };
    l.Lc = function() {
        return new Il
    };
    l.Ec = function(a, b, c, d) {
        c = this.Lc();
        c.j = b;
        b = Am().l;
        b = 0 === th(Dl) ? -1 : b.isVisible() ? 0 : 1;
        c.l = b;
        c.aa = this.Gc(a);
        c.ib = this.ib();
        c.pa = d;
        return c
    };
    l.Gc = function(a) {
        return 0 === this.opacity && 1 === Yl(this.featureSet, "opac") ? 0 : a
    };
    l.ib = function() {
        return !1
    };
    l.wc = function() {
        return this.jf || this.lf
    };
    l.va = function() {
        return 0
    };
    l.Na = function() {
        return this.kc.Na()
    };
    l.Md = function() {
        var a = this.Hb;
        a = (this.hasCompleted || this.xa()) && !a;
        var b = 2 !== Q().l || this.Lf;
        return this.Ma || b && a ? 2 : this.Na() ? 4 : 3
    };
    l.ac = function() {
        return 0
    };
    var No = function(a, b, c) {
        b && (a.Tc = b);
        c && (a.Yd = c)
    };
    var Oo = function() {};
    Oo.prototype.next = function() {
        return Po
    };
    var Po = {
        done: !0,
        value: void 0
    };
    Oo.prototype.nb = function() {
        return this
    };
    var Qo = function() {
            this.B = this.j = this.o = this.l = this.A = 0
        },
        Ro = function(a) {
            var b = {};
            b = (b.ptlt = Wa() - a.A, b);
            var c = a.l;
            c && (b.pnk = c);
            (c = a.o) && (b.pnc = c);
            (c = a.B) && (b.pnmm = c);
            (a = a.j) && (b.pns = a);
            return b
        };
    var So = function() {
        Il.call(this);
        this.fullscreen = !1;
        this.volume = void 0;
        this.paused = !1;
        this.mediaTime = -1
    };
    t(So, Il);
    var To = function(a) {
        return yn(a.volume) && 0 < a.volume
    };
    var Vo = function(a, b, c, d) {
            c = void 0 === c ? !0 : c;
            d = void 0 === d ? function() {
                return !0
            } : d;
            return function(e) {
                var f = e[a];
                if (Array.isArray(f) && d(e)) return Uo(f, b, c)
            }
        },
        Wo = function(a, b) {
            return function(c) {
                return b(c) ? c[a] : void 0
            }
        },
        Xo = function(a) {
            return function(b) {
                for (var c = 0; c < a.length; c++)
                    if (a[c] === b.e || void 0 === a[c] && !b.hasOwnProperty("e")) return !0;
                return !1
            }
        },
        Uo = function(a, b, c) {
            return void 0 === c || c ? Db(a, function(d, e) {
                return Kb(b, e)
            }) : Eb(b, function(d, e, f) {
                return a.slice(0 < e ? f[e - 1] + 1 : 0, d + 1).reduce(function(g, h) {
                    return g +
                        h
                }, 0)
            })
        };
    var Yo = Xo([void 0, 1, 2, 3, 4, 8, 16]),
        Zo = Xo([void 0, 4, 8, 16]),
        $o = {
            sv: "sv",
            v: "v",
            cb: "cb",
            e: "e",
            nas: "nas",
            msg: "msg",
            "if": "if",
            sdk: "sdk",
            p: "p",
            p0: Wo("p0", Zo),
            p1: Wo("p1", Zo),
            p2: Wo("p2", Zo),
            p3: Wo("p3", Zo),
            cp: "cp",
            tos: "tos",
            mtos: "mtos",
            amtos: "amtos",
            mtos1: Vo("mtos1", [0, 2, 4], !1, Zo),
            mtos2: Vo("mtos2", [0, 2, 4], !1, Zo),
            mtos3: Vo("mtos3", [0, 2, 4], !1, Zo),
            mcvt: "mcvt",
            ps: "ps",
            scs: "scs",
            bs: "bs",
            vht: "vht",
            mut: "mut",
            a: "a",
            a0: Wo("a0", Zo),
            a1: Wo("a1", Zo),
            a2: Wo("a2", Zo),
            a3: Wo("a3", Zo),
            ft: "ft",
            dft: "dft",
            at: "at",
            dat: "dat",
            as: "as",
            vpt: "vpt",
            gmm: "gmm",
            std: "std",
            efpf: "efpf",
            swf: "swf",
            nio: "nio",
            px: "px",
            nnut: "nnut",
            vmer: "vmer",
            vmmk: "vmmk",
            vmiec: "vmiec",
            nmt: "nmt",
            tcm: "tcm",
            bt: "bt",
            pst: "pst",
            vpaid: "vpaid",
            dur: "dur",
            vmtime: "vmtime",
            dtos: "dtos",
            dtoss: "dtoss",
            dvs: "dvs",
            dfvs: "dfvs",
            dvpt: "dvpt",
            fmf: "fmf",
            vds: "vds",
            is: "is",
            i0: "i0",
            i1: "i1",
            i2: "i2",
            i3: "i3",
            ic: "ic",
            cs: "cs",
            c: "c",
            c0: Wo("c0", Zo),
            c1: Wo("c1", Zo),
            c2: Wo("c2", Zo),
            c3: Wo("c3", Zo),
            mc: "mc",
            nc: "nc",
            mv: "mv",
            nv: "nv",
            qmt: Wo("qmtos", Yo),
            qnc: Wo("qnc", Yo),
            qmv: Wo("qmv", Yo),
            qnv: Wo("qnv", Yo),
            raf: "raf",
            rafc: "rafc",
            lte: "lte",
            ces: "ces",
            tth: "tth",
            femt: "femt",
            femvt: "femvt",
            emc: "emc",
            emuc: "emuc",
            emb: "emb",
            avms: "avms",
            nvat: "nvat",
            qi: "qi",
            psm: "psm",
            psv: "psv",
            psfv: "psfv",
            psa: "psa",
            pnk: "pnk",
            pnc: "pnc",
            pnmm: "pnmm",
            pns: "pns",
            ptlt: "ptlt",
            pngs: "pings",
            veid: "veid",
            ssb: "ssb",
            ss0: Wo("ss0", Zo),
            ss1: Wo("ss1", Zo),
            ss2: Wo("ss2", Zo),
            ss3: Wo("ss3", Zo),
            dc_rfl: "urlsigs",
            obd: "obd",
            omidp: "omidp",
            omidr: "omidr",
            omidv: "omidv",
            omida: "omida",
            omids: "omids",
            omidpv: "omidpv",
            omidam: "omidam",
            omidct: "omidct",
            omidia: "omidia"
        },
        ap = Object.assign({}, $o, {
            avid: function(a) {
                return function() {
                    return a
                }
            }("audio"),
            avas: "avas",
            vs: "vs"
        }),
        bp = {
            atos: "atos",
            avt: Vo("atos", [2]),
            davs: "davs",
            dafvs: "dafvs",
            dav: "dav",
            ss: function(a, b) {
                return function(c) {
                    return void 0 === c[a] && void 0 !== b ? b : c[a]
                }
            }("ss", 0),
            t: "t"
        };
    var cp = function() {
        this.l = this.j = ""
    };
    var dp = function() {},
        ep = function(a, b) {
            var c = {};
            if (void 0 !== a)
                if (null != b)
                    for (var d in b) {
                        var e = b[d];
                        d in Object.prototype || null != e && (c[d] = "function" === typeof e ? e(a) : a[e])
                    } else tf(c, a);
            return Yn(Wn(new Un, c))
        };
    var fp = function() {
            var a = {};
            this.l = (a.vs = [1, 0], a.vw = [0, 1], a.am = [2, 2], a.a = [4, 4], a.f = [8, 8], a.bm = [16, 16], a.b = [32, 32], a.avw = [0, 64], a.avs = [64, 0], a.pv = [256, 256], a.gdr = [0, 512], a.p = [0, 1024], a.r = [0, 2048], a.m = [0, 4096], a.um = [0, 8192], a.ef = [0, 16384], a.s = [0, 32768], a.pmx = [0, 16777216], a);
            this.j = {};
            for (var b in this.l) 0 < this.l[b][1] && (this.j[b] = 0);
            this.o = 0
        },
        gp = function(a, b) {
            var c = a.l[b],
                d = c[1];
            a.o += c[0];
            0 < d && 0 == a.j[b] && (a.j[b] = 1)
        },
        hp = function(a) {
            var b = jf(a.l),
                c = 0,
                d;
            for (d in a.j) Kb(b, d) && 1 == a.j[d] && (c += a.l[d][1], a.j[d] =
                2);
            return c
        },
        ip = function(a) {
            var b = 0,
                c;
            for (c in a.j) {
                var d = a.j[c];
                if (1 == d || 2 == d) b += a.l[c][1]
            }
            return b
        };
    var jp = function() {
        this.l = this.j = 0
    };
    jp.prototype.update = function(a, b) {
        32 <= a || (this.l & 1 << a && !b ? this.j &= ~(1 << a) : this.l & 1 << a || !b || (this.j |= 1 << a), this.l |= 1 << a)
    };
    var kp = function() {
        ro.call(this);
        this.o = new fo;
        this.P = this.M = this.K = 0;
        this.J = -1;
        this.ca = new fo;
        this.A = new fo;
        this.j = new ho;
        this.C = this.B = -1;
        this.F = new fo;
        this.Z = 2E3;
        this.N = new jp;
        this.Y = new jp;
        this.X = new jp
    };
    t(kp, ro);
    var lp = function(a, b, c) {
        var d = a.P;
        dn || c || -1 == a.J || (d += b - a.J);
        return d
    };
    kp.prototype.update = function(a, b, c, d) {
        if (!b.paused) {
            ro.prototype.update.call(this, a, b, c, d);
            var e = To(b) && To(c),
                f = .5 <= (d ? Math.min(b.aa, c.aa) : c.aa);
            yn(b.volume) && (this.B = -1 != this.B ? Math.min(this.B, b.volume) : b.volume, this.C = Math.max(this.C, b.volume));
            f && (this.K += a, this.M += e ? a : 0);
            this.j.update(b.aa, c.aa, b.j, a, d, e);
            this.o.update(!0, a);
            this.A.update(e, a);
            this.F.update(c.fullscreen, a);
            this.ca.update(e && !f, a);
            a = Math.floor(b.mediaTime / 1E3);
            this.N.update(a, b.isVisible());
            this.Y.update(a, 1 <= b.aa);
            this.X.update(a,
                To(b))
        }
    };
    var mp = function() {
        this.o = !1
    };
    mp.prototype.l = function(a) {
        this.o || (this.j(a) ? (a = this.M.report(this.B, a), this.A |= a, a = 0 == a) : a = !1, this.o = a)
    };
    var np = function(a, b) {
        this.o = !1;
        this.B = a;
        this.M = b;
        this.A = 0
    };
    t(np, mp);
    np.prototype.j = function() {
        return !0
    };
    np.prototype.C = function() {
        return !1
    };
    np.prototype.getId = function() {
        var a = this,
            b = nf(function(c) {
                return c == a.B
            });
        return nn[b].toString()
    };
    np.prototype.toString = function() {
        var a = "";
        this.C() && (a += "c");
        this.o && (a += "s");
        0 < this.A && (a += ":" + this.A);
        return this.getId() + a
    };
    var op = function(a, b) {
        np.call(this, a, b);
        this.D = []
    };
    t(op, np);
    op.prototype.l = function(a, b) {
        b = void 0 === b ? null : b;
        null != b && this.D.push(b);
        np.prototype.l.call(this, a)
    };
    var pp = function(a, b, c, d) {
        Pn.call(this, a, b, c, d)
    };
    t(pp, Pn);
    l = pp.prototype;
    l.Fc = function() {
        if (this.element) {
            var a = this.element,
                b = this.l.j.o;
            try {
                try {
                    var c = wn(a.getBoundingClientRect())
                } catch (n) {
                    c = new H(0, 0, 0, 0)
                }
                var d = c.right - c.left,
                    e = c.bottom - c.top,
                    f = Wk(a, b),
                    g = f.x,
                    h = f.y;
                var k = new H(Math.round(h), Math.round(g + d), Math.round(h + e), Math.round(g))
            } catch (n) {
                k = Ug(zo)
            }
            this.j = k
        }
    };
    l.Bd = function() {
        this.B = this.l.B.j
    };
    l.Nd = function(a) {
        return Eo(a, this.B, this.element, 1 == Yl(this.featureSet, "od"))
    };
    l.Cd = function() {
        this.timestamp = en()
    };
    l.Ua = function() {
        this.Cd();
        this.Fc();
        if (this.element && "number" === typeof this.element.videoWidth && "number" === typeof this.element.videoHeight) {
            var a = this.element;
            var b = new F(a.videoWidth, a.videoHeight);
            a = this.j;
            var c = a.getWidth(),
                d = a.getHeight(),
                e = b.width;
            b = b.height;
            0 >= e || 0 >= b || 0 >= c || 0 >= d || (e /= b, a = Ug(a), e > c / d ? (c /= e, d = (d - c) / 2, 0 < d && (d = a.top + d, a.top = Math.round(d), a.bottom = Math.round(d + c))) : (d *= e, c = Math.round((c - d) / 2), 0 < c && (c = a.left + c, a.left = Math.round(c), a.right = Math.round(c + d))));
            this.j = a
        }
        this.Bd();
        a =
            this.j;
        c = this.B;
        a = a.left <= c.right && c.left <= a.right && a.top <= c.bottom && c.top <= a.bottom ? new H(Math.max(a.top, c.top), Math.min(a.right, c.right), Math.min(a.bottom, c.bottom), Math.max(a.left, c.left)) : new H(0, 0, 0, 0);
        c = a.top >= a.bottom || a.left >= a.right ? new H(0, 0, 0, 0) : a;
        a = this.l.B;
        b = e = d = 0;
        0 < (this.j.bottom - this.j.top) * (this.j.right - this.j.left) && (this.Nd(c) ? c = new H(0, 0, 0, 0) : (d = Fn().A, b = new H(0, d.height, d.width, 0), d = Ao(c, this.j), e = Ao(c, Fn().j), b = Ao(c, b)));
        c = c.top >= c.bottom || c.left >= c.right ? new H(0, 0, 0, 0) : Vg(c, -this.j.left, -this.j.top);
        Gn() || (e = d = 0);
        this.D = new hn(a, this.j, c, d, e, this.timestamp, b)
    };
    l.getName = function() {
        return this.l.getName()
    };
    var qp = new H(0, 0, 0, 0),
        rp = function(a, b, c) {
            Pn.call(this, null, a, b, c);
            this.C = a.isActive();
            this.A = 0
        };
    t(rp, pp);
    l = rp.prototype;
    l.Cc = function() {
        this.o();
        return !0
    };
    l.Wa = function() {
        pp.prototype.Ua.call(this)
    };
    l.Cd = function() {};
    l.Fc = function() {};
    l.Ua = function() {
        this.o();
        pp.prototype.Ua.call(this)
    };
    l.ub = function(a) {
        a = a.isActive();
        a !== this.C && (a ? this.o() : (Fn().j = new H(0, 0, 0, 0), this.j = new H(0, 0, 0, 0), this.B = new H(0, 0, 0, 0), this.timestamp = -1));
        this.C = a
    };

    function sp(a) {
        return [a.top, a.left, a.bottom, a.right]
    }
    var tp = {},
        up = (tp.firstquartile = 0, tp.midpoint = 1, tp.thirdquartile = 2, tp.complete = 3, tp),
        vp = function(a, b, c, d, e, f, g) {
            f = void 0 === f ? null : f;
            g = void 0 === g ? [] : g;
            Ho.call(this, b, c, d);
            this.Zc = e;
            this.Jc = 0;
            this.ia = {};
            this.ha = new fp;
            this.Zd = {};
            this.la = "";
            this.playerId = null;
            this.Ca = !1;
            this.j = [];
            this.Pa = f;
            this.C = g;
            this.A = null;
            this.o = -1;
            this.X = this.G = void 0;
            this.K = this.I = 0;
            this.P = -1;
            this.ca = this.ba = !1;
            this.N = this.F = this.l = this.zb = this.ra = 0;
            new ho;
            this.U = this.Y = 0;
            this.Z = -1;
            this.ka = 0;
            this.D = Oe;
            this.L = [this.cc()];
            this.Ja =
                2;
            this.lb = {};
            this.lb.pause = "p";
            this.lb.resume = "r";
            this.lb.skip = "s";
            this.lb.mute = "m";
            this.lb.unmute = "um";
            this.lb.exitfullscreen = "ef";
            this.B = null;
            this.qa = !1
        };
    t(vp, Ho);
    vp.prototype.Ha = function() {
        return !0
    };
    var wp = function(a) {
            a.hasCompleted = !0;
            0 != a.ka && (a.ka = 3)
        },
        xp = function(a) {
            return void 0 === a ? a : Number(a) ? rn(a, 3) : 0
        };
    l = vp.prototype;
    l.Ld = function(a) {
        return Ko(this, a, Math.max(1E4, this.o / 3))
    };
    l.ld = function(a, b, c, d, e, f, g) {
        var h = this,
            k = this.D(this) || {};
        tf(k, e);
        this.o = k.duration || this.o;
        this.G = k.isVpaid || this.G;
        this.X = k.isYouTube || this.X;
        e = yp(this, b);
        1 === zp(this) && (f = e);
        Ho.prototype.ld.call(this, a, b, c, d, k, f, g);
        this.Pa && this.Pa.o && Bb(this.C, function(n) {
            n.l(h)
        })
    };
    l.md = function(a, b, c) {
        Ho.prototype.md.call(this, a, b, c);
        Ap(this).update(a, b, this.na, c);
        this.ca = To(this.na) && To(b); - 1 == this.P && this.ba && (this.P = this.ma().o.j);
        this.ha.o = 0;
        a = this.Na();
        b.isVisible() && gp(this.ha, "vs");
        a && gp(this.ha, "vw");
        yn(b.volume) && gp(this.ha, "am");
        To(b) && gp(this.ha, "a");
        this.vb && gp(this.ha, "f"); - 1 != b.l && (gp(this.ha, "bm"), 1 == b.l && gp(this.ha, "b"));
        To(b) && b.isVisible() && gp(this.ha, "avs");
        this.ca && a && gp(this.ha, "avw");
        0 < b.aa && gp(this.ha, "pv");
        Bp(this, this.ma().o.j, !0) && gp(this.ha, "gdr");
        2E3 <= no(this.ma().l, 1) && gp(this.ha, "pmx")
    };
    l.cc = function() {
        return new kp
    };
    l.ma = function() {
        return this.kc
    };
    var Ap = function(a, b) {
        return a.L[null != b && b < a.L.length ? b : a.L.length - 1]
    };
    vp.prototype.Lc = function() {
        return new So
    };
    vp.prototype.Ec = function(a, b, c, d) {
        a = Ho.prototype.Ec.call(this, a, b, c, void 0 === d ? -1 : d);
        a.fullscreen = this.vb;
        a.paused = 2 == this.ka;
        a.volume = c.volume;
        yn(a.volume) || (this.ra++, b = this.na, yn(b.volume) && (a.volume = b.volume));
        c = c.currentTime;
        a.mediaTime = void 0 !== c && 0 <= c ? c : -1;
        return a
    };
    var zp = function(a) {
            var b = !!Yl(Q().featureSet, "umt");
            return a.G || !b && !a.X ? 0 : 1
        },
        yp = function(a, b) {
            2 == a.ka ? b = 0 : -1 == a.lastUpdateTime ? b = 0 : (b -= a.lastUpdateTime, b = b > Math.max(1E4, a.o / 3) ? 0 : b);
            var c = a.D(a) || {};
            c = void 0 !== c.currentTime ? c.currentTime : a.I;
            var d = c - a.I,
                e = 0;
            0 <= d ? (a.K += b, a.U += Math.max(b - d, 0), e = Math.min(d, a.K)) : a.Y += Math.abs(d);
            0 != d && (a.K = 0); - 1 == a.Z && 0 < d && (a.Z = 0 <= cn ? en() - cn : -1);
            a.I = c;
            return e
        };
    vp.prototype.Gc = function(a) {
        return Fn(), this.vb ? 1 : Ho.prototype.Gc.call(this, a)
    };
    vp.prototype.va = function() {
        return 1
    };
    vp.prototype.getDuration = function() {
        return this.o
    };
    var Cp = function(a, b) {
            Gb(a.C, function(c) {
                return c.B == b.B
            }) || a.C.push(b)
        },
        Dp = function(a) {
            var b = lo(a.ma().j, 1);
            return Bp(a, b)
        },
        Bp = function(a, b, c) {
            return 15E3 <= b ? !0 : a.ba ? (void 0 === c ? 0 : c) ? !0 : 0 < a.o ? b >= a.o / 2 : 0 < a.P ? b >= a.P : !1 : !1
        },
        Ep = function(a) {
            var b = {},
                c = Fn();
            b.insideIframe = c.o;
            b.unmeasurable = a.Ma;
            b.position = a.fb();
            b.exposure = a.na.aa;
            b.documentSize = c.B;
            b.viewportSize = new F(c.j.getWidth(), c.j.getHeight());
            null != a.B && (b.presenceData = a.B);
            b.screenShare = a.na.pa;
            return b
        },
        Fp = function(a) {
            var b = rn(a.na.aa, 2),
                c =
                a.ha.o,
                d = a.na,
                e = Ap(a),
                f = xp(e.B),
                g = xp(e.C),
                h = xp(d.volume),
                k = rn(e.D, 2),
                n = rn(e.G, 2),
                m = rn(d.aa, 2),
                x = rn(e.I, 2),
                u = rn(e.L, 2);
            d = rn(d.pa, 2);
            a = Ug(a.fb());
            a.round();
            e = so(e, !1);
            return {
                Qf: b,
                Kb: c,
                lc: f,
                fc: g,
                Eb: h,
                qc: k,
                hc: n,
                aa: m,
                rc: x,
                jc: u,
                pa: d,
                position: a,
                sc: e
            }
        },
        Hp = function(a, b) {
            Gp(a.j, b, function() {
                return {
                    Qf: 0,
                    Kb: void 0,
                    lc: -1,
                    fc: -1,
                    Eb: -1,
                    qc: -1,
                    hc: -1,
                    aa: -1,
                    rc: -1,
                    jc: -1,
                    pa: -1,
                    position: void 0,
                    sc: []
                }
            });
            a.j[b] = Fp(a)
        },
        Gp = function(a, b, c) {
            for (var d = a.length; d < b + 1;) a.push(c()), d++
        },
        Kp = function(a, b, c) {
            var d = a.Zd[b];
            if (null !=
                d) return d;
            d = Ip(a, b);
            var e = nf(function(f) {
                return f == b
            });
            a = Jp(a, d, d, c, up[ of [e]]);
            "fully_viewable_audible_half_duration_impression" == b && (a.std = "csm");
            return a
        },
        Lp = function(a, b, c) {
            var d = [b];
            if (a != b || c != b) d.unshift(a), d.push(c);
            return d
        },
        Jp = function(a, b, c, d, e) {
            if (a.Ma) return {
                "if": 0,
                vs: 0
            };
            var f = Ug(a.fb());
            f.round();
            var g = Fn(),
                h = Q(),
                k = a.ma(),
                n = a.fa ? a.fa.getName() : "ns",
                m = {};
            m["if"] = g.o ? 1 : void 0;
            m.sdk = a.A ? a.A : void 0;
            m.t = a.Kf;
            m.p = [f.top, f.left, f.bottom, f.right];
            m.tos = jo(k.l, !1);
            m.mtos = so(k);
            m.mcvt = k.U.o;
            m.ps =
                void 0;
            m.vht = lp(k, en(), 2 == a.ka);
            m.mut = k.ca.o;
            m.a = xp(a.na.volume);
            m.mv = xp(k.C);
            m.fs = a.vb ? 1 : 0;
            m.ft = k.F.j;
            m.at = k.A.j;
            m.as = 0 < k.B ? 1 : 0;
            m.atos = jo(k.j);
            m.ssb = jo(k.ba, !1);
            m.amtos = mo(k.j, !1);
            m.uac = a.ra;
            m.vpt = k.o.j;
            "nio" == n && (m.nio = 1, m.avms = "nio");
            m.gmm = "4";
            m.gdr = Bp(a, k.o.j, !0) ? 1 : 0;
            m.efpf = a.Ja;
            if ("gsv" == n || "nis" == n) f = a.fa, 0 < f.A && (m.nnut = f.A);
            m.tcm = zp(a);
            m.nmt = a.Y;
            m.bt = a.U;
            m.pst = a.Z;
            m.vpaid = a.G;
            m.dur = a.o;
            m.vmtime = a.I;
            m.is = a.ha.o;
            1 <= a.j.length && (m.i0 = a.j[0].Kb, m.a0 = [a.j[0].Eb], m.c0 = [a.j[0].aa], m.ss0 = [a.j[0].pa],
                f = a.j[0].position, m.p0 = f ? sp(f) : void 0);
            2 <= a.j.length && (m.i1 = a.j[1].Kb, m.a1 = Lp(a.j[1].lc, a.j[1].Eb, a.j[1].fc), m.c1 = Lp(a.j[1].qc, a.j[1].aa, a.j[1].hc), m.ss1 = Lp(a.j[1].rc, a.j[1].pa, a.j[1].jc), f = a.j[1].position, m.p1 = f ? sp(f) : void 0, m.mtos1 = a.j[1].sc);
            3 <= a.j.length && (m.i2 = a.j[2].Kb, m.a2 = Lp(a.j[2].lc, a.j[2].Eb, a.j[2].fc), m.c2 = Lp(a.j[2].qc, a.j[2].aa, a.j[2].hc), m.ss2 = Lp(a.j[2].rc, a.j[2].pa, a.j[2].jc), f = a.j[2].position, m.p2 = f ? sp(f) : void 0, m.mtos2 = a.j[2].sc);
            4 <= a.j.length && (m.i3 = a.j[3].Kb, m.a3 = Lp(a.j[3].lc, a.j[3].Eb,
                a.j[3].fc), m.c3 = Lp(a.j[3].qc, a.j[3].aa, a.j[3].hc), m.ss3 = Lp(a.j[3].rc, a.j[3].pa, a.j[3].jc), f = a.j[3].position, m.p3 = f ? sp(f) : void 0, m.mtos3 = a.j[3].sc);
            m.cs = ip(a.ha);
            b && (m.ic = hp(a.ha), m.dvpt = k.o.l, m.dvs = oo(k.l, .5), m.dfvs = oo(k.l, 1), m.davs = oo(k.j, .5), m.dafvs = oo(k.j, 1), c && (k.o.l = 0, po(k.l), po(k.j)), a.Na() && (m.dtos = k.K, m.dav = k.M, m.dtoss = a.Jc + 1, c && (k.K = 0, k.M = 0, a.Jc++)), m.dat = k.A.l, m.dft = k.F.l, c && (k.A.l = 0, k.F.l = 0));
            m.ps = [g.B.width, g.B.height];
            m.bs = [g.j.getWidth(), g.j.getHeight()];
            m.scs = [g.A.width, g.A.height];
            m.dom = g.domain;
            a.zb && (m.vds = a.zb);
            if (0 < a.C.length || a.Pa) b = Pb(a.C), a.Pa && b.push(a.Pa), m.pings = Eb(b, function(x) {
                return x.toString()
            });
            b = Eb(Db(a.C, function(x) {
                return x.C()
            }), function(x) {
                return x.getId()
            });
            Qb(b);
            m.ces = b;
            a.l && (m.vmer = a.l);
            a.F && (m.vmmk = a.F);
            a.N && (m.vmiec = a.N);
            m.avms = a.fa ? a.fa.getName() : "ns";
            a.fa && tf(m, a.fa.Va());
            d ? (m.c = rn(a.na.aa, 2), m.ss = rn(a.na.pa, 2)) : m.tth = en() - bn;
            m.mc = rn(k.G, 2);
            m.nc = rn(k.D, 2);
            m.mv = xp(k.C);
            m.nv = xp(k.B);
            m.lte = rn(a.Rc, 2);
            d = Ap(a, e);
            so(k);
            m.qmtos = so(d);
            m.qnc = rn(d.D, 2);
            m.qmv =
                xp(d.C);
            m.qnv = xp(d.B);
            m.qas = 0 < d.B ? 1 : 0;
            m.qi = a.la;
            m.avms || (m.avms = "geo");
            m.psm = k.N.l;
            m.psv = k.N.j;
            m.psfv = k.Y.j;
            m.psa = k.X.j;
            h = $l(h.featureSet);
            h.length && (m.veid = h);
            a.B && tf(m, Ro(a.B));
            m.avas = a.ac();
            m.vs = a.Md();
            return m
        },
        Ip = function(a, b) {
            if (Kb(mn, b)) return !0;
            var c = a.ia[b];
            return void 0 !== c ? (a.ia[b] = !0, !c) : !1
        };
    vp.prototype.Md = function() {
        return this.Ma ? 2 : Dp(this) ? 5 : this.Na() ? 4 : 3
    };
    vp.prototype.ac = function() {
        return this.qa ? 2E3 <= this.ma().A.o ? 4 : 3 : 2
    };
    var Mp = Wa(),
        Pp = function() {
            this.j = {};
            var a = G();
            Np(this, a, document);
            var b = Op();
            try {
                if ("1" == b) {
                    for (var c = a.parent; c != a.top; c = c.parent) Np(this, c, c.document);
                    Np(this, a.top, a.top.document)
                }
            } catch (d) {}
        },
        Op = function() {
            var a = document.documentElement;
            try {
                if (!Hg(G().top)) return "2";
                var b = [],
                    c = G(a.ownerDocument);
                for (a = c; a != c.top; a = a.parent)
                    if (a.frameElement) b.push(a.frameElement);
                    else break;
                return b && 0 != b.length ? "1" : "0"
            } catch (d) {
                return "2"
            }
        },
        Np = function(a, b, c) {
            yo(c, "mousedown", function() {
                return Qp(a)
            }, 301);
            yo(b,
                "scroll",
                function() {
                    return Rp(a)
                }, 302);
            yo(c, "touchmove", function() {
                return Sp(a)
            }, 303);
            yo(c, "mousemove", function() {
                return Tp(a)
            }, 304);
            yo(c, "keydown", function() {
                return Up(a)
            }, 305)
        },
        Qp = function(a) {
            af(a.j, function(b) {
                1E5 < b.o || ++b.o
            })
        },
        Rp = function(a) {
            af(a.j, function(b) {
                1E5 < b.j || ++b.j
            })
        },
        Sp = function(a) {
            af(a.j, function(b) {
                1E5 < b.j || ++b.j
            })
        },
        Up = function(a) {
            af(a.j, function(b) {
                1E5 < b.l || ++b.l
            })
        },
        Tp = function(a) {
            af(a.j, function(b) {
                1E5 < b.B || ++b.B
            })
        };
    var Vp = function() {
            this.j = [];
            this.l = []
        },
        Wp = function(a, b) {
            return Hb(a.j, function(c) {
                return c.la == b
            })
        },
        Xp = function(a, b) {
            return b ? Hb(a.j, function(c) {
                return c.sa.Ya == b
            }) : null
        },
        Yp = function(a, b) {
            return Hb(a.l, function(c) {
                return 2 == c.va() && c.la == b
            })
        },
        $p = function() {
            var a = Zp;
            return 0 == a.j.length ? a.l : 0 == a.l.length ? a.j : Ob(a.l, a.j)
        };
    Vp.prototype.reset = function() {
        this.j = [];
        this.l = []
    };
    var aq = function(a, b) {
            a = 1 == b.va() ? a.j : a.l;
            var c = Ib(a, function(d) {
                return d == b
            });
            return -1 != c ? (a.splice(c, 1), b.fa && b.fa.Qb(), b.W(), !0) : !1
        },
        bq = function(a) {
            var b = Zp;
            if (aq(b, a)) {
                switch (a.va()) {
                    case 0:
                        var c = function() {
                            return null
                        };
                    case 2:
                        c = function() {
                            return Yp(b, a.la)
                        };
                        break;
                    case 1:
                        c = function() {
                            return Wp(b, a.la)
                        }
                }
                for (var d = c(); d; d = c()) aq(b, d)
            }
        },
        cq = function(a) {
            var b = Zp;
            a = Db(a, function(c) {
                return !Xp(b, c.sa.Ya)
            });
            b.j.push.apply(b.j, ha(a))
        },
        dq = function(a) {
            var b = [];
            Bb(a, function(c) {
                Gb(Zp.j, function(d) {
                    return d.sa.Ya ===
                        c.sa.Ya && d.la === c.la
                }) || (Zp.j.push(c), b.push(c))
            })
        },
        Zp = J(Vp);
    var eq = function() {
            this.j = this.l = null
        },
        fq = function(a, b) {
            if (null == a.l) return !1;
            var c = function(d, e) {
                b(d, e)
            };
            a.j = Hb(a.l, function(d) {
                return null != d && d.qd()
            });
            a.j && (a.j.init(c) ? Mn(a.j.j) : b(a.j.j.sb(), a.j));
            return null != a.j
        };
    var hq = function(a) {
        a = gq(a);
        Qn.call(this, a.length ? a[a.length - 1] : new In(P, 0));
        this.o = a;
        this.l = null
    };
    t(hq, Qn);
    l = hq.prototype;
    l.getName = function() {
        return (this.l ? this.l : this.j).getName()
    };
    l.Va = function() {
        return (this.l ? this.l : this.j).Va()
    };
    l.La = function() {
        return (this.l ? this.l : this.j).La()
    };
    l.init = function(a) {
        var b = !1;
        Bb(this.o, function(c) {
            c.initialize() && (b = !0)
        });
        b && (this.B = a, Ln(this.j, this));
        return b
    };
    l.W = function() {
        Bb(this.o, function(a) {
            a.W()
        });
        Qn.prototype.W.call(this)
    };
    l.qd = function() {
        return Gb(this.o, function(a) {
            return a.G()
        })
    };
    l.Db = function() {
        return Gb(this.o, function(a) {
            return a.G()
        })
    };
    l.Rb = function(a, b, c) {
        return new pp(a, this.j, b, c)
    };
    l.Wa = function(a) {
        this.l = a.l
    };
    var gq = function(a) {
        if (!a.length) return [];
        a = Db(a, function(c) {
            return null != c && c.G()
        });
        for (var b = 1; b < a.length; b++) Ln(a[b - 1], a[b]);
        return a
    };
    var iq = {
            threshold: [0, .3, .5, .75, 1]
        },
        jq = function(a, b, c, d) {
            Pn.call(this, a, b, c, d);
            this.M = this.J = this.A = this.C = this.o = null
        };
    t(jq, pp);
    jq.prototype.Cc = function() {
        var a = this;
        this.M || (this.M = en());
        if (Wm(298, function() {
                return kq(a)
            })) return !0;
        Kn(this.l, "msf");
        return !1
    };
    jq.prototype.Qb = function() {
        if (this.o && this.element) try {
            this.o.unobserve(this.element), this.C ? (this.C.unobserve(this.element), this.C = null) : this.A && (this.A.disconnect(), this.A = null)
        } catch (a) {}
    };
    var lq = function(a) {
            return a.o && a.o.takeRecords ? a.o.takeRecords() : []
        },
        kq = function(a) {
            if (!a.element) return !1;
            var b = a.element,
                c = a.l.j.o,
                d = Q().j.j;
            a.o = new c.IntersectionObserver(Hm(d, function(e) {
                return mq(a, e)
            }), iq);
            d = Hm(d, function() {
                a.o.unobserve(b);
                a.o.observe(b);
                mq(a, lq(a))
            });
            c.ResizeObserver ? (a.C = new c.ResizeObserver(d), a.C.observe(b)) : c.MutationObserver && (a.A = new v.MutationObserver(d), a.A.observe(b, {
                attributes: !0,
                childList: !0,
                characterData: !0,
                subtree: !0
            }));
            a.o.observe(b);
            mq(a, lq(a));
            return !0
        },
        mq =
        function(a, b) {
            try {
                if (b.length) {
                    a.J || (a.J = en());
                    var c = nq(b),
                        d = Wk(a.element, a.l.j.o),
                        e = d.x,
                        f = d.y;
                    a.j = new H(Math.round(f), Math.round(e) + c.boundingClientRect.width, Math.round(f) + c.boundingClientRect.height, Math.round(e));
                    var g = wn(c.intersectionRect);
                    a.B = Vg(g, a.j.left - g.left, a.j.top - g.top)
                }
            } catch (h) {
                a.Qb(), Ym(299, h)
            }
        },
        nq = function(a) {
            return Fb(a, function(b, c) {
                return b.time > c.time ? b : c
            }, a[0])
        };
    l = jq.prototype;
    l.Ua = function() {
        var a = lq(this);
        0 < a.length && mq(this, a);
        pp.prototype.Ua.call(this)
    };
    l.Fc = function() {};
    l.Nd = function() {
        return !1
    };
    l.Bd = function() {};
    l.Va = function() {
        var a = {};
        return Object.assign(this.l.Va(), (a.niot_obs = this.M, a.niot_cbk = this.J, a))
    };
    l.getName = function() {
        return "nio"
    };
    var oq = function(a) {
        a = void 0 === a ? P : a;
        Qn.call(this, new In(a, 2))
    };
    t(oq, Qn);
    oq.prototype.getName = function() {
        return "nio"
    };
    oq.prototype.Db = function() {
        return !Fn().l && null != this.j.j.o.IntersectionObserver
    };
    oq.prototype.Rb = function(a, b, c) {
        return new jq(a, this.j, b, c)
    };
    var qq = function() {
        var a = pq();
        In.call(this, P.top, a, "geo")
    };
    t(qq, In);
    qq.prototype.Z = function() {
        return Fn().j
    };
    qq.prototype.G = function() {
        var a = pq();
        this.M !== a && (this.j != this && a > this.j.M && (this.j = this, Jn(this)), this.M = a);
        return 2 == a
    };
    var pq = function() {
        Q();
        var a = Fn();
        return a.o || a.l ? 0 : 2
    };
    var rq = function() {};
    var sq = function() {
            this.done = !1;
            this.j = {
                Ie: 0,
                yd: 0,
                Th: 0,
                Hd: 0,
                Nc: -1,
                Oe: 0,
                Ne: 0,
                Pe: 0,
                Hf: 0
            };
            this.A = null;
            this.C = !1;
            this.o = null;
            this.D = 0;
            this.l = new Hn(this)
        },
        vq = function() {
            var a = tq;
            a.C || (a.C = !0, uq(a, function() {
                return a.B.apply(a, ha(Ga.apply(0, arguments)))
            }), a.B())
        };
    sq.prototype.sample = function() {
        wq(this, $p(), !1)
    };
    var xq = function() {
            J(rq);
            var a = J(eq);
            null != a.j && a.j.j ? Mn(a.j.j) : Fn().update(P)
        },
        wq = function(a, b, c) {
            if (!a.done && (a.l.cancel(), 0 != b.length)) {
                a.o = null;
                try {
                    xq();
                    var d = en();
                    Q().A = d;
                    if (null != J(eq).j)
                        for (var e = 0; e < b.length; e++) Lo(b[e], d, c);
                    for (d = 0; d < b.length; d++) Mo(b[d]);
                    ++a.j.Hd
                } finally {
                    c ? Bb(b, function(f) {
                        f.na.aa = 0
                    }) : a.l.schedule()
                }
            }
        },
        uq = function(a, b) {
            if (!a.A) {
                b = Xm(142, b);
                Am();
                var c = uh(Dl);
                c && Ue(Dl, c, b, {
                    capture: !1
                }) && (a.A = b)
            }
        };
    sq.prototype.B = function() {
        var a = Gn(),
            b = en();
        a ? (dn || ($m = b, Bb(Zp.j, function(c) {
            var d = c.ma();
            d.P = lp(d, b, 1 != c.ka)
        })), dn = !0) : (this.D = yq(this, b), dn = !1, bn = b, Bb(Zp.j, function(c) {
            c.Hb && (c.ma().J = b)
        }));
        wq(this, $p(), !a)
    };
    var zq = function() {
            var a = J(eq);
            if (null != a.j) {
                var b = a.j;
                Bb($p(), function(c) {
                    return Jo(c, b)
                })
            }
        },
        yq = function(a, b) {
            a = a.D;
            dn && (a += b - $m);
            return a
        },
        Aq = function(a) {
            a = void 0 === a ? function() {
                return {}
            } : a;
            Tm.gd("av-js");
            Pm.j = .01;
            Vm([function(b) {
                var c = Q(),
                    d = {};
                d = (d.bin = c.l, d.type = "error", d);
                c = Zl(c.featureSet);
                if (!tq.o) {
                    var e = tq,
                        f = P.document,
                        g = 0 <= an ? en() - an : -1,
                        h = en(); - 1 == e.j.Nc && (g = h);
                    var k = Fn(),
                        n = Q(),
                        m = Zl(n.featureSet),
                        x = $p();
                    try {
                        if (0 < x.length) {
                            var u = k.j;
                            u && (m.bs = [u.getWidth(), u.getHeight()]);
                            var y = k.B;
                            y && (m.ps = [y.width, y.height]);
                            P.screen && (m.scs = [P.screen.width, P.screen.height])
                        } else m.url = encodeURIComponent(P.location.href.substring(0, 512)), f.referrer && (m.referrer = encodeURIComponent(f.referrer.substring(0, 512)));
                        m.tt = g;
                        m.pt = an;
                        m.bin = n.l;
                        void 0 !== P.google_osd_load_pub_page_exp && (m.olpp = P.google_osd_load_pub_page_exp);
                        m.deb = [1, e.j.Ie, e.j.yd, e.j.Hd, e.j.Nc, 0, e.l.l, e.j.Oe, e.j.Ne, e.j.Pe, e.j.Hf, -1].join(";");
                        m.tvt = yq(e, h);
                        k.l && (m.inapp = 1);
                        if (null !== P && P != P.top) {
                            0 < x.length && (m.iframe_loc = encodeURIComponent(P.location.href.substring(0,
                                512)));
                            var A = k.D;
                            m.is = [A.getWidth(), A.getHeight()]
                        }
                    } catch (X) {
                        m.error = 1
                    }
                    tq.o = m
                }
                y = tq.o;
                u = {};
                for (var N in y) u[N] = y[N];
                N = Q().j;
                1 == Yl(N.o, "prf") ? (y = new Em, A = N.j, e = 0, -1 < A.j && (e = A.o.j.j() - A.j), y = qd(y, 1, A.B + e, 0), A = N.j, y = qd(y, 5, -1 < A.j ? A.l + 1 : A.l, 0), y = qd(y, 2, N.l.j.B(), 0), y = qd(y, 3, N.l.j.o(), 0), N = qd(y, 4, N.l.j.l(), 0), y = {}, N = (y.pf = zc(ue(N, Fm)), y)) : N = {};
                tf(u, N);
                tf(b, d, c, u, a());
                if (d = ao()) c = {}, tf(b, (c.v = encodeURIComponent(d), c))
            }])
        },
        tq = J(sq);
    var Bq = null,
        Cq = "",
        Dq = !1,
        Eq = function() {
            var a = Bq || P;
            if (!a) return "";
            var b = [];
            if (!a.location || !a.location.href) return "";
            b.push("url=" + encodeURIComponent(a.location.href.substring(0, 512)));
            a.document && a.document.referrer && b.push("referrer=" + encodeURIComponent(a.document.referrer.substring(0, 512)));
            return b.join("&")
        };

    function Fq() {
        var a = "av.default_js_unreleased_RCxx".match(/_(\d{8})_RC\d+$/) || "av.default_js_unreleased_RCxx".match(/_(\d{8})_\d+_\d+$/) || "av.default_js_unreleased_RCxx".match(/_(\d{8})_\d+\.\d+$/) || "av.default_js_unreleased_RCxx".match(/_(\d{8})_\d+_RC\d+$/),
            b;
        if (2 == (null == (b = a) ? void 0 : b.length)) return a[1];
        a = "av.default_js_unreleased_RCxx".match(/.*_(\d{2})\.(\d{4})\.\d+_RC\d+$/);
        var c;
        return 3 == (null == (c = a) ? void 0 : c.length) ? "20" + a[1] + a[2] : null
    }
    var Gq = function() {
            return "ima_html5_sdk".includes("ima_html5_sdk") ? {
                Da: "ima",
                Ea: null
            } : "ima_html5_sdk".includes("ima_native_sdk") ? {
                Da: "nima",
                Ea: null
            } : "ima_html5_sdk".includes("admob-native-video-javascript") ? {
                Da: "an",
                Ea: null
            } : "av.default_js_unreleased_RCxx".includes("cast_js_sdk") ? {
                Da: "cast",
                Ea: Fq()
            } : "av.default_js_unreleased_RCxx".includes("youtube.player.web") ? {
                Da: "yw",
                Ea: Fq()
            } : "av.default_js_unreleased_RCxx".includes("outstream_web_client") ? {
                Da: "out",
                Ea: Fq()
            } : "av.default_js_unreleased_RCxx".includes("drx_rewarded_web") ? {
                Da: "r",
                Ea: Fq()
            } : "av.default_js_unreleased_RCxx".includes("gam_native_web_video") ? {
                Da: "n",
                Ea: Fq()
            } : "av.default_js_unreleased_RCxx".includes("admob_interstitial_video") ? {
                Da: "int",
                Ea: Fq()
            } : {
                Da: "j",
                Ea: null
            }
        },
        Hq = Gq().Da,
        Iq = Gq().Ea;
    var Kq = function(a, b) {
            var c = {
                sv: "941"
            };
            null !== Iq && (c.v = Iq);
            c.cb = Hq;
            c.nas = Zp.j.length;
            c.msg = a;
            void 0 !== b && (a = Jq(b)) && (c.e = nn[a]);
            return c
        },
        Lq = function(a) {
            return 0 == a.lastIndexOf("custom_metric_viewable", 0)
        },
        Jq = function(a) {
            var b = Lq(a) ? "custom_metric_viewable" : a.toLowerCase();
            return nf(function(c) {
                return c == b
            })
        };
    var Mq = {
            ng: "visible",
            Wf: "audible",
            wh: "time",
            yh: "timetype"
        },
        Nq = {
            visible: function(a) {
                return /^(100|[0-9]{1,2})$/.test(a)
            },
            audible: function(a) {
                return "0" == a || "1" == a
            },
            timetype: function(a) {
                return "mtos" == a || "tos" == a
            },
            time: function(a) {
                return /^(100|[0-9]{1,2})%$/.test(a) || /^([0-9])+ms$/.test(a)
            }
        },
        Oq = function() {
            this.j = void 0;
            this.l = !1;
            this.o = 0;
            this.B = -1;
            this.A = "tos"
        },
        Pq = function(a) {
            try {
                var b = a.split(",");
                return b.length > jf(Mq).length ? null : Fb(b, function(c, d) {
                    d = d.toLowerCase().split("=");
                    if (2 != d.length || void 0 ===
                        Nq[d[0]] || !Nq[d[0]](d[1])) throw Error("Entry (" + d[0] + ", " + d[1] + ") is invalid.");
                    c[d[0]] = d[1];
                    return c
                }, {})
            } catch (c) {
                return null
            }
        },
        Qq = function(a, b) {
            if (void 0 == a.j) return 0;
            switch (a.A) {
                case "mtos":
                    return a.l ? no(b.j, a.j) : no(b.l, a.j);
                case "tos":
                    return a.l ? lo(b.j, a.j) : lo(b.l, a.j)
            }
            return 0
        };
    var Rq = function(a, b, c, d) {
        np.call(this, b, d);
        this.D = a;
        this.J = c
    };
    t(Rq, np);
    Rq.prototype.getId = function() {
        return this.D
    };
    Rq.prototype.C = function() {
        return !0
    };
    Rq.prototype.j = function(a) {
        var b = a.ma(),
            c = a.getDuration();
        return Gb(this.J, function(d) {
            if (void 0 != d.j) var e = Qq(d, b);
            else b: {
                switch (d.A) {
                    case "mtos":
                        e = d.l ? b.A.o : b.o.j;
                        break b;
                    case "tos":
                        e = d.l ? b.A.j : b.o.j;
                        break b
                }
                e = 0
            }
            0 == e ? d = !1 : (d = -1 != d.o ? d.o : void 0 !== c && 0 < c ? d.B * c : -1, d = -1 != d && e >= d);
            return d
        })
    };
    var Sq = function() {};
    var Tq = function() {};
    t(Tq, Sq);
    Tq.prototype.l = function() {
        return null
    };
    Tq.prototype.o = function() {
        return []
    };
    var Uq = function() {};
    t(Uq, dp);
    Uq.prototype.j = function(a) {
        var b = new cp;
        b.j = ep(a, $o);
        b.l = ep(a, bp);
        return b
    };
    var Vq = function(a) {
        np.call(this, "fully_viewable_audible_half_duration_impression", a)
    };
    t(Vq, np);
    Vq.prototype.j = function(a) {
        return Dp(a)
    };
    var Wq = function(a) {
        this.j = a
    };
    t(Wq, Sq);
    var Xq = function(a, b) {
        np.call(this, a, b)
    };
    t(Xq, np);
    Xq.prototype.j = function(a) {
        return a.ma().Na()
    };
    var Yq = function(a) {
        op.call(this, "measurable_impression", a)
    };
    t(Yq, op);
    Yq.prototype.j = function(a) {
        var b = Kb(this.D, Yl(Q().featureSet, "ovms"));
        return !a.Ma && (0 != a.ka || b)
    };
    var Zq = function() {
        Wq.apply(this, arguments)
    };
    t(Zq, Wq);
    Zq.prototype.l = function() {
        return new Yq(this.j)
    };
    Zq.prototype.o = function() {
        return [new Xq("viewable_impression", this.j), new Vq(this.j)]
    };
    var $q = function(a, b, c) {
        rp.call(this, a, b, c)
    };
    t($q, rp);
    $q.prototype.o = function() {
        var a = La("ima.admob.getViewability"),
            b = Yl(this.featureSet, "queryid");
        "function" === typeof a && b && a(b)
    };
    $q.prototype.getName = function() {
        return "gsv"
    };
    var ar = function(a) {
        a = void 0 === a ? P : a;
        Qn.call(this, new In(a, 2))
    };
    t(ar, Qn);
    ar.prototype.getName = function() {
        return "gsv"
    };
    ar.prototype.Db = function() {
        var a = Fn();
        Q();
        return a.l && !1
    };
    ar.prototype.Rb = function(a, b, c) {
        return new $q(this.j, b, c)
    };
    var br = function(a, b, c) {
        rp.call(this, a, b, c)
    };
    t(br, rp);
    br.prototype.o = function() {
        var a = this,
            b = La("ima.bridge.getNativeViewability"),
            c = Yl(this.featureSet, "queryid");
        "function" === typeof b && c && b(c, function(d) {
            pf(d) && a.A++;
            var e = d.opt_nativeViewVisibleBounds || {},
                f = d.opt_nativeViewHidden;
            a.j = xn(d.opt_nativeViewBounds || {});
            var g = a.l.B;
            g.j = f ? Ug(qp) : xn(e);
            a.timestamp = d.opt_nativeTime || -1;
            Fn().j = g.j;
            d = d.opt_nativeVolume;
            void 0 !== d && (g.volume = d)
        })
    };
    br.prototype.getName = function() {
        return "nis"
    };
    var cr = function(a) {
        a = void 0 === a ? P : a;
        Qn.call(this, new In(a, 2))
    };
    t(cr, Qn);
    cr.prototype.getName = function() {
        return "nis"
    };
    cr.prototype.Db = function() {
        var a = Fn();
        Q();
        return a.l && !1
    };
    cr.prototype.Rb = function(a, b, c) {
        return new br(this.j, b, c)
    };
    var dr = function() {
        In.call(this, P, 2, "mraid");
        this.ba = 0;
        this.K = this.L = !1;
        this.J = null;
        this.l = on(this.o);
        this.B.j = new H(0, 0, 0, 0);
        this.ca = !1
    };
    t(dr, In);
    dr.prototype.G = function() {
        return null != this.l.ya
    };
    dr.prototype.Y = function() {
        var a = {};
        this.ba && (a.mraid = this.ba);
        this.L && (a.mlc = 1);
        a.mtop = this.l.Gf;
        this.J && (a.mse = this.J);
        this.ca && (a.msc = 1);
        a.mcp = this.l.compatibility;
        return a
    };
    dr.prototype.C = function(a) {
        var b = Ga.apply(1, arguments);
        try {
            return this.l.ya[a].apply(this.l.ya, b)
        } catch (c) {
            Ym(538, c, .01, function(d) {
                d.method = a
            })
        }
    };
    var er = function(a, b, c) {
        a.C("addEventListener", b, c)
    };
    dr.prototype.initialize = function() {
        var a = this;
        if (this.isInitialized) return !this.Jb();
        this.isInitialized = !0;
        if (2 === this.l.compatibility) return this.J = "ng", Kn(this, "w"), !1;
        if (1 === this.l.compatibility) return this.J = "mm", Kn(this, "w"), !1;
        Fn().J = !0;
        this.o.document.readyState && "complete" == this.o.document.readyState ? fr(this) : yo(this.o, "load", function() {
            Am().setTimeout(Xm(292, function() {
                return fr(a)
            }), 100)
        }, 292);
        return !0
    };
    var fr = function(a) {
            Q().B = !!a.C("isViewable");
            er(a, "viewableChange", gr);
            "loading" === a.C("getState") ? er(a, "ready", hr) : ir(a)
        },
        ir = function(a) {
            "string" === typeof a.l.ya.AFMA_LIDAR ? (a.L = !0, jr(a)) : (a.l.compatibility = 3, a.J = "nc", Kn(a, "w"))
        },
        jr = function(a) {
            a.K = !1;
            var b = 1 == Yl(Q().featureSet, "rmmt"),
                c = !!a.C("isViewable");
            (b ? !c : 1) && Am().setTimeout(Xm(524, function() {
                a.K || (kr(a), Ym(540, Error()), a.J = "mt", Kn(a, "w"))
            }), 500);
            lr(a);
            er(a, a.l.ya.AFMA_LIDAR, mr)
        },
        lr = function(a) {
            var b = 1 == Yl(Q().featureSet, "sneio"),
                c = void 0 !==
                a.l.ya.AFMA_LIDAR_EXP_1,
                d = void 0 !== a.l.ya.AFMA_LIDAR_EXP_2;
            (b = b && d) && (a.l.ya.AFMA_LIDAR_EXP_2 = !0);
            c && (a.l.ya.AFMA_LIDAR_EXP_1 = !b)
        },
        kr = function(a) {
            a.C("removeEventListener", a.l.ya.AFMA_LIDAR, mr);
            a.L = !1
        };
    dr.prototype.P = function() {
        var a = Fn(),
            b = nr(this, "getMaxSize");
        a.j = new H(0, b.width, b.height, 0)
    };
    dr.prototype.U = function() {
        Fn().A = nr(this, "getScreenSize")
    };
    var nr = function(a, b) {
        if ("loading" === a.C("getState")) return new F(-1, -1);
        b = a.C(b);
        if (!b) return new F(-1, -1);
        a = parseInt(b.width, 10);
        b = parseInt(b.height, 10);
        return isNaN(a) || isNaN(b) ? new F(-1, -1) : new F(a, b)
    };
    dr.prototype.W = function() {
        kr(this);
        In.prototype.W.call(this)
    };
    var hr = function() {
            try {
                var a = J(dr);
                a.C("removeEventListener", "ready", hr);
                ir(a)
            } catch (b) {
                Ym(541, b)
            }
        },
        mr = function(a, b) {
            try {
                var c = J(dr);
                c.K = !0;
                var d = a ? new H(a.y, a.x + a.width, a.y + a.height, a.x) : new H(0, 0, 0, 0);
                var e = en(),
                    f = Gn();
                var g = new gn(e, f, c);
                g.j = d;
                g.volume = b;
                c.Wa(g)
            } catch (h) {
                Ym(542, h)
            }
        },
        gr = function(a) {
            var b = Q(),
                c = J(dr);
            a && !b.B && (b.B = !0, c.ca = !0, c.J && Kn(c, "w", !0))
        };
    var pr = function() {
        this.o = this.isInitialized = !1;
        this.j = this.l = null;
        var a = {};
        this.L = (a.start = this.ff, a.firstquartile = this.Ze, a.midpoint = this.bf, a.thirdquartile = this.gf, a.complete = this.We, a.error = this.Xe, a.pause = this.Yc, a.resume = this.Ud, a.skip = this.df, a.viewable_impression = this.Fa, a.mute = this.yb, a.unmute = this.yb, a.fullscreen = this.af, a.exitfullscreen = this.Ye, a.fully_viewable_audible_half_duration_impression = this.Fa, a.measurable_impression = this.Fa, a.abandon = this.Yc, a.engagedview = this.Fa, a.impression = this.Fa,
            a.creativeview = this.Fa, a.progress = this.yb, a.custom_metric_viewable = this.Fa, a.bufferstart = this.Yc, a.bufferfinish = this.Ud, a.audio_measurable = this.Fa, a.audio_audible = this.Fa, a);
        a = {};
        this.P = (a.overlay_resize = this.cf, a.abandon = this.Mc, a.close = this.Mc, a.collapse = this.Mc, a.overlay_unmeasurable_impression = function(b) {
                return Kp(b, "overlay_unmeasurable_impression", Gn())
            }, a.overlay_viewable_immediate_impression = function(b) {
                return Kp(b, "overlay_viewable_immediate_impression", Gn())
            }, a.overlay_unviewable_impression =
            function(b) {
                return Kp(b, "overlay_unviewable_impression", Gn())
            }, a.overlay_viewable_end_of_session_impression = function(b) {
                return Kp(b, "overlay_viewable_end_of_session_impression", Gn())
            }, a);
        Q().l = 3;
        or(this)
    };
    pr.prototype.A = function(a) {
        Io(a, !1);
        bq(a)
    };
    pr.prototype.J = function() {};
    var qr = function(a, b, c, d) {
        a = a.C(null, d, !0, b);
        a.A = c;
        cq([a]);
        return a
    };
    pr.prototype.C = function(a, b, c, d) {
        var e = this;
        b = c ? b : -1;
        c = this.Fd();
        a = new vp(P, a, b, 7, this.Hc(), c.l(), c.o());
        a.la = d;
        Wl(a.featureSet);
        Xl(a.featureSet, "queryid", a.la);
        a.bd("");
        No(a, function() {
            return e.K.apply(e, ha(Ga.apply(0, arguments)))
        }, function() {
            return e.N.apply(e, ha(Ga.apply(0, arguments)))
        });
        (d = J(eq).j) && Jo(a, d);
        a.sa.Ya && J(rq);
        return a
    };
    var rr = function(a, b, c) {
            El(b);
            var d = a.j;
            Bb(b, function(e) {
                var f = Eb(e.criteria, function(g) {
                    var h = Pq(g);
                    if (null == h) g = null;
                    else if (g = new Oq, null != h.visible && (g.j = h.visible / 100), null != h.audible && (g.l = 1 == h.audible), null != h.time) {
                        var k = "mtos" == h.timetype ? "mtos" : "tos",
                            n = eb(h.time, "%") ? "%" : "ms";
                        h = parseInt(h.time, 10);
                        "%" == n && (h /= 100);
                        "ms" == n ? (g.o = h, g.B = -1) : (g.o = -1, g.B = h);
                        g.A = void 0 === k ? "tos" : k
                    }
                    return g
                });
                Gb(f, function(g) {
                    return null == g
                }) || Cp(c, new Rq(e.id, e.event, f, d))
            })
        },
        sr = function() {
            var a = [],
                b = Q();
            a.push(J(qq));
            Yl(b.featureSet, "mvp_lv") && a.push(J(dr));
            b = [new ar, new cr];
            b.push(new hq(a));
            b.push(new oq(P));
            return b
        },
        ur = function(a) {
            if (!a.isInitialized) {
                a.isInitialized = !0;
                try {
                    var b = en(),
                        c = Q(),
                        d = Fn();
                    an = b;
                    c.o = 79463069;
                    "o" !== a.l && (Bq = Tg(P));
                    if (Bm()) {
                        tq.j.yd = 0;
                        tq.j.Nc = en() - b;
                        var e = sr(),
                            f = J(eq);
                        f.l = e;
                        fq(f, function() {
                            tr()
                        }) ? tq.done || (zq(), Ln(f.j.j, a), vq()) : d.o ? tr() : vq()
                    } else Dq = !0
                } catch (g) {
                    throw Zp.reset(), g;
                }
            }
        },
        vr = function(a) {
            tq.l.cancel();
            Cq = a;
            tq.done = !0
        },
        wr = function(a) {
            if (a.l) return a.l;
            var b = J(eq).j;
            if (b) switch (b.getName()) {
                case "nis":
                    a.l =
                        "n";
                    break;
                case "gsv":
                    a.l = "m"
            }
            a.l || (a.l = "h");
            return a.l
        },
        xr = function(a, b, c) {
            if (null == a.j) return b.zb |= 4, !1;
            a = a.j.report(c, b);
            b.zb |= a;
            return 0 == a
        };
    pr.prototype.ub = function(a) {
        switch (a.La()) {
            case 0:
                if (a = J(eq).j) a = a.j, Lb(a.A, this), a.F && this.Ha() && Nn(a);
                tr();
                break;
            case 2:
                vq()
        }
    };
    pr.prototype.Wa = function() {};
    pr.prototype.Ha = function() {
        return !1
    };
    var tr = function() {
        var a = [new oq(P)],
            b = J(eq);
        b.l = a;
        fq(b, function() {
            vr("i")
        }) ? tq.done || (zq(), vq()) : vr("i")
    };
    pr.prototype.N = function(a, b) {
        a.Ma = !0;
        switch (a.va()) {
            case 1:
                yr(a, b);
                break;
            case 2:
                this.ed(a)
        }
        this.fd(a)
    };
    var yr = function(a, b) {
        if (!a.Ca) {
            var c = Kp(a, "start", Gn());
            c = a.Zc.j(c).j;
            var d = {
                id: "lidarv"
            };
            d.r = b;
            d.sv = "941";
            null !== Iq && (d.v = Iq);
            ug(c, function(e, f) {
                return d[e] = "mtos" == e || "tos" == e ? f : encodeURIComponent(f)
            });
            b = Eq();
            ug(b, function(e, f) {
                return d[e] = encodeURIComponent(f)
            });
            b = "//pagead2.googlesyndication.com/pagead/gen_204?" + Yn(Wn(new Un, d));
            bo(b);
            a.Ca = !0
        }
    };
    l = pr.prototype;
    l.ff = function(a) {
        var b = a.D(a);
        b && (b = b.volume, a.qa = yn(b) && 0 < b);
        Hp(a, 0);
        return Kp(a, "start", Gn())
    };
    l.yb = function(a, b, c) {
        wq(tq, [a], !Gn());
        return this.Fa(a, b, c)
    };
    l.Fa = function(a, b, c) {
        return Kp(a, c, Gn())
    };
    l.Ze = function(a) {
        return zr(a, "firstquartile", 1)
    };
    l.bf = function(a) {
        a.ba = !0;
        return zr(a, "midpoint", 2)
    };
    l.gf = function(a) {
        return zr(a, "thirdquartile", 3)
    };
    l.We = function(a) {
        var b = zr(a, "complete", 4);
        wp(a);
        return b
    };
    l.Xe = function(a) {
        a.ka = 3;
        return Kp(a, "error", Gn())
    };
    var zr = function(a, b, c) {
        wq(tq, [a], !Gn());
        Hp(a, c);
        4 != c && Gp(a.L, c, a.cc);
        return Kp(a, b, Gn())
    };
    l = pr.prototype;
    l.Ud = function(a, b, c) {
        b = Gn();
        2 != a.ka || b || (a.ma().J = en());
        wq(tq, [a], !b);
        2 == a.ka && (a.ka = 1);
        return Kp(a, c, b)
    };
    l.df = function(a, b) {
        b = this.yb(a, b || {}, "skip");
        wp(a);
        return b
    };
    l.af = function(a, b) {
        Io(a, !0);
        return this.yb(a, b || {}, "fullscreen")
    };
    l.Ye = function(a, b) {
        Io(a, !1);
        return this.yb(a, b || {}, "exitfullscreen")
    };
    l.Yc = function(a, b, c) {
        b = a.ma();
        b.P = lp(b, en(), 1 != a.ka);
        wq(tq, [a], !Gn());
        1 == a.ka && (a.ka = 2);
        return Kp(a, c, Gn())
    };
    l.cf = function(a) {
        wq(tq, [a], !Gn());
        return a.l()
    };
    l.Mc = function(a) {
        wq(tq, [a], !Gn());
        this.Sd(a);
        wp(a);
        return a.l()
    };
    var or = function(a) {
            Aq(function() {
                var b = Ar();
                null != a.l && (b.sdk = a.l);
                var c = J(eq);
                null != c.j && (b.avms = c.j.getName());
                return b
            })
        },
        Br = function(a, b, c, d) {
            var e = Xp(Zp, c);
            null !== e && e.la !== b && (a.A(e), e = null);
            e || (b = a.C(c, en(), !1, b), 0 == Zp.l.length && (Q().o = 79463069), dq([b]), e = b, e.A = wr(a), d && (e.playerId = d));
            return e
        };
    pr.prototype.K = function() {};
    var Dr = function(a, b) {
        b.F = 0;
        for (var c in jn) null == a[c] && (b.F |= jn[c]);
        Cr(a, "currentTime");
        Cr(a, "duration")
    };
    l = pr.prototype;
    l.ed = function() {};
    l.Sd = function() {};
    l.rd = function() {};
    l.fd = function() {};
    l.Ic = function() {};
    l.Fd = function() {
        this.j || (this.j = this.Ic());
        return null == this.j || this.o ? new Tq : new Zq(this.j)
    };
    l.Hc = function() {
        return new Uq
    };
    var Cr = function(a, b) {
            var c = a[b];
            void 0 !== c && 0 < c && (a[b] = Math.floor(1E3 * c))
        },
        Ar = function() {
            var a = Fn(),
                b = {},
                c = {},
                d = {};
            return Object.assign({}, (b.sv = "941", b), null !== Iq && (c.v = Iq, c), (d["if"] = a.o ? "1" : "0", d.nas = String(Zp.j.length), d))
        };
    var Er = function(a) {
        np.call(this, "audio_audible", a)
    };
    t(Er, np);
    Er.prototype.j = function(a) {
        return 4 == a.ac()
    };
    var Fr = function(a) {
        op.call(this, "audio_measurable", a)
    };
    t(Fr, op);
    Fr.prototype.j = function(a) {
        a = a.ac();
        return 3 == a || 4 == a
    };
    var Gr = function() {
        Wq.apply(this, arguments)
    };
    t(Gr, Wq);
    Gr.prototype.l = function() {
        return new Fr(this.j)
    };
    Gr.prototype.o = function() {
        return [new Er(this.j)]
    };
    var Hr = function() {};
    t(Hr, dp);
    Hr.prototype.j = function(a) {
        a && (28 === a.e && (a = Object.assign({}, a, {
            avas: 3
        })), 4 === a.vs || 5 === a.vs) && (a = Object.assign({}, a, {
            vs: 3
        }));
        var b = new cp;
        b.j = ep(a, ap);
        b.l = ep(a, bp);
        return b
    };
    var Ir = function(a) {
        this.l = a
    };
    Ir.prototype.report = function(a, b) {
        var c = this.j(b);
        if ("function" === typeof c) {
            var d = {};
            var e = {};
            d = Object.assign({}, null !== Iq && (d.v = Iq, d), (e.sv = "941", e.cb = Hq, e.e = Jr(a), e));
            e = Kp(b, a, Gn());
            tf(d, e);
            b.Zd[a] = e;
            d = 2 == b.va() ? $n(d).join("&") : b.Zc.j(d).j;
            try {
                return c(b.la, d, a), 0
            } catch (f) {
                return 2
            }
        } else return 1
    };
    var Jr = function(a) {
        var b = Lq(a) ? "custom_metric_viewable" : a;
        a = nf(function(c) {
            return c == b
        });
        return nn[a]
    };
    Ir.prototype.j = function() {
        return La(this.l)
    };
    var Kr = function(a, b) {
        this.l = a;
        this.o = b
    };
    t(Kr, Ir);
    Kr.prototype.j = function(a) {
        if (!a.playerId) return Ir.prototype.j.call(this, a);
        if (this.o[a.playerId]) return function() {};
        Ym(393, Error());
        return null
    };
    var Lr = function() {
        pr.call(this);
        this.F = void 0;
        this.G = null;
        this.M = !1;
        this.B = {};
        this.I = 0;
        this.D = "ACTIVE_VIEW_TRAFFIC_TYPE_UNSPECIFIED"
    };
    t(Lr, pr);
    Lr.prototype.J = function(a, b) {
        var c = this,
            d = J(eq);
        if (null != d.j) switch (d.j.getName()) {
            case "nis":
                var e = Mr(this, a, b);
                break;
            case "gsv":
                e = Nr(this, a, b);
                break;
            case "exc":
                e = Or(this, a)
        }
        e || (b.opt_overlayAdElement ? e = void 0 : b.opt_adElement && (e = Br(this, a, b.opt_adElement, b.opt_osdId)));
        e && 1 == e.va() && (e.D == Oe && (e.D = function(f) {
            return c.rd(f)
        }), Pr(this, e, b));
        return e
    };
    var Pr = function(a, b, c) {
        c = c.opt_configurable_tracking_events;
        null != a.j && Array.isArray(c) && rr(a, c, b)
    };
    Lr.prototype.rd = function(a) {
        a.l = 0;
        a.N = 0;
        if ("h" == a.A || "n" == a.A) {
            var b;
            Q();
            if (a.playerId && Qr(this)) {
                var c = this.B[a.playerId];
                c ? b = function(e) {
                    return Rr(c, e)
                } : null !== c && Ym(379, Error())
            } else b = La("ima.common.getVideoMetadata");
            if ("function" === typeof b) try {
                var d = b(a.la)
            } catch (e) {
                a.l |= 4
            } else a.l |= 2
        } else if ("b" == a.A)
            if (b = La("ytads.bulleit.getVideoMetadata"), "function" === typeof b) try {
                d = b(a.la)
            } catch (e) {
                a.l |= 4
            } else a.l |= 2;
            else if ("ml" == a.A)
            if (b = La("ima.common.getVideoMetadata"), "function" === typeof b) try {
                d =
                    b(a.la)
            } catch (e) {
                a.l |= 4
            } else a.l |= 2;
            else a.l |= 1;
        a.l || (void 0 === d ? a.l |= 8 : null === d ? a.l |= 16 : pf(d) ? a.l |= 32 : null != d.errorCode && (a.N = d.errorCode, a.l |= 64));
        null == d && (d = {});
        Dr(d, a);
        yn(d.volume) && yn(this.F) && (d.volume *= this.F);
        return d
    };
    var Nr = function(a, b, c) {
            var d = Wp(Zp, b);
            d || (d = c.opt_nativeTime || -1, d = qr(a, b, wr(a), d), c.opt_osdId && (d.playerId = c.opt_osdId));
            return d
        },
        Mr = function(a, b, c) {
            var d = Wp(Zp, b);
            d || (d = qr(a, b, "n", c.opt_nativeTime || -1));
            return d
        },
        Or = function(a, b) {
            var c = Wp(Zp, b);
            c || (c = qr(a, b, "h", -1));
            return c
        };
    Lr.prototype.Ic = function() {
        if (Qr(this)) return new Kr("ima.common.triggerExternalActivityEvent", this.B);
        var a = Sr(this);
        return null != a ? new Ir(a) : null
    };
    var Sr = function(a) {
        Q();
        switch (wr(a)) {
            case "b":
                return "ytads.bulleit.triggerExternalActivityEvent";
            case "n":
                return "ima.bridge.triggerExternalActivityEvent";
            case "h":
            case "m":
            case "ml":
                return "ima.common.triggerExternalActivityEvent"
        }
        return null
    };
    Lr.prototype.ed = function(a) {
        !a.j && a.Ma && xr(this, a, "overlay_unmeasurable_impression") && (a.j = !0)
    };
    Lr.prototype.Sd = function(a) {
        a.Vd && (a.Na() ? xr(this, a, "overlay_viewable_end_of_session_impression") : xr(this, a, "overlay_unviewable_impression"), a.Vd = !1)
    };
    var Tr = function(a, b, c, d) {
        c = void 0 === c ? {} : c;
        var e = {};
        tf(e, {
            opt_adElement: void 0,
            opt_fullscreen: void 0
        }, c);
        var f = a.J(b, c);
        c = f ? f.Zc : a.Hc();
        if (e.opt_bounds) return c.j(Kq("ol", d));
        if (void 0 !== d)
            if (void 0 !== Jq(d))
                if (Dq) a = Kq("ue", d);
                else if (ur(a), "i" == Cq) a = Kq("i", d), a["if"] = 0;
        else if (b = a.J(b, e)) {
            b: {
                "i" == Cq && (b.Ma = !0, a.fd(b));f = e.opt_fullscreen;void 0 !== f && Io(b, !!f);
                var g;
                if (f = !Fn().l && !Bn()) Am(),
                f = 0 === th(Dl);
                if (g = f) {
                    switch (b.va()) {
                        case 1:
                            yr(b, "pv");
                            break;
                        case 2:
                            a.ed(b)
                    }
                    vr("pv")
                }
                f = d.toLowerCase();
                if (g = !g) c: {
                    if (Yl(Q().featureSet,
                            "ssmol") && (g = a.o, "loaded" === f)) break c;g = Kb(kn, f)
                }
                if (g && 0 == b.ka) {
                    "i" != Cq && (tq.done = !1);
                    g = void 0 !== e ? e.opt_nativeTime : void 0;
                    cn = g = "number" === typeof g ? g : en();
                    b.Hb = !0;
                    var h = Gn();
                    b.ka = 1;
                    b.ia = {};
                    b.ia.start = !1;
                    b.ia.firstquartile = !1;
                    b.ia.midpoint = !1;
                    b.ia.thirdquartile = !1;
                    b.ia.complete = !1;
                    b.ia.resume = !1;
                    b.ia.pause = !1;
                    b.ia.skip = !1;
                    b.ia.mute = !1;
                    b.ia.unmute = !1;
                    b.ia.viewable_impression = !1;
                    b.ia.measurable_impression = !1;
                    b.ia.fully_viewable_audible_half_duration_impression = !1;
                    b.ia.fullscreen = !1;
                    b.ia.exitfullscreen = !1;
                    b.Jc = 0;
                    h || (b.ma().J = g);
                    wq(tq, [b], !h)
                }(g = b.lb[f]) && gp(b.ha, g);Yl(Q().featureSet, "fmd") || Kb(ln, f) && b.Pa && b.Pa.l(b, null);
                switch (b.va()) {
                    case 1:
                        var k = Lq(f) ? a.L.custom_metric_viewable : a.L[f];
                        break;
                    case 2:
                        k = a.P[f]
                }
                if (k && (d = k.call(a, b, e, d), Yl(Q().featureSet, "fmd") && Kb(ln, f) && b.Pa && b.Pa.l(b, null), void 0 !== d)) {
                    e = Kq(void 0, f);
                    tf(e, d);
                    d = e;
                    break b
                }
                d = void 0
            }
            3 == b.ka && a.A(b);a = d
        }
        else a = Kq("nf", d);
        else a = void 0;
        else Dq ? a = Kq("ue") : f ? (a = Kq(), tf(a, Jp(f, !0, !1, !1))) : a = Kq("nf");
        return "string" === typeof a ? c.j() : c.j(a)
    };
    Lr.prototype.K = function(a) {
        this.o && 1 == a.va() && Ur(this, a)
    };
    Lr.prototype.fd = function(a) {
        this.o && 1 == a.va() && Ur(this, a)
    };
    var Ur = function(a, b) {
            var c;
            if (b.playerId && Qr(a)) {
                var d = a.B[b.playerId];
                d ? c = function(f, g) {
                    Vr(d, f, g)
                } : null !== d && Ym(379, Error())
            } else c = La("ima.common.triggerViewabilityMeasurementUpdate");
            if ("function" === typeof c) {
                var e = Ep(b);
                e.nativeVolume = a.F;
                c(b.la, e)
            }
        },
        Wr = function(a, b, c) {
            a.B[b] = c
        },
        Qr = function(a) {
            return (Q(), "h" != wr(a) && "m" != wr(a)) ? !1 : 0 != a.I
        };
    Lr.prototype.C = function(a, b, c, d) {
        if (Km()) {
            var e = Yl(Q().featureSet, "mm"),
                f = {};
            (e = (f[Hl.be] = "ACTIVE_VIEW_TRAFFIC_TYPE_AUDIO", f[Hl.He] = "ACTIVE_VIEW_TRAFFIC_TYPE_VIDEO", f)[e]) && e && (this.D = e);
            "ACTIVE_VIEW_TRAFFIC_TYPE_UNSPECIFIED" === this.D && Ym(1044, Error())
        }
        a = pr.prototype.C.call(this, a, b, c, d);
        this.M && (b = this.G, null == a.B && (a.B = new Qo), b.j[a.la] = a.B, a.B.A = Mp);
        return a
    };
    Lr.prototype.A = function(a) {
        a && 1 == a.va() && this.M && delete this.G.j[a.la];
        return pr.prototype.A.call(this, a)
    };
    Lr.prototype.Fd = function() {
        this.j || (this.j = this.Ic());
        return null == this.j || this.o ? new Tq : "ACTIVE_VIEW_TRAFFIC_TYPE_AUDIO" === this.D ? new Gr(this.j) : new Zq(this.j)
    };
    Lr.prototype.Hc = function() {
        return "ACTIVE_VIEW_TRAFFIC_TYPE_AUDIO" === this.D ? new Hr : new Uq
    };
    var Xr = function(a) {
            var b = {};
            return b.viewability = a.j, b.googleViewability = a.l, b
        },
        Yr = function(a, b, c) {
            c = void 0 === c ? {} : c;
            a = Tr(J(Lr), b, c, a);
            return Xr(a)
        },
        Zr = Xm(193, Yr, void 0, Ar);
    w("Goog_AdSense_Lidar_sendVastEvent", Zr);
    var $r = Xm(194, function(a, b) {
        b = void 0 === b ? {} : b;
        a = Tr(J(Lr), a, b);
        return Xr(a)
    });
    w("Goog_AdSense_Lidar_getViewability", $r);
    var as = Xm(195, function() {
        return Cm()
    });
    w("Goog_AdSense_Lidar_getUrlSignalsArray", as);
    var bs = Xm(196, function() {
        return JSON.stringify(Cm())
    });
    w("Goog_AdSense_Lidar_getUrlSignalsList", bs);
    var cs = function() {
            this.j = Math.random()
        },
        es = function() {
            var a = ds,
                b = window.google_srt;
            0 <= b && 1 >= b && (a.j = b)
        },
        fs = function(a, b, c, d, e) {
            if (((void 0 === d ? 0 : d) ? a.j : Math.random()) < (e || .01)) try {
                if (c instanceof nm) var f = c;
                else f = new nm, Lg(c, function(h, k) {
                    var n = f,
                        m = n.B++;
                    rm(n, m, om(k, h))
                });
                var g = um(f, "https:", "/pagead/gen_204?id=" + b + "&");
                g && hh(v, g)
            } catch (h) {}
        };
    var hs = function() {
        var a = gs;
        this.C = ds;
        this.A = "jserror";
        this.o = !0;
        this.l = null;
        this.D = this.Oa;
        this.j = void 0 === a ? null : a;
        this.B = !1
    };
    l = hs.prototype;
    l.vc = function(a) {
        this.l = a
    };
    l.gd = function(a) {
        this.A = a
    };
    l.hd = function(a) {
        this.o = a
    };
    l.jd = function(a) {
        this.B = a
    };
    l.jb = function(a, b, c) {
        try {
            if (this.j && this.j.o) {
                var d = this.j.start(a.toString(), 3);
                var e = b();
                this.j.end(d)
            } else e = b()
        } catch (h) {
            b = this.o;
            try {
                Fh(d), b = this.D(a, new kh(h, {
                    message: is(h)
                }), void 0, c)
            } catch (k) {
                this.Oa(217, k)
            }
            if (b) {
                var f, g;
                null == (f = window.console) || null == (g = f.error) || g.call(f, h)
            } else throw h;
        }
        return e
    };
    l.cd = function(a, b, c, d) {
        var e = this;
        return function() {
            var f = Ga.apply(0, arguments);
            return e.jb(a, function() {
                return b.apply(c, f)
            }, d)
        }
    };
    l.Oa = function(a, b, c, d, e) {
        e = e || this.A;
        try {
            var f = new nm;
            sm(f, 1, "context", a);
            lh(b) || (b = new kh(b, {
                message: is(b)
            }));
            b.msg && sm(f, 2, "msg", b.msg.substring(0, 512));
            var g = b.meta || {};
            if (this.l) try {
                this.l(g)
            } catch (k) {}
            if (d) try {
                d(g)
            } catch (k) {}
            rm(f, 3, [g]);
            var h = mm();
            h.l && sm(f, 4, "top", h.l.url || "");
            rm(f, 5, [{
                url: h.j.url || ""
            }, {
                url: h.j.url ? tg(h.j.url) : ""
            }]);
            fs(this.C, e, f, this.B, c)
        } catch (k) {
            try {
                fs(this.C, e, {
                    context: "ecmserr",
                    rctx: a,
                    msg: is(k),
                    url: h && h.j.url
                }, this.B, c)
            } catch (n) {}
        }
        return this.o
    };
    var is = function(a) {
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
    var js = function() {
        this.j = function() {
            return []
        }
    };
    var ds, ks, gs = new Eh(1, window);
    (function(a) {
        ds = null != a ? a : new cs;
        "number" !== typeof window.google_srt && (window.google_srt = Math.random());
        es();
        ks = new hs;
        ks.vc(function() {});
        ks.jd(!0);
        "complete" == window.document.readyState ? window.google_measure_js_timing || gs.D() : gs.o && Ue(window, "load", function() {
            window.google_measure_js_timing || gs.D()
        })
    })();
    var ms = function(a) {
        D.call(this, a, -1, ls)
    };
    t(ms, D);
    var ls = [3];
    var os = function(a) {
        D.call(this, a, -1, ns)
    };
    t(os, D);
    var ps = function(a, b) {
            return pd(a, 1, b)
        },
        qs = function(a, b) {
            return pd(a, 2, b)
        },
        rs = function(a, b) {
            return pd(a, 3, b)
        },
        ts = function(a, b) {
            pd(a, 4, b)
        },
        ns = [1, 2, 3, 4];
    var us = function(a) {
        D.call(this, a)
    };
    t(us, D);
    var ws = function(a) {
        D.call(this, a, -1, vs)
    };
    t(ws, D);
    ws.prototype.getVersion = function() {
        return Ad(B(this, 1), 0)
    };
    var xs = function(a, b) {
            return qd(a, 1, b, 0)
        },
        ys = function(a, b) {
            return wd(a, 2, b)
        },
        zs = function(a, b) {
            return wd(a, 3, b)
        },
        As = function(a, b) {
            return qd(a, 4, b, 0)
        },
        Bs = function(a, b) {
            return qd(a, 5, b, 0)
        },
        Cs = function(a, b) {
            return qd(a, 6, b, 0)
        },
        Ds = function(a, b) {
            return qd(a, 7, b, "")
        },
        Es = function(a, b) {
            return qd(a, 8, b, 0)
        },
        Fs = function(a, b) {
            return qd(a, 9, b, 0)
        },
        Gs = function(a, b) {
            return qd(a, 10, b, !1)
        },
        Hs = function(a, b) {
            return qd(a, 11, b, !1)
        },
        Is = function(a, b) {
            return pd(a, 12, b)
        },
        Js = function(a, b) {
            return pd(a, 13, b)
        },
        Ks = function(a, b) {
            return pd(a,
                14, b)
        },
        Ls = function(a, b) {
            return qd(a, 15, b, !1)
        },
        Ms = function(a, b) {
            return qd(a, 16, b, "")
        },
        Ns = function(a, b) {
            return pd(a, 17, b)
        },
        Os = function(a, b) {
            return pd(a, 18, b)
        },
        Ps = function(a, b) {
            return xd(a, 19, b)
        },
        vs = [12, 13, 14, 17, 18, 19];
    var Qs = function(a) {
        D.call(this, a)
    };
    t(Qs, D);
    var Rs = "a".charCodeAt(),
        Ss = hf({
            Kg: 0,
            Jg: 1,
            Gg: 2,
            Bg: 3,
            Hg: 4,
            Cg: 5,
            Ig: 6,
            Eg: 7,
            Fg: 8,
            Ag: 9,
            Dg: 10
        }),
        Ts = hf({
            Mg: 0,
            Ng: 1,
            Lg: 2
        });
    var Us = function(a) {
            if (/[^01]/.test(a)) throw Error("Input bitstring " + a + " is malformed!");
            this.l = a;
            this.j = 0
        },
        Ws = function(a) {
            a = Vs(a, 36);
            var b = new us;
            b = qd(b, 1, Math.floor(a / 10), 0);
            return qd(b, 2, a % 10 * 1E8, 0)
        },
        Xs = function(a) {
            return String.fromCharCode(Rs + Vs(a, 6)) + String.fromCharCode(Rs + Vs(a, 6))
        },
        $s = function(a) {
            var b = Vs(a, 16);
            return !0 === !!Vs(a, 1) ? (a = Ys(a), a.forEach(function(c) {
                if (c > b) throw Error("ID " + c + " is past MaxVendorId " + b + "!");
            }), a) : Zs(a, b)
        },
        at = function(a) {
            for (var b = [], c = Vs(a, 12); c--;) {
                var d = Vs(a,
                        6),
                    e = Vs(a, 2),
                    f = Ys(a),
                    g = b,
                    h = g.push,
                    k = new ms;
                d = qd(k, 1, d, 0);
                e = qd(d, 2, e, 0);
                f = pd(e, 3, f);
                h.call(g, f)
            }
            return b
        },
        Ys = function(a) {
            for (var b = Vs(a, 12), c = []; b--;) {
                var d = !0 === !!Vs(a, 1),
                    e = Vs(a, 16);
                if (d)
                    for (d = Vs(a, 16); e <= d; e++) c.push(e);
                else c.push(e)
            }
            c.sort(function(f, g) {
                return f - g
            });
            return c
        },
        Zs = function(a, b, c) {
            for (var d = [], e = 0; e < b; e++)
                if (Vs(a, 1)) {
                    var f = e + 1;
                    if (c && -1 === c.indexOf(f)) throw Error("ID: " + f + " is outside of allowed values!");
                    d.push(f)
                }
            return d
        },
        Vs = function(a, b) {
            if (a.j + b > a.l.length) throw Error("Requested length " +
                b + " is past end of string.");
            var c = a.l.substring(a.j, a.j + b);
            a.j += b;
            return parseInt(c, 2)
        };
    Us.prototype.skip = function(a) {
        this.j += a
    };
    var bt = function(a) {
        try {
            var b = Bc(a).map(function(f) {
                    return f.toString(2).padStart(8, "0")
                }).join(""),
                c = new Us(b);
            if (3 !== Vs(c, 3)) return null;
            var d = qs(ps(new os, Zs(c, 24, Ss)), Zs(c, 24, Ss)),
                e = Vs(c, 6);
            0 !== e && ts(rs(d, Zs(c, e)), Zs(c, e));
            return d
        } catch (f) {
            return null
        }
    };
    var ct = function(a) {
        try {
            var b = Bc(a).map(function(d) {
                    return d.toString(2).padStart(8, "0")
                }).join(""),
                c = new Us(b);
            return Ps(Os(Ns(Ms(Ls(Ks(Js(Is(Hs(Gs(Fs(Es(Ds(Cs(Bs(As(zs(ys(xs(new ws, Vs(c, 6)), Ws(c)), Ws(c)), Vs(c, 12)), Vs(c, 12)), Vs(c, 6)), Xs(c)), Vs(c, 12)), Vs(c, 6)), !!Vs(c, 1)), !!Vs(c, 1)), Zs(c, 12, Ts)), Zs(c, 24, Ss)), Zs(c, 24, Ss)), !!Vs(c, 1)), Xs(c)), $s(c)), $s(c)), at(c))
        } catch (d) {
            return null
        }
    };
    var et = function(a) {
            if (!a) return null;
            var b = a.split(".");
            if (4 < b.length) return null;
            a = ct(b[0]);
            if (!a) return null;
            var c = new Qs;
            a = wd(c, 1, a);
            b.shift();
            b = r(b);
            for (c = b.next(); !c.done; c = b.next()) switch (c = c.value, dt(c)) {
                case 1:
                case 2:
                    break;
                case 3:
                    c = bt(c);
                    if (!c) return null;
                    wd(a, 2, c);
                    break;
                default:
                    return null
            }
            return a
        },
        dt = function(a) {
            try {
                var b = Bc(a).map(function(c) {
                    return c.toString(2).padStart(8, "0")
                }).join("");
                return Vs(new Us(b), 3)
            } catch (c) {
                return -1
            }
        };
    var ft = function(a, b) {
        var c = {};
        if (Array.isArray(b) && 0 !== b.length) {
            b = r(b);
            for (var d = b.next(); !d.done; d = b.next()) d = d.value, c[d] = -1 !== a.indexOf(d)
        } else
            for (a = r(a), d = a.next(); !d.done; d = a.next()) c[d.value] = !0;
        delete c[0];
        return c
    };
    var gt = function(a) {
            this.flag = a;
            this.defaultValue = !1
        },
        ht = function(a, b) {
            this.flag = a;
            this.defaultValue = void 0 === b ? 0 : b
        },
        it = function(a) {
            var b = void 0 === b ? [] : b;
            this.flag = a;
            this.defaultValue = b
        };
    var jt = new gt(471855283),
        kt = new gt(1930),
        lt = new ht(360261971),
        mt = new ht(1921, 72),
        nt = new ht(1920, 12),
        ot = new ht(426169222, 1E3),
        pt = new ht(1917, 300),
        qt = new ht(1916, .001),
        rt = new it(471270390),
        tt = new gt(478498873),
        ut = new gt(478009624),
        vt = new gt(370946349),
        wt = new ht(406149835),
        xt = new it(1932);
    var yt = /^((market|itms|intent|itms-appss):\/\/)/i;
    var R = function(a, b) {
        this.o = this.C = this.B = "";
        this.J = null;
        this.M = this.j = "";
        this.A = !1;
        var c;
        a instanceof R ? (this.A = void 0 !== b ? b : a.A, zt(this, a.B), this.C = a.C, this.o = a.o, At(this, a.J), this.j = a.j, Bt(this, Ct(a.l)), this.M = a.F()) : a && (c = String(a).match(sg)) ? (this.A = !!b, zt(this, c[1] || "", !0), this.C = Dt(c[2] || ""), this.o = Dt(c[3] || "", !0), At(this, c[4]), this.j = Dt(c[5] || "", !0), Bt(this, c[6] || "", !0), this.M = Dt(c[7] || "")) : (this.A = !!b, this.l = new Et(null, this.A))
    };
    R.prototype.toString = function() {
        var a = [],
            b = this.B;
        b && a.push(Ft(b, Gt, !0), ":");
        var c = this.o;
        if (c || "file" == b) a.push("//"), (b = this.C) && a.push(Ft(b, Gt, !0), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.J, null != c && a.push(":", String(c));
        if (c = this.j) this.o && "/" != c.charAt(0) && a.push("/"), a.push(Ft(c, "/" == c.charAt(0) ? Ht : It, !0));
        (c = this.l.toString()) && a.push("?", c);
        (c = this.F()) && a.push("#", Ft(c, Jt));
        return a.join("")
    };
    R.prototype.resolve = function(a) {
        var b = this.G(),
            c = !!a.B;
        c ? zt(b, a.B) : c = !!a.C;
        c ? b.C = a.C : c = !!a.o;
        c ? b.o = a.o : c = null != a.J;
        var d = a.j;
        if (c) At(b, a.J);
        else if (c = !!a.j) {
            if ("/" != d.charAt(0))
                if (this.o && !this.j) d = "/" + d;
                else {
                    var e = b.j.lastIndexOf("/"); - 1 != e && (d = b.j.slice(0, e + 1) + d)
                }
            e = d;
            if (".." == e || "." == e) d = "";
            else if (qb(e, "./") || qb(e, "/.")) {
                d = 0 == e.lastIndexOf("/", 0);
                e = e.split("/");
                for (var f = [], g = 0; g < e.length;) {
                    var h = e[g++];
                    "." == h ? d && g == e.length && f.push("") : ".." == h ? ((1 < f.length || 1 == f.length && "" != f[0]) && f.pop(), d &&
                        g == e.length && f.push("")) : (f.push(h), d = !0)
                }
                d = f.join("/")
            } else d = e
        }
        c ? b.j = d : c = "" !== a.l.toString();
        c ? Bt(b, Ct(a.l)) : c = !!a.M;
        c && (b.M = a.F());
        return b
    };
    R.prototype.G = function() {
        return new R(this)
    };
    var zt = function(a, b, c) {
            a.B = c ? Dt(b, !0) : b;
            a.B && (a.B = a.B.replace(/:$/, ""))
        },
        At = function(a, b) {
            if (b) {
                b = Number(b);
                if (isNaN(b) || 0 > b) throw Error("Bad port number " + b);
                a.J = b
            } else a.J = null
        },
        Bt = function(a, b, c) {
            b instanceof Et ? (a.l = b, Kt(a.l, a.A)) : (c || (b = Ft(b, Lt)), a.l = new Et(b, a.A))
        },
        Mt = function(a, b, c) {
            a.l.set(b, c);
            return a
        };
    R.prototype.F = function() {
        return this.M
    };
    var Nt = function(a) {
            return a instanceof R ? a.G() : new R(a, void 0)
        },
        Dt = function(a, b) {
            return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
        },
        Ft = function(a, b, c) {
            return "string" === typeof a ? (a = encodeURI(a).replace(b, Ot), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null
        },
        Ot = function(a) {
            a = a.charCodeAt(0);
            return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
        },
        Gt = /[#\/\?@]/g,
        It = /[#\?:]/g,
        Ht = /[#\?]/g,
        Lt = /[#\?@]/g,
        Jt = /#/g,
        Et = function(a, b) {
            this.l = this.j = null;
            this.o = a || null;
            this.B = !!b
        },
        Pt = function(a) {
            a.j ||
                (a.j = new Map, a.l = 0, a.o && ug(a.o, function(b, c) {
                    a.add(Rf(b), c)
                }))
        };
    Et.prototype.add = function(a, b) {
        Pt(this);
        this.o = null;
        a = Qt(this, a);
        var c = this.j.get(a);
        c || this.j.set(a, c = []);
        c.push(b);
        this.l += 1;
        return this
    };
    Et.prototype.remove = function(a) {
        Pt(this);
        a = Qt(this, a);
        return this.j.has(a) ? (this.o = null, this.l -= this.j.get(a).length, this.j.delete(a)) : !1
    };
    Et.prototype.clear = function() {
        this.j = this.o = null;
        this.l = 0
    };
    Et.prototype.isEmpty = function() {
        Pt(this);
        return 0 == this.l
    };
    var Rt = function(a, b) {
        Pt(a);
        b = Qt(a, b);
        return a.j.has(b)
    };
    l = Et.prototype;
    l.forEach = function(a, b) {
        Pt(this);
        this.j.forEach(function(c, d) {
            c.forEach(function(e) {
                a.call(b, e, d, this)
            }, this)
        }, this)
    };
    l.bc = function() {
        Pt(this);
        for (var a = Array.from(this.j.values()), b = Array.from(this.j.keys()), c = [], d = 0; d < b.length; d++)
            for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
        return c
    };
    l.tb = function(a) {
        Pt(this);
        var b = [];
        if ("string" === typeof a) Rt(this, a) && (b = b.concat(this.j.get(Qt(this, a))));
        else {
            a = Array.from(this.j.values());
            for (var c = 0; c < a.length; c++) b = b.concat(a[c])
        }
        return b
    };
    l.set = function(a, b) {
        Pt(this);
        this.o = null;
        a = Qt(this, a);
        Rt(this, a) && (this.l -= this.j.get(a).length);
        this.j.set(a, [b]);
        this.l += 1;
        return this
    };
    l.get = function(a, b) {
        if (!a) return b;
        a = this.tb(a);
        return 0 < a.length ? String(a[0]) : b
    };
    l.toString = function() {
        if (this.o) return this.o;
        if (!this.j) return "";
        for (var a = [], b = Array.from(this.j.keys()), c = 0; c < b.length; c++) {
            var d = b[c],
                e = encodeURIComponent(String(d));
            d = this.tb(d);
            for (var f = 0; f < d.length; f++) {
                var g = e;
                "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
                a.push(g)
            }
        }
        return this.o = a.join("&")
    };
    var Ct = function(a) {
            var b = new Et;
            b.o = a.o;
            a.j && (b.j = new Map(a.j), b.l = a.l);
            return b
        },
        Qt = function(a, b) {
            b = String(b);
            a.B && (b = b.toLowerCase());
            return b
        },
        Kt = function(a, b) {
            b && !a.B && (Pt(a), a.o = null, a.j.forEach(function(c, d) {
                var e = d.toLowerCase();
                d != e && (this.remove(d), this.remove(e), 0 < c.length && (this.o = null, this.j.set(Qt(this, e), Pb(c)), this.l += c.length))
            }, a));
            a.B = b
        };
    var St = "://secure-...imrworldwide.com/ ://cdn.imrworldwide.com/ ://aksecure.imrworldwide.com/ ://[^.]*.moatads.com ://youtube[0-9]+.moatpixel.com ://pm.adsafeprotected.com/youtube ://pm.test-adsafeprotected.com/youtube ://e[0-9]+.yt.srs.doubleverify.com www.google.com/pagead/xsul www.youtube.com/pagead/slav".split(" "),
        Tt = /\bocr\b/,
        Ut = 0,
        Vt = {};

    function Wt(a) {
        if (fb(Uf(a))) return !1;
        if (0 <= a.indexOf("://pagead2.googlesyndication.com/pagead/gen_204?id=yt3p&sr=1&")) return !0;
        try {
            var b = new R(a)
        } catch (c) {
            return null != Hb(St, function(d) {
                return 0 < a.search(d)
            })
        }
        return b.F().match(Tt) ? !0 : null != Hb(St, function(c) {
            return null != a.match(c)
        })
    }

    function Xt(a, b) {
        if (a && (a = Yt(a), !fb(a))) {
            var c = 'javascript:"<body><img src=\\""+' + a + '+"\\"></body>"';
            b ? Zt(function(d) {
                $t(d ? c : 'javascript:"<body><object data=\\""+' + a + '+"\\" type=\\"text/html\\" width=1 height=1 style=\\"visibility:hidden;\\"></body>"')
            }) : $t(c)
        }
    }

    function $t(a) {
        var b = kg("IFRAME", {
            src: a,
            style: "display:none"
        });
        a = ag(b).body;
        var c = Ck(function() {
            Uj(d);
            lg(b)
        }, 15E3);
        var d = Lj(b, ["load", "error"], function() {
            Ck(function() {
                v.clearTimeout(c);
                lg(b)
            }, 5E3)
        });
        a.appendChild(b)
    }

    function Zt(a) {
        var b = Vt.imageLoadingEnabled;
        if (null != b) a(b);
        else {
            var c = !1;
            au(function(d, e) {
                delete Vt[e];
                c || (c = !0, null == Vt.imageLoadingEnabled && (Vt.imageLoadingEnabled = d), a(d))
            })
        }
    }

    function au(a) {
        var b = new Image,
            c = "" + Ut++;
        Vt[c] = b;
        b.onload = function() {
            clearTimeout(d);
            a(!0, c)
        };
        var d = setTimeout(function() {
            a(!1, c)
        }, 300);
        b.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
    }

    function bu(a) {
        if (a) {
            var b = ig(document, "OBJECT");
            b.data = a;
            b.width = "1";
            b.height = "1";
            b.style.visibility = "hidden";
            var c = "" + Ut++;
            Vt[c] = b;
            b.onload = b.onerror = function() {
                delete Vt[c]
            };
            document.body.appendChild(b)
        }
    }

    function cu(a) {
        if (a) {
            var b = new Image,
                c = "" + Ut++;
            Vt[c] = b;
            b.onload = b.onerror = function() {
                delete Vt[c]
            };
            b.src = a
        }
    }

    function du(a, b) {
        a && (b ? Zt(function(c) {
            c ? cu(a) : bu(a)
        }) : cu(a))
    }

    function Yt(a) {
        a instanceof Bf || (a = "object" == typeof a && a.Xa ? a.Ka() : String(a), Ef.test(a) ? a = Ff(a) : (a = String(a).replace(/(%0A|%0D)/g, ""), a = a.match(Df) ? Ff(a) : null));
        a = Cf(a || Gf);
        if ("about:invalid#zClosurez" === a) return "";
        a instanceof Lf || (a = "object" == typeof a && a.Xa ? a.Ka() : String(a), pb.test(a) && (-1 != a.indexOf("&") && (a = a.replace(ib, "&amp;")), -1 != a.indexOf("<") && (a = a.replace(jb, "&lt;")), -1 != a.indexOf(">") && (a = a.replace(kb, "&gt;")), -1 != a.indexOf('"') && (a = a.replace(lb, "&quot;")), -1 != a.indexOf("'") && (a = a.replace(nb,
            "&#39;")), -1 != a.indexOf("\x00") && (a = a.replace(ob, "&#0;"))), a = Nf(a));
        return encodeURIComponent(String(Zh(new Xh, Mf(a).toString())))
    };
    var eu = "ad_type vpos mridx pos vad_type videoad_start_delay".split(" ");
    var fu = function(a) {
        var b = a.Ta,
            c = a.height,
            d = a.width,
            e = void 0 === a.za ? !1 : a.za;
        this.Za = a.Za;
        this.Ta = b;
        this.height = c;
        this.width = d;
        this.za = e
    };
    fu.prototype.getHeight = function() {
        return this.height
    };
    fu.prototype.getWidth = function() {
        return this.width
    };
    var gu = function(a) {
        var b = a.Pf,
            c = a.Ke,
            d = a.Of,
            e = a.Je;
        fu.call(this, {
            Za: a.Za,
            Ta: a.Ta,
            height: a.height,
            width: a.width,
            za: void 0 === a.za ? !1 : a.za
        });
        this.B = b;
        this.l = c;
        this.o = d;
        this.j = e
    };
    t(gu, fu);
    var hu = function(a) {
        var b = a.mf;
        fu.call(this, {
            Za: a.Za,
            Ta: a.Ta,
            height: a.height,
            width: a.width,
            za: void 0 === a.za ? !1 : a.za
        });
        this.j = b
    };
    t(hu, fu);
    hu.prototype.getMediaUrl = function() {
        return this.j
    };

    function iu(a) {
        return new(Function.prototype.bind.apply(a, [null].concat(ha(Ga.apply(1, arguments)))))
    };
    var ju, ku, lu, mu = function() {
            return v.navigator ? v.navigator.userAgent : ""
        },
        nu = qb(mu(), "(iPad") || qb(mu(), "(Macintosh") || qb(mu(), "(iPod") || qb(mu(), "(iPhone");
    var ou = "ad.doubleclick.net bid.g.doubleclick.net ggpht.com google.co.uk google.com googleads.g.doubleclick.net googleads4.g.doubleclick.net googleadservices.com googlesyndication.com googleusercontent.com gstatic.com gvt1.com prod.google.com pubads.g.doubleclick.net s0.2mdn.net static.doubleclick.net surveys.g.doubleclick.net youtube.com ytimg.com".split(" "),
        pu = ["c.googlesyndication.com"];

    function qu(a, b) {
        b = void 0 === b ? window.location.protocol : b;
        var c = !1;
        ru(a, pu) ? c = !1 : b.includes("https") && ru(a, ou) && (c = !0);
        if (c) {
            b = new R(a);
            if ("https" == b.B) return a;
            L(K.j(), "htp", "1");
            zt(b, "https");
            return b.toString()
        }
        return a
    }

    function tu(a) {
        if (!a) return !1;
        try {
            var b = new R(a);
            return "gcache" == b.B && !!b.l.get("url")
        } catch (c) {
            return !1
        }
    }

    function uu(a) {
        try {
            var b = new R(a);
            if ("gcache" == b.B) {
                var c = b.l.get("url");
                if (c && !fb(Uf(c))) return c
            }
        } catch (d) {}
        return a
    }

    function ru(a, b) {
        return (new RegExp("^https?://([a-z0-9-]{1,63}\\.)*(" + b.join("|").replace(/\./g, "\\.") + ")(:[0-9]+)?([/?#]|$)", "i")).test(a)
    };
    var vu = -1;

    function wu(a, b) {
        b = null != b ? b : "";
        Zb && (b = "");
        if (!fb(Uf(a))) {
            var c = a instanceof Bf || !yt.test(a) ? a : Ff(a);
            if (c instanceof Bf) var d = c;
            else {
                d = void 0 === d ? Gg : d;
                a: {
                    d = void 0 === d ? Gg : d;
                    for (c = 0; c < d.length; ++c) {
                        var e = d[c];
                        if (e instanceof Eg && e.isValid(a)) {
                            a = Ff(a);
                            break a
                        }
                    }
                    a = void 0
                }
                d = a || Gf
            }
            a = window;
            if (d instanceof Bf) var f = Cf(d);
            else {
                b: if (zg) {
                    try {
                        f = new URL(d)
                    } catch (g) {
                        f = "https:";
                        break b
                    }
                    f = f.protocol
                } else c: {
                    f = document.createElement("a");
                    try {
                        f.href = d
                    } catch (g) {
                        f = void 0;
                        break c
                    }
                    f = f.protocol;f = ":" === f || "" === f ? "https:" : f
                }
                f = "javascript:" !== f ? d : void 0
            }
            void 0 !== f && a.open(f, "_blank", b)
        }
    };
    var xu = /OS (\S+) like/,
        yu = /Android ([\d\.]+)/;

    function zu(a, b) {
        a = (a = a.exec(ub())) ? a[1] : "";
        a = a.replace(/_/g, ".");
        return 0 <= tb(a, b)
    }
    var Au = function() {
            return cc && "ontouchstart" in document.documentElement
        },
        Bu = function(a) {
            return ic && zu(xu, a)
        },
        Cu = function(a) {
            return (a = void 0 === a ? null : a) && "function" === typeof a.getAttribute ? a.getAttribute("playsinline") ? !0 : !1 : !1
        };
    var Du = function(a) {
        O.call(this);
        this.j = a;
        this.A = this.C = !1;
        this.D = this.F = 0;
        this.l = new Bk(1E3);
        Ye(this, this.l);
        Mj(this.l, "tick", this.G, !1, this);
        Mj(this.j, "pause", this.o, !1, this);
        Mj(this.j, "playing", this.o, !1, this);
        Mj(this.j, "ended", this.o, !1, this);
        Mj(this.j, "timeupdate", this.o, !1, this)
    };
    t(Du, O);
    var Eu = function(a) {
        var b;
        return null != (b = a.j.currentTime) ? b : a.j.getCurrentTime()
    };
    Du.prototype.o = function(a) {
        switch (a.type) {
            case "playing":
                Fu(this);
                break;
            case "pause":
            case "ended":
                this.l.enabled && this.l.stop();
                break;
            case "timeupdate":
                !this.C && 0 < Eu(this) && (this.C = !0, Fu(this))
        }
    };
    var Fu = function(a) {
        !a.l.enabled && a.C && (a.F = 1E3 * Eu(a), a.D = Date.now(), a.A = !1, a.l.start())
    };
    Du.prototype.G = function() {
        var a = Date.now(),
            b = a - this.D,
            c = 1E3 * Eu(this);
        c - this.F < .5 * b ? this.A || (this.A = !0, this.dispatchEvent("playbackStalled")) : this.A = !1;
        this.F = c;
        this.D = a
    };
    var Gu = new Map,
        Hu = function() {
            this.l = this.j = null
        };

    function Iu(a, b, c, d) {
        var e = Zk(a);
        b.width <= e.width && b.height <= e.height ? (Ju(d), c(e)) : (e = setTimeout(function() {
            return Iu(a, b, c, d)
        }, 200), d.l = e)
    }

    function Ku(a, b) {
        b = void 0 === b ? new F(1, 1) : b;
        var c = new Hu,
            d = new Promise(function(e) {
                var f = Zk(a);
                if (b.width <= f.width && b.height <= f.height) return e(f);
                "ResizeObserver" in window ? (f = new ResizeObserver(function(g) {
                    window.requestAnimationFrame(function() {
                        for (var h = new F(0, 0), k = r(g), n = k.next(); !n.done; n = k.next())
                            if (n = n.value, n.contentBoxSize ? (n = Array.isArray(n.contentBoxSize) ? n.contentBoxSize[0] : n.contentBoxSize, h.width = Math.floor(n.inlineSize), h.height = Math.floor(n.blockSize)) : (h.width = Math.floor(n.contentRect.width),
                                    h.height = Math.floor(n.contentRect.height)), b.width <= h.width && b.height <= h.height) return Ju(c), e(h)
                    })
                }), c.j = f, f.observe(a)) : Iu(a, b, e, c)
            });
        Gu.set(d, c);
        return d
    }

    function Ju(a) {
        a.l && window.clearTimeout(a.l);
        a.j && (a.j.disconnect(), a.j = null)
    };

    function Lu(a, b) {
        return fb(b) ? !1 : (new RegExp(a)).test(b)
    }

    function Mu(a) {
        var b = {};
        a.split(",").forEach(function(c) {
            var d = c.split("=");
            2 == d.length && (c = gb(d[0]), d = gb(d[1]), 0 < c.length && (b[c] = d))
        });
        return b
    }

    function Nu(a) {
        var b = "af am ar_eg ar_sa ar_xb ar be bg bn ca cs da de_at de_cn de el en_au en_ca en_gb en_ie en_in en_sg en_xa en_xc en_za en es_419 es_ar es_bo es_cl es_co es_cr es_do es_ec es_gt es_hn es_mx es_ni es_pa es_pe es_pr es_py es_sv es_us es_uy es_ve es et eu fa fi fil fr_ca fr_ch fr gl gsw gu he hi hr hu id in is it iw ja kn ko ln lo lt lv ml mo mr ms nb ne nl no pl pt_br pt_pt pt ro ru sk sl sr_latn sr sv sw ta te th tl tr uk ur vi zh_cn zh_hk zh_tw zh zu".split(" ");
        if (!a) return null;
        a = a.toLowerCase().replace("-", "_");
        if (b.includes(a)) return a;
        a = (a = a.match(/^\w{2,3}([-_]|$)/)) ? a[0].replace(/[_-]/g, "") : "";
        return b.includes(a) ? a : null
    };
    var Ou = function() {
        this.j = Date.now()
    };
    Ou.prototype.reset = function() {
        this.j = Date.now()
    };
    var Pu = function(a) {
        a = a.j + 5E3 - Date.now();
        return 0 < a ? a : 0
    };
    var Qu = function(a, b) {
        var c = Error.call(this, a);
        this.message = c.message;
        "stack" in c && (this.stack = c.stack);
        this.errorCode = a;
        this.httpStatus = b
    };
    t(Qu, Error);
    var Ru = function() {
            if (!Zb) return !1;
            try {
                return new ActiveXObject("MSXML2.DOMDocument"), !0
            } catch (a) {
                return !1
            }
        },
        Su = Zb && Ru();
    var Tu = function(a) {
        E.call(this);
        this.B = a;
        this.l = {}
    };
    Xa(Tu, E);
    var Uu = [];
    Tu.prototype.R = function(a, b, c, d) {
        return Vu(this, a, b, c, d)
    };
    var Vu = function(a, b, c, d, e, f) {
        Array.isArray(c) || (c && (Uu[0] = c.toString()), c = Uu);
        for (var g = 0; g < c.length; g++) {
            var h = Mj(b, c[g], d || a.handleEvent, e || !1, f || a.B || a);
            if (!h) break;
            a.l[h.key] = h
        }
        return a
    };
    Tu.prototype.Mb = function(a, b, c, d) {
        return Wu(this, a, b, c, d)
    };
    var Wu = function(a, b, c, d, e, f) {
        if (Array.isArray(c))
            for (var g = 0; g < c.length; g++) Wu(a, b, c[g], d, e, f);
        else {
            b = Lj(b, c, d || a.handleEvent, e, f || a.B || a);
            if (!b) return a;
            a.l[b.key] = b
        }
        return a
    };
    Tu.prototype.kb = function(a, b, c, d, e) {
        if (Array.isArray(b))
            for (var f = 0; f < b.length; f++) this.kb(a, b[f], c, d, e);
        else c = c || this.handleEvent, d = Na(d) ? !!d.capture : !!d, e = e || this.B || this, c = Nj(c), d = !!d, b = Bj(a) ? a.Ib(b, c, d, e) : a ? (a = Pj(a)) ? a.Ib(b, c, d, e) : null : null, b && (Uj(b), delete this.l[b.key])
    };
    var Xu = function(a) {
        af(a.l, function(b, c) {
            this.l.hasOwnProperty(c) && Uj(b)
        }, a);
        a.l = {}
    };
    Tu.prototype.O = function() {
        Tu.Aa.O.call(this);
        Xu(this)
    };
    Tu.prototype.handleEvent = function() {
        throw Error("EventHandler.handleEvent not implemented");
    };
    var Yu = function() {};
    Yu.prototype.j = null;
    var $u = function(a) {
        var b;
        (b = a.j) || (b = {}, Zu(a) && (b[0] = !0, b[1] = !0), b = a.j = b);
        return b
    };
    var av, bv = function() {};
    Xa(bv, Yu);
    var cv = function(a) {
            return (a = Zu(a)) ? new ActiveXObject(a) : new XMLHttpRequest
        },
        Zu = function(a) {
            if (!a.l && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
                for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                    var d = b[c];
                    try {
                        return new ActiveXObject(d), a.l = d
                    } catch (e) {}
                }
                throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
            }
            return a.l
        };
    av = new bv;
    var dv = function(a) {
        O.call(this);
        this.headers = new Map;
        this.I = a || null;
        this.l = !1;
        this.G = this.j = null;
        this.N = "";
        this.A = 0;
        this.o = this.L = this.C = this.K = !1;
        this.F = 0;
        this.D = null;
        this.Z = "";
        this.U = this.X = !1;
        this.P = null
    };
    Xa(dv, O);
    var ev = /^https?$/i,
        fv = ["POST", "PUT"];
    dv.prototype.setTrustToken = function(a) {
        this.P = a
    };
    var jv = function(a, b, c, d) {
            if (a.j) throw Error("[goog.net.XhrIo] Object is active with another request=" + a.N + "; newUri=" + b);
            c = c ? c.toUpperCase() : "GET";
            a.N = b;
            a.A = 0;
            a.K = !1;
            a.l = !0;
            a.j = a.I ? cv(a.I) : cv(av);
            a.G = a.I ? $u(a.I) : $u(av);
            a.j.onreadystatechange = Ua(a.Y, a);
            try {
                a.L = !0, a.j.open(c, String(b), !0), a.L = !1
            } catch (g) {
                gv(a);
                return
            }
            b = d || "";
            d = new Map(a.headers);
            var e = Array.from(d.keys()).find(function(g) {
                    return "content-type" == g.toLowerCase()
                }),
                f = v.FormData && b instanceof v.FormData;
            !Kb(fv, c) || e || f || d.set("Content-Type",
                "application/x-www-form-urlencoded;charset=utf-8");
            c = r(d);
            for (d = c.next(); !d.done; d = c.next()) e = r(d.value), d = e.next().value, e = e.next().value, a.j.setRequestHeader(d, e);
            a.Z && (a.j.responseType = a.Z);
            "withCredentials" in a.j && a.j.withCredentials !== a.X && (a.j.withCredentials = a.X);
            if ("setTrustToken" in a.j && a.P) try {
                a.j.setTrustToken(a.P)
            } catch (g) {}
            try {
                hv(a), 0 < a.F && (a.U = iv(a.j), a.U ? (a.j.timeout = a.F, a.j.ontimeout = Ua(a.ba, a)) : a.D = Ck(a.ba, a.F, a)), a.C = !0, a.j.send(b), a.C = !1
            } catch (g) {
                gv(a)
            }
        },
        iv = function(a) {
            return Zb &&
                "number" === typeof a.timeout && void 0 !== a.ontimeout
        };
    dv.prototype.ba = function() {
        "undefined" != typeof Ka && this.j && (this.A = 8, this.dispatchEvent("timeout"), this.abort(8))
    };
    var gv = function(a) {
            a.l = !1;
            a.j && (a.o = !0, a.j.abort(), a.o = !1);
            a.A = 5;
            kv(a);
            lv(a)
        },
        kv = function(a) {
            a.K || (a.K = !0, a.dispatchEvent("complete"), a.dispatchEvent("error"))
        };
    dv.prototype.abort = function(a) {
        this.j && this.l && (this.l = !1, this.o = !0, this.j.abort(), this.o = !1, this.A = a || 7, this.dispatchEvent("complete"), this.dispatchEvent("abort"), lv(this))
    };
    dv.prototype.O = function() {
        this.j && (this.l && (this.l = !1, this.o = !0, this.j.abort(), this.o = !1), lv(this, !0));
        dv.Aa.O.call(this)
    };
    dv.prototype.Y = function() {
        this.xa() || (this.L || this.C || this.o ? mv(this) : this.ca())
    };
    dv.prototype.ca = function() {
        mv(this)
    };
    var mv = function(a) {
            if (a.l && "undefined" != typeof Ka && (!a.G[1] || 4 != (a.j ? a.j.readyState : 0) || 2 != nv(a)))
                if (a.C && 4 == (a.j ? a.j.readyState : 0)) Ck(a.Y, 0, a);
                else if (a.dispatchEvent("readystatechange"), a.isComplete()) {
                a.l = !1;
                try {
                    var b = nv(a);
                    a: switch (b) {
                        case 200:
                        case 201:
                        case 202:
                        case 204:
                        case 206:
                        case 304:
                        case 1223:
                            var c = !0;
                            break a;
                        default:
                            c = !1
                    }
                    var d;
                    if (!(d = c)) {
                        var e;
                        if (e = 0 === b) {
                            var f = String(a.N).match(sg)[1] || null;
                            !f && v.self && v.self.location && (f = v.self.location.protocol.slice(0, -1));
                            e = !ev.test(f ? f.toLowerCase() :
                                "")
                        }
                        d = e
                    }
                    d ? (a.dispatchEvent("complete"), a.dispatchEvent("success")) : (a.A = 6, kv(a))
                } finally {
                    lv(a)
                }
            }
        },
        lv = function(a, b) {
            if (a.j) {
                hv(a);
                var c = a.j,
                    d = a.G[0] ? function() {} : null;
                a.j = null;
                a.G = null;
                b || a.dispatchEvent("ready");
                try {
                    c.onreadystatechange = d
                } catch (e) {}
            }
        },
        hv = function(a) {
            a.j && a.U && (a.j.ontimeout = null);
            a.D && (v.clearTimeout(a.D), a.D = null)
        };
    dv.prototype.isActive = function() {
        return !!this.j
    };
    dv.prototype.isComplete = function() {
        return 4 == (this.j ? this.j.readyState : 0)
    };
    var nv = function(a) {
            try {
                return 2 < (a.j ? a.j.readyState : 0) ? a.j.status : -1
            } catch (b) {
                return -1
            }
        },
        ov = function(a) {
            if (a.j) {
                a: {
                    a = a.j.responseText;
                    if (v.JSON) try {
                        var b = v.JSON.parse(a);
                        break a
                    } catch (c) {}
                    b = Wh(a)
                }
                return b
            }
        };
    var pv = function() {};
    pv.prototype.get = function(a) {
        return qv({
            url: a.url,
            timeout: a.timeout,
            withCredentials: void 0 === a.withCredentials ? !0 : a.withCredentials,
            method: "GET",
            Sa: void 0 === a.Sa ? void 0 : a.Sa
        })
    };
    pv.prototype.post = function(a) {
        var b = a.timeout,
            c = void 0 === a.withCredentials ? !0 : a.withCredentials,
            d = void 0 === a.headers ? {} : a.headers,
            e = void 0 === a.content ? void 0 : a.content;
        a = new R(a.url);
        e || (e = a.l.toString(), Bt(a, ""));
        return qv({
            url: a.toString(),
            timeout: b,
            withCredentials: c,
            method: "POST",
            content: e,
            headers: d
        })
    };
    var qv = function(a) {
            var b = a.url,
                c = a.timeout,
                d = a.withCredentials,
                e = a.method,
                f = void 0 === a.content ? void 0 : a.content,
                g = void 0 === a.Sa ? void 0 : a.Sa,
                h = void 0 === a.headers ? {} : a.headers;
            return rv({
                url: b,
                timeout: c,
                withCredentials: d,
                method: e,
                content: f,
                Sa: g,
                headers: h
            }).then(function(k) {
                return Promise.resolve(k)
            }, function(k) {
                return k instanceof Error && 6 == k.message && d ? rv({
                    url: b,
                    timeout: c,
                    withCredentials: !d,
                    method: e,
                    content: f,
                    Sa: g,
                    headers: h
                }) : Promise.reject(k)
            })
        },
        rv = function(a) {
            var b = a.url,
                c = a.timeout,
                d = a.withCredentials,
                e = a.method,
                f = void 0 === a.content ? void 0 : a.content,
                g = void 0 === a.Sa ? void 0 : a.Sa;
            a = void 0 === a.headers ? {} : a.headers;
            var h = new dv;
            h.X = d;
            h.F = Math.max(0, Pu(c));
            h.setTrustToken && g && h.setTrustToken(g);
            for (var k in a) h.headers.set(k, a[k]);
            var n = new Tu;
            return new Promise(function(m, x) {
                n.Mb(h, "success", function() {
                    a: {
                        if (An()) try {
                            ov(h);
                            var u = "application/json";
                            break a
                        } catch (N) {
                            u = "application/xml";
                            break a
                        }
                        h.j && h.isComplete() ? (u = h.j.getResponseHeader("Content-Type"), u = null === u ? void 0 : u) : u = void 0;u = u || ""
                    }
                    if (-1 != u.indexOf("application/json")) m(ov(h) || {});
                    else {
                        try {
                            var y = h.j ? h.j.responseXML : null
                        } catch (N) {
                            y = null
                        }
                        if (null == y) {
                            try {
                                var A = h.j ? h.j.responseText : ""
                            } catch (N) {
                                A = ""
                            }
                            y = A;
                            if ("undefined" != typeof DOMParser) A = new DOMParser, y = Nf(y), y = A.parseFromString(Mf(y), "application/xml");
                            else if (Su) {
                                A = new ActiveXObject("MSXML2.DOMDocument");
                                A.resolveExternals = !1;
                                A.validateOnParse = !1;
                                try {
                                    A.setProperty("ProhibitDTD", !0), A.setProperty("MaxXMLSize", 2048), A.setProperty("MaxElementDepth", 256)
                                } catch (N) {}
                                A.loadXML(y);
                                y = A
                            } else throw Error("Your browser does not support loading xml documents");
                        }
                        m(y)
                    }
                    n.W();h.W()
                });
                n.Mb(h, ["error", "timeout"], function() {
                    x(new Qu(h.A, nv(h)));
                    n.W();
                    h.W()
                });
                jv(h, qu(b), e, f)
            })
        };
    var tv = {
        AUTOPLAY_DISALLOWED: "autoplayDisallowed",
        Xf: "beginFullscreen",
        Yf: "canPlay",
        Zf: "canPlayThrough",
        CLICK: "click",
        DURATION_CHANGE: "durationChange",
        kg: "end",
        lg: "endFullscreen",
        me: "error",
        pg: "focusSkipButton",
        re: "loadStart",
        LOADED: "loaded",
        Tg: "mediaLoadTimeout",
        Ug: "mediaPlaybackTimeout",
        wd: "pause",
        fh: "play",
        gh: "playing",
        oh: "seeked",
        ph: "seeking",
        qh: "skip",
        De: "skipShown",
        sh: "stalled",
        xd: "start",
        zh: "timeUpdate",
        xh: "timedMetadata",
        Jh: "volumeChange",
        Kh: "waiting",
        qg: "fullyLoaded"
    };
    var vv = function(a) {
            this.j = a;
            this.l = uv(a)
        },
        uv = function(a) {
            return new Map(a.j.split("/").reduce(function(b, c, d) {
                d % 2 ? b[b.length - 1].push(c) : b.push([c]);
                return b
            }, []))
        };
    vv.prototype.getId = function() {
        return wv(this, "id")
    };
    var wv = function(a, b) {
        var c = a.j.l.get(b);
        return c ? c : (a = a.l.get(b)) ? a : null
    };
    var xv = function() {};
    var S = {},
        yv = (S[18] = -1, S[22] = -1, S[43] = 350, S[44] = 350, S[45] = 350, S[59] = -1, S[133] = 350, S[134] = 350, S[135] = 350, S[136] = 350, S[139] = 50, S[140] = 50, S[141] = 50, S[160] = 350, S[242] = 150, S[243] = 150, S[244] = 150, S[245] = 150, S[249] = 50, S[250] = 50, S[251] = 50, S[278] = 150, S[342] = -1, S[343] = -1, S[344] = -1, S[345] = -1, S[346] = -1, S[347] = -1, S[396] = -1, S[398] = -1, S),
        zv = {},
        Av = (zv[18] = !1, zv[22] = !1, zv[43] = !0, zv[44] = !0, zv[45] = !0, zv[59] = !1, zv[133] = !0, zv[134] = !0, zv[135] = !0, zv[136] = !0, zv[139] = !0, zv[140] = !0, zv[141] = !0, zv[160] = !0, zv[242] = !0, zv[243] = !0,
            zv[244] = !0, zv[245] = !0, zv[249] = !0, zv[250] = !0, zv[251] = !0, zv[278] = !0, zv[342] = !1, zv[343] = !1, zv[344] = !1, zv[345] = !1, zv[346] = !1, zv[347] = !1, zv[396] = !0, zv[398] = !0, zv),
        Bv = {},
        Cv = (Bv[18] = "video/mp4", Bv[22] = "video/mp4", Bv[43] = "video/webm", Bv[44] = "video/webm", Bv[45] = "video/webm", Bv[59] = "video/mp4", Bv[133] = "video/mp4", Bv[134] = "video/mp4", Bv[135] = "video/mp4", Bv[136] = "video/mp4", Bv[139] = "audio/mp4", Bv[140] = "audio/mp4", Bv[141] = "audio/mp4", Bv[160] = "video/mp4", Bv[242] = "video/webm", Bv[243] = "video/webm", Bv[244] = "video/webm",
            Bv[245] = "video/webm", Bv[249] = "audio/webm", Bv[250] = "audio/webm", Bv[251] = "audio/webm", Bv[278] = "video/webm", Bv[342] = "video/mp4", Bv[343] = "video/mp4", Bv[344] = "video/mp4", Bv[345] = "video/mp4", Bv[346] = "video/mp4", Bv[347] = "video/mp4", Bv[396] = "video/mp4", Bv[398] = "video/mp4", Bv),
        Dv = {},
        Ev = (Dv[18] = "avc1.42001E, mp4a.40.2", Dv[22] = "avc1.64001F, mp4a.40.2", Dv[43] = "vp8, vorbis", Dv[44] = "vp8, vorbis", Dv[45] = "vp8, vorbis", Dv[59] = "avc1.4D001F, mp4a.40.2", Dv[133] = "avc1.4D401E", Dv[134] = "avc1.4D401E", Dv[135] = "avc1.4D401E",
            Dv[136] = "avc1.4D401E", Dv[139] = "mp4a.40.2", Dv[140] = "mp4a.40.2", Dv[141] = "mp4a.40.2", Dv[160] = "avc1.4D401E", Dv[242] = "vp9", Dv[243] = "vp9", Dv[244] = "vp9", Dv[245] = "vp9", Dv[249] = "opus", Dv[250] = "opus", Dv[251] = "opus", Dv[278] = "vp9", Dv[342] = "avc1.42E01E, mp4a.40.2", Dv[343] = "avc1.42E01E, mp4a.40.2", Dv[344] = "avc1.42E01E, mp4a.40.2", Dv[345] = "avc1.42E01E, mp4a.40.2", Dv[346] = "avc1.42E01E, mp4a.40.2", Dv[347] = "avc1.4D001F, mp4a.40.2", Dv[396] = "av01.0.05M.08", Dv[398] = "av01.0.05M.08", Dv);
    var Fv = RegExp("/itag/(\\d+)/");

    function Gv(a) {
        var b = parseInt(wg(a, "itag"), 10);
        return b ? b : (a = a.match(Fv)) && 2 == a.length ? parseInt(a[1], 10) : null
    }

    function Hv(a) {
        var b = Cv[a];
        a = Ev[a];
        b ? (b = Uf(b).toLowerCase(), b = a ? b + '; codecs="' + Uf(a) + '"' : b) : b = "";
        return b
    }

    function Iv(a, b) {
        if ("function" === typeof CustomEvent) return new CustomEvent(a, {
            detail: b
        });
        var c = document.createEvent("CustomEvent");
        c.initCustomEvent(a, !1, !0, b);
        return c
    };
    var Jv = ["doubleclick.net"];

    function Kv() {
        if (zb() || z("iPad") || z("iPod")) return !1;
        if (z("Android")) {
            if (void 0 === lu) {
                a: {
                    if (void 0 === ju) {
                        if (nu) {
                            var a = qb(mu(), "Safari");
                            var b = (new R(window.location.href)).l.tb("js");
                            b: {
                                if ((b = b.length ? b[0] : "") && 0 == b.lastIndexOf("afma-", 0)) {
                                    var c = b.lastIndexOf("v");
                                    if (-1 < c && (b = b.substr(c + 1).match(/^(\d+\.\d+\.\d+|^\d+\.\d+|^\d+)(-.*)?$/))) {
                                        b = b[1];
                                        break b
                                    }
                                }
                                b = "0.0.0"
                            }
                            if (!a || "0.0.0" !== b) {
                                a = ju = !0;
                                break a
                            }
                        }
                        ju = !1
                    }
                    a = ju
                }
                a || (void 0 === ku && (ku = qb(mu(), "afma-sdk-a") ? !0 : !1), a = ku);lu = a
            }
            return lu ? !0 : qg() ? !1 : Lv()
        }
        a =
            z("Macintosh") || z("Linux") || z("Windows") || z("CrOS");
        return (fj.isSelected() || dj.isSelected() || ej.isSelected()) && a && yb() ? Lv() : !1
    }

    function Lv() {
        var a = !1,
            b = (new R(window.location.href)).o;
        Jv.forEach(function(c) {
            b.includes(c) && (a = !0)
        });
        return a
    }

    function Mv(a) {
        for (var b = 0, c = 0; c < a.length; c++) b = Math.imul(31, b) + a.charCodeAt(c) | 0;
        return b.toString()
    };
    var Nv, Qv = function(a, b, c) {
        if ("number" === typeof a) var d = {
            name: Ov(a)
        };
        else d = a, a = Pv(a.name);
        this.code = a;
        this.j = d;
        b = "Error " + b + ": " + this.getName();
        c && (b += ", " + c);
        Za.call(this, b)
    };
    Xa(Qv, Za);
    Qv.prototype.getName = function() {
        return this.j.name || ""
    };
    var Rv = {
            Fe: 1,
            Yg: 2,
            NOT_FOUND_ERR: 3,
            he: 4,
            ke: 5,
            Zg: 6,
            Ee: 7,
            ABORT_ERR: 8,
            Be: 9,
            Bh: 10,
            TIMEOUT_ERR: 11,
            Ae: 12,
            INVALID_ACCESS_ERR: 13,
            INVALID_STATE_ERR: 14
        },
        Sv = (v.j || v.l || Rv).Fe,
        Tv = (v.j || v.l || Rv).NOT_FOUND_ERR,
        Uv = (v.j || v.l || Rv).he,
        Vv = (v.j || v.l || Rv).ke,
        Wv = (v.j || v.l || Rv).Ee,
        Xv = (v.j || v.l || Rv).ABORT_ERR,
        Zv = (v.j || v.l || Rv).Be,
        $v = (v.j || v.l || Rv).TIMEOUT_ERR,
        aw = (v.j || v.l || Rv).Ae,
        bw = (v.DOMException || Rv).INVALID_ACCESS_ERR,
        cw = (v.DOMException || Rv).INVALID_STATE_ERR,
        Pv = function(a) {
            switch (a) {
                case "UnknownError":
                    return Sv;
                case "NotFoundError":
                    return Tv;
                case "ConstraintError":
                    return Uv;
                case "DataError":
                    return Vv;
                case "TransactionInactiveError":
                    return Wv;
                case "AbortError":
                    return Xv;
                case "ReadOnlyError":
                    return Zv;
                case "TimeoutError":
                    return $v;
                case "QuotaExceededError":
                    return aw;
                case "InvalidAccessError":
                    return bw;
                case "InvalidStateError":
                    return cw;
                default:
                    return Sv
            }
        },
        Ov = function(a) {
            switch (a) {
                case Sv:
                    return "UnknownError";
                case Tv:
                    return "NotFoundError";
                case Uv:
                    return "ConstraintError";
                case Vv:
                    return "DataError";
                case Wv:
                    return "TransactionInactiveError";
                case Xv:
                    return "AbortError";
                case Zv:
                    return "ReadOnlyError";
                case $v:
                    return "TimeoutError";
                case aw:
                    return "QuotaExceededError";
                case bw:
                    return "InvalidAccessError";
                case cw:
                    return "InvalidStateError";
                default:
                    return "UnknownError"
            }
        },
        dw = function(a, b) {
            return "error" in a ? new Qv(a.error, b) : new Qv({
                name: "UnknownError"
            }, b)
        },
        ew = function(a, b) {
            return "name" in a ? new Qv(a, b + ": " + a.message) : new Qv({
                name: "UnknownError"
            }, b)
        };
    var fw = function(a) {
            this.j = a
        },
        gw = v.IDBKeyRange || v.webkitIDBKeyRange;
    fw.prototype.range = function() {
        return this.j
    };

    function hw() {};
    /*

     Copyright 2005, 2007 Bob Ippolito. All Rights Reserved.
     Copyright The Closure Library Authors.
     SPDX-License-Identifier: MIT
    */
    var iw = function(a, b) {
        this.A = [];
        this.I = a;
        this.G = b || null;
        this.B = this.o = !1;
        this.l = void 0;
        this.M = this.K = this.D = !1;
        this.C = 0;
        this.j = null;
        this.J = 0
    };
    Xa(iw, hw);
    iw.prototype.cancel = function(a) {
        if (this.o) this.l instanceof iw && this.l.cancel();
        else {
            if (this.j) {
                var b = this.j;
                delete this.j;
                a ? b.cancel(a) : (b.J--, 0 >= b.J && b.cancel())
            }
            this.I ? this.I.call(this.G, this) : this.M = !0;
            this.o || jw(this, new kw(this))
        }
    };
    iw.prototype.F = function(a, b) {
        this.D = !1;
        lw(this, a, b)
    };
    var lw = function(a, b, c) {
            a.o = !0;
            a.l = c;
            a.B = !b;
            mw(a)
        },
        ow = function(a) {
            if (a.o) {
                if (!a.M) throw new nw(a);
                a.M = !1
            }
        };
    iw.prototype.callback = function(a) {
        ow(this);
        lw(this, !0, a)
    };
    var jw = function(a, b) {
            ow(a);
            lw(a, !1, b)
        },
        qw = function(a, b) {
            return pw(a, b, null)
        },
        pw = function(a, b, c, d) {
            a.A.push([b, c, d]);
            a.o && mw(a);
            return a
        };
    iw.prototype.then = function(a, b, c) {
        var d, e, f = new mk(function(g, h) {
            e = g;
            d = h
        });
        pw(this, e, function(g) {
            g instanceof kw ? f.cancel() : d(g);
            return rw
        }, this);
        return f.then(a, b, c)
    };
    iw.prototype.$goog_Thenable = !0;
    iw.prototype.isError = function(a) {
        return a instanceof Error
    };
    var tw = function(a) {
            return Gb(a.A, function(b) {
                return "function" === typeof b[1]
            })
        },
        rw = {},
        mw = function(a) {
            if (a.C && a.o && tw(a)) {
                var b = a.C,
                    c = uw[b];
                c && (v.clearTimeout(c.j), delete uw[b]);
                a.C = 0
            }
            a.j && (a.j.J--, delete a.j);
            b = a.l;
            for (var d = c = !1; a.A.length && !a.D;) {
                var e = a.A.shift(),
                    f = e[0],
                    g = e[1];
                e = e[2];
                if (f = a.B ? g : f) try {
                    var h = f.call(e || a.G, b);
                    h === rw && (h = void 0);
                    void 0 !== h && (a.B = a.B && (h == b || a.isError(h)), a.l = b = h);
                    if (kk(b) || "function" === typeof v.Promise && b instanceof v.Promise) d = !0, a.D = !0
                } catch (k) {
                    b = k, a.B = !0, tw(a) ||
                        (c = !0)
                }
            }
            a.l = b;
            d && (h = Ua(a.F, a, !0), d = Ua(a.F, a, !1), b instanceof iw ? (pw(b, h, d), b.K = !0) : b.then(h, d));
            c && (b = new vw(b), uw[b.j] = b, a.C = b.j)
        },
        nw = function() {
            Za.call(this)
        };
    Xa(nw, Za);
    nw.prototype.message = "Deferred has already fired";
    nw.prototype.name = "AlreadyCalledError";
    var kw = function() {
        Za.call(this)
    };
    Xa(kw, Za);
    kw.prototype.message = "Deferred was canceled";
    kw.prototype.name = "CanceledError";
    var vw = function(a) {
        this.j = v.setTimeout(Ua(this.o, this), 0);
        this.l = a
    };
    vw.prototype.o = function() {
        delete uw[this.j];
        throw this.l;
    };
    var uw = {};
    var ww = function() {
        O.call(this)
    };
    Xa(ww, O);
    ww.prototype.j = null;
    ww.prototype.next = function(a) {
        if (a) this.j["continue"](a);
        else this.j["continue"]()
    };
    ww.prototype.update = function(a) {
        var b = "updating via cursor with value ",
            c = new iw;
        try {
            var d = this.j.update(a)
        } catch (e) {
            return b += xg(a), jw(c, ew(e, b)), c
        }
        d.onsuccess = function() {
            c.callback()
        };
        d.onerror = function(e) {
            b += xg(a);
            jw(c, dw(e.target, b))
        };
        return c
    };
    ww.prototype.remove = function() {
        var a = new iw;
        try {
            var b = this.j["delete"]()
        } catch (c) {
            return jw(a, ew(c, "deleting via cursor")), a
        }
        b.onsuccess = function() {
            a.callback()
        };
        b.onerror = function(c) {
            jw(a, dw(c.target, "deleting via cursor"))
        };
        return a
    };
    var xw = function(a, b) {
        var c = new ww;
        try {
            var d = b ? b.range() : null;
            var e = a.openCursor(d)
        } catch (f) {
            throw c.W(), ew(f, a.name);
        }
        e.onsuccess = function(f) {
            c.j = f.target.result || null;
            c.j ? c.dispatchEvent("n") : c.dispatchEvent("c")
        };
        e.onerror = function() {
            c.dispatchEvent("e")
        };
        return c
    };
    var yw = function(a) {
        this.j = a
    };
    yw.prototype.getName = function() {
        return this.j.name
    };
    var zw = function(a, b, c) {
        var d = new iw;
        try {
            var e = a.j.get(c)
        } catch (f) {
            return b += " with key " + xg(c), jw(d, ew(f, b)), d
        }
        e.onsuccess = function(f) {
            d.callback(f.target.result)
        };
        e.onerror = function(f) {
            b += " with key " + xg(c);
            jw(d, dw(f.target, b))
        };
        return d
    };
    yw.prototype.get = function(a) {
        return zw(this, "getting from index " + this.getName(), a)
    };
    var Aw = function(a, b) {
        return xw(a.j, b)
    };
    var Bw = function(a) {
        this.j = a
    };
    Bw.prototype.getName = function() {
        return this.j.name
    };
    var Cw = function(a, b, c, d, e) {
            var f = new iw;
            try {
                var g = e ? a.j[b](d, e) : a.j[b](d)
            } catch (h) {
                return c += xg(d), e && (c += ", with key " + xg(e)), jw(f, ew(h, c)), f
            }
            g.onsuccess = function(h) {
                f.callback(h.target.result)
            };
            g.onerror = function(h) {
                c += xg(d);
                e && (c += ", with key " + xg(e));
                jw(f, dw(h.target, c))
            };
            return f
        },
        Dw = function(a, b) {
            return Cw(a, "put", "putting into " + a.getName() + " with value", b)
        };
    Bw.prototype.add = function(a, b) {
        return Cw(this, "add", "adding into " + this.getName() + " with value ", a, b)
    };
    Bw.prototype.remove = function(a) {
        var b = new iw;
        try {
            var c = this.j["delete"](a instanceof fw ? a.range() : a)
        } catch (e) {
            return c = "removing from " + this.getName() + " with key " + xg(a), jw(b, ew(e, c)), b
        }
        c.onsuccess = function() {
            b.callback()
        };
        var d = this;
        c.onerror = function(e) {
            var f = "removing from " + d.getName() + " with key " + xg(a);
            jw(b, dw(e.target, f))
        };
        return b
    };
    Bw.prototype.get = function(a) {
        var b = new iw;
        try {
            var c = this.j.get(a)
        } catch (e) {
            return c = "getting from " + this.getName() + " with key " + xg(a), jw(b, ew(e, c)), b
        }
        c.onsuccess = function(e) {
            b.callback(e.target.result)
        };
        var d = this;
        c.onerror = function(e) {
            var f = "getting from " + d.getName() + " with key " + xg(a);
            jw(b, dw(e.target, f))
        };
        return b
    };
    Bw.prototype.clear = function() {
        var a = "clearing store " + this.getName(),
            b = new iw;
        try {
            var c = this.j.clear()
        } catch (d) {
            return jw(b, ew(d, a)), b
        }
        c.onsuccess = function() {
            b.callback()
        };
        c.onerror = function(d) {
            jw(b, dw(d.target, a))
        };
        return b
    };
    var Ew = function(a) {
        try {
            return new yw(a.j.index("timestamp"))
        } catch (b) {
            throw ew(b, "getting index timestamp");
        }
    };
    Bw.prototype.count = function(a) {
        var b = new iw;
        try {
            var c = a ? a.range() : null,
                d = this.j.count(c);
            d.onsuccess = function(f) {
                b.callback(f.target.result)
            };
            var e = this;
            d.onerror = function(f) {
                jw(b, dw(f.target, e.getName()))
            }
        } catch (f) {
            jw(b, ew(f, this.getName()))
        }
        return b
    };
    var Fw = function(a, b) {
        O.call(this);
        this.j = a;
        this.o = b;
        this.l = new Tu(this);
        this.l.R(this.j, "complete", Ua(this.dispatchEvent, this, "complete"));
        this.l.R(this.j, "abort", Ua(this.dispatchEvent, this, "abort"));
        this.l.R(this.j, "error", this.oe)
    };
    Xa(Fw, O);
    l = Fw.prototype;
    l.oe = function(a) {
        a.target instanceof Qv ? this.dispatchEvent({
            type: "error",
            target: a.target
        }) : this.dispatchEvent({
            type: "error",
            target: dw(a.target, "in transaction")
        })
    };
    l.objectStore = function(a) {
        try {
            return new Bw(this.j.objectStore(a))
        } catch (b) {
            throw ew(b, "getting object store " + a);
        }
    };
    l.commit = function(a) {
        if (this.j.commit || !a) try {
            this.j.commit()
        } catch (b) {
            throw ew(b, "cannot commit the transaction");
        }
    };
    l.wait = function() {
        var a = new iw;
        Lj(this, "complete", Ua(a.callback, a));
        var b = Lj(this, "abort", function() {
            Uj(c);
            jw(a, new Qv(Xv, "waiting for transaction to complete"))
        });
        var c = Lj(this, "error", function(e) {
            Uj(b);
            jw(a, e.target)
        });
        var d = this.o;
        return qw(a, function() {
            return d
        })
    };
    l.abort = function() {
        this.j.abort()
    };
    l.O = function() {
        Fw.Aa.O.call(this);
        this.l.W()
    };
    var Gw = function(a) {
        O.call(this);
        this.j = a;
        this.l = new Tu(this);
        this.l.R(this.j, "abort", Ua(this.dispatchEvent, this, "abort"));
        this.l.R(this.j, "error", this.pe);
        this.l.R(this.j, "versionchange", this.Qe);
        this.l.R(this.j, "close", Ua(this.dispatchEvent, this, "close"))
    };
    Xa(Gw, O);
    l = Gw.prototype;
    l.Xc = !0;
    l.pe = function(a) {
        a = (a = a.target) && a.error;
        this.dispatchEvent({
            type: "error",
            errorCode: a && a.severity
        })
    };
    l.Qe = function(a) {
        this.dispatchEvent(new Hw(a.oldVersion, a.newVersion))
    };
    l.close = function() {
        this.Xc && (this.j.close(), this.Xc = !1)
    };
    l.getName = function() {
        return this.j.name
    };
    l.getVersion = function() {
        return Number(this.j.version)
    };
    var Iw = function(a) {
        var b = ["MediaSourceVideoChunk"];
        try {
            var c = a.j.transaction(b, "readwrite");
            return new Fw(c, a)
        } catch (d) {
            throw ew(d, "creating transaction");
        }
    };
    Gw.prototype.O = function() {
        Gw.Aa.O.call(this);
        this.l.W()
    };
    var Hw = function(a, b) {
        wj.call(this, "versionchange");
        this.oldVersion = a;
        this.newVersion = b
    };
    Xa(Hw, wj);
    var Jw = function(a) {
        var b = new iw;
        void 0 == Nv && (Nv = v.indexedDB || v.mozIndexedDB || v.webkitIndexedDB || v.moz_indexedDB);
        var c = Nv.open("VideoChunkPersistentStorage", 5);
        c.onsuccess = function(d) {
            d = new Gw(d.target.result);
            b.callback(d)
        };
        c.onerror = function(d) {
            jw(b, dw(d.target, "opening database VideoChunkPersistentStorage"))
        };
        c.onupgradeneeded = function(d) {
            if (a) {
                var e = new Gw(d.target.result);
                a(new Hw(d.oldVersion, d.newVersion), e, new Fw(d.target.transaction, e))
            }
        };
        c.onblocked = function() {};
        return b
    };
    var Kw = {
            Hh: "videoId",
            Qg: "itag",
            rh: "source",
            th: "startIndex"
        },
        Lw = function() {
            O.call(this);
            this.j = null
        };
    t(Lw, O);
    Lw.prototype.initialize = function() {
        var a = this;
        return Promise.resolve(Jw(this.l)).then(function(b) {
            return a.j = b
        }, function(b) {
            L(K.j(), "codf", b.message)
        })
    };
    var Mw = function(a) {
        return null !== a.j && a.j.Xc
    };
    Lw.prototype.close = function() {
        var a = this;
        return (new Promise(function(b) {
            return Nw(a, b)
        })).then(function() {
            return Ow()
        }).then(function() {
            return a.j.close()
        })
    };
    var Ow = function() {
            return "storage" in navigator && "estimate" in navigator.storage ? navigator.storage.estimate().then(function(a) {
                L(K.j(), "csue", String(a.usage))
            }) : Promise.resolve(void 0)
        },
        Sw = function(a, b) {
            b = Pw(b);
            if (!b) return Promise.resolve(null);
            var c = Qw(b);
            return Rw(a, c, b.lmt)
        },
        Uw = function(a, b, c, d) {
            if (c = Pw(c)) {
                var e = Qw(c),
                    f = c.startIndex;
                Tw(a, {
                    cacheId: e,
                    startIndex: f,
                    endIndex: f + b.byteLength - 1,
                    lmt: c.lmt,
                    timestamp: new Date(Date.now()),
                    isLastVideoChunk: d,
                    video: b
                })
            } else Promise.resolve(void 0)
        };
    Lw.prototype.l = function(a, b) {
        if (b.j.objectStoreNames.contains("MediaSourceVideoChunk")) try {
            b.j.deleteObjectStore("MediaSourceVideoChunk")
        } catch (d) {
            throw ew(d, "deleting object store MediaSourceVideoChunk");
        }
        a = {
            keyPath: "cacheId"
        };
        try {
            var c = new Bw(b.j.createObjectStore("MediaSourceVideoChunk", a))
        } catch (d) {
            throw ew(d, "creating object store MediaSourceVideoChunk");
        }
        b = {
            unique: !1
        };
        try {
            c.j.createIndex("timestamp", "timestamp", b)
        } catch (d) {
            throw ew(d, "creating new index timestamp with key path timestamp");
        }
    };
    var Nw = function(a, b) {
            var c = new Date(Date.now());
            c.setDate(c.getDate() - 30);
            c = new fw(gw.upperBound(c, void 0));
            var d = Aw(Ew(Iw(a.j).objectStore("MediaSourceVideoChunk")), c),
                e = d.R("n", function() {
                    d.remove();
                    d.next()
                });
            Lj(d, "c", function() {
                Uj(e);
                b()
            })
        },
        Pw = function(a) {
            var b = new vv(a);
            a = b.getId();
            var c = wv(b, "itag"),
                d = wv(b, "source"),
                e = wv(b, "lmt");
            (b = b.j.l.get("range")) ? (b = b.split("-")[0], b = !b || isNaN(b) ? null : parseInt(b, 10)) : b = null;
            var f = [];
            a ? c ? d ? e ? null === b && f.push("startIndex") : f.push("lmt") : f.push("source") :
                f.push("itag") : f.push("videoId");
            return 0 < f.length ? (L(K.j(), "civp", f.join("-")), null) : {
                videoId: a,
                itag: c,
                source: d,
                lmt: e,
                startIndex: b + 0
            }
        },
        Qw = function(a) {
            var b = Object.keys(Kw).sort().map(function(c) {
                return a[Kw[c]]
            }).join(",");
            return Mv(b)
        },
        Rw = function(a, b, c) {
            var d = Iw(a.j).objectStore("MediaSourceVideoChunk");
            return Promise.resolve(d.get(b)).then(function(e) {
                if (!e) return L(K.j(), "cenf", "1"), null;
                if (e.lmt !== c) return L(K.j(), "cdl", "1"), d.remove(b).then(null, function(f) {
                    L(K.j(), "crdlvf", f.message)
                }), null;
                L(K.j(), "cefml", "1");
                return {
                    endIndex: e.endIndex,
                    isLastVideoChunk: e.isLastVideoChunk,
                    video: e.video
                }
            }, function(e) {
                L(K.j(), "cgvf", e.message)
            })
        },
        Tw = function(a, b) {
            a = Iw(a.j).objectStore("MediaSourceVideoChunk");
            Promise.resolve(Dw(a, b)).then(function() {
                L(K.j(), "cavs", "1")
            }, function(c) {
                L(K.j(), "cavf", c.message)
            })
        };
    var Vw = function(a) {
        O.call(this);
        var b = this;
        this.F = new R(a);
        this.G = this.j = this.o = this.l = 0;
        this.A = (this.D = Kv()) ? iu(Lw) : null;
        Xe(this, function() {
            We(b.A)
        });
        this.I = this.D ? this.A.initialize() : null;
        this.C = null
    };
    t(Vw, O);
    Vw.prototype.isComplete = function() {
        return 3 === this.j
    };
    var Xw = function(a) {
            Fa(function(b) {
                if (1 == b.j) return 2 === a.j && (a.j = 1), wa(b, Ww(a), 4);
                var c = 3 < a.G;
                if (c && null !== a.C) {
                    var d = Iv("media_source_error", {
                        code: 0 < a.o ? MediaError.MEDIA_ERR_NETWORK : MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED,
                        message: 'Response code "' + a.C + '" with ' + a.l + " bytes requested and " + a.o + " bytes loaded"
                    });
                    a.dispatchEvent(d)
                }
                a.o < a.l && 3 !== a.j && !c ? b.j = 1 : (3 !== a.j && (a.j = 0), b.j = 0)
            })
        },
        Ww = function(a) {
            var b;
            return Fa(function(c) {
                switch (c.j) {
                    case 1:
                        b = a.o + "-" + (a.l - 1);
                        Mt(a.F, "range", b);
                        if (!a.D) {
                            c.j = 2;
                            break
                        }
                        return wa(c,
                            a.I, 3);
                    case 3:
                        return c.return(Yw(a));
                    case 2:
                        return c.l = 4, wa(c, Zw(a), 6);
                    case 6:
                        c.j = 0;
                        c.l = 0;
                        break;
                    case 4:
                        ya(c), a.G++, c.j = 0
                }
            })
        },
        Yw = function(a) {
            var b;
            return Fa(function(c) {
                switch (c.j) {
                    case 1:
                        return wa(c, Sw(a.A, a.F), 2);
                    case 2:
                        if (b = c.A) {
                            b.isLastVideoChunk && (a.j = 3);
                            $w(a, b.video, 0);
                            c.j = 0;
                            break
                        }
                        c.l = 4;
                        return wa(c, Zw(a), 6);
                    case 6:
                        c.j = 0;
                        c.l = 0;
                        break;
                    case 4:
                        ya(c), a.G++, c.j = 0
                }
            })
        },
        Zw = function(a) {
            return new Promise(function(b, c) {
                var d = new XMLHttpRequest,
                    e = 0,
                    f = a.l - a.o;
                d.addEventListener("load", function() {
                    Uh("lvlcl");
                    if (400 <= d.status) return L(K.j(), "lvlxes", d.status.toString()), a.C = d.status, c();
                    var g = d.response;
                    g.byteLength < f && (a.j = 3);
                    var h = $w(a, g, e);
                    e += h;
                    a.D && 0 < g.byteLength && Uw(a.A, g, a.F, g.byteLength < f);
                    b()
                });
                d.addEventListener("timeout", function() {
                    Uh("lvlct");
                    a.C = d.status;
                    c()
                });
                d.addEventListener("error", function() {
                    Uh("lvlce");
                    a.C = d.status;
                    c()
                });
                d.addEventListener("progress", function() {
                    if (400 <= d.status) a.C = d.status;
                    else {
                        var g = $w(a, d.response, e);
                        e += g
                    }
                });
                d.responseType = "arraybuffer";
                d.open("get", a.F.toString());
                d.send(null)
            })
        },
        $w = function(a, b, c) {
            if (null === b) return 0;
            b = b.slice(c);
            a.o += b.byteLength;
            a.dispatchEvent({
                type: "progress",
                Me: b
            });
            return b.byteLength
        };
    Vw.prototype.O = function() {
        this.D && Mw(this.A) && this.A.close();
        O.prototype.O.call(this)
    };

    function ax() {
        return !!window.MediaSource
    }

    function bx(a) {
        return [43, 44, 45].includes(a) && tc ? !1 : Av[a] ? (a = Hv(a), !!a && ax() && MediaSource.isTypeSupported(a)) : !1
    };
    var cx = function() {};
    cx.prototype.j = function(a, b, c) {
        return 0 === c ? 1E6 : 5E3 > b - a ? 3E5 : 0
    };
    var dx = function(a, b, c, d) {
        this.url = a;
        this.mimeType = b;
        this.chunkSize = c;
        this.j = void 0 === d ? null : d
    };
    var gx = function(a) {
        O.call(this);
        var b = this;
        this.l = a;
        this.A = this.l.map(function(c) {
            return iu(Vw, c.url)
        });
        this.ga = iu(MediaSource);
        this.j = [];
        this.o = window.URL.createObjectURL(this.ga);
        this.G = 0;
        this.F = !1;
        this.D = function() {
            return ex(b)
        };
        this.ga.addEventListener("sourceopen", this.D);
        this.I = fx(this);
        this.C = 0
    };
    t(gx, O);
    var fx = function(a) {
            for (var b = [], c = 0; c < a.l.length; ++c) b.push(new cx);
            return b
        },
        ex = function(a) {
            Uh("msms_oso");
            for (var b = {}, c = 0; c < a.l.length; b = {
                    Cb: b.Cb,
                    Bb: b.Bb
                }, ++c) {
                var d = a.l[c];
                L(K.j(), "msms_mime" + c, d.mimeType);
                L(K.j(), "msms_cs" + c, d.chunkSize.toString());
                b.Cb = a.ga.addSourceBuffer(d.mimeType);
                b.Bb = a.A[c];
                b.Bb.R("progress", function(e) {
                    return function(f) {
                        var g = e.Bb;
                        f = f.Me;
                        0 !== f.byteLength && e.Cb.appendBuffer(f);
                        g.isComplete() && (a.G++, a.G === a.j.length && hx(a))
                    }
                }(b));
                b.Bb.R("media_source_error", function(e) {
                    a.dispatchEvent(e)
                });
                b.Cb ? a.j.push(b.Cb) : Uh("msms_sbf" + c)
            }
            L(K.j(), "msms_ns", a.j.length.toString());
            a.F = !0;
            ix(a)
        },
        hx = function(a) {
            Promise.all(a.j.map(function(b) {
                return new Promise(function(c) {
                    b.updating ? b.addEventListener("updateend", function() {
                        c()
                    }) : c()
                })
            })).then(function() {
                return a.ga.endOfStream()
            })
        },
        ix = function(a) {
            if (a.F)
                for (var b = 0; b < a.l.length; ++b) {
                    var c = a.A[b],
                        d = a.j[b];
                    d = 0 === d.buffered.length ? 0 : 1E3 * d.buffered.end(0);
                    d = a.I[b].j(a.C, d, c.l);
                    0 !== d && (1 === c.j ? (c.l += d, c.j = 2) : 0 === c.j && (c.l += d, c.j = 1, Xw(c)))
                }
        };
    gx.prototype.O = function() {
        this.o && window.URL.revokeObjectURL(this.o);
        for (var a = r(this.A), b = a.next(); !b.done; b = a.next()) b.value.W();
        this.ga.removeEventListener("sourceopen", this.D);
        O.prototype.O.call(this)
    };
    var jx = RegExp("/pagead/conversion|/pagead/adview|/pagead/gen_204|/activeview?|csi.gstatic.com/csi|google.com/pagead/xsul|google.com/ads/measurement/l|googleads.g.doubleclick.net/pagead/ide_cookie|googleads.g.doubleclick.net/xbbe/pixel"),
        kx = RegExp("outstream.min.js"),
        lx = RegExp("outstream.min.css"),
        mx = RegExp("fonts.gstatic.com"),
        nx = RegExp("googlevideo.com/videoplayback|c.2mdn.net/videoplayback|gcdn.2mdn.net/videoplayback"),
        ox = RegExp("custom.elements.min.js");

    function px(a, b) {
        var c = 0,
            d = 0,
            e = 0,
            f = 0,
            g = 0,
            h = 0,
            k = 0,
            n = !1,
            m = !1;
        if ("function" === typeof La("performance.getEntriesByType", v) && "transferSize" in v.PerformanceResourceTiming.prototype) {
            var x = v.performance.getEntriesByType("resource");
            x = r(x);
            for (var u = x.next(); !u.done; u = x.next()) u = u.value, jx.test(u.name) || (f += 1, u.transferSize ? (c += u.transferSize, u.encodedBodySize && u.transferSize < u.encodedBodySize && (h += 1, e += u.encodedBodySize, kx.test(u.name) && (n = !0), lx.test(u.name) && (m = !0)), nx.test(u.name) && (d += u.transferSize)) :
                0 == u.transferSize && 0 == u.encodedBodySize ? ox.test(u.name) ? c += 6686 : mx.test(u.name) || (k += 1, Th(K.j(), {
                    event_name: "unmeasurable_asset",
                    resource_name: u.name,
                    encoded_body_size: u.encodedBodySize,
                    transfer_size: u.transferSize
                })) : (g += 1, e += u.encodedBodySize, kx.test(u.name) && (n = !0), lx.test(u.name) && (m = !0)));
            x = 0;
            if (a.duration) {
                for (u = 0; u < a.buffered.length; u++) x += a.buffered.end(u) - a.buffered.start(u);
                x = Math.min(x, a.duration)
            }
            Th(K.j(), {
                event_name: b,
                asset_bytes: c,
                video_bytes: d,
                cached_data_bytes: e,
                js_cached: n,
                css_cached: m,
                num_assets: f,
                num_assets_cached: g,
                num_assets_cache_validated: h,
                num_assets_unmeasurable: k,
                video_played_seconds: a.currentTime.toFixed(2),
                video_muted: a.muted,
                video_seconds_loaded: x.toFixed(2)
            })
        } else L(K.j(), "error", "reporting_timing_not_supported")
    };

    function qx(a) {
        var b = K.j(),
            c = a.getVideoPlaybackQuality && a.getVideoPlaybackQuality();
        c ? (a = a.currentTime, L(b, "vqdf", String(c.droppedVideoFrames)), L(b, "vqtf", String(c.totalVideoFrames)), L(b, "vqfr", String(Math.round(c.totalVideoFrames / a)))) : L(b, "vqu", "1")
    };
    var rx = function() {};
    rx.prototype.toString = function() {
        return "video_mute"
    };
    var sx = new rx;
    var tx = function(a) {
        E.call(this);
        this.C = 1;
        this.o = [];
        this.B = 0;
        this.j = [];
        this.l = {};
        this.F = !!a
    };
    Xa(tx, E);
    var ux = function(a, b, c) {
            var d = sx.toString(),
                e = a.l[d];
            e || (e = a.l[d] = []);
            var f = a.C;
            a.j[f] = d;
            a.j[f + 1] = b;
            a.j[f + 2] = c;
            a.C = f + 3;
            e.push(f)
        },
        vx = function(a, b, c) {
            var d = a.l[sx.toString()];
            if (d) {
                var e = a.j;
                (d = d.find(function(f) {
                    return e[f + 1] == b && e[f + 2] == c
                })) && a.A(d)
            }
        };
    tx.prototype.A = function(a) {
        var b = this.j[a];
        if (b) {
            var c = this.l[b];
            0 != this.B ? (this.o.push(a), this.j[a + 1] = function() {}) : (c && Lb(c, a), delete this.j[a], delete this.j[a + 1], delete this.j[a + 2])
        }
        return !!b
    };
    tx.prototype.D = function(a, b) {
        var c = this.l[a];
        if (c) {
            for (var d = Array(arguments.length - 1), e = 1, f = arguments.length; e < f; e++) d[e - 1] = arguments[e];
            if (this.F)
                for (e = 0; e < c.length; e++) {
                    var g = c[e];
                    wx(this.j[g + 1], this.j[g + 2], d)
                } else {
                    this.B++;
                    try {
                        for (e = 0, f = c.length; e < f && !this.xa(); e++) g = c[e], this.j[g + 1].apply(this.j[g + 2], d)
                    } finally {
                        if (this.B--, 0 < this.o.length && 0 == this.B)
                            for (; c = this.o.pop();) this.A(c)
                    }
                }
        }
    };
    var wx = function(a, b, c) {
        ik(function() {
            a.apply(b, c)
        })
    };
    tx.prototype.clear = function(a) {
        if (a) {
            var b = this.l[a];
            b && (b.forEach(this.A, this), delete this.l[a])
        } else this.j.length = 0, this.l = {}
    };
    tx.prototype.O = function() {
        tx.Aa.O.call(this);
        this.clear();
        this.o.length = 0
    };
    var xx = function(a) {
        E.call(this);
        this.j = new tx(a);
        Ye(this, this.j)
    };
    Xa(xx, E);
    xx.prototype.clear = function(a) {
        this.j.clear(void 0 !== a ? a.toString() : void 0)
    };
    var yx = function(a) {
        a = void 0 === a ? null : a;
        E.call(this);
        this.j = new Tu(this);
        Ye(this, this.j);
        this.xb = a
    };
    t(yx, E);
    var zx = function(a, b, c) {
        a.xb && (ux(a.xb.j, b, c), Xe(a, function() {
            vx(a.xb.j, b, c)
        }))
    };
    var Ax = function(a, b) {
        yx.call(this, b);
        zx(this, function(c) {
            c ? a.show() : a.hide()
        }, this)
    };
    t(Ax, yx);
    var Bx = function() {
        O.call(this);
        this.element = null;
        this.l = new Tu(this);
        Ye(this, this.l)
    };
    t(Bx, O);
    var Dx = function(a, b, c) {
        c = void 0 === c ? !0 : c;
        Bx.call(this);
        a.setAttribute("crossorigin", "anonymous");
        var d = kg("TRACK");
        d.setAttribute("kind", "captions");
        d.setAttribute("src", b);
        d.setAttribute("default", "");
        a.appendChild(d);
        this.j = a.textTracks[0];
        Cx(this);
        c ? this.show() : this.hide()
    };
    t(Dx, Bx);
    var Cx = function(a) {
        var b = a.j;
        b.addEventListener("cuechange", function() {
            for (var c = b.cues, d = 0; d < c.length; d++) {
                var e = c[d];
                e.align = "center";
                e.position = "auto"
            }
        }, {
            once: !0
        })
    };
    Dx.prototype.show = function() {
        this.j.mode = "showing"
    };
    Dx.prototype.hide = function() {
        this.j.mode = "hidden"
    };

    function Ex(a, b) {
        if ("undefined" !== typeof ReportingObserver) {
            var c = function(e) {
                    e = r(e);
                    for (var f = e.next(); !f.done; f = e.next()) f = f.value, a(f) && b(f)
                },
                d = new ReportingObserver(c, {
                    buffered: !0
                });
            v.addEventListener("pagehide", function() {
                c(d.takeRecords(), d);
                d.disconnect()
            });
            d.observe()
        }
    }

    function Fx(a) {
        a = void 0 === a ? null : a;
        Ex(function(b) {
            return b.body && "HeavyAdIntervention" === b.body.id
        }, function(b) {
            var c = b.body.message,
                d = K.j();
            L(d, "ham", c);
            c.includes("CPU") ? L(d, "hacpu", "true") : c.includes("network") && L(d, "habytes", "true");
            a && a(b)
        })
    };
    var Gx = "autoplay controls crossorigin demuxedaudiosrc demuxedvideosrc loop muted playsinline poster preload src webkit-playsinline x-webkit-airplay".split(" "),
        Hx = "autoplay buffered controls crossOrigin currentSrc currentTime defaultMuted defaultPlaybackRate disableRemotePlayback duration ended loop muted networkState onerror onwaitingforkey paused played playsinline poster preload preservesPitch mozPreservesPitch webkitPreservesPitch readyState seekable videoWidth videoHeight volume textTracks canPlayType captureStream getVideoPlaybackQuality load pause play setSinkId oncanplay oncanplaythrough onload onplay onpause onended onfullscreenchange onfullscreenerror addEventListener dispatchEvent removeEventListener requestFullscreen".split(" "),
        Ix = {
            childList: !0
        },
        Jx = !RegExp("^\\s*class\\s*\\{\\s*\\}\\s*$").test(function() {}.toString()),
        Kx = HTMLElement;
    Jx && (Kx = function() {
        var a = Object.getPrototypeOf(this).constructor;
        return v.Reflect.construct(HTMLElement, [], a)
    }, Object.setPrototypeOf(Kx, HTMLElement), Object.setPrototypeOf(Kx.prototype, HTMLElement.prototype));
    var Lx = function(a) {
            if (null !== a) {
                a = r(a);
                for (var b = a.next(); !b.done; b = a.next())
                    if (b = b.value, b.nodeName === "TRACK".toString()) return b
            }
            return null
        },
        Mx = function(a, b) {
            this.code = a;
            this.message = void 0 === b ? "" : b
        },
        Nx = function(a) {
            Mx.call(this, MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED, void 0 === a ? "" : a)
        };
    t(Nx, Mx);
    var Rx = function() {
        var a = Kx.call(this) || this;
        L(K.j(), "ulv", "1");
        a.ga = null;
        a.Rd = null;
        a.zd = null;
        a.T = kg("VIDEO");
        Ox(a);
        a.xb = new xx;
        Px(a);
        a.Wb = null;
        Qx(a);
        a.attachShadow({
            mode: "open"
        });
        a.shadowRoot.appendChild(a.T);
        Fx(function() {
            L(K.j(), "has", a.src || a.rb);
            L(K.j(), "hat", String(a.T.currentTime))
        });
        a.uc = !1;
        a.Td = !1;
        a.Nb = null;
        a.Ra = null;
        a.Mf = !1;
        return a
    };
    t(Rx, Kx);
    Rx.prototype.attributeChangedCallback = function(a, b, c) {
        switch (a) {
            case "src":
                Sx(this, c);
                break;
            case "demuxedaudiosrc":
            case "demuxedvideosrc":
                Tx(this);
                break;
            case "muted":
                this.T[a] = "" === c ? !0 : !!c;
                Ux(this, a, c);
                break;
            default:
                Ux(this, a, c)
        }
    };
    var Ux = function(a, b, c) {
            c !== a.T.getAttribute(b) && (null === c ? a.T.removeAttribute(b) : a.T.setAttribute(b, c))
        },
        Vx = function(a) {
            a.ga && (a.T.removeEventListener("timeupdate", a.Nb), a.ga.W(), a.ga = null)
        },
        Wx = function(a, b) {
            a.zd = b;
            a.T.dispatchEvent(new Event("error"))
        },
        Ox = function(a) {
            Xx(a);
            Yx(a);
            a.T.addEventListener("loadedmetadata", function() {
                a.Ra = Ku(a);
                a.Ra.then(function(b) {
                    var c = a.T.videoWidth,
                        d = a.T.videoHeight,
                        e = b.width,
                        f = b.height;
                    0 < c && 0 < d && 0 < e && 0 < f && (b = b.width / b.height, c /= d, .97 <= Math.min(c, b) / Math.max(c, b) ?
                        Qk(a.T, {
                            "object-fit": "cover"
                        }) : Qk(a.T, {
                            "object-fit": "contain"
                        }))
                })
            });
            a.T.addEventListener("play", function() {
                a.Td || (px(a.T, "first_play"), a.Td = !0)
            });
            a.T.addEventListener("pause", function() {
                a.uc || (px(a.T, "first_pause"), qx(a.T), a.uc = !0)
            });
            Mj(v, "pagehide", function() {
                a.uc || (px(a.T, "first_pause"), qx(a.T), a.uc = !0)
            });
            a.T.addEventListener("stalled", function() {
                L(K.j(), "ves", "1")
            });
            (new Du(a.T)).R("playbackStalled", function() {
                return L(K.j(), "pbs", "1")
            });
            a.T.addEventListener("media_source_error", function(b) {
                Vx(a);
                b = b.detail;
                Wx(a, new Mx(b.code, b.message))
            });
            Zx(a)
        },
        Qx = function(a) {
            var b = Lx(a.childNodes);
            b && $x(a, b);
            null === a.Wb && ay(a)
        },
        ay = function(a) {
            if (v.MutationObserver) {
                var b = new MutationObserver(function(c) {
                    c = r(c);
                    for (var d = c.next(); !d.done; d = c.next())
                        if (d = d.value, "childList" === d.type && (d = Lx(d.addedNodes))) {
                            $x(a, d);
                            b.disconnect();
                            break
                        }
                });
                b.observe(a, Ix)
            }
        },
        Px = function(a) {
            a.T.addEventListener("volumechange", function() {
                a.xb.j.D(sx.toString(), a.T.muted)
            })
        },
        $x = function(a, b) {
            if (null === a.Wb && b.hasAttribute("src")) {
                var c =
                    b.getAttribute("src");
                a.Wb = new Dx(a.T, c, b.hasAttribute("default"));
                new Ax(a.Wb, a.xb);
                c.includes("kind=asr") && L(K.j(), "act", "1")
            }
        },
        Sx = function(a, b) {
            if (b !== a.Rd) {
                a.Rd = b;
                a.Mf && b && tu(b) && (b = uu(b));
                var c = b ? Gv(b) : null,
                    d = !!c && bx(c);
                L(K.j(), "umsem", d ? "1" : "0");
                d ? (b = iu(dx, b, Hv(c), 1E3 * yv[c], null), a.ga = iu(gx, [b]), a.ga.R("media_source_error", function(e) {
                    e = Iv("media_source_error", e.detail);
                    a.T.dispatchEvent(e)
                }), a.Nb = function() {
                    var e = a.ga;
                    e.C = 1E3 * a.T.currentTime;
                    ix(e)
                }, a.T.addEventListener("timeupdate", a.Nb), Ux(a,
                    "src", a.ga.o)) : (Vx(a), Ux(a, "src", b));
                a.T.load()
            }
        },
        Tx = function(a) {
            a.src && Wx(a, new Mx(MediaError.MEDIA_ERR_ABORTED, "Setting demuxed src after src is already set."));
            if (!a.Gb && !a.rb && a.ga) Vx(a), Ux(a, "src", null), a.T.load();
            else if (a.Gb && a.rb) {
                var b = Gv(a.Gb),
                    c = Gv(a.rb);
                if (c && bx(c))
                    if (b && bx(b)) {
                        var d = !!c && bx(c) && !!b && bx(b);
                        L(K.j(), "umsed", d ? "1" : "0");
                        c = iu(dx, a.rb, Hv(c), -1, null);
                        b = iu(dx, a.Gb, Hv(b), -1, null);
                        a.ga = iu(gx, [c, b]);
                        a.ga.R("media_source_error", function(e) {
                            e = Iv("media_source_error", e.detail);
                            a.T.dispatchEvent(e)
                        });
                        a.Nb = function() {
                            var e = a.ga;
                            e.C = 1E3 * a.T.currentTime;
                            ix(e)
                        };
                        a.T.addEventListener("timeupdate", a.Nb);
                        Ux(a, "src", a.ga.o);
                        a.T.load()
                    } else Wx(a, new Nx('Audio itag "' + b + '" not supported.'));
                else Wx(a, new Nx('Video itag "' + c + '" not supported.'))
            }
        },
        Xx = function(a) {
            for (var b = {}, c = r(Hx), d = c.next(); !d.done; b = {
                    Ba: b.Ba,
                    zc: b.zc
                }, d = c.next()) b.Ba = d.value, b.Ba in a.T && ("function" === typeof a.T[b.Ba] ? (b.zc = a.T[b.Ba].bind(a.T), Object.defineProperty(a, b.Ba, {
                    set: function(e) {
                        return function(f) {
                            a.T[e.Ba] = f
                        }
                    }(b),
                    get: function(e) {
                        return function() {
                            return e.zc
                        }
                    }(b)
                })) :
                Object.defineProperty(a, b.Ba, {
                    set: function(e) {
                        return function(f) {
                            a.T[e.Ba] = f
                        }
                    }(b),
                    get: function(e) {
                        return function() {
                            return a.T[e.Ba]
                        }
                    }(b)
                }))
        },
        Yx = function(a) {
            Object.defineProperty(a, "error", {
                set: function() {},
                get: function() {
                    return a.T.error ? a.T.error : a.zd
                }
            })
        },
        Zx = function(a) {
            a.T.style.width = Xk();
            a.T.style.height = Xk()
        };
    Rx.prototype.disconnectedCallback = function() {
        if (this.Ra) {
            var a = Gu.get(this.Ra);
            Ju(a)
        }
        Kx.prototype.disconnectedCallback && Kx.prototype.disconnectedCallback.call(this)
    };
    ea.Object.defineProperties(Rx.prototype, {
        Gb: {
            configurable: !0,
            enumerable: !0,
            set: function(a) {
                this.setAttribute("demuxedaudiosrc", a)
            },
            get: function() {
                return this.getAttribute("demuxedaudiosrc")
            }
        },
        rb: {
            configurable: !0,
            enumerable: !0,
            set: function(a) {
                this.setAttribute("demuxedvideosrc", a)
            },
            get: function() {
                return this.getAttribute("demuxedvideosrc")
            }
        },
        src: {
            configurable: !0,
            enumerable: !0,
            set: function(a) {
                this.setAttribute("src", a)
            },
            get: function() {
                return this.getAttribute("src")
            }
        }
    });
    ea.Object.defineProperties(Rx, {
        observedAttributes: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return Gx
            }
        }
    });
    v.customElements && (v.customElements.get("lima-video") || v.customElements.define("lima-video", Rx));

    function by() {
        var a = iu(Lw);
        a.initialize().then(function(b) {
            b && (b = Iv("initialized"), a.dispatchEvent(b))
        });
        return a
    }
    var dy = function(a, b, c, d, e) {
        E.call(this);
        this.K = a;
        this.P = new R(b.url);
        this.l = c;
        this.B = e;
        this.I = b.chunkSize;
        this.Ca = d;
        (this.X = b.j) || this.P.l.remove("alr");
        L(K.j(), "sl_dv" + this.B, (null != this.X).toString());
        this.Y = !this.X;
        this.qb = 0;
        this.j = new XMLHttpRequest;
        this.ba = this.U = this.Yb = this.F = this.o = 0;
        this.Z = .1;
        this.D = [];
        this.N = !1;
        this.ca = this.ra = this.qa = null;
        this.Ja = !1;
        this.Zb = this.L = this.C = this.ob = this.pb = null;
        this.G = !1;
        if (this.A = Kv()) this.C = by(), Ye(this, this.C);
        cy(this)
    };
    t(dy, E);
    var ey = function(a, b) {
            b = Iv("media_source_error", b);
            a.K.dispatchEvent(b)
        },
        fy = function(a, b) {
            ey(a, {
                code: 1 < a.o ? MediaError.MEDIA_ERR_NETWORK : MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED,
                message: b
            })
        },
        cy = function(a) {
            a.qa = function() {
                gy(a);
                if (a.Y) {
                    var b = a.j.responseText;
                    a.N = !b || b.length < a.I;
                    a.U = 0;
                    Uh("sl_cc" + a.B + "_" + a.o);
                    a.F++;
                    hy(a)
                }
            };
            a.ra = function() {
                return gy(a)
            };
            a.ca = function() {
                Uh("sl_ec" + a.B + "_" + a.o);
                fy(a, "Failed to load chunk " + a.o + " for stream " + a.B)
            };
            a.j.addEventListener("load", a.qa);
            a.j.addEventListener("progress",
                a.ra);
            a.j.addEventListener("error", a.ca);
            a.l.addEventListener("updateend", function() {
                a.l.buffered.length && (a.Yb = a.l.buffered.end(0), a.A ? a.G && !a.l.updating && a.o === a.F && (Uh("sl_lc" + a.B), a.Ca()) : a.N && !a.l.updating && a.o === a.F && (Uh("sl_lc" + a.B), a.Ca()));
                !a.Ja && 1 < a.K.buffered.length && (L(K.j(), "dbr", "1"), a.Ja = !0)
            });
            a.l.addEventListener("update", function() {
                a.D.length && !a.l.updating && a.l.appendBuffer(a.D.shift())
            });
            a.l.addEventListener("error", function() {
                Uh("msb_err" + a.B);
                ey(a, {
                    code: MediaError.MEDIA_ERR_DECODE,
                    message: "Error on SourceBuffer " + a.B
                })
            });
            a.A ? (Mw(a.C) ? iy(a) : a.pb = Mj(a.C, "initialized", function() {
                iy(a)
            }), a.ob = Mj(a.C, "get_video_succeeded", function() {
                hy(a)
            })) : iy(a)
        },
        ky = function(a) {
            Uh("sl_rc" + a.B + "-" + a.o);
            var b = jy(a);
            a.j.open("get", b);
            a.j.overrideMimeType("text/plain; charset=x-user-defined");
            a.j.send(null);
            a.A && (a.L = null, a.Zb = b)
        },
        gy = function(a) {
            if (400 <= a.j.status) fy(a, 'Response code "' + a.j.status + '" on loading chunk ' + a.o + " for stream " + a.B);
            else {
                if (!a.Y) {
                    var b = a.j.getResponseHeader("content-type");
                    if (b && 0 <= b.indexOf("text/plain")) {
                        a.j.readyState === XMLHttpRequest.DONE && (a.P = new R(a.j.response), a.o = 0, a.F = 0, a.qb++, iy(a));
                        return
                    }
                    a.Y = !0;
                    Uh("sl_redc" + a.B);
                    L(K.j(), "sl_tr" + a.B, a.qb.toString())
                }
                a.P.l.remove("alr");
                if (a.j.readyState === XMLHttpRequest.LOADING || a.j.readyState === XMLHttpRequest.DONE) b = ly(a, a.U), a.U = a.j.response.length, a.ba += b.byteLength, my(a, b);
                if (a.A && a.j.readyState === XMLHttpRequest.DONE && (b = ly(a, 0), 0 < b.byteLength)) {
                    var c = a.j.responseText;
                    a.G = !c || c.length < a.I;
                    Uw(a.C, b, new R(a.Zb), a.G)
                }
            }
        },
        my = function(a, b) {
            0 < b.byteLength && (a.l.updating || a.D.length ? a.D.push(b) : a.l.appendBuffer(b))
        },
        ly = function(a, b) {
            a = a.j.response;
            for (var c = new Uint8Array(a.length - b), d = 0; d < c.length; d++) c[d] = a.charCodeAt(d + b) & 255;
            return c.buffer
        },
        hy = function(a) {
            var b = vu; - 1 != b && b < a.ba + a.I ? (a.K.pause(), vu = -1, b = !1) : (b = a.F === a.o && !a.l.updating && !a.D.length, b = a.A ? !a.G && b && a.K.currentTime >= a.Z : !a.N && b && a.K.currentTime >= a.Z);
            b && (a.Z = a.Yb + .1, iy(a))
        },
        jy = function(a) {
            var b = a.A && a.L ? a.L + 1 : a.o * a.I;
            return Mt(a.P, "range", b + "-" + (b + a.I -
                1)).toString()
        },
        iy = function(a) {
            if (a.A) {
                var b = new R(jy(a));
                Sw(a.C, b).then(function(c) {
                    c ? (a.L = parseInt(c.endIndex, 10), a.G = c.isLastVideoChunk, my(a, c.video), c = Iv("get_video_succeeded"), a.C.dispatchEvent(c), a.F++) : ky(a);
                    a.o++
                })
            } else ky(a), a.o++
        };
    dy.prototype.isComplete = function() {
        return this.A ? this.G && !this.l.updating && !this.D.length : this.N && !this.l.updating && !this.D.length
    };
    dy.prototype.O = function() {
        this.A && Mw(this.C) && this.C.close();
        this.j.removeEventListener("load", this.qa);
        this.j.removeEventListener("progress", this.ra);
        this.j.removeEventListener("error", this.ca);
        Uj(this.pb);
        Uj(this.ob);
        E.prototype.O.call(this)
    };
    var oy = function(a, b) {
        E.call(this);
        var c = this;
        this.B = a;
        this.F = b;
        this.ga = new MediaSource;
        this.D = [];
        this.l = [];
        this.j = this.o = null;
        this.A = !1;
        this.C = function() {
            return ny(c)
        };
        this.ga.addEventListener("sourceopen", this.C)
    };
    t(oy, E);
    var py = function(a) {
            a.o && a.B.removeEventListener("timeupdate", a.o)
        },
        ny = function(a) {
            Uh("msmsw_oso");
            a.o = function() {
                if (!a.A)
                    for (var e = r(a.l), f = e.next(); !f.done; f = e.next()) hy(f.value)
            };
            a.B.addEventListener("timeupdate", a.o);
            for (var b = 0; b < a.F.length; b++) {
                var c = a.F[b];
                L(K.j(), "msmsw_mime" + b, c.mimeType);
                L(K.j(), "msmsw_cs" + b, c.chunkSize.toString());
                var d = a.ga.addSourceBuffer(c.mimeType);
                d ? (a.D.push(d), c = iu(dy, a.B, c, d, function() {
                    a: if (!a.A) {
                        for (var e = r(a.l), f = e.next(); !f.done; f = e.next())
                            if (!f.value.isComplete()) break a;
                        a.ga.endOfStream();
                        a.A = !0;
                        py(a)
                    }
                }, b), a.l.push(c)) : Uh("msmsw_sbf" + b)
            }
            L(K.j(), "msmsw_ns", a.D.length.toString())
        };
    oy.prototype.O = function() {
        this.j && window.URL.revokeObjectURL(this.j);
        for (var a = r(this.l), b = a.next(); !b.done; b = a.next()) b.value.W();
        py(this);
        this.ga.removeEventListener("sourceopen", this.C);
        E.prototype.O.call(this)
    };
    var qy = function() {
        throw Error("Do not instantiate directly");
    };
    qy.prototype.j = null;
    qy.prototype.getContent = function() {
        return this.content
    };
    qy.prototype.toString = function() {
        return this.content
    };
    var ry = function() {
        qy.call(this)
    };
    Xa(ry, qy);
    var sy = function(a) {
        function b(c) {
            this.content = c
        }
        b.prototype = a.prototype;
        return function(c, d) {
            c = new b(String(c));
            void 0 !== d && (c.j = d);
            return c
        }
    }(ry);
    /*

    Math.uuid.js (v1.4)
    http://www.broofa.com
    mailto:robert@broofa.com
    Copyright (c) 2010 Robert Kieffer
    Dual licensed under the MIT and GPL licenses.
    */
    var ty = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
        uy = function() {
            for (var a = Array(36), b = 0, c, d = 0; 36 > d; d++) 8 == d || 13 == d || 18 == d || 23 == d ? a[d] = "-" : 14 == d ? a[d] = "4" : (2 >= b && (b = 33554432 + 16777216 * Math.random() | 0), c = b & 15, b >>= 4, a[d] = ty[19 == d ? c & 3 | 8 : c]);
            return a.join("")
        };
    var wy = function(a) {
        R.call(this, a);
        this.D = new Map;
        a = this.j;
        var b = a.indexOf(";"),
            c = null;
        0 <= b ? (this.j = a.substring(0, b), c = a.substring(b + 1)) : this.j = a;
        vy(this, c)
    };
    t(wy, R);
    wy.prototype.toString = function() {
        return yy(this, R.prototype.toString.call(this))
    };
    wy.prototype.F = function() {
        return ""
    };
    var vy = function(a, b) {
            fb(Uf(b)) || b.split(";").forEach(function(c) {
                var d = c.indexOf("=");
                if (!(0 >= d)) {
                    var e = Rf(c.substring(0, d));
                    c = Rf(c.substring(d + 1));
                    d = a.D.get(e);
                    null != d ? d.includes(c) || d.push(c) : d = [Uf(c)];
                    a.D.set(e, d)
                }
            }, a)
        },
        zy = function(a) {
            if (fb(Uf("ord"))) return null;
            a = a.D.get("ord");
            return null != a ? a : null
        },
        Ay = function(a, b) {
            fb(Uf("ord")) || (b = b.map(Uf), a.D.set("ord", b))
        },
        yy = function(a, b) {
            b = [Uf(b)];
            b.push.apply(b, ha(By(a)));
            return b.join(";")
        },
        By = function(a) {
            var b = zy(a);
            null == b ? b = [Uf(Date.now())] : fb(Uf("ord")) ||
                a.D.delete("ord");
            var c = [];
            a.D.forEach(function(d, e) {
                d.forEach(function(f) {
                    c.push(e + "=" + f)
                })
            });
            c.push("ord=" + b[0]);
            Ay(a, b);
            return c
        };
    wy.prototype.G = function() {
        return new wy(this.toString())
    };
    var Cy = function(a, b, c) {
        var d = Error.call(this);
        this.message = d.message;
        "stack" in d && (this.stack = d.stack);
        this.o = b;
        this.j = c;
        this.B = a
    };
    t(Cy, Error);
    l = Cy.prototype;
    l.getAd = function() {
        return null
    };
    l.getInnerError = function() {
        return this.l
    };
    l.getMessage = function() {
        return this.o
    };
    l.getErrorCode = function() {
        return this.j
    };
    l.getVastErrorCode = function() {
        return 1E3 > this.j ? this.j : 900
    };
    l.getType = function() {
        return this.B
    };
    l.toString = function() {
        return "AdError " + this.getErrorCode() + ": " + this.getMessage() + (null != this.getInnerError() ? " Caused by: " + this.getInnerError() : "")
    };
    var Dy = function(a) {
        O.call(this);
        this.o = [];
        this.l = !1;
        this.sessionId = a || "goog_" + Vf++
    };
    t(Dy, O);
    Dy.prototype.connect = function() {
        for (this.l = !0; 0 !== this.o.length;) {
            var a = this.o.shift();
            a && this.sendMessage(a.name, a.type, a.data)
        }
    };
    var Ey = function(a, b, c, d) {
        a.l ? a.sendMessage(b, c, d) : a.o.push({
            name: b,
            type: c,
            data: d
        })
    };
    Dy.prototype.sendMessage = function() {};
    var Fy = function(a, b, c, d, e) {
        e = void 0 === e ? "" : e;
        wj.call(this, a);
        this.messageType = b;
        this.oa = c;
        this.sessionId = d;
        this.origin = e
    };
    t(Fy, wj);
    Fy.prototype.toString = function() {
        return ""
    };
    var Gy = function() {
            this.allowCustom = !0;
            this.creativeType = this.resourceType = "All";
            this.sizeCriteria = "SelectExactMatch";
            this.nearMatchPercent = 90;
            this.adSlotIds = []
        },
        Hy = {
            IMAGE: "Image",
            FLASH: "Flash",
            ALL: "All"
        };
    w("module$contents$ima$CompanionAdSelectionSettings_CompanionAdSelectionSettings.CreativeType", Hy);
    var Iy = {
        HTML: "Html",
        IFRAME: "IFrame",
        STATIC: "Static",
        ALL: "All"
    };
    w("module$contents$ima$CompanionAdSelectionSettings_CompanionAdSelectionSettings.ResourceType", Iy);
    var Jy = {
        IGNORE: "IgnoreSize",
        SELECT_EXACT_MATCH: "SelectExactMatch",
        SELECT_NEAR_MATCH: "SelectNearMatch",
        SELECT_FLUID: "SelectFluid"
    };
    w("module$contents$ima$CompanionAdSelectionSettings_CompanionAdSelectionSettings.SizeCriteria", Jy);
    var Ly = function(a, b) {
            b = void 0 === b ? new Gy : b;
            this.l = a;
            this.j = b ? b : new Gy;
            this.C = Ky(Iy, this.j.resourceType) ? this.j.resourceType : "All";
            this.B = Ky(Hy, this.j.creativeType) ? this.j.creativeType : "All";
            this.D = Ky(Jy, this.j.sizeCriteria) ? this.j.sizeCriteria : "SelectExactMatch";
            this.o = null != this.j.adSlotIds ? this.j.adSlotIds : [];
            this.A = "number" === typeof this.j.nearMatchPercent && 0 < this.j.nearMatchPercent && 100 >= this.j.nearMatchPercent ? this.j.nearMatchPercent : 90
        },
        Oy = function(a, b) {
            var c = [];
            b.forEach(function(d) {
                a.j.allowCustom &&
                    (!fb(d.getContent()) && (isNaN(d.j.sequenceNumber) || isNaN(d.j.mainAdSequenceNumber) || d.j.mainAdSequenceNumber == d.j.sequenceNumber) && My(a, d) ? c.push(d) : (d = Ny(a, d), null != d && !fb(d.getContent()) && c.push(d)))
            });
            return c
        },
        My = function(a, b) {
            var c;
            if (c = "Flash" != b.getContentType()) {
                if (c = "All" == a.C || a.C == b.j.resourceType) c = b.getContentType(), c = null == c ? !0 : "All" == a.B || a.B == c;
                c && (c = b.getAdSlotId(), c = 0 == a.o.length ? !0 : null != c ? a.o.includes(c) : !1)
            }
            if (c)
                if (c = b.j.size, (b = !!b.j.fluidSize) || a.l.Jd) a = b && a.l.Jd;
                else if ((b =
                    "IgnoreSize" == a.D) || (b = a.l.size, b = b == c ? !0 : b && c ? b.width == c.width && b.height == c.height : !1), b) a = !0;
            else {
                if (b = "SelectNearMatch" == a.D) b = c.width, c = c.height, b = b > a.l.size.width || c > a.l.size.height || b < a.A / 100 * a.l.size.width || c < a.A / 100 * a.l.size.height ? !1 : !0;
                a = b
            } else a = !1;
            return a
        },
        Ny = function(a, b) {
            b = Py(b);
            return null == b ? null : b.find(function(c) {
                return My(a, c)
            }) || null
        },
        Ky = function(a, b) {
            return null != b && mf(a, b)
        };
    var Qy = function(a) {
            this.j = a
        },
        Ry = function(a, b) {
            return lf(a.j, b) && (a = a.j[b], "boolean" === typeof a) ? a : !1
        },
        Sy = function(a) {
            if (lf(a.j, "forceExperimentIds")) {
                a = a.j.forceExperimentIds;
                var b = [],
                    c = 0;
                Array.isArray(a) && a.forEach(function(d) {
                    "number" === typeof d && (b[c++] = d)
                });
                return b
            }
            return null
        };
    var T = function() {
            this.J = "always";
            this.N = 4;
            this.o = 1;
            this.j = 0;
            this.l = !0;
            this.L = "en";
            this.K = !1;
            this.X = this.U = "";
            this.A = null;
            this.Z = this.P = -1;
            this.Y = this.I = this.D = "";
            this.F = !1;
            this.M = !0;
            this.C = uy();
            this.G = {};
            try {
                this.ca = xm()[0]
            } catch (a) {}
        },
        Ty = function(a) {
            a = Uf(a);
            fb(a) || (a = a.substring(0, 20));
            return a
        };
    l = T.prototype;
    l.setCompanionBackfill = function(a) {
        this.J = a
    };
    l.getCompanionBackfill = function() {
        return this.J
    };
    l.setNumRedirects = function(a) {
        this.N = a
    };
    l.getNumRedirects = function() {
        return this.N
    };
    l.setPpid = function(a) {
        this.ba = a
    };
    l.getPpid = function() {
        return this.ba
    };
    l.setVpaidAllowed = function(a) {
        "boolean" === typeof a && (this.o = a ? 1 : 0)
    };
    l.setVpaidMode = function(a) {
        this.o = a
    };
    l.Ve = function() {
        return this.o
    };
    l.setAutoPlayAdBreaks = function(a) {
        this.l = a
    };
    l.hf = function() {
        return this.l
    };
    l.Df = function(a) {
        this.K = a
    };
    l.Lb = function() {
        return this.K
    };
    l.setLocale = function(a) {
        if (a = Nu(a)) this.L = a
    };
    l.getLocale = function() {
        return this.L
    };
    l.setPlayerType = function(a) {
        this.U = Ty(a)
    };
    l.getPlayerType = function() {
        return this.U
    };
    l.setPlayerVersion = function(a) {
        this.X = Ty(a)
    };
    l.getPlayerVersion = function() {
        return this.X
    };
    var Uy = function(a) {
        if (null == a.A) {
            var b = {},
                c = (new R(G().location.href)).l;
            if (Rt(c, "tcnfp")) try {
                b = JSON.parse(c.get("tcnfp"))
            } catch (d) {}
            a.A = new Qy(b)
        }
        return a.A
    };
    l = T.prototype;
    l.Ef = function(a) {
        this.P = a
    };
    l.Ff = function(a) {
        this.Z = a
    };
    l.setDisableCustomPlaybackForIOS10Plus = function(a) {
        this.F = a
    };
    l.getDisableCustomPlaybackForIOS10Plus = function() {
        return this.F
    };
    l.isCookiesEnabled = function() {
        return this.M
    };
    l.setCookiesEnabled = function(a) {
        null != a && (this.M = a)
    };
    l.setSessionId = function(a) {
        this.C = a
    };
    l.Cf = function() {};
    l.Ue = function() {
        return !0
    };
    l.setFeatureFlags = function(a) {
        this.G = a
    };
    l.getFeatureFlags = function() {
        return this.G
    };
    T.prototype.getFeatureFlags = T.prototype.getFeatureFlags;
    T.prototype.setFeatureFlags = T.prototype.setFeatureFlags;
    T.prototype.getDisableFlashAds = T.prototype.Ue;
    T.prototype.setDisableFlashAds = T.prototype.Cf;
    T.prototype.setSessionId = T.prototype.setSessionId;
    T.prototype.setCookiesEnabled = T.prototype.setCookiesEnabled;
    T.prototype.isCookiesEnabled = T.prototype.isCookiesEnabled;
    T.prototype.getDisableCustomPlaybackForIOS10Plus = T.prototype.getDisableCustomPlaybackForIOS10Plus;
    T.prototype.setDisableCustomPlaybackForIOS10Plus = T.prototype.setDisableCustomPlaybackForIOS10Plus;
    T.prototype.setStreamCorrelator = T.prototype.Ff;
    T.prototype.setPageCorrelator = T.prototype.Ef;
    T.prototype.getPlayerVersion = T.prototype.getPlayerVersion;
    T.prototype.setPlayerVersion = T.prototype.setPlayerVersion;
    T.prototype.getPlayerType = T.prototype.getPlayerType;
    T.prototype.setPlayerType = T.prototype.setPlayerType;
    T.prototype.getLocale = T.prototype.getLocale;
    T.prototype.setLocale = T.prototype.setLocale;
    T.prototype.isVpaidAdapter = T.prototype.Lb;
    T.prototype.setIsVpaidAdapter = T.prototype.Df;
    T.prototype.isAutoPlayAdBreaks = T.prototype.hf;
    T.prototype.setAutoPlayAdBreaks = T.prototype.setAutoPlayAdBreaks;
    T.prototype.getVpaidMode = T.prototype.Ve;
    T.prototype.setVpaidMode = T.prototype.setVpaidMode;
    T.prototype.setVpaidAllowed = T.prototype.setVpaidAllowed;
    T.prototype.getPpid = T.prototype.getPpid;
    T.prototype.setPpid = T.prototype.setPpid;
    T.prototype.getNumRedirects = T.prototype.getNumRedirects;
    T.prototype.setNumRedirects = T.prototype.setNumRedirects;
    T.prototype.getCompanionBackfill = T.prototype.getCompanionBackfill;
    T.prototype.setCompanionBackfill = T.prototype.setCompanionBackfill;
    var Vy = new T;
    var Wy = function(a) {
        D.call(this, a)
    };
    t(Wy, D);
    var Xy = function(a) {
            void 0 !== a.addtlConsent && "string" !== typeof a.addtlConsent && (a.addtlConsent = void 0);
            void 0 !== a.gdprApplies && "boolean" !== typeof a.gdprApplies && (a.gdprApplies = void 0);
            return void 0 !== a.tcString && "string" !== typeof a.tcString || void 0 !== a.listenerId && "number" !== typeof a.listenerId ? 2 : a.cmpStatus && "error" !== a.cmpStatus ? 0 : 3
        },
        Yy = function(a, b, c) {
            b = void 0 === b ? 500 : b;
            c = void 0 === c ? !1 : c;
            E.call(this);
            this.l = a;
            this.j = null;
            this.C = {};
            this.D = 0;
            this.B = b;
            this.A = c;
            this.o = null
        };
    t(Yy, E);
    Yy.prototype.O = function() {
        this.C = {};
        this.o && (Ve(this.l, "message", this.o), delete this.o);
        delete this.C;
        delete this.l;
        delete this.j;
        E.prototype.O.call(this)
    };
    var $y = function(a) {
            return "function" === typeof a.l.__tcfapi || null != Zy(a)
        },
        cz = function(a, b) {
            var c = {
                    internalErrorState: 0,
                    internalBlockOnErrors: a.A
                },
                d = Qe(function() {
                    return b(c)
                }),
                e = 0; - 1 !== a.B && (e = setTimeout(function() {
                e = 0;
                c.tcString = "tcunavailable";
                c.internalErrorState = 1;
                d()
            }, a.B));
            az(a, "addEventListener", function(f) {
                f && (c = f, c.internalErrorState = Xy(c), c.internalBlockOnErrors = a.A, bz(c) ? (0 != c.internalErrorState && (c.tcString = "tcunavailable"), az(a, "removeEventListener", null, c.listenerId), (f = e) && clearTimeout(f),
                    d()) : ("error" === c.cmpStatus || 0 !== c.internalErrorState) && (f = e) && clearTimeout(f))
            })
        };
    Yy.prototype.addEventListener = function(a) {
        var b = this,
            c = {
                internalBlockOnErrors: this.A
            },
            d = Qe(function() {
                return a(c)
            }),
            e = 0; - 1 !== this.B && (e = setTimeout(function() {
            c.tcString = "tcunavailable";
            c.internalErrorState = 1;
            d()
        }, this.B));
        var f = function(g, h) {
            clearTimeout(e);
            g ? (c = g, c.internalErrorState = Xy(c), c.internalBlockOnErrors = b.A, h && 0 === c.internalErrorState || (c.tcString = "tcunavailable", h || (c.internalErrorState = 3))) : (c.tcString = "tcunavailable", c.internalErrorState = 3);
            a(c)
        };
        try {
            az(this, "addEventListener", f)
        } catch (g) {
            c.tcString =
                "tcunavailable", c.internalErrorState = 3, e && (clearTimeout(e), e = 0), d()
        }
    };
    Yy.prototype.removeEventListener = function(a) {
        a && a.listenerId && az(this, "removeEventListener", null, a.listenerId)
    };
    var az = function(a, b, c, d) {
            c || (c = function() {});
            if ("function" === typeof a.l.__tcfapi) a = a.l.__tcfapi, a(b, 2, c, d);
            else if (Zy(a)) {
                dz(a);
                var e = ++a.D;
                a.C[e] = c;
                a.j && (c = {}, a.j.postMessage((c.__tcfapiCall = {
                    command: b,
                    version: 2,
                    callId: e,
                    parameter: d
                }, c), "*"))
            } else c({}, !1)
        },
        Zy = function(a) {
            if (a.j) return a.j;
            a.j = Pg(a.l, "__tcfapiLocator");
            return a.j
        },
        dz = function(a) {
            a.o || (a.o = function(b) {
                try {
                    var c = ("string" === typeof b.data ? JSON.parse(b.data) : b.data).__tcfapiReturn;
                    a.C[c.callId](c.returnValue, c.success)
                } catch (d) {}
            }, Ue(a.l,
                "message", a.o))
        },
        bz = function(a) {
            if (!1 === a.gdprApplies) return !0;
            void 0 === a.internalErrorState && (a.internalErrorState = Xy(a));
            return "error" === a.cmpStatus || 0 !== a.internalErrorState ? a.internalBlockOnErrors ? (jh({
                e: String(a.internalErrorState)
            }, "tcfe"), !1) : !0 : "loaded" !== a.cmpStatus || "tcloaded" !== a.eventStatus && "useractioncomplete" !== a.eventStatus ? !1 : !0
        };

    function ez(a) {
        var b = {};
        (new R(a)).l.forEach(function(c, d) {
            b[d] = c
        });
        return b
    }
    var fz = function(a) {
            this.Od = a.isGdprLoader || !1;
            this.uspString = a.uspString || "";
            var b = a.gdprApplies;
            this.l = "boolean" == typeof b ? b ? "1" : "0" : "number" != typeof b || 1 !== b && 0 !== b ? "string" != typeof b || "1" !== b && "0" !== b ? "" : "1" == b ? "1" : "0" : 1 == b ? "1" : "0";
            this.j = a.tcString || "";
            /^[\.\w_-]*$/.test(this.j) || (this.j = encodeURIComponent(this.j))
        },
        gz = function(a, b) {
            a = void 0 === a ? {} : a;
            b = void 0 === b ? {} : b;
            this.j = a;
            this.l = new fz(b)
        },
        hz = function(a, b) {
            var c = new R(a);
            var d = c.j;
            (c = eb(c.o, "googleads.g.doubleclick.net") && Lu("/pagead/(live/)?ads",
                d)) || (d = new wy(a), c = d.o, d = yy(d, d.j), c = !eb(c, ".g.doubleclick.net") && eb(c, "doubleclick.net") && Lu("/(ad|pfad)[x|i|j]?/", d));
            c || (c = new R(a), d = c.j, c = eb(c.o, "doubleclick.net") && Lu("/gampad/(live/)?ads", d));
            (c = c || "bid.g.doubleclick.net" == (new R(a)).o) || (c = new R(a), d = c.j, c = "ad.doubleclick.net" === c.o && Lu("/dv3/adv", d));
            c || (c = new R(a), d = c.j, "pubads.g.doubleclick.net" === c.o && (Lu("/ssai/", d) || Lu("/ondemand/", d)));
            return new gz(ez(a), b)
        },
        iz = function(a, b) {
            if (a.j.hasOwnProperty(b)) return a.j[b]
        },
        jz = function(a) {
            var b,
                c;
            if (!(b = "1" == (null == (c = iz(a, "ltd")) ? void 0 : c.toString()))) {
                var d;
                b = null == (d = iz(a, "gdpr")) ? void 0 : d.toString();
                d = a.l.l;
                d = ("1" == d || "0" == d ? d : void 0 != b ? b : "").toLowerCase();
                if ("true" === d || "1" === d)
                    if (d = a.l.j, a = iz(a, "gdpr_consent"), a = d && "tcunavailable" != d ? d : "tcunavailable" == d ? a || d : a || "", "tcunavailable" === a) var e = !1;
                    else {
                        if ((d = et(a)) && a) {
                            var f = td(d, ws, 1);
                            d = td(d, os, 2) || new os;
                            b = Ad(B(f, 9), 0);
                            c = Ad(B(f, 4), 0);
                            var g = Ad(B(f, 5), 0),
                                h = Ad(nd(f, 10), !1),
                                k = Ad(nd(f, 11), !1),
                                n = Bd(f, 16),
                                m = Ad(nd(f, 15), !1),
                                x = {
                                    consents: ft(ld(f,
                                        13), Ss),
                                    legitimateInterests: ft(ld(f, 14), Ss)
                                },
                                u = {
                                    consents: ft(ld(f, 17)),
                                    legitimateInterests: ft(ld(f, 18))
                                },
                                y = ft(ld(f, 12), Ts),
                                A = vd(f, ms, 19);
                            f = {};
                            A = r(A);
                            for (var N = A.next(); !N.done; N = A.next()) {
                                N = N.value;
                                var X = od(N, 1);
                                f[X] = f[X] || {};
                                for (var da = r(ld(N, 3)), xa = da.next(); !xa.done; xa = da.next()) f[X][xa.value] = od(N, 2)
                            }
                            a = {
                                tcString: a,
                                tcfPolicyVersion: b,
                                gdprApplies: !0,
                                cmpId: c,
                                cmpVersion: g,
                                isServiceSpecific: h,
                                useNonStandardStacks: k,
                                publisherCC: n,
                                purposeOneTreatment: m,
                                purpose: x,
                                vendor: u,
                                specialFeatureOptins: y,
                                publisher: {
                                    restrictions: f,
                                    consents: ft(ld(d, 1), Ss),
                                    legitimateInterests: ft(ld(d, 2), Ss),
                                    customPurposes: {
                                        consents: ft(ld(d, 3)),
                                        legitimateInterests: ft(ld(d, 4))
                                    }
                                }
                            }
                        } else a = null;
                        if (a) {
                            var sa = void 0 === sa ? !1 : sa;
                            if (bz(a))
                                if (!1 === a.gdprApplies || "tcunavailable" === a.tcString || void 0 === a.gdprApplies && !sa || "string" !== typeof a.tcString || !a.tcString.length) e = !0;
                                else {
                                    e = void 0 === e ? "755" : e;
                                    c: {
                                        if (a.publisher && a.publisher.restrictions && (sa = a.publisher.restrictions["1"], void 0 !== sa)) {
                                            sa = sa[void 0 === e ? "755" : e];
                                            break c
                                        }
                                        sa = void 0
                                    }
                                    0 === sa ? e = !1 : a.purpose &&
                                        a.vendor ? (sa = a.vendor.consents, (e = !(!sa || !sa[void 0 === e ? "755" : e])) && a.purposeOneTreatment && "CH" === a.publisherCC ? e = !0 : e && (e = a.purpose.consents, e = !(!e || !e["1"]))) : e = !0
                                }
                            else e = !1
                        } else e = !1
                    }
                else e = !0;
                b = !e
            }
            return b
        },
        kz = function(a) {
            var b = new Wy;
            a = !jz(a);
            C(b, 5, a);
            return b
        };
    var lz = function(a, b) {
        this.message = a;
        this.errorCode = b
    };
    lz.prototype.getErrorCode = function() {
        return this.errorCode
    };
    lz.prototype.getMessage = function() {
        return this.message
    };
    var mz = new lz("Failed to initialize ad playback element before starting ad playback.", 400),
        nz = new lz("The provided {0} information: {1} is invalid.", 1101);

    function oz(a, b) {
        var c = void 0 === b ? null : b;
        var d = Ga.apply(2, arguments);
        if (!(c instanceof Cy)) {
            var e = a.getErrorCode(),
                f = a.getMessage();
            if (0 < d.length)
                for (var g = 0; g < d.length; g++) f = f.replace(new RegExp("\\{" + g + "\\}", "ig"), d[g]);
            d = new Cy("adPlayError", f, e);
            d.l = c;
            c = d
        }
        return c
    };
    var pz = function() {
            var a = {};
            this.l = function(b, c) {
                return null != a[b] ? a[b] : c
            };
            this.o = function(b, c) {
                return null != a[b] ? a[b] : c
            };
            this.j = function(b, c) {
                return null != a[b] ? a[b] : c
            }
        },
        qz = function(a) {
            return J(pz).l(a.flag, a.defaultValue)
        },
        rz = function(a) {
            return J(pz).o(a.flag, a.defaultValue)
        };
    var sz = function() {};
    sz.j = function() {
        throw Error("Must be overridden");
    };
    var tz = function() {
        this.j = 0
    };
    t(tz, sz);
    tz.gb = void 0;
    tz.j = function() {
        return tz.gb ? tz.gb : tz.gb = new tz
    };

    function V(a, b, c, d) {
        c = void 0 === c ? null : c;
        d = void 0 === d ? {} : d;
        var e = tz.j();
        0 === e.j && (e.j = Math.random() < rz(qt) ? 2 : 1);
        2 === e.j && (e = {}, jh(Object.assign({}, (e.c = String(a), e.pc = String(Sg()), e.em = c, e.lid = b, e.eids = J(js).j().join(), e), d), "esp"))
    };
    var uz = function() {
            this.cache = {}
        },
        yz = function() {
            vz || (wz = rz(nt), xz = rz(mt), vz = new uz);
            return vz
        },
        zz = function(a) {
            var b = B(a, 3);
            if (!b) return 3;
            if (void 0 === B(a, 2)) return 4;
            a = Date.now();
            return a > b + 36E5 * xz ? 2 : a > b + 36E5 * wz ? 1 : 0
        };
    uz.prototype.get = function(a, b) {
        if (this.cache[a]) return {
            wb: this.cache[a],
            success: !0
        };
        var c = "";
        try {
            c = b.getItem("_GESPSK-" + a)
        } catch (g) {
            var d;
            V(6, a, null == (d = g) ? void 0 : d.message);
            return {
                wb: null,
                success: !1
            }
        }
        if (!c) return {
            wb: null,
            success: !0
        };
        try {
            var e = Kd(tl, c);
            this.cache[a] = e;
            return {
                wb: e,
                success: !0
            }
        } catch (g) {
            var f;
            V(5, a, null == (f = g) ? void 0 : f.message);
            return {
                wb: null,
                success: !1
            }
        }
    };
    uz.prototype.set = function(a, b) {
        var c = B(a, 1),
            d = "_GESPSK-" + c;
        C(a, 3, Date.now());
        try {
            b.setItem(d, Jd(a))
        } catch (f) {
            var e;
            V(7, c, null == (e = f) ? void 0 : e.message);
            return !1
        }
        this.cache[c] = a;
        return !0
    };
    uz.prototype.remove = function(a, b) {
        a = B(a, 1);
        try {
            b.removeItem("_GESPSK-" + a), delete this.cache[a]
        } catch (d) {
            var c;
            V(8, a, null == (c = d) ? void 0 : c.message)
        }
    };
    var vz = null,
        wz = 24,
        xz = 72;

    function Az(a, b, c, d) {
        V(18, a);
        try {
            var e = wh();
            rz(lt) && (C(b, 8, Number((md(b, 8) - 1).toFixed(3))), C(b, 7, Math.round(e / 1E3 / 60)));
            return c().then(function(f) {
                V(29, a, null, {
                    delta: String(wh() - e)
                });
                if (null == f) return V(41, a), Bz(b, 111, d), b;
                null != f && ("string" !== typeof f ? V(21, a) : f.length || V(20, a));
                f = C(b, 2, f);
                C(f, 10, void 0, !1);
                yz().set(b, d) && V(27, a);
                return b
            }).catch(function(f) {
                Bz(b, 106, d);
                V(28, a, Cz(f));
                return b
            })
        } catch (f) {
            return Bz(b, 107, d), V(1, a, Cz(f)), Promise.resolve(b)
        }
    }

    function Bz(a, b, c) {
        var d;
        wl(a, xl(null != (d = a.getError()) ? d : new vl, b));
        yz().set(a, c)
    }
    var Cz = function(a) {
        return "string" === typeof a ? a : a instanceof Error ? a.message : null
    };

    function Dz() {
        var a = window;
        var b = void 0 === b ? function() {} : b;
        return new Promise(function(c) {
            var d = function() {
                c(b());
                Ve(a, "load", d)
            };
            Ue(a, "load", d)
        })
    };

    function Ez(a) {
        var b = void 0 === b ? null : b;
        var c = void 0 === c ? null : c;
        var d = void 0 === d ? [] : d;
        var e = rz(pt),
            f = new pl,
            g = Fz(c, b),
            h = g.map(function(k) {
                return vd(k, ll, 2)
            }).flatMap(function(k) {
                return k
            }).map(function(k) {
                return Bd(k, 1)
            });
        Gz(f, a, b, e, h);
        Hz(f, g, c, b, e);
        qz(tt) && Hz(f, d, c, b, e);
        return vd(f, tl, 2).length ? zc(ue(f, zl), 3) : null
    }

    function Hz(a, b, c, d, e) {
        if (d && c && "function" === typeof c.getUserIdsAsEidBySource) {
            b = r(b);
            for (var f = b.next(); !f.done; f = b.next())
                if (f = f.value, String(Bd(f, 1)) === d) {
                    f = r(vd(f, ll, 2));
                    for (var g = f.next(); !g.done; g = f.next())
                        if (g = Bd(g.value, 1), !Iz(a, g)) {
                            var h = null;
                            try {
                                var k = void 0,
                                    n = void 0,
                                    m = void 0;
                                h = null == (k = c.getUserIdsAsEidBySource(g)) ? void 0 : null == (n = k.uids) ? void 0 : null == (m = n[0]) ? void 0 : m.id
                            } catch (x) {
                                k = void 0, V(45, g, null == (k = x) ? void 0 : k.message)
                            }
                            h && (h.length > e ? (k = {}, V(12, g, null, (k.sl = String(h.length), k.fp =
                                "1", k))) : (k = ul(g), h = C(k, 2, h), h = C(h, 11, !0), zd(a, 2, tl, h), h = {}, V(19, g, null, (h.fp = "1", h))))
                        }
                }
        }
    }

    function Gz(a, b, c, d, e) {
        if (b) {
            var f = rz(ot),
                g = [],
                h = RegExp("^_GESPSK-(.+)$");
            try {
                for (var k = 0; k < b.length; k++) {
                    var n = (h.exec(b.key(k)) || [])[1];
                    n && g.push(n)
                }
            } catch (x) {}
            g = r(g);
            for (h = g.next(); !h.done; h = g.next())
                if (h = h.value, !e.includes(h) && (k = yz().get(h, b).wb))
                    if (n = zz(k), 2 !== n && 3 !== n) {
                        var m = !1;
                        if (c && (n = /^(\d+)$/.exec(h)) && !(m = c.split(",").includes(n[1]))) continue;
                        C(k, 9, m);
                        n = B(k, 2);
                        m = m ? f : d;
                        0 <= m && n && n.length > m && (m = {}, V(12, h, null, (m.sl = String(n.length), m)), Bz(k, 108, b), C(k, 2, void 0, !1));
                        zd(a, 2, tl, k);
                        V(19, h)
                    }
        }
    }

    function Fz(a, b) {
        if (!b || "function" !== typeof(null == a ? void 0 : a.getUserIdsAsEidBySource)) return [];
        a = [];
        for (var c = r(J(pz).j(rt.flag, rt.defaultValue)), d = c.next(); !d.done; d = c.next()) {
            d = d.value;
            var e = null;
            try {
                e = Kd(nl, d)
            } catch (f) {
                d = void 0;
                V(44, "UNKNOWN_ID", null == (d = f) ? void 0 : d.message);
                continue
            }
            Bd(e, 1) === b && a.push(e)
        }
        return a
    }

    function Iz(a, b) {
        return vd(a, tl, 2).some(function(c) {
            return B(c, 1) === b && null != B(c, 2)
        })
    };
    var Jz = function(a) {
        E.call(this);
        this.o = a;
        this.j = [];
        this.dependencies = [];
        this.l = []
    };
    t(Jz, E);
    var Kz = function(a, b) {
        a.dependencies.push({
            Tb: !1,
            dependency: b
        });
        qz(jt) && (a = a.o, qz(jt) && b.j.push(a))
    };
    Jz.prototype.O = function() {
        this.j.length = 0;
        this.l.length = 0;
        this.dependencies.length = 0;
        E.prototype.O.call(this)
    };
    var Lz = function() {
        var a = this;
        this.promise = new Promise(function(b, c) {
            a.resolve = b;
            a.reject = c
        })
    };
    var Mz = function(a) {
        a = Error.call(this, a);
        this.message = a.message;
        "stack" in a && (this.stack = a.stack);
        Object.setPrototypeOf(this, Mz.prototype);
        this.name = "InputError"
    };
    t(Mz, Error);
    var Nz = function() {
            var a = this;
            this.D = this.o = null;
            this.A = -1;
            this.B = new Lz;
            this.l = !1;
            this.B.promise.then(function() {
                -1 !== a.A && (a.D = wh() - a.A)
            }, function() {})
        },
        Oz = function() {
            Nz.apply(this, arguments);
            this.j = []
        };
    t(Oz, Nz);
    var Qz = function(a, b) {
            a.l || (a.l = !0, a.o = b, a.B.resolve(b), qz(jt) && Pz(a))
        },
        Pz = function(a) {
            for (var b = r(a.j), c = b.next(); !c.done; c = b.next()) c = c.value, c(a.o);
            a.j = []
        };
    ea.Object.defineProperties(Oz.prototype, {
        promise: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.B.promise
            }
        },
        resolved: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.l
            }
        },
        error: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.C
            }
        }
    });
    var Rz = function() {
        Oz.apply(this, arguments)
    };
    t(Rz, Oz);
    var Sz = function(a, b) {
            Qz(a, b)
        },
        Tz = function(a, b) {
            b.then(function(c) {
                Qz(a, c)
            })
        },
        Uz = function(a) {
            Nz.call(this);
            this.j = a
        };
    t(Uz, Nz);
    Uz.prototype.resolved = function() {
        return this.j.l
    };
    ea.Object.defineProperties(Uz.prototype, {
        error: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.j.C
            }
        }
    });
    var Vz = function(a) {
        Uz.call(this, a);
        this.j = a
    };
    t(Vz, Uz);
    ea.Object.defineProperties(Vz.prototype, {
        value: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.j.o
            }
        }
    });
    var Wz = function() {
        Uz.apply(this, arguments)
    };
    t(Wz, Uz);
    ea.Object.defineProperties(Wz.prototype, {
        value: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.j.o
            }
        }
    });

    function Xz(a, b) {
        var c, d, e;
        return Fa(function(f) {
            if (1 == f.j) return c = 0 < b ? a.filter(function(g) {
                return !g.Tb
            }) : a, wa(f, Promise.all(c.map(function(g) {
                return g.dependency.promise
            })), 2);
            if (3 != f.j) {
                if (a.length === c.length) return f.return(0);
                d = a.filter(function(g) {
                    return g.Tb
                });
                e = wh();
                return wa(f, Promise.race([Promise.all(d.map(function(g) {
                    return g.dependency.promise
                })), new Promise(function(g) {
                    return void setTimeout(g, b)
                })]), 3)
            }
            return f.return(wh() - e)
        })
    }
    var Zz = function(a, b) {
        b = void 0 === b ? 0 : b;
        E.call(this);
        var c = this;
        this.id = a;
        this.timeoutMs = b;
        this.F = this.D = this.C = this.started = !1;
        this.K = -1;
        this.l = new Jz(function() {
            Yz(c)
        });
        Ye(this, this.l)
    };
    t(Zz, E);
    Zz.prototype.start = function() {
        var a = this,
            b, c, d, e, f;
        return Fa(function(g) {
            switch (g.j) {
                case 1:
                    if (a.started) return g.return();
                    a.started = !0;
                    g.l = 2;
                    b = a;
                    return wa(g, Xz(a.l.dependencies, a.timeoutMs), 4);
                case 4:
                    b.K = g.A;
                    if (a.xa()) {
                        g.j = 5;
                        break
                    }
                    for (var h = 0, k = r(a.l.l), n = k.next(); !n.done; n = k.next()) {
                        if (null === n.value.j.o) throw Error("missing input: " + a.id + "/" + h);
                        ++h
                    }
                    c = r(a.l.j);
                    for (d = c.next(); !d.done; d = c.next()) e = d.value, e.A = wh();
                    return wa(g, a.j(), 5);
                case 5:
                    g.j = 0;
                    g.l = 0;
                    break;
                case 2:
                    f = ya(g);
                    if (a.xa()) return g.return();
                    !(f instanceof Mz) && f instanceof Error && (a.B(a.id, f), a.l.j.length && $z(a, new Mz(f.message)));
                    g.j = 0
            }
        })
    };
    var Yz = function(a) {
            if (!a.started && a.C) try {
                var b = a.l.dependencies,
                    c = 0 < a.timeoutMs ? b.filter(function(g) {
                        return !g.Tb
                    }) : b,
                    d = b.filter(function(g) {
                        return g.Tb
                    }),
                    e, f = null == (e = b.find(function(g) {
                        return void 0 !== g.dependency.error
                    })) ? void 0 : e.dependency.error;
                if (f) throw a.started = !0, f;
                if (!c.some(function(g) {
                        return !g.dependency.resolved
                    })) {
                    if (d.length && (a.D || (a.D = !0, setTimeout(function() {
                            a.F = !0;
                            Yz(a)
                        }, a.timeoutMs)), d.some(function(g) {
                            return !g.dependency.resolved
                        }) && !a.F)) return;
                    a.started = !0;
                    a.j()
                }
            } catch (g) {
                !(a.xa() ||
                    g instanceof Mz) && g instanceof Error && (a.B(a.id, g), a.l.j.length && $z(a, new Mz(g.message)))
            }
        },
        aA = function(a) {
            var b = new Rz;
            a.l.j.push(b);
            return b
        },
        bA = function(a, b) {
            Kz(a.l, b);
            b = new Wz(b);
            a.l.l.push(b);
            return b
        },
        cA = function(a, b) {
            Kz(a.l, b);
            return new Vz(b)
        },
        $z = function(a, b) {
            a = r(a.l.j);
            for (var c = a.next(); !c.done; c = a.next())
                if (c = c.value, !c.resolved) {
                    var d = b;
                    c.l = !0;
                    c.C = d;
                    c.B.reject(d);
                    qz(jt) && Pz(c)
                }
        };
    var dA = function(a, b) {
        Zz.call(this, a);
        this.id = a;
        this.B = b
    };
    t(dA, Zz);
    var eA = function(a, b, c) {
        dA.call(this, 1041, c);
        this.storage = b;
        this.o = bA(this, a)
    };
    t(eA, dA);
    eA.prototype.j = function() {
        var a = this.o.value;
        yz().set(a, this.storage) && null != B(a, 2) && V(27, B(a, 1))
    };
    var fA = function(a, b) {
        dA.call(this, 1048, b);
        this.o = aA(this);
        this.A = aA(this);
        this.G = bA(this, a)
    };
    t(fA, dA);
    fA.prototype.j = function() {
        var a = this.G.value,
            b = function(c) {
                var d = {};
                V(c, B(a, 1), null, (d.tic = String(Math.round((Date.now() - B(a, 3)) / 6E4)), d))
            };
        switch (zz(a)) {
            case 0:
                b(24);
                break;
            case 1:
                b(25);
                Qz(this.A, a);
                break;
            case 2:
                b(26);
                Qz(this.o, a);
                break;
            case 3:
                V(9, B(a, 1));
                Qz(this.o, a);
                break;
            case 4:
                b(23), Qz(this.o, a)
        }
    };

    function gA(a) {
        var b = function(c) {
            var d = {};
            V(c, B(a, 1), null, (d.tic = String(Math.round((Date.now() - B(a, 3)) / 6E4)), d))
        };
        switch (zz(a)) {
            case 0:
                b(24);
                break;
            case 1:
                b(25);
                break;
            case 2:
                b(26);
                break;
            case 3:
                V(9, B(a, 1));
                break;
            case 4:
                b(23)
        }
    };
    var hA = function(a, b, c, d) {
        dA.call(this, 658, d);
        this.collectorFunction = a;
        this.storage = c;
        this.o = aA(this);
        this.G = aA(this);
        this.A = cA(this, b)
    };
    t(hA, dA);
    hA.prototype.j = function() {
        var a = this;
        if (this.A.value) {
            var b = function(f) {
                    Qz(a.o, {
                        id: B(f, 1),
                        collectorGeneratedData: B(f, 2)
                    })
                },
                c = this.A.value,
                d = B(c, 1),
                e = zz(c);
            gA(c);
            switch (e) {
                case 0:
                    b(c);
                    break;
                case 1:
                    b(c);
                    Qz(this.G, c);
                    break;
                case 3:
                case 2:
                case 4:
                    C(c, 2, null), Az(d, c, this.collectorFunction, this.storage).then(b)
            }
        } else Qz(this.o, null)
    };
    var iA = function(a, b, c) {
        dA.call(this, 1027, c);
        this.Xb = a;
        this.storage = b;
        this.o = aA(this);
        this.A = aA(this)
    };
    t(iA, dA);
    iA.prototype.j = function() {
        var a = yz().get(this.Xb, this.storage).wb;
        if (!a) {
            a = ul(this.Xb);
            var b = rz(lt) || null;
            a = C(a, 8, b);
            a = C(a, 3, Date.now());
            b = wl(a, xl(new vl, 100));
            Qz(this.A, b)
        }
        Qz(this.o, a)
    };
    var jA = function(a, b, c) {
        dA.call(this, 1043, c);
        this.A = b;
        this.o = aA(this);
        this.G = bA(this, a)
    };
    t(jA, dA);
    jA.prototype.j = function() {
        var a = this.G.value;
        this.A && C(a, 8, md(a, 8) - 1);
        Qz(this.o, a)
    };
    var kA = function(a, b, c) {
        dA.call(this, 1029, c);
        this.o = b;
        this.A = aA(this);
        this.G = bA(this, a)
    };
    t(kA, dA);
    kA.prototype.j = function() {
        var a = this.G.value,
            b = Date.now();
        if (this.o) {
            var c = md(a, 8),
                d, e = null != (d = B(a, 7)) ? d : b;
            c < this.o && C(a, 8, Math.min(c + Number((this.o * (b / 1E3 / 60 - e) / 60).toFixed(3)), this.o))
        }
        Qz(this.A, a)
    };
    var lA = function(a, b, c) {
        dA.call(this, 1047, c);
        this.collectorFunction = a;
        this.o = aA(this);
        this.A = aA(this);
        this.G = bA(this, b)
    };
    t(lA, dA);
    lA.prototype.j = function() {
        var a = this,
            b = this.G.value,
            c = B(b, 1);
        V(18, c);
        try {
            var d = wh();
            this.collectorFunction().then(function(e) {
                V(29, c, null, {
                    delta: String(wh() - d)
                });
                var f = C(b, 2, e);
                Qz(a.o, f);
                Qz(a.A, null != e ? e : null)
            }).catch(function(e) {
                V(28, c, mA(e));
                e = wl(b, xl(new vl, 106));
                Qz(a.o, e)
            })
        } catch (e) {
            V(1, c, mA(e)), Sz(this.o, wl(b, xl(new vl, 107)))
        }
    };

    function mA(a) {
        return "string" === typeof a ? a : a instanceof Error ? a.message : null
    };
    var nA = function(a, b, c) {
        dA.call(this, 1030, c);
        this.G = b;
        this.o = aA(this);
        this.A = aA(this);
        this.I = bA(this, a)
    };
    t(nA, dA);
    nA.prototype.j = function() {
        var a = this.I.value,
            b, c = null != (b = md(a, 8)) ? b : 0,
            d;
        b = null != (d = B(a, 7)) ? d : Date.now();
        1 > c && this.G ? (d = {}, V(22, B(a, 1), null, (d.t = String(b), d.cr = String(c), d.cs = String(zz(a)), d)), a = wl(a, xl(new vl, 104)), Qz(this.A, a)) : Qz(this.o, a)
    };
    var oA = function(a, b, c, d) {
        dA.call(this, 662, d);
        this.o = a;
        this.storage = c;
        this.A = bA(this, b)
    };
    t(oA, dA);
    oA.prototype.j = function() {
        var a = this;
        Dz().then(function() {
            var b = a.A.value;
            Az(B(b, 1), b, a.o, a.storage)
        })
    };
    var pA = function(a, b, c) {
        dA.call(this, 1028, c);
        this.o = b;
        this.A = aA(this);
        this.G = bA(this, a)
    };
    t(pA, dA);
    pA.prototype.j = function() {
        var a = this.G.value,
            b = B(a, 1);
        this.o && (null == B(a, 8, !1) && (V(33, b), C(a, 8, this.o)), null == B(a, 7) && (V(34, b), C(a, 7, Math.round(Date.now() / 1E3 / 60))));
        null != B(a, 3) || V(35, b);
        Qz(this.A, a)
    };
    var qA = function(a, b, c, d, e) {
        dA.call(this, 1050, e);
        this.I = c;
        this.G = d;
        this.o = aA(this);
        this.A = bA(this, a);
        this.L = cA(this, b)
    };
    t(qA, dA);
    qA.prototype.j = function() {
        var a = this.A.value,
            b = B(a, 1),
            c = this.L.value;
        if (null == c) V(41, b), wl(a, xl(new vl, 111));
        else if ("string" === typeof c)
            if (!c.length) V(20, b);
            else {
                if (c.length > (/^(\d+)$/.test(b) ? this.G : this.I)) {
                    var d = {};
                    V(12, b, null, (d.sl = String(c.length), d));
                    b = wl(a, xl(new vl, 108));
                    C(b, 2, void 0, !1)
                }
            }
        else V(21, b);
        Qz(this.o, a)
    };
    var rA = function() {
        E.apply(this, arguments);
        this.nodes = []
    };
    t(rA, E);
    var sA = function(a, b) {
            Ye(a, b);
            a.nodes.push(b)
        },
        tA = function(a, b) {
            b = r(b);
            for (var c = b.next(); !c.done; c = b.next()) sA(a, c.value)
        },
        uA = function(a) {
            a = r(a.nodes);
            for (var b = a.next(); !b.done; b = a.next()) b = b.value, qz(jt) ? (b.C = !0, Yz(b)) : b.start()
        };
    rA.prototype.O = function() {
        E.prototype.O.call(this);
        this.nodes.length = 0
    };

    function vA(a, b, c, d) {
        var e, f, g, h, k, n, m, x, u, y, A, N, X, da, xa;
        return Fa(function(sa) {
            e = new rA;
            f = rz(lt);
            g = new iA(a, c, d);
            h = new eA(g.A, c, d);
            k = new pA(g.o, f, d);
            n = new kA(k.A, f, d);
            m = new nA(n.A, f, d);
            x = new eA(m.A, c, d);
            y = u = null;
            qz(ut) ? (A = new fA(m.o, d), sA(e, A), u = A.A, N = new jA(A.o, f, d), sA(e, N), X = new lA(b, N.o, d), sA(e, X), sA(e, new eA(X.o, c, d)), sA(e, new qA(X.o, X.A, rz(pt), rz(ot), d)), y = function() {
                var cb, gc, ef;
                return Fa(function(U) {
                    return 1 == U.j ? (ef = a, wa(U, X.o.promise, 2)) : U.return({
                        id: ef,
                        collectorGeneratedData: null != (gc =
                            null == (cb = U.A) ? void 0 : B(cb, 2)) ? gc : null
                    })
                })
            }) : (da = new hA(b, m.o, c, d), sA(e, da), u = da.G, y = function() {
                var cb;
                return Fa(function(gc) {
                    return 1 == gc.j ? wa(gc, da.o.promise, 2) : gc.return(null != (cb = gc.A) ? cb : {
                        id: a,
                        collectorGeneratedData: null
                    })
                })
            });
            xa = new oA(b, u, c, d);
            tA(e, [g, h, k, n, m, x, xa]);
            uA(e);
            return sa.return(y())
        })
    };
    var wA = function(a, b, c, d) {
        dA.call(this, 1059, d);
        this.A = b;
        this.storage = c;
        this.o = aA(this);
        this.G = bA(this, a)
    };
    t(wA, dA);
    wA.prototype.j = function() {
        var a = this.G.value,
            b = a.id,
            c = a.collectorFunction,
            d;
        a = null != (d = a.networkCode) ? d : b;
        b = {};
        V(42, a, null, (b.ea = String(Number(this.A)), b));
        Tz(this.o, vA(a, c, this.storage, this.B))
    };
    var xA = function(a, b) {
        dA.call(this, 1057, b);
        this.provider = a;
        this.o = aA(this);
        this.A = aA(this)
    };
    t(xA, dA);
    xA.prototype.j = function() {
        if (this.provider)
            if ("object" !== typeof this.provider) V(46, "UNKNOWN_COLLECTOR_ID"), yA(this, "UNKNOWN_COLLECTOR_ID", 112);
            else {
                var a = this.provider.id,
                    b = this.provider.networkCode;
                a && b && (delete this.provider.id, V(47, a + ";" + b));
                a = null != b ? b : a;
                "string" !== typeof a ? (b = {}, V(37, "INVALID_COLLECTOR_ID", null, (b.ii = JSON.stringify(a), b)), yA(this, "INVALID_COLLECTOR_ID", 102)) : "function" !== typeof this.provider.collectorFunction ? (V(14, a), yA(this, a, 105)) : Qz(this.A, this.provider)
            }
        else V(39, "UNKNOWN_COLLECTOR_ID"),
            yA(this, "UNKNOWN_COLLECTOR_ID", 110)
    };
    var yA = function(a, b, c) {
        b = wl(ul(b), xl(new vl, c));
        Qz(a.o, b)
    };
    var zA = function(a, b) {
        this.storage = b;
        this.o = [];
        this.l = [];
        this.j = [];
        a = r(a);
        for (b = a.next(); !b.done; b = a.next()) this.push(b.value)
    };
    l = zA.prototype;
    l.push = function(a) {
        a = new xA(a, this.Dc);
        var b = new eA(a.o, this.storage, this.Dc),
            c = new wA(a.A, !1, this.storage, this.Dc),
            d = new rA;
        tA(d, [a, b, c]);
        uA(d);
        a = c.o.promise;
        this.o.push(a);
        b = r(this.l);
        for (c = b.next(); !c.done; c = b.next()) a.then(c.value)
    };
    l.addOnSignalResolveCallback = function(a) {
        this.l.push(a);
        for (var b = r(this.o), c = b.next(); !c.done; c = b.next()) c.value.then(a)
    };
    l.addErrorHandler = function(a) {
        this.j.push(a)
    };
    l.clearAllCache = function() {
        var a = this.storage;
        if (void 0 !== a)
            for (var b = r(Object.keys(a)), c = b.next(); !c.done; c = b.next())
                if (c = c.value, c.startsWith("_GESPSK")) try {
                    a.removeItem(c)
                } catch (d) {}
        vz = new uz;
        V(43, "")
    };
    l.Dc = function(a, b) {
        for (var c = r(this.j), d = c.next(); !d.done; d = c.next()) d = d.value, d(a, b)
    };
    var AA = function(a) {
        this.push = function(b) {
            a.push(b)
        };
        this.addOnSignalResolveCallback = function(b) {
            a.addOnSignalResolveCallback(b)
        };
        this.addErrorHandler = function(b) {
            a.addErrorHandler(b)
        };
        this.clearAllCache = function() {
            a.clearAllCache()
        }
    };

    function BA(a, b, c, d) {
        if (b) {
            var e = Kg();
            var f = window;
            f = Hg(f.top) ? f.top : null;
            e === f || qz(kt) ? CA(a, "encryptedSignalProviders", c, d) && CA(a, "secureSignalProviders", c, d) || (V(38, ""), DA(a, "encryptedSignalProviders", b, c, d), DA(a, "secureSignalProviders", b, c, d)) : V(16, "")
        } else V(15, "")
    }

    function CA(a, b, c, d) {
        return a[b] instanceof AA ? (a = a[b], d && a.addOnSignalResolveCallback(d), a.addErrorHandler(c), !0) : !1
    }

    function DA(a, b, c, d, e) {
        var f, g = new zA(null != (f = a[b]) ? f : [], c);
        a[b] = new AA(g);
        e && g.addOnSignalResolveCallback(e);
        g.addErrorHandler(d)
    }

    function EA(a, b, c, d) {
        var e = new Map;
        b = b.map(function(f) {
            var g = f.Xb;
            return new Promise(function(h) {
                e.set(g, h)
            })
        });
        BA(a, c, d, function(f) {
            var g = f.collectorGeneratedData;
            f = f.id;
            var h;
            return void(null == (h = e.get(f)) ? void 0 : h({
                collectorGeneratedData: g,
                id: f
            }))
        });
        return b
    };

    function FA() {
        var a;
        return null != (a = v.googletag) ? a : v.googletag = {
            cmd: []
        }
    };

    function GA(a) {
        if (!a || jz(a)) return null;
        try {
            return window.localStorage
        } catch (b) {
            return null
        }
    }

    function HA(a, b) {
        a = GA(a);
        BA(FA(), a, function() {}, b)
    }

    function IA(a, b) {
        return (b = GA(b)) && 0 != a.length ? EA(FA(), a, b, function() {}) : null
    };
    var W = {},
        JA = (W.creativeView = "creativeview", W.start = "start", W.midpoint = "midpoint", W.firstQuartile = "firstquartile", W.thirdQuartile = "thirdquartile", W.complete = "complete", W.mute = "mute", W.unmute = "unmute", W.pause = "pause", W.rewind = "rewind", W.resume = "resume", W.fullscreen = "fullscreen", W.exitFullscreen = "exitfullscreen", W.expand = "expand", W.collapse = "collapse", W.close = "close", W.acceptInvitation = "acceptinvitation", W.userInteraction = "userInteraction", W.adCanPlay = "adCanPlay", W.adStarted = "adStarted", W.abandon = "abandon",
            W.acceptInvitationLinear = "acceptinvitationlinear", W.engagedView = "engagedview", W.instreamAdComplete = "instreamAdComplete", W.skipShown = "skipshown", W.skippableStateChanged = "skippableStateChanged", W.skip = "skip", W.progress = "progress", W.publisher_invoked_skip = "PUBLISHER_INVOKED_SKIP", W.annotation_start = "annotation_start", W.annotation_click = "annotation_click", W.annotation_close = "annotation_close", W.cta_annotation_shown = "cta_annotation_shown", W.cta_annotation_clicked = "cta_annotation_clicked", W.cta_annotation_closed =
            "cta_annotation_closed", W.replay = "replay", W.stop = "stop", W.autoplayDisallowed = "autoplayDisallowed", W.error = "error", W.mediaLoadTimeout = "mediaLoadTimeout", W.linearChanged = "linearChanged", W.click = "click", W.contentPauseRequested = "contentPauseRequested", W.contentResumeRequested = "contentResumeRequested", W.discardAdBreak = "discardAdBreak", W.updateAdsRenderingSettings = "updateAdsRenderingSettings", W.durationChange = "durationChange", W.expandedChanged = "expandedChanged", W.autoClose = "autoClose", W.userClose = "userClose",
            W.userRecall = "userRecall", W.prefetched = "prefetched", W.loaded = "loaded", W.init = "init", W.allAdsCompleted = "allAdsCompleted", W.adMetadata = "adMetadata", W.adBreakReady = "adBreakReady", W.adBreakFetchError = "adBreakFetchError", W.log = "log", W.volumeChange = "volumeChange", W.companionBackfill = "companionBackfill", W.companionInitialized = "companionInitialized", W.companionImpression = "companionImpression", W.companionClick = "companionClick", W.impression = "impression", W.interaction = "interaction", W.adProgress = "adProgress",
            W.adBuffering = "adBuffering", W.trackingUrlPinged = "trackingUrlPinged", W.measurable_impression = "measurable_impression", W.custom_metric_viewable = "custom_metric_viewable", W.viewable_impression = "viewable_impression", W.fully_viewable_audible_half_duration_impression = "fully_viewable_audible_half_duration_impression", W.audio_audible = "audio_audible", W.audio_measurable = "audio_measurable", W.overlay_resize = "overlay_resize", W.overlay_unmeasurable_impression = "overlay_unmeasurable_impression", W.overlay_unviewable_impression =
            "overlay_unviewable_impression", W.overlay_viewable_immediate_impression = "overlay_viewable_immediate_impression", W.overlay_viewable_end_of_session_impression = "overlay_viewable_end_of_session_impression", W.externalActivityEvent = "externalActivityEvent", W.adEvent = "adEvent", W.configure = "configure", W.remainingTime = "remainingTime", W.destroy = "destroy", W.resize = "resize", W.volume = "volume", W.authorIconClicked = "videoAuthorIconClicked", W.authorNameClicked = "videoAuthorClicked", W.videoClicked = "videoClicked", W.videoIconClicked =
            "videoIconClicked", W.learnMoreClicked = "videoLearnMoreClicked", W.muteClicked = "videoMuteClicked", W.titleClicked = "videoTitleClicked", W.skipShown = "SKIP_SHOWN", W.videoSkipClicked = "SKIPPED", W.unmuteClicked = "videoUnmuteClicked", W.vpaidEvent = "vpaidEvent", W.show_ad = "show_ad", W.video_card_endcap_collapse = "video_card_endcap_collapse", W.video_card_endcap_dismiss = "video_card_endcap_dismiss", W.video_card_endcap_impression = "video_card_endcap_impression", W.mediaUrlPinged = "mediaUrlPinged", W.breakStart = "breakstart",
            W.breakEnd = "breakend", W.omidReady = "omidReady", W.omidUnavailable = "omidUnavailable", W.omidAdSessionCompleted = "omidAdSessionCompleted", W.omidAdSessionAbandoned = "omidAdSessionAbandoned", W.verificationNotExecuted = "verificationNotExecuted", W.loadStart = "loadStart", W.seeked = "seeked", W.seeking = "seeking", W);
    var LA = function(a) {
        D.call(this, a, -1, KA)
    };
    t(LA, D);
    var MA = function(a, b) {
            return C(a, 2, b)
        },
        NA = function(a, b) {
            return C(a, 3, b)
        },
        OA = function(a, b) {
            return C(a, 4, b)
        },
        PA = function(a, b) {
            return C(a, 5, b)
        },
        QA = function(a, b) {
            return C(a, 9, b)
        },
        RA = function(a, b) {
            return xd(a, 10, b)
        },
        SA = function(a, b) {
            return C(a, 11, b)
        },
        TA = function(a, b) {
            return C(a, 1, b)
        },
        UA = function(a, b) {
            return C(a, 7, b)
        },
        VA = function(a) {
            D.call(this, a)
        };
    t(VA, D);
    VA.prototype.getVersion = function() {
        return Bd(this, 2)
    };
    var KA = [10, 6];
    var WA = "platform platformVersion architecture model uaFullVersion bitness fullVersionList wow64".split(" ");

    function XA(a) {
        var b;
        return null != (b = a.google_tag_data) ? b : a.google_tag_data = {}
    }

    function YA(a) {
        var b, c;
        return "function" === typeof(null == (b = a.navigator) ? void 0 : null == (c = b.userAgentData) ? void 0 : c.getHighEntropyValues)
    }

    function ZA() {
        var a = window;
        if (!YA(a)) return null;
        var b = XA(a);
        if (b.uach_promise) return b.uach_promise;
        a = a.navigator.userAgentData.getHighEntropyValues(WA).then(function(c) {
            null != b.uach || (b.uach = c);
            return c
        });
        return b.uach_promise = a
    }

    function $A(a) {
        var b;
        return SA(RA(PA(MA(TA(OA(UA(QA(NA(new LA, a.architecture || ""), a.bitness || ""), a.mobile || !1), a.model || ""), a.platform || ""), a.platformVersion || ""), a.uaFullVersion || ""), (null == (b = a.fullVersionList) ? void 0 : b.map(function(c) {
            var d = new VA;
            d = C(d, 1, c.brand);
            return C(d, 2, c.version)
        })) || []), a.wow64 || !1)
    }

    function aB() {
        var a, b;
        return null != (b = null == (a = ZA()) ? void 0 : a.then(function(c) {
            return $A(c)
        })) ? b : null
    };
    var cB = function() {
            this.adBlock = 1;
            this.appName = null;
            new gz;
            this.cpid = null;
            uy();
            this.deviceId = "";
            this.j = this.referrer = null;
            bB(this)
        },
        dB = function() {
            cB.j();
            var a = "h.3.549.0";
            Vy.Lb() && (a += "/vpaid_adapter");
            return a
        },
        bB = function(a) {
            var b = aB();
            b && b.then(function(c) {
                if (null == c) c = null;
                else {
                    c = Jd(c);
                    for (var d = [], e = 0, f = 0; f < c.length; f++) {
                        var g = c.charCodeAt(f);
                        255 < g && (d[e++] = g & 255, g >>= 8);
                        d[e++] = g
                    }
                    c = zc(d, 3)
                }
                a.j = c
            })
        };
    cB.j = function() {
        return J(cB)
    };
    var eB = "abort canplay canplaythrough durationchange emptied loadstart loadeddata loadedmetadata progress ratechange seeked seeking stalled suspend waiting".split(" ");
    var gB = function(a) {
            var b = Uy(Vy);
            if (b && Ry(b, "forceCustomPlayback") || Vy.Lb()) return !0;
            if ((fc || Au()) && a) return !1;
            a = a && (fc || Au() || Bu(10)) && Vy.getDisableCustomPlaybackForIOS10Plus();
            return (ec || hc) && !a || dc && (!dc || !zu(yu, 4)) || fB() ? !0 : !1
        },
        hB = function(a) {
            return null == a ? !1 : Vy.Lb() ? !0 : ic || fc || Au() ? Cu(a) ? fc || Au() || Bu(10) && Vy.getDisableCustomPlaybackForIOS10Plus() ? !1 : !0 : !0 : dc && (!dc || !zu(yu, 4)) || fB() ? !0 : !1
        },
        iB = function() {
            var a = Uy(Vy);
            return a && Ry(a, "disableOnScreenDetection") ? !1 : !An()
        },
        fB = function() {
            return 1 ==
                jB() || 2 == jB()
        },
        jB = function() {
            return (cB.j(), cB.j(), "tvos" == (cB.j(), null)) ? 1 : Bn() ? 2 : 0
        };
    var kB = function(a, b) {
        return 0 == a.indexOf(b) ? a.substr(b.length) : null
    };
    var lB = function() {
            var a = G(),
                b = document;
            return new R(a.parent == a ? a.location.href : b.referrer)
        },
        mB = function(a, b) {
            Mt(a, "url", "");
            try {
                var c = 2083 - a.toString().length - 1;
                if (0 >= c) return a.toString();
                for (var d = b.slice(0, c), e = encodeURIComponent(d), f = c; 0 < f && e.length > c;) d = b.slice(0, f--), e = encodeURIComponent(d);
                Mt(a, "url", d)
            } catch (g) {}
            return a.toString()
        };
    var nB = {
        xf: function(a, b) {
            a && (Wt(a) ? Xt(a, b) : du(a, b))
        }
    };

    function oB(a) {
        a = qu(a, An() ? "https" : window.location.protocol);
        if (An()) pB(a);
        else try {
            nB.xf(a, !0)
        } catch (b) {}
    }

    function pB(a) {
        (new pv).get({
            url: a,
            timeout: new Ou
        }).then(function() {}, function() {})
    };
    var qB = function() {
        this.j = .01 > Math.random();
        this.l = Math.floor(4503599627370496 * Math.random())
    };
    qB.prototype.report = function(a, b, c) {
        b = void 0 === b ? {} : b;
        if (null == v.G_testRunner && (this.j || (void 0 === c ? 0 : c))) {
            b.lid = a;
            b.sdkv = dB();
            a = li().sort().join(",");
            fb(Uf(a)) || (b.e = a);
            b = rB(this, b);
            var d = new R("http://pagead2.googlesyndication.com/pagead/gen_204");
            af(b, function(e, f) {
                Mt(d, f, null == e ? "" : "boolean" == typeof e ? e ? "t" : "f" : "" + e)
            }, this);
            b = lB();
            zt(d, b.B);
            b = d.toString();
            a = d.l.get("url");
            null != a && vb() && 2083 < b.length && (b = mB(d, a));
            oB(b)
        }
    };
    var rB = function(a, b) {
        b.id = "ima_html5";
        var c = lB();
        b.c = a.l;
        b.domain = c.o;
        return b
    };
    qB.prototype.isLoggingEnabled = function() {
        return this.j
    };
    qB.j = function() {
        return J(qB)
    };

    function sB(a, b) {
        return b instanceof RegExp ? "__REGEXP" + b.toString() : b
    }

    function tB(a, b) {
        return b && 0 == b.toString().indexOf("__REGEXP") ? (a = b.split("__REGEXP")[1].match(/\/(.*)\/(.*)?/), new RegExp(a[1], a[2] || "")) : b
    }
    var uB = function(a, b) {
        Dy.call(this, b);
        this.A = a;
        this.j = null;
        this.C = new Tu(this);
        this.C.R(G(), "message", this.D)
    };
    t(uB, Dy);
    var vB = function(a) {
        if (null == a || "string" !== typeof a || 0 != a.lastIndexOf("ima://", 0)) return null;
        a = a.substr(6);
        try {
            return JSON.parse(a, tB)
        } catch (b) {
            return null
        }
    };
    uB.prototype.sendMessage = function(a, b, c) {
        if (null != this.j && null != this.j.postMessage) {
            var d = this.j,
                e = d.postMessage,
                f = {};
            f.name = a;
            f.type = b;
            null != c && (f.data = c);
            f.sid = this.sessionId;
            f.channel = this.A;
            a = "ima://" + Zh(new Xh(sB), f);
            e.call(d, a, "*")
        }
        null != this.j && null == this.j.postMessage && qB.j().report(11)
    };
    uB.prototype.O = function() {
        We(this.C);
        this.j = null;
        Dy.prototype.O.call(this)
    };
    uB.prototype.D = function(a) {
        a = a.j;
        var b = vB(a.data);
        if (wB(this, b)) {
            if (null == this.j) this.j = a.source, this.l || this.connect();
            else if (this.j != a.source) return;
            wB(this, b) && this.dispatchEvent(new Fy(b.name, b.type, b.data || {}, b.sid, a.origin))
        }
    };
    var wB = function(a, b) {
        if (null == b) return !1;
        var c = b.channel;
        if (null == c || c != a.A) return !1;
        b = b.sid;
        return null == b || "*" != a.sessionId && b != a.sessionId ? !1 : !0
    };
    var xB = function() {
        O.call(this);
        this.G = !1;
        this.j = null;
        this.C = this.F = this.L = !1;
        this.l = 0;
        this.A = [];
        this.D = !1;
        this.P = this.N = Infinity;
        this.o = 0;
        this.K = new Tu(this);
        Ye(this, this.K);
        this.I = {}
    };
    t(xB, O);
    var zB = function(a, b) {
            null == b || a.G || (a.j = b, yB(a), a.G = !0)
        },
        BB = function(a) {
            null != a.j && a.G && (AB(a), a.G = !1, a.F = !1, a.C = !1, a.l = 0, a.A = [], a.D = !1)
        },
        yB = function(a) {
            AB(a);
            !(a.j instanceof O) && "ontouchstart" in document.documentElement && ic ? (a.I = {
                touchstart: function(b) {
                    a.F = !0;
                    a.l = b.touches.length;
                    a.o && (window.clearTimeout(a.o), a.o = 0, a.L = !0);
                    a.D = CB(a, b.touches) || 1 != b.touches.length;
                    a.D ? (a.N = Infinity, a.P = Infinity) : (a.N = b.touches[0].clientX, a.P = b.touches[0].clientY);
                    b = b.touches;
                    a.A = [];
                    for (var c = 0; c < b.length; c++) a.A.push(b[c].identifier)
                },
                touchmove: function(b) {
                    a.l = b.touches.length;
                    if (!Bu(8) || Math.pow(b.changedTouches[0].clientX - a.N, 2) + Math.pow(b.changedTouches[0].clientY - a.P, 2) > Math.pow(5, 2)) a.C = !0
                },
                touchend: function(b) {
                    return void DB(a, b)
                }
            }, af(a.I, function(b, c) {
                a.j.addEventListener(c, b, !1)
            })) : a.K.R(a.j, "click", a.U)
        },
        AB = function(a) {
            a.K.kb(a.j, "click", a.U);
            af(a.I, function(b, c) {
                this.j.removeEventListener(c, b, !1)
            }, a);
            a.I = {}
        },
        DB = function(a, b) {
            !a.F || 1 != a.l || a.C || a.L || a.D || !CB(a, b.changedTouches) || (a.o = window.setTimeout(function() {
                    return void EB(a)
                },
                300));
            a.l = b.touches.length;
            0 == a.l && (a.F = !1, a.C = !1, a.A = []);
            a.L = !1
        };
    xB.prototype.U = function() {
        EB(this)
    };
    var CB = function(a, b) {
            for (var c = 0; c < b.length; c++)
                if (a.A.includes(b[c].identifier)) return !0;
            return !1
        },
        EB = function(a) {
            a.o = 0;
            a.dispatchEvent(new wj("click"))
        };
    xB.prototype.O = function() {
        BB(this);
        O.prototype.O.call(this)
    };
    var FB = function(a, b, c) {
        this.l = c;
        0 == b.length && (b = [
            []
        ]);
        this.j = b.map(function(d) {
            d = a.concat(d);
            for (var e = [], f = 0, g = 0; f < d.length;) {
                var h = d[f++];
                if (128 > h) e[g++] = String.fromCharCode(h);
                else if (191 < h && 224 > h) {
                    var k = d[f++];
                    e[g++] = String.fromCharCode((h & 31) << 6 | k & 63)
                } else if (239 < h && 365 > h) {
                    k = d[f++];
                    var n = d[f++],
                        m = d[f++];
                    h = ((h & 7) << 18 | (k & 63) << 12 | (n & 63) << 6 | m & 63) - 65536;
                    e[g++] = String.fromCharCode(55296 + (h >> 10));
                    e[g++] = String.fromCharCode(56320 + (h & 1023))
                } else k = d[f++], n = d[f++], e[g++] = String.fromCharCode((h & 15) << 12 |
                    (k & 63) << 6 | n & 63)
            }
            return new RegExp(e.join(""))
        })
    };
    FB.prototype.match = function(a) {
        var b = this;
        return this.j.some(function(c) {
            c = a.match(c);
            return null == c ? !1 : !b.l || 1 <= c.length && "3.549.0" == c[1] || 2 <= c.length && "3.549.0" == c[2] ? !0 : !1
        })
    };
    var GB = [104, 116, 116, 112, 115, 63, 58, 47, 47, 105, 109, 97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105, 115, 92, 46, 99, 111, 109, 47, 106, 115, 47, 40, 115, 100, 107, 108, 111, 97, 100, 101, 114, 124, 99, 111, 114, 101, 41, 47],
        HB = [104, 116, 116, 112, 115, 63, 58, 47, 47, 115, 48, 92, 46, 50, 109, 100, 110, 92, 46, 110, 101, 116, 47, 105, 110, 115, 116, 114, 101, 97, 109, 47, 104, 116, 109, 108, 53, 47],
        IB = [104, 116, 116, 112, 115, 63, 58, 47, 47, 105, 109, 97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105, 115, 92, 46, 99, 111, 109, 47, 112, 114, 101, 114, 101, 108, 101, 97, 115,
            101, 47, 106, 115, 47, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 47
        ],
        JB = [
            [105, 109, 97, 51, 92, 46, 106, 115],
            [105, 109, 97, 51, 95, 100, 101, 98, 117, 103, 92, 46, 106, 115],
            [105, 109, 97, 51, 95, 101, 97, 112, 46, 106, 115]
        ],
        KB = [
            [98, 114, 105, 100, 103, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108],
            [98, 114, 105, 100, 103, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 95, 100, 101, 98, 117, 103, 40, 95, 40, 91, 97, 45, 122, 48,
                45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108
            ],
            [98, 114, 105, 100, 103, 101, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108]
        ],
        LB = [
            [111, 117, 116, 115, 116, 114, 101, 97, 109, 92, 46, 106, 115],
            [111, 117, 116, 115, 116, 114, 101, 97, 109, 95, 100, 101, 98, 117, 103, 92, 46, 106, 115]
        ],
        MB = new FB(GB, JB, !1),
        NB = new FB(GB, KB, !0),
        OB = new FB(HB, JB, !1),
        PB = new FB(HB, KB, !0),
        QB = new FB(IB, JB, !1),
        RB = new FB([104, 116, 116, 112, 115, 63, 58, 47, 47, 40, 112, 97, 103, 101, 97, 100, 50, 124, 116,
            112, 99, 41, 92, 46, 103, 111, 111, 103, 108, 101, 115, 121, 110, 100, 105, 99, 97, 116, 105, 111, 110, 92, 46, 99, 111, 109, 47, 112, 97, 103, 101, 97, 100, 47, 40, 103, 97, 100, 103, 101, 116, 115, 124, 106, 115, 41, 47
        ], [], !1),
        SB = new FB(GB, [
            [100, 97, 105, 95, 105, 102, 114, 97, 109, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108],
            [100, 97, 105, 95, 105, 102, 114, 97, 109, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 95, 100, 101, 98, 117, 103, 40,
                95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108
            ],
            [100, 97, 105, 95, 105, 102, 114, 97, 109, 101, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108]
        ], !0),
        TB = new FB(GB, LB, !1),
        UB = new FB(IB, LB, !1),
        df = {
            yg: MB,
            wg: NB,
            Sg: OB,
            Rg: PB,
            zg: QB,
            vh: RB,
            xg: SB,
            bh: TB,
            eh: UB
        };

    function VB(a) {
        for (var b = null, c = 0; c < a.length; c++)
            if (b = a[c], cf(function(d) {
                    return d.match(b.src)
                })) return b;
        return null
    };
    var WB = zf(Ne(new Me(Ke, "https://pagead2.googlesyndication.com/omsdk/releases/live/omweb-v1.js"))),
        XB = zf(Ne(new Me(Ke, "https://pagead2.googlesyndication.com/omsdk/releases/canary/omweb-v1.js")));
    var $B = function(a, b) {
            YB ? a.srcdoc = b : (a = a.contentWindow) && ZB(a.document, b)
        },
        YB = bc && "srcdoc" in ig(document, "IFRAME"),
        ZB = function(a, b) {
            a.open("text/html", "replace");
            Dg(a, Nf(b));
            a.close()
        };

    function aC(a) {
        return (a = og(a)) && a.omidSessionInterface ? a.omidSessionInterface : null
    }

    function bC(a, b) {
        var c = kg("IFRAME", {
            sandbox: "allow-scripts allow-same-origin",
            style: "display: none"
        });
        a.appendChild(c);
        a = "<script src=" + (cj.isSelected() ? XB : WB).Ka() + ">\x3c/script>";
        b && (a += "\n      <script>\n        window.addEventListener('message', function(e) {\n          if (e.data.type === 'innerBridgeIframeLoaded') {\n            window.frameElement.parentElement\n              .querySelector('#" + b + "').contentWindow\n              .postMessage({type: 'omidIframeLoaded'}, '*');\n          }\n        });\n      \x3c/script>\n    ");
        b =
            new Promise(function(d, e) {
                c.addEventListener("load", function() {
                    aC(c) ? d(c) : e()
                })
            });
        $B(c, a);
        return b
    };
    var cC = function(a, b) {
        O.call(this);
        this.l = aC(a);
        this.j = b
    };
    t(cC, O);
    var eC = function(a) {
            try {
                a.l.registerSessionObserver(function(b) {
                    "sessionStart" == b.type ? dC(a, a.j) : "sessionFinish" == b.type && eC(a)
                })
            } catch (b) {
                a.dispatchEvent(new Event("error"))
            }
        },
        dC = function(a, b) {
            b instanceof Rx && (b = b.T);
            try {
                a.l.setVideoElement(b)
            } catch (c) {
                a.dispatchEvent(new Event("error"))
            }
        };
    var fC = function(a) {
        this.j = a
    };
    l = fC.prototype;
    l.getTotalAds = function() {
        return this.j.totalAds
    };
    l.getMaxDuration = function() {
        return this.j.maxDuration
    };
    l.getAdPosition = function() {
        return this.j.adPosition
    };
    l.getPodIndex = function() {
        return this.j.podIndex
    };
    l.getTimeOffset = function() {
        return this.j.timeOffset
    };
    l.getIsBumper = function() {
        return this.j.isBumper
    };
    fC.prototype.getIsBumper = fC.prototype.getIsBumper;
    fC.prototype.getTimeOffset = fC.prototype.getTimeOffset;
    fC.prototype.getPodIndex = fC.prototype.getPodIndex;
    fC.prototype.getAdPosition = fC.prototype.getAdPosition;
    fC.prototype.getMaxDuration = fC.prototype.getMaxDuration;
    fC.prototype.getTotalAds = fC.prototype.getTotalAds;
    var gC = function(a) {
        this.j = a
    };
    l = gC.prototype;
    l.getContent = function() {
        return this.j.content
    };
    l.getContentType = function() {
        return this.j.contentType
    };
    l.getWidth = function() {
        return this.j.size.width
    };
    l.getHeight = function() {
        return this.j.size.height
    };
    l.getAdSlotId = function() {
        return this.j.adSlotId
    };
    var Py = function(a) {
        return (a = a.j.backupCompanions) ? a.map(function(b) {
            return new gC(b)
        }) : []
    };
    gC.prototype.getAdSlotId = gC.prototype.getAdSlotId;
    gC.prototype.getHeight = gC.prototype.getHeight;
    gC.prototype.getWidth = gC.prototype.getWidth;
    gC.prototype.getContentType = gC.prototype.getContentType;
    gC.prototype.getContent = gC.prototype.getContent;
    var hC = function(a, b) {
        this.l = a;
        this.j = b
    };
    hC.prototype.getAdIdValue = function() {
        return this.l
    };
    hC.prototype.getAdIdRegistry = function() {
        return this.j
    };
    hC.prototype.getAdIdRegistry = hC.prototype.getAdIdRegistry;
    hC.prototype.getAdIdValue = hC.prototype.getAdIdValue;
    var Y = function(a) {
        this.j = a
    };
    Y.prototype.getAdId = function() {
        return this.j.adId
    };
    Y.prototype.getCreativeAdId = function() {
        return this.j.creativeAdId
    };
    Y.prototype.getCreativeId = function() {
        return this.j.creativeId
    };
    var iC = function(a) {
        return a.j.adQueryId
    };
    l = Y.prototype;
    l.getAdSystem = function() {
        return this.j.adSystem
    };
    l.getAdvertiserName = function() {
        return this.j.advertiserName
    };
    l.getApiFramework = function() {
        return this.j.apiFramework
    };
    l.getWrapperAdIds = function() {
        return this.j.adWrapperIds
    };
    l.getWrapperCreativeIds = function() {
        return this.j.adWrapperCreativeIds
    };
    l.getWrapperAdSystems = function() {
        return this.j.adWrapperSystems
    };
    l.isLinear = function() {
        return this.j.linear
    };
    l.isSkippable = function() {
        return this.j.skippable
    };
    l.getContentType = function() {
        return this.j.contentType
    };
    l.getDescription = function() {
        return this.j.description
    };
    l.getTitle = function() {
        return this.j.title
    };
    l.getDuration = function() {
        return this.j.duration
    };
    l.getVastMediaWidth = function() {
        return this.j.vastMediaWidth
    };
    l.getVastMediaHeight = function() {
        return this.j.vastMediaHeight
    };
    l.getWidth = function() {
        return this.j.width
    };
    l.getHeight = function() {
        return this.j.height
    };
    l.getUiElements = function() {
        return this.j.uiElements
    };
    l.getMinSuggestedDuration = function() {
        return this.j.minSuggestedDuration
    };
    l.getAdPodInfo = function() {
        return new fC(this.j.adPodInfo)
    };
    l.getCompanionAds = function(a, b, c) {
        if (!this.j.companions) return [];
        var d = this.j.companions.map(function(e) {
            return new gC(e)
        });
        return Oy(new Ly({
            size: new F(a, b),
            Jd: c ? "SelectFluid" == c.sizeCriteria : !1
        }, c), d)
    };
    l.getTraffickingParameters = function() {
        return Mu(Uf(this.j.traffickingParameters))
    };
    l.getTraffickingParametersString = function() {
        return this.j.traffickingParameters
    };
    l.getVastMediaBitrate = function() {
        return this.j.vastMediaBitrate
    };
    l.getMediaUrl = function() {
        return this.j.mediaUrl
    };
    l.getSurveyUrl = function() {
        return this.j.surveyUrl
    };
    l.getDealId = function() {
        return this.j.dealId
    };
    l.getUniversalAdIds = function() {
        return (this.j.universalAdIds || []).map(function(a) {
            return new hC(a.adIdValue, a.adIdRegistry)
        })
    };
    l.getUniversalAdIdValue = function() {
        return this.j.universalAdIdValue
    };
    l.getUniversalAdIdRegistry = function() {
        return this.j.universalAdIdRegistry
    };
    l.getSkipTimeOffset = function() {
        return this.j.skipTimeOffset
    };
    l.Pd = function() {
        return this.j.disableUi
    };
    Y.prototype.isUiDisabled = Y.prototype.Pd;
    Y.prototype.getSkipTimeOffset = Y.prototype.getSkipTimeOffset;
    Y.prototype.getUniversalAdIdRegistry = Y.prototype.getUniversalAdIdRegistry;
    Y.prototype.getUniversalAdIdValue = Y.prototype.getUniversalAdIdValue;
    Y.prototype.getUniversalAdIds = Y.prototype.getUniversalAdIds;
    Y.prototype.getDealId = Y.prototype.getDealId;
    Y.prototype.getSurveyUrl = Y.prototype.getSurveyUrl;
    Y.prototype.getMediaUrl = Y.prototype.getMediaUrl;
    Y.prototype.getVastMediaBitrate = Y.prototype.getVastMediaBitrate;
    Y.prototype.getTraffickingParametersString = Y.prototype.getTraffickingParametersString;
    Y.prototype.getTraffickingParameters = Y.prototype.getTraffickingParameters;
    Y.prototype.getCompanionAds = Y.prototype.getCompanionAds;
    Y.prototype.getAdPodInfo = Y.prototype.getAdPodInfo;
    Y.prototype.getMinSuggestedDuration = Y.prototype.getMinSuggestedDuration;
    Y.prototype.getUiElements = Y.prototype.getUiElements;
    Y.prototype.getHeight = Y.prototype.getHeight;
    Y.prototype.getWidth = Y.prototype.getWidth;
    Y.prototype.getVastMediaHeight = Y.prototype.getVastMediaHeight;
    Y.prototype.getVastMediaWidth = Y.prototype.getVastMediaWidth;
    Y.prototype.getDuration = Y.prototype.getDuration;
    Y.prototype.getTitle = Y.prototype.getTitle;
    Y.prototype.getDescription = Y.prototype.getDescription;
    Y.prototype.getContentType = Y.prototype.getContentType;
    Y.prototype.isSkippable = Y.prototype.isSkippable;
    Y.prototype.isLinear = Y.prototype.isLinear;
    Y.prototype.getWrapperAdSystems = Y.prototype.getWrapperAdSystems;
    Y.prototype.getWrapperCreativeIds = Y.prototype.getWrapperCreativeIds;
    Y.prototype.getWrapperAdIds = Y.prototype.getWrapperAdIds;
    Y.prototype.getApiFramework = Y.prototype.getApiFramework;
    Y.prototype.getAdvertiserName = Y.prototype.getAdvertiserName;
    Y.prototype.getAdSystem = Y.prototype.getAdSystem;
    Y.prototype.getCreativeId = Y.prototype.getCreativeId;
    Y.prototype.getCreativeAdId = Y.prototype.getCreativeAdId;
    Y.prototype.getAdId = Y.prototype.getAdId;
    var jC = function(a) {
        this.j = a
    };
    jC.prototype.getCuePoints = function() {
        return this.j
    };
    jC.prototype.getCuePoints = jC.prototype.getCuePoints;
    w("module$contents$ima$AdCuePoints_AdCuePoints.PREROLL", 0);
    w("module$contents$ima$AdCuePoints_AdCuePoints.POSTROLL", -1);
    var kC = function() {
            this.autoAlign = !0;
            this.bitrate = -1;
            this.enablePreloading = this.disableUi = this.disableClickThrough = !1;
            this.loadVideoTimeout = 8E3;
            this.mimeTypes = null;
            this.playAdsAfterTime = -1;
            this.restoreCustomPlaybackStateOnAdBreakComplete = !1;
            this.uiElements = null;
            this.useStyledNonLinearAds = this.useStyledLinearAds = this.useLearnMoreButton = !1;
            this.useVideoAdUi = !0
        },
        lC = function(a, b) {
            var c = {};
            Object.assign(c, a);
            b && (c.disableClickThrough = !0);
            return c
        };
    kC.prototype.append = function(a) {
        if (a) {
            null != a.autoAlign && (this.autoAlign = a.autoAlign);
            var b = Zf(a.bitrate);
            "number" === typeof b && !isNaN(b) && 0 < b && (this.bitrate = b);
            this.disableClickThrough = a.disableClickThrough || this.disableClickThrough;
            this.disableUi = a.disableUi || this.disableUi;
            this.enablePreloading = a.enablePreloading || this.enablePreloading;
            a.mimeTypes && 0 != a.mimeTypes.length && (this.mimeTypes = a.mimeTypes);
            b = Zf(a.playAdsAfterTime);
            "number" === typeof b && !isNaN(b) && 0 < b && (this.playAdsAfterTime = b);
            this.restoreCustomPlaybackStateOnAdBreakComplete =
                a.restoreCustomPlaybackStateOnAdBreakComplete || this.restoreCustomPlaybackStateOnAdBreakComplete;
            b = Zf(a.loadVideoTimeout);
            "number" === typeof b && !isNaN(b) && 0 < b && (this.loadVideoTimeout = b);
            this.uiElements = a.uiElements || this.uiElements;
            this.useLearnMoreButton = a.useLearnMoreButton || this.useLearnMoreButton;
            this.useStyledLinearAds = a.useStyledLinearAds || this.useStyledLinearAds;
            this.useStyledNonLinearAds = a.useStyledNonLinearAds || this.useStyledNonLinearAds;
            this.useVideoAdUi = !1 === a.useVideoAdUi ? !1 : this.useVideoAdUi
        }
    };
    w("module$contents$ima$AdsRenderingSettings_AdsRenderingSettings.AUTO_SCALE", -1);
    var mC = null,
        nC = function() {
            O.call(this);
            this.j = null;
            this.D = new Tu(this);
            Ye(this, this.D);
            this.l = new Map;
            this.A = new Map;
            this.o = this.F = !1;
            this.C = null
        },
        oC;
    t(nC, O);
    var pC = function() {
            null == mC && (mC = new nC);
            return mC
        },
        Vr = function(a, b, c) {
            var d = {};
            d.queryId = b;
            d.viewabilityData = c;
            a.j && Ey(a.j, "activityMonitor", "viewabilityMeasurement", d)
        };
    nC.prototype.destroy = function() {
        this.D.kb(this.j, "activityMonitor", this.G);
        this.o = !1;
        this.l.clear();
        this === oC && (oC = null)
    };
    nC.prototype.O = function() {
        this.destroy();
        O.prototype.O.call(this)
    };
    nC.prototype.init = function(a) {
        if (!this.o) {
            if (this.j = a || null) this.D.R(this.j, "activityMonitor", this.G), qC(this);
            if (!(v.ima && v.ima.video && v.ima.video.client && v.ima.video.client.tagged)) {
                w("ima.video.client.sdkTag", !0);
                var b = v.document;
                a = ig(document, "SCRIPT");
                var c = zf(Ne(new Me(Ke, "https://s0.2mdn.net/instream/video/client.js")));
                a.src = yf(c);
                Cg(a);
                a.async = !0;
                a.type = "text/javascript";
                b = b.getElementsByTagName("script")[0];
                b.parentNode.insertBefore(a, b)
            }
            am();
            J(Lr).I = Vy.j;
            this.F = !0;
            J(Lr).o = !0;
            this.C = null;
            a = J(Lr);
            b = "h" == wr(a) || "b" == wr(a);
            c = !(Q(), !1);
            b && c && (a.M = !0, a.G = new Pp);
            this.o = !0
        }
    };
    var sC = function(a) {
            if (null == a) return !1;
            if ((ec || hc) && null != a.webkitDisplayingFullscreen) return a.webkitDisplayingFullscreen;
            a = rC(a);
            var b = window.screen.availHeight || window.screen.height;
            return 0 >= (window.screen.availWidth || window.screen.width) - a.width && 42 >= b - a.height
        },
        rC = function(a) {
            var b = {
                left: a.offsetLeft,
                top: a.offsetTop,
                width: a.offsetWidth,
                height: a.offsetHeight
            };
            try {
                "function" === typeof a.getBoundingClientRect && ng(ag(a), a) && (b = a.getBoundingClientRect())
            } catch (c) {}
            return b
        },
        tC = function(a, b, c, d, e) {
            e =
                void 0 === e ? {} : e;
            if (a.o) {
                d && null == e.opt_osdId && (e.opt_osdId = d);
                if (a.C) return a.C(b, c, e);
                if (a = d ? a.A.get(d) : Vy.B) null == e.opt_fullscreen && (e.opt_fullscreen = sC(a)), null == e.opt_adElement && (e.opt_adElement = a);
                return ks.jb(469, Va(Yr, b, c, e)) || {}
            }
            return {}
        },
        uC = function(a) {
            var b;
            0 != Vy.j ? b = J(Lr).o : b = a.F;
            return b
        },
        vC = function(a, b) {
            var c = String(Math.floor(1E9 * Math.random()));
            a.A.set(c, b);
            if (kj.isSelected()) try {
                kl(function(d) {
                    if (a.j) {
                        var e = {};
                        e.engagementString = d;
                        Ey(a.j, "activityMonitor", "engagementData", e)
                    }
                }, function() {
                    return b
                })
            } catch (d) {}
            0 !=
                Vy.j && Wr(J(Lr), c, a);
            return c
        },
        wC = function(a, b, c) {
            if (c) a.l.get(c) == b && a.l.delete(c);
            else {
                var d = [];
                a.l.forEach(function(e, f) {
                    e == b && d.push(f)
                });
                d.forEach(a.l.delete, a.l)
            }
        },
        Rr = function(a, b) {
            a = a.l.get(b);
            return "function" === typeof a ? a() : {}
        },
        qC = function(a) {
            if ("function" === typeof window.Goog_AdSense_Lidar_getUrlSignalsArray) {
                var b = {};
                b.pageSignals = window.Goog_AdSense_Lidar_getUrlSignalsArray();
                Ey(a.j, "activityMonitor", "pageSignals", b)
            }
        };
    nC.prototype.G = function(a) {
        var b = a.oa,
            c = b.queryId,
            d = {},
            e = null;
        d.eventId = b.eventId;
        switch (a.messageType) {
            case "getPageSignals":
                qC(this);
                break;
            case "reportVastEvent":
                e = b.vastEvent;
                a = b.osdId;
                var f = {};
                f.opt_fullscreen = b.isFullscreen;
                b.isOverlay && (f.opt_bounds = b.overlayBounds);
                d.viewabilityData = tC(this, e, c, a, f);
                Ey(this.j, "activityMonitor", "viewability", d);
                break;
            case "fetchAdTagUrl":
                c = {}, c.eventId = b.eventId, a = b.osdId, lf(b, "isFullscreen") && (e = b.isFullscreen), lf(b, "loggingId") && (b = b.loggingId, c.loggingId =
                    b, qB.j().report(43, {
                        step: "beforeLookup",
                        logid: b,
                        time: Date.now()
                    })), c.engagementString = xC(this, a, e), this.j && Ey(this.j, "activityMonitor", "engagement", c)
        }
    };
    var xC = function(a, b, c) {
        var d = b ? a.A.get(b) : Vy.B;
        a = {};
        null != c && (a.fullscreen = c);
        c = "";
        try {
            c = jl(function() {
                return d
            }, a)
        } catch (e) {
            c = "sdktle;" + Sf(e.name, 12) + ";" + Sf(e.message, 40)
        }
        return c
    };
    w("ima.common.getVideoMetadata", function(a) {
        return Rr(pC(), a)
    });
    w("ima.common.triggerViewabilityMeasurementUpdate", function(a, b) {
        Vr(pC(), a, b)
    });
    var yC = function(a) {
            this.j = a;
            this.o = "";
            this.l = -1;
            this.B = !1
        },
        AC = function(a, b) {
            if (0 <= a.l) {
                var c = null == b ? function() {} : b,
                    d = function() {
                        zC(a, c);
                        a.j.removeEventListener("loadedmetadata", d, !1)
                    };
                a.j.addEventListener("loadedmetadata", d, !1);
                a.j.src = a.o;
                a.j.load()
            } else null != b && b()
        },
        zC = function(a, b) {
            var c = 0 < a.j.seekable.length;
            a.B ? c ? (a.j.currentTime = a.l, BC(a), b()) : setTimeout(function() {
                return zC(a, b)
            }, 100) : (BC(a), b())
        },
        BC = function(a) {
            a.l = -1;
            a.o = "";
            a.B = !1
        };
    var CC = new F(5, 5),
        DC = function(a) {
            O.call(this);
            this.j = a;
            this.ba = null;
            this.C = new yC(a);
            this.l = new Tu(this);
            Ye(this, this.l);
            this.A = 0;
            this.K = this.F = this.N = this.Z = this.I = !1;
            this.L = this.o = null;
            this.U = new F(this.j.offsetWidth, this.j.offsetHeight);
            this.Ra = null;
            this.X = sC(this.j);
            this.Y = !1
        };
    t(DC, O);
    l = DC.prototype;
    l.td = function() {
        var a = this.C;
        a.o = a.j.currentSrc;
        a.B = 0 < a.j.seekable.length;
        a.l = a.j.ended ? -1 : a.j.currentTime
    };
    l.Sb = function(a) {
        AC(this.C, a)
    };
    l.load = function(a, b) {
        var c = K.j().j;
        c.U = !0;
        Jh(c);
        Uh("hvd_lc");
        EC(this);
        this.N = !1;
        if (b)
            if (Uh("hvd_ad"), b instanceof hu) {
                if (Uh("hvd_mad"), c = b.getMediaUrl()) {
                    Uh("hvd_admu");
                    Uh("hvd_src");
                    this.j.src = c;
                    this.j.load();
                    return
                }
            } else if (b instanceof gu) {
            Uh("hvd_dad");
            c = b.B;
            var d = b.l,
                e = b.o,
                f = b.j,
                g = b.Za,
                h = b.Ta;
            if (c && d && e && f && g && h && (Uh("hvd_addu"), b.za)) {
                Uh("hvd_admse");
                b = e + '; codecs="' + g + '"';
                f = f + '; codecs="' + h + '"';
                if (ax() && ax() && MediaSource.isTypeSupported(b) && ax() && MediaSource.isTypeSupported(f)) {
                    Uh("hvd_ymse");
                    Uh("hvd_mse");
                    a = !1;
                    try {
                        -1 != window.location.search.indexOf("goog_limavideo=true") && (a = !0)
                    } catch (k) {}
                    v.customElements ? a ? a = !0 : (lj.isSelected() && qB.j().report(153, {
                        limvid: "vd"
                    }), a = lj.isSelected() || fj.isSelected() || jj.isSelected() || ij.isSelected() || gj.isSelected() || hj.isSelected() || dj.isSelected() || ej.isSelected() ? !0 : !1) : a = !1;
                    a && this.j instanceof Rx ? (a = this.j, a.rb = c, a.Gb = d) : (this.ba = new oy(this.j, [new dx(c, b, 35E4, new xv), new dx(d, f, 82E3, new xv)]), Ye(this, this.ba), c = this.j, d = this.ba, d.j || (d.j = window.URL.createObjectURL(d.ga)),
                        d = d.j, c.src = d);
                    this.j.load();
                    return
                }
                Uh("hvd_nmse")
            }
        } else Uh("hvd_uad");
        a ? (Uh("hvd_src"), this.j.src = a) : Uh("hvd_vn");
        this.j.load()
    };
    l.setVolume = function(a) {
        this.j.volume = Math.max(a, 0);
        this.j.muted = 0 == a ? !0 : !1
    };
    l.getVolume = function() {
        return this.isMuted() ? 0 : this.j.volume
    };
    var FC = function(a) {
        a.Y = !1;
        a.N || vb() ? (a.K = !1, a.o = a.j.play(), null != a.o && (a.L = null, a.o.then(function() {
            a.o = null;
            a.Qd(a.L);
            a.L = null
        }).catch(function(b) {
            a.o = null;
            var c = "";
            null != b && null != b.name && (c = b.name);
            "AbortError" == c || "NotAllowedError" == c ? a.dispatchEvent("autoplayDisallowed") : a.ca()
        }))) : a.K = !0
    };
    l = DC.prototype;
    l.pause = function() {
        null == this.o && (this.Y = !0, this.j.pause())
    };
    l.isMuted = function() {
        return this.j.muted
    };
    l.getCurrentTime = function() {
        return this.j.currentTime
    };
    l.getDuration = function() {
        return isNaN(this.j.duration) ? -1 : this.j.duration
    };
    l.O = function() {
        if (this.Ra) {
            var a = Gu.get(this.Ra);
            Ju(a)
        }
        GC(this);
        O.prototype.O.call(this)
    };
    var GC = function(a) {
            null != a.D && (BB(a.D), a.D = null);
            null != a.P && a.P.W();
            Xu(a.l);
            EC(a)
        },
        EC = function(a) {
            a.Z = !1;
            a.F = !1;
            a.I = !1;
            a.K = !1;
            a.A = 0;
            a.o = null;
            a.L = null;
            We(a.G)
        };
    DC.prototype.pb = function(a) {
        this.dispatchEvent(a.type)
    };
    var IC = function(a) {
        if (!a.F) {
            a.F = !0;
            a.dispatchEvent("start");
            try {
                if (lj.isSelected() && v.customElements) {
                    var b = v.customElements.get("lima-video");
                    a.j instanceof b ? qB.j().report(153, {
                        limvid: "limastart"
                    }) : qB.j().report(153, {
                        limvid: "videostart"
                    })
                }
            } catch (c) {
                qB.j().report(153, {
                    limvid: "startfail"
                })
            }
            b = "function" === typeof a.j.getAttribute && null != a.j.getAttribute("playsinline");
            b = void 0 === b ? !1 : b;
            (fc || Au() || Bu(10)) && (b || (cB.j(), 1)) || (cB.j(), rb(ub(), "Xbox")) || (ec || hc ? 0 : (!dc || dc && zu(yu, 4)) && (An() ? (cB.j(), !1) : !fB())) ||
            !dc || dc && zu(yu, 3) || (ec || hc) && !Bu(4) || HC(a)
        }
    };
    l = DC.prototype;
    l.rf = function() {
        this.N = !0;
        this.K && FC(this);
        this.K = !1;
        JC(this)
    };
    l.sf = function() {
        this.Z || (this.Z = !0, this.dispatchEvent("loaded"))
    };
    l.Qd = function(a) {
        null != this.o ? this.L = a : (this.dispatchEvent("play"), ic || fc || Au() || uc || IC(this))
    };
    l.vf = function(a) {
        if (!this.F && (ic || fc || Au() || uc)) {
            if (0 >= this.getCurrentTime()) return;
            if (uc && this.j.ended && 1 == this.getDuration()) {
                this.ca(a);
                return
            }
            IC(this)
        }
        if (ic || rb(ub(), "Nintendo WiiU")) {
            if (1.5 < this.getCurrentTime() - this.A) {
                this.I = !0;
                this.j.currentTime = this.A;
                return
            }
            this.I = !1;
            this.getCurrentTime() > this.A && (this.A = this.getCurrentTime())
        }
        this.dispatchEvent("timeUpdate")
    };
    l.wf = function() {
        this.dispatchEvent("volumeChange")
    };
    l.uf = function() {
        if (this.F && ic && !this.Y && (2 > KC(this) || this.I)) {
            this.G = new Bk(250);
            this.l.R(this.G, "tick", this.Ja);
            this.G.start();
            var a = !0
        } else a = !1;
        a || this.o || this.dispatchEvent("pause")
    };
    l.qf = function() {
        var a = !0;
        if (ic || rb(ub(), "Nintendo WiiU")) a = this.A >= this.j.duration - 1.5;
        !this.I && a && this.dispatchEvent("end")
    };
    var HC = function(a) {
        a.dispatchEvent("beginFullscreen")
    };
    DC.prototype.ra = function() {
        this.dispatchEvent("endFullscreen")
    };
    DC.prototype.ca = function() {
        this.dispatchEvent("error")
    };
    DC.prototype.Ca = function() {
        this.dispatchEvent("click")
    };
    var JC = function(a) {
        a.j instanceof HTMLElement && (a.Ra = Ku(a.j, CC), a.Ra.then(function(b) {
            a.xa() || L(K.j(), "ps", b.width + "x" + b.height)
        }))
    };
    DC.prototype.ob = function() {
        var a = new F(this.j.offsetWidth, this.j.offsetHeight),
            b = sC(this.j);
        if (a.width != this.U.width || a.height != this.U.height) !this.X && b ? HC(this) : this.X && !b && this.ra(), this.U = a, this.X = b
    };
    DC.prototype.Ja = function() {
        if (!this.j.ended && this.j.paused && (ic || vc ? this.j.currentTime < this.j.duration : 1)) {
            var a = this.j.duration - this.j.currentTime,
                b = KC(this);
            0 < b && (2 <= b || 2 > a) && (We(this.G), FC(this))
        } else We(this.G)
    };
    var KC = function(a) {
        var b;
        a: {
            for (b = a.j.buffered.length - 1; 0 <= b;) {
                if (a.j.buffered.start(b) <= a.j.currentTime) {
                    b = a.j.buffered.end(b);
                    break a
                }
                b--
            }
            b = 0
        }
        return b - a.j.currentTime
    };
    DC.prototype.qb = function() {
        qB.j().report(139);
        HC(this)
    };
    var MC = function(a, b, c, d) {
        E.call(this);
        this.C = a;
        this.A = b;
        this.o = c;
        this.D = d;
        this.B = !1;
        a = new Tu(this);
        Ye(this, a);
        this.j = this.l = null;
        LC(this)
    };
    t(MC, E);
    var OC = function(a) {
            a.B = !0;
            NC(a)
        },
        LC = function(a) {
            bC(a.C, a.D).then(function(b) {
                return void PC(a, b)
            }).catch(function() {
                return void QC(a)
            })
        },
        NC = function(a) {
            a.l && a.B && og(a.l).postMessage({
                type: "innerBridgeIframeLoaded"
            }, "*")
        },
        PC = function(a, b) {
            a.l = b;
            a.j = new cC(b, a.o);
            a.j.R("error", function() {
                return void QC(a)
            });
            eC(a.j);
            NC(a)
        },
        QC = function(a) {
            Ey(a.A, "omid", "iframeFailed");
            a.W()
        };
    MC.prototype.O = function() {
        this.l && (lg(this.l), this.l = null);
        E.prototype.O.call(this)
    };
    var RC = function(a, b, c, d) {
        E.call(this);
        this.B = a;
        this.o = b;
        this.j = c;
        this.D = d;
        this.l = new Tu(this);
        Ye(this, this.l);
        this.l.R(this.B, d, this.C)
    };
    t(RC, E);
    var SC = function(a, b) {
        var c = b.oa;
        switch (b.messageType) {
            case "showVideo":
                c = a.o;
                null != c.l && c.l.show();
                break;
            case "hide":
                a.o.hide();
                break;
            case "resizeAndPositionVideo":
                a = a.o.j;
                c = new Wg(c.x, c.y, c.width, c.height);
                a.j.style.left = String(c.left) + "px";
                a.j.style.top = String(c.top) + "px";
                a.j.style.width = String(c.width) + "px";
                a.j.style.height = String(c.height) + "px";
                break;
            case "restoreSizeAndPositionVideo":
                c = a.o.j, c.j.style.width = "100%", c.j.style.height = "100%", c.j.style.left = "0", c.j.style.right = "0"
        }
    };
    RC.prototype.C = function(a) {
        var b = a.oa;
        switch (a.messageType) {
            case "activate":
                a = this.o;
                var c = this.j;
                a.j != c && a.l && a.B && a.o && (c.setVolume(a.j.getVolume()), c = a.j, a.j = a.o, a.o = c, c = a.l, a.l = a.B, a.B = c, a.B.hide(), null != (c = a.J.F) && (a = a.j.C.j, c.o = a, c.j && (c = c.j, c.j = a, dC(c, a))));
                break;
            case "startTracking":
                a = this.j;
                c = this.A;
                this.l.R(a, hf(tv), c);
                this.l.R(a, eB, c);
                a = this.j;
                GC(a);
                a.l.R(a.j, eB, a.pb);
                a.l.R(a.j, "ended", a.qf);
                a.l.R(a.j, "webkitbeginfullscreen", a.qb);
                a.l.R(a.j, "webkitendfullscreen", a.ra);
                a.l.R(a.j, "loadedmetadata",
                    a.rf);
                a.l.R(a.j, "pause", a.uf);
                a.l.R(a.j, "playing", a.Qd);
                a.l.R(a.j, "timeupdate", a.vf);
                a.l.R(a.j, "volumechange", a.wf);
                a.l.R(a.j, "error", a.ca);
                a.l.R(a.j, uc || ic && !Bu(8) ? "loadeddata" : "canplay", a.sf);
                a.D = new xB;
                a.l.R(a.D, "click", a.Ca);
                zB(a.D, a.j);
                a.P = new Bk(1E3);
                a.l.R(a.P, "tick", a.ob);
                a.P.start();
                break;
            case "stopTracking":
                a = this.j;
                c = this.A;
                this.l.kb(a, hf(tv), c);
                this.l.kb(a, eB, c);
                GC(this.j);
                break;
            case "exitFullscreen":
                a = this.j;
                (ec || hc) && a.j.webkitDisplayingFullscreen && a.j.webkitExitFullscreen();
                break;
            case "play":
                FC(this.j);
                break;
            case "pause":
                this.j.pause();
                break;
            case "load":
                a = this.j;
                c = b.videoUrl;
                var d = b.muxedMediaUrl,
                    e = b.muxedMimeType,
                    f = b.muxedAudioCodec,
                    g = b.muxedVideoCodec,
                    h = b.demuxedAudioUrl,
                    k = b.demuxedVideoUrl,
                    n = b.demuxedAudioMimeType,
                    m = b.demuxedVideoMimeType,
                    x = b.demuxedAudioCodec,
                    u = b.demuxedVideoCodec;
                b = b.mseCompatible;
                var y = null;
                k && h && b && m && n && u && x && (y = new gu({
                    Pf: k,
                    Ke: h,
                    videoItag: null,
                    audioItag: null,
                    Of: m,
                    Je: n,
                    Za: u,
                    Ta: x,
                    height: null,
                    width: null,
                    za: b,
                    Uh: null,
                    Lh: null
                }));
                h = null;
                d && e && g && f && (h = new hu({
                    mf: d,
                    itag: null,
                    mimeType: e,
                    Za: g,
                    Ta: f,
                    height: null,
                    width: null,
                    za: b,
                    Nh: null
                }));
                y ? a.load(c, y) : h ? a.load(c, h) : a.load(c, null);
                break;
            case "unload":
                a = this.j;
                EC(a);
                a.N = !1;
                "removeAttribute" in a.j ? a.j.removeAttribute("src") : a.j.src = "";
                a.j.load();
                break;
            case "setCurrentTime":
                this.j.j.currentTime = b.currentTime;
                break;
            case "setVolume":
                this.j.setVolume(b.volume)
        }
    };
    RC.prototype.A = function(a) {
        var b = {};
        switch (a.type) {
            case "autoplayDisallowed":
                a = "autoplayDisallowed";
                break;
            case "beginFullscreen":
                a = "fullscreen";
                break;
            case "endFullscreen":
                a = "exitFullscreen";
                break;
            case "click":
                a = "click";
                break;
            case "end":
                a = "end";
                break;
            case "error":
                a = "error";
                break;
            case "loaded":
                a = "loaded";
                break;
            case "mediaLoadTimeout":
                a = "mediaLoadTimeout";
                break;
            case "pause":
                a = "pause";
                b.ended = this.j.j.ended;
                break;
            case "play":
                a = "play";
                break;
            case "skip":
                a = "skip";
                break;
            case "start":
                a = "start";
                b.volume = this.j.getVolume();
                break;
            case "timeUpdate":
                a = "timeupdate";
                b.currentTime = this.j.getCurrentTime();
                b.duration = this.j.getDuration();
                break;
            case "volumeChange":
                a = "volumeChange";
                b.volume = this.j.getVolume();
                break;
            case "loadedmetadata":
                a = a.type;
                b.duration = this.j.getDuration();
                break;
            case "abort":
            case "canplay":
            case "canplaythrough":
            case "durationchange":
            case "emptied":
            case "loadstart":
            case "loadeddata":
            case "progress":
            case "ratechange":
            case "seeked":
            case "seeking":
            case "stalled":
            case "suspend":
            case "waiting":
                a = a.type;
                break;
            default:
                return
        }
        Ey(this.B,
            this.D, a, b)
    };
    var TC = function(a, b) {
        E.call(this);
        this.l = b;
        this.o = new RC(a, b, this.l.j, "videoDisplay1");
        Ye(this, this.o);
        this.j = null;
        var c = this.l.o;
        null != c && (this.j = new RC(a, b, c, "videoDisplay2"), Ye(this, this.j))
    };
    t(TC, E);
    var UC = function(a, b, c, d) {
        var e = Rg("IFRAME");
        e.id = b;
        e.name = b;
        e.width = String(c);
        e.height = String(d);
        e.allowTransparency = "true";
        e.scrolling = "no";
        e.marginWidth = "0";
        e.marginHeight = "0";
        e.frameBorder = "0";
        e.style.border = "0";
        e.style.verticalAlign = "bottom";
        e.src = "about:blank";
        e.setAttribute("role", "region");
        e.setAttribute("aria-label", "Advertisement");
        e.title = "3rd party ad content";
        e.tabIndex = 0;
        a.appendChild(e);
        return e
    };

    function VC(a) {
        return Nf(null === a ? "null" : void 0 === a ? "undefined" : a)
    }
    var WC = new ph,
        XC = new Map(WC.j.B);
    XC.set("style", {
        policyAction: 4
    });
    WC.j = new mh(WC.j.j, WC.j.o, WC.j.l, XC);
    var YC = new Map(WC.j.B);
    YC.set("class", {
        policyAction: 1
    });
    WC.j = new mh(WC.j.j, WC.j.o, WC.j.l, YC);
    var ZC = new Map(WC.j.B);
    ZC.set("id", {
        policyAction: 1
    });
    WC.j = new mh(WC.j.j, WC.j.o, WC.j.l, ZC);
    WC.build();

    function $C() {
        var a;
        var b = G();
        b = void 0 === b ? window : b;
        b = b.googletag;
        b = (null == b ? 0 : b.apiReady) ? b : void 0;
        return null == b ? void 0 : null == (a = b.companionAds) ? void 0 : a.call(b)
    }

    function aD(a) {
        var b = {};
        b.slotId = a.getSlotId().getId();
        var c = [];
        a = r(a.getSizes() || []);
        for (var d = a.next(); !d.done; d = a.next())
            if (d = d.value, "string" !== typeof d) {
                var e = {};
                c.push((e.adWidth = d.getWidth(), e.adHeight = d.getHeight(), e))
            } else "fluid" === d && (d = {}, c.push((d.fluidSize = !0, d)));
        return b.adSizes = c, b
    }

    function bD(a) {
        var b = $C();
        if (b && a && Array.isArray(a)) {
            var c = new Map(b.getSlots().map(function(u) {
                return [u.getSlotId().getId(), u]
            }));
            a = r(a);
            for (var d = a.next(); !d.done; d = a.next()) {
                var e = d.value,
                    f = c.get(e.slotId);
                if (f && !b.isSlotAPersistentRoadblock(f)) {
                    var g = e.adContent;
                    if (g && (d = cg(f.getSlotId().getDomId()))) {
                        d.style.display = "";
                        var h = e.adWidth,
                            k = e.adHeight;
                        e.fluidSize && (k = cl(d), h = k.width, k = k.height);
                        d.textContent = "";
                        if (e.friendlyIframeRendering) try {
                            var n = "google_companion_" + f.getSlotId().getId(),
                                m = UC(d,
                                    n, h, k),
                                x = m.contentWindow ? m.contentWindow.document : m.contentDocument;
                            ac && x.open("text/html", "replace");
                            Dg(x, VC(g));
                            x.close()
                        } catch (u) {} else Bg(d, VC(g)), d.style.width = h + "px", d.style.height = k + "px";
                        b.slotRenderEnded(f, h, k);
                        (e = e.onAdContentSet) && e(d)
                    }
                }
            }
        }
    };
    var cD = function(a, b, c, d, e, f) {
        Fy.call(this, a, b, c, d, e);
        this.j = f
    };
    t(cD, Fy);
    var dD = function(a, b) {
        O.call(this);
        this.A = a;
        this.o = b;
        this.j = {};
        this.l = new Tu(this);
        Ye(this, this.l);
        this.l.R(G(), "message", this.C)
    };
    t(dD, O);
    var eD = function(a, b) {
            var c = b.j;
            a.j.hasOwnProperty(c) && Ey(a.j[c], b.type, b.messageType, b.oa)
        },
        fD = function(a, b, c, d) {
            a.j.hasOwnProperty(b) || (c = new uB(b, c), a.l.R(c, a.A, function(e) {
                this.dispatchEvent(new cD(e.type, e.messageType, e.oa, e.sessionId, e.origin, b))
            }), c.j = d, c.connect(), a.j[b] = c)
        };
    dD.prototype.O = function() {
        for (var a in this.j) We(this.j[a]);
        O.prototype.O.call(this)
    };
    dD.prototype.C = function(a) {
        a = a.j;
        var b = vB(a.data);
        if (null != b) {
            var c = b.channel;
            if (this.o && !this.j.hasOwnProperty(c)) {
                var d = b.sid;
                fD(this, c, d, a.source);
                this.dispatchEvent(new cD(b.name, b.type, b.data || {}, d, a.origin, c))
            }
        }
    };

    function gD() {
        return !!La("googletag.cmd", G())
    }

    function hD() {
        var a = La("googletag.console", G());
        return null != a ? a : null
    }
    var iD = function() {
        Tu.call(this);
        this.o = new dD("gpt", !0);
        Ye(this, this.o);
        this.R(this.o, "gpt", this.C);
        this.j = null;
        gD() || G().top === G() || (this.j = new dD("gpt", !1), Ye(this, this.j), this.R(this.j, "gpt", this.A))
    };
    t(iD, Tu);
    iD.prototype.C = function(a) {
        var b = a.origin,
            c = "//imasdk.googleapis.com".match(sg);
        b = b.match(sg);
        if (c[3] == b[3] && c[4] == b[4])
            if (null != this.j) fD(this.j, a.j, a.sessionId, G().parent), null != this.j && eD(this.j, a);
            else if (c = a.oa, null != c && void 0 !== c.scope) {
            b = c.scope;
            c = c.args;
            var d;
            if ("proxy" == b) {
                var e = a.messageType;
                "isGptPresent" == e ? d = gD() : "isConsolePresent" == e && (d = null != hD())
            } else if (gD())
                if ("pubads" == b || "companionAds" == b) {
                    d = a.messageType;
                    var f = G().googletag;
                    if (null != f && null != f[b] && (b = f[b](), null != b && (d = b[d],
                            null != d))) try {
                        e = d.apply(b, c)
                    } catch (g) {}
                    d = e
                } else if ("console" == b) {
                if (e = hD(), null != e && (b = e[a.messageType], null != b)) try {
                    b.apply(e, c)
                } catch (g) {}
            } else null === b && (e = a.messageType, "googleGetCompanionAdSlots" == e ? (e = $C()) ? (e = e.getSlots().map(aD), d = e.length ? e : null) : d = null : ("googleSetCompanionAdContents" == e && bD(c[0]), d = null));
            void 0 !== d && (a.oa.returnValue = d, eD(this.o, a))
        }
    };
    iD.prototype.A = function(a) {
        eD(this.o, a)
    };
    var jD = function(a, b) {
        if (a.j) {
            var c = a.j;
            We(c.j[b]);
            delete c.j[b]
        }
        a.o && (a = a.o, We(a.j[b]), delete a.j[b])
    };
    var kD = ["AyzXKL8MdBHvOVVzOBruMH4ejTtc1ZYFY15XURvuVFNIaGRUMEWwUuOwPk/7RTLViwZhNSTz/my1X90KqvXn1wYAAAB4eyJvcmlnaW4iOiJodHRwczovL2ltYXNkay5nb29nbGVhcGlzLmNvbTo0NDMiLCJmZWF0dXJlIjoiUHJpdmFjeVNhbmRib3hBZHNBUElzIiwiZXhwaXJ5IjoxNjgwNjUyNzk5LCJpc1RoaXJkUGFydHkiOnRydWV9"];
    var lD = {
            issuerOrigin: "https://attestation.android.com",
            issuancePath: "/att/i",
            redemptionPath: "/att/r"
        },
        mD = {
            issuerOrigin: "https://pagead2.googlesyndication.com",
            issuancePath: "/dtt/i",
            redemptionPath: "/dtt/r",
            getStatePath: "/dtt/s"
        };
    var oD = function(a, b, c) {
        E.call(this);
        var d = this;
        this.l = a;
        this.j = [];
        b && nD() && this.j.push(lD);
        c && this.j.push(mD);
        if (document.hasTrustToken && !qz(vt)) {
            var e = new Map;
            this.j.forEach(function(f) {
                e.set(f.issuerOrigin, {
                    issuerOrigin: f.issuerOrigin,
                    state: d.l ? 1 : 12,
                    hasRedemptionRecord: !1
                })
            });
            window.goog_tt_state_map = window.goog_tt_state_map && window.goog_tt_state_map instanceof Map ? new Map([].concat(ha(e), ha(window.goog_tt_state_map))) : e;
            window.goog_tt_promise_map && window.goog_tt_promise_map instanceof Map || (window.goog_tt_promise_map =
                new Map)
        }
    };
    t(oD, E);
    var nD = function() {
            var a = void 0 === a ? window : a;
            a = a.navigator.userAgent;
            var b = /Chrome/.test(a);
            return /Android/.test(a) && b
        },
        pD = function(a, b, c) {
            var d, e = null == (d = window.goog_tt_state_map) ? void 0 : d.get(a);
            e && (e.state = b, void 0 != c && (e.hasRedemptionRecord = c))
        },
        qD = function() {
            var a = "" + lD.issuerOrigin + lD.redemptionPath,
                b = {
                    keepalive: !0,
                    trustToken: {
                        type: "token-redemption",
                        issuer: lD.issuerOrigin,
                        refreshPolicy: "none"
                    }
                };
            pD(lD.issuerOrigin, 2);
            return window.fetch(a, b).then(function(c) {
                if (!c.ok) throw Error(c.status + ": Network response was not ok!");
                pD(lD.issuerOrigin, 6, !0)
            }).catch(function(c) {
                c && "NoModificationAllowedError" === c.name ? pD(lD.issuerOrigin, 6, !0) : pD(lD.issuerOrigin, 5)
            })
        },
        rD = function() {
            var a = "" + lD.issuerOrigin + lD.issuancePath;
            pD(lD.issuerOrigin, 8);
            return window.fetch(a, {
                keepalive: !0,
                trustToken: {
                    type: "token-request"
                }
            }).then(function(b) {
                if (!b.ok) throw Error(b.status + ": Network response was not ok!");
                pD(lD.issuerOrigin, 10);
                return qD()
            }).catch(function(b) {
                if (b && "NoModificationAllowedError" === b.name) return pD(lD.issuerOrigin, 10), qD();
                pD(lD.issuerOrigin,
                    9)
            })
        },
        sD = function() {
            pD(lD.issuerOrigin, 13);
            return document.hasTrustToken(lD.issuerOrigin).then(function(a) {
                return a ? qD() : rD()
            })
        },
        tD = function() {
            pD(mD.issuerOrigin, 13);
            if (window.Promise) {
                var a = document.hasTrustToken(mD.issuerOrigin).then(function(e) {
                        return e
                    }).catch(function(e) {
                        return window.Promise.reject({
                            state: 19,
                            error: e
                        })
                    }),
                    b = "" + mD.issuerOrigin + mD.redemptionPath,
                    c = {
                        keepalive: !0,
                        trustToken: {
                            type: "token-redemption",
                            refreshPolicy: "none"
                        }
                    };
                pD(mD.issuerOrigin, 16);
                a = a.then(function(e) {
                    return window.fetch(b,
                        c).then(function(f) {
                        if (!f.ok) throw Error(f.status + ": Network response was not ok!");
                        pD(mD.issuerOrigin, 18, !0)
                    }).catch(function(f) {
                        if (f && "NoModificationAllowedError" === f.name) pD(mD.issuerOrigin, 18, !0);
                        else {
                            if (e) return window.Promise.reject({
                                state: 17,
                                error: f
                            });
                            pD(mD.issuerOrigin, 17)
                        }
                    })
                }).then(function() {
                    return document.hasTrustToken(mD.issuerOrigin).then(function(e) {
                        return e
                    }).catch(function(e) {
                        return window.Promise.reject({
                            state: 19,
                            error: e
                        })
                    })
                }).then(function(e) {
                    var f = "" + mD.issuerOrigin + mD.getStatePath;
                    pD(mD.issuerOrigin, 20);
                    return window.fetch(f + "?ht=" + e, {
                        trustToken: {
                            type: "send-redemption-record",
                            issuers: [mD.issuerOrigin]
                        }
                    }).then(function(g) {
                        if (!g.ok) throw Error(g.status + ": Network response was not ok!");
                        pD(mD.issuerOrigin, 22);
                        return g.text().then(function(h) {
                            return JSON.parse(h)
                        })
                    }).catch(function(g) {
                        return window.Promise.reject({
                            state: 21,
                            error: g
                        })
                    })
                });
                var d = Sg();
                return a.then(function(e) {
                    var f = "" + mD.issuerOrigin + mD.issuancePath;
                    return e && e.srqt && e.cs ? (pD(mD.issuerOrigin, 23), window.fetch(f + "?cs=" +
                        e.cs + "&correlator=" + d, {
                            keepalive: !0,
                            trustToken: {
                                type: "token-request"
                            }
                        }).then(function(g) {
                        if (!g.ok) throw Error(g.status + ": Network response was not ok!");
                        pD(mD.issuerOrigin, 25);
                        return e
                    }).catch(function(g) {
                        return window.Promise.reject({
                            state: 24,
                            error: g
                        })
                    })) : e
                }).then(function(e) {
                    if (e && e.srdt && e.cs) return pD(mD.issuerOrigin, 26), window.fetch(b + "?cs=" + e.cs + "&correlator=" + d, {
                        keepalive: !0,
                        trustToken: {
                            type: "token-redemption",
                            refreshPolicy: "refresh"
                        }
                    }).then(function(f) {
                        if (!f.ok) throw Error(f.status + ": Network response was not ok!");
                        pD(mD.issuerOrigin, 28, !0)
                    }).catch(function(f) {
                        return window.Promise.reject({
                            state: 27,
                            error: f
                        })
                    })
                }).then(function() {
                    pD(mD.issuerOrigin, 29)
                }).catch(function(e) {
                    if (e instanceof Object && e.hasOwnProperty("state") && e.hasOwnProperty("error"))
                        if ("number" === typeof e.state && e.error instanceof Error) {
                            pD(mD.issuerOrigin, e.state);
                            var f = rz(wt);
                            Math.random() <= f && jh({
                                state: e.state,
                                err: e.error.toString()
                            }, "dtt_err")
                        } else throw Error(e);
                    else throw e;
                })
            }
        },
        uD = function(a) {
            if (document.hasTrustToken && !qz(vt) && a.l) {
                var b =
                    window.goog_tt_promise_map;
                if (b && b instanceof Map) {
                    var c = [];
                    if (a.j.some(function(e) {
                            return e.issuerOrigin === lD.issuerOrigin
                        })) {
                        var d = b.get(lD.issuerOrigin);
                        d || (d = sD(), b.set(lD.issuerOrigin, d));
                        c.push(d)
                    }
                    a.j.some(function(e) {
                        return e.issuerOrigin === mD.issuerOrigin
                    }) && (a = b.get(mD.issuerOrigin), a || (a = tD(), b.set(mD.issuerOrigin, a)), c.push(a));
                    if (0 < c.length && window.Promise && window.Promise.all) return window.Promise.all(c)
                }
            }
        };
    var wD = function(a, b) {
            var c = Array.prototype.slice.call(arguments),
                d = c.shift();
            if ("undefined" == typeof d) throw Error("[goog.string.format] Template required");
            return d.replace(/%([0\- \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g, function(e, f, g, h, k, n, m, x) {
                if ("%" == n) return "%";
                var u = c.shift();
                if ("undefined" == typeof u) throw Error("[goog.string.format] Not enough arguments");
                arguments[0] = u;
                return vD[n].apply(null, arguments)
            })
        },
        vD = {
            s: function(a, b, c) {
                return isNaN(c) || "" == c || a.length >= Number(c) ? a : a = -1 < b.indexOf("-", 0) ?
                    a + Tf(" ", Number(c) - a.length) : Tf(" ", Number(c) - a.length) + a
            },
            f: function(a, b, c, d, e) {
                d = a.toString();
                isNaN(e) || "" == e || (d = parseFloat(a).toFixed(e));
                var f = 0 > Number(a) ? "-" : 0 <= b.indexOf("+") ? "+" : 0 <= b.indexOf(" ") ? " " : "";
                0 <= Number(a) && (d = f + d);
                if (isNaN(c) || d.length >= Number(c)) return d;
                d = isNaN(e) ? Math.abs(Number(a)).toString() : Math.abs(Number(a)).toFixed(e);
                a = Number(c) - d.length - f.length;
                return d = 0 <= b.indexOf("-", 0) ? f + d + Tf(" ", a) : f + Tf(0 <= b.indexOf("0", 0) ? "0" : " ", a) + d
            },
            d: function(a, b, c, d, e, f, g, h) {
                return vD.f(parseInt(a,
                    10), b, c, d, 0, f, g, h)
            }
        };
    vD.i = vD.d;
    vD.u = vD.d;

    function xD() {
        return ["autoplay", "trust-token-redemption", "attribution-reporting"].filter(function(a) {
            var b = document.featurePolicy;
            return void 0 !== b && "function" == typeof b.allowedFeatures && "object" == typeof b.allowedFeatures() && b.allowedFeatures().includes(a)
        }).join(";")
    }
    var zD = function(a, b) {
        O.call(this);
        this.o = new Tu(this);
        Ye(this, this.o);
        this.L = this.K = null;
        this.I = !1;
        this.D = "goog_" + Vf++;
        this.C = new Map;
        var c = this.D,
            d = (Ng() ? "https:" : "http:") + wD("//imasdk.googleapis.com/js/core/bridge3.549.0_%s.html", Vy.getLocale());
        a: {
            var e = window;
            try {
                do {
                    try {
                        if (0 == e.location.href.indexOf(d) || 0 == e.document.referrer.indexOf(d)) {
                            var f = !0;
                            break a
                        }
                    } catch (h) {}
                    e = e.parent
                } while (e != e.top)
            } catch (h) {}
            f = !1
        }
        f && (d += "?f=" + c);
        var g = void 0 === g ? window.document : g;
        f = J(pz).j(xt.flag, xt.defaultValue);
        Qg(f,
            g);
        g = {};
        qB.j().report(158, (g.aot = "ob", g.tte = !!document.hasTrustToken, g));
        g = window.document;
        g = void 0 === g ? window.document : g;
        Qg(kD, g);
        g = xD();
        c = kg("IFRAME", {
            src: d + "#" + c,
            allowFullscreen: !0,
            allow: g,
            id: c,
            style: "border:0; opacity:0; margin:0; padding:0; position:relative; color-scheme: light;"
        });
        this.o.Mb(c, "load", this.Z);
        a.appendChild(c);
        this.j = c;
        this.A = yD(this);
        this.G = b;
        this.l = null;
        this.N = new TC(this.A, this.G);
        Ye(this, this.N);
        this.G.j && this.o.R(this.A, "displayContainer", this.U);
        this.o.R(this.A, "mouse",
            this.X);
        this.o.R(this.A, "touch", this.Y);
        c = G();
        d = La("google.ima.gptProxyInstance", c);
        null != d ? c = d : (d = new iD, w("google.ima.gptProxyInstance", d, c), c = d);
        this.P = c;
        fB() || (this.F = new MC(a, this.A, b.j.C.j, this.D), Ye(this, this.F))
    };
    t(zD, O);
    var yD = function(a, b) {
        b = void 0 === b ? "*" : b;
        var c = a.C.get(b);
        null == c && (c = new uB(a.D, b), a.I && (c.j = og(a.j), c.connect()), a.C.set(b, c));
        return c
    };
    zD.prototype.O = function() {
        null !== this.l && (this.l.W(), this.l = null);
        this.C.forEach(function(a) {
            We(a)
        });
        this.C.clear();
        jD(this.P, this.D);
        lg(this.j);
        O.prototype.O.call(this)
    };
    zD.prototype.X = function(a) {
        var b = a.oa,
            c = Vk(this.j),
            d = document.createEvent("MouseEvent");
        d.initMouseEvent(a.messageType, !0, !0, window, b.detail, b.screenX, b.screenY, b.clientX + c.x, b.clientY + c.y, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, null);
        this.j.dispatchEvent(d)
    };
    var AD = function(a, b) {
        var c = Vk(a.j),
            d = !!("TouchEvent" in window && 0 < TouchEvent.length);
        b = b.map(function(e) {
            return d ? new Touch({
                identifier: e.identifier,
                target: a.j,
                clientX: e.clientX,
                clientY: e.clientY,
                screenX: e.screenX,
                screenY: e.screenY,
                pageX: e.pageX + c.x,
                pageY: e.pageY + c.y
            }) : document.createTouch(window, a.j, e.identifier, e.pageX + c.x, e.pageY + c.y, e.screenX, e.screenY)
        });
        return d ? b : document.createTouchList.apply(document, b)
    };
    zD.prototype.Y = function(a) {
        var b = a.oa,
            c = Vk(this.j);
        if ("TouchEvent" in window && 0 < TouchEvent.length) b = {
            bubbles: !0,
            cancelable: !0,
            view: window,
            detail: b.detail,
            ctrlKey: b.ctrlKey,
            altKey: b.altKey,
            shiftKey: b.shiftKey,
            metaKey: b.metaKey,
            touches: AD(this, b.touches),
            targetTouches: AD(this, b.targetTouches),
            changedTouches: AD(this, b.changedTouches)
        }, a = new TouchEvent(a.messageType, b), this.j.dispatchEvent(a);
        else {
            var d = document.createEvent("TouchEvent");
            d.initTouchEvent(a.messageType, !0, !0, window, b.detail, b.screenX, b.screenY,
                b.clientX + c.x, b.clientY + c.y, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, AD(this, b.touches), AD(this, b.targetTouches), AD(this, b.changedTouches), b.scale, b.rotation);
            this.j.dispatchEvent(d)
        }
    };
    zD.prototype.U = function(a) {
        switch (a.messageType) {
            case "showVideo":
                null == this.l ? (this.l = new xB, this.o.R(this.l, "click", this.ba)) : BB(this.l);
                zB(this.l, BD(this.G));
                break;
            case "hide":
                null !== this.l && (this.l.W(), this.l = null)
        }
        var b = this.N;
        SC(b.o, a);
        b.j && SC(b.j, a)
    };
    zD.prototype.ba = function() {
        Ey(this.A, "displayContainer", "videoClick")
    };
    zD.prototype.Z = function() {
        var a = this;
        this.K = zh();
        this.L = wh();
        this.C.forEach(function(c) {
            c.j = og(a.j);
            c.connect()
        });
        var b;
        null == (b = this.F) || OC(b);
        this.I = !0
    };
    var CD = function(a, b) {
        this.j = a[v.Symbol.iterator]();
        this.l = b
    };
    CD.prototype[Symbol.iterator] = function() {
        return this
    };
    CD.prototype.next = function() {
        var a = this.j.next();
        return {
            value: a.done ? void 0 : this.l.call(void 0, a.value),
            done: a.done
        }
    };
    var DD = function(a, b) {
        return new CD(a, b)
    };
    var HD = function(a) {
            if (a instanceof ED || a instanceof FD || a instanceof GD) return a;
            if ("function" == typeof a.next) return new ED(function() {
                return a
            });
            if ("function" == typeof a[Symbol.iterator]) return new ED(function() {
                return a[Symbol.iterator]()
            });
            if ("function" == typeof a.nb) return new ED(function() {
                return a.nb()
            });
            throw Error("Not an iterator or iterable.");
        },
        ED = function(a) {
            this.j = a
        };
    ED.prototype.nb = function() {
        return new FD(this.j())
    };
    ED.prototype[Symbol.iterator] = function() {
        return new GD(this.j())
    };
    ED.prototype.l = function() {
        return new GD(this.j())
    };
    var FD = function(a) {
        this.j = a
    };
    t(FD, Oo);
    FD.prototype.next = function() {
        return this.j.next()
    };
    FD.prototype[Symbol.iterator] = function() {
        return new GD(this.j)
    };
    FD.prototype.l = function() {
        return new GD(this.j)
    };
    var GD = function(a) {
        ED.call(this, function() {
            return a
        });
        this.o = a
    };
    t(GD, ED);
    GD.prototype.next = function() {
        return this.o.next()
    };
    var ID = function(a, b) {
        this.l = {};
        this.j = [];
        this.o = this.size = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2) throw Error("Uneven number of arguments");
            for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
        } else if (a)
            if (a instanceof ID)
                for (c = a.bc(), d = 0; d < c.length; d++) this.set(c[d], a.get(c[d]));
            else
                for (d in a) this.set(d, a[d])
    };
    l = ID.prototype;
    l.tb = function() {
        JD(this);
        for (var a = [], b = 0; b < this.j.length; b++) a.push(this.l[this.j[b]]);
        return a
    };
    l.bc = function() {
        JD(this);
        return this.j.concat()
    };
    l.has = function(a) {
        return KD(this.l, a)
    };
    l.isEmpty = function() {
        return 0 == this.size
    };
    l.clear = function() {
        this.l = {};
        this.o = this.size = this.j.length = 0
    };
    l.remove = function(a) {
        return this.delete(a)
    };
    l.delete = function(a) {
        return KD(this.l, a) ? (delete this.l[a], --this.size, this.o++, this.j.length > 2 * this.size && JD(this), !0) : !1
    };
    var JD = function(a) {
        if (a.size != a.j.length) {
            for (var b = 0, c = 0; b < a.j.length;) {
                var d = a.j[b];
                KD(a.l, d) && (a.j[c++] = d);
                b++
            }
            a.j.length = c
        }
        if (a.size != a.j.length) {
            var e = {};
            for (c = b = 0; b < a.j.length;) d = a.j[b], KD(e, d) || (a.j[c++] = d, e[d] = 1), b++;
            a.j.length = c
        }
    };
    l = ID.prototype;
    l.get = function(a, b) {
        return KD(this.l, a) ? this.l[a] : b
    };
    l.set = function(a, b) {
        KD(this.l, a) || (this.size += 1, this.j.push(a), this.o++);
        this.l[a] = b
    };
    l.forEach = function(a, b) {
        for (var c = this.bc(), d = 0; d < c.length; d++) {
            var e = c[d],
                f = this.get(e);
            a.call(b, f, e, this)
        }
    };
    l.keys = function() {
        return HD(this.nb(!0)).l()
    };
    l.values = function() {
        return HD(this.nb(!1)).l()
    };
    l.entries = function() {
        var a = this;
        return DD(this.keys(), function(b) {
            return [b, a.get(b)]
        })
    };
    l.nb = function(a) {
        JD(this);
        var b = 0,
            c = this.o,
            d = this,
            e = new Oo;
        e.next = function() {
            if (c != d.o) throw Error("The map has changed since the iterator was created");
            if (b >= d.j.length) return Po;
            var f = d.j[b++];
            return {
                value: a ? f : d.l[f],
                done: !1
            }
        };
        return e
    };
    var KD = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    var MD = function() {
        O.call(this);
        this.buffered = new LD;
        this.seekable = new LD;
        this.l = new Tu(this);
        Ye(this, this.l);
        this.src = this.o = "";
        this.A = !1;
        this.j = null;
        var a = Uy(Vy);
        if (a) {
            a: {
                if (lf(a.j, "videoElementFakeDuration") && (a = a.j.videoElementFakeDuration, "number" === typeof a)) break a;a = NaN
            }
            this.duration = a
        }
    };
    t(MD, O);
    var ND = function() {
        var a = ["video/mp4"],
            b = ["video/ogg"],
            c = new MD;
        c.canPlayType = function(d) {
            return a.includes(d) ? "probably" : b.includes(d) ? "maybe" : ""
        };
        c.width = 0;
        c.height = 0;
        c.offsetWidth = 0;
        c.offsetHeight = 0;
        return c
    };
    l = MD.prototype;
    l.pause = function() {
        this.autoplay = !1;
        this.paused || (null.stop(), this.paused = !0, this.dispatchEvent("timeupdate"), this.dispatchEvent("pause"))
    };
    l.load = function() {
        this.readyState = 0;
        this.paused = !0;
        this.seeking = !1;
        this.dispatchEvent("loadstart");
        var a;
        isNaN(this.duration) ? a = 10 + 20 * Math.random() : a = this.duration;
        this.setProperty("duration", a);
        a = this.seekable;
        a.j.push(new OD(this.duration));
        a.length = a.j.length;
        a = this.buffered;
        a.j.push(new OD(this.duration));
        a.length = a.j.length;
        this.dispatchEvent("loadedmetadata");
        0 < this.currentTime && this.dispatchEvent("timeupdate");
        this.dispatchEvent("loadeddata");
        this.dispatchEvent("canplay");
        this.dispatchEvent("canplaythrough");
        this.dispatchEvent("progress");
        this.playbackRate = this.defaultPlaybackRate
    };
    l.setProperty = function(a, b) {
        switch (a) {
            case "currentTime":
                a = Number(b);
                this.seeking = !0;
                this.dispatchEvent("seeking");
                this.seeking = !1;
                this.currentTime = a;
                this.dispatchEvent("seeked");
                a = Wa() - this.Qc;
                b = this.currentTime + a / 1E3;
                this.Qc += a;
                2 < this.readyState && (this.currentTime = Math.min(b, this.duration));
                this.dispatchEvent("timeupdate");
                this.currentTime == this.duration && (this.ended = this.paused = !0, null.stop(), this.dispatchEvent("ended"));
                break;
            case "duration":
                this.duration = Number(b);
                this.dispatchEvent("durationchange");
                break;
            case "volume":
                this.volume = Number(b);
                this.dispatchEvent("volumechange");
                break;
            default:
                throw "Property setter not implemented";
        }
    };
    l.setAttribute = function(a, b) {
        null != a && PD.set(a, b)
    };
    l.getAttribute = function(a) {
        return PD.get(a)
    };
    l.qe = function(a) {
        var b = null,
            c = null;
        switch (a.type) {
            case "loadeddata":
                b = "Loaded";
                break;
            case "playing":
                b = "Playing";
                c = "#00f";
                break;
            case "pause":
                b = "Paused";
                break;
            case "ended":
                b = "Ended", c = "#000"
        }
        b && this.xc && (this.xc.innerText = b);
        c && this.Fb && (this.Fb.style.backgroundColor = c)
    };
    var PD = new ID,
        OD = function(a) {
            this.startTime = 0;
            this.endTime = a
        },
        LD = function() {
            this.length = 0;
            this.j = []
        };
    LD.prototype.start = function(a) {
        return this.j[a].startTime
    };
    LD.prototype.end = function(a) {
        return this.j[a].endTime
    };
    l = MD.prototype;
    l.readyState = 0;
    l.seeking = !1;
    l.currentTime = 0;
    l.initialTime = void 0;
    l.duration = NaN;
    l.paused = !0;
    l.ended = !1;
    l.autoplay = !1;
    l.loop = !1;
    l.volume = 1;
    l.muted = !1;
    Object.defineProperty(MD.prototype, "src", {
        get: function() {
            return MD.prototype.o
        },
        set: function(a) {
            var b = MD.prototype;
            b.A && null != b.j ? (b.j.reject(), b.j = null) : b.o = a
        }
    });
    l = MD.prototype;
    l.currentSrc = "";
    l.defaultPlaybackRate = 1;
    l.playbackRate = 0;
    l.Qc = 0;
    l.Fb = null;
    l.xc = null;
    var SD = function(a, b) {
        E.call(this);
        this.B = a;
        this.o = this.j = null;
        this.l = QD();
        RD(this, b);
        Fx(function() {
            L(K.j(), "haob", "1")
        })
    };
    t(SD, E);
    SD.prototype.initialize = function() {
        this.l && this.l.load()
    };
    SD.prototype.O = function() {
        lg(this.j);
        E.prototype.O.call(this)
    };
    var RD = function(a, b) {
            a.j = kg("DIV", {
                style: "display:none;"
            });
            a.B.appendChild(a.j);
            a.j.appendChild(a.l);
            b && (a.o = kg("DIV", {
                style: "position:absolute;width:100%;height:100%;left:0px;top:0px"
            }), a.j.appendChild(a.o))
        },
        QD = function() {
            var a = Uy(Vy);
            if (Ry(a, "useVideoElementFake")) {
                a = ND();
                var b = kg("DIV", {
                    style: "position:absolute;width:100%;height:100%;top:0px;left:0px;"
                });
                Object.assign(b, a);
                a.Fb = kg("DIV", {
                    style: "position:absolute;width:100%;height:100%;top:0px;left:0px;background-color:#000"
                });
                a.xc = kg("P", {
                    style: "position:absolute;top:25%;margin-left:10px;font-size:24px;color:#fff;"
                });
                a.Fb.appendChild(a.xc);
                b.appendChild(a.Fb);
                a.l.R(a, ["loadeddata", "playing", "pause", "ended"], a.qe);
                a = b
            } else {
                a = !1;
                try {
                    -1 != window.location.search.indexOf("goog_limavideo=true") && (a = !0)
                } catch (c) {}
                v.customElements ? a ? b = !0 : (lj.isSelected() && qB.j().report(153, {
                    limvid: "vw"
                }), b = fj.isSelected() || lj.isSelected() || dj.isSelected() || ej.isSelected() ? !0 : !1) : b = !1;
                if (b) {
                    a && console.log("force lima video in wrapper");
                    a = null;
                    try {
                        a = new Rx
                    } catch (c) {
                        a = kg("lima-video"), lj.isSelected() && qB.j().report(153, {
                            limvid: "firefail"
                        })
                    }
                    a.style.backgroundColor =
                        "#000";
                    a.style.height = "100%";
                    a.style.width = "100%";
                    a.style.position = "absolute";
                    a.style.left = "0";
                    a.style.top = "0"
                } else a = kg("VIDEO", {
                    style: "background-color:#000;position:absolute;width:100%;height:100%;left:0;top:0;",
                    title: sy("Advertisement").toString()
                })
            }
            a.setAttribute("webkit-playsinline", !0);
            a.setAttribute("playsinline", !0);
            return a
        };
    SD.prototype.show = function() {
        var a = this.j;
        null != a && (a.style.display = "block")
    };
    SD.prototype.hide = function() {
        var a = this.j;
        null != a && (a.style.display = "none")
    };
    var VD = function(a, b, c) {
        var d = a && a.getRootNode ? a.getRootNode({
            composed: !0
        }) : a;
        if (null == a || !ng(ag(d), d)) throw oz(nz, null, "containerElement", "element");
        this.C = b;
        this.Z = hB(this.C || null);
        this.Y = Cu(this.C || null);
        this.X = String(Math.floor(1E9 * Math.random()));
        this.L = !1;
        this.G = a;
        this.U = null != b;
        Vy.j = 2;
        this.F = TD(b ? b : null);
        d = kg("DIV", {
            style: "position:absolute"
        });
        a.insertBefore(d, a.firstChild);
        this.A = d;
        this.l = null;
        UD(this) && b ? a = new DC(b) : (this.l = new SD(this.A, !0), a = new DC(this.l.l));
        this.j = a;
        this.o = this.B = null;
        if (a = this.l && Vy.l) a = !(UD(this) || ec || hc || Bn() || dc && (!dc || !zu(yu, 4)));
        a && (this.B = new SD(this.A, !0), this.o = new DC(this.B.l));
        this.D = c || null;
        this.P = null != this.D;
        UD(this) && b ? "function" !== typeof b.getBoundingClientRect ? (c = this.A, Vy.B = c) : c = b : c = this.A;
        this.M = c;
        this.J = new zD(this.A, this);
        this.N = new F(0, 0);
        this.I = "";
        b && (b = Nt(b.src || b.currentSrc), 200 > b.toString().length ? this.I = b.toString() : 200 > b.o.length && (this.I = b.o));
        this.K = new Map;
        this.K.set("videoDisplay1", this.j);
        this.o && this.K.set("videoDisplay2", this.o)
    };
    VD.prototype.initialize = function() {
        this.L = !0;
        null != this.l && this.l.initialize();
        null != this.B && this.B.initialize()
    };
    VD.prototype.isInitialized = function() {
        return this.L
    };
    VD.prototype.destroy = function() {
        var a = this;
        this.C = null;
        We(this.l);
        We(this.B);
        We(this.J);
        this.j.Sb(function() {
            return We(a.j)
        });
        null != this.o && this.o.Sb(function() {
            return We(a.o)
        });
        lg(this.A)
    };
    VD.prototype.hide = function() {
        null != this.l && this.l.hide()
    };
    var BD = function(a) {
            return a.P && a.D ? a.D : null != a.l ? a.l.o : null
        },
        UD = function(a) {
            return gB(a.F) && a.U
        },
        TD = function(a) {
            return null != a && "function" === typeof a.getAttribute && null != a.getAttribute("playsinline") ? !0 : !1
        };
    VD.prototype.destroy = VD.prototype.destroy;
    VD.prototype.initialize = VD.prototype.initialize;
    var WD = function(a) {
        var b = Error.call(this);
        this.message = b.message;
        "stack" in b && (this.stack = b.stack);
        this.j = a
    };
    t(WD, Error);
    l = WD.prototype;
    l.getInnerError = function() {
        var a = this.j.innerError;
        return a instanceof Object ? new WD(a) : null != a ? Error(a) : null
    };
    l.getMessage = function() {
        return this.j.errorMessage
    };
    l.getErrorCode = function() {
        return this.j.errorCode
    };
    l.getVastErrorCode = function() {
        var a = this.getErrorCode();
        return 1E3 > a ? a : 900
    };
    l.getType = function() {
        return this.j.type
    };
    l.toString = function() {
        return "AdError " + this.getErrorCode() + ": " + this.getMessage() + (null != this.getInnerError() ? " Caused by: " + this.getInnerError() : "")
    };
    WD.prototype.getType = WD.prototype.getType;
    WD.prototype.getVastErrorCode = WD.prototype.getVastErrorCode;
    WD.prototype.getErrorCode = WD.prototype.getErrorCode;
    WD.prototype.getMessage = WD.prototype.getMessage;
    WD.prototype.getInnerError = WD.prototype.getInnerError;
    var XD = {
        AD_LOAD: "adLoadError",
        AD_PLAY: "adPlayError"
    };
    w("module$contents$ima$AdError_AdError.Type", XD);
    var YD = function(a, b) {
        b = void 0 === b ? null : b;
        wj.call(this, "adError");
        this.j = a;
        this.o = b
    };
    t(YD, wj);
    YD.prototype.getError = function() {
        return this.j
    };
    YD.prototype.getUserRequestContext = function() {
        return this.o
    };
    YD.prototype.getUserRequestContext = YD.prototype.getUserRequestContext;
    YD.prototype.getError = YD.prototype.getError;
    var ZD = {
        AD_ERROR: "adError"
    };
    w("module$contents$ima$AdErrorEvent_AdErrorEvent.Type", ZD);
    var $D = function(a, b, c) {
        b = void 0 === b ? null : b;
        c = void 0 === c ? null : c;
        wj.call(this, a);
        this.j = b;
        this.B = c
    };
    t($D, wj);
    $D.prototype.getAd = function() {
        return this.j
    };
    $D.prototype.getAdData = function() {
        return this.B
    };
    $D.prototype.getAdData = $D.prototype.getAdData;
    $D.prototype.getAd = $D.prototype.getAd;
    var aE = {
        AD_CAN_PLAY: "adCanPlay",
        Vf: "adStarted",
        CONTENT_PAUSE_REQUESTED: "contentPauseRequested",
        CONTENT_RESUME_REQUESTED: "contentResumeRequested",
        CLICK: "click",
        VIDEO_CLICKED: "videoClicked",
        VIDEO_ICON_CLICKED: "videoIconClicked",
        od: "engagedView",
        EXPANDED_CHANGED: "expandedChanged",
        STARTED: "start",
        AD_PROGRESS: "adProgress",
        AD_BUFFERING: "adBuffering",
        IMPRESSION: "impression",
        ud: "measurable_impression",
        VIEWABLE_IMPRESSION: "viewable_impression",
        pd: "fully_viewable_audible_half_duration_impression",
        ue: "overlay_resize",
        we: "overlay_unmeasurable_impression",
        xe: "overlay_unviewable_impression",
        ze: "overlay_viewable_immediate_impression",
        ye: "overlay_viewable_end_of_session_impression",
        og: "externalActivityEvent",
        PAUSED: "pause",
        RESUMED: "resume",
        FIRST_QUARTILE: "firstQuartile",
        MIDPOINT: "midpoint",
        THIRD_QUARTILE: "thirdQuartile",
        COMPLETE: "complete",
        DURATION_CHANGE: "durationChange",
        USER_CLOSE: "userClose",
        Dh: "userRecall",
        ih: "prefetched",
        LOADED: "loaded",
        ALL_ADS_COMPLETED: "allAdsCompleted",
        SKIPPED: "skip",
        De: "skipShown",
        LINEAR_CHANGED: "linearChanged",
        SKIPPABLE_STATE_CHANGED: "skippableStateChanged",
        AD_METADATA: "adMetadata",
        Uf: "adBreakFetchError",
        AD_BREAK_READY: "adBreakReady",
        LOG: "log",
        VOLUME_CHANGED: "volumeChange",
        VOLUME_MUTED: "mute",
        INTERACTION: "interaction",
        cg: "companionBackfill",
        Ah: "trackingUrlPinged",
        Eh: "video_card_endcap_collapse",
        Fh: "video_card_endcap_dismiss",
        Gh: "video_card_endcap_impression",
        fg: "companionInitialized",
        eg: "companionImpression",
        dg: "companionClick",
        Vg: "mediaUrlPinged",
        re: "loadStart",
        Xg: "navigationRequested"
    };
    w("module$contents$ima$AdEvent_AdEvent.Type", aE);
    var bE = function(a, b) {
        b = void 0 === b ? null : b;
        $D.call(this, "adMetadata", a);
        this.o = b
    };
    t(bE, $D);
    bE.prototype.Se = function() {
        return this.o
    };
    bE.prototype.getAdCuePoints = bE.prototype.Se;
    var cE = function(a) {
        this.adBreakDuration = a.adBreakDuration;
        this.adPosition = a.adPosition;
        this.currentTime = a.currentTime;
        this.duration = a.duration;
        this.totalAds = a.totalAds
    };
    var dE = function(a, b) {
        O.call(this);
        this.o = a;
        this.C = b;
        this.l = this.o.currentTime;
        this.j = new Bk(250);
        Ye(this, this.j);
        this.A = new Tu(this);
        Ye(this, this.A);
        Vu(this.A, this.j, "tick", this.D, !1, this)
    };
    t(dE, O);
    dE.prototype.fb = function() {
        return this.l
    };
    dE.prototype.start = function() {
        eE(this);
        this.j.start()
    };
    dE.prototype.stop = function() {
        this.j.stop()
    };
    dE.prototype.D = function() {
        var a = this.o.currentTime;
        a != this.fb() && (this.l = a, eE(this))
    };
    var eE = function(a) {
        var b = {};
        b.currentTime = a.fb();
        Ey(a.C, "contentTimeUpdate", "contentTimeUpdate", b)
    };
    var fE = {
            rgb: !0,
            rgba: !0,
            alpha: !0,
            rect: !0,
            image: !0,
            "linear-gradient": !0,
            "radial-gradient": !0,
            "repeating-linear-gradient": !0,
            "repeating-radial-gradient": !0,
            "cubic-bezier": !0,
            matrix: !0,
            perspective: !0,
            rotate: !0,
            rotate3d: !0,
            rotatex: !0,
            rotatey: !0,
            steps: !0,
            rotatez: !0,
            scale: !0,
            scale3d: !0,
            scalex: !0,
            scaley: !0,
            scalez: !0,
            skew: !0,
            skewx: !0,
            skewy: !0,
            translate: !0,
            translate3d: !0,
            translatex: !0,
            translatey: !0,
            translatez: !0
        },
        gE = function(a) {
            a = gb(a);
            if ("" == a) return null;
            var b = String(a.slice(0, 4)).toLowerCase();
            if (0 == ("url(" <
                    b ? -1 : "url(" == b ? 0 : 1)) return null;
            if (0 < a.indexOf("(")) {
                if (/"|'/.test(a)) return null;
                b = /([\-\w]+)\(/g;
                for (var c; c = b.exec(a);)
                    if (!(c[1].toLowerCase() in fE)) return null
            }
            return a
        };

    function hE(a, b) {
        a = v[a];
        return a && a.prototype ? (b = Object.getOwnPropertyDescriptor(a.prototype, b)) && b.get || null : null
    }

    function iE(a) {
        var b = v.CSSStyleDeclaration;
        return b && b.prototype && b.prototype[a] || null
    }
    hE("Element", "attributes") || hE("Node", "attributes");
    hE("Element", "innerHTML") || hE("HTMLElement", "innerHTML");
    hE("Node", "nodeName");
    hE("Node", "nodeType");
    hE("Node", "parentNode");
    hE("Node", "childNodes");
    hE("HTMLElement", "style") || hE("Element", "style");
    hE("HTMLStyleElement", "sheet");
    var jE = iE("getPropertyValue"),
        kE = iE("setProperty");
    hE("Element", "namespaceURI") || hE("Node", "namespaceURI");

    function lE(a, b, c, d) {
        if (a) return a.apply(b, d);
        if (Zb && 10 > document.documentMode) {
            if (!b[c].call) throw Error("IE Clobbering detected");
        } else if ("function" != typeof b[c]) throw Error("Clobbering detected");
        return b[c].apply(b, d)
    };
    var mE = {
            "-webkit-border-horizontal-spacing": !0,
            "-webkit-border-vertical-spacing": !0
        },
        oE = function(a) {
            if (!a) return Jf;
            var b = document.createElement("div").style;
            nE(a).forEach(function(c) {
                var d = bc && c in mE ? c : c.replace(/^-(?:apple|css|epub|khtml|moz|mso?|o|rim|wap|webkit|xv)-(?=[a-z])/i, "");
                0 != d.lastIndexOf("--", 0) && 0 != d.lastIndexOf("var", 0) && (c = lE(jE, a, a.getPropertyValue ? "getPropertyValue" : "getAttribute", [c]) || "", c = gE(c), null != c && lE(kE, b, b.setProperty ? "setProperty" : "setAttribute", [d, c]))
            });
            return new If(b.cssText ||
                "", Hf)
        },
        nE = function(a) {
            Ma(a) ? a = Pb(a) : (a = jf(a), Lb(a, "cssText"));
            return a
        };
    var pE = function(a, b, c) {
        O.call(this);
        this.l = a;
        this.j = null;
        this.I = "";
        this.K = Jf;
        this.L = 0;
        this.D = this.o = null;
        this.A = b;
        this.C = null;
        this.F = "";
        this.G = c
    };
    t(pE, O);
    pE.prototype.init = function(a) {
        this.F = a;
        a = "about:blank";
        Zb && (a = "");
        this.o = kg("IFRAME", {
            src: a,
            allowtransparency: !0,
            background: "transparent"
        });
        Qk(this.o, {
            display: "none",
            width: "0",
            height: "0"
        });
        a = this.l.G;
        a.appendChild(this.o);
        a = a.ownerDocument;
        a = a.defaultView || a.parentWindow;
        null == this.C && (this.C = new Tu(this));
        this.C.R(a, "message", this.N);
        a = '<body><script src="//imasdk.googleapis.com/js/sdkloader/loader.js">\x3c/script><script>loader = new VPAIDLoader(false, "' + (this.F + '");\x3c/script></body>');
        if (vc ||
            tc || $b) {
            var b = this.o.contentWindow;
            b && ZB(b.document, a)
        } else $B(this.o, a)
    };
    pE.prototype.N = function(a) {
        try {
            var b = a.j.data;
            try {
                var c = JSON.parse(b)
            } catch (X) {
                return
            }
            var d = c.session;
            if (null != d && this.F == d) switch (c.type) {
                case "friendlyReady":
                    var e = qE(this);
                    if (null != e) {
                        this.j = e;
                        this.I = e.currentSrc;
                        var f = e.style.cssText;
                        if (Zb && 10 > document.documentMode) var g = Jf;
                        else {
                            var h = document;
                            "function" === typeof HTMLTemplateElement && (h = ig(document, "TEMPLATE").content.ownerDocument);
                            var k = h.implementation.createHTMLDocument("").createElement("DIV");
                            k.style.cssText = f;
                            g = oE(k.style)
                        }
                        this.K = g;
                        this.L =
                            e.currentTime
                    } else {
                        var n = this.l.G,
                            m = this.l.N;
                        var x = "border: 0; margin: 0; padding: 0; position: absolute; width:" + (m.width + "px; ");
                        x += "height:" + m.height + "px;";
                        this.j = kg("VIDEO", {
                            style: x,
                            autoplay: !0
                        });
                        n.appendChild(this.j)
                    }
                    var u = this.l.G;
                    e = "border: 0; margin: 0; padding: 0;position: absolute; ";
                    var y = Zk(this.j);
                    e += "width:" + y.width + "px; ";
                    e += "height:" + y.height + "px;";
                    this.D = kg("DIV", {
                        style: e
                    });
                    u.appendChild(this.D);
                    try {
                        this.o.contentWindow.loader.initFriendly(this.j, this.D)
                    } catch (X) {
                        rE(this)
                    }
                    Ey(this.A,
                        "vpaid", "", b);
                    break;
                case "becameLinear":
                    this.j && !rg() && !qg() && Qk(this.j, {
                        visibility: "visible"
                    });
                    Ey(this.A, "vpaid", "", b);
                    break;
                case "becameNonlinear":
                    sE(this);
                    Ey(this.A, "vpaid", "", b);
                    break;
                case "startAd":
                    u = {};
                    if (this.j) {
                        h = this.j.paused;
                        var A = 0 < this.j.currentTime;
                        u.apl = A && !h ? "1" : "0";
                        u.ip = h ? "1" : "0";
                        u.iavp = A ? "1" : "0"
                    } else u.apl = "n";
                    qB.j().report(99, u);
                    Ey(this.A, "vpaid", "", b);
                    if (null != qE(this)) {
                        var N = this.l;
                        null != N.l && N.l.show()
                    }
                    break;
                default:
                    Ey(this.A, "vpaid", "", b)
            }
        } catch (X) {
            rE(this)
        }
    };
    var rE = function(a) {
            var b = {
                type: "error"
            };
            b.session = a.F;
            a = JSON.stringify(b);
            window.postMessage(a, "*")
        },
        qE = function(a) {
            return ("videoDisplayUnknown" == a.G ? a.l.j : a.l.K.get(a.G)).C.j
        },
        sE = function(a) {
            a.j && !rg() && !qg() && Qk(a.j, {
                visibility: "hidden"
            })
        };
    pE.prototype.O = function() {
        E.prototype.O.call(this);
        We(this.C);
        this.C = null;
        lg(this.D);
        this.D = null;
        lg(this.o);
        this.o = null;
        var a = qE(this);
        if (null != a) {
            var b = this.K;
            a.style.cssText = b instanceof If && b.constructor === If ? b.j : "type_error:SafeStyle";
            rg() || qg() ? (a.src = this.I, a.currentTime = this.L) : (a.removeAttribute("src"), this.l.hide())
        } else lg(this.j), this.j = null
    };
    var tE = function(a, b) {
        E.call(this);
        this.l = a;
        this.o = b;
        this.j = new Map
    };
    t(tE, E);
    var uE = function(a, b) {
        try {
            var c = b.oa,
                d = c.session;
            switch (c.vpaidEventType) {
                case "createFriendlyIframe":
                    b = "videoDisplayUnknown";
                    c.videoDisplayName && (b = c.videoDisplayName);
                    var e = c.session,
                        f = new pE(a.l, a.o, b);
                    a.j.set(e, f);
                    f.init(e);
                    break;
                case "vpaidNonLinear":
                    var g = a.j.get(d);
                    g && sE(g);
                    break;
                case "destroyFriendlyIframe":
                    var h = a.j.get(d);
                    h && (h.W(), a.j.delete(d))
            }
        } catch (k) {
            qB.j().report(125, {
                msg: k.message
            })
        }
    };
    tE.prototype.O = function() {
        this.j.forEach(function(a) {
            return a.W()
        })
    };
    var vE = function(a) {
        this.j = a || {
            cookie: ""
        }
    };
    l = vE.prototype;
    l.isEnabled = function() {
        if (!v.navigator.cookieEnabled) return !1;
        if (!this.isEmpty()) return !0;
        this.set("TESTCOOKIESENABLED", "1", {
            Sc: 60
        });
        if ("1" !== this.get("TESTCOOKIESENABLED")) return !1;
        this.remove("TESTCOOKIESENABLED");
        return !0
    };
    l.set = function(a, b, c) {
        var d = !1;
        if ("object" === typeof c) {
            var e = c.Sh;
            d = c.Bf || !1;
            var f = c.domain || void 0;
            var g = c.path || void 0;
            var h = c.Sc
        }
        if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');
        if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"');
        void 0 === h && (h = -1);
        this.j.cookie = a + "=" + b + (f ? ";domain=" + f : "") + (g ? ";path=" + g : "") + (0 > h ? "" : 0 == h ? ";expires=" + (new Date(1970, 1, 1)).toUTCString() : ";expires=" + (new Date(Date.now() + 1E3 * h)).toUTCString()) + (d ? ";secure" : "") + (null != e ? ";samesite=" + e : "")
    };
    l.get = function(a, b) {
        for (var c = a + "=", d = (this.j.cookie || "").split(";"), e = 0, f; e < d.length; e++) {
            f = gb(d[e]);
            if (0 == f.lastIndexOf(c, 0)) return f.slice(c.length);
            if (f == a) return ""
        }
        return b
    };
    l.remove = function(a, b, c) {
        var d = void 0 !== this.get(a);
        this.set(a, "", {
            Sc: 0,
            path: b,
            domain: c
        });
        return d
    };
    l.bc = function() {
        return wE(this).keys
    };
    l.tb = function() {
        return wE(this).values
    };
    l.isEmpty = function() {
        return !this.j.cookie
    };
    l.clear = function() {
        for (var a = wE(this).keys, b = a.length - 1; 0 <= b; b--) this.remove(a[b])
    };
    var wE = function(a) {
        a = (a.j.cookie || "").split(";");
        for (var b = [], c = [], d, e, f = 0; f < a.length; f++) e = gb(a[f]), d = e.indexOf("="), -1 == d ? (b.push(""), c.push(e)) : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
        return {
            keys: b,
            values: c
        }
    };

    function xE(a, b, c) {
        b = nd(b, 5) && "null" !== c.origin ? c.document.cookie : null;
        return null === b ? null : (new vE({
            cookie: b
        })).get(a) || ""
    };
    var yE = function() {
        this.j = window;
        this.l = 0
    };
    yE.prototype.isSupported = function(a) {
        if (0 === this.l) {
            if (a && xE("__gads", a, this.j)) a = !0;
            else {
                var b = this.j;
                nd(a, 5) && "null" !== b.origin && (new vE(b.document)).set("GoogleAdServingTest", "Good", void 0);
                if (b = "Good" === xE("GoogleAdServingTest", a, this.j)) {
                    var c = this.j;
                    nd(a, 5) && "null" !== c.origin && (new vE(c.document)).remove("GoogleAdServingTest", void 0, void 0)
                }
                a = b
            }
            this.l = a ? 2 : 1
        }
        return 2 === this.l
    };
    var zE = function(a, b, c, d) {
            if (d) {
                var e = {
                    Sc: B(c, 2) - Date.now() / 1E3,
                    path: B(c, 3),
                    domain: B(c, 4),
                    Bf: !1
                };
                a = a.j;
                nd(d, 5) && "null" !== a.origin && (new vE(a.document)).set(b, B(c, 1), e)
            }
        },
        AE = function(a, b, c) {
            if (c && xE(b, c, a.j)) {
                var d = a.j.location.hostname;
                if ("localhost" === d) d = ["localhost"];
                else if (d = d.split("."), 2 > d.length) d = [];
                else {
                    for (var e = [], f = 0; f < d.length - 1; ++f) e.push(d.slice(f).join("."));
                    d = e
                }
                d = r(d);
                for (e = d.next(); !e.done; e = d.next()) f = a.j, nd(c, 5) && "null" !== f.origin && (new vE(f.document)).remove(b, "/", e.value)
            }
        };
    var BE = function() {
        this.j = [];
        this.l = []
    };
    BE.prototype.isEmpty = function() {
        return 0 === this.j.length && 0 === this.l.length
    };
    BE.prototype.clear = function() {
        this.j = [];
        this.l = []
    };
    BE.prototype.remove = function(a) {
        var b = this.j;
        b: {
            var c = b.length - 1;0 > c && (c = Math.max(0, b.length + c));
            if ("string" === typeof b) c = "string" !== typeof a || 1 != a.length ? -1 : b.lastIndexOf(a, c);
            else {
                for (; 0 <= c; c--)
                    if (c in b && b[c] === a) break b;
                c = -1
            }
        }
        0 <= c ? (Mb(b, c), b = !0) : b = !1;
        return b || Lb(this.l, a)
    };
    BE.prototype.tb = function() {
        for (var a = [], b = this.j.length - 1; 0 <= b; --b) a.push(this.j[b]);
        var c = this.l.length;
        for (b = 0; b < c; ++b) a.push(this.l[b]);
        return a
    };
    var Z = function(a, b, c, d, e, f, g, h) {
        O.call(this);
        var k = this;
        this.I = a;
        this.j = b;
        this.L = c;
        this.qb = e;
        this.A = new kC;
        this.D = g;
        this.ob = h;
        this.N = !1;
        this.U = 1;
        this.pb = d;
        this.ca = -1;
        this.o = this.l = null;
        this.G = new dE({
            currentTime: 0
        }, this.D);
        this.F = new BE;
        this.ra = this.Y = !1;
        this.Z = new Map;
        this.ba = this.Ca = !1;
        this.Ja = new tE(b, g);
        Ye(this, this.Ja);
        this.K = f && null != this.j.D;
        this.P = function() {
            var n = k.j.j,
                m = n.getCurrentTime();
            n = n.getDuration();
            return {
                currentTime: m,
                duration: n,
                isPlaying: !0,
                volume: k.U
            }
        };
        this.X = new Tu(this);
        this.X.R(this.D,
            "adsManager", this.Zb)
    };
    t(Z, O);
    Z.prototype.Zb = function(a) {
        var b = this,
            c = a.messageType,
            d = a.oa;
        switch (c) {
            case "error":
                CE(this);
                DE(this, d);
                break;
            case "contentPauseRequested":
                qB.j().report(130);
                EE(this);
                FE(this, c, d);
                break;
            case "contentResumeRequested":
                GE(this, function() {
                    return FE(b, c, d)
                });
                break;
            case "remainingTime":
                this.ca = d.remainingTime;
                break;
            case "skip":
                FE(this, c, d);
                break;
            case "log":
                FE(this, c, d, d.logData);
                break;
            case "companionBackfill":
                a = La("window.google_show_companion_ad");
                null != a && a();
                break;
            case "skipShown":
                this.N = !0;
                FE(this,
                    c, d);
                break;
            case "interaction":
                FE(this, c, d, d.interactionData);
                break;
            case "vpaidEvent":
                uE(this.Ja, a);
                break;
            case "skippableStateChanged":
                a = d.adData;
                null != a.skippable && (this.N = a.skippable);
                FE(this, c, d);
                break;
            case "volumeChange":
                a = d.adData;
                null != a && "number" === typeof a.volume && (this.U = a.volume);
                FE(this, c, d);
                break;
            case "firstQuartile":
                FE(this, JA.firstQuartile, d);
                FE(this, c, d);
                break;
            case "thirdQuartile":
                FE(this, JA.thirdQuartile, d);
                FE(this, c, d);
                break;
            case "updateGfpCookie":
                HE(this, d);
                break;
            default:
                FE(this,
                    c, d)
        }
    };
    var FE = function(a, b, c, d) {
            if (null == c.companions) {
                var e = a.Z.get(c.adId);
                c.companions = null != e ? e : []
            }
            var f = c.adData;
            if (e = null == f ? null : new Y(f)) a.l = e;
            switch (b) {
                case "adBreakReady":
                case "mediaUrlPinged":
                    b = new $D(b, null, c);
                    break;
                case "adMetadata":
                    b = null;
                    null != c.adCuePoints && (b = new jC(c.adCuePoints));
                    b = new bE(e, b);
                    break;
                case "allAdsCompleted":
                    a.l = null;
                    a.Ca = !0;
                    b = new $D(b, e);
                    break;
                case "contentPauseRequested":
                    a.ba = !1;
                    b = new $D(b, e);
                    break;
                case "contentResumeRequested":
                    a.l = null;
                    a.ba = !0;
                    b = new $D(b, e);
                    break;
                case "loaded":
                    a.ca =
                        e.getDuration();
                    a.N = !1;
                    iB() && (d = a.I, c = a.qb, d.l.set(iC(e), a.P), uC(d) && tC(d, "loaded", iC(e), c));
                    b = new $D(b, e, f);
                    break;
                case "start":
                    a.Z.set(c.adId, c.companions);
                    null != BD(a.j) && (null == a.o ? (a.o = new xB, a.X.R(a.o, "click", a.tf)) : BB(a.o), zB(a.o, BD(a.j)));
                    b = new $D(b, e);
                    break;
                case "complete":
                    null != a.o && BB(a.o);
                    iB() && wC(a.I, a.P, iC(e));
                    a.l = null;
                    a.Z.delete(c.adId);
                    b = new $D(b, e);
                    break;
                case "log":
                    c = null;
                    null != d && null != d.type ? (f = d.type, f = "adLoadError" == f || "adPlayError" == f) : f = !1;
                    f && (c = {
                        adError: new WD(d)
                    });
                    b = new $D(b,
                        e, c);
                    break;
                case "interaction":
                    b = new $D(b, e, d);
                    break;
                case "adProgress":
                    b = new $D(b, e, new cE(c));
                    break;
                default:
                    b = new $D(b, e)
            }
            a.dispatchEvent(b);
            a.Ca && a.ba && a.destroy()
        },
        DE = function(a, b) {
            var c = new YD(new WD(b));
            a.Y ? (a.dispatchEvent(c), iB() && a.l && wC(a.I, a.P, iC(a.l)), a.l = null) : a.F.l.push(c);
            a = {
                error: b.errorCode,
                vis: th(document)
            };
            qB.j().report(7, a)
        },
        IE = function(a, b, c) {
            Ey(a.D, "adsManager", b, c)
        },
        GE = function(a, b) {
            qB.j().report(131);
            CE(a, b)
        },
        EE = function(a) {
            var b = a.j.j;
            UD(a.j) && a.A.restoreCustomPlaybackStateOnAdBreakComplete &&
                null != b.td && b.td()
        },
        CE = function(a, b) {
            var c = a.j.j;
            UD(a.j) && a.A.restoreCustomPlaybackStateOnAdBreakComplete && null != c.Sb ? c.Sb(b) : b && b()
        };
    l = Z.prototype;
    l.configureAdsManager = function(a, b) {
        this.C = a;
        null != a.currentTime && (this.G = new dE(a, this.D), this.G.start());
        null != b && (this.A = JE(b))
    };
    l.init = function(a, b, c, d) {
        if (this.F.isEmpty()) {
            var e = this.j,
                f = null;
            e.C && null == d && (f = {
                vd: "setnull"
            });
            e.C && e.C === d && (f = {
                vd: "match"
            });
            if (e.C && e.C !== d) {
                f = hB(d || null);
                var g = Cu(d || null);
                f = {
                    vd: "diff",
                    oc: e.Z,
                    nc: f,
                    oi: e.Y,
                    ni: g
                }
            }!e.C && d && (f = {
                vd: "new"
            });
            f && (f.custVid = e.X, qB.j().report(93, f));
            null != d && (e.F = TD(d), gB(e.F) && (e.U = !0, We(e.l), We(e.B), We(e.o), e.l = null, e.B = null, e.o = null, We(e.j), e.j = new DC(d), "function" !== typeof d.getBoundingClientRect ? (e.M = e.A, Vy.B = e.M) : e.M = d, null != (d = e.J.F) && (e = e.j.C.j, d.o = e, d.j && (d =
                d.j, d.j = e, dC(d, e)))));
            this.Y = !0;
            this.resize(a, b, c);
            e = lC(this.A, this.K);
            IE(this, "init", {
                adsRenderingSettings: e,
                width: a,
                height: b,
                viewMode: c
            })
        } else {
            for (; !this.F.isEmpty();) b = a = this.F, 0 === b.j.length && (b.j = b.l, b.j.reverse(), b.l = []), a = a.j.pop(), this.dispatchEvent(a);
            this.W()
        }
    };
    l.isCustomPlaybackUsed = function() {
        return UD(this.j)
    };
    l.isCustomClickTrackingUsed = function() {
        return this.K
    };
    l.getRemainingTime = function() {
        return this.ca
    };
    l.getAdSkippableState = function() {
        return this.N
    };
    l.discardAdBreak = function() {
        IE(this, "discardAdBreak")
    };
    l.updateAdsRenderingSettings = function(a) {
        if (null != a) {
            a = JE(a);
            var b = this.A.bitrate,
                c = a.bitrate;
            qB.j().report(96, {
                init: this.Y ? "1" : "0",
                start: this.ra ? "1" : "0",
                old: b,
                "new": c,
                changed: b != c ? "1" : "0"
            });
            this.A = a;
            a = lC(this.A, this.K);
            IE(this, "updateAdsRenderingSettings", {
                adsRenderingSettings: a
            })
        }
    };
    l.skip = function() {
        IE(this, "skip")
    };
    l.start = function() {
        if (this.L) {
            (ec || hc) && qB.j().report(50, {
                customPlayback: UD(this.j)
            });
            this.j.isInitialized() || qB.j().report(26, {
                adtagurl: this.L,
                customPlayback: UD(this.j)
            });
            vn(this.j.A) && qB.j().report(30, {
                adtagurl: this.L,
                customPlayback: UD(this.j)
            });
            var a = this.j.D,
                b = this.j.A,
                c;
            if (c = a && b && !vn(a)) a = rC(a), b = rC(b), c = 0 < a.width && 0 < a.height && 0 < b.width && 0 < b.height && a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height;
            c && qB.j().report(31, {
                adtagurl: this.L,
                customPlayback: UD(this.j)
            })
        }
        if (!this.j.isInitialized() &&
            !UD(this.j)) throw oz(mz);
        b = this.j;
        b.P = this.K && null != b.D;
        this.j.J.j.style.opacity = 1;
        null != this.C && 1 == this.getVolume() && ("boolean" === typeof this.C.muted && this.C.muted ? this.setVolume(0) : "number" === typeof this.C.volume && (b = this.C.volume, 0 <= b && 1 >= b && this.setVolume(this.C.volume)));
        this.ra = !0;
        IE(this, "start")
    };
    l.tf = function() {
        if (!this.A.disableClickThrough && null != this.l) {
            var a = this.l.j.clickThroughUrl;
            null != a && wu(a, this.l.j.attributionParams)
        }
    };
    l.resize = function(a, b, c) {
        var d = this.j,
            e = d.A;
        null != e && (-1 == a ? (e.style.right = "0", e.style.left = "0") : e.style.width = a + "px", -1 == b ? (e.style.bottom = "0", e.style.top = "0") : e.style.height = b + "px");
        e = d.J;
        e.j.width = -1 == a ? "100%" : a;
        e.j.height = -1 == b ? "100%" : b;
        try {
            e.j.offsetTop = e.j.offsetTop
        } catch (f) {}
        d.N = new F(a, b);
        IE(this, "resize", {
            width: a,
            height: b,
            viewMode: c
        })
    };
    l.stop = function() {
        IE(this, "stop")
    };
    l.expand = function() {
        IE(this, "expand")
    };
    l.collapse = function() {
        IE(this, "collapse")
    };
    l.getVolume = function() {
        return this.U
    };
    l.setVolume = function(a) {
        this.U = a;
        this.j.j.setVolume(a);
        IE(this, "volume", {
            volume: a
        })
    };
    l.pause = function() {
        IE(this, "pause")
    };
    l.resume = function() {
        IE(this, "resume")
    };
    l.destroy = function() {
        this.W()
    };
    l.getCuePoints = function() {
        return this.pb
    };
    l.Te = function() {
        return this.l
    };
    l.O = function() {
        IE(this, "destroy");
        null != this.o && this.o.W();
        this.X.W();
        this.F.clear();
        this.G && (this.G.stop(), this.G.W());
        iB() && wC(this.I, this.P);
        O.prototype.O.call(this)
    };
    l.clicked = function() {
        qB.j().report(124, {
            api: "clicked"
        });
        var a = this.l && this.l.j.clickThroughUrl;
        a && this.l.Pd() && wu(a, this.l.j.attributionParams);
        IE(this, "click")
    };
    l.focus = function() {
        Ey(this.D, "userInteraction", "focusUiElement")
    };
    var HE = function(a, b) {
        var c = b.gfpCookieUserEnabled;
        b = b.gfpCookieClearData;
        var d = (new Al).setValue(c ? "0" : "1");
        d = C(d, 2, 2147483647);
        d = C(d, 3, "/");
        d = C(d, 4, window.location.hostname);
        var e = new yE,
            f, g;
        a = null != (g = null == (f = a.ob) ? void 0 : kz(f)) ? g : null;
        zE(e, "__gpi_opt_out", d, a);
        if (!c || b) AE(e, "__gads", a), AE(e, "__gpi", a)
    };
    Z.prototype.clicked = Z.prototype.clicked;
    Z.prototype.getCurrentAd = Z.prototype.Te;
    Z.prototype.getCuePoints = Z.prototype.getCuePoints;
    Z.prototype.destroy = Z.prototype.destroy;
    Z.prototype.resume = Z.prototype.resume;
    Z.prototype.pause = Z.prototype.pause;
    Z.prototype.setVolume = Z.prototype.setVolume;
    Z.prototype.getVolume = Z.prototype.getVolume;
    Z.prototype.collapse = Z.prototype.collapse;
    Z.prototype.expand = Z.prototype.expand;
    Z.prototype.stop = Z.prototype.stop;
    Z.prototype.resize = Z.prototype.resize;
    Z.prototype.start = Z.prototype.start;
    Z.prototype.skip = Z.prototype.skip;
    Z.prototype.updateAdsRenderingSettings = Z.prototype.updateAdsRenderingSettings;
    Z.prototype.discardAdBreak = Z.prototype.discardAdBreak;
    Z.prototype.getAdSkippableState = Z.prototype.getAdSkippableState;
    Z.prototype.getRemainingTime = Z.prototype.getRemainingTime;
    Z.prototype.isCustomClickTrackingUsed = Z.prototype.isCustomClickTrackingUsed;
    Z.prototype.isCustomPlaybackUsed = Z.prototype.isCustomPlaybackUsed;
    Z.prototype.init = Z.prototype.init;

    function JE(a) {
        if (a instanceof kC) return a;
        var b = new kC;
        b.append(a);
        return b
    };
    var KE = function(a, b) {
        wj.call(this, "adsManagerLoaded");
        this.j = a;
        this.o = b
    };
    t(KE, wj);
    KE.prototype.getAdsManager = function(a, b) {
        a = a || {
            currentTime: null
        };
        this.j.configureAdsManager(a, b);
        return this.j
    };
    KE.prototype.getUserRequestContext = function() {
        return this.o
    };
    KE.prototype.getUserRequestContext = KE.prototype.getUserRequestContext;
    KE.prototype.getAdsManager = KE.prototype.getAdsManager;
    var LE = {
        ADS_MANAGER_LOADED: "adsManagerLoaded"
    };
    w("module$contents$ima$AdsManagerLoadedEvent_AdsManagerLoadedEvent.Type", LE);

    function ME(a, b) {
        return a && (a[b] || (a[b] = {}))
    }

    function NE(a, b) {
        var c;
        if (c = void 0 === c ? "undefined" === typeof omidExports ? null : omidExports : c) a = a.split("."), a.slice(0, a.length - 1).reduce(ME, c)[a[a.length - 1]] = b
    };
    var OE = new Map([
        [2, [/^(https?:\/\/|\/\/)?[-a-zA-Z0-9.]+\.moatads\.com\/.*$/]],
        [3, [/^(https?:\/\/|\/\/)?[-a-zA-Z0-9.]+\.doubleverify\.com\/.*$/, /^(https?:\/\/|\/\/)?c\.[\w\-]+\.com\/vfw\/dv\/.*$/, /^(https?:\/\/|\/\/)?(www\.)?[\w]+\.tv\/r\/s\/d\/.*$/]],
        [4, [/^(https?:\/\/|\/\/)?[-a-zA-Z0-9.]+\.adsafeprotected\.com\/.*$/]],
        [5, [/^https?:\/\/(q|cdn)\.adrta\.com\/s\/.*\/(aa|aanf)\.js.*$/, /^https:\/\/cdn\.rta247\.com\/s\/.*\/(aa|aanf)\.js.*$/]],
        [6, []],
        [7, [/^(https?:\/\/|\/\/)?[-a-zA-Z0-9.]+\.voicefive\.com\/.*$/,
            /^(https?:\/\/|\/\/)?[-a-zA-Z0-9.]+\.measuread\.com\/.*$/, /^(https?:\/\/|\/\/)?[-a-zA-Z0-9.]+\.scorecardresearch\.com\/.*$/
        ]],
        [8, [/^(https?:\/\/|\/\/)?s418\.mxcdn\.net\/bb-serve\/omid-meetrics.*\.js$/]],
        [9, [/^(https?:\/\/|\/\/)?pagead2\.googlesyndication\.com\/.*$/, /^(https?:\/\/|\/\/)?www\.googletagservices\.com\/.*$/]]
    ]);
    NE("OmidSessionClient.verificationVendorIdForScriptUrl", function(a) {
        for (var b = r(OE.keys()), c = b.next(); !c.done; c = b.next()) {
            c = c.value;
            for (var d = r(OE.get(c)), e = d.next(); !e.done; e = d.next())
                if (e.value.test(a)) return c
        }
        return 1
    });
    NE("OmidSessionClient.VerificationVendorId", {
        OTHER: 1,
        MOAT: 2,
        DOUBLEVERIFY: 3,
        INTEGRAL_AD_SCIENCE: 4,
        PIXELATE: 5,
        NIELSEN: 6,
        COMSCORE: 7,
        MEETRICS: 8,
        GOOGLE: 9
    });
    var PE = function() {
        this.o = this.l = "unknown";
        this.j = "0";
        this.nonLinearAdSlotHeight = this.nonLinearAdSlotWidth = this.linearAdSlotHeight = this.linearAdSlotWidth = this.liveStreamPrefetchSeconds = 0;
        this.forceNonLinearFullSlot = !1;
        this.contentTitle = this.contentKeywords = this.contentDuration = null;
        this.vastLoadTimeout = 5E3;
        this.omidAccessModeRules = {};
        this.pageUrl = null
    };
    PE.prototype.setAdWillAutoPlay = function(a) {
        this.l = a ? "auto" : "click"
    };
    PE.prototype.setAdWillPlayMuted = function(a) {
        this.o = a ? "muted" : "unmuted"
    };
    PE.prototype.setContinuousPlayback = function(a) {
        this.j = a ? "2" : "1"
    };
    PE.prototype.setContinuousPlayback = PE.prototype.setContinuousPlayback;
    PE.prototype.setAdWillPlayMuted = PE.prototype.setAdWillPlayMuted;
    PE.prototype.setAdWillAutoPlay = PE.prototype.setAdWillAutoPlay;
    var QE = q(["https://adservice.google.com/adsid/integrator.", ""]),
        RE = q(["https://adservice.google.ad/adsid/integrator.", ""]),
        SE = q(["https://adservice.google.ae/adsid/integrator.", ""]),
        TE = q(["https://adservice.google.com.af/adsid/integrator.", ""]),
        UE = q(["https://adservice.google.com.ag/adsid/integrator.", ""]),
        VE = q(["https://adservice.google.com.ai/adsid/integrator.", ""]),
        WE = q(["https://adservice.google.al/adsid/integrator.", ""]),
        XE = q(["https://adservice.google.co.ao/adsid/integrator.", ""]),
        YE = q(["https://adservice.google.com.ar/adsid/integrator.",
            ""
        ]),
        ZE = q(["https://adservice.google.as/adsid/integrator.", ""]),
        $E = q(["https://adservice.google.at/adsid/integrator.", ""]),
        aF = q(["https://adservice.google.com.au/adsid/integrator.", ""]),
        bF = q(["https://adservice.google.az/adsid/integrator.", ""]),
        cF = q(["https://adservice.google.com.bd/adsid/integrator.", ""]),
        dF = q(["https://adservice.google.be/adsid/integrator.", ""]),
        eF = q(["https://adservice.google.bf/adsid/integrator.", ""]),
        fF = q(["https://adservice.google.bg/adsid/integrator.", ""]),
        gF = q(["https://adservice.google.com.bh/adsid/integrator.",
            ""
        ]),
        hF = q(["https://adservice.google.bi/adsid/integrator.", ""]),
        iF = q(["https://adservice.google.bj/adsid/integrator.", ""]),
        jF = q(["https://adservice.google.com.bn/adsid/integrator.", ""]),
        kF = q(["https://adservice.google.com.bo/adsid/integrator.", ""]),
        lF = q(["https://adservice.google.com.br/adsid/integrator.", ""]),
        mF = q(["https://adservice.google.bs/adsid/integrator.", ""]),
        nF = q(["https://adservice.google.bt/adsid/integrator.", ""]),
        oF = q(["https://adservice.google.co.bw/adsid/integrator.", ""]),
        pF = q(["https://adservice.google.com.bz/adsid/integrator.",
            ""
        ]),
        qF = q(["https://adservice.google.ca/adsid/integrator.", ""]),
        rF = q(["https://adservice.google.cd/adsid/integrator.", ""]),
        sF = q(["https://adservice.google.cf/adsid/integrator.", ""]),
        tF = q(["https://adservice.google.cg/adsid/integrator.", ""]),
        uF = q(["https://adservice.google.ch/adsid/integrator.", ""]),
        vF = q(["https://adservice.google.ci/adsid/integrator.", ""]),
        wF = q(["https://adservice.google.co.ck/adsid/integrator.", ""]),
        xF = q(["https://adservice.google.cl/adsid/integrator.", ""]),
        yF = q(["https://adservice.google.cm/adsid/integrator.",
            ""
        ]),
        zF = q(["https://adservice.google.com.co/adsid/integrator.", ""]),
        AF = q(["https://adservice.google.co.cr/adsid/integrator.", ""]),
        BF = q(["https://adservice.google.com.cu/adsid/integrator.", ""]),
        CF = q(["https://adservice.google.cv/adsid/integrator.", ""]),
        DF = q(["https://adservice.google.com.cy/adsid/integrator.", ""]),
        EF = q(["https://adservice.google.cz/adsid/integrator.", ""]),
        FF = q(["https://adservice.google.de/adsid/integrator.", ""]),
        GF = q(["https://adservice.google.dj/adsid/integrator.", ""]),
        HF = q(["https://adservice.google.dk/adsid/integrator.",
            ""
        ]),
        IF = q(["https://adservice.google.dm/adsid/integrator.", ""]),
        JF = q(["https://adservice.google.dz/adsid/integrator.", ""]),
        KF = q(["https://adservice.google.com.ec/adsid/integrator.", ""]),
        LF = q(["https://adservice.google.ee/adsid/integrator.", ""]),
        MF = q(["https://adservice.google.com.eg/adsid/integrator.", ""]),
        NF = q(["https://adservice.google.es/adsid/integrator.", ""]),
        OF = q(["https://adservice.google.com.et/adsid/integrator.", ""]),
        PF = q(["https://adservice.google.fi/adsid/integrator.", ""]),
        QF = q(["https://adservice.google.com.fj/adsid/integrator.",
            ""
        ]),
        RF = q(["https://adservice.google.fm/adsid/integrator.", ""]),
        SF = q(["https://adservice.google.fr/adsid/integrator.", ""]),
        TF = q(["https://adservice.google.ga/adsid/integrator.", ""]),
        UF = q(["https://adservice.google.ge/adsid/integrator.", ""]),
        VF = q(["https://adservice.google.gg/adsid/integrator.", ""]),
        WF = q(["https://adservice.google.com.gh/adsid/integrator.", ""]),
        XF = q(["https://adservice.google.com.gi/adsid/integrator.", ""]),
        YF = q(["https://adservice.google.gl/adsid/integrator.", ""]),
        ZF = q(["https://adservice.google.gm/adsid/integrator.",
            ""
        ]),
        $F = q(["https://adservice.google.gr/adsid/integrator.", ""]),
        aG = q(["https://adservice.google.com.gt/adsid/integrator.", ""]),
        bG = q(["https://adservice.google.gy/adsid/integrator.", ""]),
        cG = q(["https://adservice.google.com.hk/adsid/integrator.", ""]),
        dG = q(["https://adservice.google.hn/adsid/integrator.", ""]),
        eG = q(["https://adservice.google.hr/adsid/integrator.", ""]),
        fG = q(["https://adservice.google.ht/adsid/integrator.", ""]),
        gG = q(["https://adservice.google.hu/adsid/integrator.", ""]),
        hG = q(["https://adservice.google.co.id/adsid/integrator.",
            ""
        ]),
        iG = q(["https://adservice.google.ie/adsid/integrator.", ""]),
        jG = q(["https://adservice.google.co.il/adsid/integrator.", ""]),
        kG = q(["https://adservice.google.im/adsid/integrator.", ""]),
        lG = q(["https://adservice.google.co.in/adsid/integrator.", ""]),
        mG = q(["https://adservice.google.iq/adsid/integrator.", ""]),
        nG = q(["https://adservice.google.is/adsid/integrator.", ""]),
        oG = q(["https://adservice.google.it/adsid/integrator.", ""]),
        pG = q(["https://adservice.google.je/adsid/integrator.", ""]),
        qG = q(["https://adservice.google.com.jm/adsid/integrator.",
            ""
        ]),
        rG = q(["https://adservice.google.jo/adsid/integrator.", ""]),
        sG = q(["https://adservice.google.co.jp/adsid/integrator.", ""]),
        tG = q(["https://adservice.google.co.ke/adsid/integrator.", ""]),
        uG = q(["https://adservice.google.com.kh/adsid/integrator.", ""]),
        vG = q(["https://adservice.google.ki/adsid/integrator.", ""]),
        wG = q(["https://adservice.google.kg/adsid/integrator.", ""]),
        xG = q(["https://adservice.google.co.kr/adsid/integrator.", ""]),
        yG = q(["https://adservice.google.com.kw/adsid/integrator.", ""]),
        zG = q(["https://adservice.google.kz/adsid/integrator.",
            ""
        ]),
        AG = q(["https://adservice.google.la/adsid/integrator.", ""]),
        BG = q(["https://adservice.google.com.lb/adsid/integrator.", ""]),
        CG = q(["https://adservice.google.li/adsid/integrator.", ""]),
        DG = q(["https://adservice.google.lk/adsid/integrator.", ""]),
        EG = q(["https://adservice.google.co.ls/adsid/integrator.", ""]),
        FG = q(["https://adservice.google.lt/adsid/integrator.", ""]),
        GG = q(["https://adservice.google.lu/adsid/integrator.", ""]),
        HG = q(["https://adservice.google.lv/adsid/integrator.", ""]),
        IG = q(["https://adservice.google.com.ly/adsid/integrator.",
            ""
        ]),
        JG = q(["https://adservice.google.md/adsid/integrator.", ""]),
        KG = q(["https://adservice.google.me/adsid/integrator.", ""]),
        LG = q(["https://adservice.google.mg/adsid/integrator.", ""]),
        MG = q(["https://adservice.google.mk/adsid/integrator.", ""]),
        NG = q(["https://adservice.google.ml/adsid/integrator.", ""]),
        OG = q(["https://adservice.google.com.mm/adsid/integrator.", ""]),
        PG = q(["https://adservice.google.mn/adsid/integrator.", ""]),
        QG = q(["https://adservice.google.ms/adsid/integrator.", ""]),
        RG = q(["https://adservice.google.com.mt/adsid/integrator.",
            ""
        ]),
        SG = q(["https://adservice.google.mu/adsid/integrator.", ""]),
        TG = q(["https://adservice.google.mv/adsid/integrator.", ""]),
        UG = q(["https://adservice.google.mw/adsid/integrator.", ""]),
        VG = q(["https://adservice.google.com.mx/adsid/integrator.", ""]),
        WG = q(["https://adservice.google.com.my/adsid/integrator.", ""]),
        XG = q(["https://adservice.google.co.mz/adsid/integrator.", ""]),
        YG = q(["https://adservice.google.com.na/adsid/integrator.", ""]),
        ZG = q(["https://adservice.google.com.ng/adsid/integrator.", ""]),
        $G = q(["https://adservice.google.com.ni/adsid/integrator.",
            ""
        ]),
        aH = q(["https://adservice.google.ne/adsid/integrator.", ""]),
        bH = q(["https://adservice.google.nl/adsid/integrator.", ""]),
        cH = q(["https://adservice.google.no/adsid/integrator.", ""]),
        dH = q(["https://adservice.google.com.np/adsid/integrator.", ""]),
        eH = q(["https://adservice.google.nr/adsid/integrator.", ""]),
        fH = q(["https://adservice.google.nu/adsid/integrator.", ""]),
        gH = q(["https://adservice.google.co.nz/adsid/integrator.", ""]),
        hH = q(["https://adservice.google.com.om/adsid/integrator.", ""]),
        iH = q(["https://adservice.google.com.pa/adsid/integrator.",
            ""
        ]),
        jH = q(["https://adservice.google.com.pe/adsid/integrator.", ""]),
        kH = q(["https://adservice.google.com.pg/adsid/integrator.", ""]),
        lH = q(["https://adservice.google.com.ph/adsid/integrator.", ""]),
        mH = q(["https://adservice.google.com.pk/adsid/integrator.", ""]),
        nH = q(["https://adservice.google.pl/adsid/integrator.", ""]),
        oH = q(["https://adservice.google.pn/adsid/integrator.", ""]),
        pH = q(["https://adservice.google.com.pr/adsid/integrator.", ""]),
        qH = q(["https://adservice.google.ps/adsid/integrator.", ""]),
        rH = q(["https://adservice.google.pt/adsid/integrator.",
            ""
        ]),
        sH = q(["https://adservice.google.com.py/adsid/integrator.", ""]),
        tH = q(["https://adservice.google.com.qa/adsid/integrator.", ""]),
        uH = q(["https://adservice.google.ro/adsid/integrator.", ""]),
        vH = q(["https://adservice.google.rw/adsid/integrator.", ""]),
        wH = q(["https://adservice.google.com.sa/adsid/integrator.", ""]),
        xH = q(["https://adservice.google.com.sb/adsid/integrator.", ""]),
        yH = q(["https://adservice.google.sc/adsid/integrator.", ""]),
        zH = q(["https://adservice.google.se/adsid/integrator.", ""]),
        AH = q(["https://adservice.google.com.sg/adsid/integrator.",
            ""
        ]),
        BH = q(["https://adservice.google.sh/adsid/integrator.", ""]),
        CH = q(["https://adservice.google.si/adsid/integrator.", ""]),
        DH = q(["https://adservice.google.sk/adsid/integrator.", ""]),
        EH = q(["https://adservice.google.sn/adsid/integrator.", ""]),
        FH = q(["https://adservice.google.so/adsid/integrator.", ""]),
        GH = q(["https://adservice.google.sm/adsid/integrator.", ""]),
        HH = q(["https://adservice.google.sr/adsid/integrator.", ""]),
        IH = q(["https://adservice.google.st/adsid/integrator.", ""]),
        JH = q(["https://adservice.google.com.sv/adsid/integrator.",
            ""
        ]),
        KH = q(["https://adservice.google.td/adsid/integrator.", ""]),
        LH = q(["https://adservice.google.tg/adsid/integrator.", ""]),
        MH = q(["https://adservice.google.co.th/adsid/integrator.", ""]),
        NH = q(["https://adservice.google.com.tj/adsid/integrator.", ""]),
        OH = q(["https://adservice.google.tl/adsid/integrator.", ""]),
        PH = q(["https://adservice.google.tm/adsid/integrator.", ""]),
        QH = q(["https://adservice.google.tn/adsid/integrator.", ""]),
        RH = q(["https://adservice.google.to/adsid/integrator.", ""]),
        SH = q(["https://adservice.google.com.tr/adsid/integrator.",
            ""
        ]),
        TH = q(["https://adservice.google.tt/adsid/integrator.", ""]),
        UH = q(["https://adservice.google.com.tw/adsid/integrator.", ""]),
        VH = q(["https://adservice.google.co.tz/adsid/integrator.", ""]),
        WH = q(["https://adservice.google.com.ua/adsid/integrator.", ""]),
        XH = q(["https://adservice.google.co.ug/adsid/integrator.", ""]),
        YH = q(["https://adservice.google.co.uk/adsid/integrator.", ""]),
        ZH = q(["https://adservice.google.com.uy/adsid/integrator.", ""]),
        $H = q(["https://adservice.google.co.uz/adsid/integrator.", ""]),
        aI = q(["https://adservice.google.com.vc/adsid/integrator.", ""]),
        bI = q(["https://adservice.google.co.ve/adsid/integrator.", ""]),
        cI = q(["https://adservice.google.vg/adsid/integrator.", ""]),
        dI = q(["https://adservice.google.co.vi/adsid/integrator.", ""]),
        eI = q(["https://adservice.google.com.vn/adsid/integrator.", ""]),
        fI = q(["https://adservice.google.vu/adsid/integrator.", ""]),
        gI = q(["https://adservice.google.ws/adsid/integrator.", ""]),
        hI = q(["https://adservice.google.rs/adsid/integrator.", ""]),
        iI = q(["https://adservice.google.co.za/adsid/integrator.",
            ""
        ]),
        jI = q(["https://adservice.google.co.zm/adsid/integrator.", ""]),
        kI = q(["https://adservice.google.co.zw/adsid/integrator.", ""]),
        lI = q(["https://adservice.google.cat/adsid/integrator.", ""]),
        mI = new Map([
            [".google.com", function(a) {
                return I(QE, a)
            }],
            [".google.ad", function(a) {
                return I(RE, a)
            }],
            [".google.ae", function(a) {
                return I(SE, a)
            }],
            [".google.com.af", function(a) {
                return I(TE, a)
            }],
            [".google.com.ag", function(a) {
                return I(UE, a)
            }],
            [".google.com.ai", function(a) {
                return I(VE, a)
            }],
            [".google.al", function(a) {
                return I(WE,
                    a)
            }],
            [".google.co.ao", function(a) {
                return I(XE, a)
            }],
            [".google.com.ar", function(a) {
                return I(YE, a)
            }],
            [".google.as", function(a) {
                return I(ZE, a)
            }],
            [".google.at", function(a) {
                return I($E, a)
            }],
            [".google.com.au", function(a) {
                return I(aF, a)
            }],
            [".google.az", function(a) {
                return I(bF, a)
            }],
            [".google.com.bd", function(a) {
                return I(cF, a)
            }],
            [".google.be", function(a) {
                return I(dF, a)
            }],
            [".google.bf", function(a) {
                return I(eF, a)
            }],
            [".google.bg", function(a) {
                return I(fF, a)
            }],
            [".google.com.bh", function(a) {
                return I(gF, a)
            }],
            [".google.bi",
                function(a) {
                    return I(hF, a)
                }
            ],
            [".google.bj", function(a) {
                return I(iF, a)
            }],
            [".google.com.bn", function(a) {
                return I(jF, a)
            }],
            [".google.com.bo", function(a) {
                return I(kF, a)
            }],
            [".google.com.br", function(a) {
                return I(lF, a)
            }],
            [".google.bs", function(a) {
                return I(mF, a)
            }],
            [".google.bt", function(a) {
                return I(nF, a)
            }],
            [".google.co.bw", function(a) {
                return I(oF, a)
            }],
            [".google.com.bz", function(a) {
                return I(pF, a)
            }],
            [".google.ca", function(a) {
                return I(qF, a)
            }],
            [".google.cd", function(a) {
                return I(rF, a)
            }],
            [".google.cf", function(a) {
                return I(sF,
                    a)
            }],
            [".google.cg", function(a) {
                return I(tF, a)
            }],
            [".google.ch", function(a) {
                return I(uF, a)
            }],
            [".google.ci", function(a) {
                return I(vF, a)
            }],
            [".google.co.ck", function(a) {
                return I(wF, a)
            }],
            [".google.cl", function(a) {
                return I(xF, a)
            }],
            [".google.cm", function(a) {
                return I(yF, a)
            }],
            [".google.com.co", function(a) {
                return I(zF, a)
            }],
            [".google.co.cr", function(a) {
                return I(AF, a)
            }],
            [".google.com.cu", function(a) {
                return I(BF, a)
            }],
            [".google.cv", function(a) {
                return I(CF, a)
            }],
            [".google.com.cy", function(a) {
                return I(DF, a)
            }],
            [".google.cz",
                function(a) {
                    return I(EF, a)
                }
            ],
            [".google.de", function(a) {
                return I(FF, a)
            }],
            [".google.dj", function(a) {
                return I(GF, a)
            }],
            [".google.dk", function(a) {
                return I(HF, a)
            }],
            [".google.dm", function(a) {
                return I(IF, a)
            }],
            [".google.dz", function(a) {
                return I(JF, a)
            }],
            [".google.com.ec", function(a) {
                return I(KF, a)
            }],
            [".google.ee", function(a) {
                return I(LF, a)
            }],
            [".google.com.eg", function(a) {
                return I(MF, a)
            }],
            [".google.es", function(a) {
                return I(NF, a)
            }],
            [".google.com.et", function(a) {
                return I(OF, a)
            }],
            [".google.fi", function(a) {
                return I(PF,
                    a)
            }],
            [".google.com.fj", function(a) {
                return I(QF, a)
            }],
            [".google.fm", function(a) {
                return I(RF, a)
            }],
            [".google.fr", function(a) {
                return I(SF, a)
            }],
            [".google.ga", function(a) {
                return I(TF, a)
            }],
            [".google.ge", function(a) {
                return I(UF, a)
            }],
            [".google.gg", function(a) {
                return I(VF, a)
            }],
            [".google.com.gh", function(a) {
                return I(WF, a)
            }],
            [".google.com.gi", function(a) {
                return I(XF, a)
            }],
            [".google.gl", function(a) {
                return I(YF, a)
            }],
            [".google.gm", function(a) {
                return I(ZF, a)
            }],
            [".google.gr", function(a) {
                return I($F, a)
            }],
            [".google.com.gt",
                function(a) {
                    return I(aG, a)
                }
            ],
            [".google.gy", function(a) {
                return I(bG, a)
            }],
            [".google.com.hk", function(a) {
                return I(cG, a)
            }],
            [".google.hn", function(a) {
                return I(dG, a)
            }],
            [".google.hr", function(a) {
                return I(eG, a)
            }],
            [".google.ht", function(a) {
                return I(fG, a)
            }],
            [".google.hu", function(a) {
                return I(gG, a)
            }],
            [".google.co.id", function(a) {
                return I(hG, a)
            }],
            [".google.ie", function(a) {
                return I(iG, a)
            }],
            [".google.co.il", function(a) {
                return I(jG, a)
            }],
            [".google.im", function(a) {
                return I(kG, a)
            }],
            [".google.co.in", function(a) {
                return I(lG,
                    a)
            }],
            [".google.iq", function(a) {
                return I(mG, a)
            }],
            [".google.is", function(a) {
                return I(nG, a)
            }],
            [".google.it", function(a) {
                return I(oG, a)
            }],
            [".google.je", function(a) {
                return I(pG, a)
            }],
            [".google.com.jm", function(a) {
                return I(qG, a)
            }],
            [".google.jo", function(a) {
                return I(rG, a)
            }],
            [".google.co.jp", function(a) {
                return I(sG, a)
            }],
            [".google.co.ke", function(a) {
                return I(tG, a)
            }],
            [".google.com.kh", function(a) {
                return I(uG, a)
            }],
            [".google.ki", function(a) {
                return I(vG, a)
            }],
            [".google.kg", function(a) {
                return I(wG, a)
            }],
            [".google.co.kr",
                function(a) {
                    return I(xG, a)
                }
            ],
            [".google.com.kw", function(a) {
                return I(yG, a)
            }],
            [".google.kz", function(a) {
                return I(zG, a)
            }],
            [".google.la", function(a) {
                return I(AG, a)
            }],
            [".google.com.lb", function(a) {
                return I(BG, a)
            }],
            [".google.li", function(a) {
                return I(CG, a)
            }],
            [".google.lk", function(a) {
                return I(DG, a)
            }],
            [".google.co.ls", function(a) {
                return I(EG, a)
            }],
            [".google.lt", function(a) {
                return I(FG, a)
            }],
            [".google.lu", function(a) {
                return I(GG, a)
            }],
            [".google.lv", function(a) {
                return I(HG, a)
            }],
            [".google.com.ly", function(a) {
                return I(IG,
                    a)
            }],
            [".google.md", function(a) {
                return I(JG, a)
            }],
            [".google.me", function(a) {
                return I(KG, a)
            }],
            [".google.mg", function(a) {
                return I(LG, a)
            }],
            [".google.mk", function(a) {
                return I(MG, a)
            }],
            [".google.ml", function(a) {
                return I(NG, a)
            }],
            [".google.com.mm", function(a) {
                return I(OG, a)
            }],
            [".google.mn", function(a) {
                return I(PG, a)
            }],
            [".google.ms", function(a) {
                return I(QG, a)
            }],
            [".google.com.mt", function(a) {
                return I(RG, a)
            }],
            [".google.mu", function(a) {
                return I(SG, a)
            }],
            [".google.mv", function(a) {
                return I(TG, a)
            }],
            [".google.mw", function(a) {
                return I(UG,
                    a)
            }],
            [".google.com.mx", function(a) {
                return I(VG, a)
            }],
            [".google.com.my", function(a) {
                return I(WG, a)
            }],
            [".google.co.mz", function(a) {
                return I(XG, a)
            }],
            [".google.com.na", function(a) {
                return I(YG, a)
            }],
            [".google.com.ng", function(a) {
                return I(ZG, a)
            }],
            [".google.com.ni", function(a) {
                return I($G, a)
            }],
            [".google.ne", function(a) {
                return I(aH, a)
            }],
            [".google.nl", function(a) {
                return I(bH, a)
            }],
            [".google.no", function(a) {
                return I(cH, a)
            }],
            [".google.com.np", function(a) {
                return I(dH, a)
            }],
            [".google.nr", function(a) {
                return I(eH, a)
            }],
            [".google.nu", function(a) {
                return I(fH, a)
            }],
            [".google.co.nz", function(a) {
                return I(gH, a)
            }],
            [".google.com.om", function(a) {
                return I(hH, a)
            }],
            [".google.com.pa", function(a) {
                return I(iH, a)
            }],
            [".google.com.pe", function(a) {
                return I(jH, a)
            }],
            [".google.com.pg", function(a) {
                return I(kH, a)
            }],
            [".google.com.ph", function(a) {
                return I(lH, a)
            }],
            [".google.com.pk", function(a) {
                return I(mH, a)
            }],
            [".google.pl", function(a) {
                return I(nH, a)
            }],
            [".google.pn", function(a) {
                return I(oH, a)
            }],
            [".google.com.pr", function(a) {
                return I(pH, a)
            }],
            [".google.ps", function(a) {
                return I(qH, a)
            }],
            [".google.pt", function(a) {
                return I(rH, a)
            }],
            [".google.com.py", function(a) {
                return I(sH, a)
            }],
            [".google.com.qa", function(a) {
                return I(tH, a)
            }],
            [".google.ro", function(a) {
                return I(uH, a)
            }],
            [".google.rw", function(a) {
                return I(vH, a)
            }],
            [".google.com.sa", function(a) {
                return I(wH, a)
            }],
            [".google.com.sb", function(a) {
                return I(xH, a)
            }],
            [".google.sc", function(a) {
                return I(yH, a)
            }],
            [".google.se", function(a) {
                return I(zH, a)
            }],
            [".google.com.sg", function(a) {
                return I(AH, a)
            }],
            [".google.sh",
                function(a) {
                    return I(BH, a)
                }
            ],
            [".google.si", function(a) {
                return I(CH, a)
            }],
            [".google.sk", function(a) {
                return I(DH, a)
            }],
            [".google.sn", function(a) {
                return I(EH, a)
            }],
            [".google.so", function(a) {
                return I(FH, a)
            }],
            [".google.sm", function(a) {
                return I(GH, a)
            }],
            [".google.sr", function(a) {
                return I(HH, a)
            }],
            [".google.st", function(a) {
                return I(IH, a)
            }],
            [".google.com.sv", function(a) {
                return I(JH, a)
            }],
            [".google.td", function(a) {
                return I(KH, a)
            }],
            [".google.tg", function(a) {
                return I(LH, a)
            }],
            [".google.co.th", function(a) {
                return I(MH,
                    a)
            }],
            [".google.com.tj", function(a) {
                return I(NH, a)
            }],
            [".google.tl", function(a) {
                return I(OH, a)
            }],
            [".google.tm", function(a) {
                return I(PH, a)
            }],
            [".google.tn", function(a) {
                return I(QH, a)
            }],
            [".google.to", function(a) {
                return I(RH, a)
            }],
            [".google.com.tr", function(a) {
                return I(SH, a)
            }],
            [".google.tt", function(a) {
                return I(TH, a)
            }],
            [".google.com.tw", function(a) {
                return I(UH, a)
            }],
            [".google.co.tz", function(a) {
                return I(VH, a)
            }],
            [".google.com.ua", function(a) {
                return I(WH, a)
            }],
            [".google.co.ug", function(a) {
                return I(XH, a)
            }],
            [".google.co.uk",
                function(a) {
                    return I(YH, a)
                }
            ],
            [".google.com.uy", function(a) {
                return I(ZH, a)
            }],
            [".google.co.uz", function(a) {
                return I($H, a)
            }],
            [".google.com.vc", function(a) {
                return I(aI, a)
            }],
            [".google.co.ve", function(a) {
                return I(bI, a)
            }],
            [".google.vg", function(a) {
                return I(cI, a)
            }],
            [".google.co.vi", function(a) {
                return I(dI, a)
            }],
            [".google.com.vn", function(a) {
                return I(eI, a)
            }],
            [".google.vu", function(a) {
                return I(fI, a)
            }],
            [".google.ws", function(a) {
                return I(gI, a)
            }],
            [".google.rs", function(a) {
                return I(hI, a)
            }],
            [".google.co.za", function(a) {
                return I(iI,
                    a)
            }],
            [".google.co.zm", function(a) {
                return I(jI, a)
            }],
            [".google.co.zw", function(a) {
                return I(kI, a)
            }],
            [".google.cat", function(a) {
                return I(lI, a)
            }]
        ].map(function(a) {
            var b = r(a);
            a = b.next().value;
            b = b.next().value;
            var c = {};
            return [a, (c.json = b("json"), c.js = b("js"), c["sync.js"] = b("sync.js"), c)]
        }));
    var nI = function(a, b, c) {
        var d = Rg("LINK", a);
        try {
            if (d.rel = "preload", rb("preload", "stylesheet")) {
                d.href = yf(b).toString();
                var e = Pf('style[nonce],link[rel="stylesheet"][nonce]', d.ownerDocument && d.ownerDocument.defaultView);
                e && d.setAttribute("nonce", e)
            } else {
                if (b instanceof xf) var f = yf(b).toString();
                else {
                    if (b instanceof Bf) var g = Cf(b);
                    else {
                        if (b instanceof Bf) var h = b;
                        else b = "object" == typeof b && b.Xa ? b.Ka() : String(b), Ef.test(b) || (b = "about:invalid#zClosurez"), h = Ff(b);
                        g = Cf(h)
                    }
                    f = g
                }
                d.href = f
            }
        } catch (k) {
            return
        }
        d.as =
            "script";
        c && d.setAttribute("nonce", c);
        if (a = a.getElementsByTagName("head")[0]) try {
            a.appendChild(d)
        } catch (k) {}
    };
    var oI = v,
        qI = function(a) {
            var b = new Map([
                ["domain", v.location.hostname]
            ]);
            pI[3] >= Wa() && b.set("adsid", pI[1]);
            return qh(mI.get(a).js, b)
        },
        pI, rI, sI = function() {
            oI = v;
            pI = oI.googleToken = oI.googleToken || {};
            var a = Wa();
            pI[1] && pI[3] > a && 0 < pI[2] || (pI[1] = "", pI[2] = -1, pI[3] = -1, pI[4] = "", pI[6] = "");
            rI = oI.googleIMState = oI.googleIMState || {};
            mI.has(rI[1]) || (rI[1] = ".google.com");
            Array.isArray(rI[5]) || (rI[5] = []);
            "boolean" !== typeof rI[6] && (rI[6] = !1);
            Array.isArray(rI[7]) || (rI[7] = []);
            "number" !== typeof rI[8] && (rI[8] = 0)
        },
        tI = {
            Kc: function() {
                return 0 <
                    rI[8]
            },
            yf: function() {
                rI[8]++
            },
            zf: function() {
                0 < rI[8] && rI[8]--
            },
            Af: function() {
                rI[8] = 0
            },
            shouldRetry: function() {
                return !1
            },
            Kd: function() {
                return rI[5]
            },
            Dd: function(a) {
                try {
                    a()
                } catch (b) {
                    v.setTimeout(function() {
                        throw b;
                    }, 0)
                }
            },
            dd: function() {
                if (!tI.Kc()) {
                    var a = v.document,
                        b = function(e) {
                            e = qI(e);
                            a: {
                                try {
                                    var f = Pf("script[nonce]");
                                    break a
                                } catch (g) {}
                                f = void 0
                            }
                            nI(a, e.toString(), f);
                            f = Rg("SCRIPT", a);
                            f.type = "text/javascript";
                            f.onerror = function() {
                                return v.processGoogleToken({}, 2)
                            };
                            f.src = yf(e);
                            Cg(f);
                            try {
                                (a.head || a.body ||
                                    a.documentElement).appendChild(f), tI.yf()
                            } catch (g) {}
                        },
                        c = rI[1];
                    b(c);
                    ".google.com" != c && b(".google.com");
                    b = {};
                    var d = (b.newToken = "FBT", b);
                    v.setTimeout(function() {
                        return v.processGoogleToken(d, 1)
                    }, 1E3)
                }
            }
        };

    function uI(a) {
        sI();
        var b = oI.googleToken[5] || 0;
        a && (0 != b || pI[3] >= Wa() ? tI.Dd(a) : (tI.Kd().push(a), tI.dd()));
        pI[3] >= Wa() && pI[2] >= Wa() || tI.dd()
    }
    var vI = function(a) {
        v.processGoogleToken = v.processGoogleToken || function(b, c) {
            var d = b;
            d = void 0 === d ? {} : d;
            c = void 0 === c ? 0 : c;
            b = d.newToken || "";
            var e = "NT" == b,
                f = parseInt(d.freshLifetimeSecs || "", 10),
                g = parseInt(d.validLifetimeSecs || "", 10),
                h = d["1p_jar"] || "";
            d = d.pucrd || "";
            sI();
            1 == c ? tI.Af() : tI.zf();
            if (!b && tI.shouldRetry()) mI.has(".google.com") && (rI[1] = ".google.com"), tI.dd();
            else {
                var k = oI.googleToken = oI.googleToken || {},
                    n = 0 == c && b && "string" === typeof b && !e && "number" === typeof f && 0 < f && "number" === typeof g && 0 < g && "string" ===
                    typeof h;
                e = e && !tI.Kc() && (!(pI[3] >= Wa()) || "NT" == pI[1]);
                var m = !(pI[3] >= Wa()) && 0 != c;
                if (n || e || m) e = Wa(), f = e + 1E3 * f, g = e + 1E3 * g, 1E-5 > Math.random() && hh(v, "https://pagead2.googlesyndication.com/pagead/gen_204?id=imerr&err=" + c), k[5] = c, k[1] = b, k[2] = f, k[3] = g, k[4] = h, k[6] = d, sI();
                if (n || !tI.Kc()) {
                    c = tI.Kd();
                    for (b = 0; b < c.length; b++) tI.Dd(c[b]);
                    c.length = 0
                }
            }
        };
        uI(a)
    };
    var wI = function(a) {
        E.call(this);
        this.l = a;
        this.j = null;
        this.B = {};
        this.A = 0;
        this.o = null
    };
    t(wI, E);
    wI.prototype.O = function() {
        this.o && Ve(this.l, "message", this.o);
        E.prototype.O.call(this)
    };
    var yI = function(a) {
            var b;
            return "function" === typeof(null == (b = a.l) ? void 0 : b.__uspapi) || null != xI(a)
        },
        AI = function(a, b) {
            var c = {};
            if (yI(a)) {
                var d = Qe(function() {
                    return b(c)
                });
                zI(a, function(e, f) {
                    f && (c = e);
                    d()
                });
                setTimeout(d, 500)
            } else b(c)
        },
        zI = function(a, b) {
            var c;
            "function" === typeof(null == (c = a.l) ? void 0 : c.__uspapi) ? (a = a.l.__uspapi, a("getUSPData", 1, b)) : xI(a) && (BI(a), c = ++a.A, a.B[c] = b, a.j && (b = {}, a.j.postMessage((b.__uspapiCall = {
                command: "getUSPData",
                version: 1,
                callId: c
            }, b), "*")))
        },
        xI = function(a) {
            if (a.j) return a.j;
            a.j = Pg(a.l, "__uspapiLocator");
            return a.j
        },
        BI = function(a) {
            a.o || (a.o = function(b) {
                try {
                    var c = {};
                    "string" === typeof b.data ? c = JSON.parse(b.data) : c = b.data;
                    var d = c.__uspapiReturn;
                    var e;
                    null == (e = a.B) || e[d.callId](d.returnValue, d.success)
                } catch (f) {}
            }, Ue(a.l, "message", a.o))
        };
    (function() {
        if (!cf(function(b) {
                return b.match(G().location.href)
            })) {
            var a = VB(document.querySelectorAll && document.querySelector ? document.querySelectorAll("SCRIPT") : document.getElementsByTagName("SCRIPT"));
            null == a && document.querySelectorAll && (a = VB(document.querySelectorAll("script")));
            if (null == a) throw Error("IMA SDK is either not loaded from a google domain or is not a supported version.");
        }
    })();
    var CI = function(a) {
        O.call(this);
        var b = this,
            c = Sy(Uy(this.getSettings()));
        c && 0 < c.length && (ki.reset(), mi(new Oi(c)));
        this.C = new yE;
        this.j = a;
        this.F = new Map;
        this.A = this.j.J;
        this.K = new Tu(this);
        Ye(this, this.K);
        this.L = new Yy(window);
        this.N = new wI(window);
        this.l = null;
        this.G = {};
        this.I = [];
        0 != Vy.j ? (this.o = new nC, Ye(this, this.o)) : this.o = pC();
        iB() && (this.o.init(yD(this.A)), this.D = vC(this.o, this.j.M), Xe(this, function() {
            var d = b.D;
            b.o.A.delete(d);
            0 != Vy.j && (J(Lr).B[d] = null)
        }))
    };
    t(CI, O);
    CI.prototype.destroy = function() {
        this.W()
    };
    CI.prototype.getVersion = function() {
        return "h.3.549.0"
    };
    CI.prototype.requestAds = function(a, b) {
        var c = this,
            d = [],
            e = null;
        $y(this.L) && d.push(new Promise(function(g) {
            cz(c.L, function(h) {
                e = h;
                g()
            })
        }));
        var f = null;
        yI(this.N) && d.push(new Promise(function(g) {
            AI(c.N, function(h) {
                f = h;
                g()
            })
        }));
        Promise.all(d).then(function() {
            DI(c, a, b, {
                kd: e,
                nd: f
            })
        })
    };
    var DI = function(a, b, c, d) {
        var e = b.adTagUrl;
        e && qB.j().report(8, {
            adtagurl: e,
            customPlayback: UD(a.j),
            customClick: null != a.j.D
        });
        var f = "goog_" + Vf++;
        a.F.set(f, c || null);
        var g = EI({
            adTagUrl: e,
            Od: !1,
            kd: d.kd,
            nd: d.nd
        });
        a.l = hz(e, g || {});
        HA(a.l, function() {
            FI(a)
        });
        c = [GI(a)];
        HI(jz(a.l)) && c.push(II());
        Promise.all(c).then(function() {
            var h = {};
            h = (h.limaExperimentIds = li().sort().join(","), h);
            var k = a.getSettings(),
                n = uC(a.o);
            n = void 0 === n ? null : n;
            var m = {};
            null != n && (m.activeViewPushUpdates = n);
            m.activityMonitorMode = k.j;
            m.adsToken =
                k.D;
            m.autoPlayAdBreaks = k.l;
            m.companionBackfill = k.getCompanionBackfill();
            m.cookiesEnabled = k.isCookiesEnabled();
            m.disableCustomPlaybackForIOS10Plus = k.getDisableCustomPlaybackForIOS10Plus();
            m.engagementDetection = !0;
            m.isFunctionalTest = !1;
            m.isVpaidAdapter = k.Lb();
            m["1pJar"] = k.I;
            m.numRedirects = k.getNumRedirects();
            m.pageCorrelator = k.P;
            m.persistentStateCorrelator = eh();
            m.playerType = k.getPlayerType();
            m.playerVersion = k.getPlayerVersion();
            m.ppid = k.getPpid();
            m.privacyControls = k.Y;
            m.reportMediaRequests = !1;
            m.sessionId =
                k.C;
            m.streamCorrelator = k.Z;
            m.testingConfig = Uy(k).j;
            m.urlSignals = k.ca;
            m.vpaidMode = k.o;
            m.featureFlags = k.getFeatureFlags();
            n = b.adTagUrl;
            k = {};
            k.contentMediaUrl = a.j.I;
            k.customClickTrackingProvided = null != a.j.D;
            a: {
                var x = jm();x = r(x);
                for (var u = x.next(); !u.done; u = x.next())
                    if (u = u.value, u.url && u.url.includes("amp=1")) {
                        x = !0;
                        break a
                    }
                x = null != window.context ? 0 < parseInt(window.context.ampcontextVersion, 10) : null != mm().o
            }
            k.isAmp = x;
            a: {
                try {
                    var y = window.top.location.href
                } catch (Yv) {
                    y = 2;
                    break a
                }
                y = null == y ? 2 : y == window.document.location.href ?
                    0 : 1
            }
            k.iframeState = y;
            k.imaHostingDomain = window.document.domain;
            k.imaHostingPageUrl = window.document.URL;
            if (An()) var A = window.location.href;
            else {
                u = mm();
                y = u.l;
                x = u.j;
                u = u.o;
                var N = null;
                if (u) try {
                    A = Nt(u.url);
                    var X = A.j,
                        da = kB(X, "/v/");
                    da || (da = kB(X, "/a/"));
                    if (!da) throw Error("Can not extract standalone amp url.");
                    var xa = kB("/" + da, "/s/"),
                        sa = Ct(A.l);
                    sa.remove("amp_js_v");
                    sa.remove("amp_lite");
                    var cb = xa ? Nt("https://" + xa) : Nt("http://" + da);
                    Bt(cb, sa);
                    N = cb.toString()
                } catch (Yv) {
                    N = null
                }
                A = N ? N : y && y.url ? y.url : x && x.url ? x.url :
                    ""
            }
            k.topAccessiblePageUrl = A;
            k.referrer = window.document.referrer;
            k.domLoadTime = a.A.K;
            k.sdkImplLoadTime = a.A.L;
            k.supportsResizing = !UD(a.j);
            A = G().location.ancestorOrigins;
            k.topOrigin = A ? 0 < A.length && 200 > A[A.length - 1].length ? A[A.length - 1] : "" : null;
            k.osdId = a.D;
            k.usesCustomVideoPlayback = UD(a.j);
            k.usesInlinePlayback = a.j.F;
            X = a.j.G;
            A = [];
            xa = da = "";
            if (null != X) {
                da = X;
                xa = !0;
                xa = void 0 === xa ? !1 : xa;
                sa = [];
                for (cb = 0; da && 25 > cb; ++cb) {
                    y = "";
                    void 0 !== xa && xa || (y = (y = 9 !== da.nodeType && da.id) ? "/" + y : "");
                    a: {
                        if (da && da.nodeName && da.parentElement) {
                            x =
                                da.nodeName.toString().toLowerCase();
                            u = da.parentElement.childNodes;
                            for (var gc = N = 0; gc < u.length; ++gc) {
                                var ef = u[gc];
                                if (ef.nodeName && ef.nodeName.toString().toLowerCase() === x) {
                                    if (da === ef) {
                                        x = "." + N;
                                        break a
                                    }++N
                                }
                            }
                        }
                        x = ""
                    }
                    sa.push((da.nodeName && da.nodeName.toString().toLowerCase()) + y + x);
                    da = da.parentElement
                }
                da = sa.join();
                if (X) {
                    X = (X = X.ownerDocument) && (X.defaultView || X.parentWindow) || null;
                    xa = [];
                    if (X) try {
                        var U = X.parent;
                        for (sa = 0; U && U !== X && 25 > sa; ++sa) {
                            var yd = U.frames;
                            for (cb = 0; cb < yd.length; ++cb)
                                if (X === yd[cb]) {
                                    xa.push(cb);
                                    break
                                }
                            X = U;
                            U = X.parent
                        }
                    } catch (Yv) {}
                    xa = xa.join()
                } else xa = ""
            }
            A.push(da, xa);
            if (null != n) {
                for (U = 0; U < eu.length - 1; ++U) A.push(wg(n, eu[U]) || "");
                U = wg(n, "videoad_start_delay");
                yd = "";
                U && (U = parseInt(U, 10), yd = 0 > U ? "postroll" : 0 == U ? "preroll" : "midroll");
                A.push(yd)
            } else
                for (U = 0; U < eu.length; ++U) A.push("");
            U = A.join(":");
            yd = U.length;
            if (0 == yd) U = 0;
            else {
                n = 305419896;
                for (A = 0; A < yd; A++) n ^= (n << 5) + (n >> 2) + U.charCodeAt(A) & 4294967295;
                U = 0 < n ? n : 4294967296 + n
            }
            k = (k.videoAdKey = U.toString(), k);
            U = {};
            h = (U.consentSettings = g, U.imalibExperiments =
                h, U.settings = m, U.videoEnvironment = k, U);
            m = {};
            m.adsResponse = b.adsResponse;
            m.videoPlayActivation = b.l;
            m.videoPlayMuted = b.o;
            m.videoContinuousPlay = b.j;
            m.adTagUrl = b.adTagUrl;
            m.contentDuration = b.contentDuration;
            m.contentKeywords = b.contentKeywords;
            m.contentTitle = b.contentTitle;
            m.linearAdSlotWidth = b.linearAdSlotWidth;
            m.linearAdSlotHeight = b.linearAdSlotHeight;
            m.nonLinearAdSlotWidth = b.nonLinearAdSlotWidth;
            m.nonLinearAdSlotHeight = b.nonLinearAdSlotHeight;
            m.forceNonLinearFullSlot = b.forceNonLinearFullSlot;
            m.liveStreamPrefetchSeconds =
                b.liveStreamPrefetchSeconds;
            m.vastLoadTimeout = b.vastLoadTimeout;
            m.omidAccessModeRules = b.omidAccessModeRules;
            m.pageUrl = b.pageUrl;
            Object.assign(h, m);
            a.l && Vy.isCookiesEnabled() && (m = kz(a.l), h.isBrowserCookieEnabled = a.C.isSupported(m), k = m ? xE("__gads", m, a.C.j) : null, null !== k && (h.gfpCookieValue = k), nj.isSelected() && (k = m ? xE("__gpi", m, a.C.j) : null, null !== k && (h.gfpCookieV2Id = k), m = m ? xE("__gpi_opt_out", m, a.C.j) : null, null !== m && (h.gfpCookieV2OptOut = m)));
            h.trustTokenStatuses = a.I;
            if (m = Ez(GA(a.l))) a.G.espSignals = m, h.espSignals =
                m;
            h.isEapLoader = !1;
            m = yD(a.A, f);
            a.K.R(m, "adsLoader", a.P);
            Ey(m, "adsLoader", "requestAds", h)
        })
    };
    CI.prototype.getSettings = function() {
        return Vy
    };
    CI.prototype.contentComplete = function() {
        Ey(yD(this.A), "adsLoader", "contentComplete")
    };
    var HI = function(a) {
        return a ? !1 : !fB()
    };
    CI.prototype.P = function(a) {
        var b = a.messageType;
        switch (b) {
            case "adsLoaded":
                b = a.oa;
                a = a.sessionId;
                b = new Z(this.o, this.j, b.adTagUrl || "", b.adCuePoints, this.D, b.isCustomClickTrackingAllowed, yD(this.A, a), this.l);
                this.dispatchEvent(new KE(b, JI(this, a)));
                break;
            case "error":
                b = a.oa;
                this.dispatchEvent(new YD(new WD(b), JI(this, a.sessionId)));
                a = {
                    error: b.errorCode,
                    vis: th(document)
                };
                qB.j().report(7, a);
                break;
            case "cookieUpdate":
                a = a.oa;
                if (null == a) break;
                if (Vy.isCookiesEnabled()) {
                    b = new Wy;
                    C(b, 5, !0);
                    var c = a.gfpCookie;
                    c && zE(this.C, "__gads", Kd(Al, c), b);
                    nj.isSelected() && (c = a.gfpCookieV2) && zE(this.C, "__gpi", Kd(Al, c), b)
                }
                KI(this, a.encryptedSignalBidderIds || []);
                break;
            case "trackingUrlPinged":
                this.dispatchEvent(new $D(b, null, a.oa))
        }
    };
    var KI = function(a, b) {
            0 != b.length && (b = IA(b.map(function(c) {
                return {
                    Xb: c
                }
            }), a.l)) && b.forEach(function(c) {
                return c.then(function(d) {
                    d && FI(a)
                })
            })
        },
        FI = function(a) {
            var b = Ez(GA(a.l));
            b && (a.G.espSignals = b, Ey(yD(a.A), "adsLoader", "signalsRefresh", a.G))
        },
        JI = function(a, b) {
            var c = a.F.get(b);
            a.F.delete(b);
            return c
        },
        EI = function(a) {
            var b, c = b = void 0 === b ? v : b;
            c = void 0 === c ? v : c;
            (c = !!c.googlefc) || (c = b.top, c = void 0 === c ? v.top : c, c = Og(c, "googlefcPresent"));
            var d = void 0 === d ? v : d;
            d = Og(d.top, "googlefcLoaded");
            b = a.kd;
            var e = a.nd,
                f = {};
            return f.gfcPresent = !1, f.gfcLoaded = d, f.gfcUserConsent = c ? 4 : 0, f.isGdprLoader = a.Od, f.addtlConsent = b ? b.addtlConsent : null, f.gdprApplies = b ? b.gdprApplies : null, f.tcString = b ? b.tcString : null, f.uspString = e ? e.uspString : null, f
        },
        II = function() {
            return new Promise(function(a) {
                vI(function() {
                    sI();
                    Vy.D = pI[1] || "";
                    sI();
                    Vy.Y = pI[6] || "";
                    sI();
                    Vy.I = pI[4] || "";
                    a()
                })
            })
        },
        GI = function(a) {
            var b = !!document.hasTrustToken,
                c = {};
            qB.j().report(158, (c.tte = b, c));
            if (!mj.isSelected() || !b) return Promise.resolve();
            var d;
            c = null != (d = uD(new oD(!jz(a.l), !1, !0))) ? d : Promise.resolve();
            return Promise.race([c, Dk()]).then(function(e) {
                var f = window.goog_tt_state_map,
                    g, h = [];
                (g = null == f ? void 0 : f.get(mD.issuerOrigin)) && h.push(g);
                a.I = h;
                f = {};
                qB.j().report(158, (f.timedOut = "timed out" == e, f.status = JSON.stringify(a.I), f.tte = b, f))
            })
        };
    CI.prototype.contentComplete = CI.prototype.contentComplete;
    CI.prototype.getSettings = CI.prototype.getSettings;
    CI.prototype.requestAds = CI.prototype.requestAds;
    CI.prototype.getVersion = CI.prototype.getVersion;
    CI.prototype.destroy = CI.prototype.destroy;
    w("google.ima.AdCuePoints.POSTROLL", -1, window);
    w("google.ima.AdCuePoints.PREROLL", 0, window);
    w("google.ima.AdDisplayContainer", VD, window);
    w("google.ima.AdError.ErrorCode", {
        DEPRECATED_ERROR_CODE: -1,
        VAST_MALFORMED_RESPONSE: 100,
        VAST_SCHEMA_VALIDATION_ERROR: 101,
        VAST_UNSUPPORTED_VERSION: 102,
        VAST_TRAFFICKING_ERROR: 200,
        VAST_UNEXPECTED_LINEARITY: 201,
        VAST_UNEXPECTED_DURATION_ERROR: 202,
        VAST_WRAPPER_ERROR: 300,
        VAST_LOAD_TIMEOUT: 301,
        VAST_TOO_MANY_REDIRECTS: 302,
        VAST_NO_ADS_AFTER_WRAPPER: 303,
        VIDEO_PLAY_ERROR: 400,
        VAST_MEDIA_LOAD_TIMEOUT: 402,
        VAST_LINEAR_ASSET_MISMATCH: 403,
        VAST_PROBLEM_DISPLAYING_MEDIA_FILE: 405,
        OVERLAY_AD_PLAYING_FAILED: 500,
        NONLINEAR_DIMENSIONS_ERROR: 501,
        OVERLAY_AD_LOADING_FAILED: 502,
        VAST_NONLINEAR_ASSET_MISMATCH: 503,
        COMPANION_REQUIRED_ERROR: 602,
        COMPANION_AD_LOADING_FAILED: 603,
        UNKNOWN_ERROR: 900,
        VPAID_ERROR: 901,
        FAILED_TO_REQUEST_ADS: 1005,
        VAST_ASSET_NOT_FOUND: 1007,
        VAST_EMPTY_RESPONSE: 1009,
        UNKNOWN_AD_RESPONSE: 1010,
        UNSUPPORTED_LOCALE: 1011,
        ADS_REQUEST_NETWORK_ERROR: 1012,
        INVALID_AD_TAG: 1013,
        STREAM_INITIALIZATION_FAILED: 1020,
        ASSET_FALLBACK_FAILED: 1021,
        INVALID_ARGUMENTS: 1101,
        NATIVE_MESSAGE_ERROR: 1204,
        AUTOPLAY_DISALLOWED: 1205,
        CONSENT_MANAGEMENT_PROVIDER_NOT_READY: 1300,
        uh: 2002
    }, window);
    w("google.ima.AdError.ErrorCode.VIDEO_ELEMENT_USED", -1, window);
    w("google.ima.AdError.ErrorCode.VIDEO_ELEMENT_REQUIRED", -1, window);
    w("google.ima.AdError.ErrorCode.VAST_MEDIA_ERROR", -1, window);
    w("google.ima.AdError.ErrorCode.ADSLOT_NOT_VISIBLE", -1, window);
    w("google.ima.AdError.ErrorCode.OVERLAY_AD_LOADING_FAILED", -1, window);
    w("google.ima.AdError.ErrorCode.VAST_MALFORMED_RESPONSE", -1, window);
    w("google.ima.AdError.ErrorCode.COMPANION_AD_LOADING_FAILED", -1, window);
    w("google.ima.AdError.Type", XD, window);
    w("google.ima.AdErrorEvent.Type", ZD, window);
    w("google.ima.AdEvent.Type", aE, window);
    w("google.ima.AdsLoader", CI, window);
    w("google.ima.AdsManagerLoadedEvent.Type", LE, window);
    w("google.ima.CompanionAdSelectionSettings", Gy, window);
    w("google.ima.CompanionAdSelectionSettings.CreativeType", Hy);
    w("google.ima.CompanionAdSelectionSettings.ResourceType", Iy);
    w("google.ima.CompanionAdSelectionSettings.SizeCriteria", Jy);
    w("google.ima.CustomContentLoadedEvent.Type.CUSTOM_CONTENT_LOADED", "deprecated-event", window);
    w("ima.ImaSdkSettings", T, window);
    w("google.ima.settings", Vy, window);
    w("google.ima.ImaSdkSettings.CompanionBackfillMode", {
        ALWAYS: "always",
        ON_MASTER_AD: "on_master_ad"
    });
    w("google.ima.ImaSdkSettings.VpaidMode", {
        DISABLED: 0,
        ENABLED: 1,
        INSECURE: 2
    });
    w("google.ima.AdsRenderingSettings", kC, window);
    w("google.ima.AdsRenderingSettings.AUTO_SCALE", -1, window);
    w("google.ima.AdsRequest", PE, window);
    w("google.ima.VERSION", "3.549.0");
    w("google.ima.OmidAccessMode", {
        LIMITED: "limited",
        DOMAIN: "domain",
        FULL: "full"
    });
    w("google.ima.OmidVerificationVendor", {
        COMSCORE: 7,
        DOUBLEVERIFY: 3,
        GOOGLE: 9,
        INTEGRAL_AD_SCIENCE: 4,
        MEETRICS: 8,
        MOAT: 2,
        NIELSEN: 6,
        PIXELATE: 5,
        OTHER: 1
    });
    w("google.ima.UiElements", {
        AD_ATTRIBUTION: "adAttribution",
        COUNTDOWN: "countdown"
    });
    w("google.ima.ViewMode", {
        NORMAL: "normal",
        FULLSCREEN: "fullscreen"
    });
})();