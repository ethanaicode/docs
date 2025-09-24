# Python Modules

这里收集了一些常用的 Python 模块，以及它们的简单介绍和使用方法。

## Python 模块

### 模块索引

- **site**: Python 内置的站点配置模块

  可以使用 `python -m site` 命令来查看 Python 的站点配置信息，包括模块搜索路径、用户配置文件等。

- **urllib**: Python 内置的 HTTP 请求库

- **os**: Python 内置的操作系统接口模块

- **sys**: Python 内置的系统相关模块

- **platform**: Python 内置的平台信息模块

- **argparse**: Python 内置的命令行参数解析模块

- **re**: Python 内置的正则表达式模块

- **json**: Python 内置的 JSON 编码和解码模块

  `json.dumps` 用于将 Python 对象编码为 JSON 字符串

  `json.loads` 用于将 JSON 字符串解码为 Python 对象

- **subprocess**: Python 内置的子进程模块

- **threading**: Python 内置的多线程模块

- **pdb**: Python 内置的调试器模块

- **gc**: Python 内置的垃圾回收模块

- **uuid**: Python 内置的 UUID 生成模块

- **datetime**: Python 内置的日期和时间模块

- **shutil**: Python 内置的文件操作模块

- **queue**: Python 内置的队列模块

- **http**: Python 内置的 HTTP 服务器模块

- **logging**: Python 内置的日志模块

- **importlib**: Python 内置的模块导入模块

- **getopt**: Python 内置的命令行参数解析模块

- **sqlite3**: Python 内置的 SQLite 数据库模块

## 模块使用方法

### urllib HTTP 请求处理

Python 内置了一个 HTTP 请求处理模块 `urllib`，可以用于发送 HTTP 请求、处理响应等操作。

**主要类**

- `urllib.request.Request`: HTTP 请求类。

- `urllib.request.urlopen()`: 发送 HTTP 请求。

- `urllib.parse.urlencode()`: 编码 URL 参数。

- `urllib.parse.urlparse()`: 解析 URL。

- `urlib.parse.parse_qs()`: 解析 URL 参数。

- `urllib.parse.quote()`: 编码 URL。

  遵从 RFC 3986 标准，将 URL 中的特殊字符转换为 `%xx` 格式。

- `urllib.parse.unquote()`: 解码 URL。

**使用方法**

```python
import urllib.request

# 发送一个 GET 请求
response = urllib.request.urlopen('https://www.example.com')
print(response.read())
```

**参考案例**

- 解析 URL 及参数

  ```python
  from urllib.parse import urlparse, parse_qs
  
  url = 'https://www.example.com/?name=John&age=30'
  # 解析 URL
  parsed_url = urlparse(url)
  print(parsed_url)
  # 获取参数值
  # 返回的是一个字典，包含参数名和参数值，参数值是一个列表
  query_params = parse_qs(parsed_url.query)
  name = query_params.get('name', [''])[0]
  print(name)
  ```

### os 操作系统接口

Python 内置了一个操作系统接口模块 `os`，可以用于处理文件和目录、执行系统命令等操作。

**主要方法**

- `os.getcwd()`: 获取当前工作目录

- `os.remove()`: 删除文件

- `os.path`: 处理文件路径的模块

  - `os.path.join()`: 拼接文件路径

  - `os.path.dirname()`: 获取文件路径的目录部分

  - `os.path.basename()`: 获取文件路径的文件名部分

  - `os.path.splitext()`: 分割文件路径的扩展名

    返回值是一个元组，包含文件名和扩展名

  - `os.path.exists()`: 判断文件或目录是否存在

  - `os.path.sep`: 获取当前操作系统的路径分隔符

- `os.makedirs()`: 创建目录（可以实现目录不存在，则自动创建）

  例如：`os.makedirs('path/to/dir', exist_ok=True)` 可以创建多级目录，且如果目录已存在不会报错

- `os.startfile()`: 打开文件

- `os.listdir()`: 列出目录下的文件

- `os.environ`: 获取和设置环境变量

- `os.chmod()`: 修改文件权限

### sys 系统相关

Python 内置了一个系统相关模块 `sys`，可以用于获取命令行参数、设置模块搜索路径等操作。

**主要方法**

- `sys.argv`: 获取命令行参数。

  `sys.argv[0]` 是脚本的名称，`sys.argv[1:]` 是命令行参数。

- `sys.path`: 获取模块搜索路径。

- `sys.version`: 获取 Python 版本。

- `sys.stdin`: 标准输入。

