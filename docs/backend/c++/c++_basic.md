# C++ 基础知识

> 2024-10-14 20:24 开坑

## 环境搭建

### Windows 上开发 C++

在 Windows 上开发 C++ 程序，可以使用 Visual Studio，这个 IDE 集成了 C++ 编译器，可以方便地进行 C++ 开发。

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
