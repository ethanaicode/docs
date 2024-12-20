# C++ 基础知识

> 2024-10-14 20:24 开坑

> 因为本人有其它语言的开发基础，所以不会写得很详细
>
> 这里只会记录我觉得有必要的知识点。

## 环境搭建

### 使用 Visual Studio

在 Windows 上开发 C++ 程序，可以使用 Visual Studio，这个 IDE 集成了 C++ 编译器，可以方便地进行 C++ 开发。

**下载并安装 Visual Studio**

1. 前往 [Visual Studio 官网](https://visualstudio.microsoft.com/) 下载 Visual Studio

2. 运行安装程序，会让选择安装的组件，选择 `Desktop development with C++` 组件，这个组件包含了 C++ 编译器和 C++ 开发工具。

3. 安装完成后，打开 Visual Studio，新建一个 C++ 项目，选择 `Console App`，然后输入项目名称，点击创建。

4. 在项目中，新建一个 C++ 文件，输入以下代码：

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
```

5. 点击菜单栏的 `生成` -> `生成解决方案`，即可编译运行。

### 使用 VSCode 开发

Visual Studio Code (VSCode) 是一个轻量级但功能强大的代码编辑器，它支持多种编程语言，包括 C++。无论是在 Windows 还是 macOS 上，VSCode 都可以提供高效的开发体验。

#### 开始之前

**安装 VSCode**

首先确保已经安装了 VSCode，可以从 [官方网站](https://code.visualstudio.com/) 下载最新版本并安装。

**安装 C/C++ 扩展**

在 VSCode 中安装官方的 C/C++ 扩展，它提供了代码补全、语法高亮、智能感知和调试功能。

#### Windows 上的 C++ 开发

**安装 MinGW 编译器**

在 Windows 上，推荐使用 MinGW 编译器，这是 GCC 的 Windows 版本。您可以通过 MSYS2 来安装 MinGW。具体安装步骤可参考 [MinGW 安装指南](https://code.visualstudio.com/docs/cpp/config-mingw) 和 [MSYS2 官网](https://www.msys2.org/)。

**配置 VSCode**

1. 打开 VSCode，按 `Ctrl + Shift + P` 输入 `Edit Configurations`，选择 `C/C++: Edit Configurations (UI)`。
2. 在弹出的窗口中配置编译器路径，例如 `C:\msys64\ucrt64\bin\g++.exe`。

**编写和编译第一个程序**

创建一个名为 `main.cpp` 的新文件，并输入以下代码：

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
```

按 `Ctrl + Shift + B` 并选择 `C/C++: g++ build active file` 来编译并运行您的程序。

**配置任务运行器**

为了简化编译过程，可以在项目的根目录下的 `.vscode` 文件夹中创建一个 `tasks.json` 文件：

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "cppbuild",
      "label": "C/C++: g++.exe build active file",
      "command": "C:\\msys64\\ucrt64\\bin\\g++.exe",
      "args": [
        "-fdiagnostics-color=always",
        "-g",
        "${fileDirname}\\*.cpp",
        "-o",
        "${fileDirname}\\${fileBasenameNoExtension}.exe"
      ],
      "options": {
        "cwd": "C:\\msys64\\ucrt64\\bin"
      },
      "problemMatcher": ["$gcc"],
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "detail": "Generated task by Debugger."
    }
  ]
}
```

- `command`：指定编译器路径。

- `args`：指定编译参数，`${fileDirname}` 表示当前文件所在目录，`${fileBasenameNoExtension}` 表示当前文件名（不包含扩展名）。

- `options.cwd`：指定工作目录。

- `problemMatcher`：指定问题匹配器，用于识别编译错误。

- `group`：指定任务组。

- `detail`：任务的详细信息。

#### macOS 上的 C++ 开发

在 macOS 上，您可以使用预装的 `clang` 编译器或者安装 `g++`。可以通过在终端运行 `clang --version` 或 `g++ --version` 来检查编译器是否已安装。

**使用 VSCode 进行编译和调试**

在 macOS 上，配置编译器路径和编译选项与 Windows 类似，只是路径可能不同。VSCode 文档提供了详细的 macOS 设置指南。

**Xcode 集成开发环境**

如果习惯使用 IDE，可以考虑使用 Xcode，它为 C++ 提供了完整的开发环境。

#### 其他资源

- [C++ 开发官方文档](https://code.visualstudio.com/docs/languages/cpp)

## 基础知识

### C++ 简介

C++ 是一种静态类型的、编译式的、通用的、面向对象的编程语言，支持过程化编程、面向对象编程和泛型编程。

C++ 是 C 语言的一个超集，也就是说，任何合法的 C 程序都是合法的 C++ 程序。

**C++ 的版本**

- C++98：最初的 C++ 标准，于 1998 年发布。

- C++03：对 C++98 的一些修订，于 2003 年发布。

- C++11：于 2011 年发布，引入了许多新特性，如 `auto`、`nullptr`、`lambda`、`range-based for`、`smart pointer` 等。

- C++14：于 2014 年发布，对 C++11 进行了一些修订。

- C++17：于 2017 年发布，引入了一些新特性，如 `if` 语句中的初始化、`constexpr if`、`fold expression` 等。

- C++20：于 2020 年发布，引入了一些新特性，如 `concept`、`coroutine`、`ranges` 等。

- c++23：于 2023 年发布，进一步简化了代码编写和维护，增强了标准库和编译期功能，使开发更加高效。

  尤其是 `std::expected`、`std::flat_map`、`std::generator` 等，将使现代 C++ 开发更简洁、可靠。

### C++ 程序的结构

一个 C++ 程序主要由以下部分组成：

- **预处理器指令**：以 `#` 开头，告诉编译器在实际编译之前要完成的预处理。

