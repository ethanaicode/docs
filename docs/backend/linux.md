## 常用的Linux命令

> 230517: 单独拿出来，不再和笔记网站同步
>
> php xx.php &: 加个“&”可以让php在后台运行进程

### 常用的文件目录

> Apache默认网站目录：/var/www/html
>
> Apache配置目录： /etc/apache2
>
> sudo service apache2 stop 
>
> sudo service apache2 start
>
> sudo service apache2 restart

### 处理目录命令

- ls（英文全拼：list files）: 列出目录及文件名

  （ls -l 可以查看权限等信息） 

- cd（英文全拼：change directory）：切换目录

- pwd（英文全拼：print work directory）：显示目前的目录

- mkdir（英文全拼：make directory）：创建一个新的目录

- rmdir（英文全拼：remove directory）：删除一个空的目录

- cp（英文全拼：copy file）: 复制文件或目录

- mv（英文全拼：move file）: 移动文件与目录，或修改文件与目录的名称

- rm（英文全拼：remove）: 删除文件或目录

- chmod -R 775 filename: 更改文件或者目录权限为775

  （-R表示递归，可以同时修改文件夹及子文件夹和文件） 
  
- sudo -i: 提升用户权限

#### mkdir的选项参数

- **-m ：配置文件的权限！**

  直接配置，不需要看默认权限 (umask) 的脸色～

- **-p ：支持创建多层目录！**

  帮助你直接将所需要的目录(包含上一级目录)递归创建起来！

#### mv修改名称

例如：`mv file1.txt file2.txt`，可以将file1文本重命名为file2。

![img](https://pic.shejibiji.com/i/2022/07/27/62e0d628bb9f6.png)

### 防火墙及端口的管理

sudo ufw status [numbered] 列出防火墙规则（可以选择加上序号）

​	sudo ufw delete {num} 有序号后就可以指定删除某条规则

​	ufw delete deny 25/tcp comment 'Block access to smptd by default'

sudo ufw status verbose 查看当前防火墙状态

sudo ufw app list 查看服务列表

sudo ufw allow 22/tcp 允许22端口的TCP请求访问（不加“/tcp”为允许tcp和udp）

sudo ufw deny 25[/tcp comment 'Block access to smptd by default'] 拒绝指定端口访问

#### 更多案例

To allow IP address 192.168.1.10 access to port 22 for all protocols
`sudo ufw allow from 192.168.1.10 to any port 22`
Open port 74.86.26.69:443 (SSL 443 nginx/apache/lighttpd server) for all, enter:
`sudo ufw allow from any to 74.86.26.69 port 443 proto tcp`
To allows subnet 192.168.1.0/24 to Sabma services, enter:
`ufw allow from 192.168.1.0/24 to any app Samba`

To get information on Squid profile/app, run:
`ufw app info Squid`

### 用户相关命令

passwd 修改密码

### 更多常用命令

#### cat 打印、合并文件

**1.**命令含义：Print and concatenate files

**2.**主要用法示例：

- cat file：将文件内容打印显示。

![img](https://pic.shejibiji.com/i/2022/07/27/62e0d620328e6.png)

- cat file1 file2> target_file：将多个文件合并到目标文件中。

![img](https://pic.shejibiji.com/i/2022/07/27/62e0d621eb72d.png)

- cat file1 file2 >> target_file：将几个文件附加到目标文件中。

![img](https://pic.shejibiji.com/i/2022/07/27/62e0d62515121.png)

#### more 查看文件

####  touch 创建空白文件

**1.**命令含义：用于修改文件或者目录的时间属性，包括存取时间和更改时间。

若文件不存在，系统会建立一个新的空白文件。

**2.**主要用法示例：

- touch file：修改file的时间属性，如果file不存在，则将创建一个新的空白文件。

![img](https://pic.shejibiji.com/i/2022/07/27/62e0d6306e323.png)

### 系统运行状态信息相关

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

3、你可以使用 *man [命令]* 来查看各个命令的使用文档，

如 ：`man cp`

4、lsof -i :3306 查看端口号3306的占用情况。

![Ethan_2023-04-07_16-15-49](https://pic.shejibiji.com/i/2023/04/07/642fd1465e23c.jpg)

5、`mdfind -name filename` 查看文件根据文件名，可以是完整的文件名和文件格式，也可以是关键词（关键词是头部关键词，并不是包含的意思，比如soft，你只能找到`softxxx`，而不能找到`xxxsoftxxx`）

**知识点链接：**[Linux文件与目录管理](https://www.runoob.com/linux/linux-file-content-manage.html)

## Nginx 命令

更新网站配置后需要重新加载一下nginx的配置。

可以先确认下新的配置是否都正确：

```bash
nginx -t
```

重新加载配置命令：

```bash
nginx -s reload
```

## 高阶使用案例

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

就可以在1中创建的文件夹下分别创建vue文件

### 测试服务器是否可以连接某网站

可以通过自带的连接工具，比如curl或者wget。

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
