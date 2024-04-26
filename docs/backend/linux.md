# Linux

## 文件目录

- /etc：系统配置文件

  通常包括系统的配置文件和程序的配置文件

- /var：系统运行时需要改变的文件

  通常包括日志文件、缓存文件、软件包文件等

## Linux 命令

### 基础命令

- ls: 列出目录及文件名

  -l 长信息，可以查看权限等信息

  -h 显示文件尺寸

  -F 文件夹末尾加'/'

- cd：切换目录

  `-`：返回上一次所在的目录

- pwd：显示目前的目录

- grep：查找文件内容

  -i 忽略大小写

  -n 显示行号

  -v 反向选择

  -r 递归查找

- find：查找文件

  /etc -name "passwd" 查找 /etc 目录下的 passwd 文件

  /etc -iname "passwd" 忽略大小写查找

  /etc -type f 查找文件

  /etc -type d 查找目录

  `/` 表示搜索全部目录

- touch：创建文件

- mkdir：创建一个新的目录

- rmdir：删除一个空的目录

- cp: 复制文件或目录

- mv: 移动文件与目录，或修改文件与目录的名称

- rm: 删除文件

  -r 可以删除目录

- rmdir: 删除空目录

- chmod -R 775 filename: 更改文件或者目录权限为 775

  -R 表示递归，可以同时修改文件夹及子文件夹和文件

  三个数字分别代表所有者、所属组、其他用户的权限，7 代表读写执行，5 代表读和执行，0 代表无权限

  也可以使用类似`ug=rwx, o=rw`的方式来修改权限, u 代表所有者，g 代表所属组，o 代表其他用户，a 代表所有用户

- chwon -R USER:GROUP filename: 更改文件或者目录的所有者和所属组

  -R 表示递归，可以同时修改文件夹及子文件夹和文件

- cat filename: 查看文件内容

  less filename: 逐页查看文件内容(空格翻页)

  more filename: 逐页查看文件内容(空格翻页)

- curl: 用于传输数据

  -I 只显示响应头

  -L 跟踪重定向

  -o 将下载的内容保存到文件

  -O 将下载的内容保存到文件，文件名为 URL 的最后部分

#### mkdir 的选项参数

- **-m ：配置文件的权限！**

  直接配置，不需要看默认权限 (umask) 的脸色～

- **-p ：支持创建多层目录！**

  帮助你直接将所需要的目录(包含上一级目录)递归创建起来！

#### mv 修改名称

例如：`mv file1.txt file2.txt`，可以将 file1 文本重命名为 file2。

### 解压缩操作

- tar: 打包文件

  -c 创建新的归档文件

  -x 解开归档文件

  -v 显示详细信息

  -f 指定归档文件

  -z 使用 gzip 压缩

  -j 使用 bzip2 压缩

  -r 向归档文件中添加文件

  -t 显示归档文件中的内容

- zip: 压缩文件

  -r 递归压缩

  -m 移动文件到 zip 文件中

  -q 静默模式

  -o 覆盖已有文件

  -u 更新已有文件

  -d 删除 zip 文件中的文件

  -l 显示文件列表

  -v 显示详细信息

  -T 测试 zip 文件

  -x 排除文件

```bash
zip -r filename.zip /path/to/folder
```

- unzip: 解压缩文件

### 用户相关命令

- id: 查看用户 ID 和所属组 ID

  -u 查看用户 ID，后面可以指定用户名

  -g 查看所属组 ID，后面可以指定用户名

- whoami: 查看当前用户

- sudo -i: 提升用户权限

- su: 切换用户

  -l 切换到 root 用户

  -s 指定 shell

- useradd: 添加用户

  -m 创建用户的家目录

  -e 设置用户的过期时间

- userdel: 删除用户

  -r 删除用户的家目录

- usermod: 修改用户

  -l 修改用户名

  -g 修改用户所属组

  -G 修改用户所属附加组

  -d 修改用户家目录

  -s 修改用户 shell

  -e 修改用户过期时间

- passwd: 修改密码

- users: 查看当前登录系统的用户

### 防火墙及端口的管理

firewall-cmd --zone=public --add-port=3306/tcp --permanent

firewall-cmd --reload

firewall-cmd --zone=public --list-ports

#### ufw

sudo ufw status [numbered] 列出防火墙规则（可以选择加上序号）

sudo ufw delete {num} 有序号后就可以指定删除某条规则

ufw delete deny 25/tcp comment 'Block access to smptd by default'

sudo ufw status verbose 查看当前防火墙状态

sudo ufw app list 查看服务列表

sudo ufw allow 22/tcp 允许 22 端口的 TCP 请求访问（不加“/tcp”为允许 tcp 和 udp）

sudo ufw deny 25[/tcp comment 'Block access to smptd by default'] 拒绝指定端口访问

**更多案例**

To allow IP address 192.168.1.10 access to port 22 for all protocols
`sudo ufw allow from 192.168.1.10 to any port 22`
Open port 74.86.26.69:443 (SSL 443 nginx/apache/lighttpd server) for all, enter:
`sudo ufw allow from any to 74.86.26.69 port 443 proto tcp`
To allows subnet 192.168.1.0/24 to Sabma services, enter:
`ufw allow from 192.168.1.0/24 to any app Samba`

