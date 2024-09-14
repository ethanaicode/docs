# PyQt5

PyQt5 是一个用于创建桌面应用程序的 Python 模块。它是 Qt 库的 Python 绑定，用于创建图形用户界面。

## 组件

### Qt Weidget

在 Qt 中，所有用户界面元素都是 QWidget 的子类。QWidget 是一个基本的用户界面类，它提供了一些基本的功能，如绘制、事件处理、布局等。

可以把它理解为 html 中的 div，是一个容器，可以包含其他的控件。

#### 常用的成员方法

- `setWindowTitle()`：设置窗口标题。

- `setGeometry()`：设置窗口的位置和大小。

- `resize()`：设置窗口的大小（宽度和高度）。

- `setFixedSize()`：设置窗口固定大小（窗口大小不可调整）。

- `setStyleSheet()`：设置样式表。

- `setWindowIcon()`：设置窗口图标。

- `setWindowFlags()`：设置窗口属性（如是否显示最大化、最小化按钮）。

- `show()`：显示窗口。

- `close()`：关闭窗口。

- `setLayout()`：设置布局管理器。

### 窗口属性

在 PyQt5 中，窗口的属性可以通过 `setWindowFlags()` 方法来设置。窗口属性可以控制窗口的样式、行为和外观。

### PyQt5 基本组件

PyQt5 提供了一些基本的组件，用于创建用户界面。以下是一些常用的组件：

- **QLabel**：用于显示文本或图像。

- **QPushButton**：用于创建按钮。

- **QLineEdit**：用于输入文本。

- **QCheckBox**：用于创建复选框。

- **QRadioButton**：用于创建单选按钮。

- **QComboBox**：用于创建下拉框。

- **QSlider**：用于创建滑块。

- **QProgressBar**：用于显示进度条。

- **QTextEdit**：用于显示和编辑文本。

- **QListWidget**：用于显示列表。

- **QTableWidget**：用于显示表格。

- **QMenuBar**：用于创建菜单栏。

- **QToolBar**：用于创建工具栏。

### QSpacerItem 空白区域

在 PyQt5 中，`QSpacerItem` 是一个用于创建空白区域的小部件。它可以用来推动其他小部件到布局的一端，或在小部件之间创建空间。

`QSpacerItem` 可以在水平布局和垂直布局中使用，通过设置伸展因子（stretch factor）来控制空白区域的大小。

```python
spacer = QSpacerItem(40, 20, QSizePolicy.Expanding, QSizePolicy.Minimum)
layout.addItem(spacer)
```

- `QSpacerItem(width, height, hPolicy, vPolicy)`：创建一个空白区域，指定宽度、高度和水平、垂直的策略。

- `QSizePolicy.Expanding`：指定空白区域可以扩展，填充剩余空间。

- `QSizePolicy.Minimum`：指定空白区域的最小尺寸。

### QFrame 框架

`QFrame` 是 `QWidget` 的子类，提供了一些额外的功能，如设置边框样式、背景颜色等。

`QFrame` 的属性和方法与 `QWidget` 类似，但它还提供了一些额外的属性，如 `frameShape`、`frameShadow` 等，用于设置边框的形状和阴影效果。

`frameShape` 属性用于设置边框的形状，可以是：

- `QFrame.NoFrame`：无边框。

- `QFrame.Box`：矩形边框。

- `QFrame.Panel`：带有阴影的矩形边框。

- `QFrame.StyledPanel`：带有阴影和样式的矩形边框。

`frameShadow` 属性用于设置边框的阴影效果，可以是：

- `QFrame.Plain`：无阴影。

- `QFrame.Raised`：凸起的阴影。

- `QFrame.Sunken`：凹陷的阴影。

### QLayout 布局管理器

在 PyQt5 中，布局管理器用于自动管理窗口中的小部件的位置和大小。布局管理器可以确保小部件在不同的窗口大小和屏幕分辨率下具有一致的布局。

PyQt5 提供了几种布局管理器，如 `QHBoxLayout`、`QVBoxLayout`、`QGridLayout`、`QFormLayout` 等，用于实现不同的布局方式。

### QPushButton 按钮

`QPushButton` 是 PyQt5 中用于创建按钮的类。按钮是用户界面中常用的交互元素，用于触发操作或执行特定的功能。

`QPushButton` 的构造函数如下：

```python
QPushButton(text, parent)
```

**按钮的方法**

- `setText(text)`：设置按钮的文本。

- `setIcon(icon)`：设置按钮的图标。

- `clicked.connect(slot)`：连接按钮的点击事件到槽函数。

