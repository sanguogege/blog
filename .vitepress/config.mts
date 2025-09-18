import { defineConfig } from "vitepress";

import { teekConfig } from "./teekConfig.mts";
// Teek 主题配置

// https://vitepress.dev/reference/site-config
export default defineConfig({
    extends: teekConfig,
    srcDir: "./pages",
    title: "My Awesome Project",
    description: "A VitePress Site",
});
