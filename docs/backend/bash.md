# Bash

> bash 写的脚本记得加上执行权限，`chmod +x filename`。

## 基础语法

- `#!`: 脚本解释器

  如果想要使用 bash 解释器，可以在脚本的第一行添加 `#!/bin/bash`。

- `echo`: 输出

- `#`: 注释

- `;`: 命令分隔符

  分隔多个命令。

- `&&`: 逻辑与

  只有当第一个命令成功执行后，才会执行第二个命令。

- `||`: 逻辑或

  只有当第一个命令执行失败后，才会执行第二个命令。

- `>`: 重定向

  将命令的输出重定向到文件。(可以实现输出到文件的操作)

- `\`: 转义字符

  如果想要在一行中写多个命令，可以使用 `\`来换行。

- `[ ]`: 条件测试，等同于 `test` 命令（一种语法糖）

  `[ condition ]` 条件成立时执行命令，等同于 `test condition`。

- `exit`: 退出脚本

  `exit 0` 表示正常退出，`exit 1` 表示异常退出。

## 数据类型

在 Bash 脚本中，变量没有显式的数据类型，都被视为字符串，除非在特定上下文中需要解释为其他类型（如整数或数组）。

### 数组

Bash 支持一维数组（无内置多维数组支持）。可以使用下标访问数组元素，下标从 0 开始。

```bash
array=(value1 value2 value3)
```

- `${array[index]}`: 访问数组元素

- `${array[@]}`: 获取数组中的所有元素

  可以结合 `for` 循环使用，如: `for i in ${array[@]}; do echo $i; done`

- `${#array[@]}`: 获取数组的长度

- `${#array[index]}`: 获取数组中某个元素的长度

- `array+=(value)`: 添加元素到数组

### 关联数组

Bash 4.0 之后支持关联数组，可以使用字符串作为索引。

在声明数组前，需要使用 `declare -A` 来声明关联数组。

```bash
declare -A array
array=([key1]=value1 [key2]=value2)
```

- `${array[key]}`: 访问数组元素

- `${!array[@]}`: 遍历键

- `${array[@]}`: 遍历值

- `${#array[@]}`: 获取数组的长度

- `array[key]=value`: 添加元素到数组

- `unset array[key]`: 删除数组元素

  `unset array` 清空数组

**注意**: 关联数组只能在 Bash 4.0 之后使用，键和值都是字符串，不能是数字、数组或其他类型。

如果不是必要的话，推荐使用两个数组 `keys` 和 `values` 来模拟关联数组，以避免兼容性问题。

```bash
keys=(key1 key2)
values=(value1 value2)
```

### 文件描述符

Bash 支持文件描述符，可以用来重定向输入和输出。

- `0`: 标准输入

- `1`: 标准输出

- `2`: 标准错误

- `n`: 自定义文件描述符

### 命令/进程返回值

在 Bash 脚本中，每个命令都会返回一个退出状态码，用于表示命令执行的结果。

- `0`: 表示成功

- `1-255`: 表示失败

## 变量

> 知识链接: [Shell 中的变量](./linux#shell-中的变量)

### 定义变量

```bash
variable=value
```

- `variable`: 变量名

- `value`: 变量值

### 使用变量

```bash
echo $variable
```

### 特殊变量

Bash 提供了一系列特殊变量，用于处理脚本运行时的状态、进程信息和传递的参数等。

- `$0`: 脚本名称

- `$1-$9`: 脚本参数

- `$#`: 参数个数

- `$@`: 所有参数，每个参数都是一个独立的字符串

- `$*`: 所有参数，将所有参数作为一个字符串

- `$?`: 上一个命令的退出状态码

- `$$`: 当前进程 ID

- `$!`: 后台运行的最后一个进程 ID

## 条件判断操作符

条件判断操作符，包括文件检查、字符串比较和整数比较等。常用的操作符有:

**整数比较**

- `-eq`: 等于

- `-ne`: 不等于

- `-gt`: 大于

- `-lt`: 小于

- `-ge`: 大于等于

- `-le`: 小于等于

**字符串比较**

- `=`: 等于

- `!=`: 不等于

- `-z string`: 字符串为空

- `-n string`: 字符串不为空

**文件检查**

- `-d file`: 检查文件是否存在并且是一个目录

- `-f file`: 检查文件是否存在并且是一个普通文件

- `-r file`: 检查文件是否存在并且可读

- `-w file`: 检查文件是否存在并且可写

- `-x file`: 检查文件是否存在并且可执行

## 分支

### if 语句

```bash
if [ condition ]; then
    command1
    command2
    ...
fi
```

- `condition`: 条件表达式

- `then`: 条件成立时执行的命令

- `fi`: 结束 if 语句

### if-else 语句

```bash
if [ condition ]; then
    command1
    command2
    ...
else
    command3
    command4
    ...
fi
```

## 循环

### for 循环

```bash
for variable in list
do
    command1
    command2
    ...
done
```

### while 循环

```bash
while [ condition ]
do
    command1
    command2
    ...
done
```

## 文件操作

### 输入输出重定向

- `>`: 输出重定向

- `>>`: 追加输出重定向

- `<`: 输入重定向

- `2>`: 错误重定向

- `2>&1`: 将标准错误流重定向到标准输出

  如: `command > output.log 2>&1`

- `&>`: 合并标准输出和错误输出(语法糖)

### read 读取数据

`read` <u>命令用于从标准输入读取数据。</u>

```bash
read variable
```

- `read` 命令从标准输入或文件中读取一行文本（默认以换行符为行分隔符），并将这一行的内容赋值给指定的变量。

- 如果没有指定变量，`read` 命令会将读取的文本赋值给特殊变量 `$REPLY`。

- 如果标准输入是多行，每次调用 `read` 命令都只会读取下一行。

支持多个参数：

- `-p`: 提示信息

- `-r`: 不转义反斜杠

- `-t`: 超时时间

- `-n`: 读取字符数

- `-s`: 隐藏输入

在 read 前面，我们可以使用`IFS`来设置分隔符，如：

```bash
IFS=: read var1 var2 var3
```

#### 示例

**读取文本文件**

下面是一个例子，它会从文件中读取每一行，并把值存储到数组中，然后打印数组：

```bash
# Define a empty array
array=()

# Read file line by line
while IFS= read -r line; do
    array+=("$line")
done < file.txt

# Print array
echo "${domains[@]}"
```

**读取用户输入**

下面是一个批量处理文件的例子，它会用 `find` 先找到所有的文件，然后用 `read` 逐个处理：

```bash
find . -type f -name "*.txt" | while read file; do
    echo "Processing $file"
done
```

## 进程管理

### 进程控制

- `&`: 后台运行，如 `command &` 表示在后台运行命令

- `wait`: 等待进程结束，如 `command & wait` 表示等待后台进程结束

- `jobs`: 查看后台进程

- `fg`: 将后台进程切换到前台，如 `fg %1` 表示将后台第一个进程切换到前台

- `bg`: 将前台进程切换到后台，如 `bg %1` 表示将前台第一个进程切换到后台

- `disown`: 使进程脱离 shell 控制，适用于长时间运行的任务，

  如 `disown %1` 表示使第一个进程脱离 shell 控制

- `trap`: 捕获信号，如 `trap 'command' signal` 表示捕获信号后执行命令

- `kill`: 终止进程，如 `kill -9 pid` 表示强制终止进程

- `timeout`: 设置超时，如 `timeout 10s command` 限制 command 命令最多运行 10 秒

### 信号

- `SIGINT`: 中断信号，如 `Ctrl+C`

- `SIGTERM`: 终止信号，如 `kill pid`

- `SIGHUP`: 挂起信号，如 `kill -HUP pid`

- `SIGKILL`: 强制终止信号，如 `kill -9 pid`

## 使用技巧

### 不显示错误消息

执行命令时，如果不想显示错误消息，可以使用 `2>/dev/null`，它表示将错误消息重定向到 `/dev/null`。

### 添加环境变量 PATH

如果在非交互式 shell 中执行脚本，不会加载通常在交互式登录时读取的某些环境变量（如 `.bash_profile`、`.bash_login` 或 `.profile`）。

可以在脚本中主动添加环境变量，如:

```bash
# 定义PATH
export PATH="/usr/local/bin:/usr/bin:/bin"
```
