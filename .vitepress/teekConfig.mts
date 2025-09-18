import { defineTeekConfig } from "vitepress-theme-teek/config";
import { version } from "vitepress-theme-teek/es/version";

export const teekConfig = defineTeekConfig({
    sidebarTrigger: true,
    author: { name: "sanguogege", link: "https://github.com/sanguogege" },
    footerInfo: {
        theme: {
            name: `Theme By Teek@${version}`,
        },
        copyright: {
            createYear: 2025,
            suffix: "Teek",
        },
    },
    codeBlock: {
        copiedDone: (TkMessage) => TkMessage.success("复制成功！"),
    },
    articleShare: { enabled: true },
    vitePlugins: {
        sidebarOption: {
            // initItems: false,
            collapsed: true,
        },
    },
});
