## PHP 基础知识

## PHP 命令

- `php -m`: 查看已经安装的模块

- `php -v`: 查看版本

- `php -S localhost:8000`: 启动一个简单的服务器

- `php -a`: 进入交互模式

- `php -i`: 查看 php 配置

  `php -i | grep php.ini`: 查看 php.ini 文件路径

## PHP 常用方法

### 数组相关

#### [array_column()](https://www.php.net/manual/zh/function.array-column) 返回输入数组中指定列的值

> array*column(\_array*,_column_key_,_index_key_);

案例：

```PHP
    protected $grade_info=[
        [   'key' => 1,
            'name' => '临时粉',      ],
        [   'key' => 2,
            'name' => '普通会员',    ],
    ];

    $gradeLevel=array_column($this->grade_info,'name','key');
```

- 实现：返回输入数组中某个单一列的值

可以用来对公用的数组进行调用。

也可以把数组降低维度，比如三维的转成二维的，如案例中的那样。

其中`index_key`是可选项，用作返回数组的索引/键的列。

**column_key**也可以是 **`null`** ，此时将返回整个数组（配合 **`index_key`** 参数来重新索引数组时非常好用）。

#### [array_key_exists()](https://www.php.net/manual/en/function.array-key-exists.php) 检查数组里是否有指定的键名或索引

> array_key_exists(string|int `$key`, array `$array`): bool

用来检查键名或者索引是否存在于某个数组中。

```PHP
$userInfo = DB::link()->table('user')->field('userId', 'userName')->get();
$userInfo = array_column($userInfo, 'userName', 'userId');
foreach ($result as $key => $value) {
    if (array_key_exists($value['user_id'], $userInfo)) {
        $result[$key]['user_name'] = $userInfo[$value['user_id']];
    } else {
        $result[$key]['user_name'] = 'invalid username';
    }
}
```

#### [array_unique()](https://www.php.net/manual/zh/function.array-unique.php) 移除数组中重复的值

注意键名保留不变（意味着可以保留以前的键名，为之后的操作留下方便）。

如果在指定了 `flags` 时存在多个相等的元素， 会保留第一个相等的元素的键（key）和值（value）。

> array_unique(array `$array`, int `$flags` = **`SORT_STRING`**): array

**`array`**

输入的数组。

**`flags`**

第二个可选参数`flags` 可用于修改比较行为：

比较类型标记：

- `SORT_REGULAR` - 按照通常方法比较（不修改类型）
- `SORT_NUMERIC` - 按照数字形式比较
- `SORT_STRING` - 按照字符串形式比较
- `SORT_LOCALE_STRING` - 根据当前的本地化设置，按照字符串比较。

#### [array_filter()](https://www.php.net/manual/zh/function.array-filter.php) 过滤数组的元素

