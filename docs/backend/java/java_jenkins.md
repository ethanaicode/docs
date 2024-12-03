# Jenkins

Jenkins 是一个开源的持续集成工具，用于自动化构建、测试和部署软件项目。

## 开始使用

### 安装 Jenkins 关键信息

- Jenkins 依赖于 Java 运行环境，所以需要先安装 Java，推荐 Java 版本 17 或者 21

- macOS 用户可以使用 Homebrew 安装 Jenkins，软件名称为 `jenkins-lts`

- windows 用户可以直接下载 Jenkins 的安装包进行安装

- 都可以手动下载 Jenkins 的 war 包，然后通过 Java 命令启动 Jenkins

- Jenkins 默认端口为 8080，可以通过配置文件修改端口

- Jenkins 初始密码保存在 `/Users/your-user/.jenkins/secrets/initialAdminPassword` 文件中

### 使用 jenkins.war

jenkins.war 是 Jenkins 的 war 包，可以通过 Java 命令启动 Jenkins 服务。

```bash
java -jar jenkins.war
```

它支持的参数有：

- `--httpPort=8080`：指定 Jenkins 的端口，默认为 8080

- `--prefix=/jenkins`：指定 Jenkins 的路径前缀，默认为 `/`

- `--jenkinsHome=/path/to/jenkins`：指定 Jenkins 的工作目录，默认为 `~/.jenkins`

- `--logfile=/path/to/jenkins.log`：指定 Jenkins 的日志文件，默认为 `jenkins.log`

- `--webroot=/path/to/jenkins`：指定 Jenkins 的 Web 根目录，默认为 `war` 包所在目录

- `--daemon`：以守护进程模式运行 Jenkins(仅限 Unix 系统)
