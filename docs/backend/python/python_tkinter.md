# Tkinter

> 官方文档：[https://docs.python.org/3/library/tkinter.html](https://docs.python.org/3/library/tkinter.html)
>
> TkDocs：[https://tkdocs.com/tutorial/index.html](https://tkdocs.com/tutorial/index.html)

## 基础知识

`tkinter` 是 `Tk` GUI 工具包的 Python 接口，`Tk` 是一个图形工具包，最初由 Tcl 语言开发。

**Tkinter 如何封装 Tcl/Tk**

当你的应用程序使用 Tkinter 的类和方法时，Tkinter 内部会组装表示 Tcl/Tk 命令的字符串，并在附加到应用程序的 Tk 实例的 Tcl 解释器中执行这些命令。

**如何知道控件（widget）的方法和选项**

你可以调用控件的 `configure()` 方法，它会返回一个字典，包含了组件的所有选项和值。使用 `keys()` 方法可以查看所有选项的名称。

```python
btn = ttk.Button(frm, ...)
print(btn.configure().keys())
```

你可以用 `dir()` 函数来查看控件的所有方法。

```python
print(dir(btn))
```

大部分空间有共同的配置选项，如 `background`, `foreground`, `font`, `cursor` 等。你可以使用下面方法找到特定于某个控件的选项：

```python
print(set(dir(btn)) - set(dir(frm)))
```

## Tkinter 模块

我们常用到的主要有 tkinter 模块和 tkinter.ttk 模块。

tkinter 包含的模块有:

- **Tkinter**: Tkinter 的主要模块，包含了所有的类，函数和常量。

- **tkinter.colorchooser**: 颜色选择对话框。

- **tkinter.commondialog**: 通用对话框。

- **tkinter.filedialog**: 文件对话框，允许用户选择文件打开或保存。

- **tkinter.font**: 字体管理。

- **tkinter.messagebox**: 消息框。

- **tkinter.scrolledtext**: 滚动文本框。

- **tkinter.simpledialog**: 简单对话框。

- **tkinter.ttx**: 扩展的控件集合，在 TK8.5 之后可用。

## Tkinter Widgets 控件

### Button 按钮

> w = Button ( master, option=value, ... )
>
> 实测 MAC 下按钮的默认样式是平面的，而且没有浮雕效果，也无法设置背景色，只能设置前景色。
>
> （为了效果的一致性，推荐还是用图片来代替）

- `master`: 父容器。

- `text`: 按钮上的文本。

- `command`: 点击按钮时调用的函数。

- `state`: 按钮的状态，可以是 `NORMAL`, `ACTIVE`, `DISABLED`。(ACTIVE 状态是鼠标悬停在按钮上时的状态)

- `relief`: 按钮的样式(浮雕效果)，可以是 `FLAT`, `RAISED`, `SUNKEN`, `GROOVE`, `RIDGE`。

  分别表示：平面、凸起、凹陷、凸起边框、凹陷边框。

- `underline`: 按钮文本中的下划线字符的索引。

### MessageBox 消息框

> messagebox.FunctionName(title, message [, options])

- **FunctionName**: 可以是 `showinfo`, `showwarning`, `showerror`, `askquestion`, `askokcancel`, `askyesno`, `askretrycancel`。

- **title**: 消息框的标题。

- **message**: 消息框的内容。

- **options**: 可选参数。

  - `icon`: 图标类型，

    可以是 `ERROR`, `INFO`, `QUESTION`, `WARNING`。

  - `type`: 消息框类型，

    可以是 `ABORTRETRYIGNORE`, `OK`, `OKCANCEL`, `RETRYCANCEL`, `YESNO`, `YESNOCANCEL`。

  - `default`: 默认按钮，

    可以是 `ABORT`, `RETRY`, `IGNORE`, `OK`, `CANCEL`, `YES`, `NO`.

  - `parent`: 父窗口。

  - `detail`: 详细信息。
