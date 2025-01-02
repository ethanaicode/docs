# Mac 笔记

## 新机器配置

### 基础设置

- **时区**: 通用设置 --> 日期与时间 --> 时区（选择框中如果找不到对应的可以直接输入来搜索）

- **输入法切换快捷键**: 键盘 --> 快捷键 --> 输入法 --> 勾选切换输入法

- **finder 显示文件路径**: finder --> 偏好设置 --> 边栏 --> 勾选显示文件路径（option + command + P）

- **触控板三指拖动**: 系统偏好设置 --> 辅助功能 --> 鼠标与触控板 --> 触控板 --> 启用拖移 --> 三指拖移

- **打开/关闭 台前调度**: 系统偏好设置 --> 桌面与程序坞 --> 台前调度 --> 开启/关闭

### 安装软件

- **iTerm2**: 终端工具

- **VScode**: 编辑器

- **Termius**: SSH 连接工具

- **Gitkraken**: Git 管理工具

- **Dbeaver**: 数据库管理工具

- **Shottr**: 截图工具（以前喜欢用 snipaste，现在用这个，可以完美替代）

## Mac shortcut

### 快捷操作

::: info 按键符号说明

- Command (or Cmd) ⌘

- Shift ⇧

- Option (or Alt) ⌥

- Control (or Ctrl) ⌃

- Caps Lock ⇪

- Fn (Function)
  :::

- **Command⌘ + Tab** = <u>在不同应用之间切换</u>

- **Command⌘ + ~** = <u>在同一个应用程序的窗口之间切换</u>

