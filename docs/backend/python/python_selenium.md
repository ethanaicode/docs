# Selenium

> 官方文档：[https://www.selenium.dev/documentation/en/](https://www.selenium.dev/documentation/en/)
>
> chromium 下载地址：[https://chromium.woolyss.com/](https://chromium.woolyss.com/)
>
> Chromium 官方下载：[https://www.chromium.org/](https://www.chromium.org/getting-involved/download-chromium/)
>
> ChromeDriver 全版本 列表：[chrome-for-testing/files](https://googlechromelabs.github.io/chrome-for-testing/files)
>
> ChromeDriver 全版本 json：[Known Good Version](https://googlechromelabs.github.io/chrome-for-testing/known-good-versions-with-downloads.json)
>
> 上面两个地址都包含 ChromeDriver 和 Chrome，下载时需要注意区分。

## WebDriver 驱动

### Elements 元素

#### Locators 定位器

定位器是用于定位元素的方法，主要有以下几种：

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

#### Finders 查找元素

查找元素需要配合之前的定位器，主要有以下几种方法：

- `find_element(by, value)` 查找单个元素（如果有多个匹配，返回第一个）

- `find_elements(by, value)` 查找多个元素

  这是一个列表，如果没有匹配的元素，返回一个空列表。

  由于它没找到元素时不会抛出异常，所以可以用来判断元素是否存在，非常方便。

- `shadow_host.shadow.root` 查找 Shadow DOM 元素（该方法要求 Selenium 4.0+）

  通过`shadow_host.shadow.root`可以获取 Shadow DOM 的根节点，然后再通过`find_element`方法查找元素。

  `shadow_host` 是 Shadow DOM 的宿主元素，需要先通过`find_element`方法找到宿主元素

  _实测找到根节点后，不能直接使用 By.XPATH 查找宿主元素，会报错误的 locator ，不知道是不是存在 BUG，可以使用 By.CSS_SELECTOR_

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

#### 获取元素信息及属性

**获取元素文本**

可以通过`text`属性获取元素的文本内容。

```python
element.text
```

**获取元素属性**

可以通过`get_attribute`方法获取元素的属性。

```python
element.get_attribute('attribute_name')
```

常用的属性名包括：

- `outerHTML` 获取元素的 HTML 内容

- `value` 获取输入框的值

- `href` 获取链接的地址

- `src` 获取图片的地址

**是否被选中**

对于 checkbox 和 radio 元素，可以通过`is_selected`属性判断是否被选中。

```python
element.is_selected()
```

**是否显示**

可以通过`is_displayed`属性判断元素是否显示。

比如当我同时获得多个弹窗元素，我只想对显示的弹窗进行操作，就可以使用这个属性。

```python
popups = driver.find_elements(By.CLASS_NAME, 'popup')
for popup in popups:
  if popup.is_displayed():
    popup.click()
```

### Interactions 浏览器交互

#### Cookies

- `get_cookies()` 获取所有的 cookies

- `get_cookie(name)` 获取指定名称的 cookie

- `add_cookie(cookie_dict)` 添加 cookie

- `delete_cookie(name)` 删除指定名称的 cookie

- `delete_all_cookies()` 删除所有的 cookies

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
- `move_by_offset(x, y)` 鼠标移动到相对当前位置的坐标
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

#### 键盘

**键盘操作**：

可以通过`send_keys`方法模拟键盘输入。

```python
element.send_keys('text')
```

**键盘事件**：

可以通过`send_keys`方法模拟键盘事件。

```python
from selenium.webdriver.common.keys import Keys

element.send_keys(Keys.ENTER)
```

还可以组合键盘事件，比如`Ctrl+A`全选：

```python
element.send_keys(Keys.CONTROL + 'a')
element.send_keys(Keys.BACKSPACE)
```

### Waits 等待

#### 隐式等待 implicitly_wait

隐式等待是设置一个**全局**的等待时间，当查找元素时如果没有立即找到，就等待一段时间再查找。

注意：设置为全局的，这意味着你只需要在 WebDriver 实例初始化时设置一次，它会应用到该会话中所有后续的元素查找操作。这个设置会一直有效，直到 WebDriver 会话结束，或者你显式地更改或取消这个等待时间。

```python
driver.implicitly_wait(10)
```

#### 显式等待 WebDriverWait

显式等待是设置一个等待条件，当条件满足时继续执行，否则等待一段时间再查找。

```python
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

element = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, 'element_id'))
)
```

#### 设置等待的注意事项

- **不要混合使用显式等待和隐式等待这可能会导致意外的等待时间。**

  实测如果设置了隐式等待 5 秒，再设置显式等待 1 秒，那么实际上显式等待会变成 6 秒。

  可以通过`driver.implicitly_wait(0)`取消隐式等待来避免这种情况。

#### Expected Conditions 等待条件

**presence_of_element_located**

等待元素出现在 DOM 中。

当可以匹配到多个数据时，返回第一个匹配的元素。

这意味着只要元素已经被加载到了 DOM 中，不管它是否可见（例如，它可能被 CSS 隐藏了），该条件就会返回 True。

```python
element = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, 'element_id'))
)
```

**presence_of_all_elements_located**

等待至少一个元素出现在 DOM 中。

当可以匹配到多个数据时，返回所有匹配的元素，这是它和`presence_of_element_located`的区别。

```python
elements = WebDriverWait(driver, 10).until(
    EC.presence_of_all_elements_located((By.CLASS_NAME, 'element_class'))
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

## Exceptions 异常

异常都可以通过`from selenium.common.exceptions import *`导入。

### WebDriverException

`WebDriverException` 是 Selenium 的基本异常类，它是所有 Selenium 异常的基类。

### TimeoutException

当设置的等待时间超时时，会抛出`TimeoutException`异常。

不管是隐式等待还是显式等待，只要等待时间超过了设置的时间，就会抛出这个异常。

```python
from selenium.common.exceptions import TimeoutException

try:
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, 'element_id'))
    )
except TimeoutException:
    print('等待超时')
```

### NoSuchElementException

当查找元素时没有找到元素，会抛出`NoSuchElementException`异常。

```python
from selenium.common.exceptions import NoSuchElementException

try:
    element = driver.find_element(By.ID, 'element_id')
except NoSuchElementException:
    print('元素未找到')
```

### ElementClickInterceptedException

这个错误发生在当尝试点击元素，元素被其他元素遮挡时。

在 Selenium 点击元素前，会先检查元素是否可见，是否被遮挡，能否被点击。

如果元素被遮挡，会抛出`ElementClickInterceptedException`异常。

```python
from selenium.common.exceptions import ElementClickInterceptedException

try:
    element.click()
except ElementClickInterceptedException:
    print('元素被遮挡')
```

**如何解决**：

用显式等待等待元素可被点击。

```python
element = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.ID, 'element_id'))
)
```

### ElementNotInteractableException

当元素不可交互时，会抛出`ElementNotInteractableException`异常。

这通常发生在元素被隐藏或者被禁用时。

```python
from selenium.common.exceptions import ElementNotInteractableException

