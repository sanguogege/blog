---
date: 2025-05-27 16:21:17
title: net6 连接mysql 双表联查
permalink: /pages/148bdc
categories:
  - Net
  - CSharp
tags:
  - Net
  - CSharp
top: false
sticky: 
titleTag: 
description: net6 连接 mysql 双表联查、且 一张表存在的数据而另一张表中没有的数据。
coverImg: blog/CoverImg.png
---

# net6 连接 mysql 双表联查、且 一张表存在的数据而另一张表中没有的数据。

# net6 连接 mysql 双表联查。

首先呢依旧是 Pomelo.EntityFrameworkCore.MySql 设置的连接数据库方法。

就不过多说了。

```csharp
private readonly PoetsDb _dbContext;
public PoetryController(PoetsDb dbContext)
{
    _dbContext = dbContext;
}
```

双表联查使用。

```csharp
[HttpGet("/Poetry/{id}.html")]
public IActionResult Poetry(int id)
{
    var Poetry = (from p in _dbContext.Poetry
                    join a in _dbContext.Appreciation
                    on p.Id equals a.Pid
                where p.Id == id
                    select new
                    {
                        p.Title,
                        p.Content,
                        a.Fanyi,
                        a.Czbj,
                    }).FirstOrDefault();

    return View(Poetry);
}
```

sql 语句等于：

```sql
SELECT * FROM poetry a JOIN appreciation b on a.id=b.pid  WHERE a.Id = xxx
```

这里有个问题，如果表 Appreciation 没有 Pid 所对应的数据，上面就会报错。
使用 join left。

修改为：

```csharp
 [HttpGet("/Poetry/{id}.html")]
public IActionResult Poetry(int id)
{
    var Poetry = (from p in _dbContext.Poetry
                    join a in _dbContext.Appreciation
                    on p.Id equals a.Pid into c
                from x in c.DefaultIfEmpty()
                where p.Id == id
                    select new
                    {
                        p.Title,
                        p.Content,
                        p.Dynasty,
                        p.Sort,
                        x.Fanyi,
                        x.Czbj,
                        x.Jianshang,

                    }).FirstOrDefault();

    return View(res);
}
```

sql 语句等于：

```sql
SELECT * FROM poetry a LEFT JOIN appreciation b on a.id=b.pid  WHERE a.Id = xxx
```

若使用 linq 方法，

```csharp
[HttpGet("/Poetry/{id}.html")]
public IActionResult Poetry(int id)
{
    var res = (_dbContext.Poetry
    .GroupJoin(_dbContext.Appreciation, p => p.Id, a => a.Pid,
        (p, a) => new { p, a })
    .SelectMany(info => info.a.DefaultIfEmpty(),
        (info, a) => new { info.p, a })
    .Where(info => info.p.Id == id)
    .Select(r => new
    {
        r.p.Title,
        r.p.Content,
        r.p.Dynasty,
        r.p.Translate,
        r.p.Author,
        r.p.Author_id,
        r.p.Dynasty_id,
        r.p.Sort,
        r.a.Fanyi,
        r.a.Czbj,
        r.a.Jianshang,
        r.a.Shangxi,
        r.a.Bbsm,
        r.a.Pingxi,
        r.a.Shangxi2,
        r.a.Jianxi,
        r.a.Jianshang2,
    })).FirstOrDefault();

    return View(res);
}
```

就是需要自己设定自己需要的值。
