# Brew

> Cask 是Homebrew的扩展，原本的Homebrew是管理命令行的，而Cask是管理GUI桌面软件的部分。

- brew list

  will show a list of all your installed Homebrew packages

  In addition, `brew list --cask` will provide the items installed using [Homebrew Cask](https://github.com/Homebrew/homebrew-cask).

- brew leaves

  shows you all top-level packages; packages that are not dependencies.
  
- brew search [text]

  搜索软件，支持`/`的正则匹配

- brew info [package name]

  查看fomula的详细信息

- brew install [fomula]

- brew upgrade [fomula]

  如果不输入具体的fomula，这更新全部

- brew uninstall

- brew cleanup

  删除安装过程中的缓存，会清理掉Cask套件

## Services

- brew services list
- brew services star/stop/restart serviceName

## Cask

cask 和 brew 相似，在brew 后加上 cask 即可使用。

下面是一些常用的：

```bash
# 查看软件详情
brew cask info [fomula]
# 安装软件
brew cask install <fomula>
# 列出所有已安裝的软件
brew cask list
# 更新软件
brew cask upgrade [fomula]
# 卸载软件
brew cask uninstall [fomula]
```

