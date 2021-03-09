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
})({"redditapi.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  search: function search(searchTerm, sortBy, searchLimit) {
    return fetch("http://www.reddit.com/search.json?q=".concat(searchTerm, "&sort=").concat(sortBy, "&limit=").concat(searchLimit)).then(function (res) {
      return res.json();
    }).then(function (data) {
      return data.data.children.map(function (data) {
        return data.data;
      });
    }).catch(function (err) {
      return console.log(err);
    });
  }
};
exports.default = _default;
},{}],"node_modules/semver/internal/constants.js":[function(require,module,exports) {
// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
var SEMVER_SPEC_VERSION = '2.0.0';
var MAX_LENGTH = 256;
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
/* istanbul ignore next */
9007199254740991; // Max safe segment length for coercion.

var MAX_SAFE_COMPONENT_LENGTH = 16;
module.exports = {
  SEMVER_SPEC_VERSION: SEMVER_SPEC_VERSION,
  MAX_LENGTH: MAX_LENGTH,
  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
  MAX_SAFE_COMPONENT_LENGTH: MAX_SAFE_COMPONENT_LENGTH
};
},{}],"C:/Users/User/AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"node_modules/semver/internal/debug.js":[function(require,module,exports) {
var process = require("process");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var debug = (typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object' && process.env && undefined && /\bsemver\b/i.test(undefined) ? function () {
  var _console;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (_console = console).error.apply(_console, ['SEMVER'].concat(args));
} : function () {};
module.exports = debug;
},{"process":"C:/Users/User/AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/process/browser.js"}],"node_modules/semver/internal/re.js":[function(require,module,exports) {
var _require = require('./constants'),
    MAX_SAFE_COMPONENT_LENGTH = _require.MAX_SAFE_COMPONENT_LENGTH;

var debug = require('./debug');

exports = module.exports = {}; // The actual regexps go on exports.re

var re = exports.re = [];
var src = exports.src = [];
var t = exports.t = {};
var R = 0;

var createToken = function createToken(name, value, isGlobal) {
  var index = R++;
  debug(index, value);
  t[name] = index;
  src[index] = value;
  re[index] = new RegExp(value, isGlobal ? 'g' : undefined);
}; // The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.
// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.


createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
createToken('NUMERICIDENTIFIERLOOSE', '[0-9]+'); // ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

createToken('NONNUMERICIDENTIFIER', '\\d*[a-zA-Z-][a-zA-Z0-9-]*'); // ## Main Version
// Three dot-separated numeric identifiers.

createToken('MAINVERSION', "(".concat(src[t.NUMERICIDENTIFIER], ")\\.") + "(".concat(src[t.NUMERICIDENTIFIER], ")\\.") + "(".concat(src[t.NUMERICIDENTIFIER], ")"));
createToken('MAINVERSIONLOOSE', "(".concat(src[t.NUMERICIDENTIFIERLOOSE], ")\\.") + "(".concat(src[t.NUMERICIDENTIFIERLOOSE], ")\\.") + "(".concat(src[t.NUMERICIDENTIFIERLOOSE], ")")); // ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

createToken('PRERELEASEIDENTIFIER', "(?:".concat(src[t.NUMERICIDENTIFIER], "|").concat(src[t.NONNUMERICIDENTIFIER], ")"));
createToken('PRERELEASEIDENTIFIERLOOSE', "(?:".concat(src[t.NUMERICIDENTIFIERLOOSE], "|").concat(src[t.NONNUMERICIDENTIFIER], ")")); // ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

createToken('PRERELEASE', "(?:-(".concat(src[t.PRERELEASEIDENTIFIER], "(?:\\.").concat(src[t.PRERELEASEIDENTIFIER], ")*))"));
createToken('PRERELEASELOOSE', "(?:-?(".concat(src[t.PRERELEASEIDENTIFIERLOOSE], "(?:\\.").concat(src[t.PRERELEASEIDENTIFIERLOOSE], ")*))")); // ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

createToken('BUILDIDENTIFIER', '[0-9A-Za-z-]+'); // ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

createToken('BUILD', "(?:\\+(".concat(src[t.BUILDIDENTIFIER], "(?:\\.").concat(src[t.BUILDIDENTIFIER], ")*))")); // ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.
// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

createToken('FULLPLAIN', "v?".concat(src[t.MAINVERSION]).concat(src[t.PRERELEASE], "?").concat(src[t.BUILD], "?"));
createToken('FULL', "^".concat(src[t.FULLPLAIN], "$")); // like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.

createToken('LOOSEPLAIN', "[v=\\s]*".concat(src[t.MAINVERSIONLOOSE]).concat(src[t.PRERELEASELOOSE], "?").concat(src[t.BUILD], "?"));
createToken('LOOSE', "^".concat(src[t.LOOSEPLAIN], "$"));
createToken('GTLT', '((?:<|>)?=?)'); // Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.

createToken('XRANGEIDENTIFIERLOOSE', "".concat(src[t.NUMERICIDENTIFIERLOOSE], "|x|X|\\*"));
createToken('XRANGEIDENTIFIER', "".concat(src[t.NUMERICIDENTIFIER], "|x|X|\\*"));
createToken('XRANGEPLAIN', "[v=\\s]*(".concat(src[t.XRANGEIDENTIFIER], ")") + "(?:\\.(".concat(src[t.XRANGEIDENTIFIER], ")") + "(?:\\.(".concat(src[t.XRANGEIDENTIFIER], ")") + "(?:".concat(src[t.PRERELEASE], ")?").concat(src[t.BUILD], "?") + ")?)?");
createToken('XRANGEPLAINLOOSE', "[v=\\s]*(".concat(src[t.XRANGEIDENTIFIERLOOSE], ")") + "(?:\\.(".concat(src[t.XRANGEIDENTIFIERLOOSE], ")") + "(?:\\.(".concat(src[t.XRANGEIDENTIFIERLOOSE], ")") + "(?:".concat(src[t.PRERELEASELOOSE], ")?").concat(src[t.BUILD], "?") + ")?)?");
createToken('XRANGE', "^".concat(src[t.GTLT], "\\s*").concat(src[t.XRANGEPLAIN], "$"));
createToken('XRANGELOOSE', "^".concat(src[t.GTLT], "\\s*").concat(src[t.XRANGEPLAINLOOSE], "$")); // Coercion.
// Extract anything that could conceivably be a part of a valid semver

createToken('COERCE', "".concat('(^|[^\\d])' + '(\\d{1,').concat(MAX_SAFE_COMPONENT_LENGTH, "})") + "(?:\\.(\\d{1,".concat(MAX_SAFE_COMPONENT_LENGTH, "}))?") + "(?:\\.(\\d{1,".concat(MAX_SAFE_COMPONENT_LENGTH, "}))?") + "(?:$|[^\\d])");
createToken('COERCERTL', src[t.COERCE], true); // Tilde ranges.
// Meaning is "reasonably at or greater than"

createToken('LONETILDE', '(?:~>?)');
createToken('TILDETRIM', "(\\s*)".concat(src[t.LONETILDE], "\\s+"), true);
exports.tildeTrimReplace = '$1~';
createToken('TILDE', "^".concat(src[t.LONETILDE]).concat(src[t.XRANGEPLAIN], "$"));
createToken('TILDELOOSE', "^".concat(src[t.LONETILDE]).concat(src[t.XRANGEPLAINLOOSE], "$")); // Caret ranges.
// Meaning is "at least and backwards compatible with"

createToken('LONECARET', '(?:\\^)');
createToken('CARETTRIM', "(\\s*)".concat(src[t.LONECARET], "\\s+"), true);
exports.caretTrimReplace = '$1^';
createToken('CARET', "^".concat(src[t.LONECARET]).concat(src[t.XRANGEPLAIN], "$"));
createToken('CARETLOOSE', "^".concat(src[t.LONECARET]).concat(src[t.XRANGEPLAINLOOSE], "$")); // A simple gt/lt/eq thing, or just "" to indicate "any version"

createToken('COMPARATORLOOSE', "^".concat(src[t.GTLT], "\\s*(").concat(src[t.LOOSEPLAIN], ")$|^$"));
createToken('COMPARATOR', "^".concat(src[t.GTLT], "\\s*(").concat(src[t.FULLPLAIN], ")$|^$")); // An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`

createToken('COMPARATORTRIM', "(\\s*)".concat(src[t.GTLT], "\\s*(").concat(src[t.LOOSEPLAIN], "|").concat(src[t.XRANGEPLAIN], ")"), true);
exports.comparatorTrimReplace = '$1$2$3'; // Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.

createToken('HYPHENRANGE', "^\\s*(".concat(src[t.XRANGEPLAIN], ")") + "\\s+-\\s+" + "(".concat(src[t.XRANGEPLAIN], ")") + "\\s*$");
createToken('HYPHENRANGELOOSE', "^\\s*(".concat(src[t.XRANGEPLAINLOOSE], ")") + "\\s+-\\s+" + "(".concat(src[t.XRANGEPLAINLOOSE], ")") + "\\s*$"); // Star ranges basically just allow anything at all.

createToken('STAR', '(<|>)?=?\\s*\\*'); // >=0.0.0 is like a star

createToken('GTE0', '^\\s*>=\\s*0\.0\.0\\s*$');
createToken('GTE0PRE', '^\\s*>=\\s*0\.0\.0-0\\s*$');
},{"./constants":"node_modules/semver/internal/constants.js","./debug":"node_modules/semver/internal/debug.js"}],"node_modules/semver/internal/parse-options.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// parse out just the options we care about so we always get a consistent
// obj with keys in a consistent order.
var opts = ['includePrerelease', 'loose', 'rtl'];

var parseOptions = function parseOptions(options) {
  return !options ? {} : _typeof(options) !== 'object' ? {
    loose: true
  } : opts.filter(function (k) {
    return options[k];
  }).reduce(function (options, k) {
    options[k] = true;
    return options;
  }, {});
};

