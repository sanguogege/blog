---
date: 2025-07-26 12:48:45
title: win11 时间如何显示秒
permalink: /pages/cfe5d1
categories:
  - 系统
  - 系统设置
tags:
  - 系统
  - 系统设置
top: false
sticky: 
titleTag: 
description: win11 时间如何显示秒 第一种：修改注册列表 第二种：有些 win11 版本没有。
coverImg: blog/CoverImg.png
---

# win11 时间如何显示秒

## 第一种：修改注册列表

1、按 Win + R 键打开运行对话框，输入 regedit 并按回车；

2、在注册表中，导航至以下路径：

HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced

ps: 可以直接复制在顶层的输入框。

3、Advanced 文件夹下的空白处，右键选择 "新建" -> "DWORD (32 位)值"，并将其重命名为 ShowSecondsInSystemClock；

4、双击创建的 ShowSecondsInSystemClock，将其“数值数据”更改为 1，然后点击确定，关闭注册表，重启电脑即可。

## 第二种：有些 win11 版本没有。

1、Win+i 打开设置，然后打开“时间和语言”，再找到“日期和时间”，打开“显示系统托盘中的时间和日期”，最后勾选子选项“在系统托盘时钟中显示秒数”即可。

2、也可以直接鼠标右键任务栏，点击“任务栏设置”>“任务栏行为”>下滑找到“在系统托盘时钟中显示秒数”并勾选即可。

## 第三种

Win+X 打开菜单，然后选择：Windows Power Shell（管理员），在该窗口中输入以下命令回车后重启即可：

```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v ShowSecondsInSystemClock /t REG_DWORD /d 1 /f
```
