---
title: 最常用的Python第三方库包大全，以及它们的简单介绍和使用方法
---

# Packages for Python

## Python 包列表

### 常用工具

- **Requests**: Python 的 HTTP 请求库 [--> 站内链接](./python_requests)

- **psutil**: 用于获取系统信息的 Python 库（process and system utilities）

  用于在 Python 中获取进程和系统利用（如监控硬件和网络统计）的信息

- **Faker**: 生成 Mock 数据的 Python 库

- **setuptools**: 用于打包 Python 库的工具

  `setuptools` 主要用于创建和管理 Python 包，使得发布和安装 Python 代码变得更容易

- **Blinker**: Python 的事件通知库

  它允许不同的组件之间进行松散耦合的通信，通过信号来触发和响应事件 blinker 是在处理事件驱动编程时非常有用的工具，特别适用于构建插件系统、框架和其他需要组件之间通信的应用

- **dotenv**: 用于从 `.env` 文件中加载环境变量的 Python 库

  pip 安装命令: `pip install python-dotenv`

- **cryptography**: 用于加密和解密的 Python 库

  `cryptography` 是一个用于加密和解密的 Python 库，它提供了一组现代密码学工具，包括对称加密、非对称加密、数字签名、密钥交换等功能

- **paramiko**: 用于 SSH 和 SFTP 的 Python 库

  `paramiko` 是一个用于 SSH 和 SFTP 的 Python 库，它提供了一组用于远程登录和文件传输的工具，可以用于编写 SSH 客户端和服务器程序

- **qrcode**: 用于生成二维码的 Python 库

  项目地址: [qrcode](https://pypi.org/project/qrcode/)

### 数据处理

- **openpyxl (openpyxl.worksheet)**: 用于读写 Excel 文件的 Python 库

- **yaml**: 用于读写 YAML 文件的 Python 库

  pip 安装命令: `pip install PyYAML`

- **lxml**: 用于解析 XML 和 HTML 的 Python 库

  支持用 XPATH 来查找元素（可以考虑代替 bs4）

### 采集和爬虫

- **Selenium**: Python 的 Web 自动化测试库 [--> 站内链接](./python_selenium)

- **Selenium-Wire**: Selenium 的扩展，用于拦截和修改 HTTP 请求和响应

   安装时遇到问题及解决方法：

   - `No module named pkg_resources`: `pip install setuptools`

   - `No module named 'blinker._saferef'`: `pip install blinker==1.7.0`

- **BeautifulSoup**: 用于解析 HTML 和 XML 的 Python 库 [--> 站内链接](./python_beautifulsoup)

### 图像视频处理

- **Pillow**: Python 的图像处理库

- **OpenCV**: 用于计算机视觉的 Python 库，可以用来处理视频和图像

  pip 安装命令: `pip install opencv-python`

- **moviepy**: 用于处理视频的 Python 库，提供了视频剪辑、合并、转换等功能 [--> 站内链接](./python_moviepy)

### 数据处理

- **numpy**: 用于数值计算的 Python 库，可以高效处理数组，许多图像处理和机器学习库都依赖于它 [--> 站内链接](./python_numpy)

- **Pandas**: 用于数据处理和分析的 Python 库

  1. 高效的 DataFrame 对象，用于数据处理，以及强大的数据聚合和转换等功能

  2. 读取和写入多种文件格式的数据，包括 CSV、Excel、SQL 数据库等

  3. 提供多种方式来对数据进行筛选、排序、分组、合并等操作

  4. 与 Matplotlib、Seaborn 等数据可视化库结合使用，方便生成图表和报表

### 数据可视化

- **matplotlib**: 用于绘制图表和图形的 Python 库

- **seaborn**: 基于 Matplotlib 的数据可视化库，提供了更高级的绘图接口和美观的默认样式

### 桌面开发

- **Pygame**: 用于编写 2D 游戏的 Python 库

- **pywin32**: Python 的 Windows 扩展

  `pywin32` 是一个 Python 扩展，它提供了访问 Windows API 的功能

- **PyQT5**: Python 的 GUI 开发库 [--> 站内链接](./python_pyqt5)

- **PySide2**: Python 的 GUI 开发库

- **shiboken2**: 与 PySide2 一起使用的工具，可以将 C++ 代码转换为 Python 代码

- **PyInstaller**: 用于将 Python 脚本打包成可执行文件的工具 [--> 站内链接](./python_pyinstaller)

### Web 开发

- **Flask**: 用于构建 Web 应用的 Python 微框架 [--> 站内链接](./python_flask)

  1. 轻量级的 Web 框架，适用于快速开发小型 Web 应用

  2. 提供了路由、模板引擎、请求和响应处理等功能

  3. 适用于构建 RESTful API、网站、博客等 Web 应用

- **Django**: 用于构建 Web 应用的 Python Web 框架

  1. 全功能的 Web 框架，适用于构建大型 Web 应用

  2. 提供了 ORM、模板引擎、表单处理、用户认证等功能

  3. 适用于构建企业级 Web 应用、电子商务网站等

### 其它工具

- **kksn 序列号生成器**: 一款软件序列号生成器，它将用于在 windows 系统下打包 exe 时进行序列号管理、判断的一款工具。

  项目地址: [kksn 序列号生成器](https://pypi.org/project/kksn/)