try:
    element.click()
except ElementNotInteractableException:
    print('元素不可交互')
```

### StaleElementReferenceException

当元素已经不再附加到 DOM 上时，会抛出`StaleElementReferenceException`异常。

这通常发生在元素被删除或者页面被刷新后。

```python
from selenium.common.exceptions import StaleElementReferenceException

try:
    element.click()
except StaleElementReferenceException:
    print('元素已经不再附加到 DOM 上')
```

### InvalidSessionIdException

当会话 ID 无效时，会抛出`InvalidSessionIdException`异常。

这通常发生在你试图关闭或者切换到一个无效的会话时。

```python
from selenium.common.exceptions import InvalidSessionIdException

try:
    driver.close()
except InvalidSessionIdException:
    print('会话 ID 无效')
```

## webdriver-manager

`webdriver-manager` 是一个用于管理 WebDriver 驱动的工具，可以自动下载和更新 WebDriver 驱动。

**安装：**

```bash
pip install webdriver-manager
```

**使用：**

```python
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

driver = webdriver.Chrome(ChromeDriverManager().install())
```

- `ChromeDriverManager().install()` 会自动下载 ChromeDriver，并返回 ChromeDriver 的路径。

### Configuration 配置

`webdriver-manager` 支持一些配置，可以通过传入参数进行配置。

**参数：**

- `url` 驱动下载地址，默认为 ChromeDriver 下载地址，可以自定义国内镜像地址。

  例：`driver_path = ChromeDriverManager(url='https://registry.npmmirror.com/binary.html?path=chrome-for-testing/').install()`

- `driver_version` 驱动版本，默认为最新版本。

  例：`driver_path = ChromeDriverManager(driver_version='2.46').install()`

- `cache_valid_range` 缓存有效时间，默认为 1 天。

  ```python
  from webdriver_manager.chrome import ChromeDriverManager
  from webdriver_manager.core.driver_cache import DriverCacheManager

  ChromeDriverManager("2.26", cache_manager=DriverCacheManager(valid_range=1)).install()
  ```

- `WDM_LOCAL` 下载位置，默认为用户主目录下的`.wdm`文件夹。

  如果需要修改可以：`os.environ['WDM_LOCAL'] = '1'`

- `WDM_SSL_VERIFY` 是否验证 SSL 证书，默认为 True。

  如果需要修改可以：`os.environ['WDM_SSL_VERIFY'] = '0'`

### 更多自定义设置

**自定义日志记录器**：

```python
import logging
from webdriver_manager.core.logger import set_logger

