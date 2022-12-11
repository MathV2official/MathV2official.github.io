"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [25151], {
        17519: function(e, t, i) {
            i.d(t, {
                Z: function() {
                    return C
                }
            });
            var r = i(59499),
                o = i(67294),
                s = i(81719),
                n = i(27444),
                c = i(85893);

            function l(e, t) {
                var i = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), i.push.apply(i, r)
                }
                return i
            }

            function a(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? l(Object(i), !0).forEach((function(t) {
                        (0, r.Z)(e, t, i[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : l(Object(i)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
                    }))
                }
                return e
            }
            var h = o.memo((e => (0, c.jsxs)(n.Z, a(a({}, e), {}, {
                viewBox: "0 0 24 24",
                children: [(0, c.jsx)("path", {
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    d: "M3.25757 2.33007C3.62757 1.92005 4.2599 1.88759 4.66993 2.25759L12.9814 9.75759C14.3395 10.9831 14.3395 13.0169 12.9814 14.2424L4.66993 21.7424C4.2599 22.1124 3.62757 22.08 3.25757 21.6699C2.88758 21.2599 2.92003 20.6276 3.33006 20.2576L11.6415 12.7576C12.1195 12.3263 12.1195 11.6737 11.6415 11.2424L3.33006 3.74243C2.92003 3.37243 2.88758 2.7401 3.25757 2.33007Z"
                }), (0, c.jsx)("path", {
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    d: "M11.2576 2.33007C11.6276 1.92005 12.2599 1.88759 12.6699 2.25759L20.9814 9.75759C22.3395 10.9831 22.3395 13.0169 20.9814 14.2424L12.6699 21.7424C12.2599 22.1124 11.6276 22.08 11.2576 21.6699C10.8876 21.2599 10.92 20.6276 11.3301 20.2576L19.6415 12.7576C20.1195 12.3263 20.1195 11.6737 19.6415 11.2424L11.3301 3.74243C10.92 3.37243 10.8876 2.7401 11.2576 2.33007Z"
                })]
            }))));

            function u(e, t) {
                var i = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), i.push.apply(i, r)
                }
                return i
            }

            function d(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? u(Object(i), !0).forEach((function(t) {
                        (0, r.Z)(e, t, i[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : u(Object(i)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
                    }))
                }
                return e
            }
            const p = (0, s.ZP)("div")((() => ({
                    position: "relative",
                    overflowY: "hidden",
                    zIndex: 2,
                    "@media (hover: hover)": {
                        "&:hover": {
                            "& .arrow": {
                                opacity: 1
                            }
                        }
                    }
                }))),
                f = (0, s.ZP)("ul")((e => {
                    let {
                        theme: {
                            spacing: t
                        }
                    } = e;
                    return {
                        marginBlockEnd: 0,
                        padding: t(1),
                        paddingBottom: t(1.5),
                        overflow: "hidden",
                        overflowX: "scroll",
                        width: "100%",
                        whiteSpace: "nowrap",
                        listStyle: "none",
                        transform: "translateZ(0)",
                        scrollPadding: "50px 50px 50px 50px",
                        "&::-webkit-scrollbar": {
                            display: "none"
                        },
                        msOverflowStyle: "none",
                        scrollbarWidth: "none",
                        margin: 0,
                        "& li.primeCarouselLi": {
                            listStyle: "none",
                            display: "inline-block",
                            boxSizing: "border-box",
                            scrollSnapAlign: "center",
                            verticalAlign: "middle",
                            position: "relative"
                        }
                    }
                })),
                b = (0, s.ZP)("button", {
                    shouldForwardProp: e => "direction" !== e
                })((e => {
                    let {
                        theme: {
                            spacing: t,
                            dimensions: i
                        },
                        direction: r
                    } = e;
                    return d(d({
                        height: `calc(${i.gameThumb.height}px + ${t(.5)})`,
                        top: 14,
                        backgroundPosition: "50%",
                        backgroundRepeat: "no-repeat",
                        width: "50px",
                        color: "transparent",
                        border: 0,
                        position: "absolute",
                        zIndex: 1,
                        outlineColor: "initial",
                        outlineStyle: "none",
                        outlineWidth: 0,
                        opacity: 0,
                        borderRadius: 0,
                        transition: "opacity .25s ease,background-color .25s ease",
                        backgroundColor: "rgba(0,0,0,.7)",
                        "&:hover": {
                            backgroundColor: "rgba(0,0,0,.9)",
                            cursor: "pointer"
                        }
                    }, "right" === r && {
                        backgroundImage: "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE0Ljc2MyAxNy4yMzd2LTIuNDc0bC0xNCAxNGExLjc0OCAxLjc0OCAwIDAwMCAyLjQ3NGMuNjgzLjY4NCAxLjc5LjY4NCAyLjQ3NCAwbDE0LTE0YTEuNzQ4IDEuNzQ4IDAgMDAwLTIuNDc0bC0xNC0xNEExLjc1IDEuNzUgMCAwMC43NjMgMy4yMzdsMTQgMTR6IiBmaWxsPSIjRUZGMUYxIi8+PC9zdmc+)",
                        right: "0px /*! @noflip */"
                    }), "left" === r && {
                        backgroundImage: "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTMuMjM3IDE3LjIzN3YtMi40NzRsMTQgMTRjLjY4NC42ODMuNjg0IDEuNzkgMCAyLjQ3NGExLjc0OCAxLjc0OCAwIDAxLTIuNDc0IDBsLTE0LTE0YTEuNzQ4IDEuNzQ4IDAgMDEwLTIuNDc0bDE0LTE0YTEuNzQ4IDEuNzQ4IDAgMDEyLjQ3NCAwYy42ODQuNjgzLjY4NCAxLjc5IDAgMi40NzRsLTE0IDE0eiIgZmlsbD0iI0VGRjFGMSIvPjwvc3ZnPg==)",
                        left: "0px /*! @noflip */"
                    })
                })),
                g = (0, s.ZP)(h)({
                    position: "absolute",
                    right: 8,
                    top: 0,
                    width: 15,
                    zIndex: 3
                });
            var v = i(40181),
                y = i(87835),
                j = i(40480),
                O = i(72461);
            var m;
            ! function(e) {
                e.left = "left", e.right = "right"
            }(m || (m = {}));
            class w extends o.Component {
                constructor(e) {
                    super(e), (0, r.Z)(this, "carouselRef", void 0), (0, r.Z)(this, "sentinelRef", void 0), (0, r.Z)(this, "lastSentinel", void 0), (0, r.Z)(this, "io", void 0), (0, r.Z)(this, "firstChild", void 0), (0, r.Z)(this, "lastChild", void 0), (0, r.Z)(this, "needsRTL", void 0), (0, r.Z)(this, "moveToClickEvent", (e => {
                        const {
                            deviceType: t,
                            elementWidth: i
                        } = this.props, r = this.carouselRef.current;
                        if (!r) return;
                        const o = t.isDesktop ? this.props.theme.dimensions.sidebar.width : 0,
                            s = r.offsetWidth - o,
                            n = r.scrollLeft + ("left" === e ? -s : s),
                            c = n - n % (i || 178);
                        this.moveTo(c)
                    })), (0, r.Z)(this, "resizeEvent", (() => {
                        const {
                            debounce: e
                        } = this.state;
                        if (!e) {
                            window.clearTimeout(e);
                            const t = setTimeout((() => {
                                this.setState({
                                    debounce: !1
                                })
                            }), this.props.scrollDebounceMilliseconds);
                            this.setState({
                                debounce: t
                            })
                        }
                    })), (0, r.Z)(this, "moveLeft", (() => {
                        this.moveToClickEvent(m.left)
                    })), (0, r.Z)(this, "moveRight", (() => {
                        this.moveToClickEvent(m.right)
                    })), this.needsRTL = (0, j.oN)(e.locale), this.state = {
                        showLeftButton: !1,
                        showRightButton: !0,
                        debounce: !1
                    }, this.carouselRef = o.createRef(), this.sentinelRef = o.createRef()
                }
                componentDidMount() {
                    window.addEventListener("resize", this.resizeEvent), this.observeChildren()
                }
                componentWillUnmount() {
                    this.io && this.io.disconnect(), this.io = null, window.removeEventListener("resize", this.resizeEvent)
                }
                componentDidUpdate(e) {
                    e.children !== this.props.children && this.observeChildren()
                }
                render() {
                    const {
                        onMouseEnter: e,
                        onMouseLeave: t,
                        deviceType: i
                    } = this.props;
                    return (0, c.jsxs)(c.Fragment, {
                        children: [!i.isDesktop && (0, c.jsx)(g, {
                            onClick: this.moveRight
                        }), (0, c.jsxs)(p, {
                            className: "prime-carousel",
                            onMouseEnter: e,
                            onMouseLeave: t,
                            children: [i.isDesktop && this.state.showLeftButton && (0, c.jsx)(b, {
                                onClick: this.moveLeft,
                                className: "arrow",
                                direction: "left",
                                "aria-label": "Left arrow"
                            }), (0, c.jsx)(f, {
                                className: "prime-carousel-container",
                                ref: this.carouselRef,
                                children: this.renderChildren()
                            }), i.isDesktop && this.state.showRightButton && (0, c.jsx)(b, {
                                onClick: this.moveRight,
                                className: "arrow",
                                direction: "right",
                                "aria-label": "Right arrow"
                            })]
                        })]
                    })
                }
                renderChildren() {
                    const {
                        requestDataThreshold: e,
                        requestData: t
                    } = this.props, i = o.Children.count(this.props.children), r = i - Math.min(i - 2, e);
                    return o.Children.map(this.props.children, ((e, i) => {
                        const o = t && r === i;
                        return (0, c.jsx)("li", {
                            className: "primeCarouselLi",
                            ref: o ? this.sentinelRef : void 0,
                            children: e
                        }, i)
                    }))
                }
                carouselScrollTo(e, t) {
                    const i = this.carouselRef.current;
                    i && i.scrollTo({
                        left: e,
                        behavior: t
                    })
                }
                setupIo() {
                    const e = this.carouselRef.current;
                    this.io = new IntersectionObserver((e => {
                        e.forEach((e => {
                            const t = e.isIntersecting,
                                {
                                    nextSibling: i,
                                    previousSibling: r
                                } = e.target;
                            if (!i && e.target === this.lastChild) {
                                const e = !t,
                                    i = this.needsRTL ? "showLeftButton" : "showRightButton";
                                if (e !== this.state[i]) {
                                    const t = {
                                        [i]: e
                                    };
                                    this.setState(t)
                                }
                            }
                            if (!r && e.target === this.firstChild) {
                                const e = !t,
                                    i = this.needsRTL ? "showRightButton" : "showLeftButton";
                                if (e !== this.state[i]) {
                                    const t = {
                                        [i]: e
                                    };
                                    this.setState(t)
                                }
                            }
                            if (i && r && t) {
                                const {
                                    requestData: e
                                } = this.props;
                                e && e()
                            }
                        }))
                    }), {
                        root: e,
                        threshold: [0, .98]
                    })
                }
                observeChildren() {
                    if (this.io || this.setupIo(), this.io) {
                        const e = this.sentinelRef.current,
                            t = this.carouselRef.current;
                        if (this.props.deviceType.isDesktop) {
                            const e = t.parentElement.querySelector("ul > li:first-child"),
                                i = t.parentElement.querySelector("ul > li:last-child");
                            this.lastChild && this.lastChild !== i && this.io.unobserve(this.lastChild), i && (this.io.observe(i), this.lastChild = i), this.firstChild && this.firstChild !== e && this.io.unobserve(this.firstChild), e && (this.io.observe(e), this.firstChild = e)
                        }
                        this.lastSentinel && e !== this.lastSentinel && this.io.unobserve(this.lastSentinel), e && (this.io.observe(e), this.lastSentinel = e)
                    }
                }
                moveTo(e) {
                    this.carouselRef.current && window.setTimeout((() => {
                        this.carouselScrollTo(e, "smooth")
                    }), this.props.scrollDelayMilliseconds)
                }
            }(0, r.Z)(w, "defaultProps", {
                scrollDelayMilliseconds: 10,
                scrollDebounceMilliseconds: 100,
                scrollInterval: 650,
                requestDataThreshold: 3
            });
            var C = (0, y.Z)((0, v.Z)((0, O.Z)(w)))
        },
        50645: function(e, t, i) {
            var r = i(59499),
                o = i(67294),
                s = i(90335),
                n = i(34386),
                c = i(47638),
                l = i(85893);

            function a(e, t) {
                var i = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), i.push.apply(i, r)
                }
                return i
            }

            function h(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? a(Object(i), !0).forEach((function(t) {
                        (0, r.Z)(e, t, i[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : a(Object(i)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
                    }))
                }
                return e
            }
            t.Z = e => {
                let {
                    games: t,
                    justifyContent: i,
                    slidesToLoadEagerly: r,
                    preventZoom: a,
                    contentVisibility: u,
                    containIntrinsicSize: d,
                    customStyles: p,
                    transformOrigin: f,
                    thumbIconFn: b,
                    thumbIcon: g,
                    isResponsive: v,
                    isResponsiveGrid: y,
                    imgResponsiveSizes: j,
                    sx: O
                } = e;
                const {
                    crazyAnalyticsService: m
                } = o.useContext(n.Z).services;
                return (0, l.jsx)(c.MM, {
                    contentVisibility: u,
                    containIntrinsicSize: d,
                    style: h(h({}, p), {}, {
                        justifyContent: i
                    }),
                    isResponsive: v,
                    sx: O,
                    children: t.map(((e, i) => e.loading ? (0, l.jsx)(s.Z, {}, e.slug) : (0, l.jsx)(c.oZ, {
                        game: e,
                        transformOrigin: f,
                        preventZoom: a,
                        eagerLoading: r ? i < r : void 0,
                        iconFn: b,
                        icon: g,
                        onClickAction: () => {
                            m.gameClickedFromList(t)
                        },
                        isResponsive: v,
                        isResponsiveGrid: y,
                        imgResponsiveSizes: j
                    }, e.slug)))
                })
            }
        },
        90335: function(e, t, i) {
            var r = i(59499),
                o = i(67294),
                s = i(91655),
                n = i(52261),
                c = i(62097),
                l = i(85893);

            function a(e, t) {
                var i = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), i.push.apply(i, r)
                }
                return i
            }

            function h(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? a(Object(i), !0).forEach((function(t) {
                        (0, r.Z)(e, t, i[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : a(Object(i)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
                    }))
                }
                return e
            }
            t.Z = e => {
                let {
                    isFeatured: t,
                    sx: i,
                    isResponsive: r
                } = e;
                const a = o.useContext(n.ZP).isDesktop,
                    u = (0, c.Z)().dimensions.gameThumb,
                    d = t ? u.featuredWidth : a ? u.width : u.mobileWidth,
                    p = t ? u.featuredHeight : u.height;
                return (0, l.jsx)(s.Z, {
                    sx: h({
                        position: "relative",
                        borderRadius: e => e.spacing()
                    }, i),
                    variant: "rectangular",
                    width: r ? "100%" : d,
                    height: r ? "100%" : p,
                    className: "skeleton"
                })
            }
        },
        40181: function(e, t, i) {
            var r = i(59499),
                o = i(67294),
                s = i(52261),
                n = i(85893);

            function c(e, t) {
                var i = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), i.push.apply(i, r)
                }
                return i
            }
            t.Z = function(e) {
                return t => {
                    const i = o.useContext(s.ZP);
                    return (0, n.jsx)(e, function(e) {
                        for (var t = 1; t < arguments.length; t++) {
                            var i = null != arguments[t] ? arguments[t] : {};
                            t % 2 ? c(Object(i), !0).forEach((function(t) {
                                (0, r.Z)(e, t, i[t])
                            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : c(Object(i)).forEach((function(t) {
                                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
                            }))
                        }
                        return e
                    }({
                        deviceType: i
                    }, t))
                }
            }
        }
    }
]);