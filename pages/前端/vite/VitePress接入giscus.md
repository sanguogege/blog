---
title: VitePress接入giscus
date: 2025-09-21 12:48:45
permalink: /pages/5cbcff
categories:
    - 前端
    - vite
description: VitePress 搭建-接入 giscus 的注意事项。 如何创建就不说了。教程很多。
---

# VitePress 搭建-接入 giscus 的注意事项。

## 如何创建就不说了。教程很多。

说几个注意项目。

1.  这是[App 地址](https://giscus.app/)，十分有用。
    在这里你可以直接获取到你使用的一些参数，以及检查你的仓库可不可用。
    **仓库要求**

-   是 public 的，这个很简单。
-   安装 giscus app 应用。 [app 安装地址](https://github.com/apps/giscus)，点进去就行，按步骤操作直接完成就好了。没别的问题。
-   打开 Discussions ， settings 直接下拉，找到 Discussions 勾选上。完成。

2.  在使用 giscus 有几个用户信息需要自己填。好在 App 地址 有工具。

-   在 repository 输入框输入 {用户名}/{仓库名} 后 他会检测仓库要求是否全部达成。
-   然后就是设置 Discussions 的相关设置，其中 Discussion Category 需要自己选的。也就是让你的评论储存在 Discussions 的那块地方，有 announcements、General、Ideas，随便选。
-   选完后，在往下会有这个。

```javascript
<script
    src="https://giscus.app/client.js"
    data-repo="xxx" //后续需要用
    data-repo-id="xxx" //后续需要用
    data-category="General" //后续需要用
    data-category-id="xxx" //后续需要用
    data-mapping="pathname"
    data-strict="0"
    data-reactions-enabled="1"
    data-emit-metadata="0"
    data-input-position="bottom"
    data-theme="preferred_color_scheme"
    data-lang="zh-CN"
    crossorigin="anonymous"
    async
></script>
```

有了这些信息就可以在 VitePress 用了。

在.vitepress 里的 theme 文件夹里新建一个 myLayout.vue 文件。

```javascript
<script setup lang="ts">
import Giscus from "@giscus/vue";

import escookTheme from "@escook/vitepress-theme";
import { watch } from "vue";
import { inBrowser, useData } from "vitepress";

const { isDark, page } = useData();

const { Layout } = escookTheme;

watch(isDark, (dark) => {
    if (!inBrowser) return;

    const iframe = document
        .querySelector("giscus-widget")
        ?.shadowRoot?.querySelector("iframe");

    iframe?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: dark ? "dark" : "light" } } },
        "https://giscus.app"
    );
});

</script>
<template>
    <Layout>
        <template #doc-footer-before> </template>
        <template #doc-after>
            <div style="margin-top: 24px">
                <Giscus id="comments" repo="用户名/仓库名" repoId="仓库Id" category="分类名称"
                    categoryId="分类Id" mapping="pathname" strict="0" reactions-enabled="1"
                    emit-metadata="0" input-position="bottom" lang="zh-CN" crossorigin="anonymous"
                    :theme="isDark ? 'dark' : 'light'" />
            </div>
        </template>
    </Layout>
</template>
<style scoped></style>
```

把之前拿到的 repo、repoId、category、categoryId 填上去。

escookTheme 是我用的自定义主题，如果不用用 DefaultTheme 也就行

```javascript
import DefaultTheme from "vitepress/theme";
const { Layout } = DefaultTheme;
```

然后在 theme 的 index 文件引用即可。

```javascript
import { h } from "vue";
import type { Theme } from "vitepress";

import "@escook/vitepress-theme/style.css";
import "./style.css";
import myLayout from "./components/myLayout.vue";

import dataShow from "./components/dataShow.vue";

export default {
	Layout: () => {
		return h(myLayout, null, {});
	},
	enhanceApp({ app, router, siteData }) {
		app.component("dataShow", dataShow);
	},
} satisfies Theme;
```

完成。
