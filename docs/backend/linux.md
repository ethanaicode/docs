# Linux

> Linux 的知识是非常多的，一篇文章肯定是不够的。
> 这里只列出常用的命令，更多命令可以结合使用需求及公司场景进行学习和使用。

## Linux 命令

### 基础命令

- **ls**: 列出目录及文件名

  `-l` 长信息，可以查看权限等信息

  `-h` 人性化显示文件大小（可以结合上一条使用）

  `-a` 显示所有文件，包括隐藏文件

  `-F` 区分文件和目录，目录末尾加'/'，链接文件末尾加'@'

  `-R` 递归显示

  `-r` 反序显示

  `-t` 按时间排序

  `-S` 按文件大小排序

  `-d` 显示目录属性而非目录内容

  `-i` 显示文件的 inode 号

  `-n` 显示 UID 和 GID

  `--color=auto` 颜色显示

- **cd**: 切换目录

  `-`: 返回上一次所在的目录

- **pwd**: 显示目前的目录

- **touch**: 创建文件

- **mkdir**: 创建一个新的目录

  `-p` 可以创建多级目录

  `-m` 可以指定权限

- **rmdir**: 删除一个空的目录

- **cp**: 复制文件或目录

  `-r` 递归复制（复制目录时推荐加上）

  `-a` 相当于`-dpR`，保留文件属性，递归复制

- **mv**: 移动文件与目录，或修改文件与目录的名称

- **rm**: 删除文件

  `-r` 可以删除目录

- ~~**rmdir**: 删除空目录~~

- **chmod -R 775 filename**: 更改文件或者目录权限为 775

  `-R` 表示递归，可以同时修改文件夹及子文件夹和文件

- **chwon -R USER:GROUP filename**: 更改文件或者目录的所有者和所属组

  `-R` 表示递归，可以同时修改文件夹及子文件夹和文件

- **chattr**: 修改文件属性

  `+/-/=` 添加/删除/设定属性(忽略当前属性)

  `+i` 设置文件为只读

  `+a` 设置文件只能追加内容

- **curl**: 用于传输数据

  `-I` 只显示响应头

  `-L` 跟踪重定向

  `-o` 将下载的内容保存到文件

  `-O` 将下载的内容保存到文件，文件名为 URL 的最后部分

  `-s` 静默模式

  `-v` 显示详细信息

  `-x` 设置代理

  例如：`curl -v -x http://proxy.com:8080 -L https://ipv4.icanhazip.com` 设置代理并查看代理后的 IP

- **ln**: 创建链接文件（类似于 Windows 的快捷方式）

  `-s` 创建软链接（符号链接）

  `-n` 如果目标文件已存在，不覆盖（避免和 source 文件冲突用）

  `-f` 强制创建

- **alias**: 设置别名

  `alias ll='ls -l'` 设置别名

  `unalias ll` 取消别名

### 命令行符号

- **>**: 重定向输出

  `command > filename` 将命令的输出重定向到文件

  `command >> filename` 将命令的输出追加到文件

- **<**: 重定向输入

  `command < filename` 将文件内容作为命令的输入

- **|**: 管道符号

  `command1 | command2` 将 command1 的输出作为 command2 的输入

- **&**: 后台运行

  `command &` 将命令放到后台运行

- **&&**: 逻辑与

  `command1 && command2` 只有当 command1 执行成功后，才会执行 command2

- **||**: 逻辑或

  `command1 || command2` 只有当 command1 执行失败后，才会执行 command2

- **$**: 变量

  `$variable` 表示变量的值

- **\***: 通配符

  `*` 表示任意字符，`?` 表示一个字符，`[]` 表示范围

