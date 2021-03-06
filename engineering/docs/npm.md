# npm

## npm install

npm install 会先检查 node_modules 目录中是否存在指定模块，如果存在，则不会重新安装，即使远程仓库有新版本。
可以使用 -f 或 --force 强制重新安装。

- `npm install <packageName> --force`
- `npm update <packageName>` 会先查询远程仓库最新版本，如果本地版本不存在或远程版本较新，则会安装。

npm install -g 过程：

1. 包安装在 `{prefix}/node_modules` 下
2. 在全局命令`{prefix}/bin`下生成映射，指向`{prefix}/lib`下真实文件。

## register

如何查询远程仓库的最新版本？ npm 提供了模块的查询服务叫 registry。

如:

```
https://registry.npmjs.org/react
https://registry.npmjs.org/react/v0.14.6
```

会获取到 react 包所有版本信息。和 npm view 一样。

npm view 默认打印包的 latest 版本信息。

```
npm view react

# npm view 的别名
npm info react
npm show react
npm v react
```

![](./imgs/2021-06-16-22-32-19.png)

npm install 和 npm update 都是通过 registry 查询，然后根据 dist.tarball 下载压缩包，存放到缓存目录 ~/.npm，解压到 node_modules 目录。

下载的压缩包放在缓存目录里。 mac 放在用户的 .npm 目录; windows 默认是 %AppData%/npm-cache

可以通过 npm config get cache 命令获取缓存目录。

npm 缓存基于 cacache 模块，所有缓存的数据在插入和取出时都会进行完整性验证，如果损坏会触发错误，删除并重新获取。所以缓存总是可用的无清除，而 clean 现在需要 --force。

```
npm cache verify 验证缓存
```

maintainers: 维护者

https://juejin.cn/post/6844903582337237006#heading-6
https://dev.to/shree_j/how-npm-works-internally-4012
https://docs.npmjs.com/cli/v7/configuring-npm/npmrc

## npm link

在包中 `npm link`

1. 它会在 `{prefix}/lib/node_modules` 创建快捷方式，指向 npm link 的目录。
2. 将所有 bin 命令链接到 `{prefix}/bin/{name}`。

执行 `npm link package-name` 会在当前包 node_modules 中创建全局包 package-name 的快捷方式。

```
{
  "bin": {
    "v": "./bin/v.js"
  }
}
```
