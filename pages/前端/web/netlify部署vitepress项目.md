---
title: netlify部署vitepress项目
date: 2025-09-19 04:48:45
permalink: /pages/b7ece5
categories:
  - 前端
  - web
---

# netlify 部署 vitepress 项目

直接进入主题，netlify 有不少部署来源，有从 github 这样的代码托管上的拉取的，有模板，有上传文件。

vitepress 为什么不从 github 拉取，因为我在 GitHub Pages 也部署了自动更新。

坑就在这，由于 netlify 目录问题，在 GitHub Pages 里设置的 base 在 netlify 是不能用的，

所以，想同时部署到两个平台的就蛋疼了。

在 netlify 必须把 config.mts 里的 base: "XXX"，注释掉才可以。

然后 `bun/npm/pnpm run docs:build ` 打包，把.vitepress/dist 上传到 netlify 即可。

在 projects 页面直接上传或在 Add new project 里选择 Deploy manually，

上传文件夹或者托文件都可以。

上传成功页面就已经好了。。

如果没有 GitHub Pages，我刚刚就把 GitHub Pages 关了。

所以就简单了，netlify 里 Add new project 选择 Import an existing project，然后选择 GitHub。

Project name 填写自己想写的，它将会时你的系统提供的网址名。参看 [我的博客](https://sanguogege.netlify.app/)

Base directory 填写 / 即可，

Build command 写 `bun/npm/pnpm run docs:build ` 任意一个。

Publish directory 写 .vitepress/dist

然后 Deploy 即可。。记得 config.mts 里的 base: "XXX"，注释掉才可以或者改为 /。
