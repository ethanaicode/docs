# Mac 笔记

## 新机配置

### 基础设置

- **调换 Command 和 Option 键**（外接键盘时）: 键盘 --> 快捷键 --> 修改键 --> Command 和 Option 互换

  适合外接键盘的用户，因为外接键盘的 Command 键在左下角，和笔记本键盘的位置不一样。

- **鼠标滚动方向**（外接鼠标时）: 鼠标 --> 关闭自然滚动（这样滚动方向就和 Windows 一样了）

- **改变程序坞（Dock）位置**: 桌面与程序坞 --> 位置 --> 左侧/底部/右侧（推荐左侧）

- **时区**: 通用设置 --> 日期与时间 --> 时区（选择框中如果找不到对应的可以直接输入来搜索）

- **finder 显示文件路径**: finder --> 偏好设置 --> 边栏 --> 勾选显示文件路径（option + command + P）

- **触控板三指拖动**: 辅助功能 --> 鼠标与触控板 --> 触控板 --> 启用拖移 --> 三指拖移

- **设置触发角（Hot Corners）**: 桌面与程序坞 --> 触发角（需要向下滚动） --> 选择对应的操作

  触发角是指将鼠标移动到屏幕的角落时，会触发一些操作，比如显示桌面、启动屏保等。

- **输入法切换快捷键**: 键盘 --> 快捷键 --> 输入法 --> 勾选切换输入法

- **打开/关闭 台前调度**: 桌面与程序坞 --> 台前调度 --> 开启/关闭（仅在需要时开启）

  或者直接右上角的控制中心 --> 台前调度

  实测台前调度不好用，可以不用

### 安装软件

- **iTerm2**: 终端工具

- **VSCode**: 编辑器

- **DBeaver**: 数据库管理工具

- **Shottr**: 截图工具

  以前喜欢用 snipaste，现在用这个，可以完美替代

- ~~**Termius**: SSH 连接工具~~

  可以直接用 iTerm2 的内置 SSH 功能

- ~~**Gitkraken**: Git 管理工具~~

  命令行加上 vscode 插件够用了

## Mac 快捷键

### 常用