module.exports = parseOptions;
},{}],"node_modules/semver/internal/identifiers.js":[function(require,module,exports) {
var numeric = /^[0-9]+$/;

var compareIdentifiers = function compareIdentifiers(a, b) {
  var anum = numeric.test(a);
  var bnum = numeric.test(b);

  if (anum && bnum) {
    a = +a;
    b = +b;
  }

  return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
};

var rcompareIdentifiers = function rcompareIdentifiers(a, b) {
  return compareIdentifiers(b, a);
};

module.exports = {
  compareIdentifiers: compareIdentifiers,
  rcompareIdentifiers: rcompareIdentifiers
};
},{}],"node_modules/semver/classes/semver.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var debug = require('../internal/debug');

var _require = require('../internal/constants'),
    MAX_LENGTH = _require.MAX_LENGTH,
    MAX_SAFE_INTEGER = _require.MAX_SAFE_INTEGER;

var _require2 = require('../internal/re'),
    re = _require2.re,
    t = _require2.t;

var parseOptions = require('../internal/parse-options');

var _require3 = require('../internal/identifiers'),
    compareIdentifiers = _require3.compareIdentifiers;

var SemVer =
/*#__PURE__*/
function () {
  function SemVer(version, options) {
    _classCallCheck(this, SemVer);

    options = parseOptions(options);

    if (version instanceof SemVer) {
      if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
        return version;
      } else {
        version = version.version;
      }
    } else if (typeof version !== 'string') {
      throw new TypeError("Invalid Version: ".concat(version));
    }

    if (version.length > MAX_LENGTH) {
      throw new TypeError("version is longer than ".concat(MAX_LENGTH, " characters"));
    }

    debug('SemVer', version, options);
    this.options = options;
    this.loose = !!options.loose; // this isn't actually relevant for versions, but keep it so that we
    // don't run into trouble passing this.options around.

    this.includePrerelease = !!options.includePrerelease;
    var m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);

    if (!m) {
      throw new TypeError("Invalid Version: ".concat(version));
    }

    this.raw = version; // these are actually numbers

    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];

    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError('Invalid major version');
    }

    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError('Invalid minor version');
    }

    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError('Invalid patch version');
    } // numberify any prerelease numeric ids


    if (!m[4]) {
      this.prerelease = [];
    } else {
      this.prerelease = m[4].split('.').map(function (id) {
        if (/^[0-9]+$/.test(id)) {
          var num = +id;

          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num;
          }
        }

        return id;
      });
    }

    this.build = m[5] ? m[5].split('.') : [];
    this.format();
  }

  _createClass(SemVer, [{
    key: "format",
    value: function format() {
      this.version = "".concat(this.major, ".").concat(this.minor, ".").concat(this.patch);

      if (this.prerelease.length) {
        this.version += "-".concat(this.prerelease.join('.'));
      }

      return this.version;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.version;
    }
  }, {
    key: "compare",
    value: function compare(other) {
      debug('SemVer.compare', this.version, this.options, other);

      if (!(other instanceof SemVer)) {
        if (typeof other === 'string' && other === this.version) {
          return 0;
        }

        other = new SemVer(other, this.options);
      }

      if (other.version === this.version) {
        return 0;
      }

      return this.compareMain(other) || this.comparePre(other);
    }
  }, {
    key: "compareMain",
    value: function compareMain(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }

      return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
    }
  }, {
    key: "comparePre",
    value: function comparePre(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      } // NOT having a prerelease is > having one


      if (this.prerelease.length && !other.prerelease.length) {
        return -1;
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1;
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0;
      }

      var i = 0;

      do {
        var a = this.prerelease[i];
        var b = other.prerelease[i];
        debug('prerelease compare', i, a, b);

        if (a === undefined && b === undefined) {
          return 0;
        } else if (b === undefined) {
          return 1;
        } else if (a === undefined) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i);
    }
  }, {
    key: "compareBuild",
    value: function compareBuild(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }

      var i = 0;

      do {
        var a = this.build[i];
        var b = other.build[i];
        debug('prerelease compare', i, a, b);

        if (a === undefined && b === undefined) {
          return 0;
        } else if (b === undefined) {
          return 1;
        } else if (a === undefined) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i);
    } // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.

  }, {
    key: "inc",
    value: function inc(release, identifier) {
      switch (release) {
        case 'premajor':
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc('pre', identifier);
          break;

        case 'preminor':
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc('pre', identifier);
          break;

        case 'prepatch':
          // If this is already a prerelease, it will bump to the next version
          // drop any prereleases that might already exist, since they are not
          // relevant at this point.
          this.prerelease.length = 0;
          this.inc('patch', identifier);
          this.inc('pre', identifier);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.

        case 'prerelease':
          if (this.prerelease.length === 0) {
            this.inc('patch', identifier);
          }

          this.inc('pre', identifier);
          break;

        case 'major':
          // If this is a pre-major version, bump up to the same major version.
          // Otherwise increment major.
          // 1.0.0-5 bumps to 1.0.0
          // 1.1.0 bumps to 2.0.0
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
            this.major++;
          }

          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;

        case 'minor':
          // If this is a pre-minor version, bump up to the same minor version.
          // Otherwise increment minor.
          // 1.2.0-5 bumps to 1.2.0
          // 1.2.1 bumps to 1.3.0
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++;
          }

          this.patch = 0;
          this.prerelease = [];
          break;

        case 'patch':
          // If this is not a pre-release version, it will increment the patch.
          // If it is a pre-release it will bump up to the same patch version.
          // 1.2.0-5 patches to 1.2.0
          // 1.2.0 patches to 1.2.1
          if (this.prerelease.length === 0) {
            this.patch++;
          }

          this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.

        case 'pre':
          if (this.prerelease.length === 0) {
            this.prerelease = [0];
          } else {
            var i = this.prerelease.length;

            while (--i >= 0) {
              if (typeof this.prerelease[i] === 'number') {
                this.prerelease[i]++;
                i = -2;
              }
            }

            if (i === -1) {
              // didn't increment anything
              this.prerelease.push(0);
            }
          }

          if (identifier) {
            // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
            // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
            if (this.prerelease[0] === identifier) {
              if (isNaN(this.prerelease[1])) {
                this.prerelease = [identifier, 0];
              }
            } else {
              this.prerelease = [identifier, 0];
            }
          }

          break;

        default:
          throw new Error("invalid increment argument: ".concat(release));
      }

      this.format();
      this.raw = this.version;
      return this;
    }
  }]);

  return SemVer;
}();

module.exports = SemVer;
},{"../internal/debug":"node_modules/semver/internal/debug.js","../internal/constants":"node_modules/semver/internal/constants.js","../internal/re":"node_modules/semver/internal/re.js","../internal/parse-options":"node_modules/semver/internal/parse-options.js","../internal/identifiers":"node_modules/semver/internal/identifiers.js"}],"node_modules/semver/functions/parse.js":[function(require,module,exports) {
var _require = require('../internal/constants'),
    MAX_LENGTH = _require.MAX_LENGTH;

var _require2 = require('../internal/re'),
    re = _require2.re,
    t = _require2.t;

var SemVer = require('../classes/semver');

var parseOptions = require('../internal/parse-options');

var parse = function parse(version, options) {
  options = parseOptions(options);

  if (version instanceof SemVer) {
    return version;
  }

  if (typeof version !== 'string') {
    return null;
  }

  if (version.length > MAX_LENGTH) {
    return null;
  }

  var r = options.loose ? re[t.LOOSE] : re[t.FULL];

  if (!r.test(version)) {
    return null;
  }

  try {
    return new SemVer(version, options);
  } catch (er) {
    return null;
  }
};

module.exports = parse;
},{"../internal/constants":"node_modules/semver/internal/constants.js","../internal/re":"node_modules/semver/internal/re.js","../classes/semver":"node_modules/semver/classes/semver.js","../internal/parse-options":"node_modules/semver/internal/parse-options.js"}],"node_modules/semver/functions/valid.js":[function(require,module,exports) {
var parse = require('./parse');

var valid = function valid(version, options) {
  var v = parse(version, options);
  return v ? v.version : null;
};

module.exports = valid;
},{"./parse":"node_modules/semver/functions/parse.js"}],"node_modules/semver/functions/clean.js":[function(require,module,exports) {
var parse = require('./parse');

var clean = function clean(version, options) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), options);
  return s ? s.version : null;
};

module.exports = clean;
},{"./parse":"node_modules/semver/functions/parse.js"}],"node_modules/semver/functions/inc.js":[function(require,module,exports) {
var SemVer = require('../classes/semver');

var inc = function inc(version, release, options, identifier) {
  if (typeof options === 'string') {
    identifier = options;
    options = undefined;
  }

  try {
    return new SemVer(version, options).inc(release, identifier).version;
  } catch (er) {
    return null;
  }
};

module.exports = inc;
},{"../classes/semver":"node_modules/semver/classes/semver.js"}],"node_modules/semver/functions/compare.js":[function(require,module,exports) {
var SemVer = require('../classes/semver');

var compare = function compare(a, b, loose) {
  return new SemVer(a, loose).compare(new SemVer(b, loose));
};

module.exports = compare;
},{"../classes/semver":"node_modules/semver/classes/semver.js"}],"node_modules/semver/functions/eq.js":[function(require,module,exports) {
var compare = require('./compare');

var eq = function eq(a, b, loose) {
  return compare(a, b, loose) === 0;
};

module.exports = eq;
},{"./compare":"node_modules/semver/functions/compare.js"}],"node_modules/semver/functions/diff.js":[function(require,module,exports) {
var parse = require('./parse');

var eq = require('./eq');

var diff = function diff(version1, version2) {
  if (eq(version1, version2)) {
    return null;
  } else {
    var v1 = parse(version1);
    var v2 = parse(version2);
    var hasPre = v1.prerelease.length || v2.prerelease.length;
    var prefix = hasPre ? 'pre' : '';
    var defaultResult = hasPre ? 'prerelease' : '';

    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return prefix + key;
        }
      }
    }

    return defaultResult; // may be undefined
  }
};

