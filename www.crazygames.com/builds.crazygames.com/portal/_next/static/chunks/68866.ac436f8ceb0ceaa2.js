"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [68866], {
        68866: function(t, e, n) {
            n.r(e);
            var s = n(67294),
                u = n(25934),
                c = n(40183),
                a = n(92355),
                o = n(67025);
            const r = "quantcast_measure_uid",
                i = "quantcast_include_user";
            e.default = () => {
                const {
                    countryCode: t
                } = s.useContext(o.Z);
                return (0, s.useEffect)((() => {
                    if ("US" !== t) return;
                    const e = a.Z.Instance.getItem(i);
                    if ("false" === e) return;
                    if (null === e) {
                        const t = Math.random() < .01;
                        if (a.Z.Instance.setItem(i, `${t}`), !t) return;
                        a.Z.Instance.setItem(r, (0, u.Z)())
                    }
                    const n = a.Z.Instance.getItem(r),
                        s = ("https:" == document.location.protocol ? "https://secure" : "http://edge") + ".quantserve.com/quant.js";
                    window._qevents = window._qevents || [], (0, c.Z)(s, !0), window._qevents.push({
                        qacct: "p-65mRzghLEVx-x",
                        uid: n
                    })
                }), [t]), null
            }
        }
    }
]);