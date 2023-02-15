class IPlatform {
    filePath() {
        return "";
    }
    getStorageSync(key) { }
    ;
    setStorageSync(key, value) { }
    ;
    getFileSystemManager() {
        return {};
    }
    ;
    downloadFile(object) {
        return {};
    }
    ;
    showReward(success, failure) { };
    showInterstitial(complete) {};
    getForgames() {
        return [];
    }
    navigate(screenName, buttonName, gameId) { }
    ;
}

var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        var views;
        (function (views) {
            class popUI extends Laya.Dialog {
                constructor() {
                    super();
                }
                createChildren() {
                    super.createChildren();
                    this.createView(popUI.uiView);
                }
            }
            popUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "compId": 2, "child": [
                { "type": "Image", "props": { "x": 25, "width": 700, 
                "skin": "ui_res/back_frame4.png", "sizeGrid": "41,36,37,45", "height": 103, "centerY": -100 }, "compId": 18, "child": [{ "type": "Label", "props": { "wordWrap": true, "valign": "middle", "top": 10, "text": "Failed to get the reward, please watch the ads to the end.", "right": 20, "left": 20, "fontSize": 30, "bottom": 10, "align": "center" }, "compId": 19 }] }], "loadList": ["loading/bg.png", "loading/wenzi.png", "loading/icon_logo.png", "loading/load_progress.png", "loading/load_progress$bar.png", "ui/common/gradeBg.png"], "loadList3D": [] };
            views.popUI = popUI;
            REG("ui.views.popUI", popUI);
        })(views = ui.views || (ui.views = {}));
    })(ui || (ui = {}));

class popup extends ui.views.popUI {
    onAwake() {
        Laya.timer.once(2.0e3, this, this.close);
    }
}

class WebPlatform extends IPlatform {
    constructor() {
        super();
        this.navigateActive = false;
        let canvas = document.getElementById("layaCanvas");
        canvas && canvas.addEventListener("mouseup", () => {
            if (this.navigateActive) {
                this.navigateActive = false;
                YYGSDK.navigate(this._screenName, this._buttonName, this._gameId);
            }
        });
        canvas && canvas.addEventListener("touchend", () => {
            if (this.navigateActive) {
                this.navigateActive = false;
                YYGSDK.navigate(this._screenName, this._buttonName, this._gameId);
            }
        });
    }
    navigate(screenName, buttonName, gameId) {
        if (this.navigateActive === false) {
            this.navigateActive = true;
            this._screenName = screenName;
            this._buttonName = buttonName;
            this._gameId = gameId;
        }
    }
    showInterstitial(complete) {
        let needresume = false
        if(!Laya.SoundManager.muted){
            needresume = true;
            Laya.SoundManager.muted = true;
        }
        YYGSDK.showInterstitial(()=>{
            if(needresume){
                Laya.SoundManager.muted = false;
            }
            complete && complete();
        });
    }
    getStorageSync(key) {
        let v = Laya.LocalStorage.getItem(key);
        return JSON.parse(v);
    }
    setStorageSync(key, value) {
        return Laya.LocalStorage.setItem(key, JSON.stringify(value));
    }
    showReward(success, failure) {
        let needresume = false
        if(!Laya.SoundManager.muted){
            needresume = true;
            Laya.SoundManager.muted = true;
        }
        YYGSDK.adsManager.request(YYG.TYPE.REWARD, YYG.EventHandler.create(this, () => {
            if(needresume){
                Laya.SoundManager.muted = false;
            }
            success && success();
        }), YYG.EventHandler.create(this, (event) => {
            if(needresume){
                Laya.SoundManager.muted = false;
            }
            if (failure) {
                failure();
            }
            else {
                if (event == YYG.Event.AD_SKIPPED) {
                    new popup().popup();
                }
            }
        }));
    }
    getForgames() {
        let forgames = YYGSDK.forgames;
        forgames.sort(function (a, b) {
            return Math.random() - 0.5;
        });
        return forgames;
    }
    showLoading(title) { }
    hideLoading() { }
}

class platform {
    static _init_() {
        this._platform = new WebPlatform();
    }
    static getInstance() {
        if (!this._platform) {
            this._init_();
        }
        return this._platform;
    }
}
platform._platform = null;
window["platform"] = platform;
    
!function() {
    "use strict";
    class LocalData {
        static _getKey(key) {
            return key;
        }
        static setItem(key, value) {
            key = LocalData._getKey(key), Laya.LocalStorage.setJSON(key, value);
        }
        static getItem(key, defaultValue = null) {
            key = LocalData._getKey(key);
            let storageData = Laya.LocalStorage.getJSON(key);
            return null !== storageData && "" !== storageData && void 0 !== storageData || (storageData = defaultValue), 
            storageData;
        }
        static removeItem(key) {
            key = LocalData._getKey(key), Laya.LocalStorage.removeItem(key);
        }
        static clear() {
            Laya.LocalStorage.clear();
        }
    }
    class DailyReset {
        static getResetTimeStamp(hour) {
            let date = new Date(new Date().setHours(hour, 0, 0, 0)), nextTimeStamp = date.getTime();
            return nextTimeStamp < new Date().getTime() && (date.setDate(date.getDate() + 1), 
            nextTimeStamp = date.getTime()), nextTimeStamp;
        }
        static load(key, defaultValue, hour = 0) {
            let nextTimeStamp = DailyReset.getResetTimeStamp(hour);
            defaultValue = Object.assign({
                resetTimeStamp: nextTimeStamp
            }, defaultValue);
            let storageData = LocalData.getItem(key, defaultValue);
            return void 0 === storageData.resetTimeStamp || storageData.resetTimeStamp < new Date().getTime() ? defaultValue : storageData;
        }
        static save(key, data, hour = 0) {
            let nextTimeStamp = DailyReset.getResetTimeStamp(hour), toSave = Object.assign({
                resetTimeStamp: nextTimeStamp
            }, data);
            LocalData.setItem(key, toSave);
        }
    }
    const defaultPlayerData = {
        money: 0,
        key: 0,
        level: 1,
        power: 20,
        highestLevelExpire: 0,
        usingSkinId: "DefaultBall",
        unlockSkins: {
            DefaultBall: !0
        },
        skinUnlockStep: {}
    }, WX_APP_ID = "wx853eb11fe54b4e71", 
        WX_BANNER_AD_ID = [ "adunit-b91aba3f92138119", "adunit-eb78a8a5b5b2b1d8", "adunit-77f1e9ab48cf16f6", "adunit-04966b0e0fdfe65a", "adunit-4db09f0f69fbc902" ], WX_INTERSTITIAL_AD_ID = "adunit-cae96fbe3256ee8d", WX_VIDEO_AD_ID_SHORT = "adunit-1cf222482e2adb3e", WX_VIDEO_AD_ID_LONG = "adunit-8db04be988c37fa9", WX_GAME_ICON_ID = "PBgAA-AnSUBZWfkU", WX_GAME_BANNER_ID = [ "PBgAA-AnSUBQJ2yw", "PBgAA-AnSUBfLSuQ" ], WX_DEFAULT_SHARE_INFO = {
        title: "看我大力香蕉球，划出完美弧线！",
        imageUrl: "",
        imageUrlId: "LWq42uCNRlqcpkIzk566RQ"
    }, OPPO_APP_ID = "30221544", OPPO_BANNER_AD_ID = [ "140340", "141959" ], OPPO_NATIVE_AD_ID = [ "140344", "140345" ], OPPO_INTERSTITIAL_AD_ID = "140346", OPPO_VIDEO_AD_ID = "140343", VERSION = "1.3.0", IS_DEBUG = !1, SAVE_DATA_KEY = "gameData_crazyKick";
    let _REMOTE_SERVER_ROOT = "", _REMOTE_LOAD_DIRECTORY = [], _REMOTE_SETTINGS_FILE_URL = "", _CITY_BANNER_CASUAL_BLOCK_URL = "", _ALL_SUBPACKAGES = [], _PRELOAD_SUBPACKAGES = [];
    "undefined" != typeof wx ? (_REMOTE_SERVER_ROOT = "", 
    _REMOTE_LOAD_DIRECTORY = [], _REMOTE_SETTINGS_FILE_URL = "", 
    _CITY_BANNER_CASUAL_BLOCK_URL = "", _ALL_SUBPACKAGES = [ "engineLibs", "commonRes3D", "res3d_01", "res3d_02" ], 
    _PRELOAD_SUBPACKAGES = [ "commonRes3D", "res3d_01" ]) : "undefined" != typeof qg && (_REMOTE_SERVER_ROOT = "", 
    _REMOTE_LOAD_DIRECTORY = [], _REMOTE_SETTINGS_FILE_URL = "", 
    _CITY_BANNER_CASUAL_BLOCK_URL = "", 
    _ALL_SUBPACKAGES = [], _PRELOAD_SUBPACKAGES = []);
    const REMOTE_SERVER_ROOT = _REMOTE_SERVER_ROOT, REMOTE_LOAD_DIRECTORY = _REMOTE_LOAD_DIRECTORY, REMOTE_SETTINGS_FILE_URL = _REMOTE_SETTINGS_FILE_URL, CITY_BANNER_CASUAL_BLOCK_URL = _CITY_BANNER_CASUAL_BLOCK_URL, ALL_SUBPACKAGES = _ALL_SUBPACKAGES, PRELOAD_SUBPACKAGES = _PRELOAD_SUBPACKAGES;
    class EventManager {
        static registerEvent(eventID, callback, target, weight = 0, source) {
            if ("string" == typeof callback && !target[callback]) return void console.error("无效的监听函数, 请检查", eventID, target, callback);
            let tempData = this._eventData[eventID] || [];
            for (let i = 0; i < tempData.length; i++) {
                if (tempData[i].target === target) return;
            }
            tempData.push({
                target: target,
                callback: callback,
                weight: weight,
                source: source
            }), tempData.sort(function(eventA, eventB) {
                let a = eventA.weight, b = eventB.weight;
                return a < b ? -1 : a > b ? 1 : a === b ? 0 : void 0;
            }), this._eventData[eventID] = tempData;
        }
        static dispatchEvent(eventID, eventData, source) {
            let tempData = this._eventData[eventID] || [];
            for (let i = tempData.length - 1; i >= 0; i--) {
                let event = tempData[i], callback = event.callback, target = event.target;
                event.source && event.source !== source || ("string" == typeof callback ? target[callback](eventData) : callback.call(target, eventData));
            }
        }
        static releaseEvent(target, eventID = null) {
            if (null === eventID) for (let eventName in this._eventData) {
                let eventList = this._eventData[eventName];
                if (eventList) for (let i = 0; i < eventList.length; i++) {
                    if (eventList[i].target === target) {
                        eventList.splice(i, 1);
                        break;
                    }
                }
            } else {
                let eventList = this._eventData[eventID];
                if (!eventList) return;
                for (let i = 0; i < eventList.length; i++) {
                    if (eventList[i].target === target) {
                        eventList.splice(i, 1);
                        break;
                    }
                }
            }
        }
        static releaseAllEvents(target) {
            this.releaseEvent(target, null);
        }
    }
    EventManager._eventData = {};
    const CommonEvents = {
        GAME_ON_SHOW: "GAME_ON_SHOW",
        GAME_ON_HIDE: "GAME_ON_HIDE",
        SET_NET_DATA: "SET_NET_DATA",
        GAME_IS_READY: "GAME_IS_READY",
        ON_CUSTOMER_SERVICE_SUCCESS: "ON_CUSTOMER_SERVICE_SUCCESS",
        ADDED_TO_MY_MINI_GAME: "ADDED_TO_MY_MINI_GAME",
        TUTORIAL_START: "TUTORIAL_START",
        TUTORIAL_ALL_STEP_COMPLETED: "TUTORIAL_ALL_STEP_COMPLETED",
        TUTORIAL_SHOW_GUIDE_HOTSPOT: "TUTORIAL_SHOW_GUIDE_HOTSPOT",
        TUTORIAL_HIDE_GUIDE_HOTSPOT: "TUTORIAL_HIDE_GUIDE_HOTSPOT",
        TUTORIAL_BEGIN_STEP: "TUTORIAL_BEGIN_STEP",
        TUTORIAL_END_STEP: "TUTORIAL_END_STEP",
        SHOW_SUB_DOMAIN: "SHOW_SUB_DOMAIN",
        HIDE_SUB_DOMAIN: "HIDE_SUB_DOMAIN",
        AUTO_UPDATE_SUB_DOMAIN: "AUTO_UPDATE_SUB_DOMAIN",
        UPDATE_SUB_DOMAIN: "UPDATE_SUB_DOMAIN",
        USER_INFO_UPDATED: "USER_INFO_UPDATED"
    };
    class PlayerDataBase {
        static get userInfo() {
            return this._userInfo;
        }
        static get gameData() {
            return this._gameData;
        }
        static get userId() {
            return this._userId;
        }
        static get shareAward() {
            return this._shareAward;
        }
        static setNetData(netData) {
            console.log("setNetData", netData), void 0 !== netData.userInfo && this.applyUserInfo(netData.userInfo), 
            void 0 !== netData.gameData && (this._gameData = netData.gameData), void 0 !== netData.shareAward && (this._shareAward = netData.shareAward), 
            void 0 !== netData.createTime && (this._userInfo.createdAt = netData.createTime), 
            EventManager.dispatchEvent(CommonEvents.SET_NET_DATA);
        }
        static saveData(isExit = !1) {
            LocalData.setItem(SAVE_DATA_KEY, this._gameData), isExit && console.log("saveData", this._gameData);
        }
        static applyUserInfo(userInfo) {
            if (userInfo) {
                for (let key in userInfo) userInfo.hasOwnProperty(key) && (this.userInfo[key] = userInfo[key]);
                void 0 !== this._userInfo.id && this.setUserId(this.userInfo.id), EventManager.dispatchEvent(CommonEvents.USER_INFO_UPDATED);
            } else this.setUserId("no_user_id");
        }
        static setUserId(userId) {
            this._userId = userId;
        }
        static saveExitTime() {
            LocalData.setItem("exitTime", new Date().getTime());
        }
        static getExitTime() {
            return LocalData.getItem("exitTime");
        }
        static getNextMonday() {
            let d = new Date();
            return d.setDate(d.getDate() + (8 - d.getDay()) % 7), d.setHours(0, 0, 0, 0), d.getTime();
        }
        static getGameDataItem(itemKey, defaultValue = null) {
            return void 0 !== this._gameData[itemKey] ? this._gameData[itemKey] : defaultValue;
        }
        static setGameDataItem(itemKey, value, save = !1) {
            this._gameData[itemKey] = value, save && this.saveData();
        }
    }
    PlayerDataBase._userInfo = {
        id: null,
        avatarUrl: "",
        nickName: "",
        province: "",
        city: "",
        gender: "",
        createdAt: void 0,
        yesterdayInvitedCount: 0
    }, PlayerDataBase._gameData = defaultPlayerData, PlayerDataBase._userId = null, 
    PlayerDataBase._shareAward = {};
    var ui, REG = Laya.ClassUtils.regClass;
    !function(ui) {
        !function(anim) {
            class buttonDownScaleUI extends Laya.EffectAnimation {
                constructor() {
                    super(), this.effectData = ui.anim.buttonDownScaleUI.uiView;
                }
            }
            buttonDownScaleUI.uiView = {
                type: "View",
                props: {},
                compId: 2,
                animations: [ {
                    nodes: [ {
                        target: 2,
                        keyframes: {
                            scaleY: [ {
                                value: 1,
                                tweenMethod: "linearNone",
                                tween: !0,
                                target: 2,
                                key: "scaleY",
                                index: 0
                            }, {
                                value: 1.05,
                                tweenMethod: "linearNone",
                                tween: !0,
                                target: 2,
                                key: "scaleY",
                                index: 3
                            } ],
                            scaleX: [ {
                                value: 1,
                                tweenMethod: "linearNone",
                                tween: !0,
                                target: 2,
                                key: "scaleX",
                                index: 0
                            }, {
                                value: 1.05,
                                tweenMethod: "linearNone",
                                tween: !0,
                                target: 2,
                                key: "scaleX",
                                index: 3
                            } ]
                        }
                    } ],
                    name: "ani1",
                    id: 1,
                    frameRate: 24,
                    action: 0
                } ],
                loadList: [],
                loadList3D: []
            }, anim.buttonDownScaleUI = buttonDownScaleUI, REG("ui.anim.buttonDownScaleUI", buttonDownScaleUI);
            class buttonUpScaleUI extends Laya.EffectAnimation {
                constructor() {
                    super(), this.effectData = ui.anim.buttonUpScaleUI.uiView;
                }
            }
            buttonUpScaleUI.uiView = {
                type: "View",
                props: {},
                compId: 2,
                animations: [ {
                    nodes: [ {
                        target: 2,
                        keyframes: {
                            scaleY: [ {
                                value: 1.05,
                                tweenMethod: "linearNone",
                                tween: !0,
                                target: 2,
                                key: "scaleY",
                                index: 0
                            }, {
                                value: 1,
                                tweenMethod: "linearNone",
                                tween: !0,
                                target: 2,
                                key: "scaleY",
                                index: 3
                            } ],
                            scaleX: [ {
                                value: 1.05,
                                tweenMethod: "linearNone",
                                tween: !0,
                                target: 2,
                                key: "scaleX",
                                index: 0
                            }, {
                                value: 1,
                                tweenMethod: "linearNone",
                                tween: !0,
                                target: 2,
                                key: "scaleX",
                                index: 3
                            } ]
                        }
                    } ],
                    name: "ani1",
                    id: 1,
                    frameRate: 24,
                    action: 0
                } ],
                loadList: [],
                loadList3D: []
            }, anim.buttonUpScaleUI = buttonUpScaleUI, REG("ui.anim.buttonUpScaleUI", buttonUpScaleUI);
        }(ui.anim || (ui.anim = {}));
    }(ui || (ui = {})), function(ui) {
        !function(dialogs) {
            class NotEnoughCoinDialogUI extends Laya.Dialog {
                constructor() {
                    super();
                }
                createChildren() {
                    super.createChildren(), this.createView(NotEnoughCoinDialogUI.uiView);
                }
            }
            NotEnoughCoinDialogUI.uiView = {
                type: "Dialog",
                props: {
                    y: 0,
                    x: 0,
                    runtime: "script/Views/NotEnoughCoinDialog.ts"
                },
                compId: 2,
                child: [ {
                    type: "Image",
                    props: {
                        width: 500,
                        skin: "ui_res/back_lack.png",
                        sizeGrid: "96,47,68,47",
                        name: "Window",
                        height: 554,
                        centerY: 0,
                        centerX: 0
                    },
                    compId: 3,
                    child: [ {
                        type: "Button",
                        props: {
                            x: 100,
                            width: 350,
                            var: "watchAdAddCoinButton",
                            skin: "ui_res/BTN_Retry.png",
                            name: "WatchAdAddCoinButton",
                            labelSize: 50,
                            height: 100,
                            centerX: 0,
                            bottom: 40,
                            stateNum: 1,
                            sizeGrid: "39,30,42,27",
                            labelColors: "#fff,#fff,#fff"
                        },
                        compId: 5,
                        child: [ {
                            type: "Sprite",
                            props: {
                                y: 25,
                                x: 38,
                                texture: "ui_res/Ico_SkipLevel.png",
                                scaleY: .75,
                                scaleX: .75,
                                name: "Icon"
                            },
                            compId: 11
                        }, {
                            type: "Label",
                            props: {
                                y: 26,
                                x: 111,
                                valign: "middle",
                                text: "Get coins",
                                fontSize: 40,
                                color: "#fff",
                                bold: !0,
                                align: "center"
                            },
                            compId: 12
                        } ]
                    }, {
                        type: "Image",
                        props: {
                            y: 269,
                            x: 301,
                            var: "chestIcon",
                            skin: "ui_res/icon_chest2.png",
                            scaleY: .6,
                            scaleX: .6,
                            name: "Icon",
                            centerY: -70,
                            centerX: 0,
                            anchorY: .5,
                            anchorX: .5
                        },
                        compId: 9
                    }, {
                        type: "Button",
                        props: {
                            var: "closeButton",
                            top: -20,
                            stateNum: 1,
                            skin: "ui_res/btn_1.png",
                            right: -44,
                            name: "CloseButton"
                        },
                        compId: 10
                    }, {
                        type: "Image",
                        props: {
                            y: 317,
                            x: 336,
                            var: "coinImage",
                            skin: "ui_res/icon_gold.png",
                            scaleY: .6,
                            scaleX: .6
                        },
                        compId: 14
                    }, {
                        type: "Label",
                        props: {
                            y: 322,
                            x: 171.16455078125,
                            var: "coinAmount",
                            text: "+500",
                            name: "CoinAmount",
                            fontSize: 70,
                            color: "#6e4200",
                            bold: !0
                        },
                        compId: 13
                    }, {
                        type: "Label",
                        props: {
                            y: -3,
                            x: 140,
                            valign: "middle",
                            top: 20,
                           
                            text: "Coin is not enough!",
                            name: "TitleLabel",
                            fontSize: 42,
                            color: "#fff",
                            centerX: 0,
                            bold: !0,
                            align: "center"
                        },
                        compId: 7
                    }, {
                        type: "Box",
                        props: {
                            y: 0,
                            x: 0,
                            width: 600,
                            name: "BannerAd",
                            height: 180,
                            centerX: 0,
                            bottom: -200,
                            bgColor: "#00b707"
                        },
                        compId: 199
                    } ]
                }, {
                    type: "Script",
                    props: {
                        refNode: "@node:199",
                        posType: "refNode",
                        runtime: "framework/UIComponents/BannerAdComponent.ts"
                    },
                    compId: 201
                } ],
                loadList: [ "ui_res/back_lack.png", "ui_res/BTN_Retry.png", "ui_res/Ico_SkipLevel.png", "ui_res/icon_chest2.png", "ui_res/btn_1.png", "ui_res/icon_gold.png" ],
                loadList3D: []
            }, dialogs.NotEnoughCoinDialogUI = NotEnoughCoinDialogUI, REG("ui.dialogs.NotEnoughCoinDialogUI", NotEnoughCoinDialogUI);
            class NotEnoughPowerDialogUI extends Laya.Dialog {
                constructor() {
                    super();
                }
                createChildren() {
                    super.createChildren(), this.createView(NotEnoughPowerDialogUI.uiView);
                }
            }
            NotEnoughPowerDialogUI.uiView = {
                type: "Dialog",
                props: {
                    y: 0,
                    x: 0,
                    runtime: "script/Views/NotEnoughPowerDialog.ts"
                },
                compId: 2,
                child: [ {
                    type: "Image",
                    props: {
                        width: 500,
                        skin: "ui_res/back_lack.png",
                        sizeGrid: "96,47,68,47",
                        name: "Window",
                        height: 600,
                        centerY: 0,
                        centerX: 0
                    },
                    compId: 3,
                    child: [ {
                        type: "Button",
                        props: {
                            width: 350,
                            var: "watchAdAddPowerButton",
                            skin: "ui_res/BTN_Retry.png",
                            name: "WatchAdAddPowerButton",
                            labelSize: 50,
                            height: 100,
                            centerX: 0,
                            bottom: 18,
                            stateNum: 1,
                            sizeGrid: "39,30,42,27",
                            labelColors: "#fff,#fff,#fff"
                        },
                        compId: 5,
                        child: [ {
                            type: "Sprite",
                            props: {
                                y: 25,
                                x: 38,
                                texture: "ui_res/Ico_SkipLevel.png",
                                scaleY: .75,
                                scaleX: .75,
                                name: "Icon"
                            },
                            compId: 11
                        }, {
                            type: "Label",
                            props: {
                                y: 27,
                                x: 111,
                                valign: "middle",
                                text: "Watch ads",
                                fontSize: 40,
                                color: "#fff",
                                bold: !0,
                                align: "center"
                            },
                            compId: 12
                        } ]
                    }, {
                        type: "Image",
                        props: {
                            var: "chestIcon",
                            skin: "ui_res/icon_nengliang.png",
                            scaleY: 1,
                            scaleX: 1,
                            name: "Icon",
                            centerY: -35,
                            centerX: 0,
                            anchorY: .5,
                            anchorX: .5
                        },
                        compId: 9
                    }, {
                        type: "Button",
                        props: {
                            var: "closeButton",
                            top: -20,
                            stateNum: 1,
                            skin: "ui_res/btn_1.png",
                            right: -44,
                            name: "CloseButton"
                        },
                        compId: 10
                    }, {
                        type: "Label",
                        props: {
                            y: 427,
                            valign: "middle",
                            text: "Watch ads to get extra strength",
                            name: "DescLabel",
                            fontSize: 30,
                            color: "#6e4200",
                            centerX: 0,
                            bold: !0,
                            align: "center"
                        },
                        compId: 13
                    }, {
                        type: "Label",
                        props: {
                            y: -3,
                            x: 140,
                            valign: "middle",
                            top: 20,
                            text: "",
                            name: "TitleLabel",
                            fontSize: 50,
                            color: "#fff",
                            centerX: 0,
                            bold: !0,
                            align: "center"
                        },
                        compId: 7
                    }, {
                        type: "Box",
                        props: {
                            y: 0,
                            x: 0,
                            width: 600,
                            name: "BannerAd",
                            height: 180,
                            centerX: 0,
                            bottom: -200,
                            bgColor: "#00b707"
                        },
                        compId: 199
                    } ]
                }, {
                    type: "Script",
                    props: {
                        refNode: "@node:199",
                        posType: "refNode",
                        runtime: "framework/UIComponents/BannerAdComponent.ts"
                    },
                    compId: 201
                } ],
                loadList: [ "ui_res/back_lack.png", "ui_res/BTN_Retry.png", "ui_res/Ico_SkipLevel.png", "ui_res/icon_nengliang.png", "ui_res/btn_1.png" ],
                loadList3D: []
            }, dialogs.NotEnoughPowerDialogUI = NotEnoughPowerDialogUI, REG("ui.dialogs.NotEnoughPowerDialogUI", NotEnoughPowerDialogUI);
            class SkinTryoutDialogUI extends Laya.Dialog {
                constructor() {
                    super();
                }
                createChildren() {
                    super.createChildren(), this.createView(SkinTryoutDialogUI.uiView);
                }
            }
            SkinTryoutDialogUI.uiView = {
                type: "Dialog",
                props: {},
                compId: 2,
                child: [ {
                    type: "Image",
                    props: {
                        width: 500,
                        skin: "ui_res/back_reward.png",
                        sizeGrid: "49,47,68,47",
                        name: "Window",
                        height: 450,
                        centerY: 0,
                        centerX: 0
                    },
                    compId: 3,
                    child: [ {
                        type: "Button",
                        props: {
                            x: 100,
                            width: 350,
                            var: "tryoutButton",
                            skin: "ui_res/BTN_Retry.png",
                            name: "TryoutButton",
                            labelSize: 50,
                            height: 100,
                            centerX: 0,
                            bottom: 40,
                            stateNum: 1,
                            sizeGrid: "39,30,42,27",
                            labelColors: "#fff,#fff,#fff"
                        },
                        compId: 5,
                        child: [ {
                            type: "Sprite",
                            props: {
                                y: 28,
                                x: 28,
                                texture: "ui_res/Ico_SkipLevel.png",
                                scaleY: .75,
                                scaleX: .75,
                                name: "Icon"
                            },
                            compId: 12
                        }, {
                            type: "Label",
                            props: {
                                x: 108,
                                valign: "middle",
                                text: "Try it now",
                                fontSize: 50,
                                color: "#fff",
                                centerY: 0,
                                bold: !1,
                                align: "center"
                            },
                            compId: 13
                        } ]
                    }, {
                        type: "Box",
                        props: {
                            var: "previewRoot",
                            name: "PreviewRoot",
                            centerY: -30,
                            centerX: 0
                        },
                        compId: 6
                    }, {
                        type: "Label",
                        props: {
                            valign: "middle",
                            top: 42,
                            text: "Try out this skin ?",
                            fontSize: 45,
                            color: "#fff",
                            centerX: 0,
                            bold: !0,
                            align: "center"
                        },
                        compId: 7
                    }, {
                        type: "Box",
                        props: {
                            width: 600,
                            name: "BannerAd",
                            height: 180,
                            centerX: 0,
                            bottom: -282,
                            bgColor: "#00b707"
                        },
                        compId: 9
                    }, {
                        type: "Button",
                        props: {
                            width: 350,
                            var: "continueButton",
                            stateNum: 1,
                            name: "ContinueButton",
                            labelSize: "30",
                            labelColors: "#fff,#fff,#fff",
                            labelBold: !0,
                            height: 80,
                            centerX: 0,
                            bottom: -97,
                            anchorY: .5,
                            anchorX: .5
                        },
                        compId: 14,
                        child: [ {
                            type: "Label",
                            props: {
                                valign: "middle",
                                underline: !0,
                                text: "Skip",
                                fontSize: 40,
                                color: "#ffffff",
                                centerY: 0,
                                centerX: 0,
                                bold: !0,
                                align: "center"
                            },
                            compId: 16
                        } ]
                    } ]
                }, {
                    type: "Script",
                    props: {
                        refNode: "@node:9",
                        posType: "refNode",
                        runtime: "framework/UIComponents/BannerAdComponent.ts"
                    },
                    compId: 11
                } ],
                loadList: [ "ui_res/back_reward.png", "ui_res/BTN_Retry.png", "ui_res/Ico_SkipLevel.png" ],
                loadList3D: []
            }, dialogs.SkinTryoutDialogUI = SkinTryoutDialogUI, REG("ui.dialogs.SkinTryoutDialogUI", SkinTryoutDialogUI);
            class SkinUnlockDialogUI extends Laya.Dialog {
                constructor() {
                    super();
                }
                createChildren() {
                    super.createChildren(), this.createView(SkinUnlockDialogUI.uiView);
                }
            }
            SkinUnlockDialogUI.uiView = {
                type: "Dialog",
                props: {},
                compId: 2,
                child: [ {
                    type: "Image",
                    props: {
                        width: 500,
                        skin: "ui_res/back_reward.png",
                        sizeGrid: "49,47,68,47",
                        name: "Window",
                        height: 450,
                        centerY: 0,
                        centerX: 0
                    },
                    compId: 3,
                    child: [ {
                        type: "Button",
                        props: {
                            x: 100,
                            width: 300,
                            var: "closeButton",
                            skin: "ui_res/BTN_Retry.png",
                            name: "CloseButton",
                            labelSize: 50,
                            label: "Use",
                            height: 100,
                            centerX: 0,
                            bottom: 40,
                            stateNum: 1,
                            sizeGrid: "39,30,42,27",
                            labelColors: "#fff,#fff,#fff"
                        },
                        compId: 5
                    }, {
                        type: "Box",
                        props: {
                            var: "previewRoot",
                            name: "PreviewRoot",
                            centerY: -30,
                            centerX: 0
                        },
                        compId: 6
                    }, {
                        type: "Label",
                        props: {
                            valign: "middle",
                            top: 42,
                            text: "New ball unlocked!",
                            fontSize: 45,
                            color: "#fff",
                            centerX: 0,
                            bold: !0,
                            align: "center"
                        },
                        compId: 7
                    }, {
                        type: "Box",
                        props: {
                            y: 0,
                            x: 0,
                            width: 600,
                            name: "BannerAd",
                            height: 180,
                            centerX: 0,
                            bottom: -195,
                            bgColor: "#00b707"
                        },
                        compId: 9
                    } ]
                }, {
                    type: "Script",
                    props: {
                        refNode: "@node:9",
                        posType: "refNode",
                        runtime: "framework/UIComponents/BannerAdComponent.ts"
                    },
                    compId: 11
                } ],
                loadList: [ "ui_res/back_reward.png", "ui_res/BTN_Retry.png" ],
                loadList3D: []
            }, dialogs.SkinUnlockDialogUI = SkinUnlockDialogUI, REG("ui.dialogs.SkinUnlockDialogUI", SkinUnlockDialogUI);
            class ToastUI extends Laya.Dialog {
                constructor() {
                    super();
                }
                createChildren() {
                    super.createChildren(), this.createView(ToastUI.uiView);
                }
            }
            ToastUI.uiView = {
                type: "Dialog",
                props: {},
                compId: 2,
                child: [ {
                    type: "Label",
                    props: {
                        wordWrap: !1,
                        var: "msgLabel",
                        valign: "middle",
                        underline: !1,
                        top: 300,
                        text: "ToastMsg",
                        padding: "15,35,15,35",
                        overflow: "visible",
                        fontSize: 45,
                        drawCallOptimize: !0,
                        color: "#ffffff",
                        centerX: 0,
                        bgColor: "#000000",
                        anchorY: .5,
                        anchorX: .5,
                        align: "center"
                    },
                    compId: 5
                } ],
                loadList: [],
                loadList3D: []
            }, dialogs.ToastUI = ToastUI, REG("ui.dialogs.ToastUI", ToastUI);
            class WaitingUI extends Laya.Dialog {
                constructor() {
                    super();
                }
                createChildren() {
                    super.createChildren(), this.createView(WaitingUI.uiView);
                }
            }
            WaitingUI.uiView = {
                type: "Dialog",
                props: {
                    width: 1136,
                    height: 640
                },
                compId: 2,
                child: [ {
                    type: "Image",
                    props: {
                        y: 298,
                        x: 546,
                        width: 120,
                        skin: "framework_res/square_bg_10px.png",
                        sizeGrid: "15,15,15,15",
                        name: "box",
                        height: 120,
                        centerY: 0,
                        centerX: 0
                    },
                    compId: 6,
                    child: [ {
                        type: "Image",
                        props: {
                            y: 75,
                            x: 75,
                            skin: "framework_res/buttonWaiting.png",
                            centerY: 0,
                            centerX: 0,
                            anchorY: .5,
                            anchorX: .5
                        },
                        compId: 4
                    } ]
                } ],
                animations: [ {
                    nodes: [ {
                        target: 4,
                        keyframes: {
                            rotation: [ {
                                value: 0,
                                tweenMethod: "linearNone",
                                tween: !0,
                                target: 4,
                                key: "rotation",
                                index: 0
                            }, {
                                value: 360,
                                tweenMethod: "linearNone",
                                tween: !0,
                                target: 4,
                                key: "rotation",
                                index: 80
                            } ]
                        }
                    } ],
                    name: "ani1",
                    id: 1,
                    frameRate: 24,
                    action: 2
                } ],
                loadList: [ "framework_res/square_bg_10px.png", "framework_res/buttonWaiting.png" ],
                loadList3D: []
            }, dialogs.WaitingUI = WaitingUI, REG("ui.dialogs.WaitingUI", WaitingUI);
        }(ui.dialogs || (ui.dialogs = {}));
    }(ui || (ui = {})), function(ui) {
        class LoadingSceneUI extends Laya.View {
            constructor() {
                super();
            }
            createChildren() {
                super.createChildren(), this.createView(LoadingSceneUI.uiView);
            }
        }
        LoadingSceneUI.uiView = {
            type: "View",
            props: {
                top: 0,
                right: 0,
                left: 0,
                bottom: 0
            },
            compId: 2,
            child: [ 
            {
                type: "Image",
                props: {
                    top: 0,
                    skin: "loading_res/yellowBlock.png",
                    sizeGrid: "1,1,1,1",
                    right: 0,
                    name: "Bg",
                    left: 0,
                    bottom: 0
                },
                compId: 3
            }, 
            {
                type: "Image",
                props: {
                    centerX: 0,
                    bottom:50,
                    skin: "loading_res/yad.png",
                    name: "yad",
                },
                compId: 50
            }, 
            {
                type: "Image",
                props: {
                    skin: "loading_res/TransitionBall.png",
                    name: "BallLogo",
                    centerY: 0,
                    centerX: 0
                },
                compId: 8
            }, 
            {
                type: "ProgressBar",
                props: {
                    width: 250,
                    var: "progressBar",
                    skin: "loading_res/progress.png",
                    centerY: 125,
                    centerX: 0
                },
                compId: 6,
                child: [ {
                    type: "Label",
                    props: {
                        var: "progressLabel",
                        text: "载入中...",
                        fontSize: 25,
                        color: "#6c4e00",
                        centerX: 0,
                        bottom: -40
                    },
                    compId: 7
                } ]
            } 
        ],
            loadList: [ "loading_res/yellowBlock.png", "loading_res/TransitionBall.png", "loading_res/progress.png" ,"loading_res/yad.png"],
            loadList3D: []
        }, ui.LoadingSceneUI = LoadingSceneUI, REG("ui.LoadingSceneUI", LoadingSceneUI);
    }(ui || (ui = {})), function(ui) {
        !function(Views) {
            class NativeAdBoxUI extends Laya.View {
                constructor() {
                    super();
                }
                createChildren() {
                    super.createChildren(), this.createView(NativeAdBoxUI.uiView);
                }
            }
            NativeAdBoxUI.uiView = {
                type: "View",
                props: {
                    y: 0,
                    x: 0,
                    width: 160,
                    height: 80
                },
                compId: 2,
                child: [ {
                    type: "Image",
                    props: {
                        var: "adImage",
                        top: 0,
                        right: 0,
                        name: "NativeAdBox",
                        left: 0,
                        bottom: 0
                    },
                    compId: 203,
                    child: [ {
                        type: "Image",
                        props: {
                            width: 83,
                            var: "adLogo",
                            scaleY: .5,
                            scaleX: .5,
                            right: 0,
                            name: "AdLogo",
                            height: 31,
                            bottom: 0
                        },
                        compId: 209
                    }, {
                        type: "Button",
                        props: {
                            y: 7,
                            x: 7,
                            width: 30,
                            var: "closeButton",
                            top: 7,
                            stateNum: 1,
                            skin: "framework_res/btn_close.png",
                            name: "CloseButton",
                            left: 7,
                            hitTestPrior: !0,
                            height: 30
                        },
                        compId: 10
                    }, {
                        type: "Label",
                        props: {
                            x: 250,
                            var: "titleLabel",
                            valign: "middle",
                            text: "广告标题",
                            name: "TitleLabel",
                            fontSize: 20,
                            color: "#7c7c7c",
                            centerX: 0,
                            bottom: 5,
                            bold: !1,
                            align: "center"
                        },
                        compId: 7
                    } ]
                } ],
                loadList: [ "framework_res/btn_close.png" ],
                loadList3D: []
            }, Views.NativeAdBoxUI = NativeAdBoxUI, REG("ui.Views.NativeAdBoxUI", NativeAdBoxUI);
            class NativeAdViewUI extends Laya.View {
                constructor() {
                    super();
                }
                createChildren() {
                    super.createChildren(), this.createView(NativeAdViewUI.uiView);
                }
            }
            NativeAdViewUI.uiView = {
                type: "View",
                props: {
                    y: 0,
                    x: 0,
                    top: 0,
                    runtime: "framework/NativeAdView.ts",
                    right: 0,
                    left: 0,
                    bottom: 0
                },
                compId: 2,
                child: [ {
                    type: "Box",
                    props: {
                        y: 0,
                        x: 0,
                        var: "blackMask",
                        top: 0,
                        right: 0,
                        name: "BlackMask",
                        mouseEnabled: !0,
                        left: 0,
                        bottom: 0,
                        bgColor: "#000000",
                        alpha: .6
                    },
                    compId: 202
                }, {
                    type: "Image",
                    props: {
                        width: 620,
                        var: "windowBox",
                        skin: "framework_res/box.png",
                        sizeGrid: "15,15,15,15",
                        name: "Window",
                        height: 414,
                        centerY: 0,
                        centerX: 0
                    },
                    compId: 3,
                    child: [ {
                        type: "Box",
                        props: {
                            var: "windowClickArea",
                            top: 0,
                            right: 0,
                            name: "WindowClickArea",
                            left: 0,
                            bottom: 0
                        },
                        compId: 213
                    }, {
                        type: "Image",
                        props: {
                            x: 32,
                            width: 640,
                            var: "adImage",
                            top: 20,
                            scaleY: .9,
                            scaleX: .9,
                            name: "AdImage",
                            height: 320,
                            centerX: 0
                        },
                        compId: 203,
                        child: [ {
                            type: "Image",
                            props: {
                                width: 83,
                                var: "adLogo",
                                top: 0,
                                right: 0,
                                name: "AdLogo",
                                height: 31
                            },
                            compId: 209
                        }, {
                            type: "Image",
                            props: {
                                x: 644,
                                width: 100,
                                var: "adIcon",
                                right: 0,
                                name: "AdIcon",
                                height: 100,
                                bottom: 0
                            },
                            compId: 210
                        } ]
                    }, {
                        type: "Button",
                        props: {
                            width: 60,
                            var: "closeButton",
                            top: 7,
                            stateNum: 1,
                            skin: "framework_res/btn_close.png",
                            name: "CloseButton",
                            left: 7,
                            hitTestPrior: !0,
                            height: 60
                        },
                        compId: 10
                    }, {
                        type: "Label",
                        props: {
                            var: "titleLabel",
                            valign: "middle",
                            text: "广告标题",
                            name: "TitleLabel",
                            height: 40,
                            fontSize: 30,
                            color: "#7c7c7c",
                            centerX: 0,
                            bottom: 57,
                            bold: !1,
                            align: "center"
                        },
                        compId: 7
                    }, {
                        type: "Label",
                        props: {
                            var: "descLabel",
                            valign: "middle",
                            text: "广告描述",
                            name: "DescLabel",
                            height: 40,
                            fontSize: 25,
                            color: "#7c7c7c",
                            centerX: 0,
                            bottom: 13,
                            bold: !1,
                            align: "center"
                        },
                        compId: 211
                    }, {
                        type: "Button",
                        props: {
                            y: 484,
                            x: 310,
                            width: 350,
                            var: "watchAdButton",
                            stateNum: 1,
                            skin: "framework_res/btn_green.png",
                            sizeGrid: "18,16,24,15",
                            name: "WatchAdButton",
                            labelSize: 50,
                            hitTestPrior: !0,
                            height: 100,
                            centerX: 0,
                            bottom: -120,
                            anchorY: .5,
                            anchorX: .5
                        },
                        compId: 5,
                        child: [ {
                            type: "Label",
                            props: {
                                y: 25,
                                var: "buttonLabel",
                                valign: "middle",
                                text: "点击查看",
                                name: "ButtonLabel",
                                fontSize: 50,
                                color: "#fff",
                                centerX: 0,
                                bold: !0,
                                align: "center"
                            },
                            compId: 12
                        }, {
                            type: "Script",
                            props: {
                                runtime: "framework/UIComponents/ScaleButtonEffect.ts"
                            },
                            compId: 212
                        } ]
                    } ]
                } ],
                loadList: [ "framework_res/box.png", "framework_res/btn_close.png", "framework_res/btn_green.png" ],
                loadList3D: []
            }, Views.NativeAdViewUI = NativeAdViewUI, REG("ui.Views.NativeAdViewUI", NativeAdViewUI);
            class OpenChestGridItemUI extends Laya.View {
                constructor() {
                    super();
                }
                createChildren() {
                    super.createChildren(), this.createView(OpenChestGridItemUI.uiView);
                }
            }
            OpenChestGridItemUI.uiView = {
                type: "View",
                props: {
                    width: 188,
                    height: 203
                },
                compId: 2,
                child: [ {
                    type: "Image",
                    props: {
                        y: 0,
                        x: 0,
                        var: "backgroundImage",
                        top: 0,
                        skin: "ui_res/back_frame4.png",
                        sizeGrid: "41,36,37,45",
                        right: 0,
                        name: "Bg",
                        left: 0,
                        bottom: 0
                    },
                    compId: 3
                }, {
                    type: "Image",
                    props: {
                        y: 104,
                        x: 67,
                        var: "coinImage",
                        skin: "ui_res/icon_gold.png",
                        scaleY: .45,
                        scaleX: .45,
                        name: "Coin",
                        centerY: 30,
                        centerX: 0
                    },
                    compId: 4
                }, {
                    type: "Image",
                    props: {
                        y: 101,
                        x: 94,
                        var: "chestImage",
                        skin: "ui_res/icon_chest3.png",
                        name: "Chest",
                        centerY: 0,
                        centerX: 0,
                        anchorY: .5,
                        anchorX: .5
                    },
                    compId: 5
                }, {
                    type: "Box",
                    props: {
                        y: 102,
                        x: 94,
                        var: "previewBox",
                        centerY: 0,
                        centerX: 0,
                        anchorY: .5,
                        anchorX: .5
                    },
                    compId: 7
                }, {
                    type: "Label",
                    props: {
                        y: 49,
                        x: 72,
                        var: "coinLabel",
                        valign: "middle",
                        text: "50",
                        name: "CoinLabel",
                        fontSize: 40,
                        color: "#fff",
                        centerY: -33,
                        centerX: 0,
                        bold: !0,
                        align: "center"
                    },
                    compId: 6
                } ],
                loadList: [ "ui_res/back_frame4.png", "ui_res/icon_gold.png", "ui_res/icon_chest3.png" ],
                loadList3D: []
            }, Views.OpenChestGridItemUI = OpenChestGridItemUI, REG("ui.Views.OpenChestGridItemUI", OpenChestGridItemUI);
            class SkinStoreGridItemUI extends Laya.View {
                constructor() {
                    super();
                }
                createChildren() {
                    super.createChildren(), this.createView(SkinStoreGridItemUI.uiView);
                }
            }
            SkinStoreGridItemUI.uiView = {
                type: "View",
                props: {
                    width: 188,
                    mouseEnabled: !0,
                    hitTestPrior: !0,
                    height: 188
                },
                compId: 2,
                child: [ {
                    type: "Image",
                    props: {
                        y: 0,
                        x: 0,
                        var: "backgroundImage",
                        top: 0,
                        skin: "ui_res/back_frame3.png",
                        sizeGrid: "16,19,21,21",
                        right: 0,
                        name: "Bg",
                        left: 0,
                        bottom: 0
                    },
                    compId: 3
                }, {
                    type: "Box",
                    props: {
                        y: 102,
                        x: 94,
                        var: "previewBox",
                        centerY: 0,
                        centerX: 0,
                        anchorY: .5,
                        anchorX: .5
                    },
                    compId: 7
                }, {
                    type: "Image",
                    props: {
                        width: 115,
                        var: "ballIcon",
                        skin: "ui_res/icon_ball1.png",
                        name: "BallIcon",
                        height: 115,
                        centerY: 0,
                        centerX: 0
                    },
                    compId: 8
                }, {
                    type: "ProgressBar",
                    props: {
                        width: 120,
                        var: "progress",
                        value: .5,
                        skin: "ui_res/progress.png",
                        sizeGrid: "7,14,9,6",
                        centerX: 0,
                        bottom: -15
                    },
                    compId: 9,
                    child: [ {
                        type: "Label",
                        props: {
                            var: "progressLabel",
                            valign: "middle",
                            text: "1 / 3",
                            fontSize: 30,
                            drawCallOptimize: !0,
                            color: "#311c3b",
                            centerY: 0,
                            centerX: 0,
                            bold: !0,
                            align: "center"
                        },
                        compId: 10
                    } ]
                } ],
                loadList: [ "ui_res/back_frame3.png", "ui_res/icon_ball1.png", "ui_res/progress.png" ],
                loadList3D: []
            }, Views.SkinStoreGridItemUI = SkinStoreGridItemUI, REG("ui.Views.SkinStoreGridItemUI", SkinStoreGridItemUI);
            class SkinStoreGridPageUI extends Laya.View {
                constructor() {
                    super();
                }
                createChildren() {
                    super.createChildren(), this.createView(SkinStoreGridPageUI.uiView);
                }
            }
            SkinStoreGridPageUI.uiView = {
                type: "View",
                props: {
                    width: 720,
                    height: 650
                },
                compId: 2,
                child: [ {
                    type: "List",
                    props: {
                        width: 609,
                        var: "grid",
                        spaceY: 25,
                        spaceX: 20,
                        repeatY: 3,
                        repeatX: 3,
                        name: "Grid",
                        centerY: 0,
                        centerX: 0
                    },
                    compId: 3,
                    child: [ {
                        type: "SkinStoreGridItem",
                        props: {
                            runtime: "script/Views/SkinStoreView/SkinStoreGridItem.ts",
                            renderType: "render"
                        },
                        compId: 4
                    } ]
                } ],
                loadList: [],
                loadList3D: []
            }, Views.SkinStoreGridPageUI = SkinStoreGridPageUI, REG("ui.Views.SkinStoreGridPageUI", SkinStoreGridPageUI);
        }(ui.Views || (ui.Views = {}));
    }(ui || (ui = {})), function(ui) {
        !function(ZhiSheWanAd) {
            !function(view) {
                class AppGridItemUI extends Laya.View {
                    constructor() {
                        super();
                    }
                    createChildren() {
                        super.createChildren(), this.createView(AppGridItemUI.uiView);
                    }
                }
                AppGridItemUI.uiView = {
                    type: "View",
                    props: {
                        y: 130,
                        x: 110,
                        width: 220,
                        height: 260,
                        anchorY: .5,
                        anchorX: .5
                    },
                    compId: 2,
                    child: [ {
                        type: "Script",
                        props: {
                            y: 0,
                            x: 0,
                            scale: .95,
                            runtime: "framework/UIComponents/ScaleButtonEffect.ts"
                        },
                        compId: 12
                    }, {
                        type: "Box",
                        props: {
                            width: 210,
                            left: 0,
                            height: 250,
                            bottom: 0
                        },
                        compId: 14,
                        child: [ {
                            type: "Image",
                            props: {
                                y: 0,
                                x: 0,
                                top: 0,
                                skin: "res_zhishewan/box.png",
                                sizeGrid: "14,15,17,13",
                                right: 0,
                                name: "BG",
                                left: 0,
                                bottom: 0
                            },
                            compId: 7
                        }, {
                            type: "Image",
                            props: {
                                y: 20,
                                x: 8,
                                width: 195,
                                var: "iconImage",
                                top: 25,
                                name: "IconImage",
                                height: 146.25,
                                centerX: 0
                            },
                            compId: 8
                        }, {
                            type: "Image",
                            props: {
                                y: 205,
                                x: 8,
                                width: 195,
                                var: "barImage",
                                skin: "res_zhishewan/bar_1.png",
                                name: "BarImage",
                                height: 40,
                                centerX: 0,
                                bottom: 5
                            },
                            compId: 9
                        }, {
                            type: "Image",
                            props: {
                                y: -7,
                                x: 146,
                                var: "badgeImage",
                                top: -7,
                                skin: "res_zhishewan/hot.png",
                                right: -10,
                                name: "BadgeImage"
                            },
                            compId: 10
                        }, {
                            type: "Label",
                            props: {
                                y: 209,
                                x: 8,
                                var: "nameLabel",
                                valign: "middle",
                                right: 8,
                                // overflow: "scroll",
                                wordWrap:true,
                                name: "NameLabel",
                                left: 8,
                                height: 30,
                                fontSize: 16,
                                color: "#ffffff",
                                bottom: 11,
                                bold: !0,
                                align: "center"
                            },
                            compId: 11
                        } ]
                    } ],
                    loadList: [ "res_zhishewan/box.png", "res_zhishewan/bar_1.png", "res_zhishewan/hot.png" ],
                    loadList3D: []
                }, view.AppGridItemUI = AppGridItemUI, REG("ui.ZhiSheWanAd.view.AppGridItemUI", AppGridItemUI);
                class AppListItemNoNameUI extends Laya.View {
                    constructor() {
                        super();
                    }
                    createChildren() {
                        super.createChildren(), this.createView(AppListItemNoNameUI.uiView);
                    }
                }
                AppListItemNoNameUI.uiView = {
                    type: "View",
                    props: {
                        width: 100,
                        height: 100,
                        centerY: 0
                    },
                    compId: 2,
                    child: [ {
                        type: "Image",
                        props: {
                            var: "iconImage",
                            top: 0,
                            right: 0,
                            name: "IconImage",
                            left: 0,
                            bottom: 0
                        },
                        compId: 3
                    } ],
                    loadList: [],
                    loadList3D: []
                }, view.AppListItemNoNameUI = AppListItemNoNameUI, REG("ui.ZhiSheWanAd.view.AppListItemNoNameUI", AppListItemNoNameUI);
                class AppListItemWithNameUI extends Laya.View {
                    constructor() {
                        super();
                    }
                    createChildren() {
                        super.createChildren(), this.createView(AppListItemWithNameUI.uiView);
                    }
                }
                AppListItemWithNameUI.uiView = {
                    type: "View",
                    props: {
                        width: 110,
                        height: 145,
                        centerY: 0
                    },
                    compId: 2,
                    child: [ {
                        type: "Box",
                        props: {
                            width: 100,
                            left: 0,
                            height: 135,
                            bottom: 0
                        },
                        compId: 8,
                        child: [ {
                            type: "Image",
                            props: {
                                y: 0,
                                x: 0,
                                top: 0,
                                skin: "res_zhishewan/box.png",
                                sizeGrid: "14,15,17,13",
                                right: 0,
                                name: "BG",
                                left: 0,
                                bottom: 0
                            },
                            compId: 5
                        }, {
                            type: "Image",
                            props: {
                                y: 15,
                                x: 5,
                                width: 90,
                                var: "iconImage",
                                top: 15,
                                name: "IconImage",
                                height: 67.5,
                                centerX: 0
                            },
                            compId: 3
                        }, {
                            type: "Image",
                            props: {
                                y: 95,
                                x: 5,
                                var: "barImage",
                                skin: "res_zhishewan/bar_1.png",
                                sizeGrid: "0,14,0,10",
                                right: 5,
                                name: "BarImage",
                                left: 5,
                                height: 35,
                                bottom: 5
                            },
                            compId: 6
                        }, {
                            type: "Image",
                            props: {
                                var: "badgeImage",
                                top: -8,
                                skin: "res_zhishewan/hot.png",
                                scaleY: .8,
                                scaleX: .8,
                                right: -9,
                                name: "BadgeImage"
                            },
                            compId: 7
                        }, {
                            type: "Label",
                            props: {
                                var: "nameLabel",
                                valign: "middle",
                                text: "Label",
                                right: 6,
                                // overflow: "scroll",
                                name: "AppNameLabel",
                                left: 6,
                                height: 35,
                                wordWrap:true,
                                fontSize: 12,
                                color: "#ffffff",
                                bottom: 4,
                                align: "center"
                            },
                            compId: 4
                        } ]
                    } ],
                    loadList: [ "res_zhishewan/box.png", "res_zhishewan/bar_1.png", "res_zhishewan/hot.png" ],
                    loadList3D: []
                }, view.AppListItemWithNameUI = AppListItemWithNameUI, REG("ui.ZhiSheWanAd.view.AppListItemWithNameUI", AppListItemWithNameUI);
                class AppMatrixGridItemUI extends Laya.View {
                    constructor() {
                        super();
                    }
                    createChildren() {
                        super.createChildren(), this.createView(AppMatrixGridItemUI.uiView);
                    }
                }
                AppMatrixGridItemUI.uiView = {
                    type: "View",
                    props: {
                        y: 130,
                        x: 110,
                        width: 220,
                        height: 260,
                        anchorY: .5,
                        anchorX: .5
                    },
                    compId: 2,
                    child: [ {
                        type: "Script",
                        props: {
                            scale: .95,
                            runtime: "framework/UIComponents/ScaleButtonEffect.ts"
                        },
                        compId: 8
                    }, {
                        type: "Box",
                        props: {
                            y: 10,
                            width: 210,
                            height: 250
                        },
                        compId: 10,
                        child: [ {
                            type: "Image",
                            props: {
                                y: 0,
                                x: 0,
                                top: 0,
                                skin: "res_zhishewan/box.png",
                                sizeGrid: "14,15,17,13",
                                right: 0,
                                name: "BG",
                                left: 0,
                                bottom: 0
                            },
                            compId: 5
                        }, {
                            type: "Image",
                            props: {
                                y: 10,
                                x: 8,
                                width: 195,
                                var: "iconImage",
                                top: 10,
                                name: "IconImage",
                                height: 195,
                                centerX: 0
                            },
                            compId: 3
                        }, {
                            type: "Image",
                            props: {
                                y: 205,
                                x: 8,
                                width: 195,
                                var: "barImage",
                                skin: "res_zhishewan/bar_1.png",
                                name: "BarImage",
                                height: 40,
                                centerX: 0,
                                bottom: 5
                            },
                            compId: 7
                        }, {
                            type: "Image",
                            props: {
                                var: "badgeImage",
                                top: -8,
                                skin: "res_zhishewan/hot.png",
                                right: -9,
                                name: "BadgeImage"
                            },
                            compId: 9
                        }, {
                            type: "Label",
                            props: {
                                var: "nameLabel",
                                valign: "middle",
                                right: 8,
                                overflow: "scroll",
                                name: "NameLabel",
                                left: 8,
                                height: 30,
                                fontSize: 20,
                                color: "#ffffff",
                                bottom: 10,
                                bold: !0,
                                align: "center"
                            },
                            compId: 4
                        } ]
                    } ],
                    loadList: [ "res_zhishewan/box.png", "res_zhishewan/bar_1.png", "res_zhishewan/hot.png" ],
                    loadList3D: []
                }, view.AppMatrixGridItemUI = AppMatrixGridItemUI, REG("ui.ZhiSheWanAd.view.AppMatrixGridItemUI", AppMatrixGridItemUI);
            }(ZhiSheWanAd.view || (ZhiSheWanAd.view = {}));
        }(ui.ZhiSheWanAd || (ui.ZhiSheWanAd = {}));
    }(ui || (ui = {}));
    var ToastUI = ui.dialogs.ToastUI;
    class Toast extends ToastUI {
        static show(message, duration = 2, fade = .2, callback) {
            this._instance ? this._doShow(message, duration, fade, callback) : this.init(() => {
                this._doShow(message, duration, fade, callback);
            });
        }
        static init(callback) {
            this._instance || (this._instance = new Toast(), this._doShow("", 0, 0, null), callback && callback());
        }
        static _doShow(message, duration, fade, callback) {
            Laya.timer.clearAll(this), this._instance.msgLabel.text = message, this._instance.show(!1, !1), 
            this._instance.fadeInMsgLabel(1e3 * fade, () => {
                Laya.timer.once(1e3 * duration, this, () => {
                    this._instance.fadeOutMsgLabel(1e3 * fade, () => {
                        this._instance.close(), callback && callback();
                    });
                });
            });
        }
        fadeInMsgLabel(fadeDuration, callback) {
            this.msgLabel.alpha = 0, Laya.Tween.clearAll(this.msgLabel), Laya.Tween.to(this.msgLabel, {
                alpha: 1
            }, fadeDuration, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                callback && callback();
            }));
        }
        fadeOutMsgLabel(fadeDuration, callback) {
            this.msgLabel.alpha = 1, Laya.Tween.clearAll(this.msgLabel), Laya.Tween.to(this.msgLabel, {
                alpha: 0
            }, fadeDuration, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                callback && callback();
            }));
        }
    }
    class BannerAdBase {
        canShowBanner() {
            return !0;
        }
        showBannerAd(opts) {
            console.log("showBannerAd", opts);
        }
        hideBannerAd(clearStack) {
            console.log("hideBannerAd", clearStack);
        }
        setCurrentBannerStyle(opts) {
            console.log("setCurrentBannerStyle", opts);
        }
        showCurrentBanner() {
            console.log("showCurrentBanner");
        }
        hideCurrentBanner() {
            console.log("hideCurrentBanner");
        }
    }
    class VideoAdBase {
        showVideoAd(isShortAd = !0, logKey, callback) 
        {
            platform.getInstance().showReward(()=>{
                callback && callback(true);
            })
            // console.log("showVideoAd", isShortAd ? "短视频" : "长视频", logKey), callback && callback(!0);
        }
        isVideoAdLoad(isShortAd = !0) {
            return !0;
        }
    }
    class InterstitialAdBase {
        isWaitingInterstitialAd() {
            return !1;
        }
        isInterstitialAdLoad() {
            return console.log("isInterstitialAdLoad"), !1;
        }
        showInterstitialAd(logKey, callback) {
            console.log("showInterstitialAd", logKey), callback && callback();
        }
        updateInterstitialAdLastShowTime() {}
    }
    class ShareToFriendsBase {
        static objectToQuerystring(obj) {
            return Object.keys(obj).reduce(function(str, key, i) {
                let delimiter, val;
                return [ str, delimiter = 0 === i ? "" : "&", key = encodeURIComponent(key), "=", val = "object" == typeof (val = obj[key]) ? JSON.stringify(val) : encodeURIComponent(val) ].join("");
            }, "");
        }
        static makeShareQueryString(shareParams) {
            if (!shareParams) return;
            let action = shareParams.action;
            delete shareParams.action;
            let query = this.objectToQuerystring(shareParams);
            return void 0 !== PlayerDataBase.userId && ("" !== query && (query += "&"), query += "src_uid=" + PlayerDataBase.userId + "&action=" + action), 
            console.log("makeShareQueryString:", query), query;
        }
        shareToFriends(opts, shareParams) {
            let query = ShareToFriendsBase.makeShareQueryString(shareParams);
            console.log("shareToFriends", opts, query);
            opts.success && opts.success({
                error: ""
            });
        }
    }
    class SubDomainBase {
        postMessageToSubDomain(msgType, data) {
            console.log("postMessageToSubDomain", msgType, data);
        }
        reportScoresToSubDomain(data, opts) {
            console.log("reportScoresToSubDomain", data, opts);
        }
    }
    class LoginState {}
    LoginState.isLogin = !1, LoginState.isAuthorize = !1, LoginState.gameServerLogin = !1, 
    LoginState.loginCode = "";
    class WxRequest {
        request(url, method = "POST", data = null, options) {
            let {onSuccess: onSuccess, onFail: onFail, header: header} = options;
            header || (header = {
                CONTENT_TYPE: "application/json",
                Accept: "application/json"
            }), wx.request({
                url: url,
                data: data,
                method: method,
                header: header,
                success: res => {
                    console.log("WxRequest success", url, res.data), 200 === res.statusCode ? onSuccess && onSuccess(res.data) : onFail && onFail("request error");
                },
                fail: res => {
                    console.log("WxRequest fail", url, res), onFail && onFail("request error");
                }
            });
        }
        post(url, data, options) {
            this.request(url, "POST", data, options);
        }
        postJson(url, data, options) {
            this.post(url, data, options);
        }
    }
    class WebRequest {
        request(url, method = "POST", data = null, options) {
            function fn(data) {}
            let success = options.onSuccess || fn, failure = options.onFail || fn;
            method = method.toUpperCase();
            let dataArray = [];
            if (data) for (let name in data) if (data.hasOwnProperty(name)) {
                let tmp = name + "=" + encodeURIComponent(data[name]);
                dataArray.push(tmp);
            }
            let dataString = dataArray.join("&");
            "GET" === method && data && (url += (-1 === url.indexOf("?") ? "?" : "&") + dataString, 
            data = null, dataString = null);
            let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
            return xhr.timeout = 5e3, xhr.ontimeout = function(event) {
                console.log("WebRequest超时:" + url), failure("WebRequest time out");
            }, xhr.onreadystatechange = function() {
                if (4 === xhr.readyState) {
                    let s = xhr.status;
                    s >= 200 && s < 300 ? success(xhr.responseText) : (console.log("WebRequest异常:" + url + ", status:" + xhr.status), 
                    failure(xhr.statusText));
                }
            }, xhr.open(method, url), "POST" === method && xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;"), 
            xhr.send(dataString), xhr;
        }
        post(url, data, options) {
            this.request(url, "POST", data, options);
        }
        postJson(url, data, options) {
            let {onSuccess: onSuccess, onFail: onFail} = options, newOptions = Object.assign({}, options, {
                onSuccess: responseText => {
                    try {
                        onSuccess(JSON.parse(responseText));
                    } catch (e) {
                        return onFail(e.toString());
                    }
                }
            });
            this.post(url, data, newOptions);
        }
    }
    let _imp = null;
    _imp = "undefined" != typeof wx ? new WxRequest() : new WebRequest();
    class HttpRequest {
        static request(url, method = "POST", data = null, options) {
            _imp.request(url, method, data, options);
        }
        static post(url, data, options) {
            _imp.post(url, data, options);
        }
        static postJson(url, data, options) {
            _imp.postJson(url, data, options);
        }
    }
    const API_CODE = {
        SUCCEED: 0,
        PARAMS_ERROR: 1e3,
        INVALID_OPERATION: 1001,
        INVALID_PLAYER_ID: 1002,
        TIME_OUT: 2e3,
        UNKNOWN: 9999
    }, OPEN_ID_KEY = "OPEN_ID_KEY_FROM_SEVER";
    class SelfSeverApiCall {
        static getOpenIdFromLocalData() {
            return this._openId ? this._openId : (this._openId = LocalData.getItem(OPEN_ID_KEY, null), 
            this._openId);
        }
        static getOpenIdFromCode2Session(callback) {
            // this._openId ? callback(null, this._openId) : (this._openId = LocalData.getItem(OPEN_ID_KEY, null), 
            // this._openId ? callback(null, this._openId) : PlatformUtils$1.login(() => {
            //     if (!LoginState.isLogin) return void (callback && callback("未登录"));
            //     let code = LoginState.loginCode, url = `https://mergefarm.sy3.com/get-openid.php?appid=${WX_APP_ID}&code=${code}`;
            //     wx.request({
            //         url: url,
            //         success(res) {
            //             if (console.log(res.data), (res = res.data).code !== API_CODE.SUCCEED) return PlatformUtils$1.sendLogEvent("从服务器取OpenId失败", {
            //                 err: JSON.stringify(res)
            //             }), void (callback && callback("取OpenId失败"));
            //             this._openId = res.openid, LocalData.setItem(OPEN_ID_KEY, this._openId), callback && callback(null, this._openId);
            //         },
            //         fail(res) {
            //             console.warn(res), PlatformUtils$1.sendLogEvent("从服务器取OpenId失败", {
            //                 err: JSON.stringify(res)
            //             }), callback && callback(res);
            //         }
            //     });
            // }));
        }
    }
    SelfSeverApiCall._openId = null;
    class ApiCall {
        static login(callback) {
            if (Laya.Browser.onMiniGame) {
                let data, gameData = LocalData.getItem(SAVE_DATA_KEY, null);
                gameData ? (data = {
                    code: API_CODE.SUCCEED,
                    gameData: gameData
                }, console.log("从本地读取到游戏数据", data)) : data = {
                    code: API_CODE.SUCCEED,
                    gameData: defaultPlayerData
                }, SelfSeverApiCall.getOpenIdFromCode2Session((err, openId) => {
                    data.userInfo = {
                        id: openId
                    }, callback && callback(null, data);
                });
            } else {
                let res, gameData = LocalData.getItem(SAVE_DATA_KEY, null);
                res = gameData ? {
                    code: API_CODE.SUCCEED,
                    gameData: gameData,
                    userInfo: {
                        id: "none",
                        name: "none",
                        avatarUrl: ""
                    },
                    inviteCount: 0
                } : {
                    code: API_CODE.SUCCEED,
                    gameData: defaultPlayerData,
                    userInfo: {
                        id: "none",
                        name: "none",
                        avatarUrl: ""
                    },
                    inviteCount: 0
                }, PlatformUtils$1.login(() => {
                    callback(null, res);
                });
            }
        }
        static gameDataReport(uid, gameData, callback) {
            uid && LocalData.setItem(SAVE_DATA_KEY, gameData);
        }
        static reportGameExit(uid, gameData, callback) {
            uid && LocalData.setItem(SAVE_DATA_KEY, gameData);
        }
    }
    class LoginAndAuthorizeBase {
        login(callback) {
            LoginState.isLogin = !0, callback && callback(LoginState);
        }
        checkAuthorize(callback) {
            LoginState.isAuthorize = !0, callback && callback(LoginState);
        }
        loadUserInfo(callback) {
            LoginState.isAuthorize = !0, callback && callback(LoginState);
        }
        loadGameData(callback) {
            ApiCall.login((err, res) => {
                err ? (LoginState.gameServerLogin = !1, callback && callback(LoginState)) : res.code === API_CODE.SUCCEED ? (LoginState.gameServerLogin = !0, 
                PlayerDataBase.setNetData(res), callback && callback(LoginState)) : (LoginState.gameServerLogin = !1, 
                callback && callback(LoginState));
            });
        }
    }
    let _enableVibrate = !0;
    class VibrateBase {
        constructor() {
            _enableVibrate = LocalData.getItem("VibrateEnable", !0);
        }
        vibrateShort() {
        }
        vibrateLong() {
        }
        isVibrateEnable() {
            return _enableVibrate;
        }
        setVibrateEnable(enable) {
            _enableVibrate = enable, LocalData.setItem("VibrateEnable", _enableVibrate);
        }
    }
    class LogBase {
        sendLogEvent(eventName, data) {
            console.log("sendLogEvent", eventName, data);
        }
        logStageStart(stageId, stageName) {
            console.log("logStageStart", stageId, stageName);
        }
        logStageEnd(stageId, stageName, complete, descString) {
            console.log("logStageStart", stageId, stageName, complete, descString);
        }
    }
    class MiscBase {
        showGameClubButton() {}
        hideGameClubButton() {}
        showOpenSettingButton(text, callback) {}
        hideOpenSettingButton() {}
        checkGameUpdate() {}
        openSetting(callback) {
            callback && callback(LoginState);
        }
        canSaveToAlbum(callback) {
            callback && callback(!0);
        }
        saveToAlbum(callback) {
            callback && callback(!0);
        }
        openSettingWithScope(scope, callback) {
            callback && callback(!0);
        }
        openCustomerService(callback) {
            callback && callback(!0);
        }
        getOnShowRes() {
            return {
                query: {}
            };
        }
        setOnShowRes(res) {}
        getPlatform() {
            return "web";
        }
        installShortcut(callback) {
            callback && callback(!0);
        }
        hasShortcutInstalled(callback) {
            callback && callback(!0);
        }
        setLoadingProgress(progress) {}
        loadingComplete(callback) {
            callback && callback();
        }
    }
    class ImplBase {
        init() {
            console.error("空实现, 请实例化ImplBase的子类");
        }
        vibrateShort() {
            this._vibrate.vibrateShort();
        }
        vibrateLong() {
        }
        isVibrateEnable() {
            return this._vibrate.isVibrateEnable();
        }
        setVibrateEnable(enable) {
            this._vibrate.setVibrateEnable(enable);
        }
        shareToFriends(opts, shareParams) {
            this._shareToFriends.shareToFriends(opts, shareParams);
        }
        login(callback) {
            this._loginAndAuthorize.login(callback);
        }
        checkAuthorize(callback) {
            this._loginAndAuthorize.checkAuthorize(callback);
        }
        loadUserInfo(callback) {
            this._loginAndAuthorize.loadUserInfo(callback);
        }
        loadGameData(callback) {
            this._loginAndAuthorize.loadGameData(callback);
        }
        canShowBanner() {
            return this._bannerAd.canShowBanner();
        }
        showBannerAd(opts) {
            this._bannerAd.showBannerAd(opts);
        }
        hideBannerAd(clearStack) {
            this._bannerAd.hideBannerAd(clearStack);
        }
        setCurrentBannerStyle(opts) {
            this._bannerAd.setCurrentBannerStyle(opts);
        }
        showCurrentBanner() {
            this._bannerAd.showCurrentBanner();
        }
        hideCurrentBanner() {
            this._bannerAd.hideCurrentBanner();
        }
        showVideoAd(isShortAd, logKey, callback) {
            this._videoAd.showVideoAd(isShortAd, logKey, callback);
        }
        isVideoAdLoad(isShortAd) {
            return this._videoAd.isVideoAdLoad(isShortAd);
        }
        isWaitingInterstitialAd() {
            return this._interstitialAd.isWaitingInterstitialAd();
        }
        isInterstitialAdLoad() {
            return this._interstitialAd.isInterstitialAdLoad();
        }
        showInterstitialAd(logKey, callback) {
            this._interstitialAd.showInterstitialAd(logKey, callback);
        }
        updateInterstitialAdLastShowTime() {}
        sendLogEvent(eventName, data) {
            this._log.sendLogEvent(eventName, data);
        }
        logStageStart(stageId, stageName) {
            this._log.logStageStart(stageId, stageName);
        }
        logStageEnd(stageId, stageName, complete, descString) {
            this._log.logStageEnd(stageId, stageName, complete, descString);
        }
        postMessageToSubDomain(msgType, data) {
            this._subDomain.postMessageToSubDomain(msgType, data);
        }
        reportScoresToSubDomain(data, opts) {
            this._subDomain.reportScoresToSubDomain(data, opts);
        }
        checkGameUpdate() {
            this._misc.checkGameUpdate();
        }
        showGameClubButton() {
            this._misc.showGameClubButton();
        }
        hideGameClubButton() {
            this._misc.hideGameClubButton();
        }
        showOpenSettingButton(text, callback) {
            this._misc.showOpenSettingButton(text, callback);
        }
        hideOpenSettingButton() {
            this._misc.hideOpenSettingButton();
        }
        openSetting(callback) {
            this._misc.openSetting(callback);
        }
        canSaveToAlbum(callback) {
            this._misc.canSaveToAlbum(callback);
        }
        saveToAlbum(callback) {
            this._misc.saveToAlbum(callback);
        }
        openSettingWithScope(scope, callback) {
            this._misc.openSettingWithScope(scope, callback);
        }
        openCustomerService(callback) {
            this._misc.openCustomerService(callback);
        }
        getOnShowRes() {
            return this._misc.getOnShowRes();
        }
        setOnShowRes(res) {
            this._misc.setOnShowRes(res);
        }
        getPlatform() {
            return this._misc.getPlatform();
        }
        installShortcut(callback) {
            return this._misc.installShortcut(callback);
        }
        hasShortcutInstalled(callback) {
            return this._misc.hasShortcutInstalled(callback);
        }
        setLoadingProgress(progress) {
            return this._misc.setLoadingProgress(progress);
        }
        loadingComplete(callback) {
            return this._misc.loadingComplete(callback);
        }
        isSupportNativeAd() {
            return this._nativeAd.isSupportNativeAd();
        }
        reportAdClick(adData) {
            this._nativeAd.reportAdClick(adData);
        }
        reportAdShow(adData) {
            this._nativeAd.reportAdShow(adData);
        }
        isNativeAdLoaded() {
            return this._nativeAd.isNativeAdLoaded();
        }
        getNativeAdData() {
            return this._nativeAd.getNativeAdData();
        }
        destroyNativeAdDataAndPreloadNext(adData) {
            this._nativeAd.destroyNativeAdDataAndPreloadNext(adData);
        }
        showGameIcon(opts) {
            return this._gameIcon.showGameIcon(opts);
        }
        hideGameIcon(iconHandle) {
            this._gameIcon.hideGameIcon(iconHandle);
        }
        showGameBanner(opts) {
            return this._gameBanner.showGameBanner(opts);
        }
        hideGameBanner(clearStack) {
            this._gameBanner.hideGameBanner(clearStack);
        }
        setCurrentGameBannerStyle(opts) {
            this._gameBanner.setCurrentGameBannerStyle(opts);
        }
        showCurrentGameBanner() {
            this._gameBanner.showCurrentGameBanner();
        }
        hideCurrentGameBanner() {
            this._gameBanner.hideCurrentGameBanner();
        }
    }
    var CreativeType, InteractionType;
    !function(CreativeType) {
        CreativeType[CreativeType.None = 0] = "None", CreativeType[CreativeType.Text = 1] = "Text", 
        CreativeType[CreativeType.Image = 2] = "Image", CreativeType[CreativeType.ImageText = 3] = "ImageText", 
        CreativeType[CreativeType.Video = 4] = "Video", CreativeType[CreativeType.BigImageText = 6] = "BigImageText", 
        CreativeType[CreativeType.SmallImageText1 = 7] = "SmallImageText1", CreativeType[CreativeType.SmallImageText2 = 8] = "SmallImageText2";
    }(CreativeType || (CreativeType = {})), function(InteractionType) {
        InteractionType[InteractionType.None = 0] = "None", InteractionType[InteractionType.Browser = 1] = "Browser", 
        InteractionType[InteractionType.Download = 2] = "Download", InteractionType[InteractionType.BrowserLandPage = 3] = "BrowserLandPage", 
        InteractionType[InteractionType.AppHomePage = 4] = "AppHomePage", InteractionType[InteractionType.AppDetailPage = 5] = "AppDetailPage";
    }(InteractionType || (InteractionType = {}));
    class NativeAdBase {
        constructor() {}
        isSupportNativeAd() {
            return !0;
        }
        reportAdShow(adData) {
            console.log("reportAdShow", adData);
        }
        reportAdClick(adData) {
            console.log("reportAdClick", adData);
        }
        isNativeAdLoaded() {
            return !1;
        }
        getNativeAdData() {
            return null;
        }
        destroyNativeAdDataAndPreloadNext(adData) {}
    }
    class GameIconBase {
        showGameIcon(opts) {
            console.log("showGameIcon", opts);
        }
        hideGameIcon(iconHandle) {
            console.log("hideGameIcon", iconHandle);
        }
    }
    class GameBannerBase {
        showGameBanner(opts) {
            console.log("showGameBanner", opts);
        }
        hideGameBanner(clearStack) {
            console.log("hideGameBanner", clearStack);
        }
        setCurrentGameBannerStyle(opts) {
            console.log("setCurrentGameBannerStyle", opts);
        }
        showCurrentGameBanner() {
            console.log("showCurrentGameBanner");
        }
        hideCurrentGameBanner() {
            console.log("hideCurrentGameBanner");
        }
    }
    class WebImpl extends ImplBase {
        init() {
            this._initEvents(), this._bannerAd = new BannerAdBase(), this._videoAd = new VideoAdBase(), 
            this._nativeAd = new NativeAdBase(), this._interstitialAd = new InterstitialAdBase(), 
            this._loginAndAuthorize = new LoginAndAuthorizeBase(), this._shareToFriends = new ShareToFriendsBase(), 
            this._subDomain = new SubDomainBase(), this._vibrate = new VibrateBase(), this._log = new LogBase(), 
            this._misc = new MiscBase(), this._gameIcon = new GameIconBase(), this._gameBanner = new GameBannerBase();
        }
        _initEvents() {
            let hiddenPropName, win = window;
            void 0 !== document.hidden ? hiddenPropName = "hidden" : void 0 !== document.mozHidden ? hiddenPropName = "mozHidden" : void 0 !== document.msHidden ? hiddenPropName = "msHidden" : void 0 !== document.webkitHidden && (hiddenPropName = "webkitHidden");
            let hidden = !1;
            function onHidden() {
                hidden || (hidden = !0, EventManager.dispatchEvent(CommonEvents.GAME_ON_HIDE));
            }
            function onShown() {
                hidden && (hidden = !1, EventManager.dispatchEvent(CommonEvents.GAME_ON_SHOW));
            }
            if (hiddenPropName) {
                let changeList = [ "visibilitychange", "mozvisibilitychange", "msvisibilitychange", "webkitvisibilitychange", "qbrowserVisibilityChange" ];
                for (let i = 0; i < changeList.length; i++) document.addEventListener(changeList[i], function(event) {
                    let visible = document[hiddenPropName];
                    (visible = visible || event.hidden) ? onHidden() : onShown();
                });
            } else win.addEventListener("blur", onHidden), win.addEventListener("focus", onShown);
            navigator.userAgent.indexOf("MicroMessenger") > -1 && (win.onfocus = onShown), "onpageshow" in window && "onpagehide" in window && (win.addEventListener("pagehide", onHidden), 
            win.addEventListener("pageshow", onShown), document.addEventListener("pagehide", onHidden), 
            document.addEventListener("pageshow", onShown));
        }
    }
    var TimeLine = Laya.TimeLine;
    function getSpriteStageBounds(sprite) {
        let selfBounds = sprite.getSelfBounds(), leftTop = new Laya.Point(selfBounds.x, selfBounds.y), rightBottom = new Laya.Point(selfBounds.right, selfBounds.bottom);
        return leftTop = sprite.localToGlobal(leftTop), rightBottom = sprite.localToGlobal(rightBottom), 
        selfBounds.x = leftTop.x, selfBounds.y = leftTop.y, selfBounds.width = rightBottom.x - leftTop.x, 
        selfBounds.height = rightBottom.y - leftTop.y, selfBounds;
    }
    function spriteShake(sprite, loop = !0, delay = 0, wait = 2e3) {
        let timeLine = new TimeLine(), saveRotation = sprite.rotation;
        return timeLine.to(sprite, {}, delay, null, 0).to(sprite, {
            rotation: saveRotation - 10
        }, 300, Laya.Ease.quadOut, 0).to(sprite, {
            rotation: saveRotation + 10
        }, 300, Laya.Ease.quadOut, 0).to(sprite, {
            rotation: saveRotation - 8
        }, 250, Laya.Ease.quadOut, 0).to(sprite, {
            rotation: saveRotation + 8
        }, 250, Laya.Ease.quadOut, 0).to(sprite, {
            rotation: saveRotation
        }, 200, Laya.Ease.quadOut, 0).to(sprite, {}, wait, null, 0), timeLine.play(0, loop), 
        timeLine;
    }
    const DefaultSwitchSettings = {
        reviewVer: "1.0.0",
        shareInduce: !0,
        shareVideoTime: 20,
        shareTime: 50,
        newUserForceShare: !1,
        shareMustSuccess: !0,
        enableInterstitialAd: !0,
        enableTutorial: !0,
        bannerCasualClick: !1,
        disableIOSBannerCasualClick: !0,
        bannerCasualSettings: {
            killDefenders: !1,
            settlement: !1,
            resurgence: !1
        },
        skipButtonCtrl: {
            waitBanner: !0,
            showBannerDelay: 1,
            moveButtonDelay: 1.5,
            skipButtonPos: "rand"
        },
        bannerReuseTimes: 1,
        useNativeAdCasual: !1,
        freeSpinMaxTimes: 3,
        showPlayViewBanner: !1,
        enableAppMatrix: !1,
        appMatrixWallInterval: 2,
        enableNativeAd: !0,
        enableNativeAdMaskClick: !1,
        enableNativeAdAutoClick: !1,
        nativeAdAutoClickInterval: 3,
        nativeAdAutoClickMinDuration: 1.5,
        coinPerPickup: 3,
        watchAdCDSec: 120,
        coinBuyPagePrice: [ 500, 500, 1e3, 2e3, 3e3 ],
        adBuyPagePrice: [ 1e3, 2e3, 3e3 ],
        notEnoughCoinAward: 300,
        bestCoinAward: 300,
        coinAwardAmount: [ 20, 25, 30, 35, 45, 50, 60, 70, 80 ],
        powerResumeSec: 120,
        maxDefender: 6,
        killDefendersMax: 6,
        skinTryOutOdds: 1
    }, BOX_SECRET = "2y4JfGdG9XGaYU38";
    var Script = Laya.Script, Handler = Laya.Handler;
    const AppMatrixWallEvent = {
        OPEN_APP_MATRIX_WALL: "OPEN_APP_MATRIX_WALL",
        CLOSE_APP_MATRIX_WALL: "CLOSE_APP_MATRIX_WALL"
    };
    class AppMatrixWall extends Script {
        constructor() {
            super(...arguments), this.backButton = null, this.continueButton = null, this.homeButton = null, 
            this._isNativeAdAutoClick = !1, this._autoClickNativeAdData = null, this._nativeAdAutoClickMinDt = 0;
        }
        static loadResources(callback) {
            this._instance ? callback(this._instance) : Laya.Scene.load("ZhiSheWanAd/view/AppMatrixWall.scene", Handler.create(this, view => {
                this._instance = view.getComponent(AppMatrixWall), callback(this._instance);
            }));
        }
        static openView(callback) {
            if (!ZhiSheWanAd.isEnabledAppMatrix()) return void (callback && callback());
            let n = LocalData.getItem("AppMatrixWallPageMode", 0);
            LocalData.setItem("AppMatrixWallPageMode", n + 1), n % SwitchSettings.getAppMatrixWallInterval() == 0 ? this.forceOpenView(callback) : callback && callback();
        }
        static forceOpenView(callback) {
            ZhiSheWanAd.isEnabledAppMatrix() ? this._instance ? (this._closeCallback = callback, 
            PlatformUtils$1.hideCurrentBanner(), this._instance.owner.open(!1), EventManager.dispatchEvent(AppMatrixWallEvent.OPEN_APP_MATRIX_WALL)) : this.loadResources(() => {
                this._closeCallback = callback, PlatformUtils$1.hideCurrentBanner(), this._instance.owner.open(!1), 
                EventManager.dispatchEvent(AppMatrixWallEvent.OPEN_APP_MATRIX_WALL);
            }) : callback && callback();
        }
        static hide() {
            this._instance && this._instance.closeView();
        }
        onAwake() {
            this.backButton.on(Laya.Event.CLICK, this, this.closeView), 
            this.continueButton.on(Laya.Event.CLICK, this, this.closeView), 
            this.homeButton.on(Laya.Event.CLICK, this, this.closeView);
        }
        closeView() {
            this._isNativeAdAutoClick && this._autoClickNativeAdData ? this._nativeAdAutoClickMinDt >= SwitchSettings.getNativeAdAutoClickMinDuration() ? (PlatformUtils$1.reportAdClick(this._autoClickNativeAdData), 
            this._doClose()) : (PlatformUtils$1.destroyNativeAdDataAndPreloadNext(this._autoClickNativeAdData), 
            this.clearNativeAdAutoClick(), this._doClose()) : this._doClose();
        }
        _doClose() {
            EventManager.dispatchEvent(AppMatrixWallEvent.CLOSE_APP_MATRIX_WALL), 
            AppMatrixWall._closeCallback && AppMatrixWall._closeCallback(), 
            AppMatrixWall._closeCallback = null, PlatformUtils$1.showCurrentBanner(), this.clearNativeAdAutoClick(), 
            this.owner.close();
        }
        clearNativeAdAutoClick() {
            this._isNativeAdAutoClick = !1, this._autoClickNativeAdData = null, this._nativeAdAutoClickMinDt = 0;
        }
        onEnable() {
            this.enableNativeAdAutoClickIfCan();
        }
        enableNativeAdAutoClickIfCan() {
            if (SwitchSettings.getEnableNativeAd() && SwitchSettings.getEnableNativeAdAutoClick() && PlatformUtils$1.isSupportNativeAd() && PlatformUtils$1.isNativeAdLoaded()) {
                let n = LocalData.getItem("NativeAdAutoClick", 0);
                LocalData.setItem("NativeAdAutoClick", n + 1), n % SwitchSettings.getNativeAdAutoClickInterval() != 0 && (this._autoClickNativeAdData = PlatformUtils$1.getNativeAdData(), 
                this._isNativeAdAutoClick = !0, this._nativeAdAutoClickMinDt = 0);
            }
        }
        onUpdate() {
            if (this._isNativeAdAutoClick && this._autoClickNativeAdData) {
                let dt = Laya.timer.delta / 1e3;
                this._nativeAdAutoClickMinDt += dt;
            }
        }
    }
    AppMatrixWall._closeCallback = null, AppMatrixWall._instance = null;
    var b64pad = "", chrsz = 8;
    function core_md5(x, len) {
        x[len >> 5] |= 128 << len % 32, x[14 + (len + 64 >>> 9 << 4)] = len;
        for (var a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, i = 0; i < x.length; i += 16) {
            var olda = a, oldb = b, oldc = c, oldd = d;
            a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936), d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586), 
            c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819), b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330), 
            a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897), d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426), 
            c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341), b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983), 
            a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416), d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417), 
            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063), b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162), 
            a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682), d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101), 
            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290), a = md5_gg(a, b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329), c, d, x[i + 1], 5, -165796510), 
            d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632), c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713), 
            b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302), a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691), 
            d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083), c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335), 
            b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848), a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438), 
            d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690), c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961), 
            b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501), a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467), 
            d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784), c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473), 
            a = md5_hh(a, b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734), c, d, x[i + 5], 4, -378558), 
            d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463), c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562), 
            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556), a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060), 
            d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353), c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632), 
            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640), a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174), 
            d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222), c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979), 
            b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189), a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487), 
            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835), c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520), 
            a = md5_ii(a, b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651), c, d, x[i + 0], 6, -198630844), 
            d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415), c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905), 
            b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055), a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571), 
            d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606), c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523), 
            b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799), a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359), 
            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744), c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380), 
            b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649), a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070), 
            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379), c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259), 
            b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551), a = safe_add(a, olda), b = safe_add(b, oldb), 
            c = safe_add(c, oldc), d = safe_add(d, oldd);
        }
        return Array(a, b, c, d);
    }
    function md5_cmn(q, a, b, x, s, t) {
        return safe_add((num = safe_add(safe_add(a, q), safe_add(x, t))) << (cnt = s) | num >>> 32 - cnt, b);
        var num, cnt;
    }
    function md5_ff(a, b, c, d, x, s, t) {
        return md5_cmn(b & c | ~b & d, a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t) {
        return md5_cmn(b & d | c & ~d, a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
    }
    function core_hmac_md5(key, data) {
        var bkey = str2binl(key);
        bkey.length > 16 && (bkey = core_md5(bkey, key.length * chrsz));
        for (var ipad = Array(16), opad = Array(16), i = 0; i < 16; i++) ipad[i] = 909522486 ^ bkey[i], 
        opad[i] = 1549556828 ^ bkey[i];
        var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
        return core_md5(opad.concat(hash), 640);
    }
    function safe_add(x, y) {
        var lsw = (65535 & x) + (65535 & y);
        return (x >> 16) + (y >> 16) + (lsw >> 16) << 16 | 65535 & lsw;
    }
    function str2binl(str) {
        for (var bin = Array(), mask = (1 << chrsz) - 1, i = 0; i < str.length * chrsz; i += chrsz) bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << i % 32;
        return bin;
    }
    function binl2hex(binarray) {
        for (var str = "", i = 0; i < 4 * binarray.length; i++) str += "0123456789abcdef".charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 15) + "0123456789abcdef".charAt(binarray[i >> 2] >> i % 4 * 8 & 15);
        return str;
    }
    function binl2b64(binarray) {
        for (var str = "", i = 0; i < 4 * binarray.length; i += 3) for (var triplet = (binarray[i >> 2] >> i % 4 * 8 & 255) << 16 | (binarray[i + 1 >> 2] >> (i + 1) % 4 * 8 & 255) << 8 | binarray[i + 2 >> 2] >> (i + 2) % 4 * 8 & 255, j = 0; j < 4; j++) 8 * i + 6 * j > 32 * binarray.length ? str += b64pad : str += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(triplet >> 6 * (3 - j) & 63);
        return str;
    }
    let md5 = {
        hex_md5: function(s) {
            return binl2hex(core_md5(str2binl(s), s.length * chrsz));
        },
        b64_md5: function(s) {
            return binl2b64(core_md5(str2binl(s), s.length * chrsz));
        },
        hex_hmac_md5: function(key, data) {
            return binl2hex(core_hmac_md5(key, data));
        },
        b64_hmac_md5: function(key, data) {
            return binl2b64(core_hmac_md5(key, data));
        },
        str_hmac_md5: function(key, data) {
            return function(bin) {
                for (var str = "", mask = (1 << chrsz) - 1, i = 0; i < 32 * bin.length; i += chrsz) str += String.fromCharCode(bin[i >> 5] >>> i % 32 & mask);
                return str;
            }(core_hmac_md5(key, data));
        }
    };
    var AD_STATUS_TYPE;
    !function(AD_STATUS_TYPE) {
        AD_STATUS_TYPE.DISPLAY = "display", AD_STATUS_TYPE.CLICK = "click";
    }(AD_STATUS_TYPE || (AD_STATUS_TYPE = {}));
    class ZhiSheWanAd {
        static requestBoxData(callback) {
            // this._cacheBoxData ? callback(null, this._cacheBoxData) : "undefined" != typeof wx ? this.requestBoxDataWechat(callback) : this.requestBoxDataOppo(callback);
        }
        static requestBoxDataWechat(callback) {
        }
        static requestBoxDataOppo(callback) {
        }
        static getSlotDataList(slotId, callback) {
            this._cacheBoxData ? callback(this._cacheBoxData[slotId].concat()) : this.requestBoxData(() => {
                this._cacheBoxData ? callback(this._cacheBoxData[slotId].concat()) : callback(null);
            });
        }
        static navigateToApp(data, showAppMatrixWallWhenFail = !0) {
            console.log("navigateToApp", data), PlayerDataBase.userId && ("undefined" != typeof wx ? this.navigateToAppWechat(data, showAppMatrixWallWhenFail) : "undefined" != typeof qg && this.navigateToAppOppo(data, showAppMatrixWallWhenFail));
        }
        static navigateToAppWechat(data, showAppMatrixWallWhenFail = !0) {
            PlatformUtils$1.sendLogEvent(`点击互推墙跳转-${data.app_title}`), void 0 !== wx.navigateToMiniProgram && wx.navigateToMiniProgram({
                appId: data.appid,
                path: data.link_path,
                success: () => {
                    this.reportClick(PlayerDataBase.userId, data), PlatformUtils$1.sendLogEvent("互推墙跳转"), 
                    PlatformUtils$1.sendLogEvent(`互推墙跳转成功-${data.app_title}`);
                },
                fail: () => {
                    showAppMatrixWallWhenFail && AppMatrixWall.forceOpenView();
                }
            });
        }
        static navigateToAppOppo(data, showAppMatrixWallWhenFail = !0) {
            void 0 !== qg.navigateToMiniGame && (data.extraData = data.extraData || {}, qg.navigateToMiniGame({
                pkgName: data.appid,
                extraData: data.extraData,
                success: () => {
                    this.reportClick(PlayerDataBase.userId, data);
                },
                fail: function() {
                    showAppMatrixWallWhenFail && AppMatrixWall.forceOpenView();
                }
            }));
        }
        static reportClick(uid, data, callback) {
            "undefined" != typeof wx ? this.reportClickWechat(uid, data, callback) : "undefined" != typeof qg ? this.reportClickOppo(uid, data, callback) : (console.log("reportClick", uid, data), 
            callback && callback());
        }
        static reportClickWechat(uid, data, callback) {
        }
        static reportClickOppo(uid, data, callback) {
        }
        static requestSwitchSettings(callback) {
            this._cacheSwitchSettings ? callback(null, this._cacheSwitchSettings) : "undefined" != typeof wx ? this.requestSwitchSettingsWechat(callback) : this.requestSwitchSettingsOppo(callback);
        }
        static requestSwitchSettingsWechat(callback) {
            callback && callback();
        }
        static requestSwitchSettingsOppo(callback) {
        }
        static reportOppoAdStatus(adId, type, callback) {
        }
        static getAdExceedStatus(adId) {
            return !0 === ZhiSheWanAd._adExceedStatus[adId];
        }
        static reportOppoLogin(token, callback) {
        }
        static isEnabledAppMatrix() {
            return true
        }
    }
    ZhiSheWanAd._cacheBoxData = null, ZhiSheWanAd._cacheSwitchSettings = null, ZhiSheWanAd._adExceedStatus = {};
    class SwitchSettings {
        static loadRemoteSettings() {
        }
        static _getSwitchItem(key) {
            let val = this.getSwitchSettings()[key];
            return void 0 === val && (val = DefaultSwitchSettings[key]), val;
        }
        static getSwitchSettings() {
            let switchSettings;
            return switchSettings = this._remoteSettings ? this._remoteSettings : DefaultSwitchSettings;
        }
        static setRemoteSettings(settings) {
            this._remoteSettings = settings;
        }
        static getShareInduce() {
            let settings = this.getSwitchSettings();
            return VERSION !== settings.reviewVer && settings.shareInduce;
        }
        static getNewUserForceShare() {
            return this._getSwitchItem("newUserForceShare");
        }
        static getShareMustSuccess() {
            return this._getSwitchItem("shareMustSuccess");
        }
        static setCityBannerCasualBlock(v) {
            this._cityBannerCasualBlock = v;
        }
        static getBannerCasualClick(key) {
            if (!this.getShareInduce()) return !1;
            if (this._getSwitchItem("disableIOSBannerCasualClick") && "ios" === PlatformUtils$1.getPlatform()) return !1;
            if (this._cityBannerCasualBlock) return !1;
            let bannerCasualClick = this._getSwitchItem("bannerCasualClick");
            if (bannerCasualClick && void 0 !== key) {
                let bannerCasualSettings = this._getSwitchItem("bannerCasualSettings");
                if (void 0 === bannerCasualSettings[key]) return bannerCasualClick;
                bannerCasualClick = !!bannerCasualSettings[key];
            }
            return bannerCasualClick;
        }
        static getBannerReuseTimes() {
            return this._getSwitchItem("bannerReuseTimes");
        }
        static getSkipButtonCtrl() {
            return this._getSwitchItem("skipButtonCtrl");
        }
        static getEnableInterstitialAd() {
            return this._getSwitchItem("enableInterstitialAd");
        }
        static getEnableTutorial() {
            return this._getSwitchItem("enableTutorial");
        }
        static getUseNativeAdCasual() {
            return !!this.getShareInduce() && (!this._cityBannerCasualBlock && this._getSwitchItem("useNativeAdCasual"));
        }
        static getFreeSpinMaxTimes() {
            return this._getSwitchItem("freeSpinMaxTimes");
        }
        static getShowPlayViewBanner() {
            return this._getSwitchItem("showPlayViewBanner");
        }
        static getAppMatrixWallInterval() {
            return this._getSwitchItem("appMatrixWallInterval");
        }
        static getEnableAppMatrix() {
            return !!this.getShareInduce() && this._getSwitchItem("enableAppMatrix");
        }
        static getEnableNativeAd() {
            return this._getSwitchItem("enableNativeAd");
        }
        static getEnableNativeAdMaskClick() {
            return this._getSwitchItem("enableNativeAdMaskClick");
        }
        static getEnableNativeAdAutoClick() {
            return this._getSwitchItem("enableNativeAdAutoClick");
        }
        static getNativeAdAutoClickInterval() {
            return this._getSwitchItem("nativeAdAutoClickInterval");
        }
        static getNativeAdAutoClickMinDuration() {
            return this._getSwitchItem("nativeAdAutoClickMinDuration");
        }
        static getWatchAdCDSec() {
            return this._getSwitchItem("watchAdCDSec");
        }
        static getCoinPerPickup() {
            return this._getSwitchItem("coinPerPickup");
        }
        static getCoinBuyPagePrice() {
            return this._getSwitchItem("coinBuyPagePrice");
        }
        static getAdBuyPagePrice() {
            return this._getSwitchItem("adBuyPagePrice");
        }
        static getNotEnoughCoinAward() {
            return this._getSwitchItem("notEnoughCoinAward");
        }
        static getBestCoinAward() {
            return this._getSwitchItem("bestCoinAward");
        }
        static getCoinAwardAmount() {
            return this._getSwitchItem("coinAwardAmount");
        }
        static getPowerResumeSec() {
            return this._getSwitchItem("powerResumeSec");
        }
        static getMaxDefender() {
            return this._getSwitchItem("maxDefender");
        }
        static getKillDefendersMaxTimes() {
            return this._getSwitchItem("killDefendersMax");
        }
        static getSkinTryOutOdds() {
            return this._getSwitchItem("skinTryOutOdds");
        }
    }
    SwitchSettings._remoteSettings = null, SwitchSettings._cityBannerCasualBlock = !1;
    var Browser = Laya.Browser;
    const MAX_BANNER_LOAD_COUNT = 2;
    let _lastBannerOpts, _loadedBanners = [], _currentBanner = null, _bannerStyleStack = [];
    class WechatBannerAd {
        constructor() {
            console.log("WechatBannerAd.constructor");
            for (let i = 0; i < WX_BANNER_AD_ID.length && !(i >= MAX_BANNER_LOAD_COUNT); i++) {
                let bannerId = WX_BANNER_AD_ID[i];
                this._createBannerAd(bannerId, !0);
            }
        }
        _createBannerAd(bannerId, isPreload) {
            if (void 0 === wx.createBannerAd) return console.log("banner广告初始化失败,微信版本太低"), null;
            if (isPreload && _loadedBanners.length >= MAX_BANNER_LOAD_COUNT) return console.log("已载入Banner数量已达上限"), 
            null;
            let sysInfo = wx.getSystemInfoSync(), {screenHeight: screenHeight} = sysInfo, banner = wx.createBannerAd({
                adUnitId: bannerId,
                style: {
                    width: 300,
                    top: screenHeight + 200,
                    left: 0
                }
            });
            return banner.bannerId = bannerId, banner.useTimes = 0, banner.onResize(() => {
                let style = banner.resizeToStyle;
                if (!style) return void console.warn("Banner.onResize失败, 无resizeToStyle");
                let sysInfo = wx.getSystemInfoSync(), {screenWidth: screenWidth, screenHeight: screenHeight} = sysInfo;
                "bottom" === style.posType ? (banner.style.left = (screenWidth - banner.style.realWidth) / 2, 
                banner.style.top = screenHeight - banner.style.realHeight) : "top" === style.posType && (banner.style.left = (screenWidth - banner.style.realWidth) / 2, 
                banner.style.top = 0), console.log("resizeBanner:", {
                    left: banner.style.left,
                    top: banner.style.top,
                    width: banner.style.width,
                    height: banner.style.height,
                    realWidth: banner.style.realWidth,
                    realHeight: banner.style.realHeight,
                    posType: style.posType,
                    refNode: style.refNode
                });
            }), banner.onLoad(() => {
                console.log("banner广告加载成功:" + bannerId), isPreload && (_loadedBanners.push(banner), 
                console.log(`成功预载Banner:${bannerId},剩余已预载Banner:${_loadedBanners.length}`)), isPreload || (banner.useTimes++, 
                banner.show(), _currentBanner = banner, console.log(`成功载入Banner, 并直接显示:${bannerId},剩余已预载Banner:${_loadedBanners.length}`), 
                this._preloadBanner());
            }), banner.onError(err => {
                console.log("banner加载失败:" + bannerId, err), isPreload || (_currentBanner = null);
            }), banner;
        }
        _isBannerIdLoaded(bannerId) {
            if (_currentBanner && _currentBanner.bannerId === bannerId) return !1;
            for (let j = 0; j < _loadedBanners.length; j++) {
                if (_loadedBanners[j].bannerId === bannerId) return !0;
            }
            return !1;
        }
        _getNotLoadedBannerId() {
            for (let i = 0; i < WX_BANNER_AD_ID.length; i++) {
                let bannerId = WX_BANNER_AD_ID[i];
                if (!this._isBannerIdLoaded(bannerId)) return bannerId;
            }
            return null;
        }
        _setBannerStyle(banner, style) {
            banner && (banner.resizeToStyle = style, banner.style.left = style.left, banner.style.top = style.top, 
            banner.style.width = style.width, void 0 !== style.height && (banner.style.height = style.height));
        }
        _preloadBanner() {
            console.log("预载Banner");
            let bannerId = this._getNotLoadedBannerId();
            bannerId ? this._createBannerAd(bannerId, !0) : console.log("所有BannerID都被预载, 无需再次预载");
        }
        _showBannerWithStyle(style) {
            let banner = _currentBanner;
            if (banner) banner.useTimes++, this._setBannerStyle(banner, style), banner.show(); else if (_loadedBanners.length > 0) banner = _loadedBanners[0], 
            _loadedBanners.splice(0, 1), console.log("从已预载Banner中取出一个, 剩余已预载Banner:" + _loadedBanners.length), 
            banner.useTimes++, this._setBannerStyle(banner, style), banner.show(), _currentBanner = banner, 
            this._preloadBanner(); else {
                console.log("没有找到已预载Banner, 实时创建一个");
                let bannerId = this._getNotLoadedBannerId();
                bannerId && (banner = this._createBannerAd(bannerId, !1), this._setBannerStyle(banner, style));
            }
            return banner;
        }
        _hideOrDestroyCurrentBanner() {
            _currentBanner && (_currentBanner.hide(), _currentBanner.useTimes >= SwitchSettings.getBannerReuseTimes() && (_currentBanner.destroy(), 
            _currentBanner = null, console.log("销毁Banner")));
        }
        getBannerStyle(opts) {
            if (void 0 === opts && (opts = {
                posType: "bottom"
            }), "node" !== opts.posType || opts.refNode || (console.warn("Banner位置设选项异常, 改为底部显示Banner", opts), 
            opts = {
                posType: "bottom"
            }), _lastBannerOpts && _lastBannerOpts.posType === opts.posType && _lastBannerOpts.refNode === opts.refNode) return Object.assign({}, _lastBannerOpts);
            let result, sysInfo = wx.getSystemInfoSync(), {screenWidth: screenWidth} = sysInfo;
            if ("top" === opts.posType) result = {
                width: screenWidth - .01 * Math.random(),
                top: 0,
                left: 0,
                height: 100 - .01 * Math.random(),
                posType: opts.posType
            }; else if ("bottom" === opts.posType) result = {
                width: screenWidth - .02 * Math.random(),
                top: 0,
                left: 0,
                height: 100 + .02 * Math.random(),
                posType: opts.posType
            }; else {
                let scaleX = Browser.clientWidth / Laya.stage.displayWidth, scaleY = Browser.clientHeight / Laya.stage.displayHeight, boundingBox = getSpriteStageBounds(opts.refNode), width = boundingBox.width * scaleX, height = boundingBox.height * scaleY, left = boundingBox.x * scaleX, top = boundingBox.y * scaleY;
                if (width < 300) {
                    console.warn("Banner参考节点宽度小于300, 自动扩充为300");
                    let diff = 300 - width;
                    width = 300, left -= diff / 2;
                }
                result = {
                    left: left,
                    top: top,
                    width: width,
                    height: height,
                    posType: opts.posType,
                    refNode: opts.refNode
                };
            }
            return _lastBannerOpts = result, result;
        }
        canShowBanner() {
            return _loadedBanners.length > 0;
        }
        showBannerAd(opts) {
            this._hideOrDestroyCurrentBanner();
            let style = this.getBannerStyle(opts), banner = this._showBannerWithStyle(style);
            return _bannerStyleStack.push(style), banner;
        }
        hideBannerAd(clearStack) {
            if (clearStack && (_bannerStyleStack = []), this._hideOrDestroyCurrentBanner(), 
            _bannerStyleStack.length > 0 && _bannerStyleStack.splice(_bannerStyleStack.length - 1, 1), 
            0 === _bannerStyleStack.length || clearStack) _lastBannerOpts = void 0; else {
                console.log("Banner堆非空, 恢复上一级样式");
                let style = _bannerStyleStack[_bannerStyleStack.length - 1];
                _currentBanner = null, this._showBannerWithStyle(style);
            }
        }
        setCurrentBannerStyle(opts) {
            let style = this.getBannerStyle(opts);
            this._showBannerWithStyle(style);
        }
        showCurrentBanner() {
            _currentBanner && _currentBanner.show();
        }
        hideCurrentBanner() {
            _currentBanner && _currentBanner.hide();
        }
    }
    class WechatInterstitialAd {
        constructor() {
            this._interstitialAd = null, this._adLoad = !1, this._isWaitingInterstitialAd = !1, 
            this.createInterstitialAd();
        }
        createInterstitialAd() {
            void 0 !== wx.createInterstitialAd && (this._interstitialAd = wx.createInterstitialAd({
                adUnitId: WX_INTERSTITIAL_AD_ID
            }), this._interstitialAd.onLoad(() => {
                console.log("插屏广告加载成功"), this._adLoad = !0;
            }), this._interstitialAd.onError(err => {
                this._adLoad = !1, console.log("插屏广告加载错误", err);
            }), this._interstitialAd.onClose(res => {
                console.log("插屏广告关闭", res), this._adLoad = !1, PlatformUtils$1.showCurrentBanner();
            }));
        }
        isWaitingInterstitialAd() {
            return this._isWaitingInterstitialAd;
        }
        isInterstitialAdLoad() {
            return this._adLoad || PlatformUtils$1.sendLogEvent("无可用插屏广告"), this._adLoad;
        }
        showInterstitialAd(logKey, callback) {
            if (!SwitchSettings.getEnableInterstitialAd()) return PlatformUtils$1.sendLogEvent("插屏广告被设为关闭"), 
            void (callback && callback());
            void 0 !== logKey && PlatformUtils$1.sendLogEvent("插屏广告开始 - " + logKey), void 0 !== this._interstitialAd ? this._adLoad && (this._isWaitingInterstitialAd = !0, 
            this._interstitialAd.show().then(res => {
                this._isWaitingInterstitialAd = !1, logKey && PlatformUtils$1.sendLogEvent("插屏广告成功" + logKey), 
                console.log("插屏广告成功", res), PlatformUtils$1.hideCurrentBanner(), callback && callback();
            }).catch(err => {
                this._isWaitingInterstitialAd = !1, console.log("激励插屏广告显示失败", err), callback && callback();
            })) : callback && callback();
        }
        updateInterstitialAdLastShowTime() {}
    }
    class WechatSubDomain {
        postMessageToSubDomain(msgType, data) {
            try {
                wx.getOpenDataContext().postMessage({
                    msgType: msgType,
                    data: JSON.stringify(data)
                });
            } catch (e) {
                console.error(e);
            }
        }
        reportScoresToSubDomain(data, opts) {
            let dataList = [], keys = Object.keys(data);
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i], value = data[key].toString();
                dataList.push({
                    key: key,
                    value: value
                });
            }
            0 !== dataList.length ? wx.setUserCloudStorage({
                KVDataList: dataList,
                success: res => {
                    opts.success && opts.success(res);
                },
                fail: res => {
                    opts.fail && opts.fail(res);
                }
            }) : opts.success && opts.success(dataList);
        }
    }
    function getUserInfo(callback) {
        console.log("getUserInfo"), wx.getUserInfo({
            success: res => {
                console.log("wx.getUserInfo成功:", res), PlayerDataBase.applyUserInfo(res.userInfo), 
                callback(LoginState);
            },
            fail: res => {
                (res.errMsg.indexOf("auth deny") > -1 || res.errMsg.indexOf("auth denied") > -1) && callback(LoginState);
            }
        });
    }
    class WechatLoginAndAuthorize {
        login(callback) {
            LoginState.isLogin ? callback(LoginState) : wx.login({
                success: function(res) {
                    console.log("微信登录成功:", res), LoginState.isLogin = !0, LoginState.loginCode = res.code, 
                    callback(LoginState);
                },
                fail: res => {
                    console.log("微信登录失败:", res), LoginState.isLogin = !1, callback(LoginState);
                }
            });
        }
        checkAuthorize(callback) {
            console.log("checkAuthorize"), LoginState.isAuthorize ? callback(LoginState) : wx.getSetting({
                success: res => {
                    console.log("wx.getSetting成功:", res);
                    let authSetting = res.authSetting;
                    if (!0 === authSetting["scope.userInfo"]) LoginState.isAuthorize = !0, getUserInfo(callback); else if (!1 === authSetting["scope.userInfo"]) LoginState.isAuthorize = !1, 
                    callback(LoginState); else {
                        let sysInfo = wx.getSystemInfoSync(), userInfoButton = null;
                        (userInfoButton = wx.createUserInfoButton({
                            type: "text",
                            text: "",
                            withCredentials: !0,
                            style: {
                                left: 0,
                                top: 0,
                                width: sysInfo.screenWidth,
                                height: sysInfo.screenHeight,
                                backgroundColor: "#00000000"
                            }
                        })).onTap(res => {
                            console.log(res), "getUserInfo:ok" === res.errMsg ? (console.log("授权用户信息"), LoginState.isAuthorize = !0, 
                            getUserInfo(callback), userInfoButton.destroy()) : (console.log("授权失败"), Toast.show('请首先点击屏幕\n授权使用"用户信息"'));
                        }), Toast.show('请首先点击屏幕\n授权使用"用户信息"');
                    }
                },
                fail: res => {
                    console.log("wx.getSetting失败:", res), LoginState.isAuthorize = !1, callback(LoginState);
                }
            });
        }
        loadUserInfo(callback) {
            getUserInfo(callback);
        }
        loadGameData(callback) {
            ApiCall.login((err, res) => {
                err ? (LoginState.gameServerLogin = !1, callback(LoginState)) : res.code === API_CODE.SUCCEED ? (LoginState.gameServerLogin = !0, 
                PlayerDataBase.setNetData(res), callback(LoginState)) : (LoginState.gameServerLogin = !1, 
                callback(LoginState));
            });
        }
    }
    class WechatVibrate extends VibrateBase {
        vibrateShort() {
            this.isVibrateEnable() && wx.vibrateShort({});
        }
        vibrateLong() {
        }
    }
    var SoundManager = Laya.SoundManager;
    class WechatVideoAd {
        constructor() {
            this._shortAdState = {
                isShort: !0,
                adHandel: null,
                isLoaded: !1
            }, this._longAdState = {
                isShort: !1,
                adHandel: null,
                isLoaded: !1
            }, this.createRewardedVideoAd(WX_VIDEO_AD_ID_SHORT, this._shortAdState), this.createRewardedVideoAd(WX_VIDEO_AD_ID_LONG, this._longAdState);
        }
        createRewardedVideoAd(adUnitId, adState) {
            adState.adHandel || void 0 !== wx.createRewardedVideoAd && (adState.adHandel = wx.createRewardedVideoAd({
                adUnitId: adUnitId
            }), adState.adHandel.onLoad(() => {
                console.log("Video广告加载成功", adUnitId), adState.isLoaded = !0;
            }), adState.adHandel.onError(err => {
                adState.isLoaded = !1, console.log(err);
            }));
        }
        showVideoAd(isShortAd, logKey, callback) {
            void 0 !== logKey && PlatformUtils$1.sendLogEvent("视频广告开始 - " + logKey);
            let adState = this.getAdState(isShortAd);
            adState.adHandel && (WechatVideoAd._videoOnCloseCallback = callback, WechatVideoAd._videoAdLogKey = logKey, 
            adState.isLoaded && (SoundManager.muted = !0, adState.adHandel.onClose(WechatVideoAd.onVideoAdClose), 
            WechatVideoAd._playingVideoAd = adState.adHandel, adState.adHandel.show().catch(err => {
                console.log("激励视频广告显示失败", err), adState.adHandel.load().then(() => {
                    adState.adHandel.show();
                }).catch(err => {
                    console.log(err);
                });
            })));
        }
        isVideoAdLoad(isShortAd) {
            let adState = this.getAdState(isShortAd);
            return adState.isLoaded || PlatformUtils$1.sendLogEvent("无可用视频广告"), adState.isLoaded;
        }
        static onVideoAdClose(res) {
            WechatVideoAd._playingVideoAd && (WechatVideoAd._playingVideoAd.offClose(WechatVideoAd.onVideoAdClose), 
            WechatVideoAd._playingVideoAd = null), SoundManager.muted = !1, res && res.isEnded || void 0 === res ? (WechatVideoAd._videoAdLogKey && PlatformUtils$1.sendLogEvent("视频广告结束(看完) - " + WechatVideoAd._videoAdLogKey, {
                isEnd: "true"
            }), WechatVideoAd._videoOnCloseCallback && (WechatVideoAd._videoOnCloseCallback(!0), 
            WechatVideoAd._videoOnCloseCallback = null)) : (WechatVideoAd._videoAdLogKey && PlatformUtils$1.sendLogEvent("视频广告结束(未看完) - " + WechatVideoAd._videoAdLogKey, {
                isEnd: "false"
            }), WechatVideoAd._videoOnCloseCallback && (WechatVideoAd._videoOnCloseCallback(!1), 
            WechatVideoAd._videoOnCloseCallback = null));
        }
        getAdState(isShortAd) {
            let adState = isShortAd ? this._shortAdState : this._longAdState;
            return adState.adHandel ? adState : (isShortAd = !isShortAd, this.getAdState(isShortAd));
        }
    }
    WechatVideoAd._videoOnCloseCallback = null, WechatVideoAd._playingVideoAd = null, 
    WechatVideoAd._videoAdLogKey = null;
    class WechatMisc {
        constructor() {
            this._gameClubButton = null, this._onShowRes = {
                query: {},
                referrerInfo: {},
                scene: 0,
                shareTicket: 0
            }, this._openSettingButton = null;
        }
        showGameClubButton() {
            if (!wx.createGameClubButton) return;
            let sysInfo = wx.getSystemInfoSync();
            this._gameClubButton ? this._gameClubButton.show() : this._gameClubButton = wx.createGameClubButton({
                icon: "white",
                style: {
                    left: 20,
                    top: sysInfo.windowHeight - 130,
                    width: 30,
                    height: 30
                }
            });
        }
        hideGameClubButton() {
            this._gameClubButton && (this._gameClubButton.destroy(), this._gameClubButton = null);
        }
        showOpenSettingButton(text, callback) {
            if (void 0 !== wx.createOpenSettingButton && !this._openSettingButton) {
                let sysInfo = wx.getSystemInfoSync(), width = 515, left = (sysInfo.windowWidth - 515) / 2, height = 65, top = sysInfo.windowHeight - .2 * sysInfo.windowHeight - height / 2;
                this._openSettingButton = wx.createOpenSettingButton({
                    type: "text",
                    text: text,
                    style: {
                        left: left,
                        top: top,
                        width: width,
                        height: height,
                        lineHeight: height,
                        color: "#ffffff",
                        textAlign: "center",
                        fontSize: 26,
                        backgroundColor: "#000000dd"
                    }
                }), this._openSettingButton.onTap(() => {
                    this._openSettingButton.destroy(), this._openSettingButton = null, callback && callback(LoginState);
                });
            }
        }
        hideOpenSettingButton() {
            this._openSettingButton && (this._openSettingButton.destroy(), this._openSettingButton = null);
        }
        checkGameUpdate() {
            if ("function" == typeof wx.getUpdateManager) {
                const updateManager = wx.getUpdateManager();
                updateManager.onCheckForUpdate(function(res) {
                    console.log(res.hasUpdate);
                }), updateManager.onUpdateReady(function() {
                    updateManager.applyUpdate();
                }), updateManager.onUpdateFailed(function() {});
            }
        }
        openSetting(callback) {
            wx.openSetting({
                success: res => {
                    console.log("wx.openSetting成功:", res), !0 === res.authSetting["scope.userInfo"] ? (LoginState.isAuthorize = !0, 
                    getUserInfo(callback)) : (LoginState.isAuthorize = !1, callback(LoginState));
                },
                fail: res => {
                    console.log("wx.openSetting失败:", res), LoginState.isAuthorize = !1, callback(LoginState);
                }
            });
        }
        canSaveToAlbum(callback) {
            wx.getSetting({
                success: res => {
                    console.log("wx.getSetting成功:", res);
                    let authSetting = res.authSetting;
                    !0 === authSetting["scope.writePhotosAlbum"] ? callback && callback(!0) : !1 === authSetting["scope.writePhotosAlbum"] ? callback && callback(!1) : wx.authorize({
                        scope: "scope.writePhotosAlbum",
                        success: res => {
                            console.log("wx.authorize成功:", res), callback && callback(!0);
                        },
                        fail: function(res) {
                            (res.errMsg.indexOf("auth deny") > -1 || res.errMsg.indexOf("auth denied") > -1) && callback && callback(!1);
                        }
                    });
                },
                fail: res => {
                    console.log("wx.getSetting失败:", res), callback && callback(!1);
                }
            });
        }
        saveToAlbum(callback) {
            let tempFilePath = Laya.Browser.window.canvas.toTempFilePathSync({});
            wx.saveImageToPhotosAlbum({
                filePath: tempFilePath,
                success: () => {
                    callback && callback(!0);
                },
                fail: () => {
                    callback && callback(!1);
                }
            });
        }
        openSettingWithScope(scope, callback) {
            wx.openSetting({
                success: res => {
                    console.log("wx.openSetting成功:", res), !0 === res.authSetting.scope ? callback && callback(!0) : callback && callback(!1);
                },
                fail: res => {
                    console.log("wx.openSetting失败:", res), callback && callback(!1);
                }
            });
        }
        openCustomerService(callback) {
            let shareInfo = WX_DEFAULT_SHARE_INFO;
            wx.openCustomerServiceConversation({
                showMessageCard: !0,
                sendMessageTitle: shareInfo.title,
                sendMessageImg: shareInfo.imageUrl,
                sendMessagePath: "",
                success: res => {
                    console.log("openCustomerService.success", res), callback && callback(!0);
                },
                fail: res => {
                    console.log("openCustomerService.fail", res), callback && callback(!1);
                },
                complete: res => {
                    console.log("openCustomerService.complete", res);
                }
            });
        }
        getOnShowRes() {
            return this._onShowRes;
        }
        setOnShowRes(res) {
            if (this._onShowRes.scene = res.scene, this._onShowRes.query = res.query, this._onShowRes.shareTicket = res.shareTicket, 
            this._onShowRes.referrerInfo = res.referrerInfo, void 0 === res.shareTicket) {
                let launchOption = wx.getLaunchOptionsSync();
                this._onShowRes.shareTicket = launchOption.shareTicket;
            }
        }
        getPlatform() {
            return wx.getSystemInfoSync().platform;
        }
        installShortcut(callback) {
            callback && callback(!0);
        }
        hasShortcutInstalled(callback) {
            callback && callback(!0);
        }
        setLoadingProgress(progress) {}
        loadingComplete(callback) {
            callback && callback();
        }
    }
    const minShareDiffSec = 5;
    class WechatShareToFriends {
        shareToFriends(opts, shareParams) {
        }
    }
    class WechatALDLog {
        sendLogEvent(eventName, data) {
            console.log("sendLogEvent", eventName, data);
            let toSendData = void 0;
            if ("object" == typeof data) {
                toSendData = {};
                let keys = Object.keys(data);
                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i];
                    toSendData[key] = JSON.stringify(data[key]);
                }
            }
            wx.aldSendEvent(eventName, toSendData);
        }
        logStageStart(stageId, stageName) {
            console.log("onStageStart", stageId, stageName), wx.aldStage.onStart({
                stageId: stageId.toString(),
                stageName: stageName,
                userId: PlayerDataBase.userId
            });
        }
        logStageEnd(stageId, stageName, complete, descString) {
            console.log("onStageEnd", stageId, stageName, complete, descString), wx.aldStage.onEnd({
                stageId: stageId,
                stageName: stageName,
                userId: PlayerDataBase.userId,
                event: complete ? "complete" : "fail",
                params: {
                    desc: descString
                }
            });
        }
    }
    class WechatNativeAd {
        isSupportNativeAd() {
            return !1;
        }
        reportAdShow(adData) {
            console.log("reportAdShow", adData);
        }
        reportAdClick(adData) {
            console.log("reportAdClick", adData);
        }
        isNativeAdLoaded() {
            return !1;
        }
        getNativeAdData() {
            return null;
        }
        destroyNativeAdDataAndPreloadNext(adData) {}
    }
    var Browser$1 = Laya.Browser;
    class WechatGameIcon {
        showGameIcon(opts) {
            let styles = this.getIconStyles(opts);
            return this._showGameIconWithStyles(styles);
        }
        hideGameIcon(iconHandle) {
            iconHandle && iconHandle.destroy();
        }
        _showGameIconWithStyles(styles) {
            if (void 0 === wx.createGameIcon) return console.log("icon推荐位初始化失败,微信版本太低"), null;
            let icon = wx.createGameIcon({
                adUnitId: WX_GAME_ICON_ID,
                count: styles.length,
                style: styles
            });
            return icon.onLoad(() => {
                console.log("icon推荐位加载成功"), icon.show();
            }), icon.onError(err => {
                console.log("icon加载失败:", err);
            }), icon.load(), icon;
        }
        getIconStyles(opts) {
            let scaleX = Browser$1.clientWidth / Laya.stage.displayWidth, scaleY = Browser$1.clientHeight / Laya.stage.displayHeight, styles = [];
            for (let i = 0; i < opts.iconsRef.length; i++) {
                let boundingBox = getSpriteStageBounds(opts.iconsRef[i]), width = boundingBox.width * scaleX, height = boundingBox.height * scaleY, size = Math.min(width, height), left = boundingBox.x * scaleX, top = boundingBox.y * scaleY;
                if (size < 50) {
                    console.warn("Icon参考节点宽度小于50, 自动扩充为50");
                    let diff = 50 - size;
                    size = 50, left -= diff / 2;
                }
                styles.push({
                    left: left,
                    top: top,
                    size: size,
                    appNameHidden: opts.appNameHidden,
                    borderWidth: opts.borderWidth,
                    borderColor: opts.borderColor,
                    color: opts.color
                });
            }
            return styles;
        }
    }
    var Browser$2 = Laya.Browser;
    const MAX_BANNER_LOAD_COUNT$1 = 2;
    let _lastBannerOpts$1, _loadedBanners$1 = [], _currentBanner$1 = null, _bannerStyleStack$1 = [];
    class WechatGameBanner {
        constructor() {
            console.log("WechatGameBanner.constructor");
            for (let i = 0; i < WX_GAME_BANNER_ID.length && !(i >= MAX_BANNER_LOAD_COUNT$1); i++) {
                let bannerId = WX_GAME_BANNER_ID[i];
                this._createGameBanner(bannerId, !0);
            }
        }
        showGameBanner(opts) {
            this._hideOrDestroyCurrentBanner();
            let style = this.getBannerStyle(opts), banner = this._showBannerWithStyle(style);
            return _bannerStyleStack$1.push(style), banner;
        }
        hideGameBanner(clearStack) {
            if (clearStack && (_bannerStyleStack$1 = []), this._hideOrDestroyCurrentBanner(), 
            _bannerStyleStack$1.length > 0 && _bannerStyleStack$1.splice(_bannerStyleStack$1.length - 1, 1), 
            0 === _bannerStyleStack$1.length || clearStack) _lastBannerOpts$1 = void 0; else {
                console.log("Banner堆非空, 恢复上一级样式");
                let style = _bannerStyleStack$1[_bannerStyleStack$1.length - 1];
                _currentBanner$1 = null, this._showBannerWithStyle(style);
            }
        }
        setCurrentGameBannerStyle(opts) {
            let style = this.getBannerStyle(opts);
            this._showBannerWithStyle(style);
        }
        showCurrentGameBanner() {
            _currentBanner$1 && _currentBanner$1.show();
        }
        hideCurrentGameBanner() {
            _currentBanner$1 && _currentBanner$1.hide();
        }
        _createGameBanner(bannerId, isPreload) {
            if (void 0 === wx.createGameBanner) return console.log("banner推荐位初始化失败,微信版本太低"), 
            null;
            if (isPreload && _loadedBanners$1.length >= MAX_BANNER_LOAD_COUNT$1) return console.log("已载入Banner数量已达上限"), 
            null;
            let sysInfo = wx.getSystemInfoSync(), {screenHeight: screenHeight} = sysInfo, banner = wx.createGameBanner({
                adUnitId: bannerId,
                style: {
                    top: screenHeight + 200,
                    left: 0
                }
            });
            return banner.bannerId = bannerId, banner.useTimes = 0, banner.onResize(() => {
                let style = banner.resizeToStyle;
                if (!style) return void console.warn("Banner.onResize失败, 无resizeToStyle");
                let sysInfo = wx.getSystemInfoSync(), {screenWidth: screenWidth, screenHeight: screenHeight} = sysInfo;
                "bottom" === style.posType ? (banner.style.left = (screenWidth - banner.style.width) / 2, 
                banner.style.top = screenHeight - banner.style.height) : "top" === style.posType ? (banner.style.left = (screenWidth - banner.style.width) / 2, 
                banner.style.top = 0) : (banner.style.left = style.left, banner.style.top = style.top), 
                console.log("resizeBanner:", {
                    left: banner.style.left,
                    top: banner.style.top,
                    width: banner.style.width,
                    height: banner.style.height,
                    posType: style.posType,
                    refNode: style.refNode
                });
            }), banner.onLoad(() => {
                console.log("banner广告加载成功:" + bannerId), isPreload && (_loadedBanners$1.push(banner), 
                console.log(`成功预载Banner:${bannerId},剩余已预载Banner:${_loadedBanners$1.length}`)), isPreload || (banner.useTimes++, 
                banner.show(), _currentBanner$1 = banner, console.log(`成功载入Banner, 并直接显示:${bannerId},剩余已预载Banner:${_loadedBanners$1.length}`), 
                this._preloadBanner());
            }), banner.onError(err => {
                console.log("banner加载失败:" + bannerId, err), isPreload || (_currentBanner$1 = null);
            }), banner;
        }
        _isBannerIdLoaded(bannerId) {
            if (_currentBanner$1 && _currentBanner$1.bannerId === bannerId) return !1;
            for (let j = 0; j < _loadedBanners$1.length; j++) {
                if (_loadedBanners$1[j].bannerId === bannerId) return !0;
            }
            return !1;
        }
        _getNotLoadedBannerId() {
            for (let i = 0; i < WX_GAME_BANNER_ID.length; i++) {
                let bannerId = WX_GAME_BANNER_ID[i];
                if (!this._isBannerIdLoaded(bannerId)) return bannerId;
            }
            return null;
        }
        _setBannerStyle(banner, style) {
            banner && (banner.resizeToStyle = style, banner.style.left = style.left, banner.style.top = style.top);
        }
        _preloadBanner() {
            console.log("预载Banner");
            let bannerId = this._getNotLoadedBannerId();
            bannerId ? this._createGameBanner(bannerId, !0) : console.log("所有BannerID都被预载, 无需再次预载");
        }
        _showBannerWithStyle(style) {
            let banner = _currentBanner$1;
            if (banner) banner.useTimes++, banner.show(); else if (_loadedBanners$1.length > 0) banner = _loadedBanners$1[0], 
            _loadedBanners$1.splice(0, 1), console.log("从已预载Banner中取出一个, 剩余已预载Banner:" + _loadedBanners$1.length), 
            banner.useTimes++, banner.show(), _currentBanner$1 = banner, this._preloadBanner(); else {
                console.log("没有找到已预载Banner, 实时创建一个");
                let bannerId = this._getNotLoadedBannerId();
                bannerId && (banner = this._createGameBanner(bannerId, !1));
            }
            return banner && this._setBannerStyle(banner, style), banner;
        }
        _hideOrDestroyCurrentBanner() {
            _currentBanner$1 && (_currentBanner$1.hide(), _currentBanner$1.useTimes >= SwitchSettings.getBannerReuseTimes() && (_currentBanner$1.destroy(), 
            _currentBanner$1 = null, console.log("销毁Banner")));
        }
        getBannerStyle(opts) {
            if (void 0 === opts && (opts = {
                posType: "bottom"
            }), "node" !== opts.posType || opts.refNode || (console.warn("Banner位置设选项异常, 改为底部显示Banner", opts), 
            opts = {
                posType: "bottom"
            }), _lastBannerOpts$1 && _lastBannerOpts$1.posType === opts.posType && _lastBannerOpts$1.refNode === opts.refNode) return Object.assign({}, _lastBannerOpts$1);
            let result;
            wx.getSystemInfoSync();
            if ("top" === opts.posType) result = {
                top: 0,
                left: 0,
                posType: opts.posType
            }; else if ("bottom" === opts.posType) result = {
                top: 0,
                left: 0,
                posType: opts.posType
            }; else {
                let scaleX = Browser$2.clientWidth / Laya.stage.displayWidth, scaleY = Browser$2.clientHeight / Laya.stage.displayHeight, boundingBox = getSpriteStageBounds(opts.refNode), width = boundingBox.width * scaleX, left = (boundingBox.height, 
                boundingBox.x * scaleX), top = boundingBox.y * scaleY;
                if (width < 343) {
                    console.warn("Banner参考节点宽度小于343, 自动扩充为343");
                    let diff = 343 - width;
                    width = 343, left -= diff / 2;
                }
                result = {
                    left: left,
                    top: top,
                    posType: opts.posType,
                    refNode: opts.refNode
                };
            }
            return _lastBannerOpts$1 = result, result;
        }
    }
    class WechatImpl extends ImplBase {
        init() {
            this._bannerAd = new WechatBannerAd(), this._videoAd = new WechatVideoAd(), this._nativeAd = new WechatNativeAd(), 
            this._interstitialAd = new WechatInterstitialAd(), this._loginAndAuthorize = new WechatLoginAndAuthorize(), 
            this._shareToFriends = new WechatShareToFriends(), this._subDomain = new WechatSubDomain(), 
            this._vibrate = new WechatVibrate(), this._log = new WechatALDLog(), this._misc = new WechatMisc(), 
            this._gameIcon = new WechatGameIcon(), this._gameBanner = new WechatGameBanner(), 
            wx.onShow(res => {
                console.log("wx.onShow", res), this._misc.setOnShowRes(res), EventManager.dispatchEvent(CommonEvents.GAME_ON_SHOW);
            }), wx.onHide(() => {
                console.log("wx.onHide"), PlayerDataBase.userId && (PlayerDataBase.saveExitTime(), 
                PlayerDataBase.saveData(!0)), EventManager.dispatchEvent(CommonEvents.GAME_ON_HIDE);
            }), wx.showShareMenu({
                withShareTicket: !0
            }), wx.aldOnShareAppMessage(function() {
                let shareInfo = WX_DEFAULT_SHARE_INFO;
                return {
                    title: shareInfo.title,
                    imageUrl: shareInfo.imageUrl
                };
            });
        }
    }
    var SoundManager$1 = Laya.SoundManager;
    class OppoVideoAd {
        constructor() {
            this._adState = {
                adHandel: null,
                isLoaded: !1
            }, this.createRewardedVideoAd(OPPO_VIDEO_AD_ID, this._adState);
        }
        createRewardedVideoAd(posId, adState) {
            adState.adHandel || void 0 !== qg.createRewardedVideoAd && (adState.adHandel = qg.createRewardedVideoAd({
                posId: posId
            }), adState.adHandel.onLoad(() => {
                console.log("Video广告加载成功", posId), adState.isLoaded = !0;
            }), adState.adHandel.onError(err => {
                adState.isLoaded = !1, console.log("Video广告加载失败", err);
            }), adState.adHandel.onVideoStart(() => {
                console.log("激励视频 开始播放"), adState.isLoaded = !1;
            }), adState.adHandel.load());
        }
        showVideoAd(isShortAd, logKey, callback) {
            void 0 !== logKey && PlatformUtils$1.sendLogEvent("视频广告开始 - " + logKey);
            let adState = this.getAdState(isShortAd);
            adState.adHandel && (OppoVideoAd._videoOnCloseCallback = callback, OppoVideoAd._videoAdLogKey = logKey, 
            adState.isLoaded && (SoundManager$1.muted = !0, adState.adHandel.onClose(OppoVideoAd.onVideoAdClose), 
            OppoVideoAd._playingVideoAd = adState.adHandel, adState.adHandel.show()));
        }
        isVideoAdLoad(isShortAd) {
            let adState = this.getAdState(isShortAd);
            return adState.isLoaded || PlatformUtils$1.sendLogEvent("无可用视频广告"), adState.isLoaded;
        }
        static onVideoAdClose(res) {
            OppoVideoAd._playingVideoAd && (OppoVideoAd._playingVideoAd.offClose(OppoVideoAd.onVideoAdClose), 
            OppoVideoAd._playingVideoAd.load(), OppoVideoAd._playingVideoAd = null), SoundManager$1.muted = !1, 
            res && res.isEnded ? (OppoVideoAd._videoAdLogKey && PlatformUtils$1.sendLogEvent("视频广告结束(看完) - " + OppoVideoAd._videoAdLogKey, {
                isEnd: "true"
            }), OppoVideoAd._videoOnCloseCallback && (OppoVideoAd._videoOnCloseCallback(!0), 
            OppoVideoAd._videoOnCloseCallback = null)) : (OppoVideoAd._videoAdLogKey && PlatformUtils$1.sendLogEvent("视频广告结束(未看完) - " + OppoVideoAd._videoAdLogKey, {
                isEnd: "false"
            }), OppoVideoAd._videoOnCloseCallback && (OppoVideoAd._videoOnCloseCallback(!1), 
            OppoVideoAd._videoOnCloseCallback = null));
        }
        getAdState(isShortAd) {
            return this._adState;
        }
    }
    OppoVideoAd._videoOnCloseCallback = null, OppoVideoAd._playingVideoAd = null, OppoVideoAd._videoAdLogKey = null;
    let _currentShowBanner = null, _bannerIdIndex = -1, _banners = {};
    class OppoBannerAd {
        constructor() {
            this._needShow = !1;
        }
        canShowBanner() {
            return !0;
        }
        showBannerAd(opts) {
            if (!_currentShowBanner) return this._showBanner();
        }
        hideBannerAd(clearStack) {
            this._needShow = !1, _currentShowBanner && (_currentShowBanner.hide(), _currentShowBanner = null, 
            console.log("销毁Banner"));
        }
        setCurrentBannerStyle(opts) {
            this._showBanner();
        }
        showCurrentBanner() {
            this._needShow = !0, _currentShowBanner && _currentShowBanner.show();
        }
        hideCurrentBanner() {
            this._needShow = !1, _currentShowBanner && _currentShowBanner.hide();
        }
        _createBannerAd(bannerId) {
            if (!bannerId) return null;
            if (void 0 === qg.createBannerAd) return console.log("banner广告初始化失败,版本太低"), null;
            let banner = _banners[bannerId];
            return banner || (banner = qg.createBannerAd({
                posId: bannerId
            }), _banners[bannerId] = banner, banner.bannerId = bannerId, banner.onShow(() => {
                console.log("banner显示成功"), this._needShow ? (_currentShowBanner && _currentShowBanner !== banner && (_currentShowBanner.hide(), 
                _currentShowBanner = null, console.log("销毁Banner")), _currentShowBanner = banner) : (console.log("当前Banner无需显示, 自动隐藏"), 
                Laya.timer.once(10, this, () => {
                    banner.hide();
                }));
            }), banner.onError(err => {
                console.log("banner加载失败:" + bannerId, err);
            })), banner;
        }
        _showBanner() {
            let banner = _currentShowBanner;
            if (this._needShow = !0, banner) banner.show(); else {
                console.log("没有找到已预载Banner, 实时创建一个");
                let bannerId = this.getNextBannerId();
                (banner = this._createBannerAd(bannerId)) && banner.show();
            }
            return banner;
        }
        getNextBannerId() {
            return -1 == _bannerIdIndex ? _bannerIdIndex = 0 : ++_bannerIdIndex >= OPPO_BANNER_AD_ID.length && (_bannerIdIndex = 0), 
            OPPO_BANNER_AD_ID[_bannerIdIndex];
        }
    }
    const LAST_SHOW_TIME = "lastInterstitialAdShowTime", SHOW_TIMES = "InterstitialAdShowTimes";
    class OppoInterstitialAd {
        constructor() {
            this._interstitialAd = null, this._adLoad = !1, this._isWaitingInterstitialAd = !1, 
            this.createInterstitialAd();
        }
        createInterstitialAd() {
            void 0 !== qg.createInsertAd && (this._interstitialAd = qg.createInsertAd({
                posId: OPPO_INTERSTITIAL_AD_ID
            }), this._interstitialAd.onLoad(() => {
                console.log("插屏广告加载成功"), this._adLoad = !0;
            }), this._interstitialAd.onError(err => {
                this._isWaitingInterstitialAd && (console.log("激励插屏广告显示失败", err), OppoInterstitialAd._onCloseCallback && OppoInterstitialAd._onCloseCallback(), 
                OppoInterstitialAd._adLogKey && PlatformUtils$1.sendLogEvent("插屏广告成功" + OppoInterstitialAd._adLogKey)), 
                OppoInterstitialAd._onCloseCallback = null, OppoInterstitialAd._adLogKey = null, 
                this._isWaitingInterstitialAd = !1, this._adLoad = !1, console.log("插屏广告加载错误", err);
            }), this._interstitialAd.onShow(() => {
                console.log("插屏广告展示"), this._isWaitingInterstitialAd = !1, this._adLoad = !1, PlatformUtils$1.hideCurrentBanner(), 
                OppoInterstitialAd._adLogKey && (PlatformUtils$1.sendLogEvent("插屏广告成功" + OppoInterstitialAd._adLogKey), 
                OppoInterstitialAd._adLogKey = null), this._interstitialAd.load();
            }), this._interstitialAd.onClose(() => {
                console.log("插屏广告关闭"), this._adLoad = !1, PlatformUtils$1.showCurrentBanner(), OppoInterstitialAd._onCloseCallback && (OppoInterstitialAd._onCloseCallback(), 
                OppoInterstitialAd._onCloseCallback = null), this._interstitialAd.load();
            }), this._interstitialAd.load());
        }
        isWaitingInterstitialAd() {
            return this._isWaitingInterstitialAd;
        }
        isInterstitialAdLoad() {
            return this._adLoad || PlatformUtils$1.sendLogEvent("无可用插屏广告"), this._adLoad;
        }
        showInterstitialAd(logKey, callback) {
            if (!SwitchSettings.getEnableInterstitialAd()) return PlatformUtils$1.sendLogEvent("插屏广告被设为关闭"), 
            void (callback && callback());
            void 0 !== logKey && PlatformUtils$1.sendLogEvent("插屏广告开始 - " + logKey), this.canShow() ? (this._isWaitingInterstitialAd = !0, 
            OppoInterstitialAd._onCloseCallback = callback, OppoInterstitialAd._adLogKey = logKey, 
            this._interstitialAd.show(), OppoInterstitialAd.updateInterstitialAdLastShowTime(), 
            OppoInterstitialAd.incTodayShowTimes()) : callback && callback();
        }
        static updateInterstitialAdLastShowTime() {
            let time = new Date().getTime();
            LocalData.setItem(LAST_SHOW_TIME, time);
        }
        updateInterstitialAdLastShowTime() {
            OppoInterstitialAd.updateInterstitialAdLastShowTime();
        }
        static getTodayShowTimes() {
            return DailyReset.load(SHOW_TIMES, {
                times: 0
            }).times;
        }
        static incTodayShowTimes() {
            let showTimes = DailyReset.load(SHOW_TIMES, {
                times: 0
            });
            showTimes.times++, DailyReset.save(SHOW_TIMES, showTimes);
        }
        canShow() {
            let can = !0;
            return this._interstitialAd && this._adLoad && this.isIntervalOk() || (can = !1), 
            this._interstitialAd && !this._adLoad && this._interstitialAd.load(), can;
        }
        isIntervalOk() {
            let secDiff = (new Date().getTime() - LocalData.getItem(LAST_SHOW_TIME, new Date().getTime())) / 1e3, todayShowTimes = OppoInterstitialAd.getTodayShowTimes();
            if (todayShowTimes >= 8) return console.log("当日插屏广告显示次数操过8次"), !1;
            {
                let interval = 60;
                todayShowTimes < 6 ? interval = 60 : todayShowTimes >= 6 && (interval = 30);
                let ret = secDiff >= interval;
                return ret || console.log("插屏广告显示间隔过小:", secDiff, interval), ret;
            }
        }
    }
    OppoInterstitialAd._onCloseCallback = null, OppoInterstitialAd._adLogKey = null;
    class OppoVibrate extends VibrateBase {
        vibrateShort() {
            this.isVibrateEnable() && qg.vibrateShort({});
        }
        vibrateLong() {
        }
    }
    class OppoMisc {
        constructor() {
            this._onShowRes = {
                query: {},
                referrerInfo: {}
            };
        }
        showGameClubButton() {}
        hideGameClubButton() {}
        showOpenSettingButton(text, callback) {
            callback && callback(!0);
        }
        hideOpenSettingButton() {}
        checkGameUpdate() {}
        openSetting(callback) {
            callback && callback(!0);
        }
        canSaveToAlbum(callback) {
            callback && callback(!0);
        }
        saveToAlbum(callback) {
            callback && callback(!0);
        }
        openSettingWithScope(scope, callback) {
            callback && callback(!0);
        }
        openCustomerService(callback) {
            callback && callback(!0);
        }
        getOnShowRes() {
            return this._onShowRes;
        }
        setOnShowRes(res) {
            this._onShowRes.query = res.query, this._onShowRes.referrerInfo = res.referrerInfo;
        }
        getPlatform() {
            return qg.getSystemInfoSync().platform;
        }
        installShortcut(callback) {
            qg.installShortcut({
                success: function() {
                    callback && callback(!0);
                },
                fail: function(err) {
                    callback && callback(!1);
                }
            });
        }
        hasShortcutInstalled(callback) {
            qg.hasShortcutInstalled({
                success: function(res) {
                    callback && callback(res);
                },
                fail: function() {
                    callback && callback(!1);
                }
            });
        }
        setLoadingProgress(progress) {
            qg.setLoadingProgress({
                progress: progress
            });
        }
        loadingComplete(callback) {
            callback && callback(), qg.loadingComplete({
                success: function(res) {
                    console.log("qg.loadingComplete success", res);
                },
                fail: function(res) {
                    console.log("qg.loadingComplete fail", res);
                },
                complete: function(res) {
                    console.log("qg.loadingComplete complete", res);
                }
            });
        }
    }
    class OppoLoginAndAuthorize {
        login(callback) {
            LoginState.isLogin ? callback(LoginState) : qg.login({
                success: function(res) {
                    console.log("OPPO登录成功:", res), LoginState.isLogin = !0, LoginState.loginCode = res.token;
                    let userInfo = {
                        id: "none",
                        name: res.nickName,
                        avatarUrl: res.avatar
                    };
                    ZhiSheWanAd.reportOppoLogin(LoginState.loginCode, userId => {
                        userInfo.id = userId, PlayerDataBase.applyUserInfo(userInfo), callback(LoginState);
                    });
                },
                fail: res => {
                    console.log("OPPO登录失败:", res), LoginState.isLogin = !1, callback(LoginState);
                }
            });
        }
        checkAuthorize(callback) {
            LoginState.isAuthorize = !0, callback && callback(LoginState);
        }
        loadUserInfo(callback) {
            LoginState.isAuthorize = !0, callback && callback(LoginState);
        }
        loadGameData(callback) {
            ApiCall.login((err, res) => {
                err ? (LoginState.gameServerLogin = !1, callback(LoginState)) : res.code === API_CODE.SUCCEED ? (LoginState.gameServerLogin = !0, 
                PlayerDataBase.setNetData(res), callback(LoginState)) : (LoginState.gameServerLogin = !1, 
                callback(LoginState));
            });
        }
    }
    const MAX_LOAD_COUNT = 2;
    let _loadedAds = [], _nativeAds = {};
    class OppoNativeAd {
        constructor() {
            console.log("OppoBannerAd.constructor");
            for (let i = 0; i < OPPO_NATIVE_AD_ID.length && !(i >= MAX_LOAD_COUNT); i++) {
                let bannerId = OPPO_NATIVE_AD_ID[i];
                this._createNativeAd(bannerId);
            }
        }
        isSupportNativeAd() {
            return !0;
        }
        isNativeAdLoaded() {
            let isLoaded = _loadedAds.length > 0;
            return isLoaded || this._preloadNativeAd(), isLoaded;
        }
        getNativeAdData() {
            return _loadedAds.length > 0 ? _loadedAds[0] : null;
        }
        destroyNativeAdDataAndPreloadNext(adData) {
            if (adData) {
                let index = _loadedAds.indexOf(adData);
                -1 !== index && _loadedAds.splice(index, 1);
            }
            this._preloadNativeAd();
        }
        reportAdShow(adData) {
            console.log("reportAdShow", adData), adData && (ZhiSheWanAd.reportOppoAdStatus(adData.adId, AD_STATUS_TYPE.DISPLAY, isExceed => {}), 
            adData.nativeAd.reportAdShow({
                adId: adData.adDataId
            }));
        }
        reportAdClick(adData) {
            console.log("reportAdClick", adData), adData && (adData.nativeAd.reportAdClick({
                adId: adData.adDataId
            }), ZhiSheWanAd.reportOppoAdStatus(adData.adId, AD_STATUS_TYPE.CLICK, isExceed => {}), 
            this.destroyNativeAdDataAndPreloadNext(adData));
        }
        _createNativeAd(adId) {
            let nativeAd = _nativeAds[adId];
            if (!nativeAd) {
                if (void 0 === qg.createNativeAd) return console.log("原生广告初始化失败,版本太低"), null;
                if (_loadedAds.length >= MAX_LOAD_COUNT) return console.log("已载入原生广告数量已达上限"), null;
                nativeAd = qg.createNativeAd({
                    posId: adId
                }), _nativeAds[adId] = nativeAd, nativeAd.onError(err => {
                    console.log("原生广告加载失败:" + adId, err);
                }), nativeAd.onLoad(res => {
                    console.log("原生广告加载成功:", res);
                    let adList = res.adList;
                    if (adList.length > 0) {
                        let adListItem = adList[0], adData = {
                            nativeAd: nativeAd,
                            adId: adId,
                            adDataId: adListItem.adId,
                            title: adListItem.title,
                            desc: adListItem.desc,
                            iconUrlList: adListItem.iconUrlList,
                            imgUrlList: adListItem.imgUrlList,
                            logoUrl: adListItem.logoUrl,
                            clickBtnTxt: adListItem.clickBtnTxt,
                            creativeType: adListItem.creativeType,
                            interactionType: adListItem.interactionType
                        };
                        _loadedAds.push(adData);
                    }
                });
            }
            return nativeAd.load(), nativeAd;
        }
        _isAdLoaded(adId) {
            for (let j = 0; j < _loadedAds.length; j++) {
                if (_loadedAds[j].adId === adId) return !0;
            }
            return !1;
        }
        _preloadNativeAd() {
            console.log("预载原生广告");
            for (let i = 0; i < OPPO_NATIVE_AD_ID.length; i++) {
                let adId = OPPO_NATIVE_AD_ID[i];
                this._isAdLoaded(adId) || this._createNativeAd(adId);
            }
        }
    }
    class OppoImpl extends ImplBase {
        init() {
            qg.initAdService({
                appId: OPPO_APP_ID,
                isDebug: IS_DEBUG,
                success: res => {
                    console.log("initAdService success");
                },
                fail: res => {
                    console.log("initAdService fail:" + res.code + res.msg);
                },
                complete: res => {
                    console.log("initAdService complete"), this._bannerAd = new OppoBannerAd(), this._videoAd = new OppoVideoAd(), 
                    this._nativeAd = new OppoNativeAd(), this._interstitialAd = new OppoInterstitialAd(), 
                    this._interstitialAd.updateInterstitialAdLastShowTime();
                }
            }), this._loginAndAuthorize = new OppoLoginAndAuthorize(), this._shareToFriends = new ShareToFriendsBase(), 
            this._subDomain = new SubDomainBase(), this._vibrate = new OppoVibrate(), this._log = new LogBase(), 
            this._misc = new OppoMisc(), this._gameIcon = new GameIconBase(), this._gameBanner = new GameBannerBase(), 
            qg.onShow(res => {
                console.log("qg.onShow", res), this._misc.setOnShowRes(res), EventManager.dispatchEvent(CommonEvents.GAME_ON_SHOW);
            }), qg.onHide(() => {
                console.log("qg.onHide"), PlayerDataBase.userId && (PlayerDataBase.saveExitTime(), 
                PlayerDataBase.saveData(!0)), EventManager.dispatchEvent(CommonEvents.GAME_ON_HIDE);
            });
        }
    }
    let PlatformUtils = null;
    var SWITCH_TYPE, ACTION_TYPE, PlatformUtils$1 = PlatformUtils = "undefined" != typeof wx ? new WechatImpl() : "undefined" != typeof qg ? new OppoImpl() : new WebImpl();
    !function(SWITCH_TYPE) {
        SWITCH_TYPE.SHARE = "share", SWITCH_TYPE.AD_SHORT = "ad_short", SWITCH_TYPE.AD_LONG = "ad_long", 
        SWITCH_TYPE.SHARE2AD = "share2ad", SWITCH_TYPE.AD2SHARE = "ad2share";
    }(SWITCH_TYPE || (SWITCH_TYPE = {})), function(ACTION_TYPE) {
        ACTION_TYPE.NONE = "none", ACTION_TYPE.AD_SHORT = "ad_short", ACTION_TYPE.AD_LONG = "ad_long", 
        ACTION_TYPE.SHARE = "share";
    }(ACTION_TYPE || (ACTION_TYPE = {}));
    class ShareWatchAdSwitch {
        static setDefine(shareWatchAdSettings, shareInfos, maxShareTimes, maxAdTimes) {
            this._shareWatchAdSettings = shareWatchAdSettings, this._shareInfos = shareInfos, 
            this._maxShareTimes = maxShareTimes, this._maxAdTimes = maxAdTimes;
        }
        static canShare() {
            return DailyReset.load("today_share_times", {
                times: 0
            }).times < this._maxShareTimes;
        }
        static canWatchAd(isShortAd) {
            return DailyReset.load("today_ad_times", {
                times: 0
            }).times < this._maxAdTimes && PlatformUtils$1.isVideoAdLoad(isShortAd);
        }
        static getShareTimes() {
            return DailyReset.load("today_share_times", {
                times: 0
            }).times;
        }
        static getAdTimes() {
            return DailyReset.load("today_ad_times", {
                times: 0
            }).times;
        }
        static incShareTimes() {
            let key = "today_share_times", tmp = DailyReset.load(key, {
                times: 0
            });
            tmp.times++, DailyReset.save(key, tmp);
        }
        static incAdTimes() {
            let key = "today_ad_times", tmp = DailyReset.load(key, {
                times: 0
            });
            tmp.times++, DailyReset.save(key, tmp);
        }
        static incShareAdSwitchTimes(key) {
            key = "share_ad_switch_" + key;
            let tmp = DailyReset.load(key, {
                times: 0
            });
            tmp.times++, DailyReset.save(key, tmp);
        }
        static incAdShareSwitchTimes(key) {
            key = "ad_share_switch_" + key;
            let tmp = DailyReset.load(key, {
                times: 0
            });
            tmp.times++, DailyReset.save(key, tmp);
        }
        static getActionTypeAndSwitchType(key) {
            if (!SwitchSettings.getShareInduce()) return {
                actionType: ACTION_TYPE.AD_SHORT,
                switchType: SWITCH_TYPE.AD_SHORT
            };
            let tmp, actionType, switchType, settings = this._shareWatchAdSettings[key];
            if (void 0 === settings) return console.warn("无效的key", key),
             {
                actionType: ACTION_TYPE.AD_SHORT,
                switchType: SWITCH_TYPE.AD_SHORT
            };
            {
                let foundSettingItem, hour = new Date().getHours();
                for (let i = 0; i < settings.length; i++) {
                    let settingItem = settings[i];
                    if (hour >= settingItem.startTime && hour <= settingItem.endTime) {
                        foundSettingItem = settingItem;
                        break;
                    }
                }
                if (void 0 === foundSettingItem) for (let i = 0; i < settings.length; i++) if (settings[i].isDefault) {
                    foundSettingItem = settings[i];
                    break;
                }
                if (void 0 === foundSettingItem) return console.error("设定异常: 无法找到对应的分享/视频设定项, 请检查服务端配置:", key), 
                {
                    actionType: ACTION_TYPE.AD_SHORT,
                    switchType: SWITCH_TYPE.SHARE
                };
                switch (foundSettingItem.type) {
                  case SWITCH_TYPE.AD_SHORT:
                    actionType = ACTION_TYPE.AD_SHORT;
                    break;

                  case SWITCH_TYPE.AD_LONG:
                    actionType = ACTION_TYPE.AD_LONG;
                    break;

                  case SWITCH_TYPE.SHARE:
                    actionType = ACTION_TYPE.SHARE;
                    break;

                  case SWITCH_TYPE.AD2SHARE:
                    actionType = (tmp = DailyReset.load("ad_share_switch_" + key, {
                        times: 0
                    })).times % 2 ? ACTION_TYPE.SHARE : ACTION_TYPE.AD_SHORT;
                    break;

                  case SWITCH_TYPE.SHARE2AD:
                    actionType = (tmp = DailyReset.load("share_ad_switch_" + key, {
                        times: 0
                    })).times % 2 ? ACTION_TYPE.AD_SHORT : ACTION_TYPE.SHARE;
                }
                if (switchType = foundSettingItem.type, SwitchSettings.getNewUserForceShare() && void 0 !== PlayerDataBase.userInfo.createdAt) {
                    new Date(new Date().setHours(0, 0, 0, 0)).getTime() === new Date(new Date(PlayerDataBase.userInfo.createdAt).setHours(0, 0, 0, 0)).getTime() && (actionType = ACTION_TYPE.SHARE);
                }
                return actionType === ACTION_TYPE.AD_SHORT ? this.canWatchAd(!0) || (actionType = ACTION_TYPE.SHARE, 
                this.canShare() || (actionType = ACTION_TYPE.NONE)) : actionType === ACTION_TYPE.AD_LONG ? this.canWatchAd(!1) || (actionType = ACTION_TYPE.SHARE, 
                this.canShare() || (actionType = ACTION_TYPE.NONE)) : actionType === ACTION_TYPE.SHARE && (this.canShare() || (actionType = ACTION_TYPE.AD_SHORT, 
                this.canWatchAd(!0) || (actionType = ACTION_TYPE.NONE))), {
                    actionType: actionType,
                    switchType: switchType
                };
            }
        }
        static getActionType(key) {
            return this.getActionTypeAndSwitchType(key).actionType;
        }
        static doWatchAd(isShort, logKey, onSuccess, onFail) {
            PlatformUtils$1.showVideoAd(isShort, logKey, isEnd => {
                isEnd ? onSuccess && (onSuccess(isShort ? ACTION_TYPE.AD_SHORT : ACTION_TYPE.AD_LONG), 
                isEnd && this.incAdTimes()) : onFail && onFail(isShort ? ACTION_TYPE.AD_SHORT : ACTION_TYPE.AD_LONG);
            });
        }
        static getShareInfo(key) {
            if (!SwitchSettings.getShareInduce()) return WX_DEFAULT_SHARE_INFO;
            let result;
            if (void 0 === key) result = WX_DEFAULT_SHARE_INFO; else {
                let shareInfoGroup = this._shareInfos;
                if (void 0 === shareInfoGroup) result = WX_DEFAULT_SHARE_INFO; else if (0 === shareInfoGroup.length) result = WX_DEFAULT_SHARE_INFO; else {
                    result = shareInfoGroup[DailyReset.load("share_count_" + key, {
                        times: 0
                    }).times % shareInfoGroup.length];
                }
            }
            return void 0 === result && (result = WX_DEFAULT_SHARE_INFO), void 0 !== result && (result.title = this.replaceAll(result.title, "{{name}}", PlayerDataBase.userInfo.nickName)), 
            result;
        }
        static doShare(key, logKey, shareParams, onSuccess, onFail) {
            void 0 === shareParams.action && (shareParams.action = key);
            let shareInfo = this.getShareInfo(key);
            PlatformUtils$1.shareToFriends({
                title: shareInfo.title,
                imageUrl: shareInfo.imageUrl,
                imageUrlId: shareInfo.imageUrlId,
                logKey: logKey,
                success: () => {
                    onSuccess && (onSuccess(ACTION_TYPE.SHARE), this.incShareTimes());
                },
                fail: res => {
                    onFail && onFail(ACTION_TYPE.SHARE);
                }
            }, shareParams);
            let tmp = DailyReset.load("share_count_" + key, {
                times: 0
            });
            tmp.times++, DailyReset.save("share_count_" + key, tmp);
        }
        static shareOrWatchAd(key, logKey, shareParams, onSuccess, onFail) {
            shareParams = shareParams || {
                action: "default"
            };
            let saveOnSuccess = onSuccess, {actionType: actionType, switchType: switchType} = this.getActionTypeAndSwitchType(key), hookOnSuccess = type => {
                switch (switchType) {
                  case SWITCH_TYPE.AD_SHORT:
                  case SWITCH_TYPE.AD_LONG:
                  case SWITCH_TYPE.SHARE:
                    saveOnSuccess && saveOnSuccess(type);
                    break;

                  case SWITCH_TYPE.SHARE2AD:
                    saveOnSuccess && saveOnSuccess(type), this.incShareAdSwitchTimes(key);
                    break;

                  case SWITCH_TYPE.AD2SHARE:
                    saveOnSuccess && saveOnSuccess(type), this.incAdShareSwitchTimes(key);
                }
            };
            switch (actionType) {
              case ACTION_TYPE.AD_SHORT:
                this.doWatchAd(!0, logKey, hookOnSuccess, onFail);
                break;

              case ACTION_TYPE.AD_LONG:
                this.doWatchAd(!1, logKey, hookOnSuccess, onFail);
                break;

              case ACTION_TYPE.SHARE:
                this.doShare(key, logKey, shareParams, hookOnSuccess, onFail);
                break;

              case ACTION_TYPE.NONE:
                Toast.show("今日次数已达上限\n请明日再试吧!");
            }
        }
        static share(key, logKey, shareParams, onSuccess, onFail) {
            this.canShare() ? this.doShare(key, logKey, shareParams, onSuccess, onFail) : Toast.show("今日分享次数已达上限\n请明日再分享吧!");
        }
        static watchAd(isShort, logKey, onSuccess, onFail) {
            this.canWatchAd(isShort) ? this.doWatchAd(isShort, logKey, onSuccess, onFail) : Toast.show("暂无视频可供播放,请稍候再试!");
        }
    }
    ShareWatchAdSwitch._shareWatchAdSettings = {}, ShareWatchAdSwitch._shareInfos = [], 
    ShareWatchAdSwitch._maxShareTimes = 30, ShareWatchAdSwitch._maxAdTimes = 10, ShareWatchAdSwitch.replaceAll = function(str, findText, replaceText) {
        let regExp = new RegExp(findText, "g");
        return str.replace(regExp, replaceText);
    };
    const GameEvent = {
        MONEY_CHANGE: "MONEY_CHANGE",
        KEY_CHANGE: "KEY_CHANGE",
        POWER_CHANGE: "POWER_CHANGE",
        LEVEL_CHANGED: "LEVEL_CHANGED",
        SKIN_ID_CHANGED: "SKIN_ID_CHANGED",
        SKIN_UNLOCKED: "SKIN_UNLOCKED",
        SIGNIN_SUCCEED: "SIGNIN_SUCCEED",
        REQUEST_LOAD_LEVEL: "REQUEST_LOAD_LEVEL",
        LOADING_LEVEL: "LOADING_LEVEL",
        LEVEL_READY: "LEVEL_READY",
        START_PLAYING_LEVEL: "START_PLAYING_LEVEL",
        BALL_OUT_OF_RANGE: "BALL_OUT_OF_RANGE",
        BALL_GOAL: "BALL_GOAL",
        SHOW_LOST_VIEW: "SHOW_LOST_VIEW",
        KILL_DEFENDER_VIEW: "KILL_DEFENDER_VIEW",
        SKIP_LEVEL: "SKIP_LEVEL",
        RETRY_LEVEL: "RETRY_LEVEL",
        NEXT_LEVEL: "NEXT_LEVEL",
        PREV_LEVEL: "PREV_LEVEL",
        PICKUP_COIN: "PICKUP_COIN",
        PICKUP_KEY: "GOT_KEY",
        AVOID_TACKLES: "AVOID_TACKLES",
        OPEN_CHEST: "OPEN_CHEST",
        SKIN_UNLOCK_DIALOG_OPEN: "SKIN_UNLOCK_DIALOG_OPEN",
        SKIN_UNLOCK_DIALOG_CLOSE: "SKIN_UNLOCK_DIALOG_CLOSE",
        COIN_FLY_EFFECT: "COIN_FLY_EFFECT",
        KILL_DEFENDERS: "KILL_DEFENDERS",
        SKIN_TRY_OUT: "SKIN_TRY_OUT"
    }, CoinBalls = [ "DefaultBall", "KaledoBall", "BeachBall", "RedBall", "BaseballBall", "BasketBall", "DarkBall", "TennisBall", "YellowBall" ], ChestBalls = [ "AmericaBall", "BalloonBall", "EightBall", "FaceBall", "JellyBall", "ShinyRedBall", "SpikeBall", "VintageBall", "WatermelonBall" ], AdBalls = [ "BurgerBall", "FireBall", "PapricaBall", "PigBall", "GoldBall", "BombBall", "FishBall", "WireBall", "PumpkinBall" ], AdBallsUnlockStep = {
        BurgerBall: 2,
        FireBall: 3,
        PapricaBall: 2,
        PigBall: 3,
        GoldBall: 2,
        BombBall: 2,
        FishBall: 3,
        WireBall: 2,
        PumpkinBall: 2
    };
    let AllBallSkins;
    AllBallSkins = CoinBalls.concat(ChestBalls).concat(AdBalls);
    class GamePlayerData extends PlayerDataBase {
        static getMoney() {
            return this.getGameDataItem("money", 0);
        }
        static setMoney(money, save = !0) {
            if(money < 0){
                money = 0;
            }
            this.setGameDataItem("money", money, save), EventManager.dispatchEvent(GameEvent.MONEY_CHANGE);
        }
        static addMoney(addMoney, save = !0) {
            let money = this.getMoney();
            money += addMoney, this.setMoney(money, save);
        }
        static getKey() {
            return this.getGameDataItem("key", 0);
        }
        static setKey(key) {
            this.setGameDataItem("key", key, !0), EventManager.dispatchEvent(GameEvent.KEY_CHANGE);
        }
        static addKey(addKey) {
            let key = this.getKey();
            key += addKey, this.setKey(key);
        }
        static getUsingSkinId() {
            return this.getGameDataItem("usingSkinId", defaultPlayerData.usingSkinId);
        }
        static setUsingSkinId(skinId) {
            this.setGameDataItem("usingSkinId", skinId, !0), EventManager.dispatchEvent(GameEvent.SKIN_ID_CHANGED, skinId);
        }
        static getCurrentLevel() {
            return this.getGameDataItem("level", defaultPlayerData.level);
        }
        static setCurrentLevel(lv) {
            this.setGameDataItem("level", lv, !0), EventManager.dispatchEvent(GameEvent.LEVEL_CHANGED, lv);
        }
        static isSkinUnlocked(skinId) {
            let unlockSkins = this.getGameDataItem("unlockSkins", defaultPlayerData.unlockSkins);
            return Array.isArray(unlockSkins) && (unlockSkins = defaultPlayerData.unlockSkins), 
            !0 === unlockSkins[skinId];
        }
        static unlockSkin(skinId) {
            let unlockSkins = this.getGameDataItem("unlockSkins", defaultPlayerData.unlockSkins);
            Array.isArray(unlockSkins) && (unlockSkins = defaultPlayerData.unlockSkins), this.isSkinUnlocked(skinId) || (unlockSkins[skinId] = !0), 
            this.setGameDataItem("unlockSkins", unlockSkins, !0), EventManager.dispatchEvent(GameEvent.SKIN_UNLOCKED, skinId);
        }
        static getSkinUnlockStep(skinId) {
            let skinUnlockStep = this.getGameDataItem("skinUnlockStep", defaultPlayerData.skinUnlockStep);
            return void 0 === skinUnlockStep[skinId] ? 0 : skinUnlockStep[skinId];
        }
        static incSkinUnlockStep(skinId) {
            let skinUnlockStep = this.getGameDataItem("skinUnlockStep", defaultPlayerData.skinUnlockStep);
            return void 0 === skinUnlockStep[skinId] ? skinUnlockStep[skinId] = 1 : skinUnlockStep[skinId] += 1, 
            this.setGameDataItem("skinUnlockStep", skinUnlockStep, !0), skinUnlockStep[skinId] >= AdBallsUnlockStep[skinId] && (this.unlockSkin(skinId), 
            !0);
        }
        static getPower() {
            return this.getGameDataItem("power", defaultPlayerData.power);
        }
        static addPower(addVal) {
            let power = this.getPower();
            power += addVal, this.setPower(power);
        }
        static usePower() {
            this.addPower(-1);
        }
        static setPower(power) {
            power = Math.max(0, Math.min(power, 20)), this.setGameDataItem("power", power, !0), 
            LocalData.setItem("lastPowerChangeTime", new Date().getTime()), EventManager.dispatchEvent(GameEvent.POWER_CHANGE);
        }
        static resumePower() {
            let lastPowerChangeTime = LocalData.getItem("lastPowerChangeTime", null), diffSec = (new Date().getTime() - lastPowerChangeTime) / 1e3, addPower = Math.floor(diffSec / SwitchSettings.getPowerResumeSec());
            addPower > 0 && this.addPower(addPower);
        }
    }
    var BannerPos;
    function findChildByNamePath(path, referenceNode) {
        if (null == path) return null;
        if (referenceNode) {
            if (referenceNode.destroyed) return null;
        } else {
            let stage = Laya.stage;
            if (!stage) return null;
            if (stage.destroyed) return null;
            referenceNode = stage;
        }
        let match = referenceNode, startIndex = "/" !== path[0] ? 0 : 1, nameList = path.split("/");
        for (let n = startIndex; n < nameList.length; n++) {
            let name = nameList[n];
            if (!(match = match.getChildByName(name))) return null;
        }
        return match;
    }
    function findChildComponent(node, componentClass, includeSelf = !0) {
        let comp = null;
        if (includeSelf && (comp = node.getComponent(componentClass))) return comp;
        let num = node.numChildren;
        for (let i = 0; i < num; i++) {
            if (comp = node.getChildAt(i).getComponent(componentClass)) return comp;
        }
        for (let i = 0; i < num; i++) {
            if (comp = findChildComponent(node.getChildAt(i), componentClass, !1)) return comp;
        }
        return null;
    }
    function findChildComponents(node, componentClass, includeSelf = !0, out) {
        out = out || [];
        let comps = null;
        if (includeSelf && (comps = node.getComponents(componentClass))) for (let i = 0; i < comps.length; i++) {
            let comp = comps[i];
            out.push(comp);
        }
        let num = node.numChildren;
        for (let i = 0; i < num; i++) {
            if (comps = node.getChildAt(i).getComponents(componentClass)) for (let i = 0; i < comps.length; i++) {
                let comp = comps[i];
                out.push(comp);
            }
        }
        for (let i = 0; i < num; i++) {
            findChildComponents(node.getChildAt(i), componentClass, !1, out);
        }
        return out;
    }
    function findClassFromChildren(node, classType, out, includeSelf = !0) {
        out = out || [], includeSelf && node instanceof classType && out.push(node);
        let num = node.numChildren;
        for (let i = 0; i < num; i++) {
            findClassFromChildren(node.getChildAt(i), classType, out, !0);
        }
        return out;
    }
    function findNameFromChildren(node, name, out, includeSelf = !0) {
        out = out || [], includeSelf && node.name === name && out.push(node);
        let num = node.numChildren;
        for (let i = 0; i < num; i++) {
            findNameFromChildren(node.getChildAt(i), name, out, !0);
        }
        return out;
    }
    !function(BannerPos) {
        BannerPos.REF_NODE = "refNode", BannerPos.TOP = "top", BannerPos.BOTTOM = "bottom", 
        BannerPos.CLEAR = "clear";
    }(BannerPos || (BannerPos = {}));
    var Script$1 = Laya.Script;
    class BannerAdComponent extends Script$1 {
        constructor() {
            super(...arguments), this.refNode = null, this._isShow = !1;
        }
        static findChildAndHideBannerAd(node) {
            let bannerAdComponent = findChildComponent(node, BannerAdComponent, !0);
            return bannerAdComponent && (bannerAdComponent.enabled = !1, bannerAdComponent.hideBanner()), 
            bannerAdComponent;
        }
        onAwake() {
            this.hideRefNode();
        }
        onEnable() {
            this.enabled && this.showBanner();
        }
        onDisable() {
            this.hideBanner();
        }
        showBanner() {
            if (this._isShow) return;
            if (this.enabled = !0, !this.owner.displayedInStage) return;
            let opts = {
                posType: BannerPos.BOTTOM
            };
            switch (this.posType) {
              case BannerPos.BOTTOM:
                opts.posType = BannerPos.BOTTOM, PlatformUtils$1.showBannerAd(opts), this._isShow = !0;
                break;

              case BannerPos.TOP:
                opts.posType = BannerPos.TOP, PlatformUtils$1.showBannerAd(opts), this._isShow = !0;
                break;

              case BannerPos.REF_NODE:
                opts.posType = BannerPos.REF_NODE, opts.refNode = this.refNode ? this.refNode : this.owner, 
                PlatformUtils$1.showBannerAd(opts), this._isShow = !0;
                break;

              case BannerPos.CLEAR:
                PlatformUtils$1.hideBannerAd(!0), this._isShow = !0;
            }
        }
        setRefNode(refNode) {
            this.posType = BannerPos.REF_NODE, this.refNode = refNode, this.updateBannerAd();
        }
        updateBannerAd() {
            if (this.posType === BannerPos.REF_NODE) {
                let opts = {
                    posType: BannerPos.REF_NODE,
                    refNode: this.refNode
                };
                PlatformUtils$1.setCurrentBannerStyle(opts);
            }
        }
        hideBanner() {
            this._isShow && this.posType !== BannerPos.CLEAR && PlatformUtils$1.hideBannerAd(!1), 
            this._isShow = !1, this.enabled = !1;
        }
        hideRefNode() {
            if (this.posType === BannerPos.REF_NODE) {
                (this.refNode ? this.refNode : this.owner).alpha = 0;
            }
        }
    }
    const SoundClips = {
        KICK_BALL_SOUND: "sounds/KickBall.mp3",
        WIN_SOUND: "sounds/WinSound.mp3",
        FAIL_SOUND: "sounds/FailSound.mp3",
        PICK_COIN: "sounds/CoinCollect.mp3",
        PICK_KEY: "sounds/KeyCollect.mp3",
        POPUP: "sounds/Popup.mp3",
        COIN_AWARD: "sounds/CoinAward.mp3",
        BALL_UNLOCK: "sounds/BallUnlock.mp3",
        TACKLE: "sounds/Tackle.mp3"
    };
    var NotEnoughCoinDialogUI = ui.dialogs.NotEnoughCoinDialogUI, SoundManager$2 = Laya.SoundManager;
    class NotEnoughCoinDialog extends NotEnoughCoinDialogUI {
        static open() {
            new NotEnoughCoinDialog().popup();
        }
        constructor() {
            super();
            let award = SwitchSettings.getNotEnoughCoinAward();
            this.coinAmount.text = `+${award}`, this.closeButton.on(Laya.Event.CLICK, this, this.close), 
            this.watchAdAddCoinButton.on(Laya.Event.CLICK, this, this.onWatchAdAddCoinClick);
        }
        onAwake() {
            this._bannerAdComponent = BannerAdComponent.findChildAndHideBannerAd(this);
        }
        showBanner() {
            this._bannerAdComponent && this._bannerAdComponent.showBanner();
        }
        onOpened(param) {
            this.timerOnce(500, this, () => {
                this.showBanner();
            });
        }
        onWatchAdAddCoinClick() {
            ShareWatchAdSwitch.shareOrWatchAd("WatchAdAddCoin", "看视频加金币", null, () => {
                let award = SwitchSettings.getNotEnoughCoinAward();
                GamePlayerData.addMoney(award), SoundManager$2.playSound(SoundClips.COIN_AWARD, 1), 
                EventManager.dispatchEvent(GameEvent.COIN_FLY_EFFECT, {
                    prototype: this.coinImage,
                    startPos: this.chestIcon
                }), this.close();
            });
        }
    }
    var NotEnoughPowerDialogUI = ui.dialogs.NotEnoughPowerDialogUI, SoundManager$3 = Laya.SoundManager;
    class NotEnoughPowerDialog extends NotEnoughPowerDialogUI {
        static open() {
            new NotEnoughPowerDialog().popup(), PlatformUtils$1.sendLogEvent("打开能量不足弹窗");
        }
        constructor() {
            super(), this.closeButton.on(Laya.Event.CLICK, this, this.close), this.watchAdAddPowerButton.on(Laya.Event.CLICK, this, this.onWatchAdAddCoinClick);
        }
        onAwake() {
            this._bannerAdComponent = BannerAdComponent.findChildAndHideBannerAd(this);
        }
        showBanner() {
            this._bannerAdComponent && this._bannerAdComponent.showBanner();
        }
        onOpened(param) {
            this.timerOnce(500, this, () => {
                this.showBanner();
            });
        }
        onWatchAdAddCoinClick() {
            ShareWatchAdSwitch.shareOrWatchAd("WatchAdAddPower", "看视频加体力", null, () => {
                SoundManager$3.playSound(SoundClips.PICK_KEY, 1), GamePlayerData.addPower(20), this.close();
            });
        }
    }
    const JoystickEvent = {
        DOWN: "JOYSTICK_DOWN",
        UP: "JOYSTICK_UP",
        CANCEL: "JOYSTICK_CANCEL",
        DIRECTION_CHANGE: "JOYSTICK_DIRECTION_CHANGE"
    };
    class Joystick extends Laya.Script {
        constructor() {
            super(), this.dot = null, this.ring = null, this._box = null, this._direction = null, 
            this._touchDownPos = null, this._strength = 0, this._saveRingPos = null, this._saveDotPos = null, 
            this._direction = new Laya.Vector2(0, 0), this._strength = 0;
        }
        onAwake() {
            this._box = this.owner, this.ring ? this._ringRadius = this.ring.displayWidth / 2 : this._ringRadius = this.ringSize / 2, 
            this.initTouchEvent(), this.hideRingDotWhenFollowMode();
        }
        onStart() {
            this.ring && (this._saveRingPos = new Laya.Point(this.ring.x, this.ring.y)), this.dot && (this._saveDotPos = new Laya.Point(this.dot.x, this.dot.y));
        }
        hideRingDotWhenFollowMode() {
            this.setRingDotVisible(!1);
        }
        setRingDotVisible(visible) {
            this.dot && (this.dot.visible = visible), this.ring && (this.ring.visible = visible);
        }
        initTouchEvent() {
            this.owner.on(Laya.Event.MOUSE_DOWN, this, this.touchStartEvent), this.owner.on(Laya.Event.MOUSE_MOVE, this, this.touchMoveEvent), 
            this.owner.on(Laya.Event.MOUSE_UP, this, this.touchEndEvent), this.owner.on(Laya.Event.MOUSE_OUT, this, this.touchCancelEvent);
        }
        touchStartEvent(e) {
            let touchPos = this._box.getMousePoint();
            this._touchDownPos = new Laya.Point(touchPos.x, touchPos.y), this.ring && this.ring.pos(touchPos.x, touchPos.y), 
            this.dot && this.dot.pos(touchPos.x, touchPos.y), this.setRingDotVisible(!0), this._strength = 0, 
            EventManager.dispatchEvent(JoystickEvent.DOWN, this);
        }
        touchMoveEvent(event) {
            if (!this._touchDownPos) return !1;
            let touchPos = this._box.getMousePoint();
            if (this._touchDownPos.x === touchPos.x && this._touchDownPos.y === touchPos.y) return !1;
            const touchDelta = new Laya.Point(touchPos.x - this._touchDownPos.x, touchPos.y - this._touchDownPos.y), distance = touchDelta.distance(0, 0);
            let p = new Laya.Point();
            if (p.copy(touchDelta), p.normalize(), this.dot) if (this._ringRadius > distance) this.dot.pos(touchPos.x, touchPos.y); else {
                const x = this._touchDownPos.x + p.x * this._ringRadius, y = this._touchDownPos.y + p.y * this._ringRadius;
                this.dot.pos(x, y);
            }
            this._direction.setValue(p.x, -p.y), this._strength = Math.max(0, Math.min(distance / this._ringRadius, 1)), 
            EventManager.dispatchEvent(JoystickEvent.DIRECTION_CHANGE, this);
        }
        touchEndEvent(event) {
            this.touchEndOrCancel(event), EventManager.dispatchEvent(JoystickEvent.UP, this);
        }
        touchCancelEvent(event) {
            this.touchEndOrCancel(event), EventManager.dispatchEvent(JoystickEvent.CANCEL, this);
        }
        touchEndOrCancel(event) {
            if (!this._touchDownPos) return ;
            let touchPos = this._box.getMousePoint();
            const distance = new Laya.Point(touchPos.x - this._touchDownPos.x, touchPos.y - this._touchDownPos.y).distance(0, 0);
            this.ring && this.ring.pos(this._saveRingPos.x, this._saveRingPos.y), this.dot && this.dot.pos(this._saveDotPos.x, this._saveDotPos.y), 
            this.setRingDotVisible(!1), this._strength = Math.max(0, Math.min(distance / this._ringRadius, 1));
        }
        getStrength() {
            return this._strength;
        }
        getDirection() {
            return this._direction;
        }
    }
    const TRANS_DURATION = 200;
    class MaskTransLayer extends Laya.Script {
        constructor() {
            super(...arguments), this._node = null;
        }
        onAwake() {
            this._node = this.owner, this.setupMaskTransNodeTree();
        }
        setupMaskTransNodeTree() {
            this._blackMask = new Laya.Sprite(), 
            this._node.addChildAt(this._blackMask, 0), 
            this._blackMask.alpha = .5, 
            this._blackMask.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000"), 
            this._maskContainer = new Laya.Sprite(), 
            this._node.addChildAt(this._maskContainer, 1), 
            this._maskContainer.cacheAs = "bitmap",
            this._maskArea = new Laya.Sprite(), 
            this._maskContainer.addChild(this._maskArea), 
            this._maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#ffff00"), 
            this._circleHole = new Laya.Sprite(),
            this._circleHole.pos(Laya.stage.width / 2, Laya.stage.height / 2), 
            this._maskContainer.addChild(this._circleHole), 
            this._circleHole.blendMode = "destination-out", 
            this._circleHole.graphics.clear(), 
            this._circleHole.graphics.drawCircle(0, 0, 256, "#000000");
        }
        transIn(callback) {
            this._node.visible = !0;
            let duration = TRANS_DURATION;
            this._node.alpha = 0, Laya.Tween.to(this._node, {
                alpha: 1
            }, duration), this._circleHole.scale(3, 3, !0), Laya.Tween.to(this._circleHole, {
                scaleX: 0,
                scaleY: 0
            }, duration, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                callback && callback();
            }));
        }
        transOut(callback) {
            this._node.visible = !0;
            let duration = TRANS_DURATION;
            this._node.alpha = 1, Laya.Tween.to(this._node, {
                alpha: 0
            }, duration), this._circleHole.scale(0, 0, !0), Laya.Tween.to(this._circleHole, {
                scaleX: 3,
                scaleY: 3
            }, duration, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                this._node.visible = !1, callback && callback();
            }));
        }
    }
    const _d2r = Math.PI / 180, _r2d = 180 / Math.PI;
    function clamp(val, min, max) {
        if (min > max) {
            const temp = min;
            min = max, max = temp;
        }
        return val < min ? min : val > max ? max : val;
    }
    function toRadian(a) {
        return a * _d2r;
    }
    function randomRangeInt(min, max) {
        return Math.floor(function(min, max) {
            return Math.random() * (max - min) + min;
        }(min, max));
    }
    var Vector2 = Laya.Vector2;
    class Vector2Ext extends Laya.Vector2 {
        static length(a) {
            return Math.sqrt(a.x * a.x + a.y * a.y);
        }
        static lengthSqr(a) {
            return a.x * a.x + a.y * a.y;
        }
        static negate(a, out) {
            return out.x = -a.x, out.y = -a.y, out;
        }
        static add(a, b, out) {
            return out.x = a.x + b.x, out.y = a.y + b.y, out;
        }
        static subtract(a, b, out) {
            return out.x = a.x - b.x, out.y = a.y - b.y, out;
        }
        static moveTowards(current, target, maxDistanceDelta, out) {
            let toVector_x = target.x - current.x, toVector_y = target.y - current.y, sqDist = toVector_x * toVector_x + toVector_y * toVector_y;
            if (0 == sqDist || maxDistanceDelta >= 0 && sqDist <= maxDistanceDelta * maxDistanceDelta) return target;
            let dist = Math.sqrt(sqDist);
            return out.setValue(current.x + toVector_x / dist * maxDistanceDelta, current.y + toVector_y / dist * maxDistanceDelta), 
            out;
        }
        static angle(a, b) {
            let magSqr1 = this.lengthSqr(a), magSqr2 = this.lengthSqr(b);
            if (0 === magSqr1 || 0 === magSqr2) return console.warn("Can't get angle between zero vector"), 
            0;
            let theta = Vector2.dot(a, b) / Math.sqrt(magSqr1 * magSqr2);
            return theta = clamp(theta, -1, 1), Math.acos(theta);
        }
        static rotate(a, radians, out) {
            let _x = a.x, _y = a.y;
            const sin = Math.sin(radians), cos = Math.cos(radians);
            return out.x = cos * _x - sin * _y, out.y = sin * _x + cos * _y, out;
        }
        static distanceSquared(value1, value2) {
            let x = value1.x - value2.x, y = value1.y - value2.y;
            return x * x + y * y;
        }
        static distance(value1, value2) {
            let x = value1.x - value2.x, y = value1.y - value2.y;
            return Math.sqrt(x * x + y * y);
        }
        static lerp(a, b, t, out) {
            let ax = a.x, ay = a.y;
            out.x = ax + t * (b.x - ax), out.y = ay + t * (b.y - ay);
        }
    }
    var Vector2$1 = Laya.Vector2;
    class Utils {
        static formatTime(second, isShowHour = !0) {
            let sec = second % 60, secondStr = sec < 10 ? "0" + sec : sec.toString(), minute = Math.floor(second / 60) % 60, minuteStr = minute < 10 ? "0" + minute : minute.toString(), hour = Math.floor(Math.floor(second / 60) / 60), hourStr = hour < 10 ? "0" + hour : hour.toString();
            return isShowHour ? hourStr + ":" + minuteStr + ":" + secondStr : minuteStr + ":" + secondStr;
        }
        static getTodayString() {
            let date = new Date();
            return date.getFullYear() + "-" + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-" + date.getDate();
        }
        static isString(foo) {
            return "[object String]" === Object.prototype.toString.call(foo);
        }
        static randomElementFromArray(array, remove = !1) {
            let index = Math.floor(Math.random() * array.length), result = array[index];
            return remove && array.splice(index, 1), result;
        }
        static isObject(val) {
            return null != val && "object" == typeof val && !1 === Array.isArray(val);
        }
        static cutString(str, len) {
            if (2 * str.length <= len) return str;
            let strLen = 0, s = "";
            for (let i = 0; i < str.length; i++) if (s += str.charAt(i), str.charCodeAt(i) > 128) {
                if ((strLen += 2) >= len) return s.substring(0, s.length - 1) + "...";
            } else if ((strLen += 1) >= len) return s.substring(0, s.length - 2) + "...";
            return s;
        }
        static checkInSector2D(selfDir, selfPos, targetPos, maxAngle, maxDistance, minDistance) {
            let posDt = new Vector2$1(targetPos.x - selfPos.x, targetPos.y - selfPos.y);
            if (Vector2$1.normalize(posDt, posDt), Vector2Ext.angle(selfDir, posDt) * _r2d > .5 * maxAngle) return !1;
            let distance = Vector2$1.scalarLength(posDt);
            return distance <= maxDistance && (void 0 === minDistance || distance >= minDistance);
        }
    }
    var Camera = Laya.Camera, Vector3 = Laya.Vector3, Scene3D = Laya.Scene3D;
    let _tmpVec3 = new Vector3();
    class Mix3DTo2D {
        static createMix(parent2d, scene3dTemplateResourcePath, callback) {
            let mixData = this._layerMap.get(parent2d);
            if (mixData) callback && callback(mixData); else if (scene3dTemplateResourcePath) Laya.Scene3D.load(scene3dTemplateResourcePath, Laya.Handler.create(this, scene => {
                mixData = this.initScene3d(parent2d, scene), callback && callback(mixData);
            })); else {
                let scene = new Scene3D();
                mixData = this.initScene3d(parent2d, scene);
                let directionLight = new Laya.DirectionLight();
                directionLight.color = new Vector3(.5, .5, .5), scene.addChild(directionLight), 
                callback && callback(mixData);
            }
        }
        static destroyMix(parent2d) {
            let mixData = this._layerMap.get(parent2d);
            if (mixData) {
                let scene = mixData.scene, needDestroy = !0;
                this._layerMap.forEach((value, key) => {
                    value.scene === scene && key != parent2d && (needDestroy = !1);
                }), needDestroy && mixData.scene.destroy(!0), this._layerMap.delete(parent2d), console.log("destroyMix", parent2d, mixData);
            }
        }
        static add3DMixWith2DWorldPosition(parent2d, sprite3d, worldPosition2D, offset = new Vector3(0, 0, 0)) {
            let mixData = this._layerMap.get(parent2d);
            mixData ? (mixData.scene.addChild(sprite3d), _tmpVec3.setValue(worldPosition2D.x * Laya.stage.clientScaleX, worldPosition2D.y * Laya.stage.clientScaleY, 0), 
            mixData.camera.convertScreenCoordToOrthographicCoord(_tmpVec3, _tmpVec3), Vector3.add(_tmpVec3, offset, _tmpVec3), 
            sprite3d.transform.position = _tmpVec3) : console.error("先调用createMix创建混合");
        }
        static add3DMixWith2DRefSprite(parent2d, sprite3d, ref2DNode, offset = new Vector3(0, 0, 0)) {
            let mixData = this._layerMap.get(parent2d);
            mixData ? (mixData.scene.addChild(sprite3d), this._sync(mixData, sprite3d, ref2DNode, offset)) : console.error("先调用createMix创建混合");
        }
        static syncPos(parent2d, sprite3d, ref2DNode, offset = new Vector3(0, 0, 0)) {
            let mixData = this._layerMap.get(parent2d);
            mixData && this._sync(mixData, sprite3d, ref2DNode, offset);
        }
        static _sync(mixData, sprite3d, ref2DNode, offset) {
            let pos = new Laya.Point(0, 0);
            pos = ref2DNode.localToGlobal(pos), _tmpVec3.setValue(pos.x * Laya.stage.clientScaleX, pos.y * Laya.stage.clientScaleY, 0), 
            mixData.camera.convertScreenCoordToOrthographicCoord(_tmpVec3, _tmpVec3), Vector3.add(_tmpVec3, offset, _tmpVec3), 
            sprite3d.transform.position = _tmpVec3;
        }
        static initScene3d(parent2d, scene) {
            parent2d.addChild(scene);
            let camera = new Camera();
            camera.transform.translate(new Vector3(0, 0, 0)), camera.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY, 
            camera.orthographic = !0, camera.orthographicVerticalSize = 10, scene.addChild(camera);
            let mixData = {
                scene: scene,
                camera: camera
            };
            return this._layerMap.set(parent2d, mixData), mixData;
        }
    }
    function get3DResourcePath(resourceFileName, path = "subpackages/commonRes3D/") {
        return path + "Conventional/" + resourceFileName;
    }
    Mix3DTo2D._layerMap = new Map();
    const Mix3DTo2DPreviewSceneTemplate = get3DResourcePath("2DPreviewSceneTemplate.ls");
    var MeshSprite3D = Laya.MeshSprite3D, SkinnedMeshSprite3D = Laya.SkinnedMeshSprite3D;
    function recursionEnableMeshSpriteShadow(node, castShadow, receiveShadow) {
        !function(node, castShadow, receiveShadow) {
            if (node instanceof MeshSprite3D) {
                let meshSprite = node;
                meshSprite.meshRenderer.castShadow = castShadow, meshSprite.meshRenderer.receiveShadow = receiveShadow;
            }
            if (node instanceof SkinnedMeshSprite3D) {
                let meshSprite = node;
                meshSprite.skinnedMeshRenderer.castShadow = castShadow, meshSprite.skinnedMeshRenderer.receiveShadow = receiveShadow;
            }
        }(node, castShadow, receiveShadow);
        let num = node.numChildren;
        for (let i = 0; i < num; i++) {
            recursionEnableMeshSpriteShadow(node.getChildAt(i), castShadow, receiveShadow);
        }
    }
    class BallSkin extends Laya.Script3D {
        constructor() {
            super(...arguments), this.skinId = null;
        }
        onEnable() {
            this._particles = findClassFromChildren(this.owner, Laya.ShuriKenParticle3D);
            for (let i = 0; i < this._particles.length; i++) {
                this._particles[i].particleSystem.stop();
            }
            this._particles.length && Laya.timer.once(100, this, this.startParticles);
        }
        startParticles() {
            for (let i = 0; i < this._particles.length; i++) {
                this._particles[i].particleSystem.play();
            }
        }
        enableShadow(enable) {
            recursionEnableMeshSpriteShadow(this.owner, enable, !1);
        }
    }
    const BALL_SKIN_PATH = "subpackages/commonRes3D/";
    class BallSkinManager {
        static spawnBallSkin(skinId, callback) {
            let prototypeNode = this._prototypes[skinId];
            if (prototypeNode) {
                let ballSkin = this.clone(prototypeNode);
                callback(ballSkin);
            } else this.loadPrototypeBallSkin(skinId, prototypeNode => {
                let ballSkin = this.clone(prototypeNode);
                callback(ballSkin);
            });
        }
        static loadPrototypeBallSkin(skinId, callback) {
            let ballSkinPath = this.getBallSkinResourcePath(skinId);
            Laya.Sprite3D.load(ballSkinPath, Laya.Handler.create(this, prototypeNode => {
                prototypeNode.transform.localPosition = new Laya.Vector3(0, 0, 0), prototypeNode.addComponent(BallSkin).skinId = skinId, 
                this._prototypes[skinId] = prototypeNode, callback(prototypeNode);
            }));
        }
        static clone(prototypeNode) {
            return Laya.Sprite3D.instantiate(prototypeNode, null, !0, prototypeNode.transform.position, prototypeNode.transform.rotation).getComponent(BallSkin);
        }
        static getBallSkinResourcePath(skinId) {
            return get3DResourcePath(skinId, BALL_SKIN_PATH) + ".lh";
        }
        static getBallSkinIndex(skinId) {
            for (let i = 0; i < AllBallSkins.length; i++) if (AllBallSkins[i] === skinId) return i;
            return -1;
        }
        static getNextSkinId(skinId) {
            let index = this.getBallSkinIndex(skinId);
            return ++index >= AllBallSkins.length && (index = 0), AllBallSkins[index];
        }
        static getPrevSkinId(skinId) {
            let index = this.getBallSkinIndex(skinId);
            return --index < 0 && (index = AllBallSkins.length - 1), AllBallSkins[index];
        }
        static getRandomChestSkinId() {
            let skinIds = [];
            for (let i = 0; i < ChestBalls.length; i++) GamePlayerData.isSkinUnlocked(ChestBalls[i]) || skinIds.push(ChestBalls[i]);
            return 0 === skinIds.length ? null : Utils.randomElementFromArray(skinIds);
        }
        static getCoinBallUnlockedCount() {
            return BallSkinManager.getUnlockedCount(CoinBalls);
        }
        static getCoinBallLockedCount() {
            return CoinBalls.length - this.getCoinBallUnlockedCount();
        }
        static getAdBallUnlockedCount() {
            return BallSkinManager.getUnlockedCount(AdBalls);
        }
        static getAdBallLockedCount() {
            return AdBalls.length - this.getAdBallUnlockedCount();
        }
        static getUnlockedCount(ballSkins) {
            let count = 0;
            for (let i = 0; i < ballSkins.length; i++) {
                let skinId = ballSkins[i];
                GamePlayerData.isSkinUnlocked(skinId) && count++;
            }
            return count;
        }
        static getRandomLockedSkin() {
            let skinIds = [];
            for (let i = 0; i < AdBalls.length; i++) GamePlayerData.isSkinUnlocked(AdBalls[i]) || skinIds.push(AdBalls[i]);
            return 0 === skinIds.length ? null : Utils.randomElementFromArray(skinIds);
        }
    }
    var AwardType;
    BallSkinManager._prototypes = {}, function(AwardType) {
        AwardType[AwardType.COIN = 0] = "COIN", AwardType[AwardType.SKIN = 1] = "SKIN";
    }(AwardType || (AwardType = {}));
    const SKIN_NOT_OPEN = "ui_res/back_frame4.png", SKIN_OPENED = "ui_res/back_frame4.png";
    class ChestGridItem extends ui.Views.OpenChestGridItemUI {
        constructor() {
            super(), this.resetGridItem(), this.on(Laya.Event.CLICK, this, this.onClick);
        }
        onEnable() {
            EventManager.registerEvent(GameEvent.SKIN_UNLOCK_DIALOG_OPEN, this.onSkinUnlockDialogOpen, this), 
            EventManager.registerEvent(GameEvent.SKIN_UNLOCK_DIALOG_CLOSE, this.onSkinUnlockDialogClose, this);
        }
        onDisable() {
            EventManager.releaseAllEvents(this);
        }
        onDestroy() {
            this.destroyBallPreview();
        }
        destroyBallPreview() {
            this._ballPreview && (this._ballPreview.destroy(!0), this._ballPreview = null);
        }
        resetGridItem() {
            this.backgroundImage.skin = SKIN_NOT_OPEN, this.backgroundImage.visible = !0, this.coinImage.visible = !1, 
            this.coinLabel.visible = !1, this.destroyBallPreview();
        }
        refreshData(data) {
            if (!data) return;
            this._data = data;
            let {isOpen: isOpen, type: type, coin: coin} = this._data;
            isOpen ? (this.backgroundImage.skin = SKIN_OPENED, type === AwardType.COIN ? (this.destroyBallPreview(), 
            this.coinImage.visible = !0, this.coinLabel.visible = !0, this.coinLabel.text = coin.toString()) : (this.coinImage.visible = !1, 
            this.coinLabel.visible = !1)) : (this.backgroundImage.skin = SKIN_NOT_OPEN, this.coinImage.visible = !1, 
            this.coinLabel.visible = !1, this.destroyBallPreview()), this.backgroundImage.visible = !isOpen, 
            this.chestImage.visible = !isOpen, this.chestImage.scale(1, 1);
        }
        openChestWithAnim(particleSetting, mix3dParent) {
            this.playParticleEffect(particleSetting), Laya.Tween.to(this.chestImage, {
                scaleX: 0,
                scaleY: 0
            }, 200, Laya.Ease.backIn, Laya.Handler.create(this, () => {
                this.backgroundImage.skin = SKIN_OPENED;
                let {type: type, coin: coin, skinId: skinId} = this._data;
                type === AwardType.COIN ? (this.coinImage.visible = !0, this.coinLabel.visible = !0, 
                this.coinLabel.text = coin.toString()) : (this.coinImage.visible = !1, this.coinLabel.visible = !1, 
                this.showSkinPreview(skinId, mix3dParent));
            }));
        }
        showSkinPreview(skinId, mix3dParent) {
            Mix3DTo2D.createMix(mix3dParent, Mix3DTo2DPreviewSceneTemplate, () => {
                BallSkinManager.spawnBallSkin(skinId, ballSkin => {
                    this._ballPreview = ballSkin.owner, this._ballPreview.transform.localScale = new Laya.Vector3(1.2, 1.2, 1.2), 
                    Mix3DTo2D.add3DMixWith2DRefSprite(mix3dParent, this._ballPreview, this.previewBox);
                });
            });
        }
        playParticleEffect(particleSetting) {
            let particle = new Laya.Particle2D(particleSetting);
            particle.emitter.start(.15), particle.play(), particle.pos(this.width / 2, this.height / 2), 
            this.addChild(particle);
        }
        onClick() {
            if (GamePlayerData.getKey() > 0) {
                let {isOpen: isOpen, index: index} = this._data;
                isOpen || EventManager.dispatchEvent(GameEvent.OPEN_CHEST, index);
            }
        }
        onSkinUnlockDialogOpen() {
            this._ballPreview && (this._ballPreview.active = !1);
        }
        onSkinUnlockDialogClose() {
            this._ballPreview && (this._ballPreview.active = !0);
        }
    }
    var SkinUnlockDialogUI = ui.dialogs.SkinUnlockDialogUI, Dialog = Laya.Dialog, Loader = Laya.Loader, SoundManager$4 = Laya.SoundManager;
    let openChestParticlePath = "particle/boom.part";
    class SkinUnlockDialog extends SkinUnlockDialogUI {
        constructor(skinId) {
            super(), this._skinId = skinId, this.closeButton.on(Laya.Event.CLICK, this, this.onCloseClick);
        }
        static openWithSkinId(skinId) {
            if (this._openChestParticleSettings) {
                new SkinUnlockDialog(skinId).popup(!0);
            } else Laya.loader.load(openChestParticlePath, Laya.Handler.create(this, settings => {
                this._openChestParticleSettings = settings, new SkinUnlockDialog(skinId).popup(!0);
            }), null, Loader.JSON);
        }
        onAwake() {
            this._bannerAdComponent = BannerAdComponent.findChildAndHideBannerAd(this);
        }
        showBanner() {
            this._bannerAdComponent && this._bannerAdComponent.showBanner();
        }
        onOpened(param) {
            this.timerOnce(500, this, () => {
                this.showBanner();
            }), Mix3DTo2D.createMix(Dialog.manager, Mix3DTo2DPreviewSceneTemplate, () => {
                BallSkinManager.spawnBallSkin(this._skinId, ballSkin => {
                    this._ball = ballSkin.owner, this._ball.transform.localScale = new Laya.Vector3(1.2, 1.2, 1.2), 
                    Mix3DTo2D.add3DMixWith2DRefSprite(Dialog.manager, this._ball, this.previewRoot), 
                    this.timerLoop(1e3 / 60, this, this.rotationPreview), this.playParticleEffect(), 
                     SoundManager$4.playSound(SoundClips.BALL_UNLOCK, 1), 
                    EventManager.dispatchEvent(GameEvent.SKIN_UNLOCK_DIALOG_OPEN);
                });
            });
        }
        onClosed(type) {
            Mix3DTo2D.destroyMix(Dialog.manager), this.clearTimer(this, this.rotationPreview);
        }
        onCloseClick() {
            this._ball && (this._ball.destroy(!0), this._ball = null), GamePlayerData.setUsingSkinId(this._skinId), 
            this.close();
        }
        close(type) {
            super.close(type), EventManager.dispatchEvent(GameEvent.SKIN_UNLOCK_DIALOG_CLOSE);
        }
        playParticleEffect() {
            let particle = new Laya.Particle2D(SkinUnlockDialog._openChestParticleSettings);
            particle.emitter.start(.3), particle.play(), particle.pos(0, 0), this.previewRoot.addChild(particle);
        }
        rotationPreview() {
            if (this._ball) {
                let rot = this._ball.transform.rotationEuler;
                rot.y += .5, this._ball.transform.rotationEuler = rot;
            }
        }
    }
    SkinUnlockDialog._openChestParticleSettings = null;
    const LevelConfig = [ "lv01", "lv02", "lv03_bonus", "lv04", "lv05", "lv06", "lv07", "lv08", "lv09_bonus", "lv21", "lv10", "lv11", "lv17", "lv14_bonus", "lv15", "lv16", "lv23", "lv24", "lv25", "lv20_bonus", "lv28", "lv29", "lv27", "lv18", "lv19", "lv26_bonus", "lv32", "lv30", "lv31", "lv33", "lv34", "lv35_bonus", "lv46", "lv49", "lv22", "lv36", "lv37", "lv38", "lv39", "lv40_bonus", "lv47", "lv45", "lv48", "lv41", "lv42", "lv43", "lv44_bonus", "lv62", "lv63", "lv64", "lv65", "lv66", "lv50", "lv56", "lv51", "lv52", "lv55_bonus", "lv61", "lv57", "lv58", "lv59", "lv12", "lv13", "lv53", "lv54", "lv60", "lv73", "lv74" ], BonusLevels = [ "lv03_bonus", "lv09_bonus", "lv14_bonus", "lv20_bonus", "lv26_bonus", "lv35_bonus", "lv40_bonus", "lv44_bonus", "lv55_bonus" ], LevelSubpackages = {
        res3d_01: [ "lv01", "lv02", "lv03_bonus", "lv04", "lv05", "lv06", "lv07", "lv08", "lv09_bonus", "lv10", "lv11", "lv12", "lv13", "lv14_bonus", "lv15", "lv16", "lv17", "lv18", "lv19", "lv20_bonus", "lv21", "lv22", "lv23", "lv24", "lv25", "lv26_bonus", "lv27", "lv28", "lv29", "lv30", "lv31", "lv32", "lv33", "lv34", "lv35_bonus", "lv36", "lv37", "lv38", "lv39", "lv40_bonus" ],
        res3d_02: [ "lv41", "lv42", "lv43", "lv44_bonus", "lv45", "lv46", "lv47", "lv48", "lv49", "lv50", "lv51", "lv52", "lv53", "lv54", "lv55_bonus", "lv56", "lv57", "lv58", "lv59", "lv60", "lv61", "lv62", "lv63", "lv64", "lv65", "lv66", "lv73", "lv74" ]
    }, BONUS_LV_INTERVAL = 5, LV_LOOP_START_INDEX = 30;
    class LevelManager {
        static getCurrentLevelData() {
            let level = GamePlayerData.getCurrentLevel();
            return this.getLevelData(level);
        }
        static getNextLevelData() {
            let lv = GamePlayerData.getCurrentLevel();
            return this.getLevelData(lv + 1);
        }
        static getPrevLevelData() {
            let lv = GamePlayerData.getCurrentLevel();
            return this.getLevelData(lv - 1);
        }
        static getLevelData(level) {
            let levelId, isBonusLv = level % BONUS_LV_INTERVAL == 0, bonusLvMul = Math.floor(level / BONUS_LV_INTERVAL), realLevel = level - bonusLvMul;
            if (isBonusLv) {
                let lvIndex = bonusLvMul - 1;
                lvIndex < 0 && (lvIndex = 0), levelId = BonusLevels[lvIndex % BonusLevels.length];
            } else {
                let lvIndex = realLevel - 1;
                lvIndex < 0 && (lvIndex = 0), lvIndex >= LevelConfig.length && (lvIndex = (lvIndex - LevelConfig.length) % (LevelConfig.length - LV_LOOP_START_INDEX), 
                lvIndex += LV_LOOP_START_INDEX), levelId = LevelConfig[lvIndex];
            }
            return {
                level: level,
                levelId: levelId,
                isBonusLv: isBonusLv
            };
        }
        static getLevelSubpackageName(levelId) {
            for (let packageName in LevelSubpackages) {
                let levelIds = LevelSubpackages[packageName];
                for (let i = 0; i < levelIds.length; i++) if (levelIds[i] === levelId) return packageName;
            }
            return null;
        }
    }
    var Handler$1 = Laya.Handler, Sprite3D = Laya.Sprite3D, Loader$1 = Laya.Loader, Vector3$1 = Laya.Vector3, SoundManager$5 = Laya.SoundManager;
    let openChestParticlePath$1 = "particle/boom.part", ChestWithCoins = get3DResourcePath("ChestWithCoins.lh");
    class OpenChestView extends Laya.Script {
        constructor() {
            super(...arguments), this.continueButton = null, this.addKeyButton = null, this.continueButton2 = null, 
            this.rewardPreview = null, this.keyList = null, this.tipImage = null, this.chestGrid = null, 
            this._awardPreview = null, this._chestsData = [], this._bestAward = null, this._addedKey = !1;
        }
        static loadResources(callback) {
            this._instance ? callback(this._instance) : this.loadChestWithCoins(chestWithCoins => {
                this._chestWithCoins = chestWithCoins, Laya.Scene.load("Views/OpenChestView.scene", Handler$1.create(this, view => {
                    this._instance = view.getComponent(OpenChestView), Laya.loader.load(openChestParticlePath$1, Laya.Handler.create(this, settings => {
                        this._openChestParticleSettings = settings, callback(this._instance);
                    }), null, Loader$1.JSON);
                }));
            });
        }
        static loadChestWithCoins(callback) {
            Laya.Sprite3D.load(ChestWithCoins, Laya.Handler.create(this, chestWithCoins => {
                chestWithCoins.transform.localPosition = new Laya.Vector3(0, 0, 0), callback(chestWithCoins);
            }));
        }
        static openView() {
            this._instance ? this.openInstance() : this.loadResources(() => {
                this.openInstance();
            });
        }
        static openInstance() {
            this._instance.randomAward(), this._instance.resetUI(), this._instance.destroyAwardPreview(), 
            this._instance.owner.open(!0), PlatformUtils$1.sendLogEvent("进入开宝箱");
        }
        onAwake() {
            this.chestGrid.itemRender = ChestGridItem, this.chestGrid.renderHandler = new Handler$1(this, this.updateChestItem), 
            this.continueButton.on(Laya.Event.CLICK, this, OpenChestView.continueClick), this.addKeyButton.on(Laya.Event.CLICK, this, this.addKeyClick), 
            this.continueButton2.on(Laya.Event.CLICK, this, OpenChestView.continueClick);
        }
        onEnable() {
            EventManager.registerEvent(GameEvent.OPEN_CHEST, this.onChestOpen, this), this.owner.timerOnce(100, this, this.init3DPreview);
        }
        onDisable() {
            EventManager.releaseAllEvents(this), Mix3DTo2D.destroyMix(this.owner);
        }
        randomAward() {
            this._chestsData = [];
            const coinAwards = SwitchSettings.getCoinAwardAmount().concat();
            for (let i = 0; i < 9; i++) this._chestsData.push({
                index: i,
                isOpen: !1,
                type: AwardType.COIN,
                coin: Utils.randomElementFromArray(coinAwards, !0)
            });
            let chestSkinId = OpenChestView.getChestSkinId();
            if (this._bestAward = null === chestSkinId ? {
                type: AwardType.COIN,
                coin: SwitchSettings.getBestCoinAward()
            } : {
                type: AwardType.SKIN,
                skinId: chestSkinId
            }, this._bestAward.type === AwardType.COIN) {
                let index = randomRangeInt(0, 9);
                this._chestsData[index].coin = SwitchSettings.getBestCoinAward();
            } else if (OpenChestView.canUnlockSkinToday()) {
                let index = randomRangeInt(0, 9);
                this._chestsData[index].type = AwardType.SKIN, this._chestsData[index].skinId = chestSkinId;
            }
            this.chestGrid.array = this._chestsData, this.chestGrid.refresh(), console.log(this._chestsData);
        }
        static getChestSkinId() {
            let skinId = BallSkinManager.getRandomChestSkinId();
            if (null === skinId) return null;
            {
                let lastSkinId = LocalData.getItem("lastChestSkinId", null);
                return null === lastSkinId ? LocalData.setItem("lastChestSkinId", skinId) : GamePlayerData.isSkinUnlocked(lastSkinId) || (skinId = lastSkinId), 
                skinId;
            }
        }
        makeAwardPreview() {
            this.destroyAwardPreview(), this._bestAward.type === AwardType.COIN ? this.makeChestAwardPreview() : this.makeBallPreview(this._bestAward.skinId);
        }
        makeBallPreview(skinId) {
            BallSkinManager.spawnBallSkin(skinId, ballSkin => {
                this._awardPreview = ballSkin.owner, this._awardPreview.transform.localScale = new Laya.Vector3(1.5, 1.5, 1.5), 
                this.addToPreview();
            });
        }
        makeChestAwardPreview() {
            this._awardPreview = Sprite3D.instantiate(OpenChestView._chestWithCoins, null, !0, OpenChestView._chestWithCoins.transform.position, OpenChestView._chestWithCoins.transform.rotation), 
            this.addToPreview();
        }
        addToPreview(offsetY = 0) {
            Mix3DTo2D.add3DMixWith2DRefSprite(this.owner, this._awardPreview, this.rewardPreview, new Vector3$1(0, offsetY, 0));
        }
        destroyAwardPreview() {
            this._awardPreview && (this._awardPreview.destroy(!0), this._awardPreview = null);
        }
        init3DPreview() {
            Mix3DTo2D.createMix(this.owner, Mix3DTo2DPreviewSceneTemplate, () => {
                this.makeAwardPreview();
            });
        }
        resetUI() {
            this._addedKey = !1, this.keyList.visible = !0, this.tipImage.visible = !0, this.continueButton.visible = !1, 
            this.addKeyButton.visible = !1, this.continueButton2.visible = !1;
        }
        static continueClick() {
            let levelData = LevelManager.getNextLevelData();
            GamePlayerData.setCurrentLevel(levelData.level), Laya.Scene.open("MainScene.scene");
        }
        addKeyClick() {
            ShareWatchAdSwitch.shareOrWatchAd("WatchAdAddKey", "视频加钥匙", null, () => {
                GamePlayerData.addKey(3), this._addedKey = !0, this.keyList.visible = !0, this.tipImage.visible = !0, 
                this.continueButton.visible = !1, this.addKeyButton.visible = !1, this.continueButton2.visible = !1, 
                SoundManager$5.playSound(SoundClips.PICK_KEY, 1);
            });
        }
        updateChestItem(chestGridItem, index) {
            let data = this._chestsData[index];
            chestGridItem.refreshData(data);
        }
        getRemainChest() {
            let num = 0;
            for (let i = 0; i < this._chestsData.length; i++) this._chestsData[i].isOpen || num++;
            return num;
        }
        onChestOpen(index) {
            let awardData = this._chestsData[index];
            if (awardData.isOpen) return;
            awardData.isOpen = !0, OpenChestView.giveAward(awardData), this.chestGrid.getCell(index).openChestWithAnim(OpenChestView._openChestParticleSettings, this.owner), 
            GamePlayerData.addKey(-1);
            let remainChest = this.getRemainChest();
            OpenChestView.canOpenChest(remainChest) && (this.keyList.visible = !1, this.tipImage.visible = !1, 
            this.canAddKey(remainChest) ? this.continueButton2.visible = !0 : (this.continueButton.visible = !0, 
            this.addKeyButton.visible = !0));
        }
        static giveAward(awardData) {
            let {type: type, coin: coin, skinId: skinId} = awardData;
            type === AwardType.COIN ? (GamePlayerData.addMoney(coin), SoundManager$5.playSound(SoundClips.COIN_AWARD, 1)) : (GamePlayerData.unlockSkin(skinId), 
            SkinUnlockDialog.openWithSkinId(skinId), OpenChestView.incUnlockSkinTimes(), PlatformUtils$1.sendLogEvent("抽到新球球"));
        }
        static incUnlockSkinTimes() {
            let data = DailyReset.load("unlockSkinTimes", {
                times: 0
            });
            data.times++, DailyReset.save("unlockSkinTimes", data);
        }
        static canUnlockSkinToday() {
            return DailyReset.load("unlockSkinTimes", {
                times: 0
            }).times < 3;
        }
        canAddKey(remainChest) {
            return this._addedKey || 0 === remainChest;
        }
        static canOpenChest(remainChest) {
            return 0 === GamePlayerData.getKey() || 0 === remainChest;
        }
        onUpdate() {
            if (this._awardPreview) {
                let rot = this._awardPreview.transform.rotationEuler;
                rot.y += 2, this._awardPreview.transform.rotationEuler = rot;
            }
        }
    }
    OpenChestView._instance = null, OpenChestView._openChestParticleSettings = null, 
    OpenChestView._chestWithCoins = null;
    var Sprite = Laya.Sprite, Vector2$2 = Laya.Vector2, Point = Laya.Point, Image = Laya.Image;
    const tweenDurationStep1 = 300, tweenDurationStep2 = 800, FLY_EFFECT_TOTAL_DURATION = tweenDurationStep1 + tweenDurationStep2;
    class FlyEffect {
        static showEffect(prototype, startPosOrSprite, endPosOrSprite, count = 10) {
            let startPos, endPos;
            startPos = startPosOrSprite instanceof Sprite ? startPosOrSprite.localToGlobal(new Point(startPosOrSprite.displayWidth / 2, startPosOrSprite.displayHeight / 2)) : startPosOrSprite, 
            endPos = endPosOrSprite instanceof Sprite ? endPosOrSprite.localToGlobal(new Point(endPosOrSprite.displayWidth / 2, endPosOrSprite.displayHeight / 2)) : endPosOrSprite;
            let rotStep = 360 / count, degree = 0, effectRoot = new Sprite();
            effectRoot.zOrder = 1e5, Laya.stage.addChild(effectRoot);
            for (let i = 0; i < count; i++) {
                let sprite;
                prototype instanceof Image ? (sprite = new Image()).skin = prototype.skin : (sprite = new Sprite()).texture = prototype.texture, 
                effectRoot.addChild(sprite), sprite.pos(startPos.x, startPos.y), sprite.rotation = prototype.rotation, 
                sprite.scale(prototype.scaleX, prototype.scaleY);
                let step1Pos = new Vector2$2(200, 0), radian = toRadian(degree);
                degree += rotStep, Vector2Ext.rotate(step1Pos, radian, step1Pos), Vector2Ext.add(startPos, step1Pos, step1Pos), 
                Laya.Tween.to(sprite, {
                    x: step1Pos.x,
                    y: step1Pos.y
                }, tweenDurationStep1, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                    Laya.Tween.to(sprite, {
                        x: endPos.x,
                        y: endPos.y,
                        scaleX: 0,
                        scaleY: 0
                    }, tweenDurationStep2, Laya.Ease.strongOut);
                }));
            }
            count > 0 && Laya.timer.once(FLY_EFFECT_TOTAL_DURATION, this, () => {
                effectRoot.destroy(!0);
            });
        }
    }
    var Script$2 = Laya.Script;
    class GameIconComponent extends Script$2 {
        constructor() {
            super(...arguments), this._iconHandle = null;
        }
        static findChildAndHideIcon(node) {
            let gameIconComponent = findChildComponent(node, GameIconComponent, !0);
            return gameIconComponent && (gameIconComponent.enabled = !1, gameIconComponent.hideIcon()), 
            gameIconComponent;
        }
        onAwake() {
            this.hideRefNode();
        }
        onEnable() {
            this.enabled && this.owner.timerOnce(500, this, () => {
                this.showIcon();
            });
        }
        onDisable() {
            this.hideIcon();
        }
        getOpts() {
            this.owner.alpha = 0;
            let opts = {};
            opts.appNameHidden = this.appNameHidden, opts.borderWidth = this.borderWidth, opts.borderColor = this.borderColor, 
            opts.color = this.color;
            let iconsRef = [], num = this.owner.numChildren;
            for (let i = 0; i < num; i++) iconsRef.push(this.owner.getChildAt(i));
            return opts.iconsRef = iconsRef, opts;
        }
        showIcon() {
            this._iconHandle || (this.enabled = !0, this.owner.displayedInStage && (this._iconHandle = PlatformUtils$1.showGameIcon(this.getOpts())));
        }
        hideIcon() {
            this._iconHandle && (PlatformUtils$1.hideGameIcon(this._iconHandle), this._iconHandle = null), 
            this.enabled = !1;
        }
        hideRefNode() {
            this.owner.alpha = 0;
        }
    }
    var SoundManager$6 = Laya.SoundManager;
    class WinLayer extends Laya.Script {
        constructor() {
            super(...arguments), this.normalLvLayer = null, this.bonusLvLayer = null, this.continueButton = null, 
            this.openChestButton = null, 
            this.scoreLabel = null, 
            this.buttonsBox = null, 
            this.receiveCoinButton = null, 
            this.receiveCoin5XButton = null, 
            this.pickCoinLabel = null, this.pickCoinImage = null, 
            this.coinLabel = null, 
            this._data = null, 
            this._waitEffect = !1, 
            this._continueButtonY = null, 
            this._buttonBoxY = null;
        }
        onAwake() {
            this._bannerAdComponent = BannerAdComponent.findChildAndHideBannerAd(this.owner), 
            this._gameIconComponent1 = GameIconComponent.findChildAndHideIcon(this.normalLvLayer), 
            this._gameIconComponent2 = GameIconComponent.findChildAndHideIcon(this.bonusLvLayer), 
            this.continueButton.on(Laya.Event.CLICK, this, this.onContinueClick), 
            this.openChestButton.on(Laya.Event.CLICK, this, this.onOpenChestClick), 
            this.receiveCoinButton.on(Laya.Event.CLICK, this, this.onReceiveCoinClick), 
            this.receiveCoin5XButton.on(Laya.Event.CLICK, this, this.onReceiveCoin5XClick);
        }
        onEnable() {
            null === this._continueButtonY && (this._continueButtonY = this.continueButton.y), 
            null === this._buttonBoxY && (this._buttonBoxY = this.buttonsBox.y),
            EventManager.registerEvent(GameEvent.COIN_FLY_EFFECT, this.showCoinFlyEffect, this);
        }
        onDisable() {
            EventManager.releaseAllEvents(this), 
            this.hideBanner(), 
            this.hideIcon();
        }
        setSettlementData(data) {
            this._waitEffect = !1, this._data = data, this.resetLayout();
        }
        resetLayout() {
            this.hideBanner(), this._data.isBonusLv ? this.resetLayoutForBonusLayer() : this.resetLayoutForNormalLayer(), 
            this.showIcon();
        }
        resetLayoutForBonusLayer() {
            this.bonusLvLayer.visible = !0, 
            this.bonusLvLayer.active = !0, 
            this.normalLvLayer.visible = !1;
            this.normalLvLayer.active = !1;
            this.pickCoinLabel.text = this._data.pickUpCoin.toString();
            this.coinLabel.text = GamePlayerData.getMoney().toString();
            this.receiveCoinButton.visible = !1;
            this.receiveCoinButton.active = !1;
            this.buttonsBox.y = this._buttonBoxY;
            this.receiveCoinButton.visible = !0;
            this.receiveCoinButton.active = !0;
            this.receiveCoinButton.alpha = 1; 
            this.owner.callLater(() => {
                this.buttonsBox.pos(this.buttonsBox.x, this._buttonBoxY - 175);
            });
        }
        resetLayoutForNormalLayer() {
            let showButton;
            this.bonusLvLayer.visible = !1, 
            this.bonusLvLayer.active = !1, 
            this.normalLvLayer.visible = !0, 
            this.normalLvLayer.active = !0, 
            this.scoreLabel.text = this._data.score.toString(), 
            this.openChestButton.visible = !1, 
            this.openChestButton.active = !1, 
            this.continueButton.visible = !1, 
            this.continueButton.active = !1
            showButton = GamePlayerData.getKey() >= 3 ? this.openChestButton : this.continueButton;
            showButton.visible = true;
            showButton.active  = true;
        }
        onOpenChestClick() {
            this.hideIcon(), OpenChestView.openView();
        }
        onContinueClick() {
            if(this._waitEffect){
                
            }else{
                this._waitEffect = true;
                this.hideIcon(), 
                this.goNextLevel()
            }
        }
        onReceiveCoin5XClick() {
            this._waitEffect || (this.hideIcon(), ShareWatchAdSwitch.shareOrWatchAd("BonusLvCoin5x", "奖励关看视频金币x5", null, () => {
                SoundManager$6.playSound(SoundClips.COIN_AWARD, 1), GamePlayerData.addMoney(4 * this._data.pickUpCoin), 
                this.showFlyEffectAndGoNextLevel();
            }));
        }
        onReceiveCoinClick() {
            this._waitEffect || (this.hideIcon(), SoundManager$6.playSound(SoundClips.COIN_AWARD, 1), 
            this.showFlyEffectAndGoNextLevel());
        }
        showFlyEffectAndGoNextLevel() {
            this._waitEffect = !0, this.coinLabel.text = GamePlayerData.getMoney().toString(), 
            EventManager.dispatchEvent(GameEvent.COIN_FLY_EFFECT, {
                prototype: this.pickCoinImage,
                startPos: this.pickCoinImage
            }), 
            this.owner.timerOnce(FLY_EFFECT_TOTAL_DURATION, this, () => {
                this._waitEffect = !1, 
                this.goNextLevel();
            });
        }
        goNextLevel() {
            EventManager.dispatchEvent(GameEvent.NEXT_LEVEL);
        }
        showCoinFlyEffect(data) {
            FlyEffect.showEffect(data.prototype, data.startPos, this.coinLabel);
        }
        showBanner() {
        }
        hideBanner() {
        }
        showIcon() {
        }
        hideIcon() {
        }
    }
    const GFX_PATH = "subpackages/commonRes3D/";
    class GFX extends Laya.Script3D {
        static loadGFX(gfxId, callback) {
            if (this.needReload(gfxId)) {
                let resourcePath = gfxId + ".lh";
                Laya.Sprite3D.load(get3DResourcePath(resourcePath, GFX_PATH), Laya.Handler.create(this, gfxNode => {
                    this._lastGFXNode && (this._lastGFXNode.destroy(), this._lastGFXNode = null), this._lastGFXNode = gfxNode, 
                    gfxNode.addComponent(GFX), callback(gfxNode);
                }));
            } else callback(this._lastGFXNode);
        }
        static needReload(gfxId) {
            return !this._lastGFXNode || this._lastGFXNode && (this._lastGFXNode.destroyed || this._lastGFXNode.name != gfxId);
        }
        onAwake() {
            this.setupGroundShadow();
        }
        setupGroundShadow() {
            recursionEnableMeshSpriteShadow(this.owner.getChildByName("BaseGround"), !1, !0);
        }
    }
    GFX._lastGFXNode = null;
    var Vector3$2 = Laya.Vector3;
    let _x = 0, _y = 0, _z = 0;
    class Vector3Ext extends Vector3$2 {
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
        lengthSqr() {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        }
        static rotateX(v, o, a, out) {
            _x = v.x - o.x, _y = v.y - o.y, _z = v.z - o.z;
            const cos = Math.cos(a), sin = Math.sin(a), rx = _x, ry = _y * cos - _z * sin, rz = _y * sin + _z * cos;
            return out.x = rx + o.x, out.y = ry + o.y, out.z = rz + o.z, out;
        }
        static rotateY(v, o, a, out) {
            _x = v.x - o.x, _y = v.y - o.y, _z = v.z - o.z;
            const cos = Math.cos(a), sin = Math.sin(a), rx = _z * sin + _x * cos, ry = _y, rz = _z * cos - _x * sin;
            return out.x = rx + o.x, out.y = ry + o.y, out.z = rz + o.z, out;
        }
        static rotateZ(v, o, a, out) {
            _x = v.x - o.x, _y = v.y - o.y, _z = v.z - o.z;
            const cos = Math.cos(a), sin = Math.sin(a), rx = _x * cos - _y * sin, ry = _x * sin + _y * cos, rz = _z;
            return out.x = rx + o.x, out.y = ry + o.y, out.z = rz + o.z, out;
        }
        static negate(a, out) {
            return out.x = -a.x, out.y = -a.y, out.z = -a.z, out;
        }
        static moveTowards(current, target, maxDistanceDelta, out) {
            let toVector_x = target.x - current.x, toVector_y = target.y - current.y, toVector_z = target.z - current.z, sqdist = toVector_x * toVector_x + toVector_y * toVector_y + toVector_z * toVector_z;
            if (0 == sqdist || maxDistanceDelta >= 0 && sqdist <= maxDistanceDelta * maxDistanceDelta) return target;
            let dist = Math.sqrt(sqdist);
            return out.setValue(current.x + toVector_x / dist * maxDistanceDelta, current.y + toVector_y / dist * maxDistanceDelta, current.z + toVector_z / dist * maxDistanceDelta), 
            out;
        }
    }
    Vector3Ext.ZERO = Object.freeze(new Vector3$2(0, 0, 0)), Vector3Ext.ONE = Object.freeze(new Vector3$2(1, 1, 1)), 
    Vector3Ext.UnitX = Object.freeze(new Vector3$2(1, 0, 0)), Vector3Ext.UnitY = Object.freeze(new Vector3$2(0, 1, 0)), 
    Vector3Ext.UnitZ = Object.freeze(new Vector3$2(0, 0, 1));
    class GameControl extends Laya.Script3D {
        constructor() {
            super(...arguments), this._camera = null, this._ball = null, this._touchDownTime = 0;
        }
        init(camera, ball) {
            this._camera = camera, this._ball = ball;
        }
        onEnable() {
            EventManager.registerEvent(JoystickEvent.DOWN, this.onJoystickDown, this), EventManager.registerEvent(JoystickEvent.UP, this.onJoystickUp, this), 
            EventManager.registerEvent(JoystickEvent.CANCEL, this.onJoystickCancel, this), EventManager.registerEvent(JoystickEvent.DIRECTION_CHANGE, this.onJoystickDirChanged, this);
        }
        onDisable() {
            EventManager.releaseAllEvents(this);
        }
        onJoystickDown() {
            this._ball && (this._ball.beginMoving(), this._touchDownTime = new Date().getTime());
        }
        onJoystickUp(joystick) {
            if (!this._ball) return;
            this._ball.endMoving();
            let strength = joystick.getStrength(), touchDownDurationSec = (new Date().getTime() - this._touchDownTime) / 1e3;
            if (this.canKick(touchDownDurationSec, strength)) {
                let joyDir = joystick.getDirection(), kickDir = this.convertJoystickDirectionToBallDirection(joyDir);
                joyDir.y < .8 ? (this._ball.movingToDir(kickDir, strength), PlatformUtils$1.vibrateShort()) : (this._ball.kickToDirection(kickDir, strength), 
                PlatformUtils$1.vibrateShort());
            }
        }
        onJoystickCancel(joystick) {
            this._ball && this._ball.endMoving();
        }
        canKick(touchDownDurationSec, strength) {
            return !!this._ball && (touchDownDurationSec < .3 && strength > .5 && this._ball.isOnGround());
        }
        onJoystickDirChanged(joystick) {
            if (!this._ball) return;
            let joyDir = joystick.getDirection(), dir = this.convertJoystickDirectionToBallDirection(joyDir);
            this._ball.setMovingDirection(dir), this._ball.isOnGround() || this._ball.setAirTuneDirection(joyDir.x);
        }
        convertJoystickDirectionToBallDirection(joystickDir) {
            if (!this._ball || !this._camera) return;
            let dir = new Laya.Vector3();
            return this._camera.getForward(dir), Vector3Ext.rotateY(dir, new Laya.Vector3(0, 0, 0), Math.atan2(joystickDir.y, joystickDir.x) - Math.PI / 2, dir), 
            dir;
        }
    }
    const CollisionGroup = {
        BALL: Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1,
        GROUND: Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2,
        GOAL_VOLUME: Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER3,
        OUT_FIELD: Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER4,
        COIN: Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER5,
        KEY: Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER6,
        DEFENDER: Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER7,
        HOLE: Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER8
    };
    function inplaceCloneAndResetTrailSprite3D(srcTrial, destroySrc = !0) {
        let alignment = srcTrial.trailFilter.alignment, clone = Laya.TrailSprite3D.instantiate(srcTrial, srcTrial.parent, !0, srcTrial.transform.position, srcTrial.transform.rotation);
        return destroySrc && srcTrial.destroy(!0), clone.trailFilter.alignment = alignment, 
        clone;
    }
    var Resource = Laya.Resource, RenderTexture = Laya.RenderTexture;
    class GameLevelScene extends Laya.Script3D {
        constructor() {
            super(), this._camera = null, this._levelNode = null;
        }
        onAwake() {
            this.setupAll();
        }
        setupAll() {
            this.setupDirectionLight(), this.setupCamera();
        }
        loadLevel(levelId, isBonusLv, callback) {
            this._levelNode && (this._levelNode.owner.destroy(!0), this._levelNode = null), 
            LevelNode.loadLevel(this.owner, levelId, this._camera, isBonusLv, levelNode => {
                console.log("LevelNode.loadLevel"), this._levelNode = levelNode, function() {
                    let idResourcesMap = Resource._idResourcesMap;
                    for (let k in idResourcesMap) {
                        let res = idResourcesMap[k];
                        res instanceof RenderTexture || res.lock || 0 !== res._referenceCount || res.destroy();
                    }
                }(), this.enablePhysicsSimulation(), callback(levelNode);
            });
        }
        enablePhysicsSimulation() {
            Laya.PhysicsSimulation.disableSimulation = !1;
        }
        setupDirectionLight() {
            let directionLight = this.owner.getChildByName("Directional Light");
            directionLight.shadow = !0, directionLight.shadowDistance = 100, directionLight.shadowResolution = 2048, 
            directionLight.shadowPSSMCount = 1, directionLight.shadowPCFType = 1;
        }
        setupCamera() {
            this._camera = this.owner.getChildByName("Main Camera");
        }
    }
    class GameScene extends Laya.Script {
        constructor() {
            super(), this._gameLevelScene = null;
        }
        static get scene3D() {
            return this._scene3D;
        }
        onAwake() {
            this._uiLayer = this.uiLayerNode.getComponent(UILayer), 
            Laya.Scene3D.load(get3DResourcePath("GameLevel.ls"), Laya.Handler.create(this, this.onComplete));
        }
        onEnable() {
            EventManager.registerEvent(GameEvent.REQUEST_LOAD_LEVEL, this.requestLoadLevel, this), 
            EventManager.registerEvent(GameEvent.SKIP_LEVEL, this.skipLevel, this), EventManager.registerEvent(GameEvent.RETRY_LEVEL, this.retryLevel, this), 
            EventManager.registerEvent(GameEvent.NEXT_LEVEL, this.nextLevel, this), EventManager.registerEvent(GameEvent.PREV_LEVEL, this.prevLevel, this);
        }
        onDisable() {
            GameScene._scene3D = null, EventManager.releaseAllEvents(this);
        }
        onComplete(scene) {
            GameScene._scene3D = scene, this._gameLevelScene = scene.addComponent(GameLevelScene), 
            this.game3DLayer.addChild(scene), GameScene._isGameDateLoaded ? this.loadLastLevel(() => {
                EventManager.dispatchEvent(CommonEvents.GAME_IS_READY);
            }) : PlatformUtils$1.loadGameData(() => {
                GameScene._isGameDateLoaded = !0, this.loadLastLevel(() => {
                    EventManager.dispatchEvent(CommonEvents.GAME_IS_READY);
                });
            });
        }
        loadLastLevel(callback) {
            let levelData = LevelManager.getCurrentLevelData();
            this.loadLevel(levelData, callback);
        }
        loadLevel(levelData, callback) {
            this._uiLayer.transIn(() => {
                EventManager.dispatchEvent(GameEvent.LOADING_LEVEL, levelData.levelId), this._gameLevelScene.loadLevel(levelData.levelId, levelData.isBonusLv, () => {
                    EventManager.dispatchEvent(GameEvent.LEVEL_READY, levelData.levelId), this.owner.timer.once(500, this, () => {
                        this._uiLayer.transOut(() => {
                            callback && callback();
                        });
                    });
                });
            });
        }
        skipLevel() {
            this.nextLevel();
        }
        retryLevel() {
            let levelData = LevelManager.getCurrentLevelData();
            this.loadLevel(levelData);
        }
        nextLevel() {
            let levelData = LevelManager.getNextLevelData();
            GamePlayerData.setCurrentLevel(levelData.level), this.loadLevel(levelData);
        }
        prevLevel() {
            let levelData = LevelManager.getPrevLevelData();
            GamePlayerData.setCurrentLevel(levelData.level), this.loadLevel(levelData);
        }
        requestLoadLevel(level) {
            let levelData = LevelManager.getLevelData(level);
            GamePlayerData.setCurrentLevel(levelData.level), this.loadLevel(levelData);
        }
    }
    GameScene._scene3D = null, GameScene._isGameDateLoaded = !1;
    var Vector3$3 = Laya.Vector3;
    let _tmpVec3$1 = new Vector3$3();
    var Vector3$4 = Laya.Vector3, Vector2$3 = Laya.Vector2, Script3D = Laya.Script3D, Rigidbody3D = Laya.Rigidbody3D, Sprite3D$1 = Laya.Sprite3D, MeshSprite3D$1 = Laya.MeshSprite3D, Handler$2 = Laya.Handler, TrailFilter = Laya.TrailFilter, SoundManager$7 = Laya.SoundManager;
    let _tmpVec3$2 = new Vector3$4(), _tmpVec2 = new Vector2$3();
    const BALL_MOVING_SPEED = 12, KICK_BASE_IMPULSE = new Vector2$3(30, 6), AIR_TUNE_FORCE = 4200;
    class Ball extends Script3D {
        constructor() {
            super(...arguments), this._ballSkin = null, this._rigidBody = null, this._isMoving = !1, 
            this._desiredMovingVelocity = new Vector3$4(0, 0, 0), this._movingDirection = new Vector3$4(0, 0, 0), 
            this._currentMovingVelocity = new Vector3$4(0, 0, 0), this._speedLerpMultiplier = 10, 
            this._allCollisionCount = 0, this._airTrail = null, this._grassTrail = null, this._grassTrailPosOffset = null, 
            this._grassTrailRotationOffset = null, this._kickSmashParticle = null, this._kickImpactParticle = null, 
            this._tuneDir = 0, this._isEnableUpdate = !0, this._isOnGroundRaycast = !1, this._disableCheckOnGroundRaycast = !1, 
            this._colliderShape = null, this._canAirMoving = !1, this._castHitResult = new Laya.HitResult(), 
            this._lastKickPosition = null;
        }
        get lastKickPosition() {
            return this._lastKickPosition;
        }
        static spawnBall(skinId, callback) {
            this._ballPrototype ? this._ballPrototype.cloneLastBall(skinId, callback) : MeshSprite3D$1.load(get3DResourcePath("Ball.lh"), Handler$2.create(this, ballNode => {
                this._ballPrototype = ballNode.addComponent(Ball), this._ballPrototype.cloneLastBall(skinId, callback);
            }));
        }
        cloneLastBall(skinId, callback) {
            let ballSprite3D = this.owner, ball = Sprite3D$1.instantiate(ballSprite3D, null, !0, ballSprite3D.transform.position, ballSprite3D.transform.rotation).getComponent(Ball);
            BallSkinManager.spawnBallSkin(skinId, ballSkin => {
                ball.setBallSkin(ballSkin), callback(ball);
            });
        }
        onStart() {
            this.setupChildren(), this.setOnGround(!1);
        }
        setBallSkin(ballSkin) {
            this._ballSkin && (this._ballSkin.owner.removeSelf(), this._ballSkin = null), this._ballSkin = ballSkin;
        }
        setupChildren() {
            this.setupRigidBody(), this.setupTrials(), this.setupKickParticles(), this.setupSkinBall();
        }
        setupRigidBody() {
            this._rigidBody = this.owner.getComponent(Rigidbody3D), this._rigidBody.friction = 5, 
            this._rigidBody.angularDamping = .6, this._rigidBody.rollingFriction = .4, this._rigidBody.collisionGroup = CollisionGroup.BALL, 
            this._rigidBody.ccdSweptSphereRadius = .3, this._rigidBody.ccdMotionThreshold = 1e-4, 
            this._colliderShape = this._rigidBody.colliderShape, this.resetRigidBody();
        }
        resetRigidBody() {
            this._rigidBody && (this._rigidBody.linearVelocity = new Vector3$4(0, 0, 0), this._rigidBody.angularVelocity = new Vector3$4(0, 0, 0), 
            this._rigidBody.detectCollisions = !0, this._rigidBody.clearForces());
        }
        setupTrials() {
            this.setupAirTrail(), this.setupGrassTrail();
        }
        setupAirTrail() {
            this._airTrail = this.owner.getChildByName("AirTrail"), this._airTrail && (this._airTrail.active = !1);
        }
        setupGrassTrail() {
            this._grassTrail = this.owner.getChildByName("GrassTrail"), this._grassTrail && (this._grassTrail.active = !1, 
            this._grassTrail.trailFilter.alignment = TrailFilter.ALIGNMENT_TRANSFORM_Z, this._grassTrailPosOffset = this._grassTrail.transform.localPosition.clone(), 
            this._grassTrailRotationOffset = this._grassTrail.transform.localRotation.clone(), 
            this.owner.parent.addChild(this._grassTrail));
        }
        setupKickParticles() {
            this._kickSmashParticle = findChildByNamePath("BallKickParticle/Smash", this.owner), 
            this._kickImpactParticle = findChildByNamePath("BallKickParticle/Impact", this.owner), 
            this._kickSmashParticle.particleSystem.stop(), this._kickImpactParticle.particleSystem.stop();
        }
        setupSkinBall() {
            this._skinRoot = this.owner.getChildByName("SkinRoot"), this._ballSkin && this._ballSkin.owner.parent !== this._skinRoot && (this._skinRoot.addChild(this._ballSkin.owner), 
            this.enableBallSkinShadow());
        }
        enableBallSkinShadow(enable = !0) {
            this._ballSkin.enableShadow(enable);
        }
        beginMoving() {
            this._isMoving = !0, this._currentMovingVelocity = this._rigidBody.linearVelocity.clone();
        }
        endMoving() {
            this._isMoving = !1, this._desiredMovingVelocity = new Vector3$4(0, 0, 0);
        }
        setAirTuneDirection(tuneDir) {
            this._tuneDir = tuneDir;
        }
        setMovingDirection(movingDir) {
            Vector3$4.normalize(movingDir, this._movingDirection), Vector3$4.scale(this._movingDirection, BALL_MOVING_SPEED, this._desiredMovingVelocity), 
            this._desiredMovingVelocity.y = 0;
        }
        kickToDirection(kickDir, strength, showKickParticles = !1) {
            this.saveLastKickPosition(), Vector3$4.normalize(kickDir, kickDir);
            let impulse = new Vector3$4();
            Vector3$4.scale(kickDir, KICK_BASE_IMPULSE.x * strength, impulse), impulse.y = KICK_BASE_IMPULSE.y * strength, 
            showKickParticles && this.showKickParticles(), this._rigidBody.wakeUp(), this._rigidBody.applyImpulse(impulse), 
            this._isOnGroundRaycast = !1, this._canAirMoving = !0, this.switchTrails(), this._disableCheckOnGroundRaycast = !0, 
            SoundManager$7.playSound(SoundClips.KICK_BALL_SOUND, 1), this.owner.timerOnce(200, this, () => {
                this._disableCheckOnGroundRaycast = !1;
            });
        }
        saveLastKickPosition() {
            this._lastKickPosition = this.owner.transform.position.clone();
        }
        movingToDir(dir, strength) {
            let impulse = new Vector3$4();
            Vector3$4.scale(dir, KICK_BASE_IMPULSE.x * strength * .5, impulse), impulse.y = 0, 
            this._rigidBody.wakeUp(), this._rigidBody.applyImpulse(impulse), SoundManager$7.playSound(SoundClips.KICK_BALL_SOUND, 1);
        }
        setOnGround(onGround) {
            this._isOnGroundRaycast != onGround && (this._isOnGroundRaycast = onGround, this.switchTrails());
        }
        switchTrails() {
            this._isOnGroundRaycast ? (this._airTrail && (this._airTrail.active = !1), this._grassTrail && (this._grassTrail = inplaceCloneAndResetTrailSprite3D(this._grassTrail), 
            this._grassTrail.active = !0)) : (this._airTrail && (this._airTrail = inplaceCloneAndResetTrailSprite3D(this._airTrail), 
            this._airTrail.active = !0), this._grassTrail && (this._grassTrail.active = !1));
        }
        showKickParticles() {
            this._kickSmashParticle.particleSystem.play(), this._kickImpactParticle.particleSystem.play();
        }
        isOnGround() {
            return this._isOnGroundRaycast;
        }
        onCollisionEnter(collision) {
            this._allCollisionCount++, this._canAirMoving = !1;
        }
        onCollisionExit(collision) {
            this._allCollisionCount--;
        }
        onTriggerEnter(other) {
            if (this._isEnableUpdate) switch (other.collisionGroup) {
              case CollisionGroup.OUT_FIELD:
                console.log("碰到出界触发器:", other.owner.name), this._isEnableUpdate = !1, EventManager.dispatchEvent(GameEvent.BALL_OUT_OF_RANGE), 
                PlatformUtils$1.vibrateLong();
                break;

              case CollisionGroup.GOAL_VOLUME:
                this._isEnableUpdate = !1, EventManager.dispatchEvent(GameEvent.BALL_GOAL), PlatformUtils$1.vibrateLong();
                break;

              case CollisionGroup.HOLE:
                console.log("碰到洞触发器"), this._isMoving = !1, this._rigidBody.detectCollisions = !1, 
                this.enableBallSkinShadow(!1), this.owner.timerOnce(300, this, () => {
                    EventManager.dispatchEvent(GameEvent.BALL_OUT_OF_RANGE), PlatformUtils$1.vibrateLong();
                });
            }
        }
        onUpdate() {
            if (!this._isEnableUpdate) return;
            let dt = Laya.timer.delta / 1e3;
            this.isOnGround() ? this.updateOnGround(dt) : this.updateAirMoving(dt), this.checkIsOnGround();
        }
        updateOnGround(dt) {
            this._isMoving && function(body, desiredVelocity) {
                let mass = body.mass;
                Vector3$3.subtract(desiredVelocity, body.linearVelocity, _tmpVec3$1), Vector3$3.scale(_tmpVec3$1, mass, _tmpVec3$1), 
                body.wakeUp(), body.applyImpulse(_tmpVec3$1);
            }(this._rigidBody, this._desiredMovingVelocity), this.updateGrassTrail();
        }
        updateGrassTrail() {
            this._grassTrail && this._grassTrail.active && (Vector3$4.add(this.owner.transform.position, this._grassTrailPosOffset, _tmpVec3$2), 
            this._grassTrail.transform.position = _tmpVec3$2, this._grassTrail.transform.rotationEuler = new Vector3$4(90, 0, 0));
        }
        updateAirMoving(dt) {
            if (this._canAirMoving && this._isMoving) {
                _tmpVec2.setValue(this._rigidBody.linearVelocity.x, this._rigidBody.linearVelocity.z), 
                Vector2$3.normalize(_tmpVec2, _tmpVec2);
                let t = _tmpVec2.x;
                _tmpVec2.setValue(-_tmpVec2.y, t), Vector2$3.scale(_tmpVec2, dt * AIR_TUNE_FORCE * this._tuneDir, _tmpVec2), 
                _tmpVec3$2.setValue(_tmpVec2.x, 0, _tmpVec2.y), this._rigidBody.wakeUp(), this._rigidBody.applyForce(_tmpVec3$2);
            }
        }
        checkIsOnGround() {
            if (this._disableCheckOnGroundRaycast) return;
            let from = this.owner.transform.position, to = from.clone();
            to.y -= this._colliderShape.radius - .2, GameScene.scene3D.physicsSimulation.shapeCast(this._rigidBody.colliderShape, from, to, this._castHitResult, null, null, this._rigidBody.collisionGroup, CollisionGroup.GROUND | CollisionGroup.HOLE | CollisionGroup.DEFENDER | Laya.Physics3DUtils.COLLISIONFILTERGROUP_DEFAULTFILTER) ? this._castHitResult.collider.collisionGroup === CollisionGroup.HOLE ? this.setOnGround(!1) : this.setOnGround(!0) : this.setOnGround(!1);
        }
        resetAtPosition(position) {
            this._isEnableUpdate = !0, this.resetRigidBody(), this.setupTrials(), this.setupKickParticles(), 
            this.enableBallSkinShadow(!0), this.owner.transform.position = position;
        }
        resetAtLastKickPosition() {
            this.resetAtPosition(this._lastKickPosition);
        }
    }
    Ball._ballPrototype = null;
    var Script3D$1 = Laya.Script3D, MeshSprite3D$2 = Laya.MeshSprite3D, Handler$3 = Laya.Handler, Sprite3D$2 = Laya.Sprite3D, PhysicsCollider = Laya.PhysicsCollider;
    const GOAL_LINE_SCROLL_SPEED = 2;
    class Goal extends Script3D$1 {
        constructor() {
            super(...arguments), this._goalLine = null, this._goalLineMat = null, this._confettiParticle = null;
        }
        static spawnGoal(ownerLevelNode, spawnBonusCoins = !1, callback) {
            if (this._lastGoal) {
                let cloneGoal = this.cloneLastGoal(ownerLevelNode, spawnBonusCoins);
                callback && callback(cloneGoal);
            } else MeshSprite3D$2.load(get3DResourcePath("Goal.lh"), Handler$3.create(this, goalNode => {
                this._lastGoal = goalNode.addComponent(Goal);
                let cloneGoal = this.cloneLastGoal(ownerLevelNode, spawnBonusCoins);
                callback && callback(cloneGoal);
            }));
        }
        static cloneLastGoal(ownerLevelNode, spawnBonusCoins) {
            let goalSprite3D = this._lastGoal.owner, cloneGoalSprite = Sprite3D$2.instantiate(goalSprite3D, null, !0, goalSprite3D.transform.position, goalSprite3D.transform.rotation);
            return spawnBonusCoins && this.spawnBonusCoins(ownerLevelNode, cloneGoalSprite), 
            cloneGoalSprite.getComponent(Goal);
        }
        static spawnBonusCoins(ownerLevelNode, goalSprite) {
            let bonusCoinsRoot = goalSprite.getChildByName("BonusCoins");
            if (bonusCoinsRoot) {
                let num = bonusCoinsRoot.numChildren;
                for (let i = 0; i < num; i++) {
                    let spawnPointNode = bonusCoinsRoot.getChildAt(i);
                    ownerLevelNode.spawnCoin(spawnPointNode, 2e3 + i, goalSprite);
                }
            }
        }
        onStart() {
            this._goalLine = findChildByNamePath("GoalLine", this.owner), this._goalLineMat = this._goalLine.meshRenderer.material, 
            this._confettiParticle = findChildByNamePath("ConfettiParticle", this.owner), this._confettiParticle.particleSystem.stop(), 
            this.setupVolumeColliderCollisionGroup();
        }
        setupVolumeColliderCollisionGroup() {
            let collider = findChildByNamePath("VolumeCollider", this.owner).getComponent(PhysicsCollider);
            collider && (collider.collisionGroup = CollisionGroup.GOAL_VOLUME);
        }
        onUpdate() {
            let dt = Laya.timer.delta / 1e3;
            this._goalLineMat.tilingOffsetZ += dt * GOAL_LINE_SCROLL_SPEED;
        }
        showConfettiParticle(worldPos) {
            worldPos && (this._confettiParticle.transform.position = worldPos), this._confettiParticle.particleSystem.play();
        }
    }
    Goal._lastGoal = null;
    class CameraFollowLookAt extends Laya.Script3D {
        constructor() {
            super(), this.followOffset = new Laya.Vector3(0, 8, 20), this._camera = null, this._lookAtTarget = null, 
            this._followTarget = null, this._offset = new Laya.Vector3(), this._newPos = new Laya.Vector3();
        }
        init(camera, followTarget, lookAtTarget) {
            this._camera = camera, this._followTarget = followTarget, this._lookAtTarget = lookAtTarget, 
            this.onLateUpdate();
        }
        onLateUpdate() {
            this._camera && this._followTarget && this._lookAtTarget && (Laya.Vector3.subtract(this._followTarget.position, this._lookAtTarget.position, this._offset), 
            Laya.Vector3.normalize(this._offset, this._offset), Laya.Vector3.scale(this._offset, this.followOffset.z, this._offset), 
            this._offset.y = this.followOffset.y, Laya.Vector3.add(this._offset, this._followTarget.position, this._newPos), 
            Laya.Vector3.lerp(this._camera.position, this._newPos, .4, this._newPos), this._camera.position = this._newPos, 
            this._camera.lookAt(this._lookAtTarget.position, Vector3Ext.UnitY));
        }
    }
    class CameraToPositionLookAt extends Laya.Script3D {
        constructor() {
            super(), this._camera = null, this._toPosition = null, this._lookAtTarget = null, 
            this._newPos = new Laya.Vector3(), this._duration = 1, this._transDt = 0;
        }
        init(camera, toPosition, lookAtTarget, duration = 1) {
            this._camera = camera, this._toPosition = toPosition, this._lookAtTarget = lookAtTarget, 
            this._duration = duration, this._transDt = 0;
        }
        onLateUpdate() {
            if (this._camera && this._toPosition && this._lookAtTarget && this._transDt < this._duration) {
                this._transDt += Laya.timer.delta / 1e3;
                let ratio = clamp(this._transDt / this._duration, 0, 1);
                Laya.Vector3.lerp(this._camera.position, this._toPosition, ratio, this._newPos), 
                this._camera.position = this._newPos, this._camera.lookAt(this._lookAtTarget.position, Vector3Ext.UnitY);
            }
        }
    }
    class GameObjectPool {
        constructor(opts) {
            this._opts = null, this._objectPrototype = null, this._opts = opts;
        }
        get objectPrototype() {
            return this._objectPrototype;
        }
        loadPrototypeAndInitPool(callback) {
            if (this._objectPrototype) return void callback(this._objectPrototype);
            let resourcePath = this.getResourcePath();
            Laya.Sprite3D.load(resourcePath, Laya.Handler.create(this, prototypeNode => {
                prototypeNode.transform.localPosition = new Laya.Vector3(0, 0, 0), this._objectPrototype = prototypeNode.addComponent(this._opts.gameObjectClass), 
                this.initPool(), callback && callback(this._objectPrototype);
            }));
        }
        spawn() {
            return this._objectPrototype ? this.getFromPoolOrClone() : (console.error("请先调用loadPrototypeAndInitPool()"), 
            null);
        }
        recoverToPool(cmp) {
            cmp.owner.removeSelf(), Laya.Pool.recover(this._opts.poolSign, cmp);
        }
        getFromPoolOrClone() {
            return Laya.Pool.getItemByCreateFun(this._opts.poolSign, this.clone, this);
        }
        initPool() {
            for (let i = 0; i < this._opts.poolSize; i++) {
                let cmp = this.clone();
                Laya.Pool.recover(this._opts.poolSign, cmp);
            }
        }
        clone() {
            let prototypeNode = this._objectPrototype.owner;
            return Laya.Sprite3D.instantiate(prototypeNode, null, !0, prototypeNode.transform.position, prototypeNode.transform.rotation).getComponent(this._opts.gameObjectClass);
        }
        getResourcePath() {
            return get3DResourcePath(this._opts.resourceFileName);
        }
    }
    var AnimatorStateScript = Laya.AnimatorStateScript;
    class DefenderAnimatorStateScript extends AnimatorStateScript {
        set animState(value) {
            this._animState = value;
        }
        set defender(value) {
            this._defender = value;
        }
        constructor() {
            super();
        }
        onStateEnter() {
            this._defender.onStateEnter(this._animState);
        }
        onStateExit() {
            this._defender.onStateExit(this._animState);
        }
    }
    const RUSH_DISTANCE_SQUARED = 144, TACKLE_DISTANCE_SQUARED = 16, CATCH_DISTANCE_SQUARED = 64;
    var DefenderAnim;
    !function(DefenderAnim) {
        DefenderAnim.Idle = "Idle", DefenderAnim.Run = "Run", DefenderAnim.Walk = "Walk", 
        DefenderAnim.Tackle = "Tackle", DefenderAnim.GoalkeeperIdle = "GoalkeeperIdle", 
        DefenderAnim.GoalkeeperCatch = "GoalkeeperCatch", DefenderAnim.CatchLeft = "CatchLeft", 
        DefenderAnim.CatchRight = "CatchRight", DefenderAnim.SideStepLeft = "SideStepLeft", 
        DefenderAnim.SideStepRight = "SideStepRight", DefenderAnim.FallenIdle = "FallenIdle";
    }(DefenderAnim || (DefenderAnim = {}));
    const DefenderAnimSwitch = {
        [DefenderAnim.Idle]: null,
        [DefenderAnim.Run]: null,
        [DefenderAnim.Walk]: null,
        [DefenderAnim.GoalkeeperIdle]: null,
        [DefenderAnim.FallenIdle]: null,
        [DefenderAnim.GoalkeeperCatch]: DefenderAnim.GoalkeeperIdle,
        [DefenderAnim.CatchLeft]: null,
        [DefenderAnim.CatchRight]: null,
        [DefenderAnim.Tackle]: null,
        [DefenderAnim.SideStepLeft]: null,
        [DefenderAnim.SideStepRight]: null
    }, ModelPositionYOffset = {
        [DefenderAnim.Idle]: 0,
        [DefenderAnim.Run]: -.2,
        [DefenderAnim.Walk]: 0,
        [DefenderAnim.GoalkeeperIdle]: -.15,
        [DefenderAnim.FallenIdle]: -.7,
        [DefenderAnim.GoalkeeperCatch]: -.2,
        [DefenderAnim.CatchLeft]: -.6,
        [DefenderAnim.CatchRight]: -.6,
        [DefenderAnim.Tackle]: -.8,
        [DefenderAnim.SideStepLeft]: -.1,
        [DefenderAnim.SideStepRight]: -.1
    };
    var Quaternion = Laya.Quaternion;
    let _tmpVec3$3 = new Laya.Vector3();
    class QuaternionExt extends Quaternion {
        static multiplyVector3(rotation, point, out) {
            let x = 2 * rotation.x, y = 2 * rotation.y, z = 2 * rotation.z, xx = rotation.x * x, yy = rotation.y * y, zz = rotation.z * z, xy = rotation.x * y, xz = rotation.x * z, yz = rotation.y * z, wx = rotation.w * x, wy = rotation.w * y, wz = rotation.w * z;
            return _tmpVec3$3.x = (1 - (yy + zz)) * point.x + (xy - wz) * point.y + (xz + wy) * point.z, 
            _tmpVec3$3.y = (xy + wz) * point.x + (1 - (xx + zz)) * point.y + (yz - wx) * point.z, 
            _tmpVec3$3.z = (xz - wy) * point.x + (yz + wx) * point.y + (1 - (xx + yy)) * point.z, 
            _tmpVec3$3.cloneTo(out), out;
        }
    }
    var Vector3$5 = Laya.Vector3, Transform3D = Laya.Transform3D, Quaternion$1 = Laya.Quaternion, MathUtils3D = Laya.MathUtils3D;
    let _tmpVec3$4 = new Laya.Vector3(), _tmpQuat = new Quaternion$1();
    class Transform3DExt extends Transform3D {
        static transformPoint(transform, position) {
            return Vector3$5.multiply(position, transform.localScale, _tmpVec3$4), QuaternionExt.multiplyVector3(transform.rotation, _tmpVec3$4, _tmpVec3$4), 
            Vector3$5.add(_tmpVec3$4, transform.position, _tmpVec3$4), _tmpVec3$4;
        }
        static inverseTransformPoint(transform, worldPosition) {
            Vector3$5.subtract(worldPosition, transform.position, _tmpVec3$4), transform.rotation.invert(_tmpQuat);
            let lossyScale = transform.getWorldLossyScale();
            return _tmpVec3$4.x /= lossyScale.x, _tmpVec3$4.y /= lossyScale.y, _tmpVec3$4.z /= lossyScale.z, 
            QuaternionExt.multiplyVector3(_tmpQuat, _tmpVec3$4, _tmpVec3$4), _tmpVec3$4;
        }
        static slerpLookAt(transform, lookToPosition, ratio) {
            let eye = transform.position;
            Math.abs(eye.x - lookToPosition.x) < MathUtils3D.zeroTolerance && Math.abs(eye.y - lookToPosition.y) < MathUtils3D.zeroTolerance && Math.abs(eye.z - lookToPosition.z) < MathUtils3D.zeroTolerance || (Quaternion$1.lookAt(eye, lookToPosition, Vector3Ext.UnitY, _tmpQuat), 
            _tmpQuat.invert(_tmpQuat), Quaternion$1.slerp(transform.rotation, _tmpQuat, ratio, _tmpQuat), 
            transform.rotation = _tmpQuat);
        }
        static moveTowards(transform, moveToPosition, ratio) {
            Vector3Ext.moveTowards(transform.position, moveToPosition, ratio, _tmpVec3$4), transform.position = _tmpVec3$4;
        }
        static moveLerp(transform, moveToPosition, ratio) {
            Vector3$5.lerp(transform.position, moveToPosition, ratio, _tmpVec3$4), transform.position = _tmpVec3$4;
        }
        static rotationLookTo(transform, lookToDirection) {
            Quaternion$1.rotationLookAt(lookToDirection, Vector3Ext.UnitY, _tmpQuat), _tmpQuat.invert(_tmpQuat), 
            transform.rotation = _tmpQuat;
        }
        static slerpRotationLookTo(transform, lookToDirection, ratio) {
            Quaternion$1.rotationLookAt(lookToDirection, Vector3Ext.UnitY, _tmpQuat), _tmpQuat.invert(_tmpQuat), 
            Quaternion$1.slerp(transform.rotation, _tmpQuat, ratio, _tmpQuat), transform.rotation = _tmpQuat;
        }
    }
    var Vector3$6 = Laya.Vector3, Script3D$2 = Laya.Script3D, Vector2$4 = Laya.Vector2;
    const ARRIVE_DISTANCE_THRESHOLD_SQR = .09;
    let _tmpVec3$5 = new Vector3$6(), _tmpVec2_1 = new Vector2$4(), _tmpVec2_2 = new Vector2$4();
    class FollowWayPoints extends Script3D$2 {
        constructor() {
            super(...arguments), this.isLookAtWayPoint = !0, this.moveSpeed = 5, this.turnSpeed = 10, 
            this.loop = !1, this._wayPoints = [], this._currentIndex = -1, this._isCompleted = !0;
        }
        reset() {
            this._wayPoints = [], this._currentIndex = -1, this._isCompleted = !0;
        }
        set wayPoints(value) {
            this._wayPoints = value, this._wayPoints.length > 0 ? (this._isCompleted = !1, this._currentIndex = 0) : (this._isCompleted = !0, 
            this._currentIndex = -1);
        }
        onUpdate() {
            if (this._isCompleted) return;
            this.getCurrentWayPointDistanceSqr() < ARRIVE_DISTANCE_THRESHOLD_SQR && this.nextWayPoint();
            let wayPoint = this.getCurrentWayPoint(), dt = Laya.timer.delta / 1e3;
            this.moveToWayPoint(wayPoint, dt), this.lookAtWayPoint(wayPoint, dt);
        }
        lookAtWayPoint(wayPoint, dt) {
            this.isLookAtWayPoint && this.lookAtPosition(wayPoint, dt);
        }
        getCurrentWayPoint() {
            return this._wayPoints[this._currentIndex];
        }
        lookAtPosition(position, dt) {
            let transform = this.owner.transform;
            Transform3DExt.slerpLookAt(transform, position, dt * this.turnSpeed);
        }
        getCurrentWayPointDistanceSqr() {
            let pos = this.owner.transform.position, wayPoint = this._wayPoints[this._currentIndex];
            return _tmpVec2_1.setValue(pos.x, pos.z), _tmpVec2_2.setValue(wayPoint.x, wayPoint.z), 
            Vector2Ext.distanceSquared(_tmpVec2_1, _tmpVec2_2);
        }
        nextWayPoint() {
            this._currentIndex === this._wayPoints.length - 1 ? this.loop ? this._currentIndex = 0 : this._isCompleted = !0 : this._currentIndex++;
        }
        moveToWayPoint(wayPoint, dt) {
            let transform = this.owner.transform, pos = transform.position;
            _tmpVec2_1.setValue(pos.x, pos.z), _tmpVec2_2.setValue(wayPoint.x, wayPoint.z), 
            Vector2Ext.moveTowards(_tmpVec2_1, _tmpVec2_2, dt * this.moveSpeed, _tmpVec2_1), 
            _tmpVec3$5.setValue(_tmpVec2_1.x, pos.y, _tmpVec2_1.y), transform.position = _tmpVec3$5;
        }
    }
    var Script3D$3 = Laya.Script3D, Vector3$7 = Laya.Vector3, Quaternion$2 = Laya.Quaternion, Vector2$5 = Laya.Vector2;
    let _tmpVec3$6 = new Vector3$7(), _tmpQuat$1 = new Quaternion$2(), _tmpVec2_1$1 = new Vector2$5(), _tmpVec2_2$1 = new Vector2$5();
    class MoveToDirection extends Script3D$3 {
        constructor() {
            super(...arguments), this.enableTurn = !0, this.enableLerpMoving = !1, this.enableLerpTurn = !1, 
            this.moveLerpSpeed = 5, this.turnLerpSpeed = 10, this.moveSpeed = 5, this.duration = 500, 
            this._movingDirection = new Vector3$7(), this._elapseTime = 0;
        }
        get movingDirection() {
            return this._movingDirection;
        }
        set movingDirection(value) {
            Vector3$7.normalize(value, this._movingDirection);
        }
        onEnable() {
            this.reset();
        }
        reset() {
            this._elapseTime = 0;
        }
        onUpdate() {
            if (-1 === this.duration || this._elapseTime < this.duration) {
                this._elapseTime += Laya.timer.delta;
                let dt = Laya.timer.delta / 1e3;
                this.doMove(dt), this.enableTurn && this.doTurn(dt), -1 !== this.duration && this._elapseTime >= this.duration && (this.enabled = !1);
            }
        }
        doMove(dt) {
            let transform = this.owner.transform, pos = transform.position;
            Vector3$7.scale(this._movingDirection, this.moveSpeed * (this.duration / 1e3), _tmpVec3$6), 
            Vector3$7.add(transform.position, _tmpVec3$6, _tmpVec3$6), this.enableLerpMoving ? (_tmpVec2_1$1.setValue(pos.x, pos.z), 
            _tmpVec2_2$1.setValue(_tmpVec3$6.x, _tmpVec3$6.z), Vector2Ext.lerp(_tmpVec2_1$1, _tmpVec2_2$1, this.moveLerpSpeed * dt, _tmpVec2_1$1), 
            _tmpVec3$6.setValue(_tmpVec2_1$1.x, pos.y, _tmpVec2_1$1.y), transform.position = _tmpVec3$6) : transform.position = _tmpVec3$6;
        }
        doTurn(dt) {
            let transform = this.owner.transform;
            Quaternion$2.rotationLookAt(this.movingDirection, Vector3Ext.UnitY, _tmpQuat$1), 
            this.enableLerpTurn ? Transform3DExt.slerpRotationLookTo(transform, this.movingDirection, this.turnLerpSpeed * dt) : Transform3DExt.rotationLookTo(transform, this.movingDirection);
        }
    }
    function ShowParticles(particles, syncWitNode) {
        for (let i = 0; i < particles.length; i++) {
            let particle = particles[i];
            syncWitNode.parent.addChild(particle), particle.transform.position = syncWitNode.transform.position, 
            particle.particleSystem.play();
        }
    }
    var Script3D$4 = Laya.Script3D, Vector3$8 = Laya.Vector3, Vector2$6 = Laya.Vector2, SphereColliderShape = Laya.SphereColliderShape, Quaternion$3 = Laya.Quaternion, SoundManager$8 = Laya.SoundManager, Tween = Laya.Tween;
    let _tmpVec3$7 = new Vector3$8();
    var CatchColliderShapeType;
    !function(CatchColliderShapeType) {
        CatchColliderShapeType[CatchColliderShapeType.LEFT = 0] = "LEFT", CatchColliderShapeType[CatchColliderShapeType.RIGHT = 1] = "RIGHT", 
        CatchColliderShapeType[CatchColliderShapeType.CENTER = 2] = "CENTER";
    }(CatchColliderShapeType || (CatchColliderShapeType = {}));
    class Defender extends Script3D$4 {
        constructor() {
            super(...arguments), this.moveSpeed = 8, this.sideStepMoveSpeed = 3, this._isGoalKeeper = !1, 
            this._originalModelPosY = 0, this._isDefenderActive = null, this._rigidBody = null, 
            this._followWayPoints = null, this._moveToDirection = null, this._isRushing = !1, 
            this._isFallen = !1, this._isTackling = !1, this._lastPlayingAnimName = null, this._colliderShape = null, 
            this._hitBall = !1, this._particles = [];
        }
        get isGoalKeeper() {
            return this._isGoalKeeper;
        }
        static loadPrototypeAndInitPool(callback) {
            this._defenderPool.loadPrototypeAndInitPool(() => {
                this._kickerGoalKeeperPool.loadPrototypeAndInitPool(callback);
            });
        }
        static spawn(isGoalKeeper) {
            let res;
            return (res = isGoalKeeper ? this._kickerGoalKeeperPool.spawn() : this._defenderPool.spawn())._isGoalKeeper = isGoalKeeper, 
            res;
        }
        recoverToPool() {
            this.changToDefaultColliderShape(), this.setFollowWayPointsEnabled(!1), this._followWayPoints.reset(), 
            this._moveToDirection.enabled = !1, this.owner.transform.localScale = new Vector3$8(1, 1, 1), 
            this._isRushing = !1, this._isFallen = !1, this._isTackling = !1, this._hitBall = !1, 
            this._lastPlayingAnimName = null, this._rushWayPoints = [], this._isDefenderActive = null, 
            this._modelNode.transform.localPositionY = this._originalModelPosY, this._isGoalKeeper ? Defender._kickerGoalKeeperPool.recoverToPool(this) : Defender._defenderPool.recoverToPool(this);
        }
        onAwake() {
            this.setupAnimator(), this.addRigidBody3D(), this.addFollowWayPointsComponent(), 
            this.addMoveToDirectionComponent(), this.setupParticles(), this._modelNode = findChildByNamePath("DefenderRoot", this.owner), 
            this._originalModelPosY = this._modelNode.transform.localPositionY;
        }
        setupParticles() {
            this._particles = findClassFromChildren(this.owner, Laya.ShuriKenParticle3D);
        }
        removeParticlesFromParent() {
            for (let i = 0; i < this._particles.length; i++) {
                this._particles[i].removeSelf();
            }
        }
        showParticles() {
            ShowParticles(this._particles, this.owner);
        }
        setupAnimator() {
            this._anim = findChildComponent(this.owner, Laya.Animator);
            let controllerLayer = this._anim.getControllerLayer();
            controllerLayer.playOnWake = !1;
            for (let animName in DefenderAnim) {
                let animState = controllerLayer.getAnimatorState(animName), script = animState.addScript(DefenderAnimatorStateScript);
                script.defender = this, script.animState = animState;
            }
        }
        addRigidBody3D() {
            this._rigidBody ? this._rigidBody.isKinematic = !1 : (this._rigidBody = this.owner.addComponent(Laya.Rigidbody3D), 
            this._rigidBody.collisionGroup = CollisionGroup.DEFENDER, this._rigidBody.restitution = 0, 
            this._rigidBody.friction = 1, this._rigidBody.angularDamping = 1, this._rigidBody.rollingFriction = 1, 
            this.changToDefaultColliderShape());
        }
        changToDefaultColliderShape() {
            this._rigidBody && (this._colliderShape = new SphereColliderShape(.7), this._colliderShape.localOffset = new Vector3$8(0, 0, 0), 
            this._rigidBody.colliderShape = this._colliderShape);
        }
        changeToTackleColliderShape() {
            this._rigidBody && (this._colliderShape = new SphereColliderShape(1.1), this._colliderShape.localOffset = new Vector3$8(0, .35, -.2), 
            this._rigidBody.colliderShape = this._colliderShape);
        }
        changeToCatchColliderShape(type) {
            if (this._rigidBody) {
                let xOffset;
                switch (type) {
                  case CatchColliderShapeType.LEFT:
                    xOffset = .5;
                    break;

                  case CatchColliderShapeType.RIGHT:
                    xOffset = -.5;
                    break;

                  case CatchColliderShapeType.CENTER:
                    xOffset = 0;
                }
                this._colliderShape = new SphereColliderShape(1.8), this._colliderShape.localOffset = new Vector3$8(xOffset, 1.5, 0), 
                this._rigidBody.colliderShape = this._colliderShape, this.owner.timerOnce(200, this, this.changToDefaultColliderShape);
            }
        }
        addFollowWayPointsComponent() {
            this._followWayPoints || (this._followWayPoints = this.owner.addComponent(FollowWayPoints), 
            this._followWayPoints.moveSpeed = this.moveSpeed, this._followWayPoints.reset());
        }
        addMoveToDirectionComponent() {
            this._moveToDirection || (this._moveToDirection = this.owner.addComponent(MoveToDirection), 
            this._moveToDirection.enabled = !1, this._moveToDirection.moveSpeed = this.moveSpeed);
        }
        onEnable() {
            this.removeParticlesFromParent(), this.enableShadow(!0);
        }
        onDisable() {
            this.recoverToPool(), EventManager.releaseAllEvents(this);
        }
        enableShadow(enable) {
            recursionEnableMeshSpriteShadow(this.owner, enable, !1);
        }
        init() {
            this._isGoalKeeper ? this.initGoalKeeper() : this.initDefender(), this.owner.clearTimer(this, this.changeRigidBodyToKinematic), 
            this._rigidBody && (this._rigidBody.isKinematic = !1), this.setActive(!0);
        }
        initDefender() {
            this.owner.transform.rotation = Quaternion$3.DEFAULT, this.playAnim(DefenderAnim.Idle), 
            this.lookAtDirBall();
        }
        initGoalKeeper() {
            if (LevelNode.goal) {
                let transform = this.owner.transform, goalTransform = LevelNode.goal.owner.transform;
                transform.rotation = Quaternion$3.DEFAULT, transform.rotation = goalTransform.rotation;
                let sideStepWayPoints = [], sideStepLeftPoint = (new Vector3$8(0, 0, 2), new Vector3$8()), sideStepRightPoint = new Vector3$8();
                transform.getRight(sideStepRightPoint), Vector3Ext.negate(sideStepRightPoint, sideStepLeftPoint), 
                Vector3$8.scale(sideStepLeftPoint, 2, sideStepLeftPoint), Vector3$8.scale(sideStepRightPoint, 2, sideStepRightPoint), 
                Vector3$8.add(transform.position, sideStepLeftPoint, sideStepLeftPoint), Vector3$8.add(transform.position, sideStepRightPoint, sideStepRightPoint), 
                sideStepWayPoints.push(sideStepLeftPoint), sideStepWayPoints.push(sideStepRightPoint), 
                this._followWayPoints.wayPoints = sideStepWayPoints, this._followWayPoints.isLookAtWayPoint = !1, 
                this._followWayPoints.loop = !0, this._followWayPoints.moveSpeed = this.sideStepMoveSpeed, 
                this._followWayPoints.enabled = !0, this.playAnim(DefenderAnim.SideStepLeft);
            }
        }
        onUpdate() {
            !this._isFallen && LevelNode.isPlayingLevel && this._isDefenderActive && (this._rigidBody && (this._rigidBody.angularVelocity = new Vector3$8(0, 0, 0)), 
            this._isGoalKeeper ? this.onUpdateForGoalKeeper() : this.onUpdateForDefender());
        }
        onUpdateForDefender() {
            let distanceSqr = this.getBallDistanceSqr();
            this._isRushing || this.rushIfNeed(distanceSqr, !1), this.tackleIfNeed(distanceSqr);
        }
        onUpdateForGoalKeeper() {
            let distanceSqr = this.getBallDistanceSqr();
            this._isRushing ? this.tackleIfNeed(distanceSqr) : this.rushIfNeed(distanceSqr, !0), 
            this._isRushing || this.catchIfNeed(distanceSqr);
        }
        rushIfNeed(distanceSqr, mustOnGround) {
            let onGroundCheck = !mustOnGround || LevelNode.ball.isOnGround();
            distanceSqr < RUSH_DISTANCE_SQUARED && onGroundCheck && (this.findRushWayPoints(), 
            this._rushWayPoints.length > 0 && (this._isRushing = !0, this.playAnim(DefenderAnim.Run), 
            this.setFollowWayPointsEnabled(!0)));
        }
        tackleIfNeed(distanceSqr) {
            distanceSqr < TACKLE_DISTANCE_SQUARED && LevelNode.ball.isOnGround() && this.doTackle();
        }
        doTackle() {
            this.changeToTackleColliderShape(), this.playAnim(DefenderAnim.Tackle), this._isFallen = !0, 
            this.setFollowWayPointsEnabled(!1), this._moveToDirection.moveSpeed = 4 + 3 * Math.random(), 
            this._moveToDirection.duration = 350 + 100 * Math.random();
            let transform = this.owner.transform;
            Vector3$8.subtract(LevelNode.ball.owner.transform.position, transform.position, _tmpVec3$7), 
            this._moveToDirection.movingDirection = _tmpVec3$7, this._moveToDirection.enableTurn = !0, 
            this._moveToDirection.enableLerpMoving = !0, this._moveToDirection.enableLerpTurn = !0, 
            this._moveToDirection.reset(), this._moveToDirection.enabled = !0, SoundManager$8.playSound(SoundClips.TACKLE, 1);
        }
        catchIfNeed(distanceSqr) {
            distanceSqr < CATCH_DISTANCE_SQUARED && !LevelNode.ball.isOnGround() && this.doCatch();
        }
        doCatch() {
            if (this._rigidBody) {
                this.setFollowWayPointsEnabled(!1);
                let transform = this.owner.transform, ballPos = LevelNode.ball.owner.transform.position, ballToSelfLocalPos = Transform3DExt.inverseTransformPoint(transform, ballPos);
                Math.abs(ballToSelfLocalPos.x) < .8 ? (this.playAnim(DefenderAnim.GoalkeeperCatch), 
                this.changeToCatchColliderShape(CatchColliderShapeType.CENTER)) : (ballToSelfLocalPos.x < 0 ? (this.changeToCatchColliderShape(CatchColliderShapeType.LEFT), 
                this.playAnim(DefenderAnim.CatchLeft, !0, .5, 3)) : (this.changeToCatchColliderShape(CatchColliderShapeType.RIGHT), 
                this.playAnim(DefenderAnim.CatchRight, !0, .5, 3)), Vector3$8.scale(ballToSelfLocalPos, 2, ballToSelfLocalPos), 
                Vector3$8.subtract(ballPos, transform.position, _tmpVec3$7), Vector3$8.scale(_tmpVec3$7, 200, _tmpVec3$7), 
                this._rigidBody.applyForce(_tmpVec3$7)), this._isFallen = !0;
            }
        }
        getBallDistanceSqr() {
            let pos = this.owner.transform.position, ballPos = LevelNode.ball.owner.transform.position;
            return Vector3$8.distanceSquared(pos, ballPos);
        }
        playAnim(animName, crossFade = !0, transitionDuration = 0, speed = 1) {
            this.tweenModelLocalPosition(animName), this._anim.speed = speed, this._lastPlayingAnimName && crossFade ? this._lastPlayingAnimName !== animName && (this._anim.crossFade(animName, .05), 
            this._lastPlayingAnimName = animName) : (this._anim.play(animName), this._lastPlayingAnimName = animName);
        }
        tweenModelLocalPosition(animName) {
            let localPositionY = this._originalModelPosY + ModelPositionYOffset[animName];
            Laya.Tween.to(this._modelNode.transform, {
                localPositionY: localPositionY
            }, 500, Laya.Ease.linearNone);
        }
        onStateEnter(animState) {
            animState.name !== DefenderAnim.Tackle && animState.name !== DefenderAnim.GoalkeeperCatch && animState.name !== DefenderAnim.CatchLeft && animState.name !== DefenderAnim.CatchRight || (this._isTackling = !0);
        }
        onStateExit(animState) {
            animState.name !== DefenderAnim.Tackle && animState.name !== DefenderAnim.GoalkeeperCatch && animState.name !== DefenderAnim.CatchLeft && animState.name !== DefenderAnim.CatchRight || (this._isTackling = !1, 
            this.changToDefaultColliderShape(), this._hitBall || EventManager.dispatchEvent(GameEvent.AVOID_TACKLES, this), 
            this._isGoalKeeper || this.owner.timerOnce(1e3, this, this.changeRigidBodyToKinematic));
            let nextAnimName = DefenderAnimSwitch[animState.name];
            nextAnimName && this.playAnim(nextAnimName);
        }
        changeRigidBodyToKinematic() {
            this._rigidBody.isKinematic = !0;
        }
        lookAtDirBall() {
            this.lookAtPosition(LevelNode.ball.owner.transform.position);
        }
        lookAtPosition(position) {
            this.owner.transform.lookAt(position, Vector3Ext.UnitY);
        }
        findRushWayPoints() {
            let pos = this.owner.transform.position, ballPos = LevelNode.ball.owner.transform.position, rushWayPoints2D = LevelNode.navMesh.findPath(new Vector2$6(pos.x, pos.z), new Vector2$6(ballPos.x, ballPos.z));
            this._rushWayPoints = [], rushWayPoints2D.forEach(pt => {
                this._rushWayPoints.push(new Vector3$8(pt.x, pos.y, pt.y));
            }), this._followWayPoints.wayPoints = this._rushWayPoints;
        }
        setFollowWayPointsEnabled(enable) {
            enable ? (this.findRushWayPoints(), this.owner.timerLoop(300, this, this.findRushWayPoints)) : this.owner.clearTimer(this, this.findRushWayPoints), 
            this._followWayPoints.loop = !1, this._followWayPoints.isLookAtWayPoint = !0, this._followWayPoints.moveSpeed = this.moveSpeed, 
            this._followWayPoints.enabled = enable;
        }
        onCollisionEnter(collision) {
            if (collision.other.collisionGroup === CollisionGroup.BALL) if (this._isTackling) {
                let transform = this.owner.transform;
                Vector3$8.subtract(LevelNode.ball.owner.transform.position, transform.position, _tmpVec3$7);
                let kickDirection = _tmpVec3$7, strength = 1;
                this._hitBall = !0;
                let vel = this._rigidBody.linearVelocity.clone();
                vel.y = 0, this._rigidBody.linearVelocity = vel, LevelNode.ball.kickToDirection(kickDirection, strength, !0), 
                PlatformUtils$1.vibrateLong();
            } else PlatformUtils$1.vibrateShort(); else this._isGoalKeeper && this._isFallen && collision.other.collisionGroup === CollisionGroup.GROUND && (this.changeRigidBodyToKinematic(), 
            this._isDefenderActive || this._rigidBody && (this._rigidBody.enabled = !1));
        }
        setActive(active) {
            this._isDefenderActive != active && (this._isDefenderActive = active, active ? this._rigidBody && (this._rigidBody.enabled = active, 
            this._rigidBody.angularVelocity = new Vector3$8(0, 0, 0), this._rigidBody.linearVelocity = new Vector3$8(0, 0, 0)) : this._isGoalKeeper && this._isFallen || this._rigidBody && (this._rigidBody.enabled = !1));
        }
        kill() {
            this._followWayPoints.enabled = !1, this._moveToDirection.enabled = !1, this._isFallen = !0, 
            this._isTackling = !1;
            let transform = this.owner.transform;
            Tween.to(transform, {
                localScaleX: 0,
                localScaleY: 0,
                localScaleZ: 0
            }, 250, Laya.Ease.cubicIn, Laya.Handler.create(this, () => {
                this.showParticles(), Laya.timer.once(1e3, this, () => {
                    SoundManager$8.playSound(SoundClips.PICK_KEY, 1), this.removeParticlesFromParent(), 
                    this.recoverToPool();
                });
            }));
        }
    }
    Defender.defenderPoolOption = {
        poolSize: 10,
        resourceFileName: "Defender.lh",
        poolSign: "Defender3D",
        gameObjectClass: Defender
    }, Defender.kickerGoalKeeperPoolOption = {
        poolSize: 1,
        resourceFileName: "KickerGoalKeeper.lh",
        poolSign: "KickerGoalKeeper3D",
        gameObjectClass: Defender
    }, Defender._defenderPool = new GameObjectPool(Defender.defenderPoolOption), Defender._kickerGoalKeeperPool = new GameObjectPool(Defender.kickerGoalKeeperPoolOption);
    var SoundManager$9 = Laya.SoundManager;
    class Coin extends Laya.Script3D {
        constructor() {
            super(...arguments), this._particles = [], this._spawnIndex = -1;
        }
        get spawnIndex() {
            return this._spawnIndex;
        }
        set spawnIndex(value) {
            this._spawnIndex = value;
        }
        static loadPrototypeAndInitPool(callback) {
            this._pool.loadPrototypeAndInitPool(callback);
        }
        static spawn(index) {
            let coin = this._pool.spawn();
            return coin.spawnIndex = index, coin;
        }
        recoverToPool() {
            Coin._pool.recoverToPool(this);
        }
        onAwake() {
            this.setupCollider(), this.setupParticles();
        }
        setupParticles() {
            this._particles = findClassFromChildren(this.owner, Laya.ShuriKenParticle3D);
        }
        removeParticlesFromParent() {
            for (let i = 0; i < this._particles.length; i++) {
                this._particles[i].removeSelf();
            }
        }
        showParticles() {
            ShowParticles(this._particles, this.owner);
        }
        setupCollider() {
            let collider = findChildComponent(this.owner, Laya.PhysicsCollider);
            collider && (collider.collisionGroup = CollisionGroup.COIN, collider.canCollideWith = CollisionGroup.BALL);
        }
        onEnable() {
            this.removeParticlesFromParent();
        }
        onDisable() {
            this.recoverToPool();
        }
        onTriggerEnter(other) {
            other.collisionGroup === CollisionGroup.BALL && (SoundManager$9.playSound(SoundClips.PICK_COIN, 1), 
            EventManager.dispatchEvent(GameEvent.PICKUP_COIN, this), this.showParticles(), this.owner.removeSelf(), 
            PlatformUtils$1.vibrateShort(), Laya.timer.once(1e3, this, () => {
                this.removeParticlesFromParent(), this.recoverToPool();
            }));
        }
        onUpdate() {
            let transform = this.owner.transform, rot = transform.rotationEuler;
            rot.y -= 2, transform.rotationEuler = rot;
        }
    }
    Coin.poolOption = {
        poolSize: 10,
        resourceFileName: "Coin.lh",
        poolSign: "Coin3D",
        gameObjectClass: Coin
    }, Coin._pool = new GameObjectPool(Coin.poolOption);
    var SoundManager$a = Laya.SoundManager;
    class Key extends Laya.Script3D {
        constructor() {
            super(...arguments), this._particles = [];
        }
        static loadPrototypeAndInitPool(callback) {
            this._pool.loadPrototypeAndInitPool(callback);
        }
        static spawn() {
            return this._pool.spawn();
        }
        recoverToPool() {
            Key._pool.recoverToPool(this);
        }
        onAwake() {
            this.setupCollider(), this.setupParticles();
        }
        setupParticles() {
            this._particles = findClassFromChildren(this.owner, Laya.ShuriKenParticle3D);
        }
        removeParticlesFromParent() {
            for (let i = 0; i < this._particles.length; i++) {
                this._particles[i].removeSelf();
            }
        }
        showParticles() {
            ShowParticles(this._particles, this.owner);
        }
        setupCollider() {
            let collider = findChildComponent(this.owner, Laya.PhysicsCollider);
            collider && (collider.collisionGroup = CollisionGroup.KEY, collider.canCollideWith = CollisionGroup.BALL);
        }
        onEnable() {
            this.removeParticlesFromParent();
        }
        onDisable() {
            this.recoverToPool();
        }
        onTriggerEnter(other) {
            other.collisionGroup === CollisionGroup.BALL && (SoundManager$a.playSound(SoundClips.PICK_KEY, 1), 
            EventManager.dispatchEvent(GameEvent.PICKUP_KEY, this), this.showParticles(), PlatformUtils$1.vibrateLong(), 
            this.owner.removeSelf(), Laya.timer.once(1e3, this, () => {
                this.removeParticlesFromParent(), this.recoverToPool();
            }));
        }
        onUpdate() {
            let transform = this.owner.transform, rot = transform.rotationEuler;
            rot.y -= 2, transform.rotationEuler = rot;
        }
    }
    Key.poolOption = {
        poolSize: 3,
        resourceFileName: "Key.lh",
        poolSign: "Key3D",
        gameObjectClass: Key
    }, Key._pool = new GameObjectPool(Key.poolOption);
    let buildLog = !1, epsilon = function(eps) {
        "number" != typeof eps && (eps = 1e-10);
        var my = {
            epsilon: function(v) {
                return "number" == typeof v && (eps = v), eps;
            },
            pointAboveOrOnLine: function(pt, left, right) {
                var Ax = left[0], Ay = left[1], Bx = right[0], By = right[1], Cx = pt[0], Cy = pt[1];
                return (Bx - Ax) * (Cy - Ay) - (By - Ay) * (Cx - Ax) >= -eps;
            },
            pointBetween: function(p, left, right) {
                var d_py_ly = p[1] - left[1], d_rx_lx = right[0] - left[0], d_px_lx = p[0] - left[0], d_ry_ly = right[1] - left[1], dot = d_px_lx * d_rx_lx + d_py_ly * d_ry_ly;
                if (dot < eps) return !1;
                var sqlen = d_rx_lx * d_rx_lx + d_ry_ly * d_ry_ly;
                return !(dot - sqlen > -eps);
            },
            pointsSameX: function(p1, p2) {
                return Math.abs(p1[0] - p2[0]) < eps;
            },
            pointsSameY: function(p1, p2) {
                return Math.abs(p1[1] - p2[1]) < eps;
            },
            pointsSame: function(p1, p2) {
                return my.pointsSameX(p1, p2) && my.pointsSameY(p1, p2);
            },
            pointsCompare: function(p1, p2) {
                return my.pointsSameX(p1, p2) ? my.pointsSameY(p1, p2) ? 0 : p1[1] < p2[1] ? -1 : 1 : p1[0] < p2[0] ? -1 : 1;
            },
            pointsCollinear: function(pt1, pt2, pt3) {
                var dx1 = pt1[0] - pt2[0], dy1 = pt1[1] - pt2[1], dx2 = pt2[0] - pt3[0], dy2 = pt2[1] - pt3[1];
                return Math.abs(dx1 * dy2 - dx2 * dy1) < eps;
            },
            linesIntersect: function(a0, a1, b0, b1) {
                var adx = a1[0] - a0[0], ady = a1[1] - a0[1], bdx = b1[0] - b0[0], bdy = b1[1] - b0[1], axb = adx * bdy - ady * bdx;
                if (Math.abs(axb) < eps) return !1;
                var dx = a0[0] - b0[0], dy = a0[1] - b0[1], A = (bdx * dy - bdy * dx) / axb, B = (adx * dy - ady * dx) / axb, ret = {
                    alongA: 0,
                    alongB: 0,
                    pt: [ a0[0] + A * adx, a0[1] + A * ady ]
                };
                return ret.alongA = A <= -eps ? -2 : A < eps ? -1 : A - 1 <= -eps ? 0 : A - 1 < eps ? 1 : 2, 
                ret.alongB = B <= -eps ? -2 : B < eps ? -1 : B - 1 <= -eps ? 0 : B - 1 < eps ? 1 : 2, 
                ret;
            },
            pointInsideRegion: function(pt, region) {
                for (var x = pt[0], y = pt[1], last_x = region[region.length - 1][0], last_y = region[region.length - 1][1], inside = !1, i = 0; i < region.length; i++) {
                    var curr_x = region[i][0], curr_y = region[i][1];
                    curr_y - y > eps != last_y - y > eps && (last_x - curr_x) * (y - curr_y) / (last_y - curr_y) + curr_x - x > eps && (inside = !inside), 
                    last_x = curr_x, last_y = curr_y;
                }
                return inside;
            }
        };
        return my;
    }();
    var GeoJSON_toPolygon = function(PolyBool, geojson) {
        function GeoPoly(coords) {
            if (coords.length <= 0) return PolyBool.segments({
                inverted: !1,
                regions: []
            });
            function LineString(ls) {
                var reg = ls.slice(0, ls.length - 1);
                return PolyBool.segments({
                    inverted: !1,
                    regions: [ reg ]
                });
            }
            for (var out = LineString(coords[0]), i = 1; i < coords.length; i++) out = PolyBool.selectDifference(PolyBool.combine(out, LineString(coords[i])));
            return out;
        }
        if ("Polygon" === geojson.type) return PolyBool.polygon(GeoPoly(geojson.coordinates));
        if ("MultiPolygon" === geojson.type) {
            for (var out = PolyBool.segments({
                inverted: !1,
                regions: []
            }), i = 0; i < geojson.coordinates.length; i++) out = PolyBool.selectUnion(PolyBool.combine(out, GeoPoly(geojson.coordinates[i])));
            return PolyBool.polygon(out);
        }
        throw new Error("PolyBool: Cannot convert GeoJSON object to PolyBool polygon");
    }, GeoJSON_fromPolygon = function(PolyBool, eps, poly) {
        function regionInsideRegion(r1, r2) {
            return eps.pointInsideRegion([ .5 * (r1[0][0] + r1[1][0]), .5 * (r1[0][1] + r1[1][1]) ], r2);
        }
        function newNode(region) {
            return {
                region: region,
                children: []
            };
        }
        poly = PolyBool.polygon(PolyBool.segments(poly));
        var roots = newNode(null);
        function addChild(root, region) {
            for (var i = 0; i < root.children.length; i++) {
                if (regionInsideRegion(region, (child = root.children[i]).region)) return void addChild(child, region);
            }
            var node = newNode(region);
            for (i = 0; i < root.children.length; i++) {
                var child;
                regionInsideRegion((child = root.children[i]).region, region) && (node.children.push(child), 
                root.children.splice(i, 1), i--);
            }
            root.children.push(node);
        }
        for (var i = 0; i < poly.regions.length; i++) {
            var region = poly.regions[i];
            region.length < 3 || addChild(roots, region);
        }
        function forceWinding(region, clockwise) {
            for (var winding = 0, last_x = region[region.length - 1][0], last_y = region[region.length - 1][1], copy = [], i = 0; i < region.length; i++) {
                var curr_x = region[i][0], curr_y = region[i][1];
                copy.push([ curr_x, curr_y ]), winding += curr_y * last_x - curr_x * last_y, last_x = curr_x, 
                last_y = curr_y;
            }
            return winding < 0 !== clockwise && copy.reverse(), copy.push([ copy[0][0], copy[0][1] ]), 
            copy;
        }
        var geopolys = [];
        function addExterior(node) {
            var poly = [ forceWinding(node.region, !1) ];
            geopolys.push(poly);
            for (var i = 0; i < node.children.length; i++) poly.push(getInterior(node.children[i]));
        }
        function getInterior(node) {
            for (var i = 0; i < node.children.length; i++) addExterior(node.children[i]);
            return forceWinding(node.region, !0);
        }
        for (i = 0; i < roots.children.length; i++) addExterior(roots.children[i]);
        return geopolys.length <= 0 ? {
            type: "Polygon",
            coordinates: []
        } : 1 == geopolys.length ? {
            type: "Polygon",
            coordinates: geopolys[0]
        } : {
            type: "MultiPolygon",
            coordinates: geopolys
        };
    };
    function Intersecter(selfIntersection, eps, buildLog) {
        function segmentCopy(start, end, seg) {
            return {
                id: buildLog ? buildLog.segmentId() : -1,
                start: start,
                end: end,
                myFill: {
                    above: seg.myFill.above,
                    below: seg.myFill.below
                },
                otherFill: null
            };
        }
        var event_root = LinkedList.create();
        function eventAdd(ev, other_pt) {
            event_root.insertBefore(ev, function(here) {
                return function(p1_isStart, p1_1, p1_2, p2_isStart, p2_1, p2_2) {
                    var comp = eps.pointsCompare(p1_1, p2_1);
                    return 0 !== comp ? comp : eps.pointsSame(p1_2, p2_2) ? 0 : p1_isStart !== p2_isStart ? p1_isStart ? 1 : -1 : eps.pointAboveOrOnLine(p1_2, p2_isStart ? p2_1 : p2_2, p2_isStart ? p2_2 : p2_1) ? 1 : -1;
                }(ev.isStart, ev.pt, other_pt, here.isStart, here.pt, here.other.pt) < 0;
            });
        }
        function eventAddSegment(seg, primary) {
            var ev_start = function(seg, primary) {
                var ev_start = LinkedList.node({
                    isStart: !0,
                    pt: seg.start,
                    seg: seg,
                    primary: primary,
                    other: null,
                    status: null
                });
                return eventAdd(ev_start, seg.end), ev_start;
            }(seg, primary);
            return function(ev_start, seg, primary) {
                var ev_end = LinkedList.node({
                    isStart: !1,
                    pt: seg.end,
                    seg: seg,
                    primary: primary,
                    other: ev_start,
                    status: null
                });
                ev_start.other = ev_end, eventAdd(ev_end, ev_start.pt);
            }(ev_start, seg, primary), ev_start;
        }
        function eventDivide(ev, pt) {
            var ns = segmentCopy(pt, ev.seg.end, ev.seg);
            return function(ev, end) {
                buildLog && buildLog.segmentChop(ev.seg, end), ev.other.remove(), ev.seg.end = end, 
                ev.other.pt = end, eventAdd(ev.other, ev.pt);
            }(ev, pt), eventAddSegment(ns, ev.primary);
        }
        function calculate(primaryPolyInverted, secondaryPolyInverted) {
            var status_root = LinkedList.create();
            function statusFindSurrounding(ev) {
                return status_root.findTransition(function(here) {
                    var ev1, ev2, a1, a2, b1, b2;
                    return (ev1 = ev, ev2 = here.ev, a1 = ev1.seg.start, a2 = ev1.seg.end, b1 = ev2.seg.start, 
                    b2 = ev2.seg.end, eps.pointsCollinear(a1, b1, b2) ? eps.pointsCollinear(a2, b1, b2) ? 1 : eps.pointAboveOrOnLine(a2, b1, b2) ? 1 : -1 : eps.pointAboveOrOnLine(a1, b1, b2) ? 1 : -1) > 0;
                });
            }
            function checkIntersection(ev1, ev2) {
                var seg1 = ev1.seg, seg2 = ev2.seg, a1 = seg1.start, a2 = seg1.end, b1 = seg2.start, b2 = seg2.end;
                buildLog && buildLog.checkIntersection(seg1, seg2);
                var i = eps.linesIntersect(a1, a2, b1, b2);
                if (!1 === i) {
                    if (!eps.pointsCollinear(a1, a2, b1)) return !1;
                    if (eps.pointsSame(a1, b2) || eps.pointsSame(a2, b1)) return !1;
                    var a1_equ_b1 = eps.pointsSame(a1, b1), a2_equ_b2 = eps.pointsSame(a2, b2);
                    if (a1_equ_b1 && a2_equ_b2) return ev2;
                    var a1_between = !a1_equ_b1 && eps.pointBetween(a1, b1, b2), a2_between = !a2_equ_b2 && eps.pointBetween(a2, b1, b2);
                    if (a1_equ_b1) return a2_between ? eventDivide(ev2, a2) : eventDivide(ev1, b2), 
                    ev2;
                    a1_between && (a2_equ_b2 || (a2_between ? eventDivide(ev2, a2) : eventDivide(ev1, b2)), 
                    eventDivide(ev2, a1));
                } else 0 === i.alongA && (-1 === i.alongB ? eventDivide(ev1, b1) : 0 === i.alongB ? eventDivide(ev1, i.pt) : 1 === i.alongB && eventDivide(ev1, b2)), 
                0 === i.alongB && (-1 === i.alongA ? eventDivide(ev2, a1) : 0 === i.alongA ? eventDivide(ev2, i.pt) : 1 === i.alongA && eventDivide(ev2, a2));
                return !1;
            }
            for (var segments = []; !event_root.isEmpty(); ) {
                var ev = event_root.getHead();
                if (buildLog && buildLog.vert(ev.pt[0]), ev.isStart) {
                    buildLog && buildLog.segmentNew(ev.seg, ev.primary);
                    var surrounding = statusFindSurrounding(ev), above = surrounding.before ? surrounding.before.ev : null, below = surrounding.after ? surrounding.after.ev : null;
                    function checkBothIntersections() {
                        if (above) {
                            var eve = checkIntersection(ev, above);
                            if (eve) return eve;
                        }
                        return !!below && checkIntersection(ev, below);
                    }
                    buildLog && buildLog.tempStatus(ev.seg, !!above && above.seg, !!below && below.seg);
                    var inside, eve = checkBothIntersections();
                    if (eve) {
                        var toggle;
                        if (selfIntersection) (toggle = null === ev.seg.myFill.below || ev.seg.myFill.above !== ev.seg.myFill.below) && (eve.seg.myFill.above = !eve.seg.myFill.above); else eve.seg.otherFill = ev.seg.myFill;
                        buildLog && buildLog.segmentUpdate(eve.seg), ev.other.remove(), ev.remove();
                    }
                    if (event_root.getHead() !== ev) {
                        buildLog && buildLog.rewind(ev.seg);
                        continue;
                    }
                    if (selfIntersection) toggle = null === ev.seg.myFill.below || ev.seg.myFill.above !== ev.seg.myFill.below, 
                    ev.seg.myFill.below = below ? below.seg.myFill.above : primaryPolyInverted, ev.seg.myFill.above = toggle ? !ev.seg.myFill.below : ev.seg.myFill.below; else if (null === ev.seg.otherFill) inside = below ? ev.primary === below.primary ? below.seg.otherFill.above : below.seg.myFill.above : ev.primary ? secondaryPolyInverted : primaryPolyInverted, 
                    ev.seg.otherFill = {
                        above: inside,
                        below: inside
                    };
                    buildLog && buildLog.status(ev.seg, !!above && above.seg, !!below && below.seg), 
                    ev.other.status = surrounding.insert(LinkedList.node({
                        ev: ev
                    }));
                } else {
                    var st = ev.status;
                    if (null === st) throw new Error("PolyBool: Zero-length segment detected; your epsilon is probably too small or too large");
                    if (status_root.exists(st.prev) && status_root.exists(st.next) && checkIntersection(st.prev.ev, st.next.ev), 
                    buildLog && buildLog.statusRemove(st.ev.seg), st.remove(), !ev.primary) {
                        var s = ev.seg.myFill;
                        ev.seg.myFill = ev.seg.otherFill, ev.seg.otherFill = s;
                    }
                    segments.push(ev.seg);
                }
                event_root.getHead().remove();
            }
            return buildLog && buildLog.done(), segments;
        }
        return selfIntersection ? {
            addRegion: function(region) {
                for (var pt1, start, end, pt2 = region[region.length - 1], i = 0; i < region.length; i++) {
                    pt1 = pt2, pt2 = region[i];
                    var forward = eps.pointsCompare(pt1, pt2);
                    0 !== forward && eventAddSegment((start = forward < 0 ? pt1 : pt2, end = forward < 0 ? pt2 : pt1, 
                    {
                        id: buildLog ? buildLog.segmentId() : -1,
                        start: start,
                        end: end,
                        myFill: {
                            above: null,
                            below: null
                        },
                        otherFill: null
                    }), !0);
                }
            },
            calculate: function(inverted) {
                return calculate(inverted, !1);
            }
        } : {
            calculate: function(segments1, inverted1, segments2, inverted2) {
                return segments1.forEach(function(seg) {
                    eventAddSegment(segmentCopy(seg.start, seg.end, seg), !0);
                }), segments2.forEach(function(seg) {
                    eventAddSegment(segmentCopy(seg.start, seg.end, seg), !1);
                }), calculate(inverted1, inverted2);
            }
        };
    }
    var LinkedList = {
        create: function() {
            var my = {
                root: {
                    root: !0,
                    next: null
                },
                exists: function(node) {
                    return null !== node && node !== my.root;
                },
                isEmpty: function() {
                    return null === my.root.next;
                },
                getHead: function() {
                    return my.root.next;
                },
                insertBefore: function(node, check) {
                    for (var last = my.root, here = my.root.next; null !== here; ) {
                        if (check(here)) return node.prev = here.prev, node.next = here, here.prev.next = node, 
                        void (here.prev = node);
                        last = here, here = here.next;
                    }
                    last.next = node, node.prev = last, node.next = null;
                },
                findTransition: function(check) {
                    for (var prev = my.root, here = my.root.next; null !== here && !check(here); ) prev = here, 
                    here = here.next;
                    return {
                        before: prev === my.root ? null : prev,
                        after: here,
                        insert: function(node) {
                            return node.prev = prev, node.next = here, prev.next = node, null !== here && (here.prev = node), 
                            node;
                        }
                    };
                }
            };
            return my;
        },
        node: function(data) {
            return data.prev = null, data.next = null, data.remove = function() {
                data.prev.next = data.next, data.next && (data.next.prev = data.prev), data.prev = null, 
                data.next = null;
            }, data;
        }
    };
    function SegmentChainer(segments, eps, buildLog) {
        var chains = [], regions = [];
        return segments.forEach(function(seg) {
            var pt1 = seg.start, pt2 = seg.end;
            if (eps.pointsSame(pt1, pt2)) console.warn("PolyBool: Warning: Zero-length segment detected; your epsilon is probably too small or too large"); else {
                buildLog && buildLog.chainStart(seg);
                for (var first_match = {
                    index: 0,
                    matches_head: !1,
                    matches_pt1: !1
                }, second_match = {
                    index: 0,
                    matches_head: !1,
                    matches_pt1: !1
                }, next_match = first_match, i = 0; i < chains.length; i++) {
                    var head = (chain = chains[i])[0], tail = (chain[1], chain[chain.length - 1]);
                    chain[chain.length - 2];
                    if (eps.pointsSame(head, pt1)) {
                        if (setMatch(i, !0, !0)) break;
                    } else if (eps.pointsSame(head, pt2)) {
                        if (setMatch(i, !0, !1)) break;
                    } else if (eps.pointsSame(tail, pt1)) {
                        if (setMatch(i, !1, !0)) break;
                    } else if (eps.pointsSame(tail, pt2) && setMatch(i, !1, !1)) break;
                }
                if (next_match === first_match) return chains.push([ pt1, pt2 ]), void (buildLog && buildLog.chainNew(pt1, pt2));
                if (next_match === second_match) {
                    buildLog && buildLog.chainMatch(first_match.index);
                    var index = first_match.index, pt = first_match.matches_pt1 ? pt2 : pt1, addToHead = first_match.matches_head, chain = chains[index], grow = addToHead ? chain[0] : chain[chain.length - 1], grow2 = addToHead ? chain[1] : chain[chain.length - 2], oppo = addToHead ? chain[chain.length - 1] : chain[0], oppo2 = addToHead ? chain[chain.length - 2] : chain[1];
                    return eps.pointsCollinear(grow2, grow, pt) && (addToHead ? (buildLog && buildLog.chainRemoveHead(first_match.index, pt), 
                    chain.shift()) : (buildLog && buildLog.chainRemoveTail(first_match.index, pt), chain.pop()), 
                    grow = grow2), eps.pointsSame(oppo, pt) ? (chains.splice(index, 1), eps.pointsCollinear(oppo2, oppo, grow) && (addToHead ? (buildLog && buildLog.chainRemoveTail(first_match.index, grow), 
                    chain.pop()) : (buildLog && buildLog.chainRemoveHead(first_match.index, grow), chain.shift())), 
                    buildLog && buildLog.chainClose(first_match.index), void regions.push(chain)) : void (addToHead ? (buildLog && buildLog.chainAddHead(first_match.index, pt), 
                    chain.unshift(pt)) : (buildLog && buildLog.chainAddTail(first_match.index, pt), 
                    chain.push(pt)));
                }
                var F = first_match.index, S = second_match.index;
                buildLog && buildLog.chainConnect(F, S);
                var reverseF = chains[F].length < chains[S].length;
                first_match.matches_head ? second_match.matches_head ? reverseF ? (reverseChain(F), 
                appendChain(F, S)) : (reverseChain(S), appendChain(S, F)) : appendChain(S, F) : second_match.matches_head ? appendChain(F, S) : reverseF ? (reverseChain(F), 
                appendChain(S, F)) : (reverseChain(S), appendChain(F, S));
            }
            function setMatch(index, matches_head, matches_pt1) {
                return next_match.index = index, next_match.matches_head = matches_head, next_match.matches_pt1 = matches_pt1, 
                next_match === first_match ? (next_match = second_match, !1) : (next_match = null, 
                !0);
            }
            function reverseChain(index) {
                buildLog && buildLog.chainReverse(index), chains[index].reverse();
            }
            function appendChain(index1, index2) {
                var chain1 = chains[index1], chain2 = chains[index2], tail = chain1[chain1.length - 1], tail2 = chain1[chain1.length - 2], head = chain2[0], head2 = chain2[1];
                eps.pointsCollinear(tail2, tail, head) && (buildLog && buildLog.chainRemoveTail(index1, tail), 
                chain1.pop(), tail = tail2), eps.pointsCollinear(tail, head, head2) && (buildLog && buildLog.chainRemoveHead(index2, head), 
                chain2.shift()), buildLog && buildLog.chainJoin(index1, index2), chains[index1] = chain1.concat(chain2), 
                chains.splice(index2, 1);
            }
        }), regions;
    }
    function select(segments, selection, buildLog) {
        var result = [];
        return segments.forEach(function(seg) {
            var index = (seg.myFill.above ? 8 : 0) + (seg.myFill.below ? 4 : 0) + (seg.otherFill && seg.otherFill.above ? 2 : 0) + (seg.otherFill && seg.otherFill.below ? 1 : 0);
            0 !== selection[index] && result.push({
                id: buildLog ? buildLog.segmentId() : -1,
                start: seg.start,
                end: seg.end,
                myFill: {
                    above: 1 === selection[index],
                    below: 2 === selection[index]
                },
                otherFill: null
            });
        }), buildLog && buildLog.selected(result), result;
    }
    var PolyBool, SegmentSelector_union = function(segments, buildLog) {
        return select(segments, [ 0, 2, 1, 0, 2, 2, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0 ], buildLog);
    }, SegmentSelector_intersect = function(segments, buildLog) {
        return select(segments, [ 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 1, 1, 0, 2, 1, 0 ], buildLog);
    }, SegmentSelector_difference = function(segments, buildLog) {
        return select(segments, [ 0, 0, 0, 0, 2, 0, 2, 0, 1, 1, 0, 0, 0, 1, 2, 0 ], buildLog);
    }, SegmentSelector_differenceRev = function(segments, buildLog) {
        return select(segments, [ 0, 2, 1, 0, 0, 0, 1, 1, 0, 2, 0, 2, 0, 0, 0, 0 ], buildLog);
    }, SegmentSelector_xor = function(segments, buildLog) {
        return select(segments, [ 0, 2, 1, 0, 2, 0, 0, 1, 1, 0, 0, 2, 0, 1, 2, 0 ], buildLog);
    };
    function operate(poly1, poly2, selector) {
        var seg1 = PolyBool.segments(poly1), seg2 = PolyBool.segments(poly2), seg3 = selector(PolyBool.combine(seg1, seg2));
        return PolyBool.polygon(seg3);
    }
    var PolyBool$1 = PolyBool = {
        buildLog: function(bl) {
            return !0 === bl ? buildLog = function() {
                var my, nextSegmentId = 0, curVert = !1;
                function push(type, data) {
                    return my.list.push({
                        type: type,
                        data: data ? JSON.parse(JSON.stringify(data)) : void 0
                    }), my;
                }
                return my = {
                    list: [],
                    segmentId: function() {
                        return nextSegmentId++;
                    },
                    checkIntersection: function(seg1, seg2) {
                        return push("check", {
                            seg1: seg1,
                            seg2: seg2
                        });
                    },
                    segmentChop: function(seg, end) {
                        return push("div_seg", {
                            seg: seg,
                            pt: end
                        }), push("chop", {
                            seg: seg,
                            pt: end
                        });
                    },
                    statusRemove: function(seg) {
                        return push("pop_seg", {
                            seg: seg
                        });
                    },
                    segmentUpdate: function(seg) {
                        return push("seg_update", {
                            seg: seg
                        });
                    },
                    segmentNew: function(seg, primary) {
                        return push("new_seg", {
                            seg: seg,
                            primary: primary
                        });
                    },
                    segmentRemove: function(seg) {
                        return push("rem_seg", {
                            seg: seg
                        });
                    },
                    tempStatus: function(seg, above, below) {
                        return push("temp_status", {
                            seg: seg,
                            above: above,
                            below: below
                        });
                    },
                    rewind: function(seg) {
                        return push("rewind", {
                            seg: seg
                        });
                    },
                    status: function(seg, above, below) {
                        return push("status", {
                            seg: seg,
                            above: above,
                            below: below
                        });
                    },
                    vert: function(x) {
                        return x === curVert ? my : (curVert = x, push("vert", {
                            x: x
                        }));
                    },
                    log: function(data) {
                        return "string" != typeof data && (data = JSON.stringify(data, !1, "  ")), push("log", {
                            txt: data
                        });
                    },
                    reset: function() {
                        return push("reset");
                    },
                    selected: function(segs) {
                        return push("selected", {
                            segs: segs
                        });
                    },
                    chainStart: function(seg) {
                        return push("chain_start", {
                            seg: seg
                        });
                    },
                    chainRemoveHead: function(index, pt) {
                        return push("chain_rem_head", {
                            index: index,
                            pt: pt
                        });
                    },
                    chainRemoveTail: function(index, pt) {
                        return push("chain_rem_tail", {
                            index: index,
                            pt: pt
                        });
                    },
                    chainNew: function(pt1, pt2) {
                        return push("chain_new", {
                            pt1: pt1,
                            pt2: pt2
                        });
                    },
                    chainMatch: function(index) {
                        return push("chain_match", {
                            index: index
                        });
                    },
                    chainClose: function(index) {
                        return push("chain_close", {
                            index: index
                        });
                    },
                    chainAddHead: function(index, pt) {
                        return push("chain_add_head", {
                            index: index,
                            pt: pt
                        });
                    },
                    chainAddTail: function(index, pt) {
                        return push("chain_add_tail", {
                            index: index,
                            pt: pt
                        });
                    },
                    chainConnect: function(index1, index2) {
                        return push("chain_con", {
                            index1: index1,
                            index2: index2
                        });
                    },
                    chainReverse: function(index) {
                        return push("chain_rev", {
                            index: index
                        });
                    },
                    chainJoin: function(index1, index2) {
                        return push("chain_join", {
                            index1: index1,
                            index2: index2
                        });
                    },
                    done: function() {
                        return push("done");
                    }
                };
            }() : !1 === bl && (buildLog = !1), !1 !== buildLog && buildLog.list;
        },
        epsilon: function(v) {
            return epsilon.epsilon(v);
        },
        segments: function(poly) {
            var i = Intersecter(!0, epsilon, buildLog);
            return poly.regions.forEach(i.addRegion), {
                segments: i.calculate(poly.inverted),
                inverted: poly.inverted
            };
        },
        combine: function(segments1, segments2) {
            return {
                combined: Intersecter(!1, epsilon, buildLog).calculate(segments1.segments, segments1.inverted, segments2.segments, segments2.inverted),
                inverted1: segments1.inverted,
                inverted2: segments2.inverted
            };
        },
        selectUnion: function(combined) {
            return {
                segments: SegmentSelector_union(combined.combined, buildLog),
                inverted: combined.inverted1 || combined.inverted2
            };
        },
        selectIntersect: function(combined) {
            return {
                segments: SegmentSelector_intersect(combined.combined, buildLog),
                inverted: combined.inverted1 && combined.inverted2
            };
        },
        selectDifference: function(combined) {
            return {
                segments: SegmentSelector_difference(combined.combined, buildLog),
                inverted: combined.inverted1 && !combined.inverted2
            };
        },
        selectDifferenceRev: function(combined) {
            return {
                segments: SegmentSelector_differenceRev(combined.combined, buildLog),
                inverted: !combined.inverted1 && combined.inverted2
            };
        },
        selectXor: function(combined) {
            return {
                segments: SegmentSelector_xor(combined.combined, buildLog),
                inverted: combined.inverted1 !== combined.inverted2
            };
        },
        polygon: function(segments) {
            return {
                regions: SegmentChainer(segments.segments, epsilon, buildLog),
                inverted: segments.inverted
            };
        },
        polygonFromGeoJSON: function(geojson) {
            return GeoJSON_toPolygon(PolyBool, geojson);
        },
        polygonToGeoJSON: function(poly) {
            return GeoJSON_fromPolygon(PolyBool, epsilon, poly);
        },
        union: function(poly1, poly2) {
            return operate(poly1, poly2, PolyBool.selectUnion);
        },
        intersect: function(poly1, poly2) {
            return operate(poly1, poly2, PolyBool.selectIntersect);
        },
        difference: function(poly1, poly2) {
            return operate(poly1, poly2, PolyBool.selectDifference);
        },
        differenceRev: function(poly1, poly2) {
            return operate(poly1, poly2, PolyBool.selectDifferenceRev);
        },
        xor: function(poly1, poly2) {
            return operate(poly1, poly2, PolyBool.selectXor);
        }
    };
    let decomp = {
        decomp: function(polygon) {
            var edges = function polygonGetCutEdges(polygon) {
                var min = [], tmp1 = [], tmp2 = [], tmpPoly = [];
                var nDiags = Number.MAX_VALUE;
                for (var i = 0; i < polygon.length; ++i) if (polygonIsReflex(polygon, i)) for (var j = 0; j < polygon.length; ++j) if (polygonCanSee(polygon, i, j)) {
                    tmp1 = polygonGetCutEdges(polygonCopy(polygon, i, j, tmpPoly)), tmp2 = polygonGetCutEdges(polygonCopy(polygon, j, i, tmpPoly));
                    for (var k = 0; k < tmp2.length; k++) tmp1.push(tmp2[k]);
                    tmp1.length < nDiags && (min = tmp1, nDiags = tmp1.length, min.push([ polygonAt(polygon, i), polygonAt(polygon, j) ]));
                }
                return min;
            }(polygon);
            return edges.length > 0 ? function polygonSlice(polygon, cutEdges) {
                if (0 === cutEdges.length) return [ polygon ];
                if (cutEdges instanceof Array && cutEdges.length && cutEdges[0] instanceof Array && 2 === cutEdges[0].length && cutEdges[0][0] instanceof Array) {
                    var polys = [ polygon ];
                    for (let i = 0; i < cutEdges.length; i++) {
                        var cutEdge = cutEdges[i];
                        for (let j = 0; j < polys.length; j++) {
                            var poly = polys[j], result = polygonSlice(poly, cutEdge);
                            if (result) {
                                polys.splice(j, 1), polys.push(result[0], result[1]);
                                break;
                            }
                        }
                    }
                    return polys;
                }
                {
                    var cutEdge = cutEdges;
                    let i = polygon.indexOf(cutEdge[0]), j = polygon.indexOf(cutEdge[1]);
                    return -1 !== i && -1 !== j && [ polygonCopy(polygon, i, j), polygonCopy(polygon, j, i) ];
                }
            }(polygon, edges) : [ polygon ];
        },
        quickDecomp: function polygonQuickDecomp(polygon, result, reflexVertices, steinerPoints, delta, maxlevel, level) {
            maxlevel = maxlevel || 100;
            level = level || 0;
            delta = delta || 25;
            result = void 0 !== result ? result : [];
            reflexVertices = reflexVertices || [];
            steinerPoints = steinerPoints || [];
            var upperInt = [ 0, 0 ], lowerInt = [ 0, 0 ], p = [ 0, 0 ];
            var upperDist = 0, lowerDist = 0, d = 0, closestDist = 0;
            var upperIndex = 0, lowerIndex = 0, closestIndex = 0;
            var lowerPoly = [], upperPoly = [];
            var poly = polygon, v = polygon;
            if (v.length < 3) return result;
            level++;
            if (level > maxlevel) return console.warn("quickDecomp: max level (" + maxlevel + ") reached."), 
            result;
            for (var i = 0; i < polygon.length; ++i) if (polygonIsReflex(poly, i)) {
                reflexVertices.push(poly[i]), upperDist = lowerDist = Number.MAX_VALUE;
                for (var j = 0; j < polygon.length; ++j) isLeft(polygonAt(poly, i - 1), polygonAt(poly, i), polygonAt(poly, j)) && isRightOn(polygonAt(poly, i - 1), polygonAt(poly, i), polygonAt(poly, j - 1)) && (p = getIntersectionPoint(polygonAt(poly, i - 1), polygonAt(poly, i), polygonAt(poly, j), polygonAt(poly, j - 1)), 
                isRight(polygonAt(poly, i + 1), polygonAt(poly, i), p) && (d = sqdist(poly[i], p)) < lowerDist && (lowerDist = d, 
                lowerInt = p, lowerIndex = j)), isLeft(polygonAt(poly, i + 1), polygonAt(poly, i), polygonAt(poly, j + 1)) && isRightOn(polygonAt(poly, i + 1), polygonAt(poly, i), polygonAt(poly, j)) && (p = getIntersectionPoint(polygonAt(poly, i + 1), polygonAt(poly, i), polygonAt(poly, j), polygonAt(poly, j + 1)), 
                isLeft(polygonAt(poly, i - 1), polygonAt(poly, i), p) && (d = sqdist(poly[i], p)) < upperDist && (upperDist = d, 
                upperInt = p, upperIndex = j));
                if (lowerIndex === (upperIndex + 1) % polygon.length) p[0] = (lowerInt[0] + upperInt[0]) / 2, 
                p[1] = (lowerInt[1] + upperInt[1]) / 2, steinerPoints.push(p), i < upperIndex ? (polygonAppend(lowerPoly, poly, i, upperIndex + 1), 
                lowerPoly.push(p), upperPoly.push(p), 0 !== lowerIndex && polygonAppend(upperPoly, poly, lowerIndex, poly.length), 
                polygonAppend(upperPoly, poly, 0, i + 1)) : (0 !== i && polygonAppend(lowerPoly, poly, i, poly.length), 
                polygonAppend(lowerPoly, poly, 0, upperIndex + 1), lowerPoly.push(p), upperPoly.push(p), 
                polygonAppend(upperPoly, poly, lowerIndex, i + 1)); else {
                    if (lowerIndex > upperIndex && (upperIndex += polygon.length), closestDist = Number.MAX_VALUE, 
                    upperIndex < lowerIndex) return result;
                    for (var j = lowerIndex; j <= upperIndex; ++j) isLeftOn(polygonAt(poly, i - 1), polygonAt(poly, i), polygonAt(poly, j)) && isRightOn(polygonAt(poly, i + 1), polygonAt(poly, i), polygonAt(poly, j)) && (d = sqdist(polygonAt(poly, i), polygonAt(poly, j))) < closestDist && polygonCanSee2(poly, i, j) && (closestDist = d, 
                    closestIndex = j % polygon.length);
                    i < closestIndex ? (polygonAppend(lowerPoly, poly, i, closestIndex + 1), 0 !== closestIndex && polygonAppend(upperPoly, poly, closestIndex, v.length), 
                    polygonAppend(upperPoly, poly, 0, i + 1)) : (0 !== i && polygonAppend(lowerPoly, poly, i, v.length), 
                    polygonAppend(lowerPoly, poly, 0, closestIndex + 1), polygonAppend(upperPoly, poly, closestIndex, i + 1));
                }
                return lowerPoly.length < upperPoly.length ? (polygonQuickDecomp(lowerPoly, result, reflexVertices, steinerPoints, delta, maxlevel, level), 
                polygonQuickDecomp(upperPoly, result, reflexVertices, steinerPoints, delta, maxlevel, level)) : (polygonQuickDecomp(upperPoly, result, reflexVertices, steinerPoints, delta, maxlevel, level), 
                polygonQuickDecomp(lowerPoly, result, reflexVertices, steinerPoints, delta, maxlevel, level)), 
                result;
            }
            result.push(polygon);
            return result;
        },
        isSimple: function(polygon) {
            var i, path = polygon;
            for (i = 0; i < path.length - 1; i++) for (var j = 0; j < i - 1; j++) if (lineSegmentsIntersect(path[i], path[i + 1], path[j], path[j + 1])) return !1;
            for (i = 1; i < path.length - 2; i++) if (lineSegmentsIntersect(path[0], path[path.length - 1], path[i], path[i + 1])) return !1;
            return !0;
        },
        removeCollinearPoints: function(polygon, precision) {
            for (var num = 0, i = polygon.length - 1; polygon.length > 3 && i >= 0; --i) collinear(polygonAt(polygon, i - 1), polygonAt(polygon, i), polygonAt(polygon, i + 1), precision) && (polygon.splice(i % polygon.length, 1), 
            num++);
            return num;
        },
        removeDuplicatePoints: function(polygon, precision) {
            for (let i = polygon.length - 1; i >= 1; --i) {
                let pi = polygon[i];
                for (let j = i - 1; j >= 0; --j) points_eq(pi, polygon[j], precision) && polygon.splice(i, 1);
            }
        },
        makeCCW: function(polygon) {
            for (var br = 0, v = polygon, i = 1; i < polygon.length; ++i) (v[i][1] < v[br][1] || v[i][1] === v[br][1] && v[i][0] > v[br][0]) && (br = i);
            return !isLeft(polygonAt(polygon, br - 1), polygonAt(polygon, br), polygonAt(polygon, br + 1)) && (function(polygon) {
                for (var tmp = [], N = polygon.length, i = 0; i !== N; i++) tmp.push(polygon.pop());
                for (var i = 0; i !== N; i++) polygon[i] = tmp[i];
            }(polygon), !0);
        }
    };
    function lineInt(l1, l2, precision) {
        precision = precision || 0;
        let a1, b1, c1, a2, b2, c2, det, i = [ 0, 0 ];
        return a1 = l1[1][1] - l1[0][1], b1 = l1[0][0] - l1[1][0], c1 = a1 * l1[0][0] + b1 * l1[0][1], 
        a2 = l2[1][1] - l2[0][1], b2 = l2[0][0] - l2[1][0], c2 = a2 * l2[0][0] + b2 * l2[0][1], 
        scalar_eq(det = a1 * b2 - a2 * b1, 0, precision) || (i[0] = (b2 * c1 - b1 * c2) / det, 
        i[1] = (a1 * c2 - a2 * c1) / det), i;
    }
    function lineSegmentsIntersect(p1, p2, q1, q2) {
        var dx = p2[0] - p1[0], dy = p2[1] - p1[1], da = q2[0] - q1[0], db = q2[1] - q1[1];
        if (da * dy - db * dx == 0) return !1;
        var s = (dx * (q1[1] - p1[1]) + dy * (p1[0] - q1[0])) / (da * dy - db * dx), t = (da * (p1[1] - q1[1]) + db * (q1[0] - p1[0])) / (db * dx - da * dy);
        return s >= 0 && s <= 1 && t >= 0 && t <= 1;
    }
    function triangleArea(a, b, c) {
        return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
    }
    function isLeft(a, b, c) {
        return triangleArea(a, b, c) > 0;
    }
    function isLeftOn(a, b, c) {
        return triangleArea(a, b, c) >= 0;
    }
    function isRight(a, b, c) {
        return triangleArea(a, b, c) < 0;
    }
    function isRightOn(a, b, c) {
        return triangleArea(a, b, c) <= 0;
    }
    var tmpPoint1 = [], tmpPoint2 = [];
    function collinear(a, b, c, thresholdAngle) {
        if (thresholdAngle) {
            var ab = tmpPoint1, bc = tmpPoint2;
            ab[0] = b[0] - a[0], ab[1] = b[1] - a[1], bc[0] = c[0] - b[0], bc[1] = c[1] - b[1];
            var dot = ab[0] * bc[0] + ab[1] * bc[1], magA = Math.sqrt(ab[0] * ab[0] + ab[1] * ab[1]), magB = Math.sqrt(bc[0] * bc[0] + bc[1] * bc[1]);
            return Math.acos(dot / (magA * magB)) < thresholdAngle;
        }
        return 0 === triangleArea(a, b, c);
    }
    function sqdist(a, b) {
        var dx = b[0] - a[0], dy = b[1] - a[1];
        return dx * dx + dy * dy;
    }
    function polygonAt(polygon, i) {
        var s = polygon.length;
        return polygon[i < 0 ? i % s + s : i % s];
    }
    function polygonAppend(polygon, poly, from, to) {
        for (var i = from; i < to; i++) polygon.push(poly[i]);
    }
    function polygonIsReflex(polygon, i) {
        return isRight(polygonAt(polygon, i - 1), polygonAt(polygon, i), polygonAt(polygon, i + 1));
    }
    var tmpLine1 = [], tmpLine2 = [];
    function polygonCanSee(polygon, a, b) {
        var p, dist, l1 = tmpLine1, l2 = tmpLine2;
        if (isLeftOn(polygonAt(polygon, a + 1), polygonAt(polygon, a), polygonAt(polygon, b)) && isRightOn(polygonAt(polygon, a - 1), polygonAt(polygon, a), polygonAt(polygon, b))) return !1;
        dist = sqdist(polygonAt(polygon, a), polygonAt(polygon, b));
        for (var i = 0; i !== polygon.length; ++i) if ((i + 1) % polygon.length !== a && i !== a && isLeftOn(polygonAt(polygon, a), polygonAt(polygon, b), polygonAt(polygon, i + 1)) && isRightOn(polygonAt(polygon, a), polygonAt(polygon, b), polygonAt(polygon, i)) && (l1[0] = polygonAt(polygon, a), 
        l1[1] = polygonAt(polygon, b), l2[0] = polygonAt(polygon, i), l2[1] = polygonAt(polygon, i + 1), 
        p = lineInt(l1, l2), sqdist(polygonAt(polygon, a), p) < dist)) return !1;
        return !0;
    }
    function polygonCanSee2(polygon, a, b) {
        for (let i = 0; i !== polygon.length; ++i) if (i !== a && i !== b && (i + 1) % polygon.length !== a && (i + 1) % polygon.length !== b && lineSegmentsIntersect(polygonAt(polygon, a), polygonAt(polygon, b), polygonAt(polygon, i), polygonAt(polygon, i + 1))) return !1;
        return !0;
    }
    function polygonCopy(polygon, i, j, targetPoly) {
        var p = targetPoly || [];
        if (function(polygon) {
            polygon.length = 0;
        }(p), i < j) for (let k = i; k <= j; k++) p.push(polygon[k]); else {
            for (let k = 0; k <= j; k++) p.push(polygon[k]);
            for (let k = i; k < polygon.length; k++) p.push(polygon[k]);
        }
        return p;
    }
    function getIntersectionPoint(p1, p2, q1, q2, delta) {
        delta = delta || 0;
        var a1 = p2[1] - p1[1], b1 = p1[0] - p2[0], c1 = a1 * p1[0] + b1 * p1[1], a2 = q2[1] - q1[1], b2 = q1[0] - q2[0], c2 = a2 * q1[0] + b2 * q1[1], det = a1 * b2 - a2 * b1;
        return scalar_eq(det, 0, delta) ? [ 0, 0 ] : [ (b2 * c1 - b1 * c2) / det, (a1 * c2 - a2 * c1) / det ];
    }
    function scalar_eq(a, b, precision) {
        return precision = precision || 0, Math.abs(a - b) <= precision;
    }
    function points_eq(a, b, precision) {
        return scalar_eq(a[0], b[0], precision) && scalar_eq(a[1], b[1], precision);
    }
    class Vector2$7 {
        constructor(x, y) {
            this.x = x || 0, this.y = y || 0;
        }
        equals(v) {
            return this.x === v.x && this.y === v.y;
        }
        angle(v) {
            return Math.atan2(v.y - this.y, v.x - this.x);
        }
        distance(v) {
            const dx = v.x - this.x, dy = v.y - this.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
        add(v) {
            this.x += v.x, this.y += v.y;
        }
        subtract(v) {
            this.x -= v.x, this.y -= v.y;
        }
        clone() {
            return new Vector2$7(this.x, this.y);
        }
    }
    class NavPoly {
        constructor(id, polygon) {
            this.id = id, this.polygon = polygon, this.edges = polygon.edges, this.neighbors = [], 
            this.portals = [], this.centroid = this.calculateCentroid(), this.boundingRadius = this.calculateRadius(), 
            this.weight = 1;
        }
        getPoints() {
            return this.polygon.points;
        }
        contains(point) {
            return this.polygon.contains(point.x, point.y) || this.isPointOnEdge(point);
        }
        calculateCentroid() {
            const centroid = new Vector2$7(0, 0), length = this.polygon.points.length;
            return this.polygon.points.forEach(p => centroid.add(p)), centroid.x /= length, 
            centroid.y /= length, centroid;
        }
        calculateRadius() {
            let boundingRadius = 0;
            for (const point of this.polygon.points) {
                const d = this.centroid.distance(point);
                d > boundingRadius && (boundingRadius = d);
            }
            return boundingRadius;
        }
        isPointOnEdge({x: x, y: y}) {
            for (const edge of this.edges) if (edge.pointOnSegment(x, y)) return !0;
            return !1;
        }
        destroy() {
            this.neighbors = [], this.portals = [];
        }
        toString() {
            return `NavPoly(id: ${this.id} at: ${this.centroid})`;
        }
        isWall() {
            return 0 === this.weight;
        }
        centroidDistance(navPolygon) {
            return this.centroid.distance(navPolygon.centroid);
        }
        getCost(navPolygon) {
            return this.centroidDistance(navPolygon);
        }
    }
    function pathTo(node) {
        for (var curr = node, path = []; curr.parent; ) path.unshift(curr), curr = curr.parent;
        return path;
    }
    let astar = {
        search: function(graph, start, end, options) {
            graph.cleanDirty();
            var heuristic = (options = options || {}).heuristic || astar.heuristics.manhattan, closest = options.closest || !1, openHeap = new BinaryHeap(function(node) {
                return node.f;
            }), closestNode = start;
            for (start.h = heuristic(start, end), graph.markDirty(start), openHeap.push(start); openHeap.size() > 0; ) {
                var currentNode = openHeap.pop();
                if (currentNode === end) return pathTo(currentNode);
                currentNode.closed = !0;
                for (var neighbors = graph.neighbors(currentNode), i = 0, il = neighbors.length; i < il; ++i) {
                    var neighbor = neighbors[i];
                    if (!neighbor.closed && !neighbor.isWall()) {
                        var gScore = currentNode.g + neighbor.getCost(currentNode), beenVisited = neighbor.visited;
                        (!beenVisited || gScore < neighbor.g) && (neighbor.visited = !0, neighbor.parent = currentNode, 
                        neighbor.h = neighbor.h || heuristic(neighbor, end), neighbor.g = gScore, neighbor.f = neighbor.g + neighbor.h, 
                        graph.markDirty(neighbor), closest && (neighbor.h < closestNode.h || neighbor.h === closestNode.h && neighbor.g < closestNode.g) && (closestNode = neighbor), 
                        beenVisited ? openHeap.rescoreElement(neighbor) : openHeap.push(neighbor));
                    }
                }
            }
            return closest ? pathTo(closestNode) : [];
        },
        heuristics: {
            manhattan: function(pos0, pos1) {
                return Math.abs(pos1.x - pos0.x) + Math.abs(pos1.y - pos0.y);
            },
            diagonal: function(pos0, pos1) {
                var D2 = Math.sqrt(2), d1 = Math.abs(pos1.x - pos0.x), d2 = Math.abs(pos1.y - pos0.y);
                return 1 * (d1 + d2) + (D2 - 2) * Math.min(d1, d2);
            }
        },
        cleanNode: function(node) {
            node.f = 0, node.g = 0, node.h = 0, node.visited = !1, node.closed = !1, node.parent = null;
        }
    };
    function Graph(gridIn, options) {
        options = options || {}, this.nodes = [], this.diagonal = !!options.diagonal, this.grid = [];
        for (var x = 0; x < gridIn.length; x++) {
            this.grid[x] = [];
            for (var y = 0, row = gridIn[x]; y < row.length; y++) {
                var node = new GridNode(x, y, row[y]);
                this.grid[x][y] = node, this.nodes.push(node);
            }
        }
        this.init();
    }
    function GridNode(x, y, weight) {
        this.x = x, this.y = y, this.weight = weight;
    }
    function BinaryHeap(scoreFunction) {
        this.content = [], this.scoreFunction = scoreFunction;
    }
    Graph.prototype.init = function() {
        this.dirtyNodes = [];
        for (var i = 0; i < this.nodes.length; i++) astar.cleanNode(this.nodes[i]);
    }, Graph.prototype.cleanDirty = function() {
        for (var i = 0; i < this.dirtyNodes.length; i++) astar.cleanNode(this.dirtyNodes[i]);
        this.dirtyNodes = [];
    }, Graph.prototype.markDirty = function(node) {
        this.dirtyNodes.push(node);
    }, Graph.prototype.neighbors = function(node) {
        var ret = [], x = node.x, y = node.y, grid = this.grid;
        return grid[x - 1] && grid[x - 1][y] && ret.push(grid[x - 1][y]), grid[x + 1] && grid[x + 1][y] && ret.push(grid[x + 1][y]), 
        grid[x] && grid[x][y - 1] && ret.push(grid[x][y - 1]), grid[x] && grid[x][y + 1] && ret.push(grid[x][y + 1]), 
        this.diagonal && (grid[x - 1] && grid[x - 1][y - 1] && ret.push(grid[x - 1][y - 1]), 
        grid[x + 1] && grid[x + 1][y - 1] && ret.push(grid[x + 1][y - 1]), grid[x - 1] && grid[x - 1][y + 1] && ret.push(grid[x - 1][y + 1]), 
        grid[x + 1] && grid[x + 1][y + 1] && ret.push(grid[x + 1][y + 1])), ret;
    }, Graph.prototype.toString = function() {
        for (var graphString = [], nodes = this.grid, x = 0; x < nodes.length; x++) {
            for (var rowDebug = [], row = nodes[x], y = 0; y < row.length; y++) rowDebug.push(row[y].weight);
            graphString.push(rowDebug.join(" "));
        }
        return graphString.join("\n");
    }, GridNode.prototype.toString = function() {
        return "[" + this.x + " " + this.y + "]";
    }, GridNode.prototype.getCost = function(fromNeighbor) {
        return fromNeighbor && fromNeighbor.x != this.x && fromNeighbor.y != this.y ? 1.41421 * this.weight : this.weight;
    }, GridNode.prototype.isWall = function() {
        return 0 === this.weight;
    }, BinaryHeap.prototype = {
        push: function(element) {
            this.content.push(element), this.sinkDown(this.content.length - 1);
        },
        pop: function() {
            var result = this.content[0], end = this.content.pop();
            return this.content.length > 0 && (this.content[0] = end, this.bubbleUp(0)), result;
        },
        remove: function(node) {
            var i = this.content.indexOf(node), end = this.content.pop();
            i !== this.content.length - 1 && (this.content[i] = end, this.scoreFunction(end) < this.scoreFunction(node) ? this.sinkDown(i) : this.bubbleUp(i));
        },
        size: function() {
            return this.content.length;
        },
        rescoreElement: function(node) {
            this.sinkDown(this.content.indexOf(node));
        },
        sinkDown: function(n) {
            for (var element = this.content[n]; n > 0; ) {
                var parentN = (n + 1 >> 1) - 1, parent = this.content[parentN];
                if (!(this.scoreFunction(element) < this.scoreFunction(parent))) break;
                this.content[parentN] = element, this.content[n] = parent, n = parentN;
            }
        },
        bubbleUp: function(n) {
            for (var length = this.content.length, element = this.content[n], elemScore = this.scoreFunction(element); ;) {
                var child1Score, child2N = n + 1 << 1, child1N = child2N - 1, swap = null;
                if (child1N < length) {
                    var child1 = this.content[child1N];
                    (child1Score = this.scoreFunction(child1)) < elemScore && (swap = child1N);
                }
                if (child2N < length) {
                    var child2 = this.content[child2N];
                    this.scoreFunction(child2) < (null === swap ? elemScore : child1Score) && (swap = child2N);
                }
                if (null === swap) break;
                this.content[n] = this.content[swap], this.content[swap] = element, n = swap;
            }
        }
    };
    class NavGraph {
        constructor(navPolygons) {
            this.nodes = navPolygons, this.init();
        }
        neighbors(navPolygon) {
            return navPolygon.neighbors;
        }
        navHeuristic(navPolygon1, navPolygon2) {
            return navPolygon1.centroidDistance(navPolygon2);
        }
        destroy() {
            this.cleanDirty(), this.nodes = [];
        }
    }
    function triarea2(a, b, c) {
        const ax = b.x - a.x, ay = b.y - a.y;
        return (c.x - a.x) * ay - ax * (c.y - a.y);
    }
    function almostEqual(value1, value2, errorMargin = 1e-4) {
        return Math.abs(value1 - value2) <= errorMargin;
    }
    function angleDifference(x, y) {
        let a = x - y;
        const i = a + Math.PI, j = 2 * Math.PI;
        return a = i - Math.floor(i / j) * j, a -= Math.PI;
    }
    function areCollinear(line1, line2, errorMargin = 1e-4) {
        const area1 = triarea2(line1.start, line1.end, line2.start), area2 = triarea2(line1.start, line1.end, line2.end);
        return almostEqual(area1, 0, errorMargin) && almostEqual(area2, 0, errorMargin);
    }
    NavGraph.prototype.init = Graph.prototype.init, NavGraph.prototype.cleanDirty = Graph.prototype.cleanDirty, 
    NavGraph.prototype.markDirty = Graph.prototype.markDirty;
    class Channel {
        constructor() {
            this.portals = [];
        }
        push(p1, p2 = null) {
            null === p2 && (p2 = p1), this.portals.push({
                left: p1,
                right: p2
            });
        }
        stringPull() {
            let portalApex, portalLeft, portalRight, portals = this.portals, pts = [], apexIndex = 0, leftIndex = 0, rightIndex = 0;
            portalApex = portals[0].left, portalLeft = portals[0].left, portalRight = portals[0].right, 
            pts.push(portalApex);
            for (var i = 1; i < portals.length; i++) {
                var left = portals[i].left, right = portals[i].right;
                if (triarea2(portalApex, portalRight, right) <= 0) {
                    if (!(portalApex.equals(portalRight) || triarea2(portalApex, portalLeft, right) > 0)) {
                        pts.push(portalLeft), portalLeft = portalApex = portalLeft, portalRight = portalApex, 
                        leftIndex = apexIndex = leftIndex, rightIndex = apexIndex, i = apexIndex;
                        continue;
                    }
                    portalRight = right, rightIndex = i;
                }
                if (triarea2(portalApex, portalLeft, left) >= 0) {
                    if (!(portalApex.equals(portalLeft) || triarea2(portalApex, portalRight, left) < 0)) {
                        pts.push(portalRight), portalLeft = portalApex = portalRight, portalRight = portalApex, 
                        leftIndex = apexIndex = rightIndex, rightIndex = apexIndex, i = apexIndex;
                        continue;
                    }
                    portalLeft = left, leftIndex = i;
                }
            }
            return 0 !== pts.length && pts[pts.length - 1].equals(portals[portals.length - 1].left) || pts.push(portals[portals.length - 1].left), 
            this.path = pts, pts;
        }
    }
    class Line {
        constructor(x1, y1, x2, y2) {
            this.start = new Vector2$7(x1, y1), this.end = new Vector2$7(x2, y2), this.left = Math.min(x1, x2), 
            this.right = Math.max(x1, x2), this.top = Math.min(y1, y2), this.bottom = Math.max(y1, y2);
        }
        pointOnSegment(x, y) {
            return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom && this.pointOnLine(x, y);
        }
        pointOnLine(x, y) {
            return (x - this.left) * (this.bottom - this.top) == (this.right - this.left) * (y - this.top);
        }
    }
    class Polygon {
        constructor(points, closed = !0) {
            this.points = points, this.edges = [];
            for (let i = 1; i < points.length; i++) {
                const p1 = points[i - 1], p2 = points[i];
                this.edges.push(new Line(p1.x, p1.y, p2.x, p2.y));
            }
            if (closed) {
                const first = points[0], last = points[points.length - 1];
                this.edges.push(new Line(first.x, first.y, last.x, last.y));
            }
        }
        contains(x, y) {
            let inside = !1;
            for (let i = -1, j = this.points.length - 1; ++i < this.points.length; j = i) {
                const ix = this.points[i].x, iy = this.points[i].y, jx = this.points[j].x, jy = this.points[j].y;
                (iy <= y && y < jy || jy <= y && y < iy) && x < (jx - ix) * (y - iy) / (jy - iy) + ix && (inside = !inside);
            }
            return inside;
        }
    }
    class NavMesh {
        constructor(meshPolygonPoints, meshShrinkAmount = 0) {
            this._meshShrinkAmount = meshShrinkAmount;
            const newPolys = meshPolygonPoints.map(polyPoints => {
                const vectors = polyPoints.map(p => new Vector2$7(p.x, p.y));
                return new Polygon(vectors);
            });
            this._navPolygons = newPolys.map((polygon, i) => new NavPoly(i, polygon)), this._calculateNeighbors(), 
            this._graph = new NavGraph(this._navPolygons);
        }
        getPolygons() {
            return this._navPolygons;
        }
        destroy() {
            this._graph.destroy();
            for (const poly of this._navPolygons) poly.destroy();
            this._navPolygons = [];
        }
        findPath(startPoint, endPoint) {
            let d, r, startPoly = null, endPoly = null, startDistance = Number.MAX_VALUE, endDistance = Number.MAX_VALUE;
            const startVector = new Vector2$7(startPoint.x, startPoint.y), endVector = new Vector2$7(endPoint.x, endPoint.y);
            for (const navPoly of this._navPolygons) r = navPoly.boundingRadius, (d = navPoly.centroid.distance(startVector)) <= startDistance && d <= r && navPoly.contains(startVector) && (startPoly = navPoly, 
            startDistance = d), (d = navPoly.centroid.distance(endVector)) <= endDistance && d <= r && navPoly.contains(endVector) && (endPoly = navPoly, 
            endDistance = d);
            if (!startPoly && this._meshShrinkAmount > 0) for (const navPoly of this._navPolygons) if (r = navPoly.boundingRadius + this._meshShrinkAmount, 
            (d = navPoly.centroid.distance(startVector)) <= r) {
                const {distance: distance} = this._projectPointToPolygon(startVector, navPoly);
                distance <= this._meshShrinkAmount && distance < startDistance && (startPoly = navPoly, 
                startDistance = distance);
            }
            if (!endPoly && this._meshShrinkAmount > 0) for (const navPoly of this._navPolygons) if (r = navPoly.boundingRadius + this._meshShrinkAmount, 
            (d = navPoly.centroid.distance(endVector)) <= r) {
                const {distance: distance} = this._projectPointToPolygon(endVector, navPoly);
                distance <= this._meshShrinkAmount && distance < endDistance && (endPoly = navPoly, 
                endDistance = distance);
            }
            if (!startPoly || !endPoly) return null;
            if (startPoly === endPoly) return [ startVector, endVector ];
            const astarPath = astar.search(this._graph, startPoly, endPoly, {
                heuristic: this._graph.navHeuristic
            });
            if (0 === astarPath.length) return null;
            astarPath.unshift(startPoly);
            const channel = new Channel();
            channel.push(startVector);
            for (let i = 0; i < astarPath.length - 1; i++) {
                const navPolygon = astarPath[i], nextNavPolygon = astarPath[i + 1];
                let portal = null;
                for (let i = 0; i < navPolygon.neighbors.length; i++) navPolygon.neighbors[i].id === nextNavPolygon.id && (portal = navPolygon.portals[i]);
                channel.push(portal.start, portal.end);
            }
            channel.push(endVector), channel.stringPull();
            let lastPoint = null;
            const phaserPath = [];
            for (const p of channel.path) {
                const newPoint = p.clone();
                lastPoint && newPoint.equals(lastPoint) || phaserPath.push(newPoint), lastPoint = newPoint;
            }
            return phaserPath;
        }
        _calculateNeighbors() {
            for (let i = 0; i < this._navPolygons.length; i++) {
                const navPoly = this._navPolygons[i];
                for (let j = i + 1; j < this._navPolygons.length; j++) {
                    const otherNavPoly = this._navPolygons[j];
                    if (!(navPoly.centroid.distance(otherNavPoly.centroid) > navPoly.boundingRadius + otherNavPoly.boundingRadius)) for (const edge of navPoly.edges) for (const otherEdge of otherNavPoly.edges) {
                        if (!areCollinear(edge, otherEdge)) continue;
                        const overlap = this._getSegmentOverlap(edge, otherEdge);
                        if (!overlap) continue;
                        navPoly.neighbors.push(otherNavPoly), otherNavPoly.neighbors.push(navPoly);
                        const [p1, p2] = overlap;
                        let edgeStartAngle = navPoly.centroid.angle(edge.start), a1 = navPoly.centroid.angle(overlap[0]), a2 = navPoly.centroid.angle(overlap[1]), d1 = angleDifference(edgeStartAngle, a1), d2 = angleDifference(edgeStartAngle, a2);
                        d1 < d2 ? navPoly.portals.push(new Line(p1.x, p1.y, p2.x, p2.y)) : navPoly.portals.push(new Line(p2.x, p2.y, p1.x, p1.y)), 
                        edgeStartAngle = otherNavPoly.centroid.angle(otherEdge.start), a1 = otherNavPoly.centroid.angle(overlap[0]), 
                        a2 = otherNavPoly.centroid.angle(overlap[1]), (d1 = angleDifference(edgeStartAngle, a1)) < (d2 = angleDifference(edgeStartAngle, a2)) ? otherNavPoly.portals.push(new Line(p1.x, p1.y, p2.x, p2.y)) : otherNavPoly.portals.push(new Line(p2.x, p2.y, p1.x, p1.y));
                    }
                }
            }
        }
        _getSegmentOverlap(line1, line2) {
            const points = [ {
                line: line1,
                point: line1.start
            }, {
                line: line1,
                point: line1.end
            }, {
                line: line2,
                point: line2.start
            }, {
                line: line2,
                point: line2.end
            } ];
            points.sort(function(a, b) {
                return a.point.x < b.point.x ? -1 : a.point.x > b.point.x ? 1 : a.point.y < b.point.y ? -1 : a.point.y > b.point.y ? 1 : 0;
            });
            const noOverlap = points[0].line === points[1].line, singlePointOverlap = points[1].point.equals(points[2].point);
            return noOverlap || singlePointOverlap ? null : [ points[1].point, points[2].point ];
        }
        _projectPointToPolygon(point, navPoly) {
            let closestProjection = null, closestDistance = Number.MAX_VALUE;
            for (const edge of navPoly.edges) {
                const projectedPoint = this._projectPointToEdge(point, edge), d = point.distance(projectedPoint);
                (null === closestProjection || d < closestDistance) && (closestDistance = d, closestProjection = projectedPoint);
            }
            return {
                point: closestProjection,
                distance: closestDistance
            };
        }
        _distanceSquared(a, b) {
            const dx = b.x - a.x, dy = b.y - a.y;
            return dx * dx + dy * dy;
        }
        _projectPointToEdge(point, line) {
            const a = line.start, b = line.end, l2 = this._distanceSquared(a, b);
            let t = ((point.x - a.x) * (b.x - a.x) + (point.y - a.y) * (b.y - a.y)) / l2;
            var value, min, max;
            return (value = t) < (min = 0) && (value = min), value > (max = 1) && (value = max), 
            t = value, new Vector2$7(a.x + t * (b.x - a.x), a.y + t * (b.y - a.y));
        }
    }
    var PhysicsCollider$1 = Laya.PhysicsCollider, Vector3$9 = Laya.Vector3, BoxColliderShape = Laya.BoxColliderShape, Vector2$8 = Laya.Vector2;
    let _tmpVec3$8 = new Vector3$9();
    class LevelNavMesh {
        constructor(navMeshRoot) {
            this._root = navMeshRoot;
        }
        initNavMesh() {
            let groundPolygons = this.parseGroundPolygons(), obstaclePolygons = this.parseObstaclePolygons(), navMeshPolygons = this.makeNavMeshWithPolyBool(groundPolygons, obstaclePolygons);
            this._navMesh = new NavMesh(navMeshPolygons);
        }
        findPath(from, to) {
            if (!this._navMesh) return console.error("NavMesh没有初始化"), null;
            let path = this._navMesh.findPath(from, to), result = [];
            if (path) for (let i = 0; i < path.length; i++) result.push(new Vector2$8(path[i].x, path[i].y));
            return result;
        }
        makeNavMeshWithPolyBool(groundPolygons, obstaclePolygons) {
            if (0 === groundPolygons.length) return [];
            let segments = PolyBool$1.segments(this.getPolyBoolRegionFromPolygonArray(groundPolygons[0]));
            for (let i = 1; i < groundPolygons.length; i++) {
                let seg2 = PolyBool$1.segments(this.getPolyBoolRegionFromPolygonArray(groundPolygons[i])), comb = PolyBool$1.combine(segments, seg2);
                segments = PolyBool$1.selectUnion(comb);
            }
            let polyA = PolyBool$1.polygon(segments);
            for (let i = 0; i < obstaclePolygons.length; i++) {
                let polyB = this.getPolyBoolRegionFromPolygonArray(obstaclePolygons[i]);
                polyA = PolyBool$1.difference(polyA, polyB);
            }
            let regions = polyA.regions, polygons = [];
            for (let i = 0; i < regions.length; i++) {
                let region = regions[i], poly = [];
                region.forEach(pt => {
                    poly.push(new Vector2$8(pt[0], pt[1]));
                }), polygons.push(poly);
            }
            return polygons = this.decompPolygons(polygons);
        }
        getPolyBoolRegionFromPolygonArray(polygon) {
            let region = [];
            return polygon.forEach(pt => {
                region.push([ pt.x, pt.y ]);
            }), {
                regions: [ region ],
                inverted: !1
            };
        }
        parseGroundPolygons() {
            let groundRootNode = this._root.getChildByName("Grounds");
            if (groundRootNode) {
                let groundColliders = findChildComponents(groundRootNode, PhysicsCollider$1);
                return this.parseCollidersPolygons(groundColliders);
            }
            return [];
        }
        parseObstaclePolygons() {
            let obstaclesRootNode = findChildByNamePath("Level/Obstacles", this._root);
            if (obstaclesRootNode) {
                let obstacleColliders = findChildComponents(obstaclesRootNode, PhysicsCollider$1);
                return this.parseCollidersPolygons(obstacleColliders);
            }
            return [];
        }
        parseCollidersPolygons(colliders) {
            let polygons = [];
            for (let i = 0; i < colliders.length; i++) {
                let collider = colliders[i], vertices = LevelNavMesh.getBoxColliderVertices(collider), polygon2d = this.convertVerticesTo2DPolygon(vertices);
                polygon2d && polygons.push(polygon2d);
            }
            return polygons;
        }
        static getBoxColliderVertices(collider) {
            let transform = collider.owner.transform, colliderShape = collider.colliderShape;
            if (colliderShape instanceof BoxColliderShape) {
                let vertices = [];
                const NUM_VERTICES = 8, axis = [ {
                    x: -1,
                    z: 1,
                    y: 1
                }, {
                    x: -1,
                    z: -1,
                    y: 1
                }, {
                    x: 1,
                    z: -1,
                    y: 1
                }, {
                    x: 1,
                    z: 1,
                    y: 1
                }, {
                    x: -1,
                    z: 1,
                    y: 0
                }, {
                    x: -1,
                    z: -1,
                    y: 0
                }, {
                    x: 1,
                    z: -1,
                    y: 0
                }, {
                    x: 1,
                    z: 1,
                    y: 0
                } ];
                let boxColliderShape = colliderShape, colliderCentre = boxColliderShape.localOffset, colliderExtents = new Vector3$9(boxColliderShape.sizeX / 2, boxColliderShape.sizeY / 2, boxColliderShape.sizeZ / 2);
                for (let i = 0; i != NUM_VERTICES; ++i) {
                    Vector3$9.multiply(colliderExtents, new Vector3$9(axis[i].x, 0, axis[i].z), _tmpVec3$8), 
                    Vector3$9.add(colliderCentre, _tmpVec3$8, _tmpVec3$8);
                    let vertexPosGlobal = Transform3DExt.transformPoint(transform, _tmpVec3$8);
                    vertices.push(vertexPosGlobal.clone());
                }
                return vertices;
            }
            return null;
        }
        convertVerticesTo2DPolygon(vertices) {
            if (!vertices || vertices && vertices.length < 3) return null;
            let polygon = [];
            function isPtInPolygon(pt) {
                for (let i = 0; i < polygon.length; i++) if (pt.x === polygon[i].x && pt.y === polygon[i].y) return !0;
                return !1;
            }
            for (let i = 0; i < vertices.length; i++) {
                let pt = new Vector2$8(vertices[i].x, vertices[i].z);
                isPtInPolygon(pt) || polygon.push(pt);
            }
            return polygon.length < 3 ? null : polygon;
        }
        decompPolygons(polygons) {
            let result = [];
            return polygons.forEach(poly => {
                let subPolygons = LevelNavMesh.decompPolygon(poly);
                for (let j = 0; j < subPolygons.length; j++) {
                    let subPoly = subPolygons[j];
                    result.push(subPoly);
                }
            }), result;
        }
        static decompPolygon(points) {
            if (!points) return [];
            let polygon = [];
            for (let pt of points) polygon.push([ pt.x, pt.y ]);
            if (!decomp.isSimple(polygon)) return console.error("多边形自相交, 请检查多边形设置"), [];
            decomp.makeCCW(polygon);
            let convexPolygons = decomp.quickDecomp(polygon), result = [];
            for (let convexPolygon of convexPolygons) {
                let pts = [];
                for (let pt of convexPolygon) pts.push(new Vector2$8(pt[0], pt[1]));
                result.push(pts);
            }
            return result;
        }
    }
    let DepthMaskShaderVS = '\n#include "Lighting.glsl";\nattribute vec4 a_Position;\nattribute vec4 a_Color;\nuniform mat4 u_MvpMatrix;\nvarying lowp vec4 xlv_COLOR0;\nvoid main()\n{\n    lowp vec4 tmpvar_1;\n    mediump vec4 tmpvar_2;\n    tmpvar_2 = clamp (a_Color, 0.0, 1.0);\n    tmpvar_1 = tmpvar_2;\n    highp vec4 tmpvar_3;\n    tmpvar_3.w = 1.0;\n    tmpvar_3.xyz = a_Position.xyz;\n    xlv_COLOR0 = tmpvar_1;\n    gl_Position = u_MvpMatrix * a_Position;\n    gl_Position=remapGLPositionZ(gl_Position);\n}\n', DepthMaskShaderFS = "\nvarying lowp vec4 xlv_COLOR0;\nvoid main ()\n{\n  gl_FragData[0] = xlv_COLOR0;\n  //gl_FragColor = xlv_COLOR0;\n}\n";
    var Shader3D = Laya.Shader3D, BaseMaterial = Laya.BaseMaterial, RenderState = Laya.RenderState;
    class DepthMaskMaterial extends BaseMaterial {
        constructor() {
            super(), this.setShaderName("DepthMaskShader"), this.alphaTest = !1, this.renderQueue = BaseMaterial.RENDERQUEUE_OPAQUE - 10, 
            this.depthWrite = !0, this.cull = RenderState.CULL_BACK, this.blend = RenderState.BLEND_DISABLE, 
            this.depthTest = RenderState.DEPTHTEST_LESS;
        }
        static initShader() {
            let attributeMap = {
                a_Position: Laya.VertexMesh.MESH_POSITION0,
                a_Color: Laya.VertexMesh.MESH_COLOR0
            }, uniformMap = {
                u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE
            }, stateMap = {
                s_Cull: Shader3D.RENDER_STATE_CULL,
                s_Blend: Shader3D.RENDER_STATE_BLEND,
                s_BlendSrc: Shader3D.RENDER_STATE_BLEND_SRC,
                s_BlendDst: Shader3D.RENDER_STATE_BLEND_DST,
                s_DepthTest: Shader3D.RENDER_STATE_DEPTH_TEST,
                s_DepthWrite: Shader3D.RENDER_STATE_DEPTH_WRITE
            }, 
            customShader = Laya.Shader3D.add("DepthMaskShader"), 
            subShader = new Laya.SubShader(attributeMap, uniformMap);
            customShader.addSubShader(subShader), 
            DepthMaskMaterial._pass = subShader.addShaderPass(DepthMaskShaderVS, DepthMaskShaderFS, stateMap), 
            DepthMaskMaterial._pass.renderState.colorMaskR = !1, DepthMaskMaterial._pass.renderState.colorMaskG = !1, 
            DepthMaskMaterial._pass.renderState.colorMaskB = !1, DepthMaskMaterial._pass.renderState.colorMaskA = !1;
        }
        set depthTest(value) {
            this._shaderValues.setInt(DepthMaskMaterial.DEPTH_TEST, value);
        }
        get depthTest() {
            return this._shaderValues.getInt(DepthMaskMaterial.DEPTH_TEST);
        }
        set depthWrite(value) {
            this._shaderValues.setBool(DepthMaskMaterial.DEPTH_WRITE, value);
        }
        get depthWrite() {
            return this._shaderValues.getBool(DepthMaskMaterial.DEPTH_WRITE);
        }
        set blend(value) {
            this._shaderValues.setInt(DepthMaskMaterial.BLEND, value);
        }
        get blend() {
            return this._shaderValues.getInt(DepthMaskMaterial.BLEND);
        }
        set cull(value) {
            this._shaderValues.setInt(DepthMaskMaterial.CULL, value);
        }
        get cull() {
            return this._shaderValues.getInt(DepthMaskMaterial.CULL);
        }
        set blendSrc(value) {
            this._shaderValues.setInt(DepthMaskMaterial.BLEND_SRC, value);
        }
        get blendSrc() {
            return this._shaderValues.getInt(DepthMaskMaterial.BLEND_SRC);
        }
        set blendDst(value) {
            this._shaderValues.setInt(DepthMaskMaterial.BLEND_DST, value);
        }
        get blendDst() {
            return this._shaderValues.getInt(DepthMaskMaterial.BLEND_DST);
        }
    }
    function LoadSubpackage(subpackageName, successCallback, failCallback) {
        void successCallback();
        // return subpackageName ? -1 === ALL_SUBPACKAGES.indexOf(subpackageName) ? (console.log("无效的分包名, 请检查config文件", subpackageName), 
        // void successCallback()) : void ("undefined" != typeof wx ? wx.loadSubpackage({
        //     name: subpackageName,
        //     success: function(res) {
        //         console.log("加载分包成功:", subpackageName), successCallback(res);
        //     },
        //     fail: function(res) {
        //         console.log("加载分包失败:", res, subpackageName), failCallback && failCallback(res);
        //     }
        // }) : "undefined" != typeof qg ? qg.loadSubpackage({
        //     name: subpackageName,
        //     success: function(res) {
        //         console.log("加载分包成功:", subpackageName), successCallback(res);
        //     },
        //     fail: function(res) {
        //         console.log("加载分包失败:", res, subpackageName), failCallback && failCallback(res);
        //     }
        // }) : (console.log("加载分包成功:", subpackageName), successCallback())) : (console.log("无subpackageName"), 
        // void successCallback());
    }
    DepthMaskMaterial.DEPTH_TEST = Shader3D.propertyNameToID("s_DepthTest"), DepthMaskMaterial.DEPTH_WRITE = Shader3D.propertyNameToID("s_DepthWrite"), 
    DepthMaskMaterial.CULL = Shader3D.propertyNameToID("s_Cull"), DepthMaskMaterial.BLEND = Shader3D.propertyNameToID("s_Blend"), 
    DepthMaskMaterial.BLEND_SRC = Shader3D.propertyNameToID("s_BlendSrc"), DepthMaskMaterial.BLEND_DST = Shader3D.propertyNameToID("s_BlendDst"), 
    DepthMaskMaterial._pass = null;
    var Script3D$5 = Laya.Script3D, Sprite3D$3 = Laya.Sprite3D, Handler$4 = Laya.Handler, Vector3$a = Laya.Vector3, PhysicsCollider$2 = Laya.PhysicsCollider, BaseMaterial$1 = Laya.BaseMaterial, SoundManager$b = Laya.SoundManager;
    const DYNAMIC_ENABLE_COLLIDER_DISTANCE_SQR = 100;
    class LevelNode extends Script3D$5 {
        constructor() {
            super(...arguments), this._gfxSpriteNode = null, this._cameraFollowLookAt = null, 
            this._cameraShootLookAt = null, this._gameControl = null, this._physicsColliders = [], 
            this._groundColliders = [], this._outFieldsColliders = [], this._defenders = [], 
            this._dynamicEnableColliders = [], this._resurgenceTimes = 0;
        }
        static get navMesh() {
            return this._navMesh;
        }
        static set ball(value) {
            LevelNode._ball && (LevelNode._ball.owner && LevelNode._ball.owner.removeSelf(), 
            LevelNode._ball = null), this._ball = value;
        }
        static get ball() {
            return this._ball;
        }
        static set camera(value) {
            this._camera = value;
        }
        static get camera() {
            return this._camera;
        }
        static get goal() {
            return this._goal;
        }
        static set goal(value) {
            LevelNode._goal && (LevelNode._goal.owner && LevelNode._goal.owner.removeSelf(), 
            LevelNode._goal = null), this._goal = value;
        }
        static get isPlayingLevel() {
            return this._isPlayingLevel;
        }
        onEnable() {
            EventManager.registerEvent(GameEvent.BALL_GOAL, this.onBallGoal, this), EventManager.registerEvent(GameEvent.BALL_OUT_OF_RANGE, this.onBallOutOfRange, this), 
            EventManager.registerEvent(GameEvent.SKIN_ID_CHANGED, this.onSkinIdChanged, this), 
            EventManager.registerEvent(GameEvent.PICKUP_COIN, this.onPickupCoin, this), EventManager.registerEvent(GameEvent.PICKUP_KEY, this.onPickupKey, this), 
            EventManager.registerEvent(GameEvent.AVOID_TACKLES, this.onAvoidTackles, this), 
            EventManager.registerEvent(GameEvent.START_PLAYING_LEVEL, this.onStartPlayingLevel, this), 
            EventManager.registerEvent(GameEvent.KILL_DEFENDERS, this.killDefendersAndResurgence, this), 
            EventManager.registerEvent(GameEvent.SKIN_TRY_OUT, this.onSkinIdChanged, this);

            LevelNode._settlementData.pickUpCoin = 0;
        }
        onDisable() {
            EventManager.releaseAllEvents(this);
        }
        onDestroy() {
            this._gfxSpriteNode && (this._gfxSpriteNode.destroy(!0), this._gfxSpriteNode = null), 
            LevelNode.ball = null;
        }
        setParent(parent) {
            this._gfxSpriteNode && (parent.addChild(this._gfxSpriteNode), this._gfxSpriteNode.transform.position = new Vector3$a(0, 0, 0)), 
            parent.addChild(this.owner);
        }
        static loadLevel(parent, levelId, camera, isBonusLv, callback) 
        {
            console.log(""), function(callback) {
                console.log("loadGameObject3DResources"), Defender.loadPrototypeAndInitPool(() => {
                    console.log("loadGameObject(Defender)"), Key.loadPrototypeAndInitPool(() => {
                        console.log(" loadGameObject(Key)"), Coin.loadPrototypeAndInitPool(() => {
                            console.log("loadGameObject(Coin)"), callback();
                        });
                    });
                });
            }(() => {
                console.log("loadGameObject3DResources"), this.loadLevelNode(levelId, levelNode => {
                    console.log("loadLevelNode"), LevelNode._settlementData.isBonusLv = isBonusLv, LevelNode.camera = camera, 
                    levelNode.spawnGFX(gfxNode => {
                        console.log("spawnGFX"), levelNode.setParent(parent), Laya.timer.callLater(this, () => {
                            levelNode.spawnGoal(isBonusLv, () => {
                                console.log("spawnGoal"), levelNode._playerSkinId = GamePlayerData.getUsingSkinId(), 
                                levelNode.spawnBallWithSkinId(levelNode._playerSkinId, () => {
                                    console.log("spawnBallWithSkinId"), isBonusLv ? levelNode.spawnBonusCoins() : levelNode.spawnDefenders(), 
                                    levelNode.spawnCoinAndKey(isBonusLv), levelNode.setupGroundShadow(), levelNode.setupHoles(), 
                                    levelNode.setupNavMesh(), levelNode.setupPhysicsColliders(), (!this.lastLevelPickData || LevelNode.lastLevelPickData && LevelNode.lastLevelPickData.level != levelId) && (this.lastLevelPickData = {
                                        level: levelId,
                                        coinPickup: [],
                                        keyPickup: !1
                                    }), callback(levelNode);
                                });
                            });
                        });
                    });
                });
            });
        }
        static loadLevelNode(levelId, callback) {
            let resourcePath = levelId + ".lh", subpackageName = LevelManager.getLevelSubpackageName(levelId), path = "subpackages/" + subpackageName + "/", loadSubpackage = () => {
                LoadSubpackage(subpackageName, res => {
                    Sprite3D$3.load(get3DResourcePath(resourcePath, path), Handler$4.create(this, levelNode => {
                        let level = levelNode.addComponent(LevelNode);
                        level._levelId = levelId, LevelNode._isPlayingLevel = !1, callback(level);
                    }));
                }, res => {
                    console.error("加载分包失败, 重新加载:", subpackageName), loadSubpackage();
                });
            };
            loadSubpackage();
        }
        spawnGFX(callback) {
            let gfxNodeRoot = this.owner.getChildByName("GFX");
            if (!gfxNodeRoot) return console.warn("关卡内未找到GFX节点"), this._gfxSpriteNode = null, 
            void callback(null);
            let gfxNameNode = gfxNodeRoot.getChildAt(0);
            if (!gfxNameNode) return console.warn("关卡内未找到GFX Name节点"), this._gfxSpriteNode = null, 
            void callback(null);
            let gfxId = gfxNameNode.name;
            GFX.loadGFX(gfxId, gfxNode => {
                this._gfxSpriteNode = gfxNode, callback(gfxNode);
            });
        }
        spawnBallWithSkinId(skinId, callback) {
            let ballSpawnPoint = findChildByNamePath("SpawnPoints/Ball", this.owner);
            ballSpawnPoint ? Ball.spawnBall(skinId, ball => {
                LevelNode.ball = ball, ball.owner.transform.localPosition = new Vector3$a(), ballSpawnPoint.transform.setWorldLossyScale(new Vector3$a(1, 1, 1)), 
                ballSpawnPoint.addChild(ball.owner), ball.saveLastKickPosition(), this.setupComponents(), 
                callback(ball);
            }) : (console.warn("关卡内未找到SpawnPoints/Ball节点"), callback(null));
        }
        spawnGoal(isBonusLv = !1, callback) {
            let goalSpawnPoint = findChildByNamePath("SpawnPoints/Goal", this.owner);
            goalSpawnPoint ? Goal.spawnGoal(this, isBonusLv, goal => {
                LevelNode.goal = goal;
                let goalNode = goal.owner;
                this.owner.addChild(goalNode), goalNode.transform.position = goalSpawnPoint.transform.position, 
                goalNode.transform.rotation = goalSpawnPoint.transform.rotation, callback(goal);
            }) : (console.warn("关卡内未找到SpawnPoints/Goal"), callback(null));
        }
        spawnDefenders() {
            let enemiesRoot = findChildByNamePath("Level/Enemies", this.owner);
            if (enemiesRoot) {
                let spawnIndexArray = this.randomLimitDefender(enemiesRoot);
                for (let i = 0; i < spawnIndexArray.length; i++) {
                    let index = spawnIndexArray[i], spawnPointNode = enemiesRoot.getChildAt(index);
                    this.spawnDefender(spawnPointNode);
                }
            }
        }
        randomLimitDefender(enemiesRoot) {
            let indexArray = [], goalKeeperIndex = -1, num = enemiesRoot.numChildren;
            for (let i = 0; i < num; i++) {
                "KickerGoalKeeper" === enemiesRoot.getChildAt(i).name ? goalKeeperIndex = i : indexArray.push(i);
            }
            let result = [], maxDefender = SwitchSettings.getMaxDefender();
            for (;indexArray.length > 0 && result.length < maxDefender; ) result.push(Utils.randomElementFromArray(indexArray, !0));
            return -1 != goalKeeperIndex && result.push(goalKeeperIndex), 
            result;
        }
        spawnDefender(spawnPointNode) {
            let isGoalKeeper = "KickerGoalKeeper" === spawnPointNode.name, defender = Defender.spawn(isGoalKeeper), defenderSprite = defender.owner;
            this.owner.addChild(defenderSprite);
            let pos = spawnPointNode.transform.position.clone();
            pos.y += .2, defenderSprite.transform.position = pos, this.owner.timerOnce(500, this, () => {
                this._defenders.push(defender), defender.init();
            });
        }
        spawnCoinAndKey(isBonusLv) {
            let spawnPointRoot = findChildByNamePath("SpawnPoints", this.owner);
            if (spawnPointRoot) {
                let num = spawnPointRoot.numChildren;
                for (let i = 0; i < num; i++) {
                    let spawnPointNode = spawnPointRoot.getChildAt(i);
                    switch (spawnPointNode.name) {
                      case "coin":
                      case "Coin":
                        this.spawnCoin(spawnPointNode, i);
                        break;

                      case "key":
                      case "Key":
                        isBonusLv || this.spawnKey(spawnPointNode);
                    }
                }
            } else console.warn("关卡内未找到SpawnPoints");
        }
        isCoinPicked(index) {
            return !(!LevelNode.lastLevelPickData || LevelNode.lastLevelPickData && LevelNode.lastLevelPickData.level != this._levelId) && LevelNode.lastLevelPickData.coinPickup[index];
        }
        isKeyPicked() {
            return !(!LevelNode.lastLevelPickData || LevelNode.lastLevelPickData && LevelNode.lastLevelPickData.level != this._levelId) && LevelNode.lastLevelPickData.keyPickup;
        }
        spawnBonusCoins() {
            let bonusCoinsRoot = this.owner.getChildByName("BonusCoins");
            if (bonusCoinsRoot) {
                let num = bonusCoinsRoot.numChildren;
                for (let i = 0; i < num; i++) {
                    let spawnPointNode = bonusCoinsRoot.getChildAt(i);
                    this.spawnCoin(spawnPointNode, i + 1e3);
                }
                console.log("奖励关金币碰撞器:", num);
            }
        }
        spawnCoin(spawnPointNode, index, parent) {
            if (this.isCoinPicked(index)) return;
            parent = parent || this.owner;
            let coinSprite = Coin.spawn(index).owner;
            parent.addChild(coinSprite), coinSprite.transform.position = spawnPointNode.transform.position;
        }
        spawnKey(spawnPointNode) {
            if (this.isKeyPicked()) return;
            let keySprite = Key.spawn().owner;
            this.owner.addChild(keySprite), keySprite.transform.position = spawnPointNode.transform.position;
        }
        setupComponents() {
            this.setupGameControl(), this.setupCameraFollowLookAt();
        }
        setupGameControl() {
            this._gameControl || (this._gameControl = this.owner.addComponent(GameControl)), 
            this._gameControl.init(LevelNode._camera.transform, LevelNode._ball);
        }
        setupCameraFollowLookAt() {
            this._cameraFollowLookAt || (this._cameraFollowLookAt = this.owner.addComponent(CameraFollowLookAt));
            let ballNode = LevelNode._ball.owner, goalNode = LevelNode._goal.owner;
            this._cameraFollowLookAt.init(LevelNode._camera.transform, ballNode.transform, goalNode.transform);
        }
        onBallGoal() {
            SoundManager$b.playSound(SoundClips.WIN_SOUND, 1), this.destroyCameraFollowLookAtAndGameControl(), 
            this.addCameraShootLookAt();
            let ballPos = LevelNode._ball.owner.transform.position;
            LevelNode._goal.showConfettiParticle(ballPos), this.disablePhysicsSimulation();
            let lv = GamePlayerData.getCurrentLevel();
            PlatformUtils$1.logStageEnd(lv.toString(), `第${lv}关`, !0, "关卡完成");
        }
        onBallOutOfRange() {
            if (!this.showKillDefendersViewIfNeed()) {
                EventManager.dispatchEvent(GameEvent.SHOW_LOST_VIEW), SoundManager$b.playSound(SoundClips.FAIL_SOUND, 1), 
                this.destroyCameraFollowLookAtAndGameControl(), this.disablePhysicsSimulation();
                let lv = GamePlayerData.getCurrentLevel();
                PlatformUtils$1.logStageEnd(lv.toString(), `第${lv}关`, !1, "关卡失败");
            }
        }
        showKillDefendersViewIfNeed() {
            if (SwitchSettings.getBannerCasualClick("killDefenders") && 0 === this._resurgenceTimes) {
                let KillDefendersTimes = DailyReset.load("KillDefenders", {
                    times: 0
                });
                return KillDefendersTimes.times < SwitchSettings.getKillDefendersMaxTimes() && (Laya.PhysicsSimulation.disableSimulation = !0, 
                SoundManager$b.playSound(SoundClips.FAIL_SOUND, 1), EventManager.dispatchEvent(GameEvent.KILL_DEFENDER_VIEW), 
                KillDefendersTimes.times++, DailyReset.save("KillDefenders", KillDefendersTimes), 
                this._resurgenceTimes++, !0);
            }
            return !1;
        }
        disablePhysicsSimulation() {
            this.owner.timerOnce(2e3, this, () => {
                Laya.PhysicsSimulation.disableSimulation = !0;
            });
        }
        destroyCameraFollowLookAtAndGameControl() {
            this._cameraFollowLookAt && (this._cameraFollowLookAt.destroy(), this._cameraFollowLookAt = null), 
            this._gameControl && (this._gameControl.destroy(), this._gameControl = null);
        }
        addCameraShootLookAt() {
            this._cameraShootLookAt = this.owner.addComponent(CameraToPositionLookAt);
            let goalTransform = LevelNode._goal.owner.transform, toPos = LevelNode.calculateToPositionFormCameraShootLookAt(goalTransform);
            this._cameraShootLookAt.init(LevelNode._camera.transform, toPos, goalTransform, 8);
        }
        static calculateToPositionFormCameraShootLookAt(goalTransform) {
            let goalDirection = new Vector3$a();
            goalTransform.getForward(goalDirection);
            let offset = new Vector3$a();
            Vector3$a.scale(goalDirection, 25, offset), LevelNode.randomOffsetAngle(offset), 
            offset.y = 5;
            let toPos = new Vector3$a();
            return Vector3$a.add(goalTransform.position, offset, toPos), toPos;
        }
        static randomOffsetAngle(offset) {
            let angle = 20 * (Math.random() - .5);
            angle = toRadian(angle), Vector3Ext.rotateY(offset, new Vector3$a(0, 0, 0), angle, offset);
        }
        onSkinIdChanged(skinId) {
            this._playerSkinId = skinId, this.spawnBallWithSkinId(skinId, ball => {});
        }
        setupNavMesh() {
            LevelNode._navMesh = new LevelNavMesh(this.owner), LevelNode._navMesh.initNavMesh();
        }
        setupGroundShadow() {
            let groundRootNode = this.owner.getChildByName("BaseGround");
            groundRootNode && recursionEnableMeshSpriteShadow(groundRootNode, !1, !0);
        }
        setupHoles() {
            let holes = findNameFromChildren(this.owner, "KickOutHole"), depthMasks = findNameFromChildren(this.owner, "DepthMask"), material = new DepthMaskMaterial();
            depthMasks.forEach(depthMask => {
                depthMask.meshRenderer.sharedMaterial = material;
                let collider = depthMask.getComponent(PhysicsCollider$2);
                collider && (collider.collisionGroup = CollisionGroup.HOLE, collider.isTrigger = !0);
            });
            let holeMat = null;
            holes.forEach(hole => {
                holeMat || ((holeMat = hole.meshRenderer.material.clone()).renderQueue = BaseMaterial$1.RENDERQUEUE_OPAQUE - 30), 
                hole.meshRenderer.sharedMaterial = holeMat;
            });
        }
        onPickupCoin(coin) {
            
            let index = coin.spawnIndex;
            LevelNode.lastLevelPickData.coinPickup[index] = !0;
            let pick = SwitchSettings.getCoinPerPickup();
            LevelNode._settlementData.pickUpCoin += pick;
        }
        onPickupKey() {
            LevelNode.lastLevelPickData.keyPickup = !0;
        }
        static getSettlementData() {
            return this._settlementData;
        }
        onAvoidTackles(defender) {
            let score = defender.isGoalKeeper ? 25 : 10;
            LevelNode._settlementData.score += score;
        }
        onStartPlayingLevel() {
            LevelNode._isPlayingLevel = !0;
            let lv = GamePlayerData.getCurrentLevel();
            PlatformUtils$1.logStageStart(lv.toString(), `第${lv}关`);
        }
        setupPhysicsColliders() {
            this.setupAllGroundColliders(), this.setupOutFieldsCollisionGroup(), this._physicsColliders = findChildComponents(this.owner, Laya.PhysicsCollider);
            let ballCollider = findChildComponent(LevelNode.ball.owner, Laya.PhysicsCollider);
            for (let i = 0; i < this._physicsColliders.length; i++) {
                let collider = this._physicsColliders[i];
                collider.restitution = 0;
                let dynamicEnableCollider = !0;
                -1 !== this._groundColliders.indexOf(collider) ? dynamicEnableCollider = !1 : -1 !== this._outFieldsColliders.indexOf(collider) ? dynamicEnableCollider = !1 : ballCollider === collider && (dynamicEnableCollider = !1), 
                dynamicEnableCollider && this._dynamicEnableColliders.push(collider);
            }
        }
        setupAllGroundColliders() {
            let groundRootNode = this.owner.getChildByName("Grounds");
            if (groundRootNode) {
                this.setupGroundCollider(groundRootNode);
                let num = groundRootNode.numChildren;
                for (let i = 0; i < num; i++) {
                    let child = groundRootNode.getChildAt(i);
                    this.setupGroundCollider(child);
                }
            }
        }
        setupGroundCollider(node) {
            let collider = node.getComponent(PhysicsCollider$2);
            collider && (collider.collisionGroup = CollisionGroup.GROUND, collider.friction = 3, 
            this._groundColliders.push(collider));
        }
        setupOutFieldsCollisionGroup() {
            let outFieldsRootNode = this.owner.getChildByName("OutFields");
            this.setupOutFieldCollisionGroup(outFieldsRootNode);
            let num = outFieldsRootNode.numChildren;
            for (let i = 0; i < num; i++) {
                let child = outFieldsRootNode.getChildAt(i);
                this.setupOutFieldCollisionGroup(child);
            }
        }
        setupOutFieldCollisionGroup(node) {
            let collider = node.getComponent(PhysicsCollider$2);
            collider && (collider.collisionGroup = CollisionGroup.OUT_FIELD, collider.isTrigger = !0, 
            this._outFieldsColliders.push(collider));
        }
        doDynamicEnableColliders() {
            let ballPos = LevelNode._ball.owner.transform.position;
            for (let i = 0, len = this._dynamicEnableColliders.length; i < len; i++) {
                let collider = this._dynamicEnableColliders[i], distanceSqr = Vector3$a.distanceSquared(ballPos, collider.owner.transform.position);
                collider.enabled = distanceSqr < DYNAMIC_ENABLE_COLLIDER_DISTANCE_SQR, collider.enabled;
            }
            for (let i = 0, len = this._defenders.length; i < len; i++) {
                let defender = this._defenders[i], distanceSqr = Vector3$a.distanceSquared(ballPos, defender.owner.transform.position);
                defender.setActive(distanceSqr < DYNAMIC_ENABLE_COLLIDER_DISTANCE_SQR);
            }
        }
        onUpdate() {
            LevelNode._isPlayingLevel && this.doDynamicEnableColliders();
        }
        killDefendersAndResurgence() {
            SoundManager$b.playSound(SoundClips.BALL_UNLOCK, 1), Laya.PhysicsSimulation.disableSimulation = !1;
            let delay = 0;
            for (let i = 0; i < this._defenders.length; ) {
                let defender = this._defenders[i];
                defender.isGoalKeeper ? i++ : (this._defenders.splice(i, 1), Laya.timer.once(300 * delay, this, () => {
                    defender.kill();
                }, null, !1), delay++);
            }
            LevelNode._ball.resetAtLastKickPosition();
        }
    }
    LevelNode._ball = null, LevelNode._camera = null, LevelNode._goal = null, LevelNode._navMesh = null, 
    LevelNode.lastLevelPickData = null, LevelNode._settlementData = {
        isBonusLv: !1,
        score: 0,
        pickUpCoin: 0
    }, LevelNode._isPlayingLevel = !1;
    var Handler$5 = Laya.Handler;
    class TopLevelList extends Laya.Script {
        constructor() {
            super(...arguments), this.currentLvImageResource = "", this.prevLvImageResource = "", 
            this.nextLvImageResource = "", this._list = null, this._listData = [], this._data = null;
        }
        onAwake() {
            this.setupList();
        }
        setupList() {
            this._list = this.owner, this._list.renderHandler = new Handler$5(this, this.updateItem);
        }
        updateItem(item, index) {
            let itemData = this._listData[index], lineImg = item.getChildByName("Line"), bgImg = item.getChildByName("Bg"), lvLabel = item.getChildByName("LvLabel"), coinImage = item.getChildByName("CoinImage");
            if (lvLabel.visible = !itemData.isBonusLv, lineImg.visible = itemData.showLine, 
            itemData.isBonusLv) coinImage.visible = !0, bgImg.visible = !1; else {
                coinImage.visible = !1, bgImg.visible = !0, lvLabel.text = itemData.level.toString();
                let skin, currentLv = this._data.currentLv;
                itemData.level === currentLv ? skin = this.currentLvImageResource : itemData.level < currentLv ? skin = this.prevLvImageResource : itemData.level > currentLv && (skin = this.nextLvImageResource), 
                bgImg.skin = skin;
            }
        }
        setData(data) {
            this._data = data, this.updateListData();
        }
        updateListData() {
            this._listData = [];
            for (let i = this._data.fromLv; i <= this._data.toLv; i++) {
                let showLine = !0;
                i === this._data.toLv && (showLine = !1);
                let isBonusLv = i % 5 == 0;
                this._listData.push({
                    showLine: showLine,
                    isBonusLv: isBonusLv,
                    level: i
                });
            }
            this._list.repeatX = this._listData.length, this._list.array = this._listData;
        }
    }
    class CoinLabel extends Laya.Script {
        onAwake() {
            this._label = this.owner;
        }
        onEnable() {
            EventManager.registerEvent(CommonEvents.SET_NET_DATA, this.refresh, this), EventManager.registerEvent(GameEvent.MONEY_CHANGE, this.refresh, this), 
            EventManager.registerEvent(GameEvent.COIN_FLY_EFFECT, this.showCoinFlyEffect, this), 
            this.refresh();
        }
        onDisable() {
            EventManager.releaseAllEvents(this);
        }
        refresh() {
            this._label.text = GamePlayerData.getMoney().toString();
        }
        showCoinFlyEffect(data) {
            FlyEffect.showEffect(data.prototype, data.startPos, this._label);
        }
    }
    var Handler$6 = Laya.Handler;
    class KeyList extends Laya.Script {
        constructor() {
            super(...arguments), this.keyItemEnabledImageResource = "", this.keyItemDisableImageResource = "", 
            this._keyData = [ !1, !1, !1 ];
        }
        onAwake() {
            this._list = this.owner, this._list.renderHandler = new Handler$6(this, this.updateKeyItem);
        }
        onEnable() {
            EventManager.registerEvent(CommonEvents.SET_NET_DATA, this.refresh, this), EventManager.registerEvent(GameEvent.KEY_CHANGE, this.refresh, this), 
            this.refresh();
        }
        onDisable() {
            EventManager.releaseAllEvents(this);
        }
        updateKeyItem(keyItem, index) {
            let enable = this._keyData[index];
            keyItem.getChildAt(0).skin = enable ? this.keyItemEnabledImageResource : this.keyItemDisableImageResource;
        }
        refresh() {
            let keyNumber = GamePlayerData.getKey();
            this._keyData[0] = keyNumber >= 1, this._keyData[1] = keyNumber >= 2, this._keyData[2] = keyNumber >= 3, 
            this._list.array = this._keyData;
        }
    }
    var Vector2$9 = Laya.Vector2;
    let _tmpVec3$9 = new (0, Laya.Vector3)();
    class ScoreText {
        static createScoreText(score, parent) {
            let camera = LevelNode.camera;
            const Text = Laya.Text;
            let text = new Text();
            Laya.stage.addChild(text), text.overflow = Text.HIDDEN, text.color = "#FFFFFF", 
            text.fontSize = 60, text.bold = !0, text.italic = !0, text.strokeColor = "#000", 
            text.stroke = 5, text.align = "center", text.text = `+${score}!`, parent.addChild(text), 
            camera.viewport.project(LevelNode.ball.owner.transform.position, camera.projectionViewMatrix, _tmpVec3$9);
            let textPos = new Vector2$9(_tmpVec3$9.x / Laya.stage.clientScaleX - 30, _tmpVec3$9.y / Laya.stage.clientScaleY - 50);
            text.pos(textPos.x, textPos.y), text.alpha = 0, Laya.Tween.to(text, {
                alpha: 1,
                y: textPos.y - 80
            }, 300, null, Laya.Handler.create(this, () => {
                Laya.Tween.to(text, {
                    y: textPos.y - 90
                }, 1200, null, Laya.Handler.create(this, () => {
                    Laya.Tween.to(text, {
                        alpha: 0
                    }, 500, null, Laya.Handler.create(this, () => {
                        this.destroyText(text);
                    }));
                }));
            })), this.addText(text);
        }
        static clear() {
            this._allTextSet.forEach(text => {
                text.destroy(!0), Laya.Tween.clearAll(text);
            }), this._allTextSet.clear();
        }
        static addText(text) {
            this._allTextSet.add(text);
        }
        static destroyText(text) {
            Laya.Tween.clearAll(text), text.destroy(!0), this._allTextSet.delete(text);
        }
    }
    ScoreText._allTextSet = new Set();
    class PlayingLayer extends Laya.Script {
        constructor() {
            super(...arguments), this.coinLabel = null, this.keyList = null, this.topLevelListNode = null, 
            this.retryButton = null, this.moveTipsNode = null, this.moveTipsLabel = null, this.kickTipLabel = null, 
            this._topLevelList = null;
        }
        onAwake() {
            this.coinLabel.visible = !1, this.keyList.visible = !1, this.initTopLevelList(), 
            this.retryButton.on(Laya.Event.CLICK, this, this.onRetryClick);
            this.yad.on(Laya.Event.MOUSE_DOWN, this, ()=>{
                platform.getInstance().navigate("GAME","LOGO");
            });
        }
        onEnable() {
            ScoreText.clear(), EventManager.registerEvent(GameEvent.PICKUP_COIN, this.onPickupCoin, this), 
            EventManager.registerEvent(GameEvent.PICKUP_KEY, this.onPickupKey, this), 
            EventManager.registerEvent(GameEvent.AVOID_TACKLES, this.onAvoidTackles, this), 
            this.showTips();
        }
        onDisable() {
            EventManager.releaseAllEvents(this);
        }
        onPickupCoin() {
            this.showNodeAndFadeout(this.coinLabel),
            GamePlayerData.addMoney(SwitchSettings.getCoinPerPickup());
            //  GamePlayerData.addMoney(SwitchSettings.getCoinPerPickup(), !1);
            let coinLabelComponent = this.coinLabel.getComponent(CoinLabel);
            coinLabelComponent && coinLabelComponent.refresh();
        }
        onPickupKey() {
            this.showNodeAndFadeout(this.keyList), GamePlayerData.addKey(1);
            let keyListComponent = this.keyList.getComponent(KeyList);
            keyListComponent && keyListComponent.refresh();
        }
        showNodeAndFadeout(node, delay = 4e3) {
            node.visible = !0, node.alpha = 1, node.scale(1, 1), Laya.Tween.to(node, {
                scaleX: 1.1,
                scaleY: 1.1
            }, 100, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                Laya.Tween.to(node, {
                    scaleX: 1,
                    scaleY: 1
                }, 100, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                    Laya.Tween.to(node, {
                        alpha: 0
                    }, 200, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                        node.visible = !1;
                    }), delay);
                }), 0);
            }), 0);
        }
        refreshTopLevelList() {
            let currentLv = GamePlayerData.getCurrentLevel(), fromLv = currentLv - 2;
            fromLv < 1 && (fromLv = 1);
            let toLv = currentLv + 2;
            toLv < 5 && (toLv = 5), this._topLevelList.setData({
                fromLv: fromLv,
                toLv: toLv,
                currentLv: currentLv
            });
        }
        initTopLevelList() {
            this._topLevelList = this.topLevelListNode.getComponent(TopLevelList);
        }
        onRetryClick() {
            EventManager.dispatchEvent(GameEvent.RETRY_LEVEL);
        }
        onAvoidTackles(defender) {
            let score = defender.isGoalKeeper ? 25 : 15;
            ScoreText.createScoreText(score, this.owner);
        }
        showTips() {
            let lv = GamePlayerData.getCurrentLevel();
            1 === lv ? (this.moveTipsNode.visible = !0, this.moveTipsNode.active = !0, this.kickTipLabel.visible = !1, 
            this.kickTipLabel.active = !1, this.moveTipsLabel.text = "Slide on the screen to move") : 2 === lv ? (this.moveTipsNode.visible = !0, 
            this.moveTipsNode.active = !0, this.kickTipLabel.visible = !1, this.kickTipLabel.active = !1, 
            this.moveTipsLabel.text = "Avoid the defender") : 3 === lv ? (this.moveTipsNode.visible = !1, 
            this.moveTipsNode.active = !1, this.kickTipLabel.visible = !0, this.kickTipLabel.active = !0) : (this.moveTipsNode.visible = !1, 
            this.moveTipsNode.active = !1, this.kickTipLabel.visible = !1, this.kickTipLabel.active = !1);
        }
    }
    class UILayer extends Laya.Script {
        constructor() {
            super(...arguments), this.maskTransLayerNode = null, this.homeLayerNode = null, 
            this.winLayerNode = null, this.lostLayerNode = null, this.playingLayerNode = null, 
            this.killDefenderLayerNode = null, this.devLayerNode = null, this._maskTransLayer = null;
        }
        get maskTransLayer() {
            return this._maskTransLayer || (this._maskTransLayer = this.maskTransLayerNode.getComponent(MaskTransLayer)), 
            this._maskTransLayer;
        }
        onAwake() {
            this.destroyDevLayer(), this.maskTransLayerNode.visible = !1, this.hideAllUILayers();
        }
        onEnable() {
            EventManager.registerEvent(GameEvent.LOADING_LEVEL, this.hideAllUILayers, this), 
            EventManager.registerEvent(GameEvent.LEVEL_READY, this.showHomeLayer, this), EventManager.registerEvent(GameEvent.SHOW_LOST_VIEW, this.onShowLostView, this), 
            EventManager.registerEvent(GameEvent.KILL_DEFENDER_VIEW, this.showKillDefenderLayerNode, this), 
            EventManager.registerEvent(GameEvent.BALL_GOAL, this.onBallGoal, this), EventManager.registerEvent(GameEvent.START_PLAYING_LEVEL, this.showPlayingLayer, this), 
            EventManager.registerEvent(GameEvent.KILL_DEFENDERS, this.showPlayingLayer, this);
        }
        onDisable() {
            EventManager.releaseAllEvents(this);
        }
        transIn(callback) {
            this.maskTransLayer.transIn(callback);
        }
        transOut(callback) {
            this.maskTransLayer.transOut(callback);
        }
        onShowLostView() {
            this.showLayer(this.lostLayerNode);
        }
        onBallGoal() {
            this.showLayer(this.winLayerNode), this.winLayerNode.getComponent(WinLayer).setSettlementData(LevelNode.getSettlementData());
        }
        showHomeLayer() {
            this.showLayer(this.homeLayerNode);
        }
        showPlayingLayer() {
            this.showLayer(this.playingLayerNode), this.playingLayerNode.getComponent(PlayingLayer).refreshTopLevelList();
        }
        showKillDefenderLayerNode() {
            this.showLayer(this.killDefenderLayerNode);
        }
        showLayer(layer) {
            this.hideAllUILayers(), layer.visible = !0, layer.active = !0;
        }
        hideAllUILayers() {
            this.homeLayerNode.visible = !1, this.winLayerNode.visible = !1, this.lostLayerNode.visible = !1, 
            this.playingLayerNode.visible = !1, this.killDefenderLayerNode.visible = !1, this.homeLayerNode.active = !1, 
            this.winLayerNode.active = !1, this.lostLayerNode.active = !1, this.playingLayerNode.active = !1, 
            this.killDefenderLayerNode.active = !1;
        }
        destroyDevLayer() {
            this.devLayerNode && (this.devLayerNode.destroy(!0), this.devLayerNode = null);
        }
    }
    class ScaleButtonEffect extends Laya.Script {
        constructor() {
            super(...arguments), this.scale = 1.05, this.duration = 200, this._ownerSprite = null, 
            this._saveScaleX = 1, this._saveScaleY = 1;
        }
        onAwake() {
            this._ownerSprite = this.owner, this._saveScaleX = this._ownerSprite.scaleX, this._saveScaleY = this._ownerSprite.scaleY;
        }
        onMouseDown(e) {
            this.scaleDown();
        }
        onMouseUp(e) {
            this.scaleUp();
        }
        onMouseMove(e) {
            this.scaleDown();
        }
        onMouseOut(e) {
            this.scaleUp();
        }
        scaleDown() {
            Laya.Tween.clearAll(this._ownerSprite), Laya.Tween.to(this._ownerSprite, {
                scaleX: this._saveScaleX * this.scale,
                scaleY: this._saveScaleY * this.scale
            }, this.duration, Laya.Ease.linearNone);
        }
        scaleUp() {
            Laya.Tween.clearAll(this._ownerSprite), Laya.Tween.to(this._ownerSprite, {
                scaleX: this._saveScaleX,
                scaleY: this._saveScaleY
            }, this.duration, Laya.Ease.linearNone);
        }
    }
    class UILayer$1 extends Laya.Script {
        onAwake() {
            this.owner.visible = IS_DEBUG, this.resetButton.on(Laya.Event.CLICK, this, this.onResetButtonClick), 
            this.nextLvButton.on(Laya.Event.CLICK, this, this.onNextLvButtonClick), this.prevLvButton.on(Laya.Event.CLICK, this, this.onPrevLvButtonClick), 
            this.nextSkinButton.on(Laya.Event.CLICK, this, this.onNextSkinButtonClick), this.prevSkinButton.on(Laya.Event.CLICK, this, this.onPreviewSkinButtonClick), 
            this.lvEdit.on(Laya.Event.KEY_UP, this, this.onLvEditKeyUp), this.coinEdit.on(Laya.Event.KEY_UP, this, this.onCoinEditKeyUp);
        }
        onResetButtonClick() {
            Laya.Scene.open("MainScene.scene");
        }
        onNextLvButtonClick() {
            EventManager.dispatchEvent(GameEvent.NEXT_LEVEL);
        }
        onPrevLvButtonClick() {
            EventManager.dispatchEvent(GameEvent.PREV_LEVEL);
        }
        onNextSkinButtonClick() {
            GamePlayerData.setKey(3), OpenChestView.openView();
        }
        onPreviewSkinButtonClick() {
            for (let i = 0; i < 1e3; i++) {
                let levelData = LevelManager.getLevelData(i);
                console.log(levelData);
            }
        }
        onLvEditKeyUp(e) {
            16 === e.keyCode && EventManager.dispatchEvent(GameEvent.REQUEST_LOAD_LEVEL, parseInt(this.lvEdit.text));
        }
        onCoinEditKeyUp(e) {
            16 === e.keyCode && GamePlayerData.setMoney(parseInt(this.coinEdit.text));
        }
    }
    var Script$3 = Laya.Script;
    class PowerBar extends Script$3 {
        constructor() {
            super(...arguments), this.addPowerButton = null, this.powerLabel = null;
        }
        onAwake() {
            this.addPowerButton.on(Laya.Event.CLICK, this, this.onAddPowerClick);
        }
        onEnable() {
            EventManager.registerEvent(CommonEvents.SET_NET_DATA, this.refreshUI, this), EventManager.registerEvent(GameEvent.POWER_CHANGE, this.refreshUI, this), 
            this.refreshUI();
        }
        onDisable() {
            EventManager.releaseAllEvents(this);
        }
        refreshUI() {
            this.powerLabel.text = `${GamePlayerData.getPower()} / 20`;
        }
        onAddPowerClick() {
            NotEnoughPowerDialog.open();
        }
    }
    var SoundManager$c = Laya.SoundManager;
    const SAVE_DATA_KEY$1 = "SoundManagerState";
    class SoundManagerState {
        static loadSoundManagerState() {
            let storageData = LocalData.getItem(SAVE_DATA_KEY$1, {
                soundMuted: !1,
                musicMuted: !1
            });
            this._soundMuted = storageData.soundMuted, this._musicMuted = storageData.musicMuted, 
            SoundManager$c.soundMuted = this._soundMuted, SoundManager$c.musicMuted = this._musicMuted;
        }
        static setSoundMuted(soundMuted) {
            this._soundMuted = soundMuted, SoundManager$c.soundMuted = this._soundMuted, this.save();
        }
        static setMusicMuted(musicMuted) {
            this._musicMuted = musicMuted, SoundManager$c.musicMuted = this._musicMuted, this.save();
        }
        static setAllMuted(muted) {
            this._soundMuted = muted, this._musicMuted = muted, SoundManager$c.muted = muted, 
            this.save();
        }
        static save() {
            LocalData.setItem(SAVE_DATA_KEY$1, {
                soundMuted: this._soundMuted,
                musicMuted: this._musicMuted
            });
        }
    }
    SoundManagerState._soundMuted = !0, SoundManagerState._musicMuted = !0;
    var SoundManager$d = Laya.SoundManager;
    class SettingsBar extends Laya.Script {
        constructor() {
            super(...arguments), this.settingsButton = null, this.soundButton = null, 
            this._isOpen = !1;
        }
        onAwake() {
            this._saveX = this.owner.x, this.settingsButton.on(Laya.Event.CLICK, this, this.onSettingClick), 
            this.soundButton.on(Laya.Event.CLICK, this, this.onSoundClick), 
            this.refresh();
        }
        onSettingClick() {
            let to, ease, sprite = this.owner;
            this._isOpen ? (to = this._saveX, ease = Laya.Ease.backIn) : (to = this._saveX + 190, 
            ease = Laya.Ease.backOut), this._isOpen = !this._isOpen, Laya.Tween.to(sprite, {
                x: to
            }, 200, ease);
        }
        onSoundClick() {
            SoundManagerState.setAllMuted(!SoundManager$d.muted), this.refresh();
        }
        onVibrateClick() {
            PlatformUtils$1.setVibrateEnable(!PlatformUtils$1.isVibrateEnable()), PlatformUtils$1.isVibrateEnable() && PlatformUtils$1.vibrateLong(), 
            this.refresh();
        }
        refresh() {
            this.soundButton.alpha = SoundManager$d.muted ? .7 : 1;
        }
    }
    const barSkins = [ "res_zhishewan/bar_1.png", "res_zhishewan/bar_2.png", "res_zhishewan/bar_3.png", "res_zhishewan/bar_4.png", "res_zhishewan/bar_5.png", "res_zhishewan/bar_6.png", "res_zhishewan/bar_7.png" ], IS_NEW_SKIN = "res_zhishewan/new.png", IS_HOT_SKIN = "res_zhishewan/hot.png";
    var ItemState;
    function cloneAppDataItem(appDataItem) {
        return {
            name: appDataItem.name,
            app_desc: appDataItem.app_desc,
            thumb: appDataItem.thumb,
            appid: appDataItem.appid,
            link_path: appDataItem.link_path,
            id: appDataItem.id,
            index: appDataItem.index,
            state: appDataItem.state,
            extraData: appDataItem.extraData
        };
    }
    function randomItemState(data) {
        let state = ItemState.NONE, rand = Math.random();
        rand < .25 && (state = (rand = Math.random()) < .5 ? ItemState.IS_NEW : ItemState.IS_HOT), 
        data.state = state;
    }
    function getBarSkin(index = null) {
        return void 0 !== index ? index %= barSkins.length : index = Math.floor(Math.random() * barSkins.length), 
        barSkins[index];
    }
    function getBadgeSkin(data) {
        return data.state === ItemState.IS_NEW ? IS_NEW_SKIN : data.state === ItemState.IS_HOT ? IS_HOT_SKIN : "";
    }
    !function(ItemState) {
        ItemState[ItemState.NONE = 0] = "NONE", ItemState[ItemState.IS_NEW = 1] = "IS_NEW", 
        ItemState[ItemState.IS_HOT = 2] = "IS_HOT";
    }(ItemState || (ItemState = {}));
    class AppIconBoxGroupRoll extends Laya.Script {
        constructor() {
            super(...arguments), this.appIconImage = null, this.appNameLabel = null, this.badgeImage = null, 
            this.shake = !0, this._appInfoList = null, this._listIndex = -1, this._currentItemData = null, 
            this._shakeTimeLine = null;
        }
        onAwake() {
            this.owner.on(Laya.Event.CLICK, this, this.onClick), ZhiSheWanAd.isEnabledAppMatrix() || (this.owner.active = !1, 
            this.owner.visible = !1);
        }
        onEnable() {
            this.refreshUI();
        }
        onDisable() {}
        onDestroy() {
            this._shakeTimeLine && (this._shakeTimeLine.destroy(), this._shakeTimeLine = null);
        }
        refreshUI() {
            this._appInfoList = listData
            if (this._appInfoList) 
            {
                for (let i = 0; i < this._appInfoList.length; i++) {
                    randomItemState(this._appInfoList[i]);
                }
                this._listIndex = this.startIndex, this._listIndex > this._appInfoList.length - 1 && (this._listIndex = this._appInfoList.length - 1);
                let data = this._appInfoList[this._listIndex];
                this.setData(data);
            } 
            else {
                console.warn("没有数据", this.slotId), this.owner.visible = !1;
            }
            this.owner.timerOnce(3e3 * Math.random(), this, () => {
                this.owner.timerLoop(3e3, this, this.changeApp);
            });

            // ZhiSheWanAd.getSlotDataList(this.slotId, listData => 
            // {
             
            // });
        }
        setData(appIconData) {
            this._currentItemData = appIconData, this.appNameLabel.text = this._currentItemData.app_title, 
            this.appIconImage.skin = this._currentItemData.app_icon, this.badgeImage.skin = getBadgeSkin(this._currentItemData), 
            this.shake && this._currentItemData.state != ItemState.NONE ? this._shakeTimeLine ? (this.owner.rotation = 0, 
            this._shakeTimeLine.reset()) : this._shakeTimeLine = spriteShake(this.owner, !0, 3e3 * Math.random()) : (this.owner.rotation = 0, 
            this._shakeTimeLine && (this._shakeTimeLine.destroy(), this._shakeTimeLine = null));
        }
        changeApp() {
            if (!this._appInfoList) return;
            let nextIndex = this._listIndex + 1;
            nextIndex >= this._appInfoList.length && (nextIndex = 0);
            let data = this._appInfoList[nextIndex];
            this.setData(data), this._listIndex = nextIndex;
        }
        onClick(e) {
            this._currentItemData && (ZhiSheWanAd.navigateToApp(this._currentItemData), this.changeApp());
        }
    }
    var AppListItemNoNameUI = ui.ZhiSheWanAd.view.AppListItemNoNameUI;
    class AppListItemNoName extends AppListItemNoNameUI {
        constructor() {
            super(), this._data = null, this.on(Laya.Event.CLICK, this, this.onClick), ZhiSheWanAd.isEnabledAppMatrix() || (this.active = !1, 
            this.visible = !1);
        }
        setData(appIconData) {
            this._data = appIconData, this.iconImage.skin = this._data.app_icon;
        }
        onClick(e) {
            this._data && ZhiSheWanAd.navigateToApp(this._data);
        }
    }
    var AppListItemWithNameUI = ui.ZhiSheWanAd.view.AppListItemWithNameUI;
    class AppListItemWithName extends AppListItemWithNameUI {
        constructor() {
            super(), 
            this._data = null, 
            this.on(Laya.Event.MOUSE_DOWN, this, this.onClick), 
            ZhiSheWanAd.isEnabledAppMatrix() || (this.active = !1, 
            this.visible = !1);
        }
        setData(appIconData) {
            this._data = appIconData, 
            this.iconImage.skin = this._data.thumb, 
            this.nameLabel.text = this._data.name, 
            this.barImage.skin = getBarSkin(appIconData.index), this.badgeImage.skin = getBadgeSkin(appIconData);
        }
        onClick(e) {
            platform.getInstance().navigate("GAME","MORE",this._data.id);
            // this._data && ZhiSheWanAd.navigateToApp(this._data);
        }
    }
    var Handler$7 = Laya.Handler;
    class AppList extends Laya.Script {
        constructor() {
            super(...arguments), this.showName = !0, this._list = null, this._appInfoList = null;
        }
        onAwake() {
            this._list = this.owner;
            this.showName ? this._list.itemRender = AppListItemWithName : this._list.itemRender = AppListItemNoName;
            this._list.renderHandler = new Handler$7(this, this.updateItem);
            this._list.hScrollBarSkin = "";
            // if (!ZhiSheWanAd.isEnabledAppMatrix()) return this.owner.active = !1, void (this.owner.visible = !1);
            this._list.on(Laya.Event.START, this, this.onScrollBegan), 
            this._list.on(Laya.Event.END, this, this.onScrollEnded), 
            this._list.on(Laya.Event.MOUSE_UP, this, this.onScrollEnded);
        }
        onEnable() {
            ZhiSheWanAd.isEnabledAppMatrix() && (this.refreshUI(), this._appInfoList && (this.owner.timerOnce(1e3 * this.interval, this, this.autoScroll), 
            this.autoScroll()));
        }
        onDisable() {
            this.owner.clearTimer(this, this.autoScroll);
        }
        refreshUI() {
            let  listData  = platform.getInstance().getForgames();
            this.fillData(listData);
            if(this._appInfoList){
                this.owner.visible = !0, 
                this.owner.active = !0, 
                this._list = this.owner, 
                this._list.array = this._appInfoList, 
                this._list.refresh()
            }else{
                console.warn("没有数据", this.slotId), 
                this.owner.visible = !1, this.owner.active = !1
            }
        }
        fillData(listData) {
            if (!listData) return;
            let list = [];
            for (let i = 0; i < listData.length; i++) {
                let itemData = listData[i];
                randomItemState(itemData), list.push(itemData);
            }
            if (list.length < 10) {
                let n = 10 - list.length;
                for (let i = 0; i < n; i++) {
                    let itemData = listData[i];
                    randomItemState(itemData), list.push(itemData);
                }
            }
            this._appInfoList = list;
        }
        updateItem(listItem, index) {
            let data = this._appInfoList[index];
            data.index = index, listItem.setData(data);
        }
        autoScroll() {
            if (this._list) {
                let max = this._list.scrollBar.max, toIndex = this._list.scrollBar.value > max / 2 ? 0 : this._appInfoList.length - 1;
                this._list.tweenTo(toIndex, 1e3 * this.scrollInterval, new Handler$7(this, () => {
                    this.onScrollEnded();
                }));
            }
        }
        onScrollBegan() {
            this.owner.clearTimer(this, this.autoScroll);
        }
        onScrollEnded() {
            this.owner.timerOnce(1e3 * this.interval, this, this.autoScroll);
        }
    }
    var SkinStoreGridItemUI = ui.Views.SkinStoreGridItemUI;
    const NORMAL_BG = "ui_res/back_frame3.png", SELECTED_BG = "ui_res/back_frame2.png", NORMAL_BALL_ICON = "ui_res/icon_ball1.png", HIGH_LIGHT_BALL_ICON = "ui_res/icon_ball.png";
    class SkinStoreGridItem extends SkinStoreGridItemUI {
        constructor() {
            super(), this._data = null, this._ballPreview = null, this._mix3dParent = null, 
            this.on(Laya.Event.CLICK, this, this.onClick);
        }
        onEnable() {
            EventManager.registerEvent(GameEvent.SKIN_UNLOCK_DIALOG_OPEN, this.onSkinUnlockDialogOpen, this), 
            EventManager.registerEvent(GameEvent.SKIN_UNLOCK_DIALOG_CLOSE, this.onSkinUnlockDialogClose, this), 
            this.timerLoop(1e3 / 60, this, this.onUpdate);
        }
        onDisable() {
            EventManager.releaseAllEvents(this), this.clearTimer(this, this.onUpdate), this._ballPreview && !this._ballPreview.destroyed && (this._ballPreview.destroy(!0), 
            this._ballPreview = null);
        }
        setGridItemData(data, mix3dParent) {
            this._data = data, this._mix3dParent = mix3dParent, this.backgroundImage.skin = data.isSelected ? SELECTED_BG : NORMAL_BG, 
            data.isUnlock ? (this.ballIcon.visible = !1, this.progress.visible = !1, this.showSkinPreview(data.skinId, mix3dParent)) : (this.ballIcon.visible = !0, 
            this.progress.visible = data.showProgress, this.ballIcon.skin = data.isHighLight ? HIGH_LIGHT_BALL_ICON : NORMAL_BALL_ICON, 
            data.showProgress && (this.progress.value = data.progressCurrent / data.progressTotal, 
            this.progressLabel.text = `${data.progressCurrent} / ${data.progressTotal}`));
        }
        showSkinPreview(skinId, mix3dParent) {
            this._ballPreview ? this._ballPreview.active = !0 : Mix3DTo2D.createMix(mix3dParent, Mix3DTo2DPreviewSceneTemplate, () => {
                BallSkinManager.spawnBallSkin(skinId, ballSkin => {
                    this._ballPreview = ballSkin.owner, this._ballPreview.transform.localScale = new Laya.Vector3(1.2, 1.2, 1.2), 
                    Mix3DTo2D.add3DMixWith2DRefSprite(mix3dParent, this._ballPreview, this.previewBox);
                });
            });
        }
        onClick() {
            console.log("onClick", this._data), this._data && this._data.isUnlock && GamePlayerData.setUsingSkinId(this._data.skinId);
        }
        onUpdate() {
            this._ballPreview && Mix3DTo2D.syncPos(this._mix3dParent, this._ballPreview, this.previewBox);
        }
        onSkinUnlockDialogOpen() {
            this._ballPreview && (this._ballPreview.active = !1);
        }
        onSkinUnlockDialogClose() {
            this._ballPreview && (this._ballPreview.active = !0);
        }
    }
    var SkinStoreGridPageUI = ui.Views.SkinStoreGridPageUI, Handler$8 = Laya.Handler;
    class SkinStoreGridPage extends SkinStoreGridPageUI {
        constructor() {
            super(), this._data = null, this.initGrid();
        }
        initGrid() {
            this.grid.itemRender = SkinStoreGridItem, this.grid.renderHandler = new Handler$8(this, this.updateItem);
        }
        setPageData(data) {
            this._data = data, this.grid.array = this._data.itemsData, this.grid.refresh();
        }
        updateItem(item, index) {
            let itemData = this._data.itemsData[index];
            item.setGridItemData(itemData, this._data.mix3dParent);
        }
    }
    var Handler$9 = Laya.Handler, Image$1 = Laya.Image, Script$4 = Laya.Script, SoundManager$e = Laya.SoundManager;
    const DOT_CURRENT = "ui_res/back_shop_point1.png", DOT_NOT_CURRENT = "ui_res/back_shop_point2.png";
    var SkinStorePageType;
    !function(SkinStorePageType) {
        SkinStorePageType[SkinStorePageType.COIN = 0] = "COIN", SkinStorePageType[SkinStorePageType.KEY = 1] = "KEY", 
        SkinStorePageType[SkinStorePageType.AD = 2] = "AD";
    }(SkinStorePageType || (SkinStorePageType = {}));
    class SkinStoreView extends Script$4 {
        constructor() {
            super(...arguments), this._saveMouseDownX = 0, this._savePage = 0, this._dotState = [ !0, !1, !1 ], 
            this._rolling = !1, this._currentRollStep = 0;
        }
        static loadResources(callback) {
            this._instance && callback(this._instance), Laya.Scene.load("Views/SkinStoreView.scene", Handler$9.create(this, view => {
                this._instance = view.getComponent(SkinStoreView), callback(this._instance);
            }));
        }
        static openView() {
            this._instance ? Laya.stage.timerOnce(300, this, () => {
                this._instance.owner.open(!0);
            }) : this.loadResources(() => {
                Laya.stage.timerOnce(300, this, () => {
                    this._instance.owner.open(!0);
                });
            });
        }
        static canBuyBall() {
            let money = GamePlayerData.getMoney();
            return money > SkinStoreView.getCoinBuyPrice() && BallSkinManager.getCoinBallLockedCount() > 0 || money > SkinStoreView.getAdBuyPrice() && BallSkinManager.getAdBallLockedCount() > 0;
        }
        onAwake() {
            this.initEvents(), this.initDotList(), this.initPageList();
        }
        onEnable() {
            EventManager.registerEvent(GameEvent.SKIN_ID_CHANGED, this.refreshUI, this), EventManager.registerEvent(GameEvent.SKIN_UNLOCKED, this.refreshUI, this), 
            this.owner.timerOnce(100, this, () => {
                this.init3DPreview(() => {
                    this.refreshUI(), this.changeToPageIndex(SkinStoreView.getSelectedPageIndex(), !1), 
                    this.loadNextWatchAdTime();
                });
            });
        }
        onDisable() {
            this.destroyBallPreview(), EventManager.releaseAllEvents(this), Mix3DTo2D.destroyMix(this.owner);
        }
        init3DPreview(callback) {
            Mix3DTo2D.createMix(this.owner, Mix3DTo2DPreviewSceneTemplate, callback);
        }
        makeBallPreview(skinId) {
            this.destroyBallPreview(), BallSkinManager.spawnBallSkin(skinId, ballSkin => {
                this._ballPreview = ballSkin.owner, this._ballPreview.transform.localScale = new Laya.Vector3(1.5, 1.5, 1.5), 
                Mix3DTo2D.add3DMixWith2DRefSprite(this.owner, this._ballPreview, this.awardPreview);
            });
        }
        destroyBallPreview() {
            this._ballPreview && !this._ballPreview.destroyed && (this._ballPreview.destroy(!0), 
            this._ballPreview = null);
        }
        initEvents() {
            this.backButton.on(Laya.Event.CLICK, this, this.onBackButtonClick), this.randomBuyButton.on(Laya.Event.CLICK, this, this.onRandomBuyButtonClick), 
            this.watchAdButton.on(Laya.Event.CLICK, this, this.onWatchAdButtonClick), this.adBuyButton.on(Laya.Event.CLICK, this, this.onAdBuyButtonClick);
        }
        initPageList() {
            this.pageList.itemRender = SkinStoreGridPage, 
            this.pageList.renderHandler = new Handler$9(this, this.updatePage), 
            this.pageList.hScrollBarSkin = "", 
            this.pageList.on(Laya.Event.MOUSE_DOWN, this, this.onPageMouseDown), 
            this.pageList.on(Laya.Event.MOUSE_UP, this, this.onPageMouseUp), 
            this.pageList.on(Laya.Event.MOUSE_OUT, this, this.onPageMouseUp);
        }
        initDotList() {
            this.dotList.itemRender = Image$1, this.dotList.renderHandler = new Handler$9(this, this.updateDotList);
        }
        buildPageData() {
            this._pageData = [ this.getGridPageData(CoinBalls, !1), this.getGridPageData(ChestBalls, !1), this.getGridPageData(AdBalls, !0) ], 
            this.pageList.array = this._pageData, this.pageList.refresh();
        }
        getGridPageData(ballSkins, showProgress) {
            let pageData = {
                mix3dParent: this.owner,
                itemsData: []
            }, usingSkinId = GamePlayerData.getUsingSkinId();
            for (let i = 0; i < ballSkins.length; i++) {
                let skinId = ballSkins[i], data = {
                    isUnlock: GamePlayerData.isSkinUnlocked(skinId),
                    skinId: skinId,
                    isSelected: usingSkinId === skinId,
                    isHighLight: !1,
                    showProgress: showProgress
                };
                showProgress && (data.progressTotal = AdBallsUnlockStep[skinId], data.progressCurrent = GamePlayerData.getSkinUnlockStep(skinId)), 
                pageData.itemsData.push(data);
            }
            return pageData;
        }
        static getSelectedPageIndex() {
            return LocalData.getItem("lastSkinStoreViewPageIndex", 0);
        }
        onBackButtonClick() {
            this._rolling ? Toast.show("正在抽奖中") : Laya.Scene.open("MainScene.scene");
        }
        refreshUI() {
            this.buildPageData(), this.refreshButtons(), this.makeBallPreview(GamePlayerData.getUsingSkinId()), 
            this.refreshDotList();
        }
        refreshDotList() {
            this.dotList.array = this._dotState, this.dotList.refresh();
        }
        refreshButtons() {
            this._dotState[0] ? (this.randomBuyButton.visible = this.getLockedGridCount(SkinStorePageType.COIN) > 0, 
            this.watchAdButton.visible = !1, this.adBuyButton.visible = !1, this.keyTipsImage.visible = !1, 
            this.adTipsImage.visible = !1, this.coinBuyPriceLabel.text = SkinStoreView.getCoinBuyPrice().toString()) : this._dotState[1] ? (this.randomBuyButton.visible = !1, 
            this.watchAdButton.visible = !1, this.adBuyButton.visible = !1, this.keyTipsImage.visible = !0, 
            this.adTipsImage.visible = !1) : (this.randomBuyButton.visible = !1, this.watchAdButton.visible = this.getLockedGridCount(SkinStorePageType.AD) > 0, 
            this.adBuyButton.visible = this.getLockedGridCount(SkinStorePageType.AD) > 0, this.keyTipsImage.visible = !1, 
            this.adTipsImage.visible = !0, this.adBuyPriceLabel.text = SkinStoreView.getAdBuyPrice().toString());
        }
        getLockedGridCount(pageType) {
            let itemsData = this._pageData[pageType].itemsData, lockGrids = [];
            for (let i = 0; i < itemsData.length; i++) itemsData[i].isUnlock || lockGrids.push(i);
            return lockGrids.length;
        }
        updateDotList(dot, index) {
            let state = this._dotState[index];
            dot.skin = state ? DOT_CURRENT : DOT_NOT_CURRENT;
        }
        updatePage(page, index) {
            let pageData = this._pageData[index];
            page.setPageData(pageData);
        }
        onUpdate() {
            this.rotationBallPreview(), this.updateWatchAdCD();
        }
        rotationBallPreview() {
            if (this._ballPreview) {
                let rot = this._ballPreview.transform.rotationEuler;
                rot.y += 2, this._ballPreview.transform.rotationEuler = rot;
            }
        }
        onPageMouseDown() {
            this._rolling || (this._saveMouseDownX = Laya.stage.mouseX, 
            this._savePage = Math.round(this.pageList.scrollBar.value / this.pageList.width));
        }
        onPageMouseUp() {
            if (this._rolling) return;
            let moveDiff = Laya.stage.mouseX - this._saveMouseDownX;
            if (Math.abs(moveDiff) > .1 * this.pageList.width) {
                let page = moveDiff > 0 ? this._savePage - 1 : this._savePage + 1;
                page = clamp(page, 0, 2), this.changeToPageIndex(page, !0);
            } else {
                let page = Math.round(this.pageList.scrollBar.value / this.pageList.width);
                this.changeToPageIndex(page, !0);
            }
        }
        changeToPageIndex(pageIndex, tween) {
            for (let i = 0; i < 3; i++) this._dotState[i] = !1;
            this._dotState[pageIndex] = !0, tween ? this.pageList.tweenTo(pageIndex, 200, Handler$9.create(this, () => {
                this.refreshDotList(), this.refreshButtons(), LocalData.setItem("lastSkinStoreViewPageIndex", pageIndex);
            })) : (this.pageList.scrollTo(SkinStoreView.getSelectedPageIndex()), this.refreshDotList(), 
            this.refreshButtons(), LocalData.setItem("lastSkinStoreViewPageIndex", pageIndex));
        }
        onRandomBuyButtonClick() {
            if (this._rolling) return void Toast.show("正在抽奖中");
            let price = SkinStoreView.getCoinBuyPrice();
            GamePlayerData.getMoney() > price ? (GamePlayerData.addMoney(-price), this.startRoll(SkinStorePageType.COIN), 
            PlatformUtils$1.sendLogEvent("金币球,第一页")) : NotEnoughCoinDialog.open();
        }
        onWatchAdButtonClick() {
            if (this._rolling) return void Toast.show("正在抽奖中");
            let now = new Date().getTime();
            (-1 === this._nextWatchAdTime || -1 !== this._nextWatchAdTime && now > this._nextWatchAdTime) && ShareWatchAdSwitch.shareOrWatchAd("WatchAdUnlockBall", "看视频解锁球球", null, () => {
                this.resetNextWatchAdTime(), this.startRoll(SkinStorePageType.AD);
            });
        }
        onAdBuyButtonClick() {
            if (this._rolling) return void Toast.show("正在抽奖中");
            let price = SkinStoreView.getAdBuyPrice();
            GamePlayerData.getMoney() > price ? (GamePlayerData.addMoney(-price), this.startRoll(SkinStorePageType.AD), 
            PlatformUtils$1.sendLogEvent("金币球,第三页")) : NotEnoughCoinDialog.open();
        }
        startRoll(pageType) {
            if (this._rolling) return;
            this.pageList.scrollBar.touchScrollEnable = !1, this._rolling = !0, this._rollPageType = pageType;
            let itemsData = this._pageData[this._rollPageType].itemsData;
            this._lockGrids = [];
            for (let i = 0; i < itemsData.length; i++) itemsData[i].isUnlock || this._lockGrids.push(i);
            this._currentRollStep = 0, this._rollResultIndex = Utils.randomElementFromArray(this._lockGrids), 
            this._lastHighLightIndex = null, this.owner.timerLoop(200, this, this.rollStep);
        }
        rollStep() {
            let itemsData = this._pageData[this._rollPageType].itemsData;
            if (this._currentRollStep < 6) {
                let index = Utils.randomElementFromArray(this._lockGrids);
                index === this._lastHighLightIndex ? itemsData[index].isHighLight = !itemsData[index].isHighLight : (null !== this._lastHighLightIndex && (itemsData[this._lastHighLightIndex].isHighLight = !1), 
                itemsData[index].isHighLight = !0), this._lastHighLightIndex = index, this.pageList.array = this._pageData, 
                this.pageList.refresh(), this._currentRollStep++, PlatformUtils$1.vibrateShort(), 
                SoundManager$e.playSound(SoundClips.POPUP, 1);
            } else if (this._currentRollStep >= 6 && this._currentRollStep < 9) null !== this._lastHighLightIndex && (itemsData[this._lastHighLightIndex].isHighLight = !1, 
            this._lastHighLightIndex = null), itemsData[this._rollResultIndex].isHighLight = !itemsData[this._rollResultIndex].isHighLight, 
            this.pageList.array = this._pageData, this.pageList.refresh(), this._currentRollStep++; else {
                let skinId = itemsData[this._rollResultIndex].skinId;
                if (itemsData[this._rollResultIndex].isHighLight = !1, this._rollPageType === SkinStorePageType.AD) {
                    GamePlayerData.incSkinUnlockStep(skinId) ? (SkinUnlockDialog.openWithSkinId(skinId), 
                    itemsData[this._rollResultIndex].isUnlock = !0) : (itemsData[this._rollResultIndex].progressCurrent = GamePlayerData.getSkinUnlockStep(skinId), 
                    SoundManager$e.playSound(SoundClips.PICK_KEY, 1));
                } else GamePlayerData.unlockSkin(skinId), SkinUnlockDialog.openWithSkinId(skinId), 
                itemsData[this._rollResultIndex].isUnlock = !0;
                this.pageList.array = this._pageData, this.pageList.refresh(), this.pageList.scrollBar.touchScrollEnable = !0, 
                this._rolling = !1, this._lastHighLightIndex = null, this.refreshButtons(), this.owner.clearTimer(this, this.rollStep);
            }
        }
        static getCoinBuyPrice() {
            return this.getBuyPrice(BallSkinManager.getCoinBallUnlockedCount(), SwitchSettings.getCoinBuyPagePrice());
        }
        static getAdBuyPrice() {
            let count = 0;
            for (let i = 0; i < AdBalls.length; i++) {
                let skinId = AdBalls[i];
                count += GamePlayerData.getSkinUnlockStep(skinId);
            }
            return this.getBuyPrice(count, SwitchSettings.getAdBuyPagePrice());
        }
        static getBuyPrice(count, priceList) {
            return count < priceList.length ? priceList[count] : priceList[priceList.length - 1];
        }
        loadNextWatchAdTime() {
            this._nextWatchAdTime = LocalData.getItem("nextWatchAdTime", -1);
        }
        resetNextWatchAdTime() {
            this._nextWatchAdTime = new Date().getTime() + 1e3 * SwitchSettings.getWatchAdCDSec(), 
            LocalData.setItem("nextWatchAdTime", this._nextWatchAdTime);
        }
        updateWatchAdCD() {
            let now = new Date().getTime();
            if (-1 === this._nextWatchAdTime || -1 !== this._nextWatchAdTime && now > this._nextWatchAdTime) this.watchAdTextImage.visible = !0, 
            this.watchAdIconImage.visible = !0, this.watchAdCDLabel.visible = !1; else {
                let diff = Math.floor((this._nextWatchAdTime - now) / 1e3);
                this.watchAdTextImage.visible = !1, this.watchAdIconImage.visible = !1, this.watchAdCDLabel.visible = !0, 
                this.watchAdCDLabel.text = Utils.formatTime(diff, !1);
            }
        }
    }
    SkinStoreView._instance = null;
    var NativeAdViewUI = ui.Views.NativeAdViewUI;
    const LAST_SHOW_TIME$1 = "lastNativeAdShowTime";
    class NativeAdView extends NativeAdViewUI {
        static show(onClose) {
            SwitchSettings.getShareInduce() && SwitchSettings.getEnableNativeAd() && PlatformUtils$1.isSupportNativeAd() ? this._instance ? this._doShow(onClose) : this.init(() => {
                NativeAdView.updateNativeAdLastShowTime(), this._doShow(onClose);
            }) : onClose && onClose(!1);
        }
        static init(callback) {
            this._instance ? callback && callback() : (this._instance = new NativeAdView(), 
            callback && callback());
        }
        static _doShow(onClose) {
            PlatformUtils$1.isSupportNativeAd() && PlatformUtils$1.isNativeAdLoaded() && this.isIntervalOk() ? this._instance.refreshAndShow(onClose) : onClose && onClose(!1);
        }
        refreshAndShow(onClose) {
            PlatformUtils$1.hideCurrentBanner(), NativeAdView.updateNativeAdLastShowTime(), 
            OppoInterstitialAd.incTodayShowTimes(), this._nativeAdData = PlatformUtils$1.getNativeAdData(), 
            this.adLogo.skin = this._nativeAdData.logoUrl, this.adImage.skin = this._nativeAdData.imgUrlList.length > 0 ? this._nativeAdData.imgUrlList[0] : "", 
            this.adIcon.skin = this._nativeAdData.iconUrlList.length > 0 ? this._nativeAdData.iconUrlList[0] : "", 
            this.titleLabel.text = this._nativeAdData.title, this.descLabel.text = this._nativeAdData.desc, 
            this.closeButton.alpha = 0;
            let useNativeAdCasual = SwitchSettings.getUseNativeAdCasual();
            this.buttonLabel.text = useNativeAdCasual ? this._nativeAdData.clickBtnTxt : "点击跳过", 
            this._onCloseCallback = onClose, PlatformUtils$1.reportAdShow(this._nativeAdData), 
            this.open(!1), useNativeAdCasual && (Laya.timer.clearAll(this), Laya.timer.once(1e3, this, this.delayShowCloseButton));
        }
        onAwake() {
            SwitchSettings.getUseNativeAdCasual() && SwitchSettings.getEnableNativeAdMaskClick() && this.blackMask.on(Laya.Event.CLICK, this, this.onAdClick), 
            this.watchAdButton.on(Laya.Event.CLICK, this, this.onWatchAdButtonClick), this.windowClickArea.on(Laya.Event.CLICK, this, this.onAdClick), 
            this.closeButton.on(Laya.Event.CLICK, this, this.onCloseClick);
        }
        onClosed(type) {
            PlatformUtils$1.destroyNativeAdDataAndPreloadNext(this._nativeAdData), this._nativeAdData = null, 
            Laya.timer.clearAll(this), this._onCloseCallback = null, PlatformUtils$1.showCurrentBanner();
        }
        onWatchAdButtonClick() {
            SwitchSettings.getUseNativeAdCasual() ? this.onAdClick() : this.onCloseClick();
        }
        onAdClick() {
            let isExceed = !1;
            "undefined" != typeof qg && (isExceed = ZhiSheWanAd.getAdExceedStatus(this._nativeAdData.adId)), 
            isExceed || PlatformUtils$1.reportAdClick(this._nativeAdData), this.onCloseClick();
        }
        onCloseClick() {
            this._onCloseCallback && this._onCloseCallback(!0), this.close();
        }
        delayShowCloseButton() {
            Laya.Tween.to(this.closeButton, {
                alpha: 1
            }, 200);
        }
        static updateNativeAdLastShowTime() {
            let time = new Date().getTime();
            LocalData.setItem(LAST_SHOW_TIME$1, time);
        }
        static isIntervalOk() {
            let secDiff = (new Date().getTime() - LocalData.getItem(LAST_SHOW_TIME$1, new Date().getTime())) / 1e3;
            if (OppoInterstitialAd.getTodayShowTimes() >= 8) return console.log("当日原生插屏广告显示次数操过8次"), 
            !1;
            {
                let interval = 10, ret = secDiff >= interval;
                return ret || console.log("原生插屏广告显示间隔过小:", secDiff, interval), ret;
            }
        }
    }
    var Dialog$1 = Laya.Dialog, SoundManager$f = Laya.SoundManager, SkinTryoutDialogUI = ui.dialogs.SkinTryoutDialogUI, Loader$2 = Laya.Loader;
    let openChestParticlePath$2 = "particle/boom.part";
    class SkinTryoutDialog extends SkinTryoutDialogUI {
        constructor(skinId) {
            super(), this._skinId = skinId, this.tryoutButton.on(Laya.Event.CLICK, this, this.onTryoutClick), 
            this.continueButton.on(Laya.Event.CLICK, this, this.onCloseClick);
        }
        static openIfNeed(callback) {
            let level = GamePlayerData.getCurrentLevel(), 
            isBonusLv = level % BONUS_LV_INTERVAL == 0;
            if (Math.random() < SwitchSettings.getSkinTryOutOdds() && level > 3 && !isBonusLv) {
                let skinId = BallSkinManager.getRandomLockedSkin();
                if (null === skinId) return void (callback && callback());
                {
                    let dialog = new SkinTryoutDialog(skinId);
                    SkinTryoutDialog._onCloseCallback = callback, dialog.popup(!1);
                }
            } else callback && callback();
        }
        onAwake() {
            this._bannerAdComponent = BannerAdComponent.findChildAndHideBannerAd(this);
        }
        showBanner() {
            this._bannerAdComponent && this._bannerAdComponent.showBanner();
        }
        onOpened(param) {
            Mix3DTo2D.createMix(Dialog$1.manager, Mix3DTo2DPreviewSceneTemplate, () => {
                BallSkinManager.spawnBallSkin(this._skinId, ballSkin => 
                {
                    this._ball = ballSkin.owner, this._ball.transform.localScale = new Laya.Vector3(1.2, 1.2, 1.2), 
                    Mix3DTo2D.add3DMixWith2DRefSprite(Dialog$1.manager, this._ball, this.previewRoot), 
                    this.timerLoop(1e3 / 60, this, this.rotationPreview), this.playParticleEffect(), 
                    EventManager.dispatchEvent(GameEvent.SKIN_UNLOCK_DIALOG_OPEN);
                });
            });
        }
        onClosed(type) {
            this.clearTimer(this, this.rotationPreview), 
            Mix3DTo2D.destroyMix(Dialog$1.manager), 
            SkinTryoutDialog._onCloseCallback && (SkinTryoutDialog._onCloseCallback(), 
            SkinTryoutDialog._onCloseCallback = null);
        }
        onTryoutClick() {
            ShareWatchAdSwitch.shareOrWatchAd("SkinTryOut", "皮肤试用", null, () => {
                EventManager.dispatchEvent(GameEvent.SKIN_TRY_OUT, this._skinId), this.onCloseClick();
            });
        }
        onCloseClick() {
            this.continueButton.disabled = true
            this.close();
        }
        close(type) {
            if(this._ball) {
                this._ball.removeSelf();
                this._ball.destroy(true);
                this._ball = null;
            }
            super.close(type), 
            EventManager.dispatchEvent(GameEvent.SKIN_UNLOCK_DIALOG_CLOSE);
        }
        playParticleEffect() {
            SkinTryoutDialog.loadParticleEffect(() => {
                let particle = new Laya.Particle2D(SkinTryoutDialog._openChestParticleSettings);
                particle.emitter.start(.3), particle.play(), particle.pos(0, 0), this.previewRoot.addChild(particle);
            });
        }
        static loadParticleEffect(callback) {
            this._openChestParticleSettings ? callback() : Laya.loader.load(openChestParticlePath$2, Laya.Handler.create(this, settings => {
                this._openChestParticleSettings = settings, callback();
            }), null, Loader$2.JSON);
        }
        rotationPreview() 
        {
            if (this._ball && this._ball.transform ) {
                let rot = this._ball.transform.rotationEuler;
                rot.y += .5, this._ball.transform.rotationEuler = rot;
            }
        }
    }
    SkinTryoutDialog._openChestParticleSettings = null;
    class HomeLayer extends Laya.Script {
        constructor() {
            super(...arguments), this.playButton = null, this.skinButton = null,
            this.skinStoreBadge = null, this.appListNode = null, this._isGameReady = !1, this._showTimes = 0;
        }
        onAwake() {
            EventManager.registerEvent(CommonEvents.GAME_IS_READY, this.onGameReady, this), 
            this.playButton.on(Laya.Event.CLICK, this, this.onStartClick), 
            this.skinButton.on(Laya.Event.CLICK, this, this.onSkinClick), 
            this.yad = this.owner.getChildByName("yad");
            this.yad.on(Laya.Event.MOUSE_DOWN, this, ()=>{
                platform.getInstance().navigate("HOME","LOGO");
            });
            this._bannerAdComponent = BannerAdComponent.findChildAndHideBannerAd(this.owner), 
            this.showAppListIfNeed();
        }
        onEnable() {
            this._showTimes++, 
            this.showSkinStoreBadgeIfNeed(), 
            this._isGameReady && (GamePlayerData.resumePower(), 
            this.showBanner(), 
            this.showNativeAdOrInterstitialAd());
        }
        showAppListIfNeed() {
            this.appListNode.active = true;
        }
        /**插屏 */
        showNativeAdOrInterstitialAd() {
            // this._showTimes > 1 && this.owner.timerOnce(500, this, () => {
            //     NativeAdView.show(isShow => {
            //         isShow || PlatformUtils$1.showInterstitialAd("首页插屏广告");
            //     });
            // });
        }
        onDestroy() {
            EventManager.releaseAllEvents(this);
        }
        showBanner() {
        }
        onStartClick() {
            if( 0 === GamePlayerData.getPower()){
                NotEnoughPowerDialog.open()
            }else{
                platform.getInstance().showInterstitial(()=>{
                    GamePlayerData.usePower();
                    SkinTryoutDialog.openIfNeed(() => {
                        EventManager.dispatchEvent(GameEvent.START_PLAYING_LEVEL);
                    });
                });
            }
        }
        onSkinClick() {
            SkinStoreView.openView();
        }
        showSkinStoreBadgeIfNeed() {
            this.skinStoreBadge.visible = SkinStoreView.canBuyBall();
        }
        onGameReady() {
            this._isGameReady || (this._isGameReady = !0, GamePlayerData.resumePower(), this.showBanner());
        }
        onMoreGameClick() {
            AppMatrixWall.forceOpenView();
        }
    }
    var Script$5 = Laya.Script;
    class AnimProgressBar extends Script$5 {
        constructor() {
            super(...arguments), this.speed = .2, this._inAnim = !1, this._currentAnimValue = 0, 
            this._progress = 0, this._animTo = 0, this._animDt = 0, this._animFrom = 0;
        }
        onAwake() {
            this._progressBar = this.owner;
        }
        reset() {
            this._inAnim = !1, this._currentAnimValue = 0, this._progress = 0, this._animTo = 0, 
            this._animDt = 0, this._animFrom = 0;
        }
        _setProgress(progress) {
            this._progressBar && (this._progressBar.value = progress);
        }
        setProgress(progress) {
            this._progress = progress;
        }
        setAnimationTo(progress) {
            this._animTo = progress, this._inAnim ? this._animFrom = this._currentAnimValue : this._animFrom = this._progress, 
            this._inAnim = !0, this._animDt = 0, this._progress = progress;
        }
        getProgress() {
            return this._progress;
        }
        onUpdate() {
            let dt = Laya.timer.delta / 1e3;
            if (this._progressBar) if (this._inAnim) {
                this._animDt += dt, this._animDt > this.speed && (this._animDt = this.speed, this._inAnim = !1);
                let rate = this._animDt / this.speed;
                this._currentAnimValue = this._animFrom + (this._animTo - this._animFrom) * rate, 
                this._setProgress(this._currentAnimValue);
            } else this._setProgress(this._progress);
        }
    }
    const maxGrabTimes = 7, bannerHideDelay = 2;
    class KillDefenderLayer extends Laya.Script {
        constructor() {
            super(...arguments), this.progressBar = null, this.quickClickButton = null, this.handImage = null, 
            this.bannerRefOverlay = null, this.bannerRefOutOfScreen = null, this._isFull = !1, 
            this._isWaitingBanner = !1, this._animProgressBar = null;
        }
        onAwake() {
            this._animProgressBar = this.progressBar.addComponent(AnimProgressBar), this._bannerAdComponent = BannerAdComponent.findChildAndHideBannerAd(this.owner), 
            this.quickClickButton.on(Laya.Event.CLICK, this, this.onQuickClick);
        }
        onEnable() {
            this.bannerRefOverlay.alpha = 0, this.bannerRefOutOfScreen.alpha = 0, this._isFull = !1, 
            this._isWaitingBanner = !1, this._animProgressBar.reset(), this._animProgressBar.setProgress(0), 
            PlatformUtils$1.sendLogEvent("清除防御者:开始"), this.owner.clearTimer(this, this.delayHideBanner), 
            this.owner.clearTimer(this, this.delayShowResult), EventManager.registerEvent(CommonEvents.GAME_ON_SHOW, this.onGameShow, this), 
            this.owner.timerLoop(410, this, () => {
                Laya.Tween.to(this.handImage, {
                    rotation: 10
                }, 200, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                    Laya.Tween.to(this.handImage, {
                        rotation: 0
                    }, 200, Laya.Ease.linearNone);
                }));
            }), this.moveBannerToOutOfScreen();
        }
        onDisable() {
            this.hideBanner(), EventManager.releaseAllEvents(this);
        }
        onQuickClick() {
            let step = 1 / maxGrabTimes, progress = this._animProgressBar.getProgress();
            (progress += step) >= 1 && (progress = 1, this._isFull = !0), this._animProgressBar.setAnimationTo(progress), 
            progress >= 1 && !this._isWaitingBanner ? (this.moveBannerToFixButton(), this.watchVideoAd(), 
            this._isWaitingBanner = !0, this.owner.timerOnce(1e3 * bannerHideDelay, this, this.delayShowResult)) : progress > .75 && !this._isWaitingBanner && Math.random() < .5 && (this.moveBannerToFixButton(), 
            this.watchVideoAd(), this._isWaitingBanner = !0, this.owner.timerOnce(1e3 * bannerHideDelay, this, this.delayHideBanner));
        }
        watchVideoAd() {
            "undefined" != typeof qg && PlatformUtils$1.showVideoAd(!0, "消灭防御者看视频", () => {
                this.showGrabResult();
            });
        }
        delayShowResult() {
            this.showGrabResult(), this.moveBannerToOutOfScreen(), this._isWaitingBanner = !1;
        }
        delayHideBanner() {
            this.moveBannerToOutOfScreen(), this._isWaitingBanner = !1;
        }
        onUpdate() {
            if (!this._isFull && !this._isWaitingBanner) {
                let d = .1 * (Laya.timer.delta / 1e3), progress = this._animProgressBar.getProgress();
                (progress -= d) < 0 && (progress = 0), this._animProgressBar.setAnimationTo(progress);
            }
        }
        onGameShow() {
            PlatformUtils$1.sendLogEvent("清除防御者:Banner点击成功"), this._isFull = !0, this._animProgressBar.setAnimationTo(1), 
            this.showGrabResult();
        }
        showGrabResult() {
            Toast.show("清除成功！", .5), this.hideBanner(), EventManager.dispatchEvent(GameEvent.KILL_DEFENDERS);
        }
        moveBannerToOutOfScreen() {
            this._bannerAdComponent && (this.showBanner(), this._bannerAdComponent.setRefNode(this.bannerRefOutOfScreen));
        }
        moveBannerToFixButton() {
            this._bannerAdComponent && (this.showBanner(), this._bannerAdComponent.setRefNode(this.bannerRefOverlay));
        }
        showBanner() {
            this._bannerAdComponent && this._bannerAdComponent.showBanner();
        }
        hideBanner() {
            this._bannerAdComponent && this._bannerAdComponent.hideBanner();
        }
    }
    var NativeAdBoxUI = ui.Views.NativeAdBoxUI;
    class NativeAdBox extends NativeAdBoxUI {
        onAwake() {
            this.adImage.on(Laya.Event.CLICK, this, this.onAdClick), 
            this.closeButton.on(Laya.Event.CLICK, this, this.hidePreloadNext);
        }
        onEnable() {
            SwitchSettings.getUseNativeAdCasual() ? 
            PlatformUtils$1.isSupportNativeAd() && PlatformUtils$1.isNativeAdLoaded() ? 
            this.refresh() : this.callLater(() => {
                this.hidePreloadNext();
            }) : this.visible = !1;
        }
        onDisable() {
            PlatformUtils$1.destroyNativeAdDataAndPreloadNext(this._nativeAdData), this._nativeAdData = null;
        }
        hidePreloadNext() {
            this.visible = !1, PlatformUtils$1.destroyNativeAdDataAndPreloadNext(this._nativeAdData), 
            this._nativeAdData = null;
        }
        onAdClick() {
            if (this._nativeAdData) {
                let isExceed = !1;
                "undefined" != typeof qg && (isExceed = ZhiSheWanAd.getAdExceedStatus(this._nativeAdData.adId)), 
                isExceed || PlatformUtils$1.reportAdClick(this._nativeAdData);
            }
        }
        refresh() {
            this.visible = !0, this._nativeAdData = PlatformUtils$1.getNativeAdData(), this.adLogo.skin = this._nativeAdData.logoUrl, 
            this.adImage.skin = this._nativeAdData.imgUrlList.length > 0 ? this._nativeAdData.imgUrlList[0] : "", 
            this.titleLabel.text = this._nativeAdData.title, PlatformUtils$1.reportAdShow(this._nativeAdData);
        }
    }
    var AppGridItemUI = ui.ZhiSheWanAd.view.AppGridItemUI;
    class AppGridItem extends AppGridItemUI {
        constructor() {
            super(), this._gridData = null, this._currentIndex = -1, this.on(Laya.Event.MOUSE_DOWN, this, this.onClick);
        }
        onEnable() {
            this.timerLoop(3e3, this, this.changeApp);
        }
        onDisable() {
            this.clearTimer(this, this.changeApp);
        }
        setData(appIconData) {
            console.log("this._gridData =",appIconData);
            this._gridData = appIconData, this._currentIndex = -1, this.changeApp();
        }
        onClick() {
            if (!this._gridData) return;
            let data = this._gridData[this._currentIndex];

            platform.getInstance().navigate("GAME","MORE",data.id);
            // ZhiSheWanAd.navigateToApp(data), 
            this.changeApp();
        }
        changeApp() {
            if (!this._gridData) return;
            -1 === this._currentIndex ? this._currentIndex = 0 : (this._currentIndex++, this._currentIndex >= this._gridData.length && (this._currentIndex = 0));
            let data = this._gridData[this._currentIndex];
            this.iconImage.skin = data.thumb, this.nameLabel.text = data.name, this.barImage.skin = getBarSkin(data.index), 
            this.badgeImage.skin = getBadgeSkin(data);
        }
    }
    var Handler$a = Laya.Handler;
    class AppGrid extends Laya.Script {
        constructor() {
            super(...arguments), this._list = null, this._gridData = null;
        }
        onAwake() {
            this._list = this.owner, this._list.itemRender = AppGridItem, this._list.renderHandler = new Handler$a(this, this.updateItem), 
            ZhiSheWanAd.isEnabledAppMatrix() || (this.owner.active = !1, this.owner.visible = !1);
        }
        onEnable() {
            ZhiSheWanAd.isEnabledAppMatrix() && this.refreshUI();
        }
        refreshUI() {

            let listData = platform.getInstance().getForgames();
            this.fillData(listData);
            this._gridData ? (this.owner.visible = !0, this.owner.active = !0, 
                this._list.array = this._gridData, this._list.refresh()) : (console.warn("没有数据", this.slotId), 
                this.owner.visible = !1, this.owner.active = !1);

            // ZhiSheWanAd.getSlotDataList(this.slotId, listData => {
            //     this.fillData(listData), 
            // });
        }
        fillData(listData) {
            if (!listData) return;
            let list = [];
            for (let i = 0; i < listData.length; i++) {
                let itemData = cloneAppDataItem(listData[i]);
                randomItemState(itemData), list.push(itemData);
            }
            if (list.length < 12) {
                let n = 12 - list.length;
                for (let i = 0; i < n; i++) {
                    let itemData = cloneAppDataItem(listData[i]);
                    randomItemState(itemData), list.push(itemData);
                }
            }
            list = list.concat(list), this._gridData = [];
            for (let i = 0; i < list.length; i += 2) this._gridData.push([ list[i], list[i + 1] ]);
        }
        updateItem(listItem, index) {
            let data = this._gridData[index];
            listItem.setData(data);
        }
    }
    class LostLayer extends Laya.Script {
        constructor() {
            super(...arguments), this.buttonsBox = null, this.skipButton = null, this.retryButton = null, 
            this._buttonBoxY = null;
        }
        onAwake() {
            this._bannerAdComponent = BannerAdComponent.findChildAndHideBannerAd(this.owner), 
            this._gameIconComponent = GameIconComponent.findChildAndHideIcon(this.owner), 
            this.skipButton.on(Laya.Event.CLICK, this, this.onSkipClick), 
            this.retryButton.on(Laya.Event.CLICK, this, this.onRetryClick);
        }
        onSkipClick() {
            ShareWatchAdSwitch.shareOrWatchAd("SkipLevel", "跳关", null, () => {
                EventManager.dispatchEvent(GameEvent.SKIP_LEVEL);
            });
        }
        onRetryClick() {
            this.retryButton.visible = false;
            Laya.timer.once(0.5e3,this,()=>{
                this.retryButton.visible = true;
            });
            EventManager.dispatchEvent(GameEvent.RETRY_LEVEL);
        }
        onEnable() {
            null === this._buttonBoxY && (this._buttonBoxY = this.buttonsBox.y), 
            this.resetLayout(); 
        }
        onDisable() {
            Laya.timer.clearAll(this);
        }
        resetLayout() {
            if (this.hideBanner(), this.retryButton.visible = !1, this.retryButton.active = !1, 
            this.buttonsBox.y = this._buttonBoxY, SwitchSettings.getBannerCasualClick("resurgence")) {
                let skipButtonCtrl = SwitchSettings.getSkipButtonCtrl();
                this.owner.timerOnce(1e3 * skipButtonCtrl.showBannerDelay, this, () => {
                    this.showBanner();
                }), this.owner.timerOnce(1e3 * skipButtonCtrl.moveButtonDelay, this, () => {
                    let toY = this._buttonBoxY - 175;
                    Laya.Tween.to(this.buttonsBox, {
                        y: toY
                    }, 150, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                        this.retryButton.visible = !0, this.retryButton.active = !0, this.retryButton.alpha = 0, 
                        Laya.Tween.to(this.retryButton, {
                            alpha: 1
                        }, 150, Laya.Ease.linearNone);
                    }));
                });
            } else this.retryButton.visible = !0, this.retryButton.active = !0, this.retryButton.alpha = 1, 
            this.owner.callLater(() => {
                this.buttonsBox.pos(this.buttonsBox.x, this._buttonBoxY - 175);
            }), this.owner.timerOnce(500, this, () => {
                this.showBanner();
            });
        }
        showBanner() {
            this._bannerAdComponent && this._bannerAdComponent.showBanner();
        }
        hideBanner() {
            this._bannerAdComponent && this._bannerAdComponent.hideBanner();
        }
        showIcon() {
            this._gameIconComponent && this._gameIconComponent.showIcon();
        }
        hideIcon() {
            this._gameIconComponent && this._gameIconComponent.hideIcon();
        }
    }
    var AppMatrixGridItemUI = ui.ZhiSheWanAd.view.AppMatrixGridItemUI;
    class AppMatrixGridItem extends AppMatrixGridItemUI {
        constructor() {
            super(), this._data = null, this.on(Laya.Event.CLICK, this, this.onClick);
        }
        setData(appIconData) {
            this._data = appIconData, this.iconImage.skin = this._data.app_icon, this.nameLabel.text = this._data.app_title, 
            this.barImage.skin = getBarSkin(appIconData.index), this.badgeImage.skin = getBadgeSkin(appIconData);
        }
        onClick() {
            this._data && ZhiSheWanAd.navigateToApp(this._data);
        }
    }
    var Handler$b = Laya.Handler;
    class AppMatrixGridList extends Laya.Script {
        constructor() {
            super(...arguments), this._list = null, this._appInfoList = null;
        }
        onAwake() {
            this._list = this.owner, ZhiSheWanAd.getSlotDataList(this.slotId, listData => {
                this.fillData(listData), this._appInfoList ? (this._list.itemRender = AppMatrixGridItem, 
                this._list.renderHandler = new Handler$b(this, this.updateItem), this._list.vScrollBarSkin = "", 
                this._list.array = this._appInfoList) : (console.warn("没有数据", this.slotId), this.owner.visible = !1, 
                this.owner.active = !1);
            });
        }
        fillData(listData) {
            if (!listData) return;
            let list = [];
            for (let i = 0; i < listData.length; i++) {
                let itemData = cloneAppDataItem(listData[i]);
                randomItemState(itemData), list.push(itemData);
            }
            if (list.length < 18) {
                let n = 18 - list.length;
                for (let i = 0; i < n; i++) {
                    let itemData = cloneAppDataItem(listData[i]);
                    randomItemState(itemData), list.push(itemData);
                }
            }
            this._appInfoList = list;
        }
        updateItem(listItem, index) {
            let data = this._appInfoList[index];
            data.index = index, listItem.setData(data);
        }
    }
    class AppIconBox extends Laya.Script {
        constructor() {
            super(...arguments), this.appIconImage = null, this.appNameLabel = null, this.shake = !1, 
            this._data = null, this._shakeTimeLine = null;
        }
        onAwake() {
            this.owner.on(Laya.Event.CLICK, this, this.onClick), ZhiSheWanAd.isEnabledAppMatrix() || (this.owner.active = !1, 
            this.owner.visible = !1);
        }
        onDisable() {
            this.owner.rotation = 0, this._shakeTimeLine && (this._shakeTimeLine.destroy(), 
            this._shakeTimeLine = null);
        }
        setData(appIconData) {
            appIconData || (console.warn("没有数据"), this.owner.visible = !1, this.owner.active = !1), 
            this._data = appIconData, this.appNameLabel.text = this._data.app_title, this.appIconImage.skin = this._data.app_icon, 
            this.shake && !this._shakeTimeLine && (this._shakeTimeLine = spriteShake(this.owner, !0, 3e3 * Math.random()));
        }
        onClick(e) {
            this._data && ZhiSheWanAd.navigateToApp(this._data);
        }
    }
    class GameConfig {
        constructor() {}
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("script/Views/NotEnoughCoinDialog.ts", NotEnoughCoinDialog), reg("framework/UIComponents/BannerAdComponent.ts", BannerAdComponent), 
            reg("script/Views/NotEnoughPowerDialog.ts", NotEnoughPowerDialog), reg("script/Joystick.ts", Joystick), 
            reg("script/Views/UILayers/UILayer.ts", UILayer), reg("script/GameScene.ts", GameScene), 
            reg("framework/UIComponents/ScaleButtonEffect.ts", ScaleButtonEffect), reg("script/Views/UILayers/DevUILayer.ts", UILayer$1), 
            reg("script/Views/Widgets/PowerBar.ts", PowerBar), reg("script/Views/Widgets/SettingsBar.ts", SettingsBar), 
            reg("script/Views/Widgets/CoinLabel.ts", CoinLabel), reg("script/Views/Widgets/KeyList.ts", KeyList), 
            reg("ZhiSheWanAd/AppIconBoxGroupRoll.ts", AppIconBoxGroupRoll), reg("ZhiSheWanAd/AppList.ts", AppList), 
            reg("ZhiSheWanAd/AppListItemWithName.ts", AppListItemWithName), reg("script/Views/UILayers/HomeLayer.ts", HomeLayer), 
            reg("script/Views/UILayers/KillDefenderLayer.ts", KillDefenderLayer), reg("framework/NativeAdBox.ts", NativeAdBox), 
            reg("ZhiSheWanAd/AppGrid.ts", AppGrid), reg("ZhiSheWanAd/AppGridItem.ts", AppGridItem), 
            reg("framework/UIComponents/GameIconComponent.ts", GameIconComponent), reg("script/Views/UILayers/LostLayer.ts", LostLayer), 
            reg("script/Views/UILayers/MaskTransLayer.ts", MaskTransLayer), reg("script/Views/Widgets/TopLevelList.ts", TopLevelList), 
            reg("script/Views/UILayers/PlayingLayer.ts", PlayingLayer), reg("script/Views/UILayers/WinLayer.ts", WinLayer), 
            reg("framework/NativeAdView.ts", NativeAdView), reg("script/Views/OpenChestView/ChestGridItem.ts", ChestGridItem), 
            reg("script/Views/OpenChestView/OpenChestView.ts", OpenChestView), reg("script/Views/SkinStoreView/SkinStoreGridItem.ts", SkinStoreGridItem), 
            reg("script/Views/SkinStoreView/SkinStoreGridPage.ts", SkinStoreGridPage), reg("script/Views/SkinStoreView/SkinStoreView.ts", SkinStoreView), 
            reg("ZhiSheWanAd/AppMatrixWall.ts", AppMatrixWall), reg("ZhiSheWanAd/AppListItemNoName.ts", AppListItemNoName), 
            reg("ZhiSheWanAd/AppMatrixGridItem.ts", AppMatrixGridItem), reg("ZhiSheWanAd/AppMatrixGridList.ts", AppMatrixGridList), 
            reg("ZhiSheWanAd/AppIconBox.ts", AppIconBox);
        }
    }
    GameConfig.width = 720, GameConfig.height = 1280, GameConfig.scaleMode = "fixedwidth", 
    GameConfig.screenMode = "none", GameConfig.alignV = "middle", GameConfig.alignH = "left", 
    GameConfig.startScene = "LoadingScene.scene", GameConfig.sceneRoot = "", GameConfig.debug = !1, 
    GameConfig.stat = !1, GameConfig.physicsDebug = !1, GameConfig.exportSceneToJson = !0, 
    GameConfig.init();
    var buttonDownScaleUI = ui.anim.buttonDownScaleUI;
    function forceImportLayaMaxUI() {
        (0, Laya.ClassUtils.regClass)("ui.anim.buttonDownScaleUI", buttonDownScaleUI);
    }
    forceImportLayaMaxUI();
    let MyConfig3D = new Config3D();
    MyConfig3D.isAntialias = !1, MyConfig3D.defaultPhysicsMemory = 16;
    var Loader$3 = Laya.Loader;
    const PreloadConfig = {
        subpackages: PRELOAD_SUBPACKAGES,
        fileGroups2d: [ {
            path: "res/atlas",
            files: [ {
                url: "framework_res.atlas",
                type: Loader$3.ATLAS
            }, {
                url: "framework_res.png",
                type: Loader$3.IMAGE
            }, {
                url: "res_zhishewan.atlas",
                type: Loader$3.ATLAS
            }, {
                url: "res_zhishewan.png",
                type: Loader$3.IMAGE
            }, {
                url: "ui_res.atlas",
                type: Loader$3.ATLAS
            }, {
                url: "ui_res.png",
                type: Loader$3.IMAGE
            } ]
        }, {
            path: "UILayers",
            files: [ {
                url: "DebugLayer.json",
                type: Loader$3.JSON
            }, {
                url: "HomeLayer.json",
                type: Loader$3.JSON
            }, {
                url: "LostLayer.json",
                type: Loader$3.JSON
            }, {
                url: "MaskTransLayer.json",
                type: Loader$3.JSON
            }, {
                url: "PlayingLayer.json",
                type: Loader$3.JSON
            }, {
                url: "WinLayer.json",
                type: Loader$3.JSON
            } ]
        }, {
            path: "Views",
            files: [ {
                url: "OpenChestView.json",
                type: Loader$3.JSON
            }, {
                url: "SkinStoreView.json",
                type: Loader$3.JSON
            } ]
        }, {
            path: "sounds",
            files: [ {
                url: "BallUnlock.mp3",
                type: Loader$3.SOUND
            }, {
                url: "CoinAward.mp3",
                type: Loader$3.SOUND
            }, {
                url: "CoinCollect.mp3",
                type: Loader$3.SOUND
            }, {
                url: "FailSound.mp3",
                type: Loader$3.SOUND
            }, {
                url: "KeyCollect.mp3",
                type: Loader$3.SOUND
            }, {
                url: "KickBall.mp3",
                type: Loader$3.SOUND
            }, {
                url: "Popup.mp3",
                type: Loader$3.SOUND
            }, {
                url: "Tackle.mp3",
                type: Loader$3.SOUND
            }, {
                url: "WinSound.mp3",
                type: Loader$3.SOUND
            } ]
        } ],
        fileGroups3d: [ {
            path: "subpackages/commonRes3D/Conventional/Assets/Skybox",
            files: [ "Skybox.lmat", "skybox.ltc", "skybox_NegativeX.png", "skybox_NegativeY.png", "skybox_NegativeZ.png", "skybox_PositiveX.png", "skybox_PositiveY.png", "skybox_PositiveZ.png" ]
        }, {
            path: "subpackages/commonRes3D/Conventional",
            files: [ "2DPreviewSceneTemplate.ls", "Ball.lh", "ChestRoomChest.lh", "ChestWithCoins.lh", "Coin.lh", "Defender.lh", "Goal.lh", "Key.lh", "KickerGoalKeeper.lh" ]
        }, {
            path: "subpackages/commonRes3D/Conventional/Assets/Defender/FBX",
            files: [ "TPose-GoalKeeper_0.lm", "Walking-Default.lani", "CatchLeft-Default.lani", "CatchRight-Default.lani", "CenterCatch-Default.lani", "FallenIdle-Default.lani", "GoalkeeperIdle-All.lani", "Idle-trim.lani", "Run-Default.lani", "SidestepLeft-Default.lani", "SidestepRight-Default.lani", "TackleLeft-Trim.lani" ]
        } ]
    };
    function initialParams(fn) {
        return function(...args) {
            var callback = args.pop();
            return fn.call(this, args, callback);
        };
    }
    let _defer, hasSetImmediate = "function" == typeof setImmediate && setImmediate, hasNextTick = "object" == typeof process && "function" == typeof process.nextTick;
    function fallback(fn) {
        setTimeout(fn, 0);
    }
    function wrap(defer) {
        return (fn, ...args) => defer(() => fn(...args));
    }
    var setImmediate$1 = wrap(_defer = hasSetImmediate ? setImmediate : hasNextTick ? process.nextTick : fallback);
    function asyncify(func) {
        return isAsync(func) ? function(...args) {
            const callback = args.pop();
            return handlePromise(func.apply(this, args), callback);
        } : initialParams(function(args, callback) {
            var result;
            try {
                result = func.apply(this, args);
            } catch (e) {
                return callback(e);
            }
            if (result && "function" == typeof result.then) return handlePromise(result, callback);
            callback(null, result);
        });
    }
    function handlePromise(promise, callback) {
        return promise.then(value => {
            invokeCallback(callback, null, value);
        }, err => {
            invokeCallback(callback, err && err.message ? err : new Error(err));
        });
    }
    function invokeCallback(callback, error, value) {
        try {
            callback(error, value);
        } catch (err) {
            setImmediate$1(e => {
                throw e;
            }, err);
        }
    }
    function isAsync(fn) {
        return "AsyncFunction" === fn[Symbol.toStringTag];
    }
    function wrapAsync(asyncFn) {
        if ("function" != typeof asyncFn) throw new Error("expected a function");
        return isAsync(asyncFn) ? asyncify(asyncFn) : asyncFn;
    }
    function awaitify(asyncFn, arity = asyncFn.length) {
        if (!arity) throw new Error("arity is undefined");
        function awaitable(...args) {
            return "function" == typeof args[arity - 1] ? asyncFn.apply(this, args) : new Promise((resolve, reject) => {
                args[arity - 1] = ((err, ...cbArgs) => {
                    if (err) return reject(err);
                    resolve(cbArgs.length > 1 ? cbArgs : cbArgs[0]);
                }), asyncFn.apply(this, args);
            });
        }
        return Object.defineProperty(awaitable, "name", {
            value: `awaitable(${asyncFn.name})`
        }), awaitable;
    }
    function applyEach(eachfn) {
        return function(fns, ...callArgs) {
            return awaitify(function(callback) {
                var that = this;
                return eachfn(fns, (fn, cb) => {
                    wrapAsync(fn).apply(that, callArgs.concat(cb));
                }, callback);
            });
        };
    }
    function _asyncMap(eachfn, arr, iteratee, callback) {
        arr = arr || [];
        var results = [], counter = 0, _iteratee = wrapAsync(iteratee);
        return eachfn(arr, (value, _, iterCb) => {
            var index = counter++;
            _iteratee(value, (err, v) => {
                results[index] = v, iterCb(err);
            });
        }, err => {
            callback(err, results);
        });
    }
    function isArrayLike(value) {
        return value && "number" == typeof value.length && value.length >= 0 && value.length % 1 == 0;
    }
    const breakLoop = {};
    function once(fn) {
        function wrapper(...args) {
            if (null !== fn) {
                var callFn = fn;
                fn = null, callFn.apply(this, args);
            }
        }
        return Object.assign(wrapper, fn), wrapper;
    }
    function createIterator(coll) {
        if (isArrayLike(coll)) return function(coll) {
            var i = -1, len = coll.length;
            return function() {
                return ++i < len ? {
                    value: coll[i],
                    key: i
                } : null;
            };
        }(coll);
        var obj, okeys, i, len, iterator = function(coll) {
            return coll[Symbol.iterator] && coll[Symbol.iterator]();
        }(coll);
        return iterator ? function(iterator) {
            var i = -1;
            return function() {
                var item = iterator.next();
                return item.done ? null : (i++, {
                    value: item.value,
                    key: i
                });
            };
        }(iterator) : (okeys = (obj = coll) ? Object.keys(obj) : [], i = -1, len = okeys.length, 
        function() {
            var key = okeys[++i];
            return i < len ? {
                value: obj[key],
                key: key
            } : null;
        });
    }
    function onlyOnce(fn) {
        return function(...args) {
            if (null === fn) throw new Error("Callback was already called.");
            var callFn = fn;
            fn = null, callFn.apply(this, args);
        };
    }
    function asyncEachOfLimit(generator, limit, iteratee, callback) {
        let done = !1, canceled = !1, awaiting = !1, running = 0, idx = 0;
        function replenish() {
            running >= limit || awaiting || done || (awaiting = !0, generator.next().then(({value: value, done: iterDone}) => {
                if (!canceled && !done) {
                    if (awaiting = !1, iterDone) return done = !0, void (running <= 0 && callback(null));
                    running++, iteratee(value, idx, iterateeCallback), idx++, replenish();
                }
            }).catch(handleError));
        }
        function iterateeCallback(err, result) {
            if (running -= 1, !canceled) return err ? handleError(err) : !1 === err ? (done = !0, 
            void (canceled = !0)) : result === breakLoop || done && running <= 0 ? (done = !0, 
            callback(null)) : void replenish();
        }
        function handleError(err) {
            canceled || (awaiting = !1, done = !0, callback(err));
        }
        replenish();
    }
    var eachOfLimit = limit => (obj, iteratee, callback) => {
        if (callback = once(callback), limit <= 0) throw new RangeError("concurrency limit cannot be less than 1");
        if (!obj) return callback(null);
        if (function(fn) {
            return "AsyncGenerator" === fn[Symbol.toStringTag];
        }(obj)) return asyncEachOfLimit(obj, limit, iteratee, callback);
        if (function(obj) {
            return "function" == typeof obj[Symbol.asyncIterator];
        }(obj)) return asyncEachOfLimit(obj[Symbol.asyncIterator](), limit, iteratee, callback);
        var nextElem = createIterator(obj), done = !1, canceled = !1, running = 0, looping = !1;
        function iterateeCallback(err, value) {
            if (!canceled) if (running -= 1, err) done = !0, callback(err); else if (!1 === err) done = !0, 
            canceled = !0; else {
                if (value === breakLoop || done && running <= 0) return done = !0, callback(null);
                looping || replenish();
            }
        }
        function replenish() {
            for (looping = !0; running < limit && !done; ) {
                var elem = nextElem();
                if (null === elem) return done = !0, void (running <= 0 && callback(null));
                running += 1, iteratee(elem.value, elem.key, onlyOnce(iterateeCallback));
            }
            looping = !1;
        }
        replenish();
    };
    var eachOfLimit$2 = awaitify(function(coll, limit, iteratee, callback) {
        return eachOfLimit(limit)(coll, wrapAsync(iteratee), callback);
    }, 4);
    function eachOfArrayLike(coll, iteratee, callback) {
        callback = once(callback);
        var index = 0, completed = 0, {length: length} = coll, canceled = !1;
        function iteratorCallback(err, value) {
            !1 === err && (canceled = !0), !0 !== canceled && (err ? callback(err) : ++completed !== length && value !== breakLoop || callback(null));
        }
        for (0 === length && callback(null); index < length; index++) iteratee(coll[index], index, onlyOnce(iteratorCallback));
    }
    function eachOfGeneric(coll, iteratee, callback) {
        return eachOfLimit$2(coll, 1 / 0, iteratee, callback);
    }
    var eachOf$1 = awaitify(function(coll, iteratee, callback) {
        return (isArrayLike(coll) ? eachOfArrayLike : eachOfGeneric)(coll, wrapAsync(iteratee), callback);
    }, 3);
    var map$1 = awaitify(function(coll, iteratee, callback) {
        return _asyncMap(eachOf$1, coll, iteratee, callback);
    }, 3), applyEach$1 = applyEach(map$1);
    var eachOfSeries$1 = awaitify(function(coll, iteratee, callback) {
        return eachOfLimit$2(coll, 1, iteratee, callback);
    }, 3);
    var mapSeries$1 = awaitify(function(coll, iteratee, callback) {
        return _asyncMap(eachOfSeries$1, coll, iteratee, callback);
    }, 3), applyEachSeries = applyEach(mapSeries$1);
    const PROMISE_SYMBOL = Symbol("promiseCallback");
    function promiseCallback() {
        let resolve, reject;
        function callback(err, ...args) {
            if (err) return reject(err);
            resolve(args.length > 1 ? args : args[0]);
        }
        return callback[PROMISE_SYMBOL] = new Promise((res, rej) => {
            resolve = res, reject = rej;
        }), callback;
    }
    function auto(tasks, concurrency, callback) {
        "number" != typeof concurrency && (callback = concurrency, concurrency = null), 
        callback = once(callback || promiseCallback());
        var numTasks = Object.keys(tasks).length;
        if (!numTasks) return callback(null);
        concurrency || (concurrency = numTasks);
        var results = {}, runningTasks = 0, canceled = !1, hasError = !1, listeners = Object.create(null), readyTasks = [], readyToCheck = [], uncheckedDependencies = {};
        function enqueueTask(key, task) {
            readyTasks.push(() => (function(key, task) {
                if (hasError) return;
                var taskCallback = onlyOnce((err, ...result) => {
                    if (runningTasks--, !1 !== err) if (result.length < 2 && ([result] = result), err) {
                        var safeResults = {};
                        if (Object.keys(results).forEach(rkey => {
                            safeResults[rkey] = results[rkey];
                        }), safeResults[key] = result, hasError = !0, listeners = Object.create(null), canceled) return;
                        callback(err, safeResults);
                    } else results[key] = result, function(taskName) {
                        (listeners[taskName] || []).forEach(fn => fn()), processQueue();
                    }(key); else canceled = !0;
                });
                runningTasks++;
                var taskFn = wrapAsync(task[task.length - 1]);
                task.length > 1 ? taskFn(results, taskCallback) : taskFn(taskCallback);
            })(key, task));
        }
        function processQueue() {
            if (!canceled) {
                if (0 === readyTasks.length && 0 === runningTasks) return callback(null, results);
                for (;readyTasks.length && runningTasks < concurrency; ) {
                    readyTasks.shift()();
                }
            }
        }
        function getDependents(taskName) {
            var result = [];
            return Object.keys(tasks).forEach(key => {
                const task = tasks[key];
                Array.isArray(task) && task.indexOf(taskName) >= 0 && result.push(key);
            }), result;
        }
        return Object.keys(tasks).forEach(key => {
            var task = tasks[key];
            if (!Array.isArray(task)) return enqueueTask(key, [ task ]), void readyToCheck.push(key);
            var dependencies = task.slice(0, task.length - 1), remainingDependencies = dependencies.length;
            if (0 === remainingDependencies) return enqueueTask(key, task), void readyToCheck.push(key);
            uncheckedDependencies[key] = remainingDependencies, dependencies.forEach(dependencyName => {
                if (!tasks[dependencyName]) throw new Error("async.auto task `" + key + "` has a non-existent dependency `" + dependencyName + "` in " + dependencies.join(", "));
                !function(taskName, fn) {
                    var taskListeners = listeners[taskName];
                    taskListeners || (taskListeners = listeners[taskName] = []);
                    taskListeners.push(fn);
                }(dependencyName, () => {
                    0 === --remainingDependencies && enqueueTask(key, task);
                });
            });
        }), function() {
            var currentTask, counter = 0;
            for (;readyToCheck.length; ) currentTask = readyToCheck.pop(), counter++, getDependents(currentTask).forEach(dependent => {
                0 == --uncheckedDependencies[dependent] && readyToCheck.push(dependent);
            });
            if (counter !== numTasks) throw new Error("async.auto cannot execute tasks due to a recursive dependency");
        }(), processQueue(), callback[PROMISE_SYMBOL];
    }
    var FN_ARGS = /^(?:async\s+)?(?:function)?\s*\w*\s*\(\s*([^)]+)\s*\)(?:\s*{)/, ARROW_FN_ARGS = /^(?:async\s+)?\(?\s*([^)=]+)\s*\)?(?:\s*=>)/, FN_ARG_SPLIT = /,/, FN_ARG = /(=.+)?(\s*)$/, STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
    class DLL {
        constructor() {
            this.length = 0, this.head = this.tail = null, this.length = 0;
        }
        removeLink(node) {
            return node.prev ? node.prev.next = node.next : this.head = node.next, node.next ? node.next.prev = node.prev : this.tail = node.prev, 
            node.prev = node.next = null, this.length -= 1, node;
        }
        empty() {
            for (;this.head; ) this.shift();
            return this;
        }
        insertAfter(node, newNode) {
            newNode.prev = node, newNode.next = node.next, node.next ? node.next.prev = newNode : this.tail = newNode, 
            node.next = newNode, this.length += 1;
        }
        insertBefore(node, newNode) {
            newNode.prev = node.prev, newNode.next = node, node.prev ? node.prev.next = newNode : this.head = newNode, 
            node.prev = newNode, this.length += 1;
        }
        unshift(node) {
            this.head ? this.insertBefore(this.head, node) : setInitial(this, node);
        }
        push(node) {
            this.tail ? this.insertAfter(this.tail, node) : setInitial(this, node);
        }
        shift() {
            return this.head && this.removeLink(this.head);
        }
        pop() {
            return this.tail && this.removeLink(this.tail);
        }
        toArray() {
            return [ ...this ];
        }
        * [Symbol.iterator]() {
            for (var cur = this.head; cur; ) yield cur.data, cur = cur.next;
        }
        remove(testFn) {
            for (var curr = this.head; curr; ) {
                var {next: next} = curr;
                testFn(curr) && this.removeLink(curr), curr = next;
            }
            return this;
        }
    }
    function setInitial(dll, node) {
        dll.length = 1, dll.head = dll.tail = node;
    }
    function queue(worker, concurrency, payload) {
        if (null == concurrency) concurrency = 1; else if (0 === concurrency) throw new RangeError("Concurrency must not be zero");
        var _worker = wrapAsync(worker), numRunning = 0, workersList = [];
        const events = {
            error: [],
            drain: [],
            saturated: [],
            unsaturated: [],
            empty: []
        };
        function off(event, handler) {
            return event ? handler ? void (events[event] = events[event].filter(ev => ev !== handler)) : events[event] = [] : Object.keys(events).forEach(ev => events[ev] = []);
        }
        function trigger(event, ...args) {
            events[event].forEach(handler => handler(...args));
        }
        var processingScheduled = !1;
        function _insert(data, insertAtFront, rejectOnError, callback) {
            if (null != callback && "function" != typeof callback) throw new Error("task callback must be a function");
            var res, rej;
            function promiseCallback(err, ...args) {
                return err ? rejectOnError ? rej(err) : res() : args.length <= 1 ? res(args[0]) : void res(args);
            }
            q.started = !0;
            var item = {
                data: data,
                callback: rejectOnError ? promiseCallback : callback || promiseCallback
            };
            if (insertAtFront ? q._tasks.unshift(item) : q._tasks.push(item), processingScheduled || (processingScheduled = !0, 
            setImmediate$1(() => {
                processingScheduled = !1, q.process();
            })), rejectOnError || !callback) return new Promise((resolve, reject) => {
                res = resolve, rej = reject;
            });
        }
        function _createCB(tasks) {
            return function(err, ...args) {
                numRunning -= 1;
                for (var i = 0, l = tasks.length; i < l; i++) {
                    var task = tasks[i], index = workersList.indexOf(task);
                    0 === index ? workersList.shift() : index > 0 && workersList.splice(index, 1), task.callback(err, ...args), 
                    null != err && trigger("error", err, task.data);
                }
                numRunning <= q.concurrency - q.buffer && trigger("unsaturated"), q.idle() && trigger("drain"), 
                q.process();
            };
        }
        function _maybeDrain(data) {
            return !(0 !== data.length || !q.idle()) && (setImmediate$1(() => trigger("drain")), 
            !0);
        }
        const eventMethod = name => handler => {
            if (!handler) return new Promise((resolve, reject) => {
                !function(event, handler) {
                    const handleAndRemove = (...args) => {
                        off(event, handleAndRemove), handler(...args);
                    };
                    events[event].push(handleAndRemove);
                }(name, (err, data) => {
                    if (err) return reject(err);
                    resolve(data);
                });
            });
            off(name), function(event, handler) {
                events[event].push(handler);
            }(name, handler);
        };
        var isProcessing = !1, q = {
            _tasks: new DLL(),
            * [Symbol.iterator]() {
                yield* q._tasks[Symbol.iterator]();
            },
            concurrency: concurrency,
            payload: payload,
            buffer: concurrency / 4,
            started: !1,
            paused: !1,
            push(data, callback) {
                if (Array.isArray(data)) {
                    if (_maybeDrain(data)) return;
                    return data.map(datum => _insert(datum, !1, !1, callback));
                }
                return _insert(data, !1, !1, callback);
            },
            pushAsync(data, callback) {
                if (Array.isArray(data)) {
                    if (_maybeDrain(data)) return;
                    return data.map(datum => _insert(datum, !1, !0, callback));
                }
                return _insert(data, !1, !0, callback);
            },
            kill() {
                off(), q._tasks.empty();
            },
            unshift(data, callback) {
                if (Array.isArray(data)) {
                    if (_maybeDrain(data)) return;
                    return data.map(datum => _insert(datum, !0, !1, callback));
                }
                return _insert(data, !0, !1, callback);
            },
            unshiftAsync(data, callback) {
                if (Array.isArray(data)) {
                    if (_maybeDrain(data)) return;
                    return data.map(datum => _insert(datum, !0, !0, callback));
                }
                return _insert(data, !0, !0, callback);
            },
            remove(testFn) {
                q._tasks.remove(testFn);
            },
            process() {
                if (!isProcessing) {
                    for (isProcessing = !0; !q.paused && numRunning < q.concurrency && q._tasks.length; ) {
                        var tasks = [], data = [], l = q._tasks.length;
                        q.payload && (l = Math.min(l, q.payload));
                        for (var i = 0; i < l; i++) {
                            var node = q._tasks.shift();
                            tasks.push(node), workersList.push(node), data.push(node.data);
                        }
                        numRunning += 1, 0 === q._tasks.length && trigger("empty"), numRunning === q.concurrency && trigger("saturated");
                        var cb = onlyOnce(_createCB(tasks));
                        _worker(data, cb);
                    }
                    isProcessing = !1;
                }
            },
            length: () => q._tasks.length,
            running: () => numRunning,
            workersList: () => workersList,
            idle: () => q._tasks.length + numRunning === 0,
            pause() {
                q.paused = !0;
            },
            resume() {
                !1 !== q.paused && (q.paused = !1, setImmediate$1(q.process));
            }
        };
        return Object.defineProperties(q, {
            saturated: {
                writable: !1,
                value: eventMethod("saturated")
            },
            unsaturated: {
                writable: !1,
                value: eventMethod("unsaturated")
            },
            empty: {
                writable: !1,
                value: eventMethod("empty")
            },
            drain: {
                writable: !1,
                value: eventMethod("drain")
            },
            error: {
                writable: !1,
                value: eventMethod("error")
            }
        }), q;
    }
    var reduce$1 = awaitify(function(coll, memo, iteratee, callback) {
        callback = once(callback);
        var _iteratee = wrapAsync(iteratee);
        return eachOfSeries$1(coll, (x, i, iterCb) => {
            _iteratee(memo, x, (err, v) => {
                memo = v, iterCb(err);
            });
        }, err => callback(err, memo));
    }, 4);
    function seq(...functions) {
        var _functions = functions.map(wrapAsync);
        return function(...args) {
            var that = this, cb = args[args.length - 1];
            return "function" == typeof cb ? args.pop() : cb = promiseCallback(), reduce$1(_functions, args, (newargs, fn, iterCb) => {
                fn.apply(that, newargs.concat((err, ...nextargs) => {
                    iterCb(err, nextargs);
                }));
            }, (err, results) => cb(err, ...results)), cb[PROMISE_SYMBOL];
        };
    }
    var mapLimit$1 = awaitify(function(coll, limit, iteratee, callback) {
        return _asyncMap(eachOfLimit(limit), coll, iteratee, callback);
    }, 4);
    var concatLimit$1 = awaitify(function(coll, limit, iteratee, callback) {
        var _iteratee = wrapAsync(iteratee);
        return mapLimit$1(coll, limit, (val, iterCb) => {
            _iteratee(val, (err, ...args) => err ? iterCb(err) : iterCb(err, args));
        }, (err, mapResults) => {
            for (var result = [], i = 0; i < mapResults.length; i++) mapResults[i] && (result = result.concat(...mapResults[i]));
            return callback(err, result);
        });
    }, 4);
    var concat$1 = awaitify(function(coll, iteratee, callback) {
        return concatLimit$1(coll, 1 / 0, iteratee, callback);
    }, 3);
    var concatSeries$1 = awaitify(function(coll, iteratee, callback) {
        return concatLimit$1(coll, 1, iteratee, callback);
    }, 3);
    function _createTester(check, getResult) {
        return (eachfn, arr, _iteratee, cb) => {
            var testResult, testPassed = !1;
            const iteratee = wrapAsync(_iteratee);
            eachfn(arr, (value, _, callback) => {
                iteratee(value, (err, result) => err || !1 === err ? callback(err) : check(result) && !testResult ? (testPassed = !0, 
                testResult = getResult(!0, value), callback(null, breakLoop)) : void callback());
            }, err => {
                if (err) return cb(err);
                cb(null, testPassed ? testResult : getResult(!1));
            });
        };
    }
    var detect$1 = awaitify(function(coll, iteratee, callback) {
        return _createTester(bool => bool, (res, item) => item)(eachOf$1, coll, iteratee, callback);
    }, 3);
    var detectLimit$1 = awaitify(function(coll, limit, iteratee, callback) {
        return _createTester(bool => bool, (res, item) => item)(eachOfLimit(limit), coll, iteratee, callback);
    }, 4);
    var detectSeries$1 = awaitify(function(coll, iteratee, callback) {
        return _createTester(bool => bool, (res, item) => item)(eachOfLimit(1), coll, iteratee, callback);
    }, 3);
    function consoleFunc(name) {
        return (fn, ...args) => wrapAsync(fn)(...args, (err, ...resultArgs) => {
            "object" == typeof console && (err ? console.error && console.error(err) : console[name] && resultArgs.forEach(x => console[name](x)));
        });
    }
    var dir = consoleFunc("dir");
    var doWhilst$1 = awaitify(function(iteratee, test, callback) {
        callback = onlyOnce(callback);
        var results, _fn = wrapAsync(iteratee), _test = wrapAsync(test);
        function next(err, ...args) {
            if (err) return callback(err);
            !1 !== err && (results = args, _test(...args, check));
        }
        function check(err, truth) {
            return err ? callback(err) : !1 !== err ? truth ? void _fn(next) : callback(null, ...results) : void 0;
        }
        return check(null, !0);
    }, 3);
    function _withoutIndex(iteratee) {
        return (value, index, callback) => iteratee(value, callback);
    }
    var each = awaitify(function(coll, iteratee, callback) {
        return eachOf$1(coll, _withoutIndex(wrapAsync(iteratee)), callback);
    }, 3);
    var eachLimit$2 = awaitify(function(coll, limit, iteratee, callback) {
        return eachOfLimit(limit)(coll, _withoutIndex(wrapAsync(iteratee)), callback);
    }, 4);
    var eachSeries$1 = awaitify(function(coll, iteratee, callback) {
        return eachLimit$2(coll, 1, iteratee, callback);
    }, 3);
    function ensureAsync(fn) {
        return isAsync(fn) ? fn : function(...args) {
            var callback = args.pop(), sync = !0;
            args.push((...innerArgs) => {
                sync ? setImmediate$1(() => callback(...innerArgs)) : callback(...innerArgs);
            }), fn.apply(this, args), sync = !1;
        };
    }
    var every$1 = awaitify(function(coll, iteratee, callback) {
        return _createTester(bool => !bool, res => !res)(eachOf$1, coll, iteratee, callback);
    }, 3);
    var everyLimit$1 = awaitify(function(coll, limit, iteratee, callback) {
        return _createTester(bool => !bool, res => !res)(eachOfLimit(limit), coll, iteratee, callback);
    }, 4);
    var everySeries$1 = awaitify(function(coll, iteratee, callback) {
        return _createTester(bool => !bool, res => !res)(eachOfSeries$1, coll, iteratee, callback);
    }, 3);
    function filterArray(eachfn, arr, iteratee, callback) {
        var truthValues = new Array(arr.length);
        eachfn(arr, (x, index, iterCb) => {
            iteratee(x, (err, v) => {
                truthValues[index] = !!v, iterCb(err);
            });
        }, err => {
            if (err) return callback(err);
            for (var results = [], i = 0; i < arr.length; i++) truthValues[i] && results.push(arr[i]);
            callback(null, results);
        });
    }
    function filterGeneric(eachfn, coll, iteratee, callback) {
        var results = [];
        eachfn(coll, (x, index, iterCb) => {
            iteratee(x, (err, v) => {
                if (err) return iterCb(err);
                v && results.push({
                    index: index,
                    value: x
                }), iterCb(err);
            });
        }, err => {
            if (err) return callback(err);
            callback(null, results.sort((a, b) => a.index - b.index).map(v => v.value));
        });
    }
    function _filter(eachfn, coll, iteratee, callback) {
        return (isArrayLike(coll) ? filterArray : filterGeneric)(eachfn, coll, wrapAsync(iteratee), callback);
    }
    var filter$1 = awaitify(function(coll, iteratee, callback) {
        return _filter(eachOf$1, coll, iteratee, callback);
    }, 3);
    var filterLimit$1 = awaitify(function(coll, limit, iteratee, callback) {
        return _filter(eachOfLimit(limit), coll, iteratee, callback);
    }, 4);
    var filterSeries$1 = awaitify(function(coll, iteratee, callback) {
        return _filter(eachOfSeries$1, coll, iteratee, callback);
    }, 3);
    var forever$1 = awaitify(function(fn, errback) {
        var done = onlyOnce(errback), task = wrapAsync(ensureAsync(fn));
        return function next(err) {
            if (err) return done(err);
            !1 !== err && task(next);
        }();
    }, 2);
    var groupByLimit$1 = awaitify(function(coll, limit, iteratee, callback) {
        var _iteratee = wrapAsync(iteratee);
        return mapLimit$1(coll, limit, (val, iterCb) => {
            _iteratee(val, (err, key) => err ? iterCb(err) : iterCb(err, {
                key: key,
                val: val
            }));
        }, (err, mapResults) => {
            for (var result = {}, {hasOwnProperty: hasOwnProperty} = Object.prototype, i = 0; i < mapResults.length; i++) if (mapResults[i]) {
                var {key: key} = mapResults[i], {val: val} = mapResults[i];
                hasOwnProperty.call(result, key) ? result[key].push(val) : result[key] = [ val ];
            }
            return callback(err, result);
        });
    }, 4);
    var log = consoleFunc("log");
    var mapValuesLimit$1 = awaitify(function(obj, limit, iteratee, callback) {
        callback = once(callback);
        var newObj = {}, _iteratee = wrapAsync(iteratee);
        return eachOfLimit(limit)(obj, (val, key, next) => {
            _iteratee(val, key, (err, result) => {
                if (err) return next(err);
                newObj[key] = result, next(err);
            });
        }, err => callback(err, newObj));
    }, 4);
    var nextTick = wrap(hasNextTick ? process.nextTick : hasSetImmediate ? setImmediate : fallback), _parallel = awaitify((eachfn, tasks, callback) => {
        var results = isArrayLike(tasks) ? [] : {};
        eachfn(tasks, (task, key, taskCb) => {
            wrapAsync(task)((err, ...result) => {
                result.length < 2 && ([result] = result), results[key] = result, taskCb(err);
            });
        }, err => callback(err, results));
    }, 3);
    function queue$1(worker, concurrency) {
        var _worker = wrapAsync(worker);
        return queue((items, cb) => {
            _worker(items[0], cb);
        }, concurrency, 1);
    }
    class Heap {
        constructor() {
            this.heap = [], this.pushCount = Number.MIN_SAFE_INTEGER;
        }
        get length() {
            return this.heap.length;
        }
        empty() {
            return this.heap = [], this;
        }
        percUp(index) {
            let p;
            for (;index > 0 && smaller(this.heap[index], this.heap[p = parent(index)]); ) {
                let t = this.heap[index];
                this.heap[index] = this.heap[p], this.heap[p] = t, index = p;
            }
        }
        percDown(index) {
            let l;
            for (;(l = 1 + (index << 1)) < this.heap.length && (l + 1 < this.heap.length && smaller(this.heap[l + 1], this.heap[l]) && (l += 1), 
            !smaller(this.heap[index], this.heap[l])); ) {
                let t = this.heap[index];
                this.heap[index] = this.heap[l], this.heap[l] = t, index = l;
            }
        }
        push(node) {
            node.pushCount = ++this.pushCount, this.heap.push(node), this.percUp(this.heap.length - 1);
        }
        unshift(node) {
            return this.heap.push(node);
        }
        shift() {
            let [top] = this.heap;
            return this.heap[0] = this.heap[this.heap.length - 1], this.heap.pop(), this.percDown(0), 
            top;
        }
        toArray() {
            return [ ...this ];
        }
        * [Symbol.iterator]() {
            for (let i = 0; i < this.heap.length; i++) yield this.heap[i].data;
        }
        remove(testFn) {
            let j = 0;
            for (let i = 0; i < this.heap.length; i++) testFn(this.heap[i]) || (this.heap[j] = this.heap[i], 
            j++);
            this.heap.splice(j);
            for (let i = parent(this.heap.length - 1); i >= 0; i--) this.percDown(i);
            return this;
        }
    }
    function parent(i) {
        return (i + 1 >> 1) - 1;
    }
    function smaller(x, y) {
        return x.priority !== y.priority ? x.priority < y.priority : x.pushCount < y.pushCount;
    }
    var race$1 = awaitify(function(tasks, callback) {
        if (callback = once(callback), !Array.isArray(tasks)) return callback(new TypeError("First argument to race must be an array of functions"));
        if (!tasks.length) return callback();
        for (var i = 0, l = tasks.length; i < l; i++) wrapAsync(tasks[i])(callback);
    }, 2);
    function reduceRight(array, memo, iteratee, callback) {
        var reversed = [ ...array ].reverse();
        return reduce$1(reversed, memo, iteratee, callback);
    }
    function reflect(fn) {
        var _fn = wrapAsync(fn);
        return initialParams(function(args, reflectCallback) {
            return args.push((error, ...cbArgs) => {
                let retVal = {};
                if (error && (retVal.error = error), cbArgs.length > 0) {
                    var value = cbArgs;
                    cbArgs.length <= 1 && ([value] = cbArgs), retVal.value = value;
                }
                reflectCallback(null, retVal);
            }), _fn.apply(this, args);
        });
    }
    function reject(eachfn, arr, _iteratee, callback) {
        const iteratee = wrapAsync(_iteratee);
        return _filter(eachfn, arr, (value, cb) => {
            iteratee(value, (err, v) => {
                cb(err, !v);
            });
        }, callback);
    }
    var reject$2 = awaitify(function(coll, iteratee, callback) {
        return reject(eachOf$1, coll, iteratee, callback);
    }, 3);
    var rejectLimit$1 = awaitify(function(coll, limit, iteratee, callback) {
        return reject(eachOfLimit(limit), coll, iteratee, callback);
    }, 4);
    var rejectSeries$1 = awaitify(function(coll, iteratee, callback) {
        return reject(eachOfSeries$1, coll, iteratee, callback);
    }, 3);
    function constant$1(value) {
        return function() {
            return value;
        };
    }
    const DEFAULT_TIMES = 5, DEFAULT_INTERVAL = 0;
    function retry(opts, task, callback) {
        var options = {
            times: DEFAULT_TIMES,
            intervalFunc: constant$1(DEFAULT_INTERVAL)
        };
        if (arguments.length < 3 && "function" == typeof opts ? (callback = task || promiseCallback(), 
        task = opts) : (!function(acc, t) {
            if ("object" == typeof t) acc.times = +t.times || DEFAULT_TIMES, acc.intervalFunc = "function" == typeof t.interval ? t.interval : constant$1(+t.interval || DEFAULT_INTERVAL), 
            acc.errorFilter = t.errorFilter; else {
                if ("number" != typeof t && "string" != typeof t) throw new Error("Invalid arguments for async.retry");
                acc.times = +t || DEFAULT_TIMES;
            }
        }(options, opts), callback = callback || promiseCallback()), "function" != typeof task) throw new Error("Invalid arguments for async.retry");
        var _task = wrapAsync(task), attempt = 1;
        return function retryAttempt() {
            _task((err, ...args) => {
                !1 !== err && (err && attempt++ < options.times && ("function" != typeof options.errorFilter || options.errorFilter(err)) ? setTimeout(retryAttempt, options.intervalFunc(attempt - 1)) : callback(err, ...args));
            });
        }(), callback[PROMISE_SYMBOL];
    }
    var some$1 = awaitify(function(coll, iteratee, callback) {
        return _createTester(Boolean, res => res)(eachOf$1, coll, iteratee, callback);
    }, 3);
    var someLimit$1 = awaitify(function(coll, limit, iteratee, callback) {
        return _createTester(Boolean, res => res)(eachOfLimit(limit), coll, iteratee, callback);
    }, 4);
    var someSeries$1 = awaitify(function(coll, iteratee, callback) {
        return _createTester(Boolean, res => res)(eachOfSeries$1, coll, iteratee, callback);
    }, 3);
    var sortBy$1 = awaitify(function(coll, iteratee, callback) {
        var _iteratee = wrapAsync(iteratee);
        return map$1(coll, (x, iterCb) => {
            _iteratee(x, (err, criteria) => {
                if (err) return iterCb(err);
                iterCb(err, {
                    value: x,
                    criteria: criteria
                });
            });
        }, (err, results) => {
            if (err) return callback(err);
            callback(null, results.sort(comparator).map(v => v.value));
        });
        function comparator(left, right) {
            var a = left.criteria, b = right.criteria;
            return a < b ? -1 : a > b ? 1 : 0;
        }
    }, 3);
    function timesLimit(count, limit, iteratee, callback) {
        var _iteratee = wrapAsync(iteratee);
        return mapLimit$1(function(size) {
            for (var result = Array(size); size--; ) result[size] = size;
            return result;
        }(count), limit, _iteratee, callback);
    }
    var tryEach$1 = awaitify(function(tasks, callback) {
        var result, error = null;
        return eachSeries$1(tasks, (task, taskCb) => {
            wrapAsync(task)((err, ...args) => {
                if (!1 === err) return taskCb(err);
                args.length < 2 ? [result] = args : result = args, error = err, taskCb(err ? null : {});
            });
        }, () => callback(error, result));
    });
    var whilst$1 = awaitify(function(test, iteratee, callback) {
        callback = onlyOnce(callback);
        var _fn = wrapAsync(iteratee), _test = wrapAsync(test), results = [];
        function next(err, ...rest) {
            if (err) return callback(err);
            results = rest, !1 !== err && _test(check);
        }
        function check(err, truth) {
            return err ? callback(err) : !1 !== err ? truth ? void _fn(next) : callback(null, ...results) : void 0;
        }
        return _test(check);
    }, 3);
    var waterfall$1 = awaitify(function(tasks, callback) {
        if (callback = once(callback), !Array.isArray(tasks)) return callback(new Error("First argument to waterfall must be an array of functions"));
        if (!tasks.length) return callback();
        var taskIndex = 0;
        function nextTask(args) {
            wrapAsync(tasks[taskIndex++])(...args, onlyOnce(next));
        }
        function next(err, ...args) {
            if (!1 !== err) return err || taskIndex === tasks.length ? callback(err, ...args) : void nextTask(args);
        }
        nextTask([]);
    });
    let async = {
        apply: function(fn, ...args) {
            return (...callArgs) => fn(...args, ...callArgs);
        },
        applyEach: applyEach$1,
        applyEachSeries: applyEachSeries,
        asyncify: asyncify,
        auto: auto,
        autoInject: function(tasks, callback) {
            var newTasks = {};
            return Object.keys(tasks).forEach(key => {
                var params, taskFn = tasks[key], fnIsAsync = isAsync(taskFn), hasNoDeps = !fnIsAsync && 1 === taskFn.length || fnIsAsync && 0 === taskFn.length;
                if (Array.isArray(taskFn)) params = [ ...taskFn ], taskFn = params.pop(), newTasks[key] = params.concat(params.length > 0 ? newTask : taskFn); else if (hasNoDeps) newTasks[key] = taskFn; else {
                    if (params = function(func) {
                        const src = func.toString().replace(STRIP_COMMENTS, "");
                        let match = src.match(FN_ARGS);
                        if (match || (match = src.match(ARROW_FN_ARGS)), !match) throw new Error("could not parse args in autoInject\nSource:\n" + src);
                        let [, args] = match;
                        return args.replace(/\s/g, "").split(FN_ARG_SPLIT).map(arg => arg.replace(FN_ARG, "").trim());
                    }(taskFn), 0 === taskFn.length && !fnIsAsync && 0 === params.length) throw new Error("autoInject task functions require explicit parameters.");
                    fnIsAsync || params.pop(), newTasks[key] = params.concat(newTask);
                }
                function newTask(results, taskCb) {
                    var newArgs = params.map(name => results[name]);
                    newArgs.push(taskCb), wrapAsync(taskFn)(...newArgs);
                }
            }), auto(newTasks, callback);
        },
        cargo: function(worker, payload) {
            return queue(worker, 1, payload);
        },
        cargoQueue: function(worker, concurrency, payload) {
            return queue(worker, concurrency, payload);
        },
        compose: function(...args) {
            return seq(...args.reverse());
        },
        concat: concat$1,
        concatLimit: concatLimit$1,
        concatSeries: concatSeries$1,
        constant: function(...args) {
            return function(...ignoredArgs) {
                return ignoredArgs.pop()(null, ...args);
            };
        },
        detect: detect$1,
        detectLimit: detectLimit$1,
        detectSeries: detectSeries$1,
        dir: dir,
        doUntil: function(iteratee, test, callback) {
            const _test = wrapAsync(test);
            return doWhilst$1(iteratee, (...args) => {
                const cb = args.pop();
                _test(...args, (err, truth) => cb(err, !truth));
            }, callback);
        },
        doWhilst: doWhilst$1,
        each: each,
        eachLimit: eachLimit$2,
        eachOf: eachOf$1,
        eachOfLimit: eachOfLimit$2,
        eachOfSeries: eachOfSeries$1,
        eachSeries: eachSeries$1,
        ensureAsync: ensureAsync,
        every: every$1,
        everyLimit: everyLimit$1,
        everySeries: everySeries$1,
        filter: filter$1,
        filterLimit: filterLimit$1,
        filterSeries: filterSeries$1,
        forever: forever$1,
        groupBy: function(coll, iteratee, callback) {
            return groupByLimit$1(coll, 1 / 0, iteratee, callback);
        },
        groupByLimit: groupByLimit$1,
        groupBySeries: function(coll, iteratee, callback) {
            return groupByLimit$1(coll, 1, iteratee, callback);
        },
        log: log,
        map: map$1,
        mapLimit: mapLimit$1,
        mapSeries: mapSeries$1,
        mapValues: function(obj, iteratee, callback) {
            return mapValuesLimit$1(obj, 1 / 0, iteratee, callback);
        },
        mapValuesLimit: mapValuesLimit$1,
        mapValuesSeries: function(obj, iteratee, callback) {
            return mapValuesLimit$1(obj, 1, iteratee, callback);
        },
        memoize: function(fn, hasher = (v => v)) {
            var memo = Object.create(null), queues = Object.create(null), _fn = wrapAsync(fn), memoized = initialParams((args, callback) => {
                var key = hasher(...args);
                key in memo ? setImmediate$1(() => callback(null, ...memo[key])) : key in queues ? queues[key].push(callback) : (queues[key] = [ callback ], 
                _fn(...args, (err, ...resultArgs) => {
                    err || (memo[key] = resultArgs);
                    var q = queues[key];
                    delete queues[key];
                    for (var i = 0, l = q.length; i < l; i++) q[i](err, ...resultArgs);
                }));
            });
            return memoized.memo = memo, memoized.unmemoized = fn, memoized;
        },
        nextTick: nextTick,
        parallel: function(tasks, callback) {
            return _parallel(eachOf$1, tasks, callback);
        },
        parallelLimit: function(tasks, limit, callback) {
            return _parallel(eachOfLimit(limit), tasks, callback);
        },
        priorityQueue: function(worker, concurrency) {
            var q = queue$1(worker, concurrency);
            return q._tasks = new Heap(), q.push = function(data, priority = 0, callback = (() => {})) {
                if ("function" != typeof callback) throw new Error("task callback must be a function");
                if (q.started = !0, Array.isArray(data) || (data = [ data ]), 0 === data.length && q.idle()) return setImmediate$1(() => q.drain());
                for (var i = 0, l = data.length; i < l; i++) {
                    var item = {
                        data: data[i],
                        priority: priority,
                        callback: callback
                    };
                    q._tasks.push(item);
                }
                setImmediate$1(q.process);
            }, delete q.unshift, q;
        },
        queue: queue$1,
        race: race$1,
        reduce: reduce$1,
        reduceRight: reduceRight,
        reflect: reflect,
        reflectAll: function(tasks) {
            var results;
            return Array.isArray(tasks) ? results = tasks.map(reflect) : (results = {}, Object.keys(tasks).forEach(key => {
                results[key] = reflect.call(this, tasks[key]);
            })), results;
        },
        reject: reject$2,
        rejectLimit: rejectLimit$1,
        rejectSeries: rejectSeries$1,
        retry: retry,
        retryable: function(opts, task) {
            task || (task = opts, opts = null);
            let arity = opts && opts.arity || task.length;
            isAsync(task) && (arity += 1);
            var _task = wrapAsync(task);
            return initialParams((args, callback) => {
                function taskFn(cb) {
                    _task(...args, cb);
                }
                return (args.length < arity - 1 || null == callback) && (args.push(callback), callback = promiseCallback()), 
                opts ? retry(opts, taskFn, callback) : retry(taskFn, callback), callback[PROMISE_SYMBOL];
            });
        },
        seq: seq,
        series: function(tasks, callback) {
            return _parallel(eachOfSeries$1, tasks, callback);
        },
        setImmediate: setImmediate$1,
        some: some$1,
        someLimit: someLimit$1,
        someSeries: someSeries$1,
        sortBy: sortBy$1,
        timeout: function(asyncFn, milliseconds, info) {
            var fn = wrapAsync(asyncFn);
            return initialParams((args, callback) => {
                var timer, timedOut = !1;
                args.push((...cbArgs) => {
                    timedOut || (callback(...cbArgs), clearTimeout(timer));
                }), timer = setTimeout(function() {
                    var name = asyncFn.name || "anonymous", error = new Error('Callback function "' + name + '" timed out.');
                    error.code = "ETIMEDOUT", info && (error.info = info), timedOut = !0, callback(error);
                }, milliseconds), fn(...args);
            });
        },
        times: function(n, iteratee, callback) {
            return timesLimit(n, 1 / 0, iteratee, callback);
        },
        timesLimit: timesLimit,
        timesSeries: function(n, iteratee, callback) {
            return timesLimit(n, 1, iteratee, callback);
        },
        transform: function(coll, accumulator, iteratee, callback) {
            arguments.length <= 3 && "function" == typeof accumulator && (callback = iteratee, 
            iteratee = accumulator, accumulator = Array.isArray(coll) ? [] : {}), callback = once(callback || promiseCallback());
            var _iteratee = wrapAsync(iteratee);
            return eachOf$1(coll, (v, k, cb) => {
                _iteratee(accumulator, v, k, cb);
            }, err => callback(err, accumulator)), callback[PROMISE_SYMBOL];
        },
        tryEach: tryEach$1,
        unmemoize: function(fn) {
            return (...args) => (fn.unmemoized || fn)(...args);
        },
        until: function(test, iteratee, callback) {
            const _test = wrapAsync(test);
            return whilst$1(cb => _test((err, truth) => cb(err, !truth)), iteratee, callback);
        },
        waterfall: waterfall$1,
        whilst: whilst$1,
        all: every$1,
        allLimit: everyLimit$1,
        allSeries: everySeries$1,
        any: some$1,
        anyLimit: someLimit$1,
        anySeries: someSeries$1,
        find: detect$1,
        findLimit: detectLimit$1,
        findSeries: detectSeries$1,
        flatMap: concat$1,
        flatMapLimit: concatLimit$1,
        flatMapSeries: concatSeries$1,
        forEach: each,
        forEachSeries: eachSeries$1,
        forEachLimit: eachLimit$2,
        forEachOf: eachOf$1,
        forEachOfSeries: eachOfSeries$1,
        forEachOfLimit: eachOfLimit$2,
        inject: reduce$1,
        foldl: reduce$1,
        foldr: reduceRight,
        select: filter$1,
        selectLimit: filterLimit$1,
        selectSeries: filterSeries$1,
        wrapSync: asyncify,
        during: whilst$1,
        doDuring: doWhilst$1
    };
    class PreloadResources {
        static loadAllResources(progressCallback, completedCallback) {
            this._progressCallback = progressCallback, this.loadZhiSheWanAd(), SwitchSettings.loadRemoteSettings(), 
            this.loadSubpackages(() => {
                let fileList = this.prepareFileList();
                this.load2DResources(fileList.files2d, () => {
                    this.load3DResources(fileList.files3d, () => {
                        progressCallback(1, "Complete..."), 
                        // PlatformUtils$1.sendLogEvent("预载完成"), 
                        this._progressCallback = null, 
                        completedCallback();
                    });
                });
            });
        }
        static loadZhiSheWanAd() {
            ZhiSheWanAd.requestBoxData(() => {});
        }
        static loadSubpackages(callback) {
            callback();
        }
        static prepareFileList() {
            this._totalStep = 0, this._currentStep = 0;
            let res = {
                files2d: [],
                files3d: []
            };
            return this.addFileGroups2d(PreloadConfig.fileGroups2d, res.files2d), this.addFileGroups3d(PreloadConfig.fileGroups3d, res.files3d), 
            this._totalStep = res.files2d.length + res.files3d.length, this._totalStep++, res;
        }
        static addFileGroups2d(fileGroups, out) {
            for (let i = 0; i < fileGroups.length; i++) this.addFileGroup2d(fileGroups[i], out);
        }
        static addFileGroup2d(fileGroupDef, out) {
            let {files: files, path: path} = fileGroupDef;
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                if ("string" == typeof file) {
                    let fullPath = path + "/" + file;
                    out.push({
                        url: fullPath
                    });
                } else {
                    let fullPath = path + "/" + file.url;
                    out.push({
                        url: fullPath,
                        type: file.type
                    });
                }
            }
        }
        static addFileGroups3d(fileGroups, out) {
            for (let i = 0; i < fileGroups.length; i++) this.addFileGroup3d(fileGroups[i], out);
        }
        static addFileGroup3d(fileGroupDef, out) {
            let {files: files, path: path} = fileGroupDef;
            for (let i = 0; i < files.length; i++) {
                let fullPath = path + "/" + files[i];
                out.push(fullPath);
            }
        }
        static load2DResources(files2d, callback) {
            files2d.length ? async.eachSeries(files2d, (item, callback) => {
                Laya.loader.load(item.url, Laya.Handler.create(this, () => {
                    this.incStep("Loading UI..."), callback();
                }), null, item.type);
            }, err => {
                // console.log("2D资源预载完成"), 
                // PlatformUtils$1.sendLogEvent("2D资源预载完成"),
                 callback();
            }) : callback();
        }
        static load3DResources(files3d, callback) {
            files3d.length ? async.eachSeries(files3d, (url, callback) => {
                Laya.loader.create(url, Laya.Handler.create(this, () => {
                    // console.log("载入3D资源项成功:", url), 
                    this.incStep("Loading 3D..."), callback();
                }));
            }, err => {
                // console.log("3D资源预载完成"), 
                // PlatformUtils$1.sendLogEvent("3D资源预载完成"),
                 callback();
            }) : callback();
        }
        static incStep(desc = "Loading...") {
            this._currentStep++, this._progressCallback(this._currentStep / this._totalStep, desc);
        }
    }
    PreloadResources._totalStep = 0, PreloadResources._currentStep = 0;
    var LoadingSceneUI = ui.LoadingSceneUI, Handler$c = Laya.Handler;
    const MAIN_SCENE = "MainScene.scene";
    class LoadingScene extends LoadingSceneUI {
        constructor() {
            super(), PlatformUtils$1.sendLogEvent("进入LoadingScene"), this.loadResources();
        }
        onAwake() {
            let yad = this.getChildByName("yad");
            yad.on(Laya.Event.MOUSE_DOWN,this,()=>{
                platform.getInstance().navigate("LOADING","LOGO");
            })
            // this.versionLabel.text = "v" + VERSION,
             PlatformUtils$1.setLoadingProgress(0);
        }
        onEnable() {
            EventManager.registerEvent(CommonEvents.GAME_IS_READY, this.onGameReady, this);
        }
        onDisable() {
            EventManager.releaseAllEvents(this);
        }
        loadResources() {
            PreloadResources.loadAllResources((progress, desc) => {
                PlatformUtils$1.setLoadingProgress(Math.floor(100 * progress)), this.progressBar.value = progress, 
                this.progressLabel.text = desc;
            }, () => {
                this.loadMainScene();
            });
        }
        loadMainScene() {
             Laya.Scene.load(MAIN_SCENE, Handler$c.create(this, view => {
                PlatformUtils$1.loadingComplete(() => {
                    view.open(!1);
                });
            }));
        }
        onGameReady() {
            this.destroy(!0), PlatformUtils$1.sendLogEvent("GameReady");
        }
    }
    let _saveLoaderLoadFunc = null, _saveLoaderManagerLoadFunc = null, _saveLoaderManagerCreateFunc = null;
    function hookLoaderManagerLoad(url, complete, progress, type, priority, cache, group, ignoreCache, useWorkerLoader) {
        return url instanceof Array ? _saveLoaderManagerLoadFunc.call(this, url, complete, progress, type, priority, cache, group, ignoreCache, useWorkerLoader) : (url = getRemoteUrl(url), 
        _saveLoaderManagerLoadFunc.call(this, url, complete, progress, type, priority, cache, group, ignoreCache, useWorkerLoader));
    }
    function hookLoaderManagerCreate(url, complete, progress, type, constructParams, propertyParams, priority, cache) {
        return url instanceof Array ? _saveLoaderManagerCreateFunc.call(this, url, complete, progress, type, constructParams, propertyParams, priority, cache) : (url = getRemoteUrl(url), 
        _saveLoaderManagerCreateFunc.call(this, url, complete, progress, type, constructParams, propertyParams, priority, cache));
    }
    function hookLoaderLoad(url, type, cache, group, ignoreCache, useWorkerLoader) {
        return url instanceof Array ? _saveLoaderLoadFunc.call(this, url, type, cache, group, ignoreCache, useWorkerLoader) : (url = getRemoteUrl(url), 
        _saveLoaderLoadFunc.call(this, url, type, cache, group, ignoreCache, useWorkerLoader));
    }
    function getRemoteUrl(url) {
        for (let i = 0; i < REMOTE_LOAD_DIRECTORY.length; i++) if (url.startsWith(REMOTE_LOAD_DIRECTORY[i])) {
            let newUrl = REMOTE_SERVER_ROOT + url;
            return console.log("替换成远程URL:", url, newUrl), newUrl;
        }
        return url;
    }
    forceImportLayaMaxUI();
    new class {
        constructor() {
            UIConfig.closeDialogOnSide = !1, window.Laya3D ? Laya3D.init(GameConfig.width, GameConfig.height, MyConfig3D) : Laya.init(GameConfig.width, GameConfig.height, Laya.WebGL), 
            Laya.Physics && Laya.Physics.enable(), Laya.DebugPanel && Laya.DebugPanel.enable(), 
            Laya.stage.scaleMode  = Laya.Stage.SCALE_SHOWALL, 
            
            Laya.stage.screenMode = GameConfig.screenMode, 
            Laya.stage.alignV = GameConfig.alignV, Laya.stage.alignH ="center", 
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson, 
            Laya.alertGlobalError = !0,
            DepthMaskMaterial.initShader(), 
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            PlatformUtils$1.init(), Laya.loader.retryNum = 3, Laya.loader.retryDelay = 200, 
            _saveLoaderLoadFunc = Laya.Loader.prototype.load, Laya.Loader.prototype.load = hookLoaderLoad, 
            _saveLoaderManagerLoadFunc = Laya.LoaderManager.prototype.load, Laya.LoaderManager.prototype.load = hookLoaderManagerLoad, 
            _saveLoaderManagerCreateFunc = Laya.LoaderManager.prototype.create, Laya.LoaderManager.prototype.create = hookLoaderManagerCreate, 
            SoundManagerState.loadSoundManagerState(), 

             YYGSDK.on(YYG.Event.YYGSDK_INITIALIZED,this,()=>{
                platform.getInstance();
                new LoadingScene().open();
            })
            let o = new YYG.Options();
            o.gamedistributionID = "ad9d2096b8d3482985b0b7d3cc0b92b8";
            o.gameNameId = "Crazy-Kick";
            YYGSDK.__init__(YYG.ChannelType.YAD,o);
        }
    }();
}();