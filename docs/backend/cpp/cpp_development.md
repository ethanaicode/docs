---
title: C++ 开发环境的搭建常用软件的使用以及编译运行知识汇总
---

# C++ 开发环境及编译运行

> 2025-01-03 创建
>
> 由于 C++的开发环境以及编译运行方式在不同的操作系统上有所不同，涉及知识较多，单独弄一个文档来记录。

## 环境搭建

### 基于 VStudio(Win)

在 Windows 上开发 C++ 程序，可以使用 Visual Studio，这个 IDE 集成了 C++ 编译器，可以方便地进行 C++ 开发。

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

### 使用 VSCode(Win/Mac)

Visual Studio Code (VSCode) 是一个轻量级但功能强大的代码编辑器，它支持多种编程语言，包括 C++。

无论是在 Windows 还是 macOS 上，VSCode 都可以提供高效的开发体验。

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

#### 其他资源

- [C++ 开发官方文档](https://code.visualstudio.com/docs/languages/cpp)

## Visual Studio 的使用

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

## CMake 构建工具

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
