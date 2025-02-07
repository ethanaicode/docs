# Python - 高级篇

> 不同的 python 版本，运行的 python 命令可能不同，这里以 python 为例。

## 开发实践

### 编码格式

- 在使用 with open()打开文件时，可以指定文件的编码格式，如: `with open('file.txt', 'r', encoding='utf-8') as f:`。

  如果是在 windows 下运行，通常需要指定编码格式，否则可能会出现错误。

  需要注意的是，如果模式为 `wb` 或者 `rb`，则不能指定编码格式，因为这两种模式是二进制模式。

- `json.dumps` 默认会把中文转换为 unicode 编码，可以通过 `ensure_ascii=False` 参数来保留中文。

  如: `json.dumps(data, ensure_ascii=False)`。

- 在判断是否为字母时，程序设计中默认会认为中文也是字母，所以在判断时，需要注意。

  在程序中，`alpha` 通常指代任何语言中的字母，而不仅仅是拉丁字母（如 A-Z）。

### 抽象类与继承

- Python 中的抽象类是通过 `abc` 模块实现的，抽象类不能被实例化，只能被继承。

- 抽象类中可以包含普通方法，子类可以直接调用。

- 可以使用 `super()` 函数来调用父类的方法。

- 抽象类中的抽象方法必须在子类中实现，否则会抛出异常。（更多内容可以查看装饰器部分）

- 在子类初始化时，要注意`super().__init__()`的调用顺序，如果父类初始化时调用了子类的方法，要确保子类的属性已经初始化。（这个问题不容易在编写代码时注意到，要留意）

  ```python
    class A:
        def __init__(self):
            self.get_a()

        @abstractmethod
        def get_a(self):
            pass

    class B(A):
        def __init__(self):
            super().__init__()
            self.b = 1

        def get_a(self):
            print(self.b)
  ```

### 技巧与经验

- 可以使用 `python -c` 来执行一行 Python 代码

  `python -c 'import sys; print(sys.prefix)'` 可以查看 Python 的安装路径

## 进阶知识

### Python 的数据类型

**数据类型的分类**:

- list: 列表，有序可变序列（类似于数组）

  如: `[1, 2, 3]`

- dict: 字典，无序键值对集合（关键词: 键值对）

  如: `{'name': 'Alice', 'age': 18}`

- tuple: 元组，有序不可变序列（关键词: 不可变）

  如: `(1, 2, 3)`

- set: 集合，无序不重复元素集（关键词: 不重复）

  如: `{1, 2, 3}`

**数据类型的常用方法**:

> 更多内容可以参考文档 [《Python 数据类型及方法》](./python_types)

- list: `append()`、`extend()`、`insert()`、`remove()`、`pop()`、`index()`、`count()`、`sort()`、`reverse()`

  `append()` 在列表末尾添加元素

- dict: `clear()`、`copy()`、`fromkeys()`、`get()`、`items()`、`keys()`、`pop()`、`popitem()`、`setdefault()`、`update()`、`values()`

  `update()` 更新字典，将一个字典的键值对更新到另一个字典，如果键相同，则覆盖

  `items()` 返回字典的键值对列表，如: `[('name', 'Alice'), ('age', 18)]`

  `keys()` 返回字典的键列表

  `values()` 返回字典的值列表

  `get()` 获取字典中的值，如果键不存在，返回默认值（推荐都用这个方法来获取，避免 KeyError）

- tuple: `count()`、`index()`

- set: `add()`、`remove()`、`pop()`、`clear()`、`copy()`、`difference()`、`intersection()`、`union()`、`issubset()`、`issuperset()`、`discard()`、`update()`、`symmetric_difference()`

**可变对象和不可变对象**

Python 中的数据类型分为可变对象和不可变对象。

是否可变是指对象的内容改变后，id 是否会改变。不可变对象因为它不能在原地修改，所以每次修改都会创建一个新的对象，因此 id 会改变。

- 不可变对象: int、float、str、tuple 等

- 可变对象: list、dict、set 等

```python
a = 1
print(id(a))  # 4316875464
a = 2
print(id(a))  # 4316875496
```

### 反射与装饰器

