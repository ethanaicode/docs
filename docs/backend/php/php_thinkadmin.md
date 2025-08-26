# ThinkAdmin 框架使用指南

> 官方首页：[https://thinkadmin.top/](https://thinkadmin.top/)

**ThinkAdmin** 是一个基于 **ThinkPHP 6 & 8** 开发的强大后台管理框架，专为简化后台管理流程而设计。后台用户界面基于 LayUI 和 RequireJS 构建。

## 安装使用

安装框架前，请确保您的服务器已经安装了 **PHP 7.2+** 和 **Composer**。

**通过 Composer 安装：** ( 推荐方式，默认只安装 **admin** 模块 )

**注意**: 默认使用 Sqlite 数据库，若使用其他数据库请<u>修改配置后再执行初始化数据库</u>操作。

```bash
### 创建项目（ 需要在英文目录下面执行 ）
composer create-project zoujingli/thinkadmin

### 进入项目根目录
cd thinkadmin

### 数据库初始化并安装
php think migrate:run
```
