---
date: 2025-05-29 12:48:45
title: TreeDataGrid自定义模板
permalink: /pages/96999a
categories:
  - Net
  - Avalonia
tags:
  - Net
  - Avalonia
top: false
sticky: 
titleTag: 
description: Avalonia 使用 TreeDataGrid 自定义模板 分层树数据表格，Avalonia.Controls.TreeDataGrid 。
coverImg: blog/CoverImg-4.png
---

# Avalonia 使用 TreeDataGrid 自定义模板 分层树数据表格，Avalonia.Controls.TreeDataGrid 。

### Avalonia.Controls.TreeDataGrid 小记

官方的例子[TreeDataGrid](https://docs.avaloniaui.net/zh-Hans/docs/reference/controls/treedatagrid/creating-a-hierarchical-treedatagrid) 是基础版的。

而 TreeDataGrid 本身的例子写了太多玩意，乱糟糟的，所以特此记录一下。

一个 model

```csharp
public class JobList
{
    public string? Title { get; set; }

    public string? SiteMemo { get; set; }

    public bool? IsSelect { get; set; }

    public ListType Type { get; set; } = ListType.IsFile;

    public ObservableCollection<JobList> Members { get; set; } = [];
}

```

自定义数据

```csharp
public static ObservableCollection<JobList> NavJobs { get; set; } = [
new JobList
    {
        Title = "测试问价",
        Type = ListType.IsFile,
        Members = [
            new JobList
            {

                Title = "测试文件夹的第一个",
                Members = [
                    new JobList
                    {
                        Title = "测试文件夹的第一个",
                    },
                    new JobList
                    {
                        Title = "非空文件夹",
                        Type = ListType.IsFolder,
                    },
                ]
            },
            new JobList
            {
                Title = "非空文件夹",
                Type = ListType.IsFolder,
            },
        ]
    },
];
```

转为 TreeDataGrid 所需要的类型。

```csharp
public HierarchicalTreeDataGridSource<JobList> JobListSource { get; set; } =new(NavJobs)
{
    Columns =
    {
        new HierarchicalExpanderColumn<JobList>(
            new TemplateColumn<JobList>(
                "Name",
                "FileNameCell",
                null,
                new GridLength(200, GridUnitType.Pixel),
                new TemplateColumnOptions<JobList>
                {
                    IsTextSearchEnabled = true,
                }),
            x => x.Members),
        new CheckBoxColumn<JobList>("采集", x => x.IsSelect),
        new CheckBoxColumn<JobList>("采集", x => x.IsSelect),

    }
};
```

-   Columns 就是设置列，HierarchicalExpanderColumn 表明是一个可展开的列，官方使用的是 TextColumn，
-   所有我们使用 TemplateColumn 完成我们想要的效果，
-   "Name" 字符串是 header 也就是列的名称，可填自己想要的，
-   "FileNameCell"字符串 是 cellTemplateResourceKey 也就是模板名称，这个在 axaml 中要定义的 。
-   第三个 null 是 cellEditingTemplateResourceKey 也就是可编辑模板名称，同上，为空就是不要。
-   GridLength 是设置这一列的宽度 GridUnitType.Pixel 是以像素为单位，
-   TemplateColumnOptions 是这设置一些额外的属性，不想写为空就是了。
-   x => x.Members 就是子元素。

![这是](https://i-blog.csdnimg.cn/direct/9562eef63f1e489b9aa470e196d40f61.png)

最后，axaml.

```xml
<TreeDataGrid Source="{Binding JobListSource}">
  <TreeDataGrid.Resources>
       <DataTemplate x:Key="FileNameCell" x:DataType="models:JobList" >
           <StackPanel Orientation="Horizontal" VerticalAlignment="Center">
               <PathIcon Width="12" Height="12" Data="{StaticResource EditRegular}"/>
               <TextBlock Text="{Binding Title}" VerticalAlignment="Center"/>
           </StackPanel>
       </DataTemplate>
   </TreeDataGrid.Resources>
</TreeDataGrid>
```

效果
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/a0a5e6ea005842608cf9cca2f4df869d.png)
确实蛋疼了点。。PathIcon 的 Converter 或者其他的就自己写吧。
