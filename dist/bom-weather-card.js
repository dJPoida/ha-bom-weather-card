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

var version = "0.0.1674";

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

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=globalThis,e$5=t$3.ShadowRoot&&(undefined===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$1=Symbol(),o$6=new WeakMap;let n$4 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$5&&undefined===t){const e=undefined!==s&&1===s.length;e&&(t=o$6.get(s)),undefined===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$6.set(s,t));}return t}toString(){return this.cssText}};const r$5=t=>new n$4("string"==typeof t?t:t+"",undefined,s$1),i$5=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$4(o,t,s$1)},S$1=(s,o)=>{if(e$5)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$3.litNonce;undefined!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$5?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$5(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$4,defineProperty:e$4,getOwnPropertyDescriptor:r$4,getOwnPropertyNames:h$1,getOwnPropertySymbols:o$5,getPrototypeOf:n$3}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$4(t,s),y$1={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;class b extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=y$1){if(s.state&&(s.attribute=false),this._$Ei(),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,s);undefined!==r&&e$4(this.prototype,t,r);}}static getPropertyDescriptor(t,s,i){const{get:e,set:h}=r$4(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get(){return e?.call(this)},set(s){const r=e?.call(this);h.call(this,s),this.requestUpdate(t,r,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??y$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$3(this);t.finalize(),undefined!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...h$1(t),...o$5(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(undefined!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);undefined!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else undefined!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?undefined:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():undefined}constructor(){super(),this._$Ep=undefined,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),undefined!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$EC(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(undefined!==e&&true===i.reflect){const r=(undefined!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==r?this.removeAttribute(e):this.setAttribute(e,r),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(undefined!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),r="function"==typeof t.converter?{fromAttribute:t.converter}:undefined!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e,this[e]=r.fromAttribute(s,t.type),this._$Em=null;}}requestUpdate(t,s,i){if(undefined!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??f$1)(this[t],s))return;this.P(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$ET());}P(t,s,i){this._$AL.has(t)||this._$AL.set(t,s),true===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t);}async _$ET(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=undefined;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t) true!==i.wrapped||this._$AL.has(s)||undefined===this[s]||this.P(s,this[s],i);}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EU();}catch(s){throw t=false,this._$EU(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EU(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU();}updated(t){}firstUpdated(t){}}b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[d$1("elementProperties")]=new Map,b[d$1("finalized")]=new Map,p$1?.({ReactiveElement:b}),(a$1.reactiveElementVersions??=[]).push("2.0.4");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,i$3=t$2.trustedTypes,s=i$3?i$3.createPolicy("lit-html",{createHTML:t=>t}):undefined,e$3="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o$4="?"+h,n$2=`<${o$4}>`,r$3=document,l=()=>r$3.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r$3.createTreeWalker(r$3,129);function P(t,i){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return undefined!==s?s.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":3===i?"<math>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v:undefined!==u[1]?c=_:undefined!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):undefined!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f,d=-1):undefined===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=undefined===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,r=undefined);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n$2:d>=0?(o.push(a),s.slice(0,d)+e$3+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [P(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class N{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=V(t,s);if(this.el=N.createElement(f,n),C.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=C.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e$3)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?H:"?"===e[1]?I:"@"===e[1]?L:k}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i$3?i$3.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),C.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$4)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r$3.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){if(i===T)return i;let h=undefined!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?undefined:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),undefined===o?h=undefined:(h=new o(t),h._$AT(t,s,e)),undefined!==e?(s._$Co??=[])[e]=h:s._$Cl=h),undefined!==h&&(i=S(t,h._$AS(t,i.values),h,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=undefined,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r$3).importNode(i,true);C.currentNode=e;let h=C.nextNode(),o=0,n=0,l=s[0];for(;undefined!==l;){if(o===l.index){let i;2===l.type?i=new R(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new z(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=C.nextNode(),o++);}return C.currentNode=r$3,e}p(t){let i=0;for(const s of this._$AV) undefined!==s&&(undefined!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=E,this._$AN=undefined,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return undefined!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),c(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==T&&this._(t):undefined!==t._$litType$?this.$(t):undefined!==t.nodeType?this.T(t):u(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(r$3.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(undefined===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new M(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return undefined===i&&A.set(t.strings,i=new N(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(false,true,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){ undefined===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=E,this._$AN=undefined,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(undefined===h)t=S(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=S(this,e[s+n],i,n),r===T&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===E?t=E:t!==E&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E?undefined:t;}}class I extends k{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E);}}class L extends k{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=S(this,t,i,0)??E)===T)return;const s=this._$AH,e=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==E&&(s===E||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=undefined,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j=t$2.litHtmlPolyfillSupport;j?.(N,R),(t$2.litHtmlVersions??=[]).push("3.2.1");const B=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(undefined===h){const t=s?.renderBefore??null;e._$litPart$=h=new R(i.insertBefore(l(),t),t,undefined,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let r$2 = class r extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=undefined;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B(s,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return T}};r$2._$litElement$=true,r$2["finalized"]=true,globalThis.litElementHydrateSupport?.({LitElement:r$2});const i$2=globalThis.litElementPolyfillSupport;i$2?.({LitElement:r$2});(globalThis.litElementVersions??=[]).push("4.1.1");

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
 */const o$3={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o$3,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(undefined===s&&globalThis.litPropertyMetadata.set(i,s=new Map),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t);},init(e){return undefined!==e&&this.P(o,undefined,t),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t);}}throw Error("Unsupported decorator location: "+n)};function n$1(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,r?{...t,wrapped:true}:t),r?Object.getOwnPropertyDescriptor(e,o):undefined})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n$1({...r,state:true,attribute:false})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$2=t=>(...e)=>({_$litDirective$:t,values:e});let i$1 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e$1=e$2(class extends i$1{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"class"!==t$1.name||t$1.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter((s=>t[s])).join(" ")+" "}update(s,[i]){if(undefined===this.st){this.st=new Set,undefined!==s.strings&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in i)i[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(i)}const r=s.element.classList;for(const t of this.st)t in i||(r.remove(t),this.st.delete(t));for(const t in i){const s=!!i[t];s===this.st.has(t)||this.nt?.has(t)||(s?(r.add(t),this.st.add(t)):(r.remove(t),this.st.delete(t)));}return T}});

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const n="important",i=" !"+n,o$2=e$2(class extends i$1{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||t$1.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(e,[r]){const{style:s}=e.element;if(undefined===this.ft)return this.ft=new Set(Object.keys(r)),this.render(r);for(const t of this.ft)null==r[t]&&(this.ft.delete(t),t.includes("-")?s.removeProperty(t):s[t]=null);for(const t in r){const e=r[t];if(null!=e){this.ft.add(t);const r="string"==typeof e&&e.endsWith(i);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?n:""):s[t]=e;}}return T}});

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
    SHOW_WARNING_COUNT: 'show_warning_count',
    WARNING_COUNT_ENTITY_ID: 'warning_count_entity_id',
    HIDE_WARNING_COUNT_IF_ZERO: 'hide_warning_count_if_zero',
    SHOW_RAIN_SUMMARY: 'show_rain_summary',
    RAIN_SUMMARY_ENTITY_ID: 'rain_summary_entity_id',
    SHOW_FORECAST_SUMMARY: 'show_forecast_summary',
    FORECAST_SUMMARY_ENTITY_ID: 'forecast_summary_entity_id',
    SHOW_HOURLY_FORECAST: 'show_hourly_forecast',
    SHOW_DAILY_FORECAST: 'show_daily_forecast',
    SHOW_DAILY_FORECAST_TITLE: 'show_daily_forecast_title',
    DAILY_FORECAST_NUMBER_OF_DAYS: 'daily_forecast_number_of_days',
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
    [CONFIG_PROP.SHOW_WARNING_COUNT]: true,
    [CONFIG_PROP.WARNING_COUNT_ENTITY_ID]: undefined,
    [CONFIG_PROP.HIDE_WARNING_COUNT_IF_ZERO]: undefined,
    [CONFIG_PROP.SHOW_RAIN_SUMMARY]: true,
    [CONFIG_PROP.RAIN_SUMMARY_ENTITY_ID]: undefined,
    [CONFIG_PROP.SHOW_FORECAST_SUMMARY]: true,
    [CONFIG_PROP.FORECAST_SUMMARY_ENTITY_ID]: undefined,
    [CONFIG_PROP.SHOW_HOURLY_FORECAST]: true,
    [CONFIG_PROP.SHOW_DAILY_FORECAST]: true,
    [CONFIG_PROP.SHOW_DAILY_FORECAST_TITLE]: true,
    [CONFIG_PROP.DAILY_FORECAST_NUMBER_OF_DAYS]: 5,
};

const LANGUAGE = {
    EN: 'en',
    EN_GB: 'en_gb',
};
const DEFAULT_LANGUAGE = LANGUAGE.EN;

const WEATHER_CONDITION = {
    CLEAR_NIGHT: 'clear-night',
    CLOUDY: 'cloudy',
    EXCEPTIONAL: 'exceptional',
    FOG: 'fog',
    HAIL: 'hail',
    LIGHTNING_RAINY: 'lightning-rainy',
    LIGHTNING: 'lightning',
    PARTLY_CLOUDY: 'partlycloudy', // Intentionally different from the key
    PARTLY_CLOUDY_NIGHT: 'partlycloudy-night',
    MOSTLY_SUNNY: 'mostly-sunny',
    POURING: 'pouring',
    RAINY: 'rainy',
    SNOWY_RAINY: 'snowy-rainy',
    SNOWY: 'snowy',
    SUNNY: 'sunny',
    WINDY_VARIANT: 'windy-variant',
    WINDY: 'windy',
};

