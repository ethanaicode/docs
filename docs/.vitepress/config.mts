import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 禁用markdown扩展语法，来避免错误：plugin:vite:vue] Duplicate attribute.（出现在 python_basic文档中）
  markdown: { attrs: { disable: true } },
  ignoreDeadLinks: true, // 忽略死链接（编译时会检查）
  lang: "zh-CN",
  title: "设计笔记",  // 网站标题
  description: "设计笔记的文档集合",
  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
    ["meta", { name: "author", content: "Ethan" }],
    ["meta", { name: "keywords", content: "设计笔记,前端开发,后端运维,PHP开发文档,Vue3文档" }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: '设计笔记', // 导航栏标题
    logo: '/logo.png',
    outline: [2,4], // 侧边栏导航显示的文章标题层级
    lastUpdated: {
      text: 'Updated at', // 文章最后更新时间的显示文本
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    }, // 显示最后更新时间
    externalLinkIcon: true, // 是否显示外部链接图标

    nav: [
      { text: "首页", link: "/"},
      {
        text: "前端开发",
        items: [
          { text: "Html", link: "/frontend/html" },
          { text: "NodeJs", link: "/frontend/nodejs" },
          { text: "Vue3", link: "/frontend/vue3" },
          { text: "TypeScript", link: "/frontend/typescript" },
        ],
      },
      {
        text: "后端运维",
        items: [
          { text: "MySQL", link: "/backend/mysql" },
          { text: "Redis", link: "/backend/redis" },
          { text: "Linux", link: "/backend/linux" },
          { text: "Nginx", link: "/backend/nginx" },
          { text: "Vim", link: "/backend/vim" },
          {
            text: "Languages",
            items: [
              { text: "PHP", link: "/backend/php/" },
              { text: "Python", link: "/backend/python/" },
              { text: "C++", link: "/backend/c++/" },
              { text: "Java", link: "/backend/java" },
            ],
          },
        ],
      },
      {
        text: "更多笔记",
        items: [
          { text: "Docker", link: "/notes/docker" },
          { text: "Git", link: "/notes/git" },
          { text: "Mac", link: "/notes/mac" },
          { text: "Windows", link: "/notes/windows" },
          { text: "Tips", link: "/notes/tips" },
          { text: "系统与硬件", link: "/notes/sys_hardware" },
          { text: "命令行工具", link: "/notes/cli_tools" },
          { text: "软件推荐", link: "/notes/software" },
          { text: "软件使用指南", link: "/notes/app_guides" },
          { text: "Emoji 表情", link: "/notes/emoji" },
        ],
      },
      // 外部链接
      {
        text: "前往主站",
        link: "https://www.shejibiji.com/",
        target: "_self",
        rel: "sponsored",
      },
    ],

    sidebar: [
      {
        text: "Navigation",
        items: [
          {
            text: "Frontend",
            link: "/frontend/",
            collapsed: true,
            items: [
              { text: "Html", link: "/frontend/html" },
              { text: "NodeJs", link: "/frontend/nodejs" },
              { text: "Vue3", link: "/frontend/vue3" },
              { text: "TypeScript", link: "/frontend/typescript" },
            ],
          },
          {
            text: "Backend",
            link: "/backend/",
            collapsed: true,
            items: [
              { text: "MySQL", link: "/backend/mysql" },
              { text: "Redis", link: "/backend/redis" },
              { text: "Linux", link: "/backend/linux" },
              { text: "Nginx", link: "/backend/nginx" },
              { text: "Vim", link: "/backend/vim" },
              {
                text: "Languages",
                collapsed: true,
                items: [
                  { text: "PHP", link: "/backend/php/" },
                  { text: "Python", link: "/backend/python/" },
                  { text: "C++", link: "/backend/c++/" },
                  { text: "Java", link: "/backend/java" },
                ],
              },
            ],
          },
          {
            text: "Others",
            link: "/notes/",
            collapsed: true,
            items: [
              { text: "Docker", link: "/notes/docker" },
              { text: "Git", link: "/notes/git" },
              { text: "Mac", link: "/notes/mac" },
              { text: "Windows", link: "/notes/windows" },
              { text: "Tips", link: "/notes/tips" },
              { text: "Sys-Hardware", link: "/notes/sys_hardware" },
              { text: "CliTools", link: "/notes/cli_tools" },
              { text: "App Recommend", link: "/notes/software" },
              { text: "App Guides", link: "/notes/app_guides" },
              { text: "Emoji", link: "/notes/emoji" },
            ],
          },
          { text: "Main Site", link: "https://www.shejibiji.com/" },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/LargaRisen' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: '请尊重他人劳动成果，未经授权禁止转载！',
      copyright: 'Copyright © 2019-present Ethan'
    }
  },
});
