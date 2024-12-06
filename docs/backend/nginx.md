---
title: Nginx入门指南，轻松搭建高效Web服务器
---

# Nginx

> 参考文档: [Nginx 官方文档](http://nginx.org/en/docs/)

## 基础

Nginx 是一个高性能的 HTTP 和反向代理服务器，也是一个 IMAP/POP3/SMTP 代理服务器。

### 基础命令

- `nginx`: 启动

  通过`ps =ef | grep nginx`来查看 nginx 进程

  通过`lsof -i:80`来确认端口占用情况

- `nginx -V`: 查看信息（可以看到安装配置等目录）

- `nginx -s [SIGNAL]`: 控制

  `quit` 优雅停止

  `stop` 立即停止

  `reload` 重载配置文件（不停止服务）

  `reopen` 重新打开日志文件

- `nginx -t`: 检查配置信息（有错误会有提示）

> [!TIP]提示:
> 修改配置后，一定要先使用 `-t` 检查配置文件是否正确，然后再重载配置（重载配置不会提示错误）。

## 配置

### nginx.conf

Nginx 的基础配置文件是`nginx.conf`，一般在`/etc/nginx/nginx.conf`。

Nginx 的配置主要分为三大块，全局块，events 块，以及 http 块。

- **全局块**: 主要是一些配置文件的路径、用户、工作进程数等。

  `worker_processes`: nginx 进程数，可以和 CPU 核心数保持一致，或者使用 `auto`值。

  `pid`: nginx 进程的 PID 文件路径。

- **events**: 主要是服务器和客户端之间的网络连接的一些配置，比如指定每个 worker 进程可以同时接收多少个网络连接（worker_connections）。

- **http**: 主要是 HTTP 协议相关的配置，比如设置 MIME 类型、日志格式、访问日志的路径等。这一块也是我们经常修改的地方

### events 配置

这一块主要用来定义与网络事件处理相关的设置

```nginx
events {
    worker_connections 2048;
    use epoll;
    multi_accept on;
}
```

- `worker_connections`: 每个 worker 进程可以同时接受的连接数，一般设置为 1024 或 2048。所以最大连接数 = worker_processes \* worker_connections。

- `use`: 指定 Nginx 使用的事件模型，可以是 `select`、`poll`、`kqueue`、`epoll` 等。显式指定 `epoll` 可以确保使用高效模型。

- `multi_accept`: 是否允许一个 worker 进程同时接受多个新连接，默认为 off，开启后可以提高高并发情况下的性能。

### http 配置

#### 静态资源

```nginx
http {
    server {
        listen 80;
        server_name localhost;
        location / {
            root /var/www/html;
            index index.html;
        }
    }
}
```

- `listen`: 监听的端口

- `server_name`: 域名

- `location`: 匹配的路径

- `root`: 静态资源的根目录

- `index`: 默认的首页

#### try_files 指令

`try_files` 是一个 Nginx 指令，用于尝试按照指定的顺序查找文件。如果找不到前面的文件或资源，就尝试下一个。

```nginx
location / {
    root /var/www/html;
    index index.html;
    try_files $uri $uri/ /index.html =404;
}
```

- `$uri`: 请求的路径

- `$uri/`: 请求的路径加上`/`

- `/index.html`: 默认的首页

- `=404`: 如果找不到则返回 404

- 这里表示先去寻找对应的 $uri 文件，如果找不到则去找 $uri/ 目录，如果还找不到则返回 /index.html，如果还找不到则返回 404。

#### include

可以使用`include`来引入其他配置文件。

```nginx
http {
    include /etc/nginx/mime.types;
    include /etc/nginx/conf.d/*.conf;
}
```

#### location 匹配规则

- `/`: 通用匹配，任何请求都会匹配到。

- `=`: 精确匹配，只有完全匹配时才会生效。

- `^~`: 匹配 URL 前缀，如果匹配成功，则不再匹配其他规则。

- `~`: 区分大小写的正则匹配。

- `~*`: 不区分大小写的正则匹配。

**案例**

```nginx
# 匹配 /app 开头的请求
location = /app {
    ...
}

# 静态资源直接处理
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
    expires 30d;
    add_header Cache-Control "public, no-transform";
    try_files $uri =404;
}

# 启动 nginx_status
location = /nginx_status {
    stub_status on;
    access_log off;
    allow 127.0.0.1;    # 允许的 IP
    deny all;           # 拒绝其他 IP
}
```

#### rewrite 指令

`rewrite` 指令用于重写 URL，可以将请求重定向到其他 URL，或者修改请求参数等。

```nginx
location / {
    rewrite ^/user/(.*)$ /profile/$1 last;
}
```

- `^/user/(.*)$`: 匹配的正则表达式

- `/profile/$1`: 重定向的 URL

- `last`: 重定向后是否继续匹配其他规则

#### MIME 类型

MIME 表示 Multipurpose Internet Mail Extensions，是一种互联网标准，用来表示文档的性质和格式。

在 Nginx 中，我们可以通过`types`指令来配置 MIME 类型，比如下面的配置：

```nginx
http {
    types {
        text/html html htm shtml;
        text/css css;
        text/xml xml;
        image/gif gif;
        image/jpeg jpeg jpg;
        application/javascript js;
        application/json json;
        application/xml xml;
    }
}
```

它的作用是告诉 Nginx，当返回的文件是`html`、`htm`、`shtml`时，它的 MIME 类型是`text/html`。

#### 重定向

可以使用`return`指令来进行重定向，比如下面的配置：

```nginx
server {
    listen 80;
    server_name www.example.com;
    return 301 https://$server_name$request_uri;
}
```

#### 密码保护

可以使用`auth_basic`指令来设置密码保护，比如下面的配置：

```nginx
server {
    listen 80;
    server_name www.example.com;
    location / {
        auth_basic "Restricted";
        auth_basic_user_file /etc/nginx/.htpasswd;
    }
}
```

- `auth_basic`: 设置提示信息

- `auth_basic_user_file`: 设置密码文件的路径（可以使用`htpasswd`命令生成）

#### 流量限制

可以使用`limit_conn`和`limit_rate`来限制连接数和速率。

```nginx
limit_conn perserver 50;
limit_conn perip 3;
limit_rate 2048k;
```

- `limit_conn perserver 50`: 并发限制，限制当前站点最大并发数

- `limit_conn perip 3`: 单 IP 限制，限制单个 IP 访问最大并发数

- `limit_rate 2048k`: 流量限制，限制每个请求的流量上限（单位是 KB）

#### 防盗链

可以使用`valid_referers`和`invalid_referer`来设置防盗链。

```nginx
location ~ .*\.(jpg|jpeg|gif|png|js|css)$
{
    expires      30d;
    access_log /dev/null;
    valid_referers none blocked gobiji.com *.shejibijil.com;
    if ($invalid_referer){
        return 404;
    }
}
```

- `expires 30d`: 设置缓存时间

- `valid_referers none blocked shejibijil.com;`: 设置允许的 referer

  `none blocked` none 表示没有 referer，blocked 表示 referer 为空，在一起表示允许空 referer 请求。

  `shejibijil.com;` 表示允许的 referer

- `if ($invalid_referer)`: 如果 referer 不在允许的列表中，则返回 404

#### 反向代理

默认是轮询的方式来代理的。

下面是反向代理最简单的一个例子：

```nginx
# /app 页面将被轮询转发到三台服务器上
upstream backend {
    server 127.0.0.1:8000;
    server 127.0.0.1:8001;
    server 127.0.0.1:8002;
}
server {
    ...
    location /app {
        proxy_pass http://backend;
    }
    ...
}
```

#### 负载均衡

可以在服务器后面设置`weight`来配置权重。

```nginx
# 8000端口的这台可以接收更多请求（另外两个的3倍）
upstream backend {
    server 127.0.0.1:8000 weight=3;
    server 127.0.0.1:8001;
    server 127.0.0.1:8002;
}
```

可以设置`ip_hash`，让同一个客户端的请求被分配到同一台服务器上。

```nginx
upstream backend {
    ip_hash;
    server 127.0.0.1:8000 weight=3;
    ...
}
```

### 日志配置

#### 自定义日志格式

我们可以自定义日志的格式，比如下面的配置：

```nginx
http {
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log /var/log/nginx/access.log main;
    error_log /var/log/nginx/error.log;
}
```

- `$remote_addr`: 客户端 IP 地址

- `$remote_user`: 客户端用户名（如果通过 HTTP 认证登录）

- `$time_local`: 访问的本地时间和日期

- `$request`: 请求的完整请求行（包括方法、路径、协议）

- `$status`: 响应的状态码

- `$body_bytes_sent`: 发送给客户端的字节 byte（不包括 HTTP 头部）

- `$http_referer`: 请求的来源 URL（referer）

- `$http_user_agent`: 客户端的 User-Agent

- `$http_x_forwarded_for`: 客户端的真实 IP 地址（如果使用了代理）

- `access_log`: 访问日志的路径和格式，可以全局配置，也可以在 server 或 location 中配置

- `error_log`: 错误日志的路径和日志级别，支持的日志级别包括 `debug`、`info`、`notice`、`warn`、`error` 和 `crit`。

如果不想写访问日志，可以把 access_log 的值设为 `/dev/null`。

```nginx
access_log /dev/null;
```

#### 常用的日志变量

Nginx 提供了许多日志变量，可以根据需要选择并组合它们来创建自定义格式：

- `$bytes_sent`：发送给客户端的总字节数

- `$connection`：连接的唯一标识符

- `$connection_requests`：连接处理的请求数

- `$msec`：日志写入的时间戳（秒，精确到毫秒）

- `$request_length`：请求的总字节数（包括请求行、头部和正文）

- `$upstream_addr`：上游服务器的地址

- `$upstream_response_time`：上游服务器的响应时间

- `$request_uri`：请求的 URI，不带查询字符串

- `$args`：请求的查询字符串

- `$http_<header>`：请求头信息，例如 `$http_host`、`$http_user_agent` 等

#### 日志级别说明（error_log）

设置错误日志的级别可以控制记录的日志详尽程度：

- debug：记录所有日志，包含调试信息
- info：记录普通信息日志
- notice：记录需注意的事件
- warn：记录警告信息
- error：记录错误信息
- crit：记录严重错误

##### 切割日志

Nginx 日志文件通常会随着时间的推移而增大，为了避免日志文件过大，我们可以定期切割日志。

Nginx 本身并不提供日志切割功能，但是可以通过 logrotate 工具来实现日志切割。

配置文件在`/etc/logrotate.d/nginx`，logrotate 相关的内容可以在 linux 文档中查看。

这里提供一个标准的配置文件：

```bash
/var/log/nginx/*.log {
    daily
    missingok
    rotate 10
    compress
    delaycompress
    notifempty
    create 0640 nginx nginx
    sharedscripts
    postrotate
        [ ! -f /var/run/nginx.pid ] || kill -USR1 `cat /var/run/nginx.pid`
    endscript
}
```

- `daily`：每天切割一次日志

- `missingok`：如果日志文件不存在，不报错

- `rotate 10`：保留 10 个旧日志文件

- `compress`：压缩旧日志文件

- `delaycompress`：延迟压缩，下次切割时再压缩

- `notifempty`：如果日志文件为空，不切割

- `create 0640 nginx nginx`：创建新的日志文件，设置权限

- `sharedscripts`：多个日志文件共享一个脚本

- `postrotate`：切割日志后执行的脚本

- `kill -USR1 `cat /var/run/nginx.pid``：发送 USR1 信号给 Nginx，重新打开日志文件

#### 更多配置

具体有关日志的配置，可以参考[官方文档](http://nginx.org/en/docs/http/ngx_http_log_module.html)。

### 安全配置

#### SSL 配置

> http://nginx.org/en/docs/http/configuring_https_servers.html

在监听的端口后面加上`ssl`，并且指定证书的位置即可：

```nginx
server {
    listen              443 ssl;
    server_name         www.example.com;
    ssl_certificate     www.example.com.crt;
    ssl_certificate_key www.example.com.key;
    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;
    ...
}
```

通常，我们还会配置重定向，来让 HTTP 的请求自动跳转到 HTTPS。

```nginx
server {
    listen       80;
    server_name  www.example.com;
    return       301 https://$server_name$request_uri;
}
```

## 模块

### http

#### ngx_http_stub_status_module

`ngx_http_stub_status_module` 模块提供了一个简单的状态页面，可以查看 Nginx 的运行状态。

这不是一个默认安装的模块，需要在编译时添加`--with-http_stub_status_module`参数。

```nginx
server {
    listen 80;
    server_name localhost;
    location /nginx_status {
        stub_status on;
        access_log off;
        allow
        deny all;
    }
}
```

这将会在`http://localhost/nginx_status`上显示 Nginx 的状态信息。

```bash
Active connections: 291
server accepts handled requests
 16630948 16630948 31070465
Reading: 6 Writing: 179 Waiting: 106
```

- `Active connections`: 当前活跃连接数

- `server accepts handled requests`: 总共处理的连接数(下面的三个数字分别是总接收、总处理、总请求)

- `Reading`: 读取请求的连接数

- `Writing`: 响应请求的连接数

- `Waiting`: 等待连接的连接数

## 进阶

### 知识点

记录一些 Nginx 的进阶知识点。

#### Master 和 Worker

在 Nginx 中，Master 和 Worker 是两个关键的概念，它们在 Nginx 的架构中扮演着不同的角色。

1. **Master 进程**：
   - Master 进程是 Nginx 的主进程，负责管理 Worker 进程的启动、停止和重载配置等操作。
   - 当你启动 Nginx 服务时，实际上是启动了 Master 进程，Master 进程会负责创建 Worker 进程并分配任务。
   - Master 进程会监控 Worker 进程的状态，如果 Worker 进程异常退出，Master 进程会重新启动它。
2. **Worker 进程**：
   - Worker 进程是 Nginx 实际处理客户端请求的进程。
   - 每个 Worker 进程都会独立地处理连接、接收请求、处理请求和发送响应等工作。
   - 大多数情况下，Nginx 会启动多个 Worker 进程，这样可以同时处理多个请求，提高并发处理能力。
   - Worker 进程是并发处理的核心，它们负责接收来自客户端的连接，处理请求并返回响应。

Master 进程和 Worker 进程之间通过进程间通信（IPC）来协调工作，Master 进程的存在使得 Nginx 能够更好地管理 Worker 进程，并保证服务的稳定性和可靠性。

#### server block 匹配规则

在定义了多个服务器块配置后，如果没找到匹配的`Host`，会默认使用哪一个配置呢？

可以先了解匹配规则，主要有以下几步：

1->监听端口，找对应的 server block

2->查找`server_name`，检查`Host`头部字段，根据目标域名匹配每个 server block，匹配成功则用该块。

3->都不匹配，使用第一个没有指定 server_name 的 server block 来处理请求。

4->确定块后，使用该 server block 处理请求（重定向、代理、负载均衡等），生成相应返回客户端。

如果没有匹配到对应的块，也没有找到没有指定 server_name 的 server block，则直接使用第一个 server block。

如果我们想要自定义默认 server block，则可以创建一个默认的配置，并且不指定 server_name，类似这样：

```nginx
# 0.default.conf
server {
    listen 80 default_server;
    server_name _;

    # 默认服务器的配置，无法匹配到域名时将匹配到这里
    # 显示404文字
    return 200 "404";
    add_header Content-Type text/plain;
}
```

也可以参考宝塔的默认配置：

```nginx
# 0.default.conf
server{
    listen 80;
    server_name _;
    index index.html;
    root /www/wwwroot/html;
}
```

#### if 指令中的 try_files 使用

`try_files` 指令不能直接在 `if` 指令内使用。Nginx 的 `if` 指令有很多限制，其中之一就是不能在 `if` 块中包含诸如 `try_files` 这样复杂的指令。

为了解决这个问题，我们可以通过 `map` 指令来实现类似的功能。

```nginx
map $arg_password $valid_password {
    default 0;
    "your_secret_password" 1;
}

server {
    location / {
        if ($valid_password = 0) {
            return 403;
        }
        try_files $uri $uri/ /index.html;
    }
}
```

- `map` 指令用于创建一个变量映射表，将请求参数`password`的值映射为`valid_password`变量的值。

- `if` 指令检查`valid_password`变量的值，如果不等于`1`，则返回`403 Forbidden`。

- `arg_password`是请求参数`password`的值，`valid_password`是映射后的变量值。

  通过 `arg_xxx` 可以获取请求参数的值，这里的 `xxx` 是参数名。

### 调优

#### 调优目标

Nginx 的调优主要是为了提高性能，减少资源占用，提高并发处理能力。

调优的目标主要有：

- 提高并发处理能力：提高 Nginx 的并发连接数，减少请求的响应时间。

- 减少资源占用：减少 Nginx 的内存占用，提高服务器的性能。

- 提高稳定性：提高 Nginx 的稳定性，减少服务的异常退出。

#### 调优策略

Nginx 的调优主要包括以下几个方面：

- 调整 Nginx 的配置：优化 Nginx 的配置文件，提高 Nginx 的性能。

- 调整系统内核参数：调整系统内核参数，提高系统的性能。

- 使用高性能的网络模型：选择高性能的网络模型，提高 Nginx 的并发处理能力。

- 使用高性能的存储设备：使用高性能的存储设备，提高 Nginx 的读写性能。

- 使用高性能的硬件设备：使用高性能的硬件设备，提高 Nginx 的处理能力。

#### 调整 Nginx 配置

- 调整 worker_processes 和 worker_connections

  `worker_processes` 是 Nginx 的工作进程数，一般设置为 CPU 核心数的 2 倍。

  `worker_connections` 是每个 worker 进程可以同时接受的连接数，一般设置为 1024 或 2048。

- 调整 keepalive_timeout

  `keepalive_timeout` 是客户端连接的超时时间，一般设置为 60 秒。

- 调整 sendfile

  `sendfile` 是 Nginx 的文件传输模块，可以提高文件传输的性能。

  `sendfile on` 表示开启 sendfile，`sendfile off` 表示关闭 sendfile。

- 调整 tcp_nodelay 和 tcp_nopush

  `tcp_nodelay` 表示开启 TCP_NODELAY，可以提高网络传输的实时性。

  `tcp_nopush` 表示开启 TCP_NOPUSH，可以提高网络传输的效率。

- 调整 gzip 压缩

  `gzip on` 表示开启 gzip 压缩，可以减少网络传输的数据量。

  `gzip_comp_level` 表示压缩级别，一般设置为 6。

  `gzip_types` 表示压缩类型，一般设置为 text/html、text/css、text/javascript 等。

- 调整日志级别

  `error_log` 的级别可以设置为 `error`、`warn`、`info` 等。

  `access_log` 的级别可以设置为 `main`、`combined` 等。

- 调整缓存配置

  可以使用`proxy_cache`、`fastcgi_cache`、`uwsgi_cache`等指令来配置缓存。

  `proxy_cache_path` 表示缓存路径，`proxy_cache_key` 表示缓存键。

- 调整连接超时

  `client_body_timeout` 表示客户端请求体的超时时间。

  `client_header_timeout` 表示客户端请求头的超时时间。

  `keepalive_timeout` 表示客户端连接的超时时间。

- 调整缓冲区大小

  `client_body_buffer_size` 表示客户端请求体的缓冲区大小。

  `client_header_buffer_size` 表示客户端请求头的缓冲区大小。

  `large_client_header_buffers` 表示客户端请求头的缓冲区大小。

- 调整 SSL 配置

  `ssl_protocols` 表示 SSL 协议的版本，一般设置为 TLSv1.2。

  `ssl_ciphers` 表示 SSL 加密算法，一般设置为 HIGH:!aNULL:!MD5。

  `ssl_prefer_server_ciphers` 表示优先使用服务器端的加密算法。

#### 调整系统内核参数

- 调整文件描述符

  `ulimit -n` 表示文件描述符的数量，可以通过修改`/etc/security/limits.conf`来调整。

- 调整 TCP 参数

  `net.ipv4.tcp_syncookies` 表示开启 SYN Cookies，可以防止 SYN 攻击。

  `net.ipv4.tcp_tw_reuse` 表示开启 TIME-WAIT 重用，可以减少 TIME-WAIT 连接。

  `net.ipv4.tcp_tw_recycle` 表示开启 TIME-WAIT 回收，可以减少 TIME-WAIT 连接。

- 调整内存参数

  `vm.overcommit_memory` 表示内存过量分配，可以减少内存分配失败。

  `vm.swappiness` 表示内存交换分区，可以减少内存交换。

  `vm.dirty_ratio` 表示脏页比例，可以减少脏页写入。

- 调整网络参数

  `net.core.somaxconn` 表示最大连接数，可以提高网络连接数。

  `net.core.netdev_max_backlog` 表示网络接收队列，可以提高网络接收队列。

  `net.ipv4.tcp_max_syn_backlog` 表示 SYN 队列，可以提高 SYN 队列。

- 调整调度算法

  `kernel.sched_migration_cost_ns` 表示迁移成本，可以减少 CPU 迁移。

  `kernel.sched_autogroup_enabled` 表示自动分组，可以减少 CPU 调度。

  `kernel.sched_min_granularity_ns` 表示最小粒度，可以减少 CPU 调度。

#### 使用高性能的网络模型

- 使用 epoll 模型

  `use epoll` 表示使用 epoll 模型，可以提高网络处理能力。

- 使用 kqueue 模型

  `use kqueue` 表示使用 kqueue 模型，可以提高网络处理能力。

- 使用 poll 模型

  `use poll` 表示使用 poll 模型，可以提高网络处理能力。

- 使用 select 模型

  `use select` 表示使用 select 模型，可以提高网络处理能力。