To get information on Squid profile/app, run:
`ufw app info Squid`

### 常用命令详解

#### cat 打印、合并文件

1.命令含义：Print and concatenate files

2.主要用法示例：

- cat file：将文件内容打印显示。

- cat file1 file2> target_file：将多个文件合并到目标文件中。

```bash
cat file1 file2 > target_file
```

- cat file1 file2 >> target_file：将几个文件附加到目标文件中。

```bash
cat file1 file2 >> target_file
```

#### grep 查找文本

查找文本在某个文件中

可以加`-a`参数，表示以文本方式查看二进制文件

```bash
grep -a "text" filename
```

其中字符串内容可以使用正则表达式

```bash
grep -a "sc[0-9]*" filename
```

#### less 和 more 的区别

`less` 和 `more` 都用于分页显示文本文件的内容，但是 `less` 拥有更多的功能和交互性。

`less` 允许你向前和向后浏览文件，可以使用方向键、Page Up、Page Down、Home 和 End 等键进行操作，而 `more` 只能向前浏览，使用空格键向下翻页，使用回车键向下滚动一行。

`less` 支持搜索、跳转、标记等功能，而 `more` 通常只能按顺序浏览文件。

总的来说，`less` 是更加功能强大和灵活的文本查看工具，而 `more` 则是 `less` 的简化版，适用于简单的文本浏览需求。`cat` 则是用于将文件内容输出到终端的简单工具，不提供分页和交互式浏览功能。

#### systemctl 命令

`systemctl` 是一个 Linux 系统中用于管理 systemd 服务的命令行工具。

systemd 是一个 init 系统和系统管理守护进程，用于启动、停止和管理系统中的各种服务和进程。

以下是 `systemctl` 命令的一些常见用法和解释：

1. **启动服务**：启动一个特定的服务。

   ```bash
   systemctl start <service_name>
   ```

2. **停止服务**：停止一个特定的服务。

   ```bash
   systemctl stop <service_name>
   ```

3. **重启服务**：停止并重新启动一个特定的服务。

   ```bash
   systemctl restart <service_name>
   ```

4. **重新加载配置**：重新加载一个特定服务的配置文件，使新的配置生效，而不需要重启服务。

   ```bash
   systemctl reload <service_name>
   ```

5. **查看服务状态**：查看特定服务的状态，包括是否正在运行。

   ```bash
   systemctl status <service_name>
   ```

6. **启用服务**：将一个服务设置为在系统启动时自动启动。

   ```bash
   systemctl enable <service_name>
   ```

7. **禁用服务**：将一个服务设置为在系统启动时不自动启动。

   ```bash
   systemctl disable <service_name>
   ```

8. **查看服务是否启用**：查看一个服务是否已经设置为在系统启动时自动启动。

   ```bash
   systemctl is-enabled <service_name>
   ```

9. **查看所有已启用的服务**：列出所有已经设置为在系统启动时自动启动的服务。

   ```bash
   systemctl list-unit-files --type=service | grep enabled
   ```

10. **查看所有正在运行的服务**：列出当前正在运行的所有服务。

    ```bash
    systemctl list-units --type=service | grep running
    ```

### service 和 systemctl 的区别

`systemctl` 和 `service` 命令都用于管理系统服务，包括启动、停止、重启和检查服务状态等。它们的不同之处在于它们是不同的服务管理工具，适用于不同的系统。

- `systemctl` 是 systemd 的主要命令，用于管理系统的服务和其他系统资源。

- `systemctl` 可以启动、停止、重启和重新加载系统服务，并提供了更多高级功能，如启用/禁用服务、查看服务状态和日志等。

- `service` 命令是一个简单的系统服务管理工具，用于启动、停止和重启系统服务。
- `service` 命令主要用于 SysVinit 系统，这是旧版本的 Linux 系统使用的 init 系统。

虽然在一些新的 Linux 发行版中，`systemctl` 取代了 `service` 命令成为了管理系统服务的首选工具，但在一些较旧的系统中，`service` 命令仍然可以使用，因为系统可能仍然使用着 SysVinit 系统。

#### 文件权限的数字和权限之间的关系

待补充……

#### ls -l 长目录代表的意思

待补充……

### 系统运行状态

1. **查看系统信息**：
   - `uname -a`: 显示当前系统的内核版本和其他信息。
   - `hostname`: 显示主机名。
   - `uptime`: 显示系统的运行时间、用户数量、负载平均值等。
   - `df -h`: 显示磁盘空间使用情况。
2. **查看 CPU 运行情况**：
   - `top`: 实时显示系统中各个进程的资源占用情况，包括 CPU 使用率、内存占用等。🌟🌟
   - `htop`: 类似于 `top`，但是提供了更加友好的交互界面。
   - `mpstat`: 显示多处理器系统中每个 CPU 的使用情况。
   - `sar`: 收集、报告系统活动情况，包括 CPU 使用率、内存使用率等。