module.exports = diff;
},{"./parse":"node_modules/semver/functions/parse.js","./eq":"node_modules/semver/functions/eq.js"}],"node_modules/semver/functions/major.js":[function(require,module,exports) {
var SemVer = require('../classes/semver');

var major = function major(a, loose) {
  return new SemVer(a, loose).major;
};

module.exports = major;
},{"../classes/semver":"node_modules/semver/classes/semver.js"}],"node_modules/semver/functions/minor.js":[function(require,module,exports) {
var SemVer = require('../classes/semver');

var minor = function minor(a, loose) {
  return new SemVer(a, loose).minor;
};

module.exports = minor;
},{"../classes/semver":"node_modules/semver/classes/semver.js"}],"node_modules/semver/functions/patch.js":[function(require,module,exports) {
var SemVer = require('../classes/semver');

var patch = function patch(a, loose) {
  return new SemVer(a, loose).patch;
};

module.exports = patch;
},{"../classes/semver":"node_modules/semver/classes/semver.js"}],"node_modules/semver/functions/prerelease.js":[function(require,module,exports) {
var parse = require('./parse');

var prerelease = function prerelease(version, options) {
  var parsed = parse(version, options);
  return parsed && parsed.prerelease.length ? parsed.prerelease : null;
};

module.exports = prerelease;
},{"./parse":"node_modules/semver/functions/parse.js"}],"node_modules/semver/functions/rcompare.js":[function(require,module,exports) {
var compare = require('./compare');

var rcompare = function rcompare(a, b, loose) {
  return compare(b, a, loose);
};

module.exports = rcompare;
},{"./compare":"node_modules/semver/functions/compare.js"}],"node_modules/semver/functions/compare-loose.js":[function(require,module,exports) {
var compare = require('./compare');

var compareLoose = function compareLoose(a, b) {
  return compare(a, b, true);
};

module.exports = compareLoose;
},{"./compare":"node_modules/semver/functions/compare.js"}],"node_modules/semver/functions/compare-build.js":[function(require,module,exports) {
var SemVer = require('../classes/semver');

var compareBuild = function compareBuild(a, b, loose) {
  var versionA = new SemVer(a, loose);
  var versionB = new SemVer(b, loose);
  return versionA.compare(versionB) || versionA.compareBuild(versionB);
};

module.exports = compareBuild;
},{"../classes/semver":"node_modules/semver/classes/semver.js"}],"node_modules/semver/functions/sort.js":[function(require,module,exports) {
var compareBuild = require('./compare-build');

var sort = function sort(list, loose) {
  return list.sort(function (a, b) {
    return compareBuild(a, b, loose);
  });
};

module.exports = sort;
},{"./compare-build":"node_modules/semver/functions/compare-build.js"}],"node_modules/semver/functions/rsort.js":[function(require,module,exports) {
var compareBuild = require('./compare-build');

var rsort = function rsort(list, loose) {
  return list.sort(function (a, b) {
    return compareBuild(b, a, loose);
  });
};

module.exports = rsort;
},{"./compare-build":"node_modules/semver/functions/compare-build.js"}],"node_modules/semver/functions/gt.js":[function(require,module,exports) {
var compare = require('./compare');

var gt = function gt(a, b, loose) {
  return compare(a, b, loose) > 0;
};

module.exports = gt;
},{"./compare":"node_modules/semver/functions/compare.js"}],"node_modules/semver/functions/lt.js":[function(require,module,exports) {
var compare = require('./compare');

var lt = function lt(a, b, loose) {
  return compare(a, b, loose) < 0;
};

module.exports = lt;
},{"./compare":"node_modules/semver/functions/compare.js"}],"node_modules/semver/functions/neq.js":[function(require,module,exports) {
var compare = require('./compare');

var neq = function neq(a, b, loose) {
  return compare(a, b, loose) !== 0;
};

module.exports = neq;
},{"./compare":"node_modules/semver/functions/compare.js"}],"node_modules/semver/functions/gte.js":[function(require,module,exports) {
var compare = require('./compare');

var gte = function gte(a, b, loose) {
  return compare(a, b, loose) >= 0;
};

module.exports = gte;
},{"./compare":"node_modules/semver/functions/compare.js"}],"node_modules/semver/functions/lte.js":[function(require,module,exports) {
var compare = require('./compare');

var lte = function lte(a, b, loose) {
  return compare(a, b, loose) <= 0;
};

module.exports = lte;
},{"./compare":"node_modules/semver/functions/compare.js"}],"node_modules/semver/functions/cmp.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var eq = require('./eq');

var neq = require('./neq');

var gt = require('./gt');

var gte = require('./gte');

var lt = require('./lt');

var lte = require('./lte');

var cmp = function cmp(a, op, b, loose) {
  switch (op) {
    case '===':
      if (_typeof(a) === 'object') a = a.version;
      if (_typeof(b) === 'object') b = b.version;
      return a === b;

    case '!==':
      if (_typeof(a) === 'object') a = a.version;
      if (_typeof(b) === 'object') b = b.version;
      return a !== b;

    case '':
    case '=':
    case '==':
      return eq(a, b, loose);

    case '!=':
      return neq(a, b, loose);

    case '>':
      return gt(a, b, loose);

    case '>=':
      return gte(a, b, loose);

    case '<':
      return lt(a, b, loose);

    case '<=':
      return lte(a, b, loose);

    default:
      throw new TypeError("Invalid operator: ".concat(op));
  }
};

module.exports = cmp;
},{"./eq":"node_modules/semver/functions/eq.js","./neq":"node_modules/semver/functions/neq.js","./gt":"node_modules/semver/functions/gt.js","./gte":"node_modules/semver/functions/gte.js","./lt":"node_modules/semver/functions/lt.js","./lte":"node_modules/semver/functions/lte.js"}],"node_modules/semver/functions/coerce.js":[function(require,module,exports) {
var SemVer = require('../classes/semver');

var parse = require('./parse');

var _require = require('../internal/re'),
    re = _require.re,
    t = _require.t;

var coerce = function coerce(version, options) {
  if (version instanceof SemVer) {
    return version;
  }

  if (typeof version === 'number') {
    version = String(version);
  }

  if (typeof version !== 'string') {
    return null;
  }

  options = options || {};
  var match = null;

  if (!options.rtl) {
    match = version.match(re[t.COERCE]);
  } else {
    // Find the right-most coercible string that does not share
    // a terminus with a more left-ward coercible string.
    // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
    //
    // Walk through the string checking with a /g regexp
    // Manually set the index so as to pick up overlapping matches.
    // Stop when we get a match that ends at the string end, since no
    // coercible string can be more right-ward without the same terminus.
    var next;

    while ((next = re[t.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length)) {
      if (!match || next.index + next[0].length !== match.index + match[0].length) {
        match = next;
      }

      re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
    } // leave it in a clean state


    re[t.COERCERTL].lastIndex = -1;
  }

  if (match === null) return null;
  return parse("".concat(match[2], ".").concat(match[3] || '0', ".").concat(match[4] || '0'), options);
};

module.exports = coerce;
},{"../classes/semver":"node_modules/semver/classes/semver.js","./parse":"node_modules/semver/functions/parse.js","../internal/re":"node_modules/semver/internal/re.js"}],"node_modules/yallist/iterator.js":[function(require,module,exports) {
'use strict'
module.exports = function (Yallist) {
  Yallist.prototype[Symbol.iterator] = function* () {
    for (let walker = this.head; walker; walker = walker.next) {
      yield walker.value
    }
  }
}

},{}],"node_modules/yallist/yallist.js":[function(require,module,exports) {
'use strict'
module.exports = Yallist

Yallist.Node = Node
Yallist.create = Yallist

function Yallist (list) {
  var self = this
  if (!(self instanceof Yallist)) {
    self = new Yallist()
  }

  self.tail = null
  self.head = null
  self.length = 0

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item)
    })
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i])
    }
  }

  return self
}

Yallist.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list')
  }

  var next = node.next
  var prev = node.prev

  if (next) {
    next.prev = prev
  }

  if (prev) {
    prev.next = next
  }

  if (node === this.head) {
    this.head = next
  }
  if (node === this.tail) {
    this.tail = prev
  }

  node.list.length--
  node.next = null
  node.prev = null
  node.list = null

  return next
}

Yallist.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var head = this.head
  node.list = this
  node.next = head
  if (head) {
    head.prev = node
  }

  this.head = node
  if (!this.tail) {
    this.tail = node
  }
  this.length++
}

Yallist.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var tail = this.tail
  node.list = this
  node.prev = tail
  if (tail) {
    tail.next = node
  }

  this.tail = node
  if (!this.head) {
    this.head = node
  }
  this.length++
}

Yallist.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.pop = function () {
  if (!this.tail) {
    return undefined
  }

  var res = this.tail.value
  this.tail = this.tail.prev
  if (this.tail) {
    this.tail.next = null
  } else {
    this.head = null
  }
  this.length--
  return res
}

Yallist.prototype.shift = function () {
  if (!this.head) {
    return undefined
  }

  var res = this.head.value
  this.head = this.head.next
  if (this.head) {
    this.head.prev = null
  } else {
    this.tail = null
  }
  this.length--
  return res
}

Yallist.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.next
  }
}

Yallist.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.prev
  }
}

Yallist.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.map = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.next
  }
  return res
}

Yallist.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.prev
  }
  return res
}

Yallist.prototype.reduce = function (fn, initial) {
  var acc
  var walker = this.head
  if (arguments.length > 1) {
    acc = initial
  } else if (this.head) {
    walker = this.head.next
    acc = this.head.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i)
    walker = walker.next
  }

  return acc
}

Yallist.prototype.reduceReverse = function (fn, initial) {
  var acc
  var walker = this.tail
  if (arguments.length > 1) {
    acc = initial
  } else if (this.tail) {
    walker = this.tail.prev
    acc = this.tail.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i)
    walker = walker.prev
  }

  return acc
}

Yallist.prototype.toArray = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.next
  }
  return arr
}

Yallist.prototype.toArrayReverse = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.prev
  }
  return arr
}