- **函数**：一个基本的 C++ 程序包含一个或多个函数，其中必须有一个 `main()` 函数。

- **变量**：变量是程序中最基本的存储单元，用于存储数据。

- **语句 & 表达式**：语句是 C++ 程序的最小执行单元，表达式是语句的一部分。

- **注释**：注释是程序的解释性语句，用于提高代码的可读性。

- **标识符**：标识符是用来标识变量、函数、类、模块等用户自定义项目的名称。

- **关键字**：关键字是 C++ 语言的保留字，不能用作标识符。

例如：

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
```

### C++ 程序的执行

C++ 程序的执行过程主要包括以下几个步骤：

1. **预处理**：预处理器会处理以 `#` 开头的预处理指令，如 `#include`、`#define`、`#ifdef` 等。

2. **编译**：编译器会将预处理后的源文件编译成目标文件，目标文件是机器代码。

   这一步严格来说其实有两步，分别是编译和汇编，编译器会将源文件编译成汇编代码，然后汇编器将汇编代码转换成机器代码。

3. **链接**：链接器会将目标文件和库文件链接成可执行文件，可执行文件是二进制文件。

4. **运行**：操作系统会加载可执行文件到内存中，然后执行程序。

**手动编译执行**

现在的 IDE 都是集成了这些步骤，但是我们也可以手动执行这些步骤，

例如我们有两个文件 `main.cpp` 和 `math_utils.cpp`，其中 `math_utils.cpp` 定义了一个方法，`main.cpp` 调用了这个方法，

那么就需要链接这两个文件，然后编译执行，步骤如下：

```bash
# 编译
# 可以指定输出文件名（如果不指定，默认是同名的 .o 文件）
g++ -c math_utils.cpp -o math_utils.o
g++ -c main.cpp -o main.o
# 链接
g++ math_utils.o main.o -o main
# 运行
./main
```

可以进一步简化：

```bash
g++ math_utils.cpp main.cpp -o main
./main
```

简化后的命令会自动编译、链接，然后生成可执行文件。

编译后的中间结果是直接传给链接器的，并在链接完成后自动删除临时的中间文件，所以也不会产生多余的文件。

如果保留中间文件，就可以实现增量编译，只编译修改过的文件，这样可以提高编译速度。

