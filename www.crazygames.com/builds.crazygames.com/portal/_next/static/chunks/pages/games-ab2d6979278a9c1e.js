(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [38451, 40058], {
        33206: function(e, t, s) {
            "use strict";
            s.d(t, {
                Z: function() {
                    return f
                }
            });
            var a = s(67294),
                i = s(49501),
                n = s(52261),
                r = s(20287),
                o = s(58346),
                l = s(59499),
                c = s(70917),
                d = s(81719),
                u = s(93545),
                g = s(73927);

            function m(e, t) {
                var s = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var a = Object.getOwnPropertySymbols(e);
                    t && (a = a.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), s.push.apply(s, a)
                }
                return s
            }

            function p(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var s = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? m(Object(s), !0).forEach((function(t) {
                        (0, l.Z)(e, t, s[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(s)) : m(Object(s)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(s, t))
                    }))
                }
                return e
            }
            const h = (0, d.ZP)("div", {
                    shouldForwardProp: e => "isScrolling" !== e
                })((e => {
                    let {
                        theme: {
                            spacing: t,
                            breakpoints: s,
                            dimensions: a
                        },
                        isScrolling: i
                    } = e;
                    return p({
                        position: "fixed",
                        bottom: t(3),
                        right: "25%",
                        zIndex: 10,
                        "& button": {
                            fontSize: u.CH.h3,
                            boxShadow: "0px 0px 12px 2px #1e1134a6"
                        },
                        [s.down("gp_x6")]: {
                            right: "5%",
                            bottom: `${a.mobileFooterNav.drawerPlaceholder}px`,
                            zIndex: 2,
                            "& button": {
                                fontSize: u.CH.body
                            }
                        },
                        transition: "opacity 0.2s ease",
                        opacity: 1
                    }, i && {
                        opacity: 0
                    })
                })),
                x = c.F4 `
  0% { transform: scale(1,1)    translateY(0) }
  10% { transform: scale(1.03,.97) translateY(0) }
  30% { transform: scale(.97,1.03) translateY(-30px) }
  50% { transform: scale(1,1)    translateY(0) }
  57% { transform: scale(1,1)    translateY(-3px) }
  64% { transform: scale(1,1)    translateY(0) }
  100% { transform: scale(1,1)    translateY(0) 
  `,
                v = (0, d.ZP)(g.Sn, {
                    shouldForwardProp: e => "isDesktop" !== e
                })((e => {
                    let {
                        isDesktop: t
                    } = e;
                    return p({}, t && {
                        animationDuration: "1.5s",
                        animationIterationCount: 4,
                        transformOrigin: "bottom",
                        animationName: x,
                        animationTimingFunction: "ease",
                        boxShadow: "0px 0px 12px 2px #1e1134a6",
                        "&:hover": {
                            animationName: "none"
                        }
                    })
                }));
            var y = s(85893);
            var f = (0, r.Z)((e => {
                let {
                    height: t,
                    onClick: s,
                    label: r
                } = e;
                const [l, c] = a.useState(0), [d, u] = a.useState(!1), g = a.useContext(n.ZP);
                a.useEffect((() => {
                    let e;
                    const t = () => {
                        u(!0), e && window.clearTimeout(e), e = window.setTimeout((() => {
                            c(window.scrollY), u(!1)
                        }), 100)
                    };
                    return window.addEventListener("scroll", t, {
                            passive: !0
                        }), c(window.scrollY),
                        function() {
                            window.removeEventListener("scroll", t), window.clearTimeout(e)
                        }
                }), []);
                return l < t ? null : (0, y.jsx)(h, {
                    isScrolling: d,
                    children: (0, y.jsxs)(v, {
                        isDesktop: g.isDesktop,
                        height: 50,
                        variant: "contained",
                        onClick: () => {
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: "smooth"
                            }), s && s()
                        },
                        children: [r || (0, y.jsx)(i.cC, {
                            id: "common.backToTop"
                        }), (0, y.jsx)(o.Z, {
                            size: "small",
                            sx: {
                                ml: .5
                            }
                        })]
                    })
                })
            }))
        },
        40058: function(e, t, s) {
            "use strict";
            s.r(t), s.d(t, {
                default: function() {
                    return f
                }
            });
            var a = s(59499),
                i = s(67294),
                n = s(81719),
                r = s(1733);
            const o = e => {
                    let {
                        spacing: t,
                        breakpoints: s
                    } = e;
                    return {
                        marginRight: t(.5),
                        [s.up("gp_x9")]: {
                            marginRight: t()
                        },
                        position: "relative"
                    }
                },
                l = (0, n.ZP)(r.Z)((e => {
                    let {
                        theme: t
                    } = e;
                    return o(t)
                })),
                c = (0, n.ZP)("div")((e => {
                    let {
                        theme: t
                    } = e;
                    return o(t)
                }));
            var d = s(17519),
                u = s(90335),
                g = s(69925),
                m = s(76750),
                p = s(12550),
                h = s(40181),
                x = s(20287),
                v = s(85893);
            class y extends i.Component {
                constructor(e) {
                    super(e), (0, a.Z)(this, "delayTimeout", null), (0, a.Z)(this, "handleMouseEnter", (() => {
                        const {
                            pageSize: e
                        } = this.props;
                        Math.ceil(this.state.dataSize / e) > 1 || (this.delayTimeout = window.setTimeout((() => this.fetchMoreData()), 1e3))
                    })), (0, a.Z)(this, "handleMouseLeave", (() => {
                        this.delayTimeout && window.clearTimeout(this.delayTimeout)
                    })), (0, a.Z)(this, "canFetchMoreData", (() => {
                        const {
                            maxNoItems: e
                        } = this.props;
                        return void 0 !== e && this.state.dataSize < e
                    })), (0, a.Z)(this, "fetchMoreData", (async () => {
                        const {
                            fetchDataFn: e,
                            pageSize: t
                        } = this.props, {
                            data: s,
                            dataSize: a,
                            isFetching: i
                        } = this.state;
                        if (i) return;
                        this.setState({
                            isFetching: !0
                        });
                        const n = Math.ceil(a / t);
                        if (e && this.canFetchMoreData()) {
                            const t = await e(n + 1);
                            if (t) {
                                const e = t.filter((e => !s.some((t => t && t.slug === e.slug))));
                                this.setState((t => {
                                    const s = t.dataSize + e.length;
                                    return {
                                        data: t.data.concat(e),
                                        isFetching: !1,
                                        dataSize: s
                                    }
                                }))
                            }
                        }
                    })), this.state = {
                        data: e.games,
                        dataSize: e.dataSize || e.games.length,
                        isFetching: !1
                    }
                }
                componentDidUpdate(e) {
                    e.games !== this.props.games && this.setState({
                        data: this.props.games,
                        dataSize: this.props.dataSize || this.props.games.length
                    })
                }
                componentWillUnmount() {
                    this.delayTimeout && window.clearTimeout(this.delayTimeout)
                }
                render() {
                    const {
                        deviceType: e
                    } = this.props, t = this.getSliderContent(), s = this.getSliderSkeletons(), a = this.getAllContentPageSlide(), i = t.concat(s).concat(a);
                    return (0, v.jsx)(d.Z, {
                        requestData: this.fetchMoreData,
                        onMouseEnter: this.handleMouseEnter,
                        onMouseLeave: this.handleMouseLeave,
                        requestDataThreshold: e.isMobile ? 2 : 5,
                        children: i
                    })
                }
                getSliderContent() {
                    const {
                        data: e
                    } = this.state;
                    return e.map(((e, t) => e && this.renderSlide(e, t)))
                }
                getSliderSkeletons() {
                    const {
                        maxNoItems: e,
                        pageSize: t,
                        deviceType: s,
                        isSkeleton: a
                    } = this.props, i = s.isMobile || s.isTablet, n = this.state.dataSize;
                    return !a && (i || void 0 === e || n > t || n === e) ? [] : (0, g.Z)(t).map((e => this.renderSkeleton(e)))
                }
                getAllContentPageSlide() {
                    const {
                        maxNoItems: e,
                        deviceType: t,
                        allGamesLabel: s,
                        allGamesLinkData: a
                    } = this.props;
                    if (t.isMobile || t.isTablet || void 0 === e || this.state.dataSize < e || !s || !a) return [];
                    const i = a.href.includes("//kids"),
                        n = i ? "_blank" : void 0,
                        r = i ? "external nofollow" : void 0;
                    return [(0, v.jsx)(c, {
                        style: {
                            width: "100%",
                            height: "calc(100% + 4px)"
                        },
                        children: (0, v.jsx)(m.Z, {
                            label: s,
                            linkData: a,
                            target: n,
                            rel: r
                        })
                    }, "all-content")]
                }
                renderSlide(e, t) {
                    const {
                        preventZoom: s,
                        slidesToLoadEagerly: a,
                        games: i,
                        services: n,
                        imgResponsiveSizes: r
                    } = this.props, {
                        crazyAnalyticsService: o
                    } = n, c = void 0 !== a && t < a;
                    return (0, v.jsx)(l, {
                        game: e,
                        eagerLoading: c,
                        preventZoom: s,
                        onClickAction: () => {
                            o.gameClickedFromList(i)
                        },
                        isResponsive: !0,
                        imgResponsiveSizes: r
                    }, e.slug || `game-${t}`)
                }
                renderSkeleton(e, t) {
                    const s = () => (0, v.jsx)(c, {
                        className: "skeleton",
                        children: (0, v.jsx)(u.Z, {
                            isResponsive: !0
                        })
                    });
                    return void 0 === t ? (0, v.jsx)(s, {}, e) : (0, v.jsx)(p.Z, {
                        slug: t.slug,
                        https: t.https,
                        children: (0, v.jsx)("a", {
                            children: (0, v.jsx)(s, {})
                        })
                    }, t.slug || `key-${e}`)
                }
            }
            var f = (0, h.Z)((0, x.Z)(y))
        },
        87887: function(e, t, s) {
            "use strict";
            s.r(t), s.d(t, {
                default: function() {
                    return ze
                }
            });
            var a = s(59499),
                i = s(67294),
                n = s(49501),
                r = s(55424),
                o = s(26086),
                l = s(28710),
                c = s(74167),
                d = s(34172),
                u = s(43144),
                g = s(6778),
                m = s(75672),
                p = s(47989),
                h = s(98142),
                x = s(40058),
                v = s(83417),
                y = s(77792),
                f = s(52261),
                j = s(34386),
                w = s(73927),
                S = s(85893);
            var b = e => {
                    let {
                        games: t,
                        eagerLoadIndex: s
                    } = e;
                    const a = i.useContext(f.ZP),
                        {
                            services: r
                        } = i.useContext(j.Z);
                    if (!t.items || t.items.length < 1) return null;
                    const o = a.isMobile,
                        l = Math.min(d.Vs, t.total),
                        c = t.items;
                    return (0, S.jsxs)(h.m$, {
                        children: [(0, S.jsx)(v.Z, {
                            label: (0, S.jsx)(n.cC, {
                                id: "games.featured.title"
                            })
                        }), " ", (0, S.jsx)(x.default, {
                            games: c,
                            dataSize: c.length,
                            slidesToLoadEagerly: s,
                            fetchDataFn: async e => {
                                const t = a.isMobile,
                                    {
                                        gameService: s
                                    } = r,
                                    i = {
                                        page: e,
                                        size: t ? d.lp : d.Qg
                                    },
                                    n = (0, y.yz)(a);
                                return (await s.featuredGames(n, i)).games.items
                            },
                            maxNoItems: l,
                            pageSize: o ? d.lp : d.Qg,
                            imgResponsiveSizes: w.D1
                        })]
                    })
                },
                Z = s(45670),
                z = s(48266);
            const P = i.memo((e => {
                let {
                    games: t,
                    slidesToLoadEagerly: s,
                    pageSize: a,
                    slug: r,
                    tag: o
                } = e;
                const l = i.useContext(j.Z).services,
                    {
                        i18n: c
                    } = (0, n.mV)(),
                    {
                        routeHelper: u
                    } = i.useContext(z.Z),
                    g = i.useContext(f.ZP),
                    m = g.isMobile,
                    p = c._({
                        id: "common.games.all"
                    }, {
                        title: o.title
                    }),
                    b = u.tagOrCategoryPageDirectLink(o.slug, o.isCategory);
                return (0, S.jsxs)(h.m$, {
                    children: [(0, S.jsx)(v.Z, {
                        categorySet: {
                            slug: r,
                            tag: o
                        }
                    }), (0, S.jsx)(x.default, {
                        games: t,
                        slidesToLoadEagerly: s,
                        maxNoItems: d.kY,
                        dataSize: t.length,
                        pageSize: a,
                        fetchDataFn: async e => {
                            const {
                                gameService: t
                            } = l, s = {
                                page: e,
                                size: a,
                                offset: m ? -1 : -2
                            }, i = (0, y.yz)(g);
                            return (await t.topTagGames(o.slug, o.isCategory, i, s)).games.data.items
                        },
                        allGamesLinkData: b,
                        allGamesLabel: p,
                        imgResponsiveSizes: w.D1
                    })]
                })
            }));
            var C = P;

            function k(e) {
                return e.isMobile ? d.tS : e.isTablet ? d.$I : d.qi
            }
            var D = s(54505);
            const O = i.memo((e => {
                let {
                    categoryGames: t
                } = e;
                const s = i.useContext(f.ZP),
                    a = (0, D.Z)(),
                    n = k(s);
                if (!t || t.length < 1) return null;
                return (0, S.jsx)(S.Fragment, {
                    children: t.map(((e, t) => {
                        const {
                            slug: s,
                            tag: i
                        } = e, r = (0, Z.Z)(e.games, {
                            isIos: a
                        });
                        if (r.length < 1) return null;
                        const o = 3 >= t + 1 ? 6 : 0;
                        return (0, S.jsx)(C, {
                            slidesToLoadEagerly: o,
                            games: r,
                            pageSize: n,
                            tag: i,
                            slug: s
                        }, s)
                    }))
                })
            }));
            var L = O;
            const T = (0, s(81719).ZP)("div", {
                shouldForwardProp: e => "isDesktop" !== e
            })((e => {
                let {
                    theme: {
                        spacing: t
                    },
                    isDesktop: s
                } = e;
                return {
                    paddingLeft: s ? t(1) : void 0
                }
            }));
            var G = s(20287);
            const M = [{
                    type: "top",
                    size: 5
                }],
                E = [{
                    type: "top",
                    size: 5
                }, {
                    type: "recent",
                    size: 5
                }, {
                    type: "top",
                    size: 5
                }, {
                    type: "recent",
                    size: 5
                }, {
                    type: "top",
                    size: 10
                }];
            var F = s(1733),
                I = s(17519);

            function R(e, t, s) {
                const a = {
                    top: e,
                    recent: t
                };
                let i = [];
                return s.forEach((e => {
                    const t = a[e.type].filter((e => i.every((t => e.slug !== t.slug))));
                    i = i.concat(t.slice(0, e.size)), a[e.type] = e.size ? t.slice(e.size) : t
                })), i
            }
            var N = s(90335),
                _ = s(40181),
                $ = s(72461);
            class A extends i.Component {
                constructor(e) {
                    super(e), (0, a.Z)(this, "fetchMoreDataFromApi", (async e => {
                        const {
                            services: t,
                            deviceType: s
                        } = this.props, {
                            pageService: a
                        } = t, i = {
                            page: e,
                            size: d.jU
                        }, n = (0, y.yz)(s);
                        return (await a.topGamesForRecommended(i, n)).games.data.items
                    })), (0, a.Z)(this, "fetchMoreData", (async () => {
                        const {
                            topGames: e
                        } = this.state, t = e.length < d.HU, s = Math.ceil(e.length / d.jU);
                        if (t) {
                            const e = await this.fetchMoreDataFromApi(s + 1);
                            e && this.setState((t => ({
                                topGames: t.topGames.concat(e)
                            })))
                        }
                    })), this.state = {
                        recentlyPlayedGames: [],
                        topGames: e.games,
                        carouselLayout: M
                    }
                }
                componentDidMount() {
                    const {
                        services: e
                    } = this.props, {
                        recentlyPlayedService: t
                    } = e;
                    this.setState({
                        recentlyPlayedGames: t.getSortedGames(),
                        carouselLayout: E
                    })
                }
                render() {
                    const {
                        theme: {
                            dimensions: e
                        }
                    } = this.props, t = this.renderGames(), s = e.gameThumb.width + 8;
                    return (0, S.jsxs)(h.R_, {
                        children: [(0, S.jsx)(v.Z, {
                            label: (0, S.jsx)(n.cC, {
                                id: "carousels.recommended.title"
                            })
                        }), (0, S.jsx)(I.Z, {
                            elementWidth: s,
                            requestData: this.fetchMoreData,
                            requestDataThreshold: 2,
                            children: t
                        })]
                    })
                }
                renderGames() {
                    const {
                        recentlyPlayedGames: e,
                        topGames: t,
                        carouselLayout: s
                    } = this.state, a = R(t, e, s), i = () => {
                        this.clickAction(a)
                    }, n = this.state.carouselLayout === M ? Math.max(30, a.length) : a.length, r = 2 * Math.floor(n / 2), o = [];
                    for (let l = 0; l < r; l += 2) {
                        const e = a[l],
                            t = a[l + 1];
                        e || t ? o.push((0, S.jsxs)(h.Sd, {
                            children: [e ? (0, S.jsx)(F.Z, {
                                game: e,
                                eagerLoading: l < 3,
                                onClickAction: i,
                                isResponsive: !0,
                                imgResponsiveSizes: w.D1
                            }) : (0, S.jsx)(N.Z, {
                                isResponsive: !0
                            }), t ? (0, S.jsx)(F.Z, {
                                game: t,
                                eagerLoading: l < 3,
                                onClickAction: i,
                                isResponsive: !0,
                                imgResponsiveSizes: w.D1
                            }) : (0, S.jsx)(N.Z, {
                                isResponsive: !0,
                                sx: {
                                    ml: .25
                                }
                            })]
                        }, e.slug)) : o.push((0, S.jsxs)(h.Sd, {
                            children: [(0, S.jsx)(N.Z, {
                                isResponsive: !0
                            }), (0, S.jsx)(N.Z, {
                                isResponsive: !0
                            })]
                        }, l))
                    }
                    return o
                }
                clickAction(e) {
                    const {
                        services: t
                    } = this.props, {
                        crazyAnalyticsService: s
                    } = t;
                    s.gameClickedFromList(e)
                }
            }
            var H = (0, $.Z)((0, G.Z)((0, _.Z)(A))),
                q = s(77223);
            var Y = e => {
                    let {
                        games: t
                    } = e;
                    const s = i.useContext(f.ZP),
                        [a, n] = i.useState([]),
                        [r, o] = i.useState(t),
                        {
                            recentlyPlayedService: l,
                            pageService: c
                        } = i.useContext(j.Z).services,
                        [u, g] = i.useState(M);
                    i.useEffect((() => {
                        n(l.getSortedGames()), g(E)
                    }), [l]);
                    const m = R(r, a, u);
                    return (0, S.jsx)(q.Z, {
                        withTitle: !0,
                        games: m,
                        requestData: async () => {
                            const e = r.length < d.HU,
                                t = Math.ceil(r.length / d.jU);
                            if (e) {
                                const e = await (async e => {
                                    const t = (0, y.yz)(s),
                                        a = {
                                            page: e,
                                            size: d.jU
                                        };
                                    return (await c.topGamesForRecommended(a, t)).games.data.items
                                })(t + 1);
                                e && o(r.concat(e))
                            }
                        },
                        requestDataThreshold: 2,
                        loading: u === M,
                        loadingLimit: 25
                    })
                },
                U = s(49423),
                B = s(50645),
                V = s(62097),
                K = s(41664),
                Q = s.n(K);

            function W(e, t) {
                var s = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var a = Object.getOwnPropertySymbols(e);
                    t && (a = a.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), s.push.apply(s, a)
                }
                return s
            }

            function X(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var s = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? W(Object(s), !0).forEach((function(t) {
                        (0, a.Z)(e, t, s[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(s)) : W(Object(s)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(s, t))
                    }))
                }
                return e
            }
            const J = i.memo((e => {
                let {
                    games: t,
                    isHomePage: s,
                    sorting: a
                } = e;
                const {
                    routeHelper: r
                } = i.useContext(z.Z), o = r.isHomePage(), l = (0, D.Z)(), {
                    spacing: c
                } = (0, V.Z)(), g = (() => {
                    if (!t) return null;
                    const e = (0, Z.Z)(t, {
                        isIos: l
                    });
                    var a, i;
                    return s ? e.items.slice(5).concat((null === (a = t.desktop) || void 0 === a ? void 0 : a.items) || []) : e.items.concat((null === (i = t.desktop) || void 0 === i ? void 0 : i.items) || [])
                })();
                return g && 0 !== g.length ? (0, S.jsxs)("div", {
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    },
                    children: [(0, S.jsxs)("div", {
                        style: {
                            width: "100%",
                            padding: c(2)
                        },
                        children: [(0, S.jsx)(m.Z, {
                            children: g && (0, S.jsx)(B.Z, {
                                games: g,
                                justifyContent: "center",
                                slidesToLoadEagerly: s ? 0 : d.$V,
                                contentVisibility: o ? "auto" : void 0,
                                containIntrinsicSize: o ? 900 : void 0,
                                customStyles: {
                                    paddingTop: 24,
                                    paddingBottom: 24,
                                    width: "100%"
                                },
                                isResponsive: !o,
                                isResponsiveGrid: !o,
                                sx: o ? void 0 : w.Dx,
                                imgResponsiveSizes: w.L
                            })
                        }), (0, S.jsx)(p.Z, {
                            children: g && (0, S.jsx)(B.Z, {
                                games: g,
                                justifyContent: "center",
                                slidesToLoadEagerly: s ? 0 : d.nY,
                                contentVisibility: o ? "auto" : void 0,
                                containIntrinsicSize: o ? 900 : void 0,
                                customStyles: {
                                    paddingTop: 24
                                },
                                isResponsive: !o,
                                isResponsiveGrid: !o,
                                sx: o ? void 0 : w.Dx,
                                imgResponsiveSizes: w.L
                            })
                        })]
                    }), t && (0, S.jsx)(U.Z, {
                        games: t.data,
                        urlGenerator: (e, t) => {
                            if (!r) throw new Error("Route Helper not defined");
                            const s = t || a;
                            switch (s) {
                                case u.Fi:
                                    return r.newPageLink(e);
                                case u.sc:
                                    return r.homePageLink(e);
                                case u.BE:
                                    return r.homePageLink(e, u.BE);
                                case u.K6:
                                    return r.updatedPageLink(e);
                                default:
                                    return console.warn(`unexpected sorting ${s}`), r.homePageLink(e)
                            }
                        },
                        pageLimit: d.ir
                    })]
                }) : (0, S.jsx)("div", {
                    style: {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: c(2),
                        height: "100%"
                    },
                    children: (0, S.jsx)(w.qQ, {
                        children: (0, S.jsx)(n.cC, {
                            id: "games.empty.title",
                            values: {
                                homepageLink: (0, S.jsx)(Q(), X(X({}, r.homePageLink()), {}, {
                                    passHref: !0,
                                    children: (0, S.jsx)("a", {
                                        children: (0, S.jsx)(n.cC, {
                                            id: "games.empty.homepage"
                                        })
                                    })
                                }))
                            }
                        })
                    })
                })
            }));
            var ee = J,
                te = s(4235),
                se = s(30120);
            var ae = e => {
                    let {
                        games: t,
                        newGames: s,
                        eagerLoadIndex: a
                    } = e;
                    const r = i.useContext(f.ZP),
                        {
                            services: o
                        } = i.useContext(j.Z),
                        {
                            routeHelper: l
                        } = i.useContext(z.Z);
                    if (!t.items || t.items.length < 1) return null;
                    const c = ((null === s || void 0 === s ? void 0 : s.items) || []).filter((e => !t.items.some((t => t.slug === e.slug)))).slice(0, 3),
                        u = r.isMobile,
                        g = Math.min(d.I4, t.total),
                        m = t.items,
                        p = m.concat(c),
                        b = l.newPageLink(),
                        Z = u ? d.fr : d.ZO;
                    return (0, S.jsxs)(h.m$, {
                        children: [(0, S.jsx)(v.Z, {
                            label: (0, S.jsx)(n.cC, {
                                id: "games.new.title"
                            }),
                            linkData: b
                        }), " ", (0, S.jsx)(x.default, {
                            games: p,
                            dataSize: m.length,
                            slidesToLoadEagerly: a,
                            fetchDataFn: async e => {
                                const {
                                    gameService: t
                                } = o, s = {
                                    page: e,
                                    size: Z
                                }, a = (0, y.yz)(r);
                                return (await t.newGames(a, s)).games.items
                            },
                            maxNoItems: g,
                            pageSize: Z,
                            imgResponsiveSizes: w.D1
                        })]
                    })
                },
                ie = s(5152),
                ne = s.n(ie),
                re = s(69925);
            var oe = i.memo((e => {
                let {
                    pageSize: t
                } = e;
                return (0, S.jsx)(h.m$, {
                    sx: {
                        pt: "31.8px",
                        overflowAnchor: "none"
                    },
                    children: (0, S.jsx)(x.default, {
                        isSkeleton: !0,
                        games: [],
                        slidesToLoadEagerly: 0,
                        maxNoItems: d.kY,
                        dataSize: 0,
                        pageSize: t
                    })
                })
            }));
            const le = i.memo((e => {
                let {
                    games: t,
                    slidesToLoadEagerly: s = 0
                } = e;
                const a = i.useContext(f.ZP),
                    {
                        services: r
                    } = i.useContext(j.Z);
                if (!t.items || t.items.length < 1) return null;
                const o = Math.min(d.Sr, t.total),
                    l = t.items;
                return (0, S.jsxs)(h.m$, {
                    children: [(0, S.jsx)(v.Z, {
                        label: (0, S.jsx)(n.cC, {
                            id: "games.weeklyFeatured.title"
                        })
                    }), (0, S.jsx)(x.default, {
                        games: l,
                        dataSize: l.length,
                        slidesToLoadEagerly: s,
                        maxNoItems: o,
                        fetchDataFn: async e => {
                            const t = a.isMobile,
                                {
                                    gameService: s
                                } = r,
                                i = {
                                    page: e,
                                    size: t ? d.z : d.C8
                                },
                                n = (0, y.yz)(a);
                            return (await s.weeklyRecommendedGames(n, i)).games.items
                        },
                        pageSize: a.isMobile ? d.z : d.C8,
                        imgResponsiveSizes: w.D1
                    })]
                })
            }));
            var ce = le;
            const de = ne()((() => s.e(51391).then(s.bind(s, 51391))), {
                    loading: () => null,
                    ssr: !1,
                    loadableGenerated: {
                        webpack: () => [51391]
                    }
                }),
                ue = e => {
                    let {
                        items: t,
                        pageSize: s
                    } = e;
                    return (0, S.jsx)(S.Fragment, {
                        children: t.map(((e, t) => {
                            if ("weekly" === e.type) return (0, S.jsx)(ce, {
                                games: e.data
                            }, `weekly-${t}`);
                            if ("tag" === e.type) {
                                const t = e.data,
                                    {
                                        slug: a,
                                        tag: i
                                    } = t;
                                return 0 === t.games.length ? null : (0, S.jsx)(C, {
                                    slidesToLoadEagerly: 0,
                                    games: t.games,
                                    pageSize: s,
                                    tag: i,
                                    slug: a
                                }, a)
                            }
                        }))
                    })
                },
                ge = e => {
                    let {
                        pageSize: t,
                        size: s
                    } = e;
                    return (0, S.jsx)(S.Fragment, {
                        children: (0, re.Z)(s).map((e => (0, S.jsx)(oe, {
                            pageSize: t
                        }, `skeleton-${e}`)))
                    })
                };
            var me = () => {
                    var e;
                    const t = i.useContext(j.Z).services,
                        s = i.useContext(f.ZP),
                        a = i.useRef(null),
                        [n, r] = i.useState(!1),
                        o = i.useRef([]),
                        [l, c] = i.useState([]),
                        d = i.useRef(0),
                        [u, g] = i.useState(0),
                        [m, p] = i.useState(!1),
                        h = i.useRef(!1),
                        x = k(s),
                        v = i.useCallback((e => {
                            e[0].isIntersecting ? (h.current = !0, p(!0)) : (h.current = !1, p(!1))
                        }), []);
                    i.useEffect((() => {
                        const e = async () => {
                            try {
                                var a;
                                const {
                                    gameService: i,
                                    analyticsService: l
                                } = t;
                                if (n) return;
                                const u = Math.max(...o.current.map((e => e.carousels.pagination.page)), 0),
                                    m = (null === (a = o.current[0]) || void 0 === a ? void 0 : a.carousels.total) || 0,
                                    p = u + d.current + 1;
                                if (m && m < 6 * (p - 1)) return;
                                d.current = d.current + 1, g(d.current);
                                const v = (0, y.yz)(s),
                                    f = {
                                        page: p,
                                        size: 6,
                                        offset: 0
                                    },
                                    j = await i.lazyCarousels(x, f, v);
                                o.current = [...o.current, j], c(o.current), d.current = d.current - 1, g(d.current), j.carousels.total <= j.carousels.pagination.page * j.carousels.pagination.size ? (l.trackLazyCarouselsEnd(), r(!0)) : h.current && e()
                            } catch (i) {
                                console.error(i), r(!0)
                            }
                        };
                        !n && h.current && e()
                    }), [n, m, s, t, x]), i.useEffect((() => {
                        let e;
                        return a.current && !n && (e = new window.IntersectionObserver(v, {
                            root: null,
                            threshold: .1,
                            rootMargin: s.isDesktop ? "700px 0px" : "300px 0px"
                        }), e.observe(a.current)), () => {
                            e && e.disconnect()
                        }
                    }), [a, v, s.isDesktop, n]);
                    const w = o.current.length + d.current,
                        b = (0, re.Z)(w, 1),
                        Z = Math.ceil(((null === (e = o.current[0]) || void 0 === e ? void 0 : e.carousels.total) || 1) / 6),
                        z = Math.max(0, Z - w);
                    return (0, S.jsxs)(S.Fragment, {
                        children: [b.map((e => {
                            const t = o.current.find((t => {
                                var s;
                                return (null === t || void 0 === t || null === (s = t.carousels) || void 0 === s ? void 0 : s.pagination.page) === e
                            }));
                            return t ? (0, S.jsx)(ue, {
                                items: t.carousels.items,
                                pageSize: x
                            }, `carousel-${e}`) : (0, S.jsx)(ge, {
                                pageSize: x,
                                size: 6
                            }, `skeleton-${e}`)
                        })), (0, S.jsx)("div", {
                            style: {
                                width: "100%"
                            },
                            ref: a
                        }, "observer"), (0, S.jsx)(ge, {
                            pageSize: x,
                            size: 6 * z
                        }), (0, S.jsx)("div", {
                            style: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: 100,
                                overflowAnchor: "none"
                            },
                            children: n && (0, S.jsx)(de, {
                                sx: {
                                    width: 100,
                                    height: 100
                                }
                            })
                        })]
                    })
                },
                pe = s(33206);
            var he = e => {
                    let {
                        games: t,
                        sorting: s,
                        topGames: a,
                        featuredGames: r,
                        newGames: o,
                        processedNewGames: l,
                        page: c,
                        homepageCat: d
                    } = e;
                    const {
                        locale: u
                    } = i.useContext(te.Z), {
                        routeHelper: g
                    } = i.useContext(z.Z), h = i.useContext(f.ZP), x = (0, D.Z)(), v = g.isHomePage(), y = a && (0, Z.Z)(a, {
                        isIos: x
                    }), j = r && (0, Z.Z)(r, {
                        isIos: x
                    }), w = o && (0, Z.Z)(o, {
                        isIos: x
                    }), P = l && (0, Z.Z)(l, {
                        isIos: x
                    }), C = g.isNewGamesPage() ? "games.new.title" : g.isMostPlayedSorting() ? "games.mostPlayed.title" : g.isUpdatedGamesPage() ? "games.updated.title" : g.isHotGamesPage() ? "games.hot.title" : void 0;
                    return (0, S.jsxs)(T, {
                        isDesktop: h.isDesktop,
                        children: [C && (0, S.jsx)("div", {
                            style: {
                                display: "flex"
                            },
                            children: (0, S.jsx)(se.Z, {
                                sx: {
                                    px: 2,
                                    pb: 2,
                                    pt: {
                                        xs: 2,
                                        h2: 4
                                    },
                                    mt: v ? void 0 : 2
                                },
                                children: (0, S.jsx)("h1", {
                                    children: (0, S.jsx)(n.cC, {
                                        id: C
                                    })
                                })
                            })
                        }), 1 === c && v && (0, S.jsxs)(S.Fragment, {
                            children: [(0, S.jsxs)(m.Z, {
                                children: [y && (0, S.jsx)(Y, {
                                    games: y.items
                                }), j && (0, S.jsx)(b, {
                                    games: j,
                                    eagerLoadIndex: 6
                                }), P && (0, S.jsx)(ae, {
                                    games: P,
                                    newGames: w,
                                    eagerLoadIndex: 6
                                }), d && (0, S.jsx)(L, {
                                    categoryGames: d
                                })]
                            }), (0, S.jsxs)(p.Z, {
                                children: [y && (0, S.jsx)(H, {
                                    games: y.items,
                                    locale: u
                                }), j && (0, S.jsx)(b, {
                                    games: j,
                                    eagerLoadIndex: 6
                                }), P && (0, S.jsx)(ae, {
                                    games: P,
                                    newGames: w,
                                    eagerLoadIndex: 2
                                }), d && (0, S.jsx)(L, {
                                    categoryGames: d
                                })]
                            })]
                        }), v ? (0, S.jsxs)(S.Fragment, {
                            children: [(0, S.jsx)(me, {}), (0, S.jsx)(pe.Z, {
                                height: h.isDesktop ? 1800 : 1200
                            })]
                        }) : (0, S.jsx)(ee, {
                            games: t,
                            sorting: s,
                            page: c,
                            isHomePage: v
                        })]
                    })
                },
                xe = s(43120),
                ve = s(34779),
                ye = s(10041),
                fe = s(94704),
                je = s(67959),
                we = s(50305);

            function Se(e, t) {
                var s = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var a = Object.getOwnPropertySymbols(e);
                    t && (a = a.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), s.push.apply(s, a)
                }
                return s
            }

            function be(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var s = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? Se(Object(s), !0).forEach((function(t) {
                        (0, a.Z)(e, t, s[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(s)) : Se(Object(s)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(s, t))
                    }))
                }
                return e
            }
            class Ze extends i.Component {
                static async getInitialProps(e) {
                    const {
                        pageService: t
                    } = (0, g.b)(e), {
                        deviceType: s
                    } = (0, y.mO)(e), a = (0, y.yz)(s), i = s.isMobile, n = e.query && e.query[u.Y7] || "default", r = Number(e.query && e.query[u.Fh] || 1), o = i ? d.v1 : d.gG, l = {
                        page: r,
                        size: Number(e.query && e.query[u.AB] || o)
                    }, c = k(s), m = i ? d.lp : d.Qg, p = i ? d.VT : d.rF, h = i ? we.qf : we.zq, x = i ? d.fr : d.ZO, v = 1 === r, f = e.query && e.query[u.Hs] || void 0;
                    let j;
                    var w;
                    if (v && "default" === n && !f) j = await t.gamesPage(n, l, c, m, d.f3, x, p, a, h);
                    else if (j = await t.gamesPageGamesOnly(n, l, a, h, f), 1 !== l.page && 0 === j.games.data.items.length && 0 === ((null === (w = j.games.desktop) || void 0 === w ? void 0 : w.items.length) || 0)) throw new je.Z(404, "No games found");
                    return be(be({}, j), {}, {
                        label: f,
                        sorting: n,
                        page: r
                    })
                }
                render() {
                    const {
                        i18n: e,
                        topGames: t,
                        games: s,
                        sorting: a,
                        page: i,
                        featuredGames: n,
                        newGames: c,
                        processedNewGames: d,
                        homepageCat: u
                    } = this.props, g = this.getTitle(), m = e._({
                        id: "common.head.metaDescription"
                    }), p = this.getAlternatives(), h = this.getCanonical();
                    return (0, S.jsxs)(S.Fragment, {
                        children: [(0, S.jsx)(l.Z, {
                            title: g,
                            metaDescription: m,
                            canonical: h,
                            alternatives: p
                        }), (0, S.jsx)(ve.Z, {
                            canonical: h,
                            title: g,
                            description: m
                        }), (0, S.jsx)(r.Z, {
                            alternatives: p,
                            children: (0, S.jsxs)(o.Z, {
                                children: [(0, S.jsx)(he, {
                                    games: s,
                                    topGames: t,
                                    sorting: a,
                                    page: i,
                                    featuredGames: n,
                                    newGames: c,
                                    processedNewGames: d,
                                    homepageCat: u
                                }), this.renderFooterTabs()]
                            })
                        })]
                    })
                }
                renderFooterTabs() {
                    const {
                        page: e,
                        sorting: t,
                        homepageText: s
                    } = this.props;
                    return 1 === e && "default" === t && s && (0, S.jsx)(xe.Z, {
                        label: (0, S.jsx)(n.cC, {
                            id: "common.aboutTitle"
                        }),
                        children: (0, S.jsx)("div", {
                            dangerouslySetInnerHTML: {
                                __html: s
                            }
                        })
                    })
                }
                getTitle() {
                    const {
                        sorting: e,
                        i18n: t,
                        page: s,
                        label: a
                    } = this.props;
                    if (a && a === u.VT) return `${t._({id:"games.hot.title"})} - CrazyGames`;
                    switch (e) {
                        case u.Fi:
                            return `${t._({id:"games.new.title"})} - CrazyGames`;
                        case u.sc:
                            return t._({
                                id: "common.head.title"
                            }, {
                                pageNumber: s
                            });
                        case u.BE:
                            return `${t._({id:"games.mostPlayed.title"})} - CrazyGames`;
                        case u.K6:
                            return `${t._({id:"games.updated.title"})} - CrazyGames`;
                        default:
                            return console.warn(`unexpected sorting ${e}`), t._({
                                id: "common.head.title"
                            }, {
                                pageNumber: s
                            })
                    }
                }
                getCanonical() {
                    const {
                        routeHelper: e,
                        sorting: t,
                        page: s
                    } = this.props;
                    switch (t) {
                        case u.Fi:
                            return e.newPageCanonical(s);
                        case u.sc:
                        case u.BE:
                            return e.homePageCanonical(s);
                        case u.K6:
                            return e.updatedPageCanonical(s);
                        default:
                            return console.warn(`unexpected sorting ${t}`), e.homePageCanonical(s)
                    }
                }
                getAlternatives() {
                    const {
                        routeHelper: e,
                        sorting: t,
                        page: s
                    } = this.props;
                    switch (t) {
                        case u.Fi:
                            return e.newPageAlternativeLinks(s);
                        case u.sc:
                        case u.BE:
                            return e.homePageAlternativeLinks(s);
                        case u.K6:
                            return e.updatedPageAlternativeLinks(s);
                        default:
                            return console.warn(`unexpected sorting ${t}`), e.homePageAlternativeLinks(s)
                    }
                }
            }
            var ze = (0, ye.Z)((0, c.Z)("games", "carousels")((0, fe.Z)(Ze)))
        },
        5337: function(e, t, s) {
            (window.__NEXT_P = window.__NEXT_P || []).push(["/games", function() {
                return s(87887)
            }])
        }
    },
    function(e) {
        e.O(0, [58254, 37164, 69157, 47638, 25151, 57625, 49774, 92888, 40179], (function() {
            return t = 5337, e(e.s = t);
            var t
        }));
        var t = e.O();
        _N_E = t
    }
]);