logger = logging.getLogger("custom_logger")
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler())
logger.addHandler(logging.FileHandler("custom.log"))

set_logger(logger)
```

### 源码解读分析

**目录结构**

- 在 webdriver_manager 根目录下放着的是各个浏览器的驱动管理器，比如 chrome.py、firefox.py 等。

  这些驱动管理器都继承自 `core/manager.py` 中的 `DriverManager`类。

  驱动管理器用于暴露一些方法，比如 `install` 方法用于下载驱动，`get_os_type` 用于获取操作系统类型等。

- 在 core 目录下，存放着核心类，包括 download_manager.py、file_manager.py 等。

  - `download_manager.py` 下载管理器抽象类

  - `http.py` HTTP 下载客户端，默认的下载管理器实现，如果出现网络问题，可以自定义下载管理器。

- 在 drivers 目录下，存放着各个浏览器的驱动管理实现，比如 chrome.py、firefox.py 等。

  它们都是继承自 `core/driver.py` 中的 `Driver` 类。

  驱动管理类为具体的驱动提供了一些方法，比如 `get_latest_release_version` 方法用于获取最新版本，`get_url_for_version_and_platform` 方法用于获取下载地址等。

**ChromeDriver 类**

文件位于：`drivers/chrome.py`，在这个文件中，可以了解 `ChromeDriver` 是如何被实现下载的。

- `get_driver_download_url` 方法用于获取 ChromeDriver 的下载地址。

  阅读源码发现，如果 Chrome 浏览器版本大于 115，会使用 `self.get_url_for_version_and_platform` 方法获取下载地址。

  这个时候及时传进来 url 参数，也不会生效，而是直接使用了默认的下载地址。: \(

  _猜测因为 115 版本前后的 url 地址是不同的，无法用同一个参数来控制，所以旧的 url 参数在这里就不生效了_

- 可以重写一个 ChromeDriverManager 类，然后重写 get_driver_download_url 方法，来实现自定义下载地址。

## 实践经验和补充

- `ChromeDriver` 并不一定会支持所有的中文字符，如果`send_keys`方法无法输入中文，可以尝试使用`execute_script`方法执行 JavaScript 代码，或者在输入前对内容进行筛选。

- 如果不希望报错，可以使用`find_elements`方法，如果没有匹配的元素，它会返回一个空列表。
