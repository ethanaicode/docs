---
title: PHP进阶优化技巧，高效开发Web应用的最佳实践
---

# PHP 进阶知识

## PHP 命令

### PHP CLI

- `php -m`: 查看已经安装的模块

- `php -v`: 查看版本

- `php -S localhost:8000`: <u>启动一个简单的服务器</u>

  `php -S localhost:8000 -t public`: 指定根目录为 public

  `php -S 0.0.0.0:8000 router.php`: 指定入口文件为 router.php（0.0.0.0 表示监听所有地址，支持局域网访问） 

- `php -a`: 进入交互模式

- `php -r "echo extension_loaded('redis') ? 'yes' : 'no';"`: 执行一行代码

- `php -i`: 查看 php 配置

  `php -i | grep php.ini`: 查看 php.ini 文件路径

- `php --ini`: 查看 php.ini 文件路径

### PHP-FPM

- `php-fpm`: 启动 php-fpm（推荐使用 systemctl 启动）

  如果是使用该命令启动的，想要停止，可以使用 `killall php-fpm` 或者 `pkill -o -f "php-fpm: master process"`。

- `php-fpm -/--test`: 检查配置文件是否正确

- `php-fpm -tt`: <u>检查配置文件是否正确</u>，并显示配置文件路径

- `php-fpm -i/--ini`: 查看 php-fpm 配置

## PHP 安装

### 包管理器安装

#### Ubuntu

```bash
# 确保安装必要的辅助工具
sudo apt -y install software-properties-common apt-transport-https lsb-release ca-certificates
# 添加 PHP 仓库
sudo add-apt-repository ppa:ondrej/php
# 更新软件包列表
sudo apt update
# 安装特定版本的 PHP 及常用扩展
sudo apt install php7.4-cli php7.4-fpm php7.4-mysql php7.4-curl php7.4-json php7.4-mbstring php7.4-xml php7.4-zip php7.4-gd
# 查看 PHP 版本
php -v
# 启动 PHP-FPM（通常不需要操作，默认已启动并自动重启）
sudo systemctl start php7.4-fpm
sudo systemctl enable php7.4-fpm
```

> [!WARNING] php-fpm 服务找不到
> 可能无法找到 `php-fpm` 服务或者命令，因为不同的 PHP 版本可能会有不同的服务名称，比如 `php7.4-fpm` 或者 `php8.0-fpm` 等。

> [!TIP] PHP 版本
> Ubuntu 官方源通常只提供当前 LTS 支持的某些 PHP 版本，例如 8.1 或更高。
> 这个 PPA 是由 Ondřej Surý 维护的，是 Ubuntu 社区最权威的 PHP PPA。它提供多个版本的 PHP。

**切换 PHP 版本**

要管理多个 PHP 版本，你可以使用 update-alternatives 命令。这允许你在不同的 PHP 版本之间切换。

```bash
# 配置 PHP CLI
sudo update-alternatives --set php /usr/bin/php7.4
# 配置 PHP-FPM
sudo update-alternatives --set php-fpm /usr/sbin/php-fpm7.4

# 查看可用的 PHP 版本
sudo update-alternatives --config php

# 切换到其他版本（例如 PHP 8.0）
sudo update-alternatives --set php /usr/bin/php8.0
sudo update-alternatives --set php-fpm /usr/sbin/php-fpm8.0

# 查看当前使用的 PHP 版本
php -v
```

#### Debian

```bash
# 确保安装必要的辅助工具
sudo apt install -y ca-certificates apt-transport-https lsb-release curl gnupg
# 导入 GPG Key
curl -fsSL https://packages.sury.org/php/apt.gpg | sudo gpg --dearmor -o /usr/share/keyrings/sury-php.gpg
# 添加 Debian 源
echo "deb [signed-by=/usr/share/keyrings/sury-php.gpg] https://packages.sury.org/php/ $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/sury-php.list
# 更新软件包列表
sudo apt update
# 安装特定版本的 PHP 及常用扩展
sudo apt install -y php7.4-cli php7.4-fpm php7.4-mysql php7.4-curl php7.4-json php7.4-mbstring php7.4-xml php7.4-zip php7.4-gd
# 查看 PHP 版本
php -v
# 启动 PHP-FPM（通常不需要操作，默认已启动并自动重启）
sudo systemctl start php7.4-fpm
sudo systemctl enable php7.4-fpm
```

#### CentOS/RHEL

```bash
# 安装 EPEL 和 Yum Utils 依赖
sudo yum install -y epel-release yum-utils
# 安装 Remi 仓库
sudo yum install -y http://rpms.remirepo.net/enterprise/remi-release-7.rpm
# 查看可用的 PHP 模块
yum module list php
# 启用你想要的 PHP 版本（以 7.4 为例）
sudo yum-config-manager --enable remi-php74
# 安装 PHP 及常用扩展
sudo yum install -y php php-cli php-fpm php-mysqlnd php-pdo php-gd php-mbstring php-xml php-json php-opcache
# 查看 PHP 版本
php -v
# 启动 PHP-FPM（如果你要用 nginx）
sudo systemctl start php-fpm
sudo systemctl enable php-fpm
# 如果安装错了版本，可以卸载重新安装，卸载命令：
sudo yum remove php*
```