- **\\**: 转义字符

  `\` 可以转义特殊字符

- **^**: 行首

  `^` 表示行首，`^filename` 表示以 filename 开头的行

- **$**: 行尾

  `$` 表示行尾，`filename$` 表示以 filename 结尾的行

- **[ ]**: 字符范围

  `[a-z]` 表示 a 到 z 的任意字符，`[0-9]` 表示 0 到 9 的任意字符

- **{ }**: 命令组合

  `{command1; command2}` 表示将 command1 和 command2 作为一个命令执行

- **( )**: 子 shell

  `(command1; command2)` 表示将 command1 和 command2 作为一个子 shell 执行

- **$()**: 命令替换

  `$(command)` 表示将 command 的输出作为命令执行

### 文件相关

- **cat filename**: 查看文件内容

  **less filename**: 逐页查看文件内容(空格翻页，支持额外操作)

  **more filename**: 逐页查看文件内容(空格翻页)

  **head filename**: 查看文件头部内容

  **tail filename**: 查看文件尾部内容

  - `-n` 指定行数（如：`tail -n 10 filename`，查看文件尾部 10 行）

- **wc filename**: 统计文件的行数、字数、字符数

  `-l` 只显示行数

  `-w` 只显示字数

  `-c` 只显示字符数

- **grep**: 查找文件内容

  grep [选项] [搜索内容] [文件名]

  `-i` 忽略大小写

  `-n` 显示行号

  `-v` 反向选择

  `-r` 递归查找

  `-E` 扩展正则表达式

- **awk**: 文本处理工具

  `awk '{print $1}' filename` 打印文件的第一列

  `awk -F ':' '{print $1}' filename` 指定分隔符

  `awk '{print $1, $2}' filename` 打印多列

  `awk '{print $1 > "file1"}' filename` 输出到文件

  `awk '{print $1, $2 > "file1"}' filename` 输出多列到文件

  `awk '{print $1, $2 >> "file1"}' filename` 追加到文件

  `awk '{print $1, $2 | "command"}' filename` 输出到命令

  `awk '{print $1, $2 | "sort"}' filename` 输出到排序命令

  文件名也可以放在开头，通过 `|` 管道符号传递给 awk 命令。

- **du**: 查看文件大小

  `-h` 人性化显示文件大小

  `-s` 只显示总大小

  `-a` 显示所有文件大小

  `-c` 显示总大小

- **find**: 查找文件

  find [搜索范围] [搜索条件] [操作]

  如: /etc -name "passwd" 查找 /etc 目录下的 passwd 文件

  `/` 表示搜索全部目录

  `.` 表示搜索当前目录

  `-name` 指定文件名（支持通配符`*`）

  `-iname` 忽略大小写

  `-type` 指定类型(f: 文件, d: 目录, l: 链接文件)

  `-user` 指定所有者

  `-group` 指定所属组

  `-size` 指定文件大小

  `-mtime` 指定修改时间

  `-exec` 执行操作

  `-print` 显示搜索结果

- **sort**: 排序文件内容

  `-n` 按数字排序

  `-k` 指定列排序

  `-r` 逆序

  `-h` 人性化排序

  常用组合：`sort -nrk2 filename` 按第二列数字逆序排序

- **uniq**: 去重（推荐先用 sort 排序）

  `-c` 添加显示重复次数（会在内容前面显示次数）

  `-d` 只显示重复行

  `-u` 只显示不重复行

### 用户相关

- **id**: 查看用户 ID 和所属组 ID

  `-u` 查看用户 ID，后面可以指定用户名

  `-g` 查看所属组 ID，后面可以指定用户名

- **who**: 查看当前登录用户

  `-u` 显示详细信息

- **whoami**: 查看当前用户

- **sudo -i**: 提升用户权限

- **su**: 切换用户

  `-l` 切换到 root 用户

  `-s` 指定 shell

- **groupadd**: 添加组

  `-g` 指定组 ID

- **useradd**: 添加用户

  `-g` 指定用户所属组

  `-G` 指定用户所属附加组

  `-m` 创建用户的家目录

  `-e` 设置用户的过期时间

- **userdel**: 删除用户

  `-r` 删除用户的家目录

- **usermod**: 修改用户

  `-l` 修改用户名

  `-g` 修改用户所属组

  `-G` 修改用户所属附加组

  `-d` 修改用户家目录

  `-s` 修改用户 shell

  `-e` 修改用户过期时间

- **passwd**: 修改密码

- **getent**: 获取用户信息

  `passwd` 获取用户密码信息

  `group` 获取组信息

  `shadow` 获取用户密码信息

- **users**: 查看当前登录系统的用户

### 系统运行状态

1. **查看系统信息**:
   - `hostnamectl`: 显示系统的基本信息，包括主机名、操作系统、内核版本等。🌟🌟
   - `uname -a`: 显示当前系统的内核版本和其他信息。
   - `hostname`: 显示主机名。
   - `uptime`: 显示系统的运行时间、用户数量、负载平均值等。
   - `df -h`: 显示磁盘空间使用情况。
2. **查看 CPU 运行情况**:
   - `top`: 实时显示系统中各个进程的资源占用情况，包括 CPU 使用率、内存占用等。🌟🌟
   - `htop`: 类似于 `top`，但是提供了更加友好的交互界面（推荐，[教程](https://www.shejibiji.com/archives/9635)）。
   - `btop`: 需要安装，类似于 `htop`，但是提供了更加美观的界面。[GitHub](https://github.com/aristocratos/btop)
   - `mpstat`: 显示多处理器系统中每个 CPU 的使用情况。
   - `sar`: 收集、报告系统活动情况，包括 CPU 使用率、内存使用率等。
3. **查看进程情况**:
   - `ps`: 显示当前系统中的进程列表。
     - `ps aux`: 显示所有进程的详细信息。🌟🌟
     - `ps -ef`: 显示所有进程的详细信息，包括父进程 ID。
   - `pstree`: 显示进程树，以树状结构展示进程之间的关系。
   - `pgrep`: 根据进程名或者其他条件查找进程 ID。
   - `kill`: 终止指定进程。🌟🌟
   - `killall`: 终止指定名称的所有进程。
4. **查看内存使用情况**:
   - `free -h`: 显示系统内存的空闲和已用情况。🌟🌟
   - `vmstat`: 显示虚拟内存统计信息，包括内存、进程、IO 等。
5. **查看网络情况**:
   - `netstat`: 显示网络连接、路由表、接口统计等。🌟🌟
   - `ss`: 类似于 `netstat`，用于获取套接字统计信息。
   - `nslookup`: 查询 DNS 服务器，获取域名对应的 IP 地址。

### 防火墙及端口

- **firewall-cmd**: 防火墙管理工具

  `--zone=public`: 指定防火墙区域

  `--add-port=80/tcp`: 添加端口

  `--permanent`: 永久生效

  `--reload`: 重新加载防火墙配置

  `--list-ports`: 列出所有开放的端口

### 解压缩操作

- **tar**: 打包文件

  `-c` 创建新的归档文件

  `-x` 解开归档文件

  `-v` 显示详细信息

  `-f` 指定归档文件名

  `-z` 使用 gzip 压缩

  `-j` 使用 bzip2 压缩

  `-J` 使用 xz 压缩

  `-C` 指定解压缩目录（解压到指定目录）

  `-r` 向归档文件中添加文件

  `-t` 显示归档文件中的内容

- `zcat`: 查看压缩文件内容（可以不解压直接查看，支持 gzip 压缩）

- `gunzip -c`: 查看压缩文件内容（可以不解压直接查看，支持 gzip 压缩）

- **zip**: 压缩文件

  `-v` 显示详细信息

  `-r` 递归压缩

  `-m` 移动文件到 zip 文件中

  `-q` 静默模式

  `-o` 覆盖已有文件

  `-u` 更新已有文件

  `-d` 删除 zip 文件中的文件

  `-l` 显示文件列表

  `-T` 测试 zip 文件

  `-x` 排除文件

- **unzip**: 解开压缩文件

## bash 脚本

> bash 写的脚本记得加上执行权限，`chmod +x filename`。

### 基础语法

- `#!`：脚本解释器

  如果想要使用 bash 解释器，可以在脚本的第一行添加 `#!/bin/bash`。

- `echo`：输出

- `#`：注释

- `;`：命令分隔符

  分隔多个命令。

- `&&`：逻辑与

  只有当第一个命令成功执行后，才会执行第二个命令。

- `||`：逻辑或

  只有当第一个命令执行失败后，才会执行第二个命令。

- `>`：重定向

  将命令的输出重定向到文件。(可以实现输出到文件的操作)

- `\`：转义字符

  如果想要在一行中写多个命令，可以使用 `\`来换行。

- `[ ]`：条件测试，等同于 `test` 命令（一种语法糖）

  `[ condition ]` 条件成立时执行命令，等同于 `test condition`。

- `exit`：退出脚本

  `exit 0` 表示正常退出，`exit 1` 表示异常退出。

### 条件判断操作符

条件判断操作符，包括文件检查、字符串比较和整数比较等。常用的操作符有：

**整数比较**

- `-eq`：等于

- `-ne`：不等于

- `-gt`：大于

- `-lt`：小于

- `-ge`：大于等于

- `-le`：小于等于

**字符串比较**

- `=`：等于

- `!=`：不等于

- `-z string`：字符串为空

- `-n string`：字符串不为空

**文件检查**

- `-d file`：检查文件是否存在并且是一个目录

- `-f file`：检查文件是否存在并且是一个普通文件

- `-r file`：检查文件是否存在并且可读

- `-w file`：检查文件是否存在并且可写

- `-x file`：检查文件是否存在并且可执行

### 分支

#### if 语句

```bash
if [ condition ]; then
    command1
    command2
    ...
fi
```

- `condition`：条件表达式

- `then`：条件成立时执行的命令

- `fi`：结束 if 语句

#### if-else 语句

```bash
if [ condition ]; then
    command1
    command2
    ...
else
    command3
    command4
    ...
