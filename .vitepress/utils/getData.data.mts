/*
 * @Author: sanguogege
 * @Date: 2025-04-19 00:41:36
 * @LastEditors: sanguogege
 * @LastEditTime: 2025-09-07 02:02:12
 * @Description: ''
 */
import { createContentLoader } from "vitepress";

declare const data: any;
export { data };

export default createContentLoader(
    ["Net/*/*.md", "前端/*/*.md", "系统/*/*.md"],
    {
        includeSrc: false,
        render: false,
        excerpt: false,
        transform(rawData) {
            return rawData.sort((a, b) => {
                return (
                    +new Date(b.frontmatter.Date) -
                    +new Date(a.frontmatter.Date)
                );
            });
        },
    }
);
