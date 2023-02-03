(function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    });

    function __exportStar(m, o) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var AdPlatformType;
    (function (AdPlatformType) {
        AdPlatformType[AdPlatformType["en_ADBREAK"] = 0] = "en_ADBREAK";
        AdPlatformType[AdPlatformType["en_GAMEDISTRIBUTION"] = 1] = "en_GAMEDISTRIBUTION";
        AdPlatformType[AdPlatformType["en_GAMEMONETIZE"] = 2] = "en_GAMEMONETIZE";
    })(AdPlatformType || (AdPlatformType = {}));

    var ConfigType;
    (function (ConfigType) {
        ConfigType[ConfigType["en_ADPLATFORM"] = 0] = "en_ADPLATFORM";
        ConfigType[ConfigType["en_GAMEDISTRIBUTIONID"] = 1] = "en_GAMEDISTRIBUTIONID";
        ConfigType[ConfigType["en_GAMEMONETIZEID"] = 2] = "en_GAMEMONETIZEID";
    })(ConfigType || (ConfigType = {}));

    class ConfigManager {
        constructor() {
            this.configs = new Map();
        }
        static getInstance() {
            if (!this._gInstance) {
                this._gInstance = new ConfigManager();
            }
            return this._gInstance;
        }
        get(name) {
            return this.configs.get(name);
        }
        set(name, value) {
            this.configs.set(name, value);
        }
    }

    class Entity {
        constructor() {
            ++Entity.ID;
            this._myID = Entity.ID;
        }
        getMyID() {
            return this._myID;
        }
    }
    Entity.ID = 0;

    class StringUtils {
        static format(ofmt, ...a) {
            var regex = [
                '([^%]*)',
                '%',
                '([\'\\-+ #0]*?)',
                '([1-9]\\d*)?',
                '(\\.([1-9]\\d*))?',
                '[lhjztL]*?',
                '([diouxXfFeEgGaAcCsSp%jr])'
            ].join('');
            var re = new RegExp(regex);
            var args = Array.prototype.slice.call(arguments, 1);
            var fmt = ofmt;
            var flags, width, precision, conversion;
            var left, pad, sign, arg, match;
            var ret = '';
            var argn = 1;
            var posn = 0;
            var convposn;
            var curconv;
            while ((match = re.exec(fmt)) !== null) {
                ret += match[1];
                fmt = fmt.substring(match[0].length);
                curconv = match[0].substring(match[1].length);
                convposn = posn + match[1].length + 1;
                posn += match[0].length;
                flags = match[2] || '';
                width = match[3] || 0;
                precision = match[4] || '';
                conversion = match[6];
                left = false;
                sign = false;
                pad = ' ';
                if (conversion == '%') {
                    ret += '%';
                    continue;
                }
                arg = args.shift();
                argn++;
                if (flags.match(/-/))
                    left = true;
                if (flags.match(/0/))
                    pad = '0';
                if (flags.match(/\+/))
                    sign = true;
                switch (conversion) {
                    case 's':
                        ret += this.doPad(pad, width, left, arg.toString());
                        break;
                    case 'd':
                        arg = Math.floor(arg);
                    case 'f':
                        sign = sign && arg > 0 ? '+' : '';
                        ret += sign + this.doPad(pad, width, left, arg.toString());
                        break;
                    case 'x':
                        ret += this.doPad(pad, width, left, arg.toString(16));
                        break;
                    default:
                        throw ("is not supported");
                }
            }
            ret += fmt;
            return (ret);
        }
        static doPad(chr, width, left, str) {
            var ret = str;
            while (ret.length < width) {
                if (left)
                    ret += chr;
                else
                    ret = chr + ret;
            }
            return (ret);
        }
    }

    class LoadingLayer extends Entity {
        constructor() {
            super();
            const body = document.body || document.getElementsByTagName("body")[0];
            const style = document.createElement("style");
            const spriteId = StringUtils.format("LoadingLayer%d", this.getMyID());
            const styleAttribute = `
        .${spriteId}{
            width: 20px;
            height: 24px;
            border: 1px rgba(255,255,255,1) solid;
            border-radius: 0px 0px 5px 5px;
            position: relative;
            margin: 36px auto;
        }
        .${spriteId}:after, .${spriteId}:before{
            position: absolute;
            content: "";
        }
        .${spriteId}:after{
            width: 5px;
            height: 12px;
            border: 1px #fff solid;
            border-left: none;
            border-radius: 0px 20px 20px 0px;
            left: 20px;
        }
        .${spriteId}:before{
            width: 1px;
            height: 6px;
            background-color: rgba(255,255,255,1);
            top: -10px;
            left: 4px;
            box-shadow: 5px 0px 0px 0px rgba(255,255,255,1),
                        5px -5px 0px 0px rgba(255,255,255,1),
                        10px 0px 0px 0px rgba(255,255,255,1);
            -webkit-animation: steam 1s linear infinite alternate;
               -moz-animation: steam 1s linear infinite alternate;
                    animation: steam 1s linear infinite alternate;
        }
        
        @-webkit-keyframes steam{
            0%{height: 0px;}
            100%{height: 6px;}            
        }
        @-moz-keyframes steam{
            0%{height: 0px}
            100%{height: 6px;}            
        }
        @keyframes steam{
            0%{height: 0px}
            100%{height: 6px;}            
        }
        `;
            style.textContent += styleAttribute;
            body.appendChild(style);
            this.background = document.createElement("div");
            this.background.style.position = "fixed";
            this.background.style.zIndex = "0";
            this.background.style.top = "0";
            this.background.style.left = "0";
            this.background.style.width = "100%";
            this.background.style.height = "100%";
            this.background.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            this.sprite = document.createElement("div");
            this.sprite.className = spriteId;
            this.sprite.style.top = "40%";
            this.background.appendChild(this.sprite);
            this.background.style.display = "none";
            body.appendChild(this.background);
        }
        static getInstance() {
            if (!this._gInstance) {
                this._gInstance = new LoadingLayer();
            }
            return this._gInstance;
        }
        showLoading() {
            this.background.style.zIndex = "1000";
            this.background.style.display = "block";
        }
        hideLoading() {
            this.background.style.zIndex = "0";
            this.background.style.display = "none";
        }
    }

    class utilities {
        static showLoading() {
            LoadingLayer.getInstance().showLoading();
        }
        static hideLoading() {
            LoadingLayer.getInstance().hideLoading();
        }
        static areadDataSync(path) {
            return new Promise((resolve, reject) => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", path, true);
                xhr.onerror = xhr.onabort = function (e) { reject(); };
                xhr.onload = function (e) {
                    var status = xhr.status !== undefined ? xhr.status : 200;
                    if (status === 200 || status === 204 || status === 0) {
                        resolve(JSON.parse(xhr.responseText));
                    }
                    else {
                        reject();
                    }
                };
                xhr.send();
            });
        }
    }

    class GamedistributionManager {
        constructor() {
            this.isReward = false;
        }
        static getInstance() {
            if (!this._gInstance) {
                this._gInstance = new GamedistributionManager();
            }
            return this._gInstance;
        }
        startup() {
            return new Promise((resolve, reject) => {
                this.startupComplete = resolve;
                this.startupError = reject;
                window["GD_OPTIONS"] = {
                    gameId: ConfigManager.getInstance().get(ConfigType.en_GAMEDISTRIBUTIONID),
                    onEvent: this.onEvent.bind(this)
                };
                var script = document.createElement("script");
                script.onload = function () { };
                script.onerror = function () {
                    reject();
                };
                script.src = "https://html5.api.gamedistribution.com/main.min.js";
                document.head.appendChild(script);
            });
        }
        onEvent(event) {
            switch (event.name) {
                case "SDK_ERROR":
                    if (this.startupError) {
                        this.startupError();
                        this.startupError = null;
                    }
                    if (this.options && this.options.cancel) {
                        this.options.cancel();
                    }
                    break;
                case "AD_ERROR":
                    if (this.options && this.options.cancel) {
                        this.options.cancel();
                    }
                    utilities.hideLoading();
                    break;
                case "SDK_GAME_START":
                    if (this.isReward) {
                        this.isReward = false;
                        this.preloadReward();
                    }
                    if (this.options && this.options.complete) {
                        this.options.complete();
                        this.options.complete = null;
                    }
                    utilities.hideLoading();
                    break;
                case "SDK_GAME_PAUSE":
                    utilities.hideLoading();
                    break;
                case "LOADED":
                    break;
                case "AD_SDK_FINISHED":
                case "CONTENT_RESUME_REQUESTED":
                    break;
                case "SDK_READY":
                    if (this.startupComplete) {
                        this.startupComplete(true);
                    }
                    this.startupComplete = null;
                    this.preloadReward();
                    break;
                case "AD_SDK_CANCELED":
                    break;
                case "AD_CANCELED":
                case "SKIPPED":
                    utilities.hideLoading();
                    if (this.options) {
                        if (this.options.cancel) {
                            this.options.cancel();
                        }
                        if (this.options.complete) {
                            this.options.complete();
                        }
                        this.options.cancel = null;
                        this.options.complete = null;
                        this.options.rewarded = null;
                    }
                    break;
                case "COMPLETE":
                    if (this.options && this.options.rewarded) {
                        this.options.rewarded();
                        this.options.rewarded = null;
                    }
                    break;
                case "ALL_ADS_COMPLETED":
                    if (this.options && this.options.rewarded) {
                        this.options.rewarded();
                        this.options.rewarded = null;
                    }
                    utilities.hideLoading();
                    break;
                default:
                    break;
            }
        }
        showInterstitial(options) {
            utilities.showLoading();
            this.options = options;
            this.isReward = false;
            window["gdsdk"].showAd();
            return true;
        }
        showReward(options) {
            utilities.showLoading();
            this.options = options;
            this.isReward = true;
            window["gdsdk"].showAd("rewarded");
        }
        preloadReward() {
            setTimeout(function () {
                window["gdsdk"].preloadAd('rewarded').then(function (response) { }).catch(function (error) { });
            }, 0.2e3);
        }
    }

    class GamemonetizeManager {
        constructor() {
            this.isReward = false;
            this.canReward = false;
        }
        static getInstance() {
            if (!this._gInstance) {
                this._gInstance = new GamemonetizeManager();
            }
            return this._gInstance;
        }
        startup() {
            return new Promise((resolve, reject) => {
                this.startupComplete = resolve;
                this.startupError = reject;
                window["SDK_OPTIONS"] = {
                    gameId: ConfigManager.getInstance().get(ConfigType.en_GAMEMONETIZEID),
                    onEvent: this.onEvent.bind(this)
                };
                var script = document.createElement("script");
                script.onload = function () { };
                script.onerror = function () {
                    reject();
                };
                script.src = "https://api.gamemonetize.com/sdk.js";
                document.head.appendChild(script);
            });
        }
        onEvent(event) {
            switch (event.name) {
                case "SDK_ERROR":
                    if (this.startupError) {
                        this.startupError();
                        this.startupError = null;
                    }
                    break;
                case "AD_ERROR":
                    utilities.hideLoading();
                    break;
                case "SDK_GAME_START":
                    if (this.isReward) {
                        if (this.canReward) {
                            if (this.options && this.options.rewarded) {
                                this.options.rewarded();
                                this.options.rewarded = null;
                            }
                        }
                        else {
                            if (this.options && this.options.cancel) {
                                this.options.cancel();
                                this.options.cancel = null;
                            }
                        }
                    }
                    if (this.options && this.options.complete) {
                        this.options.complete();
                        this.options.complete = null;
                    }
                    utilities.hideLoading();
                    break;
                case "SDK_GAME_PAUSE":
                    if (this.isReward) {
                        this.canReward = true;
                    }
                    utilities.hideLoading();
                    break;
                case "LOADED":
                    break;
                case "AD_SDK_FINISHED":
                case "CONTENT_RESUME_REQUESTED":
                    break;
                case "SDK_READY":
                    if (this.startupComplete) {
                        this.startupComplete(true);
                    }
                    this.startupComplete = null;
                    break;
                case "AD_SDK_CANCELED":
                case "AD_CANCELED":
                case "SKIPPED":
                    break;
                case "COMPLETE":
                    break;
                case "AD_SDK_FINISHED":
                    utilities.hideLoading();
                    break;
                default:
                    break;
            }
        }
        showInterstitial(options) {
            utilities.showLoading();
            this.options = options;
            this.isReward = false;
            window["sdk"].showBanner();
            return true;
        }
        showReward(options) {
            utilities.showLoading();
            this.options = options;
            this.isReward = true;
            this.canReward = false;
            window["sdk"].showBanner("rewarded");
        }
    }

    class my {
        constructor() {
            this.version = "1.0.10";
            this.isStartuped = false;
        }
        static create() {
            return new my();
        }

        init(options) {
            return this.startup(options);
        }

        startup(options) {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.isStartuped)
                    return;
                const hostname = location.hostname;
                if (hostname.indexOf("gamedistribution.com".toLowerCase()) > -1) {
                    ConfigManager.getInstance().set(ConfigType.en_GAMEDISTRIBUTIONID, options.gamedistributionId.trim());
                    ConfigManager.getInstance().set(ConfigType.en_ADPLATFORM, AdPlatformType.en_GAMEDISTRIBUTION);
                    yield GamedistributionManager.getInstance().startup();
                }
                else if (hostname.indexOf("gamemonetize.co".toLowerCase()) > -1) {
                    ConfigManager.getInstance().set(ConfigType.en_GAMEMONETIZEID, options.gamemonetizeId.trim());
                    ConfigManager.getInstance().set(ConfigType.en_ADPLATFORM, AdPlatformType.en_GAMEMONETIZE);
                    yield GamemonetizeManager.getInstance().startup();
                }
                if (options.complete) {
                    options.complete();
                    options.complete = null;
                }
                this.isStartuped = true;
                return true;
            });
        }
        getAdPlatformType() {
            return ConfigManager.getInstance().get(ConfigType.en_ADPLATFORM);
        }



        i(cb) {
            let musicVolume, soundVolume;
            if (typeof Laya !== "undefined") {
                musicVolume = Laya.SoundManager.musicVolume;
                soundVolume = Laya.SoundManager.soundVolume;
                Laya.SoundManager.setMusicVolume(0)
                Laya.SoundManager.setSoundVolume(0)

            }
            this.showInterstitial({
                complete: () => {
                    if (typeof Laya !== "undefined") {
                        Laya.SoundManager.setMusicVolume(musicVolume);
                        Laya.SoundManager.setSoundVolume(soundVolume);
                    }
                    cb && cb();
                }
            })
        }

        r(reward, cancel) {
            let musicVolume, soundVolume;
            if (typeof Laya !== "undefined") {
                musicVolume = Laya.SoundManager.musicVolume;
                soundVolume = Laya.SoundManager.soundVolume;
                Laya.SoundManager.setMusicVolume(0)
                Laya.SoundManager.setSoundVolume(0)

            }
            this.showReward({
                rewarded: () => {
                    if (typeof Laya !== "undefined") {
                        Laya.timer.scale = 1;
                        Laya.SoundManager.setMusicVolume(musicVolume);
                        Laya.SoundManager.setSoundVolume(soundVolume);
                    }

                    reward && reward();
                },
                cancel: () => {
                    if (typeof Laya !== "undefined") {
                        Laya.timer.scale = 1;
                        Laya.SoundManager.setMusicVolume(musicVolume);
                        Laya.SoundManager.setSoundVolume(soundVolume);
                    }
                    cancel && cancel();
                }
            })
        }


        showInterstitial(options) {
            return __awaiter(this, void 0, void 0, function* () {
                const en_AdPlatform = ConfigManager.getInstance().get(ConfigType.en_ADPLATFORM);
                switch (en_AdPlatform) {
                    case AdPlatformType.en_GAMEDISTRIBUTION:
                        return GamedistributionManager.getInstance().showInterstitial(options);
                    case AdPlatformType.en_GAMEMONETIZE:
                        return GamemonetizeManager.getInstance().showInterstitial(options);
                    default:
                        options && options.complete && options.complete();
                        break;
                }
                return false;
            });
        }
        showReward(options) {
            return __awaiter(this, void 0, void 0, function* () {
                const en_AdPlatform = ConfigManager.getInstance().get(ConfigType.en_ADPLATFORM);
                switch (en_AdPlatform) {
                    case AdPlatformType.en_GAMEDISTRIBUTION:
                        return GamedistributionManager.getInstance().showReward(options);
                    case AdPlatformType.en_GAMEMONETIZE:
                        return GamemonetizeManager.getInstance().showReward(options);
                    default:
                        options && options.rewarded && options.rewarded();
                        break;
                }
                return false;
            });
        }
    }
    window['my'] = my.create();

}());
1