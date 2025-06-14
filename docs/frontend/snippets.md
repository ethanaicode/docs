---
title: 前端必备小知识点合集汇总
---

# 前端随记本

> 本文档收集了一些前端开发中的小知识点，比较零碎，还不足以单独开一个章节的内容。

## HTTP Requests

### 基础概念

#### Promise

Promise 是 JavaScript 的异步编程解决方案，它是一个对象，用来表示一个异步操作的最终完成（或失败）及其结果值。

通俗上理解，Promise 就是一张「承诺未来会给你结果」的<u>『凭证』</u>，让你在等待异步操作时，不用停下来傻傻地等着，可以先去忙别的事情。

所以通常你还需要告诉 Promise 两件事情：1.

成功（resolved）了，你要做什么？

失败（rejected）了，你要做什么？

#### async/await

`async/await` 是 ES2017（ES8）引入的新特性，用于简化 Promise 的使用。

当一个函数被标记为 `async` 时，它会<u>返回一个 Promise 对象</u>（这是它和普通函数不同的地方）。

换句话说，`async` 就像给函数贴了个标签，告诉 JavaScript：

_「注意了，这个函数内可能不会立即执行完成，它将以『异步』的方式返回结果。_

**为什么要用 async？**

传统的 Promise 写法，经常会遇到这样的情况：

```javascript
function fetchData() {
  return fetch("https://api.example.com/data")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}
```

你会看到，处理异步代码总要用很多的 `.then` 和 `.catch`。如果逻辑复杂，很快会变得难读。

因此，JavaScript 引入了 async 函数，让代码更清晰、更像同步代码：

```javascript
async function fetchData() {
  const response = await fetch("https://api.example.com/data");
  const data = await response.json();
  return data;
}
```

**什么是 await？**

`await` 只能放在 `async` 函数里。它的作用是：

- 让代码暂停在这里等待 Promise 完成。

- Promise 完成（resolved）后，再继续向下执行。

- await 就是告诉 JavaScript：「就在这里停一下，等异步完成了再继续。」

**代码示例：**

```javascript
// 标记函数为 async（异步函数）
async function getUserInfo(userId) {
  try {
    const response = await fetch(`https://api.example.com/user/${userId}`);
    const userData = await response.json();
    console.log("拿到了用户数据：", userData);
  } catch (error) {
    console.error("请求用户数据出错：", error);
  }
}

console.log("开始执行");
getUserInfo(123); // 异步执行，不会阻塞后续代码
console.log("函数已调用，继续执行后面的代码");
```

执行顺序：

```bash
开始执行
函数已调用，继续执行后面的代码
拿到了用户数据: {...} （稍后异步完成）
```

可以看到，`await` 会让异步代码<u>像同步代码一样执行</u>，不会阻塞后续代码的执行。

### 请求头

#### 常见请求头

- `Accept: application/json`: 表示客户端希望接收 JSON 格式的数据

- `Content-Type: application/json`: 表示客户端发送的数据是 JSON 格式的

- `Authorization Bearer token`: 表示客户端发送的请求需要携带 token

- `X-Requested-With: XMLHttpRequest`: 表示客户端发送的请求<u>是 AJAX 请求</u>

- `User-Agent: Mozilla/5.0`: 表示客户端的浏览器信息

- `Referer: http://www.example.com`: 表示请求的来源地址

- `Origin: http://www.example.com`: 表示请求的来源地址

- `Host: www.example.com`: 表示请求的主机地址

- `Cookie: name=value`: 表示请求的 cookie 信息

- `Cache-Control: no-cache`: 表示不使用缓存

- `Connection: keep-alive`: 表示保持长连接

### 请求库

#### Fetch API

Fetch API 是一种新的网络请求方式，可以替代传统的 XMLHttpRequest 对象。

它是 JavaScript 原生提供的全局函数，可以用来发起网络请求。

fetch 示例：

```javascript
fetch("http://example.com/movies.json")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

- `fetch` 返回的是一个 Promise 对象，当收到服务器<u>响应头</u>时，这个 Promise 对象完成（此时还**拿不到响应体**）。

- `response.json()` 返回的是另一个 Promise 对象，当收到服务器<u>响应体</u>时，这个 Promise 对象会被解析为 JSON 对象。

#### Axios

> [Axios 官网](https://axios-http.com/zh/)

Axios 是一个基于 Promise 的 HTTP 客户端，可以用在浏览器和 node.js 中。

它是一个第三方库，需要单独安装。

```bash
npm install axios
```

axios 示例：

```javascript
axios({
  method: "get",
  url: "http://example.com/movies.json",
})
  .then((response) => console.log(response.data))
  .catch((error) => console.error(error));