Yallist.prototype.slice = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.sliceReverse = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.splice = function (start, deleteCount, ...nodes) {
  if (start > this.length) {
    start = this.length - 1
  }
  if (start < 0) {
    start = this.length + start;
  }

  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next
  }

  var ret = []
  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value)
    walker = this.removeNode(walker)
  }
  if (walker === null) {
    walker = this.tail
  }

  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev
  }

  for (var i = 0; i < nodes.length; i++) {
    walker = insert(this, walker, nodes[i])
  }
  return ret;
}

Yallist.prototype.reverse = function () {
  var head = this.head
  var tail = this.tail
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev
    walker.prev = walker.next
    walker.next = p
  }
  this.head = tail
  this.tail = head
  return this
}

function insert (self, node, value) {
  var inserted = node === self.head ?
    new Node(value, null, node, self) :
    new Node(value, node, node.next, self)

  if (inserted.next === null) {
    self.tail = inserted
  }
  if (inserted.prev === null) {
    self.head = inserted
  }

  self.length++

  return inserted
}

function push (self, item) {
  self.tail = new Node(item, self.tail, null, self)
  if (!self.head) {
    self.head = self.tail
  }
  self.length++
}

function unshift (self, item) {
  self.head = new Node(item, null, self.head, self)
  if (!self.tail) {
    self.tail = self.head
  }
  self.length++
}

function Node (value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list)
  }

  this.list = list
  this.value = value

  if (prev) {
    prev.next = this
    this.prev = prev
  } else {
    this.prev = null
  }

  if (next) {
    next.prev = this
    this.next = next
  } else {
    this.next = null
  }
}

try {
  // add if support for Symbol.iterator is present
  require('./iterator.js')(Yallist)
} catch (er) {}

},{"./iterator.js":"node_modules/yallist/iterator.js"}],"node_modules/lru-cache/index.js":[function(require,module,exports) {
'use strict'; // A linked list to keep track of recently-used-ness

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Yallist = require('yallist');

var MAX = Symbol('max');
var LENGTH = Symbol('length');
var LENGTH_CALCULATOR = Symbol('lengthCalculator');
var ALLOW_STALE = Symbol('allowStale');
var MAX_AGE = Symbol('maxAge');
var DISPOSE = Symbol('dispose');
var NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet');
var LRU_LIST = Symbol('lruList');
var CACHE = Symbol('cache');
var UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet');

var naiveLength = function naiveLength() {
  return 1;
}; // lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.


var LRUCache =
/*#__PURE__*/
function () {
  function LRUCache(options) {
    _classCallCheck(this, LRUCache);

    if (typeof options === 'number') options = {
      max: options
    };
    if (!options) options = {};
    if (options.max && (typeof options.max !== 'number' || options.max < 0)) throw new TypeError('max must be a non-negative number'); // Kind of weird to have a default max of Infinity, but oh well.

    var max = this[MAX] = options.max || Infinity;
    var lc = options.length || naiveLength;
    this[LENGTH_CALCULATOR] = typeof lc !== 'function' ? naiveLength : lc;
    this[ALLOW_STALE] = options.stale || false;
    if (options.maxAge && typeof options.maxAge !== 'number') throw new TypeError('maxAge must be a number');
    this[MAX_AGE] = options.maxAge || 0;
    this[DISPOSE] = options.dispose;
    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
    this.reset();
  } // resize the cache when the max changes.


  _createClass(LRUCache, [{
    key: "max",
    get: function get() {
      return this[MAX];
    },
    set: function set(mL) {
      if (typeof mL !== 'number' || mL < 0) throw new TypeError('max must be a non-negative number');
      this[MAX] = mL || Infinity;
      trim(this);
    }
  }, {
    key: "allowStale",
    get: function get() {
      return this[ALLOW_STALE];
    },
    set: function set(allowStale) {
      this[ALLOW_STALE] = !!allowStale;
    }
  }, {
    key: "maxAge",
    get: function get() {
      return this[MAX_AGE];
    } // resize the cache when the lengthCalculator changes.
    ,
    set: function set(mA) {
      if (typeof mA !== 'number') throw new TypeError('maxAge must be a non-negative number');
      this[MAX_AGE] = mA;
      trim(this);
    }
  }, {
    key: "lengthCalculator",
    get: function get() {
      return this[LENGTH_CALCULATOR];
    },
    set: function set(lC) {
      var _this = this;

      if (typeof lC !== 'function') lC = naiveLength;

      if (lC !== this[LENGTH_CALCULATOR]) {
        this[LENGTH_CALCULATOR] = lC;
        this[LENGTH] = 0;
        this[LRU_LIST].forEach(function (hit) {
          hit.length = _this[LENGTH_CALCULATOR](hit.value, hit.key);
          _this[LENGTH] += hit.length;
        });
      }

      trim(this);
    }
  }, {
    key: "length",
    get: function get() {
      return this[LENGTH];
    }
  }, {
    key: "itemCount",
    get: function get() {
      return this[LRU_LIST].length;
    }
  }, {
    key: "rforEach",
    value: function rforEach(fn, thisp) {
      thisp = thisp || this;

      for (var walker = this[LRU_LIST].tail; walker !== null;) {
        var prev = walker.prev;
        forEachStep(this, fn, walker, thisp);
        walker = prev;
      }
    }
  }, {
    key: "forEach",
    value: function forEach(fn, thisp) {
      thisp = thisp || this;

      for (var walker = this[LRU_LIST].head; walker !== null;) {
        var next = walker.next;
        forEachStep(this, fn, walker, thisp);
        walker = next;
      }
    }
  }, {
    key: "keys",
    value: function keys() {
      return this[LRU_LIST].toArray().map(function (k) {
        return k.key;
      });
    }
  }, {
    key: "values",
    value: function values() {
      return this[LRU_LIST].toArray().map(function (k) {
        return k.value;
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this2 = this;

      if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
        this[LRU_LIST].forEach(function (hit) {
          return _this2[DISPOSE](hit.key, hit.value);
        });
      }

      this[CACHE] = new Map(); // hash of items by key

      this[LRU_LIST] = new Yallist(); // list of items in order of use recency

      this[LENGTH] = 0; // length of items in the list
    }
  }, {
    key: "dump",
    value: function dump() {
      var _this3 = this;

      return this[LRU_LIST].map(function (hit) {
        return isStale(_this3, hit) ? false : {
          k: hit.key,
          v: hit.value,
          e: hit.now + (hit.maxAge || 0)
        };
      }).toArray().filter(function (h) {
        return h;
      });
    }
  }, {
    key: "dumpLru",
    value: function dumpLru() {
      return this[LRU_LIST];
    }
  }, {
    key: "set",
    value: function set(key, value, maxAge) {
      maxAge = maxAge || this[MAX_AGE];
      if (maxAge && typeof maxAge !== 'number') throw new TypeError('maxAge must be a number');
      var now = maxAge ? Date.now() : 0;
      var len = this[LENGTH_CALCULATOR](value, key);

      if (this[CACHE].has(key)) {
        if (len > this[MAX]) {
          _del(this, this[CACHE].get(key));

          return false;
        }

        var node = this[CACHE].get(key);
        var item = node.value; // dispose of the old one before overwriting
        // split out into 2 ifs for better coverage tracking

        if (this[DISPOSE]) {
          if (!this[NO_DISPOSE_ON_SET]) this[DISPOSE](key, item.value);
        }

        item.now = now;
        item.maxAge = maxAge;
        item.value = value;
        this[LENGTH] += len - item.length;
        item.length = len;
        this.get(key);
        trim(this);
        return true;
      }

      var hit = new Entry(key, value, len, now, maxAge); // oversized objects fall out of cache automatically.

      if (hit.length > this[MAX]) {
        if (this[DISPOSE]) this[DISPOSE](key, value);
        return false;
      }

      this[LENGTH] += hit.length;
      this[LRU_LIST].unshift(hit);
      this[CACHE].set(key, this[LRU_LIST].head);
      trim(this);
      return true;
    }
  }, {
    key: "has",
    value: function has(key) {
      if (!this[CACHE].has(key)) return false;
      var hit = this[CACHE].get(key).value;
      return !isStale(this, hit);
    }
  }, {
    key: "get",
    value: function get(key) {
      return _get(this, key, true);
    }
  }, {
    key: "peek",
    value: function peek(key) {
      return _get(this, key, false);
    }
  }, {
    key: "pop",
    value: function pop() {
      var node = this[LRU_LIST].tail;
      if (!node) return null;

      _del(this, node);

      return node.value;
    }
  }, {
    key: "del",
    value: function del(key) {
      _del(this, this[CACHE].get(key));
    }
  }, {
    key: "load",
    value: function load(arr) {
      // reset the cache
      this.reset();
      var now = Date.now(); // A previous serialized cache has the most recent items first

      for (var l = arr.length - 1; l >= 0; l--) {
        var hit = arr[l];
        var expiresAt = hit.e || 0;
        if (expiresAt === 0) // the item was created without expiration in a non aged cache
          this.set(hit.k, hit.v);else {
          var maxAge = expiresAt - now; // dont add already expired items

          if (maxAge > 0) {
            this.set(hit.k, hit.v, maxAge);
          }
        }
      }
    }
  }, {
    key: "prune",
    value: function prune() {
      var _this4 = this;

      this[CACHE].forEach(function (value, key) {
        return _get(_this4, key, false);
      });
    }
  }]);

  return LRUCache;
}();

var _get = function _get(self, key, doUse) {
  var node = self[CACHE].get(key);

  if (node) {
    var hit = node.value;

    if (isStale(self, hit)) {
      _del(self, node);

      if (!self[ALLOW_STALE]) return undefined;
    } else {
      if (doUse) {
        if (self[UPDATE_AGE_ON_GET]) node.value.now = Date.now();
        self[LRU_LIST].unshiftNode(node);
      }
    }

    return hit.value;
  }
};

var isStale = function isStale(self, hit) {
  if (!hit || !hit.maxAge && !self[MAX_AGE]) return false;
  var diff = Date.now() - hit.now;
  return hit.maxAge ? diff > hit.maxAge : self[MAX_AGE] && diff > self[MAX_AGE];
};

var trim = function trim(self) {
  if (self[LENGTH] > self[MAX]) {
    for (var walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && walker !== null;) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      var prev = walker.prev;

      _del(self, walker);

      walker = prev;
    }
  }
};

var _del = function _del(self, node) {
  if (node) {
    var hit = node.value;
    if (self[DISPOSE]) self[DISPOSE](hit.key, hit.value);
    self[LENGTH] -= hit.length;
    self[CACHE].delete(hit.key);
    self[LRU_LIST].removeNode(node);
  }
};

var Entry = function Entry(key, value, length, now, maxAge) {
  _classCallCheck(this, Entry);

  this.key = key;
  this.value = value;
  this.length = length;
  this.now = now;
  this.maxAge = maxAge || 0;
};

var forEachStep = function forEachStep(self, fn, node, thisp) {
  var hit = node.value;

  if (isStale(self, hit)) {
    _del(self, node);

    if (!self[ALLOW_STALE]) hit = undefined;
  }

  if (hit) fn.call(thisp, hit.value, hit.key, self);
};

module.exports = LRUCache;
},{"yallist":"node_modules/yallist/yallist.js"}],"node_modules/semver/classes/range.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// hoisted class for cyclic dependency
var Range =
/*#__PURE__*/
function () {
  function Range(range, options) {
    var _this = this;

    _classCallCheck(this, Range);

    options = parseOptions(options);

    if (range instanceof Range) {
      if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
        return range;
      } else {
        return new Range(range.raw, options);
      }
    }

    if (range instanceof Comparator) {
      // just put it in the set and return
      this.raw = range.value;
      this.set = [[range]];
      this.format();
      return this;
    }

    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease; // First, split based on boolean or ||

    this.raw = range;
    this.set = range.split(/\s*\|\|\s*/) // map the range to a 2d array of comparators
    .map(function (range) {
      return _this.parseRange(range.trim());
    }) // throw out any comparator lists that are empty
    // this generally means that it was not a valid range, which is allowed
    // in loose mode, but will still throw if the WHOLE range is invalid.
    .filter(function (c) {
      return c.length;
    });

    if (!this.set.length) {
      throw new TypeError("Invalid SemVer Range: ".concat(range));
    } // if we have any that are not the null set, throw out null sets.


    if (this.set.length > 1) {
      // keep the first one, in case they're all null sets
      var first = this.set[0];
      this.set = this.set.filter(function (c) {
        return !isNullSet(c[0]);
      });
      if (this.set.length === 0) this.set = [first];else if (this.set.length > 1) {
        // if we have any that are *, then the range is just *
        var _iterator = _createForOfIteratorHelper(this.set),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var c = _step.value;

            if (c.length === 1 && isAny(c[0])) {
              this.set = [c];
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }

    this.format();
  }

  _createClass(Range, [{
    key: "format",
    value: function format() {
      this.range = this.set.map(function (comps) {
        return comps.join(' ').trim();
      }).join('||').trim();
      return this.range;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.range;
    }
  }, {
    key: "parseRange",
    value: function parseRange(range) {
      var _this2 = this;

      range = range.trim(); // memoize range parsing for performance.
      // this is a very hot path, and fully deterministic.

      var memoOpts = Object.keys(this.options).join(',');
      var memoKey = "parseRange:".concat(memoOpts, ":").concat(range);
      var cached = cache.get(memoKey);
      if (cached) return cached;
      var loose = this.options.loose; // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`

      var hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
      range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
      debug('hyphen replace', range); // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`

      range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
      debug('comparator trim', range, re[t.COMPARATORTRIM]); // `~ 1.2.3` => `~1.2.3`

      range = range.replace(re[t.TILDETRIM], tildeTrimReplace); // `^ 1.2.3` => `^1.2.3`

      range = range.replace(re[t.CARETTRIM], caretTrimReplace); // normalize spaces

      range = range.split(/\s+/).join(' '); // At this point, the range is completely trimmed and
      // ready to be split into comparators.

      var compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
      var rangeList = range.split(' ').map(function (comp) {
        return parseComparator(comp, _this2.options);
      }).join(' ').split(/\s+/) // >=0.0.0 is equivalent to *
      .map(function (comp) {
        return replaceGTE0(comp, _this2.options);
      }) // in loose mode, throw out any that are not valid comparators
      .filter(this.options.loose ? function (comp) {
        return !!comp.match(compRe);
      } : function () {
        return true;
      }).map(function (comp) {
        return new Comparator(comp, _this2.options);
      }); // if any comparators are the null set, then replace with JUST null set
      // if more than one comparator, remove any * comparators
      // also, don't include the same comparator more than once

      var l = rangeList.length;
      var rangeMap = new Map();

      var _iterator2 = _createForOfIteratorHelper(rangeList),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var comp = _step2.value;
          if (isNullSet(comp)) return [comp];
          rangeMap.set(comp.value, comp);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if (rangeMap.size > 1 && rangeMap.has('')) rangeMap.delete('');

      var result = _toConsumableArray(rangeMap.values());

      cache.set(memoKey, result);
      return result;
    }
  }, {
    key: "intersects",
    value: function intersects(range, options) {
      if (!(range instanceof Range)) {
        throw new TypeError('a Range is required');
      }

      return this.set.some(function (thisComparators) {
        return isSatisfiable(thisComparators, options) && range.set.some(function (rangeComparators) {
          return isSatisfiable(rangeComparators, options) && thisComparators.every(function (thisComparator) {
            return rangeComparators.every(function (rangeComparator) {
              return thisComparator.intersects(rangeComparator, options);
            });
          });
        });
      });
    } // if ANY of the sets match ALL of its comparators, then pass

  }, {
    key: "test",
    value: function test(version) {
      if (!version) {
        return false;
      }

      if (typeof version === 'string') {
        try {
          version = new SemVer(version, this.options);
        } catch (er) {
          return false;
        }
      }

      for (var i = 0; i < this.set.length; i++) {
        if (testSet(this.set[i], version, this.options)) {
          return true;
        }
      }

      return false;
    }
  }]);

  return Range;
}();

module.exports = Range;

var LRU = require('lru-cache');

var cache = new LRU({
  max: 1000
});

var parseOptions = require('../internal/parse-options');

var Comparator = require('./comparator');

var debug = require('../internal/debug');

var SemVer = require('./semver');

var _require = require('../internal/re'),
    re = _require.re,
    t = _require.t,
    comparatorTrimReplace = _require.comparatorTrimReplace,
    tildeTrimReplace = _require.tildeTrimReplace,
    caretTrimReplace = _require.caretTrimReplace;

var isNullSet = function isNullSet(c) {
  return c.value === '<0.0.0-0';
};

var isAny = function isAny(c) {
  return c.value === '';
}; // take a set of comparators and determine whether there
// exists a version which can satisfy it


var isSatisfiable = function isSatisfiable(comparators, options) {
  var result = true;
  var remainingComparators = comparators.slice();
  var testComparator = remainingComparators.pop();

  while (result && remainingComparators.length) {
    result = remainingComparators.every(function (otherComparator) {
      return testComparator.intersects(otherComparator, options);
    });
    testComparator = remainingComparators.pop();
  }

  return result;
}; // comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.


var parseComparator = function parseComparator(comp, options) {
  debug('comp', comp, options);
  comp = replaceCarets(comp, options);
  debug('caret', comp);
  comp = replaceTildes(comp, options);
  debug('tildes', comp);
  comp = replaceXRanges(comp, options);
  debug('xrange', comp);
  comp = replaceStars(comp, options);
  debug('stars', comp);
  return comp;
};

var isX = function isX(id) {
  return !id || id.toLowerCase() === 'x' || id === '*';
}; // ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0


var replaceTildes = function replaceTildes(comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceTilde(comp, options);
  }).join(' ');
};

