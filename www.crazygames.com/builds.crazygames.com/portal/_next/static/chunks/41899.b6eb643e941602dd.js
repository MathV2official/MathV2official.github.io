"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [41899], {
        41899: function(t, e, r) {
            r.r(e);
            var a = r(87306),
                h = r(42882),
                s = r(25271),
                i = r(31803);

            function n() {
                return location.pathname + location.search
            }(0, h.Z)("urlChangeTracker", class {
                constructor(t, e) {
                    if ((0, s.t)(t, s.G.URL_CHANGE_TRACKER), !history.pushState || !window.addEventListener) return;
                    const r = {
                        shouldTrackUrlChange: this.shouldTrackUrlChange,
                        trackReplaceState: !1,
                        fieldsObj: {},
                        hitFilter: null
                    };
                    this.opts = (0, i.f0)(r, e), this.tracker = t, this.path = n(), this.pushStateOverride = this.pushStateOverride.bind(this), this.replaceStateOverride = this.replaceStateOverride.bind(this), this.handlePopState = this.handlePopState.bind(this), a.Z.add(history, "pushState", this.pushStateOverride), a.Z.add(history, "replaceState", this.replaceStateOverride), window.addEventListener("popstate", this.handlePopState)
                }
                pushStateOverride(t) {
                    return (...e) => {
                        t(...e), this.handleUrlChange(!0)
                    }
                }
                replaceStateOverride(t) {
                    return (...e) => {
                        t(...e), this.handleUrlChange(!1)
                    }
                }
                handlePopState() {
                    this.handleUrlChange(!0)
                }
                handleUrlChange(t) {
                    setTimeout((() => {
                        const e = this.path,
                            r = n();
                        if (e != r && this.opts.shouldTrackUrlChange.call(this, r, e) && (this.path = r, this.tracker.set({
                                page: r,
                                title: document.title
                            }), t || this.opts.trackReplaceState)) {
                            const t = {
                                transport: "beacon"
                            };
                            this.tracker.send("pageview", (0, i.VJ)(t, this.opts.fieldsObj, this.tracker, this.opts.hitFilter))
                        }
                    }), 0)
                }
                shouldTrackUrlChange(t, e) {
                    return !(!t || !e)
                }
                remove() {
                    a.Z.remove(history, "pushState", this.pushStateOverride), a.Z.remove(history, "replaceState", this.replaceStateOverride), window.removeEventListener("popstate", this.handlePopState)
                }
            })
        }
    }
]);