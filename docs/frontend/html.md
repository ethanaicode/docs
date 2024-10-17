> 目前包含了 html，css 以及 js 的内容，由于之前学的时候，也没怎么做笔记，所以这部分内容目前较少，就先不分开了。

# HTML

# CSS

文字内容元素存在默认宽度`min-content`，宽度由内容中最长单词来决定（避免单词被拆开）。

## CSS 基础

### CSS 属性

- `letter-spacing` 字母间距
- `word-spacing` 单词间距

### CSS 选择器

**分组选择器**

- `A,B` 选择所有能被列表中的任意一个选择器选中的节点（就是两个都匹配）

**组合器**

- `A B` 选择前一个元素的后代节点（A 的子元素 B，不一定是直接子元素）
- `A > B` 选择前一个元素的直接子代节点（A 的子元素 B）
- `A + B` 选择前一个元素的相邻兄弟节点（A 和 B 共享同一个父元素，且 B 紧跟在 A 后面，只选择第一个）
- `A ~ B` 选择前一个元素之后的所有兄弟节点（A 和 B 共享同一个父元素，且 B 在 A 之后）

**伪类**

- `:hover` 鼠标悬停
- `:active` 激活状态
- `:focus` 获得焦点
- `:first-child` 第一个子元素
  父节点下的第一个子元素，且第一个元素类型为指定类型，如果不是指定类型，不会生效）

  ```html
  <div>
    <p>此文本已选中！</p>
    <p>此文本未选中。</p>
  </div>

  <div>
    <h2>此文本未被选中：它不是一个 `p`。</h2>
    <p>此文本未被选中。</p>
  </div>
  <style>
    p:first-child {
      color: red;
    }
  </style>
  ```

- `:last-child` 最后一个子元素
- `:nth-child(n)` 第 n 个子元素
- `:nth-child(odd)` 奇数子元素
- `:nth-child(even)` 偶数子元素
- `:nth-last-child(n)` 倒数第 n 个子元素
- `:first-of-type` 第一个指定类型的子元素
  父节点下的第一个指定类型的子元素，它不一定是第一个子元素，只要是第一个指定类型的子元素即可。

**伪元素**

- `::before` 在元素内容之前插入内容
- `::after` 在元素内容之后插入内容
- `::first-line` 选择元素的第一行
- `::first-letter` 选择元素的第一个字母

**优先级**

- `!important` 优先级最高

- `伪类` > `类` > `标签`

## CSS 布局

### Flex

#### Flex 轴线及容器

当使用 flex 布局时，首先想到的是两根轴线 — 主轴和交叉轴。主轴由 `flex-direction` 定义，另一根轴垂直于它。

##### flex-direction

定义主轴的方向，可以取 4 个值：

- `row`
- `row-reverse`
- `column`
- `column-reverse`

##### flex-warp

用来实现多行 Flex 容器。

- `nowrap`: 默认值，不会换行
- `warp`: 允许换行
- `wrap-reverse`: 不常用，了解即可

#### Flex 元素上的属性

##### flex-basis

指定 flex 元素在主轴方向上的初始大小。

##### flex-grow

用来规定在 flex 容器中**分配剩余空间**的相对比例。

**注意:** 因为是在分配剩余空间，所以不能简单理解为倍数，除非各个元素的宽度为 0，才可以直接理解为倍数。

> 小考题：
>
> 比如容器宽度 110px，元素 A 的 flex-grow 为 1，元素 B 的 flex-grow 为 2，元素 A 和 B 的 flex-basis 都为 10px，那么最终元素 B 在容器中的宽度是多少？
>
> 计算：10px + 1x + 10px + 2x = 110px，算出 x 为 30px，所以元素 B 的宽度为 20px+2x，也就是 80px。

##### flex-shrink

指定了 flex 元素的收缩规则。

这个仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值。

##### flex

此属性是以下 CSS 属性的简写：

