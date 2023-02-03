var __extends = this && this.__extends ||
function() {
    var e = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array &&
    function(e, t) {
        e.__proto__ = t
    } ||
    function(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
    };
    return function(t, i) {
        function a() {
            this.constructor = t
        }
        e(t, i),
        t.prototype = null === i ? Object.create(i) : (a.prototype = i.prototype, new a)
    }
} (); !
function() {
    function e(t, i, a) {
        function o(l, s) {
            if (!i[l]) {
                if (!t[l]) {
                    var r = "function" == typeof require && require;
                    if (!s && r) return r(l, !0);
                    if (n) return n(l, !0);
                    var p = new Error("Cannot find module '" + l + "'");
                    throw p.code = "MODULE_NOT_FOUND",
                    p
                }
                var d = i[l] = {
                    exports: {}
                };
                t[l][0].call(d.exports,
                function(e) {
                    var i = t[l][1][e];
                    return o(i || e)
                },
                d, d.exports, e, t, i, a)
            }
            return i[l].exports
        }
        for (var n = "function" == typeof require && require,
        l = 0; l < a.length; l++) o(a[l]);
        return o
    }
    return e
} ()({
    1 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
            function e() {}
            return e.init = function() {
                Laya.ClassUtils.regClass
            },
            e.width = 750,
            e.height = 1334,
            e.scaleMode = window.isPhone&&!window.isSmallWin?"fixedwidth":"showall",
            e.screenMode = "none",
            e.alignV = "middle",
            e.alignH = "center",
            e.startScene = "GetNewDialog.scene",
            e.sceneRoot = "",
            e.debug = !1,
            e.stat = !0,
            e.physicsDebug = !1,
            e.exportSceneToJson = !0,
            e
        } ();
        i["default"] = a,
        a.init()
    },
    {}],
    2 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("./GameConfig"),
        o = e("./myscript/manager/PannelMgr"),
        n = e("./myscript/model/Global"),
        l = e("./myscript/manager/LoadMgr"),
        s = e("./myscript/utils/EventHelper"),
        r = e("./myscript/manager/GameMgr"),
        p = e("./myscript/manager/WxApiMgr"),
        d = function() {
            function e() {
                window.ystorage = Laya.LocalStorage;
                window.Laya3D ? Laya3D.init(a["default"].width, a["default"].height) : Laya.init(a["default"].width, a["default"].height, Laya.WebGL),
                Laya.Physics && Laya.Physics.enable(),
                Laya.DebugPanel && Laya.DebugPanel.enable(),
                Laya.stage.scaleMode = a["default"].scaleMode,
                Laya.stage.screenMode = a["default"].screenMode,
                Laya.URL.exportSceneToJson = a["default"].exportSceneToJson,
                (a["default"].debug || "true" == Laya.Utils.getQueryString("debug")) && Laya.enableDebugPanel(),
                a["default"].physicsDebug && Laya.PhysicsDebugDraw && Laya.PhysicsDebugDraw.enable(),
                Laya.alertGlobalError = !0,
                Laya.MouseManager.multiTouchEnabled = !1,
                Laya.stage.alignV = "middle",
                Laya.stage.alignH = "center",
                Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION)
            }
            return e.prototype.onVersionLoaded = function() {
				setTimeout(function(){
                            my.i(() => {});
                        }, 500);
                Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded))
		my.init({
                 gamemonetizeId: "kj4is09ju6dx2gd2liij0bp4zchsryez",
                 complete: () => {
          console.log('gamemonetizeId');
	}
	         })				
            },
            e.prototype.onConfigLoaded = function() {
                r["default"].Instance.init(),
                UIConfig.closeDialogOnSide = !1,
                o["default"].init(),
                o["default"].instance.showPanel(n["default"].PanelName.LogoPanel),
                p["default"].init(),
                this.loadConfigs()
            },
            e.prototype.loadConfigs = function() {
                s.EventHelper.register(n["default"].CUSTOMEVENT.LoadComplete, this.loadComplete, this),
                l.LoadMgr.loadLocalSource()
            },
            e.prototype.loadComplete = function() {
                s.EventHelper.remove(n["default"].CUSTOMEVENT.LoadComplete, this.loadComplete, this),
                r["default"].Instance.initGift(),
                this.hideLogoPanel()
            },
            e.prototype.hideLogoPanel = function() {
                o["default"].instance.hidePanel(n["default"].PanelName.LogoPanel),
                r["default"].Instance.onStart()
            },
            e
        } ();
        new d
    },
    {
        "./GameConfig": 1,
        "./myscript/manager/GameMgr": 7,
        "./myscript/manager/LoadMgr": 8,
        "./myscript/manager/PannelMgr": 9,
        "./myscript/manager/WxApiMgr": 13,
        "./myscript/model/Global": 15,
        "./myscript/utils/EventHelper": 25
    }],
    3 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("./PanelBaseController"),
        o = e("../view/Panel/LogoPanel"),
        n = function(e) {
            function t(t) {
                return e.call(this, t) || this
            }
            return __extends(t, e),
            t.prototype.init = function() {
                e.prototype.init.call(this);
                var t = this;
                t.panel = new o["default"],
                t.panel.x = .5 * (Laya.stage.width - this.panel.width)
            },
            t.prototype.onClose = function() {
                e.prototype.onClose.call(this)
            },
            t
        } (a["default"]);
        i["default"] = n
    },
    {
        "../view/Panel/LogoPanel": 47,
        "./PanelBaseController": 4
    }],
    4 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
            function e(e) {
                this.panelName = e,
                this.init()
            }
            return e.prototype.init = function() {},
            e.prototype.onClose = function() {
                this.panel.close(),
                this.panel = null
            },
            e
        } ();
        i["default"] = a
    },
    {}],
    5 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../manager/PoolMgr"),
        o = e("./LZ"),
        n = e("../model/Global"),
        l = e("../manager/GameMgr"),
        s = function(e) {
            function t() {
                var t = e.call(this) || this;
                return t.stayTime = 0,
                t.num = 15,
                t.gravity = .8,
                t.gnum = 0,
                t.gnumAdd = 1.5,
                t.rotat = 10,
                t.startSpeed = .08,
                t.speed = 1,
                t.speedMinus = .01,
                t.speedMinusMin = .5,
                t.bomDist = 800,
                t.tdis = 40,
                t
            }
            return __extends(t, e),
            t.prototype.init = function(e, i, l, s) {
                void 0 === l && (l = 1),
                void 0 === s && (s = 0),
                this.stayTime = 0,
                this.gravity = .8,
                this.gnum = 0,
                this.bomDist = 500,
                this.tdis = 20,
                this.startSpeed = .05,
                this.speed = 1,
                this.type = l,
                1 == l ? (this.num = 15, this.rotat = 10, this.gnumAdd = 1.5, this.speedMinus = .01) : 2 == l && (this.num = 15, this.rotat = 10, this.gnumAdd = .6, this.speedMinus = .02);
                for (var r = 0; r < this.num; r++) {
                    var p = void 0;
                    1 == l ? p = a.PoolMgr.getItem(n["default"].POOLNAME.BatteryBoom) : 2 == l && (p = a.PoolMgr.getItem(n["default"].POOLNAME.BlockBoom)),
                    p || (p = new o["default"](l), 1 == l && (p.img.width = 38, p.img.height = 38));
                    var d = 1;
                    switch (1 == l && (d = 1 * Math.random() + .2), p.img.pivotX = .5 * p.img.width, p.img.pivotY = .5 * p.img.height, p.scaleX = d, p.scaleY = d, p.x = e.x, p.y = e.y, this.addChild(p), i) {
                    case t.TO_LEFT:
                        p.tp = new Laya.Point(e.x - Math.random() * this.bomDist + this.tdis, e.y + Math.random() * this.bomDist - .5 * this.bomDist);
                        break;
                    case t.TO_TOP:
                        p.tp = new Laya.Point(e.x + Math.random() * this.bomDist - .5 * this.bomDist, e.y + Math.random() * this.bomDist - this.tdis);
                        break;
                    case t.TO_DOWN:
                        p.tp = new Laya.Point(e.x + Math.random() * this.bomDist - .5 * this.bomDist, e.y - Math.random() * this.bomDist + this.tdis);
                        break;
                    case t.TO_RIGHT:
                        p.tp = new Laya.Point(e.x + Math.random() * this.bomDist - this.tdis, e.y + Math.random() * this.bomDist - .5 * this.bomDist);
                        break;
                    case t.TO_NONE:
                        var u = 2 * Math.random() * Math.PI,
                        g = Math.random() * this.bomDist;
                        p.tp = new Laya.Point(e.x + g * Math.cos(u), e.y + g * Math.sin(u))
                    }
                }
                1 == l ? Laya.timer.frameLoop(1, this, this.update) : 2 == l && this.test()
            },
            t.prototype.test = function() {
                var e = this,
                t = 1;
                this._children.forEach(function(i) {
                    var o = Math.floor(21 * Math.random() - 10);
                    e.gnum += o,
                    e.stayTime++,
                    e.speed > e.speedMinusMin && (e.speed -= e.speedMinus);
                    var s = i;
                    s.img.rotation += e.rotat,
                    s.alpha = 1;
                    var r = l["default"].Instance.LevelLayer.text_gold.x + l["default"].Instance.LevelLayer.sp_gold.x - 30,
                    p = l["default"].Instance.LevelLayer.sp_gold.y + l["default"].Instance.LevelLayer.text_gold.height + 5,
                    d = 25 * Math.random() - 12,
                    u = 25 * Math.random() - 12;
                    Laya.timer.once(60, e,
                    function() {
                        Laya.TimeLine.to(s, {
                            x: s.x + (s.tp.x - s.x) * this.startSpeed * this.speed * o,
                            y: s.y + (s.tp.y - s.y) * this.startSpeed * this.speed * o
                        },
                        20 * t).to(s, {
                            x: r + d,
                            y: p + u,
                            alpha: .2
                        },
                        50 * t, null, 80).play(0, !1),
                        Laya.timer.once(1200, this,
                        function() {
                            a.PoolMgr.recover(n["default"].POOLNAME.BlockBoom, s)
                        }),
                        t++
                    })
                }),
                Laya.timer.once(1300, this,
                function() {
                    Laya.timer.clear(this, this.update),
                    this.removeChildren(),
                    this.removeSelf(),
                    a.PoolMgr.recover(n["default"].POOLNAME.BombLZ, this)
                })
            },
            t.prototype.update = function() {
                var e = this;
                this.gnum += this.gnumAdd,
                this.stayTime++,
                this.speed > this.speedMinusMin && (this.speed -= this.speedMinus),
                this._children.forEach(function(t) {
                    var i = t;
                    i.x += (i.tp.x - i.x) * e.startSpeed * e.speed,
                    i.y += (i.tp.y - i.y) * e.startSpeed * e.speed,
                    i.img.rotation += e.rotat,
                    e.stayTime > 60 && (1 == e.type ? a.PoolMgr.recover(n["default"].POOLNAME.BatteryBoom, i) : 2 == e.type && a.PoolMgr.recover(n["default"].POOLNAME.BlockBoom, i))
                }),
                this.stayTime > 60 && (Laya.timer.clear(this, this.update), this.removeChildren(), this.removeSelf(), a.PoolMgr.recover(n["default"].POOLNAME.BombLZ, this))
            },
            t.TO_LEFT = 1,
            t.TO_TOP = 2,
            t.TO_RIGHT = 3,
            t.TO_DOWN = 4,
            t.TO_NONE = 5,
            t
        } (Laya.Sprite);
        i["default"] = s
    },
    {
        "../manager/GameMgr": 7,
        "../manager/PoolMgr": 10,
        "../model/Global": 15,
        "./LZ": 6
    }],
    6 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../model/Global"),
        o = function(e) {
            function t(t) {
                void 0 === t && (t = 1);
                var i = e.call(this) || this;
                return i.init(t),
                i
            }
            return __extends(t, e),
            t.prototype.init = function(e) {
                1 == e ? (this.img = new Laya.Image(a["default"].BulletUrl + "bullet1.png"), this.img.width = 54, this.img.height = 54) : 2 == e && (this.img = new Laya.Image(a["default"].PanelUrl + "mainUi_money.png"), this.img.width = 30, this.img.height = 30),
                this.addChild(this.img)
            },
            t
        } (Laya.Sprite);
        i["default"] = o
    },
    {
        "../model/Global": 15
    }],
    7 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../model/Player"),
        o = e("../model/Global"),
        n = e("../manager/WxApiMgr"),
        l = e("../utils/EventHelper"),
        s = e("./RoleMgr"),
        r = e("./PoolMgr"),
        p = e("../model/MapData"),
        d = e("../utils/Utils"),
        u = e("../view/Panel/ComposePanel"),
        g = e("../utils/TextUtils"),
        h = e("../view/Panel/FailUI"),
        c = e("../view/Panel/LevelPanel"),
        f = e("../view/Dialog/OfflineDialog"),
        m = e("../utils/Guide"),
        y = e("../object/Block"),
        v = e("../object/BigBlock"),
        I = e("../view/Panel/TipPanel"),
        b = e("../utils/FailGuide"),
        x = e("../model/GiftData"),
        L = e("../view/Panel/GiftPanel"),
        _ = e("../utils/GiftPackage"),
        S = function() {
            function e() {
                this.bgImg = new Laya.Sprite,
                this.cloudArr = new Array,
                this.showCurLevel = new Laya.Sprite,
                this.text_curLevel = new Laya.Text,
                this.batteryArr = [],
                this.bulletArr = [],
                this.blockArr = [],
                this.posArr = [],
                this.lineIndex = 0,
                this.fullLineArr = [],
                this.blockDis = 5,
                this.blockMove = 0,
                this.failState = !1,
                this.successState = !1,
                this.curLevelNoLine = 0,
                this.curLevelNoLineAdd = 0,
                this.difficultyFactor = 500,
                this.blockRadius = 44,
                this.blockHurtOff = 0,
                this.curLevel = 1,
                this.lastLevel = 1,
                this.batteryPos = ["0", "0", "0", "0", "0"],
                this.cannonPos = ["1", "1", "1", "0", "0", "0", "0", "0", "0", "0"],
                this.autoSynthesisFrame = 0,
                this.pouseGame = !1,
                this.techBatteryLevel = 0,
                this.techBulletAttack = 0,
                this.techOffLineSpeed = 0,
                this.offlineGold = 0,
                this.bulletSoundSpanAdd = 0,
                this.hasShowOffline = !1,
                this.killBlockNum = 0,
                this.killRedBlockNum = 0,
                this.refreshFightingTimer = new Laya.Timer
            }
            return Object.defineProperty(e, "Instance", {
                get: function() {
                    return null == e.instance && (e.instance = new e),
                    e.instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.init = function() {
                var e = this;
                e.bgLayer = new Laya.Image,
                e.bgLayer.skin = o["default"].PanelUrl + "mainUi_di_7.png",
                e.bgLayer.height = Laya.stage.height,
                e.bgLayer.sizeGrid = "12,11,17,9",
                e.bulletLayer = new Laya.Sprite,
                e.bulletLayer.height = Laya.stage.height,
                e.gameLayer = new Laya.Sprite,
                e.gameLayer.height = Laya.stage.height,
                e.gameLayer.width = 750 * Laya.stage.height / 1334,
                e.bgLayer.width = 750 * Laya.stage.height / 1334,
                e.bulletLayer.width = 750 * Laya.stage.height / 1334,
                e.bgLayer.x = e.bulletLayer.x = e.gameLayer.x = .5 * (Laya.stage.width - e.gameLayer.width),
                e.gameLayer.mouseEnabled = !0,
                Laya.stage.addChild(e.bgLayer),
                Laya.stage.addChild(e.bulletLayer),
                Laya.stage.addChild(e.gameLayer),
                e.initPool(),
                e.initLocalData(),
                l.EventHelper.register(o["default"].CUSTOMEVENT.LoadVideoComplete, this.onLoadVideoComplete, this)
            },
            e.prototype.initGift = function() {
                this.giftPanel = new L["default"],
                this.giftPanel.x = .5 * (Laya.stage.width - this.giftPanel.width),
                this.giftPackage = new _["default"]
            },
            e.prototype.onLogin = function(e) {
                a["default"].Instance.setUserData(e.data)
            },
            e.prototype.initPool = function() {},
            e.prototype.initLocalData = function() {
                var e = window.ystorage.getItem(o["default"].LocalStorage.curLevel);
                e && (this.curLevel = Number(e)),
                0 == this.curLevel && (this.curLevel = 1),
                console.log("this.curLevel   ", this.curLevel);
                var t = window.ystorage.getItem(o["default"].LocalStorage.user_maxLevel);
                t && (a["default"].Instance.maxLevel = Number(t));
                var i = window.ystorage.getItem(o["default"].LocalStorage.batteryPos);
                i && (this.batteryPos = i.split(",")),
                i = window.ystorage.getItem(o["default"].LocalStorage.CannonPos),
                i && (this.cannonPos = i.split(",")),
                console.log("缓存炮台： ", this.batteryPos, this.cannonPos);
                var n = window.ystorage.getItem(o["default"].LocalStorage.user_gold);
                n && (a["default"].Instance.gold = Number(n));
                var l = (new Date).getMonth() + 1,
                s = (new Date).getDate();
                if (window.ystorage.getItem(o["default"].LocalStorage.getGold_num)) {
                    var r = JSON.parse(window.ystorage.getItem(o["default"].LocalStorage.getGold_num));
                    l == r.mon && s == r.day ? a["default"].Instance.todayGetGoldNum = r.num: this.getGoldNumLocalData()
                } else this.getGoldNumLocalData();
                var p = window.ystorage.getItem(o["default"].LocalStorage.techLevel);
                p && (a["default"].Instance.techLevelArr = p.split(","));
                var d = window.ystorage.getItem(o["default"].LocalStorage.offLineTime);
                if (d) {
                    var u = new Date,
                    g = (u.getTime() - Number(d)) / 6e4;
                    g > 1440 && (g = 1440),
                    this.offlineGold = Math.floor(g)
                }
                Laya.timer.loop(6e4, this, this.saveOfflineTime);
                var h = window.ystorage.getItem(o["default"].LocalStorage.guide);
                h && (a["default"].Instance.showGuide = Number(h), 2 == a["default"].Instance.showGuide && (a["default"].Instance.guideStop = !0));
                var c = window.ystorage.getItem(o["default"].LocalStorage.giftEquip);
                c && (a["default"].Instance.giftEquipArr = c.split(","));
                var f = window.ystorage.getItem(o["default"].LocalStorage.giftEquipEffect);
                f && (a["default"].Instance.giftEffectEquipArr = f.split(","), a["default"].Instance.setGiftData());
                var m = window.ystorage.getItem(o["default"].LocalStorage.giftBag);
                m && (a["default"].Instance.giftBagArr = m.split(","));
                var y = window.ystorage.getItem(o["default"].LocalStorage.giftBagEffect);
                y && (a["default"].Instance.giftEffectBagArr = y.split(","))
            },
            e.prototype.saveOfflineTime = function() {
                var e = new Date;
                window.ystorage.setItem(o["default"].LocalStorage.offLineTime, e.getTime().toString())
            },
            e.prototype.getGoldNumLocalData = function() {
                var e = (new Date).getMonth() + 1,
                t = (new Date).getDate(),
                i = {
                    mon: e,
                    dat: t,
                    num: a["default"].Instance.todayGetGoldNum
                };
                window.ystorage.setItem(o["default"].LocalStorage.getGold_num, JSON.stringify(i))
            },
            e.prototype.refreshTechData = function() {
                this.techBatteryLevel = Number(a["default"].Instance.techLevelArr[0]);
                var t = p["default"].UpgradeDic.getValue(Number(a["default"].Instance.techLevelArr[1]));
                this.techBulletAttack = .01 * t.fire_effect,
                t = p["default"].UpgradeDic.getValue(Number(a["default"].Instance.techLevelArr[2])),
                this.techOffLineSpeed = .01 * t.outline_effect,
                e.Instance.ComposeLayer && e.Instance.ComposeLayer.updateCreate(),
                e.Instance.LevelLayer && e.Instance.LevelLayer.updateGold(),
                this.refreshFightingCapacity()
            },
            e.prototype.checkVersion = function() {
                return o["default"].Version_line == o["default"].Version
            },
            e.prototype.showBanner = function() {
                if (this.checkVersion()) return ! 1;
                var e = Math.random();
                return e < o["default"].showBanner ? !0 : !1
            },
            e.prototype.onLoadVideoComplete = function() {
                l.EventHelper.remove(o["default"].CUSTOMEVENT.LoadVideoComplete, this.onLoadVideoComplete, this),
                this.showOfflineDialog()
            },
            e.prototype.showOfflineDialog = function() {
                if (!this.hasShowOffline && (this.hasShowOffline = !0, this.offlineGold >= 1)) {
                    var e = new f["default"];
                    e.popup()
                }
            },
            e.prototype.onStart = function() {
                this.refreshTechData(),
                this.ComposeLayer = new u["default"],
                this.ComposeLayer.imgWarn.visible = !1,
                Laya.stage.addChild(this.ComposeLayer),
                this.ComposeLayer.x = .5 * (Laya.stage.width - this.ComposeLayer.width),
                this.ComposeLayer.y = Laya.stage.height - this.ComposeLayer.height,
                this.LevelLayer = new c["default"],
                this.LevelLayer.x = .5 * (Laya.stage.width - this.LevelLayer.width),
                this.LevelLayer.y = 0,
                Laya.stage.addChild(this.LevelLayer),
                this.LevelLayer.mouseThrough = !0,
                Laya.stage.height > 1500 && (this.LevelLayer.y = 70, this.ComposeLayer.y -= 20),
                this.refreshFightingCapacity(),
                this.failUi = new h["default"],
                this.failUi.x = .5 * (Laya.stage.width - this.failUi.width),
                s["default"].Instance.init(),
                this.successState = !0,
                a["default"].Instance.showGuide <= 3 ? (this.guide = new m["default"], a["default"].Instance.showGuide <= 1 ? this.guide.nextStep() : this.failUi.startShow()) : this.failUi.startShow(),
                Laya.timer.frameLoop(1, this, this.onFrameLoop),
                this.failGuide = new b["default"],
                Laya.timer.once(2e3, this, this.showOfflineDialog)
            },
            e.prototype.nextLevel = function() {
                if (this.successState = !1, this.failState = !1, this.blockMove = 0, this.lineIndex = 0, this.posArr = [], 0 == this.curLevel && (this.curLevel = 1), this.curBlockLevelData = p["default"].BlockLevelDic.getValue(this.curLevel), this.curBlockLevelData && this.curBlockLevelData.boss) {
                    if (1 == this.curBlockLevelData.type) this.createBigLine();
                    else if (2 == this.curBlockLevelData.type) {
                        var e = this.curBlockLevelData.data.split(",");
                        this.curLevelRedChance = Number(e[0]),
                        this.curLevelNoLine = Number(e[1]),
                        this.curLevelNoLineAdd = 0,
                        this.createLine()
                    }
                } else this.createLine()
            },
            e.prototype.createLine = function() {
                var t;
                this.posArr[this.lineIndex] = [],
                this.hpSum = Math.floor(this.curBlockLevelData.difficultyFactor * (Math.random() * (1.05 - .95) + .95));
                var i = Math.floor(5 * Math.random() + 4),
                n = this.randomPos(i),
                l = this.redPackage(i),
                s = !1;
                2 == this.curBlockLevelData.type && (this.curLevelNoLineAdd >= this.curLevelNoLine ? (this.curLevelNoLineAdd = 0, s = !0) : (s = Math.random() <= this.curLevelRedChance ? !0 : !1, s ? this.curLevelNoLineAdd = 0 : this.curLevelNoLineAdd++));
                for (var p = 0; i > p; p++) {
                    t = r.PoolMgr.getItem(o["default"].POOLNAME.Block),
                    t || (t = new y["default"]),
                    s ? t.setSpColor("1") : t.setSpColor("0"),
                    t.x = t.radius + 2 * t.radius * n[p] + 5.1 * (n[p] + 1),
                    t.y = -t.radius;.5 * Math.random() + .5;
                    t.hp = l[p],
                    o["default"].halfDifficult_totalTime > 0 && (t.hp = Math.ceil(.5 * t.hp)),
                    t.gold = this.curBlockLevelData.gold,
                    t.text.text = d.utils.strShow(t.hp),
                    t.die = !1,
                    this.gameLayer.addChild(t),
                    this.blockArr.push(t),
                    t.line = this.lineIndex,
                    t.index = n[p],
                    this.posArr[this.lineIndex][n[p]] = t
                }
                8 == i && this.fullLineArr.push(this.lineIndex),
                this.lineIndex++,
                2 == this.curLevel && 2 == a["default"].Instance.showGuide && a["default"].Instance.guideStop && (this.successState = !0, e.Instance.guide.nextStep(), a["default"].Instance.guideStop = !1)
            },
            e.prototype.createBigLine = function() {
                var t;
                this.posArr[this.lineIndex] = [],
                this.hpSum = Math.floor(this.curBlockLevelData.difficultyFactor * (Math.random() * (1.05 - .95) + .95));
                for (var i = Math.floor(3 * Math.random() + 2), n = this.randomPos(i, 1), l = this.redPackage(i), s = 0; i > s; s++) {
                    t = r.PoolMgr.getItem(o["default"].POOLNAME.BigBlock),
                    t || (t = new v["default"]),
                    t.setSpColor(this.curBlockLevelData.data),
                    t.x = t.radius + 2 * t.radius * n[s] + 5.1 * (n[s] + 1),
                    t.y = -t.radius;.5 * Math.random() + .5;
                    t.hp = l[s],
                    o["default"].halfDifficult_totalTime > 0 && (t.hp = Math.ceil(.5 * t.hp)),
                    t.gold = this.curBlockLevelData.gold,
                    t.text.text = d.utils.strShow(t.hp),
                    t.die = !1,
                    this.gameLayer.addChild(t),
                    this.blockArr.push(t),
                    t.line = this.lineIndex,
                    t.index = n[s],
                    this.posArr[this.lineIndex][n[s]] = t
                }
                4 == i && this.fullLineArr.push(this.lineIndex),
                this.lineIndex++,
                2 == this.curLevel && 2 == a["default"].Instance.showGuide && a["default"].Instance.guideStop && (this.successState = !0, a["default"].Instance.guideStop = !1, e.Instance.guide.nextStep())
            },
            e.prototype.redPackage = function(e) {
                for (var t = 1,
                i = [], a = this.hpSum, o = 1; e > o; o++) {
                    var n = (a - (e - o) * t) / (e - o);
                    i[o] = Math.floor(Math.random() * (n - t + 1) + t),
                    a -= i[o]
                }
                return i[0] = a,
                i
            },
            e.prototype.randomPos = function(e, t) {
                void 0 === t && (t = 0);
                var i;
                0 == t ? i = [0, 1, 2, 3, 4, 5, 6, 7] : 1 == t && (i = [0, 1, 2, 3]);
                for (var a = [], o = 0; e > o; o++) {
                    var n = Math.floor(Math.random() * i.length);
                    a.push(i[n]),
                    i.splice(n, 1)
                }
                return a
            },
            e.prototype.checkNeibour = function(e, t, i) {
                switch (i) {
                case 1:
                    if (0 == t) return ! 0;
                    if (this.posArr[e] && null != this.posArr[e][t - 1]) return ! 0;
                    break;
                case 2:
                    if (this.posArr[e + 1] && null != this.posArr[e + 1][t]) return ! 0;
                    break;
                case 3:
                    if (7 == t) return ! 0;
                    if (this.posArr[e] && null != this.posArr[e][t + 1]) return ! 0;
                    break;
                case 4:
                    if (this.posArr[e - 1] && null != this.posArr[e - 1][t]) return ! 0
                }
                return ! 1
            },
            e.prototype.autoAttack = function(e) {
                for (var t, i, a, o = 0; o < this.batteryArr.length; o++) if (t = this.batteryArr[o]) {
                    if (t.target && this.posArr[t.target.line] && null != this.posArr[t.target.line][t.target.index]) t.targetDis = d.utils.dis(t.x, t.y + this.ComposeLayer.y + this.ComposeLayer.sp_box.y, t.target.x, t.target.y);
                    else {
                        for (var n = null,
                        l = 0,
                        s = 0; s < this.blockArr.length && (a = this.blockArr[s], !(this.fullLineArr.length > 0 && a.line > this.fullLineArr[0])); s++) if (null == n) n = a,
                        l = d.utils.dis(t.x, t.y + this.ComposeLayer.y + this.ComposeLayer.sp_box.y, n.x, n.y);
                        else {
                            var r = d.utils.dis(t.x, t.y + this.ComposeLayer.y + this.ComposeLayer.sp_box.y, a.x, a.y);
                            l > r && (l = r, n = a)
                        }
                        t.targetDis = l,
                        n && n.y + n.radius >= this.LevelLayer.height && (t.target = n)
                    }
                    if (null != t.target && t.target.y > 20) {
                        var p = t.target.x - t.x,
                        u = p / t.targetDis,
                        g = Math.asin(u),
                        h = Math.floor(180 * (g / Math.PI));
                        t.setRotate(h),
                        i = t.fireBullet()
                    }
                    null != i && (i.y = t.y + this.ComposeLayer.y + this.ComposeLayer.sp_box.y, this.bulletLayer.addChild(i), this.bulletArr.push(i), e++)
                }
                return e
            },
            e.prototype.targetAttack = function(e) {
                for (var t, i, a = 0; a < this.batteryArr.length; a++) {
                    t = this.batteryArr[a];
                    var o = d.utils.dis(this.ComposeLayer.x + t.x + this.ComposeLayer.sp_box.x, t.y + this.ComposeLayer.y + this.ComposeLayer.sp_box.y, s["default"].Instance.targetPos.x, s["default"].Instance.targetPos.y),
                    n = s["default"].Instance.targetPos.x - (this.ComposeLayer.x + t.x + this.ComposeLayer.sp_box.x),
                    l = n / o,
                    r = Math.asin(l),
                    p = Math.floor(180 * (r / Math.PI));
                    t.setRotate(p),
                    i = t.fireBullet(),
                    null != i && (i.y = t.y + this.ComposeLayer.y + this.ComposeLayer.sp_box.y, this.bulletLayer.addChild(i), this.bulletArr.push(i), e++)
                }
                return e
            },
            e.prototype.showNext = function(e) {
                var t = this;
                if (this.failUi.removeSelf(), this.failUi.mouseEnabled = !1, e) this.nextLevel();
                else {
                    for (var i = void 0,
                    a = 0; a < this.batteryArr.length; a++) i = this.batteryArr[a],
                    i.y = -300 - this.ComposeLayer.y,
                    i.visible = !0,
                    i.rotation = 0,
                    i.isRotate = !1,
                    i.target = null,
                    Laya.Tween.to(i, {
                        y: this.ComposeLayer.BatteryPosArr[a][1]
                    },
                    1e3);
                    setTimeout(function() {
                        t.nextLevel()
                    },
                    1500)
                }
            },
            e.prototype.onFrameLoop = function() {
                var t = this;
                if (!this.failState && !this.pouseGame) {
                    this.bulletSoundSpanAdd++;
                    var i, l, r = this.bulletArr.length;
                    if (!this.successState) {
                        for (var d = 0; d < this.blockArr.length; d++) l = this.blockArr[d],
                        l.move();
                        if (!e.Instance.curBlockLevelData) return;
                        e.Instance.curBlockLevelData.boss ? this.blockMove += e.Instance.curBlockLevelData.box_v * (1 - x["default"].bossBolckMove) : this.blockMove += e.Instance.curBlockLevelData.box_v * (1 + x["default"].blockMove);
                        var u = void 0;
                        u = 1 == this.curBlockLevelData.type ? 4 * this.blockRadius + 2 * this.blockDis: 2 * this.blockRadius + this.blockDis,
                        this.blockMove >= u && (this.blockMove = 0, this.lineIndex < this.curBlockLevelData.lines - 1 && (1 == this.curBlockLevelData.type ? this.createBigLine() : this.createLine()))
                    }
                    if (l = this.blockArr[0], l && this.ComposeLayer.y - l.y - 150 <= l.radius ? (this.ComposeLayer.imgWarn.visible = !0, this.ComposeLayer.imgWarn1.x += 3, this.ComposeLayer.imgWarn1.x > 750 && (this.ComposeLayer.imgWarn1.x = -747), this.ComposeLayer.imgWarn2.x += 3, this.ComposeLayer.imgWarn2.x > 750 && (this.ComposeLayer.imgWarn2.x = -747)) : this.ComposeLayer.imgWarn.visible = !1, l && this.ComposeLayer.y + this.ComposeLayer.imgWarn.y - l.y <= l.radius) {
                        this.failState = !0,
                        this.lastLevel = this.curLevel,
                        n["default"].Instance.aldSendEvent("关卡", {
                            "闯关": "失败，第" + e.Instance.curLevel + "关"
                        }),
                        this.curLevel--,
                        this.curLevel <= 0 && (this.curLevel = 1);
                        var g = p["default"].BlockLevelDic.getValue(this.curLevel);
                        g && g.boss && this.curLevel++,
                        window.ystorage.setItem(o["default"].LocalStorage.curLevel, this.curLevel.toString());
                        for (var h = void 0,
                        c = 0; c < this.batteryArr.length; c++) h = this.batteryArr[c],
                        h.failHide();
                        return setTimeout(function() {
                            g && t.failUi.showFail(g.boss),
                            t.failGuide.checkShowFailGuide()
                        },
                        1e3),
                        void setTimeout(function() {
                            for (var e, a = 0; a < t.blockArr.length; a++) e = t.blockArr[a],
                            e.clear(!1);
                            t.blockArr.splice(0),
                            t.posArr = [],
                            t.fullLineArr.splice(0);
                            for (var a = 0; r > a; a++) i = t.bulletArr[a],
                            i.clear();
                            t.bulletArr.splice(0),
                            t.ComposeLayer.imgWarn.visible = !1
                        },
                        2e3)
                    }
                    if (o["default"].isAutoSynthesis && (this.autoSynthesisFrame++, this.autoSynthesisFrame >= 60 && (this.autoSynthesisFrame = 0, o["default"].autoSynthesis_totalTime <= 0 ? (o["default"].autoSynthesis_totalTime = 0, o["default"].isAutoSynthesis = !1) : this.ComposeLayer.autoCompose())), this.successState) for (var h = void 0,
                    c = 0; c < this.batteryArr.length; c++) h = this.batteryArr[c],
                    h.target = null,
                    h.setRotate(0);
                    else r = s["default"].Instance.touchStatus && s["default"].Instance.clickPos.y < this.ComposeLayer.y + e.Instance.ComposeLayer.imgWarn.y ? this.targetAttack(r) : this.autoAttack(r);
                    for (var c = 0; r > c; c++) if (i = this.bulletArr[c], i.forward(), i.y > this.ComposeLayer.y + 200) i.clear(),
                    this.bulletArr.splice(c, 1),
                    r--;
                    else {
                        for (var u = 0,
                        f = 0,
                        m = 0,
                        y = !1,
                        v = !1,
                        I = this.blockArr.length,
                        d = 0; I > d && (l = this.blockArr[d], !(this.fullLineArr.length > 0 && l.line > this.fullLineArr[0])); d++) if (u = i.radius + l.radius + 10, f = Math.abs(i.x - l.x), m = Math.abs(i.y - l.y), u >= f && u >= m) {
                            y = !0,
                            v = m > f ? i.y > l.y ? this.checkNeibour(l.line, l.index, 4) ? i.x > l.x ? this.checkNeibour(l.line, l.index, 3) ? i.changeAngle(p.COLLISIONDIR.Back) : i.changeAngle(p.COLLISIONDIR.Left) : this.checkNeibour(l.line, l.index, 1) ? i.changeAngle(p.COLLISIONDIR.Back) : i.changeAngle(p.COLLISIONDIR.Right) : i.changeAngle(p.COLLISIONDIR.Top) : this.checkNeibour(l.line, l.index, 2) ? i.x > l.x ? this.checkNeibour(l.line, l.index, 3) ? i.changeAngle(p.COLLISIONDIR.Back) : i.changeAngle(p.COLLISIONDIR.Left) : this.checkNeibour(l.line, l.index, 1) ? i.changeAngle(p.COLLISIONDIR.Back) : i.changeAngle(p.COLLISIONDIR.Right) : i.changeAngle(p.COLLISIONDIR.Bottom) : i.x > l.x ? this.checkNeibour(l.line, l.index, 3) ? i.y > l.y ? this.checkNeibour(l.line, l.index, 4) ? i.changeAngle(p.COLLISIONDIR.Back) : i.changeAngle(p.COLLISIONDIR.Top) : this.checkNeibour(l.line, l.index, 2) ? i.changeAngle(p.COLLISIONDIR.Back) : i.changeAngle(p.COLLISIONDIR.Bottom) : i.changeAngle(p.COLLISIONDIR.Left) : this.checkNeibour(l.line, l.index, 1) ? i.y > l.y ? this.checkNeibour(l.line, l.index, 4) ? i.changeAngle(p.COLLISIONDIR.Back) : i.changeAngle(p.COLLISIONDIR.Top) : this.checkNeibour(l.line, l.index, 2) ? i.changeAngle(p.COLLISIONDIR.Back) : i.changeAngle(p.COLLISIONDIR.Bottom) : i.changeAngle(p.COLLISIONDIR.Right),
                            v && (this.bulletArr.splice(c, 1), r--);
                            var b = l.hited(i.attack);
                            b && (this.posArr && this.posArr[l.line] && this.posArr[l.line][l.index] && (this.posArr[l.line][l.index] = null), this.blockArr.splice(d, 1), I--, this.fullLineArr.length > 0 && l.line == this.fullLineArr[0] && this.fullLineArr.shift());
                            break
                        }
                        this.lineIndex == this.curBlockLevelData.lines - 1 && (0 != I || this.successState || (this.successState = !0, this.lastLevel = this.curLevel, this.curLevel++, window.ystorage.setItem(o["default"].LocalStorage.curLevel, this.curLevel.toString()), this.curLevel > a["default"].Instance.maxLevel && (a["default"].Instance.maxLevel = this.curLevel, window.ystorage.setItem(o["default"].LocalStorage.user_maxLevel, a["default"].Instance.maxLevel.toString())), 3 == this.curLevel && this.failGuide.setGuide(4), this.failUi.showSuccess())),
                        y || (v = !1, i.x <= i.radius ? v = i.changeAngle(p.COLLISIONDIR.Left) : i.x >= this.bulletLayer.width - i.radius ? v = i.changeAngle(p.COLLISIONDIR.Right) : i.y <= this.LevelLayer.height && (v = i.changeAngle(p.COLLISIONDIR.Top)), v ? (this.bulletArr.splice(c, 1), r--) : this.successState && (i.clear(), this.bulletArr.splice(c, 1), r--))
                    }
                }
            },
            e.prototype.refreshFightingCapacity = function() {
                this.refreshFightingTimer.once(100, this, this.delayRefreshFightingCapacity)
            },
            e.prototype.delayRefreshFightingCapacity = function() {
                for (var t = 0,
                i = 0; i < this.batteryArr.length; i++) t += this.batteryArr[i].baseAtt * (60 / this.batteryArr[i].fireDis);
                var n = 0;
                o["default"].doubleFire_totalTime > 0 && (n = 1),
                t *= 1 + e.Instance.techBulletAttack + n,
                t *= 1 + x["default"].crit + .1 * x["default"].tanshe + x["default"].speed;
                var l = Math.floor(t);
                if (a["default"].Instance.fightingCapacity != l) {
                    var s = l - a["default"].Instance.fightingCapacity;
                    a["default"].Instance.fightingCapacity = l,
                    this.LevelLayer && this.LevelLayer.fontFightCapacity.setNumStr(d.utils.strShow(8 * a["default"].Instance.fightingCapacity));
                    var p = void 0;
                    p = s > 0 ? g["default"].getText("TipAttackAdd") + d.utils.strShow(8 * s).toString() : g["default"].getText("TipAttackMinus") + "-" + d.utils.strShow( - 8 * s).toString();
                    var u = r.PoolMgr.getItem(o["default"].POOLNAME.TipPanel);
                    u || (u = new I["default"], u.x = .5 * (Laya.stage.width - u.width)),
                    u.init(p),
                    Laya.stage.addChild(u)
                }
            },
            e
        } ();
        i["default"] = S
    },
    {
        "../manager/WxApiMgr": 13,
        "../model/GiftData": 14,
        "../model/Global": 15,
        "../model/MapData": 16,
        "../model/Player": 17,
        "../object/BigBlock": 19,
        "../object/Block": 20,
        "../utils/EventHelper": 25,
        "../utils/FailGuide": 26,
        "../utils/GiftPackage": 27,
        "../utils/Guide": 28,
        "../utils/TextUtils": 29,
        "../utils/Utils": 30,
        "../view/Dialog/OfflineDialog": 37,
        "../view/Panel/ComposePanel": 41,
        "../view/Panel/FailUI": 42,
        "../view/Panel/GiftPanel": 45,
        "../view/Panel/LevelPanel": 46,
        "../view/Panel/TipPanel": 50,
        "./PoolMgr": 10,
        "./RoleMgr": 11
    }],
    8 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../model/Global"),
        o = e("../utils/EventHelper"),
        n = e("../model/MapData"),
        l = e("./GameMgr"),
        s = e("../model/Player"),
        r = e("./WxApiMgr"),
        p = e("../model/GiftData"),
        d = function() {
            function e() {}
            return e.loadSource = function(e) {
                Laya.loader.load(e, Laya.Handler.create(this, this.loadComplete), Laya.Handler.create(this, this.onProgress, null, !1)),
                Laya.loader.on(Laya.Event.ERROR, this, this.loadError)
            },
            e.loadLocalSource = function() {
                var e = this;
                this.url = "config/";
                var t = new Array;
                Object.keys(a["default"].LocalConfigs).forEach(function(i) {
                    t.push(e.url + a["default"].LocalConfigs[i])
                }),
                Laya.loader.load(t, Laya.Handler.create(this, this.loadLocalComplete), Laya.Handler.create(this, this.onProgress, null, !1))
            },
            e.loadComplete = function(e) {
                var t = this;
                if (console.log("loadComplete success  ", e), e) this.url = a["default"].StaticURL + a["default"].resVersion + "/",
                this.setMapConfig(),
                o.EventHelper.fire(a["default"].CUSTOMEVENT.LoadComplete);
                else {
                    this.url = "config/",
                    r["default"].Instance.aldSendEvent("加载远程资源失败");
                    var i = new Array;
                    Object.keys(a["default"].LocalConfigs).forEach(function(e) {
                        i.push(t.url + a["default"].LocalConfigs[e])
                    }),
                    Laya.loader.load(i, Laya.Handler.create(this, this.loadLocalComplete), Laya.Handler.create(this, this.onProgress, null, !1))
                }
            },
            e.loadLocalComplete = function() {
                this.setMapConfig()
            },
            e.setMapConfig = function() {
                var e = this;
                a["default"].shareInfo = Laya.loader.getRes(this.url + a["default"].LocalConfigs.ShareConfig);
                for (var t, i, o = Laya.Loader.getRes(this.url + a["default"].LocalConfigs.TextConfig), r = o.length, d = 0; r > d; d++) i = o[d].id,
                t = o[d].Des,
                n["default"].textDic.setValue(i, t);
                var u = Laya.loader.getRes(this.url + a["default"].LocalConfigs.LevelConfig);
                r = u.length;
                for (var g, d = 0; r > d; d++) g = new n.BlockLevelData,
                g.level = Number(u[d].level),
                g.difficultyFactor = Number(u[d].difficultyFactor),
                g.lines = Number(u[d].lines),
                g.boss = "1" == u[d].boss,
                g.gold = Number(u[d].Gold),
                g.box_v = Number(u[d].box_v),
                g.type = Number(u[d].Type),
                g.data = u[d].Data,
                g.winGift = Number(u[d].winGift),
                n["default"].BlockLevelDic.setValue(g.level, g);
                console.log("MapData.BlockLevelDic  ", n["default"].BlockLevelDic);
                var h = Laya.loader.getRes(this.url + a["default"].LocalConfigs.BoomConfig);
                r = h.length;
                for (var c, d = 0; r > d; d++) c = new n.BulletLevelData,
                c.level = Number(h[d].Lv),
                c.attack = Number(h[d].Att),
                c.energy = Number(h[d].Tanshe),
                c.fireDis = Number(h[d].Times),
                c.speed = Number(h[d].V),
                c.gold = Number(h[d].Gold),
                c.recovery = Number(h[d].Recovery),
                n["default"].BulletDic.setValue(c.level, c);
                var f = Laya.loader.getRes(this.url + a["default"].LocalConfigs.SettingConfig);
                f && (a["default"].autoSynthesisTime = Number(f[0].DoubleTime), a["default"].bulletSoundSpan = Number(f[0].bulletSoundSpan), a["default"].bannerADID = f[0].banner, a["default"].videoADID = f[0].video, s["default"].Instance.shareProbability = f[0].probability, a["default"].Version_line = f[0].v, a["default"].showBanner = Number(f[0].banner_gailv), s["default"].Instance.videoShareArr = f[0].Order.split(","), l["default"].Instance.blockHurtOff = Number(f[0].red), a["default"].offTime = Number(f[0].offtime), a["default"].ip_offtime = Number(f[0].ip_offtime), a["default"].ramGiftPropertyArr = f[0].ramGiftProperty.split(","), a["default"].ramGiftColorArr = f[0].ramGiftColor.split(","), a["default"].rampageSpanArr = f[0].rampageSpan.split(","), a["default"].giftUnlockArr = f[0].giftUnlock.split(","), a["default"].boomNum = Number(f[0].boom), a["default"].bulletNum = Number(f[0].zidan), a["default"].giftVideoNum = Number(f[0].giftVideoNum), a["default"].showSuuccessLevel = Number(f[0].intera_lvs));
                for (var m, y = Laya.loader.getRes(this.url + a["default"].LocalConfigs.Notenough), v = 0; v < y.length; v++) m = new n.GetGoldData,
                m.id = Number(y[v].ID),
                m.gold = Number(y[v].Gold),
                n["default"].GetGoldDic.setValue(m.id, m);
                var I = Laya.loader.getRes(this.url + a["default"].LocalConfigs.UpgradeConfig);
                r = I.length;
                for (var b, d = 0; r > d; d++) b = new n.UpgradeData,
                b.Lv = Number(I[d].Lv),
                b.paotai_gold = Number(I[d].paotai_gold),
                b.fire_gold = Number(I[d].fire_gold),
                b.fire_effect = Number(I[d].fire_effect),
                b.outline_gold = Number(I[d].outline_gold),
                b.outline_effect = Number(I[d].outline_effect),
                n["default"].UpgradeDic.setValue(b.Lv, b);
                var x = Laya.loader.getRes(this.url + a["default"].LocalConfigs.OfflineConfig);
                r = x.length;
                for (var L = 0,
                _ = 0,
                d = 0; r > d; d++) L = Number(x[d].ID),
                _ = Number(x[d].Gold),
                n["default"].OfflineDic.setValue(L, _);
                for (var S, w = Laya.loader.getRes(this.url + a["default"].LocalConfigs.LockBatteryConfig), C = 0; C < w.length; C++) S = new n.LockBatteryData,
                S.id = Number(w[C].ID),
                S.gold = Number(w[C].Gold),
                n["default"].LockBatteryDic.setValue(S.id, S);
                a["default"].unlockConfig = Laya.loader.getRes(this.url + a["default"].LocalConfigs.UnlockConfig),
                delete a["default"].LocalConfigs.UnlockConfig;
                for (var T, D = Laya.loader.getRes(this.url + a["default"].LocalConfigs.GiftConfig), k = 0; k < D.length; k++) T = new p.GiftAttr,
                T.id = Number(D[k].ID),
                T.color = Number(D[k].quality),
                T.type = Number(D[k].type),
                T.min = Number(D[k].min),
                T.max = Number(D[k].max),
                T.gold = Number(D[k].gold),
                n["default"].GiftAttrDic.setValue(T.id, T);
                Object.keys(a["default"].LocalConfigs).forEach(function(t) {
                    Laya.loader.clearRes(e.url + a["default"].LocalConfigs[t])
                }),
                this.boomSrc()
            },
            e.boomSrc = function() {
                for (var e = 0; e < a["default"].boomNum; e++) a["default"].boomConfigs.push(a["default"].StaticURL + "imgs/boom/" + (e + 1) + ".png");
                for (var t = 0; t < a["default"].bulletNum; t++) a["default"].bulletConfigs.push(a["default"].StaticURL + "imgs/zidan1/" + (t + 1) + ".png");
                o.EventHelper.fire(a["default"].CUSTOMEVENT.LoadComplete)
            },
            e.resetMapConfig = function() {},
            e.onProgress = function(e) {
                this.progressNum = e,
                o.EventHelper.fire(a["default"].CUSTOMEVENT.LoadProgress, e)
            },
            e.loadError = function(e) {
                console.log("loadError ", e),
                r["default"].Instance.aldSendEvent("加载失败", {
                    "资源路径": e
                })
            },
            e.progressNum = 0,
            e
        } ();
        i.LoadMgr = d
    },
    {
        "../model/GiftData": 14,
        "../model/Global": 15,
        "../model/MapData": 16,
        "../model/Player": 17,
        "../utils/EventHelper": 25,
        "./GameMgr": 7,
        "./WxApiMgr": 13
    }],
    9 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../utils/Dictionary"),
        o = e("../model/Global"),
        n = e("../controller/LogoPanelController"),
        l = function() {
            function e() {}
            return e.init = function() {
                null == e.instance && (e.instance = new e);
                var t = e.instance;
                if (null != t) {
                    if (t.stage = Laya.stage, t.uiLayer = new Laya.View, t.uiLayer.autoSize = !0, t.panelContolDic = new a.Dictionary, console.log("Laya.stage.width ", Laya.Browser.width, "    Laya.stage.height ", Laya.Browser.height, Laya.stage.x, Laya.stage.y), Laya.Browser.window.conch) {
                        var i = JSON.parse(Laya.Browser.window.conch.config.getDeviceInfo());
                        "iPhone10,3" === i.devicename || "iPhone10,6" === i.devicename ? o["default"].offsetY = 100 : 9 / 16 > i.screenWidth / i.screenHeight ? o["default"].offsetY = (Laya.stage.height - 1334) / 2 - 50 : 9 / 16 < i.screenWidth / i.screenHeight ? t.uiLayer.scale(Laya.stage.width / 750, Laya.stage.height / 1334) : 9 / 16 == i.screenWidth / i.screenHeight && (o["default"].offsetY = -100)
                    }
                    t.stage.addChild(t.uiLayer)
                }
                t.reset()
            },
            e.prototype.reset = function() {
                var t = e.instance;
                t.uiLayer.numChildren <= 0 ? t.uiLayer.visible = !1 : t.uiLayer.visible = !0
            },
            e.prototype.showPanel = function(t, i) {
                void 0 === i && (i = !1);
                var a = e.instance,
                o = a.get(t);
                null != o && (a.uiLayer.addChild(o.panel), i && (o.panel.scaleX = 0, o.panel.scaleY = 0, Laya.Tween.to(o.panel, {
                    scaleX: 1,
                    scaleY: 1
                },
                300, Laya.Ease.backOut)), a.uiLayer.visible = !0)
            },
            e.prototype.hidePanel = function(t, i) {
                void 0 === i && (i = !1);
                var a = e.instance,
                o = a.panelContolDic.remove(t);
                null != o && (i ? Laya.Tween.to(o.panel, {
                    scaleX: 0,
                    scaleY: 0
                },
                300, Laya.Ease.backIn, Laya.Handler.create(this,
                function() {
                    a.uiLayer.removeChild(o.panel),
                    o.onClose(),
                    o = null,
                    a.uiLayer.numChildren <= 0 && (a.uiLayer.visible = !1)
                })) : (a.uiLayer.removeChild(o.panel), o.onClose(), o = null, a.uiLayer.numChildren <= 0 && (a.uiLayer.visible = !1)))
            },
            e.prototype.get = function(t) {
                var i = e.instance,
                a = i.panelContolDic.getValue(t);
                return a || (a = i.createNewPage(t)),
                a
            },
            e.prototype.createNewPage = function(t) {
                var i, a = e.instance;
                switch (t) {
                case o["default"].PanelName.LogoPanel:
                    a.logoPannelControl = new n["default"](o["default"].PanelName.LogoPanel),
                    i = a.logoPannelControl
                }
                return a.panelContolDic.setValue(t, i),
                i
            },
            e
        } ();
        i["default"] = l
    },
    {
        "../controller/LogoPanelController": 3,
        "../model/Global": 15,
        "../utils/Dictionary": 24
    }],
    10 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
            function e() {}
            return e.setPoolMaxCount = function(e, t) {
                Laya.PoolCache.addPoolCacheManager(e, t)
            },
            e.getItem = function(e) {
                return Laya.Pool.getItem(e)
            },
            e.recover = function(e, t) {
                Laya.Pool.recover(e, t)
            },
            e
        } ();
        i.PoolMgr = a
    },
    {}],
    11 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("./GameMgr"),
        o = e("../model/Global"),
        n = e("./WxApiMgr"),
        l = e("../model/MapData"),
        s = e("./PoolMgr"),
        r = e("../effect/BombLZ"),
        p = e("../view/Dialog/RecoveryDialog"),
        d = e("./SoundMgr"),
        u = e("../utils/TextUtils"),
        g = function() {
            function e() {
                this.isMove = !1,
                this.touchStatus = !1,
                this.moveStatus = !1,
                this.targetPos = new Laya.Point,
                this.clickPos = new Laya.Point,
                this.target = null,
                this._distance = new Laya.Point,
                this.isRecovery = !1,
                this.targetSp = new Laya.Sprite,
                this.allowTouch = !0
            }
            return Object.defineProperty(e, "Instance", {
                get: function() {
                    return null == e.instance && (e.instance = new e),
                    e.instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.init = function() {
                this.targetSp.loadImage(o["default"].PanelUrl + "mainUi_di_10.png"),
                this.targetSp.pivotX = 36,
                this.targetSp.pivotY = 36,
                this.targetSp.visible = !1,
                Laya.stage.addChild(this.targetSp),
                this.composseY = a["default"].Instance.ComposeLayer.y + a["default"].Instance.ComposeLayer.sp_box.y,
                a["default"].Instance.gameLayer.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown),
                a["default"].Instance.gameLayer.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove),
                a["default"].Instance.gameLayer.on(Laya.Event.MOUSE_UP, this, this.mouseUp),
                a["default"].Instance.ComposeLayer.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown),
                a["default"].Instance.ComposeLayer.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove),
                a["default"].Instance.ComposeLayer.on(Laya.Event.MOUSE_UP, this, this.mouseUp),
                a["default"].Instance.ComposeLayer.on(Laya.Event.MOUSE_OUT, this, this.mouseOut)
            },
            e.prototype.mouseDown = function(e) {
                if (!this.isMove && !a["default"].Instance.ComposeLayer.isCompose) {
                    this.touchStatus = !0,
                    this.targetPos.x = e.stageX,
                    this.targetPos.y = e.stageY,
                    console.log("this.targetPos.x  ", this.targetPos.x),
                    console.log("this.targetPos.y  ", this.targetPos.y),
                    this.clickPos.x = e.stageX,
                    this.clickPos.y = e.stageY;
                    var t = a["default"].Instance.ComposeLayer.sp_box,
                    i = a["default"].Instance.ComposeLayer.sp_rect;
                    if (this.targetPos.x > t.x + a["default"].Instance.ComposeLayer.x && this.targetPos.x < a["default"].Instance.ComposeLayer.x + t.x + t.width && this.targetPos.y > this.composseY + (t.height - i.height) && this.targetPos.y < this.composseY + t.height) for (var n = 0; n < a["default"].Instance.ComposeLayer.cannonArr.length; n++) {
                        var l = a["default"].Instance.ComposeLayer.cannonArr[n],
                        s = l.hitTestPoint(this.targetPos.x, this.targetPos.y);
                        l.y + this.composseY;
                        if (s) {
                            a["default"].Instance.ComposeLayer.sp_box.setChildIndex(l, a["default"].Instance.ComposeLayer.sp_box.numChildren - 1),
                            l.name = o["default"].TankName.TargetCannon,
                            this.target = l,
                            this._distance.x = this.targetPos.x - l.x,
                            this._distance.y = this.targetPos.y - l.y;
                            break
                        }
                    } else if (this.targetPos.x > a["default"].Instance.ComposeLayer.x + t.x && this.targetPos.x < a["default"].Instance.ComposeLayer.x + t.x + t.width && this.targetPos.y > this.composseY - 50 && this.targetPos.y < this.composseY + i.y) for (var s = !1,
                    n = 0; n < a["default"].Instance.batteryArr.length; n++) {
                        var r = a["default"].Instance.batteryArr[n];
                        if (s = r.hitTestPoint(this.targetPos.x, this.targetPos.y)) {
                            a["default"].Instance.ComposeLayer.sp_box.setChildIndex(r, a["default"].Instance.ComposeLayer.sp_box.numChildren - 1),
                            r.name = o["default"].TankName.TargetBattery,
                            this.target = r,
                            this._distance.x = this.targetPos.x - r.x,
                            this._distance.y = this.targetPos.y - r.y;
                            break
                        }
                    } else this.targetPos.y > a["default"].Instance.LevelLayer.height && this.targetPos.y < a["default"].Instance.ComposeLayer.y + a["default"].Instance.ComposeLayer.imgWarn.y && (this.targetSp.visible = !0, this.targetSp.pos(this.targetPos.x, this.targetPos.y))
                }
            },
            e.prototype.mouseMove = function(e) {
                1 == this.touchStatus && (this.moveStatus = !0, this.targetPos.x = e.stageX, this.targetPos.y = e.stageY, this.targetSp.pos(this.targetPos.x, this.targetPos.y), this.target && (this.target && (this.target.isAtt = !1), this.target.x = e.stageX - this._distance.x, this.target.y = e.stageY - this._distance.y, o["default"].isAutoSynthesis = !1))
            },
            e.prototype.mouseUp = function(e) {
                if (this.touchStatus = !1, this.targetSp.visible = !1, this.moveStatus) {
                    this.moveStatus = !1;
                    var t = a["default"].Instance.ComposeLayer.sp_box,
                    i = a["default"].Instance.ComposeLayer.sp_rect;
                    if (e.stageX > a["default"].Instance.ComposeLayer.x + t.x && e.stageX < a["default"].Instance.ComposeLayer.x + t.x + t.width && e.stageY > this.composseY + (t.height - i.height) && e.stageY < this.composseY + t.height) {
                        if (o["default"].autoSynthesis_totalTime > 0 && (o["default"].isAutoSynthesis = !0), this.target) {
                            for (var l = !1,
                            s = 0; s < a["default"].Instance.ComposeLayer.cannonArr.length; s++) {
                                var r = a["default"].Instance.ComposeLayer.cannonArr[s];
                                if (Math.abs(this.target.x - r.initialPos[0]) < .5 * r.width && Math.abs(this.target.y - r.initialPos[1]) < .5 * r.height && r.name != o["default"].TankName.TargetCannon) {
                                    if (l = !0, this.target.level == r.level) {
                                        this.isMove = !0,
                                        a["default"].Instance.ComposeLayer.eff(r, this.target, 0);
                                        break
                                    }
                                    var g = this.target,
                                    h = r;
                                    if (this.target.name == o["default"].TankName.TargetBattery) {
                                        this.isMove = !0,
                                        this.target.clear(),
                                        r.clear(),
                                        a["default"].Instance.ComposeLayer.createBattery(h.level, g.initialPos),
                                        a["default"].Instance.ComposeLayer.createNewCannon(g.level, h.initialPos);
                                        break
                                    }
                                    if (this.target.name == o["default"].TankName.TargetCannon) {
                                        this.isMove = !0,
                                        a["default"].Instance.ComposeLayer.changePos(r, this.target);
                                        break
                                    }
                                }
                            }
                            if (!l) {
                                for (var c = !1,
                                f = 0; f < a["default"].Instance.ComposeLayer.CannonPosArr.length; f++) if (Math.abs(this.target.x - a["default"].Instance.ComposeLayer.CannonPosArr[f][0]) < .5 * this.target.width && Math.abs(this.target.y - a["default"].Instance.ComposeLayer.CannonPosArr[f][1]) < .5 * this.target.height) {
                                    if (this.target.name == o["default"].TankName.TargetBattery) {
                                        this.isMove = !0,
                                        a["default"].Instance.ComposeLayer.createNewCannon(this.target.level, a["default"].Instance.ComposeLayer.CannonPosArr[f]),
                                        this.target.clear(),
                                        c = !0;
                                        break
                                    }
                                    if (this.target.name == o["default"].TankName.TargetCannon) {
                                        a["default"].Instance.ComposeLayer.setStorage(0, this.target.initialPos),
                                        this.target.x = a["default"].Instance.ComposeLayer.CannonPosArr[f][0],
                                        this.target.y = a["default"].Instance.ComposeLayer.CannonPosArr[f][1],
                                        this.target.initialPos = a["default"].Instance.ComposeLayer.CannonPosArr[f],
                                        a["default"].Instance.ComposeLayer.setStorage(this.target.level, this.target.initialPos),
                                        c = !0;
                                        break
                                    }
                                }
                                if (!c) if (Math.abs(this.target.x - a["default"].Instance.ComposeLayer.btn_remove.x) < this.target.width && Math.abs(this.target.y - (a["default"].Instance.ComposeLayer.btn_remove.y - 100)) < this.target.height) if (this.isRecovery = !0, this.target.level > a["default"].Instance.techBatteryLevel + 1) {
                                    var m = new p["default"](this.target.level);
                                    m.popup()
                                } else this.recovery();
                                else this.target.name == o["default"].TankName.TargetBattery && (this.target.isAtt = !0),
                                this.target.x = this.target.initialPos[0],
                                this.target.y = this.target.initialPos[1]
                            }
                            this.isRecovery || (this.target && (this.target.name = ""), this.target = null)
                        }
                    } else if (e.stageX > a["default"].Instance.ComposeLayer.x + t.x && e.stageX < a["default"].Instance.ComposeLayer.x + t.x + t.width && e.stageY > this.composseY && e.stageY < this.composseY + i.y) {
                        if (this.target) {
                            for (var l = !1,
                            s = 0; s < a["default"].Instance.batteryArr.length; s++) {
                                var y = a["default"].Instance.batteryArr[s];
                                if (Math.abs(this.target.x - y.initialPos[0]) < y.width && Math.abs(this.target.y - y.initialPos[1]) < y.height && y.name != o["default"].TankName.TargetBattery) {
                                    if (l = !0, y.isAtt = !1, this.target.level == y.level) {
                                        this.isMove = !0,
                                        a["default"].Instance.ComposeLayer.eff(y, this.target, 1);
                                        break
                                    }
                                    d.SoundMgr.playSound(o["default"].SoundConfig.buttonClick);
                                    var g = this.target,
                                    h = y;
                                    if (this.target.name == o["default"].TankName.TargetCannon) {
                                        this.isMove = !0,
                                        this.target.clear(),
                                        y.clear(),
                                        a["default"].Instance.ComposeLayer.createBattery(g.level, h.initialPos),
                                        a["default"].Instance.ComposeLayer.createNewCannon(h.level, g.initialPos);
                                        break
                                    }
                                    if (this.target.name == o["default"].TankName.TargetBattery) {
                                        this.isMove = !0,
                                        a["default"].Instance.ComposeLayer.changePos(y, this.target),
                                        this.target.isAtt = !0,
                                        y.isAtt = !0;
                                        break
                                    }
                                }
                            }
                            if (!l) {
                                for (var c = !1,
                                f = 0; f < a["default"].Instance.ComposeLayer.BatteryPosArr.length; f++) if (Math.abs(this.target.x - a["default"].Instance.ComposeLayer.BatteryPosArr[f][0]) < this.target.width && Math.abs(this.target.y - a["default"].Instance.ComposeLayer.BatteryPosArr[f][1]) < this.target.height) if (1 == a["default"].Instance.ComposeLayer.batteryDeblockStatus[f]) {
                                    if (d.SoundMgr.playSound(o["default"].SoundConfig.buttonClick), this.target.name == o["default"].TankName.TargetBattery) {
                                        this.target.isAtt = !0,
                                        a["default"].Instance.ComposeLayer.setStorage(0, this.target.initialPos),
                                        this.target.x = a["default"].Instance.ComposeLayer.BatteryPosArr[f][0],
                                        this.target.y = a["default"].Instance.ComposeLayer.BatteryPosArr[f][1],
                                        this.target.initialPos = a["default"].Instance.ComposeLayer.BatteryPosArr[f],
                                        a["default"].Instance.ComposeLayer.setStorage(this.target.level, this.target.initialPos),
                                        c = !0;
                                        break
                                    }
                                    if (this.target.name == o["default"].TankName.TargetCannon) {
                                        this.isMove = !0,
                                        a["default"].Instance.ComposeLayer.createBattery(this.target.level, a["default"].Instance.ComposeLayer.BatteryPosArr[f]),
                                        this.target.clear(),
                                        c = !0;
                                        break
                                    }
                                } else {
                                    var v = a["default"].Instance.ComposeLayer.sp_box_battery.getChildAt(f),
                                    I = 0;
                                    "sp2" == v.name ? I = 1 : "sp3" == v.name ? I = 2 : "sp4" == v.name ? I = 3 : "sp5" == v.name && (I = 4);
                                    var b = o["default"].unlockConfig[I].ID,
                                    x = v.getChildByName("fontItem");
                                    x && (x.visible ? n["default"].showToast(u["default"].getText("compose1", [b])) : n["default"].showToast(u["default"].getText("compose2"))),
                                    this.target.name == o["default"].TankName.TargetBattery && (this.target.isAtt = !0),
                                    this.target.x = this.target.initialPos[0],
                                    this.target.y = this.target.initialPos[1]
                                }
                                c || (this.target.name == o["default"].TankName.TargetBattery && (this.target.isAtt = !0), this.target.x = this.target.initialPos[0], this.target.y = this.target.initialPos[1])
                            }
                            this.target.name = "",
                            this.target = null
                        }
                    } else this.target && (this.target.name == o["default"].TankName.TargetBattery && (this.target.isAtt = !0), this.target.x = this.target.initialPos[0], this.target.y = this.target.initialPos[1], this.target.name = "", this.target = null);
                    o["default"].autoSynthesis_totalTime > 0 && (o["default"].isAutoSynthesis = !0),
                    a["default"].Instance.batteryArr.forEach(function(e) {
                        e && (e.name = "")
                    })
                }
            },
            e.prototype.recovery = function() {
                var e = this,
                t = this.target;
                if (t) {
                    var i = l["default"].BulletDic.getValue(t.level).recovery;
                    a["default"].Instance.ComposeLayer.consumeGold(i, 1),
                    Laya.Tween.to(t, {
                        scaleX: 0,
                        scaleY: 0
                    },
                    200, null, Laya.Handler.create(this,
                    function() {
                        t.clear(),
                        n["default"].showToast("金币+" + i);
                        var l = s.PoolMgr.getItem(o["default"].POOLNAME.BombLZ);
                        l || (l = new r["default"]),
                        l.init(new Laya.Point(a["default"].Instance.ComposeLayer.btn_remove.x, a["default"].Instance.ComposeLayer.btn_remove.y + e.composseY - 100), 2, 2),
                        a["default"].Instance.LevelLayer.addChild(l)
                    })),
                    this.target.name = "",
                    this.target = null,
                    this.isRecovery = !1
                }
            },
            e.prototype.unRecovery = function() {
                this.target && (this.target.name == o["default"].TankName.TargetBattery && (this.target.isAtt = !0), this.target.x = this.target.initialPos[0], this.target.y = this.target.initialPos[1], this.target.name = "", this.target = null, this.isRecovery = !1)
            },
            e.prototype.mouseOut = function() {
                this.touchStatus && (o["default"].autoSynthesis_totalTime > 0 && (o["default"].isAutoSynthesis = !0), this.touchStatus = !1, this.moveStatus = !1, this.target && (this.target.name == o["default"].TankName.TargetBattery && (this.target.isAtt = !0), this.target.x = this.target.initialPos[0], this.target.y = this.target.initialPos[1], this.target.name = "", this.target = null, a["default"].Instance.batteryArr.forEach(function(e) {
                    e.name = ""
                })))
            },
            e.prototype.clear = function() {
                a["default"].Instance.gameLayer.off(Laya.Event.MOUSE_DOWN, this, this.mouseDown),
                a["default"].Instance.gameLayer.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove),
                a["default"].Instance.gameLayer.off(Laya.Event.MOUSE_UP, this, this.mouseUp),
                a["default"].Instance.ComposeLayer.off(Laya.Event.MOUSE_DOWN, this, this.mouseDown),
                a["default"].Instance.ComposeLayer.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove),
                a["default"].Instance.ComposeLayer.off(Laya.Event.MOUSE_UP, this, this.mouseUp),
                a["default"].Instance.ComposeLayer.off(Laya.Event.MOUSE_OUT, this, this.mouseOut)
            },
            e
        } ();
        i["default"] = g
    },
    {
        "../effect/BombLZ": 5,
        "../model/Global": 15,
        "../model/MapData": 16,
        "../utils/TextUtils": 29,
        "../view/Dialog/RecoveryDialog": 38,
        "./GameMgr": 7,
        "./PoolMgr": 10,
        "./SoundMgr": 12,
        "./WxApiMgr": 13
    }],
    12 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
            function e() {}
            return e.playMusic = function(e, t, i) {
                return this.bgMusic = Laya.SoundManager.playMusic(e, t, null, i),
                this.bgMusic
            },
            e.playSound = function(e, t, i, a) {
                var o;
                return o = Laya.SoundManager.playSound(e, t, null, i, a)
            },
            e.setMuted = function(e) {
                Laya.SoundManager.muted = e
            },
            e.setVolume = function(e) {
                Laya.SoundManager.setSoundVolume(e),
                Laya.SoundManager.setMusicVolume(e)
            },
            e.stopAll = function() {
                Laya.SoundManager.stopAll()
            },
            e.stop = function(e) {
                Laya.SoundManager.stopSound(e)
            },
            e.destroySound = function(e) {
                Laya.SoundManager.destroySound(e)
            },
            e
        } ();
        i.SoundMgr = a
    },
    {}],
    13 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../model/Global"),
        o = e("../utils/EventHelper"),
        n = e("./SoundMgr"),
        l = e("../view/Panel/TipPanel"),
        s = e("./PoolMgr"),
        r = function() {
            function e() {}
            return Object.defineProperty(e, "Instance", {
                get: function() {
                    return null == e.instance && (e.instance = new e),
                    e.instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.init = function() {},
            e.prototype.onHide = function() {},
            e.prototype.onShow = function() {},
            e.resumeSound = function() {
                n.SoundMgr.playMusic(a["default"].SoundConfig.bgMusic, 0)
            },
            e.showRewardAd = function(t) {
                e.watchType = t,
                n.SoundMgr.setMuted(!0),
                Laya.Browser.window.console.log("激励视频");
				my.r(() => {
				o.EventHelper.fire(a["default"].CUSTOMEVENT.WatchADFinish, 0, e.watchType)
				});	
				
            },
            e.showFullScreenAd = function(openCall, closeCall) {
                var currentTime = Math.round(new Date().getTime() / 1000);
               
            },
            e.showBanner = function() {},
            e.hideBanner = function() {},
            e.prototype.aldSendEvent = function(e, t) {
                void 0 === t && (t = {})
            },
            e.prototype.vibShort = function() {},
            e.showToast = function(e) {
                var t = s.PoolMgr.getItem(a["default"].POOLNAME.TipPanel);
                t || (t = new l["default"], t.x = .5 * (Laya.stage.width - t.width)),
                t.init(e),
                Laya.stage.addChild(t)
            },
            e.share = function() {},
            e.isLogin = function() {},
            e.login = function() {
                function e(e) {
                    Laya.Browser.window.console.log("用户编号：", e.uId),
                    Laya.Browser.window.console.log("用户昵称：", e.userName),
                    Laya.Browser.window.console.log("")
                }
            },
            e.getUserAvatar = function() {},
            e
        } ();
        i["default"] = r,
        Laya.Browser.window && (Laya.Browser.window.WxApiMgr = r);
        var p; !
        function(e) {
            e[e.NoReward = 0] = "NoReward",
            e[e.GetGold = 1] = "GetGold",
            e[e.AutoCompose = 2] = "AutoCompose",
            e[e.OfflineGold = 3] = "OfflineGold",
            e[e.NewBattery_Gold = 4] = "NewBattery_Gold",
            e[e.DoubleGold = 5] = "DoubleGold",
            e[e.DoubleFire = 6] = "DoubleFire",
            e[e.HalfDifficult = 7] = "HalfDifficult",
            e[e.BossPass = 8] = "BossPass",
            e[e.GetGift = 9] = "GetGift",
            e[e.Upgrade = 10] = "Upgrade"
        } (p = i.WATCHTYP || (i.WATCHTYP = {}))
    },
    {
        "../model/Global": 15,
        "../utils/EventHelper": 25,
        "../view/Panel/TipPanel": 50,
        "./PoolMgr": 10,
        "./SoundMgr": 12
    }],
    14 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("./MapData"),
        o = e("./Global"),
        n = e("../utils/Utils"),
        l = function() {
            function e() {}
            return e.getRamGift = function() {
                for (var e = 0,
                t = o["default"].ramGiftPropertyArr.length, i = 0; t > i; i++) e += Number(o["default"].ramGiftPropertyArr[i]);
                for (var l = Math.random() * e, s = 0, p = 0, i = 0; t > i; i++) if (p += Number(o["default"].ramGiftPropertyArr[i]), p >= l) {
                    s = i + 1;
                    break
                }
                e = 0,
                t = o["default"].ramGiftColorArr.length;
                for (var i = 0; t > i; i++) e += Number(o["default"].ramGiftColorArr[i]);
                var d = Math.random() * e,
                u = 0;
                p = 0;
                for (var i = 0; t > i; i++) if (p += Number(o["default"].ramGiftColorArr[i]), p >= d) {
                    u = i + 1;
                    break
                }
                var g = 1e3 * s + u,
                h = a["default"].GiftAttrDic.getValue(g),
                c = new r;
                return c.id = g,
                c.type = h.type,
                c.color = h.color,
                h.min == h.max ? c.effect = h.min: c.effect = n.utils.rnd(h.min, h.max),
                c
            },
            e.crit = 0,
            e.tanshe = 0,
            e.speed = 0,
            e.cost = 0,
            e.gold = 0,
            e.bossBolckMove = 0,
            e.blockMove = 0,
            e.autoCompose = 0,
            e.giftTypeNum = 8,
            e.giftColorNum = 5,
            e
        } ();
        i["default"] = l;
        var s = function() {
            function e() {}
            return e
        } ();
        i.GiftAttr = s;
        var r = function() {
            function e() {
                this.index = -1,
                this.belong = -1
            }
            return e
        } ();
        i.GiftBagData = r
    },
    {
        "../utils/Utils": 30,
        "./Global": 15,
        "./MapData": 16
    }],
    15 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
            function e() {}
            return e.app = "dzzbfk",
            e.adVer = "1.0.0",
            e.ABSwitch = !1,
            e.RanSwich = !1,
            e.Version = "1.5",
            e.StaticURL = "",
            e.wxWritePhotosAlbum = !1,
            e.offsetY = 0,
            e.videoADID = "",
            e.bannerADID = "",
            e.fullAdTime = 0,
            e.giftVideoNum = 2,
            e.resVersion = "",
            e.switchVideo = !1,
            e.regionShareShield = "",
            e.showGuideNum = 1,
            e.propStorey = [],
            e.loadSDK = !1,
            e.hasVideo = !1,
            e.autoSynthesisTime = 60,
            e.isAutoSynthesis = !1,
            e.autoSynthesis_totalTime = 0,
            e.doubleGold_totalTime = 0,
            e.doubleFire_totalTime = 0,
            e.halfDifficult_totalTime = 0,
            e.getGoldNum = 100,
            e.bulletSoundSpan = 10,
            e.critTimes = 1.5,
            e.offTime = 3e3,
            e.ip_offtime = 3e3,
            e.ramGiftPropertyArr = [],
            e.ramGiftColorArr = [],
            e.rampageSpanArr = [],
            e.giftUnlockArr = [],
            e.isGetGift = !1,
            e.showSuuccessLevel = 10,
            e.BgUrl = "imgs/bg/",
            e.PanelUrl = "imgs/panel/",
            e.BulletUrl = "imgs/bullet/",
            e.TankUrl = "imgs/tank/",
            e.FontUrl = "imgs/font/",
            e.GiftUrl = "imgs/gift/",
            e.TankName = {
                TargetBattery: "TargetBattery",
                TargetCannon: "TargetCannon"
            },
            e.PanelName = {
                LogoPanel: "LogoPanel",
                StartScene: "StartScene",
                PanelA: "PanelA",
                PanelB: "PanelB"
            },
            e.POOLNAME = {
                Cloud: "Cloud",
                BombLZ: "BombLZ",
                BatteryBoom: "BatteryBoom",
                BlockBoom: "BlockBoom",
                Bullet: "Bullet",
                Block: "Block",
                BigBlock: "BigBlock",
                CannonLevel: "CannonLevel",
                Battery: "Battery",
                Trail: "Trail",
                TimeLine: "TimeLine",
                TipPanel: "TipPanel"
            },
            e.HTTPURL = {
                Login: "login?code=",
                Authorize: "/users/",
                Prop: "prop"
            },
            e.HTTPEVENT = {
                Login: "Login",
                IP: "IP",
                DailyGift: "DailyGift"
            },
            e.LocalStorage = {
                user_score: "user_score",
                user_maxscore: "user_maxscore",
                user_title: "user_title",
                user_titleexp: "user_titleexp",
                user_orderIndex: "user_orderIndex",
                use_shareNum: "use_shareNum",
                curLevel: "curLevel",
                batteryPos: "batteryPos",
                user_gold: "user_gold",
                BatteryLevel: "BatteryLevel",
                CannonPos: "CannonPos",
                getGold_num: "getGold_num",
                techLevel: "techLevel",
                offLineTime: "offLineTime",
                user_maxLevel: "user_maxLevel",
                guide: "guide",
                autoComposeTime: "autoComposeTime",
                doubleGoldTime: "doubleGoldTime",
                doubleFireTime: "doubleFireTime",
                halfDifficultTime: "doubleIncomeTime",
                giftEquip: "giftEquip",
                giftEquipEffect: "giftEquipEffect",
                giftBag: "giftBag",
                giftBagEffect: "giftBagEffect",
                RampageNum: "RampageNum",
                RampageTime: "RampageTime",
                RampageDate: "RampageDate",
                RampageHave: "RampageHave",
                RampageVideoTimes: "RampageVideoTime",
                RampageWaitTimes: "RampageWaitTime",
                LoginDays: "LoginDays",
                DayGetGift: "DayGetGift"
            },
            e.CUSTOMEVENT = {
                CloseDialog: "CloseDialog",
                StartScene_btn1: "StartScene_btn1",
                StartScene_btn2: "StartScene_btn2",
                StartScene_btn3: "StartScene_btn3",
                StartScene_sound: "StartScene_sound",
                PanelA_close: "PanelA_close",
                PanelA_showDialogA: "PanelA_showDialogA",
                PanelB_close: "PanelB_close",
                PanelB_load: "PanelB_load",
                ExampleEvent: "ExampleEvent",
                WatchADFinish: "WatchADFinish",
                ShareCallBack: "ShareCallBack",
                LoadProgress: "LoadProgress",
                LoadComplete: "LoadComplete",
                LoadVideoComplete: "LoadVideoComplete"
            },
            e.SoundConfig = {
                bgMusic: e.StaticURL + "BGM/BGM.wav",
                yinghuo: e.StaticURL + "BGM/yinghuo.wav",
                buttonClick: e.StaticURL + "BGM/button_click.wav",
                gold: e.StaticURL + "BGM/gold.wav",
                hecheng: e.StaticURL + "BGM/hecheng.wav",
                lose: e.StaticURL + "BGM/lose.wav",
                paotaibaozha: e.StaticURL + "BGM/paotaibaozha.wav",
                tanshe: e.StaticURL + "BGM/tanshe.wav",
                win: e.StaticURL + "BGM/win.wav"
            },
            e.Configs = {
                TextConfig: e.StaticURL + e.resVersion + "/Text.json",
                SettingConfig: e.StaticURL + e.resVersion + "/Setting.json",
                BoomConfig: e.StaticURL + e.resVersion + "/boom.json",
                LevelConfig: e.StaticURL + e.resVersion + "/Levelconfig.json",
                Notenough: e.StaticURL + e.resVersion + "/notenough.json",
                UpgradeConfig: e.StaticURL + e.resVersion + "/Upgrade.json",
                OfflineConfig: e.StaticURL + e.resVersion + "/outline_gold.json",
                ShareConfig: e.StaticURL + e.resVersion + "/ShareTxt.json",
                UnlockConfig: e.StaticURL + e.resVersion + "/unlock.json",
                LockBatteryConfig: e.StaticURL + e.resVersion + "/newlv.json",
                GiftConfig: e.StaticURL + e.resVersion + "/core.json"
            },
            e.LocalConfigs = {
                TextConfig: "Text.json",
                SettingConfig: "Setting.json",
                BoomConfig: "boom.json",
                LevelConfig: "Levelconfig.json",
                Notenough: "notenough.json",
                UpgradeConfig: "Upgrade.json",
                OfflineConfig: "outline_gold.json",
                ShareConfig: "ShareTxt.json",
                UnlockConfig: "unlock.json",
                LockBatteryConfig: "newlv.json",
                GiftConfig: "core.json"
            },
            e.boomConfigs = [],
            e.boomArr = [],
            e.bulletConfigs = [],
            e.bulletArr = [],
            e
        } ();
        i["default"] = a
    },
    {}],
    16 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../utils/Dictionary"),
        o = function() {
            function e() {}
            return e.textDic = new a.Dictionary,
            e.BlockLevelDic = new a.Dictionary,
            e.BulletDic = new a.Dictionary,
            e.GetGoldDic = new a.Dictionary,
            e.LockBatteryDic = new a.Dictionary,
            e.UpgradeDic = new a.Dictionary,
            e.OfflineDic = new a.Dictionary,
            e.GiftAttrDic = new a.Dictionary,
            e
        } ();
        i["default"] = o;
        var n; !
        function(e) {
            e[e.Left = 1] = "Left",
            e[e.Top = 2] = "Top",
            e[e.Right = 3] = "Right",
            e[e.Bottom = 4] = "Bottom",
            e[e.Back = 5] = "Back"
        } (n = i.COLLISIONDIR || (i.COLLISIONDIR = {}));
        var l = function() {
            function e() {}
            return e
        } ();
        i.BlockLevelData = l;
        var s = function() {
            function e() {}
            return e
        } ();
        i.BulletLevelData = s;
        var r = function() {
            function e() {}
            return e
        } ();
        i.GetGoldData = r;
        var p = function() {
            function e() {}
            return e
        } ();
        i.TechData = p;
        var d = function() {
            function e() {}
            return e
        } ();
        i.UpgradeData = d;
        var u = function() {
            function e() {}
            return e
        } ();
        i.LockBatteryData = u;
        var g; !
        function(e) {
            e[e.AutoCompose = 1] = "AutoCompose",
            e[e.DoubleGold = 2] = "DoubleGold",
            e[e.DoubleFire = 3] = "DoubleFire",
            e[e.HalfDifficult = 4] = "HalfDifficult"
        } (g = i.TimeType || (i.TimeType = {}))
    },
    {
        "../utils/Dictionary": 24
    }],
    17 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("./Global"),
        o = e("../manager/GameMgr"),
        n = e("./GiftData"),
        l = function() {
            function e() {
                this.openId = "",
                this.uuid = "",
                this.channel = "0",
                this.parentChannel = "-1",
                this.Score = 0,
                this.PropArr = [0, 0, 0, 0, 0, 0],
                this.videoShareArr = ["2", "2", "2", "2", "1", "1", "1"],
                this.orderIndex = 0,
                this.shareNum = 0,
                this.shareProbability = 0,
                this.batteryLevel = 1,
                this.todayGetGoldNum = 0,
                this.gold = 1e3,
                this.maxLevel = 1,
                this.techLevelArr = ["1", "1", "1"],
                this.showGuide = 0,
                this.guideStop = !1,
                this.fightingCapacity = 0,
                this.giftEquipArr = [],
                this.giftEffectEquipArr = [],
                this.giftBagArr = [],
                this.giftEffectBagArr = [],
                this.newuser = 0,
                this.region_shield = 0,
                this.useRampageTimes = 0,
                this.haveRampageTimes = 0,
                this.rampageVideoTimes = 0,
                this.rampageWaitTimes = 0,
                this.loginDays = 0
            }
            return Object.defineProperty(e, "Instance", {
                get: function() {
                    return null == e.instance && (e.instance = new e),
                    e.instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.setUserData = function(t) {
                e.Instance.newuser = t.newuser,
                e.Instance.Score = Number(t.coin),
                e.Instance.region_shield = t.region_shield,
                e.Instance.token = t.token
            },
            e.prototype.getRegionShareShield = function(e) {
                var t = a["default"].regionShareShield.split(",");
                return - 1 != t.indexOf(e) ? !0 : !1
            },
            e.prototype.showVideoOrShare = function() {
                return console.log("showVideoOrShare   ", a["default"].hasVideo, "     this.orderIndex     ", this.orderIndex),
                o["default"].Instance.checkVersion() ? !0 : a["default"].hasVideo ? this.orderIndex >= this.videoShareArr.length ? (this.orderIndex = 0, !0) : "2" == this.videoShareArr[this.orderIndex] ? !0 : "1" == this.videoShareArr[this.orderIndex] ? !1 : void 0 : !1
            },
            e.prototype.setGiftData = function() {
                n["default"].crit = 0,
                n["default"].tanshe = 0,
                n["default"].speed = 0,
                n["default"].cost = 0,
                n["default"].gold = 0,
                n["default"].bossBolckMove = 0,
                n["default"].blockMove = 0,
                n["default"].autoCompose = 0;
                for (var t, i = e.Instance.giftEquipArr.length,
                a = 0; i > a; a++) switch (t = Number(e.Instance.giftEquipArr[a][0])) {
                case 1:
                    n["default"].crit = .01 * Number(e.Instance.giftEffectEquipArr[a]);
                    break;
                case 2:
                    n["default"].tanshe = Math.floor(.01 * Number(e.Instance.giftEffectEquipArr[a]));
                    break;
                case 3:
                    n["default"].speed = .01 * Number(e.Instance.giftEffectEquipArr[a]);
                    break;
                case 4:
                    n["default"].cost = .01 * Number(e.Instance.giftEffectEquipArr[a]);
                    break;
                case 5:
                    n["default"].gold = .01 * Number(e.Instance.giftEffectEquipArr[a]);
                    break;
                case 6:
                    n["default"].bossBolckMove = .01 * Number(e.Instance.giftEffectEquipArr[a]);
                    break;
                case 7:
                    n["default"].blockMove = .01 * Number(e.Instance.giftEffectEquipArr[a]);
                    break;
                case 8:
                    n["default"].autoCompose = Math.floor(.01 * Number(e.Instance.giftEffectEquipArr[a]))
                }
                console.log("GiftData.crit ", n["default"].crit, "   GiftData.tanshe ", n["default"].tanshe, "   GiftData.speed ", n["default"].speed, "   GiftData.cost ", n["default"].cost, "   GiftData.gold ", n["default"].gold, "   GiftData.bossBolckMove ", n["default"].bossBolckMove, "   GiftData.blockMove ", n["default"].blockMove, "   GiftData.autoCompose ", n["default"].autoCompose),
                o["default"].Instance.refreshFightingCapacity(),
                o["default"].Instance.ComposeLayer && o["default"].Instance.ComposeLayer.updateCreate()
            },
            e.prototype.watchTypeNum = function(e) {
                return ! 0
            },
            e.prototype.videoOrShareSuccess = function() {
                this.orderIndex++,
                console.log("videoOrShareSuccess  ", this.orderIndex),
                this.orderIndex = this.orderIndex % this.videoShareArr.length;
                var e = new Date,
                t = e.getFullYear().toString() + "," + (e.getMonth() + 1).toString() + "," + e.getDate().toString();
                window.ystorage.setItem(a["default"].LocalStorage.user_orderIndex, t + ";" + this.orderIndex.toString())
            },
            e.prototype.getOrderIndex = function() {
                var e = new Date,
                t = e.getFullYear().toString() + "," + (e.getMonth() + 1).toString() + "," + e.getDate().toString(),
                i = window.ystorage.getItem(a["default"].LocalStorage.user_orderIndex);
                if (null == i) this.orderIndex = 0,
                window.ystorage.setItem(a["default"].LocalStorage.user_orderIndex, t + ";0");
                else {
                    var o = i.split(";");
                    t == o[0] ? this.orderIndex = Number(o[1]) : (this.orderIndex = 0, window.ystorage.setItem(a["default"].LocalStorage.user_orderIndex, t + ";0"))
                }
            },
            e.prototype.getShareNum = function() {
                var e = new Date,
                t = e.getFullYear().toString() + "," + (e.getMonth() + 1).toString() + "," + e.getDate().toString(),
                i = window.ystorage.getItem(a["default"].LocalStorage.use_shareNum);
                if (null == i) this.shareNum = 1,
                window.ystorage.setItem(a["default"].LocalStorage.use_shareNum, t + ";1");
                else {
                    var o = i.split(";");
                    t == o[0] ? this.shareNum = Number(o[1]) : (this.shareNum = 1, window.ystorage.setItem(a["default"].LocalStorage.use_shareNum, t + ";1"))
                }
            },
            e.prototype.getShareSuccess = function(e) {
                var t = Date.now() - e;
                console.log("span  ", t);
                var i = 500 * this.shareNum <= 3e3 ? 500 * this.shareNum: 3e3;
                if (t > i) {
                    var a = Math.random();
                    return console.log("ran  ", a),
                    a <= this.shareProbability ? !0 : !1
                }
                return ! 1
            },
            e.prototype.addShareNum = function() {
                this.shareNum++;
                var e = new Date,
                t = e.getFullYear().toString() + "," + (e.getMonth() + 1).toString() + "," + e.getDate().toString();
                window.ystorage.setItem(a["default"].LocalStorage.use_shareNum, t + ";" + this.shareNum.toString())
            },
            e
        } ();
        i["default"] = l
    },
    {
        "../manager/GameMgr": 7,
        "./GiftData": 14,
        "./Global": 15
    }],
    18 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../model/Global"),
        o = e("./Bullet"),
        n = e("../manager/PoolMgr"),
        l = e("../manager/GameMgr"),
        s = e("../model/MapData"),
        r = e("./Cannon"),
        p = e("../effect/BombLZ"),
        d = e("../manager/SoundMgr"),
        u = e("./Trail"),
        g = function(e) {
            function t(t) {
                var i = e.call(this, t) || this;
                return i.fireDis = 1,
                i.direction = 0,
                i.fireDisAdd = 0,
                i.rotationSpeed = 2.5,
                i.isRotate = !1,
                i.targetRotation = 0,
                i.target = null,
                i.isAtt = !0,
                i.baseAtt = 0,
                i
            }
            return __extends(t, e),
            t.prototype.init = function() {
                this.fireEffect = new Laya.Image;
                var e = this.level - 1;
                this.level > a["default"].boomConfigs.length && (e = a["default"].boomConfigs.length - 1);
                var t = this;
                this.loadImage(a["default"].boomConfigs[e], Laya.Handler.create(t,
                function() {
                    t.pivotX = .5 * t.width,
                    t.pivotY = .5 * t.height,
                    t.fireEffect.loadImage(a["default"].PanelUrl + "shoot.png"),
                    t.fireEffect.alpha = 0,
                    t.fireEffect.x = .5 * (t.width - 45),
                    t.fireEffect.y = -54,
                    t.addChild(t.fireEffect)
                }))
            },
            t.prototype.reset = function() {
                this.target = null,
                this.fireDisAdd = 0,
                this.isRotate = !1,
                this.targetRotation = 0,
                this.isAtt = !0;
                var e = s["default"].BulletDic.getValue(this.level);
                this.fireDis = Number(e.fireDis),
                this.baseAtt = e.attack
            },
            t.prototype.setRotate = function(e) {
                this.isRotate ? this.targetRotation > this.rotation ? this.targetRotation > this.rotation + this.rotationSpeed ? this.rotation += this.rotationSpeed: this.rotation = this.targetRotation: this.targetRotation < this.rotation ? this.targetRotation < this.rotation - this.rotationSpeed ? this.rotation -= this.rotationSpeed: this.rotation = this.targetRotation: this.targetRotation == this.rotation && (this.isRotate = !1) : this.rotation != e && (this.isRotate = !0, this.targetRotation = e, this.targetRotation > this.rotation ? this.targetRotation > this.rotation + this.rotationSpeed ? this.rotation += this.rotationSpeed: this.rotation = this.targetRotation: this.targetRotation < this.rotation ? this.targetRotation < this.rotation - this.rotationSpeed ? this.rotation -= this.rotationSpeed: this.rotation = this.targetRotation: this.targetRotation == this.rotation && (this.isRotate = !1))
            },
            t.prototype.fireBullet = function() {
                if (this.isAtt) {
                    if (this.fireDisAdd++, a["default"].doubleFire_totalTime > 0 && this.fireDisAdd++, this.fireDisAdd >= this.fireDis) {
                        this.fireDisAdd = 0;
                        var e = n.PoolMgr.getItem(a["default"].POOLNAME.Bullet + this.level);
                        if (e || (e = new o["default"](this.level)), e.reset(), e.x = this.x, e.y = this.y, e.angle = this.rotation, this.fireEffect.alpha = 1, Laya.Tween.to(this.fireEffect, {
                            alpha: 0
                        },
                        60), a["default"].doubleFire_totalTime > 0) {
                            var t = n.PoolMgr.getItem(a["default"].POOLNAME.Trail);
                            t || (t = new u["default"]),
                            t.x = e.x,
                            t.y = e.y,
                            e.trail = t,
                            l["default"].Instance.bulletLayer.addChild(t)
                        }
                        return e
                    }
                    return null
                }
                return null
            },
            t.prototype.failHide = function() {
                d.SoundMgr.playSound(a["default"].SoundConfig.paotaibaozha);
                var e = n.PoolMgr.getItem(a["default"].POOLNAME.BombLZ);
                e || (e = new p["default"]),
                e.init(new Laya.Point(this.x, this.y + l["default"].Instance.ComposeLayer.y), 5, 1),
                l["default"].Instance.gameLayer.addChild(e),
                this.visible = !1
            },
            t.prototype.clear = function() {
                this.removeSelf(),
                n.PoolMgr.recover(a["default"].POOLNAME.Battery + this.level, this);
                var e = l["default"].Instance.batteryArr.indexOf(this);
                l["default"].Instance.batteryArr.splice(e, 1),
                l["default"].Instance.ComposeLayer.setStorage(0, this.initialPos),
                l["default"].Instance.refreshFightingCapacity()
            },
            t
        } (r["default"]);
        i["default"] = g
    },
    {
        "../effect/BombLZ": 5,
        "../manager/GameMgr": 7,
        "../manager/PoolMgr": 10,
        "../manager/SoundMgr": 12,
        "../model/Global": 15,
        "../model/MapData": 16,
        "./Bullet": 21,
        "./Cannon": 22,
        "./Trail": 23
    }],
    19 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("./Block"),
        o = e("../manager/GameMgr"),
        n = e("../model/Global"),
        l = e("../model/Player"),
        s = e("../manager/PoolMgr"),
        r = function(e) {
            function t() {
                var t = e.call(this) || this;
                return t.width = t.height = 4 * o["default"].Instance.blockRadius + o["default"].Instance.blockDis,
                t.radius = .5 * t.width,
                t.pivotX = t.pivotY = t.radius,
                t.init(),
                t.text.fontSize = 50,
                t
            }
            return __extends(t, e),
            t.prototype.clear = function(e) {
                void 0 === e && (e = !0),
                this.die || (this.die = !0, e && (this.deathEff(), o["default"].Instance.curBlockLevelData && o["default"].Instance.curBlockLevelData.boss && (0 == this.colorType ? o["default"].Instance.killBlockNum += 1 : 1 == this.colorType && (o["default"].Instance.killRedBlockNum += 1)), n["default"].doubleGold_totalTime > 0 && (this.gold *= 5), l["default"].Instance.gold += 4 * this.gold, window.ystorage.setItem(n["default"].LocalStorage.user_gold, l["default"].Instance.gold.toString()), o["default"].Instance.LevelLayer.updateGold()), this.removeSelf(), s.PoolMgr.recover(n["default"].POOLNAME.BigBlock, this))
            },
            t
        } (a["default"]);
        i["default"] = r
    },
    {
        "../manager/GameMgr": 7,
        "../manager/PoolMgr": 10,
        "../model/Global": 15,
        "../model/Player": 17,
        "./Block": 20
    }],
    20 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../model/Global"),
        o = e("../manager/PoolMgr"),
        n = e("../effect/BombLZ"),
        l = e("../manager/GameMgr"),
        s = e("../model/Player"),
        r = e("../utils/Utils"),
        p = e("../model/GiftData"),
        d = function(e) {
            function t() {
                var t = e.call(this) || this;
                return t.sp = new Laya.Image,
                t.text = new Laya.Label,
                t.hp = 100,
                t.gold = 0,
                t.line = 0,
                t.index = 0,
                t.die = !1,
                t.colorType = 0,
                t.attackedEffBol = !1,
                t.radius = l["default"].Instance.blockRadius,
                t.width = 2 * t.radius,
                t.height = 2 * t.radius,
                t.pivotX = t.pivotY = t.radius,
                t.init(),
                t
            }
            return __extends(t, e),
            t.prototype.init = function() {
                this.sp.loadImage(a["default"].PanelUrl + "block.png"),
                this.sp.width = this.width,
                this.sp.height = this.height,
                this.sp.pivotX = this.sp.pivotY = .5 * this.width,
                this.sp.x = this.sp.y = .5 * this.width,
                this.addChild(this.sp),
                this.text.fontSize = 30,
                this.text.width = this.width,
                this.text.height = this.height,
                this.text.font = "SimHei",
                this.text.color = "#24465b",
                this.text.bold = !0,
                this.text.valign = "middle",
                this.text.align = "center",
                this.text.pivotX = this.text.pivotY = this.radius,
                this.text.x = this.text.y = this.radius,
                this.text.text = r.utils.strShow(this.hp),
                this.addChild(this.text),
                this.rect = new Laya.Sprite,
                this.rect.loadImage(a["default"].PanelUrl + "zhangaiUi_bg.png"),
                this.addChildAt(this.rect, 0),
                this.rect.width = this.width,
                this.rect.height = this.height,
                this.rect.pivotX = this.radius,
                this.rect.pivotY = this.radius,
                this.rect.x = this.radius,
                this.rect.y = this.radius,
                this.rect.visible = !1
            },
            t.prototype.setSpColor = function(e) {
                this.colorType = Number(e),
                0 == this.colorType ? this.sp.loadImage(a["default"].PanelUrl + "block.png") : 1 == this.colorType && this.sp.loadImage(a["default"].PanelUrl + "redblock.png")
            },
            t.prototype.move = function() {
                l["default"].Instance.curBlockLevelData && (l["default"].Instance.curBlockLevelData.boss ? this.y += l["default"].Instance.curBlockLevelData.box_v * (1 - p["default"].bossBolckMove) : this.y += l["default"].Instance.curBlockLevelData.box_v * (1 + p["default"].blockMove))
            },
            t.prototype.hited = function(e) {
                return 1 == this.colorType && (e = Math.ceil(e * (1 - l["default"].Instance.blockHurtOff))),
                this.hp -= e,
                this.hp < 1 ? (this.clear(), !0) : (this.attackedEff(), this.text.changeText(r.utils.strShow(this.hp)), !1)
            },
            t.prototype.attackedEff = function() {
                var e = this;
                e.rect.visible || (e.rect.visible = !0),
                e.rect.alpha = .5,
                e.rect.scaleX = 1,
                e.rect.scaleY = 1,
                this.attackedEffBol || (this.attackedEffBol = !0, Laya.Tween.to(e.rect, {
                    alpha: 0,
                    scaleX: 1.3,
                    scaleY: 1.3
                },
                250, null, Laya.Handler.create(e,
                function() {
                    e.attackedEffBol = !1
                }), 0, !0, !0), Laya.Tween.to(e.sp, {
                    scaleX: .6,
                    scaleY: .6
                },
                100, null, Laya.Handler.create(e,
                function() {
                    Laya.Tween.to(e.sp, {
                        scaleX: 1,
                        scaleY: 1
                    },
                    150)
                }), 0, !0, !0))
            },
            t.prototype.deathEff = function() {
                var e = o.PoolMgr.getItem(a["default"].POOLNAME.BombLZ);
                e || (e = new n["default"]),
                e.init(new Laya.Point(this.x, this.y), 2, 2),
                l["default"].Instance.LevelLayer.addChild(e)
            },
            t.prototype.clear = function(e) {
                void 0 === e && (e = !0),
                this.die || (this.die = !0, e && (this.deathEff(), l["default"].Instance.curBlockLevelData && l["default"].Instance.curBlockLevelData.boss && (0 == this.colorType ? l["default"].Instance.killBlockNum += 1 : 1 == this.colorType && (l["default"].Instance.killRedBlockNum += 1)), a["default"].doubleGold_totalTime > 0 && (this.gold *= 5), this.gold = this.gold * (1 + p["default"].gold), s["default"].Instance.gold += this.gold, window.ystorage.setItem(a["default"].LocalStorage.user_gold, s["default"].Instance.gold.toString()), l["default"].Instance.LevelLayer.updateGold()), this.removeSelf(), o.PoolMgr.recover(a["default"].POOLNAME.Block, this))
            },
            t
        } (Laya.Sprite);
        i["default"] = d
    },
    {
        "../effect/BombLZ": 5,
        "../manager/GameMgr": 7,
        "../manager/PoolMgr": 10,
        "../model/GiftData": 14,
        "../model/Global": 15,
        "../model/Player": 17,
        "../utils/Utils": 30
    }],
    21 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../model/Global"),
        o = e("../manager/PoolMgr"),
        n = e("../model/MapData"),
        l = e("../manager/GameMgr"),
        s = e("../utils/Utils"),
        r = e("../manager/SoundMgr"),
        p = e("../model/GiftData"),
        d = function(e) {
            function t(t) {
                var i = e.call(this) || this;
                return i.speed = 0,
                i.angle = 0,
                i.radius = 6,
                i.lastAngle = -1e3,
                i.speedX = 0,
                i.speedY = 0,
                i.attack = 1,
                i.energy = 20,
                i.level = 0,
                i.trail = null,
                i.level = t,
                i.init(),
                i
            }
            return __extends(t, e),
            t.prototype.init = function() {
                var e = this.level - 1;
                this.level > a["default"].bulletConfigs.length && (e = a["default"].bulletConfigs.length - 1),
                Laya.loader.load(a["default"].bulletConfigs[e], Laya.Handler.create(this,
                function(e) {
                    this.texture = e,
                    this.radius = .5 * this.width,
                    this.pivotX = this.pivotY = this.radius
                }))
            },
            t.prototype.reset = function() {
                this.angle = 0,
                this.lastAngle = -1e3,
                this.speedX = 0,
                this.speedY = 0;
                var e = n["default"].BulletDic.getValue(this.level),
                t = 1;
                p["default"].crit > 0 && Math.random() <= p["default"].crit && (t = a["default"].critTimes),
                this.attack = e.attack * (1 + l["default"].Instance.techBulletAttack) * t,
                this.energy = e.energy + p["default"].tanshe,
                this.speed = e.speed * (1 + p["default"].speed)
            },
            t.prototype.forward = function() {
                this.angle != this.lastAngle && (this.lastAngle = this.angle, this.rotation = this.angle, this.speedX = this.speed * Math.sin(this.angle * s.utils.radian), this.speedY = -this.speed * Math.cos(this.angle * s.utils.radian)),
                this.x += this.speedX,
                this.y += this.speedY,
                this.trail && (this.trail.x = this.x, this.trail.y = this.y, this.trail.rotation = this.rotation)
            },
            t.prototype.changeAngle = function(e) {
                switch (l["default"].Instance.bulletSoundSpanAdd >= a["default"].bulletSoundSpan && (l["default"].Instance.bulletSoundSpanAdd = 0, r.SoundMgr.playSound(a["default"].SoundConfig.tanshe)), this.angle < 0 ? this.angle = 360 + this.angle: this.angle %= 360, e) {
                case n.COLLISIONDIR.Left:
                    this.angle > 180 && this.angle < 360 && (this.angle = 360 - this.angle);
                    break;
                case n.COLLISIONDIR.Top:
                    this.angle > 270 ? this.angle = 540 - this.angle: this.angle < 90 && (this.angle = 180 - this.angle);
                    break;
                case n.COLLISIONDIR.Right:
                    this.angle < 90 ? this.angle = 360 - this.angle: this.angle < 180 && (this.angle = 360 - this.angle);
                    break;
                case n.COLLISIONDIR.Bottom:
                    this.angle < 270 && (this.angle > 180 ? this.angle = 540 - this.angle: this.angle > 90 && (this.angle = 180 - this.angle));
                    break;
                case n.COLLISIONDIR.Back:
                    this.angle = (this.angle + 180) % 360
                }
                return this.energy--,
                this.energy <= 0 ? (this.clear(), !0) : !1
            },
            t.prototype.clear = function() {
                this.removeSelf(),
                o.PoolMgr.recover(a["default"].POOLNAME.Bullet + this.level, this),
                this.trail && (this.trail.clear(), this.trail = null)
            },
            t
        } (Laya.Sprite);
        i["default"] = d
    },
    {
        "../manager/GameMgr": 7,
        "../manager/PoolMgr": 10,
        "../manager/SoundMgr": 12,
        "../model/GiftData": 14,
        "../model/Global": 15,
        "../model/MapData": 16,
        "../utils/Utils": 30
    }],
    22 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../model/Global"),
        o = e("../manager/PoolMgr"),
        n = e("../manager/GameMgr"),
        l = function(e) {
            function t(t) {
                var i = e.call(this) || this;
                return i.n_scale = .8,
                i.initialPos = [],
                i.level = t,
                i.init(),
                i
            }
            return __extends(t, e),
            t.prototype.init = function() {
                var e = this.level - 1;
                this.level > a["default"].boomConfigs.length && (e = a["default"].boomConfigs.length - 1);
                var t = this;
                t.loadImage(a["default"].boomConfigs[e], Laya.Handler.create(t,
                function() {
                    t.pivotX = .5 * t.width,
                    t.pivotY = .5 * t.height,
                    t.scale(t.n_scale, t.n_scale)
                }))
            },
            t.prototype.clear = function() {
                o.PoolMgr.recover(a["default"].POOLNAME.CannonLevel + this.level, this),
                this.removeSelf();
                var e = n["default"].Instance.ComposeLayer.cannonArr.indexOf(this);
                n["default"].Instance.ComposeLayer.cannonArr.splice(e, 1);
                var t = n["default"].Instance.ComposeLayer.levelDic.getValue(this.level);
                t--,
                0 == t ? n["default"].Instance.ComposeLayer.levelDic.remove(this.level) : n["default"].Instance.ComposeLayer.levelDic.setValue(this.level, t),
                n["default"].Instance.ComposeLayer.setStorage(0, this.initialPos)
            },
            t
        } (Laya.Sprite);
        i["default"] = l
    },
    {
        "../manager/GameMgr": 7,
        "../manager/PoolMgr": 10,
        "../model/Global": 15
    }],
    23 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../model/Global"),
        o = e("../manager/PoolMgr"),
        n = function(e) {
            function t() {
                var t = e.call(this) || this;
                return t.init(),
                t
            }
            return __extends(t, e),
            t.prototype.init = function() {
                var e = this;
                this.loadImage(a["default"].PanelUrl + "trail.png", Laya.Handler.create(this,
                function() {
                    e.width *= .3,
                    e.height *= .5,
                    e.pivotX = .5 * e.width
                }))
            },
            t.prototype.clear = function() {
                this.removeSelf(),
                o.PoolMgr.recover(a["default"].POOLNAME.Trail, this)
            },
            t
        } (Laya.Sprite);
        i["default"] = n
    },
    {
        "../manager/PoolMgr": 10,
        "../model/Global": 15
    }],
    24 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("./Utils"),
        o = function() {
            function e(e) {
                this.table = {},
                this.nElements = 0,
                this.toStr = e || a.utils.defaultToString
            }
            return e.prototype.getValue = function(e) {
                var t = this.table["$" + this.toStr(e)];
                return a.utils.isUndefined(t) ? void 0 : t.value
            },
            e.prototype.setValue = function(e, t) {
                if (a.utils.isUndefined(e) || a.utils.isUndefined(t)) return void 0;
                var i, o = "$" + this.toStr(e),
                n = this.table[o];
                return a.utils.isUndefined(n) ? (this.nElements++, i = void 0) : i = n.value,
                this.table[o] = {
                    key: e,
                    value: t
                },
                i
            },
            e.prototype.remove = function(e) {
                var t = "$" + this.toStr(e),
                i = this.table[t];
                return a.utils.isUndefined(i) ? void 0 : (delete this.table[t], this.nElements--, i.value)
            },
            e.prototype.keys = function() {
                var e = [];
                for (var t in this.table) if (a.utils.has(this.table, t)) {
                    var i = this.table[t];
                    e.push(i.key)
                }
                return e
            },
            e.prototype.values = function() {
                var e = [];
                for (var t in this.table) if (a.utils.has(this.table, t)) {
                    var i = this.table[t];
                    e.push(i.value)
                }
                return e
            },
            e.prototype.forEach = function(e) {
                for (var t in this.table) if (a.utils.has(this.table, t)) {
                    var i = this.table[t],
                    o = e(i.key, i.value);
                    if (o === !1) return
                }
            },
            e.prototype.containsKey = function(e) {
                return ! a.utils.isUndefined(this.getValue(e))
            },
            e.prototype.clear = function() {
                this.table = {},
                this.nElements = 0
            },
            e.prototype.size = function() {
                return this.nElements
            },
            e.prototype.isEmpty = function() {
                return this.nElements <= 0
            },
            e.prototype.toString = function() {
                var e = "{";
                return this.forEach(function(t, i) {
                    e += "\n	" + t + " : " + i
                }),
                e + "\n}"
            },
            e
        } ();
        i.Dictionary = o
    },
    {
        "./Utils": 30
    }],
    25 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
            function e() {}
            return e.register = function(t, i, a) {
                var n = e.listeners[t];
                n || (e.listeners[t] = []),
                e.listeners[t].push(new o(i, a))
            },
            e.remove = function(t, i, a) {
                var o = e.listeners[t];
                if (o) {
                    for (var n = o.length,
                    l = 0; n > l; l++) {
                        var s = o[l];
                        if (s.compar(a)) {
                            o.splice(l, 1);
                            break
                        }
                    }
                    0 == o.length && delete e.listeners[t]
                }
            },
            e.fire = function(t) {
                for (var i = [], a = 1; a < arguments.length; a++) i[a - 1] = arguments[a];
                var o = e.listeners[t];
                if (o) for (var n = o.length,
                l = 0; n > l; l++) {
                    var s = o[l];
                    s.notify.apply(s, i.concat([t]))
                }
            },
            e.listeners = {},
            e
        } ();
        i.EventHelper = a;
        var o = function() {
            function e(e, t) {
                this.callback = null,
                this.context = null;
                var i = this;
                i.callback = e,
                i.context = t
            }
            return e.prototype.notify = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                var i, a = this; (i = a.callback).call.apply(i, [a.context].concat(e))
            },
            e.prototype.compar = function(e) {
                return e == this.context
            },
            e
        } ()
    },
    {}],
    26 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../manager/PoolMgr"),
        o = e("../model/Global"),
        n = e("../manager/GameMgr"),
        l = e("../model/Player"),
        s = e("../model/MapData"),
        r = function() {
            function e() {
                this.showGuide = !1,
                this.guideType = -1,
                this.inTime = !1,
                this.dieTimes = 0,
                this.init()
            }
            return e.prototype.init = function() {
                this.imgHand = new Laya.Sprite,
                this.imgHand.loadImage(o["default"].PanelUrl + "guideUi_hand.png"),
                this.imgHand.mouseEnabled = !1
            },
            e.prototype.checkShowFailGuide = function() {
                if (this.dieTimes++, this.dieTimes > 1) o["default"].doubleFire_totalTime > 0 ? o["default"].halfDifficult_totalTime <= 0 && this.setGuide(1) : this.setGuide(0);
                else {
                    this.timer || (this.timer = new Laya.Timer, this.timer.once(18e4, this, this.onTimer));
                    var e = Math.max(.16 * (60 - n["default"].Instance.curLevel), .2);
                    if (Math.random() <= e) {
                        var t = s["default"].BulletDic.getValue(n["default"].Instance.techBatteryLevel).gold,
                        i = Number(l["default"].Instance.techLevelArr[1]),
                        a = s["default"].UpgradeDic.getValue(i);
                        l["default"].Instance.gold >= 4 * t ? this.setGuide(2) : l["default"].Instance.gold >= a.fire_gold ? this.setGuide(3) : o["default"].doubleFire_totalTime > 0 ? o["default"].halfDifficult_totalTime <= 0 && this.setGuide(1) : this.setGuide(0)
                    }
                }
            },
            e.prototype.onTimer = function() {
                this.dieTimes = 0,
                this.timer = null
            },
            e.prototype.setGuide = function(e) {
                if (!this.showGuide) {
                    switch (this.showGuide = !0, this.guideType = e, this.timeLine = a.PoolMgr.getItem(o["default"].POOLNAME.TimeLine), this.timeLine || (this.timeLine = new Laya.TimeLine), this.timeLine.reset(), e) {
                    case 0:
                        this.imgHand.y = 309,
                        this.imgHand.x = 71,
                        this.imgHand.scaleX = .6,
                        this.imgHand.scaleY = .6,
                        this.imgHand.rotation = 0,
                        this.timeLine.to(this.imgHand, {
                            scaleX: .4,
                            scaleY: .4
                        },
                        1e3).to(this.imgHand, {
                            scaleX: .6,
                            scaleY: .6
                        },
                        1e3).play(0, !0);
                        break;
                    case 1:
                        this.imgHand.y = 395,
                        this.imgHand.x = 71,
                        this.imgHand.scaleX = .6,
                        this.imgHand.scaleY = .6,
                        this.imgHand.rotation = 0,
                        this.timeLine.to(this.imgHand, {
                            scaleX: .4,
                            scaleY: .4
                        },
                        1e3).to(this.imgHand, {
                            scaleX: .6,
                            scaleY: .6
                        },
                        1e3).play(0, !0);
                        break;
                    case 2:
                        this.imgHand.y = 493,
                        this.imgHand.x = 466,
                        this.imgHand.scaleX = -.6,
                        this.imgHand.scaleY = .6,
                        this.imgHand.rotation = 180,
                        this.timeLine.to(this.imgHand, {
                            scaleX: -.4,
                            scaleY: .4
                        },
                        1e3).to(this.imgHand, {
                            scaleX: -.6,
                            scaleY: .6
                        },
                        1e3).play(0, !0);
                        break;
                    case 3:
                        this.imgHand.y = 493,
                        this.imgHand.x = 645,
                        this.imgHand.scaleX = -.6,
                        this.imgHand.scaleY = .6,
                        this.imgHand.rotation = 180,
                        this.timeLine.to(this.imgHand, {
                            scaleX: -.4,
                            scaleY: .4
                        },
                        1e3).to(this.imgHand, {
                            scaleX: -.6,
                            scaleY: .6
                        },
                        1e3).play(0, !0);
                        break;
                    case 4:
                        this.imgHand.y = 223,
                        this.imgHand.x = 71,
                        this.imgHand.scaleX = .6,
                        this.imgHand.scaleY = .6,
                        this.imgHand.rotation = 0,
                        this.timeLine.to(this.imgHand, {
                            scaleX: .4,
                            scaleY: .4
                        },
                        1e3).to(this.imgHand, {
                            scaleX: .6,
                            scaleY: .6
                        },
                        1e3).play(0, !0)
                    }
                    n["default"].Instance.ComposeLayer.addChild(this.imgHand),
                    Laya.timer.once(3e4, this, this.clear, [this.guideType])
                }
            },
            e.prototype.clear = function(e) {
                this.showGuide && e == this.guideType && (this.showGuide = !1, this.guideType = -1, this.imgHand.removeSelf(), a.PoolMgr.recover(o["default"].POOLNAME.TimeLine, this.timeLine))
            },
            e
        } ();
        i["default"] = r
    },
    {
        "../manager/GameMgr": 7,
        "../manager/PoolMgr": 10,
        "../model/Global": 15,
        "../model/MapData": 16,
        "../model/Player": 17
    }],
    27 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../model/Global"),
        o = e("../model/Player"),
        n = e("../manager/GameMgr"),
        l = function() {
            function e() {
                this.init()
            }
            return e.prototype.init = function() {
                var e = window.ystorage.getItem(a["default"].LocalStorage.RampageDate),
                t = new Date,
                i = t.getFullYear().toString() + "," + (t.getMonth() + 1).toString() + "," + t.getDate().toString(),
                l = (new Date).getTime();
                if (e) if (e == i) {
                    if (o["default"].Instance.loginDays = Number(window.ystorage.getItem(a["default"].LocalStorage.LoginDays)), o["default"].Instance.haveRampageTimes = Number(window.ystorage.getItem(a["default"].LocalStorage.RampageHave)), o["default"].Instance.useRampageTimes = Number(window.ystorage.getItem(a["default"].LocalStorage.RampageNum)), o["default"].Instance.rampageVideoTimes = Number(window.ystorage.getItem(a["default"].LocalStorage.RampageVideoTimes)), o["default"].Instance.rampageWaitTimes = Number(window.ystorage.getItem(a["default"].LocalStorage.RampageWaitTimes)), o["default"].Instance.haveRampageTimes <= 0 && o["default"].Instance.useRampageTimes < a["default"].rampageSpanArr.length && o["default"].Instance.rampageWaitTimes < a["default"].rampageSpanArr.length - 2) {
                        var s = Number(a["default"].rampageSpanArr[o["default"].Instance.useRampageTimes]),
                        r = Number(window.ystorage.getItem(a["default"].LocalStorage.RampageTime)),
                        p = Math.floor(.001 * (l - r)),
                        d = s - p;
                        n["default"].Instance.giftPanel.rampageCountDown = d,
                        n["default"].Instance.giftPanel.rampageTotal = s,
                        n["default"].Instance.giftPanel.rampageCountDown <= 0 && n["default"].Instance.giftPanel.waitGet()
                    }
                    n["default"].Instance.giftPanel.startRampageTimer()
                } else {
                    var u = window.ystorage.getItem(a["default"].LocalStorage.LoginDays),
                    g = 0;
                    u && (g = Number(u)),
                    o["default"].Instance.loginDays = Number(g) + 1,
                    window.ystorage.setItem(a["default"].LocalStorage.LoginDays, o["default"].Instance.loginDays.toString()),
                    window.ystorage.setItem(a["default"].LocalStorage.RampageDate, i),
                    o["default"].Instance.useRampageTimes = 0,
                    window.ystorage.setItem(a["default"].LocalStorage.RampageNum, o["default"].Instance.useRampageTimes.toString()),
                    o["default"].Instance.haveRampageTimes = 0,
                    window.ystorage.setItem(a["default"].LocalStorage.RampageHave, o["default"].Instance.haveRampageTimes.toString()),
                    o["default"].Instance.rampageVideoTimes = 0,
                    window.ystorage.setItem(a["default"].LocalStorage.RampageVideoTimes, o["default"].Instance.rampageVideoTimes.toString()),
                    o["default"].Instance.rampageWaitTimes = 0,
                    window.ystorage.setItem(a["default"].LocalStorage.RampageWaitTimes, o["default"].Instance.rampageWaitTimes.toString()),
                    window.ystorage.setItem(a["default"].LocalStorage.RampageTime, l.toString()),
                    n["default"].Instance.giftPanel.rampageCountDown = Number(a["default"].rampageSpanArr[o["default"].Instance.useRampageTimes]),
                    n["default"].Instance.giftPanel.rampageTotal = n["default"].Instance.giftPanel.rampageCountDown,
                    n["default"].Instance.giftPanel.startRampageTimer()
                } else o["default"].Instance.loginDays = 1,
                window.ystorage.setItem(a["default"].LocalStorage.LoginDays, o["default"].Instance.loginDays.toString()),
                window.ystorage.setItem(a["default"].LocalStorage.RampageDate, i),
                o["default"].Instance.useRampageTimes = 0,
                window.ystorage.setItem(a["default"].LocalStorage.RampageNum, o["default"].Instance.useRampageTimes.toString()),
                o["default"].Instance.haveRampageTimes = 0,
                window.ystorage.setItem(a["default"].LocalStorage.RampageHave, o["default"].Instance.haveRampageTimes.toString()),
                o["default"].Instance.rampageVideoTimes = 0,
                window.ystorage.setItem(a["default"].LocalStorage.RampageVideoTimes, o["default"].Instance.rampageVideoTimes.toString()),
                o["default"].Instance.rampageWaitTimes = 0,
                window.ystorage.setItem(a["default"].LocalStorage.RampageWaitTimes, o["default"].Instance.rampageWaitTimes.toString()),
                window.ystorage.setItem(a["default"].LocalStorage.RampageTime, l.toString()),
                n["default"].Instance.giftPanel.rampageCountDown = Number(a["default"].rampageSpanArr[o["default"].Instance.useRampageTimes]),
                n["default"].Instance.giftPanel.rampageTotal = n["default"].Instance.giftPanel.rampageCountDown,
                n["default"].Instance.giftPanel.startRampageTimer()
            },
            e
        } ();
        i["default"] = l
    },
    {
        "../manager/GameMgr": 7,
        "../model/Global": 15,
        "../model/Player": 17
    }],
    28 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = Laya.Sprite,
        o = Laya.HitArea,
        n = e("../manager/GameMgr"),
        l = e("./TextUtils"),
        s = e("../model/Global"),
        r = e("../model/Player"),
        p = e("../model/MapData"),
        d = function(e) {
            function t() {
                var t = e.call(this) || this;
                t.buyTime = 0,
                t.guideSteps = [{
                    x: 239,
                    y: n["default"].Instance.ComposeLayer.y + 198,
                    width: 194,
                    height: 114,
                    tip1: "guide0",
                    tipx1: 0,
                    tipy1: n["default"].Instance.ComposeLayer.y - 70
                },
                {
                    x: 241,
                    y: n["default"].Instance.ComposeLayer.y + 80,
                    width: 290,
                    height: 233,
                    tip: "guide5",
                    tipx: 0,
                    tipy: n["default"].Instance.ComposeLayer.y - 120,
                    tip1: "guide1",
                    tipx1: 0,
                    tipy1: n["default"].Instance.ComposeLayer.y - 70,
                    good: "guide2",
                    goodx: 0,
                    goody: n["default"].Instance.ComposeLayer.y - 190
                },
                {
                    x: 231,
                    y: n["default"].Instance.ComposeLayer.y + 450,
                    width: 287,
                    height: 95,
                    tip: "guide6",
                    tipx: 0,
                    tipy: n["default"].Instance.ComposeLayer.y - 120,
                    tip1: "guide3",
                    tipx1: 0,
                    tipy1: n["default"].Instance.ComposeLayer.y - 70,
                    good: "guide4",
                    goodx: 0,
                    goody: n["default"].Instance.ComposeLayer.y - 190
                }];
                var i = new a;
                return i.alpha = .85,
                i.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000"),
                t.addChild(i),
                t.mask = i,
                t.interactionArea = new a,
                t.interactionArea.blendMode = "destination-out",
                t.addChild(t.interactionArea),
                t.sHitArea = new o,
                t.sHitArea.hit.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000"),
                t.hitArea = t.sHitArea,
                t.mouseEnabled = !0,
                t.labDes = new Laya.Label,
                t.labDes.fontSize = 40,
                t.labDes.color = "#ffffff",
                t.labDes.align = "center",
                t.labDes.width = 750,
                t.labDes1 = new Laya.Label,
                t.labDes1.fontSize = 40,
                t.labDes1.color = "#ffffff",
                t.labDes1.align = "center",
                t.labDes1.width = 750,
                t.labGood = new Laya.Label,
                t.labGood.fontSize = 60,
                t.labGood.color = "#ffdb6c",
                t.labGood.align = "center",
                t.labGood.width = 750,
                t.timeline = new Laya.TimeLine,
                t.imgHand = new a,
                t.imgHand.loadImage(s["default"].PanelUrl + "guideUi_hand.png"),
                t.imgHand.visible = !1,
                t
            }
            return __extends(t, e),
            t.prototype.nextStep = function() {
                var e = r["default"].Instance.showGuide;
                if (e >= this.guideSteps.length) {
                    if (r["default"].Instance.showGuide++, window.ystorage.setItem(s["default"].LocalStorage.guide, r["default"].Instance.showGuide.toString()), this.buyTime < 2 && r["default"].Instance.gold >= p["default"].BulletDic.getValue(1).gold && n["default"].Instance.ComposeLayer.cannonArr.length < 10) return void this.buyTime++;
                    this.timeline.destroy(),
                    this.removeSelf(),
                    n["default"].Instance.guide = null,
                    this.imgHand.removeSelf(),
                    this.labDes.removeSelf(),
                    this.labDes1.removeSelf(),
                    this.labGood.removeSelf(),
                    n["default"].Instance.successState = !1
                } else {
                    Laya.stage.addChild(this),
                    Laya.stage.addChild(this.imgHand),
                    Laya.stage.addChild(this.labDes),
                    Laya.stage.addChild(this.labDes1),
                    Laya.stage.addChild(this.labGood);
                    var t = this.guideSteps[e];
                    this.hitArea.unHit.clear(),
                    this.hitArea.unHit.drawRect(t.x + n["default"].Instance.ComposeLayer.x, t.y, t.width, t.height, "#000000"),
                    this.interactionArea.graphics.clear(),
                    this.interactionArea.graphics.drawRect(t.x + n["default"].Instance.ComposeLayer.x, t.y, t.width, t.height, "#000000"),
                    t.tip && (this.labDes.text = l["default"].getText(t.tip), this.labDes.pos(t.tipx + n["default"].Instance.ComposeLayer.x, t.tipy)),
                    t.tip1 && (this.labDes1.text = l["default"].getText(t.tip1), this.labDes1.pos(t.tipx1 + n["default"].Instance.ComposeLayer.x, t.tipy1)),
                    t.good && (this.labGood.text = l["default"].getText(t.good), this.labGood.pos(t.goodx + n["default"].Instance.ComposeLayer.x, t.goody)),
                    this.imgHand.visible = !0,
                    0 == e ? (this.imgHand.y = n["default"].Instance.ComposeLayer.y + 256, this.imgHand.x = 289 + n["default"].Instance.ComposeLayer.x, this.timeline.to(this.imgHand, {
                        x: 372 + n["default"].Instance.ComposeLayer.x
                    },
                    1e3).to(this.imgHand, {
                        x: 372 + n["default"].Instance.ComposeLayer.x
                    },
                    1e3).to(this.imgHand, {
                        x: 289 + n["default"].Instance.ComposeLayer.x
                    },
                    500).play(0, !0)) : 1 == e ? (this.imgHand.y = n["default"].Instance.ComposeLayer.y + 256, this.imgHand.x = 374 + n["default"].Instance.ComposeLayer.x, this.timeline.destroy(), this.timeline = new Laya.TimeLine, this.timeline.to(this.imgHand, {
                        y: n["default"].Instance.ComposeLayer.y + 115
                    },
                    1e3).to(this.imgHand, {
                        y: n["default"].Instance.ComposeLayer.y + 115
                    },
                    1e3).to(this.imgHand, {
                        y: n["default"].Instance.ComposeLayer.y + 256
                    },
                    500).play(0, !0)) : 2 == e && (window.drawerAd && window.drawerAd.close(), this.imgHand.y = n["default"].Instance.ComposeLayer.y + 493, this.imgHand.x = 466 + n["default"].Instance.ComposeLayer.x, this.imgHand.scaleX = -1, this.imgHand.rotation = 180, this.timeline = new Laya.TimeLine, this.timeline.to(this.imgHand, {
                        scaleX: -.8,
                        scaleY: .8
                    },
                    1e3).to(this.imgHand, {
                        scaleX: -1,
                        scaleY: 1
                    },
                    1e3).play(0, !0))
                }
            },
            t.prototype.hide = function() {
                r["default"].Instance.guideStop = !0,
                this.timeline.destroy(),
                this.removeSelf(),
                this.imgHand.removeSelf(),
                this.labDes.removeSelf(),
                this.labDes1.removeSelf(),
                this.labGood.removeSelf(),
                r["default"].Instance.showGuide++,
                window.ystorage.setItem(s["default"].LocalStorage.guide, r["default"].Instance.showGuide.toString()),
                n["default"].Instance.failUi.startShow()
            },
            t
        } (a);
        i["default"] = d
    },
    {
        "../manager/GameMgr": 7,
        "../model/Global": 15,
        "../model/MapData": 16,
        "../model/Player": 17,
        "./TextUtils": 29
    }],
    29 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../model/MapData"),
        o = function() {
            function e() {}
            return e.getText = function(e, t) {
                void 0 === t && (t = null);
                var i = a["default"].textDic.getValue(e),
                o = "";
                if (null == t) o = i;
                else for (var n = i.split("#"), l = n.length, s = t.length, r = 0; l > r; r++) o += n[r],
                s > r && (o += t[r]);
                return o
            },
            e
        } ();
        i["default"] = o
    },
    {
        "../model/MapData": 16
    }],
    30 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
            function e() {}
            return e.Shuffle = function(e) {
                for (var t = e.length,
                i = t - 1; i >= 0; i--) {
                    var a = Math.floor(Math.random() * t),
                    o = e[i];
                    e[i] = e[a],
                    e[a] = o
                }
                return e
            },
            e.cutstr = function(e, t) {
                var i = 0,
                a = 0,
                o = "";
                a = e.length;
                for (var n = 0; a > n; n++) {
                    var l = e.charAt(n);
                    if (i++, escape(l).length > 4 && i++, o = o.concat(l), i >= t) return o = o.concat("...")
                }
                return t > i ? e: void 0
            },
            e.rnd = function(e, t) {
                var i = Math.floor(Math.random() * (t - e + 1) + e);
                return i
            },
            e.has = function(t, i) {
                return e._hasOwnProperty.call(t, i)
            },
            e.defaultCompare = function(e, t) {
                return t > e ? -1 : e === t ? 0 : 1
            },
            e.defaultToString = function(t) {
                return null === t ? "COLLECTION_NULL": e.isUndefined(t) ? "COLLECTION_UNDEFINED": e.isString(t) ? "$s " + t: "$o " + t.toString()
            },
            e.makeString = function(t, i) {
                if (void 0 === i && (i = ","), null === t) return "COLLECTION_NULL";
                if (e.isUndefined(t)) return "COLLECTION_UNDEFINED";
                if (e.isString(t)) return t.toString();
                var a = "{",
                o = !0;
                for (var n in t) e.has(t, n) && (o ? o = !1 : a += i, a = a + n + ":" + t[n]);
                return a + "}"
            },
            e.isFunction = function(e) {
                return "function" == typeof e
            },
            e.isUndefined = function(e) {
                return "undefined" == typeof e
            },
            e.isString = function(e) {
                return "[object String]" === Object.prototype.toString.call(e)
            },
            e.dis = function(e, t, i, a) {
                return Math.sqrt(Math.pow(e - i, 2) + Math.pow(t - a, 2))
            },
            e.strShow = function(e) {
                e = Math.floor(e);
                var t = String(e),
                i = t.length;
                return i >= 4 && 7 > i ? t = t.substr(0, i - 3) + "K": i >= 7 && 10 > i ? t = t.substr(0, i - 6) + "B": i >= 10 && 13 > i ? t = t.substr(0, i - 9) + "KB": i >= 13 && 16 > i ? t = t.substr(0, i - 12) + "MB": i >= 16 && 19 > i ? t = t.substr(0, i - 15) + "GB": i >= 19 && 22 > i && (t = t.substr(0, i - 18) + "TB"),
                t
            },
            e.ParseTime2Format = function(e, t) {
                function i(e) {
                    var t = e.toString();
                    return 10 > e && (t = "0" + e),
                    t
                }
                void 0 === t && (t = "h:m:s");
                var a = Math.floor(e / 24 / 3600),
                o = Math.floor(e / 3600 % 24),
                n = Math.floor(e % 3600 / 60),
                l = e % 3600 % 60;
                return - 1 != t.indexOf("d") ? t = t.replace(/d/g, i(a)) : o += 24 * a,
                -1 != t.indexOf("h") ? t = t.replace(/h/g, i(o)) : n += 60 * o,
                -1 != t.indexOf("m") ? t = t.replace(/m/g, i(n)) : -1 != t.indexOf("h") ? l += 60 * n: l = e,
                -1 != t.indexOf("s") && (t = t.replace(/s/g, i(l))),
                t
            },
            e._hasOwnProperty = Object.prototype.hasOwnProperty,
            e.radian = Math.PI / 180,
            e
        } ();
        i.utils = a
    },
    {}],
    31 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../../../ui/layaMaxUI"),
        o = e("../../model/Global"),
        n = e("../../manager/WxApiMgr"),
        l = e("../../manager/SoundMgr"),
        s = e("../../utils/EventHelper"),
        r = e("../../model/Player"),
        p = e("../../utils/TextUtils"),
        d = e("../../manager/GameMgr"),
        u = e("../../model/MapData"),
        g = e("../../model/GiftData"),
        h = function(e) {
            function t(i) {
                var a = e.call(this) || this;
                a.isOntap = !1, 
                a.height = Laya.stage.height, 
                a.sp_box.y += o["default"].offsetY, 
                d["default"].Instance.pouseGame = !0, 
                t.Inst = a, a.type = i, a.btn_time1.text = "+" + o["default"].autoSynthesisTime / 60 + "M", a.btn_time2.text = "+" + o["default"].autoSynthesisTime / 60 + "M", a.btn_close.on(Laya.Event.CLICK, a, a.onClose), a.label_close.on(Laya.Event.CLICK, a, a.onClose), a.btn_autoCompose.visible = !1, a.btn_douGold.visible = !1, a.btn_douFire.visible = !1, a.btn_halfDifficult.visible = !1;
                switch (a.type) {
                case u.TimeType.AutoCompose:
                    a.labTitle.text = p["default"].getText("TimeType0"),
                    a.labDes.text = p["default"].getText("TimeType1"),
                    a.btn_autoCompose.visible = !0;
                    break;
                case u.TimeType.DoubleGold:
                    a.labTitle.text = p["default"].getText("TimeType2"),
                    a.labDes.text = p["default"].getText("TimeType3"),
                    a.btn_douGold.visible = !0;
                    break;
                case u.TimeType.DoubleFire:
                    a.labTitle.text = p["default"].getText("TimeType4"),
                    a.labDes.text = p["default"].getText("TimeType5"),
                    a.btn_douFire.visible = !0;
                    break;
                case u.TimeType.HalfDifficult:
                    a.labTitle.text = p["default"].getText("TimeType6"),
                    a.labDes.text = p["default"].getText("TimeType7"),
                    a.btn_halfDifficult.visible = !0
                }
                return a.btn_share.visible = !1,
                a.btn_watchVideo.visible = !0,
                a.btn_watchVideo.on(Laya.Event.CLICK, a, a.onWatchVideo),
                s.EventHelper.register(o["default"].CUSTOMEVENT.WatchADFinish, a.watchEnd, a),
                n["default"].showFullScreenAd(),
                console.log("ui.AutoComposeDialogUI"),
                a
            }
            return __extends(t, e),
            t.prototype.onWatchVideo = function() {
                if (!this.isOntap) if (l.SoundMgr.playSound(o["default"].SoundConfig.buttonClick), n["default"].Instance.aldSendEvent(this.labTitle.text, {
                    "点击按钮": "点击观看视频"
                }), o["default"].videoADID) switch (this.type) {
                case u.TimeType.AutoCompose:
                    r["default"].Instance.watchTypeNum(n.WATCHTYP.AutoCompose) ? n["default"].showRewardAd(n.WATCHTYP.AutoCompose) : this.setAutoStatus();
                    break;
                case u.TimeType.DoubleGold:
                    r["default"].Instance.watchTypeNum(n.WATCHTYP.DoubleGold) ? n["default"].showRewardAd(n.WATCHTYP.DoubleGold) : this.setDoubleGold();
                    break;
                case u.TimeType.DoubleFire:
                    r["default"].Instance.watchTypeNum(n.WATCHTYP.DoubleFire) ? n["default"].showRewardAd(n.WATCHTYP.DoubleFire) : this.setDoubleFire();
                    break;
                case u.TimeType.HalfDifficult:
                    r["default"].Instance.watchTypeNum(n.WATCHTYP.HalfDifficult) ? n["default"].showRewardAd(n.WATCHTYP.HalfDifficult) : this.setHalfDifficult()
                } else switch (this.isOntap = !0, this.type) {
                case u.TimeType.AutoCompose:
                    this.setAutoStatus();
                    break;
                case u.TimeType.DoubleGold:
                    this.setDoubleGold();
                    break;
                case u.TimeType.DoubleFire:
                    this.setDoubleFire();
                    break;
                case u.TimeType.HalfDifficult:
                    this.setHalfDifficult()
                }
            },
            t.prototype.setAutoStatus = function() {
                var e = o["default"].autoSynthesisTime + g["default"].autoCompose;
                n["default"].showToast(this.labTitle.text + " time +" + e / 60 + "M"),
                o["default"].autoSynthesis_totalTime += e,
                o["default"].isAutoSynthesis = !0,
                this.close(),
                this.clear(),
                d["default"].Instance.ComposeLayer.setAutoComposeCountdown()
            },
            t.prototype.setDoubleGold = function() {
                n["default"].showToast(this.labTitle.text + " time +" + o["default"].autoSynthesisTime / 60 + "M"),
                o["default"].doubleGold_totalTime += o["default"].autoSynthesisTime,
                this.close(),
                this.clear(),
                d["default"].Instance.ComposeLayer.setDoubleGoldCountdown()
            },
            t.prototype.setDoubleFire = function() {
                n["default"].showToast(this.labTitle.text + " time +" + o["default"].autoSynthesisTime / 60 + "M"),
                o["default"].doubleFire_totalTime += o["default"].autoSynthesisTime,
                this.close(),
                this.clear(),
                d["default"].Instance.ComposeLayer.setDoubleFireCountdown()
            },
            t.prototype.setHalfDifficult = function() {
                n["default"].showToast(this.labTitle.text + " time +" + o["default"].autoSynthesisTime / 60 + "M"),
                o["default"].halfDifficult_totalTime += o["default"].autoSynthesisTime,
                this.close(),
                this.clear(),
                d["default"].Instance.ComposeLayer.setHalfDifficultCountdown()
            },
            t.prototype.watchEnd = function(e, t) {
                if (this.isOntap = !1, 0 == e) switch (n["default"].Instance.aldSendEvent(this.labTitle.text, {
                    "点击按钮": "成功获得" + this.labTitle.text + "视频"
                }), t) {
                case n.WATCHTYP.AutoCompose:
                    this.setAutoStatus();
                    break;
                case n.WATCHTYP.DoubleGold:
                    this.setDoubleGold();
                    break;
                case n.WATCHTYP.DoubleFire:
                    this.setDoubleFire();
                    break;
                case n.WATCHTYP.HalfDifficult:
                    this.setHalfDifficult()
                } else 1 == e ? n["default"].showToast(p["default"].getText("16")) : 2 == e && n["default"].showToast(p["default"].getText("loadFail"))
            },
            t.prototype.onClose = function() {
                l.SoundMgr.playSound(o["default"].SoundConfig.buttonClick),
                n["default"].Instance.aldSendEvent(this.labTitle.text, {
                    "点击按钮": "关闭"
                }),
                this.close(),
                this.clear()
            },
            t.prototype.clear = function() {
                d["default"].Instance.pouseGame = !1,
                // n["default"].hideBanner(),
                this.btn_watchVideo.off(Laya.Event.CLICK, this, this.onWatchVideo),
                this.btn_share.off(Laya.Event.CLICK, this, this.onWatchVideo),
                this.btn_close.off(Laya.Event.CLICK, this, this.onClose),
                this.label_close.off(Laya.Event.CLICK, this, this.onClose),
                s.EventHelper.remove(o["default"].CUSTOMEVENT.WatchADFinish, this.watchEnd, this)
            },
            t
        } (a.ui.AutoComposeDialogUI);
        i["default"] = h
    },
    {
        "../../../ui/layaMaxUI": 51,
        "../../manager/GameMgr": 7,
        "../../manager/SoundMgr": 12,
        "../../manager/WxApiMgr": 13,
        "../../model/GiftData": 14,
        "../../model/Global": 15,
        "../../model/MapData": 16,
        "../../model/Player": 17,
        "../../utils/EventHelper": 25,
        "../../utils/TextUtils": 29
    }],
    32 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../../../ui/layaMaxUI"),
        o = e("../../manager/SoundMgr"),
        n = e("../../model/Global"),
        l = e("../../model/GiftData"),
        s = e("../../manager/GameMgr"),
        r = e("../../manager/WxApiMgr"),
        p = e("../../utils/TextUtils"),
        d = e("../../model/Player"),
        u = e("../../utils/EventHelper"),
        g = e("./GiftInfoDialog"),
        h = function(e) {
            function t(t) {
                var i = e.call(this) || this;
                return i.type = 0,
                i.leftTimes = 0,
                i.type = t,
                i.init(),
                i
            }
            return __extends(t, e),
            t.prototype.init = function() {
                this.autoDestroyAtClosed = !0,
                this.height = Laya.stage.height,
                this.sp_box.y += n["default"].offsetY,
                this.btn_close.on(Laya.Event.CLICK, this, this.onClose),
                this.label_close.on(Laya.Event.CLICK, this, this.onClose),
                this.labLV.visible = !1,
                this.imgIcon.on(Laya.Event.CLICK, this, this.onIconClick),
                0 == this.type || 2 == this.type ? (this.btn_Get.visible = !0, this.btnGetShare.visible = !1, this.btnGetVideo.visible = !1, this.labDes.text = p["default"].getText("Gift0"), this.btn_Get.on(Laya.Event.CLICK, this, this.onGet), this.giftBagData = l["default"].getRamGift(), this.imgIcon.skin = n["default"].GiftUrl + "kejiui_hexin_" + this.giftBagData.type.toString() + ".png", this.labDes1.visible = !1) : 1 == this.type && (this.labDes1.visible = !0, this.leftTimes = n["default"].giftVideoNum - d["default"].Instance.rampageVideoTimes, console.log("this.leftTimes  ", this.leftTimes), this.labDes.text = p["default"].getText("Gift1", [this.leftTimes.toString()]), this.btn_Get.visible = !1, this.btnGetShare.visible = !1, Laya.Browser.window.h5api.canPlayAd() ? this.btnGetVideo.visible = !0 : this.btnGetVideo.visible = !1, this.btnGetVideo.on(Laya.Event.CLICK, this, this.onGetVideo), u.EventHelper.register(n["default"].CUSTOMEVENT.WatchADFinish, this.watchEnd, this));
                r["default"].showFullScreenAd(),
                console.log("ui.GetGiftDialogUI")
            },
            t.prototype.onIconClick = function() {
                if (o.SoundMgr.playSound(n["default"].SoundConfig.buttonClick), 1 == this.type) r["default"].showToast(p["default"].getText("Gift9"));
                else {
                    var e = new g["default"](this.giftBagData, 2);
                    e.popup()
                }
            },
            t.prototype.onGet = function() {
                r["default"].Instance.aldSendEvent("天赋礼包", {
                    "点击按钮": "直接领取"
                }),
                this.onClose()
            },
            t.prototype.getSuccess = function() { (0 == this.type || 2 == this.type) && (this.giftBagData.belong = 1, s["default"].Instance.giftPanel.handleBag(this.giftBagData, 0), 0 == this.type && s["default"].Instance.giftPanel.getReturn(), r["default"].showToast(p["default"].getText("GetSuccess")))
            },
            t.prototype.onGetVideo = function() {
                r["default"].Instance.aldSendEvent("天赋礼包", {
                    "点击按钮": "观看视频"
                }),
                o.SoundMgr.playSound(n["default"].SoundConfig.buttonClick),
                this.leftTimes > 0 ? n["default"].videoADID ? d["default"].Instance.watchTypeNum(r.WATCHTYP.GetGift) ? r["default"].showRewardAd(r.WATCHTYP.GetGift) : s["default"].Instance.giftPanel.videoGet() : this.close() : r["default"].showToast(p["default"].getText("Gift6"))
            },
            t.prototype.watchEnd = function(e, t) {
                0 == e && (t == r.WATCHTYP.GetGift ? (s["default"].Instance.giftPanel.videoGet(), this.onClose()) : 1 == e ? r["default"].showToast(p["default"].getText("16")) : 2 == e && r["default"].showToast(p["default"].getText("loadFail")))
            },
            t.prototype.onClose = function() {
                o.SoundMgr.playSound(n["default"].SoundConfig.buttonClick),
                this.btn_close.off(Laya.Event.CLICK, this, this.onClose),
                this.label_close.off(Laya.Event.CLICK, this, this.onClose),
                this.btnGetVideo.off(Laya.Event.CLICK, this, this.onGetVideo),
                u.EventHelper.remove(n["default"].CUSTOMEVENT.WatchADFinish, this.watchEnd, this),
                // r["default"].hideBanner(),
                this.getSuccess(),
                this.close()
            },
            t
        } (a.ui.GetGiftDialogUI);
        i["default"] = h
    },
    {
        "../../../ui/layaMaxUI": 51,
        "../../manager/GameMgr": 7,
        "../../manager/SoundMgr": 12,
        "../../manager/WxApiMgr": 13,
        "../../model/GiftData": 14,
        "../../model/Global": 15,
        "../../model/Player": 17,
        "../../utils/EventHelper": 25,
        "../../utils/TextUtils": 29,
        "./GiftInfoDialog": 35
    }],
    33 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../../../ui/layaMaxUI"),
        o = e("../../model/Player"),
        n = e("../../model/Global"),
        l = e("../../model/MapData"),
        s = e("../../manager/GameMgr"),
        r = e("../../utils/Utils"),
        p = e("../../manager/WxApiMgr"),
        d = e("../../utils/EventHelper"),
        u = e("../../utils/TextUtils"),
        g = e("../../manager/PoolMgr"),
        h = e("../../effect/BombLZ"),
        c = e("../../manager/SoundMgr"),
        f = function(e) {
            function t() {
                var t = e.call(this) || this;
                return t.isOntap = !1,
                t.init(),
                t
            }
            return __extends(t, e),
            t.prototype.init = function() {
                this.height = Laya.stage.height,
                this.sp_box.y += n["default"].offsetY,
                t.Inst = this,
                s["default"].Instance.successState = !0,
                this.num = n["default"].getGoldNum - o["default"].Instance.todayGetGoldNum,
                this.text_num.text = "今日免费：" + this.num + "次",
                this.text_num.visible = !1;
                var e = r.utils.strShow(l["default"].GetGoldDic.getValue(s["default"].Instance.curLevel).gold);
                this.text_gold.text = "+" + e,
                this.btn_close.on(Laya.Event.CLICK, this, this.onClose),
                this.label_close.on(Laya.Event.CLICK, this, this.onClose),
                this.btn_surplusNum_share.visible = !1,
                Laya.Browser.window.h5api.canPlayAd() ? this.btn_surplusNum_video.visible = !0 : this.btn_surplusNum_video.visible = !1,
                this.btn_surplusNum_video.on(Laya.Event.CLICK, this, this.onWatchVideo),
                d.EventHelper.register(n["default"].CUSTOMEVENT.WatchADFinish, this.watchEnd, this)
                console.log("ui.GetGoldDialogUI")
            },
            t.prototype.onWatchVideo = function() {
                return this.isOntap ? void 0 : (c.SoundMgr.playSound(n["default"].SoundConfig.buttonClick), p["default"].Instance.aldSendEvent("获取金币", {
                    "点击按钮": "点击视频按钮"
                }), this.num <= 0 ? void p["default"].showToast(u["default"].getText("getGold")) : void(n["default"].videoADID ? o["default"].Instance.watchTypeNum(p.WATCHTYP.GetGold) ? p["default"].showRewardAd(p.WATCHTYP.GetGold) : this.getGoldSucc() : (this.isOntap = !0, this.getGoldSucc())))
            },
            t.prototype.watchEnd = function(e, t) {
                t == p.WATCHTYP.GetGold && (this.isOntap = !1, 0 == e ? (p["default"].Instance.aldSendEvent("获取金币", {
                    "点击按钮": "成功获取视频"
                }), this.getGoldSucc()) : 1 == e ? (p["default"].Instance.aldSendEvent("获取金币", {
                    "点击按钮": "失败获取视频"
                }), p["default"].showToast(u["default"].getText("3"))) : 2 == e && p["default"].showToast(u["default"].getText("loadFail")))
            },
            t.prototype.getGoldSucc = function() {
                this.isOntap = !1,
                o["default"].Instance.todayGetGoldNum++,
                o["default"].Instance.todayGetGoldNum >= n["default"].getGoldNum && (o["default"].Instance.todayGetGoldNum = n["default"].getGoldNum),
                s["default"].Instance.getGoldNumLocalData(),
                o["default"].Instance.gold += l["default"].GetGoldDic.getValue(s["default"].Instance.curLevel).gold,
                window.ystorage.setItem(n["default"].LocalStorage.user_gold, o["default"].Instance.gold.toString()),
                s["default"].Instance.LevelLayer.updateGold(),
                this.onClose(),
                this.goldEff()
            },
            t.prototype.goldEff = function() {
                var e = g.PoolMgr.getItem(n["default"].POOLNAME.BombLZ);
                e || (e = new h["default"]),
                e.init(new Laya.Point(this.btn_surplusNum_video.x, this.btn_surplusNum_video.y), 2, 2),
                Laya.stage.addChild(e),
                p["default"].showToast(u["default"].getText("12", [l["default"].GetGoldDic.getValue(s["default"].Instance.curLevel).gold.toString()]))
            },
            t.prototype.onClose = function() {
                this.isOntap || (c.SoundMgr.playSound(n["default"].SoundConfig.buttonClick), this.close(), s["default"].Instance.successState = !1, this.btn_surplusNum_video.off(Laya.Event.CLICK, this, this.onWatchVideo), d.EventHelper.remove(n["default"].CUSTOMEVENT.WatchADFinish, this.watchEnd, this), this.btn_close.off(Laya.Event.CLICK, this, this.onClose), this.label_close.off(Laya.Event.CLICK, this, this.onClose))
                p["default"].showFullScreenAd()
            },
            t
        } (a.ui.GetGoldDialogUI);
        i["default"] = f
    },
    {
        "../../../ui/layaMaxUI": 51,
        "../../effect/BombLZ": 5,
        "../../manager/GameMgr": 7,
        "../../manager/PoolMgr": 10,
        "../../manager/SoundMgr": 12,
        "../../manager/WxApiMgr": 13,
        "../../model/Global": 15,
        "../../model/MapData": 16,
        "../../model/Player": 17,
        "../../utils/EventHelper": 25,
        "../../utils/TextUtils": 29,
        "../../utils/Utils": 30
    }],
    34 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../../../ui/layaMaxUI"),
        o = e("../../utils/TextUtils"),
        n = e("../../model/Global"),
        l = function(e) {
            function t(t) {
                var i = e.call(this) || this;
                return i.autoDestroyAtClosed = !0,
                i.type = t,
                i.init(),
                i
            }
            return __extends(t, e),
            t.prototype.init = function() {
                var e = this,
                t = "";
                1 == this.type ? (this.labTitle.text = o["default"].getText("14"), t = n["default"].PanelUrl + "GunmountUI_1.png") : 2 == this.type && (this.labTitle.text = o["default"].getText("15"), t = n["default"].PanelUrl + "upgradeIcon.png"),
                this.imgBattery.loadImage(t, Laya.Handler.create(this,
                function() {
                    e.imgBattery.pivotX = .5 * e.imgBattery.width,
                    e.imgBattery.pivotY = .5 * e.imgBattery.height,
                    e.imgBattery.x = e.imgGlow.x,
                    e.imgBattery.y = 590
                }))
            },
            t.prototype.close = function() {
                e.prototype.close.call(this)
            },
            t
        } (a.ui.GetNewDialogUI);
        i["default"] = l
    },
    {
        "../../../ui/layaMaxUI": 51,
        "../../model/Global": 15,
        "../../utils/TextUtils": 29
    }],
    35 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../../../ui/layaMaxUI"),
        o = e("../../manager/SoundMgr"),
        n = e("../../model/Global"),
        l = e("../../manager/GameMgr"),
        s = e("../../utils/TextUtils"),
        r = e("../../model/MapData"),
        p = e("../../manager/PoolMgr"),
        d = e("../../effect/BombLZ"),
        u = e("../../manager/WxApiMgr"),
        g = function(e) {
            function t(t, i) {
                var a = e.call(this) || this;
                return a.giftBagData = t,
                a.type = i,
                a.init(),
                a
            }
            return __extends(t, e),
            t.prototype.init = function() {
                this.height = Laya.stage.height,
                this.sp_box.y += n["default"].offsetY,
                this.autoDestroyAtClosed = !0,
                this.btn_close.on(Laya.Event.CLICK, this, this.onClose),
                this.btn_On.on(Laya.Event.CLICK, this, this.onEquip),
                this.btn_Off.on(Laya.Event.CLICK, this, this.onPutOff),
                this.btn_decompose.on(Laya.Event.CLICK, this, this.onDecompose),
                this.btnHelp.on(Laya.Event.CLICK, this, this.onHelp),
                this.info_btn_close.on(Laya.Event.CLICK, this, this.offHelp),
                0 == this.type ? (this.btn_Off.visible = !1, this.btn_On.visible = !0) : 1 == this.type ? (this.btn_Off.visible = !0, this.btn_On.visible = !1) : 2 == this.type && (this.btn_Off.visible = !1, this.btn_On.visible = !1, this.btn_decompose.visible = !1),
                this.sp_Info.visible = !1,
                this.infoBg.visible = !1,
                this.labLV.text = "Lv:" + this.giftBagData.color.toString(),
                this.imgIcon.skin = n["default"].GiftUrl + "kejiui_hexin_" + this.giftBagData.type.toString() + ".png";
                var e = 1,
                t = 0;
                2 == this.giftBagData.type || 8 == this.giftBagData.type ? (e = .01, t = Math.floor(this.giftBagData.effect * e)) : t = this.giftBagData.effect * e,
                this.labDes.text = s["default"].getText("GiftDes" + this.giftBagData.type.toString(), [t.toString()]);
                for (var i, a, o = 0,
                l = this.imgInfo.numChildren,
                p = 0; l > p; p++) i = this.imgInfo.getChildAt(p),
                o = 1e3 * this.giftBagData.type + p + 1,
                a = r["default"].GiftAttrDic.getValue(o),
                a ? (i.visible = !0, i.text = s["default"].getText("GiftColorDes" + this.giftBagData.type.toString(), [(p + 1).toString(), (a.min * e).toString(), (a.max * e).toString()])) : i.visible = !1;
                console.log("ui.GiftInfoDialogUI")
            },
            t.prototype.onEquip = function() {
                o.SoundMgr.playSound(n["default"].SoundConfig.buttonClick),
                l["default"].Instance.giftPanel.handleBag(this.giftBagData, 1),
                this.close()
            },
            t.prototype.onPutOff = function() {
                o.SoundMgr.playSound(n["default"].SoundConfig.buttonClick),
                l["default"].Instance.giftPanel.handleBag(this.giftBagData, 2),
                this.close()
            },
            t.prototype.onDecompose = function() {
                o.SoundMgr.playSound(n["default"].SoundConfig.buttonClick),
                l["default"].Instance.giftPanel.handleBag(this.giftBagData, 3),
                this.deathEff(),
                this.close()
            },
            t.prototype.onClose = function() {
                o.SoundMgr.playSound(n["default"].SoundConfig.buttonClick),
                this.close()
            },
            t.prototype.onHelp = function() {
                this.sp_Info.visible = !0,
                this.infoBg.visible = !0
            },
            t.prototype.offHelp = function() {
                this.sp_Info.visible = !1,
                this.infoBg.visible = !1
            },
            t.prototype.close = function() {
                e.prototype.close.call(this),
                this.btn_close.off(Laya.Event.CLICK, this, this.onClose),
                this.btn_On.off(Laya.Event.CLICK, this, this.onEquip),
                this.btn_Off.off(Laya.Event.CLICK, this, this.onPutOff),
                this.btn_decompose.off(Laya.Event.CLICK, this, this.onDecompose),
                this.btnHelp.off(Laya.Event.CLICK, this, this.onHelp),
                this.info_btn_close.off(Laya.Event.CLICK, this, this.offHelp)
                // u["default"].hideBanner()
            },
            t.prototype.deathEff = function() {
                var e = p.PoolMgr.getItem(n["default"].POOLNAME.BombLZ);
                e || (e = new d["default"]);
                var t = this.imgBg.x,
                i = this.sp_box.y + this.imgBg.y;
                e.init(new Laya.Point(t, i), 2, 2),
                Laya.stage.addChild(e)
            },
            t
        } (a.ui.GiftInfoDialogUI);
        i["default"] = g
    },
    {
        "../../../ui/layaMaxUI": 51,
        "../../effect/BombLZ": 5,
        "../../manager/GameMgr": 7,
        "../../manager/PoolMgr": 10,
        "../../manager/SoundMgr": 12,
        "../../manager/WxApiMgr": 13,
        "../../model/Global": 15,
        "../../model/MapData": 16,
        "../../utils/TextUtils": 29
    }],
    36 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../../../ui/layaMaxUI"),
        o = e("../../model/Global"),
        n = e("../../manager/WxApiMgr"),
        l = e("../../utils/Utils"),
        s = e("../../model/MapData"),
        r = e("../../model/Player"),
        p = e("../../utils/EventHelper"),
        d = e("../../manager/SoundMgr"),
        u = e("../../manager/GameMgr"),
        g = e("../../utils/TextUtils"),
        h = e("../../manager/PoolMgr"),
        c = e("../../effect/BombLZ"),
        f = function(e) {
            function t(i) {
                var a = e.call(this) || this;
                a.isOntap = !1,
                a.height = Laya.stage.height,
                a.sp_box.y += o["default"].offsetY,
                t.Inst = a,
                u["default"].Instance.successState = !0,
                a.level = i;
                var r = String(i).charAt(String(i).length - 1),
                d = a.level - 1;
                a.level > o["default"].boomConfigs.length && (d = o["default"].boomConfigs.length - 1);
                var g = a;
                g.img_battery.loadImage(o["default"].boomConfigs[d], Laya.Handler.create(g,
                function() {
                    g.img_battery.pivotX = .5 * g.img_battery.width,
                    g.img_battery.pivotY = .5 * g.img_battery.height,
                    g.img_battery.x = .5 * g.lightBox.width,
                    g.img_battery.y = .5 * g.lightBox.height
                }));
                var h = (Number(r) + 5) / 15;
                return a.img_pro.width = (a.img_total.width - 2 * a.img_pro.x) * h,
                a.text_gold.text = l.utils.strShow(2 * s["default"].LockBatteryDic.getValue(i).gold),
                a.text_gold1.text = l.utils.strShow(2 * s["default"].LockBatteryDic.getValue(i).gold),
                a.btn_close.on(Laya.Event.CLICK, a, a.onClose),
                a.label_close.on(Laya.Event.CLICK, a, a.onClose),
                a.btn_double_share.visible = !1,
                Laya.Browser.window.h5api.canPlayAd() ? a.btn_double_video.visible = !0 : a.btn_double_video.visible = !1,
                a.btn_double_video.on(Laya.Event.CLICK, a, a.onWatchVideo),
                p.EventHelper.register(o["default"].CUSTOMEVENT.WatchADFinish, a.watchEnd, a),
                n["default"].showFullScreenAd(),
                console.log("ui.NewBatteryDialogUI"),
                a
            }
            return __extends(t, e),
            t.prototype.onWatchVideo = function() {
                this.isOntap || (d.SoundMgr.playSound(o["default"].SoundConfig.buttonClick), n["default"].Instance.aldSendEvent("解锁新装甲", {
                    "点击按钮": "点击视频按钮"
                }), o["default"].videoADID && r["default"].Instance.watchTypeNum(n.WATCHTYP.NewBattery_Gold) ? n["default"].showRewardAd(n.WATCHTYP.NewBattery_Gold) : this.getGoldSucc(2))
            },
            t.prototype.watchEnd = function(e, t) {
                t == n.WATCHTYP.NewBattery_Gold && (0 == e ? (n["default"].Instance.aldSendEvent("解锁新装甲", {
                    "点击按钮": "成功获取视频"
                }), this.getGoldSucc(2)) : 1 == e ? (n["default"].Instance.aldSendEvent("解锁新装甲", {
                    "点击按钮": "失败获取视频"
                }), n["default"].showToast(g["default"].getText("3"))) : 2 == e && n["default"].showToast(g["default"].getText("loadFail")))
            },
            t.prototype.goldEff = function() {
                var e = h.PoolMgr.getItem(o["default"].POOLNAME.BombLZ);
                e || (e = new c["default"]),
                e.init(new Laya.Point(this.btn_double_video.x, this.btn_double_video.y), 2, 2),
                u["default"].Instance.LevelLayer.addChild(e)
            },
            t.prototype.getGoldSucc = function(e) {
                n["default"].showToast(g["default"].getText("12", [(s["default"].LockBatteryDic.getValue(this.level).gold * e).toString()])),
                r["default"].Instance.gold += s["default"].LockBatteryDic.getValue(this.level).gold * e,
                window.ystorage.setItem(o["default"].LocalStorage.user_gold, r["default"].Instance.gold.toString()),
                u["default"].Instance.LevelLayer.updateGold(),
                this.clear(),
                this.goldEff()
            },
            t.prototype.onClose = function() {
                d.SoundMgr.playSound(o["default"].SoundConfig.buttonClick),
                n["default"].Instance.aldSendEvent("解锁新装甲", {
                    "点击按钮": "放弃福利"
                }),
                this.getGoldSucc(1)
            },
            t.prototype.clear = function() {
                this.close(),
                u["default"].Instance.successState = !1,
                this.btn_close.off(Laya.Event.CLICK, this, this.onClose),
                this.label_close.off(Laya.Event.CLICK, this, this.onClose),
                this.btn_double_video.off(Laya.Event.CLICK, this, this.onWatchVideo),
                p.EventHelper.remove(o["default"].CUSTOMEVENT.WatchADFinish, this.watchEnd, this)
                // n["default"].hideBanner()
            },
            t
        } (a.ui.NewBatteryDialogUI);
        i["default"] = f
    },
    {
        "../../../ui/layaMaxUI": 51,
        "../../effect/BombLZ": 5,
        "../../manager/GameMgr": 7,
        "../../manager/PoolMgr": 10,
        "../../manager/SoundMgr": 12,
        "../../manager/WxApiMgr": 13,
        "../../model/Global": 15,
        "../../model/MapData": 16,
        "../../model/Player": 17,
        "../../utils/EventHelper": 25,
        "../../utils/TextUtils": 29,
        "../../utils/Utils": 30
    }],
    37 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../../../ui/layaMaxUI"),
        o = e("../../manager/GameMgr"),
        n = e("../../utils/Utils"),
        l = e("../../model/Player"),
        s = e("../../utils/EventHelper"),
        r = e("../../model/Global"),
        p = e("../../manager/SoundMgr"),
        d = e("../../manager/WxApiMgr"),
        u = e("../../utils/TextUtils"),
        g = e("../../manager/PoolMgr"),
        h = e("../../effect/BombLZ"),
        c = e("../../model/MapData"),
        f = function(e) {
            function t() {
                var t = e.call(this) || this;
                return t.init(),
                t
            }
            return __extends(t, e),
            t.prototype.init = function() {
                o["default"].Instance.pouseGame = !0,
                this.autoDestroyAtClosed = !0,
                this.labTitle.text = u["default"].getText("7"),
                this.labDes.text = u["default"].getText("8"),
                this.labThree.text = u["default"].getText("9"),
                this.labThree1.text = u["default"].getText("9"),
                this.btnGet.text = u["default"].getText("10");
                var e = Math.floor(o["default"].Instance.offlineGold * c["default"].OfflineDic.getValue(l["default"].Instance.maxLevel) * (1 + o["default"].Instance.techOffLineSpeed + 2));
                this.labGold.text = n.utils.strShow(e);
                var t = .6 * this.iconGold.width + 10;
                this.labGold.x = .5 * (this.width - this.labGold.width + t),
                this.iconGold.x = this.labGold.x - t,
                this.btnGet.on(Laya.Event.CLICK, this, this.onGet),
                this.btnThreeGetShare.visible = !1,
                Laya.Browser.window.h5api.canPlayAd() ? this.btnThreeGetVideo.visible = !0 : this.btnThreeGetVideo.visible = !1,
                this.btnThreeGetVideo.on(Laya.Event.CLICK, this, this.onThreeGetVideo),
                s.EventHelper.register(r["default"].CUSTOMEVENT.WatchADFinish, this.watchEnd, this),
                console.log("ui.OfflineDialogUI")
            },
            t.prototype.onGet = function() {
                d["default"].Instance.aldSendEvent("离线收益", {
                    "点击按钮": "放弃福利"
                }),
                p.SoundMgr.playSound(r["default"].SoundConfig.buttonClick);
                var e = Math.floor(o["default"].Instance.offlineGold * c["default"].OfflineDic.getValue(l["default"].Instance.maxLevel) * (1 + o["default"].Instance.techOffLineSpeed));
                l["default"].Instance.gold += e,
                o["default"].Instance.LevelLayer.updateGold(),
                d["default"].showToast(u["default"].getText("12", [e.toString()])),
                this.close()
            },
            t.prototype.onThreeGetVideo = function() {
                d["default"].Instance.aldSendEvent("离线收益", {
                    "点击按钮": "观看视频"
                }),
                p.SoundMgr.playSound(r["default"].SoundConfig.buttonClick),
                r["default"].videoADID && l["default"].Instance.watchTypeNum(d.WATCHTYP.OfflineGold) ? d["default"].showRewardAd(d.WATCHTYP.OfflineGold) : this.onGet()
            },
            t.prototype.watchEnd = function(e, t) {
                if (t == d.WATCHTYP.OfflineGold) if (0 == e) {
                    var i = Math.floor(o["default"].Instance.offlineGold * c["default"].OfflineDic.getValue(l["default"].Instance.maxLevel) * (1 + o["default"].Instance.techOffLineSpeed + 2));
                    l["default"].Instance.gold += i,
                    d["default"].showToast(u["default"].getText("12", [i.toString()])),
                    o["default"].Instance.LevelLayer.updateGold(),
                    this.close()
                } else 1 == e ? d["default"].showToast(u["default"].getText("4")) : 2 == e && d["default"].showToast(u["default"].getText("loadFail"))
            },
            t.prototype.close = function() {
                var t = g.PoolMgr.getItem(r["default"].POOLNAME.BombLZ);
                t || (t = new h["default"]),
                t.init(new Laya.Point(this.iconGold.x, this.iconGold.y), 2, 2),
                o["default"].Instance.LevelLayer.addChild(t),
                e.prototype.close.call(this),
                this.btnThreeGetVideo.off(Laya.Event.CLICK, this, this.onThreeGetVideo),
                s.EventHelper.remove(r["default"].CUSTOMEVENT.WatchADFinish, this.watchEnd, this),
                o["default"].Instance.offlineGold = 0,
                o["default"].Instance.saveOfflineTime(),
                o["default"].Instance.pouseGame = !1
                // d["default"].hideBanner()
            },
            t
        } (a.ui.OfflineDialogUI);
        i["default"] = f
    },
    {
        "../../../ui/layaMaxUI": 51,
        "../../effect/BombLZ": 5,
        "../../manager/GameMgr": 7,
        "../../manager/PoolMgr": 10,
        "../../manager/SoundMgr": 12,
        "../../manager/WxApiMgr": 13,
        "../../model/Global": 15,
        "../../model/MapData": 16,
        "../../model/Player": 17,
        "../../utils/EventHelper": 25,
        "../../utils/TextUtils": 29,
        "../../utils/Utils": 30
    }],
    38 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../../../ui/layaMaxUI"),
        o = e("../../manager/RoleMgr"),
        n = e("../../model/Global"),
        l = e("../../manager/WxApiMgr"),
        s = e("../../manager/SoundMgr"),
        r = e("../../manager/GameMgr"),
        p = function(e) {
            function t(t) {
                var i = e.call(this) || this;
                i.height = Laya.stage.height,
                i.sp_box.y += n["default"].offsetY,
                r["default"].Instance.successState = !0;
                var a = t - 1;
                return t > n["default"].boomConfigs.length && (a = n["default"].boomConfigs.length - 1),
                i.img_battery.skin = n["default"].boomConfigs[a],
                i.img_battery.x = .5 * (i.box.width - i.img_battery.width),
                i.img_battery.y = .5 * (i.box.height - i.img_battery.height),
                i.btn_close.on(Laya.Event.CLICK, i, i.onClose),
                i.label_close.on(Laya.Event.CLICK, i, i.onClose),
                i.btn_recovey.on(Laya.Event.CLICK, i, i.onRecovery),
                i
                console.log("ui.RecoveryDialogUI")
            }
            return __extends(t, e),
            t.prototype.onRecovery = function() {
                s.SoundMgr.playSound(n["default"].SoundConfig.buttonClick),
                o["default"].Instance.recovery(),
                this.clear(),
                this.close()
            },
            t.prototype.onClose = function() {
                s.SoundMgr.playSound(n["default"].SoundConfig.buttonClick),
                o["default"].Instance.unRecovery(),
                this.clear(),
                this.close()
            },
            t.prototype.clear = function() {
                r["default"].Instance.successState = !1,
                this.btn_close.off(Laya.Event.CLICK, this, this.onClose),
                this.label_close.off(Laya.Event.CLICK, this, this.onClose),
                this.btn_recovey.off(Laya.Event.CLICK, this, this.onRecovery)
                // l["default"].hideBanner()
            },
            t
        } (a.ui.RecoveryDialogUI);
        i["default"] = p
    },
    {
        "../../../ui/layaMaxUI": 51,
        "../../manager/GameMgr": 7,
        "../../manager/RoleMgr": 11,
        "../../manager/SoundMgr": 12,
        "../../manager/WxApiMgr": 13,
        "../../model/Global": 15
    }],
    39 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../../../ui/layaMaxUI"),
        o = e("../../manager/WxApiMgr"),
        n = e("../../manager/SoundMgr"),
        l = e("../../model/Global"),
        s = e("../../manager/GameMgr"),
        r = e("../../utils/TextUtils"),
        p = function(e) {
            function t() {
                var t = e.call(this) || this;
                return t.height = Laya.stage.height,
                t.init(),
                t.initEvent(),
                t
            }
            return __extends(t, e),
            t.prototype.init = function() {
                s["default"].Instance.successState = !0,
                this.sp_box_first.visible = !0,
                this.sp_box_second.visible = !1
                // o["default"].showBanner()
            },
            t.prototype.initEvent = function() {
                this.btn_close.on(Laya.Event.CLICK, this, this.onClose),
                this.btn_close2.on(Laya.Event.CLICK, this, this.onClose),
                this.label_close.on(Laya.Event.CLICK, this, this.onClose),
                this.label_close2.on(Laya.Event.CLICK, this, this.onClose),
                this.btn_yes.on(Laya.Event.CLICK, this, this.onYes),
                this.btn_no.on(Laya.Event.CLICK, this, this.onNo)
            },
            t.prototype.onYes = function() {
                o["default"].Instance.aldSendEvent("投诉建议", {
                    "点击按钮": "游戏好玩"
                }),
                n.SoundMgr.playSound(l["default"].SoundConfig.buttonClick),
                this.next()
            },
            t.prototype.onNo = function() {
                o["default"].Instance.aldSendEvent("投诉建议", {
                    "点击按钮": "游戏不好玩"
                }),
                n.SoundMgr.playSound(l["default"].SoundConfig.buttonClick),
                this.next()
            },
            t.prototype.next = function() {
                this.sp_box_first.visible = !1,
                this.sp_box_second.visible = !0,
                this.btn_submit.on(Laya.Event.CLICK, this, this.onSubmit);
                for (var e = 0; e < this.box.numChildren; e++) {
                    var t = this.box.getChildAt(e),
                    i = t.getChildByName("gou");
                    i.visible = !1,
                    t.on(Laya.Event.CLICK, this, this.onChoice)
                }
            },
            t.prototype.onChoice = function(e) {
                n.SoundMgr.playSound(l["default"].SoundConfig.buttonClick);
                var t = e.currentTarget.getChildByName("gou");
                t.visible = !t.visible
            },
            t.prototype.onSubmit = function() {
                n.SoundMgr.playSound(l["default"].SoundConfig.buttonClick);
                for (var e = 0,
                t = 0; t < this.box.numChildren; t++) {
                    var i = this.box.getChildAt(t),
                    a = i.getChildByName("gou"),
                    s = i.getChildByName("text");
                    a.visible && (e++, o["default"].Instance.aldSendEvent("投诉建议", {
                        "提交选项": s.text
                    }))
                }
                0 == e ? o["default"].showToast(r["default"].getText("suggest1")) : (o["default"].showToast(r["default"].getText("suggest2")), o["default"].Instance.aldSendEvent("投诉建议", {
                    "点击按钮": "提交按钮"
                }), this.clear(), this.close())
            },
            t.prototype.onClose = function() {
                o["default"].Instance.aldSendEvent("投诉建议", {
                    "点击按钮": "关闭"
                }),
                n.SoundMgr.playSound(l["default"].SoundConfig.buttonClick),
                this.clear(),
                this.close()
            },
            t.prototype.clear = function() {
                s["default"].Instance.successState = !1,
                this.removeSelf(),
                this.btn_close.off(Laya.Event.CLICK, this, this.onClose),
                this.btn_close2.off(Laya.Event.CLICK, this, this.onClose),
                this.label_close.off(Laya.Event.CLICK, this, this.onClose),
                this.label_close2.off(Laya.Event.CLICK, this, this.onClose),
                this.btn_yes.off(Laya.Event.CLICK, this, this.onYes),
                this.btn_no.off(Laya.Event.CLICK, this, this.onNo),
                this.btn_submit.off(Laya.Event.CLICK, this, this.onSubmit);
                for (var e = 0; e < this.box.numChildren; e++) {
                    var t = this.box.getChildAt(e);
                    t.off(Laya.Event.CLICK, this, this.onChoice)
                }
                // o["default"].hideBanner()
            },
            t
        } (a.ui.SuggestionDialogUI);
        i["default"] = p
    },
    {
        "../../../ui/layaMaxUI": 51,
        "../../manager/GameMgr": 7,
        "../../manager/SoundMgr": 12,
        "../../manager/WxApiMgr": 13,
        "../../model/Global": 15,
        "../../utils/TextUtils": 29
    }],
    40 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../../../ui/layaMaxUI"),
        o = e("../../model/Player"),
        n = e("../../utils/EventHelper"),
        l = e("../../model/Global"),
        s = e("../../manager/SoundMgr"),
        r = e("../../manager/WxApiMgr"),
        p = e("../../utils/TextUtils"),
        d = e("../../manager/GameMgr"),
        u = e("../Panel/FontItem"),
        g = e("../../model/GiftData"),
        h = e("../../utils/Utils"),
        c = e("./GiftInfoDialog"),
        f = e("../../manager/PoolMgr"),
        m = e("../../effect/BombLZ"),
        y = function(e) {
            function t() {
                var t = e.call(this) || this;
                return t.isOntap = !1,
                t.init(),
                t
            }
            return __extends(t, e),
            t.prototype.init = function() {
                this.height = Laya.stage.height,
                this.sp_box.y += l["default"].offsetY,
                this.autoDestroyAtClosed = !0,
                this.btn_surplusNum_share.visible = !1,
                Laya.Browser.window.h5api.canPlayAd() ? this.btn_surplusNum_video.visible = !0 : this.btn_surplusNum_video.visible = !1,
                this.btn_surplusNum_video.on(Laya.Event.CLICK, this, this.onWatchVideo),
                n.EventHelper.register(l["default"].CUSTOMEVENT.WatchADFinish, this.watchEnd, this),
                this.btnHelp.on(Laya.Event.CLICK, this, this.onHelp),
                this.imgGiftIcon.on(Laya.Event.CLICK, this, this.onHelp),
                this.label_close.on(Laya.Event.CLICK, this, this.onClose),
                this.blockNum.visible = !1,
                this.fontBlock = new u["default"](1, "center", .8),
                this.sp_box.addChild(this.fontBlock),
                this.fontBlock.pos(this.blockNum.x, this.blockNum.y),
                this.redBlockNum.visible = !1,
                this.fontRedBlock = new u["default"](1, "center", .8),
                this.sp_box.addChild(this.fontRedBlock),
                this.fontRedBlock.pos(this.redBlockNum.x, this.redBlockNum.y),
                this.timeline = new Laya.TimeLine,
                this.timeline.to(this.imgBg, {
                    rotation: 360
                },
                5e3),
                this.timeline.play(0, !0),
                this.fontBlock.setNumStr(d["default"].Instance.killBlockNum.toString()),
                this.fontRedBlock.setNumStr(d["default"].Instance.killRedBlockNum.toString());
                var e = Math.random();
                e <= d["default"].Instance.curBlockLevelData.winGift ? (this.imgGold.x = 243, this.imgGift.visible = !0, this.giftBagData = g["default"].getRamGift(), this.imgGiftIcon.skin = l["default"].GiftUrl + "kejiui_hexin_" + this.giftBagData.type.toString() + ".png", this.labLV.text = "Lv:" + this.giftBagData.color.toString(), this.labQuality.text = p["default"].getText("GiftColor" + this.giftBagData.color.toString()), d["default"].Instance.giftPanel.handleBag(this.giftBagData, 0)) : (this.imgGift.visible = !1, this.imgGold.x = 317),
                this.gold = 240 * d["default"].Instance.curBlockLevelData.gold,
                this.labGold.text = h.utils.strShow(this.gold),
                r["default"].showFullScreenAd(),
                console.log("ui.WinDialogUI")
            },
            t.prototype.onWatchVideo = function() {
                this.isOntap || (s.SoundMgr.playSound(l["default"].SoundConfig.buttonClick), r["default"].Instance.aldSendEvent("boss过关弹出", {
                    "点击按钮": "点击视频按钮"
                }), l["default"].videoADID ? o["default"].Instance.watchTypeNum(r.WATCHTYP.BossPass) ? r["default"].showRewardAd(r.WATCHTYP.BossPass) : (this.btn_surplusNum_video.visible = !1, this.imgGift.visible && this.deathEff(2)) : this.isOntap = !0)
            },
            t.prototype.watchEnd = function(e, t) {
                t == r.WATCHTYP.BossPass && (this.isOntap = !1, 0 == e ? (r["default"].Instance.aldSendEvent("boss过关弹出", {
                    "点击按钮": "成功获取视频"
                }), this.btn_surplusNum_video.visible = !1, this.imgGift.visible && this.deathEff(2)) : 1 == e ? (r["default"].Instance.aldSendEvent("boss过关弹出", {
                    "点击按钮": "失败获取视频"
                }), r["default"].showToast(p["default"].getText("16"))) : 2 == e && r["default"].showToast(p["default"].getText("loadFail")))
            },
            t.prototype.onHelp = function() {
                s.SoundMgr.playSound(l["default"].SoundConfig.buttonClick),
                r["default"].Instance.aldSendEvent("boss过关弹出", {
                    "点击按钮": "查看核心属性"
                });
                var e = new c["default"](this.giftBagData, 2);
                e.popup()
            },
            t.prototype.onClose = function() {
                this.isOntap || (s.SoundMgr.playSound(l["default"].SoundConfig.buttonClick), this.deathEff(1))
            },
            t.prototype.close = function() {
                this.imgGift.visible ? d["default"].Instance.failUi.flyIcon(this.giftBagData.type) : d["default"].Instance.failUi.showUnlockBattery(),
                this.btn_surplusNum_video.off(Laya.Event.CLICK, this, this.onWatchVideo),
                n.EventHelper.remove(l["default"].CUSTOMEVENT.WatchADFinish, this.watchEnd, this),
                this.btnHelp.off(Laya.Event.CLICK, this, this.onHelp),
                this.imgGiftIcon.off(Laya.Event.CLICK, this, this.onHelp),
                this.label_close.off(Laya.Event.CLICK, this, this.onClose),
                this.timeline.destroy(),
                this.fontBlock.removeSelf(),
                this.fontRedBlock.removeSelf(),
                d["default"].Instance.killBlockNum = 0,
                d["default"].Instance.killRedBlockNum = 0,
                e.prototype.close.call(this)
                // r["default"].hideBanner()
            },
            t.prototype.deathEff = function(e) {
                var t = f.PoolMgr.getItem(l["default"].POOLNAME.BombLZ);
                t || (t = new m["default"]);
                var i = this.imgGold.x,
                a = this.imgGold.y;
                if (t.init(new Laya.Point(i, a), 2, 2), d["default"].Instance.LevelLayer.addChild(t), o["default"].Instance.gold += this.gold, window.ystorage.setItem(l["default"].LocalStorage.user_gold, o["default"].Instance.gold.toString()), d["default"].Instance.LevelLayer.updateGold(), 2 == e) {
                    var n = g["default"].getRamGift();
                    d["default"].Instance.giftPanel.handleBag(n, 0),
                    r["default"].showToast(p["default"].getText("Gift10"))
                }
                this.close()
            },
            t
        } (a.ui.WinDialogUI);
        i["default"] = y
    },
    {
        "../../../ui/layaMaxUI": 51,
        "../../effect/BombLZ": 5,
        "../../manager/GameMgr": 7,
        "../../manager/PoolMgr": 10,
        "../../manager/SoundMgr": 12,
        "../../manager/WxApiMgr": 13,
        "../../model/GiftData": 14,
        "../../model/Global": 15,
        "../../model/Player": 17,
        "../../utils/EventHelper": 25,
        "../../utils/TextUtils": 29,
        "../../utils/Utils": 30,
        "../Panel/FontItem": 43,
        "./GiftInfoDialog": 35
    }],
    41 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../../../ui/layaMaxUI"),
        o = e("../../model/Global"),
        n = e("../../manager/RoleMgr"),
        l = e("../../object/Battery"),
        s = e("../../manager/GameMgr"),
        r = e("../../manager/WxApiMgr"),
        p = e("../../model/Player"),
        d = e("../../object/Cannon"),
        u = e("../../manager/PoolMgr"),
        g = e("../Dialog/AutoComposeDialog"),
        h = e("../../model/MapData"),
        c = e("../Dialog/GetGoldDialog"),
        f = e("./TechnologyPanel"),
        m = e("../../utils/Utils"),
        y = e("../../manager/SoundMgr"),
        v = e("../Dialog/NewBatteryDialog"),
        I = e("../../utils/TextUtils"),
        b = e("../../model/GiftData"),
        x = e("./FontItem"),
        L = e("../../utils/Dictionary"),
        _ = function(e) {
            function t() {
                var t = e.call(this) || this;
                return t.CannonPosArr = [],
                t.BatteryPosArr = [],
                t.cannonArr = [],
                t.levelDic = new L.Dictionary,
                t.batteryDeblockStatus = [0, 0, 1, 0, 0],
                t.priceFontItem = new x["default"](1, "center", .8),
                t.maskAuto = new Laya.Sprite,
                t.maskDouGold = new Laya.Sprite,
                t.maskDouFire = new Laya.Sprite,
                t.maskHalfDifficult = new Laya.Sprite,
                t.showUpgradeHot = !1,
                t.isCompose = !1,
                t.autoLen = 0,
                t.douGoldLen = 0,
                t.douFireLen = 0,
                t.halfDiffLen = 0,
                t.techPanel = null,
                t.initData(),
                t.init(),
                t.initEvent(),
                t
            }
            return __extends(t, e),
            t.prototype.initData = function() {
                var e = window.ystorage.getItem(o["default"].LocalStorage.BatteryLevel);
                e && (p["default"].Instance.batteryLevel = Number(e)),
                window.ystorage.getItem(o["default"].LocalStorage.autoComposeTime) && (o["default"].autoSynthesis_totalTime = Number(window.ystorage.getItem(o["default"].LocalStorage.autoComposeTime))),
                window.ystorage.getItem(o["default"].LocalStorage.doubleGoldTime) && (o["default"].doubleGold_totalTime = Number(window.ystorage.getItem(o["default"].LocalStorage.doubleGoldTime))),
                window.ystorage.getItem(o["default"].LocalStorage.doubleFireTime) && (o["default"].doubleFire_totalTime = Number(window.ystorage.getItem(o["default"].LocalStorage.doubleFireTime))),
                window.ystorage.getItem(o["default"].LocalStorage.halfDifficultTime) && (o["default"].halfDifficult_totalTime = Number(window.ystorage.getItem(o["default"].LocalStorage.halfDifficultTime)))
            },
            t.prototype.init = function() {
                this.timeline = new Laya.TimeLine,
                this.timeline1 = new Laya.TimeLine,
                this.timeline2 = new Laya.TimeLine;
                for (var e = ((this.sp_box.width - 80) / 4, 0); 5 > e; e++) {
                    var t = this.sp_box_battery.getChildAt(e);
                    this.BatteryPosArr.push([t.x, 0])
                }
                for (var i = 0; i < this.sp_box_bg.numChildren; i++) {
                    var t = this.sp_box_bg.getChildAt(i);
                    this.CannonPosArr.push([t.x, t.y])
                }
                this.setBatteryLock();
                for (var a = 0; a < this.BatteryPosArr.length; a++) 1 == this.batteryDeblockStatus[a] && this.createBattery(Number(s["default"].Instance.batteryPos[a]), this.BatteryPosArr[a]);
                for (var n = 0; n < this.CannonPosArr.length; n++) this.createNewCannon(Number(s["default"].Instance.cannonPos[n]), this.CannonPosArr[n]);
                this.updateCreate(),
                o["default"].autoSynthesis_totalTime > 0 && this.setAutoComposeCountdown(),
                o["default"].doubleGold_totalTime > 0 && this.setDoubleGoldCountdown(),
                o["default"].doubleFire_totalTime > 0 && this.setDoubleFireCountdown(),
                o["default"].halfDifficult_totalTime > 0 && this.setHalfDifficultCountdown(),
                this.updateImg(),
                this.priceFontItem.pos(this.text_price.x, this.text_price.y),
                this.text_price.removeSelf(),
                this.btn_create.addChild(this.priceFontItem),
                this.img_hot1.visible = this.img_hot2.visible = !1,
                Laya.timer.loop(2e3, this, this.checkGold)
            },
            t.prototype.checkGold = function() {
                var e = h["default"].BulletDic.getValue(s["default"].Instance.techBatteryLevel).gold * (1 - b["default"].cost);
                if (p["default"].Instance.gold >= e ? this.img_hot1.visible = !0 : this.img_hot1.visible = !1, s["default"].Instance.curLevel < 11) this.img_hot2.visible = !1;
                else {
                    for (var t = [], i = 0; i < p["default"].Instance.techLevelArr.length; i++) {
                        var a = Number(p["default"].Instance.techLevelArr[i]),
                        o = h["default"].UpgradeDic.getValue(a),
                        n = new h.TechData;
                        n.index = i,
                        n.name = I["default"].getText("techName" + i),
                        n.des = I["default"].getText("techDes" + i);
                        var l = void 0,
                        r = void 0;
                        0 == i ? (l = a, r = o.paotai_gold) : 1 == i ? (l = o.fire_effect, r = o.fire_gold) : 2 == i && (l = o.outline_effect, r = o.outline_gold),
                        t.push(r)
                    }
                    for (var d = !1,
                    u = 0; u < t.length; u++) if (p["default"].Instance.gold >= t[u]) {
                        d = !0,
                        this.showUpgradeHot = !0;
                        break
                    }
                    d || (this.showUpgradeHot = !1),
                    this.img_hot2.visible = this.showUpgradeHot
                }
            },
            t.prototype.updateImg = function() {
                var e = s["default"].Instance.techBatteryLevel - 1;
                s["default"].Instance.techBatteryLevel > o["default"].boomConfigs.length && (e = o["default"].boomConfigs.length - 1);
                var t = this;
                this.img_battery.loadImage(o["default"].boomConfigs[e], Laya.Handler.create(t,
                function() {
                    t.img_battery.pivotY = .8 * t.img_battery.height * .5,
                    t.img_battery.y = .5 * t.btn_create.height * .8
                }))
            },
            t.prototype.getLockBatteryPos = function() {
                for (var e = [], t = 0, i = 1; i < o["default"].unlockConfig.length; i++) p["default"].Instance.maxLevel - 1 == o["default"].unlockConfig[i].ID && (1 == i ? e = this.BatteryPosArr[1] : 2 == i ? e = this.BatteryPosArr[3] : 3 == i ? e = this.BatteryPosArr[0] : 4 == i ? e = this.BatteryPosArr[4] : 5 == i && (e = [this.btn_tech.x, this.btn_tech.y]), t = Number(o["default"].unlockConfig[i].type));
                return {
                    pos: e,
                    type: t
                }
            },
            t.prototype.setBatteryLock = function() {
                for (var e = this,
                t = 0; t < o["default"].unlockConfig.length; t++) p["default"].Instance.maxLevel - 1 >= Number(o["default"].unlockConfig[t].ID) && (0 == t ? this.batteryDeblockStatus[2] = 1 : 1 == t ? this.batteryDeblockStatus[1] = 1 : 2 == t ? this.batteryDeblockStatus[3] = 1 : 3 == t ? this.batteryDeblockStatus[0] = 1 : 4 == t && (this.batteryDeblockStatus[4] = 1));
                for (var t = 0; t < e.sp_box_battery.numChildren; t++) {
                    var i = e.sp_box_battery.getChildAt(t),
                    a = i.getChildByName("fontItem"),
                    n = void 0;
                    if (a || (n = i.getChildByName("fontUI"), a = new x["default"](0, "center"), a.name = "fontItem", a.pos(n.x, n.y), n.visible = !1, i.addChild(a)), 1 == e.batteryDeblockStatus[t]) {
                        var l = i.getChildByName("lock");
                        l.visible = !1,
                        a && i.removeChild(a)
                    } else "sp2" == i.name ? this.setBatteryLevelShow(1, a) : "sp3" == i.name ? this.setBatteryLevelShow(2, a) : "sp4" == i.name ? this.setBatteryLevelShow(3, a) : "sp5" == i.name && this.setBatteryLevelShow(4, a)
                }
            },
            t.prototype.setBatteryLevelShow = function(e, t) {
                t && (t.setNumStr(o["default"].unlockConfig[e].ID), p["default"].Instance.maxLevel - 1 >= Number(o["default"].unlockConfig[e - 1].ID) && p["default"].Instance.maxLevel - 1 < Number(o["default"].unlockConfig[e].ID) ? t.visible = !0 : t.visible = !1)
            },
            t.prototype.updateCreate = function() {
                this.priceFontItem.setNumStr(m.utils.strShow(h["default"].BulletDic.getValue(s["default"].Instance.techBatteryLevel).gold * (1 - b["default"].cost)))
            },
            t.prototype.nextGuide = function() {
                s["default"].Instance.guide && !p["default"].Instance.guideStop && (1 == p["default"].Instance.showGuide ? s["default"].Instance.guide.hide() : (p["default"].Instance.showGuide++, window.ystorage.setItem(o["default"].LocalStorage.guide, p["default"].Instance.showGuide.toString()), s["default"].Instance.guide.nextStep()))
            },
            t.prototype.createBattery = function(e, t, i) {
                if (void 0 === i && (i = 0), this.setStorage(e, t), 0 != e) {
                    this.nextGuide();
                    var a = u.PoolMgr.getItem(o["default"].POOLNAME.Battery + e);
                    a || (a = new l["default"](e)),
                    a.visible = !0,
                    a.rotation = 1,
                    a.scaleX = 1,
                    a.scaleY = 1,
                    a.x = t[0],
                    a.y = t[1],
                    a.initialPos = t,
                    a.name = "battery",
                    a.reset(),
                    this.sp_box.addChild(a),
                    s["default"].Instance.batteryArr.push(a),
                    1 == i && (a.scaleX = 0, a.scaleY = 0, this.timeline.reset(), this.timeline.to(a, {
                        scaleX: 1.2,
                        scaleY: 1.2
                    },
                    400).to(a, {
                        scaleX: 1,
                        scaleY: 1
                    },
                    200).play(0, !1)),
                    n["default"].Instance.isMove = !1,
                    this.isCompose = !1,
                    s["default"].Instance.refreshFightingCapacity()
                }
            },
            t.prototype.createNewCannon = function(e, t, i) {
                if (void 0 === i && (i = 0), this.setStorage(e, t), 0 != e) {
                    var a = u.PoolMgr.getItem(o["default"].POOLNAME.CannonLevel + e);
                    a || (a = new d["default"](e)),
                    a.visible = !0,
                    a.scaleX = a.n_scale,
                    a.scaleY = a.n_scale,
                    a.rotation = 1,
                    this.sp_box.addChild(a),
                    this.cannonArr.push(a);
                    var l = this.levelDic.getValue(a.level);
                    void 0 == l ? l = 1 : l++,
                    this.levelDic.setValue(a.level, l),
                    a.x = t[0],
                    a.y = t[1],
                    a.initialPos = t,
                    a.name = "cannon",
                    0 == i ? (a.scaleX = 0, a.scaleY = 0, Laya.Tween.to(a, {
                        scaleX: 1.5 * a.n_scale,
                        scaleY: 1.5 * a.n_scale
                    },
                    200), setTimeout(function() {
                        Laya.Tween.to(a, {
                            scaleX: a.n_scale,
                            scaleY: a.n_scale
                        },
                        200)
                    },
                    200)) : 1 == i && (a.scaleX = 0, a.scaleY = 0, this.timeline.reset(), this.timeline.to(a, {
                        scaleX: 1.2 * a.n_scale,
                        scaleY: 1.2 * a.n_scale
                    },
                    400).to(a, {
                        scaleX: a.n_scale,
                        scaleY: a.n_scale
                    },
                    200).play(0, !1)),
                    n["default"].Instance.isMove = !1,
                    this.isCompose = !1
                }
            },
            t.prototype.setStorage = function(e, t) {
                var i = this.BatteryPosArr.indexOf(t);
                if ( - 1 != i) {
                    s["default"].Instance.batteryPos[i] = e.toString();
                    var a = s["default"].Instance.batteryPos.toString();
                    window.ystorage.setItem(o["default"].LocalStorage.batteryPos, a)
                } else {
                    for (var n = 0; n < this.CannonPosArr.length; n++) if (this.CannonPosArr[n][0] == t[0] && this.CannonPosArr[n][1] == t[1]) {
                        i = n;
                        break
                    }
                    s["default"].Instance.cannonPos[i] = e.toString();
                    var l = void 0;
                    l = 0 == e ? o["default"].PanelUrl + "juxing_bg_2.png": o["default"].PanelUrl + "juxing_bg_1.png",
                    this.sp_box_bg.getChildAt(i).skin = l;
                    var a = s["default"].Instance.cannonPos.toString();
                    window.ystorage.setItem(o["default"].LocalStorage.CannonPos, a)
                }
            },
            t.prototype.eff = function(e, t, i) {
                if (e && t) {
                    var a = this;
                    a.isCompose = !0,
                    y.SoundMgr.playSound(o["default"].SoundConfig.hecheng);
                    var n = e.x;
                    t.y = e.y,
                    this.timeline1.reset(),
                    this.timeline1.to(e, {
                        x: n - e.width / 2 - 5
                    },
                    150).to(e, {
                        x: n
                    },
                    150).play(0, !1),
                    this.timeline2.reset(),
                    this.timeline2.to(t, {
                        x: n + t.width / 2 + 5
                    },
                    150).to(t, {
                        x: n
                    },
                    150).play(0, !1),
                    Laya.timer.once(300, a,
                    function() {
                        var o = e.level + 1,
                        n = e.initialPos;
                        e.clear(),
                        t.clear(),
                        0 == i ? (a.createNewCannon(o, n, 1), a.nextGuide()) : 1 == i && a.createBattery(o, n, 1),
                        o > p["default"].Instance.batteryLevel && o > 2 && a.batteryUpgrade(o),
                        r["default"].Instance.aldSendEvent("合成炮台", {
                            "等级": o + "级"
                        })
                    })
                }
            },
            t.prototype.changePos = function(e, t) {
                var i = e.initialPos;
                e.x = t.initialPos[0],
                e.y = t.initialPos[1],
                e.initialPos = t.initialPos,
                t.x = i[0],
                t.y = i[1],
                t.initialPos = i,
                n["default"].Instance.isMove = !1,
                e.name = "",
                t.name = "",
                this.setStorage(e.level, e.initialPos),
                this.setStorage(t.level, t.initialPos)
            },
            t.prototype.initEvent = function() {
                this.btn_create.on(Laya.Event.CLICK, this, this.createNew),
                this.btn_auto.on(Laya.Event.CLICK, this, this.createAutoSkin),
                console.log("this.btn_auto.x   ", this.btn_auto.x),
                console.log("this.btn_auto.y   ", this.btn_auto.y),
                this.btn_tech.on(Laya.Event.CLICK, this, this.createTech),
                this.sp_douGold.on(Laya.Event.CLICK, this, this.onDouGold),
                this.sp_douFire.on(Laya.Event.CLICK, this, this.onDouFire),
                this.sp_halfDifficult.on(Laya.Event.CLICK, this, this.onHalfDifficult),
                this.btn_mall.on(Laya.Event.CLICK, this, this.onMall);
                for (var e = 0; e < this.sp_box_battery.numChildren; e++) {
                    var t = this.sp_box_battery.getChildAt(e);
                    t.on(Laya.Event.CLICK, this, this.clickBattery)
                }
            },
            t.prototype.clickBattery = function(e) {
                var t = 0;
                "sp2" == e.target.name ? t = 1 : "sp3" == e.target.name ? t = 2 : "sp4" == e.target.name ? t = 3 : "sp5" == e.target.name && (t = 4);
                var i = o["default"].unlockConfig[t].ID,
                a = e.target.getChildByName("fontItem");
                a && (a.visible ? r["default"].showToast(I["default"].getText("compose1", [i])) : r["default"].showToast(I["default"].getText("compose2")))
            },
            t.prototype.createNew = function() {
                if (y.SoundMgr.playSound(o["default"].SoundConfig.buttonClick), !this.isCompose) if (this.nextGuide(), s["default"].Instance.failGuide.clear(2), this.cannonArr.length >= 10) {
                    if (r["default"].showToast(I["default"].getText("compose3")), !(o["default"].autoSynthesis_totalTime > 0) && Laya.Browser.window.h5api.canPlayAd()) {
                        var e = new g["default"](h.TimeType.AutoCompose);
                        e.popup()
                    }
                } else {
                    var t = h["default"].BulletDic.getValue(s["default"].Instance.techBatteryLevel).gold * (1 - b["default"].cost);
                    if (p["default"].Instance.gold < t) {
                        var i = new c["default"];
                        return void i.popup()
                    }
                    for (var a = s["default"].Instance.cannonPos.length, n = 0; a > n; n++) if ("0" == s["default"].Instance.cannonPos[n]) {
                        this.createNewCannon(s["default"].Instance.techBatteryLevel, this.CannonPosArr[n]);
                        break
                    }
                    o["default"].autoSynthesis_totalTime > 0 && (o["default"].isAutoSynthesis = !0),
                    this.consumeGold(t)
                }
            },
            t.prototype.createNew2 = function() {
                y.SoundMgr.playSound(o["default"].SoundConfig.buttonClick),
                o["default"].autoSynthesis_totalTime > 0 && (o["default"].isAutoSynthesis = !0);
                for (var e = s["default"].Instance.cannonPos.length, t = 0; e > t; t++) if ("0" == s["default"].Instance.cannonPos[t]) {
                    this.createNewCannon(s["default"].Instance.techBatteryLevel, this.CannonPosArr[t]);
                    break
                }
            },
            t.prototype.consumeGold = function(e, t) {
                void 0 === t && (t = 0),
                0 == t ? p["default"].Instance.gold -= e: 1 == t && (p["default"].Instance.gold += e),
                window.ystorage.setItem(o["default"].LocalStorage.user_gold, p["default"].Instance.gold.toString()),
                s["default"].Instance.LevelLayer.updateGold()
            },
            t.prototype.batteryUpgrade = function(e) {
                var t = new v["default"](e);
                t.popup(),
                p["default"].Instance.batteryLevel = e,
                window.ystorage.setItem(o["default"].LocalStorage.BatteryLevel, e.toString())
            },
            t.prototype.autoCompose = function() {
                if (!this.isCompose) if (this.cannonArr.length > 1) {
                    for (var e = !1,
                    t = 999,
                    i = this.levelDic.keys().length, a = void 0, n = void 0, l = 0; i > l; l++) a = this.levelDic.keys()[l],
                    n = this.levelDic.getValue(a),
                    n >= 2 && t > a && (t = a, e = !0);
                    if (e) {
                        i = this.cannonArr.length;
                        for (var s = 0,
                        r = void 0,
                        p = void 0,
                        l = 0; i > l; l++) if (0 == s && this.cannonArr[l].level == t) p = this.cannonArr[l],
                        s++;
                        else if (1 == s && this.cannonArr[l].level == t) {
                            r = this.cannonArr[l],
                            s++,
                            this.eff(p, r, 0),
                            this.isCompose = !0;
                            break
                        }
                    } else o["default"].isAutoSynthesis = !1
                } else o["default"].isAutoSynthesis = !1
            },
            t.prototype.setAutoComposeCountdown = function() {
                o["default"].isAutoSynthesis = !0,
                this.sp_auto.visible = !1,
                this.img_autoCountdown.width = this.sp_autoCountdown.width;
                var e = this.img_autoCountdown.height / o["default"].autoSynthesis_totalTime;
                this.autoLen = this.img_autoCountdown.height;
                var t = m.utils.ParseTime2Format(o["default"].autoSynthesis_totalTime, "m:s");
                this.txt_autoCountdown.text = t,
                this.maskAuto.graphics.clear(!0),
                this.maskAuto.graphics.drawRect(0, 0, this.img_autoCountdown.width, this.autoLen, "#ff0000"),
                this.img_autoCountdown.mask = this.maskAuto,
                Laya.timer.loop(1e3, this, this.loopAutoCountdown, [e])
            },
            t.prototype.loopAutoCountdown = function(e) {
                this.txt_autoCountdown.text = m.utils.ParseTime2Format(o["default"].autoSynthesis_totalTime, "m:s"),
                this.maskAuto.graphics.clear(!0),
                this.autoLen -= e,
                this.maskAuto.graphics.drawRect(0, this.img_autoCountdown.height - this.autoLen, this.img_autoCountdown.width, this.autoLen, "#ff0000"),
                o["default"].autoSynthesis_totalTime--,
                o["default"].autoSynthesis_totalTime <= 0 && (Laya.timer.clear(this, this.loopAutoCountdown), this.sp_auto.visible = !0, r["default"].showToast(I["default"].getText("TimeType8")), this.img_autoCountdown.mask = null),
                window.ystorage.setItem(o["default"].LocalStorage.autoComposeTime, o["default"].autoSynthesis_totalTime.toString())
            },
            t.prototype.setDoubleGoldCountdown = function() {
                this.btn_douGold.visible = !1,
                this.img_goldCountdown.width = this.btn_douGold.width;
                var e = this.img_goldCountdown.height / o["default"].doubleGold_totalTime;
                this.douGoldLen = this.img_goldCountdown.height;
                var t = m.utils.ParseTime2Format(o["default"].doubleGold_totalTime, "m:s");
                this.text_goldCountdown.text = t,
                this.maskDouGold.graphics.clear(!0),
                this.maskDouGold.graphics.drawRect(0, 0, this.img_goldCountdown.width, this.douGoldLen, "#ff0000"),
                this.img_goldCountdown.mask = this.maskDouGold,
                Laya.timer.loop(1e3, this, this.loopDoubleGoldCountdown, [e])
            },
            t.prototype.loopDoubleGoldCountdown = function(e) {
                this.text_goldCountdown.text = m.utils.ParseTime2Format(o["default"].doubleGold_totalTime, "m:s"),
                this.douGoldLen -= e,
                this.maskDouGold.graphics.clear(!0),
                this.maskDouGold.graphics.drawRect(0, this.img_goldCountdown.height - this.douGoldLen, this.img_goldCountdown.width, this.douGoldLen, "#ff0000"),
                o["default"].doubleGold_totalTime--,
                o["default"].doubleGold_totalTime <= 0 && (Laya.timer.clear(this, this.loopDoubleGoldCountdown), this.btn_douGold.visible = !0, r["default"].showToast(I["default"].getText("TimeType9")), this.img_goldCountdown.mask = null),
                window.ystorage.setItem(o["default"].LocalStorage.doubleGoldTime, o["default"].doubleGold_totalTime.toString())
            },
            t.prototype.setDoubleFireCountdown = function() {
                this.btn_douFire.visible = !1,
                this.img_fireCountdown.width = this.btn_douFire.width;
                var e = this.img_fireCountdown.height / o["default"].doubleFire_totalTime;
                this.douFireLen = this.img_fireCountdown.height;
                var t = m.utils.ParseTime2Format(o["default"].doubleFire_totalTime, "m:s");
                this.text_fireCountdown.text = t,
                this.maskDouFire.graphics.clear(!0),
                this.maskDouFire.graphics.drawRect(0, 0, this.img_fireCountdown.width, this.douFireLen, "#ff0000"),
                this.img_fireCountdown.mask = this.maskDouFire,
                Laya.timer.loop(1e3, this, this.loopDoubleFireCountdown, [e]),
                s["default"].Instance.refreshFightingCapacity()
            },
            t.prototype.loopDoubleFireCountdown = function(e) {
                this.text_fireCountdown.text = m.utils.ParseTime2Format(o["default"].doubleFire_totalTime, "m:s"),
                this.douFireLen -= e,
                this.maskDouFire.graphics.clear(!0),
                this.maskDouFire.graphics.drawRect(0, this.img_fireCountdown.height - this.douFireLen, this.img_fireCountdown.width, this.douFireLen, "#ff0000"),
                o["default"].doubleFire_totalTime--,
                o["default"].doubleFire_totalTime <= 0 && (Laya.timer.clear(this, this.loopDoubleFireCountdown), this.btn_douFire.visible = !0, r["default"].showToast(I["default"].getText("TimeType10")), this.img_fireCountdown.mask = null, s["default"].Instance.refreshFightingCapacity()),
                window.ystorage.setItem(o["default"].LocalStorage.doubleFireTime, o["default"].doubleFire_totalTime.toString())
            },
            t.prototype.setHalfDifficultCountdown = function() {
                this.btn_halfDifficult.visible = !1,
                this.img_halfDifficultCountdown.width = this.btn_halfDifficult.width;
                var e = this.img_halfDifficultCountdown.height / o["default"].halfDifficult_totalTime;
                this.halfDiffLen = this.img_halfDifficultCountdown.height;
                var t = m.utils.ParseTime2Format(o["default"].halfDifficult_totalTime, "m:s");
                this.maskHalfDifficult.graphics.clear(!0),
                this.maskHalfDifficult.graphics.drawRect(0, 0, this.img_halfDifficultCountdown.width, this.halfDiffLen, "#ff0000"),
                this.img_halfDifficultCountdown.mask = this.maskHalfDifficult,
                this.text_halfDifficultCountdown.text = t,
                Laya.timer.loop(1e3, this, this.loopHalfDifficultCountdown, [e])
            },
            t.prototype.loopHalfDifficultCountdown = function(e) {
                this.text_halfDifficultCountdown.text = m.utils.ParseTime2Format(o["default"].halfDifficult_totalTime, "m:s"),
                this.halfDiffLen -= e,
                this.maskHalfDifficult.graphics.clear(!0),
                this.maskHalfDifficult.graphics.drawRect(0, this.img_halfDifficultCountdown.height - this.halfDiffLen, this.img_halfDifficultCountdown.width, this.halfDiffLen, "#ff0000"),
                o["default"].halfDifficult_totalTime--,
                o["default"].halfDifficult_totalTime <= 0 && (Laya.timer.clear(this, this.loopHalfDifficultCountdown), this.btn_halfDifficult.visible = !0, r["default"].showToast(I["default"].getText("TimeType11")), this.img_halfDifficultCountdown.mask = null),
                window.ystorage.setItem(o["default"].LocalStorage.halfDifficultTime, o["default"].halfDifficult_totalTime.toString())
            },
            t.prototype.createAutoSkin = function() {
                if (y.SoundMgr.playSound(o["default"].SoundConfig.buttonClick), r["default"].Instance.aldSendEvent("自动合并", {
                    "点击按钮": "icon点击"
                }), o["default"].autoSynthesis_totalTime > 3240) r["default"].showToast(I["default"].getText("compose4"));
                else if (Laya.Browser.window.h5api.canPlayAd()) {
                    var e = new g["default"](h.TimeType.AutoCompose);
                    e.popup()
                } else r["default"].showToast(I["default"].getText("loadFail"))
            },
            t.prototype.createTech = function() {
                y.SoundMgr.playSound(o["default"].SoundConfig.buttonClick),
                r["default"].Instance.aldSendEvent("科技", {
                    "点击按钮": "icon点击"
                }),
                s["default"].Instance.failGuide.clear(3),
                p["default"].Instance.maxLevel < 11 ? r["default"].showToast(I["default"].getText("compose5")) : (s["default"].Instance.pouseGame = !0, null == this.techPanel && (this.techPanel = new f["default"], this.techPanel.x = .5 * (Laya.stage.width - this.techPanel.width)), Laya.stage.addChild(this.techPanel))
            },
            t.prototype.onDouGold = function() {
                if (y.SoundMgr.playSound(o["default"].SoundConfig.buttonClick), s["default"].Instance.failGuide.clear(4), r["default"].Instance.aldSendEvent("icon点击", {
                    "按钮点击": "点击金币*2"
                }), o["default"].doubleGold_totalTime > 3240) r["default"].showToast(I["default"].getText("compose6"));
                else if (Laya.Browser.window.h5api.canPlayAd()) {
                    var e = new g["default"](h.TimeType.DoubleGold);
                    e.popup()
                } else r["default"].showToast(I["default"].getText("loadFail"))
            },
            t.prototype.onDouFire = function() {
                if (y.SoundMgr.playSound(o["default"].SoundConfig.buttonClick), r["default"].Instance.aldSendEvent("icon点击", {
                    "按钮点击": "点击火力*2"
                }), s["default"].Instance.failGuide.clear(0), o["default"].doubleFire_totalTime > 3240) r["default"].showToast(I["default"].getText("compose6"));
                else if (Laya.Browser.window.h5api.canPlayAd()) {
                    var e = new g["default"](h.TimeType.DoubleFire);
                    e.popup()
                } else r["default"].showToast(I["default"].getText("loadFail"))
            },
            t.prototype.onHalfDifficult = function() {
                if (y.SoundMgr.playSound(o["default"].SoundConfig.buttonClick), r["default"].Instance.aldSendEvent("icon点击", {
                    "按钮点击": "点击难度-半"
                }), s["default"].Instance.failGuide.clear(1), o["default"].halfDifficult_totalTime > 3240) r["default"].showToast(I["default"].getText("compose6"));
                else if (Laya.Browser.window.h5api.canPlayAd()) {
                    var e = new g["default"](h.TimeType.HalfDifficult);
                    e.popup()
                } else r["default"].showToast(I["default"].getText("loadFail"))
            },
            t.prototype.onMall = function() {
                return y.SoundMgr.playSound(o["default"].SoundConfig.buttonClick),
                r["default"].Instance.aldSendEvent("icon点击", {
                    "按钮点击": "点击商城"
                }),
                console.log("Player.Instance.loginDays   ", p["default"].Instance.loginDays),
                s["default"].Instance.giftPanel.onShow()
                // p["default"].Instance.loginDays < 2 ? void r["default"].showToast(I["default"].getText("compose8")) : void s["default"].Instance.giftPanel.onShow()
            },
            t
        } (a.ui.ComposePanelUI);
        i["default"] = _
    },
    {
        "../../../ui/layaMaxUI": 51,
        "../../manager/GameMgr": 7,
        "../../manager/PoolMgr": 10,
        "../../manager/RoleMgr": 11,
        "../../manager/SoundMgr": 12,
        "../../manager/WxApiMgr": 13,
        "../../model/GiftData": 14,
        "../../model/Global": 15,
        "../../model/MapData": 16,
        "../../model/Player": 17,
        "../../object/Battery": 18,
        "../../object/Cannon": 22,
        "../../utils/Dictionary": 24,
        "../../utils/TextUtils": 29,
        "../../utils/Utils": 30,
        "../Dialog/AutoComposeDialog": 31,
        "../Dialog/GetGoldDialog": 33,
        "../Dialog/NewBatteryDialog": 36,
        "./FontItem": 43,
        "./TechnologyPanel": 49
    }],
    42 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../../../ui/layaMaxUI"),
        o = e("../../utils/TextUtils"),
        n = e("../../manager/GameMgr"),
        l = e("../../manager/SoundMgr"),
        s = e("../../model/Global"),
        r = e("../../manager/WxApiMgr"),
        p = e("../Dialog/GetNewDialog"),
        d = e("../../model/MapData"),
        u = e("../Dialog/WinDialog"),
        g = function(e) {
            function t() {
                var t = e.call(this) || this;
                return t.bg.alpha = 0,
                t.labText.text = "",
                t.labText.y = .4 * Laya.stage.height,
                t.imgBattery.visible = !1,
                t.mouseEnabled = !0,
                t
            }
            return __extends(t, e),
            t.prototype.startShow = function() {
                Laya.stage.addChild(this),
                this.redBg.visible = !1,
                this.tipBg.visible = !1,
                this.bg.alpha = 0,
                this.labText.y = -100,
                this.labText.alpha = 1,
                this.labText.x = 375,
                this.labLevel.alpha = 0;
                var e = this;
                setTimeout(function() {
                    e.labText.text = o["default"].getText("0", [n["default"].Instance.curLevel.toString()]),
                    Laya.Tween.to(e.labText, {
                        y: 629
                    },
                    1e3),
                    Laya.Tween.to(e.labText, {
                        alpha: 0
                    },
                    100, null, Laya.Handler.create(e,
                    function() {
                        var t = d["default"].BlockLevelDic.getValue(n["default"].Instance.curLevel);
                        t && t.boss ? (e.redBg.visible = !0, e.tipBg.visible = !0, setTimeout(function() {
                            e.redBg.visible = !1,
                            e.tipBg.visible = !1,
                            n["default"].Instance.showNext(!0)
                        },
                        2e3)) : n["default"].Instance.showNext(!0)
                    }), 1800)
                },
                1e3)
            },
            t.prototype.showFail = function(e) {
                this.mouseEnabled = !0,
                Laya.stage.addChild(this),
                l.SoundMgr.playSound(s["default"].SoundConfig.lose),
                this.bg.alpha = 0,
                this.redBg.visible = !1,
                this.tipBg.visible = !1,
                Laya.Tween.to(this.bg, {
                    alpha: 1
                },
                1e3, null),
                this.labText.x = 375,
                this.labText.y = -100,
                this.labText.alpha = 1,
                this.labText.text = o["default"].getText("1"),
                Laya.Tween.to(this.labText, {
                    y: 629
                },
                1e3, null, null, 1e3),
                Laya.Tween.to(this.labText, {
                    alpha: 0
                },
                100, null, null, 2800);
                var t = this;
                setTimeout(function() {
                    t.labLevel.alpha = 1,
                    t.labLevel.text = o["default"].getText("0", [n["default"].Instance.curLevel.toString()]),
                    t.labLevel.y = -100,
                    t.labLevel.x = 375,
                    Laya.Tween.to(t.labLevel, {
                        y: 629
                    },
                    1e3),
                    Laya.Tween.to(t.labLevel, {
                        alpha: 0
                    },
                    100, null, null, 1800),
                    Laya.Tween.to(t.bg, {
                        alpha: 0
                    },
                    1e3, null, Laya.Handler.create(t,
                    function() {
                        if (!n["default"].Instance.pouseGame) {
                            n["default"].Instance.showNext(!1),
                            e || n["default"].Instance.LevelLayer.updateLevel_fail()
                        }
                    }), 2800)
                }, 2500);
                r["default"].showFullScreenAd(() => {
                    n["default"].Instance.pouseGame = !0;
                }, () => {
                    n["default"].Instance.pouseGame = !1;
                    n["default"].Instance.showNext(!1),
                    e || n["default"].Instance.LevelLayer.updateLevel_fail()
                }),
                console.log("ui.FailUIUI -- showFail")
            },
            t.prototype.showSuccess = function() {
                this.mouseEnabled = !1,
                r["default"].Instance.aldSendEvent("关卡", {
                    "闯关": "成功，第" + (n["default"].Instance.curLevel - 1) + "关"
                }),
                Laya.stage.addChild(this),
                l.SoundMgr.playSound(s["default"].SoundConfig.win),
                this.redBg.visible = !1,
                this.tipBg.visible = !1,
                this.bg.alpha = 0,
                n["default"].Instance.curBlockLevelData && n["default"].Instance.curBlockLevelData.boss ? 
                (setTimeout(function() {
                    var e = new u["default"];
                    e.popup()
                }, 1e3)) : (this.labText.x = 375, this.labText.y = -100, this.labText.alpha = 1, this.labText.text = o["default"].getText("2"), Laya.Tween.to(this.labText, {
                    y: 629
                },
                1e3, null, null), Laya.Tween.to(this.labText, {
                    alpha: 0
                },
                100, null, null, 1800), this.showUnlockBattery());
                console.log("ui.FailUIUI -- showSuccess")
            },
            t.prototype.showUnlockBattery = function() {
                var e = n["default"].Instance.ComposeLayer.getLockBatteryPos(),
                t = e.pos,
                i = this;
                t.length > 0 ? setTimeout(function() {
                    var a = "";
                    1 == e.type ? a = s["default"].PanelUrl + "GunmountUI_1.png": 2 == e.type && (a = s["default"].PanelUrl + "upgradeIcon.png"),
                    i.imgBattery.loadImage(a, Laya.Handler.create(i,
                    function() {
                        i.imgBattery.pivotX = .5 * i.imgBattery.width,
                        i.imgBattery.pivotY = .5 * i.imgBattery.height,
                        i.imgBattery.x = .5 * n["default"].Instance.gameLayer.width,
                        i.imgBattery.y = 667
                    }));
                    var o = new p["default"](e.type);
                    o.popup(),
                    setTimeout(function() {
                        o.close(),
                        i.imgBattery.visible = !0;
                        var a = 1e3,
                        r = 0;
                        1 == e.type ? (a = 1e3, r = t[1] + n["default"].Instance.ComposeLayer.y + n["default"].Instance.ComposeLayer.sp_box_battery.y) : 2 == e.type && (a = 1500, r = t[1] + n["default"].Instance.ComposeLayer.y),
                        Laya.Tween.to(i.imgBattery, {
                            x: t[0],
                            y: r
                        },
                        a, null, Laya.Handler.create(i,
                        function() {
                            l.SoundMgr.playSound(s["default"].SoundConfig.buttonClick),
                            i.imgBattery.visible = !1,
                            i.labText.alpha = 0,
                            n["default"].Instance.ComposeLayer.setBatteryLock(),
                            i.nextTrue()
                        }))
                    }, 2e3)
                }, 3e3) : setTimeout(function() {
                    i.nextTrue()
                }, 1500);
                console.log("ui.FailUIUI -- showUnlockBattery")
            },
            t.prototype.nextTrue = function() {
                var e = this;
                e.labLevel.text = o["default"].getText("0", [n["default"].Instance.curLevel.toString()]),
                e.labLevel.y = -100,
                e.labLevel.alpha = 1,
                Laya.Tween.to(e.labLevel, {
                    y: 629
                },
                1e3),
                Laya.Tween.to(e.labLevel, {
                    alpha: 0
                },
                100, null, Laya.Handler.create(e,
                function() {
                    var t = d["default"].BlockLevelDic.getValue(n["default"].Instance.curLevel);
                    t && t.boss ? (e.redBg.visible = !0, e.tipBg.visible = !0, setTimeout(function() {
                        e.redBg.visible = !1,
                        e.tipBg.visible = !1,
                        n["default"].Instance.showNext(!0),
                        n["default"].Instance.LevelLayer.updateLevel_succ()
                    },
                    2e3)) : (n["default"].Instance.showNext(!0), n["default"].Instance.LevelLayer.updateLevel_succ())
                }), 1800)
            },
            t.prototype.flyIcon = function(e) {
                var t = this,
                i = s["default"].GiftUrl + "kejiui_hexin_" + e.toString() + ".png";
                t.imgBattery.visible = !0,
                t.imgBattery.loadImage(i, Laya.Handler.create(t,
                function() {
                    t.imgBattery.pivotX = .5 * t.imgBattery.width,
                    t.imgBattery.pivotY = .5 * t.imgBattery.height,
                    t.imgBattery.x = .5 * n["default"].Instance.gameLayer.width,
                    t.imgBattery.y = 667
                }));
                var a = 501 + n["default"].Instance.ComposeLayer.y;
                Laya.Tween.to(t.imgBattery, {
                    x: 123,
                    y: a
                },
                1500, null, Laya.Handler.create(t,
                function() {
                    l.SoundMgr.playSound(s["default"].SoundConfig.buttonClick),
                    t.imgBattery.visible = !1,
                    t.labText.alpha = 0,
                    t.showUnlockBattery()
                }))
            },
            t
        } (a.ui.FailUIUI);
        i["default"] = g
    },
    {
        "../../../ui/layaMaxUI": 51,
        "../../manager/GameMgr": 7,
        "../../manager/SoundMgr": 12,
        "../../manager/WxApiMgr": 13,
        "../../model/Global": 15,
        "../../model/MapData": 16,
        "../../utils/TextUtils": 29,
        "../Dialog/GetNewDialog": 34,
        "../Dialog/WinDialog": 40
    }],
    43 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../../../ui/layaMaxUI"),
        o = e("../../model/Global"),
        n = function(e) {
            function t(t, i, a) {
                void 0 === a && (a = 1);
                var o = e.call(this) || this;
                return o.align = "left",
                o.type = 0,
                o.urlStr = "common_shadownum_",
                o.spArr = new Array,
                o.sc = 1,
                o.letterScale = .8,
                o.numTest.visible = !1,
                o.init(t, i, a),
                o
            }
            return __extends(t, e),
            t.prototype.init = function(e, t, i) {
                this.align = t,
                this.type = e,
                this.sc = i,
                0 == this.type ? (this.urlStr = "common_shadownum_", this.spWidth = 16 * this.sc) : 1 == this.type && (this.urlStr = "common_num_", this.spWidth = 20 * this.sc)
            },
            t.prototype.setNumStr = function(e) {
                if (this.str != e) {
                    this.str = e;
                    var t = this.str.length;
                    this.width = this.spWidth * t;
                    for (var i, a = this,
                    n = 0; t > n; n++) this.spArr[n] ? (i = this.spArr[n], i.name != this.str[n] && (i.loadImage(o["default"].PanelUrl + this.urlStr + this.str[n] + ".png"), i.name = this.str[n])) : (i = new Laya.Sprite, i.loadImage(o["default"].PanelUrl + this.urlStr + this.str[n] + ".png"), i.name = this.str[n], this.spArr.push(i), this.addChild(i)),
                    "left" == a.align ? i.x = a.spWidth * n: "center" == a.align ? i.x = a.spWidth * (n - .5 * t) : "right" == a.align && (i.x = a.spWidth * (n - t)),
                    "K" == this.str[n] || "B" == this.str[n] || "M" == this.str[n] || "G" == this.str[n] || "T" == this.str[n] ? (i.scaleX = i.scaleY = this.sc * this.letterScale, i.y = 5 * this.sc) : (i.scaleX = i.scaleY = this.sc, i.y = 0);
                    for (; this.spArr.length > t;) this.spArr.pop().removeSelf()
                }
            },
            t.prototype.clear = function() {
                this.spArr.splice(0),
                this.removeChildren()
            },
            t
        } (a.ui.FontUIUI);
        i["default"] = n
    },
    {
        "../../../ui/layaMaxUI": 51,
        "../../model/Global": 15
    }],
    44 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../../../ui/layaMaxUI"),
        o = e("../../model/Global"),
        n = e("../../manager/SoundMgr"),
        l = e("../Dialog/GiftInfoDialog"),
        s = function(e) {
            function t() {
                var t = e.call(this) || this;
                return t.init(),
                t
            }
            return __extends(t, e),
            t.prototype.init = function() {
                this.autoDestroyAtClosed = !0
            },
            t.prototype.setData = function(e) {
                this.giftBagData = e,
                this.labLv.text = "Lv:" + e.color,
                this.imgIcon.on(Laya.Event.CLICK, this, this.onClick),
                this.imgIcon.skin = o["default"].GiftUrl + "kejiui_hexin_" + this.giftBagData.type.toString() + ".png"
            },
            t.prototype.onClick = function() {
                n.SoundMgr.playSound(o["default"].SoundConfig.buttonClick);
                var e = new l["default"](this.giftBagData, 0);
                e.popup()
            },
            t.prototype.close = function() {
                e.prototype.close.call(this),
                this.giftBagData = null,
                this.imgIcon.off(Laya.Event.CLICK, this, this.onClick)
            },
            t
        } (a.ui.GiftItemUI);
        i["default"] = s
    },
    {
        "../../../ui/layaMaxUI": 51,
        "../../manager/SoundMgr": 12,
        "../../model/Global": 15,
        "../Dialog/GiftInfoDialog": 35
    }],
    45 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../../../ui/layaMaxUI"),
        o = e("../../manager/SoundMgr"),
        n = e("../../model/Global"),
        l = e("../../model/Player"),
        s = e("../../manager/WxApiMgr"),
        r = e("../../utils/Utils"),
        p = e("./GiftItem"),
        d = e("../../model/GiftData"),
        u = e("../Dialog/GetGiftDialog"),
        g = e("../../manager/GameMgr"),
        h = e("../../model/MapData"),
        c = e("../Dialog/GiftInfoDialog"),
        f = e("../../utils/TextUtils"),
        m = function(e) {
            function t() {
                var t = e.call(this) || this;
                return t.rampageCountDown = 0,
                t.rampageTotal = 0,
                t.timeline = new Laya.TimeLine,
                t.leftHole = 0,
                t.init(),
                t
            }
            return __extends(t, e),
            t.prototype.init = function() {
                this.height = Laya.stage.height,
                this.sp_box.y += n["default"].offsetY,
                this.btnClose.on(Laya.Event.CLICK, this, this.onHide),
                this.timeline.to(this.btnRampage, {
                    rotation: -10
                },
                208).to(this.btnRampage, {
                    rotation: 10
                },
                416).to(this.btnRampage, {
                    rotation: 0
                },
                208).to(this.btnRampage, {
                    rotation: 0
                },
                2e3),
                this.btnRampage.on(Laya.Event.CLICK, this, this.onRampage),
                this.btnProperty.on(Laya.Event.CLICK, this, this.onProperty),
                this.infoBg.on(Laya.Event.CLICK, this, this.offProperty),
                this.btn_close.on(Laya.Event.CLICK, this, this.onHide),
                this.giftBagDataArr = new Array,
                this.giftBagDataEquipArr = new Array,
                this.listGift.elasticEnabled = !0,
                this.listGift.itemRender = p["default"],
                this.listGift.hScrollBarSkin = "",
                this.listGift.renderHandler = new Laya.Handler(this, this.updateItem),
                this.refreshList(),
                this.labHaveRampage.visible = !1
            },
            t.prototype.updateItem = function(e, t) {
                e.setData(e.dataSource)
            },
            t.prototype.refreshGiftEquip = function() {
                this.leftHole = 0,
                this.giftBagDataEquipArr.splice(0);
                for (var e, t, i, a, o, s, r, p, u, g = this.giftEquip.numChildren,
                h = l["default"].Instance.giftEquipArr.length, c = !0, m = 0; g > m; m++) if (t = this.giftEquip.getChildAt(m), i = t.getChildByName("bg"), a = t.getChildByName("lock"), o = t.getChildByName("icon"), s = t.getChildByName("labLv"), r = t.getChildByName("lockLevel"), p = r.getChildByName("labOpen"), u = this.imgInfo.getChildAt(m), p.text = n["default"].giftUnlockArr[m], l["default"].Instance.maxLevel - 1 >= Number(n["default"].giftUnlockArr[m])) if (i.visible = !0, o.visible = !0, s.visible = !0, a.visible = !1, r.visible = !1, h > m) {
                    var y = Number(l["default"].Instance.giftEquipArr[m]);
                    s.text = "Lv:" + y % 1e3,
                    e = new d.GiftBagData,
                    e.index = m,
                    e.id = Number(l["default"].Instance.giftEquipArr[m]),
                    e.type = Math.floor(.001 * e.id),
                    e.color = e.id % 1e3,
                    e.effect = Number(l["default"].Instance.giftEffectEquipArr[m]),
                    e.belong = 2,
                    this.giftBagDataEquipArr.push(e),
                    o.skin = n["default"].GiftUrl + "kejiui_hexin_" + e.type.toString() + ".png",
                    t.on(Laya.Event.CLICK, this, this.onClickEqiupGift, [1, e]);
                    var v = 1,
                    I = 0;
                    2 == e.type || 8 == e.type ? (v = .01, I = Math.floor(e.effect * v)) : I = e.effect * v,
                    u.text = f["default"].getText("GiftDes" + e.type.toString(), [I.toString()])
                } else this.leftHole++,
                o.skin = "",
                s.text = "",
                u.text = "",
                t.off(Laya.Event.CLICK, this, this.onClickEqiupGift);
                else i.visible = !1,
                o.visible = !1,
                s.visible = !1,
                a.visible = !0,
                r.visible = !1,
                c ? (c = !1, a.visible = !1, r.visible = !0, t.on(Laya.Event.CLICK, this, this.onClickEqiupGift, [2, p.text])) : t.on(Laya.Event.CLICK, this, this.onClickEqiupGift, [3]),
                u.text = ""
            },
            t.prototype.onClickEqiupGift = function(e, t) {
                if (o.SoundMgr.playSound(n["default"].SoundConfig.buttonClick), 1 == e) {
                    var i = new c["default"](t, 1);
                    i.popup()
                } else 2 == e ? s["default"].showToast(f["default"].getText("compose1", [t])) : 3 == e && s["default"].showToast(f["default"].getText("compose2"))
            },
            t.prototype.onProperty = function() {
                var e = l["default"].Instance.giftEquipArr.length;
                0 >= e ? s["default"].showToast(f["default"].getText("Gift11")) : (this.infoBg.visible = !0, this.sp_info.visible = !0)
            },
            t.prototype.offProperty = function() {
                this.infoBg.visible = !1,
                this.sp_info.visible = !1
            },
            t.prototype.refreshList = function() {
                var e;
                this.giftBagDataArr.splice(0);
                for (var t = 0; t < l["default"].Instance.giftBagArr.length; t++) e = new d.GiftBagData,
                e.index = t,
                e.id = Number(l["default"].Instance.giftBagArr[t]),
                e.type = Math.floor(.001 * e.id),
                e.color = e.id % 1e3,
                e.effect = Number(l["default"].Instance.giftEffectBagArr[t]),
                e.belong = 1,
                this.giftBagDataArr.push(e);
                this.listGift.array = this.giftBagDataArr
            },
            t.prototype.handleBag = function(e, t) {
                var i, a;
                switch (t) {
                case 0:
                    l["default"].Instance.giftBagArr.push(e.id.toString()),
                    l["default"].Instance.giftEffectBagArr.push(e.effect.toString()),
                    this.refreshList();
                    break;
                case 1:
                    if (!this.checkCanEquip(e)) return;
                    i = l["default"].Instance.giftBagArr.splice(e.index, 1),
                    a = l["default"].Instance.giftEffectBagArr.splice(e.index, 1),
                    l["default"].Instance.giftEquipArr.push(i[0]),
                    l["default"].Instance.giftEffectEquipArr.push(a[0]),
                    l["default"].Instance.setGiftData(),
                    this.refreshGiftEquip(),
                    window.ystorage.setItem(n["default"].LocalStorage.giftEquip, l["default"].Instance.giftEquipArr.toString()),
                    window.ystorage.setItem(n["default"].LocalStorage.giftEquipEffect, l["default"].Instance.giftEffectEquipArr.toString()),
                    this.refreshList(),
                    s["default"].showToast(f["default"].getText("Gift7"));
                    break;
                case 2:
                    i = l["default"].Instance.giftEquipArr.splice(e.index, 1),
                    a = l["default"].Instance.giftEffectEquipArr.splice(e.index, 1),
                    l["default"].Instance.setGiftData(),
                    this.refreshGiftEquip(),
                    window.ystorage.setItem(n["default"].LocalStorage.giftEquip, l["default"].Instance.giftEquipArr.toString()),
                    window.ystorage.setItem(n["default"].LocalStorage.giftEquipEffect, l["default"].Instance.giftEffectEquipArr.toString()),
                    l["default"].Instance.giftBagArr.push(i[0]),
                    l["default"].Instance.giftEffectBagArr.push(a[0]),
                    this.refreshList(),
                    s["default"].showToast(f["default"].getText("Gift8"));
                    break;
                case 3:
                    1 == e.belong ? (l["default"].Instance.giftBagArr.splice(e.index, 1), l["default"].Instance.giftEffectBagArr.splice(e.index, 1), this.refreshList()) : 2 == e.belong && (l["default"].Instance.giftEquipArr.splice(e.index, 1), l["default"].Instance.giftEffectEquipArr.splice(e.index, 1), l["default"].Instance.setGiftData(), this.refreshGiftEquip(), window.ystorage.setItem(n["default"].LocalStorage.giftEquip, l["default"].Instance.giftEquipArr.toString()), window.ystorage.setItem(n["default"].LocalStorage.giftEquipEffect, l["default"].Instance.giftEffectEquipArr.toString())),
                    s["default"].showToast(f["default"].getText("Gift4"));
                    var o = Math.floor(h["default"].GetGoldDic.getValue(l["default"].Instance.maxLevel).gold * e.color * .2);
                    l["default"].Instance.gold += o,
                    window.ystorage.setItem(n["default"].LocalStorage.user_gold, l["default"].Instance.gold.toString()),
                    g["default"].Instance.LevelLayer.updateGold()
                }
                window.ystorage.setItem(n["default"].LocalStorage.giftBag, l["default"].Instance.giftBagArr.toString()),
                window.ystorage.setItem(n["default"].LocalStorage.giftBagEffect, l["default"].Instance.giftEffectBagArr.toString())
            },
            t.prototype.checkCanEquip = function(e) {
                for (var t, i = this.giftBagDataEquipArr.length,
                a = 0; i > a; a++) if (t = this.giftBagDataEquipArr[a], t.type == e.type) return t.color < e.color ? (l["default"].Instance.giftEquipArr.splice(t.index, 1), l["default"].Instance.giftEffectEquipArr.splice(t.index, 1), l["default"].Instance.giftEquipArr.push(e.id), l["default"].Instance.giftEffectEquipArr.push(e.effect), l["default"].Instance.giftBagArr.splice(e.index, 1), l["default"].Instance.giftEffectBagArr.splice(e.index, 1), l["default"].Instance.giftBagArr.push(t.id), l["default"].Instance.giftEffectBagArr.push(t.effect), l["default"].Instance.setGiftData(), this.refreshGiftEquip(), window.ystorage.setItem(n["default"].LocalStorage.giftEquip, l["default"].Instance.giftEquipArr.toString()), window.ystorage.setItem(n["default"].LocalStorage.giftEquipEffect, l["default"].Instance.giftEffectEquipArr.toString()), this.refreshList(), window.ystorage.setItem(n["default"].LocalStorage.giftBag, l["default"].Instance.giftBagArr.toString()), window.ystorage.setItem(n["default"].LocalStorage.giftBagEffect, l["default"].Instance.giftEffectBagArr.toString()), s["default"].showToast(f["default"].getText("Gift5"))) : s["default"].showToast(f["default"].getText("Gift3")),
                !1;
                return this.leftHole <= 0 ? (s["default"].showToast(f["default"].getText("Gift2")), !1) : !0
            },
            t.prototype.onShow = function() {
                g["default"].Instance.pouseGame = !0,
                this.infoBg.visible = !1,
                this.sp_info.visible = !1,
                Laya.stage.addChild(this),
                this.startRampageTimer(),
                this.refreshGiftEquip(),
                s["default"].showFullScreenAd(),
                console.log("ui.GiftPanelUI")
            },
            t.prototype.onHide = function() {
                o.SoundMgr.playSound(n["default"].SoundConfig.buttonClick),
                g["default"].Instance.pouseGame = !1,
                this.removeSelf(),
                this.timeline.gotoTime(0),
                this.timeline.pause()
                // s["default"].hideBanner()
            },
            t.prototype.onRampage = function() {
                if (o.SoundMgr.playSound(n["default"].SoundConfig.buttonClick), l["default"].Instance.haveRampageTimes > 0) {
                    var e = new u["default"](0);
                    e.popup()
                } else {
                    s["default"].Instance.aldSendEvent("点击暴走", {
                        "点击按钮": "弹出"
                    });
                    var e = new u["default"](1);
                    e.popup()
                }
            },
            t.prototype.getReturn = function() {
                if (s["default"].Instance.aldSendEvent("点击暴走", {
                    "点击按钮": "成功"
                }), l["default"].Instance.haveRampageTimes--, this.labHaveRampage.text = l["default"].Instance.haveRampageTimes.toString(), window.ystorage.setItem(n["default"].LocalStorage.RampageHave, l["default"].Instance.haveRampageTimes.toString()), l["default"].Instance.useRampageTimes++, window.ystorage.setItem(n["default"].LocalStorage.RampageNum, l["default"].Instance.useRampageTimes.toString()), l["default"].Instance.haveRampageTimes <= 0) {
                    var e = (new Date).getTime();
                    window.ystorage.setItem(n["default"].LocalStorage.RampageTime, e.toString()),
                    this.timeline.gotoTime(0),
                    this.timeline.pause(),
                    l["default"].Instance.useRampageTimes < n["default"].rampageSpanArr.length && l["default"].Instance.rampageWaitTimes < n["default"].rampageSpanArr.length - 2 && (this.rampageCountDown = Number(n["default"].rampageSpanArr[l["default"].Instance.useRampageTimes]), this.rampageTotal = this.rampageCountDown)
                }
                this.startRampageTimer()
            },
            t.prototype.startRampageTimer = function() {
                l["default"].Instance.haveRampageTimes > 0 ? this.setRampageReady() : (this.labHaveRampage.text = "", this.labRampageTime.text = "", l["default"].Instance.useRampageTimes < n["default"].rampageSpanArr.length && (this.rampageTimer || (this.rampageTimer = new Laya.Timer), this.rampageCountDown > 0 && this.rampageTimer.loop(1e3, this, this.onRampageTimer)))
            },
            t.prototype.waitGet = function() {
                l["default"].Instance.haveRampageTimes++,
                window.ystorage.setItem(n["default"].LocalStorage.RampageHave, l["default"].Instance.haveRampageTimes.toString()),
                l["default"].Instance.rampageWaitTimes++,
                window.ystorage.setItem(n["default"].LocalStorage.RampageWaitTimes, l["default"].Instance.rampageWaitTimes.toString()),
                this.setRampageReady()
            },
            t.prototype.videoGet = function() {
                l["default"].Instance.haveRampageTimes++,
                window.ystorage.setItem(n["default"].LocalStorage.RampageHave, l["default"].Instance.haveRampageTimes.toString()),
                l["default"].Instance.rampageVideoTimes++,
                console.log("Player.Instance.rampageVideoTimes  ", l["default"].Instance.rampageVideoTimes),
                window.ystorage.setItem(n["default"].LocalStorage.RampageVideoTimes, l["default"].Instance.rampageVideoTimes.toString()),
                this.rampageTimer.clear(this, this.onRampageTimer),
                this.setRampageReady()
            },
            t.prototype.setRampageReady = function() {
                this.labHaveRampage.text = l["default"].Instance.haveRampageTimes.toString(),
                this.labRampageTime.text = "",
                this.timeline.play(0, !0)
            },
            t.prototype.onRampageTimer = function() {
                if (this.rampageCountDown--, this.rampageCountDown <= 0) this.rampageTimer.clear(this, this.onRampageTimer),
                this.waitGet();
                else {
                    120 * (this.rampageTotal - this.rampageCountDown) / this.rampageTotal;
                    this.labRampageTime.changeText(r.utils.ParseTime2Format(this.rampageCountDown))
                }
            },
            t
        } (a.ui.GiftPanelUI);
        i["default"] = m
    },
    {
        "../../../ui/layaMaxUI": 51,
        "../../manager/GameMgr": 7,
        "../../manager/SoundMgr": 12,
        "../../manager/WxApiMgr": 13,
        "../../model/GiftData": 14,
        "../../model/Global": 15,
        "../../model/MapData": 16,
        "../../model/Player": 17,
        "../../utils/TextUtils": 29,
        "../../utils/Utils": 30,
        "../Dialog/GetGiftDialog": 32,
        "../Dialog/GiftInfoDialog": 35,
        "./GiftItem": 44
    }],
    46 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../../../ui/layaMaxUI"),
        o = e("../../manager/GameMgr"),
        n = e("../../model/Global"),
        l = e("../../model/Player"),
        s = e("../../utils/Utils"),
        r = e("../../model/MapData"),
        p = e("../Dialog/SuggestionDialog"),
        d = e("../../manager/WxApiMgr"),
        u = e("../../manager/SoundMgr"),
        g = e("./FontItem"),
        h = function(e) {
            function t() {
                var t = e.call(this) || this;
                return t.levelArr = [],
                t.posArr_succ = [],
                t.posArr_fail = [],
                t.fontFightCapacity = new g["default"](1, "center", .8),
                t.fontGold = new g["default"](1, "left", 1.2),
                t.init(),
                t
            }
            return __extends(t, e),
            t.prototype.init = function() {
                var e = new Laya.Sprite;
                e.graphics.drawRect(0, this.sp_box.y - 10, this.sp_box.width, this.sp_box.height + 10, "#ffffff"),
                this.sp_box.mask = e;
                var t = this.sp_box.getChildAt(0),
                i = t.x - t.width - 10;
                this.posArr_succ[0] = [i, t.y];
                for (var a = 0; a < this.sp_box.numChildren; a++) {
                    var r = this.sp_box.getChildAt(a);
                    this.posArr_succ.push([r.x, r.y]),
                    this.posArr_fail.push([r.x, r.y])
                }
                var p = this.sp_box.getChildAt(this.sp_box.numChildren - 1),
                d = p.x + p.width + 10;
                this.posArr_fail.push([d, p.y]),
                this.setLevel();
                for (var u = 0,
                a = 0; a < this.sp_box.numChildren; a++) {
                    var g = this.sp_box.getChildAt(a);
                    0 == this.levelArr[u] && (g.visible = !1),
                    this.levelArr[u] == o["default"].Instance.curLevel && g.scale(1.2, 1.2),
                    this.createText(this.levelArr[u], g),
                    this.isBossLevel(this.levelArr[u], g),
                    u++
                }
                if (1 == this.levelArr[1]) {
                    var h = this.sp_box.getChildAt(1).getChildByName("img");
                    h.skin = n["default"].PanelUrl + "Topui_1.png"
                } else {
                    var c = this.sp_box.getChildAt(1);
                    if (c) {
                        var h = c.getChildByName("img");
                        h.skin = n["default"].PanelUrl + "Topui_1.png"
                    }
                }
                this.text_gold.parent && (this.sp_gold.addChild(this.fontGold), this.fontGold.setNumStr(s.utils.strShow(l["default"].Instance.gold)), this.fontGold.x = this.text_gold.x, this.fontGold.y = this.text_gold.y, this.sp_gold.x = .5 * (this.width - (this.fontGold.width + this.fontGold.x)), this.text_gold.removeSelf()),
                this.labFightingCapacity.parent && (this.fightBg.addChild(this.fontFightCapacity), this.fontFightCapacity.x = this.labFightingCapacity.x, this.fontFightCapacity.y = this.labFightingCapacity.y, this.labFightingCapacity.removeSelf()),
                this.btn_suggest.on(Laya.Event.CLICK, this, this.onSuggest),
                this.btn_suggest.visible = !1
            },
            t.prototype.isBossLevel = function(e, t) {
                var i = r["default"].BlockLevelDic.getValue(e),
                a = t.getChildByName("img");
                if (a && (a.skin = n["default"].PanelUrl + "Topui_bg_1.png"), i && i.boss) {
                    var o = new Laya.Image;
                    o.skin = n["default"].PanelUrl + "BOSSUi_1.png",
                    o.y = a.y - .5 * o.height,
                    o.x = .5 * (t.width - o.width),
                    t.addChild(o)
                }
            },
            t.prototype.setLevel = function() {
                if (this.levelArr = [], o["default"].Instance.curLevel < 2) 1 == o["default"].Instance.curLevel ? this.levelArr = [0, 1, 2] : 2 == o["default"].Instance.curLevel;
                else for (var e = o["default"].Instance.curLevel - 1, t = o["default"].Instance.curLevel + 1, i = e; t >= i; i++) this.levelArr.push(i);
                for (var i = 0; i < this.sp_box.numChildren; i++) {
                    var a = this.sp_box.getChildAt(i),
                    n = a.getChildByName("text");
                    n && (n.text = this.levelArr[i])
                }
            },
            t.prototype.createText = function(e, t) {
                if (void 0 != e) {
                    var i = new Laya.Text;
                    i.text = e.toString(),
                    i.width = t.width,
                    i.height = t.height,
                    i.align = "center",
                    i.valign = "middle",
                    i.fontSize = 32,
                    i.font = "SimHei",
                    i.color = "#24465b",
                    i.bold = !0,
                    i.name = "text",
                    t.addChild(i)
                }
            },
            t.prototype.onFontLoaded = function(e, t, i) {
                Laya.Text.registerBitmapFont("numFont", e);
                var a = new Laya.Text;
                a.text = "1",
                a.wordWrap = !0,
                a.font = "numFOnt",
                i.addChild(a)
            },
            t.prototype.updateLevel_succ = function() {
                var e = this,
                t = e.sp_box.getChildAt(e.sp_box.numChildren - 1),
                i = new Laya.Sprite;
                i.width = t.width,
                i.height = t.height,
                i.pivotX = .5 * i.width,
                i.pivotY = .5 * i.height,
                i.y = t.y,
                i.x = t.x + t.width + 10,
                e.sp_box.addChild(i);
                var a = new Laya.Image;
                a.skin = n["default"].PanelUrl + "Topui_bg_1.png",
                a.width = i.width,
                a.height = i.height,
                a.name = "img",
                i.addChild(a),
                e.createText(e.levelArr[e.levelArr.length - 1] + 1, i),
                this.isBossLevel(e.levelArr[e.levelArr.length - 1] + 1, i);
                for (var l = 0,
                s = 0; s < e.sp_box.numChildren; s++) {
                    var r = e.sp_box.getChildAt(s),
                    p = r.getChildByName("text"),
                    d = 1;
                    Number(p.text) == o["default"].Instance.curLevel && (d = 1.2),
                    Laya.Tween.to(r, {
                        x: e.posArr_succ[l][0],
                        y: e.posArr_succ[l][1],
                        scaleX: d,
                        scaleY: d
                    },
                    500),
                    l++
                }
                Laya.timer.once(600, e,
                function() {
                    e.sp_box.removeChild(e.sp_box.getChildAt(0)),
                    e.setLevel();
                    var t = this.sp_box.getChildAt(0);
                    if (t) {
                        var i = t.getChildByName("img");
                        i.skin = n["default"].PanelUrl + "Topui_bg_1.png"
                    }
                    if (t = this.sp_box.getChildAt(1)) {
                        var i = t.getChildByName("img");
                        i.skin = n["default"].PanelUrl + "Topui_1.png"
                    }
                })
            },
            t.prototype.updateLevel_fail = function() {
                if (! (o["default"].Instance.lastLevel < 2)) {
                    var e = this,
                    t = e.sp_box.getChildAt(0),
                    i = new Laya.Sprite;
                    i.width = t.width,
                    i.height = t.height,
                    i.pivotX = .5 * i.width,
                    i.pivotY = .5 * i.height,
                    i.y = t.y,
                    i.x = t.x - t.width - 10,
                    e.sp_box.addChildAt(i, 0);
                    var a = new Laya.Image;
                    a.skin = n["default"].PanelUrl + "Topui_bg_1.png",
                    a.width = i.width,
                    a.height = i.height,
                    a.name = "img",
                    i.addChild(a),
                    e.createText(e.levelArr[0] - 1, i),
                    e.isBossLevel(e.levelArr[0] - 1, i),
                    o["default"].Instance.curLevel < 2 && (i.visible = !1);
                    for (var l = 0,
                    s = 0; s < e.sp_box.numChildren; s++) {
                        var r = e.sp_box.getChildAt(s),
                        p = r.getChildByName("text"),
                        d = 1;
                        Number(p.text) == o["default"].Instance.curLevel && (d = 1.2),
                        Laya.Tween.to(r, {
                            x: e.posArr_fail[l][0],
                            y: e.posArr_fail[l][1],
                            scaleX: d,
                            scaleY: d
                        },
                        500),
                        l++
                    }
                    Laya.timer.once(600, e,
                    function() {
                        e.sp_box.removeChild(e.sp_box.getChildAt(e.sp_box.numChildren - 1)),
                        e.setLevel();
                        var t = this.sp_box.getChildAt(2);
                        if (t) {
                            var i = t.getChildByName("img");
                            i.skin = n["default"].PanelUrl + "Topui_bg_1.png"
                        }
                        if (t = this.sp_box.getChildAt(1)) {
                            var i = t.getChildByName("img");
                            i.skin = n["default"].PanelUrl + "Topui_1.png"
                        }
                    })
                }
            },
            t.prototype.updateGold = function() {
                this.fontGold.setNumStr(s.utils.strShow(l["default"].Instance.gold)),
                this.sp_gold.x = .5 * (this.width - (this.fontGold.width + this.fontGold.x))
            },
            t.prototype.onSuggest = function() {
                d["default"].Instance.aldSendEvent("投诉建议", {
                    "点击按钮": "点击icon"
                }),
                u.SoundMgr.playSound(n["default"].SoundConfig.buttonClick);
                var e = new p["default"];
                e.popup()
            },
            t
        } (a.ui.LevelPanelUI);
        i["default"] = h
    },
    {
        "../../../ui/layaMaxUI": 51,
        "../../manager/GameMgr": 7,
        "../../manager/SoundMgr": 12,
        "../../manager/WxApiMgr": 13,
        "../../model/Global": 15,
        "../../model/MapData": 16,
        "../../model/Player": 17,
        "../../utils/Utils": 30,
        "../Dialog/SuggestionDialog": 39,
        "./FontItem": 43
    }],
    47 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../../../ui/layaMaxUI"),
        o = e("../../model/Global"),
        n = function(e) {
            function t() {
                var t = e.call(this) || this;
                return t.init(),
                t
            }
            return __extends(t, e),
            t.prototype.init = function() {
                console.log("打开 ", o["default"].PanelName.LogoPanel)
            },
            t.prototype.close = function() {
                e.prototype.close.call(this),
                console.log("关闭 ", o["default"].PanelName.LogoPanel)
            },
            t
        } (a.ui.LogoPanelUI);
        i["default"] = n
    },
    {
        "../../../ui/layaMaxUI": 51,
        "../../model/Global": 15
    }],
    48 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../../../ui/layaMaxUI"),
        o = e("../../model/MapData"),
        n = e("../../model/Player"),
        l = e("../../model/Global"),
        s = e("../../manager/WxApiMgr"),
        r = e("../../manager/GameMgr"),
        p = e("../../utils/Utils"),
        d = e("../../utils/TextUtils"),
        u = e("../../manager/SoundMgr"),
        g = e("../Dialog/GetGoldDialog"),
        h = function(e) {
            function t() {
                var t = e.call(this) || this;
                return t.init(),
                t
            }
            return __extends(t, e),
            t.prototype.init = function() {
                this.autoDestroyAtClosed = !0,
                this.labUp.text = d["default"].getText("11"),
                this.btnBuy.on(Laya.Event.CLICK, this, this.clickBuy)
            },
            t.prototype.setData = function(e) {
                this.techData = e,
                this.imgIcon.loadImage(e.icon),
                this.labCurLevel.text = e.curLevel.toString(),
                this.labName.text = e.name,
                this.labNextLevel.text = e.nextLevelDes,
                this.labDes.text = e.des,
                this.labPrice.text = p.utils.strShow(e.cost);
                var t = this.iconGold.width + 10;
                this.labPrice.x = .5 * (this.btnBuy.width - this.labPrice.width + t),
                this.iconGold.x = this.labPrice.x - t,
                e.cost <= n["default"].Instance.gold ? this.img_hot.visible = !0 : this.img_hot.visible = !1
            },
            t.prototype.clickBuy = function() {
                if (u.SoundMgr.playSound(l["default"].SoundConfig.buttonClick), n["default"].Instance.gold >= this.techData.cost) {
                    n["default"].Instance.gold -= this.techData.cost,
                    window.ystorage.setItem(l["default"].LocalStorage.user_gold, n["default"].Instance.gold.toString());
                    var e = this.techData.curLevel + 1;
                    n["default"].Instance.techLevelArr[this.techData.index.toString()] = e.toString(),
                    window.ystorage.setItem(l["default"].LocalStorage.techLevel, n["default"].Instance.techLevelArr.toString());
                    var t = "techTip" + this.techData.index,
                    i = void 0,
                    a = void 0;
                    switch (this.techData.index) {
                    case 0:
                        i = e;
                        break;
                    case 1:
                        a = o["default"].UpgradeDic.getValue(e),
                        i = a.fire_effect;
                        break;
                    case 2:
                        a = o["default"].UpgradeDic.getValue(e),
                        i = a.outline_effect
                    }
                    s["default"].showToast(d["default"].getText(t, [i.toString()])),
                    r["default"].Instance.refreshTechData(),
                    r["default"].Instance.ComposeLayer.techPanel.refreshList(),
                    s["default"].Instance.aldSendEvent("科技", {
                        "点击按钮": "成功升级" + this.techData.name
                    }),
                    r["default"].Instance.ComposeLayer.updateImg()
                } else {
                    s["default"].Instance.aldSendEvent("科技", {
                        "点击按钮": "失败升级" + this.techData.name
                    }),
                    s["default"].showToast(d["default"].getText("6"));
                    var p = new g["default"];
                    p.popup()
                }
            },
            t.prototype.close = function() {
                e.prototype.close.call(this),
                this.btnBuy.off(Laya.Event.CLICK, this, this.clickBuy)
            },
            t
        } (a.ui.TechnologyItemUI);
        i["default"] = h
    },
    {
        "../../../ui/layaMaxUI": 51,
        "../../manager/GameMgr": 7,
        "../../manager/SoundMgr": 12,
        "../../manager/WxApiMgr": 13,
        "../../model/Global": 15,
        "../../model/MapData": 16,
        "../../model/Player": 17,
        "../../utils/TextUtils": 29,
        "../../utils/Utils": 30,
        "../Dialog/GetGoldDialog": 33
    }],
    49 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../../../ui/layaMaxUI"),
        o = e("./TechnologyItem"),
        n = e("../../model/MapData"),
        l = e("../../model/Global"),
        s = e("../../model/Player"),
        r = e("../../utils/TextUtils"),
        p = e("../../manager/GameMgr"),
        d = e("../../manager/SoundMgr"),
        u = e("../../manager/WxApiMgr"),
        g = function(e) {
            function t() {
                var t = e.call(this) || this;
                return t.height = Laya.stage.height,
                t.sp_box.y += l["default"].offsetY,
                t.init(),
                t
            }
            return __extends(t, e),
            t.prototype.init = function() {
                this.labTitle.text = r["default"].getText("11"),
                this.btnClose.on(Laya.Event.CLICK, this, this.clickClose),
                this.label_close.on(Laya.Event.CLICK, this, this.clickClose),
                this.list.elasticEnabled = !0,
                this.list.itemRender = o["default"],
                this.list.renderHandler = new Laya.Handler(this, this.updateItem),
                this.refreshList()
                console.log("ui.TechnologyPanelUI")
                // u["default"].showBanner()
            },
            t.prototype.refreshList = function() {
                for (var e, t, i, a = [], o = 0; o < s["default"].Instance.techLevelArr.length; o++) {
                    t = Number(s["default"].Instance.techLevelArr[o]),
                    i = n["default"].UpgradeDic.getValue(t),
                    e = new n.TechData,
                    e.index = o,
                    e.name = r["default"].getText("techName" + o),
                    e.des = r["default"].getText("techDes" + o);
                    var p = void 0,
                    d = void 0;
                    0 == o ? (p = t, d = i.paotai_gold) : 1 == o ? (p = i.fire_effect, d = i.fire_gold) : 2 == o && (p = i.outline_effect, d = i.outline_gold),
                    e.value = p,
                    e.nextLevelDes = r["default"].getText("techEffect" + o, [p]),
                    e.icon = l["default"].PanelUrl + "levelupUi_icon_" + o + ".png",
                    e.curLevel = t,
                    e.cost = d,
                    a.push(e)
                }
                this.list.array = a
            },
            t.prototype.updateItem = function(e, t) {
                e.setData(e.dataSource)
            },
            t.prototype.clickClose = function() {
                u["default"].Instance.aldSendEvent("科技", {
                    "点击按钮": "关闭"
                }),
                d.SoundMgr.playSound(l["default"].SoundConfig.buttonClick),
                p["default"].Instance.pouseGame = !1,
                this.removeSelf(),
                this.close()
                // u["default"].hideBanner()
            },
            t
        } (a.ui.TechnologyPanelUI);
        i["default"] = g
    },
    {
        "../../../ui/layaMaxUI": 51,
        "../../manager/GameMgr": 7,
        "../../manager/SoundMgr": 12,
        "../../manager/WxApiMgr": 13,
        "../../model/Global": 15,
        "../../model/MapData": 16,
        "../../model/Player": 17,
        "../../utils/TextUtils": 29,
        "./TechnologyItem": 48
    }],
    50 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("../../../ui/layaMaxUI"),
        o = e("../../manager/PoolMgr"),
        n = e("../../model/Global"),
        l = function(e) {
            function t() {
                var t = e.call(this) || this;
                return t.mouseEnabled = !1,
                t
            }
            return __extends(t, e),
            t.prototype.init = function(e) {
                this.labTip.text = e,
                this.labTip.alpha = 1,
                this.labTip.y = 600;
                var t = this;
                Laya.Tween.to(this.labTip, {
                    y: 400,
                    alpha: 0
                },
                1e3, null, Laya.Handler.create(this,
                function() {
                    t.clear()
                }), 300)
            },
            t.prototype.clear = function() {
                this.removeSelf(),
                o.PoolMgr.recover(n["default"].POOLNAME.TipPanel, this)
            },
            t
        } (a.ui.TipPanelUI);
        i["default"] = l
    },
    {
        "../../../ui/layaMaxUI": 51,
        "../../manager/PoolMgr": 10,
        "../../model/Global": 15
    }],
    51 : [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a, o = Laya.View,
        n = Laya.Dialog,
        l = Laya.ClassUtils.regClass; !
        function(e) {
            var t = function(e) {
                function t() {
                    return e.call(this) || this
                }
                return __extends(t, e),
                t.prototype.createChildren = function() {
                    e.prototype.createChildren.call(this),
                    this.createView(t.uiView)
                },
                t.uiView = {
                    type: "Dialog",
                    props: {
                        width: 750,
                        height: 1334
                    },
                    compId: 2,
                    child: [{
                        type: "Sprite",
                        props: {
                            y: 397,
                            x: 0,
                            width: 750,
                            "var": "sp_box",
                            height: 464
                        },
                        compId: 3,
                        child: [{
                            type: "Image",
                            props: {
                                y: -77,
                                x: 77,
                                width: 596,
                                skin: "imgs/panel/levelupUi_di_1.png",
                                sizeGrid: "88,101,59,39",
                                height: 517
                            },
                            compId: 41
                        },
                        {
                            type: "Image",
                            props: {
                                y: -67,
                                x: 162,
                                width: 426,
                                skin: "imgs/panel/Pop-upsui_bg_3.png",
                                sizeGrid: "14,30,14,29"
                            },
                            compId: 42
                        },
                        {
                            type: "Image",
                            props: {
                                y: -5,
                                x: 88,
                                width: 575,
                                skin: "imgs/panel/Pop-upsui_bg_2.png",
                                sizeGrid: "60,67,43,69",
                                height: 435
                            },
                            compId: 43
                        },
                        {
                            type: "Image",
                            props: {
                                y: 94,
                                x: 98,
                                width: 556,
                                skin: "imgs/panel/Pop-upsui_bg_4.png",
                                sizeGrid: "38,35,38,31",
                                height: 139
                            },
                            compId: 44
                        },
                        {
                            type: "Text",
                            props: {
                                y: -59,
                                x: 246,
                                width: 257,
                                "var": "labTitle",
                                text: "Auto merge",
                                height: 42,
                                fontSize: 40,
                                font: "SimHei",
                                color: "#ffffff",
                                bold: !1,
                                align: "center",
                                runtime: "laya.display.Text"
                            },
                            compId: 4
                        },
                        {
                            type: "Text",
                            props: {
                                y: 29,
                                x: 122,
                                wordWrap: !0,
                                width: 505,
                                "var": "labDes",
                                text: "Get automatic merge function",
                                height: 31,
                                fontSize: 30,
                                font: "SimHei",
                                color: "#3f3e3e",
                                align: "center",
                                runtime: "laya.display.Text"
                            },
                            compId: 6
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 146,
                                x: 293,
                                "var": "btn_autoCompose",
                                texture: "imgs/panel/Tip_name_zdhc.png"
                            },
                            compId: 16
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 123,
                                x: 291,
                                "var": "btn_douGold",
                                texture: "imgs/panel/goldUI_1.png"
                            },
                            compId: 30,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 24.75,
                                    x: 92,
                                    texture: "imgs/panel/X5.png"
                                },
                                compId: 40
                            }]
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 146,
                                x: 302,
                                "var": "btn_douFire",
                                texture: "imgs/panel/speed.png"
                            },
                            compId: 32
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 145,
                                x: 291,
                                "var": "btn_halfDifficult",
                                texture: "imgs/panel/nandu.png"
                            },
                            compId: 34
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: -77,
                                x: 602,
                                "var": "btn_close",
                                texture: "imgs/panel/levelupUi_btn_1.png"
                            },
                            compId: 19
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 288,
                                x: 275,
                                width: 199,
                                "var": "btn_watchVideo",
                                height: 89
                            },
                            compId: 21,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 0,
                                    x: 0,
                                    skin: "imgs/panel/levelupUi_di_7.png"
                                },
                                compId: 28
                            },
                            {
                                type: "Text",
                                props: {
                                    y: 29.5,
                                    x: 6.5,
                                    width: 114,
                                    "var": "btn_time1",
                                    text: "+5M",
                                    fontSize: 30,
                                    font: "SimHei",
                                    color: "#ffffff",
                                    bold: !1,
                                    align: "center",
                                    runtime: "laya.display.Text"
                                },
                                compId: 23
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 19,
                                    x: 123,
                                    texture: "imgs/panel/offlinerevUi_video.png"
                                },
                                compId: 48
                            }]
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 286,
                                x: 275,
                                width: 199,
                                "var": "btn_share",
                                height: 89
                            },
                            compId: 22,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 0,
                                    x: 0,
                                    skin: "imgs/panel/levelupUi_di_7.png"
                                },
                                compId: 29
                            },
                            {
                                type: "Text",
                                props: {
                                    y: 28,
                                    x: 6,
                                    width: 114,
                                    "var": "btn_time2",
                                    text: "+5M",
                                    height: 30,
                                    fontSize: 30,
                                    font: "SimHei",
                                    color: "#ffffff",
                                    bold: !1,
                                    align: "center",
                                    runtime: "laya.display.Text"
                                },
                                compId: 25
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 17,
                                    x: 120,
                                    texture: "imgs/panel/offlinerevUi_share.png"
                                },
                                compId: 26
                            }]
                        },
                        {
                            type: "Label",
                            props: {
                                y: 469,
                                x: 325,
                                width: 100,
                                "var": "label_close",
                                valign: "middle",
                                underline: !0,
                                text: "Close",
                                height: 50,
                                fontSize: 30,
                                font: "SimHei",
                                color: "#bebebe",
                                align: "center"
                            },
                            compId: 27
                        }]
                    }],
                    loadList: ["imgs/panel/levelupUi_di_1.png", "imgs/panel/Pop-upsui_bg_3.png", "imgs/panel/Pop-upsui_bg_2.png", "imgs/panel/Pop-upsui_bg_4.png", "imgs/panel/Tip_name_zdhc.png", "imgs/panel/goldUI_1.png", "imgs/panel/X5.png", "imgs/panel/speed.png", "imgs/panel/nandu.png", "imgs/panel/levelupUi_btn_1.png", "imgs/panel/levelupUi_di_7.png", "imgs/panel/offlinerevUi_video.png", "imgs/panel/offlinerevUi_share.png"],
                    loadList3D: []
                },
                t
            } (n);
            e.AutoComposeDialogUI = t,
            l("ui.AutoComposeDialogUI", t);
            var i = function(e) {
                function t() {
                    return e.call(this) || this
                }
                return __extends(t, e),
                t.prototype.createChildren = function() {
                    e.prototype.createChildren.call(this),
                    this.createView(t.uiView)
                },
                t.uiView = {
                    type: "View",
                    props: {
                        width: 750,
                        height: 550
                    },
                    compId: 2,
                    child: [{
                        type: "Sprite",
                        props: {
                            y: 50,
                            x: 0,
                            width: 750,
                            "var": "imgWarn",
                            height: 131
                        },
                        compId: 12,
                        child: [{
                            type: "Sprite",
                            props: {
                                "var": "imgWarn1",
                                texture: "imgs/panel/safe.png"
                            },
                            compId: 136
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 0,
                                x: -750,
                                "var": "imgWarn2",
                                texture: "imgs/panel/safe.png"
                            },
                            compId: 137
                        }]
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 110,
                            x: 0,
                            width: 748,
                            "var": "sp_box_battery",
                            height: 70
                        },
                        compId: 36,
                        child: [{
                            type: "Sprite",
                            props: {
                                y: 19,
                                x: 85,
                                width: 51,
                                pivotX: 26,
                                name: "sp4",
                                height: 51
                            },
                            compId: 37,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 27,
                                    x: 0,
                                    texture: "imgs/panel/GunmountUI_1.png",
                                    name: "icon"
                                },
                                compId: 131
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 14,
                                    x: 9,
                                    texture: "imgs/panel/stopUI_02.png",
                                    name: "lock"
                                },
                                compId: 110
                            },
                            {
                                type: "FontUI",
                                props: {
                                    y: -10,
                                    x: 25,
                                    name: "fontUI",
                                    runtime: "ui.FontUIUI"
                                },
                                compId: 109
                            }]
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 19,
                                x: 225,
                                width: 51,
                                pivotX: 26,
                                name: "sp2",
                                height: 51
                            },
                            compId: 111,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 27,
                                    x: 0,
                                    texture: "imgs/panel/GunmountUI_1.png",
                                    name: "icon"
                                },
                                compId: 132
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 14,
                                    x: 9,
                                    texture: "imgs/panel/stopUI_02.png",
                                    name: "lock"
                                },
                                compId: 112
                            },
                            {
                                type: "FontUI",
                                props: {
                                    y: -10,
                                    x: 25,
                                    name: "fontUI",
                                    runtime: "ui.FontUIUI"
                                },
                                compId: 113
                            }]
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 19,
                                x: 364,
                                width: 51,
                                pivotX: 26,
                                name: "sp1",
                                height: 51
                            },
                            compId: 120,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 27,
                                    x: 0,
                                    texture: "imgs/panel/GunmountUI_1.png",
                                    name: "icon"
                                },
                                compId: 133
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 14,
                                    x: 9,
                                    texture: "imgs/panel/stopUI_02.png",
                                    name: "lock"
                                },
                                compId: 121
                            },
                            {
                                type: "FontUI",
                                props: {
                                    y: -10,
                                    x: 25,
                                    name: "fontUI",
                                    runtime: "ui.FontUIUI"
                                },
                                compId: 122
                            }]
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 19,
                                x: 504,
                                width: 51,
                                pivotX: 26,
                                name: "sp3",
                                height: 51
                            },
                            compId: 123,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 27,
                                    x: 0,
                                    texture: "imgs/panel/GunmountUI_1.png",
                                    name: "icon"
                                },
                                compId: 134
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 14,
                                    x: 9,
                                    texture: "imgs/panel/stopUI_02.png",
                                    name: "lock"
                                },
                                compId: 124
                            },
                            {
                                type: "FontUI",
                                props: {
                                    y: -10,
                                    x: 25,
                                    name: "fontUI",
                                    runtime: "ui.FontUIUI"
                                },
                                compId: 125
                            }]
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 19,
                                x: 643,
                                width: 51,
                                pivotX: 26,
                                name: "sp5",
                                height: 51
                            },
                            compId: 114,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 27,
                                    x: 0,
                                    texture: "imgs/panel/GunmountUI_1.png",
                                    name: "icon"
                                },
                                compId: 135
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 14,
                                    x: 9,
                                    texture: "imgs/panel/stopUI_02.png",
                                    name: "lock"
                                },
                                compId: 115
                            },
                            {
                                type: "FontUI",
                                props: {
                                    y: -10,
                                    x: 25,
                                    name: "fontUI",
                                    runtime: "ui.FontUIUI"
                                },
                                compId: 116
                            }]
                        }]
                    },
                    {
                        type: "Image",
                        props: {
                            y: 176,
                            x: 0,
                            width: 750,
                            "var": "sp_rect1",
                            skin: "imgs/panel/gameui_bg_1.png",
                            sizeGrid: "162,201,65,85",
                            height: 382
                        },
                        compId: 14
                    },
                    {
                        type: "Image",
                        props: {
                            y: 176,
                            x: 0,
                            width: 750,
                            "var": "sp_rect",
                            sizeGrid: "162,201,65,85",
                            height: 271
                        },
                        compId: 143
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 195,
                            x: 654,
                            width: 87,
                            "var": "btn_auto",
                            height: 140
                        },
                        compId: 29,
                        child: [{
                            type: "Sprite",
                            props: {
                                y: 0,
                                x: 0,
                                width: 87,
                                "var": "sp_autoCountdown",
                                height: 138
                            },
                            compId: 84,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 0,
                                    x: 2.5,
                                    texture: "imgs/panel/synthesisUI_mask.png",
                                    alpha: .6
                                },
                                compId: 127
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 1.5,
                                    x: 0,
                                    "var": "img_autoCountdown",
                                    texture: "imgs/panel/rightUi_Btn_4.png"
                                },
                                compId: 87
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 33.5,
                                    x: 19.5,
                                    texture: "imgs/panel/Mainui_synthesis.png"
                                },
                                compId: 128
                            },
                            {
                                type: "Text",
                                props: {
                                    y: 97.5,
                                    x: 2.5,
                                    width: 82,
                                    "var": "txt_autoCountdown",
                                    text: "05:00",
                                    height: 24,
                                    fontSize: 22,
                                    font: "SimHei",
                                    color: "#137cee",
                                    bold: !0,
                                    align: "center",
                                    runtime: "laya.display.Text"
                                },
                                compId: 85
                            }]
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 0,
                                x: 0,
                                width: 86,
                                "var": "sp_auto",
                                height: 137
                            },
                            compId: 83,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 0,
                                    x: 0,
                                    texture: "imgs/panel/rightUi_Btn_4.png"
                                },
                                compId: 142
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 46,
                                    x: 22,
                                    texture: "imgs/panel/Mainui_synthesis.png"
                                },
                                compId: 126
                            }]
                        }]
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 386,
                            x: 697,
                            width: 85,
                            "var": "btn_remove",
                            texture: "imgs/panel/Recycle binUi_Btn_5.png",
                            pivotY: 50,
                            pivotX: 43,
                            height: 99
                        },
                        compId: 31
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 110,
                            x: 0,
                            width: 750,
                            "var": "sp_box_bg",
                            height: 338
                        },
                        compId: 11,
                        child: [{
                            type: "Image",
                            props: {
                                y: 152,
                                x: 187,
                                skin: "imgs/panel/juxing_bg_2.png",
                                sizeGrid: "9,11,11,11",
                                pivotY: 56,
                                pivotX: 45
                            },
                            compId: 18
                        },
                        {
                            type: "Image",
                            props: {
                                y: 152,
                                x: 287,
                                width: 90,
                                skin: "imgs/panel/juxing_bg_2.png",
                                sizeGrid: "9,11,11,11",
                                pivotY: 56,
                                pivotX: 45,
                                height: 105
                            },
                            compId: 19
                        },
                        {
                            type: "Image",
                            props: {
                                y: 152,
                                x: 388,
                                skin: "imgs/panel/juxing_bg_2.png",
                                sizeGrid: "9,11,11,11",
                                pivotY: 56,
                                pivotX: 45
                            },
                            compId: 21
                        },
                        {
                            type: "Image",
                            props: {
                                y: 152,
                                x: 487,
                                skin: "imgs/panel/juxing_bg_2.png",
                                sizeGrid: "9,11,11,11",
                                pivotY: 56,
                                pivotX: 45
                            },
                            compId: 22
                        },
                        {
                            type: "Image",
                            props: {
                                y: 152,
                                x: 587,
                                skin: "imgs/panel/juxing_bg_2.png",
                                sizeGrid: "9,11,11,11",
                                pivotY: 56,
                                pivotX: 45
                            },
                            compId: 23
                        },
                        {
                            type: "Image",
                            props: {
                                y: 265,
                                x: 187,
                                skin: "imgs/panel/juxing_bg_2.png",
                                sizeGrid: "9,11,11,11",
                                pivotY: 56,
                                pivotX: 45
                            },
                            compId: 24
                        },
                        {
                            type: "Image",
                            props: {
                                y: 265,
                                x: 287,
                                skin: "imgs/panel/juxing_bg_2.png",
                                sizeGrid: "9,11,11,11",
                                pivotY: 56,
                                pivotX: 45
                            },
                            compId: 25
                        },
                        {
                            type: "Image",
                            props: {
                                y: 265,
                                x: 387,
                                skin: "imgs/panel/juxing_bg_2.png",
                                sizeGrid: "9,11,11,11",
                                pivotY: 56,
                                pivotX: 45
                            },
                            compId: 26
                        },
                        {
                            type: "Image",
                            props: {
                                y: 265,
                                x: 487,
                                skin: "imgs/panel/juxing_bg_2.png",
                                sizeGrid: "9,11,11,11",
                                pivotY: 56,
                                pivotX: 45
                            },
                            compId: 27
                        },
                        {
                            type: "Image",
                            props: {
                                y: 265,
                                x: 587,
                                skin: "imgs/panel/juxing_bg_2.png",
                                sizeGrid: "9,11,11,11",
                                pivotY: 56,
                                pivotX: 45
                            },
                            compId: 28
                        }]
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 110,
                            x: 0,
                            width: 750,
                            "var": "sp_box",
                            height: 338
                        },
                        compId: 3
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 469,
                            x: 253,
                            width: 248,
                            "var": "btn_create",
                            height: 73
                        },
                        compId: 5,
                        child: [{
                            type: "Image",
                            props: {
                                y: 0,
                                x: 0,
                                skin: "imgs/panel/Get the turretUi_Btn.png",
                                sizeGrid: "14,15,17,10"
                            },
                            compId: 16
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 32,
                                x: 51,
                                "var": "img_battery",
                                texture: "imgs/boom/1.png",
                                scaleY: .8,
                                scaleX: .8,
                                pivotY: 44,
                                pivotX: 36
                            },
                            compId: 32
                        },
                        {
                            type: "FontUI",
                            props: {
                                y: 25,
                                x: 163.5,
                                "var": "text_price",
                                runtime: "ui.FontUIUI"
                            },
                            compId: 130
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: -12.5,
                                x: 211,
                                "var": "img_hot1",
                                texture: "imgs/adver/interB_icon_1.png"
                            },
                            compId: 139
                        }]
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 509,
                            x: 590,
                            "var": "btn_tech",
                            texture: "imgs/panel/upgradeUi_Btn.png",
                            pivotY: 40,
                            pivotX: 90
                        },
                        compId: 46,
                        child: [{
                            type: "Sprite",
                            props: {
                                y: -11.5,
                                x: 176,
                                "var": "img_hot2",
                                texture: "imgs/adver/interB_icon_1.png"
                            },
                            compId: 141
                        }]
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 512,
                            x: 143,
                            "var": "btn_mall",
                            texture: "imgs/panel/TechnologyUI_Btn.png",
                            pivotY: 45,
                            pivotX: 99
                        },
                        compId: 47
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 190,
                            x: 14,
                            width: 106,
                            "var": "sp_douGold",
                            height: 81
                        },
                        compId: 49,
                        child: [{
                            type: "Sprite",
                            props: {
                                y: 5,
                                x: 5,
                                width: 100,
                                "var": "sp_goldCountdown",
                                height: 77
                            },
                            compId: 51,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 0,
                                    x: 4,
                                    skin: "imgs/panel/incomeUi_mask_1.png",
                                    alpha: .6
                                },
                                compId: 93
                            },
                            {
                                type: "Image",
                                props: {
                                    y: 0,
                                    x: 0,
                                    "var": "img_goldCountdown",
                                    skin: "imgs/panel/incomeUi_Btn_1.png"
                                },
                                compId: 70
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 11,
                                    x: 14,
                                    texture: "imgs/panel/Mainui_income.png"
                                },
                                compId: 96
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 15.5,
                                    x: 59,
                                    texture: "imgs/panel/Mainui_income_Num_x5.png"
                                },
                                compId: 97
                            },
                            {
                                type: "Text",
                                props: {
                                    y: 40,
                                    x: 0,
                                    width: 100,
                                    "var": "text_goldCountdown",
                                    text: "15:00",
                                    fontSize: 24,
                                    color: "#137cee",
                                    bold: !0,
                                    align: "center",
                                    runtime: "laya.display.Text"
                                },
                                compId: 54
                            }]
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 5,
                                x: 5,
                                "var": "btn_douGold",
                                texture: "imgs/panel/incomeUi_Btn_1.png"
                            },
                            compId: 50,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 11,
                                    x: 31,
                                    texture: "imgs/panel/Mainui_income.png"
                                },
                                compId: 94
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 36,
                                    x: 35,
                                    texture: "imgs/panel/Mainui_income_Num_x5.png"
                                },
                                compId: 95
                            }]
                        }]
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 273,
                            x: 13,
                            width: 106,
                            "var": "sp_douFire",
                            height: 75
                        },
                        compId: 56,
                        child: [{
                            type: "Sprite",
                            props: {
                                y: 9,
                                x: 3,
                                width: 100,
                                "var": "sp_fireCountdown",
                                height: 64
                            },
                            compId: 57,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: -6,
                                    x: 8,
                                    texture: "imgs/panel/speedUi_mask_2.png",
                                    alpha: .6
                                },
                                compId: 100
                            },
                            {
                                type: "Image",
                                props: {
                                    y: -6,
                                    x: 3,
                                    "var": "img_fireCountdown",
                                    skin: "imgs/panel/speedUi_Btn_2.png"
                                },
                                compId: 71
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: .5,
                                    x: 16,
                                    texture: "imgs/panel/Mainui_speed_1.png"
                                },
                                compId: 102
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 4.5,
                                    x: 62.5,
                                    texture: "imgs/panel/Mainui_speed_Num_x2.png"
                                },
                                compId: 103
                            },
                            {
                                type: "Text",
                                props: {
                                    y: 26,
                                    x: 3,
                                    width: 100,
                                    "var": "text_fireCountdown",
                                    text: "15:00",
                                    strokeColor: " ",
                                    fontSize: 24,
                                    font: "SimHei",
                                    color: "#137cee",
                                    bold: !0,
                                    align: "center",
                                    runtime: "laya.display.Text"
                                },
                                compId: 60
                            }]
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 2,
                                x: 6,
                                "var": "btn_douFire",
                                texture: "imgs/panel/speedUi_Btn_2.png"
                            },
                            compId: 61,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 11,
                                    x: 31,
                                    width: 39,
                                    texture: "imgs/panel/Mainui_speed_1.png",
                                    height: 20
                                },
                                compId: 98
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 35,
                                    x: 35,
                                    texture: "imgs/panel/Mainui_speed_Num_x2.png",
                                    rotation: 0
                                },
                                compId: 99
                            }]
                        }]
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 358,
                            x: 13,
                            width: 106,
                            "var": "sp_halfDifficult",
                            height: 75
                        },
                        compId: 63,
                        child: [{
                            type: "Sprite",
                            props: {
                                y: 9,
                                x: 3,
                                width: 100,
                                "var": "sp_halfDifficultCountdown",
                                height: 64
                            },
                            compId: 64,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: -12,
                                    x: 8,
                                    texture: "imgs/panel/DifficultUi_mask_3.png",
                                    alpha: .6
                                },
                                compId: 106
                            },
                            {
                                type: "Image",
                                props: {
                                    y: -13.5,
                                    x: 2,
                                    "var": "img_halfDifficultCountdown",
                                    skin: "imgs/panel/DifficultUi_Btn_3.png"
                                },
                                compId: 72
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 1,
                                    x: 14.5,
                                    texture: "imgs/panel/Mainui_Difficult_1.png"
                                },
                                compId: 107
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 1,
                                    x: 56,
                                    texture: "imgs/panel/Mainui_Difficult_2.png"
                                },
                                compId: 108
                            },
                            {
                                type: "Text",
                                props: {
                                    y: 25,
                                    x: 3,
                                    width: 100,
                                    "var": "text_halfDifficultCountdown",
                                    text: "15:00",
                                    strokeColor: " ",
                                    fontSize: 24,
                                    font: "SimHei",
                                    color: "#137cee",
                                    bold: !0,
                                    align: "center",
                                    runtime: "laya.display.Text"
                                },
                                compId: 67
                            }]
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: -4,
                                x: 6,
                                "var": "btn_halfDifficult",
                                texture: "imgs/panel/DifficultUi_Btn_3.png"
                            },
                            compId: 68,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 11,
                                    x: 32,
                                    texture: "imgs/panel/Mainui_Difficult_1.png"
                                },
                                compId: 104
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 33,
                                    x: 32,
                                    texture: "imgs/panel/Mainui_Difficult_2.png"
                                },
                                compId: 105
                            }]
                        }]
                    }],
                    loadList: ["imgs/panel/safe.png", "imgs/panel/GunmountUI_1.png", "imgs/panel/stopUI_02.png", "imgs/panel/gameui_bg_1.png", "imgs/panel/synthesisUI_mask.png", "imgs/panel/rightUi_Btn_4.png", "imgs/panel/Mainui_synthesis.png", "imgs/panel/Recycle binUi_Btn_5.png", "imgs/panel/juxing_bg_2.png", "imgs/panel/Get the turretUi_Btn.png", "imgs/boom/1.png", "imgs/adver/interB_icon_1.png", "imgs/panel/upgradeUi_Btn.png", "imgs/panel/TechnologyUI_Btn.png", "imgs/panel/incomeUi_mask_1.png", "imgs/panel/incomeUi_Btn_1.png", "imgs/panel/Mainui_income.png", "imgs/panel/Mainui_income_Num_x5.png", "imgs/panel/speedUi_mask_2.png", "imgs/panel/speedUi_Btn_2.png", "imgs/panel/Mainui_speed_1.png", "imgs/panel/Mainui_speed_Num_x2.png", "imgs/panel/DifficultUi_mask_3.png", "imgs/panel/DifficultUi_Btn_3.png", "imgs/panel/Mainui_Difficult_1.png", "imgs/panel/Mainui_Difficult_2.png"],
                    loadList3D: []
                },
                t
            } (o);
            e.ComposePanelUI = i,
            l("ui.ComposePanelUI", i);
            var a = function(e) {
                function t() {
                    return e.call(this) || this
                }
                return __extends(t, e),
                t.prototype.createChildren = function() {
                    e.prototype.createChildren.call(this),
                    this.createView(t.uiView)
                },
                t.uiView = {
                    type: "View",
                    props: {
                        width: 750,
                        height: 1700
                    },
                    compId: 2,
                    child: [{
                        type: "Image",
                        props: {
                            width: 750,
                            "var": "bg",
                            skin: "imgs/bg/blackBg.png",
                            height: 1700
                        },
                        compId: 3
                    },
                    {
                        type: "Image",
                        props: {
                            y: 0,
                            x: 0,
                            width: 750,
                            "var": "redBg",
                            skin: "imgs/panel/bossUi_di.png",
                            sizeGrid: "8,8,5,5",
                            height: 1700
                        },
                        compId: 11
                    },
                    {
                        type: "Label",
                        props: {
                            y: 629,
                            x: 375,
                            width: 750,
                            "var": "labText",
                            valign: "middle",
                            text: "Failed!",
                            pivotX: 375,
                            height: 75,
                            fontSize: 70,
                            color: "#ffffff",
                            align: "center"
                        },
                        compId: 4
                    },
                    {
                        type: "Label",
                        props: {
                            y: 629,
                            x: 375,
                            width: 750,
                            "var": "labLevel",
                            valign: "middle",
                            text: "Failed!",
                            pivotX: 375,
                            height: 75,
                            fontSize: 70,
                            color: "#ffffff",
                            align: "center"
                        },
                        compId: 6
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 781,
                            x: 375,
                            "var": "imgBattery",
                            texture: "imgs/panel/GunmountUI_1.png",
                            pivotY: 12,
                            pivotX: 26
                        },
                        compId: 5
                    },
                    {
                        type: "Image",
                        props: {
                            y: 476,
                            x: 0,
                            width: 750,
                            "var": "tipBg",
                            skin: "imgs/panel/winlossUi_di_1.png",
                            sizeGrid: "9,6,6,8",
                            height: 80
                        },
                        compId: 15,
                        child: [{
                            type: "Sprite",
                            props: {
                                y: 15,
                                x: 219,
                                "var": "tip",
                                texture: "imgs/panel/bossUi_title.png"
                            },
                            compId: 12
                        }]
                    }],
                    animations: [{
                        nodes: [{
                            target: 11,
                            keyframes: {
                                x: [{
                                    value: 0,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 11,
                                    key: "x",
                                    index: 0
                                }],
                                alpha: [{
                                    value: 1,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 11,
                                    key: "alpha",
                                    index: 0
                                },
                                {
                                    value: 0,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 11,
                                    key: "alpha",
                                    index: 15
                                },
                                {
                                    value: 1,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 11,
                                    key: "alpha",
                                    index: 30
                                }]
                            }
                        }],
                        name: "ani1",
                        id: 1,
                        frameRate: 24,
                        action: 2
                    }],
                    loadList: ["imgs/bg/blackBg.png", "imgs/panel/bossUi_di.png", "imgs/panel/GunmountUI_1.png", "imgs/panel/winlossUi_di_1.png", "imgs/panel/bossUi_title.png"],
                    loadList3D: []
                },
                t
            } (o);
            e.FailUIUI = a,
            l("ui.FailUIUI", a);
            var s = function(e) {
                function t() {
                    return e.call(this) || this
                }
                return __extends(t, e),
                t.prototype.createChildren = function() {
                    e.prototype.createChildren.call(this),
                    this.createView(t.uiView)
                },
                t.uiView = {
                    type: "View",
                    props: {
                        width: 15,
                        height: 30
                    },
                    compId: 2,
                    child: [{
                        type: "Sprite",
                        props: {
                            y: 0,
                            x: 0,
                            "var": "numTest",
                            texture: "imgs/panel/common_shadownum_6.png"
                        },
                        compId: 3
                    }],
                    loadList: ["imgs/panel/common_shadownum_6.png"],
                    loadList3D: []
                },
                t
            } (o);
            e.FontUIUI = s,
            l("ui.FontUIUI", s);
            var r = function(e) {
                function t() {
                    return e.call(this) || this
                }
                return __extends(t, e),
                t.prototype.createChildren = function() {
                    e.prototype.createChildren.call(this),
                    this.createView(t.uiView)
                },
                t.uiView = {
                    type: "Dialog",
                    props: {
                        width: 750,
                        height: 1334
                    },
                    compId: 2,
                    child: [{
                        type: "Sprite",
                        props: {
                            y: 292,
                            x: 0,
                            width: 750,
                            "var": "sp_box",
                            height: 750
                        },
                        compId: 3,
                        child: [{
                            type: "Sprite",
                            props: {
                                y: 375,
                                x: 375,
                                width: 750,
                                "var": "light",
                                texture: "imgs/panel/guangxiao_bg.png",
                                rotation: -72,
                                pivotY: 375,
                                pivotX: 375,
                                height: 750
                            },
                            compId: 4
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 250,
                                x: 196,
                                texture: "imgs/panel/xingxing.png"
                            },
                            compId: 6
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 314,
                                x: 315,
                                width: 120,
                                "var": "box",
                                height: 120
                            },
                            compId: 5,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 24,
                                    x: 28,
                                    "var": "img_battery",
                                    skin: "imgs/panel/cannonUI_01.png"
                                },
                                compId: 13
                            }]
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 119,
                                x: 157,
                                texture: "imgs/panel/gongxi.png"
                            },
                            compId: 10
                        }]
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 848,
                            x: 275,
                            "var": "btn_close",
                            texture: "imgs/panel/levelupUi_di_7.png"
                        },
                        compId: 11,
                        child: [{
                            type: "Text",
                            props: {
                                y: 22,
                                x: 54,
                                text: "Get",
                                fontSize: 45,
                                font: "SimHei",
                                color: "#FFFFFF",
                                runtime: "laya.display.Text"
                            },
                            compId: 12
                        }]
                    }],
                    animations: [{
                        nodes: [{
                            target: 4,
                            keyframes: {
                                x: [{
                                    value: 375,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 4,
                                    key: "x",
                                    index: 0
                                }],
                                rotation: [{
                                    value: 0,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 4,
                                    key: "rotation",
                                    index: 0
                                },
                                {
                                    value: -360,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 4,
                                    key: "rotation",
                                    index: 10
                                }]
                            }
                        }],
                        name: "lightEff",
                        id: 1,
                        frameRate: 24,
                        action: 2
                    }],
                    loadList: ["imgs/panel/guangxiao_bg.png", "imgs/panel/xingxing.png", "imgs/panel/cannonUI_01.png", "imgs/panel/gongxi.png", "imgs/panel/levelupUi_di_7.png"],
                    loadList3D: []
                },
                t
            } (n);
            e.GetDailyGiftDialogUI = r,
            l("ui.GetDailyGiftDialogUI", r);
            var p = function(e) {
                function t() {
                    return e.call(this) || this
                }
                return __extends(t, e),
                t.prototype.createChildren = function() {
                    e.prototype.createChildren.call(this),
                    this.createView(t.uiView)
                },
                t.uiView = {
                    type: "Dialog",
                    props: {
                        width: 750,
                        height: 1334
                    },
                    compId: 2,
                    child: [{
                        type: "Sprite",
                        props: {
                            y: 0,
                            x: 0,
                            "var": "sp_box"
                        },
                        compId: 3,
                        child: [{
                            type: "Image",
                            props: {
                                y: 320,
                                x: 77,
                                width: 596,
                                skin: "imgs/panel/levelupUi_di_1.png",
                                sizeGrid: "88,101,59,39",
                                height: 517
                            },
                            compId: 4
                        },
                        {
                            type: "Image",
                            props: {
                                y: 330,
                                x: 162,
                                width: 426,
                                skin: "imgs/panel/Pop-upsui_bg_3.png",
                                sizeGrid: "14,30,14,29"
                            },
                            compId: 5
                        },
                        {
                            type: "Image",
                            props: {
                                y: 392,
                                x: 88,
                                width: 575,
                                skin: "imgs/panel/Pop-upsui_bg_2.png",
                                sizeGrid: "60,67,43,69",
                                height: 435
                            },
                            compId: 6
                        },
                        {
                            type: "Image",
                            props: {
                                y: 491,
                                x: 98,
                                width: 556,
                                skin: "imgs/panel/Pop-upsui_bg_4.png",
                                sizeGrid: "38,35,38,31",
                                height: 139
                            },
                            compId: 7
                        },
                        {
                            type: "Text",
                            props: {
                                y: 338,
                                x: 246,
                                width: 257,
                                text: "Get core",
                                height: 44,
                                fontSize: 40,
                                font: "SimHei",
                                color: "#ffffff",
                                bold: !1,
                                align: "center",
                                runtime: "laya.display.Text"
                            },
                            compId: 8
                        },
                        {
                            type: "Text",
                            props: {
                                y: 435,
                                x: 122,
                                wordWrap: !0,
                                width: 505,
                                "var": "labDes",
                                text: "Get new core",
                                height: 32,
                                fontSize: 30,
                                font: "SimHei",
                                color: "#3f3e3e",
                                align: "center",
                                runtime: "laya.display.Text"
                            },
                            compId: 9
                        },
                        {
                            type: "Text",
                            props: {
                                y: 776,
                                x: 123.5,
                                wordWrap: !0,
                                width: 505,
                                "var": "labDes1",
                                text: "Get free after countdown",
                                height: 32,
                                fontSize: 30,
                                font: "SimHei",
                                color: "#3f3e3e",
                                align: "center",
                                runtime: "laya.display.Text"
                            },
                            compId: 25
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 320,
                                x: 602,
                                "var": "btn_close",
                                texture: "imgs/panel/levelupUi_btn_1.png"
                            },
                            compId: 12
                        },
                        {
                            type: "Label",
                            props: {
                                y: 853,
                                x: 325,
                                width: 100,
                                "var": "label_close",
                                valign: "middle",
                                underline: !0,
                                text: "Close",
                                height: 50,
                                fontSize: 26,
                                font: "SimHei",
                                color: "#bebebe",
                                align: "center"
                            },
                            compId: 13
                        },
                        {
                            type: "Image",
                            props: {
                                y: 666,
                                x: 275,
                                width: 199,
                                "var": "btn_Get",
                                skin: "imgs/panel/levelupUi_di_7.png",
                                height: 89
                            },
                            compId: 14,
                            child: [{
                                type: "Text",
                                props: {
                                    y: 27,
                                    x: 65,
                                    text: "Get",
                                    fontSize: 34,
                                    font: "SimHei",
                                    color: "#ffffff",
                                    bold: !1,
                                    runtime: "laya.display.Text"
                                },
                                compId: 15
                            }]
                        },
                        {
                            type: "Image",
                            props: {
                                y: 504.5,
                                x: 315,
                                skin: "imgs/win/hexin_bg.png"
                            },
                            compId: 16,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 22,
                                    x: 32.5,
                                    "var": "imgIcon",
                                    skin: "imgs/gift/kejiui_hexin_9.png"
                                },
                                compId: 18
                            },
                            {
                                type: "Label",
                                props: {
                                    y: 85,
                                    x: 3,
                                    width: 114,
                                    "var": "labLV",
                                    text: "Lv:5",
                                    height: 24,
                                    fontSize: 24,
                                    font: "SimHei",
                                    color: "#ffffff",
                                    bold: !0,
                                    align: "center"
                                },
                                compId: 17
                            }]
                        },
                        {
                            type: "Image",
                            props: {
                                y: 666,
                                x: 266,
                                width: 217,
                                "var": "btnGetVideo",
                                skin: "imgs/panel/levelupUi_di_7.png",
                                sizeGrid: "4,4,4,6",
                                height: 89
                            },
                            compId: 19,
                            child: [{
                                type: "Label",
                                props: {
                                    y: 31,
                                    x: 18,
                                    "var": "labThree",
                                    text: "Get",
                                    fontSize: 27,
                                    color: "#ffffff"
                                },
                                compId: 21
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 18.5,
                                    x: 136,
                                    texture: "imgs/panel/offlinerevUi_video.png"
                                },
                                compId: 26
                            }]
                        },
                        {
                            type: "Image",
                            props: {
                                y: 666,
                                x: 266,
                                width: 217,
                                "var": "btnGetShare",
                                skin: "imgs/panel/levelupUi_di_7.png",
                                sizeGrid: "4,4,4,6",
                                height: 89
                            },
                            compId: 20,
                            child: [{
                                type: "Label",
                                props: {
                                    y: 31,
                                    x: 19,
                                    "var": "labThree1",
                                    text: "Get",
                                    fontSize: 27,
                                    font: "SimHei",
                                    color: "#ffffff"
                                },
                                compId: 23
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 18,
                                    x: 137,
                                    "var": "iconShare",
                                    texture: "imgs/panel/offlinerevUi_share.png"
                                },
                                compId: 24
                            }]
                        }]
                    }],
                    loadList: ["imgs/panel/levelupUi_di_1.png", "imgs/panel/Pop-upsui_bg_3.png", "imgs/panel/Pop-upsui_bg_2.png", "imgs/panel/Pop-upsui_bg_4.png", "imgs/panel/levelupUi_btn_1.png", "imgs/panel/levelupUi_di_7.png", "imgs/win/hexin_bg.png", "imgs/gift/kejiui_hexin_9.png", "imgs/panel/offlinerevUi_video.png", "imgs/panel/offlinerevUi_share.png"],
                    loadList3D: []
                },
                t
            } (n);
            e.GetGiftDialogUI = p,
            l("ui.GetGiftDialogUI", p);
            var d = function(e) {
                function t() {
                    return e.call(this) || this
                }
                return __extends(t, e),
                t.prototype.createChildren = function() {
                    e.prototype.createChildren.call(this),
                    this.createView(t.uiView)
                },
                t.uiView = {
                    type: "Dialog",
                    props: {
                        width: 750,
                        height: 1334
                    },
                    compId: 2,
                    child: [{
                        type: "Sprite",
                        props: {
                            y: 0,
                            x: 0,
                            "var": "sp_box"
                        },
                        compId: 53,
                        child: [{
                            type: "Image",
                            props: {
                                y: 320,
                                x: 77,
                                width: 596,
                                skin: "imgs/panel/levelupUi_di_1.png",
                                sizeGrid: "88,101,59,39",
                                height: 517
                            },
                            compId: 48
                        },
                        {
                            type: "Image",
                            props: {
                                y: 330,
                                x: 162,
                                width: 426,
                                skin: "imgs/panel/Pop-upsui_bg_3.png",
                                sizeGrid: "14,30,14,29"
                            },
                            compId: 49
                        },
                        {
                            type: "Image",
                            props: {
                                y: 392,
                                x: 88,
                                width: 575,
                                skin: "imgs/panel/Pop-upsui_bg_2.png",
                                sizeGrid: "60,67,43,69",
                                height: 435
                            },
                            compId: 50
                        },
                        {
                            type: "Image",
                            props: {
                                y: 564,
                                x: 98,
                                width: 556,
                                skin: "imgs/panel/Pop-upsui_bg_4.png",
                                sizeGrid: "38,35,38,31",
                                height: 87
                            },
                            compId: 51
                        },
                        {
                            type: "Text",
                            props: {
                                y: 340,
                                x: 246,
                                width: 257,
                                text: "Get coin",
                                height: 44,
                                fontSize: 40,
                                font: "SimHei",
                                color: "#ffffff",
                                bold: !1,
                                align: "center",
                                runtime: "laya.display.Text"
                            },
                            compId: 52
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 416,
                                x: 271,
                                texture: "imgs/panel/getmoneyUi_money.png"
                            },
                            compId: 33
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 580,
                                x: 283,
                                width: 183,
                                height: 62
                            },
                            compId: 28,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 9,
                                    x: 28,
                                    "var": "img_icon",
                                    texture: "imgs/panel/goldUI_1.png",
                                    scaleY: .5,
                                    scaleX: .5
                                },
                                compId: 29
                            },
                            {
                                type: "Text",
                                props: {
                                    y: 11,
                                    x: 83,
                                    "var": "text_gold",
                                    text: "+31K",
                                    fontSize: 35,
                                    font: "SimHei",
                                    color: "#124973",
                                    runtime: "laya.display.Text"
                                },
                                compId: 30
                            }]
                        },
                        {
                            type: "Text",
                            props: {
                                y: 779,
                                x: 279,
                                width: 192,
                                "var": "text_num",
                                text: "Free times: 3",
                                height: 26,
                                fontSize: 26,
                                color: "#555555",
                                align: "center",
                                runtime: "laya.display.Text"
                            },
                            compId: 31
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 720,
                                x: 375,
                                width: 199,
                                "var": "btn_surplusNum_video",
                                pivotY: 45,
                                pivotX: 100,
                                height: 89
                            },
                            compId: 17,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 0,
                                    x: 0,
                                    skin: "imgs/panel/levelupUi_di_7.png",
                                    sizeGrid: "5,5,5,5"
                                },
                                compId: 34
                            },
                            {
                                type: "Text",
                                props: {
                                    y: 26.5,
                                    x: 108.5,
                                    text: "Get",
                                    fontSize: 30,
                                    font: "SimHei",
                                    color: "#ffffff",
                                    bold: !1,
                                    runtime: "laya.display.Text"
                                },
                                compId: 27
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 17.5,
                                    x: 26,
                                    texture: "imgs/panel/offlinerevUi_video.png"
                                },
                                compId: 54
                            }]
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 675,
                                x: 275,
                                width: 199,
                                "var": "btn_surplusNum_share",
                                height: 89
                            },
                            compId: 35,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 0,
                                    x: 0,
                                    skin: "imgs/panel/levelupUi_di_7.png",
                                    sizeGrid: "5,5,5,5"
                                },
                                compId: 36
                            },
                            {
                                type: "Text",
                                props: {
                                    y: 29,
                                    x: 112,
                                    text: "Get",
                                    fontSize: 30,
                                    font: "SimHei",
                                    color: "#ffffff",
                                    bold: !1,
                                    runtime: "laya.display.Text"
                                },
                                compId: 37
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 18,
                                    x: 36,
                                    texture: "imgs/panel/offlinerevUi_share.png"
                                },
                                compId: 40
                            }]
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 321,
                                x: 602,
                                "var": "btn_close",
                                texture: "imgs/panel/levelupUi_btn_1.png"
                            },
                            compId: 16
                        },
                        {
                            type: "Label",
                            props: {
                                y: 853,
                                x: 315,
                                width: 120,
                                "var": "label_close",
                                valign: "middle",
                                underline: !0,
                                text: "Give Up",
                                height: 50,
                                fontSize: 26,
                                font: "SimHei",
                                color: "#bebebe",
                                align: "center"
                            },
                            compId: 18
                        }]
                    }],
                    loadList: ["imgs/panel/levelupUi_di_1.png", "imgs/panel/Pop-upsui_bg_3.png", "imgs/panel/Pop-upsui_bg_2.png", "imgs/panel/Pop-upsui_bg_4.png", "imgs/panel/getmoneyUi_money.png", "imgs/panel/goldUI_1.png", "imgs/panel/levelupUi_di_7.png", "imgs/panel/offlinerevUi_video.png", "imgs/panel/offlinerevUi_share.png", "imgs/panel/levelupUi_btn_1.png"],
                    loadList3D: []
                },
                t
            } (n);
            e.GetGoldDialogUI = d,
            l("ui.GetGoldDialogUI", d);
            var u = function(e) {
                function t() {
                    return e.call(this) || this
                }
                return __extends(t, e),
                t.prototype.createChildren = function() {
                    e.prototype.createChildren.call(this),
                    this.createView(t.uiView)
                },
                t.uiView = {
                    type: "Dialog",
                    props: {
                        width: 750,
                        height: 1334
                    },
                    compId: 2,
                    child: [{
                        type: "Image",
                        props: {
                            y: 320,
                            x: 77,
                            width: 596,
                            skin: "imgs/panel/levelupUi_di_1.png",
                            sizeGrid: "88,88,52,54",
                            height: 517
                        },
                        compId: 7
                    },
                    {
                        type: "Image",
                        props: {
                            y: 330,
                            x: 162,
                            width: 426,
                            skin: "imgs/panel/Pop-upsui_bg_3.png",
                            sizeGrid: "14,30,14,29"
                        },
                        compId: 8
                    },
                    {
                        type: "Image",
                        props: {
                            y: 392,
                            x: 87,
                            width: 575,
                            skin: "imgs/panel/Pop-upsui_bg_2.png",
                            sizeGrid: "67,80,43,54",
                            height: 435
                        },
                        compId: 9
                    },
                    {
                        type: "Label",
                        props: {
                            y: 338,
                            x: 175,
                            width: 400,
                            "var": "labTitle",
                            text: "Offline Benefits",
                            height: 40,
                            fontSize: 40,
                            font: "SimHei",
                            color: "#ffffff",
                            bold: !1,
                            align: "center"
                        },
                        compId: 6
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 591,
                            x: 375,
                            width: 247,
                            "var": "imgGlow",
                            texture: "imgs/panel/clearnewUi_light_1.png",
                            pivotY: 124,
                            pivotX: 124,
                            height: 247
                        },
                        compId: 5
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 590,
                            x: 375,
                            "var": "imgBattery",
                            texture: "imgs/panel/GunmountUI_1.png",
                            pivotY: 12,
                            pivotX: 26
                        },
                        compId: 4
                    }],
                    animations: [{
                        nodes: [{
                            target: 5,
                            keyframes: {
                                x: [{
                                    value: 375,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 5,
                                    key: "x",
                                    index: 0
                                }],
                                rotation: [{
                                    value: 0,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 5,
                                    key: "rotation",
                                    index: 0
                                },
                                {
                                    value: 360,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 5,
                                    key: "rotation",
                                    index: 45
                                }]
                            }
                        }],
                        name: "ani1",
                        id: 1,
                        frameRate: 24,
                        action: 2
                    }],
                    loadList: ["imgs/panel/levelupUi_di_1.png", "imgs/panel/Pop-upsui_bg_3.png", "imgs/panel/Pop-upsui_bg_2.png", "imgs/panel/clearnewUi_light_1.png", "imgs/panel/GunmountUI_1.png"],
                    loadList3D: []
                },
                t
            } (n);
            e.GetNewDialogUI = u,
            l("ui.GetNewDialogUI", u);
            var g = function(e) {
                function t() {
                    return e.call(this) || this
                }
                return __extends(t, e),
                t.prototype.createChildren = function() {
                    e.prototype.createChildren.call(this),
                    this.createView(t.uiView)
                },
                t.uiView = {
                    type: "Dialog",
                    props: {
                        width: 750,
                        height: 1334
                    },
                    compId: 2,
                    child: [{
                        type: "Sprite",
                        props: {
                            y: 0,
                            x: 0,
                            "var": "sp_box"
                        },
                        compId: 3,
                        child: [{
                            type: "Image",
                            props: {
                                y: 320,
                                x: 77,
                                width: 596,
                                skin: "imgs/panel/levelupUi_di_1.png",
                                sizeGrid: "88,101,59,39",
                                height: 549
                            },
                            compId: 4
                        },
                        {
                            type: "Image",
                            props: {
                                y: 330,
                                x: 162,
                                width: 426,
                                skin: "imgs/panel/Pop-upsui_bg_3.png",
                                sizeGrid: "14,30,14,29"
                            },
                            compId: 5
                        },
                        {
                            type: "Image",
                            props: {
                                y: 392,
                                x: 88,
                                width: 575,
                                skin: "imgs/panel/Pop-upsui_bg_2.png",
                                sizeGrid: "60,67,43,69",
                                height: 470
                            },
                            compId: 6
                        },
                        {
                            type: "Image",
                            props: {
                                y: 619,
                                x: 98,
                                width: 556,
                                skin: "imgs/panel/Pop-upsui_bg_4.png",
                                sizeGrid: "38,35,38,31",
                                height: 90
                            },
                            compId: 7
                        },
                        {
                            type: "Text",
                            props: {
                                y: 338,
                                x: 246,
                                width: 257,
                                text: "Core infomation",
                                height: 44,
                                fontSize: 40,
                                font: "SimHei",
                                color: "#ffffff",
                                bold: !1,
                                align: "center",
                                runtime: "laya.display.Text"
                            },
                            compId: 8
                        },
                        {
                            type: "Text",
                            props: {
                                y: 620,
                                x: 122,
                                wordWrap: !0,
                                width: 505,
                                "var": "labDes",
                                valign: "middle",
                                text: "Get new core",
                                height: 88,
                                fontSize: 30,
                                font: "SimHei",
                                color: "#3f3e3e",
                                align: "center",
                                runtime: "laya.display.Text"
                            },
                            compId: 9
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 320,
                                x: 602,
                                "var": "btn_close",
                                texture: "imgs/panel/levelupUi_btn_1.png"
                            },
                            compId: 10
                        },
                        {
                            type: "Image",
                            props: {
                                y: 490,
                                x: 375,
                                width: 120,
                                "var": "imgBg",
                                skin: "imgs/win/hexin_bg.png",
                                pivotY: 55,
                                pivotX: 60,
                                height: 109
                            },
                            compId: 14,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 22,
                                    x: 32.5,
                                    "var": "imgIcon",
                                    skin: "imgs/gift/kejiui_hexin_1.png"
                                },
                                compId: 15
                            },
                            {
                                type: "Label",
                                props: {
                                    y: 85,
                                    x: 3,
                                    width: 114,
                                    "var": "labLV",
                                    text: "Lv:5",
                                    height: 24,
                                    fontSize: 24,
                                    font: "SimHei",
                                    color: "#ffffff",
                                    bold: !0,
                                    align: "center"
                                },
                                compId: 16
                            }]
                        },
                        {
                            type: "Image",
                            props: {
                                y: 580,
                                x: 98,
                                width: 89,
                                skin: "imgs/win/guoguan_bg_3.png",
                                height: 39
                            },
                            compId: 23,
                            child: [{
                                type: "Label",
                                props: {
                                    y: 8,
                                    x: 4,
                                    text: "property",
                                    fontSize: 22,
                                    font: "SimHei",
                                    color: "#ffffff"
                                },
                                compId: 24
                            }]
                        },
                        {
                            type: "Image",
                            props: {
                                y: 740,
                                x: 146.5,
                                width: 199,
                                "var": "btn_On",
                                skin: "imgs/panel/levelupUi_di_7.png",
                                height: 89
                            },
                            compId: 12,
                            child: [{
                                type: "Text",
                                props: {
                                    y: 27,
                                    x: 65,
                                    text: "Equip",
                                    fontSize: 34,
                                    font: "SimHei",
                                    color: "#ffffff",
                                    bold: !1,
                                    runtime: "laya.display.Text"
                                },
                                compId: 13
                            }]
                        },
                        {
                            type: "Image",
                            props: {
                                y: 740,
                                x: 146.5,
                                width: 199,
                                "var": "btn_Off",
                                skin: "imgs/panel/levelupUi_di_7.png",
                                height: 89
                            },
                            compId: 25,
                            child: [{
                                type: "Text",
                                props: {
                                    y: 27,
                                    x: 65,
                                    text: "remove",
                                    fontSize: 34,
                                    font: "SimHei",
                                    color: "#ffffff",
                                    bold: !1,
                                    runtime: "laya.display.Text"
                                },
                                compId: 26
                            }]
                        },
                        {
                            type: "Image",
                            props: {
                                y: 740,
                                x: 403.5,
                                width: 199,
                                "var": "btn_decompose",
                                skin: "imgs/panel/levelupUi_di_7.png",
                                height: 89
                            },
                            compId: 27,
                            child: [{
                                type: "Text",
                                props: {
                                    y: 27,
                                    x: 30,
                                    text: "Decompose",
                                    fontSize: 30,
                                    font: "SimHei",
                                    color: "#ffffff",
                                    bold: !1,
                                    runtime: "laya.display.Text"
                                },
                                compId: 28
                            }]
                        },
                        {
                            type: "Image",
                            props: {
                                y: 404,
                                x: 605.5,
                                "var": "btnHelp",
                                skin: "imgs/gift/hexinxinxi_xin.png"
                            },
                            compId: 29
                        },
                        {
                            type: "Image",
                            props: {
                                y: -475,
                                x: 0,
                                width: 750,
                                "var": "infoBg",
                                skin: "imgs/bg/blackBg.png",
                                mouseEnabled: !0,
                                height: 2478,
                                alpha: .8
                            },
                            compId: 49
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 330,
                                x: 90,
                                "var": "sp_Info"
                            },
                            compId: 36,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 0,
                                    x: 0,
                                    width: 570,
                                    skin: "imgs/panel/levelupUi_di_1.png",
                                    sizeGrid: "73,96,64,63",
                                    height: 500
                                },
                                compId: 37
                            },
                            {
                                type: "Image",
                                props: {
                                    y: 77,
                                    x: 12,
                                    width: 546,
                                    skin: "imgs/panel/Pop-upsui_bg_2.png",
                                    sizeGrid: "49,76,92,61",
                                    height: 406
                                },
                                compId: 38
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 0,
                                    x: 499,
                                    "var": "info_btn_close",
                                    texture: "imgs/panel/levelupUi_btn_1.png"
                                },
                                compId: 39
                            },
                            {
                                type: "Image",
                                props: {
                                    y: 95,
                                    x: 46.5,
                                    width: 477,
                                    "var": "imgInfo",
                                    skin: "imgs/gift/hexingshuxing_bg.png",
                                    sizeGrid: "0,65,0,77",
                                    height: 370
                                },
                                compId: 40,
                                child: [{
                                    type: "Label",
                                    props: {
                                        y: 23,
                                        x: 3,
                                        width: 470,
                                        text: "Lv1:Critical hit of bullet +2%-4%",
                                        name: "des1",
                                        fontSize: 24,
                                        font: "SimHei",
                                        color: "#28414f",
                                        align: "center"
                                    },
                                    compId: 41
                                },
                                {
                                    type: "Label",
                                    props: {
                                        y: 80,
                                        x: 3,
                                        width: 470,
                                        text: "Lv1:Critical hit of bullet +2%-4%",
                                        name: "des2",
                                        fontSize: 24,
                                        font: "SimHei",
                                        color: "#28414f",
                                        align: "center"
                                    },
                                    compId: 42
                                },
                                {
                                    type: "Label",
                                    props: {
                                        y: 145,
                                        x: 3,
                                        width: 470,
                                        text: "Lv1:Critical hit of bullet +2%-4%",
                                        name: "des3",
                                        fontSize: 24,
                                        font: "SimHei",
                                        color: "#28414f",
                                        align: "center"
                                    },
                                    compId: 43
                                },
                                {
                                    type: "Label",
                                    props: {
                                        y: 203,
                                        x: 3,
                                        width: 470,
                                        text: "Lv1:Critical hit of bullet +2%-4%",
                                        name: "des4",
                                        fontSize: 24,
                                        font: "SimHei",
                                        color: "#28414f",
                                        align: "center"
                                    },
                                    compId: 44
                                },
                                {
                                    type: "Label",
                                    props: {
                                        y: 267,
                                        x: 3,
                                        width: 470,
                                        text: "Lv1:Critical hit of bullet +2%-4%",
                                        name: "des5",
                                        fontSize: 24,
                                        font: "SimHei",
                                        color: "#28414f",
                                        align: "center"
                                    },
                                    compId: 45
                                },
                                {
                                    type: "Label",
                                    props: {
                                        y: 325,
                                        x: 3,
                                        width: 470,
                                        text: "Lv1:Critical hit of bullet +2%-4%",
                                        name: "des6",
                                        fontSize: 24,
                                        font: "SimHei",
                                        color: "#28414f",
                                        align: "center"
                                    },
                                    compId: 46
                                }]
                            },
                            {
                                type: "Image",
                                props: {
                                    y: 8.5,
                                    x: 81,
                                    width: 408,
                                    skin: "imgs/panel/Pop-upsui_bg_3.png",
                                    sizeGrid: "18,49,18,48",
                                    height: 63
                                },
                                compId: 47,
                                child: [{
                                    type: "Label",
                                    props: {
                                        y: 11,
                                        x: 50,
                                        text: "Core properties",
                                        fontSize: 40,
                                        font: "SimHei",
                                        color: "#ffffff"
                                    },
                                    compId: 48
                                }]
                            }]
                        }]
                    }],
                    loadList: ["imgs/panel/levelupUi_di_1.png", "imgs/panel/Pop-upsui_bg_3.png", "imgs/panel/Pop-upsui_bg_2.png", "imgs/panel/Pop-upsui_bg_4.png", "imgs/panel/levelupUi_btn_1.png", "imgs/win/hexin_bg.png", "imgs/gift/kejiui_hexin_1.png", "imgs/win/guoguan_bg_3.png", "imgs/panel/levelupUi_di_7.png", "imgs/gift/hexinxinxi_xin.png", "imgs/bg/blackBg.png", "imgs/gift/hexingshuxing_bg.png"],
                    loadList3D: []
                },
                t
            } (n);
            e.GiftInfoDialogUI = g,
            l("ui.GiftInfoDialogUI", g);
            var h = function(e) {
                function t() {
                    return e.call(this) || this
                }
                return __extends(t, e),
                t.prototype.createChildren = function() {
                    e.prototype.createChildren.call(this),
                    this.createView(t.uiView)
                },
                t.uiView = {
                    type: "View",
                    props: {
                        width: 113,
                        height: 90
                    },
                    compId: 2,
                    child: [{
                        type: "Image",
                        props: {
                            y: 35,
                            x: 53,
                            width: 113,
                            "var": "bg",
                            skin: "imgs/gift/kejiui_juxing_bg.png",
                            sizeGrid: "0,29,0,50",
                            pivotY: 18,
                            pivotX: 53,
                            height: 36
                        },
                        compId: 5
                    },
                    {
                        type: "Image",
                        props: {
                            y: 0,
                            x: 29,
                            skin: "imgs/gift/kejiui_lingxing_bg.png"
                        },
                        compId: 6
                    },
                    {
                        type: "Image",
                        props: {
                            y: 5,
                            x: 33.5,
                            "var": "imgIcon",
                            skin: "imgs/gift/kejiui_hexin_1.png"
                        },
                        compId: 8
                    },
                    {
                        type: "Label",
                        props: {
                            y: 73,
                            x: 39.21875,
                            "var": "labLv",
                            text: "Lv:5",
                            fontSize: 20,
                            font: "SimHei",
                            color: "#000000",
                            bold: !0
                        },
                        compId: 9
                    }],
                    loadList: ["imgs/gift/kejiui_juxing_bg.png", "imgs/gift/kejiui_lingxing_bg.png", "imgs/gift/kejiui_hexin_1.png"],
                    loadList3D: []
                },
                t
            } (o);
            e.GiftItemUI = h,
            l("ui.GiftItemUI", h);
            var c = function(e) {
                function t() {
                    return e.call(this) || this
                }
                return __extends(t, e),
                t.prototype.createChildren = function() {
                    e.prototype.createChildren.call(this),
                    this.createView(t.uiView)
                },
                t.uiView = {
                    type: "View",
                    props: {
                        width: 750,
                        height: 1334
                    },
                    compId: 2,
                    child: [{
                        type: "Image",
                        props: {
                            y: 0,
                            x: 0,
                            width: 750,
                            "var": "bg",
                            skin: "imgs/bg/blackBg.png",
                            height: 2e3,
                            alpha: .8
                        },
                        compId: 62
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 0,
                            x: 0,
                            "var": "sp_box"
                        },
                        compId: 61,
                        child: [{
                            type: "Image",
                            props: {
                                y: 174,
                                x: 74,
                                width: 596,
                                skin: "imgs/panel/levelupUi_di_1.png",
                                sizeGrid: "88,88,52,54",
                                height: 789
                            },
                            compId: 13
                        },
                        {
                            type: "Image",
                            props: {
                                y: 184,
                                x: 145,
                                width: 426,
                                skin: "imgs/panel/Pop-upsui_bg_3.png",
                                sizeGrid: "14,30,14,29"
                            },
                            compId: 14
                        },
                        {
                            type: "Image",
                            props: {
                                y: 244,
                                x: 85,
                                width: 576,
                                skin: "imgs/panel/Pop-upsui_bg_2.png",
                                sizeGrid: "67,80,43,54",
                                height: 712
                            },
                            compId: 15
                        },
                        {
                            type: "Label",
                            props: {
                                y: 192,
                                x: 159,
                                width: 400,
                                "var": "labTitle",
                                text: "Technology",
                                height: 40,
                                fontSize: 40,
                                font: "SimHei",
                                color: "#ffffff",
                                bold: !1,
                                align: "center"
                            },
                            compId: 16
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 340,
                                x: 153,
                                width: 85,
                                "var": "btnRampage",
                                pivotY: 46,
                                pivotX: 43,
                                height: 91
                            },
                            compId: 4,
                            child: [{
                                type: "Image",
                                props: {
                                    y: -17,
                                    x: -4,
                                    skin: "imgs/gift/libaoUI_icon.png"
                                },
                                compId: 12
                            },
                            {
                                type: "Label",
                                props: {
                                    y: 74,
                                    x: -16.5,
                                    width: 110,
                                    "var": "labRampageTime",
                                    text: "label",
                                    height: 24,
                                    fontSize: 24,
                                    font: "SimHei",
                                    color: "#000000",
                                    align: "center"
                                },
                                compId: 5
                            },
                            {
                                type: "Label",
                                props: {
                                    y: -23,
                                    x: 70,
                                    "var": "labHaveRampage",
                                    text: "2",
                                    fontSize: 24,
                                    font: "SimHei",
                                    color: "#000000",
                                    align: "center"
                                },
                                compId: 9
                            }]
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 174,
                                x: 599,
                                "var": "btnClose",
                                texture: "imgs/panel/levelupUi_btn_1.png"
                            },
                            compId: 6
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 266,
                                x: 514.5,
                                width: 100,
                                "var": "sp_eff",
                                height: 100
                            },
                            compId: 10
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 340,
                                x: 205,
                                width: 340,
                                "var": "sp_giftEquip",
                                height: 340
                            },
                            compId: 93,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 0,
                                    x: 0,
                                    width: 340,
                                    skin: "imgs/gift/kejiui_bg.png",
                                    height: 340
                                },
                                compId: 18,
                                child: [{
                                    type: "Sprite",
                                    props: {
                                        y: 211,
                                        x: 128,
                                        texture: "imgs/gift/hexinshuxing .png"
                                    },
                                    compId: 92
                                }]
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 0,
                                    x: 0,
                                    width: 340,
                                    "var": "giftEquip",
                                    height: 340
                                },
                                compId: 60,
                                child: [{
                                    type: "Sprite",
                                    props: {
                                        y: 8,
                                        x: 141,
                                        width: 63,
                                        name: "sp1",
                                        height: 67
                                    },
                                    compId: 28,
                                    child: [{
                                        type: "Image",
                                        props: {
                                            y: 0,
                                            x: -1,
                                            width: 63,
                                            skin: "imgs/gift/kejiui_hexin_bg.png",
                                            name: "bg",
                                            height: 67
                                        },
                                        compId: 30
                                    },
                                    {
                                        type: "Image",
                                        props: {
                                            y: 14,
                                            x: 16,
                                            skin: "imgs/gift/kejiui_suo.png",
                                            name: "lock"
                                        },
                                        compId: 29
                                    },
                                    {
                                        type: "Image",
                                        props: {
                                            y: 4,
                                            x: 3,
                                            skin: "imgs/gift/kejiui_hexin_1.png",
                                            name: "icon"
                                        },
                                        compId: 31
                                    },
                                    {
                                        type: "Label",
                                        props: {
                                            y: 51,
                                            x: 10,
                                            width: 48,
                                            text: "Lv:5",
                                            stroke: 2,
                                            name: "labLv",
                                            height: 20,
                                            fontSize: 20,
                                            color: "#ffffff",
                                            bold: !0,
                                            align: "left"
                                        },
                                        compId: 32
                                    },
                                    {
                                        type: "Image",
                                        props: {
                                            y: -12,
                                            x: 21,
                                            skin: "imgs/gift/kejiui_suo.png",
                                            scaleY: .7,
                                            scaleX: .7,
                                            name: "lockLevel"
                                        },
                                        compId: 73,
                                        child: [{
                                            type: "Label",
                                            props: {
                                                y: 44,
                                                x: -8.5,
                                                width: 47,
                                                text: "5",
                                                name: "labOpen",
                                                height: 40,
                                                fontSize: 40,
                                                font: "SimHei",
                                                color: "#ffffff",
                                                align: "center"
                                            },
                                            compId: 74
                                        }]
                                    }]
                                },
                                {
                                    type: "Sprite",
                                    props: {
                                        y: 72,
                                        x: 251.5,
                                        width: 63,
                                        name: "sp2",
                                        height: 67
                                    },
                                    compId: 34,
                                    child: [{
                                        type: "Image",
                                        props: {
                                            y: 0,
                                            x: 0,
                                            width: 63,
                                            skin: "imgs/gift/kejiui_hexin_bg.png",
                                            name: "bg",
                                            height: 67
                                        },
                                        compId: 35
                                    },
                                    {
                                        type: "Image",
                                        props: {
                                            y: 14,
                                            x: 16,
                                            skin: "imgs/gift/kejiui_suo.png",
                                            name: "lock"
                                        },
                                        compId: 36
                                    },
                                    {
                                        type: "Image",
                                        props: {
                                            y: 4,
                                            x: 4,
                                            skin: "imgs/gift/kejiui_hexin_1.png",
                                            name: "icon"
                                        },
                                        compId: 37
                                    },
                                    {
                                        type: "Label",
                                        props: {
                                            y: 51,
                                            x: 10,
                                            width: 48,
                                            text: "Lv:5",
                                            stroke: 2,
                                            name: "labLv",
                                            height: 20,
                                            fontSize: 20,
                                            color: "#ffffff",
                                            bold: !0,
                                            align: "left"
                                        },
                                        compId: 38
                                    },
                                    {
                                        type: "Image",
                                        props: {
                                            y: -12,
                                            x: 21,
                                            skin: "imgs/gift/kejiui_suo.png",
                                            scaleY: .7,
                                            scaleX: .7,
                                            name: "lockLevel"
                                        },
                                        compId: 64,
                                        child: [{
                                            type: "Label",
                                            props: {
                                                y: 44,
                                                x: -9,
                                                width: 48,
                                                text: "50",
                                                name: "labOpen",
                                                height: 40,
                                                fontSize: 40,
                                                font: "SimHei",
                                                color: "#ffffff",
                                                align: "center"
                                            },
                                            compId: 63
                                        }]
                                    }]
                                },
                                {
                                    type: "Sprite",
                                    props: {
                                        y: 204,
                                        x: 251.5,
                                        width: 63,
                                        name: "sp3",
                                        height: 67
                                    },
                                    compId: 44,
                                    child: [{
                                        type: "Image",
                                        props: {
                                            y: 0,
                                            x: 0,
                                            width: 63,
                                            skin: "imgs/gift/kejiui_hexin_bg.png",
                                            name: "bg",
                                            height: 67
                                        },
                                        compId: 45
                                    },
                                    {
                                        type: "Image",
                                        props: {
                                            y: 14,
                                            x: 16,
                                            skin: "imgs/gift/kejiui_suo.png",
                                            name: "lock"
                                        },
                                        compId: 46
                                    },
                                    {
                                        type: "Image",
                                        props: {
                                            y: 4,
                                            x: 4,
                                            skin: "imgs/gift/kejiui_hexin_1.png",
                                            name: "icon"
                                        },
                                        compId: 47
                                    },
                                    {
                                        type: "Label",
                                        props: {
                                            y: 51,
                                            x: 10,
                                            width: 48,
                                            text: "Lv:5",
                                            stroke: 2,
                                            name: "labLv",
                                            height: 20,
                                            fontSize: 20,
                                            color: "#ffffff",
                                            bold: !0,
                                            align: "left"
                                        },
                                        compId: 48
                                    },
                                    {
                                        type: "Image",
                                        props: {
                                            y: -12,
                                            x: 21,
                                            skin: "imgs/gift/kejiui_suo.png",
                                            scaleY: .7,
                                            scaleX: .7,
                                            name: "lockLevel"
                                        },
                                        compId: 65,
                                        child: [{
                                            type: "Label",
                                            props: {
                                                y: 44,
                                                x: -9,
                                                width: 48,
                                                text: "50",
                                                name: "labOpen",
                                                height: 40,
                                                fontSize: 40,
                                                font: "SimHei",
                                                color: "#ffffff",
                                                align: "center"
                                            },
                                            compId: 66
                                        }]
                                    }]
                                },
                                {
                                    type: "Sprite",
                                    props: {
                                        y: 267,
                                        x: 140,
                                        width: 63,
                                        name: "sp4",
                                        height: 67
                                    },
                                    compId: 49,
                                    child: [{
                                        type: "Image",
                                        props: {
                                            y: 0,
                                            x: 0,
                                            width: 63,
                                            skin: "imgs/gift/kejiui_hexin_bg.png",
                                            name: "bg",
                                            height: 67
                                        },
                                        compId: 50
                                    },
                                    {
                                        type: "Image",
                                        props: {
                                            y: 14,
                                            x: 16,
                                            skin: "imgs/gift/kejiui_suo.png",
                                            name: "lock"
                                        },
                                        compId: 51
                                    },
                                    {
                                        type: "Image",
                                        props: {
                                            y: 4,
                                            x: 4,
                                            skin: "imgs/gift/kejiui_hexin_1.png",
                                            name: "icon"
                                        },
                                        compId: 52
                                    },
                                    {
                                        type: "Label",
                                        props: {
                                            y: 51,
                                            x: 10,
                                            width: 48,
                                            text: "Lv:5",
                                            stroke: 2,
                                            name: "labLv",
                                            height: 20,
                                            fontSize: 20,
                                            color: "#ffffff",
                                            bold: !0,
                                            align: "left"
                                        },
                                        compId: 53
                                    },
                                    {
                                        type: "Image",
                                        props: {
                                            y: -12,
                                            x: 21,
                                            skin: "imgs/gift/kejiui_suo.png",
                                            scaleY: .7,
                                            scaleX: .7,
                                            name: "lockLevel"
                                        },
                                        compId: 67,
                                        child: [{
                                            type: "Label",
                                            props: {
                                                y: 44,
                                                x: -9,
                                                width: 48,
                                                text: "50",
                                                name: "labOpen",
                                                height: 40,
                                                fontSize: 40,
                                                font: "SimHei",
                                                color: "#ffffff",
                                                align: "center"
                                            },
                                            compId: 68
                                        }]
                                    }]
                                },
                                {
                                    type: "Sprite",
                                    props: {
                                        y: 204,
                                        x: 28.5,
                                        width: 63,
                                        name: "sp5",
                                        height: 67
                                    },
                                    compId: 54,
                                    child: [{
                                        type: "Image",
                                        props: {
                                            y: 0,
                                            x: 0,
                                            width: 63,
                                            skin: "imgs/gift/kejiui_hexin_bg.png",
                                            name: "bg",
                                            height: 67
                                        },
                                        compId: 55
                                    },
                                    {
                                        type: "Image",
                                        props: {
                                            y: 14,
                                            x: 16,
                                            skin: "imgs/gift/kejiui_suo.png",
                                            name: "lock"
                                        },
                                        compId: 56
                                    },
                                    {
                                        type: "Image",
                                        props: {
                                            y: 4,
                                            x: 4,
                                            skin: "imgs/gift/kejiui_hexin_1.png",
                                            name: "icon"
                                        },
                                        compId: 57
                                    },
                                    {
                                        type: "Label",
                                        props: {
                                            y: 51,
                                            x: 10,
                                            width: 48,
                                            text: "Lv:5",
                                            stroke: 2,
                                            name: "labLv",
                                            height: 20,
                                            fontSize: 20,
                                            color: "#ffffff",
                                            bold: !0,
                                            align: "left"
                                        },
                                        compId: 58
                                    },
                                    {
                                        type: "Image",
                                        props: {
                                            y: -12,
                                            x: 21,
                                            skin: "imgs/gift/kejiui_suo.png",
                                            scaleY: .7,
                                            scaleX: .7,
                                            name: "lockLevel"
                                        },
                                        compId: 69,
                                        child: [{
                                            type: "Label",
                                            props: {
                                                y: 44,
                                                x: -9,
                                                width: 48,
                                                text: "50",
                                                name: "labOpen",
                                                height: 40,
                                                fontSize: 40,
                                                font: "SimHei",
                                                color: "#ffffff",
                                                align: "center"
                                            },
                                            compId: 70
                                        }]
                                    }]
                                },
                                {
                                    type: "Sprite",
                                    props: {
                                        y: 73,
                                        x: 28.5,
                                        width: 63,
                                        name: "sp6",
                                        height: 67
                                    },
                                    compId: 39,
                                    child: [{
                                        type: "Image",
                                        props: {
                                            y: 0,
                                            x: 0,
                                            width: 63,
                                            skin: "imgs/gift/kejiui_hexin_bg.png",
                                            name: "bg",
                                            height: 67
                                        },
                                        compId: 40
                                    },
                                    {
                                        type: "Image",
                                        props: {
                                            y: 14,
                                            x: 16,
                                            skin: "imgs/gift/kejiui_suo.png",
                                            name: "lock"
                                        },
                                        compId: 41
                                    },
                                    {
                                        type: "Image",
                                        props: {
                                            y: 4,
                                            x: 4,
                                            skin: "imgs/gift/kejiui_hexin_1.png",
                                            name: "icon"
                                        },
                                        compId: 42
                                    },
                                    {
                                        type: "Label",
                                        props: {
                                            y: 51,
                                            x: 10,
                                            width: 48,
                                            text: "Lv:5",
                                            stroke: 2,
                                            name: "labLv",
                                            height: 20,
                                            fontSize: 20,
                                            color: "#ffffff",
                                            bold: !0,
                                            align: "left"
                                        },
                                        compId: 43
                                    },
                                    {
                                        type: "Image",
                                        props: {
                                            y: -12,
                                            x: 21,
                                            skin: "imgs/gift/kejiui_suo.png",
                                            scaleY: .7,
                                            scaleX: .7,
                                            name: "lockLevel"
                                        },
                                        compId: 71,
                                        child: [{
                                            type: "Label",
                                            props: {
                                                y: 44,
                                                x: -9,
                                                width: 48,
                                                text: "50",
                                                name: "labOpen",
                                                height: 40,
                                                fontSize: 40,
                                                font: "SimHei",
                                                color: "#ffffff",
                                                align: "center"
                                            },
                                            compId: 72
                                        }]
                                    }]
                                }]
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 107,
                                    x: 107,
                                    width: 125,
                                    "var": "btnProperty",
                                    height: 125
                                },
                                compId: 75
                            }]
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 720,
                                x: 95,
                                width: 560,
                                height: 200
                            },
                            compId: 94,
                            child: [{
                                type: "Label",
                                props: {
                                    y: 26,
                                    x: 155,
                                    width: 365,
                                    "var": "labDes",
                                    text: "Clear boss,have chance get core!",
                                    height: 24,
                                    fontSize: 24,
                                    font: "SimHei",
                                    color: "#000000",
                                    align: "left"
                                },
                                compId: 19
                            },
                            {
                                type: "Image",
                                props: {
                                    y: 18,
                                    x: -3,
                                    skin: "imgs/win/guoguan_bg_3.png"
                                },
                                compId: 20,
                                child: [{
                                    type: "Label",
                                    props: {
                                        y: 8.5,
                                        x: 17,
                                        text: "Got core",
                                        fontSize: 22,
                                        font: "SimHei",
                                        color: "#ffffff"
                                    },
                                    compId: 21
                                }]
                            },
                            {
                                type: "Image",
                                props: {
                                    y: 58,
                                    x: -3,
                                    width: 560,
                                    skin: "imgs/panel/Pop-upsui_bg_4.png",
                                    sizeGrid: "40,39,37,43",
                                    height: 123
                                },
                                compId: 22
                            },
                            {
                                type: "List",
                                props: {
                                    y: 79,
                                    x: 10,
                                    width: 546,
                                    "var": "listGift",
                                    spaceX: -17,
                                    repeatY: 1,
                                    renderType: "render",
                                    height: 100,
                                    elasticEnabled: !1
                                },
                                compId: 23,
                                child: [{
                                    type: "HScrollBar",
                                    props: {
                                        y: 83,
                                        x: 0,
                                        width: 541,
                                        visible: !1,
                                        "var": "scrollBar",
                                        skin: "comp/hscroll.png",
                                        scaleBar: !0,
                                        name: "scrollBar",
                                        height: 17
                                    },
                                    compId: 88
                                }]
                            }]
                        },
                        {
                            type: "Image",
                            props: {
                                y: -475,
                                x: 0,
                                width: 750,
                                "var": "infoBg",
                                skin: "imgs/bg/blackBg.png",
                                mouseEnabled: !0,
                                height: 2478,
                                alpha: .8
                            },
                            compId: 87
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 330,
                                x: 90,
                                "var": "sp_info"
                            },
                            compId: 98,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 0,
                                    x: 0,
                                    width: 570,
                                    skin: "imgs/panel/levelupUi_di_1.png",
                                    sizeGrid: "73,96,64,63",
                                    height: 500
                                },
                                compId: 99
                            },
                            {
                                type: "Image",
                                props: {
                                    y: 77,
                                    x: 12,
                                    width: 546,
                                    skin: "imgs/panel/Pop-upsui_bg_2.png",
                                    sizeGrid: "49,76,92,61",
                                    height: 406
                                },
                                compId: 101
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 0,
                                    x: 499,
                                    "var": "btn_close",
                                    texture: "imgs/panel/levelupUi_btn_1.png"
                                },
                                compId: 102
                            },
                            {
                                type: "Image",
                                props: {
                                    y: 95,
                                    x: 46.5,
                                    width: 477,
                                    "var": "imgInfo",
                                    skin: "imgs/gift/hexingshuxing_bg.png",
                                    sizeGrid: "0,65,0,77",
                                    height: 370
                                },
                                compId: 76,
                                child: [{
                                    type: "Label",
                                    props: {
                                        y: 23,
                                        x: 3,
                                        width: 470,
                                        text: "Lv1:Critical hit of bullet +2%-4%",
                                        name: "des1",
                                        fontSize: 24,
                                        font: "SimHei",
                                        color: "#28414f",
                                        align: "center"
                                    },
                                    compId: 77
                                },
                                {
                                    type: "Label",
                                    props: {
                                        y: 80,
                                        x: 3,
                                        width: 470,
                                        text: "Lv1:Critical hit of bullet +2%-4%",
                                        name: "des2",
                                        fontSize: 24,
                                        font: "SimHei",
                                        color: "#28414f",
                                        align: "center"
                                    },
                                    compId: 78
                                },
                                {
                                    type: "Label",
                                    props: {
                                        y: 145,
                                        x: 3,
                                        width: 470,
                                        text: "Lv1:Critical hit of bullet +2%-4%",
                                        name: "des3",
                                        fontSize: 24,
                                        font: "SimHei",
                                        color: "#28414f",
                                        align: "center"
                                    },
                                    compId: 79
                                },
                                {
                                    type: "Label",
                                    props: {
                                        y: 203,
                                        x: 3,
                                        width: 470,
                                        text: "Lv1:Critical hit of bullet +2%-4%",
                                        name: "des4",
                                        fontSize: 24,
                                        font: "SimHei",
                                        color: "#28414f",
                                        align: "center"
                                    },
                                    compId: 80
                                },
                                {
                                    type: "Label",
                                    props: {
                                        y: 267,
                                        x: 3,
                                        width: 470,
                                        text: "Lv1:Critical hit of bullet +2%-4%",
                                        name: "des5",
                                        fontSize: 24,
                                        font: "SimHei",
                                        color: "#28414f",
                                        align: "center"
                                    },
                                    compId: 81
                                },
                                {
                                    type: "Label",
                                    props: {
                                        y: 325,
                                        x: 3,
                                        width: 470,
                                        text: "Lv1:Critical hit of bullet +2%-4%",
                                        name: "des6",
                                        fontSize: 24,
                                        font: "SimHei",
                                        color: "#28414f",
                                        align: "center"
                                    },
                                    compId: 84
                                }]
                            },
                            {
                                type: "Image",
                                props: {
                                    y: 8.5,
                                    x: 81,
                                    width: 408,
                                    skin: "imgs/panel/Pop-upsui_bg_3.png",
                                    sizeGrid: "18,49,18,48",
                                    height: 63
                                },
                                compId: 104,
                                child: [{
                                    type: "Label",
                                    props: {
                                        y: 11,
                                        x: 124,
                                        text: "Core properties",
                                        fontSize: 40,
                                        font: "SimHei",
                                        color: "#ffffff"
                                    },
                                    compId: 105
                                }]
                            }]
                        }]
                    }],
                    loadList: ["imgs/bg/blackBg.png", "imgs/panel/levelupUi_di_1.png", "imgs/panel/Pop-upsui_bg_3.png", "imgs/panel/Pop-upsui_bg_2.png", "imgs/gift/libaoUI_icon.png", "imgs/panel/levelupUi_btn_1.png", "imgs/gift/kejiui_bg.png", "imgs/gift/hexinshuxing .png", "imgs/gift/kejiui_hexin_bg.png", "imgs/gift/kejiui_suo.png", "imgs/gift/kejiui_hexin_1.png", "imgs/win/guoguan_bg_3.png", "imgs/panel/Pop-upsui_bg_4.png", "comp/hscroll.png", "imgs/gift/hexingshuxing_bg.png"],
                    loadList3D: []
                },
                t
            } (o);
            e.GiftPanelUI = c,
            l("ui.GiftPanelUI", c);
            var f = function(e) {
                function t() {
                    return e.call(this) || this
                }
                return __extends(t, e),
                t.prototype.createChildren = function() {
                    e.prototype.createChildren.call(this),
                    this.createView(t.uiView)
                },
                t.uiView = {
                    type: "View",
                    props: {
                        width: 750,
                        height: 160
                    },
                    compId: 2,
                    child: [{
                        type: "Image",
                        props: {
                            y: -95,
                            x: 0,
                            width: 750,
                            skin: "imgs/panel/mainUi_di_7.png",
                            sizeGrid: "8,11,10,9",
                            height: 255
                        },
                        compId: 19
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 0,
                            x: 0
                        },
                        compId: 44,
                        child: [{
                            type: "Rect",
                            props: {
                                y: -330,
                                x: 750,
                                width: 1500,
                                lineWidth: 1,
                                height: 2e3,
                                fillColor: "#000000"
                            },
                            compId: 42,
                            child: [{
                                type: "Rect",
                                props: {
                                    y: -344,
                                    x: -418,
                                    width: 418,
                                    lineWidth: 1,
                                    height: 2e3,
                                    fillColor: "#000000"
                                },
                                compId: 43
                            }]
                        },
                        {
                            type: "Rect",
                            props: {
                                y: -330,
                                x: -1500,
                                width: 1500,
                                lineWidth: 1,
                                height: 2e3,
                                fillColor: "#000000"
                            },
                            compId: 40,
                            child: [{
                                type: "Rect",
                                props: {
                                    y: -344,
                                    x: -418,
                                    width: 418,
                                    lineWidth: 1,
                                    height: 2e3,
                                    fillColor: "#000000"
                                },
                                compId: 41
                            }]
                        }]
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 6,
                            x: 253,
                            width: 243,
                            "var": "sp_box",
                            height: 87
                        },
                        compId: 8,
                        child: [{
                            type: "Sprite",
                            props: {
                                y: 42,
                                x: 37,
                                width: 71,
                                pivotY: 29,
                                pivotX: 36,
                                height: 54
                            },
                            compId: 10,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 0,
                                    x: 0,
                                    skin: "imgs/panel/Topui_bg_1.png",
                                    name: "img"
                                },
                                compId: 21
                            }]
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 42,
                                x: 121,
                                width: 71,
                                scaleY: 1,
                                scaleX: 1,
                                pivotY: 29,
                                pivotX: 36,
                                height: 54
                            },
                            compId: 30,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 0,
                                    x: 0,
                                    skin: "imgs/panel/Topui_1.png",
                                    name: "img"
                                },
                                compId: 31
                            }]
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 42,
                                x: 207,
                                width: 71,
                                pivotY: 29,
                                pivotX: 36,
                                height: 54
                            },
                            compId: 28,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 0,
                                    x: 0,
                                    skin: "imgs/panel/Topui_bg_1.png",
                                    name: "img"
                                },
                                compId: 29
                            }]
                        }]
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 102,
                            x: 340,
                            "var": "sp_gold",
                            height: 49
                        },
                        compId: 16,
                        child: [{
                            type: "Sprite",
                            props: {
                                y: 4,
                                x: -33,
                                "var": "sp_icon",
                                texture: "imgs/panel/goldUI_1.png",
                                scaleY: .5,
                                scaleX: .5
                            },
                            compId: 17
                        },
                        {
                            type: "FontUI",
                            props: {
                                y: 6,
                                x: 12,
                                "var": "text_gold",
                                runtime: "ui.FontUIUI"
                            },
                            compId: 38
                        }]
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 39.5,
                            x: 45,
                            "var": "btn_suggest",
                            texture: "imgs/panel/mainUi_btn_9.png",
                            mouseEnabled: !0
                        },
                        compId: 25
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 29,
                            x: 33,
                            "var": "fightBg",
                            texture: "imgs/panel/Combat powerUi_bg.png"
                        },
                        compId: 35,
                        child: [{
                            type: "Label",
                            props: {
                                y: 4,
                                x: 23,
                                text: "Power",
                                fontSize: 16,
                                font: "SimHei",
                                color: "#ffffff",
                                bold: !0
                            },
                            compId: 37
                        },
                        {
                            type: "FontUI",
                            props: {
                                y: 42.75,
                                x: 69.5,
                                "var": "labFightingCapacity",
                                runtime: "ui.FontUIUI"
                            },
                            compId: 36
                        }]
                    }],
                    loadList: ["imgs/panel/mainUi_di_7.png", "imgs/panel/Topui_bg_1.png", "imgs/panel/Topui_1.png", "imgs/panel/goldUI_1.png", "imgs/panel/mainUi_btn_9.png", "imgs/panel/Combat powerUi_bg.png"],
                    loadList3D: []
                },
                t
            } (o);
            e.LevelPanelUI = f,
            l("ui.LevelPanelUI", f);
            var m = function(e) {
                function t() {
                    return e.call(this) || this
                }
                return __extends(t, e),
                t.prototype.createChildren = function() {
                    e.prototype.createChildren.call(this),
                    this.createView(t.uiView)
                },
                t.uiView = {
                    type: "View",
                    props: {
                        width: 750,
                        height: 1334
                    },
                    compId: 2,
                    child: [{
                        type: "Rect",
                        props: {
                            y: 0,
                            x: 0,
                            width: 750,
                            lineWidth: 1,
                            height: 1700,
                            fillColor: "#ffffff"
                        },
                        compId: 8
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 511,
                            x: 197,
                            texture: "imgs/panel/brand.png"
                        },
                        compId: 3
                    }],
                    loadList: ["imgs/panel/brand.png"],
                    loadList3D: []
                },
                t
            } (o);
            e.LogoPanelUI = m,
            l("ui.LogoPanelUI", m);
            var y = function(e) {
                function t() {
                    return e.call(this) || this
                }
                return __extends(t, e),
                t.prototype.createChildren = function() {
                    e.prototype.createChildren.call(this),
                    this.createView(t.uiView)
                },
                t.uiView = {
                    type: "Dialog",
                    props: {
                        width: 750,
                        height: 1334
                    },
                    compId: 2,
                    child: [{
                        type: "Sprite",
                        props: {
                            y: 319,
                            x: 94,
                            width: 562,
                            "var": "sp_box",
                            height: 696
                        },
                        compId: 3,
                        child: [{
                            type: "Image",
                            props: {
                                y: 0,
                                x: 0,
                                width: 562,
                                skin: "imgs/panel/levelupUi_di_1.png",
                                sizeGrid: "88,104,52,37",
                                height: 696
                            },
                            compId: 5
                        },
                        {
                            type: "Image",
                            props: {
                                y: 9,
                                x: 68,
                                width: 426,
                                skin: "imgs/panel/Pop-upsui_bg_3.png",
                                sizeGrid: "14,30,14,29"
                            },
                            compId: 32
                        },
                        {
                            type: "Text",
                            props: {
                                y: 18,
                                x: 181,
                                text: "Unlock New",
                                fontSize: 40,
                                font: "SimHei",
                                color: "#ffffff",
                                runtime: "laya.display.Text"
                            },
                            compId: 6
                        },
                        {
                            type: "Label",
                            props: {
                                y: 731,
                                x: 221,
                                width: 120,
                                "var": "label_close",
                                valign: "middle",
                                underline: !0,
                                text: "Give Up",
                                height: 50,
                                fontSize: 26,
                                font: "SimHei",
                                color: "#bebebe",
                                align: "center"
                            },
                            compId: 8
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 1,
                                x: 490,
                                "var": "btn_close",
                                texture: "imgs/panel/levelupUi_btn_1.png"
                            },
                            compId: 7
                        },
                        {
                            type: "Image",
                            props: {
                                y: 72,
                                x: 9,
                                width: 543,
                                skin: "imgs/panel/Pop-upsui_bg_2.png",
                                sizeGrid: "66,68,60,55",
                                height: 614
                            },
                            compId: 10,
                            child: [{
                                type: "Text",
                                props: {
                                    y: 363,
                                    x: 226.5,
                                    text: "Power",
                                    fontSize: 30,
                                    font: "SimHei",
                                    color: "#5f809f",
                                    runtime: "laya.display.Text"
                                },
                                compId: 17
                            },
                            {
                                type: "Image",
                                props: {
                                    y: 421,
                                    x: 71,
                                    width: 400,
                                    "var": "img_total",
                                    skin: "imgs/panel/clearnewUi_di_1.png",
                                    sizeGrid: "10,11,11,9",
                                    height: 26
                                },
                                compId: 18,
                                child: [{
                                    type: "Image",
                                    props: {
                                        y: 3,
                                        x: 3,
                                        width: 100,
                                        "var": "img_pro",
                                        skin: "imgs/panel/clearnewUi_di_2.png",
                                        sizeGrid: "7,8,8,5",
                                        height: 20
                                    },
                                    compId: 19
                                }]
                            }]
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 108,
                                x: 157,
                                width: 247,
                                "var": "lightBox",
                                height: 247
                            },
                            compId: 11,
                            child: [{
                                type: "Sprite",
                                props: {
                                    texture: "imgs/panel/clearnewUi_light_1.png"
                                },
                                compId: 12
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 42,
                                    x: 42,
                                    texture: "imgs/panel/clearnewUi_light_2.png"
                                },
                                compId: 13
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 78,
                                    x: 79,
                                    "var": "img_battery",
                                    texture: "imgs/panel/cannonUI_02.png"
                                },
                                compId: 14
                            }]
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 579,
                                x: 145,
                                "var": "btn_double_video",
                                texture: "imgs/panel/clearnewUi_btn_1.png"
                            },
                            compId: 20,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 1,
                                    x: 1,
                                    width: 216,
                                    height: 37
                                },
                                compId: 21,
                                child: [{
                                    type: "Text",
                                    props: {
                                        y: 3,
                                        x: 16,
                                        text: "Prize",
                                        fontSize: 30,
                                        font: "SimHei",
                                        color: "#825000",
                                        runtime: "laya.display.Text"
                                    },
                                    compId: 22
                                },
                                {
                                    type: "Sprite",
                                    props: {
                                        y: 6,
                                        x: 88,
                                        width: 25,
                                        texture: "imgs/panel/mainUi_money.png",
                                        height: 25
                                    },
                                    compId: 23
                                },
                                {
                                    type: "Text",
                                    props: {
                                        y: 3,
                                        x: 117,
                                        width: 79,
                                        "var": "text_gold",
                                        valign: "middle",
                                        text: "100K",
                                        height: 30,
                                        fontSize: 30,
                                        font: "SimHei",
                                        color: "#825000",
                                        align: "center",
                                        runtime: "laya.display.Text"
                                    },
                                    compId: 24
                                },
                                {
                                    type: "Sprite",
                                    props: {
                                        y: 37,
                                        x: 43.5,
                                        texture: "imgs/panel/offlinerevUi_video.png"
                                    },
                                    compId: 35
                                }]
                            }]
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 580,
                                x: 145,
                                "var": "btn_double_share",
                                texture: "imgs/panel/clearnewUi_btn_1.png"
                            },
                            compId: 25,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 1,
                                    x: 1,
                                    width: 216,
                                    height: 37
                                },
                                compId: 26,
                                child: [{
                                    type: "Text",
                                    props: {
                                        y: 3,
                                        x: 16,
                                        text: "Prize",
                                        fontSize: 30,
                                        font: "SimHei",
                                        color: "#825000",
                                        runtime: "laya.display.Text"
                                    },
                                    compId: 27
                                },
                                {
                                    type: "Sprite",
                                    props: {
                                        y: 6,
                                        x: 88,
                                        width: 25,
                                        texture: "imgs/panel/mainUi_money.png",
                                        height: 25
                                    },
                                    compId: 28
                                },
                                {
                                    type: "Text",
                                    props: {
                                        y: 3,
                                        x: 117,
                                        width: 79,
                                        "var": "text_gold1",
                                        valign: "middle",
                                        text: "100K",
                                        height: 30,
                                        fontSize: 30,
                                        font: "SimHei",
                                        color: "#825000",
                                        align: "center",
                                        runtime: "laya.display.Text"
                                    },
                                    compId: 29
                                }]
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 46,
                                    x: 55,
                                    width: 45,
                                    texture: "imgs/panel/offlinerevUi_share.png",
                                    height: 35
                                },
                                compId: 31
                            }]
                        }]
                    }],
                    animations: [{
                        nodes: [{
                            target: 12,
                            keyframes: {
                                y: [{
                                    value: 123,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 12,
                                    key: "y",
                                    index: 0
                                },
                                {
                                    value: 123,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 12,
                                    label: null,
                                    key: "y",
                                    index: 10
                                }],
                                x: [{
                                    value: 123,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 12,
                                    key: "x",
                                    index: 0
                                },
                                {
                                    value: 123,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 12,
                                    label: null,
                                    key: "x",
                                    index: 10
                                }],
                                scaleX: [{
                                    value: 1,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 12,
                                    key: "scaleX",
                                    index: 0
                                },
                                {
                                    value: 1,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 12,
                                    label: null,
                                    key: "scaleX",
                                    index: 10
                                }],
                                rotation: [{
                                    value: 0,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 12,
                                    key: "rotation",
                                    index: 0
                                },
                                {
                                    value: -360,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 12,
                                    label: null,
                                    key: "rotation",
                                    index: 10
                                }],
                                "play()": [{
                                    value: null,
                                    tweenMethod: "linearNone",
                                    tween: !1,
                                    target: 12,
                                    key: "play()",
                                    index: 0
                                },
                                {
                                    value: null,
                                    tweenMethod: "linearNone",
                                    tween: !1,
                                    target: 12,
                                    label: null,
                                    key: "play()",
                                    index: 10
                                }],
                                pivotY: [{
                                    value: 123.5,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 12,
                                    key: "pivotY",
                                    index: 0
                                },
                                {
                                    value: 123.5,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 12,
                                    label: null,
                                    key: "pivotY",
                                    index: 10
                                }],
                                pivotX: [{
                                    value: 123.5,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 12,
                                    key: "pivotX",
                                    index: 0
                                },
                                {
                                    value: 123.5,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 12,
                                    label: null,
                                    key: "pivotX",
                                    index: 10
                                }]
                            }
                        },
                        {
                            target: 13,
                            keyframes: {
                                y: [{
                                    value: 123,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 13,
                                    key: "y",
                                    index: 0
                                }],
                                x: [{
                                    value: 123,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 13,
                                    key: "x",
                                    index: 0
                                },
                                {
                                    value: 123,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 13,
                                    label: null,
                                    key: "x",
                                    index: 10
                                }],
                                rotation: [{
                                    value: 0,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 13,
                                    key: "rotation",
                                    index: 0
                                },
                                {
                                    value: 360,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 13,
                                    label: null,
                                    key: "rotation",
                                    index: 10
                                }],
                                pivotY: [{
                                    value: 81.5,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 13,
                                    key: "pivotY",
                                    index: 0
                                }],
                                pivotX: [{
                                    value: 81.5,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 13,
                                    key: "pivotX",
                                    index: 0
                                }],
                                height: [{
                                    value: 163,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 13,
                                    key: "height",
                                    index: 0
                                },
                                {
                                    value: 163,
                                    tweenMethod: "linearNone",
                                    tween: !0,
                                    target: 13,
                                    label: null,
                                    key: "height",
                                    index: 10
                                }]
                            }
                        }],
                        name: "ani1",
                        id: 1,
                        frameRate: 24,
                        action: 2
                    }],
                    loadList: ["imgs/panel/levelupUi_di_1.png", "imgs/panel/Pop-upsui_bg_3.png", "imgs/panel/levelupUi_btn_1.png", "imgs/panel/Pop-upsui_bg_2.png", "imgs/panel/clearnewUi_di_1.png", "imgs/panel/clearnewUi_di_2.png", "imgs/panel/clearnewUi_light_1.png", "imgs/panel/clearnewUi_light_2.png", "imgs/panel/cannonUI_02.png", "imgs/panel/clearnewUi_btn_1.png", "imgs/panel/mainUi_money.png", "imgs/panel/offlinerevUi_video.png", "imgs/panel/offlinerevUi_share.png"],
                    loadList3D: []
                },
                t
            } (n);
            e.NewBatteryDialogUI = y,
            l("ui.NewBatteryDialogUI", y);
            var v = function(e) {
                function t() {
                    return e.call(this) || this
                }
                return __extends(t, e),
                t.prototype.createChildren = function() {
                    e.prototype.createChildren.call(this),
                    this.createView(t.uiView)
                },
                t.uiView = {
                    type: "Dialog",
                    props: {
                        width: 750,
                        height: 1334
                    },
                    compId: 2,
                    child: [{
                        type: "Image",
                        props: {
                            y: 320,
                            x: 78,
                            width: 596,
                            skin: "imgs/panel/levelupUi_di_1.png",
                            sizeGrid: "88,101,59,39",
                            height: 517
                        },
                        compId: 25
                    },
                    {
                        type: "Image",
                        props: {
                            y: 330,
                            x: 163,
                            width: 426,
                            skin: "imgs/panel/Pop-upsui_bg_3.png",
                            sizeGrid: "14,30,14,29"
                        },
                        compId: 26
                    },
                    {
                        type: "Image",
                        props: {
                            y: 392,
                            x: 88,
                            width: 575,
                            skin: "imgs/panel/Pop-upsui_bg_2.png",
                            sizeGrid: "60,67,43,69",
                            height: 435
                        },
                        compId: 27
                    },
                    {
                        type: "Image",
                        props: {
                            y: 491,
                            x: 98,
                            width: 556,
                            skin: "imgs/panel/Pop-upsui_bg_4.png",
                            sizeGrid: "38,35,38,31",
                            height: 139
                        },
                        compId: 28
                    },
                    {
                        type: "Text",
                        props: {
                            y: 338,
                            x: 247,
                            width: 257,
                            "var": "labTitle",
                            text: "Offline Benefits",
                            height: 41,
                            fontSize: 40,
                            font: "SimHei",
                            color: "#ffffff",
                            bold: !1,
                            align: "center",
                            runtime: "laya.display.Text"
                        },
                        compId: 29
                    },
                    {
                        type: "Label",
                        props: {
                            y: 435,
                            x: 76,
                            width: 598,
                            "var": "labDes",
                            text: "During you left,accumulated ",
                            height: 30,
                            fontSize: 30,
                            color: "#3f3e3e",
                            bold: !1,
                            align: "center"
                        },
                        compId: 7
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 540,
                            x: 275,
                            "var": "iconGold",
                            texture: "imgs/panel/goldUI_1.png",
                            scaleY: .6,
                            scaleX: .6
                        },
                        compId: 8
                    },
                    {
                        type: "Label",
                        props: {
                            y: 533,
                            x: 325,
                            "var": "labGold",
                            valign: "middle",
                            text: "123KB",
                            fontSize: 56,
                            color: "#f17538",
                            bold: !1,
                            align: "left"
                        },
                        compId: 9
                    },
                    {
                        type: "Image",
                        props: {
                            y: 680,
                            x: 266,
                            width: 217,
                            "var": "btnThreeGetVideo",
                            skin: "imgs/panel/levelupUi_di_7.png",
                            sizeGrid: "4,4,4,6",
                            height: 89
                        },
                        compId: 21,
                        child: [{
                            type: "Label",
                            props: {
                                y: 31,
                                x: 91.5,
                                "var": "labThree",
                                text: "X3",
                                fontSize: 27,
                                color: "#ffffff"
                            },
                            compId: 11
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 19.5,
                                x: 18,
                                texture: "imgs/panel/offlinerevUi_video.png"
                            },
                            compId: 31
                        }]
                    },
                    {
                        type: "Image",
                        props: {
                            y: 680,
                            x: 266,
                            width: 217,
                            "var": "btnThreeGetShare",
                            skin: "imgs/panel/levelupUi_di_7.png",
                            sizeGrid: "4,4,4,6",
                            height: 89
                        },
                        compId: 22,
                        child: [{
                            type: "Label",
                            props: {
                                y: 31,
                                x: 19,
                                "var": "labThree1",
                                text: "X3",
                                fontSize: 27,
                                font: "SimHei",
                                color: "#ffffff"
                            },
                            compId: 23
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 18,
                                x: 137,
                                "var": "iconShare",
                                texture: "imgs/panel/offlinerevUi_share.png"
                            },
                            compId: 24
                        }]
                    },
                    {
                        type: "Label",
                        props: {
                            y: 853,
                            x: 307,
                            width: 138,
                            "var": "btnGet",
                            valign: "middle",
                            underline: !0,
                            text: "Give Up",
                            height: 50,
                            fontSize: 26,
                            color: "#d5d5d5",
                            align: "center"
                        },
                        compId: 13
                    }],
                    loadList: ["imgs/panel/levelupUi_di_1.png", "imgs/panel/Pop-upsui_bg_3.png", "imgs/panel/Pop-upsui_bg_2.png", "imgs/panel/Pop-upsui_bg_4.png", "imgs/panel/goldUI_1.png", "imgs/panel/levelupUi_di_7.png", "imgs/panel/offlinerevUi_video.png", "imgs/panel/offlinerevUi_share.png"],
                    loadList3D: []
                },
                t
            } (n);
            e.OfflineDialogUI = v,
            l("ui.OfflineDialogUI", v);
            var I = function(e) {
                function t() {
                    return e.call(this) || this
                }
                return __extends(t, e),
                t.prototype.createChildren = function() {
                    e.prototype.createChildren.call(this),
                    this.createView(t.uiView)
                },
                t.uiView = {
                    type: "Dialog",
                    props: {
                        width: 750,
                        height: 1334
                    },
                    compId: 2,
                    child: [{
                        type: "Sprite",
                        props: {
                            y: 0,
                            x: 0,
                            "var": "sp_box"
                        },
                        compId: 30,
                        child: [{
                            type: "Image",
                            props: {
                                y: 320,
                                x: 77,
                                width: 596,
                                skin: "imgs/panel/levelupUi_di_1.png",
                                sizeGrid: "88,101,59,39",
                                height: 517
                            },
                            compId: 22
                        },
                        {
                            type: "Image",
                            props: {
                                y: 330,
                                x: 162,
                                width: 426,
                                skin: "imgs/panel/Pop-upsui_bg_3.png",
                                sizeGrid: "14,30,14,29"
                            },
                            compId: 23
                        },
                        {
                            type: "Image",
                            props: {
                                y: 392,
                                x: 88,
                                width: 575,
                                skin: "imgs/panel/Pop-upsui_bg_2.png",
                                sizeGrid: "60,67,43,69",
                                height: 435
                            },
                            compId: 24
                        },
                        {
                            type: "Image",
                            props: {
                                y: 491,
                                x: 98,
                                width: 556,
                                skin: "imgs/panel/Pop-upsui_bg_4.png",
                                sizeGrid: "38,35,38,31",
                                height: 139
                            },
                            compId: 25,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 9,
                                    x: 218,
                                    width: 120,
                                    "var": "box",
                                    height: 120
                                },
                                compId: 31,
                                child: [{
                                    type: "Image",
                                    props: {
                                        y: 10,
                                        x: 16,
                                        "var": "img_battery",
                                        skin: "imgs/panel/cannonUI_02.png"
                                    },
                                    compId: 14
                                }]
                            }]
                        },
                        {
                            type: "Text",
                            props: {
                                y: 338,
                                x: 246,
                                width: 257,
                                text: "Recycle",
                                height: 44,
                                fontSize: 40,
                                font: "SimHei",
                                color: "#ffffff",
                                bold: !1,
                                align: "center",
                                runtime: "laya.display.Text"
                            },
                            compId: 26
                        },
                        {
                            type: "Text",
                            props: {
                                y: 435,
                                x: 122,
                                wordWrap: !0,
                                width: 505,
                                text: "Recycle or not?",
                                height: 32,
                                fontSize: 30,
                                font: "SimHei",
                                color: "#3f3e3e",
                                align: "center",
                                runtime: "laya.display.Text"
                            },
                            compId: 10
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 322,
                                x: 603,
                                "var": "btn_close",
                                texture: "imgs/panel/levelupUi_btn_1.png"
                            },
                            compId: 4
                        },
                        {
                            type: "Label",
                            props: {
                                y: 853,
                                x: 325,
                                width: 100,
                                "var": "label_close",
                                valign: "middle",
                                underline: !0,
                                text: "Close",
                                height: 50,
                                fontSize: 26,
                                font: "SimHei",
                                color: "#bebebe",
                                align: "center"
                            },
                            compId: 7
                        },
                        {
                            type: "Image",
                            props: {
                                y: 680,
                                x: 275,
                                width: 199,
                                "var": "btn_recovey",
                                skin: "imgs/panel/levelupUi_di_7.png",
                                height: 89
                            },
                            compId: 21,
                            child: [{
                                type: "Text",
                                props: {
                                    y: 27,
                                    x: 31,
                                    text: "Yes",
                                    fontSize: 34,
                                    font: "SimHei",
                                    color: "#ffffff",
                                    bold: !1,
                                    runtime: "laya.display.Text"
                                },
                                compId: 18
                            }]
                        }]
                    }],
                    loadList: ["imgs/panel/levelupUi_di_1.png", "imgs/panel/Pop-upsui_bg_3.png", "imgs/panel/Pop-upsui_bg_2.png", "imgs/panel/Pop-upsui_bg_4.png", "imgs/panel/cannonUI_02.png", "imgs/panel/levelupUi_btn_1.png", "imgs/panel/levelupUi_di_7.png"],
                    loadList3D: []
                },
                t
            } (n);
            e.RecoveryDialogUI = I,
            l("ui.RecoveryDialogUI", I);
            var b = function(e) {
                function t() {
                    return e.call(this) || this
                }
                return __extends(t, e),
                t.prototype.createChildren = function() {
                    e.prototype.createChildren.call(this),
                    this.createView(t.uiView)
                },
                t.uiView = {
                    type: "Dialog",
                    props: {
                        width: 750,
                        height: 1334
                    },
                    compId: 2,
                    child: [{
                        type: "Image",
                        props: {
                            y: 449,
                            x: 48,
                            width: 653,
                            "var": "sp_box_first",
                            skin: "imgs/panel/levelupUi_di_1.png",
                            sizeGrid: "88,89,56,57",
                            height: 435
                        },
                        compId: 4,
                        child: [{
                            type: "Text",
                            props: {
                                y: 12,
                                x: 246.5,
                                text: "游戏评价",
                                fontSize: 40,
                                font: "SimHei",
                                color: "#ffffff",
                                runtime: "laya.display.Text"
                            },
                            compId: 18
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 1,
                                x: 581,
                                "var": "btn_close",
                                texture: "imgs/panel/levelupUi_btn_1.png"
                            },
                            compId: 19
                        },
                        {
                            type: "Label",
                            props: {
                                y: 492,
                                x: 288,
                                width: 100,
                                "var": "label_close",
                                valign: "middle",
                                underline: !0,
                                text: "关闭",
                                height: 50,
                                fontSize: 26,
                                font: "SimHei",
                                color: "#bebebe",
                                align: "center"
                            },
                            compId: 20
                        },
                        {
                            type: "Text",
                            props: {
                                y: 154,
                                x: 117,
                                text: "你觉得这个游戏是否好玩？",
                                fontSize: 35,
                                font: "SimHei",
                                color: "#3f3e3e",
                                runtime: "laya.display.Text"
                            },
                            compId: 21
                        },
                        {
                            type: "Image",
                            props: {
                                y: 287,
                                x: 73,
                                width: 230,
                                "var": "btn_no",
                                skin: "imgs/panel/mainUi_btn_2_2.png",
                                sizeGrid: "5,8,6,4",
                                height: 75
                            },
                            compId: 22,
                            child: [{
                                type: "Text",
                                props: {
                                    y: 22,
                                    x: 70,
                                    text: "不好玩",
                                    fontSize: 30,
                                    font: "SimHei",
                                    color: "#ffffff",
                                    runtime: "laya.display.Text"
                                },
                                compId: 24
                            }]
                        },
                        {
                            type: "Image",
                            props: {
                                y: 287,
                                x: 357,
                                width: 230,
                                "var": "btn_yes",
                                skin: "imgs/panel/levelupUi_di_7.png",
                                sizeGrid: "5,7,7,6",
                                height: 75
                            },
                            compId: 23,
                            child: [{
                                type: "Text",
                                props: {
                                    y: 20,
                                    x: 80,
                                    text: "好玩",
                                    fontSize: 35,
                                    font: "SimHei",
                                    color: "#ffffff",
                                    runtime: "laya.display.Text"
                                },
                                compId: 25
                            }]
                        }]
                    },
                    {
                        type: "Image",
                        props: {
                            y: 240,
                            x: 48,
                            width: 653,
                            "var": "sp_box_second",
                            skin: "imgs/panel/levelupUi_di_1.png",
                            sizeGrid: "89,112,45,55",
                            height: 735
                        },
                        compId: 27,
                        child: [{
                            type: "Sprite",
                            props: {
                                y: 1,
                                x: 581,
                                "var": "btn_close2",
                                texture: "imgs/panel/levelupUi_btn_1.png"
                            },
                            compId: 28
                        },
                        {
                            type: "Label",
                            props: {
                                y: 786,
                                x: 276,
                                width: 100,
                                "var": "label_close2",
                                valign: "middle",
                                underline: !0,
                                text: "关闭",
                                height: 50,
                                fontSize: 26,
                                font: "SimHei",
                                color: "#bebebe",
                                align: "center"
                            },
                            compId: 29
                        },
                        {
                            type: "Text",
                            props: {
                                y: 14,
                                x: 246,
                                text: "投诉建议",
                                fontSize: 40,
                                font: "SimHei",
                                color: "#ffffff",
                                runtime: "laya.display.Text"
                            },
                            compId: 30
                        },
                        {
                            type: "Text",
                            props: {
                                y: 118,
                                x: 81,
                                text: "你觉得哪些地方需要改进(多选)",
                                fontSize: 35,
                                font: "SimHei",
                                color: "#3f3e3e",
                                runtime: "laya.display.Text"
                            },
                            compId: 31
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 194,
                                x: 83,
                                width: 487,
                                "var": "box",
                                height: 403
                            },
                            compId: 60,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 0,
                                    x: 82,
                                    width: 353,
                                    height: 44
                                },
                                compId: 33,
                                child: [{
                                    type: "Image",
                                    props: {
                                        y: 0,
                                        x: 0,
                                        width: 37,
                                        skin: "imgs/panel/suggestionUi_di_1.png",
                                        sizeGrid: "9,11,8,7",
                                        height: 37
                                    },
                                    compId: 35
                                },
                                {
                                    type: "Image",
                                    props: {
                                        y: -5,
                                        x: -6,
                                        skin: "imgs/panel/suggestionUi_di_2.png",
                                        name: "gou"
                                    },
                                    compId: 37
                                },
                                {
                                    type: "Text",
                                    props: {
                                        y: 4,
                                        x: 90,
                                        text: "游戏太卡，不流畅",
                                        name: "text",
                                        fontSize: 29,
                                        font: "SimHei",
                                        color: "#2d5f8d",
                                        runtime: "laya.display.Text"
                                    },
                                    compId: 36
                                }]
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 70,
                                    x: 82,
                                    width: 261,
                                    height: 44
                                },
                                compId: 38,
                                child: [{
                                    type: "Image",
                                    props: {
                                        y: 0,
                                        x: 0,
                                        width: 37,
                                        skin: "imgs/panel/suggestionUi_di_1.png",
                                        sizeGrid: "9,11,8,7",
                                        height: 37
                                    },
                                    compId: 39
                                },
                                {
                                    type: "Image",
                                    props: {
                                        y: -5,
                                        x: -6,
                                        skin: "imgs/panel/suggestionUi_di_2.png",
                                        name: "gou"
                                    },
                                    compId: 40
                                },
                                {
                                    type: "Text",
                                    props: {
                                        y: 4,
                                        x: 90,
                                        text: "游戏不好看",
                                        name: "text",
                                        fontSize: 29,
                                        font: "SimHei",
                                        color: "#2d5f8d",
                                        runtime: "laya.display.Text"
                                    },
                                    compId: 41
                                }]
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 140,
                                    x: 82,
                                    width: 299,
                                    height: 43
                                },
                                compId: 42,
                                child: [{
                                    type: "Image",
                                    props: {
                                        y: 0,
                                        x: 0,
                                        width: 37,
                                        skin: "imgs/panel/suggestionUi_di_1.png",
                                        sizeGrid: "9,11,8,7",
                                        height: 37
                                    },
                                    compId: 43
                                },
                                {
                                    type: "Image",
                                    props: {
                                        y: -5,
                                        x: -6,
                                        skin: "imgs/panel/suggestionUi_di_2.png",
                                        name: "gou"
                                    },
                                    compId: 44
                                },
                                {
                                    type: "Text",
                                    props: {
                                        y: 4,
                                        x: 90,
                                        text: "游戏完全没难度",
                                        name: "text",
                                        fontSize: 29,
                                        font: "SimHei",
                                        color: "#2d5f8d",
                                        runtime: "laya.display.Text"
                                    },
                                    compId: 45
                                }]
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 210,
                                    x: 82,
                                    width: 274,
                                    height: 43
                                },
                                compId: 46,
                                child: [{
                                    type: "Image",
                                    props: {
                                        y: 0,
                                        x: 0,
                                        width: 37,
                                        skin: "imgs/panel/suggestionUi_di_1.png",
                                        sizeGrid: "9,11,8,7",
                                        height: 37
                                    },
                                    compId: 47
                                },
                                {
                                    type: "Image",
                                    props: {
                                        y: -5,
                                        x: -6,
                                        skin: "imgs/panel/suggestionUi_di_2.png",
                                        name: "gou"
                                    },
                                    compId: 48
                                },
                                {
                                    type: "Text",
                                    props: {
                                        y: 4,
                                        x: 90,
                                        text: "游戏难度太高",
                                        name: "text",
                                        fontSize: 29,
                                        font: "SimHei",
                                        color: "#2d5f8d",
                                        runtime: "laya.display.Text"
                                    },
                                    compId: 49
                                }]
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 280,
                                    x: 82,
                                    width: 246,
                                    height: 43
                                },
                                compId: 50,
                                child: [{
                                    type: "Image",
                                    props: {
                                        y: 0,
                                        x: 0,
                                        width: 37,
                                        skin: "imgs/panel/suggestionUi_di_1.png",
                                        sizeGrid: "9,11,8,7",
                                        height: 37
                                    },
                                    compId: 51
                                },
                                {
                                    type: "Image",
                                    props: {
                                        y: -5,
                                        x: -6,
                                        skin: "imgs/panel/suggestionUi_di_2.png",
                                        name: "gou"
                                    },
                                    compId: 52
                                },
                                {
                                    type: "Text",
                                    props: {
                                        y: 4,
                                        x: 90,
                                        text: "游戏很无聊",
                                        name: "text",
                                        fontSize: 29,
                                        font: "SimHei",
                                        color: "#2d5f8d",
                                        runtime: "laya.display.Text"
                                    },
                                    compId: 53
                                }]
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 350,
                                    x: 82,
                                    width: 331,
                                    height: 43
                                },
                                compId: 54,
                                child: [{
                                    type: "Image",
                                    props: {
                                        y: 0,
                                        x: 0,
                                        width: 37,
                                        skin: "imgs/panel/suggestionUi_di_1.png",
                                        sizeGrid: "9,11,8,7",
                                        height: 37
                                    },
                                    compId: 55
                                },
                                {
                                    type: "Image",
                                    props: {
                                        y: -5,
                                        x: -6,
                                        skin: "imgs/panel/suggestionUi_di_2.png",
                                        name: "gou"
                                    },
                                    compId: 56
                                },
                                {
                                    type: "Text",
                                    props: {
                                        y: 4,
                                        x: 90,
                                        text: "游戏广告太多无聊",
                                        name: "text",
                                        fontSize: 29,
                                        font: "SimHei",
                                        color: "#2d5f8d",
                                        runtime: "laya.display.Text"
                                    },
                                    compId: 57
                                }]
                            }]
                        },
                        {
                            type: "Image",
                            props: {
                                y: 629,
                                x: 211,
                                width: 230,
                                "var": "btn_submit",
                                skin: "imgs/panel/levelupUi_di_7.png",
                                sizeGrid: "6,5,8,5",
                                height: 75
                            },
                            compId: 58,
                            child: [{
                                type: "Text",
                                props: {
                                    y: 20,
                                    x: 80,
                                    text: "Submit",
                                    fontSize: 35,
                                    font: "SimHei",
                                    color: "#ffffff",
                                    runtime: "laya.display.Text"
                                },
                                compId: 59
                            }]
                        }]
                    }],
                    loadList: ["imgs/panel/levelupUi_di_1.png", "imgs/panel/levelupUi_btn_1.png", "imgs/panel/mainUi_btn_2_2.png", "imgs/panel/levelupUi_di_7.png", "imgs/panel/suggestionUi_di_1.png", "imgs/panel/suggestionUi_di_2.png"],
                    loadList3D: []
                },
                t
            } (n);
            e.SuggestionDialogUI = b,
            l("ui.SuggestionDialogUI", b);
            var x = function(e) {
                function t() {
                    return e.call(this) || this
                }
                return __extends(t, e),
                t.prototype.createChildren = function() {
                    e.prototype.createChildren.call(this),
                    this.createView(t.uiView)
                },
                t.uiView = {
                    type: "View",
                    props: {
                        width: 600,
                        height: 177
                    },
                    compId: 2,
                    child: [{
                        type: "Image",
                        props: {
                            y: 0,
                            x: 0,
                            width: 600,
                            "var": "bg",
                            skin: "imgs/panel/levelupUi_di_6.png",
                            sizeGrid: "15,9,52,10",
                            height: 177
                        },
                        compId: 4
                    },
                    {
                        type: "Image",
                        props: {
                            y: 12,
                            x: 13,
                            width: 125,
                            "var": "iconBg",
                            skin: "imgs/panel/levelupUi_di_2.png",
                            sizeGrid: "15,25,59,16",
                            height: 127
                        },
                        compId: 14
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 19,
                            x: 41.21923828125,
                            width: 60,
                            "var": "imgIcon",
                            texture: "imgs/panel/levelupUi_icon_0.png",
                            height: 68
                        },
                        compId: 12
                    },
                    {
                        type: "Label",
                        props: {
                            y: 92,
                            x: 13,
                            width: 116,
                            "var": "labCurLevel",
                            text: "Lv.2",
                            height: 26,
                            fontSize: 26,
                            color: "#ffffff",
                            align: "center"
                        },
                        compId: 5
                    },
                    {
                        type: "Label",
                        props: {
                            y: 29,
                            x: 146,
                            width: 271,
                            "var": "labName",
                            text: "Name",
                            height: 40,
                            fontSize: 28,
                            color: "#3e6f9d"
                        },
                        compId: 6
                    },
                    {
                        type: "Label",
                        props: {
                            y: 89.5,
                            x: 146,
                            width: 259,
                            "var": "labNextLevel",
                            text: "After upgrade",
                            height: 25,
                            fontSize: 24,
                            color: "#3e6f9d"
                        },
                        compId: 7
                    },
                    {
                        type: "Label",
                        props: {
                            y: 145,
                            x: 0,
                            width: 600,
                            "var": "labDes",
                            text: "Description",
                            height: 30,
                            fontSize: 24,
                            color: "#ffffff",
                            align: "center"
                        },
                        compId: 8
                    },
                    {
                        type: "Image",
                        props: {
                            y: 28,
                            x: 423,
                            width: 156,
                            "var": "btnBuy",
                            skin: "imgs/panel/levelupUi_di_7.png",
                            sizeGrid: "4,4,5,5",
                            height: 86
                        },
                        compId: 16,
                        child: [{
                            type: "Sprite",
                            props: {
                                y: 8,
                                x: 25,
                                width: 32,
                                "var": "iconGold",
                                texture: "imgs/panel/mainUi_money.png",
                                height: 32
                            },
                            compId: 15
                        },
                        {
                            type: "Label",
                            props: {
                                y: 8,
                                x: 59,
                                "var": "labPrice",
                                text: "99",
                                fontSize: 30,
                                color: "#ffffff",
                                align: "center"
                            },
                            compId: 10
                        },
                        {
                            type: "Label",
                            props: {
                                y: 45,
                                x: 0,
                                width: 156,
                                "var": "labUp",
                                text: "Upgrade",
                                height: 30,
                                fontSize: 24,
                                color: "#ffffff",
                                align: "center"
                            },
                            compId: 11
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: -10,
                                x: 134,
                                "var": "img_hot",
                                texture: "imgs/adver/interB_icon_1.png"
                            },
                            compId: 17
                        }]
                    }],
                    loadList: ["imgs/panel/levelupUi_di_6.png", "imgs/panel/levelupUi_di_2.png", "imgs/panel/levelupUi_icon_0.png", "imgs/panel/levelupUi_di_7.png", "imgs/panel/mainUi_money.png", "imgs/adver/interB_icon_1.png"],
                    loadList3D: []
                },
                t
            } (o);
            e.TechnologyItemUI = x,
            l("ui.TechnologyItemUI", x);
            var L = function(e) {
                function t() {
                    return e.call(this) || this
                }
                return __extends(t, e),
                t.prototype.createChildren = function() {
                    e.prototype.createChildren.call(this),
                    this.createView(t.uiView)
                },
                t.uiView = {
                    type: "View",
                    props: {
                        width: 750,
                        height: 1700
                    },
                    compId: 2,
                    child: [{
                        type: "Image",
                        props: {
                            y: 0,
                            x: 0,
                            width: 750,
                            "var": "bg",
                            skin: "imgs/bg/blackBg.png",
                            mouseThrough: !1,
                            mouseEnabled: !0,
                            height: 1900,
                            alpha: .4
                        },
                        compId: 3
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 0,
                            x: 0,
                            width: 750,
                            "var": "sp_box",
                            height: 1334
                        },
                        compId: 6,
                        child: [{
                            type: "Image",
                            props: {
                                y: 297,
                                x: 37,
                                width: 674,
                                "var": "bg1",
                                skin: "imgs/panel/levelupUi_di_1.png",
                                sizeGrid: "81,89,63,49",
                                height: 697
                            },
                            compId: 10
                        },
                        {
                            type: "Image",
                            props: {
                                y: 371,
                                x: 51,
                                width: 647,
                                skin: "imgs/panel/Pop-upsui_bg_2.png",
                                sizeGrid: "67,80,43,54",
                                height: 609
                            },
                            compId: 14
                        },
                        {
                            type: "Image",
                            props: {
                                y: 306,
                                x: 162,
                                width: 426,
                                skin: "imgs/panel/Pop-upsui_bg_3.png",
                                sizeGrid: "14,30,14,29"
                            },
                            compId: 13
                        },
                        {
                            type: "Label",
                            props: {
                                y: 314,
                                x: 334,
                                "var": "labTitle",
                                text: "Upgrade",
                                fontSize: 40,
                                font: "SimHei",
                                color: "#ffffff",
                                bold: !0
                            },
                            compId: 4
                        },
                        {
                            type: "List",
                            props: {
                                y: 395,
                                x: 72,
                                width: 606,
                                "var": "list",
                                spaceY: 20,
                                repeatX: 1,
                                height: 567
                            },
                            compId: 7
                        },
                        {
                            type: "Image",
                            props: {
                                y: 297,
                                x: 640,
                                "var": "btnClose",
                                skin: "imgs/panel/levelupUi_btn_1.png"
                            },
                            compId: 11
                        },
                        {
                            type: "Label",
                            props: {
                                y: 1037,
                                x: 325,
                                width: 100,
                                "var": "label_close",
                                valign: "middle",
                                underline: !0,
                                text: "Close",
                                height: 50,
                                fontSize: 26,
                                font: "SimHei",
                                color: "#bebebe",
                                align: "center"
                            },
                            compId: 12
                        }]
                    }],
                    loadList: ["imgs/bg/blackBg.png", "imgs/panel/levelupUi_di_1.png", "imgs/panel/Pop-upsui_bg_2.png", "imgs/panel/Pop-upsui_bg_3.png", "imgs/panel/levelupUi_btn_1.png"],
                    loadList3D: []
                },
                t
            } (o);
            e.TechnologyPanelUI = L,
            l("ui.TechnologyPanelUI", L);
            var _ = function(e) {
                function t() {
                    return e.call(this) || this
                }
                return __extends(t, e),
                t.prototype.createChildren = function() {
                    e.prototype.createChildren.call(this),
                    this.createView(t.uiView)
                },
                t.uiView = {
                    type: "View",
                    props: {
                        width: 750,
                        height: 1334
                    },
                    compId: 2,
                    child: [{
                        type: "Label",
                        props: {
                            y: 600,
                            x: 0,
                            width: 750,
                            "var": "labTip",
                            valign: "middle",
                            text: "Tip",
                            fontSize: 35,
                            color: "#0c1f4a",
                            align: "center"
                        },
                        compId: 3
                    }],
                    loadList: [],
                    loadList3D: []
                },
                t
            } (o);
            e.TipPanelUI = _,
            l("ui.TipPanelUI", _);
            var S = function(e) {
                function t() {
                    return e.call(this) || this
                }
                return __extends(t, e),
                t.prototype.createChildren = function() {
                    e.prototype.createChildren.call(this),
                    this.createView(t.uiView)
                },
                t.uiView = {
                    type: "Dialog",
                    props: {
                        width: 750,
                        height: 1334
                    },
                    compId: 2,
                    child: [{
                        type: "Sprite",
                        props: {
                            y: 264,
                            x: 94,
                            width: 562,
                            "var": "sp_box",
                            height: 640
                        },
                        compId: 3,
                        child: [{
                            type: "Image",
                            props: {
                                y: 0,
                                x: 0,
                                width: 562,
                                skin: "imgs/panel/levelupUi_di_1.png",
                                sizeGrid: "88,104,52,37",
                                height: 640
                            },
                            compId: 4
                        },
                        {
                            type: "Image",
                            props: {
                                y: 9,
                                x: 68,
                                width: 426,
                                skin: "imgs/panel/Pop-upsui_bg_3.png",
                                sizeGrid: "14,30,14,29"
                            },
                            compId: 5
                        },
                        {
                            type: "Text",
                            props: {
                                y: 18,
                                x: 201,
                                text: "Upgrade!",
                                fontSize: 40,
                                font: "SimHei",
                                color: "#ffffff",
                                runtime: "laya.display.Text"
                            },
                            compId: 6
                        },
                        {
                            type: "Label",
                            props: {
                                y: 719,
                                x: 221,
                                width: 120,
                                "var": "label_close",
                                valign: "middle",
                                underline: !0,
                                text: "Give Up",
                                height: 50,
                                fontSize: 26,
                                font: "SimHei",
                                color: "#bebebe",
                                align: "center"
                            },
                            compId: 7
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 1,
                                x: 490,
                                "var": "btn_close",
                                texture: "imgs/panel/levelupUi_btn_1.png"
                            },
                            compId: 8
                        },
                        {
                            type: "Image",
                            props: {
                                y: 72,
                                x: 9,
                                width: 543,
                                skin: "imgs/panel/Pop-upsui_bg_2.png",
                                sizeGrid: "66,68,60,55",
                                height: 555
                            },
                            compId: 9,
                            child: [{
                                type: "Text",
                                props: {
                                    y: 247,
                                    x: 226,
                                    text: "Power",
                                    fontSize: 30,
                                    font: "SimHei",
                                    color: "#5f809f",
                                    runtime: "laya.display.Text"
                                },
                                compId: 10
                            },
                            {
                                type: "Image",
                                props: {
                                    y: 308,
                                    x: 71,
                                    width: 400,
                                    "var": "img_total",
                                    skin: "imgs/panel/clearnewUi_di_1.png",
                                    sizeGrid: "10,11,11,9",
                                    height: 26
                                },
                                compId: 11,
                                child: [{
                                    type: "Image",
                                    props: {
                                        y: 3,
                                        x: 3,
                                        width: 50,
                                        "var": "img_pro_before",
                                        skin: "imgs/panel/clearnewUi_di_3.png",
                                        sizeGrid: "7,8,8,5",
                                        height: 20
                                    },
                                    compId: 47
                                },
                                {
                                    type: "Image",
                                    props: {
                                        y: 3,
                                        x: 3,
                                        width: 20,
                                        "var": "img_pro",
                                        skin: "imgs/panel/clearnewUi_di_2.png",
                                        sizeGrid: "7,8,8,5",
                                        height: 20
                                    },
                                    compId: 12
                                }]
                            }]
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 155,
                                x: -1,
                                width: 564,
                                height: 124
                            },
                            compId: 40,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 0,
                                    x: 90,
                                    width: 120,
                                    "var": "box1",
                                    height: 120
                                },
                                compId: 35,
                                child: [{
                                    type: "Sprite",
                                    props: {
                                        y: 10,
                                        x: 16,
                                        "var": "img_battery_before",
                                        texture: "imgs/panel/cannonUI_02.png"
                                    },
                                    compId: 30
                                }]
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 0,
                                    x: 350,
                                    width: 120,
                                    "var": "box2",
                                    height: 120
                                },
                                compId: 36,
                                child: [{
                                    type: "Sprite",
                                    props: {
                                        y: 10,
                                        x: 16,
                                        "var": "img_battery_after",
                                        texture: "imgs/panel/cannonUI_02.png"
                                    },
                                    compId: 32
                                }]
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 62,
                                    x: 281,
                                    texture: "imgs/panel/upgradeIcon.png",
                                    rotation: 90,
                                    pivotY: 30,
                                    pivotX: 21
                                },
                                compId: 34
                            }]
                        },
                        {
                            type: "Image",
                            props: {
                                y: 475,
                                x: 157,
                                width: 248,
                                "var": "btn_upgrade",
                                skin: "imgs/panel/levelupUi_di_7.png",
                                sizeGrid: "30,66,44,64",
                                height: 88
                            },
                            compId: 44,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 18,
                                    x: 22,
                                    texture: "imgs/panel/offlinerevUi_video.png"
                                },
                                compId: 48
                            },
                            {
                                type: "Text",
                                props: {
                                    y: 29,
                                    x: 104.828125,
                                    text: "Upgrade",
                                    strokeColor: "#473317",
                                    fontSize: 30,
                                    font: "SimHei",
                                    color: "#ffffff",
                                    bold: !0,
                                    runtime: "laya.display.Text"
                                },
                                compId: 46
                            }]
                        }]
                    }],
                    loadList: ["imgs/panel/levelupUi_di_1.png", "imgs/panel/Pop-upsui_bg_3.png", "imgs/panel/levelupUi_btn_1.png", "imgs/panel/Pop-upsui_bg_2.png", "imgs/panel/clearnewUi_di_1.png", "imgs/panel/clearnewUi_di_3.png", "imgs/panel/clearnewUi_di_2.png", "imgs/panel/cannonUI_02.png", "imgs/panel/upgradeIcon.png", "imgs/panel/levelupUi_di_7.png", "imgs/panel/offlinerevUi_video.png"],
                    loadList3D: []
                },
                t
            } (n);
            e.UpgradeDialogUI = S,
            l("ui.UpgradeDialogUI", S);
            var w = function(e) {
                function t() {
                    return e.call(this) || this
                }
                return __extends(t, e),
                t.prototype.createChildren = function() {
                    e.prototype.createChildren.call(this),
                    this.createView(t.uiView)
                },
                t.uiView = {
                    type: "Dialog",
                    props: {
                        width: 750,
                        height: 1334
                    },
                    compId: 2,
                    child: [{
                        type: "Image",
                        props: {
                            y: 0,
                            x: 0,
                            width: 750,
                            "var": "bg",
                            skin: "imgs/bg/blackBg.png",
                            height: 2e3,
                            alpha: .8
                        },
                        compId: 51
                    },
                    {
                        type: "Sprite",
                        props: {
                            y: 0,
                            x: 0,
                            "var": "sp_box"
                        },
                        compId: 43,
                        child: [{
                            type: "Image",
                            props: {
                                y: 559,
                                x: 374,
                                width: 668,
                                "var": "imgBg",
                                skin: "imgs/win/guang_bg_3.png",
                                scaleY: 1.5,
                                scaleX: 1.5,
                                pivotY: 333,
                                pivotX: 334,
                                height: 665,
                                alpha: 1
                            },
                            compId: 15
                        },
                        {
                            type: "Image",
                            props: {
                                y: 40,
                                x: 13,
                                skin: "imgs/win/guang_bg_2.png",
                                scaleY: 4,
                                scaleX: 4
                            },
                            compId: 16
                        },
                        {
                            type: "Image",
                            props: {
                                y: 298,
                                x: 124,
                                width: 504,
                                skin: "imgs/panel/levelupUi_di_1.png",
                                sizeGrid: "68,86,62,44",
                                height: 736
                            },
                            compId: 9
                        },
                        {
                            type: "Image",
                            props: {
                                y: 298,
                                x: 137,
                                width: 478,
                                skin: "imgs/panel/Pop-upsui_bg_2.png",
                                sizeGrid: "68,86,62,44",
                                height: 726
                            },
                            compId: 10
                        },
                        {
                            type: "Image",
                            props: {
                                y: 412,
                                x: 156,
                                width: 441,
                                skin: "imgs/panel/Pop-upsui_bg_4.png",
                                sizeGrid: "40,28,41,40",
                                height: 128
                            },
                            compId: 11
                        },
                        {
                            type: "Image",
                            props: {
                                y: 597,
                                x: 156,
                                width: 441,
                                skin: "imgs/panel/Pop-upsui_bg_4.png",
                                sizeGrid: "40,28,41,40",
                                height: 191
                            },
                            compId: 12
                        },
                        {
                            type: "Image",
                            props: {
                                y: 145,
                                x: 193,
                                skin: "imgs/win/guang_bg_1.png"
                            },
                            compId: 14
                        },
                        {
                            type: "Image",
                            props: {
                                y: 116,
                                x: 84,
                                skin: "imgs/win/win.png"
                            },
                            compId: 13
                        },
                        {
                            type: "Image",
                            props: {
                                y: 373,
                                x: 305,
                                skin: "imgs/win/guoguan_bg_3.png"
                            },
                            compId: 17,
                            child: [{
                                type: "Label",
                                props: {
                                    y: 7,
                                    x: 24,
                                    text: "Result",
                                    fontSize: 24,
                                    font: "SimHei",
                                    color: "#ffffff"
                                },
                                compId: 18
                            }]
                        },
                        {
                            type: "Image",
                            props: {
                                y: 558,
                                x: 303,
                                skin: "imgs/win/guoguan_bg_3.png"
                            },
                            compId: 19,
                            child: [{
                                type: "Label",
                                props: {
                                    y: 7,
                                    x: 24,
                                    text: "Prize",
                                    fontSize: 24,
                                    font: "SimHei",
                                    color: "#ffffff"
                                },
                                compId: 20
                            }]
                        },
                        {
                            type: "Image",
                            props: {
                                y: 465,
                                x: 245,
                                width: 126,
                                skin: "imgs/win/guoguan_bg_5.png",
                                sizeGrid: "11,34,12,52",
                                scaleY: .85,
                                scaleX: .85,
                                height: 38
                            },
                            compId: 26
                        },
                        {
                            type: "Image",
                            props: {
                                y: 465,
                                x: 458,
                                width: 137,
                                skin: "imgs/win/guoguan_bg_5.png",
                                sizeGrid: "11,34,12,52",
                                scaleY: .85,
                                scaleX: .85,
                                height: 38
                            },
                            compId: 27
                        },
                        {
                            type: "Image",
                            props: {
                                y: 443,
                                x: 178,
                                skin: "imgs/panel/block.png",
                                scaleY: .85,
                                scaleX: .85
                            },
                            compId: 21
                        },
                        {
                            type: "Image",
                            props: {
                                y: 436,
                                x: 381,
                                skin: "imgs/panel/redblock.png"
                            },
                            compId: 22
                        },
                        {
                            type: "Image",
                            props: {
                                y: 614,
                                x: 243,
                                width: 120,
                                "var": "imgGold",
                                skin: "imgs/win/hexin_bg.png",
                                height: 109
                            },
                            compId: 45,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 21,
                                    x: 29,
                                    skin: "imgs/panel/goldUI_1.png",
                                    scaleY: .8,
                                    scaleX: .8,
                                    name: "gold"
                                },
                                compId: 47
                            },
                            {
                                type: "Label",
                                props: {
                                    y: 85,
                                    x: 3,
                                    width: 114,
                                    "var": "labGold",
                                    text: "100",
                                    height: 24,
                                    fontSize: 24,
                                    font: "SimHei",
                                    color: "#ffffff",
                                    bold: !0,
                                    align: "center"
                                },
                                compId: 46
                            },
                            {
                                type: "Image",
                                props: {
                                    y: 124,
                                    x: 0,
                                    width: 120,
                                    skin: "imgs/win/guoguan_bg_4.png",
                                    height: 39
                                },
                                compId: 49,
                                child: [{
                                    type: "Label",
                                    props: {
                                        y: 6,
                                        x: 36,
                                        width: 48,
                                        text: "Coin",
                                        height: 28,
                                        fontSize: 24,
                                        color: "#ffffff",
                                        align: "center"
                                    },
                                    compId: 50
                                }]
                            }]
                        },
                        {
                            type: "Image",
                            props: {
                                y: 614,
                                x: 387,
                                "var": "imgGift",
                                skin: "imgs/win/hexin_bg.png"
                            },
                            compId: 28,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 25,
                                    x: 32,
                                    "var": "imgGiftIcon",
                                    skin: "imgs/gift/kejiui_hexin_1.png"
                                },
                                compId: 48
                            },
                            {
                                type: "Label",
                                props: {
                                    y: 85,
                                    x: 3,
                                    width: 114,
                                    "var": "labLV",
                                    text: "Lv:5",
                                    height: 24,
                                    fontSize: 24,
                                    font: "SimHei",
                                    color: "#ffffff",
                                    bold: !0,
                                    align: "center"
                                },
                                compId: 44
                            },
                            {
                                type: "Image",
                                props: {
                                    y: 124,
                                    x: -.5,
                                    width: 120,
                                    skin: "imgs/win/guoguan_bg_4.png",
                                    height: 39
                                },
                                compId: 23,
                                child: [{
                                    type: "Label",
                                    props: {
                                        y: 6,
                                        x: 36,
                                        width: 48,
                                        "var": "labQuality",
                                        text: "SSR",
                                        height: 28,
                                        fontSize: 24,
                                        color: "#ffffff",
                                        align: "center"
                                    },
                                    compId: 24
                                }]
                            },
                            {
                                type: "Image",
                                props: {
                                    y: -11,
                                    x: 97,
                                    "var": "btnHelp",
                                    skin: "imgs/win/wenhao_.png"
                                },
                                compId: 29
                            }]
                        },
                        {
                            type: "FontUI",
                            props: {
                                y: 470,
                                x: 302,
                                "var": "blockNum",
                                runtime: "ui.FontUIUI"
                            },
                            compId: 41
                        },
                        {
                            type: "FontUI",
                            props: {
                                y: 470,
                                x: 518,
                                "var": "redBlockNum",
                                runtime: "ui.FontUIUI"
                            },
                            compId: 42
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 892,
                                x: 375,
                                width: 280,
                                "var": "btn_surplusNum_video",
                                pivotY: 50,
                                pivotX: 140,
                                height: 100
                            },
                            compId: 32,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 0,
                                    x: 0,
                                    width: 280,
                                    skin: "imgs/panel/levelupUi_di_7.png",
                                    sizeGrid: "5,5,5,5",
                                    height: 100
                                },
                                compId: 34
                            },
                            {
                                type: "Text",
                                props: {
                                    y: 34,
                                    x: 117,
                                    text: "Get Again",
                                    fontSize: 32,
                                    font: "SimHei",
                                    color: "#ffffff",
                                    bold: !1,
                                    runtime: "laya.display.Text"
                                },
                                compId: 35
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 25,
                                    x: 32,
                                    texture: "imgs/panel/offlinerevUi_video.png"
                                },
                                compId: 52
                            }]
                        },
                        {
                            type: "Sprite",
                            props: {
                                y: 892,
                                x: 375,
                                width: 280,
                                "var": "btn_surplusNum_share",
                                pivotY: 50,
                                pivotX: 140,
                                height: 100
                            },
                            compId: 33,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 0,
                                    x: 0,
                                    width: 280,
                                    skin: "imgs/panel/levelupUi_di_7.png",
                                    sizeGrid: "5,5,5,5",
                                    height: 100
                                },
                                compId: 37
                            },
                            {
                                type: "Text",
                                props: {
                                    y: 34,
                                    x: 118,
                                    text: "Get Again",
                                    fontSize: 32,
                                    font: "SimHei",
                                    color: "#ffffff",
                                    bold: !1,
                                    runtime: "laya.display.Text"
                                },
                                compId: 38
                            },
                            {
                                type: "Sprite",
                                props: {
                                    y: 25,
                                    x: 41,
                                    texture: "imgs/panel/offlinerevUi_share.png"
                                },
                                compId: 39
                            }]
                        },
                        {
                            type: "Label",
                            props: {
                                y: 1046,
                                x: 287,
                                width: 175,
                                "var": "label_close",
                                valign: "middle",
                                underline: !0,
                                text: "Give Up",
                                height: 50,
                                fontSize: 32,
                                font: "SimHei",
                                color: "#bebebe",
                                align: "center"
                            },
                            compId: 40
                        }]
                    }],
                    loadList: ["imgs/bg/blackBg.png", "imgs/win/guang_bg_3.png", "imgs/win/guang_bg_2.png", "imgs/panel/levelupUi_di_1.png", "imgs/panel/Pop-upsui_bg_2.png", "imgs/panel/Pop-upsui_bg_4.png", "imgs/win/guang_bg_1.png", "imgs/win/win.png", "imgs/win/guoguan_bg_3.png", "imgs/win/guoguan_bg_5.png", "imgs/panel/block.png", "imgs/panel/redblock.png", "imgs/win/hexin_bg.png", "imgs/panel/goldUI_1.png", "imgs/win/guoguan_bg_4.png", "imgs/gift/kejiui_hexin_1.png", "imgs/win/wenhao_.png", "imgs/panel/levelupUi_di_7.png", "imgs/panel/offlinerevUi_video.png", "imgs/panel/offlinerevUi_share.png"],
                    loadList3D: []
                },
                t
            } (n);
            e.WinDialogUI = w,
            l("ui.WinDialogUI", w)
        } (a = i.ui || (i.ui = {}))
    },{}]},{},[2]);