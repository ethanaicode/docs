# Git

## 基础命令

- **git init**: 初始化仓库

- **git clone**: 拷贝远程仓库

  （如果要自定义文件夹名，可以在后面加上文件夹名）

- **git status**: **显示变更**

- **git diff**: **显示变更内容**

- **git log**: 查看提交历史

  `--oneline` 可以加上参数，来显示简洁的提交历史

- **git add .**: 添加文件到暂存区

- `git commit -m [message]`: 提交到仓库，注释为 message

- **git restore .**: 撤销修改（version 2.23+）

  `.` 表示全部，如果要撤销单个文件可以指定文件名

  `--hard` 可以加上参数，来硬撤回

- **git reset**: 撤销提交（可以撤销未 commit 的改变）

  `--soft` 可以加上参数，来软撤回

  `--hard` 可以加上参数，来硬撤回

  可以通过`fetch`和`reset`来撤销未 pushed 的改变

- **git revert [commit_hash]**: 撤销某次提交

  会生成一个新的提交，这个提交是对之前提交的撤销

- **git rebase**: 变基

  `git rebase -i HEAD~[n]` 可以合并 n 个提交

  `git rebase -i [commit_hash]` 可以合并某个提交

- **git stash**: 暂存工作区

  `git stash list` 查看暂存列表

  `git stash pop` 恢复并删除暂存

  `git stash apply` 恢复不删除暂存

  `git stash drop` 删除暂存

- **git switch**: 更换分支（version 2.23+）

  `-c` 创建并切换到新分支

- **git checkout**: 更换分支/创建分支/丢弃修改/切到特定的提交版本

  `-b [branch name]` 如果没有分支则创建

  `-- [.]/[file_name]` 撤销未提交的改变（指定文件名）

  `[commit_hash_or_tag]` 输入 hash 或者 tag 可以切到具体版本

- **git merge xxx**: 合并 xxx 分支到当前分支

- **git push**: 推送到远程分支

  git push <远程主机名> <本地分支名>:<远程分支名>

