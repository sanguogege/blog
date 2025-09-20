---
title: Nestjs 简单的服务器部署
date: 2024-10-25 20:48:45
categories:
    - 前端
    - web
tags:
    - Nestjs
    - 部署
description: 如何在服务器部署 nestjs，其实是很简单的。首先服务器上需要一个只要安装一个 node。安装方法自行百度就不多说了。
---

# Nest.js 简单的服务器部署。

如何在服务器部署 Nest.js
首先服务器上需要一个只要安装一个 node。安装方法自行百度就不多说了。

在 Nest.js 部署服务器上的时候，你需要的只有一个文件夹---dist 文件夹+package.json。

package 用来执行需要的文件包。

所以你在上传之前需要执行一下 nest build，生成全新的 dist 文件夹。
上传之后，先 npm i 安装模块包。
然后进入 dist 文件夹，执行 node main.js 即可。

当然这是最简单的服务器部署。
