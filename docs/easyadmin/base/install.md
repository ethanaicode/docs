## 环境要求

- PHP >= 7.1.0
- Mysql >= 5.7.0 (需支持 innodb 引擎)
- Apache 或 Nginx

## 安装教程

> EasyAdmin 使用 Composer 来管理项目依赖。因此，在使用 EasyAdmin 之前，请确保你的机器已经安装了 Composer。

### 通过 Composer 创建项目(推荐)

```bash
composer create-project --prefer-dist zhongshaofa/easyadmin easyadmin
```

### 通过 git 下载安装包，composer 安装依赖包

```bash
第一步，下载安装包

git clone https://github.com/zhongshaofa/easyadmin
或者
git clone https://gitee.com/zhongshaofa/easyadmin


第二步，安装依赖包
composer install
```

## 配置

### 公共目录

安装完 easyadmin 之后，你必须将 web 服务器根目录指向 public 目录。该目录下的 index.php 文件将作为所有进入应用程序的 HTTP 请求的前端控制器。

### 目录权限

安装完 easyadmin 后，你可能需要给这两个文件配置读写权限：config 目录和 runtime 目录应该允许 Web 服务器写入，否则 easyadmin 程序将无法运行。

### 安装提示

- 运行网站地址, 会自动进入安装界面, 请根据提示进行设置, 然后点击安装。
- 安装完成后会自动生成安装锁`config/install/lock/install.lock`, 如需重新安装, 删掉该文件即可。

## 伪静态配置

通过伪静态配置, 将 URL 重写隐藏应用的入口文件`index.php`, 不配置的话, 会存在访问路径不正确的问题。

### Apache

把下面的内容保存为`.htaccess`文件放到应用入口`public`文件的同级目录下

```bash
<IfModule mod_rewrite.c>
Options +FollowSymlinks -Multiviews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.*)$ index.php?/$1 [QSA,PT,L]
</IfModule>
```

### Nginx

在 Nginx 低版本中，是不支持 PATHINFO 的，但是可以通过在`Nginx.conf`中配置转发规则实现

```bash
location / {
   if (!-e $request_filename) {
   		rewrite  ^(.*)$  /index.php?s=/$1  last;
    }
}
```
