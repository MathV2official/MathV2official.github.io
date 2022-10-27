var storage = [];
try {
  storage = localStorage;
} catch (e) {}
(function (window) {
  "use strict";
  Number.prototype.map = function (istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((this - istart) / (istop - istart));
  };
  Number.prototype.limit = function (min, max) {
    return Math.min(max, Math.max(min, this));
  };
  Number.prototype.round = function (precision) {
    precision = Math.pow(10, precision || 0);
    return Math.round(this * precision) / precision;
  };
  Number.prototype.floor = function () {
    return Math.floor(this);
  };
  Number.prototype.ceil = function () {
    return Math.ceil(this);
  };
  Number.prototype.toInt = function () {
    return this | 0;
  };
  Number.prototype.toRad = function () {
    return (this / 180) * Math.PI;
  };
  Number.prototype.toDeg = function () {
    return (this * 180) / Math.PI;
  };
  Object.defineProperty(Array.prototype, "erase", {
    value: function (item) {
      for (var i = this.length; i--; ) {
        if (this[i] === item) {
          this.splice(i, 1);
        }
      }
      return this;
    },
  });
  Object.defineProperty(Array.prototype, "random", {
    value: function (item) {
      return this[Math.floor(Math.random() * this.length)];
    },
  });
  Function.prototype.bind =
    Function.prototype.bind ||
    function (oThis) {
      if (typeof this !== "function") {
        throw new TypeError(
          "Function.prototype.bind - what is trying to be bound is not callable"
        );
      }
      var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(
            this instanceof fNOP && oThis ? this : oThis,
            aArgs.concat(Array.prototype.slice.call(arguments))
          );
        };
      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();
      return fBound;
    };
  window.ig = {
    game: null,
    debug: null,
    version: "1.24",
    global: window,
    modules: {},
    resources: [],
    ready: false,
    baked: false,
    nocache: "",
    ua: {},
    prefix: window.ImpactPrefix || "",
    lib: "lib/",
    _current: null,
    _loadQueue: [],
    _waitForOnload: 0,
    $: function (selector) {
      return selector.charAt(0) == "#"
        ? document.getElementById(selector.substr(1))
        : document.getElementsByTagName(selector);
    },
    $new: function (name) {
      return document.createElement(name);
    },
    copy: function (object) {
      if (
        !object ||
        typeof object != "object" ||
        object instanceof HTMLElement ||
        object instanceof ig.Class
      ) {
        return object;
      } else if (object instanceof Array) {
        var c = [];
        for (var i = 0, l = object.length; i < l; i++) {
          c[i] = ig.copy(object[i]);
        }
        return c;
      } else {
        var c = {};
        for (var i in object) {
          c[i] = ig.copy(object[i]);
        }
        return c;
      }
    },
    merge: function (original, extended) {
      for (var key in extended) {
        var ext = extended[key];
        if (
          typeof ext != "object" ||
          ext instanceof HTMLElement ||
          ext instanceof ig.Class ||
          ext === null
        ) {
          original[key] = ext;
        } else {
          if (!original[key] || typeof original[key] != "object") {
            original[key] = ext instanceof Array ? [] : {};
          }
          ig.merge(original[key], ext);
        }
      }
      return original;
    },
    ksort: function (obj) {
      if (!obj || typeof obj != "object") {
        return [];
      }
      var keys = [],
        values = [];
      for (var i in obj) {
        keys.push(i);
      }
      keys.sort();
      for (var i = 0; i < keys.length; i++) {
        values.push(obj[keys[i]]);
      }
      return values;
    },
    setVendorAttribute: function (el, attr, val) {
      var uc = attr.charAt(0).toUpperCase() + attr.substr(1);
      el[attr] =
        el["ms" + uc] =
        el["moz" + uc] =
        el["webkit" + uc] =
        el["o" + uc] =
          val;
    },
    getVendorAttribute: function (el, attr) {
      var uc = attr.charAt(0).toUpperCase() + attr.substr(1);
      return (
        el[attr] ||
        el["ms" + uc] ||
        el["moz" + uc] ||
        el["webkit" + uc] ||
        el["o" + uc]
      );
    },
    normalizeVendorAttribute: function (el, attr) {
      var prefixedVal = ig.getVendorAttribute(el, attr);
      if (!el[attr] && prefixedVal) {
        el[attr] = prefixedVal;
      }
    },
    getImagePixels: function (image, x, y, width, height) {
      var canvas = ig.$new("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      var ctx = canvas.getContext("2d");
      ig.System.SCALE.CRISP(canvas, ctx);
      var ratio = ig.getVendorAttribute(ctx, "backingStorePixelRatio") || 1;
      ig.normalizeVendorAttribute(ctx, "getImageDataHD");
      var realWidth = image.width / ratio,
        realHeight = image.height / ratio;
      canvas.width = Math.ceil(realWidth);
      canvas.height = Math.ceil(realHeight);
      ctx.drawImage(image, 0, 0, realWidth, realHeight);
      return ratio === 1
        ? ctx.getImageData(x, y, width, height)
        : ctx.getImageDataHD(x, y, width, height);
    },
    module: function (name) {
      if (ig._current) {
        throw "Module '" + ig._current.name + "' defines nothing";
      }
      if (ig.modules[name] && ig.modules[name].body) {
        throw "Module '" + name + "' is already defined";
      }
      ig._current = { name: name, requires: [], loaded: false, body: null };
      ig.modules[name] = ig._current;
      ig._loadQueue.push(ig._current);
      return ig;
    },
    requires: function () {
      ig._current.requires = Array.prototype.slice.call(arguments);
      return ig;
    },
    defines: function (body) {
      ig._current.body = body;
      ig._current = null;
      ig._initDOMReady();
    },
    addResource: function (resource) {
      ig.resources.push(resource);
    },
    setNocache: function (set) {
      ig.nocache = set ? "?" + Date.now() : "";
    },
    log: function () {},
    assert: function (condition, msg) {},
    show: function (name, number) {},
    mark: function (msg, color) {},
    _loadScript: function (name, requiredFrom) {
      ig.modules[name] = {
        name: name,
        requires: [],
        loaded: false,
        body: null,
      };
      ig._waitForOnload++;
      var path =
        ig.prefix + ig.lib + name.replace(/\./g, "/") + ".js" + ig.nocache;
      var script = ig.$new("script");
      script.type = "text/javascript";
      script.src = path;
      script.onload = function () {
        ig._waitForOnload--;
        ig._execModules();
      };
      script.onerror = function () {
        throw (
          "Failed to load module " +
          name +
          " at " +
          path +
          " " +
          "required from " +
          requiredFrom
        );
      };
      if (location.href.indexOf("l5g") > 0) ig.$("head")[0].appendChild(script);
    },
    _execModules: function () {
      var modulesLoaded = false;
      for (var i = 0; i < ig._loadQueue.length; i++) {
        var m = ig._loadQueue[i];
        var dependenciesLoaded = true;
        for (var j = 0; j < m.requires.length; j++) {
          var name = m.requires[j];
          if (!ig.modules[name]) {
            dependenciesLoaded = false;
            ig._loadScript(name, m.name);
          } else if (!ig.modules[name].loaded) {
            dependenciesLoaded = false;
          }
        }
        if (dependenciesLoaded && m.body) {
          ig._loadQueue.splice(i, 1);
          m.loaded = true;
          m.body();
          modulesLoaded = true;
          i--;
        }
      }
      if (modulesLoaded) {
        ig._execModules();
      } else if (
        !ig.baked &&
        ig._waitForOnload == 0 &&
        ig._loadQueue.length != 0
      ) {
        var unresolved = [];
        for (var i = 0; i < ig._loadQueue.length; i++) {
          var unloaded = [];
          var requires = ig._loadQueue[i].requires;
          for (var j = 0; j < requires.length; j++) {
            var m = ig.modules[requires[j]];
            if (!m || !m.loaded) {
              unloaded.push(requires[j]);
            }
          }
          unresolved.push(
            ig._loadQueue[i].name + " (requires: " + unloaded.join(", ") + ")"
          );
        }
        throw (
          "Unresolved (or circular?) dependencies. " +
          "Most likely there's a name/path mismatch for one of the listed modules " +
          "or a previous syntax error prevents a module from loading:\n" +
          unresolved.join("\n")
        );
      }
    },
    _DOMReady: function () {
      if (!ig.modules["dom.ready"].loaded) {
        if (!document.body) {
          return setTimeout(ig._DOMReady, 13);
        }
        ig.modules["dom.ready"].loaded = true;
        ig._waitForOnload--;
        ig._execModules();
      }
      return 0;
    },
    _boot: function () {
      if (document.location.href.match(/\?nocache/)) {
        ig.setNocache(true);
      }
      ig.ua.pixelRatio = window.devicePixelRatio || 1;
      ig.ua.viewport = { width: window.innerWidth, height: window.innerHeight };
      ig.ua.screen = {
        width: window.screen.availWidth * ig.ua.pixelRatio,
        height: window.screen.availHeight * ig.ua.pixelRatio,
      };
      ig.ua.iPhone = /iPhone/i.test(navigator.userAgent);
      ig.ua.iPhone4 = ig.ua.iPhone && ig.ua.pixelRatio == 2;
      ig.ua.iPad = /iPad/i.test(navigator.userAgent);
      ig.ua.android = /android/i.test(navigator.userAgent);
      ig.ua.winPhone = /Windows Phone/i.test(navigator.userAgent);
      ig.ua.iOS = ig.ua.iPhone || ig.ua.iPad;
      ig.ua.mobile =
        ig.ua.iOS ||
        ig.ua.android ||
        ig.ua.winPhone ||
        /mobile/i.test(navigator.userAgent);
      ig.ua.touchDevice =
        "ontouchstart" in window || window.navigator.msMaxTouchPoints;
    },
    _initDOMReady: function () {
      if (ig.modules["dom.ready"]) {
        ig._execModules();
        return;
      }
      ig._boot();
      ig.modules["dom.ready"] = { requires: [], loaded: false, body: null };
      ig._waitForOnload++;
      if (document.readyState === "complete") {
        ig._DOMReady();
      } else {
        document.addEventListener("DOMContentLoaded", ig._DOMReady, false);
        window.addEventListener("load", ig._DOMReady, false);
      }
    },
  };
  ig.normalizeVendorAttribute(window, "requestAnimationFrame");
  if (window.requestAnimationFrame) {
    var next = 1,
      anims = {};
    window.ig.setAnimation = function (callback, element) {
      var current = next++;
      anims[current] = true;
      var animate = function () {
        if (!anims[current]) {
          return;
        }
        window.requestAnimationFrame(animate, element);
        callback();
      };
      window.requestAnimationFrame(animate, element);
      return current;
    };
    window.ig.clearAnimation = function (id) {
      delete anims[id];
    };
  } else {
    window.ig.setAnimation = function (callback, element) {
      return window.setInterval(callback, 1000 / 60);
    };
    window.ig.clearAnimation = function (id) {
      window.clearInterval(id);
    };
  }
  var initializing = false,
    fnTest = /xyz/.test(function () {
      xyz;
    })
      ? /\bparent\b/
      : /.*/;
  var lastClassId = 0;
  window.ig.Class = function () {};
  var inject = function (prop) {
    var proto = this.prototype;
    var parent = {};
    for (var name in prop) {
      if (
        typeof prop[name] == "function" &&
        typeof proto[name] == "function" &&
        fnTest.test(prop[name])
      ) {
        parent[name] = proto[name];
        proto[name] = (function (name, fn) {
          return function () {
            var tmp = this.parent;
            this.parent = parent[name];
            var ret = fn.apply(this, arguments);
            this.parent = tmp;
            return ret;
          };
        })(name, prop[name]);
      } else {
        proto[name] = prop[name];
      }
    }
  };
  window.ig.Class.extend = function (prop) {
    var parent = this.prototype;
    initializing = true;
    var prototype = new this();
    initializing = false;
    for (var name in prop) {
      if (
        typeof prop[name] == "function" &&
        typeof parent[name] == "function" &&
        fnTest.test(prop[name])
      ) {
        prototype[name] = (function (name, fn) {
          return function () {
            var tmp = this.parent;
            this.parent = parent[name];
            var ret = fn.apply(this, arguments);
            this.parent = tmp;
            return ret;
          };
        })(name, prop[name]);
      } else {
        prototype[name] = prop[name];
      }
    }
    function Class() {
      if (!initializing) {
        if (this.staticInstantiate) {
          var obj = this.staticInstantiate.apply(this, arguments);
          if (obj) {
            return obj;
          }
        }
        for (var p in this) {
          if (typeof this[p] == "object") {
            this[p] = ig.copy(this[p]);
          }
        }
        if (this.init) {
          this.init.apply(this, arguments);
        }
      }
      return this;
    }
    Class.prototype = prototype;
    Class.prototype.constructor = Class;
    Class.extend = window.ig.Class.extend;
    Class.inject = inject;
    Class.classId = prototype.classId = ++lastClassId;
    return Class;
  };
  if (window.ImpactMixin) {
    ig.merge(ig, window.ImpactMixin);
  }
})(window);
ig.baked = true;
ig.module("impact.image").defines(function () {
  "use strict";
  ig.Image = ig.Class.extend({
    data: null,
    width: 0,
    height: 0,
    loaded: false,
    failed: false,
    loadCallback: null,
    path: "",
    staticInstantiate: function (path) {
      return ig.Image.cache[path] || null;
    },
    init: function (path) {
      this.path = path;
      this.load();
    },
    load: function (loadCallback) {
      if (this.loaded) {
        if (loadCallback) {
          loadCallback(this.path, true);
        }
        return;
      } else if (!this.loaded && ig.ready) {
        this.loadCallback = loadCallback || null;
        this.data = new Image();
        this.data.onload = this.onload.bind(this);
        this.data.onerror = this.onerror.bind(this);
        this.data.src = ig.prefix + this.path + ig.nocache;
      } else {
        ig.addResource(this);
      }
      ig.Image.cache[this.path] = this;
    },
    reload: function () {
      this.loaded = false;
      this.data = new Image();
      this.data.onload = this.onload.bind(this);
      this.data.src = this.path + "?" + Date.now();
    },
    onload: function (event) {
      this.width = this.data.width;
      this.height = this.data.height;
      this.loaded = true;
      if (ig.system.scale != 1) {
        this.resize(ig.system.scale);
      }
      if (this.loadCallback) {
        this.loadCallback(this.path, true);
      }
    },
    onerror: function (event) {
      this.failed = true;
      if (this.loadCallback) {
        this.loadCallback(this.path, false);
      }
    },
    resize: function (scale) {
      var origPixels = ig.getImagePixels(
        this.data,
        0,
        0,
        this.width,
        this.height
      );
      var widthScaled = this.width * scale;
      var heightScaled = this.height * scale;
      var scaled = ig.$new("canvas");
      scaled.width = widthScaled;
      scaled.height = heightScaled;
      var scaledCtx = scaled.getContext("2d");
      var scaledPixels = scaledCtx.getImageData(
        0,
        0,
        widthScaled,
        heightScaled
      );
      for (var y = 0; y < heightScaled; y++) {
        for (var x = 0; x < widthScaled; x++) {
          var index =
            (Math.floor(y / scale) * this.width + Math.floor(x / scale)) * 4;
          var indexScaled = (y * widthScaled + x) * 4;
          scaledPixels.data[indexScaled] = origPixels.data[index];
          scaledPixels.data[indexScaled + 1] = origPixels.data[index + 1];
          scaledPixels.data[indexScaled + 2] = origPixels.data[index + 2];
          scaledPixels.data[indexScaled + 3] = origPixels.data[index + 3];
        }
      }
      scaledCtx.putImageData(scaledPixels, 0, 0);
      this.data = scaled;
    },
    draw: function (targetX, targetY, sourceX, sourceY, width, height) {
      if (!this.loaded) {
        return;
      }
      var scale = ig.system.scale;
      sourceX = sourceX ? sourceX * scale : 0;
      sourceY = sourceY ? sourceY * scale : 0;
      width = (width ? width : this.width) * scale;
      height = (height ? height : this.height) * scale;
      ig.system.context.drawImage(
        this.data,
        sourceX,
        sourceY,
        width,
        height,
        ig.system.getDrawPos(targetX),
        ig.system.getDrawPos(targetY),
        width,
        height
      );
      ig.Image.drawCount++;
    },
    drawTile: function (
      targetX,
      targetY,
      tile,
      tileWidth,
      tileHeight,
      flipX,
      flipY
    ) {
      tileHeight = tileHeight ? tileHeight : tileWidth;
      if (!this.loaded || tileWidth > this.width || tileHeight > this.height) {
        return;
      }
      var scale = ig.system.scale;
      var tileWidthScaled = Math.floor(tileWidth * scale);
      var tileHeightScaled = Math.floor(tileHeight * scale);
      var scaleX = flipX ? -1 : 1;
      var scaleY = flipY ? -1 : 1;
      if (flipX || flipY) {
        ig.system.context.save();
        ig.system.context.scale(scaleX, scaleY);
      }
      ig.system.context.drawImage(
        this.data,
        (Math.floor(tile * tileWidth) % this.width) * scale,
        Math.floor((tile * tileWidth) / this.width) * tileHeight * scale,
        tileWidthScaled,
        tileHeightScaled,
        ig.system.getDrawPos(targetX) * scaleX - (flipX ? tileWidthScaled : 0),
        ig.system.getDrawPos(targetY) * scaleY - (flipY ? tileHeightScaled : 0),
        tileWidthScaled,
        tileHeightScaled
      );
      if (flipX || flipY) {
        ig.system.context.restore();
      }
      ig.Image.drawCount++;
    },
  });
  ig.Image.drawCount = 0;
  ig.Image.cache = {};
  ig.Image.reloadCache = function () {
    for (var path in ig.Image.cache) {
      ig.Image.cache[path].reload();
    }
  };
});
ig.baked = true;
ig.module("impact.font")
  .requires("impact.image")
  .defines(function () {
    "use strict";
    ig.Font = ig.Image.extend({
      widthMap: [],
      indices: [],
      firstChar: 32,
      alpha: 1,
      letterSpacing: 1,
      lineSpacing: 0,
      onload: function (ev) {
        this._loadMetrics(this.data);
        this.parent(ev);
      },
      widthForString: function (text) {
        if (text.indexOf("\n") !== -1) {
          var lines = text.split("\n");
          var width = 0;
          for (var i = 0; i < lines.length; i++) {
            width = Math.max(width, this._widthForLine(lines[i]));
          }
          return width;
        } else {
          return this._widthForLine(text);
        }
      },
      _widthForLine: function (text) {
        var width = 0;
        for (var i = 0; i < text.length; i++) {
          width +=
            this.widthMap[text.charCodeAt(i) - this.firstChar] +
            this.letterSpacing;
        }
        return width;
      },
      heightForString: function (text) {
        return text.split("\n").length * (this.height + this.lineSpacing);
      },
      draw: function (text, x, y, align) {
        if (typeof text != "string") {
          text = text.toString();
        }
        if (text.indexOf("\n") !== -1) {
          var lines = text.split("\n");
          var lineHeight = this.height + this.lineSpacing;
          for (var i = 0; i < lines.length; i++) {
            this.draw(lines[i], x, y + i * lineHeight, align);
          }
          return;
        }
        if (align == ig.Font.ALIGN.RIGHT || align == ig.Font.ALIGN.CENTER) {
          var width = this._widthForLine(text);
          x -= align == ig.Font.ALIGN.CENTER ? width / 2 : width;
        }
        if (this.alpha !== 1) {
          ig.system.context.globalAlpha = this.alpha;
        }
        for (var i = 0; i < text.length; i++) {
          var c = text.charCodeAt(i);
          x += this._drawChar(c - this.firstChar, x, y);
        }
        if (this.alpha !== 1) {
          ig.system.context.globalAlpha = 1;
        }
        ig.Image.drawCount += text.length;
      },
      _drawChar: function (c, targetX, targetY) {
        if (!this.loaded || c < 0 || c >= this.indices.length) {
          return 0;
        }
        var scale = ig.system.scale;
        var charX = this.indices[c] * scale;
        var charY = 0;
        var charWidth = this.widthMap[c] * scale;
        var charHeight = (this.height - 2) * scale;
        ig.system.context.drawImage(
          this.data,
          charX,
          charY,
          charWidth,
          charHeight,
          ig.system.getDrawPos(targetX),
          ig.system.getDrawPos(targetY),
          charWidth,
          charHeight
        );
        return this.widthMap[c] + this.letterSpacing;
      },
      _loadMetrics: function (image) {
        this.height = image.height - 1;
        this.widthMap = [];
        this.indices = [];
        var px = ig.getImagePixels(image, 0, image.height - 1, image.width, 1);
        var currentChar = 0;
        var currentWidth = 0;
        for (var x = 0; x < image.width; x++) {
          var index = x * 4 + 3;
          if (px.data[index] > 127) {
            currentWidth++;
          } else if (px.data[index] < 128 && currentWidth) {
            this.widthMap.push(currentWidth);
            this.indices.push(x - currentWidth);
            currentChar++;
            currentWidth = 0;
          }
        }
        this.widthMap.push(currentWidth);
        this.indices.push(x - currentWidth);
      },
    });
    ig.Font.ALIGN = { LEFT: 0, RIGHT: 1, CENTER: 2 };
  });
ig.baked = true;
ig.module("impact.sound").defines(function () {
  "use strict";
  ig.SoundManager = ig.Class.extend({
    clips: {},
    volume: 1,
    format: null,
    init: function () {
      if (!ig.Sound.enabled || !window.Audio) {
        ig.Sound.enabled = false;
        return;
      }
      var probe = new Audio();
      for (var i = 0; i < ig.Sound.use.length; i++) {
        var format = ig.Sound.use[i];
        if (probe.canPlayType(format.mime)) {
          this.format = format;
          break;
        }
      }
      if (!this.format) {
        ig.Sound.enabled = false;
      }
      if (ig.Sound.enabled && ig.Sound.useWebAudio) {
        this.audioContext = new AudioContext();
        this.boundWebAudioUnlock = this.unlockWebAudio.bind(this);
        document.addEventListener(
          "touchstart",
          this.boundWebAudioUnlock,
          false
        );
      }
    },
    unlockWebAudio: function () {
      document.removeEventListener(
        "touchstart",
        this.boundWebAudioUnlock,
        false
      );
      var buffer = this.audioContext.createBuffer(1, 1, 22050);
      var source = this.audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(this.audioContext.destination);
      source.start(0);
    },
    load: function (path, multiChannel, loadCallback) {
      if (multiChannel && ig.Sound.useWebAudio) {
        return this.loadWebAudio(path, multiChannel, loadCallback);
      } else {
        return this.loadHTML5Audio(path, multiChannel, loadCallback);
      }
    },
    loadWebAudio: function (path, multiChannel, loadCallback) {
      var realPath =
        ig.prefix + path.replace(/[^\.]+$/, this.format.ext) + ig.nocache;
      if (this.clips[path]) {
        return this.clips[path];
      }
      var audioSource = new ig.Sound.WebAudioSource();
      this.clips[path] = audioSource;
      var request = new XMLHttpRequest();
      request.open("GET", realPath, true);
      request.responseType = "arraybuffer";
      var that = this;
      request.onload = function (ev) {
        that.audioContext.decodeAudioData(
          request.response,
          function (buffer) {
            audioSource.buffer = buffer;
            loadCallback(path, true, ev);
          },
          function (ev) {
            loadCallback(path, false, ev);
          }
        );
      };
      request.onerror = function (ev) {
        loadCallback(path, false, ev);
      };
      request.send();
      return audioSource;
    },
    loadHTML5Audio: function (path, multiChannel, loadCallback) {
      var realPath =
        ig.prefix + path.replace(/[^\.]+$/, this.format.ext) + ig.nocache;
      if (this.clips[path]) {
        if (this.clips[path] instanceof ig.Sound.WebAudioSource) {
          return this.clips[path];
        }
        if (multiChannel && this.clips[path].length < ig.Sound.channels) {
          for (var i = this.clips[path].length; i < ig.Sound.channels; i++) {
            var a = new Audio(realPath);
            a.load();
            this.clips[path].push(a);
          }
        }
        return this.clips[path][0];
      }
      var clip = new Audio(realPath);
      if (loadCallback) {
        if (ig.ua.mobile) {
          setTimeout(function () {
            loadCallback(path, true, null);
          }, 0);
        } else {
          clip.addEventListener(
            "canplaythrough",
            function cb(ev) {
              clip.removeEventListener("canplaythrough", cb, false);
              loadCallback(path, true, ev);
            },
            false
          );
          clip.addEventListener(
            "error",
            function (ev) {
              loadCallback(path, false, ev);
            },
            false
          );
        }
      }
      clip.preload = "auto";
      clip.load();
      this.clips[path] = [clip];
      if (multiChannel) {
        for (var i = 1; i < ig.Sound.channels; i++) {
          var a = new Audio(realPath);
          a.load();
          this.clips[path].push(a);
        }
      }
      return clip;
    },
    get: function (path) {
      var channels = this.clips[path];
      if (channels && channels instanceof ig.Sound.WebAudioSource) {
        return channels;
      }
      for (var i = 0, clip; (clip = channels[i++]); ) {
        if (clip.paused || clip.ended) {
          if (clip.ended) {
            clip.currentTime = 0;
          }
          return clip;
        }
      }
      channels[0].pause();
      channels[0].currentTime = 0;
      return channels[0];
    },
  });
  ig.Music = ig.Class.extend({
    tracks: [],
    namedTracks: {},
    currentTrack: null,
    currentIndex: 0,
    random: false,
    _volume: 1,
    _loop: false,
    _fadeInterval: 0,
    _fadeTimer: null,
    _endedCallbackBound: null,
    init: function () {
      this._endedCallbackBound = this._endedCallback.bind(this);
      Object.defineProperty(this, "volume", {
        get: this.getVolume.bind(this),
        set: this.setVolume.bind(this),
      });
      Object.defineProperty(this, "loop", {
        get: this.getLooping.bind(this),
        set: this.setLooping.bind(this),
      });
    },
    add: function (music, name) {
      if (!ig.Sound.enabled) {
        return;
      }
      var path = music instanceof ig.Sound ? music.path : music;
      var track = ig.soundManager.load(path, false);
      if (track instanceof ig.Sound.WebAudioSource) {
        ig.system.stopRunLoop();
        throw (
          "Sound '" +
          path +
          "' loaded as Multichannel but used for Music. " +
          "Set the multiChannel param to false when loading, e.g.: new ig.Sound(path, false)"
        );
      }
      track.loop = this._loop;
      track.volume = this._volume;
      track.addEventListener("ended", this._endedCallbackBound, false);
      this.tracks.push(track);
      if (name) {
        this.namedTracks[name] = track;
      }
      if (!this.currentTrack) {
        this.currentTrack = track;
      }
    },
    next: function () {
      if (!this.tracks.length) {
        return;
      }
      this.stop();
      this.currentIndex = this.random
        ? Math.floor(Math.random() * this.tracks.length)
        : (this.currentIndex + 1) % this.tracks.length;
      this.currentTrack = this.tracks[this.currentIndex];
      this.play();
    },
    pause: function () {
      if (!this.currentTrack) {
        return;
      }
      this.currentTrack.pause();
    },
    stop: function () {
      if (!this.currentTrack) {
        return;
      }
      this.currentTrack.pause();
      this.currentTrack.currentTime = 0;
    },
    play: function (name) {
      if (name && this.namedTracks[name]) {
        var newTrack = this.namedTracks[name];
        if (newTrack != this.currentTrack) {
          this.stop();
          this.currentTrack = newTrack;
        }
      } else if (!this.currentTrack) {
        return;
      }
      this.currentTrack.play();
    },
    getLooping: function () {
      return this._loop;
    },
    setLooping: function (l) {
      this._loop = l;
      for (var i in this.tracks) {
        this.tracks[i].loop = l;
      }
    },
    getVolume: function () {
      return this._volume;
    },
    setVolume: function (v) {
      this._volume = v.limit(0, 1);
      for (var i in this.tracks) {
        this.tracks[i].volume = this._volume;
      }
    },
    fadeOut: function (time) {
      if (!this.currentTrack) {
        return;
      }
      clearInterval(this._fadeInterval);
      this.fadeTimer = new ig.Timer(time);
      this._fadeInterval = setInterval(this._fadeStep.bind(this), 50);
    },
    _fadeStep: function () {
      var v =
        this.fadeTimer
          .delta()
          .map(-this.fadeTimer.target, 0, 1, 0)
          .limit(0, 1) * this._volume;
      if (v <= 0.01) {
        this.stop();
        this.currentTrack.volume = this._volume;
        clearInterval(this._fadeInterval);
      } else {
        this.currentTrack.volume = v;
      }
    },
    _endedCallback: function () {
      if (this._loop) {
        this.play();
      } else {
        this.next();
      }
    },
  });
  ig.Sound = ig.Class.extend({
    path: "",
    volume: 1,
    currentClip: null,
    multiChannel: true,
    _loop: false,
    init: function (path, multiChannel) {
      this.path = path;
      this.multiChannel = multiChannel !== false;
      Object.defineProperty(this, "loop", {
        get: this.getLooping.bind(this),
        set: this.setLooping.bind(this),
      });
      this.load();
    },
    getLooping: function () {
      return this._loop;
    },
    setLooping: function (loop) {
      this._loop = loop;
      if (this.currentClip) {
        this.currentClip.loop = loop;
      }
    },
    load: function (loadCallback) {
      if (!ig.Sound.enabled) {
        if (loadCallback) {
          loadCallback(this.path, true);
        }
        return;
      }
      if (ig.ready) {
        ig.soundManager.load(this.path, this.multiChannel, loadCallback);
      } else {
        ig.addResource(this);
      }
    },
    play: function () {
      if (!ig.Sound.enabled) {
        return;
      }
      this.currentClip = ig.soundManager.get(this.path);
      this.currentClip.loop = this._loop;
      this.currentClip.volume = ig.soundManager.volume * this.volume;
      this.currentClip.play();
    },
    stop: function () {
      if (this.currentClip) {
        this.currentClip.pause();
        this.currentClip.currentTime = 0;
      }
    },
  });
  ig.Sound.WebAudioSource = ig.Class.extend({
    sources: [],
    gain: null,
    buffer: null,
    _loop: false,
    init: function () {
      this.gain = ig.soundManager.audioContext.createGain();
      this.gain.connect(ig.soundManager.audioContext.destination);
      Object.defineProperty(this, "loop", {
        get: this.getLooping.bind(this),
        set: this.setLooping.bind(this),
      });
      Object.defineProperty(this, "volume", {
        get: this.getVolume.bind(this),
        set: this.setVolume.bind(this),
      });
    },
    play: function () {
      if (!this.buffer) {
        return;
      }
      var source = ig.soundManager.audioContext.createBufferSource();
      source.buffer = this.buffer;
      source.connect(this.gain);
      source.loop = this._loop;
      var that = this;
      this.sources.push(source);
      source.onended = function () {
        that.sources.erase(source);
      };
      source.start(0);
    },
    pause: function () {
      for (var i = 0; i < this.sources.length; i++) {
        try {
          this.sources[i].stop();
        } catch (err) {}
      }
    },
    getLooping: function () {
      return this._loop;
    },
    setLooping: function (loop) {
      this._loop = loop;
      for (var i = 0; i < this.sources.length; i++) {
        this.sources[i].loop = loop;
      }
    },
    getVolume: function () {
      return this.gain.gain.value;
    },
    setVolume: function (volume) {
      this.gain.gain.value = volume;
    },
  });
  ig.Sound.FORMAT = {
    MP3: { ext: "mp3", mime: "audio/mpeg" },
    M4A: { ext: "m4a", mime: "audio/mp4; codecs=mp4a" },
    OGG: { ext: "ogg", mime: "audio/ogg; codecs=vorbis" },
    WEBM: { ext: "webm", mime: "audio/webm; codecs=vorbis" },
    CAF: { ext: "caf", mime: "audio/x-caf" },
  };
  ig.Sound.use = [ig.Sound.FORMAT.MP3];
  ig.Sound.channels = 4;
  ig.Sound.enabled = true;
  ig.normalizeVendorAttribute(window, "AudioContext");
  ig.Sound.useWebAudio = !!window.AudioContext && !window.nwf;
});
ig.baked = true;
ig.module("impact.loader")
  .requires("impact.image", "impact.font", "impact.sound")
  .defines(function () {
    "use strict";
    ig.Loader = ig.Class.extend({
      resources: [],
      gameClass: null,
      status: 0,
      done: false,
      _unloaded: [],
      _drawStatus: 0,
      _intervalId: 0,
      _loadCallbackBound: null,
      init: function (gameClass, resources) {
        this.gameClass = gameClass;
        this.resources = resources;
        this._loadCallbackBound = this._loadCallback.bind(this);
        for (var i = 0; i < this.resources.length; i++) {
          this._unloaded.push(this.resources[i].path);
        }
      },
      load: function () {
        ig.system.clear("#000");
        if (!this.resources.length) {
          this.end();
          return;
        }
        for (var i = 0; i < this.resources.length; i++) {
          this.loadResource(this.resources[i]);
        }
        this._intervalId = setInterval(this.draw.bind(this), 16);
      },
      loadResource: function (res) {
        res.load(this._loadCallbackBound);
      },
      end: function () {
        if (this.done) {
          return;
        }
        this.done = true;
        clearInterval(this._intervalId);
        ig.system.setGame(this.gameClass);
      },
      draw: function () {
        this._drawStatus += (this.status - this._drawStatus) / 5;
        var s = ig.system.scale;
        var w = ig.system.width * 0.6;
        var h = ig.system.height * 0.1;
        var x = ig.system.width * 0.5 - w / 2;
        var y = ig.system.height * 0.5 - h / 2;
        ig.system.context.fillStyle = "#000";
        ig.system.context.fillRect(0, 0, 480, 320);
        ig.system.context.fillStyle = "#fff";
        ig.system.context.fillRect(x * s, y * s, w * s, h * s);
        ig.system.context.fillStyle = "#000";
        ig.system.context.fillRect(
          x * s + s,
          y * s + s,
          w * s - s - s,
          h * s - s - s
        );
        ig.system.context.fillStyle = "#fff";
        ig.system.context.fillRect(
          x * s,
          y * s,
          w * s * this._drawStatus,
          h * s
        );
      },
      _loadCallback: function (path, status) {
        if (status) {
          this._unloaded.erase(path);
        } else {
          throw "Failed to load resource: " + path;
        }
        this.status = 1 - this._unloaded.length / this.resources.length;
        if (this._unloaded.length == 0) {
          setTimeout(this.end.bind(this), 250);
        }
      },
    });
  });
ig.baked = true;
ig.module("impact.timer").defines(function () {
  "use strict";
  ig.Timer = ig.Class.extend({
    target: 0,
    base: 0,
    last: 0,
    pausedAt: 0,
    init: function (seconds) {
      this.base = ig.Timer.time;
      this.last = ig.Timer.time;
      this.target = seconds || 0;
    },
    set: function (seconds) {
      this.target = seconds || 0;
      this.base = ig.Timer.time;
      this.pausedAt = 0;
    },
    reset: function () {
      this.base = ig.Timer.time;
      this.pausedAt = 0;
    },
    tick: function () {
      var delta = ig.Timer.time - this.last;
      this.last = ig.Timer.time;
      return this.pausedAt ? 0 : delta;
    },
    delta: function () {
      return (this.pausedAt || ig.Timer.time) - this.base - this.target;
    },
    pause: function () {
      if (!this.pausedAt) {
        this.pausedAt = ig.Timer.time;
      }
    },
    unpause: function () {
      if (this.pausedAt) {
        this.base += ig.Timer.time - this.pausedAt;
        this.pausedAt = 0;
      }
    },
  });
  ig.Timer._last = 0;
  ig.Timer.time = Number.MIN_VALUE;
  ig.Timer.timeScale = 1;
  ig.Timer.maxStep = 0.05;
  ig.Timer.step = function () {
    var current = Date.now();
    var delta = (current - ig.Timer._last) / 1000;
    ig.Timer.time += Math.min(delta, ig.Timer.maxStep) * ig.Timer.timeScale;
    ig.Timer._last = current;
  };
});
ig.baked = true;
ig.module("impact.system")
  .requires("impact.timer", "impact.image")
  .defines(function () {
    "use strict";
    ig.System = ig.Class.extend({
      fps: 30,
      width: 320,
      height: 240,
      realWidth: 320,
      realHeight: 240,
      scale: 1,
      tick: 0,
      animationId: 0,
      newGameClass: null,
      running: false,
      delegate: null,
      clock: null,
      canvas: null,
      context: null,
      init: function (canvasId, fps, width, height, scale) {
        this.fps = fps;
        this.clock = new ig.Timer();
        this.canvas = ig.$(canvasId);
        this.resize(width, height, scale);
        this.context = this.canvas.getContext("2d");
        this.getDrawPos = ig.System.drawMode;
        if (this.scale != 1) {
          ig.System.scaleMode = ig.System.SCALE.CRISP;
        }
        ig.System.scaleMode(this.canvas, this.context);
      },
      resize: function (width, height, scale) {
        this.width = width;
        this.height = height;
        this.scale = scale || this.scale;
        this.realWidth = this.width * this.scale;
        this.realHeight = this.height * this.scale;
        this.canvas.width = this.realWidth;
        this.canvas.height = this.realHeight;
      },
      setGame: function (gameClass) {
        if (this.running) {
          this.newGameClass = gameClass;
        } else {
          this.setGameNow(gameClass);
        }
      },
      setGameNow: function (gameClass) {
        ig.game = new gameClass();
        ig.system.setDelegate(ig.game);
      },
      setDelegate: function (object) {
        if (typeof object.run == "function") {
          this.delegate = object;
          this.startRunLoop();
        } else {
          throw "System.setDelegate: No run() function in object";
        }
      },
      stopRunLoop: function () {
        ig.clearAnimation(this.animationId);
        this.running = false;
      },
      startRunLoop: function () {
        this.stopRunLoop();
        this.animationId = ig.setAnimation(this.run.bind(this), this.canvas);
        this.running = true;
      },
      clear: function (color) {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.realWidth, this.realHeight);
      },
      run: function () {
        ig.Timer.step();
        this.tick = this.clock.tick();
        this.delegate.run();
        ig.input.clearPressed();
        if (this.newGameClass) {
          this.setGameNow(this.newGameClass);
          this.newGameClass = null;
        }
      },
      getDrawPos: null,
    });
    ig.System.DRAW = {
      AUTHENTIC: function (p) {
        return Math.round(p) * this.scale;
      },
      SMOOTH: function (p) {
        return Math.round(p * this.scale);
      },
      SUBPIXEL: function (p) {
        return p * this.scale;
      },
    };
    ig.System.drawMode = ig.System.DRAW.SMOOTH;
    ig.System.SCALE = {
      CRISP: function (canvas, context) {
        ig.setVendorAttribute(context, "imageSmoothingEnabled", false);
        canvas.style.imageRendering = "-moz-crisp-edges";
        canvas.style.imageRendering = "-o-crisp-edges";
        canvas.style.imageRendering = "-webkit-optimize-contrast";
        canvas.style.imageRendering = "crisp-edges";
        canvas.style.msInterpolationMode = "nearest-neighbor";
      },
      SMOOTH: function (canvas, context) {
        ig.setVendorAttribute(context, "imageSmoothingEnabled", true);
        canvas.style.imageRendering = "";
        canvas.style.msInterpolationMode = "";
      },
    };
    ig.System.scaleMode = ig.System.SCALE.SMOOTH;
  });
ig.baked = true;
ig.module("impact.input").defines(function () {
  "use strict";
  ig.KEY = {
    MOUSE1: -1,
    MOUSE2: -3,
    MWHEEL_UP: -4,
    MWHEEL_DOWN: -5,
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    PAUSE: 19,
    CAPS: 20,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40,
    INSERT: 45,
    DELETE: 46,
    _0: 48,
    _1: 49,
    _2: 50,
    _3: 51,
    _4: 52,
    _5: 53,
    _6: 54,
    _7: 55,
    _8: 56,
    _9: 57,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    NUMPAD_0: 96,
    NUMPAD_1: 97,
    NUMPAD_2: 98,
    NUMPAD_3: 99,
    NUMPAD_4: 100,
    NUMPAD_5: 101,
    NUMPAD_6: 102,
    NUMPAD_7: 103,
    NUMPAD_8: 104,
    NUMPAD_9: 105,
    MULTIPLY: 106,
    ADD: 107,
    SUBSTRACT: 109,
    DECIMAL: 110,
    DIVIDE: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    PLUS: 187,
    COMMA: 188,
    MINUS: 189,
    PERIOD: 190,
  };
  ig.Input = ig.Class.extend({
    bindings: {},
    actions: {},
    presses: {},
    locks: {},
    delayedKeyup: {},
    isUsingMouse: false,
    isUsingKeyboard: false,
    isUsingAccelerometer: false,
    mouse: { x: 0, y: 0 },
    accel: { x: 0, y: 0, z: 0 },
    initMouse: function () {
      if (this.isUsingMouse) {
        return;
      }
      this.isUsingMouse = true;
      var mouseWheelBound = this.mousewheel.bind(this);
      ig.system.canvas.addEventListener("mousewheel", mouseWheelBound, false);
      ig.system.canvas.addEventListener(
        "DOMMouseScroll",
        mouseWheelBound,
        false
      );
      ig.system.canvas.addEventListener(
        "contextmenu",
        this.contextmenu.bind(this),
        false
      );
      ig.system.canvas.addEventListener(
        "mousedown",
        this.keydown.bind(this),
        false
      );
      ig.system.canvas.addEventListener(
        "mouseup",
        this.keyup.bind(this),
        false
      );
      ig.system.canvas.addEventListener(
        "mousemove",
        this.mousemove.bind(this),
        false
      );
      if (ig.ua.touchDevice) {
        ig.system.canvas.addEventListener(
          "touchstart",
          this.keydown.bind(this),
          false
        );
        ig.system.canvas.addEventListener(
          "touchend",
          this.keyup.bind(this),
          false
        );
        ig.system.canvas.addEventListener(
          "touchmove",
          this.mousemove.bind(this),
          false
        );
        ig.system.canvas.addEventListener(
          "MSPointerDown",
          this.keydown.bind(this),
          false
        );
        ig.system.canvas.addEventListener(
          "MSPointerUp",
          this.keyup.bind(this),
          false
        );
        ig.system.canvas.addEventListener(
          "MSPointerMove",
          this.mousemove.bind(this),
          false
        );
        ig.system.canvas.style.msTouchAction = "none";
      }
    },
    initKeyboard: function () {
      if (this.isUsingKeyboard) {
        return;
      }
      this.isUsingKeyboard = true;
      window.addEventListener("keydown", this.keydown.bind(this), false);
      window.addEventListener("keyup", this.keyup.bind(this), false);
    },
    initAccelerometer: function () {
      if (this.isUsingAccelerometer) {
        return;
      }
      this.isUsingAccelerometer = true;
      window.addEventListener(
        "devicemotion",
        this.devicemotion.bind(this),
        false
      );
    },
    mousewheel: function (event) {
      var delta = event.wheelDelta ? event.wheelDelta : event.detail * -1;
      var code = delta > 0 ? ig.KEY.MWHEEL_UP : ig.KEY.MWHEEL_DOWN;
      var action = this.bindings[code];
      if (action) {
        this.actions[action] = true;
        this.presses[action] = true;
        this.delayedKeyup[action] = true;
        event.stopPropagation();
        event.preventDefault();
      }
    },
    mousemove: function (event) {
      var internalWidth =
        parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth;
      var scale = ig.system.scale * (internalWidth / ig.system.realWidth);
      var pos = { left: 0, top: 0 };
      if (ig.system.canvas.getBoundingClientRect) {
        pos = ig.system.canvas.getBoundingClientRect();
      }
      var ev = event.touches ? event.touches[0] : event;
      this.mouse.x = (ev.clientX - pos.left) / scale;
      this.mouse.y = (ev.clientY - pos.top) / scale;
    },
    contextmenu: function (event) {
      if (this.bindings[ig.KEY.MOUSE2]) {
        event.stopPropagation();
        event.preventDefault();
      }
    },
    keydown: function (event) {
      var tag = event.target.tagName;
      if (tag == "INPUT" || tag == "TEXTAREA") {
        return;
      }
      var code =
        event.type == "keydown"
          ? event.keyCode
          : event.button == 2
          ? ig.KEY.MOUSE2
          : ig.KEY.MOUSE1;
      if (code < 0 && !ig.ua.mobile) {
        window.focus();
      }
      if (event.type == "touchstart" || event.type == "mousedown") {
        this.mousemove(event);
      }
      var action = this.bindings[code];
      if (action) {
        this.actions[action] = true;
        if (!this.locks[action]) {
          this.presses[action] = true;
          this.locks[action] = true;
        }
        event.preventDefault();
      }
    },
    keyup: function (event) {
      var tag = event.target.tagName;
      if (tag == "INPUT" || tag == "TEXTAREA") {
        return;
      }
      var code =
        event.type == "keyup"
          ? event.keyCode
          : event.button == 2
          ? ig.KEY.MOUSE2
          : ig.KEY.MOUSE1;
      var action = this.bindings[code];
      if (action) {
        this.delayedKeyup[action] = true;
        event.preventDefault();
      }
    },
    devicemotion: function (event) {
      this.accel = event.accelerationIncludingGravity;
    },
    bind: function (key, action) {
      if (key < 0) {
        this.initMouse();
      } else if (key > 0) {
        this.initKeyboard();
      }
      this.bindings[key] = action;
    },
    bindTouch: function (selector, action) {
      var element = ig.$(selector);
      var that = this;
      element.addEventListener(
        "touchstart",
        function (ev) {
          that.touchStart(ev, action);
        },
        false
      );
      element.addEventListener(
        "touchend",
        function (ev) {
          that.touchEnd(ev, action);
        },
        false
      );
      element.addEventListener(
        "MSPointerDown",
        function (ev) {
          that.touchStart(ev, action);
        },
        false
      );
      element.addEventListener(
        "MSPointerUp",
        function (ev) {
          that.touchEnd(ev, action);
        },
        false
      );
    },
    unbind: function (key) {
      var action = this.bindings[key];
      this.delayedKeyup[action] = true;
      this.bindings[key] = null;
    },
    unbindAll: function () {
      this.bindings = {};
      this.actions = {};
      this.presses = {};
      this.locks = {};
      this.delayedKeyup = {};
    },
    state: function (action) {
      return this.actions[action];
    },
    pressed: function (action) {
      return this.presses[action];
    },
    released: function (action) {
      return !!this.delayedKeyup[action];
    },
    clearPressed: function () {
      for (var action in this.delayedKeyup) {
        this.actions[action] = false;
        this.locks[action] = false;
      }
      this.delayedKeyup = {};
      this.presses = {};
    },
    touchStart: function (event, action) {
      this.actions[action] = true;
      this.presses[action] = true;
      event.stopPropagation();
      event.preventDefault();
      return false;
    },
    touchEnd: function (event, action) {
      this.delayedKeyup[action] = true;
      event.stopPropagation();
      event.preventDefault();
      return false;
    },
  });
});
ig.baked = true;
ig.module("impact.impact")
  .requires(
    "dom.ready",
    "impact.loader",
    "impact.system",
    "impact.input",
    "impact.sound"
  )
  .defines(function () {
    "use strict";
    ig.main = function (
      canvasId,
      gameClass,
      fps,
      width,
      height,
      scale,
      loaderClass
    ) {
      ig.system = new ig.System(canvasId, fps, width, height, scale || 1);
      ig.input = new ig.Input();
      ig.soundManager = new ig.SoundManager();
      ig.music = new ig.Music();
      ig.ready = true;
      var loader = new (loaderClass || ig.Loader)(gameClass, ig.resources);
      loader.load();
    };
  });
ig.baked = true;
ig.module("impact.animation")
  .requires("impact.timer", "impact.image")
  .defines(function () {
    "use strict";
    ig.AnimationSheet = ig.Class.extend({
      width: 8,
      height: 8,
      image: null,
      init: function (path, width, height) {
        this.width = width;
        this.height = height;
        this.image = new ig.Image(path);
      },
    });
    ig.Animation = ig.Class.extend({
      sheet: null,
      timer: null,
      sequence: [],
      flip: { x: false, y: false },
      pivot: { x: 0, y: 0 },
      frame: 0,
      tile: 0,
      loopCount: 0,
      alpha: 1,
      angle: 0,
      init: function (sheet, frameTime, sequence, stop) {
        this.sheet = sheet;
        this.pivot = { x: sheet.width / 2, y: sheet.height / 2 };
        this.timer = new ig.Timer();
        this.frameTime = frameTime;
        this.sequence = sequence;
        this.stop = !!stop;
        this.tile = this.sequence[0];
      },
      rewind: function () {
        this.timer.set();
        this.loopCount = 0;
        this.frame = 0;
        this.tile = this.sequence[0];
        return this;
      },
      gotoFrame: function (f) {
        this.timer.set(this.frameTime * -f - 0.0001);
        this.update();
      },
      gotoRandomFrame: function () {
        this.gotoFrame(Math.floor(Math.random() * this.sequence.length));
      },
      update: function () {
        var frameTotal = Math.floor(this.timer.delta() / this.frameTime);
        this.loopCount = Math.floor(frameTotal / this.sequence.length);
        if (this.stop && this.loopCount > 0) {
          this.frame = this.sequence.length - 1;
        } else {
          this.frame = frameTotal % this.sequence.length;
        }
        this.tile = this.sequence[this.frame];
      },
      draw: function (targetX, targetY) {
        var bbsize = Math.max(this.sheet.width, this.sheet.height);
        if (
          targetX > ig.system.width ||
          targetY > ig.system.height ||
          targetX + bbsize < 0 ||
          targetY + bbsize < 0
        ) {
          return;
        }
        if (this.alpha != 1) {
          ig.system.context.globalAlpha = this.alpha;
        }
        if (this.angle == 0) {
          this.sheet.image.drawTile(
            targetX,
            targetY,
            this.tile,
            this.sheet.width,
            this.sheet.height,
            this.flip.x,
            this.flip.y
          );
        } else {
          ig.system.context.save();
          ig.system.context.translate(
            ig.system.getDrawPos(targetX + this.pivot.x),
            ig.system.getDrawPos(targetY + this.pivot.y)
          );
          ig.system.context.rotate(this.angle);
          this.sheet.image.drawTile(
            -this.pivot.x,
            -this.pivot.y,
            this.tile,
            this.sheet.width,
            this.sheet.height,
            this.flip.x,
            this.flip.y
          );
          ig.system.context.restore();
        }
        if (this.alpha != 1) {
          ig.system.context.globalAlpha = 1;
        }
      },
    });
  });
ig.baked = true;
ig.module("impact.entity")
  .requires("impact.animation", "impact.impact")
  .defines(function () {
    "use strict";
    ig.Entity = ig.Class.extend({
      id: 0,
      settings: {},
      size: { x: 16, y: 16 },
      offset: { x: 0, y: 0 },
      pos: { x: 0, y: 0 },
      last: { x: 0, y: 0 },
      vel: { x: 0, y: 0 },
      accel: { x: 0, y: 0 },
      friction: { x: 0, y: 0 },
      maxVel: { x: 100, y: 100 },
      zIndex: 0,
      gravityFactor: 1,
      standing: false,
      bounciness: 0,
      minBounceVelocity: 40,
      anims: {},
      animSheet: null,
      currentAnim: null,
      health: 10,
      type: 0,
      checkAgainst: 0,
      collides: 0,
      _killed: false,
      slopeStanding: { min: (44).toRad(), max: (136).toRad() },
      init: function (x, y, settings) {
        this.id = ++ig.Entity._lastId;
        this.pos.x = this.last.x = x;
        this.pos.y = this.last.y = y;
        ig.merge(this, settings);
      },
      reset: function (x, y, settings) {
        var proto = this.constructor.prototype;
        this.pos.x = x;
        this.pos.y = y;
        this.last.x = x;
        this.last.y = y;
        this.vel.x = proto.vel.x;
        this.vel.y = proto.vel.y;
        this.accel.x = proto.accel.x;
        this.accel.y = proto.accel.y;
        this.health = proto.health;
        this._killed = proto._killed;
        this.standing = proto.standing;
        this.type = proto.type;
        this.checkAgainst = proto.checkAgainst;
        this.collides = proto.collides;
        ig.merge(this, settings);
      },
      addAnim: function (name, frameTime, sequence, stop) {
        if (!this.animSheet) {
          throw "No animSheet to add the animation " + name + " to.";
        }
        var a = new ig.Animation(this.animSheet, frameTime, sequence, stop);
        this.anims[name] = a;
        if (!this.currentAnim) {
          this.currentAnim = a;
        }
        return a;
      },
      update: function () {
        this.last.x = this.pos.x;
        this.last.y = this.pos.y;
        this.vel.y += ig.game.gravity * ig.system.tick * this.gravityFactor;
        this.vel.x = this.getNewVelocity(
          this.vel.x,
          this.accel.x,
          this.friction.x,
          this.maxVel.x
        );
        this.vel.y = this.getNewVelocity(
          this.vel.y,
          this.accel.y,
          this.friction.y,
          this.maxVel.y
        );
        var mx = this.vel.x * ig.system.tick;
        var my = this.vel.y * ig.system.tick;
        var res = ig.game.collisionMap.trace(
          this.pos.x,
          this.pos.y,
          mx,
          my,
          this.size.x,
          this.size.y
        );
        this.handleMovementTrace(res);
        if (this.currentAnim) {
          this.currentAnim.update();
        }
      },
      getNewVelocity: function (vel, accel, friction, max) {
        if (accel) {
          return (vel + accel * ig.system.tick).limit(-max, max);
        } else if (friction) {
          var delta = friction * ig.system.tick;
          if (vel - delta > 0) {
            return vel - delta;
          } else if (vel + delta < 0) {
            return vel + delta;
          } else {
            return 0;
          }
        }
        return vel.limit(-max, max);
      },
      handleMovementTrace: function (res) {
        this.standing = false;
        if (res.collision.y) {
          if (
            this.bounciness > 0 &&
            Math.abs(this.vel.y) > this.minBounceVelocity
          ) {
            this.vel.y *= -this.bounciness;
          } else {
            if (this.vel.y > 0) {
              this.standing = true;
            }
            this.vel.y = 0;
          }
        }
        if (res.collision.x) {
          if (
            this.bounciness > 0 &&
            Math.abs(this.vel.x) > this.minBounceVelocity
          ) {
            this.vel.x *= -this.bounciness;
          } else {
            this.vel.x = 0;
          }
        }
        if (res.collision.slope) {
          var s = res.collision.slope;
          if (this.bounciness > 0) {
            var proj = this.vel.x * s.nx + this.vel.y * s.ny;
            this.vel.x = (this.vel.x - s.nx * proj * 2) * this.bounciness;
            this.vel.y = (this.vel.y - s.ny * proj * 2) * this.bounciness;
          } else {
            var lengthSquared = s.x * s.x + s.y * s.y;
            var dot = (this.vel.x * s.x + this.vel.y * s.y) / lengthSquared;
            this.vel.x = s.x * dot;
            this.vel.y = s.y * dot;
            var angle = Math.atan2(s.x, s.y);
            if (
              angle > this.slopeStanding.min &&
              angle < this.slopeStanding.max
            ) {
              this.standing = true;
            }
          }
        }
        this.pos = res.pos;
      },
      draw: function () {
        if (this.currentAnim) {
          this.currentAnim.draw(
            this.pos.x - this.offset.x - ig.game._rscreen.x,
            this.pos.y - this.offset.y - ig.game._rscreen.y
          );
        }
      },
      kill: function () {
        ig.game.removeEntity(this);
      },
      receiveDamage: function (amount, from) {
        this.health -= amount;
        if (this.health <= 0) {
          this.kill();
        }
      },
      touches: function (other) {
        return !(
          this.pos.x >= other.pos.x + other.size.x ||
          this.pos.x + this.size.x <= other.pos.x ||
          this.pos.y >= other.pos.y + other.size.y ||
          this.pos.y + this.size.y <= other.pos.y
        );
      },
      distanceTo: function (other) {
        var xd =
          this.pos.x + this.size.x / 2 - (other.pos.x + other.size.x / 2);
        var yd =
          this.pos.y + this.size.y / 2 - (other.pos.y + other.size.y / 2);
        return Math.sqrt(xd * xd + yd * yd);
      },
      angleTo: function (other) {
        return Math.atan2(
          other.pos.y + other.size.y / 2 - (this.pos.y + this.size.y / 2),
          other.pos.x + other.size.x / 2 - (this.pos.x + this.size.x / 2)
        );
      },
      check: function (other) {},
      collideWith: function (other, axis) {},
      ready: function () {},
      erase: function () {},
    });
    ig.Entity._lastId = 0;
    ig.Entity.COLLIDES = { NEVER: 0, LITE: 1, PASSIVE: 2, ACTIVE: 4, FIXED: 8 };
    ig.Entity.TYPE = { NONE: 0, A: 1, B: 2, BOTH: 3 };
    ig.Entity.checkPair = function (a, b) {
      if (a.checkAgainst & b.type) {
        a.check(b);
      }
      if (b.checkAgainst & a.type) {
        b.check(a);
      }
      if (
        a.collides &&
        b.collides &&
        a.collides + b.collides > ig.Entity.COLLIDES.ACTIVE
      ) {
        ig.Entity.solveCollision(a, b);
      }
    };
    ig.Entity.solveCollision = function (a, b) {
      var weak = null;
      if (
        a.collides == ig.Entity.COLLIDES.LITE ||
        b.collides == ig.Entity.COLLIDES.FIXED
      ) {
        weak = a;
      } else if (
        b.collides == ig.Entity.COLLIDES.LITE ||
        a.collides == ig.Entity.COLLIDES.FIXED
      ) {
        weak = b;
      }
      if (a.last.x + a.size.x > b.last.x && a.last.x < b.last.x + b.size.x) {
        if (a.last.y < b.last.y) {
          ig.Entity.seperateOnYAxis(a, b, weak);
        } else {
          ig.Entity.seperateOnYAxis(b, a, weak);
        }
        a.collideWith(b, "y");
        b.collideWith(a, "y");
      } else if (
        a.last.y + a.size.y > b.last.y &&
        a.last.y < b.last.y + b.size.y
      ) {
        if (a.last.x < b.last.x) {
          ig.Entity.seperateOnXAxis(a, b, weak);
        } else {
          ig.Entity.seperateOnXAxis(b, a, weak);
        }
        a.collideWith(b, "x");
        b.collideWith(a, "x");
      }
    };
    ig.Entity.seperateOnXAxis = function (left, right, weak) {
      var nudge = left.pos.x + left.size.x - right.pos.x;
      if (weak) {
        var strong = left === weak ? right : left;
        weak.vel.x = -weak.vel.x * weak.bounciness + strong.vel.x;
        var resWeak = ig.game.collisionMap.trace(
          weak.pos.x,
          weak.pos.y,
          weak == left ? -nudge : nudge,
          0,
          weak.size.x,
          weak.size.y
        );
        weak.pos.x = resWeak.pos.x;
      } else {
        var v2 = (left.vel.x - right.vel.x) / 2;
        left.vel.x = -v2;
        right.vel.x = v2;
        var resLeft = ig.game.collisionMap.trace(
          left.pos.x,
          left.pos.y,
          -nudge / 2,
          0,
          left.size.x,
          left.size.y
        );
        left.pos.x = Math.floor(resLeft.pos.x);
        var resRight = ig.game.collisionMap.trace(
          right.pos.x,
          right.pos.y,
          nudge / 2,
          0,
          right.size.x,
          right.size.y
        );
        right.pos.x = Math.ceil(resRight.pos.x);
      }
    };
    ig.Entity.seperateOnYAxis = function (top, bottom, weak) {
      var nudge = top.pos.y + top.size.y - bottom.pos.y;
      if (weak) {
        var strong = top === weak ? bottom : top;
        weak.vel.y = -weak.vel.y * weak.bounciness + strong.vel.y;
        var nudgeX = 0;
        if (
          weak == top &&
          Math.abs(weak.vel.y - strong.vel.y) < weak.minBounceVelocity
        ) {
          weak.standing = true;
          nudgeX = strong.vel.x * ig.system.tick;
        }
        var resWeak = ig.game.collisionMap.trace(
          weak.pos.x,
          weak.pos.y,
          nudgeX,
          weak == top ? -nudge : nudge,
          weak.size.x,
          weak.size.y
        );
        weak.pos.y = resWeak.pos.y;
        weak.pos.x = resWeak.pos.x;
      } else if (ig.game.gravity && (bottom.standing || top.vel.y > 0)) {
        var resTop = ig.game.collisionMap.trace(
          top.pos.x,
          top.pos.y,
          0,
          -(top.pos.y + top.size.y - bottom.pos.y),
          top.size.x,
          top.size.y
        );
        top.pos.y = resTop.pos.y;
        if (top.bounciness > 0 && top.vel.y > top.minBounceVelocity) {
          top.vel.y *= -top.bounciness;
        } else {
          top.standing = true;
          top.vel.y = 0;
        }
      } else {
        var v2 = (top.vel.y - bottom.vel.y) / 2;
        top.vel.y = -v2;
        bottom.vel.y = v2;
        var nudgeX = bottom.vel.x * ig.system.tick;
        var resTop = ig.game.collisionMap.trace(
          top.pos.x,
          top.pos.y,
          nudgeX,
          -nudge / 2,
          top.size.x,
          top.size.y
        );
        top.pos.y = resTop.pos.y;
        var resBottom = ig.game.collisionMap.trace(
          bottom.pos.x,
          bottom.pos.y,
          0,
          nudge / 2,
          bottom.size.x,
          bottom.size.y
        );
        bottom.pos.y = resBottom.pos.y;
      }
    };
  });
ig.baked = true;
ig.module("impact.map").defines(function () {
  "use strict";
  ig.Map = ig.Class.extend({
    tilesize: 8,
    width: 1,
    height: 1,
    data: [[]],
    name: null,
    init: function (tilesize, data) {
      this.tilesize = tilesize;
      this.data = data;
      this.height = data.length;
      this.width = data[0].length;
      this.pxWidth = this.width * this.tilesize;
      this.pxHeight = this.height * this.tilesize;
    },
    getTile: function (x, y) {
      var tx = Math.floor(x / this.tilesize);
      var ty = Math.floor(y / this.tilesize);
      if (tx >= 0 && tx < this.width && ty >= 0 && ty < this.height) {
        return this.data[ty][tx];
      } else {
        return 0;
      }
    },
    setTile: function (x, y, tile) {
      var tx = Math.floor(x / this.tilesize);
      var ty = Math.floor(y / this.tilesize);
      if (tx >= 0 && tx < this.width && ty >= 0 && ty < this.height) {
        this.data[ty][tx] = tile;
      }
    },
  });
});
ig.baked = true;
ig.module("impact.collision-map")
  .requires("impact.map")
  .defines(function () {
    "use strict";
    ig.CollisionMap = ig.Map.extend({
      lastSlope: 1,
      tiledef: null,
      init: function (tilesize, data, tiledef) {
        this.parent(tilesize, data);
        this.tiledef = tiledef || ig.CollisionMap.defaultTileDef;
        for (var t in this.tiledef) {
          if (t | (0 > this.lastSlope)) {
            this.lastSlope = t | 0;
          }
        }
      },
      trace: function (x, y, vx, vy, objectWidth, objectHeight) {
        var res = {
          collision: { x: false, y: false, slope: false },
          pos: { x: x, y: y },
          tile: { x: 0, y: 0 },
        };
        var steps = Math.ceil(
          Math.max(Math.abs(vx), Math.abs(vy)) / this.tilesize
        );
        if (steps > 1) {
          var sx = vx / steps;
          var sy = vy / steps;
          for (var i = 0; i < steps && (sx || sy); i++) {
            this._traceStep(
              res,
              x,
              y,
              sx,
              sy,
              objectWidth,
              objectHeight,
              vx,
              vy,
              i
            );
            x = res.pos.x;
            y = res.pos.y;
            if (res.collision.x) {
              sx = 0;
              vx = 0;
            }
            if (res.collision.y) {
              sy = 0;
              vy = 0;
            }
            if (res.collision.slope) {
              break;
            }
          }
        } else {
          this._traceStep(
            res,
            x,
            y,
            vx,
            vy,
            objectWidth,
            objectHeight,
            vx,
            vy,
            0
          );
        }
        return res;
      },
      _traceStep: function (res, x, y, vx, vy, width, height, rvx, rvy, step) {
        res.pos.x += vx;
        res.pos.y += vy;
        var t = 0;
        if (vx) {
          var pxOffsetX = vx > 0 ? width : 0;
          var tileOffsetX = vx < 0 ? this.tilesize : 0;
          var firstTileY = Math.max(Math.floor(y / this.tilesize), 0);
          var lastTileY = Math.min(
            Math.ceil((y + height) / this.tilesize),
            this.height
          );
          var tileX = Math.floor((res.pos.x + pxOffsetX) / this.tilesize);
          var prevTileX = Math.floor((x + pxOffsetX) / this.tilesize);
          if (
            step > 0 ||
            tileX == prevTileX ||
            prevTileX < 0 ||
            prevTileX >= this.width
          ) {
            prevTileX = -1;
          }
          if (tileX >= 0 && tileX < this.width) {
            for (var tileY = firstTileY; tileY < lastTileY; tileY++) {
              if (prevTileX != -1) {
                t = this.data[tileY][prevTileX];
                if (
                  t > 1 &&
                  t <= this.lastSlope &&
                  this._checkTileDef(
                    res,
                    t,
                    x,
                    y,
                    rvx,
                    rvy,
                    width,
                    height,
                    prevTileX,
                    tileY
                  )
                ) {
                  break;
                }
              }
              t = this.data[tileY][tileX];
              if (
                t == 1 ||
                t > this.lastSlope ||
                (t > 1 &&
                  this._checkTileDef(
                    res,
                    t,
                    x,
                    y,
                    rvx,
                    rvy,
                    width,
                    height,
                    tileX,
                    tileY
                  ))
              ) {
                if (t > 1 && t <= this.lastSlope && res.collision.slope) {
                  break;
                }
                res.collision.x = true;
                res.tile.x = t;
                x = res.pos.x = tileX * this.tilesize - pxOffsetX + tileOffsetX;
                rvx = 0;
                break;
              }
            }
          }
        }
        if (vy) {
          var pxOffsetY = vy > 0 ? height : 0;
          var tileOffsetY = vy < 0 ? this.tilesize : 0;
          var firstTileX = Math.max(Math.floor(res.pos.x / this.tilesize), 0);
          var lastTileX = Math.min(
            Math.ceil((res.pos.x + width) / this.tilesize),
            this.width
          );
          var tileY = Math.floor((res.pos.y + pxOffsetY) / this.tilesize);
          var prevTileY = Math.floor((y + pxOffsetY) / this.tilesize);
          if (
            step > 0 ||
            tileY == prevTileY ||
            prevTileY < 0 ||
            prevTileY >= this.height
          ) {
            prevTileY = -1;
          }
          if (tileY >= 0 && tileY < this.height) {
            for (var tileX = firstTileX; tileX < lastTileX; tileX++) {
              if (prevTileY != -1) {
                t = this.data[prevTileY][tileX];
                if (
                  t > 1 &&
                  t <= this.lastSlope &&
                  this._checkTileDef(
                    res,
                    t,
                    x,
                    y,
                    rvx,
                    rvy,
                    width,
                    height,
                    tileX,
                    prevTileY
                  )
                ) {
                  break;
                }
              }
              t = this.data[tileY][tileX];
              if (
                t == 1 ||
                t > this.lastSlope ||
                (t > 1 &&
                  this._checkTileDef(
                    res,
                    t,
                    x,
                    y,
                    rvx,
                    rvy,
                    width,
                    height,
                    tileX,
                    tileY
                  ))
              ) {
                if (t > 1 && t <= this.lastSlope && res.collision.slope) {
                  break;
                }
                res.collision.y = true;
                res.tile.y = t;
                res.pos.y = tileY * this.tilesize - pxOffsetY + tileOffsetY;
                break;
              }
            }
          }
        }
      },
      _checkTileDef: function (
        res,
        t,
        x,
        y,
        vx,
        vy,
        width,
        height,
        tileX,
        tileY
      ) {
        var def = this.tiledef[t];
        if (!def) {
          return false;
        }
        var lx = (tileX + def[0]) * this.tilesize,
          ly = (tileY + def[1]) * this.tilesize,
          lvx = (def[2] - def[0]) * this.tilesize,
          lvy = (def[3] - def[1]) * this.tilesize,
          solid = def[4];
        var tx = x + vx + (lvy < 0 ? width : 0) - lx,
          ty = y + vy + (lvx > 0 ? height : 0) - ly;
        if (lvx * ty - lvy * tx > 0) {
          if (vx * -lvy + vy * lvx < 0) {
            return solid;
          }
          var length = Math.sqrt(lvx * lvx + lvy * lvy);
          var nx = lvy / length,
            ny = -lvx / length;
          var proj = tx * nx + ty * ny;
          var px = nx * proj,
            py = ny * proj;
          if (px * px + py * py >= vx * vx + vy * vy) {
            return solid || lvx * (ty - vy) - lvy * (tx - vx) < 0.5;
          }
          res.pos.x = x + vx - px;
          res.pos.y = y + vy - py;
          res.collision.slope = { x: lvx, y: lvy, nx: nx, ny: ny };
          return true;
        }
        return false;
      },
    });
    var H = 1 / 2,
      N = 1 / 3,
      M = 2 / 3,
      SOLID = true,
      NON_SOLID = false;
    ig.CollisionMap.defaultTileDef = {
      5: [0, 1, 1, M, SOLID],
      6: [0, M, 1, N, SOLID],
      7: [0, N, 1, 0, SOLID],
      3: [0, 1, 1, H, SOLID],
      4: [0, H, 1, 0, SOLID],
      2: [0, 1, 1, 0, SOLID],
      10: [H, 1, 1, 0, SOLID],
      21: [0, 1, H, 0, SOLID],
      32: [M, 1, 1, 0, SOLID],
      43: [N, 1, M, 0, SOLID],
      54: [0, 1, N, 0, SOLID],
      27: [0, 0, 1, N, SOLID],
      28: [0, N, 1, M, SOLID],
      29: [0, M, 1, 1, SOLID],
      25: [0, 0, 1, H, SOLID],
      26: [0, H, 1, 1, SOLID],
      24: [0, 0, 1, 1, SOLID],
      11: [0, 0, H, 1, SOLID],
      22: [H, 0, 1, 1, SOLID],
      33: [0, 0, N, 1, SOLID],
      44: [N, 0, M, 1, SOLID],
      55: [M, 0, 1, 1, SOLID],
      16: [1, N, 0, 0, SOLID],
      17: [1, M, 0, N, SOLID],
      18: [1, 1, 0, M, SOLID],
      14: [1, H, 0, 0, SOLID],
      15: [1, 1, 0, H, SOLID],
      13: [1, 1, 0, 0, SOLID],
      8: [H, 1, 0, 0, SOLID],
      19: [1, 1, H, 0, SOLID],
      30: [N, 1, 0, 0, SOLID],
      41: [M, 1, N, 0, SOLID],
      52: [1, 1, M, 0, SOLID],
      38: [1, M, 0, 1, SOLID],
      39: [1, N, 0, M, SOLID],
      40: [1, 0, 0, N, SOLID],
      36: [1, H, 0, 1, SOLID],
      37: [1, 0, 0, H, SOLID],
      35: [1, 0, 0, 1, SOLID],
      9: [1, 0, H, 1, SOLID],
      20: [H, 0, 0, 1, SOLID],
      31: [1, 0, M, 1, SOLID],
      42: [M, 0, N, 1, SOLID],
      53: [N, 0, 0, 1, SOLID],
      12: [0, 0, 1, 0, NON_SOLID],
      23: [1, 1, 0, 1, NON_SOLID],
      34: [1, 0, 1, 1, NON_SOLID],
      45: [0, 1, 0, 0, NON_SOLID],
    };
    ig.CollisionMap.staticNoCollision = {
      trace: function (x, y, vx, vy) {
        return {
          collision: { x: false, y: false, slope: false },
          pos: { x: x + vx, y: y + vy },
          tile: { x: 0, y: 0 },
        };
      },
    };
  });
ig.baked = true;
ig.module("impact.background-map")
  .requires("impact.map", "impact.image")
  .defines(function () {
    "use strict";
    ig.BackgroundMap = ig.Map.extend({
      tiles: null,
      scroll: { x: 0, y: 0 },
      distance: 1,
      repeat: false,
      tilesetName: "",
      foreground: false,
      enabled: true,
      preRender: false,
      preRenderedChunks: null,
      chunkSize: 512,
      debugChunks: false,
      anims: {},
      init: function (tilesize, data, tileset) {
        this.parent(tilesize, data);
        this.setTileset(tileset);
      },
      setTileset: function (tileset) {
        this.tilesetName = tileset instanceof ig.Image ? tileset.path : tileset;
        this.tiles = new ig.Image(this.tilesetName);
        this.preRenderedChunks = null;
      },
      setScreenPos: function (x, y) {
        this.scroll.x = x / this.distance;
        this.scroll.y = y / this.distance;
      },
      preRenderMapToChunks: function () {
        var totalWidth = this.width * this.tilesize * ig.system.scale,
          totalHeight = this.height * this.tilesize * ig.system.scale;
        this.chunkSize = Math.min(
          Math.max(totalWidth, totalHeight),
          this.chunkSize
        );
        var chunkCols = Math.ceil(totalWidth / this.chunkSize),
          chunkRows = Math.ceil(totalHeight / this.chunkSize);
        this.preRenderedChunks = [];
        for (var y = 0; y < chunkRows; y++) {
          this.preRenderedChunks[y] = [];
          for (var x = 0; x < chunkCols; x++) {
            var chunkWidth =
              x == chunkCols - 1
                ? totalWidth - x * this.chunkSize
                : this.chunkSize;
            var chunkHeight =
              y == chunkRows - 1
                ? totalHeight - y * this.chunkSize
                : this.chunkSize;
            this.preRenderedChunks[y][x] = this.preRenderChunk(
              x,
              y,
              chunkWidth,
              chunkHeight
            );
          }
        }
      },
      preRenderChunk: function (cx, cy, w, h) {
        var tw = w / this.tilesize / ig.system.scale + 1,
          th = h / this.tilesize / ig.system.scale + 1;
        var nx = ((cx * this.chunkSize) / ig.system.scale) % this.tilesize,
          ny = ((cy * this.chunkSize) / ig.system.scale) % this.tilesize;
        var tx = Math.floor(
            (cx * this.chunkSize) / this.tilesize / ig.system.scale
          ),
          ty = Math.floor(
            (cy * this.chunkSize) / this.tilesize / ig.system.scale
          );
        var chunk = ig.$new("canvas");
        chunk.width = w;
        chunk.height = h;
        chunk.retinaResolutionEnabled = false;
        var chunkContext = chunk.getContext("2d");
        ig.System.scaleMode(chunk, chunkContext);
        var screenContext = ig.system.context;
        ig.system.context = chunkContext;
        for (var x = 0; x < tw; x++) {
          for (var y = 0; y < th; y++) {
            if (x + tx < this.width && y + ty < this.height) {
              var tile = this.data[y + ty][x + tx];
              if (tile) {
                this.tiles.drawTile(
                  x * this.tilesize - nx,
                  y * this.tilesize - ny,
                  tile - 1,
                  this.tilesize
                );
              }
            }
          }
        }
        ig.system.context = screenContext;
        return chunk;
      },
      draw: function () {
        if (!this.tiles.loaded || !this.enabled) {
          return;
        }
        if (this.preRender) {
          this.drawPreRendered();
        } else {
          this.drawTiled();
        }
      },
      drawPreRendered: function () {
        if (!this.preRenderedChunks) {
          this.preRenderMapToChunks();
        }
        var dx = ig.system.getDrawPos(this.scroll.x),
          dy = ig.system.getDrawPos(this.scroll.y);
        if (this.repeat) {
          var w = this.width * this.tilesize * ig.system.scale;
          dx = ((dx % w) + w) % w;
          var h = this.height * this.tilesize * ig.system.scale;
          dy = ((dy % h) + h) % h;
        }
        var minChunkX = Math.max(Math.floor(dx / this.chunkSize), 0),
          minChunkY = Math.max(Math.floor(dy / this.chunkSize), 0),
          maxChunkX = Math.ceil((dx + ig.system.realWidth) / this.chunkSize),
          maxChunkY = Math.ceil((dy + ig.system.realHeight) / this.chunkSize),
          maxRealChunkX = this.preRenderedChunks[0].length,
          maxRealChunkY = this.preRenderedChunks.length;
        if (!this.repeat) {
          maxChunkX = Math.min(maxChunkX, maxRealChunkX);
          maxChunkY = Math.min(maxChunkY, maxRealChunkY);
        }
        var nudgeY = 0;
        for (var cy = minChunkY; cy < maxChunkY; cy++) {
          var nudgeX = 0;
          for (var cx = minChunkX; cx < maxChunkX; cx++) {
            var chunk =
              this.preRenderedChunks[cy % maxRealChunkY][cx % maxRealChunkX];
            var x = -dx + cx * this.chunkSize - nudgeX;
            var y = -dy + cy * this.chunkSize - nudgeY;
            ig.system.context.drawImage(chunk, x, y);
            ig.Image.drawCount++;
            if (this.debugChunks) {
              ig.system.context.strokeStyle = "#f0f";
              ig.system.context.strokeRect(
                x,
                y,
                this.chunkSize,
                this.chunkSize
              );
            }
            if (
              this.repeat &&
              chunk.width < this.chunkSize &&
              x + chunk.width < ig.system.realWidth
            ) {
              nudgeX += this.chunkSize - chunk.width;
              maxChunkX++;
            }
          }
          if (
            this.repeat &&
            chunk.height < this.chunkSize &&
            y + chunk.height < ig.system.realHeight
          ) {
            nudgeY += this.chunkSize - chunk.height;
            maxChunkY++;
          }
        }
      },
      drawTiled: function () {
        var tile = 0,
          anim = null,
          tileOffsetX = (this.scroll.x / this.tilesize).toInt(),
          tileOffsetY = (this.scroll.y / this.tilesize).toInt(),
          pxOffsetX = this.scroll.x % this.tilesize,
          pxOffsetY = this.scroll.y % this.tilesize,
          pxMinX = -pxOffsetX - this.tilesize,
          pxMinY = -pxOffsetY - this.tilesize,
          pxMaxX = ig.system.width + this.tilesize - pxOffsetX,
          pxMaxY = ig.system.height + this.tilesize - pxOffsetY;
        for (
          var mapY = -1, pxY = pxMinY;
          pxY < pxMaxY;
          mapY++, pxY += this.tilesize
        ) {
          var tileY = mapY + tileOffsetY;
          if (tileY >= this.height || tileY < 0) {
            if (!this.repeat) {
              continue;
            }
            tileY = ((tileY % this.height) + this.height) % this.height;
          }
          for (
            var mapX = -1, pxX = pxMinX;
            pxX < pxMaxX;
            mapX++, pxX += this.tilesize
          ) {
            var tileX = mapX + tileOffsetX;
            if (tileX >= this.width || tileX < 0) {
              if (!this.repeat) {
                continue;
              }
              tileX = ((tileX % this.width) + this.width) % this.width;
            }
            if ((tile = this.data[tileY][tileX])) {
              if ((anim = this.anims[tile - 1])) {
                anim.draw(pxX, pxY);
              } else {
                this.tiles.drawTile(pxX, pxY, tile - 1, this.tilesize);
              }
            }
          }
        }
      },
    });
  });
ig.baked = true;
ig.module("impact.game")
  .requires(
    "impact.impact",
    "impact.entity",
    "impact.collision-map",
    "impact.background-map"
  )
  .defines(function () {
    "use strict";
    ig.Game = ig.Class.extend({
      clearColor: "#000000",
      gravity: 0,
      screen: { x: 0, y: 0 },
      _rscreen: { x: 0, y: 0 },
      entities: [],
      namedEntities: {},
      collisionMap: ig.CollisionMap.staticNoCollision,
      backgroundMaps: [],
      backgroundAnims: {},
      autoSort: false,
      sortBy: null,
      cellSize: 64,
      _deferredKill: [],
      _levelToLoad: null,
      _doSortEntities: false,
      staticInstantiate: function () {
        this.sortBy = this.sortBy || ig.Game.SORT.Z_INDEX;
        ig.game = this;
        return null;
      },
      loadLevel: function (data) {
        this.screen = { x: 0, y: 0 };
        this.entities = [];
        this.namedEntities = {};
        for (var i = 0; i < data.entities.length; i++) {
          var ent = data.entities[i];
          this.spawnEntity(ent.type, ent.x, ent.y, ent.settings);
        }
        this.sortEntities();
        this.collisionMap = ig.CollisionMap.staticNoCollision;
        this.backgroundMaps = [];
        for (var i = 0; i < data.layer.length; i++) {
          var ld = data.layer[i];
          if (ld.name == "collision") {
            this.collisionMap = new ig.CollisionMap(ld.tilesize, ld.data);
          } else {
            var newMap = new ig.BackgroundMap(
              ld.tilesize,
              ld.data,
              ld.tilesetName
            );
            newMap.anims = this.backgroundAnims[ld.tilesetName] || {};
            newMap.repeat = ld.repeat;
            newMap.distance = ld.distance;
            newMap.foreground = !!ld.foreground;
            newMap.preRender = !!ld.preRender;
            newMap.name = ld.name;
            this.backgroundMaps.push(newMap);
          }
        }
        for (var i = 0; i < this.entities.length; i++) {
          this.entities[i].ready();
        }
      },
      loadLevelDeferred: function (data) {
        this._levelToLoad = data;
      },
      getMapByName: function (name) {
        if (name == "collision") {
          return this.collisionMap;
        }
        for (var i = 0; i < this.backgroundMaps.length; i++) {
          if (this.backgroundMaps[i].name == name) {
            return this.backgroundMaps[i];
          }
        }
        return null;
      },
      getEntityByName: function (name) {
        return this.namedEntities[name];
      },
      getEntitiesByType: function (type) {
        var entityClass = typeof type === "string" ? ig.global[type] : type;
        var a = [];
        for (var i = 0; i < this.entities.length; i++) {
          var ent = this.entities[i];
          if (ent instanceof entityClass && !ent._killed) {
            a.push(ent);
          }
        }
        return a;
      },
      spawnEntity: function (type, x, y, settings) {
        var entityClass = typeof type === "string" ? ig.global[type] : type;
        if (!entityClass) {
          throw "Can't spawn entity of type " + type;
        }
        var ent = new entityClass(x, y, settings || {});
        this.entities.push(ent);
        if (ent.name) {
          this.namedEntities[ent.name] = ent;
        }
        return ent;
      },
      sortEntities: function () {
        this.entities.sort(this.sortBy);
      },
      sortEntitiesDeferred: function () {
        this._doSortEntities = true;
      },
      removeEntity: function (ent) {
        if (ent.name) {
          delete this.namedEntities[ent.name];
        }
        ent._killed = true;
        ent.type = ig.Entity.TYPE.NONE;
        ent.checkAgainst = ig.Entity.TYPE.NONE;
        ent.collides = ig.Entity.COLLIDES.NEVER;
        this._deferredKill.push(ent);
      },
      run: function () {
        this.update();
        this.draw();
      },
      update: function () {
        if (this._levelToLoad) {
          this.loadLevel(this._levelToLoad);
          this._levelToLoad = null;
        }
        this.updateEntities();
        this.checkEntities();
        for (var i = 0; i < this._deferredKill.length; i++) {
          this._deferredKill[i].erase();
          this.entities.erase(this._deferredKill[i]);
        }
        this._deferredKill = [];
        if (this._doSortEntities || this.autoSort) {
          this.sortEntities();
          this._doSortEntities = false;
        }
        for (var tileset in this.backgroundAnims) {
          var anims = this.backgroundAnims[tileset];
          for (var a in anims) {
            anims[a].update();
          }
        }
      },
      updateEntities: function () {
        for (var i = 0; i < this.entities.length; i++) {
          var ent = this.entities[i];
          if (!ent._killed) {
            ent.update();
          }
        }
      },
      draw: function () {
        if (this.clearColor) {
          ig.system.clear(this.clearColor);
        }
        this._rscreen.x = ig.system.getDrawPos(this.screen.x) / ig.system.scale;
        this._rscreen.y = ig.system.getDrawPos(this.screen.y) / ig.system.scale;
        var mapIndex;
        for (mapIndex = 0; mapIndex < this.backgroundMaps.length; mapIndex++) {
          var map = this.backgroundMaps[mapIndex];
          if (map.foreground) {
            break;
          }
          map.setScreenPos(this.screen.x, this.screen.y);
          map.draw();
        }
        this.drawEntities();
        for (mapIndex; mapIndex < this.backgroundMaps.length; mapIndex++) {
          var map = this.backgroundMaps[mapIndex];
          map.setScreenPos(this.screen.x, this.screen.y);
          map.draw();
        }
      },
      drawEntities: function () {
        for (var i = 0; i < this.entities.length; i++) {
          this.entities[i].draw();
        }
      },
      checkEntities: function () {
        var hash = {};
        for (var e = 0; e < this.entities.length; e++) {
          var entity = this.entities[e];
          if (
            entity.type == ig.Entity.TYPE.NONE &&
            entity.checkAgainst == ig.Entity.TYPE.NONE &&
            entity.collides == ig.Entity.COLLIDES.NEVER
          ) {
            continue;
          }
          var checked = {},
            xmin = Math.floor(entity.pos.x / this.cellSize),
            ymin = Math.floor(entity.pos.y / this.cellSize),
            xmax =
              Math.floor((entity.pos.x + entity.size.x) / this.cellSize) + 1,
            ymax =
              Math.floor((entity.pos.y + entity.size.y) / this.cellSize) + 1;
          for (var x = xmin; x < xmax; x++) {
            for (var y = ymin; y < ymax; y++) {
              if (!hash[x]) {
                hash[x] = {};
                hash[x][y] = [entity];
              } else if (!hash[x][y]) {
                hash[x][y] = [entity];
              } else {
                var cell = hash[x][y];
                for (var c = 0; c < cell.length; c++) {
                  if (entity.touches(cell[c]) && !checked[cell[c].id]) {
                    checked[cell[c].id] = true;
                    ig.Entity.checkPair(entity, cell[c]);
                  }
                }
                cell.push(entity);
              }
            }
          }
        }
      },
    });
    ig.Game.SORT = {
      Z_INDEX: function (a, b) {
        return a.zIndex - b.zIndex;
      },
      POS_X: function (a, b) {
        return a.pos.x + a.size.x - (b.pos.x + b.size.x);
      },
      POS_Y: function (a, b) {
        return a.pos.y + a.size.y - (b.pos.y + b.size.y);
      },
    };
  });
(function (e) {
  "use strict";
  var t = {};
  typeof exports == "undefined"
    ? typeof define == "function" && typeof define.amd == "object" && define.amd
      ? ((t.exports = {}),
        define(function () {
          return t.exports;
        }))
      : (t.exports = typeof window != "undefined" ? window : e)
    : (t.exports = exports),
    (function (e) {
      if (!t) var t = 1e-6;
      if (!n) var n = typeof Float32Array != "undefined" ? Float32Array : Array;
      if (!r) var r = Math.random;
      var i = {};
      (i.setMatrixArrayType = function (e) {
        n = e;
      }),
        typeof e != "undefined" && (e.glMatrix = i);
      var s = {};
      (s.create = function () {
        var e = new n(2);
        return (e[0] = 0), (e[1] = 0), e;
      }),
        (s.clone = function (e) {
          var t = new n(2);
          return (t[0] = e[0]), (t[1] = e[1]), t;
        }),
        (s.fromValues = function (e, t) {
          var r = new n(2);
          return (r[0] = e), (r[1] = t), r;
        }),
        (s.copy = function (e, t) {
          return (e[0] = t[0]), (e[1] = t[1]), e;
        }),
        (s.set = function (e, t, n) {
          return (e[0] = t), (e[1] = n), e;
        }),
        (s.add = function (e, t, n) {
          return (e[0] = t[0] + n[0]), (e[1] = t[1] + n[1]), e;
        }),
        (s.subtract = function (e, t, n) {
          return (e[0] = t[0] - n[0]), (e[1] = t[1] - n[1]), e;
        }),
        (s.sub = s.subtract),
        (s.multiply = function (e, t, n) {
          return (e[0] = t[0] * n[0]), (e[1] = t[1] * n[1]), e;
        }),
        (s.mul = s.multiply),
        (s.divide = function (e, t, n) {
          return (e[0] = t[0] / n[0]), (e[1] = t[1] / n[1]), e;
        }),
        (s.div = s.divide),
        (s.min = function (e, t, n) {
          return (
            (e[0] = Math.min(t[0], n[0])), (e[1] = Math.min(t[1], n[1])), e
          );
        }),
        (s.max = function (e, t, n) {
          return (
            (e[0] = Math.max(t[0], n[0])), (e[1] = Math.max(t[1], n[1])), e
          );
        }),
        (s.scale = function (e, t, n) {
          return (e[0] = t[0] * n), (e[1] = t[1] * n), e;
        }),
        (s.scaleAndAdd = function (e, t, n, r) {
          return (e[0] = t[0] + n[0] * r), (e[1] = t[1] + n[1] * r), e;
        }),
        (s.distance = function (e, t) {
          var n = t[0] - e[0],
            r = t[1] - e[1];
          return Math.sqrt(n * n + r * r);
        }),
        (s.dist = s.distance),
        (s.squaredDistance = function (e, t) {
          var n = t[0] - e[0],
            r = t[1] - e[1];
          return n * n + r * r;
        }),
        (s.sqrDist = s.squaredDistance),
        (s.length = function (e) {
          var t = e[0],
            n = e[1];
          return Math.sqrt(t * t + n * n);
        }),
        (s.len = s.length),
        (s.squaredLength = function (e) {
          var t = e[0],
            n = e[1];
          return t * t + n * n;
        }),
        (s.sqrLen = s.squaredLength),
        (s.negate = function (e, t) {
          return (e[0] = -t[0]), (e[1] = -t[1]), e;
        }),
        (s.normalize = function (e, t) {
          var n = t[0],
            r = t[1],
            i = n * n + r * r;
          return (
            i > 0 &&
              ((i = 1 / Math.sqrt(i)), (e[0] = t[0] * i), (e[1] = t[1] * i)),
            e
          );
        }),
        (s.dot = function (e, t) {
          return e[0] * t[0] + e[1] * t[1];
        }),
        (s.cross = function (e, t, n) {
          var r = t[0] * n[1] - t[1] * n[0];
          return (e[0] = e[1] = 0), (e[2] = r), e;
        }),
        (s.lerp = function (e, t, n, r) {
          var i = t[0],
            s = t[1];
          return (e[0] = i + r * (n[0] - i)), (e[1] = s + r * (n[1] - s)), e;
        }),
        (s.random = function (e, t) {
          t = t || 1;
          var n = r() * 2 * Math.PI;
          return (e[0] = Math.cos(n) * t), (e[1] = Math.sin(n) * t), e;
        }),
        (s.transformMat2 = function (e, t, n) {
          var r = t[0],
            i = t[1];
          return (e[0] = n[0] * r + n[2] * i), (e[1] = n[1] * r + n[3] * i), e;
        }),
        (s.transformMat2d = function (e, t, n) {
          var r = t[0],
            i = t[1];
          return (
            (e[0] = n[0] * r + n[2] * i + n[4]),
            (e[1] = n[1] * r + n[3] * i + n[5]),
            e
          );
        }),
        (s.transformMat3 = function (e, t, n) {
          var r = t[0],
            i = t[1];
          return (
            (e[0] = n[0] * r + n[3] * i + n[6]),
            (e[1] = n[1] * r + n[4] * i + n[7]),
            e
          );
        }),
        (s.transformMat4 = function (e, t, n) {
          var r = t[0],
            i = t[1];
          return (
            (e[0] = n[0] * r + n[4] * i + n[12]),
            (e[1] = n[1] * r + n[5] * i + n[13]),
            e
          );
        }),
        (s.forEach = (function () {
          var e = s.create();
          return function (t, n, r, i, s, o) {
            var u, a;
            n || (n = 2),
              r || (r = 0),
              i ? (a = Math.min(i * n + r, t.length)) : (a = t.length);
            for (u = r; u < a; u += n)
              (e[0] = t[u]),
                (e[1] = t[u + 1]),
                s(e, e, o),
                (t[u] = e[0]),
                (t[u + 1] = e[1]);
            return t;
          };
        })()),
        (s.str = function (e) {
          return "vec2(" + e[0] + ", " + e[1] + ")";
        }),
        typeof e != "undefined" && (e.vec2 = s);
      var o = {};
      (o.create = function () {
        var e = new n(3);
        return (e[0] = 0), (e[1] = 0), (e[2] = 0), e;
      }),
        (o.clone = function (e) {
          var t = new n(3);
          return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), t;
        }),
        (o.fromValues = function (e, t, r) {
          var i = new n(3);
          return (i[0] = e), (i[1] = t), (i[2] = r), i;
        }),
        (o.copy = function (e, t) {
          return (e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), e;
        }),
        (o.set = function (e, t, n, r) {
          return (e[0] = t), (e[1] = n), (e[2] = r), e;
        }),
        (o.add = function (e, t, n) {
          return (
            (e[0] = t[0] + n[0]), (e[1] = t[1] + n[1]), (e[2] = t[2] + n[2]), e
          );
        }),
        (o.subtract = function (e, t, n) {
          return (
            (e[0] = t[0] - n[0]), (e[1] = t[1] - n[1]), (e[2] = t[2] - n[2]), e
          );
        }),
        (o.sub = o.subtract),
        (o.multiply = function (e, t, n) {
          return (
            (e[0] = t[0] * n[0]), (e[1] = t[1] * n[1]), (e[2] = t[2] * n[2]), e
          );
        }),
        (o.mul = o.multiply),
        (o.divide = function (e, t, n) {
          return (
            (e[0] = t[0] / n[0]), (e[1] = t[1] / n[1]), (e[2] = t[2] / n[2]), e
          );
        }),
        (o.div = o.divide),
        (o.min = function (e, t, n) {
          return (
            (e[0] = Math.min(t[0], n[0])),
            (e[1] = Math.min(t[1], n[1])),
            (e[2] = Math.min(t[2], n[2])),
            e
          );
        }),
        (o.max = function (e, t, n) {
          return (
            (e[0] = Math.max(t[0], n[0])),
            (e[1] = Math.max(t[1], n[1])),
            (e[2] = Math.max(t[2], n[2])),
            e
          );
        }),
        (o.scale = function (e, t, n) {
          return (e[0] = t[0] * n), (e[1] = t[1] * n), (e[2] = t[2] * n), e;
        }),
        (o.scaleAndAdd = function (e, t, n, r) {
          return (
            (e[0] = t[0] + n[0] * r),
            (e[1] = t[1] + n[1] * r),
            (e[2] = t[2] + n[2] * r),
            e
          );
        }),
        (o.distance = function (e, t) {
          var n = t[0] - e[0],
            r = t[1] - e[1],
            i = t[2] - e[2];
          return Math.sqrt(n * n + r * r + i * i);
        }),
        (o.dist = o.distance),
        (o.squaredDistance = function (e, t) {
          var n = t[0] - e[0],
            r = t[1] - e[1],
            i = t[2] - e[2];
          return n * n + r * r + i * i;
        }),
        (o.sqrDist = o.squaredDistance),
        (o.length = function (e) {
          var t = e[0],
            n = e[1],
            r = e[2];
          return Math.sqrt(t * t + n * n + r * r);
        }),
        (o.len = o.length),
        (o.squaredLength = function (e) {
          var t = e[0],
            n = e[1],
            r = e[2];
          return t * t + n * n + r * r;
        }),
        (o.sqrLen = o.squaredLength),
        (o.negate = function (e, t) {
          return (e[0] = -t[0]), (e[1] = -t[1]), (e[2] = -t[2]), e;
        }),
        (o.normalize = function (e, t) {
          var n = t[0],
            r = t[1],
            i = t[2],
            s = n * n + r * r + i * i;
          return (
            s > 0 &&
              ((s = 1 / Math.sqrt(s)),
              (e[0] = t[0] * s),
              (e[1] = t[1] * s),
              (e[2] = t[2] * s)),
            e
          );
        }),
        (o.dot = function (e, t) {
          return e[0] * t[0] + e[1] * t[1] + e[2] * t[2];
        }),
        (o.cross = function (e, t, n) {
          var r = t[0],
            i = t[1],
            s = t[2],
            o = n[0],
            u = n[1],
            a = n[2];
          return (
            (e[0] = i * a - s * u),
            (e[1] = s * o - r * a),
            (e[2] = r * u - i * o),
            e
          );
        }),
        (o.lerp = function (e, t, n, r) {
          var i = t[0],
            s = t[1],
            o = t[2];
          return (
            (e[0] = i + r * (n[0] - i)),
            (e[1] = s + r * (n[1] - s)),
            (e[2] = o + r * (n[2] - o)),
            e
          );
        }),
        (o.random = function (e, t) {
          t = t || 1;
          var n = r() * 2 * Math.PI,
            i = r() * 2 - 1,
            s = Math.sqrt(1 - i * i) * t;
          return (
            (e[0] = Math.cos(n) * s),
            (e[1] = Math.sin(n) * s),
            (e[2] = i * t),
            e
          );
        }),
        (o.transformMat4 = function (e, t, n) {
          var r = t[0],
            i = t[1],
            s = t[2];
          return (
            (e[0] = n[0] * r + n[4] * i + n[8] * s + n[12]),
            (e[1] = n[1] * r + n[5] * i + n[9] * s + n[13]),
            (e[2] = n[2] * r + n[6] * i + n[10] * s + n[14]),
            e
          );
        }),
        (o.transformMat3 = function (e, t, n) {
          var r = t[0],
            i = t[1],
            s = t[2];
          return (
            (e[0] = r * n[0] + i * n[3] + s * n[6]),
            (e[1] = r * n[1] + i * n[4] + s * n[7]),
            (e[2] = r * n[2] + i * n[5] + s * n[8]),
            e
          );
        }),
        (o.transformQuat = function (e, t, n) {
          var r = t[0],
            i = t[1],
            s = t[2],
            o = n[0],
            u = n[1],
            a = n[2],
            f = n[3],
            l = f * r + u * s - a * i,
            c = f * i + a * r - o * s,
            h = f * s + o * i - u * r,
            p = -o * r - u * i - a * s;
          return (
            (e[0] = l * f + p * -o + c * -a - h * -u),
            (e[1] = c * f + p * -u + h * -o - l * -a),
            (e[2] = h * f + p * -a + l * -u - c * -o),
            e
          );
        }),
        (o.forEach = (function () {
          var e = o.create();
          return function (t, n, r, i, s, o) {
            var u, a;
            n || (n = 3),
              r || (r = 0),
              i ? (a = Math.min(i * n + r, t.length)) : (a = t.length);
            for (u = r; u < a; u += n)
              (e[0] = t[u]),
                (e[1] = t[u + 1]),
                (e[2] = t[u + 2]),
                s(e, e, o),
                (t[u] = e[0]),
                (t[u + 1] = e[1]),
                (t[u + 2] = e[2]);
            return t;
          };
        })()),
        (o.str = function (e) {
          return "vec3(" + e[0] + ", " + e[1] + ", " + e[2] + ")";
        }),
        typeof e != "undefined" && (e.vec3 = o);
      var u = {};
      (u.create = function () {
        var e = new n(4);
        return (e[0] = 0), (e[1] = 0), (e[2] = 0), (e[3] = 0), e;
      }),
        (u.clone = function (e) {
          var t = new n(4);
          return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), t;
        }),
        (u.fromValues = function (e, t, r, i) {
          var s = new n(4);
          return (s[0] = e), (s[1] = t), (s[2] = r), (s[3] = i), s;
        }),
        (u.copy = function (e, t) {
          return (e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), (e[3] = t[3]), e;
        }),
        (u.set = function (e, t, n, r, i) {
          return (e[0] = t), (e[1] = n), (e[2] = r), (e[3] = i), e;
        }),
        (u.add = function (e, t, n) {
          return (
            (e[0] = t[0] + n[0]),
            (e[1] = t[1] + n[1]),
            (e[2] = t[2] + n[2]),
            (e[3] = t[3] + n[3]),
            e
          );
        }),
        (u.subtract = function (e, t, n) {
          return (
            (e[0] = t[0] - n[0]),
            (e[1] = t[1] - n[1]),
            (e[2] = t[2] - n[2]),
            (e[3] = t[3] - n[3]),
            e
          );
        }),
        (u.sub = u.subtract),
        (u.multiply = function (e, t, n) {
          return (
            (e[0] = t[0] * n[0]),
            (e[1] = t[1] * n[1]),
            (e[2] = t[2] * n[2]),
            (e[3] = t[3] * n[3]),
            e
          );
        }),
        (u.mul = u.multiply),
        (u.divide = function (e, t, n) {
          return (
            (e[0] = t[0] / n[0]),
            (e[1] = t[1] / n[1]),
            (e[2] = t[2] / n[2]),
            (e[3] = t[3] / n[3]),
            e
          );
        }),
        (u.div = u.divide),
        (u.min = function (e, t, n) {
          return (
            (e[0] = Math.min(t[0], n[0])),
            (e[1] = Math.min(t[1], n[1])),
            (e[2] = Math.min(t[2], n[2])),
            (e[3] = Math.min(t[3], n[3])),
            e
          );
        }),
        (u.max = function (e, t, n) {
          return (
            (e[0] = Math.max(t[0], n[0])),
            (e[1] = Math.max(t[1], n[1])),
            (e[2] = Math.max(t[2], n[2])),
            (e[3] = Math.max(t[3], n[3])),
            e
          );
        }),
        (u.scale = function (e, t, n) {
          return (
            (e[0] = t[0] * n),
            (e[1] = t[1] * n),
            (e[2] = t[2] * n),
            (e[3] = t[3] * n),
            e
          );
        }),
        (u.scaleAndAdd = function (e, t, n, r) {
          return (
            (e[0] = t[0] + n[0] * r),
            (e[1] = t[1] + n[1] * r),
            (e[2] = t[2] + n[2] * r),
            (e[3] = t[3] + n[3] * r),
            e
          );
        }),
        (u.distance = function (e, t) {
          var n = t[0] - e[0],
            r = t[1] - e[1],
            i = t[2] - e[2],
            s = t[3] - e[3];
          return Math.sqrt(n * n + r * r + i * i + s * s);
        }),
        (u.dist = u.distance),
        (u.squaredDistance = function (e, t) {
          var n = t[0] - e[0],
            r = t[1] - e[1],
            i = t[2] - e[2],
            s = t[3] - e[3];
          return n * n + r * r + i * i + s * s;
        }),
        (u.sqrDist = u.squaredDistance),
        (u.length = function (e) {
          var t = e[0],
            n = e[1],
            r = e[2],
            i = e[3];
          return Math.sqrt(t * t + n * n + r * r + i * i);
        }),
        (u.len = u.length),
        (u.squaredLength = function (e) {
          var t = e[0],
            n = e[1],
            r = e[2],
            i = e[3];
          return t * t + n * n + r * r + i * i;
        }),
        (u.sqrLen = u.squaredLength),
        (u.negate = function (e, t) {
          return (
            (e[0] = -t[0]), (e[1] = -t[1]), (e[2] = -t[2]), (e[3] = -t[3]), e
          );
        }),
        (u.normalize = function (e, t) {
          var n = t[0],
            r = t[1],
            i = t[2],
            s = t[3],
            o = n * n + r * r + i * i + s * s;
          return (
            o > 0 &&
              ((o = 1 / Math.sqrt(o)),
              (e[0] = t[0] * o),
              (e[1] = t[1] * o),
              (e[2] = t[2] * o),
              (e[3] = t[3] * o)),
            e
          );
        }),
        (u.dot = function (e, t) {
          return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3];
        }),
        (u.lerp = function (e, t, n, r) {
          var i = t[0],
            s = t[1],
            o = t[2],
            u = t[3];
          return (
            (e[0] = i + r * (n[0] - i)),
            (e[1] = s + r * (n[1] - s)),
            (e[2] = o + r * (n[2] - o)),
            (e[3] = u + r * (n[3] - u)),
            e
          );
        }),
        (u.random = function (e, t) {
          return (
            (t = t || 1),
            (e[0] = r()),
            (e[1] = r()),
            (e[2] = r()),
            (e[3] = r()),
            u.normalize(e, e),
            u.scale(e, e, t),
            e
          );
        }),
        (u.transformMat4 = function (e, t, n) {
          var r = t[0],
            i = t[1],
            s = t[2],
            o = t[3];
          return (
            (e[0] = n[0] * r + n[4] * i + n[8] * s + n[12] * o),
            (e[1] = n[1] * r + n[5] * i + n[9] * s + n[13] * o),
            (e[2] = n[2] * r + n[6] * i + n[10] * s + n[14] * o),
            (e[3] = n[3] * r + n[7] * i + n[11] * s + n[15] * o),
            e
          );
        }),
        (u.transformQuat = function (e, t, n) {
          var r = t[0],
            i = t[1],
            s = t[2],
            o = n[0],
            u = n[1],
            a = n[2],
            f = n[3],
            l = f * r + u * s - a * i,
            c = f * i + a * r - o * s,
            h = f * s + o * i - u * r,
            p = -o * r - u * i - a * s;
          return (
            (e[0] = l * f + p * -o + c * -a - h * -u),
            (e[1] = c * f + p * -u + h * -o - l * -a),
            (e[2] = h * f + p * -a + l * -u - c * -o),
            e
          );
        }),
        (u.forEach = (function () {
          var e = u.create();
          return function (t, n, r, i, s, o) {
            var u, a;
            n || (n = 4),
              r || (r = 0),
              i ? (a = Math.min(i * n + r, t.length)) : (a = t.length);
            for (u = r; u < a; u += n)
              (e[0] = t[u]),
                (e[1] = t[u + 1]),
                (e[2] = t[u + 2]),
                (e[3] = t[u + 3]),
                s(e, e, o),
                (t[u] = e[0]),
                (t[u + 1] = e[1]),
                (t[u + 2] = e[2]),
                (t[u + 3] = e[3]);
            return t;
          };
        })()),
        (u.str = function (e) {
          return "vec4(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")";
        }),
        typeof e != "undefined" && (e.vec4 = u);
      var a = {};
      (a.create = function () {
        var e = new n(4);
        return (e[0] = 1), (e[1] = 0), (e[2] = 0), (e[3] = 1), e;
      }),
        (a.clone = function (e) {
          var t = new n(4);
          return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), t;
        }),
        (a.copy = function (e, t) {
          return (e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), (e[3] = t[3]), e;
        }),
        (a.identity = function (e) {
          return (e[0] = 1), (e[1] = 0), (e[2] = 0), (e[3] = 1), e;
        }),
        (a.transpose = function (e, t) {
          if (e === t) {
            var n = t[1];
            (e[1] = t[2]), (e[2] = n);
          } else (e[0] = t[0]), (e[1] = t[2]), (e[2] = t[1]), (e[3] = t[3]);
          return e;
        }),
        (a.invert = function (e, t) {
          var n = t[0],
            r = t[1],
            i = t[2],
            s = t[3],
            o = n * s - i * r;
          return o
            ? ((o = 1 / o),
              (e[0] = s * o),
              (e[1] = -r * o),
              (e[2] = -i * o),
              (e[3] = n * o),
              e)
            : null;
        }),
        (a.adjoint = function (e, t) {
          var n = t[0];
          return (e[0] = t[3]), (e[1] = -t[1]), (e[2] = -t[2]), (e[3] = n), e;
        }),
        (a.determinant = function (e) {
          return e[0] * e[3] - e[2] * e[1];
        }),
        (a.multiply = function (e, t, n) {
          var r = t[0],
            i = t[1],
            s = t[2],
            o = t[3],
            u = n[0],
            a = n[1],
            f = n[2],
            l = n[3];
          return (
            (e[0] = r * u + i * f),
            (e[1] = r * a + i * l),
            (e[2] = s * u + o * f),
            (e[3] = s * a + o * l),
            e
          );
        }),
        (a.mul = a.multiply),
        (a.rotate = function (e, t, n) {
          var r = t[0],
            i = t[1],
            s = t[2],
            o = t[3],
            u = Math.sin(n),
            a = Math.cos(n);
          return (
            (e[0] = r * a + i * u),
            (e[1] = r * -u + i * a),
            (e[2] = s * a + o * u),
            (e[3] = s * -u + o * a),
            e
          );
        }),
        (a.scale = function (e, t, n) {
          var r = t[0],
            i = t[1],
            s = t[2],
            o = t[3],
            u = n[0],
            a = n[1];
          return (
            (e[0] = r * u), (e[1] = i * a), (e[2] = s * u), (e[3] = o * a), e
          );
        }),
        (a.str = function (e) {
          return "mat2(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")";
        }),
        typeof e != "undefined" && (e.mat2 = a);
      var f = {};
      (f.create = function () {
        var e = new n(6);
        return (
          (e[0] = 1),
          (e[1] = 0),
          (e[2] = 0),
          (e[3] = 1),
          (e[4] = 0),
          (e[5] = 0),
          e
        );
      }),
        (f.clone = function (e) {
          var t = new n(6);
          return (
            (t[0] = e[0]),
            (t[1] = e[1]),
            (t[2] = e[2]),
            (t[3] = e[3]),
            (t[4] = e[4]),
            (t[5] = e[5]),
            t
          );
        }),
        (f.copy = function (e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = t[1]),
            (e[2] = t[2]),
            (e[3] = t[3]),
            (e[4] = t[4]),
            (e[5] = t[5]),
            e
          );
        }),
        (f.identity = function (e) {
          return (
            (e[0] = 1),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 1),
            (e[4] = 0),
            (e[5] = 0),
            e
          );
        }),
        (f.invert = function (e, t) {
          var n = t[0],
            r = t[1],
            i = t[2],
            s = t[3],
            o = t[4],
            u = t[5],
            a = n * s - r * i;
          return a
            ? ((a = 1 / a),
              (e[0] = s * a),
              (e[1] = -r * a),
              (e[2] = -i * a),
              (e[3] = n * a),
              (e[4] = (i * u - s * o) * a),
              (e[5] = (r * o - n * u) * a),
              e)
            : null;
        }),
        (f.determinant = function (e) {
          return e[0] * e[3] - e[1] * e[2];
        }),
        (f.multiply = function (e, t, n) {
          var r = t[0],
            i = t[1],
            s = t[2],
            o = t[3],
            u = t[4],
            a = t[5],
            f = n[0],
            l = n[1],
            c = n[2],
            h = n[3],
            p = n[4],
            d = n[5];
          return (
            (e[0] = r * f + i * c),
            (e[1] = r * l + i * h),
            (e[2] = s * f + o * c),
            (e[3] = s * l + o * h),
            (e[4] = f * u + c * a + p),
            (e[5] = l * u + h * a + d),
            e
          );
        }),
        (f.mul = f.multiply),
        (f.rotate = function (e, t, n) {
          var r = t[0],
            i = t[1],
            s = t[2],
            o = t[3],
            u = t[4],
            a = t[5],
            f = Math.sin(n),
            l = Math.cos(n);
          return (
            (e[0] = r * l + i * f),
            (e[1] = -r * f + i * l),
            (e[2] = s * l + o * f),
            (e[3] = -s * f + l * o),
            (e[4] = l * u + f * a),
            (e[5] = l * a - f * u),
            e
          );
        }),
        (f.scale = function (e, t, n) {
          var r = n[0],
            i = n[1];
          return (
            (e[0] = t[0] * r),
            (e[1] = t[1] * i),
            (e[2] = t[2] * r),
            (e[3] = t[3] * i),
            (e[4] = t[4] * r),
            (e[5] = t[5] * i),
            e
          );
        }),
        (f.translate = function (e, t, n) {
          return (
            (e[0] = t[0]),
            (e[1] = t[1]),
            (e[2] = t[2]),
            (e[3] = t[3]),
            (e[4] = t[4] + n[0]),
            (e[5] = t[5] + n[1]),
            e
          );
        }),
        (f.str = function (e) {
          return (
            "mat2d(" +
            e[0] +
            ", " +
            e[1] +
            ", " +
            e[2] +
            ", " +
            e[3] +
            ", " +
            e[4] +
            ", " +
            e[5] +
            ")"
          );
        }),
        typeof e != "undefined" && (e.mat2d = f);
      var l = {};
      (l.create = function () {
        var e = new n(9);
        return (
          (e[0] = 1),
          (e[1] = 0),
          (e[2] = 0),
          (e[3] = 0),
          (e[4] = 1),
          (e[5] = 0),
          (e[6] = 0),
          (e[7] = 0),
          (e[8] = 1),
          e
        );
      }),
        (l.fromMat4 = function (e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = t[1]),
            (e[2] = t[2]),
            (e[3] = t[4]),
            (e[4] = t[5]),
            (e[5] = t[6]),
            (e[6] = t[8]),
            (e[7] = t[9]),
            (e[8] = t[10]),
            e
          );
        }),
        (l.clone = function (e) {
          var t = new n(9);
          return (
            (t[0] = e[0]),
            (t[1] = e[1]),
            (t[2] = e[2]),
            (t[3] = e[3]),
            (t[4] = e[4]),
            (t[5] = e[5]),
            (t[6] = e[6]),
            (t[7] = e[7]),
            (t[8] = e[8]),
            t
          );
        }),
        (l.copy = function (e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = t[1]),
            (e[2] = t[2]),
            (e[3] = t[3]),
            (e[4] = t[4]),
            (e[5] = t[5]),
            (e[6] = t[6]),
            (e[7] = t[7]),
            (e[8] = t[8]),
            e
          );
        }),
        (l.identity = function (e) {
          return (
            (e[0] = 1),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 1),
            (e[5] = 0),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 1),
            e
          );
        }),
        (l.transpose = function (e, t) {
          if (e === t) {
            var n = t[1],
              r = t[2],
              i = t[5];
            (e[1] = t[3]),
              (e[2] = t[6]),
              (e[3] = n),
              (e[5] = t[7]),
              (e[6] = r),
              (e[7] = i);
          } else
            (e[0] = t[0]),
              (e[1] = t[3]),
              (e[2] = t[6]),
              (e[3] = t[1]),
              (e[4] = t[4]),
              (e[5] = t[7]),
              (e[6] = t[2]),
              (e[7] = t[5]),
              (e[8] = t[8]);
          return e;
        }),
        (l.invert = function (e, t) {
          var n = t[0],
            r = t[1],
            i = t[2],
            s = t[3],
            o = t[4],
            u = t[5],
            a = t[6],
            f = t[7],
            l = t[8],
            c = l * o - u * f,
            h = -l * s + u * a,
            p = f * s - o * a,
            d = n * c + r * h + i * p;
          return d
            ? ((d = 1 / d),
              (e[0] = c * d),
              (e[1] = (-l * r + i * f) * d),
              (e[2] = (u * r - i * o) * d),
              (e[3] = h * d),
              (e[4] = (l * n - i * a) * d),
              (e[5] = (-u * n + i * s) * d),
              (e[6] = p * d),
              (e[7] = (-f * n + r * a) * d),
              (e[8] = (o * n - r * s) * d),
              e)
            : null;
        }),
        (l.adjoint = function (e, t) {
          var n = t[0],
            r = t[1],
            i = t[2],
            s = t[3],
            o = t[4],
            u = t[5],
            a = t[6],
            f = t[7],
            l = t[8];
          return (
            (e[0] = o * l - u * f),
            (e[1] = i * f - r * l),
            (e[2] = r * u - i * o),
            (e[3] = u * a - s * l),
            (e[4] = n * l - i * a),
            (e[5] = i * s - n * u),
            (e[6] = s * f - o * a),
            (e[7] = r * a - n * f),
            (e[8] = n * o - r * s),
            e
          );
        }),
        (l.determinant = function (e) {
          var t = e[0],
            n = e[1],
            r = e[2],
            i = e[3],
            s = e[4],
            o = e[5],
            u = e[6],
            a = e[7],
            f = e[8];
          return (
            t * (f * s - o * a) + n * (-f * i + o * u) + r * (a * i - s * u)
          );
        }),
        (l.multiply = function (e, t, n) {
          var r = t[0],
            i = t[1],
            s = t[2],
            o = t[3],
            u = t[4],
            a = t[5],
            f = t[6],
            l = t[7],
            c = t[8],
            h = n[0],
            p = n[1],
            d = n[2],
            v = n[3],
            m = n[4],
            g = n[5],
            y = n[6],
            b = n[7],
            w = n[8];
          return (
            (e[0] = h * r + p * o + d * f),
            (e[1] = h * i + p * u + d * l),
            (e[2] = h * s + p * a + d * c),
            (e[3] = v * r + m * o + g * f),
            (e[4] = v * i + m * u + g * l),
            (e[5] = v * s + m * a + g * c),
            (e[6] = y * r + b * o + w * f),
            (e[7] = y * i + b * u + w * l),
            (e[8] = y * s + b * a + w * c),
            e
          );
        }),
        (l.mul = l.multiply),
        (l.translate = function (e, t, n) {
          var r = t[0],
            i = t[1],
            s = t[2],
            o = t[3],
            u = t[4],
            a = t[5],
            f = t[6],
            l = t[7],
            c = t[8],
            h = n[0],
            p = n[1];
          return (
            (e[0] = r),
            (e[1] = i),
            (e[2] = s),
            (e[3] = o),
            (e[4] = u),
            (e[5] = a),
            (e[6] = h * r + p * o + f),
            (e[7] = h * i + p * u + l),
            (e[8] = h * s + p * a + c),
            e
          );
        }),
        (l.rotate = function (e, t, n) {
          var r = t[0],
            i = t[1],
            s = t[2],
            o = t[3],
            u = t[4],
            a = t[5],
            f = t[6],
            l = t[7],
            c = t[8],
            h = Math.sin(n),
            p = Math.cos(n);
          return (
            (e[0] = p * r + h * o),
            (e[1] = p * i + h * u),
            (e[2] = p * s + h * a),
            (e[3] = p * o - h * r),
            (e[4] = p * u - h * i),
            (e[5] = p * a - h * s),
            (e[6] = f),
            (e[7] = l),
            (e[8] = c),
            e
          );
        }),
        (l.scale = function (e, t, n) {
          var r = n[0],
            i = n[1];
          return (
            (e[0] = r * t[0]),
            (e[1] = r * t[1]),
            (e[2] = r * t[2]),
            (e[3] = i * t[3]),
            (e[4] = i * t[4]),
            (e[5] = i * t[5]),
            (e[6] = t[6]),
            (e[7] = t[7]),
            (e[8] = t[8]),
            e
          );
        }),
        (l.fromMat2d = function (e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = t[1]),
            (e[2] = 0),
            (e[3] = t[2]),
            (e[4] = t[3]),
            (e[5] = 0),
            (e[6] = t[4]),
            (e[7] = t[5]),
            (e[8] = 1),
            e
          );
        }),
        (l.fromQuat = function (e, t) {
          var n = t[0],
            r = t[1],
            i = t[2],
            s = t[3],
            o = n + n,
            u = r + r,
            a = i + i,
            f = n * o,
            l = n * u,
            c = n * a,
            h = r * u,
            p = r * a,
            d = i * a,
            v = s * o,
            m = s * u,
            g = s * a;
          return (
            (e[0] = 1 - (h + d)),
            (e[3] = l + g),
            (e[6] = c - m),
            (e[1] = l - g),
            (e[4] = 1 - (f + d)),
            (e[7] = p + v),
            (e[2] = c + m),
            (e[5] = p - v),
            (e[8] = 1 - (f + h)),
            e
          );
        }),
        (l.normalFromMat4 = function (e, t) {
          var n = t[0],
            r = t[1],
            i = t[2],
            s = t[3],
            o = t[4],
            u = t[5],
            a = t[6],
            f = t[7],
            l = t[8],
            c = t[9],
            h = t[10],
            p = t[11],
            d = t[12],
            v = t[13],
            m = t[14],
            g = t[15],
            y = n * u - r * o,
            b = n * a - i * o,
            w = n * f - s * o,
            E = r * a - i * u,
            S = r * f - s * u,
            x = i * f - s * a,
            T = l * v - c * d,
            N = l * m - h * d,
            C = l * g - p * d,
            k = c * m - h * v,
            L = c * g - p * v,
            A = h * g - p * m,
            O = y * A - b * L + w * k + E * C - S * N + x * T;
          return O
            ? ((O = 1 / O),
              (e[0] = (u * A - a * L + f * k) * O),
              (e[1] = (a * C - o * A - f * N) * O),
              (e[2] = (o * L - u * C + f * T) * O),
              (e[3] = (i * L - r * A - s * k) * O),
              (e[4] = (n * A - i * C + s * N) * O),
              (e[5] = (r * C - n * L - s * T) * O),
              (e[6] = (v * x - m * S + g * E) * O),
              (e[7] = (m * w - d * x - g * b) * O),
              (e[8] = (d * S - v * w + g * y) * O),
              e)
            : null;
        }),
        (l.str = function (e) {
          return (
            "mat3(" +
            e[0] +
            ", " +
            e[1] +
            ", " +
            e[2] +
            ", " +
            e[3] +
            ", " +
            e[4] +
            ", " +
            e[5] +
            ", " +
            e[6] +
            ", " +
            e[7] +
            ", " +
            e[8] +
            ")"
          );
        }),
        typeof e != "undefined" && (e.mat3 = l);
      var c = {};
      (c.create = function () {
        var e = new n(16);
        return (
          (e[0] = 1),
          (e[1] = 0),
          (e[2] = 0),
          (e[3] = 0),
          (e[4] = 0),
          (e[5] = 1),
          (e[6] = 0),
          (e[7] = 0),
          (e[8] = 0),
          (e[9] = 0),
          (e[10] = 1),
          (e[11] = 0),
          (e[12] = 0),
          (e[13] = 0),
          (e[14] = 0),
          (e[15] = 1),
          e
        );
      }),
        (c.clone = function (e) {
          var t = new n(16);
          return (
            (t[0] = e[0]),
            (t[1] = e[1]),
            (t[2] = e[2]),
            (t[3] = e[3]),
            (t[4] = e[4]),
            (t[5] = e[5]),
            (t[6] = e[6]),
            (t[7] = e[7]),
            (t[8] = e[8]),
            (t[9] = e[9]),
            (t[10] = e[10]),
            (t[11] = e[11]),
            (t[12] = e[12]),
            (t[13] = e[13]),
            (t[14] = e[14]),
            (t[15] = e[15]),
            t
          );
        }),
        (c.copy = function (e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = t[1]),
            (e[2] = t[2]),
            (e[3] = t[3]),
            (e[4] = t[4]),
            (e[5] = t[5]),
            (e[6] = t[6]),
            (e[7] = t[7]),
            (e[8] = t[8]),
            (e[9] = t[9]),
            (e[10] = t[10]),
            (e[11] = t[11]),
            (e[12] = t[12]),
            (e[13] = t[13]),
            (e[14] = t[14]),
            (e[15] = t[15]),
            e
          );
        }),
        (c.identity = function (e) {
          return (
            (e[0] = 1),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = 1),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 0),
            (e[9] = 0),
            (e[10] = 1),
            (e[11] = 0),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = 0),
            (e[15] = 1),
            e
          );
        }),
        (c.transpose = function (e, t) {
          if (e === t) {
            var n = t[1],
              r = t[2],
              i = t[3],
              s = t[6],
              o = t[7],
              u = t[11];
            (e[1] = t[4]),
              (e[2] = t[8]),
              (e[3] = t[12]),
              (e[4] = n),
              (e[6] = t[9]),
              (e[7] = t[13]),
              (e[8] = r),
              (e[9] = s),
              (e[11] = t[14]),
              (e[12] = i),
              (e[13] = o),
              (e[14] = u);
          } else
            (e[0] = t[0]),
              (e[1] = t[4]),
              (e[2] = t[8]),
              (e[3] = t[12]),
              (e[4] = t[1]),
              (e[5] = t[5]),
              (e[6] = t[9]),
              (e[7] = t[13]),
              (e[8] = t[2]),
              (e[9] = t[6]),
              (e[10] = t[10]),
              (e[11] = t[14]),
              (e[12] = t[3]),
              (e[13] = t[7]),
              (e[14] = t[11]),
              (e[15] = t[15]);
          return e;
        }),
        (c.invert = function (e, t) {
          var n = t[0],
            r = t[1],
            i = t[2],
            s = t[3],
            o = t[4],
            u = t[5],
            a = t[6],
            f = t[7],
            l = t[8],
            c = t[9],
            h = t[10],
            p = t[11],
            d = t[12],
            v = t[13],
            m = t[14],
            g = t[15],
            y = n * u - r * o,
            b = n * a - i * o,
            w = n * f - s * o,
            E = r * a - i * u,
            S = r * f - s * u,
            x = i * f - s * a,
            T = l * v - c * d,
            N = l * m - h * d,
            C = l * g - p * d,
            k = c * m - h * v,
            L = c * g - p * v,
            A = h * g - p * m,
            O = y * A - b * L + w * k + E * C - S * N + x * T;
          return O
            ? ((O = 1 / O),
              (e[0] = (u * A - a * L + f * k) * O),
              (e[1] = (i * L - r * A - s * k) * O),
              (e[2] = (v * x - m * S + g * E) * O),
              (e[3] = (h * S - c * x - p * E) * O),
              (e[4] = (a * C - o * A - f * N) * O),
              (e[5] = (n * A - i * C + s * N) * O),
              (e[6] = (m * w - d * x - g * b) * O),
              (e[7] = (l * x - h * w + p * b) * O),
              (e[8] = (o * L - u * C + f * T) * O),
              (e[9] = (r * C - n * L - s * T) * O),
              (e[10] = (d * S - v * w + g * y) * O),
              (e[11] = (c * w - l * S - p * y) * O),
              (e[12] = (u * N - o * k - a * T) * O),
              (e[13] = (n * k - r * N + i * T) * O),
              (e[14] = (v * b - d * E - m * y) * O),
              (e[15] = (l * E - c * b + h * y) * O),
              e)
            : null;
        }),
        (c.adjoint = function (e, t) {
          var n = t[0],
            r = t[1],
            i = t[2],
            s = t[3],
            o = t[4],
            u = t[5],
            a = t[6],
            f = t[7],
            l = t[8],
            c = t[9],
            h = t[10],
            p = t[11],
            d = t[12],
            v = t[13],
            m = t[14],
            g = t[15];
          return (
            (e[0] =
              u * (h * g - p * m) - c * (a * g - f * m) + v * (a * p - f * h)),
            (e[1] = -(
              r * (h * g - p * m) -
              c * (i * g - s * m) +
              v * (i * p - s * h)
            )),
            (e[2] =
              r * (a * g - f * m) - u * (i * g - s * m) + v * (i * f - s * a)),
            (e[3] = -(
              r * (a * p - f * h) -
              u * (i * p - s * h) +
              c * (i * f - s * a)
            )),
            (e[4] = -(
              o * (h * g - p * m) -
              l * (a * g - f * m) +
              d * (a * p - f * h)
            )),
            (e[5] =
              n * (h * g - p * m) - l * (i * g - s * m) + d * (i * p - s * h)),
            (e[6] = -(
              n * (a * g - f * m) -
              o * (i * g - s * m) +
              d * (i * f - s * a)
            )),
            (e[7] =
              n * (a * p - f * h) - o * (i * p - s * h) + l * (i * f - s * a)),
            (e[8] =
              o * (c * g - p * v) - l * (u * g - f * v) + d * (u * p - f * c)),
            (e[9] = -(
              n * (c * g - p * v) -
              l * (r * g - s * v) +
              d * (r * p - s * c)
            )),
            (e[10] =
              n * (u * g - f * v) - o * (r * g - s * v) + d * (r * f - s * u)),
            (e[11] = -(
              n * (u * p - f * c) -
              o * (r * p - s * c) +
              l * (r * f - s * u)
            )),
            (e[12] = -(
              o * (c * m - h * v) -
              l * (u * m - a * v) +
              d * (u * h - a * c)
            )),
            (e[13] =
              n * (c * m - h * v) - l * (r * m - i * v) + d * (r * h - i * c)),
            (e[14] = -(
              n * (u * m - a * v) -
              o * (r * m - i * v) +
              d * (r * a - i * u)
            )),
            (e[15] =
              n * (u * h - a * c) - o * (r * h - i * c) + l * (r * a - i * u)),
            e
          );
        }),
        (c.determinant = function (e) {
          var t = e[0],
            n = e[1],
            r = e[2],
            i = e[3],
            s = e[4],
            o = e[5],
            u = e[6],
            a = e[7],
            f = e[8],
            l = e[9],
            c = e[10],
            h = e[11],
            p = e[12],
            d = e[13],
            v = e[14],
            m = e[15],
            g = t * o - n * s,
            y = t * u - r * s,
            b = t * a - i * s,
            w = n * u - r * o,
            E = n * a - i * o,
            S = r * a - i * u,
            x = f * d - l * p,
            T = f * v - c * p,
            N = f * m - h * p,
            C = l * v - c * d,
            k = l * m - h * d,
            L = c * m - h * v;
          return g * L - y * k + b * C + w * N - E * T + S * x;
        }),
        (c.multiply = function (e, t, n) {
          var r = t[0],
            i = t[1],
            s = t[2],
            o = t[3],
            u = t[4],
            a = t[5],
            f = t[6],
            l = t[7],
            c = t[8],
            h = t[9],
            p = t[10],
            d = t[11],
            v = t[12],
            m = t[13],
            g = t[14],
            y = t[15],
            b = n[0],
            w = n[1],
            E = n[2],
            S = n[3];
          return (
            (e[0] = b * r + w * u + E * c + S * v),
            (e[1] = b * i + w * a + E * h + S * m),
            (e[2] = b * s + w * f + E * p + S * g),
            (e[3] = b * o + w * l + E * d + S * y),
            (b = n[4]),
            (w = n[5]),
            (E = n[6]),
            (S = n[7]),
            (e[4] = b * r + w * u + E * c + S * v),
            (e[5] = b * i + w * a + E * h + S * m),
            (e[6] = b * s + w * f + E * p + S * g),
            (e[7] = b * o + w * l + E * d + S * y),
            (b = n[8]),
            (w = n[9]),
            (E = n[10]),
            (S = n[11]),
            (e[8] = b * r + w * u + E * c + S * v),
            (e[9] = b * i + w * a + E * h + S * m),
            (e[10] = b * s + w * f + E * p + S * g),
            (e[11] = b * o + w * l + E * d + S * y),
            (b = n[12]),
            (w = n[13]),
            (E = n[14]),
            (S = n[15]),
            (e[12] = b * r + w * u + E * c + S * v),
            (e[13] = b * i + w * a + E * h + S * m),
            (e[14] = b * s + w * f + E * p + S * g),
            (e[15] = b * o + w * l + E * d + S * y),
            e
          );
        }),
        (c.mul = c.multiply),
        (c.translate = function (e, t, n) {
          var r = n[0],
            i = n[1],
            s = n[2],
            o,
            u,
            a,
            f,
            l,
            c,
            h,
            p,
            d,
            v,
            m,
            g;
          return (
            t === e
              ? ((e[12] = t[0] * r + t[4] * i + t[8] * s + t[12]),
                (e[13] = t[1] * r + t[5] * i + t[9] * s + t[13]),
                (e[14] = t[2] * r + t[6] * i + t[10] * s + t[14]),
                (e[15] = t[3] * r + t[7] * i + t[11] * s + t[15]))
              : ((o = t[0]),
                (u = t[1]),
                (a = t[2]),
                (f = t[3]),
                (l = t[4]),
                (c = t[5]),
                (h = t[6]),
                (p = t[7]),
                (d = t[8]),
                (v = t[9]),
                (m = t[10]),
                (g = t[11]),
                (e[0] = o),
                (e[1] = u),
                (e[2] = a),
                (e[3] = f),
                (e[4] = l),
                (e[5] = c),
                (e[6] = h),
                (e[7] = p),
                (e[8] = d),
                (e[9] = v),
                (e[10] = m),
                (e[11] = g),
                (e[12] = o * r + l * i + d * s + t[12]),
                (e[13] = u * r + c * i + v * s + t[13]),
                (e[14] = a * r + h * i + m * s + t[14]),
                (e[15] = f * r + p * i + g * s + t[15])),
            e
          );
        }),
        (c.scale = function (e, t, n) {
          var r = n[0],
            i = n[1],
            s = n[2];
          return (
            (e[0] = t[0] * r),
            (e[1] = t[1] * r),
            (e[2] = t[2] * r),
            (e[3] = t[3] * r),
            (e[4] = t[4] * i),
            (e[5] = t[5] * i),
            (e[6] = t[6] * i),
            (e[7] = t[7] * i),
            (e[8] = t[8] * s),
            (e[9] = t[9] * s),
            (e[10] = t[10] * s),
            (e[11] = t[11] * s),
            (e[12] = t[12]),
            (e[13] = t[13]),
            (e[14] = t[14]),
            (e[15] = t[15]),
            e
          );
        }),
        (c.rotate = function (e, n, r, i) {
          var s = i[0],
            o = i[1],
            u = i[2],
            a = Math.sqrt(s * s + o * o + u * u),
            f,
            l,
            c,
            h,
            p,
            d,
            v,
            m,
            g,
            y,
            b,
            w,
            E,
            S,
            x,
            T,
            N,
            C,
            k,
            L,
            A,
            O,
            M,
            _;
          return Math.abs(a) < t
            ? null
            : ((a = 1 / a),
              (s *= a),
              (o *= a),
              (u *= a),
              (f = Math.sin(r)),
              (l = Math.cos(r)),
              (c = 1 - l),
              (h = n[0]),
              (p = n[1]),
              (d = n[2]),
              (v = n[3]),
              (m = n[4]),
              (g = n[5]),
              (y = n[6]),
              (b = n[7]),
              (w = n[8]),
              (E = n[9]),
              (S = n[10]),
              (x = n[11]),
              (T = s * s * c + l),
              (N = o * s * c + u * f),
              (C = u * s * c - o * f),
              (k = s * o * c - u * f),
              (L = o * o * c + l),
              (A = u * o * c + s * f),
              (O = s * u * c + o * f),
              (M = o * u * c - s * f),
              (_ = u * u * c + l),
              (e[0] = h * T + m * N + w * C),
              (e[1] = p * T + g * N + E * C),
              (e[2] = d * T + y * N + S * C),
              (e[3] = v * T + b * N + x * C),
              (e[4] = h * k + m * L + w * A),
              (e[5] = p * k + g * L + E * A),
              (e[6] = d * k + y * L + S * A),
              (e[7] = v * k + b * L + x * A),
              (e[8] = h * O + m * M + w * _),
              (e[9] = p * O + g * M + E * _),
              (e[10] = d * O + y * M + S * _),
              (e[11] = v * O + b * M + x * _),
              n !== e &&
                ((e[12] = n[12]),
                (e[13] = n[13]),
                (e[14] = n[14]),
                (e[15] = n[15])),
              e);
        }),
        (c.rotateX = function (e, t, n) {
          var r = Math.sin(n),
            i = Math.cos(n),
            s = t[4],
            o = t[5],
            u = t[6],
            a = t[7],
            f = t[8],
            l = t[9],
            c = t[10],
            h = t[11];
          return (
            t !== e &&
              ((e[0] = t[0]),
              (e[1] = t[1]),
              (e[2] = t[2]),
              (e[3] = t[3]),
              (e[12] = t[12]),
              (e[13] = t[13]),
              (e[14] = t[14]),
              (e[15] = t[15])),
            (e[4] = s * i + f * r),
            (e[5] = o * i + l * r),
            (e[6] = u * i + c * r),
            (e[7] = a * i + h * r),
            (e[8] = f * i - s * r),
            (e[9] = l * i - o * r),
            (e[10] = c * i - u * r),
            (e[11] = h * i - a * r),
            e
          );
        }),
        (c.rotateY = function (e, t, n) {
          var r = Math.sin(n),
            i = Math.cos(n),
            s = t[0],
            o = t[1],
            u = t[2],
            a = t[3],
            f = t[8],
            l = t[9],
            c = t[10],
            h = t[11];
          return (
            t !== e &&
              ((e[4] = t[4]),
              (e[5] = t[5]),
              (e[6] = t[6]),
              (e[7] = t[7]),
              (e[12] = t[12]),
              (e[13] = t[13]),
              (e[14] = t[14]),
              (e[15] = t[15])),
            (e[0] = s * i - f * r),
            (e[1] = o * i - l * r),
            (e[2] = u * i - c * r),
            (e[3] = a * i - h * r),
            (e[8] = s * r + f * i),
            (e[9] = o * r + l * i),
            (e[10] = u * r + c * i),
            (e[11] = a * r + h * i),
            e
          );
        }),
        (c.rotateZ = function (e, t, n) {
          var r = Math.sin(n),
            i = Math.cos(n),
            s = t[0],
            o = t[1],
            u = t[2],
            a = t[3],
            f = t[4],
            l = t[5],
            c = t[6],
            h = t[7];
          return (
            t !== e &&
              ((e[8] = t[8]),
              (e[9] = t[9]),
              (e[10] = t[10]),
              (e[11] = t[11]),
              (e[12] = t[12]),
              (e[13] = t[13]),
              (e[14] = t[14]),
              (e[15] = t[15])),
            (e[0] = s * i + f * r),
            (e[1] = o * i + l * r),
            (e[2] = u * i + c * r),
            (e[3] = a * i + h * r),
            (e[4] = f * i - s * r),
            (e[5] = l * i - o * r),
            (e[6] = c * i - u * r),
            (e[7] = h * i - a * r),
            e
          );
        }),
        (c.fromRotationTranslation = function (e, t, n) {
          var r = t[0],
            i = t[1],
            s = t[2],
            o = t[3],
            u = r + r,
            a = i + i,
            f = s + s,
            l = r * u,
            c = r * a,
            h = r * f,
            p = i * a,
            d = i * f,
            v = s * f,
            m = o * u,
            g = o * a,
            y = o * f;
          return (
            (e[0] = 1 - (p + v)),
            (e[1] = c + y),
            (e[2] = h - g),
            (e[3] = 0),
            (e[4] = c - y),
            (e[5] = 1 - (l + v)),
            (e[6] = d + m),
            (e[7] = 0),
            (e[8] = h + g),
            (e[9] = d - m),
            (e[10] = 1 - (l + p)),
            (e[11] = 0),
            (e[12] = n[0]),
            (e[13] = n[1]),
            (e[14] = n[2]),
            (e[15] = 1),
            e
          );
        }),
        (c.fromQuat = function (e, t) {
          var n = t[0],
            r = t[1],
            i = t[2],
            s = t[3],
            o = n + n,
            u = r + r,
            a = i + i,
            f = n * o,
            l = n * u,
            c = n * a,
            h = r * u,
            p = r * a,
            d = i * a,
            v = s * o,
            m = s * u,
            g = s * a;
          return (
            (e[0] = 1 - (h + d)),
            (e[1] = l + g),
            (e[2] = c - m),
            (e[3] = 0),
            (e[4] = l - g),
            (e[5] = 1 - (f + d)),
            (e[6] = p + v),
            (e[7] = 0),
            (e[8] = c + m),
            (e[9] = p - v),
            (e[10] = 1 - (f + h)),
            (e[11] = 0),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = 0),
            (e[15] = 1),
            e
          );
        }),
        (c.frustum = function (e, t, n, r, i, s, o) {
          var u = 1 / (n - t),
            a = 1 / (i - r),
            f = 1 / (s - o);
          return (
            (e[0] = s * 2 * u),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = s * 2 * a),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = (n + t) * u),
            (e[9] = (i + r) * a),
            (e[10] = (o + s) * f),
            (e[11] = -1),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = o * s * 2 * f),
            (e[15] = 0),
            e
          );
        }),
        (c.perspective = function (e, t, n, r, i) {
          var s = 1 / Math.tan(t / 2),
            o = 1 / (r - i);
          return (
            (e[0] = s / n),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = s),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 0),
            (e[9] = 0),
            (e[10] = (i + r) * o),
            (e[11] = -1),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = 2 * i * r * o),
            (e[15] = 0),
            e
          );
        }),
        (c.ortho = function (e, t, n, r, i, s, o) {
          var u = 1 / (t - n),
            a = 1 / (r - i),
            f = 1 / (s - o);
          return (
            (e[0] = -2 * u),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = -2 * a),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 0),
            (e[9] = 0),
            (e[10] = 2 * f),
            (e[11] = 0),
            (e[12] = (t + n) * u),
            (e[13] = (i + r) * a),
            (e[14] = (o + s) * f),
            (e[15] = 1),
            e
          );
        }),
        (c.lookAt = function (e, n, r, i) {
          var s,
            o,
            u,
            a,
            f,
            l,
            h,
            p,
            d,
            v,
            m = n[0],
            g = n[1],
            y = n[2],
            b = i[0],
            w = i[1],
            E = i[2],
            S = r[0],
            x = r[1],
            T = r[2];
          return Math.abs(m - S) < t &&
            Math.abs(g - x) < t &&
            Math.abs(y - T) < t
            ? c.identity(e)
            : ((h = m - S),
              (p = g - x),
              (d = y - T),
              (v = 1 / Math.sqrt(h * h + p * p + d * d)),
              (h *= v),
              (p *= v),
              (d *= v),
              (s = w * d - E * p),
              (o = E * h - b * d),
              (u = b * p - w * h),
              (v = Math.sqrt(s * s + o * o + u * u)),
              v
                ? ((v = 1 / v), (s *= v), (o *= v), (u *= v))
                : ((s = 0), (o = 0), (u = 0)),
              (a = p * u - d * o),
              (f = d * s - h * u),
              (l = h * o - p * s),
              (v = Math.sqrt(a * a + f * f + l * l)),
              v
                ? ((v = 1 / v), (a *= v), (f *= v), (l *= v))
                : ((a = 0), (f = 0), (l = 0)),
              (e[0] = s),
              (e[1] = a),
              (e[2] = h),
              (e[3] = 0),
              (e[4] = o),
              (e[5] = f),
              (e[6] = p),
              (e[7] = 0),
              (e[8] = u),
              (e[9] = l),
              (e[10] = d),
              (e[11] = 0),
              (e[12] = -(s * m + o * g + u * y)),
              (e[13] = -(a * m + f * g + l * y)),
              (e[14] = -(h * m + p * g + d * y)),
              (e[15] = 1),
              e);
        }),
        (c.str = function (e) {
          return (
            "mat4(" +
            e[0] +
            ", " +
            e[1] +
            ", " +
            e[2] +
            ", " +
            e[3] +
            ", " +
            e[4] +
            ", " +
            e[5] +
            ", " +
            e[6] +
            ", " +
            e[7] +
            ", " +
            e[8] +
            ", " +
            e[9] +
            ", " +
            e[10] +
            ", " +
            e[11] +
            ", " +
            e[12] +
            ", " +
            e[13] +
            ", " +
            e[14] +
            ", " +
            e[15] +
            ")"
          );
        }),
        typeof e != "undefined" && (e.mat4 = c);
      var h = {};
      (h.create = function () {
        var e = new n(4);
        return (e[0] = 0), (e[1] = 0), (e[2] = 0), (e[3] = 1), e;
      }),
        (h.rotationTo = (function () {
          var e = o.create(),
            t = o.fromValues(1, 0, 0),
            n = o.fromValues(0, 1, 0);
          return function (r, i, s) {
            var u = o.dot(i, s);
            return u < -0.999999
              ? (o.cross(e, t, i),
                o.length(e) < 1e-6 && o.cross(e, n, i),
                o.normalize(e, e),
                h.setAxisAngle(r, e, Math.PI),
                r)
              : u > 0.999999
              ? ((r[0] = 0), (r[1] = 0), (r[2] = 0), (r[3] = 1), r)
              : (o.cross(e, i, s),
                (r[0] = e[0]),
                (r[1] = e[1]),
                (r[2] = e[2]),
                (r[3] = 1 + u),
                h.normalize(r, r));
          };
        })()),
        (h.setAxes = (function () {
          var e = l.create();
          return function (t, n, r, i) {
            return (
              (e[0] = r[0]),
              (e[3] = r[1]),
              (e[6] = r[2]),
              (e[1] = i[0]),
              (e[4] = i[1]),
              (e[7] = i[2]),
              (e[2] = n[0]),
              (e[5] = n[1]),
              (e[8] = n[2]),
              h.normalize(t, h.fromMat3(t, e))
            );
          };
        })()),
        (h.clone = u.clone),
        (h.fromValues = u.fromValues),
        (h.copy = u.copy),
        (h.set = u.set),
        (h.identity = function (e) {
          return (e[0] = 0), (e[1] = 0), (e[2] = 0), (e[3] = 1), e;
        }),
        (h.setAxisAngle = function (e, t, n) {
          n *= 0.5;
          var r = Math.sin(n);
          return (
            (e[0] = r * t[0]),
            (e[1] = r * t[1]),
            (e[2] = r * t[2]),
            (e[3] = Math.cos(n)),
            e
          );
        }),
        (h.add = u.add),
        (h.multiply = function (e, t, n) {
          var r = t[0],
            i = t[1],
            s = t[2],
            o = t[3],
            u = n[0],
            a = n[1],
            f = n[2],
            l = n[3];
          return (
            (e[0] = r * l + o * u + i * f - s * a),
            (e[1] = i * l + o * a + s * u - r * f),
            (e[2] = s * l + o * f + r * a - i * u),
            (e[3] = o * l - r * u - i * a - s * f),
            e
          );
        }),
        (h.mul = h.multiply),
        (h.scale = u.scale),
        (h.rotateX = function (e, t, n) {
          n *= 0.5;
          var r = t[0],
            i = t[1],
            s = t[2],
            o = t[3],
            u = Math.sin(n),
            a = Math.cos(n);
          return (
            (e[0] = r * a + o * u),
            (e[1] = i * a + s * u),
            (e[2] = s * a - i * u),
            (e[3] = o * a - r * u),
            e
          );
        }),
        (h.rotateY = function (e, t, n) {
          n *= 0.5;
          var r = t[0],
            i = t[1],
            s = t[2],
            o = t[3],
            u = Math.sin(n),
            a = Math.cos(n);
          return (
            (e[0] = r * a - s * u),
            (e[1] = i * a + o * u),
            (e[2] = s * a + r * u),
            (e[3] = o * a - i * u),
            e
          );
        }),
        (h.rotateZ = function (e, t, n) {
          n *= 0.5;
          var r = t[0],
            i = t[1],
            s = t[2],
            o = t[3],
            u = Math.sin(n),
            a = Math.cos(n);
          return (
            (e[0] = r * a + i * u),
            (e[1] = i * a - r * u),
            (e[2] = s * a + o * u),
            (e[3] = o * a - s * u),
            e
          );
        }),
        (h.calculateW = function (e, t) {
          var n = t[0],
            r = t[1],
            i = t[2];
          return (
            (e[0] = n),
            (e[1] = r),
            (e[2] = i),
            (e[3] = -Math.sqrt(Math.abs(1 - n * n - r * r - i * i))),
            e
          );
        }),
        (h.dot = u.dot),
        (h.lerp = u.lerp),
        (h.slerp = function (e, t, n, r) {
          var i = t[0],
            s = t[1],
            o = t[2],
            u = t[3],
            a = n[0],
            f = n[1],
            l = n[2],
            c = n[3],
            h,
            p,
            d,
            v,
            m;
          return (
            (p = i * a + s * f + o * l + u * c),
            p < 0 && ((p = -p), (a = -a), (f = -f), (l = -l), (c = -c)),
            1 - p > 1e-6
              ? ((h = Math.acos(p)),
                (d = Math.sin(h)),
                (v = Math.sin((1 - r) * h) / d),
                (m = Math.sin(r * h) / d))
              : ((v = 1 - r), (m = r)),
            (e[0] = v * i + m * a),
            (e[1] = v * s + m * f),
            (e[2] = v * o + m * l),
            (e[3] = v * u + m * c),
            e
          );
        }),
        (h.invert = function (e, t) {
          var n = t[0],
            r = t[1],
            i = t[2],
            s = t[3],
            o = n * n + r * r + i * i + s * s,
            u = o ? 1 / o : 0;
          return (
            (e[0] = -n * u), (e[1] = -r * u), (e[2] = -i * u), (e[3] = s * u), e
          );
        }),
        (h.conjugate = function (e, t) {
          return (
            (e[0] = -t[0]), (e[1] = -t[1]), (e[2] = -t[2]), (e[3] = t[3]), e
          );
        }),
        (h.length = u.length),
        (h.len = h.length),
        (h.squaredLength = u.squaredLength),
        (h.sqrLen = h.squaredLength),
        (h.normalize = u.normalize),
        (h.fromMat3 = (function () {
          var e =
            typeof Int8Array != "undefined"
              ? new Int8Array([1, 2, 0])
              : [1, 2, 0];
          return function (t, n) {
            var r = n[0] + n[4] + n[8],
              i;
            if (r > 0)
              (i = Math.sqrt(r + 1)),
                (t[3] = 0.5 * i),
                (i = 0.5 / i),
                (t[0] = (n[7] - n[5]) * i),
                (t[1] = (n[2] - n[6]) * i),
                (t[2] = (n[3] - n[1]) * i);
            else {
              var s = 0;
              n[4] > n[0] && (s = 1), n[8] > n[s * 3 + s] && (s = 2);
              var o = e[s],
                u = e[o];
              (i = Math.sqrt(n[s * 3 + s] - n[o * 3 + o] - n[u * 3 + u] + 1)),
                (t[s] = 0.5 * i),
                (i = 0.5 / i),
                (t[3] = (n[u * 3 + o] - n[o * 3 + u]) * i),
                (t[o] = (n[o * 3 + s] + n[s * 3 + o]) * i),
                (t[u] = (n[u * 3 + s] + n[s * 3 + u]) * i);
            }
            return t;
          };
        })()),
        (h.str = function (e) {
          return "quat(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")";
        }),
        typeof e != "undefined" && (e.quat = h);
    })(t.exports);
})(this);
ig.baked = true;
ig.module("plugins.twopointfive.gl-matrix").defines(function () {});
ig.baked = true;
ig.module("plugins.twopointfive.namespace")
  .requires("plugins.twopointfive.gl-matrix")
  .defines(function () {
    "use strict";
    window.tpf = window.tpf || {};
  });
ig.baked = true;
ig.module("plugins.twopointfive.renderer.quad")
  .requires("plugins.twopointfive.namespace")
  .defines(function () {
    "use strict";
    tpf.Quad = function (width, height, texture) {
      this.texture = texture || null;
      this.width = width || 1;
      this.height = height || 1;
      this.color = { r: 1, g: 1, b: 1, a: 1 };
      this.position = vec3.create();
      this.rotation = vec3.create();
      this._dirty = true;
      this._verts = new Float32Array(tpf.Quad.SIZE);
      this._vertsPos = [
        this._verts.subarray(0 * 9, 0 * 9 + 3),
        this._verts.subarray(1 * 9, 1 * 9 + 3),
        this._verts.subarray(2 * 9, 2 * 9 + 3),
        this._verts.subarray(3 * 9, 3 * 9 + 3),
        this._verts.subarray(4 * 9, 4 * 9 + 3),
        this._verts.subarray(5 * 9, 5 * 9 + 3),
      ];
      this._recalcPositions = function () {
        var v = this._verts;
        var vp = this._vertsPos;
        var rot = this.rotation;
        var m = mat4.identity(tpf.Quad._workMatrix);
        var sx2 = this.width / 2,
          sy2 = this.height / 2;
        vp[0][0] = -sx2;
        vp[0][1] = -sy2;
        vp[0][2] = 0;
        vp[1][0] = sx2;
        vp[1][1] = -sy2;
        vp[1][2] = 0;
        vp[2][0] = -sx2;
        vp[2][1] = sy2;
        vp[2][2] = 0;
        vp[3][0] = sx2;
        vp[3][1] = sy2;
        vp[3][2] = 0;
        mat4.translate(m, m, this.position);
        if (rot[0]) {
          mat4.rotateX(m, m, rot[0]);
        }
        if (rot[1]) {
          mat4.rotateY(m, m, rot[1]);
        }
        if (rot[2]) {
          mat4.rotateZ(m, m, rot[2]);
        }
        vec3.transformMat4(vp[0], vp[0], m);
        vec3.transformMat4(vp[1], vp[1], m);
        vec3.transformMat4(vp[2], vp[2], m);
        vec3.transformMat4(vp[3], vp[3], m);
        vp[4].set(vp[2]);
        vp[5].set(vp[1]);
      };
      this.setSize = function (width, height) {
        this.width = width;
        this.height = height;
        this._dirty = true;
      };
      this.setPosition = function (x, y, z) {
        this.position[0] = x;
        this.position[1] = y;
        this.position[2] = z;
        this._dirty = true;
      };
      this.setRotation = function (x, y, z) {
        this.rotation[0] = x;
        this.rotation[1] = y;
        this.rotation[2] = z;
        this._dirty = true;
      };
      this.setUV = function (x1, y1, x2, y2) {
        var v = this._verts;
        v[3] = x1;
        v[4] = y1;
        v[12] = x2;
        v[13] = y1;
        v[21] = x1;
        v[22] = y2;
        v[30] = x2;
        v[31] = y2;
        v[39] = x1;
        v[40] = y2;
        v[48] = x2;
        v[49] = y1;
      };
      this.setUV(0, 0, 1, 1);
      this.setColor = function (c) {
        this.color.r = c.r;
        this.color.g = c.g;
        this.color.b = c.b;
        var v = this._verts;
        v[5] = c.r;
        v[6] = c.g;
        v[7] = c.b;
        v[14] = c.r;
        v[15] = c.g;
        v[16] = c.b;
        v[23] = c.r;
        v[24] = c.g;
        v[25] = c.b;
        v[32] = c.r;
        v[33] = c.g;
        v[34] = c.b;
        v[41] = c.r;
        v[42] = c.g;
        v[43] = c.b;
        v[50] = c.r;
        v[51] = c.g;
        v[52] = c.b;
      };
      this.setColor(this.color);
      this.setAlpha = function (a) {
        var v = this._verts;
        this.color.a = a;
        v[8] = a;
        v[17] = a;
        v[26] = a;
        v[35] = a;
        v[44] = a;
        v[53] = a;
      };
      this.setAlpha(this.color.a);
      this.copyToBuffer = function (buffer, index) {
        if (this._dirty) {
          this._recalcPositions();
          this._dirty = false;
        }
        buffer.set(this._verts, index);
      };
    };
    tpf.Quad.setUVInBuffer = function (buffer, offset, x1, y1, x2, y2) {
      var b = offset * tpf.Quad.SIZE;
      var v = buffer;
      v[b + 3] = x1;
      v[b + 4] = y1;
      v[b + 12] = x2;
      v[b + 13] = y1;
      v[b + 21] = x1;
      v[b + 22] = y2;
      v[b + 30] = x2;
      v[b + 31] = y2;
      v[b + 39] = x1;
      v[b + 40] = y2;
      v[b + 48] = x2;
      v[b + 49] = y1;
    };
    tpf.Quad.VERTEX_SIZE = 9;
    tpf.Quad.VERTICES = 6;
    tpf.Quad.SIZE = tpf.Quad.VERTEX_SIZE * tpf.Quad.VERTICES;
    if (!ig.global.wm) {
      tpf.Quad._workMatrix = mat4.create();
    }
  });
ig.baked = true;
ig.module("plugins.twopointfive.world.tile")
  .requires(
    "impact.image",
    "plugins.twopointfive.namespace",
    "plugins.twopointfive.renderer.quad"
  )
  .defines(function () {
    "use strict";
    tpf.Tile = ig.Class.extend({
      tile: -1,
      scale: 0,
      image: null,
      quad: null,
      init: function (image, tile, tileWidth, tileHeight, scale) {
        this.scale = scale || 1;
        this.image = image;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight || tileWidth;
        this.quad = new tpf.Quad(
          this.tileWidth * this.scale,
          this.tileHeight * this.scale,
          this.image.texture
        );
        this.setTile(tile || 0);
      },
      setTile: function (t) {
        if (t == this.tile) {
          return;
        }
        this.tile = t;
        var tileSpacing = this.image.seamsExpanded ? 2 : 0,
          tx = t % Math.floor(this.image.width / this.tileWidth),
          ty = Math.floor(t / Math.floor(this.image.width / this.tileWidth));
        var px =
            (tx * this.tileWidth + tx * tileSpacing) / this.image.textureWidth,
          py =
            (ty * this.tileHeight + ty * tileSpacing) /
            this.image.textureHeight,
          wx = this.tileWidth / this.image.textureWidth,
          wy = this.tileHeight / this.image.textureHeight;
        this.quad.setUV(px, py + wy, px + wx, py);
      },
      setTileInBuffer: function (buffer, offset, t) {
        var tileSpacing = this.image.seamsExpanded ? 2 : 0,
          tx = t % Math.floor(this.image.width / this.tileWidth),
          ty = Math.floor(t / Math.floor(this.image.width / this.tileWidth));
        var px =
            (tx * this.tileWidth + tx * tileSpacing) / this.image.textureWidth,
          py =
            (ty * this.tileHeight + ty * tileSpacing) /
            this.image.textureHeight,
          wx = this.tileWidth / this.image.textureWidth,
          wy = this.tileHeight / this.image.textureHeight;
        tpf.Quad.setUVInBuffer(buffer, offset, px, py + wy, px + wx, py);
      },
      draw: function () {
        ig.system.renderer.pushQuad(this.quad);
      },
    });
    tpf.TileMesh = function (tiles) {
      this.animatedTiles = [];
      this.length = tiles.length;
      if (!this.length) {
        return;
      }
      this.buffer = new Float32Array(tpf.Quad.SIZE * this.length);
      this.texture = tiles[0].quad.texture;
      for (var i = 0; i < this.length; i++) {
        var tile = tiles[i];
        tile.quad.copyToBuffer(this.buffer, i * tpf.Quad.SIZE);
        if (tile.anim) {
          this.animatedTiles.push({ tile: tile, offset: i });
        }
      }
    };
    tpf.TileMesh.prototype.updateAnimations = function () {
      for (var i = 0; i < this.animatedTiles.length; i++) {
        var at = this.animatedTiles[i];
        at.tile.setTileInBuffer(this.buffer, at.offset, at.tile.anim.tile);
      }
    };
    tpf.HudTile = tpf.Tile.extend({
      init: function (image, tile, tileWidth, tileHeight) {
        this.image = image;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight || tileWidth;
        this.quad = new tpf.Quad(
          this.tileWidth,
          this.tileHeight,
          this.image.texture
        );
        this.setTile(tile || 0);
      },
      setTile: function (t) {
        if (t == this.tile) {
          return;
        }
        this.tile = t;
        var tx =
            (Math.floor(t * this.tileWidth) % this.image.width) /
            this.image.width,
          ty =
            (Math.floor((t * this.tileWidth) / this.image.width) *
              this.tileHeight) /
            this.image.height,
          wx = this.tileWidth / this.image.width,
          wy = this.tileHeight / this.image.height;
        this.quad.setUV(tx, 1 - (ty + wy), tx + wx, 1 - ty);
      },
      setPosition: function (x, y) {
        this.quad.setPosition(
          x + this.tileWidth / 2,
          y + this.tileHeight / 2,
          0
        );
      },
      setAlpha: function (a) {
        this.quad.setAlpha(a.limit(0, 1));
      },
    });
  });
ig.baked = true;
ig.module("plugins.twopointfive.world.map")
  .requires(
    "impact.background-map",
    "plugins.twopointfive.namespace",
    "plugins.twopointfive.world.tile"
  )
  .defines(function () {
    "use strict";
    tpf.Map = ig.BackgroundMap.extend({
      tileData: {},
      yOffset: 0,
      init: function (tilesize, data, tileset, orientation, anims) {
        this.parent(tilesize, data, tileset);
        if (tpf.Map.fixTileSeams) {
          this.tiles.expandSeams(tilesize);
        }
        this.yOffset = (this.tilesize / 2) * (orientation == "floor" ? -1 : 1);
        this.anims = anims || {};
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var tile = this.data[y][x];
            if (tile !== 0) {
              if (!this.tileData[y]) {
                this.tileData[y] = {};
              }
              var anim = this.anims[tile - 1] || null;
              this.tileData[y][x] = this.createTileAtPosition(
                tile - 1,
                x,
                y,
                anim
              );
            }
          }
        }
      },
      draw: function () {},
      hasTile: function (x, y) {
        return x >= 0 && y >= 0 && this.data[y] && this.data[y][x];
      },
      createTileAtPosition: function (tile, x, y, anim) {
        var t = new tpf.Tile(this.tiles, tile, this.tilesize);
        t.quad.setPosition(
          x * this.tilesize + this.tilesize / 2,
          this.yOffset,
          y * this.tilesize + this.tilesize / 2
        );
        t.quad.setRotation((-90).toRad(), 0, 0);
        t.anim = anim;
        return t;
      },
      applyLightMap: function (lightMap) {
        for (var y in this.tileData) {
          for (var x in this.tileData[y]) {
            var tile = this.tileData[y][x],
              rx = x | 0,
              ry = y | 0;
            tile.quad.setColor(lightMap.getLight(rx, ry));
          }
        }
      },
      getTilesInRect: function (xs, ys, w, h) {
        var tiles = [];
        for (var y = ys; y < ys + h; y++) {
          if (!this.tileData[y]) {
            continue;
          }
          for (var x = xs; x < xs + w; x++) {
            if (!this.tileData[y][x]) {
              continue;
            }
            tiles.push(this.tileData[y][x]);
          }
        }
        return tiles;
      },
    });
    tpf.Map.fixTileSeams = true;
  });
ig.baked = true;
ig.module("plugins.twopointfive.world.wall-map")
  .requires("plugins.twopointfive.namespace", "plugins.twopointfive.world.map")
  .defines(function () {
    "use strict";
    tpf.WallMap = tpf.Map.extend({
      createTileAtPosition: function (tile, x, y, anim) {
        var tiles = {};
        for (var name in tpf.WallMap.offsets) {
          var off = tpf.WallMap.offsets[name];
          var tile_id = tile;
          if (tile >= 8 && tile <= 10) {
            if (ig.game.player.__tilePosX < x) {
              if (name == "bottom") tile_id = 14;
              if (name == "top") tile_id = 15;
            } else {
              if (name == "bottom") tile_id = 15;
              if (name == "top") tile_id = 14;
            }
          }
          if (tile >= 16 && tile <= 18) {
            if (ig.game.player.__tilePosY < y) {
              if (name == "left") tile_id = 14;
              if (name == "right") tile_id = 15;
            } else {
              if (name == "left") tile_id = 15;
              if (name == "right") tile_id = 14;
            }
          }
          var t = new tpf.Tile(this.tiles, tile_id, this.tilesize);
          t.quad.setPosition(
            (x + off.x / 2 + 0.5) * this.tilesize,
            0,
            (y + off.y / 2 + 0.5) * this.tilesize
          );
          t.quad.setRotation(0, off.rot, 0);
          t.anim = anim;
          tiles[name] = t;
        }
        return tiles;
      },
      applyLightMap: function (lightMap) {
        for (var y in this.tileData) {
          for (var x in this.tileData[y]) {
            var tiles = this.tileData[y][x],
              rx = x | 0,
              ry = y | 0;
            for (var name in tiles) {
              var off = tpf.WallMap.offsets[name];
              tiles[name].quad.setColor(
                lightMap.getLight(rx + off.x, ry + off.y)
              );
            }
          }
        }
      },
      getTilesInRect: function (xs, ys, w, h) {
        var tiles = [];
        for (var y = ys; y < ys + h; y++) {
          for (var x = xs; x < xs + w; x++) {
            for (var name in tpf.WallMap.offsets) {
              var off = tpf.WallMap.offsets[name];
              var tx = x - off.x,
                ty = y - off.y;
              if (this.hasTile(tx, ty) && this.tileData[ty][tx][name]) {
                tiles.push(this.tileData[ty][tx][name]);
              }
            }
          }
        }
        return tiles;
      },
      eraseDisconnectedWalls: function (floorMap) {
        for (var y in this.tileData) {
          for (var x in this.tileData[y]) {
            var tiles = this.tileData[y][x],
              rx = x | 0,
              ry = y | 0;
            for (var name in tpf.WallMap.offsets) {
              var off = tpf.WallMap.offsets[name];
              if (!floorMap.hasTile(rx + off.x, ry + off.y)) {
                delete tiles[name];
              }
            }
          }
        }
      },
    });
    tpf.WallMap.offsets = {
      top: { x: 0, y: -1, rot: (180).toRad() },
      bottom: { x: 0, y: 1, rot: (0).toRad() },
      right: { x: 1, y: 0, rot: (90).toRad() },
      left: { x: -1, y: 0, rot: (-90).toRad() },
    };
  });
ig.baked = true;
ig.module("plugins.twopointfive.world.light-map")
  .requires("impact.image", "impact.map", "plugins.twopointfive.namespace")
  .defines(function () {
    "use strict";
    tpf.LightMap = ig.Map.extend({
      white: { r: 1, g: 1, b: 1 },
      init: function (tilesize, data, tileset) {
        this.parent(tilesize, ig.copy(data));
        var tilesetName = tileset instanceof ig.Image ? tileset.path : tileset;
        var tiles = new ig.Image(tilesetName);
        var px = ig.getImagePixels(
          tiles.data,
          0,
          0,
          tiles.width,
          tiles.height
        ).data;
        var colors = [];
        for (var y = 0; y < tiles.height; y += tilesize) {
          for (var x = 0; x < tiles.width; x += tilesize) {
            var index = (y * tiles.width + x) * 4;
            var color = {
              r: px[index] / 255,
              g: px[index + 1] / 255,
              b: px[index + 2] / 255,
            };
            colors.push(color);
          }
        }
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var tile = this.data[y][x];
            this.data[y][x] = tile ? colors[tile - 1] : this.white;
          }
        }
      },
      getLight: function (x, y) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
          return this.data[y][x];
        } else {
          return this.white;
        }
      },
    });
  });
ig.baked = true;
ig.module("plugins.twopointfive.world.culled-sectors")
  .requires(
    "plugins.twopointfive.namespace",
    "plugins.twopointfive.renderer.quad"
  )
  .defines(function () {
    "use strict";
    tpf.CulledSectors = ig.Class.extend({
      sectorSize: 4,
      tilesize: 8,
      sectors: {},
      numSectors: 0,
      sectorsTraversed: 0,
      init: function (fillMap, geometryMaps, sectorSize) {
        this.sectorSize = sectorSize || 4;
        this.tilesize = fillMap.tilesize;
        this.generateSectors(sectorSize, fillMap, geometryMaps);
      },
      draw: function (cx, cy, angle, fov) {
        var visibleSectors = this.collectVisibleSectors(cx, cy, angle, fov);
        this.drawWorld(visibleSectors);
        this.drawEntities(visibleSectors);
      },
      drawWorld: function (visibleSectors) {
        for (var s in visibleSectors) {
          visibleSectors[s].world.updateAnimations();
          ig.system.renderer.pushMesh(visibleSectors[s].world);
        }
      },
      drawEntities: function (visibleSectors) {
        var defferedDraw = [];
        for (var s in visibleSectors) {
          var ents = visibleSectors[s].entities;
          for (var e in ents) {
            if (ents[e].zIndex) {
              defferedDraw.push(ents[e]);
            } else {
              ents[e].draw();
            }
          }
        }
        defferedDraw.sort(ig.Game.SORT.Z_INDEX);
        for (var i = 0; i < defferedDraw.length; i++) {
          defferedDraw[i].draw();
        }
      },
      collectVisibleSectors: function (cx, cy, angle, fov) {
        this.sectorsTraversed = 0;
        var visibleSectors = {};
        var sx = (cx / (this.sectorSize * this.tilesize)) | 0,
          sy = (cy / (this.sectorSize * this.tilesize)) | 0;
        if (!this.sectors[sy] || !this.sectors[sy][sx]) {
          return visibleSectors;
        }
        var sector = this.sectors[sy][sx];
        var fov2 = fov / 2;
        var viewFrustum = {
          cx: cx,
          cy: cy,
          x1: cx + Math.cos(angle - fov2),
          y1: cy + Math.sin(angle - fov2),
          x2: cx + Math.cos(angle + fov2),
          y2: cy + Math.sin(angle + fov2),
        };
        this.traverseSector(sector, viewFrustum, null, visibleSectors);
        return visibleSectors;
      },
      moveEntity: function (ent) {
        var tt = this.sectorSize * this.tilesize;
        var newsx = ((ent.pos.x + ent.size.x / 2) / tt) | 0,
          newsy = ((ent.pos.y + ent.size.y / 2) / tt) | 0;
        if (ent.__sectorX === newsx && ent.__sectorY === newsy) {
          return;
        }
        if (ent.__sectorX !== null && ent.__sectorY !== null) {
          this.removeEntityFromSector(ent.__sectorX, ent.__sectorY, ent);
        }
        this.addEntityToSector(newsx, newsy, ent);
        ent.__sectorX = newsx;
        ent.__sectorY = newsy;
      },
      removeEntity: function (ent) {
        if (ent.__sectorX !== null && ent.__sectorY !== null) {
          this.removeEntityFromSector(ent.__sectorX, ent.__sectorY, ent);
        }
        ent.__sectorX = null;
        ent.__sectorY = null;
      },
      addEntityToSector: function (sx, sy, ent) {
        if (!this.sectors[sy]) {
          return;
        }
        var sector = this.sectors[sy][sx];
        if (!sector) {
          return;
        }
        sector.entities[ent.id] = ent;
      },
      removeEntityFromSector: function (sx, sy, ent) {
        if (!this.sectors[sy]) {
          return;
        }
        var sector = this.sectors[sy][sx];
        if (!sector) {
          return;
        }
        delete sector.entities[ent.id];
      },
      traverseSector: function (sector, frustum, from, visibleSectors) {
        visibleSectors[sector.id] = sector;
        this.sectorsTraversed++;
        for (var i = 0; i < sector.portals.length; i++) {
          var portal = sector.portals[i];
          if (portal.to != from) {
            var fp = this.frustumThroughPortal(portal, frustum);
            if (fp) {
              this.traverseSector(portal.to, fp, sector, visibleSectors);
            }
          }
        }
      },
      pointToSideOfRay: function (x, y, rsx, rsy, rex, rey) {
        return (y - rsy) * (rex - rsx) - (x - rsx) * (rey - rsy);
      },
      frustumThroughPortal: function (portal, frustum) {
        var side = this.pointToSideOfRay;
        var p1f1 =
          side(
            portal.x1,
            portal.y1,
            frustum.cx,
            frustum.cy,
            frustum.x1,
            frustum.y1
          ) > 0;
        var p1f2 =
          side(
            portal.x1,
            portal.y1,
            frustum.cx,
            frustum.cy,
            frustum.x2,
            frustum.y2
          ) < 0;
        var p2f1 =
          side(
            portal.x2,
            portal.y2,
            frustum.cx,
            frustum.cy,
            frustum.x1,
            frustum.y1
          ) > 0;
        var p2f2 =
          side(
            portal.x2,
            portal.y2,
            frustum.cx,
            frustum.cy,
            frustum.x2,
            frustum.y2
          ) < 0;
        var ppx1 = frustum.cx,
          ppy1 = frustum.cy,
          ppx2 = frustum.cx + (portal.x1 - portal.x2),
          ppy2 = frustum.cy + (portal.y1 - portal.y2);
        var perpp = side(portal.x1, portal.y1, ppx1, ppy1, ppx2, ppy2) > 0;
        var perpf = side(frustum.x1, frustum.y1, ppx1, ppy1, ppx2, ppy2) > 0;
        var front = perpf ? perpp : !perpp;
        if (
          !(
            (p1f1 && p1f2) ||
            (p2f1 && p2f2) ||
            (front && (p1f1 || p2f1) && (p1f2 || p2f2))
          )
        ) {
          return null;
        }
        var nfx1, nfy1, nfx2, nfy2;
        if (p1f1 && p1f2) {
          nfx1 = portal.x1;
          nfy1 = portal.y1;
        } else if (!p1f1 && (p1f2 || front)) {
          nfx1 = frustum.x1;
          nfy1 = frustum.y1;
        } else {
          nfx1 = frustum.x2;
          nfy1 = frustum.y2;
        }
        if (p2f1 && p2f2) {
          nfx2 = portal.x2;
          nfy2 = portal.y2;
        } else if (!p2f1 && (p2f2 || front)) {
          nfx2 = frustum.x1;
          nfy2 = frustum.y1;
        } else {
          nfx2 = frustum.x2;
          nfy2 = frustum.y2;
        }
        var narrowedFrustum = perpp
          ? {
              cx: frustum.cx,
              cy: frustum.cy,
              x1: nfx1,
              y1: nfy1,
              x2: nfx2,
              y2: nfy2,
            }
          : {
              cx: frustum.cx,
              cy: frustum.cy,
              x1: nfx2,
              y1: nfy2,
              x2: nfx1,
              y2: nfy1,
            };
        return narrowedFrustum;
      },
      generateSectors: function (sectorSize, fillMap, geometryMaps) {
        var tilesize = fillMap.tilesize;
        for (var x = sectorSize; x < fillMap.width; x += sectorSize) {
          var currentLength = 0;
          var currentStart = 0;
          for (var y = 0; y < fillMap.height; y++) {
            var left = fillMap.data[y][x - 1];
            var right = fillMap.data[y][x];
            if (
              (y % sectorSize == 0 ||
                !left ||
                !right ||
                y == fillMap.height - 1) &&
              currentLength
            ) {
              var sx = (x / sectorSize) | 0,
                sy = ((y - 1) / sectorSize) | 0;
              var s1 = this.createSectorIfNeeded(sx - 1, sy, geometryMaps),
                s2 = this.createSectorIfNeeded(sx, sy, geometryMaps);
              this.addPortal(
                x * tilesize,
                currentStart * tilesize,
                x * tilesize,
                y * tilesize,
                s1,
                s2
              );
              currentStart = y;
              currentLength = 0;
            }
            if (left && right) {
              currentLength++;
            } else {
              currentStart = y + 1;
            }
          }
        }
        for (var y = sectorSize; y < fillMap.height; y += sectorSize) {
          var currentLength = 0;
          var currentStart = 0;
          for (var x = 0; x < fillMap.width; x++) {
            var top = fillMap.data[y - 1][x];
            var bottom = fillMap.data[y][x];
            if (
              (x % sectorSize == 0 ||
                !top ||
                !bottom ||
                x == fillMap.width - 1) &&
              currentLength
            ) {
              var sx = ((x - 1) / sectorSize) | 0,
                sy = (y / sectorSize) | 0;
              var s1 = this.createSectorIfNeeded(sx, sy - 1, geometryMaps),
                s2 = this.createSectorIfNeeded(sx, sy, geometryMaps);
              this.addPortal(
                currentStart * tilesize,
                y * tilesize,
                x * tilesize,
                y * tilesize,
                s1,
                s2
              );
              currentStart = x;
              currentLength = 0;
            }
            if (top && bottom) {
              currentLength++;
            } else {
              currentStart = x + 1;
            }
          }
        }
      },
      createSectorIfNeeded: function (x, y, maps) {
        if (!this.sectors[y]) {
          this.sectors[y] = {};
        } else if (this.sectors[y][x]) {
          return this.sectors[y][x];
        }
        var s = this.createSector(x, y, maps);
        this.sectors[y][x] = s;
        return s;
      },
      createSector: function (x, y, maps) {
        var geometry = [],
          tx = x * this.sectorSize,
          ty = y * this.sectorSize,
          tw = this.sectorSize,
          th = this.sectorSize;
        var tiles = [];
        for (var i = 0; i < maps.length; i++) {
          tiles = tiles.concat(maps[i].getTilesInRect(tx, ty, tw, th));
        }
        var mesh = new tpf.TileMesh(tiles);
        return {
          id: this.numSectors++,
          x: x,
          y: y,
          portals: [],
          world: mesh,
          entities: {},
        };
      },
      addPortal: function (px1, py1, px2, py2, s1, s2) {
        s1.portals.push({ x1: px1, y1: py1, x2: px2, y2: py2, to: s2 });
        s2.portals.push({ x1: px1, y1: py1, x2: px2, y2: py2, to: s1 });
      },
    });
  });
ig.baked = true;
ig.module("plugins.twopointfive.entity")
  .requires(
    "impact.entity",
    "plugins.twopointfive.namespace",
    "plugins.twopointfive.world.tile"
  )
  .defines(function () {
    "use strict";
    tpf.Entity = ig.Entity.extend({
      tile: null,
      scale: 0.25,
      pos: { x: 0, y: 0, z: 0 },
      vel: { x: 0, y: 0, z: 0 },
      accel: { x: 0, y: 0, z: 0 },
      maxVel: { x: 10000, y: 10000, z: 10000 },
      dynamicLight: true,
      _wmDrawBox: true,
      _wmBoxColor: "#ff5500",
      rotateToView: true,
      __tilePosX: -1,
      __tilePosY: -1,
      __sectorX: null,
      __sectorY: null,
      init: function (x, y, settings) {
        this.parent(x, y, settings);
        if (ig.global.wm) {
          return;
        }
        if (this.animSheet) {
          this.tile = new tpf.Tile(
            this.animSheet.image,
            0,
            this.animSheet.width,
            this.animSheet.height,
            this.scale
          );
          this.updateQuad();
        }
        ig.game.culledSectors.moveEntity(this);
      },
      reset: function (x, y, settings) {
        this.parent(x, y, settings);
        ig.game.culledSectors.moveEntity(this);
        this.updateQuad();
      },
      kill: function () {
        this.parent();
        this.remove();
      },
      handleMovementTrace: function (res) {
        var z = this.pos.z;
        this.parent(res);
        this.pos.z = z;
      },
      remove: function () {
        ig.game.culledSectors.removeEntity(this);
      },
      updateQuad: function () {
        if (this.tile && this.currentAnim) {
          this.tile.setTile(this.currentAnim.tile);
          var tpos = this.tile.quad.position;
          tpos[0] = this.pos.x + this.size.x / 2;
          tpos[2] = this.pos.y + this.size.y / 2;
          tpos[1] =
            this.pos.z -
            ig.game.collisionMap.tilesize / 2 +
            (this.animSheet.height * this.scale) / 2;
          if (this.rotateToView) {
            this.tile.quad.rotation[1] = ig.system.camera.rotation[1];
          }
          this.tile.quad._dirty = true;
        }
        var lm = ig.game.lightMap;
        if (this.dynamicLight && lm) {
          var ntx = Math.floor((this.pos.x + this.size.x / 2) / lm.tilesize),
            nty = Math.floor((this.pos.y + this.size.y / 2) / lm.tilesize);
          if (ntx !== this.__tilePosX || nty !== this.__tilePosY) {
            this.__tilePosX = ntx;
            this.__tilePosY = nty;
            this.setLight(lm.getLight(ntx, nty));
          }
        }
        if (
          this.tile &&
          !this._killed &&
          (this.pos.x != this.last.x || this.pos.y != this.last.y)
        ) {
          ig.game.culledSectors.moveEntity(this);
        }
      },
      canSee: function (other) {
        var sx = this.pos.x + this.size.x / 2,
          sy = this.pos.y + this.size.y / 2;
        var res = ig.game.collisionMap.trace(
          sx,
          sy,
          other.pos.x + other.size.x / 2 - sx,
          other.pos.y + other.size.y / 2 - sy,
          1,
          1
        );
        return !res.collision.x && !res.collision.y;
      },
      update: function () {
        this.last.x = this.pos.x;
        this.last.y = this.pos.y;
        this.vel.z -= ig.game.gravity * ig.system.tick * this.gravityFactor;
        this.vel.x = this.getNewVelocity(
          this.vel.x,
          this.accel.x,
          this.friction.x,
          this.maxVel.x
        );
        this.vel.y = this.getNewVelocity(
          this.vel.y,
          this.accel.y,
          this.friction.y,
          this.maxVel.y
        );
        this.vel.z = this.getNewVelocity(
          this.vel.z,
          this.accel.z,
          0,
          this.maxVel.z
        );
        var mx = this.vel.x * ig.system.tick;
        var my = this.vel.y * ig.system.tick;
        var res = ig.game.collisionMap.trace(
          this.pos.x,
          this.pos.y,
          mx,
          my,
          this.size.x,
          this.size.y
        );
        this.handleMovementTrace(res);
        this.pos.z += this.vel.z;
        if (this.pos.z < 0) {
          if (
            this.bounciness > 0 &&
            Math.abs(this.vel.z) > this.minBounceVelocity
          ) {
            this.vel.z *= -this.bounciness;
          } else {
            this.vel.z = 0;
          }
          this.pos.z = 0;
        }
        if (this.currentAnim) {
          this.currentAnim.update();
        }
        this.updateQuad();
      },
      setLight: function (color) {
        if (!this.tile) {
          return;
        }
        this.tile.quad.setColor(color);
      },
      draw: function () {
        if (ig.global.wm) {
          return;
        } else if (this.tile) {
          this.tile.draw();
        }
      },
    });
  });
ig.baked = true;
ig.module("plugins.twopointfive.font")
  .requires(
    "impact.font",
    "plugins.twopointfive.namespace",
    "plugins.twopointfive.renderer.quad"
  )
  .defines(function () {
    "use strict";
    tpf.Font = ig.Font.extend({
      _quads: [],
      _glAlpha: 1,
      draw: function (text, x, y, align, alpha) {
        this._glAlpha = typeof alpha != "undefined" ? alpha : 1;
        this.parent(text, x, y, align);
      },
      _drawChar: function (c, targetX, targetY) {
        if (!this.loaded || c < 0 || c >= this.indices.length) {
          return 0;
        }
        var charX = this.indices[c];
        var charY = 0;
        var charWidth = this.widthMap[c];
        var charHeight = this.height - 2;
        var q = this._quads[c];
        q.setAlpha(this._glAlpha);
        q.setPosition(targetX + charWidth / 2, targetY + charHeight / 2, 0);
        ig.system.renderer.pushQuad(q);
        return charWidth + this.letterSpacing;
      },
      onload: function (event) {
        this.parent(event);
        var charHeight = this.height - 2;
        for (var i = 0; i < this.indices.length; i++) {
          var index = this.indices[i];
          var charWidth = this.widthMap[i];
          var q = new tpf.Quad(charWidth, charHeight, this.texture);
          q.setUV(
            index / this.data.width,
            0,
            (index + charWidth) / this.data.width,
            charHeight / this.data.height
          );
          this._quads.push(q);
        }
      },
    });
  });
ig.baked = true;
ig.module("plugins.twopointfive.renderer.program")
  .requires("plugins.twopointfive.namespace")
  .defines(function () {
    "use strict";
    tpf.Program = ig.Class.extend({
      uniform: {},
      attribute: {},
      init: function (gl, vertexSource, fragmentSource) {
        var vsh = this.compile(gl, vertexSource, gl.VERTEX_SHADER);
        var fsh = this.compile(gl, fragmentSource, gl.FRAGMENT_SHADER);
        this.program = gl.createProgram();
        gl.attachShader(this.program, vsh);
        gl.attachShader(this.program, fsh);
        gl.linkProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
          console.log(gl.getProgramInfoLog(this.program));
        }
        gl.useProgram(this.program);
        this._collect(vertexSource, "attribute", this.attribute);
        for (var a in this.attribute) {
          this.attribute[a] = gl.getAttribLocation(this.program, a);
        }
        this._collect(vertexSource, "uniform", this.uniform);
        this._collect(fragmentSource, "uniform", this.uniform);
        for (var u in this.uniform) {
          this.uniform[u] = gl.getUniformLocation(this.program, u);
        }
      },
      compile: function (gl, source, type) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.log(gl.getShaderInfoLog(shader));
          return null;
        }
        return shader;
      },
      _collect: function (source, prefix, collection) {
        var r = new RegExp("\\b" + prefix + " \\w+ (\\w+)", "ig");
        source.replace(r, function (match, name) {
          collection[name] = 0;
          return match;
        });
      },
    });
  });
ig.baked = true;
ig.module("plugins.twopointfive.renderer.renderer")
  .requires(
    "plugins.twopointfive.namespace",
    "plugins.twopointfive.renderer.quad",
    "plugins.twopointfive.renderer.program"
  )
  .defines(function () {
    "use strict";
    tpf.Renderer = ig.Class.extend({
      bufferSize: 64,
      buffer: null,
      texture: null,
      bufferIndex: 0,
      gl: null,
      drawCalls: 0,
      _currentDrawCalls: 0,
      _currentQuadCount: 0,
      depthTest: true,
      wireframe: false,
      fog: null,
      fullscreenFlags: {},
      init: function (canvas) {
        this.canvas = canvas;
        var webglOptions = {
          alpha: false,
          premultipliedAlpha: false,
          antialias: false,
          stencil: false,
          preserveDrawingBuffer: true,
        };
        this.gl = canvas.getContext("webgl", webglOptions);
        if (!this.gl) {
          this.gl = canvas.getContext("experimental-webgl", webglOptions);
        }
        this.setSize(canvas.width, canvas.height);
        this.programDefault = new tpf.Program(
          this.gl,
          tpf.Renderer.Shaders.Vertex,
          tpf.Renderer.Shaders.Fragment
        );
        this.programFog = new tpf.Program(
          this.gl,
          tpf.Renderer.Shaders.Vertex,
          tpf.Renderer.Shaders.FragmentWithFog
        );
        this.program = this.programDefault;
        this.buffer = new Float32Array(this.bufferSize * tpf.Quad.SIZE);
        this.glBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.glBuffer);
        this.prepare();
        this.whiteTexture = this.loadTexture(
          new Uint8Array([0xff, 0xff, 0xff, 0xff]),
          1,
          1
        );
        this.setProgram(this.programDefault);
      },
      setFog: function (color, near, far) {
        if (color === false || typeof color === "undefined") {
          this.setProgram(this.programDefault, true);
          this.fog = null;
        } else {
          this.setProgram(this.programFog, true);
          this.fog = { color: color, near: near, far: far };
          var c1 = ((color & 0xff0000) >> 16) / 255,
            c2 = ((color & 0x00ff00) >> 8) / 255,
            c3 = ((color & 0x0000ff) >> 0) / 255;
          this.gl.uniform3f(this.program.uniform.fogColor, c1, c2, c3);
          this.gl.uniform1f(this.program.uniform.fogNear, near);
          this.gl.uniform1f(this.program.uniform.fogFar, far);
        }
      },
      setSize: function (width, height) {
        this.width = width;
        this.height = height;
        this.gl.viewport(0, 0, this.width, this.height);
      },
      loadTexture: function (img, width, height) {
        var texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        if (img instanceof Uint8Array && width && height) {
          this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            0,
            this.gl.RGBA,
            width,
            height,
            0,
            this.gl.RGBA,
            this.gl.UNSIGNED_BYTE,
            img
          );
        } else {
          this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            0,
            this.gl.RGBA,
            this.gl.RGBA,
            this.gl.UNSIGNED_BYTE,
            img
          );
        }
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_MAG_FILTER,
          this.gl.NEAREST
        );
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_MIN_FILTER,
          this.gl.LINEAR
        );
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_WRAP_S,
          this.gl.CLAMP_TO_EDGE
        );
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_WRAP_T,
          this.gl.CLAMP_TO_EDGE
        );
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        this.texture = null;
        return texture;
      },
      clear: function (color, depth, stencil) {
        this.gl.clear(
          (color ? this.gl.COLOR_BUFFER_BIT : 0) |
            (depth ? this.gl.DEPTH_BUFFER_BIT : 0) |
            (stencil ? this.gl.STENCIL_BUFFER_BIT : 0)
        );
      },
      prepare: function () {
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.useProgram(this.program.program);
        this.gl.clearColor(0, 0, 0, 1);
        var floatSize = Float32Array.BYTES_PER_ELEMENT;
        var vertSize = floatSize * tpf.Quad.VERTEX_SIZE;
        this.gl.enableVertexAttribArray(this.program.attribute.pos);
        this.gl.vertexAttribPointer(
          this.program.attribute.pos,
          3,
          this.gl.FLOAT,
          false,
          vertSize,
          0 * floatSize
        );
        this.gl.enableVertexAttribArray(this.program.attribute.uv);
        this.gl.vertexAttribPointer(
          this.program.attribute.uv,
          2,
          this.gl.FLOAT,
          false,
          vertSize,
          3 * floatSize
        );
        this.gl.enableVertexAttribArray(this.program.attribute.color);
        this.gl.vertexAttribPointer(
          this.program.attribute.color,
          4,
          this.gl.FLOAT,
          false,
          vertSize,
          5 * floatSize
        );
      },
      flush: function () {
        if (this.bufferIndex == 0) {
          return;
        }
        this._currentDrawCalls++;
        this._currentQuadCount += this.bufferIndex;
        this.gl.bufferData(
          this.gl.ARRAY_BUFFER,
          this.buffer,
          this.gl.DYNAMIC_DRAW
        );
        this.gl.drawArrays(
          this.gl.TRIANGLES,
          0,
          this.bufferIndex * tpf.Quad.VERTICES
        );
        this.bufferIndex = 0;
      },
      render: function (callback) {
        if (this.wireframe) {
          this.clear(true, true, true);
        }
        callback(this);
        this.flush();
        this.drawCalls = this._currentDrawCalls;
        this.quadCount = this._currentQuadCount;
        this._currentDrawCalls = 0;
        this._currentQuadCount = 0;
      },
      setCamera: function (camera) {
        this.flush();
        this.gl.uniformMatrix4fv(
          this.program.uniform.projection,
          false,
          camera.projection()
        );
        this.gl.uniformMatrix4fv(
          this.program.uniform.view,
          false,
          camera.view()
        );
        if (camera.depthTest != this.depthTest) {
          this.depthTest = camera.depthTest;
          if (this.depthTest) {
            this.gl.enable(this.gl.DEPTH_TEST);
          } else {
            this.gl.disable(this.gl.DEPTH_TEST);
          }
        }
      },
      setTexture: function (texture) {
        texture = texture || this.whiteTexture;
        if (texture == this.texture) {
          return;
        }
        this.flush();
        this.texture = texture;
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
      },
      setProgram: function (program, force) {
        if (program == this.program && !force) {
          return;
        }
        this.flush();
        this.program = program;
        this.gl.useProgram(this.program.program);
      },
      pushQuad: function (quad) {
        this.setTexture(quad.texture);
        if (this.bufferIndex + 1 >= this.bufferSize) {
          this.flush();
        }
        quad.copyToBuffer(this.buffer, this.bufferIndex * tpf.Quad.SIZE);
        this.bufferIndex++;
      },
      pushMesh: function (mesh) {
        this.flush();
        this._currentDrawCalls++;
        this._currentQuadCount += mesh.length;
        this.setTexture(mesh.texture);
        this.gl.bufferData(
          this.gl.ARRAY_BUFFER,
          mesh.buffer,
          this.gl.DYNAMIC_DRAW
        );
        var polygonMode = this.wireframe ? this.gl.LINES : this.gl.TRIANGLES;
        this.gl.drawArrays(polygonMode, 0, mesh.length * tpf.Quad.VERTICES);
      },
    });
    tpf.Renderer.Shaders = {
      Vertex: [
        "precision highp float;",
        "attribute vec3 pos;",
        "attribute vec2 uv;",
        "attribute vec4 color;",
        "varying vec4 vColor;",
        "varying vec2 vUv;",
        "uniform mat4 view;",
        "uniform mat4 projection;",
        "void main(void) {",
        "vColor = color;",
        "vUv = uv;",
        "gl_Position = projection * view * vec4(pos, 1.0);",
        "}",
      ].join("\n"),
      Fragment: [
        "precision highp float;",
        "varying vec4 vColor;",
        "varying vec2 vUv;",
        "uniform sampler2D texture;",
        "void main(void) {",
        "vec4 tex = texture2D(texture, vUv);",
        "if( tex.a < 0.8 ) discard;",
        "gl_FragColor =  tex * vColor;",
        "}",
      ].join("\n"),
      FragmentWithFog: [
        "precision highp float;",
        "varying vec4 vColor;",
        "varying vec2 vUv;",
        "uniform sampler2D texture;",
        "uniform vec3 fogColor;",
        "uniform float fogNear;",
        "uniform float fogFar;",
        "void main(void) {",
        "float depth = gl_FragCoord.z / gl_FragCoord.w;",
        "float fogFactor = smoothstep( fogFar, fogNear, depth );",
        "fogFactor = 1.0 - clamp( fogFactor, 0.2, 1.0);",
        "vec4 tex = texture2D(texture, vUv);",
        "if( tex.a < 0.8 ) discard;",
        "gl_FragColor =  tex * vColor;",
        "gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor.rgb, fogFactor);",
        "}",
      ].join("\n"),
    };
  });
ig.baked = true;
ig.module("plugins.twopointfive.image")
  .requires(
    "impact.image",
    "plugins.twopointfive.namespace",
    "plugins.twopointfive.renderer.renderer"
  )
  .defines(function () {
    "use strict";
    ig.Image.inject({
      texture: null,
      seamsExpanded: false,
      textureWidth: 0,
      textureHeight: 0,
      onload: function (event) {
        this.texture = ig.system.renderer.loadTexture(this.data);
        this.textureWidth = this.data.width;
        this.textureHeight = this.data.height;
        this.parent(event);
      },
      expandSeams: function (tilesize) {
        if (this.seamsExpanded) {
          return;
        }
        this.seamsExpanded = true;
        var tw = (this.width / tilesize) | 0,
          th = (this.height / tilesize) | 0;
        this.textureWidth = this.width + tw * 2 - 2;
        this.textureHeight = this.height + th * 2 - 2;
        var expandedCanvas = ig.$new("canvas");
        expandedCanvas.width = this.textureWidth;
        expandedCanvas.height = this.textureHeight;
        var ctx = expandedCanvas.getContext("2d");
        ig.System.SCALE.CRISP(expandedCanvas, ctx);
        for (var y = 0, dy = -1; y < th; y++, dy += tilesize + 2) {
          for (var x = 0, dx = -1; x < tw; x++, dx += tilesize + 2) {
            if (dx > 0) {
              ctx.drawImage(
                this.data,
                x * tilesize,
                y * tilesize,
                1,
                tilesize,
                dx,
                dy + 1,
                1,
                tilesize
              );
            }
            if (dx < this.width - tilesize) {
              ctx.drawImage(
                this.data,
                (x + 1) * tilesize - 1,
                y * tilesize,
                1,
                tilesize,
                dx + tilesize + 1,
                dy + 1,
                1,
                tilesize
              );
            }
            if (dy > 0) {
              ctx.drawImage(
                this.data,
                x * tilesize,
                y * tilesize,
                tilesize,
                1,
                dx,
                dy,
                tilesize + 2,
                1
              );
              ctx.drawImage(
                this.data,
                x * tilesize,
                y * tilesize,
                tilesize,
                1,
                dx + 1,
                dy,
                tilesize,
                1
              );
            }
            if (dy < this.height - tilesize) {
              ctx.drawImage(
                this.data,
                x * tilesize,
                (y + 1) * tilesize - 1,
                tilesize,
                1,
                dx,
                dy + tilesize + 1,
                tilesize + 2,
                1
              );
              ctx.drawImage(
                this.data,
                x * tilesize,
                (y + 1) * tilesize - 1,
                tilesize,
                1,
                dx + 1,
                dy + tilesize + 1,
                tilesize,
                1
              );
            }
            ctx.drawImage(
              this.data,
              x * tilesize,
              y * tilesize,
              tilesize,
              tilesize,
              dx + 1,
              dy + 1,
              tilesize,
              tilesize
            );
          }
        }
        this.texture = ig.system.renderer.loadTexture(expandedCanvas);
      },
    });
  });
ig.baked = true;
ig.module("plugins.twopointfive.loader")
  .requires(
    "impact.loader",
    "plugins.twopointfive.namespace",
    "plugins.twopointfive.renderer.renderer"
  )
  .defines(function () {
    "use strict";
    tpf.Loader = ig.Loader.extend({
      rotation: 0,
      blockFaces: [],
      loadingBar: null,
      loadingBarBackground: null,
      barSize: { x: 16, y: 0.1 },
      load: function () {
        var that = this;
        this.blockImage = new ig.Image("media/loading-block.png");
        this.blockImage.load(function () {
          if (!that._intervalId) {
            ig.Loader.prototype.load.call(that);
          }
        });
      },
      createGeometry: function () {
        this.loadingBarBackground = new tpf.Quad(
          this.barSize.x,
          this.barSize.y
        );
        this.loadingBarBackground.setPosition(0, -8, 0);
        this.loadingBarBackground.setColor({ r: 0.1, g: 0.1, b: 0.1 });
        this.loadingBar = new tpf.Quad(this.barSize.x, this.barSize.y);
        this.loadingBar.setPosition(0, -8, 0);
        this.loadingBar.setColor({ r: 1, g: 1, b: 1 });
        this.blockFaces[0] = new tpf.Tile(this.blockImage, 0, 64, 64, 0.125);
        this.blockFaces[0].quad.setPosition(0, 0, -4);
        this.blockFaces[1] = new tpf.Tile(this.blockImage, 0, 64, 64, 0.125);
        this.blockFaces[1].quad.setPosition(4, 0, 0);
        this.blockFaces[1].quad.setRotation(0, -Math.PI / 2, 0);
        this.blockFaces[2] = new tpf.Tile(this.blockImage, 0, 64, 64, 0.125);
        this.blockFaces[2].quad.setPosition(0, 0, 4);
        this.blockFaces[3] = new tpf.Tile(this.blockImage, 0, 64, 64, 0.125);
        this.blockFaces[3].quad.setPosition(-4, 0, 0);
        this.blockFaces[3].quad.setRotation(0, Math.PI / 2, 0);
      },
      draw: function () {
        if (!this.loadingBar) {
          this.createGeometry();
        }
        this.rotation += 0.2 * this.status * this.status;
        ig.system.renderer.render(this.renderCallback.bind(this));
      },
      renderCallback: function () {
        var renderer = ig.system.renderer;
        var camera = ig.system.camera;
        renderer.clear(true, true, true);
        camera.position[0] = Math.cos(this.rotation) * 20;
        camera.position[2] = Math.sin(this.rotation) * 20;
        camera.rotation[1] = -this.rotation + Math.PI / 2;
        renderer.setCamera(camera);
        for (var i = 0; i < this.blockFaces.length; i++) {
          var c = (Math.sin(this.rotation - ((i + 1.2) * Math.PI) / 2) + 1) / 2;
          this.blockFaces[i].quad.setColor({ r: c, g: c, b: c });
          this.blockFaces[i].draw();
        }
        camera.position[0] = 0;
        camera.position[2] = 20;
        camera.rotation[1] = 0;
        renderer.setCamera(camera);
        this.loadingBar.setPosition(
          (-(1 - this.status) * this.barSize.x) / 2,
          -8,
          0
        );
        this.loadingBar.setSize(this.status * this.barSize.x, this.barSize.y);
        renderer.pushQuad(this.loadingBar);
        renderer.pushQuad(this.loadingBarBackground);
      },
    });
  });
ig.baked = true;
ig.module("plugins.twopointfive.renderer.ortho-camera")
  .requires("plugins.twopointfive.namespace")
  .defines(function () {
    "use strict";
    tpf.OrthoCamera = ig.Class.extend({
      _projection: null,
      _view: null,
      aspect: 1,
      depthTest: false,
      init: function (width, height) {
        this._projection = mat4.create();
        this._view = mat4.create();
        mat4.ortho(this._projection, 0, width, height, 0, -1000, 1000);
        this.aspect = width / height;
        this.width = width;
        this.height = height;
      },
      projection: function () {
        return this._projection;
      },
      view: function () {
        return this._view;
      },
    });
  });
ig.baked = true;
ig.module("plugins.twopointfive.renderer.perspective-camera")
  .requires("plugins.twopointfive.namespace")
  .defines(function () {
    "use strict";
    tpf.PerspectiveCamera = ig.Class.extend({
      _projection: null,
      _view: null,
      position: null,
      rotation: null,
      aspect: 1,
      depthTest: true,
      init: function (fov, aspect, near, far) {
        this._projection = mat4.create();
        this._view = mat4.create();
        this.position = vec3.create();
        this.rotation = vec3.create();
        mat4.perspective(this._projection, fov.toRad(), aspect, near, far);
        this.aspect = aspect;
      },
      setRotation: function (x, y, z) {
        this.rotation[0] = x;
        this.rotation[1] = z;
        this.rotation[2] = y;
      },
      setPosition: function (x, y, z) {
        this.position[0] = x;
        this.position[1] = z;
        this.position[2] = y;
      },
      projection: function () {
        return this._projection;
      },
      view: function () {
        var m = this._view;
        var rot = this.rotation;
        mat4.identity(m);
        if (rot[2]) {
          mat4.rotateZ(m, m, -rot[2]);
        }
        if (rot[0]) {
          mat4.rotateX(m, m, -rot[0]);
        }
        if (rot[1]) {
          mat4.rotateY(m, m, -rot[1]);
        }
        mat4.translate(m, m, [
          -this.position[0],
          -this.position[1],
          -this.position[2],
        ]);
        return m;
      },
    });
  });
ig.baked = true;
ig.module("plugins.twopointfive.renderer.stereo-renderer")
  .requires(
    "plugins.twopointfive.namespace",
    "plugins.twopointfive.renderer.renderer"
  )
  .defines(function () {
    "use strict";
    tpf.StereoRenderer = tpf.Renderer.extend({
      eyes: {
        left: { offset: 0, projection: null, viewport: {}, quad: null },
        right: { offset: 0, projection: null, viewport: {}, quad: null },
      },
      sensorDevice: null,
      hmdDevice: null,
      vrMode: false,
      currentEye: null,
      worldScale: 32 / 1.8,
      viewportFov: (110).toRad(),
      hudFreelook: false,
      hudDistance: 250,
      init: function (canvas, worldScale) {
        this.parent(canvas);
        this.worldScale = worldScale || this.worldScale;
        if (navigator.getVRDevices) {
          navigator.getVRDevices().then(this.enumerateVRDevices.bind(this));
        } else if (navigator.mozGetVRDevices) {
          navigator.mozGetVRDevices(this.enumerateVRDevices.bind(this));
        } else {
          alert("No WebVR support!");
        }
      },
      enumerateVRDevices: function (devices) {
        for (var i = 0; i < devices.length; i++) {
          if (devices[i] instanceof HMDVRDevice) {
            this.hmdDevice = devices[i];
            this.eyes.left.offset = this.hmdDevice.getEyeTranslation("left");
            this.eyes.right.offset = this.hmdDevice.getEyeTranslation("right");
            break;
          }
        }
        for (var i = 0; i < devices.length; i++) {
          if (
            devices[i] instanceof PositionSensorVRDevice &&
            (!this.hmdDevice ||
              devices[i].hardwareUnitId == this.hmdDevice.hardwareUnitId)
          ) {
            this.sensorDevice = devices[i];
            break;
          }
        }
        this.fullscreenFlags = { vrDisplay: this.hmdDevice };
        ig.system.requestFullscreen();
        this.setFov();
      },
      setFov: function () {
        if (!this.hmdDevice) {
          return;
        }
        var fovLeft, fovRight;
        if ("getRecommendedEyeRenderRect" in this.hmdDevice) {
          var leftEyeViewport =
            this.hmdDevice.getRecommendedEyeRenderRect("left");
          var rightEyeViewport =
            this.hmdDevice.getRecommendedEyeRenderRect("right");
          var renderTargetWidth =
            leftEyeViewport.width + rightEyeViewport.width;
          var renderTargetHeight = Math.max(
            leftEyeViewport.height,
            rightEyeViewport.height
          );
        }
        this.setSize(renderTargetWidth, renderTargetHeight);
        if ("getCurrentEyeFieldOfView" in this.hmdDevice) {
          fovLeft = this.hmdDevice.getCurrentEyeFieldOfView("left");
          fovRight = this.hmdDevice.getCurrentEyeFieldOfView("right");
        } else {
          fovLeft = this.hmdDevice.getRecommendedEyeFieldOfView("left");
          fovRight = this.hmdDevice.getRecommendedEyeFieldOfView("right");
        }
        this.eyes.left.projection = this.perspectiveMatrixFromVRFieldOfView(
          fovLeft,
          0.1,
          1000
        );
        this.eyes.right.projection = this.perspectiveMatrixFromVRFieldOfView(
          fovRight,
          0.1,
          1000
        );
      },
      perspectiveMatrixFromVRFieldOfView: function (fov, zNear, zFar) {
        var out = mat4.create();
        var upTan, downTan, leftTan, rightTan;
        if (fov == null) {
          upTan = Math.tan((50 * Math.PI) / 180.0);
          downTan = Math.tan((50 * Math.PI) / 180.0);
          leftTan = Math.tan((45 * Math.PI) / 180.0);
          rightTan = Math.tan((45 * Math.PI) / 180.0);
        } else {
          upTan = Math.tan((fov.upDegrees * Math.PI) / 180.0);
          downTan = Math.tan((fov.downDegrees * Math.PI) / 180.0);
          leftTan = Math.tan((fov.leftDegrees * Math.PI) / 180.0);
          rightTan = Math.tan((fov.rightDegrees * Math.PI) / 180.0);
        }
        var xScale = 2.0 / (leftTan + rightTan);
        var yScale = 2.0 / (upTan + downTan);
        out[0] = xScale;
        out[4] = 0.0;
        out[8] = -((leftTan - rightTan) * xScale * 0.5);
        out[12] = 0.0;
        out[1] = 0.0;
        out[5] = yScale;
        out[9] = (upTan - downTan) * yScale * 0.5;
        out[13] = 0.0;
        out[2] = 0.0;
        out[6] = 0.0;
        out[10] = zFar / (zNear - zFar);
        out[14] = (zFar * zNear) / (zNear - zFar);
        out[3] = 0.0;
        out[7] = 0.0;
        out[11] = -1.0;
        out[15] = 0.0;
        return out;
      },
      setSize: function (width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.parent(width, height);
        var width2 = width / 2;
        this.eyes.left.viewport = { x: 0, y: 0, width: width2, height: height };
        this.eyes.right.viewport = {
          x: width2,
          y: 0,
          width: width2,
          height: height,
        };
      },
      _renderSceneForEye: function (eye, sceneCallback) {
        this.gl.viewport(
          eye.viewport.x,
          eye.viewport.y,
          eye.viewport.width,
          eye.viewport.height
        );
        this.currentEye = eye;
        sceneCallback(this);
        this.flush();
      },
      render: function (sceneCallback) {
        if (!this.hmdDevice) {
          return this.parent(sceneCallback);
        }
        if (this.wireframe) {
          this.clear(true, true, true);
        }
        this._renderSceneForEye(this.eyes.left, sceneCallback);
        this._renderSceneForEye(this.eyes.right, sceneCallback);
        this.drawCalls = this._currentDrawCalls;
        this.quadCount = this._currentQuadCount;
        this._currentDrawCalls = 0;
        this._currentQuadCount = 0;
      },
      setCamera: function (camera) {
        this.flush();
        var projection = camera.projection();
        var view = camera.view();
        if (camera instanceof tpf.PerspectiveCamera) {
          var tt = vec3.fromValues(
            Math.cos(camera.rotation[1]) *
              -this.currentEye.offset.x *
              this.worldScale,
            0,
            Math.sin(camera.rotation[1]) *
              this.currentEye.offset.x *
              this.worldScale
          );
          mat4.translate(view, view, tt);
          projection = this.currentEye.projection;
        } else if (camera instanceof tpf.OrthoCamera) {
          var ts = this.getHMDState();
          projection = this.currentEye.projection;
          var tt = vec3.fromValues(
            -camera.width * 0.5,
            camera.height * 0.5,
            -this.hudDistance
          );
          var inv = vec3.fromValues(1, -1, 1);
          view = mat4.create();
          view = mat4.rotateX(view, view, -ts.rotation[2]);
          view = mat4.rotateZ(view, view, -ts.rotation[1]);
          if (this.hudFreelook) {
            view = mat4.rotateY(view, view, -ts.rotation[0]);
          } else {
            this.HMDRotation += this.lastHMDRotation - ts.rotation[0];
            this.HMDRotation *= 0.95;
            view = mat4.rotateY(view, view, this.HMDRotation);
            this.lastHMDRotation = ts.rotation[0];
          }
          view = mat4.translate(view, view, tt);
          view = mat4.scale(view, view, inv);
        }
        this.gl.uniformMatrix4fv(
          this.program.uniform.projection,
          false,
          projection
        );
        this.gl.uniformMatrix4fv(this.program.uniform.view, false, view);
        if (camera.depthTest != this.depthTest) {
          this.depthTest = camera.depthTest;
          if (this.depthTest) {
            this.gl.enable(this.gl.DEPTH_TEST);
          } else {
            this.gl.disable(this.gl.DEPTH_TEST);
          }
        }
      },
      HMDRotation: 0,
      lastHMDRotation: 0,
      reset: function () {
        if (this.sensorDevice) {
          this.sensorDevice.zeroSensor();
        }
      },
      getHMDState: function () {
        var state = { position: [0, 0, 0], rotation: [0, 0, 0] };
        if (!this.sensorDevice) {
          return state;
        }
        var s = this.sensorDevice.getState();
        state.position = [
          s.position.x * this.worldScale,
          s.position.y * this.worldScale,
          s.position.z * this.worldScale,
        ];
        var q = s.orientation;
        var sqw = q.w * q.w;
        var sqx = q.x * q.x;
        var sqy = q.y * q.y;
        var sqz = q.z * q.z;
        var unit = sqx + sqy + sqz + sqw;
        var test = q.x * q.y + q.z * q.w;
        if (test > 0.499 * unit) {
          state.rotation[0] = 2 * Math.atan2(q.x, q.w);
          state.rotation[1] = Math.PI / 2;
          state.rotation[2] = 0;
        } else if (test < -0.499 * unit) {
          state.rotation[0] = -2 * Math.atan2(q.x, q.w);
          state.rotation[1] = -Math.PI / 2;
          state.rotation[2] = 0;
        } else {
          state.rotation[0] = Math.atan2(
            2 * q.y * q.w - 2 * q.x * q.z,
            sqx - sqy - sqz + sqw
          );
          state.rotation[1] = Math.asin((2 * test) / unit);
          state.rotation[2] = Math.atan2(
            2 * q.x * q.w - 2 * q.y * q.z,
            -sqx + sqy - sqz + sqw
          );
        }
        return state;
      },
    });
    tpf.StereoRenderer.hasWebVR = function () {
      return navigator.getVRDevices || navigator.mozGetVRDevices;
    };
  });
ig.baked = true;
ig.module("plugins.twopointfive.system")
  .requires(
    "impact.system",
    "plugins.twopointfive.namespace",
    "plugins.twopointfive.renderer.ortho-camera",
    "plugins.twopointfive.renderer.perspective-camera",
    "plugins.twopointfive.renderer.renderer",
    "plugins.twopointfive.renderer.stereo-renderer"
  )
  .defines(function () {
    "use strict";
    ig.System.inject({
      renderer: null,
      scene: null,
      camera: null,
      isFullscreen: false,
      hasMouseLock: false,
      initialWidth: 640,
      initialHeight: 480,
      fov: 75,
      stereoMode: false,
      init: function (canvasId, fps, width, height, scale) {
        this.initialWidth = width;
        this.initialHeight = height;
        this.clock = new ig.Timer();
        this.canvas = ig.$(canvasId);
        this.canvas.width = width * ig.ua.pixelRatio;
        this.canvas.height = height * ig.ua.pixelRatio;
        this.canvas.style.width = width + "px";
        this.canvas.style.height = height + "px";
        this.realWidth = this.width = width;
        this.realHeight = this.height = height;
        this.renderer = new tpf.Renderer(canvas);
        this.resize(width, height, scale);
      },
      horizontalFov: function () {
        if (this.renderer.viewportFov) {
          return this.renderer.viewportFov.toDeg();
        }
        return this.fov * this.camera.aspect;
      },
      resize: function (width, height, scale) {
        var r = ig.System.useRetina ? ig.ua.pixelRatio : 1;
        this.width = width;
        this.height = height;
        this.realWidth = this.width = width;
        this.realHeight = this.height = height;
        this.canvas.width = width * r;
        this.canvas.height = height * r;
        this.renderer.setSize(width * r, height * r);
        this.canvas.style.width = width + "px";
        this.canvas.style.height = height + "px";
        this.camera = new tpf.PerspectiveCamera(
          this.fov,
          width / height,
          1,
          10000
        );
        document.getElementById("overlay").style.transform =
          "scale(" + width / 640 + ", " + height / 480 + ")";
      },
      setStereoMode: function (on) {
        if (on && !tpf.StereoRenderer.hasWebVR()) {
          alert("No WebVR Support found :/");
          return;
        }
        var fog = this.renderer && this.renderer.fog;
        this.stereoMode = on;
        if (on) {
          this.renderer = new tpf.StereoRenderer(canvas);
        } else {
          this.renderer = new tpf.Renderer(canvas);
        }
        if (fog) {
          this.renderer.setFog(fog.color, fog.near, fog.far);
        }
      },
      setupFullscreenMouselockOnce: function () {
        if (this.fullscreenSetupComplete) {
          return;
        }
        this.canvas.requestFullscreen =
          ig.getVendorAttribute(this.canvas, "requestFullscreen") ||
          ig.getVendorAttribute(this.canvas, "requestFullScreen");
        var fullscreenCallback = this.fullscreenCallback.bind(this);
        document.addEventListener(
          "fullscreenchange",
          fullscreenCallback,
          false
        );
        document.addEventListener(
          "mozfullscreenchange",
          fullscreenCallback,
          false
        );
        document.addEventListener(
          "webkitfullscreenchange",
          fullscreenCallback,
          false
        );
        ig.normalizeVendorAttribute(this.canvas, "requestPointerLock");
        var mouseLockCallback = this.mouseLockCallback.bind(this);
        document.addEventListener(
          "pointerlockchange",
          mouseLockCallback,
          false
        );
        document.addEventListener(
          "mozpointerlockchange",
          mouseLockCallback,
          false
        );
        document.addEventListener(
          "webkitpointerlockchange",
          mouseLockCallback,
          false
        );
        this.fullscreenSetupComplete = true;
      },
      requestFullscreen: function () {
        this.setupFullscreenMouselockOnce();
        this.canvas.requestFullscreen(this.renderer.fullscreenFlags);
      },
      requestMouseLock: function () {
        this.setupFullscreenMouselockOnce();
        this.canvas.requestPointerLock();
      },
      fullscreenCallback: function (ev) {
        if (
          document.webkitFullscreenElement === this.canvas ||
          document.mozFullscreenElement === this.canvas ||
          document.mozFullScreenElement === this.canvas
        ) {
          this.isFullscreen = true;
          this.resize(screen.width, screen.height, 1);
          this.canvas.requestPointerLock();
        } else {
          this.isFullscreen = false;
          this.resize(this.initialWidth, this.initialHeight, 1);
        }
        return true;
      },
      mouseLockCallback: function (ev) {
        this.hasMouseLock =
          document.pointerLockElement === this.canvas ||
          document.mozPointerLockElement === this.canvas ||
          document.webkitPointerLockElement === this.canvas;
      },
      clear: function () {},
    });
    ig.System.useRetina = true;
    ig.System._hasWebGL = null;
    ig.System.hasWebGL = function () {
      if (ig.System._hasWebGL === null) {
        var canvas = document.createElement("canvas");
        var gl = null;
        try {
          gl = canvas.getContext("webgl");
        } catch (x) {
          gl = null;
        }
        if (gl === null) {
          try {
            gl = canvas.getContext("experimental-webgl");
          } catch (x) {
            gl = null;
          }
        }
        ig.System._hasWebGL = gl !== null;
      }
      return ig.System._hasWebGL;
    };
  });
ig.baked = true;
ig.module("plugins.twopointfive.game")
  .requires(
    "impact.game",
    "plugins.twopointfive.namespace",
    "plugins.twopointfive.world.map",
    "plugins.twopointfive.world.wall-map",
    "plugins.twopointfive.world.light-map",
    "plugins.twopointfive.world.culled-sectors",
    "plugins.twopointfive.entity",
    "plugins.twopointfive.font",
    "plugins.twopointfive.image",
    "plugins.twopointfive.loader",
    "plugins.twopointfive.system"
  )
  .defines(function () {
    "use strict";
    tpf.Game = ig.Game.extend({
      culledSectors: null,
      sectorSize: 4,
      clearColor: null,
      clearLevel: function () {
        for (var i = 0; i < this.entities.length; i++) {
          if (this.entities[i] instanceof tpf.Entity) {
            this.entities[i].remove();
          }
        }
        this.entities = [];
        this.namedEntities = {};
        this.culledSectors = null;
        this.collisionMap = ig.CollisionMap.staticNoCollision;
        this.backgroundMaps = [];
        this.lightMap = null;
      },
      loadLevel: function (data) {
        this.clearLevel();
        for (var i = 0; i < data.layer.length; i++) {
          var ld = data.layer[i];
          if (ld.name == "collision") {
            this.collisionMap = new ig.CollisionMap(ld.tilesize, ld.data);
          } else if (ld.name == "light") {
            this.lightMap = new tpf.LightMap(
              ld.tilesize,
              ld.data,
              ld.tilesetName
            );
          } else if (
            ld.name == "walls" ||
            ld.name == "floor" ||
            ld.name == "ceiling"
          ) {
            var MapClass = ld.name == "walls" ? tpf.WallMap : tpf.Map;
            var anims = this.backgroundAnims[ld.tilesetName] || {};
            var newMap = new MapClass(
              ld.tilesize,
              ld.data,
              ld.tilesetName,
              ld.name,
              anims
            );
            newMap.name = ld.name;
            this.backgroundMaps.push(newMap);
          }
        }
        var floorMap = this.getMapByName("floor");
        var wallMap = this.getMapByName("walls");
        if (floorMap && wallMap) {
          wallMap.eraseDisconnectedWalls(floorMap);
        }
        if (this.lightMap) {
          for (var i = 0; i < this.backgroundMaps.length; i++) {
            this.backgroundMaps[i].applyLightMap(this.lightMap);
          }
        }
        this.culledSectors = new tpf.CulledSectors(
          floorMap,
          this.backgroundMaps,
          this.sectorSize
        );
        for (var i = 0; i < data.entities.length; i++) {
          var ent = data.entities[i];
          this.spawnEntity(ent.type, ent.x, ent.y, ent.settings);
        }
        for (var i = 0; i < this.entities.length; i++) {
          this.entities[i].ready();
        }
      },
      draw: function () {
        ig.system.renderer.render(this.drawCallback.bind(this));
      },
      drawCallback: function (renderer) {
        if (this.clearColor) {
          var c = this.clearColor;
          ig.system.renderer.gl.clearColor(c[0], c[1], c[2], 1);
        }
        ig.system.renderer.clear(!!this.clearColor, true);
        this.drawWorld();
        var fog = ig.system.renderer.fog;
        ig.system.renderer.setFog(false);
        this.drawHud();
        if (fog) {
          ig.system.renderer.setFog(fog.color, fog.near, fog.far);
        }
      },
      drawWorld: function () {
        if (!this.culledSectors) {
          return;
        }
        ig.system.renderer.setCamera(ig.system.camera);
        var cx = ig.system.camera.position[0],
          cy = ig.system.camera.position[2],
          cullAngle = -ig.system.camera.rotation[1] - Math.PI / 2,
          fov = ig.system.horizontalFov().toRad();
        this.culledSectors.draw(cx, cy, cullAngle, fov);
      },
      drawHud: function () {},
    });
  });
ig.baked = true;
ig.module("plugins.touch-button")
  .requires("impact.system", "impact.input", "impact.image")
  .defines(function () {
    "use strict";
    ig.TouchButton = ig.Class.extend({
      action: "undefined",
      image: null,
      tile: 0,
      pos: { x: 0, y: 0 },
      size: { x: 0, y: 0 },
      area: { x1: 0, y1: 0, x2: 0, y2: 0 },
      pressed: false,
      touchId: 0,
      anchor: null,
      init: function (action, anchor, width, height, image, tile) {
        this.action = action;
        this.anchor = anchor;
        this.size = { x: width, y: height };
        this.image = image || null;
        this.tile = tile || 0;
      },
      align: function (w, h) {
        if ("left" in this.anchor) {
          this.pos.x = this.anchor.left;
        } else if ("right" in this.anchor) {
          this.pos.x = w - this.anchor.right - this.size.x;
        }
        if ("top" in this.anchor) {
          this.pos.y = this.anchor.top;
        } else if ("bottom" in this.anchor) {
          this.pos.y = h - this.anchor.bottom - this.size.y;
        }
        var internalWidth =
          parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth;
        var s = ig.system.scale * (internalWidth / ig.system.realWidth);
        this.area = {
          x1: this.pos.x * s,
          y1: this.pos.y * s,
          x2: (this.pos.x + this.size.x) * s,
          y2: (this.pos.y + this.size.y) * s,
        };
      },
      touchStart: function (ev) {
        if (this.pressed) {
          return;
        }
        var pos = { left: 0, top: 0 };
        if (ig.system.canvas.getBoundingClientRect) {
          pos = ig.system.canvas.getBoundingClientRect();
        }
        for (var i = 0; i < ev.touches.length; i++) {
          var touch = ev.touches[i];
          if (
            this.checkStart(
              touch.identifier,
              touch.clientX - pos.left,
              touch.clientY - pos.top
            )
          ) {
            return;
          }
        }
      },
      touchEnd: function (ev) {
        if (!this.pressed) {
          return;
        }
        for (var i = 0; i < ev.changedTouches.length; i++) {
          if (this.checkEnd(ev.changedTouches[i].identifier)) {
            return;
          }
        }
      },
      touchStartMS: function (ev) {
        if (this.pressed) {
          return;
        }
        var pos = { left: 0, top: 0 };
        if (ig.system.canvas.getBoundingClientRect) {
          pos = ig.system.canvas.getBoundingClientRect();
        }
        this.checkStart(
          ev.pointerId,
          ev.clientX - pos.left,
          ev.clientY - pos.top
        );
      },
      touchEndMS: function (ev) {
        if (!this.pressed) {
          return;
        }
        this.checkEnd(ev.pointerId);
      },
      checkStart: function (id, x, y) {
        if (
          x > this.area.x1 &&
          x < this.area.x2 &&
          y > this.area.y1 &&
          y < this.area.y2
        ) {
          this.pressed = true;
          this.touchId = id;
          ig.input.actions[this.action] = true;
          if (!ig.input.locks[this.action]) {
            ig.input.presses[this.action] = true;
            ig.input.locks[this.action] = true;
          }
          return true;
        }
        return false;
      },
      checkEnd: function (id) {
        if (id === this.touchId) {
          this.pressed = false;
          this.touchId = 0;
          ig.input.delayedKeyup[this.action] = true;
          return true;
        }
        return false;
      },
      draw: function () {
        if (this.image) {
          this.image.drawTile(
            this.pos.x,
            this.pos.y,
            this.tile,
            this.size.x,
            this.size.y
          );
        }
      },
    });
    ig.TouchButtonCollection = ig.Class.extend({
      buttons: [],
      touchStartBound: null,
      touchEndBound: null,
      touchStartMSBound: null,
      touchEndMSBound: null,
      init: function (buttons) {
        this.buttons = buttons;
        this.touchStartBound = this.touchStart.bind(this);
        this.touchEndBound = this.touchEnd.bind(this);
        this.touchStartMSBound = this.touchStartMS.bind(this);
        this.touchEndMSBound = this.touchEndMS.bind(this);
        ig.system.canvas.addEventListener(
          "touchstart",
          this.touchStartBound,
          false
        );
        ig.system.canvas.addEventListener(
          "touchend",
          this.touchEndBound,
          false
        );
        ig.system.canvas.addEventListener(
          "MSPointerDown",
          this.touchStartMSBound,
          false
        );
        ig.system.canvas.addEventListener(
          "MSPointerUp",
          this.touchStartMSBound,
          false
        );
        document.body.style.msTouchAction = "none";
      },
      remove: function () {
        ig.system.canvas.removeEventListener(
          "touchstart",
          this.touchStartBound,
          false
        );
        ig.system.canvas.removeEventListener(
          "touchend",
          this.touchEndBound,
          false
        );
        ig.system.canvas.removeEventListener(
          "MSPointerDown",
          this.touchStartMSBound,
          false
        );
        ig.system.canvas.removeEventListener(
          "MSPointerUp",
          this.touchStartMSBound,
          false
        );
      },
      touchStart: function (ev) {
        ev.preventDefault();
        for (var i = 0; i < this.buttons.length; i++) {
          this.buttons[i].touchStart(ev);
        }
      },
      touchEnd: function (ev) {
        ev.preventDefault();
        for (var i = 0; i < this.buttons.length; i++) {
          this.buttons[i].touchEnd(ev);
        }
      },
      touchStartMS: function (ev) {
        ev.preventDefault();
        for (var i = 0; i < this.buttons.length; i++) {
          this.buttons[i].touchStartMS(ev);
        }
      },
      touchEndMS: function (ev) {
        ev.preventDefault();
        for (var i = 0; i < this.buttons.length; i++) {
          this.buttons[i].touchEndMS(ev);
        }
      },
      align: function () {
        var w = ig.system.width || window.innerWidth;
        var h = ig.system.height || window.innerHeight;
        for (var i = 0; i < this.buttons.length; i++) {
          this.buttons[i].align(w, h);
        }
      },
      draw: function () {
        for (var i = 0; i < this.buttons.length; i++) {
          this.buttons[i].draw();
        }
      },
    });
  });
ig.baked = true;
ig.module("plugins.touch-field")
  .requires("impact.system")
  .defines(function () {
    ig.TouchField = ig.Class.extend({
      pos: { x: 0, y: 0 },
      size: { x: 0, y: 0 },
      input: { x: 0, y: 0, dx: 0, dy: 0 },
      pressed: false,
      angle: 0,
      amount: 0,
      _touchId: null,
      _startPos: { x: 0, y: 0 },
      touched: false,
      touchStartBound: null,
      touchMoveBound: null,
      touchEndBound: null,
      init: function (x, y, width, height) {
        this.pos = { x: x, y: y };
        this.size = { x: width, y: height };
        this.touchStartBound = this.touchStart.bind(this);
        this.touchMoveBound = this.touchMove.bind(this);
        this.touchEndBound = this.touchEnd.bind(this);
        ig.system.canvas.addEventListener(
          "touchstart",
          this.touchStartBound,
          false
        );
        ig.system.canvas.addEventListener(
          "touchmove",
          this.touchMoveBound,
          false
        );
        ig.system.canvas.addEventListener(
          "touchend",
          this.touchEndBound,
          false
        );
      },
      remove: function () {
        ig.system.canvas.removeEventListener(
          "touchstart",
          this.touchStartBound,
          false
        );
        ig.system.canvas.removeEventListener(
          "touchmove",
          this.touchMoveBound,
          false
        );
        ig.system.canvas.removeEventListener(
          "touchend",
          this.touchEndBound,
          false
        );
      },
      touchStart: function (ev) {
        ev.preventDefault();
        if (this.pressed) {
          return;
        }
        for (var i = 0; i < ev.touches.length; i++) {
          var touch = ev.touches[i];
          var x = touch.pageX;
          var y = touch.pageY;
          if (
            x > this.pos.x &&
            x < this.pos.x + this.size.x &&
            y > this.pos.y &&
            y < this.pos.y + this.size.y
          ) {
            this.pressed = true;
            this.touched = true;
            this.input.dx = 0;
            this.input.dy = 0;
            this._touchId = touch.identifier;
            this._startPos.x = x;
            this._startPos.y = y;
            return;
          }
        }
      },
      touchMove: function (ev) {
        ev.preventDefault();
        for (var i = 0; i < ev.changedTouches.length; i++) {
          if (ev.changedTouches[i].identifier == this._touchId) {
            this._moved(ev.changedTouches[i]);
            return;
          }
        }
      },
      _moved: function (touch) {
        var nx = touch.pageX - this._startPos.x;
        var ny = touch.pageY - this._startPos.y;
        this.input.dx = this.input.x - nx;
        this.input.dy = this.input.y - ny;
        this.input.x = nx;
        this.input.y = ny;
      },
      touchEnd: function (ev) {
        ev.preventDefault();
        for (var i = 0; i < ev.changedTouches.length; i++) {
          if (ev.changedTouches[i].identifier == this._touchId) {
            this.pressed = false;
            this.input.x = 0;
            this.input.dx = 0;
            this.input.y = 0;
            this.input.dy = 0;
            this._touchId = null;
            return;
          }
        }
      },
    });
  });
ig.baked = true;
ig.module("plugins.gamepad")
  .requires("impact.input", "impact.game")
  .defines(function () {
    ig.GAMEPAD_BUTTON_OFFSET = 256;
    ig.GAMEPAD = {
      FACE_1: ig.GAMEPAD_BUTTON_OFFSET + 0,
      FACE_2: ig.GAMEPAD_BUTTON_OFFSET + 1,
      FACE_3: ig.GAMEPAD_BUTTON_OFFSET + 2,
      FACE_4: ig.GAMEPAD_BUTTON_OFFSET + 3,
      LEFT_SHOULDER: ig.GAMEPAD_BUTTON_OFFSET + 4,
      RIGHT_SHOULDER: ig.GAMEPAD_BUTTON_OFFSET + 5,
      LEFT_SHOULDER_BOTTOM: ig.GAMEPAD_BUTTON_OFFSET + 6,
      RIGHT_SHOULDER_BOTTOM: ig.GAMEPAD_BUTTON_OFFSET + 7,
      SELECT: ig.GAMEPAD_BUTTON_OFFSET + 8,
      START: ig.GAMEPAD_BUTTON_OFFSET + 9,
      LEFT_ANALOGUE_STICK: ig.GAMEPAD_BUTTON_OFFSET + 10,
      RIGHT_ANALOGUE_STICK: ig.GAMEPAD_BUTTON_OFFSET + 11,
      PAD_TOP: ig.GAMEPAD_BUTTON_OFFSET + 12,
      PAD_BOTTOM: ig.GAMEPAD_BUTTON_OFFSET + 13,
      PAD_LEFT: ig.GAMEPAD_BUTTON_OFFSET + 14,
      PAD_RIGHT: ig.GAMEPAD_BUTTON_OFFSET + 15,
    };
    ig.normalizeVendorAttribute(navigator, "getGamepads");
    if (!navigator.getGamepads) {
      return;
    }
    ig.Input.inject({
      gamepad: null,
      lastButtons: {},
      hasButtonObject: !!window.GamepadButton,
      getFirstGamepadSnapshot: function () {
        var gamepads = navigator.getGamepads();
        for (var i = 0; i < gamepads.length; i++) {
          if (gamepads[i]) {
            return gamepads[i];
          }
        }
        return null;
      },
      pollGamepad: function () {
        this.gamepad = this.getFirstGamepadSnapshot();
        if (!this.gamepad) {
          return;
        }
        for (var b = 0; b < this.gamepad.buttons.length; b++) {
          var action = this.bindings[b + ig.GAMEPAD_BUTTON_OFFSET];
          var currentState = false;
          if (action) {
            var button = this.gamepad.buttons[b];
            currentState =
              typeof button.pressed !== "undefined" ? button.pressed : button;
            var prevState = this.lastButtons[b];
            if (!prevState && currentState) {
              this.actions[action] = true;
              this.presses[action] = true;
            } else if (prevState && !currentState) {
              this.delayedKeyup[action] = true;
            }
          }
          this.lastButtons[b] = currentState;
        }
      },
    });
    ig.Game.inject({
      run: function () {
        ig.input.pollGamepad();
        this.parent();
      },
    });
  });
ig.baked = true;
ig.module("game.entities.void")
  .requires("impact.entity")
  .defines(function () {
    EntityVoid = ig.Entity.extend({
      _wmDrawBox: true,
      _wmBoxColor: "rgba(128, 28, 230, 0.7)",
      size: { x: 32, y: 32 },
      update: function () {},
    });
  });
ig.baked = true;
ig.module("plugins.mouse-delta")
  .requires("impact.input")
  .defines(function () {
    ig.Input.inject({
      mouseDelta: { x: 0, y: 0 },
      mousemove: function (event) {
        var oldX = this.mouse.x;
        var oldY = this.mouse.y;
        this.parent(event);
        if (event.type == "mousemove") {
          this.mouseDelta.x +=
            event.movementX ||
            event.mozMovementX ||
            event.webkitMovementX ||
            this.mouse.x - oldX;
          this.mouseDelta.y +=
            event.movementY ||
            event.mozMovementY ||
            event.webkitMovementY ||
            this.mouse.y - oldY;
        }
      },
      clearPressed: function () {
        this.parent();
        this.mouseDelta.x = 0;
        this.mouseDelta.y = 0;
      },
    });
  });
ig.baked = true;
ig.module("game.weapons.base")
  .requires("plugins.twopointfive.world.tile", "impact.animation")
  .defines(function () {
    Weapon = ig.Class.extend({
      offset: { x: 0, y: 48 },
      offsetAngle: 0,
      projectileOffset: 0,
      pos: { x: 0, y: 0 },
      bobOffset: 0,
      anim: null,
      tile: null,
      ammo: 0,
      maxAmmo: 100,
      anims: [],
      cooldown: 1,
      shootTimer: null,
      ammoIcon: null,
      currentQuadColor: { r: 1, g: 1, b: 1 },
      flashQuadColor: { r: 1, g: 1, b: 1 },
      unsetFlashTimer: null,
      init: function (ammo) {
        this.ammo = ammo || 0;
        this.tile = new tpf.HudTile(
          this.animSheet.image,
          0,
          this.animSheet.width,
          this.animSheet.height
        );
        this.pos.x =
          ig.game.hud.width / 2 - this.animSheet.width / 2 - this.offset.x;
        this.pos.y = ig.game.hud.height - this.offset.y;
        this.shootTimer = new ig.Timer();
        this.tile.setPosition(this.pos.x, this.pos.y + this.bobOffset);
      },
      addAnim: function (name, frameTime, sequence, stop) {
        if (!this.animSheet) {
          throw "No animSheet to add the animation " + name + " to.";
        }
        var a = new ig.Animation(this.animSheet, frameTime, sequence, stop);
        this.anims[name] = a;
        if (!this.currentAnim) {
          this.currentAnim = a;
        }
        return a;
      },
      trigger: function (x, y, angle) {
        if (this.ammo > 0 && this.shootTimer.delta() > 0) {
          this.shootTimer.set(this.cooldown);
          this.ammo--;
          var offsetAngle = angle - Math.PI / 2;
          var sx = x - Math.sin(offsetAngle) * this.projectileOffset,
            sy = y - Math.cos(offsetAngle) * this.projectileOffset;
          this.shoot(sx, sy, angle + this.offsetAngle);
          if (this.ammo <= 0) {
            ig.game.player.switchToPrevNonEmptyWeapon();
          }
        }
      },
      depleted: function () {
        return this.shootTimer.delta() > 0 && this.ammo <= 0;
      },
      giveAmmo: function (ammo) {
        this.ammo = Math.min(this.maxAmmo, this.ammo + ammo);
      },
      shoot: function (x, y, angle) {},
      setLight: function (color) {
        this.currentQuadColor = color;
        if (!this.tile) {
          return;
        }
        this.tile.quad.setColor(color);
      },
      flash: function (duration) {
        if (!this.tile) {
          return;
        }
        this.tile.quad.setColor(this.flashQuadColor);
        this.unsetFlashTimer = new ig.Timer(duration);
      },
      update: function () {
        this.currentAnim.update();
        this.tile.setTile(this.currentAnim.tile);
        this.tile.setPosition(this.pos.x, this.pos.y + this.bobOffset);
        if (this.unsetFlashTimer && this.unsetFlashTimer.delta() > 0) {
          this.setLight(this.currentQuadColor);
          this.unsetFlashTimer = null;
        }
      },
      draw: function () {
        this.tile.draw();
      },
    });
  });
ig.baked = true;
ig.module("impact.entity-pool")
  .requires("impact.game")
  .defines(function () {
    "use strict";
    ig.EntityPool = {
      pools: {},
      mixin: {
        staticInstantiate: function (x, y, settings) {
          return ig.EntityPool.getFromPool(this.classId, x, y, settings);
        },
        erase: function () {
          ig.EntityPool.putInPool(this);
        },
      },
      enableFor: function (Class) {
        Class.inject(this.mixin);
      },
      getFromPool: function (classId, x, y, settings) {
        var pool = this.pools[classId];
        if (!pool || !pool.length) {
          return null;
        }
        var instance = pool.pop();
        instance.reset(x, y, settings);
        return instance;
      },
      putInPool: function (instance) {
        if (!this.pools[instance.classId]) {
          this.pools[instance.classId] = [instance];
        } else {
          this.pools[instance.classId].push(instance);
        }
      },
      drainPool: function (classId) {
        delete this.pools[classId];
      },
      drainAllPools: function () {
        this.pools = {};
      },
    };
    ig.Game.inject({
      loadLevel: function (data) {
        ig.EntityPool.drainAllPools();
        this.parent(data);
      },
    });
  });
ig.baked = true;
ig.module("game.weapons.grenade-launcher")
  .requires(
    "game.weapons.base",
    "plugins.twopointfive.entity",
    "impact.entity-pool"
  )
  .defines(function () {
    WeaponGrenadeLauncher = Weapon.extend({
      offset: { x: 10, y: 276 },
      maxAmmo: 80,
      cooldown: 0.5,
      animSheet: new ig.AnimationSheet("media/grenade-launcher.png", 214, 281),
      shootSound: new ig.Sound("media/sounds/grenade-launcher.*"),
      emptySound: new ig.Sound("media/sounds/empty-click.*"),
      ammoIconImage: new ig.Image("media/grenade.png"),
      ammoIcon: null,
      init: function (ammo) {
        this.parent(ammo);
        this.addAnim("idle", 100, [0]);
        this.addAnim("shoot", 0.1, [4, 0, 0, 1, 2, 3, 2, 1, 0], true);
        this.ammoIcon = new tpf.HudTile(this.ammoIconImage, 0, 32, 32);
        this.ammoIcon.setPosition(200, 460);
        this.shootSound.volume = 0.8;
      },
      depleted: function () {
        if (this.shootTimer.delta() > 0 && this.ammo <= 0) {
          this.shootTimer.set(this.cooldown);
          this.emptySound.play();
          return true;
        } else {
          return false;
        }
      },
      shoot: function (x, y, angle) {
        ig.game.spawnEntity(EntityGrenade, x, y, { angle: angle });
        this.currentAnim = this.anims.shoot.rewind();
        this.shootSound.play();
        this.flash(0.2);
      },
    });
    EntityBlastRadius = ig.Entity.extend({
      frame: 0,
      radius: 8,
      damage: 20,
      checkAgainst: ig.Entity.TYPE.B,
      init: function (x, y, settings) {
        var offset = settings.radius || this.radius;
        this.size.x = this.size.y = offset * 2;
        this.parent(x - offset, y - offset, settings);
      },
      update: function () {
        if (this.frame == 2) {
          this.kill();
        }
        this.frame++;
      },
      draw: function () {},
      check: function (other) {
        if (this.frame != 1) {
          return;
        }
        var f = 1 - this.distanceTo(other) / this.radius;
        if (f > 0) {
          var damage = Math.ceil(Math.sqrt(f) * this.damage);
          other.receiveDamage(damage, this);
        }
      },
    });
    EntityGrenadeExplosion = tpf.Entity.extend({
      size: { x: 0, y: 0 },
      vpos: 2,
      scale: 1,
      gravityFactor: 0,
      animSheet: new ig.AnimationSheet("media/explosion.png", 32, 32),
      init: function (x, y, settings) {
        var frameTime = Math.random() * 0.1 + 0.03;
        this.addAnim("idle", frameTime, [0, 1, 2, 3], true);
        this.parent(x, y, settings);
        this.pos.z = Math.random() * 20;
      },
      reset: function (x, y, settings) {
        this.currentAnim.rewind();
        this.parent(x, y, settings);
      },
      update: function () {
        this.parent();
        if (this.currentAnim.loopCount) {
          this.kill();
        }
      },
    });
    ig.EntityPool.enableFor(EntityGrenadeExplosion);
  });
ig.baked = true;
ig.module("game.weapons.pistol-launcher")
  .requires(
    "game.weapons.base",
    "plugins.twopointfive.entity",
    "impact.entity-pool"
  )
  .defines(function () {
    WeaponPistolLauncher = Weapon.extend({
      offset: { x: 12, y: 208 },
      projectileOffset: 0,
      maxAmmo: 80,
      cooldown: 0.5,
      animSheet: new ig.AnimationSheet("media/pistol_big.png", 200, 212),
      shootSound: new ig.Sound("media/sounds/dspistol.*"),
      emptySound: new ig.Sound("media/sounds/empty-click.*"),
      ammoIconImage: new ig.Image("media/grenade.png"),
      ammoIcon: null,
      init: function (ammo) {
        this.parent(ammo);
        this.addAnim("idle", 100, [0]);
        this.addAnim("shoot", 0.1, [0, 1, 2, 3, 0], true);
        this.ammoIcon = new tpf.HudTile(this.ammoIconImage, 0, 32, 32);
        this.ammoIcon.setPosition(200, 460);
        this.shootSound.volume = 0.8;
      },
      depleted: function () {
        if (this.shootTimer.delta() > 0 && this.ammo <= 0) {
          this.shootTimer.set(this.cooldown);
          this.emptySound.play();
          return true;
        } else {
          return false;
        }
      },
      shoot: function (x, y, angle) {
        ig.game.spawnEntity(EntityGrenade, x, y, { angle: angle });
        this.currentAnim = this.anims.shoot.rewind();
        this.shootSound.play();
        this.flash(0.2);
      },
    });
    EntityGrenade = tpf.Entity.extend({
      checkAgainst: ig.Entity.TYPE.B,
      collides: ig.Entity.COLLIDES.NEVER,
      size: { x: 16, y: 16 },
      speed: 2600,
      scale: 1,
      bounciness: 0,
      minBounceVelocity: 0.5,
      blastSettings: { radius: 40, damage: 25 },
      explosionParticles: 0,
      explosionRadius: 30,
      animSheet: new ig.AnimationSheet("media/grenade.png", 32, 32),
      explodeSound: new ig.Sound("media/sounds/explosion.*"),
      bounceSound: new ig.Sound("media/sounds/grenade-bounce.*"),
      dynamicLight: true,
      init: function (x, y, settings) {
        this.parent(x - this.size.x / 2, y - this.size.y / 2, settings);
        this.addAnim("idle", 1, [0]);
        this.bounceSound.volume = 0.6;
        this.explodeSound.volume = 0.9;
        this.vel.x = -Math.sin(this.angle) * this.speed;
        this.vel.y = -Math.cos(this.angle) * this.speed;
        this.vel.z = 0;
        this.pos.z = 0;
      },
      reset: function (x, y, settings) {
        this.parent(x - this.size.x / 2, y - this.size.y / 2, settings);
        this.vel.x = -Math.sin(this.angle) * this.speed;
        this.vel.y = -Math.cos(this.angle) * this.speed;
        this.vel.z = 0;
        this.pos.z = 0;
        this.hitWall = false;
        this.currentAnim = this.anims.idle.rewind();
      },
      update: function () {
        if (this.currentAnim.loopCount > 0) {
          this.kill();
          return;
        }
        var zvel = this.vel.z;
        this.parent();
        if (zvel < 0 && this.vel.z > 0) {
          this.bounceSound.play();
        }
      },
      check: function (other) {
        this.kill();
      },
      handleMovementTrace: function (res) {
        for (var i in ig.game.entities) {
          if (ig.game.entities[i].type == ig.Entity.TYPE.B) {
            if (ig.game.entities[i].distanceTo(this) < 40) {
              ig.game.entities[i].kill();
            }
          }
        }
        if (res.collision.x || res.collision.y) {
          if (ig.game.player.distanceTo(this) < 500 && !this.hitWall) {
            this.pos.x += this.vel.x * ig.system.tick;
            this.pos.y += this.vel.y * ig.system.tick;
            this.hitWall = true;
            return;
          } else {
            this.kill();
          }
        }
        this.parent(res);
      },
      kill: function () {
        for (var i = 0; i < this.explosionParticles; i++) {
          var x =
            this.pos.x +
            Math.random() * this.explosionRadius * 2 -
            this.explosionRadius;
          var y =
            this.pos.y +
            Math.random() * this.explosionRadius * 4 -
            this.explosionRadius;
          ig.game.spawnEntity(EntityGrenadeExplosion, x, y);
        }
        ig.game.spawnEntity(
          EntityBlastRadius,
          this.pos.x,
          this.pos.y,
          this.blastSettings
        );
        this.parent();
      },
    });
    ig.EntityPool.enableFor(EntityGrenade);
    EntityBlastRadius = ig.Entity.extend({
      frame: 0,
      radius: 8,
      damage: 20,
      checkAgainst: ig.Entity.TYPE.B,
      init: function (x, y, settings) {
        var offset = settings.radius || this.radius;
        this.size.x = this.size.y = offset * 2;
        this.parent(x - offset, y - offset, settings);
      },
      update: function () {
        if (this.frame == 2) {
          this.kill();
        }
        this.frame++;
      },
      draw: function () {},
      check: function (other) {
        if (this.frame != 1) {
          return;
        }
        var f = 1 - this.distanceTo(other) / this.radius;
        if (f > 0) {
          var damage = Math.ceil(Math.sqrt(f) * this.damage);
          other.receiveDamage(damage, this);
        }
      },
    });
    EntityGrenadeExplosion = tpf.Entity.extend({
      size: { x: 0, y: 0 },
      vpos: 2,
      scale: 1,
      gravityFactor: 0,
      animSheet: new ig.AnimationSheet("media/explosion.png", 32, 32),
      init: function (x, y, settings) {
        var frameTime = Math.random() * 0.1 + 0.03;
        this.addAnim("idle", frameTime, [0, 1, 2, 3], true);
        this.parent(x, y, settings);
        this.pos.z = Math.random() * 20;
      },
      reset: function (x, y, settings) {
        this.currentAnim.rewind();
        this.parent(x, y, settings);
      },
      update: function () {
        this.parent();
        if (this.currentAnim.loopCount) {
          this.kill();
        }
      },
    });
    ig.EntityPool.enableFor(EntityGrenadeExplosion);
  });
ig.baked = true;
ig.module("game.weapons.rocket-launcher")
  .requires(
    "game.weapons.base",
    "plugins.twopointfive.entity",
    "impact.entity-pool"
  )
  .defines(function () {
    WeaponRocketLauncher = Weapon.extend({
      offset: { x: 0, y: 208 },
      maxAmmo: 80,
      cooldown: 0.5,
      animSheet: new ig.AnimationSheet("media/rocketlauncher.png", 202, 242),
      shootSound: new ig.Sound("media/sounds/rocketlauncher.*"),
      emptySound: new ig.Sound("media/sounds/empty-click.*"),
      ammoIconImage: new ig.Image("media/grenade.png"),
      ammoIcon: null,
      init: function (ammo) {
        this.parent(ammo);
        this.addAnim("idle", 100, [0]);
        this.addAnim("shoot", 0.1, [0, 1, 2, 3, 4, 5, 0], true);
        this.ammoIcon = new tpf.HudTile(this.ammoIconImage, 0, 32, 32);
        this.ammoIcon.setPosition(200, 460);
        this.shootSound.volume = 0.8;
      },
      depleted: function () {
        if (this.shootTimer.delta() > 0 && this.ammo <= 0) {
          this.shootTimer.set(this.cooldown);
          this.emptySound.play();
          return true;
        } else {
          return false;
        }
      },
      shoot: function (x, y, angle) {
        ig.game.spawnEntity(EntityRocket, x, y, { angle: angle });
        this.currentAnim = this.anims.shoot.rewind();
        this.shootSound.play();
        this.flash(0.2);
      },
    });
    EntityRocket = tpf.Entity.extend({
      checkAgainst: ig.Entity.TYPE.B,
      collides: ig.Entity.COLLIDES.NEVER,
      size: { x: 16, y: 16 },
      speed: 2600,
      scale: 1,
      bounciness: 0,
      minBounceVelocity: 0.5,
      blastSettings: { radius: 100, damage: 25 },
      explosionParticles: 40,
      explosionRadius: 30,
      animSheet: new ig.AnimationSheet("media/rocket.png", 32, 32),
      explodeSound: new ig.Sound("media/sounds/explosion.*"),
      bounceSound: new ig.Sound("media/sounds/grenade-bounce.*"),
      dynamicLight: true,
      init: function (x, y, settings) {
        this.parent(x - this.size.x / 2, y - this.size.y / 2, settings);
        this.addAnim("idle", 1, [0]);
        this.bounceSound.volume = 0.6;
        this.explodeSound.volume = 0.9;
        this.vel.x = -Math.sin(this.angle) * this.speed;
        this.vel.y = -Math.cos(this.angle) * this.speed;
        this.vel.z = 0;
        this.pos.z = 0;
      },
      reset: function (x, y, settings) {
        this.parent(x - this.size.x / 2, y - this.size.y / 2, settings);
        this.vel.x = -Math.sin(this.angle) * this.speed;
        this.vel.y = -Math.cos(this.angle) * this.speed;
        this.vel.z = 0;
        this.pos.z = 0;
        this.currentAnim = this.anims.idle.rewind();
      },
      update: function () {
        if (this.currentAnim.loopCount > 0) {
          this.kill();
          return;
        }
        var zvel = this.vel.z;
        this.parent();
        if (zvel < 0 && this.vel.z > 0) {
          this.bounceSound.play();
        }
      },
      check: function (other) {
        this.kill();
      },
      handleMovementTrace: function (res) {
        for (var i in ig.game.entities) {
          if (ig.game.entities[i].type == ig.Entity.TYPE.B) {
            if (ig.game.entities[i].distanceTo(this) < 40) {
              ig.game.entities[i].kill();
            }
          }
        }
        if (res.collision.x || res.collision.y) {
          if (ig.game.player.distanceTo(this) < 500 && !this.hitWall) {
            this.pos.x += this.vel.x * ig.system.tick;
            this.pos.y += this.vel.y * ig.system.tick;
            this.hitWall = true;
            return;
          } else {
            this.kill();
          }
        }
        this.parent(res);
      },
      kill: function () {
        for (var i = 0; i < this.explosionParticles; i++) {
          var x =
            this.pos.x +
            Math.random() * this.explosionRadius * 2 -
            this.explosionRadius;
          var y =
            this.pos.y +
            Math.random() * this.explosionRadius * 4 -
            this.explosionRadius;
          ig.game.spawnEntity(EntityRocketExplosion, x, y);
        }
        ig.game.spawnEntity(
          EntityBlastRadius,
          this.pos.x,
          this.pos.y,
          this.blastSettings
        );
        this.explodeSound.play();
        this.parent();
      },
    });
    ig.EntityPool.enableFor(EntityRocket);
    EntityBlastRadius = ig.Entity.extend({
      frame: 0,
      radius: 8,
      damage: 20,
      checkAgainst: ig.Entity.TYPE.B,
      init: function (x, y, settings) {
        var offset = settings.radius || this.radius;
        this.size.x = this.size.y = offset * 2;
        this.parent(x - offset, y - offset, settings);
      },
      update: function () {
        if (this.frame == 2) {
          this.kill();
        }
        this.frame++;
      },
      draw: function () {},
      check: function (other) {
        if (this.frame != 1) {
          return;
        }
        var f = 1 - this.distanceTo(other) / this.radius;
        if (f > 0) {
          var damage = Math.ceil(Math.sqrt(f) * this.damage);
          other.receiveDamage(damage, this);
        }
      },
    });
    EntityRocketExplosion = tpf.Entity.extend({
      size: { x: 0, y: 0 },
      vpos: 2,
      scale: 1,
      gravityFactor: 0,
      animSheet: new ig.AnimationSheet("media/explosion.png", 32, 32),
      init: function (x, y, settings) {
        var frameTime = Math.random() * 0.1 + 0.03;
        this.addAnim("idle", frameTime, [0, 1, 2, 3], true);
        this.parent(x, y, settings);
        this.pos.z = Math.random() * 20;
      },
      reset: function (x, y, settings) {
        this.currentAnim.rewind();
        this.parent(x, y, settings);
      },
      update: function () {
        this.parent();
        if (this.currentAnim.loopCount) {
          this.kill();
        }
      },
    });
    ig.EntityPool.enableFor(EntityRocketExplosion);
  });
ig.baked = true;
ig.module("game.entities.player")
  .requires(
    "plugins.twopointfive.entity",
    "plugins.mouse-delta",
    "game.weapons.grenade-launcher",
    "game.weapons.pistol-launcher",
    "game.weapons.rocket-launcher"
  )
  .defines(function () {
    EntityPlayer = tpf.Entity.extend({
      type: ig.Entity.TYPE.A,
      collides: ig.Entity.COLLIDES.PASSIVE,
      size: { x: 32, y: 32 },
      angle: 0,
      internalAngle: 0,
      turnSpeed: (120).toRad(),
      moveSpeed: 192,
      bob: 0,
      bobSpeed: 0.1,
      bobHeight: 0.8,
      health: 100,
      maxHealth: 100,
      weapons: [],
      currentWeapon: null,
      currentWeaponIndex: -1,
      delayedWeaponSwitchIndex: -1,
      currentLightColor: { r: 1, g: 1, b: 1, a: 1 },
      god: false,
      hurtSounds: [
        new ig.Sound("media/sounds/hurt1.*"),
        new ig.Sound("media/sounds/hurt2.*"),
        new ig.Sound("media/sounds/hurt3.*"),
      ],
      deathSound: new ig.Sound("media/sounds/gameover.*"),
      doorSound: new ig.Sound("media/sounds/opendoor.*"),
      init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.internalAngle = this.angle;
        ig.game.player = this;
      },
      ready: function () {
        var cx = this.pos.x + this.size.x / 2,
          cy = this.pos.y + this.size.y / 2;
        ig.system.camera.position[0] = cx;
        ig.system.camera.position[2] = cy;
        this.giveWeapon(WeaponPistolLauncher, 200);
        this.giveWeapon(WeaponGrenadeLauncher, 0);
        this.giveWeapon(WeaponRocketLauncher, 0);
        this.switchWeapon(0);
      },
      handleMovementTrace: function (res) {
        if (res.collision.x || res.collision.y) {
          var tile_pos = [];
          var tile_hit = [];
          for (
            var y = ig.game.player.__tilePosY - res.tile.y * 1;
            y <= ig.game.player.__tilePosY + res.tile.y * 1;
            y++
          ) {
            for (
              var x = ig.game.player.__tilePosX - res.tile.x * 1;
              x <= ig.game.player.__tilePosX + res.tile.x * 1;
              x++
            ) {
              tile_hit.push(ig.game.wallMap.data[y][x]);
              tile_pos.push([x * 64, y * 64]);
            }
          }
          var tile_found = tile_hit.indexOf(4);
          if (tile_hit.indexOf(8) > -1 && ig.game.dotsRemaining > 0) {
            ig.game.dotsRemaining = 0;
          }
          if (tile_found > -1) {
            if (ig.game.keys < 1) {
              if (
                document.getElementById("info").style.display != "block" ||
                document.getElementById("info").style.opacity < 1
              ) {
                ig.game.showInfo("YOU NEED A KEY TO ENTER THIS DOOR");
                setTimeout(
                  "document.getElementById('info').style.display='none';",
                  2000
                );
              }
            } else {
              this.doorSound.play();
              ig.game.keys--;
              var grid_x = Math.round(tile_pos[tile_found][0] / 64) - 0;
              var grid_y = Math.round(tile_pos[tile_found][1] / 64) - 0;
              var floor_replacement = ig.game.floorMap.getTile(
                ig.game.player.pos.x,
                ig.game.player.pos.y
              );
              var door_pos = [];
              for (var x = grid_x - 2; x <= grid_x + 2; x++) {
                for (var y = grid_y - 2; y <= grid_y + 2; y++) {
                  if (
                    x < ig.game.floorMap.width &&
                    y < ig.game.floorMap.height
                  ) {
                    if (ig.game.wallMap.data[y][x] == 4) {
                      ig.game.wallMap.data[y][x] = 0;
                      ig.game.floorMap.data[y][x] = floor_replacement;
                      ig.game.collisionMap.data[y][x] = 0;
                      door_pos = [y, x];
                    }
                  }
                }
              }
              for (var x = door_pos[1] - 1; x <= door_pos[1] + 1; x++) {
                for (var y = door_pos[0] - 1; y <= door_pos[0] + 1; y++) {
                  if (
                    x < ig.game.floorMap.width &&
                    y < ig.game.floorMap.height
                  ) {
                    if (ig.game.wallMap.data[y][x] != 0) {
                      ig.game.wallMap.data[y][x] += door_pos[0] == y ? 16 : 8;
                    }
                  }
                }
              }
              ig.game.refreshLevel();
            }
          }
        }
        this.parent(res);
      },
      update: function () {
        if (ig.game.dotsRemaining <= 0) return;
        var dx = 0,
          dy = 0;
        if (ig.input.state("forward")) {
          dy = 1;
        } else if (ig.input.state("back")) {
          dy = -1;
        }
        if (ig.system.isFullscreen || ig.system.hasMouseLock) {
          this.internalAngle -= ig.input.mouseDelta.x / 400;
        }
        if (ig.input.state("left")) {
          this.internalAngle += this.turnSpeed * ig.system.tick;
        } else if (ig.input.state("right")) {
          this.internalAngle -= this.turnSpeed * ig.system.tick;
        }
        if (ig.input.state("stepleft")) {
          dx = 1;
        } else if (ig.input.state("stepright")) {
          dx = -1;
        }
        if (ig.game.touchFieldMove) {
          var fi = ig.game.touchFieldMove.input;
          dx = -(fi.x / 60).limit(-1, 1);
          dy = -(fi.y / 60).limit(-1, 1);
        }
        if (ig.game.touchFieldTurn) {
          var fi = ig.game.touchFieldTurn.input;
          this.internalAngle += fi.dx / 100;
        }
        if (ig.input.gamepad) {
          var stickThreshold = 0.2;
          if (Math.abs(ig.input.gamepad.axes[2]) > stickThreshold) {
            this.internalAngle -=
              ig.input.gamepad.axes[2] * this.turnSpeed * ig.system.tick;
          }
          if (Math.abs(ig.input.gamepad.axes[0]) > stickThreshold) {
            dx = -ig.input.gamepad.axes[0];
          }
          if (Math.abs(ig.input.gamepad.axes[1]) > stickThreshold) {
            dy = -ig.input.gamepad.axes[1];
          }
        }
        var running = ig.input.state("run") || ig.ua.mobile;
        var speed = this.moveSpeed;
        var trackerRotation = [0, 0, 0];
        var trackerPosition = [0, 0, 0];
        if (ig.system.renderer instanceof tpf.StereoRenderer) {
          var state = ig.system.renderer.getHMDState();
          trackerRotation = state.rotation;
          trackerPosition = state.position;
        }
        this.angle = this.internalAngle + trackerRotation[0];
        if (Math.abs(dx) + Math.abs(dy) > 1) {
          dx *= Math.SQRT1_2;
          dy *= Math.SQRT1_2;
        }
        this.vel.x =
          -Math.sin(this.angle) * dy * this.moveSpeed -
          Math.sin(this.angle + Math.PI / 2) * dx * this.moveSpeed;
        this.vel.y =
          -Math.cos(this.angle) * dy * this.moveSpeed -
          Math.cos(this.angle + Math.PI / 2) * dx * this.moveSpeed;
        if (
          this.currentWeapon &&
          (ig.input.state("shoot") ||
            (!ig.ua.mobile && ig.input.state("click")))
        ) {
          var sx = this.pos.x + this.size.x / 2 - 0 - Math.sin(this.angle) * 3;
          var sy = this.pos.y + this.size.y / 2 - 0 - Math.cos(this.angle) * 3;
          if (!this.currentWeapon.depleted()) {
            this.currentWeapon.trigger(sx, sy, this.angle);
          } else {
            this.switchToNextNonEmptyWeapon();
          }
        }
        if (this.delayedWeaponSwitchIndex >= 0) {
          this.switchWeapon(this.delayedWeaponSwitchIndex);
        }
        if (ig.input.pressed("weaponNext") && this.weapons.length > 1) {
          this.switchToNextNonEmptyWeapon();
        } else if (ig.input.pressed("weaponPrev") && this.weapons.length > 1) {
          this.switchToPrevNonEmptyWeapon();
        }
        this.parent();
        this.bob +=
          ig.system.tick *
          this.bobSpeed *
          Math.min(Math.abs(dx) + Math.abs(dy), 1) *
          speed;
        var bobOffset = Math.sin(this.bob) * this.bobHeight;
        if (this.currentWeapon) {
          this.currentWeapon.bobOffset =
            Math.sin(this.bob + Math.PI / 2) * this.bobHeight * 4;
          this.currentWeapon.update();
        }
        var cx = this.pos.x + this.size.x / 2,
          cy = this.pos.y + this.size.y / 2;
        if (ig.game.hud.fadeToRed) {
          trackerRotation[1] = (ig.game.hud.fadeToRed * Math.PI) / 180;
        }
        ig.system.camera.setRotation(
          trackerRotation[2],
          trackerRotation[1],
          this.angle
        );
        if (ig.system.renderer instanceof tpf.StereoRenderer) {
          var tt = trackerPosition;
          var a = this.internalAngle;
          var ttx = tt[0] * Math.cos(-a) - tt[2] * Math.sin(-a);
          var tty = tt[0] * Math.sin(-a) + tt[2] * Math.cos(-a);
          ig.system.camera.setPosition(cx + ttx, cy + tty, tt[1]);
        } else {
          ig.system.camera.setPosition(cx, cy, bobOffset);
        }
      },
      receiveDamage: function (amount, from) {
        if (this.god || this._killed) {
          return;
        }
        var a = (this.angle + this.angleTo(from)) % (Math.PI * 2);
        a += a < 0 ? Math.PI : -Math.PI;
        var xedge = ig.game.hud.width / 2;
        var ypos = a < 0 ? ig.game.hud.height / 2 : 0;
        var xpos = Math.abs(a).map(0, Math.PI, -xedge, xedge);
        ig.game.hud.fadeToRed = 4;
        this.hurtSounds.random().play();
        this.parent(amount, from);
      },
      kill: function () {
        document.getElementById("menu").style.background = "none";
        document.getElementById("menu").style.display = "block";
        ig.game.showDeathAnim();
        if (!ig.ua.mobile) document.exitPointerLock();
        this.parent();
      },
      giveWeapon: function (weaponClass, ammo) {
        var index = -1;
        for (var i = 0; i < this.weapons.length; i++) {
          var w = this.weapons[i];
          if (w instanceof weaponClass) {
            index = i;
            w.giveAmmo(ammo);
          }
        }
        if (index === -1) {
          this.weapons.push(new weaponClass(ammo));
          index = this.weapons.length - 1;
        }
        if (index > this.currentWeaponIndex) {
          this.switchWeapon(index);
        }
      },
      giveAmmo: function (weaponClass, ammo) {
        for (var i = 0; i < this.weapons.length; i++) {
          var w = this.weapons[i];
          if (w instanceof weaponClass) {
            w.giveAmmo(ammo);
          }
        }
      },
      giveHealth: function (amount) {
        if (this.health >= this.maxHealth) {
          return false;
        }
        this.health = Math.min(this.health + amount, this.maxHealth);
        return true;
      },
      switchWeapon: function (index) {
        if (this.currentWeapon) {
          if (this.currentWeapon.shootTimer.delta() < 0) {
            this.delayedWeaponSwitchIndex = index;
            return;
          }
        }
        this.delayedWeaponSwitchIndex = -1;
        this.currentWeaponIndex = index;
        this.currentWeapon = this.weapons[index];
        if (this.currentWeapon.ammoIcon) {
          this.currentWeapon.ammoIcon.setPosition(
            215,
            ig.game.hud.height - this.currentWeapon.ammoIcon.tileHeight - 6
          );
        }
        this.currentWeapon.setLight(this.currentLightColor);
      },
      switchToNextNonEmptyWeapon: function () {
        for (
          var i = this.currentWeaponIndex + 1;
          i < this.weapons.length;
          i++
        ) {
          if (!this.weapons[i].depleted()) {
            this.switchWeapon(i);
            this.currentWeapon.shootTimer.set(0.5);
            return;
          }
        }
        for (var i = 0; i < this.currentWeaponIndex; i++) {
          if (!this.weapons[i].depleted()) {
            this.switchWeapon(i);
            this.currentWeapon.shootTimer.set(0.5);
            return;
          }
        }
      },
      switchToPrevNonEmptyWeapon: function () {
        for (var i = this.currentWeaponIndex - 1; i >= 0; i--) {
          if (!this.weapons[i].depleted()) {
            this.switchWeapon(i);
            this.currentWeapon.shootTimer.set(0.5);
            return;
          }
        }
        for (
          var i = this.weapons.length - 1;
          i > this.currentWeaponIndex;
          i--
        ) {
          if (!this.weapons[i].depleted()) {
            this.switchWeapon(i);
            this.currentWeapon.shootTimer.set(0.5);
            return;
          }
        }
        this.switchWeapon(0);
      },
      setLight: function (color) {
        this.currentLightColor = color;
        if (this.currentWeapon) {
          this.currentWeapon.setLight(color);
        }
      },
    });
  });
ig.baked = true;
ig.module("game.levels.base1")
  .requires("impact.image", "game.entities.void", "game.entities.player")
  .defines(function () {
    LevelBase1 = {
      entities: [
        {
          type: "EntityVoid",
          x: 1216,
          y: 740,
          settings: {
            fogColor: "0x041928",
            fogNear: 128,
            fogFar: 512,
            name: "info",
          },
        },
        { type: "EntityPlayer", x: 75, y: 920 },
      ],
      layer: [
        {
          name: "collision",
          width: 16,
          height: 16,
          linkWithCollision: false,
          visible: 1,
          tilesetName: "",
          repeat: false,
          preRender: false,
          distance: "1",
          tilesize: 64,
          foreground: false,
          data: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          ],
        },
        {
          name: "floor",
          width: 16,
          height: 16,
          linkWithCollision: false,
          visible: 1,
          tilesetName: "media/tiles/basic-tiles-64.png",
          repeat: false,
          preRender: false,
          distance: "1",
          tilesize: 64,
          foreground: false,
          data: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          ],
        },
        {
          name: "walls",
          width: 16,
          height: 16,
          linkWithCollision: true,
          visible: 1,
          tilesetName: "media/tiles/basic-tiles-64.png",
          repeat: false,
          preRender: true,
          distance: "1",
          tilesize: 64,
          foreground: false,
          data: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          ],
        },
        {
          name: "ceiling",
          width: 32,
          height: 32,
          linkWithCollision: false,
          visible: 0,
          tilesetName: "media/tiles/basic-tiles-64.png",
          repeat: false,
          preRender: false,
          distance: "1",
          tilesize: 64,
          foreground: false,
          data: [
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
          ],
        },
        {
          name: "light",
          width: 16,
          height: 16,
          linkWithCollision: false,
          visible: 1,
          tilesetName: "media/tiles/lights-64.png",
          repeat: false,
          preRender: false,
          distance: "1",
          tilesize: 64,
          foreground: false,
          data: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          ],
        },
      ],
    };
    LevelBase1Resources = [
      new ig.Image("media/tiles/basic-tiles-64.png"),
      new ig.Image("media/tiles/basic-tiles-64.png"),
      new ig.Image("media/tiles/basic-tiles-64.png"),
      new ig.Image("media/tiles/lights-64.png"),
    ];
  });
ig.baked = true;
ig.module("game.entities.particle")
  .requires("plugins.twopointfive.entity", "impact.entity-pool")
  .defines(function () {
    EntityParticle = tpf.Entity.extend({
      size: { x: 1, y: 1 },
      offset: { x: 0, y: 0 },
      minBounceVelocity: 0,
      lifetime: 5,
      fadetime: 1,
      bounciness: 0.6,
      friction: { x: 20, y: 0 },
      initialVel: { x: 1, y: 1, z: 1 },
      init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.currentAnim.gotoRandomFrame();
        this.setPosition();
      },
      reset: function (x, y, settings) {
        this.parent(x, y, settings);
        this.setPosition();
      },
      setPosition: function () {
        this.vel.x = (Math.random() * 2 - 1) * this.initialVel.x;
        this.vel.y = (Math.random() * 2 - 1) * this.initialVel.y;
        this.vel.z = (Math.random() * 2 - 1) * this.initialVel.z;
        this.idleTimer = new ig.Timer();
      },
      update: function () {
        var delta = this.idleTimer.delta();
        if (delta > this.lifetime) {
          this.kill();
          return;
        }
        this.tile.quad.setAlpha(
          delta
            .map(this.lifetime - this.fadetime, this.lifetime, 0.6, 0)
            .limit(0, 0.6)
        );
        this.parent();
      },
    });
    ig.EntityPool.enableFor(EntityParticle);
  });
ig.baked = true;
ig.module("game.entities.enemy-blob")
  .requires("plugins.twopointfive.entity", "game.entities.particle")
  .defines(function () {
    EntityEnemy1 = tpf.Entity.extend({
      type: ig.Entity.TYPE.B,
      checkAgainst: ig.Entity.TYPE.A,
      collides: ig.Entity.COLLIDES.ACTIVE,
      size: { x: 16, y: 16 },
      friction: { x: 100, y: 100 },
      scale: 0.75,
      health: 10,
      damage: 10,
      dynamicLight: true,
      _wmBoxColor: "#ff0000",
      angle: 0,
      speed: 40,
      injump: false,
      didHurtPlayer: false,
      seenPlayer: false,
      enemytype: "creeper",
      animSheet: new ig.AnimationSheet("media/creeperwalk0.png", 64, 64),
      bounceTimer: null,
      blobSpawnTimer: null,
      grenadeSpawnTimer: null,
      gravityFactor: 0,
      init: ghost_init,
      update: ghost_update,
      kill: ghost_kill,
      check: ghost_check,
      deathSound: new ig.Sound("media/sounds/creeper-explosion.*"),
      fuseSound: new ig.Sound("media/sounds/creeper-fuse.*"),
    });
    EntityEnemy2 = tpf.Entity.extend({
      type: ig.Entity.TYPE.B,
      checkAgainst: ig.Entity.TYPE.A,
      collides: ig.Entity.COLLIDES.ACTIVE,
      size: { x: 16, y: 16 },
      friction: { x: 100, y: 100 },
      scale: 0.5,
      health: 10,
      damage: 10,
      dynamicLight: true,
      _wmBoxColor: "#ff0000",
      angle: 0,
      speed: 40,
      injump: false,
      didHurtPlayer: false,
      seenPlayer: false,
      enemytype: "ghast",
      animSheet: new ig.AnimationSheet("media/ghast.png", 64, 88),
      bounceTimer: 1,
      blobSpawnTimer: null,
      grenadeSpawnTimer: 1,
      gravityFactor: 0,
      init: ghost_init,
      update: ghost_update,
      kill: ghost_kill,
      check: ghost_check,
      deathSound: new ig.Sound("media/sounds/monsterdeath1.*"),
    });
    EntityEnemy3 = tpf.Entity.extend({
      type: ig.Entity.TYPE.B,
      checkAgainst: ig.Entity.TYPE.A,
      collides: ig.Entity.COLLIDES.ACTIVE,
      size: { x: 16, y: 16 },
      friction: { x: 500, y: 500 },
      scale: 0.5,
      health: 10,
      damage: 10,
      dynamicLight: true,
      _wmBoxColor: "#ff0000",
      angle: 0,
      speed: 60,
      injump: false,
      didHurtPlayer: false,
      seenPlayer: false,
      enemytype: "slime",
      animSheet: new ig.AnimationSheet("media/slime.png", 64, 64),
      bounceTimer: 0,
      blobSpawnTimer: null,
      grenadeSpawnTimer: null,
      jumpTimer: 1,
      gravityFactor: 5,
      init: ghost_init,
      update: ghost_update,
      kill: ghost_kill,
      check: ghost_check,
      deathSound: new ig.Sound("media/sounds/monsterdeath3.*"),
    });
    EntityEnemy4 = tpf.Entity.extend({
      type: ig.Entity.TYPE.B,
      checkAgainst: ig.Entity.TYPE.A,
      collides: ig.Entity.COLLIDES.NEVER,
      size: { x: 16, y: 16 },
      friction: { x: 100, y: 100 },
      scale: 0.5,
      health: 10,
      damage: 10,
      dynamicLight: true,
      _wmBoxColor: "#ff0000",
      angle: 0,
      speed: 32,
      injump: false,
      didHurtPlayer: false,
      seenPlayer: false,
      enemytype: "spawner",
      animSheet: new ig.AnimationSheet("media/spawner.png", 64, 64),
      bounceTimer: null,
      blobSpawnTimer: 1,
      grenadeSpawnTimer: null,
      gravityFactor: 0,
      init: ghost_init,
      update: ghost_update,
      kill: ghost_kill,
      check: ghost_check,
      deathSound: new ig.Sound("media/sounds/generatordeath.*"),
    });
    EntityEnemyGrenade = tpf.Entity.extend({
      type: ig.Entity.TYPE.B,
      checkAgainst: ig.Entity.TYPE.A,
      collides: ig.Entity.COLLIDES.NEVER,
      size: { x: 16, y: 16 },
      friction: { x: 100, y: 100 },
      scale: 0.5,
      health: 10,
      damage: 10,
      dynamicLight: true,
      _wmBoxColor: "#ff0000",
      angle: 0,
      speed: 400,
      injump: false,
      didHurtPlayer: false,
      seenPlayer: false,
      animSheet: new ig.AnimationSheet("media/fireball2.png", 32, 41),
      bounceTimer: null,
      blobSpawnTimer: 1,
      grenadeSpawnTimer: null,
      gravityFactor: 0,
      init: ghost_grenade_init,
      update: ghost_grenade_update,
      kill: ghost_grenade_kill,
      check: ghost_grenade_check,
      handleMovementTrace: function (res) {
        if (res.collision.x || res.collision.y) {
          this.kill();
        }
        this.parent(res);
      },
      deathSound: new ig.Sound("media/sounds/ghost-die.*"),
    });
    function ghost_init(x, y, settings) {
      this.parent(x, y, settings);
      if (this.enemytype == "creeper") {
        this.addAnim("crawl", 0.05, [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1]);
      } else {
        this.addAnim("crawl", 0.8, [0]);
      }
      this.tile.quad.setAlpha(0.0);
      this.alpha = 0;
      this.hurtTimer = new ig.Timer();
      if (this.grenadeSpawnTimer) {
        this.grenadeSpawnTimer = new ig.Timer(1);
      }
      if (this.blobSpawnTimer) {
        this.blobSpawnTimer = new ig.Timer(1);
      }
      if (this.bounceTimer) {
        this.bounceTimer = new ig.Timer();
      }
      if (this.jumpTimer) {
        this.jumpTimer = new ig.Timer(Math.random() * 1 + 4);
      }
      ig.game.blobDisplayed++;
    }
    function ghost_update() {
      if (this.blobSpawnTimer && !ig.game.dead) {
        if (
          this.blobSpawnTimer.delta() > 0 &&
          this.distanceTo(ig.game.player) < 1000 &&
          ig.game.blobDisplayed < ig.game.blobMax
        ) {
          var random_enemies = [EntityEnemy1, EntityEnemy2, EntityEnemy3];
          this.angle = this.angleTo(ig.game.player);
          var spawn_pos = [this.pos.x, this.pos.y];
          ig.game.spawnEntity(
            random_enemies.random(),
            spawn_pos[0],
            spawn_pos[1]
          );
          var spawn_time_min = 2;
          var spawn_time_max = 3;
          this.blobSpawnTimer.set(
            Math.random() * (spawn_time_max - spawn_time_min) + spawn_time_min
          );
        }
      } else {
        this.angle = this.angleTo(ig.game.player);
        if (!(this.enemytype == "slime" && this.pos.z == 0)) {
          this.vel.x = Math.cos(this.angle) * this.speed;
          this.vel.y = Math.sin(this.angle) * this.speed;
        }
        if (ig.game.dead) {
          this.vel.x = -this.vel.x;
          this.vel.y = -this.vel.y;
        }
      }
      if (this.grenadeSpawnTimer && !ig.game.dead) {
        if (
          this.grenadeSpawnTimer.delta() > 0 &&
          this.distanceTo(ig.game.player) < 500
        ) {
          var spawn_pos = [
            this.pos.x + Math.cos(this.angle) * this.speed,
            this.pos.y + Math.sin(this.angle) * this.speed,
          ];
          ig.game.spawnEntity(EntityEnemyGrenade, spawn_pos[0], spawn_pos[1], {
            angle: this.angle,
          });
          this.grenadeSpawnTimer.set(Math.random() * 2 + 3);
        }
      }
      if (this.bounceTimer) {
        this.pos.z = (Math.cos(this.bounceTimer.delta() * 3) + 1) * 3;
      }
      if (this.jumpTimer && this.jumpTimer.delta() > 0) {
        this.vel.z = 5;
        this.jumpTimer.set(Math.random() * 1 + 1);
      }
      if (this.fallTimer) {
        this.tile.quad.rotation[2] -= 0.08;
        this.pos.z = this.tile.quad.rotation[2] * 4;
        this.vel.x = 0;
        this.vel.y = 0;
        if (this.alpha > 0) {
          this.alpha -= 0.05;
          this.tile.quad.setAlpha(this.alpha);
          if (this.enemytype != "ghast") {
            this.tile.quad.setColor({ r: 2, g: 2, b: 2 });
          } else {
            this.tile.quad.setColor({ r: 2, g: 1, b: 1 });
          }
        } else {
          this.kill(2);
        }
      } else {
        if (this.alpha < 1) {
          this.alpha += 0.05;
          this.tile.quad.setAlpha(this.alpha);
        }
      }
      if (this.fuseSound) {
        if (this.explodeTimer) {
          if (this.explodeTimer.delta() > 2.5) {
            this.kill(1);
            if (this.distanceTo(ig.game.player) < 128) {
              ig.game.player.receiveDamage(25, this);
            }
          } else {
            if (this.explodeTimer.delta() % 0.5 < 0.25)
              this.tile.quad.setColor({ r: 2, g: 2, b: 2 });
            else this.tile.quad.setColor({ r: 1, g: 1, b: 1 });
          }
        } else {
          if (this.distanceTo(ig.game.player) < 64 && !this.explodeTimer) {
            this.explodeTimer = new ig.Timer();
            this.fuseSound.play();
          }
        }
      }
      this.parent();
    }
    function ghost_kill(mode) {
      if (
        mode == 1 ||
        this.enemytype == "slime" ||
        this.enemytype == "spawner"
      ) {
        if (ig.game.dotsRemaining < 0) {
          return this.parent();
        }
        var gibs_all = [];
        gibs_all["yellow"] = EntityEnemyGib1;
        gibs_all["orange"] = EntityEnemyGib2;
        gibs_all["green"] = EntityEnemyGib3;
        gibs_all["1"] = EntityEnemyGib1;
        var gib_ref = gibs_all["1"];
        var cx = this.pos.x + this.size.x / 2;
        var cy = this.pos.y + this.size.y / 2;
        for (var i = 0; i < 20; i++) {
          ig.game.spawnEntity(gib_ref, cx, cy);
        }
        ig.game.blobKillCount++;
        ig.game.blobDisplayed--;
        this.deathSound.play();
        ig.game.score += 200;
        this.parent();
      } else if (mode == 2) {
        this.parent();
      } else {
        if (!this.fallTimer) {
          this.fallTimer = new ig.Timer();
          ig.game.score += 200;
          ig.game.blobKillCount++;
          ig.game.blobDisplayed--;
        }
      }
    }
    function ghost_check(other) {
      if (this.hurtTimer.delta() < 0) {
        return;
      }
      this.hurtTimer.set(1);
      this.vel.x = -this.vel.x;
      this.vel.y = -this.vel.y;
      if (this.enemytype != "creeper") {
        other.receiveDamage(this.damage, this);
      }
    }
    function ghost_grenade_init(x, y, settings) {
      this.parent(x, y, settings);
      this.addAnim("crawl", 0.05, [0, 1, 2, 3]);
      this.hurtTimer = new ig.Timer();
    }
    function ghost_grenade_update() {
      this.vel.x = Math.cos(this.angle) * this.speed;
      this.vel.y = Math.sin(this.angle) * this.speed;
      this.parent();
    }
    function ghost_grenade_kill() {
      this.parent();
    }
    function ghost_grenade_check(other) {
      other.receiveDamage(this.damage, this);
      this.kill();
    }
    EntityEnemyGib1 = EntityParticle.extend({
      vpos: 0,
      scale: 0.5,
      bounciness: 0,
      initialVel: { x: 120, y: 120, z: 2.5 },
      friction: { x: 10, y: 10 },
      lifetime: 2,
      animSheet: new ig.AnimationSheet("media/gib_1.png", 16, 16),
      init: gib_init,
    });
    EntityEnemyGib2 = EntityParticle.extend({
      vpos: 0,
      scale: 0.5,
      initialVel: { x: 120, y: 120, z: 2.5 },
      friction: { x: 10, y: 10 },
      lifetime: 2,
      animSheet: new ig.AnimationSheet("media/gib_orange.png", 16, 16),
      init: gib_init,
    });
    EntityEnemyGib3 = EntityParticle.extend({
      vpos: 0,
      scale: 0.5,
      initialVel: { x: 120, y: 120, z: 2.5 },
      friction: { x: 10, y: 10 },
      lifetime: 2,
      animSheet: new ig.AnimationSheet("media/gib_green.png", 16, 16),
      init: gib_init,
    });
    function gib_init(x, y, settings) {
      this.addAnim("idle", 5, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      this.parent(x, y, settings);
    }
  });
ig.baked = true;
ig.module("game.entities.grenade-pickup")
  .requires("plugins.twopointfive.entity", "game.weapons.grenade-launcher")
  .defines(function () {
    EntityGrenadePickup = tpf.Entity.extend({
      checkAgainst: ig.Entity.TYPE.A,
      size: { x: 63, y: 12 },
      vpos: 0.5,
      scale: 0.5,
      amount: 15,
      gravityFactor: 0,
      dynamicLight: true,
      _wmBoxColor: "#55ff00",
      animSheet: new ig.AnimationSheet("media/shotgun_pickup.png", 63, 12),
      pickupSound: new ig.Sound("media/sounds/grenade-pickup.*"),
      bounceTimer: null,
      init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.addAnim("idle", 10, [0]);
        this.bounceTimer = new ig.Timer();
      },
      update: function () {
        this.pos.z = (Math.cos(this.bounceTimer.delta() * 3) + 1) * 3;
        this.parent();
      },
      check: function (other) {
        other.giveWeapon(WeaponGrenadeLauncher, this.amount);
        this.pickupSound.play();
        ig.game.score += 100;
        ig.game.powerupDisplayed--;
        this.kill();
      },
    });
  });
ig.baked = true;
ig.module("game.entities.pistol-pickup")
  .requires("plugins.twopointfive.entity", "game.weapons.pistol-launcher")
  .defines(function () {
    EntityPistolPickup = tpf.Entity.extend({
      checkAgainst: ig.Entity.TYPE.A,
      size: { x: 29, y: 14 },
      vpos: 0.5,
      scale: 0.5,
      amount: 10,
      gravityFactor: 0,
      dynamicLight: true,
      _wmBoxColor: "#55ff00",
      animSheet: new ig.AnimationSheet("media/pistol_pickup.png", 29, 14),
      pickupSound: new ig.Sound("media/sounds/grenade-pickup.*"),
      bounceTimer: null,
      init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.addAnim("idle", 10, [0]);
        this.bounceTimer = new ig.Timer();
      },
      update: function () {
        this.pos.z = (Math.cos(this.bounceTimer.delta() * 3) + 1) * 3;
        this.parent();
      },
      check: function (other) {
        other.giveAmmo(WeaponPistolLauncher, this.amount);
        this.pickupSound.play();
        ig.game.score += 100;
        ig.game.powerupDisplayed--;
        this.kill();
      },
    });
  });
ig.baked = true;
ig.module("game.entities.rocket-pickup")
  .requires("plugins.twopointfive.entity", "game.weapons.rocket-launcher")
  .defines(function () {
    EntityRocketPickup = tpf.Entity.extend({
      checkAgainst: ig.Entity.TYPE.A,
      size: { x: 62, y: 15 },
      vpos: 0.5,
      scale: 0.5,
      amount: 15,
      gravityFactor: 0,
      dynamicLight: true,
      _wmBoxColor: "#55ff00",
      animSheet: new ig.AnimationSheet(
        "media/rocketlauncher_pickup.png",
        62,
        15
      ),
      pickupSound: new ig.Sound("media/sounds/grenade-pickup.*"),
      bounceTimer: null,
      init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.addAnim("idle", 10, [0]);
        this.bounceTimer = new ig.Timer();
      },
      update: function () {
        this.pos.z = (Math.cos(this.bounceTimer.delta() * 3) + 1) * 3;
        if (this.vel.x > 0) {
        }
        this.parent();
      },
      check: function (other) {
        other.giveWeapon(WeaponRocketLauncher, this.amount);
        this.pickupSound.play();
        ig.game.score += 100;
        ig.game.powerupDisplayed--;
        this.kill();
      },
    });
  });
ig.baked = true;
ig.module("game.entities.score-pickup")
  .requires("plugins.twopointfive.entity")
  .defines(function () {
    EntityHealthPickup = tpf.Entity.extend({
      checkAgainst: ig.Entity.TYPE.A,
      size: { x: 16, y: 16 },
      vpos: 0.5,
      scale: 0.5,
      amount: 25,
      gravityFactor: 0,
      dynamicLight: true,
      _wmBoxColor: "#55ff00",
      animSheet: new ig.AnimationSheet("media/steak.png", 32, 32),
      pickupSound: new ig.Sound("media/sounds/health-pickup.*"),
      bounceTimer: null,
      friction: { x: 100, y: 100 },
      init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.addAnim("idle", 10, [0]);
        this.bounceTimer = new ig.Timer();
      },
      update: function () {
        this.pos.z = (Math.cos(this.bounceTimer.delta() * 3) + 1) * 3;
        this.parent();
      },
      check: function (other) {
        if (other.giveHealth(this.amount)) {
        }
        this.pickupSound.play();
        ig.game.score += 100;
        ig.game.powerupsDisplayed--;
        this.kill();
      },
    });
    EntityDotPickup = tpf.Entity.extend({
      checkAgainst: ig.Entity.TYPE.A,
      size: { x: 16, y: 16 },
      vpos: 0.5,
      scale: 0.5,
      amount: 8,
      gravityFactor: 0,
      dynamicLight: true,
      _wmBoxColor: "#55ff00",
      animSheet: new ig.AnimationSheet("media/pill.png", 32, 32),
      pickupSound: new ig.Sound("media/sounds/dot-pickup.*"),
      bounceTimer: null,
      friction: { x: 100, y: 100 },
      init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.addAnim("idle", 10, [0]);
      },
      update: function () {
        this.parent();
      },
      check: function (other) {
        this.pickupSound.play();
        this.kill();
        ig.game.dotsRemaining--;
        ig.game.score += 10;
      },
    });
    EntityChestPickup = tpf.Entity.extend({
      checkAgainst: ig.Entity.TYPE.A,
      size: { x: 45, y: 45 },
      vpos: 0.5,
      scale: 0.7,
      amount: 8,
      gravityFactor: 0,
      dynamicLight: true,
      _wmBoxColor: "#55ff00",
      animSheet: new ig.AnimationSheet("media/diamond.png", 32, 32),
      pickupSound: new ig.Sound("media/sounds/pop.*"),
      bounceTimer: null,
      friction: { x: 100, y: 100 },
      init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.addAnim("idle", 10, [0]);
        this.bounceTimer = new ig.Timer();
      },
      update: function () {
        this.pos.z = (Math.cos(this.bounceTimer.delta() * 3) + 1) * 3;
        this.parent();
      },
      check: function (other) {
        this.pickupSound.play();
        this.kill();
        ig.game.score += 1000;
        ig.game.chestsFound++;
      },
    });
    EntityKeyPickup = tpf.Entity.extend({
      checkAgainst: ig.Entity.TYPE.A,
      size: { x: 16, y: 16 },
      vpos: 0.5,
      scale: 0.5,
      amount: 8,
      gravityFactor: 0,
      dynamicLight: true,
      _wmBoxColor: "#55ff00",
      animSheet: new ig.AnimationSheet("media/key.png", 32, 32),
      pickupSound: new ig.Sound("media/sounds/collectkey.*"),
      bounceTimer: null,
      friction: { x: 100, y: 100 },
      init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.addAnim("idle", 10, [0]);
        this.bounceTimer = new ig.Timer();
      },
      update: function () {
        this.pos.z = (Math.cos(this.bounceTimer.delta() * 3) + 1) * 3;
        this.parent();
      },
      check: function (other) {
        this.pickupSound.play();
        this.kill();
        ig.game.score += 100;
        ig.game.keys++;
      },
    });
  });
ig.baked = true;
ig.module("game.title")
  .requires("plugins.twopointfive.font", "plugins.twopointfive.world.tile")
  .defines(function () {
    MyTitle = ig.Class.extend({
      camera: null,
      fadeScreen: null,
      width: 640,
      height: 480,
      font: new tpf.Font("media/fonts/arcade2.png"),
      titleImage: new ig.Image("media/logo.png"),
      title: null,
      background: null,
      timer: null,
      init: function () {
        var instructions = ig.ua.mobile
          ? ""
          : "Use arrow keys/WASD to move/strafe and SPACE or C to shoot";
        document.getElementById("overlay").innerHTML =
          'PACMAN FPS<br><br><span class="mc_button" onclick="ig.game.setGame();">PLAY GAME</span><br><a href="http://funhtml5games.com/" target="_BLANK"><span class="mc_button">MORE GAMES</span></a><br><span class="mc_button">EMBED ON YOUR SITE</span><br>' +
          instructions;
      },
      update: function () {
        if (ig.input.released("shoot") || ig.input.released("click")) {
          ig.game.setGame();
        }
      },
      draw: function () {
        document.getElementById("overlay").style.display = "block";
      },
    });
  });
ig.baked = true;
ig.module("plugins.twopointfive.hud")
  .requires("plugins.twopointfive.font", "plugins.twopointfive.world.tile")
  .defines(function () {
    tpf.Hud = ig.Class.extend({
      width: 320,
      height: 240,
      font: null,
      damageIndicatorImage: null,
      damageIndicator: null,
      damageTimer: null,
      fadeScreen: null,
      message: null,
      messageTimer: null,
      fadeToRed: 0,
      debug: false,
      init: function (width, height) {
        this.width = width;
        this.height = height;
        this.font.letterSpacing = -2;
        this.camera = new tpf.OrthoCamera(width, height);
        this.fadeScreen = new tpf.Quad(width, height);
        this.fadeScreen.setPosition(width / 2, height / 2, 0);
        this.fadeScreen.setColor({ r: 255, g: 0, b: 0 });
        if (this.damageIndicatorImage) {
          this.damageIndicator = new tpf.HudTile(
            this.damageIndicatorImage,
            0,
            160,
            120
          );
          this.damageIndicator.setPosition(0, 0);
        }
      },
      showMessage: function (text, time) {
        if (text) {
          if (time !== -1) {
            this.messageTimer = new ig.Timer(tpf.Hud.TIME.DEFAULT || time);
          }
          this.message = text;
        } else {
          this.messageTimer = null;
          this.message = null;
        }
      },
      showDamageIndicator: function (x, y, initialAlpha) {
        if (this.damageIndicator) {
          this.damageIndicator.setPosition(x, y);
          this.damageTimer = new ig.Timer(initialAlpha);
        }
      },
      prepare: function () {
        ig.system.renderer.setCamera(this.camera);
      },
      drawDefault: function () {
        if (this.messageTimer && this.messageTimer.delta() > 0) {
          this.showMessage(null);
        }
        this.font.draw(
          "+",
          this.width / 2,
          this.height / 2,
          ig.Font.ALIGN.CENTER
        );
        if (this.message && this.font) {
          this.font.draw(
            this.message,
            this.width / 2,
            this.height / 3,
            ig.Font.ALIGN.CENTER
          );
        }
        if (this.damageTimer) {
          var delta = this.damageTimer.delta();
          if (delta < 0) {
            this.damageIndicator.setAlpha(-delta);
            this.damageIndicator.draw();
          } else {
            this.damageTimer = null;
          }
        }
        if (this.fadeToRed > 0) {
          this.fadeToRed -= 0.2;
        }
      },
      draw: function () {
        this.prepare();
        this.drawDefault();
      },
    });
    tpf.Hud.TIME = { DEFAULT: 2, PERMANENT: -1 };
  });
ig.baked = true;
ig.module("game.hud")
  .requires("plugins.twopointfive.hud")
  .defines(function () {
    MyHud = tpf.Hud.extend({
      font: new tpf.Font("media/fonts/arcade2.png"),
      healthIconImage: new ig.Image("media/health-icon.png"),
      damageIndicatorImage: new ig.Image("media/hud-blood-low.png"),
      controlsImage: new ig.Image("media/controls.png"),
      levelupImage: new ig.Image("media/levelcomplete.png"),
      healthIcon: null,
      controlsOverlay: null,
      controlsOverlayAlpha: 1,
      showControlsTimer: null,
      levelupOverlay: null,
      keys: [],
      init: function (width, height, showControls) {
        this.parent(width, height);
        this.healthIcon = new tpf.HudTile(this.healthIconImage, 0, 32, 32);
        this.healthIcon.setPosition(
          96,
          this.height - this.healthIcon.tileHeight - 4
        );
        this.controlsOverlay = new tpf.HudTile(this.controlsImage, 0, 640, 480);
        this.controlsOverlay.setPosition(0, 0);
        this.levelupOverlay = new tpf.HudTile(this.levelupImage, 0, 559, 186);
        this.levelupOverlay.setPosition(40, 90);
      },
      showControls: function () {
        this.controlsOverlayAlpha = 1;
        this.controlsOverlay.setAlpha(this.controlsOverlayAlpha);
        this.showControlsTimer = new ig.Timer();
      },
      draw: function (player, weapon) {
        this.prepare();
        if (weapon) {
          weapon.draw();
        }
        if (
          ig.ua.mobile &&
          this.showControlsTimer &&
          this.showControlsTimer.delta() < 10
        ) {
          this.controlsOverlay.draw();
          if (
            this.showControlsTimer.delta() > 7 &&
            this.controlsOverlayAlpha > 0
          ) {
            this.controlsOverlayAlpha -= 0.025;
            this.controlsOverlay.setAlpha(this.controlsOverlayAlpha);
          }
        }
        document.getElementById("score_div").innerHTML = ig.game.score;
        document.getElementById("level_div").innerHTML = ig.game.levelNumber;
        document.getElementById("keys_div").innerHTML = ig.game.keys;
        document.getElementById("chests_div").innerHTML =
          ig.game.chestsFound + "/" + ig.game.chestsTotal;
        document.getElementById("time_div").innerHTML = ig.game.formatTime(
          ig.game.levelTimer.delta()
        );
        var weapon_pics = ["pistol", "shotgun", "rocketlauncher"];
        document.getElementById("ammo_pic").src =
          "media/" +
          weapon_pics[ig.game.player.currentWeaponIndex] +
          "_pickup.png";
        document.getElementById("ammo_number").innerHTML = weapon.ammo;
        document.getElementById("health_meter").style.width =
          (162 / 100) * (player.health < 0 ? 0 : player.health) + "px";
        if (weapon.ammoIcon) {
        }
        this.drawDefault();
      },
    });
  });
ig.baked = true;
ig.module("game.main")
  .requires(
    "impact.game",
    "impact.font",
    "plugins.twopointfive.game",
    "plugins.touch-button",
    "plugins.touch-field",
    "plugins.gamepad",
    "game.levels.base1",
    "game.entities.enemy-blob",
    "game.entities.grenade-pickup",
    "game.entities.pistol-pickup",
    "game.entities.rocket-pickup",
    "game.entities.score-pickup",
    "game.title",
    "game.hud"
  )
  .defines(function () {
    "use strict";
    var MyGame = tpf.Game.extend({
      sectorSize: 4,
      hud: null,
      dead: false,
      menu: null,
      touchButtons: null,
      touchFieldMove: null,
      touchFieldTurn: null,
      gravity: 4,
      blobSpawnWaitInitial: 2,
      blobSpawnWaitCurrent: 2,
      blobSpawnWaitDiv: 1.01,
      blobKillCount: 0,
      blobSpawnTimer: null,
      blobMax: 200,
      blobDisplayed: 0,
      powerupMax: 5,
      powerupDisplayed: 0,
      dotsRemaining: 0,
      score: 0,
      levelNumber: 1,
      levelNumberFixed: 1,
      levelTimer: null,
      keys: 0,
      playerStart: { x: 0, y: 0 },
      mapImage: null,
      chestsFound: 0,
      chestsTotal: 0,
      levelDetails: [
        {
          name: "Test Level",
          url: "testlevel",
          floor: 5,
          wall: 1,
          music: "track2",
          score: 1000,
          help: null,
        },
        {
          name: "Training 1",
          url: "trainer1",
          floor: 5,
          wall: 1,
          music: "track2",
          score: 1000,
          help: "Find weapons, shoot creepers, collect diamonds<br>and find the exit",
        },
        {
          name: "Training 2",
          url: "trainer4",
          floor: 5,
          wall: 1,
          music: "track2",
          score: 1000,
          help: "Collect food to restore health",
        },
        {
          name: "Training 3",
          url: "trainer2",
          floor: 5,
          wall: 1,
          music: "track2",
          score: 1000,
          help: "Watch out for ghast fire",
        },
        {
          name: "Training 4",
          url: "trainer3",
          floor: 5,
          wall: 1,
          music: "track2",
          score: 1000,
          help: "Find keys to open doors",
        },
        {
          name: "Training 5",
          url: "trainer6",
          floor: 5,
          wall: 1,
          music: "track2",
          score: 1000,
          help: "Destroy monster spawners",
        },
        {
          name: "Training 6",
          url: "trainer5",
          floor: 5,
          wall: 1,
          music: "track2",
          score: 1000,
          help: "",
        },
        {
          name: "Dungeon 1",
          url: "level1",
          floor: 6,
          wall: 2,
          music: "track3",
          score: 1000,
          help: "",
        },
        {
          name: "Dungeon 2",
          url: "level2",
          floor: 6,
          wall: 2,
          music: "track3",
          score: 2000,
          help: "",
        },
        {
          name: "Dungeon 3",
          url: "level3",
          floor: 7,
          wall: 1,
          music: "track4",
          score: 3000,
          help: "",
        },
        {
          name: "Dungeon 4",
          url: "level4",
          floor: 7,
          wall: 1,
          music: "track4",
          score: 4000,
          help: "",
        },
        {
          name: "Dungeon 5",
          url: "level7",
          floor: 5,
          wall: 2,
          music: "track3",
          score: 5000,
          help: "",
        },
        {
          name: "Dungeon 6",
          url: "level6",
          floor: 5,
          wall: 2,
          music: "track3",
          score: 6000,
          help: "",
        },
        {
          name: "Dungeon 7",
          url: "level8",
          floor: 6,
          wall: 3,
          music: "track2",
          score: 7000,
          help: "",
        },
        {
          name: "Dungeon 8",
          url: "level9",
          floor: 5,
          wall: 3,
          music: "track4",
          score: 8000,
          help: "",
        },
        {
          name: "Dungeon 9",
          url: "level5",
          floor: 6,
          wall: 2,
          music: "track4",
          score: 9000,
          help: "",
        },
        {
          name: "Dungeon 10",
          url: "level10",
          floor: 7,
          wall: 2,
          music: "track4",
          score: 10000,
          help: "",
        },
      ],
      introSound: null,
      levelupSound: null,
      powerupSpawnWait: 5,
      powerupSpawnTimer: null,
      init: function () {
        if (!ig.ua.mobile) {
          ig.$("#canvas").addEventListener("click", function () {
            ig.system.requestMouseLock();
          });
        }
        ig.input.bind(ig.KEY.MOUSE1, "click");
        if (ig.ua.mobile) {
          this.setupTouchControls();
        } else {
          this.setupDesktopControls();
        }
        this.setTitle();
        ig.system.renderer.clear(1);
      },
      setTitle: function () {
        this.menu = true;
        this.levelTimer = new ig.Timer();
        var instructions = ig.ua.mobile
          ? ""
          : "USE ARROW KEYS/WASD TO MOVE/STRAFE<br>SPACE TO SHOOT<br>V OR MOUSEWHEEL TO SWITCH WEAPON";
        document.getElementById("menu").innerHTML =
          '<div id="frontpage_logo" style="position:absolute;"><img src="media/logo.png" style="position:absolute;top:82px;left:0px;width:638px;"></div><br><span class="mc_button" id="play_button" onclick="ig.game.setGame();" style="margin-top:200px;">PLAY GAME</span><br><span class="mc_button"><a href="https://funhtml5games.com/" target="_BLANK" style="padding:5px 100px 8px 95px;">MORE GAMES</a></span><br>' +
          (ig.ua.mobile
            ? ""
            : '<span class="mc_button" onclick="ig.game.showEmbed();">EMBED ON YOUR SITE</span>') +
          '<div id="embed_code" style="position:absolute;bottom:15px;width:100%;text-shadow:2px 2px #000;display:none;">COPY AND PASTE THE CODE BELOW:<br><input type="text" style="width:365px;" value=\'<iframe src="https://funhtml5games.com?embed=doomcraft" style="width:640px;height:480px;border:none;" frameborder="0" scrolling="no"></iframe>\' onclick="this.select();"></div><div id="instructions_div" style="position:absolute;bottom:25px;width:100%;text-shadow:2px 2px #000;font-size:17px;">' +
          instructions +
          "</div>";
        document.getElementById("menu").style.display = "block";
        document.getElementById("hud").innerHTML =
          '<table style="width:600px;margin-left:0px;border-collapse:collapse;"><tr><td style="width:120px;">SCORE:</td><td style="width:105px;">LEVEL:</td><td style="width:40px;"><img src="media/key.png" style="height:24px;vertical-align:text-bottom;"></td><td style="width:60px;"><img src="media/diamond.png" style="height:24px;vertical-align:text-bottom;"></td><td style="width:80px;">TIME:</td></tr><tr><td><span id="score_div">0</span></td><td id="level_div">1</td><td id="keys_div">0</td><td id="chests_div">0<img src="media/levelcomplete.png" style="width:1px;"></td><td id="time_div">0:00</td></tr><tr><td></td><td></td><td></td><td style="font-size:12px;" id="chests_best_div">(0/0)</td><td style="font-size:12px;" id="time_best_div">(0:00)</td></tr></table><div id="ammo_div" onclick="ig.game.player.switchToNextNonEmptyWeapon();"><img src="media/pistol_pickup.png" style="height:15px;" id="ammo_pic"><span id="ammo_number"></span></div><div id="health_meter"></div><div id="health_meter_bg"></div><div id="back_button" onclick="ig.game.exitGame();">&#128281;</div><div id="audio_button" onclick="ig.game.audioToggle();">&#128266;</div>';
      },
      formatTime: function (seconds) {
        seconds = ~~seconds;
        var hrs = ~~(seconds / 3600);
        var mins = ~~((seconds % 3600) / 60);
        var secs = seconds % 60;
        var ret = "";
        if (hrs > 0) ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
      },
      showEmbed: function () {
        document.getElementById("embed_code").style.display =
          document.getElementById("embed_code").style.display == "block"
            ? "none"
            : "block";
        document.getElementById("instructions_div").style.display =
          document.getElementById("embed_code").style.display == "block"
            ? "none"
            : "block";
      },
      setGame: function () {
        document.getElementById("play_button").innerHTML = "PLAY AGAIN";
        document.getElementById("frontpage_logo").innerHTML =
          '<div style="font-size:40px;text-shadow:2px 2px #000;position:absolute;top:100px;left:170px;width:300px;">YOU DIED!</div>';
        document.getElementById("embed_code").style.display = "none";
        document.getElementById("menu").style.display = "none";
        document.getElementById("hud").style.display = "block";
        this.hud = new MyHud(640, 480);
        this.score = 0;
        if (!storage["doomcraft_level"]) storage["doomcraft_level"] = 1;
        if (!storage["doomcraft_score"]) {
          storage["doomcraft_score"] = new Array(
            ig.game.levelDetails.length
          ).join(":");
        }
        if (!storage["doomcraft_time"]) {
          storage["doomcraft_time"] = new Array(
            ig.game.levelDetails.length
          ).join(":");
        }
        this.levelNumber = storage["doomcraft_level"];
        this.keys = 0;
        this.levelSelect();
      },
      fadeIn: function (el, display) {
        el.style.opacity = 0;
        el.style.display = display || "block";
        setTimeout(fade, 500);
        function fade() {
          var val = parseFloat(el.style.opacity);
          if (!((val += 0.1) > 1)) {
            el.style.opacity = val;
            setTimeout(fade, 50);
          }
        }
      },
      fadeOut: function (el, display) {
        el.style.opacity = 1;
        el.style.display = display || "block";
        setTimeout(fadeDown, 50);
        function fadeDown() {
          var val = parseFloat(el.style.opacity);
          if (!((val -= 0.1) < 0)) {
            el.style.opacity = val;
            setTimeout(fadeDown, 50);
          }
        }
      },
      showInfo: function (message) {
        document.getElementById("info").innerHTML =
          '<table style="width:100%;height:100%;"><tr><td>' +
          message +
          "</td></tr></table>";
        document.getElementById("info").style.display = "block";
        document.getElementById("info").style.opacity = 1;
      },
      initLevel: function () {
        document.getElementById("levelup").style.display = "none";
        this.keys = 0;
        ig.game.fadeIn(ig.$("#canvas"));
        ig.game.levelNumberFixed = this.levelNumber;
        while (ig.game.levelNumberFixed >= ig.game.levelDetails.length) {
          ig.game.levelNumberFixed -= 10;
        }
        if (ig.game.levelDetails[this.levelNumber]["help"]) {
          var level_details = ig.game.levelDetails[this.levelNumber]["help"];
          if (level_details) {
            ig.game.showInfo(level_details.toUpperCase());
            setTimeout("ig.game.fadeOut(ig.$('#info'));", 4000);
          }
        }
        this.mapImage = new Image();
        this.mapImage.src =
          "media/maps/" +
          ig.game.levelDetails[ig.game.levelNumberFixed]["url"] +
          ".png" +
          ig.nocache;
        this.mapImage.onload = function () {
          var canvas = document.getElementById("canvasmap");
          var context = canvas.getContext("2d");
          context.drawImage(this, 0, 0);
          ig.game.initLevelLoaded();
        };
      },
      clone: function (obj) {
        var copy;
        if (null == obj || "object" != typeof obj) return obj;
        if (obj instanceof Date) {
          copy = new Date();
          copy.setTime(obj.getTime());
          return copy;
        }
        if (obj instanceof Array) {
          copy = [];
          for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = this.clone(obj[i]);
          }
          return copy;
        }
        if (obj instanceof Object) {
          copy = {};
          for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
          }
          return copy;
        }
        throw new Error("Unable to copy obj! Its type isn't supported.");
      },
      initLevelLoaded: function () {
        ig.$("#hud").style.opacity = 1;
        this.blobKillCount = 0;
        this.blobSpawnWaitInitial = this.blobSpawnWaitInitial;
        this.blobSpawnTimer = new ig.Timer(this.blobSpawnWaitInitial);
        this.powerupSpawnTimer = new ig.Timer(this.powerupSpawnWait);
        this.blobDisplayed = 0;
        this.powerupDisplayed = 0;
        this.dotsRemaining = 0;
        var level_list = [false, LevelBase1];
        var level_to_load = 1;
        this.currentLevel = this.clone(level_list[1]);
        var map_size = 9 + this.levelNumber * 2;
        var walls_layer = this.currentLevel.layer[2];
        walls_layer.data = this.generateSquareMaze(map_size);
        walls_layer.width = walls_layer.data[0].length;
        walls_layer.height = walls_layer.data.length;
        var map_height = walls_layer.height;
        var map_width = walls_layer.width;
        for (var i = 0; i <= 4; i++) {
          if (i != 2) {
            this.currentLevel.layer[i].data = new Array(map_height);
            for (var y = 0; y < map_height; y++) {
              this.currentLevel.layer[i].data[y] = new Array(map_width);
            }
          }
        }
        var collision_layer = this.currentLevel.layer[0];
        var floor_layer = this.currentLevel.layer[1];
        var ceiling_layer = this.currentLevel.layer[3];
        var lighting_layer = this.currentLevel.layer[4];
        var current_shade = 101;
        var shade_dir = -0.5;
        collision_layer.width =
          lighting_layer.width =
          ceiling_layer.width =
          floor_layer.width =
            map_width;
        collision_layer.height =
          lighting_layer.height =
          ceiling_layer.height =
          floor_layer.height =
            map_height;
        for (var y = 0; y < map_height; y++) {
          for (var x = 0; x < map_width; x++) {
            lighting_layer.data[y][x] = 0;
            if (!walls_layer.data[y][x]) {
              if (floor_layer.data[y][x] != 7) {
                floor_layer.data[y][x] =
                  ig.game.levelDetails[this.levelNumberFixed]["floor"];
              }
            } else {
              if (!floor_layer.data[y][x]) floor_layer.data[y][x] = 0;
            }
            if (walls_layer.data[y][x] == 7) {
              floor_layer.data[y + 1][x + 0] = 7;
            }
            collision_layer.data[y][x] = walls_layer.data[y][x] ? 1 : 0;
            ceiling_layer.data[y][x] = 14;
          }
          if (current_shade == 89) shade_dir = 0.5;
        }
        this.loadLevel(this.currentLevel);
        var ts = this.floorMap.tilesize;
        this.dotsRemaining = 1;
        ig.game.player.pos = ig.game.playerStart;
        ig.game.player.internalAngle =
          walls_layer.data[1][2] == 0 ? -1.56 : -3.12;
        this.dead = false;
        this.menu = null;
        if (this.levelNumber == 1) this.hud.showControls();
        this.levelTimer.reset();
      },
      generateSquareMaze: function (dimension) {
        var field = [];
        var canvas = document.getElementById("canvasmap");
        var context = canvas.getContext("2d");
        var tw = this.mapImage.width;
        var th = this.mapImage.height;
        var ts = 64;
        var data = context.getImageData(0, 0, tw, th).data;
        function valid(tx, ty) {
          return tx >= 0 && tx < tw && ty >= 0 && ty < th;
        }
        function index(tx, ty) {
          return (tx + ty * tw) * 4;
        }
        function pixel(tx, ty) {
          var i = index(tx, ty);
          return valid(tx, ty)
            ? (data[i] << 16) + (data[i + 1] << 8) + data[i + 2]
            : null;
        }
        function is(pixel, type) {
          return (pixel & PIXEL.MASK.TYPE) === type;
        }
        function type(pixel) {
          return (pixel & PIXEL.MASK.EXHIGH) >> 4;
        }
        var PIXEL = {
          NOTHING: 0x000000,
          DOOR: 0xc0c000,
          WALL: 0x404000,
          GENERATOR: 0xf00000,
          MONSTER: 0x400000,
          START: 0x00f000,
          TREASURE: 0x008000,
          EXIT: 0x004000,
          WEAPON: 0xf0f000,
          MASK: { TYPE: 0xffff00, EXHIGH: 0x0000f0, EXLOW: 0x00000f },
        };
        var MONSTERS = [
          EntityEnemy1,
          EntityEnemy2,
          EntityEnemy3,
          EntityEnemy1,
          EntityEnemy2,
        ];
        var TREASURES = [
          EntityHealthPickup,
          EntityHealthPickup,
          EntityHealthPickup,
          EntityHealthPickup,
          EntityHealthPickup,
          EntityKeyPickup,
          EntityHealthPickup,
          EntityChestPickup,
        ];
        var WEAPONS = [EntityGrenadePickup, EntityRocketPickup];
        this.chestsTotal = 0;
        for (var ty = 0; ty < th; ty++) {
          field.push([]);
          for (var tx = 0; tx < tw; tx++) {
            var currpixel = pixel(tx, ty);
            field[ty].push(
              currpixel == PIXEL.WALL
                ? ig.game.levelDetails[this.levelNumberFixed]["wall"]
                : 0
            );
            if (currpixel == PIXEL.DOOR) {
              field[ty][tx] = 4;
            }
            if (currpixel == PIXEL.EXIT) {
              field[ty][tx] = 8;
            }
            if (is(currpixel, PIXEL.TREASURE)) {
              this.currentLevel.entities.push({
                type: TREASURES[type(currpixel)],
                x: tx * ts,
                y: ty * ts,
              });
              if (type(currpixel) == 7) this.chestsTotal++;
            }
            if (is(currpixel, PIXEL.MONSTER)) {
              this.currentLevel.entities.push({
                type: MONSTERS[type(currpixel)],
                x: tx * ts + 16,
                y: ty * ts + 16,
              });
            }
            if (is(currpixel, PIXEL.WEAPON)) {
              this.currentLevel.entities.push({
                type: WEAPONS[type(currpixel)],
                x: tx * ts + 32,
                y: ty * ts + 32,
              });
            }
            if (is(currpixel, PIXEL.GENERATOR)) {
              this.currentLevel.entities.push({
                type: EntityEnemy4,
                x: tx * ts + 16,
                y: ty * ts + 16,
              });
            }
            if (currpixel == PIXEL.START) {
              ig.game.playerStart = { x: tx * ts, y: ty * ts };
            }
          }
        }
        this.chestsFound = 0;
        return field;
      },
      setupDesktopControls: function () {
        ig.input.bind(ig.KEY.UP_ARROW, "forward");
        ig.input.bind(ig.KEY.LEFT_ARROW, "left");
        ig.input.bind(ig.KEY.DOWN_ARROW, "back");
        ig.input.bind(ig.KEY.RIGHT_ARROW, "right");
        ig.input.bind(ig.KEY.C, "shoot");
        ig.input.bind(ig.KEY.ENTER, "shoot");
        ig.input.bind(ig.KEY.X, "run");
        ig.input.bind(ig.KEY.V, "weaponNext");
        ig.input.bind(ig.KEY.ESC, "pause");
        ig.input.bind(ig.KEY.W, "forward");
        ig.input.bind(ig.KEY.A, "stepleft");
        ig.input.bind(ig.KEY.S, "back");
        ig.input.bind(ig.KEY.D, "stepright");
        ig.input.bind(ig.KEY.SHIFT, "run");
        ig.input.bind(ig.KEY.SPACE, "shoot");
        ig.input.bind(ig.KEY.MOUSE2, "run");
        ig.input.bind(ig.KEY.MWHEEL_UP, "weaponNext");
        ig.input.bind(ig.KEY.MWHEEL_DOWN, "weaponPrev");
        ig.input.bind(ig.GAMEPAD.PAD_TOP, "forward");
        ig.input.bind(ig.GAMEPAD.PAD_LEFT, "left");
        ig.input.bind(ig.GAMEPAD.PAD_BOTTOM, "back");
        ig.input.bind(ig.GAMEPAD.PAD_RIGHT, "right");
        ig.input.bind(ig.GAMEPAD.RIGHT_SHOULDER_BOTTOM, "shoot");
        ig.input.bind(ig.GAMEPAD.LEFT_SHOULDER_BOTTOM, "run");
        ig.input.bind(ig.GAMEPAD.FACE_1, "shoot");
        ig.input.bind(ig.GAMEPAD.FACE_4, "reset-tracking");
        ig.input.bind(ig.GAMEPAD.FACE_3, "weaponNext");
        ig.input.bind(ig.GAMEPAD.FACE_2, "weaponPrev");
      },
      setupTouchControls: function () {
        if (this.touchButtons) {
          this.touchButtons.remove();
        }
        if (this.touchFieldMove) {
          this.touchFieldMove.remove();
        }
        if (this.touchFieldTurn) {
          this.touchFieldTurn.remove();
        }
        this.touchButtons = new ig.TouchButtonCollection([
          new ig.TouchButton(
            "shoot",
            { right: 0, bottom: 0 },
            ig.system.width / 2,
            ig.system.height / 4
          ),
        ]);
        this.touchButtons.align();
        this.touchFieldMove = new ig.TouchField(
          0,
          0,
          ig.system.width / 2,
          ig.system.height
        );
        this.touchFieldTurn = new ig.TouchField(
          ig.system.width / 2,
          0,
          ig.system.width / 2,
          (ig.system.height / 4) * 3
        );
      },
      refreshLevel: function () {
        var entities_copy = this.entities.slice();
        for (var i = 2; i < this.entities.length; i++) {
          if (this.entities[i].vel.x == 0) {
            this.entities[i].vel.x = 20;
            if (
              !this.entities[i].friction ||
              this.entities[i].friction.x == 0
            ) {
              this.entities[i].friction = { x: 1000, y: 1000 };
            }
          }
        }
        for (var i = 2; i < this.entities.length; i++) {
          if (this.entities[i] instanceof tpf.Entity) {
            this.entities[i].remove();
          }
        }
        this.entities = [];
        this.namedEntities = {};
        this.culledSectors = null;
        this.collisionMap = ig.CollisionMap.staticNoCollision;
        this.backgroundMaps = [];
        this.lightMap = null;
        var data = this.currentLevel;
        for (var i = 0; i < data.layer.length; i++) {
          var ld = data.layer[i];
          if (ld.name == "collision") {
            this.collisionMap = new ig.CollisionMap(ld.tilesize, ld.data);
          } else if (ld.name == "light") {
            this.lightMap = new tpf.LightMap(
              ld.tilesize,
              ld.data,
              ld.tilesetName
            );
          } else if (
            ld.name == "walls" ||
            ld.name == "floor" ||
            ld.name == "ceiling"
          ) {
            var MapClass = ld.name == "walls" ? tpf.WallMap : tpf.Map;
            var anims = this.backgroundAnims[ld.tilesetName] || {};
            var newMap = new MapClass(
              ld.tilesize,
              ld.data,
              ld.tilesetName,
              ld.name,
              anims
            );
            newMap.name = ld.name;
            this.backgroundMaps.push(newMap);
          }
        }
        var floorMap = this.getMapByName("floor");
        var wallMap = this.getMapByName("walls");
        if (floorMap && wallMap) {
          wallMap.eraseDisconnectedWalls(floorMap);
        }
        if (this.lightMap) {
          for (var i = 0; i < this.backgroundMaps.length; i++) {
            this.backgroundMaps[i].applyLightMap(this.lightMap);
          }
        }
        this.culledSectors = new tpf.CulledSectors(
          floorMap,
          this.backgroundMaps,
          this.sectorSize
        );
        ig.game.entities = entities_copy.slice();
        for (var i = 2; i < this.entities.length; i++) {
          this.entities[i].ready();
        }
      },
      loadLevel: function (data) {
        this.currentLevel = data;
        this.clearColor = null;
        var info = null;
        for (var i = 0; i < data.entities.length; i++) {
          if (
            data.entities[i].settings &&
            data.entities[i].settings.name == "info"
          ) {
            info = data.entities[i].settings;
          }
        }
        this.sectorSize = (info && info.sectorSize) || 4;
        this.parent(data);
        if (info && typeof info.fogColor !== "undefined" && !ig.ua.mobile) {
          ig.system.renderer.setFog(
            parseInt(info.fogColor),
            info.fogNear,
            info.fogFar
          );
        } else {
          ig.system.renderer.setFog(false);
        }
        this.floorMap = this.getMapByName("floor");
        this.wallMap = this.getMapByName("walls");
      },
      update: function () {
        if (
          ig.input.pressed("reset-tracking") &&
          ig.system.renderer instanceof tpf.StereoRenderer
        ) {
          ig.system.renderer.reset();
        }
        if (this.menu) {
          return;
        }
        if (this.dead) {
          if (
            ig.input.released("shoot") ||
            (!ig.ua.mobile && ig.input.released("click"))
          ) {
            this.setTitle();
          }
        } else {
          if (
            this.blobSpawnTimer.delta() > 0 &&
            this.blobDisplayed < this.blobMax
          ) {
          }
          if (
            this.powerupSpawnTimer.delta() > 0 &&
            this.powerupDisplayed < this.powerupMax
          ) {
          }
        }
        this.parent();
        if (this.deathAnimTimer) {
          var delta = this.deathAnimTimer.delta();
          if (delta < 0) {
            ig.system.camera.position[1] = delta.map(
              -this.deathAnimTimer.target,
              0,
              0,
              -ig.game.collisionMap.tilesize / 4
            );
          } else {
            this.deathAnimTimer = null;
            this.dead = true;
          }
        }
        if (
          this.dotsRemaining > 0 &&
          this.floorMap.getTile(ig.game.player.pos.x, ig.game.player.pos.y) == 8
        ) {
          this.dotsRemaining = 0;
        }
        if (this.dotsRemaining == 0) {
          this.levelTimer.pause();
          this.killAllEntities();
          var scores = storage["doomcraft_score"].split(":");
          var current_level_score = Math.floor(
            scores[ig.game.levelNumber].split("/")[0]
          );
          if (
            !current_level_score ||
            ig.game.chestsFound > current_level_score
          ) {
            scores[ig.game.levelNumber] =
              ig.game.chestsFound + "/" + ig.game.chestsTotal;
          } else {
          }
          storage["doomcraft_score"] = scores.join(":");
          var times = storage["doomcraft_time"].split(":");
          var current_level_time = Math.floor(times[ig.game.levelNumber]);
          var latest_time = Math.floor(ig.game.levelTimer.delta());
          if (!current_level_time || latest_time < current_level_time) {
            times[ig.game.levelNumber] = latest_time;
          } else {
          }
          storage["doomcraft_time"] = times.join(":");
          document.getElementById("levelup").innerHTML =
            '<img src="media/levelcomplete.png" style="margin-top:79px;width:400px;"><div style="font-size:20px;color:#0f0;text-shadow:2px 2px #000;">DIAMONDS FOUND: ' +
            ig.game.chestsFound +
            "/" +
            ig.game.chestsTotal +
            "<br>ENEMIES KILLED: " +
            ig.game.blobKillCount +
            '</div><br><span class="mc_button" onclick="ig.game.levelSelect();">CONTINUE</span>';
          document.getElementById("levelup").style.backgroundImage = "none";
          ig.game.fadeOut(ig.$("#hud"));
          if (ig.game.levelNumber == ig.game.levelDetails.length - 1) {
            document.getElementById("levelup").innerHTML +=
              '<div id="complete">CONGRATULATIONS!<br>YOU HAVE DEFEATED ALL OF THE DUNGEONS!</div>';
            document.getElementById("levelup").style.display = "block";
          } else {
            document.getElementById("levelup").style.display = "block";
          }
          document.exitPointerLock();
        }
      },
      nextLevel: function () {
        ig.game.levelNumber++;
        if (ig.game.levelNumber < ig.game.levelDetails.length) {
          storage["doomcraft_level"] = ig.game.levelNumber;
          ig.game.initLevel();
        } else {
          ig.game.levelNumber = 1;
          storage["doomcraft_level"] = ig.game.levelNumber;
          ig.game.initLevel();
        }
      },
      exitGame: function () {
        this.dotsRemaining = -1;
        this.levelSelect();
      },
      audioToggle: function () {
        ig.Sound.enabled = !ig.Sound.enabled;
        ig.$("#audio_button").style.opacity = ig.Sound.enabled ? 1 : 0.5;
      },
      killAllEntities: function () {
        this.dotsRemaining = -1;
        for (var i in ig.game.entities) {
          if (ig.game.entities[i].type == ig.Entity.TYPE.B) {
            ig.game.entities[i].kill();
          }
        }
      },
      levelSelect: function () {
        this.killAllEntities();
        var level_select_grid =
          '<div style="position:absolute;top:35px;left:50px;right:50px;bottom:50px;border:1px solid #fff;border-radius:6px;background:#6f6f6f;padding:20px;text-shadow:2px 2px #000;"><center>SELECT LEVEL:<table style="width:100%;border-spacing:12px;">';
        var this_level_number = 1;
        var level_unlocked = true;
        var scores = storage["doomcraft_score"].split(":");
        var times = storage["doomcraft_time"].split(":");
        for (var y = 0; y < 4; y++) {
          level_select_grid += "<tr>";
          for (var x = 0; x < 4; x++) {
            var rating = scores[this_level_number];
            var rating_text =
              '<div class="rating_bg">' +
              (rating
                ? rating.replace(
                    "/",
                    '<span style="font-family:Verdana;font-weight:bold;">/</span>'
                  )
                : "&#9654;") +
              "</div>";
            var time_text =
              '<div style="font-size:12px;">' +
              this.formatTime(times[this_level_number]) +
              "</div>";
            level_select_grid +=
              '<td onclick="ig.game.levelStart(' +
              this_level_number +
              ');">' +
              (!level_unlocked
                ? '<img src="media/lock.png">'
                : this_level_number + rating_text + time_text + "</td>");
            this_level_number++;
            if (!rating) level_unlocked = false;
          }
          level_select_grid += "</tr>";
        }
        level_select_grid += "</table></center></div>";
        level_select_grid +=
          '<span class="mc_button" style="top:434px;"><a href="http://funhtml5games.com/" target="_BLANK" style="padding:5px 100px 8px 95px;">MORE GAMES</a></span>';
        document.getElementById("levelup").innerHTML = level_select_grid;
        document.getElementById("levelup").style.backgroundImage =
          "url(media/frontpage.jpg)";
        document.getElementById("levelup").style.display = "block";
        document.exitPointerLock();
      },
      levelStart: function (levelSelected) {
        var scores = storage["doomcraft_score"].split(":");
        var times = storage["doomcraft_time"].split(":");
        if (levelSelected > 1 && !scores[levelSelected - 1]) return;
        ig.game.levelNumber = levelSelected;
        document.getElementById("chests_best_div").innerHTML = scores[
          ig.game.levelNumber
        ]
          ? "(" + scores[ig.game.levelNumber] + ")"
          : "";
        document.getElementById("time_best_div").innerHTML = times[
          ig.game.levelNumber
        ]
          ? "(" + this.formatTime(times[ig.game.levelNumber]) + ")"
          : "";
        ig.game.initLevel();
      },
      spawnBlob: function () {
        var spawnPos = null,
          spawnDistance = null,
          playerPos = this.player.pos;
        for (var i = 0; i < 10; i++) {
          spawnPos = this.getRandomSpawnPos();
          spawnDistance =
            Math.abs(spawnPos.x - playerPos.x) +
            Math.abs(spawnPos.y - playerPos.y);
          if (spawnDistance > 200) break;
        }
        var random_enemies = [EntityEnemy1];
        this.spawnEntity(random_enemies.random(), spawnPos.x, spawnPos.y);
        this.blobDisplayed++;
        this.blobSpawnTimer.set(Math.max(this.blobSpawnWaitCurrent, 0.5));
      },
      spawnPowerup: function () {
        var powerups = [];
        var powerups_avail = [
          EntityPistolPickup,
          EntityGrenadePickup,
          EntityRocketPickup,
        ];
        for (var i = 0; i < 3; i++) {
          if (ig.game.player.weapons[i].ammo == 0) {
            powerups.push(powerups_avail[i]);
          }
        }
        if (powerups.length == 0) return;
        var entityClass = powerups[0];
        var spawnPos = null,
          spawnDistance = null,
          playerPos = this.player.pos;
        for (var i = 0; i < 1000; i++) {
          spawnPos = this.getRandomSpawnPos();
          var xd = playerPos.x - spawnPos.x;
          var yd = playerPos.y - spawnPos.y;
          spawnDistance = Math.sqrt(xd * xd + yd * yd);
          if (spawnDistance > 300 && spawnDistance < 1200) break;
        }
        this.spawnEntity(entityClass, spawnPos.x, spawnPos.y);
        this.powerupDisplayed++;
        this.powerupSpawnTimer.reset();
      },
      getRandomSpawnPos: function () {
        var ts = this.floorMap.tilesize;
        while (true) {
          var x = ((Math.random() * this.floorMap.width) | 0) * ts + ts / 2,
            y = ((Math.random() * this.floorMap.height) | 0) * ts + ts / 2;
          if (
            this.floorMap.getTile(x, y) ==
              ig.game.levelDetails[this.levelNumberFixed]["floor"] &&
            this.floorMap.getTile(x - 1, y) ==
              ig.game.levelDetails[this.levelNumberFixed]["floor"] &&
            this.floorMap.getTile(x + 1, y) ==
              ig.game.levelDetails[this.levelNumberFixed]["floor"] &&
            this.floorMap.getTile(x, y - 1) ==
              ig.game.levelDetails[this.levelNumberFixed]["floor"] &&
            this.floorMap.getTile(x, y + 1) ==
              ig.game.levelDetails[this.levelNumberFixed]["floor"]
          ) {
            return { x: x, y: y };
          }
        }
      },
      showDeathAnim: function () {
        this.deathAnimTimer = new ig.Timer(1);
      },
      drawWorld: function () {
        this.parent();
      },
      drawHud: function () {
        ig.system.renderer.hudFreelook = false;
        if (this.player) {
          ig.game.hud.draw(this.player, this.player.currentWeapon);
        }
        if (this.menu) {
          ig.system.renderer.hudFreelook = true;
        }
      },
    });
    document.body.className =
      (ig.System.hasWebGL() ? "webgl" : "no-webgl") +
      " " +
      (ig.ua.mobile ? "mobile" : "desktop");
    var width = 640;
    var height = 480;
    if (window.Ejecta) {
      var canvas = ig.$("#canvas");
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    } else if (ig.ua.mobile) {
      ig.$("#game").className = "mobile";
      var canvas = ig.$("#canvas");
      window.addEventListener(
        "resize",
        function () {
          setTimeout(function () {
            if (ig.system) {
              ig.system.resize(window.innerWidth, window.innerHeight);
            }
            if (ig.game) {
              ig.game.setupTouchControls();
            }
          }, 16);
        },
        false
      );
      width = window.innerWidth;
      height = window.innerHeight;
    } else {
      window.addEventListener(
        "resize",
        function () {
          setTimeout(function () {
            var new_height = window.innerHeight;
            var new_width = (window.innerHeight / 480) * 640;
            if (ig.system) ig.system.resize(new_width, new_height);
          }, 16);
        },
        false
      );
      var new_height = window.innerHeight;
      var new_width = (window.innerHeight / 480) * 640;
      width = new_width;
      height = new_height;
    }
    if (ig.System.hasWebGL()) {
      ig.main("#canvas", MyGame, 60, width, height, 1, tpf.Loader);
    } else {
      ig.$("#game").style.display = "none";
      ig.$("#no-webgl").style.display = "block";
    }
  });
