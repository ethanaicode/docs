# WordPress 新手开发教程指南

> 2025-09-17 由于最近接触开发一款 WordPress 插件，所以重新学习一下 WordPress 开发，记录一下学习过程。

## 开始使用

- [WordPress 官方下载](https://wordpress.org/download/releases/)：WordPress 官方下载地址，下载最新版本

- [WordPress 在线指南](https://codex.wordpress.org/Main_Page)：WordPress 在线指南，包括 WordPress 的安装、使用、开发等

- [WordPress 主题开发](https://developer.wordpress.org/themes/)：WordPress 主题开发文档，包括主题的结构、主题文件、主题模板等

## 插件

### 插件相关链接

- [WordPress 插件市场](https://wordpress.org/plugins/)：可以在这里搜索并下载最新的 WordPress 插件包

- [WordPress 插件开发](https://developer.wordpress.org/plugins/)：WordPress 官方插件开发文档

## 服务器配置

### 动态设置站点 URL（支持多域名访问）

在 `wp-config.php` 文件中添加以下代码，可以根据请求的主机名动态设置站点 URL：

```php
$protocol = isset( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
if ( isset( $_SERVER['HTTP_HOST'] ) ) {
    define( 'WP_HOME',    $protocol . '://' . $_SERVER['HTTP_HOST'] );
    define( 'WP_SITEURL', $protocol . '://' . $_SERVER['HTTP_HOST'] );
}
```

### 添加动态 robots.txt

在 WordPress 中，可以通过添加代码到主题的 `functions.php` 文件中来动态生成 `robots.txt` 文件。以下是一个示例代码：

```php
function custom_robots_txt( $output, $public ) {
    if ( ! $public ) {
        return "User-agent: *\nDisallow: /\n";
    }
    return $output;
}
add_filter( 'robots_txt', 'custom_robots_txt', 10, 2 );
```

通过动态生成 `robots.txt` 文件，就可以根据站点的不同需求来控制搜索引擎的抓取行为。

## 调试

### 开启调试模式

在 `wp-config.php` 文件中开启调试模式：

```php
# 打开调试模式
define( 'WP_DEBUG', true );
# 开启调试日志记录，默认是记录到文件 wp-content/debug.log 中，可以在这里配置日志记录位置
define( 'WP_DEBUG_LOG', true );
# 在页面上显示调试信息，生产环境建议关闭
define( 'WP_DEBUG_DISPLAY', false );
```

### 全局日志 mu-plugin

`mu-plugin` 能在更早阶段记录当前主题信息。创建目录（如果不存在）`wp-content/mu-plugins/`，并在该目录下创建一个 PHP 文件，例如 `log-theme.php`，内容如下：

```php
<?php
/**
 * 临时 mu-plugin：记录当前主题信息，帮助排查子主题未被加载的问题
 * 放入 wp-content/mu-plugins/ 后无需激活，会自动加载（必须有该目录）
 */
if ( ! defined( 'WPINC' ) ) {
    // 安全检查：确保在 WP 环境中运行
    return;
}

add_action( 'init', function() {
    $stylesheet = function_exists( 'get_stylesheet' ) ? get_stylesheet() : '(no get_stylesheet)';
    $template   = function_exists( 'get_template' ) ? get_template() : '(no get_template)';
    $theme_root = get_theme_root();
    error_log( "mu-plugin: get_stylesheet={$stylesheet}, get_template={$template}, theme_root={$theme_root}" );
} );
```


