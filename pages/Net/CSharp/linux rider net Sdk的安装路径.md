---
title: linux rider net Sdk的安装路径
date: 2025-06-28 03:07:30
categories:
  - Net
  - CSharp
description: >-
  仅记录一下，场景：新的 linux 为了写 C# ，安装了 rider，手快点了安装 net SDK。然后，发现在 bash 里 dotnet
  的命令不管用，比如 Avalonia 的模板就装不上，这不白搭了么。
---

## linux rider 先装装了.net。

仅记录一下，场景：新的 linux 为了写 C# ，安装了 rider，手快点了安装 net SDK。
然后，发现在 bash 里 dotnet 的命令不管用，比如 Avalonia 的模板就装不上，这不白搭了么。

1. 解决方案很简单，就是找到 rider 把 net SDK 的安装路径，然后添加到.bashrc 就好了。

2. rider 打开，随便在哪，打开设置=>构建、执行、部署=>工具包和构建(主要在这)，
   然后你就可以看到 .NET CIL 可执行文化路径，我的是'home/v/.dotnet/dotnet'

3. 把 路径加入.bashrc 文件

```
export PATH="$PATH:/home/v/.dotnet"

```

4.  source ~/.bashrc

完成。
