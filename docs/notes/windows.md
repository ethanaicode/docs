---
title: Windows全面教程，快捷操作到高级技巧汇总
---

# Windows 笔记

## Windows Shortcut

Windows 快捷键是提高效率的好帮手，这里记录一些常用的快捷键:

- **Alt + Tab** = 切换窗口（可以实现快速在两个窗口间切换）

- **Win + D** = 显示桌面

- **Win + E** = 打开资源管理器

- **Win + R** = 打开运行

- **Win + X** = 打开快捷菜单

- **Win + L** = 锁定屏幕

- **Win + I** = 打开设置

- **Win + S** = 打开搜索

- **Win + Tab** = 切换任务视图

## Windows 实用技巧

### 特殊文件夹

在 Windows 中，有一些文件夹可以通过`shell:`命令来访问，这些文件夹包括:

- **shell:startup**: 开机启动文件夹(启动项)

  **shell:common startup**: 所有用户的开机启动文件夹

  放入此文件夹的程序会在系统启动时自动运行。

- **shell:sendto**: "发送到" 菜单中的文件夹

  可以在这里放入应用快捷方式，这样就可以右键发送到这个应用，和直接拖动文件到应用一样。

- **shell:programs**: 开始菜单中的程序文件夹

  **shell:common programs**: 所有用户的开始菜单中的程序文件夹

- **shell:appsfolder**: 应用程序文件夹

  这里存放了所有的应用程序快捷方式。

- **shell:quick launch**: 快速启动栏

  它的子目录 `User Pinned` --> `TaskBar` 是任务栏的快捷方式。

- **shell:appdata**: 应用程序数据文件夹

- **shell:recent**: 最近打开的文件

- **shell:favorites**: 收藏夹

- **shell:fonts**: 字体文件夹

- **shell:start menu**: 开始菜单

还有一些特殊文件夹可以通过环境变量来访问。

- **%AppData%** = `C:\Users\用户名\AppData\Roaming`

  用于存储应用程序的数据。

- **%LocalAppData%** = `C:\Users\用户名\AppData\Local`

  用于存储应用程序的本地数据。

- **%UserProfile%** = `C:\Users\用户名`

  用户文件夹。

- **%ProgramFiles%** = `C:\Program Files`

  程序文件夹。

- **%SystemRoot%** = `C:\Windows`

  Windows 系统文件夹。

- **%Public%** = `C:\Users\Public`

  公共文件夹。

- **%Temp% / %Tmp%** = `C:\Users\用户名\AppData\Local\Temp`

  临时文件夹。

### 环境变量

最常需要修改环境变量的场景就是修改 PATH 变量，可以加入新的路径，这样就可以在任意位置运行这个路径下的程序。

可以通过以下方法来修改环境变量:

- **系统环境变量**: 可以通过 `系统属性` --> `高级` --> `环境变量` 来修改系统环境变量。

- **用户环境变量**: 可以通过 `用户属性` --> `环境变量` 来修改用户环境变量。

**注意**: 添加的路径应该是一个目录，系统会自动寻找这个目录下的可执行文件，如果直接添加可执行文件路径，是无法生效的。

## Windows 命令

### 基础常用命令

- **shutdown** = 关机

  `/s` 关机

  `/r` 重启

  `/a` 取消关机

  `/t` 设置延迟时间

  `/f` 强制关闭

  `/l` = 注销

  例如：`shutdown /s /t 0` 立即关机

### CMD 常用命令

#### 文件与目录操作

