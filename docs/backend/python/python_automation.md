# Python 自动化工具

## 自动化工具推荐

- **pyautogui**: 一个用于自动化鼠标和键盘的 Python 库，支持跨平台

  支持屏幕截图和图像识别，可以用于编写自动化测试脚本

- **pygetwindow**: 一个用于获取窗口信息的 Python 库

  可以用于获取窗口的位置、大小等信息，结合 pyautogui 可以实现窗口操作

- **pynput**: 一个用于监听鼠标和键盘事件的 Python 库

  可以用于编写键盘和鼠标的监听程序，如记录按键、鼠标点击等

- **SikuliX**: 一个用于图像识别的自动化工具，支持多种操作系统

  可以用于编写图像识别脚本，实现自动化测试、自动化操作等

- **pywin32**: 一个用于 Windows 系统编程的 Python 库

  可以用于编写 Windows 系统的自动化脚本，如操作注册表、服务等

- **pywinauto**: 一个用于 Windows GUI 自动化测试的 Python 库

  支持控件级别的操作，可以用于模拟用户在 Windows 程序中的操作

- **pyobjc**: 一个用于 Mac OS X 程序开发的 Python 库

  可以用于编写 Mac OS X 程序的自动化脚本，如操作窗口、应用等

- **selenium**: 一个用于 Web 自动化测试的 Python 库，支持多种浏览器

  具体使用方法可以参考 [Selenium](./python_selenium)

## pyautogui

> 文档：[pyautogui](https://pyautogui.readthedocs.io/en/latest/)
>
> 安装方法：`pip install pyautogui`
>
> 如果需要处理图像，需要安装 `Pillow` 模块：`pip install pillow`
>
> 如果需要使用 `locateOnScreen` 方法，需要安装 `opencv-python` 模块：`pip install opencv-python`

### 基础操作

- `pyautogui.PAUSE = 2.5`: 设置每个动作的延迟时间

- `pyautogui.size()`: 获取屏幕的宽高，返回一个元组 (width, height)

- `pyautogui.onScreen(x, y)`: 判断坐标是否在屏幕内

- `pyautogui.FAILSAFE = True`: 启用安全模式，当鼠标移动到屏幕左上角时停止程序

  会抛出 `pyautogui.FailSafeException` 异常

### 鼠标操作

- `pyautogui.position()`: 获取鼠标当前位置，返回一个元组 (x, y)

- `pyautogui.moveTo(x, y, duration=0.25)`: 将鼠标移动到指定位置

  `duration` 参数表示移动的时间，单位为秒，如果为 0 则立即移动。

  **注意**: 在 Mac 上拖动窗口时不能立即移动，需要设置一个较小的 `duration`。

- `pyautogui.moveRel(xOffset, yOffset, duration=0.25)`: 将鼠标相对移动指定距离

### 键盘操作

- `pyautogui.write('Hello world!', interval=0.25)`: 模拟键盘输入

  `interval` 参数表示每个字符输入的间隔时间，单位为秒

- `pyautogui.press('enter')`: 模拟按下一个键

### 屏幕操作

- `pyautogui.locateOnScreen(image_path, confidence=0.9, grayscale=False)`: 在屏幕上查找图像

  `confidence` 参数表示查找的相似度，范围为 0~1，默认为 0.9（如果使用 confidence，要求安装 `opencv-python`）

  `grayscale` 参数表示是否使用灰度图像查找，默认为 False

- `pyautogui.screenshot('screenshot.png')`: 截屏并保存为图片(返回值为 `PIL.Image` 对象，可以再使用 `img.save('screenshot.png')` 保存为图片)

  或者使用 `pyautogui.screenshot(region=(x, y, width, height))` 截取指定区域

## PyObjC

> 文档：[PyObjC](https://pypi.org/project/pyobjc/)
>
> 安装方法：`pip install pyobjc`

`pyobjc` 是一个用于 Mac OS X 程序开发的 Python 库，它是一个 Python 桥接库，可以让 Python 调用 macOS 的 Objective-C API，如 `Quartz`、`AppKit` 等。

### Quartz

`Quartz` 是 Mac OS X 的图形框架，提供了一系列用于图形操作的 API。

### AppKit

`AppKit` 是 Mac OS X 的应用框架，提供了一系列用于应用开发的 API。

#### NSScreen

`NSScreen` 是 Mac OS X 的屏幕类，提供了一系列用于屏幕操作的 API。

- `NSScreen.mainScreen()`: 获取主屏幕的信息

  `NSScreen.mainScreen().backingScaleFactor()` 获取主屏幕的缩放比例（Retina 屏幕）

  `NSScreen.mainScreen().frame()` 获取主屏幕的尺寸

- `NSScreen.screens()`: 获取所有屏幕的信息