Python 中的反射和装饰器是两个高级特性，它们可以帮助你更好地理解 Python 的面向对象编程和函数式编程。

#### 反射基础知识

Python 的反射是指通过字符串的形式来操作对象的属性和方法。

#### 常见的反射操作

- `dir(object)`: 获取对象的所有属性和方法。

- `type(object)`: 获取对象的类型。
- `isinstance(object, classinfo)`: 判断对象是否是指定类的实例。

- `obj.__class__`: 获取对象的类。

  `obj.__class__.__name__`: 获取对象的类名。

- `callable(object)`: 判断对象是否可调用。

- `obj.__dict__`: 获取对象的属性字典。

- `getattr(object, name[, default])`: 获取对象的属性或方法，如果属性或方法不存在，则返回默认值。

- `hasattr(object, name)`: 判断对象是否有指定的属性或方法。

- `setattr(object, name, value)`: 设置对象的属性或方法。

#### 装饰器基础

装饰器是 Python 的一种高级特性，它可以在不修改原函数的情况下，为函数添加额外的功能。

简单点理解就是，装饰器是一个函数，它接受一个函数作为参数，它会返回一个新的函数，这个新的函数会在原函数执行前后执行一些额外的代码。

```python
def decorator(func):
    def wrapper(*args, **kwargs):
        print('Before function')
        result = func(*args, **kwargs)
        print('After function')
        return result
    return wrapper

@decorator
def hello():
    print('Hello, world!')

hello()
```

上面的案例类似于下面的代码:

```python
def hello():
    print('Hello, world!')

hello = decorator(hello)
hello()
```

如果需要给装饰器传递参数，可以在装饰器外再套一层函数:

```python
def decorator_with_args(arg):
    def decorator(func):
        def wrapper(*args, **kwargs):
            print(f'Before function with arg: {arg}')
            result = func(*args, **kwargs)
            print('After function')
            return result
        return wrapper
    return decorator

@decorator_with_args('arg')
def hello():
    print('Hello, world!')

hello()
```

#### 常用的装饰器

Python 的装饰器是一种高级特性，它可以在不修改原函数的情况下，为函数添加额外的功能。

- `@staticmethod`: 将类中的方法定义为静态方法，静态方法不需要传入 `self` 参数，可以直接通过类名调用。

- `@abstractmethod`: 将类中的方法定义为抽象方法，抽象方法必须在子类中实现。

- `@classmethod`: 将类中的方法定义为类方法，类方法的第一个参数是类本身，通常命名为 `cls`。

- `@property`: 将类中的方法定义为属性，属性方法可以像属性一样访问，不需要加括号。

**@classmethod**

`@classmethod` 装饰器刚开始可能会有点难以理解，类方法与普通的实例方法不同，因为它们接收类本身作为第一个参数（通常命名为 cls），而不是类的实例（通常命名为 self）。

这意味着你可以在没有创建类的实例的情况下调用类方法。以下场景是类方法非常有用的:

- 当你需要在创建类的实例之前执行一些操作时，可以使用类方法，比如工厂方法。

  ```python
    class A:
        def __init__(self, name):
            self.name = name

        @classmethod
        def from_string(cls, string):
            name = string.split()[0]
            return cls(name)

    a = A.from_string('Alice 18')
    print(a.name)
  ```

  可以来代替构造函数，比如上面的例子，可以直接调用 `A('Alice')` 来创建实例。

  可以利用这个特性，实现工厂模式，通过传入不同的参数，来创建不同的实例。

- 当你需要访问类的变量时，可以使用类方法。

  ```python
    class A:
        count = 0

        def __init__(self):
            A.count += 1

        @classmethod
        def get_count(cls):
            return cls.count

    a = A()
    b = A()
    print(A.get_count())
  ```

- 当你需要在类的所有实例之间共享数据时，可以使用类方法。

  ```python
    class A:
        data = []

        def __init__(self, value):
            self.value = value
            A.data.append(value)

        @classmethod
        def get_data(cls):
            return cls.data

    a = A(1)
    b = A(2)
    print(A.get_data())
  ```

**@property**

`@property` 装饰器用于将类中的方法定义为属性。属性方法可以像属性一样访问，不需要加括号。