const WEATHER_CONDITION_CLASSES = {
    [WEATHER_CONDITION.SUNNY]: 'clear',
    [WEATHER_CONDITION.CLEAR_NIGHT]: 'clear night',
    [WEATHER_CONDITION.PARTLY_CLOUDY]: 'partially-cloudy',
    [WEATHER_CONDITION.PARTLY_CLOUDY_NIGHT]: 'partially-cloudy night',
    [WEATHER_CONDITION.MOSTLY_SUNNY]: 'partially-cloudy',
    [WEATHER_CONDITION.CLOUDY]: 'cloudy',
    [WEATHER_CONDITION.LIGHTNING]: 'stormy',
    [WEATHER_CONDITION.LIGHTNING_RAINY]: 'stormy',
    [WEATHER_CONDITION.POURING]: 'clear', // TODO: classes for weather condition POURING
    [WEATHER_CONDITION.RAINY]: 'clear', // TODO: classes for weather condition RAINY
    [WEATHER_CONDITION.SNOWY]: 'clear', // TODO: classes for weather condition SNOWY
    [WEATHER_CONDITION.SNOWY_RAINY]: 'clear', // TODO: classes for weather condition SNOWY_RAINY
    [WEATHER_CONDITION.WINDY]: 'clear', // TODO: classes for weather condition WINDY
    [WEATHER_CONDITION.WINDY_VARIANT]: 'clear', // TODO: classes for weather condition WINDY_VARIANT
    [WEATHER_CONDITION.FOG]: 'clear', // TODO: classes for weather condition FOG
    [WEATHER_CONDITION.HAIL]: 'clear', // TODO: classes for weather condition HAIL
    [WEATHER_CONDITION.EXCEPTIONAL]: 'clear', // TODO: classes for weather condition EXCEPTIONAL
};

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
    CONFIG_PROP.WARNING_COUNT_ENTITY_ID,
    CONFIG_PROP.RAIN_SUMMARY_ENTITY_ID,
    CONFIG_PROP.FORECAST_SUMMARY_ENTITY_ID,
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
    [CONFIG_PROP.WARNING_COUNT_ENTITY_ID]: {
        idPattern: {
            parentDeviceConfigProp: CONFIG_PROP.WEATHER_DEVICE_ID,
            pattern: 'sensor.%device_name%_warnings',
        },
    },
    // Infer the rain summary entity from the device name "sensor.%device_name%_rain_amount_range_0"
    [CONFIG_PROP.RAIN_SUMMARY_ENTITY_ID]: {
        idPattern: {
            parentDeviceConfigProp: CONFIG_PROP.WEATHER_DEVICE_ID,
            pattern: 'sensor.%device_name%_rain_amount_range_0',
        },
    },
    // Infer the forecast summary entity from the device name "sensor.%device_name%_short_text_0"
    [CONFIG_PROP.FORECAST_SUMMARY_ENTITY_ID]: {
        idPattern: {
            parentDeviceConfigProp: CONFIG_PROP.WEATHER_DEVICE_ID,
            pattern: 'sensor.%device_name%_short_text_0',
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

var common = {
	version: "Version",
	title: "BOM Weather Card",
	description: "Display weather information in the style of the BOM (Bureau of Meteorology) Australia app."
};
var card = {
	feelsLike: "Feels like",
	noRain: "No Rain",
	rain: "Rain"
};
var editor = {
	currentTemperatureEntity: "Current Temperature Entity",
	dailyForecast: "Daily Forecast",
	dateEntity: "Date Entity",
	feelsLikeTemperatureEntity: "Feels Like Temperature Entity",
	forecastSummaryEntity: "Forecast Summary Entity",
	hideWarningCountIfZero: "Hide Warning Count If Zero",
	hourlyForecast: "Hourly Forecast",
	laterLabelEntity: "Later Label Entity",
	laterTempEntity: "Later Temp Entity",
	nowLabelEntity: "Now Label Entity",
	nowTempEntity: "Now Temp Entity",
	numberOfDays: "Number of Days",
	optional: "Optional",
	rainSummaryEntity: "Rain Summary Entity",
	required: "Required",
	showCurrentTemperature: "Show Current Temperature",
	showDailyForecast: "Show Daily Forecast",
	showDailyForecastTitle: "Show Daily Forecast Title",
	showDate: "Show Date",
	showFeelsLikeTemperature: "Show Feels Like Temperature",
	showForecastSummary: "Show Forecast Summary",
	showHourlyForecast: "Show Hourly Forecast",
	showNowLaterTemps: "Show Now/Later Temperatures",
	showRainSummary: "Show Rain Summary",
	showTime: "Show Time",
	showWarningCount: "Show Warning Count",
	showWeatherIcon: "Show Weather Icon",
	summary: "Summary",
	summaryWeatherEntity: "Summary Weather Entity",
	timeEntity: "Time Entity",
	title: "Title",
	useDefaultHaWeatherIcons: "Use Default HA Weather Icons",
	warningsCountEntity: "Warnings Count Entity",
	weatherDevice: "Weather Device",
	weatherIconEntity: "Weather Icon Entity"
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

class CardState {
    constructor() {
        this._hass = null;
        this._previousHass = null; // Store previous hass state
        // Initial setup if needed
    }
    /**
     * Updates the internal hass state and checks for relevant changes.
     * @param newHass The new HomeAssistant object.
     * @returns True if relevant state (darkMode, dayMode) changed, false otherwise.
     */
    updateHass(newHass) {
        log.debug('[CardState] updateHass called.', { hasOldHass: !!this._hass, hasNewHass: !!newHass });
        if (!newHass) {
            return false; // No new state to process
        }
        const oldHass = this._hass; // Use the current _hass as the old state for comparison
        this._previousHass = oldHass; // Store the state *before* this update
        this._hass = newHass; // Update internal state to the new one
        if (!oldHass) {
            return true; // Always update on the first run when oldHass was null
        }
        // Check if dark mode changed
        const oldThemes = oldHass.themes;
        const newThemes = newHass.themes;
        const darkModeChanged = oldThemes?.darkMode !== newThemes?.darkMode;
        // Check if sun state changed
        const oldSunState = oldHass.states['sun.sun']?.state;
        const newSunState = newHass.states['sun.sun']?.state;
        const sunStateChanged = oldSunState !== newSunState;
        // Return true if any relevant part changed
        const didChange = darkModeChanged || sunStateChanged;
        log.debug('[CardState] updateHass comparison result:', { darkModeChanged, sunStateChanged, didChange });
        // No need to revert state here. If nothing changed, didChange is false.
        // The internal _hass is now newHass, which is correct.
        // The getters will reflect the new state.
        return didChange;
    }
    // Properties will be added here
    get dayMode() {
        // Default to true if hass or sun.sun state is unavailable
        return this._hass?.states['sun.sun'] ? this._hass.states['sun.sun'].state === 'above_horizon' : true;
    }
    get darkMode() {
        // Default to false if hass or themes object is unavailable
        const themes = this._hass?.themes;
        return themes?.darkMode === true;
    }
    /**
     * Indicates if the CardState has received a hass object.
     */
    get hasHass() {
        return !!this._hass;
    }
}

const containerStyles = i$5 `
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
      align-items: center;
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

const cssVariables = i$5 `
  :host {
    /* Bom Weather Card Custom CSS Variables */
    --bwc-large-font-size: 3.5rem;
    --bwc-medium-font-size: 2rem;
    --bwc-regular-font-size: 1.2rem;

    --bwc-huge-icon-size: 5rem;
    --bwc-large-icon-size: 4.5rem;
    --bwc-regular-icon-size: 3rem;

    --bwc-background-color-day-start: #63b0ff;
    --bwc-background-color-day-end: #c4e1ff;
    --bwc-background-color-night-start: #001d3b;
    --bwc-background-color-night-end: #013565;
    --bwc-background-color-day-cloudy-start: #e8eaeb;
    --bwc-background-color-day-cloudy-end: #e8eaeb;
    --bwc-background-color-day-stormy-start: #90959d;
    --bwc-background-color-day-stormy-end: #acb5bc;
    --bwc-time-date-time-font-size: var(--bwc-large-font-size);
    --bwc-time-date-date-font-size: var(--bwc-regular-font-size);
    --bwc-temperature-number-large-font-size: var(--bwc-large-font-size);
    --bwc-temperature-number-font-size: var(--bwc-medium-font-size);
    --bwc-temperature-description-font-size: var(--bwc-regular-font-size);
    --bwc-value-label-value-font-size: var(--bwc-medium-font-size);
    --bwc-value-label-label-font-size: var(--bwc-regular-font-size);
    --bwc-weather-icon-height: var(--bwc-huge-icon-size);
    --bwc-min-height: 10rem;
    --bwc-global-padding: 16px;
    --bwc-item-container-height: 5rem;
    --bwc-warning-no-warnings-background-color: #f5f5f5;
    --bwc-warning-has-warnings-background-color: #fdb404;
    --bwc-warning-icon-size: var(--bwc-medium-font-size);
    --bwc-warning-font-size: var(--bwc-regular-font-size);
    --bwc-waring-text-color: var(--text-light-primary-color);
    --bwc-section-header-font-size: 1.5rem;
    --bwc-daily-forecast-day-font-size: var(--bwc-regular-font-size);
    --bwc-daily-forecast-temp-font-size: var(--bwc-regular-font-size);
    --bwc-daily-forecast-rain-font-size: var(--bwc-regular-font-size);

    /* Conditional Colors based on Day/Night and Dark/Light Theme */
    /* Light Theme / Day Mode */
    --bwc-text-color: var(--text-primary-color);
    --bwc-text-color-inverted: var(--text-light-primary-color);

    /* Home Assistant Theme Overrides */
    --ha-card-header-color: var(--bwc-text-color);
  }
`;

i$5 `
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

const compileTimeDebugStyles = i$5``;
const globalStyles = i$5 `
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

// Estimated component heights (adjust as needed)
const ESTIMATED_SUMMARY_HEIGHT = 12; // em
const ESTIMATED_TITLE_HEIGHT = 3; // em (approx header font size + padding)
const ESTIMATED_BASE_PADDING_HEIGHT = 2; // em (e.g., version number padding)
let BomWeatherCard = class BomWeatherCard extends r$2 {
    constructor() {
        super(...arguments);
        this._config = { ...DEFAULT_CARD_CONFIG };
        this._cardEntities = {};
        this._weatherClass = '';
        this.language = DEFAULT_LANGUAGE;
        this.localize = getLocalizer(this.language);
        this._cardState = new CardState();
    }
    static get styles() {
        return i$5 `
      ${cssVariables}
      ${globalStyles}
      ${containerStyles}
      
      ha-card {
        color: var(--bwc-text-color);
        /* Use the calculated min-height if available, otherwise fallback */
        min-height: var(--bwc-card-calculated-min-height, var(--bwc-min-height));
        border: none;
        overflow: hidden; /* Prevent content spillover during loading */
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
    async _calculateWeatherClass() {
        const currentCondition = getCardEntityValueAsString(this.hass, this._cardEntities[CONFIG_PROP.SUMMARY_WEATHER_ENTITY_ID]);
        this._weatherClass = WEATHER_CONDITION_CLASSES[currentCondition] || '';
        log.debug('Weather class recalculated:', { condition: currentCondition, weatherClass: this._weatherClass });
    }
    _calculateMinHeight() {
        let totalHeight = 0;
        totalHeight += ESTIMATED_SUMMARY_HEIGHT;
        if (this._config.title) {
            totalHeight += ESTIMATED_TITLE_HEIGHT;
        }
        totalHeight += ESTIMATED_BASE_PADDING_HEIGHT;
        log.debug(`Calculated min-height: ${totalHeight}em`);
        return `${totalHeight}em`;
    }
    shouldUpdate(changedProperties) {
        // Allow update if non-hass properties changed
        let hasNonHassChanges = false;
        changedProperties.forEach((_, key) => {
            if (key !== 'hass') {
                hasNonHassChanges = true;
            }
        });
        if (hasNonHassChanges) {
            log.debug('shouldUpdate: true (non-hass property changed)');
            return true;
        }
        log.debug('[BomWeatherCard] shouldUpdate evaluating hass change');
        // If only 'hass' changed, perform a deeper comparison
        if (changedProperties.has('hass')) {
            // === Update CardState first ===
            const cardStateChanged = this._cardState.updateHass(this.hass);
            // ==============================
            const oldHass = changedProperties.get('hass');
            log.debug('[BomWeatherCard] shouldUpdate: hass changed', { hasOldHass: !!oldHass });
            // On first load, oldHass will be undefined, allow update
            if (!oldHass) {
                log.debug('shouldUpdate: true (initial hass set)');
                // No need to call updateHass again, already called above
                // this._cardState.updateHass(this.hass);
                return true;
            }
            // Pass hass to CardState - No longer needed here, handled in updateHass call
            // this._cardState.hass = this.hass;
            // 1. Check if CardState detected relevant changes (result captured above)
            // const cardStateChanged = this._cardState.updateHass(this.hass);
            if (cardStateChanged) {
                log.debug('shouldUpdate: true (CardState detected changes)');
                return true;
            }
            // 2. Check locale language
            if (oldHass.locale?.language !== this.hass.locale?.language) {
                log.debug('shouldUpdate: true (locale changed)');
                return true;
            }
            // 3. Check states of entities used by this card
            const relevantEntityIds = new Set();
            // Add entities explicitly set in config ending with _entity_id
            for (const key in this._config) {
                if (key.endsWith('_entity_id')) {
                    const entityId = this._config[key];
                    if (typeof entityId === 'string' && entityId.includes('.')) {
                        relevantEntityIds.add(entityId);
                    }
                }
            }
            // Also check the main weather entity
            const weatherEntity = this._config[CONFIG_PROP.SUMMARY_WEATHER_ENTITY_ID];
            if (typeof weatherEntity === 'string' && weatherEntity.includes('.')) {
                relevantEntityIds.add(weatherEntity);
            }
            // Ensure sun.sun is included for day/night check - Handled by CardState
            // relevantEntityIds.add('sun.sun');
            for (const entityId of relevantEntityIds) {
                if (oldHass.states[entityId] !== this.hass.states[entityId]) {
                    log.debug(`shouldUpdate: true (state changed for ${entityId})`);
                    return true;
                }
            }
            // If none of the relevant parts changed, skip the update
            log.debug('shouldUpdate: false (only non-relevant hass changes detected)');
            return false;
        }
        // Default fallback (should not happen if logic is correct)
        log.debug('shouldUpdate: true (default fallback)');
        return true;
    }
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties); // Ensure super is called if needed
        // Try to initialize CardState with the initial hass object
        if (this.hass) {
            log.debug('[BomWeatherCard] firstUpdated: Initializing CardState with hass.');
            this._cardState.updateHass(this.hass);
            this.requestUpdate(); // Ensure render is re-evaluated now that CardState has hass
        }
        const initTasks = [this._calculateCardEntities, this._calculateWeatherClass];
        Promise.all(initTasks.map((task) => task.bind(this)())).finally(() => {
            log.debug('Initialization tasks complete.');
        });
    }
    updated(changedProps) {
        super.updated(changedProps);
        log.debug('updated():', changedProps);
        const entityIdKey = CONFIG_PROP.SUMMARY_WEATHER_ENTITY_ID;
        // Update CardState hass if hass changed - No longer needed, hass passed via shouldUpdate/updateHass
        // if (changedProps.has('hass')) {
        //   this._cardState.hass = this.hass;
        // }
        // Original logic for entity calculation on config change (can stay)
        if (changedProps.has('_config')) {
            log.debug('config changed', this._config);
            this._calculateCardEntities(); // Recalculate entities if any config changed
        }
        // Update the weather class that is assigned to the card
        if (changedProps.has('_cardEntities')) {
            const oldCardEntities = changedProps.get('_cardEntities');
            if (oldCardEntities?.[entityIdKey] !== this._cardEntities[entityIdKey]) {
                this._calculateWeatherClass();
            }
        }
        // This section now only runs when shouldUpdate allows an update involving hass
        if (changedProps.has('hass')) {
            if (this.hass.locale?.language !== this.language) {
                this.language = this.hass.locale?.language;
                this.localize = getLocalizer(this.language);
            }
        }
    }
    connectedCallback() {
        log.debug('✅ connected to DOM');
        super.connectedCallback();
    }
    disconnectedCallback() {
        log.debug('❌ disconnected from DOM');
        super.disconnectedCallback();
    }
    render() {
        log.debug('🖼️ [BomWeatherCard] Rendering card...');
        // Don't render until CardState has received hass
        if (!this._cardState.hasHass) {
            log.debug('[BomWeatherCard] Skipping render: CardState has no hass yet.');
            return E;
        }
        log.debug('[BomWeatherCard] State for render:', {
            darkMode: this._cardState.darkMode,
            dayMode: this._cardState.dayMode,
            weatherClass: this._weatherClass,
            hass: this.hass,
            config: this._config,
        });
        const cardClasses = {
            day: this._cardState.dayMode,
            night: !this._cardState.dayMode,
            'dark-mode': this._cardState.darkMode,
            'light-mode': !this._cardState.darkMode,
        };
        // Conditionally add weather class if it exists
        if (this._weatherClass) {
            cardClasses[this._weatherClass] = true;
        }
        const cardStyles = {
            '--bwc-card-calculated-min-height': this._calculateMinHeight(),
        };
        return x `<ha-card class=${e$1(cardClasses)} style=${o$2(cardStyles)}>
      <!-- Card Header -->
      ${this._config.title ? x `<h1 class="card-header">${this._config.title}</h1>` : E}

      <!-- Summary -->
      <bwc-summary-element
        .hass=${this.hass}
        .config=${this._config}
        .cardEntities=${this._cardEntities}
        .localize=${this.localize}
        .dayMode=${this._cardState.dayMode}
        .darkMode=${this._cardState.darkMode}
        .weatherClass=${this._weatherClass}
        .weatherSummaryData=${this._weatherSummaryData}
      ></bwc-summary-element>

      <!-- Daily Forecast -->
      ${this._config[CONFIG_PROP.SHOW_DAILY_FORECAST]
            ? x `<bwc-daily-forecast-element
            .hass=${this.hass}
            .forecastEntityId=${this._cardEntities[CONFIG_PROP.SUMMARY_WEATHER_ENTITY_ID]?.entity_id}
            .useHAWeatherIcons=${this._config[CONFIG_PROP.USE_HA_WEATHER_ICONS] ?? false}
            .showTitle=${this._config[CONFIG_PROP.SHOW_DAILY_FORECAST_TITLE] ?? true}
            .numberOfDays=${this._config[CONFIG_PROP.DAILY_FORECAST_NUMBER_OF_DAYS] ?? 5}
          ></bwc-daily-forecast-element>`
            : E}

      <!-- Debug Info -->
      <div class="bwc-debug item-container">
        <span class="version">Version ${version}</span>
      </div>
    </ha-card>`;
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
    n$1({ attribute: false })
], BomWeatherCard.prototype, "hass", undefined);
__decorate([
    r()
], BomWeatherCard.prototype, "_config", undefined);
__decorate([
    r()
], BomWeatherCard.prototype, "_cardEntities", undefined);
__decorate([
    r()
], BomWeatherCard.prototype, "_weatherClass", undefined);
__decorate([
    r()
], BomWeatherCard.prototype, "_weatherSummaryData", undefined);
BomWeatherCard = __decorate([
    t$1('bom-weather-card')
], BomWeatherCard);

const ICON_SIZE = {
    SMALL: 'small',
    REGULAR: 'regular',
    LARGE: 'large',
    HUGE: 'huge',
};

const subscribeForecast = (hass, entity_id, forecast_type, callback) => hass.connection.subscribeMessage(callback, {
    type: 'weather/subscribe_forecast',
    forecast_type,
    entity_id,
});

let BwcDailyForecastElement = class BwcDailyForecastElement extends r$2 {
    constructor() {
        super(...arguments);
        this.useHAWeatherIcons = false;
        this.showTitle = true;
        this.numberOfDays = 5; // Default number of days
    }
    connectedCallback() {
        super.connectedCallback();
        // Subscribe on connect if hass and entityId are available
        if (this.hass && this.forecastEntityId && !this._forecastSubscribed) {
            this._subscribe();
        }
    }
    disconnectedCallback() {
        this._unsubscribe();
        super.disconnectedCallback();
    }
    updated(changedProps) {
        super.updated(changedProps);
        // Get previous values if they exist
        const oldForecastEntityId = changedProps.get('forecastEntityId');
        // Unsubscribe if hass or entityId are removed
        if ((!this.hass || !this.forecastEntityId) && this._forecastSubscribed) {
            log.debug('Hass or forecastEntityId removed, unsubscribing...');
            this._unsubscribe();
            return;
        }
        // Subscribe if we now have hass and entityId but weren't subscribed (e.g., initial load)
        if (this.hass && this.forecastEntityId && !this._forecastSubscribed) {
            log.debug('Hass and forecastEntityId available, subscribing...');
            this._subscribe();
            return;
        }
        // Resubscribe only if the forecastEntityId has actually changed
        if (this.hass &&
            this.forecastEntityId &&
            changedProps.has('forecastEntityId') &&
            this.forecastEntityId !== oldForecastEntityId) {
            log.debug('forecastEntityId changed, resubscribing...');
            this._unsubscribe();
            this._subscribe();
        }
    }
    _subscribe() {
        if (!this.hass || !this.forecastEntityId) {
            return;
        }
        log.debug(`Subscribing to daily forecast for ${this.forecastEntityId}`);
        this._forecastSubscribed = subscribeForecast(this.hass, this.forecastEntityId, 'daily', (event) => {
            log.debug('Daily Forecast Received in Element.', event);
            this._forecastEvent = event;
        });
    }
    _unsubscribe() {
        if (this._forecastSubscribed) {
            log.debug(`Unsubscribing from daily forecast for ${this.forecastEntityId}`);
            this._forecastSubscribed.then((unsub) => unsub()).catch(() => { });
            this._forecastSubscribed = undefined;
            this._forecastEvent = undefined; // Clear data on unsubscribe
        }
    }
    _renderForecastRow(day, low, high, rain, rainChance, condition) {
        return [
            x `<div class="day">${day}</div>`,
            x `<div class="icon-container">
        <bwc-weather-icon-element
          .noPadding=${true}
          .useHAWeatherIcons=${this.useHAWeatherIcons}
          .weatherIcon=${condition}
          .iconSize=${ICON_SIZE.REGULAR}
        ></bwc-weather-icon-element>
      </div>`,
            x `<div class="temperature">${typeof low === 'number' ? `${low}° - ` : ''}${high}°</div>`,
            x `<div class="rain">${rain === 0 ? 'No Rain' : `${rain}mm`}${rain === 0 ? '' : ` (${rainChance}%)`}</div>`,
        ];
    }
    render() {
        // Add host attribute for styling when title is hidden
        this.toggleAttribute('notitle', !this.showTitle);
        // Render loading if forecast event hasn't arrived yet
        if (!this._forecastEvent || !this._forecastEvent.forecast) {
            return x `
        <div class="container">
          ${this.showTitle ? x `<div class="title">Daily forecast</div>` : E}
          <div class="loading">Loading Forecast...</div>
        </div>
      `;
        }
        // Get today's date at midnight for comparison
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        // Process forecast data
        const futureForecasts = this._forecastEvent.forecast
            .filter((dayForecast) => {
            const forecastDate = new Date(dayForecast.datetime);
            forecastDate.setHours(0, 0, 0, 0);
            return forecastDate.getTime() !== today.getTime(); // Keep only future days
        })
            .slice(0, this.numberOfDays); // Limit number of days shown
        // Generate grid items including separators
        const gridItems = [];
        futureForecasts.forEach((dayForecast, index) => {
            gridItems.push(...this._renderForecastRow(new Date(dayForecast.datetime).toLocaleDateString('en-US', { weekday: 'long' }), dayForecast.templow ?? undefined, dayForecast.temperature, dayForecast.precipitation ?? 0, dayForecast.precipitation_probability ?? 0, dayForecast.condition ?? ''));
            // Add separator after each row except the last one
            if (index < futureForecasts.length - 1) {
                gridItems.push(x `<div class="forecast-separator"></div>`);
            }
        });
        return x `
      <div class="container">
        ${this.showTitle ? x `<div class="title">Daily forecast</div>` : E}
        <div class="forecast-grid">
          ${gridItems.length > 0 ? gridItems : x `<div class="loading">No future forecast available.</div>`}
        </div>
      </div>
    `;
    }
};
BwcDailyForecastElement.styles = i$5 `
    :host {
      color: var(--bwc-text-color);
      /* Removed estimated row count/height vars for now */
    }

    .container {
      display: flex;
      flex-direction: column;
      padding: var(--bwc-global-padding);
      /* Simpler min-height based on title+padding, content determines rest */
      min-height: calc(
        (var(--bwc-section-header-font-size) * 1.2) /* Title height approx */ + var(--bwc-global-padding)
          /* Space below title */ + var(--bwc-global-padding) /* Bottom padding */
      );
    }

    .title:not(:empty) {
      /* Only add margin if title is shown */
      margin-bottom: var(--bwc-global-padding);
    }

    /* Remove min-height if title is hidden */
    :host([notitle]) .container {
      min-height: 0; /* Or just padding calc if preferred */
    }

    .loading {
      display: block;
      text-align: center;
      padding: var(--bwc-global-padding) 0; /* Add some padding */
    }

    .forecast-grid {
      display: grid;
      /* Day(max), Icon(fixed), Temp(fill), Rain(max) */
      grid-template-columns: max-content auto auto max-content;
      align-items: center;
      gap: 0 calc(var(--bwc-global-padding) / 2);
    }

    /* Style for the new separator element */
    .forecast-separator {
      grid-column: 1 / -1; /* Span all columns */
      border-bottom: 1px solid var(--divider-color);
      height: 1px;
      margin: calc(var(--bwc-global-padding) / 2) 0; /* Vertical spacing */
    }

    .day {
      font-weight: bold;
      text-align: left;
      font-size: var(--bwc-daily-forecast-day-font-size);
      padding: calc(var(--bwc-global-padding) / 2) 0; /* Restore padding */
    }

    .icon-container {
      /* Container for centering icon */
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: calc(var(--bwc-global-padding) / 2) 0; /* Restore padding */
    }

    .temperature {
      text-align: left;
      font-size: var(--bwc-daily-forecast-temp-font-size);
      padding: calc(var(--bwc-global-padding) / 2) 0; /* Restore padding */
      white-space: nowrap;
    }

    .rain {
      text-align: right;
      font-size: var(--bwc-daily-forecast-rain-font-size);
      padding: calc(var(--bwc-global-padding) / 2) 0; /* Restore padding */
      white-space: break-spaces;
    }
  `;
__decorate([
    n$1({ attribute: false })
], BwcDailyForecastElement.prototype, "hass", undefined);
__decorate([
    n$1({ type: String })
], BwcDailyForecastElement.prototype, "forecastEntityId", undefined);
__decorate([
    n$1({ type: Boolean })
], BwcDailyForecastElement.prototype, "useHAWeatherIcons", undefined);
__decorate([
    n$1({ type: Boolean })
], BwcDailyForecastElement.prototype, "showTitle", undefined);
__decorate([
    n$1({ type: Number })
], BwcDailyForecastElement.prototype, "numberOfDays", undefined);
__decorate([
    r()
], BwcDailyForecastElement.prototype, "_forecastSubscribed", undefined);
__decorate([
    r()
], BwcDailyForecastElement.prototype, "_forecastEvent", undefined);
BwcDailyForecastElement = __decorate([
    t$1('bwc-daily-forecast-element')
], BwcDailyForecastElement);

var classnames$1 = {exports: {}};

/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/

var hasRequiredClassnames;

function requireClassnames () {
	if (hasRequiredClassnames) return classnames$1.exports;
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
	} (classnames$1));
	return classnames$1.exports;
}

