---
title: PHP基础知识大全，开发者必备的核心技能
---

# PHP 基础

## PHP 命令

### PHP CLI

- `php -m`: 查看已经安装的模块

- `php -v`: 查看版本

- `php -S localhost:8000`: 启动一个简单的服务器

- `php -a`: 进入交互模式

- `php -r "echo 'Hello World';"`: 执行一行代码

- `php -i`: 查看 php 配置

  `php -i | grep php.ini`: 查看 php.ini 文件路径

- `php --ini`: 查看 php.ini 文件路径

### PHP-FPM

- `php-fpm -t`: 检查配置文件是否正确

- `php-fpm -tt`: <u>检查配置文件是否正确</u>，并显示配置文件路径

- `php-fpm -i`: 查看 php-fpm 配置

## PHP 配置

早期 linux 系统中，通常会自带 PHP，它们的配置文件通常在以下位置：

- `/etc/php.ini`: 全局配置文件

- `/etc/php.d`: 扩展配置文件

- `/etc/php-fpm.d`: PHP-FPM 配置文件

  `/etc/php-fpm.d/www.conf`: PHP-FPM 网站配置文件

- `/etc/php-cli.ini`: CLI 配置文件

如果是自己编译安装的 PHP，那么配置文件会在安装目录下的 `etc` 目录中。

## 基础知识及问题

### PHP 单引号和双引号的区别与用法

php 里的单引号把内容当成纯文本，不会经过服务器翻译。

而双引号则与此相反。里面的内容会经过服务器处理(process)。

> 说人话就是双引号支持变量，单引号会将文本原样输出

### Heredoc 和 Nowdoc

Heredoc 和 Nowdoc 都是 PHP 中的字符串定义方式。

- **Heredoc**: <u>类似于双引号字符串，可以包含变量和转义字符</u>。

  ```php
  $name = "World";
  $str = <<<EOD
  Hello, $name!
  This is a Heredoc string.
  EOD;
  echo $str; // 输出: Hello, World! This is a Heredoc string.
  ```

- **Nowdoc**: 类似于单引号字符串，不会解析变量和转义字符。

  写法上和 Heredoc 类似，但使用单引号包裹标识符。

  ```php
  $name = "World";
  $str = <<<'EOD'
  Hello, $name!
  This is a Nowdoc string.
  EOD;
  echo $str; // 输出: Hello, $name! This is a Nowdoc string.
  ```

相较于单引号和双引号，Heredoc 和 Nowdoc 更适合处理多行字符串，更像 “复制粘贴模版” 的方式。

### require 和 include

他们大部分时候都是可以互换的。

但是`include`遇到问题会发出警告脚本继续运行，`require`则生成致命错误并停止运行程序。

### require_once 和 include_once

使用方法跟 require、include 一样，差别在于在引入文件前，会先检查文件是否已经在其他地方被引入过了，

若有，就不会再重复引入。

## PHP 常用方法

### 字符串相关

- `(string)$var`: 强制转换为字符串

- `strval($var)`: 获取变量的字符串值

- `strlen(string)`: 返回字符串长度

- `strpos(string, find, offset?)`: 查找字符串首次出现的位置

- `strrpos(string, find, offset?)`: 查找字符串最后一次出现的位置

- `strstr(string, find, before_search?)`: 查找字符串的首次出现的位置，并返回其后的所有字符

- `str_replace(find, replace, string, count?)`: 替换字符串中的一些字符

- `substr(string, start, length?)`: 返回字符串的一部分

- `trim(string, charlist?)`: 移除字符串两侧的空白字符或其他预定义字符

- `rtrim(string, charlist?)`: 移除字符串末端的空白字符或其他预定义字符

- `ltrim(string, charlist?)`: 移除字符串开头的空白字符或其他预定义字符

- `strtolower(string)`: 把字符串转换为小写

- `strtoupper(string)`: 把字符串转换为大写

- `ucfirst(string)`: 把字符串的首字母转换为大写

- `ucwords(string)`: 把字符串中每个单词的首字母转换为大写

- `strrev(string)`: 反转字符串

- `str_repeat(string, multiplier)`: 重复一个字符串

- `str_shuffle(string)`: 随机打乱字符串

- `str_split(string, length?)`: 把字符串分割到数组中

- `str_word_count(string, format?, charlist?)`: 计算字符串中的单词数

