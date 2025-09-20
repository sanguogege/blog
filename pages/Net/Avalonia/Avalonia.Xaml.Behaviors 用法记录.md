---
date: 2025-08-26 20:48:45
title: Avalonia.Xaml.Behaviors 用法记录
permalink: /pages/e03de4
categories:
    - Net
    - Avalonia
tags:
    - Net
    - Avalonia
top: false
sticky:
titleTag:
description: 在 Avalonia 里使用 Avalonia.Xaml.Behaviors
---

### 在 Avalonia 里使用 Avalonia.Xaml.Behaviors

闲话不多说开始。
之前的版本一直都是使用

```csharp
  xmlns:i="clr-namespace:Avalonia.Xaml.Interactivity;assembly=Avalonia.Xaml.Interactivity"
  xmlns:ia="clr-namespace:Avalonia.Xaml.Interactions.Core;assembly=Avalonia.Xaml.Interactions.Core"
```

```csharp
<i:Interaction.Behaviors>
 	xxx
</i:Interaction.Behaviors>

<i:Interaction.Triggers>
  <i:EventTrigger EventName="LostFocus">
      <i:InvokeCommandAction Command="{Binding LostFocusCommand}" />
  </i:EventTrigger>
</i:Interaction.Triggers>
```

这样去使用。

但新版本没必要这么写。

直接使用 Interaction.Behaviors

例如我需要让 textbox 的 IsVisible 为 true 时 获取焦点并 选中全部。在失去焦点事隐藏

写了一个额外的 helper.

```csharp
public class FocusOnVisibleBehavior  : Behavior<TextBox>
{

    protected override void OnAttached()
    {
        base.OnAttached();

        if (AssociatedObject != null)
        {
            // 监听 IsVisible 属性的变化
            AssociatedObject.PropertyChanged += OnPropertyChanged!;
        }
    }

    protected override void OnDetaching()
    {
        base.OnDetaching();

        if (AssociatedObject != null)
        {
            // 移除事件监听
            AssociatedObject.PropertyChanged -= OnPropertyChanged!;
        }
    }

    private void OnPropertyChanged(object sender, AvaloniaPropertyChangedEventArgs e)
    {
        if (e.Property != Visual.IsVisibleProperty) return;
        if (AssociatedObject is not { IsVisible: true }) return;
        // 设置焦点
        AssociatedObject.Focus();

        // 全选文本内容
        AssociatedObject.SelectAll();
    }
}
```

```csharp
public void LostFocus()
 {
     IsEdit = !IsEdit;
 }

```

在文件中引入

```csharp
 xmlns:helper="using:AvaloniaScrapy.Helper"
```

然后直接写就可以了。

```csharp
<TextBox IsVisible="{Binding IsEdit}" Text="{Binding Name}">
     <Interaction.Behaviors>
         <helper:FocusOnVisibleBehavior />
         <EventTriggerBehavior EventName="LostFocus">
             <InvokeCommandAction Command="{Binding LostFocus}"/>
         </EventTriggerBehavior>
     </Interaction.Behaviors>
 </TextBox>
```

完成。
