# Git

Git 是一个分布式版本控制系统，它将文件的修改记录为不同的快照，通过不同的区域和分支来管理代码。

## 基础命令

- **git init**: 初始化仓库

  如果是使用已有项目文件作为起点，不保留其 Git 提交历史，可以先用 `rm -rf .git` 删除原有的 Git 仓库，然后再执行 `git init`

- **git clone**: 拷贝远程仓库

  如果要自定义文件夹名，可以在后面加上文件夹名

- **git status**: **显示变更**

- **git diff**: **显示变更内容**

- **git log**: 查看提交历史

  `--oneline` 显示简洁的提交历史

- **git add .**: 添加文件到暂存区

- **git commit -m 'message'**: 提交到仓库，`-m` 后面是提交信息

  如果没有 `-m` 参数，会进入编辑器，你可以在编辑器中输入提交信息

  <u>多行内容时，第一行为标题，第二行留空，后面的内容为详细描述</u>

- **git restore .**: 撤销修改(`version 2.23+`)

- **git reset**: 回退版本

  `--hard` 回退版本，丢弃工作区和暂存区的修改(谨慎使用)

  `--mixed` 默认参数，回退版本，保留工作区的修改

  `--soft` 回退版本，保留暂存区的修改

- **git revert [commit_hash]**: 撤销某次提交

  会生成一个新的提交，这个提交是对之前提交的撤销

- **git stash**: <u>暂存工作区</u>

  `git stash list` 查看暂存列表

  `git stash pop` 恢复并删除暂存

  `git stash apply` 恢复不删除暂存

  `git stash drop` 删除暂存

  `git stash clear` 清空暂存

- **git switch**: 更换分支(`version 2.23+`)

  `-c` 创建并切换到新分支

- **git checkout**: <u>更换分支/创建分支/丢弃修改/切到特定的提交版本</u>

  `-b <branch_name>` 如果没有分支则创建

  `-- [.]/[file_name]` 撤销未提交的改变（指定文件名）

  `[commit_hash_or_tag]` 输入 hash 或者 tag 可以切到具体版本

- **git fetch**: 拉取远程分支

  不会自动合并，需要手动合并

- **git rebase**: 变基

  `git rebase -i HEAD~[n]` 可以合并 n 个提交

  `git rebase -i [commit_hash]` 可以合并某个提交

- **git merge <branch_name>**: 合并 `<branch_name>` 分支到当前分支

- **git pull**: <u>拉取远程分支</u>

  git pull <远程主机名> <远程分支名>:<本地分支名>

  - 如果远程分支名和本地分支名一样，可以省略 `:<本地分支名>` 部分

  - 如果已经记住远程主机名和分支名，可以直接 `git pull`

- **git push**: <u>推送到远程分支</u>

  git push <远程主机名> <本地分支名>:<远程分支名>

- **git branch**: 列出本地分支

  `-r` 列出远程分支

  `-a` 列出本地远程所有分支

  `<branch_name>` 创建新的分支

  `-d <branch_name>` 删除分支

- **git remote**: 管理远程仓库地址

  `-v` <u>查看远程仓库名及地址</u> (远程仓库不总是 origin :smile:)

  `show <remote_name>` 查看远程仓库详细信息

  `add <name> <url>` 添加远程仓库

  `rename <old_name> <new_name>` 重命名远程仓库

  `remove <name>` 删除远程仓库

## 基础知识

### Git 三个区域

- **工作区**：本地的工作目录

- **暂存区**：保存了你的改动，但还没有提交到仓库

- **仓库**：分为本地仓库和远程仓库，保存了项目的元数据和对象数据库

### Git 分支的管理

Git 的分支是一种非常轻量的机制，它本质上只是一个指向特定提交的指针。具体来说：

- Git 的分支并不是把代码复制一份或是创建一个新的目录，而只是创建一个指向提交记录的“指针”。

- 每次在某个分支上提交时，Git 会将该分支的指针前移到最新的提交位置。

