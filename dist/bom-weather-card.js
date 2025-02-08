function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var loglevel$1 = {exports: {}};

/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
var loglevel = loglevel$1.exports;

var hasRequiredLoglevel;

function requireLoglevel () {
	if (hasRequiredLoglevel) return loglevel$1.exports;
	hasRequiredLoglevel = 1;
	(function (module) {
		(function (root, definition) {
		    if (module.exports) {
		        module.exports = definition();
		    } else {
		        root.log = definition();
		    }
		}(loglevel, function () {

		    // Slightly dubious tricks to cut down minimized file size
		    var noop = function() {};
		    var undefinedType = "undefined";
		    var isIE = (typeof window !== undefinedType) && (typeof window.navigator !== undefinedType) && (
		        /Trident\/|MSIE /.test(window.navigator.userAgent)
		    );

		    var logMethods = [
		        "trace",
		        "debug",
		        "info",
		        "warn",
		        "error"
		    ];

		    var _loggersByName = {};
		    var defaultLogger = null;

		    // Cross-browser bind equivalent that works at least back to IE6
		    function bindMethod(obj, methodName) {
		        var method = obj[methodName];
		        if (typeof method.bind === 'function') {
		            return method.bind(obj);
		        } else {
		            try {
		                return Function.prototype.bind.call(method, obj);
		            } catch (e) {
		                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
		                return function() {
		                    return Function.prototype.apply.apply(method, [obj, arguments]);
		                };
		            }
		        }
		    }

		    // Trace() doesn't print the message in IE, so for that case we need to wrap it
		    function traceForIE() {
		        if (console.log) {
		            if (console.log.apply) {
		                console.log.apply(console, arguments);
		            } else {
		                // In old IE, native console methods themselves don't have apply().
		                Function.prototype.apply.apply(console.log, [console, arguments]);
		            }
		        }
		        if (console.trace) console.trace();
		    }

		    // Build the best logging method possible for this env
		    // Wherever possible we want to bind, not wrap, to preserve stack traces
		    function realMethod(methodName) {
		        if (methodName === 'debug') {
		            methodName = 'log';
		        }

		        if (typeof console === undefinedType) {
		            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
		        } else if (methodName === 'trace' && isIE) {
		            return traceForIE;
		        } else if (console[methodName] !== undefined) {
		            return bindMethod(console, methodName);
		        } else if (console.log !== undefined) {
		            return bindMethod(console, 'log');
		        } else {
		            return noop;
		        }
		    }

		    // These private functions always need `this` to be set properly

		    function replaceLoggingMethods() {
		        /*jshint validthis:true */
		        var level = this.getLevel();

		        // Replace the actual methods.
		        for (var i = 0; i < logMethods.length; i++) {
		            var methodName = logMethods[i];
		            this[methodName] = (i < level) ?
		                noop :
		                this.methodFactory(methodName, level, this.name);
		        }

		        // Define log.log as an alias for log.debug
		        this.log = this.debug;

		        // Return any important warnings.
		        if (typeof console === undefinedType && level < this.levels.SILENT) {
		            return "No console available for logging";
		        }
		    }

		    // In old IE versions, the console isn't present until you first open it.
		    // We build realMethod() replacements here that regenerate logging methods
		    function enableLoggingWhenConsoleArrives(methodName) {
		        return function () {
		            if (typeof console !== undefinedType) {
		                replaceLoggingMethods.call(this);
		                this[methodName].apply(this, arguments);
		            }
		        };
		    }

		    // By default, we use closely bound real methods wherever possible, and
		    // otherwise we wait for a console to appear, and then try again.
		    function defaultMethodFactory(methodName, _level, _loggerName) {
		        /*jshint validthis:true */
		        return realMethod(methodName) ||
		               enableLoggingWhenConsoleArrives.apply(this, arguments);
		    }

		    function Logger(name, factory) {
		      // Private instance variables.
		      var self = this;
		      /**
		       * The level inherited from a parent logger (or a global default). We
		       * cache this here rather than delegating to the parent so that it stays
		       * in sync with the actual logging methods that we have installed (the
		       * parent could change levels but we might not have rebuilt the loggers
		       * in this child yet).
		       * @type {number}
		       */
		      var inheritedLevel;
		      /**
		       * The default level for this logger, if any. If set, this overrides
		       * `inheritedLevel`.
		       * @type {number|null}
		       */
		      var defaultLevel;
		      /**
		       * A user-specific level for this logger. If set, this overrides
		       * `defaultLevel`.
		       * @type {number|null}
		       */
		      var userLevel;

		      var storageKey = "loglevel";
		      if (typeof name === "string") {
		        storageKey += ":" + name;
		      } else if (typeof name === "symbol") {
		        storageKey = undefined;
		      }

		      function persistLevelIfPossible(levelNum) {
		          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

		          if (typeof window === undefinedType || !storageKey) return;

		          // Use localStorage if available
		          try {
		              window.localStorage[storageKey] = levelName;
		              return;
		          } catch (ignore) {}

		          // Use session cookie as fallback
		          try {
		              window.document.cookie =
		                encodeURIComponent(storageKey) + "=" + levelName + ";";
		          } catch (ignore) {}
		      }

		      function getPersistedLevel() {
		          var storedLevel;

		          if (typeof window === undefinedType || !storageKey) return;

		          try {
		              storedLevel = window.localStorage[storageKey];
		          } catch (ignore) {}

		          // Fallback to cookies if local storage gives us nothing
		          if (typeof storedLevel === undefinedType) {
		              try {
		                  var cookie = window.document.cookie;
		                  var cookieName = encodeURIComponent(storageKey);
		                  var location = cookie.indexOf(cookieName + "=");
		                  if (location !== -1) {
		                      storedLevel = /^([^;]+)/.exec(
		                          cookie.slice(location + cookieName.length + 1)
		                      )[1];
		                  }
		              } catch (ignore) {}
		          }

		          // If the stored level is not valid, treat it as if nothing was stored.
		          if (self.levels[storedLevel] === undefined) {
		              storedLevel = undefined;
		          }

		          return storedLevel;
		      }

		      function clearPersistedLevel() {
		          if (typeof window === undefinedType || !storageKey) return;

		          // Use localStorage if available
		          try {
		              window.localStorage.removeItem(storageKey);
		          } catch (ignore) {}

		          // Use session cookie as fallback
		          try {
		              window.document.cookie =
		                encodeURIComponent(storageKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		          } catch (ignore) {}
		      }

		      function normalizeLevel(input) {
		          var level = input;
		          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
		              level = self.levels[level.toUpperCase()];
		          }
		          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
		              return level;
		          } else {
		              throw new TypeError("log.setLevel() called with invalid level: " + input);
		          }
		      }

		      /*
		       *
		       * Public logger API - see https://github.com/pimterry/loglevel for details
		       *
		       */

		      self.name = name;

		      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
		          "ERROR": 4, "SILENT": 5};

		      self.methodFactory = factory || defaultMethodFactory;

		      self.getLevel = function () {
		          if (userLevel != null) {
		            return userLevel;
		          } else if (defaultLevel != null) {
		            return defaultLevel;
		          } else {
		            return inheritedLevel;
		          }
		      };

		      self.setLevel = function (level, persist) {
		          userLevel = normalizeLevel(level);
		          if (persist !== false) {  // defaults to true
		              persistLevelIfPossible(userLevel);
		          }

		          // NOTE: in v2, this should call rebuild(), which updates children.
		          return replaceLoggingMethods.call(self);
		      };

		      self.setDefaultLevel = function (level) {
		          defaultLevel = normalizeLevel(level);
		          if (!getPersistedLevel()) {
		              self.setLevel(level, false);
		          }
		      };

		      self.resetLevel = function () {
		          userLevel = null;
		          clearPersistedLevel();
		          replaceLoggingMethods.call(self);
		      };

		      self.enableAll = function(persist) {
		          self.setLevel(self.levels.TRACE, persist);
		      };

		      self.disableAll = function(persist) {
		          self.setLevel(self.levels.SILENT, persist);
		      };

		      self.rebuild = function () {
		          if (defaultLogger !== self) {
		              inheritedLevel = normalizeLevel(defaultLogger.getLevel());
		          }
		          replaceLoggingMethods.call(self);

		          if (defaultLogger === self) {
		              for (var childName in _loggersByName) {
		                _loggersByName[childName].rebuild();
		              }
		          }
		      };

		      // Initialize all the internal levels.
		      inheritedLevel = normalizeLevel(
		          defaultLogger ? defaultLogger.getLevel() : "WARN"
		      );
		      var initialLevel = getPersistedLevel();
		      if (initialLevel != null) {
		          userLevel = normalizeLevel(initialLevel);
		      }
		      replaceLoggingMethods.call(self);
		    }

		    /*
		     *
		     * Top-level API
		     *
		     */

		    defaultLogger = new Logger();

		    defaultLogger.getLogger = function getLogger(name) {
		        if ((typeof name !== "symbol" && typeof name !== "string") || name === "") {
		            throw new TypeError("You must supply a name when creating a logger.");
		        }

		        var logger = _loggersByName[name];
		        if (!logger) {
		            logger = _loggersByName[name] = new Logger(
		                name,
		                defaultLogger.methodFactory
		            );
		        }
		        return logger;
		    };

		    // Grab the current global log variable in case of overwrite
		    var _log = (typeof window !== undefinedType) ? window.log : undefined;
		    defaultLogger.noConflict = function() {
		        if (typeof window !== undefinedType &&
		               window.log === defaultLogger) {
		            window.log = _log;
		        }

		        return defaultLogger;
		    };

		    defaultLogger.getLoggers = function getLoggers() {
		        return _loggersByName;
		    };

		    // ES6 default export, for compatibility
		    defaultLogger['default'] = defaultLogger;

		    return defaultLogger;
		})); 
	} (loglevel$1));
	return loglevel$1.exports;
}

var loglevelExports = requireLoglevel();
var log = /*@__PURE__*/getDefaultExportFromCjs(loglevelExports);

var version = "0.0.1152";

/******************************************************************************
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
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var classnames = {exports: {}};

/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/

var hasRequiredClassnames;

function requireClassnames () {
	if (hasRequiredClassnames) return classnames.exports;
	hasRequiredClassnames = 1;
	(function (module) {
		/* global define */

		(function () {

			var hasOwn = {}.hasOwnProperty;

			function classNames () {
				var classes = '';

				for (var i = 0; i < arguments.length; i++) {
					var arg = arguments[i];
					if (arg) {
						classes = appendClass(classes, parseValue(arg));
					}
				}

				return classes;
			}

			function parseValue (arg) {
				if (typeof arg === 'string' || typeof arg === 'number') {
					return arg;
				}

				if (typeof arg !== 'object') {
					return '';
				}

				if (Array.isArray(arg)) {
					return classNames.apply(null, arg);
				}

				if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
					return arg.toString();
				}

				var classes = '';

				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes = appendClass(classes, key);
					}
				}

				return classes;
			}

			function appendClass (value, newClass) {
				if (!newClass) {
					return value;
				}
			
				if (value) {
					return value + ' ' + newClass;
				}
			
				return value + newClass;
			}

			if (module.exports) {
				classNames.default = classNames;
				module.exports = classNames;
			} else {
				window.classNames = classNames;
			}
		}()); 
	} (classnames));
	return classnames.exports;
}

var classnamesExports = requireClassnames();
var classNames = /*@__PURE__*/getDefaultExportFromCjs(classnamesExports);

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=globalThis,e$4=t$3.ShadowRoot&&(undefined===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$1=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$4&&undefined===t){const e=undefined!==s&&1===s.length;e&&(t=o$4.get(s)),undefined===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$5=t=>new n$3("string"==typeof t?t:t+"",undefined,s$1),i$4=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$3(o,t,s$1)},S$1=(s,o)=>{if(e$4)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$3.litNonce;undefined!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$4?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$5(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$3,defineProperty:e$3,getOwnPropertyDescriptor:r$4,getOwnPropertyNames:h$1,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$3(t,s),y$1={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;class b extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=y$1){if(s.state&&(s.attribute=false),this._$Ei(),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,s);undefined!==r&&e$3(this.prototype,t,r);}}static getPropertyDescriptor(t,s,i){const{get:e,set:h}=r$4(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get(){return e?.call(this)},set(s){const r=e?.call(this);h.call(this,s),this.requestUpdate(t,r,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??y$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),undefined!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...h$1(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(undefined!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);undefined!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else undefined!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?undefined:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():undefined}constructor(){super(),this._$Ep=undefined,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),undefined!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$EC(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(undefined!==e&&true===i.reflect){const r=(undefined!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==r?this.removeAttribute(e):this.setAttribute(e,r),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(undefined!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),r="function"==typeof t.converter?{fromAttribute:t.converter}:undefined!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e,this[e]=r.fromAttribute(s,t.type),this._$Em=null;}}requestUpdate(t,s,i){if(undefined!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??f$1)(this[t],s))return;this.P(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$ET());}P(t,s,i){this._$AL.has(t)||this._$AL.set(t,s),true===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t);}async _$ET(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=undefined;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t) true!==i.wrapped||this._$AL.has(s)||undefined===this[s]||this.P(s,this[s],i);}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EU();}catch(s){throw t=false,this._$EU(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EU(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU();}updated(t){}firstUpdated(t){}}b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[d$1("elementProperties")]=new Map,b[d$1("finalized")]=new Map,p$1?.({ReactiveElement:b}),(a$1.reactiveElementVersions??=[]).push("2.0.4");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,i$2=t$2.trustedTypes,s=i$2?i$2.createPolicy("lit-html",{createHTML:t=>t}):undefined,e$2="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o$2="?"+h,n$1=`<${o$2}>`,r$3=document,l=()=>r$3.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r$3.createTreeWalker(r$3,129);function P(t,i){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return undefined!==s?s.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":3===i?"<math>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v:undefined!==u[1]?c=_:undefined!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):undefined!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f,d=-1):undefined===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=undefined===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,r=undefined);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n$1:d>=0?(o.push(a),s.slice(0,d)+e$2+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [P(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class N{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=V(t,s);if(this.el=N.createElement(f,n),C.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=C.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e$2)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?H:"?"===e[1]?I:"@"===e[1]?L:k}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i$2?i$2.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),C.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$2)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r$3.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){if(i===T)return i;let h=undefined!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?undefined:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),undefined===o?h=undefined:(h=new o(t),h._$AT(t,s,e)),undefined!==e?(s._$Co??=[])[e]=h:s._$Cl=h),undefined!==h&&(i=S(t,h._$AS(t,i.values),h,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=undefined,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r$3).importNode(i,true);C.currentNode=e;let h=C.nextNode(),o=0,n=0,l=s[0];for(;undefined!==l;){if(o===l.index){let i;2===l.type?i=new R(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new z(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=C.nextNode(),o++);}return C.currentNode=r$3,e}p(t){let i=0;for(const s of this._$AV) undefined!==s&&(undefined!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=E,this._$AN=undefined,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return undefined!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),c(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==T&&this._(t):undefined!==t._$litType$?this.$(t):undefined!==t.nodeType?this.T(t):u(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(r$3.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(undefined===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new M(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return undefined===i&&A.set(t.strings,i=new N(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(false,true,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){ undefined===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=E,this._$AN=undefined,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(undefined===h)t=S(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=S(this,e[s+n],i,n),r===T&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===E?t=E:t!==E&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E?undefined:t;}}class I extends k{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E);}}class L extends k{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=S(this,t,i,0)??E)===T)return;const s=this._$AH,e=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==E&&(s===E||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=undefined,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j=t$2.litHtmlPolyfillSupport;j?.(N,R),(t$2.litHtmlVersions??=[]).push("3.2.1");const B=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(undefined===h){const t=s?.renderBefore??null;e._$litPart$=h=new R(i.insertBefore(l(),t),t,undefined,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let r$2 = class r extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=undefined;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B(s,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return T}};r$2._$litElement$=true,r$2["finalized"]=true,globalThis.litElementHydrateSupport?.({LitElement:r$2});const i$1=globalThis.litElementPolyfillSupport;i$1?.({LitElement:r$2});(globalThis.litElementVersions??=[]).push("4.1.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=t=>(e,o)=>{ undefined!==o?o.addInitializer((()=>{customElements.define(t,e);})):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$1={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o$1,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(undefined===s&&globalThis.litPropertyMetadata.set(i,s=new Map),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t);},init(e){return undefined!==e&&this.P(o,undefined,t),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,r?{...t,wrapped:true}:t),r?Object.getOwnPropertyDescriptor(e,o):undefined})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n({...r,state:true,attribute:false})}

