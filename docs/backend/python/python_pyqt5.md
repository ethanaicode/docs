# PyQt5

PyQt5 是一个用于创建桌面应用程序的 Python 模块。它是 Qt 库的 Python 绑定，用于创建图形用户界面。

## 组件

### Qt Weidget

在 Qt 中，所有用户界面元素都是 QWidget 的子类。QWidget 是一个基本的用户界面类，它提供了一些基本的功能，如绘制、事件处理、布局等。

可以把它理解为 html 中的 div，是一个容器，可以包含其他的控件。

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

### app.exec\_()

`app.exec_()` 是 PyQt5 应用程序的主事件循环。它会一直运行，直到应用程序被关闭。在这个事件循环中，PyQt5 会监听用户的输入、处理事件、更新界面等操作。

#### 事件循环

- **事件驱动编程**：PyQt5 是基于事件驱动的编程模式，这意味着程序的流程主要由用户事件（如鼠标点击、按键事件）或系统事件（如窗口调整、定时器触发）来控制。
- **事件循环**：`app.exec_()` 启动了一个无限循环，等待并分派这些事件。在这个循环内，应用程序持续监视用户的操作和其他事件源，并相应地触发处理程序（event handlers）。

#### 方法的角色和功能

- **开始处理事件**：调用 `app.exec_()` 后，PyQt5 应用程序开始响应用户输入和其他事件。如果没有这个调用，应用程序会立即启动并关闭，因为没有进入事件监听状态。
- **阻塞调用**：`app.exec_()` 是一个阻塞调用，这意味着它会阻塞调用它的线程直到事件循环结束。事件循环通常在主窗口关闭时结束，此时 `app.exec_()` 返回。

#### 控制流

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
