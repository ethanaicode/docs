# Note HTML-JS-CSS

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