- 创建一个新的分支只是创建一个新的指针，指向当前的提交。

- Git 中有一个特殊的指针 `HEAD`，它始终指向当前所在的分支。每当你切换分支时，`HEAD` 指针会指向新的分支。

- 每个提交记录都有一个指向它父提交的引用，这样就形成了一条提交链，Git 通过这些链来追踪分支的变化。

通过这种指针和链式结构，Git 可以轻松地管理不同的分支及其之间的关系。这种设计让 Git 的分支切换、合并、变基都非常高效。

### Git 分支的合并策略

Git 的分支合并有两种策略：快进合并（Fast-forward Merge）和合并提交（Merge Commit）。

- **快进合并（Fast-forward merge）**: 如果当前分支没有新的提交，直接将分支指针向前移动到目标分支的最新提交位置。

- **三方合并（Three-way merge）**: 如果两个分支都有新的提交，Git 会创建一个新的合并提交（merge commit），将两个分支的内容结合在一起。这种情况下，有时会出现冲突，需要手动解决。

### merge vs rebase vs cherry-pick

- **merge**：直接合并分支，将两个分支的历史“合并”在一起，生成一个新的合并提交。适合保留分支开发历史的场景。

- **rebase**：将一个分支的提交重放到另一个分支之后，不产生合并提交，历史保持线性。适合在功能完成后整理提交历史的场景。

- **cherry-pick**：将某个提交应用到当前分支，适合选择性地将某些提交应用到其他分支的场景。

### log 和 reflog

`git reflog` 是 Git 的引用日志（reference log），记录了所有对分支引用的修改，包括提交、重置、合并、拉取等操作。即使提交被删除或重置，`git reflog` 仍会保留所有的操作记录，包括分支头指针的移动。

- **git log**：显示分支的正常提交历史。用于查看项目的开发过程和具体提交内容。

- **git reflog**：显示所有引用操作记录，包含分支头的变化。用于找回丢失的提交和查看分支的变动历史。

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
- `remote.origin.url` 远程仓库地址

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

**Gitee 要注意的点**

- Gitee 的远程仓库地址如果想放入账号密码，无法使用 token 名加 token 组合，只能使用用户名加 token

  如: `https://<username>:<token>@<repository-url>`

- 用户名必须要全部小写，否则会报无效的用户名

- 配置了 ssh 后再拉取隐私仓库就无需输入用户名和密码

## 开发实践

### 管理多个版本

当需要维护多个版本的应用时，你可以创建不同的分支来分别管理生产版本和开发版本。例如，你可以使用以下的分支结构：

- `master` 分支：用于发布生产版本。

- `develop` 分支：用于开发新特性。

- `release` 分支：用于发布新版本。

- `hotfix` 分支：用于修复生产版本的 bug。

- `feature` 分支：用于开发新特性。

### 开发分支

可以通过创建开发分支来进行特性开发，然后合并到主分支。

```bash
git checkout -b feature-branch
```

开发完成后，可以合并到主分支。

_推荐使用 `rebase` 来变基，这样可以保持提交历史的整洁（详见下文 `合并策略` 部分）_

```bash
git checkout master
git merge feature-branch
```

合并后，可以删除开发分支。

```bash
git branch -d feature-branch
```

### 合并策略

如果直接合并分支，Git 会创建一个新的合并提交，这样会使提交历史变得混乱。

为了保持提交历史的整洁，可以使用 `rebase` 命令来变基。

#### 合并远程分支到本地分支

通过变基来让本地提交在远程分支的最新提交之后，这样可以保持提交历史的线性。

```bash
# 拉取远程分支
git fetch origin
# 变基到远程主分支
git rebase origin/master
# 如果有冲突，解决冲突后继续变基
git add .
git rebase --continue
# 推送到远程分支
git push origin master --force-with-lease
```

> [!TIP] 
>
> `--force-with-lease` 是一种更安全的强制推送方式，避免覆盖其他人的提交，有冲突时会提示
>
> 那么你可以先拉取最新的远程分支，解决冲突后再推送

