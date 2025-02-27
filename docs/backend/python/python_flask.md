---
title: Python web 开发框架 Flask 新手指南
---

# Flask

> 官方文档：[Flask](https://flask.palletsprojects.com/)

Flask 是一个轻量级的 Web 框架，适用于快速开发小型 Web 应用。它提供了路由、模板引擎、请求和响应处理等功能，适用于构建 RESTful API、网站、博客等 Web 应用。

## 开始

### 最小化 Flask 应用

一个最小化的 Flask 应用，比如 `app.py` 文件：

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run()
```

运行 Flask 应用：

```bash
python app.py
```

这将会在本地启动一个 Web 开发服务器，通过 `http://127.0.0.1:5000/` 访问该地址，你将会看到 `Hello, World!` 字样。

此时，只有自己的电脑可以访问这个地址，如果想让其他人访问，可以通过 `host="0.0.0.0"` 参数来指定监听所有的 IP 地址，这样其他人就可以通过你的 IP 地址访问了。

```python
app.run(host="0.0.0.0", port=5000, debug=True
```

- `debug=True` 参数启用调试模式，这样当代码发生变化时，Flask 会自动重启应用

  注意：在生产环境中，不要使用调试模式，因为它会暴露应用的内部信息，导致安全风险。

### 路由

使用 `@app.route(rule, **options)` 装饰器来定义路由，比如：

```python
@app.route('/')
def index():
    return 'Index Page'

@app.route('/hello')
def hello():
    return 'Hello, World'
```

支持变量规则，比如：

```python
@app.route('/user/<username>')
def show_user_profile(username):
    return f'User {username}'
```

还可以使用转换器来定义参数的数据类型，比如：

```python
@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f'Post {post_id}'
```

类型转换器有以下几种：

- `string`：接受任何不包含斜杠的文本

- `int`：接受正整数

- `float`：接受正浮点数

- `path`：类似 `string`，但可以包含斜杠

- `uuid`：接受 UUID 字符串

我们也可以**指定请求方法**，主要有两种方式：

1. 使用 `methods` 参数：

   ```python
   @app.route('/login', methods=['GET', 'POST'])
   def login():
       if request.method == 'POST':
           return do_the_login()
       else:
           return show_the_login_form()
   ```

2. 使用不同的装饰器：

   ```python
   @app.get('/login')
   def login_get():
       return show_the_login_form()
   
   @app.post('/login')
   def login_post():
       return do_the_login()
   ```

### URL 构建

使用 `url_for()` 函数时，Flask 会自动处理 URL 的构建，这样当 URL 规则发生变化时，不需要手动修改 URL。

_其实就是在编码中，不直接绑定 URL 而是函数名，来避免硬编码带来的维护问题_

我们可以使用视图函数的名称来生成 URL，比如：

```python
from flask import url_for

@app.route('/')
def index():
    return url_for('show_user_profile', username='admin')

@app.route('/user/<username>')
def show_user_profile(username):
    return f'User {username}'
```

**注意**：`url_for()` 函数的第一个参数是视图函数的名称，而不是 URL 规则。

### 静态文件

Flask 默认会在 `static` 目录下寻找静态文件，比如 CSS、JavaScript 和图片等。

```html
<link
  rel="stylesheet"
  type="text/css"
  href="{{ url_for('static', filename='style.css') }}"
/>
```

### 模板

Flask 使用 Jinja2 模板引擎来渲染模板，默认会在 `templates` 目录下寻找模板文件。

```python
from flask import render_template

@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)
```

Jinja2 模板引擎支持以下几种语法：

```bash
# {{ ... }}：用于输出变量或表达式
# {% ... %}：用于控制流程，比如循环、条件判断等
# {# ... #}：用于注释
```

完整文档：[Jinja2](https://jinja.palletsprojects.com/en/stable/templates/)

## 部署

### WSGI 服务器

**WSGI（Web Server Gateway Interface）** 是 Python Web 框架（如 Flask、Django）与 Web 服务器（如 Nginx、Apache）之间的**标准接口**。WSGI 使得 Web 服务器能够与 Python 应用通信。

简单来说：

- **WSGI 是协议/标准**，它定义了 Python Web 应用如何与 Web 服务器交互。

- **WSGI 服务器**（如 Gunicorn、Waitress、uWSGI）实现了 WSGI 协议，充当 Web 服务器和 Python 应用之间的桥梁。

#### WSGI 服务器的作用

传统 Web 服务器（如 Nginx、Apache）**不能直接运行 Python 代码**，只能处理 HTTP 请求。

**WSGI 服务器（如 Waitress、Gunicorn）充当中间层**，负责：

1. **接收 HTTP 请求**（来自 Nginx/Apache 或直接来自客户端）。

2. **调用 Python Web 应用**（Flask/Django 等）。

3. **返回 HTTP 响应**。

#### 常见 WSGI 服务器

| WSGI 服务器  | 适用场景      | 主要特点                   |
| ------------ | ------------- | -------------------------- |
| **Waitress** | Windows/Linux | 纯 Python 实现，易用、稳定 |
| **Gunicorn** | Linux/macOS   | 多进程支持，性能强大       |
| **uWSGI**    | 生产环境      | 高度可配置，支持异步       |

### Gunicorn

**Gunicorn（Green Unicorn）** 是一个**高性能**的 WSGI 服务器，适用于 Linux 和 macOS 系统。

通过简单的命令就可以启动 Gunicorn 服务器（在项目下的 `venv` 环境中运行）：

```bash
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

- `-w 4` → 使用 4 个 worker 进程（可调节）

- `-b 0.0.0.0:8000` → 绑定到 8000 端口

- `app:app` → `app.py` 文件中的 `app` Flask 实例

这样就可以完成简单的部署了。

当然，之后还需要配置 Nginx 反向代理，并使用 Systemd 让 Gunicorn 作为服务在后台运行。

**Systemd 服务文件**可以参考这个（暂未实验）：

```ini
# /etc/systemd/system/flaskapp.service
[Unit]
Description=Gunicorn instance to serve Flask app
After=network.target

[Service]
User=root
Group=www-data
WorkingDirectory=/var/www/flaskapp
Environment="PATH=/var/www/flaskapp/venv/bin"
ExecStart=/var/www/flaskapp/venv/bin/gunicorn -w 4 -b 0.0.0.0:8000 app:app

[Install]
WantedBy=multi-user.target
```

- `Environment` 变量让 `systemd` 知道应该在哪个环境中运行程序
- `ExecStart` 直接使用了 venv 里的 Gunicorn，因此它会自动使用该虚拟环境的 Python 解释器和库
