var version = "0.0.3";

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

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

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
    SHOW_TIME: 'show_time',
    SHOW_DATE: 'show_date',
    OBSERVATION_ENTITY_ID: 'observation_entity_id',
    FORECAST_ENTITY_ID: 'forecast_entity_id',
    USE_HA_WEATHER_ICONS: 'use_ha_weather_icons',
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
    [CONFIG_PROP.SHOW_TIME]: undefined,
    [CONFIG_PROP.SHOW_DATE]: undefined,
    [CONFIG_PROP.OBSERVATION_ENTITY_ID]: undefined,
    [CONFIG_PROP.FORECAST_ENTITY_ID]: undefined,
    [CONFIG_PROP.USE_HA_WEATHER_ICONS]: undefined,
};

const LANGUAGE = {
    EN: 'en',
};
const DEFAULT_LANGUAGE = LANGUAGE.EN;

const OBSERVATION_ATTRIBUTE = {
    CURRENT_TEMPERATURE: 'temperature',
};

const isDayMode = (hass) => {
    return hass?.states['sun.sun']
        ? hass.states['sun.sun'].state === 'above_horizon'
        : true;
};

var common = {
	version: "Version",
	title: "BOM Weather Card",
	description: "Display weather information in the style of the BOM (Bureau of Meteorology) Australia app."
};
var card = {
	feelsLike: "Feels like"
};
var editor = {
	forecastEntity: "Forecast Entity",
	observationEntity: "Observation Entity",
	optional: "Optional",
	required: "Required",
	showDate: "Show Date",
	showLocation: "Show Location",
	showTime: "Show Time",
	timeEntity: "Time Entity",
	title: "Title",
	useDefaultHaWeatherIcons: "Use Default HA Weather Icons"
};
var error = {
	invalidConfigProperty: "Invalid config property: {property}"
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
    en: en$1, // English
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function getLocalizer(lang = DEFAULT_LANGUAGE) {
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
        console.assert(lang === undefined || Object.values(LANGUAGE).includes(lang), `Invalid language: ${lang}`);
        let translated;
        try {
            translated = string
                .split('.')
                .reduce((o, i) => o[i], languageStrings[lang]);
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
    }
  }
`;

const cssVariables = i$4 `
  :host {
    /* Bom Weather Card Custom CSS Variables */
    --bwc-background-color-day-start: #63b0ff;
    --bwc-background-color-day-end: #c4e1ff;
    --bwc-background-color-night-start: #001d3b;
    --bwc-background-color-night-end: #013565;
    --bwc-time-date-time-font-size: 3.5rem;
    --bwc-time-date-date-font-size: 1rem;
    --bwc-temperature-number-font-size: 3.5rem;
    --bwc-temperature-description-font-size: 1rem;
    --bwc-weather-icon-height: 7rem;
    --bwc-min-height: 10rem;
    --bwc-global-padding: 16px;
    --bwc-item-container-height: 5rem;

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

const debugStyles = i$4 `
  :host {
    --bwc-debug-element-border: 1px solid red;
    --bwc-debug-container-border: 1px solid orange;

    & > div,
    & > div > span {
      box-sizing: border-box;
      border: var(--bwc-debug-element-border);
    }

    .container {
      box-sizing: border-box;
      border: var(--bwc-debug-container-border);
    }
  }
`;

let BomWeatherCard = class BomWeatherCard extends r$2 {
    constructor() {
        super(...arguments);
        this._config = { ...DEFAULT_CARD_CONFIG };
        this._dayMode = true;
        this._darkMode = false;
        this.language = DEFAULT_LANGUAGE;
        this.localize = getLocalizer(this.language);
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
    // Override the updated method
    updated(changedProperties) {
        // TODO: This may get too heavy if hass changes often
        if (changedProperties.has('hass')) {
            this._dayMode = isDayMode(this.hass);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this._darkMode = this.hass.themes.darkMode === true;
            if (this.hass.locale?.language !== this.language) {
                this.language = this.hass.locale?.language;
                this.localize = getLocalizer(this.language);
            }
        }
    }
    // Render card
    render() {
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

      <!-- First Row -->
      <div class="item-container">
        <!-- Current Temperature (conditional on observation_entity_id) -->
        ${this._config.observation_entity_id
            ? x `<bwc-temperature-element
              class="item"
              .localize=${this.localize}
              .temperature=${this.hass.states[this._config.observation_entity_id].attributes[OBSERVATION_ATTRIBUTE.CURRENT_TEMPERATURE]}
            ></bwc-temperature-element>`
            : E}

        <!-- Weather Icon (conditional on forecast_entity_id) -->
        ${this._config.observation_entity_id
            ? x `<bwc-weather-icon-element
              class=${classNames('item', {
                center: this._config.show_time === true,
                right: this._config.show_time !== true,
            })}
              .hass=${this.hass}
              .useHAWeatherIcons=${this._config.use_ha_weather_icons === true}
              .weatherEntityId=${this._config.observation_entity_id}
            ></bwc-weather-icon-element>`
            : E}

        <!-- Time -->
        ${this._config.show_time === true
            ? x `<bwc-time-date-element
              class="item right"
              .hass=${this.hass}
            ></bwc-time-date-element>`
            : E}
      </div>

      <!-- Second Row -->
      <div class="item-container">
        <div class="item">TBD: Min / Max</div>

        <div class="item">TBD: Warnings</div>
      </div>

      <!-- Third Row -->
      <div class="item-container">
        <div class="item">TBD: Rain</div>
      </div>

      <!-- Fourth Row -->
      <div class="item-container">
        <div class="item">TBD: Summary</div>
      </div>
    </ha-card> `;
    }
    static async getConfigElement() {
        await Promise.resolve().then(function () { return bomWeatherCardEditor; });
        return document.createElement('bom-weather-card-editor');
    }
    static get styles() {
        return i$4 `
      ${cssVariables}
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

      ${debugStyles}
    `;
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
], BomWeatherCard.prototype, "_dayMode", undefined);
__decorate([
    r()
], BomWeatherCard.prototype, "_darkMode", undefined);
BomWeatherCard = __decorate([
    t$1('bom-weather-card')
], BomWeatherCard);

const elementStyles = i$4 `
  :host {
    display: block;
  }

  /* Comment or uncomment this line to toggle debug styles */
  ${debugStyles}
`;

let temperatureElement = class temperatureElement extends r$2 {
    render() {
        return x `<div class=${classNames('temperature-element')}>
      <span class="number">${this.temperature}&deg;</span>
      <span class="description"
        >${this.localize('card.feelsLike')}&nbsp;<strong
          >${this.temperature}&deg;</strong
        ></span
      >
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
          margin-bottom: 0.25em;
          font-weight: 500;
          width: fit-content;
        }

        .description {
          font-size: var(--bwc-temperature-description-font-size);
          line-height: 1em;
          width: fit-content;
        }
      }
    `;
    }
};
__decorate([
    n({ attribute: false })
], temperatureElement.prototype, "temperature", undefined);
__decorate([
    n()
], temperatureElement.prototype, "weatherEntityId", undefined);
__decorate([
    n()
], temperatureElement.prototype, "localize", undefined);
temperatureElement = __decorate([
    t$1('bwc-temperature-element')
], temperatureElement);

let TimeElement = class TimeElement extends r$2 {
    constructor() {
        super(...arguments);
        this._currentTime = '';
        this._currentDate = '';
    }
    _update() {
        if (this.hass) {
            this._currentTime = this.hass.states['sensor.time'].state;
            this._currentDate = this.hass.states['sensor.date'].state;
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
        return x `<div class=${classNames('time-date-element')}>
      <span class="time">${this._currentTime}</span>
      <span class="date">${this._currentDate}</span>
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
          margin-bottom: 0.25em;
          font-weight: 500;
          width: fit-content;
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
    r()
], TimeElement.prototype, "_currentTime", undefined);
__decorate([
    r()
], TimeElement.prototype, "_currentDate", undefined);
TimeElement = __decorate([
    t$1('bwc-time-date-element')
], TimeElement);

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

var clearNight = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"a\" x1=\"21.92\" x2=\"38.52\" y1=\"18.75\" y2=\"47.52\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#86c3db\"/><stop offset=\".45\" stop-color=\"#86c3db\"/><stop offset=\"1\" stop-color=\"#5eafcf\"/><animateTransform attributeName=\"gradientTransform\" dur=\"10s\" repeatCount=\"indefinite\" type=\"rotate\" values=\"5 32 32; -15 32 32; 5 32 32\"/></linearGradient></defs><path fill=\"url(#a)\" stroke=\"#72b9d5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\".5\" d=\"M46.66 36.2a16.66 16.66 0 01-16.78-16.55 16.29 16.29 0 01.55-4.15A16.56 16.56 0 1048.5 36.1c-.61.06-1.22.1-1.84.1z\"><animateTransform attributeName=\"transform\" dur=\"10s\" repeatCount=\"indefinite\" type=\"rotate\" values=\"-5 32 32; 15 32 32; -5 32 32\"/></path></svg>";

var cloudy = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"a\" x1=\"22.56\" x2=\"39.2\" y1=\"21.96\" y2=\"50.8\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#f3f7fe\"/><stop offset=\".45\" stop-color=\"#f3f7fe\"/><stop offset=\"1\" stop-color=\"#deeafb\"/></linearGradient></defs><path fill=\"url(#a)\" stroke=\"#e6effc\" stroke-miterlimit=\"10\" stroke-width=\".5\" d=\"M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z\"><animateTransform attributeName=\"transform\" dur=\"7s\" repeatCount=\"indefinite\" type=\"translate\" values=\"-3 0; 3 0; -3 0\"/></path></svg>";

var exceptional = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"a\" x1=\"21.97\" x2=\"42.03\" y1=\"14.63\" y2=\"49.37\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#d4d7dd\"/><stop offset=\".45\" stop-color=\"#d4d7dd\"/><stop offset=\"1\" stop-color=\"#bec1c6\"/><animateTransform attributeName=\"gradientTransform\" dur=\"1s\" repeatCount=\"indefinite\" type=\"rotate\" values=\"0 32 32; 360 32 32\"/></linearGradient></defs><path fill=\"none\" stroke=\"url(#a)\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"3\" d=\"M43 32a11 11 0 11-11-11 11 11 0 0111 11zM25 14.61l-.48 1a33.68 33.68 0 00-3.42 17.82h0M39 49.39l.48-1a33.68 33.68 0 003.42-17.82h0\"><animateTransform attributeName=\"transform\" dur=\"1s\" repeatCount=\"indefinite\" type=\"rotate\" values=\"360 32 32; 0 32 32\"/></path></svg>";

var fog = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"b\" x1=\"22.56\" x2=\"39.2\" y1=\"21.96\" y2=\"50.8\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#f3f7fe\"/><stop offset=\".45\" stop-color=\"#f3f7fe\"/><stop offset=\"1\" stop-color=\"#deeafb\"/></linearGradient><linearGradient id=\"a\" x1=\"27.5\" x2=\"36.5\" y1=\"50.21\" y2=\"65.79\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#d4d7dd\"/><stop offset=\".45\" stop-color=\"#d4d7dd\"/><stop offset=\"1\" stop-color=\"#bec1c6\"/></linearGradient><linearGradient id=\"c\" y1=\"44.21\" y2=\"59.79\" xlink:href=\"#a\"/></defs><path fill=\"url(#b)\" stroke=\"#e6effc\" stroke-miterlimit=\"10\" stroke-width=\".5\" d=\"M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z\"/><path fill=\"none\" stroke=\"url(#a)\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"3\" d=\"M17 58h30\"><animateTransform attributeName=\"transform\" begin=\"0s\" dur=\"5s\" repeatCount=\"indefinite\" type=\"translate\" values=\"-4 0; 4 0; -4 0\"/></path><path fill=\"none\" stroke=\"url(#c)\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"3\" d=\"M17 52h30\"><animateTransform attributeName=\"transform\" begin=\"-4s\" dur=\"5s\" repeatCount=\"indefinite\" type=\"translate\" values=\"-4 0; 4 0; -4 0\"/></path></svg>";

var hail = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"b\" x1=\"22.56\" x2=\"39.2\" y1=\"21.96\" y2=\"50.8\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#f3f7fe\"/><stop offset=\".45\" stop-color=\"#f3f7fe\"/><stop offset=\"1\" stop-color=\"#deeafb\"/></linearGradient><linearGradient id=\"a\" x1=\"23.25\" x2=\"24.75\" y1=\"43.7\" y2=\"46.3\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#86c3db\"/><stop offset=\".45\" stop-color=\"#86c3db\"/><stop offset=\"1\" stop-color=\"#5eafcf\"/></linearGradient><linearGradient id=\"c\" x1=\"30.25\" x2=\"31.75\" y1=\"43.7\" y2=\"46.3\" xlink:href=\"#a\"/><linearGradient id=\"d\" x1=\"37.25\" x2=\"38.75\" y1=\"43.7\" y2=\"46.3\" xlink:href=\"#a\"/></defs><path fill=\"url(#b)\" stroke=\"#e6effc\" stroke-miterlimit=\"10\" stroke-width=\".5\" d=\"M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z\"/><path fill=\"url(#a)\" d=\"M24 43.5a1.5 1.5 0 101.5 1.5 1.5 1.5 0 00-1.5-1.5z\"><animateTransform attributeName=\"transform\" dur=\"0.6s\" repeatCount=\"indefinite\" type=\"translate\" values=\"1 -5; -2 18; -4 14\"/><animate attributeName=\"opacity\" dur=\"0.6s\" repeatCount=\"indefinite\" values=\"1;1;0\"/></path><path fill=\"url(#c)\" d=\"M31 43.5a1.5 1.5 0 101.5 1.5 1.5 1.5 0 00-1.5-1.5z\"><animateTransform attributeName=\"transform\" begin=\"-0.4s\" dur=\"0.6s\" repeatCount=\"indefinite\" type=\"translate\" values=\"1 -5; -2 18; -4 14\"/><animate attributeName=\"opacity\" begin=\"-0.4s\" dur=\"0.6s\" repeatCount=\"indefinite\" values=\"1;1;0\"/></path><path fill=\"url(#d)\" d=\"M38 43.5a1.5 1.5 0 101.5 1.5 1.5 1.5 0 00-1.5-1.5z\"><animateTransform attributeName=\"transform\" begin=\"-0.2s\" dur=\"0.6s\" repeatCount=\"indefinite\" type=\"translate\" values=\"1 -5; -2 18; -4 14\"/><animate attributeName=\"opacity\" begin=\"-0.2s\" dur=\"0.6s\" repeatCount=\"indefinite\" values=\"1;1;0\"/></path></svg>";

var lightningRainy = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"b\" x1=\"22.56\" x2=\"39.2\" y1=\"21.96\" y2=\"50.8\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#f3f7fe\"/><stop offset=\".45\" stop-color=\"#f3f7fe\"/><stop offset=\"1\" stop-color=\"#deeafb\"/></linearGradient><linearGradient id=\"a\" x1=\"22.53\" x2=\"25.47\" y1=\"42.95\" y2=\"48.05\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#4286ee\"/><stop offset=\".45\" stop-color=\"#4286ee\"/><stop offset=\"1\" stop-color=\"#0950bc\"/></linearGradient><linearGradient id=\"c\" x1=\"29.53\" x2=\"32.47\" y1=\"42.95\" y2=\"48.05\" xlink:href=\"#a\"/><linearGradient id=\"d\" x1=\"36.53\" x2=\"39.47\" y1=\"42.95\" y2=\"48.05\" xlink:href=\"#a\"/><linearGradient id=\"e\" x1=\"26.74\" x2=\"35.76\" y1=\"37.88\" y2=\"53.52\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#f7b23b\"/><stop offset=\".45\" stop-color=\"#f7b23b\"/><stop offset=\"1\" stop-color=\"#f59e0b\"/></linearGradient></defs><path fill=\"url(#b)\" stroke=\"#e6effc\" stroke-miterlimit=\"10\" stroke-width=\".5\" d=\"M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z\"/><path fill=\"none\" stroke=\"url(#a)\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" d=\"M24.39 43.03l-.78 4.94\"><animateTransform attributeName=\"transform\" dur=\"0.7s\" repeatCount=\"indefinite\" type=\"translate\" values=\"1 -5; -2 10\"/><animate attributeName=\"opacity\" dur=\"0.7s\" repeatCount=\"indefinite\" values=\"0;1;1;0\"/></path><path fill=\"none\" stroke=\"url(#c)\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" d=\"M31.39 43.03l-.78 4.94\"><animateTransform attributeName=\"transform\" begin=\"-0.4s\" dur=\"0.7s\" repeatCount=\"indefinite\" type=\"translate\" values=\"1 -5; -2 10\"/><animate attributeName=\"opacity\" begin=\"-0.4s\" dur=\"0.7s\" repeatCount=\"indefinite\" values=\"0;1;1;0\"/></path><path fill=\"none\" stroke=\"url(#d)\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" d=\"M38.39 43.03l-.78 4.94\"><animateTransform attributeName=\"transform\" begin=\"-0.2s\" dur=\"0.7s\" repeatCount=\"indefinite\" type=\"translate\" values=\"1 -5; -2 10\"/><animate attributeName=\"opacity\" begin=\"-0.2s\" dur=\"0.7s\" repeatCount=\"indefinite\" values=\"0;1;1;0\"/></path><path fill=\"url(#e)\" stroke=\"#f6a823\" stroke-miterlimit=\"10\" stroke-width=\".5\" d=\"M30 36l-4 12h4l-2 10 10-14h-6l4-8h-6z\"><animate attributeName=\"opacity\" dur=\"2s\" repeatCount=\"indefinite\" values=\"1; 1; 1; 1; 1; 1; 0.1; 1; 0.1; 1; 1; 0.1; 1; 0.1; 1\"/></path></svg>";

var lightning = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><linearGradient id=\"a\" x1=\"22.56\" x2=\"39.2\" y1=\"21.96\" y2=\"50.8\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#f3f7fe\"/><stop offset=\".45\" stop-color=\"#f3f7fe\"/><stop offset=\"1\" stop-color=\"#deeafb\"/></linearGradient><linearGradient id=\"b\" x1=\"26.74\" x2=\"35.76\" y1=\"37.88\" y2=\"53.52\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#f7b23b\"/><stop offset=\".45\" stop-color=\"#f7b23b\"/><stop offset=\"1\" stop-color=\"#f59e0b\"/></linearGradient></defs><path fill=\"url(#a)\" stroke=\"#e6effc\" stroke-miterlimit=\"10\" stroke-width=\".5\" d=\"M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z\"/><path fill=\"url(#b)\" stroke=\"#f6a823\" stroke-miterlimit=\"10\" stroke-width=\".5\" d=\"M30 36l-4 12h4l-2 10 10-14h-6l4-8h-6z\"><animate attributeName=\"opacity\" dur=\"2s\" repeatCount=\"indefinite\" values=\"1; 1; 1; 1; 1; 1; 0.1; 1; 0.1; 1; 1; 0.1; 1; 0.1; 1\"/></path></svg>";

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
        const weatherIconIndex = this.weatherEntityId
            ? this.hass.states[this.weatherEntityId].state
            : undefined;
        return x `<div class=${classNames('weather-icon-element')}>
      ${weatherIconIndex &&
            (this.useHAWeatherIcons
                ? x `<ha-icon icon="mdi:weather-${weatherIconIndex}"></ha-icon>`
                : x `${o(WEATHER_ICON[weatherIconIndex])}`)}
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
    n({ attribute: false })
], WeatherIconElement.prototype, "hass", undefined);
__decorate([
    n()
], WeatherIconElement.prototype, "weatherEntityId", undefined);
__decorate([
    n({ type: Boolean })
], WeatherIconElement.prototype, "useHAWeatherIcons", undefined);
WeatherIconElement = __decorate([
    t$1('bwc-weather-icon-element')
], WeatherIconElement);

const localizer = getLocalizer();
console.info(`%c  BOM-WEATHER-CARD \n%c  ${localizer('common.version')} ${version}    `, 'color: orange; font-weight: bold; background: black', 'color: white; font-weight: bold; background: dimgray');
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
const WEATHER_DOMAINS = [DOMAIN.WEATHER];

/**
 * Check if the target element is an `ha-switch` element
 * @param targetElement
 * @returns boolean
 */
const isElementHaSwitch = (targetElement) => {
    return (targetElement.tagName ?? '').toLowerCase() === 'ha-switch';
};

/**
 * Removes invalid properties from a config object (potentially
 * stored at an earlier time when the schema was different).
 */
const removeInvalidConfigProperties = (config) => {
    return config;
    // const validKeys = new Set<A_CONFIG_PROP>(
    //   Object.keys(DEFAULT_CARD_CONFIG) as A_CONFIG_PROP[]
    // );
    // return Object.keys(config).reduce((acc, key) => {
    //   if (validKeys.has(key as A_CONFIG_PROP)) {
    //     (acc as Record<string, unknown>)[key] = config[key as A_CONFIG_PROP];
    //   }
    //   return acc;
    // }, {} as CardConfig);
};

// Take an array of strings and return a string with each element separated by a comma and wrapped in double quotes
function toLitElementArray(arr) {
    return arr.map((e) => `"${e}"`).join(', ');
}

let BomWeatherCardEditor = class BomWeatherCardEditor extends r$2 {
    constructor() {
        super(...arguments);
        this._config = { ...DEFAULT_CARD_CONFIG };
        this.localize = getLocalizer(this.hass.locale?.language);
        this._initialized = false;
    }
    setConfig(newConfig) {
        // On first load, merge the default config with the user provided config
        if (!this._initialized) {
            this._config = removeInvalidConfigProperties({
                ...this._config,
                ...newConfig,
            });
            this._initialized = true;
        }
        else {
            this._config = { ...newConfig };
        }
        // Preload the HA Entity Picker
        this.loadEntityPicker();
    }
    entityPicker(name, label, required = false) {
        return x `
      <ha-entity-picker
        id="${name}"
        .hass=${this.hass}
        .label="${label} (${required
            ? this.localize('editor.required')
            : this.localize('editor.optional')})"
        .value=${this._config[name] ?? ''}
        @value-changed=${this._change}
        allow-custom-entity
        include-domains=${toLitElementArray(WEATHER_DOMAINS)}
        .required=${required}
      >
      </ha-entity-picker>
    `;
    }
    textField(name, label, required = false) {
        return x `
      <ha-textfield
        id=${name}
        type="string"
        .value=${this._config[name] ?? ''}
        .label="${label} (${required
            ? this.localize('editor.required')
            : this.localize('editor.optional')})"
        name=${name}
        @change=${this._change}
        no-spinner
        .required=${required}
      >
      </ha-textfield>
    `;
    }
    booleanField(name, label) {
        return x `
      <ha-formfield .label=${label}>
        <ha-switch
          id=${name}
          .checked=${this._config[name] ?? false}
          @change=${this._change}
        ></ha-switch>
      </ha-formfield>
    `;
    }
    render() {
        return x `<div class="card-config">
      <!-- Title -->
      ${this.textField(CONFIG_PROP.TITLE, this.localize('editor.title'), false)}

      <!-- Show Time -->
      ${this.booleanField(CONFIG_PROP.SHOW_TIME, this.localize('editor.showTime'))}

      <!-- Show Date -->
      ${this.booleanField(CONFIG_PROP.SHOW_DATE, this.localize('editor.showDate'))}

      <!-- Observation Entity ID -->
      ${this.entityPicker(CONFIG_PROP.OBSERVATION_ENTITY_ID, this.localize('editor.observationEntity'), true)}

      <!-- Forecast Entity ID -->
      ${this.entityPicker(CONFIG_PROP.FORECAST_ENTITY_ID, this.localize('editor.forecastEntity'), true)}

      <!-- Use Default Weather Icons -->
      ${this.booleanField(CONFIG_PROP.USE_HA_WEATHER_ICONS, this.localize('editor.useDefaultHaWeatherIcons'))}
    </div> `;
    }
    _change(ev) {
        const target = ev.target;
        ev.stopPropagation();
        const targetId = target.id;
        if (!(targetId in DEFAULT_CARD_CONFIG)) {
            throw new Error(this.localize('error.invalidConfigProperty', { property: targetId }));
        }
        const newValue = isElementHaSwitch(target)
            ? target.checked
            : target.value;
        if (newValue === this._config[targetId])
            return;
        const newConfig = { ...this._config };
        if (newValue === '' || newValue == undefined || newValue === false) {
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
    /**
     * Need this to load the HA elements we want to re-use
     * see: https://github.com/thomasloven/hass-config/wiki/PreLoading-Lovelace-Elements
     * */
    async loadEntityPicker() {
        if (!window.customElements.get('ha-entity-picker')) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const ch = await window.loadCardHelpers();
            const c = await ch.createCardElement({
                type: 'entities',
                entities: [],
            });
            await c.constructor.getConfigElement();
            // Since ha-elements are not using scopedRegistry we can get a reference to
            // the newly loaded element from the global customElement registry...
            // const haEntityPicker = window.customElements.get("ha-entity-picker");
        }
    }
    static get styles() {
        return i$4 `
      .card-config {
        /* Cancels overlapping Margins for HAForm + Card Config options */
        overflow: auto;

        /* Seems to fix a scroll bar issue created by an empty element picker */
        padding-right: 16px;
      }
      ha-switch {
        padding: 16px 6px;
      }
    `;
    }
};
__decorate([
    n({ attribute: false })
], BomWeatherCardEditor.prototype, "hass", undefined);
__decorate([
    r()
], BomWeatherCardEditor.prototype, "_config", undefined);
BomWeatherCardEditor = __decorate([
    t$1('bom-weather-card-editor')
], BomWeatherCardEditor);

var bomWeatherCardEditor = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get BomWeatherCardEditor () { return BomWeatherCardEditor; }
});
//# sourceMappingURL=bom-weather-card.js.map