- `sys.stdout`: 标准输出。

- `sys.stderr`: 标准错误。

- `sys.executable`: 获取 Python 解释器的路径。

- `sys.platform`: 获取当前操作系统的名称。

  `darwin` = macOS，`win32` = Windows，`linux` = Linux。

### platform 平台信息

Python 内置了一个平台信息模块 `platform`，可以用于获取系统和硬件信息。

**主要方法**

- `platform.system()`: 获取当前操作系统的名称。

  `Windows`, `Darwin`, `Linux`, `Java` 等。

- `platform.release()`: 获取当前操作系统的发行版本。

  在 Windows 上返回 Windows 版本号，如 `10`.

  在 macOS 上返回 macOS 版本号，如 `20.3.0`.

- `platform.version()`: 获取当前操作系统的版本。

  在 Windows 上返回 Windows 版本号，如 `10.0.19041`.

  在 macOS 上返回 macOS 版本号，如 `Darwin Kernel Version 20.3.0`.

- `platform.machine()`: 获取当前硬件架构。

  `AMD64`, `x86_64`, `arm64` 等。

- `platform.processor()`: 获取当前处理器信息。

  `Intel64 Family 6 Model 142 Stepping 10, GenuineIntel`.

- `platform.mac_ver()`: 获取 macOS 版本信息。

  返回一个元组，包含 macOS 版本号和版本名称。如 `('11.2.3', ('', '', ''))`.

- `platform.win32_ver()`: 获取 Windows 版本信息。

  返回一个元组，包含 Windows 版本号、版本名称和服务包信息。如 `('10', '10.0.19041', 'SP0')`.

### argparse 命令行参数解析

`argparse` 是 Python 内置的命令行参数解析库，用于让程序支持命令行调用时传入参数。

它可以自动生成帮助文档 (`-h/--help`)，支持多种参数类型（必选、可选、布尔开关等），自动进行类型检查和错误提示。

**主要方法**

- `argparse.ArgumentParser()`: 创建解析器对象。

- `parser.add_argument()`: <u>添加命令行参数</u>及其选项。

- `parser.parse_args()`: <u>解析命令行参数</u>，返回 `Namespace` 对象。

- `parser.print_help()`: 打印帮助信息。

- `parser.set_defaults()`: 设置参数的默认值。

- `parser.add_subparsers()`: 添加子命令解析器（适合多命令工具，如 git 的子命令）。

- `parser.error()`: 在解析出错时输出自定义错误信息。

**常见参数选项**

在添加命令行参数时，支持多个选项，包括：

- `name or flags`: 参数名称，如 `"input"` 或 `"-i", "--input"`。

- `help`: 参数说明，会显示在 `--help` 中。

- `default`: 设置默认值。

- `required`: 是否必须传入（通常用于可选参数）。

- `type`: 指定参数类型（如 `int`, `float`, `str`）。

- `choices`: 限定参数取值范围。

- `nargs`: 指定参数接收的数量（如 `"?"`, `"*"`, `"+"`, 或整数）。

- `action`: 定义参数行为，常见有：
  - `store`: 默认，存储值。
  - `store_true`: 出现参数时为 `True`。
  - `store_false`: 出现参数时为 `False`。
  - `append`: 多次使用时将值追加到列表。

**使用案例**

1. 带可选参数

   ```python
   parser = argparse.ArgumentParser(description="批量处理文件")
   parser.add_argument("filename", help="要处理的文件")
   parser.add_argument("-o", "--output", default="result.txt", help="输出文件")
   args = parser.parse_args()
   
   print(f"输入文件: {args.filename}, 输出文件: {args.output}")
   
   # python script.py data.txt --output processed.txt
   ```

2. 使用布尔开关

   ```python
   parser = argparse.ArgumentParser()
   parser.add_argument("--debug", action="store_true", help="是否启用调试模式")
   args = parser.parse_args()
   
   if args.debug:
       print("调试模式已开启")
       
   # python script.py --debug
   ```

3. 多个值 (nargs)

   ```python
   parser = argparse.ArgumentParser()
   parser.add_argument("numbers", nargs="+", type=int, help="一组整数")
   args = parser.parse_args()
   
   print(sum(args.numbers))
   
   # python script.py 1 2 3 4
   ```

