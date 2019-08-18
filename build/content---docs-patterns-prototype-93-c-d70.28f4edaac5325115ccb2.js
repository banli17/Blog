(window.webpackJsonp=window.webpackJsonp||[]).push([[103],{122:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",function(){return c}),n.d(t,"rightToc",function(){return p}),n.d(t,"default",function(){return u});n(0);var r=n(247);function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c={title:"javascript 原型模式",sidebar_label:"原型模式"},p=[],i={rightToc:p},l="wrapper";function u(e){var t=e.components,n=o(e,["components"]);return Object(r.b)(l,a({},i,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"原型模式是创建型模式的一种，其特点在于通过「复制」一个已经存在的实例来返回新的实例,而不是新建实例。被复制的实例就是我们所称的「原型」，这个原型是可定制的。原型模式多用于创建复杂的或者耗时的实例，因为这种情况下，复制一个已经存在的实例使程序运行更高效；或者创建值相等，只是命名不一样的同类数据。"),Object(r.b)("pre",null,Object(r.b)("code",a({parentName:"pre"},{className:"language-javascript"}),"Object.create(prototype)\n")),Object(r.b)("p",null,"对比js中的原型prototype: js里的prototype是es6 class的一种底层实现，是面向对象的基础，而不是某个模式。多年后，es6全面普及后，js 里的 prototype 可以被改变，但是Object.create()会保留，因为它是原型设计模式的基础。"),Object(r.b)("p",null,"原型模式在前端用的不多。"))}u.isMDXComponent=!0},247:function(e,t,n){"use strict";n.d(t,"a",function(){return p}),n.d(t,"b",function(){return s});var r=n(0),a=n.n(r),o=a.a.createContext({}),c=function(e){var t=a.a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):Object.assign({},t,e)),n},p=function(e){var t=c(e.components);return a.a.createElement(o.Provider,{value:t},e.children)};var i="mdxType",l={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},u=function(e){var t=e.components,n=e.mdxType,r=e.originalType,o=e.parentName,p=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===t.indexOf(r)&&(n[r]=e[r]);return n}(e,["components","mdxType","originalType","parentName"]),i=c(t),u=n,s=i[o+"."+u]||i[u]||l[u]||r;return t?a.a.createElement(s,Object.assign({},p,{components:t})):a.a.createElement(s,p)};function s(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,c=new Array(o);c[0]=u;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p[i]="string"==typeof e?e:r,c[1]=p;for(var s=2;s<o;s++)c[s]=n[s];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);