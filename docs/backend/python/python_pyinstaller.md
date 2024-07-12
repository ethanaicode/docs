# PyInstaller

PyInstaller 是一个用于将 Python 脚本打包成可执行文件的工具。它可以将 Python 脚本打包成 Windows、Linux 和 macOS 下的可执行文件。

## PyInstaller 的使用

### 基础使用

`PyInstaller` 最基础的使用方法是：

```bash
pyinstaller --onefile --windowed myscript.py
```

- `--onefile` 选项会将所有文件打包成一个可执行文件。
- `--windowed` 选项会隐藏控制台窗口，**额外**生成一个 GUI 应用程序。

PyInstaller 会分析 `myscript.py` 并：

- 在与脚本相同的文件夹中写入 `myscript.spec` 文件。
- 在与脚本相同的文件夹中创建一个 `build` 文件夹（如果不存在）。
- 在 `build` 文件夹中写入一些日志文件和工作文件。
- 在与脚本相同的文件夹中创建一个 `dist` 文件夹（如果不存在）。
- 在 `dist` 文件夹中写入 `myscript` 可执行文件夹。
- 在 `dist` 文件夹中，你会找到打包后的应用程序，供用户分发。

如果你编辑了 `myscript.spec` 的内容，编辑后你可以直接把 `spec` 文件作为参数传递给 `pyinstaller`：

```bash
pyinstaller myscript.spec
```

默认情况下，PyInstaller 只打包 Python 标准库和第三方库，如果你的脚本依赖于其他文件，你需要使用 `--add-data` 选项来添加这些文件。

```bash
pyinstaller --add-data 'src:dst' --onefile --windowed myscript.py
```

- `src` 是源文件或目录。
- `dst` 是目标文件或目录。

之后，你可以在 `dist` 文件夹中找到打包后的应用程序。

### PyInstaller 的选项

#### 常用选项

- `--onefile`：将所有文件打包成一个可执行文件
- `--windowed`：隐藏控制台窗口，额外生成一个 GUI 应用程序
- `--icon=icon.ico`：指定应用程序的图标
- `--name=appname`：指定生成的可执行文件的名称
- `--distpath=dir`：指定输出目录
- `--workpath=dir`：指定工作目录
- `--specpath=dir`：指定 spec 文件的输出目录
- `--clean`：清理临时文件
- `--noconfirm`：替换输出目录中的文件时不提示