var classnamesExports = requireClassnames();
var classnames = /*@__PURE__*/getDefaultExportFromCjs(classnamesExports);

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
 * This helper function is used to determine if an entity should be rendered based
 * on the config and cardEntities
 *
 * @param config  The card config object
 * @param cardEntities  The card entities object
 * @param toggleConfigProp  The config prop or props that should be checked to determine if the entity should be rendered
 * @param entityConfigProp  The entity config prop that should be checked to determine if the entity should be rendered
 * @returns
 */
const shouldRenderEntity = (config, cardEntities, toggleConfigProp, entityConfigProp) => {
    const toggleConfigProps = Array.isArray(toggleConfigProp)
        ? toggleConfigProp
        : [toggleConfigProp];
    // Iterate over the toggleConfigProps and return false if any of them are false
    for (const prop of toggleConfigProps) {
        if (!config[prop]) {
            return false;
        }
    }
    // Return false if the entityConfigProp is not defined
    if (!cardEntities[entityConfigProp]?.entity_id) {
        return false;
    }
    return true;
};

let SummaryElement = class SummaryElement extends r$2 {
    static get styles() {
        const backgroundsBaseUrl = new URL('img/backgrounds', import.meta.url).toString();
        return i$5 `
      ${cssVariables}
      ${globalStyles}
      ${containerStyles}

      .summary {
        --background-url: url(${r$5(`${backgroundsBaseUrl}/partially-cloudy.png`)});

        display: block;

        background: linear-gradient(to bottom, var(--bwc-background-color-start), var(--bwc-background-color-end)),
          var(--background-url);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        background-blend-mode: overlay;
        border-radius: var(--ha-card-border-radius, 12px);

        /* Conditional Colors based on Day/Night and Dark/Light Theme */
        /* Light Theme / Day Mode */
        --bwc-text-color: var(--text-light-primary-color);
        --bwc-text-color-inverted: var(--text-primary-color);
        --bwc-background-color-start: var(--bwc-background-color-day-start);
        --bwc-background-color-end: var(--bwc-background-color-day-end);

        /* Light Theme / Night Mode */
        &.night {
          --bwc-text-color: var(--text-primary-color);
          --bwc-text-color-inverted: var(--text-light-primary-color);
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

        /* Cloudy (TODO: dark-mode background) */
        &.cloudy,
        &.dark-mode.cloudy {
          --background-url: url(${r$5(`${backgroundsBaseUrl}/cloudy.png`)});
          --bwc-background-color-start: var(--bwc-background-color-day-cloudy-start);
          --bwc-background-color-end: var(--bwc-background-color-day-cloudy-end);
        }

        /* Stormy (same in dark mode) */
        &.stormy,
        &.dark-mode.stormy {
          --background-url: url(${r$5(`${backgroundsBaseUrl}/stormy.png`)});
          --bwc-background-color-start: var(--bwc-background-color-day-stormy-start);
          --bwc-background-color-end: var(--bwc-background-color-day-stormy-end);
        }
      }
    `;
    }
    render() {
        const showCurrentTemp = shouldRenderEntity(this.config, this.cardEntities, CONFIG_PROP.SHOW_CURRENT_TEMP, CONFIG_PROP.CURRENT_TEMP_ENTITY_ID);
        const showWeatherIcon = shouldRenderEntity(this.config, this.cardEntities, CONFIG_PROP.SHOW_WEATHER_ICON, CONFIG_PROP.WEATHER_ICON_ENTITY_ID);
        const weatherIcon = showWeatherIcon
            ? getCardEntityValueAsString(this.hass, this.cardEntities[CONFIG_PROP.WEATHER_ICON_ENTITY_ID])
            : '';
        const showTime = shouldRenderEntity(this.config, this.cardEntities, CONFIG_PROP.SHOW_TIME, CONFIG_PROP.TIME_ENTITY_ID);
        const showDate = shouldRenderEntity(this.config, this.cardEntities, CONFIG_PROP.SHOW_DATE, CONFIG_PROP.DATE_ENTITY_ID);
        const showFeelsLikeTemperature = shouldRenderEntity(this.config, this.cardEntities, CONFIG_PROP.SHOW_FEELS_LIKE_TEMP, CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID);
        const showNowLater = this.config[CONFIG_PROP.SHOW_NOW_LATER_TEMPS] === true;
        const showNowLaterNow = shouldRenderEntity(this.config, this.cardEntities, CONFIG_PROP.SHOW_NOW_LATER_TEMPS, CONFIG_PROP.NOW_LATER_NOW_TEMP_ENTITY_ID);
        const showNowLaterLater = shouldRenderEntity(this.config, this.cardEntities, CONFIG_PROP.SHOW_NOW_LATER_TEMPS, CONFIG_PROP.NOW_LATER_LATER_TEMP_ENTITY_ID);
        const showWarningCount = shouldRenderEntity(this.config, this.cardEntities, CONFIG_PROP.SHOW_WARNING_COUNT, CONFIG_PROP.WARNING_COUNT_ENTITY_ID) &&
            (!this.config[CONFIG_PROP.HIDE_WARNING_COUNT_IF_ZERO] ||
                (getCardEntityValueAsNumber(this.hass, this.cardEntities[CONFIG_PROP.WARNING_COUNT_ENTITY_ID]) ?? 0) > 0);
        const showRainSummary = shouldRenderEntity(this.config, this.cardEntities, CONFIG_PROP.SHOW_RAIN_SUMMARY, CONFIG_PROP.RAIN_SUMMARY_ENTITY_ID);
        const rainSummary = getCardEntityValueAsString(this.hass, this.cardEntities[CONFIG_PROP.RAIN_SUMMARY_ENTITY_ID]);
        const showForecastSummary = shouldRenderEntity(this.config, this.cardEntities, CONFIG_PROP.SHOW_FORECAST_SUMMARY, CONFIG_PROP.FORECAST_SUMMARY_ENTITY_ID);
        return x `<div
      class=${classnames('summary', this.weatherClass, {
            day: this.dayMode,
            night: !this.dayMode,
            'dark-mode': this.darkMode,
        })}
    >
      <!-- First Row (Current temp, weather icon and time/date) -->
      ${showCurrentTemp || showWeatherIcon || showTime
            ? x `<div class="item-container reverse">
            <!-- Current Temperature -->
            ${showCurrentTemp
                ? x `<bwc-temperature-element
                  class="item"
                  .localize=${this.localize}
                  .isLarge=${true}
                  .value=${getCardEntityValueAsNumber(this.hass, this.cardEntities[CONFIG_PROP.CURRENT_TEMP_ENTITY_ID])}
                  .feelsLikeTemperature=${showFeelsLikeTemperature
                    ? getCardEntityValueAsNumber(this.hass, this.cardEntities[CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID])
                    : undefined}
                ></bwc-temperature-element>`
                : E}

            <!-- Weather Icon  -->
            ${showWeatherIcon
                ? x `<bwc-weather-icon-element
                  class=${classnames('item', {
                    center: showTime,
                    right: !showTime,
                })}
                  .iconSize=${ICON_SIZE.HUGE}
                  .useHAWeatherIcons=${this.config[CONFIG_PROP.USE_HA_WEATHER_ICONS] === true}
                  .weatherIcon=${weatherIcon}
                ></bwc-weather-icon-element>`
                : E}

            <!-- Time -->
            ${showTime
                ? x `<bwc-time-date-element
                  class="item right"
                  .hass=${this.hass}
                  .showDate=${showDate}
                  .cardTimeEntity=${this.cardEntities[CONFIG_PROP.TIME_ENTITY_ID]}
                  .cardDateEntity=${this.cardEntities[CONFIG_PROP.DATE_ENTITY_ID]}
                ></bwc-time-date-element>`
                : E}
          </div> `
            : E}

      <!-- Second Row (now/later temps and warnings) -->
      ${showNowLater || showWarningCount
            ? x `<div class="item-container justify-left">
            ${showNowLaterNow
                ? x `<bwc-temperature-element
                  class="item left no-grow"
                  .decimalPlaces=${0}
                  .value=${getCardEntityValueAsNumber(this.hass, this.cardEntities[CONFIG_PROP.NOW_LATER_NOW_TEMP_ENTITY_ID])}
                  .label=${getCardEntityValueAsString(this.hass, this.cardEntities[CONFIG_PROP.NOW_LATER_NOW_LABEL_ENTITY_ID])}
                ></bwc-temperature-element> `
                : E}
            ${showNowLaterLater
                ? x `<bwc-temperature-element
                  class="item left no-grow"
                  .decimalPlaces=${0}
                  .value=${getCardEntityValueAsNumber(this.hass, this.cardEntities[CONFIG_PROP.NOW_LATER_LATER_TEMP_ENTITY_ID])}
                  .label=${getCardEntityValueAsString(this.hass, this.cardEntities[CONFIG_PROP.NOW_LATER_LATER_LABEL_ENTITY_ID])}
                ></bwc-temperature-element> `
                : E}
            ${showWarningCount
                ? x `<bwc-warnings-icon-element
                  class="item right"
                  .value=${getCardEntityValueAsNumber(this.hass, this.cardEntities[CONFIG_PROP.WARNING_COUNT_ENTITY_ID])}
                ></bwc-warnings-icon-element> `
                : E}
          </div> `
            : E}

      <!-- Third and Fourth Row -->
      <div class="item-container column">
        ${showRainSummary
            ? x `<bwc-value-label-element
              class="item"
              .value=${`${rainSummary === '0' ? this.localize('card.noRain') : `${rainSummary}mm`}`}
              .label=${rainSummary === '0' ? undefined : this.localize('card.rain')}
            ></bwc-value-label-element> `
            : E}
        ${showForecastSummary
            ? x `<bwc-value-label-element
              class="item"
              .value=${getCardEntityValueAsString(this.hass, this.cardEntities[CONFIG_PROP.FORECAST_SUMMARY_ENTITY_ID])}
            ></bwc-value-label-element>`
            : E}
      </div>
    </div> `;
    }
};
__decorate([
    n$1({ attribute: false })
], SummaryElement.prototype, "hass", undefined);
__decorate([
    n$1({ type: Object })
], SummaryElement.prototype, "config", undefined);
__decorate([
    n$1({ type: Object })
], SummaryElement.prototype, "cardEntities", undefined);
__decorate([
    n$1({ type: Object })
], SummaryElement.prototype, "localize", undefined);
__decorate([
    n$1({ type: Boolean })
], SummaryElement.prototype, "dayMode", undefined);
__decorate([
    n$1({ type: Boolean })
], SummaryElement.prototype, "darkMode", undefined);
__decorate([
    n$1({ type: String })
], SummaryElement.prototype, "weatherClass", undefined);
__decorate([
    n$1({ type: Object })
], SummaryElement.prototype, "weatherSummaryData", undefined);
SummaryElement = __decorate([
    t$1('bwc-summary-element')
], SummaryElement);

const elementStyles = i$5 `
  ${globalStyles}

  :host {
    display: block;
  }
`;

let temperatureElement = class temperatureElement extends r$2 {
    constructor() {
        super(...arguments);
        this.isLarge = false;
        this.decimalPlaces = 1;
    }
    render() {
        const classes = {
            'temperature-element': true,
            large: this.isLarge,
        };
        return x `<div class=${e$1(classes)}>
      <span class="number">${this.value !== undefined ? this.value.toFixed(this.decimalPlaces) : '-'}&deg;</span>
      ${this.feelsLikeTemperature !== undefined
            ? x `
            <span class="feels-like"
              >${this.localize('card.feelsLike')}&nbsp;<strong
                >${this.feelsLikeTemperature.toFixed(this.decimalPlaces)}&deg;</strong
              ></span
            >
          `
            : E}
      ${this.label !== undefined ? x `<span class="label">${this.label}</span>` : E}
    </div>`;
    }
    static get styles() {
        return i$5 `
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
    n$1({ type: Boolean })
], temperatureElement.prototype, "isLarge", undefined);
__decorate([
    n$1({ type: Number })
], temperatureElement.prototype, "value", undefined);
__decorate([
    n$1({ type: Number })
], temperatureElement.prototype, "feelsLikeTemperature", undefined);
__decorate([
    n$1({ type: Number })
], temperatureElement.prototype, "decimalPlaces", undefined);
__decorate([
    n$1()
], temperatureElement.prototype, "label", undefined);
__decorate([
    n$1()
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
        return x `<div class="time-date-element">
      <span class="time">${this._currentTime}</span>
      ${showDate ? x `<span class="date">${this._currentDate}</span>` : E}
    </div>`;
    }
    static get styles() {
        return i$5 `
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
    n$1({ attribute: false })
], TimeElement.prototype, "hass", undefined);
__decorate([
    n$1({ type: Boolean })
], TimeElement.prototype, "showDate", undefined);
__decorate([
    n$1({ type: Object })
], TimeElement.prototype, "cardTimeEntity", undefined);
__decorate([
    n$1({ type: Object })
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
        return x `<div class="value-label-element">
      ${this.value && x `<span class="value">${this.value}</span>`}
      ${this.label && x `<span class="label">${this.label}</span>`}
    </div>`;
    }
    static get styles() {
        return i$5 `
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
    n$1()
], ValueLabelElement.prototype, "value", undefined);
__decorate([
    n$1()
], ValueLabelElement.prototype, "label", undefined);
ValueLabelElement = __decorate([
    t$1('bwc-value-label-element')
], ValueLabelElement);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class e extends i$1{constructor(i){if(super(i),this.it=E,i.type!==t.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===E||null==r)return this._t=undefined,this.it=r;if(r===T)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this._t;this.it=r;const s=[r];return s.raw=s,this._t={_$litType$:this.constructor.resultType,strings:s,values:[]}}}e.directiveName="unsafeHTML",e.resultType=1;const o$1=e$2(e);

var warning = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" id=\"Layer_1\" data-name=\"Layer 1\" viewBox=\"0 0 24 24\" width=\"512\" height=\"512\"><path d=\"M23.64,18.1L14.24,2.28c-.47-.8-1.3-1.28-2.24-1.28s-1.77,.48-2.23,1.28L.36,18.1h0c-.47,.82-.47,1.79,0,2.6s1.31,1.3,2.24,1.3H21.41c.94,0,1.78-.49,2.24-1.3s.46-1.78-.01-2.6Zm-10.64-.1h-2v-2h2v2Zm0-4h-2v-6h2v6Z\"/></svg>";

const ICON = {
    WARNING: warning,
};

let WarningsIconElement = class WarningsIconElement extends r$2 {
    render() {
        const classes = {
            'warnings-icon-element': true,
            'has-warnings': !!(this.value && this.value > 0),
        };
        return x `<div class=${e$1(classes)}>
      <div class="icon-value-wrapper">
        <div class="bwc-icon">${x `${o$1(ICON.WARNING)}`}</div>
        <div class="value-wrapper">
          <span class="value">${this.value}</span>
        </div>
      </div>
    </div>`;
    }
    static get styles() {
        return i$5 `
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

              path {
                fill: var(--bwc-waring-text-color);
              }
            }
          }

          .value-wrapper {
            padding: 0.5em;
            font-size: var(--bwc-warning-font-size);
            color: var(--bwc-waring-text-color);
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
    n$1({ type: Number })
], WarningsIconElement.prototype, "value", undefined);
WarningsIconElement = __decorate([
    t$1('bwc-warnings-icon-element')
], WarningsIconElement);