```python
    class A:
        def __init__(self):
            self._name = 'Alice'

        @property
        def name(self):
            return self._name

        @name.setter
        def name(self, value):
            self._name = value

    a = A()
    print(a.name)
    a.name = 'Bob'
    print(a.name)
```

### Python 的错误处理

#### 异常处理

Python 的错误处理机制是通过 `try...except...else...finally` 语句来实现的。

- `try`: 尝试执行代码块，如果出现异常，则跳转到 `except` 语句块

- `except`: 捕获异常，并处理异常

- `else`: 如果没有异常，则执行 `else` 语句块

- `finally`: 无论是否有异常，都会执行 `finally` 语句块

```python
try:
    # 尝试执行代码块
    print(1 / 0)
except ZeroDivisionError:
    # 捕获异常
    print('ZeroDivisionError')
else:
    # 没有异常
    print('No exception')
finally:
    # 无论是否有异常
    print('Finally')
```

#### 自定义异常

Python 的异常是通过继承 `Exception` 类来实现的，你可以通过继承 `Exception` 类来定义自己的异常。

下面是最简单的自定义异常（自定义了异常名称）:

```python
class InvaildDataException(Exception):
    pass
```

下面是自定义异常的完整写法:

```python
class InvaildDataException(Exception):
    def __init__(self, message='Invaild data'):
        self.message = message
        super().__init__(self.message)
```

### Python 的日志处理

Python 的日志处理是通过 `logging` 模块来实现的，`logging` 模块提供了一些函数和类，可以用来记录日志。

#### 日志记录器

Python 的日志记录器是通过 `logging.getLogger()` 函数来创建的，你可以通过 `logging.getLogger()` 函数来获取一个日志记录器，然后通过这个日志记录器来记录日志。

日志记录器是通过名字进行组织和区分的，你可以通过名字来获取不同的日志记录器。

```python
import logging

logger = logging.getLogger('my_logger')
```

#### 日志级别

Python 的日志级别有以下几种:

- `logging.CRITICAL`: 严重错误级别。

- `logging.ERROR`: 错误级别。

- `logging.WARNING`: 警告级别。

- `logging.INFO`: 信息级别。

- `logging.DEBUG`: 调试级别。

**注意**: 日志级别是可以设置的，只有大于等于设置的级别的日志才会被记录。
如果你没有设置日志级别，默认是 `WARNING`，这意味着只有 `WARNING`、`ERROR` 和 `CRITICAL` 级别的日志会被记录。

#### 日志处理器

Python 的日志处理器是通过 `logging` 模块中的处理器类来实现的，处理器类有以下几种:

- `logging.NullHandler`: 空处理器。

- `logging.StreamHandler`: 输出到控制台。

- `logging.FileHandler`: 输出到文件。

- `logging.handlers.RotatingFileHandler`: 输出到滚动文件。

- `logging.handlers.TimedRotatingFileHandler`: 输出到定时滚动文件。

#### 日志格式化器

Python 的日志格式化器是通过 `logging` 模块中的格式化器类来实现的，如:

```python
custom_handler.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
```

**格式化字符串有以下几种**:

- `%(asctime)s`: 日志记录的时间。

- `%(name)s`: 日志记录的名称。

- `%(levelname)s`: 日志记录的级别。

- `%(message)s`: 日志记录的消息。

- `%(filename)s`: 日志记录的文件名。

- `%(lineno)d`: 日志记录的行号。

- `%(funcName)s`: 日志记录的函数名。

#### 日志记录器的使用

获得日志记录器后，可以调用日志记录器的方法来记录日志，主要有:

- `logger.debug()`: 调试级别。

- `logger.info()`: 信息级别。

- `logger.warning()`: 警告级别。

- `logger.error()`: 错误级别。

- `logger.critical()`: 严重错误级别。

- `logger.log()`: 自定义级别。

下面是一个简单的例子:

```python
import logging

# 配置日志记录器
logger = logging.getLogger(__name__)

# 设置日志级别
logger.setLevel(logging.DEBUG)

# 创建一个控制台处理器
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)

# 创建一个日志格式化器
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)

# 添加处理器到记录器
logger.addHandler(ch)

# 记录日志
logger.info('This is a info message')
```

