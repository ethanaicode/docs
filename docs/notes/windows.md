# Windows 笔记

## Windows Shortcut

Windows 快捷键是提高效率的好帮手，这里记录一些常用的快捷键。

- **Alt + Tab** = 切换窗口（可以实现快速在两个窗口间切换）

- **Win + D** = 显示桌面

- **Win + E** = 打开资源管理器

- **Win + R** = 打开运行

- **Win + X** = 打开快捷菜单

- **Win + L** = 锁定屏幕

- **Win + I** = 打开设置

- **Win + S** = 打开搜索

- **Win + Tab** = 切换任务视图

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

### CMD BAT 脚本

#### BAT 脚本基础语法

bat 脚本是一种批处理文件，可以用于批量处理任务。可以通过建立一个 bat 文件，然后在 cmd 中运行这个文件来执行一系列命令。

**bat 脚本基础语法**：

- **@echo off**: 关闭命令回显

- **echo**: 输出信息

- **pause**: 暂停

  通常放在脚本的最后，以便查看执行结果。（此时会有一个提示，按任意键继续）

- **exit**: 退出脚本

- **::**: 注释

- **if**: 条件判断

  例如：`if exist file.txt echo 文件存在`

- **goto**: 跳转

  例如：`goto :label` 跳转到 `:label` 标签处

  - **:label**: 标签

- **rmdir**: 删除目录

  例如：`rmdir /s /q dir` 删除目录

  - `/s` 删除目录及其子目录

  - `/q` 安静模式

- **del**: 删除文件

  例如：`del /q file.txt` 删除文件

  - `/q` 安静模式

- **copy**: 复制文件

  例如：`copy file1.txt file2.txt` 复制文件

### PowerShell

> PowerShell 命令是可以使用 python 的 subprocess 模块调用的，可以用于批量处理任务。
>
> PowerShell 提供的命令很多都有简写，比如 `Get-Process` 可以简写为 `gps`。

- **Get-Command**: 查看命令

  例如：`Get-Command -Name Get-Process`

- **Get-ChildItem**: 查看文件（简写`gci`）

  - `Get-ChildItem -Path C:\` 查看 C 盘文件

  - `Get-ChildItem Env:` 查看环境变量

- **Set-Location**: 切换目录

- **$env:Path**: 查看环境变量

### 进程管理

- **tasklist**: 查看进程列表

- **taskkill**: 结束进程

  例如：`taskkill /f /im notepad.exe` 结束记事本进程

- **Get-Process**: PowerShell 查看进程

  例如：`Get-Process chrome` 查看 Chrome 进程

- **Stop-Process**: PowerShell 结束进程

  例如：`Stop-Process -Name notepad` 结束记事本进程
