---
title: MessageBox父窗口
date: 2025-05-26 00:17:01
categories:
  - Net
  - Avalonia
description: 由于 ViewModel 中没有 window，所以 在 ViewModel 中使用 MessageBox 就是原地弹窗，不会跟着窗体走。
---

# Avalonia 关于 ViewModel 使用 MessageBox 不在父窗口正中。

仅记录一下。

由于 ViewModel 中没有 window，所以 在 ViewModel 中使用 MessageBox 就是原地弹窗，不会跟着窗体走。

但你不管其实也无伤大雅，但既然想到了不写一下还是有点小难受的，轻微强迫症。

既然 ViewModel 中没有，拿给他一个就完事了。

在 window.axaml.cs 里给。

```csharp
public XXWindow()
{
    InitializeComponent();
    XXWindowViewModel.OwnerWindow = this;
}
```

XXWindowViewModel.cs

```csharp
public static Window? OwnerWindow { get; set; }

private static async Task ShowMessageBox()
{
    await MessageBox.ShowAsync(
        owner: OwnerWindow!,
        message:"弹窗",
        title:"",
        icon: MessageBoxIcon.Error,
        button: MessageBoxButton.OK
    );
}
```

搞定。

当然 伟大的 MVVM 党岂会容忍 ViewModel 出现 window 这种邪恶的控件。

新建一个 interface IMessageCallback。

```csharp
public interface IMessageCallback
{
    Task ShowMessageAsync(string title, string message);
}
```

在 window 的 Code-Behind 的 window.axaml.cs 继承和实现 IMessageCallback。

```csharp
public partial class AddJobWindow :UrsaWindow, IMessageCallback
{

    public XXWindow()
    {
        InitializeComponent();
        XXWindowViewModel.MessageCallback = this;
    }

    public async Task ShowMessageAsync(string title, string message)
    {
        await MessageBox.ShowAsync(this, message, title,button: MessageBoxButton.OK,icon:MessageBoxIcon.Error);
    }
}
```

XXWindowViewModel.cs

```csharp
public static IMessageCallback? MessageCallback { get; set; }
private static void ShowMessageBox()
{
    MessageCallback!.ShowMessageAsync("", "MVVM以外都是邪教！！！");
}
```

好了。方法很多，这个仅是之一，还有什么容器注入，但我的构造函数还有其他用处，就不用这玩意了。

ps: 我用的是

```csharp
new XXWindow() { DataContext = new XXWindowViewModel(xx, xx) };
```

这种方法，直接就可以用 XXWindowViewModel.OwnerWindow

如果是

```csharp
var vm = new XXWindowViewModel(xx, xx)
new XXWindow(vm);
```

就是换一种而已。我用的看得舒服点。。也是 Avalonia 的写法。