#### 合并开发分支到主分支

如果你在开发分支上完成了工作，并且想要将其合并到主分支，可以使用 `rebase` 命令来保持提交历史的整洁。

```bash
git checkout feature-branch
git rebase master
```

_要注意的是， `git rebase master` 实际上是在 `feature-branch` 分支上进行的操作。_

_`rebase` 的目的是将一个分支的提交重新应用到目标分支（通常是主分支）的末尾，这样可以避免出现分支和合并的痕迹，让分支历史保持线性。_

**注意**: 如果在执行 `rebase` 时出现冲突，你可以用以下流程处理：

```bash
# 1. 编辑冲突文件，解决冲突
# 2. 标记已解决
git add .

# 3. 继续 rebase
git rebase --continue
```

如果是远程的分支，你可以先将远程的分支拉取到本地，然后再进行 `rebase`。

```bash
git checkout -b feature-branch origin/feature-branch
```

如果你希望让主分支和开发分支保持一致，你还需要切换到主分支，然后合并开发分支。

```bash
git checkout master
git merge feature-branch --ff-only
```

- `--ff-only` 参数表示只允许快进合并，用于强制保持 **线性历史**，如果不能快进，就 **拒绝合并**，报错退出。

通过这种方法，Git 的提交历史不会显示分支的合并痕迹，历史看起来就像在一条线上演进。

### 合并时整理历史去掉远程的分支合并记录

如果别人推送了新的提交到远程分支，但是里面包含了合并的提交，破坏了线性历史，而我们像撤销掉那条“合并提交”，然后把对方修改过的那条记录线性地整合到你们自己的代码历史中，保持干净（无合并）的提交历史。

这是一个很典型的需要 **“打碎合并”**、**“线性整合”** 的场景，我们可以通过 `rebase` + `cherry-pick` 等方式实现。

情况类似下面这种：

```bash
       A --- B --- C        (你们的代码)
              \
               D            (对方的修改)
                \
                 E          (合并提交，D+C)
```

我们希望保留 对方的修改 D，去掉合并提交 E，变成下面这种：

```bash
       A --- B --- C --- D'  (D' 是 D 的变种，如果需要合并的话)
```

可以按照下面的步骤来实现：

```bash
# 首先检查历史记录，找到干净历史的提交，比如 C
git checkout main
git log --oneline --graph
# 重置到 C 的提交，这个时候得到的历史是 A-B-C
git reset --hard <C-commit-hash>

# 找到对方提交的哈希，把对方的修改（D）用 cherry-pick 方式加进来
git cherry-pick <D-commit-hash>
# 如果有冲突，解决冲突后：
git add .
git cherry-pick --continue

# 如果远程还包含了合并提交 E，强制推送到远程覆盖
git push origin main --force
```

如果想要的是一段范围的提交，可以这样写：

```bash
# 比如想要把 D 到 F 的提交都整合到一起（不包含 F）
git cherry-pick <D-commit-hash>^..<F-commit-hash>

# 或者单独选择每一个想要的提交
git cherry-pick <D-commit-hash> <E-commit-hash>
```

### 交互式整理提交历史

如果你在开发过程中提交了很多次，但是这些提交并不需要保留，可以使用 `git rebase -i` 命令来整理提交历史，它是用来交互式地整理提交历史的强大工具。你可以用它来：

- 合并（squash）多个提交为一个提交

- 修改提交信息

- 删除不需要的提交

- 改变提交顺序

- 分割一个提交为多个提交

使用方式主要有：

- `git rebase -i HEAD~n`：将最近的 n 次提交进行交互式变基。

- `git rebase -i <branch>`：从当前分支起点，一直到指定的分支进行交互式变基。

打开后会显示一个编辑器界面，列出所有的提交记录，每一行代表一个提交，类似下面这样：

```bash
pick e3a1a00 修复登录bug
pick 14bc9f0 调整UI样式
pick 7f6d912 添加调试代码
pick 4b1ff23 修复UI缩放问题
```