- `setDefault(True)`：设置按钮为默认按钮（Enter 键触发）。

- `setVisible(True)`：显示按钮。

**按钮的信号**

- `clicked`：当按钮被点击时触发。

### QButtonGroup 按钮组

`QButtonGroup` 是 PyQt5 中用于管理按钮组的类。按钮组可以用于管理一组单选按钮或复选框，使它们成为互斥或相关的关系。

**按钮组的方法**

- `addButton(button, id)`：将按钮添加到按钮组，并指定按钮的 ID。

- `buttonClicked.connect(slot)`：连接按钮组的按钮点击事件到槽函数。

- `checkedId()`：获取当前选中按钮的 ID，如果没有选中按钮则返回 -1。

- `checkedButton()`：获取当前选中的按钮。

**使用场景**

- 可以用这个实现 Tab 切换的效果。

### QLabel 标签

`QLabel` 是 PyQt5 中用于显示文本或图像的类。标签是用户界面中常用的显示元素，用于显示静态文本或图像，也可以用来显示 HTML 内容。

`QLabel` 的构造函数如下：

```python
QLabel(text, parent)
```

## 线程和信号

### QThread 线程

在 PyQt5 中，`QThread` 类用于创建线程，可以在后台执行耗时的任务，以避免阻塞主线程。

### QRunnable 接口

`QRunnable` 是一个接口类，用于创建可运行的任务。它是 `QThreadPool` 线程池中任务的基类，可以通过实现 `run()` 方法来定义任务的执行逻辑。

### QThreadPool 线程池

`QThreadPool` 是一个线程池类，用于管理和调度多个线程。它可以在后台执行多个任务，并控制线程的数量和调度方式。

### 线程的实战应用

**QRunnable** 和 **QThreadPool** 的组合使用可以实现多线程任务的并发执行，提高程序的性能和响应速度。

```python
class Worker(QRunnable):
    def __init__(self, data):
        super().__init__()
        self.data = data

    def run(self):
        # 执行耗时任务
        time.sleep(2)
        print(f'Worker: {self.data}')

# 创建线程池
pool = QThreadPool.globalInstance()

# 创建任务并提交到线程池
for i in range(5):
    worker = Worker(i)
    pool.start(worker)
```

### 信号和槽

在 PyQt5 中，信号和槽是一种用于实现事件处理和通信的机制。信号是一种事件，当某个条件满足时发出，槽是一个函数，用于处理信号。

- **信号**：当某个事件发生时，会发出一个信号。信号可以带有参数，用于传递额外的信息。

- **槽**：槽是一个函数，用于处理信号。当信号发出时，与之连接的槽函数会被调用。

- **连接**：通过 `connect()` 方法将信号和槽连接起来，当信号发出时，与之连接的槽函数会被调用。

- **断开连接**：通过 `disconnect()` 方法断开信号和槽的连接。

### 信号和槽的使用

在 PyQt5 中，可以通过 `QObject.connect()` 方法将信号和槽连接起来，当信号发出时，与之连接的槽函数会被调用。

```python
sender.signal.connect(receiver.slot)
```

- `sender`：发送信号的对象。

- `signal`：信号的名称。

- `receiver`：接收信号的对象。

- `slot`：槽函数的名称。

## 知识实践总结

### 布局技巧

在使用 PyQt5 进行页面布局时，掌握一些基本的布局技巧可以帮助你创建更加专业和易用的用户界面。以下是一些实用的布局技巧：

#### 1. 使用布局管理器

PyQt5 提供了几种布局管理器来自动管理窗口中的空间分配和小部件位置，这些包括：

- **QHBoxLayout**：水平布局，按顺序从左到右排列小部件。
- **QVBoxLayout**：垂直布局，按顺序从上到下排列小部件。
- **QGridLayout**：网格布局，可以在表格中定位小部件。
- **QFormLayout**：表单布局，用于排列标签和字段。

使用这些布局管理器可以确保你的应用在不同的屏幕和操作系统上具有良好的外观和一致的行为。

#### 2. 使用弹性空间（Spacer）

- **QSpacerItem** 可以在布局中添加空白区域，用于推动小部件到布局的一端或在小部件之间创建空间。

#### 3. 响应式设计

- 利用布局管理器的特性（如 stretching 和 spacing），确保应用界面能够适应不同的窗口大小。例如，可以设置布局中某些元素的伸展因子，使其在窗口调整大小时获得更多空间。

#### 4. 嵌套布局

- 布局可以嵌套使用，例如，在一个水平布局内部放置几个垂直布局（或反之），以实现更复杂的界面设计。