fi
```

#### condition

- `-d file`：检查文件是否存在并且是一个目录

  如：`if [ -d /path/to/directory ]; then`

- `-f file`：检查文件是否存在并且是一个普通文件

- `-eq`：等于

- `-ne`：不等于

- `-gt`：大于

- `-lt`：小于

### 常用操作

#### 不显示错误消息

执行命令时，如果不想显示错误消息，可以使用 `2>/dev/null`，它表示将错误消息重定向到 `/dev/null`。

## 基础知识

### 你应该首先了解的

1、文件名如果带空格，则需要通过双引号将文件名引起来（自己创建文件或目录时不推荐空格）。

例如: `rm “test case.py”`

2、`.`表示当前目录，`..` 表示上一级目录，`/`开头的路径表示根目录，`~`为用户目录。

3、你可以使用 _man [命令]_ 来查看各个命令的使用文档，

如 : `man cp`

如果你不是很确定命令的具体名称，可以使用 _apropos [关键字]_ 来搜索相关的命令。
也支持参数 `-k` 来寻找相关性高的命令。

### 文件目录

- **/etc**: 系统配置文件

  通常包括系统的配置文件和程序的配置文件

- **/var**: 系统运行时需要改变的文件

  通常包括日志文件、缓存文件、软件包文件等

### 常用的文件

#### 配置文件

- **/etc/hosts**: 主机名和 IP 地址映射文件

- **/etc/reslov.conf**: DNS 配置文件

- **/etc/sysconfig/network-scripts/ifcfg-eth0**: 网络配置文件

- **/etc/cron.allow[/deny]**: 允许/拒绝用户使用 crontab 命令（每行一个账号名称）

#### 敏感文件

- **/etc/passwd**: 用户信息文件

- **/etc/group**: 组信息文件

- **/etc/shadow**: 用户密码文件

- **/etc/sudoers**: sudo 配置文件，用于查看哪些用户可以使用 sudo 命令

- **/etc/crontab[cron.d]**: 定时任务配置文件

- **/etc/ssh/sshd_config**: SSH 配置文件

#### 日志文件

- **/var/log/secure**: 安全日志文件，如 SSH 登录日志

- **/var/log/syslog**: 系统日志文件

- **/var/log/messages**: 系统消息日志文件

- **/var/log/kern.log**: 内核日志文件，如硬件故障日志

- **/var/log/maillog**: 邮件日志文件

- **/var/log/cron**: 计划任务日志文件

- **/var/log/boot.log**: 启动日志文件

- **/var/log/access.log**: Web 访问日志文件，如 Nginx 访问日志

- **/var/log/error.log**: Web 错误日志文件

- **/root[~]/.bash_history**: 用户历史命令记录文件，记录用户执行过的命令

### Bash shell 中的变量

在 Bash shell 中，变量是用来存储数据值的命名内存位置。这些变量可以存储各种类型的数据，如数字、文本字符串、文件名等。在 Bash 中，变量通常用于存储配置信息、运行脚本时的参数、临时数据等。

#### 环境变量

Bash shell 包含一些预定义的环境变量，用于存储系统和用户环境的信息。以下是一些常用的环境变量:

- `$HOME`: 当前用户的主目录路径。

- `$PATH`: 执行命令的搜索路径。当你输入一个命令时，系统会在这些路径下搜索可执行文件。

- `$PWD`: 当前工作目录的路径。

- `$USER`: 当前用户名。

- `$SHELL`: 当前使用的 shell 的路径。

  `$0` 表示当前 shell 的名称。

  `$BASH_VERSION` 表示当前 bash 的版本。

  `$ZSH_VERSION` 表示当前 zsh 的版本。

- `$TERM`: 当前终端的类型。

- `$LANG`: 当前语言环境设置。

- `$OSTYPE`: 当前操作系统的类型。

#### 其它变量

- `$SSL_CERT_FILE`: SSL 证书文件路径。

- `$REQUESTS_CA_BUNDLE`: CA 证书文件路径。

#### 查看环境变量

环境变量可以用`env`命令查看。

```bash
env | less
```

如果要查看某个环境变量的值，可以使用`echo`命令。

```bash
echo $VARIABLE_NAME
```

- 需要注意的是，变量前面需要加上`$`符号。

#### 定义变量

```bash
VARIABLE_NAME=value
```

这样设置的变量只在当前 shell 中有效，如果想要在其他 shell 中也生效，可以使用`export`命令。

```bash
export VARIABLE_NAME=value
```

如果你希望永远生效，可以将变量写入配置文件中，如 `~/.bashrc`。

如果你想取消掉某个环境变量，可以使用`unset`命令。

```bash
unset VARIABLE_NAME
```

#### 特殊变量

Bash shell 还提供了一些特殊的内置变量，例如:

- `$0`: 当前脚本的名称。
- `$1`、`$2`、`$3` 等: 表示传递给脚本或函数的参数。
- `$#`: 表示传递给脚本或函数的参数的个数。
- `$@`: 表示传递给脚本或函数的所有参数的列表。
- `$?`: 表示上一个命令的退出状态。

#### 设置 path

当您键入命令时，您的 PATH 变量定义 shell 将在哪些目录中查找您键入的命令。 它是一个以冒号分隔的目录列表，在 SPECTRE 上可能会很长，反映了您可能已加载的应用程序和程序模块的数量。

```bash
echo $PATH
```

将会显示你的 PATH 变量的内容。

你可以继续在已经存在的 path 变量后添加新的:

> 可以在一行上添加多个，只需要用“:”进行分隔开。

```bash
export PATH=$PATH:~/units174/bin
```

如果要永久生效，在`.bashrc`后面添加:

```bash
PATH=$PATH:~/units174/bin
```

**which**

which 命令可以显示命令的完整路径（前提是该文件位于该路径中）。

```bash
which command
which wget
```

如果有多个同名的应用，可以加上参数`-a`来显示全部。

（同名的应用，只有列表中的第一个会生效）

### Bash 的常用快捷方式

- **Tab** = 自动补全命令或者文件/目录名称

- **Ctrl + C** = 终止当前命令

- **Ctrl + A** = 光标移动到行首

- **Ctrl + E** = 光标移动到行尾

- **Ctrl + W** = 删除光标前的一个单词

- **Ctrl + U** = 删除光标前的内容

- **Ctrl + K** = 删除光标后的内容

- **Ctrl + Y** = 粘贴删除的内容

- **Ctrl + D** = 退出当前 shell（比如 sort 进入读键盘操作后）

- **Ctrl + L** = 清屏（常用）

- **Ctrl + R** = 搜索历史命令

### 系统启动需要加载的配置文件

> 主要包括 bash 的配置文件，环境变量配置文件，以及脚本文件等。
>
> 修改环境变量配置后，需要用 `source /PATH/TO/FILE_NAME` 来重新加载配置使其生效

/root/.bash_profile

/root/.bashrc

~/.bash_profile

~/.bashrc

/etc/profile

/etc/bashrc

/etc/rc.local（/etc/rc.d/rc.local）: 开机启动文件，不推荐使用，可以通过服务实现

/etc/profile.d/\*.sh: 系统启动后自动执行的脚本文件夹

/etc/sysconfig/i18n

**注意**: 如果是 zsh，那么配置文件为`~/.zshrc`。

**.bash_profile 和 .bashrc 的区别**

- `.bash_profile` 是登录 shell 执行的配置文件，只有在登录 shell 时才会执行。

- `.bashrc` 是交互式 shell 执行的配置文件，每次打开新的终端时都会执行。

### 常用的网络应用目录

PHP 配置: /etc/php.ini

PHP-FPM 配置目录: /etc/php-fpm.d/

MySQL 配置: /etc/my.cnf

Nginx 配置: /etc/nginx/

Apache 配置目录: /etc/apache2/

Apache 默认网站目录: /var/www/html/(可以通过配置文件 httpd.conf 中 DocumentRoot 来修改)

### ‼️ 权限相关的数字及字母

如: `chmod 755 filename`，其中 755 代表文件的权限，分别代表所有者、所属组、其他用户的权限，7 代表读写执行，5 代表读和执行，0 代表无权限；

也可以使用类似`ug=rwx, o=rw`的方式来修改权限。

比如: `chmod u=rwx, g=rw, o=rw filename`

也可以用类似`+x`来增加权限，

比如: `chmod +x filename`

下面是所有符号的含义:

- `+`: 添加权限

- `-`: 删除权限

- `=`: 设置权限

- `r`: 读权限

- `w`: 写权限

- `x`: 执行权限

- `u`: 所有者

- `g`: 所属组

- `o`: 其他用户

- `a`: 所有用户

### service 和 systemctl 的区别

`systemctl` 和 `service` 命令都用于管理系统服务，包括启动、停止、重启和检查服务状态等。它们的不同之处在于它们是不同的服务管理工具，适用于不同的系统。