你可以把 `pick` 改为以下几种操作：

- `pick`：保留这个提交

- `reword`：保留这个提交，但是修改提交信息

- `edit`：保留这个提交，但是暂停在这个提交上，你可以修改代码或者提交信息

- `squash`：合并到上一个提交（压缩提交）

- `fixup`：将这个提交和前一个提交合并为一个提交，并且丢弃这个提交的提交信息（类似 squash，但自动丢弃提交信息）

- `drop`：删除这个提交

### Commit 规范

**每次提交消息中应该包含以下内容：**

- **type**: 提交的类型。

- **scope**: 可选，提交的范围，比如 `button`、`header`、`footer` 等。

- **subject**: 提交的简短描述，不超过 50 个字符。

- **body**: 提交的详细描述，可以包含原因、解决方案等。

- **footer**: 提交的备注，比如关联的 issue、关闭的 issue 等。

**type 类型**

- **feat**: 新功能（feature）

- **fix**: 修复 bug

- **docs**: 文档（documentation），比如 README、CHANGELOG 等

- **style**: 格式（不影响代码运行的变动），比如空格、格式化等

- **refactor**: 重构（不是新增功能，也不是修复 bug）

- **perf**: 性能优化，体验优化

- **test**: 测试用例

- **chore**: 构建过程或辅助工具的变动

- **revert**: 撤销

**示例**

```bash
feat(button): add new button component

Add a new button component to the project.

- Add button component
- Add button styles
- Add button tests

Closes #123
```

### 使用标签

Git 标签（tag）是一个指向某个特定提交的固定指针。

它是在提交历史上的一个静态的指针，可以用来标记重要的提交，比如发布版本。

（官方推荐做法是每一次修改都是一次提交，一个版本可能会包含多次提交，这个时候就可以使用标签来标记）

- **创建标签**: 在发布一个新的版本时，可以使用 git tag 创建一个标签。

  它会在当前的提交上创建一个标签，可以指定标签名和注释。

  ```bash
  git tag -a v1.0 -m "Version 1.0"
  ```

- **查看标签**: 使用 git tag 命令可以查看所有标签。

  ```bash
  git tag
  ```

- **查看标签信息**: 使用 git show 命令可以查看标签的详细信息。

  ```bash
  git show v1.0
  ```

- **删除标签**: 使用 git tag -d 命令可以删除标签。

  ```bash
  git tag -d v1.0
  ```

- **推送标签**: 使用 `git push origin <tag name>` 可以推送标签到远程仓库。

  ```bash
  git push origin v1.0

  ```

- **推送所有标签**: 使用 git push origin --tags 可以推送所有标签到远程仓库。

  ```bash
  git push origin --tags
  ```

- **删除远程标签**: 使用 `git push origin :refs/tags/<tag name>` 可以删除远程标签。

  ```bash
  git push origin :refs/tags/v1.0
  ```

**lightweight 标签**

除了带注释的标签，还有一种轻量级标签，它只是一个指向某个提交的指针。

```bash
git tag v1.0
```

这种标签不会记录任何额外的信息，只是一个指向某个提交的指针。

## 案例及技巧

### 关联远程仓库

如果先在本地创建了一个仓库，然后想关联到远程仓库，可以使用以下命令：

```bash
git remote add origin <repository-url>
```

可以通过 `git remote -v` 检查关联的远程仓库。

### 查看提交历史

查看提交历史可以使用 `git log` 命令，通过不同的选项组合，`git log` 可以满足各种需求，从简单的日志查看到复杂的差异分析。

#### 常用组合

- `git log --oneline --graph --decorate`: 显示简洁的提交历史和分支图

- `git log -p --follow -- <path/to/file>`: 显示每次提交中该文件的 **diff** 差异，便于你直接看到每次改了什么

#### 基础用法

- `git log`: 显示所有提交历史

  按时间顺序显示提交历史（从最近到最早）

  默认显示提交的完整信息：提交哈希、作者、时间、提交信息

