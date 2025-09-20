---
title: vite 开发并打包 npm库文件
date: 2025-09-21 12:48:45
permalink: /pages/7f092c
categories:
  - 前端
  - vite
description: 如何用 vite 开发并打包 库文件。其实在开发库的时候有很多选择。比如 webpack，rollup，esbuild 等等。
---

# vite 开发并打包 npm 库文件。

## 如何用 vite 开发并打包 库文件。

其实在开发库的时候有很多选择。比如 webpack，rollup，esbuild 等等。

但这些都要配置，尤其是当你发现**rollup-plugin-typescript**没卵用的时候，还得去翻找 rollup-plugin-typescript2，虽然安装对于我们来说很快，但还是要很多设置的。

所以[vite](https://cn.vitejs.dev/)的库模式是一个非常好的选择。

那就来吧，试试，。

```javascript
npm create vite@latest
```

选择世界上最好的 javascript 框架 **Vanilla**。
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/ab7f7787f59e3a15dd5d3057f0f63cd1.png)

```javascript
cd vite-project
npm install
```

首先添加 ` "files": ["dist"],`
这样就指定了 npm 提交的文件夹，对了，`"private": true,`要删除，不然不给提交。

```bash
{
  "name": "vite-project",
  "private": true,
  "version": "0.0.0",
  "type": "module",
   "files": [
        "dist"
    ],
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "typescript": "^5.0.2",
    "vite": "^4.3.0"
  }
}
```

然后 `keywords 、author、description`等等就看你写了。

但 vite 默认的接口文件是 index.html。所以就要修改，index.html 就留给 dev 吧。

而默认 Vanilla 是没有 vite.config.js 的，所以在根目录新建一个即可。

[库模式官方文档](https://cn.vitejs.dev/guide/build.html#library-mode)

按照指示修改，`lib` 里的`entry`代表文件入口，`name`代表打包后库的名字，就是引入文件后的变量名，`fileName`，就是你打包后文件的名字。

当然更多的文档里有，比如文件拆分，相对于其他的来说，这点配置就是毛毛雨。

最后就是当你的库编写的差不多的时候，直接 build 了，他的默认打包在/dist 文件夹下的。
