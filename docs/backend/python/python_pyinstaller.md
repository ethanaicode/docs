# PyInstaller

PyInstaller 是一个用于将 Python 脚本打包成可执行文件的工具。它可以将 Python 脚本打包成 Windows、Linux 和 macOS 下的可执行文件。

## PyInstaller 的使用

### 基础使用

`PyInstaller` 最基础的使用方法是：

```bash
pyinstaller --onefile --windowed --name=appname myscript.py
```

- `--onefile` 选项会将所有文件打包成一个可执行文件。

- `--windowed` 选项会隐藏控制台窗口，**额外**生成一个 GUI 应用程序。

- `--name=appname` 选项会指定生成的可执行文件的名称。

**执行命令后：**

PyInstaller 会分析 `myscript.py` 并：

1. 在与脚本相同的文件夹中写入 `myscript.spec` 文件。

2. 在与脚本相同的文件夹中创建一个 `build` 文件夹（如果不存在）。

3. 在 `build` 文件夹中写入一些日志文件和工作文件。

4. 在与脚本相同的文件夹中创建一个 `dist` 文件夹（如果不存在）。

5. 在 `dist` 文件夹中写入 `myscript` 可执行文件夹。

6. 在 `dist` 文件夹中，你会找到打包后的应用程序，供用户分发。

**spec 文件：**

如果你编辑了 `myscript.spec` 的内容，编辑后你可以直接把 `spec` 文件作为参数传递给 `pyinstaller`：

```bash
pyinstaller myscript.spec
```

### 添加文件

默认情况下，PyInstaller 只打包 Python 标准库和第三方库.

如果你的脚本依赖于其他文件，你需要使用 `--add-data` 选项来添加这些文件。

如果有多个文件需要添加，可以多次使用 `--add-data` 选项。

```bash
pyinstaller --add-data 'src:dst' --onefile --windowed myscript.py
```

- `src` 是源文件或目录。

- `dst` 是目标文件或目录。

**注意**: 在 Windows 系统中，`src` 和 `dst` 之间使用分号（;）分隔。

### PyInstaller 的选项

#### 通用选项列表

- `--onefile`：将所有文件打包成一个可执行文件（简写：`-F`）

  运行时会解压到临时目录，程序中可以通过参数`sys._MEIPASS`获取到临时目录的路径

  `--onedir`: 默认选项，将所有文件打包成一个文件夹

- `--windowed`：隐藏控制台窗口，额外生成一个 GUI 应用程序（简写：`-w`）

- `--icon=icon.ico`：指定应用程序的图标（简写：`-i icon.ico`）

- `--name=appname`：指定生成的可执行文件的名称

- `--add-data 'src:dst'`：添加非代码文件到你的包里

  在 Unix 系统中使用冒号（:）而在 Windows 中使用分号（;）作为分隔符

  单执行文件中，执行时添加的文件会被释放到临时目录，如果是单目录，则在生成的目录中

- `--distpath=dir`：指定输出目录

- `--workpath=dir`：指定工作目录

- `--specpath=dir`：指定 spec 文件的输出目录

- `--clean`：清理临时文件

- `--noconfirm`：替换输出目录中的文件时不提示

- `--hidden-import=module`：指定打包过程中需要包含的隐藏导入

- `--exclude-module=module`：指定打包过程中需要排除的（减小最终文件的体积）

- `--noconfirm`：替换输出目录中的文件时不提示

#### Windows 选项列表

- `--version-file=version_info.txt`：指定版本文件（Windows）

- `--uac-admin`：请求管理员权限（Windows）

#### macOS 选项列表

- `--osx-bundle-identifier=com.mycompany.myproduct`：指定应用程序包标识符（macOS）

## Windows 自定义包信息

### 图标格式

Windows 下的应用图标格式是 `.ico`。

### 定义应用信息

`version.txt` 版本文件主要用于为 Windows 可执行文件添加元数据，这是 Windows 操作系统特有的功能。

## macOS 自定义包信息

### 图标格式

macOS 下的应用图标格式是 `.icns`。

