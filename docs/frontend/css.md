---
title: CSS 前端开发学习指南，最全的CSS样式和用法汇总
---

# CSS

> 由于有一定基础，这里仅记录一些重要的知识点

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

## 渐变

### 线性渐变

`linear gradient` 是一种沿着一条直线的渐变效果。

```css
/* 45度角的渐变，从蓝色到红色 */
linear-gradient(45deg, blue, red);
/* 从左上角到右下角的渐变，从蓝色到红色 */
linear-gradient(to left top, blue, red)
/* 基于 OKLab 的渐变 */
linear-gradient(in oklab, blue, red)
/* 基于 HSL 的渐变 */
linear-gradient(in hsl, blue, red)
/* 基于 HSL 的渐变，但是 hue 的范围更大 */
linear-gradient(in hsl longer hue, blue, red)
/* 从下到上的渐变，开始是蓝色，到 40% 的地方是绿色，最后是红色 */
linear-gradient(0deg, blue, green 40%, red)
/* 从左到右的渐变，开始是红色直到 10%，剩下的 90% 渐变到蓝色 */
linear-gradient(.25turn, red, 10%, blue)
/* 多位置渐变 */
linear-gradient(45deg, red 0 50%, blue 50% 100%)
```

- `to` 关键字可以指定渐变的方向，可以是 `top`、`right`、`bottom`、`left`，也可以是 `top left`、`top right`、`bottom left`、`bottom right`。

- `deg` 单位可以指定角度，也可以是 `turn`、`rad`、`grad`。

- `in` 关键字可以指定颜色空间，可以是 `srgb`、`display-p3`、`rec2020`、`oklab`、`hsl`。

- `longer hue` 关键字可以指定 hue 的范围更大。

- `from` 关键字可以指定渐变的起始位置。如果没有指定，默认是 `top`。

- `color start end` 可以指定渐变的颜色范围。

## transform-\* 动画

### transform

`transform` 属性允许你旋转、缩放、倾斜或平移给定元素。

```css
/* 2D 转换 */
transform: rotate(20deg);
transform: scale(2, 4);
transform: skew(30deg, 20deg);
transform: translate(100px, 50px);
transform: matrix(0.866, 0.5, -0.5, 0.866, 0, 0);
/* 3D 转换 */
transform: rotateX(150deg);
transform: rotateY(150deg);
transform: rotateZ(150deg);
transform: rotate3d(1, 1, 1, 150deg);
transform: scale3d(2, 4, 0.5);
transform: scaleZ(0.5);
transform: translate3d(100px, 50px, 25px);
transform: translateZ(25px);
transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
```

## box-\*

### box-shadow

`box-shadow` 属性用于在元素的框上添加阴影效果。

```css
/* 水平偏移量 | 垂直偏移量 | 模糊半径 | 扩散半径 | 阴影颜色 | 内阴影 */
box-shadow: 10px 10px 5px #888888;
/* 内阴影 */
box-shadow: inset 5px 5px 5px #888888;
```

## transition-\*

### transition

`transition` 属性是一个简写属性，用于设置四个过渡属性：

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

**注意**: 因为是在分配剩余空间，所以不能简单理解为倍数，除非各个元素的宽度为 0，才可以直接理解为倍数。

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