| 功能             | CMD 命令                   | 说明                                               |
| ---------------- | -------------------------- | -------------------------------------------------- |
| 查看当前目录文件 | `dir`                      | 类似 Linux 的 `ls`，列出当前路径下所有文件和目录。 |
| 切换目录         | `cd <路径>`                | 切换到指定路径。例如：`cd C:\Windows`。            |
| 查看当前路径     | `cd`                       | 显示当前工作目录。                                 |
| 创建文件         | `echo > <文件名>`          | 创建一个空文件。例如：`echo > test.txt`。          |
| 创建目录         | `mkdir <目录名>`           | 创建一个新目录。                                   |
| 删除目录         | `rmdir <目录名>`           | 删除空目录。如果目录非空，使用 `rmdir /s`。        |
| 删除文件         | `del <文件名>`             | 删除指定文件。例如：`del test.txt`。               |
| 复制文件         | `copy <源文件> <目标路径>` | 复制文件。例如：`copy test.txt D:\Backup`。        |
| 移动文件         | `move <源文件> <目标路径>` | 移动文件。例如：`move test.txt D:\Docs`。          |
| 重命名文件/目录  | `rename <旧名> <新名>`     | 重命名文件或目录。                                 |

- **注意**: 在 CMD 中，`cd` 命令只能切换目录，不能跨盘符切换目录。如果要切换到其他盘符，需要 `/d` 参数。

  例如：`cd /d D:\` 切换到 D 盘。

---

#### 系统与任务管理

| 功能             | CMD 命令                | 说明                                               |
| ---------------- | ----------------------- | -------------------------------------------------- |
| 查看当前时间     | `time`                  | 显示或修改系统时间。                               |
| 查看当前日期     | `date`                  | 显示或修改系统日期。                               |
| 查看系统信息     | `systeminfo`            | 显示系统详细信息，例如内存、操作系统版本等。       |
| 查看网络配置信息 | `ipconfig`              | <u> 显示网络配置信息</u>                           |
| 显示进程列表     | `tasklist`              | 列出当前运行的所有进程。                           |
| 结束指定进程     | `taskkill /im <进程名>` | 结束指定的进程。例如：`taskkill /im notepad.exe`。 |
| 清屏             | `cls`                   | <u>清除屏幕显示的内容</u>                          |

---

#### 磁盘与文件检查

| 功能         | CMD 命令                    | 说明                                    |
| ------------ | --------------------------- | --------------------------------------- |
| 显示磁盘列表 | `wmic logicaldisk get name` | 列出所有逻辑磁盘（如 C: D:）。          |
| 检查磁盘     | `chkdsk <盘符>`             | 检查磁盘错误。例如：`chkdsk C:`。       |
| 显示文件内容 | `type <文件名>`             | 显示文件的内容。例如：`type test.txt`。 |
| 搜索文件     | `dir /s <文件名>`           | 搜索指定文件。例如：`dir /s test.txt`。 |

---

#### 网络相关

| 功能             | CMD 命令             | 说明                                                     |
| ---------------- | -------------------- | -------------------------------------------------------- |
| 查看网络连接状态 | `netstat`            | 显示当前网络连接状态。                                   |
| 测试网络连通性   | `ping <目标地址>`    | 测试与目标地址的网络连接。例如：`ping 8.8.8.8`。         |
| 跟踪路由         | `tracert <目标地址>` | 显示数据包到目标的路由。例如：`tracert www.google.com`。 |

---

#### 其他常用命令

| 功能         | CMD 命令            | 说明                                       |
| ------------ | ------------------- | ------------------------------------------ |
| 查看帮助     | `<命令> /?`         | 显示指定命令的帮助。例如：`dir /?`。       |
| 退出 CMD     | `exit`              | 关闭 CMD 窗口。                            |
| 暂停输出     | `pause`             | 暂停当前命令执行，按任意键继续。           |
| 显示环境变量 | `set`               | 显示所有环境变量。                         |
| 设置环境变量 | `set <变量名>=<值>` | 设置环境变量。例如：`set PATH=C:\MyPath`。 |
| 查看系统路径 | `echo %PATH%`       | 显示系统的 PATH 环境变量。                 |

### CMD BAT 脚本

#### 基础语法

bat 脚本是一种批处理文件，可以用于批量处理任务。可以通过建立一个 `.bat` 文件，然后在 cmd 中运行这个文件来执行一系列命令。

bat 脚本和 linux 的 shell 脚本类似，可以参考着一起学习 [《Bash 脚本教程》](../backend/bash)

**bat 脚本基础语法**：

- `@echo off`: 关闭命令回显

- `setlocal`: 开始局部变量(局部作用域)

- `echo`: 输出信息

- `pause`: 暂停

  通常放在脚本的最后，以便查看执行结果。（此时会有一个提示，按任意键继续）

- `exit`: 退出脚本

  `exit /b %errorlevel%` 退出脚本并返回退出码

- `::`: 注释

- `if`: 条件判断

  例如：`if exist file.txt echo 文件存在`

- `goto`: 跳转

  例如：`goto :label` 跳转到 `:label` 标签处

  - `:label`: 标签

- `rmdir`: 删除目录

  例如：`rmdir /s /q dir` 删除目录

  - `/s` 删除目录及其子目录

  - `/q` 安静模式

- `del`: 删除文件

  例如：`del /q file.txt` 删除文件

  - `/q` 安静模式

- `copy`: 复制文件

  例如：`copy file1.txt file2.txt` 复制文件

- `call another.bat`: 调用另一个 bat 文件

  并等待其执行完成，返回后可以通过 `%errorlevel%` 捕获退出码。

#### 实用技巧

**获取当前脚本所在目录**

可以通过特殊变量和命令获取当前脚本的执行位置（脚本所在的目录路径）。

```bat
@echo off
echo 当前脚本所在目录是: %~dp0
pause
```

- `%~dp0`：获取当前脚本的执行位置

  `d` 驱动器号，例如 `C:\`

  `p` 路径，例如 `C:\Users\`

  `0` 脚本名称，例如 `test.bat`

**避免中文乱码**

批处理文件默认使用控制台的代码页，通常是 437 或 936（中文）。设置正确的代码页可以避免乱码。

```bat
@echo off
:: 设置控制台为 UTF-8
chcp 65001 >nul

