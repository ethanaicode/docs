# Python Modules

这里收集了一些常用的 Python 模块，以及它们的简单介绍和使用方法。

- **urllib**: Python 内置的 HTTP 请求库。

  `urllib.request` 用于发送网络请求和处理响应。

  `urllib.error` 用于处理 `urllib.request` 中出现的错误。

  `urllib.parse` 用于解析和构建 URL。

  `urllib.robotparser` 用于解析 `robots.txt` 文件。

- **os**: Python 内置的操作系统接口模块。

  `os.path` 用于处理文件路径。

  `os.environ` 用于获取和设置环境变量。

  `os.system` 用于执行系统命令。

- **sys**: Python 内置的系统相关模块。

  `sys.argv` 用于获取命令行参数。

  `sys.path` 用于设置 Python 模块的搜索路径。

  `sys.stdin`、`sys.stdout` 和 `sys.stderr` 用于标准输入、输出和错误流。

- **re**: Python 内置的正则表达式模块。

  `re.match` 用于从字符串的起始位置匹配模式。

  `re.search` 用于在字符串中搜索匹配模式。

  `re.findall` 用于在字符串中找到所有匹配模式。

  `re.sub` 用于替换字符串中的匹配项。

- **pdb**: Python 内置的调试器模块。

- **gc**: Python 内置的垃圾回收模块。

### pdb 调试器

Python 内置了一个调试器模块 `pdb`，可以用于在代码中设置断点、单步执行、查看变量等操作。

**使用方法**

在代码中插入 `pdb.set_trace()` 语句，然后运行程序，当程序执行到这一行时，会进入调试模式。

在调试模式下，你可以查看变量的值，单步执行代码，设置断点等。

```python
import pdb

def example_function(x):
    y = x * 2
    pdb.set_trace()  # 设置断点
    z = y + 10
    return z

example_function(5)
```

**启动调试器**

你也可以在程序运行时通过命令行参数启动调试器：

```bash
python -m pdb script.py
```

**常用的调试命令**

进入调试模式后，你可以使用以下命令来控制程序的执行和检查状态：

- `n`（next）：执行当前行并停在下一行。
- `s`（step）：进入当前行调用的函数内。
- `c`（continue）：继续执行程序，直到下一个断点或程序结束。
- `q`（quit）：退出调试器，终止程序执行。
- `p`（print）：打印一个变量的值。例如，`p x` 会打印变量 `x` 的值。
- `l`（list）：列出当前代码的上下文。你可以通过 `l` 命令查看当前行附近的代码。
- `b`（break）：设置一个断点。例如，`b 10` 会在第 10 行设置一个断点。
- `cl`（clear）：清除断点。例如，`cl 10` 会清除第 10 行的断点。

### gc 垃圾回收

Python 内置了一个垃圾回收模块 `gc`，可以用于手动触发垃圾回收。

**使用方法**

```python
import gc

# 手动触发垃圾回收
gc.collect()
```

**垃圾回收的代（Generations）**：

Python 的垃圾回收使用了三代策略（generational approach），即将对象分为三代，每代有不同的垃圾回收策略。`gc`模块可以控制这些代的垃圾回收行为。

- 第 0 代：包含新创建的对象，这些对象很快就会被回收。

- 第 1 代：包含存活时间较长的对象。

- 第 2 代：包含存活时间最长的对象。

**主要功能**

1. 手动触发垃圾回收：

   `gc.collect(generation=0, *, flags=0)`：手动触发垃圾回收，可以指定要回收的代（generation）或使用不同的标志（flags）。

2. 查看垃圾回收统计信息：

   `gc.get_stats()`：获取垃圾回收的统计信息，包括各代的回收次数和已回收的对象数量。

3. 控制垃圾回收的开关：

   `gc.enable()`：启用垃圾回收。
   `gc.disable()`：禁用垃圾回收。

4. 查看当前的垃圾回收设置：

   `gc.get_stats()`：获取当前垃圾回收的配置和状态。

5. 调试和分析内存泄漏：

   `gc.get_count()`：获取当前的垃圾回收计数，返回一个包含每代垃圾回收计数的元组。
   `gc.get_objects()`：获取当前所有被追踪的对象，主要用于调试和分析内存使用情况。
