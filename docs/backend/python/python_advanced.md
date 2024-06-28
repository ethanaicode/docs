# Python - 高级篇

> 不同的 python 版本，运行的 python 命令可能不同，这里以 python3 为例。

## pip 和 virtualenv

### pip

`pip` 是 Python 的包管理工具，用于安装和管理 Python 包。

常用命令包括：

- `pip3 install package_name`：安装包

- `pip3 uninstall package_name`：卸载包

- `pip3 list`：列出已安装的包

- `pip3 show package_name`：显示包的详细信息

- `pip3 search package_name`：搜索包

- `pip3 freeze > requirements.txt`：将当前环境中已安装的包导出到 `requirements.txt` 文件

- `pip3 install -r requirements.txt`：从 `requirements.txt` 文件中安装包

**pip 修改配置文件**

你可以使用 `pip config` 命令修改配置文件，例如：

```bash
pip3 config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

这里将全局的 `index-url` 设置为清华大学的镜像源。

### virtualenv

`virtualenv` 是一个用于创建独立 Python 环境的工具。

在 Python 3.3 之后，`venv` 模块已经内置在 Python 中，可以使用 `python3 -m venv` 命令创建虚拟环境。

- 创建一个新的虚拟环境：

  ```bash
  python3 -m venv /path/to/new/virtual/environment
  ```

- 激活虚拟环境：

  ```bash
  source /path/to/new/virtual/environment/bin/activate
  ```

  激活后，命令行提示符会显示虚拟环境的名称。

- 退出虚拟环境：

  ```bash
  deactivate
  ```

## Module

### OS 模块

`os` 模块提供了一种使用操作系统功能的方法。

```python
import os

# 获取当前工作目录
print(os.getcwd())

# 列出目录下的文件
print(os.listdir())
```