/*
 * These strings are used to filter for weather-related entities retrieved
 * from the Home Assistant API response. If there are other weather-related
 * entities that you would like to include, add them here.
 */
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
        return i$5 `
      ${elementStyles}
    `;
    }
};
__decorate([
    n$1({ attribute: false })
], WeatherDevicePickerElement.prototype, "hass", undefined);
__decorate([
    n$1({ type: String })
], WeatherDevicePickerElement.prototype, "label", undefined);
__decorate([
    n$1({ type: String, reflect: true })
], WeatherDevicePickerElement.prototype, "value", undefined);
__decorate([
    n$1({ type: String, reflect: true })
], WeatherDevicePickerElement.prototype, "boobs", undefined);
__decorate([
    r()
], WeatherDevicePickerElement.prototype, "weatherDevices", undefined);
WeatherDevicePickerElement = __decorate([
    t$1('bwc-weather-device-picker-element')
], WeatherDevicePickerElement);

const DAY_MODE = {
    DAY: 'day',
    NIGHT: 'night',
};

var sunny = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"96\" height=\"96\" viewBox=\"0 0 96 96\"><defs><style>.cls-1{fill:none;}.cls-2{opacity:0.15;}.cls-3{fill:#ffe58d;}.cls-4{fill:#ffea0d;}.cls-5{opacity:0.58;}.cls-6{fill:#ffdf64;}</style></defs><title>01-sunny</title><g id=\"Forecast_Icons_Outlined\" data-name=\"Forecast Icons Outlined\"><rect class=\"cls-1\" width=\"96\" height=\"96\"/><g class=\"cls-2\"><circle class=\"cls-3\" cx=\"43.44\" cy=\"42.81\" r=\"41.51\"/></g><g class=\"cls-2\"><path class=\"cls-4\" d=\"M79.71,63A72.39,72.39,0,0,1,42,46,183.73,183.73,0,0,0,7.43,22.21,41.5,41.5,0,1,0,79.71,63Z\"/></g><circle class=\"cls-3\" cx=\"43.44\" cy=\"42.81\" r=\"27.74\"/><g class=\"cls-5\"><path class=\"cls-6\" d=\"M15.7,42.81a27.73,27.73,0,0,0,54,8.88C57.82,49.9,45.22,45.25,34.76,35c-3.46-3.37-7.34-7.4-11.33-11.41A27.61,27.61,0,0,0,15.7,42.81Z\"/></g></g></svg>";

var clearNight = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"96\" height=\"96\" viewBox=\"0 0 96 96\"><defs><style>.cls-1{fill:none;}.cls-2{opacity:0.3;}.cls-3{fill:#fff;}.cls-3,.cls-4,.cls-6{fill-rule:evenodd;}.cls-4{fill:#fffbf1;}.cls-5{opacity:0.85;}.cls-6{fill:#eaeaea;}</style></defs><title>02-clear-night</title><g id=\"Forecast_Icons_Outlined\" data-name=\"Forecast Icons Outlined\"><rect class=\"cls-1\" width=\"96\" height=\"96\"/><g class=\"cls-2\"><path class=\"cls-3\" d=\"M14.08,16.05a41.51,41.51,0,1,1,0,58.71,41.52,41.52,0,0,1,0-58.71\"/></g><path class=\"cls-4\" d=\"M23.82,25.79a27.74,27.74,0,1,1,0,39.23,27.75,27.75,0,0,1,0-39.23\"/><g class=\"cls-5\"><path class=\"cls-6\" d=\"M45.73,17.77A40.46,40.46,0,0,0,47.4,72.83a27.72,27.72,0,0,0-1.67-55.06Z\"/></g></g></svg>";

var partlyCloudy = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"96\" height=\"96\" viewBox=\"0 0 96 96\"><defs><style>.cls-1{fill:none;}.cls-2{fill:#ffe58d;}.cls-3{opacity:0.58;}.cls-4{fill:#ffdf64;}.cls-5{fill:#efefef;}</style></defs><title>03-partly-cloudy</title><g id=\"Forecast_Icons_Outlined\" data-name=\"Forecast Icons Outlined\"><rect class=\"cls-1\" width=\"96\" height=\"96\"/><circle class=\"cls-2\" cx=\"66.36\" cy=\"29.04\" r=\"27.74\"/><g class=\"cls-3\"><path class=\"cls-4\" d=\"M38.62,29a27.73,27.73,0,0,0,54,8.88c-11.88-1.79-24.47-6.44-34.94-16.65-3.46-3.38-7.34-7.4-11.33-11.41A27.61,27.61,0,0,0,38.62,29Z\"/></g><path class=\"cls-5\" d=\"M87.61,62.3A14.9,14.9,0,0,0,76.55,47.91a10.47,10.47,0,0,0,.87-4.19,10.52,10.52,0,0,0-14-10.07,23.69,23.69,0,0,0-46.48,5.57,19.16,19.16,0,0,0,3.53,38c.18,0,.35,0,.53,0v0H72.87A14.91,14.91,0,0,0,87.61,62.3Z\"/></g></svg>";

var partlyCloudyNight = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"96\" height=\"96\" viewBox=\"0 0 96 96\"><defs><style>.cls-1{fill:none;}.cls-2{fill:#fffbf1;}.cls-2,.cls-4{fill-rule:evenodd;}.cls-3{opacity:0.85;}.cls-4{fill:#eaeaea;}.cls-5{fill:#c9c9c9;}</style></defs><title>03-partly-cloudy-night</title><g id=\"Forecast_Icons_Outlined\" data-name=\"Forecast Icons Outlined\"><rect class=\"cls-1\" width=\"96\" height=\"96\"/><path class=\"cls-2\" d=\"M46.74,9.42a27.74,27.74,0,1,1,0,39.23,27.76,27.76,0,0,1,0-39.23\"/><g class=\"cls-3\"><path class=\"cls-4\" d=\"M68.65,1.41a40.45,40.45,0,0,0,1.67,55.05,27.71,27.71,0,0,0-1.67-55Z\"/></g><path class=\"cls-5\" d=\"M87.61,62.3A14.9,14.9,0,0,0,76.55,47.91a10.47,10.47,0,0,0,.87-4.19,10.52,10.52,0,0,0-14-10.07,23.69,23.69,0,0,0-46.48,5.57,19.16,19.16,0,0,0,3.53,38c.18,0,.35,0,.53,0v0H72.87A14.91,14.91,0,0,0,87.61,62.3Z\"/></g></svg>";

var cloudy = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"96\" height=\"96\" viewBox=\"0 0 96 96\"><defs><style>.cls-1{fill:none;}.cls-2{fill:#c8c8c8;}.cls-3{opacity:0.15;}.cls-4{fill:#9d9d9d;}.cls-5{fill:#dcdcdc;}</style></defs><title>04-cloudy</title><g id=\"Forecast_Icons_Outlined\" data-name=\"Forecast Icons Outlined\"><rect class=\"cls-1\" width=\"96\" height=\"96\"/><circle class=\"cls-2\" cx=\"80.75\" cy=\"40.28\" r=\"13.95\"/><circle class=\"cls-2\" cx=\"64.33\" cy=\"29.05\" r=\"20.64\"/><g class=\"cls-3\"><path class=\"cls-4\" d=\"M91.1,49.57c-1.86-8.47-7.38-17-18.9-23.2-7.14-3.81-12.23-9.77-16.7-16A20.62,20.62,0,0,0,69.87,48.92a13.79,13.79,0,0,0,21.23.65Z\"/></g><path class=\"cls-5\" d=\"M88.37,62.3A14.91,14.91,0,0,0,77.31,47.91,10.56,10.56,0,0,0,64.17,33.65a23.69,23.69,0,0,0-46.48,5.57,19.16,19.16,0,0,0,3.53,38c.18,0,.36,0,.54,0v0H73.62A14.91,14.91,0,0,0,88.37,62.3Z\"/></g></svg>";

var cloudyNight = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"96\" height=\"96\" viewBox=\"0 0 96 96\"><defs><style>.cls-1{fill:none;}.cls-2{fill:#a6a6a6;}.cls-3{opacity:0.15;}.cls-4{fill:#787878;}.cls-5{fill:#c9c9c9;}</style></defs><title>04-cloudy-night</title><g id=\"Forecast_Icons_Outlined\" data-name=\"Forecast Icons Outlined\"><rect class=\"cls-1\" width=\"96\" height=\"96\"/><circle class=\"cls-2\" cx=\"80.75\" cy=\"40.28\" r=\"13.95\"/><circle class=\"cls-2\" cx=\"64.33\" cy=\"29.05\" r=\"20.64\"/><g class=\"cls-3\"><path class=\"cls-4\" d=\"M91.1,49.57c-1.86-8.47-7.38-17-18.9-23.2-7.14-3.81-12.23-9.77-16.7-16A20.62,20.62,0,0,0,69.87,48.92a13.79,13.79,0,0,0,21.23.65Z\"/></g><path class=\"cls-5\" d=\"M88.37,62.3A14.91,14.91,0,0,0,77.31,47.91,10.56,10.56,0,0,0,64.17,33.65a23.69,23.69,0,0,0-46.48,5.57,19.16,19.16,0,0,0,3.53,38c.18,0,.36,0,.54,0v0H73.62A14.91,14.91,0,0,0,88.37,62.3Z\"/></g></svg>";

var mostlySunny = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"96\" height=\"96\" viewBox=\"0 0 96 96\"><defs><style>.cls-1{fill:#ffe58d;}.cls-2{opacity:0.58;}.cls-3{fill:#ffdf64;}.cls-4{opacity:0.6;}.cls-5{fill:#efefef;}.cls-6{fill:none;}</style></defs><title>05-mostly-sunny</title><g id=\"Forecast_Icons_Outlined\" data-name=\"Forecast Icons Outlined\"><circle class=\"cls-1\" cx=\"54.65\" cy=\"29.04\" r=\"27.74\"/><g class=\"cls-2\"><path class=\"cls-3\" d=\"M26.91,29a27.73,27.73,0,0,0,54,8.88C69,36.13,56.44,31.48,46,21.27c-3.46-3.38-7.34-7.4-11.33-11.41A27.61,27.61,0,0,0,26.91,29Z\"/></g><g class=\"cls-4\"><path class=\"cls-5\" d=\"M88,52.09H62.69a2.6,2.6,0,1,1,0-5.2H88a2.6,2.6,0,1,1,0,5.2Z\"/></g><path class=\"cls-5\" d=\"M80.21,57.29H64.48a10.69,10.69,0,0,0,1.6-5.63A10.83,10.83,0,0,0,55.24,40.83a10.69,10.69,0,0,0-5.16,1.31,8.6,8.6,0,0,0-14.42-5.91,14.46,14.46,0,0,0-26,10.83c-.2,0-.41,0-.62,0A7.73,7.73,0,0,0,9,62.49h14.9a2.6,2.6,0,1,1,0,5.2H19.61a2.6,2.6,0,0,0,0,5.2H58.05a2.6,2.6,0,0,0,0-5.2H54.32a2.6,2.6,0,0,1,0-5.2h25.9a2.6,2.6,0,1,0,0-5.2Z\"/><g class=\"cls-4\"><path class=\"cls-5\" d=\"M9.23,72.89H4.8a2.6,2.6,0,1,1,0-5.2H9.23a2.6,2.6,0,0,1,0,5.2Z\"/></g><g class=\"cls-4\"><path class=\"cls-5\" d=\"M72.37,72.89h-5.3a2.6,2.6,0,0,1,0-5.2h5.3a2.6,2.6,0,0,1,0,5.2Z\"/></g><g class=\"cls-4\"><path class=\"cls-5\" d=\"M91.88,72.89H81.4a2.6,2.6,0,0,1,0-5.2H91.88a2.6,2.6,0,0,1,0,5.2Z\"/></g><g class=\"cls-4\"><path class=\"cls-5\" d=\"M74.29,83.29H44.53a2.6,2.6,0,0,1,0-5.2H74.29a2.6,2.6,0,0,1,0,5.2Z\"/></g><g class=\"cls-4\"><path class=\"cls-5\" d=\"M34.15,83.29H24.5a2.6,2.6,0,0,1,0-5.2h9.65a2.6,2.6,0,0,1,0,5.2Z\"/></g><g class=\"cls-4\"><path class=\"cls-5\" d=\"M84.75,83.29h-1a2.6,2.6,0,0,1,0-5.2h1a2.6,2.6,0,0,1,0,5.2Z\"/></g><rect class=\"cls-6\" width=\"96\" height=\"96\"/></g></svg>";

var mostlySunnyNight = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"96\" height=\"96\" viewBox=\"0 0 96 96\"><defs><style>.cls-1{fill:#fffbf1;}.cls-1,.cls-3{fill-rule:evenodd;}.cls-2{opacity:0.85;}.cls-3{fill:#eaeaea;}.cls-4{opacity:0.6;}.cls-5{fill:#c9c9c9;}.cls-6{fill:none;}</style></defs><title>05-mostly-sunny-night</title><g id=\"Forecast_Icons_Outlined\" data-name=\"Forecast Icons Outlined\"><path class=\"cls-1\" d=\"M35,9.42a27.74,27.74,0,1,1,0,39.23A27.75,27.75,0,0,1,35,9.42\"/><g class=\"cls-2\"><path class=\"cls-3\" d=\"M56.94,1.41a40.46,40.46,0,0,0,1.68,55.05,27.71,27.71,0,0,0-1.68-55Z\"/></g><g class=\"cls-4\"><path class=\"cls-5\" d=\"M88,52.09H62.69a2.6,2.6,0,1,1,0-5.2H88a2.6,2.6,0,1,1,0,5.2Z\"/></g><path class=\"cls-5\" d=\"M80.21,57.29H64.48a10.69,10.69,0,0,0,1.6-5.63A10.83,10.83,0,0,0,55.24,40.83a10.69,10.69,0,0,0-5.16,1.31,8.6,8.6,0,0,0-14.42-5.91,14.46,14.46,0,0,0-26,10.83c-.2,0-.41,0-.62,0A7.73,7.73,0,0,0,9,62.49h14.9a2.6,2.6,0,1,1,0,5.2H19.61a2.6,2.6,0,0,0,0,5.2H58.05a2.6,2.6,0,0,0,0-5.2H54.32a2.6,2.6,0,0,1,0-5.2h25.9a2.6,2.6,0,1,0,0-5.2Z\"/><g class=\"cls-4\"><path class=\"cls-5\" d=\"M9.23,72.89H4.8a2.6,2.6,0,1,1,0-5.2H9.23a2.6,2.6,0,0,1,0,5.2Z\"/></g><g class=\"cls-4\"><path class=\"cls-5\" d=\"M72.37,72.89h-5.3a2.6,2.6,0,0,1,0-5.2h5.3a2.6,2.6,0,0,1,0,5.2Z\"/></g><g class=\"cls-4\"><path class=\"cls-5\" d=\"M91.88,72.89H81.4a2.6,2.6,0,0,1,0-5.2H91.88a2.6,2.6,0,0,1,0,5.2Z\"/></g><g class=\"cls-4\"><path class=\"cls-5\" d=\"M74.29,83.29H44.53a2.6,2.6,0,0,1,0-5.2H74.29a2.6,2.6,0,0,1,0,5.2Z\"/></g><g class=\"cls-4\"><path class=\"cls-5\" d=\"M34.15,83.29H24.5a2.6,2.6,0,0,1,0-5.2h9.65a2.6,2.6,0,0,1,0,5.2Z\"/></g><g class=\"cls-4\"><path class=\"cls-5\" d=\"M84.75,83.29h-1a2.6,2.6,0,0,1,0-5.2h1a2.6,2.6,0,0,1,0,5.2Z\"/></g><rect class=\"cls-6\" width=\"96\" height=\"96\"/></g></svg>";

var wind = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"96\" height=\"96\" viewBox=\"0 0 96 96\"><defs><style>.cls-1{fill:none;}.cls-2{opacity:0.1;}.cls-3{opacity:0.2;}.cls-4{fill:#c7d8e6;}.cls-5{fill:#d0dfbb;}</style></defs><title>09-wind</title><g id=\"Forecast_Icons_Outlined\" data-name=\"Forecast Icons Outlined\"><rect class=\"cls-1\" width=\"96\" height=\"96\"/><g class=\"cls-2\"><path d=\"M74.09,45.41H57.44a2.6,2.6,0,0,1,0-5.2H74.09a5,5,0,0,0,3.56-8.6,2.6,2.6,0,0,1,3.68-3.68,10.24,10.24,0,0,1-7.24,17.48Z\"/></g><g class=\"cls-3\"><path d=\"M64.77,68.41A2.6,2.6,0,0,1,62.93,64a4.79,4.79,0,0,0-3.39-8.18H46.27a2.6,2.6,0,1,1,0-5.2H59.54A10,10,0,0,1,66.6,67.65,2.56,2.56,0,0,1,64.77,68.41Z\"/></g><path class=\"cls-4\" d=\"M35.89,55.79H3.46a2.6,2.6,0,1,1,0-5.2H35.89a2.6,2.6,0,1,1,0,5.2Z\"/><g class=\"cls-3\"><path d=\"M47.07,45.41H31.82a2.6,2.6,0,0,1,0-5.2H47.07a2.6,2.6,0,1,1,0,5.2Z\"/></g><g class=\"cls-2\"><path d=\"M51.88,71.52a2.6,2.6,0,0,1-2.6-2.6,2.75,2.75,0,0,0-2.75-2.75H12.88a2.6,2.6,0,0,1,0-5.2H46.53a8,8,0,0,1,7.95,8A2.61,2.61,0,0,1,51.88,71.52Z\"/></g><g class=\"cls-3\"><path d=\"M63.57,35H38.67a2.6,2.6,0,0,1,0-5.2h24.9a2.75,2.75,0,0,0,1.94-4.7,2.8,2.8,0,0,0-3.32-.43,2.6,2.6,0,0,1-2.62-4.5,8,8,0,0,1,4-1.07,8,8,0,0,1,0,15.9Z\"/></g><circle class=\"cls-5\" cx=\"76.13\" cy=\"53.19\" r=\"2.6\"/><circle class=\"cls-5\" cx=\"26.61\" cy=\"32.43\" r=\"2.6\"/><path class=\"cls-4\" d=\"M21.44,45.41H11.07a2.6,2.6,0,0,1,0-5.2H21.44a2.6,2.6,0,1,1,0,5.2Z\"/><rect class=\"cls-1\" width=\"96\" height=\"96\"/></g></svg>";

