(function() {
    /* 
     
     Copyright The Closure Library Authors. 
     SPDX-License-Identifier: Apache-2.0 
    */
    'use strict';
    var p = this || self;

    function aa(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }

    function ba(a, b, c) {
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
    }

    function q(a, b, c) {
        Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? q = aa : q = ba;
        return q.apply(null, arguments)
    }

    function ha(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.S = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.T = function(d, e, f) {
            for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
            return b.prototype[e].apply(d, g)
        }
    };

    function r(a, b) {
        Array.prototype.forEach.call(a, b, void 0)
    };
    var ia = {},
        t = null;

    function ja(a) {
        var b;
        void 0 === b && (b = 0);
        if (!t) {
            t = {};
            for (var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), d = ["+/=", "+/", "-_=", "-_.", "-_"], e = 0; 5 > e; e++) {
                var f = c.concat(d[e].split(""));
                ia[e] = f;
                for (var g = 0; g < f.length; g++) {
                    var h = f[g];
                    void 0 === t[h] && (t[h] = g)
                }
            }
        }
        b = ia[b];
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
    var ka = "undefined" !== typeof Uint8Array,
        la = {};
    let ma;
    var na = class {
        constructor(a) {
            if (la !== la) throw Error("illegal external caller");
            this.O = a;
            if (null != a && 0 === a.length) throw Error("ByteString should be constructed with non-empty values");
        }
    };
    const v = Symbol();

    function w(a, b) {
        if (v) return a[v] |= b;
        if (void 0 !== a.u) return a.u |= b;
        Object.defineProperties(a, {
            u: {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !1
            }
        });
        return b
    }

    function x(a) {
        let b;
        v ? b = a[v] : b = a.u;
        return null == b ? 0 : b
    }

    function y(a, b) {
        v ? a[v] = b : void 0 !== a.u ? a.u = b : Object.defineProperties(a, {
            u: {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !1
            }
        })
    }

    function oa(a) {
        w(a, 1);
        return a
    }

    function z(a) {
        return !!(x(a) & 2)
    }

    function pa(a) {
        w(a, 16);
        return a
    }

    function qa(a, b) {
        y(b, (a | 0) & -51)
    }

    function ta(a, b) {
        y(b, (a | 18) & -41)
    };
    var A = {};

    function B(a) {
        return null !== a && "object" === typeof a && !Array.isArray(a) && a.constructor === Object
    }
    var C;
    const ua = [];
    y(ua, 23);
    C = Object.freeze(ua);

    function va(a) {
        if (z(a.j)) throw Error("Cannot mutate an immutable Message");
    }

    function wa(a) {
        var b = a.length;
        (b = b ? a[b - 1] : void 0) && B(b) ? b.g = 1 : a.push({
            g: 1
        })
    };
    let D;

    function xa(a, b, c = !1) {
        if (Array.isArray(a)) return new b(c ? pa(a) : a)
    };

    function ya(a) {
        switch (typeof a) {
            case "number":
                return isFinite(a) ? a : String(a);
            case "object":
                if (a)
                    if (Array.isArray(a)) {
                        if (0 !== (x(a) & 128)) return a = Array.prototype.slice.call(a), wa(a), a
                    } else {
                        if (ka && null != a && a instanceof Uint8Array) return ja(a);
                        if (a instanceof na) {
                            const b = a.O;
                            return null == b ? "" : "string" === typeof b ? b : a.O = ja(b)
                        }
                    }
        }
        return a
    };

    function za(a, b, c, d) {
        if (null != a) {
            if (Array.isArray(a)) a = Aa(a, b, c, void 0 !== d);
            else if (B(a)) {
                const e = {};
                for (let f in a) e[f] = za(a[f], b, c, d);
                a = e
            } else a = b(a, d);
            return a
        }
    }

    function Aa(a, b, c, d) {
        const e = x(a);
        d = d ? !!(e & 16) : void 0;
        a = Array.prototype.slice.call(a);
        for (let f = 0; f < a.length; f++) a[f] = za(a[f], b, c, d);
        c(e, a);
        return a
    }

    function Ba(a) {
        return a.L === A ? a.toJSON() : ya(a)
    }

    function Ca(a, b) {
        a & 128 && wa(b)
    };

    function Da(a) {
        const b = a.h + a.B;
        return a.s || (a.s = a.j[b] = {})
    }

    function E(a, b, c) {
        return -1 === b ? null : b >= a.h ? a.s ? a.s[b] : void 0 : c && a.s && (c = a.s[b], null != c) ? c : a.j[b + a.B]
    }

    function F(a, b, c, d) {
        a.i && (a.i = void 0);
        b >= a.h || d ? Da(a)[b] = c : (a.j[b + a.B] = c, (a = a.s) && b in a && delete a[b])
    }

    function Ea(a, b) {
        a = E(a, 1);
        Array.isArray(a) || (a = C);
        const c = x(a);
        c & 1 || oa(a);
        !b || c & 2 || w(a, 2);
        return a
    }

    function G(a, b) {
        a = E(a, b);
        return null == a ? 1 : a
    }

    function Fa(a) {
        var b = E(a, 1, !1); {
            var c = Ga;
            let e = !1;
            var d = null == b || "object" !== typeof b || (e = Array.isArray(b)) || b.L !== A ? e ? new c(b) : void 0 : b
        }
        d !== b && null != d && (F(a, 1, d, !1), w(d.j, x(a.j) & 18));
        b = d;
        if (null == b) return b;
        z(a.j) || (d = Ha(b), d !== b && (b = d, F(a, 1, b, !1)));
        return b
    }

    function Ia(a) {
        var b = z(a.j),
            c = Ja;
        a.l || (a.l = {});
        var d = a.l[1];
        var e = Ea(a, b);
        if (d) b || (Object.isFrozen(d) ? b || (d = Array.prototype.slice.call(d), a.l[1] = d) : b && Object.freeze(d));
        else {
            d = [];
            const g = !!(x(a.j) & 16);
            var f = z(e);
            !b && f && (e = oa(Array.prototype.slice.call(e)), F(a, 1, e));
            let h = f;
            for (let k = 0; k < e.length; k++) {
                const l = e[k],
                    m = xa(l, c, g);
                void 0 !== m && (h = h || z(l), d.push(m), f && w(m.j, 2))
            }
            a.l[1] = d;
            Object.isFrozen(e) || (c = x(e) | 33, y(e, h ? c & -9 : c | 8));
            (b || b && f) && w(d, 2);
            (b || b) && Object.freeze(d)
        }
        a = Ea(a, b);
        if (!(b || x(a) & 8)) {
            for (b =
                0; b < d.length; b++) e = d[b], f = Ha(e), e !== f && (d[b] = f, a[b] = d[b].j);
            w(a, 8)
        }
        return d
    }

    function Ka(a, b, c, d) {
        va(a);
        let e;
        if (null != c) {
            e = oa([]);
            let f = !1;
            for (let g = 0; g < c.length; g++) e[g] = c[g].j, f = f || z(e[g]);
            a.l || (a.l = {});
            a.l[b] = c;
            c = e;
            f ? v ? c[v] && (c[v] &= -9) : void 0 !== c.u && (c.u &= -9) : w(c, 8)
        } else a.l && (a.l[b] = void 0), e = C;
        F(a, b, e, d)
    }

    function I(a) {
        a = E(a, 1);
        return null == a ? "" : a
    }

    function J(a, b) {
        a = E(a, b);
        a = null == a ? a : !!a;
        return null == a ? !1 : a
    }

    function K(a, b) {
        a = E(a, b);
        return null == a ? 0 : a
    };

    function La(a) {
        const b = x(a);
        if (b & 2) return a;
        a = Array.prototype.map.call(a, Ma, void 0);
        ta(b, a);
        Object.freeze(a);
        return a
    }

    function Na(a, b, c = ta) {
        if (null != a) {
            if (ka && a instanceof Uint8Array) return a.length ? new na(new Uint8Array(a)) : ma || (ma = new na(null));
            if (Array.isArray(a)) {
                const d = x(a);
                if (d & 2) return a;
                if (b && !(d & 32) && (d & 16 || 0 === d)) return y(a, d | 2), a;
                a = Aa(a, Na, c, !0);
                b = x(a);
                b & 4 && b & 2 && Object.freeze(a);
                return a
            }
            return a.L === A ? Ma(a) : a
        }
    }

    function Ma(a) {
        if (z(a.j)) return a;
        a = Oa(a, !0);
        w(a.j, 2);
        return a
    }

    function Oa(a, b) {
        const c = a.j;
        var d = pa([]),
            e = a.constructor.h;
        e && d.push(e);
        a.s && (d.length = c.length, d.fill(void 0, d.length, c.length), d[d.length - 1] = {});
        0 !== (x(c) & 128) && wa(d);
        b = b || z(a.j) ? ta : qa;
        e = a.constructor;
        D = d;
        d = new e(d);
        D = void 0;
        a.N && (d.N = a.N.slice());
        e = !!(x(c) & 16);
        for (let n = 0; n < c.length; n++) {
            var f = c[n];
            if (n === c.length - 1 && B(f))
                for (const u in f) {
                    var g = +u;
                    if (Number.isNaN(g)) Da(d)[g] = f[g];
                    else {
                        var h = d,
                            k = g;
                        g = f[u];
                        var l = e,
                            m = b;
                        const L = a.l && a.l[k];
                        L ? Ka(h, k, La(L), !0) : (g = Na(g, l, m), va(h), F(h, k, g, !0))
                    }
                } else h =
                    d, g = n - a.B, l = e, m = b, (k = a.l && a.l[g]) ? Ka(h, g, La(k), !1) : (f = Na(f, l, m), va(h), F(h, g, f, !1))
        }
        return d
    };

    function Ha(a) {
        if (z(a.j)) {
            var b = Oa(a, !1);
            b.i = a;
            a = b
        }
        return a
    }
    var M = class {
        constructor(a, b, c) {
            null == a && (a = D);
            D = void 0;
            var d = this.constructor.i || 0,
                e = 0 < d,
                f = this.constructor.h,
                g = !1;
            if (null == a) {
                a = f ? [f] : [];
                var h = !0;
                y(a, 48)
            } else {
                if (!Array.isArray(a)) throw Error();
                if (f && f !== a[0]) throw Error();
                const k = w(a, 0);
                let l = k;
                if (h = 0 !== (16 & l))(g = 0 !== (32 & l)) || (l |= 32);
                if (e)
                    if (128 & l) d = 0;
                    else {
                        if (0 < a.length) {
                            const m = a[a.length - 1];
                            if (B(m) && "g" in m) {
                                d = 0;
                                l |= 128;
                                delete m.g;
                                let n = !0;
                                for (let u in m) {
                                    n = !1;
                                    break
                                }
                                n && a.pop()
                            }
                        }
                    }
                else if (128 & l) throw Error();
                k !== l && y(a, l)
            }
            this.B = (f ? 0 : -1) - d;
            this.l =
                void 0;
            this.j = a;
            a: {
                f = this.j.length;d = f - 1;
                if (f && (f = this.j[d], B(f))) {
                    this.s = f;
                    this.h = d - this.B;
                    break a
                }
                void 0 !== b && -1 < b ? (this.h = Math.max(b, d + 1 - this.B), this.s = void 0) : this.h = Number.MAX_VALUE
            }
            if (!e && this.s && "g" in this.s) throw Error('Unexpected "g" flag in sparse object of message that is not a group type.');
            if (c) {
                b = h && !g && !0;
                e = this.h;
                let k;
                for (h = 0; h < c.length; h++) g = c[h], g < e ? (g += this.B, (d = a[g]) ? Pa(d, b) : a[g] = C) : (k || (k = Da(this)), (d = k[g]) ? Pa(d, b) : k[g] = C)
            }
        }
        toJSON() {
            return Aa(this.j, Ba, Ca)
        }
    };

    function Pa(a, b) {
        if (Array.isArray(a)) {
            var c = x(a),
                d = 1;
            !b || c & 2 || (d |= 16);
            (c & d) !== d && y(a, c | d)
        }
    }
    M.prototype.L = A;
    M.prototype.toString = function() {
        return this.j.toString()
    };
    var Ga = class extends M {
            constructor(a) {
                super(a, -1, Qa)
            }
        },
        Ja = class extends M {
            constructor(a) {
                super(a)
            }
        },
        Qa = [1];
    var Ra = class extends M {
        constructor(a) {
            super(a)
        }
    };

    function Sa() {}

    function Ta(a) {
        let b = !1,
            c;
        return function() {
            b || (c = a(), b = !0);
            return c
        }
    };
    var Ua = {
            capture: !0
        },
        Va = {
            passive: !0
        },
        Wa = Ta(function() {
            let a = !1;
            try {
                const b = Object.defineProperty({}, "passive", {
                    get: function() {
                        a = !0
                    }
                });
                p.addEventListener("test", null, b)
            } catch (b) {}
            return a
        });

    function N(a, b, c, d) {
        if (a.addEventListener) {
            var e = a.addEventListener;
            d = d ? d.passive && Wa() ? d : d.capture || !1 : !1;
            e.call(a, b, c, d)
        }
    };
    var P = class {
        constructor(a, b) {
            this.h = b === O ? a : ""
        }
        toString() {
            return this.h.toString()
        }
    };
    P.prototype.m = !0;
    P.prototype.i = function() {
        return this.h.toString()
    };
    var Xa = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
        O = {},
        Ya = new P("about:invalid#zClosurez", O);

    function Za(a, b, c) {
        if (Array.isArray(b))
            for (var d = 0; d < b.length; d++) Za(a, String(b[d]), c);
        else null != b && c.push(a + ("" === b ? "" : "=" + encodeURIComponent(String(b))))
    };
    /* 
     
     SPDX-License-Identifier: Apache-2.0 
    */
    class $a {
        constructor(a) {
            this.R = a
        }
    }

    function Q(a) {
        return new $a(b => b.substr(0, a.length + 1).toLowerCase() === a + ":")
    }
    const ab = new $a(a => /^[^:]*([/?#]|$)/.test(a));
    var bb = Q("http"),
        cb = Q("https"),
        db = Q("ftp"),
        eb = Q("mailto");
    const fb = [Q("data"), bb, cb, eb, db, ab];

    function gb(a = fb) {
        for (let b = 0; b < a.length; ++b) {
            const c = a[b];
            if (c instanceof $a && c.R("#")) return new P("#", O)
        }
    }

    function hb(a = fb) {
        return gb(a) || Ya
    };

    function ib(a, b) {
        if (a)
            for (const c in a) Object.prototype.hasOwnProperty.call(a, c) && b(a[c], c, a)
    }
    let R = [];
    const jb = () => {
        const a = R;
        R = [];
        for (const b of a) try {
            b()
        } catch {}
    };
    var kb = a => {
        var b = S;
        "complete" === b.readyState || "interactive" === b.readyState ? (R.push(a), 1 == R.length && (window.Promise ? Promise.resolve().then(jb) : window.setImmediate ? setImmediate(jb) : setTimeout(jb, 0))) : b.addEventListener("DOMContentLoaded", a)
    };

    function lb(a = document) {
        return a.createElement("img")
    };

    function mb(a = null) {
        return a && "23" === a.getAttribute("data-jc") ? a : document.querySelector('[data-jc="23"]')
    }

    function nb() {
        if (!(.01 < Math.random())) {
            var a = mb(document.currentScript);
            a = a && "true" === a.getAttribute("data-jc-rcd") ? "pagead2.googlesyndication-cn.com" : "pagead2.googlesyndication.com";
            var b = (b = mb(document.currentScript)) && b.getAttribute("data-jc-version") || "unknown";
            a = `https://${a}/pagead/gen_204?id=jca&jc=${23}&version=${b}&sample=${.01}`;
            b = window;
            var c;
            if (c = b.navigator) c = b.navigator.userAgent, c = /Chrome/.test(c) && !/Edge/.test(c) ? !0 : !1;
            c && b.navigator.sendBeacon ? b.navigator.sendBeacon(a) : (b.google_image_requests ||
                (b.google_image_requests = []), c = lb(b.document), c.src = a, b.google_image_requests.push(c))
        }
    };
    var S = document,
        T = window;
    var ob = (a = []) => {
        p.google_logging_queue || (p.google_logging_queue = []);
        p.google_logging_queue.push([12, a])
    };
    const pb = [bb, cb, eb, db, ab, Q("market"), Q("itms"), Q("intent"), Q("itms-appss")];
    var qb = () => {
        var a = `${"http:"===T.location.protocol?"http:":"https:"}//${"pagead2.googlesyndication.com"}/pagead/gen_204`;
        return b => {
            b = {
                id: "unsafeurl",
                ctx: 625,
                url: b
            };
            var c = [];
            for (d in b) Za(d, b[d], c);
            var d = c.join("&");
            if (d) {
                b = a.indexOf("#");
                0 > b && (b = a.length);
                c = a.indexOf("?");
                if (0 > c || c > b) {
                    c = b;
                    var e = ""
                } else e = a.substring(c + 1, b);
                b = [a.slice(0, c), e, a.slice(b)];
                c = b[1];
                b[1] = d ? c ? c + "&" + d : d : c;
                d = b[0] + (b[1] ? "?" + b[1] : "") + b[2]
            } else d = a;
            navigator.sendBeacon && navigator.sendBeacon(d, "")
        }
    };
    var rb = () => {
            var a = S;
            try {
                return a.querySelectorAll("*[data-ifc]")
            } catch (b) {
                return []
            }
        },
        sb = (a, b) => {
            a && ib(b, (c, d) => {
                a.style[d] = c
            })
        },
        tb = a => {
            var b = S.body;
            const c = document.createDocumentFragment(),
                d = a.length;
            for (let e = 0; e < d; ++e) c.appendChild(a[e]);
            b.appendChild(c)
        };
    let ub = null;

    function vb() {
        const a = p.performance;
        return a && a.now && a.timing ? Math.floor(a.now() + a.timing.navigationStart) : Date.now()
    }

    function wb() {
        const a = p.performance;
        return a && a.now ? a.now() : null
    };
    class xb {
        constructor(a, b) {
            var c = wb() || vb();
            this.label = a;
            this.type = b;
            this.value = c;
            this.duration = 0;
            this.uniqueId = Math.random();
            this.taskId = this.slotId = void 0
        }
    };
    const U = p.performance,
        yb = !!(U && U.mark && U.measure && U.clearMarks),
        V = Ta(() => {
            var a;
            if (a = yb) {
                var b;
                if (null === ub) {
                    ub = "";
                    try {
                        a = "";
                        try {
                            a = p.top.location.hash
                        } catch (c) {
                            a = p.location.hash
                        }
                        a && (ub = (b = a.match(/\bdeid=([\d,]+)/)) ? b[1] : "")
                    } catch (c) {}
                }
                b = ub;
                a = !!b.indexOf && 0 <= b.indexOf("1337")
            }
            return a
        });

    function zb(a) {
        a && U && V() && (U.clearMarks(`goog_${a.label}_${a.uniqueId}_start`), U.clearMarks(`goog_${a.label}_${a.uniqueId}_end`))
    }
    class Ab {
        constructor() {
            var a = window;
            this.h = [];
            this.m = a || p;
            let b = null;
            a && (a.google_js_reporting_queue = a.google_js_reporting_queue || [], this.h = a.google_js_reporting_queue, b = a.google_measure_js_timing);
            this.i = V() || (null != b ? b : 1 > Math.random())
        }
        start(a, b) {
            if (!this.i) return null;
            a = new xb(a, b);
            b = `goog_${a.label}_${a.uniqueId}_start`;
            U && V() && U.mark(b);
            return a
        }
        end(a) {
            if (this.i && "number" === typeof a.value) {
                a.duration = (wb() || vb()) - a.value;
                var b = `goog_${a.label}_${a.uniqueId}_end`;
                U && V() && U.mark(b);
                !this.i || 2048 <
                    this.h.length || this.h.push(a)
            }
        }
    };

    function Bb() {
        this.i = this.i;
        this.m = this.m
    }
    Bb.prototype.i = !1;

    function Cb(a) {
        a.i || (a.i = !0, a.v())
    }
    Bb.prototype.v = function() {
        if (this.m)
            for (; this.m.length;) this.m.shift()()
    };
    const W = new Ab;
    var Db = () => {
        window.google_measure_js_timing || (W.i = !1, W.h != W.m.google_js_reporting_queue && (V() && r(W.h, zb), W.h.length = 0))
    };
    "number" !== typeof window.google_srt && (window.google_srt = Math.random());
    "complete" == window.document.readyState ? Db() : W.i && N(window, "load", () => {
        Db()
    });
    var Eb = a => {
        N(T, "message", b => {
            let c;
            try {
                c = JSON.parse(b.data)
            } catch (d) {
                return
            }!c || "ig" !== c.googMsgType || a(c, b)
        })
    };

    function X(a, b, c) {
        Bb.call(this);
        this.A = a;
        this.I = b || 0;
        this.C = c;
        this.F = q(this.G, this)
    }
    ha(X, Bb);
    X.prototype.h = 0;
    X.prototype.v = function() {
        X.S.v.call(this);
        this.isActive() && p.clearTimeout(this.h);
        this.h = 0;
        delete this.A;
        delete this.C
    };
    X.prototype.start = function(a) {
        this.isActive() && p.clearTimeout(this.h);
        this.h = 0;
        var b = this.F;
        a = void 0 !== a ? a : this.I;
        if ("function" !== typeof b)
            if (b && "function" == typeof b.handleEvent) b = q(b.handleEvent, b);
            else throw Error("Invalid listener argument");
        this.h = 2147483647 < Number(a) ? -1 : p.setTimeout(b, a || 0)
    };
    X.prototype.isActive = function() {
        return 0 != this.h
    };
    X.prototype.G = function() {
        this.h = 0;
        this.A && this.A.call(this.C)
    };
    const Fb = {
            display: "inline-block",
            position: "absolute"
        },
        Gb = {
            display: "none",
            width: "100%",
            height: "100%",
            top: "0",
            left: "0"
        },
        Y = (a, b) => {
            a && (a.style.display = b ? "inline-block" : "none")
        };

    function Hb(a = "") {
        const b = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
        a && (a = a.split(","), 4 === a.length && a.reduce((c, d) => c && !isNaN(+d), !0) && ([b.top, b.right, b.bottom, b.left] = a.map(c => +c)));
        return b
    }

    function Ib(a, b, c = 2147483647) {
        const d = S.createElement("div");
        sb(d, { ...Fb,
            "z-index": String(c),
            ...b
        });
        J(a.data, 10) && N(d, "click", Sa);
        if (J(a.data, 11)) {
            a = b = S.createElement("a");
            c = qb();
            const e = hb(pb);
            e === Ya && c("#");
            c = e;
            c instanceof P || c instanceof P || (c = "object" == typeof c && c.m ? c.i() : String(c), Xa.test(c) || (c = "about:invalid#zClosurez"), c = new P(c, O));
            a.href = c instanceof P && c.constructor === P ? c.h : "type_error:SafeUrl";
            b.appendChild(d);
            return b
        }
        return d
    }

    function Jb(a, b) {
        switch (G(b.o, 5)) {
            case 2:
                T.AFMA_Communicator ? .addEventListener ? .("onshow", () => {
                    Z(a, b)
                });
                break;
            case 10:
                N(T, "i-creative-view", () => {
                    Z(a, b)
                });
                break;
            case 4:
                N(S, "DOMContentLoaded", () => {
                    Z(a, b)
                });
                break;
            case 8:
                Eb(c => {
                    c.rr && Z(a, b)
                });
                break;
            case 9:
                if ("IntersectionObserver" in T) {
                    const c = new IntersectionObserver(d => {
                        for (const e of d)
                            if (0 < e.intersectionRatio) {
                                Z(a, b);
                                break
                            }
                    });
                    c.observe(S.body);
                    a.P.push(c)
                }
                break;
            case 11:
                T.AFMA_Communicator ? .addEventListener ? .("onAdVisibilityChanged", () => {
                    Z(a, b)
                })
        }
    }

    function Kb(a, b) {
        b = Hb(b);
        const c = K(a.data, 9);
        a.v = [{
            width: "100%",
            height: b.top + c + "px",
            top: -c + "px",
            left: "0"
        }, {
            width: b.right + c + "px",
            height: "100%",
            top: "0",
            right: -c + "px"
        }, {
            width: "100%",
            height: b.bottom + c + "px",
            bottom: -c + "px",
            left: "0"
        }, {
            width: b.left + c + "px",
            height: "100%",
            top: "0",
            left: -c + "px"
        }].map(d => Ib(a, d, 9019))
    }

    function Lb(a) {
        var b = 0;
        for (const d of a.M) {
            const e = d.o,
                f = a.G[G(e, 5)];
            d.D || void 0 === f || (b = Math.max(b, f + K(e, 2)))
        }
        a.A && Cb(a.A);
        b -= Date.now();
        const c = a.i;
        0 < b ? (Y(c, !0), a.A = new X(() => {
            Y(c, !1)
        }, b), a.A.start()) : Y(c, !1)
    }

    function Z(a, b) {
        b.D || (a.G[G(b.o, 5)] = Date.now(), J(b.o, 9) && (a.M.push(b), Lb(a)))
    }

    function Mb(a, b, c) {
        if (!a.h || !a.F || 300 <= b.timeStamp - a.h.timeStamp) return !1;
        const d = new Map;
        r(a.F.changedTouches, e => {
            d.set(e.identifier, {
                x: e.clientX,
                y: e.clientY
            })
        });
        b = K(c.o, 11) || 10;
        for (const e of a.h.changedTouches)
            if (a = d.get(e.identifier), !a || Math.abs(a.x - e.clientX) > b || Math.abs(a.y - e.clientY) > b) return !0;
        return !1
    };
    window.googqscp = new class {
        constructor() {
            this.v = [];
            this.A = this.i = null;
            this.M = [];
            this.data = null;
            this.I = [];
            this.m = [];
            this.C = [];
            this.G = {};
            this.P = [];
            this.F = this.h = null
        }
        init(a) {
            ob([a]);
            this.data = new Ra(a);
            a = Fa(this.data);
            r(Ia(a), e => {
                this.C.push({
                    J: 0,
                    D: !1,
                    K: 0,
                    o: e,
                    H: -1
                })
            });
            this.m = rb();
            let b = !1;
            a = this.m.length;
            for (let e = 0; e < a; ++e) {
                var c = new Ga(JSON.parse(this.m[e].getAttribute("data-ifc") || "[]"));
                r(Ia(c), f => {
                    this.C.push({
                        J: 0,
                        D: !1,
                        K: 0,
                        o: f,
                        H: e
                    });
                    1 === G(f, 4) && (b = !0)
                })
            }
            c = a = !1;
            for (var d of this.C) {
                const e = d.o;
                0 <
                    K(e, 2) && 0 < G(e, 5) ? (!this.i && J(e, 9) && (this.i = Ib(this, Gb)), Jb(this, d)) : I(e) && J(e, 9) && Kb(this, I(e));
                I(e) && (a = !0);
                0 < K(e, 11) && (c = !0)
            }
            d = [];
            this.i && d.push(this.i);
            !b && d.push(...this.v);
            S.body && tb(d);
            J(this.data, 13) && kb(() => {
                const e = S.body.querySelectorAll(".amp-fcp, .amp-bcp");
                for (let g = 0; g < e.length; ++g) {
                    var f = (f = e[g]) ? T.getComputedStyle(f).getPropertyValue("position") : void 0;
                    "absolute" === f && Y(e[g], !1)
                }
            });
            N(S, "click", e => {
                if (!1 === e.isTrusted && J(this.data, 15)) e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.stopImmediatePropagation(), nb();
                else {
                    var f = -1,
                        g = [];
                    for (const H of this.C) {
                        var h = H.H,
                            k = -1 !== h;
                        if (!(K(H.o, 3) <= f || H.D || k && !1 === g[h])) {
                            var l = !k || g[h] || this.m[h].contains(e.target);
                            k && l && (g[h] = !0);
                            if (h = l)
                                if (h = e, l = H, k = l.o, 0 < K(k, 2) && 0 < G(k, 5)) h = this.G[G(k, 5)], h = void 0 !== h && Date.now() < h + K(k, 2);
                                else if (I(k)) {
                                {
                                    k = (0 <= l.H ? this.m[l.H] : S.body).getBoundingClientRect();
                                    var m = Number;
                                    var n = (n = S.body) ? T.getComputedStyle(n).getPropertyValue("zoom") : void 0;
                                    m = m(n || "1");
                                    const [Nb, Ob] = [h.clientX, h.clientY], [ca, da, ra,
                                        sa
                                    ] = [Nb / m - k.left, Ob / m - k.top, k.width, k.height];
                                    if (!(0 < ra && 0 < sa) || isNaN(ca) || isNaN(da) || 0 > ca || 0 > da) h = !1;
                                    else {
                                        l = Hb(I(l.o));
                                        n = !(ca >= l.left && ra - ca > l.right && da >= l.top && sa - da > l.bottom);
                                        if (this.h && J(this.data, 12) && 300 > h.timeStamp - this.h.timeStamp) {
                                            h = this.h.changedTouches[0];
                                            const [ea, fa] = [h.clientX / m - k.left, h.clientY / m - k.top];
                                            !isNaN(ea) && !isNaN(fa) && 0 <= ea && 0 <= fa && (n = (n = J(this.data, 16) ? n : !1) || !(ea >= l.left && ra - ea > l.right && fa >= l.top && sa - fa > l.bottom))
                                        }
                                        h = n
                                    }
                                }
                            } else h = 0 < K(k, 11) ? Mb(this, h, l) : !0;
                            if (h) {
                                var u = H;
                                f = K(H.o,
                                    3)
                            }
                        }
                    }
                    if (u) switch (f = u.o, G(f, 4)) {
                        case 2:
                        case 3:
                            e.preventDefault ? e.preventDefault() : e.returnValue = !1;
                            g = Date.now();
                            500 < g - u.K && (u.K = g, ++u.J);
                            g = u.o;
                            if (K(g, 8) && u.J >= K(g, 8))
                                if (u.D = !0, this.i && 0 < K(g, 2)) Lb(this);
                                else if (0 < this.v.length && I(g))
                                for (var L of this.v) Y(L, !1);
                            nb();
                            L = f.toJSON();
                            for (const H of this.I) H(e, L)
                    }
                }
            }, Ua);
            c && N(S, "touchstart", e => {
                this.F = e
            }, Va);
            (a && J(this.data, 12) || c) && N(S, "touchend", e => {
                this.h = e
            }, Va)
        }
        registerCallback(a) {
            this.I.push(a)
        }
    };
}).call(this);