# Node.js

## Node.js

### 基础知识

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境，可以让 JavaScript 运行在服务端。

### 内置模块

Node.js 提供了一些内置模块，可以直接使用，无需安装。

- **fs**: 文件系统模块，用于操作文件

- **http**: HTTP 模块，用于创建 Web 服务器

- **path**: 路径模块，用于处理文件路径

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