var windNight = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"96\" height=\"96\" viewBox=\"0 0 96 96\"><defs><style>.cls-1{opacity:0.48;}.cls-2{fill:#878787;}.cls-3{fill:#c6c6c6;}.cls-4{opacity:0.6;}.cls-5{fill:#a9c3d9;}.cls-6{fill:#b1c696;}.cls-7{fill:none;}</style></defs><title>09-wind-night</title><g id=\"Forecast_Icons_Outlined\" data-name=\"Forecast Icons Outlined\"><g class=\"cls-1\"><path class=\"cls-2\" d=\"M74.09,45.42H57.44a2.6,2.6,0,1,1,0-5.2H74.09a5,5,0,0,0,3.56-8.61,2.6,2.6,0,0,1,3.68-3.67,10.24,10.24,0,0,1-7.24,17.48Z\"/></g><path class=\"cls-3\" d=\"M64.77,68.42A2.6,2.6,0,0,1,62.93,64a4.79,4.79,0,0,0-3.39-8.18H46.27a2.6,2.6,0,0,1,0-5.2H59.54A10,10,0,0,1,66.6,67.66,2.56,2.56,0,0,1,64.77,68.42Z\"/><g class=\"cls-4\"><path class=\"cls-5\" d=\"M35.89,55.8H3.46a2.6,2.6,0,1,1,0-5.2H35.89a2.6,2.6,0,0,1,0,5.2Z\"/></g><path class=\"cls-3\" d=\"M47.07,45.42H31.82a2.6,2.6,0,0,1,0-5.2H47.07a2.6,2.6,0,0,1,0,5.2Z\"/><g class=\"cls-1\"><path class=\"cls-2\" d=\"M51.88,71.53a2.6,2.6,0,0,1-2.6-2.6,2.76,2.76,0,0,0-2.75-2.76H12.88a2.6,2.6,0,0,1,0-5.2H46.53a8,8,0,0,1,7.95,8A2.61,2.61,0,0,1,51.88,71.53Z\"/></g><path class=\"cls-3\" d=\"M63.57,35H38.67a2.6,2.6,0,1,1,0-5.2h24.9a2.75,2.75,0,0,0,1.94-4.7,2.8,2.8,0,0,0-3.32-.43,2.6,2.6,0,1,1-2.62-4.5,8,8,0,0,1,4-1.07,8,8,0,0,1,0,15.9Z\"/><circle class=\"cls-6\" cx=\"76.13\" cy=\"53.2\" r=\"2.6\"/><circle class=\"cls-6\" cx=\"26.61\" cy=\"32.44\" r=\"2.6\"/><g class=\"cls-4\"><path class=\"cls-5\" d=\"M21.44,45.42H11.07a2.6,2.6,0,0,1,0-5.2H21.44a2.6,2.6,0,0,1,0,5.2Z\"/></g><rect class=\"cls-7\" y=\"0.01\" width=\"96\" height=\"96\"/></g></svg>";

var fog = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"96\" height=\"96\" viewBox=\"0 0 96 96\"><defs><style>.cls-1{fill:none;}.cls-2{opacity:0.15;}.cls-3{fill:#c4cdca;}.cls-4{opacity:0.2;}.cls-5{fill:#ffe58d;}.cls-6{opacity:0.4;}.cls-7{opacity:0.6;}.cls-8{fill:#bac5d7;}</style></defs><title>10-fog</title><g id=\"Forecast_Icons_Outlined\" data-name=\"Forecast Icons Outlined\"><rect class=\"cls-1\" width=\"96\" height=\"96\"/><g class=\"cls-2\"><circle class=\"cls-3\" cx=\"43.44\" cy=\"42.81\" r=\"41.51\"/></g><g class=\"cls-4\"><circle class=\"cls-5\" cx=\"43.44\" cy=\"42.81\" r=\"27.74\"/></g><g class=\"cls-6\"><path class=\"cls-5\" d=\"M15.7,42.81a27.74,27.74,0,0,1,55.48,0Z\"/></g><g class=\"cls-7\"><path class=\"cls-8\" d=\"M29,24.61h-8.1a2.6,2.6,0,0,1,0-5.2H29a2.6,2.6,0,0,1,0,5.2Z\"/></g><g class=\"cls-7\"><path class=\"cls-8\" d=\"M65.51,66.21H42.81a2.6,2.6,0,0,1,0-5.2h22.7a2.6,2.6,0,0,1,0,5.2Z\"/></g><g class=\"cls-7\"><path class=\"cls-8\" d=\"M35.84,76.61H23.67a2.6,2.6,0,1,1,0-5.2H35.84a2.6,2.6,0,0,1,0,5.2Z\"/></g><path class=\"cls-8\" d=\"M68.92,35h4.21a2.6,2.6,0,1,0,0-5.2H68.92a2.6,2.6,0,1,0,0,5.2Z\"/><path class=\"cls-8\" d=\"M12.72,35H36.65a2.6,2.6,0,1,0,0-5.2H12.72a2.6,2.6,0,0,0,0,5.2Z\"/><path class=\"cls-8\" d=\"M36.81,24.61h9.73a2.6,2.6,0,1,1,0,5.2v.05A2.6,2.6,0,0,0,47,35H58.54a2.6,2.6,0,1,0,0-5.2h-.65a2.6,2.6,0,0,1,0-5.2h4.7a2.6,2.6,0,0,0,0-5.2H36.81a2.6,2.6,0,0,0,0,5.2Z\"/><path class=\"cls-8\" d=\"M62.76,50.61H59.19a2.6,2.6,0,0,1,0-5.2H73a2.6,2.6,0,0,0,0-5.2H38.29a2.6,2.6,0,0,0,0,5.2h2.82a2.6,2.6,0,0,1,0,5.2H26.43a2.6,2.6,0,0,1,0-5.2h1.79a2.6,2.6,0,0,0,0-5.2H7.48a2.6,2.6,0,0,0,0,5.2H9.33a2.6,2.6,0,0,1,0,5.2H2.76a2.6,2.6,0,0,0,0,5.2H16.38a2.6,2.6,0,1,1,0,5.2h-.65a2.6,2.6,0,0,0,0,5.2H32.92a2.6,2.6,0,0,0,0-5.2H29.75a2.6,2.6,0,0,1,0-5.2h33a2.6,2.6,0,0,0,0-5.2Z\"/><path class=\"cls-8\" d=\"M84.16,50.61h-11a2.6,2.6,0,1,0,0,5.2h11a2.6,2.6,0,1,0,0-5.2Z\"/></g></svg>";

var fogNight = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"96\" height=\"96\" viewBox=\"0 0 96 96\"><defs><style>.cls-1{opacity:0.2;}.cls-2{fill:#eaeaea;}.cls-2,.cls-4{fill-rule:evenodd;}.cls-3{opacity:0.6;}.cls-4{fill:#fffbf1;}.cls-5{opacity:0.85;}.cls-6{fill:none;}.cls-7{fill:#c2c7d1;}.cls-8{opacity:0.9;}</style></defs><title>10-fog-night</title><g id=\"Forecast_Icons_Outlined\" data-name=\"Forecast Icons Outlined\"><g class=\"cls-1\"><path class=\"cls-2\" d=\"M14.08,13.45a41.51,41.51,0,1,1,0,58.71,41.52,41.52,0,0,1,0-58.71\"/></g><g class=\"cls-3\"><path class=\"cls-4\" d=\"M23.82,23.19a27.74,27.74,0,1,1,0,39.23,27.75,27.75,0,0,1,0-39.23\"/><g class=\"cls-5\"><path class=\"cls-2\" d=\"M45.73,15.18A40.45,40.45,0,0,0,47.4,70.23a27.71,27.71,0,0,0-1.67-55Z\"/></g></g><rect class=\"cls-6\" width=\"96\" height=\"96\"/><g class=\"cls-3\"><path class=\"cls-7\" d=\"M29,24.61h-8.1a2.6,2.6,0,0,1,0-5.2H29a2.6,2.6,0,0,1,0,5.2Z\"/></g><g class=\"cls-3\"><path class=\"cls-7\" d=\"M65.51,66.21H42.81a2.6,2.6,0,0,1,0-5.2h22.7a2.6,2.6,0,0,1,0,5.2Z\"/></g><g class=\"cls-3\"><path class=\"cls-7\" d=\"M35.84,76.61H23.67a2.6,2.6,0,1,1,0-5.2H35.84a2.6,2.6,0,0,1,0,5.2Z\"/></g><g class=\"cls-8\"><path class=\"cls-7\" d=\"M68.92,35h4.21a2.6,2.6,0,1,0,0-5.2H68.92a2.6,2.6,0,1,0,0,5.2Z\"/><path class=\"cls-7\" d=\"M12.72,35H36.65a2.6,2.6,0,1,0,0-5.2H12.72a2.6,2.6,0,0,0,0,5.2Z\"/><path class=\"cls-7\" d=\"M36.81,24.61h9.73a2.6,2.6,0,1,1,0,5.2v.05A2.6,2.6,0,0,0,47,35H58.54a2.6,2.6,0,1,0,0-5.2h-.65a2.6,2.6,0,0,1,0-5.2h4.7a2.6,2.6,0,0,0,0-5.2H36.81a2.6,2.6,0,0,0,0,5.2Z\"/><path class=\"cls-7\" d=\"M62.76,50.61H59.19a2.6,2.6,0,0,1,0-5.2H73a2.6,2.6,0,0,0,0-5.2H38.29a2.6,2.6,0,0,0,0,5.2h2.82a2.6,2.6,0,0,1,0,5.2H26.43a2.6,2.6,0,0,1,0-5.2h1.79a2.6,2.6,0,0,0,0-5.2H7.48a2.6,2.6,0,0,0,0,5.2H9.33a2.6,2.6,0,0,1,0,5.2H2.76a2.6,2.6,0,0,0,0,5.2H16.38a2.6,2.6,0,1,1,0,5.2h-.65a2.6,2.6,0,0,0,0,5.2H32.92a2.6,2.6,0,0,0,0-5.2H29.75a2.6,2.6,0,0,1,0-5.2h33a2.6,2.6,0,0,0,0-5.2Z\"/><path class=\"cls-7\" d=\"M84.16,50.61h-11a2.6,2.6,0,1,0,0,5.2h11a2.6,2.6,0,1,0,0-5.2Z\"/></g></g></svg>";

var rain = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"96\" height=\"96\" viewBox=\"0 0 96 96\"><defs><style>.cls-1{fill:none;}.cls-2{opacity:0.6;}.cls-3{fill:#5eb4e9;}.cls-4{fill:#c8c8c8;}.cls-5{opacity:0.15;}.cls-6{fill:#9d9d9d;}.cls-7{fill:#aaa;}</style></defs><title>12-rain</title><g id=\"Forecast_Icons_Outlined\" data-name=\"Forecast Icons Outlined\"><rect class=\"cls-1\" width=\"96\" height=\"96\"/><g class=\"cls-2\"><path class=\"cls-3\" d=\"M24.39,62.32a2.58,2.58,0,0,1-2.6-2.57v-.06a2.6,2.6,0,1,1,2.6,2.63Z\"/></g><path class=\"cls-3\" d=\"M24.39,87.7a2.61,2.61,0,0,1-2.6-2.6v-15a2.6,2.6,0,0,1,5.2,0v15A2.6,2.6,0,0,1,24.39,87.7Z\"/><g class=\"cls-2\"><path class=\"cls-3\" d=\"M34.77,70.72a2.59,2.59,0,0,1-2.6-2.6V45.31a2.6,2.6,0,1,1,5.2,0V68.12A2.59,2.59,0,0,1,34.77,70.72Z\"/></g><path class=\"cls-3\" d=\"M34.77,86.62a2.6,2.6,0,0,1-2.6-2.6V78.5a2.6,2.6,0,1,1,5.2,0V84A2.6,2.6,0,0,1,34.77,86.62Z\"/><path class=\"cls-3\" d=\"M45.15,66.4a2.59,2.59,0,0,1-2.6-2.6V45.31a2.6,2.6,0,0,1,5.2,0V63.8A2.6,2.6,0,0,1,45.15,66.4Z\"/><g class=\"cls-2\"><path class=\"cls-3\" d=\"M45.15,95.26a2.59,2.59,0,0,1-2.6-2.6V74.18a2.6,2.6,0,1,1,5.2,0V92.66A2.6,2.6,0,0,1,45.15,95.26Z\"/></g><path class=\"cls-3\" d=\"M55.53,75.81a2.6,2.6,0,0,1-2.6-2.6V45.31a2.6,2.6,0,0,1,5.2,0v27.9A2.61,2.61,0,0,1,55.53,75.81Z\"/><g class=\"cls-2\"><path class=\"cls-3\" d=\"M55.53,92a2.59,2.59,0,0,1-2.6-2.6V83.58a2.6,2.6,0,0,1,5.2,0v5.84A2.6,2.6,0,0,1,55.53,92Z\"/></g><path class=\"cls-3\" d=\"M65.91,88.89a2.6,2.6,0,0,1-2.6-2.6v-41a2.6,2.6,0,1,1,5.19,0v41A2.6,2.6,0,0,1,65.91,88.89Z\"/><path class=\"cls-3\" d=\"M14,81.54a2.61,2.61,0,0,1-2.6-2.6V45.31a2.6,2.6,0,0,1,5.2,0V78.94A2.6,2.6,0,0,1,14,81.54Z\"/><path class=\"cls-4\" d=\"M71.67,29.66A12.55,12.55,0,0,0,59.88,12.73c-.28,0-.55,0-.82,0a16.54,16.54,0,1,0-31.53,10V48.46H67.62a9.84,9.84,0,0,0,4-18.8Z\"/><g class=\"cls-5\"><path class=\"cls-6\" d=\"M26.74,16.87c0,.26,0,.52,0,.78a16.54,16.54,0,0,0,.83,5.15V48.46H63.84c1.68-4.35,1.45-9.69-2.31-16.19C51.18,14.41,36,12.7,26.74,16.87Z\"/></g><path class=\"cls-7\" d=\"M60.42,44.07a10.17,10.17,0,0,0-7.54-9.82A7.26,7.26,0,0,0,46.2,24.12a7.14,7.14,0,0,0-2.28.4,16.17,16.17,0,0,0-31.72,3.8,13.08,13.08,0,0,0,2.41,25.93l.36,0v0H50.36A10.17,10.17,0,0,0,60.42,44.07Z\"/></g></svg>";

var rainNight = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"96\" height=\"96\" viewBox=\"0 0 96 96\"><defs><style>.cls-1{fill:none;}.cls-2{opacity:0.6;}.cls-3{fill:#5eb4e9;}.cls-4{fill:#a6a6a6;}.cls-5{opacity:0.15;}.cls-6{fill:#787878;}.cls-7{fill:#6d6d6d;}</style></defs><title>12-rain-night</title><g id=\"Forecast_Icons_Outlined\" data-name=\"Forecast Icons Outlined\"><rect class=\"cls-1\" width=\"96\" height=\"96\"/><g class=\"cls-2\"><path class=\"cls-3\" d=\"M24.39,62.32a2.58,2.58,0,0,1-2.6-2.57v-.06a2.6,2.6,0,1,1,2.6,2.63Z\"/></g><path class=\"cls-3\" d=\"M24.39,87.7a2.61,2.61,0,0,1-2.6-2.6v-15a2.6,2.6,0,0,1,5.2,0v15A2.6,2.6,0,0,1,24.39,87.7Z\"/><g class=\"cls-2\"><path class=\"cls-3\" d=\"M34.77,70.72a2.59,2.59,0,0,1-2.6-2.6V45.31a2.6,2.6,0,1,1,5.2,0V68.12A2.59,2.59,0,0,1,34.77,70.72Z\"/></g><path class=\"cls-3\" d=\"M34.77,86.62a2.6,2.6,0,0,1-2.6-2.6V78.5a2.6,2.6,0,1,1,5.2,0V84A2.6,2.6,0,0,1,34.77,86.62Z\"/><path class=\"cls-3\" d=\"M45.15,66.4a2.59,2.59,0,0,1-2.6-2.6V45.31a2.6,2.6,0,0,1,5.2,0V63.8A2.6,2.6,0,0,1,45.15,66.4Z\"/><g class=\"cls-2\"><path class=\"cls-3\" d=\"M45.15,95.26a2.59,2.59,0,0,1-2.6-2.6V74.18a2.6,2.6,0,1,1,5.2,0V92.66A2.6,2.6,0,0,1,45.15,95.26Z\"/></g><path class=\"cls-3\" d=\"M55.53,75.81a2.6,2.6,0,0,1-2.6-2.6V45.31a2.6,2.6,0,0,1,5.2,0v27.9A2.61,2.61,0,0,1,55.53,75.81Z\"/><g class=\"cls-2\"><path class=\"cls-3\" d=\"M55.53,92a2.59,2.59,0,0,1-2.6-2.6V83.58a2.6,2.6,0,0,1,5.2,0v5.84A2.6,2.6,0,0,1,55.53,92Z\"/></g><path class=\"cls-3\" d=\"M65.91,88.89a2.6,2.6,0,0,1-2.6-2.6v-41a2.6,2.6,0,1,1,5.19,0v41A2.6,2.6,0,0,1,65.91,88.89Z\"/><path class=\"cls-3\" d=\"M14,81.54a2.61,2.61,0,0,1-2.6-2.6V45.31a2.6,2.6,0,0,1,5.2,0V78.94A2.6,2.6,0,0,1,14,81.54Z\"/><path class=\"cls-4\" d=\"M71.67,29.66A12.55,12.55,0,0,0,59.88,12.73c-.28,0-.55,0-.82,0a16.54,16.54,0,1,0-31.53,10V48.46H67.62a9.84,9.84,0,0,0,4-18.8Z\"/><g class=\"cls-5\"><path class=\"cls-6\" d=\"M26.74,16.87c0,.26,0,.52,0,.78a16.54,16.54,0,0,0,.83,5.15V48.46H63.84c1.68-4.35,1.45-9.69-2.31-16.19C51.18,14.41,36,12.7,26.74,16.87Z\"/></g><path class=\"cls-7\" d=\"M60.42,44.07a10.17,10.17,0,0,0-7.54-9.82A7.26,7.26,0,0,0,46.2,24.12a7.14,7.14,0,0,0-2.28.4,16.17,16.17,0,0,0-31.72,3.8,13.08,13.08,0,0,0,2.41,25.93l.36,0v0H50.36A10.17,10.17,0,0,0,60.42,44.07Z\"/></g></svg>";

