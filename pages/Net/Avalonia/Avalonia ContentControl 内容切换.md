---
title: Avalonia ContentControl 内容切换
date: 2025-05-23 00:15:34
categories:
  - Net
  - Avalonia
description: 使用 ContentControl 来根据不同的值来切换对应的内容。使用控制数据模板 IDataTemplate 来实现。
---

纯记录。

使用 ContentControl 来根据不同的值来切换对应的内容。

使用控制数据模板 IDataTemplate 来实现。

首先，新建一个 IDataTemplate 。IDataTemplate 需要实现 Build 方法 和 Match 方法

```csharp
public class ShapesTemplateSelector : IDataTemplate
{

    [Content]
    public Dictionary<string, IDataTemplate> AvailableTemplates { get; set; } = new();


    public Control? Build(object? param)
    {
        var key = param?.ToString();
        if (key is null)
        {
            throw new ArgumentNullException(nameof(param));
        }
        return AvailableTemplates[key].Build(param);
    }


    public bool Match(object? data)
    {
        var key = data?.ToString();
        return data is Enum
               && !string.IsNullOrEmpty(key)
               && AvailableTemplates.ContainsKey(key);
    }
}
```

其中 AvailableTemplates 就是把你给的值和 axaml 里的 Window.DataTemplates 的 DataTemplate，一一存到字典里。这里用的是 Enum ，复杂的类型需要自己改了。

axaml 页面，引入在上面的方法命名空间 `xmlns:helper="using:AvaloniaApplication1.Helper"`

```xml
<Window.DataTemplates>
    <helper:ShapesTemplateSelector>
        <DataTemplate x:Key="ContentIsNull">
            <Ellipse Width="50"
                        Height="50"
                        Fill="Red"
                        Stroke="DarkRed"
                        StrokeThickness="2" />
        </DataTemplate>
        <DataTemplate x:Key="ContentReplace" >
            <Ellipse Width="50"
                        Height="50"
                        Fill="Gold"
                        Stroke="DarkRed"
                        StrokeThickness="2" />
        </DataTemplate>
        <DataTemplate x:Key="HtmlReplace">
            <Ellipse Width="50"
                        Height="50"
                        Fill="Red"
                        Stroke="DarkRed"
                        StrokeThickness="2" />
        </DataTemplate>
        <DataTemplate x:Key="SimplifiedToTraditional">
            <Ellipse Width="50"
                        Height="50"
                        Fill="Green"
                        Stroke="DarkRed"
                        StrokeThickness="2" />
        </DataTemplate>
    </helper:ShapesTemplateSelector>
</Window.DataTemplates>
<ComboBox Grid.Row="1" ItemsSource="{Binding AvailableShapes}"
                SelectedIndex="0"
                SelectedItem="{Binding SelectedShape}" />
<ContentControl  Grid.Row="2"
        Content="{Binding SelectedShape}"
/>
```

ViewModel

```csharp
[ObservableProperty]
private Enum _selectedShape;

public FilterType[] AvailableShapes { get; } = Enum.GetValues<FilterType>();
```

enum FilterType

```csharp
public enum FilterType
{
    [Description("内容为空")]
    ContentIsNull,

    [Description("内容替换")]
    ContentReplace,

    [Description("Html过滤")]
    HtmlReplace,

    [Description("正则替换")]
    RegReplace,
}
```

这样就 ComboBox 选哪个，ContentControl 也会跟着变。ComboBox 只是示例，也可以使用按钮 或者类似 MenuFlyout 这种。

注意这里全局的如果是控件支持的话，控件本身也会变成 DataTemplate 的样式，ComboBox 就是匹配到了，然后 ComboBox 下拉框各种颜色的圈圈。

可以改成内部样式，这样 ContentControl 独享或者其他指定绑定方式，自己问 deepseek 吧。

```xml
 <ContentControl.DataTemplates>
     <helper:ShapesTemplateSelector>
            <DataTemplate x:Key="ContentIsNull">
                 ...
            </DataTemplate>
            <DataTemplate x:Key="ContentReplace" >
                 ...
            </DataTemplate>
        </helper:ShapesTemplateSelector>
    </ContentControl.DataTemplates>
</ContentControl>
```
