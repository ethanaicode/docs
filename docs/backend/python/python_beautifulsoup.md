# Beautiful Soup

Beautiful Soup 是一个可以从 HTML 或 XML 文件中提取数据的 Python 库。它能够通过你喜欢的转换器实现惯用的文档导航、查找、修改文档的方式。

Beautiful Soup 支持 Python 标准库中的 HTML 解析器，还支持一些第三方的解析器，比如 lxml。它的用法非常简单，只需要导入库，然后创建一个 BeautifulSoup 对象即可。

## 安装

使用 pip 安装 Beautiful Soup：

```bash
pip install beautifulsoup4
```

## 元素查找

Beautiful Soup 提供了很多方法来查找元素，比如 `find()` 和 `find_all()`。

```python
soup = BeautifulSoup(content_html, 'html.parser')
divs = soup.find('div', class_='content-block data-overview-dashboard')
```

### 常用的查找方法

- **find** 查找第一个符合条件的元素。

- **find_all** 查找所有符合条件的元素。

- **select** 使用 CSS 选择器来查找元素。

- **select_one** 使用 CSS 选择器来查找第一个符合条件的元素。

- **get** 获取元素的属性。

### CSS 选择器

Beautiful Soup 支持 CSS 选择器，可以通过 `select()` 方法来使用。

比如：

```python
soup.select('div.content-block.data-overview-dashboard')
```

还可以支持更复杂的选择器，比如：

```python
# 可以使用通配符
soup.select('div[class^="index-module__ring-container___"]')

# 可以使用属性选择器
soup.select('div[class*="index-module__ring-container___"]')
```

### 获取元素的属性

可以使用 `get()` 方法来获取元素的属性。

```python
user_id = row.get('data-row-key')
```
