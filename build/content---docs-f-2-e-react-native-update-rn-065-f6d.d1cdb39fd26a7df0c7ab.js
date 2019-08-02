(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{193:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",function(){return i}),t.d(n,"rightToc",function(){return p}),t.d(n,"default",function(){return b});t(0);var a=t(217);function r(){return(r=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e}).apply(this,arguments)}function c(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)t=c[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)t=c[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var i={title:"react-native rn版本的升级",date:new Date("2017-12-09T17:01:21.000Z"),toc:!0},p=[{value:"RN升级",id:"rn升级",children:[]}],o={rightToc:p},l="wrapper";function b(e){var n=e.components,t=c(e,["components"]);return Object(a.b)(l,r({},o,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("h2",null,Object(a.b)("a",r({parentName:"h2"},{"aria-hidden":!0,className:"anchor",id:"rn升级"})),Object(a.b)("a",r({parentName:"h2"},{"aria-hidden":!0,className:"hash-link",href:"#rn升级"}),"#"),"RN升级"),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"0.48修改太大，很多库都还没有同步过来，最终降级到0.47.2")),Object(a.b)("p",null,"由于目前",Object(a.b)("inlineCode",{parentName:"p"},"app"),"有个",Object(a.b)("inlineCode",{parentName:"p"},"bug"),"，就是",Object(a.b)("inlineCode",{parentName:"p"},"TextInput"),"为多行时，点击换行不能换行。在最新的",Object(a.b)("inlineCode",{parentName:"p"},"0.48"),"上已经修改。所以决定进行升级。下面记录升级的步骤："),Object(a.b)("p",null,"1、安装",Object(a.b)("inlineCode",{parentName:"p"},"Git"),": 下载",Object(a.b)("a",{href:"https://git-scm.com/downloads",target:"_blank"},"git"),"，并把其路径添加到",Object(a.b)("inlineCode",{parentName:"p"},"PATH"),"变量中。"),Object(a.b)("p",null,"2、安装",Object(a.b)("inlineCode",{parentName:"p"},"react-native-git-upgrade")),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{}),"npm install -g react-native-git-upgrade\n")),Object(a.b)("p",null,"3、运行更新命令"),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{}),"react-native-git-upgrade  // 直接将react-native 升级到最新版本\nreact-native-git-upgrade react-native@0.47.2  // 将react-native升级到指定版本\n")),Object(a.b)("p",null,"如果保存，可以试试先执行",Object(a.b)("inlineCode",{parentName:"p"},"yarn"),"，再执行上面的命令。"),Object(a.b)("p",null,"4、打开模拟器，执行",Object(a.b)("inlineCode",{parentName:"p"},"react-native run-android")),Object(a.b)("p",null,"这一步会包很多错误，一一解决，如果在某个库那报错，则删除",Object(a.b)("inlineCode",{parentName:"p"},"package.json"),"中对应的",Object(a.b)("inlineCode",{parentName:"p"},"dependencies"),"库，再用",Object(a.b)("inlineCode",{parentName:"p"},"npm"),"安装最新的库即可。"),Object(a.b)("p",null,"如果出现莫名错误，则需要查看",Object(a.b)("inlineCode",{parentName:"p"},"android/setting.gradle"),"和",Object(a.b)("inlineCode",{parentName:"p"},"android/build.gradle"),"里面是否有已经删掉的库，如果有，则把对应的代码删掉。"),Object(a.b)("p",null,"如果出现下面的错误"),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{}),"android/app/src/main/java/com/dadichuangke/MainActivity.java:7: 错误: 程序包com.cboy.rn.splashscreen不存在\nimport com.cboy.rn.splashscreen.SplashScreen;\n")),Object(a.b)("p",null,"则重新去看一下github对应库的文档，发现新版本做了一些修改,于是",Object(a.b)("inlineCode",{parentName:"p"},"unlink"),"之后，重新",Object(a.b)("inlineCode",{parentName:"p"},"react-native link"),"。"),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"参考资料：",Object(a.b)("a",{href:"http://reactnative.cn/docs/0.48/upgrading.html",target:"_blank"},"react native升级"))))}b.isMDXComponent=!0},217:function(e,n,t){"use strict";t.d(n,"a",function(){return p}),t.d(n,"b",function(){return u});var a=t(0),r=t.n(a),c=r.a.createContext({}),i=function(e){var n=r.a.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):Object.assign({},n,e)),t},p=function(e){var n=i(e.components);return r.a.createElement(c.Provider,{value:n},e.children)},o="mdxType",l={inlineCode:"code",wrapper:function(e){return r.a.createElement(r.a.Fragment,{},e.children)}},b=function(e){var n=e.components,t=e.mdxType,a=e.originalType,c=e.parentName,p=function(e,n){var t={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&-1===n.indexOf(a)&&(t[a]=e[a]);return t}(e,["components","mdxType","originalType","parentName"]),o=i(n);return r.a.createElement(o[c+"."+t]||o[t]||l[t]||a,n?Object.assign({},p,{components:n}):p)};function u(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var c=t.length,i=new Array(c);i[0]=b;var p={};for(var l in n)hasOwnProperty.call(n,l)&&(p[l]=n[l]);p.originalType=e,p[o]="string"==typeof e?e:a,i[1]=p;for(var u=2;u<c;u++)i[u]=t[u];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"}}]);