- `str_pad(string, length, pad_string, pad_type?)`: <u>使用另一个字符串填充字符串为指定长度</u>（格式化字符串版式非常有用）

  ![img](https://pic.shejibiji.com/i/2024/04/16/661e1ef9b63b3.png)

- `highlight_string(string, return?)`: 语法高亮

- `htmlentities(string, flags?, character-set?, double_encode?)`: 把字符转换为 HTML 实体

  展示代码时，可以用这个方法避免被 html 输出

- `htmlspecialchars(string, flags?, character-set?, double_encode?)`: 把一些预定义的字符转换为 HTML 实体

  `echo htmlspecialchars("&para");` 输出 `&para` 而不是符号 `¶`

- `html_entity_decode(string, flags?, character-set?)`: 把 HTML 实体转换为字符

  比如把 `&lt` 会被转换为 `<`，可以实现输出 html 标签

- `parse_str(string, array?)`: 把查询字符串解析到变量中

- `strtr(string, from, to)`: 转换字符串中特定字符

- `preg_match(pattern, subject, matches, flags?, offset?)`: 正则匹配，返回匹配次数

- `preg_replace(pattern, replacement, subject, limit?, count?)`: 正则替换

- `preg_split(pattern, subject, limit?, flags?)`: 通过一个正则表达式分隔字符串

- `preg_grep(pattern, input, flags?)`: 返回匹配模式的数组条目

- `preg_quote(string, delimiter?)`: 转义正则表达式字符

- `iconv(from_encoding, to_encoding, string)`: 字符串转码

  `iconv('UTF-8', 'windows-1252', $need_convert)` 可以解决部分文字出现奇怪符号

### 数组相关

- `implode(separator, array)`: 把数组元素组合为一个字符串

- `explode(separator, string, limit?)`: 把字符串打散为数组

- `array_values(array)`: 返回数组中所有的值（返回一个重新索引的数组）

  可以用来将关联数组转换为索引数组，或者快速重新索引数组（如果删除了某些元素，可以用这个方法重新索引）

- `array_keys(array)`: 返回数组中所有的键名

- `array_column(array, column_key?, index_key?)`: 返回输入数组中指定的一列

  可以用来降低数组维度，比如三维的转成二维的，如：`array_column($array,'name','id')`

- `array_unique(array, sort_flags?)`: 移除数组中重复的值

- `array_filter(array, callback?)`: <u>用回调函数过滤数组中的元素</u>

  只传 `array` 参数的话，会删除数组中的空值，如果传入 `callback` 参数，可以自定义过滤规则

- `array_map(callback, array, ...arrays?)`: 为数组的每个元素应用回调函数

  用于对数组中的每个元素应用回调函数，返回一个新数组，支持多个数组

- `in_array(needle, haystack, strict?)`: 检查数组中是否存在某个值

- `array_key_exists(key, array)`: 检查数组里是否有指定的键名或索引

- `array_flip(array)`: 交换数组中的键和值

- `array_reverse(array)`: 返回一个单元顺序相反的数组

- `array_push(array, value1, value2...)`: 向数组尾部插入一个或多个元素

- `array_pop(array)`: 删除数组中的最后一个元素

- `array_shift(array)`: 删除数组中的第一个元素，并返回被删除元素的值

- `array_unshift(array, value1, value2...)`: 向数组的开头插入一个或多个元素

- `unset(array[key])`: 删除数组中的某个元素（不会重置数组索引）

- `array_slice(array, offset, length?, preserve_keys?)`: 从数组中取出一段

- `array_splice(array, offset, length?, replacement?)`: 把数组中的一部分去掉并用其他值取代

  重置数组索引，如果不想重置索引，可以使用 `array_slice()`

- `array_rand(array, num?)`: 从数组中随机取出一个或多个元素

- `array_merge(array1, array2)`: 合并一个或多个数组

- `array_merge_recursive(array1, array2)`: 递归合并一个或多个数组

- `array_combine(keys, values)`: 创建一个数组，用一个数组的值作为其键名，另一个数组的值作为其值

- `array_diff(array1, array2)`: 计算数组的差集

- `array_intersect(array1, array2)`: 计算数组的交集

- `array_intersect_key(array1, array2)`: 使用键名比较计算数组的交集（array1 中的键名存在于 array2 中，保留 array1 中的键值对）

- `array_search(needle, haystack)`: 在数组中搜索给定的值，如果成功则返回首个相应的键名

- `array_walk(array, callback, data?)`: 对数组中的每个元素应用用户自定义函数

- `array_walk_recursive(array, callback, data?)`: 对数组中的每个元素应用用户自定义函数，如果元素是数组，递归处理

- `array_replace(array1, array2)`: 使用后面数组的值替换第一个数组的值

- `array_chunk(array, size, preserve_keys?)`: <u>把一个数组分割为新的数组块</u>，适合分页

- `count(array, mode?)`: 计算数组中的单元数目或对象中的属性个数

- `array_count_values(array)`: 统计数组中所有的值出现的次数

- `ksort(array, sort_flags?)`: 根据键名对数组进行排序

- `array_multisort(array1, array1_sort_order?, array1_sort_flags?, ...rest)`: 对多个数组或多维数组进行排序

### 数据处理

- `serialize(value)`: 生成一个可存储的值的表示（适合存取 PHP 变量，用于存入数据库或缓存）

- `unserialize(str)`: 从已存储的表示中创建 PHP 的值

- `json_encode(value, options?, depth?)`: 对变量进行 JSON 编码

  默认情况下，会对中文以及 url 等特殊字符进行转义，如果不需要转义，可以使用 `JSON_UNESCAPED_UNICODE` 参数

  多个参数可以用 `|` 连接，比如 `JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES`

  **可选项还包括:**

  `JSON_UNESCAPED_SLASHES` 避免斜杠转义

- `json_decode(json, assoc?, depth?, options?)`: 对 JSON 格式的字符串进行解码

  如果 `assoc` 为 `true`，返回的是数组，否则返回的是对象

- `base64_encode(string)`: 对字符串进行 base64 编码

- `base64_decode(string, strict?)`: 对 base64 编码的字符串进行解码

  如果 `strict` 为 `true`，则会检查字符串是否是有效的 base64 编码，如果不是，则返回 `false`

### URL 相关

- `parse_url(url, component?)`: 解析 URL，并返回其组成部分

  Component 参数：

  - `PHP_URL_SCHEME`: 协议

  - `PHP_URL_HOST`: 主机

  - `PHP_URL_PORT`: 端口

  - `PHP_URL_USER`: 用户名

  - `PHP_URL_PASS`: 密码

  - `PHP_URL_PATH`: <u>路径</u>

  - `PHP_URL_QUERY`: 查询字符串

  - `PHP_URL_FRAGMENT`: 锚点

  比如 `rtrim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/')` 可以获取当前页面的路径

- `http_build_query(array)`: 生成 URL-encode 之后的请求字符串，`array` 为要转换的数组，通常是键值对

- `urlencode(string)`: 对 URL 字符串进行编码

- `urldecode(string)`: 对 URL 字符串进行解码

- `rawurlencode(string)`: 对 URL 字符串进行编码

- `rawurldecode(string)`: 对 URL 字符串进行解码

### 数字相关

- `abs(number)`: 返回一个数的绝对值

- `rand(min, max)`: 生成一个随机数

- `max(value1, value2...)`: 返回最大值

- `min(value1, value2...)`: 返回最小值

- `round(number, precision?)`: 对浮点数进行四舍五入

- `ceil(number)`: 向上舍入为最接近的整数

- `floor(number)`: 向下舍入为最接近的整数

- `intval(value, base?)`: 获取变量的整数值

- `number_format(number, decimals?, dec_point?, thousands_sep?)`: 以千位分隔符方式格式化一个数字

- `is_numeric(value)`: 检测变量是否为数字或数字字符串

- `is_int(value)`: 检测变量是否为整数

- `is_float(value)`: 检测变量是否为浮点数

- `is_nan(value)`: 检测变量是否为合法数值

- `is_infinite(value)`: 检测变量是否为无穷大

- `uniqid(prefix?, more_entropy?)`: 生成一个唯一 ID

- `mt_rand(min, max)`: 生成更好的随机数

- `hexdec(hex_string)`: 十六进制转十进制

- `dechex(number)`: 十进制转十六进制

- `bindec(binary_string)`: 二进制转十进制

- `decbin(number)`: 十进制转二进制

### 时间相关

- `time()`: 返回当前 Unix 时间戳

- `date(format, timestamp?)`: 格式化一个本地时间/日期

- `strtotime(time, now?)`: 将任何英文文本的日期时间描述解析为 Unix 时间戳

  可以结合 `date()` 方法使用，如：`date('Y-m-d ',strtotime('+1 day'))`

- `microtime(get_as_float?)`: 返回当前 Unix 时间戳和微秒数

- `getdate(timestamp?)`: 取得日期/时间信息

### 函数方法

- `function_exists(function_name)`: 检查函数是否已定义

- `call_user_func(callback, parameter?, parameter?)`: 调用回调函数

- `call_user_func_array(callback, parameters)`: 调用回调函数，并把一个数组参数作为回调函数的参数

- `func_get_args()`: 返回一个包含函数参数列表的数组

- `sleep(seconds)`: 延迟执行

- `usleep(micro_seconds)`: 以指定的微秒数延迟执行

### 文件相关

- `file_exists(filename)`: 检查文件或目录是否存在

- `is_file(filename)`: 判断给定文件名是否为一个正常的文件

- `is_dir(filename)`: 判断给定文件名是否为一个目录

- `file_get_contents(filename, use_include_path?, context?, offset?, maxlen?)`: 把整个文件读入一个字符串

- `file_put_contents(filename, data, flags?, context?)`: 把一个字符串写入文件

- `fopen(filename, mode, include_path?, context?)`: 打开文件或者 URL

- `fclose(handle)`: 关闭一个打开的文件指针

- `fread(handle, length)`: 读取文件（可安全用于二进制文件）

- `fwrite(handle, string, length?)`: 写入文件（可安全用于二进制文件）

- `fgets(handle, length?)`: 从文件指针中读取一行

- `fgetcsv(handle, length?, delimiter?, enclosure?)`: 从文件指针中读入一行并解析 CSV 字段

- `fputcsv(handle, fields, delimiter?, enclosure?)`: 将行格式化为 CSV 并写入一个打开的文件中

- `fseek(handle, offset, whence?)`: 在文件指针中定位

- `ftell(handle)`: 返回文件指针读/写的位置

- `rewind(handle)`: 倒回文件指针的位置

- `feof(handle)`: 测试文件指针是否到了文件结束的位置

- `scandir(directory, sorting_order?, context?)`: 列出指定路径中的文件和目录

- `mkdir(dirname, mode?, recursive?, context?)`: 创建目录

- `rmdir(dirname, context?)`: 删除目录

- `unlink(filename, context?)`: 删除文件

- `copy(source, dest, context?)`: 拷贝文件

- `rename(oldname, newname, context?)`: 重命名一个文件或目录

- `filemtime(filename)`: 取得文件修改时间

### 图像处理

#### GD 库

- `getimagesize(filename)`: 获取图像的大小，类型等信息（可以利用此方法获取真实的图片类型）

- `imagecreate(width, height)`: 创建一个新图像

- `imagecreatetruecolor(width, height)`: 创建一个真彩色图像

- `imagecreatefromstring(data)`: 从字符串中的图像流新建一图像

- `imagecreatefromjpeg(filename)`: 由文件或 URL 创建一个 jpeg 图像

- `imagecreatefrompng(filename)`: 由文件或 URL 创建一个 png 图像

- `imagecreatefromgif(filename)`: 由文件或 URL 创建一个 gif 图像

- `imagecreatefromwbmp(filename)`: 由文件或 URL 创建一个 wbmp 图像

- `imagecreatefromgd(filename)`: 由文件或 URL 创建一个 GD 图像

- `imagecreatefromgd2(filename)`: 由文件或 URL 创建一个 GD2 图像

- `imagecreatefromgd2part(filename, srcX, srcY, width, height)`: 由文件或 URL 创建一个 GD2 图像

- `imagecopyresampled(dst_image, src_image, dst_x, dst_y, src_x, src_y, dst_w, dst_h, src_w, src_h)`: 重采样拷贝部分图像并调整大小

  常用于缩略图，或者合并图片

- `imagecopyresized(dst_image, src_image, dst_x, dst_y, src_x, src_y, dst_w, dst_h, src_w, src_h)`: 拷贝部分图像并调整大小

- `imagecopymerge(dst_image, src_image, dst_x, dst_y, src_x, src_y, src_w, src_h, pct)`: 拷贝并合并图像的一部分

- `imagecopymergegray(dst_image, src_image, dst_x, dst_y, src_x, src_y, src_w, src_h, pct)`: 拷贝并合并图像的一部分并灰度

- `imagecopyresampled(dst_image, src_image, dst_x, dst_y, src_x, src_y, dst_w, dst_h, src_w, src_h)`: 重采样拷贝部分图像并调整大小

- `imagecopyresized(dst_image, src_image, dst_x, dst_y, src_x, src_y, dst_w, dst_h, src_w, src_h)`: 拷贝部分图像并调整大小

- `imagecopymerge(dst_image, src_image, dst_x, dst_y, src_x, src_y, src_w, src_h, pct)`: 拷贝并合并图像的一部分

### 其它

- `header(string, replace?, http_response_code?)`: 发送原生 HTTP 头

- `setcookie(name, value?, expire?, path?, domain?, secure?, httponly?)`: 发送 cookie

- `session_start()`: 启动会话

- `session_destroy()`: 销毁一个会话中的全部数据

- `session_unset()`: 释放所有会话变量

- `session_id(id?)`: 获取/设置当前会话 ID

- `session_name(name?)`: 获取/设置当前会话名称
