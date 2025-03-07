---
title: NPM 常用 Package 介绍，开发中那些常用的 NPM 包
---

# NPM-Package

## NPM Package 列表

> NPM 官方库：[npmjs](https://www.npmjs.com/package/package)

## **📌 常用工具类**

- [lodash](https://www.npmjs.com/package/lodash): JavaScript 实用工具库，提供了很多常用的工具函数。

- [underscore](https://www.npmjs.com/package/underscore): 另一个实用工具库，功能类似 `lodash`，但更轻量。

- [ramda](https://www.npmjs.com/package/ramda): **函数式编程**工具库，专注于不可变数据和纯函数。

- [date-fns](https://www.npmjs.com/package/date-fns): 现代 JavaScript 日期处理库，轻量级，提供丰富的日期处理 API。

- [moment](https://www.npmjs.com/package/moment): 旧的 JavaScript 日期处理库，API 直观，但已不再推荐使用（建议 `date-fns`）。

- [dayjs](https://www.npmjs.com/package/dayjs): 轻量级的日期库，兼容 `moment.js`，但体积更小。

- [chalk](https://www.npmjs.com/package/chalk): 终端字符串样式美化库，可设置不同颜色、背景色等。

- [colors](https://www.npmjs.com/package/colors): 类似 `chalk`，用于终端文本着色。

## **📌 HTTP 请求**

- [axios](https://www.npmjs.com/package/axios): 基于 `Promise` 的 HTTP 客户端，支持浏览器和 Node.js。

- [node-fetch](https://www.npmjs.com/package/node-fetch): `fetch` API 的 Node.js 版本，用于服务器端发起 HTTP 请求。

- [got](https://www.npmjs.com/package/got): 更加强大、灵活的 HTTP 请求库，支持拦截器、自动重试等。

- [superagent](https://www.npmjs.com/package/superagent): 轻量级 HTTP 请求库，支持 Node.js 和浏览器。

## **📌 文件 & 目录操作**

- [fs-extra](https://www.npmjs.com/package/fs-extra): 提供比 `fs` 更丰富的文件操作 API（如 `copy`、`move`、`remove`）。

- [path](https://www.npmjs.com/package/path): 处理和解析文件路径的 Node.js 内置模块。

- [fast-glob](https://www.npmjs.com/package/fast-glob): 高性能文件匹配库，类似 `glob`，但速度更快。

- [adm-zip](https://www.npmjs.com/package/adm-zip): 处理 ZIP 文件的库，支持创建、解压缩。

## **📌 进程管理 & 任务自动化**

- [pm2](https://www.npmjs.com/package/pm2): <u>进程管理工具</u>，适用于 Node.js 应用，支持负载均衡、日志管理。

- [nodemon](https://www.npmjs.com/package/nodemon): 监听 Node.js 代码变更，自动重启应用。

- [concurrently](https://www.npmjs.com/package/concurrently): 允许同时运行多个命令（如 `npm run dev & npm run watch`）。

- [cross-env](https://www.npmjs.com/package/cross-env): 解决不同操作系统之间环境变量设置的兼容性问题。

## **📌 命令行工具（CLI 开发）**

- [commander](https://www.npmjs.com/package/commander): 轻量级 CLI 命令解析工具。

- [yargs](https://www.npmjs.com/package/yargs): 强大的 CLI 参数解析工具，支持子命令和自动帮助文档生成。

- [ora](https://www.npmjs.com/package/ora): 在 CLI 界面中显示加载动画（loading spinner）。

- [figlet](https://www.npmjs.com/package/figlet): 在终端打印大 ASCII 字体字符。

## **📌 数据库 & 存储**

- [mongoose](https://www.npmjs.com/package/mongoose): MongoDB 的对象数据模型（ODM），简化操作 MongoDB 数据库。

- [sequelize](https://www.npmjs.com/package/sequelize): 支持 MySQL、PostgreSQL、SQLite、MSSQL 的 ORM 库。

- [redis](https://www.npmjs.com/package/redis): Redis 客户端库，支持连接 Redis 数据库。

- [node-cache](https://www.npmjs.com/package/node-cache): 轻量级<u>内存缓存库</u>，适用于临时存储数据。

- [lowdb](https://www.npmjs.com/package/lowdb): 轻量级 JSON 数据库，适用于小型项目。

## **📌 认证 & 安全**

- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): 用于生成和验证 JWT（JSON Web Token）。

- [bcrypt](https://www.npmjs.com/package/bcrypt): 用于加密密码，提供安全的哈希算法。

- crypto: Node.js 内置加密模块，支持哈希、对称/非对称加密。

## **📌 测试**

- [jest](https://www.npmjs.com/package/jest): Facebook 开发的 JavaScript 测试框架，适用于单元测试、集成测试。

- [mocha](https://www.npmjs.com/package/mocha): 轻量级测试框架，常与 `chai` 搭配使用。

- [chai](https://www.npmjs.com/package/chai): 断言库，支持 `expect`、`should`、`assert` 语法。

- [supertest](https://www.npmjs.com/package/supertest): 用于测试 API，支持 `Express` 等框架。

## **📌 Web 框架**

- [express](https://www.npmjs.com/package/express): 轻量级、灵活的 Node.js Web 框架。

- [koa](https://www.npmjs.com/package/koa): 由 `Express` 团队开发的 Web 框架，基于 `async/await` 设计。

- [fastify](https://www.npmjs.com/package/fastify): 高性能 Web 框架，比 `Express` 快 2~3 倍。

- [nest](https://www.npmjs.com/package/@nestjs/core): 适用于企业级应用的 TypeScript Web 框架，基于 `Express`。

## **📌 WebSocket**

- [ws](https://www.npmjs.com/package/ws): WebSocket 服务器端和客户端实现。

- [socket.io](https://www.npmjs.com/package/socket.io): WebSocket 库，支持自动重连、事件机制。

## **📌 其他**

- [dotenv](https://www.npmjs.com/package/dotenv): 读取 `.env` 文件中的环境变量。

- [uuid](https://www.npmjs.com/package/uuid): 生成唯一 ID（UUID）。

- [xml2js](https://www.npmjs.com/package/xml2js): XML 和 JSON 互相转换。

- [fast-json-stringify](https://www.npmjs.com/package/fast-json-stringify): 比 `JSON.stringify()` 更快的 JSON 序列化工具。