var snow = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"96\" height=\"96\" viewBox=\"0 0 96 96\"><defs><style>.cls-1{fill:none;}.cls-2{fill:#e7e7e7;}.cls-3{fill:#e9e9e9;}.cls-4{fill:#f5f5f5;}.cls-5{fill:#ececec;}.cls-6{fill:#e8e8e8;}.cls-7{fill:#c8c8c8;}</style></defs><title>15-snow</title><g id=\"Forecast_Icons_Outlined\" data-name=\"Forecast Icons Outlined\"><rect class=\"cls-1\" width=\"96\" height=\"96\"/><circle class=\"cls-2\" cx=\"22.13\" cy=\"57.21\" r=\"3.52\"/><circle class=\"cls-3\" cx=\"53.91\" cy=\"60.24\" r=\"3.52\"/><circle class=\"cls-3\" cx=\"35.21\" cy=\"73.71\" r=\"3.52\"/><circle class=\"cls-3\" cx=\"47.32\" cy=\"71.37\" r=\"3.52\"/><circle class=\"cls-4\" cx=\"22.71\" cy=\"69.03\" r=\"3.52\"/><path class=\"cls-5\" d=\"M66.6,44.5a10.16,10.16,0,0,0-7.55-9.81,7.21,7.21,0,0,0-9-9.74,16.16,16.16,0,0,0-31.71,3.8,13.08,13.08,0,0,0,2.4,25.93l.37,0v0H56.54A10.17,10.17,0,0,0,66.6,44.5Z\"/><circle class=\"cls-6\" cx=\"32.87\" cy=\"63.56\" r=\"2.34\"/><circle class=\"cls-7\" cx=\"46.15\" cy=\"83.09\" r=\"2.34\"/><circle class=\"cls-7\" cx=\"59.82\" cy=\"74.89\" r=\"2.34\"/><circle class=\"cls-7\" cx=\"41.51\" cy=\"59.92\" r=\"2.34\"/><circle class=\"cls-4\" cx=\"64.43\" cy=\"58.62\" r=\"2.34\"/><circle class=\"cls-6\" cx=\"25.45\" cy=\"81.53\" r=\"2.34\"/><circle class=\"cls-6\" cx=\"34.13\" cy=\"90.66\" r=\"2.34\"/><circle class=\"cls-4\" cx=\"60.72\" cy=\"87.41\" r=\"2.34\"/><circle class=\"cls-6\" cx=\"66.56\" cy=\"67.3\" r=\"2.34\"/><circle class=\"cls-4\" cx=\"17.26\" cy=\"89.36\" r=\"2.34\"/><circle class=\"cls-4\" cx=\"3.64\" cy=\"69.25\" r=\"2.34\"/><circle class=\"cls-6\" cx=\"13.59\" cy=\"76.35\" r=\"2.34\"/><circle class=\"cls-6\" cx=\"12.29\" cy=\"63.2\" r=\"2.34\"/></g></svg>";

var snowNight = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"96\" height=\"96\" viewBox=\"0 0 96 96\"><defs><style>.cls-1{fill:none;}.cls-2{fill:#f8f8f8;}.cls-3{fill:#fff;}.cls-4{fill:#f0f0f0;}</style></defs><title>15-snow-night</title><g id=\"Forecast_Icons_Outlined\" data-name=\"Forecast Icons Outlined\"><rect class=\"cls-1\" width=\"96\" height=\"96\"/><circle class=\"cls-2\" cx=\"22.13\" cy=\"54.43\" r=\"3.52\"/><circle class=\"cls-3\" cx=\"53.91\" cy=\"60.24\" r=\"3.52\"/><circle class=\"cls-2\" cx=\"35.21\" cy=\"73.71\" r=\"3.52\"/><circle class=\"cls-2\" cx=\"47.32\" cy=\"71.37\" r=\"3.52\"/><circle class=\"cls-4\" cx=\"22.71\" cy=\"69.03\" r=\"3.52\"/><path class=\"cls-3\" d=\"M64.44,44.5a10.17,10.17,0,0,0-7.55-9.81,7.21,7.21,0,0,0-9-9.74,16.16,16.16,0,0,0-31.71,3.8,13.08,13.08,0,0,0,2.4,25.93l.37,0v0H54.38A10.17,10.17,0,0,0,64.44,44.5Z\"/><circle class=\"cls-2\" cx=\"32.87\" cy=\"63.56\" r=\"2.34\"/><circle class=\"cls-3\" cx=\"46.15\" cy=\"83.09\" r=\"2.34\"/><circle class=\"cls-3\" cx=\"59.82\" cy=\"74.89\" r=\"2.34\"/><circle class=\"cls-3\" cx=\"41.51\" cy=\"59.92\" r=\"2.34\"/><circle class=\"cls-4\" cx=\"64.43\" cy=\"58.62\" r=\"2.34\"/><circle class=\"cls-3\" cx=\"25.45\" cy=\"81.53\" r=\"2.34\"/><circle class=\"cls-2\" cx=\"34.13\" cy=\"90.66\" r=\"2.34\"/><circle class=\"cls-4\" cx=\"60.72\" cy=\"87.41\" r=\"2.34\"/><circle class=\"cls-2\" cx=\"66.56\" cy=\"67.3\" r=\"2.34\"/><circle class=\"cls-4\" cx=\"17.26\" cy=\"89.36\" r=\"2.34\"/><circle class=\"cls-4\" cx=\"3.64\" cy=\"69.25\" r=\"2.34\"/><circle class=\"cls-2\" cx=\"13.59\" cy=\"76.35\" r=\"2.34\"/><circle class=\"cls-3\" cx=\"12.29\" cy=\"63.2\" r=\"2.34\"/></g></svg>";

var storms = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"96\" height=\"96\" viewBox=\"0 0 96 96\"><defs><style>.cls-1{fill:none;}.cls-2{fill:#5eb4e9;}.cls-3{opacity:0.6;}.cls-4{fill:#c8c8c8;}.cls-5{opacity:0.15;}.cls-6{fill:#9d9d9d;}.cls-7{fill:#ffe77c;}.cls-8{fill:#aaa;}.cls-9{fill:#ffd413;}</style></defs><title>16-storms</title><g id=\"Forecast_Icons_Outlined\" data-name=\"Forecast Icons Outlined\"><rect class=\"cls-1\" width=\"96\" height=\"96\"/><path class=\"cls-2\" d=\"M41.92,84.33a2.6,2.6,0,0,1-2.6-2.6V58.05a2.6,2.6,0,0,1,5.2,0V81.73A2.59,2.59,0,0,1,41.92,84.33Z\"/><path class=\"cls-2\" d=\"M52.3,78a2.61,2.61,0,0,1-2.6-2.6V65.23a2.6,2.6,0,1,1,5.2,0V75.39A2.6,2.6,0,0,1,52.3,78Z\"/><g class=\"cls-3\"><path class=\"cls-2\" d=\"M31.55,73.88a2.59,2.59,0,0,1-2.6-2.6V57.44a2.6,2.6,0,1,1,5.19,0V71.28A2.59,2.59,0,0,1,31.55,73.88Z\"/></g><g class=\"cls-3\"><path class=\"cls-2\" d=\"M31.55,84.29a2.61,2.61,0,1,1,2.59-2.63v0A2.6,2.6,0,0,1,31.55,84.29Z\"/></g><path class=\"cls-4\" d=\"M78.26,32.62A13.76,13.76,0,0,0,65.33,14.05c-.31,0-.61,0-.91,0a18.15,18.15,0,1,0-34.6,11V53.26h44a10.8,10.8,0,0,0,4.44-20.64Z\"/><g class=\"cls-5\"><path class=\"cls-6\" d=\"M29,18.59c0,.29,0,.57,0,.86a18.21,18.21,0,0,0,.9,5.65V53.26H69.68c1.83-4.78,1.59-10.63-2.54-17.76C55.78,15.9,39.13,14,29,18.59Z\"/></g><path class=\"cls-7\" d=\"M70.33,20H61.44L69.9,9.45a2.33,2.33,0,1,0-3.64-2.92L54.75,20.88a2.34,2.34,0,0,0,1.83,3.8h9.2L51.6,45.31a1,1,0,0,0,.18,1.28,1,1,0,0,0,1.34-.12l19-22.72a2.25,2.25,0,0,0,.53-1.46A2.28,2.28,0,0,0,70.33,20Z\"/><path class=\"cls-8\" d=\"M65.92,48.44a11.15,11.15,0,0,0-8.28-10.77,7.88,7.88,0,0,0,.65-3.14A7.88,7.88,0,0,0,47.81,27,17.74,17.74,0,0,0,13,31.16a14.35,14.35,0,0,0,2.64,28.45l.4,0v0H54.88A11.16,11.16,0,0,0,65.92,48.44Z\"/><path class=\"cls-9\" d=\"M27.54,46.31H18.66l8.46-10.56a2.33,2.33,0,0,0-3.64-2.92L12,47.19A2.33,2.33,0,0,0,13.79,51H23L8.82,71.62A1,1,0,0,0,9,72.9a1,1,0,0,0,1.34-.13l19-22.71a2.29,2.29,0,0,0-1.76-3.75Z\"/></g></svg>";

var stormsNight = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"96\" height=\"96\" viewBox=\"0 0 96 96\"><defs><style>.cls-1{fill:none;}.cls-2{fill:#5eb4e9;}.cls-3{opacity:0.6;}.cls-4{fill:#a6a6a6;}.cls-5{opacity:0.15;}.cls-6{fill:#787878;}.cls-7{fill:#ffe77c;}.cls-8{fill:#6d6d6d;}.cls-9{fill:#ffd413;}</style></defs><title>16-storms-night</title><g id=\"Forecast_Icons_Outlined\" data-name=\"Forecast Icons Outlined\"><rect class=\"cls-1\" width=\"96\" height=\"96\"/><path class=\"cls-2\" d=\"M41.92,84.33a2.6,2.6,0,0,1-2.6-2.6V58.05a2.6,2.6,0,0,1,5.2,0V81.73A2.59,2.59,0,0,1,41.92,84.33Z\"/><path class=\"cls-2\" d=\"M52.3,78a2.61,2.61,0,0,1-2.6-2.6V65.23a2.6,2.6,0,1,1,5.2,0V75.39A2.6,2.6,0,0,1,52.3,78Z\"/><g class=\"cls-3\"><path class=\"cls-2\" d=\"M31.55,73.88a2.59,2.59,0,0,1-2.6-2.6V57.44a2.6,2.6,0,1,1,5.19,0V71.28A2.59,2.59,0,0,1,31.55,73.88Z\"/></g><g class=\"cls-3\"><path class=\"cls-2\" d=\"M31.55,84.29a2.61,2.61,0,1,1,2.59-2.63v0A2.6,2.6,0,0,1,31.55,84.29Z\"/></g><path class=\"cls-4\" d=\"M78.26,32.62A13.76,13.76,0,0,0,65.33,14.05c-.31,0-.61,0-.91,0a18.15,18.15,0,1,0-34.6,11V53.26h44a10.8,10.8,0,0,0,4.44-20.64Z\"/><g class=\"cls-5\"><path class=\"cls-6\" d=\"M29,18.59c0,.29,0,.57,0,.86a18.21,18.21,0,0,0,.9,5.65V53.26H69.68c1.83-4.78,1.59-10.63-2.54-17.76C55.78,15.9,39.13,14,29,18.59Z\"/></g><path class=\"cls-7\" d=\"M70.33,20H61.44L69.9,9.45a2.33,2.33,0,1,0-3.64-2.92L54.75,20.88a2.34,2.34,0,0,0,1.83,3.8h9.2L51.6,45.31a1,1,0,0,0,.18,1.28,1,1,0,0,0,1.34-.12l19-22.72a2.25,2.25,0,0,0,.53-1.46A2.28,2.28,0,0,0,70.33,20Z\"/><path class=\"cls-8\" d=\"M65.92,48.44a11.15,11.15,0,0,0-8.28-10.77,7.88,7.88,0,0,0,.65-3.14A7.88,7.88,0,0,0,47.81,27,17.74,17.74,0,0,0,13,31.16a14.35,14.35,0,0,0,2.64,28.45l.4,0v0H54.88A11.16,11.16,0,0,0,65.92,48.44Z\"/><path class=\"cls-9\" d=\"M27.54,46.31H18.66l8.46-10.56a2.33,2.33,0,0,0-3.64-2.92L12,47.19A2.33,2.33,0,0,0,13.79,51H23L8.82,71.62A1,1,0,0,0,9,72.9a1,1,0,0,0,1.34-.13l19-22.71a2.29,2.29,0,0,0-1.76-3.75Z\"/></g></svg>";

var heavyShowers = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"96\" height=\"96\" viewBox=\"0 0 96 96\"><defs><style>.cls-1{fill:none;}.cls-2{fill:#ffe58d;}.cls-3{fill:#ffdf64;}.cls-4{fill:#5eb4e9;}.cls-5{opacity:0.6;}.cls-6{fill:#c8c8c8;}.cls-7{opacity:0.15;}.cls-8{fill:#9d9d9d;}.cls-9{fill:#aaa;}</style></defs><title>18-heavy-showers</title><g id=\"Forecast_Icons_Outlined\" data-name=\"Forecast Icons Outlined\"><rect class=\"cls-1\" y=\"-0.02\" width=\"96\" height=\"96\"/><circle class=\"cls-2\" cx=\"64.06\" cy=\"18.34\" r=\"17.06\"/><path class=\"cls-3\" d=\"M47,18.34a17.05,17.05,0,0,0,33.21,5.47A38.32,38.32,0,0,1,58.72,13.56c-2.13-2.07-4.51-4.55-7-7A17,17,0,0,0,47,18.34Z\"/><path class=\"cls-4\" d=\"M21.71,87.42a2.6,2.6,0,0,1-2.6-2.6V53.53a2.6,2.6,0,0,1,5.2,0V84.82A2.59,2.59,0,0,1,21.71,87.42Z\"/><path class=\"cls-4\" d=\"M32.09,81.46a2.6,2.6,0,0,1-2.6-2.6V65.92a2.6,2.6,0,1,1,5.2,0V78.86A2.59,2.59,0,0,1,32.09,81.46Z\"/><g class=\"cls-5\"><path class=\"cls-4\" d=\"M32.09,94.76a2.61,2.61,0,0,1-2.6-2.6V89.24a2.6,2.6,0,0,1,5.2,0v2.92A2.6,2.6,0,0,1,32.09,94.76Z\"/></g><g class=\"cls-5\"><path class=\"cls-4\" d=\"M42.47,69.42a2.6,2.6,0,0,1-2.6-2.6V53.53a2.6,2.6,0,0,1,5.2,0V66.82A2.59,2.59,0,0,1,42.47,69.42Z\"/></g><path class=\"cls-4\" d=\"M52.85,77.69a2.59,2.59,0,0,1-2.6-2.6V53.53a2.6,2.6,0,0,1,5.2,0V75.09A2.6,2.6,0,0,1,52.85,77.69Z\"/><g class=\"cls-5\"><path class=\"cls-4\" d=\"M52.85,93.75a2.6,2.6,0,0,1-2.6-2.6V85.47a2.6,2.6,0,0,1,5.2,0v5.68A2.61,2.61,0,0,1,52.85,93.75Z\"/></g><g class=\"cls-5\"><path class=\"cls-4\" d=\"M63.23,91.48a2.6,2.6,0,0,1-2.6-2.6V75.47a2.6,2.6,0,0,1,5.2,0V88.88A2.61,2.61,0,0,1,63.23,91.48Z\"/></g><path class=\"cls-4\" d=\"M63.23,67.69a2.59,2.59,0,0,1-2.6-2.6V59.47a2.6,2.6,0,0,1,5.2,0v5.62A2.6,2.6,0,0,1,63.23,67.69Z\"/><g class=\"cls-5\"><path class=\"cls-4\" d=\"M11.34,72.67a2.6,2.6,0,0,1-2.6-2.6V65.89a2.6,2.6,0,1,1,5.19,0v4.18A2.6,2.6,0,0,1,11.34,72.67Z\"/></g><path class=\"cls-4\" d=\"M11.34,92.72a2.59,2.59,0,0,1-2.6-2.6V80.44a2.6,2.6,0,1,1,5.19,0v9.68A2.59,2.59,0,0,1,11.34,92.72Z\"/><g class=\"cls-5\"><path class=\"cls-4\" d=\"M42.47,80a2.6,2.6,0,0,1-2.6-2.6V77.2a2.6,2.6,0,1,1,5.2,0v.16A2.59,2.59,0,0,1,42.47,80Z\"/></g><path class=\"cls-4\" d=\"M42.47,90.83a2.61,2.61,0,0,1-2.6-2.6v-.49a2.6,2.6,0,0,1,5.2,0v.49A2.6,2.6,0,0,1,42.47,90.83Z\"/><path class=\"cls-6\" d=\"M71.43,35.69a12.24,12.24,0,0,0,.79-4.34A12.57,12.57,0,0,0,59.65,18.77c-.28,0-.55,0-.83,0a16.54,16.54,0,1,0-31.53,10V54.5h40.1a9.84,9.84,0,0,0,4-18.81Z\"/><g class=\"cls-7\"><path class=\"cls-8\" d=\"M26.51,22.91c0,.26,0,.52,0,.78a16.53,16.53,0,0,0,.82,5.15V54.5H63.61c1.68-4.35,1.45-9.69-2.31-16.19C51,20.45,35.78,18.74,26.51,22.91Z\"/></g><path class=\"cls-9\" d=\"M60.19,50.11a10.16,10.16,0,0,0-7.55-9.82,7.17,7.17,0,0,0,.59-2.86A7.26,7.26,0,0,0,46,30.16a7.18,7.18,0,0,0-2.28.4A16.16,16.16,0,0,0,12,34.36a13.08,13.08,0,0,0,2.41,25.93l.36,0v0H50.13A10.17,10.17,0,0,0,60.19,50.11Z\"/></g></svg>";