4. 子命令

   ```python
   parser = argparse.ArgumentParser()
   subparsers = parser.add_subparsers(dest="command")
   
   # 子命令 add
   parser_add = subparsers.add_parser("add")
   parser_add.add_argument("x", type=int)
   parser_add.add_argument("y", type=int)
   
   # 子命令 sub
   parser_sub = subparsers.add_parser("sub")
   parser_sub.add_argument("x", type=int)
   parser_sub.add_argument("y", type=int)
   
   args = parser.parse_args()
   
   if args.command == "add":
       print(args.x + args.y)
   elif args.command == "sub":
       print(args.x - args.y)
   
   # python script.py add 3 5   # 输出 8
   # python script.py sub 9 4   # 输出 5
   ```

### re 正则表达式

Python 内置了一个正则表达式模块 `re`，可以用于处理字符串匹配和替换等操作。

**主要方法**

- `re.match()`: 从字符串的开头匹配模式。

- `re.search()`: 在字符串中搜索模式。

  search() 方法会扫描整个字符串，然后返回第一个匹配的结果。

- `re.findall()`: 查找字符串中所有匹配的模式。

  返回一个列表，包含所有匹配的结果。

- `re.sub()`: 替换字符串中的匹配项。

  共有四个参数：`pattern`, `repl`, `string`, `count`。

  `pattern` 是要匹配的正则表达式

  `repl` 是要替换的字符串

  `string` 是要处理的字符串

  `count` 是替换的次数，默认为 0，表示替换所有匹配项。

- `re.split()`: 按照模式分割字符串。

- `re.compile()`: 编译正则表达式。

**获取匹配结果**

正则表达式的匹配结果是一个 `Match` 对象，可以通过这个对象来获取匹配的字符串、位置等信息。

- `.group()`: 获取匹配的字符串。

- `.start()`: 获取匹配的开始位置。

- `.end()`: 获取匹配的结束位置。

- `.span()`: 获取匹配的开始和结束位置。

### shutil 文件操作

Python 内置了一个文件操作模块 `shutil`，可以用于复制、移动、删除文件等操作。

**主要方法**

- `shutil.copy()`: 复制文件。

- `shutil.move()`: 移动文件。

- `shutil.rmtree()`: 递归删除目录（包括目录下的所有文件和子目录）。

### subprocess 子进程

Python 内置了一个子进程模块 `subprocess`，可以用于创建和管理子进程。

**主要方法**

- `subprocess.run()`: 运行一个命令。

- `subprocess.Popen()`: 创建一个子进程。

- `subprocess.call()`: 运行一个命令并等待其完成。

### threading 多线程

Python 内置了一个多线程模块 `threading`，可以用于创建和管理线程。

**主要类**

- `threading.Thread`: 线程类，用于创建线程。

- `threading.Lock`: 锁类，用于线程同步。

- `threading.Event`: 事件类，用于线程通信。

**使用方法**

```python
import threading
import time

def worker():
    print(f'{threading.current_thread().name} is working')
    time.sleep(1)
    print(f'{threading.current_thread().name} is done')

for _ in range(5):
    # 创建线程
    t = threading.Thread(target=worker)
    # 给每个线程起一个名字
    t.name = 'Thread-' + str(_)
    t.start()
```

### datetime 日期和时间

Python 内置了一个日期和时间模块 `datetime`，可以用于处理日期和时间。

**主要类**

> 这些类都需要从 `datetime` 模块中导入。
>
> 如： from datetime import datetime, timedelta

- `datetime`: 表示日期和时间的类。

  可以直接传参来创建一个日期和时间对象。如：`datetime(2022, 1, 1)`表示 2022 年 1 月 1 日 零点。

  `now()` 获取当前日期和时间。

  `date()` 获取日期部分。

  `time()` 获取时间部分。

  `replace()` 替换日期和时间的部分字段。如：`replace(year=2022, month=1, day=1)`。

  `strftime()` 格式化日期和时间为字符串。如：`strftime('%Y-%m-%d %H:%M:%S')`。

- `timedelta`: 表示时间间隔的类。常用于对时间进行加减。

  `timedelta(days=1)` 表示一天的时间间隔。还支持其他参数，如：`seconds`, `minutes`, `hours`, `weeks`。

  如果想表示一天后可以这样：`datetime.now() + timedelta(days=1)`。

- `date`: 表示日期的类。

- `time`: 表示时间的类。

- `timezone`: 表示时区的类。

**使用方法**

```python
from datetime import datetime

# 获取当前日期和时间
now = datetime.now()
# 转换为字符串
now_str = now.strftime('%Y-%m-%d %H:%M:%S')
print(now_str)
```

### queue 队列

Python 内置了一个队列模块 `queue`，可以用于实现线程安全的队列。