:: 示例输出中文
echo 中文测试
pause
```

- `chcp 65001`：设置控制台代码页为 UTF-8

  `65001` 是 UTF-8 的代码页。类似的还有 `936`（简体中文）。

### PowerShell

_PowerShell 提供的命令很多都有简写，比如 `Get-Process` 可以简写为 `gps`_

#### 常用命令

- `Get-Command`: <u>查看命令的路径</u>

  类似于 Linux 的 `which` 命令。

  可以利用这个来判断命令是否存在，如:

  ```powershell
  if (-Not (Get-Command "magick" -ErrorAction SilentlyContinue)) {
      Write-Host "ImageMagick is not installed."
      exit 1
  }
  ```

- `Get-ChildItem`: <u>获取文件或者目录</u>

  `Get-ChildItem -Path C:\` 查看 C 盘文件

  `Get-ChildItem Env:` 查看环境变量

  `-Recurse` 参数可以递归查看文件

  `-Filter` 参数可以过滤文件

  返回的值可以继续操作，如：

  - `$result.Count` 查看文件数量

  - `$result | ForEach-Object { $_.Name }` 查看文件名

- `Get-Content your_log_file.log -Wait`: 实时查看文件内容

  `-Wait` 参数可以实时查看文件内容

- `Set-Location`: 切换目录

- `$env:<EnvName>`: 查看环境变量

  `$env:Path -split ';'` 查看 Path 环境变量，以分号分隔

- `curl`: 下载文件（从 Windows 10 1803 版本开始，PowerShell 自带了 `curl` 命令）

  例如：`curl -o file.zip https://example.com/file.zip`

  需要指定 `-o` 参数来保存文件，否则会直接输出文件信息到控制台。

#### 权限设置

- `Get-ExecutionPolicy`: 查看脚本执行策略

  `Restricted` 禁止执行任何脚本

  `RemoteSigned` 允许本地脚本，但下载的脚本需要签名

  `Unrestricted` 允许执行任何脚本

  `AllSigned` 所有脚本都需要签名

