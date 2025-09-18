---
Author: sanguogege
Date: 2025-04-20 00:45:44
LastEditors: sanguogege
LastEditTime: 2025-04-22 22:12:08
Description: " Visual Studio Code安装使用Remote 远程开发配置"
---

# Visual Studio Code 安装使用 Remote 远程开发配置

# 图片较多，请移步 [Visual Studio Code 安装使用 Remote 远程开发配置](https://blog.csdn.net/qq_21874123/article/details/105425444)

## 简介

它来了，它来了，它带着 Remote 走来了，微软发布了 VS Code Remote，这里主要记录一下 Win10 下配置 VS Code 使用 SSH 连接远程开发调试的心得，忙了几个小时的辛酸，只能说自己太傻。

### 工作准备

本地操作系统：win10
安装包（最新版本就可以了）：[vsCode 下载](https://code.visualstudio.com/)
服务器操作系统：Linux (Centos、Ubuntu 都 OK)

### 配置 ssh 和生成 SSH key

首先，本地和服务器都需要安装 ssh，这里就不说了，参考以下这边文章。
[win10 开启 OpenSSH 服务](https://blog.csdn.net/qq_21874123/article/details/105428708)
[服务器 OpenSSH 实现免密码连接](https://blog.csdn.net/qq_21874123/article/details/105429485)

**1.** `win+r` 输入 PowerShell，输入`ssh-keygen`，直接三下 enter，就生成了密钥。当然你可以用来指定一些信息，详情可自己查阅。
**2.** 进入`C:\Users\98195\.ssh`你可以查看到自己生成的密钥，我的是因为有两个服务器才指定名称好记，.pub 是公钥用来上传到服务器的。
**3.** .pub 你可以自行上传到服务器，如果手头没有 ssl 工具，vscode 也可以上传的。
![密钥生成](https://i-blog.csdnimg.cn/blog_migrate/f3a4b103ba4e217c077ec7d7056a68c8.png)

### VsCode 上的配置

1. 打开 vsCode，点击拓展，安装 Remote Development，当然你也可以安装 Remote - SSH 这一个插件，安装完成后会出现小电视图标。
   ![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/05b5a5605d1c60e896409d911d2c4f5c.png)
2. 点击远程资源管理器 >> 添加 >> 输入连接名称（可随意写）>> 选择配置文件 C:\Users\98195\config。这样就生成名为 example 的连接。
   ![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/c23114aea6c1c3d8db72bab4b78d9b6a.png)
   ![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/a5aff7690a81a48a7e04b5be20e0ed8c.png)
3. 点击设置，然后选择 `C:\Users\98195\config` 然后编辑器会自动打开 config 文件，填写自己的信息就是了。
   ![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/b6ecb1320f968c81adde83640129d4e2.png)
4. 若是你已经把.pub 上传到服务器，可直接跳到下一段。点击连接，按照步骤选择 Linux >> 输入你的密码，这样你的 SSH 就已经可以用密码连接了。
   ![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/d4bc341c96a340cb2d3c037442d6f88c.png)
   ![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/d9b027b6fa4ddeef3131d7e0c70bc8b4.png)
5. 点击文件选项。 打开文件 >> 选择.ssh >> authorized_keys 文件。将之前的本地文件 `xxx.pub` 用 vscode 打开并复制里面的内容到 authorized_keys 里面，保存。这样你的文件就上传好了。
   ![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/1e0b644239543ae9ae4bfa2d772a289d.png)

### SSH 免密码登录

我们的公钥已经上传到服务器了，只要做最后的修改即可，如果你的服务器 /etc/ssh/sshd_config 早已经修改好了，那就可以直接修改 config 文件，把剩下的部分添加完成。点击连接，这样就完成了。操作就是点击“文件”，选择文件或者文件夹，就可以快乐的修改啦。
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/e97f63d12149e549e7769863e83ddb50.png)

**基本和本地使用 vscode 没有差别**