const CONFIG_PROP = {
    TITLE: 'title',
    WEATHER_DEVICE_ID: 'weather_device_id',
    SUMMARY_WEATHER_ENTITY_ID: 'summary_weather_entity_id',
    SHOW_CURRENT_TEMP: 'show_current_temp',
    CURRENT_TEMP_ENTITY_ID: 'current_temp_entity_id',
    SHOW_FEELS_LIKE_TEMP: 'show_feels_like_temp',
    FEELS_LIKE_TEMP_ENTITY_ID: 'feels_like_temp_entity_id',
    SHOW_WEATHER_ICON: 'show_weather_icon',
    WEATHER_ICON_ENTITY_ID: 'weather_icon_entity_id',
    USE_HA_WEATHER_ICONS: 'use_ha_weather_icons',
    SHOW_TIME: 'show_time',
    TIME_ENTITY_ID: 'time_entity_id',
    SHOW_DATE: 'show_date',
    DATE_ENTITY_ID: 'date_entity_id',
    SHOW_NOW_LATER_TEMPS: 'show_now_later_temps',
    NOW_LATER_NOW_TEMP_ENTITY_ID: 'now_later_now_temp_entity_id',
    NOW_LATER_NOW_LABEL_ENTITY_ID: 'now_later_now_label_entity_id',
    NOW_LATER_LATER_TEMP_ENTITY_ID: 'now_later_later_temp_entity_id',
    NOW_LATER_LATER_LABEL_ENTITY_ID: 'now_later_later_label_entity_id',
    SHOW_WARNINGS_COUNT: 'show_warnings_count',
    WARNINGS_COUNT_ENTITY_ID: 'warning_count_entity_id',
    SHOW_RAIN_SUMMARY: 'show_rain_summary',
    RAIN_SUMMARY_ENTITY_ID: 'rain_summary_entity_id',
    SHOW_FORECAST_SUMMARY: 'show_forecast_summary',
    FORECAST_SUMMARY_ENTITY_ID: 'forecast_summary_entity_id',
    SHOW_HOURLY_FORECAST: 'show_hourly_forecast',
    SHOW_DAILY_FORECAST: 'show_daily_forecast',
};

/**
 * Default card configuration
 *
 * Used for two purposes.
 *   1. Setting up a new CardConfig object
 *   2. Checking if the keys in a CardConfig object are valid
 *
 * Be sure to update this object when adding new configuration properties
 */
const DEFAULT_CARD_CONFIG = {
    type: 'custom:bom-weather-card',
    index: undefined,
    view_index: undefined,
    [CONFIG_PROP.TITLE]: undefined,
    [CONFIG_PROP.WEATHER_DEVICE_ID]: undefined,
    [CONFIG_PROP.SUMMARY_WEATHER_ENTITY_ID]: undefined,
    [CONFIG_PROP.SHOW_CURRENT_TEMP]: true,
    [CONFIG_PROP.CURRENT_TEMP_ENTITY_ID]: undefined,
    [CONFIG_PROP.SHOW_FEELS_LIKE_TEMP]: true,
    [CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID]: undefined,
    [CONFIG_PROP.SHOW_WEATHER_ICON]: true,
    [CONFIG_PROP.WEATHER_ICON_ENTITY_ID]: undefined,
    [CONFIG_PROP.USE_HA_WEATHER_ICONS]: undefined,
    [CONFIG_PROP.SHOW_TIME]: undefined,
    [CONFIG_PROP.TIME_ENTITY_ID]: undefined,
    [CONFIG_PROP.SHOW_DATE]: undefined,
    [CONFIG_PROP.DATE_ENTITY_ID]: undefined,
    [CONFIG_PROP.SHOW_NOW_LATER_TEMPS]: true,
    [CONFIG_PROP.NOW_LATER_NOW_TEMP_ENTITY_ID]: undefined,
    [CONFIG_PROP.NOW_LATER_NOW_LABEL_ENTITY_ID]: undefined,
    [CONFIG_PROP.NOW_LATER_LATER_TEMP_ENTITY_ID]: undefined,
    [CONFIG_PROP.NOW_LATER_LATER_LABEL_ENTITY_ID]: undefined,
    [CONFIG_PROP.SHOW_WARNINGS_COUNT]: true,
    [CONFIG_PROP.WARNINGS_COUNT_ENTITY_ID]: undefined,
    [CONFIG_PROP.SHOW_RAIN_SUMMARY]: true,
    [CONFIG_PROP.RAIN_SUMMARY_ENTITY_ID]: undefined,
    [CONFIG_PROP.SHOW_FORECAST_SUMMARY]: true,
    [CONFIG_PROP.FORECAST_SUMMARY_ENTITY_ID]: undefined,
    [CONFIG_PROP.SHOW_HOURLY_FORECAST]: true,
    [CONFIG_PROP.SHOW_DAILY_FORECAST]: true,
};

const LANGUAGE = {
    EN: 'en',
    EN_GB: 'en_gb',
};
const DEFAULT_LANGUAGE = LANGUAGE.EN;

/**
 * These are the config props that represent card entities
 */
const CARD_ENTITIES = [
    CONFIG_PROP.SUMMARY_WEATHER_ENTITY_ID,
    CONFIG_PROP.CURRENT_TEMP_ENTITY_ID,
    CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID,
    CONFIG_PROP.WEATHER_ICON_ENTITY_ID,
    CONFIG_PROP.TIME_ENTITY_ID,
    CONFIG_PROP.DATE_ENTITY_ID,
    CONFIG_PROP.NOW_LATER_NOW_TEMP_ENTITY_ID,
    CONFIG_PROP.NOW_LATER_NOW_LABEL_ENTITY_ID,
    CONFIG_PROP.NOW_LATER_LATER_TEMP_ENTITY_ID,
    CONFIG_PROP.NOW_LATER_LATER_LABEL_ENTITY_ID,
    CONFIG_PROP.WARNINGS_COUNT_ENTITY_ID,
];

const WEATHER_ENTITY_ATTRIBUTE = {
    TEMPERATURE: 'temperature',
    TEMPERATURE_UNIT: 'temperature_unit',
    HUMIDITY: 'humidity',
    PRESSURE_UNIT: 'pressure_unit',
    WIND_BEARING: 'wind_bearing',
    WIND_SPEED: 'wind_speed',
    WIND_SPEED_UNIT: 'wind_speed_unit',
    VISIBILITY_UNIT: 'visibility_unit',
    PRECIPITATION_UNIT: 'precipitation_unit',
    ATTRIBUTION: 'attribution',
    ICON: 'icon',
    FRIENDLY_NAME: 'friendly_name',
    SUPPORTED_FEATURES: 'supported_features',
};

/**
 * These are the rules used to infer the entity IDs from a device name or another entity's attribute.
 * Use '%device_name%' as a placeholder for the device name.
 */
const INFERRED_ENTITY_RULES = {
    // Infer the summary weather entity from the device name "weather.%device_name%"
    [CONFIG_PROP.SUMMARY_WEATHER_ENTITY_ID]: {
        idPattern: {
            parentDeviceConfigProp: CONFIG_PROP.WEATHER_DEVICE_ID,
            pattern: 'weather.%device_name%',
        },
    },
    // Infer the current temperature from the summary weather entity's "temperature" attribute
    [CONFIG_PROP.CURRENT_TEMP_ENTITY_ID]: {
        attributePattern: {
            parentCardEntity: CONFIG_PROP.SUMMARY_WEATHER_ENTITY_ID,
            attribute: WEATHER_ENTITY_ATTRIBUTE.TEMPERATURE,
        },
    },
    // There is no inference for the feels like temperature. It must be defined in the card config.
    [CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID]: {},
    // Infer the weather icon entity from the device name "weather.%device_name%"
    [CONFIG_PROP.WEATHER_ICON_ENTITY_ID]: {
        idPattern: {
            parentDeviceConfigProp: CONFIG_PROP.WEATHER_DEVICE_ID,
            pattern: 'weather.%device_name%',
        },
    },
    // Infer the time entity specifically to "sensor.time"
    [CONFIG_PROP.TIME_ENTITY_ID]: {
        idPattern: {
            parentDeviceConfigProp: undefined,
            pattern: 'sensor.time',
        },
    },
    // Infer the date entity specifically to "sensor.date"
    [CONFIG_PROP.DATE_ENTITY_ID]: {
        idPattern: {
            parentDeviceConfigProp: undefined,
            pattern: 'sensor.date',
        },
    },
    // Infer the "now/later" now temperature entity from the device name "sensor.%device_name%_now_temp_now"
    [CONFIG_PROP.NOW_LATER_NOW_TEMP_ENTITY_ID]: {
        idPattern: {
            parentDeviceConfigProp: CONFIG_PROP.WEATHER_DEVICE_ID,
            pattern: 'sensor.%device_name%_now_temp_now',
        },
    },
    // Infer the "now/later" now label entity from the device name "sensor.%device_name%_now_now_label"
    [CONFIG_PROP.NOW_LATER_NOW_LABEL_ENTITY_ID]: {
        idPattern: {
            parentDeviceConfigProp: CONFIG_PROP.WEATHER_DEVICE_ID,
            pattern: 'sensor.%device_name%_now_now_label',
        },
    },
    // Infer the "now/later" label temperature entity from the device name "sensor.%device_name%_now_temp_later"
    [CONFIG_PROP.NOW_LATER_LATER_TEMP_ENTITY_ID]: {
        idPattern: {
            parentDeviceConfigProp: CONFIG_PROP.WEATHER_DEVICE_ID,
            pattern: 'sensor.%device_name%_now_temp_later',
        },
    },
    // Infer the "now/later" later label entity from the device name "sensor.%device_name%_now_later_label"
    [CONFIG_PROP.NOW_LATER_LATER_LABEL_ENTITY_ID]: {
        idPattern: {
            parentDeviceConfigProp: CONFIG_PROP.WEATHER_DEVICE_ID,
            pattern: 'sensor.%device_name%_now_later_label',
        },
    },
    // Infer the warnings count entity from the device name "sensor.%device_name%_warnings"
    [CONFIG_PROP.WARNINGS_COUNT_ENTITY_ID]: {
        idPattern: {
            parentDeviceConfigProp: CONFIG_PROP.WEATHER_DEVICE_ID,
            pattern: 'sensor.%device_name%_warnings',
        },
    },
};

/**
 * Fetch devices from the Home Assistant device registry
 * @param hass
 * @returns
 */
async function fetchDevices(hass) {
    try {
        return await hass.callWS({ type: 'config/device_registry/list' });
    }
    catch (error) {
        log.error('Error fetching devices', error);
        return [];
    }
}

/**
 * Fetch entities from the Home Assistant entity registry
 * @param hass
 * @param params
 * @returns
 */
async function fetchEntities(hass, params) {
    try {
        const registeredEntities = await hass.callWS({
            type: 'config/entity_registry/list',
            domain: params?.domain,
            area_id: params?.area_id,
        });
        if (params?.device_id) ;
        return registeredEntities;
    }
    catch (error) {
        log.error('Error fetching entities', error);
        return [];
    }
}

/**
 * Calculate the actual entities to use in the card based on the configured
 * weather devices and entities.
 *
 * @param props
 * @returns
 */
