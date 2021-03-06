# 浏览器中的网络

## TCP 协议

衡量 web 性能有个重要的指标 FP(first paint)，是从页面加载到首次开始绘制的时长，这个指标直接影响了用户的跳出率。更快的页面响应意味着更多的 pv，更高的参与度，以及更高的转换率。

影响 FP 的一个重要因素是网络加载速度。

1. ip 把数据包送达目的主机

传输前，数据包会带上自身的 ip 地址(为了可以让目标主机回复)、目标主机的 ip 地址信息(为了可以送达)。

ip 头包含 ip 版本、源 ip 地址、目标 ip 地址、生存时间等信息。

2. UDP 把数据包送达应用程序

ip 层并不知道数据要交给哪个应用程序，所以需要用户数据包协议 UDP(user datagram protocol)。

UDP 中有端口号，通过端口号将数据包发送给指定程序。发送数据时，端口号也会被放入到 UDP 头中，到达目标主机时，也会拆开 UDP 头。

UDP 的特点

- 能校验数据
- 不能保证数据可靠性(只管发，不确认)，传输速度快
- 不能将乱序小包组成完整文件

3. TCP

transmission contrl protocol 传输控制协议，是一种面向连接的、可靠的、基于字节流的传输层通信协议。

- 对于数据包丢失的情况，会重传
- 引入了数据包排序机制(有序号)，可以把乱序的数据包组合成完整的文件

一个 tcp 完整的连接:

- 建立连接阶段，三次握手。
- 传输数据阶段，接收端需要对每个数据包进行确认操作，在规定时间内没有收到接收端的反馈，就判断为数据包丢失，会触发重发机制。大文件传输时会拆成小包，在接收端按照 tcp 头里的序号进行排序，组成完整的包。
- 断开连接阶段，四次挥手。

所以 tcp 为了保证数据传输的可靠性，牺牲了数据包的传输速度，三次握手和数据包校验机制等在传输过程中将数据包的数量提升了一倍。

网络进程知道每个 tcp 链接所对应的标签是那个，所以接收到数据后，会把数据分发给对应的渲染进程。

一个包从主机 A 到主机 B 的旅程：

- 应用层加上 http 头，发给 tcp 层。
- tcp 层加上 tcp 头，包含端口号。
- 数据包交给网络层，网络层加上 ip 头，组成新的 ip 数据包交给底层。
- 底层通过物理网络将数据包发送给 B。
- 数据包传输到 B 的网络层，拆开数据包的 ip 头信息，并将拆开的数据部分交给 tcp 层。
- tcp 进行拆包取出端口号，交给浏览器。
- 浏览器的网络进程知道 tcp 连接对应的标签。所以收到数据后，会分发给对应的渲染进程。

tcp 交给 http 时丢包？应该会重新再发给 http，tcp 已经收到包了，本地给 http 很快。

## http 过程

请求

1. 构建请求

```
GET /index.html HTTP1.1
```

2. 查找缓存

发起请求之前，会查找缓存。如果有，则直接返回并结束，而不会发起请求。好处是：缓解服务器压力，提升性能。如果没有缓存，则发请求

3. 为 tcp 连接准备 ip 和端口

http 工作前，浏览器会通过 tcp 与服务器建立连接，也就是 http 的内容是通过 tcp 传输数据阶段来实现的。

但是现在只有一个域名，所以需要 DNS(域名系统) 解析，将域名映射为 ip。

浏览器还有 DNS 数据缓存服务，如果没有过期会直接使用，这样会减少一次网络请求。

拿到 ip 后，开始获取端口号，如果没有指明，http 协议默认是 80 端口。

4. 等待 tcp 队列

chrome 有个机制，同一个域名最多只有 6 个 tcp 连接，超出的会进入排队等待。如果数量小于 6，会直接进行下一步，建立 tcp 连接。

5. 建立 tcp 连接

6. 发起 http 请求

浏览器会发送请求行：请求方法、请求 uri(uniform resource identifier) 和 http 版本号。

![](./imgs/1-3-1.png)

7. 服务器处理 http 请求。

![](./imgs/1-3-2.png)

并不是所有请求都会被服务器处理，服务器通过状态码告诉浏览器它的处理结果。如 200、400。

8. 断开连接

一旦服务器向客户端返回了结果，它就要关闭 tcp 连接，不过如果有头信息:

```
Connection: Keep-Alive
```

那么 tcp 连接会在发送完后保持打开，保持 tcp 连接可以省去下次建立连接的时间，提升资源加载速度。

9. 重定向

![](./imgs/1-3-3.png)

浏览器收到 301，会根据响应头的 Location 字段重新导航。

返回 301 不返回 location 会怎么样？

为什么很多站点第二次打开速度会很快？

主要是第一次缓存了数据。哪些数据会缓存？DNS 缓存和页面资源缓存。

![](./imgs/1-3-4.png)

服务器响应头返回 Cache-Control 字段设置资源是否缓存。

```
Cache-Control: Max-age=2000
```

缓存过期，会发送网络请求，请求头会带上:

```
If-None-Match:"4f80f-13c-3a1xb"
```

服务器收到后，会根据 If-None-Match 判断请求资源是否有更新。

- 如果没有更新，则返回 304，告诉浏览器这个缓存可以继续用，这次就不发送重复数据给你了。
- 如果资源有更新，服务器就直接返回最新资源。

登录状态是如何保持的？

服务器返回 Set-Cookie，客户端每次发送 Cookie 字段。

![](./imgs/1-3-5.png)

如果一个网络请求时间过久，怎么分析是哪个地方出了问题？

1. 首先猜测最可能的出问题的地方，网络传输丢包比较严重，需要不断重传。然后通过 ping curl 看看对应的时延高不高。
2. 然后通过 wireshake 看看具体哪里出了问题。
3. 假如别人访问很快，自己电脑很慢，就要看看自己客户端是否有问题了。