3. **查看进程情况**：
   - `ps`: 显示当前系统中的进程列表。
     - `ps aux`: 显示所有进程的详细信息。🌟🌟
     - `ps -ef`: 显示所有进程的详细信息，包括父进程 ID。
   - `pstree`: 显示进程树，以树状结构展示进程之间的关系。
   - `pgrep`: 根据进程名或者其他条件查找进程 ID。
   - `kill`: 终止指定进程。
   - `killall`: 终止指定名称的所有进程。
4. **查看内存使用情况**：
   - `free`: 显示系统内存的空闲和已用情况。
   - `vmstat`: 显示虚拟内存统计信息，包括内存、进程、IO 等。
   - `top` 或 `htop`: 也可以用来查看内存使用情况。
5. **查看网络情况**：
   - `ifconfig`: 显示网络接口的配置信息。
   - `netstat`: 显示网络连接、路由表、接口统计等。
   - `ss`: 类似于 `netstat`，用于获取套接字统计信息。

### 补充说明

1、文件名如果带空格，则需要通过双引号将文件名引起来。

例如：`rm “test case.py”`

2、上一级目录可以直接用`../`表示，如果返回上级就可以直接输入命令：`cd ../`

3、你可以使用 _man [命令]_ 来查看各个命令的使用文档，

如 ：`man cp`

4、lsof -i :3306 查看端口号 3306 的占用情况。

![Ethan_2023-04-07_16-15-49](https://pic.shejibiji.com/i/2023/04/07/642fd1465e23c.jpg)

**知识点链接：**[Linux 文件与目录管理](https://www.runoob.com/linux/linux-file-content-manage.html)

## 应用及服务命令

### 常用的应用目录

Apache 默认网站目录：/var/www/html/

Apache 配置目录： /etc/apache2/

PHP-FPM 配置目录：/etc/php-fpm.d/

MySQL 配置：/etc/my.cnf

### yum

查看所有软件列表：yum repolist all | grep mysql

查看已安装的软件列表：yum list installed

卸载应用：`yum remove [package_name]`

深度卸载：`yum autoremove [package_name]`

### Apache 命令

sudo service apache2 stop

sudo service apache2 start

sudo service apache2 restart

### MySQL 命令

service mysqld start/stop/restart

systemctl status mysqld

systemctl start mysqld

## 使用案例

### 网络相关

#### 查看 TCP 连接数

1）统计 80 端口连接数

```bash
netstat -nat|grep -i "80"|wc -l
```

2）统计 httpd 协议连接数

```bash
ps -ef|grep httpd|wc -l
```

3）、统计已连接上的，状态为“established

```bash
netstat -na|grep ESTABLISHED|wc -l
```

4）、查出哪个 IP 地址连接最多

```bash
# 分析当前系统上的网络连接情况，并统计每个来源 IP 地址的连接数量
netstat -ntu | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort  -r -n
# 按照连接次数从高到低进行排序，显示出每个 IP 地址建立的连接数量
netstat -na | grep ESTABLISHED | awk '{print $5}' | awk -F: '{print $1}' | sort | uniq -c|sort -r -n
```

`netstat -ntu`：这个部分执行了 netstat 命令来显示当前系统的网络连接情况。其中 `-n` 参数表示以数字形式显示 IP 地址和端口号，`-t` 参数表示显示 TCP 协议的连接，`-u` 参数表示显示 UDP 协议的连接。

5）、显示所有监听的 TCP 端口

```bash
netstat -ntlp
```

6）、显示特定端口的监听状态：

```bash
netstat -ntlp | grep 80
```

7）、显示所有活动的 UNIX 域套接字：

```bash
netstat -axu
```

8）、显统计 TCP 连接状态的类型和数量：

```bash
netstat -n | awk '/^tcp/ {++S[$NF]} END {for (a in S) print a, S[a]}'
```

9）、显示连接的进程 ID 和程序名称：

```bash
netstat -natp
```

10）、显示路由表

```bash
netstat -nr
```

### 远程复制文件到本地

适用于复制远程备份文件到本地保存

```bash
scp  -r  -P 2347 apollo@87.143.145.146:/home/apollo/bak/20240202  /Users/ethan/Downloads
```

### 快速创建多个文件夹或文件

1、首先切换到想要创建文件夹的位置，输入命令：

```
$ mkdir departments employees setting salarys social attendances approvals permission
```

就可以同时创建多个文件夹了。

2、输入以下命令

```bash
touch departments/index.vue employees/index.vue setting/index.vue
 salarys/index.vue social/index.vue attendances/index.vue
 approvals/index.vue permission/index.vue
```

就可以在 1 中创建的文件夹下分别创建 vue 文件

### 测试服务器是否可以连接某网站

可以通过自带的连接工具，比如 curl 或者 wget。

```bash
wget -p http://site.com
```

或者

```bash
time curl -I http://yourpage.com | grep HTTP
```

例如：

```bash
os@osdeMacBook-Pro ~ % time curl -I https://www.shejibiji.com | grep HTTPS
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
curl -I https://www.shejibiji.com  0.02s user 0.01s system 4% cpu 0.617 total
grep HTTPS  0.00s user 0.00s system 0% cpu 0.616 total
```
