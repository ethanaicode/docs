# Vim

## Vim 基础命令

Vim 是一个非常强大的文本编辑器，它分为三种模式：Normal 模式、Insert 模式和 Visual 模式。

在不同的模式下，Vim 的操作方式也不同。

### Normal 模式

**光标移动**

- `$`: 光标跳转到行尾

- `0`: 光标跳转到第一个字符

- `^`: 光标跳转到第一个非空字符

- `w`: 跳转到下一个单词的开头

- `b`: 跳转到上一个单词的开头

- `gg`: 跳转到文件开头

- `GG`: 跳转到文件结尾

- `:n`: 跳转到第 n 行

- `h` `j` `k` `l`: 左下上右(相当于方向键)

**内容编辑**

- `y`: 复制

- `yy`: 复制当前行

- `x`: 剪切当前字符(也可以用于删除当前字符)

- `X`: 剪切前一个字符

- `p`: 粘贴

- `P`: 粘贴到当前行的前面

- `d`: 删除

- `dd`: 剪切当前行

- `ddp`: 将当前行和下一行交换（其实就是删除当前行，然后粘贴到下一行）

- `u`: 撤销

- `a`: 在当前字符后插入新字符

- `i`: 在当前字符前插入新字符

- `I`: 在当前行首插入新字符

- `o`: 在当前行下面插入新行

- `r`: 替换当前字符

- `R`: 替换当前字符及后续字符

- `ci"`: 修改双引号内的内容

**查找及替换**

- `/`: 搜索

- `n/N`: 下一个/上一个搜索结果

- `:s/old/new/g`: 替换当前行中的所有 old 为 new

> :{作用范围}s/{目标}/{替换}/{替换标志}

作用范围包括：

- `.`: 当前行

- `1,5`: 1 到 5 行

- `%`: 所有行

替换标志包括：

- `g`: 全局替换

- `c`: 替换前询问（y/n/a/q/l 分别表示：yes/no/all/quit/last）

**翻页**

- `Ctrl + f`: 向下翻页(相当于 PageDown)

- `Ctrl + b`: 向上翻页(相当于 PageUp)

**其他**

- `:q`: 退出

- `:set number`: 显示行号(set number 可以简写为 set nu)

- `:set nonumber`: 隐藏行号(set nonumber 可以简写为 set nonu)

- `:set autoindent`: 自动缩进

- `:set noautoindent`: 取消自动缩进

- `:set expandtab`: 将 tab 转换为空格

- `:set noexpandtab`: 将空格转换为 tab

- `:set tabstop=4`: 设置 tab 键的宽度为 4 个空格

- `:set shiftwidth=4`: 设置自动缩进的宽度为 4 个空格

- `:set ignorecase`: 搜索时忽略大小写

- `:set noignorecase`: 搜索时区分大小写

- `:set hlsearch`: 高亮搜索结果

- `:set nohlsearch`: 取消高亮搜索结果

- `:set incsearch`: 实时搜索

- `:set noincsearch`: 取消实时搜索

- `:set list`: 显示不可见字符

- `:set nolist`: 隐藏不可见字符

- `:set wrap`: 自动换行

- `:set nowrap`: 取消自动换行

- `:set mouse=a`: 启用鼠标

- `:set mouse=`: 禁用鼠标

### Insert 模式

Insert 模式是用于输入文本的模式，可以通过 Normal 模式下的 `i`、`a`、`o` 等命令进入 Insert 模式。

### Visual 模式(可视模式)

Visual 模式是用于选中文本的模式，选中文本后可以对选中的文本进行操作。

- `v`: 进入 Visual 模式

  Visual 模式下，可以选中一段文本，然后对这段文本进行操作

- `V`: 进入 Visual Line 模式

  Visual Line 模式下，可以选中一行文本，然后对这行文本进行操作

- `Ctrl + v`: Visual Block 模式

  Visual Block 模式下，可以选中一个矩形区域，然后对这个区域进行操作

## nano 编辑器(类似于 Vim)

nano 是一个简单易用的文本编辑器，适合初学者使用。

在这里简单介绍一下 nano 的基本使用方法。

### 基本操作

- `Ctrl + G`: 显示帮助

- `Ctrl + X`: 退出

- `Ctrl + O`: 保存

- `Ctrl + W`: 搜索

- `Ctrl + K`: 剪切
