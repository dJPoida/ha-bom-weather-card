function e(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var t,i={exports:{}};var r,s,a,n=(t||(t=1,s=i.exports,a=function(){var e=function(){},t="undefined",i=typeof window!==t&&typeof window.navigator!==t&&/Trident\/|MSIE /.test(window.navigator.userAgent),r=["trace","debug","info","warn","error"],s={},a=null;function n(e,t){var i=e[t];if("function"==typeof i.bind)return i.bind(e);try{return Function.prototype.bind.call(i,e)}catch(t){return function(){return Function.prototype.apply.apply(i,[e,arguments])}}}function o(){console.log&&(console.log.apply?console.log.apply(console,arguments):Function.prototype.apply.apply(console.log,[console,arguments])),console.trace&&console.trace()}function l(){for(var i=this.getLevel(),s=0;s<r.length;s++){var a=r[s];this[a]=s<i?e:this.methodFactory(a,i,this.name)}if(this.log=this.debug,typeof console===t&&i<this.levels.SILENT)return"No console available for logging"}function d(e){return function(){typeof console!==t&&(l.call(this),this[e].apply(this,arguments))}}function c(r,s,a){return function(r){return"debug"===r&&(r="log"),typeof console!==t&&("trace"===r&&i?o:void 0!==console[r]?n(console,r):void 0!==console.log?n(console,"log"):e)}(r)||d.apply(this,arguments)}function h(e,i){var n,o,d,h=this,p="loglevel";function u(){var e;if(typeof window!==t&&p){try{e=window.localStorage[p]}catch(e){}if(typeof e===t)try{var i=window.document.cookie,r=encodeURIComponent(p),s=i.indexOf(r+"=");-1!==s&&(e=/^([^;]+)/.exec(i.slice(s+r.length+1))[1])}catch(e){}return void 0===h.levels[e]&&(e=void 0),e}}function f(e){var t=e;if("string"==typeof t&&void 0!==h.levels[t.toUpperCase()]&&(t=h.levels[t.toUpperCase()]),"number"==typeof t&&t>=0&&t<=h.levels.SILENT)return t;throw new TypeError("log.setLevel() called with invalid level: "+e)}"string"==typeof e?p+=":"+e:"symbol"==typeof e&&(p=void 0),h.name=e,h.levels={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,SILENT:5},h.methodFactory=i||c,h.getLevel=function(){return null!=d?d:null!=o?o:n},h.setLevel=function(e,i){return d=f(e),!1!==i&&function(e){var i=(r[e]||"silent").toUpperCase();if(typeof window!==t&&p){try{return void(window.localStorage[p]=i)}catch(e){}try{window.document.cookie=encodeURIComponent(p)+"="+i+";"}catch(e){}}}(d),l.call(h)},h.setDefaultLevel=function(e){o=f(e),u()||h.setLevel(e,!1)},h.resetLevel=function(){d=null,function(){if(typeof window!==t&&p){try{window.localStorage.removeItem(p)}catch(e){}try{window.document.cookie=encodeURIComponent(p)+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC"}catch(e){}}}(),l.call(h)},h.enableAll=function(e){h.setLevel(h.levels.TRACE,e)},h.disableAll=function(e){h.setLevel(h.levels.SILENT,e)},h.rebuild=function(){if(a!==h&&(n=f(a.getLevel())),l.call(h),a===h)for(var e in s)s[e].rebuild()},n=f(a?a.getLevel():"WARN");var m=u();null!=m&&(d=f(m)),l.call(h)}(a=new h).getLogger=function(e){if("symbol"!=typeof e&&"string"!=typeof e||""===e)throw new TypeError("You must supply a name when creating a logger.");var t=s[e];return t||(t=s[e]=new h(e,a.methodFactory)),t};var p=typeof window!==t?window.log:void 0;return a.noConflict=function(){return typeof window!==t&&window.log===a&&(window.log=p),a},a.getLoggers=function(){return s},a.default=a,a},(r=i).exports?r.exports=a():s.log=a()),i.exports),o=e(n),l="0.0.1324";function d(e,t,i,r){for(var s,a=arguments.length,n=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r,o=e.length-1;o>=0;o--)(s=e[o])&&(n=(a<3?s(n):a>3?s(t,i,n):s(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;var c,h={exports:{}};
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/var p=(c||(c=1,function(e){!function(){var t={}.hasOwnProperty;function i(){for(var e="",t=0;t<arguments.length;t++){var i=arguments[t];i&&(e=s(e,r(i)))}return e}function r(e){if("string"==typeof e||"number"==typeof e)return e;if("object"!=typeof e)return"";if(Array.isArray(e))return i.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var r="";for(var a in e)t.call(e,a)&&e[a]&&(r=s(r,a));return r}function s(e,t){return t?e?e+" "+t:e+t:e}e.exports?(i.default=i,e.exports=i):window.classNames=i}()}(h)),h.exports),u=e(p);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const f=globalThis,m=f.ShadowRoot&&(void 0===f.ShadyCSS||f.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,g=Symbol(),y=new WeakMap;let v=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==g)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(m&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=y.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&y.set(t,e))}return e}toString(){return this.cssText}};const w=e=>new v("string"==typeof e?e:e+"",void 0,g),b=(e,...t)=>{const i=1===e.length?e[0]:t.reduce(((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1]),e[0]);return new v(i,e,g)},_=m?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return w(t)})(e):e
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:$,defineProperty:k,getOwnPropertyDescriptor:x,getOwnPropertyNames:E,getOwnPropertySymbols:C,getPrototypeOf:S}=Object,A=globalThis,T=A.trustedTypes,N=T?T.emptyScript:"",z=A.reactiveElementPolyfillSupport,U=(e,t)=>e,P={toAttribute(e,t){switch(t){case Boolean:e=e?N:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},M=(e,t)=>!$(e,t),O={attribute:!0,type:String,converter:P,reflect:!1,hasChanged:M};Symbol.metadata??=Symbol("metadata"),A.litPropertyMetadata??=new WeakMap;class D extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=O){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&k(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:s}=x(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get(){return r?.call(this)},set(t){const a=r?.call(this);s.call(this,t),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??O}static _$Ei(){if(this.hasOwnProperty(U("elementProperties")))return;const e=S(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(U("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(U("properties"))){const e=this.properties,t=[...E(e),...C(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(_(e))}else void 0!==e&&t.push(_(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(m)e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const i of t){const t=document.createElement("style"),r=f.litNonce;void 0!==r&&t.setAttribute("nonce",r),t.textContent=i.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EC(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:P).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:P;this._$Em=r,this[r]=s.fromAttribute(t,e.type),this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){if(i??=this.constructor.getPropertyOptions(e),!(i.hasChanged??M)(this[e],t))return;this.P(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(e,t,i){this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$Em!==e&&(this._$Ej??=new Set).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e)!0!==i.wrapped||this._$AL.has(t)||void 0===this[t]||this.P(t,this[t],i)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((e=>e.hostUpdate?.())),this.update(t)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&=this._$Ej.forEach((e=>this._$EC(e,this[e]))),this._$EU()}updated(e){}firstUpdated(e){}}D.elementStyles=[],D.shadowRootOptions={mode:"open"},D[U("elementProperties")]=new Map,D[U("finalized")]=new Map,z?.({ReactiveElement:D}),(A.reactiveElementVersions??=[]).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F=globalThis,L=F.trustedTypes,G=L?L.createPolicy("lit-html",{createHTML:e=>e}):void 0,I="$lit$",R=`lit$${Math.random().toFixed(9).slice(2)}$`,H="?"+R,B=`<${H}>`,W=document,j=()=>W.createComment(""),V=e=>null===e||"object"!=typeof e&&"function"!=typeof e,q=Array.isArray,Z="[ \t\n\f\r]",J=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,K=/-->/g,Y=/>/g,X=RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Q=/'/g,ee=/"/g,te=/^(?:script|style|textarea|title)$/i,ie=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),re=Symbol.for("lit-noChange"),se=Symbol.for("lit-nothing"),ae=new WeakMap,ne=W.createTreeWalker(W,129);function oe(e,t){if(!q(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==G?G.createHTML(t):t}const le=(e,t)=>{const i=e.length-1,r=[];let s,a=2===t?"<svg>":3===t?"<math>":"",n=J;for(let t=0;t<i;t++){const i=e[t];let o,l,d=-1,c=0;for(;c<i.length&&(n.lastIndex=c,l=n.exec(i),null!==l);)c=n.lastIndex,n===J?"!--"===l[1]?n=K:void 0!==l[1]?n=Y:void 0!==l[2]?(te.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=X):void 0!==l[3]&&(n=X):n===X?">"===l[0]?(n=s??J,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,o=l[1],n=void 0===l[3]?X:'"'===l[3]?ee:Q):n===ee||n===Q?n=X:n===K||n===Y?n=J:(n=X,s=void 0);const h=n===X&&e[t+1].startsWith("/>")?" ":"";a+=n===J?i+B:d>=0?(r.push(o),i.slice(0,d)+I+i.slice(d)+R+h):i+R+(-2===d?t:h)}return[oe(e,a+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class de{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,a=0;const n=e.length-1,o=this.parts,[l,d]=le(e,t);if(this.el=de.createElement(l,i),ne.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=ne.nextNode())&&o.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(I)){const t=d[a++],i=r.getAttribute(e).split(R),n=/([.?@])?(.*)/.exec(t);o.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?fe:"?"===n[1]?me:"@"===n[1]?ge:ue}),r.removeAttribute(e)}else e.startsWith(R)&&(o.push({type:6,index:s}),r.removeAttribute(e));if(te.test(r.tagName)){const e=r.textContent.split(R),t=e.length-1;if(t>0){r.textContent=L?L.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],j()),ne.nextNode(),o.push({type:2,index:++s});r.append(e[t],j())}}}else if(8===r.nodeType)if(r.data===H)o.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(R,e+1));)o.push({type:7,index:s}),e+=R.length-1}s++}}static createElement(e,t){const i=W.createElement("template");return i.innerHTML=e,i}}function ce(e,t,i=e,r){if(t===re)return t;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const a=V(t)?void 0:t._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),void 0===a?s=void 0:(s=new a(e),s._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(t=ce(e,s._$AS(e,t.values),s,r)),t}class he{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??W).importNode(t,!0);ne.currentNode=r;let s=ne.nextNode(),a=0,n=0,o=i[0];for(;void 0!==o;){if(a===o.index){let t;2===o.type?t=new pe(s,s.nextSibling,this,e):1===o.type?t=new o.ctor(s,o.name,o.strings,this,e):6===o.type&&(t=new ye(s,this,e)),this._$AV.push(t),o=i[++n]}a!==o?.index&&(s=ne.nextNode(),a++)}return ne.currentNode=W,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class pe{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=se,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ce(this,e,t),V(e)?e===se||null==e||""===e?(this._$AH!==se&&this._$AR(),this._$AH=se):e!==this._$AH&&e!==re&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>q(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==se&&V(this._$AH)?this._$AA.nextSibling.data=e:this.T(W.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=de.createElement(oe(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new he(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=ae.get(e.strings);return void 0===t&&ae.set(e.strings,t=new de(e)),t}k(e){q(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new pe(this.O(j()),this.O(j()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ue{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,s){this.type=1,this._$AH=se,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=se}_$AI(e,t=this,i,r){const s=this.strings;let a=!1;if(void 0===s)e=ce(this,e,t,0),a=!V(e)||e!==this._$AH&&e!==re,a&&(this._$AH=e);else{const r=e;let n,o;for(e=s[0],n=0;n<s.length-1;n++)o=ce(this,r[i+n],t,n),o===re&&(o=this._$AH[n]),a||=!V(o)||o!==this._$AH[n],o===se?e=se:e!==se&&(e+=(o??"")+s[n+1]),this._$AH[n]=o}a&&!r&&this.j(e)}j(e){e===se?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class fe extends ue{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===se?void 0:e}}class me extends ue{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==se)}}class ge extends ue{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){if((e=ce(this,e,t,0)??se)===re)return;const i=this._$AH,r=e===se&&i!==se||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==se&&(i===se||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ye{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){ce(this,e)}}const ve=F.litHtmlPolyfillSupport;ve?.(de,pe),(F.litHtmlVersions??=[]).push("3.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let we=class extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let s=r._$litPart$;if(void 0===s){const e=i?.renderBefore??null;r._$litPart$=s=new pe(t.insertBefore(j(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return re}};we._$litElement$=!0,we.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:we});const be=globalThis.litElementPolyfillSupport;be?.({LitElement:we}),(globalThis.litElementVersions??=[]).push("4.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _e=e=>(t,i)=>{void 0!==i?i.addInitializer((()=>{customElements.define(e,t)})):customElements.define(e,t)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,$e={attribute:!0,type:String,converter:P,reflect:!1,hasChanged:M},ke=(e=$e,t,i)=>{const{kind:r,metadata:s}=i;let a=globalThis.litPropertyMetadata.get(s);if(void 0===a&&globalThis.litPropertyMetadata.set(s,a=new Map),a.set(i.name,e),"accessor"===r){const{name:r}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,s,e)},init(t){return void 0!==t&&this.P(r,void 0,e),t}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];t.call(this,i),this.requestUpdate(r,s,e)}}throw Error("Unsupported decorator location: "+r)};function xe(e){return(t,i)=>"object"==typeof i?ke(e,t,i):((e,t,i)=>{const r=t.hasOwnProperty(i);return t.constructor.createProperty(i,r?{...e,wrapped:!0}:e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function Ee(e){return xe({...e,state:!0,attribute:!1})}const Ce="title",Se="weather_device_id",Ae="summary_weather_entity_id",Te="show_current_temp",Ne="current_temp_entity_id",ze="show_feels_like_temp",Ue="feels_like_temp_entity_id",Pe="show_weather_icon",Me="weather_icon_entity_id",Oe="use_ha_weather_icons",De="show_time",Fe="time_entity_id",Le="show_date",Ge="date_entity_id",Ie="show_now_later_temps",Re="now_later_now_temp_entity_id",He="now_later_now_label_entity_id",Be="now_later_later_temp_entity_id",We="now_later_later_label_entity_id",je="show_warning_count",Ve="warning_count_entity_id",qe="hide_warning_count_if_zero",Ze="show_rain_summary",Je="rain_summary_entity_id",Ke="show_forecast_summary",Ye="forecast_summary_entity_id",Xe="show_hourly_forecast",Qe="show_daily_forecast",et={type:"custom:bom-weather-card",index:void 0,view_index:void 0,[Ce]:void 0,[Se]:void 0,[Ae]:void 0,[Te]:!0,[Ne]:void 0,[ze]:!0,[Ue]:void 0,[Pe]:!0,[Me]:void 0,[Oe]:void 0,[De]:void 0,[Fe]:void 0,[Le]:void 0,[Ge]:void 0,[Ie]:!0,[Re]:void 0,[He]:void 0,[Be]:void 0,[We]:void 0,[je]:!0,[Ve]:void 0,[qe]:void 0,[Ze]:!0,[Je]:void 0,[Ke]:!0,[Ye]:void 0,[Xe]:!0,[Qe]:!0},tt={EN:"en",EN_GB:"en_gb"},it=tt.EN,rt=[Ae,Ne,Ue,Me,Fe,Ge,Re,He,Be,We,Ve,Je,Ye],st={[Ae]:{idPattern:{parentDeviceConfigProp:Se,pattern:"weather.%device_name%"}},[Ne]:{attributePattern:{parentCardEntity:Ae,attribute:"temperature"}},[Ue]:{},[Me]:{idPattern:{parentDeviceConfigProp:Se,pattern:"weather.%device_name%"}},[Fe]:{idPattern:{parentDeviceConfigProp:void 0,pattern:"sensor.time"}},[Ge]:{idPattern:{parentDeviceConfigProp:void 0,pattern:"sensor.date"}},[Re]:{idPattern:{parentDeviceConfigProp:Se,pattern:"sensor.%device_name%_now_temp_now"}},[He]:{idPattern:{parentDeviceConfigProp:Se,pattern:"sensor.%device_name%_now_now_label"}},[Be]:{idPattern:{parentDeviceConfigProp:Se,pattern:"sensor.%device_name%_now_temp_later"}},[We]:{idPattern:{parentDeviceConfigProp:Se,pattern:"sensor.%device_name%_now_later_label"}},[Ve]:{idPattern:{parentDeviceConfigProp:Se,pattern:"sensor.%device_name%_warnings"}},[Je]:{idPattern:{parentDeviceConfigProp:Se,pattern:"sensor.%device_name%_rain_amount_range_0"}},[Ye]:{idPattern:{parentDeviceConfigProp:Se,pattern:"sensor.%device_name%_short_text_0"}}};async function at(e){try{return await e.callWS({type:"config/device_registry/list"})}catch(e){return o.error("Error fetching devices",e),[]}}async function nt(e,t){try{return await e.callWS({type:"config/entity_registry/list",domain:t?.domain,area_id:t?.area_id})}catch(e){return o.error("Error fetching entities",e),[]}}const ot=async(e,t)=>{const i={};for(const e of rt)i[e]={entity_id:t[e],attribute:void 0,is_inferred:!1};if(!e)return i;const r=await at(e),s=await nt(e);let a=100,n=!0;for(;n&&a>0;){n=!1,a--;for(const e of rt)if(!i[e].entity_id){const a=st[e];if(a?.idPattern){let o=a.idPattern.pattern;const l=a.idPattern.parentDeviceConfigProp;let d;if(l&&(d=r.find((e=>e.id===t[l])),d&&d.name)){const e=d.name.toLowerCase().replace(" ","_");o=o.replace("%device_name%",e)}s.find((e=>e.entity_id===o))&&(n=!0,i[e]={entity_id:o,attribute:void 0,is_inferred:!0})}else if(a?.attributePattern){const t=i[a.attributePattern.parentCardEntity];t?.entity_id&&(n=!0,i[e]={entity_id:t.entity_id,attribute:a.attributePattern.attribute,is_inferred:!0})}}}return i},lt=(e,t)=>{if(!e||!t?.entity_id)return;const i=e.states[t.entity_id];return i?t.attribute?i.attributes[t.attribute]:i.state:void 0},dt=(e,t)=>{const i=lt(e,t);if(void 0!==i){if("number"==typeof i)return i;if("string"==typeof i)try{return parseFloat(i)}catch{return}}},ct=(e,t)=>{const i=lt(e,t);if(void 0!==i)return"string"==typeof i?i:"number"==typeof i?i.toString():void 0},ht=(e,t,i,r)=>{const s=Array.isArray(i)?i:[i];for(const t of s)if(!e[t])return!1;return!!t[r]?.entity_id};var pt={version:"Version",title:"BOM Weather Card",description:"Display weather information in the style of the BOM (Bureau of Meteorology) Australia app."},ut={feelsLike:"Feels like",rain:"Rain"},ft={currentTemperatureEntity:"Current Temperature Entity",dailyForecast:"Daily Forecast",dateEntity:"Date Entity",feelsLikeTemperatureEntity:"Feels Like Temperature Entity",forecastSummaryEntity:"Forecast Summary Entity",hourlyForecast:"Hourly Forecast",laterLabelEntity:"Later Label Entity",laterTempEntity:"Later Temp Entity",nowLabelEntity:"Now Label Entity",nowTempEntity:"Now Temp Entity",optional:"Optional",rainSummaryEntity:"Rain Summary Entity",required:"Required",showCurrentTemperature:"Show Current Temperature",showDailyForecast:"Show Daily Forecast",showDate:"Show Date",hideWarningCountIfZero:"Hide Warning Count If Zero",showFeelsLikeTemperature:"Show Feels Like Temperature",showForecastSummary:"Show Forecast Summary",showHourlyForecast:"Show Hourly Forecast",showNowLaterTemps:"Show Now/Later Temperatures",showRainSummary:"Show Rain Summary",showTime:"Show Time",showWarningCount:"Show Warning Count",showWeatherIcon:"Show Weather Icon",summary:"Summary",summaryWeatherEntity:"Summary Weather Entity",timeEntity:"Time Entity",title:"Title",useDefaultHaWeatherIcons:"Use Default HA Weather Icons",warningsCountEntity:"Warnings Count Entity",weatherIconEntity:"Weather Icon Entity",weatherDevice:"Weather Device"},mt={invalidConfigProperty:"Invalid config property: {property}",failedToPreLoadElement:" Failed to pre-load HA element: {element}"},gt={common:pt,card:ut,editor:ft,error:mt},yt=Object.freeze({__proto__:null,card:ut,common:pt,default:gt,editor:ft,error:mt});const vt={[tt.EN]:yt,[tt.EN_GB]:yt};function wt(e=it){const t=(e||"").replace(/['"]+/g,"").replace("-","_").toLowerCase();return console.assert(Object.values(tt).includes(t),`Invalid language: ${t}`),function(e,i={}){let r;try{r=e.split(".").reduce(((e,t)=>e[t]),vt[t])}catch(t){r=e.split(".").reduce(((e,t)=>e[t]),vt[it])}void 0===r&&(r=e.split(".").reduce(((e,t)=>e[t]),vt[it]));for(const[e,t]of Object.entries(i))r=r.replace(`{${e}}`,t);return r}}const bt=b`
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
`,_t=b`
  :host {
    /* Bom Weather Card Custom CSS Variables */
    --bwc-large-font-size: 3.5rem;
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
    --bwc-weather-icon-height: 6rem;
    --bwc-min-height: 10rem;
    --bwc-global-padding: 16px;
    --bwc-item-container-height: 5rem;
    --bwc-warning-no-warnings-background-color: #f5f5f5;
    --bwc-warning-has-warnings-background-color: #fdb404;
    --bwc-warning-icon-size: var(--bwc-medium-font-size);
    --bwc-warning-font-size: var(--bwc-regular-font-size);
    --bwc-waring-text-color: var(--text-light-primary-color);

    /* Conditional Colors based on Day/Night and Dark/Light Theme */
    /* Light Theme / Day Mode */
    --bwc-text-color: var(--text-light-primary-color);
    --bwc-text-color-inverted: var(--text-primary-color);
    --bwc-background-color-start: var(--bwc-background-color-day-start);
    --bwc-background-color-end: var(--bwc-background-color-day-end);

    /* Light Theme / Night Mode */
    ha-card.night {
      --bwc-text-color: var(--text-primary-color);
      --bwc-text-color-inverted: var(--text-light-primary-color);
      --bwc-background-color-start: var(--bwc-background-color-night-start);
      --bwc-background-color-end: var(--bwc-background-color-night-end);
    }

    /* Dark Theme / Day Mode */
    ha-card.dark-mode {
      color: var(--text-light-primary-color);

      /* Dark Theme / Night Mode */
      &.night {
        color: var(--text-primary-color);
      }
    }

    /* Home Assistant Theme Overrides */
    --ha-card-header-color: var(--bwc-text-color);
  }
`;b`
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
`;const $t=b``,kt=b`
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

  ${$t}
`;let xt=class extends we{constructor(){super(...arguments),this._config={...et},this._cardEntities={},this._dayMode=!0,this._darkMode=!1,this.language=it,this.localize=wt(this.language),this._initialized=!1}static get styles(){const e=new URL("img/backgrounds/",import.meta.url).toString();return b`
      ${_t}
      ${kt}
      ${bt}
      
      ha-card {
        color: var(--bwc-text-color);

        min-height: var(--bwc-min-height);
        /* TODO: make this configurable */
        background: linear-gradient(
            to bottom,
            var(--bwc-background-color-start),
            var(--bwc-background-color-end)
          ),
          url(${w(`${e}/partially-cloudy.png`)});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        background-blend-mode: overlay;

        /* TODO: make this configurable */
        border: none;
      }

      h1.card-header {
        padding-bottom: 0;
      }

      span.version {
        padding: var(--bwc-global-padding);
      }
    `}static getStubConfig(){return{...et}}setConfig(e){if(!e)throw new Error(this.localize("error.invalidConfigProperty"));this._config={...this._config,...e}}async _calculateCardEntities(){this._cardEntities=await ot(this.hass,this._config),o.debug("Card Entities Recalculated:",this._cardEntities)}_unsubscribeForecastEvents(){this._dailyForecastSubscribed&&(this._dailyForecastSubscribed.then((e=>e())).catch((()=>{})),this._dailyForecastSubscribed=void 0)}async _subscribeForecastEvents(){if(this._unsubscribeForecastEvents(),!(this.isConnected&&this._initialized&&this.hass&&this._config))return;const e=this._cardEntities[Ae]?.entity_id;var t,i,r,s;(o.trace("_subscribeForecastEvents()",{forecastEntityId:e}),e)?this._dailyForecastSubscribed=(t=this.hass,i=e,r="daily",s=e=>{o.debug("Daily Forecast Subscribed.",e),this._dailyForecastEvent=e},t.connection.subscribeMessage(s,{type:"weather/subscribe_forecast",forecast_type:r,entity_id:i})):o.warn("⚠️ No Forecast Entity specified. Skipping subscription to daily forecast.")}firstUpdated(){const e=[this._calculateCardEntities];Promise.all(e.map((e=>e.bind(this)()))).finally((()=>{this._initialized=!0}))}updated(e){var t;super.updated(e),o.trace("updated():",e),this._dailyForecastSubscribed&&!e.has("_config")||this._subscribeForecastEvents(),e.has("_config")&&(o.debug("config changed",this._config),this._calculateCardEntities()),e.has("_dailyForecastEvent")&&o.debug("_dailyForecastEvent changed",this._dailyForecastEvent),e.has("hass")&&(this._dayMode=(t=this.hass,!t?.states["sun.sun"]||"above_horizon"===t.states["sun.sun"].state),this._darkMode=!0===this.hass.themes.darkMode,this.hass.locale?.language!==this.language&&(this.language=this.hass.locale?.language,this.localize=wt(this.language)))}connectedCallback(){o.debug("✅ connected to DOM"),super.connectedCallback(),this.hasUpdated&&this._config&&this.hass&&this._subscribeForecastEvents()}disconnectedCallback(){o.debug("❌ disconnected from DOM"),super.disconnectedCallback(),this._unsubscribeForecastEvents()}_renderSummary(){const e=ht(this._config,this._cardEntities,Te,Ne),t=ht(this._config,this._cardEntities,Pe,Me),i=ht(this._config,this._cardEntities,De,Fe),r=ht(this._config,this._cardEntities,Le,Ge),s=ht(this._config,this._cardEntities,ze,Ue),a=!0===this._config[Ie],n=ht(this._config,this._cardEntities,Ie,Re),o=ht(this._config,this._cardEntities,Ie,Be),l=ht(this._config,this._cardEntities,je,Ve)&&(!this._config[qe]||(dt(this.hass,this._cardEntities[Ve])??0)>0),d=ht(this._config,this._cardEntities,Ze,Je),c=ct(this.hass,this._cardEntities[Je]),h=ht(this._config,this._cardEntities,Ke,Ye);return ie`<div class="summary">
      <!-- First Row (Current temp, weather icon and time/date) -->
      ${e||t||i?ie`<div class="item-container reverse">
            <!-- Current Temperature -->
            ${e?ie`<bwc-temperature-element
                  class="item"
                  .localize=${this.localize}
                  .isLarge=${!0}
                  .value=${dt(this.hass,this._cardEntities[Ne])}
                  .feelsLikeTemperature=${s?dt(this.hass,this._cardEntities[Ue]):void 0}
                ></bwc-temperature-element>`:se}

            <!-- Weather Icon  -->
            ${t?ie`<bwc-weather-icon-element
                  class=${u("item",{center:i,right:!i})}
                  .useHAWeatherIcons=${!0===this._config[Oe]}
                  .weatherIcon=${ct(this.hass,this._cardEntities[Me])}
                ></bwc-weather-icon-element>`:se}

            <!-- Time -->
            ${i?ie`<bwc-time-date-element
                  class="item right"
                  .hass=${this.hass}
                  .showDate=${r}
                  .cardTimeEntity=${this._cardEntities[Fe]}
                  .cardDateEntity=${this._cardEntities[Ge]}
                ></bwc-time-date-element>`:se}
          </div> `:se}

      <!-- Second Row (now/later temps and warnings) -->
      ${a||l?ie`<div class="item-container justify-left">
            ${n?ie`<bwc-temperature-element
                  class="item left no-grow"
                  .decimalPlaces=${0}
                  .value=${dt(this.hass,this._cardEntities[Re])}
                  .label=${ct(this.hass,this._cardEntities[He])}
                ></bwc-temperature-element> `:se}
            ${o?ie`<bwc-temperature-element
                  class="item left no-grow"
                  .decimalPlaces=${0}
                  .value=${dt(this.hass,this._cardEntities[Be])}
                  .label=${ct(this.hass,this._cardEntities[We])}
                ></bwc-temperature-element> `:se}
            ${l?ie`<bwc-warnings-icon-element
                  class="item right"
                  .value=${dt(this.hass,this._cardEntities[Ve])}
                ></bwc-warnings-icon-element> `:se}
          </div> `:se}

      <!-- Third and Fourth Row -->
      <div class="item-container column">
        ${d?ie`<bwc-value-label-element
              class="item"
              .value=${""+(c?`${c}mm`:"No Rain")}
              .label=${c?this.localize("card.rain"):void 0}
            ></bwc-value-label-element> `:se}
        ${h?ie`<bwc-value-label-element
              class="item"
              .value=${ct(this.hass,this._cardEntities[Ye])}
            ></bwc-value-label-element>`:se}
      </div>
    </div> `}render(){return o.trace("🖼️ Rendering card with state:",{hass:this.hass,config:this._config,forecast:this._dailyForecastEvent}),ie`<ha-card
      class="${u({day:this._dayMode,night:!this._dayMode,"dark-mode":this._darkMode,"light-mode":!this._darkMode})}"
    >
      <!-- Card Header -->
      ${this._config.title?ie`<h1 class="card-header">${this._config.title}</h1>`:se}

      <!-- Summary -->
      ${this._renderSummary()}

      <!-- Debug Info -->
      <div class="bwc-debug item-container">
        <span class="version">Version ${l}</span>
      </div>
    </ha-card> `}static async getConfigElement(){return await Promise.resolve().then((function(){return jt})),document.createElement("bom-weather-card-editor")}};d([xe({attribute:!1})],xt.prototype,"hass",void 0),d([Ee()],xt.prototype,"_config",void 0),d([Ee()],xt.prototype,"_cardEntities",void 0),d([Ee()],xt.prototype,"_dayMode",void 0),d([Ee()],xt.prototype,"_darkMode",void 0),d([Ee()],xt.prototype,"_weatherSummaryData",void 0),d([Ee()],xt.prototype,"_dailyForecastSubscribed",void 0),d([Ee()],xt.prototype,"_dailyForecastEvent",void 0),xt=d([_e("bom-weather-card")],xt);const Et=b`
  ${kt}

  :host {
    display: block;
  }
`;let Ct=class extends we{constructor(){super(...arguments),this.isLarge=!1,this.decimalPlaces=1}render(){return ie`<div
      class=${u("temperature-element",{large:this.isLarge})}
    >
      <span class="number"
        >${void 0!==this.value?this.value.toFixed(this.decimalPlaces):"-"}&deg;</span
      >
      ${void 0!==this.feelsLikeTemperature?ie`
            <span class="feels-like"
              >${this.localize("card.feelsLike")}&nbsp;<strong
                >${this.feelsLikeTemperature.toFixed(this.decimalPlaces)}&deg;</strong
              ></span
            >
          `:se}
      ${void 0!==this.label?ie`<span class="label">${this.label}</span>`:se}
    </div>`}static get styles(){return b`
      ${Et}

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
    `}};d([xe({type:Boolean})],Ct.prototype,"isLarge",void 0),d([xe({type:Number})],Ct.prototype,"value",void 0),d([xe({type:Number})],Ct.prototype,"feelsLikeTemperature",void 0),d([xe({type:Number})],Ct.prototype,"decimalPlaces",void 0),d([xe()],Ct.prototype,"label",void 0),d([xe()],Ct.prototype,"localize",void 0),Ct=d([_e("bwc-temperature-element")],Ct);let St=class extends we{constructor(){super(...arguments),this.showDate=!1}_update(){this.hass&&(this._currentTime=ct(this.hass,this.cardTimeEntity),this._currentDate=ct(this.hass,this.cardDateEntity))}connectedCallback(){super.connectedCallback(),this._interval=window.setInterval((()=>{this._update()}),1e3),this._update()}disconnectedCallback(){super.disconnectedCallback(),this._interval&&clearInterval(this._interval)}render(){const e=this.showDate&&this._currentDate;return ie`<div class=${u("time-date-element")}>
      <span class="time">${this._currentTime}</span>
      ${e?ie`<span class="date">${this._currentDate}</span>`:se}
    </div>`}static get styles(){return b`
      ${Et}

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
    `}};d([xe({attribute:!1})],St.prototype,"hass",void 0),d([xe({type:Boolean})],St.prototype,"showDate",void 0),d([xe({type:Object})],St.prototype,"cardTimeEntity",void 0),d([xe({type:Object})],St.prototype,"cardDateEntity",void 0),d([Ee()],St.prototype,"_currentTime",void 0),d([Ee()],St.prototype,"_currentDate",void 0),St=d([_e("bwc-time-date-element")],St);let At=class extends we{render(){return ie`<div class=${u("value-label-element")}>
      ${this.value&&ie`<span class="value">${this.value}</span>`}
      ${this.label&&ie`<span class="label">${this.label}</span>`}
    </div>`}static get styles(){return b`
      ${Et}

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
    `}};d([xe()],At.prototype,"value",void 0),d([xe()],At.prototype,"label",void 0),At=d([_e("bwc-value-label-element")],At);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tt=2;class Nt{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class zt extends Nt{constructor(e){if(super(e),this.it=se,e.type!==Tt)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===se||null==e)return this._t=void 0,this.it=e;if(e===re)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}zt.directiveName="unsafeHTML",zt.resultType=1;const Ut=(e=>(...t)=>({_$litDirective$:e,values:t}))(zt);const Pt='<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M23.64,18.1L14.24,2.28c-.47-.8-1.3-1.28-2.24-1.28s-1.77,.48-2.23,1.28L.36,18.1h0c-.47,.82-.47,1.79,0,2.6s1.31,1.3,2.24,1.3H21.41c.94,0,1.78-.49,2.24-1.3s.46-1.78-.01-2.6Zm-10.64-.1h-2v-2h2v2Zm0-4h-2v-6h2v6Z"/></svg>';let Mt=class extends we{render(){return ie`<div
      class=${u("warnings-icon-element",{"has-warnings":this.value&&this.value>0})}
    >
      <div class="icon-value-wrapper">
        <div class="bwc-icon">${ie`${Ut(Pt)}`}</div>
        <div class="value-wrapper">
          <span class="value">${this.value}</span>
        </div>
      </div>
    </div>`}static get styles(){return b`
      ${Et}

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
    `}};d([xe({type:Number})],Mt.prototype,"value",void 0),Mt=d([_e("bwc-warnings-icon-element")],Mt);const Ot=["weather.","forecast","humidity","temperature","temp","wind","precipitation","rain","snow","storm","cloud","uv","sun","dew","barometer","pressure","visibility","air_quality","weather"];let Dt=class extends we{constructor(){super(...arguments),this.label="Select a Weather Device",this.value="",this.boobs="",this._initialized=!1,this.weatherDevices=[]}firstUpdated(){this._fetchWeatherDevices(),this._initialized=!0}updated(e){e.has("hass")&&this._fetchWeatherDevices()}_handleOpenedChanged(e){e.detail.value&&this._fetchWeatherDevices()}async _fetchWeatherDevices(){if(this.hass)try{this.weatherDevices=await async function(e){let t=[],i=[];const r=new Set;try{t=await at(e),i=await nt(e);const s=i.filter((e=>e.device_id&&e.device_id.length>0&&Ot.some((t=>e.entity_id.includes(t)))));return s.forEach((e=>{e.device_id&&r.add(e.device_id)})),t.filter((e=>r.has(e.id)))}catch(e){throw o.error("Error fetching weather-related devices",e),e}}(this.hass)}catch(e){o.error("Error fetching weather-related devices",e)}}_handleValueChanged(e){this._initialized&&(this.value=e.detail.value,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:this.value},bubbles:!0,composed:!0})))}render(){return ie`
      <ha-combo-box
        class="weather-device-picker-element"
        label=${this.label}
        .items=${this.weatherDevices.map((e=>({value:e.id,label:e.name})))}
        .value=${this.value??""}
        @value-changed=${this._handleValueChanged}
        @opened-changed=${this._handleOpenedChanged}
        allowCustomValue="true"
      >
      </ha-combo-box>
    `}_clearSelection(){this.value="",this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:""},bubbles:!0,composed:!0}))}static get styles(){return b`
      ${Et}
    `}};d([xe({attribute:!1})],Dt.prototype,"hass",void 0),d([xe({type:String})],Dt.prototype,"label",void 0),d([xe({type:String,reflect:!0})],Dt.prototype,"value",void 0),d([xe({type:String,reflect:!0})],Dt.prototype,"boobs",void 0),d([Ee()],Dt.prototype,"weatherDevices",void 0),Dt=d([_e("bwc-weather-device-picker-element")],Dt);var Ft='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="16.5" x2="21.5" y1="19.67" y2="28.33" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient><linearGradient id="b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient></defs><circle cx="19" cy="24" r="5" fill="url(#a)" stroke="#f8af18" stroke-miterlimit="10" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M19 15.67V12.5m0 23v-3.17m5.89-14.22l2.24-2.24M10.87 32.13l2.24-2.24m0-11.78l-2.24-2.24m16.26 16.26l-2.24-2.24M7.5 24h3.17m19.83 0h-3.17"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 19 24; 360 19 24"/></path><path fill="url(#b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/></svg>';const Lt={"clear-night":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="21.92" x2="38.52" y1="18.75" y2="47.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/><animateTransform attributeName="gradientTransform" dur="10s" repeatCount="indefinite" type="rotate" values="5 32 32; -15 32 32; 5 32 32"/></linearGradient></defs><path fill="url(#a)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M46.66 36.2a16.66 16.66 0 01-16.78-16.55 16.29 16.29 0 01.55-4.15A16.56 16.56 0 1048.5 36.1c-.61.06-1.22.1-1.84.1z"><animateTransform attributeName="transform" dur="10s" repeatCount="indefinite" type="rotate" values="-5 32 32; 15 32 32; -5 32 32"/></path></svg>',cloudy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient></defs><path fill="url(#a)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"><animateTransform attributeName="transform" dur="7s" repeatCount="indefinite" type="translate" values="-3 0; 3 0; -3 0"/></path></svg>',exceptional:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="21.97" x2="42.03" y1="14.63" y2="49.37" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/><animateTransform attributeName="gradientTransform" dur="1s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/></linearGradient></defs><path fill="none" stroke="url(#a)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M43 32a11 11 0 11-11-11 11 11 0 0111 11zM25 14.61l-.48 1a33.68 33.68 0 00-3.42 17.82h0M39 49.39l.48-1a33.68 33.68 0 003.42-17.82h0"><animateTransform attributeName="transform" dur="1s" repeatCount="indefinite" type="rotate" values="360 32 32; 0 32 32"/></path></svg>',fog:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="a" x1="27.5" x2="36.5" y1="50.21" y2="65.79" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="c" y1="44.21" y2="59.79" xlink:href="#a"/></defs><path fill="url(#b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><path fill="none" stroke="url(#a)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M17 58h30"><animateTransform attributeName="transform" begin="0s" dur="5s" repeatCount="indefinite" type="translate" values="-4 0; 4 0; -4 0"/></path><path fill="none" stroke="url(#c)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M17 52h30"><animateTransform attributeName="transform" begin="-4s" dur="5s" repeatCount="indefinite" type="translate" values="-4 0; 4 0; -4 0"/></path></svg>',hail:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="a" x1="23.25" x2="24.75" y1="43.7" y2="46.3" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/></linearGradient><linearGradient id="c" x1="30.25" x2="31.75" y1="43.7" y2="46.3" xlink:href="#a"/><linearGradient id="d" x1="37.25" x2="38.75" y1="43.7" y2="46.3" xlink:href="#a"/></defs><path fill="url(#b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><path fill="url(#a)" d="M24 43.5a1.5 1.5 0 101.5 1.5 1.5 1.5 0 00-1.5-1.5z"><animateTransform attributeName="transform" dur="0.6s" repeatCount="indefinite" type="translate" values="1 -5; -2 18; -4 14"/><animate attributeName="opacity" dur="0.6s" repeatCount="indefinite" values="1;1;0"/></path><path fill="url(#c)" d="M31 43.5a1.5 1.5 0 101.5 1.5 1.5 1.5 0 00-1.5-1.5z"><animateTransform attributeName="transform" begin="-0.4s" dur="0.6s" repeatCount="indefinite" type="translate" values="1 -5; -2 18; -4 14"/><animate attributeName="opacity" begin="-0.4s" dur="0.6s" repeatCount="indefinite" values="1;1;0"/></path><path fill="url(#d)" d="M38 43.5a1.5 1.5 0 101.5 1.5 1.5 1.5 0 00-1.5-1.5z"><animateTransform attributeName="transform" begin="-0.2s" dur="0.6s" repeatCount="indefinite" type="translate" values="1 -5; -2 18; -4 14"/><animate attributeName="opacity" begin="-0.2s" dur="0.6s" repeatCount="indefinite" values="1;1;0"/></path></svg>',"lightning-rainy":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="a" x1="22.53" x2="25.47" y1="42.95" y2="48.05" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4286ee"/><stop offset=".45" stop-color="#4286ee"/><stop offset="1" stop-color="#0950bc"/></linearGradient><linearGradient id="c" x1="29.53" x2="32.47" y1="42.95" y2="48.05" xlink:href="#a"/><linearGradient id="d" x1="36.53" x2="39.47" y1="42.95" y2="48.05" xlink:href="#a"/><linearGradient id="e" x1="26.74" x2="35.76" y1="37.88" y2="53.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f7b23b"/><stop offset=".45" stop-color="#f7b23b"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><path fill="url(#b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><path fill="none" stroke="url(#a)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M24.39 43.03l-.78 4.94"><animateTransform attributeName="transform" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#c)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M31.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.4s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.4s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#d)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M38.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.2s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.2s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="url(#e)" stroke="#f6a823" stroke-miterlimit="10" stroke-width=".5" d="M30 36l-4 12h4l-2 10 10-14h-6l4-8h-6z"><animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="1; 1; 1; 1; 1; 1; 0.1; 1; 0.1; 1; 1; 0.1; 1; 0.1; 1"/></path></svg>',lightning:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="b" x1="26.74" x2="35.76" y1="37.88" y2="53.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f7b23b"/><stop offset=".45" stop-color="#f7b23b"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><path fill="url(#a)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><path fill="url(#b)" stroke="#f6a823" stroke-miterlimit="10" stroke-width=".5" d="M30 36l-4 12h4l-2 10 10-14h-6l4-8h-6z"><animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="1; 1; 1; 1; 1; 1; 0.1; 1; 0.1; 1; 1; 0.1; 1; 0.1; 1"/></path></svg>',partlycloudy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="16.5" x2="21.5" y1="19.67" y2="28.33" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient><linearGradient id="b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient></defs><circle cx="19" cy="24" r="5" fill="url(#a)" stroke="#f8af18" stroke-miterlimit="10" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M19 15.67V12.5m0 23v-3.17m5.89-14.22l2.24-2.24M10.87 32.13l2.24-2.24m0-11.78l-2.24-2.24m16.26 16.26l-2.24-2.24M7.5 24h3.17m19.83 0h-3.17"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 19 24; 360 19 24"/></path><path fill="url(#b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/></svg>',"partlycloudy-night":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="13.58" x2="24.15" y1="15.57" y2="33.87" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/><animateTransform attributeName="gradientTransform" dur="10s" repeatCount="indefinite" type="rotate" values="10 19.22 24.293; -10 19.22 24.293; 10 19.22 24.293"/></linearGradient><linearGradient id="b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient></defs><path fill="url(#a)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M29.33 26.68a10.61 10.61 0 01-10.68-10.54A10.5 10.5 0 0119 13.5a10.54 10.54 0 1011.5 13.11 11.48 11.48 0 01-1.17.07z"><animateTransform attributeName="transform" dur="10s" repeatCount="indefinite" type="rotate" values="-10 19.22 24.293; 10 19.22 24.293; -10 19.22 24.293"/></path><path fill="url(#b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/></svg>',"mostly-sunny":Ft,mostly_sunny:Ft,pouring:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="a" x1="22.53" x2="25.47" y1="42.95" y2="48.05" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4286ee"/><stop offset=".45" stop-color="#4286ee"/><stop offset="1" stop-color="#0950bc"/></linearGradient><linearGradient id="c" x1="29.53" x2="32.47" y1="42.95" y2="48.05" xlink:href="#a"/><linearGradient id="d" x1="36.53" x2="39.47" y1="42.95" y2="48.05" xlink:href="#a"/></defs><path fill="url(#b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><path fill="none" stroke="url(#a)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M24.39 43.03l-.78 4.94"><animateTransform attributeName="transform" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#c)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M31.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.4s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.4s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#d)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M38.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.2s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.2s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path></svg>',rainy:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="a" x1="23.31" x2="24.69" y1="44.3" y2="46.7" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4286ee"/><stop offset=".45" stop-color="#4286ee"/><stop offset="1" stop-color="#0950bc"/></linearGradient><linearGradient id="c" x1="30.31" x2="31.69" y1="44.3" y2="46.7" xlink:href="#a"/><linearGradient id="d" x1="37.31" x2="38.69" y1="44.3" y2="46.7" xlink:href="#a"/></defs><path fill="url(#b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><path fill="none" stroke="url(#c)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M24.08 45.01l-.16.98"><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" dur="1.5s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#d)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M31.08 45.01l-.16.98"><animateTransform attributeName="transform" begin="-0.5s" dur="1.5s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.5s" dur="1.5s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#e)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M38.08 45.01l-.16.98"><animateTransform attributeName="transform" begin="-1s" dur="1.5s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-1s" dur="1.5s" repeatCount="indefinite" values="0;1;1;0"/></path></svg>',"snowy-rainy":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="a" x1="30.12" x2="31.88" y1="43.48" y2="46.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/></linearGradient><linearGradient id="c" x1="29.67" x2="32.33" y1="42.69" y2="47.31" xlink:href="#a"/><linearGradient id="d" x1="23.12" x2="24.88" y1="43.48" y2="46.52" xlink:href="#a"/><linearGradient id="e" x1="22.67" x2="25.33" y1="42.69" y2="47.31" xlink:href="#a"/><linearGradient id="f" x1="37.12" x2="38.88" y1="43.48" y2="46.52" xlink:href="#a"/><linearGradient id="g" x1="36.67" x2="39.33" y1="42.69" y2="47.31" xlink:href="#a"/></defs><path fill="url(#b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><g><circle cx="31" cy="45" r="1.25" fill="none" stroke="url(#a)" stroke-miterlimit="10"/><path fill="none" stroke="url(#c)" stroke-linecap="round" stroke-miterlimit="10" d="M33.17 46.25l-1.09-.63m-2.16-1.24l-1.09-.63M31 42.5v1.25m0 3.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63"/><animateTransform additive="sum" attributeName="transform" dur="4s" repeatCount="indefinite" type="translate" values="-1 -6; 1 12"/><animateTransform additive="sum" attributeName="transform" dur="9s" repeatCount="indefinite" type="rotate" values="0 31 45; 360 31 45"/><animate attributeName="opacity" dur="4s" repeatCount="indefinite" values="0;1;1;1;0"/></g><g><circle cx="24" cy="45" r="1.25" fill="none" stroke="url(#d)" stroke-miterlimit="10"/><path fill="none" stroke="url(#e)" stroke-linecap="round" stroke-miterlimit="10" d="M26.17 46.25l-1.09-.63m-2.16-1.24l-1.09-.63M24 42.5v1.25m0 3.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63"/><animateTransform additive="sum" attributeName="transform" begin="-2s" dur="4s" repeatCount="indefinite" type="translate" values="1 -6; -1 12"/><animateTransform additive="sum" attributeName="transform" dur="9s" repeatCount="indefinite" type="rotate" values="0 24 45; 360 24 45"/><animate attributeName="opacity" begin="-2s" dur="4s" repeatCount="indefinite" values="0;1;1;1;0"/></g><g><circle cx="38" cy="45" r="1.25" fill="none" stroke="url(#f)" stroke-miterlimit="10"/><path fill="none" stroke="url(#g)" stroke-linecap="round" stroke-miterlimit="10" d="M40.17 46.25l-1.09-.63m-2.16-1.24l-1.09-.63M38 42.5v1.25m0 3.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63"/><animateTransform additive="sum" attributeName="transform" begin="-1s" dur="4s" repeatCount="indefinite" type="translate" values="1 -6; -1 12"/><animateTransform additive="sum" attributeName="transform" dur="9s" repeatCount="indefinite" type="rotate" values="0 38 45; 360 38 45"/><animate attributeName="opacity" begin="-1s" dur="4s" repeatCount="indefinite" values="0;1;1;1;0"/></g></svg>',snowy:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="a" x1="30.12" x2="31.88" y1="43.48" y2="46.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/></linearGradient><linearGradient id="c" x1="29.67" x2="32.33" y1="42.69" y2="47.31" xlink:href="#a"/><linearGradient id="d" x1="23.12" x2="24.88" y1="43.48" y2="46.52" xlink:href="#a"/><linearGradient id="e" x1="22.67" x2="25.33" y1="42.69" y2="47.31" xlink:href="#a"/><linearGradient id="f" x1="37.12" x2="38.88" y1="43.48" y2="46.52" xlink:href="#a"/><linearGradient id="g" x1="36.67" x2="39.33" y1="42.69" y2="47.31" xlink:href="#a"/></defs><path fill="url(#b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><g><circle cx="31" cy="45" r="1.25" fill="none" stroke="url(#a)" stroke-miterlimit="10"/><path fill="none" stroke="url(#c)" stroke-linecap="round" stroke-miterlimit="10" d="M33.17 46.25l-1.09-.63m-2.16-1.24l-1.09-.63M31 42.5v1.25m0 3.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63"/><animateTransform additive="sum" attributeName="transform" dur="4s" repeatCount="indefinite" type="translate" values="-1 -6; 1 12"/><animateTransform additive="sum" attributeName="transform" dur="9s" repeatCount="indefinite" type="rotate" values="0 31 45; 360 31 45"/><animate attributeName="opacity" dur="4s" repeatCount="indefinite" values="0;1;1;1;0"/></g><g><circle cx="24" cy="45" r="1.25" fill="none" stroke="url(#d)" stroke-miterlimit="10"/><path fill="none" stroke="url(#e)" stroke-linecap="round" stroke-miterlimit="10" d="M26.17 46.25l-1.09-.63m-2.16-1.24l-1.09-.63M24 42.5v1.25m0 3.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63"/><animateTransform additive="sum" attributeName="transform" begin="-2s" dur="4s" repeatCount="indefinite" type="translate" values="1 -6; -1 12"/><animateTransform additive="sum" attributeName="transform" dur="9s" repeatCount="indefinite" type="rotate" values="0 24 45; 360 24 45"/><animate attributeName="opacity" begin="-2s" dur="4s" repeatCount="indefinite" values="0;1;1;1;0"/></g><g><circle cx="38" cy="45" r="1.25" fill="none" stroke="url(#f)" stroke-miterlimit="10"/><path fill="none" stroke="url(#g)" stroke-linecap="round" stroke-miterlimit="10" d="M40.17 46.25l-1.09-.63m-2.16-1.24l-1.09-.63M38 42.5v1.25m0 3.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63"/><animateTransform additive="sum" attributeName="transform" begin="-1s" dur="4s" repeatCount="indefinite" type="translate" values="1 -6; -1 12"/><animateTransform additive="sum" attributeName="transform" dur="9s" repeatCount="indefinite" type="rotate" values="0 38 45; 360 38 45"/><animate attributeName="opacity" begin="-1s" dur="4s" repeatCount="indefinite" values="0;1;1;1;0"/></g></svg>',sunny:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="26.75" x2="37.25" y1="22.91" y2="41.09" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><circle cx="32" cy="32" r="10.5" fill="url(#a)" stroke="#f8af18" stroke-miterlimit="10" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 15.71V9.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 47.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 32H9.5m45 0h-6.21"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/></path></svg>',"windy-variant":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="27.56" x2="38.27" y1="17.64" y2="36.19" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="b" x1="19.96" x2="31.37" y1="29.03" y2="48.8" xlink:href="#a"/></defs><path fill="none" stroke="url(#a)" stroke-dasharray="35 22" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M43.64 20a5 5 0 113.61 8.46h-35.5"><animate attributeName="stroke-dashoffset" dur="2s" repeatCount="indefinite" values="-57; 57"/></path><path fill="none" stroke="url(#b)" stroke-dasharray="24 15" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M29.14 44a5 5 0 103.61-8.46h-21"><animate attributeName="stroke-dashoffset" begin="-1.5s" dur="2s" repeatCount="indefinite" values="-39; 39"/></path></svg>',windy:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="27.56" x2="38.27" y1="17.64" y2="36.19" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="b" x1="19.96" x2="31.37" y1="29.03" y2="48.8" xlink:href="#a"/></defs><path fill="none" stroke="url(#a)" stroke-dasharray="35 22" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M43.64 20a5 5 0 113.61 8.46h-35.5"><animate attributeName="stroke-dashoffset" dur="2s" repeatCount="indefinite" values="-57; 57"/></path><path fill="none" stroke="url(#b)" stroke-dasharray="24 15" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M29.14 44a5 5 0 103.61-8.46h-21"><animate attributeName="stroke-dashoffset" begin="-1.5s" dur="2s" repeatCount="indefinite" values="-39; 39"/></path></svg>'};let Gt=class extends we{constructor(){super(...arguments),this.useHAWeatherIcons=!1}render(){return this.weatherIcon?ie`<div class=${u("weather-icon-element")}>
      ${this.useHAWeatherIcons?ie`<ha-icon icon="mdi:weather-${this.weatherIcon}"></ha-icon>`:ie`${Ut(Lt[this.weatherIcon])}`}
    </div>`:se}static get styles(){return b`
      ${Et}

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
    `}};d([xe({type:String})],Gt.prototype,"weatherIcon",void 0),d([xe({type:Boolean})],Gt.prototype,"useHAWeatherIcons",void 0),Gt=d([_e("bwc-weather-icon-element")],Gt);const It=wt();o.setLevel("warn"),window.bomWeatherCardLog=o,console.info(`%c  BOM-WEATHER-CARD \n%c  ${It("common.version")} ${l}    `,"color: fuchsia; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"bom-weather-card",name:It("common.title"),description:It("common.description"),documentationURL:"https://github.com/dJPoida/ha-bom-weather-card",preview:!0});const Rt=Object.freeze({ALERT:"alert",ASSIST_SATELLITE:"assist_satellite",AUTOMATION:"automation",BINARY_SENSOR:"binary_sensor",BUTTON:"button",CALENDAR:"calendar",CAMERA:"camera",CLIMATE:"climate",CONFIGURATOR:"configurator",CONVERSATION:"conversation",COVER:"cover",DATE:"date",DATETIME:"datetime",DEVICE_TRACKER:"device_tracker",EVENT:"event",FAN:"fan",GROUP:"group",HUMIDIFIER:"humidifier",IMAGE:"image",INPUT_BOOLEAN:"input_boolean",INPUT_BUTTON:"input_button",INPUT_DATETIME:"input_datetime",INPUT_NUMBER:"input_number",INPUT_SELECT:"input_select",INPUT_TEXT:"input_text",LAWN_MOWER:"lawn_mower",LIGHT:"light",LOCK:"lock",MEDIA_PLAYER:"media_player",NUMBER:"number",SCENE:"scene",SCRIPT:"script",SELECT:"select",SENSOR:"sensor",STT:"stt",SWITCH:"switch",TEXT:"text",TIME:"time",TIMER:"timer",TTS:"tts",UPDATE:"update",VACUUM:"vacuum",VALVE:"valve",WATER_HEATER:"water_heater",WEATHER:"weather"});Rt.WEATHER,Rt.SENSOR;const Ht={[Ne]:Te,[ze]:Te,[Ue]:ze,[Me]:Pe,[Oe]:Pe,[Fe]:De,[Le]:Ge,[Ge]:Le,[Re]:Ie,[He]:Ie,[Be]:Ie,[We]:Ie,[Ve]:je,[qe]:je,[Je]:Ze,[Ye]:Ke},Bt=e=>({entityId:e?.entity_id,attribute:e?.is_inferred?e?.attribute:void 0,displayName:e?.is_inferred?`💡${e?.entity_id??""}${e?.attribute?`[${e?.attribute}]`:""}`:"",isInferred:e?.is_inferred??!1});let Wt=class extends we{constructor(){super(...arguments),this._config={...et},this._cardEntities={},this.language=it,this.localize=wt(this.language),this._initialized=!1}static get styles(){return b`
      ${_t}

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

      .level-one {
        margin-left: calc(var(--bwc-global-padding) * 2);
        width: calc(100% - var(--bwc-global-padding) * 2);
      }
    `}firstUpdated(){this._calculateCardEntities(),(async e=>{if(!window.customElements.get("ha-entity-picker")){const t=await window.loadCardHelpers(),i=await t.createCardElement({type:"entities",entities:[]});if(await i.constructor.getConfigElement(),!window.customElements.get("ha-entity-picker"))throw new Error(e("error.failedToPreLoadElement",{element:"ha-entity-picker"}))}})(this.localize)}updated(e){e.has("hass")&&this.hass.locale?.language!==this.language&&(this.language=this.hass.locale?.language,this.localize=wt(this.language)),e.has("_config")&&this._calculateCardEntities()}setConfig(e){let t={...e};this._initialized||(t={...this._config,...t},this._initialized=!0),t=(e=>{const t={...e};for(const[e,i]of Object.entries(Ht))t[i]||delete t[e];return t})(t),this._config=t}async _calculateCardEntities(){this._cardEntities=await ot(this.hass,this._config),o.debug("🔧 Card Entities Recalculated:",this._cardEntities)}_handleFieldChange(e){const t=e.target;e.stopPropagation();const i=t.id;if(!(i in et))throw new Error(this.localize("error.invalidConfigProperty",{property:i}));const r="ha-switch"===(t.tagName??"").toLowerCase()?t.checked:t.value;if(o.debug("🔧 Field Value Changed:",{targetId:i,newValue:r}),r===this._config[i])return;const s={...this._config};""===r||void 0===r?delete s[i]:s[i]=r;const a=new CustomEvent("config-changed",{detail:{config:s},bubbles:!0,composed:!0});this.dispatchEvent(a)}renderWeatherDevicePicker(e,t,i=!1,r=void 0){return ie`
      <bwc-weather-device-picker-element
        id="${e}"
        .hass=${this.hass}
        class=${u("item",r)}
        .label="${t} (${i?this.localize("editor.required"):this.localize("editor.optional")})"
        .value=${"string"==typeof this._config[e]?this._config[e]:""}
        @value-changed=${this._handleFieldChange}
      ></bwc-weather-device-picker-element>
    `}renderEntityPicker(e,t,i=[],r=!1,s=void 0,a=void 0){return ie`
      <ha-entity-picker
        id="${e}"
        .hass=${this.hass}
        class=${u("item",a)}
        .label="${t} (${r?this.localize("editor.required"):this.localize("editor.optional")})"
        .value=${this._config[e]??""}
        @value-changed=${this._handleFieldChange}
        allow-custom-entity
        include-domains=${n=i,n.map((e=>`"${e}"`)).join(", ")}
        .required=${r}
        .helper=${s}
      >
      </ha-entity-picker>
    `;var n}renderTextField(e,t,i=!1,r=void 0){return ie`
      <ha-textfield
        id=${e}
        type="string"
        class=${u("item",r)}
        .value=${this._config[e]??""}
        .label="${t} (${i?this.localize("editor.required"):this.localize("editor.optional")})"
        name=${e}
        @change=${this._handleFieldChange}
        no-spinner
        .required=${i}
      >
      </ha-textfield>
    `}renderBooleanField(e,t,i=void 0){return ie`
      <ha-formfield .label=${t} class=${u("item",i)}>
        <ha-switch
          id=${e}
          .checked=${this._config[e]??!1}
          @change=${this._handleFieldChange}
        ></ha-switch>
      </ha-formfield>
    `}renderSummaryOptionsPanel(){return ie`<ha-expansion-panel
      .outlined=${!0}
      header="${this.localize("editor.summary")}"
    >
      <div class="item-group">
        <!-- Show Current Temperature -->
        ${this.renderBooleanField(Te,this.localize("editor.showCurrentTemperature"))}
        ${this._config[Te]?ie`<div class="item-group level-one">
              <!-- Current Temp Entity -->
              ${this.renderEntityPicker(Ne,this.localize("editor.currentTemperatureEntity"),[],!1,Bt(this._cardEntities[Ne]).displayName)}

              <!-- Show Feels Like Temperature -->
              ${this._config[Te]?this.renderBooleanField(ze,this.localize("editor.showFeelsLikeTemperature")):se}

              <!-- Feels Like Temp Entity -->
              ${this._config[Te]&&this._config[ze]?this.renderEntityPicker(Ue,this.localize("editor.feelsLikeTemperatureEntity"),[],!1,this._cardEntities[Ue]?.is_inferred?this._cardEntities[Ue].entity_id:void 0):se}
            </div> `:se}

        <!-- Weather Icon -->
        ${this.renderBooleanField(Pe,this.localize("editor.showWeatherIcon"))}

        <!-- Weather Icon Entity -->
        ${this._config[Pe]?ie`<div class="item-group level-one">
              ${this.renderEntityPicker(Me,this.localize("editor.weatherIconEntity"),[],!1,Bt(this._cardEntities[Me]).displayName)}

              <!-- Use Default Weather Icons -->
              ${this.renderBooleanField(Oe,this.localize("editor.useDefaultHaWeatherIcons"))}
            </div>`:se}

        <!-- Show Time -->
        ${this.renderBooleanField(De,this.localize("editor.showTime"))}

        <!-- Time Entity -->
        ${this._config[De]?ie`<div class="item-group level-one">
              ${this.renderEntityPicker(Fe,this.localize("editor.timeEntity"),[],!1,Bt(this._cardEntities[Fe]).displayName)}

              <!-- Show Date -->
              ${this.renderBooleanField(Le,this.localize("editor.showDate"))}

              <!-- Date Entity -->
              ${this._config[Le]?this.renderEntityPicker(Ge,this.localize("editor.dateEntity"),[],!1,Bt(this._cardEntities[Ge]).displayName):se}
            </div>`:se}

        <!-- Show Now / Later Temps -->
        ${this.renderBooleanField(Ie,this.localize("editor.showNowLaterTemps"))}
        ${this._config[Ie]?ie`<div class="item-group level-one">
              <!-- Now Temp Entity -->
              ${this._config[Ie]?this.renderEntityPicker(Re,this.localize("editor.nowTempEntity"),[],!1,Bt(this._cardEntities[Re]).displayName):se}

              <!-- Now Label Entity -->
              ${this._config[Ie]?this.renderEntityPicker(He,this.localize("editor.nowLabelEntity"),[],!1,Bt(this._cardEntities[He]).displayName):se}

              <!-- Later Temp Entity -->
              ${this._config[Ie]?this.renderEntityPicker(Be,this.localize("editor.laterTempEntity"),[],!1,Bt(this._cardEntities[Be]).displayName):se}

              <!-- Later Label Entity -->
              ${this._config[Ie]?this.renderEntityPicker(We,this.localize("editor.laterLabelEntity"),[],!1,Bt(this._cardEntities[We]).displayName):se}
            </div>`:se}

        <!-- Show Warnings Count -->
        ${this.renderBooleanField(je,this.localize("editor.showWarningCount"))}
        ${this._config[je]?ie`<div class="item-group level-one">
              <!-- Warnings Count Entity -->
              ${this.renderEntityPicker(Ve,this.localize("editor.warningsCountEntity"))}
              ${this.renderBooleanField(qe,this.localize("editor.hideWarningCountIfZero"))}
            </div>`:se}

        <!-- Show Rain Summary -->
        ${this.renderBooleanField(Ze,this.localize("editor.showRainSummary"))}

        <!-- Rain Summary Entity -->
        ${this._config[Ze]?ie`<div class="item-group level-one">
              ${this.renderEntityPicker(Je,this.localize("editor.rainSummaryEntity"))}
            </div>`:se}

        <!-- Show Forecast Summary -->
        ${this.renderBooleanField(Ke,this.localize("editor.showForecastSummary"))}

        <!-- Forecast Summary Entity -->
        ${this._config[Ke]?ie`<div class="item-group level-one">
              ${this.renderEntityPicker(Ye,this.localize("editor.forecastSummaryEntity"))}
            </div>`:se}
      </div>
    </ha-expansion-panel>`}renderHourlyForecastOptionsPanel(){return ie`<ha-expansion-panel
      .outlined=${!0}
      header="${this.localize("editor.hourlyForecast")}"
    >
      <!-- Show Hourly Forecast -->
      ${this.renderBooleanField(Xe,this.localize("editor.showHourlyForecast"))}
    </ha-expansion-panel>`}renderDailyForecastOptionsPanel(){return ie`<ha-expansion-panel
      .outlined=${!0}
      header="${this.localize("editor.dailyForecast")}"
    >
      <!-- Show Daily Forecast -->
      ${this.renderBooleanField(Qe,this.localize("editor.showDailyForecast"))}
    </ha-expansion-panel>`}render(){if(!this._config||!this._initialized)return ie``;const e=Bt(this._cardEntities[Ae]);return ie`<div class="card-config">
      <div class="item-group">
        <!-- Title -->
        ${this.renderTextField(Ce,this.localize("editor.title"))}

        <!-- Weather Device -->
        ${this.renderWeatherDevicePicker(Se,this.localize("editor.weatherDevice"),!0)}

        <!-- Forecast Entity ID -->
        ${this.renderEntityPicker(Ae,this.localize("editor.summaryWeatherEntity"),[Rt.WEATHER],!1,e.displayName)}
      </div>

      <!-- Summary Options Panel -->
      ${this.renderSummaryOptionsPanel()}

      <!-- Hourly Forecast Options Panel -->
      ${this.renderHourlyForecastOptionsPanel()}

      <!-- Daily Forecast Options Panel -->
      ${this.renderDailyForecastOptionsPanel()}
    </div> `}};d([xe({attribute:!1})],Wt.prototype,"hass",void 0),d([Ee()],Wt.prototype,"_config",void 0),d([Ee()],Wt.prototype,"_cardEntities",void 0),Wt=d([_e("bom-weather-card-editor")],Wt);var jt=Object.freeze({__proto__:null,get BomWeatherCardEditor(){return Wt}});
//# sourceMappingURL=bom-weather-card.js.map
