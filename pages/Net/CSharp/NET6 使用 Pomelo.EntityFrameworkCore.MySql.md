---
title: EntityFrameworkCore.MySql
date: 2025-04-20 08:30:52
permalink: /pages/ae9c4e
categories:
  - Net
  - CSharp
---

# NET6 使用 Pomelo.EntityFrameworkCore.MySql，无法从“string”转化为 Microsoft.EntityFrameworkCore.ServerVersion。

关于 net6 使用了 6.0 版本 Pomelo.EntityFrameworkCore.MySql 会报 configuration 再此处不为 null 的错误。

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/f7ae03d024a0fab5e32a22909c9196a3.png#pic_center)

那是因为 6.0 版本的参数多了一些东西要写。

修改方案其实很简单。再方法 useMySQL 在添加一个版本即可。

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/0500708be294ef10265d296ca3046151.png#pic_center)

```csharp
builder.Services.AddDbContext<MyDbContext>(options =>
options.UseMySql(builder.Configuration.GetConnectionString("CalendarConnection"),new MySqlServerVersion(new Version())));
```

如此就可以解决像 net6 迁移后，更新了程序包后出现的错误。