#### 5. 注意边距和间隙

- 适当使用边距（margin）和间隙（spacing）来确保界面不会显得过于拥挤。可以通过 `setMargin()` 和 `setSpacing()` 方法调整布局管理器的边距和间隙。

#### 6. 对齐和分布

- 考虑小部件的对齐方式，如左对齐、右对齐、居中等，这对于创建直观的布局非常重要。

#### 7. 使用样式表（QStyleSheet）

- PyQt5 支持 CSS 风格的样式表，可以用来精细控制小部件的外观，比如颜色、字体、边框等。

#### 8. 预览和调试布局

- 使用 Qt Designer 工具预览布局效果，这可以帮助你快速迭代和修改设计，而无需多次运行应用程序。

#### 示例代码

这里是一个使用 QVBoxLayout 和 QHBoxLayout 嵌套的简单示例：

```python
from PyQt5.QtWidgets import QApplication, QWidget, QPushButton, QVBoxLayout, QHBoxLayout

def create_window():
    app = QApplication([])
    window = QWidget()
    window.setWindowTitle('PyQt5 布局示例')

    # 主布局
    main_layout = QVBoxLayout()

    # 顶部布局
    top_layout = QHBoxLayout()
    top_layout.addWidget(QPushButton('左侧按钮'))
    top_layout.addWidget(QPushButton('右侧按钮'))

    # 将顶部布局添加到主布局
    main_layout.addLayout(top_layout)

    # 底部按钮
    main_layout.addWidget(QPushButton('底部按钮'))

    window.setLayout(main_layout)
    window.show()
    app.exec_()

create_window()
```

这种方法的组合使用可以创建直观、灵活和响应式的用户界面。

### 实战经验分享

- **border:none 的潜在风险**

  使用样式表时，尽量避免使用 `border: none;` 来隐藏边框，特别是按钮时，可能会导致点击后按钮偏移，如果遇到可以通过渲染后主动点击一次按钮来避免。

- **单选框复选框与图标高度对齐问题**

  如果想要自定义单选按钮或复选框的高度，就需要单独为图标设置高度，否则图标可能还是在默认的高度。图标的高度可以考虑少 2 个像素，这样在视觉上才是对齐的。

  - 单独设置图标的方式是增加 `::indicator` 伪元素选择器，然后设置高度和宽度。

  ```python
  checkbox.setStyleSheet('''
      QCheckBox {
          min-height: 52px;
      }
      QCheckBox::indicator {
          hmin-height: 50px;
      }
  ''')
  ```

- **QFrame 存在默认边框的问题**

  在 Qt Designer 中，QFrame 默认`frameShape` 是 `StyledPanel`，这意味着它会绘制一个带有阴影的矩形边框。如果不需要边框，可以将 `frameShape` 设置为 `NoFrame`。

- **QFrame 的 border-radius 圆角边框不生效的问题**

  如果给 QFrame 设置了固定的高度，再设置圆角边框，有可能会不生效。解决方式是通过 `min-height` 和 `max-height` 来设置，这样圆角边框就会生效。

  猜测原因是高度设置小了，圆角设置大了，当发生冲突时，会以高度为准。

### QFrame 和 QWidget

在 PyQt5 中，选择使用 `QWidget` 或 `QFrame` 主要取决于你是否需要边框或背景。`QFrame` 是 `QWidget` 的子类，提供了额外的功能，如边框和背景样式。

所以当你仅仅需要一个容器来放置其他控件时，可以使用 `QWidget`；当你需要为控件设置边框或特殊背景样式时，可以使用 `QFrame`。

### hide() 和 close()

`close()` 和 `hide()` 方法都用于控制窗口的可见性，但它们的工作方式和用途有所不同：

- `hide()`：窗口被隐藏后仍然存在于内存中，并且可以随时通过 `show()` 方法重新显示。

- `close()`：它会触发一个关闭事件（`closeEvent()`），这个事件可以被重写以执行清理操作或阻止窗口关闭。默认情况下，如果关闭事件没有被阻止，窗口将被关闭并隐藏，但不会从内存中销毁，除非设置了 `Qt.WA_DeleteOnClose` 属性。

**用例对比**：

- 如果你有一个设置窗口或辅助对话框，用户可能频繁打开和关闭，使用 `hide()` 可以快速重新显示窗口，保持之前的状态。
- 对于主窗口或者完成其任务后不再需要的窗口，使用 `close()` 方法可以触发关闭逻辑，如清理资源、保存状态或询问用户是否真的要退出。

