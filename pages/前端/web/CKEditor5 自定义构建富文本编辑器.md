---
title: CKEditor5 自定义构建富文本编辑器
date: 2024-10-21 12:48:45
categories:
  - 前端
  - web
description: CKEditor5 的编辑是一个非常好的编辑器，但其英文文档比较绕眼睛，所以特地记录一下，如何使用自定义构建。
---

# CKEditor5 自定义构建富文本编辑器！

# 前言

CKEditor5 的编辑是一个非常好的编辑器，但其英文文档比较绕眼睛，所以特地记录一下，如何使用自定义构建。

## 1、Online Bulider、SourceBuilding

此为官方提供的，不适合我等现代构建方式。
[自定义构建文档](https://ckeditor.com/docs/ckeditor5/latest/installation/getting-started/quick-start-other.html#introduction)

## 2、自定义构建，在项目直接创建一个全新的 0 开始的编辑器。

此次，使用的工具为 vite+solid，ui 不一样无所谓，构建方式都一样。

## 开始

1.  先安装 vite 插件和@types/node

`npm install -D @ckeditor/vite-plugin-ckeditor5`

`npm install --save @types/node`

2.  安装基础样式

`npm install --save @ckeditor/ckeditor5-theme-lark`

3.  在 vite.config 里编写。

```typescript
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";

export default defineConfig({
    plugins: [
        solid(),
        ckeditor5({ theme: require.resolve("@ckeditor/ckeditor5-theme-lark") }),
    ],
});
```

4.  最后一步安装 CKEditor5 的主体文件，和官方提供一样有多种样式，editor-classic、editor-balloon、editor-decoupled 等等。
    _注意区别，官方的是 @ckeditor/ckeditor5-build-classic_
    可查看 [api 描述](https://ckeditor.com/docs/ckeditor5/latest/api/editor-classic.html)

`npm install --save @ckeditor/ckeditor5-editor-classic`

## 使用

以上步骤完成后，就可以在项目中使用了。
新建一个 ts 文件作为 CKEditor5 配置文件。

```typescript
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";

class Editor extends ClassicEditor {
    // Plugins to include in the build.
    public static override builtinPlugins = [];

    public static override defaultConfig = {
        toolbar: {
            items: [],
        },
        language: "zh",
    };
}

export default Editor;
```

项目中引入，并在数据挂载完成后，使用。

```typescript
import { onMount } from "solid-js";
import Editor from "./editor";
function App() {
    let myDiv: any;

    onMount(() => {
        Editor.create(myDiv);
    });

    return (
        <>
            <div ref={myDiv}></div>
        </>
    );
}

export default App;
```

这时，最基本的编辑器框架已经完成，页面上也已经有了，一个输入框，但这个输入框什么用也没有。
因为 CKEditor5 ，所有的功能都是以插件的形式挂载上去的。
我们需要两个插件，缺一不可。

1、paragraph，这个插件是内容 p 标签化。PS：当然可以选择 md 的模式。

2、essentials，集成最基础的功能，比如输入、粘贴、加粗、斜体、删除线、下划线、上标、下标。

```typescript
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import {
    Bold,
    Italic,
    Strikethrough,
    Underline,
    Subscript,
    Superscript,
} from "@ckeditor/ckeditor5-basic-styles";

class Editor extends ClassicEditor {
    // Plugins to include in the build.
    public static override builtinPlugins = [
        Essentials,
        Paragraph,
        Bold,
        Italic,
        Strikethrough,
        Underline,
        Subscript,
        Superscript,
    ];

    public static override defaultConfig = {
        toolbar: {
            items: [
                "undo",
                "redo",
                "Bold",
                "Italic",
                "Strikethrough",
                "Underline",
                "Subscript",
                "Superscript",
                "",
                "",
            ],
        },
        language: "zh",
    };
}

export default Editor;
```

至此，一个自定义的基础班就完成了，剩下的插件你想要啥就安装啥，然后在配置文件中加入即可。而且，也可以自己定制想要的插件，如 SourceEditing。

```typescript
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { SourceEditing } from "@ckeditor/ckeditor5-source-editing";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import {
    Bold,
    Italic,
    Strikethrough,
    Underline,
    Subscript,
    Superscript,
} from "@ckeditor/ckeditor5-basic-styles";

class Editor extends ClassicEditor {
    // Plugins to include in the build.
    public static override builtinPlugins = [
        Essentials,
        Paragraph,
        SourceEditing,
        Bold,
        Italic,
        Strikethrough,
        Underline,
        Subscript,
        Superscript,
    ];

    public static override defaultConfig = {
        toolbar: {
            items: [
                "SourceEditing",
                "|",
                "undo",
                "redo",
                "Bold",
                "Italic",
                "Strikethrough",
                "Underline",
                "Subscript",
                "Superscript",
                "",
                "",
            ],
        },
        language: "zh",
    };
}

export default Editor;
```

打完收工！！
