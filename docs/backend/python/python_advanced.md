# 零基础入门学习 Python - 高级篇

![Poster-Shejibiji-python](https://pic.shejibiji.com/i/2022/05/09/62789bfd9c618.jpg)

## 类和对象

### 类

类是一群具有 相同特征 或者 行为的事物的一个统称，是抽象的，不能直接使用。

- 特征 被称为 属性
- 行为 被称为 方法

类 就相当于 制造飞机是的图纸，是负责创建对象的。

**设计一个类，通常要满足三个要素：**

- 类名 这类事物的名字，满足大驼峰命名法
- 属性 这类事物具有什么样的特征
- 方法 这类事物具有什么样的行为

**self 代表类的实例，而非类**

类的方法与普通的函数只有一个特别的区别——它们必须有一个额外的**第一个参数名称**， 按照惯例它的名称是 self。

用 self 只是因为按照惯例而已，所以可以换成其它的字母。

例：

```python
class A:
    def pri(biji):
        print(biji)
        print(biji.__class__)


t = A()
t.pri()
>>>
<__main__.A object at 0x000001671F0BDB10>
<class '__main__.A'>
# 从执行结果可以很明显的看出，self 代表的是类的实例，代表当前对象的地址，而 self.class 则指向类。
```

### 类的初始化

在类的内部，使用 `def` 关键字来定义一个方法，与一般函数定义不同，类方法必须包含参数 `self`, 且为第一个参数，self 代表的是类的实例。

类有一个名为 `__init__` 的特殊方法（**构造方法**），该方法在类实例化时会自动调用。

它是专用用来定义一个类具有哪些属性的方法！

```python
class person:
    name = ''
    age = 0
    # 定义私有属性,私有属性在类外部无法直接进行访问
    __weight = 0
    def __init__(self, n, a, w):
        self.name = n
        self.age = a
        self.__weight = w
    def speak(self):
        print("{0}说：我{1}岁。".format(self.name, self.age))


# 实例化类
p = person('biji', 10, 40)
p.speak()
>>>
biji说：我10岁。

p.__dict__ # 查看类的属性
>>>
{'name': 'biji', 'age': 10, '_person__weight': 40}
```

### 对象

对象 是由类创建出来的一个具体存在，可以直接使用。

由哪一个类创建出来的对象，就拥有在哪一个类中定义的：

- 属性
- 方法

对象就相当于用图纸制造的飞机

> 在程序开发中，应该先有类，再有对象

### 类和对象的关系

类是模板，对象是根据类这个模板创建出来的。

类只有一个，而对象可以有很多个。

- 不同的对象之间属性可以有很多个

类中定义了什么属性和方法，对象中就有什么属性和方法，不可能多，也不可能少。

例如：

小明今年 18 岁，身高 1.75，每天早上跑完步就会去吃东西；

小美今年 16 岁，身高 1.65，不跑步，喜欢吃东西。

我们就可以定义这样一个**person**类：

![R_22-05-27-16-26-01_80](https://pic.shejibiji.com/i/2022/05/27/62908b29cc210.jpg)

**对象 = 属性 + 方法**

整数、列表等都是对象，所以 python 中对象是无处不在的。

### 继承

python 的类是支持继承的，它可以使用现有类的所有功能，并且无需再重新编写代码的情况下对这些功能扩展。

通过继承的类我们一般称为**子类**。

如果子类拥有同样的属性和方法，就会实现覆盖。

**isinstance()**用于检测对象是否属于某个类；

**issubclass()**用于检测子类是否属于某个类。

**多重继承**

访问顺序为从左到右

```python
class A:
    x = 520
    def hello(self):
        print('你好，我是A~')

class B:
    x = 888
    y = 100
    def hello(self):
        print("您好，我是B~")

class C(A, B):
    pass

c = C()
c.x
>>>
520

c.hello()
>>>
你好，我是A~

c.y
>>>
100
```

### 组合

可以将多个类组合到一起。

```python
class Turtle:
    def say(self):
        print('我是一只小乌龟，我不会说话')

class Cat:
    def say(self):
        print('我是一只小猫，我会喵喵喵~')

class Dog:
    def say(self):
        print('我是一只小狗，我会汪汪汪~')

class Garden():
    t = Turtle()
    c = Cat()
    d = Dog()
    def say(self):
        self.t.say()
        self.c.say()
        self.d.say()

g = Garden()
g.say()
>>>
我是一只小乌龟，我不会说话
我是一只小猫，我会喵喵喵~
我是一只小狗，我会汪汪汪~
```

### 绑定（self）

为什么在之前例子中，需要加`self`呢？

这样做的目的是：实现实例对象和类的方法进行**绑定**。

`self`其实就是实例对象本身。

因为：在实例中，类的方法确实是共享的，但是实例的属性却可以是自己的。

例：

```python
class C:
    def set_x(self, v):
        self.x = v


c = C()
c.set_x(250)
c.x
>>>
250
# 现在c拥有了自己的属性，但是C的x还是没值的。
# 我们可以尝试给C的x属性一个值：
C.x = 100
C.x
>>>
100

c.x
>>>
250
# c的值还是250，和类没有关系
```

在 python 中，要给对象设置属性，非常容易，但不推荐！

只需要在类的外部代码中直接通过`.`设置一个属性即可。

上例中，我们可以加一句：

```python
c.y = 999
# 这样c就多了一个y的属性，不推荐这样操作，属性还是应该封装在类的内部
```

由**哪一个对象**调用的方法，方法内的`self`就是哪**一个对象的引用**

```python
class Cat:
    def drink(self):
        print('{0}小猫爱喝水'.format(self.name))

tom = Cat()
tom.name = 'Tom'
tom.drink()
>>>
Tom小猫爱喝水
# 因为时tom调用的方法，所以self现在就是tom的引用，所以我们输出self.name就是有内容了。
```

- 在类封装的方法内部，`self`就表示**当前调用方法的对象自己**
- 调用方法时，程序员不需要传递`self`参数
- 在方法内部
  - 可以通过`self.`访问对象的属性
  - 也可以通过`self.`调用其他的对象方法

**为什么不推荐在类的外部添加对象属性**

因为如果在运行时，没有找到属性，程序就会报错。

对象应该包含哪些属性，应该封装在类的内部！

**小技巧：**

最小的类可以当字典来使用。

例：

```python
class C():
    pass

c = C() #推荐使用空类生成实例来模拟字典
c.x = 1
c.y = 20
c.z = [88, 99 ,520]
c.__dict__
>>>
{'x': 1, 'y': 20, 'z': [88, 99, 520]}
```

### 类的方法

#### 生命周期

- 一个对象从调用`类名（）`创建，生命周期开始
- 一个对象的`__del__`方法一旦被调用，生命周期结束
- 在对象的生命周期内，可以访问对象属性，或者让对象调用方法

#### \_\_del\_\_ 方法

当一个 对象被从内存中销毁 前，会自动调用`__del__`方法。

`del` 关键字可以删除一个对象。

例：

```python
class Cat:
    def __init__(self, n):
        self.name = n
    def speak(self):
        print('我是{}小猫咪'.format(self.name))
    def __del__(self):
        print('我将在这里被销毁')

tom = Cat('Tom')
tom.speak()
print('-' * 30)
>>>
我是Tom小猫咪
------------------------------
我将在这里被销毁

# __del__是在最后被执行的！
# 如果我们改一下，对象改成这样：

tom = Cat('Tom')
tom.speak()
del tom
print('-' * 30)
>>>
我是Tom小猫咪
我将在这里被销毁
------------------------------

# 因为我们执行了删除tom的操作，所以__del__这次不是最后被执行了。
```

#### \_\_str\_\_方法

在 python 中，使用`print`输出对象变量，默认情况下会输出这个变量引用的对象是由哪一个类创建的对象，以及在内存中的地址（十六进制表示）

如果在开发中，希望`print`输出对象变量时，能够打印**自定义内容**，就可以利用`__str__`这个内置方法了。

注意：`__str__`方法必须返回一个字符串

例：

```python
class Cat:
    def __init__(self, n):
        self.name = n
    def speak(self):
        print('我是{}小猫咪'.format(self.name))
    def __str__(self):
        return "我是小猫：[{0}]".format(self.name)

tom = Cat('Tom')
print(tom)
```

可以用这个来打印所有内部对象的属性，而不用在外部在使用`.属性`来查询。

### 封装

1. **封装**是面向对象编程的一大特点

2. 面向对象编程的第一步——将**属性**和**方法**封装在一个抽象的类中

3. **外界**使用**类**对象，然后让对象调用方法

4. **对象方法**的细节都被**封装**在**类的内部**

### 构造函数

#### \_\_init\_\_方法

实现实例化的同时个性化定制。

（其实就是实例化的时候，可以传入自定义的参数）

例如：

```python
class C:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def add(self):
        return self.x + self.y


c = C(2, 3)
c.add()
>>>
5
```

#### 调用未绑定的父类方法

我们可以直接调用父类的方法，但要注意避免**钻石继承**，也就是因为重复调用父类方法，而导致父类方法重复执行，而出现我们不期待的结果。

例如：

```python
## 调用父类方法
class C:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def add(self):
        return self.x + self.y


class D:
    def __init__(self, x, y, z):
        C.__init__(self, x, y)
        self.z = z
    def add(self):
        return C.add(self) + self.z


d = D(10, 11, 12)
d.add()
33


## 钻石继承
class A:
    def __init__(self):
        print("我是A")


class B1(A):
    def __init__(self):
        A.__init__(self)
        print("我是B1")


class B2(A):
    def __init__(self):
        A.__init__(self)
        print("我是B2")


class C(B1, B2):
    def __init__(self):
        B1.__init__(self)
        B2.__init__(self)
        print("我是C")


c = C()
>>>
我是A
我是B1
我是A
我是B2
我是C
## 上面的我是A出现了两次
```

要解决这个问题官方也有完美的方案，就是`super()`函数，它可以在父类中搜索指定的方法，并自动绑定好 self 参数。

例如：

```python
"""
使用super()函数，修改代码时，要改的几个地方：
1、子类中不用再出现父类名称，改为super()
2、父类的参数直接为空，不用再写self
3、多次调用也不用再重复写，只要一次即可（具体案例看C类）
"""
class A:
    def __init__(self):
        print("我是A")


class B1(A):
    def __init__(self):
        super().__init__()
        print("我是B1")


class B2(A):
    def __init__(self):
        super().__init__()
        print("我是B2")


class C(B1, B2):
    def __init__(self):
        super().__init__()
        print("我是C")


c = C()
>>>
我是A
我是B2
我是B1
我是C
## 此时就不会重复了
```

### 多态

根据不同的对象执行不同的操作

重写就是实现多类型的多态

### 私有变量

就是指通过某种手段，使得对象中的属性或方法无法被外部所访问。

（并不是真的私有，只是按照规则更改了名字）
