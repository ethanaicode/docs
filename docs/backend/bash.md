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

可以使用 `$?` 来获取上一个命令的退出状态码。

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

## 案例参考

### 不显示错误消息

执行命令时，如果不想显示错误消息，可以使用 `2>/dev/null`，它表示将错误消息重定向到 `/dev/null`。

### 添加环境变量 PATH

如果在非交互式 shell 中执行脚本，不会加载通常在交互式登录时读取的某些环境变量（如 `.bash_profile`、`.bash_login` 或 `.profile`）。

可以在脚本中主动添加环境变量，如:

```bash
# 定义PATH
export PATH="/usr/local/bin:/usr/bin:/bin"
```
