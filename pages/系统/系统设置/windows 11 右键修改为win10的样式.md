---
Author: sanguogege
Date: 2025-04-20 00:36:29
LastEditors: sanguogege
LastEditTime: 2025-04-20 01:40:10
Description: "windows 11 右键修改为win10的样式"
---

# windows 11 右键修改为 win10 的样式

# 早期记录图片不少， 看图 移步 [windows 11 右键修改为 win10 的样式](https://blog.csdn.net/qq_21874123/article/details/126426229)

众所周知，win10 是 windows 的最后一个版本。
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/5a82e89bfd551d14b0f85b62d3dc212b.png)
所以，这种三哥写出来的右键邪教，真的是忍无可忍。

**打开管理员 cmd**

```html
reg.exe add
"HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32"
/f /ve
```

_reg.exe add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve_

修改回 win10 的样式！
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/f45387119a439175a356ac46212bd602.png)
完美收工！
当然改回来也是可以的。

```html
reg.exe delete
"HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32"
/va /f
```

_reg.exe delete "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /va /f_
