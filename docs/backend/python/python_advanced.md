# Python - 高级篇

> 不同的 python 版本，运行的 python 命令可能不同，这里以 python 为例。

## 开发经验及注意事项

### 编码格式

- 在使用 with open()打开文件时，可以指定文件的编码格式，如：`with open('file.txt', 'r', encoding='utf-8') as f:`。

  如果是在 windows 下运行，通常需要指定编码格式，否则可能会出现错误。

  需要注意的是，如果模式为 `wb` 或者 `rb`，则不能指定编码格式，因为这两种模式是二进制模式。

- `json.dumps` 默认会把中文转换为 unicode 编码，可以通过 `ensure_ascii=False` 参数来保留中文。

  如：`json.dumps(data, ensure_ascii=False)`。

## 进阶知识

### Python 的数据类型

**集合类型**：

- list：列表，有序可变序列（类似于数组）

  如: `[1, 2, 3]`

- dict：字典，无序键值对集合（关键词：键值对）

  如: `{'name': 'Alice', 'age': 18}`

- tuple：元组，有序不可变序列（关键词：不可变）

  如: `(1, 2, 3)`

- set：集合，无序不重复元素集（关键词：不重复）

  如: `{1, 2, 3}`

**可变对象和不可变对象**

Python 中的数据类型分为可变对象和不可变对象。

是否可变是指对象的内容改变后，id 是否会改变。不可变对象因为它不能在原地修改，所以每次修改都会创建一个新的对象，因此 id 会改变。

- 不可变对象：int、float、str、tuple 等

- 可变对象：list、dict、set 等

```python
a = 1
print(id(a))  # 4316875464
a = 2
print(id(a))  # 4316875496
```

### Python 的内置函数

**map() 函数**

`map()` 函数是 Python 的内置函数，它接受一个函数和一个可迭代对象作为参数，**返回一个迭代器，**迭代器中的每个元素都是将函数应用于可迭代对象中的元素得到的结果。

```python
def square(x):
    return x * x

print(list(map(square, [1, 2, 3, 4, 5])))
```

**super() 函数**

`super()` 函数是 Python 的内置函数，它返回一个代理对象，这个代理对象可以调用父类的方法。

```python
class A:
    def __init__(self):
        print('A.__init__')

class B(A):
    def __init__(self):
        super().__init__()
        print('B.__init__')

b = B()
```

简单理解就是，`super()` 函数可以直接调用父类的方法，而不用指定父类的名字。

### Python 的装饰器

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

上面的案例类似于下面的代码：

```python
def hello():
    print('Hello, world!')

hello = decorator(hello)
hello()
```

如果需要给装饰器传递参数，可以在装饰器外再套一层函数：

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

**@staticmethod**

`@staticmethod` 装饰器用于将类中的方法定义为静态方法。静态方法不需要传入 `self` 参数，可以直接通过类名调用。

```python
class A:
    @staticmethod
    def hello():
        print('Hello, world!')

A.hello()
```

**@classmethod**

`@classmethod` 装饰器用于将类中的方法定义为类方法。类方法的第一个参数是类本身，通常命名为 `cls`。

```python
class A:
    @classmethod
    def hello(cls):
        print(f'Hello, {cls.__name__}!')

A.hello()
```

**@staticmethod 和 @classmethod 的区别**

- `@staticmethod`：静态方法不需要传入 `self` 或 `cls` 参数，可以直接通过类名调用

- `@classmethod`：类方法需要传入 `cls` 参数，可以通过类名或实例调用

- `@classmethod` 可以访问类属性和类方法，因为有类的引用，而 `@staticmethod` 无法访问类属性和类方法

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

**@abstractmethod**

> 在 Python 中定义抽象类时，必须从 abc 模块导入 ABC 类和 abstractmethod 装饰器。ABC 是“抽象基类”的缩写，abstractmethod 装饰器用于标记抽象方法。

`@abstractmethod` 装饰器用于将类中的方法定义为抽象方法。抽象方法必须在子类中实现。

```python
from abc import ABC, abstractmethod

class A(ABC):
    @abstractmethod
    def hello(self):
        pass

class B(A):
    def hello(self):
        print('Hello, world!')

b = B()
b.hello()
```

### Python 的模块和包

**from ... import ...**

`from` 后面跟的是 `.py` 文件及其路径，`import` 后面跟的是模块名或者模块中的函数名。

