// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/main.js":[function(require,module,exports) {
// import { getShardInfo } from "./location_hint.js";

(function ($) {
  "use strict";

  document.addEventListener('DOMContentLoaded', function () {
    var today = new Date(),
      year = today.getFullYear(),
      month = today.getMonth(),
      monthTag = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      day = today.getDate(),
      dayOfWeek = today.getDay(),
      days = document.getElementsByTagName('td'),
      selectedDay,
      setDate,
      daysLen = days.length;
    var Color_BlackShard = '#847272';
    var Color_RedShard = '#ff1e14';

    // options should like '2014-01-01'

    function Calendar(selector, options) {
      this.options = options;
      this.draw();
    }
    Calendar.prototype.draw = function () {
      this.getCookie('selected_day');
      this.getOptions();
      this.drawDays();
      var that = this,
        reset = document.getElementById('reset'),
        pre = document.getElementsByClassName('pre-button'),
        next = document.getElementsByClassName('next-button');
      pre[0].addEventListener('click', function () {
        that.preMonth();
      });
      next[0].addEventListener('click', function () {
        that.nextMonth();
      });
      reset.addEventListener('click', function () {
        that.reset();
      });
      while (daysLen--) {
        days[daysLen].addEventListener('click', function () {
          that.clickDay(this);
        });
      }
    };
    Calendar.prototype.drawHeader = function (e) {
      var headMonth = document.getElementsByClassName('head-month'),
        headDay = document.getElementsByClassName('head-day');

      //---------------------
      headMonth[0].innerHTML = monthTag[month] + "<br>" + year;

      //---------------------
      // e ? (headDay[0].innerHTML = e) : (headDay[0].innerHTML = day);
      var dateNum;
      if (e) dateNum = e;else dateNum = day;
      var ChineseWeekDay = ['日', '一', '二', '三', '四', '五', '六'];
      var headDayString = "选中的日期是 [" + month + "月" + dateNum + "日 星期" + ChineseWeekDay[dayOfWeek] + "] ， ";

      // return [ infoObj.locationName, infoObj.candleAmount, candleType_mapping[candleType].chineseHint ];
      // const customDate = new Date(2022, 3, 15, 10, 30, 0, 0); 年 月 日 时 分 秒 毫秒
      // console.log(customDate); // 输出：Wed Apr 15 2022 10:30:00 GMT+0000 (Coordinated Universal Time)
      var shardInfoList = getShardInfo(new Date(year, month, dateNum));
      if (shardInfoList.length == 0) headDayString += "<br>" + "这一天没有碎片事件。";else headDayString += "<br>" + "这一天的碎片降临在" + shardInfoList[0] + ", <br> 提供" + shardInfoList[1] + shardInfoList[2] + "。";
      headDay[0].innerHTML = headDayString;
      var wrapHeader = document.querySelector('.wrap-header');
      wrapHeader.style.backgroundImage = 'url(images/LocationImages/' + shardInfoList[0] + '.jpg)';
      wrapHeader.style.backgroundSize = 'cover';
      wrapHeader.style.backgroundRepeat = 'no-repeat';
      wrapHeader.style.backgroundPosition = 'center';
    };
    Calendar.prototype.drawDays = function () {
      var startDay = new Date(year, month, 1).getDay(),
        nDays = new Date(year, month + 1, 0).getDate(),
        n = startDay; //最后一天的格子数，从1开始数

      for (var k = 0; k < 42; k++) {
        days[k].innerHTML = '';
        days[k].id = '';
        days[k].className = '';
      }
      for (var i = 1; i <= nDays; i++) {
        days[n].innerHTML = i;
        n++;
      }
      console.log("Calendar.prototype.drawDays = function() 1号的编号，最后一天的编号，当月的天数： ", startDay, nDays, n);
      for (var j = 0; j < 42; j++) {
        if (days[j].innerHTML === "") {
          days[j].id = "disabled";
        } else if (j === day + startDay - 1) {
          if (this.options && month === setDate.getMonth() && year === setDate.getFullYear() || !this.options && month === today.getMonth() && year === today.getFullYear()) {
            this.drawHeader(day);
            days[j].id = "today";
          }
        }
        if (selectedDay) {
          if (j === selectedDay.getDate() + startDay - 1 && month === selectedDay.getMonth() && year === selectedDay.getFullYear()) {
            days[j].className = "selected";
            this.drawHeader(selectedDay.getDate());
          }
        }
      }
      var convertHexToRgba = function convertHexToRgba(hexColor, opacity) {
        var color = hexColor.replace('#', '');
        var r = parseInt(color.substring(0, 2), 16);
        var g = parseInt(color.substring(2, 4), 16);
        var b = parseInt(color.substring(4, 6), 16);
        var rgbaColor = "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(opacity, ")");
        return rgbaColor;
      };
      for (var j = 0; j < 42; j++) {
        days[j].style.backgroundColor = convertHexToRgba('#ffffff', 0.1); //reset bg color
      }
      for (var j = 0; j < 42; j++) {
        //paint according to shard type
        if (days[j].innerHTML === "") continue;
        var dateNum = j - startDay + 1;
        var weekdayNum = j % 7 === 0 ? 7 : j % 7;
        if (dateNum >= 1 && dateNum <= 15) {
          if (weekdayNum === 2) days[j].style.backgroundColor = convertHexToRgba(Color_BlackShard, 0.5);
          if (weekdayNum === 6 || weekdayNum === 7) days[j].style.backgroundColor = convertHexToRgba(Color_RedShard, 0.5);
        } else if (dateNum >= 16) {
          if (weekdayNum === 3) days[j].style.backgroundColor = convertHexToRgba(Color_BlackShard, 0.5);
          if (weekdayNum === 5 || weekdayNum === 7) days[j].style.backgroundColor = convertHexToRgba(Color_RedShard, 0.5);
        }
      }
      for (var j = 0; j < 32; j++) {
        days[j].style.margin = "20px";
      }
    };
    Calendar.prototype.clickDay = function (o) {
      var selected = document.getElementsByClassName("selected"),
        len = selected.length;
      if (len !== 0) {
        selected[0].className = "";
      }
      o.className = "selected";
      selectedDay = new Date(year, month, o.innerHTML);
      this.drawHeader(o.innerHTML);
      this.setCookie('selected_day', 1);
    };
    Calendar.prototype.preMonth = function () {
      if (month < 1) {
        month = 11;
        year = year - 1;
      } else {
        month = month - 1;
      }
      this.drawHeader(1);
      this.drawDays();
    };
    Calendar.prototype.nextMonth = function () {
      if (month >= 11) {
        month = 0;
        year = year + 1;
      } else {
        month = month + 1;
      }
      this.drawHeader(1);
      this.drawDays();
    };
    Calendar.prototype.getOptions = function () {
      if (this.options) {
        var sets = this.options.split('-');
        setDate = new Date(sets[0], sets[1] - 1, sets[2]);
        day = setDate.getDate();
        year = setDate.getFullYear();
        month = setDate.getMonth();
      }
    };
    Calendar.prototype.reset = function () {
      month = today.getMonth();
      year = today.getFullYear();
      day = today.getDate();
      this.options = undefined;
      this.drawDays();
    };
    Calendar.prototype.setCookie = function (name, expiredays) {
      if (expiredays) {
        var date = new Date();
        date.setTime(date.getTime() + expiredays * 24 * 60 * 60 * 1000);
        var expires = "; expires=" + date.toGMTString();
      } else {
        var expires = "";
      }
      document.cookie = name + "=" + selectedDay + expires + "; path=/";
    };
    Calendar.prototype.getCookie = function (name) {
      if (document.cookie.length) {
        var arrCookie = document.cookie.split(';'),
          nameEQ = name + "=";
        for (var i = 0, cLen = arrCookie.length; i < cLen; i++) {
          var c = arrCookie[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
          }
          if (c.indexOf(nameEQ) === 0) {
            selectedDay = new Date(c.substring(nameEQ.length, c.length));
          }
        }
      }
    };
    var calendar = new Calendar();
  }, false);
})(jQuery);
},{}],"C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61526" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map