- **Command⌘ + up or down(↑ or ↓） arrow key** = 移动到页面顶部/底部

- **Control + Up arrow (↑) key** = 打开任务管理器

  或者双指双击鼠标（需要 Mac 鼠标）

- **Command⌘ + Option⌥ + (left or right) arrow key** = 切换标签页

- **Control + Tab** = 切换到上一个标签页

- **Control + Shift + Tab** = 切换到下一个标签页

### 访达页面

- **长按 Space** = 临时预览文件（松开空格就会关闭）

- **Command⌘ + Option⌥ + P** = 打开访达的文件路径显示

- **Command⌘ + Shift + `.`** = 显示隐藏文件

- **Command⌘ + Option⌥ + Drag** = 拖动快速创建快捷方式

- **Command⌘ + J** = 显示或隐藏视图选项（用来设置排序等，很方便）

### 截屏录屏

- **Command⌘ + Shift + 3** = 截取整个屏幕

- **Command⌘ + Shift + 4** = 截取部分屏幕

- **Command⌘ + Shift + 5** = 截取屏幕或录屏

## Mac 操作技巧

### 切换输入法

使用输入法菜单: **点按菜单栏中的输入法菜单，然后选取一种输入法**。

你还可以按下 **Control + 空格键** 选择上一个输入法，

或按下 **Option⌥ + Control + 空格键** 在输入法菜单中选择下一个输入法。

还可以 **按住 Control + 空格键** 可在多个已安装的输入法间切换。

### 强行退出程序

可以使用命令: **Command⌘ + Option⌥ + Esc** 打开强制退出应用程序窗口。

或者使用活动监视器: **在“应用程序”文件夹中打开“实用工具”文件夹，然后双击“活动监视器”**。

### 获取本机的 IP

```bash
ipconfig getifaddr en0
```

- `en0` 是网卡的名称。

- 如果没有结果，可以使用 `networksetup -listallhardwareports` 列出所有的网络服务和对应的网卡。

### 获取域名的解析 IP

最简单的就是使用`nslookup`命令，可以获取到域名的解析 IP:

```bash
nslookup domain.com
```

另外还可以用`dig`命令，来获取到更多的 DNS 信息:

```bash
dig domain.com
```

`dig`命令支持参数，可以查看更详细的信息:

- `+short`: 只显示 IP 地址

- `+trace`: 显示 DNS 解析的路径

### 创建自己的执行命令

macOS 通过系统完整性保护（SIP）来保护某些系统目录，如`/usr/bin/`。

不允许修改这些目录，可以保护系统的安全性和稳定性。

`/usr/local/bin/` 是一个可以自由修改的目录，可以用来存放自己写的脚本。

我们可以通过创建符号链接的方式，将自己写的脚本链接到`/usr/local/bin/`目录下，这样就可以在终端中直接执行。

```bash
# 创建符号链接
sudo ln -s ~/bin/lookupwin.sh /usr/local/bin/lookupwin
```

一定要需要确保自己写的脚本有执行权限:

```bash
chmod +x lookupwin.sh
```

### 允许远程电脑访问本机（SSH）

macOS 默认是不开启 SSH 服务的，需要手动开启。开启后可以直接使用 ssh 命令连接。

可以在 `系统偏好设置` --> `共享` --> `远程登录` 中开启 SSH 服务。

或者使用命令行开启:

```bash
# 开启 SSH 服务
sudo systemsetup -setremotelogin on
```

### 允许远程电脑访问本机（VNC）

macOS 默认是不开启 VNC 服务的，需要手动开启。开启后可以使用 VNC 客户端连接，就可以远程操作 Mac。

可以在 `系统偏好设置` --> `共享` --> `屏幕共享` 中开启 VNC 服务。

[共享设置-参考配置图示](https://img.shejibiji.com/2024/12/09/67566eae96efb.png)

**常见问题**

在我购入 Mac mini 后，我就在想通过远程连接的方式来使用，这样可以省下显示器和键盘。

以下是我刚开始实践时担心的问题以及在实践后的解答:

- **Mac mini 需要接入显示器才能使用屏幕共享吗？**

  并不需要，但是如果没有显示器，显示分辨率为默认 1920x1080，且无法更改。

  第一次设置时可能需要屏幕，这样操作方便点，开启后，屏幕拔掉也照样可以使用屏幕共享，远程登录。

- **Mac mini 有必要设置禁止锁屏吗？**

  不需要，远程登录时，锁屏会自动解锁，不会影响远程操作。

  要注意的是，在电源设置中，需要打开 `唤醒以供网络访问`，这样才可以远程唤醒 Mac mini（默认应该是开启的）。

## Brew 管理工具

### Basics

- Brew 的应用一般会安装到`/usr/local/Cellar`目录下，

- 软件的链接会放在`/usr/local/opt`目录下，你可以在这里看到软件的版本信息，

- 如果是命令行工具，会额外在`/usr/local/bin`目录下创建一个软链接，

- Brew 的应用配置一般可以在`/usr/local/etc`目录下找到。

- 在新的 macOS 系统中，Brew 会自动安装到`/opt/homebrew`目录下。

**Brew 的基本命令**

- **brew list**: 将会显示所有已安装的 Homebrew 软件包

  此外，`brew list --cask` 将提供使用 [Homebrew Cask](https://github.com/Homebrew/homebrew-cask) 安装的项目。

- **brew leaves**: 列出所有顶级包，不包括依赖项的包。

- **brew search TEXT**: 搜索软件，支持`/`的正则匹配

- **brew info PKG_NAME**: 查看 package name 的详细信息

- **brew install PKG_NAME**: 安装软件

- **brew update**: 更新 Homebrew 库信息

- **brew upgrade PKG_NAME**: 更新软件

  如果不输入具体的 fomula，将更新全部

  更新软件前应该先更新 Homebrew 库，以保证软件是最新的

- **brew uninstall PKG_NAME**: 卸载软件

- **brew cleanup**: 清理旧版本

  删除安装过程中的缓存，会清理掉 Cask 套件

### Services

- **brew services list**: 列出所有服务

- **brew services star/stop/restart serviceName**: 启动/停止/重启服务

### Cask

Cask 是 Homebrew 的扩展，原本的 Homebrew 是管理命令行的，而 Cask 是管理 GUI 桌面软件的部分。

管理 Cask 和管理普通软件的命令是一样的，只是在命令后面加上`--cask`参数。

- **brew install --cask PKG_NAME**: 安装软件

- **brew uninstall --cask PKG_NAME**: 卸载软件

- **brew upgrade --cask PKG_NAME**: 更新软件

- **brew list --cask**: 列出所有已安装的 Homebrew Cask 软件包

- **brew search --cask TEXT**: 搜索软件

- **brew info --cask PKG_NAME**: 查看 package name 的详细信息

### 管理镜像源配置

**查看当前镜像源**

`brew tap` 命令可以查看当前的镜像源。

如果需要查看更详细的信息，可以使用 `brew config` 命令。

可以通过`git -C "$(brew --repo)" remote -v`查看当前的源。

**切换镜像源**

国内镜像地址:

- 中科大: https://mirrors.ustc.edu.cn/homebrew-bottles
- 阿里云: https://mirrors.aliyun.com/homebrew/homebrew-bottles
- 清华: https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles

```bash
# 临时使用
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles
# 永久使用（使用zsh）
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.zshrc
```

最后，使用 `brew update` 更新 Homebrew。

**恢复默认源**

```bash
# 临时使用
export HOMEBREW_BOTTLE_DOMAIN=https://homebrew.bintray.com/bottles
# 永久使用（使用zsh）
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://homebrew.bintray.com/bottles' >> ~/.zshrc
```

**如果发生问题**

```bash
brew doctor
brew update-reset
brew update
```

### 推荐安装软件

- **neofetch**: 显示系统信息

- **tree**: 以树状图列出目录结构

## 常用软件使用指南

### Notes 备忘录

苹果生态都会自带备忘录，可以用来记录一些重要的信息。

**支持的特殊格式**

- `*`: 以该符号开头的表示列表，相似功能的还有 `-`

  按 `shift` 或者 `Control` 换行时，可以自动缩进

### Stickies

Stickies 是 macOS 自带的便签应用，可以用来记录一些重要的信息。

演示时用来记录下信息，可以方便查看。

下面是它的一些使用技巧:

**快捷键**

- **Command⌘ + N** = 新建便签

- **Command⌘ + +** = 放大

- **Command⌘ + -** = 缩小

- **Option⌥ + Tab** = 添加一个列表

**Tips**

- 如果希望格式化和自定义便签样式，你可以修改好样式后，选择 `Window` --> `Use as Default`，这样下次新建的便签就会使用这个样式。

- 可以保持便签置顶，`Window` --> `Float on Top`。

- 双击窗口可以折叠便签。

### iTerm2

iTerm2 是一个替代 Terminal 的终端工具，功能更加强大。

#### 快捷键

- **Command⌘ + D** = 垂直分屏

- **Command⌘ + Shift + D** = 水平分屏

- **Command⌘ + Option⌥ + 方向键** = 切换屏幕

- **Command⌘ + Shift + Enter** = 切换当前窗口全屏

#### 设置

> 参考文档: [iTerm2 官方文档](https://iterm2.com/3.0/documentation-preferences.html)

**取消窗口变暗**

默认设置中，当有多个 Pane 时，其他 Pane 会变暗，可以取消这个效果。

- `Settings` --> `Appearance` --> `Dimming` --> `Dim inactive split panes`

**打开系统状态栏**

我们可以在 iTerm2 窗口中，增加一个系统状态栏，显示 CPU、内存、网络等信息。

- `Settings` --> `Profiles` --> `Session` --> `Status bar enabled`

默认状态栏是在顶部的，我们可以把它移动到底部。

- `Settings` --> `Appearance` --> `Status bar location` --> `Bottom`

在状态栏中，你还可以自定义按钮或者行为，比如添加一个按钮来 `打开新窗口`。

- `Configure Status Bar` --> `Custom Action` --> `Configure Action` --> `New Window with Profile`

最终就可以得到这样一个效果:

[![1732678033939.png](https://img.shejibiji.com/2024/11/27/6746919455552.png)](https://img.shejibiji.com/2024/11/27/6746919455552.png)

### MAMP

MAMP 是一个集成环境，可以在 Mac 上快速搭建 Apache、MySQL、PHP 环境。

#### 常用目录及文件

- **MAMP Apache Conf**: /Applications/MAMP/conf/apache/httpd.conf

- **MAMP PHP Conf**: /Applications/MAMP/bin/php/php8.2.0/conf

#### 使用技巧

MAMP 的服务及应用都放在目录`/Applications/MAMP/bin`下，

可以通过 WEBROOT + 目录名 访问对应的服务，比如想要使用 phpMyAdmin，可以通过 http://localhost:8888/phpMyAdmin/ 访问。

**目前查看目录并测试，知道可用的服务包括: **

- **mamp**: MAMP 管理工具

- **adminer**: 数据库管理工具

- **phpLiteAdmin**: SQLite 管理工具

- **phpPgAdmin**: PostgreSQL 管理工具

- **phpMyAdmin**: MySQL 管理工具

## 命令行工具

### systemsetup

`systemsetup` 是 macOS 系统中的一个命令行工具，用于配置系统的一些设置。

这个命令要求管理员权限，所以在执行时需要使用 `sudo`。

你可以通过 `systemsetup -help` 查看所有的参数。

**常用命令**

- `systemsetup -gettimezone`: 获取当前时区

- `systemsetup -listtimezones`: 列出所有时区

### networksetup

`networksetup` 是 macOS 系统中的一个命令行工具，用于配置网络设置。

### defaults

`defaults` 是 macOS 系统中的一个命令行工具，用于管理用户的偏好设置。

**常用命令**

- `defaults read`: 读取用户的偏好设置

### smbutil

`smbutil` 是 macOS 系统中的一个命令行工具，用于与 SMB（Server Message Block）共享进行交互。它可以用于管理网络共享、查看共享的状态以及获取有关 SMB 连接的信息。

**常用命令**

- `smbutil lookup servername`: 查找设备的 IP 地址

- `smbutil view //server/share`: 查看共享的文件和目录

- `smbutil status //server/share`: 查看共享的状态

- `smbutil statshares -a`: 查看所有共享的状态

- `smbutil mount //username:password@server/share /Volumes/share`: 挂载共享

- `smbutil unmount /Volumes/share`: 卸载共享

### shasum

`shasum` 是一个计算文件 SHA-1 校验和的命令行工具。如果不传递参数，`shasum` 将读取标准输入并计算 SHA-1 校验和。

**常用命令**

- `shasum -a 256 filename`: 计算文件的 SHA-256 校验和

- `shasum -c filename.sha256`: 校验文件的 SHA-256 校验和