- `systemctl` 是 systemd 的主要命令，用于管理系统的服务和其他系统资源。

- `systemctl` 可以启动、停止、重启和重新加载系统服务，并提供了更多高级功能，如启用/禁用服务、查看服务状态和日志等。

- `service` 命令是一个简单的系统服务管理工具，用于启动、停止和重启系统服务。
- `service` 命令主要用于 SysVinit 系统，这是旧版本的 Linux 系统使用的 init 系统。

虽然在一些新的 Linux 发行版中，`systemctl` 取代了 `service` 命令成为了管理系统服务的首选工具，但在一些较旧的系统中，`service` 命令仍然可以使用，因为系统可能仍然使用着 SysVinit 系统。

### ls -l 长目录结果代表的意思

下面是 `ls -l` 命令输出的示例:

```bash
-rw-r--r-- 1 user group 4096 May  1 10:00 file.txt
drwxr-xr-x 2 user group 4096 May  1 09:59 directory
```

现在让我们逐个解释每列的含义:

1. 第一列: 文件权限和文件类型
   - 第一个字符:
     - `-` 表示这是一个普通文件。
     - `d` 表示这是一个目录。
     - `l` 表示这是一个符号链接。
     - `c` 表示这是一个字符设备文件。
     - `b` 表示这是一个块设备文件。
     - `s` 表示这是一个套接字文件。
     - `p` 表示这是一个命名管道。
   - 后续的九个字符（每三个一组）表示文件的权限，分别代表了文件所有者、文件所属组和其他用户的读、写和执行权限。
2. 第二列: 硬链接数
   - 表示指向此文件或目录的硬链接的数量。
3. 第三列: 文件所有者
   - 表示此文件或目录的所有者。
4. 第四列: 文件所属组
   - 表示此文件或目录所属的组。
5. 第五列: 文件大小（以字节为单位）
   - 对于目录来说，这个字段一般没有实际意义，因为目录大小并不代表其中包含的文件大小总和。
6. 第六列至第八列: 最后修改的日期和时间
   - 表示文件或目录最后一次修改的日期和时间。
7. 最后一列: 文件或目录的名称

### 芯片或 CPU 的架构信息

一般通过 `uname -m` 命令可以查看 CPU 的架构信息。

- `x86_64`: 64 位的 Intel 或 AMD x86 处理器。

- `i386`、`i486`、`i586`、`i686`: 32 位的 Intel x86 处理器。

- `armv7l`、`armv8l`: ARM 处理器，数字和字母表示具体的版本和类型。

- `aarch64`: ARM 64 位处理器。

- `ppc64le`: IBM PowerPC 处理器。

假设你运行了 uname -a 命令，得到了以下输出：

```bash
Linux example.com 5.4.0-65-generic #73-Ubuntu SMP Mon Jan 18 17:25:17 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux
```

- `5.4.0-65-generic` 表示内核版本。

- `#73-Ubuntu SMP Mon Jan 18 17:25:17 UTC 2021` 表示内核编译信息。

- 第一个 `x86_64` 表示硬件平台。

- 第二个 `x86_64` 表示操作系统。

- 第三个 `x86_64` 表示内核。

- `GNU/Linux` 表示具体的操作系统分支。

### 编译安装的常用操作及知识

**一般步骤**

1. 下载源代码

   ```bash
   wget http://example.com/package.tar.gz
   ```

2. 解压源代码

   ```bash
   tar -xzvf package.tar.gz
   ```

3. 进入源代码目录

   ```bash
   cd package
   ```

4. 配置

   ```bash
   ./configure
   ```

   如果需要指定安装目录，可以使用`--prefix`参数

   ```bash
   ./configure --prefix=/usr/local
   ```

5. 编译

   ```bash
   make
   ```

6. 安装

   ```bash
   make install
   ```

**编译安装后，撤销安装**

可以通过 `make uninstall` 来卸载已经安装的软件，但是并不是所有的软件都支持这个命令。

## 文件相关

我们可以结合多个命令来完成一些复杂的操作，比如查找大文件、合并文件、创建多个文件等。

### 使用 sed 批量替换文本内容

`sed` 是一个流编辑器，用于处理文本数据。`sed` 可以用于替换文本、删除文本、插入文本等。

特别是在通过脚本来修改配置文件时，`sed` 是一个非常有用的工具。

**基本语法**

```bash
sed [options] 's/old/new/g' filename
```

- `s`：表示替换操作。

- `g`：表示全局替换。

**选项**

- `-i`：直接修改文件内容。

  `-i.bak`：修改文件内容，并备份原文件。

- `-e`：多次替换。

**示例-批量替换多个文件中的文本**

```bash
find /path/to/files -type f -name "*.conf" -exec sed -i.bak 's|/www/server/panel/vhost/|/www/vhost/|g' {} +
```

- `exec ... {} +`：表示将多个文件作为参数传递给 `sed` 命令。

- `s|old|new|g`：表示将 `old` 替换为 `new`。

### 使用 awk 处理文本数据

`awk` 是一个强大的文本处理工具，可以用于格式化文本、提取数据、计算数据等。

每列的数据称为一个字段，`awk` 默认以空格作为字段分隔符，可以使用`-F`参数指定其他分隔符。

**最佳实践**

- 为了减少 `awk` 需要处理的数据量，可以先使用 `grep` 命令来过滤数据。

**基本语法**

```bash
awk [options] 'pattern { action }' filename
```

- `pattern`：可选，用于指定要匹配的模式。

- `action`：动作，用于处理匹配的文本行。

**模式**

`pattern` 是一个模式，用于匹配文本行。`pattern` 可以是一个正则表达式、一个条件表达式、一个范围表达式等。

```bash
awk '/pattern/ { action }' filename
```

- `/pattern/`：正则表达式，用于匹配文本行。

- `!`：逻辑非，用于取反。

- `&&`：逻辑与，用于组合多个条件。

- `||`：逻辑或，用于组合多个条件。

- `BEGIN`：在处理文本行之前执行。

- `END`：在处理完所有文本行后执行。

**操作块**

`{ action }` 是一个操作块，用于处理匹配的文本行。操作块可以包含多个命令，多个命令之间使用分号分隔。

```bash
awk '{ print $1, $2 }' filename
```

可以使用分号将多个操作块连接在一起。

```bash
awk '{ print $1; print $2 }' filename
```

逻辑块中也可以进行逻辑判断。

```bash
awk '{ if ($1 > 10) print $1 }' filename
```

**内置函数**

`awk` 提供了一些内置函数，用于处理文本数据。

- `length(string)`：返回字符串的长度。

- `print`：打印文本行。

- `printf`：格式化打印文本行。

  格式化字符串中的占位符:

  - `%s`：字符串

  - `%d`：整数

  - `%f`：浮点数

- `tolower(string)`：将字符串转换为小写。

**内置变量**

`awk` 提供了一些内置变量，用于处理文本数据。

- `$0`：整个文本行。

- `$1`、`$2`、`$3`：第一个、第二个、第三个字段。

- `NF`：字段数量。

- `NR`：行号。

- `FS`：字段分隔符，默认为空格。

- `OFS`：输出字段分隔符，默认为空格。

**示例**

- 打印文件的第一列

  ```bash
  awk '{ print $1 }' filename
  ```

- 处理 nginx 的日志文件

  具体代码可以在 `网络` --> `获取服务器流量消耗信息` 中查看。

### 打印文件及目录的树形结构

我们可以利用 `find` 来实现一个简单的文件树形结构。

```bash
find /path/to/directory -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'
```

