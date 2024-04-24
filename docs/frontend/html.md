# HTML-JS-CSS

## HTML

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

## JS

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
