---
title: 万年历生成calendar
date: 2025-06-27 04:48:45
permalink: /pages/0f410d
categories:
    - 前端
    - web
tags:
    - 前端
    - web
top: true
sticky: 1
titleTag: 推荐
description: 万年历生成器，生成前端js的calendar，还有一个自定义休息与调休日
---

# 万年历生成

<p align="center"> <b>万年历生成器</b> </p>

### web 构建工具使用:

`npm i @sanguogege/calendar`

```
import calendar from "@sanguogege/calendar";

const today  =  calendar.solar2lunar(2021, 3, 21)

```

### 传统页面直接复制/dist/index.iife.js 或者 /dist/index.umd.cjs index.iife.js

```
<script src="./dist/index.iife.js"></script>
<script>
    const today  =  calendar.solar2lunar(2021, 3, 21)
</script>

```

### calendar 所有的方法。

##### 这两个是最主要的方法，常用的，还有一个自定义休息与调休日

-   solar2lunar(y: number, m: number, d: number)
    -   未传参获得当天，传入阳历年月日获得详细的公历、农历 object 信息
-   lunar2sola(y: number, m: number, d: number, isLeapMonth: boolean)

    -   传入农历年月日以及传入的月份是否闰月获得详细的公历、农历 object 信息

-   Rest 查看当前的休息日与调休日，若没有添加则是插件自带。

-   setRest= { }

        -   设置休息日与调休日
        -   格式为: ` {
        2023:{
            xiu:['0101'],
            ban:['0202,0203']
        }

    }`

-   Festival 查看当前的节日信息，若没有添加则是插件自带。

-   setFestival= { }

        -   设置农历、公历节日信息，sFtv 为公历，lFtv 为农历
        -   格式为: `  {
        sFtv: {
            "0123": ["节日名称"]
        },
        lFtv: {
            "0109": ["节日名称"]
        }

    }`

-   lYearDays (y: number)
    -   返回农历 y 年一整年的总天数
-   leapMonth (y: number)
    -   返回农历 y 年闰月是哪个月；若 y 年没有闰月 则返回 0
-   leapDays (y: number)
    -   返回农历 y 年闰月的天数 若该年没有闰月则返回 0
-   lMonthDays(y: number, m: number)
    -   返回农历 y 年 m 月（非闰月）的总天数，计算 m 为闰月时的天数请使用 leapDays 方法
-   toChinaMonth (m: number)
    -   传入农历数字月份返回汉语通俗表示法
-   toChinaDay(d: number)
    -   传入农历日期数字返回汉字表示法
-   solarDays (y: number, m: number)
    -   返回公历(!)y 年 m 月的天数
-   solarFirstWeek (y: number, m: number)
    -   返回公历(!)y 年 m 月的第一天是星期几
-   toAstro(m: number, d: number)
    -   公历月、日判断所属星座
-   getAnimal(y: number)
    -   年份转生肖[!仅能大致转换] 精确划分生肖分界线是“立春”