- `sed` 命令用于对文本进行替换操作。

  `s;[^/]*/;|____;g` 用于将目录替换为 `|____`。

  `s;____|; |;g` 用于将 `|____` 替换为 `|`，用于进一步调整格式。

如果文件不多，我们可以优化下输出格式（让层级更加明显）。

```bash
find . -print | sed -e 's;[^/]*/;|--;g;s;--|;   |;g'
```

每次输入很麻烦，想快速查看目录结构，可以通过建立一个别名来实现。

```bash
alias tree="find . -print | sed -e 's;[^/]*/;|--;g;s;--|;   |;g'"
```

如果你希望这个别名长期生效，可以将其添加到 `~/.bashrc` 文件中。

### 查找大文件并按照体积排序

**方法一、使用 du 命令**

`du`命令用于查看文件和目录的磁盘使用情况。

假设我们想查找指定目录下最大的 10 个文件和目录，可以使用以下命令：

```bash
du -ah /path/to/directory | sort -rh | head -n 10
```

- `du -ah /path/to/directory` 用于查看指定目录下所有文件和目录的大小

- `sort -rh` 用于按照文件大小逆序排序

- `head -n 10` 用于显示前 10 行。

**方法二、使用 find 命令**

`find`命令用于查找文件和目录。

假设我们想查找指定目录下大于 100MB 的文件，可以使用以下命令：

```bash
find /path/to/directory -type f -size +100M -print0 | xargs -0 ls -lh | awk '{ print $9 ": " $5 }'
```

- `find /path/to/directory -type f -size +100M -print0` 用于查找大于 100MB 的文件

- `xargs -0 ls -lh` 用于显示文件的详细信息

- `awk '{ print $9 ": " $5 }'` 用于显示文件名和大小。

如果要求不高，我们可以使用以下命令：

```bash
find /path/to/directory -type f -size +100M -print0 | xargs -0 du -h | sort -nr
```

- `xargs -0 du -h` 用于显示文件的大小

- `sort -nr` 用于按照文件大小逆序排序。

**方法三、使用 ncdu 命令**

`ncdu` 是一个交互式的磁盘使用情况分析工具，需要安装。

```bash
ncdu /path/to/directory
```

### 保留日志最后 N 行，减小日志文件大小

有时日志文件会变得非常大，可以使用`tail`命令保留日志文件的最后 N 行，来实现减小日志文件大小的目的。

```bash
tail -n 1000 logfile > logfile.new
mv logfile.new logfile
```

_有时候空间并不会立刻释放出来，所以考虑重启服务或者服务器来立即释放空间。_

### 使用 cat 合并追加文件

cat file1 file2 > target_file: 将多个文件合并到目标文件中。

```bash
cat file1 file2 > target_file
```

cat file1 file2 >> target_file: 将几个文件附加到目标文件中。

```bash
cat file1 file2 >> target_file
```

### 快速创建多个文件或者目录

可以使用`{1,2,3}`这种方式来创建多个文件或者目录

```bash
mkdir newDir{1,2,3}
```

如果想创建多个层级的目录，可以使用`-p`参数

```bash
mkdir -p newDir/{subDir1,subDir2}
```

### 快速统计目录内文件个数

可以先列出目录下的所有文件和子目录，并且通过`grep`命令筛选出文件行（以`-`开头），最后使用`wc -l`命令统计行数。

```bash
ls -l | grep "^-" | wc -l
```

### less 查看文件支持更多操作

1. **搜索**:
   - 按下 `/` 键后输入要搜索的内容，然后按 Enter 键。`less` 将高亮显示匹配的内容，并使用 `n` 和 `N` 键分别向前和向后跳转到下一个或上一个匹配项。
2. **跳转**:
   - 使用 `g` 命令跳转到文件的开头。
   - 使用 `G` 命令跳转到文件的末尾。
   - 使用 `1G` 命令跳转到文件的第一行。
   - 使用 `n<Enter>` 命令跳转到文件的第 n 行。
3. **标记位置**:
   - 按下 `m` 键后输入一个字母（比如 `a`）以在当前位置标记。然后，可以使用 `'a` 命令回到该标记位置。
4. **显示行号**:
   - 按下 `-N`（大写 N）命令可以显示行号。
5. **执行外部命令**:
   - 按下 `!` 键后输入要执行的外部命令，然后按 Enter 键。例如，`!ls` 可以执行 `ls` 命令并显示结果。
6. **切换布局**:
   - 按下 `v` 键可以切换到编辑器模式，以便在 `vi` 或其他编辑器中编辑当前文件。
7. **退出**:
   - 按下 `q` 键退出 `less`。

### 使用 grep 查找文本

查找文本在某个文件中

可以加`-a`参数，表示以文本方式查看二进制文件

```bash
grep -a "text" filename
```

其中字符串内容可以使用正则表达式

```bash
grep -a "sc[0-9]*" filename
```

### 解压缩文件 (tar, zip)

> `-v` 参数表示显示详细信息，`-f` 参数表示指定文件名，`-C` 参数表示指定解压缩目录。

一般可以用`tar`命令解压缩文件，例如:

**创建压缩文件**

```bash
tar -czvf archive.tar.gz file1 file2 file3
# 压缩目录
tar -czvf archive.tar.gz /path/to/directory
# 压缩目录并排除某些文件（多个文件添加多个--exclude参数）
tar -czvf archive.tar.gz --exclude='*.log' /path/to/directory
```

- `--exclude` 参数需要在目标目录之前使用。

**创建带时间戳的压缩文件**

```bash
tar -czvf "archive_$(date +'%Y%m%d_%H%M%S').tar.gz" /path/to/directory
```

- `$(date +'%Y%m%d_%H%M%S')` 用于获取当前时间并格式化。

- 最终的压缩文件名将会是 `archive_20210101_120000.tar.gz`。

**解压缩文件**

```bash
tar -xzvf archive.tar.gz -C /path/to/extract
```

**查看压缩包内容**

```bash
tar -tvf archive.tar.gz
```

要注意参数`-z`表示使用 gzip 压缩，如果是其它格式的压缩文件，可以使用`-j`（bzip2）或者`-J`（xz）。

**macOS 上可以使用 zip 命令**

```bash
zip -r archive.zip /path/to/directory
```

- `-r` 递归压缩

  如果是单文件，可以不用加`-r`参数。如：`zip archive.zip file1 file2 file3`

- 解压缩可以用`unzip`命令

  ```bash
   unzip archive.zip -d /path/to/extract
  ```

  - `-d` 参数指定解压缩目录

### 查找文件

**查找文件/文件夹并进行排序**

可以结合 `find` 和 `sort` 实现

- 通过文件名查找文件并按照名称排序

```bash
find . -name "*.service" -maxdepth 1 -type f | sort
```

- 查找文件并按照文件大小排序

```bash
find . -type f -exec ls -l {} + | sort -k 5n
```

这个命令会先使用 `find` 命令找到所有文件，然后通过 `ls -l` 命令获取它们的详细信息，并通过管道将结果传递给 `sort` 命令。`sort -k 5n` 会按照第五列（文件大小）进行数字排序。

你也可以直接在 `find` 命令中使用 `-exec` 选项和 `-printf` 来获取文件的大小信息，然后再排序。例如:

```bash
find . -type f -printf "%s %p\n" | sort -n
```

**locate**

它是直接从预先构建好的数据库中进行搜索，而不是像 `find` 命令一样实时遍历文件系统，可以实现更快搜索。

> 安装: yum install mlocate

