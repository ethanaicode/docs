---
title: CSS 前端开发学习指南，最全的CSS样式和用法汇总
---

# CSS

> 由于有一定基础，这里仅记录一些重要的知识点

文字内容元素存在默认宽度`min-content`，宽度由内容中最长单词来决定（避免单词被拆开）。

## CSS 基础

### CSS 选择器

**分组选择器**

- `A,B` 选择所有能被列表中的任意一个选择器选中的节点（就是两个都匹配）

**组合器**

- `A B` 选择前一个元素的后代节点（A 的子元素 B，不一定是直接子元素）

- `A > B` 选择前一个元素的直接子代节点（A 的子元素 B）

  如 `div > p` 选择 `div` 下的所有 `p` 元素

- `A + B` 选择前一个元素的相邻兄弟节点（A 和 B 共享同一个父元素，且 B 紧跟在 A 后面，只选择第一个）

  如 `div p + p{margin-top: 10px;}` 选择 `div` 下的所有 `p` 元素，除了第一个 `p` 元素，其余 `p` 元素的上边距为 10px

- `A ~ B` 选择前一个元素之后的所有兄弟节点（A 和 B 共享同一个父元素，且 B 在 A 之后）

  如 `div p.highlight ~ p {color: red;}` 选择 `div` 下的所有 `p` 元素，且 `p` 元素的类名为 `highlight` 之后的所有 `p` 元素，字体颜色为红色

  `+` 和 `~` 容易弄混，可以记住 `+` 是相邻的，`~` 是所有的，如下面的案例很容易看出区别:

  _这个案例中前三个段落选择效果是一样的，但是第四个段落 `+` 选择器则无法选择到_

  ```html
  <div>
    <p>第一个段落</p>
    <p>第二个段落</p>
    <p>第三个段落</p>
    <span>非段落元素</span>
    <p>第四个段落</p>
  </div>

  <style>
    div p + p {
      color: red;
    }

    div p ~ p {
      color: blue;
    }
  </style>
  ```

**正则表达式**

- `E[foo^="bar"]` 选择 `foo` 属性值以 `bar` 开头的 `E` 元素

  如 `span[class^="data-card___"]` 选择 `span` 元素的 `class` 属性值以 `data-card___` 开头的元素

- `E[foo$="bar"]` 选择 `foo` 属性值以 `bar` 结尾的 `E` 元素

- `E[foo*="bar"]` 选择 `foo` 属性值包含 `bar` 的 `E` 元素（元素中的属性值包含）

- `E[foo~="bar"]` 选择 `foo` 属性值中包含一个<u>以空格分隔的值</u>为 `bar` 的 `E` 元素（元素中的属性值是以空格分隔的）

- `E[foo|="en"]` 选择 `foo` 属性值以 `en` 开头的 `E` 元素，或者 `foo` 属性值以 `en-` 开头的 `E` 元素

**伪类**

- `:hover` 鼠标悬停

- `:active` 激活状态

- `:focus` 获得焦点

- `:first-child` 第一个子元素

  父节点下的第一个子元素，且第一个元素类型为指定类型，如果不是指定类型，不会生效）

- `:last-child` 最后一个子元素

- `:nth-child(n)` 第 n 个子元素

- `:nth-child(odd)` 奇数子元素

- `:nth-child(even)` 偶数子元素

- `:nth-last-child(n)` 倒数第 n 个子元素

- `:first-of-type` 第一个指定类型的子元素

  父节点下的第一个指定类型的子元素，它不一定是第一个子元素，只要是第一个指定类型的子元素即可。

- `:last-of-type` 最后一个指定类型的子元素

- `:nth-of-type(n)` 第 n 个指定类型的子元素

  ```html
  <div>
    <p>此文本已选中！</p>
    <p>此文本未选中。</p>
  </div>

  <div>
    <h2>此文本未被选中：它不是一个 `p`。</h2>
    <p>此文本未被选中。</p>
  </div>
  <!-- 选中第一个 `p` 元素 -->
  <style>
    p:first-child {
      color: red;
    }
  </style>
  <!-- 选中第二个 `div` 元素 -->
  <style>
    div:nth-of-type(2) {
      color: red;
    }
  </style>
  ```

**伪元素**

- `::before` 在元素内容之前插入内容

- `::after` 在元素内容之后插入内容

- `::first-line` 选择元素的第一行

- `::first-letter` 选择元素的第一个字母

**优先级**

- `!important` 优先级最高

- `伪类` > `类` > `标签`

## 属性样式

### margin-\* 外边距

#### margin

`margin` 属性是一个简写属性，用于设置所有外边距属性。

简写的顺序如下:

- `margin: 2px 1em 0 auto;`: 上边 | 右边 | 下边 | 左边（顺时针）