比如下面的文件结构：

```python
-root
  |-app.py
  |-lib
    |-__init__.py
    |-model
      |-__init__.py
      |-classA.py
```

在 `app.py` 中，可以这样引入 `classA`：

```python
from lib.model.classA import classA
```

**\_\_init\_\_.py**

`__init__.py` 文件是一个空文件，它的存在告诉 Python 这个目录是一个 Python 包。

没有它，Python 就不会把这个目录当作包来处理，也就无法引入包中的模块。

**\_\_name\_\_**

`__name__` 是 Python 的一个内置变量，它的值取决于 Python 如何运行当前的模块。

通常这样使用：

```python
if __name__ == '__main__':
    # do something
```

这样可以让模块既可以被导入，也可以作为脚本直接运行。

通过将要运行的脚本中的代码写在 `if __name__ == '__main__':` 之后，避免了在导入模块时运行脚本中的代码。

### Python 的内存管理

Python 的内存管理是通过引用计数和垃圾回收机制来实现的。

- 引用计数：Python 中的每个对象都有一个引用计数，当引用计数为 0 时，对象被销毁。

- 垃圾回收：Python 通过垃圾回收机制来处理循环引用的问题。垃圾回收器会定期检查对象的引用计数，当引用计数为 0 时，对象被销毁。

Python 的垃圾回收机制有两种：分代垃圾回收和循环垃圾回收。

- 分代垃圾回收：Python 将对象分为三代，每代对象的存活时间越长，就越不可能被销毁。Python 会根据对象的存活时间来决定何时销毁对象。

- 循环垃圾回收：Python 通过引用计数和标记清除算法来处理循环引用的问题。当对象之间存在循环引用时，Python 会通过标记清除算法来检测和销毁循环引用的对象。

**如何避免内存泄漏**

- 避免循环引用：当对象之间存在循环引用时，Python 的垃圾回收机制无法正确处理，会导致内存泄漏。

- 使用 `with` 语句：`with` 语句可以自动关闭文件和释放资源，避免资源泄漏。

- 使用 `gc` 模块：`gc` 模块提供了一些函数，可以手动触发垃圾回收机制。

**如何避免被错误的垃圾回收**

- 引用计数：当对象的引用计数为 0 时，对象会被销毁。如果对象的引用计数不为 0，对象就不会被销毁。

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

- 强制引用：可以使用强制引用来阻止对象被销毁。强制引用可以通过 `gc.get_referrers()` 函数来获取。

```python
import gc

class A:
    pass

a = A()

# 强制引用
gc.get_referrers(a)
```

## pip 和 virtualenv

### pip

`pip` 是 Python 的包管理工具，用于安装和管理 Python 包。

常用命令包括：

- `pip install --upgrade pip`：升级 pip

- `pip install package_name`：安装包

- `pip uninstall package_name`：卸载包

- `pip list`：列出已安装的包

- `pip show package_name`：显示包的详细信息

- `pip search package_name`：搜索包

- `pip freeze > requirements.txt`：将当前环境中已安装的包导出到 `requirements.txt` 文件

- `pip install -r requirements.txt`：从 `requirements.txt` 文件中安装包

- `pip install -e .`: 以可编辑的方式安装包（即在当前目录下安装包，可以直接修改包的源码）

**pip 修改配置文件**

你可以使用 `pip config` 命令修改配置文件，例如：

```bash
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

这里将全局的 `index-url` 设置为清华大学的镜像源。

### virtualenv

`virtualenv` 是一个用于创建独立 Python 环境的工具。

在 Python 3.3 之后，`venv` 模块已经内置在 Python 中，可以使用 `python -m venv` 命令创建虚拟环境。

- 创建一个新的虚拟环境：

  ```bash
  python -m venv /path/to/new/virtual/environment
  ```

- 激活虚拟环境：

  ```bash
  source /path/to/new/virtual/environment/bin/activate
  ```

  激活后，命令行提示符会显示虚拟环境的名称。

- 退出虚拟环境：

  ```bash
  deactivate
  ```

## Module

### os 系统操作

`os` 模块提供了一种使用操作系统功能的方法。

```python
import os

# 获取当前工作目录
print(os.getcwd())

# 列出目录下的文件
print(os.listdir())
```

### threading 多线程

`threading` 模块提供了多线程功能。

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