- `git log --oneline`: 显示简洁的提交历史

  每行显示一个提交，格式为: `<短哈希> <提交信息>`

- `git log --graph`: 显示提交历史的图形化分支

  显示提交历史的分支图，可以清晰地看到分支的合并和分叉

- `git log --decorate`: 显示提交历史的引用信息

  显示每个提交的引用信息，比如分支名、标签名等

#### 筛选提交记录

- `git log -n`: 限制显示的提交数量

  `-n` 后面跟数字，表示显示最近的 n 条提交

- `git log --author="Author Name"`: 按作者筛选提交记录

- `git log --grep="keyword"`: 按关键字筛选提交记录

- `git log -- <file_name>`: 查看某个文件的提交历史

  `git log --follow -- <file_name>`: 查看文件的移动和重命名历史(即使文件被重命名，仍可查看其完整历史)

- `git log --since="2 weeks ago" --until="yesterday"`: 按时间筛选提交记录

  `--since` 和 `--until` 支持多种时间格式，比如 `2 weeks ago`、`2021-01-01` 等

- `git log -p`: 显示每次提交的详细修改内容

- `git log --stat`: 显示每次提交修改的文件、行数变化统计

- `git log --shortstat`: 显示每次提交修改的文件、行数变化统计（简洁版）

- `git log --numstat`: 以数字形式显示每次提交的新增和删除行数

- `git log --oneline --graph --decorate -10`: 图形化显示最近的提交和分支结构

#### 比较与差异

- `git log branch1..branch2`: 显示 `branch1` 没有而 `branch2` 有的提交

  如 `git log your-branch..origin/your-branch` 可以查看远程分支的新增提交

- `git log branch1...branch2`: 显示 `branch1` 和 `branch2` 之间的差异

  三点语法 `...` 显示两个分支各自独有的提交

- `git log --oneline --graph --left-right your-branch...origin/your-branch`: 显示两个分支的提交差异

  左右箭头指示差异归属，`--left-right` 显示提交是在哪个分支上的

#### 自定义显示格式

通过 `--pretty` 参数，可以自定义显示提交历史的格式。

如 `git log --pretty=format:"%h - %an, %ar : %s"` 可以显示提交的短哈希、作者、提交时间、提交信息。

常用的占位符有：

- `%h`：提交的短哈希

- `%H`：提交的完整哈希

- `%an`：作者名

- `%ae`：作者邮箱

- `%ad`：提交时间（格式化）

- `%ar`：提交时间（相对时间）

- `%s`：提交信息

### 查看代码修改历史

在 Git 中，我们可以通过多种方式查看代码的修改历史，常见的有 `git blame` 和 `git log`。

#### 使用 `git log` 查看整体修改历史（推荐）

`git log` 提供了**直观的提交历史**视图，并且默认带有**颜色高亮**，阅读体验更好。例如：

```
git log -L 10,20:file.txt
```

该命令也可以查看某个文件特定行范围内的提交历史，与 `git blame` 类似，但输出的是**每次提交的完整上下文**，包括提交信息和修改的 diff。

你还可以使用以下命令获得更美观的输出：

```
git log --oneline --graph --decorate --color -L 10,20:file.txt
```

这会以彩色分支图的形式展示提交历史，非常适合快速了解代码演变过程。

#### 使用 `git blame` 查看逐行修改

`git blame` 用于查看文件的每一行是由谁、在什么时候提交的。例如：

```
git blame -L 10,20 -p file.txt
```

- `-L 10,20`：只显示第 10 行到第 20 行的修改记录。
- `-p`：显示更详细的信息，包括提交哈希、作者、时间等。

这个命令非常适合**精确定位具体代码行的修改责任**，比如排查 bug 时。

### 撤销和回退操作

#### 撤销本次修改

如果只需要撤销当前**工作区**的修改，可以使用以下命令：

- 使用`git restore .` （适用于 Git 2.23+）撤销所有修改。