var replaceTilde = function replaceTilde(comp, options) {
  var r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr);
    var ret;

    if (isX(M)) {
      ret = '';
    } else if (isX(m)) {
      ret = ">=".concat(M, ".0.0 <").concat(+M + 1, ".0.0-0");
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0-0
      ret = ">=".concat(M, ".").concat(m, ".0 <").concat(M, ".").concat(+m + 1, ".0-0");
    } else if (pr) {
      debug('replaceTilde pr', pr);
      ret = ">=".concat(M, ".").concat(m, ".").concat(p, "-").concat(pr, " <").concat(M, ".").concat(+m + 1, ".0-0");
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0-0
      ret = ">=".concat(M, ".").concat(m, ".").concat(p, " <").concat(M, ".").concat(+m + 1, ".0-0");
    }

    debug('tilde return', ret);
    return ret;
  });
}; // ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
// ^1.2.3 --> >=1.2.3 <2.0.0-0
// ^1.2.0 --> >=1.2.0 <2.0.0-0


var replaceCarets = function replaceCarets(comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceCaret(comp, options);
  }).join(' ');
};

var replaceCaret = function replaceCaret(comp, options) {
  debug('caret', comp, options);
  var r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
  var z = options.includePrerelease ? '-0' : '';
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr);
    var ret;

    if (isX(M)) {
      ret = '';
    } else if (isX(m)) {
      ret = ">=".concat(M, ".0.0").concat(z, " <").concat(+M + 1, ".0.0-0");
    } else if (isX(p)) {
      if (M === '0') {
        ret = ">=".concat(M, ".").concat(m, ".0").concat(z, " <").concat(M, ".").concat(+m + 1, ".0-0");
      } else {
        ret = ">=".concat(M, ".").concat(m, ".0").concat(z, " <").concat(+M + 1, ".0.0-0");
      }
    } else if (pr) {
      debug('replaceCaret pr', pr);

      if (M === '0') {
        if (m === '0') {
          ret = ">=".concat(M, ".").concat(m, ".").concat(p, "-").concat(pr, " <").concat(M, ".").concat(m, ".").concat(+p + 1, "-0");
        } else {
          ret = ">=".concat(M, ".").concat(m, ".").concat(p, "-").concat(pr, " <").concat(M, ".").concat(+m + 1, ".0-0");
        }
      } else {
        ret = ">=".concat(M, ".").concat(m, ".").concat(p, "-").concat(pr, " <").concat(+M + 1, ".0.0-0");
      }
    } else {
      debug('no pr');

      if (M === '0') {
        if (m === '0') {
          ret = ">=".concat(M, ".").concat(m, ".").concat(p).concat(z, " <").concat(M, ".").concat(m, ".").concat(+p + 1, "-0");
        } else {
          ret = ">=".concat(M, ".").concat(m, ".").concat(p).concat(z, " <").concat(M, ".").concat(+m + 1, ".0-0");
        }
      } else {
        ret = ">=".concat(M, ".").concat(m, ".").concat(p, " <").concat(+M + 1, ".0.0-0");
      }
    }

    debug('caret return', ret);
    return ret;
  });
};

