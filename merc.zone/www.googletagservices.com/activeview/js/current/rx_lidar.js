(function() {
    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    var m, ba = function(a) {
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
        ca = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
            if (a == Array.prototype || a == Object.prototype) return a;
            a[b] = c.value;
            return a
        },
        da = function(a) {
            a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
            for (var b = 0; b < a.length; ++b) {
                var c = a[b];
                if (c && c.Math == Math) return c
            }
            throw Error("a");
        },
        p = da(this),
        t = function(a, b) {
            if (b) a: {
                var c = p;a = a.split(".");
                for (var d = 0; d < a.length - 1; d++) {
                    var e = a[d];
                    if (!(e in c)) break a;
                    c = c[e]
                }
                a = a[a.length - 1];d = c[a];b = b(d);b != d && null != b && ca(c, a, {
                    configurable: !0,
                    writable: !0,
                    value: b
                })
            }
        };
    t("Symbol", function(a) {
        if (a) return a;
        var b = function(f, g) {
            this.Re = f;
            ca(this, "description", {
                configurable: !0,
                writable: !0,
                value: g
            })
        };
        b.prototype.toString = function() {
            return this.Re
        };
        var c = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_",
            d = 0,
            e = function(f) {
                if (this instanceof e) throw new TypeError("b");
                return new b(c + (f || "") + "_" + d++, f)
            };
        return e
    });
    t("Symbol.iterator", function(a) {
        if (a) return a;
        a = Symbol("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = p[b[c]];
            "function" === typeof d && "function" != typeof d.prototype[a] && ca(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return ea(ba(this))
                }
            })
        }
        return a
    });
    t("Symbol.asyncIterator", function(a) {
        return a ? a : Symbol("Symbol.asyncIterator")
    });
    var ea = function(a) {
            a = {
                next: a
            };
            a[Symbol.iterator] = function() {
                return this
            };
            return a
        },
        v = function(a) {
            var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
            return b ? b.call(a) : {
                next: ba(a)
            }
        },
        w = function(a) {
            if (!(a instanceof Array)) {
                a = v(a);
                for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
                a = c
            }
            return a
        },
        fa = function(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b)
        },
        ha = "function" == typeof Object.assign ? Object.assign : function(a, b) {
            for (var c = 1; c < arguments.length; c++) {
                var d = arguments[c];
                if (d)
                    for (var e in d) fa(d,
                        e) && (a[e] = d[e])
            }
            return a
        };
    t("Object.assign", function(a) {
        return a || ha
    });
    var ia = "function" == typeof Object.create ? Object.create : function(a) {
            var b = function() {};
            b.prototype = a;
            return new b
        },
        ja;
    if ("function" == typeof Object.setPrototypeOf) ja = Object.setPrototypeOf;
    else {
        var ka;
        a: {
            var la = {
                    a: !0
                },
                ma = {};
            try {
                ma.__proto__ = la;
                ka = ma.a;
                break a
            } catch (a) {}
            ka = !1
        }
        ja = ka ? function(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b) throw new TypeError("c`" + a);
            return a
        } : null
    }
    var na = ja,
        x = function(a, b) {
            a.prototype = ia(b.prototype);
            a.prototype.constructor = a;
            if (na) na(a, b);
            else
                for (var c in b)
                    if ("prototype" != c)
                        if (Object.defineProperties) {
                            var d = Object.getOwnPropertyDescriptor(b, c);
                            d && Object.defineProperty(a, c, d)
                        } else a[c] = b[c];
            a.Gg = b.prototype
        },
        pa = function() {
            this.Eb = !1;
            this.Ra = null;
            this.Md = void 0;
            this.Z = 1;
            this.za = this.Ta = 0;
            this.cd = this.W = null
        },
        qa = function(a) {
            if (a.Eb) throw new TypeError("e");
            a.Eb = !0
        };
    pa.prototype.Jb = function(a) {
        this.Md = a
    };
    pa.prototype.Rb = function(a) {
        this.W = {
            de: a,
            se: !0
        };
        this.Z = this.Ta || this.za
    };
    pa.prototype.return = function(a) {
        this.W = {
            return: a
        };
        this.Z = this.za
    };
    pa.prototype.Xa = function(a) {
        this.Z = a
    };
    var ra = function(a, b, c) {
        c = a.cd.splice(c || 0)[0];
        (c = a.W = a.W || c) ? c.se ? a.Z = a.Ta || a.za : void 0 != c.Xa && a.za < c.Xa ? (a.Z = c.Xa, a.W = null) : a.Z = a.za: a.Z = b
    };
    pa.prototype.forIn = function(a) {
        return new sa(a)
    };
    var sa = function(a) {
            this.De = [];
            for (var b in a) this.De.push(b);
            this.De.reverse()
        },
        ta = function(a) {
            this.m = new pa;
            this.pg = a
        };
    ta.prototype.Jb = function(a) {
        qa(this.m);
        if (this.m.Ra) return ua(this, this.m.Ra.next, a, this.m.Jb);
        this.m.Jb(a);
        return va(this)
    };
    var wa = function(a, b) {
        qa(a.m);
        var c = a.m.Ra;
        if (c) return ua(a, "return" in c ? c["return"] : function(d) {
            return {
                value: d,
                done: !0
            }
        }, b, a.m.return);
        a.m.return(b);
        return va(a)
    };
    ta.prototype.Rb = function(a) {
        qa(this.m);
        if (this.m.Ra) return ua(this, this.m.Ra["throw"], a, this.m.Jb);
        this.m.Rb(a);
        return va(this)
    };
    var ua = function(a, b, c, d) {
            try {
                var e = b.call(a.m.Ra, c);
                if (!(e instanceof Object)) throw new TypeError("d`" + e);
                if (!e.done) return a.m.Eb = !1, e;
                var f = e.value
            } catch (g) {
                return a.m.Ra = null, a.m.Rb(g), va(a)
            }
            a.m.Ra = null;
            d.call(a.m, f);
            return va(a)
        },
        va = function(a) {
            for (; a.m.Z;) try {
                var b = a.pg(a.m);
                if (b) return a.m.Eb = !1, {
                    value: b.value,
                    done: !1
                }
            } catch (c) {
                a.m.Md = void 0, a.m.Rb(c)
            }
            a.m.Eb = !1;
            if (a.m.W) {
                b = a.m.W;
                a.m.W = null;
                if (b.se) throw b.de;
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
        xa = function(a) {
            this.next =
                function(b) {
                    return a.Jb(b)
                };
            this.throw = function(b) {
                return a.Rb(b)
            };
            this.return = function(b) {
                return wa(a, b)
            };
            this[Symbol.iterator] = function() {
                return this
            }
        },
        ya = function(a) {
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
        za = function(a) {
            this[Symbol.asyncIterator] = function() {
                return this
            };
            this[Symbol.iterator] = function() {
                return a
            };
            this.next = function(b) {
                return Promise.resolve(a.next(b))
            };
            void 0 !== a["throw"] && (this["throw"] = function(b) {
                return Promise.resolve(a["throw"](b))
            });
            void 0 !== a["return"] && (this["return"] = function(b) {
                return Promise.resolve(a["return"](b))
            })
        },
        B = function() {
            for (var a = Number(this), b = [], c = a; c < arguments.length; c++) b[c - a] = arguments[c];
            return b
        };
    t("Promise", function(a) {
        function b() {
            this.Ja = null
        }

        function c(g) {
            return g instanceof e ? g : new e(function(h) {
                h(g)
            })
        }
        if (a) return a;
        b.prototype.Vd = function(g) {
            if (null == this.Ja) {
                this.Ja = [];
                var h = this;
                this.Wd(function() {
                    h.uf()
                })
            }
            this.Ja.push(g)
        };
        var d = p.setTimeout;
        b.prototype.Wd = function(g) {
            d(g, 0)
        };
        b.prototype.uf = function() {
            for (; this.Ja && this.Ja.length;) {
                var g = this.Ja;
                this.Ja = [];
                for (var h = 0; h < g.length; ++h) {
                    var k = g[h];
                    g[h] = null;
                    try {
                        k()
                    } catch (l) {
                        this.df(l)
                    }
                }
            }
            this.Ja = null
        };
        b.prototype.df = function(g) {
            this.Wd(function() {
                throw g;
            })
        };
        var e = function(g) {
            this.sb = 0;
            this.Ob = void 0;
            this.lb = [];
            this.ve = !1;
            var h = this.Xc();
            try {
                g(h.resolve, h.reject)
            } catch (k) {
                h.reject(k)
            }
        };
        e.prototype.Xc = function() {
            function g(l) {
                return function(n) {
                    k || (k = !0, l.call(h, n))
                }
            }
            var h = this,
                k = !1;
            return {
                resolve: g(this.vg),
                reject: g(this.xd)
            }
        };
        e.prototype.vg = function(g) {
            if (g === this) this.xd(new TypeError("f"));
            else if (g instanceof e) this.zg(g);
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
                h ? this.ug(g) : this.fe(g)
            }
        };
        e.prototype.ug = function(g) {
            var h = void 0;
            try {
                h = g.then
            } catch (k) {
                this.xd(k);
                return
            }
            "function" == typeof h ? this.Ag(h, g) : this.fe(g)
        };
        e.prototype.xd = function(g) {
            this.Je(2, g)
        };
        e.prototype.fe = function(g) {
            this.Je(1, g)
        };
        e.prototype.Je = function(g, h) {
            if (0 != this.sb) throw Error("g`" + g + "`" + h + "`" + this.sb);
            this.sb = g;
            this.Ob = h;
            2 === this.sb && this.xg();
            this.vf()
        };
        e.prototype.xg = function() {
            var g = this;
            d(function() {
                if (g.gg()) {
                    var h = p.console;
                    "undefined" !== typeof h && h.error(g.Ob)
                }
            }, 1)
        };
        e.prototype.gg = function() {
            if (this.ve) return !1;
            var g = p.CustomEvent,
                h = p.Event,
                k = p.dispatchEvent;
            if ("undefined" === typeof k) return !0;
            "function" === typeof g ? g = new g("unhandledrejection", {
                cancelable: !0
            }) : "function" === typeof h ? g = new h("unhandledrejection", {
                cancelable: !0
            }) : (g = p.document.createEvent("CustomEvent"), g.initCustomEvent("unhandledrejection", !1, !0, g));
            g.promise = this;
            g.reason = this.Ob;
            return k(g)
        };
        e.prototype.vf = function() {
            if (null != this.lb) {
                for (var g = 0; g < this.lb.length; ++g) f.Vd(this.lb[g]);
                this.lb = null
            }
        };
        var f = new b;
        e.prototype.zg = function(g) {
            var h =
                this.Xc();
            g.ac(h.resolve, h.reject)
        };
        e.prototype.Ag = function(g, h) {
            var k = this.Xc();
            try {
                g.call(h, k.resolve, k.reject)
            } catch (l) {
                k.reject(l)
            }
        };
        e.prototype.then = function(g, h) {
            function k(q, A) {
                return "function" == typeof q ? function(z) {
                    try {
                        l(q(z))
                    } catch (u) {
                        n(u)
                    }
                } : A
            }
            var l, n, r = new e(function(q, A) {
                l = q;
                n = A
            });
            this.ac(k(g, l), k(h, n));
            return r
        };
        e.prototype.catch = function(g) {
            return this.then(void 0, g)
        };
        e.prototype.ac = function(g, h) {
            function k() {
                switch (l.sb) {
                    case 1:
                        g(l.Ob);
                        break;
                    case 2:
                        h(l.Ob);
                        break;
                    default:
                        throw Error("h`" +
                            l.sb);
                }
            }
            var l = this;
            null == this.lb ? f.Vd(k) : this.lb.push(k);
            this.ve = !0
        };
        e.resolve = c;
        e.reject = function(g) {
            return new e(function(h, k) {
                k(g)
            })
        };
        e.race = function(g) {
            return new e(function(h, k) {
                for (var l = v(g), n = l.next(); !n.done; n = l.next()) c(n.value).ac(h, k)
            })
        };
        e.all = function(g) {
            var h = v(g),
                k = h.next();
            return k.done ? c([]) : new e(function(l, n) {
                function r(z) {
                    return function(u) {
                        q[z] = u;
                        A--;
                        0 == A && l(q)
                    }
                }
                var q = [],
                    A = 0;
                do q.push(void 0), A++, c(k.value).ac(r(q.length - 1), n), k = h.next(); while (!k.done)
            })
        };
        return e
    });
    t("Object.values", function(a) {
        return a ? a : function(b) {
            var c = [],
                d;
            for (d in b) fa(b, d) && c.push(b[d]);
            return c
        }
    });
    var Aa = function(a, b) {
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
    t("Array.prototype.keys", function(a) {
        return a ? a : function() {
            return Aa(this, function(b) {
                return b
            })
        }
    });
    t("WeakMap", function(a) {
        function b() {}

        function c(k) {
            var l = typeof k;
            return "object" === l && null !== k || "function" === l
        }

        function d(k) {
            if (!fa(k, f)) {
                var l = new b;
                ca(k, f, {
                    value: l
                })
            }
        }

        function e(k) {
            var l = Object[k];
            l && (Object[k] = function(n) {
                if (n instanceof b) return n;
                Object.isExtensible(n) && d(n);
                return l(n)
            })
        }
        if (function() {
                if (!a || !Object.seal) return !1;
                try {
                    var k = Object.seal({}),
                        l = Object.seal({}),
                        n = new a([
                            [k, 2],
                            [l, 3]
                        ]);
                    if (2 != n.get(k) || 3 != n.get(l)) return !1;
                    n.delete(k);
                    n.set(l, 4);
                    return !n.has(k) && 4 == n.get(l)
                } catch (r) {
                    return !1
                }
            }()) return a;
        var f = "$jscomp_hidden_" + Math.random();
        e("freeze");
        e("preventExtensions");
        e("seal");
        var g = 0,
            h = function(k) {
                this.Db = (g += Math.random() + 1).toString();
                if (k) {
                    k = v(k);
                    for (var l; !(l = k.next()).done;) l = l.value, this.set(l[0], l[1])
                }
            };
        h.prototype.set = function(k, l) {
            if (!c(k)) throw Error("i");
            d(k);
            if (!fa(k, f)) throw Error("j`" + k);
            k[f][this.Db] = l;
            return this
        };
        h.prototype.get = function(k) {
            return c(k) && fa(k, f) ? k[f][this.Db] : void 0
        };
        h.prototype.has = function(k) {
            return c(k) && fa(k, f) && fa(k[f], this.Db)
        };
        h.prototype.delete = function(k) {
            return c(k) &&
                fa(k, f) && fa(k[f], this.Db) ? delete k[f][this.Db] : !1
        };
        return h
    });
    t("Map", function(a) {
        if (function() {
                if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
                try {
                    var h = Object.seal({
                            x: 4
                        }),
                        k = new a(v([
                            [h, "s"]
                        ]));
                    if ("s" != k.get(h) || 1 != k.size || k.get({
                            x: 4
                        }) || k.set({
                            x: 4
                        }, "t") != k || 2 != k.size) return !1;
                    var l = k.entries(),
                        n = l.next();
                    if (n.done || n.value[0] != h || "s" != n.value[1]) return !1;
                    n = l.next();
                    return n.done || 4 != n.value[0].x || "t" != n.value[1] || !l.next().done ? !1 : !0
                } catch (r) {
                    return !1
                }
            }()) return a;
        var b = new WeakMap,
            c = function(h) {
                this.zb = {};
                this.Ba =
                    f();
                this.size = 0;
                if (h) {
                    h = v(h);
                    for (var k; !(k = h.next()).done;) k = k.value, this.set(k[0], k[1])
                }
            };
        c.prototype.set = function(h, k) {
            h = 0 === h ? 0 : h;
            var l = d(this, h);
            l.list || (l.list = this.zb[l.id] = []);
            l.K ? l.K.value = k : (l.K = {
                next: this.Ba,
                Ea: this.Ba.Ea,
                head: this.Ba,
                key: h,
                value: k
            }, l.list.push(l.K), this.Ba.Ea.next = l.K, this.Ba.Ea = l.K, this.size++);
            return this
        };
        c.prototype.delete = function(h) {
            h = d(this, h);
            return h.K && h.list ? (h.list.splice(h.index, 1), h.list.length || delete this.zb[h.id], h.K.Ea.next = h.K.next, h.K.next.Ea = h.K.Ea,
                h.K.head = null, this.size--, !0) : !1
        };
        c.prototype.clear = function() {
            this.zb = {};
            this.Ba = this.Ba.Ea = f();
            this.size = 0
        };
        c.prototype.has = function(h) {
            return !!d(this, h).K
        };
        c.prototype.get = function(h) {
            return (h = d(this, h).K) && h.value
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
        c.prototype.forEach = function(h, k) {
            for (var l = this.entries(),
                    n; !(n = l.next()).done;) n = n.value, h.call(k, n[1], n[0], this)
        };
        c.prototype[Symbol.iterator] = c.prototype.entries;
        var d = function(h, k) {
                var l = k && typeof k;
                "object" == l || "function" == l ? b.has(k) ? l = b.get(k) : (l = "" + ++g, b.set(k, l)) : l = "p_" + k;
                var n = h.zb[l];
                if (n && fa(h.zb, l))
                    for (h = 0; h < n.length; h++) {
                        var r = n[h];
                        if (k !== k && r.key !== r.key || k === r.key) return {
                            id: l,
                            list: n,
                            index: h,
                            K: r
                        }
                    }
                return {
                    id: l,
                    list: n,
                    index: -1,
                    K: void 0
                }
            },
            e = function(h, k) {
                var l = h.Ba;
                return ea(function() {
                    if (l) {
                        for (; l.head != h.Ba;) l = l.Ea;
                        for (; l.next != l.head;) return l =
                            l.next, {
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
            },
            f = function() {
                var h = {};
                return h.Ea = h.next = h.head = h
            },
            g = 0;
        return c
    });
    t("Number.isFinite", function(a) {
        return a ? a : function(b) {
            return "number" !== typeof b ? !1 : !isNaN(b) && Infinity !== b && -Infinity !== b
        }
    });
    t("Array.prototype.values", function(a) {
        return a ? a : function() {
            return Aa(this, function(b, c) {
                return c
            })
        }
    });
    t("Set", function(a) {
        if (function() {
                if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
                try {
                    var c = Object.seal({
                            x: 4
                        }),
                        d = new a(v([c]));
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
            this.sa = new Map;
            if (c) {
                c =
                    v(c);
                for (var d; !(d = c.next()).done;) this.add(d.value)
            }
            this.size = this.sa.size
        };
        b.prototype.add = function(c) {
            c = 0 === c ? 0 : c;
            this.sa.set(c, c);
            this.size = this.sa.size;
            return this
        };
        b.prototype.delete = function(c) {
            c = this.sa.delete(c);
            this.size = this.sa.size;
            return c
        };
        b.prototype.clear = function() {
            this.sa.clear();
            this.size = 0
        };
        b.prototype.has = function(c) {
            return this.sa.has(c)
        };
        b.prototype.entries = function() {
            return this.sa.entries()
        };
        b.prototype.values = function() {
            return this.sa.values()
        };
        b.prototype.keys = b.prototype.values;
        b.prototype[Symbol.iterator] = b.prototype.values;
        b.prototype.forEach = function(c, d) {
            var e = this;
            this.sa.forEach(function(f) {
                return c.call(d, f, f, e)
            })
        };
        return b
    });
    t("Number.isNaN", function(a) {
        return a ? a : function(b) {
            return "number" === typeof b && isNaN(b)
        }
    });
    t("Array.prototype.entries", function(a) {
        return a ? a : function() {
            return Aa(this, function(b, c) {
                return [b, c]
            })
        }
    });
    t("Array.from", function(a) {
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
    t("Array.prototype.fill", function(a) {
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
    var Ba = function(a) {
        return a ? a : Array.prototype.fill
    };
    t("Int8Array.prototype.fill", Ba);
    t("Uint8Array.prototype.fill", Ba);
    t("Uint8ClampedArray.prototype.fill", Ba);
    t("Int16Array.prototype.fill", Ba);
    t("Uint16Array.prototype.fill", Ba);
    t("Int32Array.prototype.fill", Ba);
    t("Uint32Array.prototype.fill", Ba);
    t("Float32Array.prototype.fill", Ba);
    t("Float64Array.prototype.fill", Ba);
    t("Object.entries", function(a) {
        return a ? a : function(b) {
            var c = [],
                d;
            for (d in b) fa(b, d) && c.push([d, b[d]]);
            return c
        }
    });
    t("Object.is", function(a) {
        return a ? a : function(b, c) {
            return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c
        }
    });
    t("Array.prototype.includes", function(a) {
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
    t("String.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            if (null == this) throw new TypeError("k`includes");
            if (b instanceof RegExp) throw new TypeError("l`includes");
            return -1 !== (this + "").indexOf(b, c || 0)
        }
    });
    t("Array.prototype.flat", function(a) {
        return a ? a : function(b) {
            b = void 0 === b ? 1 : b;
            for (var c = [], d = 0; d < this.length; d++) {
                var e = this[d];
                Array.isArray(e) && 0 < b ? (e = Array.prototype.flat.call(e, b - 1), c.push.apply(c, e)) : c.push(e)
            }
            return c
        }
    });
    var Ca = this || self,
        Da = function(a) {
            var b = typeof a;
            return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
        },
        Ea = function(a) {
            var b = Da(a);
            return "array" == b || "object" == b && "number" == typeof a.length
        },
        Fa = function(a) {
            var b = typeof a;
            return "object" == b && null != a || "function" == b
        },
        Ha = function(a, b) {
            function c() {}
            c.prototype = b.prototype;
            a.Gg = b.prototype;
            a.prototype = new c;
            a.prototype.constructor = a;
            a.gh = function(d, e, f) {
                for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
                return b.prototype[e].apply(d,
                    g)
            }
        };
    var Ia = function() {
        this.Oe = 0
    };
    Ia.prototype.Ga = function(a, b) {
        var c = this;
        return function() {
            var d = B.apply(0, arguments);
            c.Oe = a;
            return b.apply(null, w(d))
        }
    };
    var Ka = function() {
            var a = {};
            this.va = (a[3] = [], a[2] = [], a[1] = [], a);
            this.od = !1
        },
        Ma = function(a, b, c) {
            var d = La(a, c);
            a.va[c].push(b);
            d && 1 === a.va[c].length && a.flush()
        },
        La = function(a, b) {
            return Object.keys(a.va).map(function(c) {
                return Number(c)
            }).filter(function(c) {
                return !isNaN(c) && c > b
            }).every(function(c) {
                return 0 === a.va[c].length
            })
        };
    Ka.prototype.flush = function() {
        if (!this.od) {
            this.od = !0;
            try {
                for (; Object.values(this.va).some(function(a) {
                        return 0 < a.length
                    });) Na(this, 3), Na(this, 2), Na(this, 1)
            } catch (a) {
                throw Object.values(this.va).forEach(function(b) {
                    return void b.splice(0, b.length)
                }), a;
            } finally {
                this.od = !1
            }
        }
    };
    var Na = function(a, b) {
        for (; La(a, b) && 0 < a.va[b].length;) a.va[b][0](), a.va[b].shift()
    };
    p.Object.defineProperties(Ka.prototype, {
        Ge: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return Object.values(this.va).some(function(a) {
                    return 0 < a.length
                })
            }
        }
    });

    function Oa(a, b) {
        if (Error.captureStackTrace) Error.captureStackTrace(this, Oa);
        else {
            var c = Error().stack;
            c && (this.stack = c)
        }
        a && (this.message = String(a));
        void 0 !== b && (this.cause = b)
    }
    Ha(Oa, Error);
    Oa.prototype.name = "CustomError";
    var Pa;

    function Qa(a, b) {
        var c = Oa.call;
        a = a.split("%s");
        for (var d = "", e = a.length - 1, f = 0; f < e; f++) d += a[f] + (f < b.length ? b[f] : "%s");
        c.call(Oa, this, d + a[e])
    }
    Ha(Qa, Oa);
    Qa.prototype.name = "AssertionError";

    function Ra(a, b, c, d) {
        var e = "Assertion failed";
        if (c) {
            e += ": " + c;
            var f = d
        } else a && (e += ": " + a, f = b);
        throw new Qa("" + e, f || []);
    }
    var Sa = function(a, b, c) {
            a || Ra("", null, b, Array.prototype.slice.call(arguments, 2));
            return a
        },
        Ta = function(a, b, c) {
            null == a && Ra("Expected to exist: %s.", [a], b, Array.prototype.slice.call(arguments, 2));
            return a
        },
        Ua = function(a, b) {
            throw new Qa("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
        },
        Va = function(a, b, c) {
            "number" !== typeof a && Ra("Expected number but got %s: %s.", [Da(a), a], b, Array.prototype.slice.call(arguments, 2))
        },
        Wa = function(a, b, c) {
            "string" !== typeof a && Ra("Expected string but got %s: %s.", [Da(a), a], b, Array.prototype.slice.call(arguments, 2))
        },
        Ya = function(a, b, c) {
            "function" !== typeof a && Ra("Expected function but got %s: %s.", [Da(a), a], b, Array.prototype.slice.call(arguments, 2))
        },
        Za = function(a, b, c) {
            Fa(a) || Ra("Expected object but got %s: %s.", [Da(a), a], b, Array.prototype.slice.call(arguments, 2))
        },
        $a = function(a, b, c) {
            Array.isArray(a) || Ra("Expected array but got %s: %s.", [Da(a), a], b, Array.prototype.slice.call(arguments, 2))
        },
        bb = function(a, b, c, d) {
            a instanceof b || Ra("Expected instanceof %s but got %s.", [ab(b), ab(a)], c, Array.prototype.slice.call(arguments, 3));
            return a
        };

    function ab(a) {
        return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
    };
    var cb = Array.prototype.forEach ? function(a, b) {
            Sa(null != a.length);
            Array.prototype.forEach.call(a, b, void 0)
        } : function(a, b) {
            for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++) e in d && b.call(void 0, d[e], e, a)
        },
        db = Array.prototype.map ? function(a, b) {
            Sa(null != a.length);
            return Array.prototype.map.call(a, b, void 0)
        } : function(a, b) {
            for (var c = a.length, d = Array(c), e = "string" === typeof a ? a.split("") : a, f = 0; f < c; f++) f in e && (d[f] = b.call(void 0, e[f], f, a));
            return d
        },
        eb = Array.prototype.some ? function(a, b) {
            Sa(null !=
                a.length);
            return Array.prototype.some.call(a, b, void 0)
        } : function(a, b) {
            for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
                if (e in d && b.call(void 0, d[e], e, a)) return !0;
            return !1
        };

    function fb(a) {
        return Array.prototype.concat.apply([], arguments)
    }

    function gb(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
            return c
        }
        return []
    }

    function hb(a, b, c) {
        if (!Ea(a) || !Ea(b) || a.length != b.length) return !1;
        var d = a.length;
        c = c || ib;
        for (var e = 0; e < d; e++)
            if (!c(a[e], b[e])) return !1;
        return !0
    }

    function ib(a, b) {
        return a === b
    }

    function jb(a, b) {
        return fb.apply([], db(a, b))
    };
    var kb = function(a, b) {
        return -1 != a.toLowerCase().indexOf(b.toLowerCase())
    };

    function nb() {
        var a = Ca.navigator;
        return a && (a = a.userAgent) ? a : ""
    }

    function D(a) {
        return -1 != nb().indexOf(a)
    };

    function ob() {
        return D("Firefox") || D("FxiOS")
    }

    function pb() {
        return D("Safari") && !(qb() || D("Coast") || D("Opera") || D("Edge") || D("Edg/") || D("OPR") || ob() || D("Silk") || D("Android"))
    }

    function qb() {
        return (D("Chrome") || D("CriOS")) && !D("Edge") || D("Silk")
    }

    function rb() {
        return D("Android") && !(qb() || ob() || D("Opera") || D("Silk"))
    };
    var sb = function() {
        return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ Date.now()).toString(36)
    };
    /*


     Copyright (c) 2015-2018 Google, Inc., Netflix, Inc., Microsoft Corp. and contributors

     Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
    */
    var tb = !1,
        ub = {
            set oa(a) {
                a ? console.warn("m`" + Error().stack) : tb && console.log("n");
                tb = a
            },
            get oa() {
                return tb
            }
        };
    var vb = "function" === typeof Symbol && Symbol.observable || "@@observable";

    function wb(a) {
        setTimeout(function() {
            throw a;
        }, 0)
    };
    var xb = {
        closed: !0,
        next: function() {},
        error: function(a) {
            if (ub.oa) throw a;
            wb(a)
        },
        complete: function() {}
    };
    var yb = function() {
        function a(b) {
            this.message = b ? b.length + " errors occurred during unsubscription:\n" + b.map(function(c, d) {
                return d + 1 + ") " + c.toString()
            }).join("\n  ") : "";
            this.name = "UnsubscriptionError";
            this.errors = b;
            return this
        }
        a.prototype = Object.create(Error.prototype);
        return a
    }();
    var zb = Array.isArray || function(a) {
        return a && "number" === typeof a.length
    };

    function Ab(a) {
        return "function" === typeof a
    };

    function Bb(a) {
        return null !== a && "object" === typeof a
    };
    var E = function(a) {
        this.closed = !1;
        this.fb = this.tb = null;
        a && (this.Te = !0, this.xa = a)
    };
    E.prototype.unsubscribe = function() {
        if (!this.closed) {
            var a = this.tb,
                b = this.Te,
                c = this.xa,
                d = this.fb;
            this.closed = !0;
            this.fb = this.tb = null;
            if (a instanceof E) a.remove(this);
            else if (null !== a)
                for (var e = 0; e < a.length; ++e) a[e].remove(this);
            if (Ab(c)) {
                b && (this.xa = void 0);
                try {
                    c.call(this)
                } catch (k) {
                    var f = k instanceof yb ? Cb(k.errors) : [k]
                }
            }
            if (zb(d)) {
                e = -1;
                for (var g = d.length; ++e < g;) {
                    var h = d[e];
                    if (Bb(h)) try {
                        h.unsubscribe()
                    } catch (k) {
                        f = f || [], k instanceof yb ? f = f.concat(Cb(k.errors)) : f.push(k)
                    }
                }
            }
            if (f) throw new yb(f);
        }
    };
    E.prototype.add = function(a) {
        var b = a;
        if (!a) return E.EMPTY;
        switch (typeof a) {
            case "function":
                b = new E(a);
            case "object":
                if (b === this || b.closed || "function" !== typeof b.unsubscribe) return b;
                if (this.closed) return b.unsubscribe(), b;
                b instanceof E || (a = b, b = new E, b.fb = [a]);
                break;
            default:
                throw Error("o`" + a);
        }
        var c = b.tb;
        if (null === c) b.tb = this;
        else if (c instanceof E) {
            if (c === this) return b;
            b.tb = [c, this]
        } else if (-1 === c.indexOf(this)) c.push(this);
        else return b;
        a = this.fb;
        null === a ? this.fb = [b] : a.push(b);
        return b
    };
    E.prototype.remove = function(a) {
        var b = this.fb;
        b && (a = b.indexOf(a), -1 !== a && b.splice(a, 1))
    };
    var Db = new E;
    Db.closed = !0;
    E.EMPTY = Db;

    function Eb(a) {
        return a instanceof E || a && "closed" in a && "function" === typeof a.remove && "function" === typeof a.add && "function" === typeof a.unsubscribe
    }

    function Cb(a) {
        return a.reduce(function(b, c) {
            return b.concat(c instanceof yb ? c.errors : c)
        }, [])
    };
    var H = function(a, b, c) {
        E.call(this);
        this.Bc = null;
        this.B = this.ba = this.Ac = !1;
        switch (arguments.length) {
            case 0:
                this.destination = xb;
                break;
            case 1:
                if (!a) {
                    this.destination = xb;
                    break
                }
                if ("object" === typeof a) {
                    a instanceof H ? (this.ba = a.ba, this.destination = a, a.add(this)) : (this.ba = !0, this.destination = new Fb(this, a));
                    break
                }
            default:
                this.ba = !0, this.destination = new Fb(this, a, b, c)
        }
    };
    x(H, E);
    H.EMPTY = E.EMPTY;
    H.create = function(a, b, c) {
        a = new H(a, b, c);
        a.ba = !1;
        return a
    };
    m = H.prototype;
    m.next = function(a) {
        this.B || this.o(a)
    };
    m.error = function(a) {
        this.B || (this.B = !0, this.R(a))
    };
    m.complete = function() {
        this.B || (this.B = !0, this.A())
    };
    m.unsubscribe = function() {
        this.closed || (this.B = !0, E.prototype.unsubscribe.call(this))
    };
    m.o = function(a) {
        this.destination.next(a)
    };
    m.R = function(a) {
        this.destination.error(a);
        this.unsubscribe()
    };
    m.A = function() {
        this.destination.complete();
        this.unsubscribe()
    };
    var Fb = function(a, b, c, d) {
        H.call(this);
        this.ub = a;
        var e = this;
        if (Ab(b)) var f = b;
        else b && (f = b.next, c = b.error, d = b.complete, b !== xb && (e = Object.create(b), Eb(b) && b.add(this.unsubscribe.bind(this)), e.unsubscribe = this.unsubscribe.bind(this)));
        this.wa = e;
        this.o = f;
        this.R = c;
        this.A = d
    };
    x(Fb, H);
    Fb.EMPTY = H.EMPTY;
    Fb.create = H.create;
    m = Fb.prototype;
    m.next = function(a) {
        if (!this.B && this.o) {
            var b = this.ub;
            ub.oa && b.ba ? this.Hc(b, this.o, a) && this.unsubscribe() : this.Ic(this.o, a)
        }
    };
    m.error = function(a) {
        if (!this.B) {
            var b = this.ub,
                c = ub.oa;
            if (this.R) c && b.ba ? this.Hc(b, this.R, a) : this.Ic(this.R, a), this.unsubscribe();
            else if (b.ba) c ? (b.Bc = a, b.Ac = !0) : wb(a), this.unsubscribe();
            else {
                this.unsubscribe();
                if (c) throw a;
                wb(a)
            }
        }
    };
    m.complete = function() {
        var a = this;
        if (!this.B) {
            var b = this.ub;
            if (this.A) {
                var c = function() {
                    return a.A.call(a.wa)
                };
                ub.oa && b.ba ? this.Hc(b, c) : this.Ic(c)
            }
            this.unsubscribe()
        }
    };
    m.Ic = function(a, b) {
        try {
            a.call(this.wa, b)
        } catch (c) {
            this.unsubscribe();
            if (ub.oa) throw c;
            wb(c)
        }
    };
    m.Hc = function(a, b, c) {
        if (!ub.oa) throw Error("p");
        try {
            b.call(this.wa, c)
        } catch (d) {
            return ub.oa ? (a.Bc = d, a.Ac = !0) : wb(d), !0
        }
        return !1
    };
    m.xa = function() {
        var a = this.ub;
        this.ub = this.wa = null;
        a.unsubscribe()
    };

    function Gb(a) {
        return a
    };

    function I() {
        return Hb(B.apply(0, arguments))
    }

    function Hb(a) {
        return 0 === a.length ? Gb : 1 === a.length ? a[0] : function(b) {
            return a.reduce(function(c, d) {
                return d(c)
            }, b)
        }
    };

    function Ib(a) {
        return a && "function" === typeof a.next && "function" === typeof a.error && "function" === typeof a.complete
    }
    var Jb = function(a) {
        H.call(this);
        this.destination = a
    };
    x(Jb, H);
    Jb.EMPTY = H.EMPTY;
    Jb.create = H.create;
    var K = function(a) {
        a && (this.V = a)
    };
    m = K.prototype;
    m.kb = function(a) {
        var b = new K;
        b.source = this;
        b.operator = a;
        return b
    };
    m.subscribe = function(a, b, c) {
        var d = this.operator;
        a: {
            if (a) {
                if (a instanceof H || Ib(a) && Eb(a)) break a;
                if (Ib(a)) {
                    a = new Jb(a);
                    break a
                }
            }
            a = a || b || c ? new H(a, b, c) : new H(xb)
        }
        d ? a.add(d.call(a, this.source)) : a.add(this.source || ub.oa && !a.ba ? this.V(a) : this.Nc(a));
        if (ub.oa && a.ba && (a.ba = !1, a.Ac)) throw a.Bc;
        return a
    };
    m.Nc = function(a) {
        try {
            return this.V(a)
        } catch (e) {
            ub.oa && (a.Ac = !0, a.Bc = e);
            var b;
            a: {
                for (b = a; b;) {
                    var c = b.destination,
                        d = b.B;
                    if (b.closed || d) {
                        b = !1;
                        break a
                    }
                    b = c && c instanceof H ? c : null
                }
                b = !0
            }
            b ? a.error(e) : console.warn(e)
        }
    };
    m.forEach = function(a, b) {
        var c = this;
        b = Kb(b);
        return new b(function(d, e) {
            var f = c.subscribe(function(g) {
                try {
                    a(g)
                } catch (h) {
                    e(h), f && f.unsubscribe()
                }
            }, e, d)
        })
    };
    m.V = function(a) {
        var b = this.source;
        return b && b.subscribe(a)
    };
    K.prototype[vb] = function() {
        return this
    };
    K.prototype.h = function() {
        var a = B.apply(0, arguments);
        return 0 === a.length ? this : Hb(a)(this)
    };
    K.create = function(a) {
        return new K(a)
    };

    function Kb(a) {
        a || (a = Promise);
        if (!a) throw Error("q");
        return a
    };
    var Lb = function(a, b) {
        E.call(this);
        this.Le = a;
        this.Cd = b;
        this.closed = !1
    };
    x(Lb, E);
    Lb.EMPTY = E.EMPTY;
    Lb.prototype.unsubscribe = function() {
        if (!this.closed) {
            this.closed = !0;
            var a = this.Le,
                b = a.Da;
            this.Le = null;
            !b || 0 === b.length || a.B || a.closed || (a = b.indexOf(this.Cd), -1 !== a && b.splice(a, 1))
        }
    };
    var Mb = function() {
        function a() {
            this.message = "object unsubscribed";
            this.name = "ObjectUnsubscribedError";
            return this
        }
        a.prototype = Object.create(Error.prototype);
        return a
    }();
    var L = function() {
        this.Da = [];
        this.Bb = this.B = this.closed = !1;
        this.Cc = null
    };
    x(L, K);
    m = L.prototype;
    m.kb = function(a) {
        var b = new Nb(this, this);
        b.operator = a;
        return b
    };
    m.next = function(a) {
        if (this.closed) throw new Mb;
        if (!this.B) {
            var b = this.Da,
                c = b.length;
            b = b.slice();
            for (var d = 0; d < c; d++) b[d].next(a)
        }
    };
    m.error = function(a) {
        if (this.closed) throw new Mb;
        this.Bb = !0;
        this.Cc = a;
        this.B = !0;
        var b = this.Da,
            c = b.length;
        b = b.slice();
        for (var d = 0; d < c; d++) b[d].error(a);
        this.Da.length = 0
    };
    m.complete = function() {
        if (this.closed) throw new Mb;
        this.B = !0;
        var a = this.Da,
            b = a.length;
        a = a.slice();
        for (var c = 0; c < b; c++) a[c].complete();
        this.Da.length = 0
    };
    m.unsubscribe = function() {
        this.closed = this.B = !0;
        this.Da = null
    };
    m.Nc = function(a) {
        if (this.closed) throw new Mb;
        return K.prototype.Nc.call(this, a)
    };
    m.V = function(a) {
        if (this.closed) throw new Mb;
        if (this.Bb) return a.error(this.Cc), E.EMPTY;
        if (this.B) return a.complete(), E.EMPTY;
        this.Da.push(a);
        return new Lb(this, a)
    };
    m.da = function() {
        var a = new K;
        a.source = this;
        return a
    };
    L.create = function(a, b) {
        return new Nb(a, b)
    };
    var Nb = function(a, b) {
        L.call(this);
        this.destination = a;
        this.source = b
    };
    x(Nb, L);
    Nb.create = L.create;
    Nb.prototype.next = function(a) {
        var b = this.destination;
        b && b.next && b.next(a)
    };
    Nb.prototype.error = function(a) {
        var b = this.destination;
        b && b.error && this.destination.error(a)
    };
    Nb.prototype.complete = function() {
        var a = this.destination;
        a && a.complete && this.destination.complete()
    };
    Nb.prototype.V = function(a) {
        return this.source ? this.source.subscribe(a) : E.EMPTY
    };
    var Ob = function(a) {
        L.call(this);
        this.Oc = a
    };
    x(Ob, L);
    Ob.create = L.create;
    Ob.prototype.V = function(a) {
        var b = L.prototype.V.call(this, a);
        b && !b.closed && a.next(this.Oc);
        return b
    };
    Ob.prototype.next = function(a) {
        L.prototype.next.call(this, this.Oc = a)
    };
    p.Object.defineProperties(Ob.prototype, {
        value: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                if (this.Bb) throw this.Cc;
                if (this.closed) throw new Mb;
                return this.Oc
            }
        }
    });
    var Pb = new K(function(a) {
        return a.complete()
    });

    function Qb(a, b) {
        return new K(function(c) {
            var d = new E,
                e = 0;
            d.add(b.u(function() {
                e === a.length ? c.complete() : (c.next(a[e++]), c.closed || d.add(this.u()))
            }));
            return d
        })
    };
    var Rb = function(a) {
        return function(b) {
            for (var c = 0, d = a.length; c < d && !b.closed; c++) b.next(a[c]);
            b.complete()
        }
    };

    function Sb(a, b) {
        return b ? Qb(a, b) : new K(Rb(a))
    };

    function Tb(a) {
        return a && "function" === typeof a.u
    };

    function M() {
        var a = B.apply(0, arguments),
            b = a[a.length - 1];
        return Tb(b) ? (a.pop(), Qb(a, b)) : Sb(a)
    };

    function Ub(a) {
        return new K(function(b) {
            return b.error(a)
        })
    };
    var Vb = {
        now: function() {
            return (Vb.qf || Date).now()
        },
        qf: void 0
    };
    var Wb = function(a, b, c) {
        a = void 0 === a ? Infinity : a;
        b = void 0 === b ? Infinity : b;
        c = void 0 === c ? Vb : c;
        L.call(this);
        this.Jg = c;
        this.Xb = [];
        this.Sd = !1;
        this.Nd = 1 > a ? 1 : a;
        this.Ye = 1 > b ? 1 : b;
        Infinity === b ? (this.Sd = !0, this.next = this.dg) : this.next = this.fg
    };
    x(Wb, L);
    Wb.create = L.create;
    m = Wb.prototype;
    m.dg = function(a) {
        var b = this.Xb;
        b.push(a);
        b.length > this.Nd && b.shift();
        L.prototype.next.call(this, a)
    };
    m.fg = function(a) {
        this.Xb.push({
            time: this.Qd(),
            value: a
        });
        this.Td();
        L.prototype.next.call(this, a)
    };
    m.V = function(a) {
        var b = this.Sd,
            c = b ? this.Xb : this.Td(),
            d = c.length;
        if (this.closed) throw new Mb;
        if (this.B || this.Bb) var e = E.EMPTY;
        else this.Da.push(a), e = new Lb(this, a);
        if (b)
            for (var f = 0; f < d && !a.closed; f++) a.next(c[f]);
        else
            for (f = 0; f < d && !a.closed; f++) a.next(c[f].value);
        this.Bb ? a.error(this.Cc) : this.B && a.complete();
        return e
    };
    m.Qd = function() {
        var a = this.Jg;
        return a ? a.now() : Vb.now()
    };
    m.Td = function() {
        for (var a = this.Qd(), b = this.Nd, c = this.Ye, d = this.Xb, e = d.length, f = 0; f < e && !(a - d[f].time < c);) f++;
        e > b && (f = Math.max(f, e - b));
        0 < f && d.splice(0, f);
        return d
    };
    var Yb = function(a, b) {
        b = void 0 === b ? Xb : b;
        this.Se = a;
        this.now = b
    };
    Yb.prototype.u = function(a, b, c) {
        b = void 0 === b ? 0 : b;
        return (new this.Se(this, a)).u(c, b)
    };
    var Xb = Vb.now;
    var Zb = function() {
        function a() {
            this.message = "no elements in sequence";
            this.name = "EmptyError";
            return this
        }
        a.prototype = Object.create(Error.prototype);
        return a
    }();

    function N(a, b) {
        if (a && "function" === typeof a.kb) return a.kb(b);
        throw new TypeError("r");
    };

    function $b() {
        return function(a) {
            return N(a, new ac)
        }
    }
    var ac = function() {};
    ac.prototype.call = function(a, b) {
        b.vb++;
        a = new bc(a, b);
        var c = b.subscribe(a);
        a.closed || (a.connection = b.connect());
        return c
    };
    var bc = function(a, b) {
        H.call(this, a);
        this.gb = b;
        this.connection = null
    };
    x(bc, H);
    bc.EMPTY = H.EMPTY;
    bc.create = H.create;
    bc.prototype.xa = function() {
        var a = this.gb;
        if (a) {
            this.gb = null;
            var b = a.vb;
            0 >= b ? this.connection = null : (a.vb = b - 1, 1 < b ? this.connection = null : (b = this.connection, a = a.eb, this.connection = null, !a || b && a !== b || a.unsubscribe()))
        } else this.connection = null
    };
    var cc = function(a, b) {
        this.source = a;
        this.Me = b;
        this.vb = 0;
        this.Yb = !1
    };
    x(cc, K);
    cc.create = K.create;
    cc.prototype.V = function(a) {
        return this.lc().subscribe(a)
    };
    cc.prototype.lc = function() {
        var a = this.Zb;
        if (!a || a.B) this.Zb = this.Me();
        return this.Zb
    };
    cc.prototype.connect = function() {
        var a = this.eb;
        a || (this.Yb = !1, a = this.eb = new E, a.add(this.source.subscribe(new dc(this.lc(), this))), a.closed && (this.eb = null, a = E.EMPTY));
        return a
    };
    cc.prototype.Ee = function() {
        return $b()(this)
    };
    var ec, fc = cc.prototype;
    ec = {
        operator: {
            value: null
        },
        vb: {
            value: 0,
            writable: !0
        },
        Zb: {
            value: null,
            writable: !0
        },
        eb: {
            value: null,
            writable: !0
        },
        V: {
            value: fc.V
        },
        Yb: {
            value: fc.Yb,
            writable: !0
        },
        lc: {
            value: fc.lc
        },
        connect: {
            value: fc.connect
        },
        Ee: {
            value: fc.Ee
        }
    };
    var dc = function(a, b) {
        H.call(this);
        this.destination = a;
        this.gb = b
    };
    x(dc, H);
    dc.EMPTY = H.EMPTY;
    dc.create = H.create;
    dc.prototype.R = function(a) {
        this.xa();
        H.prototype.R.call(this, a)
    };
    dc.prototype.A = function() {
        this.gb.Yb = !0;
        this.xa();
        H.prototype.A.call(this)
    };
    dc.prototype.xa = function() {
        var a = this.gb;
        if (a) {
            this.gb = null;
            var b = a.eb;
            a.vb = 0;
            a.Zb = null;
            a.eb = null;
            b && b.unsubscribe()
        }
    };

    function P(a) {
        return function(b) {
            if ("function" !== typeof a) throw new TypeError("s");
            return N(b, new gc(a))
        }
    }
    var gc = function(a) {
        this.H = a;
        this.ca = void 0
    };
    gc.prototype.call = function(a, b) {
        return b.subscribe(new hc(a, this.H, this.ca))
    };
    var hc = function(a, b, c) {
        H.call(this, a);
        this.H = b;
        this.count = 0;
        this.ca = c || this
    };
    x(hc, H);
    hc.EMPTY = H.EMPTY;
    hc.create = H.create;
    hc.prototype.o = function(a) {
        try {
            var b = this.H.call(this.ca, a, this.count++)
        } catch (c) {
            this.destination.error(c);
            return
        }
        this.destination.next(b)
    };
    var ic = "function" === typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator";
    var jc = function(a) {
        return a && "number" === typeof a.length && "function" !== typeof a
    };

    function kc(a) {
        return !!a && "function" !== typeof a.subscribe && "function" === typeof a.then
    };

    function lc(a) {
        return function(b) {
            mc(a, b).catch(function(c) {
                return b.error(c)
            })
        }
    }

    function mc(a, b) {
        var c, d, e, f, g, h;
        return ya(new xa(new ta(function(k) {
            switch (k.Z) {
                case 1:
                    k.Ta = 2;
                    k.za = 3;
                    var l = a[Symbol.asyncIterator];
                    f = void 0 !== l ? l.call(a) : new za(v(a));
                case 5:
                    return l = f.next(), k.Z = 8, {
                        value: l
                    };
                case 8:
                    d = k.Md;
                    if (d.done) {
                        k.Xa(3);
                        break
                    }
                    g = d.value;
                    b.next(g);
                    k.Xa(5);
                    break;
                case 3:
                    k.cd = [k.W];
                    k.Ta = 0;
                    k.za = 0;
                    k.Ta = 0;
                    k.za = 9;
                    if (!d || d.done || !(e = f.return)) {
                        k.Xa(9);
                        break
                    }
                    l = e.call(f);
                    k.Z = 9;
                    return {
                        value: l
                    };
                case 9:
                    k.cd[1] = k.W;
                    k.Ta = 0;
                    k.za = 0;
                    if (c) throw c.error;
                    ra(k, 10, 1);
                    break;
                case 10:
                    ra(k, 4);
                    break;
                case 2:
                    k.Ta =
                        0;
                    l = k.W.de;
                    k.W = null;
                    h = l;
                    c = {
                        error: h
                    };
                    k.Xa(3);
                    break;
                case 4:
                    b.complete(), k.Z = 0
            }
        })))
    };
    var nc = function(a) {
        return function(b) {
            var c = a[ic]();
            do {
                var d = void 0;
                try {
                    d = c.next()
                } catch (e) {
                    b.error(e);
                    return
                }
                if (d.done) {
                    b.complete();
                    break
                }
                b.next(d.value);
                if (b.closed) break
            } while (1);
            "function" === typeof c.return && b.add(function() {
                c.return && c.return()
            });
            return b
        }
    };
    var oc = function(a) {
        return function(b) {
            var c = a[vb]();
            if ("function" !== typeof c.subscribe) throw new TypeError("t");
            return c.subscribe(b)
        }
    };
    var pc = function(a) {
        return function(b) {
            a.then(function(c) {
                b.closed || (b.next(c), b.complete())
            }, function(c) {
                return b.error(c)
            }).then(null, wb);
            return b
        }
    };
    var qc = function(a) {
        if (a && "function" === typeof a[vb]) return oc(a);
        if (jc(a)) return Rb(a);
        if (kc(a)) return pc(a);
        if (a && "function" === typeof a[ic]) return nc(a);
        if (Symbol && Symbol.asyncIterator && a && "function" === typeof a[Symbol.asyncIterator]) return lc(a);
        throw new TypeError("u`" + (Bb(a) ? "an invalid object" : "'" + a + "'"));
    };
    var rc = function(a) {
        H.call(this);
        this.parent = a
    };
    x(rc, H);
    rc.EMPTY = H.EMPTY;
    rc.create = H.create;
    rc.prototype.o = function(a) {
        this.parent.ta(a)
    };
    rc.prototype.R = function(a) {
        this.parent.Pa(a);
        this.unsubscribe()
    };
    rc.prototype.A = function() {
        this.parent.O();
        this.unsubscribe()
    };
    var sc = function(a, b, c) {
        H.call(this);
        this.parent = a;
        this.Ce = b;
        this.og = c
    };
    x(sc, H);
    sc.EMPTY = H.EMPTY;
    sc.create = H.create;
    sc.prototype.o = function(a) {
        this.parent.ta(this.Ce, a, this.og, this)
    };
    sc.prototype.R = function(a) {
        this.parent.Pa(a);
        this.unsubscribe()
    };
    sc.prototype.A = function() {
        this.parent.O(this);
        this.unsubscribe()
    };
    var Q = function() {
        H.apply(this, arguments)
    };
    x(Q, H);
    Q.EMPTY = H.EMPTY;
    Q.create = H.create;
    Q.prototype.ta = function(a) {
        this.destination.next(a)
    };
    Q.prototype.Pa = function(a) {
        this.destination.error(a)
    };
    Q.prototype.O = function() {
        this.destination.complete()
    };
    var R = function() {
        H.apply(this, arguments)
    };
    x(R, H);
    R.EMPTY = H.EMPTY;
    R.create = H.create;
    R.prototype.ta = function(a, b) {
        this.destination.next(b)
    };
    R.prototype.Pa = function(a) {
        this.destination.error(a)
    };
    R.prototype.O = function() {
        this.destination.complete()
    };

    function tc(a, b) {
        if (!b.closed) return a instanceof K ? a.subscribe(b) : qc(a)(b)
    };
    var uc = {};

    function S() {
        var a = B.apply(0, arguments),
            b = void 0,
            c = void 0,
            d = void 0;
        Tb(a[a.length - 1]) && (c = a.pop());
        "function" === typeof a[a.length - 1] && (b = a.pop());
        if (1 === a.length) {
            var e = a[0];
            zb(e) && (a = e);
            Bb(e) && Object.getPrototypeOf(e) === Object.prototype && (d = Object.keys(e), a = d.map(function(f) {
                return e[f]
            }))
        }
        return N(Sb(a, c), new vc(b, d))
    }
    var vc = function(a, b) {
        this.yc = a;
        this.keys = b
    };
    vc.prototype.call = function(a, b) {
        return b.subscribe(new wc(a, this.yc, this.keys))
    };
    var wc = function(a, b, c) {
        R.call(this, a);
        this.yc = b;
        this.keys = c;
        this.active = 0;
        this.values = [];
        this.Qa = []
    };
    x(wc, R);
    wc.EMPTY = R.EMPTY;
    wc.create = R.create;
    m = wc.prototype;
    m.o = function(a) {
        this.values.push(uc);
        this.Qa.push(a)
    };
    m.A = function() {
        var a = this.Qa,
            b = a.length;
        if (0 === b) this.destination.complete();
        else {
            this.cb = this.active = b;
            for (var c = 0; c < b; c++) this.add(tc(a[c], new sc(this, null, c)))
        }
    };
    m.O = function() {
        0 === --this.active && this.destination.complete()
    };
    m.ta = function(a, b, c) {
        var d = this.values,
            e = d[c];
        e = this.cb ? e === uc ? --this.cb : this.cb : 0;
        d[c] = b;
        0 === e && (this.yc ? this.Ve(d) : this.destination.next(this.keys ? this.keys.reduce(function(f, g, h) {
            return f[g] = d[h], f
        }, {}) : d.slice()))
    };
    m.Ve = function(a) {
        try {
            var b = this.yc.apply(this, a)
        } catch (c) {
            this.destination.error(c);
            return
        }
        this.destination.next(b)
    };

    function xc(a, b) {
        if (!a) throw Error("v");
        return new K(function(c) {
            var d = new E;
            d.add(b.u(function() {
                var e = a[Symbol.asyncIterator]();
                d.add(b.u(function() {
                    var f = this;
                    e.next().then(function(g) {
                        g.done ? c.complete() : (c.next(g.value), f.u())
                    })
                }))
            }));
            return d
        })
    };

    function yc(a, b) {
        if (!a) throw Error("v");
        return new K(function(c) {
            var d = new E,
                e;
            d.add(function() {
                e && "function" === typeof e.return && e.return()
            });
            d.add(b.u(function() {
                e = a[ic]();
                d.add(b.u(function() {
                    if (!c.closed) {
                        try {
                            var f = e.next();
                            var g = f.value;
                            var h = f.done
                        } catch (k) {
                            c.error(k);
                            return
                        }
                        h ? c.complete() : (c.next(g), this.u())
                    }
                }))
            }));
            return d
        })
    };

    function zc(a, b) {
        return new K(function(c) {
            var d = new E;
            d.add(b.u(function() {
                var e = a[vb]();
                d.add(e.subscribe({
                    next: function(f) {
                        d.add(b.u(function() {
                            return c.next(f)
                        }))
                    },
                    error: function(f) {
                        d.add(b.u(function() {
                            return c.error(f)
                        }))
                    },
                    complete: function() {
                        d.add(b.u(function() {
                            return c.complete()
                        }))
                    }
                }))
            }));
            return d
        })
    };

    function Ac(a, b) {
        return new K(function(c) {
            var d = new E;
            d.add(b.u(function() {
                return a.then(function(e) {
                    d.add(b.u(function() {
                        c.next(e);
                        d.add(b.u(function() {
                            return c.complete()
                        }))
                    }))
                }, function(e) {
                    d.add(b.u(function() {
                        return c.error(e)
                    }))
                })
            }));
            return d
        })
    };

    function Bc(a) {
        var b = Cc;
        if (null != a) {
            if (a && "function" === typeof a[vb]) return zc(a, b);
            if (kc(a)) return Ac(a, b);
            if (jc(a)) return Qb(a, b);
            if (a && "function" === typeof a[ic] || "string" === typeof a) return yc(a, b);
            if (Symbol && Symbol.asyncIterator && "function" === typeof a[Symbol.asyncIterator]) return xc(a, b)
        }
        throw new TypeError("w`" + (null !== a && typeof a || a));
    };

    function Dc(a) {
        return a instanceof K ? a : new K(qc(a))
    };

    function Ec(a, b) {
        var c = void 0 === c ? Infinity : c;
        if ("function" === typeof b) return function(d) {
            return d.h(Ec(function(e, f) {
                return Dc(a(e, f)).h(P(function(g, h) {
                    return b(e, g, f, h)
                }))
            }, c))
        };
        "number" === typeof b && (c = b);
        return function(d) {
            return N(d, new Fc(a, c))
        }
    }
    var Fc = function(a, b) {
        b = void 0 === b ? Infinity : b;
        this.H = a;
        this.Uc = b
    };
    Fc.prototype.call = function(a, b) {
        return b.subscribe(new Gc(a, this.H, this.Uc))
    };
    var Gc = function(a, b, c) {
        c = void 0 === c ? Infinity : c;
        Q.call(this, a);
        this.destination = a;
        this.H = b;
        this.Uc = c;
        this.ke = !1;
        this.buffer = [];
        this.index = this.active = 0
    };
    x(Gc, Q);
    Gc.EMPTY = Q.EMPTY;
    Gc.create = Q.create;
    Gc.prototype.o = function(a) {
        if (this.active < this.Uc) {
            var b = this.index++;
            try {
                var c = this.H(a, b)
            } catch (d) {
                this.destination.error(d);
                return
            }
            this.active++;
            a = new rc(this);
            this.destination.add(a);
            tc(c, a)
        } else this.buffer.push(a)
    };
    Gc.prototype.A = function() {
        this.ke = !0;
        0 === this.active && 0 === this.buffer.length && this.destination.complete();
        this.unsubscribe()
    };
    Gc.prototype.ta = function(a) {
        this.destination.next(a)
    };
    Gc.prototype.O = function() {
        var a = this.buffer;
        this.active--;
        0 < a.length ? this.o(a.shift()) : 0 === this.active && this.ke && this.destination.complete()
    };

    function Hc(a) {
        a = void 0 === a ? Infinity : a;
        return Ec(Gb, a)
    };

    function Ic() {
        return Hc(1)(M.apply(null, w(B.apply(0, arguments))))
    };

    function Jc(a, b, c) {
        if (Ab(c)) {
            var d = c;
            c = void 0
        }
        return d ? Jc(a, b, c).h(P(function(e) {
            return zb(e) ? d.apply(null, w(e)) : d(e)
        })) : new K(function(e) {
            Kc(a, b, function(f) {
                1 < arguments.length ? e.next(Array.prototype.slice.call(arguments)) : e.next(f)
            }, e, c)
        })
    }

    function Kc(a, b, c, d, e) {
        if (a && "function" === typeof a.addEventListener && "function" === typeof a.removeEventListener) {
            a.addEventListener(b, c, e);
            var f = function() {
                return a.removeEventListener(b, c, e)
            }
        } else if (a && "function" === typeof a.jg && "function" === typeof a.ig) a.jg(b, c), f = function() {
            return a.ig(b, c)
        };
        else if (a && "function" === typeof a.addListener && "function" === typeof a.removeListener) a.addListener(b, c), f = function() {
            return a.removeListener(b, c)
        };
        else if (a && a.length)
            for (var g = 0, h = a.length; g < h; g++) Kc(a[g], b,
                c, d, e);
        else throw new TypeError("x");
        d.add(f)
    };
    var Lc = function() {
        E.call(this)
    };
    x(Lc, E);
    Lc.EMPTY = E.EMPTY;
    Lc.prototype.u = function() {
        return this
    };
    var Nc = function(a, b) {
            var c = B.apply(2, arguments);
            return (null == Mc ? 0 : Mc.setInterval) ? Mc.setInterval.apply(Mc, [a, b].concat(w(c))) : setInterval.apply(null, [a, b].concat(w(c)))
        },
        Mc = void 0;
    var Oc = function(a, b) {
        E.call(this);
        this.aa = a;
        this.Gc = b;
        this.pending = !1
    };
    x(Oc, Lc);
    Oc.EMPTY = Lc.EMPTY;
    m = Oc.prototype;
    m.u = function(a, b) {
        b = void 0 === b ? 0 : b;
        if (this.closed) return this;
        this.state = a;
        a = this.id;
        var c = this.aa;
        null != a && (this.id = this.Mb(c, a, b));
        this.pending = !0;
        this.delay = b;
        this.id = this.id || this.Nb(c, this.id, b);
        return this
    };
    m.Nb = function(a, b, c) {
        c = void 0 === c ? 0 : c;
        return Nc(a.flush.bind(a, this), c)
    };
    m.Mb = function(a, b, c) {
        c = void 0 === c ? 0 : c;
        if (null !== c && this.delay === c && !1 === this.pending) return b;
        ((null == Mc ? void 0 : Mc.clearInterval) || clearInterval)(b)
    };
    m.execute = function(a, b) {
        if (this.closed) return Error("y");
        this.pending = !1;
        if (a = this.Od(a, b)) return a;
        !1 === this.pending && null != this.id && (this.id = this.Mb(this.aa, this.id, null))
    };
    m.Od = function(a) {
        var b = !1,
            c = void 0;
        try {
            this.Gc(a)
        } catch (d) {
            b = !0, c = !!d && d || Error(d)
        }
        if (b) return this.unsubscribe(), c
    };
    m.xa = function() {
        var a = this.id,
            b = this.aa,
            c = b.actions,
            d = c.indexOf(this);
        this.state = this.Gc = null;
        this.pending = !1;
        this.aa = null; - 1 !== d && c.splice(d, 1);
        null != a && (this.id = this.Mb(b, a, null));
        this.delay = null
    };
    var Pc = function(a, b) {
        b = void 0 === b ? Xb : b;
        Yb.call(this, a, b);
        this.actions = [];
        this.active = !1;
        this.zc = void 0
    };
    x(Pc, Yb);
    Pc.prototype.flush = function(a) {
        var b = this.actions;
        if (this.active) b.push(a);
        else {
            var c;
            this.active = !0;
            do
                if (c = a.execute(a.state, a.delay)) break; while (a = b.shift());
            this.active = !1;
            if (c) {
                for (; a = b.shift();) a.unsubscribe();
                throw c;
            }
        }
    };

    function Tc() {
        var a = B.apply(0, arguments),
            b = Infinity,
            c = void 0,
            d = a[a.length - 1];
        Tb(d) ? (c = a.pop(), 1 < a.length && "number" === typeof a[a.length - 1] && (b = a.pop())) : "number" === typeof d && (b = a.pop());
        return !c && 1 === a.length && a[0] instanceof K ? a[0] : Hc(b)(Sb(a, c))
    };

    function Uc() {};
    var Vc = new K(Uc);

    function T(a) {
        return function(b) {
            return N(b, new Wc(a))
        }
    }
    var Wc = function(a) {
        this.ma = a;
        this.ca = void 0
    };
    Wc.prototype.call = function(a, b) {
        return b.subscribe(new Xc(a, this.ma, this.ca))
    };
    var Xc = function(a, b, c) {
        H.call(this, a);
        this.ma = b;
        this.ca = c;
        this.count = 0
    };
    x(Xc, H);
    Xc.EMPTY = H.EMPTY;
    Xc.create = H.create;
    Xc.prototype.o = function(a) {
        try {
            var b = this.ma.call(this.ca, a, this.count++)
        } catch (c) {
            this.destination.error(c);
            return
        }
        b && this.destination.next(a)
    };

    function Yc() {
        var a = B.apply(0, arguments);
        if (1 === a.length)
            if (zb(a[0])) a = a[0];
            else return Dc(a[0]);
        return N(Sb(a), new Zc)
    }
    var Zc = function() {};
    Zc.prototype.call = function(a, b) {
        return b.subscribe(new $c(a))
    };
    var $c = function(a) {
        R.call(this, a);
        this.Cb = !1;
        this.Qa = [];
        this.Qb = []
    };
    x($c, R);
    $c.EMPTY = R.EMPTY;
    $c.create = R.create;
    m = $c.prototype;
    m.o = function(a) {
        this.Qa.push(a)
    };
    m.A = function() {
        var a = this.Qa,
            b = a.length;
        if (0 === b) this.destination.complete();
        else {
            for (var c = 0; c < b && !this.Cb; c++) {
                var d = tc(a[c], new sc(this, null, c));
                this.Qb && this.Qb.push(d);
                this.add(d)
            }
            this.Qa = null
        }
    };
    m.ta = function(a, b, c) {
        if (!this.Cb) {
            this.Cb = !0;
            for (var d = 0; d < this.Qb.length; d++)
                if (d !== c) {
                    var e = this.Qb[d];
                    e.unsubscribe();
                    this.remove(e)
                }
            this.Qb = null
        }
        this.destination.next(b)
    };
    m.O = function(a) {
        this.Cb = !0;
        R.prototype.O.call(this, a)
    };
    m.Pa = function(a) {
        this.Cb = !0;
        R.prototype.Pa.call(this, a)
    };
    (function() {
        function a(b) {
            this.message = "Timeout has occurred";
            this.name = "TimeoutError";
            this.info = void 0 === b ? null : b;
            return this
        }
        a.prototype = Object.create(Error.prototype);
        return a
    })();
    var ad = 1,
        bd, cd = {};

    function dd(a) {
        return a in cd ? (delete cd[a], !0) : !1
    }
    var ed = function(a) {
            var b = ad++;
            cd[b] = !0;
            bd || (bd = Promise.resolve());
            bd.then(function() {
                return dd(b) && a()
            });
            return b
        },
        fd = function(a) {
            dd(a)
        };
    var hd = function() {
            return ((null == gd ? void 0 : gd.setImmediate) || ed).apply(null, w(B.apply(0, arguments)))
        },
        gd = void 0;
    var id = function(a, b) {
        Oc.call(this, a, b);
        this.aa = a;
        this.Gc = b
    };
    x(id, Oc);
    id.EMPTY = Oc.EMPTY;
    id.prototype.Nb = function(a, b, c) {
        c = void 0 === c ? 0 : c;
        if (null !== c && 0 < c) return Oc.prototype.Nb.call(this, a, b, c);
        a.actions.push(this);
        return a.zc || (a.zc = hd(a.flush.bind(a, void 0)))
    };
    id.prototype.Mb = function(a, b, c) {
        c = void 0 === c ? 0 : c;
        if (null !== c && 0 < c || null === c && 0 < this.delay) return Oc.prototype.Mb.call(this, a, b, c);
        0 === a.actions.length && (((null == gd ? void 0 : gd.clearImmediate) || fd)(b), a.zc = void 0)
    };
    var jd = function() {
        Pc.apply(this, arguments)
    };
    x(jd, Pc);
    jd.prototype.flush = function(a) {
        this.active = !0;
        this.zc = void 0;
        var b = this.actions,
            c, d = -1;
        a = a || b.shift();
        var e = b.length;
        do
            if (c = a.execute(a.state, a.delay)) break; while (++d < e && (a = b.shift()));
        this.active = !1;
        if (c) {
            for (; ++d < e && (a = b.shift());) a.unsubscribe();
            throw c;
        }
    };
    var kd = new jd(id);
    var ld = function(a, b) {
        Oc.call(this, a, b);
        this.aa = a;
        this.Gc = b
    };
    x(ld, Oc);
    ld.EMPTY = Oc.EMPTY;
    ld.prototype.u = function(a, b) {
        b = void 0 === b ? 0 : b;
        if (0 < b) return Oc.prototype.u.call(this, a, b);
        this.delay = b;
        this.state = a;
        this.aa.flush(this);
        return this
    };
    ld.prototype.execute = function(a, b) {
        return 0 < b || this.closed ? Oc.prototype.execute.call(this, a, b) : this.Od(a, b)
    };
    ld.prototype.Nb = function(a, b, c) {
        c = void 0 === c ? 0 : c;
        return null !== c && 0 < c || null === c && 0 < this.delay ? Oc.prototype.Nb.call(this, a, b, c) : a.flush(this)
    };
    var md = function() {
        Pc.apply(this, arguments)
    };
    x(md, Pc);
    var Cc = new md(ld);
    var nd = function() {
        function a() {
            this.message = "argument out of range";
            this.name = "ArgumentOutOfRangeError";
            return this
        }
        a.prototype = Object.create(Error.prototype);
        return a
    }();
    (function() {
        function a(b) {
            this.message = b;
            this.name = "NotFoundError";
            return this
        }
        a.prototype = Object.create(Error.prototype);
        return a
    })();
    (function() {
        function a(b) {
            this.message = b;
            this.name = "SequenceError";
            return this
        }
        a.prototype = Object.create(Error.prototype);
        return a
    })();
    var od = function() {
        this.s = new Ia;
        this.i = new Ka;
        this.id = sb()
    };
    od.prototype.gd = function() {
        return Vc
    };
    p.Object.defineProperties(od.prototype, {
        sc: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.id
            }
        }
    });
    var pd = function(a, b) {
        b = Error.call(this, b ? a + ": " + b : String(a));
        this.message = b.message;
        "stack" in b && (this.stack = b.stack);
        this.code = a;
        this.__proto__ = pd.prototype;
        this.name = String(a)
    };
    x(pd, Error);
    var U = function(a) {
        pd.call(this, 1E3, 'sfr:"' + a + '"');
        this.Yf = a;
        this.__proto__ = U.prototype
    };
    x(U, pd);
    var qd = function() {
        pd.call(this, 1003);
        this.__proto__ = qd.prototype
    };
    x(qd, pd);
    var rd = function() {
        pd.call(this, 1009);
        this.__proto__ = rd.prototype
    };
    x(rd, pd);
    var sd = function() {
        pd.call(this, 1007);
        this.__proto__ = qd.prototype
    };
    x(sd, pd);
    var td = function() {
        pd.call(this, 1008);
        this.__proto__ = qd.prototype
    };
    x(td, pd);
    var ud = function() {
        pd.call(this, 1001);
        this.__proto__ = ud.prototype
    };
    x(ud, pd);
    var vd = function(a) {
        pd.call(this, 1004, String(a));
        this.Kf = a;
        this.__proto__ = vd.prototype
    };
    x(vd, pd);
    var xd = function(a) {
        pd.call(this, 1010, a);
        this.__proto__ = wd.prototype
    };
    x(xd, pd);
    var wd = function(a) {
        pd.call(this, 1005, a);
        this.__proto__ = wd.prototype
    };
    x(wd, pd);
    var yd = function(a) {
        var b = B.apply(1, arguments),
            c = this;
        this.mb = [];
        this.mb.push(a);
        b.forEach(function(d) {
            c.mb.push(d)
        })
    };
    yd.prototype.ra = function(a) {
        return this.mb.some(function(b) {
            return b.ra(a)
        })
    };
    yd.prototype.ja = function(a, b) {
        for (var c = 0; c < this.mb.length; c++)
            if (this.mb[c].ra(b)) return this.mb[c].ja(a, b);
        throw new rd;
    };
    var zd = Symbol("time-origin"),
        Ad = Symbol("date"),
        Bd = function(a, b) {
            this.value = a;
            this.timeline = b
        },
        Cd = function(a, b) {
            if (b.timeline !== a.timeline) throw new sd;
            return a.value - b.value
        };
    Bd.prototype.equals = function(a) {
        return 0 === Cd(this, a)
    };
    Bd.prototype.maximum = function(a) {
        if (a.timeline !== this.timeline) throw new sd;
        return this.value >= a.value ? this : a
    };
    Bd.prototype.round = function() {
        return new Bd(Math.round(this.value), this.timeline)
    };
    Bd.prototype.toString = function() {
        return String(this.value)
    };

    function Dd(a) {
        function b(c) {
            return "boolean" === typeof c || "string" === typeof c || "number" === typeof c || void 0 === c || null === c
        }
        return b(a) ? !0 : Array.isArray(a) ? a.every(b) : "object" === typeof a ? Object.keys(a).every(function(c) {
            return "string" === typeof c
        }) && Object.values(a).every(function(c) {
            return Array.isArray(c) ? c.every(b) : b(c)
        }) : !1
    }

    function Ed(a) {
        return Dd(a) ? a : String(a)
    };

    function Fd(a) {
        return function(b) {
            return N(b, function(c) {
                var d = this,
                    e = new E,
                    f = null,
                    g = !1,
                    h;
                f = c.subscribe({
                    next: function(k) {
                        return d.next(k)
                    },
                    error: function(k) {
                        try {
                            h = Dc(a(k, Fd(a)(c)))
                        } catch (l) {
                            d.error(l)
                        }
                        h && (f ? (f.unsubscribe(), f = null, e.add(h.subscribe(d))) : g = !0)
                    },
                    complete: function() {
                        return d.complete()
                    }
                });
                g ? (f.unsubscribe(), f = null, e.add(h.subscribe(d))) : e.add(f);
                return e
            })
        }
    };

    function Gd() {
        var a = B.apply(0, arguments),
            b = void 0;
        "function" === typeof a[a.length - 1] && (b = a.pop());
        1 === a.length && zb(a[0]) && (a = a[0].slice());
        return function(c) {
            var d = Dc([c].concat(w(a))),
                e = new vc(b);
            if (c && "function" === typeof c.kb) c = c.kb.call(d, e);
            else throw new TypeError("r");
            return c
        }
    }

    function Hd() {
        return Gd.apply(null, w(B.apply(0, arguments)))
    };

    function Id(a) {
        a = void 0 === a ? null : a;
        return function(b) {
            return N(b, new Jd(a))
        }
    }
    var Jd = function(a) {
        this.defaultValue = a
    };
    Jd.prototype.call = function(a, b) {
        return b.subscribe(new Kd(a, this.defaultValue))
    };
    var Kd = function(a, b) {
        H.call(this, a);
        this.defaultValue = b;
        this.isEmpty = !0
    };
    x(Kd, H);
    Kd.EMPTY = H.EMPTY;
    Kd.create = H.create;
    Kd.prototype.o = function(a) {
        this.isEmpty = !1;
        this.destination.next(a)
    };
    Kd.prototype.A = function() {
        this.isEmpty && this.destination.next(this.defaultValue);
        this.destination.complete()
    };

    function Ld(a) {
        return function(b) {
            return N(b, new Md(a))
        }
    }
    var Md = function(a) {
        this.Yc = a
    };
    Md.prototype.call = function(a, b) {
        return b.subscribe(new Nd(a, this.Yc))
    };
    var Nd = function(a, b) {
        R.call(this, a);
        this.Yc = b;
        this.Zd = !1;
        this.hc = [];
        this.index = 0
    };
    x(Nd, R);
    Nd.EMPTY = R.EMPTY;
    Nd.create = R.create;
    m = Nd.prototype;
    m.ta = function(a, b, c, d) {
        this.destination.next(a);
        Od(this, d);
        Pd(this)
    };
    m.Pa = function(a) {
        this.R(a)
    };
    m.O = function(a) {
        (a = Od(this, a)) && this.destination.next(a);
        Pd(this)
    };
    m.o = function(a) {
        var b = this.index++;
        try {
            var c = this.Yc(a, b);
            if (c) {
                var d = tc(c, new sc(this, a, 0));
                d && !d.closed && (this.destination.add(d), this.hc.push(d))
            }
        } catch (e) {
            this.destination.error(e)
        }
    };
    m.A = function() {
        this.Zd = !0;
        Pd(this);
        this.unsubscribe()
    };
    var Od = function(a, b) {
            b.unsubscribe();
            var c = a.hc.indexOf(b); - 1 !== c && a.hc.splice(c, 1);
            return b.Ce
        },
        Pd = function(a) {
            a.Zd && 0 === a.hc.length && a.destination.complete()
        };

    function Qd(a) {
        return function(b) {
            return N(b, new Rd(a))
        }
    }
    var Rd = function(a) {
        this.Oa = a;
        this.Cf = void 0
    };
    Rd.prototype.call = function(a, b) {
        return b.subscribe(new Sd(a, this.Oa, this.Cf))
    };
    var Sd = function(a, b, c) {
        Q.call(this, a);
        this.Oa = b;
        this.values = new Set;
        c && this.add(tc(c, new rc(this)))
    };
    x(Sd, Q);
    Sd.EMPTY = Q.EMPTY;
    Sd.create = Q.create;
    m = Sd.prototype;
    m.ta = function() {
        this.values.clear()
    };
    m.Pa = function(a) {
        this.R(a)
    };
    m.o = function(a) {
        this.Oa ? this.We(a) : this.Pd(a, a)
    };
    m.We = function(a) {
        var b = this.destination;
        try {
            var c = this.Oa(a)
        } catch (d) {
            b.error(d);
            return
        }
        this.Pd(c, a)
    };
    m.Pd = function(a, b) {
        var c = this.values;
        c.has(a) || (c.add(a), this.destination.next(b))
    };

    function V(a) {
        return function(b) {
            return N(b, new Td(a))
        }
    }
    var Td = function(a) {
        this.compare = a;
        this.Oa = void 0
    };
    Td.prototype.call = function(a, b) {
        return b.subscribe(new Ud(a, this.compare, this.Oa))
    };
    var Ud = function(a, b, c) {
        H.call(this, a);
        this.Oa = c;
        this.me = !1;
        "function" === typeof b && (this.compare = b)
    };
    x(Ud, H);
    Ud.EMPTY = H.EMPTY;
    Ud.create = H.create;
    Ud.prototype.compare = function(a, b) {
        return a === b
    };
    Ud.prototype.o = function(a) {
        try {
            var b = this.Oa;
            var c = b ? b(a) : a
        } catch (e) {
            return this.destination.error(e)
        }
        b = !1;
        if (this.me) try {
            var d = this.compare;
            b = d(this.key, c)
        } catch (e) {
            return this.destination.error(e)
        } else this.me = !0;
        b || (this.key = c, this.destination.next(a))
    };

    function Vd(a) {
        if (isNaN(a)) throw new TypeError("z");
        if (0 > a) throw new nd;
        return function(b) {
            return 0 === a ? Pb : N(b, new Wd(a))
        }
    }
    var Wd = function(a) {
        this.count = a
    };
    Wd.prototype.call = function(a, b) {
        return b.subscribe(new Xd(a, this.count))
    };
    var Xd = function(a, b) {
        H.call(this, a);
        this.count = b;
        this.Xe = 0
    };
    x(Xd, H);
    Xd.EMPTY = H.EMPTY;
    Xd.create = H.create;
    Xd.prototype.o = function(a) {
        var b = this.count,
            c = ++this.Xe;
        c <= b && (this.destination.next(a), c === b && (this.destination.complete(), this.unsubscribe()))
    };

    function Yd(a) {
        a = void 0 === a ? Zd : a;
        return function(b) {
            return N(b, new $d(a))
        }
    }
    var $d = function(a) {
        this.ad = a
    };
    $d.prototype.call = function(a, b) {
        return b.subscribe(new ae(a, this.ad))
    };
    var ae = function(a, b) {
        H.call(this, a);
        this.ad = b;
        this.ne = !1
    };
    x(ae, H);
    ae.EMPTY = H.EMPTY;
    ae.create = H.create;
    ae.prototype.o = function(a) {
        this.ne = !0;
        this.destination.next(a)
    };
    ae.prototype.A = function() {
        if (this.ne) return this.destination.complete();
        try {
            var a = this.ad()
        } catch (b) {
            a = b
        }
        this.destination.error(a)
    };

    function Zd() {
        return new Zb
    };

    function be() {
        var a = B.apply(0, arguments);
        return function(b) {
            return Ic(b, M.apply(null, w(a)))
        }
    };

    function ce(a) {
        return function(b) {
            return N(b, new de(a, b))
        }
    }
    var de = function(a, b) {
        this.ma = a;
        this.ca = void 0;
        this.source = b
    };
    de.prototype.call = function(a, b) {
        return b.subscribe(new ee(a, this.ma, this.ca, this.source))
    };
    var ee = function(a, b, c, d) {
        H.call(this, a);
        this.ma = b;
        this.ca = c;
        this.source = d;
        this.index = 0;
        this.ca = c || this
    };
    x(ee, H);
    ee.EMPTY = H.EMPTY;
    ee.create = H.create;
    ee.prototype.O = function(a) {
        this.destination.next(a);
        this.destination.complete()
    };
    ee.prototype.o = function(a) {
        var b = !1;
        try {
            b = this.ma.call(this.ca, a, this.index++, this.source)
        } catch (c) {
            this.destination.error(c);
            return
        }
        b || this.O(!1)
    };
    ee.prototype.A = function() {
        this.O(!0)
    };

    function fe() {
        return function(a) {
            return N(a, new ge)
        }
    }
    var ge = function() {};
    ge.prototype.call = function(a, b) {
        return b.subscribe(new he(a))
    };
    var he = function() {
        H.apply(this, arguments)
    };
    x(he, H);
    he.EMPTY = H.EMPTY;
    he.create = H.create;
    he.prototype.o = function() {};

    function ie() {
        if (isNaN(1)) throw new TypeError("z");
        return function(a) {
            return N(a, new je)
        }
    }
    var je = function() {
        this.total = 1
    };
    je.prototype.call = function(a, b) {
        return b.subscribe(new ke(a, this.total))
    };
    var ke = function(a, b) {
        H.call(this, a);
        this.total = b;
        this.Fe = [];
        this.count = 0
    };
    x(ke, H);
    ke.EMPTY = H.EMPTY;
    ke.create = H.create;
    ke.prototype.o = function(a) {
        var b = this.Fe,
            c = this.total,
            d = this.count++;
        b.length < c ? b.push(a) : b[d % c] = a
    };
    ke.prototype.A = function() {
        var a = this.destination,
            b = this.count;
        if (0 < b)
            for (var c = this.count >= this.total ? this.total : this.count, d = this.Fe, e = 0; e < c; e++) {
                var f = b++ % c;
                a.next(d[f])
            }
        a.complete()
    };

    function le(a, b) {
        var c = 2 <= arguments.length;
        return function(d) {
            return d.h(a ? T(function(e, f) {
                return a(e, f, d)
            }) : Gb, ie(), c ? Id(b) : Yd(function() {
                return new Zb
            }))
        }
    };

    function me(a) {
        return function(b) {
            return N(b, new ne(a))
        }
    }
    var ne = function(a) {
        this.value = a
    };
    ne.prototype.call = function(a, b) {
        return b.subscribe(new oe(a, this.value))
    };
    var oe = function(a, b) {
        H.call(this, a);
        this.value = b
    };
    x(oe, H);
    oe.EMPTY = H.EMPTY;
    oe.create = H.create;
    oe.prototype.o = function() {
        this.destination.next(this.value)
    };

    function pe(a, b) {
        var c = !1;
        2 <= arguments.length && (c = !0);
        return function(d) {
            return N(d, new qe(a, b, c))
        }
    }
    var qe = function(a, b, c) {
        this.Pc = a;
        this.seed = b;
        this.If = void 0 === c ? !1 : c
    };
    qe.prototype.call = function(a, b) {
        return b.subscribe(new re(a, this.Pc, this.seed, this.If))
    };
    var re = function(a, b, c, d) {
        H.call(this, a);
        this.Pc = b;
        this.Jc = c;
        this.Rd = d;
        this.index = 0
    };
    x(re, H);
    re.EMPTY = H.EMPTY;
    re.create = H.create;
    re.prototype.o = function(a) {
        var b = this.destination;
        if (this.Rd) {
            var c = this.index++;
            try {
                var d = this.Pc(this.Jc, a, c)
            } catch (e) {
                b.error(e);
                return
            }
            this.Jc = d;
            b.next(d)
        } else this.Jc = a, this.Rd = !0, b.next(a)
    };

    function se(a) {
        return function(b) {
            var c = "function" === typeof a ? a : function() {
                return a
            };
            var d = Object.create(b, ec);
            d.source = b;
            d.Me = c;
            return d
        }
    };

    function te() {
        var a = B.apply(0, arguments);
        1 === a.length && zb(a[0]) && (a = a[0]);
        return function(b) {
            return N(b, new ue(a))
        }
    }
    var ue = function(a) {
        this.td = a
    };
    ue.prototype.call = function(a, b) {
        return b.subscribe(new ve(a, this.td))
    };
    var ve = function(a, b) {
        Q.call(this, a);
        this.destination = a;
        this.td = b
    };
    x(ve, Q);
    ve.EMPTY = Q.EMPTY;
    ve.create = Q.create;
    ve.prototype.Pa = function() {
        we(this)
    };
    ve.prototype.O = function() {
        we(this)
    };
    ve.prototype.R = function() {
        we(this);
        this.unsubscribe()
    };
    ve.prototype.A = function() {
        we(this);
        this.unsubscribe()
    };
    var we = function(a) {
        var b = a.td.shift();
        if (b) {
            var c = new rc(a);
            a.destination.add(c);
            tc(b, c)
        } else a.destination.complete()
    };

    function xe(a) {
        var b = new Wb(a, void 0, void 0);
        return function(c) {
            return se(function() {
                return b
            })(c)
        }
    };

    function ye() {
        var a = void 0 === a ? Infinity : a;
        return function(b) {
            return 0 >= a ? Pb : N(b, function(c) {
                var d = this,
                    e = 0,
                    f = new E,
                    g, h = function() {
                        var k = !1;
                        g = c.subscribe({
                            next: function(l) {
                                return d.next(l)
                            },
                            error: function(l) {
                                return d.error(l)
                            },
                            complete: function() {
                                ++e < a ? g ? (g.unsubscribe(), g = null, h()) : k = !0 : d.complete()
                            }
                        });
                        k ? (g.unsubscribe(), g = null, h()) : f.add(g)
                    };
                h();
                return f
            })
        }
    };

    function ze() {
        return new L
    }

    function Ae() {
        return function(a) {
            return $b()(se(ze)(a))
        }
    };

    function W() {
        var a = B.apply(0, arguments),
            b = a[a.length - 1];
        return Tb(b) ? (a.pop(), function(c) {
            return Ic(a, c, b)
        }) : function(c) {
            return Ic(a, c)
        }
    };
    var Be = function(a, b, c) {
        b = void 0 === b ? 0 : b;
        c = void 0 === c ? kd : c;
        this.source = a;
        this.delayTime = b;
        this.aa = c;
        0 > b && (this.delayTime = 0);
        Tb(c) || (this.aa = kd)
    };
    x(Be, K);
    Be.create = K.create;
    Be.rf = function(a) {
        return this.add(a.source.subscribe(a.Cd))
    };
    Be.prototype.V = function(a) {
        return this.aa.u(Be.rf, this.delayTime, {
            source: this.source,
            Cd: a
        })
    };

    function Ce() {
        var a = void 0 === a ? 0 : a;
        return function(b) {
            return N(b, new De(a))
        }
    }
    var De = function(a) {
        this.aa = Cc;
        this.delay = a
    };
    De.prototype.call = function(a, b) {
        return (new Be(b, this.delay, this.aa)).subscribe(a)
    };

    function X(a) {
        return function(b) {
            return N(b, new Ee(a))
        }
    }
    var Ee = function(a) {
        this.H = a
    };
    Ee.prototype.call = function(a, b) {
        return b.subscribe(new Fe(a, this.H))
    };
    var Fe = function(a, b) {
        Q.call(this, a);
        this.destination = a;
        this.H = b;
        this.index = 0
    };
    x(Fe, Q);
    Fe.EMPTY = Q.EMPTY;
    Fe.create = Q.create;
    m = Fe.prototype;
    m.o = function(a) {
        var b = this.index++;
        try {
            var c = this.H(a, b)
        } catch (d) {
            this.destination.error(d);
            return
        }(a = this.rc) && a.unsubscribe();
        a = new rc(this);
        this.destination.add(a);
        this.rc = a;
        tc(c, a)
    };
    m.A = function() {
        var a = this.rc;
        a && !a.closed || Q.prototype.A.call(this);
        this.unsubscribe()
    };
    m.xa = function() {
        this.rc = void 0
    };
    m.O = function() {
        this.rc = void 0;
        this.B && Q.prototype.A.call(this)
    };
    m.ta = function(a) {
        this.destination.next(a)
    };

    function Ge(a, b) {
        b = void 0 === b ? !1 : b;
        return function(c) {
            return N(c, new He(a, b))
        }
    }
    var He = function(a, b) {
        this.ma = a;
        this.ld = b
    };
    He.prototype.call = function(a, b) {
        return b.subscribe(new Ie(a, this.ma, this.ld))
    };
    var Ie = function(a, b, c) {
        H.call(this, a);
        this.ma = b;
        this.ld = c;
        this.index = 0
    };
    x(Ie, H);
    Ie.EMPTY = H.EMPTY;
    Ie.create = H.create;
    Ie.prototype.o = function(a) {
        var b = this.destination;
        try {
            var c = this.ma(a, this.index++)
        } catch (d) {
            b.error(d);
            return
        }
        b = this.destination;
        c ? b.next(a) : (this.ld && b.next(a), b.complete())
    };

    function Je(a, b, c) {
        return function(d) {
            return N(d, new Ke(a, b, c))
        }
    }
    var Ke = function(a, b, c) {
        this.eg = a;
        this.error = b;
        this.complete = c
    };
    Ke.prototype.call = function(a, b) {
        return b.subscribe(new Le(a, this.eg, this.error, this.complete))
    };
    var Le = function(a, b, c, d) {
        H.call(this, a);
        this.Kc = this.Lc = this.Mc = Uc;
        this.Lc = c || Uc;
        this.Kc = d || Uc;
        Ab(b) ? (this.wa = this, this.Mc = b) : b && (this.wa = b, this.Mc = b.next || Uc, this.Lc = b.error || Uc, this.Kc = b.complete || Uc)
    };
    x(Le, H);
    Le.EMPTY = H.EMPTY;
    Le.create = H.create;
    Le.prototype.o = function(a) {
        try {
            this.Mc.call(this.wa, a)
        } catch (b) {
            this.destination.error(b);
            return
        }
        this.destination.next(a)
    };
    Le.prototype.R = function(a) {
        try {
            this.Lc.call(this.wa, a)
        } catch (b) {
            this.destination.error(b);
            return
        }
        this.destination.error(a)
    };
    Le.prototype.A = function() {
        try {
            this.Kc.call(this.wa)
        } catch (a) {
            this.destination.error(a);
            return
        }
        return this.destination.complete()
    };

    function Me() {
        var a = B.apply(0, arguments);
        return function(b) {
            var c;
            "function" === typeof a[a.length - 1] && (c = a.pop());
            return N(b, new Ne(a, c))
        }
    }
    var Ne = function(a, b) {
        this.Qa = a;
        this.H = b
    };
    Ne.prototype.call = function(a, b) {
        return b.subscribe(new Oe(a, this.Qa, this.H))
    };
    var Oe = function(a, b, c) {
        R.call(this, a);
        this.H = c;
        this.cb = [];
        a = b.length;
        this.values = Array(a);
        for (c = 0; c < a; c++) this.cb.push(c);
        for (c = 0; c < a; c++) this.add(tc(b[c], new sc(this, void 0, c)))
    };
    x(Oe, R);
    Oe.EMPTY = R.EMPTY;
    Oe.create = R.create;
    Oe.prototype.ta = function(a, b, c) {
        this.values[c] = b;
        b = this.cb;
        0 < b.length && (c = b.indexOf(c), -1 !== c && b.splice(c, 1))
    };
    Oe.prototype.O = function() {};
    Oe.prototype.o = function(a) {
        0 === this.cb.length && (a = [a].concat(w(this.values)), this.H ? this.Ue(a) : this.destination.next(a))
    };
    Oe.prototype.Ue = function(a) {
        try {
            var b = this.H.apply(this, a)
        } catch (c) {
            this.destination.error(c);
            return
        }
        this.destination.next(b)
    };
    var Pe = function(a) {
        this.ka = a
    };
    Pe.prototype.ping = function() {
        var a = this,
            b = M.apply(null, w(B.apply(0, arguments))).h(Ec(function(c) {
                return Qe(a, c)
            }), ce(function(c) {
                return c
            }), xe(1));
        b.connect();
        return b
    };
    var Qe = function(a, b) {
        var c = new Wb(1);
        Re(a.ka, b, function() {
            c.next(!0);
            c.complete()
        }, function() {
            c.next(!1);
            c.complete()
        });
        return c
    };
    p.Object.defineProperties(Pe.prototype, {
        wb: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.ka.ra()
            }
        }
    });

    function Se(a, b) {
        var c = !1;
        return new K(function(d) {
            var e = a.setTimeout(function() {
                c = !0;
                d.next(!0);
                d.complete()
            }, b);
            return function() {
                c || a.clearTimeout(e)
            }
        })
    };
    var Te = function(a) {
        this.ka = a;
        this.timeline = Ad
    };
    m = Te.prototype;
    m.setTimeout = function(a, b) {
        return Number(this.ka.setTimeout(function() {
            return a()
        }, b))
    };
    m.clearTimeout = function(a) {
        this.ka.clearTimeout(a)
    };
    m.now = function() {
        return new Bd(Date.now(), this.timeline)
    };
    m.interval = function(a, b) {
        var c = this.Na(a).subscribe(b);
        return function() {
            return void c.unsubscribe()
        }
    };
    m.Na = function(a) {
        return Se(this, a).h(ye(), pe(function(b) {
            return b + 1
        }, -1))
    };
    m.pa = function() {
        return !0
    };
    var Ue = function(a, b, c) {
        this.context = a;
        this.Lb = b;
        this.ze = c
    };
    Ue.prototype.ra = function(a) {
        return (void 0 === a || a === this.ze) && this.Lb.wb
    };
    Ue.prototype.ja = function(a, b) {
        if (!this.ra(b)) throw new rd;
        return new Ve(this.context, this.Lb, this.ze, a)
    };
    var Ve = function(a, b, c, d) {
        var e = this;
        this.Lb = b;
        this.method = c;
        this.url = d;
        this.tc = !0;
        this.ef = a.gd().subscribe(function() {
            e.sendNow()
        })
    };
    Ve.prototype.deactivate = function() {
        this.tc = !1
    };
    Ve.prototype.sendNow = function() {
        if (this.tc)
            if (this.ef.unsubscribe(), this.Lb.wb) try {
                this.Lb.ping(this.url), this.tc = !1
            } catch (a) {} else this.tc = !1
    };

    function We(a) {
        var b = Object.assign({}, a);
        delete b.timestamp;
        return {
            timestamp: new Bd(a.timestamp, Ad),
            value: b
        }
    };

    function Xe(a) {
        return void 0 !== a && "number" === typeof a.x && "number" === typeof a.y && "number" === typeof a.width && "number" === typeof a.height
    };
    var Ze = function(a, b, c) {
        c = void 0 === c ? null : c;
        od.call(this);
        this.ka = a;
        this.Mg = b;
        this.Va = c;
        this.zd = new Wb(3);
        this.zd.h(T(function(d) {
            return "sessionStart" === d.value.type
        }));
        this.yg = this.zd.h(T(function(d) {
            return "sessionFinish" === d.value.type
        }));
        this.oe = new Wb(1);
        this.Ng = new Wb;
        this.ge = new Wb(10);
        this.l = new Te(a);
        this.M = new Ue(this, new Pe(a), "GET");
        this.Rf = this.ka.ra();
        Ye(this)
    };
    x(Ze, od);
    Ze.prototype.validate = function() {
        return this.Rf
    };
    var Ye = function(a) {
        $e(a.ka, function(e) {
            return void a.zd.next(We(e))
        }, a.Mg);
        a.ka.addEventListener("geometryChange", function(e) {
            if (void 0 === e) var f = !1;
            else {
                f = e.data;
                var g;
                (g = void 0 === f) || (g = f.viewport, g = void 0 !== g && "number" === typeof g.width && "number" === typeof g.height);
                g ? (f = f.adView, f = void 0 !== f && "number" === typeof f.percentageInView && Xe(f.geometry) && Xe(f.onScreenGeometry)) : f = !1
            }
            f && a.ge.next(We(e))
        });
        for (var b = {}, c = v("loaded start firstQuartile midpoint thirdQuartile complete pause resume bufferStart bufferFinish skipped volumeChange playerStateChange adUserInteraction".split(" ")),
                d = c.next(); !d.done; b = {
                Vb: b.Vb
            }, d = c.next()) b.Vb = d.value, a.ka.addEventListener(b.Vb, function(e) {
            return function(f) {
                f.type === e.Vb && a.Ng.next(We(f))
            }
        }(b));
        a.ka.addEventListener("impression", function(e) {
            a.oe.next(We(e))
        })
    };
    p.Object.defineProperties(Ze.prototype, {
        global: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return af
            }
        }
    });
    var af = {};

    function bf() {
        return D("iPhone") && !D("iPod") && !D("iPad")
    }

    function cf() {
        bf() || D("iPad") || D("iPod")
    };
    var df = function(a) {
        df[" "](a);
        return a
    };
    df[" "] = function() {};
    var ef = function(a, b) {
        try {
            return df(a[b]), !0
        } catch (c) {}
        return !1
    };
    var ff = D("Opera"),
        gf = D("Trident") || D("MSIE"),
        hf = D("Edge"),
        jf = D("Gecko") && !(kb(nb(), "WebKit") && !D("Edge")) && !(D("Trident") || D("MSIE")) && !D("Edge"),
        kf = kb(nb(), "WebKit") && !D("Edge");
    kf && D("Mobile");
    D("Macintosh");
    D("Windows");
    D("Linux") || D("CrOS");
    var lf = Ca.navigator || null;
    lf && (lf.appVersion || "").indexOf("X11");
    D("Android");
    bf();
    D("iPad");
    D("iPod");
    cf();
    kb(nb(), "KaiOS");
    var mf = function() {
            var a = Ca.document;
            return a ? a.documentMode : void 0
        },
        nf;
    a: {
        var of = "",
        pf = function() {
            var a = nb();
            if (jf) return /rv:([^\);]+)(\)|;)/.exec(a);
            if (hf) return /Edge\/([\d\.]+)/.exec(a);
            if (gf) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (kf) return /WebKit\/(\S+)/.exec(a);
            if (ff) return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();pf && ( of = pf ? pf[1] : "");
        if (gf) {
            var qf = mf();
            if (null != qf && qf > parseFloat( of )) {
                nf = String(qf);
                break a
            }
        }
        nf = of
    }
    var rf = nf,
        uf;
    if (Ca.document && gf) {
        var vf = mf();
        uf = vf ? vf : parseInt(rf, 10) || void 0
    } else uf = void 0;
    var wf = uf;
    ob();
    bf() || D("iPod");
    D("iPad");
    rb();
    qb();
    pb() && cf();
    var xf = {},
        yf = null,
        zf = jf || kf || "function" == typeof Ca.btoa,
        Af = function(a) {
            var b;
            Sa(Ea(a), "encodeByteArray takes an array as a parameter");
            void 0 === b && (b = 0);
            if (!yf) {
                yf = {};
                for (var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), d = ["+/=", "+/", "-_=", "-_.", "-_"], e = 0; 5 > e; e++) {
                    var f = c.concat(d[e].split(""));
                    xf[e] = f;
                    for (var g = 0; g < f.length; g++) {
                        var h = f[g],
                            k = yf[h];
                        void 0 === k ? yf[h] = g : Sa(k === g)
                    }
                }
            }
            b = xf[b];
            c = Array(Math.floor(a.length / 3));
            d = b[64] || "";
            for (e = f = 0; f < a.length - 2; f += 3) {
                k = a[f];
                var l = a[f + 1];
                h = a[f + 2];
                g = b[k >> 2];
                k = b[(k & 3) << 4 | l >> 4];
                l = b[(l & 15) << 2 | h >> 6];
                h = b[h & 63];
                c[e++] = "" + g + k + l + h
            }
            g = 0;
            h = d;
            switch (a.length - f) {
                case 2:
                    g = a[f + 1], h = b[(g & 15) << 2] || d;
                case 1:
                    a = a[f], c[e] = "" + b[a >> 2] + b[(a & 3) << 4 | g >> 4] + h + d
            }
            return c.join("")
        };
    var Bf = "undefined" !== typeof Uint8Array,
        Cf = {};
    var Df, Ff = function(a) {
        if (Cf !== Cf) throw Error("B");
        this.Gd = a;
        if (null != a && 0 === a.length) throw Error("C");
        this.dontPassByteStringToStructuredClone = Ef
    };
    Ff.prototype.isEmpty = function() {
        return null == this.Gd
    };

    function Ef() {};
    var Gf = "function" === typeof Symbol && "symbol" === typeof Symbol() ? Symbol("INTERNAL_ARRAY_STATE") : void 0;

    function Hf(a, b) {
        Sa((b & 255) == b);
        $a(a, "state is only maintained on arrays.");
        if (Gf) return a[Gf] |= b;
        if (void 0 !== a.qa) return a.qa |= b;
        Object.defineProperties(a, {
            qa: {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !1
            }
        });
        return b
    }
    var If = Object.getOwnPropertyDescriptor(Array.prototype, "Sf");
    Object.defineProperties(Array.prototype, {
        Sf: {
            get: function() {
                function a(e, f) {
                    e & b && c.push(f)
                }
                var b = Jf(this),
                    c = [];
                a(1, "IS_REPEATED_FIELD");
                a(2, "IS_IMMUTABLE_ARRAY");
                a(4, "IS_API_FORMATTED");
                a(8, "ONLY_MUTABLE_VALUES");
                a(16, "MUTABLE_REFERENCES_ARE_OWNED");
                a(32, "CONSTRUCTED");
                a(64, "TRANSFERRED");
                a(128, "IS_FIXED_GROUP");
                var d = c.join(",");
                return If ? If.get.call(this) + "|" + d : d
            },
            configurable: !0,
            enumerable: !1
        }
    });

    function Jf(a) {
        $a(a, "state is only maintained on arrays.");
        a = Gf ? a[Gf] : a.qa;
        return null == a ? 0 : a
    }

    function Kf(a, b) {
        $a(a, "state is only maintained on arrays.");
        Sa((b & 255) == b);
        Gf ? a[Gf] = b : void 0 !== a.qa ? a.qa = b : Object.defineProperties(a, {
            qa: {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !1
            }
        })
    }

    function Lf(a) {
        return !!(Jf(a) & 2)
    }

    function Mf(a) {
        Hf(a, 16);
        return a
    }

    function Nf(a, b) {
        Kf(b, (a | 0) & -51)
    }

    function Of(a, b) {
        Kf(b, (a | 18) & -41)
    };
    var Pf = {};

    function Qf(a) {
        return null !== a && "object" === typeof a && !Array.isArray(a) && a.constructor === Object
    }
    var Rf, Sf, Tf = [];
    Kf(Tf, 23);
    Sf = Object.freeze(Tf);

    function Uf() {}

    function Vf(a) {
        var b = a.length;
        (b = b ? a[b - 1] : void 0) && Qf(b) ? b.g = 1 : (b = {}, a.push((b.g = 1, b)))
    };
    var Wf;

    function Xf(a, b) {
        Sa(!!(Jf(b) & 16));
        Wf = b;
        a = new a(b);
        Wf = void 0;
        return a
    };

    function Yf(a) {
        return a.displayName || a.name || "unknown type name"
    };
    var Zf = function() {
        throw Error("G");
    };
    if ("undefined" != typeof Symbol && "undefined" != typeof Symbol.hasInstance) {
        var $f = function() {
                throw Error("H");
            },
            ag = {};
        Object.defineProperties(Zf, (ag[Symbol.hasInstance] = {
            value: $f,
            configurable: !1,
            writable: !1,
            enumerable: !1
        }, ag));
        Sa(Zf[Symbol.hasInstance] === $f, "defineProperties did not work: was it monkey-patched?")
    };

    function bg(a) {
        switch (typeof a) {
            case "number":
                return isFinite(a) ? a : String(a);
            case "object":
                if (a)
                    if (Array.isArray(a)) {
                        if (0 !== (Jf(a) & 128)) return a = Array.prototype.slice.call(a), Vf(a), a
                    } else {
                        if (Bf && null != a && a instanceof Uint8Array) return Af(a);
                        if (a instanceof Ff) {
                            var b = a.Gd;
                            return null == b ? "" : "string" === typeof b ? b : a.Gd = Af(b)
                        }
                    }
        }
        return a
    };

    function cg(a, b, c, d) {
        if (null != a) {
            if (Array.isArray(a)) a = dg(a, b, c, void 0 !== d);
            else if (Qf(a)) {
                var e = {},
                    f;
                for (f in a) e[f] = cg(a[f], b, c, d);
                a = e
            } else a = b(a, d);
            return a
        }
    }

    function dg(a, b, c, d) {
        var e = Jf(a);
        d = d ? !!(e & 16) : void 0;
        a = Array.prototype.slice.call(a);
        for (var f = 0; f < a.length; f++) a[f] = cg(a[f], b, c, d);
        c(e, a);
        return a
    }

    function eg(a) {
        return a.Ib === Pf ? a.toJSON() : bg(a)
    }

    function fg(a, b) {
        a & 128 && Vf(b)
    };
    var gg = function(a) {
            var b = a.nb + a.Sa;
            return a.ha || (a.ha = a.F[b] = {})
        },
        hg = function(a, b, c) {
            return -1 === b ? null : b >= a.nb ? a.ha ? a.ha[b] : void 0 : c && a.ha && (c = a.ha[b], null != c) ? c : a.F[b + a.Sa]
        },
        jg = function(a, b, c, d) {
            if (Lf(a.F)) throw Error("D");
            return ig(a, b, c, d)
        };

    function ig(a, b, c, d) {
        a.qe && (a.qe = void 0);
        if (b >= a.nb || d) return gg(a)[b] = c, a;
        a.F[b + a.Sa] = c;
        (c = a.ha) && b in c && delete c[b];
        return a
    }

    function kg(a, b) {
        Sa(a && Lf(b.F) ? Lf(a.F) : !0);
        return a
    }
    var lg = function(a, b, c) {
            var d = hg(a, 3, c);
            var e = !1;
            var f = null == d || "object" !== typeof d || (e = Array.isArray(d)) || d.Ib !== Pf ? e ? new b(d) : void 0 : d;
            f !== d && null != f && (ig(a, 3, f, c), Hf(f.F, Jf(a.F) & 18));
            return kg(f, a)
        },
        og = function(a) {
            var b = mg;
            var c = void 0 === c ? !1 : c;
            b = lg(a, b, c);
            if (null == b) return b;
            if (!Lf(a.F)) {
                var d = b;
                if (Lf(d.F)) {
                    var e = ng(d, !1);
                    e.qe = d;
                    d = e
                }
                d !== b && (b = d, ig(a, 3, b, c))
            }
            return kg(b, a)
        },
        pg = function(a, b, c, d, e) {
            if (Lf(a.F)) throw Error("D");
            if (null != d) {
                $a(d);
                var f = [];
                Hf(f, 1);
                for (var g = !1, h = 0; h < d.length; h++) {
                    var k =
                        f,
                        l = h,
                        n = d[h],
                        r = Ta(b);
                    if (!(n instanceof r)) throw Error("F`" + Yf(r) + "`" + (n && Yf(n.constructor)));
                    k[l] = n.F;
                    g = g || Lf(f[h])
                }
                a.Wa || (a.Wa = {});
                a.Wa[c] = d;
                b = f;
                g ? (Sa(!0), $a(b, "state is only maintained on arrays."), Gf ? b[Gf] && (b[Gf] &= -9) : void 0 !== b.qa && (b.qa &= -9)) : Hf(b, 8)
            } else a.Wa && (a.Wa[c] = void 0), f = Sf;
            return ig(a, c, f, e)
        };

    function qg(a, b) {
        return null == a ? b : a
    }
    var rg = function(a, b) {
        return qg(hg(a, b), 0)
    };

    function sg(a, b, c) {
        c = void 0 === c ? Of : c;
        if (null != a) {
            if (Bf && a instanceof Uint8Array) return bb(a, Uint8Array), a.length ? new Ff(new Uint8Array(a)) : Df || (Df = new Ff(null));
            if (Array.isArray(a)) {
                var d = Jf(a);
                if (d & 2) return a;
                if (b && !(d & 32) && (d & 16 || 0 === d)) return Kf(a, d | 2), a;
                a = dg(a, sg, c, !0);
                b = Jf(a);
                b & 4 && b & 2 && Object.freeze(a);
                return a
            }
            return a.Ib === Pf ? tg(a) : a
        }
    }

    function ug(a, b, c, d, e, f, g) {
        (a = a.Wa && a.Wa[c]) ? (d = 0 < a.length ? a[0].constructor : void 0, f = Jf(a), f & 2 || (a = db(a, tg), Of(f, a), Object.freeze(a)), pg(b, d, c, a, e)) : jg(b, c, sg(d, f, g), e)
    }

    function tg(a) {
        Sa(a.Ib === Pf);
        if (Lf(a.F)) return a;
        a = ng(a, !0);
        Hf(a.F, 2);
        return a
    }

    function ng(a, b) {
        Sa(a.Ib === Pf);
        var c = a.F,
            d = Mf([]),
            e = a.constructor.Zf;
        e && d.push(e);
        a.ha && (d.length = c.length, d.fill(void 0, d.length, c.length), d[d.length - 1] = {});
        0 !== (Jf(c) & 128) && Vf(d);
        b = b || Lf(a.F) ? Of : Nf;
        d = Xf(a.constructor, d);
        a.re && (d.re = a.re.slice());
        e = !!(Jf(c) & 16);
        for (var f = 0; f < c.length; f++) {
            var g = c[f];
            if (f === c.length - 1 && Qf(g))
                for (var h in g) {
                    var k = +h;
                    Number.isNaN(k) ? gg(d)[k] = g[k] : ug(a, d, k, g[h], !0, e, b)
                } else ug(a, d, f - a.Sa, g, !1, e, b)
        }
        return d
    };
    if ("undefined" !== typeof Proxy) {
        var wg = vg;
        new Proxy({}, {
            getPrototypeOf: wg,
            setPrototypeOf: wg,
            isExtensible: wg,
            preventExtensions: wg,
            getOwnPropertyDescriptor: wg,
            defineProperty: wg,
            has: wg,
            get: wg,
            set: wg,
            deleteProperty: wg,
            apply: wg,
            construct: wg
        })
    }

    function vg() {
        throw Error("I");
        throw Error();
    };
    var xg = function(a, b, c) {
        bb(this, xg, "The message constructor should only be used by subclasses");
        Sa(this.constructor !== xg, "Message is an abstract class and cannot be directly constructed");
        null == a && (a = Wf);
        Wf = void 0;
        var d = this.constructor.qh || 0,
            e = 0 < d,
            f = this.constructor.Zf,
            g = !1;
        if (null == a) {
            a = f ? [f] : [];
            var h = !0;
            Kf(a, 48)
        } else {
            if (!Array.isArray(a)) throw Error("J`" + JSON.stringify(a) + "`" + Da(a));
            if (Object.isFrozen(a) || !Object.isExtensible(a) || Object.isSealed(a)) throw Error("K");
            if (f && f !== a[0]) throw Error("L`" +
                f + "`" + JSON.stringify(a[0]) + "`" + Da(a[0]));
            var k = Hf(a, 0),
                l = k;
            if (h = 0 !== (16 & l))(g = 0 !== (32 & l)) || (l |= 32);
            if (e)
                if (128 & l) d = 0;
                else {
                    if (0 < a.length) {
                        var n = a[a.length - 1];
                        if (Qf(n) && "g" in n) {
                            d = 0;
                            l |= 128;
                            delete n.g;
                            var r = !0,
                                q;
                            for (q in n) {
                                r = !1;
                                break
                            }
                            r && a.pop()
                        }
                    }
                }
            else if (128 & l) throw Error();
            k !== l && Kf(a, l)
        }
        this.Sa = (f ? 0 : -1) - d;
        this.Wa = void 0;
        this.F = a;
        this.preventPassingToStructuredClone = Uf;
        a: {
            f = this.F.length;d = f - 1;
            if (f && (f = this.F[d], Qf(f))) {
                this.ha = f;
                this.nb = d - this.Sa;
                break a
            }
            void 0 !== b && -1 < b ? (this.nb = Math.max(b, d + 1 - this.Sa),
                this.ha = void 0) : this.nb = Number.MAX_VALUE
        }
        if (!e && this.ha && "g" in this.ha) throw Error("M");
        if (c) {
            b = h && !g && !0;
            e = this.nb;
            var A;
            for (h = 0; h < c.length; h++) g = c[h], g < e ? (g += this.Sa, (d = a[g]) ? yg(d, b) : a[g] = Sf) : (A || (A = gg(this)), (d = A[g]) ? yg(d, b) : A[g] = Sf)
        }
    };
    m = xg.prototype;
    m.toArray = function() {
        return this.toJSON()
    };
    m.toJSON = function() {
        var a = this.F;
        Rf || ($a(a), a = dg(a, eg, fg));
        return a
    };
    m.rb = function() {
        Rf = !0;
        try {
            return JSON.stringify(this.toJSON(), zg)
        } finally {
            Rf = !1
        }
    };
    m.getExtension = function(a) {
        bb(this, a.xf);
        return a.mh(bb(this, xg))
    };
    m.hasExtension = function(a) {
        bb(this, a.xf);
        Sa(!a.rh, "repeated extensions don't support hasExtension");
        var b = bb(this, xg);
        return null != hg(b, a.lh, !1)
    };
    m.clone = function() {
        var a = bb(this, xg);
        return ng(a)
    };

    function yg(a, b) {
        if (Array.isArray(a)) {
            var c = Jf(a),
                d = 1;
            !b || c & 2 || (d |= 16);
            (c & d) !== d && Kf(a, c | d)
        }
    }
    m.Ib = Pf;
    m.toString = function() {
        return this.F.toString()
    };

    function zg(a, b) {
        return bg(b)
    };
    Sa(!0);

    function Ag(a, b) {
        a.ie = "function" === typeof b ? b : function() {
            return b
        };
        return a
    }
    var Bg = void 0;

    function Cg(a, b) {
        b = void 0 === b ? new Set : b;
        if (b.has(a)) return "(Recursive reference)";
        switch (typeof a) {
            case "object":
                if (a) {
                    var c = Object.getPrototypeOf(a);
                    switch (c) {
                        case Map.prototype:
                        case Set.prototype:
                        case Array.prototype:
                            b.add(a);
                            var d = "[" + Array.from(a, function(e) {
                                return Cg(e, b)
                            }).join(", ") + "]";
                            b.delete(a);
                            c !== Array.prototype && (d = Dg(c.constructor) + "(" + d + ")");
                            return d;
                        case Object.prototype:
                            return b.add(a), c = "{" + Object.entries(a).map(function(e) {
                                var f = v(e);
                                e = f.next().value;
                                f = f.next().value;
                                return e +
                                    ": " + Cg(f, b)
                            }).join(", ") + "}", b.delete(a), c;
                        default:
                            return d = "Object", c && c.constructor && (d = Dg(c.constructor)), "function" === typeof a.toString && a.toString !== Object.prototype.toString ? d + "(" + String(a) + ")" : "(object " + d + ")"
                    }
                }
                break;
            case "function":
                return "function " + Dg(a);
            case "number":
                if (!Number.isFinite(a)) return String(a);
                break;
            case "bigint":
                return a.toString(10) + "n"
        }
        return JSON.stringify(a)
    }

    function Dg(a) {
        var b = a.name;
        b || (b = (a = /function\s+([^\(]+)/m.exec(String(a))) ? a[1] : "(Anonymous)");
        return b
    };
    var Eg = xg;
    var Fg = function(a, b) {
        this.x = void 0 !== a ? a : 0;
        this.y = void 0 !== b ? b : 0
    };
    m = Fg.prototype;
    m.clone = function() {
        return new Fg(this.x, this.y)
    };
    m.toString = function() {
        return "(" + this.x + ", " + this.y + ")"
    };
    m.equals = function(a) {
        return a instanceof Fg && (this == a ? !0 : this && a ? this.x == a.x && this.y == a.y : !1)
    };
    m.ceil = function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    };
    m.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    m.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    m.translate = function(a, b) {
        a instanceof Fg ? (this.x += a.x, this.y += a.y) : (this.x += Number(a), "number" === typeof b && (this.y += b));
        return this
    };
    m.scale = function(a, b) {
        this.x *= a;
        this.y *= "number" === typeof b ? b : a;
        return this
    };
    var Gg = function(a, b) {
        this.width = a;
        this.height = b
    };
    m = Gg.prototype;
    m.clone = function() {
        return new Gg(this.width, this.height)
    };
    m.toString = function() {
        return "(" + this.width + " x " + this.height + ")"
    };
    m.aspectRatio = function() {
        return this.width / this.height
    };
    m.isEmpty = function() {
        return !(this.width * this.height)
    };
    m.ceil = function() {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    m.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    m.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    m.scale = function(a, b) {
        this.width *= a;
        this.height *= "number" === typeof b ? b : a;
        return this
    };
    var Jg = function(a) {
            return a ? new Hg(Ig(a)) : Pa || (Pa = new Hg)
        },
        Kg = function(a) {
            var b = a.scrollingElement ? a.scrollingElement : kf || "CSS1Compat" != a.compatMode ? a.body || a.documentElement : a.documentElement;
            a = a.parentWindow || a.defaultView;
            return gf && a.pageYOffset != b.scrollTop ? new Fg(b.scrollLeft, b.scrollTop) : new Fg(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
        },
        Lg = function(a, b, c) {
            function d(h) {
                h && b.appendChild("string" === typeof h ? a.createTextNode(h) : h)
            }
            for (var e = 1; e < c.length; e++) {
                var f = c[e];
                if (!Ea(f) ||
                    Fa(f) && 0 < f.nodeType) d(f);
                else {
                    a: {
                        if (f && "number" == typeof f.length) {
                            if (Fa(f)) {
                                var g = "function" == typeof f.item || "string" == typeof f.item;
                                break a
                            }
                            if ("function" === typeof f) {
                                g = "function" == typeof f.item;
                                break a
                            }
                        }
                        g = !1
                    }
                    cb(g ? gb(f) : f, d)
                }
            }
        },
        Ig = function(a) {
            Sa(a, "Node cannot be null or undefined.");
            return 9 == a.nodeType ? a : a.ownerDocument || a.document
        },
        Mg = function(a, b) {
            a && (a = a.parentNode);
            for (var c = 0; a;) {
                Sa("parentNode" != a.name);
                if (b(a)) return a;
                a = a.parentNode;
                c++
            }
            return null
        },
        Hg = function(a) {
            this.hb = a || Ca.document ||
                document
        };
    m = Hg.prototype;
    m.getElementsByTagName = function(a, b) {
        return (b || this.hb).getElementsByTagName(String(a))
    };
    m.createElement = function(a) {
        var b = this.hb;
        a = String(a);
        "application/xhtml+xml" === b.contentType && (a = a.toLowerCase());
        return b.createElement(a)
    };
    m.createTextNode = function(a) {
        return this.hb.createTextNode(String(a))
    };
    m.appendChild = function(a, b) {
        Sa(null != a && null != b, "goog.dom.appendChild expects non-null arguments");
        a.appendChild(b)
    };
    m.append = function(a, b) {
        Lg(Ig(a), a, arguments)
    };
    m.canHaveChildren = function(a) {
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
    m.removeNode = function(a) {
        return a && a.parentNode ? a.parentNode.removeChild(a) : null
    };
    m.isElement = function(a) {
        return Fa(a) && 1 == a.nodeType
    };
    m.contains = function(a, b) {
        if (!a || !b) return !1;
        if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b;) b = b.parentNode;
        return b == a
    };
    var Og = function() {
            return !Ng() && (D("iPod") || D("iPhone") || D("Android") || D("IEMobile"))
        },
        Ng = function() {
            return D("iPad") || D("Android") && !D("Mobile") || D("Silk")
        };
    var Pg = function(a, b) {
        this.name = a;
        this.value = b
    };
    Pg.prototype.toString = function() {
        return this.name
    };
    var Qg = new Pg("OFF", Infinity),
        Rg = new Pg("WARNING", 900),
        Sg = new Pg("CONFIG", 700),
        Tg = function() {
            this.bc = 0;
            this.clear()
        },
        Ug;
    Tg.prototype.clear = function() {
        this.Yd = Array(this.bc);
        this.ae = -1;
        this.te = !1
    };
    var Vg = function(a, b, c) {
        this.reset(a || Qg, b, c, void 0, void 0)
    };
    Vg.prototype.reset = function(a, b, c, d) {
        d || Date.now();
        this.cg = b
    };
    Vg.prototype.getMessage = function() {
        return this.cg
    };
    var Wg = function(a, b) {
            this.level = null;
            this.Ff = [];
            this.parent = (void 0 === b ? null : b) || null;
            this.children = [];
            this.Vf = {
                fd: function() {
                    return a
                }
            }
        },
        Xg = function(a) {
            if (a.level) return a.level;
            if (a.parent) return Xg(a.parent);
            Ua("Root logger has no level set.");
            return Qg
        },
        Yg = function(a, b) {
            for (; a;) a.Ff.forEach(function(c) {
                c(b)
            }), a = a.parent
        },
        Zg = function() {
            this.entries = {};
            var a = new Wg("");
            a.level = Sg;
            this.entries[""] = a
        },
        $g, ah = function(a, b) {
            var c = a.entries[b];
            if (c) return c;
            c = b.lastIndexOf(".");
            c = b.slice(0, Math.max(c,
                0));
            c = ah(a, c);
            var d = new Wg(b, c);
            a.entries[b] = d;
            c.children.push(d);
            return d
        },
        bh = function() {
            $g || ($g = new Zg);
            return $g
        };
    /*

     SPDX-License-Identifier: Apache-2.0
    */
    var ch = [],
        dh = function(a) {
            var b;
            if (b = ah(bh(), "safevalues").Vf) {
                var c = "A URL with content '" + a + "' was sanitized away.",
                    d = Rg;
                if (a = b)
                    if (a = b && d) {
                        a = d.value;
                        var e = b ? Xg(ah(bh(), b.fd())) : Qg;
                        a = a >= e.value
                    }
                if (a) {
                    d = d || Qg;
                    a = ah(bh(), b.fd());
                    "function" === typeof c && (c = c());
                    Ug || (Ug = new Tg);
                    e = Ug;
                    b = b.fd();
                    if (0 < e.bc) {
                        var f = (e.ae + 1) % e.bc;
                        e.ae = f;
                        e.te ? (e = e.Yd[f], e.reset(d, c, b), b = e) : (e.te = f == e.bc - 1, b = e.Yd[f] = new Vg(d, c, b))
                    } else b = new Vg(d, c, b);
                    Yg(a, b)
                }
            }
        }; - 1 === ch.indexOf(dh) && ch.push(dh);
    var eh = function(a) {
        try {
            return !!a && null != a.location.href && ef(a, "foo")
        } catch (b) {
            return !1
        }
    };

    function fh() {
        var a = void 0 === a ? Ca : a;
        return (a = a.performance) && a.now ? a.now() : null
    };
    var gh = function(a, b) {
            b = b.google_js_reporting_queue = b.google_js_reporting_queue || [];
            2048 > b.length && b.push(a)
        },
        hh = function(a, b) {
            var c = void 0 === c ? !1 : c;
            var d = window,
                e = "undefined" !== typeof queueMicrotask;
            return function() {
                c && e && queueMicrotask(function() {
                    d.google_rum_task_id_counter = d.google_rum_task_id_counter || 1;
                    d.google_rum_task_id_counter += 1
                });
                var f = fh(),
                    g = 3;
                try {
                    var h = b.apply(this, arguments)
                } catch (l) {
                    throw g = 13, l;
                } finally {
                    if (d.google_measure_js_timing && f) {
                        var k = fh() || 0;
                        gh(Object.assign({}, {
                            label: a.toString(),
                            value: f,
                            duration: k - f,
                            type: g
                        }, c && e && {
                            taskId: d.google_rum_task_id_counter = d.google_rum_task_id_counter || 1
                        }), d)
                    }
                }
                return h
            }
        };
    var ih = function() {
        Ia.apply(this, arguments)
    };
    x(ih, Ia);
    ih.prototype.Ga = function(a, b) {
        return Ia.prototype.Ga.call(this, a, hh(a, b))
    };

    function jh(a, b) {
        return function(c) {
            return new K(function(d) {
                return c.subscribe(function(e) {
                    a.Ga(b, function() {
                        d.next(e)
                    })()
                }, function(e) {
                    a.Ga(b, function() {
                        d.error(e)
                    })()
                }, function() {
                    a.Ga(b, function() {
                        d.complete()
                    })()
                })
            })
        }
    };
    var lh = function() {
        for (var a = v(B.apply(0, arguments)), b = a.next(); !b.done; b = a.next())
            if (b = b.value, b.pa()) {
                this.l = b;
                return
            }
        this.l = new kh
    };
    m = lh.prototype;
    m.pa = function() {
        return this.l.pa()
    };
    m.now = function() {
        return this.l.now()
    };
    m.setTimeout = function(a, b) {
        return this.l.setTimeout(a, b)
    };
    m.clearTimeout = function(a) {
        this.l.clearTimeout(a)
    };
    m.interval = function(a, b) {
        var c = this.Na(a).subscribe(b);
        return function() {
            return void c.unsubscribe()
        }
    };
    m.Na = function(a) {
        return this.l.Na(a)
    };
    p.Object.defineProperties(lh.prototype, {
        timeline: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.l.timeline
            }
        }
    });
    var kh = function() {
        this.timeline = Symbol()
    };
    m = kh.prototype;
    m.pa = function() {
        return !1
    };
    m.now = function() {
        return new Bd(0, this.timeline)
    };
    m.setTimeout = function() {
        return 0
    };
    m.clearTimeout = function() {};
    m.interval = function() {
        return function() {}
    };
    m.Na = function() {
        return Vc
    };
    var mh = function(a, b) {
        this.G = a;
        this.s = b
    };
    m = mh.prototype;
    m.setTimeout = function(a, b) {
        return this.G.setTimeout(this.s.Ga(734, a), b)
    };
    m.clearTimeout = function(a) {
        this.G.clearTimeout(a)
    };
    m.interval = function(a, b) {
        var c = this.Na(a).subscribe(b);
        return function() {
            return void c.unsubscribe()
        }
    };
    m.Na = function(a) {
        var b = this;
        return new K(function(c) {
            var d = 0,
                e = b.G.setInterval(function() {
                    c.next(d++)
                }, a);
            return function() {
                b.G.clearInterval(e)
            }
        })
    };
    m.pa = function() {
        return !!this.G.clearTimeout && "setTimeout" in this.G && "setInterval" in this.G && !!this.G.clearInterval
    };
    var nh = function(a, b) {
        mh.call(this, a, b);
        this.timeline = Ad
    };
    x(nh, mh);
    nh.prototype.now = function() {
        return new Bd(this.G.Date.now(), this.timeline)
    };
    nh.prototype.pa = function() {
        return !!this.G.Date && !!this.G.Date.now && mh.prototype.pa.call(this)
    };
    var oh = function(a, b) {
        mh.call(this, a, b);
        this.timeline = zd
    };
    x(oh, mh);
    oh.prototype.now = function() {
        return new Bd(this.G.performance.now(), this.timeline)
    };
    oh.prototype.pa = function() {
        return !!this.G.performance && !!this.G.performance.now && mh.prototype.pa.call(this)
    };
    var ph = function(a) {
        this.context = a
    };
    ph.prototype.ping = function() {
        var a = this;
        return Tc.apply(null, w(B.apply(0, arguments).map(function(b) {
            return Dc(a.context.global.fetch(b, {
                method: "GET",
                cache: "no-cache",
                keepalive: !0,
                mode: "no-cors"
            })).h(P(function(c) {
                return 200 === c.status
            }))
        }))).h(ce(function(b) {
            return b
        }), le())
    };
    p.Object.defineProperties(ph.prototype, {
        wb: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return !qh(this.context) && !!this.context.global.fetch
            }
        }
    });
    var rh = function(a) {
        this.context = a
    };
    rh.prototype.ping = function() {
        var a = this;
        return M(B.apply(0, arguments).map(function(b) {
            try {
                var c = a.context.global;
                c.google_image_requests || (c.google_image_requests = []);
                var d = c.document;
                d = void 0 === d ? document : d;
                var e = d.createElement("img");
                e.src = b;
                c.google_image_requests.push(e);
                return !0
            } catch (f) {
                return !1
            }
        }).every(function(b) {
            return b
        }))
    };
    p.Object.defineProperties(rh.prototype, {
        wb: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return !qh(this.context)
            }
        }
    });

    function sh(a) {
        a = a.global;
        if (a.PendingGetBeacon) return a.PendingGetBeacon
    }
    var vh = function(a) {
            this.context = a;
            if (void 0 === th) {
                var b, c, d = null == (b = a.global) ? void 0 : null == (c = b.document) ? void 0 : c.createElement("meta");
                try {
                    d && (d.httpEquiv = "origin-trial", d.content = "A/6hmwx8DpHud613fSYYa2C2T61iC513V4BYG/pBH4zs5sGsUc9RgaPKhfk3JhHF30N/9/NntWzEq28kkrMxpgQAAABweyJvcmlnaW4iOiJodHRwczovL2FkLmRvdWJsZWNsaWNrLm5ldDo0NDMiLCJmZWF0dXJlIjoiUGVuZGluZ0JlYWNvbkFQSSIsImV4cGlyeSI6MTY3ODIzMzU5OSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ==", a.global.document.head.append(d))
                } catch (e) {}
                th = d
            }
            uh = !0
        },
        th;
    vh.prototype.ra = function(a) {
        return uh && !qh(this.context) && void 0 !== sh(this.context) && (void 0 === a || "GET" === a)
    };
    vh.prototype.ja = function(a, b) {
        if (!this.ra(b)) throw new rd;
        return new wh(this.context, a)
    };
    var uh = !1,
        wh = function(a, b) {
            this.context = a;
            this.Ed = b;
            a = sh(this.context);
            if (void 0 === a) throw Error();
            this.Ld = new a(xh(this), {
                backgroundTimeout: 0
            })
        },
        xh = function(a) {
            a = a.Ed;
            return ("&" === a.slice(-1)[0] ? a : a + "&") + "pbapi=1"
        };
    wh.prototype.deactivate = function() {
        this.Ld.deactivate()
    };
    wh.prototype.sendNow = function() {
        this.Ld.sendNow()
    };
    p.Object.defineProperties(wh.prototype, {
        url: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.Ed
            },
            set: function(a) {
                this.Ed = a;
                this.Ld.setURL(xh(this))
            }
        },
        method: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return "GET"
            },
            set: function(a) {
                if ("GET" !== a) throw new rd;
            }
        }
    });
    var yh = function(a) {
        this.context = a
    };
    yh.prototype.ping = function() {
        var a = this;
        return M(B.apply(0, arguments).map(function(b) {
            var c;
            return null == (c = a.context.global.navigator) ? void 0 : c.sendBeacon(b)
        }).every(function(b) {
            return b
        }))
    };
    p.Object.defineProperties(yh.prototype, {
        wb: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                var a;
                return !qh(this.context) && void 0 !== (null == (a = this.context.global.navigator) ? void 0 : a.sendBeacon)
            }
        }
    });

    function zh(a) {
        return function(b) {
            return b.h(Ah(a, se(new L)))
        }
    }

    function Y(a, b) {
        return function(c) {
            return c.h(Ah(a, xe(b)))
        }
    }

    function Ah(a, b) {
        function c(d) {
            return new K(function(e) {
                return d.subscribe(function(f) {
                    Ma(a, function() {
                        return void e.next(f)
                    }, 3)
                }, function(f) {
                    Ma(a, function() {
                        return void e.error(f)
                    }, 3)
                }, function() {
                    Ma(a, function() {
                        return void e.complete()
                    }, 3)
                })
            })
        }
        return I(c, Ce(), b, $b(), c)
    };
    var Z = function(a) {
        this.value = a
    };
    Z.prototype.da = function(a) {
        return M(this.value).h(Y(a, 1))
    };
    var Bh = new Z(!0);

    function Ch(a) {
        var b = Dh(a);
        return null === b ? new Z(null) : b.h(P(function(c) {
            c = c.rb();
            if (zf) c = Ca.btoa(c);
            else {
                for (var d = [], e = 0, f = 0; f < c.length; f++) {
                    var g = c.charCodeAt(f);
                    if (255 < g) throw Error("A");
                    d[e++] = g
                }
                c = Af(d)
            }
            return c
        }), Vd(1), Y(a.i, 1))
    };

    function Eh(a) {
        var b = void 0 === b ? {} : b;
        if ("function" === typeof Event) return new Event(a, b);
        if ("undefined" !== typeof document) {
            var c = document.createEvent("CustomEvent");
            c.initCustomEvent(a, b.bubbles || !1, b.cancelable || !1, b.detail);
            return c
        }
        throw Error();
    };
    var Fh = function(a) {
        this.value = a;
        this.yd = new L
    };
    Fh.prototype.release = function() {
        this.yd.next();
        this.yd.complete();
        this.value = void 0
    };
    p.Object.defineProperties(Fh.prototype, {
        j: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.value
            }
        },
        released: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.yd
            }
        }
    });
    var Gh = ["FRAME", "IMG", "IFRAME"],
        Hh = /^[01](px)?$/;

    function Ih(a) {
        return "string" === typeof a ? document.getElementById(a) : a
    }

    function Jh(a, b) {
        var c = !0,
            d = !0,
            e = void 0,
            f = !0;
        c = void 0 === c ? !0 : c;
        d = void 0 === d ? !1 : d;
        f = void 0 === f ? !1 : f;
        if (a = Ih(a)) {
            e || (e = function(aa, Ga, C) {
                aa.addEventListener(Ga, C)
            });
            for (var g = !1, h = function(aa) {
                    g || (g = !0, b(aa))
                }, k, l, n = 0; n < Gh.length; ++n)
                if (Gh[n] == a.tagName) {
                    l = 3;
                    k = [a];
                    break
                }
            k || (k = a.querySelectorAll(Gh.join(",")), l = 2);
            var r = 0,
                q = 0,
                A = a = !1;
            n = {};
            for (var z = 0; z < k.length; n = {
                    Wb: n.Wb
                }, z++) {
                var u = k[z];
                if (!("IMG" != u.tagName || !u.complete || u.naturalWidth && u.naturalHeight ? Hh.test(u.getAttribute("width")) && Hh.test(u.getAttribute("height")) :
                        1)) {
                    if ("IMG" == u.tagName) var J = u.naturalWidth && u.naturalHeight ? !0 : !1;
                    else try {
                        J = "complete" === (u.readyState ? u.readyState : u.contentWindow && u.contentWindow.document && u.contentWindow.document.readyState) ? !0 : !1
                    } catch (aa) {
                        J = void 0 === d ? !1 : d
                    }
                    if (J) a = !0;
                    else {
                        r++;
                        n.Wb = "IMG" === u.tagName;
                        var O = function(aa) {
                            return function() {
                                r--;
                                r || h(l);
                                aa.Wb && (q--, !q && A && h(l))
                            }
                        }(n);
                        e(u, "load", O);
                        n.Wb && (q++, e(u, "error", O))
                    }
                }
            }
            k = null;
            if (0 === r && !a && "complete" === Ca.document.readyState) l = 5;
            else if (r || !a) {
                e(Ca, "load", function() {
                    f && q ?
                        A = !0 : h(4)
                });
                return
            }
            c && h(l)
        }
    };

    function Kh(a, b, c) {
        if (a)
            for (var d = 0; null != a && 500 > d && !c(a); ++d) a = b(a)
    }

    function Lh(a, b) {
        Kh(a, function(c) {
            try {
                return c === c.parent ? null : c.parent
            } catch (d) {}
            return null
        }, b)
    }

    function Mh(a, b) {
        if ("IFRAME" == a.tagName) b(a);
        else {
            a = a.querySelectorAll("IFRAME");
            for (var c = 0; c < a.length && !b(a[c]); ++c);
        }
    }

    function Nh(a) {
        return (a = a.ownerDocument) && (a.parentWindow || a.defaultView) || null
    }

    function Oh(a, b, c) {
        try {
            var d = JSON.parse(c.data)
        } catch (g) {}
        if ("object" === typeof d && d && "creativeLoad" === d.type) {
            var e = Nh(a);
            if (c.source && e) {
                var f;
                Lh(c.source, function(g) {
                    try {
                        if (g.parent === e) return f = g, !0
                    } catch (h) {}
                });
                f && Mh(a, function(g) {
                    if (g.contentWindow === f) return b(d), !0
                })
            }
        }
    }

    function Ph(a) {
        return "string" === typeof a ? document.getElementById(a) : a
    }
    var Qh = function(a, b) {
        var c = Ph(a);
        if (c)
            if (c.onCreativeLoad) c.onCreativeLoad(b);
            else {
                var d = b ? [b] : [],
                    e = function(f) {
                        for (var g = 0; g < d.length; ++g) try {
                            d[g](1, f)
                        } catch (h) {}
                        d = {
                            push: function(h) {
                                h(1, f)
                            }
                        }
                    };
                c.onCreativeLoad = function(f) {
                    d.push(f)
                };
                c.setAttribute("data-creative-load-listener", "");
                c.addEventListener("creativeLoad", function(f) {
                    e(f.detail)
                });
                Ca.addEventListener("message", function(f) {
                    Oh(c, e, f)
                })
            }
    };
    var Rh = function(a, b) {
            var c = this;
            this.global = a;
            this.xc = b;
            this.ng = this.document ? Tc(M(!0), Jc(this.document, "visibilitychange")).h(jh(this.xc.s, 748), P(function() {
                return c.document ? c.document.visibilityState : "visible"
            }), V()) : M("visible");
            this.kg = this.document ? Jc(this.document, "DOMContentLoaded").h(jh(this.xc.s, 739), Vd(1)) : M(Eh("DOMContentLoaded"))
        },
        Sh = function(a) {
            return a.document ? a.document.readyState : "complete"
        },
        Th = function(a) {
            return null !== a.document && void 0 !== a.document.visibilityState
        };
    Rh.prototype.querySelector = function(a) {
        return this.document ? this.document.querySelector(a) : null
    };
    Rh.prototype.querySelectorAll = function(a) {
        return this.document ? gb(this.document.querySelectorAll(a)) : []
    };
    var Uh = function(a) {
        return null !== a.document && "function" === typeof a.document.elementFromPoint
    };
    Rh.prototype.elementFromPoint = function(a, b) {
        if (!this.document || !Uh(this)) return null;
        a = this.document.elementFromPoint(a, b);
        return null === a ? null : new Fh(a)
    };
    var Vh = function(a, b, c) {
        c = void 0 === c ? !1 : c;
        if (void 0 === b.j || !a.document) return M(b).h(jh(a.xc.s, 749));
        var d = new Wb(1),
            e = function() {
                d.next(b)
            };
        c || Qh(b.j, e);
        Jh(b.j, e);
        return d.h(jh(a.xc.s, 749), Vd(1))
    };
    p.Object.defineProperties(Rh.prototype, {
        document: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return ef(this.global, "document") ? this.global.document || null : null
            }
        }
    });
    var Wh = {
        left: 0,
        top: 0,
        width: 0,
        height: 0
    };

    function Xh(a, b) {
        return a.left === b.left && a.top === b.top && a.width === b.width && a.height === b.height
    }

    function Yh(a, b) {
        return {
            left: Math.max(a.left, b.left),
            top: Math.max(a.top, b.top),
            width: Math.max(0, Math.min(a.left + a.width, b.left + b.width) - Math.max(a.left, b.left)),
            height: Math.max(0, Math.min(a.top + a.height, b.top + b.height) - Math.max(a.top, b.top))
        }
    }

    function Zh(a, b) {
        return {
            left: Math.round(a.left + b.x),
            top: Math.round(a.top + b.y),
            width: a.width,
            height: a.height
        }
    };
    var $h = function(a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    m = $h.prototype;
    m.hd = function() {
        return this.right - this.left
    };
    m.ed = function() {
        return this.bottom - this.top
    };
    m.clone = function() {
        return new $h(this.top, this.right, this.bottom, this.left)
    };
    m.toString = function() {
        return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
    };
    m.contains = function(a) {
        return this && a ? a instanceof $h ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
    };
    m.expand = function(a, b, c, d) {
        Fa(a) ? (this.top -= a.top, this.right += a.right, this.bottom += a.bottom, this.left -= a.left) : (this.top -= a, this.right += Number(b), this.bottom += Number(c), this.left -= Number(d));
        return this
    };
    m.ceil = function() {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this
    };
    m.floor = function() {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    };
    m.round = function() {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    };
    m.translate = function(a, b) {
        a instanceof Fg ? (this.left += a.x, this.right += a.x, this.top += a.y, this.bottom += a.y) : (Va(a), this.left += a, this.right += a, "number" === typeof b && (this.top += b, this.bottom += b));
        return this
    };
    m.scale = function(a, b) {
        b = "number" === typeof b ? b : a;
        this.left *= a;
        this.right *= a;
        this.top *= b;
        this.bottom *= b;
        return this
    };
    var bi = function(a) {
        Eg.call(this, a, -1, ai)
    };
    x(bi, Eg);
    var ci = function(a, b) {
            return jg(a, 2, b)
        },
        di = function(a, b) {
            return jg(a, 3, b)
        },
        ei = function(a, b) {
            return jg(a, 4, b)
        },
        fi = function(a, b) {
            return jg(a, 5, b)
        },
        gi = function(a, b) {
            return jg(a, 9, b)
        },
        ii = function(a, b) {
            return pg(a, hi, 10, b)
        },
        ji = function(a, b) {
            return jg(a, 11, b)
        },
        ki = function(a, b) {
            return jg(a, 1, b)
        },
        li = function(a, b) {
            return jg(a, 7, b)
        },
        hi = function(a) {
            Eg.call(this, a)
        };
    x(hi, Eg);
    hi.prototype.he = function() {
        return qg(hg(this, 2), "")
    };
    var ai = [10, 6];
    var mi = "platform platformVersion architecture model uaFullVersion bitness fullVersionList wow64".split(" ");

    function ni(a) {
        var b;
        return null != (b = a.google_tag_data) ? b : a.google_tag_data = {}
    }

    function oi(a) {
        var b, c;
        return "function" === typeof(null == (b = a.navigator) ? void 0 : null == (c = b.userAgentData) ? void 0 : c.getHighEntropyValues)
    }

    function pi(a) {
        if (!oi(a)) return null;
        var b = ni(a);
        if (b.uach_promise) return b.uach_promise;
        a = a.navigator.userAgentData.getHighEntropyValues(mi).then(function(c) {
            null != b.uach || (b.uach = c);
            return c
        });
        return b.uach_promise = a
    }

    function qi(a) {
        var b;
        return ji(ii(fi(ci(ki(ei(li(gi(di(new bi, a.architecture || ""), a.bitness || ""), a.mobile || !1), a.model || ""), a.platform || ""), a.platformVersion || ""), a.uaFullVersion || ""), (null == (b = a.fullVersionList) ? void 0 : b.map(function(c) {
            var d = new hi;
            d = jg(d, 1, c.brand);
            return jg(d, 2, c.version)
        })) || []), a.wow64 || !1)
    }

    function ri(a) {
        var b, c;
        return null != (c = null == (b = pi(a)) ? void 0 : b.then(function(d) {
            return qi(d)
        })) ? c : null
    };
    var si = function(a, b, c) {
        a = void 0 === a ? window : a;
        b = void 0 === b ? null : b;
        c = void 0 === c ? new Ia : c;
        od.call(this);
        this.global = a;
        this.Va = b;
        this.s = c;
        this.lg = Jc(this.global, "pagehide").h(jh(this.s, 941));
        this.Be = Jc(this.global, "load").h(jh(this.s, 738), Vd(1));
        this.mg = Jc(this.global, "resize").h(jh(this.s, 741));
        this.onMessage = Jc(this.global, "message").h(jh(this.s, 740));
        this.document = new Rh(this.global, this);
        this.l = new lh(new oh(this.G, this.s), new nh(this.G, this.s));
        this.M = new yd(new vh(this), new Ue(this, new ph(this),
            "GET"), new Ue(this, new yh(this), "POST"), new Ue(this, new rh(this), "GET"))
    };
    x(si, od);
    var qh = function(a) {
        var b = a.global;
        return !!a.global.HTMLFencedFrameElement && !!b.fence && "function" === typeof b.fence.reportEvent
    };
    si.prototype.ob = function(a) {
        qh(this) && this.global.fence.reportEvent(a)
    };
    si.prototype.gd = function() {
        return this.lg.h(jh(this.s, 942), Y(this.i, 1), P(function() {}))
    };
    var ti = function(a) {
            var b = new si(a.global.top, a.Va);
            b.M = a.M;
            return b
        },
        ui = function(a, b) {
            b.start();
            return Jc(b, "message").h(jh(a.s, 740))
        };
    si.prototype.postMessage = function(a, b, c) {
        c = void 0 === c ? [] : c;
        this.global.postMessage(a, b, c)
    };
    si.prototype.hd = function() {
        return eh(this.global) ? this.global.width : 0
    };
    si.prototype.ed = function() {
        return eh(this.global) ? this.global.height : 0
    };
    var vi = function(a, b) {
        try {
            var c = a.global,
                d = Ng() || Og();
            try {
                b && (c = c.top);
                a = c;
                b && null !== a && a != a.top && (a = a.top);
                try {
                    if (void 0 === d ? 0 : d) var e = (new Gg(a.innerWidth, a.innerHeight)).round();
                    else {
                        var f = (a || window).document,
                            g = "CSS1Compat" == f.compatMode ? f.documentElement : f.body;
                        e = (new Gg(g.clientWidth, g.clientHeight)).round()
                    }
                    var h = e
                } catch (z) {
                    h = new Gg(-12245933, -12245933)
                }
                b = h;
                var k = b.height,
                    l = b.width;
                if (-12245933 === l) var n = new $h(l, l, l, l);
                else {
                    var r = Kg(Jg(c.document).hb),
                        q = r.x,
                        A = r.y;
                    n = new $h(A, q + l, A + k, q)
                }
            } catch (z) {
                n =
                    new $h(-12245933, -12245933, -12245933, -12245933)
            }
            return {
                left: n.left,
                top: n.top,
                width: n.hd(),
                height: n.ed()
            }
        } catch (z) {
            return Wh
        }
    };
    si.prototype.validate = function() {
        return this.global && this.l.pa() && this.M.ra()
    };
    var Dh = function(a) {
        return (a = ri(a.global)) ? Dc(a) : null
    };
    p.Object.defineProperties(si.prototype, {
        G: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return window
            }
        },
        ib: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return !eh(this.global.top)
            }
        },
        kd: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.ib || this.global.top !== this.global
            }
        },
        scrollY: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.global.scrollY
            }
        },
        MutationObserver: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.G.MutationObserver
            }
        },
        ResizeObserver: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.G.ResizeObserver
            }
        },
        Pf: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                Sa(!0, "Major version must be an integer");
                var a = nb();
                if (D("Trident") || D("MSIE")) {
                    var b = /rv: *([\d\.]*)/.exec(a);
                    if (b && b[1]) a = b[1];
                    else {
                        b = "";
                        var c = /MSIE +([\d\.]+)/.exec(a);
                        if (c && c[1])
                            if (a = /Trident\/(\d.\d)/.exec(a), "7.0" == c[1])
                                if (a && a[1]) switch (a[1]) {
                                    case "4.0":
                                        b = "8.0";
                                        break;
                                    case "5.0":
                                        b = "9.0";
                                        break;
                                    case "6.0":
                                        b = "10.0";
                                        break;
                                    case "7.0":
                                        b = "11.0"
                                } else b = "7.0";
                                else b = c[1];
                        a = b
                    }
                } else a = "";
                "" === a ? a = NaN : (a = a.split("."),
                    a = 0 === a.length ? NaN : Number(a[0]));
                return 8 <= a
            }
        },
        hf: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return "vu" in this.global || "vv" in this.global
            }
        }
    });
    var wi = !gf && !pb(),
        xi = function(a, b) {
            if (/-[a-z]/.test(b)) return null;
            if (wi && a.dataset) {
                if (rb() && !(b in a.dataset)) return null;
                a = a.dataset[b];
                return void 0 === a ? null : a
            }
            return a.getAttribute("data-" + String(b).replace(/([A-Z])/g, "-$1").toLowerCase())
        };
    var yi = {},
        zi = (yi["data-google-av-cxn"] = "_avicxn_", yi["data-google-av-cpmav"] = "_cvu_", yi["data-google-av-metadata"] = "_avm_", yi["data-google-av-adk"] = "_adk_", yi["data-google-av-btr"] = void 0, yi["data-google-av-override"] = void 0, yi["data-google-av-dm"] = void 0, yi["data-google-av-immediate"] = void 0, yi["data-google-av-aid"] = void 0, yi["data-google-av-naid"] = void 0, yi["data-google-av-inapp"] = void 0, yi["data-google-av-slift"] = void 0, yi["data-google-av-itpl"] = void 0, yi["data-google-av-ext-cxn"] = void 0, yi["data-google-av-rs"] =
            void 0, yi["data-google-av-flags"] = void 0, yi["data-google-av-turtlex"] = void 0, yi),
        Ai = {},
        Bi = (Ai["data-google-av-adk"] = "googleAvAdk", Ai["data-google-av-btr"] = "googleAvBtr", Ai["data-google-av-cpmav"] = "googleAvCpmav", Ai["data-google-av-dm"] = "googleAvDm", Ai["data-google-av-ext-cxn"] = "googleAvExtCxn", Ai["data-google-av-immediate"] = "googleAvImmediate", Ai["data-google-av-inapp"] = "googleAvInapp", Ai["data-google-av-itpl"] = "googleAvItpl", Ai["data-google-av-metadata"] = "googleAvMetadata", Ai["data-google-av-naid"] =
            "googleAvNaid", Ai["data-google-av-override"] = "googleAvOverride", Ai["data-google-av-rs"] = "googleAvRs", Ai["data-google-av-slift"] = "googleAvSlift", Ai["data-google-av-cxn"] = "googleAvCxn", Ai["data-google-av-aid"] = void 0, Ai["data-google-av-flags"] = "googleAvFlags", Ai["data-google-av-turtlex"] = "googleAvTurtlex", Ai);

    function Ci(a, b) {
        if (void 0 === a.j) return null;
        try {
            var c;
            var d = null != (c = a.j.getAttribute(b)) ? c : null;
            if (null !== d) return d
        } catch (g) {}
        try {
            var e = zi[b];
            if (e && (d = a.j[e], void 0 !== d)) return d
        } catch (g) {}
        try {
            var f = Bi[b];
            if (f) return xi(a.j, f)
        } catch (g) {}
        return null
    }

    function Di(a) {
        return P(function(b) {
            return Ci(b, a)
        })
    };
    var Ei = I(function(a) {
        return P(function(b) {
            return a.map(function(c) {
                return Ci(b, c)
            })
        })
    }(["data-google-av-cxn", "data-google-av-turtlex"]), P(function(a) {
        var b = v(a);
        a = b.next().value;
        b = b.next().value;
        if (!a) {
            if (null !== b) return [];
            throw new ud;
        }
        return a.split("|")
    }));
    var Fi = function() {
        return I(Ec(function(a) {
            return a.element.h(Ei, Fd(function() {
                return M([""])
            })).h(P(function(b) {
                return {
                    Ha: b,
                    dc: a
                }
            }))
        }), Qd(function(a) {
            return a.Ha.sort().join(";")
        }), P(function(a) {
            return a.dc
        }))
    };
    var Hi = function() {
            return Ec(function(a) {
                return Dc(Gi(a)).h(zh(a.i))
            })
        },
        Gi = function(a) {
            return a.document.querySelectorAll(".GoogleActiveViewElement,.GoogleActiveViewClass").map(function(b) {
                return new Fh(b)
            })
        };

    function Ii(a) {
        var b = a.Be,
            c = a.document.kg;
        return Tc(M({}), c, b).h(P(function() {
            return a
        }))
    };
    var Ki = P(Ji);

    function Ji(a) {
        var b = Number(Ci(a, "data-google-av-rs"));
        if (!isNaN(b) && 0 !== b) return b;
        var c;
        return (a = null == (c = a.j) ? void 0 : c.id) ? 0 == a.lastIndexOf("DfaVisibilityIdentifier", 0) ? 6 : 0 == a.lastIndexOf("YtKevlarVisibilityIdentifier", 0) ? 15 : 0 == a.lastIndexOf("YtSparklesVisibilityIdentifier", 0) ? 17 : 0 == a.lastIndexOf("YtKabukiVisibilityIdentifier", 0) ? 18 : 0 : 0
    };

    function Li() {
        return I(T(function(a) {
            return void 0 !== a
        }), P(function(a) {
            return a
        }))
    };

    function Mi() {
        return function(a) {
            var b = [];
            return a.h(T(function(c) {
                if (void 0 === c.j || b.some(function(d) {
                        return d.j === c.j
                    })) return !1;
                b.push(c);
                return !0
            }))
        }
    };

    function Ni(a, b) {
        b = void 0 === b ? Pb : b;
        return Tc(Ii(a), b).h(Hi(), Mi(), Li(), Y(a.i, 1))
    };

    function Oi(a) {
        var b, c, d;
        return !!a && "boolean" === typeof a.active && "function" === typeof(null == (b = a.clock) ? void 0 : b.now) && void 0 !== (null == (c = a.clock) ? void 0 : c.timeline) && !(null == (d = a.C) || !d.timestamp) && "function" === typeof a.X && "function" === typeof a.Y && "function" === typeof a.fa && "function" === typeof a.map && "function" === typeof a.ia
    };

    function Pi(a, b) {
        return new K(function(c) {
            var d = !1,
                e = Array(b.length);
            e.fill(void 0);
            var f = new Set,
                g = new Set,
                h = function(r, q) {
                    a.Ge ? (e[q] = r, f.add(q), d || (d = !0, Ma(a, function() {
                        d = !1;
                        c.next(gb(e))
                    }, 1))) : c.error(new vd(q))
                },
                k = function(r, q) {
                    g.add(q);
                    f.add(q);
                    Ma(a, function() {
                        c.error(r)
                    }, 1)
                },
                l = function(r) {
                    g.add(r);
                    Ma(a, function() {
                        g.size === b.length && c.complete()
                    }, 1)
                },
                n = b.map(function(r, q) {
                    return r.subscribe(function(A) {
                        return void h(A, q)
                    }, function(A) {
                        return void k(A, q)
                    }, function() {
                        return void l(q)
                    })
                });
            return function() {
                n.forEach(function(r) {
                    return void r.unsubscribe()
                })
            }
        })
    };

    function Qi(a, b, c) {
        function d() {
            if (b.Va) {
                var u = b.Va,
                    J = u.next;
                var O = {
                    hh: c,
                    xh: e,
                    yh: Object.assign({}, f),
                    oh: g,
                    errorMessage: h,
                    kh: k
                };
                O = {
                    Cg: 1,
                    Dg: 0,
                    Eg: 0,
                    timestamp: Cd(b.l.now(), new Bd(0, b.l.timeline)),
                    sc: b.sc,
                    messageType: 2,
                    ih: O
                };
                J.call(u, O)
            }
        }
        for (var e = Object.keys(a), f = {}, g = !1, h = null, k = null, l = {}, n = new Set, r = [], q = {}, A = v(e), z = A.next(); !z.done; q = {
                U: q.U
            }, z = A.next()) q.U = z.value, z = a[q.U], z instanceof Z ? (l[q.U] = z.value, n.add(q.U), f[String(q.U)] = Ed(z.value)) : (z = z.h(V(function(u, J) {
            return Oi(u) || Oi(J) ? !1 : u === J
        }), P(function(u) {
            return function(J) {
                f[String(u.U)] =
                    Ed(J);
                d();
                var O = {};
                return O[u.U] = J, O
            }
        }(q)), Fd(function(u) {
            return function(J) {
                if (J instanceof vd) throw new xd(String(u.U));
                throw J;
            }
        }(q)), Je(function(u) {
            return function() {
                n.add(u.U)
            }
        }(q), function(u) {
            return function(J) {
                k = String(u.U);
                h = String(J);
                d()
            }
        }(q), function(u) {
            return function() {
                n.has(u.U) || (g = !0, d())
            }
        }(q))), r.push(z));
        (a = 0 < Object.keys(f).length) && d();
        q = Pi(b.i, r).h(Fd(function(u) {
            if (u instanceof vd) throw new wd(e[u.Kf]);
            throw u;
        }), P(function(u) {
            return Object.freeze(Object.assign.apply(Object, [{},
                l
            ].concat(w(u))))
        }));
        return (r = 0 < r.length) && a ? Tc(M(Object.freeze(l)), q) : r ? q : M(Object.freeze(l))
    };

    function Ri(a, b, c, d) {
        var e = Si(Ti(Si(Ui, Vi), Wi), Xi, Yi);
        return a.s.Ga.bind(a.s)(733, function() {
            function f() {
                if (a.Va) {
                    var l = a.Va,
                        n = l.next;
                    var r = {
                        sh: [].concat(w(h.values())),
                        nh: k
                    };
                    r = {
                        Cg: 1,
                        Dg: 0,
                        Eg: 0,
                        timestamp: Cd(a.l.now(), new Bd(0, a.l.timeline)),
                        sc: a.sc,
                        messageType: 1,
                        ph: r
                    };
                    n.call(l, r)
                }
            }
            var g = {},
                h = new Set,
                k = !1;
            try {
                return b.h(Fd(function(l) {
                    d(Object.assign({}, g, {
                        error: l
                    }));
                    return Pb
                }), Je(function() {}, function() {}, function() {
                    k = !0;
                    f()
                }), Ec(function(l) {
                    h.add(l.Ab);
                    f();
                    try {
                        var n = c(a, l)
                    } catch (q) {
                        return d(Object.assign({},
                            g, {
                                error: q instanceof Error ? q : String(q)
                            })), Pb
                    }
                    var r = {};
                    return Qi(n, a, l.Ab).h(Je(function(q) {
                        r = q
                    }), xe(1), $b()).h(e, Fd(function(q) {
                        d(Object.assign({}, r, {
                            error: q
                        }));
                        return Pb
                    }), be(void 0), P(function() {
                        h.delete(l.Ab) && f();
                        return !0
                    }))
                })).h(pe(function(l) {
                    return l + 1
                }, 0), Fd(function(l) {
                    d(Object.assign({}, g, {
                        error: l
                    }));
                    return Pb
                }))
            } catch (l) {
                return d(Object.assign({}, g, {
                    error: l
                })), Pb
            }
        })()
    };
    var Xi = I(P(function(a) {
        var b = a.M,
            c = a.Rc,
            d = a.Id,
            e = a.jb;
        if (void 0 === b || void 0 === c || void 0 === d) return !1;
        if (a.Of) {
            if (e) {
                a = a.ob;
                if (!a) return !1;
                a({
                    eventType: "active-view-begin-to-render",
                    eventData: "",
                    destination: ["buyer"]
                });
                return !0
            }
            d(c, a).forEach(function(f) {
                b.ja(f).sendNow()
            });
            return !0
        }
        return void 0 !== a.Zc ? !0 : !1
    }), Ge(function(a) {
        return !a
    }), fe());

    function Zi(a) {
        var b = new Map;
        if ("object" !== typeof a || null === a) return b;
        Object.values(a).forEach(function(c) {
            c && "function" === typeof c.Y && (b.has(c.clock.timeline) || b.set(c.clock.timeline, c.clock.now()))
        });
        return b
    };

    function $i(a, b) {
        var c = aj,
            d = bj,
            e = cj;
        b = void 0 === b ? .01 : b;
        return function(f) {
            0 < b && Math.random() <= b && (a.global.HTMLFencedFrameElement && a.global.fence && "function" === typeof a.global.fence.reportEvent && a.global.fence.reportEvent({
                eventType: "active-view-error",
                eventData: "",
                destination: ["buyer"]
            }), f = Object.assign({}, f, {
                errorMessage: f.error instanceof Error && f.error.message ? f.error.message : String(f.error),
                ce: f.error instanceof Error && f.error.stack ? String(f.error.stack) : null,
                tf: f.error instanceof Error && f.error.name ?
                    String(f.error.name) : null,
                sf: String(a.s.Oe)
            }), d(Object.assign({}, f, {
                ua: function() {
                    return function(g) {
                        try {
                            return e(Object.assign({}, g))
                        } catch (h) {
                            return {}
                        }
                    }
                }(),
                Ha: [c]
            }), Zi(f)).forEach(function(g) {
                a.M.ja(g).sendNow()
            }))
        }
    };
    var Yi = I(P(function(a) {
        var b = a.M,
            c = a.yf;
        if (void 0 === b || void 0 === c) return !1;
        if (void 0 !== a.Zc) return !0;
        if (null === c) return !1;
        for (a = 0; a < c; a++) b.ja("https://pagead2.googlesyndication.com/pagead/gen_204?id=av-js&type=extra&rnd=" + Math.floor(1E7 * Math.random())).sendNow();
        return !0
    }), Ge(function(a) {
        return !a
    }), fe());
    var cj = function(a) {
        return {
            id: a.vd,
            mcvt: a.Gb,
            p: a.fc,
            asp: a.dh,
            mtos: a.Hb,
            tos: a.Sb,
            v: a.gf,
            bin: a.ff,
            avms: a.ye,
            bs: a.Xd,
            mc: a.we,
            "if": a.mf,
            vu: a.pf,
            app: a.Ma,
            mse: a.rd,
            mtop: a.sd,
            itpl: a.md,
            adk: a.Qc,
            exk: a.fh,
            rs: a.Fa,
            la: a.ue,
            cr: a.nd,
            uach: a.Fd,
            vs: a.Hd,
            r: a.wd,
            pay: a.Gf,
            rst: a.af,
            rpt: a.Ze,
            isd: a.Jf,
            lsd: a.Uf,
            context: a.sf,
            msg: a.errorMessage,
            stack: a.ce,
            name: a.tf,
            ec: a.Hf,
            sfr: a.Bd,
            met: a.yb,
            wmsd: a.Kd,
            pv: a.uh,
            epv: a.jh,
            pbe: a.pe
        }
    };

    function Si() {
        var a = B.apply(0, arguments);
        return function(b) {
            var c = b.h(xe(1), $b());
            b = a.map(function(d) {
                return c.h(d, be(!0))
            });
            return S(b).h(Vd(1), fe())
        }
    };

    function Ti() {
        var a = B.apply(0, arguments);
        return function(b) {
            var c = b.h(xe(1), $b());
            b = a.map(function(d) {
                return c.h(d, be(!0))
            });
            return Tc.apply(null, w(b)).h(Vd(1), fe())
        }
    };
    var Vi = function(a) {
        var b = [];
        return a.h(P(function(c) {
            var d = c.M,
                e = c.Sb,
                f = c.Ig,
                g = c.ua,
                h = c.Hg,
                k = c.Dc,
                l = c.Tb,
                n = c.Jd,
                r = c.le,
                q = c.pe;
            if (!c.dd || !r || void 0 === c.Hb || void 0 === e || void 0 === f || void 0 === g || void 0 === h || void 0 === l || void 0 === d) return !1;
            if (c.jb) {
                if (void 0 === k) return !1;
                f = c.ob;
                if (!f) return !1;
                f({
                    eventType: "active-view-time-on-screen",
                    eventData: "",
                    destination: ["buyer"]
                });
                return !0
            }
            if (!q && !k) return !1;
            e = Zi(c);
            var A;
            n = null != (A = null == n ? void 0 : n.ga(e).value) ? A : !1;
            c = l(Object.assign({}, c, {
                vd: h,
                Hd: n ? 4 : 3,
                wd: null !=
                    k ? k : "u",
                ua: g,
                Ha: f
            }), e);
            if (q) {
                for (; b.length > f.length;) q = void 0, null == (q = b.shift()) || q.deactivate();
                c.forEach(function(z, u) {
                    u >= b.length ? b.push(d.ja(z)) : b[u].url = z
                });
                return void 0 !== k
            }
            return void 0 !== k ? (c.forEach(function(z) {
                d.ja(z).sendNow()
            }), !0) : !1
        }), Ge(function(c) {
            return !c
        }), fe())
    };

    function dj(a) {
        return function(b) {
            return b.h(P(function(c) {
                a.Ge || Ua("Assertion on queued Observable output failed");
                return c
            }))
        }
    };

    function ej(a) {
        return function(b) {
            return new K(function(c) {
                var d = !1,
                    e = b.h(dj(a)).subscribe(function(f) {
                        d = !0;
                        c.next(f)
                    }, c.error.bind(c), c.complete.bind(c));
                Ma(a, function() {
                    d || c.next(null)
                }, 3);
                return e
            })
        }
    };

    function fj(a, b) {
        return function(c) {
            return c.h(X(function(d) {
                return new K(function(e) {
                    function f() {
                        h.disconnect();
                        k.unsubscribe()
                    }
                    var g = a.MutationObserver;
                    if (g && void 0 !== d.j) {
                        var h = new g(function(l) {
                            e.next(l)
                        });
                        h.observe(d.j, b);
                        var k = d.released.subscribe(f);
                        return f
                    }
                })
            }))
        }
    };
    var gj = {
        bh: 0,
        Sg: 1,
        Ug: 2,
        Tg: 3,
        0: "UNKNOWN",
        1: "DEFER_MEASUREMENT",
        2: "DO_NOT_DEFER_MEASUREMENT",
        3: "DEFER_MEASUREMENT_AND_PING"
    };

    function hj(a, b) {
        var c = b.h(fj(a, {
            attributes: !0
        }), Y(a.i, 1));
        return S([b, c.h(Y(a.i, 1), ej(a.i))]).h(P(function(d) {
            return v(d).next().value
        }), Di("data-google-av-dm"), P(ij))
    }

    function ij(a) {
        return a && a in gj ? Number(a) : 2
    };

    function jj(a) {
        if (3 === a.Xf) return null;
        if (void 0 !== a.Dc) {
            var b = !1 === a.lf ? "n" : !1 === a.dd && a.Dc ? a.Dc : null;
            if (null !== b) return b
        }
        return a.jc instanceof U ? "msf" : a.Vc instanceof qd ? "c" : !1 === a.kf ? "pv" : a.jc || a.Vc ? "x" : null
    }
    var Wi = I(P(function(a) {
            var b = jj(a);
            if (null === b) return !1;
            var c = a.M;
            if (void 0 === a.oc || void 0 === a.ua || void 0 === a.Tb || void 0 === a.pc || void 0 === c) return !1;
            if (a.jb) {
                a = a.ob;
                if (!a) return !1;
                a({
                    eventType: "active-view-unmeasurable",
                    eventData: "",
                    destination: ["buyer"]
                });
                return !0
            }
            var d = void 0;
            if ("x" === b) {
                var e, f = null != (e = a.jc) ? e : a.Vc;
                if (f) {
                    var g = f.stack;
                    d = f.message
                }
            }
            a.Tb(Object.assign({}, a, {
                Ha: a.oc,
                ua: a.ua,
                vd: a.pc,
                Hd: 2,
                wd: b,
                errorMessage: d,
                ce: g
            }), Zi(a)).forEach(function(h) {
                c.ja(h).sendNow()
            });
            return !0
        }), T(function(a) {
            return a
        }),
        Vd(1), fe());

    function kj(a, b) {
        return "string" === typeof a ? encodeURIComponent(a) : "number" === typeof a ? String(a) : Array.isArray(a) ? a.map(function(c) {
            return kj(c, b)
        }).join(",") : a instanceof Bd ? a.toString() : a && "function" === typeof a.Y ? kj(a.ga(b).value, b) : !0 === a ? "1" : !1 === a ? "0" : void 0 === a || null === a ? null : [a.top, a.left, a.top + a.height, a.left + a.width].join()
    }

    function lj(a, b) {
        a = Object.entries(a).map(function(c) {
            var d = v(c);
            c = d.next().value;
            d = d.next().value;
            d = kj(d, b);
            return null === d ? "" : c + "=" + d
        }).filter(function(c) {
            return "" !== c
        });
        return a.length ? a.join("&") : ""
    };

    function bj(a, b) {
        var c = a.ua(a),
            d = lj(c, b);
        return d ? db(a.Ha, function(e) {
            e = 0 <= e.indexOf("?") ? e : e + "?";
            e = 0 <= "?&".indexOf(e.slice(-1)) ? e : e + "&";
            return e + d
        }) : a.Ha
    };

    function mj(a, b) {
        return db(a, function(c) {
            if ("string" === typeof b.Fd) {
                var d = "&" + lj({
                    uach: b.Fd
                }, new Map);
                return "&adurl=" == c.substring(c.length - 7) ? c.substring(0, c.length - 7) + d + "&adurl=" : c + d
            }
            return c
        })
    };
    var Ui = I(Ge(function(a) {
        return void 0 === a.Zc
    }), P(function(a) {
        return Object.assign({}, a, {
            Pe: Zi(a)
        })
    }), T(function(a) {
        var b = a.Jd,
            c = a.Pe,
            d;
        return !!a.le && (null != (d = null == b ? void 0 : b.ga(c).value) ? d : !1)
    }), P(function(a) {
        var b = a.M;
        if (void 0 === a.ua || void 0 === a.oc || void 0 === a.Tb || void 0 === a.pc || void 0 === b) return !1;
        if (a.jb) {
            a = a.ob;
            if (!a) return !1;
            a({
                eventType: "active-view-viewable",
                eventData: "",
                destination: ["buyer"]
            });
            return !0
        }
        var c = a.Tb(Object.assign({}, a, {
                Ha: a.oc,
                ua: a.ua,
                vd: a.pc,
                Hd: 4,
                wd: "v"
            }), a.Pe),
            d = a.Wc;
        d &&
            0 < d.length && a.Id && a.Id(d, a).forEach(function(e) {
                b.ja(e).sendNow()
            });
        c.forEach(function(e) {
            b.ja(e).sendNow()
        });
        return !0
    }), Ge(function(a) {
        return !a
    }), fe());

    function nj(a, b, c) {
        c = void 0 === c ? function(d, e) {
            return d === e
        } : c;
        return a.timestamp.equals(b.timestamp) && c(a.value, b.value)
    };
    var oj = function(a) {
        this.key = a;
        this.defaultValue = !1;
        this.valueType = "boolean"
    };
    var pj = new oj("100006"),
        qj = new function(a, b) {
            this.key = a;
            this.defaultValue = void 0 === b ? 0 : b;
            this.valueType = "number"
        }("45362137"),
        rj = new oj("45377435"),
        sj = new oj("45372163"),
        tj = new oj("45382077");

    function uj(a) {
        var b, c, d, e, f;
        return {
            jf: null != (b = null == a ? void 0 : vj(a, pj)) ? b : !1,
            zf: null != (c = null == a ? void 0 : vj(a, qj)) ? c : 0,
            Af: null != (d = null == a ? void 0 : vj(a, rj)) ? d : !1,
            wg: null != (e = null == a ? void 0 : vj(a, sj)) ? e : !1,
            Bg: null != (f = null == a ? void 0 : vj(a, tj)) ? f : !1
        }
    };
    var wj = function(a, b) {
        this.a = a;
        this.b = b;
        if (a.clock.timeline !== b.clock.timeline) throw Error();
    };
    wj.prototype.X = function(a) {
        return a instanceof wj ? this.a.X(a.a) && this.b.X(a.b) : !1
    };
    wj.prototype.fa = function(a) {
        var b = this.a.fa(a).value,
            c = this.b.fa(a).value;
        return {
            timestamp: a,
            value: [b, c]
        }
    };
    p.Object.defineProperties(wj.prototype, {
        active: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.a.active || this.b.active
            }
        },
        clock: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.a.clock
            }
        },
        C: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                var a = this.a.C.timestamp.maximum(this.b.C.timestamp),
                    b = this.a.C.timestamp.equals(a) ? this.a.C.value : this.a.fa(a).value,
                    c = this.b.C.timestamp.equals(a) ? this.b.C.value : this.b.fa(a).value;
                return {
                    timestamp: a,
                    value: [b, c]
                }
            }
        }
    });
    var xj = function(a, b) {
        this.input = a;
        this.vc = b;
        this.C = {
            timestamp: this.input.C.timestamp,
            value: this.vc(this.input.C.value)
        }
    };
    xj.prototype.X = function(a) {
        return a instanceof xj ? this.input.X(a.input) && this.vc === a.vc : !1
    };
    xj.prototype.fa = function(a) {
        a = this.input.fa(a);
        return {
            timestamp: a.timestamp,
            value: this.vc(a.value)
        }
    };
    p.Object.defineProperties(xj.prototype, {
        active: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.input.active
            }
        },
        clock: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.input.clock
            }
        }
    });
    var yj = function(a, b, c) {
        this.clock = a;
        this.C = b;
        this.active = c
    };
    yj.prototype.X = function(a) {
        return a instanceof yj ? this.active === a.active && this.clock.timeline === a.clock.timeline && nj(this.C, a.C) : !1
    };
    yj.prototype.fa = function(a) {
        return {
            timestamp: a,
            value: this.C.value + (this.active ? Cd(a, this.C.timestamp) : 0)
        }
    };
    var zj = function() {};
    zj.prototype.Y = function() {
        return this.fa(this.clock.now())
    };
    zj.prototype.ga = function(a) {
        var b;
        a = null != (b = a.get(this.clock.timeline)) ? b : this.clock.now();
        return this.fa(a)
    };
    zj.prototype.map = function(a) {
        return new Aj(this, a)
    };
    zj.prototype.ia = function(a) {
        return new Bj(this, a)
    };
    var Bj = function() {
        wj.apply(this, arguments);
        this.map = zj.prototype.map;
        this.ia = zj.prototype.ia;
        this.Y = zj.prototype.Y;
        this.ga = zj.prototype.ga
    };
    x(Bj, wj);
    var Cj = function() {
        yj.apply(this, arguments);
        this.map = zj.prototype.map;
        this.ia = zj.prototype.ia;
        this.Y = zj.prototype.Y;
        this.ga = zj.prototype.ga
    };
    x(Cj, yj);
    var Aj = function() {
        xj.apply(this, arguments);
        this.map = zj.prototype.map;
        this.ia = zj.prototype.ia;
        this.Y = zj.prototype.Y;
        this.ga = zj.prototype.ga
    };
    x(Aj, xj);
    var Dj = function(a, b) {
        this.C = b;
        this.Y = zj.prototype.Y;
        this.ga = zj.prototype.ga;
        this.map = zj.prototype.map;
        this.ia = zj.prototype.ia;
        this.clock = a
    };
    Dj.prototype.X = function(a) {
        return a.active
    };
    Dj.prototype.fa = function() {
        return this.C
    };
    p.Object.defineProperties(Dj.prototype, {
        active: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return !1
            }
        }
    });

    function Ej(a) {
        var b = Math.pow(10, 2);
        return Math.round(a * b) / b
    };

    function Fj(a, b, c, d) {
        var e = Object.keys(c).map(function(h) {
                return h
            }),
            f = e.filter(function(h) {
                var k = c[h];
                h = d[h];
                return k instanceof Z && h instanceof Z && k.value === h.value
            }),
            g = f.reduce(function(h, k) {
                var l = {};
                return Object.assign({}, h, (l[k] = c[k], l))
            }, {});
        return e.reduce(function(h, k) {
            if (0 <= f.indexOf(k)) return h;
            var l = {};
            return Object.assign({}, h, (l[k] = b.h(X(function(n) {
                return (n = n ? c[k] : d[k]) && (n instanceof K || "function" === typeof n.kb && "function" === typeof n.subscribe) ? n : n.da(a)
            })), l))
        }, g)
    };

    function Gj(a) {
        return I(P(function() {
            return !0
        }), W(!1), Y(a, 1))
    };

    function Hj(a) {
        return 0 >= a.length ? Pb : S(a.map(function(b) {
            var c = 0;
            return b.h(P(function(d) {
                return {
                    index: c++,
                    value: d
                }
            }))
        })).h(T(function(b) {
            return b.every(function(c) {
                return c.index === b[0].index
            })
        }), P(function(b) {
            return b.map(function(c) {
                return c.value
            })
        }))
    };

    function Ij(a, b) {
        a.ya && (a.Za = a.ya);
        a.ya = b;
        a.Za && a.Za.value ? (b = Math.max(0, Cd(b.timestamp, a.Za.timestamp)), a.totalTime += b, a.ea += b) : a.ea = 0;
        return a
    }

    function Jj() {
        return I(pe(Ij, {
            totalTime: 0,
            ea: 0
        }), P(function(a) {
            return a.totalTime
        }))
    }

    function Kj() {
        return I(pe(Ij, {
            totalTime: 0,
            ea: 0
        }), P(function(a) {
            return a.ea
        }))
    };

    function Lj(a, b) {
        return I(Di("data-google-av-metadata"), P(function(c) {
            if (null === c) return b(void 0);
            c = c.split("&").map(function(d) {
                return d.split("=")
            }).filter(function(d) {
                return d[0] === a
            });
            if (0 === c.length) return b(void 0);
            c = c[0].slice(1).join("=");
            return b(c)
        }))
    };
    var Mj = {
        Qg: "asmreq",
        Rg: "asmres"
    };
    var Nj = function(a) {
        Eg.call(this, a)
    };
    x(Nj, Eg);
    Nj.prototype.Ie = function(a) {
        jg(this, 1, a)
    };
    var Oj = function(a) {
        Eg.call(this, a)
    };
    x(Oj, Eg);
    Oj.prototype.Ie = function(a) {
        jg(this, 1, a)
    };
    var mg = function(a) {
        Eg.call(this, a)
    };
    x(mg, Eg);

    function Pj(a, b) {
        var c = void 0 === c ? ti(a) : c;
        var d = new MessageChannel;
        b = b.h(P(function(f) {
            return Number(f)
        }), T(function(f) {
            return !isNaN(f) && 0 !== f
        }), Je(function(f) {
            var g = new Nj;
            g.Ie(f);
            f = {
                type: "asmreq",
                payload: g.rb()
            };
            c.postMessage(f, "*", [d.port2])
        }), Vd(1));
        var e = ui(a, d.port1).h(T(function(f) {
            return "object" === typeof f.data
        }), P(function(f) {
            var g = f.data,
                h = Object.values(Mj).includes(g.type);
            g = "string" === typeof g.payload;
            if (!h || !g || "asmres" !== f.data.type) return null;
            try {
                var k = f.data.payload;
                Ya(Oj);
                if (null ==
                    k || "" == k) var l = bb(new Oj, xg);
                else {
                    Wa(k);
                    var n = JSON.parse(k);
                    if (!Array.isArray(n)) throw Error("N`" + Da(n) + "`" + n);
                    l = Xf(Oj, Mf(n))
                }
                return l
            } catch (r) {
                return null
            }
        }), T(function(f) {
            return null !== f
        }), P(function(f) {
            return f
        }));
        return b.h(X(function(f) {
            return M(f).h(Hd(e))
        }), T(function(f) {
            var g = v(f);
            f = g.next().value;
            g = g.next().value;
            return null != hg(g, 1, !1) ? qg(hg(g, 1), 0) === f : !1
        }), P(function(f) {
            f = v(f);
            f.next();
            return f.next().value
        }), zh(a.i))
    };

    function Qj(a, b, c) {
        var d = b.Fb.h(Vd(1), X(function() {
            return Pj(a, c)
        }), T(function(f) {
            var g = hg(f, 2);
            return qg(null == g ? g : !!g, !1) && void 0 !== lg(f, mg, !1) && null != hg(f, 4, !1) && null != hg(f, 5, !1)
        }), Vd(1), zh(a.i));
        b = d.h(P(function(f) {
            return {
                x: rg(og(f), 2),
                y: rg(og(f), 1)
            }
        }), V(function(f, g) {
            return f.x === g.x && f.y === g.y
        }), Y(a.i, 1));
        var e = d.h(P(function(f) {
            return rg(f, 4)
        }), Y(a.i, 1));
        d = d.h(P(function(f) {
            return rg(f, 5)
        }), Y(a.i, 1));
        return {
            Jf: e,
            cf: b,
            Uf: d
        }
    };

    function Rj(a, b) {
        return b.Fb.h(Vd(1), P(function() {
            return a.l.now().round()
        }))
    };
    var Sj = P(function(a) {
        return [a.value.I.width, a.value.I.height]
    });

    function Tj(a, b) {
        return function(c) {
            return Hj(b.map(function(d) {
                return c.h(a(d))
            }))
        }
    };

    function Uj() {
        var a;
        return I(Je(function(b) {
            return void(a = b.timestamp)
        }), Kj(), P(function(b) {
            return {
                timestamp: a,
                value: Math.round(b)
            }
        }))
    };
    var Vj = {
        P: "ns",
        S: Wh,
        I: Wh,
        N: new L,
        J: "ns",
        D: Wh,
        L: Wh,
        T: {
            x: 0,
            y: 0
        }
    };

    function Wj(a, b) {
        return Xh(a.I, b.I) && Xh(a.D, b.D) && Xh(a.S, b.S) && Xh(a.L, b.L) && a.J === b.J && a.N === b.N && a.P === b.P && a.T.x === b.T.x && a.T.y === b.T.y
    };
    var Xj = function(a) {
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
    };

    function Yj(a, b) {
        return function(c) {
            return function(d) {
                var e = d.h(se(new L), $b());
                d = c.element.h(V());
                e = e.h(P(function(f) {
                    return f.value
                }));
                return S([d, e, b]).h(P(function(f) {
                    var g = v(f);
                    f = g.next().value;
                    var h = g.next().value;
                    g = g.next().value;
                    if (void 0 === f.j) var k = {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    };
                    else {
                        k = f.j.getBoundingClientRect();
                        var l = f.j,
                            n = a.global,
                            r = new Fg(0, 0);
                        var q = (q = Ig(l)) ? q.parentWindow || q.defaultView : window;
                        if (ef(q, "parent")) {
                            do {
                                if (q == n) {
                                    var A = l,
                                        z = Ig(A);
                                    Za(A, "Parameter is required");
                                    var u = new Fg(0,
                                        0);
                                    var J = z ? Ig(z) : document;
                                    J = !gf || 9 <= Number(wf) || "CSS1Compat" == Jg(J).hb.compatMode ? J.documentElement : J.body;
                                    A != J && (A = Xj(A), z = Kg(Jg(z).hb), u.x = A.left + z.x, u.y = A.top + z.y)
                                } else u = Sa(l), u = Xj(u), u = new Fg(u.left, u.top);
                                r.x += u.x;
                                r.y += u.y
                            } while (q && q != n && q != q.parent && (l = q.frameElement) && (q = q.parent))
                        }
                        k = {
                            top: r.y,
                            left: r.x,
                            width: k.width,
                            height: k.height
                        }
                    }
                    k = Zh(k, h.T);
                    n = Yh(k, h.S);
                    r = a.l.now();
                    q = Object;
                    l = q.assign;
                    if (2 !== g || a.ib || 0 >= n.width || 0 >= n.height) var O = !1;
                    else try {
                        var aa = a.document.elementFromPoint(n.left + n.width /
                            2, n.top + n.height / 2);
                        O = aa ? !Zj(aa, f) : !1
                    } catch (Ga) {
                        O = !1
                    }
                    return {
                        timestamp: r,
                        value: l.call(q, {}, h, {
                            J: "geo",
                            L: O ? Vj.L : n,
                            D: k
                        })
                    }
                }), zh(a.i))
            }
        }
    }

    function Zj(a, b, c) {
        c = void 0 === c ? 0 : c;
        return void 0 === a.j || void 0 === b.j ? !1 : a.j === b.j || Mg(b.j, function(d) {
            return d === a.j
        }) ? !0 : b.j.ownerDocument && b.j.ownerDocument.defaultView && b.j.ownerDocument.defaultView === b.j.ownerDocument.defaultView.top ? !1 : 10 > c && b.j.ownerDocument && b.j.ownerDocument.defaultView && b.j.ownerDocument.defaultView.frameElement ? Zj(a, new Fh(b.j.ownerDocument.defaultView.frameElement), c + 1) : !0
    };

    function ak(a) {
        return function(b) {
            return b.h(a.ResizeObserver ? bk(a) : ck(a), xe(1), $b())
        }
    }

    function bk(a) {
        return function(b) {
            return b.h(X(function(c) {
                var d = a.ResizeObserver;
                if (!d || void 0 === c.j) return M(Vj.D);
                var e = (new K(function(f) {
                    function g() {
                        void 0 !== c.j && h.unobserve(c.j);
                        h.disconnect();
                        k.unsubscribe()
                    }
                    if (void 0 === c.j) return f.complete(),
                        function() {};
                    var h = new d(function(l) {
                        l.forEach(function(n) {
                            f.next(n)
                        })
                    });
                    h.observe(c.j);
                    var k = c.released.subscribe(g);
                    return g
                })).h(jh(a.s, 736), P(function(f) {
                    return f.contentRect
                }));
                return Tc(M(c.j.getBoundingClientRect()), e)
            }), V(Xh))
        }
    }

    function ck(a) {
        return function(b) {
            var c = b.h(fj(a, {
                    attributes: !0,
                    childList: !0,
                    characterData: !0,
                    subtree: !0
                })),
                d = a.mg;
            c = Tc(b.h(P(function() {
                return Eh("resize")
            })), c, d);
            return S(b, c).h(jh(a.s, 737), P(function(e) {
                e = v(e).next().value;
                return void 0 === e.j ? void 0 : e.j.getBoundingClientRect()
            }), Li(), V(Xh))
        }
    };

    function dk(a, b) {
        var c = ek(a, b).h(xe(1), $b());
        return function(d) {
            d = d.h(X(function(e) {
                return e.element
            }), V());
            return S([c, d]).h(X(function(e) {
                var f = v(e);
                e = f.next().value;
                f = f.next().value;
                return fk(a, e.Mf, ak(a), e.hg, e.Bf, f)
            }), zh(a.i))
        }
    }

    function gk(a, b) {
        var c = dk(a, b);
        return function(d) {
            var e = c(M(d));
            return function(f) {
                return S([f, e]).h(P(function(g) {
                    var h = v(g);
                    g = h.next().value;
                    h = h.next().value;
                    var k = Zh(h.value.D, g.value.T),
                        l = Yh(Zh(h.value.L, g.value.T), g.value.S);
                    return {
                        timestamp: g.timestamp.maximum(h.timestamp),
                        value: Object.assign({}, g.value, {
                            J: "nio",
                            L: l,
                            D: k
                        })
                    }
                }))
            }
        }
    }

    function hk(a) {
        return P(function(b) {
            return "nio" !== b.value.P ? b : Object.assign({}, b, {
                value: Object.assign({}, b.value, {
                    S: vi(a, !0),
                    I: vi(a, !0)
                })
            })
        })
    }

    function ik(a, b) {
        return M(b).h(a, P(function() {
            return b
        }))
    }

    function ek(a, b) {
        return a.l.timeline !== zd ? Ub(new U(2)) : a.MutationObserver ? "undefined" === typeof IntersectionObserver ? Ub(new U(0)) : (new K(function(c) {
            var d = new L,
                e = new IntersectionObserver(d.next.bind(d), {
                    threshold: [].concat(w(b))
                });
            c.next({
                hg: d.h(jh(a.s, 735)),
                Mf: e,
                Bf: function() {
                    var f = e.takeRecords();
                    0 < f.length && d.next(f)
                }
            })
        })).h(Vd(1), xe(1), $b()) : Ub(new U(1))
    }

    function jk(a) {
        return Bc(a.sort(function(b, c) {
            return b.time - c.time
        }))
    }

    function fk(a, b, c, d, e, f) {
        return new K(function(g) {
            function h() {
                A || (A = !0, void 0 !== f.j && b.unobserve(f.j), l.unsubscribe(), q.unsubscribe(), r.unsubscribe(), z.unsubscribe())
            }
            if (void 0 !== f.j) {
                b.observe(f.j);
                var k = new Ob({
                        timestamp: a.l.now(),
                        value: Object.assign({}, Vj, {
                            P: "nio",
                            J: "nio"
                        })
                    }),
                    l = d.h(Ec(function(u) {
                        return jk(u)
                    }), T(function(u) {
                        return u.target === f.j
                    }), P(function(u) {
                        return {
                            timestamp: new Bd(u.time, zd),
                            value: {
                                P: "nio",
                                S: u.rootBounds || Wh,
                                I: u.rootBounds || vi(a, !0),
                                N: n,
                                J: "nio",
                                L: u.intersectionRect,
                                D: u.boundingClientRect,
                                T: {
                                    x: 0,
                                    y: 0
                                }
                            }
                        }
                    }), se(k), $b()).subscribe(g),
                    n = new L,
                    r = n.subscribe(function() {
                        e();
                        g.next({
                            timestamp: a.l.now(),
                            value: k.value.value
                        });
                        void 0 !== f.j && (b.unobserve(f.j), b.observe(f.j))
                    }),
                    q = ik(c, f).subscribe(function() {
                        n.next()
                    }),
                    A = !1,
                    z = f.released.subscribe(function() {
                        return h()
                    });
                return h
            }
        })
    };

    function kk(a, b) {
        var c = a.gd().h(P(function() {
            return "b"
        }));
        return Yc(b, c).h(Vd(1), Y(a.i, 1))
    };

    function lk(a) {
        return function(b) {
            var c;
            return b.h(Je(function(d) {
                return void(c = d.timestamp)
            }), P(function(d) {
                return d.value
            }), a, P(function(d) {
                return {
                    timestamp: c,
                    value: d
                }
            }))
        }
    };
    var mk = function(a) {
            return a.L.width * a.L.height / (a.D.width * a.D.height)
        },
        nk = lk(I(P(function(a) {
            var b;
            return null != (b = a.ic) ? b : mk(a)
        }), P(function(a) {
            return isFinite(a) ? a : 0
        }))),
        ok = lk(I(P(function(a) {
            var b;
            return null != (b = a.ic) ? b : mk(a)
        }), P(function(a) {
            return isFinite(a) ? a : -1
        })));

    function pk(a, b) {
        a.ya && (a.Za = a.ya);
        a.ya = b;
        a.Za && a.Za.value ? (b = Math.max(0, Cd(b.timestamp, a.Za.timestamp)), a.totalTime += b, a.ea += b) : a.ea = 0;
        return a
    }

    function qk(a) {
        return I(pe(pk, {
            totalTime: 0,
            ea: 0
        }), P(function(b) {
            return new Cj(a, {
                timestamp: b.ya.timestamp,
                value: b.totalTime
            }, b.ya.value)
        }))
    }

    function rk(a) {
        return I(pe(pk, {
            totalTime: 0,
            ea: 0
        }), P(function(b) {
            return new Cj(a, {
                timestamp: b.ya.timestamp,
                value: b.ea
            }, b.ya.value)
        }))
    };

    function sk(a) {
        return I(rk(a), P(function(b) {
            return b.map(function(c) {
                return Math.round(c)
            })
        }))
    };

    function tk(a, b) {
        return b.h(P(function(c) {
            return new Dj(a.l, {
                timestamp: a.l.now(),
                value: c
            })
        }))
    };

    function uk(a, b) {
        return 1 <= a ? !0 : 0 >= a ? !1 : a >= b
    };

    function vk(a) {
        return function(b) {
            return b.h(Me(a), P(function(c) {
                var d = v(c);
                c = d.next().value;
                d = d.next().value;
                return {
                    timestamp: c.timestamp,
                    value: uk(c.value, d)
                }
            }))
        }
    };
    var wk = P(function(a) {
        if ("omid" === a.value.P) {
            if ("nio" === a.value.J) return "omio";
            if ("geo" === a.value.J) return "omgeo"
        }
        return "geo" === a.value.J || "nio" === a.value.J ? a.value.P : a.value.J
    });

    function xk() {
        return I(T(function(a, b) {
            return 0 < b
        }), yk, W(-1), V())
    }
    var yk = I(T(function(a) {
        return !isNaN(a)
    }), pe(function(a, b) {
        return isNaN(a) ? b : Math.min(a, b)
    }, NaN), V());
    var zk = lk(I(P(function(a) {
        return a.L.width * a.L.height / (a.S.width * a.S.height)
    }), P(function(a) {
        return isFinite(a) ? Math.min(1, a) : 0
    })));

    function Ak(a, b, c) {
        return a ? S([b, c]).h(T(function(d) {
            var e = v(d);
            d = e.next().value;
            e = e.next().value;
            return d.timestamp.equals(e.timestamp)
        }), P(function(d) {
            var e = v(d);
            d = e.next().value;
            e = e.next().value;
            return d.value > e.value ? d : e
        })) : b
    }

    function Bk(a) {
        return function(b) {
            var c = b.h(nk),
                d = b.h(zk);
            return a instanceof K ? a.h(X(function(e) {
                return Ak(e, c, d)
            })) : Ak(a.value, c, d)
        }
    };
    var Ck = I(lk(P(function(a) {
        a = a.ic ? a.ic * a.D.width * a.D.height / (a.I.width * a.I.height) : a.L.width * a.L.height / (a.I.width * a.I.height);
        return isFinite(a) ? a : 0
    })));

    function Dk(a, b, c, d) {
        var e = d.kc,
            f = d.bd,
            g = d.Qe,
            h = d.Ud,
            k = d.pd,
            l = d.xe;
        d = d.nc;
        b = Ek(a, c, b);
        c = Fk(a, c);
        var n = Gk(a, e, l, b),
            r = n.h(P(function(y) {
                return y.value
            }), V(), Y(a, 1), pe(function(y, G) {
                return Math.max(y, G)
            }, 0)),
            q = n.h(P(function(y) {
                return y.value
            }), xk(), Y(a, 1)),
            A = b.h(ok, P(function(y) {
                return y.value
            }), Vd(2), V(), Y(a, 1));
        g = Hk(a, b, g, h);
        var z = g.h(W(!1), V(), P(function(y) {
            return y ? k : f
        }));
        h = n.h(vk(z), V(), Y(a, 1));
        var u = S([h, b]).h(T(function(y) {
                var G = v(y);
                y = G.next().value;
                G = G.next().value;
                return y.timestamp.equals(G.timestamp)
            }),
            P(function(y) {
                var G = v(y);
                y = G.next().value;
                G = G.next().value;
                return {
                    visible: y.value,
                    geometry: G.value.D
                }
            }), pe(function(y, G) {
                return !G.visible && y.visible ? y : G
            }, {
                visible: !1,
                geometry: Wh
            }), P(function(y) {
                return y.geometry
            }), W(Wh), Y(a, 1), V(Xh));
        l = l instanceof K ? l.h(V(), me()) : Vc;
        z = S([l, z]).h(me());
        var J = b.h(T(function(y) {
                return "ns" !== y.value.P && "ns" !== y.value.J
            }), pe(function(y) {
                return y + 1
            }, 0), W(0), Y(a, 1)),
            O = c.h(me(!0), W(!1), Y(a, 1));
        O = S([d, O]).h(P(function(y) {
            var G = v(y);
            y = G.next().value;
            G = G.next().value;
            return y &&
                !G
        }), Y(a, 1));
        var aa = b.h(Ck, V()),
            Ga = aa.h(P(function(y) {
                return y.value
            }), pe(function(y, G) {
                return Math.max(y, G)
            }, 0), V(), Y(a, 1)),
            C = aa.h(P(function(y) {
                return y.value
            }), xk(), Y(a, 1));
        return {
            Ad: l,
            Pb: z,
            Aa: {
                qg: b,
                ye: b.h(wk),
                fc: u.h(V(Xh)),
                visible: h.h(V(nj)),
                Dd: n.h(V(nj)),
                we: r,
                bg: q,
                Xd: b.h(Sj, V(hb)),
                Kg: aa,
                Wf: Ga,
                ag: C,
                jc: c,
                N: (new Z(new L)).da(a),
                ue: g,
                kc: e,
                nc: d,
                dd: O,
                Lg: J,
                Tf: A
            }
        }
    }

    function Fk(a, b) {
        return b.h(T(function() {
            return !1
        }), P(function(c) {
            return c
        }), Fd(function(c) {
            return (new Z(c)).da(a)
        }))
    }

    function Ek(a, b, c) {
        return b.h(te(Vc), Y(a, 1)).h(V(function(d, e) {
            return nj(d, e, Wj)
        }), W({
            timestamp: c.now(),
            value: Vj
        }), Y(a, 1))
    }

    function Gk(a, b, c, d) {
        c = d.h(Bk(c), lk(P(function(e) {
            return Ej(e)
        })), Y(a, 1));
        return b instanceof Z ? c : S([c, b]).h(P(function(e) {
            var f = v(e);
            e = f.next().value;
            f = f.next().value;
            return {
                timestamp: f.timestamp.maximum(e.timestamp),
                value: f.value ? 0 : e.value
            }
        }), V(nj), Y(a, 10))
    }

    function Hk(a, b, c, d) {
        b = [b.h(P(function(e) {
            return 242500 <= e.value.D.width * e.value.D.height
        }))];
        c instanceof K && b.push(c.h(P(function(e) {
            return !!e
        })));
        c = S(b);
        return d ? c.h(P(function(e) {
            return e.some(function(f) {
                return f
            })
        }), W(!1), V(), Y(a, 1)) : (new Z(!1)).da(a)
    };
    var Ik = function(a) {
            this.l = a;
            this.Ec = null;
            this.timeout = new L
        },
        Kk = function(a, b) {
            Jk(a);
            a.Ec = a.l.setTimeout(function() {
                return void a.timeout.next()
            }, b)
        },
        Jk = function(a) {
            null !== a.Ec && (a.l.clearTimeout(a.Ec), a.Ec = null)
        };

    function Lk(a, b, c, d) {
        var e = Mk.Ne,
            f = new Ik(b);
        c = c.h(W(void 0), X(function() {
            Jk(f);
            return d
        })).h(P(function(g) {
            Jk(f);
            var h = g.C,
                k = g.active;
            h.value >= e || !k || (k = b.now(), k = Math.max(0, Cd(k, h.timestamp)), Kk(f, Math.max(0, e - h.value - k)));
            return g.map(function(l) {
                return l >= e
            })
        }));
        return S([c, Tc(f.timeout, M(void 0))]).h(P(function(g) {
            return v(g).next().value
        }), Ge(function(g) {
            return !g.Y().value
        }, !0), Y(a, 1))
    };

    function Nk(a) {
        var b = new Cj(a, {
            timestamp: a.now(),
            value: 0
        }, !1);
        return I(rk(a), pe(function(c, d) {
            return c.C.value > d.C.value ? new Cj(a, c.C, !1) : d
        }, b), P(function(c) {
            return c.map(function(d) {
                return Math.round(d)
            })
        }))
    };

    function Ok(a) {
        return function(b) {
            return I(vk(M(b)), Nk(a))
        }
    };

    function Pk(a) {
        return function(b) {
            return I(lk(P(function(c) {
                return uk(c, b)
            })), qk(a), P(function(c) {
                return c.map(function(d) {
                    return Math.round(d)
                })
            }))
        }
    };

    function Qk(a) {
        return a.map(function(b) {
            return b.map(function(c) {
                return [c]
            })
        }).reduce(function(b, c) {
            return b.ia(c).map(function(d) {
                return d.flat()
            })
        })
    }

    function Rk(a, b) {
        return a.ia(b).map(function(c) {
            var d = v(c);
            c = d.next().value;
            d = d.next().value;
            return c - d
        })
    }

    function Sk(a, b, c, d, e, f) {
        var g = Tk;
        if (1 < g.length)
            for (var h = 0; h < g.length - 1; h++)
                if (g[h] < g[h + 1]) throw Error();
        h = f.h(W(void 0), X(function() {
            return d.h(sk(a))
        }), V(function(k, l) {
            return k.X(l)
        }), Y(b, 1));
        f = f.h(W(void 0), X(function() {
            return d.h(Nk(a))
        }), V(function(k, l) {
            return k.X(l)
        }), Y(b, 1));
        return {
            Hb: e.h(W(void 0), X(function() {
                return c.h(Tj(Ok(a), g))
            }), P(Qk), V(function(k, l) {
                return k.X(l)
            }), Y(b, 1)),
            Sb: e.h(W(void 0), X(function() {
                return c.h(Tj(Pk(a), g), P(function(k) {
                    return k.map(function(l, n) {
                        return 0 < n ? Rk(l,
                            k[n - 1]) : l
                    })
                }))
            }), P(Qk), V(function(k, l) {
                return k.X(l)
            }), Y(b, 1)),
            Gb: f,
            Ua: h.h(V(function(k, l) {
                return k.X(l)
            }), Y(b, 1))
        }
    };

    function Uk(a) {
        var b;
        if (b = Vk(a)) b = !Wk(a, "abgcp") && !Wk(a, "abgc") && !("string" === typeof a.id && "abgb" === a.id) && !("string" === typeof a.id && "mys-abgc" === a.id) && !Wk(a, "cbb");
        return b
    }

    function Wk(a, b) {
        return a.classList ? a.classList.contains(b) : -1 < (" " + a.className + " ").indexOf(" " + b + " ")
    }

    function Vk(a) {
        try {
            var b = a.getBoundingClientRect();
            return b && 30 <= b.height && 30 <= b.width
        } catch (c) {
            return !1
        }
    }

    function Xk(a, b) {
        if (void 0 === a.j || !a.j.children) return a;
        for (var c = gb(a.j.children); c.length;) {
            var d = b ? c.filter(Uk) : c.filter(Vk);
            if (1 === d.length) return new Fh(d[0]);
            if (1 < d.length) break;
            c = jb(c, function(e) {
                return gb(e.children)
            })
        }
        return a
    }

    function Yk(a, b, c, d, e) {
        if (c) return {
            dc: b,
            ab: M(null)
        };
        c = b.element.h(P(function(f) {
            a: if (void 0 === f.j || Vk(f.j)) f = {
                    wc: f,
                    ab: "mue"
                };
                else {
                    var g = Xk(f, e);
                    if (void 0 !== g.j && Vk(g.j)) f = {
                        wc: g,
                        ab: "ie"
                    };
                    else {
                        if (d || a.kd)
                            if (g = a.document.querySelector(".GoogleActiveViewInnerContainer")) {
                                f = {
                                    wc: new Fh(g),
                                    ab: "ce"
                                };
                                break a
                            }
                        f = {
                            wc: f,
                            ab: "mue"
                        }
                    }
                }return f
        }), Ae());
        return {
            dc: {
                Ab: b.Ab,
                element: c.h(P(function(f) {
                    return f.wc
                }))
            },
            ab: c.h(P(function(f) {
                return f.ab
            }))
        }
    };

    function Zk(a, b, c, d) {
        var e = d.kc,
            f = d.bd,
            g = d.Qe,
            h = d.Ud,
            k = d.pd,
            l = d.xe;
        d = d.nc;
        b = $k(a, c, b);
        c = al(a, c);
        var n = bl(a, e, l, b),
            r = n.h(P(function(C) {
                return C.value
            }), V(), Y(a, 1), pe(function(C, y) {
                return Math.max(C, y)
            }, 0)),
            q = n.h(P(function(C) {
                return C.value
            }), xk(), Y(a, 1)),
            A = b.h(ok, P(function(C) {
                return C.value
            }), Vd(2), V(), Y(a, 1));
        g = cl(a, b, g, h);
        var z = g.h(W(!1), V(), P(function(C) {
            return C ? k : f
        }));
        h = n.h(vk(z), V(), Y(a, 1));
        var u = S([h, b]).h(T(function(C) {
                var y = v(C);
                C = y.next().value;
                y = y.next().value;
                return C.timestamp.equals(y.timestamp)
            }),
            P(function(C) {
                var y = v(C);
                C = y.next().value;
                y = y.next().value;
                return {
                    visible: C.value,
                    geometry: y.value.D
                }
            }), pe(function(C, y) {
                return !y.visible && C.visible ? C : y
            }, {
                visible: !1,
                geometry: Wh
            }), P(function(C) {
                return C.geometry
            }), W(Wh), Y(a, 1), V(Xh));
        l = l instanceof K ? l.h(V(), me()) : Vc;
        z = S([l, z]).h(me());
        var J = b.h(T(function(C) {
                return "ns" !== C.value.P && "ns" !== C.value.J
            }), pe(function(C) {
                return C + 1
            }, 0), W(0), Y(a, 1)),
            O = c.h(me(!0), W(!1), Y(a, 1));
        O = S([d, O]).h(P(function(C) {
            var y = v(C);
            C = y.next().value;
            y = y.next().value;
            return C &&
                !y
        }), Y(a, 1));
        var aa = b.h(Ck, V()),
            Ga = aa.h(P(function(C) {
                return C.value
            }), pe(function(C, y) {
                return Math.max(C, y)
            }, 0), V(), Y(a, 1));
        a = aa.h(P(function(C) {
            return C.value
        }), xk(), Y(a, 1));
        return {
            Ad: l,
            Pb: z,
            Aa: {
                qg: b,
                ye: b.h(wk),
                fc: u.h(V(Xh)),
                visible: h.h(V(nj)),
                Dd: n.h(V(nj)),
                we: r,
                bg: q,
                Xd: b.h(Sj, V(hb)),
                Kg: aa,
                Wf: Ga,
                ag: a,
                jc: c,
                N: b.h(P(function(C) {
                    return C.value.N
                })),
                ue: g,
                kc: e,
                nc: d,
                dd: O,
                Lg: J,
                Tf: A
            }
        }
    }

    function al(a, b) {
        return b.h(T(function() {
            return !1
        }), P(function(c) {
            return c
        }), Fd(function(c) {
            return (new Z(c)).da(a)
        }))
    }

    function $k(a, b, c) {
        return b.h(te(Vc), Y(a, 1)).h(V(function(d, e) {
            return nj(d, e, Wj)
        }), W({
            timestamp: c.now(),
            value: Vj
        }), Y(a, 1))
    }

    function bl(a, b, c, d) {
        c = d.h(Bk(c), lk(P(function(e) {
            return Ej(e)
        })), Y(a, 1));
        return b instanceof Z ? c : S([c, b]).h(P(function(e) {
            var f = v(e);
            e = f.next().value;
            f = f.next().value;
            return {
                timestamp: f.timestamp.maximum(e.timestamp),
                value: f.value ? 0 : e.value
            }
        }), V(nj), Y(a, 1))
    }

    function cl(a, b, c, d) {
        b = [b.h(P(function(e) {
            return 242500 <= e.value.D.width * e.value.D.height
        }))];
        c instanceof K && b.push(c.h(P(function(e) {
            return !!e
        })));
        c = S(b);
        return d ? c.h(P(function(e) {
            return e.some(function(f) {
                return f
            })
        }), W(!1), V(), Y(a, 1)) : (new Z(!1)).da(a)
    };
    var dl = I(Di("data-google-av-itpl"), P(function(a) {
        return Number(a)
    }), P(function(a) {
        return isNaN(a) ? 1 : a
    }));
    var el = {
            Pg: "addEventListener",
            Vg: "getMaxSize",
            Wg: "getScreenSize",
            Xg: "getState",
            Yg: "getVersion",
            ah: "removeEventListener",
            Zg: "isViewable"
        },
        gl = function(a, b) {
            b = void 0 === b ? function(f) {
                return fl(f)
            } : b;
            this.na = null;
            this.Lf = new L;
            var c = a.kd,
                d = !a.ib;
            if (c && d) {
                var e = a.global.top.mraid;
                if (e) {
                    this.cc = b(e);
                    this.na = e;
                    this.bb = 3;
                    return
                }
            }(a = a.global.mraid) ? (this.cc = b(a), this.na = a, this.bb = c ? d ? 2 : 1 : 0) : (this.bb = -1, this.cc = 2)
        };
    gl.prototype.addEventListener = function(a, b) {
        return this.pb("addEventListener", a, b)
    };
    gl.prototype.removeEventListener = function(a, b) {
        return this.pb("removeEventListener", a, b)
    };
    gl.prototype.he = function() {
        var a = this.pb("getVersion");
        return "string" === typeof a ? a : ""
    };
    gl.prototype.getState = function() {
        var a = this.pb("getState");
        return "string" === typeof a ? a : ""
    };
    var hl = function(a) {
            a = a.pb("isViewable");
            return "boolean" === typeof a ? a : !1
        },
        il = function(a) {
            if (a.na) return a = a.na.AFMA_LIDAR, "string" === typeof a ? a : void 0
        },
        fl = function(a) {
            return a ? a.IS_GMA_SDK ? Object.values(el).every(function(b) {
                return "function" === typeof a[b]
            }) ? 0 : 1 : 2 : 1
        };
    gl.prototype.pb = function(a) {
        var b = B.apply(1, arguments);
        if (this.na) try {
            return this.na[a].apply(this.na, w(b))
        } catch (c) {
            this.Lf.next(a)
        }
    };
    p.Object.defineProperties(gl.prototype, {
        be: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                if (this.na) {
                    var a = this.na.AFMA_LIDAR_EXP_1;
                    return void 0 === a ? void 0 : !!a
                }
            },
            set: function(a) {
                this.na && (this.na.AFMA_LIDAR_EXP_1 = a)
            }
        }
    });

    function jl(a, b) {
        return -1 !== (new gl(a)).bb ? (new Z(!0)).da(a.i) : b.h(Di("data-google-av-inapp"), P(function(c) {
            return null !== c
        }), Y(a.i, 1))
    };
    var ll = function(a, b) {
            var c = this;
            this.l = a;
            this.qd = this.uc = null;
            this.tg = b.h(V()).subscribe(function(d) {
                kl(c);
                c.qd = d
            })
        },
        ml = function(a, b) {
            kl(a);
            a.uc = a.l.setTimeout(function() {
                var c;
                return void(null == (c = a.qd) ? void 0 : c.next())
            }, b)
        },
        kl = function(a) {
            null !== a.uc && a.l.clearTimeout(a.uc);
            a.uc = null
        };

    function nl(a, b, c, d, e) {
        var f = Mk.Ne;
        var g = void 0 === g ? new ll(b, d) : g;
        return (new K(function(h) {
            var k = c.h(W(void 0), X(function() {
                return ol(e)
            })).h(P(function(l) {
                var n = l.value;
                l = l.timestamp;
                var r = n.visible;
                n = n.Ua;
                var q = n >= f;
                q || !r ? kl(g) : (l = Math.max(0, Cd(b.now(), l)), ml(g, Math.max(0, f - n - l)));
                return q
            }), pe(function(l, n) {
                return n || l
            }, !1), V()).subscribe(h);
            return function() {
                kl(g);
                g.tg.unsubscribe();
                g.qd = null;
                k.unsubscribe()
            }
        })).h(Ge(function(h) {
            return !h
        }, !0), Y(a, 1))
    }

    function ol(a) {
        return Hj([a, a.h(Uj())]).h(P(function(b) {
            var c = v(b);
            b = c.next().value;
            c = c.next().value;
            return {
                timestamp: b.timestamp,
                value: {
                    visible: b.value,
                    Ua: c.value
                }
            }
        }), V(function(b, c) {
            return nj(b, c, function(d, e) {
                return d.Ua === e.Ua && d.visible === e.visible
            })
        }))
    };

    function pl(a, b) {
        return {
            Qc: b.h(Di("data-google-av-adk")),
            Rc: b.h(Di("data-google-av-btr"), V(), P(function(c) {
                return null === c ? [] : c.split("|").filter(function(d) {
                    return "" !== d
                })
            })),
            Wc: b.h(Di("data-google-av-cpmav"), V(), P(function(c) {
                return null === c ? [] : c.split("|").filter(function(d) {
                    return "" !== d
                })
            })),
            nf: hj(a, b),
            flags: b.h(Di("data-google-av-flags"), V()),
            Ma: jl(a, b),
            nd: b.h(Lj("cr", function(c) {
                return "1" === c
            }), V()),
            Qf: b.h(Lj("omid", function(c) {
                return "1" === c
            }), V()),
            md: b.h(dl),
            metadata: b.h(Di("data-google-av-metadata")),
            Fa: b.h(Ki),
            Ha: b.h(Ei),
            Og: b.h(Lj("la", function(c) {
                return "1" === c
            }), V()),
            jb: b.h(Di("data-google-av-turtlex"), P(function(c) {
                return null !== c
            }), V())
        }
    };

    function ql() {
        return I(Kj(), pe(function(a, b) {
            return Math.max(a, b)
        }, 0), P(function(a) {
            return Math.round(a)
        }))
    };

    function rl(a) {
        return I(vk(M(a)), ql())
    };

    function sl(a, b, c, d, e) {
        c = c.h(P(function() {
            return !1
        }));
        d = S([e, d]).h(X(function(f) {
            f = v(f).next().value;
            return tl(b, f)
        }));
        return Tc(M(!1), c, d).h(V(), Y(a.i, 1))
    }

    function tl(a, b) {
        return a.h(P(function(c) {
            return b || 0 === c || 2 === c
        }))
    };
    var ul = [33, 32],
        vl = I(dl, P(function(a) {
            return 0 <= ul.indexOf(a)
        }), V());

    function wl(a, b, c, d, e, f) {
        var g = c.h(P(function(k) {
                return 9 === k
            })),
            h = b.element.h(vl);
        c = e.h(T(function(k) {
            return k
        }), X(function() {
            return S([g, h])
        }), P(function(k) {
            k = v(k);
            var l = k.next().value;
            return !k.next().value || l
        }), V());
        f = S([c, d.h(V()), f]).h(P(function(k) {
            var l = v(k);
            k = l.next().value;
            var n = l.next().value;
            l = l.next().value;
            return Yk(a, b, !k, n, l)
        }), xe(1), $b());
        d = f.h(P(function(k) {
            return k.dc
        }));
        f = f.h(X(function(k) {
            return k.ab
        }), W(null), V(), Y(a.i, 1));
        return {
            Ca: d,
            yb: f
        }
    };

    function xl(a) {
        var b = void 0 === b ? !1 : b;
        return I(X(function(c) {
            return Vh(a.document, c, b)
        }), Y(a.i, 1))
    };
    var yl = function(a, b, c, d, e, f) {
        this.Fb = b.element.h(xl(a), Y(a.i, 1));
        this.Ke = sl(a, c, b.element, this.Fb, d);
        c = wl(a, b, e, d, this.Ke, f);
        d = c.yb;
        this.Ca = c.Ca;
        this.yb = d;
        this.Kd = Tc((new Z(1)).da(a.i), b.element.h(Vd(1), P(function() {
            return 2
        }), Y(a.i, 1)), this.Fb.h(Vd(1), P(function() {
            return 3
        }), Y(a.i, 1)), this.Ke.h(T(Boolean), Vd(1), P(function() {
            return 0
        }), Y(a.i, 1))).h(Ge(function(g) {
            return 0 !== g
        }, !0), Y(a.i, 0))
    };

    function zl(a, b) {
        return a && 0 === b ? 15 : a || 1 !== b ? null : 14
    }

    function Al(a, b, c) {
        return b instanceof K ? b.h(X(function(d) {
            return (d = zl(d, c)) ? Ub(new U(d)) : a
        })) : (b = zl(b.value, c)) ? Ub(new U(b)) : a
    };

    function Bl(a) {
        var b = new U(13);
        if (1 > a.length) return {
            chain: Pb,
            Tc: Pb
        };
        var c = new L,
            d = a[0];
        return {
            chain: a.slice(1).reduce(function(e, f) {
                return e.h(Fd(function(g) {
                    c.next(g);
                    return f
                }))
            }, d).h(Fd(function(e) {
                c.next(e);
                return Ub(b)
            }), se(new L), $b()),
            Tc: c
        }
    };
    var Cl = function() {};
    var Dl = function(a, b) {
        this.context = a;
        this.Fg = b
    };
    x(Dl, Cl);
    Dl.prototype.Ka = function(a, b) {
        var c = this.Fg.map(function(f) {
                return f.Ka(a, b)
            }),
            d = Bl(c.map(function(f) {
                return f.La
            })),
            e = d.Tc.h(El());
        return {
            La: d.chain.h(Y(this.context.i, 1)),
            Ia: Object.assign.apply(Object, [{
                Bd: e,
                zh: d.Tc
            }].concat(w(c.map(function(f) {
                return f.Ia
            }))))
        }
    };
    var El = function() {
        return pe(function(a, b) {
            b instanceof U ? a.push(b.Yf) : a.push(-1);
            return a
        }, [])
    };

    function Fl(a, b) {
        var c = a.h(se(new L), $b());
        return X(function(d) {
            return c.h(b(d))
        })
    };

    function Gl(a, b) {
        var c = void 0 === c ? function() {
            var f = (eh(a.global) ? a.global.innerWidth : 0) || a.hd() || 0,
                g = (eh(a.global) ? a.global.innerHeight : 0) || a.ed() || 0;
            return {
                left: 0,
                top: 0,
                width: f,
                height: g
            }
        } : c;
        var d = a.ib ? Uh(a.document) ? a.Pf ? null : Ub(new U(5)) : Ub(new U(4)) : Ub(new U(3));
        if (d) return d;
        var e = new L;
        return Tc(M({}), b, e).h(P(function() {
            var f = Hl(a, c);
            return {
                timestamp: a.l.now(),
                value: {
                    P: "iem",
                    S: f,
                    I: f,
                    N: e,
                    T: {
                        x: 0,
                        y: 0
                    }
                }
            }
        }), Y(a.i, 1))
    }

    function Hl(a, b) {
        b = b();
        var c = Kg(document),
            d = function(q, A) {
                return !!a.document.elementFromPoint(q, A)
            },
            e = Math.floor(b.left - c.x),
            f = Math.floor(b.top - c.y),
            g = Math.floor(b.left + b.width - c.x),
            h = Math.floor(b.top + b.height - c.y);
        b = d(e, f);
        c = d(g, h);
        if (b && c) return {
            top: f,
            left: e,
            width: g - e,
            height: h - f
        };
        var k = d(g, f),
            l = d(e, h);
        if (b) h = Il(f, h, function(q) {
            return d(e, q)
        }), g = Il(e, g, function(q) {
            return d(q, f)
        });
        else if (k) h = Il(f, h, function(q) {
            return d(g, q)
        }), e = Il(g, e, function(q) {
            return d(q, f)
        });
        else if (l) f = Il(h, f, function(q) {
            return d(e,
                q)
        }), g = Il(e, g, function(q) {
            return d(q, h)
        });
        else if (c) f = Il(h, f, function(q) {
            return d(g, q)
        }), e = Il(g, e, function(q) {
            return d(q, h)
        });
        else {
            var n = Math.floor((e + g) / 2),
                r = Math.floor((f + h) / 2);
            if (!d(n, r)) return {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            };
            f = Il(r, f, function(q) {
                return d(n, q)
            });
            h = Il(r, h, function(q) {
                return d(n, q)
            });
            e = Il(n, e, function(q) {
                return d(q, r)
            });
            g = Il(n, g, function(q) {
                return d(q, r)
            })
        }
        return {
            top: f,
            left: e,
            width: g - e,
            height: h - f
        }
    }

    function Il(a, b, c) {
        if (c(b)) return b;
        for (var d = 15; d--;) {
            var e = Math.floor((a + b) / 2);
            if (e === a || e === b) break;
            c(e) ? a = e : b = e
        }
        return a
    };
    var Jl = function(a, b) {
        this.context = a;
        this.Ya = b
    };
    x(Jl, Cl);
    Jl.prototype.Ka = function(a, b) {
        var c = Fl(Gl(this.context, this.Ya), Yj(this.context, b.Fa));
        return {
            La: Al(a.Ca.h(c), b.Ma, 0),
            Ia: {}
        }
    };

    function Kl(a, b) {
        if (a.ib) return Ub(new U(6));
        var c = new L;
        return Tc(M({}), b, c).h(P(function() {
            return {
                timestamp: a.l.now(),
                value: {
                    P: "geo",
                    S: Ll(a),
                    I: vi(a, !0),
                    N: c,
                    T: {
                        x: 0,
                        y: 0
                    }
                }
            }
        }), zh(a.i))
    }

    function Ll(a) {
        var b = vi(a, !1);
        if (!a.kd || !eh(a.global.parent) || a.global.parent === a.global) return b;
        var c = new si(a.global.parent, a.Va);
        c.M = a.M;
        c = Ll(c);
        a = a.global.frameElement.getBoundingClientRect();
        return Yh(Zh(Yh(c, a), {
            x: b.left - a.left,
            y: b.top - a.top
        }), b)
    };
    var Ml = function(a, b) {
        this.context = a;
        this.Ya = b
    };
    x(Ml, Cl);
    Ml.prototype.Ka = function(a, b) {
        var c = Fl(Kl(this.context, this.Ya), Yj(this.context, b.Fa));
        return {
            La: Al(a.Ca.h(c), b.Ma, 0),
            Ia: {}
        }
    };
    var Nl = function(a, b, c) {
        c = void 0 === c ? dk(a, b) : c;
        this.context = a;
        this.Nf = c
    };
    x(Nl, Cl);
    Nl.prototype.Ka = function(a, b) {
        return {
            La: Al(a.Ca.h(this.Nf, hk(this.context)), b.Ma, 0),
            Ia: {}
        }
    };

    function Ol(a, b, c, d, e) {
        var f = void 0 === f ? new gl(a) : f;
        var g = void 0 === g ? Se(a.l, 500) : g;
        var h = void 0 === h ? Se(a.l, 100) : h;
        e = M(f).h(Pl(c), Je(function(k) {
            d.next(k.bb)
        }), Ql(a, h), Rl(a), Sl(a, e), xe(1), $b());
        f = new L;
        b = Tc(M({}), b, f);
        return e.h(Tl(a, f, b, g, c), Y(a.i, 1))
    }

    function Sl(a, b) {
        return I(function(c) {
            return S([c, b])
        }, Ld(function(c) {
            c = v(c);
            var d = c.next().value;
            return 9 !== c.next().value || hl(d) ? M(!0) : Ul(a, d, "viewableChange").h(T(function(e) {
                return v(e).next().value
            }), Vd(1))
        }), P(function(c) {
            return v(c).next().value
        }))
    }

    function Pl(a) {
        return X(function(b) {
            if (-1 === b.bb) return a.next("if"), Ub(new U(7));
            if (0 !== b.cc) switch (b.cc) {
                case 1:
                    return a.next("mm"), Ub(new U(18));
                case 2:
                    return a.next("ng"), Ub(new U(17));
                default:
                    return a.next("i"), Ub(new U(8))
            }
            return M(b)
        })
    }

    function Ql(a, b) {
        return Ld(function() {
            var c = a.Be;
            return "complete" === Sh(a.document) ? M(!0) : c.h(Ld(function() {
                return b
            }))
        })
    }
    var Rl = function(a) {
        return X(function(b) {
            return "loading" !== b.getState() ? M(b) : Ul(a, b, "ready").h(P(function() {
                return b
            }))
        })
    };

    function Tl(a, b, c, d, e) {
        return X(function(f) {
            var g = il(f);
            if ("string" !== typeof g) return e.next("nc"), Ub(new U(9));
            void 0 !== f.be && (f.be = !0);
            g = Ul(a, f, g, Vl);
            var h = {
                version: f.he(),
                bb: f.bb
            };
            g = g.h(P(function(l) {
                return Wl.apply(null, [a, b, f, h].concat(w(l)))
            }));
            var k = d.h(Je(function() {
                e.next("mt")
            }), X(function() {
                return Ub(new U(10))
            }));
            g = Yc(g, k);
            return S([g, c]).h(P(function(l) {
                l = v(l).next().value;
                return Object.assign({}, l, {
                    timestamp: a.l.now()
                })
            }))
        })
    }

    function Vl(a, b) {
        return (null === b || "number" === typeof b) && (null === a || !!a && "number" === typeof a.height && "number" === typeof a.width && "number" === typeof a.x && "number" === typeof a.y)
    }

    function Wl(a, b, c, d, e, f) {
        e = e ? {
            left: e.x,
            top: e.y,
            width: e.width,
            height: e.height
        } : Wh;
        c = c.pb("getMaxSize");
        var g = null != c && "number" === typeof c.width && "number" === typeof c.height ? c : {
            width: 0,
            height: 0
        };
        c = {
            left: 0,
            top: 0,
            width: -1,
            height: -1
        };
        if (g) {
            var h = Number(String(g.width));
            g = Number(String(g.height));
            c = isNaN(h) || isNaN(g) ? c : {
                left: 0,
                top: 0,
                width: h,
                height: g
            }
        }
        a = {
            value: {
                S: e,
                I: c,
                P: "mraid",
                N: b,
                T: {
                    x: 0,
                    y: 0
                }
            },
            timestamp: a.l.now()
        };
        return Object.assign({}, a, d, {
            eh: f
        })
    }

    function Ul(a, b, c, d) {
        d = void 0 === d ? function() {
            return !0
        } : d;
        return (new K(function(e) {
            var f = a.s.Ga(745, function() {
                e.next(B.apply(0, arguments))
            });
            b.addEventListener(c, f);
            return function() {
                b.removeEventListener(c, f)
            }
        })).h(T(function(e) {
            return d.apply(null, w(e))
        }))
    };
    var Xl = function(a, b) {
        this.context = a;
        this.Ya = b
    };
    x(Xl, Cl);
    Xl.prototype.Ka = function(a, b) {
        var c = new Wb(1),
            d = new Wb(1),
            e = Fl(Ol(this.context, this.Ya, c, d, b.Fa), Yj(this.context, b.Fa));
        return {
            La: Al(a.Ca.h(e), b.Ma, 1),
            Ia: {
                rd: c.h(Y(this.context.i, 1)),
                sd: d.h(Y(this.context.i, 1))
            }
        }
    };

    function Yl(a) {
        return ["backgrounded", "notFound", "hidden", "noOutputDevice"].includes(a)
    };

    function Zl() {
        var a = Error;
        return Ag(function(b) {
            return b instanceof a
        }, function() {
            return Dg(a)
        })
    };

    function $l(a, b) {
        var c = void 0 === c ? null : c;
        var d = new L,
            e = void 0,
            f = a.ge,
            g = d.h(P(function() {
                return e ? Object.assign({}, e, {
                    timestamp: a.l.now()
                }) : null
            }), T(function(k) {
                return null !== k
            }), P(function(k) {
                return k
            }));
        b = S([Tc(f, g), b]);
        var h = c;
        return b.h(T(function(k) {
            k = v(k).next().value;
            null === h && (h = k.value.bf);
            return k.value.bf === h
        }), Je(function(k) {
            return void(e = v(k).next().value)
        }), P(function(k) {
            var l = v(k);
            k = l.next().value;
            l = l.next().value;
            try {
                var n = k.value.data,
                    r = k.timestamp,
                    q = n.viewport,
                    A = Object.assign({},
                        q, {
                            x: 0,
                            y: 0,
                            vh: q.width * q.height
                        }),
                    z = am(A),
                    u = n.adView,
                    J = u.measuringElement && u.containerGeometry ? am(u.containerGeometry) : am(u.geometry),
                    O = am(u.geometry),
                    aa = u.reasons.some(Yl),
                    Ga = aa ? Wh : am(u.onScreenGeometry),
                    C;
                l && (C = u.percentageInView / 100);
                l && aa && (C = 0);
                return {
                    timestamp: r,
                    value: {
                        P: "omid",
                        S: J,
                        I: z,
                        N: d,
                        J: "omid",
                        D: O,
                        T: {
                            x: J.left,
                            y: J.top
                        },
                        L: Ga,
                        ic: C
                    }
                }
            } catch (Qc) {
                z = Qc;
                n = Zl();
                r = Bg;
                Bg = void 0;
                q = [];
                A = n(z, q);
                !A && q && (z = "Expected " + n.ie() + ", got " + Cg(z), q.push(z));
                if (!A) {
                    var y = "";
                    r && (y = r() + "\n");
                    throw Error("O`" + y + "`" +
                        n.ie() + "`" + q.reverse().join("\n"));
                }
                var G;
                n = null != (G = null == (y = Qc) ? void 0 : y.message) ? G : "An unknown error occurred";
                y = "Error while processing geometryChange event: " + JSON.stringify(k.value) + "; " + n;
                throw Error(y);
            }
        }), xe(1), $b())
    }

    function am(a) {
        return {
            left: Math.floor(a.x),
            top: Math.floor(a.y),
            width: Math.floor(a.width),
            height: Math.floor(a.height)
        }
    };

    function bm(a, b, c, d) {
        c = void 0 === c ? Vc : c;
        var e = a.i;
        if (null === b) return Ub(new U(20));
        if (!b.validate()) return Ub(new U(21));
        var f;
        d = cm(e, b, d).h(P(function(g) {
            var h = g.value;
            g = g.timestamp;
            var k = b.l,
                l = a.l;
            if (k.timeline !== g.timeline) throw new td;
            g = new Bd(g.value - k.now().value + l.now().value, l.timeline);
            return f = {
                value: h,
                timestamp: g
            }
        }));
        return Tc(d, c.h(P(function() {
            return f
        }))).h(T(function(g) {
            return void 0 !== g
        }), P(function(g) {
            return g
        }), Y(a.i, 1))
    }

    function cm(a, b, c) {
        return $l(b, c).h(Y(a, 1), P(function(d) {
            return {
                timestamp: d.timestamp,
                value: {
                    T: {
                        x: d.value.D.left,
                        y: d.value.D.top
                    },
                    S: d.value.L,
                    I: d.value.I,
                    P: d.value.J,
                    N: d.value.N
                }
            }
        }))
    };
    var dm = function(a, b, c) {
        this.ud = a;
        this.Ub = b;
        this.Ya = c
    };
    x(dm, Cl);
    dm.prototype.Ka = function(a, b) {
        var c = b.Fa;
        b = bm(this.Ub, this.ud, this.Ya, b.Ae);
        c = Fl(b, Yj(this.Ub, c));
        return {
            La: a.Ca.h(c),
            Ia: {}
        }
    };
    var em = function(a, b, c) {
        this.ud = a;
        this.Ub = b;
        this.wf = c
    };
    x(em, Cl);
    em.prototype.Ka = function(a, b) {
        b = bm(this.Ub, this.ud, void 0, b.Ae);
        var c = gk(this.Ub, this.wf);
        b = Fl(b, c);
        return {
            La: a.Ca.h(b),
            Ia: {}
        }
    };

    function fm(a) {
        return a.document.ng.h(P(function(b) {
            return "visible" === b
        }), V(), Y(a.i, 1))
    };
    var gm = function() {
            this.ee = {}
        },
        vj = function(a, b) {
            a = a.ee[b.key];
            if ("proto" === b.valueType) {
                try {
                    var c = JSON.parse(a);
                    if (Array.isArray(c)) return c
                } catch (d) {}
                return b.defaultValue
            }
            return typeof a === typeof b.defaultValue ? a : b.defaultValue
        };

    function hm(a) {
        var b = new gm;
        return I(P(function(c) {
            if (null === c) return null;
            try {
                var d = JSON.parse(c)[0];
                c = "";
                for (var e = 0; e < d.length; e++) c += String.fromCharCode(d.charCodeAt(e) ^ "\u0003\u0007\u0003\u0007\b\u0004\u0004\u0006\u0005\u0003".charCodeAt(e % 10));
                b.ee = JSON.parse(c)
            } catch (f) {}
            return b
        }), Y(a.i, 1))
    };
    var im;
    im = ["av.key", "js", "20221207"].slice(-1)[0];

    function jm(a, b, c) {
        var d;
        return b.h(V(), X(function(e) {
            return c.h(P(function() {
                if (!d) {
                    d = !0;
                    try {
                        e.next()
                    } finally {
                        d = !1
                    }
                }
                return !0
            }))
        }), W(!1), Y(a.i, 1))
    };

    function km(a) {
        return I(lk(P(function(b) {
            return uk(b, a)
        })), Jj(), P(function(b) {
            return Math.round(b)
        }))
    };

    function lm(a, b, c, d, e) {
        var f = Tk;
        if (1 < f.length)
            for (var g = 0; g < f.length - 1; g++)
                if (f[g] < f[g + 1]) throw Error();
        g = e.h(W(void 0), X(function() {
            return c.h(Uj())
        }), V(), Y(a, 1));
        e = e.h(W(void 0), X(function() {
            return c.h(ql())
        }), V(), Y(a, 1));
        return {
            Hb: d.h(W(void 0), X(function() {
                return b.h(Tj(rl, f))
            }), V(hb), Y(a, 1)),
            Sb: d.h(W(void 0), X(function() {
                return b.h(Tj(km, f), P(function(h) {
                    return h.map(function(k, l) {
                        return 0 < l ? k - h[l - 1] : k
                    })
                }))
            }), V(hb), Y(a, 1)),
            Gb: e,
            Ua: g.h(V(nj), Y(a, 1))
        }
    };

    function mm(a, b, c) {
        var d = c.h(P(function(e) {
            return {
                value: e,
                timestamp: a.l.now()
            }
        }), V(nj));
        return b instanceof K ? b.h(V(), X(function(e) {
            return e ? (new Z({
                value: !1,
                timestamp: a.l.now()
            })).da(a.i) : d
        })) : !1 === b.value ? d : new Z(!1)
    }

    function nm(a, b, c, d, e, f) {
        var g = Mk;
        b = b instanceof K ? b.h(W(!1), V()) : b;
        var h = !(Ng() || Og());
        c = mm(a, c, d);
        a = f.Ca.h(Gj(a.i));
        return Object.assign({}, g, {
            kc: c,
            Qe: e,
            Ud: h,
            xe: b,
            nc: a
        })
    };

    function om(a) {
        a = a.global;
        if ("undefined" === typeof a.__google_lidar_) return a.__google_lidar_ = 1, !1;
        a.__google_lidar_ = Number(a.__google_lidar_) + 1;
        var b = a.__google_lidar_adblocks_count_;
        if ("number" === typeof b && 0 < b && (a = a.__google_lidar_radf_, "function" === typeof a)) try {
            a()
        } catch (c) {}
        return !0
    }

    function pm(a) {
        var b = a.global;
        b.osdlfm = function() {
            return b.__google_lidar_radf_
        };
        if (void 0 !== b.__google_lidar_radf_) return Pb;
        b.__google_lidar_adblocks_count_ = 1;
        var c = new L;
        b.__google_lidar_radf_ = function() {
            return void c.next(a)
        };
        return c.h(jh(a.s, 743))
    };

    function qm() {
        var a = nb();
        return a ? eb("Android TV;AppleTV;Apple TV;GoogleTV;HbbTV;NetCast.TV;Opera TV;POV_TV;SMART-TV;SmartTV;TV Store;AmazonWebAppPlatform;MiBOX".split(";"), function(b) {
            return kb(a, b)
        }) || kb(a, "OMI/") && !kb(a, "XiaoMi/") ? !0 : kb(a, "Presto") && kb(a, "Linux") && !kb(a, "X11") && !kb(a, "Android") && !kb(a, "Mobi") : !1
    };
    var Mk = Object.freeze({
            Ne: 1E3,
            bd: .5,
            pd: .3
        }),
        Tk = Object.freeze([1, .75, Mk.bd, Mk.pd, 0]),
        aj = "https://pagead2.googlesyndication.com/pagead/gen_204?id=av-js&type=error&bin=7&v=" + im;

    function rm(a, b, c, d, e) {
        var f = om(a),
            g = pm(a);
        g = Ni(a, g);
        f = f ? Pb : g.h(P(function(l) {
            return Object.freeze({
                Ab: sb(),
                element: (new Z(l)).da(a.i)
            })
        }), Fi());
        var h = fm(a).h(P(function(l) {
                return !l
            })),
            k = new Dl(a, [new Nl(a, Tk), new Ml(a, d), new Jl(a, d), new em(e, a, Tk), new dm(e, a, d), new Xl(a, d)]);
        return Ri(a, f, function(l, n) {
            var r = pl(l, n.element),
                q = r.Qc,
                A = r.Rc,
                z = r.Wc,
                u = r.nf,
                J = r.Ma,
                O = r.Qf,
                aa = r.md,
                Ga = r.nd,
                C = r.Fa,
                y = r.Ha,
                G = r.Og,
                Qc = r.jb;
            r = r.flags.h(V(), hm(l), P(uj));
            var lb = r.h(P(function(F) {
                    return F.Bg
                })),
                Ja = J.h(Hd(O), P(function(F) {
                    var Xa =
                        v(F);
                    F = Xa.next().value;
                    Xa = Xa.next().value;
                    (F = F || Xa) || ((F = kb(nb(), "CrKey") || kb(nb(), "PlayStation") || kb(nb(), "Roku") || qm() || kb(nb(), "Xbox")) || (F = nb(), F = kb(F, "AppleTV") || kb(F, "Apple TV") || kb(F, "CFNetwork") || kb(F, "tvOS")), F || (F = nb(), F = kb(F, "sdk_google_atv_x86") || kb(F, "Android TV")));
                    return F
                }));
            O = new yl(l, n, u, J, C, lb);
            lb = r.h(P(function(F) {
                return F.jf
            }));
            lb = k.Ka(O, {
                Ma: J,
                Fa: C,
                Ae: lb
            });
            var oa = lb.La,
                Rc = lb.Ia;
            lb = Rc.rd;
            var Mm = Rc.sd;
            Rc = Rc.Bd;
            var mb = nm(l, Ga, Ja, h, G, O);
            G = Zk(l.i, l.l, oa, mb);
            Ja = lm(l.i, G.Aa.Dd, G.Aa.visible,
                G.Ad, G.Pb);
            var Sc = nl(l.i, l.l, G.Pb, G.Aa.N, G.Aa.visible);
            oa = Dk(l.i, l.l, oa, mb);
            mb = Sk(l.l, l.i, oa.Aa.Dd, oa.Aa.visible, oa.Ad, oa.Pb);
            var sf = {
                    Jd: Lk(l.i, l.l, oa.Pb, mb.Gb)
                },
                tf = r.h(P(function(F) {
                    return F.Af
                }), W(!1));
            G = Fj(l.i, tf, Object.assign({}, oa.Aa, mb, sf), Object.assign({}, G.Aa, {
                Jd: tk(l, Sc),
                Hb: tk(l, Ja.Hb),
                Sb: tk(l, Ja.Sb),
                Gb: tk(l, Ja.Gb),
                Ua: Ja.Ua.h(P(function(F) {
                    return new Dj(l.l, F)
                }))
            }));
            oa = kk(l, c.h(me("t")));
            Ja = null !== e && e.validate();
            Sc = (Ja ? e.yg : Vc).h(Y(l.i, 1), me("u"));
            oa = Yc(oa, Sc);
            Ja = Ja ? e.oe.h(Vd(1), me(!0),
                W(!1), Y(l.i, 1)) : Bh;
            Sc = jm(l, G.N, oa.h(T(function(F) {
                return null !== F
            })));
            mb = sm(l, O, q);
            sf = tm(l, oa, n.element);
            tf = mb.cf.h(W({
                x: 0,
                y: 0
            }));
            var Pm = r.h(P(function(F) {
                return F.wg
            }), W(!1), V(), Je(function(F) {
                uh = F
            }), Y(l.i, 1));
            return Object.assign({}, {
                M: new Z(l.M),
                pc: new Z("lidar2"),
                Hg: new Z("lidartos"),
                gf: new Z(im),
                ff: new Z(7),
                Vc: new Z(l.validate() ? null : new qd),
                kf: new Z(Th(l.document)),
                ua: new Z(cj),
                Zc: oa,
                Dc: oa,
                wh: Sc,
                le: Ja,
                mf: new Z(l.ib ? 1 : void 0),
                pf: new Z(l.hf ? 1 : void 0),
                Ma: J,
                jb: Qc,
                ob: Qc.h(T(function(F) {
                        return F
                    }),
                    P(function() {
                        return l.ob.bind(l)
                    })),
                rd: lb.h(Y(l.i, 1)),
                sd: Mm.h(Y(l.i, 1)),
                yf: r.h(P(function(F) {
                    return F.zf
                })),
                pe: Pm,
                lf: n.element.h(P(function(F) {
                    return null !== F
                })),
                oc: y,
                Ig: y,
                Wc: z.h(W([])),
                Gf: z.h(P(function(F) {
                    return 0 < F.length ? !0 : null
                }), W(null), V()),
                Rc: A.h(W([]), Y(l.i, 1)),
                th: r,
                Qc: q,
                yb: O.yb,
                md: aa.h(W(0), Y(l.i, 1)),
                Xf: u,
                Fa: C.h(W(0), Y(l.i, 1)),
                Tb: new Z(bj),
                Id: new Z(mj),
                nd: Ga,
                Of: O.Fb.h(Gj(l.i)),
                Kd: O.Kd
            }, G, {
                fc: S([G.fc, tf]).h(P(function(F) {
                        var Xa = v(F);
                        F = Xa.next().value;
                        Xa = Xa.next().value;
                        return Zh(F, Xa)
                    }),
                    V(Xh))
            }, mb, {
                Fd: Ch(l),
                Hf: sf,
                Bd: Rc
            })
        }, $i(a, b))
    }

    function sm(a, b, c) {
        var d = void 0 === d ? Ca : d;
        var e, f;
        d = (null == (e = d.performance) ? void 0 : null == (f = e.timing) ? void 0 : f.navigationStart) || 0;
        return Object.assign({}, {
            af: new Z(d),
            Ze: Rj(a, b)
        }, Qj(a, b, c))
    }

    function tm(a, b, c) {
        return b.h(T(function(d) {
            return null !== d
        }), X(function() {
            return c
        }), P(function(d) {
            var e = Gi(a);
            return 0 < e.length && 0 <= e.indexOf(d)
        }), P(function(d) {
            return !d
        }))
    };

    function um(a, b) {
        if (!b) throw Error("P`" + a);
        if ("string" !== typeof b && !(b instanceof String)) throw Error("Q`" + a);
        if ("" === b.trim()) throw Error("R`" + a);
    }

    function vm(a) {
        if (!a) throw Error("U`functionToExecute");
    }

    function wm(a, b) {
        if (null == b) throw Error("S`" + a);
        if ("number" !== typeof b || isNaN(b)) throw Error("T`" + a);
        if (0 > b) throw Error("V`" + a);
    };

    function xm() {
        return /\d+\.\d+\.\d+(-.*)?/.test("1.4.1-google_20221025")
    }

    function ym() {
        for (var a = ["1", "4", "1"], b = ["1", "0", "3"], c = 0; 3 > c; c++) {
            var d = parseInt(a[c], 10),
                e = parseInt(b[c], 10);
            if (d > e) break;
            else if (d < e) return !1
        }
        return !0
    };
    var zm = function(a, b, c, d) {
            this.je = a;
            this.method = b;
            this.version = c;
            this.args = d
        },
        Am = function(a) {
            return !!a && void 0 !== a.omid_message_guid && void 0 !== a.omid_message_method && void 0 !== a.omid_message_version && "string" === typeof a.omid_message_guid && "string" === typeof a.omid_message_method && "string" === typeof a.omid_message_version && (void 0 === a.omid_message_args || void 0 !== a.omid_message_args)
        },
        Bm = function(a) {
            return new zm(a.omid_message_guid, a.omid_message_method, a.omid_message_version, a.omid_message_args)
        };
    zm.prototype.rb = function() {
        var a = {};
        a = (a.omid_message_guid = this.je, a.omid_message_method = this.method, a.omid_message_version = this.version, a);
        void 0 !== this.args && (a.omid_message_args = this.args);
        return a
    };
    var Cm = function(a) {
        this.Fc = a
    };
    Cm.prototype.rb = function() {
        return JSON.stringify(void 0)
    };

    function Dm(a, b) {
        return a && (a[b] || (a[b] = {}))
    };

    function Em() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
            var b = 16 * Math.random() | 0;
            return "y" === a ? (b & 3 | 8).toString(16) : b.toString(16)
        })
    };

    function Fm() {
        var a = B.apply(0, arguments);
        Gm(function() {
            throw new(Function.prototype.bind.apply(Error, [null, "Could not complete the test successfully - "].concat(w(a))));
        }, function() {
            return console.error.apply(console, w(a))
        })
    }

    function Gm(a, b) {
        "undefined" !== typeof jasmine && jasmine ? a() : "undefined" !== typeof console && console && console.error && b()
    };
    var Hm = function() {
        if ("undefined" !== typeof omidGlobal && omidGlobal) return omidGlobal;
        if ("undefined" !== typeof global && global) return global;
        if ("undefined" !== typeof window && window) return window;
        if ("undefined" !== typeof globalThis && globalThis) return globalThis;
        var a = Function("return this")();
        if (a) return a;
        throw Error("W");
    }();
    var Im = function(a) {
        try {
            return a.frames ? !!a.frames.omid_v1_present : !1
        } catch (b) {
            return !1
        }
    };
    var Jm = function(a) {
        this.Fc = a;
        this.handleExportedMessage = Jm.prototype.Df.bind(this)
    };
    x(Jm, Cm);
    Jm.prototype.sendMessage = function(a, b) {
        b = void 0 === b ? this.Fc : b;
        if (!b) throw Error("X");
        b.handleExportedMessage(a.rb(), this)
    };
    Jm.prototype.Df = function(a, b) {
        if (Am(a) && this.onMessage) this.onMessage(Bm(a), b)
    };

    function Km(a) {
        return null != a && "undefined" !== typeof a.top && null != a.top
    }

    function Lm(a) {
        if (a === Hm) return !1;
        try {
            if ("undefined" === typeof a.location.hostname) return !0
        } catch (b) {
            return !0
        }
        return !1
    };
    var Nm = function(a, b) {
        this.Fc = b = void 0 === b ? Hm : b;
        var c = this;
        a.addEventListener("message", function(d) {
            if ("object" === typeof d.data) {
                var e = d.data;
                if (Am(e) && d.source && c.onMessage) c.onMessage(Bm(e), d.source)
            }
        })
    };
    x(Nm, Cm);
    Nm.prototype.sendMessage = function(a, b) {
        b = void 0 === b ? this.Fc : b;
        if (!b) throw Error("X");
        b.postMessage(a.rb(), "*")
    };
    var Om = ["omid", "v1_VerificationServiceCommunication"],
        Qm = ["omidVerificationProperties", "serviceWindow"];

    function Rm(a, b) {
        return b.reduce(function(c, d) {
            return c && c[d]
        }, a)
    };
    var Sm = function(a) {
        if (!a) {
            var b;
            "undefined" === typeof b && "undefined" !== typeof window && window && (b = window);
            b = Km(b) ? b : Hm;
            var c = void 0 === c ? Im : c;
            a = [];
            var d = Rm(b, Qm);
            d && a.push(d);
            a.push(Km(b) ? b.top : Hm);
            a: {
                a = v(a);
                for (var e = a.next(); !e.done; e = a.next()) {
                    b: {
                        d = b;e = e.value;
                        var f = c;
                        if (!Lm(e)) try {
                            var g = Rm(e, Om);
                            if (g) {
                                var h = new Jm(g);
                                break b
                            }
                        } catch (k) {}
                        h = f(e) ? new Nm(d, e) : null
                    }
                    if (d = h) {
                        a = d;
                        break a
                    }
                }
                a = null
            }
        }
        if (this.xb = a) this.xb.onMessage = this.Ef.bind(this);
        else if (c = (c = Hm.omid3p) && "function" === typeof c.registerSessionObserver &&
            "function" === typeof c.addEventListener ? c : null) this.Kb = c;
        this.rg = this.sg = 0;
        this.Sc = {};
        this.jd = [];
        this.qc = (c = Hm.omidVerificationProperties) ? c.injectionId : void 0
    };
    Sm.prototype.ra = function() {
        return !(!this.xb && !this.Kb)
    };
    var $e = function(a, b, c) {
        vm(b);
        a.Kb ? a.Kb.registerSessionObserver(b, c, a.qc) : a.qb("addSessionListener", b, c, a.qc)
    };
    Sm.prototype.addEventListener = function(a, b) {
        um("eventType", a);
        vm(b);
        this.Kb ? this.Kb.addEventListener(a, b, this.qc) : this.qb("addEventListener", b, a, this.qc)
    };
    var Re = function(a, b, c, d) {
            um("url", b);
            Hm.document && Hm.document.createElement ? Tm(a, b, c, d) : a.qb("sendUrl", function(e) {
                e && c ? c() : !e && d && d()
            }, b)
        },
        Tm = function(a, b, c, d) {
            var e = Hm.document.createElement("img");
            a.jd.push(e);
            var f = function(g) {
                var h = a.jd.indexOf(e);
                0 <= h && a.jd.splice(h, 1);
                g && g()
            };
            e.addEventListener("load", f.bind(a, c));
            e.addEventListener("error", f.bind(a, d));
            e.src = b
        };
    Sm.prototype.setTimeout = function(a, b) {
        vm(a);
        wm("timeInMillis", b);
        if (Um()) return Hm.setTimeout(a, b);
        var c = this.sg++;
        this.qb("setTimeout", a, c, b);
        return c
    };
    Sm.prototype.clearTimeout = function(a) {
        wm("timeoutId", a);
        Um() ? Hm.clearTimeout(a) : this.He("clearTimeout", a)
    };
    Sm.prototype.setInterval = function(a, b) {
        vm(a);
        wm("timeInMillis", b);
        if (Vm()) return Hm.setInterval(a, b);
        var c = this.rg++;
        this.qb("setInterval", a, c, b);
        return c
    };
    Sm.prototype.clearInterval = function(a) {
        wm("intervalId", a);
        Vm() ? Hm.clearInterval(a) : this.He("clearInterval", a)
    };
    var Um = function() {
            return "function" === typeof Hm.setTimeout && "function" === typeof Hm.clearTimeout
        },
        Vm = function() {
            return "function" === typeof Hm.setInterval && "function" === typeof Hm.clearInterval
        };
    Sm.prototype.Ef = function(a) {
        var b = a.method,
            c = a.je;
        a = a.args;
        if ("response" === b && this.Sc[c]) {
            var d = xm() && ym() ? a ? a : [] : a && "string" === typeof a ? JSON.parse(a) : [];
            this.Sc[c].apply(this, d)
        }
        "error" === b && window.console && Fm(a)
    };
    Sm.prototype.He = function(a) {
        this.qb.apply(this, [a, null].concat(w(B.apply(1, arguments))))
    };
    Sm.prototype.qb = function(a, b) {
        var c = B.apply(2, arguments);
        if (this.xb) {
            var d = Em();
            b && (this.Sc[d] = b);
            var e = "VerificationService." + a;
            c = xm() && ym() ? c : JSON.stringify(c);
            this.xb.sendMessage(new zm(d, e, "1.4.1-google_20221025", c))
        }
    };
    var Wm = void 0;
    if (Wm = void 0 === Wm ? "undefined" === typeof omidExports ? null : omidExports : Wm) {
        var Xm = ["OmidVerificationClient"];
        Xm.slice(0, Xm.length - 1).reduce(Dm, Wm)[Xm[Xm.length - 1]] = Sm
    };
    var Ym = null;
    try {
        var Zm = new Sm;
        Ym = new Ze(Zm, "doubleclickbygoogle.com-omid")
    } catch (a) {
        Ym = null
    }(function(a, b, c, d, e) {
        b = void 0 === b ? .01 : b;
        c = void 0 === c ? Se(a.l, 36E5) : c;
        d = void 0 === d ? a.l.Na(100).h(Y(a.i, 1)) : d;
        e = void 0 === e ? null : e;
        return a.s.Ga(742, function() {
            return rm(a, b, c, d, e)
        })()
    })(new si(window, null, new ih), void 0, void 0, void 0, Ym).subscribe();
}).call(this);