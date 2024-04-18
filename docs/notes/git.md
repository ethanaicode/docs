# Git

## 常用基础命令

- `git init` - 初始化仓库

- `git clone` - 拷贝远程仓库

- `git status` - **显示变更**

- `git add .` - 添加文件到暂存区

- `git commit -m [message]` - 提交到仓库，注释为 message

- `git restore .` - 撤销修改（version 2.23+）

  `.` 表示全部，如果要撤销单个文件可以指定文件名

  `--hard` 可以加上参数，来硬撤回

- `git switch` - 更换分支（version 2.23+）

  `-c` 创建并切换到新分支

- `git checkout` - 更换分支/创建分支/丢弃修改/切到特定的提交版本

  `-b [branch name]` 如果没有分支则创建

  `-- [.]/[file_name]` 撤销未提交的改变

  `[commit_hash_or_tag]` 输入 hash 或者 tag 可以切到具体版本

- `git merge xxx` - 合并 xxx 分支到当前分支

- `git push` - 推送到远程分支

  git push <远程主机名> <本地分支名>:<远程分支名>

- `git pull` - 拉取远程分支

  git pull <远程主机名> <远程分支名>:<本地分支名>

  （如果远程分支名和本地分支名一样，可以省略":<本地分支名>"）

- `git log` - 查看提交历史

- `git branch` - 列出本地分支

  `-r` 列出远程分支

  `-a` 列出本地远程所有分支

  `[branchname]` 创建新的分支

## git 使用技巧

### 添加空文件夹

git 默认会忽略空文件夹，应该因为它认为这种文件没有什么太大的意义。

但是有些使用场景下，我们可能需要提交一些空的文件夹，以达到某种特定的目的。

我们可以用两种方法来实现这个效果：

1.为空文件夹添加 `.gitkeep` 文件(推荐)

这个文件它本身是没有意义的，git 好像也没有赋予它特殊使命，更像是团队使用者之间的一种约定，仅仅是为了标记这个空的文件夹是需要添加到仓库的。

```bash
find ./ -type d -empty -exec touch {}/.gitkeep \;
```

2.为空文件夹添加 `.gitignore` 文件

用过 git 的老用户都知道 .gitignore 是为了忽略一些对项目无用的文件而设置的，我们添加这个文件也可以实现这个效果，但是不是最佳的，因此推荐用第一种（因为它本身是有意义的）。

### 更改 Git 代理配置（http.proxy）

如果用了科学工具，有时候就需要更改下代理端口，可以通过下面命令来获取当前的 `http.proxy` 配置：

```bash
git config --global --get http.proxy
```

如果需要修改，则可以这样：

```bash
git config --global http.proxy http://127.0.0.1:7890
```

http://127.0.0.1:7890可以改成你自己的代理服务及端口。

去掉这个设置：

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### Git 区分文件名大小写

```bash
git config core.ignorecase false
```

如果提交了，你之后即使在本地更改文件夹大小写，也不影响线上的版本，但在服务器上，就很容易出问题。

所以一定要修改成正确的，解决方法就是通过把要修改的文件夹名改成临时的，提交后，再改回正确的，这样就完成了修改。

**解决办法**

```bash
# 将要修改的文件夹名称改为临时的，比如 Temp
mv incorrectFolder tempFolder
git add tempFolder
git commit -m "Temporary folder name change to fix case"
# 再将 Temp 改成正确的目录名称
mv tempFolder correctFolder
git add correctFolder
git commit -m "Fix folder name case"
# 之后提交就能解决问题
git push origin branch_name
```

## 工具推荐

### gitkraken

> 自用 Git 工具，可视化的分支，管理起来非常方便，也支持控制台操作。
>
> 免费用户不支持管理私有库，但依然非常推荐。
>
> 更新@2024-01-29，已不再推荐，年费太贵了，换个免费的吧。

[![Ethan_2023-02-20_21-34-03.png](https://img.shejibiji.com/2023/02/20/63f37704e4079.png)](https://img.shejibiji.com/2023/02/20/63f37704e4079.png)
