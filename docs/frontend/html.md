> 目前包含了 html，css 以及 js 的内容，由于之前学的时候，也没怎么做笔记，所以这部分内容目前较少，就先不分开了。

# HTML

### HTML APIs

#### [Web Storage](https://www.w3schools.com/html/html5_webstorage.asp)

With web storage, web applications can store data locally within the user's browser.

##### The localStorage Object

对象存储可以一直使用

The localStorage object stores the data with no expiration date. The data will not be deleted when the browser is closed, and will be available the next day, week, or year.

**Example**

```js
// Store
localStorage.setItem("lastname", "Smith");

// Retrieve
document.getElementById("result").innerHTML = localStorage.getItem("lastname");
```

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
