# Selenium

> 官方文档：[https://www.selenium.dev/documentation/en/](https://www.selenium.dev/documentation/en/)

## WebDriver 驱动

### Elements 元素

#### 选择器

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

  这里要注意的是，如果想要从元素内部查找，xpath 语法是`.//`。

#### Interaction 网页元素交互

目前主要有 3 个交互方法：

- `click()` 点击元素

- `send_keys(*value)` 输入文本

- `clear()` 清空文本（仅仅对于输入框）

如果是 select 元素，可以参考文档：[Select List Elements](https://www.selenium.dev/documentation/webdriver/support_features/select_lists/)

主要交互方法有：

- `select_by_visible_text(text)` 通过可见文本选择

- `select_by_value(value)` 通过值选择

- `select_by_index(index)` 通过索引选择

### Interactions 浏览器交互

#### Windows 窗口

**执行脚本代码**：

可以在选定的框架或窗口的当前上下文中执行 JavaScript 代码片段。

```python
# 清除掉输入框中的文本（clear 不起作用时就可以用这个方法）
driver.execute_script("arguments[0].value = '';", input_element)
```

### Actions 动作链

> 用于模拟了标或者键盘的动作，比如鼠标点击、移动、拖放等操作。

Actions 接口 还提供了对指定输入设备 可以执行的确切操作的精细控制。

动作链（ActionChains）是一种用于模拟用户交互的工具，比如鼠标点击、移动、拖放等操作。它非常强大，但动作链本身并不会自动滚动页面以确保元素可见。它只会按照你指定的操作顺序执行。

比如，要移动鼠标到某个元素上：

```python
from selenium.webdriver.common.action_chains import ActionChains

action = ActionChains(driver)
action.move_to_element(element).perform()
```

**常用方法**：

- `move_to_element(element)` 移动鼠标到某个元素上
- `pause(seconds)` 暂停
- `click()` 单击鼠标左键
- `double_click()` 双击鼠标左键
- `context_click()` 单击鼠标右键
- `drag_and_drop(source, target)` 拖放操作
- `key_down(key)` 按下键盘按键
- `key_up(key)` 释放键盘按键
- `click_and_hold()` 按住鼠标左键
- `release()` 释放鼠标左键

动作链的执行是按照添加的顺序执行的，可以通过`perform()`方法执行。

```python
action.perform()
```

**释放所有的动作**：

驱动程序会记住所有的动作，直到调用`perform()`方法执行。如果要清除所有的动作，可以使用`reset_actions()`方法。

```python
action.reset_actions()
```

### Waits 等待

#### 隐式等待

隐式等待是设置一个**全局**的等待时间，当查找元素时如果没有立即找到，就等待一段时间再查找。

注意：设置为全局的，这意味着你只需要在 WebDriver 实例初始化时设置一次，它会应用到该会话中所有后续的元素查找操作。这个设置会一直有效，直到 WebDriver 会话结束，或者你显式地更改或取消这个等待时间。

```python
driver.implicitly_wait(10)
```

#### 显式等待

显式等待是设置一个等待条件，当条件满足时继续执行，否则等待一段时间再查找。

```python
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

element = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, 'element_id'))
)
```

### Support Features 支持特性

#### Expected Conditions 预期条件

**presence_of_element_located**

等待元素出现在 DOM 中。

这意味着只要元素已经被加载到了 DOM 中，不管它是否可见（例如，它可能被 CSS 隐藏了），该条件就会返回 True。

```python
element = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, 'element_id'))
)
```

**visibility_of_element_located**

等待元素在页面上可见。

这并不意味着元素一定可见，只是它在页面上是可见的（即它的 height 和 width 都大于 0, display 不是 none）。

```python
element = WebDriverWait(driver, 10).until(
    EC.visibility_of_element_located((By.ID, 'element_id'))
)
```

**element_to_be_clickable**

等待元素可被点击。

这意味着元素是可见的，并且它的大小大于 0，即它是可点击的。

```python
element = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.ID, 'element_id'))
)
```

**presence_of_all_elements_located**

等待至少一个元素出现在 DOM 中。

```python
elements = WebDriverWait(driver, 10).until(
    EC.presence_of_all_elements_located((By.CLASS_NAME, 'element_class'))
)
```

### 实践经验和补充

- `ChromeDriver` 并不一定会支持所有的中文字符，如果`send_keys`方法无法输入中文，可以尝试使用`execute_script`方法执行 JavaScript 代码，或者在输入前对内容进行筛选。