- `updatedb`: 更新文件及目录索引数据库（第一次使用可能需要执行这条命令）

之后就可以使用`locate`命令来查找文件了。

```bash
locate filename
```

**查找文件并随机选择一个**

```bash
find . -type f | shuf -n 1
```

- `shuf` 命令用于随机排序输入行，`-n 1` 用于显示一个随机行。

### 远程复制文件到本地

**可以使用`scp` (secure copy) 来实现。**

`scp` 命令是一个用于在 Linux 系统之间复制文件和目录的命令行工具。它使用 SSH 协议来加密传输数据，因此非常安全。

`scp` 命令通常用于将文件从本地系统复制到远程系统，也可以用于在远程系统之间复制文件。

```bash
# 复制远程文件到本地
scp username@remote_host:/path/to/remote/file /path/to/local/destination
# 本地文件复制到远程服务器（指定远程服务器端口）
scp -P 22 /path/to/local/file username@remote_host:/path/to/remote/destination
```

还可以添加参数:

- `-r` 递归复制，复制目录时需要带上

- `-P` 指定端口

- `-p` 保留文件属性

- `-q` 静默模式

- `-C` 压缩传输数据

**也可以使用`rsync`命令来实现。**

`rsync`比`scp`更加强大，它可以在本地和远程系统之间同步文件和目录，支持增量传输，可以快速复制大量文件。

```bash
# 本地文件复制到远程服务器
rsync -avz -e "ssh -p 22" /path/to/local/file username@remote_host:/path/to/remote/destination
# 远程文件复制到本地
rsync -avz username@remote_host:/path/to/remote/file /path/to/local/destination
```

- `avz` 分别代表着 `archive`、`verbose` 和 `compress` 选项，它们分别用于保留文件属性、显示详细信息和压缩传输数据。

- `-e`参数，它允许你指定一个自定义的 SSH 端口，如果是默认的 22 端口，可以省略。

默认情况下，`rsync`是没有进度条的，如果想要显示进度条，可以添加`--progress`参数，或者使用`--info=progress2`参数。

## 应用管理

### yum 管理工具的使用

查看所有软件列表: yum repolist all | grep mysql

查看已安装的软件列表: yum list installed

卸载应用: `yum remove [package_name]`

深度卸载: `yum autoremove [package_name]`

清除缓存: `yum clean all`

重新生成缓存: `yum makecache`（更换源后需要执行）

### apt 管理工具的使用

在 Debian 系统中，`apt` 是一个用于管理软件包的高级工具，它提供了一组用于搜索、安装、更新和删除软件包的命令。

以下是一些常用的 `apt` 命令:

- **apt update**: 更新软件包列表，以获取最新的软件包信息。

- **apt upgrade**: 升级所有已安装的软件包到最新版本。

- **apt install PACKAGE_NAME**: 安装一个特定的软件包。

- **apt remove PACKAGE_NAME**: 卸载一个特定的软件包。

- **apt search KEYWORD**: 搜索软件包。

- **apt show PACKAGE_NAME**: 显示软件包的详细信息。

- **apt list --installed**: 列出所有已安装的软件包。

- **apt list --upgradable**: 列出所有可以升级的软件包。

- **apt autoremove**: 删除不再需要的软件包。

- **apt clean**: 清理下载的软件包文件。

- **apt autoclean**: 清理过期的软件包文件。

## 服务管理

### 使用 ln 命令为服务创建快捷方式

例如: `ln -s /usr/local/nginx/sbin/nginx /usr/local/bin/nginx`，则可以通过`nginx`命令启动 Nginx 服务

### 使用 systemctl 命令管理服务

systemd 是一个 init 系统和系统管理守护进程，用于启动、停止和管理系统中的各种服务和进程。

`systemctl` 是一个 Linux 系统中用于管理 systemd 服务的命令行工具。

> 对应的服务目录: /usr/lib/systemd/system/\*.service

以下是 `systemctl` 命令的一些常见用法和解释:

1. **启动服务**: 启动一个特定的服务。

   ```bash
   systemctl start SERVICE_NAME
   ```

2. **停止服务**: 停止一个特定的服务。

   ```bash
   systemctl stop SERVICE_NAME
   ```

3. **重启服务**: 停止并重新启动一个特定的服务。

   ```bash
   systemctl restart SERVICE_NAME
   ```

4. **重新加载配置**: 重新加载一个特定服务的配置文件，使新的配置生效，而不需要重启服务。

   ```bash
   systemctl reload SERVICE_NAME
   ```

5. **查看服务状态**: 查看特定服务的状态，包括是否正在运行。

   ```bash
   systemctl status SERVICE_NAME
   ```

6. **启用服务**: 将一个服务设置为在系统启动时自动启动。

   ```bash
   systemctl enable SERVICE_NAME
   ```

7. **禁用服务**: 将一个服务设置为在系统启动时不自动启动。

   ```bash
   systemctl disable SERVICE_NAME
   ```

8. **查看服务是否启用**: 查看一个服务是否已经设置为在系统启动时自动启动。

   ```bash
   systemctl is-enabled SERVICE_NAME
   ```

9. **查看所有已启用的服务**: 列出所有已经设置为在系统启动时自动启动的服务。

   ```bash
   systemctl list-unit-files --type=service | grep enabled
   ```

10. **查看所有正在运行的服务**: 列出当前正在运行的所有服务。

    ```bash
    systemctl list-units --type=service | grep running
    ```

以下是一些常用的 Web 服务已经它对应的服务名称

- Nginx: nginx

- Apache: httpd and apache2

- MySQL: mysqld

- PHP-FPM: php-fpm

- Redis: redis

- Memcached: memcached

### crontab 定时任务

crontab 是用来让使用者在固定时间或固定间隔执行程序之用，可以用于定期备份文件、清理日志、定时运行脚本等。

crontab 的配置文件通常位于 `/etc/crontab` 或者 `/var/spool/cron` 目录中。

- **crontab [ -u user ]**: 定时任务管理

  `-e` 编辑定时任务

  `-l` 列出定时任务

  `-r` 删除定时任务

  `-u` 指定用户(可以列出指定用户的定时任务)

  `-u user` 是指设定指定 user 的时程表，这个前提是你必须要有其权限(比如说是 root)才能够指定他人的时程表。如果不使用 -u user 的话，就是表示设定自己的时程表。

- **MIN HOUR DOM MON DOW [USER] CMD**: 分别表示分钟、小时、日期、月份、星期，`*`表示任意时间。

  ```bash
  # ┌───────────── 分鐘   (0 - 59)
  # │ ┌─────────── 小時   (0 - 23)
  # │ │ ┌───────── 日     (1 - 31)
  # │ │ │ ┌─────── 月     (1 - 12)
  # │ │ │ │ ┌───── 星期幾 (0 - 7，0 是週日，6 是週六，7 也是週日)
  # │ │ │ │ │
  # * * * * * /path/to/command --your --parameter
  ```

**特殊规则**

通常以`@`开头，以下是特殊规则及说明:

| 排程規則    | 說明                               |
| :---------- | :--------------------------------- |
| `@reboot`   | 每次重新開機之後，執行一次。       |
| `@yearly`   | 每年執行一次，亦即 `0 0 1 1 *`。   |
| `@annually` | 每年執行一次，亦即 `0 0 1 1 *`。   |
| `@monthly`  | 每月執行一次，亦即 `0 0 1 * *`。   |
| `@weekly`   | 每週執行一次，亦即 `0 0 * * 0`。   |
| `@daily`    | 每天執行一次，亦即 `0 0 * * *`。   |
| `@hourly`   | 每小時執行一次，亦即 `0 * * * *`。 |

