---
title: 服务器 OpenSSH 实现免密码连接
date: 2025-05-26 00:25:44
categories:
  - 系统
  - 系统设置
description: >-
  这个云服务器安装可把我给坑到了。CentOS 版本不一样可能会有所区别，我使用的 CentOS8.0，系统自带 openssh-clients 和
  openssh-server，而有的版本只默认开启 clients 服务。安装的方法有很多，可查阅相关文章，我是推荐我用到的。
---

# 服务器 OpenSSH 实现免密码连接

## 图片较多，请移步 [ 服务器 OpenSSH 实现免密码连接](https://blog.csdn.net/qq_21874123/article/details/105429485)

这个云服务器安装可把我给坑到了。
CentOS 版本不一样可能会有所区别，我使用的 CentOS8.0，系统自带 openssh-clients 和 openssh-server，而有的版本只默认开启 clients 服务。安装的方法有很多，可查阅相关文章，我是推荐我用到的。

#### 查看服务

**1、查看是否安装了相关软件：**

```handlebars
rpm -qa|grep -E "openssh"
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/5c088eddd237bdf8bfa5cfd6a55d28d5.png)
有的显示不一样，这三个有就可以了，而我们要的就是 openssh-server 这个功能，如果没有那就要安装了。

**2、安装 openssh-server：**

```handlebars
sudo yum install openssh*
```

**3、注册使用服务：**

```handlebars
sudo systemctl enable sshd sudo systemctl start sshd or: sudo service sshd start
```

**4、打开服务器 22 端口**

云服务器的端口开放是要去安全组规则（防火墙，有的名称不同）里去打开，入站规则和出站规则分别设置下，一般是需要对端口一一设置，原谅我使用了一键放行，这个是以[腾讯云](https://cloud.tencent.com/)作为示例的（快到期了），而我的现在用的[ucloud](https://www.ucloud.cn/)上叫防火墙，不是那么大众。
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/30cda086cd550194577595cdbb89d84b.png)

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/b659ddefa0f5c952556a38892f87fe4c.png)
**5、端口打开后要做的就是修改配置文件开启密钥验证了**

```handlebars
vim /etc/ssh/sshd_config
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/ba74c39510a06241334ca319a889f946.png)

1. PermitRootLogin 、 PubkeyAuthentication 这两项是要修改成 yes，PermitRootLogin 是允许 root 用户认证登录，而 PubkeyAuthentication 是启用公钥认证。AuthorizedKeysFile 是公钥路径，生成的。最后把 PasswordAuthentication 允许密登录给关掉，保存重启 ssh 服务。
2. 重启后就可以配合本地 SSH 访问了。
   `service sshd restart`

#### 注意

-   重启后，再次进入就要选择进入的方式了，默认的是只读，要修改还就得自己先看好在进入。
-   不要随意修改文件的用户权限，默认的即可，不然文件无法生效。ssh 公钥生效需满足至少下面两个条件：

```handlebars
1 .ssh目录的权限必须是700； 2 .ssh/authorized_keys文件权限必须是600；
```

-   这个是比较基础简单的，多多查阅资料才能解决问题。