**basicConfig() 函数**

`logging.basicConfig()` 函数是一个快速配置日志记录器的函数，它可以设置日志记录器的级别、处理器和格式化器，适合简单的日志需求。

下面是设置多个处理器的例子:

```python
import logging

handler_console = logging.StreamHandler()
handler_file = logging.FileHandler("app.log", mode="w")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[handler_console, handler_file]
)

logging.info("This message will appear on both console and file.")
```

**注意**: `basicConfig()` 函数只能在第一次调用时生效，如果你在第二次调用时传入了参数，那么第二次调用会被忽略。

### Python 的模块和包

**from ... import ...**

`from` 后面跟的是 `.py` 文件及其路径，`import` 后面跟的是模块名或者模块中的函数名。

比如下面的文件结构:

```python
-root
  |-app.py
  |-lib
    |-__init__.py
    |-model
      |-__init__.py
      |-classA.py
```

在 `app.py` 中，可以这样引入 `classA`:

```python
from lib.model.classA import classA
```

**\_\_init\_\_.py**

`__init__.py` 文件是一个空文件，它的存在告诉 Python 这个目录是一个 Python 包。

没有它，Python 就不会把这个目录当作包来处理，也就无法引入包中的模块。

**\_\_name\_\_**

`__name__` 是 Python 的一个内置变量，它的值取决于 Python 如何运行当前的模块。

通常这样使用:

```python
if __name__ == '__main__':
    # do something
```

这样可以让模块既可以被导入，也可以作为脚本直接运行。

通过将要运行的脚本中的代码写在 `if __name__ == '__main__':` 之后，避免了在导入模块时运行脚本中的代码。

### Python 的内存管理

Python 的内存管理是通过引用计数和垃圾回收机制来实现的。

- 引用计数: Python 中的每个对象都有一个引用计数，当引用计数为 0 时，对象被销毁。

- 垃圾回收: Python 通过垃圾回收机制来处理循环引用的问题。垃圾回收器会定期检查对象的引用计数，当引用计数为 0 时，对象被销毁。

Python 的垃圾回收机制有两种: 分代垃圾回收和循环垃圾回收。

- 分代垃圾回收: Python 将对象分为三代，每代对象的存活时间越长，就越不可能被销毁。Python 会根据对象的存活时间来决定何时销毁对象。

- 循环垃圾回收: Python 通过引用计数和标记清除算法来处理循环引用的问题。当对象之间存在循环引用时，Python 会通过标记清除算法来检测和销毁循环引用的对象。

**如何避免内存泄漏**

- 避免循环引用: 当对象之间存在循环引用时，Python 的垃圾回收机制无法正确处理，会导致内存泄漏。

- 使用 `with` 语句: `with` 语句可以自动关闭文件和释放资源，避免资源泄漏。

- 使用 `gc` 模块: `gc` 模块提供了一些函数，可以手动触发垃圾回收机制。

**如何避免被错误的垃圾回收**

- 引用计数: 当对象的引用计数为 0 时，对象会被销毁。如果对象的引用计数不为 0，对象就不会被销毁。

这个可以通过保持显式引用来避免对象被销毁。

在下面这个例子中，当你创建一个 `PhotoImage` 对象时，由于 `Tkiner` 不会管理这个对象的生命周期，当这个对象被销毁时，图像就会消失（表现就是莫名其妙不显示了）。

```python
# 没有显式应用
photo_image = ImageTk.PhotoImage(image)
image_label = tk.Label(image_frame, image=photo_image)
image_label.pack()
# 显式应用
photo_image = ImageTk.PhotoImage(image)
image_label = tk.Label(image_frame, image=photo_image)
image_label.image = photo_image
image_label.pack()
```

在这里，通过将 `PhotoImage` 对象赋值给 `Label` 的 `image` 属性，你可以确保 `PhotoImage` 对象在 `Label` 存在期间保持活动状态，从而防止图像意外消失。这是 Tkinter 处理中常见的做法。

- 强制引用: 可以使用强制引用来阻止对象被销毁。强制引用可以通过 `gc.get_referrers()` 函数来获取。

