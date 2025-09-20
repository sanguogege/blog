import type { TeekConfig } from "vitepress-theme-teek";

// 文档配置
export const teekDocConfig: TeekConfig = {
    themeEnhance: {
        layoutSwitch: {
            defaultMode: "bothWidthAdjustable",
        },
    },
};

// 博客基础配置
const teekBlogCommonConfig: TeekConfig = {
    teekHome: true,
    vpHome: false,
    loading: true,
    wallpaper: {
        enabled: true,
        hideBanner: true,
    },
    footerInfo: {
        customHtml: `<span id="runtime"></span>`, // 需要搭配 .vitepress/theme/helper/useRuntime.ts 使用
    },
    docAnalysis: {
        // createTime: "2025-03-23",
        // statistics: {
        //     provider: "busuanzi",
        // },
    },
    friendLink: {
        list: [
            {
                name: "Teeker",
                desc: "朝圣的使徒，正在走向编程的至高殿堂！",
                avatar: "https://testingcf.jsdelivr.net/gh/Kele-Bingtang/static/user/avatar2.png",
                link: "http://notes.teek.top/",
            },
            {
                name: "vuepress-theme-vdoing",
                desc: "🚀一款简洁高效的VuePress 知识管理&博客 主题",
                avatar: "https://doc.xugaoyi.com/img/logo.png",
                link: "https://doc.xugaoyi.com/",
            },
            {
                name: "One",
                desc: "明心静性，爱自己",
                avatar: "https://onedayxyy.cn/img/xyy.webp",
                link: "https://onedayxyy.cn/",
            },
            {
                name: "Hyde Blog",
                desc: "人心中的成见是一座大山",
                avatar: "https://teek.seasir.top/avatar/avatar.webp",
                link: "https://teek.seasir.top/",
            },
            {
                name: "二丫讲梵",
                desc: "💻学习📝记录🔗分享",
                avatar: "https://wiki.eryajf.net/img/logo.png",
                link: " https://wiki.eryajf.net/",
            },
            {
                name: "粥里有勺糖",
                desc: "简约风的 VitePress 博客主题",
                avatar: "https://theme.sugarat.top/logo.png",
                link: "https://theme.sugarat.top/",
            },
            {
                name: "VitePress 快速上手中文教程",
                desc: "如果你也想搭建它，那跟我一起做吧",
                avatar: "https://avatars.githubusercontent.com/u/90893790?v=4",
                link: "https://vitepress.yiov.top/",
            },
            {
                name: "友人A",
                desc: "おとといは兎をみたの，昨日は鹿，今日はあなた",
                avatar: "http://niubin.site/logo.jpg",
                link: "http://niubin.site/",
            },
        ],
        autoScroll: true,
    },
    social: [
        {
            icon: "mdi:github",
            name: "GitHub",
            link: "https://github.com/sanguogege",
        },
        {
            icon: "simple-icons:gitee",
            name: "Gitee",
            link: "https://gitee.com/sanguogege",
        },
    ],
};

// 博客默认配置
export const teekBlogConfig: TeekConfig = {
    ...teekBlogCommonConfig,
    banner: {
        name: "🎉 My Blog , Your Journey",
        description: "人人为我，我为人人",
        bgStyle: "partImg",
    },
};

// 博客小图配置
export const teekBlogParkConfig: TeekConfig = {
    ...teekBlogCommonConfig,
    banner: {
        name: "🗡︎ 满堂花醉三千客，一剑霜寒十四州。",
        bgStyle: "partImg",
        imgSrc: [
            "https://github.com/sanguogege/blog/blob/main/public/blog/ST.jpg?raw=true",
        ],
        description: [
            "夫天地者万物之逆旅也；光阴者百代之过客也。",
            "而浮生若梦，为欢几何？",
            "古人今人若流水，共看明月皆如此。",
        ],
        descStyle: "switch",
    },
    comment: {
        provider: "giscus",
        options: {
            repo: "sanguogege/blog",
            repoId: "R_kgDOObQJQQ",
            category: "general",
            categoryId: "DIC_kwDOObQJQc4CpRne",
        },
    },
    codeBlock: {
        overlay: true,
    },
    // footerGroup: [
    //     {
    //         title: "外部链接",
    //         links: [
    //             { name: "示例 1", link: "https://vp.teek.top" },
    //             { name: "示例 2", link: "https://vp.teek.top" },
    //             { name: "示例 3", link: "https://vp.teek.top" },
    //         ],
    //     },
    //     {
    //         title: "内部链接",
    //         links: [
    //             { name: "快速开始", link: "/guide/quickstart" },
    //             { name: "配置简介", link: "/reference/config" },
    //         ],
    //     },
    // ],
};

// 博客大图配置
export const teekBlogFullConfig: TeekConfig = {
    ...teekBlogCommonConfig,
    post: {
        coverImgMode: "full",
    },
    banner: {
        name: "🏆 莫愁前路无知己，天下谁人不识君。",
        bgStyle: "fullImg",
        imgSrc: [
            "https://github.com/sanguogege/blog/blob/main/public/blog/ST.jpg?raw=true",
        ],
        description: [
            "云想衣裳花想容，春风拂槛露华浓。",
            "若非群玉山头见，会向瑶台月下逢。 ",
            "               —— 来自 李白",
        ],
        descStyle: "types",
    },
    comment: {
        provider: "giscus",
        options: {
            repo: "sanguogege/blog",
            repoId: "R_kgDOObQJQQ",
            category: "general",
            categoryId: "DIC_kwDOObQJQc4CpRne",
        },
    },
    codeBlock: {
        overlay: true,
    },
};

// 博客全图配置
export const teekBlogBodyConfig: TeekConfig = {
    ...teekBlogCommonConfig,
    pageStyle: "segment-nav",
    bodyBgImg: {
        imgSrc: [
            "https://github.com/sanguogege/blog/blob/main/public/blog/ST.jpg?raw=true",
        ],
    },
    banner: {
        name: "💻 Code Is Cheap, Show Me Your Nation",
        description: [
            "尔曹身与名俱灭，不废江河万古流。",
            "为人性僻耽佳句，语不惊人死不休。",
            "会当凌绝顶，一览众山小。",
        ],
        descStyle: "types",
    },
    comment: {
        provider: "giscus",
        options: {
            repo: "sanguogege/blog",
            repoId: "R_kgDOObQJQQ",
            category: "general",
            categoryId: "DIC_kwDOObQJQc4CpRne",
        },
    },
    codeBlock: {
        overlay: true,
    },
    themeEnhance: {
        layoutSwitch: {
            defaultMode: "original",
        },
    },
};

// 博客卡片配置
export const teekBlogCardConfig: TeekConfig = {
    ...teekBlogCommonConfig,
    post: {
        postStyle: "card",
    },
    homeCardListPosition: "left",
    banner: {
        name: "📖 书山有路勤为径，学海无涯苦作舟",
        bgStyle: "fullImg",
        imgSrc: ["/blog/ST.jpg"],
        description: [
            "休对故人思故国，且将新火试新茶。诗酒趁年华。",
            "粗缯大布裹生涯，腹有诗书气自华。",
            "人生到处知何似，应似飞鸿踏雪泥。",
        ],
        descStyle: "types",
    },
};