- 如果是老版本的 Git，可以使用`git checkout -- .`命令。

  `.` 表示当前目录，如果只想撤销某个文件的修改，可以指定文件名

  如果没有参数`--`，后面直接跟具体的文件名，表示撤销单个文件

#### 撤销 合并变基 操作

如果在合并或变基操作中出现了冲突，可以使用以下命令来撤销：

- 使用 `git merge --abort` 撤销合并操作。

- 使用 `git rebase --abort` 撤销变基操作。

- 使用 `git cherry-pick --abort` 撤销 cherry-pick 操作。

#### 撤销暂存区的修改

如果已经使用`git add`将文件添加到暂存区，但是又不想提交，可以使用`git reset`命令来撤销。

- 使用`git reset HEAD .` 撤销暂存区的修改。

  `.` 表示当前目录，如果只想撤销某个文件的修改，可以指定文件名

#### 清理未追踪文件

新增的文件属于未追踪状态，无法通过撤销修改恢复，需要使用 `git clean` 命令：

- 预览将要删除的文件，避免误删，可以使用`git clean -n`来预览。

- 确认后，可以使用`git clean -f`来删除文件，或者使用`git clean -f -d`来删除文件和目录。

**注意**: 这个命令会删除未追踪的文件，无法恢复，需要谨慎使用。

#### 回退到之前的操作

如果发现操作错误，可以回退到之前的某个版本或提交:

- 使用 `git reflog` 查看最近的操作记录:

  ```bash
  abc1234 (HEAD -> main) HEAD@{0}: pull origin main: Fast-forward
  def5678 HEAD@{1}: commit: Fixed bug
  ghi9012 HEAD@{2}: checkout: moving from feature-branch to main
  ```

- 找到目标记录(比如`HEAD@{1}`)，然后使用`git reset`回退：

  ```bash
  git reset --hard HEAD@{1}
  ```

  **注意**: `git reset --hard` 会丢失未保存的修改，并删除之后的提交，需要小心使用。

- 如果只想撤回最近一次提交，将修改保留在工作区，可以使用：

  ```bash
  git reset --mixed HEAD~1
  ```

- 回退后，可通过`git log`查看提交历史，确认操作是否成功。

#### 修改最近的提交信息

如果你提交了代码后，发现提交信息有误，可以使用 `git commit --amend` 来修改最近的提交信息。

这个命令会打开编辑器，你可以修改提交信息，然后保存退出。

如果已经提交到了远程服务器后，再次提交会导致冲突，这时候可以使用 `--force` 参数来强制提交。

```bash
git commit --amend
git push --force
```

**注意**: 强制提交会**强制**推送到远程，完全覆盖远程内容。因此请确保**其他人没有基于旧的提交进行工作**，否则可能导致他们的提交丢失或需要重新同步。

#### 修改历史提交信息

如果你需要修改历史提交信息，可以使用 `git rebase` 命令。

```bash
git rebase -i HEAD~n
```

_其中 `n` 是你想要修改的提交数量，比如 `git rebase -i HEAD~3` 会打开一个编辑器，显示最近的 3 个提交_

把目标前的 `pick` 改成 `reword`，然后保存退出。

Git 会再打开新的编辑器，让你修改对应的提交信息。改为正确的后，rebase 就会继续运行。

_提交历史就会保留原来的顺序和内容，只是那些新提交的消息被更正了。_

最后再推送（分两种情况）：

- 如果修改的部分还没有推送到远程，只需要 `git push origin main` 即可。

- 如果已经推送，则需要改写历史，可以用“带保险”的强推：`git push origin main --force-with-lease`。

如果是共享分支，强推后别人需要同步你的历史，可以用下一节的方法，强制更新本地分支。

#### 放弃本地修改，与远程仓库同步

如果本地代码和远程仓库有冲突，你不想要本地的修改，可以使用以下命令：

```bash
git fetch --all # 取回远程库的所有修改；
git reset --hard origin/main  # 指向远程库origin的main分支；
```