- `margin: 1em auto 2em;`: 上边 | 左右 | 下边

### box-\* 盒模型

#### box-shadow

`box-shadow` 属性用于在元素的框上添加阴影效果，它可以接受多个阴影值:

- `h-shadow`: 必需。水平阴影的位置。允许负值。

- `v-shadow`: 必需。垂直阴影的位置。允许负值。

- `blur`: 可选。模糊距离。

- `spread`: 可选。阴影的尺寸。

- `color`: 可选。阴影的颜色。

- `inset`: 可选。将外部阴影 (outset) 改为内部阴影。

以下是一些案例：

- `box-shadow: 10px 10px 5px green;`: 10px 水平阴影，10px 垂直阴影，5px 模糊距离，颜色为 green

- `box-shadow: 10px 10px 5px 0px green;`: 10px 水平阴影，10px 垂直阴影，5px 模糊距离，0px 阴影尺寸，颜色为 green

### background-\* 背景

#### background

`background` 属性是一个简写属性，用于设置所有背景属性。

简写的顺序如下:

- `background-color`

- `background-image`

- `background-repeat`

- `background-position`

- `background-size`

以下是一些案例：

- `background: green url("img_tree.png") no-repeat center / cover;`: 图片不重复，居中显示，覆盖整个元素

- `background: green url("img_tree.png") no-repeat center center;`: 图片不重复，居中显示

- `background: green url("img_tree.png") no-repeat 10px 10px;`: 图片不重复，距离左上角 10px

### transform-\* 动画

#### transform

`transform` 属性允许你旋转、缩放、倾斜或平移给定元素。

主要有以下几种变换：

- `rotate()`: 旋转

- `scale()`: 缩放

- `skew()`: 倾斜

- `translate()`: 平移

- `matrix()`: 矩阵变换

另外，它们通常还支持单独的轴变换，如 `rotateX()`、`rotateY()`、`rotateZ()`，以及 3D 变换，如 `rotate3d()`、`scale3d()`、`translate3d()`。

### transition-\* 过渡

#### transition

`transition` 属性是一个简写属性，用于设置四个过渡属性:

- `transition-property`: 规定应用过渡效果的 CSS 属性的名称。

- `transition-duration`: 定义过渡效果花费的时间。默认是 0。

- `transition-timing-function`: 规定过渡效果的时间曲线。默认是 `ease`。

- `transition-delay`: 规定过渡效果何时开始。默认是 0。

```css
/* 所有属性在 1 秒内完成 */
transition: transform 1s, opacity 1s;
/* 所有属性在 1 秒内完成，延迟 0.5 秒 */
transition: all 1s 0.5s;
```

#### transition-timing-function

`transition-timing-function` 属性指定过渡效果的速度曲线。

- `ease`: 默认值，慢速开始，然后变快，然后慢速结束

  `ease-in` 由慢到快

  `ease-out` 由快到慢

  `ease-in-out` 由慢到快再到慢

- `linear`: 匀速

- `step-start`: 瞬间开始

- `step-end`: 瞬间结束

- `steps(6, end)`: 分 6 步完成，每一步结束时都会有一个瞬间的停顿

  `steps(6, start)`: 分 6 步完成，每一步开始时都会有一个瞬间的停顿

  `steps(6, jump-start)`: 分 6 步完成，每一步开始时都会有一个瞬间的停顿

  `steps(6, jump-end)`: 分 6 步完成，每一步结束时都会有一个瞬间的停顿

  `steps(6, jump-none)`: 分 6 步完成，没有停顿

  `steps(6, jump-both)`: 分 6 步完成，每一步开始和结束时都会有一个瞬间的停顿

- `cubic-bezier(.29, 1.01, 1, -0.68)`: 自定义速度曲线，四个值分别是 `x1, y1, x2, y2`，表示曲线的两个控制点

### 文字段落样式

#### 常用属性

- `letter-spacing` 字母间距

- `word-spacing` 单词间距

## 功能函数 Functions

### linear-gradient

`linear-gradient` 是一种沿着一条直线的渐变效果。

下面是一些案例：

- `linear-gradient(45deg, blue, red);`: 45 度角的渐变，从蓝色到红色

- `linear-gradient(to left top, blue, red);`: 从左上角到右下角的渐变，从蓝色到红色

- `linear-gradient(in oklab, blue, red);`: 基于 OKLab 的渐变

- `linear-gradient(in hsl, blue, red);`: 基于 HSL 的渐变

- `linear-gradient(in hsl longer hue, blue, red);`: 基于 HSL 的渐变，但是 hue 的范围更大

- `linear-gradient(0deg, blue, green 40%, red);`: 从下到上的渐变，开始是蓝色，到 40% 的地方是绿色，最后是红色