```python
import gc

class A:
    pass

a = A()

# 强制引用
gc.get_referrers(a)
```

## 开发工具

### pip 包管理工具

`pip` 是 Python 的包管理工具，用于安装和管理 Python 包。

#### 常用命令

- `pip install --upgrade pip`: 升级 pip

- `pip install package_name`: 安装包

- `pip uninstall package_name`: 卸载包

- `pip list`: 列出已安装的包

- `pip show package_name`: 显示包的详细信息

- `pip search package_name`: 搜索包

- `pip freeze > requirements.txt`: 将当前环境中已安装的包导出到 `requirements.txt` 文件

- `pip install -r requirements.txt`: 从 `requirements.txt` 文件中安装包

- `pip install -e .`: 以可编辑的方式安装包（即在当前目录下安装包，可以直接修改包的源码）

#### 修改镜像源

如果是临时修改镜像源，可以使用 `-i` 参数，例如:

```bash
pip install package_name -i https://pypi.tuna.tsinghua.edu.cn/simple
```

比较有名的国内镜像源有:

- 清华大学: `https://pypi.tuna.tsinghua.edu.cn/simple`

- 阿里云: `https://mirrors.aliyun.com/pypi/simple`

- 豆瓣: `https://pypi.doubanio.com/simple`

如果需要永久修改镜像源，可以修改 `pip` 的配置文件，具体方法可以参考下一章节的内容。

#### 修改 pip 配置文件

你可以使用 `pip config` 命令来修改配置文件，例如:

```bash
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

这里将全局的 `index-url` 设置为清华大学的镜像源。

或者直接修改配置文件，配置文件的路径可以通过 `pip config list` 命令查看，通常位于以下位置:

- Linux: `~/.config/pip/pip.conf`

- macOS: `~/Library/Application Support/pip/pip.conf`

  或者 `~/.config/pip/pip.conf`

- Windows: `C:\Users\username\AppData\Roaming\pip\pip.ini`

### venv 虚拟环境

`virtualenv` 是一个用于创建独立 Python 环境的工具。

在 Python 3.3 之后，`venv` 模块已经内置在 Python 中，可以使用 `python -m venv` 命令创建虚拟环境。

- 创建一个新的虚拟环境:

  ```bash
  python -m venv /path/to/new/virtual/environment
  ```

- 激活虚拟环境:

  ```bash
  source /path/to/new/virtual/environment/bin/activate
  ```

  激活后，命令行提示符会显示虚拟环境的名称。

- 退出虚拟环境:

  ```bash
  deactivate
  ```

### setuptools 打包工具

`setuptools` 是 Python 的一个打包工具，可以用这个来管理 Python 包的依赖关系，以及打包和分发 Python 包。

#### 安装 setuptools

你可以使用 `pip` 来安装 `setuptools`:

```bash
pip install setuptools
```

#### 创建 setup.py 文件

`setuptools` 使用 `setup.py` 文件来定义 Python 包的元数据，如包名、版本、作者等。

下面是一个简单的 `setup.py` 文件:

```python
from setuptools import setup, find_packages

setup(
    name='my_package',
    version='0.1',
    packages=find_packages(),
    install_requires=[
        'requests',
    ],
)
```

#### 使用 setuptools 来定义依赖关系

`setuptools` 使用 `install_requires` 参数来定义项目的依赖关系，可以通过这个参数来指定项目的依赖包。

这样每次在运行项目前，先通过 `python setup.py install` 来安装依赖包，就可以保证项目正常运行。

下面是一个 `setup.py` 文件的例子:

```python
from setuptools import setup, find_packages

try:
    from setuptools import setup
except ImportError as err:
    print("To install this package, please install setuptools first.")
    print("You can install it using:")
    print()
    print("pip install setuptools")
    exit()

setup(
    name='w+ basic authentication',
    version='1.0.0',
    description="w+ sample Library for Python3",
    packages=find_packages(),
    python_requires=">=3.6",
    install_requires=[
        "requests>=2.10.0",
        "alibabacloud_tea>=0.3.3, <1.0.0",
    ]
)
```
