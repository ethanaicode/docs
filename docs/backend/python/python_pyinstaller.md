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

#### 选项列表

- `--onefile`：将所有文件打包成一个可执行文件（运行时会解压到临时目录）

  `--onedir`: 默认选项，将所有文件打包成一个文件夹

- `--windowed`：隐藏控制台窗口，额外生成一个 GUI 应用程序

- `--icon=icon.ico`：指定应用程序的图标

- `--name=appname`：指定生成的可执行文件的名称

- `--add-data 'src:dst'`：添加非代码文件到你的包里

  在 Unix 系统中使用冒号（:）而在 Windows 中使用分号（;）作为分隔符（测试时好像不是这样的，需要确认）

  另外，如果是单执行文件，执行时会被释放到临时目录，程序中可以通过参数`sys._MEIPASS`获取到，如果是单目录，则在目标目录中

- `--distpath=dir`：指定输出目录

- `--workpath=dir`：指定工作目录

- `--specpath=dir`：指定 spec 文件的输出目录

- `--clean`：清理临时文件

- `--noconfirm`：替换输出目录中的文件时不提示

- `--hidden-import=module`：指定打包过程中需要包含的隐藏导入

- `--exclude-module=module`：指定打包过程中需要排除的（减小最终文件的体积）

- `--version-file=version_info.txt`：指定版本文件（Windows）

  有些时候自动侦测可能不会包含一些模块。

#### 版本文件

版本文件主要用于为 Windows 可执行文件添加元数据，这是 Windows 操作系统特有的功能。

`version_info.txt` 文件的格式如下：

```txt
CompanyName: Your Company
FileDescription: Your Program
FileVersion: 1.0.0
InternalName: Your Program
LegalCopyright: Your Company
OriginalFilename: Your Program.exe
ProductName: Your Program
ProductVersion: 1.0.0
```

macOS 不使用与 Windows 相同的可执行文件资源系统来处理版本信息或其他元数据。
在 macOS 上，应用程序通常使用包（Bundle）结构，其中包含一个名为 Info.plist 的属性列表文件，用于存储应用程序的元数据，如版本号、应用程序标识符、版权信息等。

### Windows 下的打包

下面是一个基础的打包构建命令：

```bash
pyinstaller -F -w -i icon.ico -n appname myscript.py
```

- `-F`：`--onefile` 的缩写
- `-w`：`--windowed` 的缩写
- `-i icon.ico`：指定应用程序的图标
- `-n appname`：指定生成的可执行文件的名称

### macOS 下的打包

在 macOS 上，PyInstaller 会生成一个 `.app` 文件，这是一个应用程序包（Bundle）。

macOS 下软件的相关信息通常存储在 Info.plist 文件中，PyInstaller 会自动生成这个文件。

如果你需要定义更详细的信息，只能通过编辑 `myscript.spec` 文件来实现。

```bash
app = BUNDLE(exe,
         name='myscript.app',
         icon=None,
         bundle_identifier=None,
         version='0.0.1',
         info_plist={
            'NSPrincipalClass': 'NSApplication',
            'NSAppleScriptEnabled': False,
            'CFBundleDocumentTypes': [
                {
                    'CFBundleTypeName': 'My File Format',
                    'CFBundleTypeIconFile': 'MyFileIcon.icns',
                    'LSItemContentTypes': ['com.example.myformat'],
                    'LSHandlerRank': 'Owner'
                    }
                ]
            },
         )
```

### Mac OS 和 Windows 的应用图标格式

- Windows：`.ico` 格式

- Mac OS：`.icns` 格式
