(function() {
    /* 
     
     Copyright The Closure Library Authors. 
     SPDX-License-Identifier: Apache-2.0 
    */
    'use strict';
    var q = this || self;

    function aa(a) {
        return a
    };

    function ba(a, b) {
        return Array.prototype.indexOf.call(a, b, void 0)
    };

    function ca(a) {
        ca[" "](a);
        return a
    }
    ca[" "] = function() {};
    var da = {},
        ea = null;

    function fa(a) {
        var b;
        void 0 === b && (b = 0);
        if (!ea) {
            ea = {};
            for (var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), d = ["+/=", "+/", "-_=", "-_.", "-_"], e = 0; 5 > e; e++) {
                var f = c.concat(d[e].split(""));
                da[e] = f;
                for (var g = 0; g < f.length; g++) {
                    var h = f[g];
                    void 0 === ea[h] && (ea[h] = g)
                }
            }
        }
        b = da[b];
        c = Array(Math.floor(a.length / 3));
        d = b[64] || "";
        for (e = f = 0; f < a.length - 2; f += 3) {
            var l = a[f],
                k = a[f + 1];
            h = a[f + 2];
            g = b[l >> 2];
            l = b[(l & 3) << 4 | k >> 4];
            k = b[(k & 15) << 2 | h >> 6];
            h = b[h & 63];
            c[e++] = g + l + k + h
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
    var ha = "undefined" !== typeof Uint8Array,
        ia = {};
    let ja;
    var la = class {
        constructor(a) {
            if (ia !== ia) throw Error("illegal external caller");
            this.R = a;
            if (null != a && 0 === a.length) throw Error("ByteString should be constructed with non-empty values");
        }
    };
    const r = Symbol();

    function u(a, b) {
        if (r) return a[r] |= b;
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

    function v(a) {
        let b;
        r ? b = a[r] : b = a.u;
        return null == b ? 0 : b
    }

    function z(a, b) {
        r ? a[r] = b : void 0 !== a.u ? a.u = b : Object.defineProperties(a, {
            u: {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !1
            }
        })
    }

    function ma(a) {
        u(a, 1);
        return a
    }

    function A(a) {
        return !!(v(a) & 2)
    }

    function na(a) {
        u(a, 16);
        return a
    }

    function oa(a, b) {
        z(b, (a | 0) & -51)
    }

    function pa(a, b) {
        z(b, (a | 18) & -41)
    };
    var B = {};

    function C(a) {
        return null !== a && "object" === typeof a && !Array.isArray(a) && a.constructor === Object
    }
    var E;
    const qa = [];
    z(qa, 23);
    E = Object.freeze(qa);

    function ra(a) {
        if (A(a.l)) throw Error("Cannot mutate an immutable Message");
    }

    function sa(a) {
        var b = a.length;
        (b = b ? a[b - 1] : void 0) && C(b) ? b.g = 1 : a.push({
            g: 1
        })
    };
    let F;

    function ta(a, b) {
        F = b;
        a = new a(b);
        F = void 0;
        return a
    };

    function ua(a, b, c = !1) {
        if (Array.isArray(a)) return new b(c ? na(a) : a)
    };

    function va(a) {
        switch (typeof a) {
            case "number":
                return isFinite(a) ? a : String(a);
            case "object":
                if (a)
                    if (Array.isArray(a)) {
                        if (0 !== (v(a) & 128)) return a = Array.prototype.slice.call(a), sa(a), a
                    } else {
                        if (ha && null != a && a instanceof Uint8Array) return fa(a);
                        if (a instanceof la) {
                            const b = a.R;
                            return null == b ? "" : "string" === typeof b ? b : a.R = fa(b)
                        }
                    }
        }
        return a
    };

    function wa(a, b, c, d) {
        if (null != a) {
            if (Array.isArray(a)) a = xa(a, b, c, void 0 !== d);
            else if (C(a)) {
                const e = {};
                for (let f in a) e[f] = wa(a[f], b, c, d);
                a = e
            } else a = b(a, d);
            return a
        }
    }

    function xa(a, b, c, d) {
        const e = v(a);
        d = d ? !!(e & 16) : void 0;
        a = Array.prototype.slice.call(a);
        for (let f = 0; f < a.length; f++) a[f] = wa(a[f], b, c, d);
        c(e, a);
        return a
    }

    function ya(a) {
        return a.F === B ? a.toJSON() : va(a)
    }

    function za(a) {
        if (!a) return a;
        if ("object" === typeof a) {
            if (ha && null != a && a instanceof Uint8Array) return new Uint8Array(a);
            if (a.F === B) return Aa(a)
        }
        return a
    }

    function Ba(a, b) {
        a & 128 && sa(b)
    };

    function Ca(a) {
        const b = a.h + a.B;
        return a.s || (a.s = a.l[b] = {})
    }

    function G(a, b, c) {
        return -1 === b ? null : b >= a.h ? a.s ? a.s[b] : void 0 : c && a.s && (c = a.s[b], null != c) ? c : a.l[b + a.B]
    }

    function H(a, b, c, d) {
        a.i && (a.i = void 0);
        b >= a.h || d ? Ca(a)[b] = c : (a.l[b + a.B] = c, (a = a.s) && b in a && delete a[b])
    }

    function Da(a, b, c, d) {
        a = G(a, b, c);
        Array.isArray(a) || (a = E);
        b = v(a);
        b & 1 || ma(a);
        !d || b & 2 || u(a, 2);
        return a
    }

    function Ea(a) {
        var b = Fa;
        const c = G(a, 1, !1); {
            let e = !1;
            var d = null == c || "object" !== typeof c || (e = Array.isArray(c)) || c.F !== B ? e ? new b(c) : void 0 : c
        }
        d !== c && null != d && (H(a, 1, d, !1), u(d.l, v(a.l) & 18));
        return d
    }

    function Ga(a) {
        let b = Ea(a);
        if (null == b) return b;
        if (!A(a.l)) {
            const c = Ja(b);
            c !== b && (b = c, H(a, 1, b, !1))
        }
        return b
    }

    function Ka(a, b, c, d) {
        ra(a);
        let e;
        if (null != c) {
            e = ma([]);
            let f = !1;
            for (let g = 0; g < c.length; g++) e[g] = c[g].l, f = f || A(e[g]);
            a.o || (a.o = {});
            a.o[b] = c;
            c = e;
            f ? r ? c[r] && (c[r] &= -9) : void 0 !== c.u && (c.u &= -9) : u(c, 8)
        } else a.o && (a.o[b] = void 0), e = E;
        H(a, b, e, d)
    }

    function I(a, b) {
        return null == a ? b : a
    }

    function L(a, b) {
        a = G(a, b);
        return I(null == a ? a : !!a, !1)
    };

    function La(a) {
        const b = v(a);
        if (b & 2) return a;
        a = Array.prototype.map.call(a, Ma, void 0);
        pa(b, a);
        Object.freeze(a);
        return a
    }

    function Na(a, b, c = pa) {
        if (null != a) {
            if (ha && a instanceof Uint8Array) return a.length ? new la(new Uint8Array(a)) : ja || (ja = new la(null));
            if (Array.isArray(a)) {
                const d = v(a);
                if (d & 2) return a;
                if (b && !(d & 32) && (d & 16 || 0 === d)) return z(a, d | 2), a;
                a = xa(a, Na, c, !0);
                b = v(a);
                b & 4 && b & 2 && Object.freeze(a);
                return a
            }
            return a.F === B ? Ma(a) : a
        }
    }

    function Ma(a) {
        if (A(a.l)) return a;
        a = Oa(a, !0);
        u(a.l, 2);
        return a
    }

    function Oa(a, b) {
        const c = a.l;
        var d = na([]),
            e = a.constructor.h;
        e && d.push(e);
        a.s && (d.length = c.length, d.fill(void 0, d.length, c.length), d[d.length - 1] = {});
        0 !== (v(c) & 128) && sa(d);
        b = b || A(a.l) ? pa : oa;
        d = ta(a.constructor, d);
        a.C && (d.C = a.C.slice());
        e = !!(v(c) & 16);
        for (let m = 0; m < c.length; m++) {
            var f = c[m];
            if (m === c.length - 1 && C(f))
                for (const t in f) {
                    var g = +t;
                    if (Number.isNaN(g)) Ca(d)[g] = f[g];
                    else {
                        var h = d,
                            l = g;
                        g = f[t];
                        var k = e,
                            n = b;
                        const w = a.o && a.o[l];
                        w ? Ka(h, l, La(w), !0) : (g = Na(g, k, n), ra(h), H(h, l, g, !0))
                    }
                } else h = d, g = m - a.B, k = e, n =
                    b, (l = a.o && a.o[g]) ? Ka(h, g, La(l), !1) : (f = Na(f, k, n), ra(h), H(h, g, f, !1))
        }
        return d
    };

    function Aa(a) {
        var b = xa(a.l, za, oa);
        na(b);
        F = b;
        b = new a.constructor(b);
        F = void 0;
        Pa(b, a);
        return b
    }

    function Ja(a) {
        if (A(a.l)) {
            var b = Oa(a, !1);
            b.i = a;
            a = b
        }
        return a
    }
    var Ra = class {
        constructor(a, b) {
            null == a && (a = F);
            F = void 0;
            var c = this.constructor.i || 0,
                d = 0 < c,
                e = this.constructor.h,
                f = !1;
            if (null == a) {
                a = e ? [e] : [];
                var g = !0;
                z(a, 48)
            } else {
                if (!Array.isArray(a)) throw Error();
                if (e && e !== a[0]) throw Error();
                const h = u(a, 0);
                let l = h;
                if (g = 0 !== (16 & l))(f = 0 !== (32 & l)) || (l |= 32);
                if (d)
                    if (128 & l) c = 0;
                    else {
                        if (0 < a.length) {
                            const k = a[a.length - 1];
                            if (C(k) && "g" in k) {
                                c = 0;
                                l |= 128;
                                delete k.g;
                                let n = !0;
                                for (let m in k) {
                                    n = !1;
                                    break
                                }
                                n && a.pop()
                            }
                        }
                    }
                else if (128 & l) throw Error();
                h !== l && z(a, l)
            }
            this.B = (e ? 0 : -1) - c;
            this.o =
                void 0;
            this.l = a;
            a: {
                e = this.l.length;c = e - 1;
                if (e && (e = this.l[c], C(e))) {
                    this.s = e;
                    this.h = c - this.B;
                    break a
                }
                this.h = Number.MAX_VALUE
            }
            if (!d && this.s && "g" in this.s) throw Error('Unexpected "g" flag in sparse object of message that is not a group type.');
            if (b) {
                d = g && !f && !0;
                g = this.h;
                let h;
                for (f = 0; f < b.length; f++) c = b[f], c < g ? (c += this.B, (e = a[c]) ? Qa(e, d) : a[c] = E) : (h || (h = Ca(this)), (e = h[c]) ? Qa(e, d) : h[c] = E)
            }
        }
        toJSON() {
            return xa(this.l, ya, Ba)
        }
    };

    function Qa(a, b) {
        if (Array.isArray(a)) {
            var c = v(a),
                d = 1;
            !b || c & 2 || (d |= 16);
            (c & d) !== d && z(a, c | d)
        }
    }
    Ra.prototype.F = B;

    function Pa(a, b) {
        b.C && (a.C = b.C.slice());
        const c = b.o;
        if (c) {
            const w = b.s;
            for (let y in c)
                if (b = c[y]) {
                    var d = !(!w || !w[y]),
                        e = +y;
                    if (Array.isArray(b)) {
                        if (b.length) {
                            var f = a,
                                g = d;
                            d = A(f.l);
                            var h = f,
                                l = b[0].constructor,
                                k = e,
                                n = g,
                                m = d,
                                t = d;
                            h.o || (h.o = {});
                            let p = h.o[k],
                                x = Da(h, k, n, t);
                            if (p) t || (Object.isFrozen(p) ? m || (p = Array.prototype.slice.call(p), h.o[k] = p) : m && Object.freeze(p));
                            else {
                                p = [];
                                const X = !!(v(h.l) & 16),
                                    D = A(x);
                                !t && D && (x = ma(Array.prototype.slice.call(x)), H(h, k, x, n));
                                n = D;
                                for (let R = 0; R < x.length; R++) {
                                    const Y = x[R],
                                        S = ua(Y,
                                            l, X);
                                    void 0 !== S && (n = n || A(Y), p.push(S), D && u(S.l, 2))
                                }
                                h.o[k] = p;
                                Object.isFrozen(x) || (h = v(x) | 33, z(x, n ? h & -9 : h | 8));
                                (t || m && D) && u(p, 2);
                                (t || m) && Object.freeze(p)
                            }
                            m = p;
                            f = Da(f, e, g, d);
                            if (!(d || v(f) & 8)) {
                                for (e = 0; e < m.length; e++) d = m[e], g = Ja(d), d !== g && (m[e] = g, f[e] = m[e].l);
                                u(f, 8)
                            }
                            f = m;
                            for (e = 0; e < Math.min(f.length, b.length); e++) Pa(f[e], b[e])
                        }
                    } else throw a = typeof b, Error("unexpected object: type: " + ("object" != a ? a : b ? Array.isArray(b) ? "array" : a : "null") + ": " + b);
                }
        }
    };
    var Fa = class extends Ra {
            constructor(a) {
                super(a, Sa)
            }
        },
        Sa = [28];
    var Ua = class extends Ra {
            constructor(a) {
                super(a, Ta)
            }
        },
        Ta = [21];

    function Va(a) {
        let b = !1,
            c;
        return function() {
            b || (c = a(), b = !0);
            return c
        }
    };
    var Wa = {
            passive: !0
        },
        Xa = Va(function() {
            let a = !1;
            try {
                const b = Object.defineProperty({}, "passive", {
                    get: function() {
                        a = !0
                    }
                });
                q.addEventListener("test", null, b)
            } catch (b) {}
            return a
        });

    function Ya(a) {
        return a ? a.passive && Xa() ? a : a.capture || !1 : !1
    }

    function M(a, b, c, d) {
        a.addEventListener && a.addEventListener(b, c, Ya(d))
    };
    var Za;
    var ab = class {
            constructor(a, b) {
                this.h = b === $a ? a : ""
            }
            toString() {
                return this.h + ""
            }
        },
        $a = {};

    function bb(a) {
        if (void 0 === Za) {
            var b = null;
            var c = q.trustedTypes;
            if (c && c.createPolicy) {
                try {
                    b = c.createPolicy("goog#html", {
                        createHTML: aa,
                        createScript: aa,
                        createScriptURL: aa
                    })
                } catch (d) {
                    q.console && q.console.error(d.message)
                }
                Za = b
            } else Za = b
        }
        a = (b = Za) ? b.createScriptURL(a) : a;
        return new ab(a, $a)
    };

    function N(a) {
        var b = document;
        return "string" === typeof a ? b.getElementById(a) : a
    }

    function cb(a) {
        var b = document;
        b.getElementsByClassName ? a = b.getElementsByClassName(a)[0] : (b = document, a = b.querySelectorAll && b.querySelector && a ? b.querySelector(a ? "." + a : "") : db(b, a)[0] || null);
        return a || null
    }

    function db(a, b) {
        var c, d;
        if (a.querySelectorAll && a.querySelector && b) return a.querySelectorAll(b ? "." + b : "");
        if (b && a.getElementsByClassName) {
            var e = a.getElementsByClassName(b);
            return e
        }
        e = a.getElementsByTagName("*");
        if (b) {
            var f = {};
            for (c = d = 0; a = e[c]; c++) {
                var g = a.className,
                    h;
                if (h = "function" == typeof g.split) h = 0 <= ba(g.split(/\s+/), b);
                h && (f[d++] = a)
            }
            f.length = d;
            return f
        }
        return e
    }

    function eb(a) {
        a && a.parentNode && a.parentNode.removeChild(a)
    };
    var fb = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");

    function gb(a, b) {
        if (a)
            for (const c in a) Object.prototype.hasOwnProperty.call(a, c) && b(a[c], c, a)
    }

    function hb(a, b = document) {
        return b.createElement(String(a).toLowerCase())
    };

    function ib(a, b, c = null, d = !1) {
        jb(a, b, c, d)
    }

    function jb(a, b, c, d) {
        a.google_image_requests || (a.google_image_requests = []);
        const e = hb("IMG", a.document);
        if (c || d) {
            const f = g => {
                c && c(g);
                if (d) {
                    g = a.google_image_requests;
                    const h = ba(g, e);
                    0 <= h && Array.prototype.splice.call(g, h, 1)
                }
                e.removeEventListener && e.removeEventListener("load", f, Ya());
                e.removeEventListener && e.removeEventListener("error", f, Ya())
            };
            M(e, "load", f);
            M(e, "error", f)
        }
        e.src = b;
        a.google_image_requests.push(e)
    };
    let kb = 0;

    function lb(a) {
        return (a = mb(a, document.currentScript)) && a.getAttribute("data-jc-version") || "unknown"
    }

    function mb(a, b = null) {
        return b && b.getAttribute("data-jc") === String(a) ? b : document.querySelector(`[${"data-jc"}="${a}"]`)
    }

    function nb() {
        if (!(.01 < Math.random())) {
            var a = mb(60, document.currentScript);
            a = `https://${a&&"true"===a.getAttribute("data-jc-rcd")?"pagead2.googlesyndication-cn.com":"pagead2.googlesyndication.com"}/pagead/gen_204?id=jca&jc=${60}&version=${lb(60)}&sample=${.01}`;
            var b = window,
                c;
            if (c = b.navigator) c = b.navigator.userAgent, c = /Chrome/.test(c) && !/Edge/.test(c) ? !0 : !1;
            c && b.navigator.sendBeacon ? b.navigator.sendBeacon(a) : ib(b, a, void 0, !1)
        }
    };
    var ob = document,
        O = window;

    function pb(a) {
        return "string" == typeof a.className ? a.className : a.getAttribute && a.getAttribute("class") || ""
    }

    function qb(a, b) {
        a.classList ? b = a.classList.contains(b) : (a = a.classList ? a.classList : pb(a).match(/\S+/g) || [], b = 0 <= ba(a, b));
        return b
    }

    function P(a, b) {
        if (a.classList) a.classList.add(b);
        else if (!qb(a, b)) {
            var c = pb(a);
            b = c + (0 < c.length ? " " + b : b);
            "string" == typeof a.className ? a.className = b : a.setAttribute && a.setAttribute("class", b)
        }
    };
    var rb = class {
        constructor(a) {
            this.serializedAttributionData = a.toJSON();
            this.h = Aa(a);
            this.isMutableImpression = void 0 !== Ea(this.h) && !!L(Ga(this.h), 33);
            this.aa = !!L(this.h, 11);
            this.hasUserFeedbackData = !!this.h && void 0 !== Ea(this.h);
            this.U = !!L(this.h, 4);
            this.X = !!L(this.h, 6);
            this.T = !!L(this.h, 13);
            this.creativeIndexSuffix = 1 < I(G(this.h, 8), 0) ? I(G(this.h, 7), 0).toString() : "";
            this.ba = !!L(this.h, 17);
            this.Z = !!L(this.h, 18);
            this.S = !!L(this.h, 14);
            this.enableMultiplexThirdPartyAttribution = !!L(this.h, 32);
            this.L = !!L(this.h,
                15);
            this.ca = !!L(this.h, 31);
            this.Y = 1 == L(this.h, 9);
            this.openAttributionInline = 1 == L(this.h, 10);
            this.isMobileDevice = !!L(this.h, 12);
            this.H = null;
            this.W = (a = ob.querySelector("[data-slide]")) ? "true" === a.getAttribute("data-slide") : !1;
            (this.N = "" !== this.creativeIndexSuffix) && void 0 === O.goog_multislot_cache && (O.goog_multislot_cache = {});
            if (this.N && !this.W) {
                if (a = O.goog_multislot_cache.hd, void 0 === a) {
                    a = !1;
                    var b = ob.querySelector("[data-dim]");
                    if (b)
                        if (b = b.getBoundingClientRect(), 150 <= b.right - b.left && 150 <= b.bottom -
                            b.top) a = !1;
                        else {
                            var c = document.body.getBoundingClientRect();
                            150 > (1 >= Math.abs(c.left - b.left) && 1 >= Math.abs(c.right - b.right) ? b.bottom - b.top : b.right - b.left) && (a = !0)
                        }
                    else a = !1;
                    window.goog_multislot_cache.hd = a
                }
            } else a = !1;
            this.M = a;
            this.J = N("abgcp" + this.creativeIndexSuffix);
            this.I = N("abgc" + this.creativeIndexSuffix);
            this.i = N("abgs" + this.creativeIndexSuffix);
            N("abgl" + this.creativeIndexSuffix);
            this.D = N("abgb" + this.creativeIndexSuffix);
            this.K = N("abgac" + this.creativeIndexSuffix);
            N("mute_panel" + this.creativeIndexSuffix);
            this.G = cb("goog_delegate_attribution" + this.creativeIndexSuffix);
            this.isDelegateAttributionActive = !!this.G && !!this.S && !cb("goog_delegate_disabled") && !this.L;
            if (this.i) a: for (a = this.i, b = a.childNodes, c = 0; c < b.length; c++) {
                const d = b.item(c);
                if ("undefined" != typeof d.tagName && "A" == d.tagName.toUpperCase()) {
                    a = d;
                    break a
                }
            } else a = null;
            this.v = a;
            this.m = this.isDelegateAttributionActive ? this.G : N("cbb" + this.creativeIndexSuffix);
            this.V = this.M ? "0" === this.creativeIndexSuffix : !0;
            this.enableDelegateDismissableMenu = !!this.m &&
                qb(this.m, "goog_dismissable_menu");
            this.A = null;
            this.O = 0;
            this.j = this.isDelegateAttributionActive ? this.G : this.X && this.J ? this.J : this.I;
            this.autoExpandOnLoad = !!L(this.h, 19);
            this.adbadgeEnabled = !!L(this.h, 24);
            this.enableNativeJakeUi = !!L(this.h, 27)
        }
    };
    var sb = class {
        constructor(a, b) {
            if (!a) throw Error("bad conv util ctor args");
            this.i = a;
            this.h = b
        }
    };
    var Q = (a, b) => {
        a && gb(b, (c, d) => {
            a.style[d] = c
        })
    };
    class tb {
        constructor(a, b) {
            this.error = a;
            this.context = b.context;
            this.msg = b.message || "";
            this.id = b.id || "jserror";
            this.meta = {}
        }
    };
    const ub = RegExp("^https?://(\\w|-)+\\.cdn\\.ampproject\\.(net|org)(\\?|/|$)");
    var vb = class {
            constructor(a, b) {
                this.h = a;
                this.i = b
            }
        },
        wb = class {
            constructor(a, b) {
                this.url = a;
                this.P = !!b;
                this.depth = null
            }
        };

    function yb(a, b) {
        const c = {};
        c[a] = b;
        return [c]
    }

    function zb(a, b, c, d, e) {
        const f = [];
        gb(a, function(g, h) {
            (g = Ab(g, b, c, d, e)) && f.push(h + "=" + g)
        });
        return f.join(b)
    }

    function Ab(a, b, c, d, e) {
        if (null == a) return "";
        b = b || "&";
        c = c || ",$";
        "string" == typeof c && (c = c.split(""));
        if (a instanceof Array) {
            if (d = d || 0, d < c.length) {
                const f = [];
                for (let g = 0; g < a.length; g++) f.push(Ab(a[g], b, c, d + 1, e));
                return f.join(c[d])
            }
        } else if ("object" == typeof a) return e = e || 0, 2 > e ? encodeURIComponent(zb(a, b, c, d, e + 1)) : "...";
        return encodeURIComponent(String(a))
    }

    function Bb(a) {
        let b = 1;
        for (const c in a.i) b = c.length > b ? c.length : b;
        return 3997 - b - a.j.length - 1
    }

    function Cb(a, b) {
        let c = "https://pagead2.googlesyndication.com" + b,
            d = Bb(a) - b.length;
        if (0 > d) return "";
        a.h.sort(function(f, g) {
            return f - g
        });
        b = null;
        let e = "";
        for (let f = 0; f < a.h.length; f++) {
            const g = a.h[f],
                h = a.i[g];
            for (let l = 0; l < h.length; l++) {
                if (!d) {
                    b = null == b ? g : b;
                    break
                }
                let k = zb(h[l], a.j, ",$");
                if (k) {
                    k = e + k;
                    if (d >= k.length) {
                        d -= k.length;
                        c += k;
                        e = a.j;
                        break
                    }
                    b = null == b ? g : b
                }
            }
        }
        a = "";
        null != b && (a = e + "trn=" + b);
        return c + a
    }
    class Db {
        constructor() {
            this.j = "&";
            this.i = {};
            this.m = 0;
            this.h = []
        }
    };

    function Eb() {
        var a = Fb,
            b = window.google_srt;
        0 <= b && 1 >= b && (a.h = b)
    }

    function Gb(a, b, c, d = !1, e) {
        if ((d ? a.h : Math.random()) < (e || .01)) try {
            let f;
            c instanceof Db ? f = c : (f = new Db, gb(c, (h, l) => {
                var k = f;
                const n = k.m++;
                h = yb(l, h);
                k.h.push(n);
                k.i[n] = h
            }));
            const g = Cb(f, "/pagead/gen_204?id=" + b + "&");
            g && ib(q, g)
        } catch (f) {}
    }
    class Hb {
        constructor() {
            this.h = Math.random()
        }
    };
    let Ib = null;

    function Jb() {
        const a = q.performance;
        return a && a.now && a.timing ? Math.floor(a.now() + a.timing.navigationStart) : Date.now()
    }

    function Kb() {
        const a = q.performance;
        return a && a.now ? a.now() : null
    };
    class Lb {
        constructor(a, b) {
            var c = Kb() || Jb();
            this.label = a;
            this.type = b;
            this.value = c;
            this.duration = 0;
            this.uniqueId = Math.random();
            this.taskId = this.slotId = void 0
        }
    };
    const T = q.performance,
        Mb = !!(T && T.mark && T.measure && T.clearMarks),
        Nb = Va(() => {
            var a;
            if (a = Mb) {
                var b;
                if (null === Ib) {
                    Ib = "";
                    try {
                        a = "";
                        try {
                            a = q.top.location.hash
                        } catch (c) {
                            a = q.location.hash
                        }
                        a && (Ib = (b = a.match(/\bdeid=([\d,]+)/)) ? b[1] : "")
                    } catch (c) {}
                }
                b = Ib;
                a = !!b.indexOf && 0 <= b.indexOf("1337")
            }
            return a
        });

    function Ob(a) {
        a && T && Nb() && (T.clearMarks(`goog_${a.label}_${a.uniqueId}_start`), T.clearMarks(`goog_${a.label}_${a.uniqueId}_end`))
    }
    class Pb {
        constructor() {
            var a = window;
            this.i = [];
            this.j = a || q;
            let b = null;
            a && (a.google_js_reporting_queue = a.google_js_reporting_queue || [], this.i = a.google_js_reporting_queue, b = a.google_measure_js_timing);
            this.h = Nb() || (null != b ? b : 1 > Math.random())
        }
        start(a, b) {
            if (!this.h) return null;
            a = new Lb(a, b);
            b = `goog_${a.label}_${a.uniqueId}_start`;
            T && Nb() && T.mark(b);
            return a
        }
        end(a) {
            if (this.h && "number" === typeof a.value) {
                a.duration = (Kb() || Jb()) - a.value;
                var b = `goog_${a.label}_${a.uniqueId}_end`;
                T && Nb() && T.mark(b);
                !this.h ||
                    2048 < this.i.length || this.i.push(a)
            }
        }
    };

    function Qb(a) {
        let b = a.toString();
        a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name);
        a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message);
        if (a.stack) {
            a = a.stack;
            var c = b;
            try {
                -1 == a.indexOf(c) && (a = c + "\n" + a);
                let d;
                for (; a != d;) d = a, a = a.replace(RegExp("((https?:/..*/)[^/:]*:\\d+(?:.|\n)*)\\2"), "$1");
                b = a.replace(RegExp("\n *", "g"), "\n")
            } catch (d) {
                b = c
            }
        }
        return b
    }

    function Rb(a, b, c) {
        let d, e;
        try {
            a.h && a.h.h ? (e = a.h.start(b.toString(), 3), d = c(), a.h.end(e)) : d = c()
        } catch (f) {
            c = !0;
            try {
                Ob(e), c = a.A(b, new tb(f, {
                    message: Qb(f)
                }), void 0, void 0)
            } catch (g) {
                a.v(217, g)
            }
            if (c) window.console ? .error ? .(f);
            else throw f;
        }
        return d
    }

    function Sb(a, b) {
        var c = Tb;
        return (...d) => Rb(c, a, () => b.apply(void 0, d))
    }
    class Ub {
        constructor(a = null) {
            this.j = Fb;
            this.i = null;
            this.A = this.v;
            this.h = a;
            this.m = !1
        }
        pinger() {
            return this.j
        }
        v(a, b, c, d, e) {
            e = e || "jserror";
            let f;
            try {
                const J = new Db;
                var g = J;
                g.h.push(1);
                g.i[1] = yb("context", a);
                b.error && b.meta && b.id || (b = new tb(b, {
                    message: Qb(b)
                }));
                if (b.msg) {
                    g = J;
                    var h = b.msg.substring(0, 512);
                    g.h.push(2);
                    g.i[2] = yb("msg", h)
                }
                var l = b.meta || {};
                b = l;
                if (this.i) try {
                    this.i(b)
                } catch (K) {}
                if (d) try {
                    d(b)
                } catch (K) {}
                d = J;
                l = [l];
                d.h.push(3);
                d.i[3] = l;
                d = q;
                l = [];
                let ka;
                b = null;
                do {
                    var k = d;
                    try {
                        var n;
                        if (n = !!k && null != k.location.href) b: {
                            try {
                                ca(k.foo);
                                n = !0;
                                break b
                            } catch (K) {}
                            n = !1
                        }
                        var m = n
                    } catch {
                        m = !1
                    }
                    m ? (ka = k.location.href, b = k.document && k.document.referrer || null) : (ka = b, b = null);
                    l.push(new wb(ka || ""));
                    try {
                        d = k.parent
                    } catch (K) {
                        d = null
                    }
                } while (d && k != d);
                for (let K = 0, xb = l.length - 1; K <= xb; ++K) l[K].depth = xb - K;
                k = q;
                if (k.location && k.location.ancestorOrigins && k.location.ancestorOrigins.length == l.length - 1)
                    for (m = 1; m < l.length; ++m) {
                        var t = l[m];
                        t.url || (t.url = k.location.ancestorOrigins[m - 1] || "", t.P = !0)
                    }
                var w = l;
                let Ha = new wb(q.location.href, !1);
                k = null;
                const Ia = w.length - 1;
                for (t = Ia; 0 <= t; --t) {
                    var y = w[t];
                    !k && ub.test(y.url) && (k = y);
                    if (y.url && !y.P) {
                        Ha = y;
                        break
                    }
                }
                y = null;
                const ec = w.length && w[Ia].url;
                0 != Ha.depth && ec && (y = w[Ia]);
                f = new vb(Ha, y);
                if (f.i) {
                    w = J;
                    var p = f.i.url || "";
                    w.h.push(4);
                    w.i[4] = yb("top", p)
                }
                var x = {
                    url: f.h.url || ""
                };
                if (f.h.url) {
                    var X = f.h.url.match(fb),
                        D = X[1],
                        R = X[3],
                        Y = X[4];
                    p = "";
                    D && (p += D + ":");
                    R && (p += "//", p += R, Y && (p += ":" + Y));
                    var S = p
                } else S = "";
                D = J;
                x = [x, {
                    url: S
                }];
                D.h.push(5);
                D.i[5] = x;
                Gb(this.j, e, J, this.m, c)
            } catch (J) {
                try {
                    Gb(this.j, e, {
                        context: "ecmserr",
                        rctx: a,
                        msg: Qb(J),
                        url: f &&
                            f.h.url
                    }, this.m, c)
                } catch (ka) {}
            }
            return !0
        }
    };
    let Fb, Tb;
    const U = new Pb;
    var Vb = () => {
        window.google_measure_js_timing || (U.h = !1, U.i != U.j.google_js_reporting_queue && (Nb() && Array.prototype.forEach.call(U.i, Ob, void 0), U.i.length = 0))
    };
    (a => {
        Fb = a ? ? new Hb;
        "number" !== typeof window.google_srt && (window.google_srt = Math.random());
        Eb();
        Tb = new Ub(U);
        Tb.i = b => {
            const c = kb;
            0 !== c && (b.jc = String(c), b.shv = lb(c))
        };
        Tb.m = !0;
        "complete" == window.document.readyState ? Vb() : U.h && M(window, "load", () => {
            Vb()
        })
    })();
    var V = (a, b) => Sb(a, b);

    function Wb(a) {
        if (a.h.v && a.h.Z) {
            const b = Ga(a.h.h);
            b && null != G(b, 5) && null != G(b, 6) && (a.j = new sb(I(G(b, 5), ""), I(G(b, 19), "")));
            M(a.h.v, "click", V(452, () => {
                if (!a.m && (a.m = !0, a.j)) {
                    var c = a.j;
                    let d = c.i + "&label=closebutton_whythisad_click";
                    d += "&label_instance=1";
                    c.h && (d += "&cid=" + c.h);
                    ib(window, d)
                }
            }))
        }
    }

    function Xb(a) {
        if (a.h.aa) M(a.h.j, "click", V(365, b => {
            const c = O.goog_interstitial_display;
            c && (c(b), b && (b.stopPropagation(), b.preventDefault()))
        }));
        else if (a.h.isMutableImpression && a.h.isMobileDevice) M(a.h.j, "click", () => a.i());
        else if (a.h.isMutableImpression && !a.h.isMobileDevice && (a.h.m && (M(a.h.m, "click", () => a.i()), M(a.h.m, "keydown", b => {
                "Enter" !== b.code && "Space" !== b.code || a.i()
            })), a.h.ca && a.h.i && M(a.h.i, "click", () => a.i())), a.h.U) Yb(a);
        else {
            M(a.h.j, "mouseover", V(367, () => Yb(a)));
            M(a.h.j, "mouseout", V(369,
                () => Zb(a, 500)));
            M(a.h.j, "touchstart", V(368, () => Yb(a)), Wa);
            const b = V(370, () => Zb(a, 4E3));
            M(a.h.j, "mouseup", b);
            M(a.h.j, "touchend", b);
            M(a.h.j, "touchcancel", b);
            a.h.v && M(a.h.v, "click", V(371, c => a.preventDefault(c)))
        }
    }

    function Yb(a) {
        window.clearTimeout(a.h.A);
        a.h.A = null;
        a.h.i && "block" == a.h.i.style.display || (a.h.O = Date.now(), a.h.D && a.h.i && (a.h.D.style.display = "none", a.h.i.style.display = "block"))
    }

    function Zb(a, b) {
        window.clearTimeout(a.h.A);
        a.h.A = window.setTimeout(() => $b(a), b)
    }

    function ac(a) {
        const b = a.h.K;
        b.style.display = "block";
        a.h.enableNativeJakeUi && window.requestAnimationFrame(() => {
            P(b, "abgacfo")
        })
    }

    function $b(a) {
        window.clearTimeout(a.h.A);
        a.h.A = null;
        a.h.D && a.h.i && (a.h.D.style.display = "block", a.h.i.style.display = "none")
    }
    class bc {
        constructor(a, b) {
            this.h = a;
            this.i = b;
            this.h.ba || (this.m = !1, this.j = null, !this.h.M || this.h.adbadgeEnabled || this.h.V ? Wb(this) : (a = {
                display: "none"
            }, b = {
                width: "15px",
                height: "15px"
            }, this.h.isMobileDevice ? (Q(this.h.D, a), Q(this.h.i, a), Q(this.h.J, b), Q(this.h.I, b)) : Q(this.h.I, a)), Xb(this), this.h.enableNativeJakeUi && P(this.h.K, "abgnac"), this.h.isDelegateAttributionActive ? (P(document.body, "goog_delegate_active"), P(document.body, "jaa")) : (!this.h.isMutableImpression && this.h.m && eb(this.h.m), setTimeout(() => {
                P(document.body, "jar")
            }, this.h.T ? 750 : 100)), this.h.L && P(document.body, "goog_delegate_disabled"), this.h.autoExpandOnLoad && O.addEventListener("load", () => this.i()))
        }
        preventDefault(a) {
            if (this.h.i && "block" == this.h.i.style.display && 500 > Date.now() - this.h.O) a.preventDefault ? a.preventDefault() : a.returnValue = !1;
            else if (this.h.openAttributionInline) {
                var b = this.h.v.getAttribute("href");
                window.adSlot ? window.adSlot.openAttribution(b) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1) : window.openAttribution &&
                    (window.openAttribution(b), a.preventDefault ? a.preventDefault() : a.returnValue = !1)
            } else this.h.Y && (b = this.h.v.getAttribute("href"), window.adSlot ? window.adSlot.openSystemBrowser(b) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1) : window.openSystemBrowser && (window.openSystemBrowser(b), a.preventDefault ? a.preventDefault() : a.returnValue = !1))
        }
    };

    function cc(a) {
        if (!a.h && (a.h = !0, O.goog_delegate_deferred_token = void 0, a.i)) {
            var b = a.j;
            a = JSON.stringify(a.i);
            if (null == a || "" == a) a = new Ua;
            else {
                a = JSON.parse(a);
                if (!Array.isArray(a)) throw Error(void 0);
                a = ta(Ua, na(a))
            }
            if (!a) throw Error("bad attrdata");
            a = new rb(a);
            new b(a)
        }
    }
    class dc {
        constructor(a) {
            var b = fc;
            if (!b) throw Error("bad ctor");
            this.j = b;
            this.i = a;
            this.h = !1;
            cb("goog_delegate_deferred") ? void 0 !== O.goog_delegate_deferred_token ? cc(this) : (a = () => {
                cc(this)
            }, O.goog_delegate_deferred_token = a, setTimeout(a, 5E3)) : cc(this)
        }
    };
    var gc = (a = []) => {
        q.google_logging_queue || (q.google_logging_queue = []);
        q.google_logging_queue.push([11, a])
    };
    class hc {
        constructor() {
            this.promise = new Promise(a => {
                this.resolve = a
            })
        }
    };

    function ic() {
        const {
            promise: a,
            resolve: b
        } = new hc;
        return {
            promise: a,
            resolve: b
        }
    };
    /* 
     
     SPDX-License-Identifier: Apache-2.0 
    */
    function jc(a, b = () => {}) {
        a.google_llp || (a.google_llp = {});
        a = a.google_llp;
        let c = a[5];
        if (c) return c;
        c = ic();
        a[5] = c;
        b();
        return c
    }

    function kc(a, b) {
        return jc(a, () => {
            var c = a.document;
            const d = hb("SCRIPT", c);
            d.src = b instanceof ab && b.constructor === ab ? b.h : "type_error:TrustedResourceUrl";
            var e;
            (e = (e = (d.ownerDocument && d.ownerDocument.defaultView || window).document.querySelector ? .("script[nonce]")) ? e.nonce || e.getAttribute("nonce") || "" : "") && d.setAttribute("nonce", e);
            (c = c.getElementsByTagName("script")[0]) && c.parentNode && c.parentNode.insertBefore(d, c)
        }).promise
    };

    function lc(a) {
        gc([a]);
        new dc(a)
    }

    function mc(a) {
        a.h.H ? a.h.H.expandAttributionCard() : (Rb(Tb, 373, () => {
            $b(a.i);
            ac(a.i)
        }), kc(window, bb(`https://${"pagead2.googlesyndication.com"}${"/pagead/js/"+I(G(a.h.h,33),"")+"/abg_survey.js"}`)).then(b => {
            b.createAttributionCard(a.h);
            a.h.H = b;
            b.expandAttributionCard()
        }), nb())
    }
    var fc = class {
        constructor(a) {
            this.h = a;
            this.i = new bc(this.h, V(359, () => mc(this)))
        }
    };
    kb = 60;
    const nc = mb(60, document.currentScript);
    if (null == nc) throw Error("JSC not found 60");
    const oc = {},
        pc = nc.attributes;
    for (let a = pc.length - 1; 0 <= a; a--) {
        const b = pc[a].name;
        0 === b.indexOf("data-jcp-") && (oc[b.substring(9)] = pc[a].value)
    }
    if (oc["attribution-data"]) lc(JSON.parse(oc["attribution-data"]));
    else {
        var qc = ["buildAttribution"],
            W = q;
        qc[0] in W || "undefined" == typeof W.execScript || W.execScript("var " + qc[0]);
        for (var Z; qc.length && (Z = qc.shift());) qc.length || void 0 === lc ? W[Z] && W[Z] !== Object.prototype[Z] ? W = W[Z] : W = W[Z] = {} : W[Z] = lc
    };
}).call(this);