**主要类**

- `queue.Queue`: 普通队列，先进先出。

- `queue.LifoQueue`: 栈，后进先出。

- `queue.PriorityQueue`: 优先级队列，按优先级顺序出队。

**使用方法**

```python
import queue

# 创建一个队列
q = queue.PriorityQueue()

# 向队列中添加元素
q.put((1, 'A'))

# 从队列中取出元素
_, item = q.get()

print(item)
```

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

   `gc.collect(generation=0, *, flags=0)`: 手动触发垃圾回收，可以指定要回收的代（generation）或使用不同的标志（flags）。

2. 查看垃圾回收统计信息：

   `gc.get_stats()`: 获取垃圾回收的统计信息，包括各代的回收次数和已回收的对象数量。

3. 控制垃圾回收的开关：

   `gc.enable()`: 启用垃圾回收。
   `gc.disable()`: 禁用垃圾回收。

4. 查看当前的垃圾回收设置：

   `gc.get_stats()`: 获取当前垃圾回收的配置和状态。

5. 调试和分析内存泄漏：

   `gc.get_count()`: 获取当前的垃圾回收计数，返回一个包含每代垃圾回收计数的元组。
   `gc.get_objects()`: 获取当前所有被追踪的对象，主要用于调试和分析内存使用情况。

### uuid

Python 内置了一个 UUID 生成模块 `uuid`，可以用于生成 UUID（Universally Unique Identifier）。

**主要方法**

- `uuid.uuid1()`: 基于主机的 MAC 地址和当前时间戳生成 UUID。

- `uuid.uuid3(namespace, name)`: 基于名字的 MD5 散列值生成 UUID。

- `uuid.uuid4()`: 随机生成 UUID。

- `uuid.uuid5(namespace, name)`: 基于名字的 SHA-1 散列值生成 UUID。

**使用方法**

```python
import uuid

# 生成一个随机的 UUID
uuid_obj = uuid.uuid4()
print(uuid_obj)
```

### http 服务模块

Python 内置了一个 HTTP 服务模块 `http`，可以用于创建简单的 HTTP 服务器。

**主要类**

- `http.server.HTTPServer`: HTTP 服务器类。

- `http.server.BaseHTTPRequestHandler`: HTTP 请求处理类。

**命令行使用方法**

你可以通过命令行启动一个简单的 HTTP 服务器：

```bash
python -m http.server <port>
```

### logging 日志模块

> @2024-11-25 本部分的内容已合并到 [Python-的日志处理](./python_advanced#python-的日志处理)

### importlib 模块导入

Python 内置了一个模块导入模块 `importlib`，可以用于动态导入模块。

**主要方法**

- `importlib.import_module()`: 动态导入模块。

  可以用来实现插件系统、动态加载模块、延迟加载等功能。

- `importlib.reload()`: 重新加载模块。

  它的主要作用是在程序运行时重新加载某个模块，以便在修改代码后不需要重新启动整个程序，就可以看到新代码的效果。

  它只能重新加载已导入的模块，且不会重置模块的状态，只是重新执行模块的代码。

**使用方法**

```python

import importlib

module_name = 'math'  # 可以根据用户输入或配置动态指定
module = importlib.import_module(module_name)

print(module.sqrt(16))
```

### getopt 命令行参数解析

Python 内置了一个命令行参数解析模块 `getopt`，可以用于解析命令行参数。

**主要方法**

- `getopt.getopt(argv, shortopts, longopts=[])`: 解析命令行参数。

  返回一个元组，包含两个元素：`opts` 和 `args`。

  `opts` 是一个列表，列表中的元素是一个元组，包含解析出的选项和参数。

  `args` 是一个列表，包含解析出的参数。

  - `argv`: 命令行参数列表。

  - `shortopts`: 短选项字符串，如：`'hvo:'`。`:` 表示该选项需要一个参数。

  - `longopts`: 长选项列表，如：`['help', 'version', 'output=']`。

- `getopt.gnu_getopt(argv, shortopts, longopts=[])`: GNU 风格的命令行参数解析。

  与 `getopt.getopt()` 类似，但支持更多的特性。

**使用方法**

```python
import getopt

opts, args = getopt.getopt(['-h', '-o', 'output.txt', 'input.txt'], 'ho:', ['help', 'output='])
for opt, arg in opts:
    if opt in ('-h', '--help'):
        print('Help message')
    elif opt in ('-o', '--output'):
        print(f'Output file: {arg}')
```