### C++ 名词解释

- `GCC`：GNU Compiler Collection，GNU 编译器套件。

- `Clang`：一个 C、C++、Objective-C 和 Objective-C++ 编程语言的编译器前端。

- `LLVM`：Low Level Virtual Machine，一个编译器基础设施，包括编译器前端、优化器和后端。

- `STL`：Standard Template Library，标准模板库。

- `GUN`：GNU's Not Unix，GNU 是一个自由操作系统，类 Unix 系统。

- `MSVC`：Microsoft Visual C++ 编译器。

- `MSYS2`：一个软件包管理器和命令行工具集合，用于 Windows 上的软件开发，提供了类 Unix 环境。

- `MinGW`：Minimalist GNU for Windows，一个在 Windows 上使用 GCC 的开发环境。

### 堆和栈

它们都是内存中的一部分，用于存储程序运行时的数据，只是使用场景不相同。

#### 为什么要区分堆和栈？

局部变量的生命周期是在函数调用时创建，函数返回时销毁，遵循后进先出（LIFO）的原则，比较好管理，所以放在栈中。

而如果变量不仅仅在函数调用时存在，而是需要在程序的任何地方都可以访问，这个时候就无法知道什么时候销毁，就需要程序员自己来管理，所以放在堆中。

简单来说，就是有些内存使用系统是自动管理的，有些需要程序员手动管理，所以需要区分。

#### 区别

- **栈**：栈是一种数据结构，用于存储函数的局部变量、函数参数、返回地址等。栈是一种后进先出（LIFO）的数据结构。

  栈的大小是固定的，通常在 1MB 到 8MB 之间，由操作系统分配。

- **堆**：堆是一种动态分配的内存区域，用于存储程序运行时动态分配的数据。堆的大小是不固定的，由程序员手动分配和释放。

  堆的大小通常受限于操作系统的虚拟内存大小，可以通过 `new` 和 `delete` 运算符来分配和释放内存。

- 因为堆区的内存是动态分配的，而且要小心管理好内存，以及线程安全，所以堆区的效率比栈区要低。

## 数据类型

