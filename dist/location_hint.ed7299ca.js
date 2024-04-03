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
})({"js/location_hint.js":[function(require,module,exports) {
document.addEventListener('DOMContentLoaded', function () {
  var now = new Date();
  console.log("addEventListener(): ", now);
  getShardInfo(now);
  updateLocationHintElement();
});
window.onload = function () {
  // document.title = "【光遇国服碎片时间查询】" + getShardInfo();
  document.title = "【光遇国服碎片时间查询】";
};
window.getShardInfo = getShardInfo;
// export function getShardInfo(){
function getShardInfo(now) {
  console.log("getShardInfo(): ", now);
  // console.log( now.getMonth() );

  var rule1_mapping = {
    0: "云野",
    1: "雨林",
    2: "霞谷",
    3: "暮土",
    4: "禁阁"
  };
  var weekdays_mapping = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  var candleType_mapping = {
    "wc": {
      englishHint: "white candle",
      chineseHint: "点普通烛火"
    },
    "ac": {
      englishHint: "ascended candle",
      chineseHint: "根升华蜡烛"
    }
  };
  var shardInfo_Mon = [];
  var shardInfo_Tues = [{
    locationName: "蝴蝶平原",
    candleAmount: 200
  }, {
    locationName: "荧光森林",
    candleAmount: 200
  }, {
    locationName: "滑冰场",
    candleAmount: 200
  }, {
    locationName: "边陲荒漠",
    candleAmount: 200
  }, {
    locationName: "星光沙漠",
    candleAmount: 200
  }];
  var shardInfo_Wed = [{
    locationName: "云中仙乡",
    candleAmount: 200
  }, {
    locationName: "密林遗迹",
    candleAmount: 200
  }, {
    locationName: "滑冰场",
    candleAmount: 200
  }, {
    locationName: "远古战场",
    candleAmount: 200
  }, {
    locationName: "星光沙漠",
    candleAmount: 200
  }];
  var shardInfo_Thur = [];
  var shardInfo_Fri = [{
    locationName: "云顶浮岛",
    candleAmount: 2.5
  }, {
    locationName: "大树屋",
    candleAmount: 3.5
  }, {
    locationName: "圆梦村",
    candleAmount: 2.5
  }, {
    locationName: "黑水港湾",
    candleAmount: 2.5
  }, {
    locationName: "水母港湾",
    candleAmount: 3.5
  }];
  var shardInfo_Sat = [{
    locationName: "幽光山洞",
    candleAmount: 2
  }, {
    locationName: "神殿后花园",
    candleAmount: 2.5
  }, {
    locationName: "圆梦村",
    candleAmount: 2.5
  }, {
    locationName: "巨兽荒原",
    candleAmount: 2
  }, {
    locationName: "水母港湾",
    candleAmount: 3.5
  }];
  var shardInfo_Sun = [{
    locationName: "圣岛",
    candleAmount: 3.5
  }, {
    locationName: "秘密花园",
    candleAmount: 3.5
  }, {
    locationName: "雪隐峰",
    candleAmount: 3.5
  }, {
    locationName: "失落方舟",
    candleAmount: 3.5
  }, {
    locationName: "水母港湾",
    candleAmount: 3.5
  }];
  var shardInfo_List = [shardInfo_Sun, shardInfo_Mon, shardInfo_Tues, shardInfo_Wed, shardInfo_Thur, shardInfo_Fri, shardInfo_Sat];
  var month = now.getMonth() + 1; // 获取月份，并在需要时补零
  var date = now.getDate(); // 获取日期，并在需要时补零
  var dayOfWeek = now.getDay(); // 获取星期几
  // dayOfWeek = 6;
  var dateString = month.toString() + '月' + date.toString() + '日'; // x月x日 星期x 格式

  var isNoShardDay = false;
  if (dayOfWeek === 1 || dayOfWeek === 4) isNoShardDay = true; //星期一 星期四 肯定没有
  if (1 <= date && date <= 15)
    //前半月
    if (dayOfWeek === 3 || dayOfWeek === 5) isNoShardDay = true; //星期三 星期五 肯定没有
  if (16 <= date)
    //后半月
    if (dayOfWeek === 2 || dayOfWeek === 6) isNoShardDay = true; //星期二 星期六 肯定没有

  if (isNoShardDay) {
    console.log("getShardInfo(): ", now + "is a no shard day.");
    ShardInfoString = "今天没有碎片事件。";
    // locationHint.textContent = ShardInfoString  ;
    // return ShardInfoString ;
    return [];
  }

  // console.log(shardInfo_List);
  // console.log(dayOfWeek);
  // console.log((date-1)%5);
  // console.log(shardInfo_List[dayOfWeek]);
  // console.log(shardInfo_List[6]);
  infoObj = shardInfo_List[dayOfWeek][(date - 1) % 5];
  candleType = DayOfWeek === 2 || DayOfWeek === 3 ? "wc" : "ac";

  // console.log( candleType_mapping );
  // console.log( candleType );
  // console.log( candleType_mapping["ac"] );
  ShardInfoString = "今天（" + dateString + "）的碎片降临在 " + infoObj.locationName + "，提供 " + infoObj.candleAmount + candleType_mapping[candleType].chineseHint + "。";
  // locationHint.textContent = ShardInfoString;	
  // return ShardInfoString;

  // var body = document.querySelector('body');
  // var bgImageSrc = 'url(images/LocationImages/' + infoObj.locationName + '.jpg)';

  // // 设置背景样式
  // body.style.backgroundImage = bgImageSrc;
  // body.style.backgroundRepeat = 'repeat';
  // body.style.backgroundPosition = 'center';
  // body.style.backgroundSize = 'cover';

  return [infoObj.locationName, infoObj.candleAmount, candleType_mapping[candleType].chineseHint];
}
var infoObj, ShardInfoString, candleType;
function updateLocationHintElement() {
  var locationHint = document.getElementById("main-info");
  locationHint.textContent = ShardInfoString;

  // 在这里获取已经存在的组件的引用
  var candleTypeImage = document.getElementById("candle-type");
  var candleAmountElement = document.getElementById("candle-amount");
  if (ShardInfoString === "今天没有碎片事件。") {
    candleTypeImage.src = "";
    candleAmountElement.textContent = "";
    return;
  }
  candleTypeImage.src = "./images/" + candleType + ".png";
  candleAmountString = "    x" + infoObj.candleAmount;
  if (candleType == "wc") candleAmountString += "滴白蜡烛烛火";
  if (candleType == "ac") candleAmountString += "根升华蜡烛";
  candleAmountElement.textContent = candleAmountString;
}
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
},{}]},{},["C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/location_hint.js"], null)
//# sourceMappingURL=/location_hint.ed7299ca.js.map