var heavyShowersNight = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"96\" height=\"96\" viewBox=\"0 0 96 96\"><defs><style>.cls-1{fill:none;}.cls-2{fill:#5eb4e9;}.cls-3{opacity:0.6;}.cls-4{fill:#fffbf1;}.cls-4,.cls-6{fill-rule:evenodd;}.cls-5{opacity:0.85;}.cls-6{fill:#eaeaea;}.cls-7{fill:#a6a6a6;}.cls-8{opacity:0.15;}.cls-9{fill:#787878;}.cls-10{fill:#6d6d6d;}</style></defs><title>18-heavy-showers-night</title><g id=\"Forecast_Icons_Outlined\" data-name=\"Forecast Icons Outlined\"><rect class=\"cls-1\" y=\"-0.02\" width=\"96\" height=\"96\"/><path class=\"cls-2\" d=\"M21.71,87.42a2.6,2.6,0,0,1-2.6-2.6V53.53a2.6,2.6,0,0,1,5.2,0V84.82A2.59,2.59,0,0,1,21.71,87.42Z\"/><path class=\"cls-2\" d=\"M32.09,81.46a2.6,2.6,0,0,1-2.6-2.6V65.92a2.6,2.6,0,1,1,5.2,0V78.86A2.59,2.59,0,0,1,32.09,81.46Z\"/><g class=\"cls-3\"><path class=\"cls-2\" d=\"M32.09,94.76a2.61,2.61,0,0,1-2.6-2.6V89.24a2.6,2.6,0,0,1,5.2,0v2.92A2.6,2.6,0,0,1,32.09,94.76Z\"/></g><g class=\"cls-3\"><path class=\"cls-2\" d=\"M42.47,69.42a2.6,2.6,0,0,1-2.6-2.6V53.53a2.6,2.6,0,0,1,5.2,0V66.82A2.59,2.59,0,0,1,42.47,69.42Z\"/></g><path class=\"cls-2\" d=\"M52.85,77.69a2.59,2.59,0,0,1-2.6-2.6V53.53a2.6,2.6,0,0,1,5.2,0V75.09A2.6,2.6,0,0,1,52.85,77.69Z\"/><g class=\"cls-3\"><path class=\"cls-2\" d=\"M52.85,93.75a2.6,2.6,0,0,1-2.6-2.6V85.47a2.6,2.6,0,0,1,5.2,0v5.68A2.61,2.61,0,0,1,52.85,93.75Z\"/></g><g class=\"cls-3\"><path class=\"cls-2\" d=\"M63.23,91.48a2.6,2.6,0,0,1-2.6-2.6V75.47a2.6,2.6,0,0,1,5.2,0V88.88A2.61,2.61,0,0,1,63.23,91.48Z\"/></g><path class=\"cls-2\" d=\"M63.23,67.69a2.59,2.59,0,0,1-2.6-2.6V59.47a2.6,2.6,0,0,1,5.2,0v5.62A2.6,2.6,0,0,1,63.23,67.69Z\"/><g class=\"cls-3\"><path class=\"cls-2\" d=\"M11.34,72.67a2.6,2.6,0,0,1-2.6-2.6V65.89a2.6,2.6,0,1,1,5.19,0v4.18A2.6,2.6,0,0,1,11.34,72.67Z\"/></g><path class=\"cls-2\" d=\"M11.34,92.72a2.59,2.59,0,0,1-2.6-2.6V80.44a2.6,2.6,0,1,1,5.19,0v9.68A2.59,2.59,0,0,1,11.34,92.72Z\"/><g class=\"cls-3\"><path class=\"cls-2\" d=\"M42.47,80a2.6,2.6,0,0,1-2.6-2.6V77.2a2.6,2.6,0,1,1,5.2,0v.16A2.59,2.59,0,0,1,42.47,80Z\"/></g><path class=\"cls-2\" d=\"M42.47,90.83a2.61,2.61,0,0,1-2.6-2.6v-.49a2.6,2.6,0,0,1,5.2,0v.49A2.6,2.6,0,0,1,42.47,90.83Z\"/><path class=\"cls-4\" d=\"M52,6.29a17.06,17.06,0,1,1,0,24.13A17.07,17.07,0,0,1,52,6.29\"/><g class=\"cls-5\"><path class=\"cls-6\" d=\"M65.47,1.36a24.89,24.89,0,0,0,1,33.87,17.05,17.05,0,0,0-1-33.87Z\"/></g><path class=\"cls-7\" d=\"M71.43,35.69a12.24,12.24,0,0,0,.79-4.34A12.57,12.57,0,0,0,59.65,18.77c-.28,0-.55,0-.83,0a16.54,16.54,0,1,0-31.53,10V54.5h40.1a9.84,9.84,0,0,0,4-18.81Z\"/><g class=\"cls-8\"><path class=\"cls-9\" d=\"M26.51,22.91c0,.26,0,.52,0,.78a16.53,16.53,0,0,0,.82,5.15V54.5H63.61c1.68-4.35,1.45-9.69-2.31-16.19C51,20.45,35.78,18.74,26.51,22.91Z\"/></g><path class=\"cls-10\" d=\"M60.19,50.11a10.16,10.16,0,0,0-7.55-9.82,7.17,7.17,0,0,0,.59-2.86A7.26,7.26,0,0,0,46,30.16a7.18,7.18,0,0,0-2.28.4A16.16,16.16,0,0,0,12,34.36a13.08,13.08,0,0,0,2.41,25.93l.36,0v0H50.13A10.17,10.17,0,0,0,60.19,50.11Z\"/></g></svg>";

var exceptional = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"96\" height=\"96\" viewBox=\"0 0 96 96\"><defs><style>.cls-1{fill:none;}.cls-2{fill:#d3dbe2;}.cls-3{fill:#5eb4e9;}.cls-4{fill:#627e97;}</style></defs><title>19-tropical-cyclone</title><g id=\"Forecast_Icons_Outlined\" data-name=\"Forecast Icons Outlined\"><rect class=\"cls-1\" width=\"96\" height=\"96\"/><path class=\"cls-2\" d=\"M45,15.25A30.4,30.4,0,0,1,62.3,40.38c.08.8.12,1.62.12,2.44a23.74,23.74,0,0,1-1.53,8.38A33.19,33.19,0,0,0,66,49.4,30.56,30.56,0,0,0,40.56,5.65a.88.88,0,0,0-.68,1.48A33.36,33.36,0,0,1,45,15.25Z\"/><path class=\"cls-2\" d=\"M31.92,70.4A30.35,30.35,0,0,1,14.65,45.27a22,22,0,0,1-.13-2.45,23.73,23.73,0,0,1,1.54-8.37,33.3,33.3,0,0,0-5.15,1.8A30.57,30.57,0,0,0,36.39,80a.88.88,0,0,0,.68-1.48A33.06,33.06,0,0,1,31.92,70.4Z\"/><path class=\"cls-3\" d=\"M32.78,81.49a2.19,2.19,0,0,1-.36,0,32.46,32.46,0,0,1-4.85-1.31,2,2,0,1,1,1.3-3.68,29,29,0,0,0,4.27,1.15,2,2,0,0,1-.36,3.87Z\"/><path class=\"cls-3\" d=\"M21.36,76.79a2,2,0,0,1-1.09-.33,32.7,32.7,0,0,1-4.81-4c-.35-.34-.69-.7-1-1.07a2,2,0,0,1,2.88-2.63c.3.32.6.64.91,1a29.11,29.11,0,0,0,4.24,3.5,1.95,1.95,0,0,1-1.1,3.56Z\"/><path class=\"cls-3\" d=\"M11.4,65.68a1.94,1.94,0,0,1-1.73-1A32.61,32.61,0,0,1,5.93,49.47a2,2,0,0,1,3.9,0,28.63,28.63,0,0,0,3.29,13.35,2,2,0,0,1-.81,2.64A2,2,0,0,1,11.4,65.68Z\"/><path class=\"cls-4\" d=\"M74.17,44.23a32.7,32.7,0,0,1-13.28,7,23.74,23.74,0,0,0,1.53-8.38c0-.82,0-1.64-.12-2.44a30.58,30.58,0,0,0-61,.36.88.88,0,0,0,1.47.68,32.74,32.74,0,0,1,13.29-7,23.73,23.73,0,0,0-1.54,8.37,22,22,0,0,0,.13,2.45,30.58,30.58,0,0,0,61-.36A.88.88,0,0,0,74.17,44.23Zm-28.83,6a.25.25,0,0,1,.16.43A8.67,8.67,0,0,1,33.67,38h0a6.64,6.64,0,0,1,2-1.35,9.1,9.1,0,0,0-4.06-1.29.25.25,0,0,1-.16-.43A8.67,8.67,0,0,1,43.27,47.62h0a6.56,6.56,0,0,1-2,1.35A9.18,9.18,0,0,0,45.34,50.26Z\"/></g></svg>";

var exceptionalNight = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"96\" height=\"96\" viewBox=\"0 0 96 96\"><defs><style>.cls-1{fill:none;}.cls-2{fill:#496a87;}.cls-3{fill:#5eb4e9;}.cls-4{fill:#00253f;}</style></defs><title>19-tropical-cyclone-night</title><g id=\"Forecast_Icons_Outlined\" data-name=\"Forecast Icons Outlined\"><rect class=\"cls-1\" width=\"96\" height=\"96\"/><path class=\"cls-2\" d=\"M45,15.25A30.4,30.4,0,0,1,62.3,40.38c.08.8.12,1.62.12,2.44a23.74,23.74,0,0,1-1.53,8.38A33.19,33.19,0,0,0,66,49.4,30.56,30.56,0,0,0,40.56,5.65a.88.88,0,0,0-.68,1.48A33.36,33.36,0,0,1,45,15.25Z\"/><path class=\"cls-2\" d=\"M31.92,70.4A30.35,30.35,0,0,1,14.65,45.27a22,22,0,0,1-.13-2.45,23.73,23.73,0,0,1,1.54-8.37,33.3,33.3,0,0,0-5.15,1.8A30.57,30.57,0,0,0,36.39,80a.88.88,0,0,0,.68-1.48A33.06,33.06,0,0,1,31.92,70.4Z\"/><path class=\"cls-3\" d=\"M32.78,81.49a2.19,2.19,0,0,1-.36,0,32.46,32.46,0,0,1-4.85-1.31,2,2,0,1,1,1.3-3.68,29,29,0,0,0,4.27,1.15,2,2,0,0,1-.36,3.87Z\"/><path class=\"cls-3\" d=\"M21.36,76.79a2,2,0,0,1-1.09-.33,33.28,33.28,0,0,1-4.81-4c-.35-.35-.69-.71-1-1.08a2,2,0,0,1,2.88-2.63c.3.32.6.64.91,1a29.11,29.11,0,0,0,4.24,3.5,1.95,1.95,0,0,1-1.1,3.56Z\"/><path class=\"cls-3\" d=\"M11.4,65.68a1.94,1.94,0,0,1-1.73-1A32.61,32.61,0,0,1,5.93,49.47a2,2,0,0,1,3.9,0,28.63,28.63,0,0,0,3.29,13.35,2,2,0,0,1-.81,2.64A2,2,0,0,1,11.4,65.68Z\"/><path class=\"cls-4\" d=\"M74.17,44.23a32.7,32.7,0,0,1-13.28,7,23.74,23.74,0,0,0,1.53-8.38c0-.82,0-1.64-.12-2.44a30.58,30.58,0,0,0-61,.36.88.88,0,0,0,1.47.68,32.74,32.74,0,0,1,13.29-7,23.73,23.73,0,0,0-1.54,8.37,22,22,0,0,0,.13,2.45,30.58,30.58,0,0,0,61-.36A.88.88,0,0,0,74.17,44.23Zm-28.83,6a.25.25,0,0,1,.16.43A8.67,8.67,0,0,1,33.67,38h0a6.64,6.64,0,0,1,2-1.35,9.1,9.1,0,0,0-4.06-1.29.25.25,0,0,1-.16-.43A8.67,8.67,0,0,1,43.27,47.62h0a6.56,6.56,0,0,1-2,1.35A9.18,9.18,0,0,0,45.34,50.26Z\"/></g></svg>";

/**
 * This object maps the weather icon names returned by the Home Assistant API
 */
const WEATHER_ICON = {
    [DAY_MODE.DAY]: {
        [WEATHER_CONDITION.CLEAR_NIGHT]: clearNight,
        [WEATHER_CONDITION.CLOUDY]: cloudy,
        [WEATHER_CONDITION.EXCEPTIONAL]: exceptional,
        [WEATHER_CONDITION.FOG]: fog,
        [WEATHER_CONDITION.HAIL]: snow,
        [WEATHER_CONDITION.LIGHTNING_RAINY]: storms,
        [WEATHER_CONDITION.LIGHTNING]: storms,
        [WEATHER_CONDITION.PARTLY_CLOUDY]: partlyCloudy,
        [WEATHER_CONDITION.PARTLY_CLOUDY_NIGHT]: partlyCloudyNight,
        [WEATHER_CONDITION.MOSTLY_SUNNY]: mostlySunny,
        [WEATHER_CONDITION.POURING]: heavyShowers,
        [WEATHER_CONDITION.RAINY]: rain,
        [WEATHER_CONDITION.SNOWY_RAINY]: snow,
        [WEATHER_CONDITION.SNOWY]: snow,
        [WEATHER_CONDITION.SUNNY]: sunny,
        [WEATHER_CONDITION.WINDY_VARIANT]: wind,
        [WEATHER_CONDITION.WINDY]: wind,
    },
    [DAY_MODE.NIGHT]: {
        [WEATHER_CONDITION.CLEAR_NIGHT]: clearNight,
        [WEATHER_CONDITION.CLOUDY]: cloudyNight,
        [WEATHER_CONDITION.EXCEPTIONAL]: exceptionalNight,
        [WEATHER_CONDITION.FOG]: fogNight,
        [WEATHER_CONDITION.HAIL]: snowNight,
        [WEATHER_CONDITION.LIGHTNING_RAINY]: stormsNight,
        [WEATHER_CONDITION.LIGHTNING]: stormsNight,
        [WEATHER_CONDITION.PARTLY_CLOUDY]: partlyCloudyNight,
        [WEATHER_CONDITION.PARTLY_CLOUDY_NIGHT]: partlyCloudyNight,
        [WEATHER_CONDITION.MOSTLY_SUNNY]: mostlySunnyNight,
        [WEATHER_CONDITION.POURING]: heavyShowersNight,
        [WEATHER_CONDITION.RAINY]: rainNight,
        [WEATHER_CONDITION.SNOWY_RAINY]: snowNight,
        [WEATHER_CONDITION.SNOWY]: snowNight,
        [WEATHER_CONDITION.SUNNY]: sunny,
        [WEATHER_CONDITION.WINDY_VARIANT]: windNight,
        [WEATHER_CONDITION.WINDY]: windNight,
    },
};