```

- `axios` 自动处理请求和响应为 JSON 格式，不需要手动调用 `response.json()` 来解析响应体。

- `axios` 还内置了请求超时的处理，可以通过 `timeout` 选项来设置请求超时时间，而无需手动设置 `setTimeout`。

它还提供了一些便捷的请求方法别名：

- `axios.get(url[, config])`: 发送一个 GET 请求

- `axios.post(url[, data[, config]])`: 发送一个 POST 请求

- `axios.put(url[, data[, config]])`: 发送一个 PUT 请求

- `axios.delete(url[, config])`: 发送一个 DELETE 请求

- `axios.request(config)`: 发送一个自定义请求

## Chrome 调试技巧

### 快速笔记

- `Ctrl + Shift + I`: 打开开发者工具

- `Network`: 查看网络请求，里面还可以设置网络条件，比如网络速度设置为 `Slow 3G`

### 脚本书签

脚本书签是一种非常实用的 Chrome 开发者工具，我们可以把一段 JS 代码保存为书签，然后在需要的时候直接运行。

脚本书签的好处是可以快速执行一些常用的脚本，而不需要每次都打开控制台。

#### 创建脚本书签

创建脚本书签的方法也很简单，只要把书签的 URL 设置为 `javascript:` 开头，然后后面跟上你的 JS 代码即可。

主要有这两种写法：

1. 具名函数的 IIFE，可以用于调试：

   ```javascript
   javascript: (function myFunction() {
     alert("Hello, World!");
   })();
   ```

2. 匿名函数的 IIFE，适合直接执行，更紧凑且兼容性好

   ```javascript
   javascript: !(function () {
     alert("Hello, World!");
   })();
   ```

   `!function(){}`、`+function(){}`、`~function(){}`、`void function(){}` 等前缀，都是 IIFE 的惯用技巧，目的都是将 `function` 转成表达式。

推荐编辑好代码后进行压缩，压缩后可以去掉空格和换行符，使得书签更短。

#### 常用脚本书签示例

- **开启网页编辑模式**：可以直接编辑网页内容，适用于临时修改页面内容。

  ```javascript
  javascript: !(function () {
    "true" === document.body.getAttribute("contenteditable")
      ? (document.body.setAttribute("contenteditable", !1),
        alert("网页不能编辑啦！"))
      : (document.body.setAttribute("contenteditable", !0),
        alert("网页可以编辑啦！"));
  })();
  ```

- **开启密码输入框的明文显示**：可以将密码输入框的内容显示为明文，方便查看。

  ```javascript
  javascript: !(function () {
    var inputs = document.querySelectorAll("input[type='password']");
    inputs.forEach(function (input) {
      input.type = "text";
    });
  })();
  ```

## layui

layui 虽然用的不多，但是公司的老项目很多都是基于 layui 开发的，所以还是有必要了解一下。

### 快速笔记

- `layui.form.render()`: 用于渲染表单，如果表单是动态生成的，需要重新渲染一下。

- `layui.form.on()`: 用于监听表单事件，比如监听 select 的 change 事件。

- `layui.table.render()`: 用于渲染表格，如果表格是动态生成的，需要重新渲染一下。

- `layui.table.reload()`: 用于重新渲染表格，比如表格数据发生变化时，需要重新渲染。

### 内置模块-表格

> [table 数据表格文档 - layui.table](https://layui.dev/2.7/docs/modules/table.html)

#### 简介

`layTable` 是 layui 中用于渲染表格的模块，常用语法是通过 `table.render` 来初始化。

```js
layui.use("table", function () {
  var table = layui.table;

  table.render({
    elem: "#demo", // 表格容器 ID 选择器
    url: "/api/list", // 数据接口（返回 JSON）
    cols: [
      [
        // 表头（二维数组）
        { field: "id", title: "ID", width: 80 },
        { field: "username", title: "用户名" },
        { field: "sex", title: "性别" },
        { field: "status", title: "状态", templet: "#statusTpl" },
      ],
    ],
    page: true, // 是否开启分页
  });
});
```

#### cols 参数详解

`cols` 是一个二维数组，通常定义每一列的行为与样式。

```
js