- `Set-ExecutionPolicy`: 设置脚本执行策略

  `Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope CurrentUser` 设置当前用户脚本执行策略为不受限制（允许执行任何脚本）

  `Set-ExecutionPolicy -ExecutionPolicy Undefined -Scope CurrentUser` 恢复默认脚本执行策略

#### 文件权限

- `Get-Acl`: 查看文件权限

  例如：`Get-Acl C:\Windows`

#### 网络操作

- `Test-Connection -ComputerName www.example.com`: 测试网络连接

  `-count 4` 参数可以指定测试次数

  `-quiet` 参数可以只显示结果

- `Invoke-WebRequest -Uri "https://www.example.com"`: 下载网页

- `Test-NetConnection -ComputerName www.example.com -Port 443`: 测试端口连接

  更全面的测试工具，可测试指定的端口或服务。

- `Resolve-DnsName -Name www.example.com`: 解析域名

  `-Type` 参数可以指定解析类型，如 `A`、`AAAA`、`MX`、`NS` 等。

#### 进程管理

- `tasklist`: 查看进程列表

- `taskkill`: 结束进程

  例如：`taskkill /f /im notepad.exe` 结束记事本进程

- `Get-Process`: PowerShell 查看进程

  例如：`Get-Process chrome` 查看 Chrome 进程

- `Stop-Process`: PowerShell 结束进程

  例如：`Stop-Process -Name notepad` 结束记事本进程

#### 实用技巧

**更新环境变量**

更新 Path 变量后，不想重启 PowerShell，但想里面的命令生效，可以使用以下命令，来立刻更新环境变量。

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine")
```

## PowerShell 脚本

### 基础语法

#### 脚本参数

在 `PowerShell` 中，可以通过参数来传递数据，通常它们是脚本的输入。

```powershell
param (
    [Parameter(Mandatory=$true)]
    [string]$name
)
```

- `param`: 定义参数

- `[Parameter(Mandatory=$true)]`: 参数必须传递

- `[string]`: 参数类型

### 运算符

#### 调用运算符

- `&`: 调用命令

  例如：`& "C:\Program Files\Notepad++\notepad++.exe"`

  如果是动态调用，需要使用 `&` 运算符，否则可能不会被识别为命令。

  ```bash
  $scriptPath = "C:/scripts/my_script.ps1"
  & $scriptPath
  ```

### 函数

#### 定义函数

```powershell
function Get-Hello {
    param (
        [string]$name
    )
    Write-Host "Hello, $name!"
}
```

#### 调用函数

```powershell
Get-Hello -name "World"
```

### 条件判断

#### if

`if` 判断语句用于根据条件执行不同的代码块。支持多种条件判断，包括:

- `-eq`: 等于

  `-ne` 不等于

  `-gt` 大于

  `-lt` 小于

  `-ge` 大于等于

  `-le` 小于等于

- `-Not` 非

#### $LASTEXITCODE

`$LASTEXITCODE` 变量保存了上一个命令的退出码。

```powershell
$command = "echo Hello"
Invoke-Expression $command
if ($LASTEXITCODE -eq 0) {
    Write-Host "Command executed successfully."
} else {
    Write-Host "Command failed."
}
```

### 文件及目录

- `Test-Path`: <u> 测试路径是否存在</u>

  `-Path` 参数可以指定路径

  例如：`Test-Path -Path "C:\Windows"`

- `Join-Path`: <u>接路径</u>

  例如：`Join-Path -Path "C:\" -ChildPath "Windows"`

- `New-Item`: <u>创建文件或目录</u>

  例如：`New-Item -ItemType Directory -Path "C:\Temp" | Out-Null`

### 输出与日志

#### 输出命令

- `Write-Host`: <u>输出信息</u>

  例如：`Write-Host "Hello, World!"`

- `Write-Output`: 管道输出数据
