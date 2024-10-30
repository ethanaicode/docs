# C++ 基础知识

> 2024-10-14 20:24 开坑

## 环境搭建

### Windows 上开发 C++

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

### macOS 上开发 C++

macOS 上可以使用 Xcode 进行 C++ 开发，Xcode 也集成了 C++ 编译器。

如果习惯了 VSCode，可以安装 C/C++ 扩展，然后配置好编译器，也可以进行 C++ 开发。

**设置编译器**

在 macOS 上，很多时候已经预安装了 `clang` 编译器，可以直接使用。检查是否安装了 `clang`：

```bash
clang --version
```

或者使用 `g++` 编译器：

```bash
g++ --version
```

如果已经安装，则会显示编译器的版本信息。

**安装 VSCode 插件**

在 VSCode 中，可以安装 C/C++ 扩展，这个插件提供了 C++ 的代码高亮、智能提示、代码格式化、调试等功能。

**开始第一个项目**

在 VSCode 中，新建一个 C++ 文件，如 `main.cpp`，然后输入以下代码：

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
```

然后按 `Cmd + Shift + B`，选择 `C/C++: g++ build active file`，即可编译运行。

或者点击右上角的 `Run` 按钮，也可以编译运行。

**编译器的选择**

在 VSCode 中，可以使用 `g++` 编译器，也可以使用 `clang` 编译器。

- `clang/clang++` 编译器：macOS 预装的编译器，它是 Xcode 的默认编译器，支持 C++11、C++14、C++17 等标准。

- `g++/gcc` 编译器：GNU 编译器，具有更好的跨平台性，支持 C++11、C++14、C++17 等标准。

如果是学习 C++，可以使用 `g++` 编译器，因为它的错误提示更友好，更容易理解。

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

## 面向对象

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
