# PHP 进阶知识

## 进阶知识

### 实用技巧

- **...参数**

  用于函数参数，可以接受任意数量的参数，可以用来代替数组。

  例如：

  ```PHP
  function sum(...$nums)
  {
      return array_sum($nums);
  }
  ```

- **file_get_contents()**

  用于读取文件内容，也可以用来读取远程文件，利用这个实现简单的接口请求。

  例如：

  ```PHP
  $response = file_get_contents('https://api.github.com/shejibiji/data');
  print_r(json_decode($response, true));
  ```

  **注意**: 如果服务器返回的状态码不是 200，`file_get_contents()` 会返回 `false`，而不会返回错误信息。

### PHP 的数据在内存中的存储位置

PHP 的数据在内存中的存储位置有两种：

- 栈内存：存储基本数据类型，如整型、浮点型、布尔型等。

- 堆内存：存储复杂数据类型，如数组、对象等。

> 堆(heap)和栈(stack)的区别：堆经典的实现是完全二叉树，栈是一种先进后出的数据结构，所以堆是一种树形结构，栈是一种线性结构。想象一下画面就比较好记了。

### 优化 PHP - FPM 配置

> PHP-FPM 配置文件位置（通常情况下）：/etc/php/{version}/fpm/php-fpm.conf

`pm.max_children` 允许创建的最大进程数，这个值越大，可以处理的并发请求数就越多。

`pm.start_servers` 启动时创建的进程数。

`pm.min_spare_servers` 最小空闲进程数（清理空闲进程后保留的最小进程数）。

`pm.max_spare_servers` 最大空闲进程数（当空闲进程数超过这个值时，就会被清理）。

`pm.max_children`的值一般可以根据内存来计算，一般会预留 20%内存给操作系统及其它服务，其余的可以根据每个 PHP 进程的平均内存消耗量（可以假设为 20MB），计算出合适的值。

假设内存为 2G，则可以计算出值大概为 84（2048 \* 0.8 / 20）

一般来说，可以将 `pm.min_spare_servers` 设置为 `pm.max_children` 的一定比例，比如 `pm.max_children` 的 10% - 20%。这样可以确保在任何时候都有足够的空闲进程可用来处理请求。

修改后记得重启 PHP-FPM：

```bash
sudo systemctl restart php-fpm
```

### PHP 编译安装相关知识

> 官方版本下载：[PHP 官方下载](https://www.php.net/releases/)

**PHP 的配置选项**

> 官方配置选项指南：[PHP 配置选项](https://www.php.net/manual/zh/configure.about.php)

PHP 的编译安装，需要先下载 PHP 源码，然后解压，进入解压后的目录，执行 `./configure` 命令，然后执行 `make` 和 `make install` 命令。

`./configure` 命令是用来检查系统环境，生成 Makefile 文件，Makefile 文件是用来编译 PHP 的。

**常用的配置推荐**

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

> interface 定义接口，和上面的抽象类类似，都是不在父类定义具体方法，只定义标准。
>
> 当你使用这个接口或者类时，需要在类中定义具体方法。

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

#### 构造函数及析构函数

> \_\_instruct() 构造函数，类开始时自动执行函数
>
> \_\_destruct() 析构函数，类结束时自动执行函数

一个是生，一个是死。

#### 魔术方法

##### **get && **set

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

##### **unset()和**isset()

> 分别是各自方法被使用时，调用这个魔术方法。

##### \_\_call()

> 找不到方法时，调用这个方法

https://www.bilibili.com/video/BV14x411o7SL?p=22&vd_source=e697d97c11963b497ea46a09033367c0

##### \_\_callStatic()

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

## PDO 连接

> 推荐教程：[打通 PHP 数据库任督二脉](http://bilibili.com/video/BV1v4411A74Q/?p=2)

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
