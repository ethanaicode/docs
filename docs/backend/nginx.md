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

​	通过`ps =ef | grep nginx`来查看nginx进程

​	通过`lsof -i:80`来确认端口占用情况

`nginx -s [SIGNAL]`: 控制

​	`quit` 优雅停止

​	`stop` 立即停止

​	`reload` 重载配置文件

​	`reopen` 重新打开日志文件

`nginx -V`: 查看信息（可以看到安装配置等目录）

`nginx -t`: 检查配置信息（有错误会有提示）

## 配置

### nginx.conf

主要分为三大块，全局块，events块，以及http块。

events块主要是服务器和客户端之间的网络连接的一些配置，比如指定每个worker进程可以同时接收多少个网络连接（worker_connections）。

http块是修改比较多的部分。

`worker_processes`： nginx 进程数，可以和 CPU 核心数保持一致，或者使用 `auto`值。

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

通常，我们还会配置重定向，来让HTTP的请求自动跳转到HTTPS。

```nginx
server {
    listen       80;
    server_name  www.example.com;
    return       301 https://$server_name$request_uri;
}
```

