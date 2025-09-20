---
title: linux 部署 net6 应用程序（宝塔版）
date: 2025-07-25 05:48:45
categories:
  - 系统
  - 服务器
description: linux 部署 net6 应用程序（宝塔版）首先在 VS2022 上面把应用编译成 linux 上的运行文件！
---

# linux 部署 net6 应用程序（宝塔版）

## 宝塔为最新版本 7.9.3+

首先在 VS2022 上面把应用编译成 linux 上的运行文件！
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/c2b4bc3592e29fd699125e305f97ecaa.png)
然后通过上传到指定目录，也用过宝塔的坑定会。

杀杀杀

# linux 安装 net6 运行时。

依照官网的操作。我的是 CentOS 7，谁叫 8 不支持了呢！！

1.  安装 .NET 之前，请运行以下命令，将 Microsoft 包签名密钥添加到受信任密钥列表，并添加 Microsoft 包存储库。 打开终端并运行以下命令：

```html
sudo rpm -Uvh
https://packages.microsoft.com/config/centos/7/packages-microsoft-prod.rpm
```

2.  安装运行时

```html
sudo yum install dotnet-runtime-6.0
```

3.  查找 dotnet 目录。

```html
which dotnet
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/d7803461037cc167e83a250ee6e7cdf3.png)
搜索 dotnet，你会发现，真正的环境目录在 **/usr/share/dotnet/dotnet**
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/e7293859e803bec942c827bea19534db.png)
在宝塔里有一个，堡塔应用管理器，他集成了 supervisor 管理器，这下就不用费心了。![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/8c53667f0f34de7d4e54f191cdfc9d0c.png)

# 堡塔应用管理器管理 net 进程

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/7334bc81c95c03d81ea9b80ce7ed3b69.png)
选择环境池，添加环境，按照上面查找的路径一个一个选。

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/dbccf31ab2776a4620e225861bfdff2b.png)
点击选择 dotnet 文件。ok 环境添加成功。

返回到应用列表，添加应用即可。
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/0584c74b3c0dfc768d5dab5413c561af.png)名称：随意。
应用环境：上一步选的 dotnet 环境。
启动文件：就是我们打包后的启动的 xx.dll.
启动参数：直接写命令 dotnet xx.dll

最后一步就是去 nginx 里面修改一下代理。。