### 元素的 hide() 和 setVisible()

在 PyQt5 中，元素的 `hide()` 和 `setVisible()` 方法都可以用于隐藏元素，只是在使用场景上有所不同。

- `hide()` 方法是 `setVisible(False)` 的简写，用于隐藏控件。

- `setVisible(bool)` 方法更通用，因为它允许你根据传递的布尔值来显示或隐藏控件。

### clicked 和 toggled 信号的区别

`QPushButton`、`QCheckBox` 等小部件都有 `clicked` 和 `toggled` 两个信号，这两个信号的区别是：

- `clicked` 信号在用户点击复选框时触发，无论复选框的状态是从未选中到选中，还是从选中到未选中。

- `toggled` 信号在复选框的状态发生变化时触发，即从未选中到选中，或从选中到未选中。

所以如果你需要关心复选框的状态变化，应该使用 `toggled` 信号，而如果只需要在用户点击复选框时触发某个操作，可以使用 `clicked` 信号。

### app.exec\_()

`app.exec_()` 是 PyQt5 应用程序的主事件循环。它会一直运行，直到应用程序被关闭。在这个事件循环中，PyQt5 会监听用户的输入、处理事件、更新界面等操作。

**事件循环**

- **事件驱动编程**：PyQt5 是基于事件驱动的编程模式，这意味着程序的流程主要由用户事件（如鼠标点击、按键事件）或系统事件（如窗口调整、定时器触发）来控制。
- **事件循环**：`app.exec_()` 启动了一个无限循环，等待并分派这些事件。在这个循环内，应用程序持续监视用户的操作和其他事件源，并相应地触发处理程序（event handlers）。

**方法的角色和功能**

- **开始处理事件**：调用 `app.exec_()` 后，PyQt5 应用程序开始响应用户输入和其他事件。如果没有这个调用，应用程序会立即启动并关闭，因为没有进入事件监听状态。
- **阻塞调用**：`app.exec_()` 是一个阻塞调用，这意味着它会阻塞调用它的线程直到事件循环结束。事件循环通常在主窗口关闭时结束，此时 `app.exec_()` 返回。

**控制流**

- **退出机制**：你可以通过调用 `QCoreApplication.quit()` 或关闭所有 GUI 窗口来停止事件循环，使 `app.exec_()` 返回。返回值通常是一个状态码，指示程序是如何结束的。
- **异常处理**：在事件循环中，所有未捕获的异常都会被忽略，不会导致程序崩溃。这意味着如果事件处理函数中出现异常，它应该在函数内部被捕获和处理，否则可能会导致不稳定的行为或潜在的内存泄漏。

## Qt Designer

Qt Designer 是一个用于创建 PyQt5 界面的可视化工具。它允许你通过拖放方式设计界面，然后将其导出为 Python 代码。

### 基础操作

- **布局管理器**：可以选择不同的布局管理器，如水平布局、垂直布局、网格布局等，来自动管理小部件的位置和大小。

- **添加小部件**：从左侧的小部件库中拖放小部件到窗口中，然后调整大小和位置。

- **设置属性**：在右侧的属性编辑器中，可以设置小部件的属性，如名称、文本、大小、位置等。

- **修改样式表**：右键选择编辑样式表，就可以像编辑 `css` 一样，通过样式表编辑器修改小部件的样式，如颜色、字体、边框等。

- **预览和调试**：菜单 → 表格中，可以找到预览功能，可以查看界面的效果，也可以通过连接到 Python 解释器来调试界面。

![Qt Designer](/images/qt_designer_01.jpg)

### pyuic 工具

Qt Designer 生成的 `.ui` 文件可以通过 `pyuic` 工具转换为 Python 代码。`pyuic` 是 PyQt5 提供的一个命令行工具，用于将 `.ui` 文件转换为 Python 代码。

```bash
pyuic5 -x input.ui -o output.py
```

- `-x`：表示生成的 Python 代码中包含 `if __name__ == '__main__':` 代码块，可以直接运行。
- `-o`：指定输出的 Python 文件名。

如果有资源文件（如图片、样式表等），通常是一个 `.qrc` 文件，可以使用 `pyrcc5` 工具将其转换为 Python 代码。

```bash
pyrcc5 -o resources.py resources.qrc
```

然后在生成的 Python 代码中导入这个资源文件：

```python
import resources

# 使用资源文件中的图片
label.setPixmap(QtGui.QPixmap(':/images/icon.png'))
```

这样就可以将 Qt Designer 设计的界面转换为 Python 代码，然后在应用程序中使用。