- [`flex-grow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow)
- [`flex-shrink`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-shrink)
- [`flex-basis`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis)

**默认值**

`initial`: 相当于将属性设置为"`flex: 0 1 auto`"。

`auto`: 相当于将属性设置为 "`flex: 1 1 auto`".

`none`: 相当于将属性设置为"`flex: 0 0 auto`"。

#### 元素间的对其和空间分配

##### justify-content

使元素在主轴方向上对齐。

- `stretch`
- `flex-start`
- `flex-end`
- `center`
- `space-between`: 把元素排列好之后的剩余空间拿出来，平均分配到元素之间，所以元素之间间隔相等
- `space-around`: 使每个元素的左右空间相等（头尾会共用一个空间距离）
- `space-evenly`: 使每个元素的左右空间相等（包括头尾也是一致的）

##### align-items

可以使元素在交叉轴方向对齐。

- `stretch`: 默认值，拉伸到最高元素的高度
- `flex-start`: 使 flex 元素按 flex 容器的顶部对齐
- `flex-end`: 使 flex 元素按 flex 容器的底部对齐
- `center`: 使 flex 元素按 flex 容器的中心对齐
- `baseline`: 和 start 类似，但是会以文字的基线对齐（这意味着文字大小不同时，会和 start 有明显不同）

##### align-content

适用于允许换行后，如何在交叉轴上分布内容。

- `normal`: 默认值
- `flex-start`: 交叉轴的开始对齐
- `flex-end`: 交叉轴的结束对齐
- `center`
- `space-between`
- `space-around`
- `space-evenly`

##### [order](https://developer.mozilla.org/zh-CN/docs/Web/CSS/order)

规定了弹性容器中的可伸缩项目在布局时的顺序。

可以配合 flex 元素实现想要的元素顺序。

> 参考：[MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)

## CSS 自定义属性

通过 `--` 开头的属性名，可以定义自己的 CSS 变量。

和其他属性一样，自定义属性也是写在规则集之内的，如下：

```css
:root {
  --main-color: #ff0000;
}
```

注意，规则集所指定的选择器定义了自定义属性的可见作用域。通常的最佳实践是定义在根伪类 :root 下，这样就可以在 HTML 文档的任何地方访问到它了。

之后，可以通过 `var()` 函数来引用这个变量：

```css
p {
  color: var(--main-color);
}
```

> 参考：[MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)

# JS

## JavaScript 基础

### 表达式和参考符

**typeof**

用于判断变量的类型

```js
typeof "John"; // Returns string
```

### 内置对象

**[Array.prototype.map()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)**

`map()` 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

```js
const array1 = [1, 4, 9, 16];

// Pass a function to map
const map1 = array1.map((x) => x * 2);

console.log(map1);
// Expected output: Array [2, 8, 18, 32]
```

## 元素 (Element)

### 滚动相关 (Scroll)

- `element.scrollTop`：获取或设置一个元素的内容垂直滚动的像素数。

- `element.scrollHeight`：获取元素的内容高度，包括溢出的内容。

- `element.scrollLeft`：获取或设置一个元素的内容水平滚动的像素数。

- `element.scrollIntoView()`：使元素滚动到可见区域。

还可以使用 `scrollTop` 属性来指定滚动的位置：

```js
element.scrollTop = 100;
```

> 参考：[MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)

## 内置对象 (Built-in Objects)

### 静态对象 (Static objects)

#### Object.defineProperty()

定义对象的一个属性，或修改现有属性的特性。

```js
Object.defineProperty(obj, prop, descriptor);
```

可以用它来修改对象的属性，比如修改`navigator`对象的`webdriver`属性：

```js
Object.defineProperty(navigator, "webdriver", {
  get: () => false,
});
```

- `webDriver` 是一个布尔值，指示浏览器是否正在运行 `webDriver` 测试。

- 通过修改这个属性，可以防止网站检测到你是通过 WebDriver 运行的，有一定的反爬虫效果。

还可以修改其他属性，比如修改`navigator`对象的`userAgent`属性：

```js
Object.defineProperty(navigator, "userAgent", {
  get: () =>
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
});
```

## Dom 操作 (Document Object Model)

> 参考：[MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)

### Shadow DOM

> 参考：[MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)

Shadow DOM 是一种 JavaScript API，用来将 DOM 树的一部分封装起来，使其成为独立的“子树”。这个子树与外部的 DOM 隔离，外部的样式和 JavaScript 无法直接访问或影响它，反之亦然。这种封装提供了一种方式来创建自定义元素，使得其内部结构和行为不受外部环境的干扰。

在使用 Vue.js、React 等现代框架时，常需要进行动态内容的渲染。通过 Shadow DOM，可以将动态渲染的内容封装起来，避免与页面其他部分的冲突。

另外，在样式隔离、Web 组件封装、定制化 UI 等方面，Shadow DOM 也有着广泛的应用。

_视频号的管理后台 --> 达人广场界面的内容，都是通过 Shadow Dom 来实现的_

**Shadow DOM 的基础操作**

- `element.shadowRoot`: 获取元素的 Shadow DOM 根节点。

  ```js
  let customElement = document.querySelector("custom-element");
  let shadowRoot = customElement.shadowRoot;
  ```

- `element.attachShadow()`: 创建一个 Shadow DOM 根节点。

  里面有一个参数，可以是一个对象，用来设置 Shadow DOM 的模式：

  - `{ mode: "open" }` 表示可以通过 `element.shadowRoot` 访问 Shadow DOM。

  - `{ mode: "closed" }` 表示不可以通过 `element.shadowRoot` 访问 Shadow DOM。

## Web APIs

> 完整的列表可以参考：[MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API)

### [Web Storage](https://www.w3schools.com/html/html5_webstorage.asp)

通过 Web Storage，网页可以在本地存储数据（类似于 Cookie，但是更安全，更快）。

### Node

`Node` 对象表示文档中的节点。

#### getElementById

返回对拥有指定 ID 的第一个对象的引用。

```js
document.getElementById("myId");
```

#### querySelector

返回文档中匹配指定 CSS 选择器的一个元素。

```js
document.querySelector(".auxo-table-body");
```

可以组合起来使用，比如我想要获取某个元素下的某个子元素：

```js
document.querySelector("div.flex.flex-col div.flex.flex-row span");
```

#### querySelectorAll

返回文档中匹配指定 CSS 选择器的所有元素。

```js
document.querySelectorAll("tbody tr");
```

### Navigator

`Navigator` 对象包含有关浏览器的信息。

在控制台中输入 `Navigator` 可以查看浏览器的相关信息。

#### The localStorage Object

对象存储可以一直使用，直到用户清除浏览器缓存。

```js
// 设置
localStorage.setItem("lastname", "Smith");

// 获取
document.getElementById("result").innerHTML = localStorage.getItem("lastname");
```