C++11 增加了很多新的数据类型，可以结合 [C++11 新特性](#c-11-新特性) 章节一起学习。

### 基本数据类型（Primitive Data Types）

#### 整数类型

| 数据类型    | 大小 (通常) | 取值范围                                                | 描述           |
| ----------- | ----------- | ------------------------------------------------------- | -------------- |
| `int`       | 4 字节      | -2,147,483,648 到 2,147,483,647                         | 标准的整型     |
| `short`     | 2 字节      | -32,768 到 32,767                                       | 短整型         |
| `long`      | 4 或 8 字节 | 根据平台不同                                            | 长整型         |
| `long long` | 8 字节      | -9,223,372,036,854,775,808 到 9,223,372,036,854,775,807 | 长整型（扩展） |
| `unsigned`  | 取决于类型  | 0 到正范围最大值                                        | 无符号类型     |

#### 字符类型

| 数据类型  | 大小     | 描述                              |
| --------- | -------- | --------------------------------- |
| `char`    | 1 字节   | 单个字符（ASCII 或 Unicode 编码） |
| `wchar_t` | 平台依赖 | 宽字符（通常用于 Unicode 编码）   |

#### 布尔类型

- `bool`: 仅包含两个值，`true` 或 `false`。

#### 浮点数类型

| 数据类型      | 大小    | 精度              | 描述           |
| ------------- | ------- | ----------------- | -------------- |
| `float`       | 4 字节  | ~6-7 位有效数字   | 单精度浮点数   |
| `double`      | 8 字节  | ~15-16 位有效数字 | 双精度浮点数   |
| `long double` | ≥8 字节 | 更高精度          | 扩展精度浮点数 |

### 枚举类型（Enumerated Types）

- 使用 `enum` 定义，允许创建一组命名的整数常量。

```c++
enum Color { RED, GREEN, BLUE }; // RED = 0, GREEN = 1, BLUE = 2
```

### 派生数据类型（Derived Data Types）

- 数组（Array）: 一组同类型元素

  ```c++
  int arr[5] = {1, 2, 3, 4, 5};
  ```

- 引用（Reference）: <u>类似于指针，但必须在初始化时绑定到变量</u>

  ```c++
  int y = 20;
  int& ref = y;
  ```

- 指针（Pointer）: 存储地址

  要取得变量的地址，需要使用 `&` 运算符，要声明指针变量，需要使用 `*` 运算符

  ```c++
  int x = 10;
  int* ptr = &x;
  ```

- 函数（Function）: 封装的可重复调用代码块

  ```c++
  int add(int a, int b) { return a + b; }
  ```

### 类和对象类型（Class and Object Types）

- 定义自定义类型，包含成员变量和函数

```c++
class Person {
public:
    string name;
    int age;
    void greet() { cout << "Hello, " << name << "!" << endl; }
};
```

### 空类型（Void Type）

- 用于没有返回值的函数。

```c++
void display() { cout << "Hello, World!" << endl; }
```

### 常量（Constants）

- `const`: 声明不可更改的变量。

  ```c++
  const int x = 42;
  ```

### 类型修饰符（Type Modifiers）

修饰数据类型以改变其大小或范围。

- `signed` / `unsigned`: 控制是否允许负值。
- `short` / `long`: 改变存储大小。

```c++
unsigned int u = 42; // 仅存储正数
```

### 类型转换（Type Casting）

#### 隐式类型转换

由编译器自动完成。

```c++
int x = 10;
float y = x; // int 自动转换为 float
```

#### 显式类型转换

程序员手动指定转换。

```c++
int x = 10;
float y = (float)x; // 显式转换为 float
```

### 窄字符和宽字符

字符类型 `char` 可以存储 ASCII 字符，但无法存储 Unicode 字符。为了支持 Unicode 字符，C++ 提供了 `wchar_t` 类型，称为宽字符类型。

```c++
char ch = 'A';        // 窄字符
wchar_t wch = L'中';  // 宽字符
```

在 C++ 中，字符串类型 `string` 是基于 `char` 类型的，而宽字符串类型 `wstring` 是基于 `wchar_t` 类型的。

```c++
string str = "Hello";        // 窄字符串
wstring wstr = L"你好";      // 宽字符串
```

**注意**: 默认 Windows 编译器是使用 Unicode 字符集的，所以在 Windows 上开发时，函数参数和字符串都应该使用宽字符类型。

### 跨字符集支持

为了编写同时支持 Unicode 和 ANSI 的代码，可以使用 `TCHAR`、`_T()`、`_TEXT()` 宏。

`_T` 和 `_TEXT` 宏会根据编译器设置自动转换为 ANSI 或 Unicode 字符串，`TCHAR` 类型会根据编译器设置自动转换为 `char` 或 `wchar_t` 类型。

```c++
#include <tchar.h>

TCHAR ch = _T('A');          // TCHAR 是 char 或 wchar_t
TCHAR str[] = _T("Hello");   // 字符串
```

在调用 Windows API 时，可以使用 `TEXT()` 宏来自动转换字符串，避免出现编译错误。

```c++
#include <windows.h>
#include <tchar.h>

int main() {
    MessageBox(NULL, TEXT("Hello, World!"), TEXT("Message"), MB_OK);
    return 0;
}
```

## 标准模板库（STL）

STL 是 C++ 标准库的一部分，提供了一组通用的模板类和函数，用于实现常见的数据结构和算法。

STL 主要包括以下几个组件：

- **容器（Containers）**：用于存储数据的类，如 `vector`、`list`、`map`、`set` 等。

- **容器适配器（Container Adapters）**：用于改变容器的接口，如 `stack`、`queue`、`priority_queue`。

- **迭代器（Iterators）**：用于遍历容器中的元素。

- **函数对象（Functors）**：重载了函数调用操作符 `()` 的类，可以像函数一样调用。也称为仿函数。

- **算法（Algorithms）**：用于处理容器中的元素，如 `sort`、`find`、`count`、`accumulate` 等。

### 标准输入与输出

`iostream` 是 C++ 标准库中的输入输出流类，下面是一个简单的例子：

```cpp
#include <iostream>

int main() {
    int x;
    std::cout << "Enter a number: ";
    std::cin >> x;
    std::cout << "You entered: " << x << std::endl;
    return 0;
}
```

- `<<`：输出运算符，用于向输出流中写入数据

- `>>`：输入运算符，用于从输入流中读取数据

- `std::cin`：标准输入流，用于从控制台读取输入

- `std::cout`：标准输出流，用于向控制台输出

- `std::endl`：换行符

标准库还提供了一些其他的流：

- `std::cerr`：标准错误流，用于向控制台输出错误信息

- `std::clog`：标准日志流，用于向控制台输出日志信息

- `std::flush`：刷新输出缓冲区

- `std::setprecision`：设置输出精度(小数点后的位数)

_还有一些对齐、填充等操作，可以查看 C++ 标准库的文档_

**注意**：`std::endl` 会刷新输出缓冲区，而 `'\n'` 只是换行，不会刷新缓冲区。

## C++11 新特性

### 新增数据类型

- `nullptr`: 用于表示空指针。

  ```c++
  int* ptr = nullptr;
  ```

- `auto`: 自动推导变量类型。

  ```c++
  auto x = 42; // x 是 int 类型
  ```

- `decltype`: 从表达式中推导类型。

  ```c++
  int x = 0;
  decltype(x) y = 5; // y 的类型与 x 相同
  ```

- `constexpr`: 编译期常量。

  ```c++
  constexpr int y = 10;
  ```

### 基于范围的 for 循环

- 用于遍历容器中的元素，可以自动确定循环次数。

```c++
vector<int> vec = {1, 2, 3, 4, 5};
for (auto x : vec) {
    cout << x << endl;
}
```

## 面向对象

### 析构函数

析构函数是类的特殊成员函数，用于释放资源、清理对象，它会在对象生命周期结束时自动调用。

#### 使用场景

析构函数的主要目的是避免资源泄漏。例如:

- 在构造函数中分配内存，在析构函数中释放内存。

- 在构造函数中打开文件，在析构函数中关闭文件。

- 在构造函数中建立数据库连接，在析构函数中关闭数据库连接。

#### 注意事项

- 析构函数没有参数，没有返回值。

- 避免在析构函数中抛出异常，如果异常被抛出，程序会调用 `std::terminate` 终止程序。

- 如果对象动态分配了内存，应该在析构函数中释放内存。

- **如果一个类是多态的，析构函数应该声明为虚函数**，以确保正确调用派生类的析构函数。

### 纯虚函数和抽象类

#### 纯虚函数

在 C++中，纯虚函数是用来定义在基类中声明但需要派生类实现的函数。它的声明形式如下：

```cpp
virtual void func() = 0;
```

- 纯虚函数没有函数体，只有声明。

- 包含纯虚函数的类称为抽象类。

- 抽象类不能实例化，只能作为基类。

#### 抽象类

抽象类是包含纯虚函数的类，不能实例化，只能作为基类。抽象类的目的是提供一个接口，让派生类实现。

```cpp
class Shape {
public:
    virtual void draw() = 0;  // 纯虚函数
};
```

### 头文件 & 源文件

在 C++ 中，通常将类的声明放在头文件中，将类的实现放在源文件中。

通过头文件和源文件的分离，可以避免重复包含头文件，提高编译效率。

**头文件**

头文件通常以 `.h` 或 `.hpp` 结尾，包含了类的声明、函数的声明等，而不包含函数的实现。

```cpp
// math_utils.h
#ifndef MATH_UTILS_H
#define MATH_UTILS_H

int add(int a, int b);  // 函数声明

#endif
```

**源文件**

源文件通常以 `.cpp` 结尾，包含了类的实现、函数的实现等。

```cpp
// math_utils.cpp
#include "math_utils.h"

int add(int a, int b) {  // 函数定义
    return a + b;
}
```

**使用**

在其他文件中，可以通过 `#include` 指令引入头文件，然后使用头文件中的函数。

```cpp
#include <iostream>
#include "math_utils.h"

int main() {
    int sum = add(1, 2);
    std::cout << "Sum: " << sum << std::endl;
    return 0;
}
```

**编译时的工作原理**

在编译时，编译器会将所有包含的头文件内容插入到源文件中，类似“复制粘贴”操作，然后对合并后的代码进行编译。这意味着头文件不会独立编译，而是直接成为包含它的源文件的一部分。

在上面的例子中，在编译时，编译器会将 `math_utils.h` 的内容插入到 `main.cpp` 中，使得 `main.cpp` 可以调用 `add` 函数。

## 模板

模板是 C++的一种功能，允许编写 **通用代码**，使代码能够在不同类型的数据上工作，而无需重复编写类似的逻辑。模板是 C++ 泛型编程的核心。

### 函数模板与类模板

#### 函数模板

函数模板允许编写一个通用函数，可以在不同类型的数据上工作。

```cpp
template <typename T1, typename T2>
void printPair(T1 a, T2 b) {
    std::cout << a << " and " << b << std::endl;
}

printPair(1, "hello"); // 输出 1 and hello
```

#### 类模板

类模板允许定义可以适用于不同类型的类。

```cpp
template <typename T>
class Box {
private:
    T value;
public:
    Box(T v) : value(v) {}    // 构造函数
    T getValue() { return value; }
};

Box<int> intBox(10);       // 类型为 int 的 Box
Box<double> doubleBox(3.14); // 类型为 double 的 Box

std::cout << intBox.getValue() << std::endl;
std::cout << doubleBox.getValue() << std::endl;
```

### 模板的参数

模板是 c++ 支持参数多态的一种方式，模板参数可以是类型参数、非类型参数、模板参数。

## 指针与内存管理

### 指针的声明和使用

指针是一个变量，存储另一个变量的地址。通过指针，可以访问和修改另一个变量的值。

我们可以通过 `*` 运算符来声明指针，通过 `&` 运算符来获取变量的地址。

```cpp
int a = 10;
int* p = &a; // 指针存储变量 a 的地址
*p = 20;     // 修改 a 的值
```

还可以直接进行指针的运算，如 `++`、`--`、`+`、`-` 等。

```cpp
int arr[] = {1, 2, 3, 4, 5};
int* p = arr;
p++; // 指向下一个元素
```

_**注意**： 因为数组名是一个指向数组第一个元素的指针，所以可以直接将数组名赋值给指针而不需要取地址。_

### new 和 delete 运算符

在 C++ 中，可以使用 `new` 运算符来动态分配内存，使用 `delete` 运算符来释放内存。

```cpp
int* p = new int; // 动态分配一个整型变量
*p = 10;
delete p; // 释放内存
```

如果是数组，可以使用 `new[]` 和 `delete[]` 运算符。

```cpp
int* arr = new int[5]; // 动态分配一个整型数组
delete[] arr; // 释放内存
```

### 使用注意事项

- 动态分配的内存需要手动释放，否则会导致内存泄漏。

- 声明指针时一定要初始化，可以声明时赋值为 `nullptr`，避免出现野指针。

- 避免使用悬垂指针，即指针指向的内存已经被释放。否则会导致未定义行为，例如程序崩溃、数据破坏或安全漏洞。

### 智能指针（现代 C++）

在 C++11 中引入了智能指针，用于管理动态分配的内存，避免内存泄漏和悬垂指针，它们包括：

- `std::unique_ptr`: 独占所有权的智能指针，只能有一个指针指向对象。

- `std::shared_ptr`: 共享所有权的智能指针，可以有多个指针指向对象。

- `std::weak_ptr`: 弱引用智能指针，不增加引用计数，用于解决 `std::shared_ptr` 的循环引用问题。

它们是在 C++ 标准库中定义的模板类，这些模板类定义了一个以堆内存空间为参数的构造函数，以及一个析构函数，用于释放内存。

```cpp
#include <memory>

std::unique_ptr<int> p1(new int); // 创建一个独占所有权的智能指针
std::shared_ptr<int> p2(new int); // 创建一个共享所有权的智能指针
std::weak_ptr<int> p3 = p2; // 创建一个弱引用智能指针
```

## Visual Studio

Visual Studio 是一个集成开发环境（IDE），支持多种编程语言，包括 C++。它提供了代码编辑、调试、构建和发布等功能，可以帮助开发者提高开发效率。

### 快捷键

- **Ctrl + F5** = 运行程序

- **F5** = 调试程序

- **Ctrl + Shift + B** = 生成解决方案

- **Ctrl + K, Ctrl + D** = 格式化代码

- **Ctrl + Shift + /** = 注释代码

  `Ctrl + K + C` 和 `Ctrl + K + U` 也可以用来注释和取消注释代码

### 基础概念及文件

- **解决方案（Solution）**：一个解决方案可以包含多个项目，用于组织和管理项目，如库项目、应用程序项目等。

  `.sln` 文件是解决方案文件，包含了解决方案的配置信息。

- **项目（Project）**：一个项目可以包含多个源文件、资源文件等，用于组织和管理代码。

  `.vcxproj` 文件是项目文件，包含了项目的配置信息。

- **Debug 和 Release 模式**：Debug 模式用于调试程序，包含调试信息，而 Release 模式用于发布程序，不包含调试信息。

  如果是开发阶段，可以使用 Debug 模式，如果是发布阶段，可以使用 Release 模式，以提高程序的性能。

- **x86 和 x64 架构**：x86 是 32 位架构，x64 是 64 位架构，可以根据需要选择不同的架构，推荐使用 x64 架构，以提高程序的性能。

### 项目属性

点击菜单栏中的 `项目` -> `项目属性`，可以设置项目的属性，如编译器、链接器、调试器等。

### Spy++

Spy++ 是 Visual Studio 的一个工具，用于查看和调试 Windows 程序的消息、窗口和控件。

你可以使用 Spy++ 来查看窗口的层次结构、消息的传递过程、窗口的属性等。

**如何找到 Spy++**

在 Visual Studio 中，可以通过以下方式找到 Spy++：

- 打开 Visual Studio，在菜单栏中点击 `工具` -> 选择 `Spy++`

- 在 Visual Studio 的安装目录下找到 `Spyxx.exe` 文件，如 `C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\Common7\Tools\spyxx.exe`

## CMake

CMake 是一个跨平台的构建工具，可以用简单的语句来描述所有平台的编译过程。它通常用于 C++ 项目，帮助开发者定义构建配置，如源文件、库和依赖项。

### 安装 CMake

在 macOS 上，可以使用 Homebrew 安装 CMake：

```bash
brew install cmake
```

### 使用 CMake

**创建项目**

在项目根目录下创建一个 `CMakeLists.txt` 文件，这是 CMake 的配置文件，用于描述项目的构建过程。

例如，下面是一个简单的 `CMakeLists.txt` 文件：

```cmake
cmake_minimum_required(VERSION 3.15)
project(MyProject)

set(CMAKE_CXX_STANDARD 14)

# 添加源文件
add_executable(MyProject main.cpp)
```

- `cmake_minimum_required(VERSION 3.15)`：指定 CMake 的最低版本。

- `project(MyProject)`：指定项目名称。

- `set(CMAKE_CXX_STANDARD 14)`：指定 C++ 标准。

- `add_executable(MyProject main.cpp)`：添加源文件，生成可执行文件。

  如果有多个源文件，可以这样添加：

  ```cmake
    add_executable(MyProject main.cpp foo.cpp bar.cpp)
  ```

**构建项目**

然后在项目根目录下创建一个 `build` 目录，用于存放编译生成的文件。

```bash
mkdir build
cd build
cmake ..
cmake --build .
```

- `cmake ..`：在 `build` 目录下生成 Makefile 构建文件。

  `..` 表示上一级目录，这是让 CMake 在上一级目录中查找 `CMakeLists.txt` 文件，从而配置项目。

- `cmake --build .`：使用 Makefile 文件构建项目。

**运行项目**

构建完成后，在 `build` 目录下会生成可执行文件，可以直接运行：

```bash
./MyProject
```

### 在 VSCode 中使用

在 VSCode 中，可以使用 CMake 插件，方便地进行 C++ 开发。

**安装插件**

在 VSCode 中，搜索安装 CMake 和 CMake Tools 插件。

**配置 CMake**

在项目根目录下创建一个 `.vscode` 目录，然后在 `.vscode` 目录下创建一个 `settings.json` 文件，用于配置 CMake。

```json
{
  "cmake.configureOnOpen": true,
  "cmake.generator": "Unix Makefiles"
}
```

- `cmake.configureOnOpen`：打开项目时自动配置 CMake。

- `cmake.generator`：指定生成器，如 `Unix Makefiles`、`Ninja` 等。

> 参考：[Configure CMake Tools settings](https://github.com/microsoft/vscode-cmake-tools/blob/main/docs/cmake-settings.md)

**构建项目**

1. **生成构建文件**：在 VSCode 中按 `Cmd + Shift + P`，输入 `CMake: Configure`。

2. **构建项目**：在 VSCode 中按 `Cmd + Shift + P`，输入 `CMake: Build`。

3. **运行项目**：在 `build` 目录下找到生成的可执行文件，然后运行。

### CMakeLists.txt

CMakeLists.txt 文件是 CMake 的配置文件，用于描述项目的构建过程。

### CMake 知识点

**CMake 是如何查找编译器的？**

CMake 会按照以下顺序查找编译器：

1. 如果用户在命令行中指定了编译器，CMake 会使用用户指定的编译器。

2. 如果用户没有指定编译器，CMake 会按照以下顺序查找编译器：

   - 如果用户在环境变量中设置了 `CC` 和 `CXX`，CMake 会使用环境变量中指定的编译器。

   - 如果用户没有设置环境变量，CMake 会使用默认的编译器。

3. 如果用户在 CMakeLists.txt 文件中指定了编译器，CMake 会使用 CMakeLists.txt 文件中指定的编译器。

CMake 找到一个合适的编译器后，会将其路径保存在 `CMakeCache.txt` 文件中的 `CMAKE_CXX_COMPILER` 变量中。

**CMake 指定编译器**

在 CMakeLists.txt 文件中，可以通过 `set` 命令指定编译器：

```cmake
set(CMAKE_CXX_COMPILER /path/to/your/g++)
```

或者在构建时通过 `-DCMAKE_CXX_COMPILER` 参数指定编译器：

```bash
cmake -DCMAKE_CXX_COMPILER=/path/to/your/g++ ..
```

## 相关知识及考点

### 编译相关

**什么是预编译？**

- 预编译是编译过程的第一个阶段，主要处理以 `#` 开头的预处理指令，如 `#include`、`#define`、`#ifdef` 等。

- 预编译的主要作用是将源文件中的预处理指令替换为实际的代码（替换代码文本），生成一个新的无预处理指令的中间文件。

这些预处理器指令通常用来：

- 文件包含：`#include` 指令用于包含头文件。

- 宏定义：`#define` 指令用于定义宏。

- 条件编译：`#ifdef`、`#ifndef`、`#if`、`#else`、`#elif`、`#endif` 等指令用于条件编译。

例如，可以使用一些编译器预定义的宏来判断编译器类型，并输出不同的信息：

```cpp
#include <iostream>

int main() {
    #if defined(__clang__)
        std::cout << "Compiler: Clang" << std::endl;
    #elif defined(__GNUC__) || defined(__GNUG__)
        std::cout << "Compiler: GCC" << std::endl;
    #elif defined(_MSC_VER)
        std::cout << "Compiler: MSVC" << std::endl;
    #else
        std::cout << "Unknown compiler" << std::endl;
    #endif
    return 0;
}
```
