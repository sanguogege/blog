import { defineTeekConfig } from "vitepress-theme-teek/config";

export const teekConfig = defineTeekConfig({
    sidebarTrigger: true,
    author: { name: "sanguogege", link: "https://github.com/sanguogege" },
    footerInfo: {
        copyright: {
            createYear: 2025,
            suffix: "sanguogege",
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
