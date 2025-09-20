---
title: TreeDataGrid 自定义模板的ContextMenu
date: 2025-05-27 00:19:53
categories:
    - Net
    - Avalonia
tags:
    - TreeDataGrid
    - Avalonia
description: Avalonia 使用 TreeDataGrid 自定义模板的ContextMenu 点击并行任务。
---

# Avalonia 使用 TreeDataGrid 自定义模板的 ContextMenu 点击并行任务。

记录这蛋疼的 TreeDataGrid ，
[这篇文章](https://blog.csdn.net/qq_21874123/article/details/145840869)讲了如何使用 TreeDataGrid ，但问题来了，我选中的那一行咋搞。那就以这篇文章为例子。

简单就是 ` JobListSource.RowSelection!.SelectionChanged += TreeSelectionChanging;`

方法 TreeSelectionChanging

```csharp
[ObservableProperty]
private JobList? _selectedJob;
```

```csharp
private void TreeSelectionChanging(object? sender, TreeSelectionModelSelectionChangedEventArgs<JobList> e)
{
    var source = JobListSource.Selection  as ITreeDataGridRowSelectionModel<JobList>;
    ContextMenuType = source!.SelectedItem!.Type;
    SelectedJob = source.SelectedItem!;
}
```

SelectedJob 就是选中的玩意。。
这样还要新建属性，然后在构造函数里写。

所以直接将创建 HierarchicalTreeDataGridSource 放到一个方法里。

```csharp
private  HierarchicalTreeDataGridSource<JobList> CreatJobList( ObservableCollection<JobList> navJobs)
{
    var res =  new HierarchicalTreeDataGridSource<JobList>(navJobs)
    {
        Columns =
        {
          ...
        },
    };
    res.RowSelection!.SelectionChanged += TreeSelectionChanging;
    return res;
}
```

构造函数赋值。

```csharp
public XXViewModel()
{
    JobListSource =  CreatJobList(JobLists);
}
```

好了，讲任务，一般来说 这种表格会有右键功能，但如果在 ViewModel 简单的写一个 RelayCommand，右键点击后，在这个功能完成前，其他 row 的相同功能是不行继续点击的。
如果没有特殊需求就算了，但有特殊需求就要想办法了。一种是新建一个 AsyncCommand

```csharp
public class AsyncCommand<T>(Func<T, Task> execute, Func<T, bool>? canExecute = null) : ICommand
{
    private readonly Func<T, bool> _canExecute = canExecute ?? (_ => true);

    public bool CanExecute(object? parameter) => _canExecute(((T)parameter!));

    public async void Execute(object? parameter)
    {
        await ExecuteAsync((T)parameter!);
    }

    private async Task ExecuteAsync(T? parameter)
    {
        try
        {
            await execute(parameter!);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"命令执行失败: {ex.Message}");
        }
    }

    public event EventHandler? CanExecuteChanged;

    public void RaiseCanExecuteChanged()
    {
        CanExecuteChanged?.Invoke(this, EventArgs.Empty);
    }
}
```

然后定义这个类型的命令去写绑定就行了，但代码不够简洁且不符合 MVVM 最佳实践。
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/a6ca698eba514292a6e433df5dfca429.png)
这是 deepseek 说的。这狗日的一直让我 AsyncCommand。。

伟大的 MVVM 党岂会容忍这狗日的。改。

既然是 TreeDataGrid 的 row，那就很好办了。我给每一个 joblist 都加一个 RelayCommand 不就得了？

```csharp
public class JobList
{
    public string? Title { get; set; }

    public string? SiteMemo { get; set; }

    public bool? IsSelect { get; set; }

    public ListType Type { get; set; } = ListType.IsFile;

    public ObservableCollection<JobList> Members { get; set; } = [];

 	[RelayCommand]
    private async Task RunXX()
    {
        await xxx(Title);
    }
}

```

PS： 并行的用异步，微软这狗比必叫好。
想用什么值直接拿，多省心。

TreeSelectionChanging 修改一下。

```csharp
[ObservableProperty] private IAsyncRelayCommand XXCommand = null!;

private void TreeSelectionChanging(object? sender, TreeSelectionModelSelectionChangedEventArgs<JobList> e)
{
    var source = JobListSource.Selection  as ITreeDataGridRowSelectionModel<JobList>;
    ContextMenuType = source!.SelectedItem!.Type;
    SelectedJob = source.SelectedItem!;
    XXCommand = source.SelectedItem!.RunXXCommand;
}
```

然后是 axaml。

```xml
<TreeDataGrid Source="{Binding JobListSource}">
    <TreeDataGrid.Resources>
        <!-- 树  -->
        <DataTemplate x:Key="JobList" x:DataType="models:JobList" >
            <StackPanel Orientation="Horizontal" VerticalAlignment="Center">
                <PathIcon Width="12" Height="12" Margin="8,0,12,0" Data="{Binding Type,Converter={helper:TypeToGeometryConverter}}"/>
                <TextBlock Text="{Binding Title}" VerticalAlignment="Center"/>
            </StackPanel>
        </DataTemplate>
    </TreeDataGrid.Resources>
    <TreeDataGrid.ContextMenu>
        <ContextMenu>
            <MenuItem
                Command="{Binding XXCommand}"
                IsVisible="{Binding ContextMenuType,Converter={helper:FileBoolConverter}}" Header="开始"/>
        </ContextMenu>
    </TreeDataGrid.ContextMenu>
</TreeDataGrid>
```

多优雅，多简洁，deepseek 用了都说好。这坑爹的 TreeDataGrid。。
