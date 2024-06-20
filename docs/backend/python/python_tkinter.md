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

`ttk` 模块提供了一组更现代化的控件，它们看起来更好，功能也更强大，它在 TK 8.5 版本中引入。
