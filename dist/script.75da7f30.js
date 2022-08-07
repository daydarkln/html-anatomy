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
})({"node_modules/waait/index.js":[function(require,module,exports) {
const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

module.exports = wait;

},{}],"tooltip.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const div = className => {
  let node = document.createElement("div");
  node.classList.add(className);
  return node;
};

const defaultOffset = 12;
const positions = ["top", "right", "bottom"];

class Tooltip {
  constructor(rootNode = null, options = {}) {
    this.type = options.type || "default";
    this.title = options.title;
    this.subtitle = options.subtitle;
    this.shown = false;
    this.tooltip = this.createTooltip(options.tooltipClass);
    this.tooltip.addEventListener("click", event => {
      this.hide();
      event.stopPropagation();
    });

    if (rootNode) {
      this.position(rootNode, options.position);
    }
  }

  position(target, position = "top") {
    let rects = target.getBoundingClientRect();
    let bodyTop = Math.abs(document.body.getBoundingClientRect().top);
    this.positionClass = position;
    this.target = target;
    positions.forEach(className => this.tooltip.classList.remove(className));

    if (position == "top") {
      this.tooltip.style.left = `${rects.left - this.tooltip.clientWidth / 2 + rects.width / 2}px`;
      this.tooltip.style.top = `${rects.top + bodyTop - defaultOffset - this.tooltip.clientHeight}px`;
    }

    if (position == "right") {
      this.tooltip.style.left = `${rects.left + rects.width}px`;
      this.tooltip.style.top = `${rects.top + bodyTop}px`;
    }

    if (position == "bottom") {
      this.tooltip.style.left = `${rects.left - this.tooltip.clientWidth / 2 + rects.width / 2}px`;
      this.tooltip.style.top = `${rects.bottom + bodyTop - defaultOffset}px`;
    }

    this.tooltip.classList.add(this.positionClass);
  }

  updateContent(titleText = this.title, subtitleText = this.subtitle) {
    this.titleNode.textContent = titleText;
    this.subtitleNode.innerHTML = subtitleText;
  }

  createTooltip(tooltipClass = "tooltip") {
    this.tooltipNode = div(tooltipClass);
    this.titleNode = div("tooltip-title");
    this.subtitleNode = div("tooltip-subtitle");

    if (this.type) {
      this.tooltipNode.classList.add(this.type);
    }

    let updateContent = (titleText = this.title, subtitleText = this.subtitle) => {
      this.titleNode.textContent = titleText;
      this.subtitleNode.innerHTML = subtitleText;
    };

    updateContent();
    [this.titleNode, this.subtitleNode].forEach(el => this.tooltipNode.appendChild(el));
    document.body.appendChild(this.tooltipNode);
    return this.tooltipNode;
  }

  hide() {
    this.tooltip.classList.remove("shown");
    this.shown = false;
  }

  show() {
    this.tooltip.classList.add("shown");
    this.shown = true;
  }

}

exports.default = Tooltip;
},{}],"config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  tag: {
    title: 'Это тег',
    subtitle: `Теги - основные строительные блоки
      каждой страницы на сайте. Некоторые из них можно вкладывать в другие (Парные, в одиночные нельзя).
      Например, эта страница содержит пару десятков тегов с разным уровнем
      вложенности. Для каждого из элементов, на который вы наводите, отведен
      отдельный тег`
  },
  opening: {
    title: 'Это открывающий тег',
    subtitle: `Есть два типа тегов. Одни позволяют вкладывать
      в себя другие теги, а другие - нет. Конкретно этот позволяет. `
  },
  'no-closing': {
    title: 'У этого тега нет закрывающей части',
    subtitle: `Сверху находится тег, в который можно положить тот,
      на который вы кликнули. А вот наоборот сделать нельзя.`
  },
  'left-bracket': {
    title: 'Это левая скобка',
    subtitle: `Угловые скобки дают понять браузеру,
      что перед нами тег. Все, что не содержит в начале такой скобки,
      будет восприниматься как <b style="color: rgb(52,52,200);">обычный текст</b>
    `
  },
  'tag-name': {
    title: 'Это название тега',
    subtitle: `Каждый тег имеет свое название. Существует
      список доступный тегов, все их можо выучить, но
      не нужно. Есть основные и они будут представлены дальше
      в ходе изучения курса`
  },
  'tag-property': {
    title: 'Это свойство тега',
    subtitle: `Каждый тег можно наделять свойствами.
      Если вы играли хоть раз в RPG-игры, то вы понимаете,
      о чем речь. Если не играли, то пройдите Скайрим
      или Diablo. Свойств у тега существует много, но опять-таки все сразу
      знать не обязательно. Конкретно это свойство используется в 99% случаев`
  },
  'tag-property-value': {
    title: 'Это значение свойства тега',
    subtitle: `Если у нас есть свойство, то мы должны знать, чему оно равно.
      Здесь как раз-таки и присваивается значение конкретному свойству`
  },
  'propperty-value-initialization': {
    title: 'Это операция присваивания',
    subtitle: `Между свойством и его значением обязательно ставится
      знак равенства, который в данном контексте обозначает не "свойство <b style="color: tomato">равно</b> значению",
      а "свойству <b style="color: rgb(52, 200, 52)">присваивается</b> значение". В этом есть разница, но какая - я вам говорить не буду`
  },
  'right-bracket': {
    title: 'Это правая скобка',
    subtitle: `У тега может быть 1-2 таких скобок. Зависит это от того, одиночный он или парный соответственно.
      Если тег <b style="color: rgb(52, 52, 200)">одиночный</b>, то единственная скобка означает закрытие тега и что можно переходить к следующему.
      Если тег <b style="color: rgb(52, 52, 200)">парный</b>, то первая такая скобка скажет браузеру, что дальше будет содержание тега, а вторая скобка скажет
      то, что сказала единственная скобка одиночного тега`
  },
  content: {
    title: 'Это содержимое тега',
    subtitle: `Парные теги могут содержать <b style="color: rgb(52, 52, 200)">другие теги</b>,
    либо <b style="color: rgb(52, 52, 200)">текст</b>.
      Тут вот например текст, но мы можем заменить его на другой тег`
  },
  closing: {
    title: 'Это закрывающий тег',
    subtitle: `Он есть только у парных тегов. Все парные теги
      нужно закрывать, иначе это приведет к плачевным результатам`
  },
  slash: {
    title: 'Это символ, обозначающий закрытый тег',
    subtitle: `Этот символ дает понять, что тег закрывается. Если его забыть,
      браузер подумает, что это начало нового тега. А это не так: начнут появляться ошибки,
      а ошибки - это плохо`
  },
  space: {
    title: 'Это пробел',
    subtitle: `Пробелы ставятся:
    <ul>
      <li>Между названием тега и его свойством</li>
      <li>Между свойствами тега</li>
      <li>В одиночных тегах после перечисления всех свойств</li>
    </ul>
    Несоблюдение этих правил (или если вы вдруг захотите поставить
      пробел туда, где его не нужно ставить) приведет к <b style="color: tomato;">ошибке</b>.`
  }
};
exports.default = _default;
},{}],"script.js":[function(require,module,exports) {
"use strict";

var _waait = _interopRequireDefault(require("waait"));

var _tooltip = _interopRequireDefault(require("./tooltip"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Селекторы
const $ = selector => document.querySelector(selector);

const $$ = selector => Array.from(document.querySelectorAll(selector)); // Части тэга


const tag = $$(".tag");
const opening = $$(".opening");
const noClosing = $(".no-closing");
const leftBracket = $$(".left-bracket");
const tagName = $$(".tag-name");
const tagProperty = $$(".tag-property");
const tagPropertyValue = $$(".tag-property-value");
const propValueInit = $$(".propperty-value-initialization");
const rightBracket = $$(".right-bracket");
const content = $(".content");
const closing = $(".closing");
const slash = $$(".slash");
const space = $$(".space"); // При наведении показываем краткую информацию

const tooltip = new _tooltip.default(document.body, {
  title: "",
  position: "top"
});

const addTooltip = (tooltip, {
  title,
  subtitle
}, target) => {
  tooltip.show();
  tooltip.updateContent(title, subtitle);
  const hovered = $$(".hovered");
  hovered.forEach(target => {
    target.classList.remove("hovered");
  });

  if (target) {
    tooltip.position(target);
    target.classList.add("hovered");
  }
};

const hideTooltip = target => {
  tooltip.hide();
  target.classList.remove("hovered");
};

const addTooltipOnHover = (target, title) => {
  target.addEventListener("mouseover", e => {
    e.stopPropagation();
    addTooltip(tooltip, {
      title,
      subtitle: ""
    }, e.target);
  });
};

const elements = [...tag, ...opening, ...leftBracket, ...tagName, ...tagProperty, ...tagPropertyValue, ...rightBracket, ...slash, ...propValueInit, ...space, content, noClosing, closing];
elements.forEach(element => {
  addTooltipOnHover(element, _config.default[element.classList[0]].title);
});
elements.forEach(item => {
  item.addEventListener("mouseleave", () => {
    hideTooltip(item);
  });
}); // При клике показываем подробную информацию

const message = new _tooltip.default(document.body, {
  title: "",
  tooltipClass: "message",
  position: "fixed"
});
elements.forEach(element => {
  element.addEventListener("click", async e => {
    e.stopPropagation();
    const {
      title,
      subtitle
    } = _config.default[element.classList[0]];
    addTooltip(message, {
      title,
      subtitle
    });
  });
});
},{"waait":"node_modules/waait/index.js","./tooltip":"tooltip.js","./config":"config.js"}],"../../../../../usr/local/share/.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "36867" + '/');

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
      }); // Enable HMR for CSS by default.

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
  overlay.id = OVERLAY_ID; // html encode message and stack trace

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
},{}]},{},["../../../../../usr/local/share/.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map