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
    wallpaper: {
        enabled: true,
        hideBanner: true,
    },
    footerInfo: {
        customHtml: `<span id="runtime"></span>`, // 需要搭配 .vitepress/theme/helper/useRuntime.ts 使用
    },
    friendLink: {
        list: [
            {
                name: "MasterYu",
                desc: "我就是人人",
                avatar: "https://avatars.githubusercontent.com/u/211842652?s=400&v=4",
                link: "https://github.com/MasterFrontEndYu",
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
        imgSrc: ["/blog/OIP-A.png", "/blog/OIP-B.png", "/blog/OIP-C.png"],
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
        imgSrc: ["/blog/OIP-A.png", "/blog/OIP-B.png", "/blog/OIP-C.png"],
        description: [
            "花间一壶酒，独酌无相亲。举杯邀明月，对影成三人。",
            "桃花坞里桃花庵，桃花庵下桃花仙。桃花仙人种桃树，又摘桃花换酒钱。",
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
        imgSrc: ["/blog/OIP-A.png", "/blog/OIP-B.png", "/blog/OIP-C.png"],
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
        imgSrc: ["/blog/OIP-A.png", "/blog/OIP-B.png", "/blog/OIP-C.png"],
        description: [
            "休对故人思故国，且将新火试新茶。诗酒趁年华。",
            "粗缯大布裹生涯，腹有诗书气自华。",
            "人生到处知何似，应似飞鸿踏雪泥。",
        ],
        descStyle: "types",
    },
};