如果 `reset` 遇到问题，或者合并时遇到问题，都可以通过新建临时分支来解决：

```bash
git fetch origin main:temp-branch # 创建一个新的分支，指向远程库origin的main分支；
git checkout temp-branch # 切换到新的分支；
git branch -D main # 删除本地的main分支；
git checkout -b main # 创建一个新的main分支；
git branch -D temp-branch # 删除临时分支；
```

### 避免本地修改被远程覆盖

> 仅讨论文件已经被追踪的情况。

如果你在本地修改了文件，但是远程仓库也有修改，这时候你直接 `pull` 会导致冲突。

**保留本次修改**

这时候你可以使用 `stash` 命令来暂存本地修改，然后再 `pull`。

```bash
git stash
git pull
git stash pop
```

**恢复本地版本**

拉取远程后，如果你想保留本地修改，可以使用 `checkout` 命令。

```bash
git checkout --ours file.txt
```

- `ours` 表示保留本地版本

**保留本地配置不受版本控制**

> 正常情况下，不应该有这个操作，如果是配置文件，应该在本地配置文件中添加忽略，不要提交到远程仓库，如果希望远程仓库有参考，应该使用模板文件，比如 `config.file.example`。

- 如果本地是一个配置文件，你希望一直保留，不受版本控制的影响，可以使用 `update-index` 命令：

  ```bash
  git update-index --skip-worktree config.json
  # 恢复使用
  git update-index --no-skip-worktree config.json
  ```

- 检查 `skip-worktree` 状态可以用：

  ```bash
  git ls-files -v | grep '^S'
  ```

- 还可以使用 `assume-unchanged` 命令，这个命令和`skip-worktree`类似，但是它会在`git status`中显示。

  ```bash
  git update-index --assume-unchanged config.json
  # 取消使用
  git update-index --no-assume-unchanged config.json
  ```

  **注意**: 仅推荐配置文件使用，因为如果远程仓库对该文件有更新，你的本地版本可能会与远程版本产生差异。

- 可以检查哪些文件被 `assume-unchanged` 标记：

  ```bash
  git ls-files -v | grep '^h'
  ```

- `assume-unchanged` 只是假设没有修改，减少 Git 进行变更检测的开销。所以 git 依然会管理该文件，本地的修改依然可能会被检测到，如果远程有更新，pull 会覆盖本地修改。

  适用于性能优化，大文件、不会修改的缓存文件等。

- `skip-worktree` 是告诉 Git 不要检查本地修改，不要提交到远程仓库，适用于本地配置文件等，但是如果远程有更新，pull 时会报错，因为 Git 认为该文件 "不可修改"，这个时候就需要先取消 `skip-worktree`，再 pull。

  适用于本地配置文件，不希望提交到远程仓库。

### Git 区分文件名大小写

可以通过修改配置来决定是否区分文件名的大小写：

```bash
git config core.ignorecase false
```

如果已经提交了，你之后即使在本地更改文件夹大小写，也不在更新线上的版本，这在部署时，就很容易出问题。

所以一定要修改成正确的，解决方法就是通过把要修改的文件夹名改成临时的，提交后，再改回正确的，这样就完成了修改。

具体步骤及命令为：

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

### 利用仓库快照实现本地设备间代码传输

如果我们不想利用线上仓库管理代码，只想本地设备间传输代码，可以使用 `git bundle` 命令来创建一个快照文件。

```bash
git bundle create repo.bundle --all
```

这个命令会将所有的分支和提交记录打包成一个文件，然后可以通过 `git clone` 来恢复仓库。

```bash
git clone repo.bundle
```

如果已经拉取过了仓库，可以使用 `git pull` 来更新仓库，就和正常的仓库一样。

```bash
git pull repo.bundle <branch>
```

**注意**: 这个时候是不需要指定<远程主机名>的，因为这个是本地的快照文件。

## 常见问题

### ahead of 'origin/master' by 1 commit

原因是本地仓库中记录的 `origin/master` 可能没有更新到最新状态。

