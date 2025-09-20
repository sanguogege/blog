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
    post: {
        moreLabel: "阅读全文 >",
    },
    codeBlock: {
        copiedDone: (TkMessage) => TkMessage.success("复制成功！"),
    },
    articleAnalyze: {
        showIcon: true, // 作者、日期、分类、标签、字数、阅读时长、浏览量等文章信息的图标是否显示
        dateFormat: "yyyy-MM-dd hh:mm:ss", // 文章日期格式，首页和文章页解析日期时使用
        showInfo: true, // 是否展示作者、日期、分类、标签、字数、阅读时长、浏览量等文章信息，分别作用于首页和文章页
        showAuthor: true, // 是否展示作者
        showCreateDate: true, // 是否展示创建日期
        showUpdateDate: false, // 是否展示更新日期，仅在文章页显示
        showCategory: false, // 是否展示分类
        showTag: false, // 是否展示标签
    },
    articleShare: { enabled: true },
    vitePlugins: {
        sidebar: false,
        sidebarOption: {
            collapsed: true,
            initItems: false,
        },
        autoFrontmatter: true,
        autoFrontmatterOption: {
            transform: (pageData) => {
                pageData = {
                    ...pageData,
                    description: pageData.description || "",
                };
                delete pageData.permalink;
                return pageData;
            },
        },
    },
});
