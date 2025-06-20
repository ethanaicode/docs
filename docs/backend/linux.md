# Linux

> Linux 的知识是非常多的，不同版本的系统也有差异，一篇文章肯定是不够的。
>
> 这里包含常用的知识，更多内容可以结合使用需求及公司场景进行学习和使用。

## Linux 命令

### 基础命令

- **ls**: 列出目录及文件名

  `-l` 长信息，可以查看权限等信息

  `-h` 人性化显示文件大小（可以结合上一条使用）

  `-a` 显示所有文件，包括隐藏文件

  `-F` 区分文件和目录

  - `/` 目录
  - `@` 符号链接文件（symbolic link）
  - `*` 可执行文件（executable）
  - `=` 套接字文件（socket）
  - `|` 管道文件（FIFO）

  `-r` 反序显示

  `-R` 递归显示

  `-t` 按时间排序

  `-S` 按文件大小排序

  `-d` 显示目录属性而非目录内容

  `-i` 显示文件的 inode 号

  `-n` 显示 UID 和 GID

  `--color=auto` 颜色显示

- **cd**: 切换目录

  `-` 返回上一次所在的目录

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

  `-f` 强制覆盖（默认）

  `-n` 不覆盖已有文件

  `-i` 交互式操作，移动前会询问是否覆盖

- **rm**: 删除文件

  `-r` 可以删除目录

- **chmod -R 775 filename**: 更改文件或者目录权限为 775

  `-R` 表示递归，可以同时修改文件夹及子文件夹和文件

- **chwon -R USER:GROUP filename**: 更改文件或者目录的所有者和所属组

  `-R` 表示递归，可以同时修改文件夹及子文件夹和文件

- **chattr**: 修改文件属性

  `+/-/=` 添加/删除/设定属性(忽略当前属性)

  `+i` 设置文件为只读

  `+a` 设置文件只能追加内容

- **ln**: <u>创建链接文件</u>

  `-s` 创建软链接（类似于 Windows 的快捷方式）

  _默认情况是硬链接，硬链接是指多个文件指向同一个 inode，删除一个文件不会影响其他文件，但是删除 inode 会影响所有文件_

  `-i` 交互式操作，如果目标文件已存在，会询问是否覆盖

  `-n` 如果目标文件已存在，不覆盖（默认）

  `-f` 强制创建

  如: `ln -s /path/to/file /path/to/link` 创建软链接

  **注意**: 最后的参数是链接文件名，也就是快捷方式的位置及名称

- **alias**: 设置别名

  `alias ll='ls -l'` 设置别名

  `unalias ll` 取消别名

- **ldd**: 查看动态链接库依赖

  `ldd redis.so` 查看 redis.so 的依赖库

### 命令行符号

- **>**: 重定向输出

  `command > filename` 将命令的输出重定向到文件

  `command >> filename` 将命令的输出追加到文件

- **<**: 重定向输入

  `command < filename` 将文件内容作为命令的输入

- **|**: 管道符号

  `command1 | command2` 将 command1 的输出作为 command2 的输入

- **xargs**: <u>将标准输入转换为命令行参数</u>（不接收标准输入的命令需要用到）

  `command | xargs command2` 将 command 的输出作为 command2 的参数

  `-n` 指定参数个数

  `-I` 指定替换字符串

  **注意**: xargs 默认是以空格作为分隔符，如果文件名中有空格，可能会出现问题

- **&**: 后台运行

  `command &` 将命令放到后台运行

- **&&**: 逻辑与

  `command1 && command2` 只有当 command1 执行成功后，才会执行 command2

- **||**: 逻辑或

  `command1 || command2` 只有当 command1 执行失败后，才会执行 command2

- **;**: 命令分隔符

  `command1; command2` 依次执行 command1 和 command2

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

  如: `echo $(ls) > filename` 将 ls 命令的输出写入文件

### 文本处理

- **cat filename**: 查看文件内容

  **less filename**: 逐页查看文件内容(空格翻页，支持额外操作)

  **more filename**: 逐页查看文件内容(空格翻页)

  **head filename**: 查看文件头部内容

  **tail filename**: 查看文件尾部内容

  - `-n` 指定行数（如: `tail -n 10 filename`，查看文件尾部 10 行）

- **wc filename**: 统计文件的行数、字数、字符数

  `-l` 只显示行数

  `-w` 只显示字数

  `-c` 只显示字符数

- **cut**: 截取文件内容

  `-c` 截取字符

  `-f` 截取字段

  `-d` 指定分隔符

  如: `cut -d ':' -f2 filename` 截取文件的第二个字段

- **awk**: 文本处理工具(很强大的工具这里只列出一些常用的)

  `awk '{print $1}' filename` 打印文件的第一列

  `awk -F ':' '{print $1}' filename` 指定分隔符

  `awk '{print $1, $2}' filename` 打印多列

  `awk '{print $1 > "file1"}' filename` 输出到文件

  `awk '{print $1, $2 > "file1"}' filename` 输出多列到文件

  `awk '{print $1, $2 >> "file1"}' filename` 追加到文件

  `awk '{print $1, $2 | "command"}' filename` 输出到命令

  `awk '{print $1, $2 | "sort"}' filename` 输出到排序命令

  _文件名也可以放在开头，通过 `|` 管道符号传递给 `awk` 命令_

- **tee**: 将标准输入复制到标准输出和文件

  `-a` 追加到文件

  如: `ls | tee filename` 将 ls 命令的输出写入文件

### 文件相关

