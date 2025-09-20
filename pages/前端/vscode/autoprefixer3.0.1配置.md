---
title: autoprefixer3.0.1 配置
date: 2025-09-21 12:48:45
permalink: /pages/f3df09
categories:
    - 前端
    - vscode
description: 网上一看全是改版本，妈的这些狗比做 seo 的真坑。搜了半天，一看，还是有答主给力的，虽然不知道是首发，但确实按搜索往下拉的第一个。
---

# autoprefixer3.0.1 配置

## autoprefixer3.0.1 在 vscode 无法生效的一个解决方法

网上一看全是改版本，妈的这些狗比做 seo 的真坑。

搜了半天，一看，还是有答主给力的，虽然不知道是首发，但确实按搜索往下拉的第一个。

特意上来写一下，让更多人看到。

简书上的。
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/b62c426a4c8ec9f4e7589e4d53dc5bd7.png#pic_center)

```bash
"autoprefixer.options": {
	"browsers": [
	"ie >= 6",
	"firefox >= 8",
	"chrome >= 24",
	"Opera >= 10",
	"last 2 versions",
	"> 5%"
]}
```

相较于其他兼容版本 就是把 autoprefixer.browsers 变成 browsers 就可以了。
