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
    outline: [2,3], // 侧边栏导航显示的文章标题层级
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
          { text: "CSS", link: "/frontend/css" },
          { text: "JavaScript", link: "/frontend/javascript" },
          { text: "HTML", link: "/frontend/html" },
          { text: "Node.js", link: "/frontend/nodejs" },
          { text: "NPM-Package", link: "/frontend/npm-package" },
          { text: "Electron", link: "/frontend/electron" },
          { text: "Vite", link: "/frontend/vite" },
          { text: "Vue3", link: "/frontend/vue3" },
          { text: "TypeScript", link: "/frontend/typescript" },
          { text: "前端随记本", link: "/frontend/snippets" },
        ],
      },
      {
        text: "后端运维",
        items: [
          { text: "Nginx", link: "/backend/nginx" },
          { text: "Linux", link: "/backend/linux" },
          { text: "Bash", link: "/backend/bash" },
          { text: "Vim", link: "/backend/vim" },
          { text: "MySQL", link: "/backend/mysql" },
          { text: "Redis", link: "/backend/redis" },
          { text: "Network", link: "/backend/network" },
          {
            text: "Programming",
            items: [
              { text: "PHP", link: "/backend/php/" },
              { text: "Python", link: "/backend/python/" },
              { text: "C++", link: "/backend/cpp/" },
              { text: "Java", link: "/backend/java/" },
            ],
          },
        ],
      },
      {
        text: "更多笔记",
        items: [
          { text: "Tips", link: "/notes/tips" },
          { text: "Git", link: "/notes/git" },
          { text: "Mac", link: "/notes/mac" },
          { text: "Windows", link: "/notes/windows" },
          { text: "命令行工具", link: "/notes/cli_tools" },
          { text: "软件指南", link: "/notes/app_guides" },
          { text: "软件推荐", link: "/notes/software" },
          { text: "开源项目收藏", link: "/notes/open_source" },
          { text: "设计资源导航", link: "/notes/design" },
          { text: "Docker", link: "/notes/docker" },
          { text: "平台开发", link: "/notes/api_integration" },
          { text: "系统与硬件", link: "/notes/sys_hardware" },
          { text: "语言学习", link: "/notes/language/" },
          { text: "Emoji 表情", link: "/notes/emoji" },
        ],
      },
    ],

    sidebar: [
      {
        text: "Frontend",
        link: "/frontend/",
        collapsed: true,
        items: [
          { text: "CSS", link: "/frontend/css" },
          { text: "JavaScript", link: "/frontend/javascript" },
          { text: "HTML", link: "/frontend/html" },
          { text: "Node.js", link: "/frontend/nodejs" },
          { text: "NPM-Package", link: "/frontend/npm-package" },
          { text: "Electron", link: "/frontend/electron" },
          { text: "Vite", link: "/frontend/vite" },
          { text: "Vue3", link: "/frontend/vue3" },
          { text: "TypeScript", link: "/frontend/typescript" },
          { text: "Snippets", link: "/frontend/snippets" },
        ],
      },
      {
        text: "Backend",
        link: "/backend/",
        collapsed: true,
        items: [
          { text: "Nginx", link: "/backend/nginx" },
          { text: "Linux", link: "/backend/linux" },
          { text: "Bash", link: "/backend/bash" },
          { text: "Vim", link: "/backend/vim" },
          { text: "MySQL", link: "/backend/mysql" },
          { text: "Redis", link: "/backend/redis" },
          { text: "Network", link: "/backend/network" },
          {
            text: "Programming",
            collapsed: true,
            items: [
              { text: "PHP", link: "/backend/php/" },
              { text: "Python", link: "/backend/python/" },
              { text: "C++", link: "/backend/cpp/" },
              { text: "Java", link: "/backend/java/" },
            ],
          },
        ],
      },
      {
        text: "Others",
        link: "/notes/",
        collapsed: true,
        items: [
          { text: "Tips", link: "/notes/tips" },
          { text: "Git", link: "/notes/git" },
          { text: "Mac", link: "/notes/mac" },
          { text: "Windows", link: "/notes/windows" },
          { text: "CliTools", link: "/notes/cli_tools" },
          { text: "App Guides", link: "/notes/app_guides" },
          { text: "App Recommend", link: "/notes/software" },
          { text: "Open Source", link: "/notes/open_source" },
          { text: "Design Source", link: "/notes/design" },
          { text: "Docker", link: "/notes/docker" },
          { text: "Api Integration", link: "/notes/api_integration" },
          { text: "Sys-Hardware", link: "/notes/sys_hardware" },
          { text: "Language", link: "/notes/language/" },
          { text: "Emoji", link: "/notes/emoji" },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ethanaicode/docs', ariaLabel: '参与文档编辑' },
      { icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>WordPress</title><path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0"/></svg>'
        }, 
        link: 'https://www.shejibiji.com/', 
        ariaLabel: '回到博客主站' 
      },
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: '请尊重他人劳动成果，未经授权禁止转载！',
      copyright: 'Copyright © 2019-present Ethan'
    }
  },

  locales: {
    easyadmin: {
      label: 'EasyAdmin',
      lang: 'zh-CN',
      title: 'EasyAdmin 官方开发文档 | EasyAdmin Development Docs',
      description: 'EasyAdmin 是一款基于 ThinkPHP6 开发的后台管理系统，提供了 CURD 命令行工具，快速生成后台管理系统。',
      themeConfig: {
        siteTitle: 'EasyAdmin 开发文档',
        outline: 2,
        nav: [
          { text: "首页", link: "/easyadmin/"},
          { text: "简介", link: "/easyadmin/base/introduction"},
          { text: "目录", link: "/easyadmin/SUMMARY"},
        ],
        sidebar: [
          {
            "text": "简介",
            "collapsed": false,
            "items": [
              { "text": "项目简介", "link": "/easyadmin/base/introduction" },
              { "text": "系统安装", "link": "/easyadmin/base/install" },
              { "text": "系统架构", "link": "/easyadmin/base/architecture" },
              { "text": "数据库规范", "link": "/easyadmin/base/database" }
            ]
          },
          {
            "text": "命令行 CURD",
            "collapsed": false,
            "items": [
              { "text": "CURD 命令大全", "link": "/easyadmin/curd/command" },
              { "text": "表结构规范", "link": "/easyadmin/curd/table" }
            ]
          },
          {
            "text": "配置项",
            "collapsed": false,
            "items": [
              { "text": "系统配置", "link": "/easyadmin/config/system" },
              { "text": "权限忽略配置", "link": "/easyadmin/config/auth" },
              { "text": "静态资源配置", "link": "/easyadmin/config/static" }
            ]
          },
          {
            "text": "控制项",
            "collapsed": false,
            "items": [
              { "text": "注解权限", "link": "/easyadmin/controller/annotations" },
              { "text": "控制器属性", "link": "/easyadmin/controller/attributes" },
              { "text": "CURD 引用", "link": "/easyadmin/controller/curd" },
              { "text": "验证器使用", "link": "/easyadmin/controller/validate" }
            ]
          },
          {
            "text": "前端",
            "collapsed": false,
            "items": [
              { "text": "必看基础信息", "link": "/easyadmin/frontend/base" },
              { "text": "前端 auth 权限验证", "link": "/easyadmin/frontend/auth" },
              { "text": "Form 表单", "link": "/easyadmin/frontend/form" },
              { "text": "Table 数据表格", "link": "/easyadmin/frontend/table" },
              { "text": "内置监听事件", "link": "/easyadmin/frontend/listen" },
              { "text": "动态生成下拉选择", "link": "/easyadmin/frontend/select" },
              { "text": "上传组件", "link": "/easyadmin/frontend/upload" },
              { "text": "时间控件", "link": "/easyadmin/frontend/date" },
              { "text": "富文本编辑器", "link": "/easyadmin/frontend/editor" }
            ]
          },
          {
            "text": "插件功能",
            "collapsed": true,
            "items": [
              { "text": "插件使用", "link": "/easyadmin/addons/use" },
              { "text": "插件开发", "link": "/easyadmin/addons/dev" }
            ]
          },
          {
            "text": "其他",
            "collapsed": true,
            "items": [
              { "text": "常见问题", "link": "/easyadmin/base/question" }
            ]
          }
        ],
      },
    },

    layuimini: {
      label: 'Layuimini',
      lang: 'zh-CN',
      title: 'layuimini 后台框架开发文档 | layuimini Development Docs',
      description: 'Layuimini后台模板，最简洁、清爽、易用的layui后台框架模板。',
      themeConfig: {
        siteTitle: 'Layuimini 开发文档',
        outline: 2,
        nav: [
          { text: "首页", link: "/layuimini/"},
          { text: "简介", link: "/layuimini/README"},
          { text: "目录", link: "/layuimini/SUMMARY"},
        ],
        sidebar: [
          {
            "text": "文档",
            "collapsed": false,
            "items": [
              { "text": "简介", "link": "/layuimini/README" },
              { "text": "目录", "link": "/layuimini/SUMMARY" },
            ]
          },
          {
            "text": "初始化接口后端示例(V2版)",
            "collapsed": false,
            "items": [
              { "text": "数据库结构示例", "link": "/layuimini/init/sql" },
              { "text": "PHP示例(Laravel)", "link": "/layuimini/init/laravel" },
              { "text": "PHP示例(ThinkPHP)", "link": "/layuimini/init/thinkphp" },
              { "text": "Golang示例(beego)", "link": "/layuimini/init/golang" }
            ]
          },
          {
            "text": "使用说明(V2版)",
            "collapsed": false,
            "items": [
              { "text": "iframe版", "link": "/layuimini/iframe-v2" },
              { "text": "单页版", "link": "/layuimini/onepage-v2" }
            ]
          },
          {
            "text": "使用说明(V1版)",
            "collapsed": false,
            "items": [
              { "text": "iframe版", "link": "/layuimini/iframe" },
              { "text": "单页版", "link": "/layuimini/onepage" }
            ]
          }
        ],
      },
    },
  }
});
