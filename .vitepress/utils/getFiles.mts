/*
 * @Title: ''
 * @Author: sanguogege
 * @Date: 2025-04-17 23:39:54
 * @LastEditors: sanguogege
 * @LastEditTime: 2025-09-18 21:21:33
 * @Description: ''
 */
import { readdir } from "node:fs/promises";
import { DefaultTheme } from "vitepress";
import { resolve } from "node:path";

async function getSideBar(params: any, pathname: string) {
    var res: any = [];
    for (const file of params) {
        if (file.isDirectory()) {
            const subFiles = await readdir(
                resolve(file.parentPath, file.name),
                { withFileTypes: true }
            );
            await getSideBar(subFiles, `${pathname}/${file.name}`);
        } else {
            res.push({
                text: file.name.replace(".md", ""),
                link: `${pathname}/${file.name}`,
            });
            sideBar[pathname] = res;
        }
    }
}

var index = 0;

async function getNavBar(realFiles: any, pathname: string) {
    const res: any = [];
    for (const item of realFiles) {
        if (item.isDirectory()) {
            const subFiles = await readdir(
                resolve(item.parentPath, item.name),
                { withFileTypes: true }
            );
            if (index == 0) {
                index++;
                res.push({
                    text: item.name,
                    items: await getNavBar(
                        subFiles,
                        `${pathname}/${item.name}`
                    ),
                });
            } else {
                res.push({
                    text: item.name,
                    link: await getNavBar(subFiles, `${pathname}/${item.name}`),
                });
            }
        } else {
            return `${pathname}/${item.name}`;
        }
    }
    index = 0;
    return res;
}

// 文件根目录
const srcDir = "./pages";
// 过滤名单
const FILTER_LIST = ["index.md", "@fragment", "@pages", "public"];

// 过滤名单文件夹
const sideBar: { [key: string]: DefaultTheme.SidebarItem[] } = {};
// 导航栏
const homeBar: DefaultTheme.NavItem[] = [{ text: "首页", link: "/" }];
const endBar: DefaultTheme.NavItem[] = [
    {
        text: "功能",
        items: [
            { text: "分类", link: "/categories" },
            { text: "标签", link: "/tags" },
            { text: "归档", link: "/archives" },
            { text: "文章清单", link: "/articleOverview" },
        ],
    },
];

// 取差值
const filterFiles = (files: any[], filterList: string[]) => {
    return files.filter((file) => !filterList.includes(file.name));
};

const allFiles = await readdir(srcDir, { withFileTypes: true });

const realFiles = filterFiles(allFiles, FILTER_LIST);

var userBar = await getNavBar(realFiles, "");

await getSideBar(realFiles, "");

var navBar = [...homeBar, ...userBar, ...endBar];

export { srcDir, sideBar, navBar };
