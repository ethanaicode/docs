# JavaScript

## JavaScript 基础

### 表达式和参考符

**typeof**

用于判断变量的类型

```js
typeof "John"; // Returns string
```

### 内置对象-数组

#### [Array.prototype.map()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

`map()` 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

```js
const array1 = [1, 4, 9, 16];

// Pass a function to map
const map1 = array1.map((x) => x * 2);

console.log(map1);
// Expected output: Array [2, 8, 18, 32]
```

#### [Array.prototype.forEach()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

`forEach()` 方法对数组的每个元素执行一次提供的函数。

```js
document.querySelectorAll(".check-content").forEach((element) => {
  element.style.display = "";
});
```

## Window

> 参考：[MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/Window)

### 滚动相关 (Scroll)

- `window.scrollX`: 获取窗口的水平滚动位置。

- `window.scrollY`: 获取窗口的垂直滚动位置。

- `window.scrollTo()`: 滚动到指定的坐标。

  ```js
  window.scrollTo(0, 100);
  ```

- `window.scrollBy()`: 滚动指定的距离, 相对于当前的滚动位置。

  ```js
  window.scrollBy(0, 100);
  ```

**平滑滚动**

如果想要在页面滚动时更加平滑，可以使用 `scroll-behavior` 属性：

```css
html {
  scroll-behavior: smooth;
}
```

## 元素 (Element)

> 参考：[MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/Element)

### 滚动相关 (Scroll)

- `element.scrollTop`：获取或设置一个元素的内容垂直滚动的像素数。

  滚动到指定位置: `element.scrollTop = 100;`

- `element.scrollHeight`：获取元素的内容高度，包括溢出的内容。

- `element.scrollLeft`：获取或设置一个元素的内容水平滚动的像素数。

- `element.scrollIntoView()`：使元素滚动到可见区域。

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

### Window

`Window` 接口代表一个包含 DOM 文档的窗口。document 属性指向窗口中载入的 `Document` 对象。

#### setInterval()

`setInterval()` 方法会按照指定的周期（以毫秒计）来调用函数或计算表达式。

```js
setInterval(() => {
  console.log("Hello");
}, 1000);
```

可以用这个实现轮询的方法，比如我需要等待某个元素加载完成后再进行操作：

```js
function waitForElement(selector, callback, interval = 100, timeout = 5000) {
  const start = Date.now();
  const timer = setInterval(() => {
    const element = document.querySelector(selector);
    if (element) {
      clearInterval(timer);
      callback(element);
    } else if (Date.now() - start >= timeout) {
      clearInterval(timer);
      console.warn(`Element ${selector} not found within ${timeout} ms`);
    }
  }, interval);
}

waitForElement("#id_main_name", (NameSelectElement) => {
  const Namelayui =
    NameSelectElement.parentNode.querySelector(".layui-anim-upbit");
  const TypeSelectElement = document.getElementById("id_main_type");

  function ClickName(e) {
    var s = $(e);
    var selValue = e.target.getAttribute("lay-value");
    TypeSelectElement.setAttribute("value", "");

    for (let i = 0; i < NameSelectElement.length; i++) {
      if (NameSelectElement.options[i].textContent == selValue) {
        var sva = NameSelectElement.options[i].getAttribute("typevalue");
        if (sva) {
          TypeSelectElement.setAttribute("value", sva);
        }
      }
    }
  }

  if (Namelayui) {
    Namelayui.addEventListener("click", ClickName, true);
  } else {
    console.warn("Element with class 'layui-anim-upbit' not found.");
  }
});
```

通过这样设计，可以在元素加载完成后再进行操作，避免因为元素未加载完成而导致的错误。

#### setTimeout()

`setTimeout()` 方法用于在指定的**毫秒数后调用**函数或计算表达式。

```js
setTimeout(() => {
  console.log("Hello");
}, 1000);
```

### [Web Storage](https://www.w3schools.com/html/html5_webstorage.asp)

通过 Web Storage，网页可以在本地存储数据（类似于 Cookie，但是更安全，更快）。

### Node

`Node` 对象表示文档中的节点。

#### 节点属性

对于任何获取的元素，你可以通过点操作符`.`来访问它的属性。

比如想要获取 img 元素的 src 属性，可以这样：

```js
document.querySelector("img").src;
```

**常用的节点属性有：**

- `childNodes`: 返回节点的子节点集合，作为 NodeList 对象。

- `firstChild`: 返回节点的第一个子节点。

- `nodeName`: 返回节点的名称。

- `textContent`: 设置或返回节点的文本内容。

- `innerText`: 设置或返回节点及其后代的文本内容。

- `innerHTML`: 设置或返回节点的 HTML 内容。

#### evaluate()

> evaluate(xpathExpression, contextNode, namespaceResolver, resultType, result)

evaluate() 方法计算 XPath 表达式，并返回结果。

```js
document.evaluate(
  "//div",
  document,
  null,
  XPathResult.FIRST_ORDERED_NODE_TYPE,
  null
).singleNodeValue;
```

#### getElementById()

返回对拥有指定 ID 的第一个对象的引用。

```js
document.getElementById("myId");
```

#### querySelector()

返回文档中匹配指定 CSS 选择器的一个元素。

```js
document.querySelector(".auxo-table-body");
```

可以组合起来使用，比如我想要获取某个元素下的某个子元素：

```js
document.querySelector("div.flex.flex-col div.flex.flex-row span");
```

#### querySelectorAll()

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
