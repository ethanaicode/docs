# Node.js

## Node.js

### 基础知识

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境，可以让 JavaScript 运行在服务端。

### 内置模块

Node.js 提供了一些内置模块，可以直接使用，无需安装。

- **fs**: 文件系统模块，用于操作文件

- **http**: HTTP 模块，用于创建 Web 服务器

- **path**: 路径模块，用于处理文件路径

## ES Module (ESM)

### ESM 的特点

- ESM 是 JavaScript 的模块化规范，它是 ECMAScript 的一部分

- ESM 使用 `import` 和 `export` 关键字来导入和导出模块

- ESM 是静态的，模块的依赖关系在编译时就确定了

- ESM 是单例的，同一个模块只会加载一次

### ESM 的使用

- **导出模块**

  ```javascript
  // math.js
  export function add(a, b) {
    return a + b;
  }
  ```

- **导入模块**

  ```javascript
  // index.js
  import { add } from "./math.js";

  console.log(add(1, 2));
  ```

- **运行 ESM 模块**

  <u>Node.js 默认不支持 ESM</u>，需要在 `package.json` 文件中添加 `"type": "module"` 字段，或者使用 `.mjs` 文件扩展名。

  ```json
  {
    "type": "module"
  }
  ```

  示例：`node index.js` 或 `node --experimental-modules index.mjs`

### ESM 和 CommonJS 的区别

- **导入模块**

  - ESM 使用 `import` 关键字导入模块

  - CommonJS 使用 `require` 函数导入模块

- **导出模块**

  - ESM 使用 `export` 关键字导出模块

  - CommonJS 使用 `module.exports` 导出模块

- **加载模块**

  - ESM 是静态的，模块的依赖关系在编译时就确定了

  - CommonJS 是动态的，模块的依赖关系在运行时确定

- **模块的单例**

  - ESM 是单例的，同一个模块只会加载一次

  - CommonJS 是非单例的，同一个模块会加载多次

- **模块的循环依赖**

  - ESM 不允许模块的循环依赖

  - CommonJS 允许模块的循环依赖

### ESM 和 CommonJS 的兼容

- **ESM 导入 CommonJS 模块**

  ESM 可以导入 CommonJS 模块，但是导入的模块会被当作默认导出。

  ```javascript
  // index.js
  import math from "./math.js";

  console.log(math.add(1, 2));
  ```

  ```javascript
  // math.js
  module.exports = {
    add(a, b) {
      return a + b;
    },
  };
  ```

- **CommonJS 导入 ESM 模块**

  CommonJS 无法导入 ESM 模块，需要使用 `import` 函数。

  ```javascript
  // index.js
  const { add } = await import("./math.js");

  console.log(add(1, 2));
  ```

  ```javascript
  // math.js
  export function add(a, b) {
    return a + b;
  }
  ```

## npm 包管理器

### npm 常用命令

- **npm init**: 初始化项目

  `-y` 跳过询问，直接生成默认配置文件

  示例：`npm init vite@latest project-name --template vanilla`

- **npm install**: 安装依赖

- **npm install \<package\>**: 安装指定包

  `-g` 全局安装

  `--save` 安装到生产环境

  `--save-dev` 安装到开发环境

- **npm uninstall \<package\>**: 卸载包

- **npm update \<package\>**: 更新包

  用于更新当前项目的依赖到符合 `package.json` 中的版本范围。

- **npm upgrade \<package\>**: 更新指定的包到最新版

  它会更新到最新的主版本号，即使 `package.json` 中指定了版本范围（它依然会跨版本更新）。

- **npm list**: 查看当前项目安装的包

- **npm run \<script\>**: 运行脚本

  脚本在`package.json`文件中的`scripts`字段中定义

  `-g` 全局安装的包

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

- `pm2 stop my-app`: 停止应用程序

- `pm2 restart my-app`: 重启应用程序

- `pm2 delete my-app`: 删除应用程序

- `pm2 list`: 列出所有应用程序

- `pm2 monit`: 监视所有应用程序

- `pm2 logs my-app`: 查看应用程序日志

- `pm2 save`: 保存当前应用程序列表

  保存好的应用程序列表会在系统重启后自动恢复。

- `pm2 startup`: 生成开机启动命令