> [MAC 键盘快捷键大全](https://support.apple.com/zh-cn/102650)

::: info 按键符号说明

- Command (or Cmd) ⌘

- Shift ⇧

- Option (or Alt) ⌥

- Control (or Ctrl) ⌃

- Caps Lock ⇪

- Fn (Function)
  :::

- **Command + Tab** = <u>在不同应用之间切换</u>

- **Command + Space** = <u>打开 Spotlight 搜索</u>

  在搜索到的文件上按 **Command + R** 可以打开文件位置

- **Control + Up(↑)** = 显示所有窗口

  _或者双指双击鼠标（需要 Mac 鼠标）_

- **Command + Up/Down(↑/↓)** = 移动到页面顶部/底部

### 文字编辑

- **Command + Control + Space** = 打开表情符号

### 应用及窗口

窗口切换和标签页切换对应不同种类的应用，

比如文字编辑类的应用如 VSCode、Typora 通常支持窗口切换，浏览器类的应用如 Chrome、Safari 通常支持标签页切换。

- **Command + `** = <u>在同一个应用程序的窗口之间切换</u>

- **Control + Down(↓)** = 显示应用内所有窗口

- **Command + Option + Left/Right** = <u>切换标签页</u>

- **Command + 1/2/3...** = 切换到对应的标签页

- **Control + Tab** = 切换到上一个标签页

- **Control + Shift + Tab** = 切换到下一个标签页

- **Command + ,** = 打开应用程序的偏好设置（大部分应用支持）

- **Command + Q** = 退出应用程序

- **Command + W** = 关闭窗口

- **Command + H** = 隐藏当前窗口

- **Command + M** = 最小化窗口

### 访达页面

- **长按 Space** = 临时预览文件（松开空格就会关闭）

- **Command + Option + P** = 打开访达的文件路径显示

- **Command + Shift + `.`** = 显示隐藏文件

- **Command + Option + Drag** = 拖动快速创建快捷方式

- **Command + I** = 显示文件信息

  还可以选择多个文件一起查看（比如体积大小）

- **Command + Delete** = 移动到废纸篓

- **Command + E** = 弹出磁盘或者镜像

- **Command + N** = 新建窗口

- **Command + 1/2/3/4** = <u>切换视图</u>

  列表模式下可以按 **Command + `+/-`** 放大缩小

- **Command + Shift + G** = 打开文件夹

- **Command + J** = 显示或隐藏视图选项（用来设置排序等，很方便）

### 截屏录屏

- **Command + Shift + 3** = 截取整个屏幕

- **Command + Shift + 4** = 截取部分屏幕

- **Command + Shift + 5** = <u>截取屏幕或录屏</u>

### 其它

- **Command + Option + D** = 显示/隐藏 Dock

- **Command + Option + Esc** = 强制退出程序

## Mac 操作技巧

### 切换输入法

使用输入法菜单: **点按菜单栏中的输入法菜单，然后选取一种输入法**。

你还可以按下 **Control + 空格键** 选择上一个输入法，

或按下 **Option + Control + 空格键** 在输入法菜单中选择下一个输入法。

还可以 **按住 Control + 空格键** 可在多个已安装的输入法间切换。

### 获取本机的 IP

```bash
ipconfig getifaddr en0
```

- `en0` 是网卡的名称。

- 如果没有结果，可以使用 `networksetup -listallhardwareports` 列出所有的网络服务和对应的网卡。

### 获取局域网内其他电脑的 IP

#### 已知 Windows 设备名称

假设设备名为 `Win-Name`，可以使用以下命令获取其 IP 地址：

- `smbutil lookup Win-Name` 这个命令会查询该设备的 SMB 服务，包括其 IP 地址

  `smbutil lookup` 依赖 **NetBIOS Name Service (NBNS，UDP 137)** 的广播来把 Windows 机器的 **NetBIOS** 名（Win-Name）解析成 IP。

- `ping Win-Name.local` 这个命令会尝试 ping 该设备，并显示其 IP 地址

- `dns-sd -Q Win-Name.local` 这个命令会查询该设备的 DNS 服务，可以看到其 IP 地址

#### 未知设备名称

如果不知道 Windows 设备的名称，可以使用以下命令获取局域网内所有设备的 IP 地址：

- `arp -a` 这个命令会列出局域网内所有设备的 IP 地址和 MAC 地址

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

## 常见问题解决

### App is damaged and can't be opened

在 macOS 中，有时候会遇到这样的提示，提示应用损坏无法打开。

当你从网络下载文件时，macOS 会自动为文件添加一个扩展属性，这个扩展属性会标记文件的来源。如果文件的来源不可信，macOS 会阻止你打开这个文件。

**xattr** 命令可以查看文件的扩展属性：

```bash
xattr /path/to/application.app
```

如果文件的扩展属性中有`com.apple.quarantine`，就会触发警告或者提示应用损坏无法打开。

我们可以通过清除这个扩展属性来解决这个问题，**终端中输入以下命令**:

```bash
xattr -cr /path/to/application.app
```

这个命令会清除应用程序的扩展属性，然后再尝试打开应用程序。其中：

`-c`参数是清除应用程序的扩展属性，`-r`参数是递归清除所有子文件和目录的扩展属性。`/path/to/application.app`是应用程序的路径。

## Brew 管理工具

### 配置及目录

- **Homebrew Intel Mac（/usr/local）**

  ```bash
  # 软件目录
  /usr/local/Cellar

  # 软链接目录（通常软链接到 bin 目录）
  # 可以直接使用该目录下的命令（要区分目录和文件）
  /usr/local/opt

  # 命令行工具目录
  /usr/local/bin

  # 配置目录
  /usr/local/etc

  # 日志等目录
  /usr/local/var
  ```

- **Homebrew Apple Silicon (M1/M2, /opt/homebrew)**

  ```bash
  # 软件目录
  /opt/homebrew/Cellar

  # 软链接目录（通常软链接到 bin 目录）
  # 可以直接使用该目录下的命令（要区分目录和文件）
  /opt/homebrew/opt

  # 命令行工具目录
  /opt/homebrew/bin

  # 配置目录
  /opt/homebrew/etc

  # 日志等目录
  /opt/homebrew/var
  ```

### Brew 命令

#### 基础命令

- **brew list**: 将会显示所有已安装的 Homebrew 软件包

  `--cask` 列出所有已安装的 cask（GUI 应用）软件包

  `--versions | grep php` 显示版本号，列出所有已安装的 PHP 版本。

  `--full-name` 显示完整的软件包名称。

  `--json=v2` 以 JSON 格式输出，适合进一步处理。

  `-l, --long` 显示完整路径（而不是省略）。

- **brew leaves**: 列出所有顶级包，不包括依赖项的包。

- **brew search TEXT**: 搜索软件，支持`/`的正则匹配

- **brew info PKG_NAME**: 查看 PKG_NAME 的详细信息

- **brew install PKG_NAME**: 安装软件

- **brew reinstall PKG_NAME**: 重新安装软件

- **brew upgrade PKG_NAME**: 更新软件

  如果不输入具体的 fomula，将更新全部

  更新软件前应该先更新 Homebrew 库，以保证软件是最新的

- **brew uninstall PKG_NAME**: 卸载软件

- **brew cleanup**: 清理旧版本

  删除安装过程中的缓存，会清理掉 Cask 套件

#### tap 仓库

- **brew update**: 更新 Homebrew 库信息

- **brew tap REPO_NAME**: 添加第三方仓库

  比如: `brew tap shivammathur/php`，添加 PHP 的第三方仓库，这样就可以安装旧版本的 PHP 了。

  安装时需要加上加上第三方仓库的名称，比如: `brew install shivammathur/php/php@7.4`。

- **brew untap REPO_NAME**: 删除第三方仓库

#### link 软链接

- **brew link PKG_NAME**: 创建软链接

  `brew link` 命令会创建一个软链接，将软件包的安装目录链接到 `/usr/local/opt` 目录下。

  这样，你就可以直接在终端中使用软件包的命令了。

  比如切换 php 版本可以：

  ```bash
  # 切换到 php@7.4 版本
  brew unlink php
  brew link --overwrite --force php@7.4

  # 切换到 php@8.1 版本
  brew unlink php@7.4
  brew link --overwrite --force php@8.1
  ```

- **brew unlink PKG_NAME**: 删除软链接

#### Services

- **brew services list**: 列出所有服务

- **brew services star/stop/restart serviceName**: 启动/停止/重启服务

#### Cask

Cask 是 Homebrew 的扩展，原本的 Homebrew 是管理命令行的，而 Cask 是管理 GUI 桌面软件的部分。

管理 Cask 和管理普通软件的命令是一样的，只是在命令后面加上`--cask`参数。

- **brew install --cask PKG_NAME**: 安装软件

- **brew uninstall --cask PKG_NAME**: 卸载软件

- **brew upgrade --cask PKG_NAME**: 更新软件

- **brew list --cask**: 列出所有已安装的 Homebrew Cask 软件包

- **brew search --cask TEXT**: 搜索软件

- **brew info --cask PKG_NAME**: 查看 package name 的详细信息

### Brew 的使用

#### 管理镜像源配置

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

#### 推荐安装软件

- **neofetch**: 显示系统信息

- **tree**: 以树状图列出目录结构

### Brew 软件使用备注

#### Nginx

- 配置文件在 `/opt/homebrew/etc/nginx/nginx.conf`

- 默认会使用 `8080` 端口

- 推荐开发环境直接用 `nginx` 命令，更轻量，不需要管理服务

  ```bash
  # 启动
  nginx

  # 停止
  nginx -s stop

  # 重启
  nginx -s reload
  ```

#### mysql

- 默认情况下不会添加 `mysql` 相关的命令到环境变量中，需要手动添加

  ```bash
  # Intel Mac
  export PATH="/usr/local/opt/mysql@8.0/bin:$PATH"

  # Apple Silicon Mac
  export PATH="/opt/homebrew/opt/mysql@8.0/bin:$PATH"

  # 加载刷新配置
  source ~/.zshrc
  ```

- 运行及控制 `mysql` 服务，可以使用以下命令：

  ```bash
  # 启动（前台运行）
  mysqld_safe --datadir=/opt/homebrew/var/mysql

  # 后台运行
  mysql.server start

  # 其它控制（按照需求选择运行，别傻傻的直接使用下列命令）
  mysql.server stop/restart/reload/status
  ```

- 安装后默认没有 root 密码，可以运行以下命令去设置：

  ```bash
  # 先确保启动服务（可选）
  mysql.server start
  mysql_secure_installation
  ```

- 默认情况下，mysql 的数据目录在 `/opt/homebrew/var/mysql`，如果需要更改，可以在 `/opt/homebrew/etc/my.cnf` 中添加 `datadir` 配置。

#### php

- Homebrew 主仓库现在只维护比较新的 PHP 版本，如果要安装旧版本，需要使用第三方仓库。

  社区有人维护历史版本的 PHP，最常见的是 `shivammathur/php tap`，安装方法：

  ```bash
  brew tap shivammathur/php
  brew install shivammathur/php/php@7.4
  # 安装完成后，可以绑定下下 php 的软链接
  brew link --force shivammathur/php/php@7.4
  ```

- `php-fpm` 配置文件在 `/opt/homebrew/etc/php/7.4/php-fpm.d/www.conf`

   根据版本不同，路径不同

- 推荐使用 brew 命令来启动管理 `php-fpm` 服务

   ```bash
   # 启动
   brew services start php@7.4

   # 停止
   brew services stop php@7.4

   # 重启
   brew services restart php@7.4
   ```

## 常用软件使用指南

### Notes 备忘录

苹果生态都会自带备忘录，可以用来记录一些重要的信息。

- `Command + Shift + ,/.` = 缩小/放大 视图

- `*`: 以该符号开头的表示列表，相似功能的还有 `-`

  按 `shift` 或者 `Control` 换行时，可以自动缩进

### Stickies

Stickies 是 macOS 自带的便签应用，可以用来记录一些重要的信息。

演示时用来记录下信息，可以方便查看。

下面是它的一些使用技巧:

**快捷键**

- **Command + N** = 新建便签

- **Command + +** = 放大

- **Command + -** = 缩小

- **Option + Tab** = 添加一个列表

**Tips**

- 如果希望格式化和自定义便签样式，你可以修改好样式后，选择 `Window` --> `Use as Default`，这样下次新建的便签就会使用这个样式。

- 可以保持便签置顶，`Window` --> `Float on Top`。

- 双击窗口可以折叠便签。

### iTerm2

iTerm2 是一个替代 Terminal 的终端工具，功能更加强大。

#### 快捷键

- **Command + D** = 垂直分屏

- **Command + Shift + D** = 水平分屏

- **Command + Option + 方向键** = 切换屏幕

- **Command + Shift + Enter** = 切换当前窗口全屏

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
