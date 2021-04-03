---
id: index
title: "web 安全"
# sidebar_label: 
---


## XSS 攻击

跨站脚本攻击(cross site scripting, xss) 是往目标网站注入恶意脚本(XSS payload，如评论、第三方脚本)，然后当用户访问时，对用户进行 Cookie 窃取/会话劫持/钓鱼欺骗等各种攻击。xss 原理是`程序 + 数据 = 结果`，script 由数据变成了程序。下面是一些可能中招的地方：

1、比如用户提交了 script 参数脚本，后端直接返回了，而没有处理。这个时候用户提交的 script 会直接当作脚本执行(有些浏览器会自动防御，后面讲)。脚本也叫

```
// 前端评论框提交
?from=<script src='http://www.xx.com/jquery.js'></script>

// 后端返回前端模板
<div>{from}</div>
```

2、评论时富文本编辑器，然后其它用户访问评论也会中招。

3、用户下单评论或其它操作，后台用户进入查看，这时脚本运行，黑客可以得到后台管理员的 cookie 和网址 referrer，然后登录。

4. 包括但不限于 JavaScript / VBScript / CSS / Flash 等。

### xss 能干什么

- 获取页面数据。
- 获取cookie。
- 劫持前端逻辑，比如脚本里有`location.href=url`或者`<meta http-equiv="Refresh" content="1; url=url"/>` 跳转。
- 发送请求。
- 偷取网站任意资料、用户资料、密码和登录态，欺骗用户。
- 修改样式，误导用户


### xss攻击分类

xss 攻击分为三种: 

- `反射型`：url参数直接注入，危害小些，因为用户可能会察觉到。不过攻击者可能用短网址。
- `存储型`：会存储到数据中，相比危害更大。
- `DOM Based型`: 是用户打开了黑客发送的恶意链接，前端直接使用了链接里的参数作为数据，导致恶意脚本执行了。它很像反射型XSS，只不过是浏览器直接反射。

> XSS钓鱼，XSS + 钓鱼网站。比如黑客在网站插入一个吸引人的链接，用户点击链接进入黑客做的淘宝钓鱼网站，输入账号密码。这样黑客就知道用户的账号密码了。


### 可能导致 xss 攻击地方

- html 节点内容: 动态生成带有用户输入数据。

```html
<div>#{content}</div>
可能变为:
<div><script></script></div>
```

- html 属性。

```html
<img src="#{image}" />
可能变为:
<img src="1" onerror="alert(1)" />
```

- javascript 代码。

```html
<script>
var data = '#{data}'; // 后台返回用户输入的数据
可能变为:
var data = 'google';alert(1);'';
</script>
```

- 富文本: 富文本需要保留用户的 html，但是 html 会有 xss 风险



### 防御

1. 浏览器自带的防御方案，能防御 url 出现在 html 内容或属性中（前2种）这样的反射型攻击，url 出现在js中不会防御。参数带在 url 中，chrome会自动开启`X-XSS-Protection`头防御xss攻击，后端可以手动关闭。如下面的 nodejs 代码。

```js
// 0 是关闭防御 1是打开，如果有url，浏览器防御到后会向 url 发送通知
ctx.set('X-XSS-Protection', 0)
ctx.set('X-XSS-Protection', 1, url)
```

2. 转义,即将用户提交的内容转为实体，不让浏览器当作脚本执行。要转义的字符有：

