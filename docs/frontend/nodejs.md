# Node.js

## Node.js

### 基础知识

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境，可以让 JavaScript 运行在服务端。

## npm 包管理器

npm 是 Node.js 的包管理器，用于安装、管理和发布 JavaScript 包。

npm 包是一个包含 JavaScript 代码的文件夹，通常包含一个 `package.json` 文件，用于描述包的信息和依赖。

### npm 常用命令

- **npm init**: 初始化项目

  `-y` 跳过询问，直接生成默认配置文件

  示例：`npm init vite@latest project-name --template vanilla`

- **npm install**: 安装依赖

- **npm install \<package\>**: 安装指定包

  `-g` 全局安装（可以在命令行中使用）

  `--save` 安装到生产环境（默认）

  `--save-dev` 安装到开发环境

  `--save-exact` 安装指定版本

  `--no-save` 不保存到 `package.json` 文件中

  `--force` 强制安装

  `--legacy-peer-deps` 忽略对等依赖冲突（npm 7+）

  `--registry <registry>`: 指定 npm 源地址

- **npm uninstall \<package\>**: 卸载包

- **npm update \<package\>**: 更新包

  用于更新当前项目的依赖到符合 `package.json` 中的版本范围。

- **npm upgrade \<package\>**: 更新指定的包到最新版

  它会更新到最新的主版本号，即使 `package.json` 中指定了版本范围（它依然会跨版本更新）。

- **npm list**: 查看当前项目安装的包

- **npm run \<script\>**: 运行脚本

  脚本在 `package.json` 文件中的 `scripts` 字段中定义

- **npm root -g**: 查看全局包的安装路径

  Linux/macOS: `/usr/local/lib/node_modules`

  Windows: `C:\Users\<username>\AppData\Roaming\npm\node_modules`

- **npm audit**: 审计项目依赖

  `--json` 以 JSON 格式输出

  `--parseable` 以可解析的格式输出

  `--production` 只审计生产环境依赖

- **npm audit fix**: 修复项目依赖

  `--force` 强制修复

### npm 的配置命令

- **npm config set \<key\> \<value\>**: 设置配置

- **npm config get \<key\>**: 获取配置

- **npm config delete \<key\>**: 删除配置

- **npm config list**: 列出所有配置

- **npm config edit**: 编辑配置文件

- **npm config ls -l**: 列出所有配置（包括默认配置）

### 依赖管理

npm 会将依赖包安装到 `node_modules` 目录下，可以通过 `package.json` 文件来管理依赖。

#### package.json

这个文件是 Node.js 项目的配置文件，用于描述项目的信息和依赖。