var replaceXRanges = function replaceXRanges(comp, options) {
  debug('replaceXRanges', comp, options);
  return comp.split(/\s+/).map(function (comp) {
    return replaceXRange(comp, options);
  }).join(' ');
};

var replaceXRange = function replaceXRange(comp, options) {
  comp = comp.trim();
  var r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
  return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr);
    var xM = isX(M);
    var xm = xM || isX(m);
    var xp = xm || isX(p);
    var anyX = xp;

    if (gtlt === '=' && anyX) {
      gtlt = '';
    } // if we're including prereleases in the match, then we need
    // to fix this to -0, the lowest possible prerelease value


    pr = options.includePrerelease ? '-0' : '';

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0-0';
      } else {
        // nothing is forbidden
        ret = '*';
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0;
      }

      p = 0;

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        gtlt = '>=';

        if (xm) {
          M = +M + 1;
          m = 0;
          p = 0;
        } else {
          m = +m + 1;
          p = 0;
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<';

        if (xm) {
          M = +M + 1;
        } else {
          m = +m + 1;
        }
      }

      if (gtlt === '<') pr = '-0';
      ret = "".concat(gtlt + M, ".").concat(m, ".").concat(p).concat(pr);
    } else if (xm) {
      ret = ">=".concat(M, ".0.0").concat(pr, " <").concat(+M + 1, ".0.0-0");
    } else if (xp) {
      ret = ">=".concat(M, ".").concat(m, ".0").concat(pr, " <").concat(M, ".").concat(+m + 1, ".0-0");
    }

    debug('xRange return', ret);
    return ret;
  });
}; // Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.


var replaceStars = function replaceStars(comp, options) {
  debug('replaceStars', comp, options); // Looseness is ignored here.  star is always as loose as it gets!

  return comp.trim().replace(re[t.STAR], '');
};

var replaceGTE0 = function replaceGTE0(comp, options) {
  debug('replaceGTE0', comp, options);
  return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '');
}; // This function is passed to string.replace(re[t.HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0-0


var hyphenReplace = function hyphenReplace(incPr) {
  return function ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
    if (isX(fM)) {
      from = '';
    } else if (isX(fm)) {
      from = ">=".concat(fM, ".0.0").concat(incPr ? '-0' : '');
    } else if (isX(fp)) {
      from = ">=".concat(fM, ".").concat(fm, ".0").concat(incPr ? '-0' : '');
    } else if (fpr) {
      from = ">=".concat(from);
    } else {
      from = ">=".concat(from).concat(incPr ? '-0' : '');
    }

    if (isX(tM)) {
      to = '';
    } else if (isX(tm)) {
      to = "<".concat(+tM + 1, ".0.0-0");
    } else if (isX(tp)) {
      to = "<".concat(tM, ".").concat(+tm + 1, ".0-0");
    } else if (tpr) {
      to = "<=".concat(tM, ".").concat(tm, ".").concat(tp, "-").concat(tpr);
    } else if (incPr) {
      to = "<".concat(tM, ".").concat(tm, ".").concat(+tp + 1, "-0");
    } else {
      to = "<=".concat(to);
    }

    return "".concat(from, " ").concat(to).trim();
  };
};

var testSet = function testSet(set, version, options) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false;
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (var _i = 0; _i < set.length; _i++) {
      debug(set[_i].semver);

      if (set[_i].semver === Comparator.ANY) {
        continue;
      }

      if (set[_i].semver.prerelease.length > 0) {
        var allowed = set[_i].semver;

        if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
          return true;
        }
      }
    } // Version has a -pre, but it's not one of the ones we like.


    return false;
  }

  return true;
};
},{"lru-cache":"node_modules/lru-cache/index.js","../internal/parse-options":"node_modules/semver/internal/parse-options.js","./comparator":"node_modules/semver/classes/comparator.js","../internal/debug":"node_modules/semver/internal/debug.js","./semver":"node_modules/semver/classes/semver.js","../internal/re":"node_modules/semver/internal/re.js"}],"node_modules/semver/classes/comparator.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ANY = Symbol('SemVer ANY'); // hoisted class for cyclic dependency

var Comparator =
/*#__PURE__*/
function () {
  function Comparator(comp, options) {
    _classCallCheck(this, Comparator);

    options = parseOptions(options);

    if (comp instanceof Comparator) {
      if (comp.loose === !!options.loose) {
        return comp;
      } else {
        comp = comp.value;
      }
    }

    debug('comparator', comp, options);
    this.options = options;
    this.loose = !!options.loose;
    this.parse(comp);

    if (this.semver === ANY) {
      this.value = '';
    } else {
      this.value = this.operator + this.semver.version;
    }

    debug('comp', this);
  }

  _createClass(Comparator, [{
    key: "parse",
    value: function parse(comp) {
      var r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
      var m = comp.match(r);

      if (!m) {
        throw new TypeError("Invalid comparator: ".concat(comp));
      }

      this.operator = m[1] !== undefined ? m[1] : '';

      if (this.operator === '=') {
        this.operator = '';
      } // if it literally is just '>' or '' then allow anything.


      if (!m[2]) {
        this.semver = ANY;
      } else {
        this.semver = new SemVer(m[2], this.options.loose);
      }
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.value;
    }
  }, {
    key: "test",
    value: function test(version) {
      debug('Comparator.test', version, this.options.loose);

      if (this.semver === ANY || version === ANY) {
        return true;
      }

      if (typeof version === 'string') {
        try {
          version = new SemVer(version, this.options);
        } catch (er) {
          return false;
        }
      }

      return cmp(version, this.operator, this.semver, this.options);
    }
  }, {
    key: "intersects",
    value: function intersects(comp, options) {
      if (!(comp instanceof Comparator)) {
        throw new TypeError('a Comparator is required');
      }

      if (!options || _typeof(options) !== 'object') {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }

      if (this.operator === '') {
        if (this.value === '') {
          return true;
        }

        return new Range(comp.value, options).test(this.value);
      } else if (comp.operator === '') {
        if (comp.value === '') {
          return true;
        }

        return new Range(this.value, options).test(comp.semver);
      }

      var sameDirectionIncreasing = (this.operator === '>=' || this.operator === '>') && (comp.operator === '>=' || comp.operator === '>');
      var sameDirectionDecreasing = (this.operator === '<=' || this.operator === '<') && (comp.operator === '<=' || comp.operator === '<');
      var sameSemVer = this.semver.version === comp.semver.version;
      var differentDirectionsInclusive = (this.operator === '>=' || this.operator === '<=') && (comp.operator === '>=' || comp.operator === '<=');
      var oppositeDirectionsLessThan = cmp(this.semver, '<', comp.semver, options) && (this.operator === '>=' || this.operator === '>') && (comp.operator === '<=' || comp.operator === '<');
      var oppositeDirectionsGreaterThan = cmp(this.semver, '>', comp.semver, options) && (this.operator === '<=' || this.operator === '<') && (comp.operator === '>=' || comp.operator === '>');
      return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
    }
  }], [{
    key: "ANY",
    get: function get() {
      return ANY;
    }
  }]);

  return Comparator;
}();

module.exports = Comparator;

var parseOptions = require('../internal/parse-options');

var _require = require('../internal/re'),
    re = _require.re,
    t = _require.t;

var cmp = require('../functions/cmp');

var debug = require('../internal/debug');

var SemVer = require('./semver');

var Range = require('./range');
},{"../internal/parse-options":"node_modules/semver/internal/parse-options.js","../internal/re":"node_modules/semver/internal/re.js","../functions/cmp":"node_modules/semver/functions/cmp.js","../internal/debug":"node_modules/semver/internal/debug.js","./semver":"node_modules/semver/classes/semver.js","./range":"node_modules/semver/classes/range.js"}],"node_modules/semver/functions/satisfies.js":[function(require,module,exports) {
var Range = require('../classes/range');

var satisfies = function satisfies(version, range, options) {
  try {
    range = new Range(range, options);
  } catch (er) {
    return false;
  }

  return range.test(version);
};

module.exports = satisfies;
},{"../classes/range":"node_modules/semver/classes/range.js"}],"node_modules/semver/ranges/to-comparators.js":[function(require,module,exports) {
var Range = require('../classes/range'); // Mostly just for testing and legacy API reasons


var toComparators = function toComparators(range, options) {
  return new Range(range, options).set.map(function (comp) {
    return comp.map(function (c) {
      return c.value;
    }).join(' ').trim().split(' ');
  });
};

module.exports = toComparators;
},{"../classes/range":"node_modules/semver/classes/range.js"}],"node_modules/semver/ranges/max-satisfying.js":[function(require,module,exports) {
var SemVer = require('../classes/semver');

var Range = require('../classes/range');

var maxSatisfying = function maxSatisfying(versions, range, options) {
  var max = null;
  var maxSV = null;
  var rangeObj = null;

  try {
    rangeObj = new Range(range, options);
  } catch (er) {
    return null;
  }

  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v;
        maxSV = new SemVer(max, options);
      }
    }
  });
  return max;
};

module.exports = maxSatisfying;
},{"../classes/semver":"node_modules/semver/classes/semver.js","../classes/range":"node_modules/semver/classes/range.js"}],"node_modules/semver/ranges/min-satisfying.js":[function(require,module,exports) {
var SemVer = require('../classes/semver');

var Range = require('../classes/range');

var minSatisfying = function minSatisfying(versions, range, options) {
  var min = null;
  var minSV = null;
  var rangeObj = null;

  try {
    rangeObj = new Range(range, options);
  } catch (er) {
    return null;
  }

  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v;
        minSV = new SemVer(min, options);
      }
    }
  });
  return min;
};

