# Selenium

> 官方文档：[https://www.selenium.dev/documentation/en/](https://www.selenium.dev/documentation/en/)

## DOM 元素

### 选择元素

使用`driver.find_element`方法选择元素。

```python
element = driver.find_element(By.ID, 'element_id')
```

一共支持以下几种传统选择器：

- `By.CLASS_NAME` 通过类名选择

- `By.CSS_SELECTOR` 通过 CSS 选择器选择

- `By.ID` 通过元素 ID 选择

- `By.NAME` 通过元素名称选择

- `By.LINK_TEXT` 通过链接文本选择

- `By.PARTIAL_LINK_TEXT` 通过部分链接文本选择

- `By.TAG_NAME` 通过标签名选择

- `By.XPATH` 通过 XPath 选择（这是一种强大的选择器，有点类似于正则表达式）
