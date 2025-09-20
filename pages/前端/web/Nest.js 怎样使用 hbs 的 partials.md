---
title: js 怎样使用 hbs 的 partials
date: 2023-04-24 04:48:45
categories:
  - 前端
  - web
description: >-
  当你在使用 Nest.js 的时候，安装 hbs 就可以使用 Handerbars 作为模版引擎。但是 Nest.js 没有提供 hbs
  的配置接口，因此要使用 partials，还是要单独引入 hbs，具体如下：
---

# Nest.js 怎样使用 hbs 的 partials?

当你在使用 Nest.js 的时候，安装 hbs 就可以使用 Handerbars 作为模版引擎。但是 Nest.js 没有提供 hbs 的配置接口，因此要使用 partials，还是要单独引入 hbs，具体如下：

```javascript
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";
import * as hbs from "hbs";

async function bootstrap() {
    const app = (await NestFactory.create) < NestExpressApplication > AppModule;
    app.useStaticAssets(join(__dirname, "..", "public"));
    app.setBaseViewsDir(join(__dirname, "..", "views"));
    app.setViewEngine("hbs");
    hbs.registerPartials(join(__dirname, "..", "views/components"));
    await app.listen(3000);
}
bootstrap();
```

假如你的块页面时存放在**views/components**。
使用**registerPartials**方法将你的 partials 路径给注册进去就好了

在页面引入即可！

```html
{{> header}}
```