- **git pull**`\*\*: 拉取远程分支

  git pull <远程主机名> <远程分支名>:<本地分支名>

  （如果远程分支名和本地分支名一样，可以省略":<本地分支名>"）

- **git fetch**: 拉取远程分支

  但是不会自动合并，需要手动合并

- **git branch**: 列出本地分支

  `-r` 列出远程分支

  `-a` 列出本地远程所有分支

  `[branchname]` 创建新的分支

  `-d [branchname]` 删除分支

## 配置管理

使用 `git config` 命令可以配置 git 的一些参数，比如用户名、邮箱、代理等。

Git 的配置分为三个级别：系统(`--system`)、用户(`--global`)、仓库(`--local`)。

它们的优先级是：仓库 > 用户 > 系统。

设置为全局，只需要加上 `--global` 参数即可。

```bash
git config --global user.name "yourname"
git config --global user.email "youremail"
```

另外如果你想对配置管理，可以使用下列命令：

- `--list` 查看配置
- `--unset` 移除配置
- `--get` 获取配置
- `--replace-all` 替换所有配置（这表示会覆盖原有的配置）
  ```bash
  git config --global --replace-all user.name "yourname"
  ```

### 常用配置

> 通过设置代理，可以加速或者解决无法下载或者提交的问题。

- `user.name` 用户名
- `user.email` 邮箱
- `http.proxy` 设置 HTTP 代理 (值为 http://proxy.com:port)
- `https.proxy` 设置 HTTPS 代理 (值为 http://proxy.com:port)
- `core.ignorecase` 区分文件名大小写（如果 false 区分大小写）
- `core.filemode` 是否检查文件权限（如果 false 忽略文件权限的变化）
- `core.editor` 编辑器
- `core.base` 默认分支名
- `core.repositoryformatversion` 仓库格式版本
- `core.precomposeunicode` 是否使用 Unicode
- `core.logallrefupdates` 是否记录所有引用更新
- `http.sslVerify` 是否验证 SSL 证书

### 本地配置

每个项目下都有一个 `.git/config` 文件，这个文件是本地的配置文件，它会覆盖全局的配置。

通常我们会在这个文件中配置一些项目特有的配置，比如远程仓库地址等。

- `url` 远程仓库地址

  你也可以把用户名和密码写在地址后面，这样就不用每次都输入用户名和密码了。

  ```bash
  [remote "origin"]
    url = https://<username>:<password>@<repository-url>
  ```

- `branch` 分支

  你可以设置默认的分支，这样每次 push 或者 pull 的时候就不用指定分支了。

  ```bash
  [branch "master"]
    remote = origin
    merge = refs/heads/master
  ```

**gitee 要注意的点**

- gitee 的仓库地址不能使用 token 名，只能使用用户名，加上 token 密钥。

- 用户名必须要全部小写，否则会报无效的用户名。

## 案例及技巧

### 开发实践

**开发分支**

可以通过创建开发分支来进行特性开发，然后合并到主分支。

```bash
git checkout -b feature-branch
```

开发完成后，可以合并到主分支。

```bash
git checkout master
git merge feature-branch
```

合并后，可以删除开发分支。

```bash
git branch -d feature-branch
```

**使用标签**

Git 标签（tag）是用于标记特定提交的版本快照，非常适合发布版本时使用。

创建标签： 在发布一个新的版本时，可以使用 git tag 创建一个标签：

```bash
git tag -a v1.0 -m "Version 1.0"
```

查看标签： 使用 git tag 命令可以查看所有标签。

```bash
git tag
```

推送到远程： 如果想要把标签推送到远程仓库，可以使用 git push 命令。

```bash
git push origin v1.0
```

如果想推送所有标签，可以使用 `--tags` 参数。

```bash
git push origin --tags
```

删除标签： 如果需要删除标签，可以使用 git tag -d 命令。

```bash
git tag -d v1.0
```

**管理多个版本**

当需要维护多个版本的应用时，你可以创建不同的分支来分别管理生产版本和开发版本。例如，你可以使用以下的分支结构：

- `master` 分支：用于发布生产版本。

- `develop` 分支：用于开发新特性。

- `release` 分支：用于发布新版本。

- `hotfix` 分支：用于修复生产版本的 bug。

- `feature` 分支：用于开发新特性。

**合并策略**

如果直接合并分支，Git 会创建一个新的合并提交，这样会使提交历史变得混乱。

为了保持提交历史的整洁，可以使用 `rebase` 命令来变基。

```bash
git checkout feature-branch
git rebase master
```

_要注意的是， `git rebase master` 实际上是在 `feature-branch` 分支上进行的操作。这个命令的意思是将 `master` 分支的最新提交变基到 `feature-branch` 分支上，目的是使 `feature-branch` 的历史记录保持与 `master` 一致，并将 `feature-branch` 的提交应用到 `master` 的最新提交之后。_

因此，如果你希望让主分支和开发分支保持一致，你还需要切换到主分支，然后合并开发分支。

```bash
git checkout master
git merge feature-branch
```

### 撤销本次修改

最简单的方法就是使用`git restore .`命令，这个命令会撤销所有的修改。这个需要 git 版本在 2.23+。

```bash
git restore .
```

如果是之前的版本，可以使用`git checkout -- .`命令。

```bash
git checkout -- .
```

- `.` 表示当前目录，如果只想撤销某个文件的修改，可以指定文件名。
- 如果没有参数`--`，后面直接跟具体的文件名，也表示撤销单个文件。

### 强制覆盖本地代码（与 git 远程仓库保持一致）

可以使用下列命令实现：

```bash
git fetch --all #取回远程库的所有修改；
git reset --hard origin/master  #指向远程库origin的master
git pull    #把远程库拉取到本地库
```

### Git 区分文件名大小写

可以通过修改配置来决定是否区分文件名的大小写：

```bash
git config core.ignorecase false
```

如果已经提交了，你之后即使在本地更改文件夹大小写，也不影响线上的版本，这在部署时，就很容易出问题。

所以一定要修改成正确的，解决方法就是通过把要修改的文件夹名改成临时的，提交后，再改回正确的，这样就完成了修改。

**执行命令**

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
git push origin BRANCH_NAME
```

### 提交空文件夹到远程仓库

git 默认会忽略空文件夹，如果我们希望提交一些空的文件夹，以达到某种特定的目的，可以用两种方法来实现这个效果：

1. 为空文件夹添加 `.gitkeep` 文件(推荐)

这个文件它本身是没有意义的，更像是团队使用者之间的一种约定，仅仅是为了标记这个空的文件夹是需要添加到仓库的。

```bash
find ./ -type d -empty -exec touch {}/.gitkeep \;
```

2. 为空文件夹添加 `.gitignore` 文件

添加这个文件也可以实现这个效果，但不是最佳的，因此推荐用第一种（因为它本身是有意义的）。

## 工具推荐

### gitkraken

可视化的分支，管理起来非常方便，也支持控制台操作。

注意免费用户不支持管理私有库。