字符|实体
---|---
<|`&lt;`
>|`&gt;`
"|`&quot;`
'|`&#39;`(还可以是`&apos`，但ie不支持)
/|``(因为如果js里使用，可能会被注释//)
&|`&amp;` 

由于 html5 规定，属性可以不写引号，所以可能会出现`<a href=href>`，黑客可能修改为`<a href=hackHref href>`(第一个href会有效)，所以空格也要转义，但是 html 中如果有连续很多个空格，则会当成一个空格，转义了会对布局有影响，所以需要规范 html 属性必须加引号。

3. js代码：有时候用户提交的数据会被后端当作变量返回给前端，这时可能包含 xss 攻击，比如:

```
var a = "hello";"
var a = 'hello';'

// 最好 var a = JSON.stringify(data)
```

这样代码就有问题了，所以需要将变量进行转义。最好的方法是使用`JSON.stringify(data)`。

4. 富文本。

```js
// 黑名单策略，不推荐
var xssFilter = function(html){
    html = html.replace(/<\s*\/?script\s*/g, '')
        .replace(/javascript:[^'"]*/g, '')   a href='javascript:'  还有其它元素
        .replace(/onerror\s*=\s*['"]?[^'']*/, '')  还有其它事件，svg, object
    return html
}
```

富文本如果按照黑名单替换原则，xss 变种可能性太多会有漏网的。所以使用白名单策略，按白名单保留部分标签和属性，将 html 解析成 dom (cheerio) 分析过滤，再生成 html。最好在用户输入时就做处理。

```js
var whiteList = {
    img: ['src'],
    font: ['color', 'size'],
    a: ['href']
}
$(*).each(function(index, elem){
    if(!whiteList[elem.name]){
        $(elem).remove()
        return 
    }
    for(var attr in elem.attribs){
        if(whiteList[elem.name].indexOf(attr) === -1){
            $(elem).attr(attr, null) // 删除属性
        }
    }
})
console.log(html, $.html())
```

> 过滤 Html 标签能否防止 XSS? 请列举不能的情况?

```html
// 使用图片 url 等方式来上传脚本进行攻击
<table background="javascript:alert(/xss/)"></table>
<img src="javascript:alert('xss')">

// 空格，回车，tab回避检查
<img src="javas cript:
alert('xss')">

// 各种编码转换(URL 编码, Unicode 编码, HTML 编码, ESCAPE 等)绕过检查
<img%20src=%22javascript:alert('xss');%22>
<img src="javascrip&#116&#58alert(/xss/)">
```

**项目中实践防御 xss 攻击**

在平时项目中，可以使用第三方包。

- [node-esapi](https://github.com/ESAPI/node-esapi/blob/master/lib/esapi.js)
- [js-xss](https://github.com/leizongmin/js-xss)

### CSP

w3c 为了抵御 XSS 攻击制定了一个规范叫 CSP(`content security policy`)，即内容安全策略，让开发者告诉客户端哪些外部资源可以被加载和执行。所以黑客即使发现了漏洞，也无法注入脚本。

开启 CSP 的方式：

1. 通过 http 头 `Content-Security-Policy`。

```
Content-Security-Policy: script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:
```

上面代码意思是：脚本只执行当前域名的，`<object>`标签不信任任何 URL，即不加载任何资源。样式只信任`cdn.example.org`、`third-party.org`域的，`frame` 只能是 https 的，其它资源没有限制。

2. 通过`<meta>`标签。

```html
<meta http-equiv="Content-Security-Policy" content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:">
```

更多参考资料:

- [mdn 内容安全策略( CSP )](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)
- [Content Security Policy 介绍](https://imququ.com/post/content-security-policy-reference.html)
- [Content Security Policy 入门教程](http://www.ruanyifeng.com/blog/2016/09/csp.html)

**php 中防御 xss**

在 php 中防御 xss 攻击可以用一下方式。

- 内置函数转义: strip_tags($content) 将html标签移除只剩下内容  htmlspecialchars($content, ENT_QUOTES) 默认不转`'`,要加ENT_QUOTES，会将`<> & ' " `转义。
- dom解析白名单，可以用内置DOMDocument类
- 第三方库 anti-xss等  html purifier
- csp:`header('X-Xss-Protection','script-src "self" ')`


## CSRF

CSRF (cross-site request forgy) 叫做跨站请求伪造。比如用户登陆了 a 网站，同时打开黑客的 b 网站伪造表单，会自动在 a 网站里面发了一篇文章。原理是 b 网站有个自动提交表单，用户打开 b 网站时，由于登陆了 a 网站(有 cookie)，所以可以向 a 提交表单。

CSRF 是在用户不知情的情况下，利用用户的登陆态去完成业务请求，这里业务请求可能是银行转账，冒充用户发帖或删帖。会损害网站的声誉。

它的特征如下：

- 在 b 网站中向 a 网站发送请求。
- 会带 a 的 cookie。
- 没有访问 a 网站前端页面。
- referer 为 b 网站。

**防御 CSRF 攻击**

利用上面的特性，我们有如下防御策略：

1. 禁止第三方网站带 cookies，可以通过设置 cookie 的`same-site`属性实现。
2. 在前端加入验证码（但是影响用户体验，可以用`ccap`模块）。
3. 使用 token。前端将它放到页面`<input type=hidden token=xx>` 或 `<meta>` 中，同时后端将它设置到 cookie 中，在发送请求时后端验证这2个值是否一致。因为攻击者不访问前端无法获得 token ，而且无法得到和修改 cookie 里的 token。
4. 验证`origin Header`和`referer Header`。打开本地 url `file://xx` 不会发送 referer，通过 http 请求才会发。所以可以使用正则`/https?\/\/localhost/` 验证 referer 是否符合条件。但有些浏览器可以让用户设置不发 referer，所以可能会导致一些问题。

**在 php 中防御**

```php
header('Set-Cookie: text=123; SameSite=Lax');
```

## cookies 问题

cookies 特性

- 前端数据存储
- 后端通过http头设置
- 请求时通过http头传给后端
- 前端可读写
- 遵守同源策略：协议、域名、端口一致

cookie 的字段

- 域名：只能使用自己域名下的
- 有效期：默认是 Session，会话结束就到期，toGMTString()
- 路径: path不同，cookie 可以同名
- http-only：cookie 只能被http使用，即只能被后端读写。前端不能使用
- secure：https 时才能使用
- same-site，兼容性问题

**js 可以读取、设置、删除 cookies**

```js
document.cookie
```

cookies作用

- 存储个性化设置
- 存储未登录时用户唯一标识
- 存储已登录用户的凭证
- 存储其它业务数据

存储已登录用户的凭证

过程：前端提交登陆，后端验证，存储session设置cookie，前端发cookie

1、用户ID，下次根据id来识别用户，cookie容易被篡改，模拟其它用户登录

2、用户ID + 签名，这个签名只有后端能算出来。签名是不可逆的。cookie内容有userId，sign，后端拿到userId再签名和sign进行对比即可。

```javascript
const KEY = 'fjas3&#11fdjsk'  // 私钥
crypt.cryptUserId = function(userId){
    var crypto = require('crypto')
    var sign = crypto.createHmac('sha256', KEY)
    sign.update(userId + '')
    return sign.digest('hex')
}
```

3、SessionId(持久化，可存文件或数据库中)：服务端返回一个随机数，根据随机数判断用户，前端cookie没有用户可识别的信息。黑客不知道怎么修改。 session的原理和实现。

Cookies和XSS的关系
- XSS可能偷取Cookies
- http-only的cookies不会被偷

Cookies和CSRF的关系
- CSRF利用了用户Cookies
- 攻击站点无法读写Cookies
- 最好能阻止第三方读取Cookies

Cookies安全策略
- 签名防篡改(对明文进行签名)
- 加密(对userid进行加密，别人看不懂，无法修改)，crypto.createCipher()、crypto.createDecipher()

```javascript
// 加密
const cipher = crypto.createCipher('des', KEY)
const text = cipher.update('hello', 'utf8', 'hex')
text += cipher.final('hex')

// 解密
const cipher = crypto.createDecipher('des', KEY)
const origin = cipher.update(text, 'hex', 'utf8')
origin += decipher.final('utf8')
```

- http-only(防止XSS)
- secure：https下才能使用cookie
- same-site:只支持 chrome

## 点击劫持

## DDOS攻击

DDOS (Distributed Denial of Service）叫分布式拒绝服务攻击，是用多个计算机联合起来对一个或多个目标服务器进行攻击，将目标服务器的宽带或资源消耗完，导致其无法为正常客户提供服务。

**如何防御DDOS攻击**

1. 尽可能对系统加载最新补丁，并采取有效的合规性配置，降低漏洞利用风险
2. 采取合适的安全域划分，配置防火墙、入侵检测和防范系统，减缓攻击。
3. 采用分布式组网、负载均衡、提升系统容量等可靠性措施，增强总体服务能力。

可参考措施：

1. 选择路由器、交换机、硬件防火墙等设备的时候要尽量选用知名度高、 口碑好的产品。
2. 尽量避免 NAT 的使用
3. 充足的网络带宽保证
4. 升级主机服务器硬件
5. 把网站做成静态页面

- TCP半连接：让连接一直连接，其它用户连接不进来
- http连接
- DNS

**攻击案例**

- 游戏私服互相 DDOS


## 密码安全

> 加密是如何保证用户密码的安全性?

## 信息泄露

## 传输安全

https

## 服务端安全

除了前端注意安全，后端也需要对安全进行防范，常见比如防止 SQL 注入，登录会话管理等。

## 学习资料

- https://www.zhihu.com/question/20026752
- [常见 Web 安全攻防总结](https://zoumiaojiang.com/article/common-web-security/)
- https://zhuanlan.zhihu.com/p/31875007
- https://zhuanlan.zhihu.com/p/19705180
- [从零开始学web安全（1）](http://www.imweb.io/topic/568958714c44bcc56092e409)
- [从零开始学web安全（2）](http://www.imweb.io/topic/56b876a65c49f9d377ed8ef6)
- [从零开始学web安全（3）](http://imweb.io/topic/57024e4606f2400432c1396d)
- [从零开始学web安全（4）](http://www.imweb.io/topic/574b22633eef750438d5cb44)
- [XSS的原理分析与解剖](http://www.freebuf.com/articles/web/40520.html)
- [XSS的原理分析与解剖（第二篇）](http://www.freebuf.com/articles/web/42727.html)
- [XSS的原理分析与解剖：第三章（技巧篇）](http://www.freebuf.com/articles/44481.html)
- [XSS的原理分析与解剖：第四章（编码与绕过）](http://www.freebuf.com/articles/web/55505.html)
- [漫画告诉你什么是DDoS攻击？](https://www.leiphone.com/news/201509/9zGlIDvLhwguqOtg.html)
- [互联网创业公司如何防御 DDOS 攻击？](https://www.zhihu.com/question/19581905)
- [web安全之--点击劫持攻击与防御技术简介](http://www.jianshu.com/p/251704d8ff18)
- 《白帽子讲 Web 安全》相关内容
- [戏耍XSS的一些技巧](http://www.freebuf.com/articles/web/74324.html)
- [为什么要进行URL编码](https://www.cnblogs.com/jerrysion/p/5522673.html)
- [【web安全】第二弹：XSS攻防中的复合编码问题](https://www.cnblogs.com/kuoaidebb/p/3983886.html)
- [xss:利用编码绕过](https://www.cnblogs.com/iceli/p/8598709.html)
http://www.freebuf.com/author/Black-Hole?page=2


## 中间人攻击

DNS欺骗: 检查hosts
会话劫持
代理服务器


## SQL/NoSQL 注入

注入攻击是指当所执行的一些操作中有部分由用户传入时, 用户可以将其恶意逻辑注入到操作中. 当你使用 eval, new Function 等方式执行的字符串中有用户输入的部分时, 就可能被注入攻击. 上文中的 XSS 就属于一种注入攻击. 前面的章节中也提到过 Node.js 的 child_process.exec 由于调用 bash 解析, 如果执行的命令中有部分属于用户输入, 也可能被注入攻击.

包括但不限于删除数据 (经济损失), 篡改数据 (密码等), 窃取数据 (网站管理权限, 用户数据) 等. 防治手段常见于:

给表名/字段名加前缀 (避免被猜到)
报错隐藏表信息 (避免被看到, 12306 早期就出现过的问题)
过滤可以拼接 SQL 的关键字符
对用户输入进行转义
验证用户输入的类型 (避免 limit, order by 等注入)
等...