const calculateCardEntities = async (hass, config) => {
    // Start by iterating over all keys in the CARD_ENTITIES
    // Any entities that are not set in the config will be set here
    // User's specific config takes precedence
    const cardEntities = {};
    for (const key of CARD_ENTITIES) {
        cardEntities[key] = {
            entity_id: config[key],
            attribute: undefined,
            is_inferred: false,
        };
    }
    // If hass is not available, return the card entities as they are
    if (!hass)
        return cardEntities;
    // fetch all devices and entities from the hass instance
    const devices = await fetchDevices(hass);
    const entities = await fetchEntities(hass);
    // Load the details of the observation device from Home Assistant
    // const weatherDevice: HassDeviceRegistryEntry | undefined = devices.find(
    //   (device) => device.id === config[CONFIG_PROP.WEATHER_DEVICE_ID]
    // );
    let loopEscape = 100;
    let entitiesChanged = true;
    while (entitiesChanged && loopEscape > 0) {
        entitiesChanged = false;
        loopEscape--;
        // Iterate through each of the cardEntities which don't have an entity_id set
        for (const key of CARD_ENTITIES) {
            if (!cardEntities[key].entity_id) {
                const rule = INFERRED_ENTITY_RULES[key];
                if (rule?.idPattern) {
                    let inferredEntityId = rule.idPattern.pattern;
                    const parentDeviceConfigProp = rule.idPattern.parentDeviceConfigProp;
                    let parentDevice;
                    if (parentDeviceConfigProp) {
                        parentDevice = devices.find((device) => device.id === config[parentDeviceConfigProp]);
                        if (parentDevice && parentDevice.name) {
                            const deviceNamePrefix = parentDevice.name
                                .toLowerCase()
                                .replace(' ', '_');
                            inferredEntityId = inferredEntityId.replace('%device_name%', deviceNamePrefix);
                        }
                    }
                    // Find the entity which matches the inferredEntityId
                    const entity = entities.find((entity) => entity.entity_id === inferredEntityId);
                    if (entity) {
                        entitiesChanged = true;
                        cardEntities[key] = {
                            entity_id: inferredEntityId,
                            attribute: undefined,
                            is_inferred: true,
                        };
                    }
                }
                // Use another entities attribute instead of an entity itself
                else if (rule?.attributePattern) {
                    const parentCardEntity = cardEntities[rule.attributePattern.parentCardEntity];
                    if (parentCardEntity?.entity_id) {
                        entitiesChanged = true;
                        cardEntities[key] = {
                            entity_id: parentCardEntity.entity_id,
                            attribute: rule.attributePattern.attribute,
                            is_inferred: true,
                        };
                    }
                }
            }
        }
    }
    return cardEntities;
};

/**
 * Get the value of a card entity
 * CardEntity.attribute will be used if set, otherwise the state will be used
 *
 * @param hass the Home Assistant instance
 * @param cardEntity the entity to get the value of
 *
 * @returns
 */
const getCardEntityValue = (hass, cardEntity) => {
    if (!hass || !cardEntity?.entity_id) {
        return undefined;
    }
    const stateObj = hass.states[cardEntity.entity_id];
    if (!stateObj) {
        return undefined;
    }
    if (!cardEntity.attribute) {
        return stateObj.state;
    }
    return stateObj.attributes[cardEntity.attribute];
};

/**
 * Get the numeric value of a card entity
 * CardEntity.attribute will be used if set, otherwise the state will be used
 *
 * @param hass the Home Assistant instance
 * @param cardEntity the entity to get the value of
 *
 * @returns
 */
const getCardEntityValueAsNumber = (hass, cardEntity) => {
    const value = getCardEntityValue(hass, cardEntity);
    if (value === undefined) {
        return undefined;
    }
    // If the value is already a number, return it
    if (typeof value === 'number') {
        return value;
    }
    // If the value is a string, attempt to parse it as a float
    // Don't throw an error if it fails, just return undefined
    if (typeof value === 'string') {
        try {
            return parseFloat(value);
        }
        catch {
            return undefined;
        }
    }
    return undefined;
};

/**
 * Get the string value of a card entity
 * CardEntity.attribute will be used if set, otherwise the state will be used
 *
 * @param hass the Home Assistant instance
 * @param cardEntity the entity to get the value of
 *
 * @returns
 */
const getCardEntityValueAsString = (hass, cardEntity) => {
    const value = getCardEntityValue(hass, cardEntity);
    if (value === undefined) {
        return undefined;
    }
    // If the value is already a string, return it
    if (typeof value === 'string') {
        return value;
    }
    // If the value is a number, convert it to a string
    if (typeof value === 'number') {
        return value.toString();
    }
    return undefined;
};

const isDayMode = (hass) => {
    return hass?.states['sun.sun']
        ? hass.states['sun.sun'].state === 'above_horizon'
        : true;
};

const shouldRenderEntity = (config, cardEntities, toggleConfigProp, entityConfigProp) => {
    if (!config[toggleConfigProp]) {
        return false;
    }
    if (!cardEntities[entityConfigProp]?.entity_id) {
        return false;
    }
    return true;
};

const subscribeForecast = (hass, entity_id, forecast_type, callback) => hass.connection.subscribeMessage(callback, {
    type: 'weather/subscribe_forecast',
    forecast_type,
    entity_id,
});

var common = {
	version: "Version",
	title: "BOM Weather Card",
	description: "Display weather information in the style of the BOM (Bureau of Meteorology) Australia app."
};
var card = {
	feelsLike: "Feels like"
};
var editor = {
	currentTemperatureEntity: "Current Temperature Entity",
	dailyForecast: "Daily Forecast",
	dateEntity: "Date Entity",
	feelsLikeTemperatureEntity: "Feels Like Temperature Entity",
	forecastSummaryEntity: "Forecast Summary Entity",
	hourlyForecast: "Hourly Forecast",
	laterLabelEntity: "Later Label Entity",
	laterTempEntity: "Later Temp Entity",
	nowLabelEntity: "Now Label Entity",
	nowTempEntity: "Now Temp Entity",
	optional: "Optional",
	rainSummaryEntity: "Rain Summary Entity",
	required: "Required",
	showCurrentTemperature: "Show Current Temperature",
	showDailyForecast: "Show Daily Forecast",
	showDate: "Show Date",
	showFeelsLikeTemperature: "Show Feels Like Temperature",
	showForecastSummary: "Show Forecast Summary",
	showHourlyForecast: "Show Hourly Forecast",
	showNowLaterTemps: "Show Now/Later Temperatures",
	showRainSummary: "Show Rain Summary",
	showTime: "Show Time",
	showWarningsCount: "Show Warnings Count",
	showWeatherIcon: "Show Weather Icon",
	summary: "Summary",
	summaryWeatherEntity: "Summary Weather Entity",
	timeEntity: "Time Entity",
	title: "Title",
	useDefaultHaWeatherIcons: "Use Default HA Weather Icons",
	warningsCountEntity: "Warnings Count Entity",
	weatherIconEntity: "Weather Icon Entity",
	weatherDevice: "Weather Device"
};
var error = {
	invalidConfigProperty: "Invalid config property: {property}",
	failedToPreLoadElement: " Failed to pre-load HA element: {element}"
};
var en = {
	common: common,
	card: card,
	editor: editor,
	error: error
};

var en$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	card: card,
	common: common,
	default: en,
	editor: editor,
	error: error
});

/**
 * Add new languages here when they are added
 */
