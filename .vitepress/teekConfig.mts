import { defineTeekConfig } from "vitepress-theme-teek/config";

export const teekConfig = defineTeekConfig({
    sidebarTrigger: true,
    blogger: {
        name: "悠悠清闲人",
        slogan: "知识的海洋，总是让人流连忘返！",
        avatar: "https://avatars.githubusercontent.com/u/25738532?v=4",
        shape: "circle-rotate",
        circleBgImg: "/blog/bg4.webp",
        color: "#ffffff",
        circleSize: 120,
        status: {
            icon: "😪",
            size: 28,
            title: "困",
        },
    },
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
            transform: (frontmatter) => {
                // 'frontmatter' 是插件自动生成的对象
                // 假设它可能包含也可能不包含 tags

                // 确保 tags 字段存在且为数组格式
                const tags = [...(frontmatter.categories || [])];

                // 你还可以在这里根据其他信息动态添加标签
                // 例如，如果文件路径包含 'vite'，就添加 'vite' 标签

                // 返回最终的 frontmatter 对象
                return {
                    ...frontmatter,
                    tags: tags, // 确保返回的是数组
                    top: frontmatter.top || false,
                    sticky: frontmatter.sticky || "",
                    titleTag: frontmatter.titleTag || "",
                    description: frontmatter.description || "暂无描述", // 也可以给 description 设置默认值
                };
            },
        },
    },
});