例如每天執行一次，就可以這樣寫:

```bash
# 每天執行一次
@daily /home/user/script.sh --your --parameter
```

**以下是一些常见的定时任务的配置示例:**

1. **每天凌晨 3 点执行备份脚本**:

   ```bash
   0 3 * * * /path/to/backup.sh
   ```

2. **每 3 小时执行一次脚本**:

   ```bash
   0 */3 * * * /path/to/script.sh
   ```

3. **每周一凌晨 2 点执行清理日志脚本**:

   ```bash
   0 2 * * 1 /path/to/clean_logs.sh
   ```

4. **每隔 30 分钟执行一次脚本**:

   ```bash
   */30 * * * * /path/to/script.sh
   ```

5. **每小时执行一次脚本**:

   ```bash
   0 * * * * /path/to/script.sh
   ```

6. **每月 1 号凌晨 1 点执行脚本**:

   ```bash
   0 1 1 * * /path/to/script.sh
   ```

7. **每月 1 日、15 日、29 日晚上 9 點 30 分各执行一次**

   ```bash
   30 21 1,15,29 * * /path/to/script.sh
   ```

8. **从早上 9 点到下午 6 点，凡遇到整点就执行**

   ```bash
   0 9-18 * * * /path/to/script.sh
   ```

9. **使用@reboot 标记在系统启动时执行脚本**:

   ```bash
   @reboot /path/to/script.sh
   ```

10. **使用@daily 标记每天执行脚本**:

    ```bash
    @daily /path/to/script.sh
    ```

### 使用 logrotate 管理日志文件

`logrotate` 是一个在 Linux 操作系统中用来管理日志文件的工具。`logrotate` 可以定期对日志文件进行压缩、删除、邮件通知等操作。

配置文件通常位于 `/etc/logrotate.conf` 和 `/etc/logrotate.d/` 目录中，系统管理员可以在这些配置文件中定义具体的日志轮换策略。

简单的 `logrotate` 配置示例如下：

```bash
/var/log/syslog {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 0640 root utmp
    sharedscripts
    postrotate
        /usr/lib/rsyslog/rsyslog-rotate
    endscript
}
```

这个配置对 `/var/log/syslog` 日志文件进行如下操作：

- `daily`：每天轮换一次日志文件。
- `missingok`：如果日志文件不存在，不会报错继续执行。
- `rotate 7`：保留最近的 7 个日志文件，超出部分将被删除。
- `compress`：轮换后的日志文件进行压缩。
- `delaycompress`：延迟压缩到下次轮换时。
- `notifempty`：如果日志文件为空，不进行轮换。
- `create 0640 root utmp`：创建新日志文件，权限设置为 0640，所有者为 root，所属组为 utmp。
- `sharedscripts`：在日志文件轮换前后执行脚本。
- `postrotate` 到 `endscript`：在日志文件轮换后执行 `/usr/lib/rsyslog/rsyslog-rotate` 脚本。

## 网络相关

### 获取服务器流量消耗信息

如果是网络服务器的话，通常都会用到 Nginx 或者 Apache 来提供服务，可以通过查看 Nginx 或者 Apache 的访问日志来获取服务器流量消耗信息。

这里以 Nginx 为例，Nginx 的访问日志文件通常位于 `/var/log/nginx/access.log`。

**查看今日流量总量**

```bash
awk '{sum += $10} END {
    if (sum >= 1073741824)
        printf "Total Traffic: %.2f GB\n", sum/1073741824;
    else if (sum >= 1048576)
        printf "Total Traffic: %.2f MB\n", sum/1048576;
    else if (sum >= 1024)
        printf "Total Traffic: %.2f KB\n", sum/1024;
    else
        printf "Total Traffic: %.2f B\n", sum;
}' /var/log/nginx/access.log
```

**统计今日流量消耗前 20 的 IP 地址**

```bash

awk '{print $1, $10}' /var/log/nginx/access.log | \
awk '{a[$1]+=$2} END {for (i in a) print i, a[i]}' | \
sort -nrk2 | head -20 | \
awk '{
    if ($2 >= 1073741824)
        printf "%s %.2f GB\n", $1, $2/1073741824;
    else if ($2 >= 1048576)
        printf "%s %.2f MB\n", $1, $2/1048576;
    else if ($2 >= 1024)
        printf "%s %.2f KB\n", $1, $2/1024;
    else
        printf "%s %.2f B\n", $1, $2;
}'
```

**查看今日流量消耗前 20 的 URL**

```bash
awk '{print $7, $10}' /var/log/nginx/access.log | \
awk '{a[$1]+=$2} END {for (i in a) print i, a[i]}' | \
sort -nrk2 | head -20 | \
awk '{
    if ($2 >= 1073741824)
        printf "%s %.2f GB\n", $1, $2/1073741824;
    else if ($2 >= 1048576)
        printf "%s %.2f MB\n", $1, $2/1048576;
    else if ($2 >= 1024)
        printf "%s %.2f KB\n", $1, $2/1024;
    else
        printf "%s %.2f B\n", $1, $2;
}'
```

**分析已压缩的日志文件**

如果日志文件是经过压缩的，可以使用`zcat`命令来查看日志文件内容。

比如我想查看 `access.log-20241029.gz` 中的 IP 为 `192.168.1.1` 的访问记录，可以使用以下命令：

```bash
zcat access.log-20241029.gz | \
grep "192.168.1.1" | awk '{print $7}' | sort | uniq -c | sort -nr | head -n 50
```

这条命令会筛选指定 IP 地址的访问日志，并提取出所有路径，然后统计每个路径的**访问次数**并按照访问次数进行降序排列

**流量监控工具**

- `iftop`：实时监控网络流量

  `iftop -i eth0` 可以监控指定网卡的流量

  `iftop -i eth0 -f "host 192.168.1.1"` 可以监控指定主机的流量

  `h` 显示帮助

### 获取本机的网络信息

**获取本机的 IP 地址**

```bash
ip addr show
```

### 使用 cURL 或者 wget 下载文件

cURL 是一个用于传输数据的命令行工具，支持多种协议，如 HTTP、HTTPS、FTP 等。

下面是使用 cURL 下载文件的一些常见用法:

```bash
curl -f -SOJL -H "License: license_key" \
https://chevereto.com/api/download/latest
```

`-f` 参数表示如果下载失败，则不创建文件。

`-S` 参数表示显示错误信息。

`-O` 参数表示将下载的文件保存到本地，并使用远程文件的文件名。

`-J` 参数表示使用远程文件的文件名。

`-L` 参数表示跟踪重定向。

`-H` 参数表示添加请求头。

`-s` 参数表示安静模式，不显示进度。

`-k` 参数表示允许不安全的 SSL 连接。

`-X` 参数表示设置请求方法

也可以使用**wget**来下载文件

```bash
wget -O filename https://example.com/file
```

常用的 wget 参数一般为：

- `-O`：指定下载文件的名称

- `-P`：指定下载目录

- `-c`：断点续传

- `-b`：后台下载

- `-q`：安静模式，不输出下载进度

- `-t`：重试次数

- `-T`：超时时间

- `-i`：从文件中读取下载地址（后面跟文件，里面都是 url，以行分割）

- `-r`：递归下载

### 测试服务器是否可以连接某网站

可以通过自带的连接工具，比如使用`wget`来下载页面内容。

```bash
wget -p http://site.com
```

- `P` 参数表示下载页面的所有资源

