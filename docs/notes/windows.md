# Windows 笔记

## Windows Shortcut

Windows 快捷键是提高效率的好帮手，这里记录一些常用的快捷键。

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

### PowerShell

> PowerShell 命令是可以使用 python 的 subprocess 模块调用的，可以用于批量处理任务。

- **Get-Command**: 查看命令

  例如：`Get-Command -Name Get-Process`

### 进程管理

- **tasklist**: 查看进程列表

- **taskkill**: 结束进程

  例如：`taskkill /f /im notepad.exe` 结束记事本进程

- **Get-Process**: PowerShell 查看进程

  例如：`Get-Process chrome` 查看 Chrome 进程

- **Stop-Process**: PowerShell 结束进程

  例如：`Stop-Process -Name notepad` 结束记事本进程
