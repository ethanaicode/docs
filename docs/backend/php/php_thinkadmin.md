# ThinkAdmin 框架使用指南

> 官方首页：[https://thinkadmin.top/](https://thinkadmin.top/)

**ThinkAdmin** 是一个基于 **ThinkPHP 6 & 8** 开发的强大后台管理框架，专为简化后台管理流程而设计。后台用户界面基于 LayUI 和 RequireJS 构建。

## 安装使用

安装框架前，请确保您的服务器已经安装了 **PHP 8.1+**(虽然官方说还支持 PHP7，但由于 composer 的安全机制，已经不支持了) 和 **Composer**。

### 通过 Composer 安装

推荐方式，默认只安装 **admin** 模块

**注意**: 默认使用 Sqlite 数据库，若使用其他数据库请<u>修改配置后再执行初始化数据库</u>操作。

```bash
### 创建项目（ 需要在英文目录下面执行 ）
composer create-project zoujingli/thinkadmin

### 进入项目根目录
cd thinkadmin

### 数据库初始化并安装
php think migrate:run
```

### 新版本 PHP 兼容性解决

实测使用 PHP8.5 安装该框架后，会出现兼容性报错：

- `Case statements followed by a semicolon (;) are deprecated, use a colon (:) instead`

   修改文件 `vendor/zoujingli/think-library/src/Plugin.php`，包含 `case 'getapppackage';` 的行，`;` 改为 `:`

- `Function imagedestroy() is deprecated since 8.5, as it has no effect since PHP 8.0`

   修改文件 `vendor/zoujingli/think-library/src/extend/ImageVerify.php` 和 `vendor/zoujingli/think-library/src/service/CaptchaService.php` 

   去掉 `imagedestroy($img)` 代码行

## 经验和技巧

- 创建新的菜单后，需要创建对应的控制器和视图文件