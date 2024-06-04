# Mac 笔记

## Mac shortcut

### 快捷操作

- **Command⌘ + Tab** = 切换应用

- **Command⌘ + ~** = 切换应用窗口（VScode 切换多个窗口很方便）

- **Command⌘ + up or down(↑ or ↓） arrow key** = 移动到页面顶部/底部

- **Control + Up arrow (↑) key** = 打开任务管理器

  或者双指双击鼠标（需要 Mac 鼠标）

- **Command⌘ + Option⌥ + (left or right) arrow key** = 切换标签页

- **Control + Tab** = 切换到上一个标签页

- **Control + Shift + Tab** = 切换到下一个标签页

### 访达页面

- **Command⌘ + Option⌥ + P** = 打开访达的文件路径显示

- **Command⌘ + Shift + `.`** = 显示隐藏文件

- **Command⌘ + Option⌥ + Drag** = 拖动快速创建快捷方式

## Mac 操作技巧

### 切换输入法

使用输入法菜单：**点按菜单栏中的输入法菜单，然后选取一种输入法**。

你还可以按下 **Option⌥ + Control + 空格键** 在输入法菜单中选择下一个输入法，

或按下 **Control + 空格键** 选择上一个输入法。

还可以 **按住 Control + 空格键** 可在多个已安装的输入法间切换。

### 强行退出程序

可以使用命令：**Command⌘ + Option⌥ + Esc** 打开强制退出应用程序窗口。

或者使用活动监视器：**在“应用程序”文件夹中打开“实用工具”文件夹，然后双击“活动监视器”**。

### 获取本机的 IP

```bash
ipconfig getifaddr en0
```

### 获取域名的解析 IP

最简单的就是使用`nslookup`命令，可以获取到域名的解析 IP：

```bash
nslookup domain.com
```

另外还可以用`dig`命令，来获取到更多的 DNS 信息：

```bash
dig domain.com
```

`dig`命令支持参数，可以查看更详细的信息：

- `+short`：只显示 IP 地址

- `+trace`：显示 DNS 解析的路径

### 创建自己的执行命令

macOS 通过系统完整性保护（SIP）来保护某些系统目录，如`/usr/bin/`。

不允许修改这些目录，可以保护系统的安全性和稳定性。

`/usr/local/bin/` 是一个可以自由修改的目录，可以用来存放自己写的脚本。

我们可以通过创建符号链接的方式，将自己写的脚本链接到`/usr/local/bin/`目录下，这样就可以在终端中直接执行。

```bash
# 创建符号链接
sudo ln -s ~/bin/lookupwin.sh /usr/local/bin/lookupwin
```

一定要需要确保自己写的脚本有执行权限：

```bash
chmod +x lookupwin.sh
```

## Brew 管理工具

### Basics

Brew 的应用一般会安装到`/usr/local/Cellar`目录下，软件的链接会放在`/usr/local/bin`目录下。

Brew 的应用配置一般可以在`/usr/local/etc`目录下找到。

**Brew 的基本命令**：

- brew list

  将会显示所有已安装的 Homebrew 软件包

  此外，`brew list --cask` 将提供使用 [Homebrew Cask](https://github.com/Homebrew/homebrew-cask) 安装的项目。

- brew leaves

  列出所有顶级包，不包括依赖项的包。

- brew search TEXT

  搜索软件，支持`/`的正则匹配

- brew info PACKAGE_NAME

  查看 package name 的详细信息

- brew install PACKAGE_NAME

- brew upgrade PACKAGE_NAME

  如果不输入具体的 fomula，将更新全部

- brew uninstall

- brew cleanup

  删除安装过程中的缓存，会清理掉 Cask 套件

### Services

- brew services list

- brew services star/stop/restart serviceName

### Cask

Cask 是 Homebrew 的扩展，原本的 Homebrew 是管理命令行的，而 Cask 是管理 GUI 桌面软件的部分。
Cask 的管理和 brew 相似，在 brew 后加上 cask 即可使用。

下面是一些常用的：

```bash
# 查看软件详情
brew cask info PACKAGE_NAME
# 安装软件
brew cask install PACKAGE_NAME
# 列出所有已安裝的软件
brew cask list
# 更新软件
brew cask upgrade PACKAGE_NAME
# 卸载软件
brew cask uninstall PACKAGE_NAME
```

### 管理镜像源配置

**查看当前镜像源**

`brew tap` 命令可以查看当前的镜像源。

```bash
brew tap
```

如果需要查看更详细的信息，可以使用 `brew config` 命令。

```bash
brew config
```

可以通过`git -C "$(brew --repo)" remote -v`查看当前的源。

**切换镜像源**

国内镜像地址：

- 清华：https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles
- 中科大：https://mirrors.ustc.edu.cn/homebrew-bottles
- 阿里云：https://mirrors.aliyun.com/homebrew/homebrew-bottles

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

## MAMP 开发环境搭建

### 常用目录及文件

**MAMP Apache Conf:** /Applications/MAMP/conf/apache/httpd.conf

**MAMP PHP Conf:** /Applications/MAMP/bin/php/php8.2.0/conf

### 使用技巧

MAMP 的服务及应用都放在目录`/Applications/MAMP/bin`下，

可以通过 WEBROOT + 目录名 访问对应的服务，比如想要使用 phpMyAdmin，可以通过 http://localhost:8888/phpMyAdmin/ 访问。

**目前查看目录并测试，知道可用的服务包括：**

- **mamp**：MAMP 管理工具

- **adminer**：数据库管理工具

- **phpLiteAdmin**：SQLite 管理工具

- **phpPgAdmin**：PostgreSQL 管理工具

- **phpMyAdmin**：MySQL 管理工具
