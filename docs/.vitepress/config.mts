import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "设计笔记",  // 网站标题
  description: "设计笔记的文档集合",
  head: [
    ["link", { rel: "icon", href: "/logo.jpg" }],
    ["meta", { name: "author", content: "Ethan" }],
    ["meta", { name: "keywords", content: "设计笔记,前端开发,后端运维,PHP开发文档,Vue3文档" }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: '设计笔记', // 导航栏标题
    logo: '/logo.jpg',
    outline: [1,4], // 侧边栏导航显示的文章标题层级
    lastUpdated: {
      text: 'Updated at', // 文章最后更新时间的显示文本
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    }, // 显示最后更新时间
    externalLinkIcon: true, // 是否显示外部链接图标

    nav: [
      {
        text: "前端开发",
        items: [
          { text: "Nav", link: "/frontend/" },
          { text: "Html", link: "/frontend/html" },
          { text: "NodeJs", link: "/frontend/nodejs" },
          { text: "Vue3", link: "/frontend/vue3" },
        ],
      },
      {
        text: "后端运维",
        items: [
          { text: "Nav", link: "/backend/" },
          { text: "Linux", link: "/backend/linux" },
          { text: "Redis", link: "/backend/redis" },
          { text: "MySQL", link: "/backend/mysql" },
          { text: "Java", link: "/backend/java" },
          { text: "Vim", link: "/backend/vim" },
          { text: "Supervisor", link: "/backend/supervisor" },
          {
            text: "PHP知识",
            items: [
              { text: "Methods", link: "/backend/php_methods" },
              { text: "Advanced", link: "/backend/php_advanced" },
              { text: "Basic", link: "/backend/php_fundamentals" },
              { text: "Laravel", link: "/backend/php_laravel" },
            ],
          },
          {
            text: "PHP扩展",
            items: [
              { text: "FPDF", link: "/backend/php_fpdf" },
              { text: "PHPWord", link: "/backend/php_phpword" },
            ],
          },
        ],
      },
      {
        text: "更多笔记",
        items: [
          { text: "Nav", link: "/notes/" },
          { text: "Docker", link: "/notes/docker" },
          { text: "Git", link: "/notes/git" },
          { text: "Mac", link: "/notes/mac" },
          { text: "Brew", link: "/notes/brew" },
          { text: "VSCode", link: "/notes/vscode" },
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
            ],
          },
          {
            text: "Backend",
            link: "/backend/",
            collapsed: true,
            items: [
              { text: "Linux", link: "/backend/linux" },
              { text: "Redis", link: "/backend/redis" },
              { text: "MySQL", link: "/backend/mysql" },
              { text: "Java", link: "/backend/java" },
              { text: "Vim", link: "/backend/vim" },
              { text: "Supervisor", link: "/backend/supervisor" },
              {
                text: "PHP Knowledge",
                collapsed: true,
                items: [
                  { text: "Methods", link: "/backend/php_methods" },
                  { text: "Advanced", link: "/backend/php_advanced" },
                  { text: "Basic", link: "/backend/php_fundamentals" },
                  { text: "Laravel", link: "/backend/php_laravel" },
                ],
              },
              {
                text: "PHP Extension",
                collapsed: true,
                items: [
                  { text: "FPDF", link: "/backend/php_fpdf" },
                  { text: "PHPWord", link: "/backend/php_phpword" },
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
              { text: "Brew", link: "/notes/brew" },
              { text: "VSCode", link: "/notes/vscode" },
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