> array_filter(array `$array`, ?[callable](https://www.php.net/manual/zh/language.types.callable.php) `$callback` = **`null`**, int `$mode` = 0): array

可以用来过滤掉 null 或者 empty 值

#### [array_map()](https://www.php.net/manual/zh/function.array-map.php) 为数组的每个元素应用回调函数

> array_map(?[callable](https://www.php.net/manual/zh/language.types.callable.php) `$callback`, array `$array`, array `...$arrays`): array

```PHP
// get all project_leader_ids，
$projectLeaderIds = array_map(function ($item) {
    return explode(',', $item);
}, $projectLeaderIds);
```

#### [array_intersect_key()](https://www.php.net/manual/zh/function.array-intersect-key.php) 使用键名比较计算数组的交集

就是比较键名，如果一样就放入新的数组中，和顺序无关（就不用再使用 foreach 来实现了）。

三个方法可以一起使用，来实现根据数组中的某一个 id(本例为 rentaiunitId)去重的效果，例如：

```PHP
// Extracting the rentaiunitId column as a separate array
$rentaiunitIds = array_column($result['data'], 'rentaiunitId');

// Removing duplicate rentaiunitIds and preserving the original keys
$uniqueRentaiunitIds = array_unique($rentaiunitIds, SORT_REGULAR);

// Creating a new array with unique entries based on rentaiunitId
$uniqueData = array_intersect_key($result['data'], $uniqueRentaiunitIds);
```

#### implode() / explode()

> implode(_separator,array_)

*separator*可选，规定数组元素之间放置的内容。默认是 ""（空字符串）。

实现：把数组元素组合为一个字符串(或者把数组打散成字符串)

知识点链接：[PHP implode()函数](https://www.runoob.com/php/func-string-implode.html)

#### in_array($value, $params)

- 可以判断值是否在数组中

#### array_keys() 返回键名

#### array_slice()、array_splice()

> array*slice(\_array,start,length,preserve*)
>
> array*splice(\_array1,start,length,array2*)

- 实现：array_slice() 函数返回数组中的选定部分
- array_splice() 函数从数组中移除选定的元素，并用新元素取代它

利用这个可以取出或者移除自己想要的元素，头两个参数都是必需的，这两个默认都会重置数组索引。

这两个和 unset()很类似。

如果 array_slice()中，参数 preserve 为 false，则不会重置索引

知识点链接：[PHP array_slide()函数](https://www.runoob.com/php/func-array-slice.html)

#### [array_chunk()](https://php.net/manual/en/function.array-chunk.php) 分割数组

> array_chunk(array `$array`, int `$length`, bool `$preserve_keys` = `false`): array

- 将一个数组分割成多个

例如下面这个，就可以将长字符串分割，并选取指定行的内容，其余内容再放到下一页。

```PHP
$tempContent = explode("\n", $content);
$tempContent = array_chunk($tempContent, $maxContentLinesCount);
$content = implode("\n", $tempContent[0]);
```

#### array_push() 追加元素

> array*push(\_array,value1,value2...*)

- 向数组尾部插入一个或多个元素

即使您的数组有字符串键名，您所添加的元素将是数字键名

#### [array_merge() ](https://php.net/manual/en/function.array-merge.php) 合并一个或多个数组

> array_merge(array `...$arrays`): array

可以实现一维数组后面继续追加另一个一维数组

#### [array_multisort()](https://www.php.net/manual/zh/function.array-multisort.php) 对多个数组或多维数组进行排序

> array_multisort( array `&$array1`, [mixed](https://www.php.net/manual/zh/language.types.declarations.php#language.types.declarations.mixed) `$array1_sort_order` = SORT_ASC, [mixed](https://www.php.net/manual/zh/language.types.declarations.php#language.types.declarations.mixed) `$array1_sort_flags` = SORT_REGULAR, [mixed](https://www.php.net/manual/zh/language.types.declarations.php#language.types.declarations.mixed) `...$rest` ): bool

#### [ksort()](https://www.php.net/manual/zh/array.sorting.php) 等多个对数组排序的方法

> ksort(array `&$array`, int `$flags` = **`SORT_REGULAR`**): true

- 对数组根据键名升序排序

还有多个排序方法，可以根据键或者值来排序，具体可以点击标题查看官方完整文档

#### [array_diff()](https://www.php.net/manual/zh/function.array-diff.php) 计算数组的差集

> array_diff(array `$array`, array `...$arrays`): array

- 仅仅保留不在后面数组的值

### 字符串相关

#### substr() - 分割字符串

> substr(_string,start,length_)
>
> start：必需，规定在字符串的何处开始
>
> - 正数 - 在字符串的指定位置开始
> - 负数 - 在从字符串结尾的指定位置开始

- 实现：substr() 函数返回字符串的一部分

#### sublen() - 统计字符串长度

#### trim() - 移除空格

> trim(_string,\*\*charlist_)

案例：

```PHP
$name = trim($name);  //去除名字两边的空格
```

- 实现：移除字符串两侧的空白字符或其他预定义字符

如果第二个参数不给的，默认移除所有空格、换行等。

知识点链接：[PHP trim() 函数](https://www.runoob.com/php/func-string-trim.html)

#### rtrim() - 移除末尾空格（可以是预定义的字符）

案例：

```PHP
// 拼接字符串，最后删除最后一个多余的符号

$customerIdString .= $value['customer_id'] . ',';
$customerIdString = rtrim($customerIdString, ',');
```

#### str_pad 填充字符串长度

使用另一个字符串填充字符串为指定长度

> str_pad( string `$string`, int `$length`, string `$pad_string` = " ", int `$pad_type` = `STR_PAD_RIGHT` ): string

比如用字符串制表的时候这个就非常有用了，例如：

```PHP
public function handleFormat()
{
    // fake data
    $data = [
        [
            'name' => 'Sondertarif',
            'unit' => '1.0',
            'price' => '165.00',
            'total' => '165.00',
        ],
        [
            'name' => 'Wochen-Pauschale ',
            'unit' => '1.0',
            'price' => '0.00',
            'total' => '0.00',
        ],
        [
            'name' => 'Zusatz-Tag-Preis',
            'unit' => '1.0',
            'price' => '70.00',
            'total' => '70.00',
        ],

    ];
    $length = 12;
    foreach ($data as $key => $value) {
        $data[$key]['name'] = str_pad($value['name'], $length + 6, ' ', STR_PAD_RIGHT);
        $data[$key]['unit'] = str_pad($value['unit'], $length, ' ', STR_PAD_LEFT);
        $data[$key]['price'] = str_pad($value['price'], $length, ' ', STR_PAD_LEFT);
        $data[$key]['total'] = str_pad($value['total'], $length, ' ', STR_PAD_LEFT);
    }

    // transform array to string
    $content = '';
    foreach ($data as $key => $value) {
        $content .= $value['name'] . $value['unit'] . $value['price'] . $value['total'] . "\n";
    }
    $content = substr($content, 0, -1);
    return $content;
}

// Please see the picture below for the output
```

![img](https://pic.shejibiji.com/i/2024/04/16/661e1ef9b63b3.png)

#### highlight_string(string) - 语法高亮

> highlight*string(\_string,return*)

- 实现：对字符串进行 PHP 语法高亮显示

highlight_string() 函数对字符串进行 PHP 语法高亮显示。字符串通过使用 HTML 标签进行高亮。

用于高亮的颜色可通过 php.ini 文件进行设置或者通过调用 ini_set() 函数进行设置。

#### htmlentities(string) - 字符串转 HTML

> htmlentities(_string,flags,character-set,double_encode_)

案例：

```PHP
$str = "<p>操作文档尚未完成编辑</p>";
echo htmlentities($str);
>>> <p>操作文档尚未完成编辑</p> //正常输出，并未转成html
```

- 实现：把字符转换为 HTML 实体

展示代码时，这个就比较好用，避免被 html 给输出了

#### preg_match() - 正则匹配

> int preg_match ( string $pattern , string $subject [, array &$matches [, int $flags = 0 [, int $offset = 0 ]]] )

- preg_match 函数用于执行一个正则表达式匹配。

#### iconv() - 字符串转码

> iconv(string `$from_encoding`, string `$to_encoding`, string `$string`): string|false

例如：

```PHP
// 解决部分文字出现奇怪符号
$grandNameTextMore = iconv('UTF-8', 'windows-1252', $grandNameTextMore);
```

### URL 相关

**parse_url()**

> 解析 URL，并返回 url 的组成部分
>
> parse_url(string `$url`, int `$component` = -1): int|string|array|null|false

```PHP
$uri = rtrim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
```

- 实现：获取上传文件的后缀，或者请求 URL 的部分地址

知识点链接：[parse_url](https://www.php.net/manual/en/function.parse-url)

**http_build_query**

> http*build_query(\_query_data*)
>
> query_data：必需，规定要转换的数组

- 实现：生成 URL-encode 之后的请求字符串

**urlencode**

> urlencode(_string_)

- 实现：对 URL 字符串进行编码

### 数字相关

#### [round](https://www.php.net/manual/zh/function.round.php) 四舍五入取整

> round(int|float `$num`, int `$precision` = 0, int `$mode` = `PHP_ROUND_HALF_UP`): float

#### [ceil](https://www.php.net/manual/zh/function.ceil.php) 进一法取整

> ceil(int|float `$num`): float

- 向上取整，比如 1.4，则返回 2。返回值为浮点数。

另外还有 **floor** 向下取整；

**intval** 对变数转成整数。

#### **number_format()**

案例：

```PHP
$num = 195863.3333;
$num_format = number_format($num,2);
>>>195,863.33
```

- 实现：数字格式化

推荐就传入两个参数，第二个是要保留的小数点位置，如果不传，则默认取整数。

#### [uniqid()](https://www.php.net/manual/zh/function.uniqid.php) 生成一个唯一 ID

> uniqid(string `$prefix` = "", bool `$more_entropy` = **`false`**): string

获取一个带前缀、基于当前时间微秒数的唯一 ID。

**参数\*\***[ ](https://www.php.net/manual/zh/function.uniqid.php#refsect1-function.uniqid-parameters)\*\*

**`prefix`**

有用的参数。例如：如果在多台主机上可能在同一微秒生成唯一 ID。

`prefix`为空，则返回的字符串长度为 13。`more_entropy` 为 `true`，则返回的字符串长度为 23。

**`more_entropy`**

如果设置为 `true`，uniqid() 会在返回的字符串结尾增加额外的熵（使用线性同余组合发生器）。 使得唯一 ID 更具唯一性。

### 时间相关

#### **data()、strtotime()**

案例：

```PHP
//时间截断
//$v->create_time 为 2022-10-26 17:47:42
//处理后为 2022-10-26
date( 'Y-m-d ',strtotime($v->create_time));


//截止日期的玩法
//$num为你想延后的时间，单位可以为hour、day、month、year
$new_time = date('Y-m-d H:i:s',strtotime("+$num hour",strtotime($old_time)));
```

实现：时间截断、截止日期

#### 插件：Carbon

知识点链接：[Carbon](https://github.com/briannesbitt/Carbon)

### 方法相关

#### **call_user_func**

> 把第一个参数作为回调函数调用
>
> call_user_func([callable](https://www.php.net/manual/zh/language.types.callable.php) `$callback`, [mixed](https://www.php.net/manual/zh/language.types.declarations.php#language.types.declarations.mixed) `...$args`): [mixed](https://www.php.net/manual/zh/language.types.declarations.php#language.types.declarations.mixed)

#### func_get_args()

获取调用方法时的参数。

### 文件相关

#### [scandir() - 列出文件和目录](https://www.php.net/manual/zh/function.scandir.php)

> scandir(_directory,sorting_order,context_);

#### [fopen() - 打开文件](https://www.php.net/manual/zh/function.fopen.php)

#### fputcsv() - 将行格式化为 CSV 并写入一个打开的文件中

> fputcsv(file,fields,seperator,enclosure)

#### [file_put_contents() - 把一个字符串写入文件](https://www.php.net/manual/zh/function.file-put-contents.php)

> int file_put_contents ( string $filename , mixed $data [, int $flags = 0 [, resource $context ]] )

#### fgetcsv() - 解析一行 CSV 文件

> fgetcsv(file,length,separator,enclosure)

例如：

```PHP
<?php
$file = fopen("contacts.csv","r");

while(! feof($file))
{
print_r(fgetcsv($file));
}

fclose($file);
?>
```

#### fclose() - 关闭文件

### 其它拓展

#### **json_encode()**

> string json_encode ( $value [, $options = 0 ] )

#### **json_decode()**

> mixed json_decode ($json_string [,$assoc = false [, $depth = 512 [, $options = 0 ]]])

对 JSON 格式的字符串进行编码/解码

案例：

```PHP
$img=[
    0=>[
        'data_file'=>'[id=>238]',
        'height'=>'698',
        'type'=>'png',
        'url'=>'https://fuleituo.oss-cn-shanghai.aliyuncs.com/images/2022-05-21/9fd7dfb43ae3fbba086471ddba294198.png',
        'width'=>'1227',
        ],
];

//编解码不仅仅是名称的区别，需要的参数也不相同，切勿搞错！！
$data['img'] = json_encode($img,JSON_UNESCAPED_UNICODE); //编码
$img = json_decode($data['img'],true); //解码（加true为数组，否则为对象）
```

- 实现：数组转成 json 格式，方便数据库储存

知识点链接：[PHP JSON](https://www.runoob.com/php/php-json.html)

#### [serialize - 生成值的可存储表示](https://www.php.net/manual/zh/function.serialize.php)

> serialize(mixed $value): string

这有利于存储或传递 PHP 的值，同时不丢失其类型和结构。

想要将已序列化的字符串变回 PHP 的值，可使用 [unserialize()](https://www.php.net/manual/zh/function.unserialize.php)。

*通俗理解就是把数据及结构转成字符串存到数据库，要用的时候再转回去。*

#### unset()

> void unset ( mixed $var [, mixed $... ] )

销毁给定的变量。

#### sleep 延缓执行

> sleep(int $seconds): int

程序延迟执行指定的 `seconds` 的秒数。

*只能传整数，如果要用微妙请用usleep*

## 常见问题

### PHP 单引号和双引号的区别与用法

php 里的单引号把内容当成纯文本，不会经过服务器翻译。

而双引号则与此相反。里面的内容会经过服务器处理(process)。

> 说人话就是双引号支持变量，单引号会将文本原样输出

### require 和 include

他们大部分时候都是可以互换的。

但是`include`遇到问题会发出警告脚本继续运行，`require`则生成致命错误并停止运行程序。

### require_once 和 include_once

使用方法跟 require、include 一样，差别在于在引入文件前，会先检查文件是否已经在其他地方被引入过了，

若有，就不会再重复引入。
