---
title: solidjs  处理复杂类型的响应式
date: 2024-10-25 04:48:45
categories:
  - 前端
  - web
description: 在 solidjs 里响应式一般直接用 createSignal 就可以，但 createSignal 一般用于基础数据类型。
---

# solidjs 处理复杂类型的响应式

在 solidjs 里响应式一般直接用 createSignal 就可以，但 createSignal 一般用于基础数据类型。

虽然复杂类型也是可以使用，但基于起细粒度响应性的特性。
一般复杂的数据使用 createSignal 就不是那么友好了。

所以 createStore 就来了。

例子如下：用 createSignal 的话就要设置整个 formData 以覆盖原值。

```javascript
const [formData, setFormData] = createSignal<formData>({
    columnID: "0",
    pageSize: 20,
    keyword: "",
});

// 修改keyword的值
setFormData({
    ...
    keyword: "xxx",
})

//或者
setFormData(prev => ({ ...prev, keyword: "xxx" }));

```

明显的当 createSignal 用于对象时，每次更新都需要创建新对象。

使用 createStore 代替。

```javascript
const [formData, setFormData] =
    createStore <
    formData >
    {
        columnID: "0",
        pageSize: 20,
        keyword: "",
    };

setFormData("keyword", newValue);
```

那么增加更复杂的对象

```javascript
const [formData, setFormData] =
    createStore <
    formData >
    {
        columnID: "0",
        pageSize: 20,
        keyword: "",
        details: {
            address: "",
        },
    };

// 修改address，使用路径

setFormData("details", "address", addressValue);
```

是不是一下在就清晰明了。接下来就是实战了。

我有一个表单，formData 类型还是上面的，。

```javascript

// 可以直接设置
<input
    type="text"
    value={formData.details.address}
    onInput={(e)=> setFormData("details","address",e.target.value);}
/>

```

添加自定义方法基础款

```javascript
const updateField = (path: any) => (e: any) => {
    setFormData(path, e.target.value);
};

<input type="text" value={formData.keyword} onInput={updateField("keyword")} />;
```

添加自定义方法进阶款，适用有套嵌

```javascript
const updateField = (path: any) => (e: any) => {
    setFormData(...path, e.target.value);
};

<input
    type="text"
    value={formData.details.address}
    onInput={updateField(["details","address"])}
/>
<input
    type="text"
    value={formData.keyword}
    onInput={updateField(["keyword"])}
/>

```

若数组(严格来说这里是元组)不好看。改用 string 也是可以的。

```javascript
const updateField = (path: string) => (e: any) => {
    const keys = field.split(".");
    setFormData(...keys, e.target.value);
};

<input
    type="text"
    value={formData.details.address}
    onInput={updateField("details.address")}
/>;
// 是不是一下子就美观多了。
```

若在 TS 项目中使用会报错...keys 这里会报扩展参数必须元组类型或这传递参数 rest，比较蛋疼不影响使用。但也是可以解决的，虽然是取巧，但 anyScript 嘛

```javascript
const updateField = (field: string) => (e: Event) => {
    const keys = field.split(".");
    (setFormData as any)(...keys, (e.target as HTMLInputElement).value);
};

```