let WeatherIconElement = class WeatherIconElement extends r$2 {
    constructor() {
        super(...arguments);
        this.useHAWeatherIcons = false;
        this.iconSize = ICON_SIZE.REGULAR;
        this.dayMode = DAY_MODE.DAY;
        this.noPadding = false;
    }
    render() {
        if (!this.weatherIcon)
            return E;
        const classes = {
            'weather-icon-element': true,
            [this.iconSize]: true,
            [this.weatherIcon]: true,
            'no-padding': this.noPadding,
        };
        return x `<div class=${e$1(classes)}>
      ${this.useHAWeatherIcons
            ? x `<ha-icon icon="mdi:weather-${this.weatherIcon}"></ha-icon>`
            : x `${o$1(WEATHER_ICON[this.dayMode][this.weatherIcon])}`}
    </div>`;
    }
    static get styles() {
        return i$5 `
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
          width: var(--bwc-weather-icon-height);
          filter: drop-shadow(0px 0px 2px rgba(200, 200, 200, 0.75));
        }

        &.no-padding {
          padding: 0;
        }

        &.huge {
          --bwc-weather-icon-height: var(--bwc-huge-icon-size);
        }

        &.large {
          --bwc-weather-icon-height: var(--bwc-large-icon-size);
        }

        &.regular {
          --bwc-weather-icon-height: var(--bwc-regular-icon-size);
        }

        &.small {
          --bwc-weather-icon-height: var(--bwc-regular-font-size);
        }
      }
    `;
    }
};
__decorate([
    n$1({ type: String })
], WeatherIconElement.prototype, "weatherIcon", undefined);
__decorate([
    n$1({ type: Boolean })
], WeatherIconElement.prototype, "useHAWeatherIcons", undefined);
__decorate([
    n$1({ type: String })
], WeatherIconElement.prototype, "iconSize", undefined);
__decorate([
    n$1({ type: String })
], WeatherIconElement.prototype, "dayMode", undefined);
__decorate([
    n$1({ type: Boolean })
], WeatherIconElement.prototype, "noPadding", undefined);
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
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o=o=>o??E;

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

/**
 * These config property dependencies define config properties that
 * are dependent on the state of another config property.
 * When config is assigned in the editor, any dependent properties
 * will be cleared if their dependency is "falsy".
 */
const CONFIG_PROP_DEPENDENCIES = {
    [CONFIG_PROP.CURRENT_TEMP_ENTITY_ID]: CONFIG_PROP.SHOW_CURRENT_TEMP,
    [CONFIG_PROP.SHOW_FEELS_LIKE_TEMP]: CONFIG_PROP.SHOW_CURRENT_TEMP,
    [CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID]: CONFIG_PROP.SHOW_FEELS_LIKE_TEMP,
    [CONFIG_PROP.WEATHER_ICON_ENTITY_ID]: CONFIG_PROP.SHOW_WEATHER_ICON,
    [CONFIG_PROP.USE_HA_WEATHER_ICONS]: CONFIG_PROP.SHOW_WEATHER_ICON,
    [CONFIG_PROP.TIME_ENTITY_ID]: CONFIG_PROP.SHOW_TIME,
    [CONFIG_PROP.SHOW_DATE]: CONFIG_PROP.DATE_ENTITY_ID,
    [CONFIG_PROP.DATE_ENTITY_ID]: CONFIG_PROP.SHOW_DATE,
    [CONFIG_PROP.NOW_LATER_NOW_TEMP_ENTITY_ID]: CONFIG_PROP.SHOW_NOW_LATER_TEMPS,
    [CONFIG_PROP.NOW_LATER_NOW_LABEL_ENTITY_ID]: CONFIG_PROP.SHOW_NOW_LATER_TEMPS,
    [CONFIG_PROP.NOW_LATER_LATER_TEMP_ENTITY_ID]: CONFIG_PROP.SHOW_NOW_LATER_TEMPS,
    [CONFIG_PROP.NOW_LATER_LATER_LABEL_ENTITY_ID]: CONFIG_PROP.SHOW_NOW_LATER_TEMPS,
    [CONFIG_PROP.WARNING_COUNT_ENTITY_ID]: CONFIG_PROP.SHOW_WARNING_COUNT,
    [CONFIG_PROP.HIDE_WARNING_COUNT_IF_ZERO]: CONFIG_PROP.SHOW_WARNING_COUNT,
    [CONFIG_PROP.RAIN_SUMMARY_ENTITY_ID]: CONFIG_PROP.SHOW_RAIN_SUMMARY,
    [CONFIG_PROP.FORECAST_SUMMARY_ENTITY_ID]: CONFIG_PROP.SHOW_FORECAST_SUMMARY,
    [CONFIG_PROP.DAILY_FORECAST_NUMBER_OF_DAYS]: CONFIG_PROP.SHOW_DAILY_FORECAST,
};

/**
 * Iterate over the CONFIG_PROP_DEPENDENCIES and remove any orphaned config properties
 * based on the state of the cardConfig object.
 *
 * For example, remove the "SHOW_FEELS_LIKE_TEMP" property if "SHOW_CURRENT_TEMP" is not true
 *
 * @param cardConfig
 * @returns
 */
const fixOrphanedConfigProps = (cardConfig) => {
    const newConfig = { ...cardConfig };
    // Iterate through the CONFIG_PROP_DEPENDENCIES and remove any orphaned config properties
    for (const [prop, dependency] of Object.entries(CONFIG_PROP_DEPENDENCIES)) {
        if (!newConfig[dependency]) {
            delete newConfig[prop];
        }
    }
    return newConfig;
};

/**
 * This helper function is used to simplify the retrieval of card entity details
 * for rendering fields, values and classes.
 *
 * @param cardEntity
 * @returns
 */
const getCardEntityDetails = (cardEntity) => ({
    entityId: cardEntity?.entity_id,
    attribute: cardEntity?.is_inferred ? cardEntity?.attribute : undefined,
    displayName: cardEntity?.is_inferred
        ? `💡${cardEntity?.entity_id ?? ''}${cardEntity?.attribute ? `[${cardEntity?.attribute}]` : ''}`
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
        return i$5 `
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

      ha-slider {
        padding: 9px 6px;
      }

      ha-expansion-panel {
        margin-bottom: var(--bwc-global-padding);
      }

      .level-one {
        margin-left: calc(var(--bwc-global-padding) * 2);
        width: calc(100% - var(--bwc-global-padding) * 2);
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
        let cleanedConfig = { ...newConfig };
        // On first load, merge the default config with the user provided config
        if (!this._initialized) {
            cleanedConfig = {
                ...this._config,
                ...cleanedConfig,
            };
            this._initialized = true;
        }
        // Remove any orphaned config properties
        cleanedConfig = fixOrphanedConfigProps(cleanedConfig);
        // Apply the new config
        this._config = cleanedConfig;
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
        const newValue = isElementHaSwitch(target) ? target.checked : target.value;
        log.debug('🔧 Field Value Changed:', { targetId, newValue });
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
    renderWeatherDevicePicker(name, label, required = false, className = undefined) {
        const classes = { item: true };
        if (className) {
            classes[className] = true;
        }
        return x `
      <bwc-weather-device-picker-element
        id="${name}"
        .hass=${this.hass}
        class=${e$1(classes)}
        .label="${label} (${required ? this.localize('editor.required') : this.localize('editor.optional')})"
        .value=${typeof this._config[name] === 'string' ? this._config[name] : ''}
        @value-changed=${this._handleFieldChange}
      ></bwc-weather-device-picker-element>
    `;
    }
    renderEntityPicker(name, label, includeDomains = [], required = false, helper = undefined, className = undefined) {
        const classes = { item: true };
        if (className) {
            classes[className] = true;
        }
        return x `
      <ha-entity-picker
        id="${name}"
        .hass=${this.hass}
        class=${e$1(classes)}
        .label="${label} (${required ? this.localize('editor.required') : this.localize('editor.optional')})"
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
    renderTextField(name, label, required = false, className = undefined) {
        const classes = { item: true };
        if (className) {
            classes[className] = true;
        }
        return x `
      <ha-textfield
        id=${name}
        type="string"
        class=${e$1(classes)}
        .value=${this._config[name] ?? ''}
        .label="${label} (${required ? this.localize('editor.required') : this.localize('editor.optional')})"
        name=${name}
        @change=${this._handleFieldChange}
        no-spinner
        .required=${required}
      >
      </ha-textfield>
    `;
    }
    renderNumberSlider(name, label, required = false, className = undefined, minValue = undefined, maxValue = undefined) {
        const classes = { item: true };
        if (className) {
            classes[className] = true;
        }
        return x `<div class=${e$1(classes)}>
      <span class="label">${label}</span
      ><ha-slider
        id=${name}
        min=${o(minValue)}
        max=${o(maxValue)}
        step="1"
        pin
        markers
        labeled
        .value=${this._config[name] ?? ''}
        .label="${label} (${required ? this.localize('editor.required') : this.localize('editor.optional')})"
        name=${name}
        @change=${this._handleFieldChange}
        .required=${required}
      >
      </ha-slider>
    </div>`;
    }
    renderBooleanField(name, label, className = undefined) {
        const classes = { item: true };
        if (className) {
            classes[className] = true;
        }
        return x `
      <ha-formfield class=${e$1(classes)} .label="${label}">
        <ha-switch id=${name} .checked=${this._config[name]} @change=${this._handleFieldChange}> </ha-switch>
      </ha-formfield>
    `;
    }
    renderSummaryOptionsPanel() {
        return x `<ha-expansion-panel .outlined=${true} header="${this.localize('editor.summary')}">
      <div class="item-group">
        <!-- Show Current Temperature -->
        ${this.renderBooleanField(CONFIG_PROP.SHOW_CURRENT_TEMP, this.localize('editor.showCurrentTemperature'))}
        ${this._config[CONFIG_PROP.SHOW_CURRENT_TEMP]
            ? x `<div class="item-group level-one">
              <!-- Current Temp Entity -->
              ${this.renderEntityPicker(CONFIG_PROP.CURRENT_TEMP_ENTITY_ID, this.localize('editor.currentTemperatureEntity'), [], false, getCardEntityDetails(this._cardEntities[CONFIG_PROP.CURRENT_TEMP_ENTITY_ID]).displayName)}

              <!-- Show Feels Like Temperature -->
              ${this._config[CONFIG_PROP.SHOW_CURRENT_TEMP]
                ? this.renderBooleanField(CONFIG_PROP.SHOW_FEELS_LIKE_TEMP, this.localize('editor.showFeelsLikeTemperature'))
                : E}

              <!-- Feels Like Temp Entity -->
              ${this._config[CONFIG_PROP.SHOW_CURRENT_TEMP] && this._config[CONFIG_PROP.SHOW_FEELS_LIKE_TEMP]
                ? this.renderEntityPicker(CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID, this.localize('editor.feelsLikeTemperatureEntity'), [], false, this._cardEntities[CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID]?.is_inferred
                    ? this._cardEntities[CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID].entity_id
                    : undefined)
                : E}
            </div> `
            : E}

        <!-- Weather Icon -->
        ${this.renderBooleanField(CONFIG_PROP.SHOW_WEATHER_ICON, this.localize('editor.showWeatherIcon'))}

        <!-- Weather Icon Entity -->
        ${this._config[CONFIG_PROP.SHOW_WEATHER_ICON]
            ? x `<div class="item-group level-one">
              ${this.renderEntityPicker(CONFIG_PROP.WEATHER_ICON_ENTITY_ID, this.localize('editor.weatherIconEntity'), [], false, getCardEntityDetails(this._cardEntities[CONFIG_PROP.WEATHER_ICON_ENTITY_ID]).displayName)}

              <!-- Use Default Weather Icons -->
              ${this.renderBooleanField(CONFIG_PROP.USE_HA_WEATHER_ICONS, this.localize('editor.useDefaultHaWeatherIcons'))}
            </div>`
            : E}

        <!-- Show Time -->
        ${this.renderBooleanField(CONFIG_PROP.SHOW_TIME, this.localize('editor.showTime'))}

        <!-- Time Entity -->
        ${this._config[CONFIG_PROP.SHOW_TIME]
            ? x `<div class="item-group level-one">
              ${this.renderEntityPicker(CONFIG_PROP.TIME_ENTITY_ID, this.localize('editor.timeEntity'), [], false, getCardEntityDetails(this._cardEntities[CONFIG_PROP.TIME_ENTITY_ID]).displayName)}

              <!-- Show Date -->
              ${this.renderBooleanField(CONFIG_PROP.SHOW_DATE, this.localize('editor.showDate'))}

              <!-- Date Entity -->
              ${this._config[CONFIG_PROP.SHOW_DATE]
                ? this.renderEntityPicker(CONFIG_PROP.DATE_ENTITY_ID, this.localize('editor.dateEntity'), [], false, getCardEntityDetails(this._cardEntities[CONFIG_PROP.DATE_ENTITY_ID]).displayName)
                : E}
            </div>`
            : E}

        <!-- Show Now / Later Temps -->
        ${this.renderBooleanField(CONFIG_PROP.SHOW_NOW_LATER_TEMPS, this.localize('editor.showNowLaterTemps'))}
        ${this._config[CONFIG_PROP.SHOW_NOW_LATER_TEMPS]
            ? x `<div class="item-group level-one">
              <!-- Now Temp Entity -->
              ${this._config[CONFIG_PROP.SHOW_NOW_LATER_TEMPS]
                ? this.renderEntityPicker(CONFIG_PROP.NOW_LATER_NOW_TEMP_ENTITY_ID, this.localize('editor.nowTempEntity'), [], false, getCardEntityDetails(this._cardEntities[CONFIG_PROP.NOW_LATER_NOW_TEMP_ENTITY_ID]).displayName)
                : E}

              <!-- Now Label Entity -->
              ${this._config[CONFIG_PROP.SHOW_NOW_LATER_TEMPS]
                ? this.renderEntityPicker(CONFIG_PROP.NOW_LATER_NOW_LABEL_ENTITY_ID, this.localize('editor.nowLabelEntity'), [], false, getCardEntityDetails(this._cardEntities[CONFIG_PROP.NOW_LATER_NOW_LABEL_ENTITY_ID]).displayName)
                : E}

              <!-- Later Temp Entity -->
              ${this._config[CONFIG_PROP.SHOW_NOW_LATER_TEMPS]
                ? this.renderEntityPicker(CONFIG_PROP.NOW_LATER_LATER_TEMP_ENTITY_ID, this.localize('editor.laterTempEntity'), [], false, getCardEntityDetails(this._cardEntities[CONFIG_PROP.NOW_LATER_LATER_TEMP_ENTITY_ID]).displayName)
                : E}

              <!-- Later Label Entity -->
              ${this._config[CONFIG_PROP.SHOW_NOW_LATER_TEMPS]
                ? this.renderEntityPicker(CONFIG_PROP.NOW_LATER_LATER_LABEL_ENTITY_ID, this.localize('editor.laterLabelEntity'), [], false, getCardEntityDetails(this._cardEntities[CONFIG_PROP.NOW_LATER_LATER_LABEL_ENTITY_ID]).displayName)
                : E}
            </div>`
            : E}

        <!-- Show Warnings Count -->
        ${this.renderBooleanField(CONFIG_PROP.SHOW_WARNING_COUNT, this.localize('editor.showWarningCount'))}
        ${this._config[CONFIG_PROP.SHOW_WARNING_COUNT]
            ? x `<div class="item-group level-one">
              <!-- Warnings Count Entity -->
              ${this.renderEntityPicker(CONFIG_PROP.WARNING_COUNT_ENTITY_ID, this.localize('editor.warningsCountEntity'))}
              ${this.renderBooleanField(CONFIG_PROP.HIDE_WARNING_COUNT_IF_ZERO, this.localize('editor.hideWarningCountIfZero'))}
            </div>`
            : E}

        <!-- Show Rain Summary -->
        ${this.renderBooleanField(CONFIG_PROP.SHOW_RAIN_SUMMARY, this.localize('editor.showRainSummary'))}

        <!-- Rain Summary Entity -->
        ${this._config[CONFIG_PROP.SHOW_RAIN_SUMMARY]
            ? x `<div class="item-group level-one">
              ${this.renderEntityPicker(CONFIG_PROP.RAIN_SUMMARY_ENTITY_ID, this.localize('editor.rainSummaryEntity'))}
            </div>`
            : E}

        <!-- Show Forecast Summary -->
        ${this.renderBooleanField(CONFIG_PROP.SHOW_FORECAST_SUMMARY, this.localize('editor.showForecastSummary'))}

        <!-- Forecast Summary Entity -->
        ${this._config[CONFIG_PROP.SHOW_FORECAST_SUMMARY]
            ? x `<div class="item-group level-one">
              ${this.renderEntityPicker(CONFIG_PROP.FORECAST_SUMMARY_ENTITY_ID, this.localize('editor.forecastSummaryEntity'))}
            </div>`
            : E}
      </div>
    </ha-expansion-panel>`;
    }
    renderHourlyForecastOptionsPanel() {
        return x `<ha-expansion-panel .outlined=${true} header="${this.localize('editor.hourlyForecast')}">
      <!-- Show Hourly Forecast -->
      ${this.renderBooleanField(CONFIG_PROP.SHOW_HOURLY_FORECAST, this.localize('editor.showHourlyForecast'))}
    </ha-expansion-panel>`;
    }
    renderDailyForecastOptionsPanel() {
        return x `<ha-expansion-panel .outlined=${true} header="${this.localize('editor.dailyForecast')}">
      <!-- Show Daily Forecast -->
      ${this.renderBooleanField(CONFIG_PROP.SHOW_DAILY_FORECAST, this.localize('editor.showDailyForecast'))}

      <!-- Show Title Option -->
      ${this._config[CONFIG_PROP.SHOW_DAILY_FORECAST]
            ? x `<div class="item-group level-one">
            ${this.renderBooleanField(CONFIG_PROP.SHOW_DAILY_FORECAST_TITLE, this.localize('editor.showDailyForecastTitle'))}
          </div>`
            : E}

      <!-- Number of Days -->
      <div class="item-group level-one">
        ${this._config[CONFIG_PROP.SHOW_DAILY_FORECAST]
            ? x ` ${this.renderNumberSlider(CONFIG_PROP.DAILY_FORECAST_NUMBER_OF_DAYS, this.localize('editor.numberOfDays'), false, 'item', 1, 10)}`
            : E}
      </div>
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
    n$1({ attribute: false })
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
