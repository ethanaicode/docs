---
title: HTML 前端开发学习指南，SVG图形、表单、元素、属性、标签、语义化等，最全的HTML知识汇总
---

# HTML

## HTML 标签

### 基本结构

HTML 文档的基本结构如下:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
    <h1>This is a heading</h1>
    <p>This is a paragraph.</p>
  </body>
</html>
```

### 标签语义化

HTML 标签有语义化的作用，可以让浏览器和搜索引擎更好地理解页面的内容。

常用的语义化标签有:

- `<header>`: 定义文档的头部，通常包含导航栏、标题等

- `<nav>`: 定义导航栏

- `<main>`: 定义文档的主要内容

- `<article>`: 定义独立的文章内容

- `<section>`: 定义文档的一个区域

- `<aside>`: 定义侧边栏

- `<footer>`: 定义文档的底部

- `<figure>`: 定义独立的内容，如图片、表格等

- `<figcaption>`: 定义 `<figure>` 元素的标题

### 常用标签

#### 文本标签

- `<h1>` - `<h6>`: 定义标题，`<h1>` 为最高级标题，`<h6>` 为最低级标题

- `<p>`: 定义段落

- `<a>`: 定义超链接

- `<strong>`: 定义加粗文本

- `<em>`: 定义强调文本

- `<span>`: 定义行内元素

- `<br>`: 定义换行

- `<hr>`: 定义水平线

#### 表单标签

- `<form>`: 定义表单

- `<input>`: 定义输入框

- `<textarea>`: 定义文本域

  需要注意的是，`<textarea>` 是一个“包裹型标签”，可以在其中添加文本内容，而不是通过 `value` 属性来设置。

  推荐使用紧凑写法，以避免出现空白字符。

- `<select>`: 定义下拉列表

  `<select>` 元素包含一个或多个 `<option>` 元素，用于定义下拉列表的选项。

- `<button>`: 定义按钮

#### script

`<script>` 标签用于定义客户端脚本，如 JavaScript。

```html
<script>
  document.getElementById("demo").innerHTML = "Hello JavaScript!";
</script>
```

`<script>` 的属性包括:

- `src`: 指定外部脚本文件的 URL

- `async`: 表示脚本在下载后立即执行，不会阻止页面的加载（异步加载，执行顺序不确定）

  适用于独立功能的脚本，如广告、分析代码等。

- `defer`: 表示脚本在页面解析完毕后执行（异步加载，执行顺序与页面中的顺序一致）

  适用于 DOM 操作的脚本，如事件绑定、元素操作等。

## 元素及属性

### HTML data-* 属性

HTML5 引入了 `data-*` 属性，允许在 HTML 元素中嵌入自定义数据属性。它的作用是——**让你在元素上安全地存储自定义数据**，并能在 JavaScript 里方便读取。

`data-` 后面名字可以自定义，但只能包含小写字母、数字、`-` 。访问时 JS 会自动把 `data-action-type` 转换为 `dataset.actionType`（中划线转驼峰）。

每个元素在 JS 中都可以通过 `.dataset` 访问所有 `data-*` 属性，例如：

```js
const btn = document.querySelector("button");

console.log(btn.dataset.id);       // "123"
console.log(btn.dataset.action);   // "download"

// 也可以动态设置
btn.dataset.action = "share";
```

为什么推荐使用：

- 不污染 class，用来区分样式；
- 不依赖 id（避免冲突）；
- 更语义化、清晰可扩展；
- 可方便地在 JS 中区分逻辑行为。

示例：

```html
<button data-action="download">下载</button>
<button data-action="share">分享</button>
<button data-action="like">点赞</button>
```

之后统一监听：

```js
document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-action]");
    if (!el) return;

    switch (el.dataset.action) {
        case "download": return downloadFile();
        case "share": return sharePost();
        case "like": return likePost();
    }
});
```

## HTML 图形

HTML 有多种方式来绘制图形，包括使用 SVG、Canvas 和 CSS，另外有些 JavaScript 库也可以用来绘制图表，如 D3.js、Chart.js 等。

### SVG

**SVG**（Scalable Vector Graphics）是一种用于描述二维矢量图形的 XML 格式。它支持动态交互和动画，适用于在 Web 上绘制图形。

SVG 图形是基于 XML 的，可以通过文本编辑器直接编辑，也可以通过 JavaScript 动态生成。

#### SVG 在 HTML 中的使用

SVG 可以通过 `<svg>` 标签嵌入到 HTML 中，如下所示:

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="red" />
</svg>
```

- SVG 总是以 `<svg>` 标签开始，然后在其中添加各种图形元素，如 `<circle>`、`<rect>`、`<line>`、`<path>` 等。

- `width` 和 `height` 属性定义了 SVG 图形的宽度和高度。

- 因为 SVG 是 XML 格式，所以需要指定命名空间 `xmlns="http://www.w3.org/2000/svg"`。

> [!TIP] 因为 SVG 是 XML 格式，所以请记住:
>
> - 所有元素必须被闭合
>
> - 所有的标签和属性都是大小写敏感的
>
> - 所有的属性值都需要用引号引起来，即使是数字

#### SVG 属性

在 SVG 中，有一些常用的属性，如:

- `width` 和 `height`: 定义 SVG 图形的宽度和高度。

- `viewBox`: 定义用户坐标系的位置和大小，格式为 `min-x min-y width height`。

  `min-x` 和 `min-y` 是用户坐标系的左上角坐标，`width` 和 `height` 是用户坐标系的宽度和高度。

  **注意**: 绘图区域总是以块级元素的宽度为标准，这意味着 `viewBox` 内的内容会被缩放以适应块级元素的宽度，但可能会超出块级元素的高度。

  如下图所示:

  ![1734589290168.png](https://img.shejibiji.com/2024/12/19/6763bb6c1d372.png)

### Canvas

**Canvas** 是 HTML5 新增的元素，用于绘制图形。Canvas 只是一个画布，需要使用 JavaScript 来绘制图形。

在 HTML 中，可以通过 `<canvas>` 标签来创建一个画布，如下所示:

```html
<canvas
  id="myCanvas"
  width="200"
  height="100"
  style="border:1px solid #000000;"
></canvas>
```

有了画布之后，就可以使用 JavaScript 来绘制图形了，如下所示:

```javascript
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "red";
ctx.fillRect(10, 10, 50, 50);
```

#### Canvas 绘制图片

`drawImage()` 方法用于在画布上绘制图片，主要有以下不同的语法:

- `drawImage(image, dx, dy)`: 在指定位置绘制图片，`image` 可以是一个 `Image` 对象、`Canvas` 对象或 `Video` 对象。

- `drawImage(image, dx, dy, dwidth, dheight)`: 在指定位置绘制图片，并指定宽度和高度。

- `drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)`: 从源图像的指定区域绘制图像，并在画布上的指定区域内放置图像。

  `s` 开头的参数是源图像的坐标和尺寸，`d` 开头的参数是目标图像的坐标和尺寸。