- **grep**: 操作文件内容（常用于查找文本内容）

  `-i` 忽略大小写

  `-r` <u>递归查找</u>

  `-n` <u>显示行号</u>

  `-l` <u>只显示文件名</u>

  `-v` 反向选择

  `-E` 扩展正则表达式(Expression)

  `-H` 显示文件名

  `-h` 不显示文件名

  `-o` 只显示匹配的内容

  `-c` 只显示匹配的行数

  `-A` 显示匹配行后的内容

  `-B` 显示匹配行前的内容

  `-C` 显示匹配行前后的内容

  可以参考 [《使用 grep 查找文本》](./linux#使用-grep-查找文本) 来了解更多用法

- **du**: 查看文件大小

  `-h` 以人类可读的格式显示大小（如 KB、MB、GB）

  `-s` <u>显示每个目录和文件的总计</u>，而不是递归到子目录

  `-a` 显示所有文件大小

  `-c` 显示总大小(最后会多一个 Total 行)

  `-D` 指定深度( `-d` 或者 `--max-depth=N` 也可以)

  **注意**: 目标参数 `.` 表示当前目录，`*` 表示所有文件和目录，`*/` 表示所有目录

- **find**: 查找文件

  _find [搜索范围] [搜索条件] [操作]_

  `/` 表示搜索全部目录

  `.` 表示搜索当前目录

  `-type` 指定类型( `f`: 文件, `d`: 目录, `l`: 链接文件)

  `-name` 指定文件名（支持通配符`*`）

  `-xdev` 不跨越文件系统（仅在当前挂在的文件系统中查找）

  `-iname` 忽略大小写

  `-user` 指定所有者

  `-group` 指定所属组

  `-mtime` 指定修改时间

  `-print` 显示搜索结果

  `-printf '%h\n'` 显示文件所在目录（`%h`表示文件路径的**head**，即去掉文件名的部分）

  `-empty` 搜索空文件或目录

  `-delete` <u>删除搜索结果</u>

  `-exec` <u>执行命令</u>，`{}` 代表搜索到的文件

  - 批量删除搜索结果也可以通过 `-exec rm -f {} +` 来实现

  - `+` 表示将所有搜索结果作为参数传递给命令（比 `\;` 更高效）

  - `\;` 表示每个搜索结果单独执行一次命令

  - 几乎所有支持 `-exec` 的命令都推荐使用 `+` 结尾来提升性能。

  `-ok` 与 `-exec` 类似，但是会询问是否执行

  `-maxdepth` 指定搜索深度

  `-mindepth` 指定搜索深度

  `-prune` 排除指定目录

  `-regex` 使用正则表达式搜索

  `-size` 指定文件大小

  `-perm` 指定权限

- **sort**: 排序文件内容

  `-n` 按数字排序

  `-k` 指定列排序

  `-r` 逆序

  `-h` 人性化排序

  常用组合: `sort -nrk2 filename` 按第二列数字逆序排序

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

- **exit**: 退出当前 shell(如果是最外层 shell，则退出登录)

- **useradd**: 添加用户

  `-g` 指定用户所属组

  `-G` 指定用户所属附加组

  `-m` 创建用户的家目录

  `-s` 指定用户 shell

  `-e` 指定用户过期时间

- **passwd**: 修改密码(不指定用户名则修改当前用户)

- **userdel**: 删除用户

  `-r` 删除用户的家目录

- **usermod**: 修改用户

  `-l` 修改用户名

  `-g` 修改用户所属组

  `-aG` 添加用户到附加组

  `-d` 修改用户家目录

  `-s` 修改用户 shell

  `-e` 修改用户过期时间

  如: `usermod -l newname oldname` 修改用户名

- **groupadd**: 添加组

  `-g` 指定组 ID

- **groupmod**: 修改组

  `-n` 修改组名

  `-g` 修改组 ID

- **groupdel**: 删除组

- **chsh**: 修改 shell

  `chsh -s /bin/bash` 修改 shell 为 bash

  `echo $SHELL` 查看当前 shell

- **users**: 查看当前登录系统的用户

- **su**: 切换用户

  `-l` 切换到 root 用户

- **sudo**: 以超级用户权限执行命令

  `-i` 以 root 用户启动 shell

  `-s` 以当前用户启动 shell，但是权限是 root

  `-u` 以指定用户执行命令

  `-l` 列出当前用户可以执行的命令

- **sh**: 启动 shell

  `-c` 执行命令

  有时候使用 `>>` 重定向会出现权限问题，可以使用 `sudo sh -c "command >> filename"` 来解决

- **getent**: 从系统数据库中获取条目（entry），例如用户、组、主机、服务等信息。

  `passwd` 获取用户个人信息(来自`/etc/passwd`)

  `group` 获取组信息(来自`/etc/group`)

  `shadow` 获取用户密码信息(来自`/etc/shadow`)

  > 注意: `getent` 命令可以获取系统数据库中的信息，而不仅仅是 `/etc/passwd`、`/etc/group` 和 `/etc/shadow` 文件中的信息。

### 系统运行状态

#### 查看系统信息

- `hostnamectl`: <u>显示系统的基本信息，包括主机名、操作系统、内核版本等</u>

- `uname -a`: 显示当前系统的内核版本和其他信息

- `hostname`: 显示主机名

- `uptime`: 显示系统的运行时间、用户数量、负载平均值等

- `df -h`: <u>显示磁盘空间使用情况</u>

- `df -i`: <u>显示磁盘 inode 使用情况</u>

  **注意**：小文件过多会导致 inode 耗尽，无法创建文件，显示没有空间，即使磁盘还有剩余空间

#### 查看 CPU 运行情况

- `top`: <u>实时显示系统中各个进程的资源占用情况，包括 CPU 使用率、内存占用等</u>

- `htop`: 类似于 `top`，但是提供了更加友好的交互界面（推荐，[教程](https://www.shejibiji.com/archives/9635)）

- `btop`: 需要安装，类似于 `htop`，但是提供了更加美观的界面[GitHub](https://github.com/aristocratos/btop)

- `mpstat`: 显示多处理器系统中每个 CPU 的使用情况

- `sar`: 收集、报告系统活动情况，包括 CPU 使用率、内存使用率等

#### 查看内存使用情况

- `free -h`: <u>显示系统内存的空闲和已用情况</u>

- `vmstat`: 显示虚拟内存统计信息，包括内存、进程、IO 等

#### 查看网络情况

- `netstat`: <u>显示网络连接、路由表、接口统计等</u>

- `ss`: 类似于 `netstat`，用于获取套接字统计信息

- `nslookup`: 查询 DNS 服务器，获取域名对应的 IP 地址

#### 查看进程情况

- `ps`: 显示当前系统中的进程列表

  `ps aux` <u>显示所有进程的详细信息</u>

  `ps -ef` 显示所有进程的详细信息，包括父进程 ID

- `pstree`: 显示进程树，以树状结构展示进程之间的关系

- `pgrep`: 根据进程名或者其他条件查找进程 ID

- `kill`: 终止指定进程

- `killall`: 终止指定名称的所有进程

  更详细的使用可以看 --> [#进程管理](#进程管理)

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

  `-t` 显示归档文件中的内容（通常使用 `-tf` 来查看）

- `zcat`: 查看压缩文件内容（可以不解压直接查看，支持 gzip 压缩）

- `gunzip -c`: 查看压缩文件内容（可以不解压直接查看，支持 gzip 压缩）

- **zip**: 压缩文件

  `-v` 显示详细信息

  `-r` 递归处理指定目录及子目录

  `-u` 更换较新的文件到压缩文件内

  `-d` 删除 zip 文件中的文件

  `-m` 移动文件到 zip 文件中

  `-q` 静默模式

  `-o` 覆盖已有文件

  `-l` 显示文件列表

  `-T` 测试 zip 文件

  `-x` 排除文件

  `-j` 只压缩该目录下的所有文件，不带目录名

- **unzip**: 解开压缩文件

  先确保有安装 `unzip` 工具：`apt install unzip`

  `-d` 指定解压缩目录，目录不存在会创建

  `-l` 显示压缩文件内容

  `-t` 测试压缩文件

  `-v` 显示详细信息

  有些 zip 包如果是 Windows 创建的，Linux 下可能解压中文会乱码，可以加参数 `unzip -O CP936 yourfile.zip`（特别是中文 Windows）

### 关机重启

- **shutdown**: 关机

  `shutdown -h now` 立即关机

  `shutdown -h 10` 10 分钟后关机

  `shutdown -r now` 立即重启

  `shutdown -r 10` 10 分钟后重启

  `shutdown -c` 取消关机

- **reboot**: 重启

- **halt**: 关机

- **sync**: 把内存中的数据同步到磁盘

  现在的系统一般不需要手动执行，系统会自动同步到磁盘

## 基础知识

### 你应该首先了解的

1. 文件名如果带空格，则需要通过双引号将文件名引起来（自己创建文件或目录时不推荐空格）。

   如: `rm “test case.py”`

2. `.`表示当前目录，`..` 表示上一级目录，`/`开头的路径表示根目录，`~`为用户目录。

3. `--` 表示后面的参数不再解析为选项，如: `rm -- -test`。

4. 你可以使用 `man [command]` 来查看各个命令的使用文档，

   如 : `man cp`

   如果你不是很确定命令的具体名称，可以使用 `apropos [keyword]` 来搜索相关的命令。

   也支持参数 `-k` 来寻找相关性高的命令。

### 运维最佳实践

1. 不要使用 root 用户登录，可以使用普通用户登录后再切换到 root 用户。

   遵从最小权限原则，尽量不要直接赋予用户 root 权限，而是通过 `sudo` 管理

2. 不要在生产环境中直接编辑配置文件，可以先备份再修改。

3. 如果已经安装配置好了一台 Linux 服务器，之后的机器就可以直接克隆，不需要再次安装配置。

   克隆可以使用虚拟机的快照功能，也可以使用镜像文件。镜像文件可以使用 `dd` 命令，也可以使用 `rsync` 命令。

   dd 命令可以将整个硬盘克隆，rsync 命令可以将文件夹克隆。

4. 定期备份数据，可以使用 `rsync` 命令。`rsync` 命令可以增量备份，只备份修改过的文件。

### 文件目录

- **/etc**: 系统配置文件

  通常包括系统的配置文件和程序的配置文件

- **/var**: 系统运行时需要改变的文件

  通常包括日志文件、缓存文件、软件包文件等

- **/dev**: 设备文件目录

  通常包括硬盘、键盘、鼠标等设备文件

  Linux 会把所有硬件设备都映射为单独的文件，这样就可以通过文件的方式来操作硬件设备

- **/usr**: 用户程序目录

  通常包括用户安装的软件、用户的文件等

- **/bin**: 二进制文件目录，也就是可执行文件目录

  通常包括系统命令，如 ls、cp、mv 等

- **/proc**: 虚拟文件系统，它是系统内存的映射

  通常包括系统信息，如 CPU 信息、内存信息等

- **/mnt**: 挂载目录，通常包括挂载硬盘、U 盘等外部存储设备

- **/opt**: 可选目录，通常包括第三方软件，额外安装的软件可以放在这里

### 常用的文件

#### 配置文件

- **/etc/hosts**: 主机名和 IP 地址映射文件

- **/etc/sysctl.conf**: 内核参数配置文件

- **/etc/reslov.conf**: DNS 配置文件

- **/etc/sysconfig/network-scripts/ifcfg-eth0**: 网络配置文件

- **/etc/cron.allow[/deny]**: 允许/拒绝用户使用 crontab 命令（每行一个账号名称）

#### 敏感文件

- **/etc/passwd**: 用户信息文件

- **/etc/group**: 组信息文件

- **/etc/shadow**: 用户密码文件

- **/etc/sudoers**: sudo 配置文件，用于查看哪些用户可以使用 sudo 命令

- **/etc/crontab[cron.d]**: 定时任务配置文件

#### 日志文件

- **/var/log/secure**: 安全日志文件，如 SSH 登录日志

- **/var/log/messages**: 系统消息日志文件

- **/var/log/kern.log**: 内核日志文件，如硬件故障日志

- **/var/log/maillog**: 邮件日志文件

- **/var/log/syslog**: 系统日志文件

- **/var/log/cron**: 计划任务日志文件（cron 日志）

- **/var/log/boot.log**: 启动日志文件

- **/var/log/access.log**: Web 访问日志文件，如 Nginx 访问日志

- **/var/log/error.log**: Web 错误日志文件

- **/root[~]/.bash_history**: 用户历史命令记录文件，记录用户执行过的命令

### 系统启动需要加载的配置文件

> 主要包括 bash 的配置文件，环境变量配置文件，以及脚本文件等。
>
> 修改环境变量配置后，需要用 `source /PATH/TO/CONFIG_FILE` 来重新加载配置使其生效

--> /root/.bash_profile --> /root/.bashrc

--> /etc/profile --> /etc/bashrc

--> ~~/etc/rc.local (/etc/rc.d/rc.local) --> /etc/profile.d/\*.sh~~

_开机启动自动执行的脚本文件夹，不推荐使用，可以通过创建服务实现_

--> /etc/sysconfig/i18n

--> <u>~/.bash_profile</u> --> <u>~/.bashrc</u>

**注意**: 如果是 `zsh`，那么配置文件为 `~/.zshrc`。

**`.bash_profile` 和 `.bashrc` 的区别**

- `.bash_profile` 是登录 shell 执行的配置文件，只有在登录 shell 时才会执行。

- `.bashrc` 是交互式 shell 执行的配置文件，每次打开新的终端时都会执行。

### 常用的网络服务目录

> 这里只列出系统默认的服务目录，实际情况可能会有所不同

- PHP 配置: /etc/php.ini

- PHP-FPM 配置目录: /etc/php-fpm.d/

- MySQL 配置: /etc/my.cnf

- Nginx 配置: /etc/nginx/

- Apache 配置目录: /etc/apache2/

  Apache 默认网站目录: /var/www/html/

  可以通过配置文件 httpd.conf 中 DocumentRoot 来修改

### Shell 中的变量

Shell 中的变量分为系统变量、环境变量和用户自定义变量。

#### 环境变量

Shell 包含一些预定义的环境变量，用于存储系统和用户环境的信息。以下是一些常用的环境变量:

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

如果要查看某个环境变量的值，可以使用`echo`命令。

```bash
echo $VARIABLE_NAME
```

**注意**: 变量前面需要加上`$`符号。

查看所有已设置的环境变量可以用`env` 或者 `printenv` 命令查看。

```bash
env | less
```

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

Shell 还提供了一些特殊的内置变量，例如:

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

**which**

which 命令可以显示命令的完整路径（前提是该文件位于该路径中）。

```bash
which command
```

如果有多个同名的应用，可以加上参数`-a`来显示全部。

（正常情况下，同名的只会显示第一个）

### Shell 的常用快捷方式

- **Tab** = 自动补全命令或者文件/目录名称

- **Ctrl + C** = 终止当前命令

- **Ctrl + A** = 光标移动到<u>行首</u>

- **Ctrl + E** = 光标移动到<u>行尾</u>

- **Ctrl + B** = 光标向<u>后移动</u>

- **Ctrl + F** = 光标向<u>前移动</u>

- **Ctrl + W** = 删除光标前的一个单词

- **Ctrl + U** = 删除光标前的内容

- **Ctrl + K** = 删除光标后的内容

- **Ctrl + Y** = 粘贴删除的内容

- **Ctrl + D** = 退出当前 shell（比如 sort 进入读键盘操作后）

- **Ctrl + L** = <u>清屏</u>

- **Ctrl + R** = 搜索历史命令

### 权限相关的数字及字母

修改文件权限的命令是 `chmod`，修改文件所有者的命令是 `chown`。

在表示权限时，可以使用数字或者字母。

#### 数字权限

在 Linux 中，文件和目录的权限可以用数字表示，如 `755`、`644` 等。

三个位置的数字分别代表了文件所有者、所属组和其他用户的权限。

数字权限的表示意思如下:

- `7`: 读、写、执行权限

- `6`: 读、写权限

- `5`: 读、执行权限

- `4`: 只读权限

- `3`: 读、执行权限

- `2`: 写、执行权限

- `1`: 执行权限

- `0`: 无权限

如: `chmod 755 filename`，表示文件所有者有读、写、执行权限，所属组和其他用户有读、执行权限。

#### 字母权限

在 Linux 中，文件和目录的权限也可以用字母表示，如 `rwxr-xr-x`、`rw-r--r--` 等。

**字母权限的表示意思如下**

- `r`: 读权限

- `w`: 写权限

- `x`: 执行权限(对文件来说表示可以执行，<u>对目录来说表示可以进入</u>)

- `-`: 无权限

如: `chmod u=rwx, g=rx, o=rx filename`，表示文件所有者有读、写、执行权限，所属组和其他用户有读、执行权限。

如果不指定用户，表示所有用户，如: `chmod +x filename`，表示所有用户有执行权限。

**所有符号的含义如下**

- `+`: 添加权限

- `-`: 删除权限

- `=`: 设置权限

- `,`: 分隔符

**所有用户的缩写如下**

- `u`: 所有者

- `g`: 所属组

- `o`: 其他用户

- `a`: <u>所有用户</u>

### /etc/passwd 文件中的字段

`/etc/passwd` 文件中的每一行代表一个用户，每行由 7 个字段组成，字段之间用冒号 `:` 分隔。

类似于下面的格式:

```bash
root:x:0:0:root:/root:/bin/bash
```

每个字段的含义如下:

1. 用户名: 用户的登录名。

2. 密码: 通常是 `x`，表示密码存储在 `/etc/shadow` 文件中。

3. 用户 ID: 用户的数字 ID。

4. 组 ID: 用户所属组的数字 ID。

5. 注释: 用户的注释信息，通常是用户的全名。

6. 主目录: 用户的主目录路径。

7. shell: 用户登录后使用的 shell。

### /etc/sudoers 文件的字段

`/etc/sudoers` 文件中的每一行代表一个用户或者用户组的权限设置，每行由多个字段组成，字段之间用空格分隔。

类似于下面的格式:

```bash
root ALL=(ALL:ALL) ALL
```

每个字段的含义如下:

1. 用户名: 用户名或者用户组名。

   如果是用户组名，需要在前面加上 `%` 符号。

2. 主机名: 允许登录的主机名。

   如果是所有主机，可以使用 `ALL`。

3. =: 表示后面的字段是允许执行的命令。

4. (ALL:ALL): 表示允许执行命令的用户和用户组。

5. ALL: 表示允许执行的命令。

   如果不需要用户输入密码，可以在命令前面加上 `NOPASSWD:`。

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

假设你运行了 uname -a 命令，得到了以下输出:

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

## 文本处理

### 修改默认编辑器为 Vim

> Vim 使用教程: [--> 站内链接](./vim)

在某些系统（如 Debian/Ubuntu）提供了 `update-alternatives` 命令用于更改默认软件，如更改默认编辑器、浏览器等。

以下是常用的命令:

- `update-alternatives --config editor`: 更改默认编辑器

  系统会显示所有可用的编辑器，你可以选择一个作为默认编辑器

- `update-alternatives --display editor`: 显示当前默认编辑器

  其中 `link currently points to` 后面的就是当前默认编辑器

### 使用 cat 处理文本文件

- `cat file1 file2 > target_file`: 将多个文件**合并**到目标文件中

- `cat file1 file2 >> target_file`: 将几个文件**住家**到目标文件中

- `cat file1 file2 | sort | uniq > target_file`: 将多个文件**合并**并排序去重后写入目标文件

### 使用 sed 操作文本内容（替换、删除、插入等）

`sed` 是一个流编辑器，用于处理文本数据。`sed` 可以用于替换文本、删除文本、插入文本等。

特别是在通过脚本来修改配置文件时，`sed` 是一个非常有用的工具。

#### 基本语法

- `sed [options] 's/old/new/g' filename`: 全局替换文本

  - `s`: 表示替换操作。

  - `g`: 表示全局替换。

  - 不加 `g`，则只替换第一处匹配的文本，如 `sed 's/old/new/' filename` 只替换第一处匹配的文本。

- `sed [options] '/old/d' filename`: 删除匹配的文本行

  - `d`: 表示删除匹配的文本行。

- `sed [options] '/old/i\new_text' filename`: 在匹配的文本行之前插入新文本

  - `i`: 在匹配的文本行之前插入新文本。

  如: `sed '/pattern/i\new_text' filename` 在匹配到 `pattern` 的行之前插入 `new_text`。

  - `sed [options] '/old/a\new_text' filename`: 在匹配的文本行之后添加新文本

#### options 选项

- `-i`: 直接修改文件内容。

  `-i.bak`: 修改文件内容，并备份原文件。

- `-e`: 多次替换。

#### 示例-批量替换多个文件中的文本

```bash
find /path/to/files -type f -name "*.conf" -exec sed -i.bak 's|/www/server/panel/vhost/|/www/vhost/|g' {} +
```

- `exec ... {} +`: 表示将多个文件作为参数传递给 `sed` 命令。

- `s|old|new|g`: 表示将 `old` 替换为 `new`。

### 使用 awk 处理文本数据

`awk` 是一个强大的文本处理工具，可以用于格式化文本、提取数据、计算数据等。

每列的数据称为一个字段，`awk` 默认以空格作为字段分隔符，可以使用`-F`参数指定其他分隔符。

#### 最佳实践

- 为了减少 `awk` 需要处理的数据量，可以先使用 `grep` 命令来过滤数据。

- 如果确保某列被当作数字处理，可以使用 `+0` 来强制转换为数字。

  如: `awk '{print $1 + 0}' filename`

#### 基本语法

```bash
awk [options] 'pattern { action }' filename
```

- `pattern`: 可选，用于指定要匹配的模式。

- `action`: 动作，用于处理匹配的文本行。

#### 模式

`pattern` 是一个模式，用于匹配文本行。`pattern` 可以是一个正则表达式、一个条件表达式、一个范围表达式等。

```bash
awk '/pattern/ { action }' filename
```

- `/pattern/`: 正则表达式，用于匹配文本行。

- `!`: 逻辑非，用于取反。

- `&&`: 逻辑与，用于组合多个条件。

- `||`: 逻辑或，用于组合多个条件。

- `BEGIN`: 在处理文本行之前执行。

- `END`: 在处理完所有文本行后执行。

#### 操作块

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

#### 内置函数

`awk` 提供了一些内置函数，用于处理文本数据。

- `length(string)`: 返回字符串的长度。

- `print`: 打印文本行。

- `printf`: 格式化打印文本行。

  格式化字符串中的占位符:

  - `%s`: 字符串

  - `%d`: 整数

  - `%f`: 浮点数

- `tolower(string)`: 将字符串转换为小写。

#### 内置变量

`awk` 提供了一些内置变量，用于处理文本数据。

- `$0`: 整个文本行。

- `$1`、`$2`、`$3`: 第一个、第二个、第三个字段。

- `NF`: 字段数量。

- `NR`: 行号。

- `FS`: 字段分隔符，默认为空格。

- `OFS`: 输出字段分隔符，默认为空格。

**示例**

- 打印文件的第一列

  ```bash
  awk '{ print $1 }' filename
  ```

- 处理 nginx 的日志文件

  具体代码可以在 `网络` --> `获取服务器流量消耗信息` 中查看。

### less 查看文件支持更多操作

1. **搜索**:
   - `/关键词` 正向搜索（向下搜索）
   - `?关键词` 反向搜索（向上搜索）
   - `n` 继续查找下一个匹配项（同方向）
   - `N` 查找上一个匹配项（反方向）
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

### tail/les/watch 实时查看监控文件变化

`tail -f` 命令可以实时查看文件的变化

```bash
tail -n 10 -f filename
```

`less +F` 命令也可以实时查看文件的变化

```bash
less +F filename
```

- `+F`: 进入文件尾部并开始跟踪。

- `Ctrl + C`: 退出跟踪模式。

- `Shift + F`: 进入跟踪模式。

`watch` 命令可以<u>定期执行一个命令，并显示结果</u>

```bash
watch -n 1 'ls -l'
```

- `-n 1`: 每秒执行一次命令。

- `watch -n 1 'tail -n 10 filename'`: 每秒查看文件的最后 10 行。

### 使用 grep 查找文本

`grep` 命令用于查找文本。`grep` 可以查找文件中的文本，也可以查找命令的输出。

下面是一些常用的 `grep` 命令示例:

- `grep -rl "example.com" /path/to/directory`: 查找目录下包含 `example.com` 的文件，并显示文件名

- `grep -Er "example.com" /path/to/directory`: 递归查找目录下包含 `example.com` 的文件，并显示文件名和行号

- `grep -H "example.com" filename`: 查找文件中包含 `example.com` 的行，并显示文件名(显示文件名和行内容)

  `-H` 用于显示文件名，`--with-filename` 的简写，对单个文件时有效，多个文件时默认都会显示文件名

- `grep -n "example.com" filename`: 查找文件中包含 `example.com` 的行，并显示行号

- `grep -a "text" filename`: 以文本方式查看二进制文件

- `grep -a "sc[0-9]*" filename`: 查找以 `sc` 开头的数字

还可以结合 `find` 命令限定文件格式，例如:

- `find /etc/nginx/vhost -type f -name "*.conf" -exec grep -H "example.com" {} +`: 查找 Nginx 配置文件中包含 `example.com` 的文件

### 使用 grep 比较文件内容

如果想要比较两个文件的内容，也可以使用 `grep` 命令。

**比较文件内容相关的参数有:**

- `v`: 反转匹配（仅显示 不匹配 模式的行）

- `x`: 只匹配整行（整行必须匹配模式，而不是部分匹配）

- `F`: 按照固定字符串进行匹配（而非正则表达式）

  可以避免特殊字符被解释为正则表达式的元字符，提高匹配速度

- `f`: 从 `FILE` 中读取模式（每行一个模式）

- `i`: 忽略大小写

**示例**

- `grep -xFf file1 file2`: 比较两个文件的内容，只显示两个文件中相同的行

- `grep -vxFf file1 file2`: 比较两个文件的内容，只显示 file2 中不在 file1 中的行

  这对于查找两个文件的差异非常有用，可以用于查找新增的行或者删除的行。

- `grep -vxFf file2 file1 >> diff.txt`: 将 file1 中不在 file2 中的行追加到 diff.txt 文件中

## 文件和目录

我们可以结合多个命令来完成一些复杂的操作，比如查找大文件、合并文件、创建多个文件等。

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

### 查找大文件并排序

**方法一、使用 du 命令**

`du`命令用于查看文件和目录的磁盘使用情况。

假设我们想查找指定目录下最大的 10 个文件和目录，可以使用以下命令:

```bash
du -ah /path/to/directory | sort -rh | head -n 10
```

- `du -ah /path/to/directory` 用于查看指定目录下所有文件和目录的大小

- `sort -rh` 用于按照文件大小逆序排序

- `head -n 10` 用于显示前 10 行。

**方法二、使用 find 命令**

`find`命令用于查找文件和目录。

假设我们想查找指定目录下大于 100MB 的文件，可以使用以下命令:

```bash
find /path/to/directory -type f -size +100M -print0 | xargs -0 ls -lh | awk '{ print $9 ": " $5 }'
```

- `find /path/to/directory -type f -size +100M -print0` 用于查找大于 100MB 的文件

- `xargs -0 ls -lh` 用于显示文件的详细信息

- `awk '{ print $9 ": " $5 }'` 用于显示文件名和大小。

如果要求不高，我们可以使用以下命令:

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

### 找出小文件过多的目录

有时候即使磁盘空间足够，但小文件过多也会导致性能下降，甚至会因为消耗完 inode 而导致无法创建新文件。

可以使用下列命令来快速找出小文件过多的目录：

```bash
sudo find / -xdev -type f | cut -d/ -f2 | sort | uniq -c | sort -nr | head -20
```

如果 inode 已经耗尽，上面命令可能因为无法在 `/tmp` 目录创建临时文件而失败。

这个时候你可以用下列命令来找出小文件过多的目录（无需创建中间文件）：

```bash
du --inodes -d 3 / 2>/dev/null | sort -nr | head -20
```

这个命令基于 inode 数量排序，而非文件大小，`sort` 只在内存排序。

如果你想统计所有小于指定大小的文件数量（例如 < 4KB），可以结合 `find` 和 `awk` 命令来实现（仅显示根目录）：

```bash
find / -xdev -type f -size -4k 2>/dev/null | awk -F/ '{print "/"$2}' | uniq -c
```

然后你可以进一步检查某路径下小文件的数量，可以用 `ls -lUR` + `awk`，例如只看 `/var/lib` 目录：

```bash
ls -lUR /var/lib 2>/dev/null | awk '$5 < 4096 {count++} END {print count}'
```

### 快速统计目录内文件个数

可以先列出目录下的所有文件和子目录，并且通过`grep`命令筛选出文件行（以`-`开头），最后使用`wc -l`命令统计行数。

```bash
ls -l | grep "^-" | wc -l
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

### 保留日志最后 N 行，减小日志文件大小

有时日志文件会变得非常大，可以使用`tail`命令保留日志文件的最后 N 行，来实现减小日志文件大小的目的。

```bash
tail -n 1000 logfile > logfile.new
mv logfile.new logfile
```

_有时候空间并不会立刻释放出来，所以考虑重启服务或者服务器来立即释放空间。_

### 解压缩文件 (tar, zip)

`tar` 命令用于创建和解压缩 tarball 文件，`zip` 命令用于创建和解压缩 zip 文件。

#### 必备知识

**常用参数**

- `c`: 创建压缩文件

- `x`: 解压缩文件

- `z`: <u>使用 gzip 压缩</u>

- `j`: <u>使用 bzip2 压缩</u>

- `J`: <u>使用 xz 压缩</u>

- `v`: 显示详细信息

- `f`: 指定文件名

- `C`: 指定解压缩目录

**常见后缀及对应的压缩格式**

- `.tar.gz` 或 `.tgz`: 使用 gzip 压缩

- `.tar.bz2` 或 `.tbz2`: 使用 bzip2 压缩

- `.tar.xz` 或 `.txz`: 使用 xz 压缩

- `.zip`: 使用 zip 压缩

#### 操作示例

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

- `-C` 参数指定解压缩目录，不指定则默认解压缩到当前目录。

**查看压缩包内容**

```bash
tar -tvf archive.tar.gz
```

要注意参数`-z`表示使用 gzip 压缩，如果是其它格式的压缩文件，可以使用`-j`（bzip2）或者`-J`（xz）。

**查看特定文件的内容（不解压）**

如果要直接查看归档中的某个文件，可以使用 `tar` 和 `less`：

```bash
tar -xzOf archive.tar.gz path/to/file | less
```

#### 使用 zip 命令

**创建 zip 文件**

```bash
zip -r archive.zip /path/to/directory
```

- `-r` 递归压缩

如果是单文件，可以不用加`-r`参数。如: `zip archive.zip file1 file2 file3`

**解压缩 zip 文件**

解压缩可以用`unzip`命令

```bash
unzip archive.zip -d /path/to/extract
```

解压缩前可以使用`unzip -l archive.zip`命令查看压缩包内容，以确定目录等情况，避免解压缩后混乱。

### 查找文件（find, locate）

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

### 远程复制文件（scp）

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

### 远程同步文件（rsync）

`rsync`比`scp`更加强大，它可以在本地和远程系统之间同步文件和目录，支持增量传输（只传输更改的部分），可以快速复制大文件。

```bash
# 本地文件复制到远程服务器
rsync -avz -e "ssh -p 22" /path/to/local/file username@remote_host:/path/to/remote/destination
# 远程文件复制到本地
rsync -avz username@remote_host:/path/to/remote/file /path/to/local/destination
```

- `avz` 分别代表着 `archive`、`verbose` 和 `compress` 选项，它们分别用于保留文件属性、显示详细信息和压缩传输数据。

  简单使用的话，可以只使用`-av`参数。

- `-e`参数，它允许你指定一个自定义的 SSH 端口，如果是默认的 22 端口，可以省略。

- 如果想要显示进度条，可以添加 `--progress` 参数。

- rsync 允许**断点续传**，如果传输中断，可以重新运行命令，rsync 会从中断的地方继续传输。

  加上 `--partial`参数可以只传输文件的一部分，而不是整个文件，这对于大文件的传输非常有用。

- `--delete` 参数可以删除目标目录中不存在的文件，这对于**目录镜像**非常有用。

  如: `rsync -av --delete username@remote_host:/path/to/remote/ /path/to/local/`

- `--exclude` 参数可以排除某些文件或目录，如: `--exclude='*.log'`

  如果有多个需要排除的目录，可以使用 `--exclude-from` 参数，后面跟一个文件名，文件中每行一个排除项。

## 用户和权限

- 用户的配置文件一般在`/etc/passwd`

- 用户组的配置文件一般在`/etc/group`

- 用户的密码文件一般在`/etc/shadow`

### 允许用户使用 sudo 命令

> **/etc/sudoers** 文件比较敏感，通常不允许直接用编辑器修改，
>
> 可以用 `visudo` 命令来编辑，该命令会在保存前检查文件的语法错误

允许用户使用 `sudo` 命令，可以将用户添加到 `sudo` 组中（Debian/Ubuntu 系统）。

不同的 linux 系统中，`sudo` 组可能不同，可以通过 `/etc/sudoers` 文件查看。

_在 CentOS 或 RHEL，默认的管理组是 `wheel` 组_

```bash
usermod -aG wheel username
```

或者修改 `/etc/sudoers` 文件，添加如下内容，也可以实现相同的效果。

```bash
username ALL=(ALL) ALL
```

**配置无密码 sudo 权限**

如果想要允许用户在执行`sudo`命令时不需要输入密码，可以在`/etc/sudoers`文件中添加如下内容。

```bash
username ALL=(ALL) NOPASSWD: ALL
```

**确认用户的 sudo 权限**

```bash
sudo -l -U username
```

- `-l` 参数用于列出用户的 sudo 权限。

- `-U` 参数用于指定用户。

## 应用管理

在 Centos 或 RHEL 系统中，可以使用 `yum` 命令来管理软件包。

在 Ubuntu/Debian 系统中，可以使用 `apt` 命令来管理软件包。

### yum 管理工具的使用

#### 常用命令

- `yum repolist all | grep <package_name>`: 查看所有软件列表

  `yum repolist enabled` 查看已启用的软件源列表

- `yum-config-manager --add-repo <repo_url>`: 添加新的软件源

  `yum-config-manager --enable <repo_name>` 启用软件源

  `yum-config-manager --disable <repo_name>` 禁用软件源

- `yum search <package_name>`: 搜索软件包

- `yum info <package_name>`: 查看软件包信息

- `yum install <package_name>`: 安装软件包

- `yum update <package_name>`: 更新软件包

- `yum upgrade`: 升级系统中的已安装软件包

  可能会移除不需要的依赖项，可以使用`yum upgrade --skip-broken`来跳过。

- `yum reinstall <package_name>`: 重新安装软件包

- `yum list`: 列出所有可用的软件包

  `yum list installed` 查看已安装的软件列表

  `yum list updates` 查看可更新的软件列表

- `yum remove <package_name>`: 卸载软件包

- `yum autoremove <package_name>`: 深度卸载软件包

- `yum clean all`: 清除缓存

- `yum makecache`: 重新生成缓存

#### 更新镜像源

可以通过修改`/etc/yum.repos.d`目录下的`.repo`文件来更换镜像源。

```bash
# 备份原文件
cp /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak
# 下载新的镜像源
# CentOS 6
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-6.repo
# CentOS 7
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
# 清除缓存
yum clean all
yum makecache
```

更改后可以使用 `yum repolist all` 命令查看是否生效。

### apt 管理工具的使用

`apt` 是一个用于管理软件包的高级工具，它提供了一组用于搜索、安装、更新和删除软件包的命令。

#### 常用命令

- `apt update`: 更新软件包列表，以获取最新的软件包信息。

- `apt upgrade`: 升级所有已安装的软件包到最新版本。

- `apt install PACKAGE_NAME`: 安装一个特定的软件包。

- `apt remove PACKAGE_NAME`: 卸载一个特定的软件包。

- `apt search KEYWORD`: 搜索软件包。

- `apt show PACKAGE_NAME`: 显示软件包的详细信息。

- `apt list --installed`: 列出所有已安装的软件包。

- `apt list --upgradable`: 列出所有可以升级的软件包。

- `apt autoremove`: 删除不再需要的软件包。

- `apt clean`: 清理下载的软件包文件。

- `apt autoclean`: 清理过期的软件包文件。

## 服务管理

### systemctl 服务管理

systemd 是一个 init 系统和系统管理守护进程，用于启动、停止和管理系统中的各种服务和进程。

`systemctl` 是一个 Linux 系统中用于管理 systemd 服务的命令行工具。

**systemd 服务文件**

- `/etc/systemd/system/*.service`: 系统服务目录

- `/lib/systemd/user/*.service`: 系统用户服务目录

- `/usr/lib/systemd/system/*.service`: 用户服务目录

**创建服务文件**

通过创建一个新的 `.service` 文件来创建一个新的服务。

之后就可以通过`systemctl`命令来管理这个服务了，设置开机启动等。

下面是创建一个 PHP-FPM 服务的示例:

```bash
[Unit]
Description=The PHP FastCGI Process Manager
After=network.target

[Service]
Type=simple
ExecStart=/www/server/php/74/sbin/php-fpm --nodaemonize --fpm-config /www/server/php/74/etc/php-fpm.conf
ExecReload=/bin/kill -USR2 $MAINPID
PrivateTmp=false
PIDFile=/www/server/php/74/var/run/php-fpm.pid

[Install]
WantedBy=multi-user.target
```

- `[Unit]` 部分包含了服务的描述和启动顺序。

- `[Service]` 部分包含了服务的类型、启动命令、重载命令、私有临时目录和 PID 文件。

  - `Type=simple` 表示服务是一个简单的进程。

  - `ExecStart` 是服务的启动命令。

  - `ExecReload` 是服务的重载命令。

  - `PrivateTmp=true` 表示服务使用私有的临时目录

    **注意**: 意味着为该服务创建一个私有的临时目录，这个目录对服务进程是可见的，但对其他进程是隔离的

    如果服务有用到临时文件，可以设置为`false`，这样可以避免权限问题。

  - `PIDFile` 是服务的 PID 文件，确保 systemd 可以正确地跟踪服务的 PID。

    在这里，确保路径与 PHP-FPM 配置文件中的 `pid` 配置项一致。

- `[Install]` 部分包含了服务的启动级别。

创建好服务文件后，需要重新加载 systemd 配置。

```bash
systemctl daemon-reload
```

**systemctl 常用命令**

- `systemctl start <SERVICE_NAME>`: 启动服务

- `systemctl stop <SERVICE_NAME>`: 停止服务

- `systemctl restart <SERVICE_NAME>`: 重启服务

- `systemctl daemon-reload`: 重新加载 systemd

  更新内部配置缓存，不会重新启动或者加载服务

- `systemctl reload <SERVICE_NAME>`: 重新加载配置

  不会重启服务，需要服务支持

- `systemctl status <SERVICE_NAME>`: 查看服务状态

- `systemctl enable <SERVICE_NAME>`: 启用服务

- `systemctl disable <SERVICE_NAME>`: 禁用服务

- `systemctl is-enabled <SERVICE_NAME>`: 查看服务是否启用

- `systemctl list-unit-files --type=service | grep enabled`: 查看所有已启用的服务

- `systemctl list-unit-files --type=service | grep disabled`: 查看所有已禁用的服务

- `systemctl list-units --type=service`: <u>列出所有服务</u>

  `systemctl list-units --type=service | grep fpm` 列出 php-fpm 服务

- `systemctl list-units --type=service --state=running`: 列出所有正在运行的服务

- `systemctl list-dependencies <SERVICE_NAME>`: 查看服务的依赖关系

- `systemctl cat <SERVICE_NAME>`: 查看服务的配置文件

- `systemctl edit <SERVICE_NAME>`: 编辑服务的配置文件

- `journalctl -u <SERVICE_NAME>`: 查看服务的日志

  `journalctl` 命令用于查看系统日志，`-u` 参数用于指定服务名称。

  `journalctl -u <SERVICE_NAME> --lines=100` 用于查看最近 100 行日志。

  `journalctl -u <SERVICE_NAME> -f` 用于查看实时日志。

以下是一些常用的 Web 服务以及它对应的服务名称

- Nginx: nginx

- Apache: httpd and apache2

- MySQL: mysqld

- PHP-FPM: php-fpm

- Redis: redis

- Memcached: memcached

### crontab 定时任务

crontab 是用来让使用者在固定时间或固定间隔执行程序之用，可以用于定期备份文件、清理日志、定时运行脚本等。

- crontab 的配置文件通常位于 `/etc/crontab` 或者 `/var/spool/cron` 目录中。

- 各个服务的定时任务配置文件通常位于 `/etc/cron.d` 目录中。

- 可以通过 `grep` 来查看**定时任务日志**来检查是否执行成功：

  - 在 `Ubuntu/Debian` 系统中，日志文件通常位于 `/var/log/syslog`

  - 在 `CentOS/RHEL` 系统中，日志文件通常位于 `/var/log/cron`

  - 如 `grep CRON /var/log/syslog` 可以查看定时任务的执行情况。

- 某些 Debian 安装不启用 rsyslog，而使用 `journald`。可以这样查看 cron 运行记录：

  - `journalctl -u cron`

  - `journalctl -u crond` (CentOS/RHEL)

  - `journalctl | grep CRON`

- 如果需要查看服务状态，可以使用以下命令：

  - `systemctl status crond` (CentOS6)

  - `systemctl status cron` (CentOS7+)

#### crontab 基础命令

- `crontab`: 管理定时任务

  `-e` 编辑定时任务(修改后会自动生效，无需重启服务)

  `-l` 列出定时任务

  `-r` _清空定时任务(谨慎使用，推荐用`-e`来替代)_

  `-u user` 指定 `user` 的时程表，默认表示设定自己的时程表

- `MIN HOUR DOM MON DOW [USER] CMD`: 分别表示分钟、小时、日期、月份、星期，`*`表示任意时间。

  ```bash
  # ┌───────────── 分鐘   (0 - 59)
  # │ ┌─────────── 小時   (0 - 23)
  # │ │ ┌───────── 日     (1 - 31)
  # │ │ │ ┌─────── 月     (1 - 12)
  # │ │ │ │ ┌───── 星期幾 (0 - 7，0 是週日，6 是週六，7 也是週日)
  # │ │ │ │ │
  # * * * * * /path/to/command --your --parameter
  ```

#### 特殊规则

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

#### 使用示例

- `* * * * * /path/to/script.sh`: 每分钟执行脚本

- `*/30 * * * * /path/to/script.sh`: 每隔 30 分钟执行脚本

- `0 * * * * /path/to/script.sh`: 每小时执行脚本

- `0 3 * * * /path/to/script.sh`: 每天凌晨 3 点执行脚本

- `0 */3 * * * /path/to/script.sh`: 每隔 3 小时执行脚本

- `0 2 * * 1 /path/to/clean_logs.sh`: 每周一凌晨 2 点执行清理日志脚本

- `0 2 1 * * /path/to/script.sh`: 每月 1 号凌晨 2 点执行脚本

- `30 21 * * 1,3,5 /path/to/script.sh`: 每周一、三、五晚上 9 点 30 分执行脚本

- `0 9-18 * * * /path/to/script.sh`: 从早上 9 点到下午 6 点，凡遇到整点就执行

- `@reboot /path/to/script.sh`: 系统启动时执行脚本

- `@daily /path/to/script.sh`: 每天执行脚本

### logrotate 日志文件管理

`logrotate` 是一个在 Linux 操作系统中用来管理日志文件的工具。`logrotate` 可以定期对日志文件进行压缩、删除、邮件通知等操作。

配置文件通常位于 `/etc/logrotate.conf` 和 `/etc/logrotate.d/` 目录中，系统管理员可以在这些配置文件中定义具体的日志轮换策略。

简单的 `logrotate` 配置示例如下:

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

这个配置对 `/var/log/syslog` 日志文件进行如下操作:

- `daily`: 每天轮换一次日志文件。

- `missingok`: 如果日志文件不存在，不会报错继续执行。

- `rotate 7`: 保留最近的 7 个日志文件，超出部分将被删除。

- `compress`: 轮换后的日志文件进行压缩。

- `delaycompress`: 延迟压缩到下次轮换时。

- `notifempty`: 如果日志文件为空，不进行轮换。

- `create 0640 root utmp`: 创建新日志文件，权限设置为 0640，所有者为 root，所属组为 utmp。

- `sharedscripts`: 在日志文件轮换前后执行脚本。

- `postrotate` 到 `endscript`: 在日志文件轮换后执行 `/usr/lib/rsyslog/rsyslog-rotate` 脚本。

另外 logrotate 还有一些命令来**检查配置文件和手动执行轮换操作**，如：

- `logrotate -d /etc/logrotate.d/nginx`: 手动测试 logrotate 配置

  其中 `-d` (debug) 选项不会实际执行日志轮转，而是显示 logrotate 处理配置的调试信息。

- `logrotate -f /etc/logrotate.d/nginx`: 手动执行 logrotate

  `-f` (force) 选项会强制 logrotate 进行日志轮转，即使没有到达轮转的条件。

## 网络工具

### IP 指令获取本机的网络信息

`ip` 命令是一个用于显示和操作网络设备、路由、策略路由和隧道的工具，它可以用来代替传统的 `ifconfig` 命令。

**常用命令**

- `ip addr show`: 显示所有网络设备信息包括 IP 地址、MAC 地址等

  简写: `ip a`

- `ip route show`: 显示路由表信息

  简写: `ip r`

- `ip -s link show`: 显示网络设备的统计信息

  简写: `ip -s l`

  可以通过这个指令查看网络设备的接收和发送数据包的数量

### 使用 netstat 查看网络连接信息

`netstat` 是一个用于显示网络连接信息的命令行工具，可以用于查看网络连接、路由表、接口统计等。

它支持多种参数，可以用于不同的网络连接信息查询，主要有:

- `-a`: 显示所有连接和监听端口

- `-n`: 以数字形式显示 IP 地址和端口号

- `-t`: 显示 TCP 连接

- `-u`: 显示 UDP 连接

- `-f`: 显示 FQDN

- `-p`: 显示进程 ID 和程序名称

- `-l`: 显示监听状态的连接

- `-r`: 显示路由表

- `-c`: 持续显示

- `-s`: 显示统计信息

- `-W`: 显示原始数据

- `-e`: 显示详细信息

- `-c`: 持续显示

我们可以利用这些参数来查看不同的网络连接信息，以下是一些常用的 `netstat` 命令示例:

- `netstat -anp | grep ':80' | wc -l`: 统计 80 端口连接数

- `netstat -anp | grep ':80' | grep ESTABLISHED | wc -l`: <u>统计已连接上的，状态为 ESTABLISHED 的 80 端口连接数</u>

- `netstat -n | awk '/^tcp/ {++S[$NF]} END {for (a in S) print a, S[a]}`: 统计 TCP 连接状态的类型和数量

- `netstat -ntu | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort  -r -n`: 统计每个来源 IP 地址的连接数量

- `netstat -ntlp`: 显示所有监听的 TCP 端口和对应的进程

- `netstat -axu`: 显示所有活动的 UNIX 域套接字

- `netstat -natp`: 显示连接的进程 ID 和程序名称

- `netstat -nr`: 显示路由表

### 分析 Nginx 日志文件

Nginx 的访问日志文件通常位于 `/var/log/nginx/access.log`。

#### 获取 Nginx 服务流量消耗信息

可以通过查看 Nginx 的访问日志来获取服务器流量消耗信息。

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

#### 获取 Nginx 服务访问量信息

可以通过分析 Nginx 的访问日志来获取访问量信息。

**查看今日访问量**

```bash
awk '{print $1}' /var/log/nginx/access.log | sort | uniq | wc -l
```

**查看排名前 10 的访问路径**

```bash
awk '{print $7}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -n 10
```

#### 耗时统计及分析

默认情况下，Nginx 的访问日志格式中并不包含请求的耗时信息。
要实现耗时统计，需要在 Nginx 的配置文件中添加 `$request_time` 变量。

我们可以修改日志格式支持耗时分析，比如在 `nginx.conf` 的 `http` 块中添加：

```nginx
log_format timed_combined '$remote_addr - $remote_user [$time_local] '
                          '"$request" $status $body_bytes_sent '
                          '"$http_referer" "$http_user_agent" '
                          '$request_time';
```

然后在 `http` 或 `server` 或 `location` 中加上：

```nginx
access_log /var/log/nginx/access.log timed_combined;
```

**分析“哪个接口最慢”了**

```bash
awk '{print $(NF-1), $7}' /var/log/nginx/access.log | \
awk '{sum[$2]+=$1; count[$2]++} END {for (url in sum) print sum[url]/count[url], count[url], url}' | \
sort -nr | head -20
```

**查看平均耗时>0.2 秒的接口**

```bash
awk '{print $(NF-1), $7}' /var/log/nginx/access.log | \
awk '{sum[$2]+=$1; count[$2]++} END {for (url in sum) if (sum[url]/count[url] > 0.2) print sum[url]/count[url], count[url], url}' | \
sort -nr
```

**显示“总耗时”**

```bash
awk '{print $(NF-1), $7}' /var/log/nginx/access.log | \
awk '{sum[$2]+=$1; count[$2]++} END {for (url in sum) print sum[url], sum[url]/count[url], count[$2], url}' | \
sort -nr
```

输出字段依次为：`总耗时 平均耗时 访问次数 URL`。

#### 分析已压缩的日志文件

如果日志文件是经过压缩的，可以使用`zcat`命令来查看日志文件内容。

比如我想查看 `access.log-20241029.gz` 中的 IP 为 `192.168.1.1` 的访问记录，可以使用以下命令:

```bash
zcat access.log-20241029.gz | \
grep "192.168.1.1" | awk '{print $7}' | sort | uniq -c | sort -nr | head -n 50
```

这条命令会筛选指定 IP 地址的访问日志，并提取出所有路径，然后统计每个路径的**访问次数**并按照访问次数进行降序排列

### 使用 cURL 或者 wget 下载文件

#### 使用 cURL

cURL 是一个用于传输数据的命令行工具，支持多种协议，如 HTTP、HTTPS、FTP 等。

`cURL` 命令的基本用法是:

```bash
curl [options] [URL]
```

常用的 `cURL` 参数有：

- `-I` <u>只显示响应头</u>

- `-x` 设置代理

- `-X` 指定请求方法

- `-f` 如果下载失败，则不创建文件

- `-L` 跟踪重定向，如果请求的 URL 有重定向，会继续请求重定向后的 URL

- `-J` 下载文件时使用文件名中的描述信息

- `-o` 指定保存文件名，如: `curl -o filename http://example.com/file.zip` 下载文件并保存为 filename

- `-O` 将下载的内容保存到文件，文件名为 URL 的最后部分

- `-s` 静默模式

- `-S` 显示错误信息

- `-v` <u>显示详细信息</u>

- `-k` <u>忽略 SSL 证书验证错误</u>，并继续访问 HTTPS 站点

- `-H "Header: Value"` 添加自定义请求头

- `-e http://zx6.ru` 设置 HTTP Referer 为 `http://zx6.ru`

- `-A "Xenu Link Sleuth/1.3.8"` 设置 User-Agent

下面是使用 `cURL` 下载文件的一些常见用法:

- `curl -f -SOJL https://example.com/file`: 下载文件并保持原始文件名

- `curl -O https://example.com/file`: 下载文件并保存为 URL 的最后部分

- `curl -I -X POST https://example.com`: 发送 POST 请求并只显示响应头

#### wget 下载文件

`wget` 是一个用于下载文件的命令行工具，支持 HTTP、HTTPS 和 FTP 协议。

`wget` 命令的基本用法是:

```bash
wget [options] [URL]
```

常用的 wget 参数有:

- `-O`: 指定下载文件的名称

- `-P`: 指定下载目录

- `-c`: 断点续传

- `-b`: 后台下载

- `-q`: 安静模式，不输出下载进度

- `-t`: 重试次数

- `-T`: 超时时间

- `-i`: 从文件中读取下载地址（后面跟文件，里面都是 url，以行分割）

- `-r`: 递归下载

### 多线程下载

#### 方法 1：使用 `curl` 并行下载多个分片

你可以使用 `curl` 的 `--range` 选项手动分段下载，并使用 `xargs` 或 `&` 进行并行处理：

```bash
seq 0 4 | xargs -n 1 -P 5 -I {} curl -o part_{}.tmp -L -r $(( {} * 1000000 ))-$(( {} * 1000000 + 999999 )) "https://example.com/largefile"
```

- `seq 0 4`：创建 5 个并行任务，每个任务处理 1 MB（可调整）。
- `-P 5`：并行运行 5 个 `curl` 进程。
- `-r start-end`：使用 `--range` 选项请求特定的字节范围。
- `part_{}.tmp`：保存不同分片的文件，稍后需要合并。

合并文件：

```bash
cat part_*.tmp > final_file && rm part_*.tmp
```

#### 方法 2：使用 `aria2c`（推荐）

如果需要更高效的多线程下载，`aria2c` 是一个更好的选择：

```bash
aria2c -x 10 -s 10 "https://example.com/largefile"
```

- `-x 10`：使用 10 个连接。
- `-s 10`：分 10 片下载，提高下载速度。

#### 方法 3：使用 `wget` 进行分段下载

`wget` 也支持断点续传和多连接下载：

```bash
wget -c --limit-rate=500k --tries=3 --progress=bar "https://example.com/largefile"
```

### 测试是否可以远程连接某网站

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

### 查询域名解析的 IP 地址

有多个命令都可以查询域名解析的 IP 地址：

- `curl -v https://ipv4.icanhazip.com`: 查看网页详细信息，会包括服务的 ip 地址

  `https://ipv4.icanhazip.com` 是一个返回访问者 IP 地址的网站，用这个可以查询到本机的 IP 地址

- `nslookup example.com`: 查询 DNS 记录

  默认情况下会查询 A 记录，通过添加 `-type` 参数可以查询其他类型的 DNS 记录

  `-type=A` 参数可以查询 A 记录

  `-type=TXT` 参数可以查询 TXT 记录

  `-type=CNAME` 参数可以查询 CNAME 记录

  `-type=any` 参数可以查询所有类型的 DNS 记录

- `dig example.com`: 更强大的 DNS 查询工具，适合高级用户

  `-A` 参数可以只查看 A 记录

- `host example.com`: 查询域名的 host 记录，包括 A 记录和 MX 记录

- `ping example.com`: 虽然主要功能是测试连通性，但它会解析并显示域名对应的 IP 地址

如果系统中没有这些命令，可以手动安装（比如最小化安装的系统）：

- `yum install bind-utils`: CentOS，安装后就可以使用 `nslookup` 和 `dig` 命令

  `apt install dnsutils`: Ubuntu/Debian

- `yum install inetutils`: CentOS/Ubuntu/Debian，安装后就可以使用 `host` 命令

- `yum install iputils`: CentOS，安装后就可以使用 `ping` 命令

  `apt install iputils-ping`: Ubuntu/Debian

### 禁止 PING 命令

**通过修改 sysctl 配置**

`/etc/sysctl.conf` 保存了系统的内核参数配置，可以通过修改这个文件来禁止 ICMP 请求。

```bash
echo "net.ipv4.icmp_echo_ignore_all = 1" >> /etc/sysctl.conf
# 使配置生效
sysctl -p
```

### 查看网站 SSL 证书信息

#### openssl 查看

可以使用`openssl`来模拟请求，查看证书详细信息:

```bash
echo | openssl s_client -connect example.com:443 -servername example.com 2>/dev/null
```

- `echo` 命令用于向管道发送空字符串，给 `openssl` 命令提供输入

  默认情况下 `openssl s_client` 命令会等待用户输入，否则连接会挂起，通过 `echo` 命令可以避免这种情况

- `-connect` 要访问的目标地址和<u>端口</u>，如果是远程的话，需要替换为远程地址，可以为域名或者 IP 地址

- `-servername` 告知服务器要访问的域名，**可以省略**（如果访问 localhost，则需要指定）

也可以继续把输出信息交给`openssl`来**只显示证书有效期**:

```bash
echo | openssl s_client -connect localhost:443 -servername your_domain.com 2>/dev/null | openssl x509 -noout -dates
```

**返回信息**

- `notBefore` 表示证书的生效日期

- `notAfter` 表示证书的过期日期

- `subject` 表示证书的主题

  `CN` 表示证书的主要域名，如果是通配符证书，会显示 `*.domain.com`

- `subjectAltName` 表示证书的子域名信息

#### openssl 查看本地证书

如果是本地的证书，可以直接查看证书文件，主要通过以下命令:

```bash
openssl x509 -in /path/to/cert.crt -noout -dates
```

- `x509` 表示查看证书信息

- `-in` 指定证书文件

- `-noout` 不显示证书信息

- `-dates` 只显示证书的有效期

  还支持其它参数：

  - `-issuer` 显示颁发者信息

  - `-subject` 显示证书的签发对象（Common Name, CN）

  - `-text` 显示证书的详细信息

### openssl 创建自签名证书

如果你想要在本地搭建一个 HTTPS 服务器，可以使用 openssl 来创建自签名证书。

```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /path/to/dummy.key \
    -out /path/to/dummy.crt \
    -subj "/CN=localhost"
```

- `req`: 生成证书请求。

- `-x509`: 生成自签名证书。

- `-nodes`: 生成无密码证书。

- `-days 365`: 证书有效期。

- `-newkey rsa:2048`: 生成 2048 位的 RSA 密钥。

- `-keyout`: 指定私钥文件。

- `-out`: 指定证书文件。

- `-subj`: 指定证书的主题，这里指定为 localhost。

### 使用 certbot 申请 Let's Encrypt 证书

> 官方文档: [Certbot documentation](https://eff-certbot.readthedocs.io/en/stable/)

Certbot 是官方推荐的工具，用于与 Let's Encrypt 通信并申请证书。

Let's Encrypt 提供了多种验证方法，以下是最常用的两种：

- **HTTP-01 验证**: Certbot 会在服务器上创建一个临时文件，这个文件会放在网站根目录下的 `.well-known/acme-challenge/` 路径下。

  Let's Encrypt 会通过 `HTTP` 请求验证该文件。

- **DNS-01 验证**: 你需要在域名的 DNS 管理系统中添加特定的 TXT 记录，这种方式适合没有 HTTP 服务或自动化时。

#### 命令行方式申请管理证书

通过简单的一条命令就可以申请证书:

```bash
sudo certbot certonly --webroot -w /var/www/html -d example.com -d www.example.com
```

它会在 `/var/www/html` 目录下创建一个临时文件，然后 Let's Encrypt 会通过 HTTP 请求验证该文件。

- `certonly`: 仅生成证书，不安装证书

- `--webroot`: 指定 webroot 验证方式

- `-w /var/www/html`: 指定 webroot 路径

- `-d example.com -d www.example.com`: 指定申请证书的域名

  <u>可以同时为多个域名申请证书，</u>只需要在 `-d` 参数后面添加域名即可，会生成一个包含所有域名的证书。

**自动化证书管理**

如果希望通过脚本来自动化证书管理，可以使用 `--non-interactive` 参数，它会自动应答所有问题。

```bash
sudo certbot certonly \
    --webroot -w /var/www/html \
    -d example.com -d www.example.com \
    -m 'you_name@email.com' \
    -n \
    --agree-tos \
    --quiet
```

- `-n`: 非交互模式

- `-m`: 指定邮箱地址

- `--agree-tos`: 同意 Let's Encrypt 的服务条款

- `--quiet`: 静默模式，不输出冗余信息

#### 管理证书命令

- `certbot certificates`: <u>查看所有证书</u>，包括证书的域名、有效期等信息

  _留意下方注意内容，如果使用了 `--config-dir` 参数，需要加上 `--config-dir` 参数来指定配置目录_

- `certbot renew`: 续期证书

  它会自动检查证书是否快过期，如果快过期就会自动续期，否则会直接跳过

- `certbot renew --dry-run`: 模拟续期证书

  用于测试续期证书是否正常，不会实际续期证书，开启自动续期前可以先测试一下

- `certbot revoke --cert-name example.com`: 撤销证书

- `certbot delete --cert-name example.com`: 删除证书

  _也可以直接删除 `/path/to/live/example.com` 目录和 `/path/to/renewal/example.com.conf` 文件来实现_

**注意**: 如果通过 `--config-dir` 指定了配置目录，在管理时需要加上 `--config-dir` 参数来指定配置目录，否则会默认使用 `/etc/letsencrypt` 目录。

#### 定时任务自动续期证书

Certbot 安装后通常会自动添加一个 systemd 定时任务，你可以使用以下命令查看：

```bash
systemctl list-timers | grep certbot
```

你可以通过查看服务状态来查看定时任务的执行情况：`systemctl status certbot.timer`

#### 管理账号命令

- `certbot register`: 注册账号

- `certbot unregister`: 注销账号

- `certbot update_account`: 更新账号

- `certbot delete_account`: 删除账号

#### 可选参数

列出部分参数，更多参数请参考[官方文档](https://eff-certbot.readthedocs.io/en/latest/using.html#certbot-command-line-options)

- `--config-dir`: <u>指定配置目录，</u>默认为 `/etc/letsencrypt`

- `--expand`: 允许扩展现有证书

  和标准的申请参数类似，但是它会添加新的域名到现有证书中

  如 `certbot certonly --expand -d example.com -d www.example.com` 可以将 `www.example.com` 添加到 `example.com` 的证书中

#### 常见错误

Certbot 会记录详细的错误信息，检查日志可以帮助排查问题，错误日志通常位于 `/var/log/letsencrypt/letsencrypt.log`。

**some challenges have failed.**

这个错误通常是由于 Let's Encrypt 无法访问到验证文件，可能是访问路径不对，或者是权限问题。

## SSH 连接

### SSH 基础

SSH 是一种加密的网络协议，用于在不安全的网络中安全地传输数据。

SSH 客户端可以通过 SSH 协议连接到远程服务器，进行远程登录、文件传输等操作。

#### SSH 相关目录

- `~/.ssh`: SSH 配置文件和密钥文件的默认存储目录。

- `~/.ssh/authorized_keys`: 存储远程服务器的公钥，用于 SSH 免密登录。

- `~/.ssh/config`: SSH 客户端的配置文件，用于配置 SSH 客户端的参数。

- `~/.ssh/know_hosts`: 存储已知的主机公钥，用于验证远程服务器的身份。

- `/etc/ssh/sshd_config`: SSH 服务的配置文件，用于配置 SSH 服务的参数。

- `/var/log/auth.log`: SSH 服务的日志文件。

#### SSH 常用命令

- `ssh username@remote_host`: 连接到远程服务器

- `ssh -p port username@remote_host`: 指定端口连接到远程服务器

### SSH 连接配置

SSH 配置文件通常位于用户家目录下的 `.ssh` 目录中，文件名为 `config`。

通过修改 SSH 配置文件，可以为不同的主机配置不同的参数，避免每次都输入参数。

```bash
Host myserver
    HostName remote_host
    User username
    Port 22
    IdentityFile ~/.ssh/id_rsa
```

- `Host`: 指定主机别名，这意味着你可以使用别名来代替主机地址。

  （之后就可以使用`ssh myserver`来登录）

- `HostName`: 指定主机地址。

- `User`: 指定登录用户名。

- `Port`: 指定 SSH 端口。

- `IdentityFile`: 指定私钥文件。

还可以定义更多配置项：

- `logLevel`: 指定日志级别。(QUIET, FATAL, ERROR, INFO, VERBOSE, DEBUG, DEBUG1, DEBUG2, and DEBUG3)

- `Compression`: 指定压缩算法。

现在就可以直接使用 `ssh myserver` 来登录了，如果配置了私钥，就不需要输入密码。

### SSH 密钥生成及应用

如果想要通过 SSH 连接到远程服务器，可以使用 SSH 密钥来进行身份验证，而不是使用密码。

**生成 SSH 密钥**

```bash
ssh-keygen -t rsa -b 4096 -C "comment"
```

- `-t rsa`: 指定密钥类型为 RSA。

- `-b 4096`: 指定密钥长度为 4096 位。

- `-C "comment"`: 添加注释。

**将公钥复制到远程服务器**

```bash
ssh-copy-id username@remote_host
```

如果指定了端口或使用了非默认路径的私钥，可以添加参数：

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub -p 22 username@remote_host
```

**手动复制公钥到远程服务器**

```bash
cat ~/.ssh/id_rsa.pub | ssh username@remote_host "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

复制到远程服务器后，可以通过以下命令测试是否成功，如果不需要输入密码即可登录，则表示成功。

```bash
ssh username@remote_host
```

### SSH 服务配置

#### 修改 SSH 端口

默认情况下，SSH 服务使用 22 端口，为了提高安全性，可以修改 SSH 服务的端口。

修改的配置文件通常位于 `/etc/ssh/sshd_config`。

修改其中的端口配置项，修改后需要重启 SSH 服务:

```bash
systemctl restart sshd
```

_不同的系统 ssh 服务名称可能不同，可以使用`systemctl list-unit-files --type=service | grep ssh`来查看_

## 防火墙

### 使用 ufw 管理防火墙

ufw 是 Ubuntu/Debian 系统中的一个简单的防火墙管理工具，可以用来配置 iptables 防火墙规则。

> 如果没有安装，可以使用`apt`来安装，命令为: `apt install ufw`

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

## 系统信息管理

### 查看及修改主机信息

> 主机的名称是服务器的标识，可以通过主机名来访问服务器，配置文件在 /etc/hostname

- `hostname`: 查看主机名

  `hostname newname` 修改主机名（临时）

  `hostnamectl set-hostname newname` 修改主机名

  `hostnamectl set-hostname newname --static` 修改静态主机名

  `hostnamectl set-hostname newname --pretty` 修改主机名的美观名称

  `hostnamectl set-hostname newname --transient` 修改临时主机名

如果要查看系统信息，也可以安装一个`neofetch`工具，它可以显示系统信息。

### 查看系统的芯片和其他硬件信息

- `lscpu`: 查看 CPU 信息

  显示有关 CPU 架构的信息，包括其类型、核心数、架构等。

- `cat /proc/cpuinfo`: 查看 CPU 信息

  `cat /proc/cpuinfo | grep 'processor' | wc -l` 可以查看 CPU 的核心数

- `free -h`: 查看内存使用情况

- `cat /proc/meminfo`: 查看内存信息

  `cat /proc/meminfo | grep 'MemTotal'` 可以查看总内存大小

- `lsblk`: 查看块设备信息(列出所有存储设备的大小)

- `df -h --total`: 查看磁盘使用情况(关注已挂载分区的使用情况)

- `fdisk -l`: 查看磁盘分区信息

- `lshw`: 查看硬件信息

  显示有关系统硬件的详细信息，包括 CPU、内存、磁盘、网络适配器等。

- `lspci`: 查看 PCI 设备信息

- `sudo dmidecode`: 查看硬件信息(用于从系统的 BIOS 中提取硬件信息。=)

  你可以使用具体的选项来查看特定的硬件信息:

  `sudo dmidecode -t processor` 查看处理器信息

  `sudo dmidecode -t memory` 查看内存信息

  `sudo dmidecode -t bios` 查看 BIOS 信息

## 进程管理

### 使用 PS 查找进程

- `ps aux`: 查看所有进程

- `ps aux | grep nginx`: 查找 nginx 进程

- `ps aux | grep php-fpm`: <u>查找 php-fpm 进程</u>

  `lsof -i :port` 可以用来查看占用指定端口进程情况（可能需要安装 `lsof`）。

- `ps -p PID`: 查看指定 PID 的进程

### 使用 kill 关闭进程

- `kill -QUIT PID`: 优雅关闭指定 PID 的进程（推荐，允许进程有序关闭）

- `kill -9 PID`: 关闭指定 PID 的进程（强制关闭）

  `-9` 表示强制关闭进程（不进行清理操作）

  kill 后面可以跟多个 PID，用空格隔开

- `killall -9 php-fpm`: <u>关闭所有 php-fpm 进程</u>

## 日期和时间

### 查看日期和时间

`cal` 命令用于显示日历，可以显示当前月份的日历，也可以显示指定月份的日历。

**cal 常用命令**

- `cal`: 显示当前月份的日历

  `-j` 显示儒略日历（Julian Calendar）

- `cal 2025`: 显示 2025 年的日历

- `cal 01 2025`: 显示 2025 年 01 月的日历

- `cal -3`: 显示上个月、当前月和下个月的日历

`date` 命令用于显示当前日期和时间，也可以用于设置系统时间。

**date 常用命令**

- `date`: 显示当前日期和时间

- `date "+%Y-%m-%d %H:%M:%S"`: 显示指定格式的日期和时间

- `date -s "2025-01-01 12:00:00"`: 设置系统时间

  `date -s "12:00:00"` 设置系统时间（只设置时间）

  `date -s "12:00"` 设置系统时间（只设置时间）

  `date -s "tomorrow"` 设置系统时间为明天

  `date -s "next year"` 设置系统时间为明年

  `date -s "last year"` 设置系统时间为去年

  `date -s "next month"` 设置系统时间为下个月

  `date -s "last month"` 设置系统时间为上个月

`hwclock` 命令用于显示硬件时钟的时间，也可以用于设置硬件时钟的时间。

**hwclock 常用命令**

- `hwclock`: 显示硬件时钟的时间

- `hwclock --systohc`: 将系统时间同步到硬件时钟

- `hwclock --hctosys`: 将硬件时钟同步到系统时间

### 设置服务器时区

不同地区的服务器时区不同，设置时区可以避免时间不一致的问题。

在 Linux 系统中，时区信息通常存储在 `/etc/localtime` 文件中。

`timedatectl` 命令用于显示和设置系统的时间和日期，也可以用于设置时区。

**timedatectl 常用命令**

- `timedatectl`: 显示当前时间和日期

- `timedatectl set-timezone Asia/Shanghai`: 设置时区为上海

- `timedatectl set-time "2025-01-01 12:00:00"`: 设置系统时间

- `timedatectl set-ntp true`: 启用 NTP 时间同步

  `timedatectl set-ntp false` 禁用 NTP 时间同步

**注意**: 设置时区后，MySQL 等服务不一定会自动更新时区，需要重启服务才能生效。

## 第三方工具

### 网络监控

#### iftop

`iftop` 是一个实时的网络流量监控工具，可以用来查看网络流量的来源和目的地。

**常用的命令:**

- `iftop -i eth0` 可以监控指定网卡的流量

- `iftop -i eth0 -f "host 192.168.1.1"` 可以监控指定主机的流量

#### tcpdump

`tcpdump` 是一个网络抓包工具，可以用来捕获网络数据包并进行分析。

macOS 下可以直接使用 `tcpdump` 命令，Linux 下可以使用 `apt` 安装。

**常用的命令:**

- `tcpdump -i eth0`: 可以监控指定网卡的流量

  - `-i` 参数表示指定网卡

- `tcpdump -i eth0 -n`: 可以显示 IP 地址而不是域名

- `tcpdump -i eth0 -c 10`: 可以捕获指定数量的数据包

- `tcpdump -i eth0 -w output.pcap`: 可以将捕获的数据包保存到文件

- `tcpdump -i eth0 -r input.pcap`: 可以读取保存的数据包文件

- `tcpdump -i lo0 -X 'tcp port 8080'`: 可以查看指定端口的数据包

  - `lo0` 表示本地回环接口（它只在主机内部进行通信而不通过物理网络硬件）

    这个标识在不同系统上可能不同，Linux 下一般是`lo`，macOS 下是`lo0`

  - `-X` 参数表示以十六进制显示数据包内容（不加这个参数只显示头部信息）

**本地模拟测试**

我们首先可以用 python 来模拟一个简单的 HTTP 服务器:

```python
python -m http.server 8080
```

然后使用`tcpdump`来查看数据包:

```bash
tcpdump -i lo0 -X 'tcp port 8080'
```

最后用 `curl http://localhost:8080` 来访问这个服务器，就可以看到数据包的内容了。

### 终端工具

#### tmux

`tmux` 是一个终端复用工具，可以在一个终端窗口中创建多个会话，每个会话可以包含多个窗格。

- `tmux new -s session_name`: 创建一个新的会话

- `tmux attach -t session_name`: 连接到一个会话

- `tmux ls`: 列出所有会话

- `tmux kill-session -t session_name`: 关闭一个会话

### 进程服务管理

#### supervisor

`supervisor` 是一个进程管理工具，可以用来管理系统中的各种进程。

- `supervisord`: 启动 supervisor

- `supervisorctl`: 进入 supervisor 控制台

- `supervisorctl status`: 查看所有进程状态

- `supervisorctl start process_name`: 启动一个进程

- `supervisorctl stop process_name`: 停止一个进程

- `supervisorctl restart process_name`: 重启一个进程

- `supervisorctl reread`: 重新读取配置文件

- `supervisorctl update`: 更新配置文件

### 工具集

#### htpasswd

`htpasswd` 是一个用于创建和管理存储用户名和加密密码文件的工具。

- `htpasswd -c /etc/nginx/.htpasswd username`: 创建一个新文件并添加用户

- `htpasswd /etc/nginx/.htpasswd username`: 添加一个新的用户

- `htpasswd -cs /etc/nginx/.htpasswd username`: 创建一个新文件并添加用户（使用 SHA 加密）