下面是简单的 `package.json` 文件示例：

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.7"
  },
  "author": "Your Name",
  "license": "ISC"
}
```

- `scripts`: 用于定义脚本命令，可以通过 `npm run <script>` 运行

- `dependencies` 和 `devDependencies`: 用于定义项目的依赖

#### 语意化版本号

npm 使用语义化版本号（Semantic Versioning）规范来管理包的版本号。版本号格式为 `x.y.z`，其中 `x` 为主版本号，`y` 为次版本号，`z` 为修订号。

- **^1.2.3**: 允许更新到 1.x.x 的最新版本

- **~1.2.3**: 允许更新到 1.2.x 的最新版本

### 常见问题

- **npm ERR! code EACCES**: 权限不足

  解决方法：使用管理员权限运行命令

## 项目部署

Node.js 自带了一个简单的 HTTP 服务器模块，可以用于部署项目。

如果需要部署到生产环境，可以使用 PM2 进程管理器。

### 使用 HTTP 模块

```javascript
// server.js
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World\n");
});

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000/");
});
```

运行 `node server.js` 启动服务器。

### 使用 PM2

PM2 是一个 Node.js 进程管理器，可以用于管理 Node.js 应用程序，适合在生产环境中使用。

可以使用 `npm install pm2 -g` 全局安装 PM2。

以下是一些常用的命令及操作：

- `pm2 start app.js --name my-app`: 启动应用程序

- `pm2 start app.js --watch`: 启动应用程序并监视文件变化

  `pm2 start app.js --watch --ignore-watch="node_modules"`: 启动应用程序并忽略 `node_modules` 目录

  **注意**: `--watch` 选项会导致 PM2 监视文件变化，当文件发生变化时，PM2 会自动重启应用程序。如果是<u>缓存文件或者上传目录一定一定要忽略掉</u>，避免用户上传文件导致应用程序频繁重启。

  并不推荐在生产环境中使用 `--watch` 选项，因为它会导致 PM2 消耗更多的 CPU 和内存资源，也可能导致应用程序频繁重启，影响用户体验。

- `pm2 show <app_name_or_id>`: 显示应用程序信息

- `pm2 stop my-app`: 停止应用程序

- `pm2 restart my-app`: 重启应用程序

- `pm2 reload my-app`: 重新加载应用程序

- `pm2 delete my-app`: 删除应用程序

- `pm2 list`: 列出所有应用程序

- `pm2 monit`: 监视所有应用程序

- `pm2 logs my-app`: 查看应用程序日志

- `pm2 save`: 保存当前应用程序列表

  保存好的应用程序列表会在系统重启后自动恢复。

- `pm2 startup`: 生成开机启动命令

- `pm2 unstartup systemd`: 取消开机启动

#### ecosystem.config.js

可以使用 `ecosystem.config.js` 文件来配置 PM2。

**注意**：pm2 默认不支持 ESM 模块，如果 `package.json` 包含 `"type": "module"` 字段，则全局都是 ESM 模块，会导致 PM2 启动应用失败，

需要修改 `ecosystem.config.js` 文件为 `ecosystem.config.cjs` 让 PM2 正确解析 CommonJS 模块。

```javascript
module.exports = {
  apps: [
    {
      name: "my-app",
      script: "./src/app.js",
      watch: true,
      ignore_watch: ["node_modules"],
    },
  ],
};
```

然后使用 `pm2 start ecosystem.config.js` 启动应用程序。

还可以配置更多的选项，例如**环境变量、日志文件、错误日志**等。

```javascript
module.exports = {
  apps: [
    {
      name: "my-app",
      script: "./src/app.js",
      watch: true,
      ignore_watch: ["node_modules"],
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 80,
      },
      log_date_format: "YYYY-MM-DD HH:mm Z",
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
    },
  ],
};
```

这样就可以使用 `pm2 start ecosystem.config.js --env production` 来启动生产环境的应用程序。

**其它选项**

- `namespace`: 设置命名空间，默认会归类到 default，用于逻辑分组应用，特别适用于 管理多个项目 或 不同环境的应用

  `pm2 list --namespace <namespace>` 用于查看指定命名空间的应用

- `instances`: 设置应用程序的实例数量，默认为 1

- `exec_mode`: 设置应用程序的执行模式，可选值为 `fork` 或 `cluster`

  `fork` 模式是默认模式，每个应用程序实例都是一个单独的进程

  `cluster` 模式是多进程模式，每个 CPU 核心都会启动一个实例（仅适用于 HTTP 服务器）

- `version`: 设置应用程序的版本号（不推荐）

  pm2 会自动读取 `package.json` 文件中的 `version` 字段作为应用程序的版本号

## Vercel

Vercel 是一个云平台，可以快速部署 Node.js 应用程序，另外它也支持其它语言和框架，例如 Flask、Django、Ruby on Rails 等。

## 更多知识

### 内置模块

Node.js 提供了一些内置模块，可以直接使用，无需安装。

- **fs**: 文件系统模块，用于操作文件

- **http**: HTTP 模块，用于创建 Web 服务器

- **path**: 路径模块，用于处理文件路径

### 面试题

- **const 和 let 的区别**

  - `const` 声明的变量是常量，不可修改

  - `let` 声明的变量是块级作用域，可以修改