module.exports = minSatisfying;
},{"../classes/semver":"node_modules/semver/classes/semver.js","../classes/range":"node_modules/semver/classes/range.js"}],"node_modules/semver/ranges/min-version.js":[function(require,module,exports) {
var SemVer = require('../classes/semver');

var Range = require('../classes/range');

var gt = require('../functions/gt');

var minVersion = function minVersion(range, loose) {
  range = new Range(range, loose);
  var minver = new SemVer('0.0.0');

  if (range.test(minver)) {
    return minver;
  }

  minver = new SemVer('0.0.0-0');

  if (range.test(minver)) {
    return minver;
  }

  minver = null;

  var _loop = function _loop(i) {
    var comparators = range.set[i];
    var setMin = null;
    comparators.forEach(function (comparator) {
      // Clone to avoid manipulating the comparator's semver object.
      var compver = new SemVer(comparator.semver.version);

      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            compver.patch++;
          } else {
            compver.prerelease.push(0);
          }

          compver.raw = compver.format();

        /* fallthrough */

        case '':
        case '>=':
          if (!setMin || gt(compver, setMin)) {
            setMin = compver;
          }

          break;

        case '<':
        case '<=':
          /* Ignore maximum versions */
          break;

        /* istanbul ignore next */

        default:
          throw new Error("Unexpected operation: ".concat(comparator.operator));
      }
    });
    if (setMin && (!minver || gt(minver, setMin))) minver = setMin;
  };

  for (var i = 0; i < range.set.length; ++i) {
    _loop(i);
  }

  if (minver && range.test(minver)) {
    return minver;
  }

  return null;
};

module.exports = minVersion;
},{"../classes/semver":"node_modules/semver/classes/semver.js","../classes/range":"node_modules/semver/classes/range.js","../functions/gt":"node_modules/semver/functions/gt.js"}],"node_modules/semver/ranges/valid.js":[function(require,module,exports) {
var Range = require('../classes/range');

var validRange = function validRange(range, options) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*';
  } catch (er) {
    return null;
  }
};

module.exports = validRange;
},{"../classes/range":"node_modules/semver/classes/range.js"}],"node_modules/semver/ranges/outside.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var SemVer = require('../classes/semver');

var Comparator = require('../classes/comparator');

var ANY = Comparator.ANY;

var Range = require('../classes/range');

var satisfies = require('../functions/satisfies');

var gt = require('../functions/gt');

var lt = require('../functions/lt');

var lte = require('../functions/lte');

var gte = require('../functions/gte');

var outside = function outside(version, range, hilo, options) {
  version = new SemVer(version, options);
  range = new Range(range, options);
  var gtfn, ltefn, ltfn, comp, ecomp;

  switch (hilo) {
    case '>':
      gtfn = gt;
      ltefn = lte;
      ltfn = lt;
      comp = '>';
      ecomp = '>=';
      break;

    case '<':
      gtfn = lt;
      ltefn = gte;
      ltfn = gt;
      comp = '<';
      ecomp = '<=';
      break;

    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  } // If it satisfies the range it is not outside


  if (satisfies(version, range, options)) {
    return false;
  } // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.


  var _loop = function _loop(i) {
    var comparators = range.set[i];
    var high = null;
    var low = null;
    comparators.forEach(function (comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0');
      }

      high = high || comparator;
      low = low || comparator;

      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator;
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator;
      }
    }); // If the edge version comparator has a operator then our version
    // isn't outside it

    if (high.operator === comp || high.operator === ecomp) {
      return {
        v: false
      };
    } // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range


    if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
      return {
        v: false
      };
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return {
        v: false
      };
    }
  };

  for (var i = 0; i < range.set.length; ++i) {
    var _ret = _loop(i);

    if (_typeof(_ret) === "object") return _ret.v;
  }

  return true;
};