- `linear-gradient(.25turn, red, 10%, blue);`: 从左到右的渐变，开始是红色直到 10%，剩下的 90% 渐变到蓝色

- `linear-gradient(45deg, red 0 50%, blue 50% 100%);`: 多位置渐变

下面是一些关键字：

- `to` 关键字可以指定渐变的方向，可以是 `top`、`right`、`bottom`、`left`，也可以是 `top left`、`top right`、`bottom left`、`bottom right`。

- `deg` 单位可以指定角度，也可以是 `turn`、`rad`、`grad`。

- `in` 关键字可以指定颜色空间，可以是 `srgb`、`display-p3`、`rec2020`、`oklab`、`hsl`。

- `longer hue` 关键字可以指定 hue 的范围更大。

- `from` 关键字可以指定渐变的起始位置。如果没有指定，默认是 `top`。

- `color start end` 可以指定渐变的颜色范围。

### calc() 计算属性值

`calc()` 函数用于动态计算长度值。这个可以结合自定义属性来使用。

- `width: calc(var(--variable-width) + 20px);`: 宽度等于自定义属性的值加上 20px

### var() 自定义属性

通过 `--` 开头的属性名，可以定义自己的 CSS 变量。

和其他属性一样，自定义属性也是写在规则集之内的，如下：

```css
:root {
  --main-color: #ff0000;
}
```

**注意**: 规则集所指定的选择器定义了自定义属性的可见作用域。通常的最佳实践是定义在根伪类 `:root` 下，这样就可以在 `HTML` 文档的任何地方访问到它了。

之后，可以通过 `var()` 函数来引用这个变量：

```css
p {
  color: var(--main-color);
}
```

## CSS 布局

### Flex

#### Flex 轴线及容器

当使用 flex 布局时，首先想到的是两根轴线 — 主轴和交叉轴。主轴由 `flex-direction` 定义，另一根轴垂直于它。

**flex-direction**

定义主轴的方向，可以取 4 个值：

- `row`

- `row-reverse`

- `column`

- `column-reverse`

**flex-warp**

用来实现多行 Flex 容器。

- `nowrap`: 默认值，不会换行

- `warp`: 允许换行

- `wrap-reverse`: 不常用，了解即可

#### Flex 元素上的属性

**flex-basis**

指定 flex 元素在主轴方向上的初始大小。

**flex-grow**

用来规定在 flex 容器中**分配剩余空间**的相对比例。

**注意**: 因为是在分配剩余空间，所以不能简单理解为倍数，除非各个元素的宽度为 0，才可以直接理解为倍数。

> 小考题：
>
> 比如容器宽度 110px，元素 A 的 flex-grow 为 1，元素 B 的 flex-grow 为 2，元素 A 和 B 的 flex-basis 都为 10px，那么最终元素 B 在容器中的宽度是多少？
>
> 计算：10px + 1x + 10px + 2x = 110px，算出 x 为 30px，所以元素 B 的宽度为 20px+2x，也就是 80px。

**flex-shrink**

指定了 flex 元素的收缩规则。

这个仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值。

**flex**

此属性是以下 CSS 属性的简写：

- [`flex-grow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow)
- [`flex-shrink`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-shrink)
- [`flex-basis`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis)

**默认值**

`initial`: 相当于将属性设置为"`flex: 0 1 auto`"。

`auto`: 相当于将属性设置为 "`flex: 1 1 auto`".

`none`: 相当于将属性设置为"`flex: 0 0 auto`"。

#### 元素间的对其和空间分配

**justify-content**

使元素在主轴方向上对齐。

- `stretch`

- `flex-start`

- `flex-end`

- `center`

- `space-between`: 把元素排列好之后的剩余空间拿出来，平均分配到元素之间，所以元素之间间隔相等

- `space-around`: 使每个元素的左右空间相等（头尾会共用一个空间距离）

- `space-evenly`: 使每个元素的左右空间相等（包括头尾也是一致的）

**align-items**

可以使元素在交叉轴方向对齐。

- `stretch`: 默认值，拉伸到最高元素的高度

- `flex-start`: 使 flex 元素按 flex 容器的顶部对齐

- `flex-end`: 使 flex 元素按 flex 容器的底部对齐

- `center`: 使 flex 元素按 flex 容器的中心对齐

- `baseline`: 和 start 类似，但是会以文字的基线对齐（这意味着文字大小不同时，会和 start 有明显不同）

**align-content**

适用于允许换行后，如何在交叉轴上分布内容。

- `normal`: 默认值

- `flex-start`: 交叉轴的开始对齐

- `flex-end`: 交叉轴的结束对齐

- `center`

- `space-between`

- `space-around`

- `space-evenly`

**order**

规定了弹性容器中的可伸缩项目在布局时的顺序。

可以配合 flex 元素实现想要的元素顺序。

> 参考：[MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)
