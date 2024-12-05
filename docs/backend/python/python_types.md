# Python 数据类型及方法

> 根据官方文档重新整理，以便快速查阅。
>
> 并不追求大而全，而是个人认为常用的方法和知识点。
>
> 参考地址: [Python 文档](https://docs.python.org/3/library/stdtypes.html)

## 基础数据类型

### 字符串

- `str.split()`: 分割字符串(默认以空格分割，可以指定分隔符)

- `str.strip()`: 去除字符串两端的空格(默认去除空格，可以指定去除的字符)

- `str[start:end:step]`: 切片字符串

- `str.isalnum()`: 判断字符串是否只包含字母和数字

### 数字

- `int()`: 将字符串或浮点数转换为整数

- `.2f`: 保留两位小数，如: `f'{num:.2f}'`

- `round()`: 四舍五入，如: `round(1.2345, 2)` 返回 `1.23`

## Mappping 类型

## Python 内置函数

### 迭代器与生成器

**range()**

`range()` 用于生成一个序列，可以指定起始值、结束值和步长。

```python
for i in range(1, 10, 2):
    print(i)
```

**注意**: `range()` 函数生成的序列不包括结束值。比如 `range(1, 10)` 生成的序列是 `[1, 2, 3, 4, 5, 6, 7, 8, 9]`。

**zip()**

`zip()` 接受多个可迭代对象作为参数，返回一个迭代器，迭代器中的每个元素都是一个元组，元组中包含每个可迭代对象的相同位置的元素。

```python
for a, b in zip([1, 2, 3], ['A', 'B', 'C']):
    print(a, b)
```

**enumerate()**

`enumerate()` 函数接受一个可迭代对象作为参数，返回一个枚举对象，枚举对象中的每个元素都是一个元组，元组中包含元素的索引和值。

```python
for index, value in enumerate([1, 2, 3, 4, 5]):
    print(index, value)
```

当你需要对数据进行索引操作时，它可以帮助你简化代码并避免手动处理索引计数。

**map()**

`map()` 接受一个函数和一个可迭代对象作为参数，**返回一个迭代器**，迭代器中的每个元素都是将函数应用于可迭代对象中的元素得到的结果。

```python
def square(x):
    return x * x

print(list(map(square, [1, 2, 3, 4, 5])))
```

**filter()**

`filter()` 接受一个函数和一个可迭代对象作为参数，**返回一个迭代器**，迭代器中的每个元素都是将函数应用于可迭代对象中的元素得到的结果为 `True` 的元素。

```python
def is_even(x):
    return x % 2 == 0

print(list(filter(is_even, [1, 2, 3, 4, 5])))
```

### 对象与类

**super()**

`super()` 返回一个代理对象，这个代理对象可以调用父类的方法。

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
