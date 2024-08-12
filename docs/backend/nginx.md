# Nginx

## 基础

为了解决高并发的问题而产生。

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

## 控制

`nginx`: 启动

通过`ps =ef | grep nginx`来查看 nginx 进程

通过`lsof -i:80`来确认端口占用情况

`nginx -s [SIGNAL]`: 控制

`quit` 优雅停止

`stop` 立即停止

`reload` 重载配置文件

`reopen` 重新打开日志文件

`nginx -V`: 查看信息（可以看到安装配置等目录）

`nginx -t`: 检查配置信息（有错误会有提示）

## 配置

### nginx.conf

主要分为三大块，全局块，events 块，以及 http 块。

- **全局块**: 主要是一些配置文件的路径、用户、工作进程数等。

  `worker_processes`: nginx 进程数，可以和 CPU 核心数保持一致，或者使用 `auto`值。

  `pid`: nginx 进程的 PID 文件路径。

- **events**: 主要是服务器和客户端之间的网络连接的一些配置，比如指定每个 worker 进程可以同时接收多少个网络连接（worker_connections）。

- **http**: 主要是 HTTP 协议相关的配置，比如设置 MIME 类型、日志格式、访问日志的路径等。这一块也是我们经常修改的地方

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

#### 日志配置

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

Nginx 日志在 Linux 系统中，通常由 logrotate 来进行日志切割，配置文件在`/etc/logrotate.d/nginx`。

具体有关日志的配置，可以参考[官方文档](http://nginx.org/en/docs/http/ngx_http_log_module.html)。

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

#### HTTPS

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

## 高级

### Nginx 的服务器块（server block）匹配规则

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

### if 指令中的 try_files 使用

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
