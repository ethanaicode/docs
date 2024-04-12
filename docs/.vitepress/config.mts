import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "设计笔记集合",
  description: "一个设计笔记的集合",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "前端开发笔记",
        items: [
          { text: "Nav", link: "/frontend/" },
          { text: "Html", link: "/frontend/html" },
          { text: "NodeJs", link: "/frontend/nodejs" },
          { text: "Vue3", link: "/frontend/vue3" },
        ],
      },
      {
        text: "后端开发运维",
        items: [
          { text: "Nav", link: "/backend/" },
          { text: "Linux", link: "/backend/linux" },
          { text: "Redis", link: "/backend/redis" },
          { text: "MySQL", link: "/backend/mysql" },
          { text: "Java", link: "/backend/java" },
          { text: "Vim", link: "/backend/vim" },
          { text: "Supervisor", link: "/backend/supervisor" },
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
        text: "其它笔记",
        items: [
          { text: "Nav", link: "/notes/" },
          { text: "Docker", link: "/notes/docker" },
          { text: "Git", link: "/notes/git" },
          { text: "Mac", link: "/notes/mac" },
          { text: "Brew", link: "/notes/brew" },
        ],
      },
      // 外部链接
      {
        text: "设计笔记",
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
            ],
          },
          { text: "Main Site", link: "https://www.shejibiji.com/" },
        ],
      },
    ],

    socialLinks: [
      // { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
  },
});
