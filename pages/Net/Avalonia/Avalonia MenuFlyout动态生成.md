---
date: 2024-10-27 04:48:45
title: Avalonia MenuFlyout动态生成
permalink: /pages/5246fe
categories:
  - Net
  - Avalonia
tags:
  - Net
  - Avalonia
top: false
sticky: 
titleTag: 
description: MenuFlyout 的动态生成方法有很多，不过有时候确实挺蛋疼的。这是最常见的静态写法。
coverImg: blog/CoverImg-4.png
---

### Avalonia MenuFlyout 的一些心得记录。免得忘记。

MenuFlyout 的动态生成方法有很多，不过有时候确实挺蛋疼的。

这是最常见的静态写法。

```csharp
 <Button.Flyout>
	<MenuFlyout Placement="RightEdgeAlignedTop">
	    <MenuItem Header="00000"/>
	      <MenuItem Header="00000"/>
	      <MenuItem Header="00000"/>
	      <MenuItem Header="00000"/>
	      <MenuItem Header="11">
	          <MenuItem Header="11122"/>
	      </MenuItem>
	 </MenuFlyout>
 </Button.Flyout>
```

动态写法是这样的吗？说实话我也不要清楚（新手哈），但我的理解和 listbox 写法差不多，但坑爹的是样式不一样，行为也不一样比如 Member 由鼠标移上去变成点击展开，WTF。

```csharp
 <Button.Flyout>
	 <MenuFlyout ItemsSource="{Binding ReplaceFilters}" Placement="RightEdgeAlignedTop" >
	    <MenuFlyout.ItemTemplate>
	        <DataTemplate x:DataType="models:ReplaceFilter">
	             <MenuItem Padding="0" Header="{Binding Title}"  ItemsSource="{Binding Member}">
	                 <MenuItem.ItemTemplate>
	                     <DataTemplate x:DataType="models:ReplaceFilter">
	                         <MenuItem Header="{Binding Title}" />
	                     </DataTemplate>
	                 </MenuItem.ItemTemplate>
	             </MenuItem>
	         </DataTemplate>
	     </MenuFlyout.ItemTemplate>
	  </MenuFlyout>
  </Button.Flyout>
```

但好在互联网还在，换个思路就是这样。

```csharp
 <Button.Flyout>
	<MenuFlyout ItemsSource="{Binding ReplaceFilters}" Placement="RightEdgeAlignedTop">
	 	<MenuFlyout.ItemContainerTheme>
		    <ControlTheme TargetType="MenuItem" BasedOn="{StaticResource {x:Type MenuItem}}" x:DataType="models:ReplaceFilter">
			      <Setter Property="Header" Value="{Binding Title}"/>
			      <Setter Property="ItemsSource" Value="{Binding Member}"/>
		    </ControlTheme>
		  </MenuFlyout.ItemContainerTheme>
	</MenuFlyout>
 </Button.Flyout>
```

好了，想要什么直接写就是了。。。