或者使用`curl`命令，可以查看响应头信息

```bash
time curl -I http://yourpage.com
```

- `-I` 参数表示只显示响应头信息

### 查看网站的 SSL 证书及部署情况

可以使用`openssl`来模拟请求，查看证书详细信息：

```bash
echo | openssl s_client -connect localhost:443 -servername your_domain.com 2>/dev/null
```

- `echo` 命令用于向管道发送空字符串，给 `openssl` 命令提供输入

- `-connect` 要访问的目标地址和端口，如果是远程的话，需要替换为远程地址，可以为域名或者 IP 地址

- `-servername` 告知服务器要访问的域名，如果访问的已经是远程域名，可以省略

也可以继续把输出信息交给`openssl`来只显示证书有效期：

```bash
echo | openssl s_client -connect localhost:443 -servername your_domain.com 2>/dev/null | openssl x509 -noout -dates
```

**返回信息**

- `notBefore` 表示证书的生效日期

- `notAfter` 表示证书的过期日期

- `subject` 表示证书的主题

  `CN` 表示证书的主要域名，如果是通配符证书，会显示 `*.domain.com`

- `subjectAltName` 表示证书的子域名信息

### 查看 TCP 连接数

1）统计 80 端口连接数

```bash
netstat -nat|grep -i "80"|wc -l
```

2）统计 httpd 协议连接数

```bash
ps -ef|grep httpd|wc -l
```

3）统计已连接上的，状态为“established

```bash
netstat -na|grep ESTABLISHED|wc -l
```

4）查出哪个 IP 地址连接最多

```bash
# 分析当前系统上的网络连接情况，并统计每个来源 IP 地址的连接数量
netstat -ntu | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort  -r -n
# 按照连接次数从高到低进行排序，显示出每个 IP 地址建立的连接数量
netstat -na | grep ESTABLISHED | awk '{print $5}' | awk -F: '{print $1}' | sort | uniq -c|sort -r -n
```

`netstat -ntu`: 这个部分执行了 netstat 命令来显示当前系统的网络连接情况。其中 `-n` 参数表示以数字形式显示 IP 地址和端口号，`-t` 参数表示显示 TCP 协议的连接，`-u` 参数表示显示 UDP 协议的连接。

5）显示所有监听的 TCP 端口

```bash
netstat -ntlp
```

6）显示特定端口的监听状态:

```bash
netstat -ntlp | grep 80
```

7）显示所有活动的 UNIX 域套接字:

```bash
netstat -axu
```

8）统计 TCP 连接状态的类型和数量:

```bash
netstat -n | awk '/^tcp/ {++S[$NF]} END {for (a in S) print a, S[a]}'
```

9）显示连接的进程 ID 和程序名称:

```bash
netstat -natp
```

10）显示路由表

```bash
netstat -nr
```

## 进程管理

### 使用 PS 查找进程

- `ps aux`: 查看所有进程

- `ps aux|grep nginx`: 查找 nginx 进程

- `ps aux|grep php-fpm`: 查找 php-fpm 进程

  还可以使用`lsof -i :port`来查看指定端口的进程情况（可能需要安装 lsof）。

### 使用 kill 关闭进程

- `kill -9 PID`: 关闭指定 PID 的进程

- `killall -9 nginx`: 关闭所有 nginx 进程

  `-9` 表示强制关闭进程（不进行清理操作）

  kill 后面可以跟多个进程 ID，用空格隔开

## 防火墙

### 使用 ufw 管理防火墙

ufw 是 Debian/Ubuntu 系统中的一个简单的防火墙管理工具，可以用来配置 iptables 防火墙规则。

> 如果没有安装，可以使用`apt`来安装，命令为：`apt install ufw`

**基础命令**

- ufw status verbose: 查看当前防火墙状态

- ufw app list 查看服务列表

- ufw status [numbered]: 列出防火墙规则（可以选择加上序号）

- ufw delete {num}: 有序号后就可以指定删除某条规则

**常用案例**

允许 22 端口的 TCP 请求访问（不加“/tcp”为允许 tcp 和 udp）

```bash
ufw allow 22/tcp
```

拒绝指定端口访问

```bash
# []表示可选项
ufw deny 25[/tcp comment 'Block access to smptd by default']
```

**更多案例**

To allow IP address 192.168.1.10 access to port 22 for all protocols
`sudo ufw allow from 192.168.1.10 to any port 22`
Open port 74.86.26.69:443 (SSL 443 nginx/apache/lighttpd server) for all, enter:
`sudo ufw allow from any to 74.86.26.69 port 443 proto tcp`
To allows subnet 192.168.1.0/24 to Sabma services, enter:
`ufw allow from 192.168.1.0/24 to any app Samba`

To get information on Squid profile/app, run:
`ufw app info Squid`

## 主机相关

### 查看及修改主机信息

> 主机的名称是服务器的标识，可以通过主机名来访问服务器，配置文件在 /etc/hostname

- `hostname`: 查看主机名

- `hostname newname`: 修改主机名（临时）

- `hostnamectl set-hostname newname`: 修改主机名

- `hostnamectl set-hostname newname --static`: 修改静态主机名

- `hostnamectl set-hostname newname --pretty`: 修改主机名的美观名称

- `hostnamectl set-hostname newname --transient`: 修改临时主机名

### 查看系统的芯片和其他硬件信息

- `lscpu`: 查看 CPU 信息

  显示有关 CPU 架构的信息，包括其类型、核心数、架构等。

- `lshw`: 查看硬件信息

  显示有关系统硬件的详细信息，包括 CPU、内存、磁盘、网络适配器等。

- `lsblk`: 查看块设备信息

- `lspci`: 查看 PCI 设备信息

- `uname -a`: 查看系统内核信息(包括内核版本和处理器类型)

- `cat /proc/cpuinfo`: 查看 CPU 信息

- `sudo dmidecode`: 查看硬件信息

  用于从系统的 BIOS 中提取硬件信息。

  你可以使用具体的选项来查看特定的硬件信息:

  - `sudo dmidecode -t processor`: 查看处理器信息

  - `sudo dmidecode -t memory`: 查看内存信息

  - `sudo dmidecode -t bios`: 查看 BIOS 信息

  你可以直接查看 /proc/cpuinfo 文件来获取。

- `free -h`: 查看内存使用情况

### SSH 密钥生成及应用

**SSH 密钥认证**是一种更安全的登录方式，它通过公钥和私钥的方式来进行认证，避免了传统的用户名和密码登录方式的弊端。

**生成 SSH 密钥**

```bash
ssh-keygen -t rsa -b 4096 -C "comment"
```

- `-t rsa`：指定密钥类型为 RSA。

- `-b 4096`：指定密钥长度为 4096 位。

- `-C "comment"`：添加注释。

**将公钥复制到远程服务器**

```bash
ssh-copy-id username@remote_host
```

**SSH 配置文件**

SSH 配置文件通常位于用户家目录下的 `.ssh` 目录中，文件名为 `config`。

```bash
Host remote_host
    HostName remote_host
    User username
    Port 22
    IdentityFile ~/.ssh/id_rsa
```

- `Host`：指定主机别名。

- `HostName`：指定主机地址。

- `User`：指定登录用户名。

- `Port`：指定 SSH 端口。

- `IdentityFile`：指定私钥文件。

**SSH 登录**

```bash
ssh username@remote_host
```

## 推荐工具

### tmux

### supervisor

`supervisor` 是一款用 Python 编写的进程管理工具，它可以用来监控和控制进程的运行状态。
