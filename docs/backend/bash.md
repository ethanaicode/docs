# Bash

> bash 写的脚本记得加上执行权限，`chmod +x filename`。
>
> 命令都支持直接在 Bash 命令行中使用，不需要写在脚本中。

## 开始学习

让我们从一个示例开始，下面脚本列举了最常用的语法和解释：

```bash
#!/usr/bin/env bash

# 让脚本更安全（推荐）
set -euo pipefail
# -e : 任意命令出错立即退出
# -u : 使用未定义变量时报错
# -o pipefail : 管道中任一命令出错都会导致整体失败

# ============================================================
# 检查命令是否存在
# ============================================================
if ! command -v date >/dev/null 2>&1; then
  echo "❌ Error: date command not found!"
  exit 1
fi
echo "Starting script at: $(date '+%Y-%m-%d %H:%M:%S')"

# ============================================================
# 读取用户输入
# ============================================================
read -p "首先请告诉我你的名字: " USER_NAME
echo "你好, $USER_NAME!"
# 注意: -s 选项用于隐藏输入（适合密码）
read -s -p "让我们尝试输入密码，这不会显示: " USER_PASS
echo -e "\n密码已接收。"
# -e 选项允许 echo 解释转义字符（如 \n 换行）

# ============================================================
# 解析参数与 --选项
# ============================================================
COUNT=1
VERBOSE=false
ARGS=()

# 使用 while 循环逐个处理参数
while [[ $# -gt 0 ]]; do
  case "$1" in
    --count)
      COUNT="$2"
      shift 2
      ;;
    --verbose)
      VERBOSE=true
      shift
      ;;
    --help)
      echo "用法: $0 [args] [--count N] [--verbose]"
      exit 0
      ;;
    *)
      ARGS+=("$1") # 保存普通参数
      shift
      ;;
  esac
done

# 现在 "$@" 已被消耗，剩下的都存到 ARGS 数组里
# $@ 表示“所有位置参数”，
# shift 命令会左移参数列表，通常消耗掉已经处理过的参数

# ============================================================
# if 判断与字符串比较
# ============================================================
if [[ "$VERBOSE" == true ]]; then
  echo "🪄 Verbose 模式开启"
fi

if [[ -z "${ARGS[*]:-}" ]]; then
  echo "⚠️ 没有提供任何位置参数"
else
  echo "你提供了 ${#ARGS[@]} 个位置参数。"
  echo "参数列表: ${ARGS[*]}"
fi

# ============================================================
# trap 捕获退出信号
# ============================================================
TMPDIR=$(mktemp -d)
trap 'echo "🧹 清理临时目录 $TMPDIR"; rm -rf "$TMPDIR"' EXIT
# 这条命令会在脚本退出时执行（无论正常还是错误）
# 常用于清理临时文件或关闭资源

# ============================================================
# 复合命令执行 (&&, ||, ;)
# ============================================================
echo "现在开始演示复合命令："
# 模拟生成临时文件
touch "$TMPDIR/test.txt" && echo "✅ 成功创建临时文件。" || echo "❌ 创建临时文件失败。"
echo "总是会执行这句。"

# ============================================================
# shopt 与 nullglob
# ============================================================
# nullglob: 防止通配符匹配不到文件时报错
# 默认情况下, 没匹配到文件时通配符会原样返回
shopt -s nullglob  # 打开 nullglob
# 查找临时目录下所有 .txt 文件
TXT_FILES=("$TMPDIR"/*.txt)
# 数量比较符号: -eq, -ne, -gt, -lt, -ge, -le
if [[ ${#TXT_FILES[@]} -eq 0 ]]; then
  echo "⚠️ 没有找到任何 .txt 文件。"
else
  echo "找到以下 .txt 文件:"
  # ============================================================
  # 循环与操作
  # ============================================================
  for file in "${TXT_FILES[@]}"; do
    echo " - $file"
  done
fi
shopt -u nullglob  # 恢复默认行为

# ============================================================
# exit 码说明
# ============================================================
rm -rf "$TMPDIR"  # 手动清理临时目录
# exit 0 表示成功退出
echo "✅ 脚本执行完成，正常退出"
trap - EXIT  # 移除 trap
exit 0
```

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

例如；

```bash
for size in 16 32 48 64 128 256 512; do
  magick input.png \
    -resize ${size}x${size} output@${size}.png
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

可以结合find命令来快速对文件进行批量处理：

```bash
# 比如现在有一组 .gz 文件，无法确定是否位 tar 包，可以用命令来快速筛选
mkdir -p tar_gz

find . -type f -name "*.gz" ! -path "./tar_gz/*" -print0 |
while IFS= read -r -d '' f; do
  if tar -tzf "$f" >/dev/null 2>&1; then
    echo "TAR.GZ -> $f"
    mv "$f" tar_gz/
  fi
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