const languageStrings = {
    [LANGUAGE.EN]: en$1, // English
    [LANGUAGE.EN_GB]: en$1, // English
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function getLocalizer(lang = DEFAULT_LANGUAGE) {
    const targetLang = (lang || '')
        .replace(/['"]+/g, '')
        .replace('-', '_')
        .toLowerCase();
    console.assert(Object.values(LANGUAGE).includes(targetLang), `Invalid language: ${targetLang}`);
    /**
     * Localize a string
     * @param string - The string to localize
     * @param substitute - An object containing key value pairs to substitute in the string
     *
     * @example
     * localize('error.invalidConfigProperty', {property: 'title'})
     *
     * @returns The localized string
     */
    return function localize(string, substitute = {}) {
        let translated;
        try {
            translated = string
                .split('.')
                .reduce((o, i) => o[i], languageStrings[targetLang]);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (e) {
            translated = string
                .split('.')
                .reduce((o, i) => o[i], languageStrings[DEFAULT_LANGUAGE]);
        }
        if (translated === undefined)
            translated = string
                .split('.')
                .reduce((o, i) => o[i], languageStrings[DEFAULT_LANGUAGE]);
        // Iterate over each of the keyvalue pairs in the substitute object and replace
        // the key found in the input string with the value
        for (const [search, replace] of Object.entries(substitute)) {
            translated = translated.replace(`{${search}}`, replace);
        }
        return translated;
    };
}

const containerStyles = i$4 `
  .item-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    &.reverse {
      flex-wrap: wrap-reverse;
    }

    &.column {
      flex-direction: column;
    }

    &.justify-left {
      justify-content: flex-start;
    }

    .item {
      --bwc-item-justify-content: flex-start;
      flex: 1;
      display: flex;
      justify-content: var(--bwc-item-justify-content);

      &.left {
        --bwc-item-justify-content: flex-start;
      }

      &.center {
        --bwc-item-justify-content: center;
      }

      &.right {
        --bwc-item-justify-content: flex-end;
      }

      &.no-grow {
        flex-grow: 0;
      }
    }
  }
`;

const cssVariables = i$4 `
  :host {
    /* Bom Weather Card Custom CSS Variables */
    --bwc-large-font-size: 4rem;
    --bwc-medium-font-size: 2rem;
    --bwc-regular-font-size: 1.2rem;

    --bwc-background-color-day-start: #63b0ff;
    --bwc-background-color-day-end: #c4e1ff;
    --bwc-background-color-night-start: #001d3b;
    --bwc-background-color-night-end: #013565;
    --bwc-time-date-time-font-size: var(--bwc-large-font-size);
    --bwc-time-date-date-font-size: var(--bwc-regular-font-size);
    --bwc-temperature-number-large-font-size: var(--bwc-large-font-size);
    --bwc-temperature-number-font-size: var(--bwc-medium-font-size);
    --bwc-temperature-description-font-size: var(--bwc-regular-font-size);
    --bwc-value-label-value-font-size: var(--bwc-medium-font-size);
    --bwc-value-label-label-font-size: var(--bwc-regular-font-size);
    --bwc-weather-icon-height: 7rem;
    --bwc-min-height: 10rem;
    --bwc-global-padding: 16px;
    --bwc-item-container-height: 5rem;
    --bwc-warning-no-warnings-background-color: #f5f5f5;
    --bwc-warning-has-warnings-background-color: #fdb404;
    --bwc-warning-icon-size: var(--bwc-medium-font-size);
    --bwc-warning-font-size: var(--bwc-regular-font-size);

    /* Conditional Colors based on Day/Night and Dark/Light Theme */
    /* Light Theme / Day Mode */
    --bwc-text-color: var(--text-light-primary-color);
    --bwc-background-color-start: var(--bwc-background-color-day-start);
    --bwc-background-color-end: var(--bwc-background-color-day-end);

    /* Light Theme / Night Mode */
    &.night {
      --bwc-text-color: var(--text-primary-color);
      --bwc-background-color-start: var(--bwc-background-color-night-start);
      --bwc-background-color-end: var(--bwc-background-color-night-end);
    }

    /* Dark Theme / Day Mode */
    &.dark-mode {
      color: var(--text-light-primary-color);

      /* Dark Theme / Night Mode */
      &.night {
        color: var(--text-primary-color);
      }
    }

    /* Home Assistant Theme Overrides */
    --ha-card-header-color: var(--bwc-text-color);
  }
`;

i$4 `
  :host {
    --bwc-debug-element-border: 1px solid red;
    --bwc-debug-container-border: 1px solid orange;

    .bwc-debug {
      display: block;
    }

    & > div,
    & > div > span,
    div.bwc-debug {
      box-sizing: border-box;
      border: var(--bwc-debug-element-border);
    }

    .container {
      box-sizing: border-box;
      border: var(--bwc-debug-container-border);
    }
  }
`;

const compileTimeDebugStyles = i$4``;
const globalStyles = i$4 `
  :host {
    .bwc-debug {
      display: none;
    }

    .bwc-icon svg {
      height: 1em;
      width: 1em;
      line-height: 1em;
    }
  }

  ${compileTimeDebugStyles}
`;

let BomWeatherCard = class BomWeatherCard extends r$2 {
    constructor() {
        super(...arguments);
        this._config = { ...DEFAULT_CARD_CONFIG };
        this._cardEntities = {};
        this._dayMode = true;
        this._darkMode = false;
        this.language = DEFAULT_LANGUAGE;
        this.localize = getLocalizer(this.language);
        this._initialized = false;
    }
    static get styles() {
        return i$4 `
      ${cssVariables}
      ${globalStyles}
      ${containerStyles}
      
      ha-card {
        color: var(--bwc-text-color);

        /* TODO: make this configurable */
        background: linear-gradient(
          to bottom,
          var(--bwc-background-color-start),
          var(--bwc-background-color-end)
        );
        min-height: var(--bwc-min-height);

        /* TODO: make this configurable */
        border: none;
      }

      h1.card-header {
        padding-bottom: 0;
      }

      span.version {
        padding: var(--bwc-global-padding);
      }
    `;
    }
    static getStubConfig() {
        // TODO: this needs to be implemented properly so that the preview in the card picker renders sample data
        return { ...DEFAULT_CARD_CONFIG };
    }
    setConfig(config) {
        if (!config) {
            throw new Error(this.localize('error.invalidConfigProperty'));
        }
        this._config = { ...this._config, ...config };
    }
    async _calculateCardEntities() {
        this._cardEntities = await calculateCardEntities(this.hass, this._config);
        log.debug('Card Entities Recalculated:', this._cardEntities);
    }
    /**
     * Unsubscribe from Home Assistant forecast events
     * Typically called when the card is disconnected from the DOM or
     * when the card is updated with a new config
     */
    _unsubscribeForecastEvents() {
        if (this._dailyForecastSubscribed) {
            this._dailyForecastSubscribed.then((unsub) => unsub()).catch(() => { });
            this._dailyForecastSubscribed = undefined;
        }
        //TODO: _hourlyForecastSubscribed
    }
    async _subscribeForecastEvents() {
        this._unsubscribeForecastEvents();
        if (!this.isConnected ||
            !this._initialized ||
            !this.hass ||
            !this._config) {
            return;
        }
        const forecastEntityId = this._cardEntities[CONFIG_PROP.SUMMARY_WEATHER_ENTITY_ID]?.entity_id;
        log.trace('_subscribeForecastEvents()', { forecastEntityId });
        if (!forecastEntityId) {
            log.warn('⚠️ No Forecast Entity specified. Skipping subscription to daily forecast.');
            return;
        }
        this._dailyForecastSubscribed = subscribeForecast(this.hass, forecastEntityId, 'daily', //TODO: implement this "daily" | "hourly" | "twice_daily"
        (event) => {
            log.debug('Daily Forecast Subscribed.', event);
            this._dailyForecastEvent = event;
        });
    }
    firstUpdated() {
        const initTasks = [this._calculateCardEntities];
        Promise.all(initTasks.map((task) => task.bind(this)())).finally(() => {
            this._initialized = true;
        });
    }
    updated(changedProps) {
        super.updated(changedProps);
        log.trace('updated():', changedProps);
        // Subscribe to forecast events if not already subscribed
        if (!this._dailyForecastSubscribed || changedProps.has('_config')) {
            this._subscribeForecastEvents();
        }
        if (changedProps.has('_config')) {
            log.debug('config changed', this._config);
            this._calculateCardEntities();
        }
        if (changedProps.has('_dailyForecastEvent')) {
            log.debug('_dailyForecastEvent changed', this._dailyForecastEvent);
        }
        const oldHass = changedProps.get('hass');
        // const oldConfig = changedProps.get('_config') as CardConfig | undefined;
        if (changedProps.has('hass') &&
            !oldHass // ||
        // (changedProps.has('_config') && !oldConfig) ||
        // (changedProps.has('hass') && oldHass!.themes !== this.hass.themes) ||
        // (changedProps.has('_config') && oldConfig!.theme !== this._config.theme)
        ) {
            this._dayMode = isDayMode(this.hass);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this._darkMode = this.hass.themes.darkMode === true;
            if (this.hass.locale?.language !== this.language) {
                this.language = this.hass.locale?.language;
                this.localize = getLocalizer(this.language);
            }
        }
    }
    connectedCallback() {
        log.debug('✅ connected to DOM');
        super.connectedCallback();
        if (this.hasUpdated && this._config && this.hass) {
            this._subscribeForecastEvents();
        }
    }
    disconnectedCallback() {
        log.debug('❌ disconnected from DOM');
        super.disconnectedCallback();
        this._unsubscribeForecastEvents();
    }
    _renderSummary() {
        const showCurrentTemp = shouldRenderEntity(this._config, this._cardEntities, CONFIG_PROP.SHOW_CURRENT_TEMP, CONFIG_PROP.CURRENT_TEMP_ENTITY_ID);
        const showWeatherIcon = shouldRenderEntity(this._config, this._cardEntities, CONFIG_PROP.SHOW_WEATHER_ICON, CONFIG_PROP.WEATHER_ICON_ENTITY_ID);
        const showTime = shouldRenderEntity(this._config, this._cardEntities, CONFIG_PROP.SHOW_TIME, CONFIG_PROP.TIME_ENTITY_ID);
        const showDate = shouldRenderEntity(this._config, this._cardEntities, CONFIG_PROP.SHOW_DATE, CONFIG_PROP.DATE_ENTITY_ID);
        const showFeelsLikeTemperature = shouldRenderEntity(this._config, this._cardEntities, CONFIG_PROP.SHOW_FEELS_LIKE_TEMP, CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID);
        const showNowLater = this._config[CONFIG_PROP.SHOW_NOW_LATER_TEMPS] === true;
        const showNowLaterNow = shouldRenderEntity(this._config, this._cardEntities, CONFIG_PROP.SHOW_NOW_LATER_TEMPS, CONFIG_PROP.NOW_LATER_NOW_TEMP_ENTITY_ID);
        const showNowLaterLater = shouldRenderEntity(this._config, this._cardEntities, CONFIG_PROP.SHOW_NOW_LATER_TEMPS, CONFIG_PROP.NOW_LATER_LATER_TEMP_ENTITY_ID);
        const showWarningsCount = shouldRenderEntity(this._config, this._cardEntities, CONFIG_PROP.SHOW_WARNINGS_COUNT, CONFIG_PROP.WARNINGS_COUNT_ENTITY_ID);
        return x `<div class="summary">
      <!-- First Row (Current temp, weather icon and time/date) -->
      ${showCurrentTemp || showWeatherIcon || showTime
            ? x `<div class="item-container reverse">
            <!-- Current Temperature -->
            ${showCurrentTemp
                ? x `<bwc-temperature-element
                  class="item"
                  .localize=${this.localize}
                  .isLarge=${true}
                  .value=${getCardEntityValueAsNumber(this.hass, this._cardEntities[CONFIG_PROP.CURRENT_TEMP_ENTITY_ID])}
                  .feelsLikeTemperature=${showFeelsLikeTemperature
                    ? getCardEntityValueAsNumber(this.hass, this._cardEntities[CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID])
                    : undefined}
                ></bwc-temperature-element>`
                : E}

            <!-- Weather Icon  -->
            ${showWeatherIcon
                ? x `<bwc-weather-icon-element
                  class=${classNames('item', {
                    center: showTime,
                    right: !showTime,
                })}
                  .useHAWeatherIcons=${this._config[CONFIG_PROP.USE_HA_WEATHER_ICONS] === true}
                  .weatherIcon=${getCardEntityValueAsString(this.hass, this._cardEntities[CONFIG_PROP.WEATHER_ICON_ENTITY_ID])}
                ></bwc-weather-icon-element>`
                : E}

            <!-- Time -->
            ${showTime
                ? x `<bwc-time-date-element
                  class="item right"
                  .hass=${this.hass}
                  .showDate=${showDate}
                  .cardTimeEntity=${this._cardEntities[CONFIG_PROP.TIME_ENTITY_ID]}
                  .cardDateEntity=${this._cardEntities[CONFIG_PROP.DATE_ENTITY_ID]}
                ></bwc-time-date-element>`
                : E}
          </div> `
            : E}

      <!-- Second Row (now/later temps and warnings) -->
      ${showNowLater || showWarningsCount
            ? x `<div class="item-container justify-left">
            ${showNowLaterNow
                ? x `<bwc-temperature-element
                  class="item left no-grow"
                  .value=${getCardEntityValueAsNumber(this.hass, this._cardEntities[CONFIG_PROP.NOW_LATER_NOW_TEMP_ENTITY_ID])}
                  .label=${getCardEntityValueAsString(this.hass, this._cardEntities[CONFIG_PROP.NOW_LATER_NOW_LABEL_ENTITY_ID])}
                ></bwc-temperature-element> `
                : E}
            ${showNowLaterLater
                ? x `<bwc-temperature-element
                  class="item left no-grow"
                  .value=${getCardEntityValueAsNumber(this.hass, this._cardEntities[CONFIG_PROP.NOW_LATER_LATER_TEMP_ENTITY_ID])}
                  .label=${getCardEntityValueAsString(this.hass, this._cardEntities[CONFIG_PROP.NOW_LATER_LATER_LABEL_ENTITY_ID])}
                ></bwc-temperature-element> `
                : E}
            ${showWarningsCount
                ? x `<bwc-warnings-icon-element
                  class="item right"
                  .value=${getCardEntityValueAsNumber(this.hass, this._cardEntities[CONFIG_PROP.WARNINGS_COUNT_ENTITY_ID])}
                ></bwc-warnings-icon-element> `
                : E}
          </div> `
            : E}

      <!-- Third and Fourth Row -->
      <div class="item-container column">
        <bwc-value-label-element
          class="item"
          value="0-1mm"
          label="Rain"
        ></bwc-value-label-element>

        <bwc-value-label-element
          class="item"
          value="Becoming Sunny"
        ></bwc-value-label-element>
      </div>
    </div> `;
    }
    render() {
        log.trace('🖼️ Rendering card with state:', {
            hass: this.hass,
            config: this._config,
            forecast: this._dailyForecastEvent,
        });
        return x `<ha-card
      class="${classNames({
            day: this._dayMode,
            night: !this._dayMode,
            'dark-mode': this._darkMode,
            'light-mode': !this._darkMode,
        })}"
    >
      <!-- Card Header -->
      ${this._config.title
            ? x `<h1 class="card-header">${this._config.title}</h1>`
            : E}

      <!-- Summary -->
      ${this._renderSummary()}

      <!-- Debug Info -->
      <div class="bwc-debug item-container">
        <span class="version">Version ${version}</span>
      </div>
    </ha-card> `;
    }
    /**
     * Called by Home Assistant to get element responsible for rendering the card editor
     *
     * @returns {Promise<LitElement>} An instance of the BomWeatherCardEditor element
     */
    static async getConfigElement() {
        await Promise.resolve().then(function () { return bomWeatherCardEditor; });
        return document.createElement('bom-weather-card-editor');
    }
};
__decorate([
    n({ attribute: false })
], BomWeatherCard.prototype, "hass", undefined);
__decorate([
    r()
], BomWeatherCard.prototype, "_config", undefined);
__decorate([
    r()
], BomWeatherCard.prototype, "_cardEntities", undefined);
__decorate([
    r()
], BomWeatherCard.prototype, "_dayMode", undefined);
__decorate([
    r()
], BomWeatherCard.prototype, "_darkMode", undefined);
__decorate([
    r()
], BomWeatherCard.prototype, "_weatherSummaryData", undefined);
__decorate([
    r()
], BomWeatherCard.prototype, "_dailyForecastSubscribed", undefined);
__decorate([
    r()
], BomWeatherCard.prototype, "_dailyForecastEvent", undefined);
BomWeatherCard = __decorate([
    t$1('bom-weather-card')
], BomWeatherCard);

const elementStyles = i$4 `
  ${globalStyles}

  :host {
    display: block;
  }
`;

let temperatureElement = class temperatureElement extends r$2 {
    constructor() {
        super(...arguments);
        this.isLarge = false;
    }
    render() {
        return x `<div
      class=${classNames('temperature-element', { large: this.isLarge })}
    >
      <span class="number">${this.value ?? '-'}&deg;</span>
      ${this.feelsLikeTemperature !== undefined
            ? x `
            <span class="feels-like"
              >${this.localize('card.feelsLike')}&nbsp;<strong
                >${this.feelsLikeTemperature}&deg;</strong
              ></span
            >
          `
            : E}
      ${this.label !== undefined
            ? x `<span class="label">${this.label}</span>`
            : E}
    </div>`;
    }
    static get styles() {
        return i$4 `
      ${elementStyles}

      .temperature-element {
        padding: var(--bwc-global-padding);
        flex: 1;
        display: flex;
        flex-direction: column;

        .number {
          font-size: var(--bwc-temperature-number-font-size);
          line-height: 1em;
          font-weight: 500;
          width: fit-content;
        }

        &.large {
          .number {
            font-size: var(--bwc-temperature-number-large-font-size);
          }
        }

        .number + .label,
        .number + .feels-like,
        .feels-like + .label {
          margin-top: 0.5em;
        }

        .feels-like,
        .label {
          font-size: var(--bwc-temperature-description-font-size);
          line-height: 1em;
          width: fit-content;
          white-space: nowrap;
        }
      }
    `;
    }
};
__decorate([
    n({ type: Boolean })
], temperatureElement.prototype, "isLarge", undefined);
__decorate([
    n({ type: Number })
], temperatureElement.prototype, "value", undefined);
__decorate([
    n({ type: Number })
], temperatureElement.prototype, "feelsLikeTemperature", undefined);
__decorate([
    n()
], temperatureElement.prototype, "label", undefined);
__decorate([
    n()
], temperatureElement.prototype, "localize", undefined);
temperatureElement = __decorate([
    t$1('bwc-temperature-element')
], temperatureElement);

let TimeElement = class TimeElement extends r$2 {
    constructor() {
        super(...arguments);
        this.showDate = false;
    }
    _update() {
        if (this.hass) {
            this._currentTime = getCardEntityValueAsString(this.hass, this.cardTimeEntity);
            this._currentDate = getCardEntityValueAsString(this.hass, this.cardDateEntity);
        }
    }
    connectedCallback() {
        super.connectedCallback();
        this._interval = window.setInterval(() => {
            this._update();
        }, 1000);
        this._update();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._interval) {
            clearInterval(this._interval);
        }
    }
    render() {
        const showDate = this.showDate && this._currentDate;
        return x `<div class=${classNames('time-date-element')}>
      <span class="time">${this._currentTime}</span>
      ${showDate
            ? x `<span class="date">${this._currentDate}</span>`
            : E}
    </div>`;
    }
    static get styles() {
        return i$4 `
      ${elementStyles}

      .time-date-element {
        padding: var(--bwc-global-padding);
        flex: 1;
        display: flex;
        align-items: var(--bwc-item-justify-content);
        flex-direction: column;

        .time {
          font-size: var(--bwc-time-date-time-font-size);
          line-height: 1em;
          font-weight: 500;
          width: fit-content;
        }

        .time + .date {
          margin-top: 0.5em;
        }

        .date {
          font-size: var(--bwc-time-date-date-font-size);
          line-height: 1em;
          word-wrap: break-word;
          width: fit-content;
        }
      }
    `;
    }
};
__decorate([
    n({ attribute: false })
], TimeElement.prototype, "hass", undefined);
__decorate([
    n({ type: Boolean })
], TimeElement.prototype, "showDate", undefined);
__decorate([
    n({ type: Object })
], TimeElement.prototype, "cardTimeEntity", undefined);
__decorate([
    n({ type: Object })
], TimeElement.prototype, "cardDateEntity", undefined);
__decorate([
    r()
], TimeElement.prototype, "_currentTime", undefined);
__decorate([
    r()
], TimeElement.prototype, "_currentDate", undefined);
TimeElement = __decorate([
    t$1('bwc-time-date-element')
], TimeElement);

let ValueLabelElement = class ValueLabelElement extends r$2 {
    render() {
        return x `<div class=${classNames('value-label-element')}>
      ${this.value && x `<span class="value">${this.value}</span>`}
      ${this.label && x `<span class="label">${this.label}</span>`}
    </div>`;
    }
    static get styles() {
        return i$4 `
      ${elementStyles}

      :host {
        .value-label-element {
          padding: var(--bwc-global-padding);
          padding-top: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .value {
          font-size: var(--bwc-value-label-value-font-size);
          line-height: 1em;
          font-weight: 500;
          width: fit-content;
        }

        .value + .label {
          margin-top: 0.5em;
        }

        .label {
          font-size: var(--bwc-value-label-label-font-size);
          line-height: 1em;
          width: fit-content;
          white-space: nowrap;
        }
      }
    `;
    }
};
__decorate([
    n()
], ValueLabelElement.prototype, "value", undefined);
__decorate([
    n()
], ValueLabelElement.prototype, "label", undefined);
ValueLabelElement = __decorate([
    t$1('bwc-value-label-element')
], ValueLabelElement);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$1=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class e extends i{constructor(i){if(super(i),this.it=E,i.type!==t.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===E||null==r)return this._t=undefined,this.it=r;if(r===T)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this._t;this.it=r;const s=[r];return s.raw=s,this._t={_$litType$:this.constructor.resultType,strings:s,values:[]}}}e.directiveName="unsafeHTML",e.resultType=1;const o=e$1(e);

var warning = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" id=\"Layer_1\" data-name=\"Layer 1\" viewBox=\"0 0 24 24\" width=\"512\" height=\"512\"><path d=\"M23.64,18.1L14.24,2.28c-.47-.8-1.3-1.28-2.24-1.28s-1.77,.48-2.23,1.28L.36,18.1h0c-.47,.82-.47,1.79,0,2.6s1.31,1.3,2.24,1.3H21.41c.94,0,1.78-.49,2.24-1.3s.46-1.78-.01-2.6Zm-10.64-.1h-2v-2h2v2Zm0-4h-2v-6h2v6Z\"/></svg>";

const ICON = {
    WARNING: warning,
};

let WarningsIconElement = class WarningsIconElement extends r$2 {
    render() {
        return x `<div
      class=${classNames('warnings-icon-element', {
            'has-warnings': this.value && this.value > 0,
        })}
    >
      <div class="icon-value-wrapper">
        <div class="bwc-icon">${x `${o(ICON.WARNING)}`}</div>
        <div class="value-wrapper">
          <span class="value">${this.value}</span>
        </div>
      </div>
    </div>`;
    }
    static get styles() {
        return i$4 `
      ${elementStyles}

      .warnings-icon-element {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        padding: var(--bwc-global-padding);

        .icon-value-wrapper {
          background-color: var(--bwc-warning-no-warnings-background-color);
          display: flex;

          .bwc-icon {
            padding: 0.5em;
            display: flex;
            align-items: center;
            justify-content: center;

            svg {
              height: var(--bwc-warning-icon-size);
              width: var(--bwc-warning-icon-size);
            }
          }

          .value-wrapper {
            padding: 0.5em;
            font-size: var(--bwc-warning-font-size);
            display: flex;
            align-items: center;
          }
        }

        &.has-warnings {
          .icon-value-wrapper {
            background-color: var(--bwc-warning-has-warnings-background-color);
          }
        }
      }
    `;
    }
};
__decorate([
    n({ type: Number })
], WarningsIconElement.prototype, "value", undefined);
WarningsIconElement = __decorate([
    t$1('bwc-warnings-icon-element')
], WarningsIconElement);

// These strings are used to filter out weather-related entities
// from the Home Assistant API response. If there are other weather-related
// entities that you would like to include, add them here.
const weatherEntityStrings = [
    'weather.',
    'forecast',
    'humidity',
    'temperature',
    'temp',
    'wind',
    'precipitation',
    'rain',
    'snow',
    'storm',
    'cloud',
    'uv',
    'sun',
    'dew',
    'barometer',
    'pressure',
    'visibility',
    'air_quality',
    'weather',
];

async function fetchWeatherDevices(hass) {
    let devices = [];
    let entities = [];
    const weatherDeviceIds = new Set();
    try {
        // Fetch all devices
        devices = await fetchDevices(hass);
        // Fetch all entities
        entities = await fetchEntities(hass);
        // Filter weather-related entities
        const weatherEntities = entities.filter((e) => e.device_id &&
            e.device_id.length > 0 && // Ensure it's tied to a device
            weatherEntityStrings.some((str) => e.entity_id.includes(str)));
        // Collect device IDs that have weather-related entities
        weatherEntities.forEach((e) => {
            if (e.device_id)
                weatherDeviceIds.add(e.device_id);
        });
        // Filter only devices that have at least one weather-related entity
        return devices.filter((d) => weatherDeviceIds.has(d.id));
    }
    catch (error) {
        log.error('Error fetching weather-related devices', error);
        throw error;
    }
}

let WeatherDevicePickerElement = class WeatherDevicePickerElement extends r$2 {
    constructor() {
        super(...arguments);
        this.label = 'Select a Weather Device';
        this.value = '';
        this.boobs = '';
        this._initialized = false;
        this.weatherDevices = [];
    }
    firstUpdated() {
        this._fetchWeatherDevices();
        this._initialized = true;
    }
    // Override the updated method
    updated(changedProperties) {
        if (changedProperties.has('hass')) {
            this._fetchWeatherDevices();
        }
    }
    _handleOpenedChanged(event) {
        // Fetch items only when the dropdown is opened
        if (event.detail.value) {
            this._fetchWeatherDevices();
        }
    }
    async _fetchWeatherDevices() {
        if (!this.hass)
            return;
        try {
            this.weatherDevices = await fetchWeatherDevices(this.hass);
        }
        catch (e) {
            log.error('Error fetching weather-related devices', e);
        }
    }
    _handleValueChanged(event) {
        if (!this._initialized)
            return;
        this.value = event.detail.value;
        this.dispatchEvent(new CustomEvent('value-changed', {
            detail: { value: this.value },
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        return x `
      <ha-combo-box
        class="weather-device-picker-element"
        label=${this.label}
        .items=${this.weatherDevices.map((device) => ({
            value: device.id, // Store device ID as value
            label: device.name, // Display name
        }))}
        .value=${this.value ?? ''}
        @value-changed=${this._handleValueChanged}
        @opened-changed=${this._handleOpenedChanged}
        allowCustomValue="true"
      >
      </ha-combo-box>
    `;
    }
    _clearSelection() {
        this.value = '';
        this.dispatchEvent(new CustomEvent('value-changed', {
            detail: { value: '' },
            bubbles: true,
            composed: true,
        }));
    }
    static get styles() {
        return i$4 `
      ${elementStyles}
    `;
    }
};
__decorate([
    n({ attribute: false })
], WeatherDevicePickerElement.prototype, "hass", undefined);
__decorate([
    n({ type: String })
], WeatherDevicePickerElement.prototype, "label", undefined);
__decorate([
    n({ type: String, reflect: true })
], WeatherDevicePickerElement.prototype, "value", undefined);
__decorate([
    n({ type: String, reflect: true })
], WeatherDevicePickerElement.prototype, "boobs", undefined);
__decorate([
    r()
], WeatherDevicePickerElement.prototype, "weatherDevices", undefined);
WeatherDevicePickerElement = __decorate([
    t$1('bwc-weather-device-picker-element')
], WeatherDevicePickerElement);

var clearNight = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"a\" x1=\"21.92\" x2=\"38.52\" y1=\"18.75\" y2=\"47.52\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#86c3db\"/><stop offset=\".45\" stop-color=\"#86c3db\"/><stop offset=\"1\" stop-color=\"#5eafcf\"/><animateTransform attributeName=\"gradientTransform\" dur=\"10s\" repeatCount=\"indefinite\" type=\"rotate\" values=\"5 32 32; -15 32 32; 5 32 32\"/></linearGradient></defs><path fill=\"url(#a)\" stroke=\"#72b9d5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\".5\" d=\"M46.66 36.2a16.66 16.66 0 01-16.78-16.55 16.29 16.29 0 01.55-4.15A16.56 16.56 0 1048.5 36.1c-.61.06-1.22.1-1.84.1z\"><animateTransform attributeName=\"transform\" dur=\"10s\" repeatCount=\"indefinite\" type=\"rotate\" values=\"-5 32 32; 15 32 32; -5 32 32\"/></path></svg>";

var cloudy = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"a\" x1=\"22.56\" x2=\"39.2\" y1=\"21.96\" y2=\"50.8\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#f3f7fe\"/><stop offset=\".45\" stop-color=\"#f3f7fe\"/><stop offset=\"1\" stop-color=\"#deeafb\"/></linearGradient></defs><path fill=\"url(#a)\" stroke=\"#e6effc\" stroke-miterlimit=\"10\" stroke-width=\".5\" d=\"M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z\"><animateTransform attributeName=\"transform\" dur=\"7s\" repeatCount=\"indefinite\" type=\"translate\" values=\"-3 0; 3 0; -3 0\"/></path></svg>";

var exceptional = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"a\" x1=\"21.97\" x2=\"42.03\" y1=\"14.63\" y2=\"49.37\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#d4d7dd\"/><stop offset=\".45\" stop-color=\"#d4d7dd\"/><stop offset=\"1\" stop-color=\"#bec1c6\"/><animateTransform attributeName=\"gradientTransform\" dur=\"1s\" repeatCount=\"indefinite\" type=\"rotate\" values=\"0 32 32; 360 32 32\"/></linearGradient></defs><path fill=\"none\" stroke=\"url(#a)\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"3\" d=\"M43 32a11 11 0 11-11-11 11 11 0 0111 11zM25 14.61l-.48 1a33.68 33.68 0 00-3.42 17.82h0M39 49.39l.48-1a33.68 33.68 0 003.42-17.82h0\"><animateTransform attributeName=\"transform\" dur=\"1s\" repeatCount=\"indefinite\" type=\"rotate\" values=\"360 32 32; 0 32 32\"/></path></svg>";

var fog = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"b\" x1=\"22.56\" x2=\"39.2\" y1=\"21.96\" y2=\"50.8\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#f3f7fe\"/><stop offset=\".45\" stop-color=\"#f3f7fe\"/><stop offset=\"1\" stop-color=\"#deeafb\"/></linearGradient><linearGradient id=\"a\" x1=\"27.5\" x2=\"36.5\" y1=\"50.21\" y2=\"65.79\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#d4d7dd\"/><stop offset=\".45\" stop-color=\"#d4d7dd\"/><stop offset=\"1\" stop-color=\"#bec1c6\"/></linearGradient><linearGradient id=\"c\" y1=\"44.21\" y2=\"59.79\" xlink:href=\"#a\"/></defs><path fill=\"url(#b)\" stroke=\"#e6effc\" stroke-miterlimit=\"10\" stroke-width=\".5\" d=\"M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z\"/><path fill=\"none\" stroke=\"url(#a)\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"3\" d=\"M17 58h30\"><animateTransform attributeName=\"transform\" begin=\"0s\" dur=\"5s\" repeatCount=\"indefinite\" type=\"translate\" values=\"-4 0; 4 0; -4 0\"/></path><path fill=\"none\" stroke=\"url(#c)\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"3\" d=\"M17 52h30\"><animateTransform attributeName=\"transform\" begin=\"-4s\" dur=\"5s\" repeatCount=\"indefinite\" type=\"translate\" values=\"-4 0; 4 0; -4 0\"/></path></svg>";

var hail = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"b\" x1=\"22.56\" x2=\"39.2\" y1=\"21.96\" y2=\"50.8\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#f3f7fe\"/><stop offset=\".45\" stop-color=\"#f3f7fe\"/><stop offset=\"1\" stop-color=\"#deeafb\"/></linearGradient><linearGradient id=\"a\" x1=\"23.25\" x2=\"24.75\" y1=\"43.7\" y2=\"46.3\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#86c3db\"/><stop offset=\".45\" stop-color=\"#86c3db\"/><stop offset=\"1\" stop-color=\"#5eafcf\"/></linearGradient><linearGradient id=\"c\" x1=\"30.25\" x2=\"31.75\" y1=\"43.7\" y2=\"46.3\" xlink:href=\"#a\"/><linearGradient id=\"d\" x1=\"37.25\" x2=\"38.75\" y1=\"43.7\" y2=\"46.3\" xlink:href=\"#a\"/></defs><path fill=\"url(#b)\" stroke=\"#e6effc\" stroke-miterlimit=\"10\" stroke-width=\".5\" d=\"M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z\"/><path fill=\"url(#a)\" d=\"M24 43.5a1.5 1.5 0 101.5 1.5 1.5 1.5 0 00-1.5-1.5z\"><animateTransform attributeName=\"transform\" dur=\"0.6s\" repeatCount=\"indefinite\" type=\"translate\" values=\"1 -5; -2 18; -4 14\"/><animate attributeName=\"opacity\" dur=\"0.6s\" repeatCount=\"indefinite\" values=\"1;1;0\"/></path><path fill=\"url(#c)\" d=\"M31 43.5a1.5 1.5 0 101.5 1.5 1.5 1.5 0 00-1.5-1.5z\"><animateTransform attributeName=\"transform\" begin=\"-0.4s\" dur=\"0.6s\" repeatCount=\"indefinite\" type=\"translate\" values=\"1 -5; -2 18; -4 14\"/><animate attributeName=\"opacity\" begin=\"-0.4s\" dur=\"0.6s\" repeatCount=\"indefinite\" values=\"1;1;0\"/></path><path fill=\"url(#d)\" d=\"M38 43.5a1.5 1.5 0 101.5 1.5 1.5 1.5 0 00-1.5-1.5z\"><animateTransform attributeName=\"transform\" begin=\"-0.2s\" dur=\"0.6s\" repeatCount=\"indefinite\" type=\"translate\" values=\"1 -5; -2 18; -4 14\"/><animate attributeName=\"opacity\" begin=\"-0.2s\" dur=\"0.6s\" repeatCount=\"indefinite\" values=\"1;1;0\"/></path></svg>";

var lightningRainy = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"b\" x1=\"22.56\" x2=\"39.2\" y1=\"21.96\" y2=\"50.8\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#f3f7fe\"/><stop offset=\".45\" stop-color=\"#f3f7fe\"/><stop offset=\"1\" stop-color=\"#deeafb\"/></linearGradient><linearGradient id=\"a\" x1=\"22.53\" x2=\"25.47\" y1=\"42.95\" y2=\"48.05\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#4286ee\"/><stop offset=\".45\" stop-color=\"#4286ee\"/><stop offset=\"1\" stop-color=\"#0950bc\"/></linearGradient><linearGradient id=\"c\" x1=\"29.53\" x2=\"32.47\" y1=\"42.95\" y2=\"48.05\" xlink:href=\"#a\"/><linearGradient id=\"d\" x1=\"36.53\" x2=\"39.47\" y1=\"42.95\" y2=\"48.05\" xlink:href=\"#a\"/><linearGradient id=\"e\" x1=\"26.74\" x2=\"35.76\" y1=\"37.88\" y2=\"53.52\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#f7b23b\"/><stop offset=\".45\" stop-color=\"#f7b23b\"/><stop offset=\"1\" stop-color=\"#f59e0b\"/></linearGradient></defs><path fill=\"url(#b)\" stroke=\"#e6effc\" stroke-miterlimit=\"10\" stroke-width=\".5\" d=\"M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z\"/><path fill=\"none\" stroke=\"url(#a)\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" d=\"M24.39 43.03l-.78 4.94\"><animateTransform attributeName=\"transform\" dur=\"0.7s\" repeatCount=\"indefinite\" type=\"translate\" values=\"1 -5; -2 10\"/><animate attributeName=\"opacity\" dur=\"0.7s\" repeatCount=\"indefinite\" values=\"0;1;1;0\"/></path><path fill=\"none\" stroke=\"url(#c)\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" d=\"M31.39 43.03l-.78 4.94\"><animateTransform attributeName=\"transform\" begin=\"-0.4s\" dur=\"0.7s\" repeatCount=\"indefinite\" type=\"translate\" values=\"1 -5; -2 10\"/><animate attributeName=\"opacity\" begin=\"-0.4s\" dur=\"0.7s\" repeatCount=\"indefinite\" values=\"0;1;1;0\"/></path><path fill=\"none\" stroke=\"url(#d)\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" d=\"M38.39 43.03l-.78 4.94\"><animateTransform attributeName=\"transform\" begin=\"-0.2s\" dur=\"0.7s\" repeatCount=\"indefinite\" type=\"translate\" values=\"1 -5; -2 10\"/><animate attributeName=\"opacity\" begin=\"-0.2s\" dur=\"0.7s\" repeatCount=\"indefinite\" values=\"0;1;1;0\"/></path><path fill=\"url(#e)\" stroke=\"#f6a823\" stroke-miterlimit=\"10\" stroke-width=\".5\" d=\"M30 36l-4 12h4l-2 10 10-14h-6l4-8h-6z\"><animate attributeName=\"opacity\" dur=\"2s\" repeatCount=\"indefinite\" values=\"1; 1; 1; 1; 1; 1; 0.1; 1; 0.1; 1; 1; 0.1; 1; 0.1; 1\"/></path></svg>";

var lightning = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"a\" x1=\"22.56\" x2=\"39.2\" y1=\"21.96\" y2=\"50.8\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#f3f7fe\"/><stop offset=\".45\" stop-color=\"#f3f7fe\"/><stop offset=\"1\" stop-color=\"#deeafb\"/></linearGradient><linearGradient id=\"b\" x1=\"26.74\" x2=\"35.76\" y1=\"37.88\" y2=\"53.52\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#f7b23b\"/><stop offset=\".45\" stop-color=\"#f7b23b\"/><stop offset=\"1\" stop-color=\"#f59e0b\"/></linearGradient></defs><path fill=\"url(#a)\" stroke=\"#e6effc\" stroke-miterlimit=\"10\" stroke-width=\".5\" d=\"M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z\"/><path fill=\"url(#b)\" stroke=\"#f6a823\" stroke-miterlimit=\"10\" stroke-width=\".5\" d=\"M30 36l-4 12h4l-2 10 10-14h-6l4-8h-6z\"><animate attributeName=\"opacity\" dur=\"2s\" repeatCount=\"indefinite\" values=\"1; 1; 1; 1; 1; 1; 0.1; 1; 0.1; 1; 1; 0.1; 1; 0.1; 1\"/></path></svg>";

var mostlySunny = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"a\" x1=\"16.5\" x2=\"21.5\" y1=\"19.67\" y2=\"28.33\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#fbbf24\"/><stop offset=\".45\" stop-color=\"#fbbf24\"/><stop offset=\"1\" stop-color=\"#f59e0b\"/></linearGradient><linearGradient id=\"b\" x1=\"22.56\" x2=\"39.2\" y1=\"21.96\" y2=\"50.8\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#f3f7fe\"/><stop offset=\".45\" stop-color=\"#f3f7fe\"/><stop offset=\"1\" stop-color=\"#deeafb\"/></linearGradient></defs><circle cx=\"19\" cy=\"24\" r=\"5\" fill=\"url(#a)\" stroke=\"#f8af18\" stroke-miterlimit=\"10\" stroke-width=\".5\"/><path fill=\"none\" stroke=\"#fbbf24\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" d=\"M19 15.67V12.5m0 23v-3.17m5.89-14.22l2.24-2.24M10.87 32.13l2.24-2.24m0-11.78l-2.24-2.24m16.26 16.26l-2.24-2.24M7.5 24h3.17m19.83 0h-3.17\"><animateTransform attributeName=\"transform\" dur=\"45s\" repeatCount=\"indefinite\" type=\"rotate\" values=\"0 19 24; 360 19 24\"/></path><path fill=\"url(#b)\" stroke=\"#e6effc\" stroke-miterlimit=\"10\" stroke-width=\".5\" d=\"M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z\"/></svg>";

var partlyCloudyNight = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"a\" x1=\"13.58\" x2=\"24.15\" y1=\"15.57\" y2=\"33.87\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#86c3db\"/><stop offset=\".45\" stop-color=\"#86c3db\"/><stop offset=\"1\" stop-color=\"#5eafcf\"/><animateTransform attributeName=\"gradientTransform\" dur=\"10s\" repeatCount=\"indefinite\" type=\"rotate\" values=\"10 19.22 24.293; -10 19.22 24.293; 10 19.22 24.293\"/></linearGradient><linearGradient id=\"b\" x1=\"22.56\" x2=\"39.2\" y1=\"21.96\" y2=\"50.8\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#f3f7fe\"/><stop offset=\".45\" stop-color=\"#f3f7fe\"/><stop offset=\"1\" stop-color=\"#deeafb\"/></linearGradient></defs><path fill=\"url(#a)\" stroke=\"#72b9d5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\".5\" d=\"M29.33 26.68a10.61 10.61 0 01-10.68-10.54A10.5 10.5 0 0119 13.5a10.54 10.54 0 1011.5 13.11 11.48 11.48 0 01-1.17.07z\"><animateTransform attributeName=\"transform\" dur=\"10s\" repeatCount=\"indefinite\" type=\"rotate\" values=\"-10 19.22 24.293; 10 19.22 24.293; -10 19.22 24.293\"/></path><path fill=\"url(#b)\" stroke=\"#e6effc\" stroke-miterlimit=\"10\" stroke-width=\".5\" d=\"M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z\"/></svg>";

var partlyCloudy = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"a\" x1=\"16.5\" x2=\"21.5\" y1=\"19.67\" y2=\"28.33\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#fbbf24\"/><stop offset=\".45\" stop-color=\"#fbbf24\"/><stop offset=\"1\" stop-color=\"#f59e0b\"/></linearGradient><linearGradient id=\"b\" x1=\"22.56\" x2=\"39.2\" y1=\"21.96\" y2=\"50.8\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#f3f7fe\"/><stop offset=\".45\" stop-color=\"#f3f7fe\"/><stop offset=\"1\" stop-color=\"#deeafb\"/></linearGradient></defs><circle cx=\"19\" cy=\"24\" r=\"5\" fill=\"url(#a)\" stroke=\"#f8af18\" stroke-miterlimit=\"10\" stroke-width=\".5\"/><path fill=\"none\" stroke=\"#fbbf24\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" d=\"M19 15.67V12.5m0 23v-3.17m5.89-14.22l2.24-2.24M10.87 32.13l2.24-2.24m0-11.78l-2.24-2.24m16.26 16.26l-2.24-2.24M7.5 24h3.17m19.83 0h-3.17\"><animateTransform attributeName=\"transform\" dur=\"45s\" repeatCount=\"indefinite\" type=\"rotate\" values=\"0 19 24; 360 19 24\"/></path><path fill=\"url(#b)\" stroke=\"#e6effc\" stroke-miterlimit=\"10\" stroke-width=\".5\" d=\"M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z\"/></svg>";

var pouring = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"b\" x1=\"22.56\" x2=\"39.2\" y1=\"21.96\" y2=\"50.8\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#f3f7fe\"/><stop offset=\".45\" stop-color=\"#f3f7fe\"/><stop offset=\"1\" stop-color=\"#deeafb\"/></linearGradient><linearGradient id=\"a\" x1=\"22.53\" x2=\"25.47\" y1=\"42.95\" y2=\"48.05\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#4286ee\"/><stop offset=\".45\" stop-color=\"#4286ee\"/><stop offset=\"1\" stop-color=\"#0950bc\"/></linearGradient><linearGradient id=\"c\" x1=\"29.53\" x2=\"32.47\" y1=\"42.95\" y2=\"48.05\" xlink:href=\"#a\"/><linearGradient id=\"d\" x1=\"36.53\" x2=\"39.47\" y1=\"42.95\" y2=\"48.05\" xlink:href=\"#a\"/></defs><path fill=\"url(#b)\" stroke=\"#e6effc\" stroke-miterlimit=\"10\" stroke-width=\".5\" d=\"M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z\"/><path fill=\"none\" stroke=\"url(#a)\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" d=\"M24.39 43.03l-.78 4.94\"><animateTransform attributeName=\"transform\" dur=\"0.7s\" repeatCount=\"indefinite\" type=\"translate\" values=\"1 -5; -2 10\"/><animate attributeName=\"opacity\" dur=\"0.7s\" repeatCount=\"indefinite\" values=\"0;1;1;0\"/></path><path fill=\"none\" stroke=\"url(#c)\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" d=\"M31.39 43.03l-.78 4.94\"><animateTransform attributeName=\"transform\" begin=\"-0.4s\" dur=\"0.7s\" repeatCount=\"indefinite\" type=\"translate\" values=\"1 -5; -2 10\"/><animate attributeName=\"opacity\" begin=\"-0.4s\" dur=\"0.7s\" repeatCount=\"indefinite\" values=\"0;1;1;0\"/></path><path fill=\"none\" stroke=\"url(#d)\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" d=\"M38.39 43.03l-.78 4.94\"><animateTransform attributeName=\"transform\" begin=\"-0.2s\" dur=\"0.7s\" repeatCount=\"indefinite\" type=\"translate\" values=\"1 -5; -2 10\"/><animate attributeName=\"opacity\" begin=\"-0.2s\" dur=\"0.7s\" repeatCount=\"indefinite\" values=\"0;1;1;0\"/></path></svg>";

var rainy = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"b\" x1=\"22.56\" x2=\"39.2\" y1=\"21.96\" y2=\"50.8\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#f3f7fe\"/><stop offset=\".45\" stop-color=\"#f3f7fe\"/><stop offset=\"1\" stop-color=\"#deeafb\"/></linearGradient><linearGradient id=\"a\" x1=\"23.31\" x2=\"24.69\" y1=\"44.3\" y2=\"46.7\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#4286ee\"/><stop offset=\".45\" stop-color=\"#4286ee\"/><stop offset=\"1\" stop-color=\"#0950bc\"/></linearGradient><linearGradient id=\"c\" x1=\"30.31\" x2=\"31.69\" y1=\"44.3\" y2=\"46.7\" xlink:href=\"#a\"/><linearGradient id=\"d\" x1=\"37.31\" x2=\"38.69\" y1=\"44.3\" y2=\"46.7\" xlink:href=\"#a\"/></defs><path fill=\"url(#b)\" stroke=\"#e6effc\" stroke-miterlimit=\"10\" stroke-width=\".5\" d=\"M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z\"/><path fill=\"none\" stroke=\"url(#c)\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" d=\"M24.08 45.01l-.16.98\"><animateTransform attributeName=\"transform\" dur=\"1.5s\" repeatCount=\"indefinite\" type=\"translate\" values=\"1 -5; -2 10\"/><animate attributeName=\"opacity\" dur=\"1.5s\" repeatCount=\"indefinite\" values=\"0;1;1;0\"/></path><path fill=\"none\" stroke=\"url(#d)\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" d=\"M31.08 45.01l-.16.98\"><animateTransform attributeName=\"transform\" begin=\"-0.5s\" dur=\"1.5s\" repeatCount=\"indefinite\" type=\"translate\" values=\"1 -5; -2 10\"/><animate attributeName=\"opacity\" begin=\"-0.5s\" dur=\"1.5s\" repeatCount=\"indefinite\" values=\"0;1;1;0\"/></path><path fill=\"none\" stroke=\"url(#e)\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" d=\"M38.08 45.01l-.16.98\"><animateTransform attributeName=\"transform\" begin=\"-1s\" dur=\"1.5s\" repeatCount=\"indefinite\" type=\"translate\" values=\"1 -5; -2 10\"/><animate attributeName=\"opacity\" begin=\"-1s\" dur=\"1.5s\" repeatCount=\"indefinite\" values=\"0;1;1;0\"/></path></svg>";

var snowyRainy = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"b\" x1=\"22.56\" x2=\"39.2\" y1=\"21.96\" y2=\"50.8\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#f3f7fe\"/><stop offset=\".45\" stop-color=\"#f3f7fe\"/><stop offset=\"1\" stop-color=\"#deeafb\"/></linearGradient><linearGradient id=\"a\" x1=\"30.12\" x2=\"31.88\" y1=\"43.48\" y2=\"46.52\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#86c3db\"/><stop offset=\".45\" stop-color=\"#86c3db\"/><stop offset=\"1\" stop-color=\"#5eafcf\"/></linearGradient><linearGradient id=\"c\" x1=\"29.67\" x2=\"32.33\" y1=\"42.69\" y2=\"47.31\" xlink:href=\"#a\"/><linearGradient id=\"d\" x1=\"23.12\" x2=\"24.88\" y1=\"43.48\" y2=\"46.52\" xlink:href=\"#a\"/><linearGradient id=\"e\" x1=\"22.67\" x2=\"25.33\" y1=\"42.69\" y2=\"47.31\" xlink:href=\"#a\"/><linearGradient id=\"f\" x1=\"37.12\" x2=\"38.88\" y1=\"43.48\" y2=\"46.52\" xlink:href=\"#a\"/><linearGradient id=\"g\" x1=\"36.67\" x2=\"39.33\" y1=\"42.69\" y2=\"47.31\" xlink:href=\"#a\"/></defs><path fill=\"url(#b)\" stroke=\"#e6effc\" stroke-miterlimit=\"10\" stroke-width=\".5\" d=\"M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z\"/><g><circle cx=\"31\" cy=\"45\" r=\"1.25\" fill=\"none\" stroke=\"url(#a)\" stroke-miterlimit=\"10\"/><path fill=\"none\" stroke=\"url(#c)\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" d=\"M33.17 46.25l-1.09-.63m-2.16-1.24l-1.09-.63M31 42.5v1.25m0 3.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63\"/><animateTransform additive=\"sum\" attributeName=\"transform\" dur=\"4s\" repeatCount=\"indefinite\" type=\"translate\" values=\"-1 -6; 1 12\"/><animateTransform additive=\"sum\" attributeName=\"transform\" dur=\"9s\" repeatCount=\"indefinite\" type=\"rotate\" values=\"0 31 45; 360 31 45\"/><animate attributeName=\"opacity\" dur=\"4s\" repeatCount=\"indefinite\" values=\"0;1;1;1;0\"/></g><g><circle cx=\"24\" cy=\"45\" r=\"1.25\" fill=\"none\" stroke=\"url(#d)\" stroke-miterlimit=\"10\"/><path fill=\"none\" stroke=\"url(#e)\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" d=\"M26.17 46.25l-1.09-.63m-2.16-1.24l-1.09-.63M24 42.5v1.25m0 3.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63\"/><animateTransform additive=\"sum\" attributeName=\"transform\" begin=\"-2s\" dur=\"4s\" repeatCount=\"indefinite\" type=\"translate\" values=\"1 -6; -1 12\"/><animateTransform additive=\"sum\" attributeName=\"transform\" dur=\"9s\" repeatCount=\"indefinite\" type=\"rotate\" values=\"0 24 45; 360 24 45\"/><animate attributeName=\"opacity\" begin=\"-2s\" dur=\"4s\" repeatCount=\"indefinite\" values=\"0;1;1;1;0\"/></g><g><circle cx=\"38\" cy=\"45\" r=\"1.25\" fill=\"none\" stroke=\"url(#f)\" stroke-miterlimit=\"10\"/><path fill=\"none\" stroke=\"url(#g)\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" d=\"M40.17 46.25l-1.09-.63m-2.16-1.24l-1.09-.63M38 42.5v1.25m0 3.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63\"/><animateTransform additive=\"sum\" attributeName=\"transform\" begin=\"-1s\" dur=\"4s\" repeatCount=\"indefinite\" type=\"translate\" values=\"1 -6; -1 12\"/><animateTransform additive=\"sum\" attributeName=\"transform\" dur=\"9s\" repeatCount=\"indefinite\" type=\"rotate\" values=\"0 38 45; 360 38 45\"/><animate attributeName=\"opacity\" begin=\"-1s\" dur=\"4s\" repeatCount=\"indefinite\" values=\"0;1;1;1;0\"/></g></svg>";

var snowy = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"b\" x1=\"22.56\" x2=\"39.2\" y1=\"21.96\" y2=\"50.8\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#f3f7fe\"/><stop offset=\".45\" stop-color=\"#f3f7fe\"/><stop offset=\"1\" stop-color=\"#deeafb\"/></linearGradient><linearGradient id=\"a\" x1=\"30.12\" x2=\"31.88\" y1=\"43.48\" y2=\"46.52\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#86c3db\"/><stop offset=\".45\" stop-color=\"#86c3db\"/><stop offset=\"1\" stop-color=\"#5eafcf\"/></linearGradient><linearGradient id=\"c\" x1=\"29.67\" x2=\"32.33\" y1=\"42.69\" y2=\"47.31\" xlink:href=\"#a\"/><linearGradient id=\"d\" x1=\"23.12\" x2=\"24.88\" y1=\"43.48\" y2=\"46.52\" xlink:href=\"#a\"/><linearGradient id=\"e\" x1=\"22.67\" x2=\"25.33\" y1=\"42.69\" y2=\"47.31\" xlink:href=\"#a\"/><linearGradient id=\"f\" x1=\"37.12\" x2=\"38.88\" y1=\"43.48\" y2=\"46.52\" xlink:href=\"#a\"/><linearGradient id=\"g\" x1=\"36.67\" x2=\"39.33\" y1=\"42.69\" y2=\"47.31\" xlink:href=\"#a\"/></defs><path fill=\"url(#b)\" stroke=\"#e6effc\" stroke-miterlimit=\"10\" stroke-width=\".5\" d=\"M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z\"/><g><circle cx=\"31\" cy=\"45\" r=\"1.25\" fill=\"none\" stroke=\"url(#a)\" stroke-miterlimit=\"10\"/><path fill=\"none\" stroke=\"url(#c)\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" d=\"M33.17 46.25l-1.09-.63m-2.16-1.24l-1.09-.63M31 42.5v1.25m0 3.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63\"/><animateTransform additive=\"sum\" attributeName=\"transform\" dur=\"4s\" repeatCount=\"indefinite\" type=\"translate\" values=\"-1 -6; 1 12\"/><animateTransform additive=\"sum\" attributeName=\"transform\" dur=\"9s\" repeatCount=\"indefinite\" type=\"rotate\" values=\"0 31 45; 360 31 45\"/><animate attributeName=\"opacity\" dur=\"4s\" repeatCount=\"indefinite\" values=\"0;1;1;1;0\"/></g><g><circle cx=\"24\" cy=\"45\" r=\"1.25\" fill=\"none\" stroke=\"url(#d)\" stroke-miterlimit=\"10\"/><path fill=\"none\" stroke=\"url(#e)\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" d=\"M26.17 46.25l-1.09-.63m-2.16-1.24l-1.09-.63M24 42.5v1.25m0 3.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63\"/><animateTransform additive=\"sum\" attributeName=\"transform\" begin=\"-2s\" dur=\"4s\" repeatCount=\"indefinite\" type=\"translate\" values=\"1 -6; -1 12\"/><animateTransform additive=\"sum\" attributeName=\"transform\" dur=\"9s\" repeatCount=\"indefinite\" type=\"rotate\" values=\"0 24 45; 360 24 45\"/><animate attributeName=\"opacity\" begin=\"-2s\" dur=\"4s\" repeatCount=\"indefinite\" values=\"0;1;1;1;0\"/></g><g><circle cx=\"38\" cy=\"45\" r=\"1.25\" fill=\"none\" stroke=\"url(#f)\" stroke-miterlimit=\"10\"/><path fill=\"none\" stroke=\"url(#g)\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" d=\"M40.17 46.25l-1.09-.63m-2.16-1.24l-1.09-.63M38 42.5v1.25m0 3.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63\"/><animateTransform additive=\"sum\" attributeName=\"transform\" begin=\"-1s\" dur=\"4s\" repeatCount=\"indefinite\" type=\"translate\" values=\"1 -6; -1 12\"/><animateTransform additive=\"sum\" attributeName=\"transform\" dur=\"9s\" repeatCount=\"indefinite\" type=\"rotate\" values=\"0 38 45; 360 38 45\"/><animate attributeName=\"opacity\" begin=\"-1s\" dur=\"4s\" repeatCount=\"indefinite\" values=\"0;1;1;1;0\"/></g></svg>";

var sunny = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"a\" x1=\"26.75\" x2=\"37.25\" y1=\"22.91\" y2=\"41.09\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#fbbf24\"/><stop offset=\".45\" stop-color=\"#fbbf24\"/><stop offset=\"1\" stop-color=\"#f59e0b\"/></linearGradient></defs><circle cx=\"32\" cy=\"32\" r=\"10.5\" fill=\"url(#a)\" stroke=\"#f8af18\" stroke-miterlimit=\"10\" stroke-width=\".5\"/><path fill=\"none\" stroke=\"#fbbf24\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"3\" d=\"M32 15.71V9.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 47.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 32H9.5m45 0h-6.21\"><animateTransform attributeName=\"transform\" dur=\"45s\" repeatCount=\"indefinite\" type=\"rotate\" values=\"0 32 32; 360 32 32\"/></path></svg>";

var windyVariant = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"a\" x1=\"27.56\" x2=\"38.27\" y1=\"17.64\" y2=\"36.19\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#d4d7dd\"/><stop offset=\".45\" stop-color=\"#d4d7dd\"/><stop offset=\"1\" stop-color=\"#bec1c6\"/></linearGradient><linearGradient id=\"b\" x1=\"19.96\" x2=\"31.37\" y1=\"29.03\" y2=\"48.8\" xlink:href=\"#a\"/></defs><path fill=\"none\" stroke=\"url(#a)\" stroke-dasharray=\"35 22\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"3\" d=\"M43.64 20a5 5 0 113.61 8.46h-35.5\"><animate attributeName=\"stroke-dashoffset\" dur=\"2s\" repeatCount=\"indefinite\" values=\"-57; 57\"/></path><path fill=\"none\" stroke=\"url(#b)\" stroke-dasharray=\"24 15\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"3\" d=\"M29.14 44a5 5 0 103.61-8.46h-21\"><animate attributeName=\"stroke-dashoffset\" begin=\"-1.5s\" dur=\"2s\" repeatCount=\"indefinite\" values=\"-39; 39\"/></path></svg>";

var windy = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"a\" x1=\"27.56\" x2=\"38.27\" y1=\"17.64\" y2=\"36.19\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#d4d7dd\"/><stop offset=\".45\" stop-color=\"#d4d7dd\"/><stop offset=\"1\" stop-color=\"#bec1c6\"/></linearGradient><linearGradient id=\"b\" x1=\"19.96\" x2=\"31.37\" y1=\"29.03\" y2=\"48.8\" xlink:href=\"#a\"/></defs><path fill=\"none\" stroke=\"url(#a)\" stroke-dasharray=\"35 22\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"3\" d=\"M43.64 20a5 5 0 113.61 8.46h-35.5\"><animate attributeName=\"stroke-dashoffset\" dur=\"2s\" repeatCount=\"indefinite\" values=\"-57; 57\"/></path><path fill=\"none\" stroke=\"url(#b)\" stroke-dasharray=\"24 15\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"3\" d=\"M29.14 44a5 5 0 103.61-8.46h-21\"><animate attributeName=\"stroke-dashoffset\" begin=\"-1.5s\" dur=\"2s\" repeatCount=\"indefinite\" values=\"-39; 39\"/></path></svg>";

const WEATHER_ICON = {
    'clear-night': clearNight,
    cloudy: cloudy,
    exceptional: exceptional,
    fog: fog,
    hail: hail,
    'lightning-rainy': lightningRainy,
    lightning: lightning,
    partlycloudy: partlyCloudy,
    'partlycloudy-night': partlyCloudyNight,
    'mostly-sunny': mostlySunny,
    mostly_sunny: mostlySunny,
    pouring: pouring,
    rainy: rainy,
    'snowy-rainy': snowyRainy,
    snowy: snowy,
    sunny: sunny,
    'windy-variant': windyVariant,
    windy: windy,
};

let WeatherIconElement = class WeatherIconElement extends r$2 {
    constructor() {
        super(...arguments);
        this.useHAWeatherIcons = false;
    }
    render() {
        if (!this.weatherIcon)
            return E;
        return x `<div class=${classNames('weather-icon-element')}>
      ${this.useHAWeatherIcons
            ? x `<ha-icon icon="mdi:weather-${this.weatherIcon}"></ha-icon>`
            : x `${o(WEATHER_ICON[this.weatherIcon])}`}
    </div>`;
    }
    static get styles() {
        return i$4 `
      ${elementStyles}

      .weather-icon-element {
        /* Override the HA Icon height */
        --mdc-icon-size: var(--bwc-weather-icon-height);

        flex: 1;
        display: flex;
        justify-content: var(--bwc-item-justify-content);
        align-items: flex-start;
        padding: 0 var(--bwc-global-padding);
        font-size: var(--bwc-weather-icon-height);

        svg {
          height: var(--bwc-weather-icon-height);
        }
      }
    `;
    }
};
__decorate([
    n({ type: String })
], WeatherIconElement.prototype, "weatherIcon", undefined);
__decorate([
    n({ type: Boolean })
], WeatherIconElement.prototype, "useHAWeatherIcons", undefined);
WeatherIconElement = __decorate([
    t$1('bwc-weather-icon-element')
], WeatherIconElement);

const localizer = getLocalizer();
// This line gets overwritten by the build process depending on the build environment
log.setLevel('debug');
// Add the log to the window object to enable logLevel changes in the console
// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.bomWeatherCardLog = log;
console.info(`%c  BOM-WEATHER-CARD \n%c  ${localizer('common.version')} ${version}    `, 'color: fuchsia; font-weight: bold; background: black', 'color: white; font-weight: bold; background: dimgray');
window.customCards = window.customCards || [];
window.customCards.push({
    type: 'bom-weather-card',
    name: localizer('common.title'),
    description: localizer('common.description'),
    documentationURL: 'https://github.com/dJPoida/ha-bom-weather-card',
    preview: true,
});

/**
 * List of all domains in Home Assistant as of version 20250106.0
 */
const DOMAIN = Object.freeze({
    ALERT: 'alert',
    ASSIST_SATELLITE: 'assist_satellite',
    AUTOMATION: 'automation',
    BINARY_SENSOR: 'binary_sensor',
    BUTTON: 'button',
    CALENDAR: 'calendar',
    CAMERA: 'camera',
    CLIMATE: 'climate',
    CONFIGURATOR: 'configurator',
    CONVERSATION: 'conversation',
    COVER: 'cover',
    DATE: 'date',
    DATETIME: 'datetime',
    DEVICE_TRACKER: 'device_tracker',
    EVENT: 'event',
    FAN: 'fan',
    GROUP: 'group',
    HUMIDIFIER: 'humidifier',
    IMAGE: 'image',
    INPUT_BOOLEAN: 'input_boolean',
    INPUT_BUTTON: 'input_button',
    INPUT_DATETIME: 'input_datetime',
    INPUT_NUMBER: 'input_number',
    INPUT_SELECT: 'input_select',
    INPUT_TEXT: 'input_text',
    LAWN_MOWER: 'lawn_mower',
    LIGHT: 'light',
    LOCK: 'lock',
    MEDIA_PLAYER: 'media_player',
    NUMBER: 'number',
    SCENE: 'scene',
    SCRIPT: 'script',
    SELECT: 'select',
    SENSOR: 'sensor',
    STT: 'stt',
    SWITCH: 'switch',
    TEXT: 'text',
    TIME: 'time',
    TIMER: 'timer',
    TTS: 'tts',
    UPDATE: 'update',
    VACUUM: 'vacuum',
    VALVE: 'valve',
    WATER_HEATER: 'water_heater',
    WEATHER: 'weather',
});
[DOMAIN.WEATHER];
[DOMAIN.SENSOR];

const getCardEntityDetails = (cardEntity) => ({
    entityId: cardEntity?.entity_id,
    attribute: cardEntity?.is_inferred ? cardEntity?.attribute : undefined,
    displayName: cardEntity?.is_inferred
        ? `${cardEntity?.entity_id ?? ''}${cardEntity?.attribute ? `[${cardEntity?.attribute}]` : ''}`
        : '',
    isInferred: cardEntity?.is_inferred ?? false,
});

/**
 * Check if the target element is an `ha-switch` element
 * @param targetElement
 * @returns boolean
 */
const isElementHaSwitch = (targetElement) => {
    return (targetElement.tagName ?? '').toLowerCase() === 'ha-switch';
};

/**
 * To access the HA Entity Picker it will need to be pre-loaded into the browser.
 * @see: https://github.com/thomasloven/hass-config/wiki/PreLoading-Lovelace-Elements
 *
 * @param localize The localizer function
 *
 * @throws {Error} If the HA Entity Picker element fails to pre-load
 */
const preLoadEntityPicker = async (localize) => {
    if (!window.customElements.get('ha-entity-picker')) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cardHelpers = await window.loadCardHelpers();
        const cardElement = await cardHelpers.createCardElement({
            type: 'entities',
            entities: [],
        });
        await cardElement.constructor.getConfigElement();
        // Attempt to access the HA Entity Picker element
        if (!window.customElements.get('ha-entity-picker')) {
            throw new Error(localize('error.failedToPreLoadElement', {
                element: 'ha-entity-picker',
            }));
        }
    }
};

// Take an array of strings and return a string with each element separated by a comma and wrapped in double quotes
function toLitElementArray(arr) {
    return arr.map((e) => `"${e}"`).join(', ');
}

let BomWeatherCardEditor = class BomWeatherCardEditor extends r$2 {
    constructor() {
        super(...arguments);
        this._config = { ...DEFAULT_CARD_CONFIG };
        this._cardEntities = {};
        this.language = DEFAULT_LANGUAGE;
        this.localize = getLocalizer(this.language);
        this._initialized = false;
    }
    static get styles() {
        return i$4 `
      ${cssVariables}

      .card-config {
        /* Cancels overlapping Margins for HAForm + Card Config options */
        overflow: auto;

        /* Prevents the entire dialog from scrolling which takes the preview out of view */
        max-height: 55vh;

        /* Seems to fix a scroll bar issue created by an empty element picker */
        padding-right: var(--bwc-global-padding);

        display: flex;
        flex-direction: column;
      }

      .item-group {
        display: flex;
        flex-direction: column;
        gap: var(--bwc-global-padding);

        margin-bottom: var(--bwc-global-padding);

        &.item {
          margin-bottom: var(--bwc-global-padding);
          flex: 1;
        }
      }

      ha-formfield {
        display: flex;
      }

      ha-switch {
        padding: var(--bwc-global-padding) 6px;
      }

      ha-expansion-panel {
        margin-bottom: var(--bwc-global-padding);
      }
    `;
    }
    firstUpdated() {
        this._calculateCardEntities();
        // Preload the required HA Components
        preLoadEntityPicker(this.localize);
    }
    // Override the updated method
    updated(changedProperties) {
        if (changedProperties.has('hass')) {
            if (this.hass.locale?.language !== this.language) {
                this.language = this.hass.locale?.language;
                this.localize = getLocalizer(this.language);
            }
        }
        if (changedProperties.has('_config')) {
            this._calculateCardEntities();
        }
    }
    setConfig(newConfig) {
        // On first load, merge the default config with the user provided config
        if (!this._initialized) {
            this._config = {
                ...this._config,
                ...newConfig,
            };
            this._initialized = true;
        }
        else {
            this._config = { ...newConfig };
        }
    }
    async _calculateCardEntities() {
        this._cardEntities = await calculateCardEntities(this.hass, this._config);
        log.debug('🔧 Card Entities Recalculated:', this._cardEntities);
    }
    _handleFieldChange(ev) {
        const target = ev.target;
        ev.stopPropagation();
        const targetId = target.id;
        if (!(targetId in DEFAULT_CARD_CONFIG)) {
            throw new Error(this.localize('error.invalidConfigProperty', { property: targetId }));
        }
        const newValue = isElementHaSwitch(target)
            ? target.checked
            : target.value;
        log.debug('🔧 Config Change:', newValue);
        if (newValue === this._config[targetId])
            return;
        const newConfig = { ...this._config };
        if (newValue === '' || newValue === undefined) {
            delete newConfig[targetId];
        }
        else {
            newConfig[targetId] = newValue;
        }
        const messageEvent = new CustomEvent('config-changed', {
            detail: { config: newConfig },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(messageEvent);
    }
    renderWeatherDevicePicker(name, label, required = false) {
        return x `
      <bwc-weather-device-picker-element
        id="${name}"
        .hass=${this.hass}
        .label="${label} (${required
            ? this.localize('editor.required')
            : this.localize('editor.optional')})"
        .value=${typeof this._config[name] === 'string'
            ? this._config[name]
            : ''}
        @value-changed=${this._handleFieldChange}
      ></bwc-weather-device-picker-element>
    `;
    }
    renderEntityPicker(name, label, includeDomains = [], required = false, helper = undefined) {
        return x `
      <ha-entity-picker
        id="${name}"
        .hass=${this.hass}
        class=${classNames('item')}
        .label="${label} (${required
            ? this.localize('editor.required')
            : this.localize('editor.optional')})"
        .value=${this._config[name] ?? ''}
        @value-changed=${this._handleFieldChange}
        allow-custom-entity
        include-domains=${toLitElementArray(includeDomains)}
        .required=${required}
        .helper=${helper}
      >
      </ha-entity-picker>
    `;
    }
    renderTextField(name, label, required = false) {
        return x `
      <ha-textfield
        id=${name}
        type="string"
        class=${classNames('item')}
        .value=${this._config[name] ?? ''}
        .label="${label} (${required
            ? this.localize('editor.required')
            : this.localize('editor.optional')})"
        name=${name}
        @change=${this._handleFieldChange}
        no-spinner
        .required=${required}
      >
      </ha-textfield>
    `;
    }
    renderBooleanField(name, label) {
        return x `
      <ha-formfield .label=${label} class=${classNames('item')}>
        <ha-switch
          id=${name}
          .checked=${this._config[name] ?? false}
          @change=${this._handleFieldChange}
        ></ha-switch>
      </ha-formfield>
    `;
    }
    renderSummaryOptionsPanel() {
        return x `<ha-expansion-panel
      .outlined=${true}
      header="${this.localize('editor.summary')}"
    >
      <!-- Show Current Temperature -->
      ${this.renderBooleanField(CONFIG_PROP.SHOW_CURRENT_TEMP, this.localize('editor.showCurrentTemperature'))}

      <!-- Current Temp Entity -->
      ${this._config[CONFIG_PROP.SHOW_CURRENT_TEMP]
            ? this.renderEntityPicker(CONFIG_PROP.CURRENT_TEMP_ENTITY_ID, this.localize('editor.currentTemperatureEntity'), [], false, getCardEntityDetails(this._cardEntities[CONFIG_PROP.CURRENT_TEMP_ENTITY_ID]).displayName)
            : E}

      <!-- Show Feels Like Temperature -->
      ${this._config[CONFIG_PROP.SHOW_CURRENT_TEMP]
            ? this.renderBooleanField(CONFIG_PROP.SHOW_FEELS_LIKE_TEMP, this.localize('editor.showFeelsLikeTemperature'))
            : E}

      <!-- Feels Like Temp Entity -->
      ${this._config[CONFIG_PROP.SHOW_CURRENT_TEMP] &&
            this._config[CONFIG_PROP.SHOW_FEELS_LIKE_TEMP]
            ? this.renderEntityPicker(CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID, this.localize('editor.feelsLikeTemperatureEntity'), [], false, this._cardEntities[CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID]
                ?.is_inferred
                ? this._cardEntities[CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID]
                    .entity_id
                : undefined)
            : E}

      <!-- Weather Icon -->
      ${this.renderBooleanField(CONFIG_PROP.SHOW_WEATHER_ICON, this.localize('editor.showWeatherIcon'))}

      <!-- Weather Icon Entity -->
      ${this._config[CONFIG_PROP.SHOW_WEATHER_ICON]
            ? this.renderEntityPicker(CONFIG_PROP.WEATHER_ICON_ENTITY_ID, this.localize('editor.weatherIconEntity'), [], false, getCardEntityDetails(this._cardEntities[CONFIG_PROP.WEATHER_ICON_ENTITY_ID]).displayName)
            : E}

      <!-- Use Default Weather Icons -->
      ${this._config[CONFIG_PROP.SHOW_WEATHER_ICON]
            ? this.renderBooleanField(CONFIG_PROP.USE_HA_WEATHER_ICONS, this.localize('editor.useDefaultHaWeatherIcons'))
            : E}

      <!-- Show Time -->
      ${this.renderBooleanField(CONFIG_PROP.SHOW_TIME, this.localize('editor.showTime'))}

      <!-- Time Entity -->
      ${this._config[CONFIG_PROP.SHOW_TIME]
            ? this.renderEntityPicker(CONFIG_PROP.TIME_ENTITY_ID, this.localize('editor.timeEntity'), [], false, this._cardEntities[CONFIG_PROP.TIME_ENTITY_ID]?.is_inferred
                ? this._cardEntities[CONFIG_PROP.TIME_ENTITY_ID].entity_id
                : undefined)
            : E}

      <!-- Show Date -->
      ${this._config[CONFIG_PROP.SHOW_TIME]
            ? this.renderBooleanField(CONFIG_PROP.SHOW_DATE, this.localize('editor.showDate'))
            : E}

      <!-- Date Entity -->
      ${this._config[CONFIG_PROP.SHOW_TIME] &&
            this._config[CONFIG_PROP.SHOW_DATE]
            ? this.renderEntityPicker(CONFIG_PROP.DATE_ENTITY_ID, this.localize('editor.dateEntity'), [], false, this._cardEntities[CONFIG_PROP.DATE_ENTITY_ID]?.is_inferred
                ? this._cardEntities[CONFIG_PROP.DATE_ENTITY_ID].entity_id
                : undefined)
            : E}

      <!-- Show Now / Later Temps -->
      ${this.renderBooleanField(CONFIG_PROP.SHOW_NOW_LATER_TEMPS, this.localize('editor.showNowLaterTemps'))}

      <!-- Now Temp Entity -->
      ${this._config[CONFIG_PROP.SHOW_NOW_LATER_TEMPS]
            ? this.renderEntityPicker(CONFIG_PROP.NOW_LATER_NOW_TEMP_ENTITY_ID, this.localize('editor.nowTempEntity'))
            : E}

      <!-- Now Label Entity -->
      ${this._config[CONFIG_PROP.SHOW_NOW_LATER_TEMPS]
            ? this.renderEntityPicker(CONFIG_PROP.NOW_LATER_NOW_LABEL_ENTITY_ID, this.localize('editor.nowLabelEntity'))
            : E}

      <!-- Later Temp Entity -->
      ${this._config[CONFIG_PROP.SHOW_NOW_LATER_TEMPS]
            ? this.renderEntityPicker(CONFIG_PROP.NOW_LATER_LATER_TEMP_ENTITY_ID, this.localize('editor.laterTempEntity'))
            : E}

      <!-- Later Label Entity -->
      ${this._config[CONFIG_PROP.SHOW_NOW_LATER_TEMPS]
            ? this.renderEntityPicker(CONFIG_PROP.NOW_LATER_LATER_LABEL_ENTITY_ID, this.localize('editor.laterLabelEntity'))
            : E}

      <!-- Show Warnings Count -->
      ${this.renderBooleanField(CONFIG_PROP.SHOW_WARNINGS_COUNT, this.localize('editor.showWarningsCount'))}

      <!-- Warnings Count Entity -->
      ${this._config[CONFIG_PROP.SHOW_WARNINGS_COUNT]
            ? this.renderEntityPicker(CONFIG_PROP.WARNINGS_COUNT_ENTITY_ID, this.localize('editor.warningsCountEntity'))
            : E}

      <!-- Show Rain Summary -->
      ${this.renderBooleanField(CONFIG_PROP.SHOW_RAIN_SUMMARY, this.localize('editor.showRainSummary'))}

      <!-- Rain Summary Entity -->
      ${this._config[CONFIG_PROP.SHOW_RAIN_SUMMARY]
            ? this.renderEntityPicker(CONFIG_PROP.RAIN_SUMMARY_ENTITY_ID, this.localize('editor.rainSummaryEntity'))
            : E}

      <!-- Show Forecast Summary -->
      ${this.renderBooleanField(CONFIG_PROP.SHOW_FORECAST_SUMMARY, this.localize('editor.showForecastSummary'))}

      <!-- Forecast Summary Entity -->
      ${this._config[CONFIG_PROP.SHOW_FORECAST_SUMMARY]
            ? this.renderEntityPicker(CONFIG_PROP.FORECAST_SUMMARY_ENTITY_ID, this.localize('editor.forecastSummaryEntity'))
            : E}
    </ha-expansion-panel>`;
    }
    renderHourlyForecastOptionsPanel() {
        return x `<ha-expansion-panel
      .outlined=${true}
      header="${this.localize('editor.hourlyForecast')}"
    >
      <!-- Show Hourly Forecast -->
      ${this.renderBooleanField(CONFIG_PROP.SHOW_HOURLY_FORECAST, this.localize('editor.showHourlyForecast'))}
    </ha-expansion-panel>`;
    }
    renderDailyForecastOptionsPanel() {
        return x `<ha-expansion-panel
      .outlined=${true}
      header="${this.localize('editor.dailyForecast')}"
    >
      <!-- Show Daily Forecast -->
      ${this.renderBooleanField(CONFIG_PROP.SHOW_DAILY_FORECAST, this.localize('editor.showDailyForecast'))}
    </ha-expansion-panel>`;
    }
    render() {
        if (!this._config || !this._initialized)
            return x ``;
        const weatherEntityDetails = getCardEntityDetails(this._cardEntities[CONFIG_PROP.SUMMARY_WEATHER_ENTITY_ID]);
        return x `<div class="card-config">
      <div class="item-group">
        <!-- Title -->
        ${this.renderTextField(CONFIG_PROP.TITLE, this.localize('editor.title'))}

        <!-- Weather Device -->
        ${this.renderWeatherDevicePicker(CONFIG_PROP.WEATHER_DEVICE_ID, this.localize('editor.weatherDevice'), true)}

        <!-- Forecast Entity ID -->
        ${this.renderEntityPicker(CONFIG_PROP.SUMMARY_WEATHER_ENTITY_ID, this.localize('editor.summaryWeatherEntity'), [DOMAIN.WEATHER], false, weatherEntityDetails.displayName)}
      </div>

      <!-- Summary Options Panel -->
      ${this.renderSummaryOptionsPanel()}

      <!-- Hourly Forecast Options Panel -->
      ${this.renderHourlyForecastOptionsPanel()}

      <!-- Daily Forecast Options Panel -->
      ${this.renderDailyForecastOptionsPanel()}
    </div> `;
    }
};
__decorate([
    n({ attribute: false })
], BomWeatherCardEditor.prototype, "hass", undefined);
__decorate([
    r()
], BomWeatherCardEditor.prototype, "_config", undefined);
__decorate([
    r()
], BomWeatherCardEditor.prototype, "_cardEntities", undefined);
BomWeatherCardEditor = __decorate([
    t$1('bom-weather-card-editor')
], BomWeatherCardEditor);

var bomWeatherCardEditor = /*#__PURE__*/Object.freeze({
	__proto__: null,
	get BomWeatherCardEditor () { return BomWeatherCardEditor; }
});
//# sourceMappingURL=bom-weather-card.js.map