module.exports = outside;
},{"../classes/semver":"node_modules/semver/classes/semver.js","../classes/comparator":"node_modules/semver/classes/comparator.js","../classes/range":"node_modules/semver/classes/range.js","../functions/satisfies":"node_modules/semver/functions/satisfies.js","../functions/gt":"node_modules/semver/functions/gt.js","../functions/lt":"node_modules/semver/functions/lt.js","../functions/lte":"node_modules/semver/functions/lte.js","../functions/gte":"node_modules/semver/functions/gte.js"}],"node_modules/semver/ranges/gtr.js":[function(require,module,exports) {
// Determine if version is greater than all the versions possible in the range.
var outside = require('./outside');

var gtr = function gtr(version, range, options) {
  return outside(version, range, '>', options);
};

module.exports = gtr;
},{"./outside":"node_modules/semver/ranges/outside.js"}],"node_modules/semver/ranges/ltr.js":[function(require,module,exports) {
var outside = require('./outside'); // Determine if version is less than all the versions possible in the range


var ltr = function ltr(version, range, options) {
  return outside(version, range, '<', options);
};

module.exports = ltr;
},{"./outside":"node_modules/semver/ranges/outside.js"}],"node_modules/semver/ranges/intersects.js":[function(require,module,exports) {
var Range = require('../classes/range');

var intersects = function intersects(r1, r2, options) {
  r1 = new Range(r1, options);
  r2 = new Range(r2, options);
  return r1.intersects(r2);
};

module.exports = intersects;
},{"../classes/range":"node_modules/semver/classes/range.js"}],"node_modules/semver/ranges/simplify.js":[function(require,module,exports) {
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// given a set of versions and a range, create a "simplified" range
// that includes the same versions that the original range does
// If the original range is shorter than the simplified one, return that.
var satisfies = require('../functions/satisfies.js');

var compare = require('../functions/compare.js');

module.exports = function (versions, range, options) {
  var set = [];
  var min = null;
  var prev = null;
  var v = versions.sort(function (a, b) {
    return compare(a, b, options);
  });

  var _iterator = _createForOfIteratorHelper(v),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var version = _step.value;
      var included = satisfies(version, range, options);

      if (included) {
        prev = version;
        if (!min) min = version;
      } else {
        if (prev) {
          set.push([min, prev]);
        }

        prev = null;
        min = null;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (min) set.push([min, null]);
  var ranges = [];

  for (var _i = 0, _set = set; _i < _set.length; _i++) {
    var _set$_i = _slicedToArray(_set[_i], 2),
        _min = _set$_i[0],
        max = _set$_i[1];

    if (_min === max) ranges.push(_min);else if (!max && _min === v[0]) ranges.push('*');else if (!max) ranges.push(">=".concat(_min));else if (_min === v[0]) ranges.push("<=".concat(max));else ranges.push("".concat(_min, " - ").concat(max));
  }

  var simplified = ranges.join(' || ');
  var original = typeof range.raw === 'string' ? range.raw : String(range);
  return simplified.length < original.length ? simplified : range;
};
},{"../functions/satisfies.js":"node_modules/semver/functions/satisfies.js","../functions/compare.js":"node_modules/semver/functions/compare.js"}],"node_modules/semver/ranges/subset.js":[function(require,module,exports) {
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var Range = require('../classes/range.js');

var _require = require('../classes/comparator.js'),
    ANY = _require.ANY;

var satisfies = require('../functions/satisfies.js');

var compare = require('../functions/compare.js'); // Complex range `r1 || r2 || ...` is a subset of `R1 || R2 || ...` iff:
// - Every simple range `r1, r2, ...` is a subset of some `R1, R2, ...`
//
// Simple range `c1 c2 ...` is a subset of simple range `C1 C2 ...` iff:
// - If c is only the ANY comparator
//   - If C is only the ANY comparator, return true
//   - Else return false
// - Let EQ be the set of = comparators in c
// - If EQ is more than one, return true (null set)
// - Let GT be the highest > or >= comparator in c
// - Let LT be the lowest < or <= comparator in c
// - If GT and LT, and GT.semver > LT.semver, return true (null set)
// - If EQ
//   - If GT, and EQ does not satisfy GT, return true (null set)
//   - If LT, and EQ does not satisfy LT, return true (null set)
//   - If EQ satisfies every C, return true
//   - Else return false
// - If GT
//   - If GT.semver is lower than any > or >= comp in C, return false
//   - If GT is >=, and GT.semver does not satisfy every C, return false
// - If LT
//   - If LT.semver is greater than any < or <= comp in C, return false
//   - If LT is <=, and LT.semver does not satisfy every C, return false
// - If any C is a = range, and GT or LT are set, return false
// - Else return true


var subset = function subset(sub, dom, options) {
  if (sub === dom) return true;
  sub = new Range(sub, options);
  dom = new Range(dom, options);
  var sawNonNull = false;

  var _iterator = _createForOfIteratorHelper(sub.set),
      _step;

  try {
    OUTER: for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var simpleSub = _step.value;

      var _iterator2 = _createForOfIteratorHelper(dom.set),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var simpleDom = _step2.value;
          var isSub = simpleSubset(simpleSub, simpleDom, options);
          sawNonNull = sawNonNull || isSub !== null;
          if (isSub) continue OUTER;
        } // the null set is a subset of everything, but null simple ranges in
        // a complex range should be ignored.  so if we saw a non-null range,
        // then we know this isn't a subset, but if EVERY simple range was null,
        // then it is a subset.

      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if (sawNonNull) return false;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return true;
};

var simpleSubset = function simpleSubset(sub, dom, options) {
  if (sub === dom) return true;
  if (sub.length === 1 && sub[0].semver === ANY) return dom.length === 1 && dom[0].semver === ANY;
  var eqSet = new Set();
  var gt, lt;

  var _iterator3 = _createForOfIteratorHelper(sub),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var c = _step3.value;
      if (c.operator === '>' || c.operator === '>=') gt = higherGT(gt, c, options);else if (c.operator === '<' || c.operator === '<=') lt = lowerLT(lt, c, options);else eqSet.add(c.semver);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  if (eqSet.size > 1) return null;
  var gtltComp;

  if (gt && lt) {
    gtltComp = compare(gt.semver, lt.semver, options);
    if (gtltComp > 0) return null;else if (gtltComp === 0 && (gt.operator !== '>=' || lt.operator !== '<=')) return null;
  } // will iterate one or zero times


  var _iterator4 = _createForOfIteratorHelper(eqSet),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var eq = _step4.value;
      if (gt && !satisfies(eq, String(gt), options)) return null;
      if (lt && !satisfies(eq, String(lt), options)) return null;

      var _iterator6 = _createForOfIteratorHelper(dom),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var _c = _step6.value;
          if (!satisfies(eq, String(_c), options)) return false;
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      return true;
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  var higher, lower;
  var hasDomLT, hasDomGT;

  var _iterator5 = _createForOfIteratorHelper(dom),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var _c2 = _step5.value;
      hasDomGT = hasDomGT || _c2.operator === '>' || _c2.operator === '>=';
      hasDomLT = hasDomLT || _c2.operator === '<' || _c2.operator === '<=';

      if (gt) {
        if (_c2.operator === '>' || _c2.operator === '>=') {
          higher = higherGT(gt, _c2, options);
          if (higher === _c2 && higher !== gt) return false;
        } else if (gt.operator === '>=' && !satisfies(gt.semver, String(_c2), options)) return false;
      }

      if (lt) {
        if (_c2.operator === '<' || _c2.operator === '<=') {
          lower = lowerLT(lt, _c2, options);
          if (lower === _c2 && lower !== lt) return false;
        } else if (lt.operator === '<=' && !satisfies(lt.semver, String(_c2), options)) return false;
      }

      if (!_c2.operator && (lt || gt) && gtltComp !== 0) return false;
    } // if there was a < or >, and nothing in the dom, then must be false
    // UNLESS it was limited by another range in the other direction.
    // Eg, >1.0.0 <1.0.1 is still a subset of <2.0.0

  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }

  if (gt && hasDomLT && !lt && gtltComp !== 0) return false;
  if (lt && hasDomGT && !gt && gtltComp !== 0) return false;
  return true;
}; // >=1.2.3 is lower than >1.2.3


var higherGT = function higherGT(a, b, options) {
  if (!a) return b;
  var comp = compare(a.semver, b.semver, options);
  return comp > 0 ? a : comp < 0 ? b : b.operator === '>' && a.operator === '>=' ? b : a;
}; // <=1.2.3 is higher than <1.2.3


var lowerLT = function lowerLT(a, b, options) {
  if (!a) return b;
  var comp = compare(a.semver, b.semver, options);
  return comp < 0 ? a : comp > 0 ? b : b.operator === '<' && a.operator === '<=' ? b : a;
};

module.exports = subset;
},{"../classes/range.js":"node_modules/semver/classes/range.js","../classes/comparator.js":"node_modules/semver/classes/comparator.js","../functions/satisfies.js":"node_modules/semver/functions/satisfies.js","../functions/compare.js":"node_modules/semver/functions/compare.js"}],"node_modules/semver/index.js":[function(require,module,exports) {
// just pre-load all the stuff that index.js lazily exports
var internalRe = require('./internal/re');

module.exports = {
  re: internalRe.re,
  src: internalRe.src,
  tokens: internalRe.t,
  SEMVER_SPEC_VERSION: require('./internal/constants').SEMVER_SPEC_VERSION,
  SemVer: require('./classes/semver'),
  compareIdentifiers: require('./internal/identifiers').compareIdentifiers,
  rcompareIdentifiers: require('./internal/identifiers').rcompareIdentifiers,
  parse: require('./functions/parse'),
  valid: require('./functions/valid'),
  clean: require('./functions/clean'),
  inc: require('./functions/inc'),
  diff: require('./functions/diff'),
  major: require('./functions/major'),
  minor: require('./functions/minor'),
  patch: require('./functions/patch'),
  prerelease: require('./functions/prerelease'),
  compare: require('./functions/compare'),
  rcompare: require('./functions/rcompare'),
  compareLoose: require('./functions/compare-loose'),
  compareBuild: require('./functions/compare-build'),
  sort: require('./functions/sort'),
  rsort: require('./functions/rsort'),
  gt: require('./functions/gt'),
  lt: require('./functions/lt'),
  eq: require('./functions/eq'),
  neq: require('./functions/neq'),
  gte: require('./functions/gte'),
  lte: require('./functions/lte'),
  cmp: require('./functions/cmp'),
  coerce: require('./functions/coerce'),
  Comparator: require('./classes/comparator'),
  Range: require('./classes/range'),
  satisfies: require('./functions/satisfies'),
  toComparators: require('./ranges/to-comparators'),
  maxSatisfying: require('./ranges/max-satisfying'),
  minSatisfying: require('./ranges/min-satisfying'),
  minVersion: require('./ranges/min-version'),
  validRange: require('./ranges/valid'),
  outside: require('./ranges/outside'),
  gtr: require('./ranges/gtr'),
  ltr: require('./ranges/ltr'),
  intersects: require('./ranges/intersects'),
  simplifyRange: require('./ranges/simplify'),
  subset: require('./ranges/subset')
};
},{"./internal/re":"node_modules/semver/internal/re.js","./internal/constants":"node_modules/semver/internal/constants.js","./classes/semver":"node_modules/semver/classes/semver.js","./internal/identifiers":"node_modules/semver/internal/identifiers.js","./functions/parse":"node_modules/semver/functions/parse.js","./functions/valid":"node_modules/semver/functions/valid.js","./functions/clean":"node_modules/semver/functions/clean.js","./functions/inc":"node_modules/semver/functions/inc.js","./functions/diff":"node_modules/semver/functions/diff.js","./functions/major":"node_modules/semver/functions/major.js","./functions/minor":"node_modules/semver/functions/minor.js","./functions/patch":"node_modules/semver/functions/patch.js","./functions/prerelease":"node_modules/semver/functions/prerelease.js","./functions/compare":"node_modules/semver/functions/compare.js","./functions/rcompare":"node_modules/semver/functions/rcompare.js","./functions/compare-loose":"node_modules/semver/functions/compare-loose.js","./functions/compare-build":"node_modules/semver/functions/compare-build.js","./functions/sort":"node_modules/semver/functions/sort.js","./functions/rsort":"node_modules/semver/functions/rsort.js","./functions/gt":"node_modules/semver/functions/gt.js","./functions/lt":"node_modules/semver/functions/lt.js","./functions/eq":"node_modules/semver/functions/eq.js","./functions/neq":"node_modules/semver/functions/neq.js","./functions/gte":"node_modules/semver/functions/gte.js","./functions/lte":"node_modules/semver/functions/lte.js","./functions/cmp":"node_modules/semver/functions/cmp.js","./functions/coerce":"node_modules/semver/functions/coerce.js","./classes/comparator":"node_modules/semver/classes/comparator.js","./classes/range":"node_modules/semver/classes/range.js","./functions/satisfies":"node_modules/semver/functions/satisfies.js","./ranges/to-comparators":"node_modules/semver/ranges/to-comparators.js","./ranges/max-satisfying":"node_modules/semver/ranges/max-satisfying.js","./ranges/min-satisfying":"node_modules/semver/ranges/min-satisfying.js","./ranges/min-version":"node_modules/semver/ranges/min-version.js","./ranges/valid":"node_modules/semver/ranges/valid.js","./ranges/outside":"node_modules/semver/ranges/outside.js","./ranges/gtr":"node_modules/semver/ranges/gtr.js","./ranges/ltr":"node_modules/semver/ranges/ltr.js","./ranges/intersects":"node_modules/semver/ranges/intersects.js","./ranges/simplify":"node_modules/semver/ranges/simplify.js","./ranges/subset":"node_modules/semver/ranges/subset.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _redditapi = _interopRequireDefault(require("./redditapi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require("semver"),
    sort = _require.sort;

var searchForm = document.getElementById('search-form');
var searchInput = document.getElementById('search-input');
searchForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Get the search term

  var searchTerm = searchInput.value; // Get sort

  var sortBy = document.querySelector('input[name="sortby"]:checked').value; // Get limit

  var searchLimit = document.getElementById('limit').value; // Check input

  if (searchTerm === '') {
    // Show a message
    showMessage('Please add a search term', 'alert-danger');
  } // Clear the Input


  searchInput.value = ''; // Search Reddit (it returns a promise to use .then)

  _redditapi.default.search(searchTerm, sortBy, searchLimit).then(function (results) {
    var output = '<div class="card-columns">';
    console.log(results); // Loop through the posts

    results.forEach(function (post) {
      // Check for image
      var image = post.preview ? post.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
      output += "\n        <div class=\"card\" style=\"width: 18rem;\">\n        <img src=\"".concat(image, "\" class=\"card-img-top\" alt=\"...\">\n        <div class=\"card-body\">\n          <h5 class=\"card-title\">").concat(post.title, "</h5>\n          <p class=\"card-text\">").concat(truncateText(post.selftext, 100), "</p>\n          <a href=\"").concat(post.url, "\" target=\"_blank\" class=\"btn btn-primary\">Check This Post</a>\n        </div>\n      </div>\n      ");
    });
    output += '</div>';
    document.getElementById('results').innerHTML = output;
  });
}); // Show Message Function

function showMessage(message, className) {
  // Create a div
  var div = document.createElement('div');
  div.className = "alert ".concat(className); // Add the text

  div.appendChild(document.createTextNode(message)); // Get the parent container

  var parentDiv = document.getElementById('search-container'); // Get the search 

  var search = document.getElementById('search'); // Insert the message

  parentDiv.insertBefore(div, search); // Set a timeout 

  setTimeout(function () {
    return div.remove();
  }, 3000);
} // Truncate Text


function truncateText(text, limit) {
  var shortened = text.indexOf(" ", limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened);
}
},{"./redditapi":"redditapi.js","semver":"node_modules/semver/index.js"}],"C:/Users/User/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61683" + '/');

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
      } else {
        window.location.reload();
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
},{}]},{},["C:/Users/User/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/RedditAPI.e31bb0bc.js.map