> [!TIP] Remi 仓库
> `remi` 仓库是一个第三方仓库，提供了最新版本的 PHP 和常用扩展。`remi` 安装的应用都可以在 `/opt/remi/` 目录下找到。
> 但要注意的是这个目录下的应用和系统自带的应用是分开的，比如用这个源安装了 PHP 7.4，同时更换了系统自带的 PHP 版本为 7.4，但是他们是不同的，配置和运行环境也不同。

### 编译安装 PHP

PHP 的编译安装可以让你根据自己的需求来定制 PHP 的功能和性能。

PHP 的编译安装，通常需要以下步骤：

1. 下载 PHP 源码包并解压

   官方版本下载：[PHP 官方下载](https://www.php.net/releases/)

2. 进入解压后的目录

3. 执行 `./configure` 命令

4. 执行 `make` 和 `make install` 命令

**PHP 的配置选项**

`./configure` 命令是用来检查系统环境，生成 Makefile 文件，Makefile 文件是用来编译 PHP 的。

具体可以参考官方配置选项指南：[PHP 配置选项](https://www.php.net/manual/zh/configure.about.php)

**常用的配置推荐**

下面配置仅供参考，具体配置可以参考我的项目：[PHP74 安装脚本](https://github.com/ethanaicode/debian12-webserver-setup/blob/main/script/install-php.sh)，并根据自己的需求进行修改。

```bash
./configure --prefix=/www/server/php/82 \
--with-config-file-path=/www/server/php/82/etc \
--enable-fpm \
--with-fpm-user=www \
--with-fpm-group=www \
--enable-mysqlnd \
--with-mysqli=mysqlnd \
--with-pdo-mysql=mysqlnd \
--enable-mysqlnd-compression-support \
--with-zlib \
--enable-xml \
--disable-rpath \
--enable-bcmath \
--enable-shmop \
--enable-sysvsem \
--with-curl \
--enable-mbregex \
--enable-mbstring \
--enable-intl \
--enable-ftp \
--enable-gd-jis-conv \
--with-openssl \
--with-mhash \
--enable-pcntl \
--enable-sockets \
--enable-soap \
--with-gettext \
--enable-fileinfo \
--enable-opcache \
--with-pear \
--with-ldap=shared \
--without-gdbm \
--enable-gd
```

- `--prefix` 指定 PHP 安装目录

- `--with-config-file-path` 指定 PHP 配置文件目录

- `--enable-fpm` 启用 PHP-FPM

- `--enable-mysqlnd` 启用 MySQL Native Driver

- `--with-zlib` 启用 Zlib 支持

- `--enable-xml` 启用 XML 支持

- `--disable-rpath` 禁用 RPATH（RPATH 是一个用来指定运行时库路径的机制）

- `--with-openssl` 启用 OpenSSL 支持

- `--without-gdbm` 禁用 GDBM 支持（GDBM 是一个开源的数据库管理系统，PHP 7.4 之后已经移除了对 GDBM 的支持）

- `--enable-gd` 启用 GD 图形库

## 进阶知识

### PHP 配置

#### 配置文件位置

早期 linux 系统中，通常会自带 PHP，它们的配置文件通常在以下位置：

- `/etc/php.ini`: 全局配置文件

- `/etc/php.d`: 扩展配置文件

- `/etc/php-fpm.d`: PHP-FPM 配置文件

  `/etc/php-fpm.d/www.conf`: PHP-FPM 网站配置文件

- `/etc/php-cli.ini`: CLI 配置文件

如果是自己编译安装的 PHP，那么配置文件会在安装目录下的 `etc` 目录中。

### 实用技巧

- **`...`参数**表示可以接受任意数量的参数，可以用来代替数组。

  例如：

  ```PHP
  function sum(...$nums)
  {
      return array_sum($nums);
  }
  ```

- **file_get_contents()** 用于读取文件内容，也可以用来读取远程文件，利用这个实现简单的接口请求。

  例如：

  ```PHP
  $response = file_get_contents('https://api.github.com/shejibiji/data');
  print_r(json_decode($response, true));
  ```

  **注意**: 如果服务器返回的状态码不是 200，`file_get_contents()` 会返回 `false`，而不会返回错误信息。

### 注意事项

- 使用 `empty($var)` 函数时一定要注意，`empty()` 函数会将 `0`、`0.0`、`false`、`null`、`''`（空字符串）等视为 `true`，

  所以如果你需要判断一个变量是否为 `0`，请使用 `isset()` 或者直接比较。

  ```php
  // 错误的示例代码（请仔细阅读下面的代码，发现并记住这个低级错误）
  if (!empty($task['status']) && $task['status'] == 0) {
    // 执行某些操作
  }
  ```

- 使用 `empty($var)` 函数是要注意如果参数为 `" "` 空格时，会被认为是非空的，如果客户端无值时，给一个默认值空格时，判断就失效了。_别问我为什么能想到这个 :(_

- `strpos(string $haystack, string $needle, int $offset = 0)` 函数在 8.0 之前的版本中，如果传入的 `$needle` 为 `int`，则会返回 `false`，而导致不期待的结果

  总之，别用 `int` 作为 `$needle`。

### 数据存储

PHP 不同的数据在内存中的存储方式不同，主要分为两种：栈内存和堆内存。

- 栈内存：存储基本数据类型，如整型、浮点型、布尔型等。

- 堆内存：存储复杂数据类型，如数组、对象等。

> 堆(heap)和栈(stack)的区别：堆经典的实现是完全二叉树，栈是一种先进后出的数据结构，所以堆是一种树形结构，栈是一种线性结构。想象一下画面就比较好记了。

### 常见问题

#### syntax error, unexpected 'Dysmsapi' (T_STRING), expecting function (T_FUNCTION) or const (T_CONST)

这个错误通常是因为 PHP 版本过低，导致无法识别 `Dysmsapi` 类，

比如 PHP 7.2 以及之前的版本不支持 `public Dysmsapi $client` 这种写法，需要改成 `public $client;`，然后在构造函数中进行赋值。

## 命名空间

**命名空间就类似一个文件夹，多个路径的命名空间就类似嵌套的文件夹。**

如 `App\Controller`意思就是`App`文件夹下子文件夹`Controller`下的类。

你把类放到这个文件夹后，使用时，就必须要先进到这个文件夹才可以使用。

比如一个类命名空间为 `App\Controller` ，那我们使用这个类下面的方法，就应该是这样的：

```
App\Controller\Foo::show()
```

如果一个函数的命名为 `App\Controller` ，那我们要使用这个方法，就应该是这样的：

```
App\Controller\show()
```

### 基础用法

#### 不同的引入方式

先看一个案例，在同一个类中，引入三种不同命名空间文件中的类：

```PHP
// index.php

<?php

namespace App;

require_once 'order.php';
require_once 'comment.php';

class User
{
    public static function show()
    {
        echo __METHOD__;
    }
}

// 留意这里，对于三个不同的命名空间，是如何使用不同的路径进行引用的。
User::show();
Controller\Order::show();
\Blog\Comment::show();

// 拓展下，下面这两种写法也是有效的，但不推荐使用
// 1.
namespace \Controller\Order::show();
// 2.
$class = __NAMESPACE__ . '\Controller\Order'; // __NAMESPACE__表示当前命名空间
$class::show();

// order.php

<?php

namespace App\Controller;

class Order
{
    public static function show()
    {
        echo __METHOD__;
    }
}

// comment.php

<?php

namespace Blog;

class Comment
{
    public static function show()
    {
        echo __METHOD__;
    }
}
```

可以看到在上面为了引用三个不同命名空间的类，使用了不同的路径。

1. 因为默认是在 本命名空间中`App`中找类，所以可以直接用类名。
2. 第二个文件命名空间为`App\Controller`，但是默认还是在`App`下找，并没有。

所以需要补上子‘文件夹’名称`Controller`才可以正确找到。

1. 第三个使用了不同的命名空间`Blog`，所以就需要去根目录下，所以要加上`\`来表示不要在本命名空间找啦，而是去根空间下去找吧（相当于绝对路径）。

#### 类与空间声明

类声明后，就不用重复写类的空间地址了，比如：

```PHP
// index.php

<?php

namespace App;

use App\Controller\Model\Tool\Order;

require_once 'tool.php';

Order::show();

// 如果不声明类，使用Order，需要这样写：
// Controller\Model\Tool\Order::show();

// tool.php

<?php

namespace App\Controller\Model\Tool;

class Order
{
    public static function show()
    {
        echo __METHOD__;
    }
}
```

或者改一下上面的代码，我们声明空间，则需要这样：

```PHP
// index.php

<?php

namespace App;

use App\Controller\Model\Tool;

require_once 'tool.php';

Tool\Order::show();
```

上面就是先声明了空间，然后使用空间下面的类。

### 特别注意

- **命名空间中的函数及常量**

如果直接使用一个函数，在本命名空间找不到，会默认去全局找，很多框架会利用这个特性，做一个工具库。

例如：

```PHP
// index.php

<?php

namespace App;

require_once 'tool.php';

show();

// tool.php

<?php

function show()
{
    echo __METHOD__;
}
```

虽然`App`下面没有`show()` 函数，但是全局中，所以直接使用`show()`依然有效。

常量的定义方式有两种，`defind`和`const`，其中`defind`不受命名空间影响，也就是说可以直接使用，但是`const`会受到命名空间影响，如果有命名空间，则不可以直接使用，而是要引入且使用，才可以调用，如：

```PHP
// index.php

<?php

namespace App;

use const Tool\WEB;

require_once 'tool.php';

echo WEB;

// tool.php

<?php

namespace Tool;

const WEB = 'shejibiji.com';
```

- 解决引入冲突

可以通过给类起个别名的方式，来解决冲突，可以看下面的例子：

```PHP
// index.php

<?php

namespace App;

use App\Controller\Model\Tool\Order as ToolOrder;

require_once 'tool.php';

ToolOrder::show();
```

### 自动加载

> 不需要频繁在文件中使用 require 和 include，可以使用一个函数，当找不到一个文件时，自动去加载这个文件。
>
> 需要命名空间和文件夹路径匹配 !important。

只需要先引入这样一个方法：

```PHP
<?php

namespace App;

use App\Controller\Model\Tool\Order as ToolOrder;

spl_autoload_register(function ($class) {
    $file = str_replace('\\', '/', $class) . '.php';
    // $file = App/Controller/Model/Tool/Order.php
    require $file;
});

ToolOrder::show();
```

上面还可以优化下，使用面向对象的方式，使其更加科学：

```PHP
<?php

namespace App;

use App\Controller\Model\Tool\Order as ToolOrder;

class Bootstrap
{
    public static function boot()
    {
        spl_autoload_register([new self, 'autoload']);
    }
    public function autoload($class)
    {
        $file = str_replace('\\', '/', $class) . '.php';
        require $file;
    }
}
Bootstrap::boot();

ToolOrder::show();
```

这样就和上面那个案例是一样的了。

#### 使用 composer 自动加载

非常简单，首先在项目中初始化 composer（使用`composer init`），然后在`composer.json`中，定义下自动加载即可，自动加载内容如：

```JSON
{
  "autoload": {
    "psr-4": {
      "App\\": "App"
    }
  }
}
```

注意内容需要根据实际项目修改。

我们还可以自动加载文件，只要修改下 composer 的文件，并`composer update`一下即可：

```JSON
"autoload": {
    "files": [
      "helper.php"
    ],
    "psr-4": {
      "App\\": "App"
    }
  }
```

## 面向对象

推荐教程：[学习 PHP 面向对象从未如此清晰](https://www.bilibili.com/video/BV14x411o7SL)

### 类和对象

> 类中的属性不推荐直接修改，都是通过方法传递参数来修改。
>
> 这样我们可以对参数进行验证等，会更加的安全。
>
> （就像自家的孩子，不能谁来都可以带走，至少先申请下吧）

类是由属性和方法组成，对象是通过类生成的。

例如：

```PHP
<?php

class User
{
    protected $name;        // 变量比较重要的，推荐保护起来
    public function show()
    {
        echo $this->name . '说：您好！';
    }
    public function setNanme(string $name)
    {
        return $this->name = $name;
    }
}

$obj = new User;          // 用new来生成一个对象
$obj->setNanme('设计笔记');
$obj->show();
```

`$this`关键指针，其实是指向当前对象，不同的对象，下面的方法返回的结果就可以不一样。

上个案例中，当`new`一个类为`$obj`，`$this`其实就是指`$obj`。

#### 静态变量 static

上一个案例中的变量，是对象下的变量，对象的变量可以进行定义和修改的。

还有一种是静态变量，静态变量属于类，不可被对象修改。

静态变量的定义：`protected static $classname = '三年一班'; `

静态变量的使用：`self::$classname`

`self`表示当前类，上面的就可以理解为 当前类 的 静态变量 。

`self`也可以改成类名，但是如果类名被修改，类中的类名就得都修改，所以不推荐。

#### 静态方法 static

静态方法只能通过类来调用，不能使用对象调用。

（通俗来理解，就是静态方法中，不能出现`$this`）

静态方法的使用属于内部调用，不牵扯到类属性的改变。

#### 类常量 const

属于类，和常量类似。用`const`定义。

如果是类内部调用，用`self::CONST`来调用即可。

例如：

```PHP
<?php

class Model
{
    const NB = '666';
}

echo Model::NB;
```

#### 继承类 extends

可以使用`extends`来实现类的继承及复用。

继承后，子类就可以用`$this`来调用父类的内容。

（感觉就类似引入 php 文件，只是调用父类比较简单点。）

**重写**

父类方法和属性可以被重写，会默认用新写的方法和属性。

（你有一个亿，就不会继承你爸的财产了）

可以在父类方法或者属性加上**final**关键字，来禁止被重写。

如果重写之后还想调用父类方法，可以使用**parent**来实现：

```PHP
<?php

abstract class Notify
{
    abstract public function name();

    public function message()
    {
        return $this->Name() . '您好';
    }
}

class User extends Notify
{
    public function register()
    {
        return $this->message();
    }
    public function message()
    {
        return parent::message(); // 重写后调用父类方法
    }
    public function name()
    {
        return '设计笔记';
    }
}

echo (new User)->register();
```

#### 抽象类和方法 abstract

> 父类用到某个属性或者方法，但是没有写，要求子类来定义，就需要用到这个抽象类或者方法，来告诉子类，我这个方法需要你定义。

关键词为**abstract**，例如：

```PHP
<?php

abstract class Notify
{
    abstract public function name();

    public function message()
    {
        return $this->Name() . '您好';
    }
}

class User extends Notify
{
    public function register()
    {
        return $this->message();
    }
    public function name()
    {
        return '设计笔记';
    }
}

echo (new User)->register();
```

#### 多继承（变相） trait

> php 是单继承的，新版本可以实现变相多继承

**trait**的优先级要比继承**extends**要高。

解决方法名冲突，可以使用**insteadof**选择和**as**重名来解决。

例如：

```PHP
<?php

trait Log
{
    // 也可以使用use来继承其他类
    public function save()
    {
        return __METHOD__;
    }
}

trait Comment
{
    public function get()
    {
        return __METHOD__;
    }

    // 这个方法和上面那个trait重名了
    public function save()
    {
        return __METHOD__;
    }
}

class Site
{
    // 这个方法和上面那个trait重名了
    public function get()
    {
        return __METHOD__;
    }
}

class Topic extends Site
{
    use Log, Comment {
        // 方法重名时可以用insteadof来选择一个
        Log::save insteadof Comment;
        // 可以给冲突的方法重命名来解决冲突问题
        Comment::save as saveComment;
        // 还可以在as后面加上protected来保护这个方法不让外面调用
    }
}

$topic = new Topic;

// trait的优先级高于extends，此时输出为Comment::get
echo $topic->get();
echo '<br>';
// 此时输出结果为Log::save
echo $topic->save();
echo '<br>';
// 此时输出结果为Comment::save
echo $topic->saveComment();
```

#### 接口类 interface

interface 定义接口，和上面的抽象类类似，都是不在父类定义具体方法，只定义标准。

当你使用这个接口或者类时，需要在类中定义具体方法。

_接口类似一个纯抽象类，只有方法名，没有方法体_

例如：

```PHP
<?php

interface interfaceCache
{
    public function set();
    public function get();
}

class Mysql implements interfaceCache
{
    public function set()
    {
        // code...
    }
    public function get()
    {
        // code...
    }
}

class Redis implements interfaceCache
{
    public function set()
    {
        // code...
    }
    public function get()
    {
        // code...
    }
}

class Cache
{
    public static function instance(string $driver)
    {
        switch (strtolower($driver)) {
            case 'mysql':
                return new Mysql;
            case 'redis':
                return new Redis;
        }
    }
}

$cache = Cache::instance('Mysql');
var_dump($cache);
```

## 魔术方法

### \_\_invoke()

> 当对象被当作函数调用时，会调用这个方法。

例如：

```PHP
class User
{
    public function __invoke()
    {
        echo 'Hello, World!';
    }
}

$user = new User;

$user();
```

**应用场景**

1. 用来实现一个类似闭包的功能，比如：

```PHP
class Closure
{
    public function __invoke($name)
    {
        return 'Hello, ' . $name;
    }
}

$obj = new Closure;

echo $obj('设计笔记');
```

2. 用来实现单例模式，比如：

```PHP
class Singleton
{
    private static $instance;

    private function __construct()
    {
    }

    public static function getInstance()
    {
        if (!self::$instance) {
            self::$instance = new self;
        }
        return self::$instance;
    }

    public function __invoke()
    {
        return 'Hello, World!';
    }
}

$obj = Singleton::getInstance();

echo $obj();
```

3. 用来实现策略模式，比如：

```PHP
class Strategy
{
    private $strategy;

    public function __construct(callable $strategy)
    {
        $this->strategy = $strategy;
    }

    public function __invoke($name)
    {
        return call_user_func($this->strategy, $name);
    }
}

$obj = new Strategy(function ($name) {
    return 'Hello, ' . $name;
});

echo $obj('设计笔记');
```

### \_\_instruct() 和 \_\_destruct()

_一个是生，一个是死。_

- `__instruct()`: 构造函数，类开始时自动执行函数

- `__destruct()`: 析构函数，类结束时自动执行函数

### \_\_get 和 \_\_set

> 当访问私有的或者受保护的属性时，`__set()` `__get()` 这两个魔术方法会被调用，用来设置或者获取私有属性而不报错。

如果属性不存在，也是会调用和这个魔术方法。

所以可以利用这一点，使用这个方法，来统一获取属性，并实现根据需要来处理不同的输出。

例如：

```PHP
<?php

abstract class Query
{
    abstract protected function record(array $data);
    public function select()
    {
        $this->record(['name' => '设计笔记', 'age' => 22, 'tel' => 18930309999]);
    }
}

class Model extends Query
{
    protected $field = [];
    public function all()
    {
        $this->select();
        return $this->field;
    }
    public function record(array $data)
    {
        $this->field = $data;
    }
    public function __tel()
    {
        // 自定义处理类
        return substr($this->field['tel'], 0, 8) . '***';
    }
    public function __get($name)
    {
        if (method_exists($this, '__' . $name)) {
            return call_user_func_array([$this, '__' . $name], []);
            // 调用函数，没有参数也需要传空数组
        }
        if (isset($this->field[$name])) {
            return $this->field[$name];
        }
        throw new Exception('无效的参数');
    }
    public function __set($name, $value)
    {
        if (isset($this->field[$name])) {
            $this->field[$name] = $value;
        } else {
            throw new Exception('无效的参数');
        }
    }
}
try {
    $user = new Model;
    $user->all();
    // 利用__set()修改结果值
    $user->name = '小设同学';
    // 利用__get()获取结果值
    echo $user->name . '的联系方式是' . $user->tel;
} catch (Exception $e) {
    echo $e->getMessage();
}
```

### 更多魔术方法

- `__unset()` 当对一个不可访问的属性调用 `unset()` 时被调用。

- `__isset()`: 当对一个不可访问的属性调用 `isset()` 或 `empty()` 时被调用。

- `__call()`: 当调用一个不存在的方法时，会调用这个方法

- `__callStatic()`: 当调用一个不存在的静态方法时，会调用这个方法

- `__toString()`: 当一个对象被当作字符串使用时，会调用这个方法

## PHP-FPM

### 配置 PHP-FPM

- `PHP-FPM` 配置文件位置（通常情况下）：`/etc/php/{version}/fpm/php-fpm.conf`，如果是自己编译安装的 PHP，那么配置文件位置可能会有所不同。

- `PHP-FPM` 配置分为全局配置和池配置，全局配置文件一般是 `php-fpm.conf`，池配置文件一般是 `pool.d/www.conf`。

  _两个配置也可以都放在`php-fpm.conf`，只需要使用 `[www]` 来标识为池配置即可。_

- PHP-FPM 的配置文件中，可以使用 `;` 来注释掉一行配置，也可以使用 `include` 来引入其它配置文件。

- 在池配置文件中，可以配置 PHP-FPM 的运行模式、进程数、用户组、监听地址、日志文件等。

- 池配置开头的 `[www]` 里面的内容是池的名称，可以有多个池，每个池可以有不同的配置。

### PHP-FPM 通信

PHP-FPM 是 PHP 的 FastCGI 进程管理器，通常与 Nginx 配合使用。

Nginx 通过 FastCGI 协议与 PHP-FPM 进行通信，通常在 Nginx 的配置文件中使用 `fastcgi_pass` 指令来指定 PHP-FPM 的监听地址。

**主要有两种方式**

1. Unix Socket（新系统默认方式）

   在 Nginx 的配置文件中，使用 `fastcgi_pass unix:/run/php/php7.4-fpm.sock;` 来指定 PHP-FPM 的 Unix Socket 地址。

   这种方式性能更好更安全，但需要**确保 Nginx 和 PHP-FPM 都有权限**访问这个 Socket 文件。

   _一定要确保有权限，不然会导致启动失败，Mac 上默认不允许在 /run 下创建文件，可以替换为 /tmp_

2. TCP Socket

   在 Nginx 的配置文件中，使用 `fastcgi_pass 127.0.0.1:9000;` 来指定 PHP-FPM 的 TCP Socket 地址。

   这种方式更通用，可跨主机/容器连接，但性能稍差一些。

如果需要在 `vim` 中快速替换通信方式，可以用下列命令：

```bash
# 将 127.0.0.1:9000 替换为 unix:/run/php/php7.4-fpm.sock（使用 # 分隔符避免误替换）
:%s#127.0.0.1:9000;#unix:/run/php/php7.4-fpm.sock;#g
```

**如何查看 PHP-FPM 的监听方式**

可以通过以下命令查看 PHP-FPM 的监听方式：

```bash
cat /etc/php/7.4/fpm/pool.d/www.conf | grep ^listen
```

### 优化 PHP-FPM

#### 常用参数

在调整性能中，我们一般关注以下几个参数:

- `pm`: 运行模式，有以下几种模式:

  - `static` 静态模式，固定进程数，适用于内存较小的情况。

  - `dynamic` 动态模式(默认)，根据配置文件中的参数来动态调整进程数，适用于内存较大的情况。

  - `ondemand` 按需模式，只有在请求到来时才会创建进程，适用于内存较大的情况。

- `pm.max_children`: 允许创建的最大进程数，这个值越大，可以处理的并发请求数就越多，但也会占用更多的内存。

  4G 内存的服务器，假设每个 PHP 进程平均占用 20MB 内存，那么最大可以设置为 200（4096 / 20），但实际设置时需要预留一部分内存给操作系统和其他服务。

- `pm.start_servers`: 启动时创建的进程数，可以设置为最小空闲进程数的 1.5 倍。

- `pm.min_spare_servers`: 最小空闲进程数（清理空闲进程后保留的最小进程数）。

- `pm.max_spare_servers`: 最大空闲进程数（当空闲进程数超过这个值时，就会被清理）。

- `pm.max_requests`: 每个进程处理的最大请求数，处理完这个数量的请求后，进程会被重启。

#### 优化建议

- `pm.max_children` 的值一般可以根据内存来计算，一般会预留 20% 内存给操作系统及其它服务，其余的可以根据每个 PHP 进程的平均内存消耗量（可以假设为 20MB），计算出合适的值

  假设内存为 2G，则可以计算出值大概为 84（2048 \* 0.8 / 20）

  该值设置过大，会导致服务器不稳定

- 一般来说，可以将 `pm.min_spare_servers` 设置为 `pm.max_children` 的一定比例，比如 `pm.max_children` 的 10% - 20%

  这样可以确保在任何时候都有足够的空闲进程可用来处理请求

- `pm.max_spare_servers` 一般设置为 `pm.max_children` 的一定比例，比如 `pm.max_children` 的 20% - 30%

  这样可以确保在任何时候都有足够的空闲进程可用来处理请求

- `pm.max_requests` 一般设置为 500 - 1000，这样可以确保 PHP 进程定期被重启，避免内存泄漏

- `request_terminate_timeout` 设置为 30s - 60s，这样可以避免 PHP-FPM 进程因为请求超时而被终止

- `request_slowlog_timeout` 设置为 5s - 10s，这样可以记录慢请求日志，帮助你优化代码

  _上面两个值如果设置为 0，则表示不限制请求时间_

- `rlimit_files` 设置为 65535，避免 PHP-FPM 进程因为打开文件数过多而被限制

  _系统通常默认最多只能打开 1024 个文件，如果要设置更高的值，需要修改系统的 `ulimit` 设置_

- 配置参考:

  ```ini
  # 4G 内存服务器推荐配置
  pm = dynamic
  pm.max_children = 160
  pm.start_servers = 20
  pm.min_spare_servers = 16
  pm.max_spare_servers = 32
  pm.max_requests = 1000
  ```

**修改后记得重启 PHP-FPM**:

```bash
sudo systemctl restart php-fpm
```

## PEAR/PECL

> 在 Centos 中，如果 php 是通过 yum 安装的，那么安装拓展直接就可以使用`yum install php-pecl-扩展名`命令来安装即可。

- PEAR 全称是 PHP Extension and Application Repository，PHP 类库的集合（用 PHP 写的），类似 Composer 包，属于功能性类库。

  PEAR 只依赖于 PHP 本身。文件形式通常为 `.php`。

  _可以把 PEAR 理解为 Python 中的 pip，Ruby 中的 gem 等_

- PECL 全称是 PHP Extension Community Library，是 PHP 的一个扩展库（用 C 写的），可以用来安装和管理 PHP 扩展，属于性能更高的底层扩展。

  由于依赖 PHP 的扩展 API，需要编译安装，文件形式通常为 `.so` 或 `.dll`。

- `pecl` 是 PEAR 工具链的一部分，都可以使用 `go-pear.phar` 安装。

### PEAR/PECL 的安装

通常情况下，PEAR/PECL 会随着 PHP 的安装而自动安装，可以通过以下命令来检查是否安装：

```bash
pear version
pecl version
```

如果是自己编译安装的 PHP，可以在安装目录 `bin` 下找到 `pear` 和 `pecl` 命令。如果没有找到，表示你 **下载并编译的是 PHP 源码包中不包含** PEAR/PECL 的工具链，就需要手动安装。

_PEAR/PECL 是可以通过编译时安装的，只需要在编译时添加 `--with-pear` 选项即可，这样可以确保编译后 PEAR/PECL 工具可用_

#### 下载并初始化 PEAR/PECL

首先可以确认下当前 PHP 是否内置了 PEAR 支持（而只是没有安装），你可以运行：

```bash
/path/to/php/bin/php -r "var_dump(defined('PEAR_INSTALL_DIR'));"
```

如果输出为 `bool(true)`，说明编译时 PEAR 是支持的，只是你还需要执行一次初始化安装（`go-pear.phar`）。

可以通过以下命令来下载并初始化 PEAR/PECL：

```bash
cd /path/to/php
wget https://pear.php.net/go-pear.phar
/path/to/php/bin/php go-pear.phar
```

执行过程中按回车选择默认路径即可，安装后你会得到：

```bash
/path/to/php/bin/pear
/path/to/php/bin/pecl
```

### 使用 PECL 安装扩展

PECL 扩展的安装非常简单，只需要使用 `pecl install` 命令即可。

比如安装 `redis` 扩展：

```bash
/path/to/php/bin/pecl install redis
```

安装完成后，通常会提示你将扩展添加到 `/etc/php.ini` 文件或 `/etc/php.d/` 目录下的配置文件中。

你也可以手动添加扩展到 `/etc/php.ini` 文件中，在 `/etc/php.ini` 文件中添加以下行即可：

```ini
extension=redis.so
```

然后重启 PHP-FPM 服务使配置生效。

**常见问题**

- 安装扩展时，可能会提示你缺少依赖，比如安装 `redis` 时 可能会提示缺少 `autoconf` 依赖，

  那么先安装下依赖，再运行安装命令即可。

- 如果在安装扩展时遇到 `ERROR: phpize failed` 错误，通常是因为缺少 `phpize` 工具。

  你可以通过以下命令安装：

  ```bash
  # Linux（例如 Ubuntu/Debian）
  apt install php-dev
  # CentOS / RHEL
  yum install php-devel
  # 如果使用的是特定版本（实测没必要，用上面命令即可）
  yum install php82-php-devel
  ```

## Composer

`Composer` 是 PHP 的一个依赖管理工具，可以用来管理项目中的依赖包，并实现自动加载。

### 基础命令

- `composer init`: 初始化一个项目

- `composer update`: <u>更新依赖</u>

- `composer install`: 安装依赖(根据 composer.lock 文件)

- `composer search vendor`: 查找依赖

- `composer require vendor/package`: 安装依赖

  `composer require vendor/package:version` 安装指定版本的依赖

- `composer remove vendor/package`: 删除依赖

- `composer show`: 查看已安装的依赖

  `composer show vendor/package` 查看指定依赖的版本

- `composer dump-autoload`: 重新生成自动加载文件

- `composer self-update`: 更新 Composer

- `composer global require vendor/package`: 全局安装一个包

- `composer create-project vendor/package=version dir`: 从指定的包创建一个项目

  `--prefer-dist`　下载压缩包

  `--stability`　指定稳定性

  `--repository`　指定仓库

  `--dev`　安装开发依赖

  `--no-dev`　不安装开发依赖

  `--no-scripts`　不执行脚本

  `--no-install`　不安装依赖

  `--no-progress`　不显示进度

### 使用经验及技巧

- `Composer` 不会被某个 PHP 版本绑定，运行 `composer install` 命令时，实际执行的是 `php composer.phar install`。

   所以 `Composer` 可以在多个 PHP 版本中使用，例如有一个 PHP 版本为 `php85` ，那我们就可以使用下列命令来指定 `composer` 使用的 PHP 版本：
   
   ```bash
   php85 /usr/local/bin/composer install
   ```

### Composer 配置

可以通过 `composer config` 命令来配置 Composer 的全局配置。

比如我希望更改 Composer 的镜像源，可以使用以下命令：

```bash
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
```

国内镜像源包括：

- **阿里云**: `https://mirrors.aliyun.com/composer/`

- **华为云**: `https://mirrors.huaweicloud.com/repository/php/`

- **腾讯云**: `https://mirrors.cloud.tencent.com/composer/`

也可以通过修改 `~/.composer/config.json` 文件来配置 Composer 的全局配置。

### Composer 依赖管理

Composer 依赖管理是通过 `composer.json` 文件来实现的。

这个文件中定义了项目的依赖包、版本、作者等信息。

可以通过以下命令来生成 `composer.json` 文件：

```bash
composer init
```

这会引导你输入项目的相关信息，并生成一个 `composer.json` 文件。

### 常见问题

**Composer detected issues in your platform: Your Composer dependencies require a PHP version**

这个问题是因为 Composer 检测到你项目运行的 PHP 版本低于依赖包的 PHP 版本。

通常是因为系统默认的 php 版本和项目中的 php 版本不一致导致的。

可以尝试用下面的命令来解决：

- `composer update --ignore-platform-reqs`: 添加参数来忽略掉平台的版本检查

或者通过修改 composer.json 文件来解决：

```JSON
{
  "config": {
    "platform": {
      "php": "7.4.3"
    }
  }
}
```

然后再执行 `composer update` 命令来更新依赖，这会让 Composer 假装当前使用的 PHP 版本是 7.4.3，即使实际上不是。

## PDO 操作数据库

> 推荐教程：[打通 PHP 数据库任督二脉](http://bilibili.com/video/BV1v4411A74Q/?p=2)

`PDO` 是 PHP 的一个数据库操作类，可以用来操作多种数据库，比如 MySQL、SQLite、Oracle 等。

### 连接数据库

可以通过创建一个新的 PDO 实例来简历连接。

需要传入参数，具体可以看知识点：[PDO::\_\_construct](https://www.php.net/manual/en/pdo.construct.php)

第四个参数为数组，可以实现对 PDO 的参数配置修改，比如错误的处理，和修改查询属性 ::setAttribute 一样。

具体可以看教程 P3。

例如：

```PHP
protected function dsn()
    {
        return sprintf("mysql:host=%s;dbname=%s;chartset=%s", DB_HOST, DB_DBNAME, DB_CHARSET);
    }

protected function pdo()
    {
        try {
            $pdo = new PDO($this->dsn(), DB_USER, DB_PASS);
            // get only associative array
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            return $pdo;
        } catch (PDOException $e) {
            return "Exception:" . $e->getMessage();
        }
    }
```

### 快速操作执行 ::exec

执行 SQL 语句，并返回受影响的行数。

可以用这个来直接做简单的数据库操作。

例如：

```PHP
$count = $pdo->exec("DELETE FROM fruit");
```

知识点链接：[PDO::exec](https://www.php.net/manual/en/pdo.exec.php)

还可以通过 **lastInsertId()** 来获取最后插入行的 ID 或序列值（挺有用的）。

### 快速执行查询 ::query & fetchAll

### 修改查询属性 ::setAttribute

在连接数据库那一节案例中有（设置了返回的结果集未关联数据，默认是 BOTH，返回关联及索引数组）。

### 单条查询操作 ::fetch()

> 它是递归（？是这么叫吗）查询，每查一次指针指向下一条

我们可以使用循环，来实现 fetchAll 的效果，比如：

```PHP
while($field = $query->fetch())
{
    echo sprintf("标题：%s\t作者：%s<br/>", $field['title'],
    $field['author']);
}
```

### 预准备的语句执行操作

> 在数据库层面，解决了 SQL 注入的问题

其实就是把语句及参数分开发送，因为参数不是直接写到语句里面，所以也不担心注入。

发送语句用 prepare()

发送参数用 execute()

返回的结果为 bool 值，也就是说 get 方法无法用这个。

### 链式查询（查询构造器）

通过定义可选项数组，然后通过对可选项传参，返回新的可选项数组，来实现查询构造器。

例如：

```PHP
protected $options = [
    'table' => '', 'field' => ' * ', 'order' => '', 'limit' => '', 'where' => ''
];

// ...

public function field(...$fields)
{
    $this->options['field'] = '`' . implode('`,`', $fields) . '`';
    return $this;
}

// ...
```
