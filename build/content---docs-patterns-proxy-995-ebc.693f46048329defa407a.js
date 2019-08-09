(window.webpackJsonp=window.webpackJsonp||[]).push([[95],{117:function(e,n,a){"use strict";a.r(n),a.d(n,"frontMatter",function(){return l}),a.d(n,"rightToc",function(){return i}),a.d(n,"default",function(){return p});a(0);var r=a(229);function t(){return(t=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function c(e,n){if(null==e)return{};var a,r,t=function(e,n){if(null==e)return{};var a,r,t={},c=Object.keys(e);for(r=0;r<c.length;r++)a=c[r],n.indexOf(a)>=0||(t[a]=e[a]);return t}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)a=c[r],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(t[a]=e[a])}return t}var l={title:"javascript 代理模式",sidebar_label:"代理模式"},i=[{value:"简介",id:"简介",children:[]},{value:"图片预加载",id:"图片预加载",children:[]},{value:"合并http请求",id:"合并http请求",children:[]},{value:"虚拟代理在惰性加载中的应用",id:"虚拟代理在惰性加载中的应用",children:[]},{value:"缓存代理",id:"缓存代理",children:[]},{value:"$.proxy",id:"proxy",children:[]},{value:"ES6 Proxy",id:"es6-proxy",children:[]},{value:"代理模式和命令模式的区别",id:"代理模式和命令模式的区别",children:[]},{value:"代理模式和适配器模式，装饰者模式的区别",id:"代理模式和适配器模式，装饰者模式的区别",children:[]},{value:"总结",id:"总结",children:[]}],o={rightToc:i},s="wrapper";function p(e){var n=e.components,a=c(e,["components"]);return Object(r.b)(s,t({},o,a,{components:n,mdxType:"MDXLayout"}),Object(r.b)("h2",null,Object(r.b)("a",t({parentName:"h2"},{"aria-hidden":!0,className:"anchor",id:"简介"})),Object(r.b)("a",t({parentName:"h2"},{"aria-hidden":!0,className:"hash-link",href:"#简介"}),"#"),"简介"),Object(r.b)("p",null,"代理模式(proxy pattern)是通过代理去访问对象，代理提供了一些拦截操作。操作者操作的是代理。"),Object(r.b)("p",null,"比如送花，X 需要给 A 送花，但是不好意思，于是委托好朋友 B 给 A 送花。"),Object(r.b)("p",null,Object(r.b)("img",t({parentName:"p"},{src:"./index/proxy-uml.png",alt:null}))),Object(r.b)("pre",null,Object(r.b)("code",t({parentName:"pre"},{className:"language-javascript"}),"const Flower = function(){}\nconst X = {\n    sendFlower: function(){\n        B.receiveFlower()\n    }\n}\nconst B = {\n    receiveFlower: function(){\n        if(A.happy){  // 当A开心时\n            var f = new Flower()\n            A.receiveFlower(f)\n        }\n    }\n}\nconst A = {\n    happy: false,\n    receiveFlower: function(flower){\n        console.log('A收到花了')\n    }\n}\n\nX.sendFlower()\n")),Object(r.b)("p",null,"上面代码可以看出："),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"代理和目标对象提供了相同的接口，使得操作者仿佛是操作目标对象一样。"),Object(r.b)("li",{parentName:"ol"},"代理保护：可以拒绝一些对目标对象访问，比如A不开心的时候就不送花。"),Object(r.b)("li",{parentName:"ol"},"虚拟代理：可以延迟Flower对象在需要的时候才创建，不需要在",Object(r.b)("inlineCode",{parentName:"li"},"X.sendFlower"),"中创建，这样节省了内存。")),Object(r.b)("h2",null,Object(r.b)("a",t({parentName:"h2"},{"aria-hidden":!0,className:"anchor",id:"图片预加载"})),Object(r.b)("a",t({parentName:"h2"},{"aria-hidden":!0,className:"hash-link",href:"#图片预加载"}),"#"),"图片预加载"),Object(r.b)("p",null,"图片预加载常用的方法是先用一张loading图片占位，然后用异步的方式加载图片，等图片加载好了再把它填充到img节点里，这种场景就很适合使用虚拟代理（等准备好后再执行本体）。"),Object(r.b)("pre",null,Object(r.b)("code",t({parentName:"pre"},{className:"language-javascript"}),"var myImage = (function(){\n    var imgNode = document.createElement( 'img' );\n    document.body.appendChild( imgNode );\n    return {\n        setSrc: function( src ){\n            imgNode.src = src;\n        }\n    }\n})();\nvar proxyImage = (function(){\n    var img = new Image;\n    img.onload = function(){\n        myImage.setSrc( this.src );\n    }\n    return {\n        setSrc: function( src ){\n            myImage.setSrc( 'loading.gif' );\n            img.src = src;\n        }\n    }\n})();\nproxyImage.setSrc( 'https://static.xiaohuochai.site/icon/icon_200.png' );\n")),Object(r.b)("p",null,"这样做的好处是符合单一职责原则。本来是只需要给img节点设置src。预加载只是让效果更好的功能。于是代理的作用在这里就体现出来了，代理负责预加载图片，预加载的操作完成之后，把请求重新交给本体MyImage。即使有一天不需要代理了，只需要修改成请求本体即可。"),Object(r.b)("p",null,"代理对象和本体都对外提供了setSrc方法，在客户看来，代理对象和本体是一致的， 代理接手请求的过程对于用户来说是透明的，用户并不清楚代理和本体的区别，这样做有两个好处："),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"用户可以放心地请求代理，只关心是否能得到想要的结果；"),Object(r.b)("li",{parentName:"ol"},"在任何使用本体的地方都可以替换成使用代理。")),Object(r.b)("h2",null,Object(r.b)("a",t({parentName:"h2"},{"aria-hidden":!0,className:"anchor",id:"合并http请求"})),Object(r.b)("a",t({parentName:"h2"},{"aria-hidden":!0,className:"hash-link",href:"#合并http请求"}),"#"),"合并http请求"),Object(r.b)("p",null,"频繁的http请求会造成巨大的开销，有时我们可以在代理中通过延迟来合并http请求。比如："),Object(r.b)("pre",null,Object(r.b)("code",t({parentName:"pre"},{className:"language-javascript"}),"var synchronousFile = function( id ){\n    console.log( '开始同步文件，id 为: ' + id );\n};\n\nvar proxySynchronousFile = (function(){\n    var cache = [], // 保存一段时间内需要同步的ID\n    timer; // 定时器\n    return function( id ){\n        cache.push( id );\n        if ( timer ){ // 保证不会覆盖已经启动的定时器\n            return;\n        }\n        timer = setTimeout(function(){\n        synchronousFile( cache.join( ',' ) ); // 2 秒后向本体发送需要同步的ID 集合\n        clearTimeout( timer ); // 清空定时器\n        timer = null;\n        cache.length = 0; // 清空ID 集合\n    }, 2000 );\n    }\n})();\n\nvar checkbox = document.getElementsByTagName( 'input' );\nfor ( var i = 0, c; c = checkbox[ i++ ]; ){\n    c.onclick = function(){\n        if ( this.checked === true ){\n            proxySynchronousFile( this.id );\n        }\n    }\n};\n")),Object(r.b)("h2",null,Object(r.b)("a",t({parentName:"h2"},{"aria-hidden":!0,className:"anchor",id:"虚拟代理在惰性加载中的应用"})),Object(r.b)("a",t({parentName:"h2"},{"aria-hidden":!0,className:"hash-link",href:"#虚拟代理在惰性加载中的应用"}),"#"),"虚拟代理在惰性加载中的应用"),Object(r.b)("p",null,"比如调试打印内容，可以先把打印内容收集起来，当用户通过f2打开控制台的时候才加载js并执行打印操作。"),Object(r.b)("pre",null,Object(r.b)("code",t({parentName:"pre"},{className:"language-javascript"}),"var miniConsole = (function(){\n    var cache = [];\n    var handler = function( ev ){\n        // 按下f2时踩加载miniConsole.js\n        if ( ev.keyCode === 113 ){\n            var script = document.createElement( 'script' );\n            script.onload = function(){\n                for ( var i = 0, fn; fn = cache[ i++ ]; ){\n                    fn();\n                }\n            };\n            script.src = 'miniConsole.js';\n            document.getElementsByTagName( 'head' )[0].appendChild( script );\n            document.body.removeEventListener( 'keydown', handler );// 只加载一次miniConsole.js\n        }\n    };\n    document.body.addEventListener( 'keydown', handler, false );\n    return {\n        log: function(){\n            var args = arguments;\n            cache.push( function(){\n                return miniConsole.log.apply( miniConsole, args );\n            });\n        }\n    }\n})();\n\nminiConsole.log( 11 ); // 开始打印log\n// miniConsole.js 代码\nminiConsole = {\n    log: function(){\n        // 真正代码略\n        console.log( Array.prototype.join.call( arguments ) );\n    }\n}\n")),Object(r.b)("h2",null,Object(r.b)("a",t({parentName:"h2"},{"aria-hidden":!0,className:"anchor",id:"缓存代理"})),Object(r.b)("a",t({parentName:"h2"},{"aria-hidden":!0,className:"hash-link",href:"#缓存代理"}),"#"),"缓存代理"),Object(r.b)("p",null,"有时我们可以将结果缓存到缓存代理中，下次又计算相同内容时，将结果直接从缓存中取出来。"),Object(r.b)("pre",null,Object(r.b)("code",t({parentName:"pre"},{className:"language-javascript"}),"/**************** 计算乘积 *****************/\nvar mult = function(){\n    var a = 1;\n    for ( var i = 0, l = arguments.length; i < l; i++ ){\n        a = a * arguments[i];\n    }\n    return a;\n};\n/**************** 计算加和 *****************/\nvar plus = function(){\n    var a = 0;\n    for ( var i = 0, l = arguments.length; i < l; i++ ){\n        a = a + arguments[i];\n    }\n    return a;\n};\n/**************** 创建缓存代理的工厂 *****************/\nvar createProxyFactory = function( fn ){\n    var cache = {};\n    return function(){\n        var args = Array.prototype.join.call( arguments, ',' );\n        if ( args in cache ){\n            return cache[ args ];\n        }\n        return cache[ args ] = fn.apply( this, arguments );\n    }\n};\n\nvar proxyMult = createProxyFactory( mult ),\nproxyPlus = createProxyFactory( plus );\nalert ( proxyMult( 1, 2, 3, 4 ) ); // 输出：24\nalert ( proxyMult( 1, 2, 3, 4 ) ); // 输出：24\nalert ( proxyPlus( 1, 2, 3, 4 ) ); // 输出：10\nalert ( proxyPlus( 1, 2, 3, 4 ) ); // 输出：10\n")),Object(r.b)("p",null,"在 JavaScript 开发中最常用的是虚拟代理和缓存代理。虽然代理 模式非常有用，但我们在编写业务代码的时候，往往不需要去预先猜测是否需要使用代理模式。 当真正发现不方便直接访问某个对象的时候，再编写代理也不迟。"),Object(r.b)("h2",null,Object(r.b)("a",t({parentName:"h2"},{"aria-hidden":!0,className:"anchor",id:"proxy"})),Object(r.b)("a",t({parentName:"h2"},{"aria-hidden":!0,className:"hash-link",href:"#proxy"}),"#"),"$.proxy"),Object(r.b)("p",null,"jQuery 里的 $.proxy(fn, this) 可以将函数里的 this 进行代理。"),Object(r.b)("pre",null,Object(r.b)("code",t({parentName:"pre"},{className:"language-javascript"}),"el.onclick = function(){\n    $.proxy(setTimeout(function(){\n        console.log(this)\n    }), this)\n}\n")),Object(r.b)("h2",null,Object(r.b)("a",t({parentName:"h2"},{"aria-hidden":!0,className:"anchor",id:"es6-proxy"})),Object(r.b)("a",t({parentName:"h2"},{"aria-hidden":!0,className:"hash-link",href:"#es6-proxy"}),"#"),"ES6 Proxy"),Object(r.b)("p",null,"请明星做广告时，不能直接访问明星，而是要通过经纪人。如果报价低了，经纪人直接拒绝。通过es6的 Proxy 来实现。"),Object(r.b)("pre",null,Object(r.b)("code",t({parentName:"pre"},{className:"language-javascript"}),"const star = {\n    name: '孙悟空',\n    price: 10000\n}\n\nconst agent = new Proxy(star, {\n    get(target, key) {\n        if (key === 'price') {\n            console.log('访问了price')\n        }\n        return target[key]\n    },\n    set(target, key, val) {\n        if (key === 'customPrice') {\n            if (val < target.price) {\n                throw new Error('价格太低了')\n            } else {\n                target[key] = val\n            }\n        }\n    }\n})\n\nconsole.log(agent.price)\nagent.customPrice = 100000\n")),Object(r.b)("h2",null,Object(r.b)("a",t({parentName:"h2"},{"aria-hidden":!0,className:"anchor",id:"代理模式和命令模式的区别"})),Object(r.b)("a",t({parentName:"h2"},{"aria-hidden":!0,className:"hash-link",href:"#代理模式和命令模式的区别"}),"#"),"代理模式和命令模式的区别"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"代理模式目的主要是做拦截，拦截时可以延迟创建对象(虚拟代理)或缓存数据(缓存代理)。"),Object(r.b)("li",{parentName:"ol"},"命令模式主要是将命令发出者和接受者解耦。使得发出者不需要关心接受者代码的具体实现。"),Object(r.b)("li",{parentName:"ol"},"代理模式主要操作的对象是代理，命令模式主要操作对象是命令发出者。")),Object(r.b)("h2",null,Object(r.b)("a",t({parentName:"h2"},{"aria-hidden":!0,className:"anchor",id:"代理模式和适配器模式，装饰者模式的区别"})),Object(r.b)("a",t({parentName:"h2"},{"aria-hidden":!0,className:"hash-link",href:"#代理模式和适配器模式，装饰者模式的区别"}),"#"),"代理模式和适配器模式，装饰者模式的区别"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"代理模式主要用于访问权限的控制，提供一模一样的接口，仿佛有权限访问原对象，功能是经过限制的。"),Object(r.b)("li",{parentName:"ul"},"适配器模式是提供不同的接口，处理不兼容，比如插头的转换。"),Object(r.b)("li",{parentName:"ul"},"装饰器模式目的是新增功能，原功能不变。")),Object(r.b)("h2",null,Object(r.b)("a",t({parentName:"h2"},{"aria-hidden":!0,className:"anchor",id:"总结"})),Object(r.b)("a",t({parentName:"h2"},{"aria-hidden":!0,className:"hash-link",href:"#总结"}),"#"),"总结"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"送花的故事"),Object(r.b)("li",{parentName:"ol"},"jQuery的$.proxy"),Object(r.b)("li",{parentName:"ol"},"es6 Proxy明星拍广告的故事"),Object(r.b)("li",{parentName:"ol"},"虚拟代理的作用，保护代理的作用"),Object(r.b)("li",{parentName:"ol"},"什么是单一职责原则：一个类应该只有一个发生变化的原因"),Object(r.b)("li",{parentName:"ol"},"http合并请求"),Object(r.b)("li",{parentName:"ol"},"图片预加载，将预加载和插图片分开"),Object(r.b)("li",{parentName:"ol"},"虚拟代理在惰性加载中的应用，将延迟到需要的时候再创建，先收集打印内容，再加载miniConsole.js后执行。"),Object(r.b)("li",{parentName:"ol"},"缓存代理")))}p.isMDXComponent=!0},229:function(e,n,a){"use strict";a.d(n,"a",function(){return i}),a.d(n,"b",function(){return b});var r=a(0),t=a.n(r),c=t.a.createContext({}),l=function(e){var n=t.a.useContext(c),a=n;return e&&(a="function"==typeof e?e(n):Object.assign({},n,e)),a},i=function(e){var n=l(e.components);return t.a.createElement(c.Provider,{value:n},e.children)};var o="mdxType",s={inlineCode:"code",wrapper:function(e){var n=e.children;return t.a.createElement(t.a.Fragment,{},n)}},p=function(e){var n=e.components,a=e.mdxType,r=e.originalType,c=e.parentName,i=function(e,n){var a={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===n.indexOf(r)&&(a[r]=e[r]);return a}(e,["components","mdxType","originalType","parentName"]),o=l(n),p=a,b=o[c+"."+p]||o[p]||s[p]||r;return n?t.a.createElement(b,Object.assign({},i,{components:n})):t.a.createElement(b,i)};function b(e,n){var a=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var c=a.length,l=new Array(c);l[0]=p;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i[o]="string"==typeof e?e:r,l[1]=i;for(var b=2;b<c;b++)l[b]=a[b];return t.a.createElement.apply(null,l)}return t.a.createElement.apply(null,a)}p.displayName="MDXCreateElement"}}]);