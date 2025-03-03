function e(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var t,s={exports:{}};var i,a,c,l=(t||(t=1,a=s.exports,c=function(){var e=function(){},t="undefined",s=typeof window!==t&&typeof window.navigator!==t&&/Trident\/|MSIE /.test(window.navigator.userAgent),i=["trace","debug","info","warn","error"],a={},c=null;function l(e,t){var s=e[t];if("function"==typeof s.bind)return s.bind(e);try{return Function.prototype.bind.call(s,e)}catch(t){return function(){return Function.prototype.apply.apply(s,[e,arguments])}}}function r(){console.log&&(console.log.apply?console.log.apply(console,arguments):Function.prototype.apply.apply(console.log,[console,arguments])),console.trace&&console.trace()}function n(){for(var s=this.getLevel(),a=0;a<i.length;a++){var c=i[a];this[c]=a<s?e:this.methodFactory(c,s,this.name)}if(this.log=this.debug,typeof console===t&&s<this.levels.SILENT)return"No console available for logging"}function o(e){return function(){typeof console!==t&&(n.call(this),this[e].apply(this,arguments))}}function d(i,a,c){return function(i){return"debug"===i&&(i="log"),typeof console!==t&&("trace"===i&&s?r:void 0!==console[i]?l(console,i):void 0!==console.log?l(console,"log"):e)}(i)||o.apply(this,arguments)}function h(e,s){var l,r,o,h=this,p="loglevel";function g(){var e;if(typeof window!==t&&p){try{e=window.localStorage[p]}catch(e){}if(typeof e===t)try{var s=window.document.cookie,i=encodeURIComponent(p),a=s.indexOf(i+"=");-1!==a&&(e=/^([^;]+)/.exec(s.slice(a+i.length+1))[1])}catch(e){}return void 0===h.levels[e]&&(e=void 0),e}}function u(e){var t=e;if("string"==typeof t&&void 0!==h.levels[t.toUpperCase()]&&(t=h.levels[t.toUpperCase()]),"number"==typeof t&&t>=0&&t<=h.levels.SILENT)return t;throw new TypeError("log.setLevel() called with invalid level: "+e)}"string"==typeof e?p+=":"+e:"symbol"==typeof e&&(p=void 0),h.name=e,h.levels={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,SILENT:5},h.methodFactory=s||d,h.getLevel=function(){return null!=o?o:null!=r?r:l},h.setLevel=function(e,s){return o=u(e),!1!==s&&function(e){var s=(i[e]||"silent").toUpperCase();if(typeof window!==t&&p){try{return void(window.localStorage[p]=s)}catch(e){}try{window.document.cookie=encodeURIComponent(p)+"="+s+";"}catch(e){}}}(o),n.call(h)},h.setDefaultLevel=function(e){r=u(e),g()||h.setLevel(e,!1)},h.resetLevel=function(){o=null,function(){if(typeof window!==t&&p){try{window.localStorage.removeItem(p)}catch(e){}try{window.document.cookie=encodeURIComponent(p)+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC"}catch(e){}}}(),n.call(h)},h.enableAll=function(e){h.setLevel(h.levels.TRACE,e)},h.disableAll=function(e){h.setLevel(h.levels.SILENT,e)},h.rebuild=function(){if(c!==h&&(l=u(c.getLevel())),n.call(h),c===h)for(var e in a)a[e].rebuild()},l=u(c?c.getLevel():"WARN");var f=g();null!=f&&(o=u(f)),n.call(h)}(c=new h).getLogger=function(e){if("symbol"!=typeof e&&"string"!=typeof e||""===e)throw new TypeError("You must supply a name when creating a logger.");var t=a[e];return t||(t=a[e]=new h(e,c.methodFactory)),t};var p=typeof window!==t?window.log:void 0;return c.noConflict=function(){return typeof window!==t&&window.log===c&&(window.log=p),c},c.getLoggers=function(){return a},c.default=c,c},(i=s).exports?i.exports=c():a.log=c()),s.exports),r=e(l),n="0.0.1533";function o(e,t,s,i){for(var a,c=arguments.length,l=c<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i,r=e.length-1;r>=0;r--)(a=e[r])&&(l=(c<3?a(l):c>3?a(t,s,l):a(t,s))||l);return c>3&&l&&Object.defineProperty(t,s,l),l}"function"==typeof SuppressedError&&SuppressedError;var d,h={exports:{}};
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/var p=(d||(d=1,function(e){!function(){var t={}.hasOwnProperty;function s(){for(var e="",t=0;t<arguments.length;t++){var s=arguments[t];s&&(e=a(e,i(s)))}return e}function i(e){if("string"==typeof e||"number"==typeof e)return e;if("object"!=typeof e)return"";if(Array.isArray(e))return s.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var i="";for(var c in e)t.call(e,c)&&e[c]&&(i=a(i,c));return i}function a(e,t){return t?e?e+" "+t:e+t:e}e.exports?(s.default=s,e.exports=s):window.classNames=s}()}(h)),h.exports),g=e(p);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u=globalThis,f=u.ShadowRoot&&(void 0===u.ShadyCSS||u.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,y=Symbol(),v=new WeakMap;let w=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==y)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(f&&void 0===e){const s=void 0!==t&&1===t.length;s&&(e=v.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&v.set(t,e))}return e}toString(){return this.cssText}};const m=e=>new w("string"==typeof e?e:e+"",void 0,y),b=(e,...t)=>{const s=1===e.length?e[0]:t.reduce(((t,s,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[i+1]),e[0]);return new w(s,e,y)},_=f?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return m(t)})(e):e
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:$,defineProperty:A,getOwnPropertyDescriptor:E,getOwnPropertyNames:x,getOwnPropertySymbols:M,getPrototypeOf:C}=Object,S=globalThis,H=S.trustedTypes,T=H?H.emptyScript:"",Z=S.reactiveElementPolyfillSupport,z=(e,t)=>e,k={toAttribute(e,t){switch(t){case Boolean:e=e?T:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},O=(e,t)=>!$(e,t),F={attribute:!0,type:String,converter:k,reflect:!1,hasChanged:O};Symbol.metadata??=Symbol("metadata"),S.litPropertyMetadata??=new WeakMap;class P extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=F){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);void 0!==i&&A(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:a}=E(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get(){return i?.call(this)},set(t){const c=i?.call(this);a.call(this,t),this.requestUpdate(e,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??F}static _$Ei(){if(this.hasOwnProperty(z("elementProperties")))return;const e=C(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(z("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(z("properties"))){const e=this.properties,t=[...x(e),...M(e)];for(const s of t)this.createProperty(s,e[s])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const s=this._$Eu(e,t);void 0!==s&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(_(e))}else void 0!==e&&t.push(_(e));return t}static _$Eu(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(f)e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const s of t){const t=document.createElement("style"),i=u.litNonce;void 0!==i&&t.setAttribute("nonce",i),t.textContent=s.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$EC(e,t){const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(void 0!==i&&!0===s.reflect){const a=(void 0!==s.converter?.toAttribute?s.converter:k).toAttribute(t,s.type);this._$Em=e,null==a?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(e,t){const s=this.constructor,i=s._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=s.getPropertyOptions(i),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:k;this._$Em=i,this[i]=a.fromAttribute(t,e.type),this._$Em=null}}requestUpdate(e,t,s){if(void 0!==e){if(s??=this.constructor.getPropertyOptions(e),!(s.hasChanged??O)(this[e],t))return;this.P(e,t,s)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(e,t,s){this._$AL.has(e)||this._$AL.set(e,t),!0===s.reflect&&this._$Em!==e&&(this._$Ej??=new Set).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,s]of e)!0!==s.wrapped||this._$AL.has(t)||void 0===this[t]||this.P(t,this[t],s)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((e=>e.hostUpdate?.())),this.update(t)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&=this._$Ej.forEach((e=>this._$EC(e,this[e]))),this._$EU()}updated(e){}firstUpdated(e){}}P.elementStyles=[],P.shadowRootOptions={mode:"open"},P[z("elementProperties")]=new Map,P[z("finalized")]=new Map,Z?.({ReactiveElement:P}),(S.reactiveElementVersions??=[]).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I=globalThis,D=I.trustedTypes,L=D?D.createPolicy("lit-html",{createHTML:e=>e}):void 0,N="$lit$",V=`lit$${Math.random().toFixed(9).slice(2)}$`,R="?"+V,U=`<${R}>`,B=document,W=()=>B.createComment(""),j=e=>null===e||"object"!=typeof e&&"function"!=typeof e,q=Array.isArray,G="[ \t\n\f\r]",J=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,K=/-->/g,Y=/>/g,X=RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Q=/'/g,ee=/"/g,te=/^(?:script|style|textarea|title)$/i,se=(e=>(t,...s)=>({_$litType$:e,strings:t,values:s}))(1),ie=Symbol.for("lit-noChange"),ae=Symbol.for("lit-nothing"),ce=new WeakMap,le=B.createTreeWalker(B,129);function re(e,t){if(!q(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==L?L.createHTML(t):t}const ne=(e,t)=>{const s=e.length-1,i=[];let a,c=2===t?"<svg>":3===t?"<math>":"",l=J;for(let t=0;t<s;t++){const s=e[t];let r,n,o=-1,d=0;for(;d<s.length&&(l.lastIndex=d,n=l.exec(s),null!==n);)d=l.lastIndex,l===J?"!--"===n[1]?l=K:void 0!==n[1]?l=Y:void 0!==n[2]?(te.test(n[2])&&(a=RegExp("</"+n[2],"g")),l=X):void 0!==n[3]&&(l=X):l===X?">"===n[0]?(l=a??J,o=-1):void 0===n[1]?o=-2:(o=l.lastIndex-n[2].length,r=n[1],l=void 0===n[3]?X:'"'===n[3]?ee:Q):l===ee||l===Q?l=X:l===K||l===Y?l=J:(l=X,a=void 0);const h=l===X&&e[t+1].startsWith("/>")?" ":"";c+=l===J?s+U:o>=0?(i.push(r),s.slice(0,o)+N+s.slice(o)+V+h):s+V+(-2===o?t:h)}return[re(e,c+(e[s]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class oe{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let a=0,c=0;const l=e.length-1,r=this.parts,[n,o]=ne(e,t);if(this.el=oe.createElement(n,s),le.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=le.nextNode())&&r.length<l;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(N)){const t=o[c++],s=i.getAttribute(e).split(V),l=/([.?@])?(.*)/.exec(t);r.push({type:1,index:a,name:l[2],strings:s,ctor:"."===l[1]?ue:"?"===l[1]?fe:"@"===l[1]?ye:ge}),i.removeAttribute(e)}else e.startsWith(V)&&(r.push({type:6,index:a}),i.removeAttribute(e));if(te.test(i.tagName)){const e=i.textContent.split(V),t=e.length-1;if(t>0){i.textContent=D?D.emptyScript:"";for(let s=0;s<t;s++)i.append(e[s],W()),le.nextNode(),r.push({type:2,index:++a});i.append(e[t],W())}}}else if(8===i.nodeType)if(i.data===R)r.push({type:2,index:a});else{let e=-1;for(;-1!==(e=i.data.indexOf(V,e+1));)r.push({type:7,index:a}),e+=V.length-1}a++}}static createElement(e,t){const s=B.createElement("template");return s.innerHTML=e,s}}function de(e,t,s=e,i){if(t===ie)return t;let a=void 0!==i?s._$Co?.[i]:s._$Cl;const c=j(t)?void 0:t._$litDirective$;return a?.constructor!==c&&(a?._$AO?.(!1),void 0===c?a=void 0:(a=new c(e),a._$AT(e,s,i)),void 0!==i?(s._$Co??=[])[i]=a:s._$Cl=a),void 0!==a&&(t=de(e,a._$AS(e,t.values),a,i)),t}class he{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??B).importNode(t,!0);le.currentNode=i;let a=le.nextNode(),c=0,l=0,r=s[0];for(;void 0!==r;){if(c===r.index){let t;2===r.type?t=new pe(a,a.nextSibling,this,e):1===r.type?t=new r.ctor(a,r.name,r.strings,this,e):6===r.type&&(t=new ve(a,this,e)),this._$AV.push(t),r=s[++l]}c!==r?.index&&(a=le.nextNode(),c++)}return le.currentNode=B,i}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class pe{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=ae,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=de(this,e,t),j(e)?e===ae||null==e||""===e?(this._$AH!==ae&&this._$AR(),this._$AH=ae):e!==this._$AH&&e!==ie&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>q(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ae&&j(this._$AH)?this._$AA.nextSibling.data=e:this.T(B.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=oe.createElement(re(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new he(i,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=ce.get(e.strings);return void 0===t&&ce.set(e.strings,t=new oe(e)),t}k(e){q(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const a of e)i===t.length?t.push(s=new pe(this.O(W()),this.O(W()),this,this.options)):s=t[i],s._$AI(a),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ge{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,a){this.type=1,this._$AH=ae,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=a,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=ae}_$AI(e,t=this,s,i){const a=this.strings;let c=!1;if(void 0===a)e=de(this,e,t,0),c=!j(e)||e!==this._$AH&&e!==ie,c&&(this._$AH=e);else{const i=e;let l,r;for(e=a[0],l=0;l<a.length-1;l++)r=de(this,i[s+l],t,l),r===ie&&(r=this._$AH[l]),c||=!j(r)||r!==this._$AH[l],r===ae?e=ae:e!==ae&&(e+=(r??"")+a[l+1]),this._$AH[l]=r}c&&!i&&this.j(e)}j(e){e===ae?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ue extends ge{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ae?void 0:e}}class fe extends ge{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ae)}}class ye extends ge{constructor(e,t,s,i,a){super(e,t,s,i,a),this.type=5}_$AI(e,t=this){if((e=de(this,e,t,0)??ae)===ie)return;const s=this._$AH,i=e===ae&&s!==ae||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,a=e!==ae&&(s===ae||i);i&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ve{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){de(this,e)}}const we=I.litHtmlPolyfillSupport;we?.(oe,pe),(I.litHtmlVersions??=[]).push("3.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let me=class extends P{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,s)=>{const i=s?.renderBefore??t;let a=i._$litPart$;if(void 0===a){const e=s?.renderBefore??null;i._$litPart$=a=new pe(t.insertBefore(W(),e),e,void 0,s??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ie}};me._$litElement$=!0,me.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:me});const be=globalThis.litElementPolyfillSupport;be?.({LitElement:me}),(globalThis.litElementVersions??=[]).push("4.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _e=e=>(t,s)=>{void 0!==s?s.addInitializer((()=>{customElements.define(e,t)})):customElements.define(e,t)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,$e={attribute:!0,type:String,converter:k,reflect:!1,hasChanged:O},Ae=(e=$e,t,s)=>{const{kind:i,metadata:a}=s;let c=globalThis.litPropertyMetadata.get(a);if(void 0===c&&globalThis.litPropertyMetadata.set(a,c=new Map),c.set(s.name,e),"accessor"===i){const{name:i}=s;return{set(s){const a=t.get.call(this);t.set.call(this,s),this.requestUpdate(i,a,e)},init(t){return void 0!==t&&this.P(i,void 0,e),t}}}if("setter"===i){const{name:i}=s;return function(s){const a=this[i];t.call(this,s),this.requestUpdate(i,a,e)}}throw Error("Unsupported decorator location: "+i)};function Ee(e){return(t,s)=>"object"==typeof s?Ae(e,t,s):((e,t,s)=>{const i=t.hasOwnProperty(s);return t.constructor.createProperty(s,i?{...e,wrapped:!0}:e),i?Object.getOwnPropertyDescriptor(t,s):void 0})(e,t,s)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function xe(e){return Ee({...e,state:!0,attribute:!1})}const Me="title",Ce="weather_device_id",Se="summary_weather_entity_id",He="show_current_temp",Te="current_temp_entity_id",Ze="show_feels_like_temp",ze="feels_like_temp_entity_id",ke="show_weather_icon",Oe="weather_icon_entity_id",Fe="use_ha_weather_icons",Pe="show_time",Ie="time_entity_id",De="show_date",Le="date_entity_id",Ne="show_now_later_temps",Ve="now_later_now_temp_entity_id",Re="now_later_now_label_entity_id",Ue="now_later_later_temp_entity_id",Be="now_later_later_label_entity_id",We="show_warning_count",je="warning_count_entity_id",qe="hide_warning_count_if_zero",Ge="show_rain_summary",Je="rain_summary_entity_id",Ke="show_forecast_summary",Ye="forecast_summary_entity_id",Xe="show_hourly_forecast",Qe="show_daily_forecast",et="daily_forecast_number_of_days",tt={type:"custom:bom-weather-card",index:void 0,view_index:void 0,[Me]:void 0,[Ce]:void 0,[Se]:void 0,[He]:!0,[Te]:void 0,[Ze]:!0,[ze]:void 0,[ke]:!0,[Oe]:void 0,[Fe]:void 0,[Pe]:void 0,[Ie]:void 0,[De]:void 0,[Le]:void 0,[Ne]:!0,[Ve]:void 0,[Re]:void 0,[Ue]:void 0,[Be]:void 0,[We]:!0,[je]:void 0,[qe]:void 0,[Ge]:!0,[Je]:void 0,[Ke]:!0,[Ye]:void 0,[Xe]:!0,[Qe]:!0,[et]:7},st={EN:"en",EN_GB:"en_gb"},it=st.EN,at="clear-night",ct="cloudy",lt="exceptional",rt="fog",nt="hail",ot="lightning-rainy",dt="lightning",ht="partlycloudy",pt="partlycloudy-night",gt="mostly-sunny",ut="pouring",ft="rainy",yt="snowy-rainy",vt="snowy",wt="sunny",mt="windy-variant",bt="windy",_t={[wt]:"clear",[at]:"clear night",[ht]:"partially-cloudy",[pt]:"partially-cloudy night",[gt]:"partially-cloudy",[ct]:"partially-cloudy",[dt]:"stormy",[ot]:"stormy",[ut]:"clear",[ft]:"clear",[vt]:"clear",[yt]:"clear",[bt]:"clear",[mt]:"clear",[rt]:"clear",[nt]:"clear",[lt]:"clear"},$t=[Se,Te,ze,Oe,Ie,Le,Ve,Re,Ue,Be,je,Je,Ye],At={[Se]:{idPattern:{parentDeviceConfigProp:Ce,pattern:"weather.%device_name%"}},[Te]:{attributePattern:{parentCardEntity:Se,attribute:"temperature"}},[ze]:{},[Oe]:{idPattern:{parentDeviceConfigProp:Ce,pattern:"weather.%device_name%"}},[Ie]:{idPattern:{parentDeviceConfigProp:void 0,pattern:"sensor.time"}},[Le]:{idPattern:{parentDeviceConfigProp:void 0,pattern:"sensor.date"}},[Ve]:{idPattern:{parentDeviceConfigProp:Ce,pattern:"sensor.%device_name%_now_temp_now"}},[Re]:{idPattern:{parentDeviceConfigProp:Ce,pattern:"sensor.%device_name%_now_now_label"}},[Ue]:{idPattern:{parentDeviceConfigProp:Ce,pattern:"sensor.%device_name%_now_temp_later"}},[Be]:{idPattern:{parentDeviceConfigProp:Ce,pattern:"sensor.%device_name%_now_later_label"}},[je]:{idPattern:{parentDeviceConfigProp:Ce,pattern:"sensor.%device_name%_warnings"}},[Je]:{idPattern:{parentDeviceConfigProp:Ce,pattern:"sensor.%device_name%_rain_amount_range_0"}},[Ye]:{idPattern:{parentDeviceConfigProp:Ce,pattern:"sensor.%device_name%_short_text_0"}}};async function Et(e){try{return await e.callWS({type:"config/device_registry/list"})}catch(e){return r.error("Error fetching devices",e),[]}}async function xt(e,t){try{return await e.callWS({type:"config/entity_registry/list",domain:t?.domain,area_id:t?.area_id})}catch(e){return r.error("Error fetching entities",e),[]}}const Mt=async(e,t)=>{const s={};for(const e of $t)s[e]={entity_id:t[e],attribute:void 0,is_inferred:!1};if(!e)return s;const i=await Et(e),a=await xt(e);let c=100,l=!0;for(;l&&c>0;){l=!1,c--;for(const e of $t)if(!s[e].entity_id){const c=At[e];if(c?.idPattern){let r=c.idPattern.pattern;const n=c.idPattern.parentDeviceConfigProp;let o;if(n&&(o=i.find((e=>e.id===t[n])),o&&o.name)){const e=o.name.toLowerCase().replace(" ","_");r=r.replace("%device_name%",e)}a.find((e=>e.entity_id===r))&&(l=!0,s[e]={entity_id:r,attribute:void 0,is_inferred:!0})}else if(c?.attributePattern){const t=s[c.attributePattern.parentCardEntity];t?.entity_id&&(l=!0,s[e]={entity_id:t.entity_id,attribute:c.attributePattern.attribute,is_inferred:!0})}}}return s},Ct=(e,t)=>{if(!e||!t?.entity_id)return;const s=e.states[t.entity_id];return s?t.attribute?s.attributes[t.attribute]:s.state:void 0},St=(e,t)=>{const s=Ct(e,t);if(void 0!==s)return"string"==typeof s?s:"number"==typeof s?s.toString():void 0};var Ht={version:"Version",title:"BOM Weather Card",description:"Display weather information in the style of the BOM (Bureau of Meteorology) Australia app."},Tt={feelsLike:"Feels like",noRain:"No Rain",rain:"Rain"},Zt={currentTemperatureEntity:"Current Temperature Entity",dailyForecast:"Daily Forecast",dateEntity:"Date Entity",feelsLikeTemperatureEntity:"Feels Like Temperature Entity",forecastSummaryEntity:"Forecast Summary Entity",hideWarningCountIfZero:"Hide Warning Count If Zero",hourlyForecast:"Hourly Forecast",laterLabelEntity:"Later Label Entity",laterTempEntity:"Later Temp Entity",nowLabelEntity:"Now Label Entity",nowTempEntity:"Now Temp Entity",numberOfDays:"Number of Days",optional:"Optional",rainSummaryEntity:"Rain Summary Entity",required:"Required",showCurrentTemperature:"Show Current Temperature",showDailyForecast:"Show Daily Forecast",showDate:"Show Date",showFeelsLikeTemperature:"Show Feels Like Temperature",showForecastSummary:"Show Forecast Summary",showHourlyForecast:"Show Hourly Forecast",showNowLaterTemps:"Show Now/Later Temperatures",showRainSummary:"Show Rain Summary",showTime:"Show Time",showWarningCount:"Show Warning Count",showWeatherIcon:"Show Weather Icon",summary:"Summary",summaryWeatherEntity:"Summary Weather Entity",timeEntity:"Time Entity",title:"Title",useDefaultHaWeatherIcons:"Use Default HA Weather Icons",warningsCountEntity:"Warnings Count Entity",weatherDevice:"Weather Device",weatherIconEntity:"Weather Icon Entity"},zt={invalidConfigProperty:"Invalid config property: {property}",failedToPreLoadElement:" Failed to pre-load HA element: {element}"},kt={common:Ht,card:Tt,editor:Zt,error:zt},Ot=Object.freeze({__proto__:null,card:Tt,common:Ht,default:kt,editor:Zt,error:zt});const Ft={[st.EN]:Ot,[st.EN_GB]:Ot};function Pt(e=it){const t=(e||"").replace(/['"]+/g,"").replace("-","_").toLowerCase();return console.assert(Object.values(st).includes(t),`Invalid language: ${t}`),function(e,s={}){let i;try{i=e.split(".").reduce(((e,t)=>e[t]),Ft[t])}catch(t){i=e.split(".").reduce(((e,t)=>e[t]),Ft[it])}void 0===i&&(i=e.split(".").reduce(((e,t)=>e[t]),Ft[it]));for(const[e,t]of Object.entries(s))i=i.replace(`{${e}}`,t);return i}}const It=b`
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
`,Dt=b`
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
`;const Lt=b``,Nt=b`
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

  ${Lt}
`;let Vt=class extends me{constructor(){super(...arguments),this._config={...tt},this._cardEntities={},this._dayMode=!0,this._darkMode=!1,this._weatherClass="",this.language=it,this.localize=Pt(this.language),this._initialized=!1}static get styles(){return b`
      ${Dt}
      ${Nt}
      ${It}
      
      ha-card {
        color: var(--bwc-text-color);

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
    `}static getStubConfig(){return{...tt}}setConfig(e){if(!e)throw new Error(this.localize("error.invalidConfigProperty"));this._config={...this._config,...e}}async _calculateCardEntities(){this._cardEntities=await Mt(this.hass,this._config),r.debug("Card Entities Recalculated:",this._cardEntities)}async _calculateWeatherClass(){const e=St(this.hass,this._cardEntities[Se]);this._weatherClass=_t[e]||"",r.debug("Weather class recalculated:",this._weatherClass)}_unsubscribeForecastEvents(){this._dailyForecastSubscribed&&(this._dailyForecastSubscribed.then((e=>e())).catch((()=>{})),this._dailyForecastSubscribed=void 0)}async _subscribeForecastEvents(){if(this._unsubscribeForecastEvents(),!(this.isConnected&&this._initialized&&this.hass&&this._config))return;const e=this._cardEntities[Se]?.entity_id;var t,s,i,a;(r.debug("_subscribeForecastEvents()",{forecastEntityId:e}),e)?this._dailyForecastSubscribed=(t=this.hass,s=e,i="daily",a=e=>{r.debug("Daily Forecast Subscribed.",e),this._dailyForecastEvent=e},t.connection.subscribeMessage(a,{type:"weather/subscribe_forecast",forecast_type:i,entity_id:s})):r.warn("⚠️ No Forecast Entity specified. Skipping subscription to daily forecast.")}firstUpdated(){const e=[this._calculateCardEntities,this._calculateWeatherClass];Promise.all(e.map((e=>e.bind(this)()))).finally((()=>{this._initialized=!0}))}updated(e){var t;super.updated(e),r.debug("updated():",e),this._dailyForecastSubscribed&&!e.has("_config")||this._subscribeForecastEvents(),e.has("_config")&&(r.debug("config changed",this._config),this._calculateCardEntities()),e.has("_dailyForecastEvent")&&r.debug("_dailyForecastEvent changed",this._dailyForecastEvent),e.has("_cardEntities")&&this._calculateWeatherClass(),e.has("hass")&&(this._dayMode=(t=this.hass,!t?.states["sun.sun"]||"above_horizon"===t.states["sun.sun"].state),this._darkMode=!0===this.hass.themes.darkMode,this.hass.locale?.language!==this.language&&(this.language=this.hass.locale?.language,this.localize=Pt(this.language)))}connectedCallback(){r.debug("✅ connected to DOM"),super.connectedCallback(),this.hasUpdated&&this._config&&this.hass&&this._subscribeForecastEvents()}disconnectedCallback(){r.debug("❌ disconnected from DOM"),super.disconnectedCallback(),this._unsubscribeForecastEvents()}render(){return r.debug("🖼️ Rendering card with state:",{weatherClass:this._weatherClass,hass:this.hass,config:this._config,forecast:this._dailyForecastEvent}),se`<ha-card
      class="${g({day:this._dayMode,night:!this._dayMode,"dark-mode":this._darkMode,"light-mode":!this._darkMode,[this._weatherClass]:!0})}"
    >
      <!-- Card Header -->
      ${this._config.title?se`<h1 class="card-header">${this._config.title}</h1>`:ae}

      <!-- Summary -->
      <bwc-summary-element
        .hass=${this.hass}
        .config=${this._config}
        .cardEntities=${this._cardEntities}
        .localize=${this.localize}
        .dayMode=${this._dayMode}
        .darkMode=${this._darkMode}
        .weatherClass=${this._weatherClass}
        .weatherSummaryData=${this._weatherSummaryData}
      ></bwc-summary-element>

      <!-- Daily Forecast -->
      ${this._dailyForecastEvent?se`<bwc-daily-forecast-element
            .forecastData=${this._dailyForecastEvent}
            .useHAWeatherIcons=${this._config[Fe]??!1}
          ></bwc-daily-forecast-element>`:ae}

      <!-- Debug Info -->
      <div class="bwc-debug item-container">
        <span class="version">Version ${n}</span>
      </div>
    </ha-card>`}static async getConfigElement(){return await Promise.resolve().then((function(){return Es})),document.createElement("bom-weather-card-editor")}};o([Ee({attribute:!1})],Vt.prototype,"hass",void 0),o([xe()],Vt.prototype,"_config",void 0),o([xe()],Vt.prototype,"_cardEntities",void 0),o([xe()],Vt.prototype,"_dayMode",void 0),o([xe()],Vt.prototype,"_darkMode",void 0),o([xe()],Vt.prototype,"_weatherClass",void 0),o([xe()],Vt.prototype,"_weatherSummaryData",void 0),o([xe()],Vt.prototype,"_dailyForecastSubscribed",void 0),o([xe()],Vt.prototype,"_dailyForecastEvent",void 0),Vt=o([_e("bom-weather-card")],Vt);const Rt="regular",Ut="huge";let Bt=class extends me{constructor(){super(...arguments),this.useHAWeatherIcons=!1}_renderForecastRow(e,t,s,i,a,c){return se`
      <div class=${g("forecast-row",c)}>
        <div class="day">${e}</div>
        <bwc-weather-icon-element
          .useHAWeatherIcons=${this.useHAWeatherIcons}
          .weatherIcon=${c}
          .iconSize=${Rt}
        ></bwc-weather-icon-element>
        <div class="temperature">${"number"==typeof t?`${t}° - `:""}${s}°</div>
        <div class="rain">${0===i?"No Rain":`${i}mm`}${0===i?"":` (${a}%)`}</div>
      </div>
    `}render(){if(!this.forecastData||!this.forecastData.forecast)return se``;const e=this.forecastData.forecast.map((e=>this._renderForecastRow(new Date(e.datetime).toLocaleDateString("en-US",{weekday:"long"}),e.templow??void 0,e.temperature,e.precipitation??0,e.precipitation_probability??0,e.condition??"")));return se`
      <div class="container">
        <div class="title">Daily forecast</div>
        ${e}
      </div>
    `}};Bt.styles=b`
    :host {
      color: var(--bwc-text-color);
    }

    .container {
      display: flex;
      flex-direction: column;
      padding: var(--bwc-global-padding);
    }

    .title {
      font-size: var(--bwc-section-header-font-size);
      margin-bottom: var(--bwc-global-padding);
    }

    .forecast-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: calc(var(--bwc-global-padding) / 2) 0;
    }

    .forecast-row:not(:last-child) {
      border-bottom: 1px solid var(--divider-color);
    }

    .day {
      flex: 2;
      font-weight: bold;
      text-align: left;
      font-size: var(--bwc-daily-forecast-day-font-size);
    }

    .icon {
      flex: 1;
      text-align: left;
    }

    .temperature {
      flex: 1;
      text-align: right;
      font-size: var(--bwc-daily-forecast-temp-font-size);
    }

    .rain {
      flex: 2;
      text-align: right;
      font-size: 0.9em;
      font-size: var(--bwc-daily-forecast-rain-font-size);
    }
  `,o([Ee({type:Object})],Bt.prototype,"forecastData",void 0),o([Ee({type:Boolean})],Bt.prototype,"useHAWeatherIcons",void 0),Bt=o([_e("bwc-daily-forecast-element")],Bt);const Wt=(e,t)=>{const s=Ct(e,t);if(void 0!==s){if("number"==typeof s)return s;if("string"==typeof s)try{return parseFloat(s)}catch{return}}},jt=(e,t,s,i)=>{const a=Array.isArray(s)?s:[s];for(const t of a)if(!e[t])return!1;return!!t[i]?.entity_id};let qt=class extends me{static get styles(){const e=new URL("img/backgrounds",import.meta.url).toString();return b`
      ${Dt}
      ${Nt}
      ${It}

      .summary {
        /* TODO: implement the remainder of the condition backgrounds */
        --background-url: url(${m(`${e}/partially-cloudy.png`)});

        display: block;

        /* TODO: make this configurable */
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

        /* Stormy (same in dark mode) */
        &.stormy,
        &.dark-mode.stormy {
          --background-url: url(${m(`${e}/stormy.png`)});
          --bwc-background-color-start: var(--bwc-background-color-day-stormy-start);
          --bwc-background-color-end: var(--bwc-background-color-day-stormy-end);
        }
      }
    `}render(){const e=jt(this.config,this.cardEntities,He,Te),t=jt(this.config,this.cardEntities,ke,Oe),s=t?St(this.hass,this.cardEntities[Oe]):"",i=jt(this.config,this.cardEntities,Pe,Ie),a=jt(this.config,this.cardEntities,De,Le),c=jt(this.config,this.cardEntities,Ze,ze),l=!0===this.config[Ne],r=jt(this.config,this.cardEntities,Ne,Ve),n=jt(this.config,this.cardEntities,Ne,Ue),o=jt(this.config,this.cardEntities,We,je)&&(!this.config[qe]||(Wt(this.hass,this.cardEntities[je])??0)>0),d=jt(this.config,this.cardEntities,Ge,Je),h=St(this.hass,this.cardEntities[Je]),p=jt(this.config,this.cardEntities,Ke,Ye);return se`<div
      class=${g("summary",this.weatherClass,{day:this.dayMode,night:!this.dayMode,"dark-mode":this.darkMode})}
    >
      <!-- First Row (Current temp, weather icon and time/date) -->
      ${e||t||i?se`<div class="item-container reverse">
            <!-- Current Temperature -->
            ${e?se`<bwc-temperature-element
                  class="item"
                  .localize=${this.localize}
                  .isLarge=${!0}
                  .value=${Wt(this.hass,this.cardEntities[Te])}
                  .feelsLikeTemperature=${c?Wt(this.hass,this.cardEntities[ze]):void 0}
                ></bwc-temperature-element>`:ae}

            <!-- Weather Icon  -->
            ${t?se`<bwc-weather-icon-element
                  class=${g("item",{center:i,right:!i})}
                  .iconSize=${Ut}
                  .useHAWeatherIcons=${!0===this.config[Fe]}
                  .weatherIcon=${s}
                ></bwc-weather-icon-element>`:ae}

            <!-- Time -->
            ${i?se`<bwc-time-date-element
                  class="item right"
                  .hass=${this.hass}
                  .showDate=${a}
                  .cardTimeEntity=${this.cardEntities[Ie]}
                  .cardDateEntity=${this.cardEntities[Le]}
                ></bwc-time-date-element>`:ae}
          </div> `:ae}

      <!-- Second Row (now/later temps and warnings) -->
      ${l||o?se`<div class="item-container justify-left">
            ${r?se`<bwc-temperature-element
                  class="item left no-grow"
                  .decimalPlaces=${0}
                  .value=${Wt(this.hass,this.cardEntities[Ve])}
                  .label=${St(this.hass,this.cardEntities[Re])}
                ></bwc-temperature-element> `:ae}
            ${n?se`<bwc-temperature-element
                  class="item left no-grow"
                  .decimalPlaces=${0}
                  .value=${Wt(this.hass,this.cardEntities[Ue])}
                  .label=${St(this.hass,this.cardEntities[Be])}
                ></bwc-temperature-element> `:ae}
            ${o?se`<bwc-warnings-icon-element
                  class="item right"
                  .value=${Wt(this.hass,this.cardEntities[je])}
                ></bwc-warnings-icon-element> `:ae}
          </div> `:ae}

      <!-- Third and Fourth Row -->
      <div class="item-container column">
        ${d?se`<bwc-value-label-element
              class="item"
              .value=${`${"0"===h?this.localize("card.noRain"):`${h}mm`}`}
              .label=${"0"===h?void 0:this.localize("card.rain")}
            ></bwc-value-label-element> `:ae}
        ${p?se`<bwc-value-label-element
              class="item"
              .value=${St(this.hass,this.cardEntities[Ye])}
            ></bwc-value-label-element>`:ae}
      </div>
    </div> `}};o([Ee({attribute:!1})],qt.prototype,"hass",void 0),o([Ee({type:Object})],qt.prototype,"config",void 0),o([Ee({type:Object})],qt.prototype,"cardEntities",void 0),o([Ee({type:Object})],qt.prototype,"localize",void 0),o([Ee({type:Boolean})],qt.prototype,"dayMode",void 0),o([Ee({type:Boolean})],qt.prototype,"darkMode",void 0),o([Ee({type:String})],qt.prototype,"weatherClass",void 0),o([Ee({type:Object})],qt.prototype,"weatherSummaryData",void 0),qt=o([_e("bwc-summary-element")],qt);const Gt=b`
  ${Nt}

  :host {
    display: block;
  }
`;let Jt=class extends me{constructor(){super(...arguments),this.isLarge=!1,this.decimalPlaces=1}render(){return se`<div
      class=${g("temperature-element",{large:this.isLarge})}
    >
      <span class="number"
        >${void 0!==this.value?this.value.toFixed(this.decimalPlaces):"-"}&deg;</span
      >
      ${void 0!==this.feelsLikeTemperature?se`
            <span class="feels-like"
              >${this.localize("card.feelsLike")}&nbsp;<strong
                >${this.feelsLikeTemperature.toFixed(this.decimalPlaces)}&deg;</strong
              ></span
            >
          `:ae}
      ${void 0!==this.label?se`<span class="label">${this.label}</span>`:ae}
    </div>`}static get styles(){return b`
      ${Gt}

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
    `}};o([Ee({type:Boolean})],Jt.prototype,"isLarge",void 0),o([Ee({type:Number})],Jt.prototype,"value",void 0),o([Ee({type:Number})],Jt.prototype,"feelsLikeTemperature",void 0),o([Ee({type:Number})],Jt.prototype,"decimalPlaces",void 0),o([Ee()],Jt.prototype,"label",void 0),o([Ee()],Jt.prototype,"localize",void 0),Jt=o([_e("bwc-temperature-element")],Jt);let Kt=class extends me{constructor(){super(...arguments),this.showDate=!1}_update(){this.hass&&(this._currentTime=St(this.hass,this.cardTimeEntity),this._currentDate=St(this.hass,this.cardDateEntity))}connectedCallback(){super.connectedCallback(),this._interval=window.setInterval((()=>{this._update()}),1e3),this._update()}disconnectedCallback(){super.disconnectedCallback(),this._interval&&clearInterval(this._interval)}render(){const e=this.showDate&&this._currentDate;return se`<div class=${g("time-date-element")}>
      <span class="time">${this._currentTime}</span>
      ${e?se`<span class="date">${this._currentDate}</span>`:ae}
    </div>`}static get styles(){return b`
      ${Gt}

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
    `}};o([Ee({attribute:!1})],Kt.prototype,"hass",void 0),o([Ee({type:Boolean})],Kt.prototype,"showDate",void 0),o([Ee({type:Object})],Kt.prototype,"cardTimeEntity",void 0),o([Ee({type:Object})],Kt.prototype,"cardDateEntity",void 0),o([xe()],Kt.prototype,"_currentTime",void 0),o([xe()],Kt.prototype,"_currentDate",void 0),Kt=o([_e("bwc-time-date-element")],Kt);let Yt=class extends me{render(){return se`<div class=${g("value-label-element")}>
      ${this.value&&se`<span class="value">${this.value}</span>`}
      ${this.label&&se`<span class="label">${this.label}</span>`}
    </div>`}static get styles(){return b`
      ${Gt}

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
    `}};o([Ee()],Yt.prototype,"value",void 0),o([Ee()],Yt.prototype,"label",void 0),Yt=o([_e("bwc-value-label-element")],Yt);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xt=2;class Qt{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class es extends Qt{constructor(e){if(super(e),this.it=ae,e.type!==Xt)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===ae||null==e)return this._t=void 0,this.it=e;if(e===ie)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}es.directiveName="unsafeHTML",es.resultType=1;const ts=(e=>(...t)=>({_$litDirective$:e,values:t}))(es);const ss='<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M23.64,18.1L14.24,2.28c-.47-.8-1.3-1.28-2.24-1.28s-1.77,.48-2.23,1.28L.36,18.1h0c-.47,.82-.47,1.79,0,2.6s1.31,1.3,2.24,1.3H21.41c.94,0,1.78-.49,2.24-1.3s.46-1.78-.01-2.6Zm-10.64-.1h-2v-2h2v2Zm0-4h-2v-6h2v6Z"/></svg>';let is=class extends me{render(){return se`<div
      class=${g("warnings-icon-element",{"has-warnings":this.value&&this.value>0})}
    >
      <div class="icon-value-wrapper">
        <div class="bwc-icon">${se`${ts(ss)}`}</div>
        <div class="value-wrapper">
          <span class="value">${this.value}</span>
        </div>
      </div>
    </div>`}static get styles(){return b`
      ${Gt}

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
    `}};o([Ee({type:Number})],is.prototype,"value",void 0),is=o([_e("bwc-warnings-icon-element")],is);const as=["weather.","forecast","humidity","temperature","temp","wind","precipitation","rain","snow","storm","cloud","uv","sun","dew","barometer","pressure","visibility","air_quality","weather"];let cs=class extends me{constructor(){super(...arguments),this.label="Select a Weather Device",this.value="",this.boobs="",this._initialized=!1,this.weatherDevices=[]}firstUpdated(){this._fetchWeatherDevices(),this._initialized=!0}updated(e){e.has("hass")&&this._fetchWeatherDevices()}_handleOpenedChanged(e){e.detail.value&&this._fetchWeatherDevices()}async _fetchWeatherDevices(){if(this.hass)try{this.weatherDevices=await async function(e){let t=[],s=[];const i=new Set;try{t=await Et(e),s=await xt(e);const a=s.filter((e=>e.device_id&&e.device_id.length>0&&as.some((t=>e.entity_id.includes(t)))));return a.forEach((e=>{e.device_id&&i.add(e.device_id)})),t.filter((e=>i.has(e.id)))}catch(e){throw r.error("Error fetching weather-related devices",e),e}}(this.hass)}catch(e){r.error("Error fetching weather-related devices",e)}}_handleValueChanged(e){this._initialized&&(this.value=e.detail.value,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:this.value},bubbles:!0,composed:!0})))}render(){return se`
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
      ${Gt}
    `}};o([Ee({attribute:!1})],cs.prototype,"hass",void 0),o([Ee({type:String})],cs.prototype,"label",void 0),o([Ee({type:String,reflect:!0})],cs.prototype,"value",void 0),o([Ee({type:String,reflect:!0})],cs.prototype,"boobs",void 0),o([xe()],cs.prototype,"weatherDevices",void 0),cs=o([_e("bwc-weather-device-picker-element")],cs);const ls="day";var rs='<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><defs><style>.cls-1{fill:none;}.cls-2{opacity:0.15;}.cls-3{fill:#ffe58d;}.cls-4{fill:#ffea0d;}.cls-5{opacity:0.58;}.cls-6{fill:#ffdf64;}</style></defs><title>01-sunny</title><g id="Forecast_Icons_Outlined" data-name="Forecast Icons Outlined"><rect class="cls-1" width="96" height="96"/><g class="cls-2"><circle class="cls-3" cx="43.44" cy="42.81" r="41.51"/></g><g class="cls-2"><path class="cls-4" d="M79.71,63A72.39,72.39,0,0,1,42,46,183.73,183.73,0,0,0,7.43,22.21,41.5,41.5,0,1,0,79.71,63Z"/></g><circle class="cls-3" cx="43.44" cy="42.81" r="27.74"/><g class="cls-5"><path class="cls-6" d="M15.7,42.81a27.73,27.73,0,0,0,54,8.88C57.82,49.9,45.22,45.25,34.76,35c-3.46-3.37-7.34-7.4-11.33-11.41A27.61,27.61,0,0,0,15.7,42.81Z"/></g></g></svg>',ns='<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><defs><style>.cls-1{fill:none;}.cls-2{opacity:0.3;}.cls-3{fill:#fff;}.cls-3,.cls-4,.cls-6{fill-rule:evenodd;}.cls-4{fill:#fffbf1;}.cls-5{opacity:0.85;}.cls-6{fill:#eaeaea;}</style></defs><title>02-clear-night</title><g id="Forecast_Icons_Outlined" data-name="Forecast Icons Outlined"><rect class="cls-1" width="96" height="96"/><g class="cls-2"><path class="cls-3" d="M14.08,16.05a41.51,41.51,0,1,1,0,58.71,41.52,41.52,0,0,1,0-58.71"/></g><path class="cls-4" d="M23.82,25.79a27.74,27.74,0,1,1,0,39.23,27.75,27.75,0,0,1,0-39.23"/><g class="cls-5"><path class="cls-6" d="M45.73,17.77A40.46,40.46,0,0,0,47.4,72.83a27.72,27.72,0,0,0-1.67-55.06Z"/></g></g></svg>',os='<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><defs><style>.cls-1{fill:none;}.cls-2{fill:#fffbf1;}.cls-2,.cls-4{fill-rule:evenodd;}.cls-3{opacity:0.85;}.cls-4{fill:#eaeaea;}.cls-5{fill:#c9c9c9;}</style></defs><title>03-partly-cloudy-night</title><g id="Forecast_Icons_Outlined" data-name="Forecast Icons Outlined"><rect class="cls-1" width="96" height="96"/><path class="cls-2" d="M46.74,9.42a27.74,27.74,0,1,1,0,39.23,27.76,27.76,0,0,1,0-39.23"/><g class="cls-3"><path class="cls-4" d="M68.65,1.41a40.45,40.45,0,0,0,1.67,55.05,27.71,27.71,0,0,0-1.67-55Z"/></g><path class="cls-5" d="M87.61,62.3A14.9,14.9,0,0,0,76.55,47.91a10.47,10.47,0,0,0,.87-4.19,10.52,10.52,0,0,0-14-10.07,23.69,23.69,0,0,0-46.48,5.57,19.16,19.16,0,0,0,3.53,38c.18,0,.35,0,.53,0v0H72.87A14.91,14.91,0,0,0,87.61,62.3Z"/></g></svg>',ds='<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><defs><style>.cls-1{fill:none;}.cls-2{opacity:0.1;}.cls-3{opacity:0.2;}.cls-4{fill:#c7d8e6;}.cls-5{fill:#d0dfbb;}</style></defs><title>09-wind</title><g id="Forecast_Icons_Outlined" data-name="Forecast Icons Outlined"><rect class="cls-1" width="96" height="96"/><g class="cls-2"><path d="M74.09,45.41H57.44a2.6,2.6,0,0,1,0-5.2H74.09a5,5,0,0,0,3.56-8.6,2.6,2.6,0,0,1,3.68-3.68,10.24,10.24,0,0,1-7.24,17.48Z"/></g><g class="cls-3"><path d="M64.77,68.41A2.6,2.6,0,0,1,62.93,64a4.79,4.79,0,0,0-3.39-8.18H46.27a2.6,2.6,0,1,1,0-5.2H59.54A10,10,0,0,1,66.6,67.65,2.56,2.56,0,0,1,64.77,68.41Z"/></g><path class="cls-4" d="M35.89,55.79H3.46a2.6,2.6,0,1,1,0-5.2H35.89a2.6,2.6,0,1,1,0,5.2Z"/><g class="cls-3"><path d="M47.07,45.41H31.82a2.6,2.6,0,0,1,0-5.2H47.07a2.6,2.6,0,1,1,0,5.2Z"/></g><g class="cls-2"><path d="M51.88,71.52a2.6,2.6,0,0,1-2.6-2.6,2.75,2.75,0,0,0-2.75-2.75H12.88a2.6,2.6,0,0,1,0-5.2H46.53a8,8,0,0,1,7.95,8A2.61,2.61,0,0,1,51.88,71.52Z"/></g><g class="cls-3"><path d="M63.57,35H38.67a2.6,2.6,0,0,1,0-5.2h24.9a2.75,2.75,0,0,0,1.94-4.7,2.8,2.8,0,0,0-3.32-.43,2.6,2.6,0,0,1-2.62-4.5,8,8,0,0,1,4-1.07,8,8,0,0,1,0,15.9Z"/></g><circle class="cls-5" cx="76.13" cy="53.19" r="2.6"/><circle class="cls-5" cx="26.61" cy="32.43" r="2.6"/><path class="cls-4" d="M21.44,45.41H11.07a2.6,2.6,0,0,1,0-5.2H21.44a2.6,2.6,0,1,1,0,5.2Z"/><rect class="cls-1" width="96" height="96"/></g></svg>',hs='<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><defs><style>.cls-1{opacity:0.48;}.cls-2{fill:#878787;}.cls-3{fill:#c6c6c6;}.cls-4{opacity:0.6;}.cls-5{fill:#a9c3d9;}.cls-6{fill:#b1c696;}.cls-7{fill:none;}</style></defs><title>09-wind-night</title><g id="Forecast_Icons_Outlined" data-name="Forecast Icons Outlined"><g class="cls-1"><path class="cls-2" d="M74.09,45.42H57.44a2.6,2.6,0,1,1,0-5.2H74.09a5,5,0,0,0,3.56-8.61,2.6,2.6,0,0,1,3.68-3.67,10.24,10.24,0,0,1-7.24,17.48Z"/></g><path class="cls-3" d="M64.77,68.42A2.6,2.6,0,0,1,62.93,64a4.79,4.79,0,0,0-3.39-8.18H46.27a2.6,2.6,0,0,1,0-5.2H59.54A10,10,0,0,1,66.6,67.66,2.56,2.56,0,0,1,64.77,68.42Z"/><g class="cls-4"><path class="cls-5" d="M35.89,55.8H3.46a2.6,2.6,0,1,1,0-5.2H35.89a2.6,2.6,0,0,1,0,5.2Z"/></g><path class="cls-3" d="M47.07,45.42H31.82a2.6,2.6,0,0,1,0-5.2H47.07a2.6,2.6,0,0,1,0,5.2Z"/><g class="cls-1"><path class="cls-2" d="M51.88,71.53a2.6,2.6,0,0,1-2.6-2.6,2.76,2.76,0,0,0-2.75-2.76H12.88a2.6,2.6,0,0,1,0-5.2H46.53a8,8,0,0,1,7.95,8A2.61,2.61,0,0,1,51.88,71.53Z"/></g><path class="cls-3" d="M63.57,35H38.67a2.6,2.6,0,1,1,0-5.2h24.9a2.75,2.75,0,0,0,1.94-4.7,2.8,2.8,0,0,0-3.32-.43,2.6,2.6,0,1,1-2.62-4.5,8,8,0,0,1,4-1.07,8,8,0,0,1,0,15.9Z"/><circle class="cls-6" cx="76.13" cy="53.2" r="2.6"/><circle class="cls-6" cx="26.61" cy="32.44" r="2.6"/><g class="cls-4"><path class="cls-5" d="M21.44,45.42H11.07a2.6,2.6,0,0,1,0-5.2H21.44a2.6,2.6,0,0,1,0,5.2Z"/></g><rect class="cls-7" y="0.01" width="96" height="96"/></g></svg>',ps='<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><defs><style>.cls-1{fill:none;}.cls-2{fill:#e7e7e7;}.cls-3{fill:#e9e9e9;}.cls-4{fill:#f5f5f5;}.cls-5{fill:#ececec;}.cls-6{fill:#e8e8e8;}.cls-7{fill:#c8c8c8;}</style></defs><title>15-snow</title><g id="Forecast_Icons_Outlined" data-name="Forecast Icons Outlined"><rect class="cls-1" width="96" height="96"/><circle class="cls-2" cx="22.13" cy="57.21" r="3.52"/><circle class="cls-3" cx="53.91" cy="60.24" r="3.52"/><circle class="cls-3" cx="35.21" cy="73.71" r="3.52"/><circle class="cls-3" cx="47.32" cy="71.37" r="3.52"/><circle class="cls-4" cx="22.71" cy="69.03" r="3.52"/><path class="cls-5" d="M66.6,44.5a10.16,10.16,0,0,0-7.55-9.81,7.21,7.21,0,0,0-9-9.74,16.16,16.16,0,0,0-31.71,3.8,13.08,13.08,0,0,0,2.4,25.93l.37,0v0H56.54A10.17,10.17,0,0,0,66.6,44.5Z"/><circle class="cls-6" cx="32.87" cy="63.56" r="2.34"/><circle class="cls-7" cx="46.15" cy="83.09" r="2.34"/><circle class="cls-7" cx="59.82" cy="74.89" r="2.34"/><circle class="cls-7" cx="41.51" cy="59.92" r="2.34"/><circle class="cls-4" cx="64.43" cy="58.62" r="2.34"/><circle class="cls-6" cx="25.45" cy="81.53" r="2.34"/><circle class="cls-6" cx="34.13" cy="90.66" r="2.34"/><circle class="cls-4" cx="60.72" cy="87.41" r="2.34"/><circle class="cls-6" cx="66.56" cy="67.3" r="2.34"/><circle class="cls-4" cx="17.26" cy="89.36" r="2.34"/><circle class="cls-4" cx="3.64" cy="69.25" r="2.34"/><circle class="cls-6" cx="13.59" cy="76.35" r="2.34"/><circle class="cls-6" cx="12.29" cy="63.2" r="2.34"/></g></svg>',gs='<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><defs><style>.cls-1{fill:none;}.cls-2{fill:#f8f8f8;}.cls-3{fill:#fff;}.cls-4{fill:#f0f0f0;}</style></defs><title>15-snow-night</title><g id="Forecast_Icons_Outlined" data-name="Forecast Icons Outlined"><rect class="cls-1" width="96" height="96"/><circle class="cls-2" cx="22.13" cy="54.43" r="3.52"/><circle class="cls-3" cx="53.91" cy="60.24" r="3.52"/><circle class="cls-2" cx="35.21" cy="73.71" r="3.52"/><circle class="cls-2" cx="47.32" cy="71.37" r="3.52"/><circle class="cls-4" cx="22.71" cy="69.03" r="3.52"/><path class="cls-3" d="M64.44,44.5a10.17,10.17,0,0,0-7.55-9.81,7.21,7.21,0,0,0-9-9.74,16.16,16.16,0,0,0-31.71,3.8,13.08,13.08,0,0,0,2.4,25.93l.37,0v0H54.38A10.17,10.17,0,0,0,64.44,44.5Z"/><circle class="cls-2" cx="32.87" cy="63.56" r="2.34"/><circle class="cls-3" cx="46.15" cy="83.09" r="2.34"/><circle class="cls-3" cx="59.82" cy="74.89" r="2.34"/><circle class="cls-3" cx="41.51" cy="59.92" r="2.34"/><circle class="cls-4" cx="64.43" cy="58.62" r="2.34"/><circle class="cls-3" cx="25.45" cy="81.53" r="2.34"/><circle class="cls-2" cx="34.13" cy="90.66" r="2.34"/><circle class="cls-4" cx="60.72" cy="87.41" r="2.34"/><circle class="cls-2" cx="66.56" cy="67.3" r="2.34"/><circle class="cls-4" cx="17.26" cy="89.36" r="2.34"/><circle class="cls-4" cx="3.64" cy="69.25" r="2.34"/><circle class="cls-2" cx="13.59" cy="76.35" r="2.34"/><circle class="cls-3" cx="12.29" cy="63.2" r="2.34"/></g></svg>',us='<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><defs><style>.cls-1{fill:none;}.cls-2{fill:#5eb4e9;}.cls-3{opacity:0.6;}.cls-4{fill:#c8c8c8;}.cls-5{opacity:0.15;}.cls-6{fill:#9d9d9d;}.cls-7{fill:#ffe77c;}.cls-8{fill:#aaa;}.cls-9{fill:#ffd413;}</style></defs><title>16-storms</title><g id="Forecast_Icons_Outlined" data-name="Forecast Icons Outlined"><rect class="cls-1" width="96" height="96"/><path class="cls-2" d="M41.92,84.33a2.6,2.6,0,0,1-2.6-2.6V58.05a2.6,2.6,0,0,1,5.2,0V81.73A2.59,2.59,0,0,1,41.92,84.33Z"/><path class="cls-2" d="M52.3,78a2.61,2.61,0,0,1-2.6-2.6V65.23a2.6,2.6,0,1,1,5.2,0V75.39A2.6,2.6,0,0,1,52.3,78Z"/><g class="cls-3"><path class="cls-2" d="M31.55,73.88a2.59,2.59,0,0,1-2.6-2.6V57.44a2.6,2.6,0,1,1,5.19,0V71.28A2.59,2.59,0,0,1,31.55,73.88Z"/></g><g class="cls-3"><path class="cls-2" d="M31.55,84.29a2.61,2.61,0,1,1,2.59-2.63v0A2.6,2.6,0,0,1,31.55,84.29Z"/></g><path class="cls-4" d="M78.26,32.62A13.76,13.76,0,0,0,65.33,14.05c-.31,0-.61,0-.91,0a18.15,18.15,0,1,0-34.6,11V53.26h44a10.8,10.8,0,0,0,4.44-20.64Z"/><g class="cls-5"><path class="cls-6" d="M29,18.59c0,.29,0,.57,0,.86a18.21,18.21,0,0,0,.9,5.65V53.26H69.68c1.83-4.78,1.59-10.63-2.54-17.76C55.78,15.9,39.13,14,29,18.59Z"/></g><path class="cls-7" d="M70.33,20H61.44L69.9,9.45a2.33,2.33,0,1,0-3.64-2.92L54.75,20.88a2.34,2.34,0,0,0,1.83,3.8h9.2L51.6,45.31a1,1,0,0,0,.18,1.28,1,1,0,0,0,1.34-.12l19-22.72a2.25,2.25,0,0,0,.53-1.46A2.28,2.28,0,0,0,70.33,20Z"/><path class="cls-8" d="M65.92,48.44a11.15,11.15,0,0,0-8.28-10.77,7.88,7.88,0,0,0,.65-3.14A7.88,7.88,0,0,0,47.81,27,17.74,17.74,0,0,0,13,31.16a14.35,14.35,0,0,0,2.64,28.45l.4,0v0H54.88A11.16,11.16,0,0,0,65.92,48.44Z"/><path class="cls-9" d="M27.54,46.31H18.66l8.46-10.56a2.33,2.33,0,0,0-3.64-2.92L12,47.19A2.33,2.33,0,0,0,13.79,51H23L8.82,71.62A1,1,0,0,0,9,72.9a1,1,0,0,0,1.34-.13l19-22.71a2.29,2.29,0,0,0-1.76-3.75Z"/></g></svg>',fs='<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><defs><style>.cls-1{fill:none;}.cls-2{fill:#5eb4e9;}.cls-3{opacity:0.6;}.cls-4{fill:#a6a6a6;}.cls-5{opacity:0.15;}.cls-6{fill:#787878;}.cls-7{fill:#ffe77c;}.cls-8{fill:#6d6d6d;}.cls-9{fill:#ffd413;}</style></defs><title>16-storms-night</title><g id="Forecast_Icons_Outlined" data-name="Forecast Icons Outlined"><rect class="cls-1" width="96" height="96"/><path class="cls-2" d="M41.92,84.33a2.6,2.6,0,0,1-2.6-2.6V58.05a2.6,2.6,0,0,1,5.2,0V81.73A2.59,2.59,0,0,1,41.92,84.33Z"/><path class="cls-2" d="M52.3,78a2.61,2.61,0,0,1-2.6-2.6V65.23a2.6,2.6,0,1,1,5.2,0V75.39A2.6,2.6,0,0,1,52.3,78Z"/><g class="cls-3"><path class="cls-2" d="M31.55,73.88a2.59,2.59,0,0,1-2.6-2.6V57.44a2.6,2.6,0,1,1,5.19,0V71.28A2.59,2.59,0,0,1,31.55,73.88Z"/></g><g class="cls-3"><path class="cls-2" d="M31.55,84.29a2.61,2.61,0,1,1,2.59-2.63v0A2.6,2.6,0,0,1,31.55,84.29Z"/></g><path class="cls-4" d="M78.26,32.62A13.76,13.76,0,0,0,65.33,14.05c-.31,0-.61,0-.91,0a18.15,18.15,0,1,0-34.6,11V53.26h44a10.8,10.8,0,0,0,4.44-20.64Z"/><g class="cls-5"><path class="cls-6" d="M29,18.59c0,.29,0,.57,0,.86a18.21,18.21,0,0,0,.9,5.65V53.26H69.68c1.83-4.78,1.59-10.63-2.54-17.76C55.78,15.9,39.13,14,29,18.59Z"/></g><path class="cls-7" d="M70.33,20H61.44L69.9,9.45a2.33,2.33,0,1,0-3.64-2.92L54.75,20.88a2.34,2.34,0,0,0,1.83,3.8h9.2L51.6,45.31a1,1,0,0,0,.18,1.28,1,1,0,0,0,1.34-.12l19-22.72a2.25,2.25,0,0,0,.53-1.46A2.28,2.28,0,0,0,70.33,20Z"/><path class="cls-8" d="M65.92,48.44a11.15,11.15,0,0,0-8.28-10.77,7.88,7.88,0,0,0,.65-3.14A7.88,7.88,0,0,0,47.81,27,17.74,17.74,0,0,0,13,31.16a14.35,14.35,0,0,0,2.64,28.45l.4,0v0H54.88A11.16,11.16,0,0,0,65.92,48.44Z"/><path class="cls-9" d="M27.54,46.31H18.66l8.46-10.56a2.33,2.33,0,0,0-3.64-2.92L12,47.19A2.33,2.33,0,0,0,13.79,51H23L8.82,71.62A1,1,0,0,0,9,72.9a1,1,0,0,0,1.34-.13l19-22.71a2.29,2.29,0,0,0-1.76-3.75Z"/></g></svg>';const ys={[ls]:{[at]:ns,[ct]:'<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><defs><style>.cls-1{fill:none;}.cls-2{fill:#c8c8c8;}.cls-3{opacity:0.15;}.cls-4{fill:#9d9d9d;}.cls-5{fill:#dcdcdc;}</style></defs><title>04-cloudy</title><g id="Forecast_Icons_Outlined" data-name="Forecast Icons Outlined"><rect class="cls-1" width="96" height="96"/><circle class="cls-2" cx="80.75" cy="40.28" r="13.95"/><circle class="cls-2" cx="64.33" cy="29.05" r="20.64"/><g class="cls-3"><path class="cls-4" d="M91.1,49.57c-1.86-8.47-7.38-17-18.9-23.2-7.14-3.81-12.23-9.77-16.7-16A20.62,20.62,0,0,0,69.87,48.92a13.79,13.79,0,0,0,21.23.65Z"/></g><path class="cls-5" d="M88.37,62.3A14.91,14.91,0,0,0,77.31,47.91,10.56,10.56,0,0,0,64.17,33.65a23.69,23.69,0,0,0-46.48,5.57,19.16,19.16,0,0,0,3.53,38c.18,0,.36,0,.54,0v0H73.62A14.91,14.91,0,0,0,88.37,62.3Z"/></g></svg>',[lt]:'<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><defs><style>.cls-1{fill:none;}.cls-2{fill:#d3dbe2;}.cls-3{fill:#5eb4e9;}.cls-4{fill:#627e97;}</style></defs><title>19-tropical-cyclone</title><g id="Forecast_Icons_Outlined" data-name="Forecast Icons Outlined"><rect class="cls-1" width="96" height="96"/><path class="cls-2" d="M45,15.25A30.4,30.4,0,0,1,62.3,40.38c.08.8.12,1.62.12,2.44a23.74,23.74,0,0,1-1.53,8.38A33.19,33.19,0,0,0,66,49.4,30.56,30.56,0,0,0,40.56,5.65a.88.88,0,0,0-.68,1.48A33.36,33.36,0,0,1,45,15.25Z"/><path class="cls-2" d="M31.92,70.4A30.35,30.35,0,0,1,14.65,45.27a22,22,0,0,1-.13-2.45,23.73,23.73,0,0,1,1.54-8.37,33.3,33.3,0,0,0-5.15,1.8A30.57,30.57,0,0,0,36.39,80a.88.88,0,0,0,.68-1.48A33.06,33.06,0,0,1,31.92,70.4Z"/><path class="cls-3" d="M32.78,81.49a2.19,2.19,0,0,1-.36,0,32.46,32.46,0,0,1-4.85-1.31,2,2,0,1,1,1.3-3.68,29,29,0,0,0,4.27,1.15,2,2,0,0,1-.36,3.87Z"/><path class="cls-3" d="M21.36,76.79a2,2,0,0,1-1.09-.33,32.7,32.7,0,0,1-4.81-4c-.35-.34-.69-.7-1-1.07a2,2,0,0,1,2.88-2.63c.3.32.6.64.91,1a29.11,29.11,0,0,0,4.24,3.5,1.95,1.95,0,0,1-1.1,3.56Z"/><path class="cls-3" d="M11.4,65.68a1.94,1.94,0,0,1-1.73-1A32.61,32.61,0,0,1,5.93,49.47a2,2,0,0,1,3.9,0,28.63,28.63,0,0,0,3.29,13.35,2,2,0,0,1-.81,2.64A2,2,0,0,1,11.4,65.68Z"/><path class="cls-4" d="M74.17,44.23a32.7,32.7,0,0,1-13.28,7,23.74,23.74,0,0,0,1.53-8.38c0-.82,0-1.64-.12-2.44a30.58,30.58,0,0,0-61,.36.88.88,0,0,0,1.47.68,32.74,32.74,0,0,1,13.29-7,23.73,23.73,0,0,0-1.54,8.37,22,22,0,0,0,.13,2.45,30.58,30.58,0,0,0,61-.36A.88.88,0,0,0,74.17,44.23Zm-28.83,6a.25.25,0,0,1,.16.43A8.67,8.67,0,0,1,33.67,38h0a6.64,6.64,0,0,1,2-1.35,9.1,9.1,0,0,0-4.06-1.29.25.25,0,0,1-.16-.43A8.67,8.67,0,0,1,43.27,47.62h0a6.56,6.56,0,0,1-2,1.35A9.18,9.18,0,0,0,45.34,50.26Z"/></g></svg>',[rt]:'<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><defs><style>.cls-1{fill:none;}.cls-2{opacity:0.15;}.cls-3{fill:#c4cdca;}.cls-4{opacity:0.2;}.cls-5{fill:#ffe58d;}.cls-6{opacity:0.4;}.cls-7{opacity:0.6;}.cls-8{fill:#bac5d7;}</style></defs><title>10-fog</title><g id="Forecast_Icons_Outlined" data-name="Forecast Icons Outlined"><rect class="cls-1" width="96" height="96"/><g class="cls-2"><circle class="cls-3" cx="43.44" cy="42.81" r="41.51"/></g><g class="cls-4"><circle class="cls-5" cx="43.44" cy="42.81" r="27.74"/></g><g class="cls-6"><path class="cls-5" d="M15.7,42.81a27.74,27.74,0,0,1,55.48,0Z"/></g><g class="cls-7"><path class="cls-8" d="M29,24.61h-8.1a2.6,2.6,0,0,1,0-5.2H29a2.6,2.6,0,0,1,0,5.2Z"/></g><g class="cls-7"><path class="cls-8" d="M65.51,66.21H42.81a2.6,2.6,0,0,1,0-5.2h22.7a2.6,2.6,0,0,1,0,5.2Z"/></g><g class="cls-7"><path class="cls-8" d="M35.84,76.61H23.67a2.6,2.6,0,1,1,0-5.2H35.84a2.6,2.6,0,0,1,0,5.2Z"/></g><path class="cls-8" d="M68.92,35h4.21a2.6,2.6,0,1,0,0-5.2H68.92a2.6,2.6,0,1,0,0,5.2Z"/><path class="cls-8" d="M12.72,35H36.65a2.6,2.6,0,1,0,0-5.2H12.72a2.6,2.6,0,0,0,0,5.2Z"/><path class="cls-8" d="M36.81,24.61h9.73a2.6,2.6,0,1,1,0,5.2v.05A2.6,2.6,0,0,0,47,35H58.54a2.6,2.6,0,1,0,0-5.2h-.65a2.6,2.6,0,0,1,0-5.2h4.7a2.6,2.6,0,0,0,0-5.2H36.81a2.6,2.6,0,0,0,0,5.2Z"/><path class="cls-8" d="M62.76,50.61H59.19a2.6,2.6,0,0,1,0-5.2H73a2.6,2.6,0,0,0,0-5.2H38.29a2.6,2.6,0,0,0,0,5.2h2.82a2.6,2.6,0,0,1,0,5.2H26.43a2.6,2.6,0,0,1,0-5.2h1.79a2.6,2.6,0,0,0,0-5.2H7.48a2.6,2.6,0,0,0,0,5.2H9.33a2.6,2.6,0,0,1,0,5.2H2.76a2.6,2.6,0,0,0,0,5.2H16.38a2.6,2.6,0,1,1,0,5.2h-.65a2.6,2.6,0,0,0,0,5.2H32.92a2.6,2.6,0,0,0,0-5.2H29.75a2.6,2.6,0,0,1,0-5.2h33a2.6,2.6,0,0,0,0-5.2Z"/><path class="cls-8" d="M84.16,50.61h-11a2.6,2.6,0,1,0,0,5.2h11a2.6,2.6,0,1,0,0-5.2Z"/></g></svg>',[nt]:ps,[ot]:us,[dt]:us,[ht]:'<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><defs><style>.cls-1{fill:none;}.cls-2{fill:#ffe58d;}.cls-3{opacity:0.58;}.cls-4{fill:#ffdf64;}.cls-5{fill:#efefef;}</style></defs><title>03-partly-cloudy</title><g id="Forecast_Icons_Outlined" data-name="Forecast Icons Outlined"><rect class="cls-1" width="96" height="96"/><circle class="cls-2" cx="66.36" cy="29.04" r="27.74"/><g class="cls-3"><path class="cls-4" d="M38.62,29a27.73,27.73,0,0,0,54,8.88c-11.88-1.79-24.47-6.44-34.94-16.65-3.46-3.38-7.34-7.4-11.33-11.41A27.61,27.61,0,0,0,38.62,29Z"/></g><path class="cls-5" d="M87.61,62.3A14.9,14.9,0,0,0,76.55,47.91a10.47,10.47,0,0,0,.87-4.19,10.52,10.52,0,0,0-14-10.07,23.69,23.69,0,0,0-46.48,5.57,19.16,19.16,0,0,0,3.53,38c.18,0,.35,0,.53,0v0H72.87A14.91,14.91,0,0,0,87.61,62.3Z"/></g></svg>',[pt]:os,[gt]:'<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><defs><style>.cls-1{fill:#ffe58d;}.cls-2{opacity:0.58;}.cls-3{fill:#ffdf64;}.cls-4{opacity:0.6;}.cls-5{fill:#efefef;}.cls-6{fill:none;}</style></defs><title>05-mostly-sunny</title><g id="Forecast_Icons_Outlined" data-name="Forecast Icons Outlined"><circle class="cls-1" cx="54.65" cy="29.04" r="27.74"/><g class="cls-2"><path class="cls-3" d="M26.91,29a27.73,27.73,0,0,0,54,8.88C69,36.13,56.44,31.48,46,21.27c-3.46-3.38-7.34-7.4-11.33-11.41A27.61,27.61,0,0,0,26.91,29Z"/></g><g class="cls-4"><path class="cls-5" d="M88,52.09H62.69a2.6,2.6,0,1,1,0-5.2H88a2.6,2.6,0,1,1,0,5.2Z"/></g><path class="cls-5" d="M80.21,57.29H64.48a10.69,10.69,0,0,0,1.6-5.63A10.83,10.83,0,0,0,55.24,40.83a10.69,10.69,0,0,0-5.16,1.31,8.6,8.6,0,0,0-14.42-5.91,14.46,14.46,0,0,0-26,10.83c-.2,0-.41,0-.62,0A7.73,7.73,0,0,0,9,62.49h14.9a2.6,2.6,0,1,1,0,5.2H19.61a2.6,2.6,0,0,0,0,5.2H58.05a2.6,2.6,0,0,0,0-5.2H54.32a2.6,2.6,0,0,1,0-5.2h25.9a2.6,2.6,0,1,0,0-5.2Z"/><g class="cls-4"><path class="cls-5" d="M9.23,72.89H4.8a2.6,2.6,0,1,1,0-5.2H9.23a2.6,2.6,0,0,1,0,5.2Z"/></g><g class="cls-4"><path class="cls-5" d="M72.37,72.89h-5.3a2.6,2.6,0,0,1,0-5.2h5.3a2.6,2.6,0,0,1,0,5.2Z"/></g><g class="cls-4"><path class="cls-5" d="M91.88,72.89H81.4a2.6,2.6,0,0,1,0-5.2H91.88a2.6,2.6,0,0,1,0,5.2Z"/></g><g class="cls-4"><path class="cls-5" d="M74.29,83.29H44.53a2.6,2.6,0,0,1,0-5.2H74.29a2.6,2.6,0,0,1,0,5.2Z"/></g><g class="cls-4"><path class="cls-5" d="M34.15,83.29H24.5a2.6,2.6,0,0,1,0-5.2h9.65a2.6,2.6,0,0,1,0,5.2Z"/></g><g class="cls-4"><path class="cls-5" d="M84.75,83.29h-1a2.6,2.6,0,0,1,0-5.2h1a2.6,2.6,0,0,1,0,5.2Z"/></g><rect class="cls-6" width="96" height="96"/></g></svg>',[ut]:'<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><defs><style>.cls-1{fill:none;}.cls-2{fill:#ffe58d;}.cls-3{fill:#ffdf64;}.cls-4{fill:#5eb4e9;}.cls-5{opacity:0.6;}.cls-6{fill:#c8c8c8;}.cls-7{opacity:0.15;}.cls-8{fill:#9d9d9d;}.cls-9{fill:#aaa;}</style></defs><title>18-heavy-showers</title><g id="Forecast_Icons_Outlined" data-name="Forecast Icons Outlined"><rect class="cls-1" y="-0.02" width="96" height="96"/><circle class="cls-2" cx="64.06" cy="18.34" r="17.06"/><path class="cls-3" d="M47,18.34a17.05,17.05,0,0,0,33.21,5.47A38.32,38.32,0,0,1,58.72,13.56c-2.13-2.07-4.51-4.55-7-7A17,17,0,0,0,47,18.34Z"/><path class="cls-4" d="M21.71,87.42a2.6,2.6,0,0,1-2.6-2.6V53.53a2.6,2.6,0,0,1,5.2,0V84.82A2.59,2.59,0,0,1,21.71,87.42Z"/><path class="cls-4" d="M32.09,81.46a2.6,2.6,0,0,1-2.6-2.6V65.92a2.6,2.6,0,1,1,5.2,0V78.86A2.59,2.59,0,0,1,32.09,81.46Z"/><g class="cls-5"><path class="cls-4" d="M32.09,94.76a2.61,2.61,0,0,1-2.6-2.6V89.24a2.6,2.6,0,0,1,5.2,0v2.92A2.6,2.6,0,0,1,32.09,94.76Z"/></g><g class="cls-5"><path class="cls-4" d="M42.47,69.42a2.6,2.6,0,0,1-2.6-2.6V53.53a2.6,2.6,0,0,1,5.2,0V66.82A2.59,2.59,0,0,1,42.47,69.42Z"/></g><path class="cls-4" d="M52.85,77.69a2.59,2.59,0,0,1-2.6-2.6V53.53a2.6,2.6,0,0,1,5.2,0V75.09A2.6,2.6,0,0,1,52.85,77.69Z"/><g class="cls-5"><path class="cls-4" d="M52.85,93.75a2.6,2.6,0,0,1-2.6-2.6V85.47a2.6,2.6,0,0,1,5.2,0v5.68A2.61,2.61,0,0,1,52.85,93.75Z"/></g><g class="cls-5"><path class="cls-4" d="M63.23,91.48a2.6,2.6,0,0,1-2.6-2.6V75.47a2.6,2.6,0,0,1,5.2,0V88.88A2.61,2.61,0,0,1,63.23,91.48Z"/></g><path class="cls-4" d="M63.23,67.69a2.59,2.59,0,0,1-2.6-2.6V59.47a2.6,2.6,0,0,1,5.2,0v5.62A2.6,2.6,0,0,1,63.23,67.69Z"/><g class="cls-5"><path class="cls-4" d="M11.34,72.67a2.6,2.6,0,0,1-2.6-2.6V65.89a2.6,2.6,0,1,1,5.19,0v4.18A2.6,2.6,0,0,1,11.34,72.67Z"/></g><path class="cls-4" d="M11.34,92.72a2.59,2.59,0,0,1-2.6-2.6V80.44a2.6,2.6,0,1,1,5.19,0v9.68A2.59,2.59,0,0,1,11.34,92.72Z"/><g class="cls-5"><path class="cls-4" d="M42.47,80a2.6,2.6,0,0,1-2.6-2.6V77.2a2.6,2.6,0,1,1,5.2,0v.16A2.59,2.59,0,0,1,42.47,80Z"/></g><path class="cls-4" d="M42.47,90.83a2.61,2.61,0,0,1-2.6-2.6v-.49a2.6,2.6,0,0,1,5.2,0v.49A2.6,2.6,0,0,1,42.47,90.83Z"/><path class="cls-6" d="M71.43,35.69a12.24,12.24,0,0,0,.79-4.34A12.57,12.57,0,0,0,59.65,18.77c-.28,0-.55,0-.83,0a16.54,16.54,0,1,0-31.53,10V54.5h40.1a9.84,9.84,0,0,0,4-18.81Z"/><g class="cls-7"><path class="cls-8" d="M26.51,22.91c0,.26,0,.52,0,.78a16.53,16.53,0,0,0,.82,5.15V54.5H63.61c1.68-4.35,1.45-9.69-2.31-16.19C51,20.45,35.78,18.74,26.51,22.91Z"/></g><path class="cls-9" d="M60.19,50.11a10.16,10.16,0,0,0-7.55-9.82,7.17,7.17,0,0,0,.59-2.86A7.26,7.26,0,0,0,46,30.16a7.18,7.18,0,0,0-2.28.4A16.16,16.16,0,0,0,12,34.36a13.08,13.08,0,0,0,2.41,25.93l.36,0v0H50.13A10.17,10.17,0,0,0,60.19,50.11Z"/></g></svg>',[ft]:'<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><defs><style>.cls-1{fill:none;}.cls-2{opacity:0.6;}.cls-3{fill:#5eb4e9;}.cls-4{fill:#c8c8c8;}.cls-5{opacity:0.15;}.cls-6{fill:#9d9d9d;}.cls-7{fill:#aaa;}</style></defs><title>12-rain</title><g id="Forecast_Icons_Outlined" data-name="Forecast Icons Outlined"><rect class="cls-1" width="96" height="96"/><g class="cls-2"><path class="cls-3" d="M24.39,62.32a2.58,2.58,0,0,1-2.6-2.57v-.06a2.6,2.6,0,1,1,2.6,2.63Z"/></g><path class="cls-3" d="M24.39,87.7a2.61,2.61,0,0,1-2.6-2.6v-15a2.6,2.6,0,0,1,5.2,0v15A2.6,2.6,0,0,1,24.39,87.7Z"/><g class="cls-2"><path class="cls-3" d="M34.77,70.72a2.59,2.59,0,0,1-2.6-2.6V45.31a2.6,2.6,0,1,1,5.2,0V68.12A2.59,2.59,0,0,1,34.77,70.72Z"/></g><path class="cls-3" d="M34.77,86.62a2.6,2.6,0,0,1-2.6-2.6V78.5a2.6,2.6,0,1,1,5.2,0V84A2.6,2.6,0,0,1,34.77,86.62Z"/><path class="cls-3" d="M45.15,66.4a2.59,2.59,0,0,1-2.6-2.6V45.31a2.6,2.6,0,0,1,5.2,0V63.8A2.6,2.6,0,0,1,45.15,66.4Z"/><g class="cls-2"><path class="cls-3" d="M45.15,95.26a2.59,2.59,0,0,1-2.6-2.6V74.18a2.6,2.6,0,1,1,5.2,0V92.66A2.6,2.6,0,0,1,45.15,95.26Z"/></g><path class="cls-3" d="M55.53,75.81a2.6,2.6,0,0,1-2.6-2.6V45.31a2.6,2.6,0,0,1,5.2,0v27.9A2.61,2.61,0,0,1,55.53,75.81Z"/><g class="cls-2"><path class="cls-3" d="M55.53,92a2.59,2.59,0,0,1-2.6-2.6V83.58a2.6,2.6,0,0,1,5.2,0v5.84A2.6,2.6,0,0,1,55.53,92Z"/></g><path class="cls-3" d="M65.91,88.89a2.6,2.6,0,0,1-2.6-2.6v-41a2.6,2.6,0,1,1,5.19,0v41A2.6,2.6,0,0,1,65.91,88.89Z"/><path class="cls-3" d="M14,81.54a2.61,2.61,0,0,1-2.6-2.6V45.31a2.6,2.6,0,0,1,5.2,0V78.94A2.6,2.6,0,0,1,14,81.54Z"/><path class="cls-4" d="M71.67,29.66A12.55,12.55,0,0,0,59.88,12.73c-.28,0-.55,0-.82,0a16.54,16.54,0,1,0-31.53,10V48.46H67.62a9.84,9.84,0,0,0,4-18.8Z"/><g class="cls-5"><path class="cls-6" d="M26.74,16.87c0,.26,0,.52,0,.78a16.54,16.54,0,0,0,.83,5.15V48.46H63.84c1.68-4.35,1.45-9.69-2.31-16.19C51.18,14.41,36,12.7,26.74,16.87Z"/></g><path class="cls-7" d="M60.42,44.07a10.17,10.17,0,0,0-7.54-9.82A7.26,7.26,0,0,0,46.2,24.12a7.14,7.14,0,0,0-2.28.4,16.17,16.17,0,0,0-31.72,3.8,13.08,13.08,0,0,0,2.41,25.93l.36,0v0H50.36A10.17,10.17,0,0,0,60.42,44.07Z"/></g></svg>',[yt]:ps,[vt]:ps,[wt]:rs,[mt]:ds,[bt]:ds},["night"]:{[at]:ns,[ct]:'<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><defs><style>.cls-1{fill:none;}.cls-2{fill:#a6a6a6;}.cls-3{opacity:0.15;}.cls-4{fill:#787878;}.cls-5{fill:#c9c9c9;}</style></defs><title>04-cloudy-night</title><g id="Forecast_Icons_Outlined" data-name="Forecast Icons Outlined"><rect class="cls-1" width="96" height="96"/><circle class="cls-2" cx="80.75" cy="40.28" r="13.95"/><circle class="cls-2" cx="64.33" cy="29.05" r="20.64"/><g class="cls-3"><path class="cls-4" d="M91.1,49.57c-1.86-8.47-7.38-17-18.9-23.2-7.14-3.81-12.23-9.77-16.7-16A20.62,20.62,0,0,0,69.87,48.92a13.79,13.79,0,0,0,21.23.65Z"/></g><path class="cls-5" d="M88.37,62.3A14.91,14.91,0,0,0,77.31,47.91,10.56,10.56,0,0,0,64.17,33.65a23.69,23.69,0,0,0-46.48,5.57,19.16,19.16,0,0,0,3.53,38c.18,0,.36,0,.54,0v0H73.62A14.91,14.91,0,0,0,88.37,62.3Z"/></g></svg>',[lt]:'<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><defs><style>.cls-1{fill:none;}.cls-2{fill:#496a87;}.cls-3{fill:#5eb4e9;}.cls-4{fill:#00253f;}</style></defs><title>19-tropical-cyclone-night</title><g id="Forecast_Icons_Outlined" data-name="Forecast Icons Outlined"><rect class="cls-1" width="96" height="96"/><path class="cls-2" d="M45,15.25A30.4,30.4,0,0,1,62.3,40.38c.08.8.12,1.62.12,2.44a23.74,23.74,0,0,1-1.53,8.38A33.19,33.19,0,0,0,66,49.4,30.56,30.56,0,0,0,40.56,5.65a.88.88,0,0,0-.68,1.48A33.36,33.36,0,0,1,45,15.25Z"/><path class="cls-2" d="M31.92,70.4A30.35,30.35,0,0,1,14.65,45.27a22,22,0,0,1-.13-2.45,23.73,23.73,0,0,1,1.54-8.37,33.3,33.3,0,0,0-5.15,1.8A30.57,30.57,0,0,0,36.39,80a.88.88,0,0,0,.68-1.48A33.06,33.06,0,0,1,31.92,70.4Z"/><path class="cls-3" d="M32.78,81.49a2.19,2.19,0,0,1-.36,0,32.46,32.46,0,0,1-4.85-1.31,2,2,0,1,1,1.3-3.68,29,29,0,0,0,4.27,1.15,2,2,0,0,1-.36,3.87Z"/><path class="cls-3" d="M21.36,76.79a2,2,0,0,1-1.09-.33,33.28,33.28,0,0,1-4.81-4c-.35-.35-.69-.71-1-1.08a2,2,0,0,1,2.88-2.63c.3.32.6.64.91,1a29.11,29.11,0,0,0,4.24,3.5,1.95,1.95,0,0,1-1.1,3.56Z"/><path class="cls-3" d="M11.4,65.68a1.94,1.94,0,0,1-1.73-1A32.61,32.61,0,0,1,5.93,49.47a2,2,0,0,1,3.9,0,28.63,28.63,0,0,0,3.29,13.35,2,2,0,0,1-.81,2.64A2,2,0,0,1,11.4,65.68Z"/><path class="cls-4" d="M74.17,44.23a32.7,32.7,0,0,1-13.28,7,23.74,23.74,0,0,0,1.53-8.38c0-.82,0-1.64-.12-2.44a30.58,30.58,0,0,0-61,.36.88.88,0,0,0,1.47.68,32.74,32.74,0,0,1,13.29-7,23.73,23.73,0,0,0-1.54,8.37,22,22,0,0,0,.13,2.45,30.58,30.58,0,0,0,61-.36A.88.88,0,0,0,74.17,44.23Zm-28.83,6a.25.25,0,0,1,.16.43A8.67,8.67,0,0,1,33.67,38h0a6.64,6.64,0,0,1,2-1.35,9.1,9.1,0,0,0-4.06-1.29.25.25,0,0,1-.16-.43A8.67,8.67,0,0,1,43.27,47.62h0a6.56,6.56,0,0,1-2,1.35A9.18,9.18,0,0,0,45.34,50.26Z"/></g></svg>',[rt]:'<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><defs><style>.cls-1{opacity:0.2;}.cls-2{fill:#eaeaea;}.cls-2,.cls-4{fill-rule:evenodd;}.cls-3{opacity:0.6;}.cls-4{fill:#fffbf1;}.cls-5{opacity:0.85;}.cls-6{fill:none;}.cls-7{fill:#c2c7d1;}.cls-8{opacity:0.9;}</style></defs><title>10-fog-night</title><g id="Forecast_Icons_Outlined" data-name="Forecast Icons Outlined"><g class="cls-1"><path class="cls-2" d="M14.08,13.45a41.51,41.51,0,1,1,0,58.71,41.52,41.52,0,0,1,0-58.71"/></g><g class="cls-3"><path class="cls-4" d="M23.82,23.19a27.74,27.74,0,1,1,0,39.23,27.75,27.75,0,0,1,0-39.23"/><g class="cls-5"><path class="cls-2" d="M45.73,15.18A40.45,40.45,0,0,0,47.4,70.23a27.71,27.71,0,0,0-1.67-55Z"/></g></g><rect class="cls-6" width="96" height="96"/><g class="cls-3"><path class="cls-7" d="M29,24.61h-8.1a2.6,2.6,0,0,1,0-5.2H29a2.6,2.6,0,0,1,0,5.2Z"/></g><g class="cls-3"><path class="cls-7" d="M65.51,66.21H42.81a2.6,2.6,0,0,1,0-5.2h22.7a2.6,2.6,0,0,1,0,5.2Z"/></g><g class="cls-3"><path class="cls-7" d="M35.84,76.61H23.67a2.6,2.6,0,1,1,0-5.2H35.84a2.6,2.6,0,0,1,0,5.2Z"/></g><g class="cls-8"><path class="cls-7" d="M68.92,35h4.21a2.6,2.6,0,1,0,0-5.2H68.92a2.6,2.6,0,1,0,0,5.2Z"/><path class="cls-7" d="M12.72,35H36.65a2.6,2.6,0,1,0,0-5.2H12.72a2.6,2.6,0,0,0,0,5.2Z"/><path class="cls-7" d="M36.81,24.61h9.73a2.6,2.6,0,1,1,0,5.2v.05A2.6,2.6,0,0,0,47,35H58.54a2.6,2.6,0,1,0,0-5.2h-.65a2.6,2.6,0,0,1,0-5.2h4.7a2.6,2.6,0,0,0,0-5.2H36.81a2.6,2.6,0,0,0,0,5.2Z"/><path class="cls-7" d="M62.76,50.61H59.19a2.6,2.6,0,0,1,0-5.2H73a2.6,2.6,0,0,0,0-5.2H38.29a2.6,2.6,0,0,0,0,5.2h2.82a2.6,2.6,0,0,1,0,5.2H26.43a2.6,2.6,0,0,1,0-5.2h1.79a2.6,2.6,0,0,0,0-5.2H7.48a2.6,2.6,0,0,0,0,5.2H9.33a2.6,2.6,0,0,1,0,5.2H2.76a2.6,2.6,0,0,0,0,5.2H16.38a2.6,2.6,0,1,1,0,5.2h-.65a2.6,2.6,0,0,0,0,5.2H32.92a2.6,2.6,0,0,0,0-5.2H29.75a2.6,2.6,0,0,1,0-5.2h33a2.6,2.6,0,0,0,0-5.2Z"/><path class="cls-7" d="M84.16,50.61h-11a2.6,2.6,0,1,0,0,5.2h11a2.6,2.6,0,1,0,0-5.2Z"/></g></g></svg>',[nt]:gs,[ot]:fs,[dt]:fs,[ht]:os,[pt]:os,[gt]:'<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><defs><style>.cls-1{fill:#fffbf1;}.cls-1,.cls-3{fill-rule:evenodd;}.cls-2{opacity:0.85;}.cls-3{fill:#eaeaea;}.cls-4{opacity:0.6;}.cls-5{fill:#c9c9c9;}.cls-6{fill:none;}</style></defs><title>05-mostly-sunny-night</title><g id="Forecast_Icons_Outlined" data-name="Forecast Icons Outlined"><path class="cls-1" d="M35,9.42a27.74,27.74,0,1,1,0,39.23A27.75,27.75,0,0,1,35,9.42"/><g class="cls-2"><path class="cls-3" d="M56.94,1.41a40.46,40.46,0,0,0,1.68,55.05,27.71,27.71,0,0,0-1.68-55Z"/></g><g class="cls-4"><path class="cls-5" d="M88,52.09H62.69a2.6,2.6,0,1,1,0-5.2H88a2.6,2.6,0,1,1,0,5.2Z"/></g><path class="cls-5" d="M80.21,57.29H64.48a10.69,10.69,0,0,0,1.6-5.63A10.83,10.83,0,0,0,55.24,40.83a10.69,10.69,0,0,0-5.16,1.31,8.6,8.6,0,0,0-14.42-5.91,14.46,14.46,0,0,0-26,10.83c-.2,0-.41,0-.62,0A7.73,7.73,0,0,0,9,62.49h14.9a2.6,2.6,0,1,1,0,5.2H19.61a2.6,2.6,0,0,0,0,5.2H58.05a2.6,2.6,0,0,0,0-5.2H54.32a2.6,2.6,0,0,1,0-5.2h25.9a2.6,2.6,0,1,0,0-5.2Z"/><g class="cls-4"><path class="cls-5" d="M9.23,72.89H4.8a2.6,2.6,0,1,1,0-5.2H9.23a2.6,2.6,0,0,1,0,5.2Z"/></g><g class="cls-4"><path class="cls-5" d="M72.37,72.89h-5.3a2.6,2.6,0,0,1,0-5.2h5.3a2.6,2.6,0,0,1,0,5.2Z"/></g><g class="cls-4"><path class="cls-5" d="M91.88,72.89H81.4a2.6,2.6,0,0,1,0-5.2H91.88a2.6,2.6,0,0,1,0,5.2Z"/></g><g class="cls-4"><path class="cls-5" d="M74.29,83.29H44.53a2.6,2.6,0,0,1,0-5.2H74.29a2.6,2.6,0,0,1,0,5.2Z"/></g><g class="cls-4"><path class="cls-5" d="M34.15,83.29H24.5a2.6,2.6,0,0,1,0-5.2h9.65a2.6,2.6,0,0,1,0,5.2Z"/></g><g class="cls-4"><path class="cls-5" d="M84.75,83.29h-1a2.6,2.6,0,0,1,0-5.2h1a2.6,2.6,0,0,1,0,5.2Z"/></g><rect class="cls-6" width="96" height="96"/></g></svg>',[ut]:'<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><defs><style>.cls-1{fill:none;}.cls-2{fill:#5eb4e9;}.cls-3{opacity:0.6;}.cls-4{fill:#fffbf1;}.cls-4,.cls-6{fill-rule:evenodd;}.cls-5{opacity:0.85;}.cls-6{fill:#eaeaea;}.cls-7{fill:#a6a6a6;}.cls-8{opacity:0.15;}.cls-9{fill:#787878;}.cls-10{fill:#6d6d6d;}</style></defs><title>18-heavy-showers-night</title><g id="Forecast_Icons_Outlined" data-name="Forecast Icons Outlined"><rect class="cls-1" y="-0.02" width="96" height="96"/><path class="cls-2" d="M21.71,87.42a2.6,2.6,0,0,1-2.6-2.6V53.53a2.6,2.6,0,0,1,5.2,0V84.82A2.59,2.59,0,0,1,21.71,87.42Z"/><path class="cls-2" d="M32.09,81.46a2.6,2.6,0,0,1-2.6-2.6V65.92a2.6,2.6,0,1,1,5.2,0V78.86A2.59,2.59,0,0,1,32.09,81.46Z"/><g class="cls-3"><path class="cls-2" d="M32.09,94.76a2.61,2.61,0,0,1-2.6-2.6V89.24a2.6,2.6,0,0,1,5.2,0v2.92A2.6,2.6,0,0,1,32.09,94.76Z"/></g><g class="cls-3"><path class="cls-2" d="M42.47,69.42a2.6,2.6,0,0,1-2.6-2.6V53.53a2.6,2.6,0,0,1,5.2,0V66.82A2.59,2.59,0,0,1,42.47,69.42Z"/></g><path class="cls-2" d="M52.85,77.69a2.59,2.59,0,0,1-2.6-2.6V53.53a2.6,2.6,0,0,1,5.2,0V75.09A2.6,2.6,0,0,1,52.85,77.69Z"/><g class="cls-3"><path class="cls-2" d="M52.85,93.75a2.6,2.6,0,0,1-2.6-2.6V85.47a2.6,2.6,0,0,1,5.2,0v5.68A2.61,2.61,0,0,1,52.85,93.75Z"/></g><g class="cls-3"><path class="cls-2" d="M63.23,91.48a2.6,2.6,0,0,1-2.6-2.6V75.47a2.6,2.6,0,0,1,5.2,0V88.88A2.61,2.61,0,0,1,63.23,91.48Z"/></g><path class="cls-2" d="M63.23,67.69a2.59,2.59,0,0,1-2.6-2.6V59.47a2.6,2.6,0,0,1,5.2,0v5.62A2.6,2.6,0,0,1,63.23,67.69Z"/><g class="cls-3"><path class="cls-2" d="M11.34,72.67a2.6,2.6,0,0,1-2.6-2.6V65.89a2.6,2.6,0,1,1,5.19,0v4.18A2.6,2.6,0,0,1,11.34,72.67Z"/></g><path class="cls-2" d="M11.34,92.72a2.59,2.59,0,0,1-2.6-2.6V80.44a2.6,2.6,0,1,1,5.19,0v9.68A2.59,2.59,0,0,1,11.34,92.72Z"/><g class="cls-3"><path class="cls-2" d="M42.47,80a2.6,2.6,0,0,1-2.6-2.6V77.2a2.6,2.6,0,1,1,5.2,0v.16A2.59,2.59,0,0,1,42.47,80Z"/></g><path class="cls-2" d="M42.47,90.83a2.61,2.61,0,0,1-2.6-2.6v-.49a2.6,2.6,0,0,1,5.2,0v.49A2.6,2.6,0,0,1,42.47,90.83Z"/><path class="cls-4" d="M52,6.29a17.06,17.06,0,1,1,0,24.13A17.07,17.07,0,0,1,52,6.29"/><g class="cls-5"><path class="cls-6" d="M65.47,1.36a24.89,24.89,0,0,0,1,33.87,17.05,17.05,0,0,0-1-33.87Z"/></g><path class="cls-7" d="M71.43,35.69a12.24,12.24,0,0,0,.79-4.34A12.57,12.57,0,0,0,59.65,18.77c-.28,0-.55,0-.83,0a16.54,16.54,0,1,0-31.53,10V54.5h40.1a9.84,9.84,0,0,0,4-18.81Z"/><g class="cls-8"><path class="cls-9" d="M26.51,22.91c0,.26,0,.52,0,.78a16.53,16.53,0,0,0,.82,5.15V54.5H63.61c1.68-4.35,1.45-9.69-2.31-16.19C51,20.45,35.78,18.74,26.51,22.91Z"/></g><path class="cls-10" d="M60.19,50.11a10.16,10.16,0,0,0-7.55-9.82,7.17,7.17,0,0,0,.59-2.86A7.26,7.26,0,0,0,46,30.16a7.18,7.18,0,0,0-2.28.4A16.16,16.16,0,0,0,12,34.36a13.08,13.08,0,0,0,2.41,25.93l.36,0v0H50.13A10.17,10.17,0,0,0,60.19,50.11Z"/></g></svg>',[ft]:'<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><defs><style>.cls-1{fill:none;}.cls-2{opacity:0.6;}.cls-3{fill:#5eb4e9;}.cls-4{fill:#a6a6a6;}.cls-5{opacity:0.15;}.cls-6{fill:#787878;}.cls-7{fill:#6d6d6d;}</style></defs><title>12-rain-night</title><g id="Forecast_Icons_Outlined" data-name="Forecast Icons Outlined"><rect class="cls-1" width="96" height="96"/><g class="cls-2"><path class="cls-3" d="M24.39,62.32a2.58,2.58,0,0,1-2.6-2.57v-.06a2.6,2.6,0,1,1,2.6,2.63Z"/></g><path class="cls-3" d="M24.39,87.7a2.61,2.61,0,0,1-2.6-2.6v-15a2.6,2.6,0,0,1,5.2,0v15A2.6,2.6,0,0,1,24.39,87.7Z"/><g class="cls-2"><path class="cls-3" d="M34.77,70.72a2.59,2.59,0,0,1-2.6-2.6V45.31a2.6,2.6,0,1,1,5.2,0V68.12A2.59,2.59,0,0,1,34.77,70.72Z"/></g><path class="cls-3" d="M34.77,86.62a2.6,2.6,0,0,1-2.6-2.6V78.5a2.6,2.6,0,1,1,5.2,0V84A2.6,2.6,0,0,1,34.77,86.62Z"/><path class="cls-3" d="M45.15,66.4a2.59,2.59,0,0,1-2.6-2.6V45.31a2.6,2.6,0,0,1,5.2,0V63.8A2.6,2.6,0,0,1,45.15,66.4Z"/><g class="cls-2"><path class="cls-3" d="M45.15,95.26a2.59,2.59,0,0,1-2.6-2.6V74.18a2.6,2.6,0,1,1,5.2,0V92.66A2.6,2.6,0,0,1,45.15,95.26Z"/></g><path class="cls-3" d="M55.53,75.81a2.6,2.6,0,0,1-2.6-2.6V45.31a2.6,2.6,0,0,1,5.2,0v27.9A2.61,2.61,0,0,1,55.53,75.81Z"/><g class="cls-2"><path class="cls-3" d="M55.53,92a2.59,2.59,0,0,1-2.6-2.6V83.58a2.6,2.6,0,0,1,5.2,0v5.84A2.6,2.6,0,0,1,55.53,92Z"/></g><path class="cls-3" d="M65.91,88.89a2.6,2.6,0,0,1-2.6-2.6v-41a2.6,2.6,0,1,1,5.19,0v41A2.6,2.6,0,0,1,65.91,88.89Z"/><path class="cls-3" d="M14,81.54a2.61,2.61,0,0,1-2.6-2.6V45.31a2.6,2.6,0,0,1,5.2,0V78.94A2.6,2.6,0,0,1,14,81.54Z"/><path class="cls-4" d="M71.67,29.66A12.55,12.55,0,0,0,59.88,12.73c-.28,0-.55,0-.82,0a16.54,16.54,0,1,0-31.53,10V48.46H67.62a9.84,9.84,0,0,0,4-18.8Z"/><g class="cls-5"><path class="cls-6" d="M26.74,16.87c0,.26,0,.52,0,.78a16.54,16.54,0,0,0,.83,5.15V48.46H63.84c1.68-4.35,1.45-9.69-2.31-16.19C51.18,14.41,36,12.7,26.74,16.87Z"/></g><path class="cls-7" d="M60.42,44.07a10.17,10.17,0,0,0-7.54-9.82A7.26,7.26,0,0,0,46.2,24.12a7.14,7.14,0,0,0-2.28.4,16.17,16.17,0,0,0-31.72,3.8,13.08,13.08,0,0,0,2.41,25.93l.36,0v0H50.36A10.17,10.17,0,0,0,60.42,44.07Z"/></g></svg>',[yt]:gs,[vt]:gs,[wt]:rs,[mt]:hs,[bt]:hs}};let vs=class extends me{constructor(){super(...arguments),this.useHAWeatherIcons=!1,this.iconSize=Rt,this.dayMode=ls}render(){return this.weatherIcon?se`<div class=${g("weather-icon-element",this.iconSize,this.weatherIcon)}>
      ${this.useHAWeatherIcons?se`<ha-icon icon="mdi:weather-${this.weatherIcon}"></ha-icon>`:se`${ts(ys[this.dayMode][this.weatherIcon])}`}
    </div>`:ae}static get styles(){return b`
      ${Gt}

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
    `}};o([Ee({type:String})],vs.prototype,"weatherIcon",void 0),o([Ee({type:Boolean})],vs.prototype,"useHAWeatherIcons",void 0),o([Ee({type:String})],vs.prototype,"iconSize",void 0),o([Ee({type:String})],vs.prototype,"dayMode",void 0),vs=o([_e("bwc-weather-icon-element")],vs);const ws=Pt();r.setLevel("warn"),window.bomWeatherCardLog=r,console.info(`%c  BOM-WEATHER-CARD \n%c  ${ws("common.version")} ${n}    `,"color: fuchsia; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"bom-weather-card",name:ws("common.title"),description:ws("common.description"),documentationURL:"https://github.com/dJPoida/ha-bom-weather-card",preview:!0});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ms=e=>e??ae,bs=Object.freeze({ALERT:"alert",ASSIST_SATELLITE:"assist_satellite",AUTOMATION:"automation",BINARY_SENSOR:"binary_sensor",BUTTON:"button",CALENDAR:"calendar",CAMERA:"camera",CLIMATE:"climate",CONFIGURATOR:"configurator",CONVERSATION:"conversation",COVER:"cover",DATE:"date",DATETIME:"datetime",DEVICE_TRACKER:"device_tracker",EVENT:"event",FAN:"fan",GROUP:"group",HUMIDIFIER:"humidifier",IMAGE:"image",INPUT_BOOLEAN:"input_boolean",INPUT_BUTTON:"input_button",INPUT_DATETIME:"input_datetime",INPUT_NUMBER:"input_number",INPUT_SELECT:"input_select",INPUT_TEXT:"input_text",LAWN_MOWER:"lawn_mower",LIGHT:"light",LOCK:"lock",MEDIA_PLAYER:"media_player",NUMBER:"number",SCENE:"scene",SCRIPT:"script",SELECT:"select",SENSOR:"sensor",STT:"stt",SWITCH:"switch",TEXT:"text",TIME:"time",TIMER:"timer",TTS:"tts",UPDATE:"update",VACUUM:"vacuum",VALVE:"valve",WATER_HEATER:"water_heater",WEATHER:"weather"});bs.WEATHER,bs.SENSOR;const _s={[Te]:He,[Ze]:He,[ze]:Ze,[Oe]:ke,[Fe]:ke,[Ie]:Pe,[De]:Le,[Le]:De,[Ve]:Ne,[Re]:Ne,[Ue]:Ne,[Be]:Ne,[je]:We,[qe]:We,[Je]:Ge,[Ye]:Ke,[et]:Qe},$s=e=>({entityId:e?.entity_id,attribute:e?.is_inferred?e?.attribute:void 0,displayName:e?.is_inferred?`💡${e?.entity_id??""}${e?.attribute?`[${e?.attribute}]`:""}`:"",isInferred:e?.is_inferred??!1});let As=class extends me{constructor(){super(...arguments),this._config={...tt},this._cardEntities={},this.language=it,this.localize=Pt(this.language),this._initialized=!1}static get styles(){return b`
      ${Dt}

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
    `}firstUpdated(){this._calculateCardEntities(),(async e=>{if(!window.customElements.get("ha-entity-picker")){const t=await window.loadCardHelpers(),s=await t.createCardElement({type:"entities",entities:[]});if(await s.constructor.getConfigElement(),!window.customElements.get("ha-entity-picker"))throw new Error(e("error.failedToPreLoadElement",{element:"ha-entity-picker"}))}})(this.localize)}updated(e){e.has("hass")&&this.hass.locale?.language!==this.language&&(this.language=this.hass.locale?.language,this.localize=Pt(this.language)),e.has("_config")&&this._calculateCardEntities()}setConfig(e){let t={...e};this._initialized||(t={...this._config,...t},this._initialized=!0),t=(e=>{const t={...e};for(const[e,s]of Object.entries(_s))t[s]||delete t[e];return t})(t),this._config=t}async _calculateCardEntities(){this._cardEntities=await Mt(this.hass,this._config),r.debug("🔧 Card Entities Recalculated:",this._cardEntities)}_handleFieldChange(e){const t=e.target;e.stopPropagation();const s=t.id;if(!(s in tt))throw new Error(this.localize("error.invalidConfigProperty",{property:s}));const i="ha-switch"===(t.tagName??"").toLowerCase()?t.checked:t.value;if(r.debug("🔧 Field Value Changed:",{targetId:s,newValue:i}),i===this._config[s])return;const a={...this._config};""===i||void 0===i?delete a[s]:a[s]=i;const c=new CustomEvent("config-changed",{detail:{config:a},bubbles:!0,composed:!0});this.dispatchEvent(c)}renderWeatherDevicePicker(e,t,s=!1,i=void 0){return se`
      <bwc-weather-device-picker-element
        id="${e}"
        .hass=${this.hass}
        class=${g("item",i)}
        .label="${t} (${s?this.localize("editor.required"):this.localize("editor.optional")})"
        .value=${"string"==typeof this._config[e]?this._config[e]:""}
        @value-changed=${this._handleFieldChange}
      ></bwc-weather-device-picker-element>
    `}renderEntityPicker(e,t,s=[],i=!1,a=void 0,c=void 0){return se`
      <ha-entity-picker
        id="${e}"
        .hass=${this.hass}
        class=${g("item",c)}
        .label="${t} (${i?this.localize("editor.required"):this.localize("editor.optional")})"
        .value=${this._config[e]??""}
        @value-changed=${this._handleFieldChange}
        allow-custom-entity
        include-domains=${l=s,l.map((e=>`"${e}"`)).join(", ")}
        .required=${i}
        .helper=${a}
      >
      </ha-entity-picker>
    `;var l}renderTextField(e,t,s=!1,i=void 0){return se`
      <ha-textfield
        id=${e}
        type="string"
        class=${g("item",i)}
        .value=${this._config[e]??""}
        .label="${t} (${s?this.localize("editor.required"):this.localize("editor.optional")})"
        name=${e}
        @change=${this._handleFieldChange}
        no-spinner
        .required=${s}
      >
      </ha-textfield>
    `}renderNumberSlider(e,t,s=!1,i=void 0,a=void 0,c=void 0){return se`<div class=${g("item",i)}>
      <span class="label">${t}</span
      ><ha-slider
        id=${e}
        min=${ms(a)}
        max=${ms(c)}
        step="1"
        pin
        markers
        labeled
        .value=${this._config[e]??""}
        .label="${t} (${s?this.localize("editor.required"):this.localize("editor.optional")})"
        name=${e}
        @change=${this._handleFieldChange}
        .required=${s}
      ></ha-slider>
      <span class="value">${this._config[e]}</span>
    </div>`}renderBooleanField(e,t,s=void 0){return se`
      <ha-formfield .label=${t} class=${g("item",s)}>
        <ha-switch id=${e} .checked=${this._config[e]??!1} @change=${this._handleFieldChange}></ha-switch>
      </ha-formfield>
    `}renderSummaryOptionsPanel(){return se`<ha-expansion-panel .outlined=${!0} header="${this.localize("editor.summary")}">
      <div class="item-group">
        <!-- Show Current Temperature -->
        ${this.renderBooleanField(He,this.localize("editor.showCurrentTemperature"))}
        ${this._config[He]?se`<div class="item-group level-one">
              <!-- Current Temp Entity -->
              ${this.renderEntityPicker(Te,this.localize("editor.currentTemperatureEntity"),[],!1,$s(this._cardEntities[Te]).displayName)}

              <!-- Show Feels Like Temperature -->
              ${this._config[He]?this.renderBooleanField(Ze,this.localize("editor.showFeelsLikeTemperature")):ae}

              <!-- Feels Like Temp Entity -->
              ${this._config[He]&&this._config[Ze]?this.renderEntityPicker(ze,this.localize("editor.feelsLikeTemperatureEntity"),[],!1,this._cardEntities[ze]?.is_inferred?this._cardEntities[ze].entity_id:void 0):ae}
            </div> `:ae}

        <!-- Weather Icon -->
        ${this.renderBooleanField(ke,this.localize("editor.showWeatherIcon"))}

        <!-- Weather Icon Entity -->
        ${this._config[ke]?se`<div class="item-group level-one">
              ${this.renderEntityPicker(Oe,this.localize("editor.weatherIconEntity"),[],!1,$s(this._cardEntities[Oe]).displayName)}

              <!-- Use Default Weather Icons -->
              ${this.renderBooleanField(Fe,this.localize("editor.useDefaultHaWeatherIcons"))}
            </div>`:ae}

        <!-- Show Time -->
        ${this.renderBooleanField(Pe,this.localize("editor.showTime"))}

        <!-- Time Entity -->
        ${this._config[Pe]?se`<div class="item-group level-one">
              ${this.renderEntityPicker(Ie,this.localize("editor.timeEntity"),[],!1,$s(this._cardEntities[Ie]).displayName)}

              <!-- Show Date -->
              ${this.renderBooleanField(De,this.localize("editor.showDate"))}

              <!-- Date Entity -->
              ${this._config[De]?this.renderEntityPicker(Le,this.localize("editor.dateEntity"),[],!1,$s(this._cardEntities[Le]).displayName):ae}
            </div>`:ae}

        <!-- Show Now / Later Temps -->
        ${this.renderBooleanField(Ne,this.localize("editor.showNowLaterTemps"))}
        ${this._config[Ne]?se`<div class="item-group level-one">
              <!-- Now Temp Entity -->
              ${this._config[Ne]?this.renderEntityPicker(Ve,this.localize("editor.nowTempEntity"),[],!1,$s(this._cardEntities[Ve]).displayName):ae}

              <!-- Now Label Entity -->
              ${this._config[Ne]?this.renderEntityPicker(Re,this.localize("editor.nowLabelEntity"),[],!1,$s(this._cardEntities[Re]).displayName):ae}

              <!-- Later Temp Entity -->
              ${this._config[Ne]?this.renderEntityPicker(Ue,this.localize("editor.laterTempEntity"),[],!1,$s(this._cardEntities[Ue]).displayName):ae}

              <!-- Later Label Entity -->
              ${this._config[Ne]?this.renderEntityPicker(Be,this.localize("editor.laterLabelEntity"),[],!1,$s(this._cardEntities[Be]).displayName):ae}
            </div>`:ae}

        <!-- Show Warnings Count -->
        ${this.renderBooleanField(We,this.localize("editor.showWarningCount"))}
        ${this._config[We]?se`<div class="item-group level-one">
              <!-- Warnings Count Entity -->
              ${this.renderEntityPicker(je,this.localize("editor.warningsCountEntity"))}
              ${this.renderBooleanField(qe,this.localize("editor.hideWarningCountIfZero"))}
            </div>`:ae}

        <!-- Show Rain Summary -->
        ${this.renderBooleanField(Ge,this.localize("editor.showRainSummary"))}

        <!-- Rain Summary Entity -->
        ${this._config[Ge]?se`<div class="item-group level-one">
              ${this.renderEntityPicker(Je,this.localize("editor.rainSummaryEntity"))}
            </div>`:ae}

        <!-- Show Forecast Summary -->
        ${this.renderBooleanField(Ke,this.localize("editor.showForecastSummary"))}

        <!-- Forecast Summary Entity -->
        ${this._config[Ke]?se`<div class="item-group level-one">
              ${this.renderEntityPicker(Ye,this.localize("editor.forecastSummaryEntity"))}
            </div>`:ae}
      </div>
    </ha-expansion-panel>`}renderHourlyForecastOptionsPanel(){return se`<ha-expansion-panel .outlined=${!0} header="${this.localize("editor.hourlyForecast")}">
      <!-- Show Hourly Forecast -->
      ${this.renderBooleanField(Xe,this.localize("editor.showHourlyForecast"))}
    </ha-expansion-panel>`}renderDailyForecastOptionsPanel(){return se`<ha-expansion-panel .outlined=${!0} header="${this.localize("editor.dailyForecast")}">
      <!-- Show Daily Forecast -->
      ${this.renderBooleanField(Qe,this.localize("editor.showDailyForecast"))}

      <!-- Number of Days -->
      ${this._config[Qe]?se`<div class="item-group level-one">
            ${this.renderNumberSlider(et,this.localize("editor.numberOfDays"),!1,void 0,1,7)}
          </div>`:ae}
    </ha-expansion-panel>`}render(){if(!this._config||!this._initialized)return se``;const e=$s(this._cardEntities[Se]);return se`<div class="card-config">
      <div class="item-group">
        <!-- Title -->
        ${this.renderTextField(Me,this.localize("editor.title"))}

        <!-- Weather Device -->
        ${this.renderWeatherDevicePicker(Ce,this.localize("editor.weatherDevice"),!0)}

        <!-- Forecast Entity ID -->
        ${this.renderEntityPicker(Se,this.localize("editor.summaryWeatherEntity"),[bs.WEATHER],!1,e.displayName)}
      </div>

      <!-- Summary Options Panel -->
      ${this.renderSummaryOptionsPanel()}

      <!-- Hourly Forecast Options Panel -->
      ${this.renderHourlyForecastOptionsPanel()}

      <!-- Daily Forecast Options Panel -->
      ${this.renderDailyForecastOptionsPanel()}
    </div> `}};o([Ee({attribute:!1})],As.prototype,"hass",void 0),o([xe()],As.prototype,"_config",void 0),o([xe()],As.prototype,"_cardEntities",void 0),As=o([_e("bom-weather-card-editor")],As);var Es=Object.freeze({__proto__:null,get BomWeatherCardEditor(){return As}});
//# sourceMappingURL=bom-weather-card.js.map