同步操作如 `git pull` 后，Git 可能并没有自动更新本地的远程分支状态。

你可以运行一下命令来更新远程分支引用：

```bash
git fetch origin
```

## Github 远程仓库

### 下载原始单文件

GitHub 上的文件来自 `raw.githubusercontent.com`，它们存储在可访问的位置，因此如果您知道用户名、存储库和文件路径，则可以像这样下载任何分支上的任何文件：

```bash
wget https://raw.githubusercontent.com/<username>/<repository>/<branch>/<path-to-file>
```

比如我想下载我自己写的一个脚本到服务器上，就可以直接这样：

```bash
wget https://raw.githubusercontent.com/ethanaicode/debian-ubuntu-webserver-setup/main/script/auto_get_ssl_cert.sh
```

**注意**：如果文件刚提交，拉取的文件可能因为缓存没有立刻更新，那么就可以加上参数来保证请求到最新文件，不过此时应该用 `-O` 来指定输出文件名，以避免文件名中包含了请求参数：

```bash
wget -O auto_get_ssl_cert.sh https://raw.githubusercontent.com/ethanaicode/debian-ubuntu-webserver-setup/main/script/auto_get_ssl_cert.sh?nocache=$(date +%s)
```

### Access Token

#### 生成 Access Token

在使用 Github 的时候，可以使用 Access Token 来代替帐号密码，这样更加安全。

你可以在 Github 的设置中生成一个 Access Token，然后使用这个 Token 来代替密码。

```bash
git clone https://<username>:<token>@<repository-url>
```

#### 权限设置

在生成 Token 的时候，可以设置 Token 的权限，推荐 最小权限原则。

**权限解释**

- `Actions`: 管理 GitHub Actions 工作流及其运行。

- `Administration`: 管理仓库的高级设置、协作者、团队权限。

- `Attestations`: 创建和查看与仓库相关的声明（attestations）, 例如代码签名。

- `Custom properties`: 创建和查看与仓库相关的自定义属性, 例如标记。

- `Issues`: 查看、创建和更新问题。

- `Metadata`: 仓库的基本信息，包括名称、描述、语言等。

- `Contents`: 仓库的文件内容。（可写的话，则可以提交代码、创建分支等）

下面是一些常用的权限组合：

**只允许提交代码到仓库**

- Metadata(mandatory): Read-only

- Contents: Read and write

### README.md 排版

> 请在 GitHub 上查看，由于 markdown 渲染引擎不同，可能在其他平台上显示效果不一样。

#### 居中及显示星标数量徽章效果

```markdown
<div align="center">
<h1 align="center">Adobe-Block-Hosts-List <img src="https://img.shields.io/github/stars/ethanaicode/Adobe-Block-Hosts-List?label=Stars" alt="stars"></h1>
</div>
```

- `https://shields.io/` 这个网站可以生成各种各样的徽章

#### 右边图左边文字效果

```markdown
# [<img src="https://img.techrk1688.eu.org/file/e44951f61086ae4dc9591.png" width="250" align="right" alt="Cloudflare">](https://www.cloudflare.com)

> [![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&vCenter=true&multiline=true&random=false&height=80&lines=%E7%B2%BE%E9%80%89%E7%9A%84%E4%BA%92%E8%81%94%E7%BD%91%E4%B9%8B%E5%85%89+Cloudflare+%E5%BC%80%E6%BA%90%E9%A1%B9%E7%9B%AE;%E3%80%81%E6%8C%87%E5%8D%97%E3%80%81%E5%8D%9A%E5%AE%A2%E5%92%8C%E5%85%B6%E4%BB%96%E8%B5%84%E6%BA%90%E5%88%97%E8%A1%A8%E3%80%82)](https://git.io/typing-svg)
```

- `https://git.io/typing-svg` 这个网站可以生成打字机效果的 SVG 图片

## 工具推荐

### gitkraken

可视化的分支，管理起来非常方便，也支持控制台操作。

**注意**: 免费用户不支持管理私有库。