CopyEdit
cols: [[
  {field: 'id', title: 'ID', width: 80, sort: true},
  {field: 'username', title: '用户名'},
  {type: 'checkbox'}, // 选择框
  {type: 'numbers'},  // 自动编号
  {title: '操作', toolbar: '#toolbarTpl'}
]]
```

**常用配置项说明：**

| 属性      | 说明                               |
| --------- | ---------------------------------- |
| `field`   | 对应数据字段名（JSON 的 key）      |
| `title`   | 表头显示的名称                     |
| `width`   | 列宽（可选）                       |
| `sort`    | 是否开启排序                       |
| `fixed`   | 是否固定列（'left' 或 'right'）    |
| `type`    | 特殊列类型（如 checkbox、numbers） |
| `toolbar` | 使用外部模板（如按钮组等）         |
| `templet` | 自定义模板函数或引用模板 ID        |

#### templet 用法详解

`templet` 可以是函数，也可以是字符串模板（通常引用 `<script type="text/html">` 的内容）。

不管是那种方式，`d` 都是**当前行**数据的对象。

**函数方式**

```js
{
  field: 'status',
  title: '状态',
  templet: function(d){
    return d.status == 1 ? '启用' : '禁用';
  }
}
```

**模板引用方式**

```js
<script type="text/html" id="statusTpl">
  {{# if(d.status == 1){ }}
    <span style="color: green;">启用</span>
  {{# } else { }}
    <span style="color: red;">禁用</span>
  {{# } }}
</script>
```

```js
{ field: 'status', title: '状态', templet: '#statusTpl' }
```

**综合案例**

```html
<table id="userTable" lay-filter="userFilter"></table>

<script type="text/html" id="statusTpl">
  {{# if(d.status == 1){ }}
  <span class="layui-badge layui-bg-green">正常</span>
  {{# } else { }}
  <span class="layui-badge">停用</span>
  {{# } }}
</script>

<script>
  layui.use("table", function () {
    var table = layui.table;

    table.render({
      elem: "#userTable",
      url: "/user/list",
      cols: [
        [
          { field: "id", title: "ID", width: 60 },
          { field: "name", title: "姓名" },
          { field: "status", title: "状态", templet: "#statusTpl" },
          { title: "操作", toolbar: "#toolbarTpl" },
        ],
      ],
      page: true,
    });
  });
</script>
```

## highlight.js

> [highlight.js 官网](https://highlightjs.org/)
>
> [highlight.js Examples](https://highlightjs.org/examples)

### 主题推荐

- `atom-one-dark`: Atom One Dark 主题

- `atom-one-light`: Atom One Light 主题

- `github`: GitHub 主题

- `github-dark`: GitHub Dark 主题

- `github-gist`: GitHub Gist 主题

- `a11y-dark`: A11y Dark 主题

- `a11y-light`: A11y Light 主题

## Element UI

> [Element UI 官方文档](https://element.eleme.cn/#/zh-CN/component/installation)
>
> [Element UI 组件库](https://element-plus.gitee.io/zh-CN/guide/design.html)

## Naive UI

> [Naive UI 官方文档](https://www.naiveui.com/zh-CN/os-theme/docs/introduction)
>
> [Naive UI 组件库](https://www.naiveui.com/zh-CN/os-theme/components/avatar)

### 开始使用

首先需要安装 `naive-ui`：

```bash
npm install -D naive-ui
```

使用时可以全局引入，也可以按需引入。

并不推荐全局引入，因为会导致打包体积过大，按需引入也非常简单，在你用到的组件文件中（比如 `App.vue` 或 `Hello.vue`）这样写：

```javascript
<template>
  <n-button type="primary">点击我</n-button>
</template>

<script setup>
import { NButton } from 'naive-ui'
</script>
```

这样只引入了 `NButton`，构建时 Vite 会自动 Tree Shaking 未用的组件，**无需做任何插件配置**。

### 使用案例

#### 在图标按钮上弹出信息或者添加提示

添加提示有两种组件：`Tooltip`和 `Popover`，`Tooltip` 有基础的文本样式，适合展示一些基础的内容，如果你想自定义样式，可以使用 `Popover` 组件。

```vue
<script setup lang="ts">
import { CashOutline } from "@vicons/ionicons5";
</script>

<template>
  <n-tooltip trigger="hover" placement="top" :delay="300">
    <template #trigger>
      <n-button quaternary circle style="padding: 8px">
        <template #icon>
          <n-icon><CashOutline /></n-icon>
        </template>
      </n-button>
    </template>
    打开钱包（悬浮提示）
  </n-tooltip>
</template>
```

### 实用笔记

- `n-space`: 用于设置组件之间的间距，可以把它理解成一个 `div`，它的 `display` 属性是 `flex`，并且有 `gap` 属性。

  但官方更推荐使用 `n-flex` 组件来实现。

## Pinia

> [中文官网](https://pinia.vuejs.org/zh/)

## Tailwind CSS

> [Tailwind CSS 官网](https://tailwindcss.com/)
>
> [Tailwind CSS 中文文档](https://www.tailwindcss.cn/docs/installation)

### 开始使用

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- `tailwindcss`: Tailwind CSS 核心库
- `postcss`: PostCSS 核心库，CSS 处理器平台， Tailwind 通过它运行
- `autoprefixer`: PostCSS 插件，自动添加浏览器前缀
- `npx tailwindcss init -p`: 创建 `tailwind.config.js` 和 `postcss.config.js` 文件

## 图标库

- [xicons](https://xicons.org/#/): Native UI 推荐的图标库

- [iconify](https://iconify.design/): 一款图标库，支持多种图标库的图标