### 定义应用信息

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
    'CFBundleName': '显示的应用名称',
    'CFBundleDisplayName': '显示的应用名称',
    'CFBundleIdentifier': 'com.shejibiji.myscript',
    'CFBundleInfoDictionaryVersion': '6.0',
    'CFBundleShortVersionString': '0.0.1',
    'CFBundleVersion': '0.0.1',
    'CFBundleExecutable': 'myscript',
    'CFBundleIconFile': 'myscript.icns',
    'CFBundlePackageType': 'APPL',
    'NSHumanReadableCopyright': 'Copyright © 2024',
    'NSHighResolutionCapable': True,
    },
)
```

## MacOS 安装包 dmg

### 创建 dmg 文件

将`.app`文件打包成`.dmg`文件，可以提供更专业的安装体验、保护文件完整性、减少文件体积、支持签名和公证，同时还可以自定义界面，增强用户的安装体验。

这些优点使得`.dmg`文件成为 macOS 下分发应用程序的首选方式。

在 macOS 下，可以使用 `hdiutil` 命令来创建一个 dmg 文件，用于分发应用程序。

```bash
hdiutil create -volname "MyApp" -srcfolder dist/MyApp.app -ov -format UDZO MyApp.dmg
```

- `-volname "MyApp"`：指定 dmg 文件的名称。

- `-srcfolder dist/MyApp.app`：指定要打包的应用程序。

- `-ov`：覆盖已存在的 dmg 文件。

- `-format UDZO`：指定 dmg 文件压缩格式。

- `MyApp.dmg`：指定生成的 dmg 文件的名称。

### 自定义 dmg 界面

如果你希望自定义 dmg 文件的界面，比如实现让用户看到一个漂亮的背景图片、拖拽图标到应用程序文件夹等功能，可以使用以下方法实现。

- 手动设置 `.dmg` 界面；

  原理是创建一个 `UDRW` （可写磁盘映像）格式的 dmg 文件，然后挂载这个 dmg 文件，这个时候就可以直接编辑这个镜像，最后使用 `hdiutil` 命令将这个 dmg 文件转换成 `UDZO` 格式。

- 使用第三方工具，比如 `create-dmg` 或者 `DMG Canvas`。

**使用第三方工具**

目前在 github 上有两个项目，一个是 npm 包，一个是 shell 脚本，可以根据自己的需求选择使用。

- NPM 包：[sindresorhus/create-dmg](https://github.com/sindresorhus/create-dmg)

  作者不希望增加太多选项，所以导致可以自定义的地方比较少，但确实使用起来非常方便。

- Shell 脚本：[create-dmg](https://github.com/create-dmg/create-dmg)

  这个项目是基于 shell 脚本的，可以通过命令行来配置 dmg 文件的各种属性，比如背景图片、图标位置、窗口大小等。

#### 手动创建 dmg 界面

1. **创建并打开 `.dmg` 文件**

   首先创建 `.dmg` 文件，格式可以为 `UDRW`（可写磁盘映像），这样可以先进行编辑。完成编辑后再将其转换为压缩格式（`UDZO`）供分发。

   ```bash
   hdiutil create -volname "YourAppName" -srcfolder path/to/your_app.app -ov -format UDRW temp.dmg
   ```

2. **装载 `.dmg` 文件**

   ```bash
   hdiutil attach temp.dmg
   ```

   这样会将 `.dmg` 装载到系统中，并打开一个 Finder 窗口，可以在此窗口中进行界面编辑。

3. **调整 Finder 窗口布局**

   将 `.app` 文件图标拖到左侧。

   将 “Applications” 文件夹快捷方式拖到右侧（按 `Command+Shift+G`，在跳转窗口中输入 `/Applications`，然后拖到 `.dmg` 窗口中）。

   调整图标位置和大小，并设置窗口的背景颜色或背景图片（右键窗口空白区域 -> 显示简介 -> 背景）。

4. **设置窗口默认显示选项**

   选中 `.dmg` 窗口后，按 `Command+J` 打开显示选项，设置窗口大小、背景图片、图标大小等内容。

5. **移除并转换为压缩格式**

   完成界面设置后，卸载 `.dmg`：

   ```bash
   hdiutil detach /Volumes/YourAppName
   ```

   将 `.dmg` 文件转换为只读压缩格式供分发：

   ```bash
   hdiutil convert temp.dmg -format UDZO -o YourAppName.dmg
   ```

#### sindresorhus/create-dmg

npm 包 `create-dmg` 使用非常简单，使用 npm 安装后，只需要执行一个命令即可：

```bash
create-dmg dist/MyApp.app output/ --overwrite ---dmg-title="MyApp"
```

- `dist/MyApp.app`：指定要打包的应用程序。

- `--overwrite`：覆盖已存在的 dmg 文件。

- `--dmg-title="MyApp"`：指定 dmg 文件的名称。

**注意**: 程序总是会尝试代码签名，如果没有的话最后会提示签名失败，但不影响 DMG 文件的生成。

**下面是通过查看源码获取到一些信息：**

- 生成的文件名中的版本号来自于应用程序的 `CFBundleShortVersionString`。

#### create-dmg/create-dmg

这个项目是基于 shell 脚本的，支持丰富的配置选项，可以通过命令行来配置 dmg 文件的各种属性。

这是官方给的一个例子：

```bash
#!/bin/sh
test -f Application-Installer.dmg && rm Application-Installer.dmg
create-dmg \
  --volname "Application Installer" \
  --volicon "application_icon.icns" \
  --background "installer_background.png" \
  --window-pos 200 120 \
  --window-size 800 400 \
  --icon-size 100 \
  --icon "Application.app" 200 190 \
  --hide-extension "Application.app" \
  --app-drop-link 600 185 \
  "Application-Installer.dmg" \
  "source_folder/"
```

## 实践技巧及注意事项

### 单执行文件还是单目录

如果使用了`--onefile`模式，运行时需要被解压到临时目录。程序会先打开，执行解压操作，然后程序会被关闭，解压完成后才会自动打开，所以总是先关闭一次再打开。

会带来两个问题：1. 会有一次闪烁；2. 打开速度会变慢。好处是单文件打包的程序体积小，方便分发。

`--onedir`模式的程序会直接打开，不会有闪烁，打开速度快，但因为单目录打包模式不会对依赖压缩，所以体积会大一些。

如果体积优先且不在意打开速度，可以使用`--onedir`模式，如果希望更快的启动速度，可以使用`--onefile`模式，特别是对体积不是很敏感的情况下。

## 常见问题

### FileExistsError: [Errno 17] File exists: ...

这个问题通常出现在 `--add-data` 选项中，当你添加了一个文件，但是这个文件已经存在于输出目录中时，就会出现这个错误。

**解决方法：** 删除缓存目录（bincache）

你可以在错误中看到缓存目录的路径，删除 `bincache` 相关的目录文件后再次运行即可，比如：

```bash
rm -rf /Users/ethan/Library/Application\ Support/pyinstaller/bincache*
```
